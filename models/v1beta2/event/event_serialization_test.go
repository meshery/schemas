package event

import (
	"encoding/json"
	"testing"
)

// TestEventResultSerializesCanonicalUserID verifies that the retained v1beta2
// runtime contract already emits userId. The schema correction aligns the
// published schema and generated clients with that existing wire behavior.
func TestEventResultSerializesCanonicalUserID(t *testing.T) {
	data, err := json.Marshal(EventResult{})
	if err != nil {
		t.Fatalf("marshal EventResult: %v", err)
	}
	var fields map[string]json.RawMessage
	if err := json.Unmarshal(data, &fields); err != nil {
		t.Fatalf("decode marshaled EventResult: %v", err)
	}
	if _, ok := fields["userId"]; !ok {
		t.Fatalf("EventResult JSON must contain userId, got %s", data)
	}
	if _, ok := fields["user_id"]; ok {
		t.Fatalf("EventResult JSON must not contain user_id, got %s", data)
	}
}
