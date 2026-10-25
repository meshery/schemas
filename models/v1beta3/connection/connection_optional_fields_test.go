package connection

import (
	"encoding/json"
	"strings"
	"testing"
)

// TestConnectionOmitsAbsentDescriptionAndURL guards the wire shape of the
// optional `description` and `url` properties. Both are optional strings in
// connection.yaml, so a connection with neither (for example one whose
// columns are NULL) must omit the keys; emitting `"url": null` breaks every
// client that validates a Connection against the schema, where `url` is a
// string when present.
func TestConnectionOmitsAbsentDescriptionAndURL(t *testing.T) {
	out, err := json.Marshal(Connection{Name: "c", Kind: "github", ConnectionType: "collaboration", SubType: "git", Status: ConnectionStatusConnected})
	if err != nil {
		t.Fatal(err)
	}
	for _, key := range []string{`"url"`, `"description"`} {
		if strings.Contains(string(out), key) {
			t.Fatalf("absent %s must be omitted, got %s", key, out)
		}
	}

	url, description := "https://example.com/repo", "a repository"
	out, err = json.Marshal(Connection{Name: "c", Url: &url, Description: &description})
	if err != nil {
		t.Fatal(err)
	}
	for _, want := range []string{`"url":"https://example.com/repo"`, `"description":"a repository"`} {
		if !strings.Contains(string(out), want) {
			t.Fatalf("present value must be emitted: want %s in %s", want, out)
		}
	}

	var back Connection
	if err := json.Unmarshal([]byte(`{"name":"c","url":null,"description":null}`), &back); err != nil {
		t.Fatalf("a null from an older server still decodes: %v", err)
	}
	if back.Url != nil || back.Description != nil {
		t.Fatalf("null decodes as absent, got url=%v description=%v", back.Url, back.Description)
	}
}
