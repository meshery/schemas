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

func TestCatalogConstructsReuseSharedFieldSchemas(t *testing.T) {
	expected := map[string]map[string]string{
		filepath.Join("schemas", "constructs", "v1alpha1", "catalog_data.yaml"): {
			"class":         "core/api.yml#/components/schemas/CatalogClass",
			"compatibility": "core/api.yml#/components/schemas/CatalogCompatibility",
			"type":          "core/api.yml#/components/schemas/CatalogType",
			"snapshotURL":   "core/api.yml#/components/schemas/CatalogSnapshotUrls",
		},
		filepath.Join("schemas", "constructs", "v1alpha2", "catalog", "catalog.yaml"): {
			"class":         "../../v1alpha1/core/api.yml#/components/schemas/CatalogClass",
			"compatibility": "../../v1alpha1/core/api.yml#/components/schemas/CatalogCompatibility",
			"type":          "../../v1alpha1/core/api.yml#/components/schemas/CatalogType",
			"snapshotURL":   "../../v1alpha1/core/api.yml#/components/schemas/CatalogSnapshotUrls",
		},
		filepath.Join("schemas", "constructs", "v1beta2-draft", "catalog_data.yaml"): {
			"type":        "../v1alpha1/core/api.yml#/components/schemas/CatalogType",
			"snapshotURL": "../v1alpha1/core/api.yml#/components/schemas/CatalogSnapshotUrls",
		},
	}

	for path, properties := range expected {
		raw, err := os.ReadFile(path)
		if err != nil {
			t.Fatalf("read %s: %v", path, err)
		}

		var doc map[string]any
		if err := yaml.Unmarshal(raw, &doc); err != nil {
			t.Fatalf("unmarshal %s: %v", path, err)
		}

		allProps, ok := doc["properties"].(map[string]any)
		if !ok {
			t.Fatalf("%s missing properties", path)
		}

		for name, wantRef := range properties {
			prop, ok := allProps[name].(map[string]any)
			if !ok {
				t.Fatalf("%s property %q missing", path, name)
			}
			if gotRef, _ := prop["$ref"].(string); gotRef != wantRef {
				t.Errorf("%s property %q = %q, want %q", path, name, gotRef, wantRef)
			}
		}
	}
}
