package validation

import (
	"os"
	"path/filepath"
	"reflect"
	"strings"
	"testing"
)

const (
	postureV1beta3Spec   = "schemas/constructs/v1beta3/posture/api.yml"
	postureV1beta3Entity = "schemas/constructs/v1beta3/posture/posture.yaml"
)

// Posture replaced the risk_profile construct as a hard cut-over (no
// superseded construct, no alias property). The preset values are stored
// verbatim by consumers, so they must never change with the name.
func TestPostureContract(t *testing.T) {
	entity := loadYAMLMap(t, postureV1beta3Entity)
	if got := entity["type"]; got != "string" {
		t.Errorf("Posture type = %v, want string", got)
	}
	want := []any{"cautious", "standard", "brisk"}
	if got := entity["enum"]; !reflect.DeepEqual(got, want) {
		t.Errorf("Posture enum = %v, want %v", got, want)
	}

	spec := loadYAMLMap(t, postureV1beta3Spec)
	ref := mustLookup(t, spec, "components", "schemas", "Posture", "$ref")
	if ref != "./posture.yaml" {
		t.Errorf("components.schemas.Posture.$ref = %v, want ./posture.yaml", ref)
	}

	if _, err := os.Stat(filepath.Join(repoRootDir(t), "schemas/constructs/v1beta3/risk_profile")); !os.IsNotExist(err) {
		t.Errorf("schemas/constructs/v1beta3/risk_profile must not exist after the posture cut-over (stat err = %v)", err)
	}
}

// The schedule carries the preset as `posture` on the wire and in the
// database, on both the entity and its write payload, and never as the
// retired `riskProfile`.
func TestSchedulePostureCarrier(t *testing.T) {
	carriers := map[string]map[string]any{
		"Schedule":        loadYAMLMap(t, scheduleV1beta3Ent)["properties"].(map[string]any),
		"SchedulePayload": mustLookup(t, loadYAMLMap(t, scheduleV1beta3Spec), "components", "schemas", "SchedulePayload", "properties").(map[string]any),
	}
	for name, props := range carriers {
		if _, ok := props["riskProfile"]; ok {
			t.Errorf("%s still carries the retired riskProfile property", name)
		}
		prop, ok := props["posture"].(map[string]any)
		if !ok {
			t.Errorf("%s must carry an optional posture property", name)
			continue
		}
		if ref, _ := prop["$ref"].(string); !strings.HasSuffix(ref, "posture/api.yml#/components/schemas/Posture") {
			t.Errorf("%s.posture.$ref = %q, want the v1beta3 Posture component", name, ref)
		}
		if got := prop["x-go-type"]; got != "*posturev1beta3.Posture" {
			t.Errorf("%s.posture x-go-type = %v, want *posturev1beta3.Posture", name, got)
		}
		tags := prop["x-oapi-codegen-extra-tags"].(map[string]any)
		if got := tags["json"]; got != "posture,omitempty" {
			t.Errorf("%s.posture json tag = %v, want posture,omitempty", name, got)
		}
		if name == "Schedule" {
			if got := tags["db"]; got != "posture" {
				t.Errorf("Schedule.posture db tag = %v, want posture", got)
			}
		}
	}
}
