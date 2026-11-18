package design

import (
	"encoding/json"
	"testing"

	"github.com/gofrs/uuid"
	"github.com/meshery/schemas/models/v1alpha2"
	"github.com/meshery/schemas/models/v1beta3"
)

// A v1beta3 design embeds v1beta2 components, so components produced by
// ConvertFrom must carry the v1beta2 component label — the label has to
// match the serialized body (v1beta2 uses created_at/updated_at keys).
func TestConvertFromLabelsComponentsWithEmbeddedComponentVersion(t *testing.T) {
	id := uuid.Must(uuid.NewV4())
	src := &v1alpha2.PatternFile{
		Name:    "test",
		Version: "v0.0.1",
		Services: map[string]*v1alpha2.Service{
			"svc": {
				Id:         &id,
				Name:       "svc",
				Type:       "Deployment",
				ApiVersion: "apps/v1",
				Model:      "kubernetes",
				Traits: map[string]interface{}{
					"meshmap": map[string]interface{}{"id": id.String()},
				},
			},
		},
	}

	var dst PatternFile
	if err := dst.ConvertFrom(src); err != nil {
		t.Fatalf("ConvertFrom: %v", err)
	}
	if len(dst.Components) != 1 {
		t.Fatalf("expected 1 component, got %d", len(dst.Components))
	}

	cmp := dst.Components[0]
	if got := string(cmp.SchemaVersion); got != v1beta3.DesignComponentSchemaVersion {
		t.Fatalf("component schemaVersion = %q, want %q", got, v1beta3.DesignComponentSchemaVersion)
	}
	if v1beta3.DesignComponentSchemaVersion == v1beta3.ComponentSchemaVersion {
		t.Fatalf("DesignComponentSchemaVersion must differ from ComponentSchemaVersion while designs embed v1beta2 components")
	}

	// Guard the invariant the label encodes: the embedded body is v1beta2-shaped.
	raw, err := json.Marshal(cmp)
	if err != nil {
		t.Fatalf("marshal component: %v", err)
	}
	var body map[string]json.RawMessage
	if err := json.Unmarshal(raw, &body); err != nil {
		t.Fatalf("unmarshal component: %v", err)
	}
	if _, ok := body["createdAt"]; ok {
		t.Fatalf("embedded component now serializes createdAt; it is v1beta3-shaped, so DesignComponentSchemaVersion should be revisited")
	}
}
