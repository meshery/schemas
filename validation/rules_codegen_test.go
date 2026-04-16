package validation

import (
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/getkin/kin-openapi/openapi3"
)

// ---------------------------------------------------------------------------
// Rule 11: x-generate-db-helpers at component level only
// ---------------------------------------------------------------------------

func TestCheckRule11_PropertyLevelAnnotation(t *testing.T) {
	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
		Components: &openapi3.Components{
			Schemas: openapi3.Schemas{
				"Connection": &openapi3.SchemaRef{
					Value: &openapi3.Schema{
						Properties: openapi3.Schemas{
							"metadata": &openapi3.SchemaRef{
								// No $ref — this is an inline property with the extension.
								Value: &openapi3.Schema{
									Extensions: map[string]any{
										"x-generate-db-helpers": true,
									},
								},
							},
						},
					},
				},
			},
		},
	}

	vs := checkRule11("api.yml", doc, AuditOptions{})
	if len(vs) != 1 {
		t.Fatalf("expected 1 violation for property-level x-generate-db-helpers, got %d", len(vs))
	}
	if vs[0].RuleNumber != 11 {
		t.Errorf("expected rule 11, got %d", vs[0].RuleNumber)
	}
	if vs[0].Severity != SeverityBlocking {
		t.Errorf("expected blocking severity")
	}
	if !strings.Contains(vs[0].Message, "metadata") {
		t.Errorf("expected message to mention property name, got %q", vs[0].Message)
	}
}

func TestCheckRule11_RefPropertySkipped(t *testing.T) {
	// Properties with a $ref are resolved targets — their extensions belong
	// to the referenced schema component, which is a valid annotation site.
	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
		Components: &openapi3.Components{
			Schemas: openapi3.Schemas{
				"Connection": &openapi3.SchemaRef{
					Value: &openapi3.Schema{
						Properties: openapi3.Schemas{
							"metadata": &openapi3.SchemaRef{
								Ref: "#/components/schemas/Metadata",
								Value: &openapi3.Schema{
									Extensions: map[string]any{
										"x-generate-db-helpers": true,
									},
								},
							},
						},
					},
				},
			},
		},
	}

	vs := checkRule11("api.yml", doc, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations for $ref property with inherited extension, got %d", len(vs))
	}
}

func TestCheckRule11_NoAnnotation(t *testing.T) {
	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
		Components: &openapi3.Components{
			Schemas: openapi3.Schemas{
				"Connection": &openapi3.SchemaRef{
					Value: &openapi3.Schema{
						Properties: openapi3.Schemas{
							"name": &openapi3.SchemaRef{
								Value: &openapi3.Schema{
									Type: &openapi3.Types{"string"},
								},
							},
						},
					},
				},
			},
		},
	}

	vs := checkRule11("api.yml", doc, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations for property without annotation, got %d", len(vs))
	}
}

func TestCheckRule11_NilDoc(t *testing.T) {
	vs := checkRule11("api.yml", nil, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations for nil doc, got %d", len(vs))
	}
}

func TestCheckRule11_MultipleProperties(t *testing.T) {
	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
		Components: &openapi3.Components{
			Schemas: openapi3.Schemas{
				"MySchema": &openapi3.SchemaRef{
					Value: &openapi3.Schema{
						Properties: openapi3.Schemas{
							"field_a": &openapi3.SchemaRef{
								Value: &openapi3.Schema{
									Extensions: map[string]any{
										"x-generate-db-helpers": true,
									},
								},
							},
							"field_b": &openapi3.SchemaRef{
								Value: &openapi3.Schema{
									Extensions: map[string]any{
										"x-generate-db-helpers": true,
									},
								},
							},
						},
					},
				},
			},
		},
	}

	vs := checkRule11("api.yml", doc, AuditOptions{})
	if len(vs) != 2 {
		t.Errorf("expected 2 violations for two annotated properties, got %d", len(vs))
	}
}

// ---------------------------------------------------------------------------
// Rule 15: cross-construct $ref must have x-go-type
// ---------------------------------------------------------------------------

func TestCheckRule15_MissingGoType(t *testing.T) {
	tmpDir := t.TempDir()

	yamlContent := `openapi: "3.0.0"
info:
  title: Test
  version: v1
components:
  schemas:
    MySchema:
      type: object
      properties:
        conn:
          $ref: "../connection/api.yml#/components/schemas/Connection"
`
	apiPath := filepath.Join(tmpDir, "api.yml")
	if err := os.WriteFile(apiPath, []byte(yamlContent), 0644); err != nil {
		t.Fatal(err)
	}

	raw, _ := loadYAMLDoc(apiPath)
	vs := checkRule15("api.yml", raw, nil, AuditOptions{})
	if len(vs) != 1 {
		t.Fatalf("expected 1 violation for cross-construct $ref without x-go-type, got %d", len(vs))
	}
	if vs[0].RuleNumber != 15 {
		t.Errorf("expected rule 15, got %d", vs[0].RuleNumber)
	}
	if !strings.Contains(vs[0].Message, "x-go-type") {
		t.Errorf("expected message to mention x-go-type, got %q", vs[0].Message)
	}
}

func TestCheckRule15_HasGoType(t *testing.T) {
	tmpDir := t.TempDir()

	yamlContent := `openapi: "3.0.0"
info:
  title: Test
  version: v1
components:
  schemas:
    MySchema:
      type: object
      properties:
        conn:
          $ref: "../connection/api.yml#/components/schemas/Connection"
          x-go-type: connectionv1beta1.Connection
          x-go-type-import:
            name: connectionv1beta1
            path: github.com/meshery/schemas/models/v1beta1/connection
`
	apiPath := filepath.Join(tmpDir, "api.yml")
	if err := os.WriteFile(apiPath, []byte(yamlContent), 0644); err != nil {
		t.Fatal(err)
	}

	raw, _ := loadYAMLDoc(apiPath)
	vs := checkRule15("api.yml", raw, nil, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations when x-go-type is present, got %d", len(vs))
	}
}

func TestCheckRule15_InternalRefIgnored(t *testing.T) {
	tmpDir := t.TempDir()

	yamlContent := `openapi: "3.0.0"
info:
  title: Test
  version: v1
components:
  schemas:
    MySchema:
      type: object
      properties:
        uuid_field:
          $ref: "#/components/schemas/UUID"
`
	apiPath := filepath.Join(tmpDir, "api.yml")
	if err := os.WriteFile(apiPath, []byte(yamlContent), 0644); err != nil {
		t.Fatal(err)
	}

	raw, _ := loadYAMLDoc(apiPath)
	vs := checkRule15("api.yml", raw, nil, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations for internal $ref, got %d", len(vs))
	}
}

func TestCheckRule15_CoreRefIgnored(t *testing.T) {
	tmpDir := t.TempDir()

	yamlContent := `openapi: "3.0.0"
info:
  title: Test
  version: v1
components:
  schemas:
    MySchema:
      type: object
      properties:
        id:
          $ref: "../../v1alpha1/core/api.yml#/components/schemas/uuid"
`
	apiPath := filepath.Join(tmpDir, "api.yml")
	if err := os.WriteFile(apiPath, []byte(yamlContent), 0644); err != nil {
		t.Fatal(err)
	}

	raw, _ := loadYAMLDoc(apiPath)
	vs := checkRule15("api.yml", raw, nil, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations for core $ref, got %d", len(vs))
	}
}

func TestCheckRule15_MissingGoTypeImport(t *testing.T) {
	tmpDir := t.TempDir()

	yamlContent := `openapi: "3.0.0"
info:
  title: Test
  version: v1
components:
  schemas:
    MySchema:
      type: object
      properties:
        conn:
          $ref: "../connection/api.yml#/components/schemas/Connection"
          x-go-type: connectionv1beta1.Connection
`
	apiPath := filepath.Join(tmpDir, "api.yml")
	if err := os.WriteFile(apiPath, []byte(yamlContent), 0644); err != nil {
		t.Fatal(err)
	}

	raw, _ := loadYAMLDoc(apiPath)
	vs := checkRule15("api.yml", raw, nil, AuditOptions{})
	if len(vs) != 1 {
		t.Fatalf("expected 1 violation for missing x-go-type-import, got %d", len(vs))
	}
	if vs[0].RuleNumber != 16 {
		t.Errorf("expected rule 16 (import check), got %d", vs[0].RuleNumber)
	}
}

func TestCheckRule15_AliasMismatch(t *testing.T) {
	tmpDir := t.TempDir()

	yamlContent := `openapi: "3.0.0"
info:
  title: Test
  version: v1
components:
  schemas:
    MySchema:
      type: object
      properties:
        conn:
          $ref: "../connection/api.yml#/components/schemas/Connection"
          x-go-type: connectionv1beta1.Connection
          x-go-type-import:
            name: wrongalias
            path: github.com/meshery/schemas/models/v1beta1/connection
`
	apiPath := filepath.Join(tmpDir, "api.yml")
	if err := os.WriteFile(apiPath, []byte(yamlContent), 0644); err != nil {
		t.Fatal(err)
	}

	raw, _ := loadYAMLDoc(apiPath)
	vs := checkRule15("api.yml", raw, nil, AuditOptions{})
	if len(vs) != 1 {
		t.Fatalf("expected 1 violation for alias mismatch, got %d", len(vs))
	}
	if vs[0].RuleNumber != 16 {
		t.Errorf("expected rule 16, got %d", vs[0].RuleNumber)
	}
	if !strings.Contains(vs[0].Message, "wrongalias") {
		t.Errorf("expected message to mention mismatched alias, got %q", vs[0].Message)
	}
}

func TestCheckRule15_CrossRefInAllOf(t *testing.T) {
	tmpDir := t.TempDir()

	yamlContent := `openapi: "3.0.0"
info:
  title: Test
  version: v1
components:
  schemas:
    MySchema:
      type: object
      properties:
        conn:
          allOf:
            - $ref: "../connection/api.yml#/components/schemas/Connection"
`
	apiPath := filepath.Join(tmpDir, "api.yml")
	if err := os.WriteFile(apiPath, []byte(yamlContent), 0644); err != nil {
		t.Fatal(err)
	}

	raw, _ := loadYAMLDoc(apiPath)
	vs := checkRule15("api.yml", raw, nil, AuditOptions{})
	if len(vs) != 1 {
		t.Fatalf("expected 1 violation for cross-construct $ref inside allOf, got %d", len(vs))
	}
	if vs[0].RuleNumber != 15 {
		t.Errorf("expected rule 15, got %d", vs[0].RuleNumber)
	}
}

func TestCheckRule15_NoSchemas(t *testing.T) {
	tmpDir := t.TempDir()

	yamlContent := `openapi: "3.0.0"
info:
  title: Test
  version: v1
`
	apiPath := filepath.Join(tmpDir, "api.yml")
	if err := os.WriteFile(apiPath, []byte(yamlContent), 0644); err != nil {
		t.Fatal(err)
	}

	raw, _ := loadYAMLDoc(apiPath)
	vs := checkRule15("api.yml", raw, nil, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations when no schemas section, got %d", len(vs))
	}
}

// ---------------------------------------------------------------------------
// Rule 27: x-oapi-codegen-extra-tags consistency
// ---------------------------------------------------------------------------

func TestCheckRule27_DBTagSnakeCase(t *testing.T) {
	tests := []struct {
		name      string
		dbTag     string
		wantCount int
	}{
		{"valid snake_case", "user_name", 0},
		{"valid simple", "name", 0},
		{"valid with option", "name,omitempty", 0},
		{"invalid camelCase", "userName", 1},
		{"invalid PascalCase", "UserName", 1},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			doc := &openapi3.T{
				OpenAPI: "3.0.0",
				Info:    &openapi3.Info{Title: "Test", Version: "v1"},
				Components: &openapi3.Components{
					Schemas: openapi3.Schemas{
						"MySchema": &openapi3.SchemaRef{
							Value: &openapi3.Schema{
								Properties: openapi3.Schemas{
									"user_name": &openapi3.SchemaRef{
										Value: &openapi3.Schema{
											Extensions: map[string]any{
												"x-oapi-codegen-extra-tags": map[string]any{
													"db": tt.dbTag,
												},
											},
										},
									},
								},
							},
						},
					},
				},
			}

			vs := checkRule27("api.yml", doc, AuditOptions{})
			count := 0
			for _, v := range vs {
				if strings.Contains(v.Message, "non-snake_case") {
					count++
				}
			}
			if count != tt.wantCount {
				t.Errorf("db tag %q: got %d db-casing violations, want %d", tt.dbTag, count, tt.wantCount)
			}
		})
	}
}

func TestCheckRule27_JSONTagMatchesPropName(t *testing.T) {
	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
		Components: &openapi3.Components{
			Schemas: openapi3.Schemas{
				"MySchema": &openapi3.SchemaRef{
					Value: &openapi3.Schema{
						Properties: openapi3.Schemas{
							"user_name": &openapi3.SchemaRef{
								Value: &openapi3.Schema{
									Extensions: map[string]any{
										"x-oapi-codegen-extra-tags": map[string]any{
											"json": "user_name",
										},
									},
								},
							},
						},
					},
				},
			},
		},
	}

	vs := checkRule27("api.yml", doc, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations when json tag matches property name, got %d", len(vs))
	}
}

func TestCheckRule27_JSONTagMismatch(t *testing.T) {
	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
		Components: &openapi3.Components{
			Schemas: openapi3.Schemas{
				"MySchema": &openapi3.SchemaRef{
					Value: &openapi3.Schema{
						Properties: openapi3.Schemas{
							"user_name": &openapi3.SchemaRef{
								Value: &openapi3.Schema{
									Extensions: map[string]any{
										"x-oapi-codegen-extra-tags": map[string]any{
											"json": "userName",
										},
									},
								},
							},
						},
					},
				},
			},
		},
	}

	vs := checkRule27("api.yml", doc, AuditOptions{})
	if len(vs) != 1 {
		t.Fatalf("expected 1 violation for json tag mismatch, got %d", len(vs))
	}
	if vs[0].RuleNumber != 27 {
		t.Errorf("expected rule 27, got %d", vs[0].RuleNumber)
	}
	if !strings.Contains(vs[0].Message, "does not match") {
		t.Errorf("expected message about mismatch, got %q", vs[0].Message)
	}
}

func TestCheckRule27_JSONTagDash(t *testing.T) {
	// json: "-" is a deliberate exclusion, should not be flagged.
	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
		Components: &openapi3.Components{
			Schemas: openapi3.Schemas{
				"MySchema": &openapi3.SchemaRef{
					Value: &openapi3.Schema{
						Properties: openapi3.Schemas{
							"internal_field": &openapi3.SchemaRef{
								Value: &openapi3.Schema{
									Extensions: map[string]any{
										"x-oapi-codegen-extra-tags": map[string]any{
											"json": "-",
										},
									},
								},
							},
						},
					},
				},
			},
		},
	}

	vs := checkRule27("api.yml", doc, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations for json:\"-\", got %d", len(vs))
	}
}

func TestCheckRule27_JSONTagMatchesDBColumn(t *testing.T) {
	// When json tag matches the db column name, it is a deliberate semantic alias.
	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
		Components: &openapi3.Components{
			Schemas: openapi3.Schemas{
				"MySchema": &openapi3.SchemaRef{
					Value: &openapi3.Schema{
						Properties: openapi3.Schemas{
							"userName": &openapi3.SchemaRef{
								Value: &openapi3.Schema{
									Extensions: map[string]any{
										"x-oapi-codegen-extra-tags": map[string]any{
											"json": "user_name",
											"db":   "user_name",
										},
									},
								},
							},
						},
					},
				},
			},
		},
	}

	vs := checkRule27("api.yml", doc, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations when json tag matches db column, got %d", len(vs))
	}
}

func TestCheckRule27_GormExcluded(t *testing.T) {
	// When gorm: "-", the json override is intentional wire format.
	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
		Components: &openapi3.Components{
			Schemas: openapi3.Schemas{
				"MySchema": &openapi3.SchemaRef{
					Value: &openapi3.Schema{
						Properties: openapi3.Schemas{
							"displayName": &openapi3.SchemaRef{
								Value: &openapi3.Schema{
									Extensions: map[string]any{
										"x-oapi-codegen-extra-tags": map[string]any{
											"json": "display_name",
											"gorm": "-",
										},
									},
								},
							},
						},
					},
				},
			},
		},
	}

	vs := checkRule27("api.yml", doc, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations when gorm excludes the field, got %d", len(vs))
	}
}

func TestCheckRule27_YAMLTagWarning(t *testing.T) {
	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
		Components: &openapi3.Components{
			Schemas: openapi3.Schemas{
				"MySchema": &openapi3.SchemaRef{
					Value: &openapi3.Schema{
						Properties: openapi3.Schemas{
							"name": &openapi3.SchemaRef{
								Value: &openapi3.Schema{
									Extensions: map[string]any{
										"x-oapi-codegen-extra-tags": map[string]any{
											"yaml": "name",
										},
									},
								},
							},
						},
					},
				},
			},
		},
	}

	vs := checkRule27("api.yml", doc, AuditOptions{})
	if len(vs) != 1 {
		t.Fatalf("expected 1 violation for manual yaml tag, got %d", len(vs))
	}
	if vs[0].RuleNumber != 27 {
		t.Errorf("expected rule 27, got %d", vs[0].RuleNumber)
	}
	if !strings.Contains(vs[0].Message, "yaml") {
		t.Errorf("expected message about yaml tag, got %q", vs[0].Message)
	}
}

func TestCheckRule27_NoExtensions(t *testing.T) {
	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
		Components: &openapi3.Components{
			Schemas: openapi3.Schemas{
				"MySchema": &openapi3.SchemaRef{
					Value: &openapi3.Schema{
						Properties: openapi3.Schemas{
							"name": &openapi3.SchemaRef{
								Value: &openapi3.Schema{
									Type: &openapi3.Types{"string"},
								},
							},
						},
					},
				},
			},
		},
	}

	vs := checkRule27("api.yml", doc, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations for properties without extra tags, got %d", len(vs))
	}
}

func TestCheckRule27_NilDoc(t *testing.T) {
	vs := checkRule27("api.yml", nil, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations for nil doc, got %d", len(vs))
	}
}

func TestCheckRule27_JSONTagWithOmitempty(t *testing.T) {
	// json: "name,omitempty" — base "name" matches the property name.
	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
		Components: &openapi3.Components{
			Schemas: openapi3.Schemas{
				"MySchema": &openapi3.SchemaRef{
					Value: &openapi3.Schema{
						Properties: openapi3.Schemas{
							"name": &openapi3.SchemaRef{
								Value: &openapi3.Schema{
									Extensions: map[string]any{
										"x-oapi-codegen-extra-tags": map[string]any{
											"json": "name,omitempty",
										},
									},
								},
							},
						},
					},
				},
			},
		},
	}

	vs := checkRule27("api.yml", doc, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations for json tag with omitempty matching prop name, got %d", len(vs))
	}
}

// ---------------------------------------------------------------------------
// Rule 17: core.Map must pair with x-go-type-skip-optional-pointer
// ---------------------------------------------------------------------------

func TestCheckRule17_CoreMapWithoutSkipPointer(t *testing.T) {
	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
		Components: &openapi3.Components{
			Schemas: openapi3.Schemas{
				"MySchema": &openapi3.SchemaRef{
					Value: &openapi3.Schema{
						Properties: openapi3.Schemas{
							"metadata": &openapi3.SchemaRef{
								Value: &openapi3.Schema{
									Extensions: map[string]any{
										"x-go-type": "core.Map",
									},
								},
							},
						},
					},
				},
			},
		},
	}

	vs := checkRule17("api.yml", doc, AuditOptions{})
	if len(vs) != 1 {
		t.Fatalf("expected 1 violation for core.Map without skip-optional-pointer, got %d", len(vs))
	}
	if vs[0].RuleNumber != 17 {
		t.Errorf("expected rule 17, got %d", vs[0].RuleNumber)
	}
	if !strings.Contains(vs[0].Message, "x-go-type-skip-optional-pointer") {
		t.Errorf("expected message about skip-optional-pointer, got %q", vs[0].Message)
	}
}

func TestCheckRule17_CoreMapWithSkipPointer(t *testing.T) {
	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
		Components: &openapi3.Components{
			Schemas: openapi3.Schemas{
				"MySchema": &openapi3.SchemaRef{
					Value: &openapi3.Schema{
						Properties: openapi3.Schemas{
							"metadata": &openapi3.SchemaRef{
								Value: &openapi3.Schema{
									Extensions: map[string]any{
										"x-go-type":                       "core.Map",
										"x-go-type-skip-optional-pointer": true,
									},
								},
							},
						},
					},
				},
			},
		},
	}

	vs := checkRule17("api.yml", doc, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations when skip-optional-pointer is true, got %d", len(vs))
	}
}

func TestCheckRule17_TopLevelCoreMap(t *testing.T) {
	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
		Components: &openapi3.Components{
			Schemas: openapi3.Schemas{
				"MapType": &openapi3.SchemaRef{
					Value: &openapi3.Schema{
						Extensions: map[string]any{
							"x-go-type": "core.Map",
						},
					},
				},
			},
		},
	}

	vs := checkRule17("api.yml", doc, AuditOptions{})
	if len(vs) != 1 {
		t.Fatalf("expected 1 violation for top-level core.Map without skip-pointer, got %d", len(vs))
	}
}

func TestCheckRule17_TopLevelCoreMapWithSkip(t *testing.T) {
	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
		Components: &openapi3.Components{
			Schemas: openapi3.Schemas{
				"MapType": &openapi3.SchemaRef{
					Value: &openapi3.Schema{
						Extensions: map[string]any{
							"x-go-type":                       "core.Map",
							"x-go-type-skip-optional-pointer": true,
						},
					},
				},
			},
		},
	}

	vs := checkRule17("api.yml", doc, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations for top-level core.Map with skip-pointer, got %d", len(vs))
	}
}

func TestCheckRule17_NonCoreMapGoType(t *testing.T) {
	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
		Components: &openapi3.Components{
			Schemas: openapi3.Schemas{
				"MySchema": &openapi3.SchemaRef{
					Value: &openapi3.Schema{
						Properties: openapi3.Schemas{
							"metadata": &openapi3.SchemaRef{
								Value: &openapi3.Schema{
									Extensions: map[string]any{
										"x-go-type": "custom.Type",
									},
								},
							},
						},
					},
				},
			},
		},
	}

	vs := checkRule17("api.yml", doc, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations for non-core.Map x-go-type, got %d", len(vs))
	}
}

func TestCheckRule17_NilDoc(t *testing.T) {
	vs := checkRule17("api.yml", nil, AuditOptions{})
	if len(vs) != 0 {
		t.Errorf("expected 0 violations for nil doc, got %d", len(vs))
	}
}

func TestCheckRule17_SkipPointerFalse(t *testing.T) {
	// x-go-type-skip-optional-pointer: false should still trigger.
	doc := &openapi3.T{
		OpenAPI: "3.0.0",
		Info:    &openapi3.Info{Title: "Test", Version: "v1"},
		Components: &openapi3.Components{
			Schemas: openapi3.Schemas{
				"MySchema": &openapi3.SchemaRef{
					Value: &openapi3.Schema{
						Properties: openapi3.Schemas{
							"data": &openapi3.SchemaRef{
								Value: &openapi3.Schema{
									Extensions: map[string]any{
										"x-go-type":                       "core.Map",
										"x-go-type-skip-optional-pointer": false,
									},
								},
							},
						},
					},
				},
			},
		},
	}

	vs := checkRule17("api.yml", doc, AuditOptions{})
	if len(vs) != 1 {
		t.Errorf("expected 1 violation when skip-optional-pointer is false, got %d", len(vs))
	}
}
