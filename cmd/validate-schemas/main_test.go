package main

import (
	"testing"

	"github.com/meshery/schemas/validation"
)

func TestExitCode(t *testing.T) {
	clean := validation.AuditResult{}
	advisory := validation.AuditResult{
		Advisory: []validation.Violation{{File: "api.yml", Message: "advisory"}},
	}
	blocking := validation.AuditResult{
		Blocking: []validation.Violation{{File: "api.yml", Message: "blocking"}},
	}
	both := validation.AuditResult{
		Blocking: []validation.Violation{{File: "api.yml", Message: "blocking"}},
		Advisory: []validation.Violation{{File: "api.yml", Message: "advisory"}},
	}

	tests := []struct {
		name     string
		warn     bool
		warnFail bool
		result   validation.AuditResult
		want     int
	}{
		{name: "default clean", result: clean, want: 0},
		{name: "default blocking", result: blocking, want: 1},
		{name: "warn clean", warn: true, result: clean, want: 0},
		{name: "warn advisory", warn: true, result: advisory, want: 0},
		{name: "warn blocking stays non-failing", warn: true, result: blocking, want: 0},
		{name: "warn both stays non-failing", warn: true, result: both, want: 0},
		{name: "warn-fail clean", warnFail: true, result: clean, want: 0},
		{name: "warn-fail advisory", warnFail: true, result: advisory, want: 1},
		{name: "warn-fail blocking", warnFail: true, result: blocking, want: 1},
		{name: "warn-fail both", warnFail: true, result: both, want: 1},
		{name: "warn and warn-fail advisory", warn: true, warnFail: true, result: advisory, want: 1},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := exitCode(tt.warn, tt.warnFail, tt.result); got != tt.want {
				t.Errorf("exitCode(warn=%v, warnFail=%v) = %d, want %d", tt.warn, tt.warnFail, got, tt.want)
			}
		})
	}
}
