package validation

import (
	"encoding/json"
	"fmt"
	"net/url"
	"os"
	"path/filepath"
	"testing"

	"github.com/getkin/kin-openapi/openapi3"
	"gopkg.in/yaml.v3"
)

const (
	tokenSpec        = "schemas/constructs/v1beta3/token/api.yml"
	oauthConsentSpec = "schemas/constructs/v1beta3/oauth_consent/api.yml"
	userV1beta3Spec  = "schemas/constructs/v1beta3/user/api.yml"
)

// The hosted-server auth shapes: token scoping (keychainIds, expiresAt), the
// OAuth consents construct, and the typed agent-approval preference. The prose
// forms are docs/token-scoping-contract.md, docs/oauth-consent-contract.md and
// docs/agent-approval-preference.md.

const (
	sampleUUID  = "11111111-1111-4111-8111-111111111111"
	sampleUUID2 = "22222222-2222-4222-8222-222222222222"
)

func init() {
	// kin-openapi does not know format: uuid; the contract rejects a malformed id.
	openapi3.DefineStringFormat("uuid", `^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$`)
}

func loadSpec(t *testing.T, rel string) *openapi3.T {
	t.Helper()
	doc, err := loadAPISpec(filepath.Join(repoRootDir(t), rel))
	if err != nil {
		t.Fatalf("load %s: %v", rel, err)
	}
	return doc
}

func schemaOf(t *testing.T, doc *openapi3.T, name string) *openapi3.Schema {
	t.Helper()
	ref := doc.Components.Schemas[name]
	if ref == nil || ref.Value == nil {
		t.Fatalf("components.schemas.%s is not declared", name)
	}
	return ref.Value
}

func checkCases(t *testing.T, schema *openapi3.Schema, opts []openapi3.SchemaValidationOption, cases []struct {
	name    string
	body    map[string]any
	wantErr bool
}) {
	t.Helper()
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			err := schema.VisitJSON(tc.body, opts...)
			if (err != nil) != tc.wantErr {
				t.Errorf("VisitJSON(%v) error = %v, wantErr %v", tc.body, err, tc.wantErr)
			}
		})
	}
}

func existingToken() map[string]any {
	return map[string]any{
		"id":          sampleUUID,
		"owner":       sampleUUID2,
		"provider":    "p",
		"accessToken": "a",
		"name":        "n",
		"purpose":     "p",
		"isOauth":     false,
		"createdAt":   "2026-10-30T00:00:00Z",
		"updatedAt":   "2026-10-30T00:00:00Z",
	}
}

func withFields(base map[string]any, extra map[string]any) map[string]any {
	out := map[string]any{}
	for k, v := range base {
		out[k] = v
	}
	for k, v := range extra {
		out[k] = v
	}
	return out
}

// An existing token has neither field and must keep validating: with keychainScoped
// absent or false it is unrestricted (empty or absent keychainIds), and absent
// expiresAt never expires.
func TestTokenScopingFieldsAreOptionalOnTheEntity(t *testing.T) {
	doc := loadSpec(t, tokenSpec)
	token := schemaOf(t, doc, "UserToken")
	for _, name := range []string{"keychainIds", "expiresAt"} {
		if token.Properties[name] == nil {
			t.Fatalf("UserToken has no %s property", name)
		}
		for _, r := range token.Required {
			if r == name {
				t.Errorf("%s must be optional so existing tokens stay valid", name)
			}
		}
	}
	checkCases(t, token, nil, []struct {
		name    string
		body    map[string]any
		wantErr bool
	}{
		{"existing token without either field", existingToken(), false},
		{"token with keychains and expiry", withFields(existingToken(), map[string]any{"keychainIds": []any{sampleUUID}, "expiresAt": "2027-01-01T00:00:00Z"}), false},
		{"empty keychainIds without keychainScoped is unrestricted", withFields(existingToken(), map[string]any{"keychainIds": []any{}}), false},
		{"null expiresAt never expires", withFields(existingToken(), map[string]any{"expiresAt": nil}), false},
		{"keychain id is not a uuid", withFields(existingToken(), map[string]any{"keychainIds": []any{"not-a-uuid"}}), true},
		{"duplicate keychain ids", withFields(existingToken(), map[string]any{"keychainIds": []any{sampleUUID, sampleUUID}}), true},
		{"expiresAt is not a time", withFields(existingToken(), map[string]any{"expiresAt": "tomorrow"}), true},
		{"unknown field", withFields(existingToken(), map[string]any{"scopes": []any{"x"}}), true},
	})
}

// keychainScoped is the server's stored record of a keychain limit: optional
// and read-only on the entity, and never client-settable through TokenCreatePayload.
func TestTokenKeychainScopedIsReadOnlyOnTheEntity(t *testing.T) {
	doc := loadSpec(t, tokenSpec)
	token := schemaOf(t, doc, "UserToken")
	prop := token.Properties["keychainScoped"]
	if prop == nil || prop.Value == nil {
		t.Fatal("UserToken has no keychainScoped property")
	}
	if !prop.Value.ReadOnly {
		t.Error("UserToken.keychainScoped must be readOnly")
	}
	for _, r := range token.Required {
		if r == "keychainScoped" {
			t.Error("keychainScoped must be optional so existing tokens stay valid")
		}
	}
	if tags := extraTags(prop.Value); tags["db"] != "keychain_scoped" {
		t.Errorf("UserToken.keychainScoped db tag = %v, want keychain_scoped", tags["db"])
	}
	if tags := extraTags(token.Properties["expiresAt"].Value); tags["db"] != "expires_at" {
		t.Errorf("UserToken.expiresAt db tag = %v, want expires_at", tags["db"])
	}
	if schemaOf(t, doc, "TokenCreatePayload").Properties["keychainScoped"] != nil {
		t.Error("TokenCreatePayload must not carry keychainScoped: a client limits a token only through keychainIds")
	}
	checkCases(t, token, nil, []struct {
		name    string
		body    map[string]any
		wantErr bool
	}{
		{"scoped token with no keychains left", withFields(existingToken(), map[string]any{"keychainScoped": true, "keychainIds": []any{}}), false},
		{"keychainScoped is not a boolean", withFields(existingToken(), map[string]any{"keychainScoped": "yes"}), true},
	})
}

// TokenStanding is the lookup-by-jti read shape: exactly id, revoked, expired
// and keychainScoped, all required, each mapped to its result column.
func TestTokenStandingShape(t *testing.T) {
	doc := loadSpec(t, tokenSpec)
	standing := schemaOf(t, doc, "TokenStanding")
	want := map[string]string{"id": "id", "revoked": "revoked", "expired": "expired", "keychainScoped": "keychain_scoped"}
	if len(standing.Properties) != len(want) {
		t.Errorf("TokenStanding has %d properties, want %d", len(standing.Properties), len(want))
	}
	// The loader drops siblings of $ref (id), so read the db tags from the raw spec.
	data, err := os.ReadFile(filepath.Join(repoRootDir(t), tokenSpec))
	if err != nil {
		t.Fatal(err)
	}
	var raw struct {
		Components struct {
			Schemas map[string]struct {
				Properties map[string]struct {
					Tags map[string]string `yaml:"x-oapi-codegen-extra-tags"`
				} `yaml:"properties"`
			} `yaml:"schemas"`
		} `yaml:"components"`
	}
	if err := yaml.Unmarshal(data, &raw); err != nil {
		t.Fatal(err)
	}
	for name, column := range want {
		if standing.Properties[name] == nil {
			t.Errorf("TokenStanding has no %s property", name)
			continue
		}
		if got := raw.Components.Schemas["TokenStanding"].Properties[name].Tags["db"]; got != column {
			t.Errorf("TokenStanding.%s db tag = %q, want %s", name, got, column)
		}
	}
	if len(standing.Required) != len(want) {
		t.Errorf("TokenStanding required = %v, want every field", standing.Required)
	}
	checkCases(t, standing, nil, []struct {
		name    string
		body    map[string]any
		wantErr bool
	}{
		{"matched live token", map[string]any{"id": sampleUUID, "revoked": false, "expired": false, "keychainScoped": true}, false},
		{"no match", map[string]any{"id": "00000000-0000-0000-0000-000000000000", "revoked": false, "expired": false, "keychainScoped": false}, false},
		{"missing keychainScoped", map[string]any{"id": sampleUUID, "revoked": false, "expired": false}, true},
		{"unknown field", map[string]any{"id": sampleUUID, "revoked": false, "expired": false, "keychainScoped": false, "owner": sampleUUID2}, true},
	})
}

// The lookup's id is exposed as TokenID in Go, not ID: the generated struct is
// read by the token store, and the bare name would read as the entity's id.
func TestTokenStandingIDGoName(t *testing.T) {
	raw := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), tokenSpec))
	if got := mustLookup(t, raw, "components", "schemas", "TokenStanding", "properties", "id", "x-go-name"); got != "TokenID" {
		t.Errorf("TokenStanding.id x-go-name = %v, want TokenID", got)
	}
}

func extraTags(s *openapi3.Schema) map[string]any {
	tags, _ := s.Extensions["x-oapi-codegen-extra-tags"].(map[string]any)
	return tags
}

func TestTokenCreatePayloadCarriesTheScopingFields(t *testing.T) {
	doc := loadSpec(t, tokenSpec)
	payload := schemaOf(t, doc, "TokenCreatePayload")

	got := map[string]bool{}
	for name := range payload.Properties {
		got[name] = true
	}
	if len(got) != 2 || !got["keychainIds"] || !got["expiresAt"] {
		t.Errorf("TokenCreatePayload properties = %v, want exactly keychainIds and expiresAt", got)
	}
	if len(payload.Required) != 0 {
		t.Errorf("TokenCreatePayload required = %v, want none: an empty body is an unrestricted token", payload.Required)
	}
	if ids := payload.Properties["keychainIds"]; ids == nil || ids.Value.MinItems != 1 {
		t.Error("TokenCreatePayload.keychainIds must have minItems 1: an explicit empty list is refused, never an unrestricted token")
	}
	if exp := payload.Properties["expiresAt"]; exp == nil || !exp.Value.Nullable {
		t.Error("TokenCreatePayload.expiresAt must be nullable: null, like an absent value, means the token never expires")
	}
	checkCases(t, payload, nil, []struct {
		name    string
		body    map[string]any
		wantErr bool
	}{
		{"empty body is unrestricted", map[string]any{}, false},
		{"expiresAt null never expires", map[string]any{"expiresAt": nil}, false},
		{"expiresAt is not a date-time", map[string]any{"expiresAt": "tomorrow"}, true},
	})

	item := doc.Paths.Find("/api/identity/tokens")
	if item == nil || item.Post == nil {
		t.Fatal("POST /api/identity/tokens is not declared")
	}
	op := item.Post
	if op.OperationID != "generateToken" {
		t.Errorf("operationId = %q, want generateToken", op.OperationID)
	}
	if op.RequestBody == nil || op.RequestBody.Value == nil {
		t.Fatal("generateToken declares no requestBody")
	}
	if op.RequestBody.Value.Required {
		t.Error("generateToken's body must be optional so existing clients keep working")
	}
	media := op.RequestBody.Value.Content.Get("application/json")
	if media == nil || media.Schema == nil || media.Schema.Value != payload {
		t.Error("generateToken requestBody does not resolve to TokenCreatePayload")
	}
	query := map[string]*openapi3.Parameter{}
	for _, p := range op.Parameters {
		if p.Value.In == "query" {
			query[p.Value.Name] = p.Value
		}
	}
	if query["name"] == nil || !query["name"].Required {
		t.Error("name stays a required query parameter")
	}
	if query["purpose"] == nil {
		t.Error("purpose stays a query parameter")
	}

	request := []openapi3.SchemaValidationOption{openapi3.VisitAsRequest()}
	checkCases(t, payload, request, []struct {
		name    string
		body    map[string]any
		wantErr bool
	}{
		{"empty body", map[string]any{}, false},
		{"keychains and expiry", map[string]any{"keychainIds": []any{sampleUUID}, "expiresAt": "2027-01-01T00:00:00Z"}, false},
		{"forges createdAt", map[string]any{"createdAt": "2026-10-30T00:00:00Z"}, true},
		{"forges id", map[string]any{"id": sampleUUID}, true},
		{"keychain id is not a uuid", map[string]any{"keychainIds": []any{"x"}}, true},
		{"name belongs in the query", map[string]any{"name": "n"}, true},
		{"purpose belongs in the query", map[string]any{"purpose": "p"}, true},
	})
}

func TestOauthConsentOperations(t *testing.T) {
	doc := loadSpec(t, oauthConsentSpec)
	item := doc.Paths.Find("/api/identity/oauth/consents")
	if item == nil || item.Get == nil || item.Delete == nil {
		t.Fatal("GET and DELETE /api/identity/oauth/consents must both be declared")
	}
	if item.Post != nil || item.Put != nil {
		t.Error("a consent is created by the consent step, so no write operation is declared")
	}
	if item.Get.OperationID != "getOauthConsents" || item.Delete.OperationID != "deleteOauthConsent" {
		t.Errorf("operationIds = %q, %q", item.Get.OperationID, item.Delete.OperationID)
	}
	raw := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), oauthConsentSpec))
	for _, method := range []string{"get", "delete"} {
		op := mustLookup(t, raw, "paths", "/api/identity/oauth/consents", method)
		if got := sequenceStrings(mustLookup(t, op, "x-internal")); len(got) != 1 || got[0] != "cloud" {
			t.Errorf("%s x-internal = %v, want [cloud]", method, got)
		}
	}

	var pageSize *openapi3.Parameter
	for _, p := range item.Get.Parameters {
		if p.Value.Name == "pageSize" {
			pageSize = p.Value
		}
	}
	if pageSize == nil || pageSize.Schema == nil || pageSize.Schema.Value == nil {
		t.Fatal("getOauthConsents declares no pageSize parameter")
	}
	if max := pageSize.Schema.Value.Max; max == nil || *max != 1000 {
		t.Errorf("getOauthConsents pageSize maximum = %v, want 1000", max)
	}
	if min := pageSize.Schema.Value.Min; min == nil || *min != 1 {
		t.Errorf("getOauthConsents pageSize minimum = %v, want 1", min)
	}

	del := item.Delete
	if del.RequestBody != nil {
		t.Error("DELETE must not carry a request body")
	}
	var clientID *openapi3.Parameter
	for _, p := range del.Parameters {
		if p.Value.Name == "clientId" {
			clientID = p.Value
		}
	}
	if clientID == nil || clientID.In != "query" || !clientID.Required {
		t.Fatalf("deleteOauthConsent needs a required clientId query parameter, got %+v", clientID)
	}
	if ok := del.Responses.Status(204); ok == nil || len(ok.Value.Content) != 0 {
		t.Error("deleteOauthConsent must answer 204 with no body")
	}
	for _, code := range []int{400, 401, 403, 404, 500} {
		if del.Responses.Status(code) == nil {
			t.Errorf("deleteOauthConsent must document %d", code)
		}
	}
	params := map[string]bool{}
	for _, p := range item.Get.Parameters {
		if p.Value.In == "query" {
			params[p.Value.Name] = true
		}
	}
	if !params["page"] || !params["pageSize"] {
		t.Errorf("getOauthConsents query parameters = %v, want page and pageSize", params)
	}
	list := item.Get.Responses.Status(200)
	if list == nil {
		t.Fatal("getOauthConsents must document 200")
	}
	page := schemaOf(t, doc, "OauthConsentPage")
	if list.Value.Content.Get("application/json").Schema.Value != page {
		t.Error("getOauthConsents 200 must be an OauthConsentPage")
	}
	items := page.Properties["oauthConsents"]
	if items == nil || !items.Value.Type.Is("array") || items.Value.Items.Value != schemaOf(t, doc, "OauthConsent") {
		t.Error("OauthConsentPage.oauthConsents must be an array of OauthConsent")
	}
	checkCases(t, page, nil, []struct {
		name    string
		body    map[string]any
		wantErr bool
	}{
		{"empty page", map[string]any{"page": 0, "pageSize": 10, "totalCount": 0, "oauthConsents": []any{}}, false},
		{"missing totalCount", map[string]any{"page": 0, "pageSize": 10, "oauthConsents": []any{}}, true},
		{"pageSize below one", map[string]any{"page": 0, "pageSize": 0, "totalCount": 0, "oauthConsents": []any{}}, true},
	})
}

func TestOauthConsentEntityShape(t *testing.T) {
	doc := loadSpec(t, oauthConsentSpec)
	consent := schemaOf(t, doc, "OauthConsent")

	valid := map[string]any{
		"id":             sampleUUID,
		"clientId":       "app-1",
		"clientName":     "An app",
		"scopes":         []any{"content:read"},
		"organizationId": sampleUUID,
		"createdAt":      "2026-10-30T00:00:00Z",
		"updatedAt":      "2026-10-30T00:00:00Z",
	}
	full := withFields(valid, map[string]any{
		"clientUri":  "https://example.com",
		"logoUri":    "https://example.com/logo.png",
		"lastUsedAt": "2026-10-30T01:00:00Z",
		"deletedAt":  "2026-10-30T02:00:00Z",
	})
	without := func(key string) map[string]any {
		out := withFields(valid, nil)
		delete(out, key)
		return out
	}
	checkCases(t, consent, nil, []struct {
		name    string
		body    map[string]any
		wantErr bool
	}{
		{"required fields only", valid, false},
		{"every field", full, false},
		{"lastUsedAt null", withFields(valid, map[string]any{"lastUsedAt": nil}), false},
		{"deletedAt null while live", withFields(valid, map[string]any{"deletedAt": nil}), false},
		{"missing id", without("id"), true},
		{"missing updatedAt", without("updatedAt"), true},
		{"updatedAt is not a time", withFields(valid, map[string]any{"updatedAt": "today"}), true},
		{"id not a uuid", withFields(valid, map[string]any{"id": "x"}), true},
		{"deletedAt is not a time", withFields(valid, map[string]any{"deletedAt": "yesterday"}), true},
		{"clientId need not be a uuid", withFields(valid, map[string]any{"clientId": "not-a-uuid"}), false},
		{"missing clientId", without("clientId"), true},
		{"missing scopes", without("scopes"), true},
		{"empty scopes: a consent always names a keychain scope", withFields(valid, map[string]any{"scopes": []any{}}), true},
		{"missing organizationId", without("organizationId"), true},
		{"scope with whitespace", withFields(valid, map[string]any{"scopes": []any{"a b"}}), true},
		{"organizationId not a uuid", withFields(valid, map[string]any{"organizationId": "x"}), true},
		{"unknown field", withFields(valid, map[string]any{"userId": sampleUUID}), true},
	})

	// The loader drops siblings of $ref (id, createdAt, updatedAt, deletedAt),
	// so read the db tags and readOnly from the raw entity.
	raw := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), "schemas/constructs/v1beta3/oauth_consent/oauth_consent.yaml"))
	for name, column := range map[string]string{"id": "id", "createdAt": "created_at", "updatedAt": "updated_at", "deletedAt": "deleted_at"} {
		if got := mustLookup(t, raw, "properties", name, "x-oapi-codegen-extra-tags", "db"); got != column {
			t.Errorf("OauthConsent.%s db tag = %v, want %s", name, got, column)
		}
	}
	for _, name := range []string{"createdAt", "updatedAt"} {
		if got := mustLookup(t, raw, "properties", name, "readOnly"); got != true {
			t.Errorf("OauthConsent.%s readOnly = %v, want true (server-set)", name, got)
		}
	}
}

func TestAgentsActWithoutApprovalPreference(t *testing.T) {
	v3 := loadSpec(t, userV1beta3Spec)
	pref := schemaOf(t, v3, "Preference")
	field := pref.Properties["agentsActWithoutApproval"]
	if field == nil || !field.Value.Type.Is("boolean") {
		t.Fatal("v1beta3 Preference.agentsActWithoutApproval must be a boolean")
	}
	if field.Value.Default != nil {
		t.Error("no schema default: absence must stay distinguishable from false for the precedence rule")
	}
	for _, r := range pref.Required {
		if r == "agentsActWithoutApproval" {
			t.Error("agentsActWithoutApproval must be optional so stored preferences stay valid")
		}
	}
	if pref.Properties["remoteProviderPreferences"] == nil {
		t.Error("remoteProviderPreferences must not be removed")
	}

	// Writable through the v1beta3 updateUserPreferences body: a boolean,
	// optional, with no default, so an omitted field keeps the stored value.
	payload := schemaOf(t, v3, "PreferencePayload")
	write := payload.Properties["agentsActWithoutApproval"]
	if write == nil || !write.Value.Type.Is("boolean") {
		t.Fatal("v1beta3 PreferencePayload.agentsActWithoutApproval must be a boolean")
	}
	if !write.Value.Nullable {
		t.Error("PreferencePayload.agentsActWithoutApproval must be nullable: null clears the stored value to absent")
	}
	if pref.Properties["agentsActWithoutApproval"].Value.Nullable {
		t.Error("Preference.agentsActWithoutApproval is read-side: absent means not set, so it is not nullable")
	}
	// Nullable alone makes the generated Go field serialize as null when unset,
	// which would clear the stored value. The json tag must be omitempty, as on
	// ContentItemPayload.rulesOfEngagement.
	raw := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), userV1beta3Spec))
	if got := mustLookup(t, raw, "components", "schemas", "PreferencePayload", "properties", "agentsActWithoutApproval", "x-oapi-codegen-extra-tags", "json"); got != "agentsActWithoutApproval,omitempty" {
		t.Errorf("PreferencePayload.agentsActWithoutApproval json tag = %v, want agentsActWithoutApproval,omitempty", got)
	}
	if write.Value.Default != nil {
		t.Error("PreferencePayload.agentsActWithoutApproval must declare no default")
	}
	for _, r := range payload.Required {
		if r == "agentsActWithoutApproval" {
			t.Error("PreferencePayload.agentsActWithoutApproval must be optional")
		}
	}
	// Go clients must be able to send true, false, null (clear) and an omitted
	// key (keep). The generated field is nullable.Nullable[bool]: a map, so
	// omitempty leaves an unset field out and null marshals as null.
	if got := mustLookup(t, raw, "components", "schemas", "PreferencePayload", "properties", "agentsActWithoutApproval", "x-go-type"); got != "nullable.Nullable[bool]" {
		t.Errorf("PreferencePayload.agentsActWithoutApproval x-go-type = %v, want nullable.Nullable[bool]", got)
	}
	if got := mustLookup(t, raw, "components", "schemas", "PreferencePayload", "properties", "agentsActWithoutApproval", "x-go-type-import", "path"); got != "github.com/oapi-codegen/nullable" {
		t.Errorf("PreferencePayload.agentsActWithoutApproval x-go-type-import path = %v, want github.com/oapi-codegen/nullable", got)
	}
	if got := mustLookup(t, raw, "components", "schemas", "PreferencePayload", "properties", "agentsActWithoutApproval", "x-go-type-skip-optional-pointer"); got != true {
		t.Errorf("PreferencePayload.agentsActWithoutApproval x-go-type-skip-optional-pointer = %v, want true: the nullable type is not a pointer", got)
	}
}

// Listing is for the signed-in session only. A token-authenticated listing
// answers 403, because the page holds other clients' consents and those are not
// disclosed to a client. An out-of-range pageSize answers 400.
func TestOauthConsentListIsSessionOnly(t *testing.T) {
	doc := loadSpec(t, oauthConsentSpec)
	get := doc.Paths.Find("/api/identity/oauth/consents").Get
	for _, code := range []int{400, 401, 403, 500} {
		resp := get.Responses.Status(code)
		if resp == nil {
			t.Errorf("getOauthConsents must declare %d", code)
		} else if want := fmt.Sprintf("#/components/responses/%d", code); resp.Ref != want {
			t.Errorf("getOauthConsents %d must reference %s, got %q", code, want, resp.Ref)
		}
	}
}

// The templates are example instances of the entity: each validates against
// the OauthConsent schema, and clientUri and logoUri are omitted or valid
// absolute URIs, never empty strings. A template names a keychain scope, so it
// does not use a standard non-keychain scope, which a first consent refuses.
func TestOauthConsentTemplatesAreValid(t *testing.T) {
	doc := loadSpec(t, oauthConsentSpec)
	entity := schemaOf(t, doc, "OauthConsent")
	root := repoRootDir(t)
	raw, err := os.ReadFile(filepath.Join(root, "schemas/constructs/v1beta3/oauth_consent/templates/oauth_consent_template.json"))
	if err != nil {
		t.Fatal(err)
	}
	var fromJSON map[string]any
	if err := json.Unmarshal(raw, &fromJSON); err != nil {
		t.Fatalf("parse json template: %v", err)
	}
	fromYAML := loadYAMLMap(t, "schemas/constructs/v1beta3/oauth_consent/templates/oauth_consent_template.yaml")

	for name, body := range map[string]map[string]any{"json": fromJSON, "yaml": fromYAML} {
		if err := entity.VisitJSON(body); err != nil {
			t.Errorf("%s template is not a valid OauthConsent: %v", name, err)
		}
		scopes, _ := body["scopes"].([]any)
		for _, scope := range scopes {
			if scope == "openid" || scope == "offline_access" || scope == "profile" || scope == "email" {
				t.Errorf("%s template names the standard non-keychain scope %q, which a first consent refuses", name, scope)
			}
		}
		for _, key := range []string{"clientUri", "logoUri"} {
			v, ok := body[key]
			if !ok {
				continue
			}
			if s, _ := v.(string); !isAbsoluteURI(s) {
				t.Errorf("%s template: %s must be omitted or a valid absolute URI, got %q", name, key, v)
			}
		}
	}
}

func isAbsoluteURI(s string) bool {
	u, err := url.Parse(s)
	return err == nil && u.IsAbs() && u.Host != ""
}

// A keychain-scoped token cannot create tokens. Each of the three routes that
// mint a token or its authorization code declares 403 (the shared response).
func TestKeychainScopedTokenCannotCreateTokens(t *testing.T) {
	doc := loadSpec(t, tokenSpec)
	routes := []struct {
		operationID string
		op          *openapi3.Operation
	}{
		{"generateToken", doc.Paths.Find("/api/identity/tokens").Post},
		{"issueIndefiniteLifetimeToken", doc.Paths.Find("/api/identity/tokens/infinite").Get},
		{"getNativeClientAuthorization", doc.Paths.Find("/api/identity/native/authorize").Get},
	}
	for _, r := range routes {
		if r.op == nil {
			t.Fatalf("%s is not declared", r.operationID)
		}
		if r.op.OperationID != r.operationID {
			t.Errorf("operation declared with operationId %q, want %q", r.op.OperationID, r.operationID)
		}
		resp := r.op.Responses.Status(403)
		if resp == nil {
			t.Errorf("%s must declare 403: a keychain-scoped token is refused", r.operationID)
		} else if resp.Ref != "#/components/responses/403" {
			t.Errorf("%s 403 must reference the shared response, got %q", r.operationID, resp.Ref)
		}
	}
}
