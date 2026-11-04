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
//	<tmp>/v1/doc/doc.yaml           an OpenAPI document with one schema, Thing
//	<tmp>/v1/doc-noversion/doc.yaml an OpenAPI document whose `openapi` key is empty
//	<tmp>/v1/plain/plain.yaml       a plain JSON Schema file
//	<tmp>/v1/caller/api.yml         the file whose refs are checked (path only)
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
	write("v1/doc-noversion/doc.yaml", `openapi:
info:
  title: Doc
  version: v1
paths: {}
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
		// wantText lists text every violation message must contain.
		wantText []string
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
			wantText:     []string{"openapi: 3.0.0", `"../doc/doc.yaml#/components/schemas/<SchemaName>"`},
		},
		{
			name: "empty fragment still names the whole document",
			yaml: `components:
  schemas:
    Page:
      $ref: "../doc/doc.yaml#"
`,
			wantPointers: []string{"#/components/schemas/Page"},
			wantText:     []string{"openapi: 3.0.0", `"../doc/doc.yaml#/components/schemas/<SchemaName>"`},
		},
		{
			name: "an empty openapi value is reported as unknown",
			yaml: `components:
  schemas:
    Page:
      $ref: "../doc-noversion/doc.yaml"
`,
			wantPointers: []string{"#/components/schemas/Page"},
			wantText:     []string{"(openapi: unknown)"},
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
			name: "percent-encoded path is decoded before the check",
			yaml: `components:
  schemas:
    Page:
      $ref: "../doc/doc%2Eyaml"
`,
			wantPointers: []string{"#/components/schemas/Page"},
			wantText:     []string{"openapi: 3.0.0"},
		},
		{
			name: "path that does not percent-decode is left to other checks",
			yaml: `components:
  schemas:
    Page:
      $ref: "../doc/doc%zz.yaml"
`,
		},
		{
			// The bundler dereferences every $ref, including one inside an
			// example value, so it would inline the document there too.
			name: "a $ref inside an example value is checked too",
			yaml: `components:
  schemas:
    Page:
      type: object
      example:
        nested:
          $ref: "../doc/doc.yaml"
`,
			wantPointers: []string{"#/components/schemas/Page/example/nested"},
			wantText:     []string{"openapi: 3.0.0"},
		},
		{
			name: "remote ref with no fragment is flagged",
			yaml: `components:
  schemas:
    Page:
      $ref: "https://example.com/doc.yaml"
`,
			wantPointers: []string{"#/components/schemas/Page"},
			wantText:     []string{"is a remote URL with no fragment", `"https://example.com/doc.yaml#/components/schemas/<SchemaName>"`},
		},
		{
			name: "remote ref with an empty fragment is flagged",
			yaml: `components:
  schemas:
    Page:
      $ref: "https://example.com/doc.yaml#"
`,
			wantPointers: []string{"#/components/schemas/Page"},
			wantText:     []string{"is a remote URL with no fragment", `"https://example.com/doc.yaml#/components/schemas/<SchemaName>"`},
		},
		{
			name: "network-path ref with no fragment is flagged as remote",
			yaml: `components:
  schemas:
    Page:
      $ref: "//example.com/doc.yaml"
`,
			wantPointers: []string{"#/components/schemas/Page"},
			wantText:     []string{"is a remote URL with no fragment"},
		},
		{
			name: "remote ref with a fragment is allowed",
			yaml: `components:
  schemas:
    Page:
      $ref: "https://example.com/doc.yaml#/components/schemas/Thing"
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
			wantText: []string{"openapi: 3.0.0"},
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
				for _, text := range tc.wantText {
					if !strings.Contains(v.Message, text) {
						t.Errorf("violation %d: message should contain %q, got %q", i, text, v.Message)
					}
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

func TestIsRemoteWholeFileRef(t *testing.T) {
	cases := map[string]bool{
		"https://example.com/doc.yaml":                           true,
		"https://example.com/doc.yaml#":                          true,
		"https://example.com/doc.yaml#/components/schemas/Thing": false,
		"//example.com/doc.yaml":                                 true,
		"//example.com/doc.yaml#":                                true,
		"//example.com/doc.yaml#/components/schemas/Thing":       false,
		"../doc/doc.yaml":                                        false,
		"#/components/schemas/Thing":                             false,
		"":                                                       false,
	}
	for ref, want := range cases {
		if got := isRemoteWholeFileRef(ref); got != want {
			t.Errorf("isRemoteWholeFileRef(%q) = %v, want %v", ref, got, want)
		}
	}
}

func TestOpenAPIVersionOf(t *testing.T) {
	dir := t.TempDir()
	tests := []struct {
		name        string
		content     string // empty means the file is not written
		wantVersion string
		wantOpenAPI bool
	}{
		{name: "version", content: "openapi: 3.0.0\ninfo: {}\n", wantVersion: "3.0.0", wantOpenAPI: true},
		{name: "null value", content: "openapi:\ninfo: {}\n", wantVersion: "unknown", wantOpenAPI: true},
		{name: "empty string", content: "openapi: \"\"\ninfo: {}\n", wantVersion: "unknown", wantOpenAPI: true},
		{name: "plain schema", content: "type: object\n"},
		{name: "invalid YAML", content: "openapi: [\n"},
		{name: "missing file"},
	}
	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			path := filepath.Join(dir, strings.ReplaceAll(tc.name, " ", "-")+".yaml")
			if tc.content != "" {
				if err := os.WriteFile(path, []byte(tc.content), 0o644); err != nil {
					t.Fatal(err)
				}
			}
			version, isOpenAPI := openAPIVersionOf(path)
			if version != tc.wantVersion || isOpenAPI != tc.wantOpenAPI {
				t.Errorf("openAPIVersionOf = (%q, %v), want (%q, %v)", version, isOpenAPI, tc.wantVersion, tc.wantOpenAPI)
			}
		})
	}
}

// TestAuditRule48 runs the full Audit over a small repository tree, so it
// fails if Rule 48 stops covering any file kind (api.yml, entity schema,
// helper .yml), any version, or any load failure. The tree holds:
//
//	v1alpha1/target  an OpenAPI document that the other files point at whole
//	v1alpha1/widget  an older, non-deprecated version: checked
//	v1alpha2/widget  an older, deprecated version: not checked
//	v1alpha3/widget  an older version whose api.yml is not valid YAML: its
//	                 entity schema and helper are still checked
//	v1beta1/widget   the newest version: checked
//	v1beta1/broken   an api.yml that kin-openapi fails to load: still checked
//	v1beta1/legacy   a deprecated api.yml that kin-openapi fails to load:
//	                 not checked
//
// Each widget version and legacy have an api.yml, an entity schema and a
// helper .yml, each with a whole-document $ref.
func TestAuditRule48(t *testing.T) {
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

	write("schemas/constructs/v1alpha1/target/api.yml", `openapi: 3.0.0
info:
  title: Target
  version: v1alpha1
paths: {}
components:
  schemas:
    Thing:
      type: object
      properties:
        id:
          type: string
`)

	widgetAPI := func(version, infoExtra string) string {
		return `openapi: 3.0.0
info:
  title: Widget
  version: ` + version + `
` + infoExtra + `paths: {}
components:
  schemas:
    Widget:
      type: object
      properties:
        thing:
          $ref: "../../v1alpha1/target/api.yml"
`
	}
	const widgetEntity = `type: object
additionalProperties: false
properties:
  thing:
    $ref: "../../v1alpha1/target/api.yml"
required:
  - thing
`
	const widgetHelper = `collection:
  get:
    responses:
      "200":
        description: OK
        content:
          application/json:
            schema:
              $ref: "../../v1alpha1/target/api.yml"
`
	for _, w := range []struct{ version, api string }{
		{"v1alpha1", widgetAPI("v1alpha1", "")},
		{"v1alpha2", widgetAPI("v1alpha2", "  x-deprecated: true\n")},
		{"v1alpha3", "openapi: 3.0.0\ninfo: [\n"},
		{"v1beta1", widgetAPI("v1beta1", "")},
	} {
		dir := "schemas/constructs/" + w.version + "/widget/"
		write(dir+"api.yml", w.api)
		write(dir+"widget.yaml", widgetEntity)
		write(dir+"widget_operations.yml", widgetHelper)
	}

	// The $ref to a missing file makes the kin-openapi load fail.
	write("schemas/constructs/v1beta1/broken/api.yml", `openapi: 3.0.0
info:
  title: Broken
  version: v1beta1
paths: {}
components:
  schemas:
    Missing:
      $ref: "./missing.yaml#/Missing"
    Whole:
      $ref: "../../v1alpha1/target/api.yml"
`)

	// Deprecated, and the $ref to a missing file makes the kin-openapi load
	// fail, so only the raw api.yml says the version is deprecated.
	write("schemas/constructs/v1beta1/legacy/api.yml", `openapi: 3.0.0
info:
  title: Legacy
  version: v1beta1
  x-deprecated: true
paths: {}
components:
  schemas:
    Missing:
      $ref: "./missing.yaml#/Missing"
    Whole:
      $ref: "../../v1alpha1/target/api.yml"
`)
	write("schemas/constructs/v1beta1/legacy/legacy.yaml", widgetEntity)
	write("schemas/constructs/v1beta1/legacy/legacy_operations.yml", widgetHelper)

	result := Audit(AuditOptions{RootDir: root})

	got := map[string]int{}
	for _, v := range result.Blocking {
		if v.RuleNumber == 48 {
			got[v.File]++
		}
	}
	for _, v := range result.Advisory {
		if v.RuleNumber == 48 {
			t.Errorf("Rule 48 violation reported as advisory: %+v", v)
		}
	}

	// The broken and legacy fixtures only test their case if the typed load
	// really fails.
	loadFailed := map[string]bool{}
	for _, v := range result.Blocking {
		if v.RuleNumber == 12 {
			loadFailed[v.File] = true
		}
	}
	for _, file := range []string{
		"schemas/constructs/v1beta1/broken/api.yml",
		"schemas/constructs/v1beta1/legacy/api.yml",
	} {
		if !loadFailed[file] {
			t.Fatalf("fixture %s should fail to load (Rule 12)", file)
		}
	}

	want := []string{
		"schemas/constructs/v1alpha1/widget/api.yml",
		"schemas/constructs/v1alpha1/widget/widget.yaml",
		"schemas/constructs/v1alpha1/widget/widget_operations.yml",
		"schemas/constructs/v1alpha3/widget/widget.yaml",
		"schemas/constructs/v1alpha3/widget/widget_operations.yml",
		"schemas/constructs/v1beta1/broken/api.yml",
		"schemas/constructs/v1beta1/widget/api.yml",
		"schemas/constructs/v1beta1/widget/widget.yaml",
		"schemas/constructs/v1beta1/widget/widget_operations.yml",
	}
	for _, file := range want {
		if got[file] != 1 {
			t.Errorf("%s: got %d blocking Rule 48 violations, want 1", file, got[file])
		}
		delete(got, file)
	}
	for file, n := range got {
		t.Errorf("%s: got %d unexpected blocking Rule 48 violations", file, n)
	}
}
