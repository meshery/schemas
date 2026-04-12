package validation

// classifyIssue determines the severity for a validation issue based on
// audit options. By default, issues are advisory unless strict mode is enabled.
func classifyIssue(opts AuditOptions) Severity {
	if opts.Strict {
		return SeverityBlocking
	}
	return SeverityAdvisory
}
