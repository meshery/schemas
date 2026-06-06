package validation

import (
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func TestAddConstructViolation(t *testing.T) {
	blocking := Violation{File: "f", Message: "m", Severity: SeverityBlocking, RuleNumber: 1}
	advisory := Violation{File: "f", Message: "m", Severity: SeverityAdvisory, RuleNumber: 1}
	templateBlocking := Violation{File: "f", Message: "m", Severity: SeverityBlocking, RuleNumber: 34}
	promotedDesignDebt := Violation{
		File:       "f",
		Message:    "Schema \"Thing\" — property \"name\" has a manual `yaml:` tag in x-oapi-codegen-extra-tags.",
		Severity:   SeverityBlocking,
		RuleNumber: 27,
	}
	baseline := map[string]bool{}

	t.Run("deprecated: blocking violation is surfaced", func(t *testing.T) {
		result := AuditResult{}
		addConstructViolation(&result, blocking, baseline, true)
		if len(result.Blocking) != 1 {
			t.Errorf("expected 1 blocking violation, got %d", len(result.Blocking))
		}
		if len(result.Advisory) != 0 {
			t.Errorf("expected 0 advisory violations, got %d", len(result.Advisory))
		}
	})

	t.Run("deprecated: advisory violation is suppressed", func(t *testing.T) {
		result := AuditResult{}
		addConstructViolation(&result, advisory, baseline, true)
		if len(result.Advisory) != 0 {
			t.Errorf("expected 0 advisory violations, got %d", len(result.Advisory))
		}
		if len(result.Blocking) != 0 {
			t.Errorf("expected 0 blocking violations, got %d", len(result.Blocking))
		}
	})

	t.Run("deprecated: non-allowlisted blocking violation is suppressed", func(t *testing.T) {
		result := AuditResult{}
		addConstructViolation(&result, templateBlocking, baseline, true)
		if len(result.Blocking) != 0 {
			t.Errorf("expected 0 blocking violations, got %d", len(result.Blocking))
		}
	})

	t.Run("deprecated: strict-promoted design debt is suppressed", func(t *testing.T) {
		result := AuditResult{}
		addConstructViolation(&result, promotedDesignDebt, baseline, true)
		if len(result.Blocking) != 0 {
			t.Errorf("expected 0 blocking violations, got %d", len(result.Blocking))
		}
	})

	t.Run("non-deprecated: both severities are surfaced", func(t *testing.T) {
		result := AuditResult{}
		addConstructViolation(&result, blocking, baseline, false)
		addConstructViolation(&result, advisory, baseline, false)
		if len(result.Blocking) != 1 {
			t.Errorf("expected 1 blocking violation, got %d", len(result.Blocking))
		}
		if len(result.Advisory) != 1 {
			t.Errorf("expected 1 advisory violation, got %d", len(result.Advisory))
		}
	})
}

func TestAuditRunsBlockingRulesOnDeprecatedConstructs(t *testing.T) {
	root := t.TempDir()
	writeFile(t, filepath.Join(root, "schemas", "constructs", "v1beta1", "connection", "api.yml"), `
openapi: 3.0.0
info:
  title: Deprecated Connection
  version: v1beta1
  x-deprecated: true
paths: {}
`)
	writeFile(t, filepath.Join(root, "schemas", "constructs", "v1beta1", "connection", "connection.yaml"), `
type: object
additionalProperties: true
properties: {}
required:
  - id
`)
	writeFile(t, filepath.Join(root, "schemas", "constructs", "v1beta3", "connection", "api.yml"), `
openapi: 3.0.0
info:
  title: Connection
  version: v1beta3
paths: {}
`)
	writeFile(t, filepath.Join(root, "schemas", "constructs", "v1beta3", "connection", "connection.yaml"), `
type: object
additionalProperties: false
properties:
  id:
    type: string
required:
  - id
`)

	result := Audit(AuditOptions{RootDir: root})
	if !hasViolationForFile(result.Blocking, "schemas/constructs/v1beta1/connection/connection.yaml") {
		t.Fatalf("expected deprecated v1beta1 connection blocking violation, got %+v", result.Blocking)
	}
}

func TestClassifyStyleIssue(t *testing.T) {
	t.Run("strict makes style issues blocking", func(t *testing.T) {
		s := classifyStyleIssue(AuditOptions{Strict: true})
		if s == nil || *s != SeverityBlocking {
			t.Error("expected SeverityBlocking")
		}
	})

	t.Run("style debt makes them advisory", func(t *testing.T) {
		s := classifyStyleIssue(AuditOptions{StyleDebt: true})
		if s == nil || *s != SeverityAdvisory {
			t.Error("expected SeverityAdvisory")
		}
	})

	t.Run("default suppresses style issues", func(t *testing.T) {
		s := classifyStyleIssue(AuditOptions{})
		if s != nil {
			t.Errorf("expected nil, got %v", *s)
		}
	})
}

func writeFile(t *testing.T, path, content string) {
	t.Helper()
	if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(path, []byte(strings.TrimSpace(content)+"\n"), 0o644); err != nil {
		t.Fatal(err)
	}
}

func hasViolationForFile(violations []Violation, file string) bool {
	for _, v := range violations {
		if v.File == file {
			return true
		}
	}
	return false
}

func TestClassifyDesignIssue(t *testing.T) {
	t.Run("strict makes design issues blocking", func(t *testing.T) {
		s := classifyDesignIssue(AuditOptions{Strict: true})
		if s != SeverityBlocking {
			t.Error("expected SeverityBlocking")
		}
	})

	t.Run("default makes design issues advisory", func(t *testing.T) {
		s := classifyDesignIssue(AuditOptions{})
		if s != SeverityAdvisory {
			t.Error("expected SeverityAdvisory")
		}
	})
}

func TestClassifyContractIssue(t *testing.T) {
	t.Run("strict makes contract issues blocking", func(t *testing.T) {
		s := classifyContractIssue(AuditOptions{Strict: true})
		if s == nil || *s != SeverityBlocking {
			t.Error("expected SeverityBlocking")
		}
	})

	t.Run("default makes contract issues advisory", func(t *testing.T) {
		s := classifyContractIssue(AuditOptions{})
		if s == nil || *s != SeverityAdvisory {
			t.Error("expected SeverityAdvisory")
		}
	})
}
