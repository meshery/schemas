package organization

import (
	"database/sql/driver"
	"encoding/json"

	"github.com/meshery/meshkit/utils"
)

func (om *OrgMetadata) Scan(value interface{}) error {
	if value == nil {
		om = &OrgMetadata{}
		return nil
	}
	data, err := utils.Cast[[]byte](value)
	if err != nil {
		return err
	}

	err = json.Unmarshal([]byte(data), om)
	if err != nil {
		return utils.ErrUnmarshal(err)
	}
	return nil
}

func (om OrgMetadata) Value() (driver.Value, error) {
	marshaledValue, err := json.Marshal(om)
	if err != nil {
		return nil, utils.ErrMarshal(err)
	}
	return marshaledValue, nil
}

func (*Organization) EventCategory() string {
	return "organization"
}
