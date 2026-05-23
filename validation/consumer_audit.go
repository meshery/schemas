package validation

import (
	"fmt"
	"log"
	"path/filepath"
	"sort"
	"strings"
)

// DeletionRecord is one endpoint removed from the current audit run.
type DeletionRecord struct {
	Endpoint  string
	Method    string
	RemovedAt string
}

// ConsumerAuditOptions configures a single consumer-audit run.
type ConsumerAuditOptions struct {
	// Schema repo root (required).
	RootDir string

	// Consumer repos. Empty = skip that consumer.
	MesheryRepo string
	CloudRepo   string

	// TypeScript consumer repos. Each of these points at a checkout whose
	// ui/rtk-query (or equivalent) directories are parsed by the TS
	// consumer auditor. MesheryRepoUI defaults to MesheryRepo when unset
	// because meshery/meshery keeps Go and TS consumers in the same
	// checkout; CloudRepoUI likewise defaults to CloudRepo.
	MesheryRepoUI  string
	CloudRepoUI    string
	ExtensionsRepo string

	// Google Sheets update. Empty = no sheet interaction (dry run).
	SheetID           string
	SheetsCredentials []byte
}

// ConsumerAuditResult is the output of RunConsumerAudit.
type ConsumerAuditResult struct {
	// Analysis results.
	Match *matchResult

	// Reconciled state (nil if no previous state was provided).
	Tracked []TrackedEndpoint

	// NewDeletions are endpoints detected as removed on this run.
	NewDeletions []DeletionRecord

	// Output rows for sheet serialization (sorted, deterministic).
	Rows []AuditRow

	// Summary counts for terminal display.
	Summary auditSummary

	// TSFindings is the flat list of TypeScript consumer drift findings
	// (case-flips, snake_case wrappers, snake_case params) produced by
	// the TS consumer auditor. Sorted by (file, line, key) for
	// deterministic output. Empty when no TS consumer trees are provided.
	TSFindings []TSFinding
}

// ConsumerAuditRow is one row of the audit output.
type ConsumerAuditRow struct {
	Category            string
	SubCategory         string
	Endpoint            string
	Method              string
	EndpointStatus      string
	XAnnotated          string
	SchemaDrivenMeshery string
	SchemaDrivenCloud   string
	SchemaCompleteness  string
	PathDrift           string
	Notes               string
	// ChangeLog is the UTC timestamp of the last state transition
	// (new / changed) for this row, in format "YYYY-MM-DD HH:MM:SS".
	// Empty on rows that have never been touched by reconciliation.
	ChangeLog string
	// AnonymousAccess tracks whether the schema contract or implementation
	// evidence allows unauthenticated requests.
	AnonymousAccess string
}

// AuditRow remains a short alias used throughout the validation package.
type AuditRow = ConsumerAuditRow

// columnDef is one generated sheet column. The slice index in
// generatedColumns is the column's position in the sheet (A=0, B=1, …).
// Reconcile marks columns whose changes trigger a StateChanged transition.
// get and set allow row serializers to operate without referencing
// column indices anywhere else in the codebase.
type columnDef struct {
	Name      string
	Reconcile bool
	get       func(ConsumerAuditRow) string
	set       func(*ConsumerAuditRow, string)
}

// generatedColumns is the single authoritative definition of every
// tool-authored column. All sheet write ranges, the header row, row
// serialization, and reconciliation tracking are derived from this slice.
// To add or remove a column, only this slice needs to change.
var generatedColumns = []columnDef{
	{
		Name: "Category",
		get:  func(r ConsumerAuditRow) string { return r.Category },
		set:  func(r *ConsumerAuditRow, v string) { r.Category = v },
	},
	{
		Name: "Sub-Category",
		get:  func(r ConsumerAuditRow) string { return r.SubCategory },
		set:  func(r *ConsumerAuditRow, v string) { r.SubCategory = v },
	},
	{
		Name: "Endpoint",
		get:  func(r ConsumerAuditRow) string { return r.Endpoint },
		set:  func(r *ConsumerAuditRow, v string) { r.Endpoint = v },
	},
	{
		Name: "Method",
		get:  func(r ConsumerAuditRow) string { return r.Method },
		set:  func(r *ConsumerAuditRow, v string) { r.Method = v },
	},
	{
		Name:      "Endpoint Status",
		Reconcile: true,
		get:       func(r ConsumerAuditRow) string { return r.EndpointStatus },
		set:       func(r *ConsumerAuditRow, v string) { r.EndpointStatus = v },
	},
	{
		Name:      "x-annotated",
		Reconcile: true,
		get:       func(r ConsumerAuditRow) string { return r.XAnnotated },
		set:       func(r *ConsumerAuditRow, v string) { r.XAnnotated = v },
	},
	{
		Name:      "Schema-Driven (Meshery)",
		Reconcile: true,
		get:       func(r ConsumerAuditRow) string { return r.SchemaDrivenMeshery },
		set:       func(r *ConsumerAuditRow, v string) { r.SchemaDrivenMeshery = v },
	},
	{
		Name:      "Schema-Driven (Cloud)",
		Reconcile: true,
		get:       func(r ConsumerAuditRow) string { return r.SchemaDrivenCloud },
		set:       func(r *ConsumerAuditRow, v string) { r.SchemaDrivenCloud = v },
	},
	{
		Name:      "Schema Completeness",
		Reconcile: true,
		get:       func(r ConsumerAuditRow) string { return r.SchemaCompleteness },
		set:       func(r *ConsumerAuditRow, v string) { r.SchemaCompleteness = v },
	},
	{
		Name: "Path Drift",
		get:  func(r ConsumerAuditRow) string { return r.PathDrift },
		set:  func(r *ConsumerAuditRow, v string) { r.PathDrift = v },
	},
	{
		Name: "Notes",
		get:  func(r ConsumerAuditRow) string { return r.Notes },
		set:  func(r *ConsumerAuditRow, v string) { r.Notes = v },
	},
	{
		Name: "Change Log",
		get:  func(r ConsumerAuditRow) string { return r.ChangeLog },
		set:  func(r *ConsumerAuditRow, v string) { r.ChangeLog = v },
	},
	{
		Name:      "Anonymous Access",
		Reconcile: true,
		get:       func(r ConsumerAuditRow) string { return r.AnonymousAccess },
		set:       func(r *ConsumerAuditRow, v string) { r.AnonymousAccess = v },
	},
}

// auditHeader is the canonical header row for generated sheet output.
var auditHeader = func() []string {
	h := make([]string, len(generatedColumns))
	for i, col := range generatedColumns {
		h[i] = col.Name
	}
	return h
}()

// toRow converts the audit row to its serialized string slice. The
// returned slice contains generated columns only.
func (r ConsumerAuditRow) toRow() []string {
	cells := make([]string, len(generatedColumns))
	for i, col := range generatedColumns {
		cells[i] = col.get(r)
	}
	return cells
}

// rowFromStrings reconstructs an AuditRow from a serialized string slice.
// Missing trailing columns are tolerated.
func rowFromStrings(cols []string) ConsumerAuditRow {
	get := func(i int) string {
		if i < len(cols) {
			return cols[i]
		}
		return ""
	}
	var row ConsumerAuditRow
	for i, col := range generatedColumns {
		col.set(&row, get(i))
	}
	return row
}

// EndpointState enumerates the reconciliation states a live audit row can be in.
type EndpointState int

const (
	StateNew EndpointState = iota
	StateExisting
	StateChanged
)

// TrackedEndpoint is one reconciled row with state transition. The CLI
// consumes this to render the diff section.
type TrackedEndpoint struct {
	Row   ConsumerAuditRow
	State EndpointState
	// Prev is the row as it appeared on the previous run. Populated only
	// when State == StateChanged, so the CLI can render before/after diffs.
	Prev *ConsumerAuditRow
}

// auditSummary captures the high-level counts shown in the terminal table.
type auditSummary struct {
	SchemaEndpoints     int
	MesheryEndpoints    int
	CloudEndpoints      int
	SchemaOnly          int
	SchemaOnlyMeshery   int
	SchemaOnlyCloud     int
	ConsumerOnlyMeshery int
	ConsumerOnlyCloud   int
	// x-annotation breakdown across schema-defined endpoints.
	AnnotatedMeshery int
	AnnotatedCloud   int
	AnnotatedBoth    int
	// SchemaCompletenessTrue is the count of schema-defined endpoints whose
	// schema passes blocking validation.
	SchemaCompletenessTrue int
}

type constructScope struct {
	Version   string
	Construct string
}

type schemaCompletenessIndex struct {
	Incomplete map[constructScope]bool
}

const (
	XAnnotatedBoth        = "Both"
	XAnnotatedCloudOnly   = "Cloud only"
	XAnnotatedMesheryOnly = "Meshery only"
	XAnnotatedNoSchema    = "No schema"

	EndpointStatusActiveBoth                      = "Active - Both"
	EndpointStatusActiveMesheryServer             = "Active - Meshery Server"
	EndpointStatusActiveMesheryCloud              = "Active - Meshery Cloud"
	EndpointStatusActiveMesheryServerMissingCloud = "Active - Meshery Server, Unimplemented Meshery Cloud"
	EndpointStatusActiveMesheryCloudMissingServer = "Active - Meshery Cloud, Unimplemented Meshery Server"
	EndpointStatusUnimplementedBoth               = "Unimplemented Both"
	EndpointStatusUnimplementedMesheryServer      = "Unimplemented Meshery Server"
	EndpointStatusUnimplementedMesheryCloud       = "Unimplemented Meshery Cloud"
)

// RunConsumerAudit is the single entry point for the consumer audit pipeline.
func RunConsumerAudit(opts ConsumerAuditOptions) (*ConsumerAuditResult, error) {
	return runConsumerAudit(opts, nil, nil)
}

// runConsumerAudit is the test-friendly version that accepts pre-built
// sourceTrees in place of repo paths.
func runConsumerAudit(opts ConsumerAuditOptions, mesheryTree, cloudTree sourceTree) (*ConsumerAuditResult, error) {
	if opts.RootDir == "" {
		return nil, fmt.Errorf("consumer-audit: RootDir is required")
	}

	idx, err := buildEndpointIndex(opts.RootDir)
	if err != nil {
		return nil, fmt.Errorf("consumer-audit: build endpoint index: %w", err)
	}

	if mesheryTree == nil && opts.MesheryRepo != "" {
		mesheryTree = localTree{root: opts.MesheryRepo}
	}
	if cloudTree == nil && opts.CloudRepo != "" {
		cloudTree = localTree{root: opts.CloudRepo}
	}

	var mesheryEndpoints []consumerEndpoint
	if mesheryTree != nil {
		mesheryEndpoints, err = parseGorillaRoutes(mesheryTree)
		if err != nil {
			return nil, fmt.Errorf("consumer-audit: parse meshery routes: %w", err)
		}
		mesheryEndpoints = indexHandlers(mesheryTree, mesheryEndpoints)
	}

	var cloudEndpoints []consumerEndpoint
	if cloudTree != nil {
		cloudEndpoints, err = parseEchoRoutes(cloudTree)
		if err != nil {
			return nil, fmt.Errorf("consumer-audit: parse cloud routes: %w", err)
		}
		cloudEndpoints = indexHandlers(cloudTree, cloudEndpoints)
	}

	match := matchEndpoints(idx, mesheryEndpoints, cloudEndpoints)
	completeness := buildSchemaCompletenessIndex(opts.RootDir)

	mesheryProvided := mesheryTree != nil
	cloudProvided := cloudTree != nil

	rows := buildAuditRows(idx, match, mesheryProvided, cloudProvided, completeness)
	sortAuditRows(rows)

	summary := computeSummary(idx, mesheryEndpoints, cloudEndpoints, match, rows, mesheryProvided, cloudProvided)

	result := &ConsumerAuditResult{
		Match:   match,
		Rows:    rows,
		Summary: summary,
	}

	// TypeScript consumer pass. Each tree is optional; callers that only
	// care about the Go routers will not provide any. Findings are
	// accumulated onto the result so the CLI can surface them as a
	// post-script to the main endpoint table.
	result.TSFindings = runTSConsumers(opts, mesheryTree, cloudTree)

	if err := reconcileFromOpts(opts, result); err != nil {
		return result, err
	}

	return result, nil
}

// runTSConsumers invokes parseTSConsumer against every configured TS
// consumer tree and returns the aggregated findings. Each entry in
// tsConsumerRegistry couples a repo identity with a lazy tree constructor so
// new consumers can be added by appending to the registry.
func runTSConsumers(opts ConsumerAuditOptions, mesheryGoTree, cloudGoTree sourceTree) []TSFinding {
	registry := []struct {
		repo TSConsumerRepo
		tree sourceTree
	}{
		{TSConsumerMeshery, resolveTSTree(opts.MesheryRepoUI, opts.MesheryRepo, mesheryGoTree)},
		{TSConsumerCloud, resolveTSTree(opts.CloudRepoUI, opts.CloudRepo, cloudGoTree)},
		{TSConsumerExtensions, resolveTSTree(opts.ExtensionsRepo, "", nil)},
	}
	var findings []TSFinding
	for _, entry := range registry {
		if entry.tree == nil {
			continue
		}
		_, fs, err := parseTSConsumer(entry.tree, entry.repo)
		if err != nil {
			// Don't abort the whole audit on a single TS-repo parse error;
			// the log message is sufficient for the regenerator, and the
			// Go-side audit should still surface.
			log.Printf("consumer-audit: ts: %s: %v", entry.repo, err)
			continue
		}
		findings = append(findings, fs...)
	}
	sortTSFindings(findings)
	return findings
}

// resolveTSTree picks the best source tree for a TS consumer given the
// explicit override path, the Go-side repo path (fallback for repos that
// co-locate Go and TS), and a pre-built Go tree (reused for tests).
func resolveTSTree(override, fallback string, reuse sourceTree) sourceTree {
	if override != "" {
		return localTree{root: override}
	}
	if fallback != "" {
		return localTree{root: fallback}
	}
	return reuse
}

// buildAuditRows materializes one AuditRow per endpoint, joining schema and
// consumer info. The result is unsorted; sortAuditRows is the canonical
// ordering used everywhere downstream.
func buildAuditRows(
	idx *schemaIndex,
	match *matchResult,
	mesheryProvided, cloudProvided bool,
	completeness schemaCompletenessIndex,
) []ConsumerAuditRow {
	rows := make([]AuditRow, 0, len(idx.Endpoints)+len(match.ConsumerOnly))
	matchIndex := make(map[schemaRowKey]endpointMatch, len(match.Matched))
	for _, m := range match.Matched {
		matchIndex[schemaRowKeyOf(m.Schema)] = m
	}

	type auditDisplayKey struct {
		Endpoint string
		Method   string
	}
	consumerOnlyByKey := make(map[auditDisplayKey][]consumerEndpoint, len(match.ConsumerOnly))
	for _, c := range match.ConsumerOnly {
		key := auditDisplayKey{Endpoint: c.Path, Method: c.Method}
		consumerOnlyByKey[key] = append(consumerOnlyByKey[key], c)
	}

	// Schema-defined endpoints (matched + schema-only).
	for _, ep := range idx.Endpoints {
		key := auditDisplayKey{Endpoint: ep.Path, Method: ep.Method}
		consumers := append([]consumerEndpoint(nil), matchIndex[schemaRowKeyOf(ep)].Consumers...)
		if extra := consumerOnlyByKey[key]; len(extra) > 0 {
			consumers = append(consumers, extra...)
			delete(consumerOnlyByKey, key)
		}
		row := newSchemaRow(ep, consumers, mesheryProvided, cloudProvided, completeness)
		rows = append(rows, row)
	}

	// Consumer-only rows are consolidated by (method, path) so the same
	// schema-less endpoint implemented in both consumers appears once.
	for _, consumers := range consumerOnlyByKey {
		row := newConsumerOnlyRow(consumers, mesheryProvided, cloudProvided)
		rows = append(rows, row)
	}
	return rows
}

type schemaRowKey struct {
	SourceFile string
	Method     string
	Path       string
}

func schemaRowKeyOf(ep schemaEndpoint) schemaRowKey {
	return schemaRowKey{SourceFile: ep.SourceFile, Method: ep.Method, Path: ep.Path}
}

func newSchemaRow(
	ep schemaEndpoint,
	consumers []consumerEndpoint,
	mesheryProvided, cloudProvided bool,
	completeness schemaCompletenessIndex,
) ConsumerAuditRow {
	row := ConsumerAuditRow{
		Category:        categoryFromTags(ep.Tags),
		SubCategory:     ep.Construct,
		Endpoint:        ep.Path,
		Method:          ep.Method,
		XAnnotated:      classifyXAnnotated(ep.XInternal),
		AnonymousAccess: boolAuditStatus(ep.Public),
	}

	mesheryAllowed := xInternalAllows(ep.XInternal, "meshery")
	cloudAllowed := xInternalAllows(ep.XInternal, "cloud")

	schemaComplete := completeness.completeFor(ep.Version, ep.Construct)

	mesheryConsumers := filterConsumersByRepo(consumers, "meshery")
	cloudConsumers := filterConsumersByRepo(consumers, "meshery-cloud")
	hints := hintsFrom(ep)
	mesheryAssessment := assessConsumers(mesheryProvided && mesheryAllowed, "meshery", mesheryConsumers, ep.RequestShape, ep.ResponseShape, ep.QueryParams, hints)
	cloudAssessment := assessConsumers(cloudProvided && cloudAllowed, "meshery-cloud", cloudConsumers, ep.RequestShape, ep.ResponseShape, ep.QueryParams, hints)

	row.EndpointStatus = computeEndpointStatus(true, mesheryAllowed, cloudAllowed, len(mesheryConsumers) > 0, len(cloudConsumers) > 0)

	if mesheryAllowed {
		row.SchemaDrivenMeshery = mesheryAssessment.Status
	}
	if cloudAllowed {
		row.SchemaDrivenCloud = cloudAssessment.Status
	}

	// Schema Completeness is a property of the schema itself — the same value
	// applies to all consumers that the endpoint targets.
	if mesheryAllowed || cloudAllowed {
		row.SchemaCompleteness = boolAuditStatus(schemaComplete)
	}

	row.PathDrift = pathDriftValue(assessmentHasPathDrift(mesheryAssessment), assessmentHasPathDrift(cloudAssessment))
	row.Notes = buildLabeledNotes(mesheryAssessment, cloudAssessment)
	return row
}

func newConsumerOnlyRow(consumers []consumerEndpoint, mesheryProvided, cloudProvided bool) ConsumerAuditRow {
	if len(consumers) == 0 {
		return ConsumerAuditRow{}
	}

	category, subCategory := deriveConsumerLocation(consumers[0].Path)
	row := ConsumerAuditRow{
		Category:        category,
		SubCategory:     subCategory,
		Endpoint:        consumers[0].Path,
		Method:          consumers[0].Method,
		XAnnotated:      XAnnotatedNoSchema,
		AnonymousAccess: XAnnotatedNoSchema,
	}
	mesheryConsumers := filterConsumersByRepo(consumers, "meshery")
	cloudConsumers := filterConsumersByRepo(consumers, "meshery-cloud")

	row.EndpointStatus = computeEndpointStatus(false, false, false, len(mesheryConsumers) > 0, len(cloudConsumers) > 0)
	row.AnonymousAccess = consumerAnonymousAccessValue(consumers)
	// No schema: Schema-Driven and Schema Completeness are not applicable.
	row.Notes = ""
	return row
}

func consumerAnonymousAccessValue(consumers []consumerEndpoint) string {
	sawKnown := false
	for _, c := range consumers {
		if c.AnonymousAccess == nil {
			continue
		}
		sawKnown = true
		if *c.AnonymousAccess {
			return auditStatusTrue
		}
	}
	if sawKnown {
		return auditStatusFalse
	}
	return auditStatusNotAudited
}

// classifyXAnnotated returns the x-annotated column value derived from an
// endpoint's x-internal list.
//
// "Both"         — x-internal includes both "cloud" and "meshery".
// "Cloud only"   — x-internal: ["cloud"] only.
// "Meshery only" — x-internal: ["meshery"] only.
func classifyXAnnotated(xInternal []string) string {
	has := func(s string) bool {
		for _, x := range xInternal {
			if x == s {
				return true
			}
		}
		return false
	}
	switch {
	case has("meshery") && has("cloud"):
		return XAnnotatedBoth
	case has("cloud"):
		return XAnnotatedCloudOnly
	case has("meshery"):
		return XAnnotatedMesheryOnly
	}
	return ""
}

// computeEndpointStatus reports whether the endpoint is live in each consumer
// relative to the schema's scope. See the column legend in the audit sheet.
func computeEndpointStatus(schemaPresent, mApplies, cApplies, mActive, cActive bool) string {
	if !schemaPresent {
		switch {
		case mActive && cActive:
			return EndpointStatusActiveBoth
		case mActive:
			return EndpointStatusActiveMesheryServer
		case cActive:
			return EndpointStatusActiveMesheryCloud
		}
		return ""
	}
	switch {
	case mActive && cActive:
		return EndpointStatusActiveBoth
	case mActive && cApplies:
		return EndpointStatusActiveMesheryServerMissingCloud
	case mActive:
		return EndpointStatusActiveMesheryServer
	case cActive && mApplies:
		return EndpointStatusActiveMesheryCloudMissingServer
	case cActive:
		return EndpointStatusActiveMesheryCloud
	case mApplies && cApplies:
		return EndpointStatusUnimplementedBoth
	case mApplies:
		return EndpointStatusUnimplementedMesheryServer
	case cApplies:
		return EndpointStatusUnimplementedMesheryCloud
	}
	return ""
}

func filterConsumersByRepo(consumers []consumerEndpoint, repo string) []consumerEndpoint {
	out := make([]consumerEndpoint, 0, len(consumers))
	for i := range consumers {
		if consumers[i].Repo == repo {
			out = append(out, consumers[i])
		}
	}
	return out
}

// categoryFromTags maps an operation's first tag (or "Uncategorized") to the
// Category column. The schema is the source of truth — no fallback table.
func categoryFromTags(tags []string) string {
	if len(tags) == 0 {
		return "Uncategorized"
	}
	return tags[0]
}

func deriveConsumerLocation(endpoint string) (string, string) {
	trimmed := strings.Trim(endpoint, "/")
	if trimmed == "" {
		return "Uncategorized", "(consumer-only)"
	}
	parts := strings.Split(trimmed, "/")
	if len(parts) == 0 {
		return "Uncategorized", "(consumer-only)"
	}
	if parts[0] == "api" && len(parts) > 1 {
		category := parts[1]
		subCategory := category
		for _, part := range parts[2:] {
			if strings.HasPrefix(part, "{") && strings.HasSuffix(part, "}") {
				continue
			}
			subCategory = part
			break
		}
		return category, subCategory
	}
	return parts[0], parts[0]
}

// labeledNote is one actionable note paired with the source that produced it
// (schema / meshery / cloud). The optional Kind groups related notes together
// when rendered into the sheet Notes column.
type labeledNote struct {
	Source  string
	Kind    string
	Message string
}

// buildLabeledNotes produces the Notes column for a schema-backed row. Every
// note is attributed to its source and joined by a newline so the sheet shows
// one actionable line per issue.
func buildLabeledNotes(meshery, cloud consumerAssessment) string {
	var notes []labeledNote
	notes = append(notes, collectRepoNotes("meshery", "meshery", meshery)...)
	notes = append(notes, collectRepoNotes("cloud", "meshery-cloud", cloud)...)
	return joinLabeledNotes(notes)
}

func pathDriftValue(meshery, cloud bool) string {
	switch {
	case meshery && cloud:
		return "Both"
	case meshery:
		return "Meshery"
	case cloud:
		return "Cloud"
	default:
		return ""
	}
}

func assessmentHasPathDrift(a consumerAssessment) bool {
	for _, note := range a.Notes {
		if strings.Contains(note, "path parameter name differs from spec:") {
			return true
		}
	}
	return false
}

func collectRepoNotes(source, repo string, a consumerAssessment) []labeledNote {
	var out []labeledNote
	for _, n := range a.Notes {
		out = append(out, labeledNote{
			Source:  source,
			Kind:    "audit note",
			Message: stripRepoPrefix(n, repo),
		})
	}
	for _, n := range a.Drift {
		out = append(out, labeledNote{
			Source:  source,
			Kind:    "implementation drift",
			Message: stripRepoPrefix(n, repo),
		})
	}
	return out
}

// stripRepoPrefix removes a "<repo>: " or "<repo> " prefix from a note so the
// repo name is not duplicated with the label tag.
func stripRepoPrefix(note, repo string) string {
	for _, prefix := range []string{repo + ": ", repo + " "} {
		if strings.HasPrefix(note, prefix) {
			return strings.TrimPrefix(note, prefix)
		}
	}
	return note
}

func joinLabeledNotes(notes []labeledNote) string {
	type groupKey struct {
		Source string
		Kind   string
	}
	seen := make(map[string]bool, len(notes))
	groupOrder := make([]groupKey, 0, len(notes))
	grouped := make(map[groupKey][]string, len(notes))
	for _, n := range notes {
		if n.Message == "" {
			continue
		}
		dedupeKey := n.Source + "\x00" + n.Kind + "\x00" + n.Message
		if seen[dedupeKey] {
			continue
		}
		seen[dedupeKey] = true
		key := groupKey{Source: n.Source, Kind: n.Kind}
		if _, ok := grouped[key]; !ok {
			groupOrder = append(groupOrder, key)
		}
		grouped[key] = append(grouped[key], n.Message)
	}
	out := make([]string, 0, len(groupOrder))
	for _, key := range groupOrder {
		prefix := fmt.Sprintf("[%s]", key.Source)
		if key.Kind != "" {
			prefix += fmt.Sprintf(" [%s]", key.Kind)
		}
		messages := grouped[key]
		if len(messages) == 1 {
			out = append(out, prefix+" "+messages[0])
			continue
		}
		var block strings.Builder
		block.WriteString(prefix)
		block.WriteString("\n")
		for i, msg := range messages {
			if i > 0 {
				block.WriteString("\n")
			}
			block.WriteString("  ")
			block.WriteString(msg)
		}
		out = append(out, block.String())
	}
	return strings.Join(out, "\n\n")
}

func uniqueStrings(in []string) []string {
	seen := make(map[string]bool, len(in))
	out := make([]string, 0, len(in))
	for _, s := range in {
		if s == "" || seen[s] {
			continue
		}
		seen[s] = true
		out = append(out, s)
	}
	return out
}

// sortAuditRows orders rows by (Category, SubCategory, Endpoint, Method).
func sortAuditRows(rows []ConsumerAuditRow) {
	sort.Slice(rows, func(i, j int) bool {
		if rows[i].Category != rows[j].Category {
			return rows[i].Category < rows[j].Category
		}
		if rows[i].SubCategory != rows[j].SubCategory {
			return rows[i].SubCategory < rows[j].SubCategory
		}
		if rows[i].Endpoint != rows[j].Endpoint {
			return rows[i].Endpoint < rows[j].Endpoint
		}
		return rows[i].Method < rows[j].Method
	})
}

func boolAuditStatus(ok bool) string {
	if ok {
		return auditStatusTrue
	}
	return auditStatusFalse
}

func buildSchemaCompletenessIndex(rootDir string) schemaCompletenessIndex {
	result := Audit(AuditOptions{
		RootDir: rootDir,
	})
	index := schemaCompletenessIndex{
		Incomplete: make(map[constructScope]bool),
	}
	for _, v := range result.Blocking {
		index.add(v)
	}
	return index
}

func (i *schemaCompletenessIndex) add(v Violation) {
	scope, ok := constructScopeForFile(v.File)
	if !ok {
		return
	}
	i.Incomplete[scope] = true
}

func (i schemaCompletenessIndex) completeFor(version, construct string) bool {
	return !i.Incomplete[constructScope{
		Version:   version,
		Construct: construct,
	}]
}

func constructScopeForFile(file string) (constructScope, bool) {
	parts := strings.Split(strings.Trim(filepath.ToSlash(file), "/"), "/")
	for i, part := range parts {
		if part != "constructs" || i+2 >= len(parts) {
			continue
		}
		return constructScope{Version: parts[i+1], Construct: parts[i+2]}, true
	}
	if len(parts) >= 3 && parts[0] == "models" {
		return constructScope{Version: parts[1], Construct: parts[2]}, true
	}
	return constructScope{}, false
}

func computeSummary(
	idx *schemaIndex,
	meshery, cloud []consumerEndpoint,
	match *matchResult,
	rows []ConsumerAuditRow,
	mesheryProvided, cloudProvided bool,
) auditSummary {
	s := auditSummary{
		SchemaEndpoints:     len(idx.Endpoints),
		MesheryEndpoints:    len(meshery),
		CloudEndpoints:      len(cloud),
		SchemaOnly:          len(match.SchemaOnly),
		ConsumerOnlyMeshery: len(filterConsumersByRepo(match.ConsumerOnly, "meshery")),
		ConsumerOnlyCloud:   len(filterConsumersByRepo(match.ConsumerOnly, "meshery-cloud")),
	}
	for _, row := range rows {
		if row.XAnnotated == XAnnotatedNoSchema {
			continue
		}
		if unimplementedWithSchemaInConsumer(row, "meshery") {
			s.SchemaOnlyMeshery++
		}
		if unimplementedWithSchemaInConsumer(row, "cloud") {
			s.SchemaOnlyCloud++
		}
		switch row.XAnnotated {
		case XAnnotatedMesheryOnly:
			s.AnnotatedMeshery++
		case XAnnotatedCloudOnly:
			s.AnnotatedCloud++
		case XAnnotatedBoth:
			s.AnnotatedBoth++
		}
		if row.SchemaCompleteness == auditStatusTrue {
			s.SchemaCompletenessTrue++
		}
	}
	return s
}
