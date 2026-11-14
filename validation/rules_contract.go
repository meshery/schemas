package validation

import (
	"fmt"
	"path/filepath"
	"sort"
	"strings"

	"github.com/getkin/kin-openapi/openapi3"
)

// Rule 29: Detect duplicate schemas across constructs.
//
// Collects schema fingerprints across all constructs and flags duplicates
// that should use cross-construct $ref instead.

// schemaLocation records where a schema was found.
type schemaLocation struct {
	File       string
	SchemaName string
}

// collectSchemaFingerprints computes structural fingerprints for all schemas
// in a document and adds them to the accumulator.
func collectSchemaFingerprints(filePath string, doc *openapi3.T, fingerprints map[string][]schemaLocation) {
	if doc == nil || doc.Components == nil || doc.Components.Schemas == nil {
		return
	}

	for schemaName, schemaRef := range doc.Components.Schemas {
		if schemaRef == nil || schemaRef.Value == nil {
			continue
		}
		fp := fingerprintSchema(schemaRef.Value)
		if fp == "" {
			continue
		}
		fingerprints[fp] = append(fingerprints[fp], schemaLocation{
			File:       filePath,
			SchemaName: schemaName,
		})
	}
}

// fingerprintSchema creates a deterministic fingerprint based on property
// names, types, full $ref paths, the sorted required array, and constraint
// presence. Schemas with fewer than 3 properties are skipped.
//
// The fingerprint deliberately encodes constraint *presence* (has minLength
// vs does not), not constraint values: two schemas that differ only in a
// limit value are still structural duplicates worth flagging, while schemas
// that differ in shape-affecting facts (different $ref targets, different
// required sets, different applicable constraints) must not collide.
// Descriptions are intentionally excluded: identical structures with
// different prose are still duplicates for cross-construct $ref purposes.
func fingerprintSchema(schema *openapi3.Schema) string {
	if schema == nil || schema.Properties == nil {
		return ""
	}

	propKeys := make([]string, 0, len(schema.Properties))
	for k := range schema.Properties {
		propKeys = append(propKeys, k)
	}
	sort.Strings(propKeys)

	if len(propKeys) < 3 {
		return ""
	}

	parts := make([]string, 0, len(propKeys)+1)
	for _, k := range propKeys {
		parts = append(parts, fingerprintProperty(k, schema.Properties[k]))
	}

	// Required array, sorted, so required-set differences change the
	// fingerprint while required ordering does not.
	required := append([]string(nil), schema.Required...)
	sort.Strings(required)
	parts = append(parts, "required:"+strings.Join(required, ","))

	return strings.Join(parts, "|")
}

// fingerprintProperty renders one property's contribution to a schema
// fingerprint: its name, its type (or the full $ref path when it is a
// reference), and the constraint-presence flags that apply to it.
func fingerprintProperty(name string, propRef *openapi3.SchemaRef) string {
	if propRef == nil || propRef.Value == nil {
		return name + ":unknown"
	}
	p := propRef.Value

	// Full $ref path, not just the trailing schema name: two properties
	// referencing different documents' "User" are not the same shape.
	if propRef.Ref != "" {
		return fmt.Sprintf("%s:$ref:%s", name, propRef.Ref)
	}

	var sb strings.Builder
	sb.WriteString(name)
	if p.Type != nil && p.Type.Is("array") {
		sb.WriteString(":array")
		if p.Items != nil && p.Items.Ref != "" {
			sb.WriteString(":$ref:" + p.Items.Ref)
		} else if p.Items != nil && p.Items.Value != nil && p.Items.Value.Type != nil {
			sb.WriteString(":" + p.Items.Value.Type.Slice()[0])
		} else {
			sb.WriteString(":unknown")
		}
	} else if p.Type != nil {
		sb.WriteString(":" + p.Type.Slice()[0])
	} else {
		sb.WriteString(":unknown")
	}
	if flags := constraintPresenceFlags(p); flags != "" {
		sb.WriteString("{" + flags + "}")
	}
	return sb.String()
}

// constraintPresenceFlags lists, in sorted order, the validation constraints
// present on a property schema. Presence (not values) keeps near-identical
// shapes fingerprinted together while distinguishing genuinely different
// contracts (e.g. a free-form string vs one with minLength/pattern).
func constraintPresenceFlags(p *openapi3.Schema) string {
	var flags []string
	if p.MinLength != 0 {
		flags = append(flags, "minLength")
	}
	if p.MaxLength != nil {
		flags = append(flags, "maxLength")
	}
	if p.Pattern != "" {
		flags = append(flags, "pattern")
	}
	if p.Format != "" {
		flags = append(flags, "format")
	}
	if len(p.Enum) > 0 {
		flags = append(flags, "enum")
	}
	if p.Min != nil {
		flags = append(flags, "minimum")
	}
	if p.Max != nil {
		flags = append(flags, "maximum")
	}
	if p.ExclusiveMin.IsSet() {
		flags = append(flags, "exclusiveMinimum")
	}
	if p.ExclusiveMax.IsSet() {
		flags = append(flags, "exclusiveMaximum")
	}
	if p.MultipleOf != nil {
		flags = append(flags, "multipleOf")
	}
	if p.MinItems != 0 {
		flags = append(flags, "minItems")
	}
	if p.MaxItems != nil {
		flags = append(flags, "maxItems")
	}
	if p.UniqueItems {
		flags = append(flags, "uniqueItems")
	}
	sort.Strings(flags)
	return strings.Join(flags, ",")
}

// extractConstructName extracts the construct name from a file path.
// e.g., "schemas/constructs/v1beta1/academy/api.yml" → "academy"
func extractConstructName(filePath string) string {
	normalized := filepath.ToSlash(filePath)
	parts := strings.Split(normalized, "/")
	for i, part := range parts {
		if part == "constructs" && i+2 < len(parts) {
			return parts[i+2]
		}
	}
	return filePath
}

// reportDuplicateSchemas checks the accumulated fingerprints and returns
// violations for schemas that appear in multiple constructs.
func reportDuplicateSchemas(fingerprints map[string][]schemaLocation, opts AuditOptions) []Violation {
	sev := classifyContractIssue(opts)
	if sev == nil {
		return nil
	}

	var violations []Violation

	for _, entries := range fingerprints {
		if len(entries) < 2 {
			continue
		}

		// Only report across different files.
		uniqueFiles := make(map[string]bool)
		for _, e := range entries {
			uniqueFiles[e.File] = true
		}
		if len(uniqueFiles) < 2 {
			continue
		}

		// Exclude cross-version duplicates of the same construct.
		uniqueConstructs := make(map[string]bool)
		for _, e := range entries {
			uniqueConstructs[extractConstructName(e.File)] = true
		}
		if len(uniqueConstructs) < 2 {
			continue
		}

		locationParts := make([]string, 0, len(entries))
		for _, e := range entries {
			locationParts = append(locationParts, fmt.Sprintf("%s (%s)", e.SchemaName, e.File))
		}
		locations := strings.Join(locationParts, ", ")

		violations = append(violations, Violation{
			File: entries[0].File,
			Message: fmt.Sprintf(
				"Duplicate schema structure detected across constructs: %s. "+
					"Consider using a cross-construct `$ref` to a single canonical definition "+
					"to avoid type drift.", locations),
			Severity:   *sev,
			RuleNumber: 29,
		})
	}

	return violations
}
