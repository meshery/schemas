package user

import (
	"testing"
)

const zeroUUID = "00000000-0000-0000-0000-000000000000"
const testUUID = "12345678-1234-1234-1234-123456789012"

func TestPreferenceScan_LegacyEmptySelectedOrganizationId(t *testing.T) {
	p := &Preference{}
	if err := p.Scan([]byte(`{"selectedOrganizationId":""}`)); err != nil {
		t.Fatalf("scan with empty selectedOrganizationId should not error, got: %v", err)
	}
	if p.SelectedOrganizationId.String() != zeroUUID {
		t.Fatalf("expected zero UUID, got %s", p.SelectedOrganizationId)
	}
}

func TestPreferenceScan_LegacyNonUUIDSelectedOrganizationId(t *testing.T) {
	p := &Preference{}
	if err := p.Scan([]byte(`{"selectedOrganizationId":"not-a-uuid"}`)); err != nil {
		t.Fatalf("scan with non-UUID selectedOrganizationId should not error, got: %v", err)
	}
	if p.SelectedOrganizationId.String() != zeroUUID {
		t.Fatalf("expected zero UUID, got %s", p.SelectedOrganizationId)
	}
}

func TestPreferenceScan_ValidSelectedOrganizationIdPreserved(t *testing.T) {
	p := &Preference{}
	if err := p.Scan([]byte(`{"selectedOrganizationId":"` + testUUID + `"}`)); err != nil {
		t.Fatalf("scan with valid UUID should not error, got: %v", err)
	}
	if p.SelectedOrganizationId.String() != testUUID {
		t.Fatalf("expected %s, got %s", testUUID, p.SelectedOrganizationId)
	}
}
