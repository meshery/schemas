package validation

import (
	"fmt"
	"regexp"
	"strings"

	"github.com/getkin/kin-openapi/openapi3"
)

// --- Rule 1: Entity schemas must have additionalProperties: false ---

func checkRule1(filePath string, entity *entitySchema, _ AuditOptions) []Violation {
	if entity == nil || entity.Type != "object" {
		return nil
	}
	if entity.AdditionalProperties == nil || *entity.AdditionalProperties != false {
		return []Violation{{
			File:       filePath,
			Message:    "Missing `additionalProperties: false` at top level. Entity schemas must set this to prevent unknown fields in generated structs.",
			Severity:   SeverityBlocking,
			RuleNumber: 1,
		}}
	}
	return nil
}

// --- Rule 2: POST/PUT requestBody must not require server-generated fields ---

func checkRule2(filePath string, doc *openapi3.T, opts AuditOptions) []Violation {
	if doc == nil || doc.Paths == nil {
		return nil
	}
	var out []Violation
	for path, item := range doc.Paths.Map() {
		for _, pair := range []struct {
			method string
			op     *openapi3.Operation
		}{{"POST", item.Post}, {"PUT", item.Put}, {"PATCH", item.Patch}} {
			if pair.op == nil || pair.op.RequestBody == nil || pair.op.RequestBody.Value == nil {
				continue
			}
			for _, media := range pair.op.RequestBody.Value.Content {
				if media.Schema == nil {
					continue
				}
				// Check $ref schema name: POST/PUT requestBody should reference a *Payload schema.
				// Advisory-only: many existing schemas use *Request naming; this is a
				// suggestion for new schemas, not a blocking rule.
				if media.Schema.Ref != "" {
					name := refTail(media.Schema.Ref)
					if !strings.HasSuffix(name, "Payload") && !strings.HasSuffix(name, "Request") {
						out = append(out, Violation{
							File: filePath,
							Message: fmt.Sprintf(
								`%s %s — requestBody references %q, which is not a *Payload schema. `+
									`POST/PUT requestBody should reference a dedicated *Payload schema with only client-settable fields. `+
									`See AGENTS.md § "The Dual-Schema Pattern".`,
								pair.method, path, name),
							Severity:   SeverityAdvisory,
							RuleNumber: 2,
						})
					}
				}
				if media.Schema.Value == nil {
					continue
				}
				for _, req := range media.Schema.Value.Required {
					if serverGeneratedFields[req] {
						out = append(out, Violation{
							File: filePath,
							Message: fmt.Sprintf(
								`%s %s — requestBody has server-generated field(s) in required: [%s]. Use a dedicated *Payload schema. See AGENTS.md § "The Dual-Schema Pattern".`,
								pair.method, path, req),
							Severity:   SeverityBlocking,
							RuleNumber: 2,
						})
					}
				}
			}
		}
	}
	return out
}

// --- Rule 5: DELETE must not have a requestBody ---

func checkRule5(filePath string, doc *openapi3.T, _ AuditOptions) []Violation {
	if doc == nil || doc.Paths == nil {
		return nil
	}
	var out []Violation
	for path, item := range doc.Paths.Map() {
		if item.Delete != nil && item.Delete.RequestBody != nil {
			out = append(out, Violation{
				File: filePath,
				Message: fmt.Sprintf(
					`DELETE %s — DELETE operations must not have a requestBody. Use a POST sub-resource for bulk deletes. See AGENTS.md § "HTTP API Design Principles".`,
					path),
				Severity:   SeverityBlocking,
				RuleNumber: 5,
			})
		}
	}
	return out
}

// --- Rule 12: api.yml must declare openapi: 3.0.x ---

var openapi30RE = regexp.MustCompile(`^3\.0\.\d+$`)

func checkRule12(filePath string, doc *openapi3.T, _ AuditOptions) []Violation {
	if doc == nil {
		return nil
	}
	if doc.OpenAPI == "" {
		return []Violation{{File: filePath, Message: `Missing openapi version declaration. Must be "3.0.0" or "3.0.x".`, Severity: SeverityBlocking, RuleNumber: 12}}
	}
	if !openapi30RE.MatchString(doc.OpenAPI) {
		return []Violation{{File: filePath,
			Message:    fmt.Sprintf(`OpenAPI version %q is not supported. Must be 3.0.x. oapi-codegen requires 3.0.x and will fail on 3.1.0.`, doc.OpenAPI),
			Severity:   SeverityBlocking,
			RuleNumber: 12,
		}}
	}
	return nil
}

// --- Rule 13: api.yml must have info.title and info.version ---

func checkRule13(filePath string, doc *openapi3.T, _ AuditOptions) []Violation {
	if doc == nil {
		return nil
	}
	var out []Violation
	if doc.Info == nil {
		return []Violation{{File: filePath, Message: "Missing `info` section. Must have info.title and info.version.", Severity: SeverityBlocking, RuleNumber: 13}}
	}
	if doc.Info.Title == "" {
		out = append(out, Violation{File: filePath, Message: "Missing `info.title`. Every api.yml must declare a title.", Severity: SeverityBlocking, RuleNumber: 13})
	}
	if doc.Info.Version == "" {
		out = append(out, Violation{File: filePath, Message: "Missing `info.version`. Every api.yml must declare a version.", Severity: SeverityBlocking, RuleNumber: 13})
	}
	return out
}

// --- Rule 19: No unnecessary single-entry allOf ---

func checkRule19(filePath string, doc *openapi3.T, _ AuditOptions) []Violation {
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
			s := propRef.Value
			if len(s.AllOf) == 1 && s.AllOf[0] != nil && s.AllOf[0].Ref != "" &&
				s.Description == "" &&
				s.Extensions["x-go-type"] == nil &&
				s.Extensions["x-go-name"] == nil &&
				s.Extensions["x-oapi-codegen-extra-tags"] == nil {
				out = append(out, Violation{
					File: filePath,
					Message: fmt.Sprintf(
						`Schema %q — property %q has an unnecessary single-entry allOf wrapping $ref %q. Use a direct $ref instead.`,
						name, propName, s.AllOf[0].Ref),
					Severity:   SeverityBlocking,
					RuleNumber: 19,
				})
			}
		}
	}
	return out
}

// --- Rule 20: Entity schema must have properties and required ---

func checkRule20(filePath string, entity *entitySchema, _ AuditOptions) []Violation {
	if entity == nil || entity.Type != "object" {
		return nil
	}
	var out []Violation
	if len(entity.Properties) == 0 {
		out = append(out, Violation{File: filePath, Message: "Entity schema has type: object but no `properties`. Entity schemas must define their properties explicitly.", Severity: SeverityBlocking, RuleNumber: 20})
	}
	if len(entity.Required) == 0 {
		out = append(out, Violation{File: filePath, Message: "Entity schema has no `required` array (or it is empty). Entity schemas should list server-generated fields that are always present in `required`.", Severity: SeverityBlocking, RuleNumber: 20})
	}
	return out
}

// --- Rule 21: GET responses must not reference *Payload schemas ---

func checkRule21(filePath string, doc *openapi3.T, _ AuditOptions) []Violation {
	if doc == nil || doc.Paths == nil {
		return nil
	}
	var out []Violation
	for path, item := range doc.Paths.Map() {
		if item.Get == nil || item.Get.Responses == nil {
			continue
		}
		for code, resp := range item.Get.Responses.Map() {
			if resp == nil || resp.Value == nil {
				continue
			}
			for _, media := range resp.Value.Content {
				if media.Schema == nil {
					continue
				}
				ref := media.Schema.Ref
				if ref != "" {
					name := refTail(ref)
					if strings.HasSuffix(name, "Payload") {
						out = append(out, Violation{
							File: filePath,
							Message: fmt.Sprintf(
								`GET %s — response %s references Payload schema %q. GET responses must use the full entity schema.`,
								path, code, name),
							Severity:   SeverityBlocking,
							RuleNumber: 21,
						})
					}
				}
			}
		}
	}
	return out
}

// --- Rule 23: Operations must define standard error responses ---

func checkRule23(filePath string, doc *openapi3.T, opts AuditOptions) []Violation {
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
			codes := collectResponseCodes(op)
			label := fmt.Sprintf("%s %s", strings.ToUpper(method), path)

			// Check for explicitly public endpoints.
			isPublic := isExplicitlyPublic(op, doc)

			if !isPublic && !codes["401"] {
				out = append(out, Violation{File: filePath, Message: fmt.Sprintf("%s — missing `401` (Unauthorized) response.", label), Severity: classifyDesignIssue(opts), RuleNumber: 23})
			}
			if !codes["500"] {
				out = append(out, Violation{File: filePath, Message: fmt.Sprintf("%s — missing `500` (Internal Server Error) response.", label), Severity: classifyDesignIssue(opts), RuleNumber: 23})
			}
			if (method == "post" || method == "put" || method == "patch") && !codes["400"] {
				out = append(out, Violation{File: filePath, Message: fmt.Sprintf("%s — missing `400` (Bad Request) response.", label), Severity: classifyDesignIssue(opts), RuleNumber: 23})
			}
			if strings.Contains(path, "{") && !codes["404"] {
				out = append(out, Violation{File: filePath, Message: fmt.Sprintf("%s — missing `404` (Not Found) response.", label), Severity: classifyDesignIssue(opts), RuleNumber: 23})
			}
		}
	}
	return out
}

// --- Rule 24: api.yml must declare a security scheme ---

func checkRule24(filePath string, doc *openapi3.T, opts AuditOptions) []Violation {
	if doc == nil || doc.Paths == nil {
		return nil
	}
	var out []Violation
	schemes := doc.Components
	if schemes == nil || schemes.SecuritySchemes == nil || len(schemes.SecuritySchemes) == 0 {
		out = append(out, Violation{
			File: filePath, Message: "No security schemes declared. api.yml files with path operations must define at least one entry under `components.securitySchemes`.",
			Severity: classifyDesignIssue(opts), RuleNumber: 24,
		})
	}
	return out
}

// --- Rule 25: List endpoints must reference pagination parameters ---

func checkRule25(filePath string, doc *openapi3.T, opts AuditOptions) []Violation {
	if doc == nil || doc.Paths == nil {
		return nil
	}
	var out []Violation
	for path, item := range doc.Paths.Map() {
		if item.Get == nil {
			continue
		}
		op := item.Get
		if !looksLikeListEndpoint(path, op, doc) {
			continue
		}
		paramNames := collectParamNames(item, op)
		var missing []string
		if !paramNames["page"] {
			missing = append(missing, "page")
		}
		if !paramNames["pagesize"] {
			missing = append(missing, "pagesize")
		}
		if len(missing) > 0 {
			out = append(out, Violation{
				File: filePath,
				Message: fmt.Sprintf("GET %s — list endpoint (returns array or paged response) is missing pagination parameter(s): %s. Reference the shared parameters from v1alpha1/core/api.yml for consistent pagination across all list endpoints.",
					path, strings.Join(missing, ", ")),
				Severity: classifyDesignIssue(opts), RuleNumber: 25,
			})
		}
	}
	return out
}

// --- Rule 26: Inline schemas with 4+ properties → extract ---

func checkRule26(filePath string, doc *openapi3.T, opts AuditOptions) []Violation {
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
			label := fmt.Sprintf("%s %s", strings.ToUpper(method), path)
			if op.Responses != nil {
				for code, resp := range op.Responses.Map() {
					if resp == nil || resp.Value == nil {
						continue
					}
					for _, media := range resp.Value.Content {
						if media.Schema != nil && media.Schema.Ref == "" && media.Schema.Value != nil {
							if len(media.Schema.Value.Properties) >= 4 {
								out = append(out, Violation{
									File:     filePath,
									Message:  fmt.Sprintf("%s — response %s has an inline schema with %d properties. Extract it to `components/schemas`.", label, code, len(media.Schema.Value.Properties)),
									Severity: classifyDesignIssue(opts), RuleNumber: 26,
								})
							}
						}
					}
				}
			}
		}
	}
	return out
}

// --- Rule 28: Response codes match method semantics ---

var (
	createPrefixes = []string{"create", "add", "register"}
	actionSuffixRE = regexp.MustCompile(`/(accept|reject|approve|deny|revoke|verify|start|stop|cancel|upgrade|upgradePreview|webhooks|submit|withdraw)$`)
)

func checkRule28(filePath string, doc *openapi3.T, opts AuditOptions) []Violation {
	sev := classifyContractIssue(opts)
	if sev == nil {
		return nil
	}
	if doc == nil || doc.Paths == nil {
		return nil
	}
	var out []Violation
	for path, item := range doc.Paths.Map() {
		// POST create → 201.
		if item.Post != nil && item.Post.Responses != nil {
			if isCreatePost(item.Post, path) {
				codes := collectResponseCodes(item.Post)
				if codes["200"] && !codes["201"] {
					desc := createResponseDescription(item.Post)
					msg := fmt.Sprintf("POST %s —", path)
					if desc != "" {
						msg += fmt.Sprintf(" response description %q", desc)
					}
					msg += " appears to create a resource but uses 200 instead of 201 (Created). Use 201 for POST endpoints that exclusively create new resources."
					out = append(out, Violation{File: filePath,
						Message: msg, Severity: *sev, RuleNumber: 28})
				}
			}
		}
		// DELETE single-resource → 204.
		if item.Delete != nil && item.Delete.Responses != nil {
			if isSingleResourceDeletePath(path) {
				codes := collectResponseCodes(item.Delete)
				if codes["200"] && !codes["204"] {
					out = append(out, Violation{File: filePath,
						Message:  fmt.Sprintf("DELETE %s — single-resource DELETE should return 204 (No Content) instead of 200.", path),
						Severity: *sev, RuleNumber: 28})
				}
			}
		}
	}
	return out
}

// --- Rule 30: Response schemas should use $ref ---

func checkRule30(filePath string, doc *openapi3.T, opts AuditOptions) []Violation {
	if doc == nil || doc.Paths == nil {
		return nil
	}
	var out []Violation
	for path, item := range doc.Paths.Map() {
		for _, method := range httpMethods {
			op := getOperation(item, method)
			if op == nil || op.Responses == nil {
				continue
			}
			for code, resp := range op.Responses.Map() {
				if !strings.HasPrefix(code, "2") {
					continue
				}
				if resp == nil || resp.Value == nil {
					continue
				}
				for _, media := range resp.Value.Content {
					if media.Schema == nil || media.Schema.Ref != "" {
						continue
					}
					s := media.Schema.Value
					if s != nil && s.Type != nil && s.Type.Is("array") && s.Items != nil && s.Items.Ref == "" {
						if s.Items.Value != nil && len(s.Items.Value.Properties) >= 3 {
							out = append(out, Violation{File: filePath,
								Message: fmt.Sprintf("%s %s — response %s returns an array with inline item schema (%d properties). Extract to `components/schemas`.",
									strings.ToUpper(method), path, code, len(s.Items.Value.Properties)),
								Severity: classifyDesignIssue(opts), RuleNumber: 30})
						}
					}
				}
			}
		}
	}
	return out
}

// --- Rule 31: Response text must not include "successfully" ---

var successfullyRE = regexp.MustCompile(`(?i)\bsuccessfully\b`)

func checkRule31(filePath string, doc *openapi3.T, opts AuditOptions) []Violation {
	if doc == nil || doc.Paths == nil {
		return nil
	}
	var out []Violation
	for path, item := range doc.Paths.Map() {
		for _, method := range httpMethods {
			op := getOperation(item, method)
			if op == nil || op.Responses == nil {
				continue
			}
			label := fmt.Sprintf("%s %s", strings.ToUpper(method), path)
			for code, resp := range op.Responses.Map() {
				if resp == nil || resp.Value == nil || resp.Value.Description == nil {
					continue
				}
				if successfullyRE.MatchString(*resp.Value.Description) {
					out = append(out, Violation{File: filePath,
						Message:  fmt.Sprintf(`%s — response %s description contains the word "successfully". Use neutral wording.`, label, code),
						Severity: classifyDesignIssue(opts), RuleNumber: 31})
				}
			}
		}
	}
	return out
}

// --- Rule 36: Operations must have tags ---

func checkRule36(filePath string, doc *openapi3.T, opts AuditOptions) []Violation {
	if doc == nil || doc.Paths == nil {
		return nil
	}
	declaredTags := make(map[string]bool)
	for _, t := range doc.Tags {
		if t != nil {
			declaredTags[t.Name] = true
		}
	}
	var out []Violation
	for path, item := range doc.Paths.Map() {
		for _, method := range httpMethods {
			op := getOperation(item, method)
			if op == nil {
				continue
			}
			label := fmt.Sprintf("%s %s", strings.ToUpper(method), path)
			if len(op.Tags) == 0 {
				out = append(out, Violation{File: filePath, Message: fmt.Sprintf("%s — operation is missing `tags`.", label), Severity: classifyDesignIssue(opts), RuleNumber: 36})
				continue
			}
			if len(declaredTags) > 0 {
				for _, tag := range op.Tags {
					if !declaredTags[tag] {
						out = append(out, Violation{File: filePath,
							Message:  fmt.Sprintf(`%s — operation tag %q is not declared in the document-root tags section.`, label, tag),
							Severity: classifyDesignIssue(opts), RuleNumber: 36})
					}
				}
			}
		}
	}
	return out
}

// --- design helpers ---

func refTail(ref string) string {
	if idx := strings.LastIndex(ref, "/"); idx >= 0 {
		return ref[idx+1:]
	}
	return ref
}

func collectResponseCodes(op *openapi3.Operation) map[string]bool {
	codes := make(map[string]bool)
	if op.Responses != nil {
		for code := range op.Responses.Map() {
			codes[code] = true
		}
	}
	return codes
}

func isExplicitlyPublic(op *openapi3.Operation, doc *openapi3.T) bool {
	if op.Security != nil && len(*op.Security) == 0 {
		return true
	}
	if op.Security == nil && doc.Security != nil && len(doc.Security) == 0 {
		return true
	}
	return false
}

// createResponseDescription returns the response description that triggered the
// "create" heuristic, or "" if detection was based on operationID alone.
func createResponseDescription(op *openapi3.Operation) string {
	if op.Responses == nil {
		return ""
	}
	for _, resp := range op.Responses.Map() {
		if resp != nil && resp.Value != nil && resp.Value.Description != nil {
			desc := *resp.Value.Description
			lower := strings.ToLower(desc)
			if strings.Contains(lower, "created") || strings.Contains(lower, "new") {
				return desc
			}
		}
	}
	return ""
}

func isCreatePost(op *openapi3.Operation, path string) bool {
	if strings.HasSuffix(path, "/delete") || actionSuffixRE.MatchString(path) {
		return false
	}
	if op.OperationID != "" {
		lower := strings.ToLower(op.OperationID)
		for _, prefix := range createPrefixes {
			if strings.HasPrefix(lower, prefix) {
				return true
			}
		}
	}
	if op.Responses != nil {
		for _, resp := range op.Responses.Map() {
			if resp != nil && resp.Value != nil && resp.Value.Description != nil {
				desc := strings.ToLower(*resp.Value.Description)
				if strings.Contains(desc, "created") || strings.Contains(desc, "new") {
					return true
				}
			}
		}
	}
	return false
}

func isSingleResourceDeletePath(path string) bool {
	return regexp.MustCompile(`\{[^}]+\}$`).MatchString(path)
}

func looksLikeListEndpoint(path string, op *openapi3.Operation, doc *openapi3.T) bool {
	if op.OperationID != "" && !regexp.MustCompile(`(?i)^(get|list|search|find)`).MatchString(op.OperationID) {
		return false
	}
	// Exclude single-resource reads.
	if regexp.MustCompile(`/\{[^/]+\}$`).MatchString(path) && op.OperationID != "" {
		lower := strings.ToLower(op.OperationID)
		if strings.Contains(lower, "byid") || regexp.MustCompile(`^get[A-Z][a-zA-Z0-9]*$`).MatchString(op.OperationID) {
			return false
		}
	}
	if op.Responses == nil {
		return false
	}
	resp200 := op.Responses.Value("200")
	if resp200 == nil || resp200.Value == nil {
		return false
	}
	for _, media := range resp200.Value.Content {
		if media.Schema == nil || media.Schema.Value == nil {
			continue
		}
		s := media.Schema.Value
		if s.Type != nil && s.Type.Is("array") {
			return true
		}
		// Check for pagination envelope fields.
		if s.Properties != nil {
			_, hasPage := s.Properties["page"]
			_, hasTotal := s.Properties["total_count"]
			_, hasPageSize := s.Properties["page_size"]
			if hasPage || hasTotal || hasPageSize {
				return true
			}
		}
	}
	return false
}

func collectParamNames(item *openapi3.PathItem, op *openapi3.Operation) map[string]bool {
	names := make(map[string]bool)
	for _, p := range item.Parameters {
		if p != nil && p.Value != nil {
			names[p.Value.Name] = true
		}
	}
	for _, p := range op.Parameters {
		if p != nil && p.Value != nil {
			names[p.Value.Name] = true
		}
	}
	return names
}
