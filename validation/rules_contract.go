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
// names and types. Schemas with fewer than 3 properties are skipped.
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

	parts := make([]string, 0, len(propKeys))
	for _, k := range propKeys {
		propRef := schema.Properties[k]
		if propRef == nil || propRef.Value == nil {
			parts = append(parts, k+":unknown")
			continue
		}
		p := propRef.Value

		if propRef.Ref != "" {
			refName := propRef.Ref
			if idx := strings.LastIndex(refName, "/"); idx >= 0 {
				refName = refName[idx+1:]
			}
			parts = append(parts, fmt.Sprintf("%s:$ref:%s", k, refName))
			continue
		}

		if p.Type != nil && p.Type.Is("array") {
			if p.Items != nil && p.Items.Ref != "" {
				refName := p.Items.Ref
				if idx := strings.LastIndex(refName, "/"); idx >= 0 {
					refName = refName[idx+1:]
				}
				parts = append(parts, fmt.Sprintf("%s:array:$ref:%s", k, refName))
			} else if p.Items != nil && p.Items.Value != nil && p.Items.Value.Type != nil {
				parts = append(parts, fmt.Sprintf("%s:array:%s", k, p.Items.Value.Type.Slice()[0]))
			} else {
				parts = append(parts, fmt.Sprintf("%s:array:unknown", k))
			}
			continue
		}

		if p.Type != nil {
			parts = append(parts, fmt.Sprintf("%s:%s", k, p.Type.Slice()[0]))
		} else {
			parts = append(parts, k+":unknown")
		}
	}

	return strings.Join(parts, "|")
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
