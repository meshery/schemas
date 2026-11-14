package validation

import (
	"path/filepath"
	"sort"
	"testing"
)

const catalogContentSpec = "schemas/constructs/v1beta3/design/api.yml"

func TestCatalogContentAggregateItemsAreTyped(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), catalogContentSpec))

	tests := []struct {
		field string
		ref   string
	}{
		{field: "modelsCount", ref: "#/components/schemas/ModelsCount"},
		{field: "categoryCount", ref: "#/components/schemas/CategoryCount"},
	}

	for _, tt := range tests {
		t.Run(tt.field, func(t *testing.T) {
			items, err := lookupPath(doc,
				"components", "schemas", "CatalogContentPage",
				"properties", tt.field, "items")
			if err != nil {
				t.Fatalf("locating %s items: %v", tt.field, err)
			}

			if got, _ := mappingValue(items, "$ref"); got != tt.ref {
				t.Errorf("%s items.$ref = %v, want %q", tt.field, got, tt.ref)
			}
		})
	}
}

func TestCatalogContentAggregateSchemasMatchProvider(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), catalogContentSpec))

	tests := []struct {
		schema     string
		properties map[string]string
	}{
		{
			schema: "ModelsCount",
			properties: map[string]string{
				"model":       "string",
				"count":       "integer",
				"displayName": "string",
			},
		},
		{
			schema: "CategoryCount",
			properties: map[string]string{
				"type":  "string",
				"count": "integer",
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.schema, func(t *testing.T) {
			schema, err := lookupPath(doc, "components", "schemas", tt.schema)
			if err != nil {
				t.Fatalf("locating %s: %v", tt.schema, err)
			}

			if got, _ := mappingValue(schema, "additionalProperties"); got != false {
				t.Errorf("%s additionalProperties = %v, want false", tt.schema, got)
			}

			properties, ok := mappingValue(schema, "properties")
			if !ok || !isMapping(properties) {
				t.Fatalf("%s properties is %T, want a mapping", tt.schema, properties)
			}

			for name, wantType := range tt.properties {
				property, ok := mappingValue(properties, name)
				if !ok {
					t.Errorf("%s is missing property %q", tt.schema, name)
					continue
				}
				if got, _ := mappingValue(property, "type"); got != wantType {
					t.Errorf("%s.%s type = %v, want %q", tt.schema, name, got, wantType)
				}
			}

			if got := mappingKeys(properties); len(got) != len(tt.properties) {
				t.Errorf("%s properties = %v, want exactly %v", tt.schema, got, mapKeys(tt.properties))
			}
		})
	}
}

func mapKeys(values map[string]string) []string {
	keys := make([]string, 0, len(values))
	for key := range values {
		keys = append(keys, key)
	}
	sort.Strings(keys)
	return keys
}
