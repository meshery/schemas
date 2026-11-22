package validation

import (
	"path/filepath"
	"strings"
	"testing"
)

// DestinationKind names the connection kinds that are publishing destinations.
// Consumers (Layer5 Cloud, Blowhorn) refuse to store a destination credential
// whose connection kind is not in this set, so a platform Blowhorn publishes to
// must appear here. Each value pairs positionally with an x-enum-varnames entry
// of the form DestinationKind<Value>, which is the Go constant name.
func TestDestinationKindContract(t *testing.T) {
	root := repoRootDir(t)
	doc := loadOpenAPIDocument(t, filepath.Join(root, "schemas/constructs/v1beta3/connection/api.yml"))
	kind := mustLookup(t, doc, "components", "schemas", "DestinationKind")

	values, _ := mustValue(kind, "enum").([]any)
	names, _ := mustValue(kind, "x-enum-varnames").([]any)
	if len(values) != len(names) {
		t.Fatalf("DestinationKind has %d enum values but %d x-enum-varnames", len(values), len(names))
	}

	got := make(map[string]bool, len(values))
	for i, v := range values {
		value, _ := v.(string)
		if value == "" {
			t.Errorf("DestinationKind enum value %d is not a non-empty string: %v", i, v)
			continue
		}
		got[value] = true
		want := "DestinationKind" + strings.ToUpper(value[:1]) + value[1:]
		if names[i] != want {
			t.Errorf("DestinationKind value %q has varname %v, want %s", value, names[i], want)
		}
	}

	for _, value := range []string{
		"linkedin", "x", "reddit", "hn", "slack", "bluesky", "github", "blog",
		// Session-capture platforms whose credentials (YT_*, TIKTOK_*, IG_*, FB_*)
		// are stored on a destination connection.
		"youtube", "tiktok", "instagram", "facebook",
	} {
		if !got[value] {
			t.Errorf("DestinationKind must include %q", value)
		}
	}
}
