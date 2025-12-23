package user

import (
	"github.com/meshery/schemas/models/core"
)

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

func (preference Preference) Value() (interface{}, error) {
	mapVal, err := core.StructToMap(preference)
	if err != nil {
		return nil, err
	}
	return core.Map(mapVal).Value()
}

func (social *Social) Scan(value interface{}) error {
	if value == nil {
		*social = Social{}
		return nil
	}
	mapVal := core.Map{}
	err := mapVal.Scan(value)
	if err != nil {
		return err
	}
	return core.MapToStruct(mapVal, social)
}

func (social Social) Value() (interface{}, error) {
	mapVal, err := core.StructToMap(social)

	if err != nil {
		return nil, err
	}
	return core.Map(mapVal).Value()
}
