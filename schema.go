package schemas

import (
	"embed"
	"encoding/json"
	"fmt"
)

// Embedding the file system for schema files
//go:embed schemas
var Schemas embed.FS
