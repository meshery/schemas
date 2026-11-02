package validation

import (
	"os"
	"path/filepath"
	"sort"
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

// The bundled cloud spec is what the RTK client is generated from. The route
// must appear once, with the v1beta3 body and the 403. The bundle is gitignored,
// so make bundle-openapi must have run first.
func TestMergedCloudSpecDeclaresUpdateUserPreferencesOnce(t *testing.T) {
	path := filepath.Join(repoRootDir(t), "_openapi_build", "cloud_openapi.yml")
	if _, err := os.Stat(path); err != nil {
		t.Fatalf("%s is missing: run make bundle-openapi first: %v", path, err)
	}
	raw := loadOpenAPIDocument(t, path)

	declared := 0
	paths, _ := mustLookup(t, raw, "paths").(map[string]any)
	for route, item := range paths {
		methods, _ := item.(map[string]any)
		for method, value := range methods {
			op, ok := value.(map[string]any)
			if !ok || op["operationId"] != "updateUserPreferences" {
				continue
			}
			declared++
			if route != preferencesRoute || method != "put" {
				t.Errorf("updateUserPreferences declared at %s %s, want PUT %s", method, route, preferencesRoute)
			}
		}
	}
	if declared != 1 {
		t.Fatalf("merged cloud spec declares updateUserPreferences %d times, want once", declared)
	}

	body := mustLookup(t, raw, "paths", preferencesRoute, "put", "requestBody", "content", "application/json", "schema", "properties")
	if _, ok := mustValue(body, "agentsActWithoutApproval").(map[string]any); !ok {
		t.Error("merged updateUserPreferences body must carry agentsActWithoutApproval (the v1beta3 PreferencePayload)")
	}
	if got := mustLookup(t, raw, "paths", preferencesRoute, "put", "responses", "403", "description"); got != "Forbidden" {
		t.Errorf("merged updateUserPreferences 403 description = %v, want Forbidden", got)
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

// dropSupersededEndpoints mirrors the bundler: a declaration goes only when its
// owner names its version and carries the same operationId.
func TestDropSupersededEndpointsMirrorsBundlerRule(t *testing.T) {
	declaration := func(version, supersedes, operationID string) schemaEndpoint {
		return schemaEndpoint{Construct: "user", Method: "PUT", Path: preferencesRoute, Version: version, Supersedes: supersedes, OperationID: operationID}
	}
	cases := []struct {
		name      string
		endpoints []schemaEndpoint
		want      int
	}{
		{"owner drops the superseded declaration", []schemaEndpoint{declaration("v1beta2", "", "updateUserPreferences"), declaration("v1beta3", "v1beta2", "updateUserPreferences")}, 1},
		{"operationId mismatch keeps both", []schemaEndpoint{declaration("v1beta2", "", "updateUserPreferences"), declaration("v1beta3", "v1beta2", "setUserPreferences")}, 2},
		{"wrong superseded version keeps both", []schemaEndpoint{declaration("v1beta2", "", "updateUserPreferences"), declaration("v1beta3", "v1beta1", "updateUserPreferences")}, 2},
		{"undeclared duplicate keeps both", []schemaEndpoint{declaration("v1beta2", "", "updateUserPreferences"), declaration("v1beta3", "", "updateUserPreferences")}, 2},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			if got := len(dropSupersededEndpoints(tc.endpoints)); got != tc.want {
				t.Errorf("kept %d endpoints, want %d", got, tc.want)
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
