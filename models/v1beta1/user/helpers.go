package user

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"

	core "github.com/meshery/schemas/models/core"
)

// UserSocials User social profiles
type UserSocials []Social

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

// Value implements driver.Valuer for JSONB storage.
func (p Preference) Value() (driver.Value, error) {
	mapVal, err := core.StructToMap(p)
	if err != nil {
		return nil, err
	}

	return core.Map(mapVal).Value()
}

// Scan implements sql.Scanner for JSONB retrieval.
func (p *Preference) Scan(src interface{}) error {
	if src == nil {
		*p = Preference{}
		return nil
	}

	mapVal := core.Map{}
	if err := mapVal.Scan(src); err != nil {
		return err
	}

	return core.MapToStruct(mapVal, p)
}
