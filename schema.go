package schemas

import "embed"

// Embedding the file system for schema files
//go:embed schemas
var Schemas embed.FS
