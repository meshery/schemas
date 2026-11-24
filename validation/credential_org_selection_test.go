package validation

import (
	"fmt"
	"path/filepath"
	"strings"
	"testing"
)

// getUserCredentials lists credentials in the acting organization, so it
// declares the X-Current-Orgid selector and the 403, 404 and 409 answers that
// getConnections declares. The 409 is the shared OrganizationSelectionRequired
// response, aliased from v1beta2/core.
func TestGetUserCredentialsDeclaresOrganizationSelection(t *testing.T) {
	root := repoRootDir(t)
	doc := loadOpenAPIDocument(t, filepath.Join(root, "schemas/constructs/v1beta2/credential/api.yml"))

	get := mustLookup(t, doc, "paths", "/api/integrations/credentials", "get")
	if got := mustValue(get, "operationId"); got != "getUserCredentials" {
		t.Fatalf("operationId = %v, want getUserCredentials", got)
	}

	hasOrgParam := false
	params, _ := mustValue(get, "parameters").([]any)
	for _, p := range params {
		if ref, ok := mappingValue(p, "$ref"); ok && ref == "#/components/parameters/currentOrgId" {
			hasOrgParam = true
		}
	}
	if !hasOrgParam {
		t.Error("getUserCredentials must take the currentOrgId parameter")
	}
	alias := fmt.Sprint(mustLookup(t, doc, "components", "parameters", "currentOrgId", "$ref"))
	if !strings.HasSuffix(alias, "core/api.yml#/components/parameters/currentOrgId") {
		t.Errorf("currentOrgId alias $ref = %v, want the v1beta2/core parameter", alias)
	}

	responses := mustLookup(t, get, "responses")
	for _, code := range []string{"200", "401", "403", "404", "409", "500"} {
		if _, ok := mappingValue(responses, code); !ok {
			t.Errorf("getUserCredentials must document a %s response", code)
		}
	}
	if ref := mustLookup(t, get, "responses", "409", "$ref"); ref != "#/components/responses/OrganizationSelectionRequired" {
		t.Errorf("409 $ref = %v, want OrganizationSelectionRequired", ref)
	}
	sel := fmt.Sprint(mustLookup(t, doc, "components", "responses", "OrganizationSelectionRequired", "$ref"))
	if !strings.HasSuffix(sel, "v1beta2/core/api.yml#/components/responses/OrganizationSelectionRequired") {
		t.Errorf("OrganizationSelectionRequired alias $ref = %v, want the v1beta2/core response", sel)
	}
}
