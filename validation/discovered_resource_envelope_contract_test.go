package validation

import (
	"encoding/base64"
	"reflect"
	"strings"
	"testing"
)

// The discovered_resource construct (meshery/meshsync#582): the platform-agnostic
// envelope every MeshSync discoverer emits. MeshSync carries a hand-written
// mirror of it (pkg/model/discovered_resource.go) until it imports the generated type,
// so the wire names below are a cross-repo contract. The prose form is
// docs/discovered-resource-envelope-contract.md.

const (
	discoveredResourceSpec      = "schemas/constructs/v1beta3/discovered_resource/api.yml"
	discoveredResourceEntity    = "schemas/constructs/v1beta3/discovered_resource/discovered_resource.yaml"
	discoveredResourceTemplates = "schemas/constructs/v1beta3/discovered_resource/templates"
)

// discoveredResourceWireNames are the JSON names of MeshSync's DiscoveredResource mirror, minus
// its MeshSync-local `kubernetes` payload, which is not part of the schema.
var discoveredResourceWireNames = []string{
	"connectionId", "id", "kind", "labels", "metadata", "name", "platform", "schemaVersion", "scopeId",
}

func TestDiscoveredResourceConstructHasNoEndpointsOrServerFields(t *testing.T) {
	spec := loadYAMLMap(t, discoveredResourceSpec)
	if paths, _ := spec["paths"].(map[string]any); len(paths) != 0 {
		t.Errorf("discovered_resource construct declares paths %v; the envelope has no endpoints", sortedKeys(paths))
	}
	if ref := mustLookup(t, spec, "components", "schemas", "DiscoveredResource", "$ref"); ref != "./discovered_resource.yaml" {
		t.Errorf("DiscoveredResource $ref = %v, want ./discovered_resource.yaml", ref)
	}
	entity := loadYAMLMap(t, discoveredResourceEntity)
	if entity["additionalProperties"] != false {
		t.Errorf("discovered_resource.yaml additionalProperties = %v, want false", entity["additionalProperties"])
	}
	props := eventMetadataProperties(t, "DiscoveredResource", entity)
	for _, field := range []string{"createdAt", "updatedAt", "deletedAt", "created_at", "updated_at", "deleted_at"} {
		if _, ok := props[field]; ok {
			t.Errorf("DiscoveredResource declares server-generated %q; no server stores the envelope", field)
		}
	}
}

func TestDiscoveredResourceWireNamesMatchMeshSyncMirror(t *testing.T) {
	entity := loadYAMLMap(t, discoveredResourceEntity)
	if got := sortedKeys(eventMetadataProperties(t, "DiscoveredResource", entity)); !reflect.DeepEqual(got, discoveredResourceWireNames) {
		t.Errorf("DiscoveredResource properties = %v, want %v", got, discoveredResourceWireNames)
	}
	if got, want := eventMetadataRequired(t, "DiscoveredResource", entity), []string{"kind", "platform", "schemaVersion"}; !reflect.DeepEqual(got, want) {
		t.Errorf("DiscoveredResource required = %v, want %v", got, want)
	}
	if got := mustLookup(t, entity, "properties", "schemaVersion", "default"); got != "discoveredresources.meshery.io/v1beta3" {
		t.Errorf("schemaVersion default = %v, want discoveredresources.meshery.io/v1beta3", got)
	}
}

func TestDiscoveredResourceTemplateValidates(t *testing.T) {
	template := constructTemplate(t, discoveredResourceTemplates, "discovered_resource")
	if err := schemaOf(t, loadSpec(t, discoveredResourceSpec), "DiscoveredResource").VisitJSON(template); err != nil {
		t.Fatalf("discovered_resource template does not validate: %v", err)
	}
}

func TestDiscoveredResourceAcceptsAndRejects(t *testing.T) {
	schema := schemaOf(t, loadSpec(t, discoveredResourceSpec), "DiscoveredResource")

	// The id MeshSync's Kubernetes discoverer assigns on persist: base64 of
	// cluster, kind, API version, namespace and name. Not a UUID.
	k8sID := base64.StdEncoding.EncodeToString([]byte(
		"8a7c2d3e-0f1b-4c5d-9e6f-7a8b9c0d1e2f.Deployment.apps/v1." +
			strings.Repeat("n", 63) + "." + strings.Repeat("d", 253)))

	emitted := func() map[string]any {
		return map[string]any{
			"platform":      "kubernetes",
			"scopeId":       "8a7c2d3e-0f1b-4c5d-9e6f-7a8b9c0d1e2f",
			"kind":          "Pod",
			"name":          "web-0",
			"schemaVersion": "discoveredresources.meshery.io/v1beta3",
		}
	}
	with := func(key string, value any) map[string]any {
		m := emitted()
		m[key] = value
		return m
	}
	without := func(key string) map[string]any {
		m := emitted()
		delete(m, key)
		return m
	}

	cases := []struct {
		name    string
		body    map[string]any
		wantErr bool
	}{
		{"as emitted, before an id is assigned", emitted(), false},
		{"empty id", with("id", ""), false},
		{"persisted kubernetes id", with("id", k8sID), false},
		{"docker scope", with("scopeId", "ABCD:EFGH:IJKL:MNOP:QRST:UVWX:YZ12:3456:7890:ABCD:EFGH:IJKL"), false},
		{"string labels", with("labels", map[string]any{"app": "web"}), false},
		{"nested metadata", with("metadata", map[string]any{"spec": map[string]any{"replicas": 3}}), false},
		{"missing platform", without("platform"), true},
		{"missing kind", without("kind"), true},
		{"missing schemaVersion", without("schemaVersion"), true},
		{"empty platform", with("platform", ""), true},
		{"platform over 64", with("platform", strings.Repeat("p", 65)), true},
		{"non-string label value", with("labels", map[string]any{"replicas": 3}), true},
		{"malformed schemaVersion", with("schemaVersion", "resources"), true},
		// The legacy Kubernetes payload rides beside the envelope in
		// MeshSync's own wrapper; it is not an envelope field.
		{"kubernetes payload", with("kubernetes", map[string]any{"cluster_id": "x"}), true},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			err := schema.VisitJSON(tc.body)
			if tc.wantErr && err == nil {
				t.Fatal("validated, want an error")
			}
			if !tc.wantErr && err != nil {
				t.Fatalf("rejected: %v", err)
			}
		})
	}
}
