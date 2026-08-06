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
		"models/x.go": `import "github.com/meshery/schemas/models/v1beta1/pattern"`,
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
