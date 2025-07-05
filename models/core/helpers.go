package core

import "github.com/gofrs/uuid"

func UUIDOrUUIDNil(value *uuid.UUID) uuid.UUID {
	if value == nil {
		return uuid.Nil
	}

	return *value
}
