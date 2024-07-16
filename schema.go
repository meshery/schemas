package schemas

import (
	"embed"
	"encoding/json"
	"fmt"
)

// Embedding the file system for schema files
//go:embed schemas
var Schemas embed.FS

// LoadSchema loads and parses the JSON schema file from the embedded filesystem.
func LoadSchema(fileName string) (map[string]interface{}, error) {
	// Read the file from the embedded filesystem
	data, err := Schemas.ReadFile(fileName)
	if err != nil {
		return nil, fmt.Errorf("error reading file: %w", err)
	}

	// Unmarshal JSON data into a map
	var schema map[string]interface{}
	if err := json.Unmarshal(data, &schema); err != nil {
		return nil, fmt.Errorf("error unmarshalling JSON: %w", err)
	}

	return schema, nil
}
