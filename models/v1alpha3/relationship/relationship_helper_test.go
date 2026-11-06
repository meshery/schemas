package relationship

import (
	"path/filepath"
	"testing"

	"github.com/gofrs/uuid"
	"github.com/meshery/meshkit/database"
	capabilityv1alpha1 "github.com/meshery/schemas/models/v1alpha1/capability"
	"gorm.io/gorm/clause"
)

func testDefinition(subType string) RelationshipDefinition {
	modelID := uuid.Must(uuid.NewV4())
	return RelationshipDefinition{
		SchemaVersion:    "relationships.meshery.io/v1beta2",
		Version:          "v1.0.0",
		Kind:             Edge,
		RelationshipType: "non-binding",
		SubType:          subType,
		ModelId:          &modelID,
	}
}

// GenerateID must be content-addressed: the same definition resolves to the
// same ID, a semantically different one to a different ID. A random per-call
// UUID let every server restart and every re-import insert duplicate rows.
func TestGenerateIDIsContentAddressed(t *testing.T) {
	first := testDefinition("reference")
	second := first // same coordinates, fresh receiver

	firstID, err := first.GenerateID()
	if err != nil {
		t.Fatalf("first GenerateID: %v", err)
	}
	secondID, err := second.GenerateID()
	if err != nil {
		t.Fatalf("second GenerateID: %v", err)
	}
	if firstID != secondID {
		t.Fatalf("identical definitions hashed differently: %s vs %s", firstID, secondID)
	}

	other := first
	other.SubType = "network"
	otherID, err := other.GenerateID()
	if err != nil {
		t.Fatalf("other GenerateID: %v", err)
	}
	if otherID == firstID {
		t.Fatal("semantically different definitions hashed identically")
	}

	// ModelId is json:"-" on the entity, so hashing the entity itself would
	// silently drop it and let the same relationship shipped by two models
	// share one ID. The identity struct must carry it explicitly.
	otherModel := first
	otherModelID := uuid.Must(uuid.NewV4())
	otherModel.ModelId = &otherModelID
	otherModelHash, err := otherModel.GenerateID()
	if err != nil {
		t.Fatalf("otherModel GenerateID: %v", err)
	}
	if otherModelHash == firstID {
		t.Fatal("definitions under different models hashed identically: ModelId is not part of the identity")
	}

	// Capabilities are behavioral metadata, not identity: a definition that
	// differs only in capabilities is the same relationship.
	withCaps := first
	withCaps.Capabilities = &[]capabilityv1alpha1.Capability{{DisplayName: "cap"}}
	withCapsID, err := withCaps.GenerateID()
	if err != nil {
		t.Fatalf("withCaps GenerateID: %v", err)
	}
	if withCapsID != firstID {
		t.Fatal("capabilities changed the relationship identity")
	}
}

// Create must be idempotent: registering the same definition twice resolves to
// the same ID and persists exactly one row, the way ModelDefinition.Create
// treats an existing model.
func TestCreateIsIdempotent(t *testing.T) {
	handler, err := database.New(database.Options{
		Engine:   database.SQLITE,
		Filename: ":memory:",
	})
	if err != nil {
		t.Fatalf("open in-memory sqlite: %v", err)
	}
	if err := handler.AutoMigrate(&RelationshipDefinition{}); err != nil {
		t.Fatalf("automigrate: %v", err)
	}

	hostID := uuid.Must(uuid.NewV4())
	first := testDefinition("reference")
	second := first

	firstID, err := first.Create(&handler, hostID)
	if err != nil {
		t.Fatalf("first create: %v", err)
	}
	secondID, err := second.Create(&handler, hostID)
	if err != nil {
		t.Fatalf("second create: %v", err)
	}
	if secondID != firstID {
		t.Fatalf("re-registration resolved a different ID: got %s, want %s", secondID, firstID)
	}

	var count int64
	if err := handler.Model(&RelationshipDefinition{}).Count(&count).Error; err != nil {
		t.Fatalf("count relationships: %v", err)
	}
	if count != 1 {
		t.Fatalf("expected exactly one persisted relationship, found %d", count)
	}
}

// Registration must be idempotent across separate database connections, the
// multi-process shape (server replicas sharing a database) that the in-process
// creation lock cannot serialize. The racing window itself is closed by the
// ON CONFLICT DO NOTHING insert - a loser's duplicate insert becomes a no-op
// and the content-addressed ID is the same either way - which this test
// exercises end to end through two independent connections to one database.
func TestCreateIsIdempotentAcrossConnections(t *testing.T) {
	dbFile := filepath.Join(t.TempDir(), "registry.db")

	open := func() database.Handler {
		handler, err := database.New(database.Options{
			Engine:   database.SQLITE,
			Filename: dbFile,
		})
		if err != nil {
			t.Fatalf("open sqlite: %v", err)
		}
		return handler
	}

	first := open()
	if err := first.AutoMigrate(&RelationshipDefinition{}); err != nil {
		t.Fatalf("automigrate: %v", err)
	}
	second := open()

	hostID := uuid.Must(uuid.NewV4())
	defA := testDefinition("reference")
	defB := defA

	firstID, err := defA.Create(&first, hostID)
	if err != nil {
		t.Fatalf("create on first connection: %v", err)
	}
	secondID, err := defB.Create(&second, hostID)
	if err != nil {
		t.Fatalf("create on second connection: %v", err)
	}
	if secondID != firstID {
		t.Fatalf("connections resolved different IDs: %s vs %s", secondID, firstID)
	}

	var count int64
	if err := second.Model(&RelationshipDefinition{}).Count(&count).Error; err != nil {
		t.Fatalf("count relationships: %v", err)
	}
	if count != 1 {
		t.Fatalf("expected exactly one persisted relationship, found %d", count)
	}
}

// insertIgnoringConflict is the ON CONFLICT DO NOTHING seam Create relies on
// when two processes both pass the exists check. Sequential Create calls never
// reach it (the second call returns from the lookup), so drive it directly: a
// second insert of an already-persisted ID must be a no-op, not a
// duplicate-key error, and must leave exactly one row.
func TestInsertIgnoringConflictIsNoOpOnDuplicate(t *testing.T) {
	handler, err := database.New(database.Options{
		Engine:   database.SQLITE,
		Filename: ":memory:",
	})
	if err != nil {
		t.Fatalf("open in-memory sqlite: %v", err)
	}
	if err := handler.AutoMigrate(&RelationshipDefinition{}); err != nil {
		t.Fatalf("automigrate: %v", err)
	}

	def := testDefinition("reference")
	id, err := def.GenerateID()
	if err != nil {
		t.Fatalf("GenerateID: %v", err)
	}
	def.ID = id

	if err := def.insertIgnoringConflict(&handler); err != nil {
		t.Fatalf("first insert: %v", err)
	}
	// Plain Create must collide, proving the primary key actually guards the row.
	dup := def
	if err := handler.Omit(clause.Associations).Create(&dup).Error; err == nil {
		t.Fatal("plain insert of a duplicate ID unexpectedly succeeded")
	}
	// The conflict-tolerant insert must swallow that same collision.
	loser := def
	if err := loser.insertIgnoringConflict(&handler); err != nil {
		t.Fatalf("conflicting insert returned an error instead of a no-op: %v", err)
	}

	var count int64
	if err := handler.Model(&RelationshipDefinition{}).Count(&count).Error; err != nil {
		t.Fatalf("count relationships: %v", err)
	}
	if count != 1 {
		t.Fatalf("expected exactly one persisted relationship, found %d", count)
	}
}
