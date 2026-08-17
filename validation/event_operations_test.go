package validation

import (
	"fmt"
	"path/filepath"
	"sort"
	"strings"
	"testing"
)

// The event construct (Notification Center) carries ten operations across nine
// paths. Five are dual-client (cloud + meshery): the four mutations that modify
// event state and the create route. Five are cloud-only: the list, workspace-
// scoped, aggregate, summary, and types queries.
//
// Unlike the subscription construct, the event schema was defined in this
// repository before the routes were fully documented, so the main risk is not
// missing operations but schema drift: request bodies referencing the entity
// schema instead of a dedicated payload, or response-code declarations that
// do not match the server's behaviour.
//
// Authorization: the current schema declares no 403 on any event operation.
// Without access to meshery-cloud's router.go we cannot verify whether any
// event routes carry AuthorizationMiddlewareForOrgAdminAndOrgOwner. A follow-up
// should inspect the router registration and add 403 assertions where warranted.
// These tests pin the currently-declared contract so that any change to the
// response-code set is caught, even if the set turns out to be incomplete.

const (
	eventSpec = "schemas/constructs/v1beta3/event/api.yml"

	eventByIDPath       = "/api/events/{eventId}"
	eventBulkDeletePath = "/api/events/delete"
	eventBulkStatusPath = "/api/events/status"
	eventStatusByIDPath = "/api/events/{eventId}/status"
	eventWorkspacePath  = "/api/workspaces/{workspaceId}/events"
	eventsRootPath      = "/api/events"
	eventListPath       = "/api/events/list"
	eventSummaryPath    = "/api/events/summary"
	eventTypesPath      = "/api/events/types"

	eventPayloadSchemaName            = "EventPayload"
	bulkDeleteRequestSchemaName       = "BulkDeleteRequest"
	bulkUpdateStatusRequestSchemaName = "BulkUpdateStatusRequest"
	updateEventStatusRequestName      = "UpdateEventStatusRequest"
)

// eventOperations is every operation the event construct declares, keyed by the
// (path, method) pair the server registers.
var eventOperations = []struct {
	path        string
	method      string
	operationID string
	xInternal   string // expected x-internal rendered as a string, e.g. "[cloud meshery]" or "[cloud]"
}{
	{eventByIDPath, "delete", "deleteEvent", "[cloud meshery]"},
	{eventBulkDeletePath, "post", "bulkDeleteEvents", "[cloud meshery]"},
	{eventBulkStatusPath, "put", "bulkUpdateEventStatus", "[cloud meshery]"},
	{eventStatusByIDPath, "put", "updateEventStatus", "[cloud meshery]"},
	{eventWorkspacePath, "get", "getEventsOfWorkspace", "[cloud]"},
	{eventsRootPath, "get", "getEventsAggregate", "[cloud]"},
	{eventsRootPath, "post", "createEvent", "[cloud meshery]"},
	{eventListPath, "get", "getEvents", "[cloud]"},
	{eventSummaryPath, "get", "getEventSummaryByUser", "[cloud]"},
	{eventTypesPath, "get", "getEventTypes", "[cloud]"},
}

// eventMutationBodies maps every mutation operation to the schema its
// requestBody must reference and whether the requestBody is required.
var eventMutationBodies = []struct {
	path       string
	method     string
	schemaName string
	required   bool
}{
	{eventsRootPath, "post", eventPayloadSchemaName, true},
	{eventBulkDeletePath, "post", bulkDeleteRequestSchemaName, true},
	{eventBulkStatusPath, "put", bulkUpdateStatusRequestSchemaName, true},
	{eventStatusByIDPath, "put", updateEventStatusRequestName, true},
}

// eventResponseCodes is every operation paired with the response status codes
// its declaration must carry. This is the declared contract - tests pin it so
// any addition or removal is caught.
var eventResponseCodes = []struct {
	path        string
	method      string
	operationID string
	codes       []string
}{
	{eventByIDPath, "delete", "deleteEvent", []string{"204", "400", "401", "404", "500"}},
	{eventBulkDeletePath, "post", "bulkDeleteEvents", []string{"200", "400", "401", "500"}},
	{eventBulkStatusPath, "put", "bulkUpdateEventStatus", []string{"200", "400", "401", "500"}},
	{eventStatusByIDPath, "put", "updateEventStatus", []string{"200", "400", "401", "404", "500"}},
	{eventWorkspacePath, "get", "getEventsOfWorkspace", []string{"200", "400", "401", "404", "500"}},
	{eventsRootPath, "get", "getEventsAggregate", []string{"200", "401", "404", "500"}},
	{eventsRootPath, "post", "createEvent", []string{"201", "400", "401", "500"}},
	{eventListPath, "get", "getEvents", []string{"200", "401", "404", "500"}},
	{eventSummaryPath, "get", "getEventSummaryByUser", []string{"200", "401", "404", "500"}},
	{eventTypesPath, "get", "getEventTypes", []string{"200", "401", "404", "500"}},
}

// TestEventOperationsAreDeclared asserts that every operation in the event
// construct is declared in the spec with the correct operationId.
func TestEventOperationsAreDeclared(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), eventSpec))

	for _, op := range eventOperations {
		op := op
		t.Run(op.method+" "+op.path, func(t *testing.T) {
			operation, err := lookupPath(doc, "paths", op.path, op.method)
			if err != nil {
				t.Fatalf("%s %s is not declared: %v", op.method, op.path, err)
			}

			if got, _ := mappingValue(operation, "operationId"); got != op.operationID {
				t.Errorf("operationId = %v, want %q", got, op.operationID)
			}
		})
	}
}

// TestEventPathsAreDeclaredUnderTheApiPrefix guards the declared path itself.
// The declared path is the complete served path - nothing prepends `/api` at
// build time - and both meshery-cloud and meshery/meshery register event routes
// on authenticated groups that carry the /api prefix. A bare `/events/...`
// declaration would generate a client that 404s at runtime.
func TestEventPathsAreDeclaredUnderTheApiPrefix(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), eventSpec))

	// Deduplicate paths since multiple operations can share a path.
	seen := make(map[string]bool)
	for _, op := range eventOperations {
		if seen[op.path] {
			continue
		}
		seen[op.path] = true

		unprefixed := strings.TrimPrefix(op.path, "/api")
		if _, err := lookupPath(doc, "paths", unprefixed); err == nil {
			t.Errorf("%q is declared without the /api prefix; the served routes are "+
				"registered on the /api group, so the declared path must be %q",
				unprefixed, op.path)
		}
	}
}

// TestEventDualClientOperationsAreAnnotatedCorrectly asserts that x-internal
// is set correctly for every operation. Operations with [cloud, meshery] must
// appear in both RTK clients; [cloud]-only operations appear only in cloud.ts.
// Dropping one value silently removes the endpoint from the affected client on
// the next generation.
func TestEventDualClientOperationsAreAnnotatedCorrectly(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), eventSpec))

	for _, op := range eventOperations {
		op := op
		t.Run(op.operationID, func(t *testing.T) {
			operation, err := lookupPath(doc, "paths", op.path, op.method)
			if err != nil {
				t.Fatalf("%s %s is not declared: %v", op.method, op.path, err)
			}

			internal, present := mappingValue(operation, "x-internal")
			if !present {
				t.Fatal("x-internal is missing; the bundler rejects an operation without it")
			}

			got := fmt.Sprint(internal)
			if got != op.xInternal {
				t.Errorf("x-internal = %v, want %v", got, op.xInternal)
			}
		})
	}
}

// TestEventMutationsUseCorrectRequestBody proves that every mutation operation
// references its dedicated request schema - not the entity schema - and that
// the requestBody is marked as required.
func TestEventMutationsUseCorrectRequestBody(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), eventSpec))

	for _, mb := range eventMutationBodies {
		mb := mb
		t.Run(mb.method+" "+mb.path, func(t *testing.T) {
			schema, err := lookupPath(doc, "paths", mb.path, mb.method,
				"requestBody", "content", "application/json", "schema")
			if err != nil {
				t.Fatalf("locating the request body schema: %v", err)
			}

			want := "#/components/schemas/" + mb.schemaName
			if got, _ := mappingValue(schema, "$ref"); got != want {
				t.Errorf("requestBody schema $ref = %v, want %q", got, want)
			}

			required, err := lookupPath(doc, "paths", mb.path, mb.method, "requestBody", "required")
			if err != nil {
				t.Fatalf("locating requestBody required flag: %v", err)
			}
			if required != mb.required {
				t.Errorf("requestBody required = %v, want %v", required, mb.required)
			}

			// Assert the referenced schema actually exists in components.
			if _, err := lookupPath(doc, "components", "schemas", mb.schemaName); err != nil {
				t.Fatalf("%s is referenced by the request body but not defined: %v", mb.schemaName, err)
			}
		})
	}
}

// TestEventMutationsDoNotReferenceEntitySchema asserts that no mutation's
// requestBody references the entity schema (EventResult). Referencing the full
// entity would force clients to supply server-generated fields.
func TestEventMutationsDoNotReferenceEntitySchema(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), eventSpec))

	entityRef := "#/components/schemas/EventResult"

	for _, mb := range eventMutationBodies {
		mb := mb
		t.Run(mb.method+" "+mb.path, func(t *testing.T) {
			schema, err := lookupPath(doc, "paths", mb.path, mb.method,
				"requestBody", "content", "application/json", "schema")
			if err != nil {
				t.Fatalf("locating the request body schema: %v", err)
			}

			if got, _ := mappingValue(schema, "$ref"); got == entityRef {
				t.Errorf("requestBody schema $ref = %q, which is the entity schema; "+
					"mutations must reference a *Payload or dedicated request schema instead",
					entityRef)
			}
		})
	}
}

// TestEventPayloadProperties pins the EventPayload schema to exactly the set
// of fields the createEvent handler reads off the body. Any field the server
// ignores or pins should not appear here - advertising a write that never
// happens misleads consumers.
func TestEventPayloadProperties(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), eventSpec))

	properties, err := lookupPath(doc, "components", "schemas", eventPayloadSchemaName, "properties")
	if err != nil {
		t.Fatalf("locating %s properties: %v", eventPayloadSchemaName, err)
	}

	got := mappingKeys(properties)
	want := []string{"action", "category", "description", "owner"}
	sort.Strings(got)

	if strings.Join(got, ",") != strings.Join(want, ",") {
		t.Errorf("%s properties = %v, want exactly %v. "+
			"The payload is the set of fields createEvent reads off the body, nothing wider.",
			eventPayloadSchemaName, got, want)
	}
}

// TestEventEntitySchemaIsResponseOnly asserts that event.yaml (referenced as
// EventResult) has additionalProperties: false, which is required by the
// dual-schema pattern for entity schemas that describe server responses.
func TestEventEntitySchemaIsResponseOnly(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), eventSpec))

	// EventResult is a $ref to ./event.yaml. The YAML loader resolves it
	// inline if the file is read standalone, but for the purpose of this test
	// we check the entity schema directly since the api.yml's EventResult is
	// just a $ref wrapper.
	entityRef, err := lookupPath(doc, "components", "schemas", "EventResult")
	if err != nil {
		t.Fatalf("locating EventResult schema: %v", err)
	}

	// EventResult may be either the inlined schema or a $ref node. If it is
	// a $ref, load the referenced file directly.
	if ref, ok := mappingValue(entityRef, "$ref"); ok {
		refStr := fmt.Sprint(ref)
		// Accept any relative file reference, with or without a fragment.
		refFile := strings.TrimPrefix(strings.SplitN(refStr, "#", 2)[0], "./")
		if refFile != "" && !strings.HasPrefix(refFile, "/") {
			entityPath := filepath.Join(repoRootDir(t),
				"schemas/constructs/v1beta3/event", refFile)
			entityDoc := loadOpenAPIDocument(t, entityPath)

			ap, present := mappingValue(entityDoc, "additionalProperties")
			if !present {
				t.Fatalf("%s is missing additionalProperties; "+
					"entity schemas must have additionalProperties: false", refFile)
			}
			if ap != false {
				t.Errorf("%s additionalProperties = %v, want false", refFile, ap)
			}
			return
		}
		t.Fatalf("EventResult $ref = %q is not a resolvable relative file reference", refStr)
	}

	// Fallback: if the loader inlined the schema, check the node directly.
	ap, present := mappingValue(entityRef, "additionalProperties")
	if !present {
		t.Fatal("EventResult schema is missing additionalProperties; " +
			"entity schemas must have additionalProperties: false")
	}
	if ap != false {
		t.Errorf("EventResult additionalProperties = %v, want false", ap)
	}
}

// TestEventResponseCodes pins the response status codes declared on each event
// operation. This catches both missing codes (a denial the server produces but
// the schema does not declare) and extra codes (a declaration for a response
// the server never writes). The table covers all ten operations.
func TestEventResponseCodes(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), eventSpec))

	for _, op := range eventResponseCodes {
		op := op
		t.Run(op.operationID, func(t *testing.T) {
			responses, err := lookupPath(doc, "paths", op.path, op.method, "responses")
			if err != nil {
				t.Fatalf("locating responses for %s %s: %v", op.method, op.path, err)
			}

			// Collect the declared response codes.
			got := mappingKeys(responses)
			sort.Strings(got)

			want := make([]string, len(op.codes))
			copy(want, op.codes)
			sort.Strings(want)

			if strings.Join(got, ",") != strings.Join(want, ",") {
				t.Errorf("response codes = %v, want %v", got, want)
			}
		})
	}
}
