package relationship

import (
	"fmt"
	"path/filepath"
	"strings"

	"github.com/gofrs/uuid"
	"github.com/layer5io/meshkit/database"
	"github.com/layer5io/meshkit/models/meshmodel/entity"
	"github.com/layer5io/meshkit/utils"
	"gorm.io/gorm/clause"
)

func (r RelationshipDefinition) TableName() string {
	return "relationship_definition_dbs"
}

func (r RelationshipDefinition) Type() entity.EntityType {
	return entity.RelationshipDefinition
}

func (r *RelationshipDefinition) GenerateID() (uuid.UUID, error) {
	return uuid.NewV4()
}

func (r RelationshipDefinition) GetID() uuid.UUID {
	return *r.Id
}

func (r *RelationshipDefinition) GetEntityDetail() string {
	return fmt.Sprintf("type: %s, definition version: %s, kind: %s, model: %s, version: %s", r.Type(), r.Version, r.Kind, r.Model.Name, r.Model.Version)
}

func (r *RelationshipDefinition) Create(db *database.Handler, hostID uuid.UUID) (uuid.UUID, error) {
	id, _ := r.GenerateID()
	r.Id = &id
	mid, err := r.Model.Create(db, hostID)
	if err != nil {
		return uuid.UUID{}, err
	}
	r.Model.Id = mid
	err = db.Omit(clause.Associations).Create(&r).Error
	if err != nil {
		return uuid.UUID{}, err
	}
	return *r.Id, err
}

func (r *RelationshipDefinition) UpdateStatus(db *database.Handler, status entity.EntityStatus) error {
	return nil
}

func (r RelationshipDefinition) WriteRelationshipDefinition(relDirPath string, fileType string) error {
	relPath := filepath.Join(relDirPath, fmt.Sprintf("%s-%s.%s", r.Kind, utils.GetRandomAlphabetsOfDigit(3), fileType))
	if fileType == "yaml" {
		err := utils.WriteYamlToFile[RelationshipDefinition](relPath, r)
		return err
	}
	err := utils.WriteJSONToFile[RelationshipDefinition](relPath, r)
	return err
}

func (r *RelationshipDefinition) GetDefaultEvaluationQuery() string {
	return fmt.Sprintf("%s_%s_relationship", strings.ToLower(string(r.Kind)), strings.ToLower(r.SubType))
}
