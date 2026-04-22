package validation

import (
	"strings"
	"testing"

	"github.com/getkin/kin-openapi/openapi3"
)

// ---------------------------------------------------------------------------
// Rule 42: `format: file` is a Swagger 2.0 relic
// ---------------------------------------------------------------------------

func docWithTopLevelFormat(format string) *openapi3.T {
	schema := &openapi3.Schema{
		Type:   &openapi3.Types{"object"},
		Format: "",
		Properties: openapi3.Schemas{
			"attachment": &openapi3.SchemaRef{Value: &openapi3.Schema{
				Type:   &openapi3.Types{"string"},
				Format: format,
			}},
		},
	}
	return &openapi3.T{
		Components: &openapi3.Components{
			Schemas: openapi3.Schemas{"Payload": &openapi3.SchemaRef{Value: schema}},
		},
	}
}

func TestCheckRule42_FormatFileFlagged(t *testing.T) {
	doc := docWithTopLevelFormat("file")
	vs := checkRule42("api.yml", doc, AuditOptions{Strict: true})
	if len(vs) != 1 {
		t.Fatalf("expected 1 violation, got %d", len(vs))
	}
	if vs[0].RuleNumber != 42 {
		t.Errorf("expected rule 42, got %d", vs[0].RuleNumber)
	}
	if vs[0].Severity != SeverityBlocking {
		t.Errorf("expected blocking severity in strict mode, got %v", vs[0].Severity)
	}
	if !strings.Contains(vs[0].Message, "Swagger 2.0") {
		t.Errorf("expected message to mention Swagger 2.0, got: %q", vs[0].Message)
	}
	if !strings.Contains(vs[0].Message, "format: byte") {
		t.Errorf("expected remediation to mention format: byte, got: %q", vs[0].Message)
	}
}

func TestCheckRule42_FormatByteAllowed(t *testing.T) {
	doc := docWithTopLevelFormat("byte")
	vs := checkRule42("api.yml", doc, AuditOptions{Strict: true})
	if len(vs) != 0 {
		t.Errorf("expected no violation for format: byte, got %d", len(vs))
	}
}

func TestCheckRule42_FormatBinaryAllowed(t *testing.T) {
	doc := docWithTopLevelFormat("binary")
	vs := checkRule42("api.yml", doc, AuditOptions{Strict: true})
	if len(vs) != 0 {
		t.Errorf("expected no violation for format: binary, got %d", len(vs))
	}
}

func TestCheckRule42_AdvisoryByDefault(t *testing.T) {
	doc := docWithTopLevelFormat("file")
	vs := checkRule42("api.yml", doc, AuditOptions{})
	if len(vs) != 1 {
		t.Fatalf("expected 1 violation, got %d", len(vs))
	}
	if vs[0].Severity != SeverityAdvisory {
		t.Errorf("expected advisory severity outside strict mode, got %v", vs[0].Severity)
	}
}

func TestCheckRule42_NestedInOneOf(t *testing.T) {
	nested := &openapi3.Schema{
		Type: &openapi3.Types{"object"},
		OneOf: openapi3.SchemaRefs{
			{Value: &openapi3.Schema{
				Type: &openapi3.Types{"object"},
				Properties: openapi3.Schemas{
					"modelFile": {Value: &openapi3.Schema{
						Type:   &openapi3.Types{"string"},
						Format: "file",
					}},
				},
			}},
		},
	}
	doc := &openapi3.T{Components: &openapi3.Components{
		Schemas: openapi3.Schemas{"ImportBody": &openapi3.SchemaRef{Value: nested}},
	}}
	vs := checkRule42("api.yml", doc, AuditOptions{Strict: true})
	if len(vs) != 1 {
		t.Fatalf("expected 1 violation for nested format:file, got %d", len(vs))
	}
	if !strings.Contains(vs[0].Message, "ImportBody") {
		t.Errorf("expected breadcrumb to include schema name, got: %q", vs[0].Message)
	}
}

// ---------------------------------------------------------------------------
// Rule 43: `enum` on `type: object` with properties
// ---------------------------------------------------------------------------

func docWithEnumOnObject(enumValues []interface{}) *openapi3.T {
	schema := &openapi3.Schema{
		Type: &openapi3.Types{"object"},
		Properties: openapi3.Schemas{
			"file": {Value: &openapi3.Schema{Type: &openapi3.Types{"string"}}},
		},
		Enum: enumValues,
	}
	return &openapi3.T{Components: &openapi3.Components{
		Schemas: openapi3.Schemas{"Bad": &openapi3.SchemaRef{Value: schema}},
	}}
}

func TestCheckRule43_EnumOnObjectFlagged(t *testing.T) {
	doc := docWithEnumOnObject([]interface{}{"file", "url"})
	vs := checkRule43("api.yml", doc, AuditOptions{Strict: true})
	if len(vs) != 1 {
		t.Fatalf("expected 1 violation, got %d", len(vs))
	}
	if vs[0].RuleNumber != 43 {
		t.Errorf("expected rule 43, got %d", vs[0].RuleNumber)
	}
	if !strings.Contains(vs[0].Message, "oneOf") {
		t.Errorf("expected remediation to mention oneOf, got: %q", vs[0].Message)
	}
}

func TestCheckRule43_EnumOnStringAllowed(t *testing.T) {
	schema := &openapi3.Schema{
		Type: &openapi3.Types{"string"},
		Enum: []interface{}{"foo", "bar"},
	}
	doc := &openapi3.T{Components: &openapi3.Components{
		Schemas: openapi3.Schemas{"Status": &openapi3.SchemaRef{Value: schema}},
	}}
	vs := checkRule43("api.yml", doc, AuditOptions{Strict: true})
	if len(vs) != 0 {
		t.Errorf("expected no violation for enum on string, got %d", len(vs))
	}
}

func TestCheckRule43_ObjectWithoutEnumAllowed(t *testing.T) {
	schema := &openapi3.Schema{
		Type: &openapi3.Types{"object"},
		Properties: openapi3.Schemas{
			"name": {Value: &openapi3.Schema{Type: &openapi3.Types{"string"}}},
		},
	}
	doc := &openapi3.T{Components: &openapi3.Components{
		Schemas: openapi3.Schemas{"Obj": &openapi3.SchemaRef{Value: schema}},
	}}
	vs := checkRule43("api.yml", doc, AuditOptions{Strict: true})
	if len(vs) != 0 {
		t.Errorf("expected no violation for enum-free object, got %d", len(vs))
	}
}

// ---------------------------------------------------------------------------
// Rule 44: multipart/form-data without a binary property
// ---------------------------------------------------------------------------

func docWithRequestBodyContent(contentType string, schema *openapi3.Schema) *openapi3.T {
	media := openapi3.NewMediaType().WithSchema(schema)
	op := &openapi3.Operation{
		RequestBody: &openapi3.RequestBodyRef{Value: &openapi3.RequestBody{
			Content: openapi3.Content{contentType: media},
		}},
		Responses: openapi3.NewResponses(),
	}
	item := &openapi3.PathItem{Post: op}
	paths := openapi3.NewPaths()
	paths.Set("/things", item)
	return &openapi3.T{Paths: paths}
}

func TestCheckRule44_MultipartWithoutBinaryFlagged(t *testing.T) {
	schema := &openapi3.Schema{
		Type: &openapi3.Types{"object"},
		Properties: openapi3.Schemas{
			"name": {Value: &openapi3.Schema{Type: &openapi3.Types{"string"}}},
			"url":  {Value: &openapi3.Schema{Type: &openapi3.Types{"string"}}},
		},
	}
	doc := docWithRequestBodyContent("multipart/form-data", schema)
	vs := checkRule44("api.yml", doc, AuditOptions{Strict: true})
	if len(vs) != 1 {
		t.Fatalf("expected 1 violation, got %d", len(vs))
	}
	if vs[0].RuleNumber != 44 {
		t.Errorf("expected rule 44, got %d", vs[0].RuleNumber)
	}
}

func TestCheckRule44_MultipartWithBinaryAllowed(t *testing.T) {
	schema := &openapi3.Schema{
		Type: &openapi3.Types{"object"},
		Properties: openapi3.Schemas{
			"upload": {Value: &openapi3.Schema{
				Type:   &openapi3.Types{"string"},
				Format: "binary",
			}},
		},
	}
	doc := docWithRequestBodyContent("multipart/form-data", schema)
	vs := checkRule44("api.yml", doc, AuditOptions{Strict: true})
	if len(vs) != 0 {
		t.Errorf("expected no violation when binary field is present, got %d", len(vs))
	}
}

func TestCheckRule44_ApplicationJSONIgnored(t *testing.T) {
	schema := &openapi3.Schema{
		Type: &openapi3.Types{"object"},
		Properties: openapi3.Schemas{
			"name": {Value: &openapi3.Schema{Type: &openapi3.Types{"string"}}},
		},
	}
	doc := docWithRequestBodyContent("application/json", schema)
	vs := checkRule44("api.yml", doc, AuditOptions{Strict: true})
	if len(vs) != 0 {
		t.Errorf("expected no violation for JSON content-type, got %d", len(vs))
	}
}
