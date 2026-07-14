// Command consumer-audit runs the consumer audit: it walks meshery/schemas, joins
// it against handler implementations in meshery/meshery and meshery-cloud,
// and reports per-endpoint coverage and implementation drift.
//
// It also runs the TypeScript consumer auditor (validation.parseTSConsumer)
// against each provided TS tree and surfaces RTK Query drift findings —
// camelCase case-flips, snake_case body wrappers, and snake_case param keys
// — as a post-script to the main endpoint table.
//
// Usage:
//
//	go run ./cmd/consumer-audit
//	go run ./cmd/consumer-audit --meshery-repo=../meshery --cloud-repo=../meshery-cloud
//	go run ./cmd/consumer-audit --extensions-repo=../meshery-extensions
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
	mesheryRepo := flag.String("meshery-repo", "", "Path to a meshery/meshery checkout (Gorilla router + ui/rtk-query)")
	cloudRepo := flag.String("cloud-repo", "", "Path to a meshery-cloud checkout (Echo router + ui/api + ui/rtk-query)")
	extensionsRepo := flag.String("extensions-repo", "", "Path to a meshery-extensions checkout (meshmap/src/rtk-query)")
	mesheryRepoUI := flag.String("meshery-repo-ui", "", "Override the TS scan path for meshery (defaults to --meshery-repo)")
	cloudRepoUI := flag.String("cloud-repo-ui", "", "Override the TS scan path for meshery-cloud (defaults to --cloud-repo)")
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
		RootDir:        rootDir,
		MesheryRepo:    *mesheryRepo,
		CloudRepo:      *cloudRepo,
		MesheryRepoUI:  *mesheryRepoUI,
		CloudRepoUI:    *cloudRepoUI,
		ExtensionsRepo: *extensionsRepo,
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
	printTSFindings(out, result.TSFindings)

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

// printAuditReport renders the top-level summary: one row per audit metric.
// Columns are mutually exclusive sources: Schema (OpenAPI ops in this repo),
// Meshery (Gorilla routes), Cloud (Echo routes). A "-" means the metric is
// not applicable to that source. Metric labels are fixed strings also parsed
// by .github/workflows/schema-audit.yml when posting the PR comment.
func printAuditReport(out io.Writer, result *validation.ConsumerAuditResult) {
	s := result.Summary

	cell := func(n int, enabled bool) any {
		if !enabled {
			return "-"
		}
		return n
	}

	fmt.Fprintln(out)
	fmt.Fprintln(out, "Consumer Audit Report")
	fmt.Fprintln(out)

	// Keep labels stable: the CI comment job matches these exact strings.
	t := newTable(out, "Metric", "Schema", "Meshery", "Cloud")
	t.AddRow("Total endpoints", s.SchemaEndpoints, s.MesheryEndpoints, s.CloudEndpoints)
	t.AddRow("Spec applies to consumer", "-", s.AnnotatedMeshery+s.AnnotatedBoth, s.AnnotatedCloud+s.AnnotatedBoth)
	t.AddRow("Spec targets Meshery only", s.AnnotatedMeshery, "-", "-")
	t.AddRow("Spec targets Cloud only", s.AnnotatedCloud, "-", "-")
	t.AddRow("Spec targets both consumers", s.AnnotatedBoth, "-", "-")
	t.AddRow("Spec passes validation", s.SchemaCompletenessTrue, "-", "-")
	t.AddRow("Spec only (no handlers)", s.SchemaOnly, "-", "-")
	t.AddRow("Spec without consumer handler",
		"-",
		cell(s.SchemaOnlyMeshery, s.MesheryEndpoints > 0),
		cell(s.SchemaOnlyCloud, s.CloudEndpoints > 0))
	t.AddRow("Handler only (no spec)", "-", s.ConsumerOnlyMeshery, s.ConsumerOnlyCloud)
	t.Print()

	fmt.Fprintln(out)
	printAuditLegend(out)
}

// printAuditLegend explains each summary metric so the report is readable
// without tribal knowledge of the consumer-audit pipeline.
func printAuditLegend(out io.Writer) {
	fmt.Fprintln(out, "What each metric means")
	fmt.Fprintln(out, "  Columns: Schema = OpenAPI operations in meshery/schemas;")
	fmt.Fprintln(out, "           Meshery = routes in meshery/meshery;")
	fmt.Fprintln(out, "           Cloud = routes in meshery-cloud.")
	fmt.Fprintln(out, "  \"-\" means the metric does not apply to that column.")
	fmt.Fprintln(out)
	fmt.Fprintln(out, "  Total endpoints")
	fmt.Fprintln(out, "    Count of endpoints discovered in that source.")
	fmt.Fprintln(out, "  Spec applies to consumer")
	fmt.Fprintln(out, "    Schema operations whose x-internal targets this consumer")
	fmt.Fprintln(out, "    (eligible to be implemented there). Not \"how many handlers")
	fmt.Fprintln(out, "    already match a schema.\"")
	fmt.Fprintln(out, "  Spec targets Meshery only / Cloud only / both consumers")
	fmt.Fprintln(out, "    Breakdown of schema ops by x-internal scope (Schema column).")
	fmt.Fprintln(out, "  Spec passes validation")
	fmt.Fprintln(out, "    Schema-defined endpoints whose construct has no blocking")
	fmt.Fprintln(out, "    schema-audit violations (Schema Completeness = TRUE).")
	fmt.Fprintln(out, "  Spec only (no handlers)")
	fmt.Fprintln(out, "    In schemas, but no matching handler in any audited consumer.")
	fmt.Fprintln(out, "  Spec without consumer handler")
	fmt.Fprintln(out, "    Spec targets this consumer, but that consumer has no route")
	fmt.Fprintln(out, "    for it yet (per-consumer gap; may still exist elsewhere).")
	fmt.Fprintln(out, "  Handler only (no spec)")
	fmt.Fprintln(out, "    Route registered in the consumer with no matching schema op.")
}

type consumerActionSummary struct {
	label              string
	otherConsumerLabel string
	totalEndpoints     int
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
				"%s has %d active %s matching the schema but %s marked %s-only.\n",
				summary.label,
				summary.annotationMismatch,
				pluralize("endpoint", summary.annotationMismatch),
				verbFor(summary.annotationMismatch),
				consumerScopeLabel(summary.otherConsumerLabel),
			)
		}
		fmt.Fprintf(
			out,
			"Audited %d %s %s; %d spec-defined %s apply to %s.\n",
			summary.totalEndpoints,
			summary.label,
			pluralize("endpoint", summary.totalEndpoints),
			summary.applicableSpecs,
			pluralize("endpoint", summary.applicableSpecs),
			summary.label,
		)
		fmt.Fprintf(
			out,
			"Out of those %d applicable spec-defined %s, %d %s schema-driven.\n",
			summary.applicableSpecs,
			pluralize("endpoint", summary.applicableSpecs),
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
			"\nNote:\nOut of %d spec-defined %s %s, %d %s blocking schema-audit violations. Run `make audit-schemas` for details.\n",
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
		if isAnnotationMismatch(row, consumer) {
			summary.annotationMismatch++
		}
		if !appliesToConsumer(row, consumer) {
			continue
		}
		summary.applicableSpecs++
		if schemaDrivenValue(row, consumer) == "TRUE" {
			summary.schemaDriven++
		}
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
		return row.XAnnotated == validation.XAnnotatedMesheryOnly || row.XAnnotated == validation.XAnnotatedBoth
	case "cloud":
		return row.XAnnotated == validation.XAnnotatedCloudOnly || row.XAnnotated == validation.XAnnotatedBoth
	default:
		return false
	}
}

func isActiveInConsumer(row validation.ConsumerAuditRow, consumer string) bool {
	switch consumer {
	case "meshery":
		switch row.EndpointStatus {
		case validation.EndpointStatusActiveBoth,
			validation.EndpointStatusActiveMesheryServer,
			validation.EndpointStatusActiveMesheryServerMissingCloud:
			return true
		}
	case "cloud":
		switch row.EndpointStatus {
		case validation.EndpointStatusActiveBoth,
			validation.EndpointStatusActiveMesheryCloud,
			validation.EndpointStatusActiveMesheryCloudMissingServer:
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
		// "Both" targets both consumers — not a mismatch for either.
		return row.XAnnotated == validation.XAnnotatedCloudOnly
	case "cloud":
		return row.XAnnotated == validation.XAnnotatedMesheryOnly
	default:
		return false
	}
}

func schemaDrivenValue(row validation.ConsumerAuditRow, consumer string) string {
	if consumer == "meshery" {
		return row.SchemaDrivenMeshery
	}
	return row.SchemaDrivenCloud
}

func schemaCompletenessValue(row validation.ConsumerAuditRow, _ string) string {
	return row.SchemaCompleteness
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

// printTSFindings renders the TypeScript consumer auditor output. Findings
// are grouped by repo so reviewers can focus on a single downstream at a
// time. An empty list is a no-op so we don't introduce a header row for
// runs that didn't scan any TS tree.
func printTSFindings(out io.Writer, findings []validation.TSFinding) {
	if len(findings) == 0 {
		return
	}
	fmt.Fprintln(out)
	fmt.Fprintln(out, "TypeScript Consumer Findings")
	fmt.Fprintln(out)

	byRepo := map[validation.TSConsumerRepo][]validation.TSFinding{}
	for _, f := range findings {
		byRepo[f.Repo] = append(byRepo[f.Repo], f)
	}
	repos := make([]string, 0, len(byRepo))
	for repo := range byRepo {
		repos = append(repos, string(repo))
	}
	sort.Strings(repos)

	for _, repoName := range repos {
		repo := validation.TSConsumerRepo(repoName)
		list := byRepo[repo]
		if len(list) == 0 {
			continue
		}
		fmt.Fprintf(out, "  %s (%d %s):\n", repo, len(list), pluralize("finding", len(list)))
		for _, f := range list {
			loc := f.File
			if f.Line > 0 {
				loc = fmt.Sprintf("%s:%d", f.File, f.Line)
			}
			fmt.Fprintf(out, "    [%s] %s  %s %s  key=%q\n",
				f.Kind, loc, f.Method, f.URL, f.Key)
			if f.Message != "" {
				fmt.Fprintf(out, "      %s\n", f.Message)
			}
		}
		fmt.Fprintln(out)
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
			var changedColumns []string
			if t.Prev != nil {
				changedColumns = validation.AuditedChangedColumns(*t.Prev, t.Row)
			}
			for _, col := range changedColumns {
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
