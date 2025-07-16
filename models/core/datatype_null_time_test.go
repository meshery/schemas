package core

import (
	"encoding/json"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"gopkg.in/yaml.v3"
)

func TestNullTime(t *testing.T) {
	t.Run("NewTime", func(t *testing.T) {
		now := time.Now()
		nt := NewTime(now)

		assert.True(t, nt.Valid)
		assert.Equal(t, now, nt.Time)
	})

	t.Run("Scan", func(t *testing.T) {
		nt := &NullTime{}

		// Valid scan
		now := time.Now()
		err := nt.Scan(now)
		assert.NoError(t, err)
		assert.True(t, nt.Valid)
		assert.Equal(t, now, nt.Time)

		// Invalid scan
		err = nt.Scan("not a time")
		assert.NoError(t, err) // type assertion fails, but no error
		assert.False(t, nt.Valid)
	})

	t.Run("Value", func(t *testing.T) {
		now := time.Now()
		nt := NewTime(now)

		val, err := nt.Value()
		assert.NoError(t, err)
		assert.Equal(t, now, val)

		nt.Valid = false
		val, err = nt.Value()
		assert.NoError(t, err)
		assert.Nil(t, val)
	})

	t.Run("MarshalJSON", func(t *testing.T) {
		// Valid time
		now := time.Date(2023, 1, 1, 10, 0, 0, 0, time.UTC)
		nt := NewTime(now)
		data, err := json.Marshal(nt)
		assert.NoError(t, err)

		expected, _ := json.Marshal(now)
		assert.JSONEq(t, string(expected), string(data))

		// Null case
		nt.Valid = false
		data, err = json.Marshal(nt)
		assert.NoError(t, err)
		assert.JSONEq(t, "null", string(data))
	})

	t.Run("UnmarshalJSON", func(t *testing.T) {
		var nt NullTime

		// Valid input
		input := `"2023-01-01T10:00:00Z"`
		err := json.Unmarshal([]byte(input), &nt)
		assert.NoError(t, err)
		assert.True(t, nt.Valid)
		assert.Equal(t, time.Date(2023, 1, 1, 10, 0, 0, 0, time.UTC), nt.Time)

		// Null input
		err = json.Unmarshal([]byte("null"), &nt)
		assert.NoError(t, err)
		assert.False(t, nt.Valid)

		// Invalid input
		err = json.Unmarshal([]byte(`"bad-time"`), &nt)
		assert.Error(t, err)
		assert.False(t, nt.Valid)

		// JSON object with Time and Valid fields
		objJSON := `{"Time":"2023-01-01T10:00:00Z","Valid":true}`
		err = json.Unmarshal([]byte(objJSON), &nt)
		assert.NoError(t, err)
		assert.True(t, nt.Valid)
		assert.Equal(t, time.Date(2023, 1, 1, 10, 0, 0, 0, time.UTC), nt.Time)

		// JSON object with Time and Valid=false
		objNullJSON := `{"Time":"0001-01-01T00:00:00Z","Valid":false}`
		err = json.Unmarshal([]byte(objNullJSON), &nt)
		assert.NoError(t, err)
		assert.False(t, nt.Valid)
		assert.Equal(t, time.Time{}, nt.Time)
	})

	t.Run("RoundTripJSON", func(t *testing.T) {
		original := NewTime(time.Date(2025, 6, 30, 12, 0, 0, 0, time.UTC))

		data, err := json.Marshal(original)
		assert.NoError(t, err)

		var decoded NullTime
		err = json.Unmarshal(data, &decoded)
		assert.NoError(t, err)
		assert.True(t, decoded.Valid)
		assert.Equal(t, original.Time, decoded.Time)
	})

	t.Run("MarshalYAML", func(t *testing.T) {
		tests := []struct {
			name     string
			nullTime NullTime
			wantYAML string
		}{
			{
				name:     "Valid time",
				nullTime: NewTime(time.Date(2023, 1, 1, 10, 0, 0, 0, time.UTC)),
				wantYAML: "\"2023-01-01T10:00:00Z\"\n",
			},
			{
				name:     "Invalid time",
				nullTime: NullTime{Valid: false},
				wantYAML: "null\n",
			},
		}

		for _, tt := range tests {
			t.Run(tt.name, func(t *testing.T) {
				data, err := yaml.Marshal(tt.nullTime)
				assert.NoError(t, err)
				assert.Equal(t, tt.wantYAML, string(data))
			})
		}
	})

	t.Run("UnmarshalYAML", func(t *testing.T) {
		tests := []struct {
			name      string
			yamlInput string
			wantTime  time.Time
			wantValid bool
			wantErr   bool
		}{
			{
				name:      "Valid time string",
				yamlInput: "2023-01-01T10:00:00Z",
				wantTime:  time.Date(2023, 1, 1, 10, 0, 0, 0, time.UTC),
				wantValid: true,
				wantErr:   false,
			},
			{
				name:      "Empty string",
				yamlInput: `""`,
				wantValid: false,
				wantErr:   false,
			},
			{
				name:      "Null value",
				yamlInput: `null`,
				wantValid: false,
				wantErr:   false,
			},
			{
				name:      "Invalid time string",
				yamlInput: "not-a-time",
				wantValid: false,
				wantErr:   true,
			},
			{
				name:      "Zero time",
				yamlInput: "0001-01-01T00:00:00Z",
				wantValid: true,
				wantErr:   false,
			},
		}

		for _, tt := range tests {
			t.Run(tt.name, func(t *testing.T) {
				var nt NullTime
				err := yaml.Unmarshal([]byte(tt.yamlInput), &nt)

				if tt.wantErr {
					assert.Error(t, err)
					return
				}

				assert.NoError(t, err)
				assert.Equal(t, tt.wantValid, nt.Valid)

				if tt.wantValid {
					assert.Equal(t, tt.wantTime, nt.Time)
				}
			})
		}
	})

	t.Run("Special case unmarshal zero timestamp", func(t *testing.T) {
		data := []byte(`"0001-01-01T00:00:00Z"`)

		unmarshalers := []func(data []byte, v any) error{
			json.Unmarshal,
			yaml.Unmarshal,
		}

		for _, unmarshal := range unmarshalers {
			var decoded NullTime
			err := unmarshal(data, &decoded)
			assert.NoError(t, err)
			assert.True(t, decoded.Valid)
			assert.True(t, decoded.Time.IsZero())
		}
	})

}
