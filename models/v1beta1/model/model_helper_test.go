package model

import (
	"testing"

	"github.com/gofrs/uuid"
	"github.com/meshery/meshkit/database"
	categoryv1beta1 "github.com/meshery/schemas/models/v1beta1/category"
)

func newTestHandler(t *testing.T) *database.Handler {
	t.Helper()
	handler, err := database.New(database.Options{
		Engine:   database.SQLITE,
		Filename: ":memory:",
	})
	if err != nil {
		t.Fatalf("open in-memory sqlite: %v", err)
	}
	if err := handler.AutoMigrate(&ModelDefinition{}, &categoryv1beta1.CategoryDefinition{}); err != nil {
		t.Fatalf("automigrate: %v", err)
	}
	return &handler
}

// Create must adopt the persisted identity onto the receiver when the model
// already exists. meshkit's registration.register reads m.ID after Create to
// stamp ModelId onto every component and relationship in the package; before
// this was fixed, re-registering an existing model left the receiver's ID as
// the nil UUID and orphaned everything registered under it.
func TestCreateAssignsIDWhenModelAlreadyExists(t *testing.T) {
	handler := newTestHandler(t)
	hostID := uuid.Must(uuid.NewV4())

	first := ModelDefinition{
		Name:          "kubernetes",
		Version:       "v1.0.0",
		SchemaVersion: "models.meshery.io/v1beta1",
		Model:         Model{Version: "v1.37.0"},
	}
	firstID, err := first.Create(handler, hostID)
	if err != nil {
		t.Fatalf("first create: %v", err)
	}
	if firstID == uuid.Nil {
		t.Fatal("first create returned the nil UUID")
	}
	if first.ID != firstID {
		t.Fatalf("first create did not assign the receiver ID: got %s, want %s", first.ID, firstID)
	}

	second := ModelDefinition{
		Name:          "kubernetes",
		Version:       "v1.0.0",
		SchemaVersion: "models.meshery.io/v1beta1",
		Model:         Model{Version: "v1.37.0"},
	}
	secondID, err := second.Create(handler, hostID)
	if err != nil {
		t.Fatalf("second create: %v", err)
	}
	if secondID != firstID {
		t.Fatalf("second create resolved a different ID: got %s, want %s", secondID, firstID)
	}
	if second.ID != firstID {
		t.Fatalf("second create left the receiver ID unassigned: got %s, want %s", second.ID, firstID)
	}

	var count int64
	if err := handler.Model(&ModelDefinition{}).Count(&count).Error; err != nil {
		t.Fatalf("count models: %v", err)
	}
	if count != 1 {
		t.Fatalf("expected exactly one persisted model, found %d", count)
	}
}
