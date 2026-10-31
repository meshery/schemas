package validation

import (
	"path/filepath"
	"sort"
	"testing"

	"github.com/getkin/kin-openapi/openapi3"
)

const userV1beta2Spec = "schemas/constructs/v1beta2/user/api.yml"

// v1beta2PreferencePayloadFields is the field set of the v1beta2 user
// PreferencePayload as master declares it. v1beta2 is restored to master, so
// existing consumers of its RTK hook and generated type keep compiling. A new
// field belongs in v1beta3.
var v1beta2PreferencePayloadFields = []string{
	"anonymousPerfResults",
	"anonymousUsageStats",
	"dashboardPreferences",
	"grafana",
	"loadTestPrefs",
	"meshAdapters",
	"prometheus",
	"remoteProviderPreferences",
	"selectedOrganizationId",
	"selectedWorkspaceForOrganizations",
	"usersExtensionPreferences",
}

// PUT /api/identity/users/preferences is how Meshery Cloud's and Meshery's
// organization switchers change the session's selected organization. v1beta2
// user declares it, unchanged from master: its body is the closed
// PreferencePayload and it answers 201 with no body, as the Cloud handler does.
func TestUpdateUserPreferencesV1beta2MatchesMaster(t *testing.T) {
	doc := loadSpec(t, userV1beta2Spec)
	item := doc.Paths.Find("/api/identity/users/preferences")
	if item == nil || item.Put == nil {
		t.Fatal("v1beta2 user must declare PUT /api/identity/users/preferences")
	}
	op := item.Put
	if op.OperationID != "updateUserPreferences" {
		t.Errorf("operationId = %q, want updateUserPreferences", op.OperationID)
	}
	raw := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), userV1beta2Spec))
	if got := sequenceStrings(mustLookup(t, raw, "paths", "/api/identity/users/preferences", "put", "x-internal")); len(got) != 1 || got[0] != "cloud" {
		t.Errorf("updateUserPreferences x-internal = %v, want [cloud]", got)
	}
	if op.Responses.Status(201) == nil || op.Responses.Status(201).Value == nil || len(op.Responses.Status(201).Value.Content) != 0 {
		t.Error("201 must be declared with no body")
	}
	for _, code := range []int{401, 500} {
		if op.Responses.Status(code) == nil {
			t.Errorf("updateUserPreferences must document %d", code)
		}
	}

	payload := schemaOf(t, doc, "PreferencePayload")
	if op.RequestBody == nil || op.RequestBody.Value == nil {
		t.Fatal("PUT /api/identity/users/preferences declares no requestBody")
	}
	media := op.RequestBody.Value.Content.Get("application/json")
	if media == nil || media.Schema == nil || media.Schema.Value != payload {
		t.Error("requestBody must resolve to the v1beta2 PreferencePayload")
	}
	if payload.Deprecated {
		t.Error("v1beta2 PreferencePayload must not be deprecated: the route is still served with it")
	}
	if got := mustLookup(t, raw, "components", "schemas", "PreferencePayload", "additionalProperties"); got != false {
		t.Errorf("v1beta2 PreferencePayload additionalProperties = %v, want false", got)
	}
	if len(payload.Required) != 0 {
		t.Errorf("v1beta2 PreferencePayload required = %v, want none", payload.Required)
	}
	var got []string
	for name := range payload.Properties {
		got = append(got, name)
	}
	sort.Strings(got)
	want := append([]string(nil), v1beta2PreferencePayloadFields...)
	sort.Strings(want)
	if len(got) != len(want) {
		t.Fatalf("v1beta2 PreferencePayload fields = %v, want master's %v", got, want)
	}
	for i := range want {
		if got[i] != want[i] {
			t.Fatalf("v1beta2 PreferencePayload fields = %v, want master's %v", got, want)
		}
	}
	if _, ok := payload.Properties["agentsActWithoutApproval"]; ok {
		t.Error("v1beta2 PreferencePayload must not carry agentsActWithoutApproval: that field is v1beta3")
	}
}

// The route is declared once across the user versions: the bundler merges
// every version into one spec and rejects a route declared twice, so v1beta3
// user carries the PreferencePayload but not the operation.
func TestUpdateUserPreferencesDeclaredOnceAcrossUserVersions(t *testing.T) {
	for _, rel := range []string{userV1beta2Spec, userV1beta3Spec} {
		doc := loadSpec(t, rel)
		item := doc.Paths.Find("/api/identity/users/preferences")
		if rel == userV1beta3Spec && item != nil && item.Put != nil {
			t.Errorf("%s must not declare PUT /api/identity/users/preferences: v1beta2 user owns the route in the merged spec", rel)
		}
		if rel == userV1beta2Spec && (item == nil || item.Put == nil) {
			t.Errorf("%s must declare PUT /api/identity/users/preferences", rel)
		}
	}
}

func TestV1beta3PreferencePayloadRequestValidation(t *testing.T) {
	payload := loadSpec(t, userV1beta3Spec)
	ref := payload.Components.Schemas["PreferencePayload"]
	if ref == nil || ref.Value == nil {
		t.Fatal("components.schemas.PreferencePayload is not declared")
	}
	request := []openapi3.SchemaValidationOption{openapi3.VisitAsRequest()}
	cases := []struct {
		name    string
		body    map[string]any
		wantErr bool
	}{
		{"switches organization", map[string]any{"selectedOrganizationId": "11111111-1111-4111-8111-111111111111"}, false},
		{"empty body keeps everything", map[string]any{}, false},
		{"sets a workspace per organization", map[string]any{"selectedWorkspaceForOrganizations": map[string]any{"11111111-1111-4111-8111-111111111111": "w1"}}, false},
		{"forges updatedAt", map[string]any{"updatedAt": "2026-10-20T00:00:00Z"}, true},
		{"carries unknown field", map[string]any{"badges": []any{"x"}}, true},
		{"organization id is not a string", map[string]any{"selectedOrganizationId": 7}, true},
		{"sets agentsActWithoutApproval", map[string]any{"agentsActWithoutApproval": true}, false},
		{"stores false for agentsActWithoutApproval", map[string]any{"agentsActWithoutApproval": false}, false},
		{"clears agentsActWithoutApproval with null", map[string]any{"agentsActWithoutApproval": nil}, false},
		{"agentsActWithoutApproval is not a boolean", map[string]any{"agentsActWithoutApproval": "yes"}, true},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			err := ref.Value.VisitJSON(tc.body, request...)
			if (err != nil) != tc.wantErr {
				t.Errorf("VisitJSON(%v) error = %v, wantErr %v", tc.body, err, tc.wantErr)
			}
		})
	}
}
