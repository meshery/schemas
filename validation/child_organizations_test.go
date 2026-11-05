package validation

import (
	"fmt"
	"path/filepath"
	"sort"
	"strings"
	"testing"
)

// Hierarchical organizations (layer5io/meshery-cloud#3659) add one nullable
// parent_id to the organization record and two routes under the parent:
//
//   - `GET  /api/identity/orgs/{orgId}/children` lists the parent's live direct
//     children through a dedicated `ChildOrganization` projection.
//   - `POST /api/identity/orgs/{orgId}/children` creates a child whose parent is
//     the path organization, from the same `OrganizationPayload` the flat create
//     accepts.
//
// The contract is settled in meshery-cloud
// `docs/plans/2026-09-25-hierarchical-organizations-implementation.md` §4-§6 and
// restated for this repository in `docs/organization-hierarchy-contract.md`.
// Three parts of it are easy to erode by accident, so these tests pin them:
//
//   - The child listing must not reuse `OrganizationsPage` or
//     `AvailableOrganization`. Those rows carry `owner` and `metadata` (and the
//     server's `changeToOrgPage` adds `inviteId`, an organization's join code),
//     and every holder of View Organizations in the parent can read this list.
//     `ChildOrganization` is therefore closed (`additionalProperties: false`)
//     and carries exactly the columns the list query selects, plus the parent id.
//   - The parent is the path, never the body. `OrganizationPayload` must not
//     grow a `parentId`, because `PUT /api/identity/orgs/{orgId}` shares that
//     payload and reparenting after create is out of the contract.
//   - The public organization read must not grow `parentId` either: an
//     organization id in that response is already a disclosure boundary, and a
//     parent id would name a second organization the caller did not ask for.

const (
	organizationSpec        = "schemas/constructs/v1beta2/organization/api.yml"
	organizationEntityPath  = "schemas/constructs/v1beta2/organization/organization.yaml"
	childOrganizationsPath  = "/api/identity/orgs/{orgId}/children"
	childOrganizationSchema = "ChildOrganization"
	childOrganizationsPage  = "ChildOrganizationsPage"
	organizationPayloadName = "OrganizationPayload"
	organizationPageName    = "OrganizationPage"
)

// childOrganizationFields is the closed property set of the projection: the
// eight columns the list query selects, plus the parent id the route is keyed
// on. Anything else on the row is a leak to every viewer of the parent.
var childOrganizationFields = []string{
	"id", "name", "description", "country", "region", "domain",
	"parentId", "createdAt", "updatedAt",
}

// childOrganizationForbiddenFields are the organization fields the plan names
// as the reason the listing cannot reuse the existing page types.
var childOrganizationForbiddenFields = []string{"owner", "metadata", "inviteId", "deletedAt"}

func TestChildOrganizationOperationsAreDeclared(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), organizationSpec))

	for _, op := range []struct {
		method      string
		operationID string
		successCode string
		successRef  string
	}{
		{"get", "getChildOrgs", "200", "#/components/schemas/" + childOrganizationsPage},
		{"post", "createChildOrg", "201", "#/components/schemas/" + organizationPageName},
	} {
		op := op
		t.Run(op.method+" "+childOrganizationsPath, func(t *testing.T) {
			operation, err := lookupPath(doc, "paths", childOrganizationsPath, op.method)
			if err != nil {
				t.Fatalf("%s %s is not declared: %v", op.method, childOrganizationsPath, err)
			}

			if got, _ := mappingValue(operation, "operationId"); got != op.operationID {
				t.Errorf("operationId = %v, want %q", got, op.operationID)
			}

			// The sibling operations on /api/identity/orgs/{orgId} are served by
			// both consumers; the child routes sit beside them and must be too,
			// or one bundled output silently loses the route.
			internal, present := mappingValue(operation, "x-internal")
			if !present {
				t.Error("x-internal is missing; the bundler rejects an operation without it")
			} else if got := fmt.Sprint(internal); got != "[cloud meshery]" {
				t.Errorf("x-internal = %v, want [cloud meshery] (the same marker the sibling organization operations carry)", got)
			}

			security, present := mappingValue(operation, "security")
			if !present {
				t.Error("security is missing; the route sits behind the authenticated /api group")
			} else if !securityRequires(security, "jwt") {
				t.Errorf("security = %v, want a requirement naming the jwt scheme", security)
			}

			if !operationHasTag(operation, "Organizations") {
				t.Error("operation is not tagged Organizations; the published docs group it under the construct's tag")
			}

			if !operationReferencesParameter(operation, "#/components/parameters/orgId") {
				t.Error("operation does not take the shared orgId path parameter")
			}

			success, err := lookupPath(doc, "paths", childOrganizationsPath, op.method,
				"responses", op.successCode, "content", "application/json", "schema")
			if err != nil {
				t.Fatalf("locating the %s response schema: %v", op.successCode, err)
			}
			if got, _ := mappingValue(success, "$ref"); got != op.successRef {
				t.Errorf("%s response schema $ref = %v, want %q", op.successCode, got, op.successRef)
			}

			// 403 is the permission-key denial evaluated in the parent, 404 the
			// missing or soft-deleted parent; both are reachable on both routes.
			for _, code := range []string{"401", "403", "404", "500"} {
				if _, err := lookupPath(doc, "paths", childOrganizationsPath, op.method, "responses", code); err != nil {
					t.Errorf("response %s is not declared: %v", code, err)
				}
			}
		})
	}
}

// TestCreateChildOrgTakesTheParentFromThePath pins that the create route reuses
// the flat organization payload unchanged, and that the payload itself has no
// parentId. The parent is the path organization; a parentId in the body is
// ignored by the server, and advertising one would invite clients to set it on
// the shared PUT and expect a reparent.
func TestCreateChildOrgTakesTheParentFromThePath(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), organizationSpec))

	body, err := lookupPath(doc, "paths", childOrganizationsPath, "post", "requestBody")
	if err != nil {
		t.Fatalf("locating the create requestBody: %v", err)
	}
	if got, _ := mappingValue(body, "$ref"); got != "#/components/requestBodies/organizationPayload" {
		t.Errorf("requestBody $ref = %v, want the shared organizationPayload request body", got)
	}

	schema, err := lookupPath(doc, "components", "requestBodies", "organizationPayload",
		"content", "application/json", "schema")
	if err != nil {
		t.Fatalf("locating the organizationPayload schema: %v", err)
	}
	if got, _ := mappingValue(schema, "$ref"); got != "#/components/schemas/"+organizationPayloadName {
		t.Errorf("organizationPayload schema $ref = %v, want %s", got, organizationPayloadName)
	}

	if _, err := lookupPath(doc, "components", "schemas", organizationPayloadName, "properties", "parentId"); err == nil {
		t.Errorf("%s declares parentId; the parent is the path of POST %s and is not client-settable on create or update",
			organizationPayloadName, childOrganizationsPath)
	}

	if _, err := lookupPath(doc, "paths", childOrganizationsPath, "post", "responses", "400"); err != nil {
		t.Errorf("400 is not declared, but an empty name is refused before insert: %v", err)
	}
}

// TestGetChildOrgsUsesTheSharedPageParameters pins the pagination surface to
// the construct's shared page and pageSize parameters. The plan names them
// `page` and `pagesize`; on the wire this API version publishes camelCase, and
// the shared parameter is already `pageSize`. A locally declared `pagesize`
// would be a partial casing migration within a published version.
func TestGetChildOrgsUsesTheSharedPageParameters(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), organizationSpec))

	operation, err := lookupPath(doc, "paths", childOrganizationsPath, "get")
	if err != nil {
		t.Fatalf("locating GET %s: %v", childOrganizationsPath, err)
	}

	for _, ref := range []string{"#/components/parameters/page", "#/components/parameters/pageSize"} {
		if !operationReferencesParameter(operation, ref) {
			t.Errorf("GET %s does not reference %s", childOrganizationsPath, ref)
		}
	}

	parameters, _ := mappingValue(operation, "parameters")
	list, _ := parameters.([]any)
	for _, p := range list {
		if name, present := mappingValue(p, "name"); present {
			t.Errorf("GET %s declares an inline parameter %v; use the construct's shared parameters so the wire casing stays uniform",
				childOrganizationsPath, name)
		}
	}
}

// TestChildOrganizationProjectionIsClosed pins the projection to exactly the
// columns the list query selects plus parentId, and keeps the four fields the
// plan names as the reason the listing cannot reuse AvailableOrganization off it.
func TestChildOrganizationProjectionIsClosed(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), organizationSpec))

	schema, err := lookupPath(doc, "components", "schemas", childOrganizationSchema)
	if err != nil {
		t.Fatalf("locating %s: %v", childOrganizationSchema, err)
	}

	if closed, _ := mappingValue(schema, "additionalProperties"); closed != false {
		t.Errorf("%s.additionalProperties = %v, want false; an open projection can pick up owner or metadata without failing any check",
			childOrganizationSchema, closed)
	}

	properties, err := lookupPath(doc, "components", "schemas", childOrganizationSchema, "properties")
	if err != nil {
		t.Fatalf("locating %s.properties: %v", childOrganizationSchema, err)
	}
	got := mappingKeys(properties)
	want := append([]string(nil), childOrganizationFields...)
	sort.Strings(got)
	sort.Strings(want)
	if strings.Join(got, ",") != strings.Join(want, ",") {
		t.Errorf("%s properties = %v, want exactly %v", childOrganizationSchema, got, want)
	}

	for _, field := range childOrganizationForbiddenFields {
		if _, present := mappingValue(properties, field); present {
			t.Errorf("%s carries %q; the child listing is readable by every holder of View Organizations in the parent and must not expose it",
				childOrganizationSchema, field)
		}
	}

	parent, err := lookupPath(doc, "components", "schemas", childOrganizationSchema, "properties", "parentId")
	if err != nil {
		t.Fatalf("locating %s.parentId: %v", childOrganizationSchema, err)
	}
	if got, _ := mappingValue(parent, "$ref"); got != "#/components/schemas/UUID" {
		t.Errorf("%s.parentId $ref = %v, want the shared UUID schema", childOrganizationSchema, got)
	}

	required, _ := mappingValue(schema, "required")
	for _, r := range sequenceStrings(required) {
		if r == "parentId" {
			t.Errorf("%s requires parentId; the plan declares it optional on the wire", childOrganizationSchema)
		}
	}
}

// TestChildOrganizationsPageIsNotTheOrganizationsPage pins the wrapper to the
// two keys the handler writes - organizations and totalCount - with the child
// projection as the row type.
func TestChildOrganizationsPageIsNotTheOrganizationsPage(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), organizationSpec))

	properties, err := lookupPath(doc, "components", "schemas", childOrganizationsPage, "properties")
	if err != nil {
		t.Fatalf("locating %s.properties: %v", childOrganizationsPage, err)
	}
	got := mappingKeys(properties)
	sort.Strings(got)
	if strings.Join(got, ",") != "organizations,totalCount" {
		t.Errorf("%s properties = %v, want exactly [organizations totalCount]", childOrganizationsPage, got)
	}

	items, err := lookupPath(doc, "components", "schemas", childOrganizationsPage, "properties", "organizations", "items")
	if err != nil {
		t.Fatalf("locating %s.organizations.items: %v", childOrganizationsPage, err)
	}
	if ref, _ := mappingValue(items, "$ref"); ref != "#/components/schemas/"+childOrganizationSchema {
		t.Errorf("%s.organizations.items $ref = %v, want %s (not AvailableOrganization)",
			childOrganizationsPage, ref, childOrganizationSchema)
	}

	schema, _ := lookupPath(doc, "components", "schemas", childOrganizationsPage)
	required := sequenceStrings(mustValue(schema, "required"))
	sort.Strings(required)
	if strings.Join(required, ",") != "organizations,totalCount" {
		t.Errorf("%s required = %v, want both organizations and totalCount; an empty page is still a page", childOrganizationsPage, required)
	}
}

// TestPublicOrganizationReadDoesNotExposeParent pins the plan's disclosure rule:
// the entity returned by GET /api/identity/orgs/{orgId} and the listing row do
// not grow parentId. The parent is only ever visible from the parent's side,
// through the children route, to a caller who holds View Organizations there.
func TestPublicOrganizationReadDoesNotExposeParent(t *testing.T) {
	root := repoRootDir(t)

	entity, err := loadYAMLDoc(filepath.Join(root, organizationEntityPath))
	if err != nil {
		t.Fatalf("loading %s: %v", organizationEntityPath, err)
	}
	if _, err := lookupPath(entity, "properties", "parentId"); err == nil {
		t.Errorf("Organization entity declares parentId; the public organization read must not name a second organization the caller did not ask for")
	}

	doc := loadOpenAPIDocument(t, filepath.Join(root, organizationSpec))
	if _, err := lookupPath(doc, "components", "schemas", "AvailableOrganization", "properties", "parentId"); err == nil {
		t.Errorf("AvailableOrganization declares parentId; the membership listing is not a tree and must not start returning parents")
	}
}

// TestDeleteOrgDeclaresTheLiveChildrenConflict pins the delete guard: a parent
// that still has live children is refused with 409 and nothing is deleted.
// Children are neither reparented nor cascade-deleted.
func TestDeleteOrgDeclaresTheLiveChildrenConflict(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), organizationSpec))

	if _, err := lookupPath(doc, "paths", "/api/identity/orgs/{orgId}", "delete", "responses", "409"); err != nil {
		t.Errorf("deleteOrg does not declare 409, but a parent with live children is refused and not deleted: %v", err)
	}
}

// operationHasTag reports whether the operation's tags sequence names tag.
func operationHasTag(operation any, tag string) bool {
	tags, _ := mappingValue(operation, "tags")
	for _, got := range sequenceStrings(tags) {
		if got == tag {
			return true
		}
	}
	return false
}

// operationReferencesParameter reports whether the operation's parameters
// sequence contains an entry whose $ref is ref.
func operationReferencesParameter(operation any, ref string) bool {
	parameters, _ := mappingValue(operation, "parameters")
	list, _ := parameters.([]any)
	for _, p := range list {
		if got, _ := mappingValue(p, "$ref"); got == ref {
			return true
		}
	}
	return false
}

// sequenceStrings returns the string entries of a decoded YAML sequence, or nil
// when the node is not a sequence.
func sequenceStrings(node any) []string {
	list, _ := node.([]any)
	out := make([]string, 0, len(list))
	for _, item := range list {
		if s, ok := item.(string); ok {
			out = append(out, s)
		}
	}
	return out
}

// mustValue returns the mapping value for key, or nil when absent; it exists so
// a lookup can be inlined where absence is reported by the caller's assertion.
func mustValue(node any, key string) any {
	value, _ := mappingValue(node, key)
	return value
}
