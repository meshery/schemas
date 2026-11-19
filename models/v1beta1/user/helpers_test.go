package user

import (
	"testing"

	"github.com/gofrs/uuid"
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
	id := uuid.Must(uuid.NewV4())
	p := &Preference{}
	if err := p.Scan([]byte(`{"selectedOrganizationId":"` + id.String() + `"}`)); err != nil {
		t.Fatalf("scan with valid UUID should not error, got: %v", err)
	}
	if p.SelectedOrganizationId != id {
		t.Fatalf("expected %s, got %s", id, p.SelectedOrganizationId)
	}
}

// Meshery Server accepts the deprecated all-caps `selectedOrganizationID` on
// read (meshery/meshery#21191, server/models/preference.go), because rows
// persisted under that key exist in the wild. core.MapToStruct goes through
// encoding/json, whose field matching is case-insensitive, so such a row
// resolves onto the canonical field on its own.
//
// That only holds while the alias is NOT declared as its own property. Adding
// a `selectedOrganizationID` property to the OpenAPI generates a second field
// whose tag matches the legacy key exactly; encoding/json prefers the exact
// match, so the value would land on the alias and leave this field zero -
// silently un-selecting the organization for exactly the rows the alias exists
// to rescue. See meshery/schemas#1136.
func TestPreferenceScan_LegacyAllCapsKeyResolvesToCanonicalField(t *testing.T) {
	id := uuid.Must(uuid.NewV4())
	p := &Preference{}
	if err := p.Scan([]byte(`{"selectedOrganizationID":"` + id.String() + `"}`)); err != nil {
		t.Fatalf("scan with legacy all-caps key should not error, got: %v", err)
	}
	if p.SelectedOrganizationId != id {
		t.Fatalf("legacy all-caps key must resolve onto the canonical field: expected %s, got %s", id, p.SelectedOrganizationId)
	}
}
