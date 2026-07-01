package validation

import (
	"fmt"
	"regexp"

	"github.com/getkin/kin-openapi/openapi3"
)

// --- Rule 32: DB-backed property names must match db tags (retired) ---

// Rule 32 is retired under the canonical identifier-naming contract.
//
// The pre-canonical rule required DB-backed property names to match their
// snake_case `db:` tag exactly. Under the new contract (see
// docs/identifier-naming-migration.md §1 and docs/casing-rules.md),
// the wire property name is camelCase and the snake_case DB
// column name lives only in `x-oapi-codegen-extra-tags.db` — so a
// property whose name differs from its `db:` tag is the *expected* shape
// for DB-backed fields, not a violation.
//
// The function is retained as a retired stub so that historical audit-
// pipeline callers remain linkable; it returns no violations. Retirement
// is documented in Phase 1.B of the identifier-naming migration plan.
func checkRule32ForAPI(_ string, _ *openapi3.T, _ AuditOptions) []Violation {
	return nil
}

// --- Rule 33: Pagination envelopes use canonical camelCase ---
//
// Under the canonical identifier-naming contract (see
// docs/identifier-naming-migration.md §1 and docs/casing-rules.md),
// pagination envelope properties are camelCase on the wire:
// page, pageSize, totalCount. The legacy snake_case forms (page_size,
// total_count) are still accepted inside existing API versions for
// backward compatibility, but newly authored / canonical-casing API
// versions must use the camelCase forms.
//
// This rule is non-blocking: it surfaces the legacy snake_case usage as
// advisory output so it can be tracked and resolved per-resource via
// the Phase 3 version-bump rollout. The camelCase forms are the
// canonical shape and are never flagged.
func checkRule33(filePath string, doc *openapi3.T, _ AuditOptions) []Violation {
	if doc == nil || doc.Components == nil || doc.Components.Schemas == nil {
		return nil
	}
	var out []Violation
	for name, ref := range doc.Components.Schemas {
		if ref == nil || ref.Value == nil || ref.Value.Properties == nil {
			continue
		}
		props := ref.Value.Properties
		_, hasPage := props["page"]
		_, hasPageSize := props["pageSize"]
		_, hasPageSizeSnake := props["page_size"]
		_, hasTotalCount := props["totalCount"]
		_, hasTotalCountSnake := props["total_count"]

		isPaginated := hasPage || hasPageSize || hasPageSizeSnake || hasTotalCount || hasTotalCountSnake

		if !isPaginated {
			continue
		}
		if hasPageSizeSnake {
			out = append(out, Violation{File: filePath,
				Message:  fmt.Sprintf(`Schema %q — pagination envelopes should use "pageSize" (canonical camelCase), not "page_size". (migrate at the resource's next API-version bump per docs/identifier-naming-migration.md §9)`, name),
				Severity: SeverityAdvisory, RuleNumber: 33})
		}
		if hasTotalCountSnake {
			out = append(out, Violation{File: filePath,
				Message:  fmt.Sprintf(`Schema %q — pagination envelopes should use "totalCount" (canonical camelCase), not "total_count". (migrate at the resource's next API-version bump per docs/identifier-naming-migration.md §9)`, name),
				Severity: SeverityAdvisory, RuleNumber: 33})
		}
	}
	return out
}

// --- Rules 36-41: Property constraint validation ---

var (
	idPropertyRE  = regexp.MustCompile(`(?:^id$|_id$|Id$|ID$)`)
	pageSizeNames = map[string]bool{"page_size": true, "pagesize": true, "pageSize": true}
)

func checkPropertyConstraints(filePath string, doc *openapi3.T, opts AuditOptions) []Violation {
	var out []Violation

	// Walk entity schema properties (standalone yaml).
	if doc == nil {
		return nil
	}

	// Walk components/schemas.
	if doc.Components != nil && doc.Components.Schemas != nil {
		for name, ref := range doc.Components.Schemas {
			if ref == nil || ref.Value == nil {
				continue
			}
			walkSchemaConstraints(filePath, name, ref.Value, opts, &out, map[*openapi3.Schema]bool{})
		}
	}

	return out
}

// onPath holds the schemas currently on the recursion stack so a cyclic $ref
// in the resolved schema graph terminates instead of recursing until the
// stack is exhausted. See visitFormatFile for the rationale.
func walkSchemaConstraints(filePath, scope string, schema *openapi3.Schema, opts AuditOptions, out *[]Violation, onPath map[*openapi3.Schema]bool) {
	if schema == nil || onPath[schema] {
		return
	}
	onPath[schema] = true
	defer delete(onPath, schema)
	if schema.Properties != nil {
		for propName, propRef := range schema.Properties {
			if propRef == nil || propRef.Value == nil {
				continue
			}
			p := propRef.Value
			fullScope := scope
			if fullScope != "" {
				fullScope += "."
			}
			fullScope += propName

			// Rule 37: description.
			if propRef.Ref == "" && p.Description == "" {
				*out = append(*out, Violation{File: filePath,
					Message:  fmt.Sprintf(`Schema %q — property %q is missing a description.`, scope, propName),
					Severity: classifyDesignIssue(opts), RuleNumber: 37})
			}

			// Rule 38: string constraints. A `const` value is inherently
			// constrained and does not need additional bounds.
			if p.Type != nil && p.Type.Is("string") && propRef.Ref == "" && len(p.Enum) == 0 {
				_, hasConst := p.Extensions["const"]
				hasConstraint := p.MinLength != 0 || p.MaxLength != nil ||
					p.Pattern != "" || p.Format != "" || hasConst
				if !hasConstraint {
					*out = append(*out, Violation{File: filePath,
						Message:  fmt.Sprintf(`Schema %q — string property %q has no validation constraint (minLength, maxLength, pattern, or format).`, scope, propName),
						Severity: classifyDesignIssue(opts), RuleNumber: 38})
				}
			}

			// Rule 39: numeric bounds. A `const` value is inherently bounded.
			if p.Type != nil && (p.Type.Is("integer") || p.Type.Is("number")) {
				_, hasConst := p.Extensions["const"]
				hasBound := p.Min != nil || p.Max != nil ||
					p.ExclusiveMin.IsTrue() || p.ExclusiveMin.Value != nil ||
					p.ExclusiveMax.IsTrue() || p.ExclusiveMax.Value != nil ||
					len(p.Enum) > 0 || hasConst
				if !hasBound {
					*out = append(*out, Violation{File: filePath,
						Message:  fmt.Sprintf(`Schema %q — %s property %q has no bounds (minimum/maximum).`, scope, p.Type.Slice()[0], propName),
						Severity: classifyDesignIssue(opts), RuleNumber: 39})
				}
			}

			// Rule 40: ID properties need format: uuid.
			if idPropertyRE.MatchString(propName) {
				if p.Type != nil && !p.Type.Is("string") {
					// Non-string ID — skip.
				} else if propRef.Ref != "" || p.Format == "uuid" {
					// Already has $ref or format: uuid — OK.
				} else if hasCompositionRef(p) {
					// Has $ref in allOf/anyOf/oneOf — OK.
				} else if ext, ok := p.Extensions["x-id-format"].(string); ok && ext == "external" {
					// Exempted external ID.
				} else {
					*out = append(*out, Violation{File: filePath,
						Message: fmt.Sprintf(`Schema %q — ID property %q should have format: uuid, use a $ref to a UUID schema, or add x-id-format: external.`,
							scope, propName),
						Severity: classifyDesignIssue(opts), RuleNumber: 40})
				}
			}

			// Rule 41: page-size minimum.
			if pageSizeNames[propName] && p.Type != nil && (p.Type.Is("integer") || p.Type.Is("number")) {
				if p.Min == nil || *p.Min < 1.0 {
					*out = append(*out, Violation{File: filePath,
						Message:  fmt.Sprintf(`Schema %q — page-size property %q must have minimum: 1.`, scope, propName),
						Severity: classifyDesignIssue(opts), RuleNumber: 41})
				}
			}

			// Recurse into nested properties.
			walkSchemaConstraints(filePath, fullScope, p, opts, out, onPath)
		}
	}

	// Recurse into combiners.
	for i, sub := range schema.AllOf {
		if sub != nil && sub.Value != nil {
			walkSchemaConstraints(filePath, fmt.Sprintf("%s.allOf[%d]", scope, i), sub.Value, opts, out, onPath)
		}
	}
	for i, sub := range schema.OneOf {
		if sub != nil && sub.Value != nil {
			walkSchemaConstraints(filePath, fmt.Sprintf("%s.oneOf[%d]", scope, i), sub.Value, opts, out, onPath)
		}
	}
	for i, sub := range schema.AnyOf {
		if sub != nil && sub.Value != nil {
			walkSchemaConstraints(filePath, fmt.Sprintf("%s.anyOf[%d]", scope, i), sub.Value, opts, out, onPath)
		}
	}
	if schema.Items != nil && schema.Items.Value != nil {
		walkSchemaConstraints(filePath, scope+".items", schema.Items.Value, opts, out, onPath)
	}
	// Recurse into additionalProperties schema (for map/object value types).
	if schema.AdditionalProperties.Schema != nil && schema.AdditionalProperties.Schema.Value != nil {
		walkSchemaConstraints(filePath, scope+".additionalProperties", schema.AdditionalProperties.Schema.Value, opts, out, onPath)
	}
}

func hasCompositionRef(s *openapi3.Schema) bool {
	for _, ref := range s.AllOf {
		if ref != nil && ref.Ref != "" {
			return true
		}
	}
	for _, ref := range s.AnyOf {
		if ref != nil && ref.Ref != "" {
			return true
		}
	}
	for _, ref := range s.OneOf {
		if ref != nil && ref.Ref != "" {
			return true
		}
	}
	return false
}
