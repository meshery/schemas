package validation

import (
	"path/filepath"
	"testing"

	"github.com/getkin/kin-openapi/openapi3"
)

const userV1beta2Spec = "schemas/constructs/v1beta2/user/api.yml"

// PUT /api/identity/users/preferences is how Meshery Cloud's and Meshery's
// organization switchers change the session's selected organization. Its body
// is the closed PreferencePayload and it answers 201 with no body, as the
// Cloud handler does. The operation is declared in v1beta3 user; v1beta2 no
// longer declares it, since the bundler rejects a path operation declared twice.
func TestUpdateUserPreferencesOperation(t *testing.T) {
	doc, err := loadAPISpec(filepath.Join(repoRootDir(t), userV1beta3Spec))
	if err != nil {
		t.Fatalf("load %s: %v", userV1beta3Spec, err)
	}
	item := doc.Paths.Find("/api/identity/users/preferences")
	if item == nil || item.Put == nil {
		t.Fatal("PUT /api/identity/users/preferences is not declared")
	}
	op := item.Put
	if op.OperationID != "updateUserPreferences" {
		t.Errorf("operationId = %q, want updateUserPreferences", op.OperationID)
	}
	payload := doc.Components.Schemas["PreferencePayload"]
	if payload == nil || payload.Value == nil {
		t.Fatal("components.schemas.PreferencePayload is not declared")
	}
	if op.RequestBody == nil || op.RequestBody.Value == nil {
		t.Fatal("PUT /api/identity/users/preferences declares no requestBody")
	}
	media := op.RequestBody.Value.Content.Get("application/json")
	if media == nil || media.Schema == nil {
		t.Fatal("requestBody declares no application/json schema")
	}
	if media.Schema.Value != payload.Value {
		t.Error("requestBody does not resolve to PreferencePayload")
	}
	created := op.Responses.Status(201)
	if created == nil || created.Value == nil || len(created.Value.Content) != 0 {
		t.Error("201 must be declared with no body")
	}
}

func TestPreferencePayloadRequestValidation(t *testing.T) {
	doc, err := loadAPISpec(filepath.Join(repoRootDir(t), userV1beta3Spec))
	if err != nil {
		t.Fatalf("load %s: %v", userV1beta3Spec, err)
	}
	ref := doc.Components.Schemas["PreferencePayload"]
	if ref == nil || ref.Value == nil {
		t.Fatal("components.schemas.PreferencePayload is not declared")
	}
	payload := ref.Value
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
		{"clears agentsActWithoutApproval", map[string]any{"agentsActWithoutApproval": false}, false},
		{"agentsActWithoutApproval is not a boolean", map[string]any{"agentsActWithoutApproval": "yes"}, true},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			err := payload.VisitJSON(tc.body, request...)
			if (err != nil) != tc.wantErr {
				t.Errorf("VisitJSON(%v) error = %v, wantErr %v", tc.body, err, tc.wantErr)
			}
		})
	}
}

// The v1beta2 user spec keeps PreferencePayload for existing consumers of the
// generated type, but no longer declares the operation.
func TestUpdateUserPreferencesNotDeclaredInV1beta2(t *testing.T) {
	doc, err := loadAPISpec(filepath.Join(repoRootDir(t), userV1beta2Spec))
	if err != nil {
		t.Fatalf("load %s: %v", userV1beta2Spec, err)
	}
	if item := doc.Paths.Find("/api/identity/users/preferences"); item != nil && item.Put != nil {
		t.Error("PUT /api/identity/users/preferences must be declared in v1beta3 user only")
	}
	payload := doc.Components.Schemas["PreferencePayload"]
	if payload == nil || payload.Value == nil || !payload.Value.Deprecated {
		t.Error("v1beta2 PreferencePayload must stay declared and be marked deprecated")
	}
}
