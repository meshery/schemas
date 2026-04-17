package validation

import (
	"fmt"
	"regexp"
	"sort"
	"strings"
)

// matchKey is the canonical (method, path) key used for the schema↔consumer
// outer join. Methods are uppercased and paths are normalized for slashes
// only; published path-parameter casing remains exact so contract drift is
// visible instead of normalized away.
type matchKey struct {
	Method string
	Path   string
}

// matchResult is the output of comparing schema endpoints against consumer
// endpoints. Three explicit categories — no information loss.
type matchResult struct {
	SchemaOnly   []schemaEndpoint
	ConsumerOnly []consumerEndpoint
	Matched      []endpointMatch
}

// endpointMatch describes one endpoint that exists in both schema and a
// consumer. The consumer slice can hold both meshery and meshery-cloud rows
// when the same path is implemented in both repos.
type endpointMatch struct {
	Schema    schemaEndpoint
	Consumers []consumerEndpoint
}

// fieldDiff describes a single field discrepancy between schema and consumer.
type fieldDiff struct {
	FieldName    string
	InSchema     bool
	InConsumer   bool
	SchemaType   string
	ConsumerType string
}

type consumerAssessment struct {
	Status string
	Drift  []string
	Notes  []string
}

const (
	auditStatusTrue       = "TRUE"
	auditStatusFalse      = "FALSE"
	auditStatusNotAudited = "Not Audited"
)

type shapeAssessment struct {
	status shapeStatus
	diffs  []fieldDiff
	drift  []string
	reason string
}

// normalizeMatchKey produces the canonical match key for a (method, path)
// tuple. The display value of the path is preserved on the original
// schemaEndpoint / consumerEndpoint — only the lookup key is normalized.
func normalizeMatchKey(method, path string) matchKey {
	method = strings.ToUpper(strings.TrimSpace(method))
	if path == "" {
		return matchKey{Method: method}
	}
	if !strings.HasPrefix(path, "/") {
		path = "/" + path
	}
	if len(path) > 1 {
		path = strings.TrimRight(path, "/")
	}
	return matchKey{Method: method, Path: path}
}

// paramRE matches an OpenAPI-style path parameter (e.g. `{connectionId}`).
var paramRE = regexp.MustCompile(`\{[^}]+\}`)

// looseMatchKey is normalizeMatchKey with all path parameter names collapsed
// to `{}`. It is used as a second-pass lookup so that spec paths written with
// verbose parameter names (`{certificateId}`) still join against consumer
// routes that use short names (`:id` → `{id}`), with the drift itself
// surfaced as a per-row note.
func looseMatchKey(method, path string) matchKey {
	k := normalizeMatchKey(method, path)
	k.Path = paramRE.ReplaceAllString(k.Path, "{}")
	return k
}

// matchEndpoints performs the full outer join between schema and consumer
// endpoints.
func matchEndpoints(schema *schemaIndex, mesheryConsumers, cloudConsumers []consumerEndpoint) *matchResult {
	result := &matchResult{}
	if schema == nil {
		schema = &schemaIndex{}
	}

	mesheryByKey := make(map[matchKey][]int, len(mesheryConsumers))
	mesheryByLoose := make(map[matchKey][]int, len(mesheryConsumers))
	for i, ep := range mesheryConsumers {
		mesheryByKey[normalizeMatchKey(ep.Method, ep.Path)] = append(mesheryByKey[normalizeMatchKey(ep.Method, ep.Path)], i)
		mesheryByLoose[looseMatchKey(ep.Method, ep.Path)] = append(mesheryByLoose[looseMatchKey(ep.Method, ep.Path)], i)
	}
	cloudByKey := make(map[matchKey][]int, len(cloudConsumers))
	cloudByLoose := make(map[matchKey][]int, len(cloudConsumers))
	for i, ep := range cloudConsumers {
		cloudByKey[normalizeMatchKey(ep.Method, ep.Path)] = append(cloudByKey[normalizeMatchKey(ep.Method, ep.Path)], i)
		cloudByLoose[looseMatchKey(ep.Method, ep.Path)] = append(cloudByLoose[looseMatchKey(ep.Method, ep.Path)], i)
	}

	usedMeshery := make(map[int]bool, len(mesheryConsumers))
	usedCloud := make(map[int]bool, len(cloudConsumers))

	for _, ep := range schema.Endpoints {
		key := normalizeMatchKey(ep.Method, ep.Path)
		looseKey := looseMatchKey(ep.Method, ep.Path)
		// Apply x-internal filter for join.
		mesheryAllowed := xInternalAllows(ep.XInternal, "meshery")
		cloudAllowed := xInternalAllows(ep.XInternal, "cloud")

		var consumers []consumerEndpoint
		mesheryHit, cloudHit := false, false

		if mesheryAllowed {
			for _, i := range mesheryByKey[key] {
				consumers = append(consumers, mesheryConsumers[i])
				usedMeshery[i] = true
				mesheryHit = true
			}
		}
		// ANY method matching: a consumer registered with method "ANY"
		// implements every verb on that path.
		if mesheryAllowed {
			anyKey := matchKey{Method: "ANY", Path: key.Path}
			for _, i := range mesheryByKey[anyKey] {
				consumers = append(consumers, mesheryConsumers[i])
				usedMeshery[i] = true
				mesheryHit = true
			}
		}
		if cloudAllowed {
			for _, i := range cloudByKey[key] {
				consumers = append(consumers, cloudConsumers[i])
				usedCloud[i] = true
				cloudHit = true
			}
			anyKey := matchKey{Method: "ANY", Path: key.Path}
			for _, i := range cloudByKey[anyKey] {
				consumers = append(consumers, cloudConsumers[i])
				usedCloud[i] = true
				cloudHit = true
			}
		}

		// Second-pass loose match: when a repo's exact lookup returned
		// nothing, retry with parameter names stripped. This recovers
		// endpoints where the spec and consumer disagree only on param
		// naming (e.g. spec `{certificateId}` vs. consumer `{id}`). The
		// drift itself is surfaced on the joined consumer so it still
		// shows up in the Notes column.
		if mesheryAllowed && !mesheryHit {
			for _, i := range mesheryByLoose[looseKey] {
				if usedMeshery[i] {
					continue
				}
				c := consumerWithParamMismatchNote(mesheryConsumers[i], ep.Path)
				consumers = append(consumers, c)
				usedMeshery[i] = true
			}
		}
		if cloudAllowed && !cloudHit {
			for _, i := range cloudByLoose[looseKey] {
				if usedCloud[i] {
					continue
				}
				c := consumerWithParamMismatchNote(cloudConsumers[i], ep.Path)
				consumers = append(consumers, c)
				usedCloud[i] = true
			}
		}

		if len(consumers) == 0 {
			result.SchemaOnly = append(result.SchemaOnly, ep)
			continue
		}
		result.Matched = append(result.Matched, endpointMatch{
			Schema:    ep,
			Consumers: consumers,
		})
	}

	for i, ep := range mesheryConsumers {
		if !usedMeshery[i] {
			result.ConsumerOnly = append(result.ConsumerOnly, ep)
		}
	}
	for i, ep := range cloudConsumers {
		if !usedCloud[i] {
			result.ConsumerOnly = append(result.ConsumerOnly, ep)
		}
	}

	return result
}

// consumerWithParamMismatchNote returns a copy of c with an appended note
// documenting the path-parameter-name drift against the spec. The slice is
// copied so the original consumerEndpoint (held in the parser's slice) is
// never mutated.
func consumerWithParamMismatchNote(c consumerEndpoint, specPath string) consumerEndpoint {
	notes := make([]string, 0, len(c.Notes)+1)
	notes = append(notes, c.Notes...)
	notes = append(notes, fmt.Sprintf("path parameter name differs from spec: consumer %q vs spec %q", c.Path, specPath))
	c.Notes = notes
	return c
}

// xInternalAllows returns true if a schema endpoint with the given x-internal
// list is meant to be implemented by the named repo.
func xInternalAllows(xInternal []string, repo string) bool {
	if len(xInternal) == 0 {
		return true
	}
	for _, target := range xInternal {
		if target == repo {
			return true
		}
	}
	return false
}

// shapeStatus is the per-side outcome of verifyShape.
type shapeStatus int

const (
	// shapeUnverified means we don't have enough information to compare
	// (no schema shape, no consumer type info, or no inspected fields).
	shapeUnverified shapeStatus = iota
	// shapeOK means we compared schema and consumer fields and found no
	// material diffs.
	shapeOK
	// shapeDiff means we compared and found at least one diff.
	shapeDiff
)

func verifyShapeDetailed(shape *schemaShape, info *goTypeInfo, requestSide bool) shapeAssessment {
	sideLabel := "response"
	if requestSide {
		sideLabel = "request"
	}
	if shape == nil {
		return shapeAssessment{}
	}
	if info == nil {
		return shapeAssessment{
			status: shapeUnverified,
			reason: fmt.Sprintf("%s type could not be resolved from handler body", sideLabel),
		}
	}
	if info.IsFromSchema {
		expected := schemaTypeCandidates(shape)
		if len(expected) == 0 {
			typeName := info.TypeName
			if typeName == "" {
				typeName = "(unknown type)"
			}
			return shapeAssessment{
				status: shapeUnverified,
				reason: fmt.Sprintf("%s schema-backed type %q could not be matched to a named schema component", sideLabel, typeName),
			}
		}
		if schemaTypeMatches(shape, info) {
			return shapeAssessment{status: shapeOK}
		}
		return shapeAssessment{
			status: shapeDiff,
			drift:  []string{fmt.Sprintf("%s uses schema type %q but spec expects %s", sideLabel, info.TypeName, formatSchemaTypeCandidates(expected))},
		}
	}
	if len(info.Fields) == 0 {
		typeName := info.TypeName
		if typeName == "" {
			typeName = "(unknown type)"
		}
		return shapeAssessment{
			status: shapeUnverified,
			reason: fmt.Sprintf("%s type %q has no comparable field metadata", sideLabel, typeName),
		}
	}
	diffs := diffFields(shape, info, requestSide)
	if len(diffs) > 0 {
		return shapeAssessment{
			status: shapeDiff,
			diffs:  diffs,
		}
	}
	return shapeAssessment{status: shapeOK}
}

func assessConsumers(consumerProvided bool, repo string, consumers []consumerEndpoint, requestShape, responseShape *schemaShape, specQueryParams []schemaQueryParam) consumerAssessment {
	if !consumerProvided {
		return consumerAssessment{}
	}
	if len(consumers) == 0 {
		return consumerAssessment{
			Status: auditStatusNotAudited,
			Notes:  []string{fmt.Sprintf("handler not found in %s", repo)},
		}
	}

	combined := consumerAssessment{Status: auditStatusTrue}
	statusRank := func(status string) int {
		switch status {
		case auditStatusNotAudited:
			return 3
		case auditStatusFalse:
			return 2
		case auditStatusTrue:
			return 1
		default:
			return 0
		}
	}

	if len(consumers) > 1 {
		var handlers []string
		for _, c := range consumers {
			handlers = append(handlers, describeHandler(c))
		}
		combined.Notes = append(combined.Notes, fmt.Sprintf("%s has multiple registrations: %s", repo, strings.Join(handlers, ", ")))
	}

	for i := range consumers {
		assessment := assessConsumer(&consumers[i], requestShape, responseShape, specQueryParams)
		combined.Drift = append(combined.Drift, assessment.Drift...)
		combined.Notes = append(combined.Notes, assessment.Notes...)
		if statusRank(assessment.Status) > statusRank(combined.Status) {
			combined.Status = assessment.Status
		}
	}

	combined.Drift = uniqueStrings(combined.Drift)
	combined.Notes = uniqueStrings(combined.Notes)
	return combined
}

// assessQueryParams compares the query parameter names declared in the spec
// against the names read by the handler body. Discrepancies are returned as
// plain-text notes (not drift) so they appear in the Notes column without
// affecting Schema-Driven status, since query-param coverage is a new signal.
//
// The comparison uses a case-folded, separator-stripped canonical form so that
// "orgId" and "org_id" are recognized as referring to the same parameter, and
// the note reports the actual names rather than silently ignoring the mismatch.
func assessQueryParams(specParams []schemaQueryParam, handlerParams []string) []string {
	if len(specParams) == 0 && len(handlerParams) == 0 {
		return nil
	}

	normalize := func(s string) string {
		return strings.ToLower(strings.NewReplacer("_", "", "-", "").Replace(s))
	}

	specByCanon := make(map[string]string, len(specParams)) // canon → original spec name
	for _, p := range specParams {
		specByCanon[normalize(p.Name)] = p.Name
	}

	handlerByCanon := make(map[string]string, len(handlerParams)) // canon → original handler name
	for _, name := range handlerParams {
		handlerByCanon[normalize(name)] = name
	}

	var notes []string

	// Spec params that the handler never reads.
	for canon, specName := range specByCanon {
		if _, ok := handlerByCanon[canon]; !ok {
			notes = append(notes, fmt.Sprintf("query param %q declared in spec but not read by handler", specName))
			continue
		}
		handlerName := handlerByCanon[canon]
		if handlerName != specName {
			notes = append(notes, fmt.Sprintf("query param name differs: handler reads %q, spec defines %q", handlerName, specName))
		}
	}

	// Handler params not declared in the spec.
	for canon, handlerName := range handlerByCanon {
		if _, ok := specByCanon[canon]; !ok {
			notes = append(notes, fmt.Sprintf("query param %q read by handler but not declared in spec", handlerName))
		}
	}

	sort.Strings(notes)
	return notes
}

func assessConsumer(c *consumerEndpoint, requestShape, responseShape *schemaShape, specQueryParams []schemaQueryParam) consumerAssessment {
	if c == nil {
		return consumerAssessment{Status: auditStatusNotAudited}
	}

	var notes []string
	notes = append(notes, c.Notes...)
	if c.HandlerName == "" {
		return consumerAssessment{
			Status: auditStatusNotAudited,
			Notes:  append(notes, fmt.Sprintf("%s handler could not be resolved from route registration", c.Repo)),
		}
	}
	if c.HandlerName == "(anonymous)" {
		return consumerAssessment{
			Status: auditStatusNotAudited,
			Notes:  append(notes, fmt.Sprintf("%s handler is anonymous and could not be audited", c.Repo)),
		}
	}
	if c.HandlerFile == "" {
		return consumerAssessment{
			Status: auditStatusNotAudited,
			Notes:  append(notes, fmt.Sprintf("%s handler %q could not be joined to a source file", c.Repo, c.HandlerName)),
		}
	}
	if !c.ImportsSchemas {
		return consumerAssessment{
			Status: auditStatusFalse,
			Notes:  append(notes, fmt.Sprintf("%s handler %s does not import github.com/meshery/schemas/models", c.Repo, describeHandler(*c))),
		}
	}

	// For methods that carry no body by HTTP semantics (DELETE, HEAD),
	// having no request or response shape in the spec is correct by design.
	// The handler conforms by definition — return TRUE rather than Not Audited.
	// For other methods (POST, PUT, PATCH, GET), absent shapes indicate an
	// incomplete schema; those stay Not Audited so the gap is visible.
	if requestShape == nil && responseShape == nil && bodylessMethod(c.Method) {
		return consumerAssessment{
			Status: auditStatusTrue,
			Notes:  uniqueStrings(notes),
		}
	}

	// Query param comparison — advisory notes only, does not affect status.
	for _, qpNote := range assessQueryParams(specQueryParams, c.QueryParams) {
		notes = append(notes, fmt.Sprintf("%s: %s", c.Repo, qpNote))
	}

	reqAssessment := verifyShapeDetailed(requestShape, c.RequestType, true)
	respAssessment := verifyShapeDetailed(responseShape, c.ResponseType, false)
	assessments := []shapeAssessment{reqAssessment, respAssessment}

	var hadComparable, sawDiff, sawUnverified bool
	var drift []string
	// Iterate in a fixed order (request, then response) so Notes/Drift
	// output is deterministic across runs and reconciliation stays stable.
	sides := []struct {
		name       string
		assessment shapeAssessment
	}{
		{"request", reqAssessment},
		{"response", respAssessment},
	}
	for _, entry := range sides {
		side := entry.name
		assessment := entry.assessment
		if assessment.status == 0 && len(assessment.diffs) == 0 && assessment.reason == "" {
			continue
		}
		hadComparable = true
		switch assessment.status {
		case shapeDiff:
			sawDiff = true
			for _, msg := range assessment.drift {
				drift = append(drift, fmt.Sprintf("%s %s", c.Repo, msg))
			}
			drift = append(drift, formatFieldDiffs(c.Repo, side, assessment.diffs)...)
		case shapeUnverified:
			sawUnverified = true
			if assessment.reason != "" {
				notes = append(notes, fmt.Sprintf("%s: %s", c.Repo, assessment.reason))
			}
		}
	}

	if !hadComparable {
		return consumerAssessment{
			Status: auditStatusNotAudited,
			Notes:  append(notes, fmt.Sprintf("%s handler %s had no comparable request or response schema", c.Repo, describeHandler(*c))),
		}
	}
	if sawUnverified {
		return consumerAssessment{
			Status: auditStatusNotAudited,
			Drift:  uniqueStrings(drift),
			Notes:  uniqueStrings(notes),
		}
	}
	if sawDiff {
		return consumerAssessment{
			Status: auditStatusFalse,
			Drift:  uniqueStrings(drift),
			Notes:  uniqueStrings(notes),
		}
	}

	for _, assessment := range assessments {
		if assessment.status == shapeOK {
			return consumerAssessment{
				Status: auditStatusTrue,
				Notes:  uniqueStrings(notes),
			}
		}
	}

	return consumerAssessment{
		Status: auditStatusNotAudited,
		Notes:  append(uniqueStrings(notes), fmt.Sprintf("%s handler %s could not be compared", c.Repo, describeHandler(*c))),
	}
}

// diffFields compares a schema shape against a Go type's field set. When
// requestSide is true, server-generated fields like id/created_at are
// allowed to be missing from the consumer struct.
func diffFields(shape *schemaShape, info *goTypeInfo, requestSide bool) []fieldDiff {
	if shape == nil || info == nil {
		return nil
	}
	var diffs []fieldDiff
	for name, fs := range shape.Fields {
		if requestSide && (serverGeneratedFields[name] || dbMirroredFields[name]) {
			continue
		}
		consumerType, ok := info.Fields[name]
		if !ok {
			diffs = append(diffs, fieldDiff{
				FieldName:  name,
				InSchema:   true,
				InConsumer: false,
				SchemaType: fs.Type,
			})
			continue
		}
		if !typesCompatible(fs.Type, consumerType) {
			diffs = append(diffs, fieldDiff{
				FieldName:    name,
				InSchema:     true,
				InConsumer:   true,
				SchemaType:   fs.Type,
				ConsumerType: consumerType,
			})
		}
	}
	for name, ct := range info.Fields {
		if _, ok := shape.Fields[name]; ok {
			continue
		}
		if requestSide && (serverGeneratedFields[name] || dbMirroredFields[name]) {
			continue
		}
		diffs = append(diffs, fieldDiff{
			FieldName:    name,
			InSchema:     false,
			InConsumer:   true,
			ConsumerType: ct,
		})
	}
	return diffs
}

func formatFieldDiffs(repo, side string, diffs []fieldDiff) []string {
	out := make([]string, 0, len(diffs))
	for _, diff := range diffs {
		switch {
		case diff.InSchema && !diff.InConsumer:
			out = append(out, fmt.Sprintf("%s %s missing field %q (%s)", repo, side, diff.FieldName, diff.SchemaType))
		case !diff.InSchema && diff.InConsumer:
			out = append(out, fmt.Sprintf("%s %s has extra field %q (%s)", repo, side, diff.FieldName, diff.ConsumerType))
		default:
			out = append(out, fmt.Sprintf("%s %s field %q type mismatch (schema %s, consumer %s)", repo, side, diff.FieldName, diff.SchemaType, diff.ConsumerType))
		}
	}
	return out
}

func describeHandler(c consumerEndpoint) string {
	if c.HandlerFile == "" {
		return c.HandlerName
	}
	return fmt.Sprintf("%s (%s)", c.HandlerName, c.HandlerFile)
}

// typesCompatible relaxes the comparison between OpenAPI scalar names and Go
// type names ("integer" ↔ "int", "boolean" ↔ "bool", etc.).
func typesCompatible(openapiType, goType string) bool {
	if openapiType == "" || goType == "" {
		return true
	}
	openapiType = strings.ToLower(openapiType)
	goType = strings.ToLower(strings.TrimPrefix(goType, "*"))
	switch openapiType {
	case "string":
		return strings.Contains(goType, "string") || strings.Contains(goType, "uuid") ||
			strings.Contains(goType, "time") || strings.Contains(goType, "byte")
	case "integer":
		return strings.HasPrefix(goType, "int") || strings.HasPrefix(goType, "uint")
	case "number":
		return strings.HasPrefix(goType, "float") || strings.HasPrefix(goType, "int")
	case "boolean":
		return goType == "bool"
	case "array":
		return strings.HasPrefix(goType, "[]")
	case "object":
		return strings.Contains(goType, "map") || strings.Contains(goType, "struct") || !isPrimitive(goType)
	}
	return openapiType == goType
}

// bodylessMethod returns true for HTTP methods that carry no body by
// semantics. A DELETE or HEAD endpoint with no request/response shape in the
// spec is correct by design and should be reported as TRUE, not Not Audited.
func bodylessMethod(method string) bool {
	switch strings.ToUpper(method) {
	case "DELETE", "HEAD":
		return true
	}
	return false
}

func isPrimitive(goType string) bool {
	switch goType {
	case "string", "bool", "byte", "rune",
		"int", "int8", "int16", "int32", "int64",
		"uint", "uint8", "uint16", "uint32", "uint64",
		"float32", "float64":
		return true
	}
	return false
}

func schemaTypeMatches(shape *schemaShape, info *goTypeInfo) bool {
	if shape == nil || info == nil {
		return false
	}
	actualArrayDepth, actualBase := normalizeTypeIdentity(info.TypeName)
	if actualBase == "" {
		return false
	}
	for _, candidate := range schemaTypeCandidates(shape) {
		candidateArrayDepth, candidateBase := normalizeTypeIdentity(candidate)
		if candidateBase == "" {
			continue
		}
		if candidateArrayDepth == actualArrayDepth && candidateBase == actualBase {
			return true
		}
	}
	return false
}

func schemaTypeCandidates(shape *schemaShape) []string {
	if shape == nil {
		return nil
	}
	var out []string
	for _, candidate := range []string{shape.Name, shape.GoType} {
		candidate = strings.TrimSpace(candidate)
		if candidate == "" {
			continue
		}
		out = append(out, candidate)
	}
	return uniqueStrings(out)
}

func formatSchemaTypeCandidates(candidates []string) string {
	switch len(candidates) {
	case 0:
		return "an unknown schema type"
	case 1:
		return fmt.Sprintf("%q", candidates[0])
	default:
		quoted := make([]string, 0, len(candidates))
		for _, candidate := range candidates {
			quoted = append(quoted, fmt.Sprintf("%q", candidate))
		}
		return strings.Join(quoted, " or ")
	}
}

func normalizeTypeIdentity(typeName string) (arrayDepth int, base string) {
	s := strings.TrimSpace(typeName)
	for strings.HasPrefix(s, "[]") {
		arrayDepth++
		s = strings.TrimPrefix(s, "[]")
	}
	s = strings.TrimLeft(s, "*")
	s = strings.TrimSpace(s)
	if i := strings.LastIndex(s, "."); i >= 0 {
		s = s[i+1:]
	}
	return arrayDepth, s
}
