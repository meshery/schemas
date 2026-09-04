package model

import (
	"testing"

	"github.com/gofrs/uuid"
	"github.com/meshery/meshkit/database"
	category "github.com/meshery/schemas/models/v1beta1/category"
	connection "github.com/meshery/schemas/models/v1beta1/connection"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// TestCreate_ExistingModelUpdatesReceiverID verifies that when Create() finds
// an already-registered model in the database, the pointer receiver's ID is
// updated to match the existing database ID. This is a regression test for the
// bug where model re-import left the receiver's ID at the zero UUID, causing
// all subsequently registered relationships to be orphaned under model_id=0.
func TestCreate_ExistingModelUpdatesReceiverID(t *testing.T) {
	gormDB, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	if err != nil {
		t.Fatalf("failed to open in-memory database: %v", err)
	}

	// Migrate the tables that ModelDefinition.Create() touches.
	if err := gormDB.AutoMigrate(
		&connection.Connection{},
		&category.CategoryDefinition{},
		&ModelDefinition{},
	); err != nil {
		t.Fatalf("failed to migrate tables: %v", err)
	}

	db := &database.Handler{DB: gormDB, Mutex: nil}

	// Create a host connection (the "registrant").
	hostID := uuid.Must(uuid.NewV4())
	host := connection.Connection{
		ID:      hostID,
		Name:    "test-host",
		Type:    "platform",
		SubType: "test",
		Kind:    "test",
	}
	if err := gormDB.Create(&host).Error; err != nil {
		t.Fatalf("failed to create host connection: %v", err)
	}

	// --- First import: model does not exist yet (new-model path) ---
	first := &ModelDefinition{
		Name:          "test-model",
		Version:       "v1.0.0",
		SchemaVersion: "v1beta1",
		Model:         Model{Version: "0.1.0"},
		Category:      category.CategoryDefinition{Name: "test-category"},
		Registrant:    connection.Connection{Kind: "test"},
	}

	firstID, err := first.Create(db, hostID)
	if err != nil {
		t.Fatalf("first Create() failed: %v", err)
	}
	if firstID == uuid.Nil {
		t.Fatal("first Create() returned nil UUID")
	}
	// After new-model path, receiver's ID must equal the generated ID.
	if first.ID != firstID {
		t.Fatalf("after first Create(), receiver ID = %v, want %v", first.ID, firstID)
	}

	// --- Second import: same model already exists (existing-model path) ---
	// Build a struct with identical identifying fields but a zero UUID,
	// simulating what happens when a model JSON with placeholder ID is
	// deserialized and passed through the registration pipeline.
	second := &ModelDefinition{
		Name:          "test-model",
		Version:       "v1.0.0",
		SchemaVersion: "v1beta1",
		Model:         Model{Version: "0.1.0"},
		Category:      category.CategoryDefinition{Name: "test-category"},
		Registrant:    connection.Connection{Kind: "test"},
		// ID is left at its zero value, as happens when deserializing from
		// a JSON file that has "id": "00000000-0000-0000-0000-000000000000".
	}
	if second.ID != uuid.Nil {
		t.Fatalf("precondition: second.ID should be nil before Create(), got %v", second.ID)
	}

	secondID, err := second.Create(db, hostID)
	if err != nil {
		t.Fatalf("second Create() failed: %v", err)
	}

	// The returned ID must match the existing model's ID from the first import.
	if secondID != firstID {
		t.Fatalf("second Create() returned %v, want %v (the existing model ID)", secondID, firstID)
	}

	// THE CRITICAL ASSERTION: the receiver must be updated.
	// Before the fix, second.ID remained uuid.Nil because Create() did not
	// assign m.ID = model.ID on the existing-model path. The caller would
	// then use this zero UUID as model_id when registering relationships,
	// orphaning them from all queries that JOIN on model_dbs.
	if second.ID != firstID {
		t.Fatalf(
			"BUG: after second Create() found existing model, receiver ID = %v (zero UUID), want %v.\n"+
				"The receiver's ID was not updated, which causes re-imported relationships "+
				"to be orphaned under model_id=00000000-0000-0000-0000-000000000000.",
			second.ID, firstID,
		)
	}

	// Verify the database still has exactly one model row with the correct ID.
	var count int64
	if err := gormDB.Model(&ModelDefinition{}).Where("name = ?", "test-model").Count(&count).Error; err != nil {
		t.Fatalf("failed to count models: %v", err)
	}
	if count != 1 {
		t.Fatalf("expected 1 model row, got %d", count)
	}

	var stored ModelDefinition
	if err := gormDB.Where("name = ?", "test-model").First(&stored).Error; err != nil {
		t.Fatalf("failed to read stored model: %v", err)
	}
	if stored.ID != firstID {
		t.Fatalf("stored model ID = %v, want %v", stored.ID, firstID)
	}
}
