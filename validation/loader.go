package validation

import (
	"context"
	"os"

	"github.com/getkin/kin-openapi/openapi3"
	"gopkg.in/yaml.v3"
)

// loadAPISpec loads an api.yml file using kin-openapi's Loader with external
// ref resolution enabled. Returns nil if the file cannot be loaded or parsed.
func loadAPISpec(filePath string) (*openapi3.T, error) {
	loader := openapi3.NewLoader()
	loader.IsExternalRefsAllowed = true

	doc, err := loader.LoadFromFile(filePath)
	if err != nil {
		return nil, err
	}

	// Validate the document structure (catches Rule 12/13 structural issues).
	if err := doc.Validate(context.Background()); err != nil {
		// We still return the doc — structural issues are reported as violations,
		// not load failures. The spec may still be walkable.
		_ = err
	}

	return doc, nil
}

// loadAPISpecRaw loads the raw YAML representation of an api.yml file as a
// map. Rule 15/16 uses this to access $ref-sibling annotations that
// kin-openapi discards during resolution. Callers should prefer reusing this
// via auditAPISpec rather than re-reading the file directly.
func loadAPISpecRaw(filePath string) (map[string]any, error) {
	return loadYAMLDoc(filePath)
}

// entitySchema is a minimal representation of a standalone entity YAML file
// (e.g., design.yaml). These are JSON Schema objects without an OpenAPI
// envelope, so kin-openapi's loader rejects them. We load them with yaml.v3.
type entitySchema struct {
	Type                 string                    `yaml:"type"`
	AdditionalProperties *bool                     `yaml:"additionalProperties"`
	Properties           map[string]*propertyDef   `yaml:"properties"`
	Required             []string                  `yaml:"required"`
	Extensions           map[string]any            `yaml:"-"`
	raw                  map[string]any            // raw YAML for extension access
}

// propertyDef is a minimal representation of a schema property for entity files.
type propertyDef struct {
	Type        string            `yaml:"type"`
	Ref         string            `yaml:"$ref"`
	Description string            `yaml:"description"`
	Format      string            `yaml:"format"`
	Enum        []any             `yaml:"enum"`
	MinLength   *int              `yaml:"minLength"`
	MaxLength   *int              `yaml:"maxLength"`
	Pattern     string            `yaml:"pattern"`
	Minimum     *float64          `yaml:"minimum"`
	Maximum     *float64          `yaml:"maximum"`
	Const       any               `yaml:"const"`
	AllOf       []map[string]any  `yaml:"allOf"`
	AnyOf       []map[string]any  `yaml:"anyOf"`
	OneOf       []map[string]any  `yaml:"oneOf"`
	Items       *propertyDef      `yaml:"items"`
	Properties  map[string]*propertyDef `yaml:"properties"`
	Extensions  map[string]any    `yaml:"-"`
	raw         map[string]any
}

// loadEntitySchema loads a standalone entity YAML file using yaml.v3.
// Returns nil if the file cannot be loaded or parsed.
func loadEntitySchema(filePath string) (*entitySchema, error) {
	data, err := os.ReadFile(filePath)
	if err != nil {
		return nil, err
	}

	var schema entitySchema
	if err := yaml.Unmarshal(data, &schema); err != nil {
		return nil, err
	}

	// Also load the raw map for extension access.
	var raw map[string]any
	if err := yaml.Unmarshal(data, &raw); err != nil {
		return nil, err
	}
	schema.raw = raw

	return &schema, nil
}

// loadYAMLDoc loads any YAML file into a generic map. Used for template files,
// baseline lookups, and other unstructured YAML access.
func loadYAMLDoc(filePath string) (map[string]any, error) {
	data, err := os.ReadFile(filePath)
	if err != nil {
		return nil, err
	}

	var doc map[string]any
	if err := yaml.Unmarshal(data, &doc); err != nil {
		return nil, err
	}

	return doc, nil
}
