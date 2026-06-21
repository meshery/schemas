package pattern

import (
	"testing"

	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
)

func TestParseUUIDOrNil(t *testing.T) {
	t.Run("returns parsed uuid for valid input", func(t *testing.T) {
		expected := uuid.New()

		assert.Equal(t, expected, parseUUIDOrNil(expected.String()))
	})

	t.Run("returns uuid.Nil for invalid input", func(t *testing.T) {
		assert.Equal(t, uuid.Nil, parseUUIDOrNil("not-a-uuid"))
	})
}
