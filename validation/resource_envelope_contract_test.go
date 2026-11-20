package validation

import (
	"encoding/base64"
	"reflect"
	"strings"
	"testing"
)

// The resource construct (meshery/meshsync#582): the platform-agnostic
// envelope every MeshSync discoverer emits. MeshSync carries a hand-written
// mirror of it (pkg/model/resource.go) until it imports the generated type,
// so the wire names below are a cross-repo contract. The prose form is
// docs/resource-envelope-contract.md.

const (
	resourceSpec      = "schemas/constructs/v1beta1/resource/api.yml"
	resourceEntity    = "schemas/constructs/v1beta1/resource/resource.yaml"
	resourceTemplates = "schemas/constructs/v1beta1/resource/templates"
)

// resourceWireNames are the JSON names of MeshSync's Resource mirror, minus
// its MeshSync-local `kubernetes` payload, which is not part of the schema.
var resourceWireNames = []string{
	"connectionId", "id", "kind", "labels", "metadata", "name", "platform", "schemaVersion", "scopeId",
}

func TestResourceConstructHasNoEndpointsOrServerFields(t *testing.T) {
	spec := loadYAMLMap(t, resourceSpec)
	if paths, _ := spec["paths"].(map[string]any); len(paths) != 0 {
		t.Errorf("resource construct declares paths %v; the envelope has no endpoints", sortedKeys(paths))
	}
	if ref := mustLookup(t, spec, "components", "schemas", "Resource", "$ref"); ref != "./resource.yaml" {
		t.Errorf("Resource $ref = %v, want ./resource.yaml", ref)
	}
	entity := loadYAMLMap(t, resourceEntity)
	if entity["additionalProperties"] != false {
		t.Errorf("resource.yaml additionalProperties = %v, want false", entity["additionalProperties"])
	}
	props := eventMetadataProperties(t, "Resource", entity)
	for _, field := range []string{"createdAt", "updatedAt", "deletedAt", "created_at", "updated_at", "deleted_at"} {
		if _, ok := props[field]; ok {
			t.Errorf("Resource declares server-generated %q; no server stores the envelope", field)
		}
	}
}

func TestResourceWireNamesMatchMeshSyncMirror(t *testing.T) {
	entity := loadYAMLMap(t, resourceEntity)
	if got := sortedKeys(eventMetadataProperties(t, "Resource", entity)); !reflect.DeepEqual(got, resourceWireNames) {
		t.Errorf("Resource properties = %v, want %v", got, resourceWireNames)
	}
	if got, want := eventMetadataRequired(t, "Resource", entity), []string{"kind", "platform", "schemaVersion"}; !reflect.DeepEqual(got, want) {
		t.Errorf("Resource required = %v, want %v", got, want)
	}
	if got := mustLookup(t, entity, "properties", "schemaVersion", "default"); got != "resources.meshery.io/v1beta1" {
		t.Errorf("schemaVersion default = %v, want resources.meshery.io/v1beta1", got)
	}
}

func TestResourceTemplateValidates(t *testing.T) {
	template := constructTemplate(t, resourceTemplates, "resource")
	if err := schemaOf(t, loadSpec(t, resourceSpec), "Resource").VisitJSON(template); err != nil {
		t.Fatalf("resource template does not validate: %v", err)
	}
}

func TestResourceAcceptsAndRejects(t *testing.T) {
	schema := schemaOf(t, loadSpec(t, resourceSpec), "Resource")

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
			"schemaVersion": "resources.meshery.io/v1beta1",
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
