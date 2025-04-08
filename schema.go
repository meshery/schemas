package schemas

import "embed"

// Embedding schemas
//
//go:embed schemas json_models yaml_models
var Schemas embed.FS
