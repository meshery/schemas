package event

import (
	"encoding/json"
	"os"
	"path/filepath"
	"reflect"
	"strings"
	"testing"
)

const templates = "../../../schemas/constructs/v1beta3/event/templates"

func readEventTemplate(t *testing.T, name string, into any) {
	t.Helper()
	raw, err := os.ReadFile(filepath.Join(templates, name))
	if err != nil {
		t.Fatalf("read %s: %v", name, err)
	}
	if err := json.Unmarshal(raw, into); err != nil {
		t.Fatalf("decode %s: %v", name, err)
	}
}

// The acceptance case: an event that names one matched cause.
func TestEventErrorWithOneMatchedCause(t *testing.T) {
	var e EventError
	readEventTemplate(t, "event_error_template.json", &e)
	if err := e.Validate(); err != nil {
		t.Fatalf("event_error template: %v", err)
	}
	if !e.Paired() {
		t.Error("an error with probableCauses is not Paired")
	}
	if e.MatchedCauses == nil || len(*e.MatchedCauses) != 1 {
		t.Fatalf("matchedCauses = %v, want one", e.MatchedCauses)
	}
	probableCause, suggestedRemediation := e.FlatLists()
	if !reflect.DeepEqual(probableCause, *e.ProbableCause) || !reflect.DeepEqual(suggestedRemediation, *e.SuggestedRemediation) {
		t.Error("the template's flat lists are not the derivation of its causes")
	}

	(*e.MatchedCauses)[0].CauseID = "not-a-cause"
	if err := e.Validate(); err == nil || !strings.Contains(err.Error(), "matchedCauses[0].causeId:") {
		t.Errorf("Validate of an unknown matched cause = %v, want an error at matchedCauses[0].causeId", err)
	}
}

// A legacy error with only flat lists is unpaired and valid.
func TestUnpairedEventError(t *testing.T) {
	var e EventError
	readEventTemplate(t, "event_error_unpaired_template.json", &e)
	if err := e.Validate(); err != nil {
		t.Fatalf("unpaired template: %v", err)
	}
	if e.Paired() {
		t.Error("an error with only flat lists is Paired")
	}
	probableCause, suggestedRemediation := e.FlatLists()
	if !reflect.DeepEqual(probableCause, *e.ProbableCause) || !reflect.DeepEqual(suggestedRemediation, *e.SuggestedRemediation) {
		t.Error("FlatLists of an unpaired error is not its own lists")
	}
}

// The correlated event decodes into the generated Event with every new field,
// and its metadata.error decodes into EventError.
func TestCorrelatedEventDecodes(t *testing.T) {
	var event Event
	readEventTemplate(t, "correlated_event_template.json", &event)
	if event.CorrelationKey == nil || event.OccurrenceCount == nil || *event.OccurrenceCount != 7 {
		t.Errorf("correlation fields = %v, %v", event.CorrelationKey, event.OccurrenceCount)
	}
	if event.FirstSeenAt == nil || event.LastSeenAt == nil || !event.LastSeenAt.After(*event.FirstSeenAt) {
		t.Errorf("firstSeenAt, lastSeenAt = %v, %v", event.FirstSeenAt, event.LastSeenAt)
	}
	if event.ResolvedAt != nil {
		t.Errorf("resolvedAt = %v, want an open condition", event.ResolvedAt)
	}
	if event.SpecVersion == nil || *event.SpecVersion != SpecVersion10 {
		t.Errorf("specversion = %v, want 1.0", event.SpecVersion)
	}
	if event.Source == nil || *event.Source != "meshery-server" || event.Type == nil || event.TraceID == nil || event.ParentID == nil {
		t.Errorf("source, type, traceId, parentId = %v, %v, %v, %v", event.Source, event.Type, event.TraceID, event.ParentID)
	}

	raw, err := json.Marshal(event.Metadata["error"])
	if err != nil {
		t.Fatal(err)
	}
	var metadataError EventError
	if err := json.Unmarshal(raw, &metadataError); err != nil {
		t.Fatalf("metadata.error is not an EventError: %v", err)
	}
	if err := metadataError.Validate(); err != nil {
		t.Errorf("metadata.error: %v", err)
	}

	// An event without the new fields omits them on the wire.
	encoded, err := json.Marshal(Event{})
	if err != nil {
		t.Fatal(err)
	}
	for _, field := range []string{"correlationKey", "occurrenceCount", "firstSeenAt", "lastSeenAt", "resolvedAt", "source", `"type"`, "specversion", "traceId", "parentId"} {
		if strings.Contains(string(encoded), field) {
			t.Errorf("a zero Event serializes %s; new fields must be omitted when unset", field)
		}
	}
}
