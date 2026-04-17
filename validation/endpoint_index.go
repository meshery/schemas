package validation

import (
	"fmt"
	"sort"
	"strings"

	"github.com/getkin/kin-openapi/openapi3"
)

// schemaEndpoint represents one endpoint defined in a construct's api.yml.
// One entry per (method, path) — never collapsed across verbs.
type schemaEndpoint struct {
	Method        string       // "GET", "POST", etc. — one per entry
	Path          string       // "/api/integrations/connections/{connectionId}"
	OperationID   string       // "getConnection"
	Tags          []string     // operation tags -> derive Category / Sub-Category
	XInternal     []string     // ["meshery"], ["cloud"], or nil (= both repos)
	RequestShape  *schemaShape // nil for GET/DELETE without body
	ResponseShape *schemaShape // from primary 2xx response
	Deprecated    bool         // operation-level OR construct-level
	Public        bool         // true if explicitly security: []
	HasSuccessRef bool         // true if a 2xx response has a $ref schema
	Has2xx        bool         // true if there is a 2xx response at all
	RequestBody   bool               // true if the operation declares a requestBody
	QueryParams   []schemaQueryParam // query parameters declared on the operation
	Construct     string             // "connection" — from extractConstructName
	Version       string       // "v1beta1"
	SourceFile    string       // "schemas/constructs/v1beta1/connection/api.yml"
}

// schemaQueryParam describes one query parameter declared in an OpenAPI spec.
type schemaQueryParam struct {
	Name     string
	Required bool
}

// schemaShape is a structural summary of a schema component.
// Fields are fully resolved ($refs followed) at index-build time.
type schemaShape struct {
	Name   string                // "ConnectionPayload"
	Fields map[string]fieldShape // keyed by JSON wire name
	GoType string                // from x-go-type annotation, if present
}

// fieldShape describes one field in a schema.
type fieldShape struct {
	Name      string // JSON wire name
	Type      string // "string", "integer", "object", "array", etc.
	Format    string // "uuid", "date-time", etc.
	Required  bool
	RefTarget string // if originally a $ref, what it resolved to
}

// schemaIndex holds all endpoints from a schemas repo walk.
type schemaIndex struct {
	Endpoints []schemaEndpoint // sorted by (Path, Method)
}

// buildEndpointIndex walks the meshery/schemas constructs tree and produces
// a deterministic index of every API endpoint defined across api.yml files.
// It delegates to walkValidatedConstructSpecs, which is the single canonical
// walker shared with the schema validator.
func buildEndpointIndex(rootDir string) (*schemaIndex, error) {
	index := &schemaIndex{}
	if err := walkValidatedConstructSpecs(rootDir, func(spec constructSpec) error {
		if !spec.APIExists {
			return nil
		}
		if spec.LoadErr != nil {
			return nil // skip specs that fail to load; schema validator reports the violation
		}
		doc := spec.Doc
		if doc == nil || doc.Paths == nil {
			return nil
		}
		for path, pathItem := range doc.Paths.Map() {
			if pathItem == nil {
				continue
			}
			for _, method := range httpMethods {
				op := getOperation(pathItem, method)
				if op == nil {
					continue
				}

				xInternal, err := parseXInternal(op.Extensions)
				if err != nil {
					return err
				}

				ep := schemaEndpoint{
					Method:      strings.ToUpper(method),
					Path:        path,
					OperationID: op.OperationID,
					Tags:        append([]string(nil), op.Tags...),
					XInternal:   xInternal,
					Deprecated:  op.Deprecated,
					Public:      isExplicitlyPublic(op, doc),
					Construct:   spec.Construct,
					Version:     spec.Version,
					SourceFile:  spec.RelativePath,
				}

				if op.RequestBody != nil && op.RequestBody.Value != nil {
					ep.RequestBody = true
					for _, media := range op.RequestBody.Value.Content {
						if media != nil && media.Schema != nil {
							ep.RequestShape = buildSchemaShape(media.Schema)
							break
						}
					}
				}

				ep.ResponseShape, ep.HasSuccessRef, ep.Has2xx = pickResponseShape(op)
				ep.QueryParams = mergeQueryParams(pathItem.Parameters, op.Parameters)

				index.Endpoints = append(index.Endpoints, ep)
			}
		}
		return nil
	}); err != nil {
		return nil, err
	}

	sort.Slice(index.Endpoints, func(i, j int) bool {
		if index.Endpoints[i].Path != index.Endpoints[j].Path {
			return index.Endpoints[i].Path < index.Endpoints[j].Path
		}
		return index.Endpoints[i].Method < index.Endpoints[j].Method
	})

	return index, nil
}

// mergeQueryParams collects query parameters from path-level and
// operation-level parameter lists. Operation-level parameters override
// path-level parameters with the same name, per the OpenAPI 3 spec.
func mergeQueryParams(pathLevel, opLevel openapi3.Parameters) []schemaQueryParam {
	// Use a map to deduplicate by name, with op-level winning.
	byName := make(map[string]schemaQueryParam)
	for _, ref := range pathLevel {
		if ref == nil || ref.Value == nil || ref.Value.In != openapi3.ParameterInQuery {
			continue
		}
		p := ref.Value
		byName[p.Name] = schemaQueryParam{Name: p.Name, Required: p.Required}
	}
	for _, ref := range opLevel {
		if ref == nil || ref.Value == nil || ref.Value.In != openapi3.ParameterInQuery {
			continue
		}
		p := ref.Value
		byName[p.Name] = schemaQueryParam{Name: p.Name, Required: p.Required}
	}
	if len(byName) == 0 {
		return nil
	}
	out := make([]schemaQueryParam, 0, len(byName))
	for _, qp := range byName {
		out = append(out, qp)
	}
	sort.Slice(out, func(i, j int) bool { return out[i].Name < out[j].Name })
	return out
}

// parseXInternal extracts x-internal target list from operation extensions.
// Returns nil if not present (= the endpoint applies to all consumer repos).
func parseXInternal(extensions map[string]any) ([]string, error) {
	if extensions == nil {
		return nil, nil
	}
	raw, ok := extensions["x-internal"]
	if !ok {
		return nil, nil
	}
	return parseXInternalTargets(raw)
}

func parseXInternalTargets(raw any) ([]string, error) {
	switch v := raw.(type) {
	case nil:
		return nil, nil
	case []any:
		out := make([]string, 0, len(v))
		for _, item := range v {
			s, ok := item.(string)
			if !ok {
				return nil, fmt.Errorf("x-internal array values must be strings")
			}
			if !validInternalTags[s] {
				return nil, fmt.Errorf(`x-internal value %q is invalid`, s)
			}
			out = append(out, s)
		}
		if len(out) == 0 {
			return nil, nil
		}
		return out, nil
	case []string:
		out := make([]string, 0, len(v))
		for _, item := range v {
			if !validInternalTags[item] {
				return nil, fmt.Errorf(`x-internal value %q is invalid`, item)
			}
			out = append(out, item)
		}
		if len(out) == 0 {
			return nil, nil
		}
		return out, nil
	default:
		return nil, fmt.Errorf("x-internal must be an array")
	}
}

// pickResponseShape selects the primary 2xx response and converts it to a
// schemaShape. Returns the shape (nil if none), whether the 2xx had a $ref
// schema, and whether any 2xx response existed.
func pickResponseShape(op *openapi3.Operation) (*schemaShape, bool, bool) {
	codes := collectResponseCodes(op)
	has2xx := false
	for code := range codes {
		if len(code) > 0 && code[0] == '2' {
			has2xx = true
			break
		}
	}
	if op.Responses == nil {
		return nil, false, has2xx
	}

	// Prefer 200, then 201, then 202, 204, then any 2xx in sorted order.
	preferred := []string{"200", "201", "202", "204"}
	var resp *openapi3.ResponseRef
	for _, code := range preferred {
		if r := op.Responses.Value(code); r != nil {
			resp = r
			break
		}
	}
	if resp == nil {
		var twoXX []string
		for code := range op.Responses.Map() {
			if len(code) > 0 && code[0] == '2' {
				twoXX = append(twoXX, code)
			}
		}
		sort.Strings(twoXX)
		if len(twoXX) > 0 {
			resp = op.Responses.Value(twoXX[0])
		}
	}
	if resp == nil || resp.Value == nil {
		return nil, false, has2xx
	}

	for _, media := range resp.Value.Content {
		if media == nil || media.Schema == nil {
			continue
		}
		shape := buildSchemaShape(media.Schema)
		hasRef := media.Schema.Ref != ""
		if !hasRef && media.Schema.Value != nil && media.Schema.Value.Items != nil &&
			media.Schema.Value.Items.Ref != "" {
			hasRef = true
		}
		return shape, hasRef, has2xx
	}
	return nil, false, has2xx
}

// buildSchemaShape resolves a schema reference into a structural fingerprint.
// $ref targets are followed; arrays are described by their item shape's name.
func buildSchemaShape(ref *openapi3.SchemaRef) *schemaShape {
	if ref == nil {
		return nil
	}
	shape := &schemaShape{Fields: map[string]fieldShape{}}

	if ref.Ref != "" {
		shape.Name = refTail(ref.Ref)
	}

	schema := ref.Value
	if schema == nil {
		return shape
	}

	if shape.Name == "" {
		if schema.Title != "" {
			shape.Name = schema.Title
		}
	}
	if raw, ok := schema.Extensions["x-go-type"]; ok {
		if s, ok := raw.(string); ok {
			shape.GoType = s
		}
	}

	// Array schema: describe via items.
	if schema.Type != nil && schema.Type.Is("array") {
		if schema.Items != nil {
			inner := buildSchemaShape(schema.Items)
			if inner != nil {
				shape.Fields = inner.Fields
				if shape.Name == "" {
					shape.Name = "[]" + inner.Name
				}
			}
		}
		return shape
	}

	requiredSet := make(map[string]bool, len(schema.Required))
	for _, name := range schema.Required {
		requiredSet[name] = true
	}

	for name, propRef := range schema.Properties {
		fs := fieldShape{
			Name:     name,
			Required: requiredSet[name],
		}
		if propRef != nil && propRef.Ref != "" {
			fs.RefTarget = refTail(propRef.Ref)
		}
		if propRef != nil && propRef.Value != nil {
			pv := propRef.Value
			if pv.Type != nil && len(pv.Type.Slice()) > 0 {
				fs.Type = pv.Type.Slice()[0]
			}
			fs.Format = pv.Format
			if fs.Type == "array" && pv.Items != nil {
				if pv.Items.Ref != "" {
					fs.RefTarget = refTail(pv.Items.Ref)
				} else if pv.Items.Value != nil && pv.Items.Value.Type != nil && len(pv.Items.Value.Type.Slice()) > 0 {
					fs.RefTarget = pv.Items.Value.Type.Slice()[0]
				}
			}
		}
		shape.Fields[name] = fs
	}

	return shape
}
