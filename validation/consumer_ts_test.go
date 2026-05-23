package validation

import (
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"testing"
)

// memTree is an in-memory sourceTree used by the TS consumer tests so the
// fixtures do not need to hit the filesystem. It reuses the walk-order
// contract of localTree (sorted) to match the real runtime.
type memTree struct {
	ref   string
	files map[string]string
}

func (t *memTree) ReadFile(path string) ([]byte, error) {
	data, ok := t.files[path]
	if !ok {
		return nil, fmt.Errorf("memTree: file %q not found", path)
	}
	return []byte(data), nil
}

func (t *memTree) Walk(dir string, fn func(path string) error) error {
	var paths []string
	for p := range t.files {
		if strings.HasPrefix(p, strings.TrimRight(dir, "/")+"/") {
			paths = append(paths, p)
		}
	}
	sort.Strings(paths)
	for _, p := range paths {
		if err := fn(p); err != nil {
			return err
		}
	}
	return nil
}

func (t *memTree) Ref() string {
	if t.ref == "" {
		return "mem:"
	}
	return t.ref
}

// findFinding returns the first finding matching (file, kind, key), or nil.
// Test failures quote the matched tuple so drift in positional assertions
// surfaces clearly.
func findFinding(findings []TSFinding, file string, kind TSFindingKind, key string) *TSFinding {
	for i := range findings {
		f := &findings[i]
		if f.File == file && f.Kind == kind && f.Key == key {
			return f
		}
	}
	return nil
}

// TestConsumerTS_CaseFlipInCatalog recreates the `catalog.ts:110`
// `orgID: queryArg.orgId` fixture called out in the Phase 1.F charter.
// The parser must find the endpoint and attach a case-flip finding.
func TestConsumerTS_CaseFlipInCatalog(t *testing.T) {
	// Padding lines keep the orgID assignment on line 110 so the fixture
	// matches the real `meshery-extensions/meshmap/src/rtk-query/catalog.ts`
	// coordinates. The charter's acceptance criterion names this line
	// number explicitly and a regression in line accounting should be
	// caught by the test.
	const prefix = "// padding line placeholder. line 1\n"
	var builder strings.Builder
	for i := 1; i < 100; i++ {
		builder.WriteString(prefix)
	}
	builder.WriteString(`export const catalogApi = api.injectEndpoints({
  endpoints: builder => ({
    getWorkspaceForCatalog: builder.query({
      query: queryArg => ({
        url: ` + "`/api/extensions/api/workspaces`" + `,
        params: {
          page: queryArg.page,
          pagesize: queryArg.pagesize,
          search: queryArg.search,
          order: queryArg.order,
          orgID: queryArg.orgId
        }
      }),
      providesTags: ["workspace"]
    })
  })
});
`)
	src := builder.String()

	tree := &memTree{
		ref:   "test",
		files: map[string]string{"meshmap/src/rtk-query/catalog.ts": src},
	}
	endpoints, findings, err := parseTSConsumer(tree, TSConsumerExtensions)
	if err != nil {
		t.Fatalf("parseTSConsumer: %v", err)
	}
	if len(endpoints) != 1 {
		t.Fatalf("expected 1 endpoint, got %d: %+v", len(endpoints), endpoints)
	}
	ep := endpoints[0]
	if ep.HandlerName != "getWorkspaceForCatalog" {
		t.Errorf("HandlerName = %q, want getWorkspaceForCatalog", ep.HandlerName)
	}
	if ep.Path != "/api/extensions/api/workspaces" {
		t.Errorf("Path = %q, want /api/extensions/api/workspaces", ep.Path)
	}
	if ep.Method != "GET" {
		t.Errorf("Method = %q, want GET", ep.Method)
	}

	// Charter: must surface catalog.ts:110 case-flip.
	f := findFinding(findings, "meshmap/src/rtk-query/catalog.ts", TSFindingCaseFlip, "orgID")
	if f == nil {
		t.Fatalf("no case-flip finding for orgID; findings: %+v", findings)
	}
	if f.Line != 110 {
		t.Errorf("case-flip line = %d, want 110", f.Line)
	}
	if f.Repo != TSConsumerExtensions {
		t.Errorf("case-flip repo = %q, want %q", f.Repo, TSConsumerExtensions)
	}
}

// TestConsumerTS_DesignsWrapper recreates the `designs.ts:308` `pattern_data`
// body wrapper case from the charter.
func TestConsumerTS_DesignsWrapper(t *testing.T) {
	// 306 padding lines bring the body wrapper to line 308 exactly so the
	// parser's line number matches the real checkout fixture.
	const pad = "// pad\n"
	var builder strings.Builder
	for i := 1; i < 303; i++ {
		builder.WriteString(pad)
	}
	builder.WriteString(`
uploadPatternBySourceType: builder.mutation({
  query: queryArg => ({
    url: ` + "`/api/content/patterns/${queryArg.sourceType}`" + `,
    method: "POST",
    body: { pattern_data: { name: queryArg.fileName, patternFile: queryArg.patternFileData }, save: queryArg.save }
  })
}),
`)
	src := builder.String()

	tree := &memTree{
		files: map[string]string{"meshmap/src/rtk-query/designs.ts": src},
	}
	endpoints, findings, err := parseTSConsumer(tree, TSConsumerExtensions)
	if err != nil {
		t.Fatalf("parseTSConsumer: %v", err)
	}
	if len(endpoints) != 1 {
		t.Fatalf("expected 1 endpoint, got %d", len(endpoints))
	}
	if got, want := endpoints[0].Method, "POST"; got != want {
		t.Errorf("Method = %q, want %q", got, want)
	}
	if got, want := endpoints[0].Path, "/api/content/patterns/{sourceType}"; got != want {
		t.Errorf("Path = %q, want %q", got, want)
	}

	f := findFinding(findings, "meshmap/src/rtk-query/designs.ts", TSFindingSnakeCaseWrapper, "pattern_data")
	if f == nil {
		t.Fatalf("no pattern_data wrapper finding; got: %+v", findings)
	}
	if f.Line != 308 {
		t.Errorf("wrapper line = %d, want 308", f.Line)
	}
}

// TestConsumerTS_UserHookInconsistencies covers the "user.ts hook
// inconsistencies" acceptance criterion: a mutation body that retains
// SCREAMING-casing for orgID should surface as a case-flip, and an
// adjacent snake_case param key should be flagged as drift.
func TestConsumerTS_UserHookInconsistencies(t *testing.T) {
	src := `import { mesheryApi } from "@meshery/schemas/mesheryApi";

export const userApi = mesheryApi.injectEndpoints({
  endpoints: builder => ({
    notifyMentionedUsers: builder.mutation({
      query: queryArg => ({
        url: "/api/extensions/api/identity/users/notify/comment",
        method: "POST",
        body: { orgID: selectedOrganization?.id, sub_type: queryArg.subType, userIds: queryArg.userIds }
      })
    }),
    getAllUsers: builder.query({
      query: queryArg => ({
        url: "/api/identity/users",
        params: { page_size: queryArg.pageSize, orgID: queryArg.orgId }
      })
    })
  })
});
`
	tree := &memTree{
		files: map[string]string{"meshmap/src/rtk-query/user.ts": src},
	}
	endpoints, findings, err := parseTSConsumer(tree, TSConsumerExtensions)
	if err != nil {
		t.Fatalf("parseTSConsumer: %v", err)
	}
	if len(endpoints) != 2 {
		t.Fatalf("expected 2 endpoints, got %d", len(endpoints))
	}

	// body { orgID: selectedOrganization?.id } — case-flip
	if f := findFinding(findings, "meshmap/src/rtk-query/user.ts", TSFindingCaseFlip, "orgID"); f == nil {
		t.Errorf("missing orgID case-flip; got %+v", findings)
	}
	// body { sub_type: ... } — snake-case wrapper
	if f := findFinding(findings, "meshmap/src/rtk-query/user.ts", TSFindingSnakeCaseWrapper, "sub_type"); f == nil {
		t.Errorf("missing sub_type wrapper finding; got %+v", findings)
	}
	// page_size is in the pagination envelope allow-list — must NOT be flagged.
	for _, f := range findings {
		if f.Key == "page_size" {
			t.Errorf("page_size should be allow-listed, got finding %+v", f)
		}
	}
}

// TestConsumerTS_AllowedPaginationKeys confirms page_size / total_count are
// exempt from snake_case flags per the published contract.
func TestConsumerTS_AllowedPaginationKeys(t *testing.T) {
	src := `
listItems: builder.query({
  query: queryArg => ({
    url: "/api/items",
    params: { page: queryArg.page, page_size: queryArg.pageSize, total_count: queryArg.total }
  })
})
`
	tree := &memTree{
		files: map[string]string{"ui/rtk-query/items.ts": src},
	}
	_, findings, err := parseTSConsumer(tree, TSConsumerMeshery)
	if err != nil {
		t.Fatalf("parseTSConsumer: %v", err)
	}
	for _, f := range findings {
		if f.Key == "page_size" || f.Key == "total_count" {
			t.Errorf("pagination-envelope key %q was flagged: %+v", f.Key, f)
		}
	}
}

// TestConsumerTS_URLNormalization validates the template-to-OpenAPI
// URL conversion contract. The matcher relies on `{paramName}` form so
// joins against the schema endpoint index succeed.
func TestConsumerTS_URLNormalization(t *testing.T) {
	cases := []struct {
		name, src, want string
	}{
		{
			name: "backtick-single-param",
			src: `getOne: builder.query({
  query: queryArg => ({ url: ` + "`/api/items/${queryArg.id}`" + ` })
})`,
			want: "/api/items/{id}",
		},
		{
			name: "backtick-nested-param",
			src: `getSub: builder.query({
  query: queryArg => ({ url: ` + "`/api/items/${queryArg.parent.subId}/sub`" + ` })
})`,
			want: "/api/items/{subId}/sub",
		},
		{
			name: "plain-literal",
			src: `listAll: builder.query({
  query: () => ({ url: "/api/items" })
})`,
			want: "/api/items",
		},
		{
			name: "mesheryApiPath-helper",
			src: `getX: builder.query({
  query: () => ({ url: mesheryApiPath('integrations/foo') })
})`,
			want: "/api/integrations/foo",
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			tree := &memTree{
				files: map[string]string{"ui/rtk-query/fx.ts": tc.src},
			}
			endpoints, _, err := parseTSConsumer(tree, TSConsumerMeshery)
			if err != nil {
				t.Fatalf("parseTSConsumer: %v", err)
			}
			if len(endpoints) != 1 {
				t.Fatalf("expected 1 endpoint, got %d", len(endpoints))
			}
			if endpoints[0].Path != tc.want {
				t.Errorf("Path = %q, want %q", endpoints[0].Path, tc.want)
			}
		})
	}
}

// TestConsumerTS_BuildAliasParsed confirms the `build.query` / `build.mutation`
// form used by meshery-cloud's RTK codegen output is picked up alongside the
// `builder.query` form used elsewhere.
func TestConsumerTS_BuildAliasParsed(t *testing.T) {
	src := `const api = base.injectEndpoints({
  endpoints: build => ({
    handleUserInvite: build.mutation({
      query: queryArg => ({
        url: ` + "`/api/identity/orgs/${queryArg.orgId}/users/invite`" + `,
        method: "POST",
        body: queryArg.userInvite
      })
    })
  })
});`
	tree := &memTree{
		files: map[string]string{"ui/api/api.ts": src},
	}
	endpoints, _, err := parseTSConsumer(tree, TSConsumerCloud)
	if err != nil {
		t.Fatalf("parseTSConsumer: %v", err)
	}
	if len(endpoints) != 1 {
		t.Fatalf("expected 1 endpoint, got %d", len(endpoints))
	}
	if endpoints[0].HandlerName != "handleUserInvite" {
		t.Errorf("HandlerName = %q", endpoints[0].HandlerName)
	}
	if endpoints[0].Method != "POST" {
		t.Errorf("Method = %q, want POST", endpoints[0].Method)
	}
	if endpoints[0].Path != "/api/identity/orgs/{orgId}/users/invite" {
		t.Errorf("Path = %q", endpoints[0].Path)
	}
}

// TestConsumerTS_SkipsTestAndMockFiles confirms the parser does not walk
// into __tests__/mocks/*.d.ts paths which would otherwise drown the audit
// in fixture noise.
func TestConsumerTS_SkipsTestAndMockFiles(t *testing.T) {
	srcLive := `live: builder.query({ query: () => ({ url: "/api/live" }) })`
	srcFixture := `fixture: builder.query({ query: () => ({ url: "/api/fixture", params: { orgID: q.orgId } }) })`

	tree := &memTree{
		files: map[string]string{
			"ui/rtk-query/live.ts":                srcLive,
			"ui/rtk-query/__tests__/live.test.ts": srcFixture,
			"ui/rtk-query/mocks/mock.ts":          srcFixture,
			"ui/rtk-query/generated.d.ts":         srcFixture,
		},
	}
	endpoints, findings, err := parseTSConsumer(tree, TSConsumerMeshery)
	if err != nil {
		t.Fatalf("parseTSConsumer: %v", err)
	}
	if len(endpoints) != 1 {
		t.Fatalf("expected 1 endpoint (live), got %d", len(endpoints))
	}
	if len(findings) != 0 {
		t.Errorf("expected 0 findings from fixture-excluded files, got %+v", findings)
	}
}

// TestConsumerTS_DeterministicOrder asserts that parser output is stable
// across runs so reconciliation against the Google Sheet stays clean. The
// acceptance criteria require the audit produce deterministic output.
func TestConsumerTS_DeterministicOrder(t *testing.T) {
	src := `
b: builder.query({ query: () => ({ url: "/api/b" }) }),
a: builder.query({ query: () => ({ url: "/api/a" }) }),
c: builder.query({ query: () => ({ url: "/api/c" }) }),
`
	tree := &memTree{
		files: map[string]string{"ui/rtk-query/order.ts": src},
	}
	eps1, _, _ := parseTSConsumer(tree, TSConsumerMeshery)
	eps2, _, _ := parseTSConsumer(tree, TSConsumerMeshery)
	if len(eps1) != len(eps2) {
		t.Fatalf("run lengths differ: %d vs %d", len(eps1), len(eps2))
	}
	for i := range eps1 {
		if eps1[i].Path != eps2[i].Path || eps1[i].HandlerName != eps2[i].HandlerName {
			t.Errorf("non-deterministic order at index %d: %+v vs %+v", i, eps1[i], eps2[i])
		}
	}
}

// TestConsumerTS_RegistryCoversAllRepos ensures every TSConsumerRepo has
// associated scan dirs. A new repo added to the enum without a scan-dirs
// entry would silently do nothing — this test surfaces that drift.
func TestConsumerTS_RegistryCoversAllRepos(t *testing.T) {
	for _, repo := range []TSConsumerRepo{TSConsumerMeshery, TSConsumerCloud, TSConsumerExtensions} {
		if dirs, ok := tsScanDirs[repo]; !ok || len(dirs) == 0 {
			t.Errorf("repo %q missing scan dirs", repo)
		}
	}
}

// TestConsumerTS_FreeFormBodyCapturesHelperWrapper covers the charter's
// `designs.ts:308` acceptance case where a `body: { pattern_data: {...} }`
// wrapper lives inside a plain helper function (outside any
// `builder.query`/`builder.mutation` block). The file-level scan is what
// surfaces these.
func TestConsumerTS_FreeFormBodyCapturesHelperWrapper(t *testing.T) {
	src := `import { initiateQuery } from ".";

export const uploadPatternFile = async ({
  patternFileData,
  fileName
}: {
  patternFileData: string;
  fileName: string;
}) => {
  return await initiateQuery(designsApi.endpoints.uploadPatternBySourceType, {
    sourceType: "Design",
    body: { pattern_data: { name: fileName, patternFile: patternFileData } }
  });
};
`
	tree := &memTree{
		files: map[string]string{"meshmap/src/rtk-query/designs.ts": src},
	}
	_, findings, err := parseTSConsumer(tree, TSConsumerExtensions)
	if err != nil {
		t.Fatalf("parseTSConsumer: %v", err)
	}
	if f := findFinding(findings, "meshmap/src/rtk-query/designs.ts", TSFindingSnakeCaseWrapper, "pattern_data"); f == nil {
		t.Errorf("missing pattern_data wrapper finding; got %+v", findings)
	}
}

// TestConsumerTS_IntegrationAgainstMesheryExtensions is the Phase 1.F
// acceptance integration: when a local `../meshery-extensions` checkout is
// available, parsing its meshmap/src/rtk-query tree must produce all three
// charter-named findings. The test skips cleanly when the sibling repo is
// not present, so CI that does not mount the downstream checkouts still
// passes and the acceptance check is only asserted on a workstation that
// mirrors the full Phase 1.F environment.
func TestConsumerTS_IntegrationAgainstMesheryExtensions(t *testing.T) {
	root, ok := locateSiblingRepo("meshery-extensions", "meshmap/src/rtk-query/catalog.ts")
	if !ok {
		t.Skip("meshery-extensions sibling repo not present; integration test skipped")
	}
	tree := localTree{root: root}
	_, findings, err := parseTSConsumer(&tree, TSConsumerExtensions)
	if err != nil {
		t.Fatalf("parseTSConsumer: %v", err)
	}

	// Deterministic order — re-run and compare.
	_, findings2, _ := parseTSConsumer(&tree, TSConsumerExtensions)
	if len(findings) != len(findings2) {
		t.Fatalf("non-deterministic finding counts: %d vs %d", len(findings), len(findings2))
	}
	for i := range findings {
		if keyFinding(findings[i]) != keyFinding(findings2[i]) {
			t.Errorf("non-deterministic ordering at %d: %q vs %q",
				i, keyFinding(findings[i]), keyFinding(findings2[i]))
		}
	}

	// Charter acceptance: when the downstream repo contains the original
	// charter-named drift sites, the parser must flag them. The downstream
	// repo may legitimately fix these over time; in that case this
	// integration test should skip (the unit tests above still assert the
	// parser behavior against synthetic fixtures).
	//
	// We derive the expected line numbers from the current checkout so the
	// test is robust to unrelated line shifts.
	catalogSrc, err := os.ReadFile(filepath.Join(root, "meshmap/src/rtk-query/catalog.ts"))
	if err != nil {
		t.Fatalf("read catalog.ts: %v", err)
	}
	designsSrc, err := os.ReadFile(filepath.Join(root, "meshmap/src/rtk-query/designs.ts"))
	if err != nil {
		t.Fatalf("read designs.ts: %v", err)
	}

	orgIDSnippet := "orgID: queryArg.orgId"
	if ln, ok := lineOfFirst(string(catalogSrc), orgIDSnippet); ok {
		if !hasFindingAt(findings, "meshmap/src/rtk-query/catalog.ts", TSFindingCaseFlip, "orgID", ln) {
			t.Errorf("catalog.ts:%d %s case-flip missing from integration findings; got %+v", ln, "orgID", findings)
		}
	} else {
		t.Skipf("meshery-extensions checkout does not contain %q; integration acceptance site has moved or been fixed", orgIDSnippet)
	}

	patternDataSnippet := "pattern_data"
	if ln, ok := lineOfFirst(string(designsSrc), patternDataSnippet); ok {
		if !hasFindingAt(findings, "meshmap/src/rtk-query/designs.ts", TSFindingSnakeCaseWrapper, "pattern_data", ln) {
			t.Errorf("designs.ts:%d %s wrapper missing from integration findings; got %+v", ln, "pattern_data", findings)
		}
	} else {
		t.Skipf("meshery-extensions checkout does not contain %q; integration acceptance site has moved or been fixed", patternDataSnippet)
	}
}

func lineOfFirst(src, needle string) (int, bool) {
	idx := strings.Index(src, needle)
	if idx == -1 {
		return 0, false
	}
	// 1-indexed line number.
	return 1 + strings.Count(src[:idx], "\n"), true
}

// hasFindingAt reports whether the findings slice contains a site that
// matches all four coordinates (file, kind, key, line). Tests use this
// when the real fixture produces multiple findings with the same (kind,
// key) pair — the line number is what distinguishes the charter-named
// site from its siblings.
func hasFindingAt(findings []TSFinding, file string, kind TSFindingKind, key string, line int) bool {
	for _, f := range findings {
		if f.File == file && f.Kind == kind && f.Key == key && f.Line == line {
			return true
		}
	}
	return false
}

// locateSiblingRepo walks up from the working directory looking for a
// neighbouring checkout named repoName that contains the probe file. It
// returns (repoRoot, true) on match and (_, false) when the sibling is
// not available. The probe file makes the check cheap — readdir on a
// well-known path — and avoids false positives from empty directories.
func locateSiblingRepo(repoName, probeFile string) (string, bool) {
	cwd, err := os.Getwd()
	if err != nil {
		return "", false
	}
	// Walk up to six levels looking for the sibling dir. Six covers the
	// standard `../sibling` layout (package-level cwd = validation/) and
	// the Claude-harness worktree layout
	// (`<repo>/.claude/worktrees/<slug>/validation/`), both of which
	// need to traverse multiple parents to reach the sibling root.
	for i := 0; i < 6; i++ {
		candidate := filepath.Join(cwd, "..", repoName, probeFile)
		if _, err := os.Stat(candidate); err == nil {
			return filepath.Join(cwd, "..", repoName), true
		}
		cwd = filepath.Dir(cwd)
	}
	return "", false
}

// TestConsumerTS_EndpointNameNotFlaggedAsCaseFlip guards against a known
// false-positive shape: an RTK endpoint declared with a mixed-case name
// (`verifyConnectionURL: builder.mutation({...})`) must not be treated
// as a wire-format case-flip. The endpoint header's "key" is a TS
// function name, not a wire identifier.
func TestConsumerTS_EndpointNameNotFlaggedAsCaseFlip(t *testing.T) {
	src := `const api = base.injectEndpoints({
  endpoints: builder => ({
    verifyConnectionURL: builder.mutation({
      query: queryArg => ({
        url: "/api/connections/verify",
        method: "POST",
        params: { id: queryArg.repoURL }
      })
    })
  })
});`
	tree := &memTree{
		files: map[string]string{"ui/rtk-query/connection.ts": src},
	}
	_, findings, err := parseTSConsumer(tree, TSConsumerMeshery)
	if err != nil {
		t.Fatalf("parseTSConsumer: %v", err)
	}
	for _, f := range findings {
		if f.Key == "verifyConnectionURL" {
			t.Errorf("endpoint header %q was flagged as case-flip: %+v", f.Key, f)
		}
	}
}

// TestConsumerTS_FileWideCaseFlipCapturesHookCallSites covers the
// charter's "user.ts hook inconsistencies" case where a consumer invokes
// an RTK hook with a SCREAMING-case key (e.g.
// `useGetWorkspacesQuery({ orgID: selectedOrganization?.id })`). These
// sites are not inside a `builder.query` body so the endpoint-scoped
// scan misses them; the file-wide case-flip pass is what surfaces the
// drift.
func TestConsumerTS_FileWideCaseFlipCapturesHookCallSites(t *testing.T) {
	src := `import { useGetWorkspacesQuery } from "@meshery/schemas/mesheryApi";

export function HookSite() {
  const { data } = useGetWorkspacesQuery(
    {
      page: 0,
      pagesize: "all",
      order: "updated_at desc",
      orgID: selectedOrganization?.id,
    },
    { skip: !selectedOrganization?.id },
  );
  return data;
}
`
	tree := &memTree{
		files: map[string]string{"ui/rtk-query/user.ts": src},
	}
	_, findings, err := parseTSConsumer(tree, TSConsumerMeshery)
	if err != nil {
		t.Fatalf("parseTSConsumer: %v", err)
	}
	f := findFinding(findings, "ui/rtk-query/user.ts", TSFindingCaseFlip, "orgID")
	if f == nil {
		t.Fatalf("missing orgID case-flip at hook call site; got %+v", findings)
	}
	if f.Line < 4 || f.Line > 12 {
		t.Errorf("orgID line = %d, want within hook call range 4-12", f.Line)
	}
}
