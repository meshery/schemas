package user

import (
	"testing"

	"github.com/google/uuid"
)

func TestPreferenceScan_LegacyEmptySelectedOrganizationId(t *testing.T) {
	p := &Preference{}
	if err := p.Scan([]byte(`{"selectedOrganizationId":""}`)); err != nil {
		t.Fatalf("scan with empty selectedOrganizationId should not error, got: %v", err)
	}
	if p.SelectedOrganizationId != uuid.Nil {
		t.Fatalf("expected zero UUID, got %s", p.SelectedOrganizationId)
	}
}

func TestPreferenceScan_LegacyNonUUIDSelectedOrganizationId(t *testing.T) {
	p := &Preference{}
	if err := p.Scan([]byte(`{"selectedOrganizationId":"not-a-uuid"}`)); err != nil {
		t.Fatalf("scan with non-UUID selectedOrganizationId should not error, got: %v", err)
	}
	if p.SelectedOrganizationId != uuid.Nil {
		t.Fatalf("expected zero UUID, got %s", p.SelectedOrganizationId)
	}
}

func TestPreferenceScan_ValidSelectedOrganizationIdPreserved(t *testing.T) {
	id := uuid.New()
	p := &Preference{}
	if err := p.Scan([]byte(`{"selectedOrganizationId":"` + id.String() + `"}`)); err != nil {
		t.Fatalf("scan with valid UUID should not error, got: %v", err)
	}
	if p.SelectedOrganizationId != id {
		t.Fatalf("expected %s, got %s", id, p.SelectedOrganizationId)
	}
}
