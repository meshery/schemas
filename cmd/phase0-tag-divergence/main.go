// Command phase0-tag-divergence scans Go struct tags across the meshery and
// meshery-cloud server/models directories and produces the Phase 0 Agent 0.B
// tag-divergence baseline (validation/baseline/tag-divergence.json) used by
// the identifier-naming migration
// (see docs/schema-tooling.md).
//
// Each scanned field is evaluated against three criteria from Agent 0.B's
// charter:
//
//  1. `json:` tag differs from `db:` tag — either in form (camelCase json vs
//     snake_case db) or in value (mapping to a different column name).
//  2. Multiple JSON-tag conventions appear within a single struct (e.g., one
//     field camelCase, another snake_case).
//  3. The `json:` tag is ALL CAPS or contains an all-caps acronym token like
//     `ID` / `URL` that the canonical contract retires.
//
// Output JSON is structured as a flat record list plus a summary of per-
// classification counts, suitable for diff-auditing across the migration.
package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"go/ast"
	"go/parser"
	"go/token"
	"io/fs"
	"os"
	"path/filepath"
	"reflect"
	"sort"
	"strings"
	"time"
)

type casingForm string

const (
	casingCamel     casingForm = "camelCase"
	casingSnake     casingForm = "snake_case"
	casingPascal    casingForm = "PascalCase"
	casingScreaming casingForm = "SCREAMING"
	casingLower     casingForm = "lowercase"
	casingMixed     casingForm = "mixed"
	casingEmpty     casingForm = ""
)

// classification flags a field against Agent 0.B's criteria. A field can
// carry more than one flag; the zero value (an empty slice) means the field
// is clean under the canonical contract.
type classification string

const (
	classJSONDBFormMismatch  classification = "json_db_form_mismatch"   // casings differ
	classJSONDBValueMismatch classification = "json_db_value_mismatch"  // names differ after normalizing casing
	classScreamingJSON       classification = "screaming_json"          // json tag contains ALL CAPS
	classMixedStruct         classification = "mixed_struct_conventions" // host struct has multiple JSON casings
	classSuppressed          classification = "json_dash"                // json:"-" — not serialized, reported for visibility
)

type fieldRecord struct {
	Repo            string           `json:"repo"`
	File            string           `json:"file"`
	Line            int              `json:"line"`
	Type            string           `json:"type"`
	Field           string           `json:"field"`
	JSONTag         string           `json:"json_tag"`
	JSONTagCasing   casingForm       `json:"json_tag_casing,omitempty"`
	DBTag           string           `json:"db_tag,omitempty"`
	DBTagCasing     casingForm       `json:"db_tag_casing,omitempty"`
	Classifications []classification `json:"classifications,omitempty"`
}

type summaryCounts struct {
	TotalStructs        int `json:"total_structs_scanned"`
	StructsWithTags     int `json:"structs_with_any_tag"`
	TotalFieldsWithTag  int `json:"total_fields_with_any_tag"`

	FormMismatch       int `json:"json_db_form_mismatch"`
	ValueMismatch      int `json:"json_db_value_mismatch"`
	ScreamingJSON      int `json:"screaming_json"`
	MixedStructs       int `json:"mixed_struct_conventions_structs"`
	JSONDash           int `json:"json_dash"`

	JSONByCasing map[casingForm]int `json:"json_tags_by_casing"`
	DBByCasing   map[casingForm]int `json:"db_tags_by_casing"`
}

type baselineReport struct {
	GeneratedAt    time.Time     `json:"generated_at"`
	GeneratedBy    string        `json:"generated_by"`
	Scope          string        `json:"scope"`
	Repos          []string      `json:"repos"`
	FilesProcessed int           `json:"files_processed"`
	ParseErrors    []string      `json:"parse_errors,omitempty"`
	Summary        summaryCounts `json:"summary"`
	Records        []fieldRecord `json:"records,omitempty"`
}

type repoSpec struct {
	label string
	path  string
	rel   string // relative directory under the repo root to scan
}

func main() {
	mesheryRepo := flag.String("meshery-repo", "../meshery",
		"Path to the meshery/meshery repository root")
	cloudRepo := flag.String("cloud-repo", "../meshery-cloud",
		"Path to the layer5io/meshery-cloud repository root")
	mesheryRel := flag.String("meshery-models-dir", "server/models",
		"Relative directory under meshery-repo to scan for Go struct models")
	cloudRel := flag.String("cloud-models-dir", "server/models",
		"Relative directory under cloud-repo to scan for Go struct models")
	output := flag.String("o", "validation/baseline/tag-divergence.json",
		"Output path for the JSON report (relative to repo root)")
	withRecords := flag.Bool("records", false,
		"Include the full per-field record list in the report (useful for local verification; omitted from the committed artifact by default)")
	verbose := flag.Bool("v", false, "Print per-file progress to stderr")
	flag.Parse()

	rootDir, err := findRepoRoot()
	if err != nil {
		fmt.Fprintf(os.Stderr, "error: could not find schemas repository root: %v\n", err)
		os.Exit(1)
	}

	repos := []repoSpec{
		{label: "meshery/meshery", path: *mesheryRepo, rel: *mesheryRel},
		{label: "layer5io/meshery-cloud", path: *cloudRepo, rel: *cloudRel},
	}

	report := baselineReport{
		GeneratedAt: time.Now().UTC().Truncate(time.Second),
		GeneratedBy: "cmd/phase0-tag-divergence",
		Scope:       "Go struct fields with json:/db: tags under each repo's server/models directory",
	}
	for _, r := range repos {
		report.Repos = append(report.Repos, r.label)
	}

	var allRecords []fieldRecord
	var allParseErrors []string
	for _, r := range repos {
		abs, err := resolveAbsolutePath(rootDir, r.path)
		if err != nil {
			fmt.Fprintf(os.Stderr, "warn: repo %q (%s): %v — skipping\n", r.label, r.path, err)
			continue
		}
		modelsDir := filepath.Join(abs, filepath.FromSlash(r.rel))
		if info, err := os.Stat(modelsDir); err != nil || !info.IsDir() {
			fmt.Fprintf(os.Stderr, "warn: %s: %s is not a directory — skipping\n", r.label, modelsDir)
			continue
		}
		recs, fileCount, structCount, parseErrors, err := scanRepo(r.label, abs, r.rel, *verbose)
		if err != nil {
			fmt.Fprintf(os.Stderr, "warn: %s: %v\n", r.label, err)
			continue
		}
		report.FilesProcessed += fileCount
		report.Summary.TotalStructs += structCount
		allRecords = append(allRecords, recs...)
		allParseErrors = append(allParseErrors, parseErrors...)
	}
	report.ParseErrors = allParseErrors

	sort.SliceStable(allRecords, func(i, j int) bool {
		a, b := allRecords[i], allRecords[j]
		if a.Repo != b.Repo {
			return a.Repo < b.Repo
		}
		if a.File != b.File {
			return a.File < b.File
		}
		if a.Type != b.Type {
			return a.Type < b.Type
		}
		return a.Line < b.Line
	})

	report.Summary = aggregateSummary(report.Summary, allRecords)
	report.Records = allRecords
	if !*withRecords {
		report.Records = nil
	}

	outPath := filepath.Join(rootDir, filepath.FromSlash(*output))
	if err := os.MkdirAll(filepath.Dir(outPath), 0o755); err != nil {
		fmt.Fprintf(os.Stderr, "error: creating output dir: %v\n", err)
		os.Exit(1)
	}
	data, err := json.MarshalIndent(report, "", "  ")
	if err != nil {
		fmt.Fprintf(os.Stderr, "error: marshaling report: %v\n", err)
		os.Exit(1)
	}
	data = append(data, '\n')
	if err := os.WriteFile(outPath, data, 0o644); err != nil {
		fmt.Fprintf(os.Stderr, "error: writing %s: %v\n", outPath, err)
		os.Exit(1)
	}

	fmt.Printf("phase0-tag-divergence: %d files, %d structs, %d tagged fields -> %s\n",
		report.FilesProcessed, report.Summary.TotalStructs, report.Summary.TotalFieldsWithTag,
		relPath(rootDir, outPath))
	fmt.Printf("  form-mismatch=%d  value-mismatch=%d  screaming-json=%d  mixed-structs=%d  json-dash=%d\n",
		report.Summary.FormMismatch, report.Summary.ValueMismatch,
		report.Summary.ScreamingJSON, report.Summary.MixedStructs, report.Summary.JSONDash)
}

// scanRepo parses every non-test .go file under `<repoAbs>/<rel>` and returns
// the field records plus counts of files + structs scanned and any parse
// errors surfaced along the way. Parse errors do not abort the walk but are
// returned so the caller can decide (e.g., fail the baseline build when
// invoked from CI).
func scanRepo(label, repoAbs, rel string, verbose bool) (records []fieldRecord, fileCount, structCount int, parseErrors []string, err error) {
	root := filepath.Join(repoAbs, filepath.FromSlash(rel))

	walkErr := filepath.WalkDir(root, func(p string, d fs.DirEntry, walkErr error) error {
		if walkErr != nil {
			return walkErr
		}
		if d.IsDir() {
			return nil
		}
		name := d.Name()
		if !strings.HasSuffix(name, ".go") {
			return nil
		}
		if strings.HasSuffix(name, "_test.go") {
			return nil
		}

		frecs, structs, ferr := scanFile(label, repoAbs, p)
		if ferr != nil {
			// Parse errors make the baseline untrustworthy: report them on
			// stderr unconditionally and record the path so the caller can
			// decide whether to fail. We continue walking so one malformed
			// file doesn't abort the full scan.
			fmt.Fprintf(os.Stderr, "warn: %s: %s: parse error: %v\n", label, relFrom(repoAbs, p), ferr)
			parseErrors = append(parseErrors, fmt.Sprintf("%s:%s", label, relFrom(repoAbs, p)))
			return nil
		}
		if verbose {
			fmt.Fprintf(os.Stderr, "%s: %s: %d structs, %d tagged fields\n", label, relFrom(repoAbs, p), structs, len(frecs))
		}
		fileCount++
		structCount += structs
		records = append(records, frecs...)
		return nil
	})
	return records, fileCount, structCount, parseErrors, walkErr
}

// scanFile parses one Go source file and returns records for every struct
// field that carries a `json` or `db` tag.
func scanFile(label, repoAbs, absPath string) ([]fieldRecord, int, error) {
	fset := token.NewFileSet()
	file, err := parser.ParseFile(fset, absPath, nil, parser.SkipObjectResolution)
	if err != nil {
		return nil, 0, err
	}
	rel := relFrom(repoAbs, absPath)

	var records []fieldRecord
	var structs int

	ast.Inspect(file, func(n ast.Node) bool {
		ts, ok := n.(*ast.TypeSpec)
		if !ok {
			return true
		}
		st, ok := ts.Type.(*ast.StructType)
		if !ok {
			return true
		}
		structs++

		typeName := ts.Name.Name
		var structRecords []fieldRecord
		for _, field := range st.Fields.List {
			if field.Tag == nil {
				continue
			}
			// Struct tag literal includes surrounding backticks; trim them.
			rawTag := strings.Trim(field.Tag.Value, "`")
			st := reflect.StructTag(rawTag)
			jsonRaw, jsonOk := st.Lookup("json")
			dbRaw, dbOk := st.Lookup("db")
			if !jsonOk && !dbOk {
				continue
			}

			jsonName := tagName(jsonRaw)
			dbName := tagName(dbRaw)

			if len(field.Names) == 0 {
				// Embedded / unnamed fields are not the target of the canonical contract's
				// identifier-naming rules.
				continue
			}
			// Multi-name declarations (`A, B string `tag...``) share one tag
			// literal; emit a record per declared name so nothing is silently
			// dropped. Each record's Line points at the specific name token,
			// not the shared field position, so downstream readers can
			// locate each identifier precisely.
			for _, ident := range field.Names {
				if ident == nil {
					continue
				}
				rec := fieldRecord{
					Repo:          label,
					File:          rel,
					Line:          fset.Position(ident.Pos()).Line,
					Type:          typeName,
					Field:         ident.Name,
					JSONTag:       jsonRaw,
					JSONTagCasing: classify(jsonName),
					DBTag:         dbRaw,
					DBTagCasing:   classify(dbName),
				}
				rec.Classifications = classifyField(jsonName, dbName)
				structRecords = append(structRecords, rec)
			}
		}

		// Second pass within this struct: mixed conventions are flagged when
		// the struct carries fields from two genuinely different casing
		// groups. lowercase single-word tags (`name`, `metadata`) count as
		// the camelCase default for that word and do not conflict with
		// camelCase; similar for explicitly classifying ambiguous boundaries.
		groups := map[string]struct{}{}
		for _, r := range structRecords {
			g := casingGroup(r.JSONTagCasing)
			if g == "" {
				continue
			}
			groups[g] = struct{}{}
		}
		if len(groups) > 1 {
			for i := range structRecords {
				structRecords[i].Classifications = appendClassification(structRecords[i].Classifications, classMixedStruct)
			}
		}

		records = append(records, structRecords...)
		return true
	})

	return records, structs, nil
}

// tagName extracts the first segment of a struct-tag value (`name,omitempty`
// -> `name`). Returns "" on an empty tag.
func tagName(raw string) string {
	if raw == "" {
		return ""
	}
	if idx := strings.Index(raw, ","); idx >= 0 {
		return raw[:idx]
	}
	return raw
}

// classify names the casing form of a tag token. See Agent 0.B's charter and
// the canonical contract for the discriminators.
func classify(s string) casingForm {
	if s == "" {
		return casingEmpty
	}
	if s == "-" {
		return casingEmpty // json:"-" / db:"-" is not a name form
	}
	hasUnderscore := strings.Contains(s, "_")
	hasUpper := strings.IndexFunc(s, func(r rune) bool { return r >= 'A' && r <= 'Z' }) >= 0
	hasLower := strings.IndexFunc(s, func(r rune) bool { return r >= 'a' && r <= 'z' }) >= 0
	first := rune(s[0])
	switch {
	case hasUnderscore && !hasUpper:
		return casingSnake
	case hasUnderscore && hasUpper:
		return casingMixed
	case !hasLower && hasUpper:
		return casingScreaming
	case first >= 'A' && first <= 'Z' && hasLower:
		return casingPascal
	case first >= 'a' && first <= 'z' && hasUpper:
		return casingCamel
	case first >= 'a' && first <= 'z' && !hasUpper:
		return casingLower
	default:
		return casingMixed
	}
}

// casingGroup collapses the casing taxonomy into four buckets used for the
// per-struct mixed-convention check: camel-family (camelCase and
// single-word lowercase share the same wire contract), snake, Pascal,
// screaming. Empty inputs return "" to exclude them from the group set.
func casingGroup(c casingForm) string {
	switch c {
	case casingCamel, casingLower:
		return "camel"
	case casingSnake:
		return "snake"
	case casingPascal:
		return "pascal"
	case casingScreaming:
		return "screaming"
	case casingMixed:
		return "mixed"
	default:
		return ""
	}
}

// hasScreamingToken detects an ALL-CAPS acronym token of 2+ letters in a
// camelCase or PascalCase name (e.g., `userID`, `OrgID`, `ContentURL`).
func hasScreamingToken(s string) bool {
	run := 0
	for i := 0; i < len(s); i++ {
		c := s[i]
		if c >= 'A' && c <= 'Z' {
			run++
			if run >= 2 {
				return true
			}
			continue
		}
		if c == '_' {
			run = 0
			continue
		}
		run = 0
	}
	return false
}

// classifyField applies Agent 0.B criteria (i), (iii), and json:"-" tracking.
// Mixed-convention (criterion ii) is handled at the struct level by the
// caller.
func classifyField(jsonName, dbName string) []classification {
	var out []classification
	if jsonName == "-" {
		out = append(out, classSuppressed)
	}
	if jsonName != "" && jsonName != "-" {
		if jsonName == strings.ToUpper(jsonName) && strings.ContainsAny(jsonName, "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
			out = append(out, classScreamingJSON)
		} else if hasScreamingToken(jsonName) {
			out = append(out, classScreamingJSON)
		}
	}
	if jsonName != "" && dbName != "" && jsonName != "-" && dbName != "-" {
		jc := classify(jsonName)
		dc := classify(dbName)
		if jc != dc {
			out = append(out, classJSONDBFormMismatch)
		}
		if normalizeName(jsonName) != normalizeName(dbName) {
			out = append(out, classJSONDBValueMismatch)
		}
	}
	return out
}

// normalizeName lowercases an identifier and drops the separator runes
// `_`, `-`, and `.` so camelCase and snake_case variants of the same base
// name compare equal. Non-ASCII and digit characters are preserved verbatim
// (only uppercase ASCII is lowercased). Examples:
//
//	"userId"  -> "userid"
//	"user_id" -> "userid"
//	"userID"  -> "userid"
//	"plan-v2" -> "planv2"
func normalizeName(s string) string {
	var b strings.Builder
	b.Grow(len(s))
	for _, r := range s {
		if r == '_' || r == '-' || r == '.' {
			continue
		}
		if r >= 'A' && r <= 'Z' {
			r = r + ('a' - 'A')
		}
		b.WriteRune(r)
	}
	return b.String()
}

func appendClassification(existing []classification, c classification) []classification {
	for _, e := range existing {
		if e == c {
			return existing
		}
	}
	return append(existing, c)
}

// aggregateSummary populates summary counters from the record list.
func aggregateSummary(base summaryCounts, records []fieldRecord) summaryCounts {
	s := base
	s.JSONByCasing = map[casingForm]int{}
	s.DBByCasing = map[casingForm]int{}

	structsWithTags := map[string]bool{}
	mixedStructs := map[string]bool{}
	for _, r := range records {
		s.TotalFieldsWithTag++
		structsWithTags[r.Repo+"|"+r.File+"|"+r.Type] = true
		if r.JSONTagCasing != casingEmpty {
			s.JSONByCasing[r.JSONTagCasing]++
		}
		if r.DBTagCasing != casingEmpty {
			s.DBByCasing[r.DBTagCasing]++
		}
		for _, c := range r.Classifications {
			switch c {
			case classJSONDBFormMismatch:
				s.FormMismatch++
			case classJSONDBValueMismatch:
				s.ValueMismatch++
			case classScreamingJSON:
				s.ScreamingJSON++
			case classMixedStruct:
				mixedStructs[r.Repo+"|"+r.File+"|"+r.Type] = true
			case classSuppressed:
				s.JSONDash++
			}
		}
	}
	s.StructsWithTags = len(structsWithTags)
	s.MixedStructs = len(mixedStructs)
	return s
}

// findRepoRoot walks up from cwd looking for go.mod.
func findRepoRoot() (string, error) {
	dir, err := os.Getwd()
	if err != nil {
		return "", err
	}
	for {
		if _, err := os.Stat(filepath.Join(dir, "go.mod")); err == nil {
			return dir, nil
		}
		parent := filepath.Dir(dir)
		if parent == dir {
			return "", fmt.Errorf("go.mod not found in any parent directory")
		}
		dir = parent
	}
}

// resolveAbsolutePath resolves a possibly-relative repo path against the
// schemas rootDir so that `--meshery-repo=../meshery` works regardless of
// the caller's cwd.
func resolveAbsolutePath(rootDir, p string) (string, error) {
	if filepath.IsAbs(p) {
		return p, nil
	}
	abs := filepath.Join(rootDir, p)
	return filepath.Clean(abs), nil
}

func relFrom(base, p string) string {
	rel, err := filepath.Rel(base, p)
	if err != nil {
		return p
	}
	return filepath.ToSlash(rel)
}

func relPath(rootDir, absPath string) string {
	rel, err := filepath.Rel(rootDir, absPath)
	if err != nil {
		return absPath
	}
	return filepath.ToSlash(rel)
}
