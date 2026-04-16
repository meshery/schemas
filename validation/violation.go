package validation

import "fmt"

// Severity classifies a violation as blocking or advisory.
type Severity int

const (
	// SeverityBlocking causes the validator to exit non-zero.
	SeverityBlocking Severity = iota
	// SeverityAdvisory is reported but does not cause a non-zero exit.
	SeverityAdvisory
)

func (s Severity) String() string {
	switch s {
	case SeverityBlocking:
		return "error"
	case SeverityAdvisory:
		return "warning"
	default:
		return "unknown"
	}
}

// Violation is a single schema design issue found during auditing.
type Violation struct {
	// File is the path to the file containing the violation, relative to the
	// repository root.
	File string

	// Message describes the violation in human-readable form.
	Message string

	// Severity indicates whether this violation is blocking or advisory.
	Severity Severity

	// RuleNumber is the rule that triggered this violation (1–41+).
	RuleNumber int
}

func (v Violation) String() string {
	return fmt.Sprintf("  %s\n    → %s", v.File, v.Message)
}

// AuditOptions configures the behavior of an Audit run.
type AuditOptions struct {
	// RootDir is the repository root directory.
	RootDir string

	// Strict promotes all advisory issues to blocking errors.
	Strict bool

	// Warn includes advisory violations in the output (exit 0).
	Warn bool

	// NoBaseline disables advisory baseline filtering.
	NoBaseline bool

	// StyleDebt includes legacy style debt in advisory output.
	StyleDebt bool

	// ContractDebt includes legacy contract debt in advisory output.
	ContractDebt bool
}

// AuditResult holds the outcome of a full schema audit.
type AuditResult struct {
	// Blocking violations cause the validator to exit non-zero.
	Blocking []Violation

	// Advisory violations are informational warnings.
	Advisory []Violation
}

// HasBlocking returns true if any blocking violations were found.
func (r AuditResult) HasBlocking() bool {
	return len(r.Blocking) > 0
}

// Total returns the total number of violations found.
func (r AuditResult) Total() int {
	return len(r.Blocking) + len(r.Advisory)
}
