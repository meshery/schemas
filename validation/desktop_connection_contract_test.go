package validation

import (
	"path/filepath"
	"testing"
)

// A desktop app install registers as a generic `desktop` connection, deregisters
// by its install id, and keeps itself live with a body-less heartbeat.
func TestDesktopConnectionContract(t *testing.T) {
	root := repoRootDir(t)
	doc := loadOpenAPIDocument(t, filepath.Join(root, "schemas/constructs/v1beta3/connection/api.yml"))

	reg := mustLookup(t, doc, "paths", "/api/integrations/connections", "post")
	for _, code := range []string{"200", "201", "403"} {
		if _, ok := mappingValue(mustLookup(t, reg, "responses"), code); !ok {
			t.Errorf("registerConnection must document a %s response", code)
		}
	}

	del := mustLookup(t, doc, "paths", "/api/integrations/connections/desktop/{machineId}", "delete")
	if got := mustValue(del, "operationId"); got != "deregisterDesktopConnection" {
		t.Errorf("deregister operationId = %v", got)
	}
	hb := mustLookup(t, doc, "paths", "/api/integrations/connections/{connectionId}/heartbeat", "post")
	if got := mustValue(hb, "operationId"); got != "recordConnectionHeartbeat" {
		t.Errorf("heartbeat operationId = %v", got)
	}
	if _, ok := mappingValue(hb, "requestBody"); ok {
		t.Error("heartbeat must not take a request body")
	}

	meta := mustLookup(t, doc, "components", "schemas", "DesktopConnectionMetadata", "properties")
	for _, name := range []string{"machineId", "hostname", "os", "appVersion", "lastSeenAt"} {
		if _, ok := mappingValue(meta, name); !ok {
			t.Errorf("DesktopConnectionMetadata must define %q", name)
		}
	}
	for _, name := range []string{"osVersion", "appName", "buildSha"} {
		if _, ok := mappingValue(meta, name); ok {
			t.Errorf("DesktopConnectionMetadata must not define %q", name)
		}
	}

	entity := loadYAMLMap(t, "schemas/constructs/v1beta3/connection/connection.yaml")
	if _, ok := entity["properties"].(map[string]any)["organizationId"]; !ok {
		t.Error("Connection must define organizationId")
	}

	tmpl := loadYAMLMap(t, "schemas/constructs/v1beta3/connection/templates/connection_template.yaml")
	transitions, ok := mustLookup(t, tmpl, "transitionMap", "disconnected").([]any)
	if !ok || len(transitions) == 0 {
		t.Fatal("transitionMap must allow disconnected transitions")
	}
	if got := mustValue(transitions[0], "nextState"); got != "connected" {
		t.Errorf("disconnected transition nextState = %v, want connected", got)
	}
}
