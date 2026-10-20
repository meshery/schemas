package validation

import (
	"os"
	"path/filepath"
	"strings"
	"testing"
)

// Content items are one generic, organization-scoped construct served at
// /api/content-items. The construct was named content_piece (served at
// /api/content/pieces) until it was renamed; the old construct and paths must
// stay gone, and the org-wide row numbering and conditional delete carry over.
func TestContentItemContract(t *testing.T) {
	root := repoRootDir(t)
	doc := loadOpenAPIDocument(t, filepath.Join(root, "schemas/constructs/v1beta3/content_item/api.yml"))
	paths := mustLookup(t, doc, "paths")

	wantOps := map[string]map[string]string{
		"/api/content-items":                 {"get": "listContentItems", "post": "insertContentItem"},
		"/api/content-items/{contentItemId}": {"get": "getContentItem", "put": "updateContentItem", "delete": "deleteContentItem"},
	}
	for path, ops := range wantOps {
		for method, operationID := range ops {
			op := mustLookup(t, paths, path, method)
			got, _ := mappingValue(op, "operationId")
			if got != operationID {
				t.Errorf("%s %s operationId = %v, want %s", method, path, got, operationID)
			}
		}
	}
	for path := range paths.(map[string]any) {
		if strings.Contains(path, "piece") {
			t.Errorf("path %s still uses the retired content piece name", path)
		}
	}

	// A supplied rowNumber another live item holds, and a stale fingerprint,
	// are refused with a 409 on insert, update and delete.
	for path, methods := range map[string][]string{
		"/api/content-items":                 {"post"},
		"/api/content-items/{contentItemId}": {"put", "delete"},
	} {
		for _, method := range methods {
			responses := mustLookup(t, paths, path, method, "responses")
			if _, ok := mappingValue(responses, "409"); !ok {
				t.Errorf("%s %s must document 409", method, path)
			}
		}
	}

	// DELETE takes the optional expectedFingerprint precondition.
	params, _ := mustLookup(t, paths, "/api/content-items/{contentItemId}", "delete", "parameters").([]any)
	found := false
	for _, p := range params {
		if m, ok := p.(map[string]any); ok && m["$ref"] == "#/components/parameters/expectedFingerprint" {
			found = true
		}
	}
	if !found {
		t.Error("deleteContentItem must accept the expectedFingerprint query precondition")
	}
	if required, _ := mustLookup(t, doc, "components", "parameters", "expectedFingerprint", "required").(bool); required {
		t.Error("expectedFingerprint must stay optional on delete")
	}

	page := mustLookup(t, doc, "components", "schemas", "ContentItemPage", "properties")
	if _, ok := mappingValue(page, "contentItems"); !ok {
		t.Error("ContentItemPage must list its items under contentItems")
	}

	for _, gone := range []string{"schemas/constructs/v1beta3/content_piece", "models/v1beta3/content_piece", "typescript/generated/v1beta3/content_piece"} {
		if _, err := os.Stat(filepath.Join(root, gone)); err == nil {
			t.Errorf("%s must be removed after the rename to content_item", gone)
		}
	}
}
