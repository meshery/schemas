package validation

import (
	"strings"
	"testing"

	"github.com/getkin/kin-openapi/openapi3"
)

// ---------------------------------------------------------------------------
// Rule 1: Entity schemas must have additionalProperties: false
// ---------------------------------------------------------------------------

func TestCheckRule1_MissingAdditionalProperties(t *testing.T) {
	entity := &entitySchema{Type: "object"}
	vs := checkRule1("entity.yaml", entity, AuditOptions{})
	if len(vs) != 1 {
		t.Fatalf("expected 1 violation, got %d", len(vs))
	}
	if vs[0].RuleNumber != 1 {
		t.Errorf("expected rule 1, got %d", vs[0].RuleNumber)
	}
	if vs[0].Severity != SeverityBlocking {
		t.Errorf("expected blocking severity")
	}
}

func TestCheckRule1_AdditionalPropertiesTrue(t *testing.T) {
	tr := true
	entity := &entitySchema{Type: "object", AdditionalProperties: &tr}
	vs := checkRule1("entity.yaml", entity, AuditOptions{})
	if len(vs) != 1 {
		t.Fatalf("expected 1 violation when additionalProperties is true, got %d", len(vs))
	}
}

func TestCheckRule1_AdditionalPropertiesFalse(t *testing.T) {
	f := false
	entity := &entitySchema{Type: "object", AdditionalProperties: &f}
	vs := checkRule1("entity.yaml", entity, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations when additionalProperties is false, got %d", len(vs))
	}
}

func TestCheckRule1_NonObjectType(t *testing.T) {
	entity := &entitySchema{Type: "string"}
	vs := checkRule1("entity.yaml", entity, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations for non-object type, got %d", len(vs))
	}
}

func TestCheckRule1_NilEntity(t *testing.T) {
	vs := checkRule1("entity.yaml", nil, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations for nil entity, got %d", len(vs))
	}
}

// ---------------------------------------------------------------------------
// Rule 2: POST/PUT requestBody must not require server-generated fields
// ---------------------------------------------------------------------------

func makeDocWithRequestBody(method, path string, required []string) *openapi3.T {
	schema := &openapi3.Schema{
		Type:     &openapi3.Types{"object"},
		Required: required,
	}
	mediaType := openapi3.NewMediaType().WithSchema(schema)
	reqBody := &openapi3.RequestBody{
		Content: openapi3.Content{"application/json": mediaType},
	}
	op := &openapi3.Operation{
		RequestBody: &openapi3.RequestBodyRef{Value: reqBody},
		Responses:   openapi3.NewResponses(),
	}

	pathItem := &openapi3.PathItem{}
	switch strings.ToUpper(method) {
	case "POST":
		pathItem.Post = op
	case "PUT":
		pathItem.Put = op
	case "PATCH":
		pathItem.Patch = op
	}

	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
		Paths:   openapi3.NewPaths(),
	}
	doc.Paths.Set(path, pathItem)
	return doc
}

func TestCheckRule2_ServerFieldInRequired(t *testing.T) {
	doc := makeDocWithRequestBody("POST", "/api/items", []string{"name", "created_at"})
	vs := checkRule2("api.yml", doc, AuditOptions{})
	if len(vs) != 1 {
		t.Fatalf("expected 1 violation for created_at in required, got %d", len(vs))
	}
	if vs[0].RuleNumber != 2 {
		t.Errorf("expected rule 2, got %d", vs[0].RuleNumber)
	}
	if !strings.Contains(vs[0].Message, "created_at") {
		t.Errorf("expected message to mention created_at, got %q", vs[0].Message)
	}
}

func TestCheckRule2_MultipleServerFields(t *testing.T) {
	doc := makeDocWithRequestBody("PUT", "/api/items/{id}", []string{"created_at", "updated_at"})
	vs := checkRule2("api.yml", doc, AuditOptions{})
	if len(vs) != 2 {
		t.Fatalf("expected 2 violations for two server-generated fields, got %d", len(vs))
	}
}

func TestCheckRule2_NoServerFields(t *testing.T) {
	doc := makeDocWithRequestBody("POST", "/api/items", []string{"name", "description"})
	vs := checkRule2("api.yml", doc, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations with only client fields, got %d", len(vs))
	}
}

func TestCheckRule2_PatchMethod(t *testing.T) {
	doc := makeDocWithRequestBody("PATCH", "/api/items/{id}", []string{"deleted_at"})
	vs := checkRule2("api.yml", doc, AuditOptions{})
	if len(vs) != 1 {
		t.Fatalf("expected 1 violation for PATCH with deleted_at, got %d", len(vs))
	}
}

func TestCheckRule2_NilDoc(t *testing.T) {
	vs := checkRule2("api.yml", nil, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations for nil doc, got %d", len(vs))
	}
}

func TestCheckRule2_NoPaths(t *testing.T) {
	doc := &openapi3.T{OpenAPI: "3.0.0", Info: &openapi3.Info{Title: "T", Version: "v1"}}
	vs := checkRule2("api.yml", doc, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations when no paths, got %d", len(vs))
	}
}

// ---------------------------------------------------------------------------
// Rule 5: DELETE must not have a requestBody
// ---------------------------------------------------------------------------

func TestCheckRule5_DeleteWithBody(t *testing.T) {
	reqBody := &openapi3.RequestBody{
		Content: openapi3.Content{
			"application/json": openapi3.NewMediaType().WithSchema(openapi3.NewObjectSchema()),
		},
	}
	pathItem := &openapi3.PathItem{
		Delete: &openapi3.Operation{
			RequestBody: &openapi3.RequestBodyRef{Value: reqBody},
			Responses:   openapi3.NewResponses(),
		},
	}
	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
		Paths:   openapi3.NewPaths(),
	}
	doc.Paths.Set("/api/items", pathItem)

	vs := checkRule5("api.yml", doc, AuditOptions{})
	if len(vs) != 1 {
		t.Fatalf("expected 1 violation for DELETE with requestBody, got %d", len(vs))
	}
	if vs[0].RuleNumber != 5 {
		t.Errorf("expected rule 5, got %d", vs[0].RuleNumber)
	}
	if vs[0].Severity != SeverityBlocking {
		t.Errorf("expected blocking severity")
	}
}

func TestCheckRule5_DeleteWithoutBody(t *testing.T) {
	pathItem := &openapi3.PathItem{
		Delete: &openapi3.Operation{Responses: openapi3.NewResponses()},
	}
	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
		Paths:   openapi3.NewPaths(),
	}
	doc.Paths.Set("/api/items/{itemId}", pathItem)

	vs := checkRule5("api.yml", doc, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations for DELETE without body, got %d", len(vs))
	}
}

func TestCheckRule5_NilDoc(t *testing.T) {
	vs := checkRule5("api.yml", nil, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations for nil doc, got %d", len(vs))
	}
}

func TestCheckRule5_MultipleDeletePaths(t *testing.T) {
	reqBody := &openapi3.RequestBody{
		Content: openapi3.Content{
			"application/json": openapi3.NewMediaType().WithSchema(openapi3.NewObjectSchema()),
		},
	}
	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
		Paths:   openapi3.NewPaths(),
	}
	doc.Paths.Set("/api/a", &openapi3.PathItem{
		Delete: &openapi3.Operation{
			RequestBody: &openapi3.RequestBodyRef{Value: reqBody},
			Responses:   openapi3.NewResponses(),
		},
	})
	doc.Paths.Set("/api/b", &openapi3.PathItem{
		Delete: &openapi3.Operation{
			RequestBody: &openapi3.RequestBodyRef{Value: reqBody},
			Responses:   openapi3.NewResponses(),
		},
	})

	vs := checkRule5("api.yml", doc, AuditOptions{})
	if len(vs) != 2 {
		t.Errorf("expected 2 violations for two DELETE paths with bodies, got %d", len(vs))
	}
}

// ---------------------------------------------------------------------------
// Rule 12: api.yml must declare openapi: 3.0.x
// ---------------------------------------------------------------------------

func TestCheckRule12(t *testing.T) {
	tests := []struct {
		name      string
		version   string
		wantCount int
	}{
		{"valid 3.0.0", "3.0.0", 0},
		{"valid 3.0.3", "3.0.3", 0},
		{"valid 3.0.99", "3.0.99", 0},
		{"invalid 3.1.0", "3.1.0", 1},
		{"invalid 2.0.0", "2.0.0", 1},
		{"empty version", "", 1},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			doc := &openapi3.T{OpenAPI: tt.version}
			vs := checkRule12("api.yml", doc, AuditOptions{})
			if len(vs) != tt.wantCount {
				t.Errorf("checkRule12(%q) got %d violations, want %d", tt.version, len(vs), tt.wantCount)
			}
			for _, v := range vs {
				if v.RuleNumber != 12 {
					t.Errorf("expected rule 12, got %d", v.RuleNumber)
				}
				if v.Severity != SeverityBlocking {
					t.Errorf("expected blocking severity")
				}
			}
		})
	}
}

func TestCheckRule12_NilDoc(t *testing.T) {
	vs := checkRule12("api.yml", nil, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations for nil doc, got %d", len(vs))
	}
}

// ---------------------------------------------------------------------------
// Rule 19: No unnecessary single-entry allOf
// ---------------------------------------------------------------------------

func TestCheckRule19_SingleEntryAllOf(t *testing.T) {
	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
		Components: &openapi3.Components{
			Schemas: openapi3.Schemas{
				"MySchema": &openapi3.SchemaRef{
					Value: &openapi3.Schema{
						Properties: openapi3.Schemas{
							"status": &openapi3.SchemaRef{
								Value: &openapi3.Schema{
									AllOf: openapi3.SchemaRefs{
										{Ref: "#/components/schemas/StatusEnum"},
									},
								},
							},
						},
					},
				},
			},
		},
	}

	vs := checkRule19("api.yml", doc, AuditOptions{})
	if len(vs) != 1 {
		t.Fatalf("expected 1 violation for single-entry allOf, got %d", len(vs))
	}
	if vs[0].RuleNumber != 19 {
		t.Errorf("expected rule 19, got %d", vs[0].RuleNumber)
	}
	if !strings.Contains(vs[0].Message, "unnecessary single-entry allOf") {
		t.Errorf("expected message about single-entry allOf, got %q", vs[0].Message)
	}
}

func TestCheckRule19_SingleEntryAllOfWithDescription(t *testing.T) {
	// When the property has a description alongside the allOf, it is intentional
	// (description extends the $ref). No violation expected.
	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
		Components: &openapi3.Components{
			Schemas: openapi3.Schemas{
				"MySchema": &openapi3.SchemaRef{
					Value: &openapi3.Schema{
						Properties: openapi3.Schemas{
							"status": &openapi3.SchemaRef{
								Value: &openapi3.Schema{
									Description: "The connection status.",
									AllOf: openapi3.SchemaRefs{
										{Ref: "#/components/schemas/StatusEnum"},
									},
								},
							},
						},
					},
				},
			},
		},
	}

	vs := checkRule19("api.yml", doc, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations when allOf+description, got %d", len(vs))
	}
}

func TestCheckRule19_SingleEntryAllOfWithGoType(t *testing.T) {
	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
		Components: &openapi3.Components{
			Schemas: openapi3.Schemas{
				"MySchema": &openapi3.SchemaRef{
					Value: &openapi3.Schema{
						Properties: openapi3.Schemas{
							"status": &openapi3.SchemaRef{
								Value: &openapi3.Schema{
									Extensions: map[string]any{"x-go-type": "custom.Type"},
									AllOf: openapi3.SchemaRefs{
										{Ref: "#/components/schemas/StatusEnum"},
									},
								},
							},
						},
					},
				},
			},
		},
	}

	vs := checkRule19("api.yml", doc, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations when allOf has x-go-type, got %d", len(vs))
	}
}

func TestCheckRule19_MultiEntryAllOf(t *testing.T) {
	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
		Components: &openapi3.Components{
			Schemas: openapi3.Schemas{
				"MySchema": &openapi3.SchemaRef{
					Value: &openapi3.Schema{
						Properties: openapi3.Schemas{
							"status": &openapi3.SchemaRef{
								Value: &openapi3.Schema{
									AllOf: openapi3.SchemaRefs{
										{Ref: "#/components/schemas/A"},
										{Ref: "#/components/schemas/B"},
									},
								},
							},
						},
					},
				},
			},
		},
	}

	vs := checkRule19("api.yml", doc, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations for multi-entry allOf, got %d", len(vs))
	}
}

func TestCheckRule19_NilDoc(t *testing.T) {
	vs := checkRule19("api.yml", nil, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations for nil doc, got %d", len(vs))
	}
}

// ---------------------------------------------------------------------------
// Rule 20: Entity schema must have properties and required
// ---------------------------------------------------------------------------

func TestCheckRule20_MissingPropertiesAndRequired(t *testing.T) {
	entity := &entitySchema{Type: "object"}
	vs := checkRule20("entity.yaml", entity, AuditOptions{})
	if len(vs) != 2 {
		t.Fatalf("expected 2 violations (no properties, no required), got %d", len(vs))
	}
	for _, v := range vs {
		if v.RuleNumber != 20 {
			t.Errorf("expected rule 20, got %d", v.RuleNumber)
		}
	}
}

func TestCheckRule20_HasPropertiesButNoRequired(t *testing.T) {
	entity := &entitySchema{
		Type: "object",
		Properties: map[string]*propertyDef{
			"name": {Type: "string"},
		},
	}
	vs := checkRule20("entity.yaml", entity, AuditOptions{})
	if len(vs) != 1 {
		t.Fatalf("expected 1 violation (no required), got %d", len(vs))
	}
	if !strings.Contains(vs[0].Message, "required") {
		t.Errorf("expected message about missing required, got %q", vs[0].Message)
	}
}

func TestCheckRule20_HasRequiredButNoProperties(t *testing.T) {
	entity := &entitySchema{
		Type:     "object",
		Required: []string{"id"},
	}
	vs := checkRule20("entity.yaml", entity, AuditOptions{})
	if len(vs) != 1 {
		t.Fatalf("expected 1 violation (no properties), got %d", len(vs))
	}
	if !strings.Contains(vs[0].Message, "properties") {
		t.Errorf("expected message about missing properties, got %q", vs[0].Message)
	}
}

func TestCheckRule20_BothPresent(t *testing.T) {
	entity := &entitySchema{
		Type: "object",
		Properties: map[string]*propertyDef{
			"id": {Type: "string"},
		},
		Required: []string{"id"},
	}
	vs := checkRule20("entity.yaml", entity, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations when both properties and required are present, got %d", len(vs))
	}
}

func TestCheckRule20_NonObjectType(t *testing.T) {
	entity := &entitySchema{Type: "array"}
	vs := checkRule20("entity.yaml", entity, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations for non-object type, got %d", len(vs))
	}
}

func TestCheckRule20_NilEntity(t *testing.T) {
	vs := checkRule20("entity.yaml", nil, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations for nil entity, got %d", len(vs))
	}
}

// ---------------------------------------------------------------------------
// Rule 21: GET responses must not reference Payload schemas
// ---------------------------------------------------------------------------

func TestCheckRule21_PayloadRefInGET(t *testing.T) {
	desc := "Returns a connection"
	resp200 := &openapi3.Response{
		Description: &desc,
		Content: openapi3.Content{
			"application/json": &openapi3.MediaType{
				Schema: &openapi3.SchemaRef{
					Ref: "#/components/schemas/ConnectionPayload",
				},
			},
		},
	}
	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
		Paths:   openapi3.NewPaths(),
	}
	responses := openapi3.NewResponses()
	responses.Set("200", &openapi3.ResponseRef{Value: resp200})
	doc.Paths.Set("/api/connections/{connectionId}", &openapi3.PathItem{
		Get: &openapi3.Operation{
			Responses: responses,
		},
	})

	vs := checkRule21("api.yml", doc, AuditOptions{})
	if len(vs) != 1 {
		t.Fatalf("expected 1 violation for GET returning Payload ref, got %d", len(vs))
	}
	if vs[0].RuleNumber != 21 {
		t.Errorf("expected rule 21, got %d", vs[0].RuleNumber)
	}
	if !strings.Contains(vs[0].Message, "ConnectionPayload") {
		t.Errorf("expected message to mention ConnectionPayload, got %q", vs[0].Message)
	}
}

func TestCheckRule21_NonPayloadRefInGET(t *testing.T) {
	desc := "Returns a connection"
	resp200 := &openapi3.Response{
		Description: &desc,
		Content: openapi3.Content{
			"application/json": &openapi3.MediaType{
				Schema: &openapi3.SchemaRef{
					Ref: "#/components/schemas/Connection",
				},
			},
		},
	}
	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
		Paths:   openapi3.NewPaths(),
	}
	responses := openapi3.NewResponses()
	responses.Set("200", &openapi3.ResponseRef{Value: resp200})
	doc.Paths.Set("/api/connections/{connectionId}", &openapi3.PathItem{
		Get: &openapi3.Operation{
			Responses: responses,
		},
	})

	vs := checkRule21("api.yml", doc, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations for GET returning non-Payload ref, got %d", len(vs))
	}
}

func TestCheckRule21_NoGETOperation(t *testing.T) {
	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
		Paths:   openapi3.NewPaths(),
	}
	doc.Paths.Set("/api/items", &openapi3.PathItem{
		Post: &openapi3.Operation{Responses: openapi3.NewResponses()},
	})

	vs := checkRule21("api.yml", doc, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations when no GET, got %d", len(vs))
	}
}

func TestCheckRule21_NilDoc(t *testing.T) {
	vs := checkRule21("api.yml", nil, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations for nil doc, got %d", len(vs))
	}
}

// ---------------------------------------------------------------------------
// Rule 28: Response codes match method semantics
// ---------------------------------------------------------------------------

func TestCheckRule28_PostCreateWith200(t *testing.T) {
	desc := "Resource created"
	resp200 := &openapi3.Response{Description: &desc}
	responses := openapi3.NewResponses()
	responses.Set("200", &openapi3.ResponseRef{Value: resp200})

	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
		Paths:   openapi3.NewPaths(),
	}
	doc.Paths.Set("/api/items", &openapi3.PathItem{
		Post: &openapi3.Operation{
			OperationID: "createItem",
			Responses:   responses,
		},
	})

	vs := checkRule28("api.yml", doc, AuditOptions{})
	if len(vs) != 1 {
		t.Fatalf("expected 1 violation for POST create using 200 instead of 201, got %d", len(vs))
	}
	if vs[0].RuleNumber != 28 {
		t.Errorf("expected rule 28, got %d", vs[0].RuleNumber)
	}
	if !strings.Contains(vs[0].Message, "201") {
		t.Errorf("expected message to mention 201, got %q", vs[0].Message)
	}
}

func TestCheckRule28_PostCreateWith201(t *testing.T) {
	desc := "Resource created"
	resp201 := &openapi3.Response{Description: &desc}
	responses := openapi3.NewResponses()
	responses.Set("201", &openapi3.ResponseRef{Value: resp201})

	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
		Paths:   openapi3.NewPaths(),
	}
	doc.Paths.Set("/api/items", &openapi3.PathItem{
		Post: &openapi3.Operation{
			OperationID: "createItem",
			Responses:   responses,
		},
	})

	vs := checkRule28("api.yml", doc, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations when POST create uses 201, got %d", len(vs))
	}
}

func TestCheckRule28_DeleteSingleResourceWith200(t *testing.T) {
	desc := "Item deleted"
	resp200 := &openapi3.Response{Description: &desc}
	responses := openapi3.NewResponses()
	responses.Set("200", &openapi3.ResponseRef{Value: resp200})

	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
		Paths:   openapi3.NewPaths(),
	}
	doc.Paths.Set("/api/items/{itemId}", &openapi3.PathItem{
		Delete: &openapi3.Operation{
			Responses: responses,
		},
	})

	vs := checkRule28("api.yml", doc, AuditOptions{})
	if len(vs) != 1 {
		t.Fatalf("expected 1 violation for DELETE single-resource using 200, got %d", len(vs))
	}
	if !strings.Contains(vs[0].Message, "204") {
		t.Errorf("expected message to mention 204, got %q", vs[0].Message)
	}
}

func TestCheckRule28_DeleteSingleResourceWith204(t *testing.T) {
	desc := "Item deleted"
	resp204 := &openapi3.Response{Description: &desc}
	responses := openapi3.NewResponses()
	responses.Set("204", &openapi3.ResponseRef{Value: resp204})

	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
		Paths:   openapi3.NewPaths(),
	}
	doc.Paths.Set("/api/items/{itemId}", &openapi3.PathItem{
		Delete: &openapi3.Operation{
			Responses: responses,
		},
	})

	vs := checkRule28("api.yml", doc, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations when DELETE uses 204, got %d", len(vs))
	}
}

func TestCheckRule28_PostDeleteSubResourceIgnored(t *testing.T) {
	// /api/items/delete is a bulk-delete sub-resource, not a "create" endpoint.
	desc := "Items deleted"
	resp200 := &openapi3.Response{Description: &desc}
	responses := openapi3.NewResponses()
	responses.Set("200", &openapi3.ResponseRef{Value: resp200})

	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
		Paths:   openapi3.NewPaths(),
	}
	doc.Paths.Set("/api/items/delete", &openapi3.PathItem{
		Post: &openapi3.Operation{
			OperationID: "deleteItems",
			Responses:   responses,
		},
	})

	vs := checkRule28("api.yml", doc, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations for /delete sub-resource POST, got %d", len(vs))
	}
}

func TestCheckRule28_PostActionSuffixIgnored(t *testing.T) {
	// Action suffixes (e.g., /accept) are not "create" operations.
	desc := "Invitation accepted"
	resp200 := &openapi3.Response{Description: &desc}
	responses := openapi3.NewResponses()
	responses.Set("200", &openapi3.ResponseRef{Value: resp200})

	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
		Paths:   openapi3.NewPaths(),
	}
	doc.Paths.Set("/api/invitations/{invitationId}/accept", &openapi3.PathItem{
		Post: &openapi3.Operation{
			OperationID: "acceptInvitation",
			Responses:   responses,
		},
	})

	vs := checkRule28("api.yml", doc, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations for action-suffix path, got %d", len(vs))
	}
}

func TestCheckRule28_NilDoc(t *testing.T) {
	vs := checkRule28("api.yml", nil, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations for nil doc, got %d", len(vs))
	}
}

func TestCheckRule28_DeleteCollectionPathIgnored(t *testing.T) {
	// A DELETE on a collection path (no trailing {param}) is not a single-resource
	// delete, so it should not be flagged for missing 204.
	desc := "Bulk delete"
	resp200 := &openapi3.Response{Description: &desc}
	responses := openapi3.NewResponses()
	responses.Set("200", &openapi3.ResponseRef{Value: resp200})

	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
		Paths:   openapi3.NewPaths(),
	}
	doc.Paths.Set("/api/items", &openapi3.PathItem{
		Delete: &openapi3.Operation{Responses: responses},
	})

	vs := checkRule28("api.yml", doc, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations for collection DELETE, got %d", len(vs))
	}
}
