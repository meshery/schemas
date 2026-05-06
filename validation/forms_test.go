package validation

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"reflect"
	"regexp"
	"runtime"
	"sort"
	"strings"
	"testing"

	"gopkg.in/yaml.v3"
)

// TestFormSchemasAreSubsetOfCanonical enforces the canonical RJSF form-schema
// contract: every form schema under typescript/forms/<version>/<construct>/
// must be a strict subset of the corresponding canonical OpenAPI construct.
//
//   - Every form property name must exist in the canonical construct's
//     properties map.
//   - Every form property's `type` must equal the canonical's `type` for
//     that field.
//   - Any `enum` in the form must be a subset of the canonical's `enum`
//     (the form may be more restrictive than the canonical, never more
//     permissive). Same rule applies to `items.enum` for arrays.
//   - Every name in the form's `required` list must exist in the
//     canonical's properties (i.e. you cannot require a field the
//     canonical doesn't define).
//
// This is the core enforcement for meshery/schemas#866 — it prevents the
// drift that motivated moving form schemas from layer5io/sistent into
// this canonical home.
// formCase pairs a form-schema JSON with its canonical OpenAPI source.
// Every entry under `schemas/constructs/<v>/<c>/forms/*.json` (the
// forms tree of record) MUST appear here — the
// TestEveryFormJsonHasCaseTableEntry guard makes that mandatory.
type formCase struct {
	name      string
	canonical string // path relative to repo root; may carry a `#/components/schemas/X` fragment
	form      string // path relative to repo root
}

// formCases is package-level so adjacent tests
// (TestEveryFormJsonHasCaseTableEntry, etc.) can read it. Adding a
// new form schema means: (1) author the JSON files under
// schemas/constructs/<v>/<c>/forms/, (2) add an import + named
// re-export in typescript/forms/index.ts, (3) append a row here.
// All three are enforced by tests in this file.
var formCases = []formCase{
	{
		name:      "v1beta2/catalog/publish",
		canonical: "schemas/constructs/v1beta2/catalog/catalog.yaml",
		form:      "schemas/constructs/v1beta2/catalog/forms/publish.json",
	},
	{
		name:      "v1beta3/environment/createOrEdit",
		canonical: "schemas/constructs/v1beta3/environment/environment.yaml",
		form:      "schemas/constructs/v1beta3/environment/forms/createOrEdit.json",
	},
	{
		name:      "v1beta3/workspace/createOrEdit",
		canonical: "schemas/constructs/v1beta3/workspace/workspace.yaml",
		form:      "schemas/constructs/v1beta3/workspace/forms/createOrEdit.json",
	},
	{
		name:      "v1beta1/credential/kubernetes",
		canonical: "schemas/constructs/v1beta1/credential/api.yml#/components/schemas/Credential",
		form:      "schemas/constructs/v1beta1/credential/forms/kubernetes.json",
	},
	{
		name:      "v1beta1/credential/grafana",
		canonical: "schemas/constructs/v1beta1/credential/api.yml#/components/schemas/Credential",
		form:      "schemas/constructs/v1beta1/credential/forms/grafana.json",
	},
	{
		name:      "v1beta1/credential/prometheus",
		canonical: "schemas/constructs/v1beta1/credential/api.yml#/components/schemas/Credential",
		form:      "schemas/constructs/v1beta1/credential/forms/prometheus.json",
	},
	{
		name:      "v1beta3/design/import",
		canonical: "schemas/constructs/v1beta3/design/api.yml#/components/schemas/MesheryPatternImportFormPayload",
		form:      "schemas/constructs/v1beta3/design/forms/import.json",
	},
	{
		name:      "v1beta2/model/import",
		canonical: "schemas/constructs/v1beta2/model/api.yml#/components/schemas/ImportRequest",
		form:      "schemas/constructs/v1beta2/model/forms/import.json",
	},
	{
		name:      "v1beta3/filter/import",
		canonical: "schemas/constructs/v1beta3/filter/api.yml#/components/schemas/MesheryFilterImportFormPayload",
		form:      "schemas/constructs/v1beta3/filter/forms/import.json",
	},
	{
		name:      "v1beta3/connection/helmCreate",
		canonical: "schemas/constructs/v1beta3/connection/connection.yaml",
		form:      "schemas/constructs/v1beta3/connection/forms/helmCreate.json",
	},
}

func TestFormSchemasAreSubsetOfCanonical(t *testing.T) {
	repoRoot := repoRootDir(t)

	for _, tc := range formCases {
		tc := tc
		t.Run(tc.name, func(t *testing.T) {
			canonical := loadYAMLSchema(t, filepath.Join(repoRoot, tc.canonical))
			form := loadJSONSchema(t, filepath.Join(repoRoot, tc.form))

			assertFormSubsetOfCanonical(t, form, canonical)
		})
	}
}

// formJsonFiles walks `schemas/constructs/<v>/<c>/forms/` and returns
// every `*.json` file that is NOT a `*.ui.json`. Used by the form-schema
// guard tests below; ui-schema files are paired separately by
// TestEveryFormHasUiSchemaPair.
func formJsonFiles(t *testing.T) []string {
	t.Helper()
	repoRoot := repoRootDir(t)
	constructsDir := filepath.Join(repoRoot, "schemas", "constructs")

	var out []string
	err := filepath.Walk(constructsDir, func(p string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if info.IsDir() {
			return nil
		}
		name := info.Name()
		if !strings.HasSuffix(name, ".json") || strings.HasSuffix(name, ".ui.json") {
			return nil
		}
		// Only count files inside a `forms/` directory.
		if filepath.Base(filepath.Dir(p)) != "forms" {
			return nil
		}
		rel, err := filepath.Rel(repoRoot, p)
		if err != nil {
			return err
		}
		out = append(out, filepath.ToSlash(rel))
		return nil
	})
	if err != nil {
		t.Fatalf("walk %s: %v", constructsDir, err)
	}
	return out
}

// TestEveryFormJsonHasCaseTableEntry guards against the worst silent
// failure: a form schema lands under schemas/constructs/<v>/<c>/forms/
// AND gets an export in typescript/forms/index.ts (so the public
// surface looks correct), but no row in `formCases` — meaning
// TestFormSchemasAreSubsetOfCanonical never asserts the subset rule
// for that form. The form would render fine in the UI yet drift
// against the canonical OpenAPI would never be checked.
func TestEveryFormJsonHasCaseTableEntry(t *testing.T) {
	known := make(map[string]struct{}, len(formCases))
	for _, c := range formCases {
		known[c.form] = struct{}{}
	}

	missing := []string{}
	for _, jf := range formJsonFiles(t) {
		if _, ok := known[jf]; !ok {
			missing = append(missing, jf)
		}
	}
	if len(missing) == 0 {
		return
	}
	sort.Strings(missing)
	t.Fatalf("the following form JSON files have no row in formCases (TestFormSchemasAreSubsetOfCanonical) — add them so the subset rule is actually enforced for these forms:\n  %s",
		strings.Join(missing, "\n  "))
}

// TestEveryFormHasUiSchemaPair enforces the layout rule that every
// `<action>.json` carries a sibling `<action>.ui.json` and vice
// versa. Half-authored forms (schema without UI hints, or vice
// versa) are nearly always a bug — the consumer expects both.
func TestEveryFormHasUiSchemaPair(t *testing.T) {
	repoRoot := repoRootDir(t)
	constructsDir := filepath.Join(repoRoot, "schemas", "constructs")

	// Collect every json under any forms/ directory, separated into
	// schema and ui-schema sets keyed by the action stem.
	type stem struct {
		hasSchema   bool
		hasUiSchema bool
	}
	stems := map[string]*stem{}

	err := filepath.Walk(constructsDir, func(p string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if info.IsDir() {
			return nil
		}
		name := info.Name()
		if filepath.Base(filepath.Dir(p)) != "forms" {
			return nil
		}
		if !strings.HasSuffix(name, ".json") {
			return nil
		}
		dir, err := filepath.Rel(repoRoot, filepath.Dir(p))
		if err != nil {
			return err
		}
		dir = filepath.ToSlash(dir)
		var key string
		if strings.HasSuffix(name, ".ui.json") {
			key = dir + "/" + strings.TrimSuffix(name, ".ui.json")
			s := stems[key]
			if s == nil {
				s = &stem{}
				stems[key] = s
			}
			s.hasUiSchema = true
		} else {
			key = dir + "/" + strings.TrimSuffix(name, ".json")
			s := stems[key]
			if s == nil {
				s = &stem{}
				stems[key] = s
			}
			s.hasSchema = true
		}
		return nil
	})
	if err != nil {
		t.Fatalf("walk %s: %v", constructsDir, err)
	}

	missingUi := []string{}
	missingSchema := []string{}
	for k, s := range stems {
		switch {
		case s.hasSchema && !s.hasUiSchema:
			missingUi = append(missingUi, k+".ui.json")
		case !s.hasSchema && s.hasUiSchema:
			missingSchema = append(missingSchema, k+".json")
		}
	}
	sort.Strings(missingUi)
	sort.Strings(missingSchema)

	if len(missingUi) > 0 {
		t.Errorf("the following form schemas are missing a sibling .ui.json (every <action>.json must pair with an <action>.ui.json containing presentation hints — even if it's just `{ \"ui:order\": [...] }`):\n  %s",
			strings.Join(missingUi, "\n  "))
	}
	if len(missingSchema) > 0 {
		t.Errorf("the following ui-schemas are missing a sibling .json schema (orphaned UI hints — either author the schema or delete the UI file):\n  %s",
			strings.Join(missingSchema, "\n  "))
	}
}

// formIndexImportPattern matches a top-level
//
//	import <local> from "../../schemas/constructs/<v>/<c>/forms/<action>.[ui.]json";
//
// statement in typescript/forms/index.ts. Submatches:
//
//	1: local binding name
//	2: version segment (e.g. v1beta2)
//	3: construct segment (e.g. catalog)
//	4: action segment (e.g. publish or createOrEdit)
//	5: ".ui" if it's a ui-schema import, "" otherwise
var formIndexImportPattern = regexp.MustCompile(
	`(?m)^import\s+(\w+)\s+from\s+"(?:\.\./)+schemas/constructs/(v[^/]+)/([^/]+)/forms/([^/.]+)(\.ui)?\.json"\s*;`,
)

// formIndexExportPattern matches a top-level
//
//	export const <Name> = <local> as <Type>;
//
// statement (with optional surrounding whitespace and `RJSFSchema`
// or `UiSchema` cast types).
var formIndexExportPattern = regexp.MustCompile(
	`(?m)^export\s+const\s+(\w+)\s*=\s*(\w+)\s*(?:as\s+(?:RJSFSchema|UiSchema))?\s*;`,
)

// titleCaseSegment uppercases the first character of `s`. Used to
// derive `<Construct>`, `<Action>`, and the version-segment-as-suffix
// from path components.
func titleCaseSegment(s string) string {
	if s == "" {
		return s
	}
	return strings.ToUpper(s[:1]) + s[1:]
}

// expectedExportSuffix derives the canonical export-name suffix that
// must appear at the end of an export bound to a form-JSON import.
// e.g. import path .../v1beta2/catalog/forms/publish.json (schema)
// →  expected suffix RjsfSchemaV1Beta2  (with construct+action prefix
// up to the caller).
func expectedVersionSuffix(versionSegment string) string {
	// versionSegment is `v1beta2`, `v1alpha3`, etc. Convert to
	// `V1Beta2` / `V1Alpha3` by Title-casing each token boundary.
	if versionSegment == "" {
		return ""
	}
	// Split on the alpha/beta boundary to title-case each piece.
	out := strings.Builder{}
	out.Grow(len(versionSegment))
	upperNext := true
	for _, r := range versionSegment {
		if upperNext {
			out.WriteRune(toUpperRune(r))
			upperNext = false
		} else {
			out.WriteRune(r)
		}
		// After a digit, next alpha char gets uppercased
		// (so `v1beta2` → `V1Beta2`).
		if r >= '0' && r <= '9' {
			upperNext = true
		}
	}
	return out.String()
}

func toUpperRune(r rune) rune {
	if r >= 'a' && r <= 'z' {
		return r - 32
	}
	return r
}

// TestFormExportsFollowVersionConvention parses
// typescript/forms/index.ts and asserts every export bound to a form
// JSON import follows the
// `<Construct><Action>RjsfSchemaV<Version>` (or
// `<Construct><Action>RjsfUiSchemaV<Version>`) naming convention,
// with the V-suffix matching the version directory of the imported
// file.
//
// The `<Construct>` and `<Action>` halves are NOT positional-checked
// (some forms front-load the kind, e.g. KubernetesCredential…), but
// the suffix and the schema-vs-uiSchema discrimination are.
func TestFormExportsFollowVersionConvention(t *testing.T) {
	repoRoot := repoRootDir(t)
	indexPath := filepath.Join(repoRoot, "typescript", "forms", "index.ts")
	raw, err := os.ReadFile(indexPath)
	if err != nil {
		t.Fatalf("read %s: %v", indexPath, err)
	}
	src := string(raw)

	// localName → expected suffix (e.g. publishCatalogSchema → RjsfSchemaV1Beta2).
	type bindingInfo struct {
		isUi    bool
		version string // e.g. V1Beta2
	}
	bindings := map[string]bindingInfo{}
	for _, m := range formIndexImportPattern.FindAllStringSubmatch(src, -1) {
		local, version, _, _, isUi := m[1], m[2], m[3], m[4], m[5]
		bindings[local] = bindingInfo{
			isUi:    isUi == ".ui",
			version: expectedVersionSuffix(version),
		}
	}

	if len(bindings) == 0 {
		t.Fatalf("no form-JSON imports found in %s — the regex may have drifted from the file shape; check formIndexImportPattern", indexPath)
	}

	violations := []string{}
	for _, m := range formIndexExportPattern.FindAllStringSubmatch(src, -1) {
		exportName, local := m[1], m[2]
		bi, ok := bindings[local]
		if !ok {
			// Export not bound to a form JSON (e.g. a re-export
			// of a constant from elsewhere). Out of scope for
			// this rule.
			continue
		}
		var wantSuffix string
		if bi.isUi {
			wantSuffix = "RjsfUiSchema" + bi.version
		} else {
			wantSuffix = "RjsfSchema" + bi.version
		}
		if !strings.HasSuffix(exportName, wantSuffix) {
			violations = append(violations,
				fmt.Sprintf("export %q (bound to %q) must end in %q (its source JSON is at version %s; %s convention)",
					exportName, local, wantSuffix, bi.version,
					map[bool]string{true: "ui-schema", false: "schema"}[bi.isUi]))
		}
	}
	sort.Strings(violations)
	if len(violations) > 0 {
		t.Errorf("form export naming convention violations:\n  %s",
			strings.Join(violations, "\n  "))
	}
}

// repoRootDir resolves the repo root by walking up from the test file's
// own directory until it finds the schemas/ + typescript/ siblings.
func repoRootDir(t *testing.T) string {
	t.Helper()
	_, thisFile, _, ok := runtime.Caller(0)
	if !ok {
		t.Fatalf("could not resolve test file path")
	}
	dir := filepath.Dir(thisFile)
	for i := 0; i < 8; i++ {
		schemasDir := filepath.Join(dir, "schemas")
		tsDir := filepath.Join(dir, "typescript")
		if dirExists(schemasDir) && dirExists(tsDir) {
			return dir
		}
		parent := filepath.Dir(dir)
		if parent == dir {
			break
		}
		dir = parent
	}
	t.Fatalf("could not find repo root from %s", thisFile)
	return ""
}

func dirExists(p string) bool {
	st, err := os.Stat(p)
	return err == nil && st.IsDir()
}

// schemaNode mirrors the subset of OpenAPI / JSON Schema fields the
// subset-validator actually inspects. Unknown fields are ignored.
//
// `OneOf` / `AllOf` / `AnyOf` are captured so the loader doesn't drop
// composition keywords; the assertion logic flattens canonical
// composition into a merged property map before subset-checking
// (composition members are treated as additive — every property
// declared by any branch is allowed in the form).
type schemaNode struct {
	Type       string                 `yaml:"type"       json:"type"`
	Properties map[string]*schemaNode `yaml:"properties" json:"properties"`
	Required   []string               `yaml:"required"   json:"required"`
	Items      *schemaNode            `yaml:"items"      json:"items"`
	Enum       []any                  `yaml:"enum"       json:"enum"`
	OneOf      []*schemaNode          `yaml:"oneOf"      json:"oneOf"`
	AllOf      []*schemaNode          `yaml:"allOf"      json:"allOf"`
	AnyOf      []*schemaNode          `yaml:"anyOf"      json:"anyOf"`
}

// flattenedProperties returns the canonical's effective property set,
// merging contributions from `properties`, `allOf`, `anyOf`, `oneOf`.
// For subset-checking we treat composition as additive — a form field
// is acceptable if ANY branch of the canonical declares it.
func (s *schemaNode) flattenedProperties() map[string]*schemaNode {
	out := make(map[string]*schemaNode)
	for k, v := range s.Properties {
		out[k] = v
	}
	for _, branch := range s.AllOf {
		if branch == nil {
			continue
		}
		for k, v := range branch.flattenedProperties() {
			if _, exists := out[k]; !exists {
				out[k] = v
			}
		}
	}
	for _, branch := range s.AnyOf {
		if branch == nil {
			continue
		}
		for k, v := range branch.flattenedProperties() {
			if _, exists := out[k]; !exists {
				out[k] = v
			}
		}
	}
	for _, branch := range s.OneOf {
		if branch == nil {
			continue
		}
		for k, v := range branch.flattenedProperties() {
			if _, exists := out[k]; !exists {
				out[k] = v
			}
		}
	}
	return out
}

// loadYAMLSchema reads a YAML schema file. The path may optionally carry a
// JSON-pointer-style fragment selecting a nested component, e.g.
// "schemas/constructs/v1beta1/credential/api.yml#/components/schemas/Credential".
// When no fragment is present, the entire YAML file is interpreted as a
// JSON-schema-shaped node (top-level `properties:`). When a fragment is
// present, the file is parsed as generic YAML and walked according to the
// fragment path before being marshaled into a schemaNode.
func loadYAMLSchema(t *testing.T, path string) *schemaNode {
	t.Helper()

	filePath, fragment := path, ""
	if idx := strings.Index(path, "#"); idx != -1 {
		filePath = path[:idx]
		fragment = path[idx+1:]
	}

	raw, err := os.ReadFile(filePath)
	if err != nil {
		t.Fatalf("read %s: %v", filePath, err)
	}

	if fragment == "" {
		var node schemaNode
		if err := yaml.Unmarshal(raw, &node); err != nil {
			t.Fatalf("parse %s: %v", filePath, err)
		}
		return &node
	}

	var doc map[string]any
	if err := yaml.Unmarshal(raw, &doc); err != nil {
		t.Fatalf("parse %s: %v", filePath, err)
	}

	// Walk the fragment as JSON-pointer-style ("/components/schemas/X").
	var current any = doc
	for _, segment := range strings.Split(strings.TrimPrefix(fragment, "/"), "/") {
		if segment == "" {
			continue
		}
		m, ok := current.(map[string]any)
		if !ok {
			t.Fatalf("canonical %s: cannot descend into %q (not a map)",
				path, segment)
		}
		next, exists := m[segment]
		if !exists {
			t.Fatalf("canonical %s: fragment segment %q not found",
				path, segment)
		}
		current = next
	}

	// Round-trip through YAML to populate the strongly-typed schemaNode.
	rebound, err := yaml.Marshal(current)
	if err != nil {
		t.Fatalf("re-marshal %s fragment: %v", path, err)
	}
	var node schemaNode
	if err := yaml.Unmarshal(rebound, &node); err != nil {
		t.Fatalf("parse %s fragment: %v", path, err)
	}
	return &node
}

func loadJSONSchema(t *testing.T, path string) *schemaNode {
	t.Helper()
	raw, err := os.ReadFile(path)
	if err != nil {
		t.Fatalf("read %s: %v", path, err)
	}
	var node schemaNode
	if err := json.Unmarshal(raw, &node); err != nil {
		t.Fatalf("parse %s: %v", path, err)
	}
	return &node
}

func assertFormSubsetOfCanonical(t *testing.T, form, canonical *schemaNode) {
	t.Helper()
	assertFormSubsetAtPath(t, form, canonical, "")
}

// assertFormSubsetAtPath recursively walks the form tree, asserting at
// each node that the form is a strict subset of the canonical at that
// position. `path` is dotted human-readable (e.g. "metadata.theme.id"
// or "compatibility[]") so error messages pin the exact field.
func assertFormSubsetAtPath(t *testing.T, form, canonical *schemaNode, path string) {
	t.Helper()
	canonProps := canonical.flattenedProperties()

	if canonical == nil || (canonProps == nil && canonical.Items == nil) {
		t.Fatalf("canonical at %q has neither properties nor items — wrong file or empty schema?", pathOrRoot(path))
	}
	if path == "" && form.Properties == nil {
		t.Fatalf("form schema has no properties — empty form?")
	}

	// Every form field must exist in canonical, with matching type and a
	// subset of canonical's enum (if any).
	for _, name := range sortedKeys(form.Properties) {
		formField := form.Properties[name]
		canField, ok := canonProps[name]
		fieldPath := joinPath(path, name)
		if !ok {
			t.Errorf("form field %q is not defined in canonical OpenAPI; remove the field, or add it to the canonical and regenerate", fieldPath)
			continue
		}

		// Type-match (subset semantics):
		//   - canonical sets type, form sets a DIFFERENT type   → FAIL
		//   - canonical sets type, form omits type              → FAIL
		//     (form would silently accept values canonical rejects)
		//   - canonical omits type, form sets any type          → OK
		//     (form is narrower than canonical, valid subset.
		//     This is the common $ref case where the canonical's
		//     resolved type isn't visible to this shallow parser.)
		//   - both omit                                         → OK
		switch {
		case canField.Type != "" && formField.Type == "":
			t.Errorf("form field %q has no type but canonical declares type %q (form must explicitly declare the same type, otherwise it would accept values canonical rejects)",
				fieldPath, canField.Type)
		case canField.Type != "" && formField.Type != canField.Type:
			t.Errorf("form field %q type %q != canonical type %q",
				fieldPath, formField.Type, canField.Type)
		}

		// Top-level enum subset check.
		if len(formField.Enum) > 0 && !enumSubset(formField.Enum, canField.Enum) {
			t.Errorf("form field %q enum %v is not a subset of canonical enum %v",
				fieldPath, formField.Enum, canField.Enum)
		}

		// Array items: type, enum, and (recursively) properties must
		// all be subsets.
		if formField.Items != nil {
			if canField.Items == nil {
				t.Errorf("form field %q has items but canonical %q has no items definition",
					fieldPath, fieldPath)
				continue
			}
			if formField.Items.Type != canField.Items.Type {
				t.Errorf("form field %q items.type %q != canonical items.type %q",
					fieldPath, formField.Items.Type, canField.Items.Type)
			}
			if len(formField.Items.Enum) > 0 && !enumSubset(formField.Items.Enum, canField.Items.Enum) {
				t.Errorf("form field %q items.enum %v is not a subset of canonical items.enum %v",
					fieldPath, formField.Items.Enum, canField.Items.Enum)
			}
			// Recurse into items.properties only if canonical's items
			// has structure to compare against. A canonical
			// `items: { type: object }` with no `properties` is a
			// free-form map; the form may specify a kind-specific
			// shape inside.
			if formField.Items.Properties != nil && hasNestedStructure(canField.Items) {
				assertFormSubsetAtPath(t, formField.Items, canField.Items, fieldPath+"[]")
			}
		}

		// Recurse into nested object properties only when canonical
		// has nested structure to compare against. Canonical fields
		// declared as bare `type: object` without `properties` /
		// `allOf` / `anyOf` / `oneOf` are free-form maps (e.g.
		// kind-specific credential `secret`, connection `metadata`);
		// forms are free to specify a kind-specific shape inside
		// them. Add a per-kind canonical submodel + a roadmap entry
		// if you need stricter nested validation.
		if formField.Properties != nil && hasNestedStructure(canField) {
			assertFormSubsetAtPath(t, formField, canField, fieldPath)
		}
	}

	// Required: every name in form.required must exist in
	// canonical.properties (the flattened set, so canonical-side
	// composition is honored). form.required need not be a subset of
	// canonical.required — a form can require a field the canonical
	// merely allows.
	for _, name := range form.Required {
		if _, ok := canonProps[name]; !ok {
			t.Errorf("form at %q requires field %q which is not defined in canonical OpenAPI",
				pathOrRoot(path), name)
		}
	}

	// Every name in form.required must also be in form.properties (this
	// catches typos in the required list).
	for _, name := range form.Required {
		if _, ok := form.Properties[name]; !ok {
			t.Errorf("form at %q has required %q which is not in form.properties",
				pathOrRoot(path), name)
		}
	}
}

// hasNestedStructure reports whether a canonical schema node has any
// nested-property definition the form should be subset-checked against.
// A canonical with `type: object` but no `properties` / composition
// keywords is treated as a free-form map; recursing into it would
// incorrectly flag any kind-specific shape the form chose to expose.
func hasNestedStructure(s *schemaNode) bool {
	if s == nil {
		return false
	}
	if len(s.Properties) > 0 {
		return true
	}
	if len(s.AllOf) > 0 || len(s.AnyOf) > 0 || len(s.OneOf) > 0 {
		return true
	}
	return false
}

func joinPath(parent, child string) string {
	if parent == "" {
		return child
	}
	return parent + "." + child
}

func pathOrRoot(path string) string {
	if path == "" {
		return "<root>"
	}
	return path
}

func enumSubset(child, parent []any) bool {
	if len(parent) == 0 {
		// Canonical has no enum constraint — child can have any enum
		// (still a subset of the unconstrained parent).
		return true
	}
	parentSet := make(map[string]struct{}, len(parent))
	for _, v := range parent {
		parentSet[stringifyEnumValue(v)] = struct{}{}
	}
	for _, v := range child {
		if _, ok := parentSet[stringifyEnumValue(v)]; !ok {
			return false
		}
	}
	return true
}

// stringifyEnumValue normalizes a JSON / YAML enum value to a string for
// set membership. Numbers and bools are stringified deterministically;
// strings are returned as-is. (Using reflect.DeepEqual on []any directly
// is awkward when YAML and JSON deserialize into different concrete
// types — e.g. YAML int → int, JSON int → float64.)
func stringifyEnumValue(v any) string {
	if v == nil {
		return "<nil>"
	}
	switch x := v.(type) {
	case string:
		return "s:" + x
	case bool:
		return fmt.Sprintf("b:%t", x)
	case int:
		return fmt.Sprintf("n:%d", x)
	case int64:
		return fmt.Sprintf("n:%d", x)
	case float64:
		// Treat whole floats as ints for cross-format parity.
		if x == float64(int64(x)) {
			return fmt.Sprintf("n:%d", int64(x))
		}
		return fmt.Sprintf("n:%g", x)
	}
	// Fallback: hash by deepequal-friendly stringification.
	return fmt.Sprintf("o:%s:%v", reflect.TypeOf(v).String(), v)
}

func sortedKeys[V any](m map[string]V) []string {
	out := make([]string, 0, len(m))
	for k := range m {
		out = append(out, k)
	}
	sort.Strings(out)
	return out
}

// TestFormSchemasIndexExportsExist provides a fast feedback loop for
// authors adding new form schemas: every JSON file under any
// `schemas/constructs/<version>/<construct>/forms/` directory must be
// referenced by `typescript/forms/index.ts` (which re-exports each
// under its canonical RjsfSchema/RjsfUiSchema name).
//
// This catches the common authoring mistake of adding a new form JSON
// without wiring it through the public package surface.
func TestFormSchemasIndexExportsExist(t *testing.T) {
	repoRoot := repoRootDir(t)
	constructsDir := filepath.Join(repoRoot, "schemas", "constructs")
	indexTSPath := filepath.Join(repoRoot, "typescript", "forms", "index.ts")

	indexRaw, err := os.ReadFile(indexTSPath)
	if err != nil {
		t.Fatalf("read %s: %v", indexTSPath, err)
	}
	indexSrc := string(indexRaw)

	// Walk every `forms/*.json` under schemas/constructs/.
	var jsonFiles []string
	err = filepath.Walk(constructsDir, func(p string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if info.IsDir() {
			return nil
		}
		if !strings.HasSuffix(info.Name(), ".json") {
			return nil
		}
		// Only count files in a `forms/` directory.
		if filepath.Base(filepath.Dir(p)) != "forms" {
			return nil
		}
		jsonFiles = append(jsonFiles, p)
		return nil
	})
	if err != nil {
		t.Fatalf("walk %s: %v", constructsDir, err)
	}

	if len(jsonFiles) == 0 {
		t.Skip("no schemas/constructs/*/forms/*.json files yet")
	}

	for _, jsonFile := range jsonFiles {
		// Build the relative import path the index.ts would use.
		// e.g. "schemas/constructs/v1beta2/catalog/forms/publish.json"
		// → expected substring "../../schemas/constructs/v1beta2/catalog/forms/publish.json"
		// in typescript/forms/index.ts.
		rel, err := filepath.Rel(repoRoot, jsonFile)
		if err != nil {
			t.Errorf("rel(%s, %s): %v", repoRoot, jsonFile, err)
			continue
		}
		// Normalize to forward slashes for cross-platform string match.
		relForward := filepath.ToSlash(rel)
		needle := "../../" + relForward
		if !strings.Contains(indexSrc, needle) {
			t.Errorf("typescript/forms/index.ts does not import %s (expected substring %q); add an `import … from %q` and a corresponding `export const …RjsfSchema… = … as RJSFSchema/UiSchema` line",
				rel, needle, needle)
		}
	}
}
