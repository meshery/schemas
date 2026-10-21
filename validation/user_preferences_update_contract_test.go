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
// Cloud handler does.
func TestUpdateUserPreferencesOperation(t *testing.T) {
	doc, err := loadAPISpec(filepath.Join(repoRootDir(t), userV1beta2Spec))
	if err != nil {
		t.Fatalf("load %s: %v", userV1beta2Spec, err)
	}
	item := doc.Paths.Find("/api/identity/users/preferences")
	if item == nil || item.Put == nil {
		t.Fatal("PUT /api/identity/users/preferences is not declared")
	}
	op := item.Put
	if op.OperationID != "updateUserPreferences" {
		t.Errorf("operationId = %q, want updateUserPreferences", op.OperationID)
	}
	body := op.RequestBody.Value.Content.Get("application/json").Schema
	if body.Value != doc.Components.Schemas["PreferencePayload"].Value {
		t.Error("requestBody does not resolve to PreferencePayload")
	}
	created := op.Responses.Status(201)
	if created == nil || len(created.Value.Content) != 0 {
		t.Error("201 must be declared with no body")
	}
}

func TestPreferencePayloadRequestValidation(t *testing.T) {
	doc, err := loadAPISpec(filepath.Join(repoRootDir(t), userV1beta2Spec))
	if err != nil {
		t.Fatalf("load %s: %v", userV1beta2Spec, err)
	}
	payload := doc.Components.Schemas["PreferencePayload"].Value
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
