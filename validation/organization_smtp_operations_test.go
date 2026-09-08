package validation

import (
	"path/filepath"
	"strings"
	"testing"
)

func TestOrganizationSmtpMalformedOrgIDResponses(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(
		repoRootDir(t),
		"schemas/constructs/v1beta1/organization_smtp/api.yml",
	))

	operations := []struct {
		name   string
		path   string
		method string
	}{
		{"get environment", "/api/orgs/{orgId}/environments/mail-relay", "get"},
		{"delete environment", "/api/orgs/{orgId}/environments/mail-relay", "delete"},
		{"get configuration", "/api/orgs/{orgId}/environments/mail-relay/connection", "get"},
		{"get domain verification", "/api/orgs/{orgId}/environments/mail-relay/domain-verification", "get"},
	}

	for _, operation := range operations {
		t.Run(operation.name, func(t *testing.T) {
			rawOperation, err := lookupPath(doc, "paths", operation.path, operation.method)
			if err != nil {
				t.Fatal(err)
			}
			rawResponses, err := lookupPath(rawOperation.(map[string]any), "responses")
			if err != nil {
				t.Fatal(err)
			}
			responses := rawResponses.(map[string]any)
			response, ok := responses["400"]
			if !ok {
				t.Fatal("operation does not declare a 400 response")
			}
			responseMap := response.(map[string]any)
			if responseMap["$ref"] != "#/components/responses/400" {
				t.Fatalf("400 response ref = %v, want #/components/responses/400", responseMap["$ref"])
			}
		})
	}

	description, err := lookupPath(doc, "paths", "/api/orgs/{orgId}/environments/mail-relay", "delete", "description")
	if err != nil {
		t.Fatal(err)
	}
	if !strings.Contains(description.(string), "malformed organization ID is answered with 400") {
		t.Fatalf("delete description does not document malformed orgId handling: %v", description)
	}
}
