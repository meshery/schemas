package validation

import (
	"fmt"
	"regexp"
	"strings"

	"github.com/getkin/kin-openapi/openapi3"
)

// --- Rule 11: x-generate-db-helpers at component level only ---

func checkRule11(filePath string, doc *openapi3.T, _ AuditOptions) []Violation {
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
			// Only flag if the property itself has the extension (not if it
			// was inherited from a resolved $ref target — those are valid
			// schema-component-level annotations on the referenced schema).
			if propRef.Ref != "" {
				continue
			}
			if _, ok := propRef.Value.Extensions["x-generate-db-helpers"]; ok {
				out = append(out, Violation{
					File: filePath,
					Message: fmt.Sprintf(
						`Schema %q — property %q has x-generate-db-helpers. This annotation must be at the schema component level, not on individual properties.`,
						name, propName),
					Severity:   SeverityBlocking,
					RuleNumber: 11,
				})
			}
		}
	}
	return out
}

// --- Rule 14: x-internal must be omitted or ["cloud"]/["meshery"] ---

var validInternalTags = map[string]bool{"cloud": true, "meshery": true}

func checkRule14(filePath string, doc *openapi3.T, _ AuditOptions) []Violation {
	if doc == nil || doc.Paths == nil {
		return nil
	}
	var out []Violation
	for path, item := range doc.Paths.Map() {
		for _, method := range httpMethods {
			op := getOperation(item, method)
			if op == nil {
				continue
			}
			raw, ok := op.Extensions["x-internal"]
			if !ok {
				continue
			}
			label := fmt.Sprintf("%s %s", strings.ToUpper(method), path)
			arr, ok := raw.([]any)
			if !ok {
				out = append(out, Violation{File: filePath,
					Message: fmt.Sprintf(`%s — x-internal must be an array (e.g. ["cloud"]).`, label),
					Severity: SeverityBlocking, RuleNumber: 14})
				continue
			}
			for _, tag := range arr {
				s, ok := tag.(string)
				if !ok {
					out = append(out, Violation{File: filePath,
						Message: fmt.Sprintf(`%s — x-internal array values must be strings.`, label),
						Severity: SeverityBlocking, RuleNumber: 14})
				} else if !validInternalTags[s] {
					out = append(out, Violation{File: filePath,
						Message: fmt.Sprintf(`%s — x-internal value %q is invalid. Must be "cloud" or "meshery".`, label, s),
						Severity: SeverityBlocking, RuleNumber: 14})
				}
			}
		}
	}
	return out
}

// --- Rule 15/16: cross-construct $ref must have x-go-type + matching alias ---

var bundledBaseSchemas = map[string]bool{"core": true, "capability": true, "selector": true}

// checkRule15 validates cross-construct $ref annotations (Rules 15/16).
// In OpenAPI 3.0 sibling properties next to $ref are ignored by kin-openapi,
// so this rule walks the raw YAML to access x-go-type alongside $ref. The
// raw doc is passed in from auditAPISpec to avoid re-reading api.yml.
func checkRule15(filePath string, raw map[string]any, _ *openapi3.T, _ AuditOptions) []Violation {
	if raw == nil {
		return nil
	}
	schemas, ok := getNestedMap(raw, "components", "schemas")
	if !ok {
		return nil
	}

	var out []Violation
	for schemaName, schemaDef := range schemas {
		defMap, ok := schemaDef.(map[string]any)
		if !ok {
			continue
		}
		out = append(out, checkCrossRefAnnotations(filePath, schemaName, defMap)...)
	}
	return out
}

// checkCrossRefAnnotations walks a schema's properties looking for cross-construct
// $ref entries that are missing x-go-type / x-go-type-import annotations.
func checkCrossRefAnnotations(filePath, schemaName string, schemaMap map[string]any) []Violation {
	props, ok := schemaMap["properties"].(map[string]any)
	if !ok {
		return nil
	}

	var out []Violation
	for propName, propDef := range props {
		propMap, ok := propDef.(map[string]any)
		if !ok {
			continue
		}

		crossRef := findCrossConstructRef(propMap)
		if crossRef == "" {
			continue
		}

		// Rule 15: x-go-type required on cross-construct $ref.
		goType, _ := propMap["x-go-type"].(string)
		if goType == "" {
			out = append(out, Violation{
				File:       filePath,
				Message:    fmt.Sprintf(`Schema %q — property %q references cross-construct schema via %q but is missing x-go-type. Add x-go-type so Go/TS code generation resolves the correct type.`, schemaName, propName, crossRef),
				Severity:   SeverityBlocking,
				RuleNumber: 15,
			})
			continue
		}

		// Rule 16: x-go-type-import must be present and alias must match.
		goImport, _ := propMap["x-go-type-import"].(map[string]any)
		if goImport == nil {
			out = append(out, Violation{
				File:       filePath,
				Message:    fmt.Sprintf(`Schema %q — property %q has x-go-type %q for cross-construct $ref but is missing x-go-type-import.`, schemaName, propName, goType),
				Severity:   SeverityBlocking,
				RuleNumber: 16,
			})
			continue
		}

		importName, _ := goImport["name"].(string)
		if importName == "" {
			continue
		}
		typeStr := goTypePrefixRE.ReplaceAllString(goType, "")
		if dotIdx := strings.Index(typeStr, "."); dotIdx > 0 {
			alias := typeStr[:dotIdx]
			if alias != importName {
				out = append(out, Violation{
					File:       filePath,
					Message:    fmt.Sprintf(`Schema %q — property %q x-go-type alias %q does not match x-go-type-import.name %q.`, schemaName, propName, alias, importName),
					Severity:   SeverityBlocking,
					RuleNumber: 16,
				})
			}
		}
	}
	return out
}

// findCrossConstructRef returns the first cross-construct $ref found in a raw
// property map, checking both direct $ref and $ref inside allOf/oneOf/anyOf.
func findCrossConstructRef(propMap map[string]any) string {
	if ref, ok := propMap["$ref"].(string); ok && isCrossConstructRef(ref) {
		return ref
	}
	for _, key := range []string{"allOf", "oneOf", "anyOf"} {
		arr, ok := propMap[key].([]any)
		if !ok {
			continue
		}
		for _, item := range arr {
			entry, ok := item.(map[string]any)
			if !ok {
				continue
			}
			if ref, ok := entry["$ref"].(string); ok && isCrossConstructRef(ref) {
				return ref
			}
		}
	}
	return ""
}

// goTypePrefixRE strips map/slice/pointer prefixes from a Go type string.
var goTypePrefixRE = regexp.MustCompile(`^(?:map\[[^\]]*\]|\[\])*\*?`)

var crossRefRE = regexp.MustCompile(`\.\./([a-z_-]+)/api\.yml#/components/schemas/`)

func isCrossConstructRef(ref string) bool {
	if ref == "" || strings.HasPrefix(ref, "#/") {
		return false
	}
	if strings.Contains(ref, "v1alpha1/core/") {
		return false
	}
	m := crossRefRE.FindStringSubmatch(ref)
	if m != nil && bundledBaseSchemas[m[1]] {
		return false
	}
	return crossRefRE.MatchString(ref)
}

// --- Rule 17: core.Map must pair with x-go-type-skip-optional-pointer ---

func checkRule17(filePath string, doc *openapi3.T, _ AuditOptions) []Violation {
	if doc == nil || doc.Components == nil || doc.Components.Schemas == nil {
		return nil
	}
	var out []Violation
	for name, ref := range doc.Components.Schemas {
		if ref == nil || ref.Value == nil {
			continue
		}
		out = append(out, checkCoreMapInSchema(filePath, name, ref.Value)...)
	}
	return out
}

func checkCoreMapInSchema(filePath, schemaName string, s *openapi3.Schema) []Violation {
	var out []Violation
	check := func(ext map[string]any, label string) {
		goType, _ := ext["x-go-type"].(string)
		if goType == "core.Map" || goType == `"core.Map"` {
			skip, _ := ext["x-go-type-skip-optional-pointer"].(bool)
			if !skip {
				out = append(out, Violation{File: filePath,
					Message: fmt.Sprintf(`Schema %q — %s uses x-go-type: "core.Map" but is missing x-go-type-skip-optional-pointer: true.`,
						schemaName, label),
					Severity: SeverityBlocking, RuleNumber: 17})
			}
		}
	}
	check(s.Extensions, "top-level")
	if s.Properties != nil {
		for propName, propRef := range s.Properties {
			if propRef != nil && propRef.Value != nil {
				check(propRef.Value.Extensions, fmt.Sprintf("property %q", propName))
			}
		}
	}
	return out
}

// --- Rule 27: x-oapi-codegen-extra-tags consistency ---

func checkRule27(filePath string, doc *openapi3.T, opts AuditOptions) []Violation {
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
			raw, ok := propRef.Value.Extensions["x-oapi-codegen-extra-tags"]
			if !ok {
				continue
			}
			tags, ok := raw.(map[string]any)
			if !ok {
				continue
			}
			// db tag must be snake_case.
			if dbVal, ok := tags["db"].(string); ok {
				base := strings.SplitN(dbVal, ",", 2)[0]
				if !IsValidDBTag(base) {
					out = append(out, Violation{File: filePath,
						Message:  fmt.Sprintf(`Schema %q — property %q has db: %q with non-snake_case value.`, name, propName, dbVal),
						Severity: SeverityBlocking, RuleNumber: 27})
				}
			}
			// json tag must match property name (unless it's a deliberate
			// semantic alias where json matches the db column name, or gorm
			// excludes the field and the json override is intentional wire format).
			if jsonVal, ok := tags["json"].(string); ok {
				base := strings.SplitN(jsonVal, ",", 2)[0]
				if base != propName && base != "-" {
					// Allow if json tag matches the db column (deliberate semantic alias).
					dbCol := ""
					if dv, ok := tags["db"].(string); ok {
						dbCol = strings.SplitN(dv, ",", 2)[0]
					}
					gormVal, _ := tags["gorm"].(string)
					gormExcluded := gormVal == "-"
					if (dbCol == "" || base != dbCol) && !gormExcluded {
						out = append(out, Violation{File: filePath,
							Message:  fmt.Sprintf(`Schema %q — property %q has json: %q but base name %q does not match the schema property name.`, name, propName, jsonVal, base),
							Severity: SeverityBlocking, RuleNumber: 27})
					}
				}
			}
			// yaml tag is auto-generated, warn if manual.
			if _, ok := tags["yaml"]; ok {
				out = append(out, Violation{File: filePath,
					Message:  fmt.Sprintf("Schema %q — property %q has a manual `yaml:` tag in x-oapi-codegen-extra-tags. YAML struct tags are automatically added by the Go generator — remove this to avoid conflicts.", name, propName),
					Severity: classifyDesignIssue(opts), RuleNumber: 27})
			}
		}
	}
	return out
}

// --- Rule 35: x-go-type/x-go-type-import consistency ---

func checkRule35(filePath string, doc *openapi3.T, _ AuditOptions) []Violation {
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
			out = append(out, checkGoTypeConsistency(filePath, name, propName, propRef.Value.Extensions)...)
		}
	}
	return out
}

func checkGoTypeConsistency(filePath, schemaName, propName string, ext map[string]any) []Violation {
	goType, _ := ext["x-go-type"].(string)
	goImport, _ := ext["x-go-type-import"].(map[string]any)
	if goType == "" || goImport == nil {
		return nil
	}
	importName, _ := goImport["name"].(string)
	importPath, _ := goImport["path"].(string)

	// Strip map/slice/pointer prefixes.
	typeStr := regexp.MustCompile(`^(?:map\[[^\]]*\]|\[\])*\*?`).ReplaceAllString(goType, "")
	dotIdx := strings.Index(typeStr, ".")
	if dotIdx <= 0 {
		return nil
	}
	alias := typeStr[:dotIdx]

	var out []Violation
	if importName != "" && alias != importName {
		out = append(out, Violation{File: filePath,
			Message:  fmt.Sprintf(`Schema %q — property %q has x-go-type alias %q but x-go-type-import.name is %q. These must match.`, schemaName, propName, alias, importName),
			Severity: SeverityBlocking, RuleNumber: 35})
	}
	if importPath != "" && importName != "" {
		parts := strings.Split(importPath, "/")
		lastSeg := parts[len(parts)-1]
		versionRE := regexp.MustCompile(`(v\d+(?:alpha|beta)\d*)$`)
		m := versionRE.FindStringSubmatch(importName)
		base := versionRE.ReplaceAllString(importName, "")
		if base != "" && lastSeg != base && !strings.HasPrefix(lastSeg, base) && !strings.Contains(base, lastSeg) {
			out = append(out, Violation{File: filePath,
				Message:  fmt.Sprintf(`Schema %q — property %q has x-go-type-import alias %q but import path ends with %q.`, schemaName, propName, importName, lastSeg),
				Severity: SeverityBlocking, RuleNumber: 35})
		}
		if m != nil && base != importName && !strings.Contains(importPath, "/"+m[1]+"/") {
			out = append(out, Violation{File: filePath,
				Message:  fmt.Sprintf(`Schema %q — property %q has alias version %s but import path %q does not contain /%s/.`, schemaName, propName, m[1], importPath, m[1]),
				Severity: SeverityBlocking, RuleNumber: 35})
		}
	}
	return out
}
