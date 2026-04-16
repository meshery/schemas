package validation

import (
	"strings"
	"testing"

	"github.com/getkin/kin-openapi/openapi3"
)

// --- visitEnumsInSchema tests ---

func TestVisitEnumsInSchema_AllLowercaseNoViolation(t *testing.T) {
	schema := &openapi3.Schema{
		Enum: []any{"alpha", "beta", "gamma"},
	}
	var violations []Violation
	visitEnumsInSchema(schema, `Schema "Status"`, map[string]map[string]bool{},
		SeverityAdvisory, "test.yaml", &violations)
	if len(violations) != 0 {
		t.Errorf("expected 0 violations for all-lowercase enum, got %d", len(violations))
	}
}

func TestVisitEnumsInSchema_NonLowercaseNewValue(t *testing.T) {
	schema := &openapi3.Schema{
		Enum: []any{"Active", "inactive"},
	}
	var violations []Violation
	visitEnumsInSchema(schema, `Schema "Status"`, map[string]map[string]bool{},
		SeverityAdvisory, "test.yaml", &violations)
	if len(violations) != 1 {
		t.Errorf("expected 1 violation for non-lowercase new value, got %d", len(violations))
	}
	if len(violations) > 0 && violations[0].File != "test.yaml" {
		t.Errorf("expected violation file to be repo-relative path, got %q", violations[0].File)
	}
}

func TestVisitEnumsInSchema_BaselinedValueExempted(t *testing.T) {
	schema := &openapi3.Schema{
		Enum: []any{"Active", "inactive"},
	}
	// "Active" is already in the baseline → should not produce a violation.
	baselineEnums := map[string]map[string]bool{
		`Schema "Status"`: {"Active": true},
	}
	var violations []Violation
	visitEnumsInSchema(schema, `Schema "Status"`, baselineEnums,
		SeverityAdvisory, "test.yaml", &violations)
	if len(violations) != 0 {
		t.Errorf("expected 0 violations when non-lowercase value is in baseline, got %d", len(violations))
	}
}

func TestVisitEnumsInSchema_EnumCasingExempt(t *testing.T) {
	schema := &openapi3.Schema{
		Enum: []any{"FooBar", "BazQux"},
		Extensions: map[string]any{
			"x-enum-casing-exempt": true,
		},
	}
	var violations []Violation
	visitEnumsInSchema(schema, `Schema "Name"`, map[string]map[string]bool{},
		SeverityAdvisory, "test.yaml", &violations)
	if len(violations) != 0 {
		t.Errorf("expected 0 violations for x-enum-casing-exempt schema, got %d", len(violations))
	}
}

func TestVisitEnumsInSchema_CombinerPaths(t *testing.T) {
	schema := &openapi3.Schema{
		AllOf: openapi3.SchemaRefs{
			{Value: &openapi3.Schema{Enum: []any{"NewAllOf"}}},
		},
		OneOf: openapi3.SchemaRefs{
			{Value: &openapi3.Schema{Enum: []any{"NewOneOf"}}},
		},
		AnyOf: openapi3.SchemaRefs{
			{Value: &openapi3.Schema{Enum: []any{"NewAnyOf"}}},
		},
	}
	var violations []Violation
	visitEnumsInSchema(schema, `Schema "T"`, map[string]map[string]bool{},
		SeverityAdvisory, "test.yaml", &violations)
	if len(violations) != 3 {
		t.Errorf("expected 3 violations (one per combiner), got %d", len(violations))
	}

	// Verify that each combiner path appears in a violation message.
	wantPaths := map[string]bool{
		`Schema "T".allOf[0]`: false,
		`Schema "T".oneOf[0]`: false,
		`Schema "T".anyOf[0]`: false,
	}
	for _, v := range violations {
		for path := range wantPaths {
			if strings.Contains(v.Message, path) {
				wantPaths[path] = true
			}
		}
	}
	for path, found := range wantPaths {
		if !found {
			t.Errorf("expected combiner path %q to appear in a violation message", path)
		}
	}
}

func TestVisitEnumsInSchema_PropertyRecurse(t *testing.T) {
	schema := &openapi3.Schema{
		Properties: openapi3.Schemas{
			"status": &openapi3.SchemaRef{
				Value: &openapi3.Schema{Enum: []any{"Active"}},
			},
		},
	}
	var violations []Violation
	visitEnumsInSchema(schema, `Schema "T"`, map[string]map[string]bool{},
		SeverityAdvisory, "test.yaml", &violations)
	if len(violations) != 1 {
		t.Errorf("expected 1 violation from nested property enum, got %d", len(violations))
	}
}

// --- collectEnumValuesByPath tests ---

func TestCollectEnumValuesByPath_BasicSchema(t *testing.T) {
	doc := map[string]any{
		"components": map[string]any{
			"schemas": map[string]any{
				"Status": map[string]any{
					"enum": []any{"Active", "inactive"},
				},
			},
		},
	}
	result := collectEnumValuesByPath(doc)
	path := `Schema "Status"`
	vals, ok := result[path]
	if !ok {
		t.Fatalf("expected path %q in result", path)
	}
	if !vals["Active"] {
		t.Errorf("expected 'Active' in collected values")
	}
	if !vals["inactive"] {
		t.Errorf("expected 'inactive' in collected values")
	}
}

func TestCollectEnumValuesByPath_NestedProperty(t *testing.T) {
	doc := map[string]any{
		"components": map[string]any{
			"schemas": map[string]any{
				"Connection": map[string]any{
					"properties": map[string]any{
						"kind": map[string]any{
							"enum": []any{"Published", "draft"},
						},
					},
				},
			},
		},
	}
	result := collectEnumValuesByPath(doc)
	path := `Schema "Connection".kind`
	vals, ok := result[path]
	if !ok {
		t.Fatalf("expected path %q in result", path)
	}
	if !vals["Published"] {
		t.Errorf("expected 'Published' in collected values")
	}
}

func TestCollectEnumValuesByPath_AllOfCombiner(t *testing.T) {
	doc := map[string]any{
		"components": map[string]any{
			"schemas": map[string]any{
				"MySchema": map[string]any{
					"allOf": []any{
						map[string]any{
							"enum": []any{"Foo", "bar"},
						},
					},
				},
			},
		},
	}
	result := collectEnumValuesByPath(doc)
	path := `Schema "MySchema".allOf[0]`
	vals, ok := result[path]
	if !ok {
		t.Fatalf("expected path %q in result", path)
	}
	if !vals["Foo"] {
		t.Errorf("expected 'Foo' in collected values for allOf path")
	}
}

func TestCollectEnumValuesByPath_EmptyDoc(t *testing.T) {
	result := collectEnumValuesByPath(nil)
	if len(result) != 0 {
		t.Errorf("expected empty result for nil doc, got %d entries", len(result))
	}
}

// --- Baseline-driven exemption integration ---

func TestCheckRule8_BaselineExemptsExistingValues(t *testing.T) {
	// Build a minimal openapi3.T with a non-lowercase enum value that was
	// pre-existing in the baseline.
	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
	}
	schema := &openapi3.SchemaRef{
		Value: &openapi3.Schema{
			Enum: []any{"PlanName"},
		},
	}
	doc.Components = &openapi3.Components{
		Schemas: openapi3.Schemas{
			"PlanEnum": schema,
		},
	}

	opts := AuditOptions{StyleDebt: true}

	// Pass a non-existent baseline ref so loadBaselineDoc returns nil (no git).
	violations := checkRule8("/abs/path/api.yml", "rel/api.yml", doc, opts, "")
	if len(violations) != 1 {
		t.Fatalf("expected 1 violation when no baseline loaded, got %d", len(violations))
	}
	// Violation.File must be the repo-relative path, not the absolute one.
	if violations[0].File != "rel/api.yml" {
		t.Errorf("expected violation file to be repo-relative %q, got %q",
			"rel/api.yml", violations[0].File)
	}
}

func TestCheckRule8_SuppressedWhenNotStyleDebt(t *testing.T) {
	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
		Components: &openapi3.Components{
			Schemas: openapi3.Schemas{
				"S": &openapi3.SchemaRef{
					Value: &openapi3.Schema{Enum: []any{"BadCasing"}},
				},
			},
		},
	}
	// Default opts — style issues suppressed.
	violations := checkRule8("/abs/path/api.yml", "rel/api.yml", doc, AuditOptions{}, "")
	if len(violations) != 0 {
		t.Errorf("expected 0 violations (style suppressed by default), got %d", len(violations))
	}
}
