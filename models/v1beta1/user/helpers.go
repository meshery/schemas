package user

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"
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
