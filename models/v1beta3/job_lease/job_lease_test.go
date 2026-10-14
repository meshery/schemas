package job_lease //nolint:staticcheck // ST1003: name is fixed by the generated job_lease.go in this package

import (
	"encoding/json"
	"testing"
	"time"

	"github.com/meshery/schemas/models/core"
)

func TestJobLeaseActionResponse_LostRaceMarshalsNull(t *testing.T) {
	out, err := json.Marshal(JobLeaseActionResponse{})
	if err != nil {
		t.Fatalf("marshal: %v", err)
	}
	if string(out) != `{"jobLease":null}` {
		t.Fatalf("expected lost race to marshal as null jobLease, got %s", out)
	}
}

func TestJobLeaseActionResponse_NullRoundTrip(t *testing.T) {
	var resp JobLeaseActionResponse
	if err := json.Unmarshal([]byte(`{"jobLease":null}`), &resp); err != nil {
		t.Fatalf("unmarshal: %v", err)
	}
	if resp.JobLease != nil {
		t.Fatalf("expected nil jobLease, got %+v", resp.JobLease)
	}

	if err := json.Unmarshal([]byte(`{"jobLease":{"command":"publish","status":"leased"}}`), &resp); err != nil {
		t.Fatalf("unmarshal: %v", err)
	}
	if resp.JobLease == nil || resp.JobLease.Command != "publish" {
		t.Fatalf("expected claimed row, got %+v", resp.JobLease)
	}
}

func TestJobLease_ReleasedClaimColumnsAreNull(t *testing.T) {
	out, err := json.Marshal(JobLease{Command: "publish", Status: "pending"})
	if err != nil {
		t.Fatalf("marshal: %v", err)
	}
	var wire map[string]any
	if err := json.Unmarshal(out, &wire); err != nil {
		t.Fatalf("unmarshal: %v", err)
	}
	for _, key := range []string{"runAt", "nextRunAt", "lastRunAt", "claimedAt", "leaseExpiresAt", "pausedAt", "lockedAt"} {
		v, ok := wire[key]
		if !ok || v != nil {
			t.Fatalf("expected %s to be null on the wire, got %v (present=%v)", key, v, ok)
		}
	}
}

func TestJobLease_ClaimedAtScansSQLNull(t *testing.T) {
	var claimedAt core.NullTime
	if err := claimedAt.Scan(nil); err != nil {
		t.Fatalf("scan NULL: %v", err)
	}
	if claimedAt.Valid {
		t.Fatalf("expected NULL claimedAt to scan as invalid")
	}

	now := time.Now().UTC().Truncate(time.Second)
	lease := JobLease{ClaimedAt: &core.NullTime{Time: now, Valid: true}}
	out, err := json.Marshal(lease)
	if err != nil {
		t.Fatalf("marshal: %v", err)
	}
	var back JobLease
	if err := json.Unmarshal(out, &back); err != nil {
		t.Fatalf("unmarshal: %v", err)
	}
	if back.ClaimedAt == nil || !back.ClaimedAt.Valid || !back.ClaimedAt.Time.Equal(now) {
		t.Fatalf("expected claimedAt %v to round-trip, got %+v", now, back.ClaimedAt)
	}
}
