package errorcode

import (
	"encoding/json"
	"errors"
	"os"
	"path/filepath"
	"reflect"
	"strings"
	"testing"
)

const templates = "../../../schemas/constructs/v1beta3/error/templates"

func readTemplate(t *testing.T, name string, into any) []byte {
	t.Helper()
	raw, err := os.ReadFile(filepath.Join(templates, name))
	if err != nil {
		t.Fatalf("read %s: %v", name, err)
	}
	if err := json.Unmarshal(raw, into); err != nil {
		t.Fatalf("decode %s: %v", name, err)
	}
	return raw
}

func sampleDefinition(t *testing.T) ErrorDefinition {
	t.Helper()
	var d ErrorDefinition
	readTemplate(t, "error_template.json", &d)
	return d
}

func ptr[T any](v T) *T { return &v }

// The acceptance sample: two causes sharing one remediation, each with one of
// its own, flattens to the lists it carries, which are today's shape.
func TestFlattenProbableCausesOfTheSample(t *testing.T) {
	d := sampleDefinition(t)
	if err := d.Validate(); err != nil {
		t.Fatalf("sample definition: %v", err)
	}
	probableCause, suggestedRemediation := FlattenProbableCauses(*d.ProbableCauses)
	if !reflect.DeepEqual(probableCause, *d.ProbableCause) {
		t.Errorf("probableCause = %q, want %q", probableCause, *d.ProbableCause)
	}
	if !reflect.DeepEqual(suggestedRemediation, *d.SuggestedRemediation) {
		t.Errorf("suggestedRemediation = %q, want %q", suggestedRemediation, *d.SuggestedRemediation)
	}
	if len(suggestedRemediation) != 3 {
		t.Errorf("derived %d remediations, want 3 (the shared one once)", len(suggestedRemediation))
	}
	gotCauses, gotRemediations := d.FlatLists()
	if !reflect.DeepEqual(gotCauses, probableCause) || !reflect.DeepEqual(gotRemediations, suggestedRemediation) {
		t.Error("FlatLists of a nested definition is not the derivation")
	}
}

func TestFlattenProbableCausesOfNothing(t *testing.T) {
	probableCause, suggestedRemediation := FlattenProbableCauses(nil)
	if probableCause == nil || suggestedRemediation == nil || len(probableCause)+len(suggestedRemediation) != 0 {
		t.Errorf("FlattenProbableCauses(nil) = %v, %v; want two empty, non-nil lists", probableCause, suggestedRemediation)
	}
	legacy := ErrorDefinition{ProbableCause: &[]string{"a"}, SuggestedRemediation: &[]string{"b", "c"}}
	gotCauses, gotRemediations := legacy.FlatLists()
	if !reflect.DeepEqual(gotCauses, []string{"a"}) || !reflect.DeepEqual(gotRemediations, []string{"b", "c"}) {
		t.Errorf("FlatLists of an unpaired definition = %v, %v; want its own lists", gotCauses, gotRemediations)
	}
}

// A definition round-trips with the wire names MeshKit and the docs use.
func TestErrorDefinitionRoundTripsTheWireNames(t *testing.T) {
	var original map[string]any
	readTemplate(t, "error_template.json", &original)
	encoded, err := json.Marshal(sampleDefinition(t))
	if err != nil {
		t.Fatal(err)
	}
	var again map[string]any
	if err := json.Unmarshal(encoded, &again); err != nil {
		t.Fatal(err)
	}
	if !reflect.DeepEqual(original, again) {
		t.Errorf("round trip changed the definition:\nbefore %v\nafter  %v", original, again)
	}
}

func TestErrorDefinitionValidateRejects(t *testing.T) {
	cases := map[string]struct {
		mutate func(d *ErrorDefinition)
		want   string
	}{
		"code not component-numericCode": {func(d *ErrorDefinition) { d.Code = "meshkit-1033" }, "code"},
		"duplicate cause id": {func(d *ErrorDefinition) {
			(*d.ProbableCauses)[1].ID = (*d.ProbableCauses)[0].ID
		}, "probableCauses[1].id"},
		"shared id, different text": {func(d *ErrorDefinition) {
			(*d.ProbableCauses)[1].Remediations[1].Description = "Something else."
		}, "probableCauses[1].remediations[1]"},
		"automatic without action": {func(d *ErrorDefinition) {
			(*d.ProbableCauses)[1].Remediations[0].Action = nil
		}, "probableCauses[1].remediations[0].action"},
		"flat causes out of order": {func(d *ErrorDefinition) {
			list := *d.ProbableCause
			d.ProbableCause = &[]string{list[1], list[0]}
		}, "probableCause"},
		"shared remediation listed twice": {func(d *ErrorDefinition) {
			d.SuggestedRemediation = ptr(append(*d.SuggestedRemediation, (*d.SuggestedRemediation)[1]))
		}, "suggestedRemediation"},
	}
	for name, tc := range cases {
		t.Run(name, func(t *testing.T) {
			d := sampleDefinition(t)
			tc.mutate(&d)
			err := d.Validate()
			var contract *ContractError
			if !errors.As(err, &contract) {
				t.Fatalf("Validate() = %v, want a *ContractError", err)
			}
			if !strings.Contains(err.Error(), tc.want+":") {
				t.Errorf("Validate() = %v, want an error at %s", err, tc.want)
			}
		})
	}
}

func TestEffectivePolicyNeverRunsByMistake(t *testing.T) {
	cases := []struct {
		policy *ActionPolicy
		want   ActionPolicy
	}{
		{nil, ActionPolicyManual},
		{ptr(ActionPolicyAutomatic), ActionPolicyAutomatic},
		{ptr(ActionPolicyRequiresApproval), ActionPolicyRequiresApproval},
		{ptr(ActionPolicyManual), ActionPolicyManual},
		{ptr(ActionPolicy("always")), ActionPolicyManual},
	}
	for _, tc := range cases {
		if got := (Remediation{ActionPolicy: tc.policy}).EffectivePolicy(); got != tc.want {
			t.Errorf("EffectivePolicy(%v) = %s, want %s", tc.policy, got, tc.want)
		}
	}
}

func TestErrorReferenceIndexValidate(t *testing.T) {
	var index ErrorReferenceIndex
	readTemplate(t, "error_reference_index_template.json", &index)
	if err := index.Validate(true); err != nil {
		t.Fatalf("index template: %v", err)
	}
	if index.SchemaVersion != SchemaVersion2 {
		t.Errorf("schemaVersion = %d, want 2", index.SchemaVersion)
	}

	duplicated := index
	duplicated.Errors = append(append([]ErrorDefinition{}, index.Errors...), index.Errors[0])
	if err := duplicated.Validate(false); err == nil || !strings.Contains(err.Error(), "listed more than once") {
		t.Errorf("Validate of a repeated code = %v, want listed more than once", err)
	}

	export := index
	export.Errors = append([]ErrorDefinition{}, index.Errors...)
	export.Errors[0].ReferenceURL = nil
	if err := export.Validate(false); err != nil {
		t.Errorf("a component export without referenceUrl: %v", err)
	}
	if err := export.Validate(true); err == nil || !strings.Contains(err.Error(), "errors[0].referenceUrl") {
		t.Errorf("published index without referenceUrl = %v, want an error at errors[0].referenceUrl", err)
	}
}
