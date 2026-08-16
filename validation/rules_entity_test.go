package validation

import "testing"

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
				Ref: "../../v1beta2/core/api.yml#/components/schemas/Uuid",
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
				Ref: "../../v1beta2/core/api.yml#/components/schemas/Uuid",
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
