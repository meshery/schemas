package role

import (
	"encoding/json"
	"fmt"
)

// String returns a JSON representation of the Role.
func (r Role) String() string {
	ja, err := json.Marshal(r)
	if err != nil {
		return fmt.Sprintf("failed to marshal Role to JSON: %v", err)
	}
	return string(ja)
}
