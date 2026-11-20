package validation

import (
	"encoding/json"
	"os"
	"path/filepath"
	"strings"
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
	for _, name := range []string{"contractVersion", "membership", "capabilities", "providerUrl", "redirects"} {
		if _, ok := props[name]; !ok {
			t.Errorf("ProviderCapability must define %q", name)
		}
	}
	redirects, _ := props["redirects"].(map[string]any)
	redirectValues, _ := redirects["additionalProperties"].(map[string]any)
	if redirects["type"] != "object" || redirectValues["type"] != "string" {
		t.Errorf("redirects must be an object of strings, got %v", redirects)
	}
	if v, _ := entity["additionalProperties"].(bool); v != false {
		t.Errorf("ProviderCapability additionalProperties = %v, want false", entity["additionalProperties"])
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

	t.Run("Provider capability document advertises contractVersion 1.2 indicating support for permissionKeys in ProviderSession", func(t *testing.T) {
		tmplPath := filepath.Join(root, "schemas/constructs/v1beta3/provider_capability/templates/provider_capability_template.json")
		raw, err := os.ReadFile(tmplPath)
		if err != nil {
			t.Fatalf("read template: %v", err)
		}
		var tmpl map[string]any
		if err := json.Unmarshal(raw, &tmpl); err != nil {
			t.Fatalf("unmarshal template: %v", err)
		}
		if got := tmpl["contractVersion"]; got != "1.2" {
			t.Errorf("provider_capability_template.json contractVersion = %v, want 1.2", got)
		}

		spec := loadSpec(t, "schemas/constructs/v1beta3/provider_capability/api.yml")
		capSchema := schemaOf(t, spec, "ProviderCapability")
		if err := capSchema.VisitJSON(tmpl); err != nil {
			t.Fatalf("provider_capability_template.json failed schema validation: %v", err)
		}

		tmplWithSession := map[string]any{
			"providerType":    "remote",
			"contractVersion": "1.2",
			"session": map[string]any{
				"userId":         sampleUUID,
				"providerRoles":  []any{"admin"},
				"permissionKeys": []any{sampleUUID},
			},
		}
		if err := capSchema.VisitJSON(tmplWithSession); err != nil {
			t.Errorf("ProviderCapability with 1.2 session containing permissionKeys failed schema validation: %v", err)
		}

		desc, _ := entity["description"].(string)
		if !strings.Contains(desc, "1.2") || !strings.Contains(desc, "permissionKeys") {
			t.Errorf("provider_capability.yaml description must note 1.2 added permissionKeys to session, got %q", desc)
		}
	})
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
