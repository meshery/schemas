package validation

import (
	"fmt"
	"sort"
	"strings"

	"github.com/getkin/kin-openapi/openapi3"
)

// --- Rule 46: Sibling-endpoint parameter parity ---
//
// Rule 46 catches the class of drift that hit the workspaces list endpoint
// in production: `GET /api/workspaces` was missing a
// `$ref: "#/components/parameters/orgIdQuery"` filter ref even though the
// sibling `GET /api/environments` declared one, causing server-side handlers
// to drop the `orgId` query and return 400. The rule compares top-level
// collection-list GET endpoints across every `api.yml` in the same API
// version directory (e.g. `schemas/constructs/v1beta1/*/api.yml`) — if at
// least one declares `orgIdQuery`, every other list endpoint in that
// version must too.
//
// A "collection-list endpoint" for Rule 46 purposes is:
//
//   - A GET operation
//   - On a path that contains no path parameters (`{...}`) — list
//     endpoints take no selector.
//   - Whose 200 response body schema references a schema whose name ends
//     in "Page" (the Page-shape pagination envelope). The Page-shape
//     filter narrows the rule to real list endpoints and excludes
//     non-listing GETs like `GET /api/system/version`.
//
// This rule requires cross-file visibility, so the per-file walker
// collects endpoints into a parityAccumulator during Audit(), and the
// check fires from Audit() after every api.yml has been scanned — mirror-
// ing the Rule 29 cross-construct fingerprint pattern.
//
// Severity is flag-gated via classifyStyleIssue — advisory under
// `--style-debt`, blocking under `--strict-consistency`, suppressed
// otherwise. Agent 1.G baselines the surface; after Phase 3 per-resource
// migrations, Rule 46 should run clean.

// parityEndpoint is one top-level collection-list GET endpoint captured
// from an api.yml.
type parityEndpoint struct {
	file          string
	version       string
	path          string
	operationID   string
	hasOrgIDQuery bool
}

// parityAccumulator buffers collection-list endpoints across all api.yml
// files in a single Audit() run so the cross-version parity check can
// compare them after the per-file walk completes.
type parityAccumulator struct {
	endpoints []parityEndpoint
}

// orgIDQueryParamRef matches the canonical parameter $ref that environments
// + views declare today. The rule intentionally matches the literal ref
// path rather than the parameter name so a resource that re-uses the
// declared param component is recognised, while an inline param with the
// same name is only recognised via the inline-name fallback below.
const orgIDQueryParamRef = "#/components/parameters/orgIdQuery"

// collectParityEndpoints appends every top-level collection-list GET in
// `doc` to `acc`. Invoked by auditAPISpec during the per-file walk.
func collectParityEndpoints(filePath, version string, doc *openapi3.T, acc *parityAccumulator) {
	if acc == nil || doc == nil || doc.Paths == nil {
		return
	}
	for path, item := range doc.Paths.Map() {
		if strings.Contains(path, "{") {
			continue // path with params is not a list endpoint
		}
		op := item.Get
		if op == nil {
			continue
		}
		if !respondsWithPage(op) {
			continue // not a list endpoint
		}
		acc.endpoints = append(acc.endpoints, parityEndpoint{
			file:        filePath,
			version:     version,
			path:        path,
			operationID: op.OperationID,
			// Parity check considers parameters declared at both the
			// operation level and the PathItem level — the latter apply
			// to every operation on the path under OpenAPI semantics.
			hasOrgIDQuery: hasOrgIDQueryInParams(item.Parameters) ||
				hasOrgIDQueryInParams(op.Parameters),
		})
	}
}

// respondsWithPage returns true when the operation's 200 response body
// references a JSON schema whose component name ends in "Page", either
// directly or through a composition keyword (`allOf`/`anyOf`/`oneOf`)
// that resolves to a Page-shaped schema. That covers WorkspacePage,
// EnvironmentPage, MesheryDesignPage, WorkspacesDesignsMappingPage, plus
// any future schema that is built by composing a Page envelope into an
// intermediate wrapper. Anything else is considered a non-listing GET
// and excluded from Rule 46.
func respondsWithPage(op *openapi3.Operation) bool {
	if op == nil || op.Responses == nil {
		return false
	}
	resp := op.Responses.Status(200)
	if resp == nil || resp.Value == nil {
		return false
	}
	content := resp.Value.Content["application/json"]
	if content == nil || content.Schema == nil {
		return false
	}
	return schemaRefEndsInPage(content.Schema)
}

// schemaRefEndsInPage returns true when the schema ref, or any ref
// reachable through `allOf`/`anyOf`/`oneOf` composition, names a
// component whose name ends in "Page". Cycles are avoided by only
// walking child SchemaRef pointers one level deep — the schemas repo
// never nests Page composition more than one level, and deeper walks
// would risk cyclic ref loops.
func schemaRefEndsInPage(ref *openapi3.SchemaRef) bool {
	if ref == nil {
		return false
	}
	if strings.HasSuffix(ref.Ref, "Page") {
		return true
	}
	if ref.Value == nil {
		return false
	}
	for _, sub := range ref.Value.AllOf {
		if strings.HasSuffix(sub.Ref, "Page") {
			return true
		}
	}
	for _, sub := range ref.Value.AnyOf {
		if strings.HasSuffix(sub.Ref, "Page") {
			return true
		}
	}
	for _, sub := range ref.Value.OneOf {
		if strings.HasSuffix(sub.Ref, "Page") {
			return true
		}
	}
	return false
}

// hasOrgIDQueryInParams returns true when the given OpenAPI parameter
// list declares the orgIdQuery parameter — either via a $ref to the
// canonical component definition, or as an inline `in: query`
// parameter named `orgId` / `organizationId`. Reused for both
// operation-level (`Operation.Parameters`) and path-level
// (`PathItem.Parameters`) lists so Rule 46 recognises the canonical
// OpenAPI pattern of hoisting a shared parameter to the path level.
func hasOrgIDQueryInParams(params openapi3.Parameters) bool {
	for _, p := range params {
		if p == nil {
			continue
		}
		if p.Ref == orgIDQueryParamRef {
			return true
		}
		if p.Value != nil && p.Value.In == "query" {
			switch p.Value.Name {
			case "orgId", "organizationId":
				return true
			}
		}
	}
	return false
}

// reportParityViolations runs after every api.yml has been walked and
// returns Rule 46 violations. The sibling rule: for each version directory
// (e.g., v1beta1, v1beta2), if ANY collected list endpoint declares
// orgIdQuery, every other list endpoint in that version must declare it
// too.
func reportParityViolations(acc *parityAccumulator, opts AuditOptions) []Violation {
	if acc == nil {
		return nil
	}
	sev := classifyStyleIssue(opts)
	if sev == nil {
		return nil
	}

	// Group endpoints by version, ignoring those without a version
	// attribution (defensive; the walker fills it in).
	byVersion := map[string][]parityEndpoint{}
	for _, e := range acc.endpoints {
		if e.version == "" {
			continue
		}
		byVersion[e.version] = append(byVersion[e.version], e)
	}

	var out []Violation
	versions := make([]string, 0, len(byVersion))
	for v := range byVersion {
		versions = append(versions, v)
	}
	sort.Strings(versions)

	for _, version := range versions {
		group := byVersion[version]
		anyHas := false
		var siblingsWithOrg []string
		for _, e := range group {
			if e.hasOrgIDQuery {
				anyHas = true
				siblingsWithOrg = append(siblingsWithOrg, e.path)
			}
		}
		if !anyHas {
			continue // no sibling established the pattern
		}

		// Report the ones that DON'T declare orgIdQuery. Emit in
		// deterministic order: sort by (file, path) so the advisory
		// baseline stays stable across runs.
		missing := make([]parityEndpoint, 0, len(group))
		for _, e := range group {
			if !e.hasOrgIDQuery {
				missing = append(missing, e)
			}
		}
		sort.Slice(missing, func(i, j int) bool {
			if missing[i].file != missing[j].file {
				return missing[i].file < missing[j].file
			}
			return missing[i].path < missing[j].path
		})

		for _, e := range missing {
			opID := e.operationID
			if opID == "" {
				opID = "(no operationId)"
			}
			// Message stays baseline-stable by NOT embedding the
			// variable list of sibling paths (which grows as new
			// endpoints adopt orgIdQuery, invalidating
			// advisory-baseline hashes). Readers can run
			// `make audit-schemas-style-full | grep orgIdQuery` to see
			// the full sibling list, or look at violated-endpoint
			// siblings in the same version directory.
			out = append(out, Violation{
				File: e.file,
				Message: fmt.Sprintf(
					`GET %q (operationId %q) is missing the `+
						`"#/components/parameters/orgIdQuery" parameter ref, `+
						`while sibling list endpoints in the %s directory declare it. `+
						`Partial parity across sibling list endpoints is the drift `+
						`class that dropped the workspaces-orgId query in production. `+
						`Either add the ref here, or remove it from the sibling for `+
						`consistency. See docs/casing-rules.md and `+
						`docs/identifier-naming-migration.md §9.4.`,
					e.path, opID, version),
				Severity:   *sev,
				RuleNumber: 46,
			})
		}
	}
	return out
}
