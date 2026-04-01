package academy

import (
	"strconv"
	"time"
)

// returns time limit as a duration pointer, or nil if no time limit is Section
func (test *Quiz) GetTimeLimit() *time.Duration {
	// string to int ( given in minutes like "30" )
	timeLimitMinutes, err := strconv.Atoi(test.TimeLimit)
	if err != nil || timeLimitMinutes <= 0 {
		return nil
	}
	duration := time.Duration(timeLimitMinutes) * time.Minute
	return &duration
}
