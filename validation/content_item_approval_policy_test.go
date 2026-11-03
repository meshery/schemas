package validation

import (
	"path/filepath"
	"reflect"
	"strings"
	"testing"

	"github.com/getkin/kin-openapi/openapi3"
)

// A content item's approval is resolved once, at insert, from its own
// approvalPolicy and the higher-level settings (platform, workspace, profile).
// The hierarchy is not settled; its issue is
// https://github.com/layer5io/meshery-cloud/issues/6365. These tests pin the
// schema side: the enum and its absent default, which fields are read-only and
// which payloads carry approvalPolicy, and the source enum. See
// docs/content-item-contract.md, "Approval policy".

// The ApprovalPolicy enum is exactly required, not_required and inherit, and it
// declares no default: an absent value means inherit, never a stored choice.
func TestContentItemApprovalPolicyEnum(t *testing.T) {
	root := repoRootDir(t)
	dir := filepath.Join(root, "schemas/constructs/v1beta3/content_item")
	api := loadOpenAPIDocument(t, filepath.Join(dir, "api.yml"))
	entity := loadOpenAPIDocument(t, filepath.Join(dir, "content_item.yaml"))

	policy := mustLookup(t, api, "components", "schemas", "ApprovalPolicy")
	if got := mustValue(policy, "type"); got != "string" {
		t.Errorf("ApprovalPolicy type = %v, want string", got)
	}
	if got := anyStrings(mustValue(policy, "enum")); !reflect.DeepEqual(got, []string{"required", "not_required", "inherit"}) {
		t.Errorf("ApprovalPolicy enum = %v, want [required not_required inherit]", got)
	}
	if _, has := mappingValue(policy, "x-enum-casing-exempt"); has {
		t.Error("ApprovalPolicy must not carry x-enum-casing-exempt: its values follow Rule 8")
	}
	if _, has := mappingValue(policy, "default"); has {
		t.Error("ApprovalPolicy must declare no default: absent means inherit")
	}

	payloadPolicy := mustLookup(t, api, "components", "schemas", "ContentItemPayload", "properties", "approvalPolicy")
	if got := mustValue(payloadPolicy, "$ref"); got != "#/components/schemas/ApprovalPolicy" {
		t.Errorf("ContentItemPayload.approvalPolicy $ref = %v, want #/components/schemas/ApprovalPolicy", got)
	}
	if _, has := mappingValue(payloadPolicy, "default"); has {
		t.Error("ContentItemPayload.approvalPolicy must declare no default")
	}
	entityPolicy := mustLookup(t, entity, "properties", "approvalPolicy")
	if got := mustValue(entityPolicy, "$ref"); got != "./api.yml#/components/schemas/ApprovalPolicy" {
		t.Errorf("ContentItem.approvalPolicy $ref = %v, want ./api.yml#/components/schemas/ApprovalPolicy", got)
	}
	if _, has := mappingValue(entityPolicy, "default"); has {
		t.Error("ContentItem.approvalPolicy must declare no default")
	}
	if got := mustLookup(t, entity, "properties", "approvalPolicy", "x-oapi-codegen-extra-tags", "db"); got != "approval_policy" {
		t.Errorf("ContentItem.approvalPolicy db tag = %v, want approval_policy", got)
	}

	// Optional everywhere: a row written before the field has no policy.
	if containsString(anyStrings(mustLookup(t, api, "components", "schemas", "ContentItemPayload", "required")), "approvalPolicy") {
		t.Error("ContentItemPayload.approvalPolicy must stay optional")
	}
	if containsString(anyStrings(mustLookup(t, entity, "required")), "approvalPolicy") {
		t.Error("ContentItem.approvalPolicy must stay optional")
	}
}

// approvalRequired and approvalPolicySource are server-computed: readOnly on the
// entity, stored in their own columns so a later policy change cannot alter
// them, and absent from every write payload. approved is absent from every
// payload too. approvalPolicy is the one approval field a write carries.
func TestContentItemApprovalFieldsAreServerComputed(t *testing.T) {
	root := repoRootDir(t)
	dir := filepath.Join(root, "schemas/constructs/v1beta3/content_item")
	api := loadOpenAPIDocument(t, filepath.Join(dir, "api.yml"))
	entity := loadOpenAPIDocument(t, filepath.Join(dir, "content_item.yaml"))

	stored := map[string]string{"approvalRequired": "approval_required", "approvalPolicySource": "approval_policy_source"}
	for name, column := range stored {
		if got := mustLookup(t, entity, "properties", name, "readOnly"); got != true {
			t.Errorf("ContentItem.%s readOnly = %v, want true", name, got)
		}
		if got := mustLookup(t, entity, "properties", name, "x-oapi-codegen-extra-tags", "db"); got != column {
			t.Errorf("ContentItem.%s db tag = %v, want %s", name, got, column)
		}
	}
	if got := mustLookup(t, entity, "properties", "approvalRequired", "type"); got != "boolean" {
		t.Errorf("ContentItem.approvalRequired type = %v, want boolean", got)
	}

	schemas := mustLookup(t, api, "components", "schemas").(map[string]any)
	if _, ok := mappingValue(schemas, "ContentItemPayload"); !ok {
		t.Fatal("ContentItemPayload is missing")
	}
	for _, name := range sortedAnyKeys(schemas) {
		if !strings.HasSuffix(name, "Payload") {
			continue
		}
		props, _ := mappingValue(schemas[name], "properties")
		for _, forbidden := range []string{"approved", "approvalRequired", "approvalPolicySource"} {
			if _, has := mappingValue(props, forbidden); has {
				t.Errorf("%s must not carry %s: it is server-set", name, forbidden)
			}
		}
	}

	// The write bodies of insert and update reference ContentItemPayload, so the
	// payload check above covers what a client can send.
	for path, method := range map[string]string{"/api/content-items": "post", "/api/content-items/{contentItemId}": "put"} {
		ref := mustValue(mustLookup(t, api, "paths", path, method, "requestBody", "content", "application/json", "schema"), "$ref")
		if ref != "#/components/schemas/ContentItemPayload" {
			t.Errorf("%s %s requestBody = %v, want ContentItemPayload", method, path, ref)
		}
	}
}

// The source enum names every planned level, in the planned order. Only item and
// fallback are active during the interim.
func TestContentItemApprovalSourceEnum(t *testing.T) {
	root := repoRootDir(t)
	entity := loadOpenAPIDocument(t, filepath.Join(root, "schemas/constructs/v1beta3/content_item/content_item.yaml"))
	got := anyStrings(mustLookup(t, entity, "properties", "approvalPolicySource", "enum"))
	want := []string{"item", "workspace", "profile", "organization", "platform", "fallback"}
	if !reflect.DeepEqual(got, want) {
		t.Errorf("approvalPolicySource enum = %v, want %v", got, want)
	}
	if _, has := mappingValue(mustLookup(t, entity, "properties", "approvalPolicySource"), "default"); has {
		t.Error("approvalPolicySource must declare no default")
	}
}

// Instance check: the enum rejects a value outside it, and the payload accepts
// each of the three policies. The payload is not closed, so this checks the
// approvalPolicy property, not the whole body.
func TestContentItemApprovalPolicyPayloadValidation(t *testing.T) {
	root := repoRootDir(t)
	doc, err := loadAPISpec(filepath.Join(root, "schemas/constructs/v1beta3/content_item/api.yml"))
	if err != nil {
		t.Fatalf("load content_item api.yml: %v", err)
	}
	ref := doc.Components.Schemas["ContentItemPayload"]
	if ref == nil || ref.Value == nil {
		t.Fatal("components.schemas.ContentItemPayload is not declared")
	}
	request := []openapi3.SchemaValidationOption{openapi3.VisitAsRequest()}
	body := func(policy any) map[string]any {
		return map[string]any{"profile": "maintainer", "approvalPolicy": policy}
	}
	cases := []struct {
		name    string
		body    map[string]any
		wantErr bool
	}{
		{"accepts required", body("required"), false},
		{"accepts not_required", body("not_required"), false},
		{"accepts inherit", body("inherit"), false},
		{"rejects an unknown value", body("always"), true},
		{"rejects a boolean", body(true), true},
		{"omitted is accepted", map[string]any{"profile": "maintainer"}, false},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			err := ref.Value.VisitJSON(tc.body, request...)
			if (err != nil) != tc.wantErr {
				t.Errorf("VisitJSON(%v) error = %v, wantErr %v", tc.body, err, tc.wantErr)
			}
		})
	}
}
