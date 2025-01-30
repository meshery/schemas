// The file implements the Entity interface on the SubCategoryDefinition struct.
package subCategory

import (
	"crypto/md5"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"sync"

	"github.com/gofrs/uuid"
	"github.com/layer5io/meshkit/database"
	"github.com/octocamocoder47/schemas/models/v1beta1/category"
	"gorm.io/gorm"
)

var subCategoryCreationLock sync.Mutex

func (c SubCategoryDefinition) TableName() string {
	return "sub_category_dbs"
}

func (cat SubCategoryDefinition) Type() entity.EntityType {
	return entity.SubCategory
}

func (cat SubCategoryDefinition) GetID() uuid.UUID {
	return cat.Id
}

// GenerateID generates a unique ID for a sub-category based on its name and category ID.
func (cat *SubCategoryDefinition) GenerateID() (uuid.UUID, error) {
	categoryIdentifier := struct {
		Name       string
		CategoryID uuid.UUID
	}{
		Name:       cat.Name,
		CategoryID: cat.CategoryID,
	}

	byt, err := json.Marshal(categoryIdentifier)
	if err != nil {
		return uuid.UUID{}, err
	}

	hash := md5.Sum(byt)
	return uuid.FromString(hex.EncodeToString(hash[:]))
}

// Create adds a new sub-category to the database.
func (cat *SubCategoryDefinition) Create(db *database.Handler) (uuid.UUID, error) {
	if cat.Name == "" {
		return uuid.UUID{}, fmt.Errorf("sub-category name cannot be empty")
	}

	if cat.CategoryID == uuid.Nil {
		return uuid.UUID{}, fmt.Errorf("category ID is required")
	}

	// Generate ID for the sub-category.
	catID, err := cat.GenerateID()
	if err != nil {
		return uuid.UUID{}, err
	}

	// Ensure thread safety.
	subCategoryCreationLock.Lock()
	defer subCategoryCreationLock.Unlock()

	var existingSubCategory SubCategoryDefinition
	err = db.First(&existingSubCategory, "id = ?", catID).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		return uuid.UUID{}, err
	}

	// If no record exists, create a new one.
	if err == gorm.ErrRecordNotFound {
		cat.Id = catID
		err = db.Create(&cat).Error
		if err != nil {
			return uuid.UUID{}, err
		}
		return cat.Id, nil
	}

	// If record exists, return the existing ID.
	return existingSubCategory.Id, nil
}

// LinkCategory creates a relationship between a category and its sub-categories.
func LinkCategory(db *database.Handler, category *category.CategoryDefinition, subCategories []Subcategory.) error {
	if category.Id == uuid.Nil {
		return fmt.Errorf("category ID is required")
	}

	for i := range subCategories {
		subCategories[i].CategoryID = category.Id
		if _, err := subCategories[i].Create(db); err != nil {
			return fmt.Errorf("failed to create sub-category: %w", err)
		}
	}

	return nil
}
