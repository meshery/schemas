package validation

import (
	"fmt"
	"os/exec"
	"strings"

	"github.com/getkin/kin-openapi/openapi3"
	"gopkg.in/yaml.v3"
)

// Rule 8: Newly introduced enum values must be lowercase.
// Compares current enum values against a git baseline to detect new
// non-lowercase additions while preserving published enum values.

// checkRule8 validates that newly introduced enum values are lowercase.
func checkRule8(filePath, relFile string, doc *openapi3.T, opts AuditOptions, baselineRef string) []Violation {
	sev := classifyStyleIssue(opts)
	if sev == nil {
		return nil
	}

	if doc == nil || doc.Components == nil || doc.Components.Schemas == nil {
		return nil
	}

	baselineDoc := loadBaselineDoc(opts.RootDir, relFile, baselineRef)
	baselineEnums := collectEnumValuesByPath(baselineDoc)
	var violations []Violation

	for schemaName, schemaRef := range doc.Components.Schemas {
		if schemaRef == nil || schemaRef.Value == nil {
			continue
		}
		// Use relFile (repo-relative) so that violations match advisory baseline keys.
		visitEnumsInSchema(schemaRef.Value, fmt.Sprintf("Schema %q", schemaName),
			baselineEnums, *sev, relFile, &violations)
	}

	return violations
}

// visitEnumsInSchema recursively walks a schema looking for enum values.
func visitEnumsInSchema(schema *openapi3.Schema, path string,
	baselineEnums map[string]map[string]bool, sev Severity,
	filePath string, violations *[]Violation) {

	if schema == nil {
		return
	}

	// Check x-enum-casing-exempt
	if exempt, ok := schema.Extensions["x-enum-casing-exempt"].(bool); ok && exempt {
		// Skip — this enum is permanently exempt from lowercase enforcement.
	} else if len(schema.Enum) > 0 {
		existing := baselineEnums[path]
		for _, val := range schema.Enum {
			strVal, ok := val.(string)
			if !ok {
				continue
			}
			if isLowercaseEnumValue(strVal) {
				continue
			}
			if existing != nil && existing[strVal] {
				continue // Published value — exempt
			}
			*violations = append(*violations, Violation{
				File: filePath,
				Message: fmt.Sprintf(
					`%s — new enum value %q must be lowercase. `+
						`Existing published enum values are exempt for compatibility; `+
						`use %q for new additions. See AGENTS.md § "Casing rules at a glance".`,
					path, strVal, strings.ToLower(strVal)),
				Severity:   sev,
				RuleNumber: 8,
			})
		}
	}

	// Recurse into properties.
	for propName, propRef := range schema.Properties {
		if propRef == nil || propRef.Value == nil {
			continue
		}
		visitEnumsInSchema(propRef.Value, fmt.Sprintf("%s.%s", path, propName),
			baselineEnums, sev, filePath, violations)
	}

	// Recurse into allOf/oneOf/anyOf using the correct combiner name in the path.
	for _, combiner := range []struct {
		name string
		refs openapi3.SchemaRefs
	}{
		{name: "allOf", refs: schema.AllOf},
		{name: "oneOf", refs: schema.OneOf},
		{name: "anyOf", refs: schema.AnyOf},
	} {
		for i, ref := range combiner.refs {
			if ref == nil || ref.Value == nil {
				continue
			}
			visitEnumsInSchema(ref.Value, fmt.Sprintf("%s.%s[%d]", path, combiner.name, i),
				baselineEnums, sev, filePath, violations)
		}
	}

	// Recurse into items.
	if schema.Items != nil && schema.Items.Value != nil {
		visitEnumsInSchema(schema.Items.Value, path+".items",
			baselineEnums, sev, filePath, violations)
	}
}

// isLowercaseEnumValue returns true if a string is entirely lowercase.
func isLowercaseEnumValue(s string) bool {
	return s == strings.ToLower(s)
}

// collectEnumValuesByPath builds a map of schema path → set of enum values
// from a baseline document. Used to detect newly introduced values.
func collectEnumValuesByPath(doc map[string]any) map[string]map[string]bool {
	result := make(map[string]map[string]bool)
	schemas, ok := getNestedMap(doc, "components", "schemas")
	if !ok {
		return result
	}

	for schemaName, schemaDef := range schemas {
		defMap, ok := schemaDef.(map[string]any)
		if !ok {
			continue
		}
		visitEnumsInRawSchema(defMap, fmt.Sprintf("Schema %q", schemaName), result)
	}

	return result
}

func visitEnumsInRawSchema(schema map[string]any, path string, result map[string]map[string]bool) {
	if enumVals, ok := schema["enum"].([]any); ok {
		valSet := make(map[string]bool)
		for _, v := range enumVals {
			if s, ok := v.(string); ok {
				valSet[s] = true
			}
		}
		if len(valSet) > 0 {
			result[path] = valSet
		}
	}

	if props, ok := schema["properties"].(map[string]any); ok {
		for propName, propDef := range props {
			if propMap, ok := propDef.(map[string]any); ok {
				visitEnumsInRawSchema(propMap, fmt.Sprintf("%s.%s", path, propName), result)
			}
		}
	}

	for _, combiner := range []string{"allOf", "oneOf", "anyOf"} {
		if arr, ok := schema[combiner].([]any); ok {
			for i, item := range arr {
				if itemMap, ok := item.(map[string]any); ok {
					visitEnumsInRawSchema(itemMap, fmt.Sprintf("%s.%s[%d]", path, combiner, i), result)
				}
			}
		}
	}

	if items, ok := schema["items"].(map[string]any); ok {
		visitEnumsInRawSchema(items, path+".items", result)
	}
}

// getNestedMap retrieves a nested map from a YAML document by key path.
func getNestedMap(doc map[string]any, keys ...string) (map[string]any, bool) {
	current := doc
	for _, key := range keys {
		next, ok := current[key].(map[string]any)
		if !ok {
			return nil, false
		}
		current = next
	}
	return current, true
}

// loadBaselineDoc loads the baseline version of an api.yml file from git.
// rootDir is the repository root; it is set as the working directory for git
// so that the command works correctly regardless of the process's cwd.
func loadBaselineDoc(rootDir, relFile, baselineRef string) map[string]any {
	if baselineRef == "" {
		return nil
	}

	cmd := exec.Command("git", "show", baselineRef+":"+relFile)
	cmd.Dir = rootDir
	out, err := cmd.Output()
	if err != nil {
		return nil
	}

	var doc map[string]any
	if err := yaml.Unmarshal(out, &doc); err != nil {
		return nil
	}

	return doc
}

// detectEnumBaselineRef finds a usable git ref for enum baseline comparison.
func detectEnumBaselineRef(rootDir string) string {
	candidates := []string{"master", "origin/master", "refs/heads/master",
		"refs/remotes/origin/master", "HEAD^1"}

	for _, ref := range candidates {
		cmd := exec.Command("git", "rev-parse", "--verify", ref)
		cmd.Dir = rootDir
		if err := cmd.Run(); err == nil {
			return ref
		}
	}

	return ""
}
