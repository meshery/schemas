package connection

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestMeshsyncDeploymentModeFromString(t *testing.T) {
	tests := []struct {
		input    string
		expected MeshsyncDeploymentMode
	}{
		{"", MeshsyncDeploymentModeDefault},
		{string(MeshsyncDeploymentModeOperator), MeshsyncDeploymentModeOperator},
		{string(MeshsyncDeploymentModeEmbedded), MeshsyncDeploymentModeEmbedded},
		{"unknown", MeshsyncDeploymentModeUndefined},
	}

	for _, tt := range tests {
		t.Run(tt.input, func(t *testing.T) {
			assert := assert.New(t)
			result := MeshsyncDeploymentModeFromString(tt.input)
			assert.Equal(tt.expected, result)
		})
	}
}

func TestMeshsyncDeploymentModeFromMetadata(t *testing.T) {
	tests := []struct {
		name     string
		metadata map[string]any
		expected MeshsyncDeploymentMode
	}{
		{
			name:     "no key",
			metadata: map[string]any{},
			expected: MeshsyncDeploymentModeUndefined,
		},
		{
			name:     "wrong type",
			metadata: map[string]any{MeshsyncDeploymentModeMetadataKey: 123},
			expected: MeshsyncDeploymentModeUndefined,
		},
		{
			name:     "empty string (default)",
			metadata: map[string]any{MeshsyncDeploymentModeMetadataKey: ""},
			expected: MeshsyncDeploymentModeDefault,
		},
		{
			name:     "operator mode string",
			metadata: map[string]any{MeshsyncDeploymentModeMetadataKey: string(MeshsyncDeploymentModeOperator)},
			expected: MeshsyncDeploymentModeOperator,
		},
		{
			name:     "embedded mode string",
			metadata: map[string]any{MeshsyncDeploymentModeMetadataKey: string(MeshsyncDeploymentModeEmbedded)},
			expected: MeshsyncDeploymentModeEmbedded,
		},
		{
			name:     "unknown string",
			metadata: map[string]any{MeshsyncDeploymentModeMetadataKey: "something-else"},
			expected: MeshsyncDeploymentModeUndefined,
		},
		{
			name:     "direct MeshsyncDeploymentMode type",
			metadata: map[string]any{MeshsyncDeploymentModeMetadataKey: MeshsyncDeploymentModeOperator},
			expected: MeshsyncDeploymentModeOperator,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			assert := assert.New(t)
			result := MeshsyncDeploymentModeFromMetadata(tt.metadata)
			assert.Equal(tt.expected, result)
		})
	}
}

func TestAddMeshsyncDeploymentModeToMetadata(t *testing.T) {
	t.Run("adds mode to empty metadata map", func(t *testing.T) {
		metadata := make(map[string]any)
		SetMeshsyncDeploymentModeToMetadata(metadata, MeshsyncDeploymentModeEmbedded)

		assert := assert.New(t)
		assert.Contains(metadata, MeshsyncDeploymentModeMetadataKey)
		assert.Equal(MeshsyncDeploymentModeEmbedded, metadata[MeshsyncDeploymentModeMetadataKey])
	})

	t.Run("overwrites existing mode in metadata", func(t *testing.T) {
		metadata := map[string]any{
			MeshsyncDeploymentModeMetadataKey: MeshsyncDeploymentModeOperator,
		}
		SetMeshsyncDeploymentModeToMetadata(metadata, MeshsyncDeploymentModeEmbedded)

		assert := assert.New(t)
		assert.Equal(MeshsyncDeploymentModeEmbedded, metadata[MeshsyncDeploymentModeMetadataKey])
	})
}
