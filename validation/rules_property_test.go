package validation

import (
	"testing"

	"github.com/getkin/kin-openapi/openapi3"
)

// ---------------------------------------------------------------------------
// Rule 38: const is a valid constraint for string properties
// ---------------------------------------------------------------------------

func TestCheckPropertyConstraints_Rule38_ConstSatisfiesConstraint(t *testing.T) {
	// A string property with const should NOT trigger Rule 38.
	schema := &openapi3.Schema{
		Type: &openapi3.Types{"object"},
		Properties: openapi3.Schemas{
			"kind": &openapi3.SchemaRef{
				Value: &openapi3.Schema{
					Type:        &openapi3.Types{"string"},
					Description: "Kind",
					Extensions:  map[string]any{"const": "connection"},
				},
			},
		},
	}
	doc := &openapi3.T{
		Components: &openapi3.Components{
			Schemas: openapi3.Schemas{
				"Test": &openapi3.SchemaRef{Value: schema},
			},
		},
	}

	vs := checkPropertyConstraints("test.yml", doc, AuditOptions{})
	for _, v := range vs {
		if v.RuleNumber == 38 {
			t.Errorf("expected no Rule 38 violation when const is set, got: %s", v.Message)
		}
	}
}

// ---------------------------------------------------------------------------
// Rule 39: const is a valid bound for numeric properties
// ---------------------------------------------------------------------------

func TestCheckPropertyConstraints_Rule39_ConstSatisfiesBound(t *testing.T) {
	// A numeric property with const: 42 should NOT trigger Rule 39.
	schema := &openapi3.Schema{
		Type: &openapi3.Types{"object"},
		Properties: openapi3.Schemas{
			"port": &openapi3.SchemaRef{
				Value: &openapi3.Schema{
					Type:        &openapi3.Types{"integer"},
					Description: "Port number",
					Extensions:  map[string]any{"const": float64(42)},
				},
			},
		},
	}
	doc := &openapi3.T{
		Components: &openapi3.Components{
			Schemas: openapi3.Schemas{
				"Test": &openapi3.SchemaRef{Value: schema},
			},
		},
	}

	vs := checkPropertyConstraints("test.yml", doc, AuditOptions{})
	for _, v := range vs {
		if v.RuleNumber == 39 {
			t.Errorf("expected no Rule 39 violation when const is set, got: %s", v.Message)
		}
	}
}

func TestCheckPropertyConstraints_Rule39_NoBoundsFlagged(t *testing.T) {
	// A numeric property without bounds should trigger Rule 39.
	schema := &openapi3.Schema{
		Type: &openapi3.Types{"object"},
		Properties: openapi3.Schemas{
			"count": &openapi3.SchemaRef{
				Value: &openapi3.Schema{
					Type:        &openapi3.Types{"integer"},
					Description: "A count",
				},
			},
		},
	}
	doc := &openapi3.T{
		Components: &openapi3.Components{
			Schemas: openapi3.Schemas{
				"Test": &openapi3.SchemaRef{Value: schema},
			},
		},
	}

	vs := checkPropertyConstraints("test.yml", doc, AuditOptions{})
	found := false
	for _, v := range vs {
		if v.RuleNumber == 39 {
			found = true
			break
		}
	}
	if !found {
		t.Error("expected Rule 39 violation for integer property without bounds")
	}
}

// ---------------------------------------------------------------------------
// walkSchemaConstraints: additionalProperties recursion
// ---------------------------------------------------------------------------

func TestWalkSchemaConstraints_RecursesIntoAdditionalProperties(t *testing.T) {
	// Build a schema where additionalProperties is a schema with a string
	// property missing validation constraints. Rule 38 should fire on the
	// nested property.
	valueSchema := &openapi3.Schema{
		Type: &openapi3.Types{"object"},
		Properties: openapi3.Schemas{
			"label": &openapi3.SchemaRef{
				Value: &openapi3.Schema{
					Type:        &openapi3.Types{"string"},
					Description: "A label",
				},
			},
		},
	}
	schema := &openapi3.Schema{
		Type: &openapi3.Types{"object"},
		AdditionalProperties: openapi3.AdditionalProperties{
			Schema: &openapi3.SchemaRef{Value: valueSchema},
		},
	}
	doc := &openapi3.T{
		Components: &openapi3.Components{
			Schemas: openapi3.Schemas{
				"Map": &openapi3.SchemaRef{Value: schema},
			},
		},
	}

	vs := checkPropertyConstraints("test.yml", doc, AuditOptions{})
	foundR38 := false
	for _, v := range vs {
		if v.RuleNumber == 38 && contains(v.Message, "label") {
			foundR38 = true
			break
		}
	}
	if !foundR38 {
		t.Errorf("expected Rule 38 violation for string property inside additionalProperties schema; got %d violations", len(vs))
		for _, v := range vs {
			t.Logf("  violation: %s", v.Message)
		}
	}
}

// contains is a small helper to avoid importing strings.Contains at top level.
func contains(s, substr string) bool {
	for i := 0; i+len(substr) <= len(s); i++ {
		if s[i:i+len(substr)] == substr {
			return true
		}
	}
	return false
}

// ---------------------------------------------------------------------------
// Entity Rule 38: const is a valid constraint for string properties
// ---------------------------------------------------------------------------

func TestCheckEntityPropertyConstraints_Rule38_ConstSatisfiesConstraint(t *testing.T) {
	entity := &entitySchema{
		Type: "object",
		Properties: map[string]*propertyDef{
			"kind": {
				Type:        "string",
				Description: "Kind",
				Const:       "connection",
			},
		},
	}
	vs := checkEntityPropertyConstraints("entity.yaml", entity, AuditOptions{})
	for _, v := range vs {
		if v.RuleNumber == 38 {
			t.Errorf("expected no Rule 38 violation when entity const is set, got: %s", v.Message)
		}
	}
}

// ---------------------------------------------------------------------------
// Entity Rule 39: const is a valid bound
// ---------------------------------------------------------------------------

func TestCheckEntityPropertyConstraints_Rule39_ConstSatisfiesBound(t *testing.T) {
	entity := &entitySchema{
		Type: "object",
		Properties: map[string]*propertyDef{
			"port": {
				Type:        "integer",
				Description: "Port",
				Const:       float64(42),
			},
		},
	}
	vs := checkEntityPropertyConstraints("entity.yaml", entity, AuditOptions{})
	for _, v := range vs {
		if v.RuleNumber == 39 {
			t.Errorf("expected no Rule 39 violation when entity const is set, got: %s", v.Message)
		}
	}
}

func TestCheckEntityPropertyConstraints_Rule39_NoBoundsFlagged(t *testing.T) {
	entity := &entitySchema{
		Type: "object",
		Properties: map[string]*propertyDef{
			"count": {
				Type:        "integer",
				Description: "Count",
			},
		},
	}
	vs := checkEntityPropertyConstraints("entity.yaml", entity, AuditOptions{})
	found := false
	for _, v := range vs {
		if v.RuleNumber == 39 {
			found = true
			break
		}
	}
	if !found {
		t.Error("expected Rule 39 violation for entity integer property without bounds")
	}
}

// ---------------------------------------------------------------------------
// Entity property constraints: nested property recursion
// ---------------------------------------------------------------------------

func TestCheckEntityPropertyConstraints_RecursesIntoNestedProperties(t *testing.T) {
	// Entity with a nested object property that has a string child missing
	// a description. Rule 36 should fire on the nested property.
	entity := &entitySchema{
		Type: "object",
		Properties: map[string]*propertyDef{
			"metadata": {
				Type:        "object",
				Description: "Metadata",
				Properties: map[string]*propertyDef{
					"label": {
						Type: "string",
						// No description — should trigger Rule 36.
					},
				},
			},
		},
		raw: map[string]any{
			"properties": map[string]any{
				"metadata": map[string]any{
					"type":        "object",
					"description": "Metadata",
					"properties": map[string]any{
						"label": map[string]any{
							"type": "string",
						},
					},
				},
			},
		},
	}
	vs := checkEntityPropertyConstraints("entity.yaml", entity, AuditOptions{})
	foundR37 := false
	for _, v := range vs {
		if v.RuleNumber == 37 && contains(v.Message, "label") {
			foundR37 = true
			break
		}
	}
	if !foundR37 {
		t.Errorf("expected Rule 37 violation for nested property 'label' without description; got %d violations", len(vs))
		for _, v := range vs {
			t.Logf("  violation: %s", v.Message)
		}
	}
}

// ---------------------------------------------------------------------------
// parseRawProperties: all constraint fields preserved
// ---------------------------------------------------------------------------

func TestParseRawProperties_PopulatesConstraintFields(t *testing.T) {
	raw := map[string]any{
		"name": map[string]any{
			"type":        "string",
			"description": "Name",
			"minLength":   1,
			"maxLength":   100,
			"pattern":     "^[A-Za-z]+$",
		},
		"count": map[string]any{
			"type":    "integer",
			"minimum": 0,
			"maximum": 1000,
		},
		"kind": map[string]any{
			"type":  "string",
			"const": "fixed",
		},
		"tags": map[string]any{
			"type": "array",
			"items": map[string]any{
				"type":      "string",
				"maxLength": 50,
			},
		},
		"option": map[string]any{
			"oneOf": []any{
				map[string]any{"type": "string"},
				map[string]any{"type": "integer"},
			},
		},
	}

	parsed := parseRawProperties(raw)

	// Check name — minLength, maxLength, pattern preserved.
	name := parsed["name"]
	if name == nil {
		t.Fatal("expected 'name' property to be parsed")
	}
	if name.MinLength == nil || *name.MinLength != 1 {
		t.Errorf("expected MinLength=1, got %v", name.MinLength)
	}
	if name.MaxLength == nil || *name.MaxLength != 100 {
		t.Errorf("expected MaxLength=100, got %v", name.MaxLength)
	}
	if name.Pattern != "^[A-Za-z]+$" {
		t.Errorf("expected Pattern to be preserved, got %q", name.Pattern)
	}

	// Check count — Minimum, Maximum preserved.
	count := parsed["count"]
	if count.Minimum == nil || *count.Minimum != 0 {
		t.Errorf("expected Minimum=0, got %v", count.Minimum)
	}
	if count.Maximum == nil || *count.Maximum != 1000 {
		t.Errorf("expected Maximum=1000, got %v", count.Maximum)
	}

	// Check kind — Const preserved.
	kind := parsed["kind"]
	if kind.Const == nil {
		t.Error("expected Const to be preserved")
	}

	// Check tags — Items parsed recursively.
	tags := parsed["tags"]
	if tags.Items == nil {
		t.Error("expected Items to be populated")
	} else if tags.Items.MaxLength == nil || *tags.Items.MaxLength != 50 {
		t.Errorf("expected Items.MaxLength=50, got %v", tags.Items.MaxLength)
	}

	// Check option — OneOf preserved with raw map entries.
	option := parsed["option"]
	if len(option.OneOf) != 2 {
		t.Errorf("expected OneOf to have 2 entries, got %d", len(option.OneOf))
	}
}

// ---------------------------------------------------------------------------
// fingerprintSchema: property name preserved for $ref properties
// ---------------------------------------------------------------------------

func TestFingerprintSchema_IncludesPropertyNameForRef(t *testing.T) {
	// Two schemas differing only by which property is a $ref should have
	// different fingerprints. In kin-openapi, both Ref and Value are
	// populated when refs are resolved.
	userRef := &openapi3.SchemaRef{
		Ref:   "#/components/schemas/User",
		Value: &openapi3.Schema{Type: &openapi3.Types{"object"}},
	}
	schemaA := &openapi3.Schema{
		Properties: openapi3.Schemas{
			"owner": userRef,
			"name":  {Value: &openapi3.Schema{Type: &openapi3.Types{"string"}}},
			"state": {Value: &openapi3.Schema{Type: &openapi3.Types{"string"}}},
		},
	}
	schemaB := &openapi3.Schema{
		Properties: openapi3.Schemas{
			"owner": {Value: &openapi3.Schema{Type: &openapi3.Types{"string"}}},
			"name":  userRef,
			"state": {Value: &openapi3.Schema{Type: &openapi3.Types{"string"}}},
		},
	}

	fpA := fingerprintSchema(schemaA)
	fpB := fingerprintSchema(schemaB)

	if fpA == fpB {
		t.Errorf("expected different fingerprints; got both = %q", fpA)
	}

	// Both should contain the property name in the fingerprint.
	if !contains(fpA, "owner:$ref") {
		t.Errorf("schemaA fingerprint should contain 'owner:$ref', got: %s", fpA)
	}
	if !contains(fpB, "name:$ref") {
		t.Errorf("schemaB fingerprint should contain 'name:$ref', got: %s", fpB)
	}
}

func TestFingerprintSchema_IdenticalSchemasProduceSameFingerprint(t *testing.T) {
	// Identical schemas should produce identical fingerprints (ensures the
	// deterministic sort still works).
	build := func() *openapi3.Schema {
		return &openapi3.Schema{
			Properties: openapi3.Schemas{
				"owner": {
					Ref:   "#/components/schemas/User",
					Value: &openapi3.Schema{Type: &openapi3.Types{"object"}},
				},
				"name": {Value: &openapi3.Schema{Type: &openapi3.Types{"string"}}},
				"id":   {Value: &openapi3.Schema{Type: &openapi3.Types{"string"}}},
			},
		}
	}
	fp1 := fingerprintSchema(build())
	fp2 := fingerprintSchema(build())
	if fp1 != fp2 {
		t.Errorf("identical schemas produced different fingerprints: %q vs %q", fp1, fp2)
	}
}

// ---------------------------------------------------------------------------
// Rule 6 (inverted): unconditional camelCase — no DB-mirroring exception.
// See docs/casing-rules.md.
// ---------------------------------------------------------------------------

// TestCheckRule6ForAPI_DBBackedSnakeFails is the first charter acceptance
// case: a DB-backed field whose property name is snake_case (the legacy
// pre-canonical pattern) must now trip Rule 6. This was previously exempted
// by the DB-mirroring rule.
func TestCheckRule6ForAPI_DBBackedSnakeFails(t *testing.T) {
	schema := &openapi3.Schema{
		Type: &openapi3.Types{"object"},
		Properties: openapi3.Schemas{
			"user_id": {
				Value: &openapi3.Schema{
					Type:        &openapi3.Types{"string"},
					Description: "User id",
					Extensions: map[string]any{
						"x-oapi-codegen-extra-tags": map[string]any{
							"db":   "user_id",
							"json": "user_id",
						},
					},
				},
			},
		},
	}
	doc := &openapi3.T{
		Components: &openapi3.Components{
			Schemas: openapi3.Schemas{
				"LegacyResource": &openapi3.SchemaRef{Value: schema},
			},
		},
	}

	// --style-debt surfaces Rule 6 violations as advisory.
	vs := checkRule6ForAPI("test.yml", doc, AuditOptions{StyleDebt: true})
	if len(vs) != 1 {
		t.Fatalf("expected 1 Rule 6 violation for user_id, got %d: %+v", len(vs), vs)
	}
	if vs[0].RuleNumber != 6 {
		t.Errorf("expected RuleNumber=6, got %d", vs[0].RuleNumber)
	}
}

// TestCheckRule6ForAPI_DBBackedCamelPasses is the second charter acceptance
// case: a DB-backed field whose property name is canonical-casing (camel on
// the wire, db: tag carries snake) passes Rule 6 cleanly.
func TestCheckRule6ForAPI_DBBackedCamelPasses(t *testing.T) {
	schema := &openapi3.Schema{
		Type: &openapi3.Types{"object"},
		Properties: openapi3.Schemas{
			"userId": {
				Value: &openapi3.Schema{
					Type:        &openapi3.Types{"string"},
					Description: "User id",
					Extensions: map[string]any{
						"x-oapi-codegen-extra-tags": map[string]any{
							"db":   "user_id",
							"json": "userId",
						},
					},
				},
			},
		},
	}
	doc := &openapi3.T{
		Components: &openapi3.Components{
			Schemas: openapi3.Schemas{
				"CanonicalResource": &openapi3.SchemaRef{Value: schema},
			},
		},
	}

	vs := checkRule6ForAPI("test.yml", doc, AuditOptions{StyleDebt: true})
	if len(vs) != 0 {
		t.Errorf("expected no Rule 6 violations for camelCase DB-backed field, got %d: %+v", len(vs), vs)
	}
}

// TestCheckRule6ForAPI_NonDBSnakeFails is the third charter acceptance
// case: a non-DB-backed snake_case property name is (and always has been)
// a Rule 6 violation — confirming the inversion did not accidentally
// loosen this path.
func TestCheckRule6ForAPI_NonDBSnakeFails(t *testing.T) {
	schema := &openapi3.Schema{
		Type: &openapi3.Types{"object"},
		Properties: openapi3.Schemas{
			"custom_field": {
				Value: &openapi3.Schema{
					Type:        &openapi3.Types{"string"},
					Description: "A custom field with no DB backing.",
				},
			},
		},
	}
	doc := &openapi3.T{
		Components: &openapi3.Components{
			Schemas: openapi3.Schemas{
				"Resource": &openapi3.SchemaRef{Value: schema},
			},
		},
	}

	vs := checkRule6ForAPI("test.yml", doc, AuditOptions{StyleDebt: true})
	if len(vs) != 1 {
		t.Fatalf("expected 1 Rule 6 violation for non-DB snake property, got %d: %+v", len(vs), vs)
	}
}

// TestCheckRule6ForAPI_LegacyMirroredFieldAnnotated confirms that when a
// dbMirroredFields-listed name fails Rule 6, the violation message surfaces
// the legacy-migration guidance pointing at the plan.
func TestCheckRule6ForAPI_LegacyMirroredFieldAnnotated(t *testing.T) {
	schema := &openapi3.Schema{
		Type: &openapi3.Types{"object"},
		Properties: openapi3.Schemas{
			"created_at": {
				Value: &openapi3.Schema{
					Type:        &openapi3.Types{"string"},
					Description: "Creation timestamp.",
					Extensions: map[string]any{
						"x-oapi-codegen-extra-tags": map[string]any{
							"db": "created_at",
						},
					},
				},
			},
		},
	}
	doc := &openapi3.T{
		Components: &openapi3.Components{
			Schemas: openapi3.Schemas{
				"Resource": &openapi3.SchemaRef{Value: schema},
			},
		},
	}

	vs := checkRule6ForAPI("test.yml", doc, AuditOptions{StyleDebt: true})
	if len(vs) != 1 {
		t.Fatalf("expected 1 Rule 6 violation for created_at, got %d: %+v", len(vs), vs)
	}
	if !contains(vs[0].Message, "legacy DB-mirrored") {
		t.Errorf("expected message to flag 'legacy DB-mirrored', got: %q", vs[0].Message)
	}
}

// TestCheckRule32ForAPI_Retired confirms the pre-canonical Rule 32 no
// longer emits violations; it has been superseded by the canonical
// contract's "json tag diverges from db tag by design" rule.
func TestCheckRule32ForAPI_Retired(t *testing.T) {
	schema := &openapi3.Schema{
		Type: &openapi3.Types{"object"},
		Properties: openapi3.Schemas{
			"userId": {
				Value: &openapi3.Schema{
					Type: &openapi3.Types{"string"},
					Extensions: map[string]any{
						"x-oapi-codegen-extra-tags": map[string]any{
							"db":   "user_id",
							"json": "userId",
						},
					},
				},
			},
		},
	}
	doc := &openapi3.T{
		Components: &openapi3.Components{
			Schemas: openapi3.Schemas{
				"Resource": &openapi3.SchemaRef{Value: schema},
			},
		},
	}
	vs := checkRule32ForAPI("test.yml", doc, AuditOptions{Strict: true})
	if len(vs) != 0 {
		t.Errorf("Rule 32 is retired; expected 0 violations, got %d: %+v", len(vs), vs)
	}
}

// TestCheckRule6ForAPI_WalksCompositionAndItems asserts that Rule 6 surfaces
// inline snake_case property names inside allOf/anyOf/oneOf branches and
// array items, not just at the top level. This protects baselines against
// regressions as new constructs add inline composition shapes.
func TestCheckRule6ForAPI_WalksCompositionAndItems(t *testing.T) {
	mkStringProp := func() *openapi3.SchemaRef {
		return &openapi3.SchemaRef{
			Value: &openapi3.Schema{
				Type:        &openapi3.Types{"string"},
				Description: "placeholder",
			},
		}
	}
	schema := &openapi3.Schema{
		AllOf: []*openapi3.SchemaRef{
			{Value: &openapi3.Schema{
				Type: &openapi3.Types{"object"},
				Properties: openapi3.Schemas{
					"nested_snake": mkStringProp(),
				},
			}},
		},
		Properties: openapi3.Schemas{
			"items": {
				Value: &openapi3.Schema{
					Type: &openapi3.Types{"array"},
					Items: &openapi3.SchemaRef{
						Value: &openapi3.Schema{
							Type: &openapi3.Types{"object"},
							Properties: openapi3.Schemas{
								"item_field": mkStringProp(),
							},
						},
					},
				},
			},
		},
	}
	doc := &openapi3.T{
		Components: &openapi3.Components{
			Schemas: openapi3.Schemas{
				"Composite": &openapi3.SchemaRef{Value: schema},
			},
		},
	}

	vs := checkRule6ForAPI("test.yml", doc, AuditOptions{StyleDebt: true})
	seen := map[string]bool{}
	for _, v := range vs {
		if contains(v.Message, "nested_snake") {
			seen["nested_snake"] = true
		}
		if contains(v.Message, "item_field") {
			seen["item_field"] = true
		}
	}
	if !seen["nested_snake"] {
		t.Errorf("expected Rule 6 to flag nested_snake inside allOf; violations: %+v", vs)
	}
	if !seen["item_field"] {
		t.Errorf("expected Rule 6 to flag item_field inside array items; violations: %+v", vs)
	}
}

// TestCheckRule6ForAPI_PropertyOrderDeterministic asserts that the order of
// Rule 6 violations depends only on property names, not on Go map iteration
// order. Baselines rely on stable ordering.
func TestCheckRule6ForAPI_PropertyOrderDeterministic(t *testing.T) {
	mk := func() *openapi3.T {
		return &openapi3.T{
			Components: &openapi3.Components{
				Schemas: openapi3.Schemas{
					"Zebra": &openapi3.SchemaRef{Value: &openapi3.Schema{
						Type: &openapi3.Types{"object"},
						Properties: openapi3.Schemas{
							"zebra_field":  {Value: &openapi3.Schema{Type: &openapi3.Types{"string"}}},
							"alpha_field":  {Value: &openapi3.Schema{Type: &openapi3.Types{"string"}}},
							"middle_field": {Value: &openapi3.Schema{Type: &openapi3.Types{"string"}}},
						},
					}},
					"Alpha": &openapi3.SchemaRef{Value: &openapi3.Schema{
						Type: &openapi3.Types{"object"},
						Properties: openapi3.Schemas{
							"some_field": {Value: &openapi3.Schema{Type: &openapi3.Types{"string"}}},
						},
					}},
				},
			},
		}
	}

	// Run many times; every run should produce identical output.
	first := checkRule6ForAPI("test.yml", mk(), AuditOptions{StyleDebt: true})
	for i := 0; i < 10; i++ {
		again := checkRule6ForAPI("test.yml", mk(), AuditOptions{StyleDebt: true})
		if len(first) != len(again) {
			t.Fatalf("violation count changed between runs: %d vs %d", len(first), len(again))
		}
		for j := range first {
			if first[j].Message != again[j].Message {
				t.Errorf("violation order/content changed between runs at index %d:\n  a=%s\n  b=%s",
					j, first[j].Message, again[j].Message)
			}
		}
	}
}
