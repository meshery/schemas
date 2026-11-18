package connection

import (
	"reflect"
	"testing"
)

// GORM ignores `db` tags and would map ConnectionType to "connection_type"
// by default. The persisted column is "type" (see the `db` tag), and
// v1beta2 ModelDefinition.Registrant is loaded through GORM, so the gorm
// column must be pinned explicitly.
func TestConnectionTypeGormColumnIsType(t *testing.T) {
	f, ok := reflect.TypeOf(Connection{}).FieldByName("ConnectionType")
	if !ok {
		t.Fatal("Connection.ConnectionType field not found")
	}
	if got := f.Tag.Get("db"); got != "type" {
		t.Fatalf("db tag = %q, want %q", got, "type")
	}
	if got := f.Tag.Get("gorm"); got != "column:type" {
		t.Fatalf("gorm tag = %q, want %q", got, "column:type")
	}
}
