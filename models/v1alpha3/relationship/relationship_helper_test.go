package relationship

import (
	"testing"

	"github.com/gofrs/uuid"
	"github.com/meshery/meshkit/database"
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
