package validation

import "testing"

// GORM ignores `db` tags, so without an explicit column it would map
// Connection.ConnectionType to "connection_type". The persisted column is
// "type", and v1beta2 ModelDefinition.Registrant (a v1beta3 Connection) is
// loaded through GORM, so the schema must pin the gorm column to match db.
func TestConnectionTypeGormColumnMatchesDBColumn(t *testing.T) {
	entity := loadYAMLMap(t, "schemas/constructs/v1beta3/connection/connection.yaml")
	tags := mustLookup(t, entity, "properties", "type", "x-oapi-codegen-extra-tags")

	if got := mustValue(tags, "db"); got != "type" {
		t.Errorf("Connection.type db = %v, want type", got)
	}
	if got := mustValue(tags, "gorm"); got != "column:type" {
		t.Errorf("Connection.type gorm = %v, want column:type", got)
	}
}
