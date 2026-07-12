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
