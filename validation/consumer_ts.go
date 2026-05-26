package validation

import (
	"fmt"
	"log"
	"regexp"
	"sort"
	"strings"
)

// TSConsumerRepo identifies a TypeScript consumer repository.
type TSConsumerRepo string

const (
	// TSConsumerMeshery is meshery/meshery's ui/rtk-query tree.
	TSConsumerMeshery TSConsumerRepo = "meshery"
	// TSConsumerCloud is layer5io/meshery-cloud's ui/api + ui/rtk-query trees.
	TSConsumerCloud TSConsumerRepo = "meshery-cloud"
	// TSConsumerExtensions is layer5labs/meshery-extensions' meshmap/src/rtk-query tree.
	TSConsumerExtensions TSConsumerRepo = "meshery-extensions"
)

// tsScanDirs maps each TS consumer repo to the relative directories that
// contain RTK Query endpoint definitions. Any `.ts` file under these paths is
// a candidate for scanning. Directories that do not exist in a given checkout
// are silently skipped — consumer repos may add or drop RTK modules over time.
var tsScanDirs = map[TSConsumerRepo][]string{
	TSConsumerMeshery: {
		"ui/rtk-query",
	},
	TSConsumerCloud: {
		"ui/api",
		"ui/rtk-query",
	},
	TSConsumerExtensions: {
		"meshmap/src/rtk-query",
	},
}

// TSFindingKind enumerates the classes of drift that the TS consumer flags.
// These are advisory signals — they do not fail CI directly, but the audit
// surface makes them visible so Phase 2/3 migration work can target them.
type TSFindingKind string

const (
	// TSFindingCaseFlip marks a param/body site that translates a
	// camelCase query-arg into a non-camelCase wire key
	// (e.g. `orgID: queryArg.orgId`). The schema contract is camelCase;
	// the case-flip undoes that.
	TSFindingCaseFlip TSFindingKind = "case-flip"

	// TSFindingSnakeCaseWrapper marks a body wrapper whose top-level key is
	// snake_case (`pattern_data`, `k8s_manifest`). These wrappers predate the
	// identifier-naming migration contract.
	TSFindingSnakeCaseWrapper TSFindingKind = "snake-case-wrapper"

	// TSFindingSnakeCaseParam marks a params object whose key is snake_case
	// (e.g. `page_size`, `total_count` used outside the reserved pagination
	// envelope).
	TSFindingSnakeCaseParam TSFindingKind = "snake-case-param"
)

// TSFinding is one drift observation produced by the TypeScript consumer
// auditor. It carries enough context (file:line, repo, endpoint, wire key)
// for a downstream tool or CI report to point a reviewer at the exact site.
type TSFinding struct {
	Repo     TSConsumerRepo
	File     string // repo-relative path, forward slashes
	Line     int    // 1-based source line
	Endpoint string // RTK endpoint name, e.g. "getWorkspaceForCatalog"
	URL      string // URL template extracted from the `url` property
	Method   string // HTTP method (upper-case)
	Kind     TSFindingKind
	Key      string // the offending wire key (e.g. "orgID", "pattern_data")
	Message  string // human-readable description
}

// String renders the finding in a compact, deterministic form suitable for
// terminal output and baseline files.
func (f TSFinding) String() string {
	loc := f.File
	if f.Line > 0 {
		loc = fmt.Sprintf("%s:%d", f.File, f.Line)
	}
	return fmt.Sprintf("[%s] %s (%s %s): %s", f.Repo, loc, f.Method, f.URL, f.Message)
}

// parseTSConsumer walks the configured scan dirs of a TS consumer source tree
// and extracts RTK endpoint sites. Findings are returned alongside the
// endpoint records so the caller can surface both in the audit report.
func parseTSConsumer(tree sourceTree, repo TSConsumerRepo) ([]consumerEndpoint, []TSFinding, error) {
	if tree == nil {
		return nil, nil, nil
	}
	dirs, ok := tsScanDirs[repo]
	if !ok || len(dirs) == 0 {
		return nil, nil, fmt.Errorf("consumer-audit: ts parser: no scan dirs configured for repo %q", repo)
	}

	// Deduplicate nested scan dirs: if `ui/rtk-query` is under `ui`, walking
	// both would process the same files twice and double-count findings.
	// Keep only the shortest ancestor per prefix group.
	dirs = dedupNestedDirs(dirs)

	var (
		endpoints []consumerEndpoint
		findings  []TSFinding
	)

	for _, dir := range dirs {
		err := tree.Walk(dir, func(p string) error {
			if !strings.HasSuffix(p, ".ts") && !strings.HasSuffix(p, ".tsx") {
				return nil
			}
			// Skip test fixtures, generated mocks, and declaration files
			// — they rarely contain the real endpoint surface and would
			// add noise to the audit.
			if strings.HasSuffix(p, ".d.ts") ||
				strings.HasSuffix(p, ".test.ts") ||
				strings.HasSuffix(p, ".test.tsx") ||
				strings.Contains(p, "/__tests__/") ||
				strings.Contains(p, "/mocks/") {
				return nil
			}
			data, err := tree.ReadFile(p)
			if err != nil {
				log.Printf("consumer-audit: ts parser: read %s: %v", p, err)
				return nil
			}
			eps, fs := extractTSEndpoints(string(data), p, repo)
			endpoints = append(endpoints, eps...)
			findings = append(findings, fs...)
			return nil
		})
		if err != nil {
			log.Printf("consumer-audit: ts parser: walk %s: %v", dir, err)
		}
	}

	for i := range endpoints {
		endpoints[i].Repo = string(repo)
	}

	sortConsumerEndpoints(endpoints)
	sortTSFindings(findings)
	return endpoints, findings, nil
}

// dedupNestedDirs returns the subset of `dirs` that are not descended from
// another entry in `dirs`. Walks a parent directory and its child
// separately would re-process the same files, producing duplicate findings
// and inflating counts.
func dedupNestedDirs(dirs []string) []string {
	// Normalize: strip trailing slashes, collect into a set.
	norm := make([]string, 0, len(dirs))
	seen := map[string]bool{}
	for _, d := range dirs {
		d = strings.TrimRight(d, "/")
		if d == "" || seen[d] {
			continue
		}
		seen[d] = true
		norm = append(norm, d)
	}
	// Sort shortest first; a shorter path can never be a descendant of
	// a longer one, so we can filter descendants in a single pass.
	sort.Slice(norm, func(i, j int) bool {
		if len(norm[i]) != len(norm[j]) {
			return len(norm[i]) < len(norm[j])
		}
		return norm[i] < norm[j]
	})
	kept := norm[:0]
	for _, d := range norm {
		covered := false
		for _, k := range kept {
			if d == k || strings.HasPrefix(d, k+"/") {
				covered = true
				break
			}
		}
		if !covered {
			kept = append(kept, d)
		}
	}
	return kept
}

// sortTSFindings orders findings by (Repo, File, Line, Kind, Key) so output
// is a strict total order — important because sort.Slice is not stable and
// the audit contract requires byte-identical output across runs. Every tie-
// breaker is covered so there is no map-order leak.
func sortTSFindings(fs []TSFinding) {
	sort.Slice(fs, func(i, j int) bool {
		if fs[i].Repo != fs[j].Repo {
			return fs[i].Repo < fs[j].Repo
		}
		if fs[i].File != fs[j].File {
			return fs[i].File < fs[j].File
		}
		if fs[i].Line != fs[j].Line {
			return fs[i].Line < fs[j].Line
		}
		if fs[i].Kind != fs[j].Kind {
			return fs[i].Kind < fs[j].Kind
		}
		return fs[i].Key < fs[j].Key
	})
}

// tsEndpointHeadRE locates the start of an RTK endpoint definition. It
// matches both the Redux-toolkit-builder-function form
//
//	getWorkspaceForCatalog: builder.query({
//
// and the "build" alias used by codegen output:
//
//	getUserKeys: build.mutation({
var tsEndpointHeadRE = regexp.MustCompile(`(?m)^\s*([A-Za-z_$][\w$]*)\s*:\s*(?:builder|build)\.(query|mutation)\s*\(\s*\{`)

// tsURLRE matches the `url:` property inside an RTK query/mutation site. The
// URL may be a back-tick template, a single-quoted literal, or a call
// expression like `mesheryApiPath('integrations/…')`. The anchor is a word
// boundary rather than start-of-line so inline forms like `{ url: ... }`
// are matched alongside the more common multi-line layout. Only the first
// line of the RHS is captured; multi-line expressions (rare in practice)
// are left to the caller to normalize.
var tsURLRE = regexp.MustCompile("\\burl\\s*:\\s*([`'\"][^`'\"]*[`'\"]|[A-Za-z_$][\\w$]*\\s*\\([^)]*\\))")

// tsMethodRE matches the `method:` property on a mutation site.
var tsMethodRE = regexp.MustCompile(`\bmethod\s*:\s*['"]([A-Z]+)['"]`)

// tsCaseFlipRE matches assignment patterns that alias a camelCase query-arg to
// a non-camelCase wire key. The three canonical patterns are:
//
//	orgID: queryArg.orgId
//	orgID: queryArg?.orgId
//	orgID: selectedOrganization?.id
//
// The first two are the RTK-query case-flip form; the third is an out-of-band
// identity assignment from session state that still emits the legacy casing
// on the wire. The anchor matches either start-of-line or the start of an
// object literal entry so same-line keys like `{ orgID: ... }` surface.
var tsCaseFlipRE = regexp.MustCompile(`(?m)(?:[{,]\s*|^\s*)([A-Za-z_$][\w$]*[A-Z][A-Za-z_$]*)\s*:\s*[A-Za-z_$][\w$]*\??\.[A-Za-z_$][\w$]*`)

// tsWireKeyRE matches every `key: value` pair inside a params or body
// literal. The anchor is a `{` or `,` followed by whitespace so same-line
// keys (`{ orgID: ..., sub_type: ... }`) surface alongside multi-line
// layouts. The key group is the identifier to the left of the colon.
var tsWireKeyRE = regexp.MustCompile(`(?m)(?:[{,]\s*|^\s*)([A-Za-z_$][\w$]*)\s*:`)

// tsAllowedSnakeKeys is the set of snake_case wire keys that are part of a
// published contract (pagination envelope) rather than legacy drift. These
// must not flip to camelCase inside an already-published API version per
// the casing table in docs/casing-rules.md.
var tsAllowedSnakeKeys = map[string]struct{}{
	"page_size":   {},
	"total_count": {},
}

// extractTSEndpoints scans a single TS source file for RTK query/mutation
// sites and returns one consumerEndpoint per site, plus any findings surfaced
// by the casing checks. The parser is intentionally regex-based: full TS
// semantic analysis would require a TypeScript compiler, and the charter
// is explicit that simpler heuristics are acceptable here.
//
// Findings have two surfaces:
//
//   - Per-endpoint: `builder.query` / `builder.mutation` sites flag drift
//     inside their own `params` / `body` literals so each finding is
//     attributed to a concrete endpoint name.
//   - File-level: free-standing helpers like
//     `initiateQuery(api.endpoints.x, { body: {...} })` also send payloads
//     over the wire but live outside the `builder.query` body. The parser
//     scans every `body: { ... }` and `params: { ... }` literal in the
//     file and flags any drift not already covered by an endpoint site,
//     so the charter-required `designs.ts:308` `pattern_data:` wrapper is
//     not missed when it appears inside an exported helper function.
func extractTSEndpoints(src, file string, repo TSConsumerRepo) ([]consumerEndpoint, []TSFinding) {
	var (
		endpoints []consumerEndpoint
		findings  []TSFinding
	)

	// Track covered ranges so the file-level scan does not double-report
	// anything already attributed to an endpoint site.
	var covered []struct{ start, end int }

	heads := tsEndpointHeadRE.FindAllStringSubmatchIndex(src, -1)
	for i, head := range heads {
		if len(head) < 6 {
			continue
		}
		endpointStart := head[0]
		bodyStart := head[1] // position of the opening brace's interior
		endpointName := src[head[2]:head[3]]
		kind := src[head[4]:head[5]]

		// Determine the end of this RTK site by finding the matching closing
		// brace or the start of the next endpoint. Using the next endpoint's
		// position as a right boundary keeps extraction bounded even if the
		// brace counter under-counts due to template literals or comments.
		bodyEnd := len(src)
		if i+1 < len(heads) {
			bodyEnd = heads[i+1][0]
		}
		if brace := findMatchingBrace(src, bodyStart-1, bodyEnd); brace > 0 {
			bodyEnd = brace + 1
		}
		body := src[bodyStart:bodyEnd]
		covered = append(covered, struct{ start, end int }{start: bodyStart, end: bodyEnd})

		// URL is the first `url: ...` occurrence inside the site body.
		urlMatch := tsURLRE.FindStringSubmatchIndex(body)
		var rawURL string
		if urlMatch != nil {
			rawURL = strings.TrimSpace(body[urlMatch[2]:urlMatch[3]])
		}
		urlTemplate := normalizeTSURL(rawURL)

		method := "GET"
		if kind == "mutation" {
			method = "POST" // sensible default for RTK mutations
		}
		if m := tsMethodRE.FindStringSubmatch(body); len(m) == 2 {
			method = strings.ToUpper(m[1])
		}

		ep := consumerEndpoint{
			Method:      method,
			Path:        urlTemplate,
			HandlerName: endpointName,
			HandlerFile: file,
			RouterFile:  file,
			RouterLine:  lineOf(src, endpointStart),
		}

		// Flag case-flips and snake_case wire keys. Each finding gets
		// attached as a Note on the endpoint and returned separately so
		// the CLI can surface the full list at the bottom of the report.
		for _, f := range findTSFindings(body, file, bodyStart, endpointName, method, urlTemplate, repo, src) {
			findings = append(findings, f)
			ep.Notes = append(ep.Notes, f.Message)
		}

		endpoints = append(endpoints, ep)
	}

	// File-level pass: catch `body: { ... }` / `params: { ... }` literals
	// that live outside a builder.query block (e.g. inside exported helper
	// functions that call initiateQuery). Drift covered by an endpoint
	// site above is skipped so findings are not double-counted.
	findings = append(findings, findFreeFormFindings(src, file, repo, covered)...)

	// File-wide case-flip pass: hook call-sites like
	// `useGetWorkspacesQuery({ orgID: selectedOrganization?.id })` live
	// outside both endpoint bodies AND body/params property literals, but
	// still emit the drift identifier on the wire once the hook triggers
	// a request. The dedupe set ensures we don't double-count sites
	// already surfaced by one of the scans above.
	seenFileWide := make(map[string]struct{}, len(findings))
	for _, f := range findings {
		seenFileWide[keyFinding(f)] = struct{}{}
	}
	for _, m := range tsCaseFlipRE.FindAllStringSubmatchIndex(src, -1) {
		if len(m) < 4 {
			continue
		}
		key := src[m[2]:m[3]]
		if !hasMixedCase(key) {
			continue
		}
		// Skip endpoint-definition sites where the RHS is `builder.query`,
		// `builder.mutation`, `build.query`, or `build.mutation`. Those
		// are the RTK endpoint header lines themselves, not wire-format
		// assignments, so their "key" (the endpoint function name) is
		// allowed to use whatever TS identifier convention the author
		// prefers. The matched range `src[m[2]..m[1]]` contains the full
		// `key: rhs` so we can inspect the RHS identifier directly.
		fullMatch := src[m[2]:m[1]]
		if rhs := rhsOfKeyAssignment(fullMatch); rhs == "builder.query" ||
			rhs == "builder.mutation" ||
			rhs == "build.query" ||
			rhs == "build.mutation" {
			continue
		}
		absLine := lineOf(src, m[2])
		f := TSFinding{
			Repo:    repo,
			File:    file,
			Line:    absLine,
			Kind:    TSFindingCaseFlip,
			Key:     key,
			Message: fmt.Sprintf("wire key %q preserves legacy SCREAMING/mixed casing instead of camelCase schema contract", key),
		}
		k := keyFinding(f)
		if _, ok := seenFileWide[k]; ok {
			continue
		}
		seenFileWide[k] = struct{}{}
		findings = append(findings, f)
	}

	return endpoints, findings
}

// rhsOfKeyAssignment returns the right-hand identifier chain of a
// `key: rhs` TS fragment, trimmed of whitespace. Used to tell an endpoint
// definition like `verifyConnectionURL: builder.mutation` apart from a
// wire-format assignment like `orgID: queryArg.orgId` so the former is not
// misreported as a case-flip. An unparseable input yields "".
func rhsOfKeyAssignment(s string) string {
	idx := strings.Index(s, ":")
	if idx < 0 {
		return ""
	}
	return strings.TrimSpace(s[idx+1:])
}

// findFreeFormFindings scans the entire file for body/params literals that
// live outside a tracked endpoint range. Every bare `body: { ... }` or
// `params: { ... }` is inspected for snake_case keys and SCREAMING-case
// flips; findings are emitted without an endpoint attribution so the
// reviewer can still locate the site via file:line.
func findFreeFormFindings(src, file string, repo TSConsumerRepo, covered []struct{ start, end int }) []TSFinding {
	isCovered := func(at int) bool {
		for _, c := range covered {
			if at >= c.start && at < c.end {
				return true
			}
		}
		return false
	}

	var out []TSFinding
	seen := make(map[string]struct{})

	for _, prop := range []struct {
		name string
		kind TSFindingKind
	}{
		{"body", TSFindingSnakeCaseWrapper},
		{"params", TSFindingSnakeCaseParam},
	} {
		anchor := regexp.MustCompile(`\b` + regexp.QuoteMeta(prop.name) + `\s*:\s*\{`)
		for _, loc := range anchor.FindAllStringIndex(src, -1) {
			open := loc[1] - 1
			if isCovered(open) {
				continue
			}
			closeIdx := findMatchingBrace(src, open, len(src))
			if closeIdx < 0 {
				continue
			}
			snippet := src[open+1 : closeIdx]
			for _, m := range tsWireKeyRE.FindAllStringSubmatchIndex(snippet, -1) {
				if len(m) < 4 {
					continue
				}
				key := snippet[m[2]:m[3]]
				if _, allowed := tsAllowedSnakeKeys[key]; allowed {
					continue
				}
				line := lineOf(src, open+1+m[2])
				findingKind := prop.kind
				var msg string
				switch {
				case hasMixedCase(key):
					findingKind = TSFindingCaseFlip
					msg = fmt.Sprintf("wire key %q preserves legacy SCREAMING/mixed casing instead of camelCase schema contract", key)
				case isSnakeCase(key):
					msg = fmt.Sprintf("wire key %q uses snake_case instead of camelCase schema contract", key)
				default:
					continue
				}
				f := TSFinding{
					Repo:    repo,
					File:    file,
					Line:    line,
					Method:  "",
					URL:     "",
					Kind:    findingKind,
					Key:     key,
					Message: msg,
				}
				k := keyFinding(f)
				if _, ok := seen[k]; ok {
					continue
				}
				seen[k] = struct{}{}
				out = append(out, f)
			}
		}
	}
	return out
}

// findMatchingBrace returns the index of the `}` that matches the `{` at
// openIdx, constrained to the [openIdx, limit) range. The scanner skips
// characters inside template literals, single/double quoted strings, and
// line/block comments so braces buried in a URL template or comment body
// do not shift the balance.
func findMatchingBrace(src string, openIdx, limit int) int {
	if openIdx < 0 || openIdx >= len(src) || src[openIdx] != '{' {
		return -1
	}
	if limit > len(src) {
		limit = len(src)
	}
	depth := 0
	i := openIdx
	for i < limit {
		c := src[i]
		switch c {
		case '{':
			depth++
			i++
		case '}':
			depth--
			if depth == 0 {
				return i
			}
			i++
		case '`':
			i = skipDelim(src, i+1, limit, '`')
		case '\'':
			i = skipDelim(src, i+1, limit, '\'')
		case '"':
			i = skipDelim(src, i+1, limit, '"')
		case '/':
			if i+1 < limit && src[i+1] == '/' {
				// line comment
				for i < limit && src[i] != '\n' {
					i++
				}
			} else if i+1 < limit && src[i+1] == '*' {
				// block comment
				i += 2
				for i+1 < limit && !(src[i] == '*' && src[i+1] == '/') {
					i++
				}
				i += 2
			} else {
				i++
			}
		default:
			i++
		}
	}
	return -1
}

// skipDelim advances past a JS/TS string or template-literal delimiter.
// Back-slash escapes are honored so `"a\"b"` is treated as one literal.
func skipDelim(src string, start, limit int, delim byte) int {
	i := start
	for i < limit {
		if src[i] == '\\' && i+1 < limit {
			i += 2
			continue
		}
		if src[i] == delim {
			return i + 1
		}
		i++
	}
	return limit
}

// lineOf returns the 1-based line number of idx in src.
func lineOf(src string, idx int) int {
	if idx < 0 {
		return 0
	}
	if idx > len(src) {
		idx = len(src)
	}
	return 1 + strings.Count(src[:idx], "\n")
}

// tsTemplateParamRE matches `${expr}` placeholders in a back-tick template
// string — RTK's standard form for dynamic URL segments.
var tsTemplateParamRE = regexp.MustCompile(`\$\{([^}]+)\}`)

// tsRawParamSegmentRE isolates the trailing identifier in an interpolated
// expression so `queryArg.id` is rendered as `{id}` while a more complex
// expression like `queryArg.nested?.id` still collapses cleanly.
var tsRawParamSegmentRE = regexp.MustCompile(`([A-Za-z_$][\w$]*)\s*$`)

// normalizeTSURL converts a raw `url:` RHS into the canonical OpenAPI-style
// path expected by the endpoint matcher. It handles:
//
//   - back-tick templates with `${queryArg.id}` → `{id}`
//   - single/double-quoted literals: stripped of quotes
//   - `mesheryApiPath('foo/bar')` helpers: inner literal extracted and
//     re-prefixed with `/api/`
//
// An empty or unparseable RHS yields an empty string so the downstream
// matcher treats the site as unresolved rather than binding to the wrong path.
func normalizeTSURL(raw string) string {
	raw = strings.TrimSpace(raw)
	if raw == "" {
		return ""
	}

	// Helper call form: `mesheryApiPath('integrations/…')`.
	if strings.HasPrefix(raw, "mesheryApiPath") {
		inside := trimCall(raw, "mesheryApiPath")
		inner := stripQuotes(inside)
		if inner == "" {
			return ""
		}
		if !strings.HasPrefix(inner, "/") {
			inner = "/" + inner
		}
		inner = replaceTemplateParams(inner)
		if !strings.HasPrefix(inner, "/api/") {
			inner = "/api" + inner
		}
		return inner
	}

	// Literal form: strip surrounding quotes/backticks.
	s := stripQuotes(raw)
	s = replaceTemplateParams(s)
	if !strings.HasPrefix(s, "/") {
		s = "/" + s
	}
	return s
}

// stripQuotes peels leading/trailing `"` / `'` / `` ` `` from a raw URL
// expression. Mismatched delimiters yield the input unchanged so the
// caller can decide how to treat it.
func stripQuotes(s string) string {
	s = strings.TrimSpace(s)
	if len(s) < 2 {
		return s
	}
	first, last := s[0], s[len(s)-1]
	if first == last && (first == '\'' || first == '"' || first == '`') {
		return s[1 : len(s)-1]
	}
	return s
}

// trimCall returns the argument list of `name(...)` without the enclosing
// parentheses, or the empty string if the call shape does not match.
func trimCall(s, name string) string {
	open := strings.Index(s, "(")
	if open < 0 || !strings.HasPrefix(s, name) {
		return ""
	}
	close := strings.LastIndex(s, ")")
	if close <= open {
		return ""
	}
	return strings.TrimSpace(s[open+1 : close])
}

// replaceTemplateParams rewrites `${expr}` placeholders into OpenAPI-style
// `{name}` segments. The trailing identifier of the expression is preferred
// (`queryArg.foo.id` → `{id}`) so paths align with spec param names even
// when the consumer uses a nested query-arg structure.
func replaceTemplateParams(s string) string {
	return tsTemplateParamRE.ReplaceAllStringFunc(s, func(match string) string {
		inner := strings.TrimSpace(match[2 : len(match)-1])
		if m := tsRawParamSegmentRE.FindStringSubmatch(inner); m != nil && m[1] != "" {
			return "{" + m[1] + "}"
		}
		return "{}"
	})
}

// findTSFindings scans a single endpoint body for the three finding kinds:
// case-flip, snake-case-wrapper, and snake-case-param. Line numbers are
// calculated relative to the full source so the report points at the real
// file:line, not at the endpoint-local offset.
func findTSFindings(body, file string, bodyOffset int, endpoint, method, url string, repo TSConsumerRepo, fullSrc string) []TSFinding {
	var out []TSFinding

	// Detect params / body blocks by scanning for their literal property
	// anchors. Each scanning regex consumes its match so the same key is
	// never reported twice from the same site.
	paramsRange := findPropertyBraceRange(body, "params")
	bodyRange := findPropertyBraceRange(body, "body")

	if paramsRange.valid() {
		out = append(out, scanParamsOrBody(body, paramsRange, bodyOffset, fullSrc, file, endpoint, method, url, repo, "params")...)
	}
	if bodyRange.valid() {
		out = append(out, scanParamsOrBody(body, bodyRange, bodyOffset, fullSrc, file, endpoint, method, url, repo, "body")...)
	}

	// Case-flips outside the standard params/body literals still need to be
	// caught — e.g. a site that builds a plain request object with
	// `orgID: selectedOrganization?.id`. Scan the whole endpoint body and
	// dedupe against findings already recorded above.
	seen := make(map[string]struct{}, len(out))
	for _, f := range out {
		if f.Kind == TSFindingCaseFlip {
			seen[keyFinding(f)] = struct{}{}
		}
	}
	for _, m := range tsCaseFlipRE.FindAllStringSubmatchIndex(body, -1) {
		if len(m) < 4 {
			continue
		}
		key := body[m[2]:m[3]]
		if !hasMixedCase(key) {
			continue
		}
		absLine := lineOf(fullSrc, bodyOffset+m[2])
		f := TSFinding{
			Repo:     repo,
			File:     file,
			Line:     absLine,
			Endpoint: endpoint,
			URL:      url,
			Method:   method,
			Kind:     TSFindingCaseFlip,
			Key:      key,
			Message:  fmt.Sprintf("wire key %q preserves legacy SCREAMING/mixed casing instead of camelCase schema contract", key),
		}
		k := keyFinding(f)
		if _, ok := seen[k]; ok {
			continue
		}
		seen[k] = struct{}{}
		out = append(out, f)
	}

	return out
}

// keyFinding produces a compact dedupe key for a finding. Two findings with
// the same (file, line, kind, key) tuple describe the same drift.
func keyFinding(f TSFinding) string {
	return fmt.Sprintf("%s|%d|%s|%s", f.File, f.Line, f.Kind, f.Key)
}

// bodyRange is a half-open [start, end) slice of a TS property literal body.
type bodyRange struct {
	start int
	end   int
}

func (r bodyRange) valid() bool { return r.end > r.start && r.start >= 0 }

// findPropertyBraceRange locates the `{ ... }` literal that follows a
// property declaration like `params:` or `body:`. The returned range is
// half-open over the literal's *interior* (excluding the outer braces) so
// callers can apply key-level regexes without re-skipping the delimiter.
func findPropertyBraceRange(src, prop string) bodyRange {
	// Find every occurrence of the property anchor; the literal body is
	// always the one opened by the nearest following `{`. Multiple matches
	// can occur when a site defines both `params` and `body` — the caller
	// invokes this helper once per property.
	anchor := regexp.MustCompile(`(?m)\b` + regexp.QuoteMeta(prop) + `\s*:\s*\{`)
	m := anchor.FindStringIndex(src)
	if m == nil {
		return bodyRange{-1, -1}
	}
	// m[1]-1 is the `{` position; findMatchingBrace locates its partner.
	open := m[1] - 1
	closeIdx := findMatchingBrace(src, open, len(src))
	if closeIdx < 0 {
		return bodyRange{-1, -1}
	}
	return bodyRange{start: open + 1, end: closeIdx}
}

// scanParamsOrBody inspects a params or body literal and returns findings
// for every drift-worthy wire key (case-flip + snake_case + SCREAMING).
func scanParamsOrBody(
	full string,
	r bodyRange,
	bodyOffset int,
	fullSrc, file, endpoint, method, url string,
	repo TSConsumerRepo,
	kind string,
) []TSFinding {
	if !r.valid() {
		return nil
	}
	snippet := full[r.start:r.end]
	var out []TSFinding

	// Walk every `key:` pair. An assignment like `orgID: queryArg.orgId`
	// surfaces as a case-flip; a bare snake_case key like `pattern_data`
	// surfaces as a snake-case-wrapper (body kind) or snake-case-param
	// (params kind). Keys in the allow-list (pagination envelope) are
	// skipped to avoid false positives on contract-required fields.
	for _, m := range tsWireKeyRE.FindAllStringSubmatchIndex(snippet, -1) {
		if len(m) < 4 {
			continue
		}
		key := snippet[m[2]:m[3]]
		if _, allowed := tsAllowedSnakeKeys[key]; allowed {
			continue
		}

		absLine := lineOf(fullSrc, bodyOffset+r.start+m[2])

		// SCREAMING_CASE / mixed-case key — emit as case-flip.
		if hasMixedCase(key) {
			out = append(out, TSFinding{
				Repo:     repo,
				File:     file,
				Line:     absLine,
				Endpoint: endpoint,
				URL:      url,
				Method:   method,
				Kind:     TSFindingCaseFlip,
				Key:      key,
				Message:  fmt.Sprintf("wire key %q preserves legacy SCREAMING/mixed casing instead of camelCase schema contract", key),
			})
			continue
		}
		if isSnakeCase(key) {
			findingKind := TSFindingSnakeCaseParam
			if kind == "body" {
				findingKind = TSFindingSnakeCaseWrapper
			}
			out = append(out, TSFinding{
				Repo:     repo,
				File:     file,
				Line:     absLine,
				Endpoint: endpoint,
				URL:      url,
				Method:   method,
				Kind:     findingKind,
				Key:      key,
				Message:  fmt.Sprintf("wire key %q uses snake_case instead of camelCase schema contract", key),
			})
		}
	}

	return out
}

// hasMixedCase returns true if an identifier departs from the canonical
// camelCase wire contract. A value is flagged when any of the following
// holds:
//
//   - All-uppercase identifier (`ID`, `ORGID`) — pure SCREAMING.
//   - PascalCase identifier (`OrgId`, `UserID`) — starts with an
//     uppercase letter but has lowercase too; wire keys must start
//     lowercase.
//   - camelCase that embeds a 2+ consecutive-uppercase acronym cluster
//     (`orgID`, `userURL`, `apiID`) — the SCREAMING initialism drift.
//
// Canonical camelCase like `orgId` (only one uppercase transition, not
// two in a row) is NOT flagged — that's the published wire form.
func hasMixedCase(s string) bool {
	if s == "" {
		return false
	}
	hasLower, hasUpper := false, false
	for i := 0; i < len(s); i++ {
		c := s[i]
		if c >= 'a' && c <= 'z' {
			hasLower = true
		}
		if c >= 'A' && c <= 'Z' {
			hasUpper = true
		}
	}
	// All-uppercase (ID, ORGID).
	if hasUpper && !hasLower {
		return true
	}
	// PascalCase — starts with uppercase but has lowercase later.
	if s[0] >= 'A' && s[0] <= 'Z' && hasLower {
		return true
	}
	// camelCase with a 2+ consecutive-uppercase cluster (orgID, userURL).
	sawLower := false
	for i := 0; i < len(s); i++ {
		c := s[i]
		if c >= 'a' && c <= 'z' {
			sawLower = true
			continue
		}
		if c >= 'A' && c <= 'Z' && sawLower {
			if i+1 < len(s) && s[i+1] >= 'A' && s[i+1] <= 'Z' {
				return true
			}
		}
	}
	return false
}

// isSnakeCase reports whether an identifier contains `_` — the coarse
// discriminator between snake_case and camelCase. We intentionally do
// *not* parse the full identifier; the presence of `_` is the contract
// violation (the migration plan camelCases wire keys unconditionally
// except for the fixed pagination envelope).
func isSnakeCase(s string) bool {
	return strings.Contains(s, "_")
}
