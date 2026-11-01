package validation

import (
	"fmt"
	"os"
	"path/filepath"
	"testing"

	"gopkg.in/yaml.v3"
)

// The design-import operation (POST /api/pattern/import) responds with a JSON
// array of the saved designs, not a message envelope. Both provider paths in
// meshery/meshery marshal a slice:
//
//   - local provider: MesheryPatternPersister.SaveMesheryPattern returns
//     marshalMesheryPatterns([]MesheryPattern{*pattern})
//     (server/models/meshery_pattern_persister.go)
//   - remote provider: RemoteProvider.SaveMesheryPattern proxies meshery-cloud's
//     UpsertPattern handler verbatim, which writes
//     json.NewEncoder(res).Encode([]models.MesheryPattern{*patternPayload})
//     (meshery-cloud server/handlers/meshery_patterns.go)
//
// and server/handlers/design_import.go writes those bytes straight to the
// response. The schema declared `{ message?: string }` instead, which generated
// an ImportDesignApiResponse that contradicted the wire and forced every
// consumer sourcing from meshery/schemas to read the response untyped
// (meshery/schemas#1128).
//
// These tests pin the corrected contract so it cannot silently regress to an
// envelope, and so the array's element type stays anchored to the canonical
// MesheryPattern schema rather than drifting into a locally-invented shape.

const (
	designImportPath      = "/api/pattern/import"
	designImportItemRef   = "#/components/schemas/MesheryPattern"
	designImportItemsName = "MesheryPattern"
)

// designImportSpecs lists every published design API version that declares the
// import operation. All of them are checked: v1beta1 and v1beta2 are deprecated
// and excluded from the merged spec, but they remain served under the Phase 4.A
// non-deletion policy and are still published as OpenAPI documentation, so a
// wrong response shape there misinforms consumers pinned to those versions.
var designImportSpecs = []string{
	"schemas/constructs/v1beta1/design/api.yml",
	"schemas/constructs/v1beta2/design/api.yml",
	"schemas/constructs/v1beta3/design/api.yml",
}

func TestDesignImportResponseIsArrayOfDesigns(t *testing.T) {
	repoRoot := repoRootDir(t)

	for _, spec := range designImportSpecs {
		spec := spec
		t.Run(spec, func(t *testing.T) {
			doc := loadOpenAPIDocument(t, filepath.Join(repoRoot, spec))

			schema, err := lookupPath(doc,
				"paths", designImportPath, "post",
				"responses", "200", "content", "application/json", "schema")
			if err != nil {
				t.Fatalf("%s: locating the import 200 response schema: %v", spec, err)
			}

			if !isMapping(schema) {
				t.Fatalf("%s: import 200 response schema is %T, want a mapping", spec, schema)
			}

			if got, _ := mappingValue(schema, "type"); got != "array" {
				t.Errorf("%s: import 200 response schema type = %v, want \"array\" "+
					"(the server writes a marshalled []MesheryPattern)", spec, got)
			}

			// A message envelope is the specific regression this guards against:
			// an object response with a `message` property.
			if props, present := mappingValue(schema, "properties"); present {
				t.Errorf("%s: import 200 response schema declares object properties %v; "+
					"the response is an array, not a message envelope", spec, props)
			}

			items, present := mappingValue(schema, "items")
			if !present || !isMapping(items) {
				t.Fatalf("%s: import 200 response schema has items %T, want a mapping", spec, items)
			}

			if got, _ := mappingValue(items, "$ref"); got != designImportItemRef {
				t.Errorf("%s: import 200 response items.$ref = %v, want %q "+
					"(the element type must stay anchored to the canonical design schema)",
					spec, got, designImportItemRef)
			}
		})
	}
}

// TestDesignImportResponseItemSchemaExists proves the $ref asserted above
// resolves inside the same document, so the contract cannot be satisfied by a
// dangling reference that the bundler would then fail on.
func TestDesignImportResponseItemSchemaExists(t *testing.T) {
	repoRoot := repoRootDir(t)

	for _, spec := range designImportSpecs {
		spec := spec
		t.Run(spec, func(t *testing.T) {
			doc := loadOpenAPIDocument(t, filepath.Join(repoRoot, spec))

			if _, err := lookupPath(doc, "components", "schemas", designImportItemsName); err != nil {
				t.Fatalf("%s: %s referenced by the import response is not defined: %v",
					spec, designImportItemsName, err)
			}
		})
	}
}

func loadOpenAPIDocument(t *testing.T, path string) map[string]any {
	t.Helper()

	raw, err := os.ReadFile(path)
	if err != nil {
		t.Fatalf("read %s: %v", path, err)
	}

	var doc map[string]any
	if err := yaml.Unmarshal(raw, &doc); err != nil {
		t.Fatalf("parse %s: %v", path, err)
	}

	return doc
}

// lookupPath walks a decoded YAML document one key at a time.
func lookupPath(doc map[string]any, keys ...string) (any, error) {
	var current any = doc

	for i, key := range keys {
		value, ok := mappingValue(current, key)
		if !ok {
			if !isMapping(current) {
				return nil, fmt.Errorf("%v: expected a mapping, got %T", keys[:i], current)
			}
			return nil, fmt.Errorf("%v: key %q not found", keys[:i+1], key)
		}

		current = value
	}

	return current, nil
}

// mappingValue reads one key out of a decoded YAML mapping.
//
// yaml.v3 decodes a mapping into map[string]any only when every key is a
// string; a single non-string key (an unquoted response code such as `400:`,
// which this repo's api.yml files do use) demotes the whole mapping to
// map[any]any. Both forms are handled, and keys are compared by their string
// rendering so a caller can ask for "200" whether or not the document quoted it.
func mappingValue(node any, key string) (any, bool) {
	switch typed := node.(type) {
	case map[string]any:
		value, ok := typed[key]
		return value, ok
	case map[any]any:
		for k, v := range typed {
			if fmt.Sprint(k) == key {
				return v, true
			}
		}
	}

	return nil, false
}

func isMapping(node any) bool {
	switch node.(type) {
	case map[string]any, map[any]any:
		return true
	}
	return false
}
