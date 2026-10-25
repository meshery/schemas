package validation

import (
	"os"
	"path/filepath"
	"reflect"
	"regexp"
	"strings"
	"testing"

	"gopkg.in/yaml.v3"
)

const (
	claimV1beta3Spec    = "schemas/constructs/v1beta3/claim/api.yml"
	claimV1beta3Entity  = "schemas/constructs/v1beta3/claim/claim.yaml"
	scheduleV1beta3Spec = "schemas/constructs/v1beta3/schedule/api.yml"
	scheduleV1beta3Ent  = "schemas/constructs/v1beta3/schedule/schedule.yaml"
)

func loadYAMLMap(t *testing.T, rel string) map[string]any {
	t.Helper()
	raw, err := os.ReadFile(filepath.Join(repoRootDir(t), rel))
	if err != nil {
		t.Fatalf("read %s: %v", rel, err)
	}
	var out map[string]any
	if err := yaml.Unmarshal(raw, &out); err != nil {
		t.Fatalf("parse %s: %v", rel, err)
	}
	return out
}

// A claim is a generic, standalone construct: it names the resource it holds
// by type and ID, so any construct can be claimed.
func TestClaimContract(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), claimV1beta3Spec))
	ops := []struct{ path, method, operationID string }{
		{"/api/claims", "get", "listClaims"},
		{"/api/claims", "post", "createClaim"},
		{"/api/claims/{claimId}", "get", "getClaim"},
		{"/api/claims/{claimId}/renew", "post", "renewClaim"},
		{"/api/claims/{claimId}/release", "post", "releaseClaim"},
	}
	for _, op := range ops {
		operation := mustLookup(t, doc, "paths", op.path, op.method)
		if got := mustValue(operation, "operationId"); got != op.operationID {
			t.Errorf("%s %s operationId = %v, want %q", op.method, op.path, got, op.operationID)
		}
	}
	for _, p := range []string{"/api/claims", "/api/claims/{claimId}/renew", "/api/claims/{claimId}/release"} {
		if _, ok := mappingValue(mustLookup(t, doc, "paths", p, "post", "responses"), "409"); !ok {
			t.Errorf("POST %s must answer 409 when another claimant holds the claim", p)
		}
	}

	entity := loadYAMLMap(t, claimV1beta3Entity)
	props := entity["properties"].(map[string]any)
	for _, name := range []string{"resourceType", "resourceId", "claimantConnectionId", "claimantUserId", "claimedAt", "expiresAt", "status"} {
		if _, ok := props[name]; !ok {
			t.Errorf("Claim must carry %q", name)
		}
	}
	if got := sequenceStrings(props["status"].(map[string]any)["enum"]); !reflect.DeepEqual(got, []string{"active", "released", "expired"}) {
		t.Errorf("Claim status enum = %v", got)
	}
}

// A schedule is a job. It is claimed only through the generic claim at
// /api/claims: the schedule contract defines no claim route of its own and
// carries its live claim as a read-only view.
func TestScheduleClaimContract(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), scheduleV1beta3Spec))
	ops := []struct{ path, method, operationID string }{
		{"/api/schedules", "get", "listSchedules"},
		{"/api/schedules", "post", "createSchedule"},
		{"/api/schedules/{scheduleId}", "get", "getScheduleById"},
		{"/api/schedules/{scheduleId}", "put", "updateSchedule"},
		{"/api/schedules/{scheduleId}", "delete", "deleteScheduleById"},
		{"/api/workspaces/{workspaceId}/schedules", "get", "getSchedulesOfWorkspace"},
		{"/api/workspaces/{workspaceId}/schedules/{scheduleId}", "post", "assignScheduleToWorkspace"},
		{"/api/workspaces/{workspaceId}/schedules/{scheduleId}", "delete", "unassignScheduleFromWorkspace"},
	}
	for _, op := range ops {
		operation := mustLookup(t, doc, "paths", op.path, op.method)
		if got := mustValue(operation, "operationId"); got != op.operationID {
			t.Errorf("%s %s operationId = %v, want %q", op.method, op.path, got, op.operationID)
		}
		if got := sequenceStrings(mustValue(operation, "x-internal")); !reflect.DeepEqual(got, []string{"cloud"}) {
			t.Errorf("%s x-internal = %v, want [cloud]", op.operationID, got)
		}
	}
	paths := mustValue(doc, "paths").(map[string]any)
	for path := range paths {
		// One claim path: schedules are claimed at /api/claims.
		if strings.Contains(path, "/claim") {
			t.Errorf("schedule contract must not define its own claim route: %s", path)
		}
		// Status never goes in a path: pause and resume are fields, not routes.
		if strings.HasSuffix(path, "/pause") || strings.HasSuffix(path, "/resume") {
			t.Errorf("schedule contract must not route pause state: %s", path)
		}
	}
	schemas := mustLookup(t, doc, "components", "schemas").(map[string]any)
	for _, gone := range []string{"ScheduleClaimRequest", "ScheduleTargetedClaimRequest", "ScheduleClaimReleaseRequest"} {
		if _, has := schemas[gone]; has {
			t.Errorf("schedule contract must not define %s; claims use the claim construct", gone)
		}
	}

	// Optimistic concurrency: GET answers an ETag, PUT honours If-Match with 412.
	if _, ok := mappingValue(mustLookup(t, doc, "paths", "/api/schedules/{scheduleId}", "get", "responses", "200", "headers"), "ETag"); !ok {
		t.Errorf("getScheduleById must answer an ETag header")
	}
	if _, ok := mappingValue(mustLookup(t, doc, "paths", "/api/schedules/{scheduleId}", "put", "responses"), "412"); !ok {
		t.Errorf("updateSchedule must answer 412 when If-Match is stale")
	}
	if got := mustLookup(t, doc, "components", "parameters", "ifMatch", "name"); got != "If-Match" {
		t.Errorf("ifMatch parameter name = %v", got)
	}
	link := mustLookup(t, doc, "paths", "/api/workspaces/{workspaceId}/schedules/{scheduleId}").(map[string]any)
	if _, ok := mappingValue(mustLookup(t, link, "post", "responses"), "400"); !ok {
		t.Errorf("assignScheduleToWorkspace must answer 400")
	}
	if _, ok := mappingValue(mustLookup(t, link, "delete", "responses"), "204"); !ok {
		t.Errorf("unassignScheduleFromWorkspace must answer 204")
	}

	// The status enum is declared once and referenced everywhere.
	want := []string{"pending", "scheduled", "assigned", "claimed", "running", "retrying", "completed", "failed", "cancelled"}
	if got := sequenceStrings(mustLookup(t, doc, "components", "schemas", "ScheduleStatus", "enum")); !reflect.DeepEqual(got, want) {
		t.Errorf("ScheduleStatus enum = %v, want %v", got, want)
	}
	if got := mustLookup(t, doc, "components", "parameters", "statusQuery", "schema", "$ref"); got != "#/components/schemas/ScheduleStatus" {
		t.Errorf("statusQuery schema = %v, want the ScheduleStatus ref", got)
	}

	entity := loadYAMLMap(t, scheduleV1beta3Ent)
	props := entity["properties"].(map[string]any)
	if got := props["status"].(map[string]any)["$ref"]; got != "./api.yml#/components/schemas/ScheduleStatus" {
		t.Errorf("Schedule.status = %v, want the ScheduleStatus ref", got)
	}
	claim := props["claim"].(map[string]any)
	if got := claim["$ref"]; got != "../claim/api.yml#/components/schemas/Claim" {
		t.Errorf("Schedule.claim = %v, want the claim construct", got)
	}
	for _, name := range []string{"id", "organizationId", "createdBy", "claim", "pausedAt", "pausedBy", "lastRunAt", "lastError", "createdAt", "updatedAt", "deletedAt"} {
		if ro, _ := props[name].(map[string]any)["readOnly"].(bool); !ro {
			t.Errorf("Schedule.%s is server-managed and must be readOnly", name)
		}
	}
	for name, max := range map[string]int{"lastError": 5000, "pauseReason": 1000} {
		if got := props[name].(map[string]any)["maxLength"]; got != max {
			t.Errorf("Schedule.%s maxLength = %v, want %d", name, got, max)
		}
	}
	if got := props["pausedBy"].(map[string]any)["$ref"]; got != "../../v1beta2/core/api.yml#/components/schemas/Uuid" {
		t.Errorf("Schedule.pausedBy = %v, want a user ID", got)
	}
	for _, name := range []string{"createdBy", "timezone", "targetType", "targetId", "recurrence"} {
		if _, ok := props[name]; !ok {
			t.Errorf("Schedule must carry %q", name)
		}
	}
	// The legacy next_run and last_run columns carry the run times.
	for name, col := range map[string]string{"nextRunAt": "next_run", "lastRunAt": "last_run", "createdBy": "owner"} {
		if got := props[name].(map[string]any)["x-oapi-codegen-extra-tags"].(map[string]any)["db"]; got != col {
			t.Errorf("Schedule.%s db = %v, want %q", name, got, col)
		}
	}

	payload := mustLookup(t, doc, "components", "schemas", "SchedulePayload").(map[string]any)
	if got := payload["additionalProperties"]; got != false {
		t.Errorf("SchedulePayload additionalProperties = %v, want false", got)
	}
	payloadProps := payload["properties"].(map[string]any)
	for _, name := range []string{"paused", "pauseReason", "nextRunAt", "retryCount", "timezone", "targetType", "targetId"} {
		if _, has := payloadProps[name]; !has {
			t.Errorf("SchedulePayload must carry client-settable %q", name)
		}
	}
	for _, name := range []string{"claim", "pausedAt", "pausedBy", "lastRunAt", "lastError", "organizationId", "createdBy"} {
		if _, has := payloadProps[name]; has {
			t.Errorf("SchedulePayload must not carry server-managed %q", name)
		}
	}
	for name, def := range map[string]any{"enabled": true, "maxRetries": 0, "retryDelayMinutes": 0} {
		if got := payloadProps[name].(map[string]any)["default"]; got != def {
			t.Errorf("SchedulePayload.%s default = %v, want %v", name, got, def)
		}
	}
}

// The recurrence grammar is defined, so every client and server agrees on
// which values repeat and how.
func TestScheduleRecurrenceGrammar(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), scheduleV1beta3Spec))
	pattern, _ := mustLookup(t, doc, "components", "schemas", "ScheduleRecurrence", "pattern").(string)
	re := regexp.MustCompile(pattern)
	for _, ok := range []string{"", "once", "none", "hourly", "daily", "weekly", "monthly", "every:1", "every:1440"} {
		if !re.MatchString(ok) {
			t.Errorf("recurrence %q must be accepted", ok)
		}
	}
	for _, bad := range []string{"every:0", "every:", "every:5m", "Daily", "0 * * * *", "yearly", "every:-1"} {
		if re.MatchString(bad) {
			t.Errorf("recurrence %q must be refused", bad)
		}
	}
}
