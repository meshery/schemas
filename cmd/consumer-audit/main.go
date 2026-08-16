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
	"strings"

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
	supersededReport := flag.Bool("superseded-report", false,
		"Report which version of each superseded construct every consumer resolves")
	supersededEnforce := flag.Bool("superseded-enforce", false,
		"Exit non-zero if any consumer resolves a superseded construct (implies --superseded-report)")
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

	// Superseded-construct report. Opt-in: downstream repos legitimately pin
	// superseded versions, and the Phase 4.A non-deletion policy in
	// docs/schema-tooling.md keeps them served indefinitely, so this is an
	// awareness tool by default rather than a gate. Printed after every
	// existing section so the fixed metric labels parsed by
	// .github/workflows/schema-audit.yml keep their positions.
	if *supersededReport || *supersededEnforce {
		sup, err := validation.RunSupersededAudit(validation.SupersededOptions{
			RootDir:        rootDir,
			MesheryRepo:    *mesheryRepo,
			CloudRepo:      *cloudRepo,
			ExtensionsRepo: *extensionsRepo,
			MesheryRepoUI:  *mesheryRepoUI,
			CloudRepoUI:    *cloudRepoUI,
		})
		if err != nil {
			fmt.Fprintf(os.Stderr, "consumer-audit: superseded report: %v\n", err)
			os.Exit(1)
		}
		printSupersededReport(out, sup)

		if *supersededEnforce {
			// An incomplete index is checked first and reported separately:
			// a clean usage result drawn from a partial index is not a pass,
			// it is an audit that could not see the whole tree. The distinct
			// exit code lets CI tell the two failures apart.
			if !sup.IsComplete() {
				fmt.Fprintln(out)
				fmt.Fprintf(out,
					"superseded-enforce: audit incomplete -- %d construct api.yml could not be indexed; "+
						"a clean result cannot be trusted.\n",
					len(sup.SkippedConstructs()))
				os.Exit(3)
			}
			// A consumer that was never scanned produces the same "not used"
			// rows as a consumer that is genuinely clean. Under enforcement
			// that distinction is the whole point, so an incomplete sweep
			// fails with the same code as an incomplete index.
			if !sup.FullyScanned() {
				fmt.Fprintln(out)
				for _, repo := range sup.UnscannedRepos() {
					n := len(repo.ScanDefects) + len(repo.UnparsedFiles)
					fmt.Fprintf(out,
						"superseded-enforce: %s was not fully scanned (%d %s); its result is not conclusive.\n",
						repo.Repo, n, pluralize("problem", n))
				}
				os.Exit(3)
			}
			if sup.HasSupersededUsage() {
				fmt.Fprintln(out)
				fmt.Fprintln(out, "superseded-enforce: at least one consumer resolves a superseded construct version.")
				os.Exit(2)
			}
			// "Cannot determine" is not "clean": a version-erased import
			// whose candidates include a superseded version leaves the
			// question open, so enforcement does not pass it.
			if sup.HasUnresolvedUsage() {
				fmt.Fprintln(out)
				fmt.Fprintln(out, "superseded-enforce: a consumer imports a version-erased path whose candidates")
				fmt.Fprintln(out, "include a superseded construct; the version cannot be determined from consumer code.")
				os.Exit(2)
			}
		}
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
// Columns are Schema (OpenAPI ops), Meshery (Gorilla routes), and Cloud
// (Echo routes). Metric labels are fixed strings also parsed by
// .github/workflows/schema-audit.yml when posting the PR comment.
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

	// Keep metric labels stable: the CI comment job matches these exact strings.
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

	// Only the two "missing handler" metrics need disambiguation; the rest
	// are self-explanatory from the label.
	fmt.Fprintln(out)
	fmt.Fprintln(out, "Note:")
	fmt.Fprintln(out, "Spec only (no handlers) --> no matching handler in any audited consumer.")
	fmt.Fprintln(out, "Spec without consumer handler --> this consumer is missing it (may exist elsewhere).")
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

// printSupersededReport renders the opt-in superseded-construct report: one
// row per (construct family, surface) per consumer, answering which version
// that consumer resolves. Sections that would be empty are omitted so a clean
// run stays short.
func printSupersededReport(out io.Writer, r *validation.SupersededReport) {
	if r == nil {
		return
	}

	fmt.Fprintln(out)
	fmt.Fprintln(out, "Superseded Construct Report")
	fmt.Fprintln(out)
	fmt.Fprintf(out,
		"%d of %d construct versions carry x-superseded-by; %d carry x-deprecated.\n",
		len(r.Superseded), len(r.Index.All), r.Index.DeprecatedCount())
	fmt.Fprintln(out, "Superseded versions stay served indefinitely (Phase 4.A non-deletion policy),")
	fmt.Fprintln(out, "so a pinned superseded version is a migration signal, not an error.")

	printSupersededIndexGaps(out, r)
	printBundledReachability(out, r)

	for _, repo := range r.Repos {
		fmt.Fprintln(out)
		fmt.Fprintf(out, "  %s (%s) - %d files scanned\n", repo.Repo, repo.Path, repo.FilesScanned)

		// Printed before the table, because it changes how every row below
		// should be read: "not used" from an unscanned tree means "not
		// seen".
		if !repo.FullyScanned() {
			n := len(repo.ScanDefects) + len(repo.UnparsedFiles)
			fmt.Fprintf(out, "    WARNING: this consumer was not fully scanned (%d %s).\n",
				n, pluralize("problem", n))
			fmt.Fprintln(out, "    Rows below say what was seen, not what exists:")
			for _, d := range repo.ScanDefects {
				fmt.Fprintf(out, "      %s\n        %s\n", d.Path, d.Reason)
			}
			for _, f := range repo.UnparsedFiles {
				fmt.Fprintf(out, "      %s\n        Go file could not be parsed; its imports were not scanned.\n", f)
			}
		}

		if len(repo.Resolutions) == 0 {
			fmt.Fprintln(out, "    no schema construct imports found")
			continue
		}

		t := newTable(out, "Construct", "Surface", "Resolves", "Files", "Status")
		for _, res := range repo.Resolutions {
			// A "not used" row has no surface, version or file count: the
			// consumer referenced no version of the family anywhere.
			if res.NotUsed {
				t.AddRow(res.Family, "-", "-", "-", "not used")
				continue
			}
			// A version-erased import resolves to several construct
			// versions, so it gets no "Resolves" value at all — naming one
			// would be a guess.
			if res.Ambiguous {
				status := "AMBIGUOUS " + res.ImportPath
				if len(res.AmbiguousSuperseded) > 0 {
					status += " -- may be " + strings.Join(res.AmbiguousSuperseded, ", ")
				}
				t.AddRow(res.Family, string(res.Surface), "unresolved", res.Files, status)
				continue
			}
			status := "current"
			if res.Superseded {
				status = "SUPERSEDED -> " + res.Terminal
			}
			t.AddRow(res.Family, string(res.Surface), res.Version, res.Files, status)
		}
		t.Print()

		// The bundled clients carry no version in the import, so this count
		// is deliberately not attributed to any construct version.
		if repo.BundledClientImports > 0 {
			fmt.Fprintf(out,
				"    %d bundled-client %s (cloudApi/mesheryApi); version not resolvable from consumer code.\n",
				repo.BundledClientImports, pluralize("import", repo.BundledClientImports))
		}
		notUsed, unresolved := 0, 0
		for _, res := range repo.Resolutions {
			if res.NotUsed {
				notUsed++
			}
			if res.Ambiguous && len(res.AmbiguousSuperseded) > 0 {
				unresolved++
			}
		}
		if n := repo.SupersededCount(); n > 0 {
			fmt.Fprintf(out, "    %d superseded %s; %d not used.\n",
				n, pluralize("resolution", n), notUsed)
		} else {
			fmt.Fprintf(out, "    clear of superseded construct versions; %d not used.\n", notUsed)
		}
		if unresolved > 0 {
			fmt.Fprintf(out,
				"    %d version-erased %s could not be resolved and may be on a superseded version.\n",
				unresolved, pluralize("import", unresolved))
		}
	}

	printSupersededAnomalies(out, r)
}

// printSupersededIndexGaps warns when the construct index does not cover the
// whole tree. Report mode still runs — an awareness tool that refuses to say
// anything because one api.yml is malformed is less useful than one that says
// what it could and could not see — but the gaps must be visible, because a
// construct missing from the index cannot be matched against any consumer and
// would otherwise read as absent rather than unknown.
func printSupersededIndexGaps(out io.Writer, r *validation.SupersededReport) {
	skipped := r.SkippedConstructs()
	if len(skipped) == 0 {
		return
	}

	fmt.Fprintln(out)
	fmt.Fprintf(out, "WARNING: %d construct api.yml could not be indexed. Consumers importing\n", len(skipped))
	fmt.Fprintln(out, "these versions cannot be detected, so a clean result below is not conclusive:")
	for _, s := range skipped {
		fmt.Fprintf(out, "    %s\n      %s\n", s.Path, s.Reason)
	}
}

// printBundledReachability reports surface 3, which is a property of this repo
// rather than of any consumer: build/lib/config.js drops x-deprecated
// constructs before the merge, so a superseded construct normally cannot reach
// a bundled RTK client at all.
func printBundledReachability(out io.Writer, r *validation.SupersededReport) {
	fmt.Fprintln(out)
	fmt.Fprintf(out, "Bundled clients (%s): ", validation.SurfaceBundled)
	if len(r.BundledReachable) == 0 {
		fmt.Fprintln(out, "no superseded construct reaches the merged spec,")
		fmt.Fprintln(out, "so no bundled client can expose one. Computed from the build's own merge")
		fmt.Fprintln(out, "exclusions, not inferred from consumer code.")
		return
	}
	fmt.Fprintf(out, "%d superseded %s still in the merged spec.\n",
		len(r.BundledReachable), pluralize("construct", len(r.BundledReachable)))
	fmt.Fprintln(out, "These can appear in a bundled client, and collide with their successor at")
	fmt.Fprintln(out, "merge time -- bundle-openapi.js throws on a duplicate route+method:")
	for _, c := range r.BundledReachable {
		fmt.Fprintf(out, "    %s -> %s  (%s)\n", c.Key, c.Terminal, c.SourceFile)
	}
}

// printSupersededAnomalies reports annotation defects. Both lists are normally
// empty; they exist so a regression in the annotation data is visible rather
// than silently narrowing what the report can detect.
func printSupersededAnomalies(out io.Writer, r *validation.SupersededReport) {
	if len(r.DanglingSuccessors) > 0 {
		fmt.Fprintln(out)
		fmt.Fprintf(out, "  x-superseded-by pointing at a construct that does not exist (%d):\n",
			len(r.DanglingSuccessors))
		for _, c := range r.DanglingSuccessors {
			fmt.Fprintf(out, "    %s -> %q  (%s)\n", c.Key, c.SupersededBy, c.SourceFile)
		}
	}

	if len(r.DeprecatedWithoutSuccessor) > 0 {
		fmt.Fprintln(out)
		fmt.Fprintf(out, "  x-deprecated without x-superseded-by (%d):\n",
			len(r.DeprecatedWithoutSuccessor))
		fmt.Fprintln(out, "  Consumers on these cannot be pointed at a migration target.")
		for _, c := range r.DeprecatedWithoutSuccessor {
			fmt.Fprintf(out, "    %s  (%s)\n", c.Key, c.SourceFile)
		}
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
