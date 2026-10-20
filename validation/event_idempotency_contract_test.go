package validation

import (
	"path/filepath"
	"testing"
)

// createEvent is safe to retry: an idempotencyKey already recorded for the
// owner answers 200 with the first event instead of recording another.
func TestEventIdempotencyContract(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), "schemas/constructs/v1beta3/event/api.yml"))
	key := mustLookup(t, doc, "components", "schemas", "EventPayload", "properties", "idempotencyKey")
	if got := mustValue(key, "maxLength"); got != 255 {
		t.Errorf("EventPayload.idempotencyKey maxLength = %v, want 255", got)
	}
	if _, ok := mappingValue(mustLookup(t, doc, "components", "schemas", "Event", "properties"), "idempotencyKey"); !ok {
		t.Errorf("Event must echo idempotencyKey")
	}
	responses := mustLookup(t, doc, "paths", "/api/events", "post", "responses")
	for _, code := range []string{"200", "201"} {
		ref := mustLookup(t, responses, code, "content", "application/json", "schema", "$ref")
		if ref != "#/components/schemas/Event" {
			t.Errorf("createEvent %s body = %v, want Event", code, ref)
		}
	}
}
