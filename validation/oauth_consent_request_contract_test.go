package validation

import (
	"context"
	"encoding/json"
	"maps"
	"os"
	"path/filepath"
	"reflect"
	"slices"
	"strings"
	"testing"

	"github.com/getkin/kin-openapi/openapi3"
)

// The pending OAuth consent request contract (docs/oauth-consent-request-contract.md):
// the consent page reads a request by its challenge and the signed-in user
// allows or denies it; every decision answers the URL the browser must open
// next. The tests load the construct the way the code generators do (every
// $ref resolved) and run its schemas against request and response bodies.

const oauthConsentRequestDir = "schemas/constructs/v1beta3/oauth_consent_request"

func loadOauthConsentRequestSpec(t *testing.T) *openapi3.T {
	t.Helper()
	spec := mustLoadAPISpec(t, filepath.Join(oauthConsentRequestDir, "api.yml"))
	// A description beside a $ref is the repo's convention for documenting a
	// referenced property, so it is the one sibling allowed.
	if err := spec.Validate(context.Background(), openapi3.AllowExtraSiblingFields("description")); err != nil {
		t.Fatalf("oauth_consent_request api.yml is not a valid OpenAPI document: %v", err)
	}
	return spec
}

func TestOauthConsentRequestOperations(t *testing.T) {
	spec := loadOauthConsentRequestSpec(t)

	// The read and the decisions take different tags, so each names its own
	// RTK cache tag (OauthConsentRequest_<tag>): a decision must not
	// invalidate the read, whose single-use challenge it just consumed, or
	// RTK would refetch a request that now answers 404.
	cases := []struct {
		path, method, operationID, tag, body, success string
	}{
		{"/api/identity/oauth/consent-requests", "GET", "getOauthConsentRequest", "oauthConsentRequests", "", "OauthConsentRequest"},
		{"/api/identity/oauth/consent-requests/accept", "POST", "acceptOauthConsentRequest", "oauthConsentDecisions", "OauthConsentDecisionPayload", "OauthConsentRedirect"},
		{"/api/identity/oauth/consent-requests/reject", "POST", "rejectOauthConsentRequest", "oauthConsentDecisions", "OauthConsentDecisionPayload", "OauthConsentRedirect"},
	}
	if spec.Info.Title != "OauthConsentRequest" {
		t.Errorf("info.title = %q, want \"OauthConsentRequest\" (it prefixes the generated RTK cache tags)", spec.Info.Title)
	}
	var declaredTags []string
	for _, tag := range spec.Tags {
		declaredTags = append(declaredTags, tag.Name)
	}
	if want := []string{"oauthConsentRequests", "oauthConsentDecisions"}; !reflect.DeepEqual(declaredTags, want) {
		t.Errorf("top-level tags = %v, want %v", declaredTags, want)
	}
	if got := slices.Sorted(maps.Keys(spec.Paths.Map())); len(got) != len(cases) {
		t.Errorf("declared paths = %v, want exactly the %d consent request paths", got, len(cases))
	}
	wantResponses := []string{"200", "400", "401", "403", "404", "500", "503"}

	for _, c := range cases {
		item := spec.Paths.Value(c.path)
		if item == nil {
			t.Errorf("%s is not declared", c.path)
			continue
		}
		if got := len(item.Operations()); got != 1 {
			t.Errorf("%s declares %d operations, want only %s", c.path, got, c.method)
		}
		op := item.GetOperation(c.method)
		if op == nil {
			t.Errorf("%s %s is not declared", c.method, c.path)
			continue
		}
		if op.OperationID != c.operationID {
			t.Errorf("%s %s operationId = %q, want %q", c.method, c.path, op.OperationID, c.operationID)
		}
		var internal []string
		if raw, ok := op.Extensions["x-internal"].([]any); ok {
			for _, v := range raw {
				internal = append(internal, v.(string))
			}
		}
		if !reflect.DeepEqual(internal, []string{"cloud"}) {
			t.Errorf("%s x-internal = %v, want [cloud]", c.operationID, internal)
		}
		if !reflect.DeepEqual(op.Tags, []string{c.tag}) {
			t.Errorf("%s tags = %v, want [%s] (its only tag names the cache it provides or invalidates)", c.operationID, op.Tags, c.tag)
		}
		// The operations keep the construct's session security; none is public.
		if op.Security != nil {
			t.Errorf("%s overrides security with %v; it must keep the signed-in session", c.operationID, *op.Security)
		}

		if got := slices.Sorted(maps.Keys(op.Responses.Map())); !reflect.DeepEqual(got, wantResponses) {
			t.Errorf("%s responses = %v, want %v", c.operationID, got, wantResponses)
		}
		success := op.Responses.Value("200").Value.Content.Get("application/json")
		if success == nil || success.Schema.Ref != "#/components/schemas/"+c.success {
			t.Errorf("%s 200 body does not reference %s", c.operationID, c.success)
		}
		for _, code := range []string{"400", "403", "404", "500", "503"} {
			assertMeshkitErrorBody(t, spec, c.path, c.method, code)
		}
		// 401 comes from the authentication middleware, which answers plain text.
		if unauthorized := op.Responses.Value("401").Value.Content.Get("text/plain"); unauthorized == nil {
			t.Errorf("%s 401 must be the shared plain-text response", c.operationID)
		}

		if c.body == "" {
			if op.RequestBody != nil {
				t.Errorf("%s must not take a request body", c.operationID)
			}
			continue
		}
		if op.RequestBody == nil || !op.RequestBody.Value.Required {
			t.Errorf("%s must require a request body", c.operationID)
			continue
		}
		body := op.RequestBody.Value.Content.Get("application/json")
		if body == nil || body.Schema.Ref != "#/components/schemas/"+c.body {
			t.Errorf("%s request body does not reference %s", c.operationID, c.body)
		}
	}
}

// The challenge is a long opaque string, so it travels as a required query
// parameter, never a path segment; a missing or blank one is refused.
func TestOauthConsentRequestChallengeParameter(t *testing.T) {
	spec := loadOauthConsentRequestSpec(t)
	op := spec.Paths.Value("/api/identity/oauth/consent-requests").Get

	if got := len(op.Parameters); got != 1 {
		t.Fatalf("getOauthConsentRequest declares %d parameters, want only consentChallenge", got)
	}
	param := op.Parameters[0].Value
	if param.Name != "consentChallenge" || param.In != openapi3.ParameterInQuery || !param.Required {
		t.Fatalf("getOauthConsentRequest parameter = %s in %s (required %v), want required query consentChallenge", param.Name, param.In, param.Required)
	}
	assertChallengeSchema(t, "consentChallenge query parameter", param.Schema.Value)
}

func TestOauthConsentDecisionPayload(t *testing.T) {
	spec := loadOauthConsentRequestSpec(t)
	payload := spec.Components.Schemas["OauthConsentDecisionPayload"].Value

	if got := slices.Sorted(maps.Keys(payload.Properties)); !reflect.DeepEqual(got, []string{"consentChallenge", "remember"}) {
		t.Errorf("OauthConsentDecisionPayload properties = %v, want [consentChallenge remember]", got)
	}
	if !reflect.DeepEqual(payload.Required, []string{"consentChallenge"}) {
		t.Errorf("OauthConsentDecisionPayload required = %v, want [consentChallenge]", payload.Required)
	}
	if got := payload.Properties["remember"].Value.Default; got != false {
		t.Errorf("OauthConsentDecisionPayload.remember default = %v, want false", got)
	}
	assertChallengeSchema(t, "OauthConsentDecisionPayload.consentChallenge", payload.Properties["consentChallenge"].Value)

	request := []openapi3.SchemaValidationOption{openapi3.VisitAsRequest()}
	cases := []struct {
		name    string
		body    map[string]any
		wantErr bool
	}{
		{"names the challenge", map[string]any{"consentChallenge": "a1b2c3"}, false},
		{"asks to remember", map[string]any{"consentChallenge": "a1b2c3", "remember": true}, false},
		{"omits the challenge", map[string]any{"remember": true}, true},
		{"empty body", map[string]any{}, true},
		{"blank challenge", map[string]any{"consentChallenge": "   "}, true},
		// The grant is what the client requested; the body cannot name anything else.
		{"widens the scopes", map[string]any{"consentChallenge": "a1b2c3", "grantScope": []any{"admin"}}, true},
		{"names an audience", map[string]any{"consentChallenge": "a1b2c3", "requestedAudience": []any{"https://api.example.com"}}, true},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			err := payload.VisitJSON(tc.body, request...)
			if (err != nil) != tc.wantErr {
				t.Errorf("VisitJSON(%v) error = %v, wantErr %v", tc.body, err, tc.wantErr)
			}
		})
	}
}

func TestOauthConsentRequestResponseShapes(t *testing.T) {
	spec := loadOauthConsentRequestSpec(t)
	consentRequest := spec.Components.Schemas["OauthConsentRequest"].Value
	redirect := spec.Components.Schemas["OauthConsentRedirect"].Value

	if got := slices.Sorted(maps.Keys(consentRequest.Properties)); !reflect.DeepEqual(got, []string{"client", "consentChallenge", "requestedScopes"}) {
		t.Errorf("OauthConsentRequest properties = %v", got)
	}
	client := consentRequest.Properties["client"].Value
	// kin-openapi does not check string formats while visiting, so pin the
	// declaration that tells generated clients this is an absolute URL.
	if got := redirect.Properties["redirectTo"].Value.Format; got != "uri" {
		t.Errorf("OauthConsentRedirect.redirectTo format = %q, want uri", got)
	}
	// verified is the only trust mark: no self-asserted home page or logo, and
	// no second flag about how the client registered.
	if got := slices.Sorted(maps.Keys(client.Properties)); !reflect.DeepEqual(got, []string{"appSchemes", "clientId", "clientName", "redirectHosts", "verified"}) {
		t.Errorf("OauthConsentClient properties = %v", got)
	}
	if got, want := slices.Sorted(slices.Values(client.Required)), []string{"appSchemes", "clientId", "clientName", "redirectHosts", "verified"}; !reflect.DeepEqual(got, want) {
		t.Errorf("OauthConsentClient required = %v, want %v", got, want)
	}

	request := func(mutate func(map[string]any)) map[string]any {
		body := map[string]any{
			"consentChallenge": "a1b2c3",
			"client": map[string]any{
				"clientId":      "d1f0c2e4-client",
				"clientName":    "",
				"redirectHosts": []any{"app.example.com", "127.0.0.1"},
				"appSchemes":    []any{"vscode"},
				"verified":      false,
			},
			"requestedScopes": []any{"openid", "offline_access"},
		}
		if mutate != nil {
			mutate(body)
		}
		return body
	}
	client0 := func(body map[string]any) map[string]any { return body["client"].(map[string]any) }

	response := []openapi3.SchemaValidationOption{openapi3.VisitAsResponse()}
	cases := []struct {
		name    string
		schema  *openapi3.Schema
		body    map[string]any
		wantErr bool
	}{
		{"unverified client", consentRequest, request(nil), false},
		{"verified client", consentRequest, request(func(b map[string]any) { client0(b)["verified"] = true }), false},
		{"asks for no scopes", consentRequest, request(func(b map[string]any) { b["requestedScopes"] = []any{} }), false},
		// Either list may be empty. That both are never empty at once is the
		// server's guarantee; the schema cannot say it without a combinator
		// the code generators do not model.
		{"only app redirects", consentRequest, request(func(b map[string]any) { client0(b)["redirectHosts"] = []any{} }), false},
		{"only https and loopback redirects", consentRequest, request(func(b map[string]any) { client0(b)["appSchemes"] = []any{} }), false},
		{"omits the challenge", consentRequest, request(func(b map[string]any) { delete(b, "consentChallenge") }), true},
		{"omits verified", consentRequest, request(func(b map[string]any) { delete(client0(b), "verified") }), true},
		{"omits redirectHosts", consentRequest, request(func(b map[string]any) { delete(client0(b), "redirectHosts") }), true},
		{"omits appSchemes", consentRequest, request(func(b map[string]any) { delete(client0(b), "appSchemes") }), true},
		{"duplicate redirect hosts", consentRequest, request(func(b map[string]any) { client0(b)["redirectHosts"] = []any{"[::1]", "[::1]"} }), true},
		{"duplicate app schemes", consentRequest, request(func(b map[string]any) { client0(b)["appSchemes"] = []any{"vscode", "vscode"} }), true},
		{"names an audience", consentRequest, request(func(b map[string]any) { b["requestedAudience"] = []any{"https://api.example.com"} }), true},
		{"carries a client home page", consentRequest, request(func(b map[string]any) { client0(b)["clientUri"] = "https://github.com" }), true},
		{"carries a client logo", consentRequest, request(func(b map[string]any) { client0(b)["logoUri"] = "https://evil.example.com/logo.png" }), true},
		{"carries dynamicallyRegistered", consentRequest, request(func(b map[string]any) { client0(b)["dynamicallyRegistered"] = true }), true},
		{"unknown client field", consentRequest, request(func(b map[string]any) { client0(b)["secret"] = "x" }), true},
		{"redirect", redirect, map[string]any{"redirectTo": "https://cloud.example.com/oauth2/auth?consent_verifier=v"}, false},
		{"redirect without redirectTo", redirect, map[string]any{}, true},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			err := tc.schema.VisitJSON(tc.body, response...)
			if (err != nil) != tc.wantErr {
				t.Errorf("VisitJSON(%v) error = %v, wantErr %v", tc.body, err, tc.wantErr)
			}
		})
	}

	// The template is the example instance consumers copy: it carries every
	// required property of the request and of its client, and nothing else.
	raw, err := os.ReadFile(filepath.Join(repoRootDir(t), oauthConsentRequestDir, "templates", "oauth_consent_request_template.json"))
	if err != nil {
		t.Fatalf("read template: %v", err)
	}
	var template map[string]any
	if err := json.Unmarshal(raw, &template); err != nil {
		t.Fatalf("decode template: %v", err)
	}
	if got, want := slices.Sorted(maps.Keys(template)), slices.Sorted(slices.Values(consentRequest.Required)); !reflect.DeepEqual(got, want) {
		t.Errorf("template keys = %v, want %v", got, want)
	}
	templateClient, _ := template["client"].(map[string]any)
	if got, want := slices.Sorted(maps.Keys(templateClient)), slices.Sorted(slices.Values(client.Required)); !reflect.DeepEqual(got, want) {
		t.Errorf("template client keys = %v, want %v", got, want)
	}
}

// Where the client sends the user is split by kind, so the consent page never
// shows an app as a host: redirectHosts holds only network hosts of https and
// loopback redirects, appSchemes only private-use app schemes. The patterns
// keep each value out of the wrong list where the forms differ; a
// reverse-domain scheme such as github.com is valid in both, and only the
// server's classification by redirect URI scheme places it (in appSchemes).
func TestOauthConsentClientRedirectTargets(t *testing.T) {
	spec := loadOauthConsentRequestSpec(t)
	client := spec.Components.Schemas["OauthConsentClient"].Value
	response := []openapi3.SchemaValidationOption{openapi3.VisitAsResponse()}

	lists := []struct {
		field              string
		accepted, rejected []string
	}{
		{
			field: "redirectHosts",
			accepted: []string{
				"app.example.com",
				"1password.example.com",
				"xn--bcher-kva.example",
				"127.0.0.1",
				"[::1]",
				"[2001:db8:0:0:0:0:0:1]",
			},
			rejected: []string{
				"",
				"vscode",                  // an app scheme is not a host
				"com-example-app",         // nor is any other single label
				"localhost",               // loopback redirects use an IP literal (RFC 8252 section 8.3)
				"https://app.example.com", // no scheme
				"app.example.com/cb",      // no path
				"app.example.com:8080",    // no port
				"127.0.0.1:8080",
				"[::1]:8080",
				"localhost:3000",
				"::1",       // IPv6 must be bracketed
				"256.0.0.1", // not an IPv4 literal, and not a hostname
				"App.Example.com",
				"app.example.com.",
				"-app.example.com",
			},
		},
		{
			field: "appSchemes",
			accepted: []string{
				"vscode",
				"cursor",
				"com.example.app",
				"com.example.app+native",
				"x-my-app",
			},
			rejected: []string{
				"",
				"http", // web redirects are listed in redirectHosts
				"https",
				"vscode:", // no colon
				"vscode://",
				"vscode://callback",
				"VSCode",
				"1app", // a scheme starts with a letter
				"127.0.0.1",
				"[::1]",
				"my_app",
			},
		},
	}
	for _, list := range lists {
		prop := client.Properties[list.field].Value
		if prop.MinItems != 0 {
			t.Errorf("%s minItems = %d, want 0: either list may be empty", list.field, prop.MinItems)
		}
		if !prop.UniqueItems {
			t.Errorf("%s must declare uniqueItems", list.field)
		}
		item := prop.Items.Value
		for _, value := range list.accepted {
			if err := item.VisitJSON(value, response...); err != nil {
				t.Errorf("%s rejected %q: %v", list.field, value, err)
			}
		}
		for _, value := range list.rejected {
			if err := item.VisitJSON(value, response...); err == nil {
				t.Errorf("%s accepted %q, want rejected", list.field, value)
			}
		}
	}
}

// assertChallengeSchema runs a consent challenge schema: an opaque printable
// token is accepted, and an empty, blank or whitespace-carrying one refused.
func assertChallengeSchema(t *testing.T, label string, schema *openapi3.Schema) {
	t.Helper()
	if schema.Type == nil || !schema.Type.Is(openapi3.TypeString) {
		t.Errorf("%s type = %v, want string", label, schema.Type)
		return
	}
	for _, accepted := range []string{"a1b2c3", strings.Repeat("Zx9_-.~", 200)} {
		if err := schema.VisitJSON(accepted); err != nil {
			t.Errorf("%s rejected %q: %v", label, accepted[:min(len(accepted), 16)], err)
		}
	}
	for _, rejected := range []string{"", " ", "\t", "abc def", "abc\n"} {
		if err := schema.VisitJSON(rejected); err == nil {
			t.Errorf("%s accepted %q, want rejected", label, rejected)
		}
	}
}
