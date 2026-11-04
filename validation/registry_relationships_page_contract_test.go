package validation

import (
	"path/filepath"
	"slices"
	"testing"

	"github.com/getkin/kin-openapi/openapi3"
)

// RegistryRelationshipsPage in v1beta1/registry/api.yml is the 200 body of
// GET /api/registry/relationships, GET /api/registry/models/{model}/relationships
// and GET /api/registry/models/{model}/relationships/{name}. Meshery registers
// those routes in server/router/server.go to GetAllMeshmodelRelationships and
// GetMeshmodelRelationshipByName (server/handlers/relationship_handlers.go),
// and meshkit's RelationshipFilter.Get builds every entry as a v1alpha3
// relationship.RelationshipDefinition.
//
// The items $ref used to name the whole v1alpha3 relationship.yaml file. That
// file is an OpenAPI document, so each item's schema was the document itself:
// the generated TypeScript typed `relationships` as unknown[] and the bundled
// spec carried `openapi`, `info`, `paths` and `components` inside a schema
// (meshery/schemas#1304). These tests pin each item to RelationshipDefinition.

const (
	registrySpecPath = "schemas/constructs/v1beta1/registry/api.yml"

	registryRelationshipItemRef = "../../v1alpha3/relationship/relationship.yaml#/components/schemas/RelationshipDefinition"

	// registryRelationshipOldRef is the whole-document ref this file used to
	// carry. Rule 48 must keep flagging it.
	registryRelationshipOldRef = "../../v1alpha3/relationship/relationship.yaml"
)

// TestRegistryRelationshipsPageItemsRefRelationshipDefinition checks the $ref
// as written in api.yml.
func TestRegistryRelationshipsPageItemsRefRelationshipDefinition(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), registrySpecPath))

	allOf, err := lookupPath(doc, "components", "schemas", "RegistryRelationshipsPage", "allOf")
	if err != nil {
		t.Fatalf("locating RegistryRelationshipsPage.allOf: %v", err)
	}
	branches, ok := allOf.([]any)
	if !ok {
		t.Fatalf("RegistryRelationshipsPage.allOf is %T, want a list", allOf)
	}

	var items any
	for _, branch := range branches {
		if props, ok := mappingValue(branch, "properties"); ok {
			if rel, ok := mappingValue(props, "relationships"); ok {
				items, _ = mappingValue(rel, "items")
			}
		}
	}
	if items == nil {
		t.Fatal("RegistryRelationshipsPage has no relationships.items")
	}

	ref, _ := mappingValue(items, "$ref")
	if ref != registryRelationshipItemRef {
		t.Errorf("RegistryRelationshipsPage.relationships.items.$ref = %v, want %q", ref, registryRelationshipItemRef)
	}
}

// TestRegistryRelationshipsPageItemsResolveToRelationshipDefinition checks the
// item schema after the code generators' loader resolves every $ref.
func TestRegistryRelationshipsPageItemsResolveToRelationshipDefinition(t *testing.T) {
	spec := mustLoadAPISpec(t, registrySpecPath)

	page := spec.Components.Schemas["RegistryRelationshipsPage"]
	if page == nil || page.Value == nil {
		t.Fatal("RegistryRelationshipsPage is not defined")
	}

	var relationships *openapi3.SchemaRef
	for _, branch := range page.Value.AllOf {
		if branch != nil && branch.Value != nil && branch.Value.Properties["relationships"] != nil {
			relationships = branch.Value.Properties["relationships"]
		}
	}
	if relationships == nil || relationships.Value == nil {
		t.Fatal("RegistryRelationshipsPage has no relationships property")
	}

	items := relationships.Value.Items
	if items == nil || items.Value == nil {
		t.Fatal("RegistryRelationshipsPage.relationships has no resolved items schema")
	}

	// The keys of an OpenAPI document must never appear inside a schema.
	for _, key := range []string{"openapi", "info", "paths", "components"} {
		if _, found := items.Value.Extensions[key]; found {
			t.Errorf("relationships.items carries the OpenAPI document key %q; it must resolve to one schema", key)
		}
	}

	// RelationshipDefinition's required fields: each must be defined and stay
	// required, so generated clients do not type it as optional.
	for _, prop := range []string{"id", "schemaVersion", "version", "model", "kind", "type", "subType"} {
		if items.Value.Properties[prop] == nil {
			t.Errorf("relationships.items has no %q property; want the v1alpha3 RelationshipDefinition", prop)
		}
		if !slices.Contains(items.Value.Required, prop) {
			t.Errorf("relationships.items does not require %q; want the v1alpha3 RelationshipDefinition required list", prop)
		}
	}
}

// TestRule48OnRegistrySpec runs Rule 48 against the real registry api.yml: the
// file as committed is clean, and the old whole-document ref is still caught.
func TestRule48OnRegistrySpec(t *testing.T) {
	specPath := filepath.Join(repoRootDir(t), registrySpecPath)

	if vs := checkRule48(registrySpecPath, specPath, loadOpenAPIDocument(t, specPath)); len(vs) != 0 {
		t.Errorf("Rule 48 should pass on %s, got %+v", registrySpecPath, vs)
	}

	old := map[string]any{"items": map[string]any{"$ref": registryRelationshipOldRef}}
	if vs := checkRule48(registrySpecPath, specPath, old); len(vs) != 1 {
		t.Errorf("Rule 48 should flag the old ref %q once, got %+v", registryRelationshipOldRef, vs)
	}
}
