package connection

import "testing"

// tableNameAble mirrors gobuffalo/pop's (and GORM's) interface for overriding a
// model's default table name. Pop consults it before falling back to the
// pluralized struct name ("connections" for Connection).
type tableNameAble interface{ TableName() string }

// TestConnectionDoesNotInheritDefinitionTableName guards a regression in which
// ConnectionDefinition was declared as a type ALIAS of Connection
// (`type ConnectionDefinition = Connection`). Go aliases share one method set,
// so the registry-entity TableName() => "connection_definition_dbs" defined on
// ConnectionDefinition leaked onto Connection itself. Every Pop/GORM persistence
// of a runtime Connection (which lives in the `connections` table) was then
// redirected to the registry-only `connection_definition_dbs` table, producing
// `pq: relation "connection_definition_dbs" does not exist` and 500-ing
// connection writes - e.g. Meshery Server saving its connection to the remote
// provider.
//
// Connection MUST NOT implement TableName(); ConnectionDefinition is a distinct
// defined type that does. The assertions use the pointer types (*Connection,
// *ConnectionDefinition) because pop/GORM operate on pointers and a pointer's
// method set includes both value- and pointer-receiver methods, whereas a
// value's includes only value-receiver methods. Checking the pointer therefore
// catches a re-leaked TableName() regardless of which receiver form it takes.
func TestConnectionDoesNotInheritDefinitionTableName(t *testing.T) {
	if tn, leaked := any(&Connection{}).(tableNameAble); leaked {
		t.Fatalf("Connection unexpectedly implements TableName() => %q; it must use pop's default \"connections\" table. ConnectionDefinition must be a distinct type, not a `= Connection` alias.", tn.TableName())
	}

	if got := (&ConnectionDefinition{}).TableName(); got != "connection_definition_dbs" {
		t.Fatalf("ConnectionDefinition.TableName() = %q, want \"connection_definition_dbs\"", got)
	}
}
