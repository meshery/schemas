// Command phase0-consumer-graph builds a per-resource consumer-dependency
// graph across the downstream repos and produces the Phase 0 Agent 0.D
// baseline (validation/baseline/consumer-graph.json) used by Phase 3 per-
// resource sequencing in the identifier-naming migration
// (see docs/schema-tooling.md).
//
// Two kinds of imports are attributed:
//
//  1. Go imports of github.com/meshery/schemas/models/<version>/<resource>
//     are parsed precisely from each .go file's ImportSpec list, yielding
//     per-file, per-resource attribution.
//  2. TypeScript imports of @meshery/schemas/... are detected by regex.
//     Most TS consumers pull in the bundled `mesheryApi` or `cloudApi`
//     client and therefore transitively consume every resource at once;
//     those files are attributed to the coarse "bundled-client-consumer"
//     bucket rather than to a specific resource, because attributing them
//     to all 22 resources individually would bias the complexity score
//     without adding Phase-3 signal.
//
// The complexity score is documented: score = len(consuming_files) for the
// single-resource precision bucket, plus a separate `bundled_ts_consumers`
// count so Phase 3 sequencing can decide whether to factor TS depth in.
package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"go/parser"
	"go/token"
	"io/fs"
	"os"
	"path/filepath"
	"regexp"
	"sort"
	"strings"
	"time"
)

// resourceNode is the per-resource row in the graph.
type resourceNode struct {
	Resource        string   `json:"resource"`
	Versions        []string `json:"versions"`
	ConsumingFiles  []string `json:"consuming_files"`
	ComplexityScore int      `json:"complexity_score"`
}

// repoImports holds everything a single repo contributed.
type repoImports struct {
	Repo               string   `json:"repo"`
	Path               string   `json:"path"`
	GoFilesProcessed   int      `json:"go_files_processed"`
	TSFilesProcessed   int      `json:"ts_files_processed"`
	BundledTSConsumers []string `json:"bundled_ts_consumers"`
}

type graphReport struct {
	GeneratedAt          time.Time         `json:"generated_at"`
	GeneratedBy          string            `json:"generated_by"`
	Scope                string            `json:"scope"`
	ComplexityHeuristic  string            `json:"complexity_heuristic"`
	ResourceAliases      map[string]string `json:"resource_aliases"`
	Repos                []repoImports     `json:"repos"`
	Resources            []resourceNode    `json:"resources"`
	MissingFromInventory []string          `json:"missing_from_inventory,omitempty"`
	BundledTSTotal       int               `json:"bundled_ts_total"`
}

// resourceAliases documents non-obvious Go-package ↔ schema-construct
// renames so a Phase 3 orchestrator reading this graph can merge entries
// that travel together through the migration. Extend as more aliases
// surface.
var resourceAliases = map[string]string{
	"pattern": "design", // v1beta1/pattern is the v1beta1 Go package for the v1beta1 "design" schema; v1beta2 renamed it to design
}

// inventory22 enumerates the 22 resources named in master plan §9.1. The
// baseline derives resource entries from downstream consumer import paths
// (not from the schemas tree directly), so having this inventory list lets
// us verify no §9.1 item was silently skipped — e.g., schemas-only
// resources with no Go consumers surface explicitly in missing_from_inventory
// rather than silently disappearing.
var inventory22 = []string{
	"workspace", "environment", "organization", "user",
	"design", "connection", "team", "role",
	"credential", "event", "view", "key",
	"keychain", "invitation", "plan", "subscription",
	"token", "badge", "schedule", "model",
	"component", "relationship",
}

// repoSpec identifies a sibling repo and where to start scanning.
type repoSpec struct {
	label string
	path  string
	// scanDirs are repo-relative directories to walk. An empty list scans
	// the whole repo.
	goDirs []string
	tsDirs []string
}

// goImportPath isolates `github.com/meshery/schemas/models/<version>/<resource>`.
var goImportPath = regexp.MustCompile(`^github\.com/meshery/schemas/models/(v[0-9a-zA-Z]+)(?:/([a-zA-Z0-9_-]+))?$`)

// tsImportLine matches `from "@meshery/schemas[/path]"` and `from '@meshery/schemas[/path]'`.
var tsImportLine = regexp.MustCompile(`from\s+['"]@meshery/schemas(?:/[^'"\s]+)?['"]`)

func main() {
	mesheryRepo := flag.String("meshery-repo", "../meshery", "Path to the meshery/meshery repository root")
	cloudRepo := flag.String("cloud-repo", "../meshery-cloud", "Path to the layer5io/meshery-cloud repository root")
	extensionsRepo := flag.String("extensions-repo", "../meshery-extensions", "Path to the layer5labs/meshery-extensions repository root")
	output := flag.String("o", "validation/baseline/consumer-graph.json", "Output path for the JSON report (relative to repo root)")
	verbose := flag.Bool("v", false, "Print per-file progress to stderr")
	flag.Parse()

	rootDir, err := findRepoRoot()
	if err != nil {
		fmt.Fprintf(os.Stderr, "error: could not find repository root: %v\n", err)
		os.Exit(1)
	}

	repos := []repoSpec{
		{label: "meshery/meshery", path: *mesheryRepo,
			goDirs: []string{"server", "mesheryctl"},
			tsDirs: []string{"ui"}},
		{label: "layer5io/meshery-cloud", path: *cloudRepo,
			goDirs: []string{"server"},
			tsDirs: []string{"ui"}},
		{label: "layer5labs/meshery-extensions", path: *extensionsRepo,
			goDirs: []string{"meshmap/graphql"},
			tsDirs: []string{"meshmap/src"}},
	}

	// resource -> set of consuming files (repo|path) -> version set.
	type consumeRec struct {
		file     string
		versions map[string]struct{}
	}
	byResource := map[string]map[string]*consumeRec{}
	addConsumer := func(resource, repoLabel, file, version string) {
		if resource == "" {
			return
		}
		if byResource[resource] == nil {
			byResource[resource] = map[string]*consumeRec{}
		}
		key := repoLabel + "|" + file
		rec, ok := byResource[resource][key]
		if !ok {
			rec = &consumeRec{file: key, versions: map[string]struct{}{}}
			byResource[resource][key] = rec
		}
		if version != "" {
			rec.versions[version] = struct{}{}
		}
	}

	report := graphReport{
		GeneratedAt:         time.Now().UTC().Truncate(time.Second),
		GeneratedBy:         "cmd/phase0-consumer-graph",
		Scope:               "Imports of github.com/meshery/schemas/models/... (Go) and @meshery/schemas (TS) across sibling repos",
		ComplexityHeuristic: "complexity_score = count of distinct consuming files that import that resource's Go package. TS imports are tallied separately (bundled_ts_consumers) because most TS consumers pull in the full bundled client rather than a single resource.",
		ResourceAliases:     resourceAliases,
	}

	for _, r := range repos {
		abs, err := resolveAbsolutePath(rootDir, r.path)
		if err != nil {
			fmt.Fprintf(os.Stderr, "warn: %s: %v — skipping\n", r.label, err)
			continue
		}
		if info, err := os.Stat(abs); err != nil || !info.IsDir() {
			fmt.Fprintf(os.Stderr, "warn: %s: %s is not a directory — skipping\n", r.label, abs)
			continue
		}

		repoSummary := repoImports{Repo: r.label, Path: r.path}
		for _, dir := range r.goDirs {
			goFiles, err := scanGoImports(abs, dir, func(file, importPath string) {
				m := goImportPath.FindStringSubmatch(importPath)
				if m == nil {
					return
				}
				version := m[1]
				resource := m[2]
				if resource == "" {
					// An import of `.../models/v1beta1` without a sub-package
					// means the caller references the version root (typically
					// for cross-resource utilities). Record under a synthetic
					// "<version>.meta" bucket so it isn't silently dropped.
					resource = version + ".meta"
				}
				if *verbose {
					fmt.Fprintf(os.Stderr, "%s: %s -> %s (%s)\n", r.label, file, resource, version)
				}
				addConsumer(resource, r.label, file, version)
			})
			if err != nil {
				// Walk-level errors silently undercount the baseline; surface
				// them unconditionally (not gated on --verbose) so a
				// regenerator sees the failure.
				fmt.Fprintf(os.Stderr, "warn: %s: %s: %v\n", r.label, dir, err)
			}
			repoSummary.GoFilesProcessed += goFiles
		}
		for _, dir := range r.tsDirs {
			tsFiles, bundled, err := scanTSImports(abs, dir)
			if err != nil {
				fmt.Fprintf(os.Stderr, "warn: %s: %s: %v\n", r.label, dir, err)
			}
			repoSummary.TSFilesProcessed += tsFiles
			for _, b := range bundled {
				repoSummary.BundledTSConsumers = append(repoSummary.BundledTSConsumers, b)
			}
		}
		sort.Strings(repoSummary.BundledTSConsumers)
		report.Repos = append(report.Repos, repoSummary)
		report.BundledTSTotal += len(repoSummary.BundledTSConsumers)
	}

	// Project per-resource graph nodes.
	for resource, consumers := range byResource {
		node := resourceNode{Resource: resource}
		versionSet := map[string]struct{}{}
		for _, rec := range consumers {
			node.ConsumingFiles = append(node.ConsumingFiles, rec.file)
			for v := range rec.versions {
				versionSet[v] = struct{}{}
			}
		}
		sort.Strings(node.ConsumingFiles)
		for v := range versionSet {
			node.Versions = append(node.Versions, v)
		}
		sort.Strings(node.Versions)
		node.ComplexityScore = len(node.ConsumingFiles)
		report.Resources = append(report.Resources, node)
	}
	sort.Slice(report.Resources, func(i, j int) bool {
		if report.Resources[i].ComplexityScore != report.Resources[j].ComplexityScore {
			return report.Resources[i].ComplexityScore < report.Resources[j].ComplexityScore
		}
		return report.Resources[i].Resource < report.Resources[j].Resource
	})

	// Acceptance check: which §9.1 inventory entries did we not observe?
	// An inventory name is considered "observed" when either its own Go
	// package shows up OR one of its aliases does (e.g., the v1beta1 Go
	// package "pattern" observes the inventory entry "design").
	haveResource := map[string]bool{}
	for _, n := range report.Resources {
		haveResource[n.Resource] = true
	}
	for _, r := range inventory22 {
		observed := haveResource[r]
		if !observed {
			for alias, target := range resourceAliases {
				if target == r && haveResource[alias] {
					observed = true
					break
				}
			}
		}
		if !observed {
			report.MissingFromInventory = append(report.MissingFromInventory, r)
		}
	}
	sort.Strings(report.MissingFromInventory)

	outPath := filepath.Join(rootDir, filepath.FromSlash(*output))
	if err := os.MkdirAll(filepath.Dir(outPath), 0o755); err != nil {
		fmt.Fprintf(os.Stderr, "error: creating output dir: %v\n", err)
		os.Exit(1)
	}
	data, err := json.MarshalIndent(report, "", "  ")
	if err != nil {
		fmt.Fprintf(os.Stderr, "error: marshaling report: %v\n", err)
		os.Exit(1)
	}
	data = append(data, '\n')
	if err := os.WriteFile(outPath, data, 0o644); err != nil {
		fmt.Fprintf(os.Stderr, "error: writing %s: %v\n", outPath, err)
		os.Exit(1)
	}

	fmt.Printf("phase0-consumer-graph: %d resources, %d bundled TS consumers -> %s\n",
		len(report.Resources), report.BundledTSTotal, relPath(rootDir, outPath))
	if len(report.MissingFromInventory) > 0 {
		fmt.Fprintf(os.Stderr, "note: %d inventory resources had no observed Go consumers: %s\n",
			len(report.MissingFromInventory), strings.Join(report.MissingFromInventory, ", "))
	}
}

// scanGoImports walks dir under repoAbs and, for every non-test .go file,
// invokes fn once per import spec. Returns the number of files successfully
// parsed. Parse failures are reported to stderr so a partial baseline is
// diagnosable (a silently skipped file would simply under-attribute the
// graph).
func scanGoImports(repoAbs, dir string, fn func(file, importPath string)) (int, error) {
	root := filepath.Join(repoAbs, filepath.FromSlash(dir))
	if info, err := os.Stat(root); err != nil || !info.IsDir() {
		return 0, nil
	}
	var count int
	err := filepath.WalkDir(root, func(p string, d fs.DirEntry, walkErr error) error {
		if walkErr != nil {
			return walkErr
		}
		if d.IsDir() {
			// Skip vendor/ and node_modules/ if ever present.
			if name := d.Name(); name == "vendor" || name == "node_modules" {
				return fs.SkipDir
			}
			return nil
		}
		if !strings.HasSuffix(d.Name(), ".go") || strings.HasSuffix(d.Name(), "_test.go") {
			return nil
		}
		fset := token.NewFileSet()
		f, err := parser.ParseFile(fset, p, nil, parser.ImportsOnly)
		if err != nil {
			fmt.Fprintf(os.Stderr, "warn: %s: parse error: %v\n", relFrom(repoAbs, p), err)
			return nil
		}
		count++
		rel := relFrom(repoAbs, p)
		for _, imp := range f.Imports {
			path := strings.Trim(imp.Path.Value, `"`)
			fn(rel, path)
		}
		return nil
	})
	return count, err
}

// scanTSImports walks dir under repoAbs looking for .ts/.tsx/.js/.jsx
// source files (generated `.d.ts` and `*.test.*`/`*.spec.*` files are
// skipped) that contain `@meshery/schemas` imports. Returns the number of
// matching source files scanned and the list (repo-relative paths) of
// files that reference the schemas package in any form.
func scanTSImports(repoAbs, dir string) (int, []string, error) {
	root := filepath.Join(repoAbs, filepath.FromSlash(dir))
	if info, err := os.Stat(root); err != nil || !info.IsDir() {
		return 0, nil, nil
	}
	var count int
	var bundled []string
	err := filepath.WalkDir(root, func(p string, d fs.DirEntry, walkErr error) error {
		if walkErr != nil {
			return walkErr
		}
		if d.IsDir() {
			if name := d.Name(); name == "node_modules" || name == ".next" || name == "dist" || name == "build" {
				return fs.SkipDir
			}
			return nil
		}
		name := d.Name()
		if !(strings.HasSuffix(name, ".ts") || strings.HasSuffix(name, ".tsx") ||
			strings.HasSuffix(name, ".js") || strings.HasSuffix(name, ".jsx")) {
			return nil
		}
		if strings.HasSuffix(name, ".d.ts") {
			return nil
		}
		if strings.Contains(name, ".test.") || strings.Contains(name, ".spec.") {
			return nil
		}
		body, err := os.ReadFile(p)
		if err != nil {
			return nil
		}
		count++
		if tsImportLine.Match(body) {
			bundled = append(bundled, relFrom(repoAbs, p))
		}
		return nil
	})
	return count, bundled, err
}

// findRepoRoot walks up from cwd looking for go.mod.
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

func resolveAbsolutePath(rootDir, p string) (string, error) {
	if filepath.IsAbs(p) {
		return p, nil
	}
	return filepath.Clean(filepath.Join(rootDir, p)), nil
}

func relFrom(base, p string) string {
	rel, err := filepath.Rel(base, p)
	if err != nil {
		return p
	}
	return filepath.ToSlash(rel)
}

func relPath(rootDir, absPath string) string {
	rel, err := filepath.Rel(rootDir, absPath)
	if err != nil {
		return absPath
	}
	return filepath.ToSlash(rel)
}
