package validation

import (
	"fmt"
	"path/filepath"
	"regexp"
	"sort"
	"strings"

	"github.com/getkin/kin-openapi/openapi3"
)

type SupersededSurface string

const (
	SurfaceGo SupersededSurface = "go"
	// SurfaceNPMDeep is a version-qualified deep import of
	// @meshery/schemas/constructs/<version>/<pkg>.
	SurfaceNPMDeep SupersededSurface = "npm-deep"
	// SurfaceBundled is an import of a bundled RTK client. The version is
	// not present in the import; reachability is resolved in this repo.
	SurfaceBundled SupersededSurface = "npm-bundled"
)

// The three maps below mirror build/lib/config.js. If the build's copies
// change and these do not, this report silently returns a false clean, so
// TestSupersededMirrorsBuildConfig asserts they stay in sync.

// exposedNameOverrides mirrors packageNameOverrides in build/lib/config.js.
// Keyed by "<version>/<dir>"; the value is the name used in BOTH the Go import
// path and the npm deep-import subpath.
var exposedNameOverrides = map[string]string{
	"v1beta1/design": "pattern",
}

// constructDiscoveryExclusions mirrors excludePackages in build/lib/config.js.
// These are skipped entirely by the build — no bundle, no generated output.
var constructDiscoveryExclusions = map[string]bool{
	"v1beta1/relationship": true,
}

// constructMergeExclusions mirrors excludeFromMergeStatic in
// build/lib/config.js: non-API base schemas that never reach the merged spec.
var constructMergeExclusions = map[string]bool{
	"v1alpha1/core":       true,
	"v1alpha1/capability": true,
	"v1beta1/core":        true,
	"v1beta1/capability":  true,
	"v1beta1/selector":    true,
	"v1beta2/core":        true,
	"v1beta2/selector":    true,
}

// ConstructVersion is one <version>/<construct> directory and the annotations
// that govern its lifecycle.
type ConstructVersion struct {
	Version   string // "v1beta1"
	Construct string // schema directory name, e.g. "design"
	Key       string // "<Version>/<Construct>"

	// ExposedName is the identifier this construct is published under on
	// the Go and npm deep-import surfaces. Differs from Construct when
	// exposedNameOverrides applies (v1beta1/design -> "pattern").
	ExposedName string

	// SupersededBy is the raw info.x-superseded-by value, empty if absent.
	SupersededBy string
	// Successor is SupersededBy resolved to a "<version>/<construct>" key.
	Successor string
	// SuccessorExists reports whether Successor has an api.yml on disk.
	SuccessorExists bool
	// Terminal is the end of the supersede chain: the first successor that
	// is not itself superseded. Equals Successor for single-hop chains.
	Terminal string
	// Hops is the chain length from this version to Terminal.
	Hops int

	// Deprecated is info.x-deprecated.
	Deprecated bool
	// InMergedSpec reports whether this version survives into the merged
	// OpenAPI spec, and so whether a bundled RTK client can expose it.
	InMergedSpec bool

	SourceFile string
}

// IsSuperseded reports whether this version carries x-superseded-by.
func (c ConstructVersion) IsSuperseded() bool { return c.SupersededBy != "" }

// ConstructIndex is every construct version in schemas/constructs, with the
// lookup tables the audit needs.
type ConstructIndex struct {
	// All versions, sorted by key.
	All []ConstructVersion
	// ByKey is keyed by "<version>/<construct>".
	ByKey map[string]ConstructVersion
	// ByExposed is keyed by "<version>/<exposedName>" — the form that
	// actually appears in consumer import paths.
	ByExposed map[string]ConstructVersion
}

// SupersededFamilies returns the construct directory names that have at least
// one superseded version, sorted.
//
// The per-consumer report is scoped to these. A family that was never
// superseded has no migration question to answer, and every one of them would
// otherwise appear as a "current" row, burying the rows that matter.
func (idx ConstructIndex) SupersededFamilies() []string {
	seen := map[string]bool{}
	var out []string
	for _, c := range idx.All {
		if c.IsSuperseded() && !seen[c.Construct] {
			seen[c.Construct] = true
			out = append(out, c.Construct)
		}
	}
	sort.Strings(out)
	return out
}

// Superseded returns the versions carrying x-superseded-by, sorted by key.
func (idx ConstructIndex) Superseded() []ConstructVersion {
	var out []ConstructVersion
	for _, c := range idx.All {
		if c.IsSuperseded() {
			out = append(out, c)
		}
	}
	return out
}

// DeprecatedCount returns how many versions carry x-deprecated: true.
func (idx ConstructIndex) DeprecatedCount() int {
	n := 0
	for _, c := range idx.All {
		if c.Deprecated {
			n++
		}
	}
	return n
}

// supersededByOf returns info.x-superseded-by, mirroring isDeprecatedDoc's
// access pattern so both annotations are read the same way.
func supersededByOf(doc *openapi3.T) string {
	if doc == nil || doc.Info == nil {
		return ""
	}
	v, _ := doc.Info.Extensions["x-superseded-by"].(string)
	return v
}

// exposedNameFor returns the name a construct is published under, applying the
// build's package-name override.
func exposedNameFor(version, construct string) string {
	if override, ok := exposedNameOverrides[version+"/"+construct]; ok {
		return override
	}
	return construct
}

// resolveSuccessor expands an x-superseded-by value to a
// "<version>/<construct>" key. A bare version means the same construct under
// that version.
func resolveSuccessor(annotation, construct string) string {
	if annotation == "" {
		return ""
	}
	if strings.Contains(annotation, "/") {
		return annotation
	}
	return annotation + "/" + construct
}

// inMergedSpec mirrors getMergePackages in build/lib/config.js: a construct
// reaches the merged spec — and so the bundled RTK clients — unless it is
// discovery-excluded, statically excluded as a base schema, or deprecated.
func inMergedSpec(key string, deprecated bool) bool {
	if constructDiscoveryExclusions[key] || constructMergeExclusions[key] {
		return false
	}
	return !deprecated
}

// LoadConstructIndex walks schemas/constructs and reads the lifecycle
// annotations off every version, including deprecated ones.
func LoadConstructIndex(rootDir string) (ConstructIndex, error) {
	idx := ConstructIndex{
		ByKey:     map[string]ConstructVersion{},
		ByExposed: map[string]ConstructVersion{},
	}

	err := walkAllConstructSpecs(rootDir, func(spec constructSpec) error {
		// A spec that cannot be parsed carries no readable annotations.
		// Skipping is safe: the schema validator reports the load failure
		// separately, and inventing a lifecycle state from an unreadable
		// file would be worse than omitting it.
		if spec.LoadErr != nil {
			return nil
		}
		key := spec.Version + "/" + spec.Construct
		c := ConstructVersion{
			Version:      spec.Version,
			Construct:    spec.Construct,
			Key:          key,
			ExposedName:  exposedNameFor(spec.Version, spec.Construct),
			SupersededBy: supersededByOf(spec.Doc),
			Deprecated:   isDeprecatedDoc(spec.Doc),
			SourceFile:   filepath.ToSlash(spec.RelativePath),
		}
		c.InMergedSpec = inMergedSpec(key, c.Deprecated)
		c.Successor = resolveSuccessor(c.SupersededBy, c.Construct)
		idx.All = append(idx.All, c)
		return nil
	})
	if err != nil {
		return idx, fmt.Errorf("superseded: walk constructs: %w", err)
	}

	return buildConstructIndex(idx.All), nil
}

// buildConstructIndex sorts the versions, builds the lookup tables, then makes
// a second pass for successor existence and transitive terminals — both of
// which need the completed ByKey map. Tests construct fixture indexes through
// this same path so they exercise the real resolution logic.
func buildConstructIndex(all []ConstructVersion) ConstructIndex {
	idx := ConstructIndex{
		All:       all,
		ByKey:     map[string]ConstructVersion{},
		ByExposed: map[string]ConstructVersion{},
	}

	sort.Slice(idx.All, func(i, j int) bool { return idx.All[i].Key < idx.All[j].Key })
	for _, c := range idx.All {
		idx.ByKey[c.Key] = c
		idx.ByExposed[c.Version+"/"+c.ExposedName] = c
	}

	for i, c := range idx.All {
		if !c.IsSuperseded() {
			continue
		}
		_, exists := idx.ByKey[c.Successor]
		idx.All[i].SuccessorExists = exists
		idx.All[i].Terminal, idx.All[i].Hops = terminalSuccessor(c.Key, idx.ByKey)
		idx.ByKey[c.Key] = idx.All[i]
		idx.ByExposed[c.Version+"/"+c.ExposedName] = idx.All[i]
	}

	return idx
}

// terminalSuccessor follows the supersede chain from start and returns the
// first version that is not itself superseded, plus the number of hops taken.
//
// Chains longer than one hop are the common case, not an edge case: eight
// constructs currently go v1beta1 -> v1beta2 -> v1beta3 because the immediate
// successor is itself deprecated. Reporting the immediate successor would
// direct a consumer to another dead version.
func terminalSuccessor(start string, byKey map[string]ConstructVersion) (string, int) {
	visited := map[string]bool{start: true}
	current := start
	hops := 0

	for {
		c, ok := byKey[current]
		if !ok || !c.IsSuperseded() {
			return current, hops
		}
		next := c.Successor
		if next == "" || visited[next] {
			// Cycle or empty pointer: stop at the last good node rather
			// than looping forever.
			return current, hops
		}
		if _, ok := byKey[next]; !ok {
			// Successor does not exist on disk. Return it anyway so the
			// dangling pointer stays visible to the caller.
			return next, hops + 1
		}
		visited[next] = true
		current = next
		hops++
	}
}

var (
	// goImportPattern matches a version-qualified Go import of a schema
	// model package.
	goImportPattern = regexp.MustCompile(`github\.com/meshery/schemas/models/([A-Za-z0-9]+)/([A-Za-z0-9_]+)`)
	// npmDeepPattern matches a version-qualified deep import of a generated
	// construct. The optional "typescript/" segment covers the form used
	// before the package exposed constructs/* directly.
	npmDeepPattern = regexp.MustCompile(`@meshery/schemas/(?:typescript/)?constructs/([A-Za-z0-9]+)/([A-Za-z0-9_]+)`)
	// npmBundledPattern matches an import of a bundled RTK client, which
	// carries no version.
	npmBundledPattern = regexp.MustCompile(`@meshery/schemas/(?:cloudApi|mesheryApi)`)
)

var (
	goExts  = []string{".go"}
	npmExts = []string{".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"}
)

// SupersededUsage is one consumer reference to a superseded construct version.
type SupersededUsage struct {
	Repo      string
	Surface   SupersededSurface
	Construct string // "<version>/<construct>" of the superseded version
	Terminal  string // terminal live successor
	File      string // relative to the consumer repo root
	Line      int
	Import    string
}

// SupersededResolution answers, for one construct family and one surface,
// which version a consumer resolves. It is one cell of the verification table
// in docs/superseded-construct-consumer-verification.md.
type SupersededResolution struct {
	// Family is the schema construct directory name, e.g. "design", so a
	// construct stays one row even where ExposedName differs per version.
	Family  string
	Surface SupersededSurface
	Version string
	Files   int
	// Superseded reports that Version itself carries x-superseded-by.
	Superseded bool
	// Terminal is the live version to migrate to, set when Superseded.
	Terminal string
	// NotUsed reports that the consumer references no version of this family
	// on any surface. It is a distinct answer from "resolves a current
	// version" — the doc's table records it explicitly as "not used" — and
	// emitting it is what lets every superseded construct be accounted for
	// on screen rather than silently absent.
	NotUsed bool
	// SupersededVersions lists the superseded versions of this family, so a
	// NotUsed row can still say what was checked for.
	SupersededVersions []string
}

// SupersededRepoReport is one consumer repo's results.
type SupersededRepoReport struct {
	Repo string
	Path string
	// Resolutions is the per-family answer, sorted by family then surface.
	Resolutions []SupersededResolution
	// Usages are the individual superseded references, for verbose output.
	Usages []SupersededUsage
	// BundledClientImports counts cloudApi/mesheryApi imports. These cannot
	// be attributed to a construct version from consumer code.
	BundledClientImports int
	FilesScanned         int
}

// SupersededCount returns how many resolutions land on a superseded version.
func (r SupersededRepoReport) SupersededCount() int {
	n := 0
	for _, res := range r.Resolutions {
		if res.Superseded {
			n++
		}
	}
	return n
}

// SupersededReport is the full opt-in report.
type SupersededReport struct {
	Index ConstructIndex
	// Superseded is every construct version carrying x-superseded-by.
	Superseded []ConstructVersion
	// DeprecatedWithoutSuccessor lists versions marked x-deprecated with no
	// x-superseded-by. They are dropped from the merged spec like any
	// deprecated construct, but carry no migration target, so consumers on
	// them cannot be pointed anywhere.
	DeprecatedWithoutSuccessor []ConstructVersion
	// DanglingSuccessors lists versions whose x-superseded-by points at a
	// construct that does not exist on disk.
	DanglingSuccessors []ConstructVersion
	// BundledReachable lists superseded versions still present in the merged
	// spec. Expected empty; a non-empty list is a latent bundle failure.
	BundledReachable []ConstructVersion
	// Repos holds per-consumer results, in the order they were provided.
	Repos []SupersededRepoReport
}

// HasSupersededUsage reports whether any scanned consumer resolves a
// superseded construct version. Enforcement keys off this.
func (r *SupersededReport) HasSupersededUsage() bool {
	for _, repo := range r.Repos {
		if repo.SupersededCount() > 0 {
			return true
		}
	}
	return false
}

// SupersededOptions configures RunSupersededAudit.
type SupersededOptions struct {
	// RootDir is the meshery/schemas checkout (required).
	RootDir string
	// Consumer checkouts. Empty values are skipped.
	MesheryRepo    string
	CloudRepo      string
	ExtensionsRepo string
	// MesheryRepoUI and CloudRepoUI override the tree swept for the npm
	// surfaces, for the rare checkout that keeps its UI separately from its
	// Go tree. They default to the Go path, matching resolveTSTree.
	MesheryRepoUI string
	CloudRepoUI   string
}

// namedTree pairs a consumer label with the trees swept for each surface.
// goTree and npmTree are the same tree for repos that co-locate Go and TS.
type namedTree struct {
	repo    string
	path    string
	goTree  sourceTree
	npmTree sourceTree
}

// RunSupersededAudit loads the construct annotations and scans each provided
// consumer checkout for references to superseded construct versions.
func RunSupersededAudit(opts SupersededOptions) (*SupersededReport, error) {
	if opts.RootDir == "" {
		return nil, fmt.Errorf("superseded: RootDir is required")
	}

	idx, err := LoadConstructIndex(opts.RootDir)
	if err != nil {
		return nil, err
	}

	// The npm surfaces honour the -ui overrides via resolveTSTree, the same
	// helper the TS consumer auditor uses, so a split UI checkout is swept
	// for deep imports rather than silently reported as clean.
	registry := []struct{ repo, path, uiPath string }{
		{"meshery", opts.MesheryRepo, opts.MesheryRepoUI},
		{"meshery-cloud", opts.CloudRepo, opts.CloudRepoUI},
		{"meshery-extensions", opts.ExtensionsRepo, ""},
	}

	var trees []namedTree
	for _, r := range registry {
		if r.path == "" && r.uiPath == "" {
			continue
		}
		nt := namedTree{repo: r.repo, path: r.path}
		if r.path != "" {
			nt.goTree = localTree{root: r.path}
		}
		nt.npmTree = resolveTSTree(r.uiPath, r.path, nt.goTree)
		trees = append(trees, nt)
	}

	return runSupersededAudit(idx, trees)
}

// runSupersededAudit is the tree-injectable core, split out so tests can drive
// it with in-memory fixtures.
func runSupersededAudit(idx ConstructIndex, trees []namedTree) (*SupersededReport, error) {
	report := &SupersededReport{
		Index:      idx,
		Superseded: idx.Superseded(),
	}

	for _, c := range idx.All {
		if c.Deprecated && !c.IsSuperseded() {
			report.DeprecatedWithoutSuccessor = append(report.DeprecatedWithoutSuccessor, c)
		}
		if !c.IsSuperseded() {
			continue
		}
		if !c.SuccessorExists {
			report.DanglingSuccessors = append(report.DanglingSuccessors, c)
		}
		if c.InMergedSpec {
			report.BundledReachable = append(report.BundledReachable, c)
		}
	}

	for _, nt := range trees {
		rr, err := scanConsumerForSuperseded(nt, idx)
		if err != nil {
			return nil, err
		}
		report.Repos = append(report.Repos, *rr)
	}

	return report, nil
}

// scanConsumerForSuperseded sweeps one consumer checkout and records which
// version of each superseded construct family it resolves, per surface.
//
// Every family with a superseded version yields at least one row, even when
// the consumer references none of them: "not used" is an answer, and omitting
// it would leave most of the annotated constructs invisible in the output with
// no way to tell they were checked.
func scanConsumerForSuperseded(nt namedTree, idx ConstructIndex) (*SupersededRepoReport, error) {
	out := &SupersededRepoReport{Repo: nt.repo, Path: nt.path}

	supersededFamilies := idx.SupersededFamilies()
	inScope := map[string]bool{}
	for _, f := range supersededFamilies {
		inScope[f] = true
	}

	// supersededVersionsOf lists the superseded versions per family, so a
	// "not used" row can still report what was looked for.
	supersededVersionsOf := map[string][]string{}
	for _, c := range idx.All {
		if c.IsSuperseded() {
			supersededVersionsOf[c.Construct] = append(supersededVersionsOf[c.Construct], c.Version)
		}
	}

	// files[family][surface][version] = set of files referencing it.
	files := map[string]map[SupersededSurface]map[string]map[string]bool{}

	record := func(family string, surface SupersededSurface, version, file string) {
		if !inScope[family] {
			// Family was never superseded: no migration question to answer.
			return
		}
		bySurface, ok := files[family]
		if !ok {
			bySurface = map[SupersededSurface]map[string]map[string]bool{}
			files[family] = bySurface
		}
		byVersion, ok := bySurface[surface]
		if !ok {
			byVersion = map[string]map[string]bool{}
			bySurface[surface] = byVersion
		}
		set, ok := byVersion[version]
		if !ok {
			set = map[string]bool{}
			byVersion[version] = set
		}
		set[file] = true
	}

	scan := func(tree sourceTree, exts []string, surface SupersededSurface, pattern *regexp.Regexp) error {
		if tree == nil {
			return nil
		}
		return tree.WalkFiltered(".", exts, func(path string) error {
			raw, err := tree.ReadFile(path)
			if err != nil {
				// Unreadable file: skip rather than fail the whole audit.
				return nil
			}
			out.FilesScanned++
			src := string(raw)

			if surface == SurfaceNPMDeep {
				out.BundledClientImports += len(npmBundledPattern.FindAllString(src, -1))
			}

			for _, m := range pattern.FindAllStringSubmatchIndex(src, -1) {
				version := src[m[2]:m[3]]
				name := src[m[4]:m[5]]

				c, ok := idx.ByExposed[version+"/"+name]
				if !ok {
					// Not a construct this repo publishes.
					continue
				}
				record(c.Construct, surface, version, path)

				if !c.IsSuperseded() {
					continue
				}
				out.Usages = append(out.Usages, SupersededUsage{
					Repo:      nt.repo,
					Surface:   surface,
					Construct: c.Key,
					Terminal:  c.Terminal,
					File:      path,
					Line:      1 + strings.Count(src[:m[0]], "\n"),
					Import:    src[m[0]:m[1]],
				})
			}
			return nil
		})
	}

	if err := scan(nt.goTree, goExts, SurfaceGo, goImportPattern); err != nil {
		return nil, fmt.Errorf("superseded: scan %s (go): %w", nt.repo, err)
	}
	if err := scan(nt.npmTree, npmExts, SurfaceNPMDeep, npmDeepPattern); err != nil {
		return nil, fmt.Errorf("superseded: scan %s (npm): %w", nt.repo, err)
	}

	for _, family := range supersededFamilies {
		bySurface, found := files[family]
		if !found {
			// The consumer references no version of this family on any
			// surface. Record the answer explicitly so the family is
			// visibly accounted for rather than silently missing.
			out.Resolutions = append(out.Resolutions, SupersededResolution{
				Family:             family,
				NotUsed:            true,
				SupersededVersions: supersededVersionsOf[family],
			})
			continue
		}
		for surface, byVersion := range bySurface {
			for version, set := range byVersion {
				res := SupersededResolution{
					Family:  family,
					Surface: surface,
					Version: version,
					Files:   len(set),
				}
				if c, ok := idx.ByKey[version+"/"+family]; ok && c.IsSuperseded() {
					res.Superseded = true
					res.Terminal = c.Terminal
				}
				out.Resolutions = append(out.Resolutions, res)
			}
		}
	}

	sort.Slice(out.Resolutions, func(i, j int) bool {
		a, b := out.Resolutions[i], out.Resolutions[j]
		if a.Family != b.Family {
			return a.Family < b.Family
		}
		if a.Surface != b.Surface {
			return a.Surface < b.Surface
		}
		return a.Version < b.Version
	})

	sort.Slice(out.Usages, func(i, j int) bool {
		a, b := out.Usages[i], out.Usages[j]
		if a.Surface != b.Surface {
			return a.Surface < b.Surface
		}
		if a.Construct != b.Construct {
			return a.Construct < b.Construct
		}
		if a.File != b.File {
			return a.File < b.File
		}
		return a.Line < b.Line
	})

	return out, nil
}
