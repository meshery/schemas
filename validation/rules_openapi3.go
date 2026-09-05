package validation

import (
	"fmt"
	"sort"
	"strings"

	"github.com/getkin/kin-openapi/openapi3"
)

// Rules 42-44: OpenAPI 3 conformance and request-body content-type parity.
//
// These rules catch schema shapes that look syntactically valid in an
// `api.yml` but silently produce broken generated clients — the class of
// bug where the spec, the server handler, and the generated RTK/Go client
// all disagree.
//
// Canonical example: meshery/schemas#771 — /api/pattern/import declared
// multipart/form-data with a camelCase `fileName` and `format: file`, but
// the Meshery server handler decoded the body as application/json with a
// snake_case `file_name` Go struct tag. Clients generated from the spec
// sent requests the server rejected with 400 "Unable to parse request body".

// --- Rule 42: `format: file` is a Swagger 2.0 relic invalid in OpenAPI 3 ---
//
// OpenAPI 3 uses `type: string` with either `format: binary` (raw bytes,
// valid only inside multipart/form-data) or `format: byte` (base64-encoded
// bytes, valid in any content-type including application/json). A literal
// `format: file` is a Swagger 2.0 concept that codegen tooling silently
// accepts but produces inconsistent outputs: oapi-codegen emits `*string`,
// not `*[]byte`, so the server side cannot unmarshal a binary payload.
func checkRule42(filePath string, doc *openapi3.T, opts AuditOptions) []Violation {
	if doc == nil || doc.Components == nil || doc.Components.Schemas == nil {
		return nil
	}
	sev := classifyDesignIssue(opts)
	var out []Violation
	onPath := map[*openapi3.Schema]bool{}
	for name, ref := range doc.Components.Schemas {
		if ref == nil || ref.Value == nil {
			continue
		}
		visitFormatFile(ref.Value, fmt.Sprintf("Schema %q", name), filePath, sev, &out, onPath)
	}
	return out
}

// visitFormatFile recursively descends a schema, reporting any property
// that declares `format: file`. The path argument is a human-readable
// breadcrumb (e.g., `Schema "Foo".bar.items`) so the violation message
// points the author at the exact offender.
//
// onPath holds the schemas currently on the recursion stack. Resolved
// OpenAPI schemas form a graph, not a tree: a cyclic $ref (e.g. a model that
// references components that reference the model) yields a pointer cycle, so
// without this guard the descent recurses until the stack is exhausted. We
// skip a schema only when it is its own ancestor, which breaks cycles while
// preserving identical traversal of acyclic shapes reached via multiple paths.
func visitFormatFile(schema *openapi3.Schema, path, filePath string, sev Severity, out *[]Violation, onPath map[*openapi3.Schema]bool) {
	if schema == nil || onPath[schema] {
		return
	}
	onPath[schema] = true
	defer delete(onPath, schema)
	if schema.Format == "file" {
		*out = append(*out, Violation{
			File: filePath,
			Message: fmt.Sprintf(
				`%s — property uses `+"`format: file`"+`, a Swagger 2.0 relic invalid in OpenAPI 3. `+
					`For multipart/form-data uploads use `+"`type: string, format: binary`"+`. `+
					`For base64-encoded bytes embedded in application/json, use `+"`type: string, format: byte`"+` (consumers generate *[]byte).`,
				path),
			Severity:   sev,
			RuleNumber: 42,
		})
	}
	for propName, propRef := range schema.Properties {
		if propRef != nil && propRef.Value != nil {
			visitFormatFile(propRef.Value, fmt.Sprintf("%s.%s", path, propName), filePath, sev, out, onPath)
		}
	}
	if schema.Items != nil && schema.Items.Value != nil {
		visitFormatFile(schema.Items.Value, path+".items", filePath, sev, out, onPath)
	}
	for _, combiner := range []struct {
		name string
		refs openapi3.SchemaRefs
	}{{"allOf", schema.AllOf}, {"oneOf", schema.OneOf}, {"anyOf", schema.AnyOf}} {
		for i, ref := range combiner.refs {
			if ref != nil && ref.Value != nil {
				visitFormatFile(ref.Value, fmt.Sprintf("%s.%s[%d]", path, combiner.name, i), filePath, sev, out, onPath)
			}
		}
	}
}

// --- Rule 43: `enum` on `type: object` with `properties` is meaningless ---
//
// A JSON object cannot equal a string; declaring `enum: [foo, bar]` on an
// object-typed schema with a `properties` block is silently ignored by
// validators but signals a failed attempt at discriminated union. The
// author almost always meant `oneOf` with a `discriminator` or a plain
// enum on a nested property.
func checkRule43(filePath string, doc *openapi3.T, opts AuditOptions) []Violation {
	if doc == nil || doc.Components == nil || doc.Components.Schemas == nil {
		return nil
	}
	sev := classifyDesignIssue(opts)
	var out []Violation
	for name, ref := range doc.Components.Schemas {
		if ref == nil || ref.Value == nil {
			continue
		}
		s := ref.Value
		hasObjectType := s.Type != nil && s.Type.Is("object")
		if hasObjectType && len(s.Properties) > 0 && len(s.Enum) > 0 {
			out = append(out, Violation{
				File: filePath,
				Message: fmt.Sprintf(
					`Schema %q — declares `+"`enum`"+` on a `+"`type: object`"+` schema with `+"`properties`"+`. `+
						`An object cannot equal a scalar value; the enum is silently ignored. `+
						`Use `+"`oneOf`"+` with a `+"`discriminator`"+` if the schema represents a tagged union, `+
						`or move the enum onto the specific property it constrains.`,
					name),
				Severity:   sev,
				RuleNumber: 43,
			})
		}
	}
	return out
}

// --- Rule 44: Request body `multipart/form-data` vs JSON-Bind handler drift ---
//
// The spec declares the wire format; the Go server handler decides how to
// decode it. If a request body is declared as `multipart/form-data`, the
// handler must call `r.ParseMultipartForm` / `r.FormFile`. If it's declared
// as `application/json`, the handler must call one of `json.NewDecoder`,
// `json.Unmarshal`, or Echo's `c.Bind`.
//
// Schema-only check (the static validator doesn't see Go handlers): flag
// request bodies that declare ONLY `multipart/form-data` whose schema has
// no `format: binary` property. In practice this is a drift smell — a
// multipart request that has no binary payload is almost always a spec
// error for what is actually a JSON request. The consumer-audit tool
// cross-checks against the real handler for the definitive verdict.
func checkRule44(filePath string, doc *openapi3.T, opts AuditOptions) []Violation {
	if doc == nil || doc.Paths == nil {
		return nil
	}
	sev := classifyDesignIssue(opts)
	var out []Violation
	for path, item := range doc.Paths.Map() {
		for _, pair := range []struct {
			method string
			op     *openapi3.Operation
		}{{"POST", item.Post}, {"PUT", item.Put}, {"PATCH", item.Patch}} {
			if pair.op == nil || pair.op.RequestBody == nil || pair.op.RequestBody.Value == nil {
				continue
			}
			content := pair.op.RequestBody.Value.Content
			if len(content) != 1 {
				continue
			}
			media, ok := content["multipart/form-data"]
			if !ok || media.Schema == nil || media.Schema.Value == nil {
				continue
			}
			if !schemaHasBinaryProperty(media.Schema.Value) {
				out = append(out, Violation{
					File: filePath,
					Message: fmt.Sprintf(
						`%s %s — declares `+"`multipart/form-data`"+` but the request schema has no `+"`format: binary`"+` property. `+
							`A multipart request without a binary field is almost always a spec error for what is actually `+"`application/json`"+`. `+
							`Run `+"`go run ./cmd/consumer-audit`"+` to verify what the handler actually decodes.`,
						pair.method, path),
					Severity:   sev,
					RuleNumber: 44,
				})
			}
		}
	}
	return out
}

// schemaHasBinaryProperty reports whether a schema (or one of its
// properties, recursively through allOf/oneOf/anyOf) contains at least one
// `format: binary` field. $ref values are resolved by kin-openapi so we
// only walk the resolved .Value trees.
func schemaHasBinaryProperty(s *openapi3.Schema) bool {
	if s == nil {
		return false
	}
	if strings.EqualFold(s.Format, "binary") {
		return true
	}
	for _, propRef := range s.Properties {
		if propRef != nil && propRef.Value != nil && schemaHasBinaryProperty(propRef.Value) {
			return true
		}
	}
	for _, combined := range [...]openapi3.SchemaRefs{s.AllOf, s.OneOf, s.AnyOf} {
		for _, ref := range combined {
			if ref != nil && ref.Value != nil && schemaHasBinaryProperty(ref.Value) {
				return true
			}
		}
	}
	return false
}

// --- Rule 48: Detect placeholder schemas using `type: object + additionalProperties: true` without properties or free-form description ---

type placeholderSchemaContext int

const (
	contextComponent placeholderSchemaContext = iota
	contextRequestBody
	contextResponse
	contextArrayItems
	contextProperty
)

var freeFormKeywords = []string{
	"free-form", "freeform", "arbitrary", "opaque", "key-value",
	"metadata", "dictionary", "map", "json", "jsonb", "serializer",
}

var reservedMapPropNames = map[string]bool{
	"metadata":       true,
	"configuration":  true,
	"secret":         true,
	"selectors":      true,
	"traits":         true,
	"settings":       true,
	"labels":         true,
	"annotations":    true,
	"preferences":    true,
	"custom_headers": true,
}

func hasFreeFormIntentDescription(desc string) bool {
	if desc == "" {
		return false
	}
	lower := strings.ToLower(desc)
	for _, kw := range freeFormKeywords {
		if strings.Contains(lower, kw) {
			return true
		}
	}
	return false
}

func isReservedMapPropertyName(name string) bool {
	return reservedMapPropNames[strings.ToLower(name)]
}

func checkRule48(filePath string, doc *openapi3.T, opts AuditOptions) []Violation {
	if doc == nil {
		return nil
	}
	var out []Violation
	onPath := make(map[*openapi3.Schema]bool)
	visited := make(map[*openapi3.Schema]placeholderSchemaContext)

	// 1. Walk components/schemas
	if doc.Components != nil && doc.Components.Schemas != nil {
		schemaNames := make([]string, 0, len(doc.Components.Schemas))
		for name := range doc.Components.Schemas {
			schemaNames = append(schemaNames, name)
		}
		sort.Strings(schemaNames)
		for _, name := range schemaNames {
			ref := doc.Components.Schemas[name]
			if ref != nil && ref.Value != nil {
				walkPlaceholderSchemas(filePath, fmt.Sprintf("Schema %q", name), "", ref.Value, contextComponent, opts, &out, onPath, visited)
			}
		}
	}

	// 2. Walk operations in doc.Paths
	if doc.Paths != nil {
		paths := make([]string, 0, len(doc.Paths.Map()))
		pathsMap := doc.Paths.Map()
		for p := range pathsMap {
			paths = append(paths, p)
		}
		sort.Strings(paths)

		for _, path := range paths {
			item := pathsMap[path]
			if item == nil {
				continue
			}
			for _, method := range httpMethods {
				op := getOperation(item, method)
				if op == nil {
					continue
				}
				opLabel := fmt.Sprintf("%s %s", strings.ToUpper(method), path)

				// Walk RequestBody
				if op.RequestBody != nil && op.RequestBody.Value != nil {
					for contentType, media := range op.RequestBody.Value.Content {
						if media != nil && media.Schema != nil && media.Schema.Value != nil {
							label := fmt.Sprintf("%s requestBody (%s)", opLabel, contentType)
							walkPlaceholderSchemas(filePath, label, "", media.Schema.Value, contextRequestBody, opts, &out, onPath, visited)
						}
					}
				}

				// Walk Responses
				if op.Responses != nil {
					codes := make([]string, 0, len(op.Responses.Map()))
					respMap := op.Responses.Map()
					for code := range respMap {
						codes = append(codes, code)
					}
					sort.Strings(codes)
					for _, code := range codes {
						respRef := respMap[code]
						if respRef == nil || respRef.Value == nil {
							continue
						}
						for contentType, media := range respRef.Value.Content {
							if media != nil && media.Schema != nil && media.Schema.Value != nil {
								label := fmt.Sprintf("%s response %s (%s)", opLabel, code, contentType)
								walkPlaceholderSchemas(filePath, label, "", media.Schema.Value, contextResponse, opts, &out, onPath, visited)
							}
						}
					}
				}
			}
		}
	}

	return out
}

func walkPlaceholderSchemas(
	filePath, label, propName string,
	schema *openapi3.Schema,
	ctx placeholderSchemaContext,
	opts AuditOptions,
	out *[]Violation,
	onPath map[*openapi3.Schema]bool,
	visited map[*openapi3.Schema]placeholderSchemaContext,
) {
	if schema == nil || onPath[schema] {
		return
	}

	onPath[schema] = true
	defer delete(onPath, schema)

	isCandidate := schema.Type != nil && schema.Type.Is("object") &&
		schema.AdditionalProperties.Has != nil && *schema.AdditionalProperties.Has &&
		schema.AdditionalProperties.Schema == nil &&
		len(schema.Properties) == 0 &&
		!hasFreeFormIntentDescription(schema.Description) &&
		!isReservedMapPropertyName(propName)

	prevCtx, alreadyVisited := visited[schema]
	shouldReport := false
	if isCandidate {
		if !alreadyVisited {
			shouldReport = true
			visited[schema] = ctx
		} else if ctx == contextArrayItems && prevCtx != contextArrayItems {
			shouldReport = true
			visited[schema] = ctx
		}
	}

	if shouldReport {
		sev := SeverityAdvisory
		if ctx == contextArrayItems {
			sev = SeverityBlocking
		}

		msg := fmt.Sprintf(
			`%s — schema is a zero-property object with additionalProperties: true and no free-form description. `+
				`It appears to be an unmodeled placeholder schema missing a concrete $ref.`,
			label,
		)

		*out = append(*out, Violation{
			File:       filePath,
			Message:    msg,
			Severity:   sev,
			RuleNumber: 48,
		})
	}

	// Recurse into Properties
	if schema.Properties != nil {
		propNames := make([]string, 0, len(schema.Properties))
		for name := range schema.Properties {
			propNames = append(propNames, name)
		}
		sort.Strings(propNames)
		for _, name := range propNames {
			propRef := schema.Properties[name]
			if propRef != nil && propRef.Value != nil {
				subLabel := label + "." + name
				walkPlaceholderSchemas(filePath, subLabel, name, propRef.Value, contextProperty, opts, out, onPath, visited)
			}
		}
	}

	// Recurse into Items
	if schema.Items != nil && schema.Items.Value != nil {
		subLabel := label + ".items"
		walkPlaceholderSchemas(filePath, subLabel, "", schema.Items.Value, contextArrayItems, opts, out, onPath, visited)
	}

	// Recurse into Combiners
	for _, combiner := range []struct {
		name string
		refs openapi3.SchemaRefs
	}{
		{name: "allOf", refs: schema.AllOf},
		{name: "oneOf", refs: schema.OneOf},
		{name: "anyOf", refs: schema.AnyOf},
	} {
		for i, ref := range combiner.refs {
			if ref != nil && ref.Value != nil {
				subLabel := fmt.Sprintf("%s.%s[%d]", label, combiner.name, i)
				walkPlaceholderSchemas(filePath, subLabel, "", ref.Value, ctx, opts, out, onPath, visited)
			}
		}
	}

	// Recurse into AdditionalProperties.Schema (if typed additionalProperties)
	if schema.AdditionalProperties.Schema != nil && schema.AdditionalProperties.Schema.Value != nil {
		subLabel := label + ".additionalProperties"
		walkPlaceholderSchemas(filePath, subLabel, "", schema.AdditionalProperties.Schema.Value, contextProperty, opts, out, onPath, visited)
	}
}
