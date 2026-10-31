package validation

import (
	"path/filepath"
	"testing"
)

// getOrgs answers an empty result as 200 with the OrganizationsPage envelope
// and an empty organizations array. A bodiless 204 would make "you belong to
// no organizations" indistinguishable from a failed fetch, and the provider
// never emits one, so the operation must not declare it (#1153;
// schema-review-checklist Common Mistake 35).
func TestGetOrgsDeclaresNoBodiless204(t *testing.T) {
	doc, err := loadAPISpec(filepath.Join(repoRootDir(t), organizationSpec))
	if err != nil {
		t.Fatalf("load %s: %v", organizationSpec, err)
	}
	item := doc.Paths.Find("/api/identity/orgs")
	if item == nil || item.Get == nil {
		t.Fatal("GET /api/identity/orgs is not declared")
	}
	op := item.Get
	if op.OperationID != "getOrgs" {
		t.Errorf("operationId = %q, want getOrgs", op.OperationID)
	}
	if op.Responses.Status(204) != nil {
		t.Error("getOrgs declares 204; an empty result is a 200 with an empty organizations array")
	}

	page := doc.Components.Schemas["OrganizationsPage"]
	if page == nil || page.Value == nil {
		t.Fatal("components.schemas.OrganizationsPage is not declared")
	}
	ok := op.Responses.Status(200)
	if ok == nil || ok.Value == nil {
		t.Fatal("getOrgs declares no 200 response")
	}
	media := ok.Value.Content.Get("application/json")
	if media == nil || media.Schema == nil {
		t.Fatal("getOrgs 200 declares no application/json schema")
	}
	if media.Schema.Value != page.Value {
		t.Error("getOrgs 200 does not resolve to OrganizationsPage")
	}

	empty := map[string]any{"organizations": []any{}, "page": 0, "pageSize": 10, "totalCount": 0}
	if err := page.Value.VisitJSON(empty); err != nil {
		t.Errorf("empty OrganizationsPage %v rejected: %v", empty, err)
	}
}
