package validation

import (
	"reflect"
	"slices"
	"strings"
	"testing"
)

// Condition correlation, CloudEvents-compatible fields and W3C trace context
// on the v1beta3 event (meshery/schemas#1334, meshery/meshery#20879). The
// prose form is docs/event-correlation-contract.md.

const eventEntity = "schemas/constructs/v1beta3/event/event.yaml"

// eventCorrelationFields are the fields this contract adds, with the
// database column each is stored in.
var eventCorrelationFields = []string{
	"correlationKey", "occurrenceCount", "firstSeenAt", "lastSeenAt", "resolvedAt",
	"source", "type", "specversion", "traceId", "parentId",
}

var eventCorrelationColumns = map[string]string{
	"correlationKey":  "correlation_key",
	"occurrenceCount": "occurrence_count",
	"firstSeenAt":     "first_seen_at",
	"lastSeenAt":      "last_seen_at",
	"resolvedAt":      "resolved_at",
	"source":          "source",
	"type":            "type",
	"specversion":     "specversion",
	"traceId":         "trace_id",
	"parentId":        "parent_id",
}

// eventShapes are the three places a client meets the fields: the create
// payload, the recorded event, and the list item.
func eventShapes(t *testing.T) map[string]map[string]any {
	t.Helper()
	spec := loadYAMLMap(t, designEventSpec)
	payload, _ := mustLookup(t, spec, "components", "schemas", "EventPayload").(map[string]any)
	event, _ := mustLookup(t, spec, "components", "schemas", "Event").(map[string]any)
	return map[string]map[string]any{
		"EventPayload": payload,
		"Event":        event,
		"EventResult":  loadYAMLMap(t, eventEntity),
	}
}

// contractOf strips what may differ between the three declarations (prose,
// ordering and per-layer tags) and keeps the wire constraints.
func contractOf(def map[string]any) map[string]any {
	out := map[string]any{}
	for key, value := range def {
		switch key {
		case "description", "x-order", "x-oapi-codegen-extra-tags":
			continue
		case "$ref":
			// event.yaml reaches api.yml's components as ./api.yml#/...;
			// api.yml itself as #/...: the same target.
			ref, _ := value.(string)
			value = ref[strings.Index(ref, "#"):]
		}
		out[key] = value
	}
	return out
}

// TestEventCorrelationFieldsAreOptionalAndAgree pins every new field as
// optional on all three shapes, declared with the same wire constraints.
func TestEventCorrelationFieldsAreOptionalAndAgree(t *testing.T) {
	shapes := eventShapes(t)
	payloadProps := eventMetadataProperties(t, "EventPayload", shapes["EventPayload"])
	for name, shape := range shapes {
		props := eventMetadataProperties(t, name, shape)
		required := eventMetadataRequired(t, name, shape)
		for _, field := range eventCorrelationFields {
			def, ok := props[field].(map[string]any)
			if !ok {
				t.Errorf("%s does not declare %q", name, field)
				continue
			}
			if slices.Contains(required, field) {
				t.Errorf("%s requires %q; every new field is optional so current producers stay valid", name, field)
			}
			if desc, _ := def["description"].(string); strings.TrimSpace(desc) == "" {
				t.Errorf("%s.%s has no description", name, field)
			}
			if def["readOnly"] == true {
				t.Errorf("%s.%s is readOnly; readOnly drops request-body fields from the generated RTK client", name, field)
			}
			if want := contractOf(payloadProps[field].(map[string]any)); !reflect.DeepEqual(contractOf(def), want) {
				t.Errorf("%s.%s = %v, want EventPayload's %v", name, field, contractOf(def), want)
			}
		}
	}
}

// TestEventCorrelationColumnsAreSnakeCase pins the database columns servers
// persist the fields in.
func TestEventCorrelationColumnsAreSnakeCase(t *testing.T) {
	shapes := eventShapes(t)
	for _, name := range []string{"Event", "EventResult"} {
		props := eventMetadataProperties(t, name, shapes[name])
		for field, column := range eventCorrelationColumns {
			def, _ := props[field].(map[string]any)
			if got := mustLookup(t, def, "x-oapi-codegen-extra-tags", "db"); got != column {
				t.Errorf("%s.%s db = %v, want %s", name, field, got, column)
			}
		}
	}
}

// TestEventsWithoutTheNewFieldsStillValidate is the back-compat acceptance
// case: payloads and events written before this contract validate unchanged.
func TestEventsWithoutTheNewFieldsStillValidate(t *testing.T) {
	doc := loadSpec(t, designEventSpec)
	payload := schemaOf(t, doc, "EventPayload")
	for _, body := range []map[string]any{
		{"category": "connection", "action": "connect", "description": "Connected."},
		{"owner": sampleUUID, "category": "schedule", "action": "completed", "visibility": "public", "idempotencyKey": "run-1"},
		// What MeshKit's models/events.Event serializes today.
		{
			"id": sampleUUID, "actedUpon": sampleUUID2, "action": "connect", "category": "connection",
			"createdAt": "2026-11-06T10:00:00Z", "description": "x", "metadata": map[string]any{"error": map[string]any{"Code": "meshery-server-1033"}},
			"operationId": sampleUUID, "severity": "error", "status": "unread", "systemId": sampleUUID2, "updatedAt": "2026-11-06T10:00:00Z",
		},
	} {
		if err := payload.VisitJSON(body); err != nil {
			t.Errorf("EventPayload %v no longer validates: %v", body, err)
		}
	}

	event := schemaOf(t, doc, "Event")
	legacy := cloneJSON(t, constructTemplate(t, eventTemplates, "correlated_event"))
	for _, field := range eventCorrelationFields {
		delete(legacy, field)
	}
	if err := event.VisitJSON(legacy); err != nil {
		t.Errorf("an Event without the new fields no longer validates: %v", err)
	}

	result := schemaOf(t, doc, "EventResult")
	row := map[string]any{"owner": sampleUUID, "category": "connection", "action": "connect", "systemId": sampleUUID2}
	if err := result.VisitJSON(row); err != nil {
		t.Errorf("an EventResult without the new fields no longer validates: %v", err)
	}
	row["occurrenceCount"] = 3
	row["resolvedAt"] = "2026-11-06T11:00:00Z"
	if err := result.VisitJSON(row); err != nil {
		t.Errorf("an EventResult carrying correlation fields does not validate: %v", err)
	}
}

// TestEventCorrelationFieldsRejectMalformedValues exercises the constraints.
func TestEventCorrelationFieldsRejectMalformedValues(t *testing.T) {
	doc := loadSpec(t, designEventSpec)
	base := map[string]any{"category": "connection", "action": "connect"}
	with := func(key string, value any) map[string]any {
		out := map[string]any{}
		for k, v := range base {
			out[k] = v
		}
		out[key] = value
		return out
	}
	checkCases(t, schemaOf(t, doc, "EventPayload"), nil, []struct {
		name    string
		body    map[string]any
		wantErr bool
	}{
		{"W3C trace id", with("traceId", "4bf92f3577b34da6a3ce929d0e0e4736"), false},
		{"trace id with one non-zero digit", with("traceId", "00000000000000000000000000000001"), false},
		{"all-zero trace id", with("traceId", "00000000000000000000000000000000"), true},
		{"uppercase trace id", with("traceId", "4BF92F3577B34DA6A3CE929D0E0E4736"), true},
		{"UUID as trace id", with("traceId", sampleUUID), true},
		{"short trace id", with("traceId", "4bf92f3577b34da6"), true},
		{"W3C parent id", with("parentId", "00f067aa0ba902b7"), false},
		{"all-zero parent id", with("parentId", "0000000000000000"), true},
		{"trace id as parent id", with("parentId", "4bf92f3577b34da6a3ce929d0e0e4736"), true},
		{"CloudEvents 1.0", with("specversion", "1.0"), false},
		{"CloudEvents 0.3", with("specversion", "0.3"), true},
		{"zero occurrences", with("occurrenceCount", 0), true},
		{"empty correlation key", with("correlationKey", ""), true},
		{"long correlation key", with("correlationKey", strings.Repeat("k", 256)), true},
		{"resolvedAt not a time", with("resolvedAt", "yesterday"), true},
		{"open category", with("category", "a-category-no-schema-names"), false},
	})
}

// TestCreateEventDocumentsTheUpsert pins createEvent's operation: the same
// id and path, and the 200 and 201 answers carrying Event-Disposition.
func TestCreateEventDocumentsTheUpsert(t *testing.T) {
	spec := loadYAMLMap(t, designEventSpec)
	op, _ := mustLookup(t, spec, "paths", "/api/events", "post").(map[string]any)
	if op["operationId"] != "createEvent" {
		t.Fatalf("POST /api/events operationId = %v, want createEvent", op["operationId"])
	}
	if ref := mustLookup(t, op, "requestBody", "content", "application/json", "schema", "$ref"); ref != "#/components/schemas/EventPayload" {
		t.Errorf("createEvent body $ref = %v, want EventPayload", ref)
	}
	for _, status := range []string{"200", "201"} {
		if ref := mustLookup(t, op, "responses", status, "content", "application/json", "schema", "$ref"); ref != "#/components/schemas/Event" {
			t.Errorf("createEvent %s schema = %v, want Event", status, ref)
		}
		if ref := mustLookup(t, op, "responses", status, "headers", "Event-Disposition", "$ref"); ref != "#/components/headers/EventDisposition" {
			t.Errorf("createEvent %s Event-Disposition = %v, want the EventDisposition header", status, ref)
		}
	}
	header, _ := mustLookup(t, spec, "components", "headers", "EventDisposition").(map[string]any)
	if got, want := mustLookup(t, header, "schema", "enum"), []any{"created", "replayed", "incremented", "resolved"}; !reflect.DeepEqual(got, want) {
		t.Errorf("Event-Disposition enum = %v, want %v", got, want)
	}
	if header["required"] != false {
		t.Errorf("Event-Disposition required = %v, want false: servers that predate correlation omit it", header["required"])
	}
}

// TestEventClassificationStaysOpen pins what the comments on #1334 keep:
// category and action are two free strings, and severity stays an open
// string that accepts the full eight-level ladder and any other value.
func TestEventClassificationStaysOpen(t *testing.T) {
	shapes := eventShapes(t)
	for _, name := range []string{"EventPayload", "Event", "EventResult"} {
		props := eventMetadataProperties(t, name, shapes[name])
		for _, field := range []string{"category", "action", "type", "source"} {
			def, _ := props[field].(map[string]any)
			if _, ok := def["enum"]; ok {
				t.Errorf("%s.%s has an enum; it stays a free string", name, field)
			}
		}
	}
	severity, _ := eventMetadataProperties(t, "Event", shapes["Event"])["severity"].(map[string]any)
	if _, ok := severity["enum"]; ok {
		t.Error("Event.severity has an enum; the set is not closed on the wire")
	}
	event := schemaOf(t, loadSpec(t, designEventSpec), "Event")
	recorded := constructTemplate(t, eventTemplates, "correlated_event")
	for _, level := range []string{"emergency", "alert", "critical", "error", "warning", "informational", "debug", "success", "a-level-no-schema-names"} {
		recorded["severity"] = level
		if err := event.VisitJSON(recorded); err != nil {
			t.Errorf("Event.severity %q does not validate: %v", level, err)
		}
	}
}
