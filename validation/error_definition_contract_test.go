package validation

import (
	"encoding/json"
	"os"
	"path/filepath"
	"reflect"
	"slices"
	"strconv"
	"testing"

	"github.com/getkin/kin-openapi/openapi3"
	"gopkg.in/yaml.v3"
)

// The error construct (meshery/schemas#1334): an error code's definition with
// nested causes and remediations, the published reference index, and the
// EventError an error event carries as metadata.error. The prose form is
// docs/error-definition-contract.md.

const (
	errorSpec      = "schemas/constructs/v1beta3/error/api.yml"
	errorEntity    = "schemas/constructs/v1beta3/error/error.yaml"
	errorTemplates = "schemas/constructs/v1beta3/error/templates"
	eventTemplates = "schemas/constructs/v1beta3/event/templates"
)

// constructTemplate reads <dir>/<base>_template.json and .yaml, fails unless
// they agree, and returns the JSON form with YAML scalars at their wire types.
func constructTemplate(t *testing.T, dir, base string) map[string]any {
	t.Helper()
	decode := func(ext string) map[string]any {
		raw, err := os.ReadFile(filepath.Join(repoRootDir(t), dir, base+"_template."+ext))
		if err != nil {
			t.Fatalf("read %s template: %v", ext, err)
		}
		var decoded any
		if ext == "json" {
			err = json.Unmarshal(raw, &decoded)
		} else {
			err = yaml.Unmarshal(raw, &decoded)
		}
		if err != nil {
			t.Fatalf("parse %s/%s %s template: %v", dir, base, ext, err)
		}
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
	asJSON, asYAML := decode("json"), decode("yaml")
	if !reflect.DeepEqual(asJSON, asYAML) {
		t.Fatalf("%s/%s: json and yaml templates differ:\njson %v\nyaml %v", dir, base, asJSON, asYAML)
	}
	return asJSON
}

// cloneJSON deep-copies a decoded JSON value so a case can change it.
func cloneJSON(t *testing.T, in map[string]any) map[string]any {
	t.Helper()
	raw, err := json.Marshal(in)
	if err != nil {
		t.Fatal(err)
	}
	var out map[string]any
	if err := json.Unmarshal(raw, &out); err != nil {
		t.Fatal(err)
	}
	return out
}

// flattenCauses is the documented derivation, written independently of the
// Go and TypeScript helpers: each cause's description in order, and each
// remediation's description in walk order with each id kept once.
func flattenCauses(t *testing.T, causes []any) (probableCause, suggestedRemediation []any) {
	t.Helper()
	probableCause, suggestedRemediation = []any{}, []any{}
	seen := map[string]bool{}
	for _, raw := range causes {
		cause := raw.(map[string]any)
		probableCause = append(probableCause, cause["description"])
		for _, rawRem := range cause["remediations"].([]any) {
			rem := rawRem.(map[string]any)
			id := rem["id"].(string)
			if seen[id] {
				continue
			}
			seen[id] = true
			suggestedRemediation = append(suggestedRemediation, rem["description"])
		}
	}
	return probableCause, suggestedRemediation
}

func causesWithRemediations(causeCount, perCause int) []any {
	causes := make([]any, causeCount)
	for c := 0; c < causeCount; c++ {
		rems := make([]any, perCause)
		for r := 0; r < perCause; r++ {
			rems[r] = map[string]any{
				"id":          "fix-" + strconv.Itoa(c) + "-" + strconv.Itoa(r),
				"description": "Do step " + strconv.Itoa(c) + "." + strconv.Itoa(r) + ".",
			}
		}
		causes[c] = map[string]any{
			"id":           "cause-" + strconv.Itoa(c),
			"description":  "Cause " + strconv.Itoa(c) + " failed.",
			"remediations": rems,
		}
	}
	return causes
}

// TestErrorConstructHasNoEndpointsOrServerFields pins the construct's class:
// no endpoints, a closed entity keyed by its code, no server-generated fields.
func TestErrorConstructHasNoEndpointsOrServerFields(t *testing.T) {
	spec := loadYAMLMap(t, errorSpec)
	if paths, _ := spec["paths"].(map[string]any); len(paths) != 0 {
		t.Errorf("error construct declares paths %v; definitions have no endpoints", sortedKeys(paths))
	}
	entity := loadYAMLMap(t, errorEntity)
	if entity["additionalProperties"] != false {
		t.Errorf("error.yaml additionalProperties = %v, want false", entity["additionalProperties"])
	}
	props := eventMetadataProperties(t, "ErrorDefinition", entity)
	for _, field := range []string{"id", "createdAt", "updatedAt", "deletedAt", "created_at", "updated_at", "deleted_at"} {
		if _, ok := props[field]; ok {
			t.Errorf("ErrorDefinition declares server-generated %q; no server stores a definition", field)
		}
	}
	if got, want := eventMetadataRequired(t, "ErrorDefinition", entity), []string{"code", "component", "moniker", "numericCode"}; !reflect.DeepEqual(got, want) {
		t.Errorf("ErrorDefinition required = %v, want %v", got, want)
	}
	if ref := mustLookup(t, spec, "components", "schemas", "ErrorDefinition", "$ref"); ref != "./error.yaml" {
		t.Errorf("ErrorDefinition $ref = %v, want ./error.yaml", ref)
	}
	for _, name := range []string{"ErrorComponent", "ProbableCause", "Remediation", "ErrorReferenceIndex"} {
		shape, _ := mustLookup(t, spec, "components", "schemas", name).(map[string]any)
		if shape["additionalProperties"] != false {
			t.Errorf("%s additionalProperties = %v, want false", name, shape["additionalProperties"])
		}
	}
}

// TestActionPolicyIsTheThreePublishedValues pins the policy enum, that the
// schema promises no default, and that both a cause and a remediation require
// a stable id. A remediation that omits the policy still validates; readers
// treat that omission as manual.
func TestActionPolicyIsTheThreePublishedValues(t *testing.T) {
	spec := loadYAMLMap(t, errorSpec)
	policy, _ := mustLookup(t, spec, "components", "schemas", "ActionPolicy").(map[string]any)
	if got, want := policy["enum"], []any{"automatic", "requiresApproval", "manual"}; !reflect.DeepEqual(got, want) {
		t.Errorf("ActionPolicy enum = %v, want %v", got, want)
	}
	if _, ok := policy["default"]; ok {
		t.Errorf("ActionPolicy default = %v, want none: an omitted policy stays omitted on the wire", policy["default"])
	}
	doc := loadSpec(t, errorSpec)
	if err := schemaOf(t, doc, "Remediation").VisitJSON(map[string]any{
		"id":          "check-network",
		"description": "Check that Meshery Server can reach the cluster.",
	}); err != nil {
		t.Errorf("remediation without actionPolicy does not validate: %v", err)
	}
	for name, want := range map[string][]string{
		"ProbableCause": {"description", "id", "remediations"},
		"Remediation":   {"description", "id"},
	} {
		shape, _ := mustLookup(t, spec, "components", "schemas", name).(map[string]any)
		if got := eventMetadataRequired(t, name, shape); !reflect.DeepEqual(got, want) {
			t.Errorf("%s required = %v, want %v", name, got, want)
		}
	}
	causes, _ := mustLookup(t, spec, "components", "schemas", "ProbableCause", "properties", "remediations").(map[string]any)
	if causes["minItems"] != 1 {
		t.Errorf("ProbableCause.remediations minItems = %v, want 1", causes["minItems"])
	}
}

// TestErrorDefinitionSampleSharesOneRemediation is the acceptance sample: two
// causes that share one remediation and each have one of their own, with
// action policies, validates; and the flat lists derived from it are the ones
// it carries, in today's shape.
func TestErrorDefinitionSampleSharesOneRemediation(t *testing.T) {
	doc := loadSpec(t, errorSpec)
	sample := constructTemplate(t, errorTemplates, "error")
	if err := schemaOf(t, doc, "ErrorDefinition").VisitJSON(sample); err != nil {
		t.Fatalf("error template does not validate: %v", err)
	}

	causes, _ := sample["probableCauses"].([]any)
	if len(causes) != 2 {
		t.Fatalf("sample has %d causes, want 2", len(causes))
	}
	idsPerCause := make([][]string, len(causes))
	policies := map[string]bool{}
	for i, raw := range causes {
		for _, rawRem := range raw.(map[string]any)["remediations"].([]any) {
			rem := rawRem.(map[string]any)
			idsPerCause[i] = append(idsPerCause[i], rem["id"].(string))
			if policy, ok := rem["actionPolicy"].(string); ok {
				policies[policy] = true
			}
		}
	}
	var shared, own0, own1 []string
	for _, id := range idsPerCause[0] {
		if slices.Contains(idsPerCause[1], id) {
			shared = append(shared, id)
		} else {
			own0 = append(own0, id)
		}
	}
	for _, id := range idsPerCause[1] {
		if !slices.Contains(idsPerCause[0], id) {
			own1 = append(own1, id)
		}
	}
	if len(shared) != 1 || len(own0) != 1 || len(own1) != 1 {
		t.Errorf("remediations per cause = %v; want one shared and one of each cause's own", idsPerCause)
	}
	if len(policies) != 3 {
		t.Errorf("sample uses action policies %v; want all three", sortedKeys(policies))
	}

	probableCause, suggestedRemediation := flattenCauses(t, causes)
	if !reflect.DeepEqual(sample["probableCause"], probableCause) {
		t.Errorf("probableCause = %v, want the derivation %v", sample["probableCause"], probableCause)
	}
	if !reflect.DeepEqual(sample["suggestedRemediation"], suggestedRemediation) {
		t.Errorf("suggestedRemediation = %v, want the derivation %v", sample["suggestedRemediation"], suggestedRemediation)
	}
	if len(suggestedRemediation) != 3 {
		t.Errorf("derived %d remediations, want 3: the shared one is listed once", len(suggestedRemediation))
	}

	// Today's shape is the MeshKit error envelope's: two lists of strings
	// named probableCause and suggestedRemediation.
	envelope := loadSpec(t, "schemas/constructs/v1beta2/core/api.yml")
	today := schemaOf(t, envelope, "MeshkitError")
	flat := map[string]any{"error": "x", "probableCause": probableCause, "suggestedRemediation": suggestedRemediation}
	if err := today.VisitJSON(flat); err != nil {
		t.Errorf("derived lists are not today's MeshkitError shape: %v", err)
	}
	definition := loadYAMLMap(t, errorEntity)
	for _, field := range []string{"probableCause", "suggestedRemediation"} {
		if got := mustLookup(t, definition, "properties", field, "items", "type"); got != "string" {
			t.Errorf("ErrorDefinition.%s items type = %v, want string", field, got)
		}
	}
}

// TestErrorDefinitionRejectsMalformedDefinitions exercises the closed shapes.
func TestErrorDefinitionRejectsMalformedDefinitions(t *testing.T) {
	doc := loadSpec(t, errorSpec)
	schema := schemaOf(t, doc, "ErrorDefinition")
	sample := constructTemplate(t, errorTemplates, "error")
	mutate := func(fn func(m map[string]any)) map[string]any {
		out := cloneJSON(t, sample)
		fn(out)
		return out
	}
	remediation := func(m map[string]any) map[string]any {
		return m["probableCauses"].([]any)[0].(map[string]any)["remediations"].([]any)[0].(map[string]any)
	}
	checkCases(t, schema, nil, []struct {
		name    string
		body    map[string]any
		wantErr bool
	}{
		{"legacy flat definition", map[string]any{
			"code": "meshery-server-1001", "moniker": "ErrCreatingUUIDInstanceCode",
			"component": map[string]any{"type": "component", "name": "meshery-server"}, "numericCode": "1001",
			"probableCause": []any{"a"}, "suggestedRemediation": []any{"b"},
		}, false},
		{"without code", mutate(func(m map[string]any) { delete(m, "code") }), true},
		{"code without number", mutate(func(m map[string]any) { m["code"] = "meshery-server" }), true},
		{"uppercase code", mutate(func(m map[string]any) { m["code"] = "Meshery-Server-1033" }), true},
		{"numeric numericCode", mutate(func(m map[string]any) { m["numericCode"] = 1033 }), true},
		{"moniker without Err", mutate(func(m map[string]any) { m["moniker"] = "KubernetesUnreachable" }), true},
		{"MeshKit none severity", mutate(func(m map[string]any) { m["severity"] = "none" }), true},
		{"empty causes", mutate(func(m map[string]any) { m["probableCauses"] = []any{} }), true},
		{"cause without remediations", mutate(func(m map[string]any) {
			delete(m["probableCauses"].([]any)[0].(map[string]any), "remediations")
		}), true},
		{"cause with empty remediations", mutate(func(m map[string]any) {
			m["probableCauses"].([]any)[0].(map[string]any)["remediations"] = []any{}
		}), true},
		{"cause without id", mutate(func(m map[string]any) {
			delete(m["probableCauses"].([]any)[0].(map[string]any), "id")
		}), true},
		{"remediation with unknown policy", mutate(func(m map[string]any) { remediation(m)["actionPolicy"] = "always" }), true},
		{"remediation with snake_case policy", mutate(func(m map[string]any) { remediation(m)["actionPolicy"] = "requires_approval" }), true},
		{"remediation with bare action", mutate(func(m map[string]any) { remediation(m)["action"] = "reconnect" }), true},
		{"remediation with uppercase id", mutate(func(m map[string]any) { remediation(m)["id"] = "Check-Network" }), true},
		{"remediation with extra field", mutate(func(m map[string]any) { remediation(m)["approvalPolicy"] = "required" }), true},
		{"definition with id", mutate(func(m map[string]any) { m["id"] = sampleUUID }), true},
		{"http reference url", mutate(func(m map[string]any) { m["referenceUrl"] = "http://docs.meshery.io/x" }), true},
		{"component with extra field", mutate(func(m map[string]any) {
			m["component"].(map[string]any)["version"] = "v1"
		}), true},
	})
}

// TestErrorReferenceIndexTemplateValidates checks the index sample: version 2,
// each code once, and every entry linked.
func TestErrorReferenceIndexTemplateValidates(t *testing.T) {
	doc := loadSpec(t, errorSpec)
	schema := schemaOf(t, doc, "ErrorReferenceIndex")
	index := constructTemplate(t, errorTemplates, "error_reference_index")
	if err := schema.VisitJSON(index); err != nil {
		t.Fatalf("index template does not validate: %v", err)
	}
	codes := map[string]bool{}
	for _, raw := range index["errors"].([]any) {
		entry := raw.(map[string]any)
		code := entry["code"].(string)
		if codes[code] {
			t.Errorf("index lists %s twice", code)
		}
		codes[code] = true
		if entry["referenceUrl"] == nil {
			t.Errorf("index entry %s has no referenceUrl", code)
		}
	}
	checkCases(t, schema, nil, []struct {
		name    string
		body    map[string]any
		wantErr bool
	}{
		// JSON numbers decode as float64, which is what the enum holds.
		{"version 1", map[string]any{"schemaVersion": 1.0, "errors": []any{}}, true},
		{"without errors", map[string]any{"schemaVersion": 2.0}, true},
		{"empty index", map[string]any{"schemaVersion": 2.0, "errors": []any{}}, false},
	})
}

// TestEventErrorIsTheMetadataErrorShape pins EventError's place in the event
// construct and its reuse of the error construct's cause and remediation.
func TestEventErrorIsTheMetadataErrorShape(t *testing.T) {
	spec := loadYAMLMap(t, designEventSpec)
	shape, _ := mustLookup(t, spec, "components", "schemas", "EventError").(map[string]any)
	if shape["additionalProperties"] != false {
		t.Errorf("EventError additionalProperties = %v, want false", shape["additionalProperties"])
	}
	if got := eventMetadataRequired(t, "EventError", shape); !reflect.DeepEqual(got, []string{"code"}) {
		t.Errorf("EventError required = %v, want [code]", got)
	}
	if ref := mustLookup(t, shape, "properties", "probableCauses", "items", "$ref"); ref != "../error/api.yml#/components/schemas/ProbableCause" {
		t.Errorf("EventError.probableCauses items $ref = %v, want the error construct's ProbableCause", ref)
	}
	if ref := mustLookup(t, shape, "properties", "matchedCauses", "items", "$ref"); ref != "#/components/schemas/EventMatchedCause" {
		t.Errorf("EventError.matchedCauses items $ref = %v, want EventMatchedCause", ref)
	}
}

// TestEventErrorNamesOneMatchedCause is the acceptance case: an event that
// names one matched cause validates, as does a legacy unpaired error with
// only flat lists, and a row recorded before EventError still validates as an
// Event because metadata is free-form.
func TestEventErrorNamesOneMatchedCause(t *testing.T) {
	doc := loadSpec(t, designEventSpec)
	eventError := schemaOf(t, doc, "EventError")

	matched := constructTemplate(t, eventTemplates, "event_error")
	if err := eventError.VisitJSON(matched); err != nil {
		t.Fatalf("event_error template does not validate: %v", err)
	}
	causes := matched["matchedCauses"].([]any)
	if len(causes) != 1 {
		t.Fatalf("event_error template names %d matched causes, want 1", len(causes))
	}
	causeID := causes[0].(map[string]any)["causeId"]
	var ids []any
	for _, raw := range matched["probableCauses"].([]any) {
		ids = append(ids, raw.(map[string]any)["id"])
	}
	if !slices.Contains(ids, causeID) {
		t.Errorf("matched cause %v is not one of the event's causes %v", causeID, ids)
	}
	probableCause, suggestedRemediation := flattenCauses(t, matched["probableCauses"].([]any))
	if !reflect.DeepEqual(matched["probableCause"], probableCause) || !reflect.DeepEqual(matched["suggestedRemediation"], suggestedRemediation) {
		t.Errorf("event_error flat lists are not the derivation of its causes")
	}
	definition := constructTemplate(t, errorTemplates, "error")
	if matched["code"] != definition["code"] {
		t.Errorf("event_error code = %v, want the sample definition's %v", matched["code"], definition["code"])
	}

	for _, width := range []struct{ causes, perCause int }{{1, 51}, {20, 3}} {
		nested := causesWithRemediations(width.causes, width.perCause)
		probableCause, flat := flattenCauses(t, nested)
		if err := eventError.VisitJSON(map[string]any{
			"code":                 "meshery-server-1033",
			"probableCauses":       nested,
			"probableCause":        probableCause,
			"suggestedRemediation": flat,
		}); err != nil {
			t.Errorf("an EventError with %d causes and %d remediations each (derived list %d) does not validate: %v", width.causes, width.perCause, len(flat), err)
		}
	}

	unpaired := constructTemplate(t, eventTemplates, "event_error_unpaired")
	if err := eventError.VisitJSON(unpaired); err != nil {
		t.Errorf("unpaired event error does not validate: %v", err)
	}
	if _, ok := unpaired["probableCauses"]; ok {
		t.Error("unpaired template carries probableCauses; it is the flat-lists-only example")
	}

	event := schemaOf(t, doc, "Event")
	correlated := constructTemplate(t, eventTemplates, "correlated_event")
	if err := event.VisitJSON(correlated); err != nil {
		t.Fatalf("correlated_event template does not validate as Event: %v", err)
	}
	if err := eventError.VisitJSON(correlated["metadata"].(map[string]any)["error"]); err != nil {
		t.Errorf("correlated_event metadata.error is not an EventError: %v", err)
	}

	legacy := cloneJSON(t, correlated)
	for _, field := range eventCorrelationFields {
		delete(legacy, field)
	}
	legacy["metadata"] = map[string]any{"error": map[string]any{
		"Code": "meshery-server-1033", "Severity": 2,
		"ShortDescription": []any{"Unable to reach the Kubernetes cluster"}, "LongDescription": []any{"x"},
		"ProbableCause": []any{"a"}, "SuggestedRemediation": []any{"b", "c"},
	}}
	if err := event.VisitJSON(legacy); err != nil {
		t.Errorf("an event recorded before EventError no longer validates: %v", err)
	}

	var opts []openapi3.SchemaValidationOption
	mutate := func(fn func(m map[string]any)) map[string]any {
		out := cloneJSON(t, matched)
		fn(out)
		return out
	}
	firstMatch := func(m map[string]any) map[string]any { return m["matchedCauses"].([]any)[0].(map[string]any) }
	checkCases(t, eventError, opts, []struct {
		name    string
		body    map[string]any
		wantErr bool
	}{
		{"code only", map[string]any{"code": "meshery-server-1033"}, false},
		{"without code", mutate(func(m map[string]any) { delete(m, "code") }), true},
		{"confidence above 1", mutate(func(m map[string]any) { firstMatch(m)["confidence"] = 1.5 }), true},
		{"negative confidence", mutate(func(m map[string]any) { firstMatch(m)["confidence"] = -0.1 }), true},
		{"matched cause without id", mutate(func(m map[string]any) { delete(firstMatch(m), "causeId") }), true},
		{"empty matched causes", mutate(func(m map[string]any) { m["matchedCauses"] = []any{} }), true},
		{"legacy PascalCase key", mutate(func(m map[string]any) { m["ProbableCause"] = []any{"a"} }), true},
		{"design contents", mutate(func(m map[string]any) { m["designFile"] = map[string]any{} }), true},
	})
}
