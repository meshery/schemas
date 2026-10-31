package validation

import (
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"sync"

	"github.com/getkin/kin-openapi/openapi3"
	"gopkg.in/yaml.v3"
)

// Rule 48: an operation that carries `x-mcp` must be safe to generate a tool
// from.
//
// `x-mcp` marks an operation as a tool of the hosted MCP server (the value is
// defined by schemas/extensions/mcp-operation.yaml; the contract is
// docs/mcp-operation-contract.md). The server builds each tool from the
// operation alone, so everything it needs must be in the operation. The rule
// fails when an operation with `x-mcp`:
//
//   - has no `operationId` (the tool name),
//   - has no 2xx response with an `application/json` schema (the tool's
//     output schema),
//   - has no `scope`, or one that the extension schema does not define (the
//     scope a token needs to call it),
//   - is `approveRequest` or `denyRequest` (approving and denying are never
//     tools, so an AI app can never decide its own request),
//   - is a DELETE (the hosted server exposes no delete tool),
//   - does not accept the optional `X-Current-Orgid` header, which selects the
//     organization the call acts in, or
//   - has a value outside the extension schema (a missing `expose`, an unknown
//     key such as a hand-written read-only or destructive flag).
const (
	mcpExtension         = "x-mcp"
	mcpExtensionSchema   = "schemas/extensions/mcp-operation.yaml"
	mcpOrganizationField = "X-Current-Orgid"
)

// mcpForbiddenOperationIDs are operations that never become tools.
var mcpForbiddenOperationIDs = map[string]string{
	"approveRequest": "approving a request is a human act in the app, never a tool",
	"denyRequest":    "denying a request is a human act in the app, never a tool",
}

var mcpScopeCache sync.Map // root dir -> map[string]bool

// loadMcpScopes reads the scopes defined by the extension schema under root.
func loadMcpScopes(root string) (map[string]bool, error) {
	if cached, ok := mcpScopeCache.Load(root); ok {
		return cached.(map[string]bool), nil
	}
	data, err := os.ReadFile(filepath.Join(root, filepath.FromSlash(mcpExtensionSchema)))
	if err != nil {
		return nil, err
	}
	var schema struct {
		Definitions struct {
			McpScope struct {
				Enum []string `yaml:"enum"`
			} `yaml:"McpScope"`
		} `yaml:"definitions"`
	}
	if err := yaml.Unmarshal(data, &schema); err != nil {
		return nil, err
	}
	scopes := map[string]bool{}
	for _, s := range schema.Definitions.McpScope.Enum {
		scopes[s] = true
	}
	if len(scopes) == 0 {
		return nil, fmt.Errorf("%s defines no scopes", mcpExtensionSchema)
	}
	mcpScopeCache.Store(root, scopes)
	return scopes, nil
}

func checkRule48(filePath string, doc *openapi3.T, opts AuditOptions) []Violation {
	if doc == nil || doc.Paths == nil || !docHasMcpOperation(doc) {
		return nil
	}
	scopes, err := loadMcpScopes(opts.RootDir)
	if err != nil {
		return []Violation{{File: filePath,
			Message:  fmt.Sprintf("x-mcp is used but its scopes cannot be read from %s: %v", mcpExtensionSchema, err),
			Severity: SeverityBlocking, RuleNumber: 48}}
	}
	return lintMcpOperations(filePath, doc, scopes)
}

// walkBundledConstructDocs visits every non-deprecated construct api.yml of
// every version, which is what the OpenAPI bundler merges. Unlike
// walkValidatedConstructSpecs it does not keep only the newest version of
// each construct: an operation can still be served from an older version of a
// construct whose newest version does not define it (getUser, in v1beta2/user).
func walkBundledConstructDocs(rootDir string, fn func(relPath string, doc *openapi3.T)) {
	constructsDir := filepath.Join(rootDir, "schemas", "constructs")
	versions, err := os.ReadDir(constructsDir)
	if err != nil {
		return
	}
	for _, v := range versions {
		if !v.IsDir() || !shouldValidateVersion(v.Name()) {
			continue
		}
		constructs, err := os.ReadDir(filepath.Join(constructsDir, v.Name()))
		if err != nil {
			continue
		}
		for _, c := range constructs {
			apiPath := filepath.Join(constructsDir, v.Name(), c.Name(), "api.yml")
			if !c.IsDir() || !fileExists(apiPath) {
				continue
			}
			doc, err := loadAPISpec(apiPath)
			if err != nil || doc == nil || isDeprecatedDoc(doc) {
				continue
			}
			fn(relativeToRoot(apiPath, rootDir), doc)
		}
	}
}

func fileExists(path string) bool {
	info, err := os.Stat(path)
	return err == nil && !info.IsDir()
}

// auditMcpOperations applies Rule 48 across every bundled construct api.yml.
func auditMcpOperations(opts AuditOptions, baseline map[string]bool, result *AuditResult) {
	walkBundledConstructDocs(opts.RootDir, func(relPath string, doc *openapi3.T) {
		for _, v := range checkRule48(relPath, doc, opts) {
			addViolation(result, v, baseline)
		}
	})
}

func docHasMcpOperation(doc *openapi3.T) bool {
	for _, item := range doc.Paths.Map() {
		for _, method := range httpMethods {
			if op := getOperation(item, method); op != nil {
				if _, ok := op.Extensions[mcpExtension]; ok {
					return true
				}
			}
		}
	}
	return false
}

// lintMcpOperations applies Rule 48 to every operation of doc that carries
// x-mcp, against the defined scopes.
func lintMcpOperations(filePath string, doc *openapi3.T, scopes map[string]bool) []Violation {
	var out []Violation
	paths := doc.Paths.Map()
	routes := make([]string, 0, len(paths))
	for route := range paths {
		routes = append(routes, route)
	}
	sort.Strings(routes)
	for _, route := range routes {
		item := paths[route]
		for _, method := range httpMethods {
			op := getOperation(item, method)
			if op == nil {
				continue
			}
			raw, ok := op.Extensions[mcpExtension]
			if !ok {
				continue
			}
			label := fmt.Sprintf("%s %s", strings.ToUpper(method), route)
			if op.OperationID != "" {
				label = fmt.Sprintf("%s (%s)", label, op.OperationID)
			}
			fail := func(format string, args ...any) {
				out = append(out, Violation{File: filePath,
					Message:  fmt.Sprintf("%s - x-mcp: %s", label, fmt.Sprintf(format, args...)),
					Severity: SeverityBlocking, RuleNumber: 48})
			}

			if op.OperationID == "" {
				fail("the operation has no operationId; the tool name is the operationId")
			}
			if why, forbidden := mcpForbiddenOperationIDs[op.OperationID]; forbidden {
				fail("%s must not carry x-mcp: %s", op.OperationID, why)
			}
			if method == "delete" {
				fail("a DELETE operation must not carry x-mcp: the hosted server exposes no delete tool")
			}
			if !hasJSONSuccessResponse(op) {
				fail("the operation has no 2xx response with an application/json schema; the tool's output schema comes from it")
			}
			if !acceptsOptionalHeader(item, op, mcpOrganizationField) {
				fail("the operation does not accept the optional %s header (reference the shared currentOrgId parameter)", mcpOrganizationField)
			}

			value, isMap := raw.(map[string]any)
			if !isMap {
				fail("the value must be an object with expose and scope (schemas/extensions/mcp-operation.yaml)")
				continue
			}
			if expose, present := value["expose"]; !present {
				fail("expose is required")
			} else if _, isBool := expose.(bool); !isBool {
				fail("expose must be a boolean")
			}
			if title, present := value["title"]; present {
				if s, isString := title.(string); !isString || s == "" {
					fail("title must be a non-empty string when present")
				}
			}
			scope, hasScope := value["scope"]
			switch {
			case !hasScope:
				fail("the operation has no scope mapping; scope must be one of %s", strings.Join(sortedScopeNames(scopes), ", "))
			case !isDefinedScope(scope, scopes):
				fail("scope %v is not a defined scope; it must be one of %s", scope, strings.Join(sortedScopeNames(scopes), ", "))
			}
			for key := range value {
				switch key {
				case "expose", "title", "scope":
				default:
					fail("unknown key %q; tool hints derive from the HTTP method and are never written by hand", key)
				}
			}
		}
	}
	return out
}

func isDefinedScope(scope any, scopes map[string]bool) bool {
	s, ok := scope.(string)
	return ok && scopes[s]
}

func sortedScopeNames(m map[string]bool) []string {
	keys := make([]string, 0, len(m))
	for k := range m {
		keys = append(keys, k)
	}
	sort.Strings(keys)
	return keys
}

// hasJSONSuccessResponse reports whether the operation declares a 2xx response
// whose application/json content has a schema.
func hasJSONSuccessResponse(op *openapi3.Operation) bool {
	if op.Responses == nil {
		return false
	}
	for code, ref := range op.Responses.Map() {
		if !strings.HasPrefix(code, "2") || ref == nil || ref.Value == nil {
			continue
		}
		if media := ref.Value.Content.Get("application/json"); media != nil && media.Schema != nil {
			return true
		}
	}
	return false
}

// acceptsOptionalHeader reports whether the operation (or its path item)
// declares the named header parameter, and not as required.
func acceptsOptionalHeader(item *openapi3.PathItem, op *openapi3.Operation, name string) bool {
	for _, params := range []openapi3.Parameters{item.Parameters, op.Parameters} {
		for _, ref := range params {
			if ref == nil || ref.Value == nil {
				continue
			}
			p := ref.Value
			if p.In == "header" && strings.EqualFold(p.Name, name) && !p.Required {
				return true
			}
		}
	}
	return false
}
