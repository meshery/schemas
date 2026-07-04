package validation

import (
	"testing"
)

func TestIsCamelCase(t *testing.T) {
	tests := []struct {
		input string
		want  bool
	}{
		{"getPatterns", true},
		{"userId", true},
		{"a", true},
		{"GetPatterns", false},
		{"get_patterns", false},
		{"get-patterns", false},
		{"123abc", false},
		{"", false},
	}
	for _, tt := range tests {
		t.Run(tt.input, func(t *testing.T) {
			if got := IsCamelCase(tt.input); got != tt.want {
				t.Errorf("IsCamelCase(%q) = %v, want %v", tt.input, got, tt.want)
			}
		})
	}
}

func TestIsPascalCase(t *testing.T) {
	tests := []struct {
		input string
		want  bool
	}{
		{"ModelDefinition", true},
		{"KeychainPayload", true},
		{"A", true},
		{"modelDefinition", false},
		{"model_definition", false},
		{"Model-Definition", false},
		{"", false},
	}
	for _, tt := range tests {
		t.Run(tt.input, func(t *testing.T) {
			if got := IsPascalCase(tt.input); got != tt.want {
				t.Errorf("IsPascalCase(%q) = %v, want %v", tt.input, got, tt.want)
			}
		})
	}
}

func TestIsKebabCase(t *testing.T) {
	tests := []struct {
		input string
		want  bool
	}{
		{"role-holders", true},
		{"api", true},
		{"user-profiles", true},
		{"userProfiles", false},
		{"user_profiles", false},
		{"UserProfiles", false},
		{"", false},
	}
	for _, tt := range tests {
		t.Run(tt.input, func(t *testing.T) {
			if got := IsKebabCase(tt.input); got != tt.want {
				t.Errorf("IsKebabCase(%q) = %v, want %v", tt.input, got, tt.want)
			}
		})
	}
}

func TestHasScreamingIDToken(t *testing.T) {
	tests := []struct {
		input string
		want  bool
	}{
		{"orgID", true},
		{"getByID", true},
		{"deleteByID", true},
		{"orgId", false},
		{"getById", false},
		{"id", false},
	}
	for _, tt := range tests {
		t.Run(tt.input, func(t *testing.T) {
			if got := HasScreamingIDToken(tt.input); got != tt.want {
				t.Errorf("HasScreamingIDToken(%q) = %v, want %v", tt.input, got, tt.want)
			}
		})
	}
}

func TestToCamelCase(t *testing.T) {
	tests := []struct {
		input string
		want  string
	}{
		{"org_id", "orgId"},
		{"created_at", "createdAt"},
		{"OrgID", "orgId"},
		{"getByID", "getById"},
		{"simple", "simple"},
	}
	for _, tt := range tests {
		t.Run(tt.input, func(t *testing.T) {
			if got := ToCamelCase(tt.input); got != tt.want {
				t.Errorf("ToCamelCase(%q) = %q, want %q", tt.input, got, tt.want)
			}
		})
	}
}

func TestGetCamelCaseIssues(t *testing.T) {
	// Under the canonical identifier-naming contract, GetCamelCaseIssues
	// is unconditional: DB-mirrored names no longer get a pass. See
	// docs/casing-rules.md.
	tests := []struct {
		name           string
		wantIssueCount int
	}{
		// Valid camelCase.
		{"userId", 0},
		{"orgId", 0},
		{"simple", 0},

		// Legacy DB-mirrored names — formerly exempt, now flagged.
		{"created_at", 1},
		{"user_id", 1},
		{"plan_id", 1},
		{"organization_id", 1},

		// Other legacy snake_case identifiers under the deprecation path
		// (pagination envelope fields migrate at per-resource version bump).
		{"page_size", 1},
		{"total_count", 1},

		// Non-DB snake_case — still flagged (always was).
		{"custom_field", 1},

		// Other violations.
		{"OrgName", 1}, // Starts with uppercase
		{"orgID", 1},   // SCREAMING ID token

		// Formerly flagged via `knownLowercaseSuffixViolations`; Phase 4.D
		// retired that allowlist because every historical offender lives
		// in a deprecated directory that the audit walker skips. The
		// identifier is all-lowercase letters so it passes `IsCamelCase`;
		// a regression would instead surface through `screamingIDRE`
		// (e.g., `userID`) or Rule 4's path-param `IsBadPathParam`.
		{"userid", 0},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			issues := GetCamelCaseIssues(tt.name)
			if len(issues) != tt.wantIssueCount {
				t.Errorf("GetCamelCaseIssues(%q) returned %d issues, want %d: %+v",
					tt.name, len(issues), tt.wantIssueCount, issues)
			}
		})
	}
}

func TestIsValidOperationID(t *testing.T) {
	tests := []struct {
		input string
		want  bool
	}{
		{"getPatterns", true},
		{"createWorkspace", true},
		{"listEnvironments", true},
		{"GetPatterns", false},
		{"get_patterns", false},
		{"get", false},
	}
	for _, tt := range tests {
		t.Run(tt.input, func(t *testing.T) {
			if got := IsValidOperationID(tt.input); got != tt.want {
				t.Errorf("IsValidOperationID(%q) = %v, want %v", tt.input, got, tt.want)
			}
		})
	}
}

func TestIsBadPathParam(t *testing.T) {
	tests := []struct {
		input string
		want  bool
	}{
		{"orgId", false},
		{"id", false},
		{"workspaceId", false},
		{"orgID", true},
		{"org_id", true},
		{"OrgId", true},
		{"orgid", true},
	}
	for _, tt := range tests {
		t.Run(tt.input, func(t *testing.T) {
			if got := IsBadPathParam(tt.input); got != tt.want {
				t.Errorf("IsBadPathParam(%q) = %v, want %v", tt.input, got, tt.want)
			}
		})
	}
}

func TestSuggestPathParam(t *testing.T) {
	tests := []struct {
		input string
		want  string
	}{
		{"id", "id"},
		{"org_id", "orgId"},
		{"orgID", "orgId"},
		{"workspaceId", "workspaceId"},
	}
	for _, tt := range tests {
		t.Run(tt.input, func(t *testing.T) {
			if got := SuggestPathParam(tt.input); got != tt.want {
				t.Errorf("SuggestPathParam(%q) = %q, want %q", tt.input, got, tt.want)
			}
		})
	}
}
