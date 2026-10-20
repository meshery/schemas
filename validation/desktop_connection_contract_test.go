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
	for _, code := range []string{"200", "201", "403", "426"} {
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
	if _, ok := mappingValue(mustLookup(t, hb, "responses"), "426"); !ok {
		t.Error("recordConnectionHeartbeat must document a 426 response")
	}

	meta := mustLookup(t, doc, "components", "schemas", "DesktopConnectionMetadata", "properties")
	for _, name := range []string{"machineId", "hostname", "os", "osVersion", "appVersion", "clientName", "buildSha", "tokenId", "lastSeenAt"} {
		if _, ok := mappingValue(meta, name); !ok {
			t.Errorf("DesktopConnectionMetadata must define %q", name)
		}
	}
	// The client is identified by clientName, a value; no product-specific key.
	for _, name := range []string{"appName", "product"} {
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

// The capabilities document tells a named client whether its version is still
// accepted and describes the authenticated caller's session; register and
// heartbeat refuse an outdated client with 426 and a typed body.
func TestClientHandshakeContract(t *testing.T) {
	root := repoRootDir(t)
	doc := loadOpenAPIDocument(t, filepath.Join(root, "schemas/constructs/v1beta3/provider_capability/api.yml"))

	schemas := mustLookup(t, doc, "components", "schemas")
	for _, name := range []string{"ClientName", "ClientCompatibility", "ClientUpgradeRequiredError", "ProviderSession", "ProviderDeviceUsage"} {
		if _, ok := mappingValue(schemas, name); !ok {
			t.Errorf("provider_capability must define %s", name)
		}
	}
	compat := mustLookup(t, schemas, "ClientCompatibility", "properties")
	for _, name := range []string{"clientName", "clientVersion", "minimumVersion", "compatible", "contractVersion", "upgradeUrl"} {
		if _, ok := mappingValue(compat, name); !ok {
			t.Errorf("ClientCompatibility must define %q", name)
		}
	}
	session := mustLookup(t, schemas, "ProviderSession", "properties")
	for _, name := range []string{"userId", "organizationId", "providerRoles", "organizationRoles", "plan", "entitlements", "deviceUsage"} {
		if _, ok := mappingValue(session, name); !ok {
			t.Errorf("ProviderSession must define %q", name)
		}
	}
	if _, ok := mappingValue(mustLookup(t, schemas, "ProviderDeviceUsage", "properties"), "overLimit"); !ok {
		t.Error("ProviderDeviceUsage must define overLimit")
	}

	entity := loadYAMLMap(t, "schemas/constructs/v1beta3/provider_capability/provider_capability.yaml")
	props := entity["properties"].(map[string]any)
	for _, name := range []string{"compatibility", "session", "contractVersion", "membership"} {
		if _, ok := props[name]; !ok {
			t.Errorf("ProviderCapability must define %q", name)
		}
	}

	op := mustLookup(t, doc, "paths", "/{version}/capabilities", "get")
	found := false
	for _, p := range mustValue(op, "parameters").([]any) {
		if ref, _ := mustValue(p, "$ref").(string); ref == "#/components/parameters/client" {
			found = true
		}
	}
	if !found {
		t.Error("getProviderCapabilities must take the client query parameter")
	}
}

