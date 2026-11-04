package validation

import (
	"os"
	"path/filepath"
	"strings"
	"testing"

	"gopkg.in/yaml.v3"
)

// rule48Fixture writes a small construct tree into a temp dir:
//
//	<tmp>/v1/doc/doc.yaml     an OpenAPI document with one schema, Thing
//	<tmp>/v1/plain/plain.yaml a plain JSON Schema file
//	<tmp>/v1/caller/api.yml   the file whose refs are checked (path only)
//
// and returns the path of the caller file. Refs in the test cases are
// relative to the caller's directory, as they are in real api.yml files.
func rule48Fixture(t *testing.T) string {
	t.Helper()
	root := t.TempDir()
	write := func(rel, content string) {
		t.Helper()
		p := filepath.Join(root, filepath.FromSlash(rel))
		if err := os.MkdirAll(filepath.Dir(p), 0o755); err != nil {
			t.Fatal(err)
		}
		if err := os.WriteFile(p, []byte(content), 0o644); err != nil {
			t.Fatal(err)
		}
	}
	write("v1/doc/doc.yaml", `openapi: 3.0.0
info:
  title: Doc
  version: v1
paths: {}
components:
  schemas:
    Thing:
      type: object
      properties:
        id:
          type: string
`)
	write("v1/plain/plain.yaml", `type: object
properties:
  name:
    type: string
`)
	return filepath.Join(root, "v1", "caller", "api.yml")
}

// rule48Doc parses a YAML snippet into the raw form checkRule48 receives.
func rule48Doc(t *testing.T, src string) map[string]any {
	t.Helper()
	var doc map[string]any
	if err := yaml.Unmarshal([]byte(src), &doc); err != nil {
		t.Fatalf("parse test YAML: %v", err)
	}
	return doc
}

func TestCheckRule48(t *testing.T) {
	callerPath := rule48Fixture(t)

	tests := []struct {
		name string
		yaml string
		// wantPointers lists the JSON pointers expected in violation
		// messages, in order. Empty means no violation.
		wantPointers []string
	}{
		{
			name: "whole-file ref to an OpenAPI document is flagged",
			yaml: `components:
  schemas:
    Page:
      type: object
      properties:
        items:
          type: array
          items:
            $ref: "../doc/doc.yaml"
`,
			wantPointers: []string{"#/components/schemas/Page/properties/items/items"},
		},
		{
			name: "empty fragment still names the whole document",
			yaml: `components:
  schemas:
    Page:
      $ref: "../doc/doc.yaml#"
`,
			wantPointers: []string{"#/components/schemas/Page"},
		},
		{
			name: "fragment ref into the same OpenAPI document is allowed",
			yaml: `components:
  schemas:
    Page:
      type: object
      properties:
        items:
          type: array
          items:
            $ref: "../doc/doc.yaml#/components/schemas/Thing"
`,
		},
		{
			name: "whole-file ref to a plain schema file is allowed",
			yaml: `components:
  schemas:
    Page:
      type: object
      properties:
        item:
          $ref: "../plain/plain.yaml"
`,
		},
		{
			name: "local ref is allowed",
			yaml: `components:
  schemas:
    Page:
      $ref: "#/components/schemas/Other"
    Other:
      type: object
`,
		},
		{
			name: "remote ref is not followed",
			yaml: `components:
  schemas:
    Page:
      $ref: "https://example.com/doc.yaml"
`,
		},
		{
			name: "ref to a missing file is left to other checks",
			yaml: `components:
  schemas:
    Page:
      $ref: "../missing/missing.yaml"
`,
		},
		{
			name: "refs outside components are checked too, in a stable order",
			yaml: `paths:
  /api/things:
    get:
      responses:
        200:
          description: OK
          content:
            application/json:
              schema:
                allOf:
                  - $ref: "../plain/plain.yaml"
                  - $ref: "../doc/doc.yaml"
components:
  schemas:
    Page:
      $ref: "../doc/doc.yaml"
`,
			wantPointers: []string{
				"#/components/schemas/Page",
				"#/paths/~1api~1things/get/responses/200/content/application~1json/schema/allOf/1",
			},
		},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			vs := checkRule48("v1/caller/api.yml", callerPath, rule48Doc(t, tc.yaml))
			if len(vs) != len(tc.wantPointers) {
				t.Fatalf("got %d violations, want %d: %+v", len(vs), len(tc.wantPointers), vs)
			}
			for i, v := range vs {
				if v.RuleNumber != 48 {
					t.Errorf("violation %d: RuleNumber = %d, want 48", i, v.RuleNumber)
				}
				if v.Severity != SeverityBlocking {
					t.Errorf("violation %d: Severity = %v, want blocking", i, v.Severity)
				}
				if v.File != "v1/caller/api.yml" {
					t.Errorf("violation %d: File = %q, want the caller's path", i, v.File)
				}
				if !strings.HasPrefix(v.Message, tc.wantPointers[i]+" - ") {
					t.Errorf("violation %d: message should start with %q, got %q", i, tc.wantPointers[i], v.Message)
				}
				if !strings.Contains(v.Message, "openapi: 3.0.0") {
					t.Errorf("violation %d: message should name the target's openapi version, got %q", i, v.Message)
				}
			}
		})
	}
}

func TestCheckRule48_NilDoc(t *testing.T) {
	if vs := checkRule48("api.yml", "api.yml", nil); len(vs) != 0 {
		t.Errorf("expected no violations for a nil document, got %+v", vs)
	}
}

func TestEscapeJSONPointerToken(t *testing.T) {
	cases := map[string]string{
		"plain":                       "plain",
		"/api/registry/relationships": "~1api~1registry~1relationships",
		"a~b":                         "a~0b",
		"~/":                          "~0~1",
	}
	for in, want := range cases {
		if got := escapeJSONPointerToken(in); got != want {
			t.Errorf("escapeJSONPointerToken(%q) = %q, want %q", in, got, want)
		}
	}
}
