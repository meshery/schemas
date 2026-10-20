package validation

import (
	"os"
	"path/filepath"
	"reflect"
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
	for _, name := range []string{"resourceType", "resourceId", "claimant", "claimedAt", "expiresAt", "status"} {
		if _, ok := props[name]; !ok {
			t.Errorf("Claim must carry %q", name)
		}
	}
	if got := sequenceStrings(props["status"].(map[string]any)["enum"]); !reflect.DeepEqual(got, []string{"active", "released", "expired"}) {
		t.Errorf("Claim status enum = %v", got)
	}
}

// A schedule is a job; it is claimed through the generic claim, nested under
// the schedule, and its status covers assignment and claiming.
func TestScheduleClaimContract(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), scheduleV1beta3Spec))
	ops := []struct{ path, method, operationID string }{
		{"/api/schedules", "get", "listSchedules"},
		{"/api/schedules", "post", "createSchedule"},
		{"/api/schedules/claim", "post", "claimNextSchedule"},
		{"/api/schedules/{scheduleId}", "get", "getScheduleById"},
		{"/api/schedules/{scheduleId}", "put", "updateSchedule"},
		{"/api/schedules/{scheduleId}", "delete", "deleteScheduleById"},
		{"/api/schedules/{scheduleId}/claim", "post", "claimSchedule"},
		{"/api/schedules/{scheduleId}/claim/renew", "post", "renewScheduleClaim"},
		{"/api/schedules/{scheduleId}/claim/release", "post", "releaseScheduleClaim"},
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
	// A lost race is not an error: claiming the next due schedule answers 204.
	if _, ok := mappingValue(mustLookup(t, doc, "paths", "/api/schedules/claim", "post", "responses"), "204"); !ok {
		t.Errorf("claimNextSchedule must answer 204 when nothing is claimable")
	}
	if got := mustLookup(t, doc, "paths", "/api/schedules/{scheduleId}/claim/renew", "post", "requestBody", "content", "application/json", "schema", "$ref"); got != "../claim/api.yml#/components/schemas/ClaimRenewPayload" {
		t.Errorf("renewScheduleClaim body = %v, want the claim construct's ClaimRenewPayload", got)
	}

	entity := loadYAMLMap(t, scheduleV1beta3Ent)
	props := entity["properties"].(map[string]any)
	want := []string{"pending", "scheduled", "assigned", "claimed", "running", "retrying", "completed", "failed", "cancelled"}
	if got := sequenceStrings(props["status"].(map[string]any)["enum"]); !reflect.DeepEqual(got, want) {
		t.Errorf("Schedule status enum = %v, want %v", got, want)
	}
	if got := props["claim"].(map[string]any)["$ref"]; got != "../claim/api.yml#/components/schemas/Claim" {
		t.Errorf("Schedule.claim = %v, want the claim construct", got)
	}
	// Status never goes in a path: pause and resume are fields, not routes.
	paths := mustValue(doc, "paths").(map[string]any)
	for path := range paths {
		if strings.HasSuffix(path, "/pause") || strings.HasSuffix(path, "/resume") {
			t.Errorf("schedule contract must not route pause state: %s", path)
		}
	}
	// Claim state and pause bookkeeping are server-managed: never in the payload.
	payload := mustLookup(t, doc, "components", "schemas", "SchedulePayload", "properties")
	for _, name := range []string{"paused", "pauseReason"} {
		if _, has := mappingValue(payload, name); !has {
			t.Errorf("SchedulePayload must carry client-settable %q", name)
		}
	}
	for _, name := range []string{"claim", "pausedAt", "pausedBy", "retryCount", "organizationId"} {
		if _, has := mappingValue(payload, name); has {
			t.Errorf("SchedulePayload must not carry server-managed %q", name)
		}
	}
	if got := sequenceStrings(mustLookup(t, payload, "status", "enum")); !reflect.DeepEqual(got, []string{"pending", "scheduled", "cancelled"}) {
		t.Errorf("SchedulePayload status enum = %v", got)
	}
}
