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
// updated to match the existing database ID.
func TestCreate_ExistingModelUpdatesReceiverID(t *testing.T) {
	gormDB, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	if err != nil {
		t.Fatalf("failed to open in-memory database: %v", err)
	}

	if err := gormDB.AutoMigrate(
		&connection.Connection{},
		&category.CategoryDefinition{},
		&ModelDefinition{},
	); err != nil {
		t.Fatalf("failed to migrate tables: %v", err)
	}

	db := &database.Handler{DB: gormDB, Mutex: nil}

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

	first := &ModelDefinition{
		Name:          "test-model",
		Version:       "v1.0.0",
		SchemaVersion: "v1beta2",
		Model:         Model{Version: "0.1.0"},
		Category:      category.CategoryDefinition{Name: "test-category"},
		Registrant:    connection.Connection{Kind: "test"},
	}

	firstID, err := first.Create(db, hostID)
	if err != nil {
		t.Fatalf("first Create() failed: %v", err)
	}

	second := &ModelDefinition{
		Name:          "test-model",
		Version:       "v1.0.0",
		SchemaVersion: "v1beta2",
		Model:         Model{Version: "0.1.0"},
		Category:      category.CategoryDefinition{Name: "test-category"},
		Registrant:    connection.Connection{Kind: "test"},
	}

	secondID, err := second.Create(db, hostID)
	if err != nil {
		t.Fatalf("second Create() failed: %v", err)
	}
	if secondID != firstID {
		t.Fatalf("second Create() returned %v, want %v", secondID, firstID)
	}
	if second.ID != firstID {
		t.Fatalf("after second Create(), receiver ID = %v, want %v", second.ID, firstID)
	}

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
