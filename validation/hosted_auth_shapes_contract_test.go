package validation

import (
	"encoding/json"
	"net/url"
	"os"
	"path/filepath"
	"regexp"
	"strings"
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

// An existing token has neither field and must keep validating: empty or absent
// keychainIds is unrestricted, absent expiresAt never expires.
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
		{"empty keychainIds is unrestricted", withFields(existingToken(), map[string]any{"keychainIds": []any{}}), false},
		{"null expiresAt never expires", withFields(existingToken(), map[string]any{"expiresAt": nil}), false},
		{"keychain id is not a uuid", withFields(existingToken(), map[string]any{"keychainIds": []any{"not-a-uuid"}}), true},
		{"duplicate keychain ids", withFields(existingToken(), map[string]any{"keychainIds": []any{sampleUUID, sampleUUID}}), true},
		{"expiresAt is not a time", withFields(existingToken(), map[string]any{"expiresAt": "tomorrow"}), true},
		{"unknown field", withFields(existingToken(), map[string]any{"scopes": []any{"x"}}), true},
	})
}

// keychainScoped is set at creation and changes only from false to true, when a
// re-consent narrows an unrestricted token. It is never reset to false. The
// schema and the contract doc must say so, and must not keep the old wording.
func TestTokenKeychainScopedChangesOnlyToTrue(t *testing.T) {
	spec := loadSpec(t, tokenSpec)
	desc := squash(schemaOf(t, spec, "UserToken").Properties["keychainScoped"].Value.Description)
	for _, word := range []string{"at creation", "changes it to true", "no other operation changes it", "never reset to false", "read-only to clients"} {
		if !strings.Contains(desc, word) {
			t.Errorf("UserToken.keychainScoped description must state its rule: missing %q", word)
		}
	}
	if strings.Contains(desc, "afterwards") {
		t.Error("UserToken.keychainScoped description must not keep the old 'never reset to false afterwards' wording")
	}

	raw, err := os.ReadFile(filepath.Join(repoRootDir(t), "docs", "token-scoping-contract.md"))
	if err != nil {
		t.Fatal(err)
	}
	contract := squash(string(raw))
	for _, word := range []string{"Set at creation.", "Changed only from false to true, by re-consent.", "Never reset to false."} {
		if !strings.Contains(contract, word) {
			t.Errorf("docs/token-scoping-contract.md must state the keychainScoped rule: missing %q", word)
		}
	}
	if strings.Contains(contract, "Set once") {
		t.Error("docs/token-scoping-contract.md must not keep the old 'Set once' wording")
	}
}

// keychainScoped is the server's stored record of a keychain limit: optional
// and read-only on the entity, and never client-settable through TokenPayload.
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
	if schemaOf(t, doc, "TokenPayload").Properties["keychainScoped"] != nil {
		t.Error("TokenPayload must not carry keychainScoped: a client limits a token only through keychainIds")
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

func extraTags(s *openapi3.Schema) map[string]any {
	tags, _ := s.Extensions["x-oapi-codegen-extra-tags"].(map[string]any)
	return tags
}

func TestTokenPayloadCarriesTheScopingFields(t *testing.T) {
	doc := loadSpec(t, tokenSpec)
	payload := schemaOf(t, doc, "TokenPayload")

	got := map[string]bool{}
	for name := range payload.Properties {
		got[name] = true
	}
	if len(got) != 2 || !got["keychainIds"] || !got["expiresAt"] {
		t.Errorf("TokenPayload properties = %v, want exactly keychainIds and expiresAt", got)
	}
	if len(payload.Required) != 0 {
		t.Errorf("TokenPayload required = %v, want none: an empty body is an unrestricted token", payload.Required)
	}

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
		t.Error("generateToken requestBody does not resolve to TokenPayload")
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
	if got := mustLookup(t, raw, "properties", "updatedAt", "readOnly"); got != true {
		t.Errorf("OauthConsent.updatedAt readOnly = %v, want true (server-set)", got)
	}
	// A re-consent updates the live consent in place, stated in the entity,
	// api.yml and the contract doc.
	inPlace := "updates that consent in place"
	flat := func(s string) string { return strings.Join(strings.Fields(s), " ") }
	if !strings.Contains(flat(consent.Description), inPlace) {
		t.Error("OauthConsent description must state that a re-consent updates the live consent in place")
	}
	if !strings.Contains(flat(doc.Info.Description), inPlace) {
		t.Error("oauth_consent api.yml info must state that a re-consent updates the live consent in place")
	}
	// Uniqueness is stated as the repo states it: a unique key in the entity
	// description and in the contract doc.
	if !strings.Contains(consent.Description, "Unique key: (user, `clientId`)") {
		t.Error("OauthConsent description must state the unique key (user, clientId)")
	}
	contract, err := os.ReadFile(filepath.Join(repoRootDir(t), "docs", "oauth-consent-contract.md"))
	if err != nil {
		t.Fatal(err)
	}
	if !strings.Contains(string(contract), "**Unique key:** (user, `clientId`)") {
		t.Error("docs/oauth-consent-contract.md must state the unique key (user, clientId)")
	}
	if !strings.Contains(string(contract), "`updatedAt`") || !strings.Contains(flat(string(contract)), inPlace) {
		t.Error("docs/oauth-consent-contract.md must document updatedAt and the in-place re-consent")
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

// prefLevel is a higher-level setting in the approval hierarchy, placed ahead of
// the profile. decision is "" when that level does not decide.
type prefLevel struct {
	name     string
	decision string
}

// prefResolve is the reference for how an agent write resolves its approval, as
// docs/agent-approval-preference.md states it. policy is the activity's
// approvalPolicy ("" when absent, which behaves as inherit); byAI reports whether
// an AI app wrote the activity; ahead lists the levels the hierarchy places ahead
// of the profile, in order; pref is the typed agentsActWithoutApproval, nil when
// absent. The hierarchy is not settled (prefHierarchyIssue), so the caller
// supplies the order.
func prefResolve(policy string, byAI bool, ahead []prefLevel, pref *bool) string {
	switch policy {
	case "required", "not_required":
		return policy
	case "", "inherit":
	default:
		return "required"
	}
	for _, level := range ahead {
		if level.decision != "" {
			return level.decision
		}
	}
	if byAI && pref != nil {
		if *pref {
			return "not_required"
		}
		return "required"
	}
	// Nothing set a value: fail closed.
	return "required"
}

func prefPtr(b bool) *bool { return &b }

// prefHierarchyIssue is the hierarchy proposal that settles the approval
// hierarchy and the fallback. The descriptions and docs must name it.
const prefHierarchyIssue = "https://github.com/layer5io/meshery-cloud/issues/6365"

// prefInterimResolve is the interim reference, applied until the platform,
// workspace and profile policies exist: an explicit required or not_required
// wins; every other policy (inherit, absent, or anything unrecognized) resolves
// to required, whatever agentsActWithoutApproval says. The preference is stored
// but not consulted.
func prefInterimResolve(policy string, pref *bool) string {
	switch policy {
	case "required", "not_required":
		return policy
	default:
		return "required"
	}
}

func TestAgentApprovalPreferenceAsProfileSource(t *testing.T) {
	cases := []struct {
		name   string
		policy string
		byAI   bool
		ahead  []prefLevel
		pref   *bool
		want   string
	}{
		{"explicit not_required wins and the preference is not consulted", "not_required", true, nil, prefPtr(false), "not_required"},
		{"explicit required wins and the preference is not consulted", "required", true, nil, prefPtr(true), "required"},
		{"explicit not_required is not overridden by a higher level", "not_required", true, []prefLevel{{"workspace", "required"}}, nil, "not_required"},
		{"absent behaves like inherit (preference true)", "", true, nil, prefPtr(true), "not_required"},
		{"absent behaves like inherit (preference absent)", "", true, nil, nil, "required"},
		{"inherit, AI-written, preference true resolves to not_required", "inherit", true, nil, prefPtr(true), "not_required"},
		{"inherit, AI-written, preference false resolves to required", "inherit", true, nil, prefPtr(false), "required"},
		{"inherit, AI-written, preference absent and nothing else set fails closed to required", "inherit", true, nil, nil, "required"},
		{"inherit, person-written, preference true does not apply", "inherit", false, nil, prefPtr(true), "required"},
		{"higher level ahead of the profile decides over a true preference", "inherit", true, []prefLevel{{"workspace", "required"}}, prefPtr(true), "required"},
		{"higher level ahead of the profile decides not_required over a false preference", "inherit", true, []prefLevel{{"platform", "not_required"}}, prefPtr(false), "not_required"},
		{"higher level ahead that does not decide leaves the profile to decide", "inherit", true, []prefLevel{{"platform", ""}}, prefPtr(true), "not_required"},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			if got := prefResolve(tc.policy, tc.byAI, tc.ahead, tc.pref); got != tc.want {
				t.Errorf("prefResolve(%q, byAI=%v, ahead=%v, pref=%v) = %q, want %q", tc.policy, tc.byAI, tc.ahead, tc.pref, got, tc.want)
			}
		})
	}

	// The descriptions are the documented model. Pin the words that name it so
	// the spec cannot drift from the reference above without this test failing.
	v3 := loadSpec(t, userV1beta3Spec)
	for _, owner := range []string{"Preference", "PreferencePayload"} {
		ref := v3.Components.Schemas[owner]
		if ref == nil || ref.Value == nil || ref.Value.Properties["agentsActWithoutApproval"] == nil {
			t.Fatalf("%s.agentsActWithoutApproval is not declared", owner)
		}
		desc := ref.Value.Properties["agentsActWithoutApproval"].Value.Description
		for _, word := range []string{"approvalPolicy", "inherit", prefHierarchyIssue} {
			if !strings.Contains(desc, word) {
				t.Errorf("%s.agentsActWithoutApproval description must mention %q", owner, word)
			}
		}
	}
}

func TestAgentApprovalPreferenceInterimDefault(t *testing.T) {
	cases := []struct {
		name   string
		policy string
		pref   *bool
		want   string
	}{
		{"absent approvalPolicy with the preference absent resolves to required", "", nil, "required"},
		{"absent approvalPolicy with the preference true still resolves to required", "", prefPtr(true), "required"},
		{"inherit with the preference true resolves to required", "inherit", prefPtr(true), "required"},
		{"inherit with the preference false resolves to required", "inherit", prefPtr(false), "required"},
		{"inherit with the preference absent resolves to required", "inherit", nil, "required"},
		{"explicit not_required resolves to not_required with the preference absent", "not_required", nil, "not_required"},
		{"explicit not_required resolves to not_required with the preference false", "not_required", prefPtr(false), "not_required"},
		{"explicit required resolves to required with the preference true", "required", prefPtr(true), "required"},
		{"explicit required resolves to required with the preference absent", "required", nil, "required"},
		{"an unrecognized approvalPolicy fails closed to required", "approved", prefPtr(true), "required"},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			if got := prefInterimResolve(tc.policy, tc.pref); got != tc.want {
				t.Errorf("prefInterimResolve(%q, pref=%v) = %q, want %q", tc.policy, tc.pref, got, tc.want)
			}
		})
	}

	// The interim rule must be stated where the field is defined and written,
	// with the hierarchy issue it waits on. The descriptions and the operation
	// must say so, and the descriptions must name the issue link.
	v3 := loadSpec(t, userV1beta3Spec)
	for _, owner := range []string{"Preference", "PreferencePayload"} {
		ref := v3.Components.Schemas[owner]
		if ref == nil || ref.Value == nil || ref.Value.Properties["agentsActWithoutApproval"] == nil {
			t.Fatalf("%s.agentsActWithoutApproval is not declared", owner)
		}
		desc := ref.Value.Properties["agentsActWithoutApproval"].Value.Description
		for _, word := range []string{"Interim", "temporary", "inherit", "not consulted", prefHierarchyIssue} {
			if !strings.Contains(desc, word) {
				t.Errorf("%s.agentsActWithoutApproval description must mention %q", owner, word)
			}
		}
	}
	// The interim rule is stated on the v1beta3 request body, which is the body
	// the route takes under v1beta3 (the merged route is still v1beta2's).
	if body := squash(schemaOf(t, v3, "PreferencePayload").Properties["agentsActWithoutApproval"].Value.Description); !strings.Contains(body, "Interim rule") {
		t.Error("PreferencePayload.agentsActWithoutApproval must state the interim rule")
	}
}

// squash folds the line breaks of a YAML block or folded scalar, so a rule
// phrase that the source wraps still matches as one phrase.
func squash(s string) string {
	return strings.Join(strings.Fields(s), " ")
}

// An API token, of any kind, may not change agentsActWithoutApproval, and
// neither may it change a provider's free-form agentsActWithoutApproval entry.
// The descriptions and the doc must state the rule, so the spec, the docs and
// the server agree.
func TestUpdateUserPreferencesAgentTokenRule(t *testing.T) {
	v3 := loadSpec(t, userV1beta3Spec)
	// The merged route is declared by v1beta2 user, which cannot carry a 403
	// for this rule, so the rule is stated on the v1beta3 request body and in
	// the doc. The server enforces it on the route.
	body := squash(schemaOf(t, v3, "PreferencePayload").Description)
	for _, word := range []string{"PUT /api/identity/users/preferences", "v1beta2", "does not carry agentsActWithoutApproval"} {
		if !strings.Contains(body, word) {
			t.Errorf("PreferencePayload description must state the route's merged body: missing %q", word)
		}
	}
	if strings.Contains(body, "AI app token") {
		t.Error("PreferencePayload description must key the rule on the API token, not on an AI app token")
	}

	for _, owner := range []string{"Preference", "PreferencePayload"} {
		desc := squash(schemaOf(t, v3, owner).Properties["agentsActWithoutApproval"].Value.Description)
		for _, word := range []string{"API token, of any kind", "403", "signed-in session"} {
			if !strings.Contains(desc, word) {
				t.Errorf("%s.agentsActWithoutApproval description must state the token rule: missing %q", owner, word)
			}
		}
		if strings.Contains(desc, "AI app token") {
			t.Errorf("%s.agentsActWithoutApproval must key the rule on the API token, not on an AI app token", owner)
		}
	}
	// The free-form entry has the same rule, on the read side and the write side.
	for _, owner := range []string{"Preference", "PreferencePayload"} {
		desc := squash(schemaOf(t, v3, owner).Properties["remoteProviderPreferences"].Value.Description)
		for _, word := range []string{"token-authenticated", "403", "agentsActWithoutApproval", "stored state of", "Writing back the stored entry unchanged is accepted"} {
			if !strings.Contains(desc, word) {
				t.Errorf("%s.remoteProviderPreferences description must state the free-form token rule: missing %q", owner, word)
			}
		}
	}
	// The write side states the three states; the read side says absent means not set.
	write := squash(schemaOf(t, v3, "PreferencePayload").Properties["agentsActWithoutApproval"].Value.Description)
	for _, word := range []string{"true or false stores that value", "null clears", "omitted keeps"} {
		if !strings.Contains(write, word) {
			t.Errorf("PreferencePayload.agentsActWithoutApproval must state the write state %q", word)
		}
	}
	if read := squash(schemaOf(t, v3, "Preference").Properties["agentsActWithoutApproval"].Value.Description); !strings.Contains(read, "absent means not set") {
		t.Error("Preference.agentsActWithoutApproval must say absent means not set")
	}

	// The doc states the same rule, and the copy-on-write migration never runs
	// on a token write.
	raw, err := os.ReadFile(filepath.Join(repoRootDir(t), "docs", "agent-approval-preference.md"))
	if err != nil {
		t.Fatal(err)
	}
	doc := squash(string(raw))
	for _, word := range []string{
		"authenticated by an API token, of any kind", "signed-in session", "isOauth",
		"403", "No part of the payload is applied",
		"remoteProviderPreferences.<provider>.agentsActWithoutApproval",
		"A token-authenticated write never performs that copy",
		"would change the stored state of any", "Writing back the stored entry unchanged is accepted",
	} {
		if !strings.Contains(doc, word) {
			t.Errorf("docs/agent-approval-preference.md must state the token rule: missing %q", word)
		}
	}
	if strings.Contains(doc, "set, change or remove") {
		t.Error("docs/agent-approval-preference.md must not keep the old 'set, change or remove' wording")
	}
}

// Re-consent that changes scopes changes the client's existing tokens. The
// authoritative rule is in docs/oauth-consent-contract.md and the OauthConsent
// schema description; the list operation, the consent info and the token doc
// only summarize it and point there.
func TestOauthConsentReConsentScopeRules(t *testing.T) {
	doc := loadSpec(t, oauthConsentSpec)
	consent := squash(schemaOf(t, doc, "OauthConsent").Description)
	rule := []string{
		"keeps the consent's `organizationId`",
		"explicitly chooses that organization on the consent screen",
		"every existing token issued to that client for that user is revoked",
		"never re-bound to a new organization silently",
		"must name a keychain scope",
		"in the same transaction as the consent update",
		"intersection of its keychains and the keychains of the new scopes",
		"keychainScoped",
		"never adds keychains to a scoped token",
		"revoked, not left with an empty list",
		"empty keychain list means unrestricted",
		"exactly the keychains of the new scopes",
		"set to true",
		"keychains were all deleted",
		"never gains keys",
		"names no keychain scope (an empty list, or only scopes",
		"takes effect only for tokens issued after that consent",
	}
	for _, word := range rule {
		if !strings.Contains(consent, word) {
			t.Errorf("OauthConsent description must state the re-consent rule: missing %q", word)
		}
	}
	scopes := schemaOf(t, doc, "OauthConsent").Properties["scopes"].Value
	if scopes.MinItems != 1 {
		t.Errorf("OauthConsent.scopes minItems = %d, want 1: a consent always names a keychain scope", scopes.MinItems)
	}

	contract, err := os.ReadFile(filepath.Join(repoRootDir(t), "docs", "oauth-consent-contract.md"))
	if err != nil {
		t.Fatal(err)
	}
	authoritative := squash(string(contract))
	for _, word := range []string{
		"keeps the consent's `organizationId`",
		"explicitly chooses that organization on the consent screen",
		"Tokens are never re-bound to a new organization silently",
		"authoritative statement of the re-consent rule",
		"in the same transaction as the consent update",
		"intersection of its keychains and the keychains of the new scopes",
		"exactly the keychains of the new scopes",
		"**revoked**, not left with an empty list",
		"keychains were all deleted",
		"names no keychain scope (an empty list, or only scopes",
		"takes effect only for tokens issued after that consent",
		"minItems: 1",
	} {
		if !strings.Contains(authoritative, word) {
			t.Errorf("docs/oauth-consent-contract.md must state the re-consent rule: missing %q", word)
		}
	}

	// One-sentence summaries that point at the authoritative text, not copies of it.
	list := squash(doc.Paths.Find("/api/identity/oauth/consents").Get.Description)
	if !strings.Contains(list, "OauthConsent schema description") {
		t.Error("getOauthConsents description must point at the OauthConsent schema description for the re-consent rule")
	}
	info := squash(doc.Info.Description)
	if !strings.Contains(info, "the description of the OauthConsent schema") {
		t.Error("the oauth_consent info description must point at the OauthConsent schema description for the re-consent rule")
	}
	for name, text := range map[string]string{"getOauthConsents description": list, "oauth_consent info description": info} {
		if strings.Contains(text, "intersection") || strings.Contains(text, "Narrowing") {
			t.Errorf("%s must summarize the re-consent rule, not repeat it", name)
		}
	}

	tokenDoc, err := os.ReadFile(filepath.Join(repoRootDir(t), "docs", "token-scoping-contract.md"))
	if err != nil {
		t.Fatal(err)
	}
	tokens := squash(string(tokenDoc))
	if !strings.Contains(tokens, "oauth-consent-contract.md#scope-changes-and-existing-tokens") {
		t.Error("docs/token-scoping-contract.md must point at the authoritative re-consent rule")
	}
	if strings.Contains(tokens, "**Narrowing**") || strings.Contains(tokens, "**Broadening**") {
		t.Error("docs/token-scoping-contract.md must summarize the re-consent rule, not repeat it")
	}
}

// A consent must name a keychain scope. minItems only stops an empty list, so
// the server enforces the rule against its scope map and the schema cannot
// pin it. This test pins the statement of the rule in the OauthConsent
// description, the scopes description and the contract doc, and that the stale
// "is a revoke" rule for a re-consent with no keychain scope is gone.
func TestOauthConsentNamesAKeychainScope(t *testing.T) {
	doc := loadSpec(t, oauthConsentSpec)
	entity := schemaOf(t, doc, "OauthConsent")
	consent := squash(entity.Description)
	scopes := entity.Properties["scopes"].Value
	scopesText := squash(scopes.Description)
	if scopes.MinItems != 1 {
		t.Errorf("OauthConsent.scopes minItems = %d, want 1 (stops an empty list only)", scopes.MinItems)
	}

	contract, err := os.ReadFile(filepath.Join(repoRootDir(t), "docs", "oauth-consent-contract.md"))
	if err != nil {
		t.Fatal(err)
	}
	authoritative := squash(string(contract))

	statement := []string{
		"A consent must name a keychain scope",
		"refuses a first consent in which no scope maps to a keychain in its scope map",
		"with `400` and nothing stored",
		"enforced by the server against the scope map, not by the schema",
		"A scope string the scope map does not know is refused with `400`, never silently dropped",
		"never count toward the keychain-scope minimum",
		"A token is never issued under a consent with an empty keychain list",
		"re-consent that names no keychain scope (an empty list, or only scopes that map to no keychain) revokes",
	}
	for _, word := range statement {
		if !strings.Contains(consent, word) {
			t.Errorf("OauthConsent description must state the keychain-scope rule: missing %q", word)
		}
	}
	for _, word := range []string{
		"the server's scope map",
		"refuses (`400`, nothing stored)",
		"refuses a scope string the scope map does not know",
		"never drops one silently",
		"never count toward that minimum",
		"enforced by the server against the scope map",
	} {
		if !strings.Contains(scopesText, word) {
			t.Errorf("OauthConsent.scopes description must state the keychain-scope rule: missing %q", word)
		}
	}
	for _, word := range []string{
		"## Scopes must name a keychain",
		"A consent must name a keychain scope",
		"enforced by the server against the scope map, not by the schema",
		"is refused with `400`. It is never",
		"silently dropped",
		"never count toward the keychain-scope minimum",
		"A token is never issued under a consent with an empty keychain list",
		"every token issued to that client for that user is revoked",
	} {
		if !strings.Contains(authoritative, word) {
			t.Errorf("docs/oauth-consent-contract.md must state the keychain-scope rule: missing %q", word)
		}
	}
	// A re-consent with no keychain scope revokes (owner-approved); it is never refused into a stored empty consent.
	for name, text := range map[string]string{"OauthConsent description": consent, "docs/oauth-consent-contract.md": authoritative} {
		if strings.Contains(text, "re-consent that names no keychain scope is refused") {
			t.Errorf("%s must say a re-consent with no keychain scope revokes, not that it is refused", name)
		}
	}
}

// The templates are example instances of the entity: each validates against
// the OauthConsent schema, and clientUri and logoUri are omitted or valid
// absolute URIs, never empty strings.
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

// Who may revoke: a session revokes any of the user's consents; a token only
// the consent of its own client; a personal API token none. The rule is on the
// operation, so the spec, the doc and the server agree.
func TestOauthConsentDeleteWhoMayRevoke(t *testing.T) {
	doc := loadSpec(t, oauthConsentSpec)
	desc := squash(doc.Paths.Find("/api/identity/oauth/consents").Delete.Description)
	for _, word := range []string{
		"signed-in session may revoke any of that user's consents",
		"issued to an OAuth client may",
		"Naming any other `clientId` answers 403 and changes nothing",
		"does not depend on whether that client has a live consent",
		"personal API token, one not issued to an OAuth client, cannot revoke",
	} {
		if !strings.Contains(desc, word) {
			t.Errorf("deleteOauthConsent description must state who may revoke: missing %q", word)
		}
	}
	contract, err := os.ReadFile(filepath.Join(repoRootDir(t), "docs", "oauth-consent-contract.md"))
	if err != nil {
		t.Fatal(err)
	}
	doctext := squash(string(contract))
	for _, word := range []string{"## Who may revoke", "| `403` for every `clientId`, and nothing changes. |", "Any other `clientId` is `403`"} {
		if !strings.Contains(doctext, word) {
			t.Errorf("docs/oauth-consent-contract.md must state who may revoke: missing %q", word)
		}
	}
}

// Once the typed agentsActWithoutApproval has been written, the free-form
// remoteProviderPreferences entry is never read again, and null means inherit.
// The marker is server state; the spec and the doc state the rule.
func TestFreeFormFallbackEndsOnceTypedFieldWritten(t *testing.T) {
	v3 := loadSpec(t, userV1beta3Spec)
	read := squash(schemaOf(t, v3, "Preference").Properties["agentsActWithoutApproval"].Value.Description)
	for _, word := range []string{"write-once marker", "never read again", "null means inherit, not the free-form value", "including null while the value is absent"} {
		if !strings.Contains(read, word) {
			t.Errorf("Preference.agentsActWithoutApproval must state the free-form fallback ends: missing %q", word)
		}
	}
	for _, owner := range []string{"Preference", "PreferencePayload"} {
		desc := squash(schemaOf(t, v3, owner).Properties["remoteProviderPreferences"].Value.Description)
		if !strings.Contains(desc, "never read once the typed field has been written") && !strings.Contains(desc, "the entry is never read again") {
			t.Errorf("%s.remoteProviderPreferences must say the free-form entry is not read once the typed field is written", owner)
		}
	}
	raw, err := os.ReadFile(filepath.Join(repoRootDir(t), "docs", "agent-approval-preference.md"))
	if err != nil {
		t.Fatal(err)
	}
	doc := squash(string(raw))
	for _, word := range []string{"write-once marker", "never read again", "means inherit, not the free-form value"} {
		if !strings.Contains(doc, word) {
			t.Errorf("docs/agent-approval-preference.md must state the free-form fallback ends: missing %q", word)
		}
	}
	if strings.Contains(doc, "read for one release") {
		t.Error("docs/agent-approval-preference.md must not keep the one-release fallback wording")
	}
}

// None of the new identifiers may name a product, and the new docs must be
// linked from AGENTS.md.
func TestHostedAuthShapesAreProductNeutral(t *testing.T) {
	root := repoRootDir(t)
	product := regexp.MustCompile(`(?i)meshery|layer5|kanvas`)
	// Identifier-bearing lines only: property names, operationIds, schema names,
	// parameter names and paths. Prose (descriptions, contact, servers) may name
	// the project.
	ident := regexp.MustCompile(`^\s*(operationId|name|-?\s*name):|^\s{0,6}[A-Za-z][A-Za-z0-9_]*:\s*$|^  /`)
	for _, rel := range []string{
		"schemas/constructs/v1beta3/oauth_consent/oauth_consent.yaml",
		"schemas/constructs/v1beta3/oauth_consent/templates/oauth_consent_template.json",
		"schemas/constructs/v1beta3/oauth_consent/templates/oauth_consent_template.yaml",
	} {
		data, err := os.ReadFile(filepath.Join(root, rel))
		if err != nil {
			t.Fatal(err)
		}
		for i, line := range strings.Split(string(data), "\n") {
			if ident.MatchString(line) && product.MatchString(line) {
				t.Errorf("%s:%d names a product in an identifier: %s", rel, i+1, line)
			}
		}
	}
	for _, name := range []string{"getOauthConsents", "deleteOauthConsent", "agentsActWithoutApproval", "keychainIds", "expiresAt"} {
		if product.MatchString(name) {
			t.Errorf("%s names a product", name)
		}
	}

	agents, err := os.ReadFile(filepath.Join(root, "AGENTS.md"))
	if err != nil {
		t.Fatal(err)
	}
	for _, doc := range []string{"token-scoping-contract.md", "oauth-consent-contract.md", "agent-approval-preference.md"} {
		if _, err := os.Stat(filepath.Join(root, "docs", doc)); err != nil {
			t.Errorf("docs/%s is missing", doc)
		}
		if !strings.Contains(string(agents), "docs/"+doc) {
			t.Errorf("AGENTS.md does not link docs/%s", doc)
		}
	}
}
