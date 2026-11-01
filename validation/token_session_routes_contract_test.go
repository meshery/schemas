package validation

import (
	"path/filepath"
	"reflect"
	"regexp"
	"testing"
)

// The token and session routes Meshery Cloud serves on its bare router
// (no /api prefix): /revoke and /introspect authenticate by possession of the
// token, /logout by the session cookies. The wire shape pinned here is what
// Meshery Server and OAuth clients are coded against.
func TestTokenSessionRoutesContract(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), tokenV1beta3Spec))

	ops := []struct {
		path, method, operationID string
		responses                 []string
	}{
		{"/revoke", "post", "revokeToken", []string{"200", "400", "500"}},
		{"/introspect", "post", "introspectToken", []string{"200", "400", "401", "503"}},
		{"/logout", "get", "logoutUser", []string{"302", "303", "500"}},
	}
	for _, op := range ops {
		operation := mustLookup(t, doc, "paths", op.path, op.method)
		if got := mustValue(operation, "operationId"); got != op.operationID {
			t.Errorf("%s %s operationId = %v, want %q", op.method, op.path, got, op.operationID)
		}
		if got := sequenceStrings(mustValue(operation, "x-internal")); !reflect.DeepEqual(got, []string{"cloud"}) {
			t.Errorf("%s x-internal = %v, want [cloud]", op.operationID, got)
		}
		responses := mustValue(operation, "responses")
		for _, code := range op.responses {
			if _, ok := mappingValue(responses, code); !ok {
				t.Errorf("%s missing %s", op.operationID, code)
			}
		}
	}

	// Possessing the token is the credential: no session or bearer token.
	for _, path := range []string{"/revoke", "/introspect"} {
		operation := mustLookup(t, doc, "paths", path, "post")
		security, ok := mappingValue(operation, "security")
		if !ok {
			t.Fatalf("POST %s must declare security: []", path)
		}
		if seq, isSeq := security.([]any); !isSeq || len(seq) != 0 {
			t.Errorf("POST %s security = %v, want empty", path, security)
		}
		if got := mustLookup(t, operation, "requestBody", "content", "application/json", "schema", "$ref"); got != "#/components/schemas/TokenPayload" {
			t.Errorf("POST %s requestBody = %v, want TokenPayload", path, got)
		}
	}

	// /logout is a browser navigation identified by cookies, never a bearer token.
	logout := mustLookup(t, doc, "paths", "/logout", "get")
	var schemes []string
	for _, requirement := range mustValue(logout, "security").([]any) {
		for name := range requirement.(map[string]any) {
			schemes = append(schemes, name)
		}
	}
	if !reflect.DeepEqual(schemes, []string{"sessionCookie", "providerTokenCookie"}) {
		t.Errorf("logoutUser security = %v, want [sessionCookie providerTokenCookie]", schemes)
	}
	securitySchemes := mustLookup(t, doc, "components", "securitySchemes")
	for scheme, cookie := range map[string]string{"sessionCookie": "session_cookie", "providerTokenCookie": "provider_token"} {
		def := mustValue(securitySchemes, scheme)
		if mustValue(def, "in") != "cookie" || mustValue(def, "name") != cookie {
			t.Errorf("securityScheme %s = %v, want cookie %q", scheme, def, cookie)
		}
	}
	for _, code := range []string{"302", "303"} {
		if _, ok := mappingValue(mustLookup(t, logout, "responses", code, "headers"), "Location"); !ok {
			t.Errorf("logoutUser %s must declare a Location header", code)
		}
	}

	payload := mustLookup(t, doc, "components", "schemas", "TokenPayload")
	if got := sequenceStrings(mustValue(payload, "required")); !reflect.DeepEqual(got, []string{"token"}) {
		t.Errorf("TokenPayload required = %v, want [token]", got)
	}
	if mustValue(payload, "additionalProperties") != false {
		t.Error("TokenPayload must set additionalProperties: false")
	}
	// Execute the declared pattern rather than match its text: a token must be
	// accepted with or without surrounding whitespace, and whitespace-only
	// input must be rejected.
	pattern, ok := mustLookup(t, payload, "properties", "token", "pattern").(string)
	if !ok {
		t.Fatalf("TokenPayload.token must declare a string pattern")
	}
	tokenPattern := regexp.MustCompile(pattern)
	for _, token := range []string{"eyJhbGciOiJIUzI1NiJ9.e30.sig", "  eyJhbGciOiJIUzI1NiJ9.e30.sig  "} {
		if !tokenPattern.MatchString(token) {
			t.Errorf("TokenPayload.token pattern rejected %q, want accepted", token)
		}
	}
	for _, token := range []string{"", " ", "\t\n  ", " ", " ", "\u0085 　"} {
		if tokenPattern.MatchString(token) {
			t.Errorf("TokenPayload.token pattern accepted %q, want rejected", token)
		}
	}
}
