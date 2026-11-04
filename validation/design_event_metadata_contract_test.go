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

// designEventShapes maps each shape to its sample templates under
// event/templates, or none for a shape that only appears nested in another.
// Together a shape's templates use every one of its properties.
var designEventShapes = map[string][]string{
	"DesignEventIdentity":                 {"design_event_identity"},
	"RelationshipEvaluationEventMetadata": {"relationship_evaluation_event_metadata"},
	"DesignValidationEventMetadata":       {"design_validation_event_metadata", "design_validation_event_metadata_error"},
	"DesignValidationEventError":          nil,
	"DesignEventOperationError":           {"design_event_operation_error"},
	"DesignSavedEventMetadata":            {"design_saved_event_metadata"},
	"DesignSavedEventDesign":              nil,
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
				if slices.Contains(serverGenerated, prop) && (name != "DesignSavedEventDesign" || prop != "id") {
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
	opErr := designEventRawShape(t, "DesignEventOperationError")
	if got := sortedKeys(eventMetadataProperties(t, "DesignEventOperationError", opErr)); !reflect.DeepEqual(got, []string{"code", "message"}) {
		t.Errorf("DesignEventOperationError properties = %v, want only [code message]", got)
	}
	if got := eventMetadataRequired(t, "DesignEventOperationError", opErr); !reflect.DeepEqual(got, []string{"code"}) {
		t.Errorf("DesignEventOperationError required = %v, want [code]", got)
	}
	if ref := mustLookup(t, designEventRawShape(t, "DesignValidationEventMetadata"), "properties", "error", "$ref"); ref != "#/components/schemas/DesignEventOperationError" {
		t.Errorf("DesignValidationEventMetadata.error $ref = %v, want DesignEventOperationError", ref)
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
	for name, bases := range designEventShapes {
		if len(bases) == 0 {
			continue
		}
		t.Run(name, func(t *testing.T) {
			schema := schemaOf(t, doc, name)
			used := map[string]any{}
			for _, base := range bases {
				asJSON := designEventTemplate(t, base, "json")
				asYAML := designEventTemplate(t, base, "yaml")
				if !reflect.DeepEqual(asJSON, asYAML) {
					t.Errorf("%s: json and yaml templates differ:\njson %v\nyaml %v", base, asJSON, asYAML)
				}
				if err := schema.VisitJSON(asJSON); err != nil {
					t.Errorf("%s: template does not validate: %v", base, err)
				}
				for key, value := range asJSON {
					used[key] = value
				}
			}
			if got, want := sortedKeys(used), sortedKeys(eventMetadataProperties(t, name, designEventRawShape(t, name))); !reflect.DeepEqual(got, want) {
				t.Errorf("template keys = %v, want every property %v", got, want)
			}
		})
	}
}

// TestDesignValidationEventMetadataTemplatesFollowTheStatusRule checks the
// documented status rule on the shipped examples: a completed operation
// carries its findings and no error, and one that did not complete (status
// error) carries an error, keeps the identity fields and has no verdict.
func TestDesignValidationEventMetadataTemplatesFollowTheStatusRule(t *testing.T) {
	failed := designEventTemplate(t, "design_validation_event_metadata", "json")
	if failed["status"] == "error" {
		t.Fatal("design_validation_event_metadata template has status error; it is the completed-operation example")
	}
	if _, ok := failed["error"]; ok {
		t.Errorf("status %v template carries error; error is present only when status is error", failed["status"])
	}

	errored := designEventTemplate(t, "design_validation_event_metadata_error", "json")
	if errored["status"] != "error" {
		t.Fatalf("design_validation_event_metadata_error status = %v, want error", errored["status"])
	}
	if _, ok := errored["error"].(map[string]any); !ok {
		t.Errorf("status error template has no error object: %v", errored["error"])
	}
	for _, key := range []string{"errorCount", "truncated"} {
		if _, ok := errored[key]; ok {
			t.Errorf("status error template carries %q; an operation that did not complete has no verdict", key)
		}
	}
	if errs, ok := errored["errors"].([]any); ok && len(errs) > 0 {
		t.Errorf("status error template lists %d errors, want none", len(errs))
	}
	for _, key := range []string{"designId", "designName", "designVersion", "designLink"} {
		if _, ok := errored[key]; !ok {
			t.Errorf("status error template drops identity field %q", key)
		}
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

	// status error: the operation did not complete, so there is no verdict
	// and error names why.
	errored := designEventTemplate(t, "design_validation_event_metadata_error", "json")
	checkCases(t, schemaOf(t, doc, "DesignValidationEventMetadata"), opts, []struct {
		name    string
		body    map[string]any
		wantErr bool
	}{
		{"status error with error code", map[string]any{"designId": sampleUUID, "status": "error", "error": map[string]any{"code": "validator-exception"}}, false},
		{"status error with MeshKit code and message", with(errored, "error", map[string]any{"code": "meshery-server-1130", "message": "Validation failed to run."}), false},
		{"status error with empty errors", with(errored, "errors", []any{}), false},
		{"status unknown to the schema", with(validation, "status", "skipped"), false},
		{"status error without error code", with(errored, "error", map[string]any{"message": "Validation failed to run."}), true},
		{"status error with empty error code", with(errored, "error", map[string]any{"code": ""}), true},
		{"status error with unknown error property", with(errored, "error", map[string]any{"code": "validator-exception", "stack": "panic: ..."}), true},
		{"status error with design contents in error", with(errored, "error", map[string]any{"code": "validator-exception", "designFile": map[string]any{}}), true},
		{"status error with message over 512 characters", with(errored, "error", map[string]any{"code": "validator-exception", "message": strings.Repeat("x", 513)}), true},
		{"status error with error as a bare string", with(errored, "error", "validator-exception"), true},
	})

	operationError := designEventTemplate(t, "design_event_operation_error", "json")
	checkCases(t, schemaOf(t, doc, "DesignEventOperationError"), opts, []struct {
		name    string
		body    map[string]any
		wantErr bool
	}{
		{"operation error with code only", map[string]any{"code": "validator-no-result"}, false},
		{"operation error with code and message", operationError, false},
		{"operation error with message at 512 characters", with(operationError, "message", strings.Repeat("x", 512)), false},
		{"operation error without code", with(operationError, "code", nil), true},
		{"operation error with code over 255 characters", with(operationError, "code", strings.Repeat("x", 256)), true},
		{"operation error with unknown property", with(operationError, "severity", "error"), true},
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
