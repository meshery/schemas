package user

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"

	"github.com/google/uuid"
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

	// Legacy rows may hold an empty string (or other non-UUID content) under
	// selectedOrganizationId — e.g. the v1.0.1 key rename carried empty values
	// over verbatim. The current schema types that field as a required UUID,
	// so leaving bad input in place would fail MapToStruct and block callers
	// like OAuth sign-in. Drop the key instead; the zero UUID will be written
	// on the next preference update.
	if v, ok := mapVal["selectedOrganizationId"]; ok {
		s, isStr := v.(string)
		if !isStr || uuid.Validate(s) != nil {
			delete(mapVal, "selectedOrganizationId")
		}
	}

	return core.MapToStruct(mapVal, p)
}
