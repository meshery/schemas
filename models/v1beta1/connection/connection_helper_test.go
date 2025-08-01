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
		metadata map[string]interface{}
		expected MeshsyncDeploymentMode
	}{
		{
			name:     "no key",
			metadata: map[string]interface{}{},
			expected: MeshsyncDeploymentModeUndefined,
		},
		{
			name:     "wrong type",
			metadata: map[string]interface{}{MeshsyncDeploymentModeMetadataKey: 123},
			expected: MeshsyncDeploymentModeUndefined,
		},
		{
			name:     "empty string (default)",
			metadata: map[string]interface{}{MeshsyncDeploymentModeMetadataKey: ""},
			expected: MeshsyncDeploymentModeDefault,
		},
		{
			name:     "operator mode",
			metadata: map[string]interface{}{MeshsyncDeploymentModeMetadataKey: string(MeshsyncDeploymentModeOperator)},
			expected: MeshsyncDeploymentModeOperator,
		},
		{
			name:     "embedded mode",
			metadata: map[string]interface{}{MeshsyncDeploymentModeMetadataKey: string(MeshsyncDeploymentModeEmbedded)},
			expected: MeshsyncDeploymentModeEmbedded,
		},
		{
			name:     "unknown string",
			metadata: map[string]interface{}{MeshsyncDeploymentModeMetadataKey: "something-else"},
			expected: MeshsyncDeploymentModeUndefined,
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
