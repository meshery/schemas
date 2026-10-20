package validation

import (
	"path/filepath"
	"testing"

	"github.com/getkin/kin-openapi/openapi3"
)

// The organization-wide pause is data in organization preferences. Writes go
// through SchedulePausePayload, which is closed and requires paused, so a
// client request cannot forge the server-recorded fields or omit paused.
func TestOrgSchedulePauseRequestValidation(t *testing.T) {
	doc, err := loadAPISpec(filepath.Join(repoRootDir(t), organizationSpec))
	if err != nil {
		t.Fatalf("load %s: %v", organizationSpec, err)
	}
	payload := doc.Components.Schemas["SchedulePausePayload"].Value
	pause := doc.Components.Schemas["SchedulePause"].Value

	request := []openapi3.SchemaValidationOption{openapi3.VisitAsRequest()}
	response := []openapi3.SchemaValidationOption{openapi3.VisitAsResponse()}
	cases := []struct {
		name    string
		schema  *openapi3.Schema
		body    map[string]any
		opts    []openapi3.SchemaValidationOption
		wantErr bool
	}{
		{"request sets paused and reason", payload, map[string]any{"paused": true, "reason": "maintenance"}, request, false},
		{"request lifts pause", payload, map[string]any{"paused": false}, request, false},
		{"request omits paused", payload, map[string]any{"reason": "freeze"}, request, true},
		{"request empty body omits paused", payload, map[string]any{}, request, true},
		{"request forges pausedBy", payload, map[string]any{"paused": true, "pausedBy": "mallory"}, request, true},
		{"request forges pausedAt", payload, map[string]any{"paused": true, "pausedAt": "2026-10-20T00:00:00Z"}, request, true},
		{"request carries unknown field", payload, map[string]any{"paused": false, "extra": 1}, request, true},
		{"response reports pausedBy and pausedAt", pause, map[string]any{"paused": true, "pausedBy": "admin", "pausedAt": "2026-10-20T00:00:00Z"}, response, false},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			err := tc.schema.VisitJSON(tc.body, tc.opts...)
			if (err != nil) != tc.wantErr {
				t.Errorf("VisitJSON(%v) error = %v, wantErr %v", tc.body, err, tc.wantErr)
			}
		})
	}
}

// Every organization write path that carries preferences must resolve
// schedulePause to the closed SchedulePausePayload, so reverting either
// reference to the server-recorded SchedulePause would reopen forged writes.
func TestOrgPreferenceWritePathResolvesClosedPausePayload(t *testing.T) {
	doc, err := loadAPISpec(filepath.Join(repoRootDir(t), organizationSpec))
	if err != nil {
		t.Fatalf("load %s: %v", organizationSpec, err)
	}
	closedPause := doc.Components.Schemas["SchedulePausePayload"].Value

	orgPrefs := doc.Components.Schemas["OrganizationPayload"].Value.Properties["preferences"].Value
	prefsPayloadPause := doc.Components.Schemas["PreferencesPayload"].Value.Properties["schedulePause"].Value
	paths := map[string]*openapi3.Schema{
		"OrganizationPayload.preferences.schedulePause": orgPrefs.Properties["schedulePause"].Value,
		"PreferencesPayload.schedulePause":              prefsPayloadPause,
	}
	request := []openapi3.SchemaValidationOption{openapi3.VisitAsRequest()}
	bodies := []struct {
		name    string
		body    map[string]any
		wantErr bool
	}{
		{"sets paused", map[string]any{"paused": true, "reason": "freeze"}, false},
		{"omits paused", map[string]any{"reason": "freeze"}, true},
		{"forges pausedBy", map[string]any{"paused": true, "pausedBy": "mallory"}, true},
		{"forges pausedAt", map[string]any{"paused": true, "pausedAt": "2026-10-20T00:00:00Z"}, true},
	}
	for name, schema := range paths {
		if schema != closedPause {
			t.Errorf("%s does not resolve to SchedulePausePayload", name)
		}
		for _, bc := range bodies {
			t.Run(name+" "+bc.name, func(t *testing.T) {
				err := schema.VisitJSON(bc.body, request...)
				if (err != nil) != bc.wantErr {
					t.Errorf("VisitJSON(%v) error = %v, wantErr %v", bc.body, err, bc.wantErr)
				}
			})
		}
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

func TestSchedulePayloadDeclaresNoServerManagedFields(t *testing.T) {
	doc, err := loadAPISpec(filepath.Join(repoRootDir(t), scheduleV1beta3Spec))
	if err != nil {
		t.Fatalf("load %s: %v", scheduleV1beta3Spec, err)
	}
	payload := doc.Components.Schemas["SchedulePayload"].Value
	for _, name := range []string{"claim", "pausedAt", "pausedBy", "retryCount", "lastRunAt", "lastError", "organizationId", "createdAt", "updatedAt"} {
		if _, ok := payload.Properties[name]; ok {
			t.Errorf("SchedulePayload must not declare server-managed property %q", name)
		}
	}
}

// A schedule payload stays open, so a read-modify-write update that echoes
// server-managed pause bookkeeping back is accepted; the server ignores it.
func TestSchedulePayloadAcceptsEchoedServerPauseFields(t *testing.T) {
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
		{"echoed pausedBy is ignored", map[string]any{"name": "nightly", "action": "sync", "pausedBy": "mallory"}, false},
		{"echoed pausedAt is ignored", map[string]any{"name": "nightly", "action": "sync", "pausedAt": "2026-10-20T00:00:00Z"}, false},
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
