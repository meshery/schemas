package subCategory

import "github.com/gofrs/uuid"

type SubCategoryDefinition struct {
	Id         uuid.UUID              `json:"-"`
	Name       string                 `json:"name" gorm:"name"`
	CategoryID uuid.UUID              `json:"category_id" gorm:"category_id"`
	Metadata   map[string]interface{} `json:"metadata,omitempty"  yaml:"metadata,omitempty" gorm:"type:bytes;serializer:json"`
}
