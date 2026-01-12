package permissions

import (
	"testing"

	"github.com/gofrs/uuid"
	"github.com/stretchr/testify/assert"
)

// TestPermissionKeysInitialization verifies that all permission keys are valid.
// Since all keys use uuid.Must() at package initialization, if any UUID is invalid,
// the package will panic on import. This test passing confirms all keys are valid.
func TestPermissionKeysInitialization(t *testing.T) {
	t.Run("package should initialize without panic", func(t *testing.T) {
		// If we reach this point, all uuid.Must() calls succeeded
		// Just verify one key to ensure the package is properly loaded
		assert.NotEqual(t, uuid.Nil, CatalogShareDesign.UUID())
	})
}
