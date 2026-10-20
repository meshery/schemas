package validation

import (
	"path/filepath"
	"testing"

	"github.com/getkin/kin-openapi/openapi3"
)

// The organization-wide pause is data in organization preferences. Its
// server-recorded fields are readOnly and the object is closed, so a client
// request cannot forge them.
func TestOrgSchedulePauseRequestValidation(t *testing.T) {
	doc, err := loadAPISpec(filepath.Join(repoRootDir(t), organizationSpec))
	if err != nil {
		t.Fatalf("load %s: %v", organizationSpec, err)
	}
	pause := doc.Components.Schemas["SchedulePause"].Value

	request := []openapi3.SchemaValidationOption{openapi3.VisitAsRequest()}
	response := []openapi3.SchemaValidationOption{openapi3.VisitAsResponse()}
	cases := []struct {
		name    string
		body    map[string]any
		opts    []openapi3.SchemaValidationOption
		wantErr bool
	}{
		{"request sets paused and reason", map[string]any{"paused": true, "reason": "maintenance"}, request, false},
		{"request forges pausedBy", map[string]any{"paused": true, "pausedBy": "mallory"}, request, true},
		{"request forges pausedAt", map[string]any{"paused": true, "pausedAt": "2026-10-20T00:00:00Z"}, request, true},
		{"request carries unknown field", map[string]any{"paused": false, "extra": 1}, request, true},
		{"response reports pausedBy and pausedAt", map[string]any{"paused": true, "pausedBy": "admin", "pausedAt": "2026-10-20T00:00:00Z"}, response, false},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			err := pause.VisitJSON(tc.body, tc.opts...)
			if (err != nil) != tc.wantErr {
				t.Errorf("VisitJSON(%v) error = %v, wantErr %v", tc.body, err, tc.wantErr)
			}
		})
	}
}

// Only organization admins may change the org pause, so every write path that
// carries preferences documents and enforces a 403 refusal.
func TestOrgPreferenceWriteOperationsRefuseNonAdmin(t *testing.T) {
	doc, err := loadAPISpec(filepath.Join(repoRootDir(t), organizationSpec))
	if err != nil {
		t.Fatalf("load %s: %v", organizationSpec, err)
	}
	ops := []struct{ path, method string }{
		{"/api/identity/orgs", "POST"},
		{"/api/identity/orgs/{orgId}", "PUT"},
		{"/api/identity/orgs/{orgId}/children", "POST"},
	}
	for _, op := range ops {
		operation := doc.Paths.Value(op.path).GetOperation(op.method)
		if operation == nil {
			t.Fatalf("%s %s is missing", op.method, op.path)
		}
		if operation.Responses.Value("403") == nil {
			t.Errorf("%s %s must answer 403 for a non-admin schedulePause change", op.method, op.path)
		}
	}
}

// A schedule payload is closed, so a client cannot set server-managed pause
// bookkeeping on create or update.
func TestSchedulePayloadRefusesServerPauseFields(t *testing.T) {
	doc, err := loadAPISpec(filepath.Join(repoRootDir(t), scheduleV1beta3Spec))
	if err != nil {
		t.Fatalf("load %s: %v", scheduleV1beta3Spec, err)
	}
	payload := doc.Components.Schemas["SchedulePayload"].Value
	request := []openapi3.SchemaValidationOption{openapi3.VisitAsRequest()}

	cases := []struct {
		name    string
		body    map[string]any
		wantErr bool
	}{
		{"client pauses with reason", map[string]any{"name": "nightly", "action": "sync", "paused": true, "pauseReason": "maintenance"}, false},
		{"client forges pausedBy", map[string]any{"name": "nightly", "action": "sync", "pausedBy": "mallory"}, true},
		{"client forges pausedAt", map[string]any{"name": "nightly", "action": "sync", "pausedAt": "2026-10-20T00:00:00Z"}, true},
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
