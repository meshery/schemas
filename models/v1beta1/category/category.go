// Package category provides primitives to interact with the openapi HTTP API.
//
// Code generated by github.com/oapi-codegen/oapi-codegen/v2 version v2.4.1 DO NOT EDIT.
package category

import (
	"github.com/gofrs/uuid"
)

// CategoryDefinition Category of the model.
type CategoryDefinition struct {
	// Id A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas.
	Id       uuid.UUID              `json:"id" yaml:"id"`
	Name     string                 `gorm:"name" json:"name" yaml:"name"`
	Metadata map[string]interface{} `gorm:"type:bytes;serializer:json" json:"metadata,omitempty" yaml:"metadata,omitempty"`
}
