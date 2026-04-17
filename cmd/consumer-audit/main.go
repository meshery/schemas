// Command consumer-audit runs the consumer audit: it walks meshery/schemas, joins
// it against handler implementations in meshery/meshery and meshery-cloud,
// and reports per-endpoint coverage and implementation drift.
//
// Usage:
//
//	go run ./cmd/consumer-audit
//	go run ./cmd/consumer-audit --meshery-repo=../meshery --cloud-repo=../meshery-cloud
//	go run ./cmd/consumer-audit --sheet-id=<id> --credentials=<path>      # reconcile and update the canonical sheet
package main

import (
	"flag"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"sort"

	"github.com/meshery/schemas/validation"
	"github.com/rodaine/table"
)

func main() {
	mesheryRepo := flag.String("meshery-repo", "", "Path to a meshery/meshery checkout (Gorilla router)")
	cloudRepo := flag.String("cloud-repo", "", "Path to a meshery-cloud checkout (Echo router)")
	verbose := flag.Bool("verbose", false, "Print per-endpoint Schema-only and Consumer-only lists")
	sheetID := flag.String("sheet-id", "", "Google Sheet ID to reconcile against and update")
	credentials := flag.String("credentials", "", "Path to Google service-account JSON credentials (required with --sheet-id)")
	flag.Parse()

	rootDir, err := findRepoRoot()
	if err != nil {
		fmt.Fprintf(os.Stderr, "consumer-audit: could not find repository root: %v\n", err)
		os.Exit(1)
	}

	if (*sheetID == "") != (*credentials == "") {
		fmt.Fprintln(os.Stderr, "consumer-audit: --sheet-id and --credentials must be provided together")
		os.Exit(1)
	}

	opts := validation.ConsumerAuditOptions{
		RootDir:     rootDir,
		MesheryRepo: *mesheryRepo,
		CloudRepo:   *cloudRepo,
	}

	if *sheetID != "" {
		creds, err := os.ReadFile(resolvePath(rootDir, *credentials))
		if err != nil {
			fmt.Fprintf(os.Stderr, "consumer-audit: read credentials: %v\n", err)
			os.Exit(1)
		}
		opts.SheetID = *sheetID
		opts.SheetsCredentials = creds
	}

	result, err := validation.RunConsumerAudit(opts)
	if err != nil {
		fmt.Fprintf(os.Stderr, "consumer-audit: %v\n", err)
		os.Exit(1)
	}

	out := io.Writer(os.Stdout)
	printAuditReport(out, result)
	printActionItems(out, result, *mesheryRepo != "", *cloudRepo != "")

	if *verbose {
		printVerbose(out, result)
	}

	if len(result.Tracked) > 0 || len(result.NewDeletions) > 0 {
		fmt.Fprintln(out)
		printDiff(out, result.Tracked, result.NewDeletions)
	}
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

func newTable(out io.Writer, cols ...any) table.Table {
	t := table.New(cols...)
	t.WithWriter(out)
	return t
}

// printAuditReport renders the top-level summary (Table 1 in the spec): one
// row per audit dimension, one column per source.
func printAuditReport(out io.Writer, result *validation.ConsumerAuditResult) {
	s := result.Summary

	cell := func(n int, enabled bool) any {
		if !enabled {
			return "-"
		}
		return n
	}

	fmt.Fprintln(out)
	fmt.Fprintln(out, "Audit Report")
	fmt.Fprintln(out)

	t := newTable(out,
		"Category", "Schema", "Meshery", "Cloud")
	t.AddRow("Total Endpoints", s.SchemaEndpoints, s.MesheryEndpoints, s.CloudEndpoints)
	t.AddRow("Schema Backed", "-", s.Meshery.BackedTrue, s.Cloud.BackedTrue)
	t.AddRow("Schema Completeness (TRUE)", "-", s.Meshery.CompletenessTrue, s.Cloud.CompletenessTrue)
	t.AddRow("Schema Only (Not Implemented)",
		s.SchemaOnly,
		cell(s.SchemaOnlyMeshery, s.MesheryEndpoints > 0),
		cell(s.SchemaOnlyCloud, s.CloudEndpoints > 0))
	t.AddRow("Consumer Only", "-", s.ConsumerOnlyMeshery, s.ConsumerOnlyCloud)
	t.Print()
}

type consumerActionSummary struct {
	label              string
	otherConsumerLabel string
	totalEndpoints     int
	schemaBacked       int
	schemaDriven       int
	schemaIncomplete   int
	applicableSpecs    int
	unimplemented      int
	annotationMismatch int
}

// printActionItems renders a prose summary of the highest-signal consumer gaps.
func printActionItems(out io.Writer, result *validation.ConsumerAuditResult, mesheryProvided, cloudProvided bool) {
	if result == nil {
		return
	}

	var summaries []consumerActionSummary
	if mesheryProvided {
		summaries = append(summaries, buildConsumerActionSummary(
			result,
			"meshery",
			"Meshery Server",
			"Meshery Cloud",
			result.Summary.MesheryEndpoints,
		))
	}
	if cloudProvided {
		summaries = append(summaries, buildConsumerActionSummary(
			result,
			"cloud",
			"Meshery Cloud",
			"Meshery Server",
			result.Summary.CloudEndpoints,
		))
	}
	if len(summaries) == 0 {
		return
	}

	fmt.Fprintln(out)
	fmt.Fprintln(out, "Action Needed")
	fmt.Fprintln(out)

	for i, summary := range summaries {
		if summary.annotationMismatch > 0 {
			fmt.Fprintf(
				out,
				"%s has %d active %s that match the schema but %s marked %s-only.\n",
				summary.label,
				summary.annotationMismatch,
				pluralize("endpoint", summary.annotationMismatch),
				verbFor(summary.annotationMismatch),
				consumerScopeLabel(summary.otherConsumerLabel),
			)
		}
		fmt.Fprintf(
			out,
			"Audited %d %s %s, %d %s schema-backed.\n",
			summary.totalEndpoints,
			summary.label,
			pluralize("endpoint", summary.totalEndpoints),
			summary.schemaBacked,
			verbFor(summary.schemaBacked),
		)
		fmt.Fprintf(
			out,
			"Out of those %d schema-backed %s, %d %s schema-driven.\n",
			summary.schemaBacked,
			pluralize("endpoint", summary.schemaBacked),
			summary.schemaDriven,
			verbFor(summary.schemaDriven),
		)
		fmt.Fprintf(
			out,
			"Out of %d spec-defined %s %s, %d %s unimplemented.\n",
			summary.applicableSpecs,
			summary.label,
			pluralize("endpoint", summary.applicableSpecs),
			summary.unimplemented,
			verbFor(summary.unimplemented),
		)
		fmt.Fprintf(
			out,
			"\n Note: \n Out of %d spec-defined %s %s, %d %s schema-audit violations. Run `make audit-schemas` for details.\n",
			summary.applicableSpecs,
			summary.label,
			pluralize("endpoint", summary.applicableSpecs),
			summary.schemaIncomplete,
			verbFor(summary.schemaIncomplete),
		)
		if i < len(summaries)-1 {
			fmt.Fprintln(out)
		}
	}
}

func buildConsumerActionSummary(
	result *validation.ConsumerAuditResult,
	consumer, label, otherConsumerLabel string,
	totalEndpoints int,
) consumerActionSummary {
	summary := consumerActionSummary{
		label:              label,
		otherConsumerLabel: otherConsumerLabel,
		totalEndpoints:     totalEndpoints,
	}

	for _, row := range result.Rows {
		if schemaBackedValue(row, consumer) == "TRUE" {
			summary.schemaBacked++
			if schemaDrivenValue(row, consumer) == "TRUE" {
				summary.schemaDriven++
			}
		}
		if isAnnotationMismatch(row, consumer) {
			summary.annotationMismatch++
		}
		if !appliesToConsumer(row, consumer) {
			continue
		}
		summary.applicableSpecs++
		if schemaCompletenessValue(row, consumer) == "FALSE" {
			summary.schemaIncomplete++
		}
		if !isActiveInConsumer(row, consumer) {
			summary.unimplemented++
		}
	}

	return summary
}

func appliesToConsumer(row validation.ConsumerAuditRow, consumer string) bool {
	switch consumer {
	case "meshery":
		return row.XAnnotated == "None" || row.XAnnotated == "Meshery"
	case "cloud":
		return row.XAnnotated == "None" || row.XAnnotated == "Cloud only"
	default:
		return false
	}
}

func isActiveInConsumer(row validation.ConsumerAuditRow, consumer string) bool {
	switch consumer {
	case "meshery":
		switch row.EndpointStatus {
		case "Active - Both",
			"Active - Meshery Server",
			"Active - Meshery Server, Unimplemented Meshery Cloud":
			return true
		}
	case "cloud":
		switch row.EndpointStatus {
		case "Active - Both",
			"Active - Meshery Cloud",
			"Active - Meshery Cloud, Unimplemented Meshery Server":
			return true
		}
	}
	return false
}

func isAnnotationMismatch(row validation.ConsumerAuditRow, consumer string) bool {
	if !isActiveInConsumer(row, consumer) {
		return false
	}
	switch consumer {
	case "meshery":
		return row.XAnnotated == "Cloud only"
	case "cloud":
		return row.XAnnotated == "Meshery"
	default:
		return false
	}
}

func schemaBackedValue(row validation.ConsumerAuditRow, consumer string) string {
	if consumer == "meshery" {
		return row.SchemaBackedMeshery
	}
	return row.SchemaBackedCloud
}

func schemaDrivenValue(row validation.ConsumerAuditRow, consumer string) string {
	if consumer == "meshery" {
		return row.SchemaDrivenMeshery
	}
	return row.SchemaDrivenCloud
}

func schemaCompletenessValue(row validation.ConsumerAuditRow, consumer string) string {
	if consumer == "meshery" {
		return row.SchemaCompletenessMeshery
	}
	return row.SchemaCompletenessCloud
}

func pluralize(noun string, count int) string {
	if count == 1 {
		return noun
	}
	return noun + "s"
}

func verbFor(count int) string {
	if count == 1 {
		return "is"
	}
	return "are"
}

func consumerScopeLabel(label string) string {
	switch label {
	case "Meshery Server":
		return "Meshery Server"
	case "Meshery Cloud":
		return "Cloud"
	default:
		return label
	}
}

func printVerbose(out io.Writer, result *validation.ConsumerAuditResult) {
	if result == nil || result.Match == nil {
		return
	}
	if len(result.Match.SchemaOnly) > 0 {
		fmt.Fprintln(out)
		fmt.Fprintln(out, "Schema-only endpoints (defined but no handler):")
		for _, ep := range result.Match.SchemaOnly {
			fmt.Fprintf(out, "  %-7s %s   (%s)\n", ep.Method, ep.Path, ep.SourceFile)
		}
	}
	if len(result.Match.ConsumerOnly) > 0 {
		fmt.Fprintln(out)
		fmt.Fprintln(out, "Consumer-only endpoints (registered but no schema):")
		for _, c := range result.Match.ConsumerOnly {
			fmt.Fprintf(out, "  %-7s %s   (%s, %s)\n", c.Method, c.Path, c.Repo, c.HandlerName)
		}
	}
}

// printDiff prints a per-endpoint reconciliation log. For changed rows it
// shows each affected column as `column: "old" -> "new"`. The Notes column
// is intentionally skipped — it is derived, not signal.
func printDiff(out io.Writer, tracked []validation.TrackedEndpoint, deletions []validation.DeletionRecord) {
	var added, changed []validation.TrackedEndpoint
	for _, t := range tracked {
		switch t.State {
		case validation.StateNew:
			added = append(added, t)
		case validation.StateChanged:
			changed = append(changed, t)
		}
	}

	if len(added) == 0 && len(changed) == 0 && len(deletions) == 0 {
		fmt.Fprintln(out, "Reconciliation: no changes since last run")
		return
	}

	fmt.Fprintln(out, "Reconciliation: diff against previous state")

	sortTracked := func(rows []validation.TrackedEndpoint) {
		sort.Slice(rows, func(i, j int) bool {
			if rows[i].Row.Endpoint != rows[j].Row.Endpoint {
				return rows[i].Row.Endpoint < rows[j].Row.Endpoint
			}
			return rows[i].Row.Method < rows[j].Row.Method
		})
	}

	if len(added) > 0 {
		sortTracked(added)
		fmt.Fprintf(out, "\n  Added (%d):\n", len(added))
		for _, t := range added {
			fmt.Fprintf(out, "    %-7s %s\n", t.Row.Method, t.Row.Endpoint)
		}
	}

	if len(changed) > 0 {
		sortTracked(changed)
		fmt.Fprintf(out, "\n  Changed (%d):\n", len(changed))
		for _, t := range changed {
			fmt.Fprintf(out, "    %-7s %s\n", t.Row.Method, t.Row.Endpoint)
			for _, col := range t.Row.Metadata.ChangedColumns {
				if col == "Notes" {
					continue
				}
				prev := ""
				if t.Prev != nil {
					prev = validation.AuditedColumnValue(*t.Prev, col)
				}
				cur := validation.AuditedColumnValue(t.Row, col)
				fmt.Fprintf(out, "      %s: %q -> %q\n", col, prev, cur)
			}
		}
	}

	if len(deletions) > 0 {
		sorted := append([]validation.DeletionRecord(nil), deletions...)
		sort.Slice(sorted, func(i, j int) bool {
			if sorted[i].Endpoint != sorted[j].Endpoint {
				return sorted[i].Endpoint < sorted[j].Endpoint
			}
			return sorted[i].Method < sorted[j].Method
		})
		fmt.Fprintf(out, "\n  Removed (%d):\n", len(sorted))
		for _, d := range sorted {
			fmt.Fprintf(out, "    %-7s %s  %s\n", d.Method, d.Endpoint, d.RemovedAt)
		}
	}
}

func resolvePath(rootDir, path string) string {
	if path == "" || path == "-" || filepath.IsAbs(path) {
		return path
	}
	return filepath.Join(rootDir, path)
}
