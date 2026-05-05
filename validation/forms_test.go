package validation

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"reflect"
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
func TestFormSchemasAreSubsetOfCanonical(t *testing.T) {
	cases := []struct {
		name      string
		canonical string // path relative to repo root
		form      string // path relative to repo root
	}{
		{
			name:      "v1beta2/catalog/publish",
			canonical: "schemas/constructs/v1beta2/catalog/catalog.yaml",
			form:      "typescript/forms/v1beta2/catalog/publish.json",
		},
	}

	repoRoot := repoRootDir(t)

	for _, tc := range cases {
		tc := tc
		t.Run(tc.name, func(t *testing.T) {
			canonical := loadYAMLSchema(t, filepath.Join(repoRoot, tc.canonical))
			form := loadJSONSchema(t, filepath.Join(repoRoot, tc.form))

			assertFormSubsetOfCanonical(t, form, canonical)
		})
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
type schemaNode struct {
	Type       string                 `yaml:"type"       json:"type"`
	Properties map[string]*schemaNode `yaml:"properties" json:"properties"`
	Required   []string               `yaml:"required"   json:"required"`
	Items      *schemaNode            `yaml:"items"      json:"items"`
	Enum       []any                  `yaml:"enum"       json:"enum"`
	OneOf      []*schemaNode          `yaml:"oneOf"      json:"oneOf"`
}

func loadYAMLSchema(t *testing.T, path string) *schemaNode {
	t.Helper()
	raw, err := os.ReadFile(path)
	if err != nil {
		t.Fatalf("read %s: %v", path, err)
	}
	var node schemaNode
	if err := yaml.Unmarshal(raw, &node); err != nil {
		t.Fatalf("parse %s: %v", path, err)
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

	if canonical.Properties == nil {
		t.Fatalf("canonical has no properties — wrong file or empty schema?")
	}
	if form.Properties == nil {
		t.Fatalf("form schema has no properties — empty form?")
	}

	// Every form field must exist in canonical, with matching type and a
	// subset of canonical's enum (if any).
	formFields := sortedKeys(form.Properties)
	for _, name := range formFields {
		formField := form.Properties[name]
		canField, ok := canonical.Properties[name]
		if !ok {
			t.Errorf("form field %q is not defined in canonical OpenAPI; remove the field, or add it to the canonical and regenerate", name)
			continue
		}

		if formField.Type != "" && canField.Type != "" && formField.Type != canField.Type {
			t.Errorf("form field %q type %q != canonical type %q",
				name, formField.Type, canField.Type)
		}

		// Top-level enum subset check.
		if len(formField.Enum) > 0 {
			if !enumSubset(formField.Enum, canField.Enum) {
				t.Errorf("form field %q enum %v is not a subset of canonical enum %v",
					name, formField.Enum, canField.Enum)
			}
		}

		// items.enum subset check (arrays).
		if formField.Items != nil && len(formField.Items.Enum) > 0 {
			if canField.Items == nil {
				t.Errorf("form field %q has items.enum but canonical %q has no items definition",
					name, name)
				continue
			}
			if !enumSubset(formField.Items.Enum, canField.Items.Enum) {
				t.Errorf("form field %q items.enum %v is not a subset of canonical items.enum %v",
					name, formField.Items.Enum, canField.Items.Enum)
			}
		}
	}

	// Every name in form.required must exist in canonical.properties.
	// (form.required need not be a subset of canonical.required — a form
	// can require a field the canonical merely allows.)
	for _, name := range form.Required {
		if _, ok := canonical.Properties[name]; !ok {
			t.Errorf("form requires field %q which is not defined in canonical OpenAPI", name)
		}
	}

	// Every name in form.required must also be in form.properties (this
	// catches typos in the required list).
	formProps := form.Properties
	for _, name := range form.Required {
		if _, ok := formProps[name]; !ok {
			t.Errorf("form.required lists %q which is not in form.properties", name)
		}
	}
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
// authors adding new form schemas: every JSON form file must have a
// matching TypeScript export under the same construct's index.ts.
// Skips if no form schemas exist yet.
func TestFormSchemasIndexExportsExist(t *testing.T) {
	repoRoot := repoRootDir(t)
	formsDir := filepath.Join(repoRoot, "typescript", "forms")
	if !dirExists(formsDir) {
		t.Skip("no typescript/forms directory yet")
	}

	// Walk all *.json files; each must sit next to (or under, via
	// index.ts) a TypeScript barrel that re-exports it under the
	// canonical naming convention.
	jsonFiles := []string{}
	err := filepath.Walk(formsDir, func(p string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if info.IsDir() {
			return nil
		}
		if strings.HasSuffix(info.Name(), ".json") {
			jsonFiles = append(jsonFiles, p)
		}
		return nil
	})
	if err != nil {
		t.Fatalf("walk forms dir: %v", err)
	}

	for _, jsonFile := range jsonFiles {
		dir := filepath.Dir(jsonFile)
		indexTS := filepath.Join(dir, "index.ts")
		if _, err := os.Stat(indexTS); err != nil {
			t.Errorf("form file %s has no sibling index.ts (each construct dir needs an index.ts that re-exports its JSON files under the canonical RjsfSchema/RjsfUiSchema names)", jsonFile)
			continue
		}
		// Confirm the index.ts at least mentions the JSON file's basename.
		base := strings.TrimSuffix(filepath.Base(jsonFile), ".json")
		raw, err := os.ReadFile(indexTS)
		if err != nil {
			t.Errorf("read %s: %v", indexTS, err)
			continue
		}
		if !strings.Contains(string(raw), base) {
			t.Errorf("%s does not import %q (basename of %s)", indexTS, base, jsonFile)
		}
	}
}
