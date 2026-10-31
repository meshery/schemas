package validation

import (
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
	for _, code := range []int{400, 401, 404, 500} {
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
	if write.Value.Default != nil {
		t.Error("PreferencePayload.agentsActWithoutApproval must declare no default")
	}
	for _, r := range payload.Required {
		if r == "agentsActWithoutApproval" {
			t.Error("PreferencePayload.agentsActWithoutApproval must be optional")
		}
	}
	item := v3.Paths.Find("/api/identity/users/preferences")
	if item == nil || item.Put == nil || item.Put.OperationID != "updateUserPreferences" {
		t.Fatal("v1beta3 user must declare updateUserPreferences (PUT /api/identity/users/preferences)")
	}
	body := item.Put.RequestBody.Value.Content.Get("application/json")
	if body == nil || body.Schema.Value != payload {
		t.Error("updateUserPreferences must take the v1beta3 PreferencePayload")
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
