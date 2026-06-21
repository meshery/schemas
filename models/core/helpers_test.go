package core

import (
	"testing"

	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
)

func TestUUIDOrUUIDNil(t *testing.T) {
	t.Run("returns uuid.Nil when input is nil", func(t *testing.T) {
		result := UUIDOrUUIDNil(nil)
		assert.Equal(t, uuid.Nil, result)
	})

	t.Run("returns dereferenced UUID when input is not nil", func(t *testing.T) {
		testUUID := uuid.New()

		result := UUIDOrUUIDNil(&testUUID)
		assert.Equal(t, testUUID, result)
	})
}
