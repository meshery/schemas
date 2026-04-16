package validation

import "testing"

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
