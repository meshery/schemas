package validation

import (
	"strings"
	"testing"

	"github.com/getkin/kin-openapi/openapi3"
)

// meshery/schemas#1343: each successfulComponents row of the registry import
// summary may carry the registered component's resource API version (for
// example secrets.infisical.com/v1alpha1), sourced from the component
// definition's nested `component.version` field. The row stays open
// (additionalProperties: true) because the server also emits keys such as
// Version - the model definition version, whose meaning this field must not
// take over. apiVersion is additive, so older rows that predate it must keep
// validating.

const registryImportSummarySpec = "schemas/constructs/v1beta1/registry/api.yml"

// registrySuccessfulComponentItem returns the item schema of
// RegistryImportEntitySummary.successfulComponents.
func registrySuccessfulComponentItem(t *testing.T) *openapi3.Schema {
	t.Helper()

	doc := loadSpec(t, registryImportSummarySpec)
	components := schemaOf(t, doc, "RegistryImportEntitySummary").Properties["successfulComponents"]
	if components == nil || components.Value == nil || !components.Value.Type.Is("array") {
		t.Fatal("RegistryImportEntitySummary.successfulComponents is not an array")
	}
	items := components.Value.Items
	if items == nil || items.Value == nil {
		t.Fatal("RegistryImportEntitySummary.successfulComponents has no item schema")
	}

	return items.Value
}

// TestRegistryImportSuccessfulComponentApiVersionShape pins the declaration:
// an optional string bounded at 500 characters on an otherwise open row.
func TestRegistryImportSuccessfulComponentApiVersionShape(t *testing.T) {
	item := registrySuccessfulComponentItem(t)

	apiVersion := item.Properties["apiVersion"]
	if apiVersion == nil || apiVersion.Value == nil {
		t.Fatal("successfulComponents item does not declare apiVersion")
	}
	if !apiVersion.Value.Type.Is("string") {
		t.Errorf("successfulComponents.apiVersion type = %v, want string", apiVersion.Value.Type)
	}
	if apiVersion.Value.MaxLength == nil || *apiVersion.Value.MaxLength != 500 {
		t.Errorf("successfulComponents.apiVersion maxLength = %v, want 500", apiVersion.Value.MaxLength)
	}
	if item.AdditionalProperties.Has == nil || !*item.AdditionalProperties.Has {
		t.Error("successfulComponents item must keep additionalProperties: true")
	}
}

// TestRegistryImportSuccessfulComponentRowsValidate validates representative
// rows against the declared item schema: a new row carrying apiVersion, a row
// from before the field existed, and the bounds the field imposes.
func TestRegistryImportSuccessfulComponentRowsValidate(t *testing.T) {
	item := registrySuccessfulComponentItem(t)

	cases := []struct {
		name    string
		row     map[string]any
		wantErr bool
	}{
		{
			name: "row with apiVersion",
			row: map[string]any{
				"Model":       "infisical-operator",
				"Category":    map[string]any{"name": "Security"},
				"Metadata":    "InfisicalSecret",
				"DisplayName": "Infisical Secret",
				"Version":     "v1.0.0",
				"apiVersion":  "secrets.infisical.com/v1alpha1",
			},
		},
		{
			name: "older row without apiVersion",
			row: map[string]any{
				"Model":       "couchbase",
				"Category":    map[string]any{"name": "Database"},
				"Metadata":    "CouchbaseAutoscaler",
				"DisplayName": "Couchbase Autoscaler",
				"Version":     "v1.0.0",
			},
		},
		{
			name: "apiVersion at the 500 character bound",
			row: map[string]any{
				"Version":    "v1.0.0",
				"apiVersion": strings.Repeat("a", 500),
			},
		},
		{
			name: "apiVersion over the 500 character bound",
			row: map[string]any{
				"Version":    "v1.0.0",
				"apiVersion": strings.Repeat("a", 501),
			},
			wantErr: true,
		},
		{
			name: "apiVersion is not a string",
			row: map[string]any{
				"Version":    "v1.0.0",
				"apiVersion": 1,
			},
			wantErr: true,
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			err := item.VisitJSON(tc.row)
			if (err != nil) != tc.wantErr {
				t.Errorf("VisitJSON(%v) error = %v, wantErr %v", tc.row, err, tc.wantErr)
			}
		})
	}
}
