package validation

import (
	"encoding/json"
	"os"
	"path/filepath"
	"testing"
)

// TestV1beta2EventUserIDSchemaAndTemplatesAgree keeps the retained v1beta2
// schema and its example templates aligned with EventResult's existing
// userId wire key. The runtime JSON key predates this schema correction; this
// test guards against changing the published examples independently again.
func TestV1beta2EventUserIDSchemaAndTemplatesAgree(t *testing.T) {
	root := repoRootDir(t)
	entityPath := "schemas/constructs/v1beta2/event/event.yaml"
	entity := loadYAMLMap(t, entityPath)
	properties, ok := entity["properties"].(map[string]any)
	if !ok {
		t.Fatal("event entity schema has no properties mapping")
	}
	if _, ok := properties["userId"]; !ok {
		t.Fatal("event entity schema must declare userId")
	}
	if _, ok := properties["user_id"]; ok {
		t.Fatal("event entity schema must not retain the stale user_id property")
	}

	required, ok := entity["required"].([]any)
	if !ok {
		t.Fatal("event entity schema has no required list")
	}
	var userIDRequired bool
	for _, name := range required {
		if name == "userId" {
			userIDRequired = true
		}
		if name == "user_id" {
			t.Fatal("event entity schema must not require the stale user_id property")
		}
	}
	if !userIDRequired {
		t.Fatal("event entity schema must require userId")
	}

	jsonPath := filepath.Join(root, "schemas/constructs/v1beta2/event/templates/event_template.json")
	jsonBytes, err := os.ReadFile(jsonPath)
	if err != nil {
		t.Fatalf("read JSON event template: %v", err)
	}
	var jsonTemplate map[string]any
	if err := json.Unmarshal(jsonBytes, &jsonTemplate); err != nil {
		t.Fatalf("parse JSON event template: %v", err)
	}

	yamlTemplate := loadYAMLMap(t, "schemas/constructs/v1beta2/event/templates/event_template.yaml")
	for label, template := range map[string]map[string]any{
		"JSON": jsonTemplate,
		"YAML": yamlTemplate,
	} {
		if _, ok := template["userId"]; !ok {
			t.Errorf("%s event template must use userId", label)
		}
		if _, ok := template["user_id"]; ok {
			t.Errorf("%s event template must not retain user_id", label)
		}
	}
}
