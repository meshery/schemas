// Command validate-schemas runs schema design validation on the
// meshery/schemas repository. It replaces the JavaScript validator
// (build/validate-schemas.js) with a Go implementation using kin-openapi.
//
// Usage:
//
//	go run ./cmd/validate-schemas                                    # blocking violations only
//	go run ./cmd/validate-schemas --warn                             # include advisory warnings
//	go run ./cmd/validate-schemas --warn --no-baseline               # full advisory backlog
//	go run ./cmd/validate-schemas --warn --no-baseline --style-debt  # include legacy style debt
//	go run ./cmd/validate-schemas --strict-consistency --style-debt --contract-debt  # fail on all debt
package main

import (
	"flag"
	"fmt"
	"os"
	"path/filepath"

	"github.com/meshery/schemas/validation"
)

func main() {
	warn := flag.Bool("warn", false, "Include advisory warnings in output (exit 0)")
	noBaseline := flag.Bool("no-baseline", false, "Ignore advisory baseline file")
	styleDebt := flag.Bool("style-debt", false, "Include legacy style debt")
	contractDebt := flag.Bool("contract-debt", false, "Include legacy contract debt")
	strict := flag.Bool("strict-consistency", false, "Fail on all style/design/contract debt")

	// Accept legacy flag aliases — bound to the same variables as their canonical counterparts.
	flag.BoolVar(styleDebt, "legacy-style", false, "Alias for --style-debt")
	flag.BoolVar(contractDebt, "compat-debt", false, "Alias for --contract-debt")
	flag.BoolVar(strict, "strict-debt", false, "Alias for --strict-consistency")

	flag.Parse()

	// Resolve repository root by walking up from the current working
	// directory looking for go.mod. This means validate-schemas must be
	// run from within the repository tree.
	rootDir, err := findRepoRoot()
	if err != nil {
		fmt.Fprintf(os.Stderr, "error: could not find repository root: %v\n", err)
		os.Exit(1)
	}

	opts := validation.AuditOptions{
		RootDir:      rootDir,
		Strict:       *strict,
		Warn:         *warn,
		NoBaseline:   *noBaseline,
		StyleDebt:    *styleDebt,
		ContractDebt: *contractDebt,
	}

	result := validation.Audit(opts)

	// Report blocking violations.
	if result.HasBlocking() {
		fmt.Fprintf(os.Stderr, "\nvalidate-schemas: %d blocking violation(s) found:\n\n",
			len(result.Blocking))
		for _, v := range result.Blocking {
			fmt.Fprintf(os.Stderr, "%s\n\n", v)
		}
	}

	// Report advisory violations.
	if *warn && len(result.Advisory) > 0 {
		fmt.Fprintf(os.Stderr, "\nvalidate-schemas: %d advisory issue(s) found:\n\n",
			len(result.Advisory))
		for _, v := range result.Advisory {
			fmt.Fprintf(os.Stderr, "%s\n\n", v)
		}
	}

	// Success messages.
	if !result.HasBlocking() {
		if *warn && len(result.Advisory) == 0 {
			if *noBaseline {
				fmt.Println("✓ validate-schemas: no advisory issues found.")
			} else {
				fmt.Println("✓ validate-schemas: no unbaselined advisory issues found.")
			}
		} else if !*warn {
			fmt.Println("✓ validate-schemas: no blocking violations found.")
		}
	}

	// Exit code.
	if *warn {
		os.Exit(0)
	}
	if result.HasBlocking() {
		os.Exit(1)
	}
	os.Exit(0)
}

// findRepoRoot walks up from the current working directory looking for go.mod.
func findRepoRoot() (string, error) {
	dir, err := os.Getwd()
	if err != nil {
		return "", err
	}

	for {
		if _, err := os.Stat(filepath.Join(dir, "go.mod")); err == nil {
			return dir, nil
		}
		parent := filepath.Dir(dir)
		if parent == dir {
			return "", fmt.Errorf("go.mod not found in any parent directory")
		}
		dir = parent
	}
}
