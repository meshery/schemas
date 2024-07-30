package v1beta1

import "github.com/gofrs/uuid"

type CategoryDefinition struct {
	Id       uuid.UUID              `json:"-"`
	Name     string                 `json:"name" gorm:"name"`
	Metadata map[string]interface{} `json:"metadata"  yaml:"metadata" gorm:"type:bytes;serializer:json"`
}
