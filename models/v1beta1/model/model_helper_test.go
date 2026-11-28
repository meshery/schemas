package model

import (
	"testing"

	"github.com/gofrs/uuid"
	"github.com/meshery/meshkit/database"
	"github.com/meshery/schemas/models/v1beta1"
	"github.com/meshery/schemas/models/v1beta1/category"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

// baseModel returns a minimal ModelDefinition carrying an arbitrary id, as a
// model read from a model file does. Its content-addressed id is fixed, so
// every call resolves to the same registered model.
func baseModel() ModelDefinition {
	return ModelDefinition{
		ID:            uuid.Must(uuid.NewV4()),
		SchemaVersion: v1beta1.ModelSchemaVersion,
		Version:       "1.0.0",
		Name:          "test-model",
		DisplayName:   "Test Model",
		Status:        Enabled,
		Category:      category.CategoryDefinition{Name: "test-category"},
		Model:         Model{Version: "1.0.0"},
	}
}

// TestCreate_ExistingModelSetsCallerID asserts the fix for
// meshery/meshery#22424: creating a model that is already registered must set
// the caller's ID to the stored model's id, exactly as a fresh insert does.
// Registration reads model.ID after Create to link relationships, so a stale
// id leaves them pointing at a model that does not exist.
func TestCreate_ExistingModelSetsCallerID(t *testing.T) {
	db, err := database.New(database.Options{Engine: database.SQLITE, Filename: ":memory:"})
	require.NoError(t, err)
	t.Cleanup(func() { _ = db.DBClose() })
	require.NoError(t, db.AutoMigrate(&ModelDefinition{}, &category.CategoryDefinition{}))

	hostID := uuid.Must(uuid.NewV4())

	first := baseModel()
	firstID, err := first.Create(&db, hostID)
	require.NoError(t, err)
	assert.Equal(t, firstID, first.ID, "insert path must set the caller's ID")

	second := baseModel()
	secondID, err := second.Create(&db, hostID)
	require.NoError(t, err)
	assert.Equal(t, firstID, secondID, "re-creating must resolve to the registered model")
	assert.Equal(t, secondID, second.ID, "existing-model path must set the caller's ID")
}
