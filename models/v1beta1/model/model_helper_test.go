package model

import (
	"path/filepath"
	"testing"

	"github.com/gofrs/uuid"
	"github.com/meshery/meshkit/database"
	categoryv1beta1 "github.com/meshery/schemas/models/v1beta1/category"
	"gorm.io/gorm/clause"
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
	if second.CategoryId != first.CategoryId {
		t.Fatalf("second create left the receiver CategoryId unadopted: got %s, want %s", second.CategoryId, first.CategoryId)
	}
	// The lookup is scoped by connection_id = hostID, so the persisted
	// registrant necessarily equals hostID; compare against the stored row
	// rather than the argument so the assertion proves adoption, not echo.
	var persisted ModelDefinition
	if err := handler.First(&persisted, "id = ?", firstID).Error; err != nil {
		t.Fatalf("load persisted model: %v", err)
	}
	if persisted.RegistrantId != hostID {
		t.Fatalf("persisted RegistrantId mismatch: got %s, want %s", persisted.RegistrantId, hostID)
	}
	if second.RegistrantId != persisted.RegistrantId {
		t.Fatalf("second create left the receiver RegistrantId unadopted: got %s, want %s", second.RegistrantId, persisted.RegistrantId)
	}

	var count int64
	if err := handler.Model(&ModelDefinition{}).Count(&count).Error; err != nil {
		t.Fatalf("count models: %v", err)
	}
	if count != 1 {
		t.Fatalf("expected exactly one persisted model, found %d", count)
	}
}

// Registration must be idempotent across separate database connections, the
// multi-process shape (server replicas sharing a database) - each connection
// sees the other's committed row and adopts it rather than erroring, mirroring
// TestCreateIsIdempotentAcrossConnections in v1alpha3/relationship. This
// exercises the sequential "already exists" adopt path; the concurrent
// insert-race path is exercised directly by
// TestInsertIgnoringConflictIsNoOpOnDuplicate below.
func TestCreateIsIdempotentAcrossConnections(t *testing.T) {
	dbFile := filepath.Join(t.TempDir(), "registry.db")

	open := func() *database.Handler {
		handler, err := database.New(database.Options{
			Engine:   database.SQLITE,
			Filename: dbFile,
		})
		if err != nil {
			t.Fatalf("open sqlite: %v", err)
		}
		return &handler
	}

	first := open()
	if err := first.AutoMigrate(&ModelDefinition{}, &categoryv1beta1.CategoryDefinition{}); err != nil {
		t.Fatalf("automigrate: %v", err)
	}
	second := open()

	hostID := uuid.Must(uuid.NewV4())
	newModel := func() ModelDefinition {
		return ModelDefinition{
			Name:          "kubernetes",
			Version:       "v1.0.0",
			SchemaVersion: "models.meshery.io/v1beta1",
			Model:         Model{Version: "v1.37.0"},
		}
	}
	defA := newModel()
	defB := newModel()

	firstID, err := defA.Create(first, hostID)
	if err != nil {
		t.Fatalf("create on first connection: %v", err)
	}
	secondID, err := defB.Create(second, hostID)
	if err != nil {
		t.Fatalf("create on second connection: %v", err)
	}
	if secondID != firstID {
		t.Fatalf("connections resolved different IDs: %s vs %s", secondID, firstID)
	}

	var count int64
	if err := second.Model(&ModelDefinition{}).Count(&count).Error; err != nil {
		t.Fatalf("count models: %v", err)
	}
	if count != 1 {
		t.Fatalf("expected exactly one persisted model, found %d", count)
	}
}

// insertIgnoringConflict is the ON CONFLICT DO NOTHING seam Create relies on
// when two processes both pass the exists check. Sequential Create calls never
// reach it (the second call returns from the lookup), so drive it directly: a
// second insert of an already-persisted ID must be a no-op, not a
// duplicate-key error, and must leave exactly one row. Mirrors
// TestInsertIgnoringConflictIsNoOpOnDuplicate in v1alpha3/relationship.
func TestInsertIgnoringConflictIsNoOpOnDuplicate(t *testing.T) {
	handler := newTestHandler(t)
	hostID := uuid.Must(uuid.NewV4())

	def := ModelDefinition{
		Name:          "kubernetes",
		Version:       "v1.0.0",
		SchemaVersion: "models.meshery.io/v1beta1",
		Model:         Model{Version: "v1.37.0"},
	}
	id, err := def.GenerateID()
	if err != nil {
		t.Fatalf("GenerateID: %v", err)
	}
	catID, err := def.Category.Create(handler, hostID)
	if err != nil {
		t.Fatalf("category create: %v", err)
	}
	def.ID = id
	def.CategoryId = catID
	def.RegistrantId = hostID

	if err := def.insertIgnoringConflict(handler); err != nil {
		t.Fatalf("first insert: %v", err)
	}
	// Plain Create must collide, proving the primary key actually guards the row.
	dup := def
	if err := handler.Omit(clause.Associations).Create(&dup).Error; err == nil {
		t.Fatal("plain insert of a duplicate ID unexpectedly succeeded")
	}
	// The conflict-tolerant insert must swallow that same collision.
	loser := def
	if err := loser.insertIgnoringConflict(handler); err != nil {
		t.Fatalf("conflicting insert returned an error instead of a no-op: %v", err)
	}

	var count int64
	if err := handler.Model(&ModelDefinition{}).Count(&count).Error; err != nil {
		t.Fatalf("count models: %v", err)
	}
	if count != 1 {
		t.Fatalf("expected exactly one persisted model, found %d", count)
	}
}
