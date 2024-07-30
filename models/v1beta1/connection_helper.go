package v1beta1

import (
	"encoding/json"
	"sync"

	"github.com/gofrs/uuid"
	"github.com/layer5io/meshkit/database"
	"github.com/layer5io/meshkit/utils/kubernetes"
	"gorm.io/gorm"
)

type IHost interface {
	HandleDependents(comp ComponentDefinition, kc *kubernetes.Client, isDeploy, performUpgrade bool) (string, error)
	String() string
}

var connectionCreation sync.Mutex //Each entity will perform a check and if the host already doesn't exist, it will create a host. This lock will make sure that there are no race conditions.

func (h *Connection) GenerateID() (uuid.UUID, error) {
	byt, err := json.Marshal(h)
	if err != nil {
		return uuid.UUID{}, err
	}
	return uuid.FromBytes(byt)
}

func (h *Connection) Create(db *database.Handler) (uuid.UUID, error) {

	hID, err := h.GenerateID()
	if err != nil {
		return uuid.UUID{}, err
	}
	var connection Connection
	connectionCreation.Lock()
	defer connectionCreation.Unlock()
	err = db.First(&connection, "id = ?", hID).Error // check if the connection already exists
	if err != nil && err != gorm.ErrRecordNotFound {
		return uuid.UUID{}, err
	}

	// if not exists then create a new host and return the id
	if err == gorm.ErrRecordNotFound {
		h.Id = hID
		err = db.Create(&h).Error
		if err != nil {
			return uuid.UUID{}, err
		}
		return h.Id, nil
	}

	// else return the id of the existing connection
	return connection.Id, nil
}

