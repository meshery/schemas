package validation

import (
	"encoding/json"
	"os"
	"path/filepath"
	"reflect"
	"regexp"
	"slices"
	"strings"
	"testing"

	"github.com/getkin/kin-openapi/openapi3"
	"gopkg.in/yaml.v3"
)

// The design event metadata shapes name the metadata of design events
// (meshery/meshery#22764). They are sub-shapes of Event.metadata, which stays
// a free-form map, so they live in the event construct and have no Payload
// twins. The prose form is docs/design-event-metadata-contract.md.

const designEventSpec = "schemas/constructs/v1beta3/event/api.yml"

// designEventShapes maps each shape to its sample template under
// event/templates, or "" for a shape that only appears nested in another.
var designEventShapes = map[string]string{
	"DesignEventIdentity":                 "design_event_identity",
	"RelationshipEvaluationEventMetadata": "relationship_evaluation_event_metadata",
	"DesignValidationEventMetadata":       "design_validation_event_metadata",
	"DesignValidationEventError":          "",
	"DesignSavedEventMetadata":            "design_saved_event_metadata",
	"DesignSavedEventDesign":              "",
}

// designEventBannedKeys must never be a property of any shape, at any depth:
// they are the design contents and raw results the shapes exist to keep out
// of event metadata.
var designEventBannedKeys = []string{
	"designFile", "patternFile", "components", "relationships", "trace",
	"evaluationResponse", "summary", "validationResult",
}

var designEventIdentityKeys = []string{"designId", "designName", "designVersion", "designLink", "viewLink"}

var camelCaseProperty = regexp.MustCompile(`^[a-z][a-zA-Z0-9]*$`)

func designEventRawShape(t *testing.T, name string) map[string]any {
	t.Helper()
	shape, ok := mustLookup(t, loadYAMLMap(t, designEventSpec), "components", "schemas", name).(map[string]any)
	if !ok {
		t.Fatalf("%s is not a mapping", name)
	}
	return shape
}

// TestDesignEventMetadataShapesAreClosedAndCamelCase pins the structural rules
// every shape follows.
func TestDesignEventMetadataShapesAreClosedAndCamelCase(t *testing.T) {
	serverGenerated := []string{"id", "createdAt", "updatedAt", "deletedAt", "created_at", "updated_at", "deleted_at"}
	for name := range designEventShapes {
		t.Run(name, func(t *testing.T) {
			shape := designEventRawShape(t, name)
			if shape["additionalProperties"] != false {
				t.Errorf("additionalProperties = %v, want false: an open shape lets design contents back in", shape["additionalProperties"])
			}
			if _, ok := shape["allOf"]; ok {
				t.Error("uses allOf; restate the fields so the generators emit one flat type")
			}
			props := eventMetadataProperties(t, name, shape)
			for prop, raw := range props {
				def, _ := raw.(map[string]any)
				if !camelCaseProperty.MatchString(prop) || strings.Contains(prop, "ID") {
					t.Errorf("property %q is not camelCase with an Id suffix", prop)
				}
				// DesignSavedEventDesign.id is the saved design's ID, not a
				// server-generated field of the metadata.
				if slices.Contains(serverGenerated, prop) && !(name == "DesignSavedEventDesign" && prop == "id") {
					t.Errorf("property %q is server-generated; event metadata has none", prop)
				}
				if desc, _ := def["description"].(string); strings.TrimSpace(desc) == "" {
					t.Errorf("property %q has no description", prop)
				}
				if goName, _ := def["x-go-name"].(string); goName == "" {
					t.Errorf("property %q has no x-go-name", prop)
				}
				if def["type"] == "integer" && def["minimum"] != 0 {
					t.Errorf("integer property %q minimum = %v, want 0", prop, def["minimum"])
				}
			}
		})
	}
}

// TestDesignEventMetadataHasNoBannedKeys walks every shape, including its
// nested and array-item schemas, for a banned key.
func TestDesignEventMetadataHasNoBannedKeys(t *testing.T) {
	var walk func(path string, node any)
	walk = func(path string, node any) {
		switch typed := node.(type) {
		case map[string]any:
			if props, ok := typed["properties"].(map[string]any); ok {
				for key := range props {
					if slices.Contains(designEventBannedKeys, key) {
						t.Errorf("%s declares banned key %q", path, key)
					}
				}
			}
			for key, child := range typed {
				walk(path+"."+key, child)
			}
		case []any:
			for _, child := range typed {
				walk(path, child)
			}
		}
	}
	for name := range designEventShapes {
		walk(name, designEventRawShape(t, name))
	}
}

// TestDesignEventMetadataIdentityFieldsAgree pins the restated identity
// fields: every shape that carries them declares exactly DesignEventIdentity's
// definitions, and each requires designId.
func TestDesignEventMetadataIdentityFieldsAgree(t *testing.T) {
	identity := designEventRawShape(t, "DesignEventIdentity")
	identityProps := eventMetadataProperties(t, "DesignEventIdentity", identity)
	if got := sortedKeys(identityProps); !reflect.DeepEqual(got, sortedStrings(designEventIdentityKeys)) {
		t.Fatalf("DesignEventIdentity properties = %v, want %v", got, sortedStrings(designEventIdentityKeys))
	}
	for _, name := range []string{"DesignEventIdentity", "RelationshipEvaluationEventMetadata", "DesignValidationEventMetadata"} {
		t.Run(name, func(t *testing.T) {
			shape := designEventRawShape(t, name)
			props := eventMetadataProperties(t, name, shape)
			for _, key := range designEventIdentityKeys {
				if !reflect.DeepEqual(props[key], identityProps[key]) {
					t.Errorf("%s.%s = %v, want DesignEventIdentity's %v", name, key, props[key], identityProps[key])
				}
			}
			if got := eventMetadataRequired(t, name, shape); !reflect.DeepEqual(got, []string{"designId"}) {
				t.Errorf("required = %v, want [designId]: the guard keeps only the identity fields, so nothing else may be required", got)
			}
		})
	}
}

// TestDesignValidationEventMetadataErrorsAreBounded pins the 20-error cap and
// the error entry shape.
func TestDesignValidationEventMetadataErrorsAreBounded(t *testing.T) {
	errs, ok := mustLookup(t, designEventRawShape(t, "DesignValidationEventMetadata"), "properties", "errors").(map[string]any)
	if !ok {
		t.Fatal("DesignValidationEventMetadata.errors is not a mapping")
	}
	if errs["maxItems"] != 20 {
		t.Errorf("errors maxItems = %v, want 20", errs["maxItems"])
	}
	if ref := mustLookup(t, errs, "items", "$ref"); ref != "#/components/schemas/DesignValidationEventError" {
		t.Errorf("errors items $ref = %v, want DesignValidationEventError", ref)
	}
	entry := eventMetadataProperties(t, "DesignValidationEventError", designEventRawShape(t, "DesignValidationEventError"))
	if got := sortedKeys(entry); !reflect.DeepEqual(got, []string{"code", "componentId"}) {
		t.Errorf("DesignValidationEventError properties = %v, want [code componentId]", got)
	}
	saved := eventMetadataProperties(t, "DesignSavedEventDesign", designEventRawShape(t, "DesignSavedEventDesign"))
	if got := sortedKeys(saved); !reflect.DeepEqual(got, []string{"id", "name"}) {
		t.Errorf("DesignSavedEventDesign properties = %v, want only [id name]", got)
	}
}

// TestEventMetadataStaysFreeForm pins Event.metadata as a nullable free-form
// map, so the named shapes add no breaking change to the event contract.
func TestEventMetadataStaysFreeForm(t *testing.T) {
	metadata, ok := mustLookup(t, loadYAMLMap(t, designEventSpec), "components", "schemas", "Event", "properties", "metadata").(map[string]any)
	if !ok {
		t.Fatal("Event.metadata is not a mapping")
	}
	if metadata["type"] != "object" || metadata["additionalProperties"] != true || metadata["nullable"] != true || metadata["x-go-type"] != "core.Map" {
		t.Errorf("Event.metadata = %v, want a nullable free-form object (core.Map)", metadata)
	}
}

func designEventTemplate(t *testing.T, base, ext string) map[string]any {
	t.Helper()
	raw, err := os.ReadFile(filepath.Join(repoRootDir(t), "schemas/constructs/v1beta3/event/templates", base+"_template."+ext))
	if err != nil {
		t.Fatalf("read template: %v", err)
	}
	var decoded any
	if ext == "json" {
		err = json.Unmarshal(raw, &decoded)
	} else {
		err = yaml.Unmarshal(raw, &decoded)
	}
	if err != nil {
		t.Fatalf("parse %s template: %v", ext, err)
	}
	// Round-trip through JSON so YAML scalars take their wire types.
	wire, err := json.Marshal(decoded)
	if err != nil {
		t.Fatalf("re-encode %s template: %v", ext, err)
	}
	var out map[string]any
	if err := json.Unmarshal(wire, &out); err != nil {
		t.Fatalf("decode %s template: %v", ext, err)
	}
	return out
}

// TestDesignEventMetadataTemplatesValidate checks each sample template, json
// and yaml alike, against its shape, and that the pair agree.
func TestDesignEventMetadataTemplatesValidate(t *testing.T) {
	doc := loadSpec(t, designEventSpec)
	for name, base := range designEventShapes {
		if base == "" {
			continue
		}
		t.Run(name, func(t *testing.T) {
			schema := schemaOf(t, doc, name)
			asJSON := designEventTemplate(t, base, "json")
			asYAML := designEventTemplate(t, base, "yaml")
			if !reflect.DeepEqual(asJSON, asYAML) {
				t.Errorf("json and yaml templates differ:\njson %v\nyaml %v", asJSON, asYAML)
			}
			if err := schema.VisitJSON(asJSON); err != nil {
				t.Errorf("template does not validate: %v", err)
			}
			if got, want := sortedKeys(asJSON), sortedKeys(eventMetadataProperties(t, name, designEventRawShape(t, name))); !reflect.DeepEqual(got, want) {
				t.Errorf("template keys = %v, want every property %v", got, want)
			}
		})
	}
}

// TestDesignEventMetadataRejectsContents exercises the closed shapes: design
// contents, a missing designId, more than 20 errors and negative counts are
// all refused.
func TestDesignEventMetadataRejectsContents(t *testing.T) {
	doc := loadSpec(t, designEventSpec)
	var opts []openapi3.SchemaValidationOption
	with := func(base map[string]any, key string, value any) map[string]any {
		out := map[string]any{}
		for k, v := range base {
			out[k] = v
		}
		if value == nil {
			delete(out, key)
		} else {
			out[key] = value
		}
		return out
	}
	errorsOf := func(n int) []any {
		out := make([]any, n)
		for i := range out {
			out[i] = map[string]any{"code": "required"}
		}
		return out
	}

	identity := designEventTemplate(t, "design_event_identity", "json")
	checkCases(t, schemaOf(t, doc, "DesignEventIdentity"), opts, []struct {
		name    string
		body    map[string]any
		wantErr bool
	}{
		{"identity only designId", map[string]any{"designId": sampleUUID}, false},
		{"identity without designId", with(identity, "designId", nil), true},
		{"identity with malformed designId", with(identity, "designId", "not-a-uuid"), true},
		{"identity with designFile", with(identity, "designFile", map[string]any{}), true},
		{"identity with legacy design_name", with(identity, "design_name", "x"), true},
	})

	evaluation := designEventTemplate(t, "relationship_evaluation_event_metadata", "json")
	checkCases(t, schemaOf(t, doc, "RelationshipEvaluationEventMetadata"), opts, []struct {
		name    string
		body    map[string]any
		wantErr bool
	}{
		{"evaluation guarded down to identity", identity, false},
		{"evaluation with trace", with(evaluation, "trace", map[string]any{}), true},
		{"evaluation with evaluationResponse", with(evaluation, "evaluationResponse", map[string]any{}), true},
		{"evaluation with negative relationshipsAdded", with(evaluation, "relationshipsAdded", -1), true},
		{"evaluation with negative evaluationDurationMs", with(evaluation, "evaluationDurationMs", -1), true},
	})

	validation := designEventTemplate(t, "design_validation_event_metadata", "json")
	checkCases(t, schemaOf(t, doc, "DesignValidationEventMetadata"), opts, []struct {
		name    string
		body    map[string]any
		wantErr bool
	}{
		{"validation guarded down to identity", identity, false},
		{"validation with 20 errors", with(validation, "errors", errorsOf(20)), false},
		{"validation with 21 errors", with(validation, "errors", errorsOf(21)), true},
		{"validation with negative errorCount", with(validation, "errorCount", -1), true},
		{"validation with validationResult", with(validation, "validationResult", map[string]any{}), true},
		{"validation error without code", with(validation, "errors", []any{map[string]any{"componentId": "c"}}), true},
		{"validation error carrying the component", with(validation, "errors", []any{map[string]any{"code": "type", "component": map[string]any{}}}), true},
	})

	saved := designEventTemplate(t, "design_saved_event_metadata", "json")
	checkCases(t, schemaOf(t, doc, "DesignSavedEventMetadata"), opts, []struct {
		name    string
		body    map[string]any
		wantErr bool
	}{
		{"saved without design", with(saved, "design", nil), true},
		{"saved design without id", with(saved, "design", map[string]any{"name": "x"}), true},
		{"saved design with patternFile", with(saved, "design", map[string]any{"id": sampleUUID, "patternFile": "x"}), true},
		{"saved with doclink", with(saved, "doclink", "https://docs.meshery.io/concepts/logical/designs"), true},
	})
}

func sortedStrings(in []string) []string {
	out := slices.Clone(in)
	slices.Sort(out)
	return out
}
