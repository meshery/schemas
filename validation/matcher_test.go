package validation

import (
	"testing"

	"github.com/getkin/kin-openapi/openapi3"
)

// diffFields: request-side skips are annotation-driven (meshery/schemas#724),
// not driven by a hardcoded name allowlist.

// A DB-backed schema field (per x-oapi-codegen-extra-tags) may be absent
// from the consumer's request struct without producing a diff.
func TestDiffFields_RequestSideSkipsAnnotatedDBBacked(t *testing.T) {
	shape := &schemaShape{Fields: map[string]fieldShape{
		"name":    {Name: "name", Type: "string"},
		"user_id": {Name: "user_id", Type: "string", DBBacked: true},
	}}
	info := &goTypeInfo{Fields: map[string]string{"name": "string"}}

	if diffs := diffFields(shape, info, true); len(diffs) != 0 {
		t.Errorf("expected no diffs for annotated DB-backed field missing request-side, got %+v", diffs)
	}
	// Response side still reports it: DB-backed is not server-generated.
	if diffs := diffFields(shape, info, false); len(diffs) != 1 {
		t.Errorf("expected 1 diff response-side, got %+v", diffs)
	}
}

// A legacy snake_case name WITHOUT annotations is not exempt request-side.
func TestDiffFields_RequestSideFlagsUnannotatedLegacyName(t *testing.T) {
	shape := &schemaShape{Fields: map[string]fieldShape{
		"name":    {Name: "name", Type: "string"},
		"user_id": {Name: "user_id", Type: "string", DBBacked: false},
	}}
	info := &goTypeInfo{Fields: map[string]string{"name": "string"}}

	diffs := diffFields(shape, info, true)
	if len(diffs) != 1 || diffs[0].FieldName != "user_id" {
		t.Errorf("expected user_id missing-field diff, got %+v", diffs)
	}
}

// buildSchemaShape populates DBBacked from property annotations, checking
// both $ref-sibling extensions and resolved-target extensions.
func TestBuildSchemaShape_PopulatesDBBacked(t *testing.T) {
	dbTags := map[string]any{"x-oapi-codegen-extra-tags": map[string]any{"db": "user_id"}}
	ref := &openapi3.SchemaRef{
		Value: &openapi3.Schema{
			Type: &openapi3.Types{"object"},
			Properties: openapi3.Schemas{
				"user_id":  {Extensions: dbTags, Value: &openapi3.Schema{Type: &openapi3.Types{"string"}}},
				"nickname": {Value: &openapi3.Schema{Type: &openapi3.Types{"string"}}},
			},
		},
	}
	shape := buildSchemaShape(ref)
	if shape == nil {
		t.Fatal("expected non-nil shape")
	}
	if !shape.Fields["user_id"].DBBacked {
		t.Error("expected user_id to be DBBacked")
	}
	if shape.Fields["nickname"].DBBacked {
		t.Error("expected nickname to not be DBBacked")
	}
}

// A consumer request struct field absent from the schema shape is reported
// unless it is server-generated: without a schema property there is no
// annotation to consult, so the old hardcoded DB-name exemption is gone.
func TestDiffFields_ExtraConsumerFieldNeedsAnnotation(t *testing.T) {
	shape := &schemaShape{Fields: map[string]fieldShape{
		"name": {Name: "name", Type: "string"},
	}}
	info := &goTypeInfo{Fields: map[string]string{
		"name":    "string",
		"user_id": "string",
	}}

	diffs := diffFields(shape, info, true)
	found := false
	for _, d := range diffs {
		if d.FieldName == "user_id" && !d.InSchema && d.InConsumer {
			found = true
		}
	}
	if !found {
		t.Errorf("expected extra-field diff for unannotated user_id, got %+v", diffs)
	}

	// Server-generated names remain exempt.
	info2 := &goTypeInfo{Fields: map[string]string{"name": "string", "created_at": "string"}}
	if diffs := diffFields(shape, info2, true); len(diffs) != 0 {
		t.Errorf("expected no diffs for server-generated extra field, got %+v", diffs)
	}
}
