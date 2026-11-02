package validation

import (
	"os"
	"path/filepath"
	"reflect"
	"strings"
	"testing"
)

// A content edit closes the item's open request as superseded, and a superseded
// request is final: approveRequest and denyRequest answer 409 on it. These tests
// pin the enum value, the descriptions a reader and a generated client see, and
// the 409 that refuses a decision. See docs/request-contract.md, "Superseded
// requests".

// flatDescription returns a description with its whitespace collapsed, so a
// phrase can be matched across the line breaks of a folded YAML scalar.
func flatDescription(t *testing.T, node any, path ...string) string {
	t.Helper()
	s, ok := mustLookup(t, node, path...).(string)
	if !ok {
		t.Fatalf("%v is not a string", path)
	}
	return strings.Join(strings.Fields(s), " ")
}

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

	statusDesc := flatDescription(t, status, "description")
	for _, want := range []string{"`superseded` when a content edit or a delete changes the subject before a decision", "closed with `decidedAt` set", "no `decidedBy` and no note", "Each of `approved`, `denied` and `superseded` is final"} {
		if !strings.Contains(statusDesc, want) {
			t.Errorf("RequestStatus description must say %q", want)
		}
	}

	// The entity's status, decidedBy, decidedAt and note describe a superseded request.
	for path, want := range map[string]string{
		"status":    "`superseded` when a content edit or a delete closes it first",
		"decidedBy": "and when it is superseded, since no user decided it",
		"decidedAt": "or superseded by a content edit or a delete",
		"note":      "when it is superseded",
	} {
		desc := flatDescription(t, entity, "properties", path, "description")
		if !strings.Contains(desc, want) {
			t.Errorf("Request.%s description must say %q", path, want)
		}
	}
	if got := mustLookup(t, entity, "properties", "status", "$ref"); got != "./api.yml#/components/schemas/RequestStatus" {
		t.Errorf("Request.status must reference RequestStatus, got %v", got)
	}

	// approveRequest and denyRequest answer 409 on a superseded request, and the
	// shared 409 names it.
	for _, op := range []string{"approve", "deny"} {
		desc := flatDescription(t, api, "paths", "/api/requests/{requestId}/"+op, "post", "description")
		if !strings.Contains(desc, "a `superseded` one") {
			t.Errorf("%s description must say a superseded request answers 409 and changes nothing", op)
		}
	}
	conflict := flatDescription(t, api, "components", "responses", "409", "description")
	if !strings.Contains(conflict, "already decided or superseded") {
		t.Errorf("the request 409 must name a superseded request, got %q", conflict)
	}

	// The status filter takes the new value.
	filter := flatDescription(t, api, "components", "parameters", "status", "description")
	if !strings.Contains(filter, "`superseded`") {
		t.Errorf("the status filter must name superseded, got %q", filter)
	}
}

// A soft-delete supersedes the item's open request in the delete transaction,
// as a content edit does, so the request is never pending on a deleted subject.
// The delete operation, the decisions that refuse a deleted subject and the
// contract doc must say the same thing.
func TestDeleteSupersedesOpenRequest(t *testing.T) {
	root := repoRootDir(t)
	content := loadOpenAPIDocument(t, filepath.Join(root, "schemas/constructs/v1beta3/content_item/api.yml"))
	request := loadOpenAPIDocument(t, filepath.Join(root, "schemas/constructs/v1beta3/request/api.yml"))

	del := flatDescription(t, mustLookup(t, content, "paths", "/api/content-items/{contentItemId}", "delete"), "description")
	for _, want := range []string{
		"closes that request as `superseded` in the same transaction",
		"`decidedAt` is set to the delete time",
		"no `decidedBy` and no `note` are set",
		"`approveRequest` and `denyRequest` on it then answer `409`",
	} {
		if !strings.Contains(del, want) {
			t.Errorf("deleteContentItem description must say %q", want)
		}
	}

	for _, op := range []string{"approve", "deny"} {
		desc := flatDescription(t, mustLookup(t, request, "paths", "/api/requests/{requestId}/"+op, "post"), "description")
		if !strings.Contains(desc, "A soft-deleted subject answers 409, because deleting it already superseded the request") {
			t.Errorf("%s description must say a soft-deleted subject answers 409 because the delete superseded the request", op)
		}
	}

	doc, err := os.ReadFile(filepath.Join(root, "docs/request-contract.md"))
	if err != nil {
		t.Fatal(err)
	}
	flat := strings.Join(strings.Fields(string(doc)), " ")
	for _, want := range []string{
		"A soft-delete of the subject supersedes the request the same way, in the same",
		"no new request opens, because the item is gone",
		"A soft-deleted subject answers `409` because the delete closed its request as",
	} {
		if !strings.Contains(flat, want) {
			t.Errorf("docs/request-contract.md must say %q", want)
		}
	}
}

