// Command phase0-field-count enumerates every JSON tag across the OpenAPI
// schemas in this repository and produces the Phase 0 Agent 0.A field-count
// baseline report (validation/baseline/field-count.json).
//
// Scope: every schema property in
//
//	schemas/constructs/v*/<construct>/api.yml            (OpenAPI component schemas)
//	schemas/constructs/v*/<construct>/<construct>.yaml   (standalone entity schemas)
//	schemas/constructs/v*/<entity>.yaml                  (top-level entity schemas)
//
// Template files under a templates/ subdirectory and files matching
// *_template.yaml are excluded (they are example instances, not schema
// definitions).
//
// The effective JSON tag for a property is resolved as:
//  1. x-oapi-codegen-extra-tags.json override, with any suffix after the first
//     comma stripped (e.g. `"userId,omitempty"` -> `userId`);
//  2. otherwise, the OpenAPI property name itself.
//
// The report is the input to Phase 1 rule authoring and Phase 3 sequencing in
// the identifier-naming migration
// (docs/identifier-naming-migration.md §6).
package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"time"

	"gopkg.in/yaml.v3"
)

// casingForm classifies a JSON tag by its surface form.
type casingForm string

const (
	casingCamel      casingForm = "camelCase"
	casingSnake      casingForm = "snake_case"
	casingPascal     casingForm = "PascalCase"
	casingScreaming  casingForm = "SCREAMING"
	casingLowerOnly  casingForm = "lowercase"
	casingSuppressed casingForm = "suppressed" // json:"-" — field is hidden from the wire
	casingOther      casingForm = "other"
)

// propertyRecord is one JSON-tag observation. Multiple entities referencing the
// same property name contribute separate records — the baseline measures
// migration surface, not unique keys.
type propertyRecord struct {
	Version      string     `json:"version"`
	Resource     string     `json:"resource"`
	File         string     `json:"file"`
	SchemaName   string     `json:"schema"`
	PropertyName string     `json:"property"`
	JSONTag      string     `json:"json_tag"`
	DBColumn     string     `json:"db_column,omitempty"`
	DBBacked     bool       `json:"db_backed"`
	Casing       casingForm `json:"casing"`
	Deprecated   bool       `json:"deprecated,omitempty"`
}

// resourceRow is the per-resource migration-surface row required by Agent 0.A.
type resourceRow struct {
	Resource            string `json:"resource"`
	Version             string `json:"version"`
	TotalTags           int    `json:"total_tags"`
	SnakeTagsToMigrate  int    `json:"snake_tags_to_migrate"`
	CamelTagsStable     int    `json:"camel_tags_stable"`
	PascalTags          int    `json:"pascal_tags"`
	ScreamingTags       int    `json:"screaming_tags"`
	SuppressedTags      int    `json:"suppressed_tags"`
	OtherTags           int    `json:"other_tags"`
	DBBackedTags        int    `json:"db_backed_tags"`
	NonDBBackedTags     int    `json:"non_db_backed_tags"`
	Deprecated          bool   `json:"deprecated,omitempty"`
}

// totals captures the global aggregate required by Agent 0.A.
type totals struct {
	TotalTags       int `json:"total_tags"`
	CamelCase       int `json:"camel_case"`
	SnakeCase       int `json:"snake_case"`
	PascalCase      int `json:"pascal_case"`
	Screaming       int `json:"screaming"`
	Lowercase       int `json:"lowercase"`
	Suppressed      int `json:"suppressed"`
	Other           int `json:"other"`
	DBBacked        int `json:"db_backed"`
	NonDBBacked     int `json:"non_db_backed"`
	PaginationTags  int `json:"pagination_envelope_tags"`
}

// baselineReport is the committed artifact. `Records` is omitted by default
// to keep the committed JSON reviewable; pass --records to emit the full
// per-property list (used for local verification, not diffed in CI).
type baselineReport struct {
	GeneratedAt    time.Time        `json:"generated_at"`
	GeneratedBy    string           `json:"generated_by"`
	Scope          string           `json:"scope"`
	FilesProcessed int              `json:"files_processed"`
	Totals         totals           `json:"totals"`
	PerResource    []resourceRow    `json:"per_resource"`
	Records        []propertyRecord `json:"records,omitempty"`
}

// paginationTagNames are fixed API-contract fields that stay snake_case by
// intentional design (docs/schema-review-checklist.md §Intentional Design Decisions #4). They are
// counted but excluded from snake_tags_to_migrate.
var paginationTagNames = map[string]bool{
	"page":        true,
	"page_size":   true,
	"pagesize":    true,
	"total_count": true,
	"totalcount":  true,
}

func main() {
	output := flag.String("o", "validation/baseline/field-count.json",
		"Output path for the JSON report (relative to repo root)")
	verbose := flag.Bool("v", false, "Print per-file progress to stderr")
	withRecords := flag.Bool("records", false,
		"Include the full per-property record list in the report (useful for local verification; omitted from the committed artifact by default)")
	flag.Parse()

	rootDir, err := findRepoRoot()
	if err != nil {
		fmt.Fprintf(os.Stderr, "error: could not find repository root: %v\n", err)
		os.Exit(1)
	}

	constructsDir := filepath.Join(rootDir, "schemas", "constructs")
	files, err := discoverSchemaFiles(constructsDir)
	if err != nil {
		fmt.Fprintf(os.Stderr, "error: discovering files: %v\n", err)
		os.Exit(1)
	}

	report := baselineReport{
		GeneratedAt: time.Now().UTC().Truncate(time.Second),
		GeneratedBy: "cmd/phase0-field-count",
		Scope:       "schemas/constructs/v*/** (api.yml + entity .yaml, excluding templates)",
	}

	for _, f := range files {
		recs, err := processFile(rootDir, f)
		if err != nil {
			fmt.Fprintf(os.Stderr, "warn: %s: %v\n", f, err)
			continue
		}
		if *verbose {
			fmt.Fprintf(os.Stderr, "%s: %d tags\n", relPath(rootDir, f), len(recs))
		}
		report.Records = append(report.Records, recs...)
		report.FilesProcessed++
	}

	sort.SliceStable(report.Records, func(i, j int) bool {
		a, b := report.Records[i], report.Records[j]
		if a.Version != b.Version {
			return a.Version < b.Version
		}
		if a.Resource != b.Resource {
			return a.Resource < b.Resource
		}
		if a.File != b.File {
			return a.File < b.File
		}
		if a.SchemaName != b.SchemaName {
			return a.SchemaName < b.SchemaName
		}
		return a.PropertyName < b.PropertyName
	})

	report.Totals = aggregateTotals(report.Records)
	report.PerResource = aggregatePerResource(report.Records)

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

	fmt.Printf("phase0-field-count: %d files, %d tags -> %s\n",
		report.FilesProcessed, report.Totals.TotalTags, relPath(rootDir, outPath))
	fmt.Printf("  camel=%d  snake=%d  pascal=%d  screaming=%d  lowercase=%d  suppressed=%d  other=%d\n",
		report.Totals.CamelCase, report.Totals.SnakeCase, report.Totals.PascalCase,
		report.Totals.Screaming, report.Totals.Lowercase, report.Totals.Suppressed, report.Totals.Other)
	fmt.Printf("  db-backed=%d  non-db-backed=%d  pagination-envelope=%d\n",
		report.Totals.DBBacked, report.Totals.NonDBBacked, report.Totals.PaginationTags)
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

// discoverSchemaFiles returns the absolute paths of every schema definition
// file under constructsDir, in deterministic sorted order. Template files
// (under a templates/ directory, or matching *_template.yaml|json) are
// excluded. Only files with the versioned prefix (v*) are included.
func discoverSchemaFiles(constructsDir string) ([]string, error) {
	info, err := os.Stat(constructsDir)
	if err != nil {
		return nil, err
	}
	if !info.IsDir() {
		return nil, fmt.Errorf("%s is not a directory", constructsDir)
	}

	var files []string
	err = filepath.WalkDir(constructsDir, func(p string, d fs.DirEntry, walkErr error) error {
		if walkErr != nil {
			return walkErr
		}
		if d.IsDir() {
			if d.Name() == "templates" {
				return fs.SkipDir
			}
			return nil
		}
		name := d.Name()
		if !(strings.HasSuffix(name, ".yaml") || strings.HasSuffix(name, ".yml")) {
			return nil
		}
		if strings.HasSuffix(name, "_template.yaml") || strings.HasSuffix(name, "_template.yml") {
			return nil
		}
		// Ensure the path lies under a v* version directory.
		rel, err := filepath.Rel(constructsDir, p)
		if err != nil {
			return err
		}
		parts := strings.Split(filepath.ToSlash(rel), "/")
		if len(parts) == 0 || !strings.HasPrefix(parts[0], "v") {
			return nil
		}
		files = append(files, p)
		return nil
	})
	if err != nil {
		return nil, err
	}
	sort.Strings(files)
	return files, nil
}

// processFile parses one schema file and returns one record per property
// encountered. It recurses into nested object properties so composite shapes
// are fully accounted for.
func processFile(rootDir, absPath string) ([]propertyRecord, error) {
	data, err := os.ReadFile(absPath)
	if err != nil {
		return nil, err
	}
	var doc map[string]any
	if err := yaml.Unmarshal(data, &doc); err != nil {
		return nil, err
	}

	rel := relPath(rootDir, absPath)
	version, resource := extractVersionAndResource(rel)
	deprecated := isDeprecated(doc)

	base := propertyRecord{
		Version:    version,
		Resource:   resource,
		File:       rel,
		Deprecated: deprecated,
	}

	var records []propertyRecord

	// OpenAPI container: components.schemas.<entity>.
	if comps, ok := doc["components"].(map[string]any); ok {
		if schemas, ok := comps["schemas"].(map[string]any); ok {
			for _, schemaName := range sortedKeys(schemas) {
				schema, ok := schemas[schemaName].(map[string]any)
				if !ok {
					continue
				}
				records = append(records, walkSchema(base, schemaName, "", schema)...)
			}
		}
	}

	// JSON Schema containers: `definitions` (draft-07) and `$defs` (2020-12).
	// Selector entity YAMLs declare all of their properties under
	// `definitions:` rather than a top-level `properties:` map, so missing
	// this container undercounts the baseline.
	for _, container := range []string{"definitions", "$defs"} {
		defs, ok := doc[container].(map[string]any)
		if !ok {
			continue
		}
		for _, defName := range sortedKeys(defs) {
			def, ok := defs[defName].(map[string]any)
			if !ok {
				continue
			}
			schemaName := deriveSchemaNameFromFile(rel)
			if schemaName != "" {
				schemaName = schemaName + "." + defName
			} else {
				schemaName = defName
			}
			records = append(records, walkSchema(base, schemaName, "", def)...)
		}
	}

	// Entity YAML files: top-level properties (plain JSON Schema style).
	if _, hasProperties := doc["properties"].(map[string]any); hasProperties {
		schemaName := deriveSchemaNameFromFile(rel)
		records = append(records, walkSchema(base, schemaName, "", doc)...)
	}

	return records, nil
}

// walkSchema recurses into a schema definition, emitting one record per
// directly-declared property. Three structural carriers are walked:
//  1. `properties` maps — each entry becomes a record; the entry's own
//     schema is then walked to surface nested composite shapes.
//  2. `items` schemas — for array types, the item schema is walked.
//  3. `allOf`/`anyOf`/`oneOf` lists — each branch is walked in place so
//     composition keywords contribute to the count. Today's schemas use
//     composition almost exclusively as single-entry `$ref` wrappers whose
//     targets get walked as separate components, but the handling keeps the
//     baseline robust against future schemas that compose inline properties.
//
// $ref pointers are not followed: referenced schemas are walked as their own
// components during the outer iteration, so following refs here would
// double-count.
func walkSchema(base propertyRecord, schemaName, pathPrefix string, schema map[string]any) []propertyRecord {
	var records []propertyRecord

	if props, ok := schema["properties"].(map[string]any); ok {
		for _, propName := range sortedKeys(props) {
			prop, ok := props[propName].(map[string]any)
			if !ok {
				continue
			}
			fullPath := propName
			if pathPrefix != "" {
				fullPath = pathPrefix + "." + propName
			}

			rec := base
			rec.SchemaName = schemaName
			rec.PropertyName = fullPath
			rec.JSONTag, rec.DBColumn, rec.DBBacked = resolveTags(propName, prop)
			rec.Casing = classify(rec.JSONTag)
			records = append(records, rec)

			// Recurse into the property's own schema so nested objects,
			// array items, and composition keywords are all picked up.
			records = append(records, walkSchema(base, schemaName, fullPath, prop)...)
		}
	}

	if items, ok := schema["items"].(map[string]any); ok {
		records = append(records, walkSchema(base, schemaName, pathPrefix+"[]", items)...)
	}

	for _, key := range []string{"allOf", "anyOf", "oneOf"} {
		list, ok := schema[key].([]any)
		if !ok {
			continue
		}
		for _, sub := range list {
			subMap, ok := sub.(map[string]any)
			if !ok {
				continue
			}
			records = append(records, walkSchema(base, schemaName, pathPrefix, subMap)...)
		}
	}

	return records
}

// resolveTags returns the effective JSON tag, DB column, and db-backed flag
// for a property. An `x-oapi-codegen-extra-tags` override, when present, is
// the authoritative source for json/db/gorm wire forms.
//
// DB-backing is inferred from either `db` (used by sqlx / direct drivers) or
// `gorm` (used by GORM). A value of `"-"` on either tag marks the field as
// explicitly not persisted. GORM tags carry directives in a
// semicolon-separated form; `column:NAME` is picked out as the canonical DB
// column name when present, and any other non-empty directive is still
// treated as DB-backed.
func resolveTags(propName string, prop map[string]any) (jsonTag, dbColumn string, dbBacked bool) {
	jsonTag = propName
	extra, ok := prop["x-oapi-codegen-extra-tags"].(map[string]any)
	if !ok {
		return
	}
	if js, ok := extra["json"].(string); ok && js != "" {
		// Strip modifiers like `,omitempty`.
		if idx := strings.Index(js, ","); idx >= 0 {
			jsonTag = js[:idx]
		} else {
			jsonTag = js
		}
		if jsonTag == "" {
			// Rare: `json:",omitempty"` implies default name.
			jsonTag = propName
		}
	}
	if db, ok := extra["db"].(string); ok && db != "" && db != "-" {
		dbColumn = db
		dbBacked = true
	}
	if gormTag, ok := extra["gorm"].(string); ok && gormTag != "" && gormTag != "-" {
		dbBacked = true
		if dbColumn == "" {
			if col := gormColumn(gormTag); col != "" {
				dbColumn = col
			}
		}
	}
	return
}

// gormColumn extracts the `column:NAME` directive from a GORM tag value.
// Returns "" when no explicit column name is declared.
func gormColumn(tag string) string {
	// GORM tags split on `;`. Some authors use `,` inside directives
	// (e.g. `index:idx_foo,column:bar`), so split on both.
	replacer := strings.NewReplacer(",", ";")
	for _, part := range strings.Split(replacer.Replace(tag), ";") {
		part = strings.TrimSpace(part)
		if !strings.HasPrefix(part, "column:") {
			continue
		}
		col := strings.TrimSpace(strings.TrimPrefix(part, "column:"))
		if col != "" && col != "-" {
			return col
		}
	}
	return ""
}

// classify returns the casing form of a JSON tag.
func classify(s string) casingForm {
	if s == "" {
		return casingOther
	}
	if s == "-" {
		return casingSuppressed
	}
	hasUnderscore := strings.Contains(s, "_")
	hasUpper := strings.IndexFunc(s, func(r rune) bool { return r >= 'A' && r <= 'Z' }) >= 0
	hasLower := strings.IndexFunc(s, func(r rune) bool { return r >= 'a' && r <= 'z' }) >= 0
	first := rune(s[0])
	if hasUnderscore && !hasUpper {
		return casingSnake
	}
	if hasUnderscore && hasUpper {
		return casingOther // mixed snake+camel is forbidden; tag for migration
	}
	if !hasLower && hasUpper {
		return casingScreaming
	}
	if first >= 'A' && first <= 'Z' && hasLower {
		return casingPascal
	}
	if first >= 'a' && first <= 'z' && hasUpper {
		return casingCamel
	}
	if first >= 'a' && first <= 'z' && !hasUpper {
		// Single-word lowercase identifier (e.g., `name`, `owner`). Classified
		// as `lowercase` for visibility, but treated as camelCase-stable in
		// the migration aggregate (a single lowercase word is the camelCase
		// default for that word).
		return casingLowerOnly
	}
	return casingOther
}

// aggregateTotals computes the global totals row.
func aggregateTotals(records []propertyRecord) totals {
	var t totals
	for _, r := range records {
		t.TotalTags++
		switch r.Casing {
		case casingCamel:
			t.CamelCase++
		case casingSnake:
			t.SnakeCase++
		case casingPascal:
			t.PascalCase++
		case casingScreaming:
			t.Screaming++
		case casingLowerOnly:
			t.Lowercase++
		case casingSuppressed:
			t.Suppressed++
		default:
			t.Other++
		}
		if r.DBBacked {
			t.DBBacked++
		} else {
			t.NonDBBacked++
		}
		if paginationTagNames[r.JSONTag] {
			t.PaginationTags++
		}
	}
	return t
}

// aggregatePerResource produces one row per (version, resource) pair.
func aggregatePerResource(records []propertyRecord) []resourceRow {
	type key struct{ version, resource string }
	byKey := map[key]*resourceRow{}
	deprecatedByKey := map[key]bool{}
	for _, r := range records {
		k := key{r.Version, r.Resource}
		row, ok := byKey[k]
		if !ok {
			row = &resourceRow{Resource: r.Resource, Version: r.Version}
			byKey[k] = row
		}
		if r.Deprecated {
			deprecatedByKey[k] = true
		}
		row.TotalTags++
		if r.DBBacked {
			row.DBBackedTags++
		} else {
			row.NonDBBackedTags++
		}
		switch r.Casing {
		case casingCamel, casingLowerOnly:
			row.CamelTagsStable++
		case casingSnake:
			if paginationTagNames[r.JSONTag] {
				// Snake-cased pagination envelope stays snake by intentional
				// design; do not count toward to-migrate.
				continue
			}
			row.SnakeTagsToMigrate++
		case casingPascal:
			row.PascalTags++
		case casingScreaming:
			row.ScreamingTags++
		case casingSuppressed:
			row.SuppressedTags++
		default:
			row.OtherTags++
		}
	}
	var rows []resourceRow
	for k, row := range byKey {
		if deprecatedByKey[k] {
			row.Deprecated = true
		}
		rows = append(rows, *row)
	}
	sort.Slice(rows, func(i, j int) bool {
		if rows[i].Version != rows[j].Version {
			return rows[i].Version < rows[j].Version
		}
		return rows[i].Resource < rows[j].Resource
	})
	return rows
}

// extractVersionAndResource infers the API version and resource name from a
// schemas/constructs-relative path. Nested files (v1beta1/workspace/api.yml)
// name the resource after the parent directory; top-level files
// (v1alpha1/model.yaml) name it after the file stem.
func extractVersionAndResource(rel string) (string, string) {
	parts := strings.Split(filepath.ToSlash(rel), "/")
	// Expected prefix: schemas/constructs/v.../...
	if len(parts) < 4 {
		return "", ""
	}
	version := parts[2]
	if len(parts) == 4 {
		// Top-level entity YAML (e.g., v1alpha1/model.yaml).
		stem := strings.TrimSuffix(parts[3], filepath.Ext(parts[3]))
		return version, stem
	}
	return version, parts[3]
}

func deriveSchemaNameFromFile(rel string) string {
	base := filepath.Base(rel)
	stem := strings.TrimSuffix(base, filepath.Ext(base))
	if stem == "api" || stem == "" {
		return ""
	}
	// Preserve the on-disk spelling; this is a label, not a generated name.
	return stem
}

// isDeprecated returns true when an api.yml declares x-deprecated: true under
// its info block. Entity .yaml files do not carry this marker.
func isDeprecated(doc map[string]any) bool {
	info, ok := doc["info"].(map[string]any)
	if !ok {
		return false
	}
	dep, _ := info["x-deprecated"].(bool)
	return dep
}

func sortedKeys(m map[string]any) []string {
	out := make([]string, 0, len(m))
	for k := range m {
		out = append(out, k)
	}
	sort.Strings(out)
	return out
}

func relPath(rootDir, absPath string) string {
	rel, err := filepath.Rel(rootDir, absPath)
	if err != nil {
		return absPath
	}
	return filepath.ToSlash(rel)
}
