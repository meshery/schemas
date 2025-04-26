package validate

import (
	"bytes"
	"encoding/json"
	"io"
	"os"
	"path/filepath"
	"strings"

	"github.com/google/uuid"
	jsFormats "github.com/santhosh-tekuri/jsonschema/formats"
	jsLoader "github.com/santhosh-tekuri/jsonschema/loader"
	"gopkg.in/yaml.v3"
)

const schemaURL = "https://schemas.meshery.io"

type urlLoader struct {
	baseFolder string
}

var ul = &urlLoader{}

func setUpBaseFolder(folder string) {
	ul.baseFolder = folder
}

func init() {
	// uuid is not a custom format
	jsFormats.Register("uuid", func(v string) bool {
		if _, err := uuid.Parse(v); err != nil {
			log.Warnf("invalid uuid format %s %v", v, err)
			return false
		}
		return true
	})

	// to load from local
	jsLoader.Register(
		"https",
		ul,
	)
}

func (ul urlLoader) Load(path string) (io.ReadCloser, error) {
	localPath := path
	if strings.HasPrefix(path, schemaURL) {
		localPath = filepath.Join(
			ul.baseFolder,
			strings.TrimLeft(
				strings.TrimPrefix(path, schemaURL),
				"/",
			),
		)
	}

	if strings.HasSuffix(localPath, ".yaml") || strings.HasSuffix(localPath, ".yml") {
		// return io.NopCloser(bytes.NewReader([]byte("{}"))), nil
		return loadYAMLFile(localPath)
	}

	return os.Open(localPath)
}

// loadYAMLFile loads a YAML file, converts it to JSON, and returns it as io.ReadCloser
func loadYAMLFile(path string) (io.ReadCloser, error) {
	// Read the YAML file
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}

	// Parse YAML into an arbitrary Go structure
	var yamlData interface{}
	if err := yaml.Unmarshal(data, &yamlData); err != nil {
		return nil, err
	}

	// Marshal it back into JSON
	jsonData, err := json.Marshal(yamlData)
	if err != nil {
		return nil, err
	}

	// Return a ReadCloser over the JSON data
	return io.NopCloser(bytes.NewReader(jsonData)), nil
}
