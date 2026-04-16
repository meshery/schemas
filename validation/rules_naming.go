package validation

import (
	"fmt"
	"strings"

	"github.com/getkin/kin-openapi/openapi3"
)

// Rule 3: operationId must be lower camelCase verbNoun.
func checkRule3(filePath string, doc *openapi3.T, opts AuditOptions) []Violation {
	sev := classifyStyleIssue(opts)
	if sev == nil {
		return nil
	}
	if doc == nil || doc.Paths == nil {
		return nil
	}
	var out []Violation
	for path, item := range doc.Paths.Map() {
		for _, method := range httpMethods {
			op := getOperation(item, method)
			if op == nil || op.OperationID == "" {
				continue
			}
			opID := op.OperationID
			label := fmt.Sprintf("%s %s", strings.ToUpper(method), path)

			if !IsValidOperationID(opID) {
				out = append(out, Violation{
					File:       filePath,
					Message:    fmt.Sprintf(`%s — operationId %q must use lower camelCase verbNoun (e.g. "getPatterns"). See AGENTS.md § "Naming conventions".`, label, opID),
					Severity:   *sev,
					RuleNumber: 3,
				})
			} else if HasScreamingOperationIDSuffix(opID) {
				suggestion := SuggestOperationID(opID)
				out = append(out, Violation{
					File:       filePath,
					Message:    fmt.Sprintf(`%s — operationId %q uses "ID" suffix instead of "Id". Use: %q. See AGENTS.md § "Casing rules at a glance".`, label, opID, suggestion),
					Severity:   *sev,
					RuleNumber: 3,
				})
			}
		}
	}
	return out
}

// Rule 4: path parameters must be camelCase with Id suffix.
func checkRule4(filePath string, doc *openapi3.T, opts AuditOptions) []Violation {
	sev := classifyStyleIssue(opts)
	if sev == nil {
		return nil
	}
	if doc == nil || doc.Paths == nil {
		return nil
	}
	var out []Violation
	for path := range doc.Paths.Map() {
		matches := pathParamRE.FindAllStringSubmatch(path, -1)
		for _, m := range matches {
			param := m[1]
			if IsBadPathParam(param) {
				suggestion := SuggestPathParam(param)
				out = append(out, Violation{
					File:       filePath,
					Message:    fmt.Sprintf(`Path %q — parameter {%s} uses incorrect casing. Use camelCase with "Id" suffix: {%s}. See AGENTS.md § "Naming conventions".`, path, param, suggestion),
					Severity:   *sev,
					RuleNumber: 4,
				})
			}
		}
	}
	return out
}

// Rule 6: schema property names (on api.yml components/schemas).
func checkRule6ForAPI(filePath string, doc *openapi3.T, opts AuditOptions) []Violation {
	sev := classifyStyleIssue(opts)
	if sev == nil {
		return nil
	}
	if doc == nil || doc.Components == nil || doc.Components.Schemas == nil {
		return nil
	}
	var out []Violation
	for schemaName, schemaRef := range doc.Components.Schemas {
		if schemaRef == nil || schemaRef.Value == nil {
			continue
		}
		out = append(out, checkPropertyNameCasing(filePath, schemaName, schemaRef.Value, *sev)...)
	}
	return out
}

func checkPropertyNameCasing(filePath, schemaName string, schema *openapi3.Schema, sev Severity) []Violation {
	if schema == nil || schema.Properties == nil {
		return nil
	}
	var out []Violation
	for propName, propRef := range schema.Properties {
		if strings.HasPrefix(propName, "$") {
			continue
		}
		dbTag := getExtensionDBTag(propRef)
		gormCol := getExtensionGormColumn(propRef)
		issues := GetCamelCaseIssues(propName, true, dbTag, gormCol)
		if len(issues) > 0 {
			descs := make([]string, len(issues))
			for i, iss := range issues {
				descs[i] = iss.Description
			}
			suggestion := GetCamelCaseSuggestion(propName)
			msg := fmt.Sprintf(`Schema %q — property %q %s.`, schemaName, propName, strings.Join(descs, "; "))
			if suggestion != "" {
				msg += fmt.Sprintf(` Use: %q.`, suggestion)
			}
			msg += ` See AGENTS.md § "Casing rules at a glance".`
			out = append(out, Violation{File: filePath, Message: msg, Severity: sev, RuleNumber: 6})
		}
	}
	return out
}

// Rule 7: components/schemas names must be PascalCase.
func checkRule7(filePath string, doc *openapi3.T, opts AuditOptions) []Violation {
	sev := classifyStyleIssue(opts)
	if sev == nil {
		return nil
	}
	if doc == nil || doc.Components == nil || doc.Components.Schemas == nil {
		return nil
	}
	var out []Violation
	for name := range doc.Components.Schemas {
		if !IsPascalCase(name) {
			suggestion := strings.ToUpper(name[:1]) + name[1:]
			out = append(out, Violation{
				File:       filePath,
				Message:    fmt.Sprintf(`Schema component name %q must be PascalCase. Suggested: %q. See AGENTS.md § "Casing rules at a glance".`, name, suggestion),
				Severity:   *sev,
				RuleNumber: 7,
			})
		}
	}
	return out
}

// Rule 9: query/header parameter names must be camelCase.
func checkRule9(filePath string, doc *openapi3.T, opts AuditOptions) []Violation {
	sev := classifyStyleIssue(opts)
	if sev == nil {
		return nil
	}
	if doc == nil || doc.Paths == nil {
		return nil
	}
	var out []Violation
	for path, item := range doc.Paths.Map() {
		allParams := collectAllParams(item)
		for _, p := range allParams {
			if p.Value == nil || (p.Value.In != "query" && p.Value.In != "header") {
				continue
			}
			name := p.Value.Name
			issues := GetCamelCaseIssues(name, false, "", "")
			if len(issues) > 0 {
				descs := make([]string, len(issues))
				for i, iss := range issues {
					descs[i] = iss.Description
				}
				suggestion := GetCamelCaseSuggestion(name)
				msg := fmt.Sprintf(`%s — %s parameter %q %s.`, path, p.Value.In, name, strings.Join(descs, "; "))
				if suggestion != "" {
					msg += fmt.Sprintf(` Use camelCase instead: %q.`, suggestion)
				}
				out = append(out, Violation{File: filePath, Message: msg, Severity: *sev, RuleNumber: 9})
			}
		}
	}
	return out
}

// Rule 10: path segments must be kebab-case.
func checkRule10(filePath string, doc *openapi3.T, opts AuditOptions) []Violation {
	sev := classifyStyleIssue(opts)
	if sev == nil {
		return nil
	}
	if doc == nil || doc.Paths == nil {
		return nil
	}
	var out []Violation
	for path := range doc.Paths.Map() {
		segments := strings.Split(path, "/")
		for _, seg := range segments {
			if seg == "" || strings.HasPrefix(seg, "{") || seg == "api" {
				continue
			}
			if !IsKebabCase(seg) {
				suggestion := toKebabCase(seg)
				out = append(out, Violation{
					File:       filePath,
					Message:    fmt.Sprintf(`Path %q — segment %q must be kebab-case. Suggested: %q. See AGENTS.md § "Casing rules at a glance".`, path, seg, suggestion),
					Severity:   *sev,
					RuleNumber: 10,
				})
			}
		}
	}
	return out
}

// --- helpers ---

func getOperation(item *openapi3.PathItem, method string) *openapi3.Operation {
	if item == nil {
		return nil
	}
	switch method {
	case "get":
		return item.Get
	case "post":
		return item.Post
	case "put":
		return item.Put
	case "patch":
		return item.Patch
	case "delete":
		return item.Delete
	}
	return nil
}

func collectAllParams(item *openapi3.PathItem) openapi3.Parameters {
	var all openapi3.Parameters
	if item.Parameters != nil {
		all = append(all, item.Parameters...)
	}
	for _, method := range httpMethods {
		op := getOperation(item, method)
		if op != nil && op.Parameters != nil {
			all = append(all, op.Parameters...)
		}
	}
	return all
}

func toKebabCase(s string) string {
	var result strings.Builder
	for i, r := range s {
		if r >= 'A' && r <= 'Z' {
			if i > 0 {
				result.WriteByte('-')
			}
			result.WriteRune(r + 32)
		} else if r == '_' {
			result.WriteByte('-')
		} else {
			result.WriteRune(r)
		}
	}
	return result.String()
}

// getExtensionDBTag extracts the db tag from x-oapi-codegen-extra-tags.
func getExtensionDBTag(ref *openapi3.SchemaRef) string {
	if ref == nil || ref.Value == nil {
		return ""
	}
	return getExtraTag(ref.Value.Extensions, "db")
}

// getExtensionGormColumn extracts the gorm column from x-oapi-codegen-extra-tags.
func getExtensionGormColumn(ref *openapi3.SchemaRef) string {
	if ref == nil || ref.Value == nil {
		return ""
	}
	gormTag := getExtraTag(ref.Value.Extensions, "gorm")
	if gormTag == "" {
		return ""
	}
	// Extract column:xxx from gorm tag.
	for _, part := range strings.Split(gormTag, ";") {
		part = strings.TrimSpace(part)
		if strings.HasPrefix(part, "column:") {
			return strings.TrimPrefix(part, "column:")
		}
	}
	return ""
}

func getExtraTag(extensions map[string]any, tagName string) string {
	raw, ok := extensions["x-oapi-codegen-extra-tags"]
	if !ok {
		return ""
	}
	tags, ok := raw.(map[string]any)
	if !ok {
		return ""
	}
	val, ok := tags[tagName]
	if !ok {
		return ""
	}
	s, ok := val.(string)
	if !ok {
		return ""
	}
	// Strip options after comma (e.g., "name,omitempty" → "name").
	if idx := strings.Index(s, ","); idx >= 0 {
		return s[:idx]
	}
	return s
}
