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
// https://github.com/layer5io/meshery-cloud/issues/6365, so the resolver below
// takes the higher levels in the order the caller supplies. Until the upstream
// policies exist, the interim resolver applies: inherit and absent resolve to
// required. These tests pin the schema side: the enum and its absent default,
// which fields are read-only and which payloads carry approvalPolicy, and the
// reference and interim resolvers. See docs/content-item-contract.md,
// "Approval policy".

// itemApprovalLevel is one higher-level setting: the level it comes from and
// the value it sets, empty when it is absent.
type itemApprovalLevel struct {
	name  string
	value string
}

// itemResolveApproval is the normative reference resolver the server mirrors.
// An explicit item value wins. Otherwise the higher levels are read in the
// order given, and the first one that sets required or not_required decides;
// inherit and absent levels are skipped. When nothing sets a value, approval
// is required (fail closed; the fallback is still open for confirmation in
// https://github.com/layer5io/meshery-cloud/issues/6365). An absent item value
// is the same as inherit.
func itemResolveApproval(item string, higher []itemApprovalLevel) (required bool, source string) {
	switch item {
	case "required":
		return true, "item"
	case "not_required":
		return false, "item"
	}
	for _, level := range higher {
		switch level.value {
		case "required":
			return true, level.name
		case "not_required":
			return false, level.name
		}
	}
	return true, "fallback"
}

// itemInterimResolve is the interim rule, in force until the upstream platform,
// workspace and profile policies exist: an explicit item value wins, and
// inherit or absent resolves to required with source fallback. No higher level
// is read, so the user preference agentsActWithoutApproval is not consulted.
func itemInterimResolve(item string) (required bool, source string) {
	switch item {
	case "required":
		return true, "item"
	case "not_required":
		return false, "item"
	}
	return true, "fallback"
}

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
	desc, _ := mustValue(policy, "description").(string)
	if !strings.Contains(desc, "https://github.com/layer5io/meshery-cloud/issues/6365") {
		t.Error("ApprovalPolicy description must link the hierarchy issue")
	}
	if !strings.Contains(desc, "Interim:") || !strings.Contains(desc, "`inherit` and an absent value resolve to `required`") {
		t.Error("ApprovalPolicy description must state the interim rule")
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

// The source enum names every level the resolver can return, and the resolver
// reports exactly the levels the schema allows.
func TestContentItemApprovalSourceEnum(t *testing.T) {
	root := repoRootDir(t)
	entity := loadOpenAPIDocument(t, filepath.Join(root, "schemas/constructs/v1beta3/content_item/content_item.yaml"))
	got := anyStrings(mustLookup(t, entity, "properties", "approvalPolicySource", "enum"))
	want := []string{"item", "platform", "workspace", "profile", "fallback"}
	if !reflect.DeepEqual(got, want) {
		t.Errorf("approvalPolicySource enum = %v, want %v", got, want)
	}
	if _, has := mappingValue(mustLookup(t, entity, "properties", "approvalPolicySource"), "default"); has {
		t.Error("approvalPolicySource must declare no default")
	}
}

// The interim resolver, which is what the server applies until the upstream
// policies exist. An explicit item value wins; inherit and absent resolve to
// required with source fallback, and no higher level is read.
func TestContentItemApprovalInterimResolution(t *testing.T) {
	cases := []struct {
		name         string
		item         string
		wantRequired bool
		wantSource   string
	}{
		{"absent resolves to required by fallback", "", true, "fallback"},
		{"inherit resolves to required by fallback", "inherit", true, "fallback"},
		{"explicit not_required wins", "not_required", false, "item"},
		{"explicit required wins", "required", true, "item"},
	}

	root := repoRootDir(t)
	entity := loadOpenAPIDocument(t, filepath.Join(root, "schemas/constructs/v1beta3/content_item/content_item.yaml"))
	sources := anyStrings(mustLookup(t, entity, "properties", "approvalPolicySource", "enum"))

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			required, source := itemInterimResolve(tc.item)
			if required != tc.wantRequired || source != tc.wantSource {
				t.Errorf("itemInterimResolve(%q) = (%v, %q), want (%v, %q)",
					tc.item, required, source, tc.wantRequired, tc.wantSource)
			}
			if !containsString(sources, source) {
				t.Errorf("source %q is not in the approvalPolicySource enum %v", source, sources)
			}
		})
	}
}

// The resolver, over an ordered list of higher-level values. The order is
// supplied by the caller because the hierarchy is not settled (https://github.com/layer5io/meshery-cloud/issues/6365).
func TestContentItemApprovalResolution(t *testing.T) {
	cases := []struct {
		name         string
		item         string
		higher       []itemApprovalLevel
		wantRequired bool
		wantSource   string
	}{
		{
			name:         "absent item inherits, a higher not_required decides",
			item:         "",
			higher:       []itemApprovalLevel{{"platform", "not_required"}},
			wantRequired: false,
			wantSource:   "platform",
		},
		{
			name:         "inherit and absent are the same",
			item:         "inherit",
			higher:       []itemApprovalLevel{{"platform", "not_required"}},
			wantRequired: false,
			wantSource:   "platform",
		},
		{
			name:         "explicit required wins over a higher not_required",
			item:         "required",
			higher:       []itemApprovalLevel{{"platform", "not_required"}},
			wantRequired: true,
			wantSource:   "item",
		},
		{
			name:         "explicit not_required wins over higher required levels",
			item:         "not_required",
			higher:       []itemApprovalLevel{{"platform", "required"}, {"workspace", "required"}},
			wantRequired: false,
			wantSource:   "item",
		},
		{
			name:         "inherit takes the first higher level that sets a value",
			item:         "inherit",
			higher:       []itemApprovalLevel{{"platform", ""}, {"workspace", "not_required"}, {"profile", "required"}},
			wantRequired: false,
			wantSource:   "workspace",
		},
		{
			name:         "the first higher level decides, not a later one",
			item:         "",
			higher:       []itemApprovalLevel{{"platform", "required"}, {"workspace", "not_required"}},
			wantRequired: true,
			wantSource:   "platform",
		},
		{
			name:         "a higher level that says inherit is skipped",
			item:         "inherit",
			higher:       []itemApprovalLevel{{"platform", "inherit"}, {"workspace", ""}, {"profile", "required"}},
			wantRequired: true,
			wantSource:   "profile",
		},
		{
			name:         "an absent higher level is skipped",
			item:         "",
			higher:       []itemApprovalLevel{{"platform", ""}, {"workspace", ""}, {"profile", "not_required"}},
			wantRequired: false,
			wantSource:   "profile",
		},
		{
			name:         "nothing set anywhere falls back to required",
			item:         "inherit",
			higher:       []itemApprovalLevel{{"platform", ""}, {"workspace", "inherit"}, {"profile", ""}},
			wantRequired: true,
			wantSource:   "fallback",
		},
		{
			name:         "no higher levels and an absent item fall back to required",
			item:         "",
			higher:       nil,
			wantRequired: true,
			wantSource:   "fallback",
		},
	}

	root := repoRootDir(t)
	entity := loadOpenAPIDocument(t, filepath.Join(root, "schemas/constructs/v1beta3/content_item/content_item.yaml"))
	sources := anyStrings(mustLookup(t, entity, "properties", "approvalPolicySource", "enum"))

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			required, source := itemResolveApproval(tc.item, tc.higher)
			if required != tc.wantRequired || source != tc.wantSource {
				t.Errorf("itemResolveApproval(%q, %v) = (%v, %q), want (%v, %q)",
					tc.item, tc.higher, required, source, tc.wantRequired, tc.wantSource)
			}
			if !containsString(sources, source) {
				t.Errorf("source %q is not in the approvalPolicySource enum %v", source, sources)
			}
		})
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
