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
	tests := []struct {
		name           string
		allowDB        bool
		dbTag          string
		wantIssueCount int
	}{
		{"userId", false, "", 0},
		{"created_at", true, "", 0},  // DB-mirrored, allowed
		{"created_at", false, "", 1}, // Not allowed without DB exemption
		{"OrgName", false, "", 1},    // Starts with uppercase
		{"orgID", false, "", 1},      // Screaming ID
		{"userid", false, "", 1},     // Known lowercase suffix
		{"plan_id", true, "", 0},     // DB-mirrored
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			issues := GetCamelCaseIssues(tt.name, tt.allowDB, tt.dbTag, "")
			if len(issues) != tt.wantIssueCount {
				t.Errorf("GetCamelCaseIssues(%q, %v) returned %d issues, want %d: %+v",
					tt.name, tt.allowDB, len(issues), tt.wantIssueCount, issues)
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
