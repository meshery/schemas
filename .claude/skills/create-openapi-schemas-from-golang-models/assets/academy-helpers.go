package academy

import (
	"database/sql/driver"
	"strconv"
	"time"

	"github.com/meshery/schemas/models/core"
)

// add scan and value helpers here
func (test *Quiz) Scan(value interface{}) error {
	mapVal := core.Map{}
	err := mapVal.Scan(value)
	if err != nil {
		return err
	}
	return core.MapToStruct(mapVal, test)
}



// returns time limit as a duration pointer, or nil if no time limit is Section
func (test *Quiz) GetTimeLimit() *time.Duration {
	// string to int ( given in minutes like "30" )
	timeLimitMinutes ,err := strconv.Atoi(test.TimeLimit)
	if err != nil || timeLimitMinutes <= 0 {
		return nil
	}
	duration := time.Duration(timeLimitMinutes) * time.Minute
	return &duration
}


func (test Quiz) Value() (driver.Value, error) {
	mapVal, err := core.StructToMap(test)
	if err != nil {
		return nil, err
	}
	return core.Map(mapVal).Value()
}

func (test *QuizSubmission) Scan(value interface{}) error {
	mapVal := core.Map{}
	err := mapVal.Scan(value)
	if err != nil {
		return err
	}
	return core.MapToStruct(mapVal, test)
}

func (test QuizSubmission) Value() (driver.Value, error) {
	mapVal, err := core.StructToMap(test)
	if err != nil {
		return nil, err
	}
	return core.Map(mapVal).Value()
}


func (test *QuizEvaluationResult) Scan(value interface{}) error {
	mapVal := core.Map{}
	err := mapVal.Scan(value)
	if err != nil {
		return err
	}
	return core.MapToStruct(mapVal, test)
}

func (test QuizEvaluationResult) Value() (driver.Value, error) {
	mapVal, err := core.StructToMap(test)
	if err != nil {
		return nil, err
	}
	return core.Map(mapVal).Value()
}
