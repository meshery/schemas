package user

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"

	"github.com/meshery/schemas/models/core"
)

// UserSocials User social profiles
type UserSocials []Social

// event category
func (User) EventCategory() string {
	return "user"
}

// add scan and value helpers here
func (preference *Preference) Scan(value interface{}) error {
	if value == nil {
		*preference = Preference{}
		return nil
	}
	mapVal := core.Map{}
	err := mapVal.Scan(value)
	if err != nil {
		return err
	}
	return core.MapToStruct(mapVal, preference)
}

func (preference Preference) Value() (driver.Value, error) {
	mapVal, err := core.StructToMap(preference)
	if err != nil {
		return nil, err
	}
	return core.Map(mapVal).Value()
}

// Value implements driver.Valuer
func (us UserSocials) Value() (driver.Value, error) {
	// Ensure empty slice is stored as [] not null
	if us == nil {
		return []byte("[]"), nil
	}
	return json.Marshal(us)
}

// Scan implements sql.Scanner
func (us *UserSocials) Scan(value interface{}) error {
	if value == nil {
		*us = UserSocials{}
		return nil
	}

	bytes, ok := value.([]byte)
	if !ok {
		return fmt.Errorf("failed to scan UserSocials: %T", value)
	}

	return json.Unmarshal(bytes, us)
}
