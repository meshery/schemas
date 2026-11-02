package validation

import (
	"path/filepath"
	"sort"
	"strings"
	"testing"

	"github.com/getkin/kin-openapi/openapi3"
)

const (
	userV1beta2Spec  = "schemas/constructs/v1beta2/user/api.yml"
	preferencesRoute = "/api/identity/users/preferences"
)

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
	item := doc.Paths.Find(preferencesRoute)
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

// Both user versions declare the route. v1beta2 keeps its declaration for its
// own version's types, and v1beta3 owns the route in the merged spec through
// x-supersedes, so the bundler resolves the collision to v1beta3.
func TestUpdateUserPreferencesOwnedByV1beta3(t *testing.T) {
	doc := loadSpec(t, userV1beta3Spec)
	item := doc.Paths.Find(preferencesRoute)
	if item == nil || item.Put == nil {
		t.Fatalf("v1beta3 user must declare PUT %s: it owns the route", preferencesRoute)
	}
	op := item.Put
	if op.OperationID != "updateUserPreferences" {
		t.Errorf("operationId = %q, want updateUserPreferences", op.OperationID)
	}
	raw := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), userV1beta3Spec))
	if got := mustLookup(t, raw, "paths", preferencesRoute, "put", "x-supersedes"); got != "v1beta2" {
		t.Errorf("x-supersedes = %v, want v1beta2", got)
	}
	if got := sequenceStrings(mustLookup(t, raw, "paths", preferencesRoute, "put", "x-internal")); len(got) != 1 || got[0] != "cloud" {
		t.Errorf("updateUserPreferences x-internal = %v, want [cloud]", got)
	}
	if resp := op.Responses.Status(201); resp == nil || resp.Value == nil || len(resp.Value.Content) != 0 {
		t.Error("201 must be declared with no body")
	}
	for _, code := range []int{401, 500} {
		if op.Responses.Status(code) == nil {
			t.Errorf("updateUserPreferences must document %d", code)
		}
	}
	// A token-authenticated write of agentsActWithoutApproval, or of the
	// free-form copy, is refused with the shared 403.
	if resp := op.Responses.Status(403); resp == nil {
		t.Error("updateUserPreferences must document 403")
	} else if resp.Ref != "#/components/responses/403" {
		t.Errorf("updateUserPreferences 403 must reference the shared response, got %q", resp.Ref)
	}

	payload := schemaOf(t, doc, "PreferencePayload")
	if op.RequestBody == nil || op.RequestBody.Value == nil {
		t.Fatal("PUT /api/identity/users/preferences declares no requestBody")
	}
	media := op.RequestBody.Value.Content.Get("application/json")
	if media == nil || media.Schema == nil || media.Schema.Value != payload {
		t.Error("requestBody must resolve to the v1beta3 PreferencePayload")
	}
	if _, ok := payload.Properties["agentsActWithoutApproval"]; !ok {
		t.Error("the v1beta3 PreferencePayload that the route accepts must carry agentsActWithoutApproval")
	}
}

// The endpoint index feeds the consumer audit, which must see the moved route
// once, as v1beta3 declares it.
func TestEndpointIndexIndexesMovedRouteOnce(t *testing.T) {
	idx, err := buildEndpointIndex(repoRootDir(t))
	if err != nil {
		t.Fatalf("buildEndpointIndex: %v", err)
	}
	var found []schemaEndpoint
	for _, ep := range idx.Endpoints {
		if ep.Path == preferencesRoute && ep.Method == "PUT" {
			found = append(found, ep)
		}
	}
	if len(found) != 1 {
		t.Fatalf("PUT %s indexed %d times, want once", preferencesRoute, len(found))
	}
	if found[0].Version != "v1beta3" || found[0].OperationID != "updateUserPreferences" {
		t.Errorf("PUT %s indexed as %s %s, want v1beta3 updateUserPreferences", preferencesRoute, found[0].Version, found[0].OperationID)
	}
}

// dropSupersededEndpoints applies the bundler's ownership rule: a declaration
// goes only when its owner names its version, and an x-supersedes the bundler
// would reject is an error, not a silent drop.
func TestDropSupersededEndpointsMirrorsBundlerRule(t *testing.T) {
	declaration := func(version, supersedes, operationID string, internal ...string) schemaEndpoint {
		return schemaEndpoint{Title: "User", Construct: "user", Method: "PUT", Path: preferencesRoute, Version: version, Supersedes: supersedes, OperationID: operationID, XInternal: internal}
	}
	older := declaration("v1beta2", "", "updateUserPreferences", "cloud")
	owner := declaration("v1beta3", "v1beta2", "updateUserPreferences", "cloud")
	otherTitle := owner
	otherTitle.Title = "Token"
	cases := []struct {
		name      string
		endpoints []schemaEndpoint
		want      int
		wantErr   string
	}{
		{"owner drops the superseded declaration", []schemaEndpoint{older, owner}, 1, ""},
		{"x-internal is compared as a set", []schemaEndpoint{declaration("v1beta2", "", "updateUserPreferences", "cloud", "meshery"), declaration("v1beta3", "v1beta2", "updateUserPreferences", "meshery", "cloud")}, 1, ""},
		{"an owner with nothing to supersede is kept", []schemaEndpoint{owner}, 1, ""},
		{"an owner naming a version nothing declares keeps both", []schemaEndpoint{older, declaration("v1beta3", "v1beta1", "updateUserPreferences", "cloud")}, 2, ""},
		{"an undeclared duplicate keeps both", []schemaEndpoint{older, declaration("v1beta3", "", "updateUserPreferences", "cloud")}, 2, ""},
		{"a different construct title keeps both", []schemaEndpoint{older, otherTitle}, 2, ""},
		{"an operationId mismatch fails", []schemaEndpoint{older, declaration("v1beta3", "v1beta2", "setUserPreferences", "cloud")}, 0, "operationIds differ"},
		{"an x-internal mismatch fails", []schemaEndpoint{declaration("v1beta2", "", "updateUserPreferences", "cloud", "meshery"), owner}, 0, "x-internal differs"},
		{"ownership does not chain", []schemaEndpoint{declaration("v1beta1", "", "updateUserPreferences", "cloud"), declaration("v1beta2", "v1beta1", "updateUserPreferences", "cloud"), owner}, 0, "does not chain"},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			kept, err := dropSupersededEndpoints(tc.endpoints)
			if tc.wantErr != "" {
				if err == nil || !strings.Contains(err.Error(), tc.wantErr) {
					t.Fatalf("err = %v, want one containing %q", err, tc.wantErr)
				}
				return
			}
			if err != nil {
				t.Fatalf("unexpected error: %v", err)
			}
			if len(kept) != tc.want {
				t.Errorf("kept %d endpoints, want %d", len(kept), tc.want)
			}
		})
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
