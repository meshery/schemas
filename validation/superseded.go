package validation

import (
	"fmt"
	"go/parser"
	"go/token"
	"path/filepath"
	"regexp"
	"sort"
	"strconv"
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

// goImportOverrides mirrors GO_IMPORT_OVERRIDES in build/generate-golang.js.
//
// This is a second, independent mapping layer on top of exposedNameOverrides,
// and it behaves differently: it replaces the whole import path rather than
// just the trailing package name, and it can erase the version segment
// altogether. models/core is the published path for three different construct
// versions, so an import of it cannot be attributed to any one of them — see
// SupersededResolution.Ambiguous.
//
// Kept in sync by TestSupersededMirrorsGoImportOverrides.
var goImportOverrides = map[string]string{
	"v1alpha1/core":   "github.com/meshery/schemas/models/core",
	"v1beta1/core":    "github.com/meshery/schemas/models/core",
	"v1beta2/core":    "github.com/meshery/schemas/models/core",
	"v1beta2/catalog": "github.com/meshery/schemas/models/v1alpha2/catalog",
}

// goImportPathsFor returns every import path a construct can be reached at.
//
// An override does not necessarily replace the conventional path: v1beta2/core
// is reachable both at models/core (the override, used when other packages
// resolve its $refs) and at models/v1beta2/core, which is generated separately
// and imported directly. Registering only one of the two would drop real
// consumer usage, so both are registered.
//
// Paths for packages the build does not actually emit — models/v1beta1/core is
// excluded from Go generation — are harmless: nothing imports a package that
// does not exist, so they simply never match. That is preferable to stat-ing
// models/, which would couple this index to generated output.
func goImportPathsFor(c ConstructVersion) []string {
	paths := []string{goModulePrefix + c.Version + "/" + c.ExposedName}
	if override, ok := goImportOverrides[c.Key]; ok && override != paths[0] {
		paths = append(paths, override)
	}
	return paths
}

// goModulePrefix is the import prefix every generated Go model package shares.
const goModulePrefix = "github.com/meshery/schemas/models/"

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

// SkippedConstruct is a construct directory that could not be read into the
// index. Each one is a hole in the audit: a consumer importing that version
// resolves to nothing in ByExposed and is therefore silently omitted from the
// report.
type SkippedConstruct struct {
	// Path is the api.yml path relative to the repo root.
	Path string
	// Reason is the underlying load error.
	Reason string
}

// ConstructIndex is every construct version in schemas/constructs, with the
// lookup tables the audit needs.
type ConstructIndex struct {
	// All versions, sorted by key.
	All []ConstructVersion
	// ByKey is keyed by "<version>/<construct>".
	ByKey map[string]ConstructVersion
	// ByExposed is keyed by "<version>/<exposedName>".
	ByExposed map[string]ConstructVersion
	// ByGoImport maps a published Go import path to every construct version
	// that resolves to it. Usually one, but the generator's overrides point
	// three core versions at models/core, so an entry with more than one
	// element is an import whose version cannot be recovered from consumer
	// code.
	ByGoImport map[string][]ConstructVersion
	// Skipped lists construct directories that failed to load. A non-empty
	// Skipped means the index does not cover the whole tree, so a "no
	// superseded usage" result cannot be trusted — see IsComplete.
	Skipped []SkippedConstruct
}

// IsComplete reports whether every construct directory was indexed. Callers
// that turn this audit into a gate must check it: an incomplete index can
// report a clean result purely because the construct that would have matched
// was never loaded.
func (idx ConstructIndex) IsComplete() bool { return len(idx.Skipped) == 0 }

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

	var skipped []SkippedConstruct

	err := walkAllConstructSpecs(rootDir, func(spec constructSpec) error {
		// A spec that cannot be parsed carries no readable annotations, so
		// it cannot be indexed. Record it rather than dropping it: an
		// unreadable superseded schema is absent from ByExposed, which makes
		// every consumer import of it stop matching, which would otherwise
		// read as a clean result. Enforcement checks IsComplete for exactly
		// this reason.
		if spec.LoadErr != nil {
			skipped = append(skipped, SkippedConstruct{
				Path:   filepath.ToSlash(spec.RelativePath),
				Reason: spec.LoadErr.Error(),
			})
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

	// An empty index is never a legitimate outcome: walkAllConstructSpecs
	// returns nil when schemas/constructs is missing or unreadable, which
	// would otherwise surface as "0 of 0 construct versions" and pass
	// enforcement. Treat it as a hard error rather than a clean audit.
	if len(idx.All) == 0 {
		return idx, fmt.Errorf(
			"superseded: indexed no construct versions under %s -- is this a meshery/schemas checkout?",
			filepath.Join(rootDir, "schemas", "constructs"))
	}

	out := buildConstructIndex(idx.All)
	out.Skipped = skipped
	sort.Slice(out.Skipped, func(i, j int) bool { return out.Skipped[i].Path < out.Skipped[j].Path })
	return out, nil
}

// buildConstructIndex sorts the versions, builds the lookup tables, then makes
// a second pass for successor existence and transitive terminals — both of
// which need the completed ByKey map. Tests construct fixture indexes through
// this same path so they exercise the real resolution logic.
func buildConstructIndex(all []ConstructVersion) ConstructIndex {
	idx := ConstructIndex{
		All:        all,
		ByKey:      map[string]ConstructVersion{},
		ByExposed:  map[string]ConstructVersion{},
		ByGoImport: map[string][]ConstructVersion{},
	}

	sort.Slice(idx.All, func(i, j int) bool { return idx.All[i].Key < idx.All[j].Key })

	// First pass: ByKey only, so successor resolution has something to walk.
	for _, c := range idx.All {
		idx.ByKey[c.Key] = c
	}

	// Second pass: successor existence and transitive terminals.
	for i, c := range idx.All {
		if !c.IsSuperseded() {
			continue
		}
		_, exists := idx.ByKey[c.Successor]
		idx.All[i].SuccessorExists = exists
		idx.All[i].Terminal, idx.All[i].Hops = terminalSuccessor(c.Key, idx.ByKey)
		idx.ByKey[c.Key] = idx.All[i]
	}

	// Final pass: build the lookup maps from the fully resolved values, so no
	// map holds a copy predating terminal resolution.
	for _, c := range idx.All {
		idx.ByExposed[c.Version+"/"+c.ExposedName] = c
		for _, path := range goImportPathsFor(c) {
			idx.ByGoImport[path] = append(idx.ByGoImport[path], c)
		}
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
	// npmDeepPattern matches a version-qualified deep import of a generated
	// construct. The optional "typescript/" segment covers the form used
	// before the package exposed constructs/* directly. It is applied to
	// module specifiers only, never to raw file text.
	npmDeepPattern = regexp.MustCompile(`^@meshery/schemas/(?:typescript/)?constructs/([A-Za-z0-9]+)/([A-Za-z0-9_]+)`)
	// npmBundledPattern matches a bundled RTK client specifier, which carries
	// no version.
	npmBundledPattern = regexp.MustCompile(`^@meshery/schemas/(?:cloudApi|mesheryApi)`)

	// tsModuleSpecifier extracts the quoted module specifier from the ES
	// module and CommonJS forms: `... from "x"`, `import "x"`, `import("x")`
	// and `require("x")`.
	//
	// Anchoring on the syntax rather than scanning raw text is what keeps a
	// path mentioned in a comment or assigned to a string constant from being
	// counted as a consumer reference — under --superseded-enforce that would
	// be a false failure. Go is handled precisely by go/parser; TypeScript has
	// no parser in the standard library, so this follows the regex approach
	// already used by consumer_ts.go.
	tsModuleSpecifier = regexp.MustCompile(
		`from\s*['"]([^'"]+)['"]` +
			`|\bimport\s*['"]([^'"]+)['"]` +
			`|\bimport\s*\(\s*['"]([^'"]+)['"]` +
			`|\brequire\s*\(\s*['"]([^'"]+)['"]`)
)

var (
	goExts  = []string{".go"}
	npmExts = []string{".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"}
)

// importRef is one module specifier found in a consumer source file.
type importRef struct {
	Path string
	Line int
}

// extractGoImports returns the import paths declared by a Go source file,
// using go/parser in ImportsOnly mode.
//
// Parsing rather than pattern-matching is what makes a path in a comment or a
// string constant a non-event: only genuine import declarations are returned.
// A parse failure is reported so the caller can record it instead of treating
// the file as import-free, which would be a silent false clean.
func extractGoImports(filename, src string) ([]importRef, error) {
	fset := token.NewFileSet()
	file, err := parser.ParseFile(fset, filename, src, parser.ImportsOnly)
	if err != nil {
		return nil, err
	}

	refs := make([]importRef, 0, len(file.Imports))
	for _, spec := range file.Imports {
		path, err := strconv.Unquote(spec.Path.Value)
		if err != nil {
			continue
		}
		refs = append(refs, importRef{Path: path, Line: fset.Position(spec.Pos()).Line})
	}
	return refs, nil
}

// extractNPMImports returns the module specifiers imported by a JS/TS source
// file. Only import/export/require syntax is considered, so a specifier-shaped
// string appearing in a comment or a plain string literal is ignored.
func extractNPMImports(src string) []importRef {
	var refs []importRef
	for _, m := range tsModuleSpecifier.FindAllStringSubmatchIndex(src, -1) {
		// Exactly one alternative captures per match; take whichever did.
		for group := 1; group <= 4; group++ {
			start, end := m[2*group], m[2*group+1]
			if start < 0 {
				continue
			}
			refs = append(refs, importRef{
				Path: src[start:end],
				Line: 1 + strings.Count(src[:start], "\n"),
			})
			break
		}
	}
	return refs
}

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
	// Ambiguous reports that the import path this row came from is published
	// by more than one construct version, so the version cannot be recovered
	// from consumer code. models/core is the live example: three core
	// versions share it. Reporting such a row as superseded would be a false
	// positive and omitting it a false negative, so it is neither.
	Ambiguous bool
	// Candidates lists the construct keys an ambiguous import could mean.
	Candidates []string
	// AmbiguousSuperseded is the subset of Candidates that are superseded.
	// Non-empty means the consumer may be on a superseded version and it
	// cannot be determined either way.
	AmbiguousSuperseded []string
	// ImportPath is the published path this row resolved from, set for
	// ambiguous rows so the reader can see what was matched.
	ImportPath string
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
	// UnparsedFiles lists Go files whose imports could not be read. Their
	// references are invisible to this scan, so a clean result for this repo
	// is only as complete as this list is empty.
	UnparsedFiles []string
	// ScanDefects lists parts of the tree that could not be read at all — a
	// missing checkout, an unreadable subtree, an unopenable file. Unlike
	// UnparsedFiles these are traversal failures, and they matter most for
	// the case they make indistinguishable otherwise: a consumer that was
	// never scanned looks exactly like a consumer with no superseded usage.
	ScanDefects []ScanDefect
}

// FullyScanned reports whether the sweep read this consumer's whole tree.
// When false, every "not used" row for this repo means "not seen", and a
// clean result must not be treated as a pass.
func (r SupersededRepoReport) FullyScanned() bool { return len(r.ScanDefects) == 0 }

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
// superseded construct version.
//
// A false here only means "nothing was found", which is not the same as
// "nothing is there" — check IsComplete before treating it as a pass.
func (r *SupersededReport) HasSupersededUsage() bool {
	for _, repo := range r.Repos {
		if repo.SupersededCount() > 0 {
			return true
		}
	}
	return false
}

// IsComplete reports whether the construct index covered the whole tree. When
// false, a clean HasSupersededUsage result is unreliable: the construct that
// would have matched may simply never have been loaded.
func (r *SupersededReport) IsComplete() bool { return r.Index.IsComplete() }

// HasUnresolvedUsage reports whether any consumer imports a version-erased
// path whose candidates include a superseded version — meaning the consumer
// may be on a superseded construct and it cannot be determined either way.
//
// This is deliberately separate from HasSupersededUsage: one is "confirmed on
// a superseded version", the other is "cannot confirm". Enforcement fails on
// both, but the report distinguishes them.
func (r *SupersededReport) HasUnresolvedUsage() bool {
	for _, repo := range r.Repos {
		for _, res := range repo.Resolutions {
			if res.Ambiguous && len(res.AmbiguousSuperseded) > 0 {
				return true
			}
		}
	}
	return false
}

// SkippedConstructs returns the construct directories that could not be
// indexed, sorted by path.
func (r *SupersededReport) SkippedConstructs() []SkippedConstruct { return r.Index.Skipped }

// FullyScanned reports whether every requested consumer tree was read in full.
// When false, a "not used" row may mean "not seen", so a clean result is not a
// pass — an unscanned consumer and a clean consumer are otherwise identical in
// the output.
func (r *SupersededReport) FullyScanned() bool {
	for _, repo := range r.Repos {
		if !repo.FullyScanned() {
			return false
		}
	}
	return true
}

// UnscannedRepos returns the consumers whose trees could not be read in full.
func (r *SupersededReport) UnscannedRepos() []SupersededRepoReport {
	var out []SupersededRepoReport
	for _, repo := range r.Repos {
		if !repo.FullyScanned() {
			out = append(out, repo)
		}
	}
	return out
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

	// ambiguous[importPath] accumulates the files referencing a version-erased
	// import, plus the construct versions it could mean.
	type ambiguousImport struct {
		candidates []ConstructVersion
		files      map[string]bool
	}
	ambiguous := map[string]*ambiguousImport{}

	recordAmbiguous := func(candidates []ConstructVersion, importPath, file string) {
		entry, ok := ambiguous[importPath]
		if !ok {
			entry = &ambiguousImport{candidates: candidates, files: map[string]bool{}}
			ambiguous[importPath] = entry
		}
		entry.files[file] = true
	}

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

	// resolve maps one declared import to construct versions and records it.
	resolve := func(surface SupersededSurface, ref importRef, file string) {
		var candidates []ConstructVersion
		switch surface {
		case SurfaceGo:
			// Exact lookup against the generator's published paths.
			candidates = idx.ByGoImport[ref.Path]
		case SurfaceNPMDeep:
			m := npmDeepPattern.FindStringSubmatch(ref.Path)
			if m == nil {
				return
			}
			if c, ok := idx.ByExposed[m[1]+"/"+m[2]]; ok {
				candidates = []ConstructVersion{c}
			}
		}
		if len(candidates) == 0 {
			// Not a path this repo publishes.
			return
		}

		if len(candidates) > 1 {
			// Version-erased import: the generator publishes several
			// construct versions at this path, so consumer code cannot say
			// which one is meant.
			recordAmbiguous(candidates, ref.Path, file)
			return
		}

		c := candidates[0]
		record(c.Construct, surface, c.Version, file)

		if !c.IsSuperseded() {
			return
		}
		out.Usages = append(out.Usages, SupersededUsage{
			Repo:      nt.repo,
			Surface:   surface,
			Construct: c.Key,
			Terminal:  c.Terminal,
			File:      file,
			Line:      ref.Line,
			Import:    ref.Path,
		})
	}

	scan := func(tree sourceTree, exts []string, surface SupersededSurface) error {
		if tree == nil {
			return nil
		}
		defects, err := tree.WalkFiltered(".", exts, func(path string) error {
			raw, err := tree.ReadFile(path)
			if err != nil {
				// Unreadable file: keep going, but record it. Skipping
				// silently would let a permission error read as an absence
				// of superseded imports.
				out.ScanDefects = append(out.ScanDefects, ScanDefect{
					Path:   path,
					Reason: err.Error(),
				})
				return nil
			}
			out.FilesScanned++
			src := string(raw)

			var refs []importRef
			if surface == SurfaceGo {
				parsed, parseErr := extractGoImports(path, src)
				if parseErr != nil {
					// Record rather than drop: a file we cannot parse is a
					// file whose imports we cannot see, and silently
					// treating it as import-free is the same false-clean
					// failure as an unindexed construct.
					out.UnparsedFiles = append(out.UnparsedFiles, path)
					return nil
				}
				refs = parsed
			} else {
				refs = extractNPMImports(src)
			}

			for _, ref := range refs {
				if surface == SurfaceNPMDeep && npmBundledPattern.MatchString(ref.Path) {
					out.BundledClientImports++
					continue
				}
				resolve(surface, ref, path)
			}
			return nil
		})
		out.ScanDefects = append(out.ScanDefects, defects...)
		return err
	}

	if err := scan(nt.goTree, goExts, SurfaceGo); err != nil {
		return nil, fmt.Errorf("superseded: scan %s (go): %w", nt.repo, err)
	}
	if err := scan(nt.npmTree, npmExts, SurfaceNPMDeep); err != nil {
		return nil, fmt.Errorf("superseded: scan %s (npm): %w", nt.repo, err)
	}
	sort.Strings(out.UnparsedFiles)

	// A requested consumer that yielded no source files at all was almost
	// certainly not the tree the caller meant — a wrong path, or a checkout
	// that never happened. Any real consumer has Go or TypeScript in it, so
	// treat an empty sweep as unscanned rather than as a clean result.
	if out.FilesScanned == 0 && len(out.ScanDefects) == 0 {
		out.ScanDefects = append(out.ScanDefects, ScanDefect{
			Path:   nt.path,
			Reason: "no Go or TypeScript source files found; the path may be wrong",
		})
	}
	// The Go and npm sweeps walk the same tree, so a shared failure — a
	// missing checkout above all — is reported by both. Collapse duplicates
	// so the count reflects distinct problems.
	seenDefect := map[ScanDefect]bool{}
	deduped := out.ScanDefects[:0]
	for _, d := range out.ScanDefects {
		if seenDefect[d] {
			continue
		}
		seenDefect[d] = true
		deduped = append(deduped, d)
	}
	out.ScanDefects = deduped

	sort.Slice(out.ScanDefects, func(i, j int) bool {
		if out.ScanDefects[i].Path != out.ScanDefects[j].Path {
			return out.ScanDefects[i].Path < out.ScanDefects[j].Path
		}
		return out.ScanDefects[i].Reason < out.ScanDefects[j].Reason
	})

	// Ambiguous imports become their own rows. They are attributed to the
	// family their candidates share — every current override maps versions of
	// a single construct — but never to a version, which is the whole point.
	for importPath, entry := range ambiguous {
		var candidates, supersededKeys []string
		for _, c := range entry.candidates {
			candidates = append(candidates, c.Key)
			if c.IsSuperseded() {
				supersededKeys = append(supersededKeys, c.Key)
			}
		}
		sort.Strings(candidates)
		sort.Strings(supersededKeys)

		family := entry.candidates[0].Construct
		if !inScope[family] {
			// No version of this family was ever superseded, so there is no
			// migration question for the ambiguity to obscure.
			continue
		}

		out.Resolutions = append(out.Resolutions, SupersededResolution{
			Family:              family,
			Surface:             SurfaceGo,
			Files:               len(entry.files),
			Ambiguous:           true,
			Candidates:          candidates,
			AmbiguousSuperseded: supersededKeys,
			ImportPath:          importPath,
		})
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
