package schemas

import (
	"os"
	"path/filepath"
	"strings"
	"testing"

	"gopkg.in/yaml.v3"
)

func TestConstructObjectSchemasDeclareAdditionalProperties(t *testing.T) {
	root := filepath.Join("schemas", "constructs")

	err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if info.IsDir() {
			return nil
		}
		if !strings.HasSuffix(path, ".yaml") && !strings.HasSuffix(path, ".yml") {
			return nil
		}
		if strings.Contains(path, string(filepath.Separator)+"templates"+string(filepath.Separator)) || strings.HasSuffix(path, string(filepath.Separator)+"api.yml") {
			return nil
		}

		raw, err := os.ReadFile(path)
		if err != nil {
			return err
		}

		var doc map[string]any
		if err := yaml.Unmarshal(raw, &doc); err != nil {
			return err
		}

		if doc["type"] != "object" {
			return nil
		}
		if _, ok := doc["properties"]; !ok {
			return nil
		}
		if _, ok := doc["additionalProperties"]; !ok {
			t.Errorf("%s is a top-level object schema but does not declare additionalProperties", path)
		}

		return nil
	})
	if err != nil {
		t.Fatalf("walk construct schemas: %v", err)
	}
}

func TestConstructTopLevelPropertiesAreDocumented(t *testing.T) {
	root := filepath.Join("schemas", "constructs")

	err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if info.IsDir() {
			return nil
		}
		if !strings.HasSuffix(path, ".yaml") && !strings.HasSuffix(path, ".yml") {
			return nil
		}
		if strings.Contains(path, string(filepath.Separator)+"templates"+string(filepath.Separator)) || strings.HasSuffix(path, string(filepath.Separator)+"api.yml") {
			return nil
		}

		raw, err := os.ReadFile(path)
		if err != nil {
			return err
		}

		var doc map[string]any
		if err := yaml.Unmarshal(raw, &doc); err != nil {
			return err
		}

		props, ok := doc["properties"].(map[string]any)
		if !ok {
			return nil
		}

		for name, value := range props {
			prop, ok := value.(map[string]any)
			if !ok {
				continue
			}
			if _, ok := prop["$ref"]; ok {
				continue
			}
			description, ok := prop["description"].(string)
			if !ok || strings.TrimSpace(description) == "" {
				t.Errorf("%s property %q must declare a description or reference a documented shared schema", path, name)
			}
		}

		return nil
	})
	if err != nil {
		t.Fatalf("walk construct schemas: %v", err)
	}
}
