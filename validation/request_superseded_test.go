package validation

import (
	"path/filepath"
	"reflect"
	"testing"
)

// A content edit or a delete closes the item's open request as superseded, and a
// superseded request is final: approveRequest and denyRequest answer 409 on it.
// These tests pin the enum value, its references, and the declared 409 responses.
// See docs/request-contract.md, "Superseded requests".

func TestRequestStatusSuperseded(t *testing.T) {
	root := repoRootDir(t)
	dir := filepath.Join(root, "schemas/constructs/v1beta3/request")
	api := loadOpenAPIDocument(t, filepath.Join(dir, "api.yml"))
	entity := loadOpenAPIDocument(t, filepath.Join(dir, "request.yaml"))

	status := mustLookup(t, api, "components", "schemas", "RequestStatus")
	if got := anyStrings(mustValue(status, "enum")); !reflect.DeepEqual(got, []string{"pending", "approved", "denied", "superseded"}) {
		t.Errorf("RequestStatus enum = %v, want [pending approved denied superseded]", got)
	}
	if got := anyStrings(mustValue(status, "x-enum-varnames")); !reflect.DeepEqual(got, []string{"RequestStatusPending", "RequestStatusApproved", "RequestStatusDenied", "RequestStatusSuperseded"}) {
		t.Errorf("RequestStatus x-enum-varnames = %v, want the four status names", got)
	}
	if got := mustLookup(t, entity, "properties", "status", "$ref"); got != "./api.yml#/components/schemas/RequestStatus" {
		t.Errorf("Request.status must reference RequestStatus, got %v", got)
	}
	if got := mustLookup(t, api, "components", "parameters", "status", "schema", "$ref"); got != "#/components/schemas/RequestStatus" {
		t.Errorf("the status filter must reference RequestStatus, got %v", got)
	}
	for _, op := range []string{"approve", "deny"} {
		mustLookup(t, api, "paths", "/api/requests/{requestId}/"+op, "post", "responses", "409")
	}
}
