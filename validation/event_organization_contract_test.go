package validation

import (
	"path/filepath"
	"reflect"
	"strings"
	"testing"
)

// Event.organizationId is server-assigned. The list projection (EventResult)
// carries it read-only so organization-scope listings show each row's tenant.
func TestEventOrganizationIDIsServerAssigned(t *testing.T) {
	root := repoRootDir(t)
	doc := loadOpenAPIDocument(t, filepath.Join(root, "schemas/constructs/v1beta3/event/api.yml"))
	event := mustLookup(t, doc, "components", "schemas", "Event")

	if got := sequenceStrings(mustValue(event, "required")); !containsString(got, "organizationId") {
		t.Errorf("Event.required = %v, want organizationId", got)
	}

	prop := mustLookup(t, event, "properties", "organizationId")
	orgDesc, _ := mustValue(prop, "description").(string)
	for _, phrase := range []string{"organization the event belongs to", "provider organization", "Never accepted from clients"} {
		if !strings.Contains(orgDesc, phrase) {
			t.Errorf("Event.organizationId description = %q, want it to mention %q", orgDesc, phrase)
		}
	}
	if got := mustValue(prop, "$ref"); got != "../../v1beta2/core/api.yml#/components/schemas/Uuid" {
		t.Errorf("Event.organizationId $ref = %v, want the v1beta2 Uuid schema", got)
	}
	if got := mustValue(prop, "readOnly"); got != true {
		t.Errorf("Event.organizationId readOnly = %v, want true", got)
	}
	if got := mustValue(prop, "x-go-name"); got != "OrganizationID" {
		t.Errorf("Event.organizationId x-go-name = %v, want OrganizationID", got)
	}
	if got := mustValue(prop, "x-go-type-skip-optional-pointer"); got != true {
		t.Errorf("Event.organizationId x-go-type-skip-optional-pointer = %v, want true", got)
	}
	tags := mustLookup(t, prop, "x-oapi-codegen-extra-tags")
	if got := mustValue(tags, "db"); got != "organization_id" {
		t.Errorf("Event.organizationId db = %v, want organization_id", got)
	}
	if got := mustValue(tags, "json"); got != "organizationId" {
		t.Errorf("Event.organizationId json = %v, want organizationId", got)
	}
	ownerOrder, ok := asInt(mustLookup(t, event, "properties", "owner", "x-order"))
	orgOrder, okOrg := asInt(mustValue(prop, "x-order"))
	if !ok || !okOrg || orgOrder != ownerOrder+1 {
		t.Errorf("Event.organizationId x-order = %v, owner x-order = %v, want organizationId immediately after owner", orgOrder, ownerOrder)
	}

	payload := mustLookup(t, doc, "components", "schemas", "EventPayload", "properties")
	if _, has := mappingValue(payload, "organizationId"); has {
		t.Errorf("EventPayload must not accept organizationId")
	}
	for _, schema := range []string{"UpdateEventStatusRequest", "BulkDeleteRequest", "BulkUpdateStatusRequest"} {
		props := mustLookup(t, doc, "components", "schemas", schema, "properties")
		if _, has := mappingValue(props, "organizationId"); has {
			t.Errorf("%s must not accept organizationId", schema)
		}
	}

	create := mustLookup(t, doc, "paths", "/api/events", "post")
	desc, _ := mustValue(create, "description").(string)
	if !strings.Contains(desc, "session") {
		t.Errorf("createEvent description = %q, want it to say the server assigns the organization from the session", desc)
	}
	if got := mustLookup(t, create, "requestBody", "content", "application/json", "schema", "$ref"); got != "#/components/schemas/EventPayload" {
		t.Errorf("createEvent requestBody = %v, want EventPayload", got)
	}

	result := loadOpenAPIDocument(t, filepath.Join(root, "schemas/constructs/v1beta3/event/event.yaml"))
	resultOrg, has := mappingValue(mustValue(result, "properties"), "organizationId")
	if !has {
		t.Fatalf("EventResult must carry organizationId so organization-scope listings show each row's tenant")
	}
	if got := mustValue(resultOrg, "readOnly"); got != true {
		t.Errorf("EventResult.organizationId readOnly = %v, want true", got)
	}
}

// getEvents defaults to the caller's own events and can list the session
// organization's events only for an organization administrator.
func TestGetEventsScope(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), "schemas/constructs/v1beta3/event/api.yml"))
	param := mustLookup(t, doc, "components", "parameters", "eventsScope")
	if got := mustValue(param, "name"); got != "scope" {
		t.Errorf("eventsScope name = %v, want scope", got)
	}
	if got := mustValue(param, "in"); got != "query" {
		t.Errorf("eventsScope in = %v, want query", got)
	}
	if got := mustValue(param, "required"); got != false {
		t.Errorf("eventsScope required = %v, want false", got)
	}
	schema := mustValue(param, "schema")
	if got := sequenceStrings(mustValue(schema, "enum")); !reflect.DeepEqual(got, []string{"user", "organization"}) {
		t.Errorf("eventsScope enum = %v, want [user organization]", got)
	}
	if got := mustValue(schema, "default"); got != "user" {
		t.Errorf("eventsScope default = %v, want user", got)
	}
	desc, _ := mustValue(param, "description").(string)
	for _, phrase := range []string{"user", "organization", "403"} {
		if !strings.Contains(desc, phrase) {
			t.Errorf("eventsScope description = %q, want it to mention %q", desc, phrase)
		}
	}

	op := mustLookup(t, doc, "paths", "/api/events/list", "get")
	if got := mustValue(op, "operationId"); got != "getEvents" {
		t.Fatalf("GET /api/events/list operationId = %v, want getEvents", got)
	}
	if !operationReferencesParameter(op, "#/components/parameters/eventsScope") {
		t.Errorf("getEvents must reference eventsScope")
	}
	if ref, _ := mappingValue(mustLookup(t, op, "responses", "403"), "$ref"); ref != "#/components/responses/MeshkitError403" {
		t.Errorf("getEvents 403 $ref = %v, want MeshkitError403", ref)
	}
}

func asInt(v any) (int, bool) {
	switch n := v.(type) {
	case int:
		return n, true
	case int64:
		return int(n), true
	case uint64:
		return int(n), true
	case float64:
		return int(n), true
	default:
		return 0, false
	}
}
