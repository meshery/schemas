package validation

import (
	"path/filepath"
	"testing"
)

// The provider capabilities document carries a contract version and, for an
// authenticated request naming an organization, the caller's membership.
func TestProviderCapabilityContract(t *testing.T) {
	root := repoRootDir(t)
	doc := loadOpenAPIDocument(t, filepath.Join(root, "schemas/constructs/v1beta3/provider_capability/api.yml"))
	op := mustLookup(t, doc, "paths", "/{version}/capabilities", "get")
	if got := mustValue(op, "operationId"); got != "getProviderCapabilities" {
		t.Errorf("operationId = %v", got)
	}
	entity := loadYAMLMap(t, "schemas/constructs/v1beta3/provider_capability/provider_capability.yaml")
	props := entity["properties"].(map[string]any)
	for _, name := range []string{"contractVersion", "membership", "capabilities"} {
		if _, ok := props[name]; !ok {
			t.Errorf("ProviderCapability must define %q", name)
		}
	}
	if requiredHas(t, entity, "contractVersion") {
		t.Error("contractVersion must be optional: a provider that predates the contract omits it")
	}
	membership := mustLookup(t, doc, "components", "schemas", "ProviderMembership", "properties")
	for _, name := range []string{"organizationId", "bound"} {
		if _, ok := mappingValue(membership, name); !ok {
			t.Errorf("ProviderMembership must define %q", name)
		}
	}
	for _, schema := range []any{
		mustLookup(t, doc, "components", "schemas", "ProviderMembership"),
		mustLookup(t, doc, "components", "schemas", "ProviderFeature"),
	} {
		if v, _ := mappingValue(schema, "additionalProperties"); v != false {
			t.Errorf("schema additionalProperties = %v, want false", v)
		}
	}
	responses := mustLookup(t, doc, "paths", "/{version}/capabilities", "get", "responses")
	if _, ok := mappingValue(responses, "400"); !ok {
		t.Error("getProviderCapabilities must declare a 400 response for a malformed X-Current-Orgid")
	}
}

func requiredHas(t *testing.T, schema map[string]any, name string) bool {
	t.Helper()
	required, ok := schema["required"].([]any)
	if !ok {
		return false
	}
	for _, item := range required {
		if item == name {
			return true
		}
	}
	return false
}
