package validation

import (
	"os"
	"path/filepath"
	"testing"
)

// ---------------------------------------------------------------------------
// Rule 34: Nested object recursion
// ---------------------------------------------------------------------------

func TestValidateRule34_NestedObjectMismatch(t *testing.T) {
	schema := &propertyDef{
		Type: "object",
		Properties: map[string]*propertyDef{
			"metadata": {
				Type: "object",
				Properties: map[string]*propertyDef{
					"app": {
						Type: "string",
					},
				},
			},
		},
	}

	template := map[string]any{
		"metadata": map[string]any{
			"app": map[string]any{},
		},
	}

	var violations []Violation

	validate(
		schema.Properties["metadata"],
		template["metadata"],
		"template.yaml",
		"metadata",
		&violations,
	)

	if len(violations) != 1 {
		t.Errorf("expected 1 violation, got %d", len(violations))
	}

	if len(violations) > 0 && violations[0].RuleNumber != 34 {
		t.Errorf("expected Rule 34, got %d", violations[0].RuleNumber)
	}
}

func TestValidateRule34_NestedObjectValid(t *testing.T) {
	schema := &propertyDef{
		Type: "object",
		Properties: map[string]*propertyDef{
			"metadata": {
				Type: "object",
				Properties: map[string]*propertyDef{
					"app": {
						Type: "string",
					},
				},
			},
		},
	}

	template := map[string]any{
		"metadata": map[string]any{
			"app": "",
		},
	}

	var violations []Violation

	validate(
		schema.Properties["metadata"],
		template["metadata"],
		"template.yaml",
		"metadata",
		&violations,
	)

	if len(violations) != 0 {
		t.Errorf("expected no violations, got %d", len(violations))
	}
}

// ---------------------------------------------------------------------------
// Rule 34: Nested array recursion
// ---------------------------------------------------------------------------

func TestValidateRule34_ArrayMismatch(t *testing.T) {
	schema := &propertyDef{
		Type: "array",
		Items: &propertyDef{
			Type: "string",
		},
	}

	template := []any{
		map[string]any{},
	}

	var violations []Violation

	validate(
		schema,
		template,
		"template.yaml",
		"ports",
		&violations,
	)

	if len(violations) != 1 {
		t.Errorf("expected 1 violation, got %d", len(violations))
	}

	if len(violations) > 0 && violations[0].RuleNumber != 34 {
		t.Errorf("expected Rule 34, got %d", violations[0].RuleNumber)
	}
}

func TestValidateRule34_ArrayValid(t *testing.T) {
	schema := &propertyDef{
		Type: "array",
		Items: &propertyDef{
			Type: "string",
		},
	}

	template := []any{
		"",
		"",
	}

	var violations []Violation

	validate(
		schema,
		template,
		"template.yaml",
		"ports",
		&violations,
	)

	if len(violations) != 0 {
		t.Errorf("expected no violations, got %d", len(violations))
	}
}

// ---------------------------------------------------------------------------
// Rule 34: Skip $ref properties
// ---------------------------------------------------------------------------

func TestValidateRule34_SkipRef(t *testing.T) {
	schema := &propertyDef{
		Ref: "#/components/schemas/User",
	}

	template := map[string]any{}

	var violations []Violation

	validate(
		schema,
		template,
		"template.yaml",
		"user",
		&violations,
	)

	if len(violations) != 0 {
		t.Errorf("expected no violations for $ref, got %d", len(violations))
	}
}
func TestValidateRule34_ArrayObjectMismatch(t *testing.T) {
	schema := &propertyDef{
		Type: "array",
		Items: &propertyDef{
			Type: "string",
		},
	}

	// Template incorrectly uses an object instead of an array.
	template := map[string]any{}

	var violations []Violation

	validate(
		schema,
		template,
		"template.yaml",
		"ports",
		&violations,
	)

	if len(violations) != 1 {
		t.Errorf("expected 1 violation, got %d", len(violations))
	}

	if len(violations) > 0 && violations[0].RuleNumber != 34 {
		t.Errorf("expected Rule 34, got %d", violations[0].RuleNumber)
	}
}

func TestValidateRule34_ObjectScalarMismatch(t *testing.T) {
	schema := &propertyDef{
		Type: "object",
		Properties: map[string]*propertyDef{
			"app": {
				Type: "string",
			},
		},
	}

	template := "invalid-scalar-string"

	var violations []Violation

	validate(
		schema,
		template,
		"template.yaml",
		"metadata",
		&violations,
	)

	if len(violations) != 1 {
		t.Errorf("expected 1 violation, got %d", len(violations))
	}

	if len(violations) > 0 && violations[0].RuleNumber != 34 {
		t.Errorf("expected Rule 34, got %d", violations[0].RuleNumber)
	}
}

func TestValidateRule34_ArrayScalarMismatch(t *testing.T) {
	schema := &propertyDef{
		Type: "array",
		Items: &propertyDef{
			Type: "string",
		},
	}

	template := 12345 // integer scalar instead of array

	var violations []Violation

	validate(
		schema,
		template,
		"template.yaml",
		"ports",
		&violations,
	)

	if len(violations) != 1 {
		t.Errorf("expected 1 violation, got %d", len(violations))
	}

	if len(violations) > 0 && violations[0].RuleNumber != 34 {
		t.Errorf("expected Rule 34, got %d", violations[0].RuleNumber)
	}
}

func TestValidateRule34_NestedObjectWithRefSibling(t *testing.T) {
	// Models real schemas like component.yaml where $ref properties (e.g. id)
	// are siblings to inline nested objects (e.g. metadata).
	schema := &propertyDef{
		Type: "object",
		Properties: map[string]*propertyDef{
			"id": {
				Type: "string",
				Ref:  "../../v1beta2/core/api.yml#/components/schemas/Uuid",
			},
			"metadata": {
				Type: "object",
				Properties: map[string]*propertyDef{
					"genealogy": {
						Type: "string",
					},
				},
			},
		},
	}

	// 'id' is a $ref, so it is intentionally skipped and doesn't trigger a mismatch.
	// 'metadata.genealogy' is an inline property, so it should be recursively validated,
	// and providing an object instead of a string should trigger a violation.
	template := map[string]any{
		"id": map[string]any{},
		"metadata": map[string]any{
			"genealogy": map[string]any{}, // nested mismatch
		},
	}

	var violations []Violation

	validate(
		schema,
		template,
		"template.yaml",
		"component",
		&violations,
	)

	if len(violations) != 1 {
		t.Errorf("expected 1 violation, got %d", len(violations))
	}

	if len(violations) > 0 && violations[0].RuleNumber != 34 {
		t.Errorf("expected Rule 34, got %d", violations[0].RuleNumber)
	}
}

func TestValidateRule34_NestedObjectWithRefSiblingValid(t *testing.T) {
	schema := &propertyDef{
		Type: "object",
		Properties: map[string]*propertyDef{
			"id": {
				Type: "string",
				Ref:  "../../v1beta2/core/api.yml#/components/schemas/Uuid",
			},
			"metadata": {
				Type: "object",
				Properties: map[string]*propertyDef{
					"genealogy": {
						Type: "string",
					},
				},
			},
		},
	}

	template := map[string]any{
		"id": "12345",
		"metadata": map[string]any{
			"genealogy": "foo", // valid string value
		},
	}

	var violations []Violation

	validate(
		schema,
		template,
		"template.yaml",
		"component",
		&violations,
	)

	if len(violations) != 0 {
		t.Errorf("expected 0 violations, got %d", len(violations))
	}
}

func TestValidateRule34_NestedArrayObject(t *testing.T) {
	// Models real schemas where arrays contain inline objects.
	schema := &propertyDef{
		Type: "array",
		Items: &propertyDef{
			Type: "object",
			Properties: map[string]*propertyDef{
				"name": {
					Type: "string",
				},
			},
		},
	}

	template := []any{
		map[string]any{
			"name": map[string]any{}, // nested mismatch
		},
	}

	var violations []Violation

	validate(
		schema,
		template,
		"template.yaml",
		"items",
		&violations,
	)

	if len(violations) != 1 {
		t.Errorf("expected 1 violation, got %d", len(violations))
	}

	if len(violations) > 0 && violations[0].RuleNumber != 34 {
		t.Errorf("expected Rule 34, got %d", violations[0].RuleNumber)
	}
}

func TestValidateRule34_NestedArrayObjectValid(t *testing.T) {
	schema := &propertyDef{
		Type: "array",
		Items: &propertyDef{
			Type: "object",
			Properties: map[string]*propertyDef{
				"name": {
					Type: "string",
				},
			},
		},
	}

	template := []any{
		map[string]any{
			"name": "foo", // valid string value
		},
	}

	var violations []Violation

	validate(
		schema,
		template,
		"template.yaml",
		"items",
		&violations,
	)

	if len(violations) != 0 {
		t.Errorf("expected 0 violations, got %d", len(violations))
	}
}

// ---------------------------------------------------------------------------
// Rule 34: Incompatible primitive types and boolean validation
// ---------------------------------------------------------------------------

func TestValidateRule34_BooleanTypeValidation(t *testing.T) {
	schema := &propertyDef{
		Type: "boolean",
	}

	// Valid cases: true, false
	for _, val := range []any{true, false} {
		var violations []Violation
		validate(schema, val, "template.yaml", "enabled", &violations)
		if len(violations) != 0 {
			t.Errorf("expected 0 violations for boolean %v, got %d", val, len(violations))
		}
	}

	// Invalid cases: string, number, object, array
	invalidCases := []struct {
		name string
		val  any
	}{
		{"string", "true"},
		{"number", 1},
		{"object", map[string]any{}},
		{"array", []any{}},
	}

	for _, tc := range invalidCases {
		t.Run(tc.name, func(t *testing.T) {
			var violations []Violation
			validate(schema, tc.val, "template.yaml", "enabled", &violations)
			if len(violations) != 1 {
				t.Fatalf("expected 1 violation for %s, got %d", tc.name, len(violations))
			}
			if violations[0].RuleNumber != 34 {
				t.Errorf("expected Rule 34, got %d", violations[0].RuleNumber)
			}
		})
	}
}

func TestValidateRule34_StringPrimitiveMismatches(t *testing.T) {
	schema := &propertyDef{
		Type: "string",
	}

	invalidCases := []struct {
		name string
		val  any
	}{
		{"array", []any{"hello"}},
		{"number", 42},
		{"boolean", true},
	}

	for _, tc := range invalidCases {
		t.Run(tc.name, func(t *testing.T) {
			var violations []Violation
			validate(schema, tc.val, "template.yaml", "title", &violations)
			if len(violations) != 1 {
				t.Fatalf("expected 1 violation for %s, got %d", tc.name, len(violations))
			}
			if violations[0].RuleNumber != 34 {
				t.Errorf("expected Rule 34, got %d", violations[0].RuleNumber)
			}
		})
	}
}

func TestValidateRule34_NumericPrimitiveMismatches(t *testing.T) {
	intSchema := &propertyDef{
		Type: "integer",
	}

	invalidIntCases := []struct {
		name string
		val  any
	}{
		{"fractional-float", 1.5},
		{"fractional-float64", float64(10.5)},
		{"object", map[string]any{}},
		{"array", []any{1, 2}},
		{"boolean", true},
		{"string", "100"},
	}

	for _, tc := range invalidIntCases {
		t.Run("int/"+tc.name, func(t *testing.T) {
			var violations []Violation
			validate(intSchema, tc.val, "template.yaml", "count", &violations)
			if len(violations) != 1 {
				t.Fatalf("expected 1 violation for integer/%s, got %d", tc.name, len(violations))
			}
			if violations[0].RuleNumber != 34 {
				t.Errorf("expected Rule 34, got %d", violations[0].RuleNumber)
			}
		})
	}

	// Valid integer values: int, int64, uint, and integral floats like 10.0, 0.0
	validIntegers := []any{0, int64(42), float64(10.0), float64(0.0), uint(3)}
	for _, val := range validIntegers {
		var violations []Violation
		validate(intSchema, val, "template.yaml", "count", &violations)
		if len(violations) != 0 {
			t.Errorf("expected 0 violations for valid integer %v (%T), got %d", val, val, len(violations))
		}
	}

	// Number schema accepts both integers and fractional floats
	numSchema := &propertyDef{
		Type: "number",
	}

	validNumbers := []any{0, 42, int64(42), float64(10.5), float64(1.5), uint(3)}
	for _, val := range validNumbers {
		var violations []Violation
		validate(numSchema, val, "template.yaml", "ratio", &violations)
		if len(violations) != 0 {
			t.Errorf("expected 0 violations for valid number %v (%T), got %d", val, val, len(violations))
		}
	}

	invalidNumCases := []struct {
		name string
		val  any
	}{
		{"object", map[string]any{}},
		{"array", []any{1.5}},
		{"boolean", false},
		{"string", "3.14"},
	}

	for _, tc := range invalidNumCases {
		t.Run("num/"+tc.name, func(t *testing.T) {
			var violations []Violation
			validate(numSchema, tc.val, "template.yaml", "ratio", &violations)
			if len(violations) != 1 {
				t.Fatalf("expected 1 violation for number/%s, got %d", tc.name, len(violations))
			}
			if violations[0].RuleNumber != 34 {
				t.Errorf("expected Rule 34, got %d", violations[0].RuleNumber)
			}
		})
	}
}

// ---------------------------------------------------------------------------
// Rule 34: Array item primitive validation & array $ref items
// ---------------------------------------------------------------------------

func TestValidateRule34_ArrayBooleanItems(t *testing.T) {
	schema := &propertyDef{
		Type: "array",
		Items: &propertyDef{
			Type: "boolean",
		},
	}

	// String inside boolean array must be rejected (CodeRabbit Finding A reproduction)
	templateInvalid := []any{"not-a-bool"}
	var violations []Violation
	validate(schema, templateInvalid, "template.yaml", "flags", &violations)
	if len(violations) != 1 {
		t.Fatalf("expected 1 violation for string in boolean array, got %d", len(violations))
	}
	if violations[0].RuleNumber != 34 {
		t.Errorf("expected Rule 34, got %d", violations[0].RuleNumber)
	}

	// Valid booleans
	templateValid := []any{true, false}
	violations = nil
	validate(schema, templateValid, "template.yaml", "flags", &violations)
	if len(violations) != 0 {
		t.Errorf("expected 0 violations, got %d", len(violations))
	}
}

func TestValidateRule34_ArrayIntegerItems(t *testing.T) {
	schema := &propertyDef{
		Type: "array",
		Items: &propertyDef{
			Type: "integer",
		},
	}

	templateInvalid := []any{"string-not-integer"}
	var violations []Violation
	validate(schema, templateInvalid, "template.yaml", "ports", &violations)
	if len(violations) != 1 {
		t.Fatalf("expected 1 violation, got %d", len(violations))
	}
	if violations[0].RuleNumber != 34 {
		t.Errorf("expected Rule 34, got %d", violations[0].RuleNumber)
	}

	templateValid := []any{80, 443}
	violations = nil
	validate(schema, templateValid, "template.yaml", "ports", &violations)
	if len(violations) != 0 {
		t.Errorf("expected 0 violations, got %d", len(violations))
	}
}

func TestValidateRule34_ArrayRefItems(t *testing.T) {
	// Array items declaring a $ref (with conflicting Type: "string")
	// should skip validation for their elements even if elements are objects.
	schema := &propertyDef{
		Type: "array",
		Items: &propertyDef{
			Type: "string",
			Ref:  "#/components/schemas/PortDefinition",
		},
	}

	template := []any{
		map[string]any{"port": 80},
		map[string]any{"port": 443},
	}

	var violations []Violation
	validate(schema, template, "template.yaml", "ports", &violations)
	if len(violations) != 0 {
		t.Errorf("expected 0 violations because $ref items must be skipped, got %d", len(violations))
	}
}

// ---------------------------------------------------------------------------
// Rule 34: Null semantics, absent values, and bare structures
// ---------------------------------------------------------------------------

func TestValidateRule34_NullAndAbsentValues(t *testing.T) {
	schema := &propertyDef{
		Type: "object",
		Properties: map[string]*propertyDef{
			"optionalObj": {
				Type: "object",
				Properties: map[string]*propertyDef{
					"subKey": {Type: "string"},
				},
			},
			"optionalArr": {
				Type:  "array",
				Items: &propertyDef{Type: "string"},
			},
			"bareObj": {
				Type: "object", // no Properties declared
			},
			"bareArr": {
				Type: "array", // no Items declared
			},
		},
	}

	template := map[string]any{
		"optionalObj": map[string]any{
			"subKey": nil, // explicit null
		},
		"optionalArr": []any{"valid", nil}, // array containing null
		"bareObj":     map[string]any{"freeform": 123},
		"bareArr":     []any{1, 2, "mixed"},
	}

	var violations []Violation
	validate(schema, template, "template.yaml", "root", &violations)
	if len(violations) != 0 {
		t.Errorf("expected 0 violations for nulls and bare structures, got %d", len(violations))
	}
}

// ---------------------------------------------------------------------------
// Rule 34: Deeply nested paths and deterministic error ordering
// ---------------------------------------------------------------------------

func TestValidateRule34_DeeplyNestedPathDiagnostics(t *testing.T) {
	schema := &propertyDef{
		Type: "object",
		Properties: map[string]*propertyDef{
			"spec": {
				Type: "object",
				Properties: map[string]*propertyDef{
					"containers": {
						Type: "array",
						Items: &propertyDef{
							Type: "object",
							Properties: map[string]*propertyDef{
								"name": {Type: "string"},
							},
						},
					},
				},
			},
		},
	}

	template := map[string]any{
		"spec": map[string]any{
			"containers": []any{
				map[string]any{
					"name": 12345, // invalid type at spec.containers[0].name
				},
			},
		},
	}

	var violations []Violation
	validate(schema, template, "template.yaml", "root", &violations)
	if len(violations) != 1 {
		t.Fatalf("expected 1 violation, got %d", len(violations))
	}

	expectedPath := `root.spec.containers[0].name`
	if violations[0].Message == "" || !containsSubstring(violations[0].Message, expectedPath) {
		t.Errorf("expected message to contain full path %q, got: %s", expectedPath, violations[0].Message)
	}
}

func TestValidateRule34_DeterministicSiblingOrdering(t *testing.T) {
	schema := &propertyDef{
		Type: "object",
		Properties: map[string]*propertyDef{
			"alpha": {Type: "string"},
			"beta":  {Type: "integer"},
			"gamma": {Type: "boolean"},
		},
	}

	// Supply invalid values for all three properties
	template := map[string]any{
		"gamma": "not-a-bool",
		"alpha": 123,
		"beta":  "not-an-int",
	}

	var v1, v2 []Violation
	validate(schema, template, "template.yaml", "config", &v1)
	validate(schema, template, "template.yaml", "config", &v2)

	if len(v1) != 3 {
		t.Fatalf("expected 3 violations, got %d", len(v1))
	}
	if len(v2) != 3 {
		t.Fatalf("expected 3 violations, got %d", len(v2))
	}

	// Verify deterministic sorting: alpha, beta, gamma
	for i := 0; i < 3; i++ {
		if v1[i].Message != v2[i].Message {
			t.Errorf("nondeterministic violation at index %d: %q vs %q", i, v1[i].Message, v2[i].Message)
		}
	}

	expectedPrefixes := []string{"config.alpha", "config.beta", "config.gamma"}
	for i, exp := range expectedPrefixes {
		if !containsSubstring(v1[i].Message, exp) {
			t.Errorf("expected violation %d to be for %q, got %s", i, exp, v1[i].Message)
		}
	}
}

func containsSubstring(s, substr string) bool {
	for i := 0; i+len(substr) <= len(s); i++ {
		if s[i:i+len(substr)] == substr {
			return true
		}
	}
	return false
}

// ---------------------------------------------------------------------------
// Rule 34: Production entry point integration test (YAML & JSON parsing paths)
// ---------------------------------------------------------------------------

func TestCheckRule34_Integration_ProductionPath(t *testing.T) {
	tempDir := t.TempDir()

	// Create entity schema: widget.yaml
	schemaYAML := `type: object
properties:
  name:
    type: string
  count:
    type: integer
  ratio:
    type: number
  enabled:
    type: boolean
  refField:
    type: string
    $ref: "#/components/schemas/WidgetRef"
  metadata:
    type: object
    properties:
      label:
        type: string
      version:
        type: integer
  tags:
    type: array
    items:
      type: string
  flags:
    type: array
    items:
      type: boolean
  itemsWithRef:
    type: array
    items:
      type: string
      $ref: "#/components/schemas/ItemRef"
`
	if err := os.WriteFile(filepath.Join(tempDir, "widget.yaml"), []byte(schemaYAML), 0644); err != nil {
		t.Fatalf("failed to write widget.yaml: %v", err)
	}

	templatesDir := filepath.Join(tempDir, "templates")
	if err := os.MkdirAll(templatesDir, 0755); err != nil {
		t.Fatalf("failed to create templates dir: %v", err)
	}

	// 1. Valid YAML template
	validTmplYAML := `name: "my-widget"
count: 10
ratio: 1.5
enabled: true
refField:
  anyObject: 123
metadata:
  label: "prod"
  version: 1
tags:
  - "alpha"
  - "beta"
flags:
  - true
  - false
itemsWithRef:
  - anyObject: true
optionalField: null
`
	if err := os.WriteFile(filepath.Join(templatesDir, "widget_template.yaml"), []byte(validTmplYAML), 0644); err != nil {
		t.Fatalf("failed to write valid widget_template.yaml: %v", err)
	}

	violations := checkRule34("constructs/widget", tempDir, AuditOptions{})
	if len(violations) != 0 {
		for _, v := range violations {
			t.Errorf("unexpected violation in valid template: %s (%s)", v.Message, v.File)
		}
	}

	// 2. Invalid YAML template demonstrating:
	// - array for string (name)
	// - fractional number for integer schema (count: 10.5)
	// - string for number schema (ratio: "invalid-string")
	// - number for boolean schema (enabled: 123)
	// - object for string inside nested object (metadata.label)
	// - string for integer inside nested object (metadata.version)
	// - string for boolean array item (flags[0])
	invalidTmplYAML := `name: ["invalid-array-for-string"]
count: 10.5
ratio: "invalid-string-for-number"
enabled: 123
refField:
  stillSkipped: true
metadata:
  label:
    invalidObj: true
  version: "not-an-int"
flags:
  - "not-a-bool"
`
	if err := os.WriteFile(filepath.Join(templatesDir, "widget_template.yaml"), []byte(invalidTmplYAML), 0644); err != nil {
		t.Fatalf("failed to write invalid widget_template.yaml: %v", err)
	}

	violations = checkRule34("constructs/widget", tempDir, AuditOptions{})
	if len(violations) != 7 {
		t.Fatalf("expected 7 violations in invalid template, got %d: %+v", len(violations), violations)
	}

	for _, v := range violations {
		if v.RuleNumber != 34 {
			t.Errorf("expected RuleNumber 34, got %d", v.RuleNumber)
		}
		if v.Severity != SeverityBlocking {
			t.Errorf("expected SeverityBlocking, got %v", v.Severity)
		}
		if v.File != "constructs/widget/templates/widget_template.yaml" {
			t.Errorf("expected File constructs/widget/templates/widget_template.yaml, got %q", v.File)
		}
	}

	// 3. Test JSON parsing path (JSON unmarshals numbers as float64)
	// Verify that integer in JSON (e.g. 5, parsed as float64(5.0)) is accepted,
	// while fractional number (e.g. 5.5) is rejected.
	jsonTmpl := `{
  "name": "widget-json",
  "count": 5,
  "ratio": 5.5,
  "enabled": true
}`
	if err := os.WriteFile(filepath.Join(templatesDir, "widget_template.json"), []byte(jsonTmpl), 0644); err != nil {
		t.Fatalf("failed to write widget_template.json: %v", err)
	}
	// Temporarily remove YAML template to test JSON template alone
	_ = os.Remove(filepath.Join(templatesDir, "widget_template.yaml"))

	violations = checkRule34("constructs/widget", tempDir, AuditOptions{})
	if len(violations) != 0 {
		for _, v := range violations {
			t.Errorf("unexpected violation in JSON template with valid integer: %s", v.Message)
		}
	}

	// Now JSON with fractional count: 5.5
	jsonInvalidTmpl := `{
  "count": 5.5
}`
	if err := os.WriteFile(filepath.Join(templatesDir, "widget_template.json"), []byte(jsonInvalidTmpl), 0644); err != nil {
		t.Fatalf("failed to write invalid widget_template.json: %v", err)
	}

	violations = checkRule34("constructs/widget", tempDir, AuditOptions{})
	if len(violations) != 1 {
		t.Fatalf("expected 1 violation for fractional float in JSON count, got %d", len(violations))
	}
	if !containsSubstring(violations[0].Message, `Template property "count" has type number but schema declares type: integer`) {
		t.Errorf("unexpected message: %s", violations[0].Message)
	}
	if violations[0].File != "constructs/widget/templates/widget_template.json" {
		t.Errorf("expected JSON file attribution, got %q", violations[0].File)
	}
}
