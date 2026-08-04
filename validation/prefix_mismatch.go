package validation

import (
	"fmt"
	"sort"
	"strings"
)

// Prefix-mismatch detection.
//
// A schema path key is the complete path the server serves — nothing prepends
// `/api` at build time. When a construct declares an operation without the
// prefix the consumer's router actually applies, every generated client emits
// a URL that no route answers. Nothing else in the pipeline catches it: the
// bundle is valid OpenAPI, the generators are happy, and the client compiles
// and type-checks. The failure only appears at runtime, as a 404/405 against
// every environment.
//
// The evidence is already present in the audit's outer join, just split across
// two categories that nothing correlates:
//
//	Spec only (no handlers)   POST /events        <- what the schema declared
//	Handler only (no spec)    POST /api/events    <- what the server serves
//
// Those two lines are one defect. detectPrefixMismatches rejoins them.
//
// This is deliberately narrower than "every path must start with /api". That
// blanket rule would be wrong: the schedule construct declares `/user/schedules`
// without the prefix because meshery-cloud registers those routes on the bare
// router, outside the `/api` group. Such paths match their handler and never
// reach SchemaOnly, so they cannot trip this check. Only a schema path with no
// handler whose prefixed twin is an orphaned handler is reported.

// PrefixMismatch is one schema endpoint whose declared path has no handler,
// paired with the orphaned consumer handler that differs from it only by the
// `/api` prefix.
type PrefixMismatch struct {
	Method string // HTTP method common to both sides

	// SchemaPath is the path as declared in the schema (the one with no handler).
	SchemaPath string
	// ConsumerPath is the path the consumer actually serves.
	ConsumerPath string

	OperationID string // schema operationId, for a human-readable anchor
	SourceFile  string // repo-relative api.yml that declares SchemaPath
	Repo        string // consumer repo serving ConsumerPath
	RouterFile  string // consumer file registering the route
	RouterLine  int    // line number of the registration
}

// String renders a single actionable line for the audit report.
func (p PrefixMismatch) String() string {
	return fmt.Sprintf(
		"%s %s (operationId %q, %s) has no handler, but %s serves %s %s at %s:%d. "+
			"The declared path is missing the %q prefix its router applies.",
		p.Method, p.SchemaPath, p.OperationID, p.SourceFile,
		p.Repo, p.Method, p.ConsumerPath, p.RouterFile, p.RouterLine,
		apiPrefix,
	)
}

// apiPrefix is the router group prefix that the authenticated API surface is
// served under across the ecosystem.
const apiPrefix = "/api"

// detectPrefixMismatches correlates schema-only endpoints against consumer-only
// handlers, reporting every pair whose paths are identical once the `/api`
// prefix is accounted for.
//
// Both directions are checked. A schema path missing the prefix is the common
// case; a schema path carrying a prefix the router does not apply is the same
// class of defect and equally invisible, so it is reported too.
//
// Results are sorted by (method, schema path) for deterministic output.
func detectPrefixMismatches(match *matchResult) []PrefixMismatch {
	if match == nil {
		return nil
	}

	// Index orphaned handlers by a param-name-insensitive key. The main
	// matcher already tolerates spec `{eventId}` vs. consumer `{id}` drift,
	// and the same tolerance is required here: without it a prefix defect on
	// a parameterized path (`/events/{eventId}` vs. `/api/events/{id}`) would
	// slip through on a naming difference that is not the defect.
	consumerByLoose := make(map[matchKey][]consumerEndpoint, len(match.ConsumerOnly))
	for _, c := range match.ConsumerOnly {
		k := looseMatchKey(c.Method, c.Path)
		consumerByLoose[k] = append(consumerByLoose[k], c)
	}

	var out []PrefixMismatch
	for _, ep := range match.SchemaOnly {
		method := strings.ToUpper(ep.Method)

		// Candidate served paths: the declared path with the prefix added,
		// and — for a schema that wrongly carries the prefix — with it removed.
		var candidates []string
		if !hasAPIPrefix(ep.Path) {
			candidates = append(candidates, apiPrefix+ep.Path)
		} else {
			candidates = append(candidates, strings.TrimPrefix(ep.Path, apiPrefix))
		}

		for _, candidate := range candidates {
			for _, c := range consumerByLoose[looseMatchKey(method, candidate)] {
				out = append(out, PrefixMismatch{
					Method:       method,
					SchemaPath:   ep.Path,
					ConsumerPath: c.Path,
					OperationID:  ep.OperationID,
					SourceFile:   ep.SourceFile,
					Repo:         c.Repo,
					RouterFile:   c.RouterFile,
					RouterLine:   c.RouterLine,
				})
			}
		}
	}

	sort.Slice(out, func(i, j int) bool {
		if out[i].Method != out[j].Method {
			return out[i].Method < out[j].Method
		}
		if out[i].SchemaPath != out[j].SchemaPath {
			return out[i].SchemaPath < out[j].SchemaPath
		}
		return out[i].Repo < out[j].Repo
	})
	return out
}

// hasAPIPrefix reports whether path is served under the `/api` router group.
// It matches on a full segment so a path like `/apiary` is not mistaken for one.
func hasAPIPrefix(path string) bool {
	return path == apiPrefix || strings.HasPrefix(path, apiPrefix+"/")
}
