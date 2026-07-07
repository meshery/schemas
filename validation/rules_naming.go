package validation

import (
	"fmt"
	"sort"
	"strings"

	"github.com/getkin/kin-openapi/openapi3"
)

// Rule 3: operationId must be lower camelCase verbNoun.
func checkRule3(filePath string, doc *openapi3.T, opts AuditOptions) []Violation {
	sev := classifyStyleIssue(opts)
	if sev == nil {
		return nil
	}
	if doc == nil || doc.Paths == nil {
		return nil
	}
	var out []Violation
	for path, item := range doc.Paths.Map() {
		for _, method := range httpMethods {
			op := getOperation(item, method)
			if op == nil || op.OperationID == "" {
				continue
			}
			opID := op.OperationID
			label := fmt.Sprintf("%s %s", strings.ToUpper(method), path)

			if !IsValidOperationID(opID) {
				out = append(out, Violation{
					File:       filePath,
					Message:    fmt.Sprintf(`%s - operationId %q must use lower camelCase verbNoun (e.g. "getPatterns"). See AGENTS.md § "Casing rules at a glance".`, label, opID),
					Severity:   *sev,
					RuleNumber: 3,
				})
			} else if HasScreamingOperationIDSuffix(opID) {
				suggestion := SuggestOperationID(opID)
				out = append(out, Violation{
					File:       filePath,
					Message:    fmt.Sprintf(`%s - operationId %q uses "ID" suffix instead of "Id". Use: %q. See docs/casing-rules.md.`, label, opID, suggestion),
					Severity:   *sev,
					RuleNumber: 3,
				})
			}
		}
	}
	return out
}

// Rule 4: URL parameters (path + query) must be camelCase with Id suffix.
//
// Path parameters are detected from the path template (`{...}` placeholders)
// so a path like `/api/foo/{orgID}` is flagged even when no `parameters: [{in: path}]`
// block is declared. Query parameters are detected from every
// `parameters: [{in: query, name: ...}]` block visible at either path-level or
// operation-level, including entries resolved from `$ref` to
// `components/parameters/*` - kin-openapi materialises the referenced
// parameter into `p.Value` so inline and referenced forms are covered
// uniformly (see `collectAllParams`).
//
// The canonical URL-parameter contract is camelCase with an `Id` suffix for
// ID-like names (see docs/casing-rules.md - URL path params
// + ID-like query params). The same `IsBadPathParam`/`SuggestPathParam`
// predicate governs both path and query parameters because they share the
// same wire contract: both appear in the client-visible URL.
//
// Header parameters are intentionally out of scope: some HTTP headers are
// legitimately non-camel (`Accept-Language`, `If-None-Match`) and belong to
// external standards rather than to our own naming contract. Rule 9 covers
// query + header parameter casing at a looser-but-broader layer (any non-
// camelCase), so between the two rules: Rule 4 enforces the URL-parameter
// `Id`-suffix convention across path+query, and Rule 9 enforces generic
// camelCase for query+header. Overlap on query parameters is intentional -
// each rule reports under a distinct RuleNumber so baseline tooling can
// classify them separately, and the messages identify the parameter role
// ("path parameter" vs "query parameter") so reviewers see where in the
// request contract the violation lives.
func checkRule4(filePath string, doc *openapi3.T, opts AuditOptions) []Violation {
	sev := classifyStyleIssue(opts)
	if sev == nil {
		return nil
	}
	if doc == nil || doc.Paths == nil {
		return nil
	}
	var out []Violation

	paths := make([]string, 0, len(doc.Paths.Map()))
	pathsMap := doc.Paths.Map()
	for path := range pathsMap {
		paths = append(paths, path)
	}
	sort.Strings(paths)

	for _, path := range paths {
		item := pathsMap[path]

		// Path parameters - detected from the path template. A single
		// placeholder appears once per template; no dedup needed.
		matches := pathParamRE.FindAllStringSubmatch(path, -1)
		for _, m := range matches {
			param := m[1]
			if IsBadPathParam(param) {
				suggestion := SuggestPathParam(param)
				out = append(out, Violation{
					File:       filePath,
					Message:    fmt.Sprintf(`Path %q - path parameter {%s} uses incorrect casing. Use camelCase (and an "Id" suffix for id-like names): {%s}. See AGENTS.md § "Casing rules at a glance".`, path, param, suggestion),
					Severity:   *sev,
					RuleNumber: 4,
				})
			}
		}

		// Query parameters - walked from every `parameters: [{in: query}]`
		// block on this path (path-level + every method). A single
		// `components/parameters/*` reference used at both path-level and
		// op-level would otherwise surface twice per path; dedupe by wire
		// name within a path so the violation list reflects the contract
		// (one query parameter per URL) rather than the YAML structure.
		if item == nil {
			continue
		}
		seen := make(map[string]bool)
		names := make([]string, 0)
		for _, p := range collectAllParams(item) {
			if p == nil || p.Value == nil || p.Value.In != openapi3.ParameterInQuery {
				continue
			}
			name := p.Value.Name
			if name == "" || seen[name] {
				continue
			}
			seen[name] = true
			names = append(names, name)
		}
		sort.Strings(names)
		for _, name := range names {
			if !IsBadPathParam(name) {
				continue
			}
			suggestion := SuggestPathParam(name)
			out = append(out, Violation{
				File:       filePath,
				Message:    fmt.Sprintf(`Path %q - query parameter %q uses incorrect casing. Use camelCase (and an "Id" suffix for id-like names): %q. See AGENTS.md § "Casing rules at a glance".`, path, name, suggestion),
				Severity:   *sev,
				RuleNumber: 4,
			})
		}
	}
	return out
}

// Rule 6: schema property names (on api.yml components/schemas).
//
// Under the canonical identifier-naming contract (docs/schema-tooling.md §
// Identifier-naming migration, docs/casing-rules.md), every schema
// property name / JSON tag is camelCase regardless of DB backing. Rule 6 is
// therefore unconditional - DB-mirrored fields are no longer exempt and are
// flagged through the same `--style-debt` severity path as any other
// legacy snake_case wire identifier. Known legacy DB-mirrored names are
// still tracked via the `dbMirroredFields` set in casing.go for use by
// matcher.go's consumer-type diff.
func checkRule6ForAPI(filePath string, doc *openapi3.T, opts AuditOptions) []Violation {
	sev := classifyStyleIssue(opts)
	if sev == nil {
		return nil
	}
	if doc == nil || doc.Components == nil || doc.Components.Schemas == nil {
		return nil
	}
	var out []Violation
	schemaNames := make([]string, 0, len(doc.Components.Schemas))
	for name := range doc.Components.Schemas {
		schemaNames = append(schemaNames, name)
	}
	sort.Strings(schemaNames)
	for _, schemaName := range schemaNames {
		schemaRef := doc.Components.Schemas[schemaName]
		if schemaRef == nil || schemaRef.Value == nil {
			continue
		}
		out = append(out, checkPropertyNameCasing(filePath, schemaName, schemaRef.Value, *sev)...)
	}
	return out
}

// checkPropertyNameCasing walks a schema and its inline composition branches
// (allOf / anyOf / oneOf) and array `items`, reporting Rule 6 camelCase
// violations on every directly-declared property name it encounters.
// Property iteration is alphabetised so that violation order is
// deterministic across runs - baseline files rely on this.
//
// `$ref` pointers are not followed: referenced schemas are walked as their
// own components by the outer checkRule6ForAPI loop, so following refs here
// would double-count. This also sidesteps any risk of cyclic recursion.
func checkPropertyNameCasing(filePath, schemaName string, schema *openapi3.Schema, sev Severity) []Violation {
	if schema == nil {
		return nil
	}
	var out []Violation

	if schema.Properties != nil {
		propNames := make([]string, 0, len(schema.Properties))
		for name := range schema.Properties {
			propNames = append(propNames, name)
		}
		sort.Strings(propNames)
		for _, propName := range propNames {
			if strings.HasPrefix(propName, "$") {
				continue
			}
			issues := GetCamelCaseIssues(propName)
			if len(issues) > 0 {
				descs := make([]string, len(issues))
				for i, iss := range issues {
					descs[i] = iss.Description
				}
				suggestion := GetCamelCaseSuggestion(propName)
				msg := fmt.Sprintf(`Schema %q - property %q %s.`, schemaName, propName, strings.Join(descs, "; "))
				if suggestion != "" {
					msg += fmt.Sprintf(` Use: %q.`, suggestion)
				}
				msg += schemaPropertyDBContext(propName)
				msg += ` See docs/casing-rules.md.`
				out = append(out, Violation{File: filePath, Message: msg, Severity: sev, RuleNumber: 6})
			}
			// Recurse into the property's own schema to surface nested
			// composite shapes (inline object with its own properties,
			// array items, nested allOf/anyOf/oneOf).
			if sub := schema.Properties[propName]; sub != nil && sub.Value != nil && sub.Ref == "" {
				out = append(out, checkPropertyNameCasing(filePath, schemaName, sub.Value, sev)...)
			}
		}
	}

	for _, sub := range schema.AllOf {
		if sub != nil && sub.Value != nil && sub.Ref == "" {
			out = append(out, checkPropertyNameCasing(filePath, schemaName, sub.Value, sev)...)
		}
	}
	for _, sub := range schema.OneOf {
		if sub != nil && sub.Value != nil && sub.Ref == "" {
			out = append(out, checkPropertyNameCasing(filePath, schemaName, sub.Value, sev)...)
		}
	}
	for _, sub := range schema.AnyOf {
		if sub != nil && sub.Value != nil && sub.Ref == "" {
			out = append(out, checkPropertyNameCasing(filePath, schemaName, sub.Value, sev)...)
		}
	}
	if schema.Items != nil && schema.Items.Value != nil && schema.Items.Ref == "" {
		out = append(out, checkPropertyNameCasing(filePath, schemaName, schema.Items.Value, sev)...)
	}

	return out
}

// schemaPropertyDBContext returns a short suffix to append to a Rule 6
// violation message for schema / entity property names, calling out either
// the legacy-DB-mirrored migration hint (when the name is in the known
// mirrored set) or a generic reminder that snake_case belongs only on the
// `db:` tag (for other snake_case property names). Returns the empty
// string when no DB-specific context applies - so that this helper can be
// reused by Rule 6's entity path without pushing DB-specific wording into
// GetCamelCaseIssues (which is shared with non-DB contexts such as
// query/header parameter names).
func schemaPropertyDBContext(propName string) string {
	if dbMirroredFields[propName] {
		return ` (legacy DB-mirrored name - migrate at the resource's next API-version bump per docs/casing-rules.md)`
	}
	if HasUnderscore(propName) {
		return ` (snake_case belongs in the db: tag only)`
	}
	return ""
}

// Rule 7: components/schemas names must be PascalCase.
func checkRule7(filePath string, doc *openapi3.T, opts AuditOptions) []Violation {
	sev := classifyStyleIssue(opts)
	if sev == nil {
		return nil
	}
	if doc == nil || doc.Components == nil || doc.Components.Schemas == nil {
		return nil
	}
	var out []Violation
	for name := range doc.Components.Schemas {
		if !IsPascalCase(name) {
			suggestion := strings.ToUpper(name[:1]) + name[1:]
			out = append(out, Violation{
				File:       filePath,
				Message:    fmt.Sprintf(`Schema component name %q must be PascalCase. Suggested: %q. See docs/casing-rules.md.`, name, suggestion),
				Severity:   *sev,
				RuleNumber: 7,
			})
		}
	}
	return out
}

// Rule 9: query/header parameter names must be camelCase.
func checkRule9(filePath string, doc *openapi3.T, opts AuditOptions) []Violation {
	sev := classifyStyleIssue(opts)
	if sev == nil {
		return nil
	}
	if doc == nil || doc.Paths == nil {
		return nil
	}
	var out []Violation
	for path, item := range doc.Paths.Map() {
		allParams := collectAllParams(item)
		for _, p := range allParams {
			if p.Value == nil || (p.Value.In != "query" && p.Value.In != "header") {
				continue
			}
			name := p.Value.Name
			issues := GetCamelCaseIssues(name)
			if len(issues) > 0 {
				descs := make([]string, len(issues))
				for i, iss := range issues {
					descs[i] = iss.Description
				}
				suggestion := GetCamelCaseSuggestion(name)
				msg := fmt.Sprintf(`%s - %s parameter %q %s.`, path, p.Value.In, name, strings.Join(descs, "; "))
				if suggestion != "" {
					msg += fmt.Sprintf(` Use camelCase instead: %q.`, suggestion)
				}
				out = append(out, Violation{File: filePath, Message: msg, Severity: *sev, RuleNumber: 9})
			}
		}
	}
	return out
}

// Rule 10: path segments must be kebab-case.
func checkRule10(filePath string, doc *openapi3.T, opts AuditOptions) []Violation {
	sev := classifyStyleIssue(opts)
	if sev == nil {
		return nil
	}
	if doc == nil || doc.Paths == nil {
		return nil
	}
	var out []Violation
	for path := range doc.Paths.Map() {
		segments := strings.Split(path, "/")
		for _, seg := range segments {
			if seg == "" || strings.HasPrefix(seg, "{") || seg == "api" {
				continue
			}
			if !IsKebabCase(seg) {
				suggestion := toKebabCase(seg)
				out = append(out, Violation{
					File:       filePath,
					Message:    fmt.Sprintf(`Path %q - segment %q must be kebab-case. Suggested: %q. See docs/casing-rules.md.`, path, seg, suggestion),
					Severity:   *sev,
					RuleNumber: 10,
				})
			}
		}
	}
	return out
}

// --- helpers ---

func getOperation(item *openapi3.PathItem, method string) *openapi3.Operation {
	if item == nil {
		return nil
	}
	switch method {
	case "get":
		return item.Get
	case "post":
		return item.Post
	case "put":
		return item.Put
	case "patch":
		return item.Patch
	case "delete":
		return item.Delete
	}
	return nil
}

func collectAllParams(item *openapi3.PathItem) openapi3.Parameters {
	var all openapi3.Parameters
	if item.Parameters != nil {
		all = append(all, item.Parameters...)
	}
	for _, method := range httpMethods {
		op := getOperation(item, method)
		if op != nil && op.Parameters != nil {
			all = append(all, op.Parameters...)
		}
	}
	return all
}

func toKebabCase(s string) string {
	var result strings.Builder
	for i, r := range s {
		if r >= 'A' && r <= 'Z' {
			if i > 0 {
				result.WriteByte('-')
			}
			result.WriteRune(r + 32)
		} else if r == '_' {
			result.WriteByte('-')
		} else {
			result.WriteRune(r)
		}
	}
	return result.String()
}

// getExtensionDBTag extracts the db tag from x-oapi-codegen-extra-tags.
func getExtensionDBTag(ref *openapi3.SchemaRef) string {
	if ref == nil || ref.Value == nil {
		return ""
	}
	return getExtraTag(ref.Value.Extensions, "db")
}

// getExtensionGormColumn extracts the gorm column from x-oapi-codegen-extra-tags.
func getExtensionGormColumn(ref *openapi3.SchemaRef) string {
	if ref == nil || ref.Value == nil {
		return ""
	}
	gormTag := getExtraTag(ref.Value.Extensions, "gorm")
	if gormTag == "" {
		return ""
	}
	// Extract column:xxx from gorm tag.
	for _, part := range strings.Split(gormTag, ";") {
		part = strings.TrimSpace(part)
		if strings.HasPrefix(part, "column:") {
			return strings.TrimPrefix(part, "column:")
		}
	}
	return ""
}

func getExtraTag(extensions map[string]any, tagName string) string {
	raw, ok := extensions["x-oapi-codegen-extra-tags"]
	if !ok {
		return ""
	}
	tags, ok := raw.(map[string]any)
	if !ok {
		return ""
	}
	val, ok := tags[tagName]
	if !ok {
		return ""
	}
	s, ok := val.(string)
	if !ok {
		return ""
	}
	// Strip options after comma (e.g., "name,omitempty" → "name").
	if idx := strings.Index(s, ","); idx >= 0 {
		return s[:idx]
	}
	return s
}

// --- Rule 45: Partial casing migrations forbidden ---

// Rule 45 flags `components/schemas/<Entity>` objects whose effective
// wire-form property names (schema-property key, or the
// `x-oapi-codegen-extra-tags.json` override when present) mix two or more
// casing families - camel / snake / screaming. Under the canonical
// identifier-naming contract (docs/casing-rules.md), when a resource's wire format
// changes, the change must land on a new API version and migrate *every*
// property consistently. A struct that publishes `userId` + `user_id` +
// `orgId` is the symptom of a partial migration that forgot some fields
// - exactly the class of drift this rule catches (e.g., meshery/server
// `MesheryPattern` struct's `OrgID json:"orgId"` + `WorkspaceID
// json:"workspace_id"` + `UserID json:"user_id"`).
//
// Casing families (see classifyCasingFamily for the full taxonomy):
//   - camel     - starts lowercase, contains at least one uppercase, no
//                 consecutive-uppercase acronym run (`userId`, `orgId`).
//   - snake     - contains an underscore (`user_id`, `created_at`).
//   - screaming - all-uppercase, or contains a 2+ consecutive-uppercase
//                 acronym token (`ID`, `URL`, `orgID`, `pageURL`).
//   - lowercase - single-word all-lowercase, no underscore, no uppercase
//                 (`id`, `name`, `metadata`). Agnostic bucket: does NOT
//                 count toward the mixed-family trigger.
//
// Pure-camel and pure-snake structs both pass - a fully-legacy-snake
// struct is caught by Rule 6 independently. The rule fires only when
// two or more of {camel, snake, screaming} appear in the same struct;
// a mix with only the agnostic `lowercase` bucket is not a drift.
//
// Properties with `json:"-"` are excluded from the wire-name set
// (they don't reach the wire), so DB-only fields like `model_id` with
// `json:"-"` do not contribute a snake-family member.
//
// Composition: inline `allOf`/`anyOf`/`oneOf` branches and array `items`
// are walked as part of the *same* struct (their properties contribute to
// the same family set). `$ref` pointers are not followed - referenced
// components are walked as their own schemas by the outer loop.
//
// Severity is flag-gated via classifyStyleIssue - advisory under
// `--style-debt`, blocking under `--strict-consistency`, suppressed
// otherwise. The current repo has many legacy mixed structs; Agent 1.G
// will baseline them. Post-Phase-3, the rule should run clean.
func checkRule45ForAPI(filePath string, doc *openapi3.T, opts AuditOptions) []Violation {
	sev := classifyStyleIssue(opts)
	if sev == nil {
		return nil
	}
	if doc == nil || doc.Components == nil || doc.Components.Schemas == nil {
		return nil
	}
	var out []Violation
	schemaNames := make([]string, 0, len(doc.Components.Schemas))
	for name := range doc.Components.Schemas {
		schemaNames = append(schemaNames, name)
	}
	sort.Strings(schemaNames)

	for _, schemaName := range schemaNames {
		schemaRef := doc.Components.Schemas[schemaName]
		if schemaRef == nil || schemaRef.Value == nil {
			continue
		}
		families := map[string][]string{}
		collectCasingFamilies(schemaRef.Value, families)
		if !isMixedForRule45(families) {
			continue
		}
		out = append(out, Violation{
			File:       filePath,
			Message:    rule45Message(schemaName, families),
			Severity:   *sev,
			RuleNumber: 45,
		})
	}
	return out
}

// isMixedForRule45 returns true when the family set constitutes a
// partial-migration drift: at least two *distinct* casing conventions
// appear (camel / snake / screaming), ignoring the agnostic "lowercase"
// single-word bucket and the "other" catch-all. A struct with only
// lowercase single-word keys plus snake keys is not a partial migration;
// it's plain legacy, and Rule 6 already flags the snake keys.
func isMixedForRule45(families map[string][]string) bool {
	distinct := 0
	for f := range families {
		switch f {
		case "camel", "snake", "screaming":
			distinct++
		}
	}
	return distinct >= 2
}

// rule45Message renders the violation text for a schema that mixes casing
// families. Families are listed in deterministic order with their members
// sorted and deduplicated (composition can visit the same wire name more
// than once), so violation text is stable run-to-run and readable.
func rule45Message(schemaName string, families map[string][]string) string {
	familyNames := make([]string, 0, len(families))
	for f := range families {
		familyNames = append(familyNames, f)
	}
	sort.Strings(familyNames)

	var parts []string
	for _, f := range familyNames {
		members := append([]string(nil), families[f]...)
		sort.Strings(members)
		// Deduplicate adjacent entries (list is sorted).
		out := members[:0]
		for i, m := range members {
			if i == 0 || m != members[i-1] {
				out = append(out, m)
			}
		}
		parts = append(parts, fmt.Sprintf("%s: [%s]", f, strings.Join(out, ", ")))
	}
	return fmt.Sprintf(
		`Schema %q mixes JSON-tag casing conventions across its properties - %s. Partial casing migrations are forbidden under the canonical identifier-naming contract. If the wire format must change, introduce a new API version and migrate every property consistently. See docs/casing-rules.md.`,
		schemaName, strings.Join(parts, "; "))
}

// collectCasingFamilies accumulates every property's effective wire name
// into the families map, grouped by casing family. Recurses into inline
// composition (allOf/anyOf/oneOf) and array items so a schema assembled
// from composition is evaluated as one unit. Does not follow $ref.
func collectCasingFamilies(schema *openapi3.Schema, families map[string][]string) {
	if schema == nil {
		return
	}

	if schema.Properties != nil {
		propNames := make([]string, 0, len(schema.Properties))
		for name := range schema.Properties {
			propNames = append(propNames, name)
		}
		sort.Strings(propNames)
		for _, propName := range propNames {
			if strings.HasPrefix(propName, "$") {
				continue
			}
			propRef := schema.Properties[propName]
			effective := effectiveWireName(propRef, propName)
			if effective != "" {
				// `json:"-"` properties return "" from effectiveWireName
				// and are excluded from the wire-name set - they are
				// DB-only / internal and must not trigger Rule 45.
				family := classifyCasingFamily(effective)
				families[family] = append(families[family], effective)
			}
			// Recurse into the property's own schema (nested objects,
			// array items, composition) so inline composite shapes
			// contribute to the same family set.
			if propRef != nil && propRef.Value != nil && propRef.Ref == "" {
				collectCasingFamilies(propRef.Value, families)
			}
		}
	}

	for _, sub := range schema.AllOf {
		if sub != nil && sub.Value != nil && sub.Ref == "" {
			collectCasingFamilies(sub.Value, families)
		}
	}
	for _, sub := range schema.OneOf {
		if sub != nil && sub.Value != nil && sub.Ref == "" {
			collectCasingFamilies(sub.Value, families)
		}
	}
	for _, sub := range schema.AnyOf {
		if sub != nil && sub.Value != nil && sub.Ref == "" {
			collectCasingFamilies(sub.Value, families)
		}
	}
	if schema.Items != nil && schema.Items.Value != nil && schema.Items.Ref == "" {
		collectCasingFamilies(schema.Items.Value, families)
	}
}

// classifyCasingFamily returns the casing family for a wire-form
// identifier. The buckets used by Rule 45 are:
//
//   - "camel"     - camelCase (starts lowercase, at least one uppercase,
//                   no consecutive uppercase acronym). Example: "userId".
//   - "snake"     - contains an underscore. Example: "user_id".
//   - "screaming" - entirely uppercase, OR contains a 2+ consecutive-
//                   uppercase acronym token (e.g. "ID" in "orgID",
//                   "URL" in "pageURL", "HPA" in "HPAReplicas").
//   - "lowercase" - all-lowercase single word with no underscore. This
//                   is an agnostic bucket: `id`, `name`, `owner`,
//                   `metadata`, `status` - identifiers that are the
//                   canonical single-word form for both camel and snake
//                   traditions. Rule 45 treats this bucket as
//                   non-conflicting: it does not count as "the camel
//                   half of a snake/camel mix", because a legacy-snake
//                   struct that uses `id` alongside `user_id` is not a
//                   partial migration.
//   - "other"     - empty input or a form that doesn't fit any bucket.
func classifyCasingFamily(name string) string {
	if name == "" {
		return "other"
	}
	if HasUnderscore(name) {
		return "snake"
	}
	hasUpper := false
	hasLower := false
	for i := 0; i < len(name); i++ {
		c := name[i]
		if c >= 'A' && c <= 'Z' {
			hasUpper = true
		}
		if c >= 'a' && c <= 'z' {
			hasLower = true
		}
	}
	if hasUpper && !hasLower {
		return "screaming"
	}
	if hasConsecutiveUppercase(name) {
		return "screaming"
	}
	if !hasUpper {
		return "lowercase"
	}
	return "camel"
}

// hasConsecutiveUppercase reports whether name contains a run of two or
// more consecutive ASCII uppercase letters - a SCREAMING-acronym token
// such as "ID" in "orgID", "URL" in "pageURL", or "HPA" in "HPAReplicas".
func hasConsecutiveUppercase(name string) bool {
	run := 0
	for i := 0; i < len(name); i++ {
		c := name[i]
		if c >= 'A' && c <= 'Z' {
			run++
			if run >= 2 {
				return true
			}
			continue
		}
		run = 0
	}
	return false
}

// effectiveWireName returns the wire-visible name of a property, or the
// empty string when the property is not on the wire at all
// (`x-oapi-codegen-extra-tags.json: "-"`). Callers treat the empty return
// as "exclude from the wire-name set" - a `json:"-"` field must not
// contribute to Rule 45's family set because it is DB-only / internal,
// not part of the wire contract. The usual resolution is:
//
//   - If `json:"-"` is set, return "" (not on the wire).
//   - Otherwise if `x-oapi-codegen-extra-tags.json` names the wire form,
//     return that name (minus any `,omitempty` modifier - that's
//     stripped by getExtraTag).
//   - Otherwise fall back to the OpenAPI property key, which is the
//     JSON tag by default.
func effectiveWireName(propRef *openapi3.SchemaRef, propName string) string {
	if propRef == nil || propRef.Value == nil {
		return propName
	}
	// getExtraTag strips any `,omitempty` after the first comma, but does
	// not distinguish "no override" from "override is `-`". Consult the
	// raw extension map for the dash case.
	if raw, ok := propRef.Value.Extensions["x-oapi-codegen-extra-tags"].(map[string]any); ok {
		if js, ok := raw["json"].(string); ok {
			head := js
			if idx := strings.Index(js, ","); idx >= 0 {
				head = js[:idx]
			}
			if head == "-" {
				return ""
			}
			if head != "" {
				return head
			}
		}
	}
	return propName
}
