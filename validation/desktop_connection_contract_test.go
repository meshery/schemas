package validation

import (
	"fmt"
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

	del := mustLookup(t, doc, "paths", "/api/integrations/connections/desktop/{installationId}", "delete")
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
	for _, name := range []string{"installationId", "computerId", "hostname", "os", "osVersion", "appVersion", "clientName", "buildSha", "tokenId", "lastSeenAt"} {
		if _, ok := mappingValue(meta, name); !ok {
			t.Errorf("DesktopConnectionMetadata must define %q", name)
		}
	}
	if _, ok := mappingValue(meta, "machineId"); ok {
		t.Error("DesktopConnectionMetadata must not define machineId; installationId replaces it")
	}
	required, _ := mustValue(mustLookup(t, doc, "components", "schemas", "DesktopConnectionMetadata"), "required").([]any)
	if len(required) != 1 || required[0] != "installationId" {
		t.Errorf("DesktopConnectionMetadata required = %v, want [installationId]", required)
	}
	// computerId carries only a SHA-256 digest, never a raw hardware id.
	if got := mustValue(mustLookup(t, meta, "computerId"), "pattern"); got != "^[0-9a-f]{64}$" {
		t.Errorf("computerId pattern = %v", got)
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
	spec := loadSpec(t, "schemas/constructs/v1beta3/provider_capability/api.yml")
	root := repoRootDir(t)
	doc := loadOpenAPIDocument(t, filepath.Join(root, "schemas/constructs/v1beta3/provider_capability/api.yml"))

	schemas := mustLookup(t, doc, "components", "schemas")
	for _, name := range []string{"ClientName", "ClientCompatibility", "ClientUpgradeRequiredError", "ProviderSession", "ProviderDeviceUsage"} {
		if _, ok := mappingValue(schemas, name); !ok {
			t.Errorf("provider_capability must define %s", name)
		}
	}
	compat := mustLookup(t, schemas, "ClientCompatibility", "properties")
	for _, name := range []string{"clientName", "clientVersion", "minimumVersion", "compatible", "upgradeUrl"} {
		if _, ok := mappingValue(compat, name); !ok {
			t.Errorf("ClientCompatibility must define %q", name)
		}
	}
	session := mustLookup(t, schemas, "ProviderSession", "properties")
	for _, name := range []string{"userId", "providerRoles", "organizationRoles", "plan", "entitlements", "deviceUsage", "permissionKeys"} {
		if _, ok := mappingValue(session, name); !ok {
			t.Errorf("ProviderSession must define %q", name)
		}
	}
	permKeys := mustLookup(t, session, "permissionKeys")
	if v, _ := mappingValue(permKeys, "type"); v != "array" {
		t.Errorf("permissionKeys type = %v, want array", v)
	}
	if v, _ := mappingValue(permKeys, "uniqueItems"); v != true {
		t.Errorf("permissionKeys uniqueItems = %v, want true", v)
	}
	if _, ok := mappingValue(permKeys, "maxItems"); !ok {
		t.Error("permissionKeys must define bounded maxItems")
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

	sessionSchema := schemaOf(t, spec, "ProviderSession")

	t.Run("Authenticated client with live organization context receives ProviderSession with permissionKeys containing up to 1000 unique UUIDs representing effective keychain-scoped keys", func(t *testing.T) {
		keys1000 := make([]any, 1000)
		for i := 0; i < 1000; i++ {
			keys1000[i] = fmt.Sprintf("11111111-1111-4111-8111-%012x", i)
		}
		validSession := map[string]any{
			"userId":            sampleUUID,
			"providerRoles":     []any{"admin"},
			"organizationRoles": []any{"member"},
			"permissionKeys":    keys1000,
		}
		if err := sessionSchema.VisitJSON(validSession); err != nil {
			t.Fatalf("valid session with 1000 permission keys failed validation: %v", err)
		}
	})

	t.Run("Authenticated caller holding no keys receives empty permissionKeys array whereas request without organization or from older provider omits the property entirely", func(t *testing.T) {
		// Omitted permissionKeys (caller without organization or older provider)
		omittedKeys := map[string]any{
			"userId":        sampleUUID,
			"providerRoles": []any{"admin"},
		}
		if err := sessionSchema.VisitJSON(omittedKeys); err != nil {
			t.Errorf("session with omitted permissionKeys failed validation: %v", err)
		}

		// Empty permissionKeys (caller holds no keys in organization)
		emptyKeys := map[string]any{
			"userId":         sampleUUID,
			"providerRoles":  []any{"admin"},
			"permissionKeys": []any{},
		}
		if err := sessionSchema.VisitJSON(emptyKeys); err != nil {
			t.Errorf("session with empty permissionKeys failed validation: %v", err)
		}
	})

	t.Run("ProviderSession schema enforces permissionKeys bounds (maxItems: 1000, uniqueItems: true, item Uuid reference) rejecting invalid or unbounded key sets", func(t *testing.T) {
		// Exceeds maxItems: 1000 (1001 items)
		keys1001 := make([]any, 1001)
		for i := 0; i < 1001; i++ {
			keys1001[i] = fmt.Sprintf("11111111-1111-4111-8111-%012x", i)
		}
		exceededKeys := map[string]any{
			"userId":         sampleUUID,
			"providerRoles":  []any{"admin"},
			"permissionKeys": keys1001,
		}
		if err := sessionSchema.VisitJSON(exceededKeys); err == nil {
			t.Error("expected error for permissionKeys exceeding maxItems 1000, got nil")
		}

		// Non-UUID format item
		malformedKey := map[string]any{
			"userId":         sampleUUID,
			"providerRoles":  []any{"admin"},
			"permissionKeys": []any{"not-a-valid-uuid"},
		}
		if err := sessionSchema.VisitJSON(malformedKey); err == nil {
			t.Error("expected error for non-UUID permissionKey, got nil")
		}

		// Duplicate UUIDs (uniqueItems: true)
		duplicateKeys := map[string]any{
			"userId":         sampleUUID,
			"providerRoles":  []any{"admin"},
			"permissionKeys": []any{sampleUUID, sampleUUID},
		}
		if err := sessionSchema.VisitJSON(duplicateKeys); err == nil {
			t.Error("expected error for duplicate permissionKeys, got nil")
		}

		// Extra unexpected properties (additionalProperties: false)
		extraProp := map[string]any{
			"userId":        sampleUUID,
			"providerRoles": []any{"admin"},
			"unexpected":    true,
		}
		if err := sessionSchema.VisitJSON(extraProp); err == nil {
			t.Error("expected error for extra properties on ProviderSession, got nil")
		}
	})
}
