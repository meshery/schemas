package validation

import (
	"fmt"
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

// A content item carries its own rules of engagement, which can only tighten,
// and may belong to a thread (Blowhorn #1319, #1323, #1328). The fields are
// optional on read and write, the rules object is closed and needs a preset,
// the thread can be read in one list call, and an update that omits the rules
// keeps them: clients released before the field existed send the whole item
// without it, so omission must never clear it. See docs/content-item-contract.md.
func TestContentItemRulesOfEngagementAndThreads(t *testing.T) {
	root := repoRootDir(t)
	dir := filepath.Join(root, "schemas/constructs/v1beta3/content_item")
	doc := loadOpenAPIDocument(t, filepath.Join(dir, "api.yml"))
	entity := loadOpenAPIDocument(t, filepath.Join(dir, "content_item.yaml"))

	fields := []string{"rulesOfEngagement", "threadId", "replyToId", "threadIndex"}
	required := map[string]bool{}
	if list, ok := mustLookup(t, entity, "required").([]any); ok {
		for _, name := range list {
			required[fmt.Sprint(name)] = true
		}
	}
	wantDB := map[string]string{
		"rulesOfEngagement": "rules_of_engagement",
		"threadId":          "thread_id",
		"replyToId":         "reply_to_id",
		"threadIndex":       "thread_index",
	}
	for _, name := range fields {
		if required[name] {
			t.Errorf("ContentItem.%s must stay optional", name)
		}
		if got := mustLookup(t, entity, "properties", name, "x-oapi-codegen-extra-tags", "db"); got != wantDB[name] {
			t.Errorf("ContentItem.%s db tag = %v, want %s", name, got, wantDB[name])
		}
		mustLookup(t, doc, "components", "schemas", "ContentItemPayload", "properties", name)
	}
	if got := mustLookup(t, entity, "properties", "threadIndex", "minimum"); got != 1 {
		t.Errorf("ContentItem.threadIndex minimum = %v, want 1 (the root counts as 0)", got)
	}

	roe := mustLookup(t, doc, "components", "schemas", "ContentItemRulesOfEngagement")
	if got, _ := mappingValue(roe, "additionalProperties"); got != false {
		t.Error("ContentItemRulesOfEngagement must be closed (additionalProperties: false)")
	}
	if got := mustLookup(t, roe, "properties", "preset", "$ref"); got != "../risk_profile/api.yml#/components/schemas/RiskProfile" {
		t.Errorf("rulesOfEngagement.preset must reference the RiskProfile enum, got %v", got)
	}
	if list, _ := mustLookup(t, roe, "required").([]any); len(list) != 1 || list[0] != "preset" {
		t.Errorf("ContentItemRulesOfEngagement required = %v, want [preset]", list)
	}
	dials := mustLookup(t, doc, "components", "schemas", "ContentItemRulesOfEngagementDials")
	if got, _ := mappingValue(dials, "additionalProperties"); got != false {
		t.Error("ContentItemRulesOfEngagementDials must be closed (additionalProperties: false)")
	}
	if got := mustLookup(t, dials, "properties", "capFraction", "maximum"); got != 1 {
		t.Errorf("capFraction maximum = %v, want 1: a dial never exceeds the built-in cap", got)
	}

	// Omission keeps the stored rules; null clears them.
	update, _ := mustLookup(t, doc, "paths", "/api/content-items/{contentItemId}", "put", "description").(string)
	if !strings.Contains(update, "An omitted `rulesOfEngagement` keeps the stored rules") {
		t.Error("updateContentItem must say an omitted rulesOfEngagement keeps the stored rules")
	}

	params, _ := mustLookup(t, doc, "paths", "/api/content-items", "get", "parameters").([]any)
	found := false
	for _, p := range params {
		if m, ok := p.(map[string]any); ok && m["$ref"] == "#/components/parameters/threadId" {
			found = true
		}
	}
	if !found {
		t.Error("listContentItems must accept the threadId filter")
	}

	// The reply's wait for its parent's link is client behaviour, recorded as
	// such in the claim contract rather than added as a claim rule.
	claim, err := os.ReadFile(filepath.Join(root, "docs/claim-contract.md"))
	if err != nil {
		t.Fatal(err)
	}
	if !strings.Contains(string(claim), "## Claims are exclusion, not readiness") {
		t.Error("docs/claim-contract.md must keep the section that says readiness is not a claim rule")
	}
}
