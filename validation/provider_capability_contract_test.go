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
	membership := mustLookup(t, doc, "components", "schemas", "ProviderMembership", "properties")
	for _, name := range []string{"organizationId", "bound"} {
		if _, ok := mappingValue(membership, name); !ok {
			t.Errorf("ProviderMembership must define %q", name)
		}
	}
}
