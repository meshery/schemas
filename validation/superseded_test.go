package validation

import (
	"os"
	"path/filepath"
	"regexp"
	"sort"
	"strings"
	"testing"
)

// newTestConstruct builds one ConstructVersion the way LoadConstructIndex
// would, so fixtures pick up the package-name override and merge-exclusion
// rules rather than restating them.
func newTestConstruct(version, construct, supersededBy string, deprecated bool) ConstructVersion {
	key := version + "/" + construct
	c := ConstructVersion{
		Version:      version,
		Construct:    construct,
		Key:          key,
		ExposedName:  exposedNameFor(version, construct),
		SupersededBy: supersededBy,
		Deprecated:   deprecated,
		SourceFile:   "schemas/constructs/" + key + "/api.yml",
	}
	c.Successor = resolveSuccessor(supersededBy, construct)
	c.InMergedSpec = inMergedSpec(key, deprecated)
	return c
}

// chainIndex is the fixture used by most tests: a two-hop design chain
// (mirroring the real v1beta1 -> v1beta2 -> v1beta3 shape), a single-hop badge
// chain, and a never-superseded construct.
func chainIndex() ConstructIndex {
	return buildConstructIndex([]ConstructVersion{
		newTestConstruct("v1beta1", "design", "v1beta2", true),
		newTestConstruct("v1beta2", "design", "v1beta3/design", true),
		newTestConstruct("v1beta3", "design", "", false),
		newTestConstruct("v1beta1", "badge", "v1beta2", true),
		newTestConstruct("v1beta2", "badge", "", false),
		newTestConstruct("v1beta1", "system", "", false),
	})
}

func runFixture(t *testing.T, idx ConstructIndex, files map[string]string) *SupersededRepoReport {
	t.Helper()
	tree := &memTree{ref: "fixture", files: files}
	report, err := runSupersededAudit(idx, []namedTree{{
		repo:    "meshery",
		path:    "../meshery",
		goTree:  tree,
		npmTree: tree,
	}})
	if err != nil {
		t.Fatalf("runSupersededAudit: %v", err)
	}
	if len(report.Repos) != 1 {
		t.Fatalf("expected 1 repo report, got %d", len(report.Repos))
	}
	return &report.Repos[0]
}

func findResolution(rr *SupersededRepoReport, family string, surface SupersededSurface, version string) *SupersededResolution {
	for i := range rr.Resolutions {
		r := &rr.Resolutions[i]
		if r.Family == family && r.Surface == surface && r.Version == version {
			return r
		}
	}
	return nil
}

// TestSupersededDetectsOverriddenGoPackageName pins the false clean this
// report exists to prevent: v1beta1/design is published as
// models/v1beta1/pattern, so matching the schema directory name reports "not
// used" for a construct with live importers.
func TestSupersededDetectsOverriddenGoPackageName(t *testing.T) {
	rr := runFixture(t, chainIndex(), map[string]string{
		"models/registry.go": `package models

import (
	"github.com/meshery/schemas/models/v1beta1/pattern"
)
`,
	})

	res := findResolution(rr, "design", SurfaceGo, "v1beta1")
	if res == nil {
		t.Fatalf("v1beta1/design not detected via its published name %q; got %+v",
			exposedNameFor("v1beta1", "design"), rr.Resolutions)
	}
	if !res.Superseded {
		t.Errorf("v1beta1/design should be flagged superseded")
	}
	if res.Files != 1 {
		t.Errorf("Files = %d, want 1", res.Files)
	}
}

// TestSupersededDetectsNPMDeepImport covers the surface the issue singles out
// as the one that can actually find a superseded use, and which no real
// consumer checkout currently exercises.
func TestSupersededDetectsNPMDeepImport(t *testing.T) {
	rr := runFixture(t, chainIndex(), map[string]string{
		"ui/components/Badge.tsx": `import { Badge } from "@meshery/schemas/constructs/v1beta1/badge/Badge";`,
	})

	res := findResolution(rr, "badge", SurfaceNPMDeep, "v1beta1")
	if res == nil {
		t.Fatalf("deep import of v1beta1/badge not detected; got %+v", rr.Resolutions)
	}
	if !res.Superseded {
		t.Errorf("v1beta1/badge should be flagged superseded")
	}
	if res.Terminal != "v1beta2/badge" {
		t.Errorf("Terminal = %q, want v1beta2/badge", res.Terminal)
	}
}

// TestSupersededCountsBundledClientImports checks that bundled-client imports
// are counted but never attributed to a version, since the import carries none.
func TestSupersededCountsBundledClientImports(t *testing.T) {
	rr := runFixture(t, chainIndex(), map[string]string{
		"ui/api.ts": `import { useGetViewsQuery } from "@meshery/schemas/mesheryApi";
import { x } from "@meshery/schemas/cloudApi";`,
	})

	if rr.BundledClientImports != 2 {
		t.Errorf("BundledClientImports = %d, want 2", rr.BundledClientImports)
	}
	for _, res := range rr.Resolutions {
		if res.Surface == SurfaceBundled {
			t.Errorf("bundled import was attributed to a version: %+v", res)
		}
	}
}

// TestTerminalSuccessorFollowsChain covers the two-hop case: reporting the
// immediate successor would point a consumer at another dead version.
func TestTerminalSuccessorFollowsChain(t *testing.T) {
	idx := chainIndex()

	got, hops := terminalSuccessor("v1beta1/design", idx.ByKey)
	if got != "v1beta3/design" {
		t.Errorf("terminal = %q, want v1beta3/design (not the immediate v1beta2)", got)
	}
	if hops != 2 {
		t.Errorf("hops = %d, want 2", hops)
	}

	if got, hops := terminalSuccessor("v1beta1/badge", idx.ByKey); got != "v1beta2/badge" || hops != 1 {
		t.Errorf("single hop: terminal = %q hops = %d, want v1beta2/badge 1", got, hops)
	}
}

// TestTerminalSuccessorBreaksCycle guards against a malformed annotation pair
// hanging the audit.
func TestTerminalSuccessorBreaksCycle(t *testing.T) {
	idx := buildConstructIndex([]ConstructVersion{
		newTestConstruct("v1beta1", "loop", "v1beta2", true),
		newTestConstruct("v1beta2", "loop", "v1beta1", true),
	})

	done := make(chan string, 1)
	go func() {
		got, _ := terminalSuccessor("v1beta1/loop", idx.ByKey)
		done <- got
	}()

	select {
	case got := <-done:
		if got == "" {
			t.Error("expected the walk to stop at a node, got empty")
		}
	default:
		// terminalSuccessor is synchronous and fast; if it had looped
		// forever the goroutine would never send and the test binary
		// would time out, which is the failure we want surfaced.
		<-done
	}
}

// TestSupersededDanglingSuccessor covers an x-superseded-by pointing at a
// construct that does not exist.
func TestSupersededDanglingSuccessor(t *testing.T) {
	idx := buildConstructIndex([]ConstructVersion{
		newTestConstruct("v1beta1", "ghost", "v1beta9", true),
	})

	report, err := runSupersededAudit(idx, nil)
	if err != nil {
		t.Fatalf("runSupersededAudit: %v", err)
	}
	if len(report.DanglingSuccessors) != 1 {
		t.Fatalf("DanglingSuccessors = %d, want 1", len(report.DanglingSuccessors))
	}
	if got := report.DanglingSuccessors[0].Key; got != "v1beta1/ghost" {
		t.Errorf("dangling key = %q, want v1beta1/ghost", got)
	}
}

// TestSupersededNotUsedRows checks that a superseded family the consumer never
// references still produces a row. Without it most annotated constructs would
// be invisible and a reader could not tell they had been checked.
func TestSupersededNotUsedRows(t *testing.T) {
	rr := runFixture(t, chainIndex(), map[string]string{
		"models/x.go": `package models

import "github.com/meshery/schemas/models/v1beta1/pattern"
`,
	})

	var notUsed []string
	for _, res := range rr.Resolutions {
		if res.NotUsed {
			notUsed = append(notUsed, res.Family)
		}
		// (a): families never superseded must not appear at all.
		if res.Family == "system" {
			t.Errorf("never-superseded family %q should be out of scope", res.Family)
		}
	}
	sort.Strings(notUsed)

	if len(notUsed) != 1 || notUsed[0] != "badge" {
		t.Errorf("not-used families = %v, want [badge]", notUsed)
	}
}

// TestSupersededBundledReachability asserts the surface-3 computation: a
// deprecated construct is dropped from the merged spec, so no bundled client
// can expose it, while a superseded construct left un-deprecated still can —
// and is a latent bundle failure, since mergePaths throws on duplicates.
func TestSupersededBundledReachability(t *testing.T) {
	idx := buildConstructIndex([]ConstructVersion{
		newTestConstruct("v1beta1", "design", "v1beta2", true), // deprecated
		newTestConstruct("v1beta1", "badge", "v1beta2", false), // NOT deprecated
		newTestConstruct("v1beta2", "design", "", false),
		newTestConstruct("v1beta2", "badge", "", false),
	})

	report, err := runSupersededAudit(idx, nil)
	if err != nil {
		t.Fatalf("runSupersededAudit: %v", err)
	}

	if len(report.BundledReachable) != 1 {
		t.Fatalf("BundledReachable = %+v, want exactly v1beta1/badge", report.BundledReachable)
	}
	if got := report.BundledReachable[0].Key; got != "v1beta1/badge" {
		t.Errorf("BundledReachable = %q, want v1beta1/badge", got)
	}
}

// TestSupersededSkipsNodeModules guards the sweep against counting the
// installed copy of @meshery/schemas as consumer usage.
func TestSupersededSkipsNodeModules(t *testing.T) {
	rr := runFixture(t, chainIndex(), map[string]string{
		"node_modules/@meshery/schemas/dist/constructs/v1beta1/badge/Badge.d.ts": `@meshery/schemas/constructs/v1beta1/badge/Badge`,
		"vendor/foo/x.go": `import "github.com/meshery/schemas/models/v1beta1/pattern"`,
	})

	for _, res := range rr.Resolutions {
		if !res.NotUsed {
			t.Errorf("excluded directory produced a usage row: %+v", res)
		}
	}
}

// TestSupersededIgnoresGoCommentsAndStringLiterals covers the false-positive
// vector raised in review: matching raw file text counts an import-shaped path
// in a comment or a string constant as a consumer reference, which under
// --superseded-enforce is a failure with no import behind it.
func TestSupersededIgnoresGoCommentsAndStringLiterals(t *testing.T) {
	rr := runFixture(t, chainIndex(), map[string]string{
		"models/notes.go": `package models

// TODO: migrate off github.com/meshery/schemas/models/v1beta1/pattern
/* also github.com/meshery/schemas/models/v1beta1/pattern */

const docsURL = "github.com/meshery/schemas/models/v1beta1/pattern"

func note() string { return "github.com/meshery/schemas/models/v1beta1/pattern" }
`,
	})

	for _, res := range rr.Resolutions {
		if !res.NotUsed {
			t.Errorf("a file with no import declarations produced a usage row: %+v", res)
		}
	}
	if len(rr.Usages) != 0 {
		t.Errorf("Usages = %+v, want none", rr.Usages)
	}
}

// TestSupersededDetectsGroupedAndAliasedGoImports checks the parser-based
// extraction still sees the real forms: grouped blocks, aliases and blank
// imports.
func TestSupersededDetectsGroupedAndAliasedGoImports(t *testing.T) {
	rr := runFixture(t, chainIndex(), map[string]string{
		"a.go": `package a

import (
	"fmt"

	pat "github.com/meshery/schemas/models/v1beta1/pattern"
)

var _ = fmt.Sprint(pat.X)
`,
		"b.go": `package b

import _ "github.com/meshery/schemas/models/v1beta1/pattern"
`,
	})

	res := findResolution(rr, "design", SurfaceGo, "v1beta1")
	if res == nil {
		t.Fatalf("aliased/blank imports not detected; got %+v", rr.Resolutions)
	}
	if res.Files != 2 {
		t.Errorf("Files = %d, want 2", res.Files)
	}
}

// TestSupersededRecordsUnparsableGoFiles checks that a Go file whose imports
// cannot be read is reported rather than silently treated as import-free.
func TestSupersededRecordsUnparsableGoFiles(t *testing.T) {
	rr := runFixture(t, chainIndex(), map[string]string{
		"broken.go": "package !!! not go at all {{{",
	})

	if len(rr.UnparsedFiles) != 1 || rr.UnparsedFiles[0] != "broken.go" {
		t.Errorf("UnparsedFiles = %v, want [broken.go]", rr.UnparsedFiles)
	}
}

// TestSupersededIgnoresNPMCommentsAndStringLiterals is the TypeScript half of
// the same concern: only import/export/require syntax counts.
func TestSupersededIgnoresNPMCommentsAndStringLiterals(t *testing.T) {
	rr := runFixture(t, chainIndex(), map[string]string{
		"ui/notes.ts": `// see @meshery/schemas/constructs/v1beta1/badge/Badge for the old shape
const path = "@meshery/schemas/constructs/v1beta1/badge/Badge";
const alsoBundled = "@meshery/schemas/mesheryApi";
`,
	})

	for _, res := range rr.Resolutions {
		if !res.NotUsed {
			t.Errorf("a file with no import syntax produced a usage row: %+v", res)
		}
	}
	if rr.BundledClientImports != 0 {
		t.Errorf("BundledClientImports = %d, want 0 -- a string literal is not an import",
			rr.BundledClientImports)
	}
}

// TestSupersededDetectsNPMImportForms checks the specifier extraction covers
// the syntax actually used: multi-line named imports, side-effect imports,
// re-exports, dynamic import() and require().
func TestSupersededDetectsNPMImportForms(t *testing.T) {
	cases := map[string]string{
		"multiline.ts":  "import {\n  Badge,\n  Other,\n} from '@meshery/schemas/constructs/v1beta1/badge/Badge';",
		"sideeffect.ts": `import "@meshery/schemas/constructs/v1beta1/badge/Badge";`,
		"reexport.ts":   `export { Badge } from "@meshery/schemas/constructs/v1beta1/badge/Badge";`,
		"dynamic.ts":    `const m = await import("@meshery/schemas/constructs/v1beta1/badge/Badge");`,
		"cjs.js":        `const m = require("@meshery/schemas/constructs/v1beta1/badge/Badge");`,
	}

	for name, src := range cases {
		t.Run(name, func(t *testing.T) {
			rr := runFixture(t, chainIndex(), map[string]string{name: src})
			if findResolution(rr, "badge", SurfaceNPMDeep, "v1beta1") == nil {
				t.Errorf("import form not detected; got %+v", rr.Resolutions)
			}
		})
	}
}

// TestSupersededFlagsMissingConsumerCheckout covers the false clean raised in
// review: a consumer path that does not exist walked as a successful empty
// scan, so every construct reported "not used" and enforcement passed on a
// consumer nobody had looked at.
func TestSupersededFlagsMissingConsumerCheckout(t *testing.T) {
	report, err := RunSupersededAudit(SupersededOptions{
		RootDir:     repoRootForTest(t),
		MesheryRepo: filepath.Join(t.TempDir(), "does-not-exist"),
	})
	if err != nil {
		t.Fatalf("RunSupersededAudit: %v", err)
	}
	if report.FullyScanned() {
		t.Fatal("a missing consumer checkout must not count as fully scanned")
	}
	if len(report.UnscannedRepos()) != 1 {
		t.Fatalf("UnscannedRepos = %d, want 1", len(report.UnscannedRepos()))
	}
	// The distinction that matters: nothing was found, but nothing was
	// looked at either, and those must not be the same answer.
	if report.HasSupersededUsage() {
		t.Error("no usage can be found in a tree that was never read")
	}
	// A shared failure is hit by both the Go and npm sweeps; it should be
	// reported once.
	if n := len(report.Repos[0].ScanDefects); n != 1 {
		t.Errorf("ScanDefects = %d, want 1 deduplicated defect: %+v",
			n, report.Repos[0].ScanDefects)
	}
}

// TestSupersededFlagsEmptyConsumerTree covers a path that exists but holds no
// source: almost always the wrong directory rather than a clean consumer.
func TestSupersededFlagsEmptyConsumerTree(t *testing.T) {
	report, err := RunSupersededAudit(SupersededOptions{
		RootDir:     repoRootForTest(t),
		MesheryRepo: t.TempDir(),
	})
	if err != nil {
		t.Fatalf("RunSupersededAudit: %v", err)
	}
	if report.FullyScanned() {
		t.Error("a consumer with no source files must not count as fully scanned")
	}
}

// TestSupersededPropagatesWalkDefects checks that defects reported by the tree
// walk reach the repo report, which is what enforcement gates on.
func TestSupersededPropagatesWalkDefects(t *testing.T) {
	tree := &memTree{
		files:   map[string]string{"a.ts": `import "x";`},
		defects: []ScanDefect{{Path: "server/secret", Reason: "permission denied"}},
	}
	report, err := runSupersededAudit(chainIndex(), []namedTree{{
		repo: "meshery", goTree: tree, npmTree: tree,
	}})
	if err != nil {
		t.Fatalf("runSupersededAudit: %v", err)
	}
	if report.FullyScanned() {
		t.Fatal("an unreadable subtree must mark the scan incomplete")
	}
	if got := report.Repos[0].ScanDefects[0].Path; got != "server/secret" {
		t.Errorf("defect path = %q, want server/secret", got)
	}
}

// TestSupersededFullyScannedWhenTreeIsReadable is the negative control: a
// readable consumer with real files must not be reported as unscanned, or the
// enforcement gate would fail every run.
func TestSupersededFullyScannedWhenTreeIsReadable(t *testing.T) {
	report, err := runSupersededAudit(chainIndex(), []namedTree{{
		repo: "meshery",
		goTree: &memTree{files: map[string]string{"a.go": `package a

import "github.com/meshery/schemas/models/v1beta1/pattern"
`}},
		npmTree: &memTree{files: map[string]string{}},
	}})
	if err != nil {
		t.Fatalf("runSupersededAudit: %v", err)
	}
	if !report.FullyScanned() {
		t.Errorf("readable tree reported unscanned: %+v", report.Repos[0].ScanDefects)
	}
}

// repoRootForTest resolves the schemas checkout these tests run inside.
func repoRootForTest(t *testing.T) string {
	t.Helper()
	root, err := filepath.Abs("..")
	if err != nil {
		t.Fatalf("resolve repo root: %v", err)
	}
	return root
}

// coreIndex mirrors the real core mapping: three versions publish at
// models/core, and v1beta2/core is additionally reachable at its conventional
// path. Only v1beta1/core is superseded.
func coreIndex() ConstructIndex {
	return buildConstructIndex([]ConstructVersion{
		newTestConstruct("v1alpha1", "core", "", false),
		newTestConstruct("v1beta1", "core", "v1beta2", true),
		newTestConstruct("v1beta2", "core", "", false),
	})
}

// TestSupersededDetectsVersionErasedGoImport covers the gap raised in review:
// build/generate-golang.js publishes three core versions at the unversioned
// models/core, so a version-qualified regex never matches it. In meshery/meshery
// that path accounts for 78 files, one of whose candidates is superseded.
func TestSupersededDetectsVersionErasedGoImport(t *testing.T) {
	rr := runFixture(t, coreIndex(), map[string]string{
		"models/a.go": `package a

import "github.com/meshery/schemas/models/core"
`,
		"models/b.go": `package b

import "github.com/meshery/schemas/models/core"
`,
	})

	var ambiguous *SupersededResolution
	for i := range rr.Resolutions {
		if rr.Resolutions[i].Ambiguous {
			ambiguous = &rr.Resolutions[i]
		}
	}
	if ambiguous == nil {
		t.Fatalf("models/core produced no ambiguous row; got %+v", rr.Resolutions)
	}
	if ambiguous.Files != 2 {
		t.Errorf("Files = %d, want 2", ambiguous.Files)
	}
	if ambiguous.ImportPath != "github.com/meshery/schemas/models/core" {
		t.Errorf("ImportPath = %q", ambiguous.ImportPath)
	}
	if len(ambiguous.Candidates) != 3 {
		t.Errorf("Candidates = %v, want all three core versions", ambiguous.Candidates)
	}
	// Exactly one candidate is superseded — naming a resolved version here
	// would be a guess, but omitting the row entirely would hide the risk.
	if len(ambiguous.AmbiguousSuperseded) != 1 || ambiguous.AmbiguousSuperseded[0] != "v1beta1/core" {
		t.Errorf("AmbiguousSuperseded = %v, want [v1beta1/core]", ambiguous.AmbiguousSuperseded)
	}
	if ambiguous.Superseded {
		t.Error("an unresolvable import must not be reported as confirmed superseded")
	}
}

// TestSupersededOverrideDoesNotHideConventionalPath guards the correction that
// an override adds a path rather than replacing one: models/v1beta2/core is
// generated separately and imported directly, so it must still resolve.
func TestSupersededOverrideDoesNotHideConventionalPath(t *testing.T) {
	rr := runFixture(t, coreIndex(), map[string]string{
		"models/a.go": `package a

import "github.com/meshery/schemas/models/v1beta2/core"
`,
	})

	res := findResolution(rr, "core", SurfaceGo, "v1beta2")
	if res == nil {
		t.Fatalf("models/v1beta2/core did not resolve; got %+v", rr.Resolutions)
	}
	if res.Ambiguous {
		t.Error("the conventional path names one version and must not be ambiguous")
	}
	if res.Superseded {
		t.Error("v1beta2/core is not superseded")
	}
}

// TestUnresolvedUsageIsNotCleanForEnforcement pins the enforcement semantics:
// "cannot determine" is a distinct result from "confirmed on a superseded
// version", and neither counts as clean.
func TestUnresolvedUsageIsNotCleanForEnforcement(t *testing.T) {
	report, err := runSupersededAudit(coreIndex(), []namedTree{{
		repo: "meshery",
		goTree: &memTree{files: map[string]string{"a.go": `package a

import "github.com/meshery/schemas/models/core"
`}},
		npmTree: &memTree{files: map[string]string{}},
	}})
	if err != nil {
		t.Fatalf("runSupersededAudit: %v", err)
	}
	if report.HasSupersededUsage() {
		t.Error("no consumer resolves a confirmed superseded version here")
	}
	if !report.HasUnresolvedUsage() {
		t.Error("a version-erased import with a superseded candidate must count as unresolved")
	}
}

// TestSupersededMirrorsGoImportOverrides is the sync guard for the generator's
// second mapping layer. Missing an entry here silently drops an entire
// published import path from the audit — which is exactly how models/core, and
// the 78 files importing it, went undetected.
func TestSupersededMirrorsGoImportOverrides(t *testing.T) {
	root, err := filepath.Abs("..")
	if err != nil {
		t.Fatalf("resolve repo root: %v", err)
	}
	raw, err := os.ReadFile(filepath.Join(root, "build", "generate-golang.js"))
	if err != nil {
		t.Skipf("build/generate-golang.js not readable: %v", err)
	}

	got := parseJSObject(t, string(raw), "GO_IMPORT_OVERRIDES")
	if len(got) != len(goImportOverrides) {
		t.Fatalf("override count: js=%v go=%v", got, goImportOverrides)
	}
	for k, v := range got {
		if goImportOverrides[k] != v {
			t.Errorf("override %q: js=%q go=%q -- update goImportOverrides in superseded.go",
				k, v, goImportOverrides[k])
		}
	}
}

// TestLoadConstructIndexRecordsUnreadableSpecs covers the false-clean vector
// raised in review: a construct whose api.yml cannot be parsed is absent from
// ByExposed, so every consumer import of it stops matching. The index must
// report itself incomplete rather than let that read as "not used".
func TestLoadConstructIndexRecordsUnreadableSpecs(t *testing.T) {
	root := t.TempDir()
	dir := filepath.Join(root, "schemas", "constructs", "v1beta1", "broken")
	if err := os.MkdirAll(dir, 0o755); err != nil {
		t.Fatalf("mkdir: %v", err)
	}
	// Valid YAML, but not a loadable OpenAPI document.
	if err := os.WriteFile(filepath.Join(dir, "api.yml"), []byte(":\n\t- not openapi\n"), 0o644); err != nil {
		t.Fatalf("write: %v", err)
	}

	good := filepath.Join(root, "schemas", "constructs", "v1beta1", "ok")
	if err := os.MkdirAll(good, 0o755); err != nil {
		t.Fatalf("mkdir: %v", err)
	}
	if err := os.WriteFile(filepath.Join(good, "api.yml"), []byte(
		"openapi: 3.0.0\ninfo:\n  title: Ok\n  version: v1beta1\npaths: {}\n"), 0o644); err != nil {
		t.Fatalf("write: %v", err)
	}

	idx, err := LoadConstructIndex(root)
	if err != nil {
		t.Fatalf("LoadConstructIndex: %v", err)
	}
	if idx.IsComplete() {
		t.Fatalf("index reported complete despite an unreadable api.yml; Skipped=%v", idx.Skipped)
	}
	if len(idx.Skipped) != 1 {
		t.Fatalf("Skipped = %v, want exactly the broken construct", idx.Skipped)
	}
	if !strings.Contains(idx.Skipped[0].Path, "broken") {
		t.Errorf("Skipped path = %q, want the broken construct", idx.Skipped[0].Path)
	}
	if idx.Skipped[0].Reason == "" {
		t.Error("Skipped reason is empty; the load error should be retained")
	}
	// The readable construct must still be indexed: report mode keeps working.
	if _, ok := idx.ByKey["v1beta1/ok"]; !ok {
		t.Error("readable construct missing from the index")
	}
}

// TestLoadConstructIndexRejectsEmptyTree covers the worst silent case: with no
// schemas/constructs the walker returns nil, which would otherwise yield an
// empty index, a "0 of 0" report, and a passing enforcement run.
func TestLoadConstructIndexRejectsEmptyTree(t *testing.T) {
	if _, err := LoadConstructIndex(t.TempDir()); err == nil {
		t.Fatal("expected an error for a tree with no constructs, got nil")
	}
}

// TestSupersededReportCompletenessPropagates checks that the index's
// completeness reaches the report, which is what the enforcement path gates on.
func TestSupersededReportCompletenessPropagates(t *testing.T) {
	idx := chainIndex()
	report, err := runSupersededAudit(idx, nil)
	if err != nil {
		t.Fatalf("runSupersededAudit: %v", err)
	}
	if !report.IsComplete() {
		t.Error("clean index should produce a complete report")
	}

	idx.Skipped = []SkippedConstruct{{Path: "schemas/constructs/v1beta1/design/api.yml", Reason: "boom"}}
	report, err = runSupersededAudit(idx, nil)
	if err != nil {
		t.Fatalf("runSupersededAudit: %v", err)
	}
	if report.IsComplete() {
		t.Error("index with skipped constructs should produce an incomplete report")
	}
	if len(report.SkippedConstructs()) != 1 {
		t.Errorf("SkippedConstructs = %v, want 1", report.SkippedConstructs())
	}
}

// TestSupersededMirrorsBuildConfig is the guard that keeps this report honest.
// The Go maps duplicate rules that live in build/lib/config.js; if the JS side
// gains an entry and the Go side does not, the audit silently reports a false
// clean rather than failing. Parsing the JS is deliberately crude — it only
// needs to catch drift, not evaluate JavaScript.
func TestSupersededMirrorsBuildConfig(t *testing.T) {
	root, err := filepath.Abs("..")
	if err != nil {
		t.Fatalf("resolve repo root: %v", err)
	}
	raw, err := os.ReadFile(filepath.Join(root, "build", "lib", "config.js"))
	if err != nil {
		t.Skipf("build/lib/config.js not readable: %v", err)
	}
	src := string(raw)

	t.Run("packageNameOverrides", func(t *testing.T) {
		got := parseJSObject(t, src, "packageNameOverrides")
		if len(got) != len(exposedNameOverrides) {
			t.Fatalf("override count: js=%v go=%v", got, exposedNameOverrides)
		}
		for k, v := range got {
			if exposedNameOverrides[k] != v {
				t.Errorf("override %q: js=%q go=%q -- update exposedNameOverrides in superseded.go",
					k, v, exposedNameOverrides[k])
			}
		}
	})

	t.Run("excludePackages", func(t *testing.T) {
		got := parseJSStringList(t, src, "excludePackages")
		assertSetsMatch(t, "excludePackages", got, constructDiscoveryExclusions,
			"constructDiscoveryExclusions")
	})

	t.Run("excludeFromMergeStatic", func(t *testing.T) {
		got := parseJSStringList(t, src, "excludeFromMergeStatic")
		assertSetsMatch(t, "excludeFromMergeStatic", got, constructMergeExclusions,
			"constructMergeExclusions")
	})
}

func assertSetsMatch(t *testing.T, jsName string, js []string, goSet map[string]bool, goName string) {
	t.Helper()
	if len(js) != len(goSet) {
		t.Fatalf("%s: js has %d entries %v, %s has %d -- keep them in sync",
			jsName, len(js), js, goName, len(goSet))
	}
	for _, k := range js {
		if !goSet[k] {
			t.Errorf("%s contains %q but %s does not -- update superseded.go", jsName, k, goName)
		}
	}
}

// parseJSObject extracts a `const <name> = { "k": "v", ... }` literal.
func parseJSObject(t *testing.T, src, name string) map[string]string {
	t.Helper()
	body := jsDeclBody(t, src, name, '{', '}')
	out := map[string]string{}
	pair := regexp.MustCompile(`"([^"]+)"\s*:\s*"([^"]+)"`)
	for _, m := range pair.FindAllStringSubmatch(body, -1) {
		out[m[1]] = m[2]
	}
	return out
}

// parseJSStringList extracts the quoted strings from a `const <name> = [...]`
// or `new Set([...])` declaration, ignoring // comments.
func parseJSStringList(t *testing.T, src, name string) []string {
	t.Helper()
	body := jsDeclBody(t, src, name, '[', ']')

	var stripped []string
	for _, line := range strings.Split(body, "\n") {
		if i := strings.Index(line, "//"); i >= 0 {
			line = line[:i]
		}
		stripped = append(stripped, line)
	}

	var out []string
	for _, m := range regexp.MustCompile(`"([^"]+)"`).FindAllStringSubmatch(strings.Join(stripped, "\n"), -1) {
		out = append(out, m[1])
	}
	sort.Strings(out)
	return out
}

// jsDeclBody returns the text between the first open/close delimiter pair
// following `const <name> =`, tracking nesting.
func jsDeclBody(t *testing.T, src, name string, open, close rune) string {
	t.Helper()
	decl := regexp.MustCompile(`const\s+` + regexp.QuoteMeta(name) + `\s*=`).FindStringIndex(src)
	if decl == nil {
		t.Fatalf("could not find `const %s =` in build/lib/config.js -- the build "+
			"changed and superseded.go's mirrored maps need review", name)
	}

	rest := src[decl[1]:]
	start := strings.IndexRune(rest, open)
	if start < 0 {
		t.Fatalf("no %q after `const %s =`", string(open), name)
	}

	depth := 0
	for i, r := range rest[start:] {
		switch r {
		case open:
			depth++
		case close:
			depth--
			if depth == 0 {
				return rest[start+1 : start+i]
			}
		}
	}
	t.Fatalf("unbalanced %q...%q for %s", string(open), string(close), name)
	return ""
}
