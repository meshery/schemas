package validation

import (
	"fmt"
	"regexp"

	"github.com/getkin/kin-openapi/openapi3"
)

// --- Rule 32: DB-backed property names must match db tags ---

func checkRule32ForAPI(filePath string, doc *openapi3.T, _ AuditOptions) []Violation {
	if doc == nil || doc.Components == nil || doc.Components.Schemas == nil {
		return nil
	}
	var out []Violation
	for name, ref := range doc.Components.Schemas {
		if ref == nil || ref.Value == nil || ref.Value.Properties == nil {
			continue
		}
		for propName, propRef := range ref.Value.Properties {
			if propRef == nil || propRef.Value == nil {
				continue
			}
			dbTag := getExtensionDBTag(propRef)
			gormCol := getExtensionGormColumn(propRef)
			col := dbTag
			if col == "" {
				col = gormCol
			}
			if col == "" || !IsValidDBTag(col) || !HasUnderscore(col) {
				continue
			}
			if propName != col {
				jsonTag := getExtraTag(propRef.Value.Extensions, "json")
				if jsonTag != "" && jsonTag != "-" && jsonTag == col {
					continue // deliberate semantic alias
				}
				src := "db"
				if dbTag == "" {
					src = "gorm column"
				}
				out = append(out, Violation{File: filePath,
					Message: fmt.Sprintf(`Schema %q — property %q maps to database column %q (via %s tag). DB-backed property names must use the exact snake_case db name.`,
						name, propName, col, src),
					Severity: SeverityBlocking, RuleNumber: 32})
			}
		}
	}
	return out
}

// --- Rule 33: Pagination envelopes use page_size / total_count ---

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
		if hasPageSize {
			out = append(out, Violation{File: filePath,
				Message:  fmt.Sprintf(`Schema %q — pagination envelopes must use "page_size", not "pageSize".`, name),
				Severity: SeverityBlocking, RuleNumber: 33})
		}
		if hasTotalCount {
			out = append(out, Violation{File: filePath,
				Message:  fmt.Sprintf(`Schema %q — pagination envelopes must use "total_count", not "totalCount".`, name),
				Severity: SeverityBlocking, RuleNumber: 33})
		}
	}
	return out
}

// --- Rules 36-41: Property constraint validation ---

var (
	idPropertyRE = regexp.MustCompile(`(?:^id$|_id$|Id$|ID$)`)
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
			walkSchemaConstraints(filePath, name, ref.Value, opts, &out)
		}
	}

	return out
}

func walkSchemaConstraints(filePath, scope string, schema *openapi3.Schema, opts AuditOptions, out *[]Violation) {
	if schema == nil {
		return
	}
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
					p.ExclusiveMin || p.ExclusiveMax ||
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
			walkSchemaConstraints(filePath, fullScope, p, opts, out)
		}
	}

	// Recurse into combiners.
	for i, sub := range schema.AllOf {
		if sub != nil && sub.Value != nil {
			walkSchemaConstraints(filePath, fmt.Sprintf("%s.allOf[%d]", scope, i), sub.Value, opts, out)
		}
	}
	for i, sub := range schema.OneOf {
		if sub != nil && sub.Value != nil {
			walkSchemaConstraints(filePath, fmt.Sprintf("%s.oneOf[%d]", scope, i), sub.Value, opts, out)
		}
	}
	for i, sub := range schema.AnyOf {
		if sub != nil && sub.Value != nil {
			walkSchemaConstraints(filePath, fmt.Sprintf("%s.anyOf[%d]", scope, i), sub.Value, opts, out)
		}
	}
	if schema.Items != nil && schema.Items.Value != nil {
		walkSchemaConstraints(filePath, scope+".items", schema.Items.Value, opts, out)
	}
	// Recurse into additionalProperties schema (for map/object value types).
	if schema.AdditionalProperties.Schema != nil && schema.AdditionalProperties.Schema.Value != nil {
		walkSchemaConstraints(filePath, scope+".additionalProperties", schema.AdditionalProperties.Schema.Value, opts, out)
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
