// The file implements the Entity interface on the CategoryDefinition struct.
package category

import (
	"crypto/md5"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"sync"

	"github.com/gofrs/uuid"
	"github.com/layer5io/meshkit/database"
	"github.com/layer5io/meshkit/models/meshmodel/entity"
	"gorm.io/gorm"
)

var categoryCreationLock sync.Mutex //Each model will perform a check and if the category already doesn't exist, it will create a category. This lock will make sure that there are no race conditions.

func (c CategoryDefinition) TableName() string {
	return "category_dbs"
}

// "Uncategorized" is assigned when Category is empty in the component definitions.
const DefaultCategory = "Uncategorized"

func (cat CategoryDefinition) Type() entity.EntityType {
	return entity.Category
}

func (cat *CategoryDefinition) GenerateID() (uuid.UUID, error) {
	categoryIdentifier := CategoryDefinition{
		Name: cat.Name,
	}
	byt, err := json.Marshal(categoryIdentifier)
	if err != nil {
		return uuid.UUID{}, err
	}

	hash := md5.Sum(byt)
	return uuid.FromString(hex.EncodeToString(hash[:]))
}

func (cat CategoryDefinition) GetID() uuid.UUID {
	return cat.Id
}

func (cat *CategoryDefinition) GetEntityDetail() string {
	return fmt.Sprintf("name: %s", cat.Name)
}

func (cat *CategoryDefinition) Create(db *database.Handler, _ uuid.UUID) (uuid.UUID, error) {
	if cat.Name == "" {
		cat.Name = DefaultCategory
	}

	catID, err := cat.GenerateID()
	if err != nil {
		return catID, err
	}
	var category CategoryDefinition
	categoryCreationLock.Lock()
	defer categoryCreationLock.Unlock()
	err = db.First(&category, "id = ?", catID).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		return uuid.UUID{}, err
	}
	if err == gorm.ErrRecordNotFound { //The category is already not present and needs to be inserted
		cat.Id = catID
		err = db.Create(&cat).Error
		if err != nil {
			return uuid.UUID{}, err
		}
		return cat.Id, nil
	}
	return category.Id, nil
}

func (m *CategoryDefinition) UpdateStatus(db database.Handler, status entity.EntityStatus) error {
	return nil
}
