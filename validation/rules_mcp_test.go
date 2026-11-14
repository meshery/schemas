package validation

import (
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/getkin/kin-openapi/openapi3"
)

// Rule 48 fails an operation that carries x-mcp unless a hosted MCP tool can
// be generated from it. Each test below builds a small spec around one
// operation, so a failure case differs from the passing case by one thing.

var testMcpScopes = map[string]bool{"content:read": true, "content:write": true}

// mcpSpec renders a spec with one operation. Each argument replaces a part of
// the passing operation; "" keeps the part as it is in the passing case.
type mcpOp struct {
	method      string
	operationID string
	xmcp        string
	responses   string
	parameters  string
}

func passingMcpOp() mcpOp {
	return mcpOp{
		method:      "get",
		operationID: "operationId: listThings",
		xmcp: `x-mcp:
        expose: true
        title: List things
        scope: content:read`,
		responses: `"200":
          description: Things
          content:
            application/json:
              schema:
                type: object`,
		parameters: `parameters:
        - name: X-Current-Orgid
          in: header
          required: false
          schema:
            type: string`,
	}
}

func loadMcpSpec(t *testing.T, op mcpOp) *openapi3.T {
	t.Helper()
	var lines []string
	lines = append(lines, "openapi: 3.0.0", "info:", "  title: Things", "  version: v1beta3", "paths:", "  /api/things:")
	lines = append(lines, "    "+op.method+":", "      x-internal: [\"cloud\"]")
	for _, part := range []string{op.operationID, op.xmcp, op.parameters} {
		if part != "" {
			lines = append(lines, "      "+part)
		}
	}
	lines = append(lines, "      responses:")
	if op.responses != "" {
		lines = append(lines, "        "+op.responses)
	} else {
		lines = append(lines, "        \"204\":", "          description: none")
	}
	loader := openapi3.NewLoader()
	doc, err := loader.LoadFromData([]byte(strings.Join(lines, "\n") + "\n"))
	if err != nil {
		t.Fatalf("load spec: %v\n%s", err, strings.Join(lines, "\n"))
	}
	return doc
}

func lintMcpOp(t *testing.T, op mcpOp) []Violation {
	t.Helper()
	return lintMcpOperations("things/api.yml", loadMcpSpec(t, op), testMcpScopes)
}

func requireMcpViolation(t *testing.T, vs []Violation, want string) {
	t.Helper()
	if len(vs) == 0 {
		t.Fatalf("expected a violation mentioning %q, got none", want)
	}
	for _, v := range vs {
		if v.RuleNumber != 48 || v.Severity != SeverityBlocking {
			t.Errorf("violation must be blocking Rule 48, got rule %d severity %v: %s", v.RuleNumber, v.Severity, v.Message)
		}
		if strings.Contains(v.Message, want) {
			return
		}
	}
	t.Fatalf("no violation mentions %q; got %v", want, vs)
}

func TestRule48_PassingOperation(t *testing.T) {
	if vs := lintMcpOp(t, passingMcpOp()); len(vs) != 0 {
		t.Fatalf("a complete x-mcp operation must pass, got %v", vs)
	}
}

func TestRule48_OperationWithoutXMcpIsIgnored(t *testing.T) {
	op := passingMcpOp()
	op.xmcp, op.operationID, op.parameters, op.responses = "", "", "", ""
	if vs := lintMcpOp(t, op); len(vs) != 0 {
		t.Fatalf("Rule 48 applies only to operations that carry x-mcp, got %v", vs)
	}
}

func TestRule48_MissingOperationID(t *testing.T) {
	op := passingMcpOp()
	op.operationID = ""
	requireMcpViolation(t, lintMcpOp(t, op), "no operationId")
}

func TestRule48_NoSuccessResponseWithJSONSchema(t *testing.T) {
	cases := map[string]string{
		"only a 204": `"204":
          description: Nothing`,
		"a 2xx that is not JSON": `"200":
          description: Text
          content:
            text/plain:
              schema:
                type: string`,
		"a JSON 2xx with no schema": `"200":
          description: No schema
          content:
            application/json: {}`,
		"a JSON schema only on a 4xx": `"400":
          description: Bad
          content:
            application/json:
              schema:
                type: object`,
	}
	for name, responses := range cases {
		t.Run(name, func(t *testing.T) {
			op := passingMcpOp()
			op.responses = responses
			requireMcpViolation(t, lintMcpOp(t, op), "no 2xx response with an application/json schema")
		})
	}
}

func TestRule48_ScopeMapping(t *testing.T) {
	t.Run("scope missing", func(t *testing.T) {
		op := passingMcpOp()
		op.xmcp = `x-mcp:
        expose: true`
		requireMcpViolation(t, lintMcpOp(t, op), "no scope mapping")
	})
	t.Run("scope not defined", func(t *testing.T) {
		op := passingMcpOp()
		op.xmcp = `x-mcp:
        expose: true
        scope: content:admin`
		requireMcpViolation(t, lintMcpOp(t, op), "scope content:admin is not a defined scope")
	})
	t.Run("scope not a string", func(t *testing.T) {
		op := passingMcpOp()
		op.xmcp = `x-mcp:
        expose: true
        scope: 7`
		requireMcpViolation(t, lintMcpOp(t, op), "is not a defined scope")
	})
	t.Run("the message names the operation", func(t *testing.T) {
		op := passingMcpOp()
		op.xmcp = `x-mcp:
        expose: true`
		requireMcpViolation(t, lintMcpOp(t, op), "listThings")
	})
}

func TestRule48_ApproveAndDenyAreNeverTools(t *testing.T) {
	for _, id := range []string{"approveRequest", "denyRequest"} {
		t.Run(id, func(t *testing.T) {
			op := passingMcpOp()
			op.method = "post"
			op.operationID = "operationId: " + id
			requireMcpViolation(t, lintMcpOp(t, op), id+" must not carry x-mcp")
		})
	}
	t.Run("even when exposed false", func(t *testing.T) {
		op := passingMcpOp()
		op.method = "post"
		op.operationID = "operationId: approveRequest"
		op.xmcp = `x-mcp:
        expose: false
        scope: content:write`
		requireMcpViolation(t, lintMcpOp(t, op), "approveRequest must not carry x-mcp")
	})
	t.Run("a sibling mutation is allowed", func(t *testing.T) {
		op := passingMcpOp()
		op.method = "post"
		op.operationID = "operationId: insertThing"
		if vs := lintMcpOp(t, op); len(vs) != 0 {
			t.Fatalf("a POST create is a valid tool, got %v", vs)
		}
	})
}

func TestRule48_DeleteIsNeverATool(t *testing.T) {
	op := passingMcpOp()
	op.method = "delete"
	op.operationID = "operationId: deleteThing"
	requireMcpViolation(t, lintMcpOp(t, op), "DELETE operation must not carry x-mcp")
}

func TestRule48_OrganizationSelector(t *testing.T) {
	t.Run("absent", func(t *testing.T) {
		op := passingMcpOp()
		op.parameters = ""
		requireMcpViolation(t, lintMcpOp(t, op), "X-Current-Orgid")
	})
	t.Run("required", func(t *testing.T) {
		op := passingMcpOp()
		op.parameters = `parameters:
        - name: X-Current-Orgid
          in: header
          required: true
          schema:
            type: string`
		requireMcpViolation(t, lintMcpOp(t, op), "X-Current-Orgid")
	})
	t.Run("a query parameter of the same name does not count", func(t *testing.T) {
		op := passingMcpOp()
		op.parameters = `parameters:
        - name: X-Current-Orgid
          in: query
          schema:
            type: string`
		requireMcpViolation(t, lintMcpOp(t, op), "X-Current-Orgid")
	})
}

// acceptsOptionalHeader must let an operation-level declaration override the
// path-level one, the way OpenAPI does for a parameter with the same name and
// location.
func TestRule48_OrganizationSelectorOverride(t *testing.T) {
	const optionalPathLevel = `  /api/things:
    parameters:
      - name: X-Current-Orgid
        in: header
        required: false
        schema:
          type: string
    get:
      x-internal: ["cloud"]
      operationId: listThings
      responses:
        "204":
          description: none
`
	cases := []struct {
		name string
		spec string
		want bool
	}{
		{
			name: "path-level optional, operation-level required is not optional",
			spec: `  /api/things:
    parameters:
      - name: X-Current-Orgid
        in: header
        required: false
        schema:
          type: string
    get:
      x-internal: ["cloud"]
      operationId: listThings
      parameters:
        - name: X-Current-Orgid
          in: header
          required: true
          schema:
            type: string
      responses:
        "204":
          description: none
`,
			want: false,
		},
		{
			name: "path-level optional only is optional",
			spec: optionalPathLevel,
			want: true,
		},
		{
			name: "operation-level optional is optional",
			spec: `  /api/things:
    get:
      x-internal: ["cloud"]
      operationId: listThings
      parameters:
        - name: X-Current-Orgid
          in: header
          required: false
          schema:
            type: string
      responses:
        "204":
          description: none
`,
			want: true,
		},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			doc := "openapi: 3.0.0\ninfo:\n  title: Things\n  version: v1beta3\npaths:\n" + tc.spec
			loaded, err := openapi3.NewLoader().LoadFromData([]byte(doc))
			if err != nil {
				t.Fatalf("load spec: %v\n%s", err, doc)
			}
			item := loaded.Paths.Find("/api/things")
			if got := acceptsOptionalHeader(item, item.Get, mcpOrganizationField); got != tc.want {
				t.Errorf("acceptsOptionalHeader = %v, want %v", got, tc.want)
			}
		})
	}
}

func TestRule48_ValueShape(t *testing.T) {
	t.Run("expose missing", func(t *testing.T) {
		op := passingMcpOp()
		op.xmcp = `x-mcp:
        scope: content:read`
		requireMcpViolation(t, lintMcpOp(t, op), "expose is required")
	})
	t.Run("expose not a boolean", func(t *testing.T) {
		op := passingMcpOp()
		op.xmcp = `x-mcp:
        expose: "yes"
        scope: content:read`
		requireMcpViolation(t, lintMcpOp(t, op), "expose must be a boolean")
	})
	t.Run("hand-written hint flags are refused", func(t *testing.T) {
		for _, key := range []string{"readOnly", "destructive", "idempotent"} {
			op := passingMcpOp()
			op.xmcp = "x-mcp:\n        expose: true\n        scope: content:read\n        " + key + ": true"
			requireMcpViolation(t, lintMcpOp(t, op), `unknown key "`+key+`"`)
		}
	})
	t.Run("not an object", func(t *testing.T) {
		op := passingMcpOp()
		op.xmcp = `x-mcp: true`
		requireMcpViolation(t, lintMcpOp(t, op), "the value must be an object")
	})
	t.Run("empty title", func(t *testing.T) {
		op := passingMcpOp()
		op.xmcp = `x-mcp:
        expose: true
        title: ""
        scope: content:read`
		requireMcpViolation(t, lintMcpOp(t, op), "title must be a non-empty string")
	})
}

// The scopes the rule accepts are read from the extension schema, so adding a
// scope there is the only way to define one.
func TestRule48_ScopesComeFromTheExtensionSchema(t *testing.T) {
	scopes, err := loadMcpScopes(repoRootDir(t))
	if err != nil {
		t.Fatalf("load scopes: %v", err)
	}
	for _, want := range []string{"content:read", "content:write", "schedule:read", "schedule:write", "connections:read", "events:read", "account:read"} {
		if !scopes[want] {
			t.Errorf("scope %q is not defined by %s", want, mcpExtensionSchema)
		}
	}
	if len(scopes) != 7 {
		t.Errorf("expected the 7 generic scopes, got %d: %v", len(scopes), sortedScopeNames(scopes))
	}
}

// mcpWalkFixture builds a minimal schemas/constructs tree: a good spec, a
// spec that fails to load, and a deprecated spec carrying an x-mcp operation
// that would fail Rule 48 (no scope) if it were checked.
func mcpWalkFixture(t *testing.T) string {
	t.Helper()
	root := t.TempDir()
	write := func(rel, content string) {
		t.Helper()
		path := filepath.Join(root, rel)
		if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
			t.Fatalf("mkdir %s: %v", path, err)
		}
		if err := os.WriteFile(path, []byte(content), 0o644); err != nil {
			t.Fatalf("write %s: %v", path, err)
		}
	}
	write("schemas/constructs/v1beta3/good/api.yml", `openapi: 3.0.0
info:
  title: Good
  version: v1beta3
paths:
  /api/good:
    get:
      x-internal: ["cloud"]
      operationId: listGood
      responses:
        "200":
          description: Good
          content:
            application/json:
              schema:
                type: object
`)
	write("schemas/constructs/v1beta3/broken/api.yml", `openapi: 3.0.0
info:
  title: Broken
  version: v1beta3
paths:
  /api/broken:
    get: [unclosed
`)
	write("schemas/constructs/v1beta3/old/api.yml", `openapi: 3.0.0
info:
  title: Old
  version: v1beta3
  x-deprecated: true
paths:
  /api/old:
    get:
      x-internal: ["cloud"]
      operationId: oldThing
      x-mcp:
        expose: true
      responses:
        "200":
          description: Old
          content:
            application/json:
              schema:
                type: object
`)
	return root
}

// A spec that fails to load is visited with its load error, not silently
// skipped, while a deprecated spec is still skipped without a word.
func TestWalkBundledConstructDocs_ReportsLoadErrors(t *testing.T) {
	root := mcpWalkFixture(t)
	visited := map[string]bool{}
	var loadErrs []string
	walkBundledConstructDocs(root, func(relPath string, doc *openapi3.T, loadErr error) {
		if loadErr != nil {
			if doc != nil {
				t.Errorf("%s: a failed load must visit with a nil doc", relPath)
			}
			loadErrs = append(loadErrs, relPath)
			return
		}
		visited[relPath] = true
	})
	if len(loadErrs) != 1 || loadErrs[0] != "schemas/constructs/v1beta3/broken/api.yml" {
		t.Fatalf("load errors = %v, want exactly the broken spec", loadErrs)
	}
	if !visited["schemas/constructs/v1beta3/good/api.yml"] {
		t.Errorf("the good spec was not visited: %v", visited)
	}
	if visited["schemas/constructs/v1beta3/old/api.yml"] {
		t.Errorf("a deprecated spec must still be skipped")
	}
}

// auditMcpOperations reports a spec it could not load as a blocking Rule 48
// violation, so the unchecked operations cannot pass silently.
func TestAuditMcpOperations_ReportsLoadErrors(t *testing.T) {
	root := mcpWalkFixture(t)
	var result AuditResult
	auditMcpOperations(AuditOptions{RootDir: root}, map[string]bool{}, &result)
	if len(result.Blocking) != 1 {
		t.Fatalf("blocking violations = %v, want exactly the load failure", result.Blocking)
	}
	v := result.Blocking[0]
	if v.RuleNumber != 48 || v.Severity != SeverityBlocking {
		t.Errorf("violation must be blocking Rule 48, got rule %d severity %v: %s", v.RuleNumber, v.Severity, v.Message)
	}
	if !strings.Contains(v.File, "broken/api.yml") || !strings.Contains(v.Message, "could not be loaded") {
		t.Errorf("violation must name the broken spec and its unchecked operations, got %s %s", v.File, v.Message)
	}
}
