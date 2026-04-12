package validation

import "testing"

func TestClassifyIssue(t *testing.T) {
	t.Run("strict makes issues blocking", func(t *testing.T) {
		s := classifyIssue(AuditOptions{Strict: true})
		if s != SeverityBlocking {
			t.Error("expected SeverityBlocking")
		}
	})

	t.Run("default makes issues advisory", func(t *testing.T) {
		s := classifyIssue(AuditOptions{})
		if s != SeverityAdvisory {
			t.Error("expected SeverityAdvisory")
		}
	})
}
