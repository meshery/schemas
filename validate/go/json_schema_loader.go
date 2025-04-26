package validate

import (
	"io"
	"os"
	"path/filepath"
	"strings"

	"github.com/google/uuid"
	jsFormats "github.com/santhosh-tekuri/jsonschema/formats"
	jsLoader "github.com/santhosh-tekuri/jsonschema/loader"
)

const schemaURL = "https://schemas.meshery.io"

type urlLoader struct {
	baseFolder string
}

var ul = &urlLoader{}

func setUpBaseFolder(folder string) {
	ul.baseFolder = folder
}

func (ul urlLoader) Load(url string) (io.ReadCloser, error) {
	if strings.HasPrefix(url, schemaURL) {
		localPath := filepath.Join(
			ul.baseFolder,
			strings.TrimLeft(
				strings.TrimPrefix(url, schemaURL),
				"/",
			),
		)
		return os.Open(localPath)
	}
	return nil, os.ErrNotExist
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
