package validation

import (
	"path/filepath"
	"sort"
	"strconv"
	"strings"
	"testing"

	"github.com/getkin/kin-openapi/openapi3"
)

// A JSON Schema `default` is a value for an instance of the schema it sits on,
// so its JSON type must be one the schema declares. A default of another type -
// such as the list of capabilities that once sat at the top level of the
// single-capability object schema (meshery/schemas#341) - is invalid, and the
// generators copy it into every schema that embeds the construct.
//
// Each construct's api.yml is loaded through the same OpenAPI loader the
// validator uses, with external $refs resolved, so entity schemas referenced as
// ./<construct>.yaml are covered too.
func TestSchemaDefaultsMatchDeclaredType(t *testing.T) {
	root := repoRootDir(t)
	apiFiles, err := filepath.Glob(filepath.Join(root, "schemas", "constructs", "*", "*", "api.yml"))
	if err != nil {
		t.Fatalf("glob api.yml files: %v", err)
	}
	if len(apiFiles) == 0 {
		t.Fatal("found no construct api.yml files")
	}

	var violations []string
	for _, apiFile := range apiFiles {
		rel, _ := filepath.Rel(root, apiFile)
		doc, err := loadAPISpec(apiFile)
		if err != nil {
			t.Fatalf("load %s: %v", rel, err)
		}
		if doc.Components == nil {
			continue
		}
		seen := map[*openapi3.Schema]bool{}
		for _, name := range sortedSchemaNames(doc.Components.Schemas) {
			ref := doc.Components.Schemas[name]
			walkSchemaDefaults(ref, rel+" "+name, seen, func(where string, schema *openapi3.Schema) {
				if schema.Type == nil || len(*schema.Type) == 0 {
					return
				}
				got := jsonTypeOf(schema.Default)
				if !defaultTypeAllowed(*schema.Type, got) {
					violations = append(violations, where+": default is "+got+", schema type is "+strings.Join(*schema.Type, "|"))
				}
			})
		}
	}

	if len(violations) > 0 {
		sort.Strings(violations)
		t.Errorf("%d schema default(s) do not match their schema's declared type:\n  %s",
			len(violations), strings.Join(violations, "\n  "))
	}
}

// jsonTypeOf names the JSON Schema type of a decoded YAML/JSON value.
func jsonTypeOf(v any) string {
	switch n := v.(type) {
	case nil:
		return "null"
	case bool:
		return "boolean"
	case string:
		return "string"
	case []any:
		return "array"
	case map[string]any:
		return "object"
	case int, int32, int64, uint64:
		return "integer"
	case float64:
		if n == float64(int64(n)) {
			return "integer"
		}
		return "number"
	default:
		return "unknown"
	}
}

func defaultTypeAllowed(declared openapi3.Types, got string) bool {
	for _, want := range declared {
		if want == got || (want == "number" && got == "integer") {
			return true
		}
	}
	return false
}

// walkSchemaDefaults calls visit for every schema reachable from ref that
// declares a default. Each schema is visited once, which also guards against
// recursive $refs.
func walkSchemaDefaults(ref *openapi3.SchemaRef, where string, seen map[*openapi3.Schema]bool, visit func(string, *openapi3.Schema)) {
	if ref == nil || ref.Value == nil || seen[ref.Value] {
		return
	}
	schema := ref.Value
	seen[schema] = true

	if schema.Default != nil {
		visit(where, schema)
	}

	for _, name := range sortedSchemaNames(schema.Properties) {
		walkSchemaDefaults(schema.Properties[name], where+".properties."+name, seen, visit)
	}
	walkSchemaDefaults(schema.Items, where+".items", seen, visit)
	if schema.AdditionalProperties.Schema != nil {
		walkSchemaDefaults(schema.AdditionalProperties.Schema, where+".additionalProperties", seen, visit)
	}
	walkSchemaDefaults(schema.Not, where+".not", seen, visit)
	for label, list := range map[string]openapi3.SchemaRefs{"allOf": schema.AllOf, "anyOf": schema.AnyOf, "oneOf": schema.OneOf} {
		for i, item := range list {
			walkSchemaDefaults(item, where+"."+label+"["+strconv.Itoa(i)+"]", seen, visit)
		}
	}
}

func sortedSchemaNames[T any](m map[string]T) []string {
	names := make([]string, 0, len(m))
	for name := range m {
		names = append(names, name)
	}
	sort.Strings(names)
	return names
}
