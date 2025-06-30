package core

import (
	"encoding/json"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestMap(t *testing.T) {
	t.Run("Scan", func(t *testing.T) {
		tests := []struct {
			name     string
			input    interface{}
			expected Map
			wantErr  bool
		}{
			{
				name:     "nil input",
				input:    nil,
				expected: nil,
				wantErr:  false,
			},
			{
				name:     "valid JSON []byte",
				input:    []byte(`{"a":1,"b":"str"}`),
				expected: Map{"a": float64(1), "b": "str"},
				wantErr:  false,
			},
			{
				name:     "valid JSON string",
				input:    `{"x":true,"y":2}`,
				expected: Map{"x": true, "y": float64(2)},
				wantErr:  false,
			},
			{
				name:     "invalid input type",
				input:    42,
				expected: nil,
				wantErr:  true,
			},
			{
				name:     "invalid JSON",
				input:    `not-a-json`,
				expected: nil,
				wantErr:  true,
			},
		}

		for _, tc := range tests {
			t.Run(tc.name, func(t *testing.T) {
				var m Map
				err := m.Scan(tc.input)
				if tc.wantErr {
					assert.Error(t, err)
				} else {
					assert.NoError(t, err)
					assert.Equal(t, tc.expected, m)
				}
			})
		}
	})

	t.Run("Value", func(t *testing.T) {
		m := Map{"foo": "bar", "n": 123}
		val, err := m.Value()
		assert.NoError(t, err)

		// Should be a valid JSON string
		str, ok := val.(string)
		assert.True(t, ok)

		var unmarshalled map[string]interface{}
		err = json.Unmarshal([]byte(str), &unmarshalled)
		assert.NoError(t, err)
		assert.Equal(t, map[string]interface{}{"foo": "bar", "n": float64(123)}, unmarshalled)
	})

	t.Run("UnmarshalJSON", func(t *testing.T) {
		var m Map
		data := []byte(`{"alpha": true, "beta": 42}`)

		err := m.UnmarshalJSON(data)
		assert.NoError(t, err)
		assert.Equal(t, Map{"alpha": true, "beta": float64(42)}, m)

		// Invalid JSON
		err = m.UnmarshalJSON([]byte(`{invalid}`))
		assert.Error(t, err)
	})

	t.Run("RoundTrip JSON + Value", func(t *testing.T) {
		original := Map{"a": 1, "b": []any{"x", 2}}

		val, err := original.Value()
		assert.NoError(t, err)

		// simulate DB roundtrip
		var scanned Map
		err = scanned.Scan(val)
		assert.NoError(t, err)

		assert.JSONEq(t, `{"a":1,"b":["x",2]}`, string(val.(string)))

	})
}
