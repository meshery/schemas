package validation

import (
	"path/filepath"
	"testing"
)

// A client machine registers as a generic `machine` connection, deregisters by
// its install id, and keeps itself live with a body-less heartbeat.
func TestMachineConnectionContract(t *testing.T) {
	root := repoRootDir(t)
	doc := loadOpenAPIDocument(t, filepath.Join(root, "schemas/constructs/v1beta3/connection/api.yml"))

	del := mustLookup(t, doc, "paths", "/api/integrations/connections/machine/{machineId}", "delete")
	if got := mustValue(del, "operationId"); got != "deregisterMachineConnection" {
		t.Errorf("deregister operationId = %v", got)
	}
	hb := mustLookup(t, doc, "paths", "/api/integrations/connections/{connectionId}/heartbeat", "post")
	if got := mustValue(hb, "operationId"); got != "recordConnectionHeartbeat" {
		t.Errorf("heartbeat operationId = %v", got)
	}
	if _, ok := mappingValue(hb, "requestBody"); ok {
		t.Error("heartbeat must not take a request body")
	}

	meta := mustLookup(t, doc, "components", "schemas", "MachineConnectionMetadata", "properties")
	for _, name := range []string{"machineId", "hostname", "os", "appName", "appVersion", "buildSha", "lastSeenAt"} {
		if _, ok := mappingValue(meta, name); !ok {
			t.Errorf("MachineConnectionMetadata must define %q", name)
		}
	}

	entity := loadYAMLMap(t, "schemas/constructs/v1beta3/connection/connection.yaml")
	if _, ok := entity["properties"].(map[string]any)["organizationId"]; !ok {
		t.Error("Connection must define organizationId")
	}
}
