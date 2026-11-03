package validation

import (
	"path/filepath"
	"reflect"
	"testing"
)

const tokenV1beta3Spec = "schemas/constructs/v1beta3/token/api.yml"

// The native client sign-in contract: a loopback redirect to 127.0.0.1 with a
// PKCE S256 code exchange. The wire shape pinned here is what Meshery Cloud and
// local native clients are coded against.
func TestNativeClientAuthContract(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), tokenV1beta3Spec))

	ops := []struct {
		path, method, operationID string
	}{
		{"/api/identity/native/authorize", "get", "getNativeClientAuthorization"},
		{"/api/identity/native/token", "post", "exchangeNativeAuthorizationCode"},
	}
	for _, op := range ops {
		operation := mustLookup(t, doc, "paths", op.path, op.method)
		if got := mustValue(operation, "operationId"); got != op.operationID {
			t.Errorf("%s %s operationId = %v, want %q", op.method, op.path, got, op.operationID)
		}
		if got := sequenceStrings(mustValue(operation, "x-internal")); !reflect.DeepEqual(got, []string{"cloud"}) {
			t.Errorf("%s x-internal = %v, want [cloud]", op.operationID, got)
		}
	}

	exchange := mustLookup(t, doc, "paths", "/api/identity/native/token", "post")
	security, ok := mappingValue(exchange, "security")
	if !ok {
		t.Fatalf("exchangeNativeAuthorizationCode must declare security: [] (code + verifier authenticate it)")
	}
	if seq, isSeq := security.([]any); !isSeq || len(seq) != 0 {
		t.Errorf("exchangeNativeAuthorizationCode security = %v, want empty", security)
	}
	if got := mustLookup(t, exchange, "responses", "201", "content", "application/json", "schema", "$ref"); got != "#/components/schemas/UserToken" {
		t.Errorf("exchange 201 schema = %v, want UserToken", got)
	}
	if got := mustLookup(t, exchange, "requestBody", "content", "application/json", "schema", "$ref"); got != "#/components/schemas/NativeCodeExchangePayload" {
		t.Errorf("exchange requestBody = %v, want NativeCodeExchangePayload", got)
	}
	authorizePath := mustLookup(t, doc, "paths", "/api/identity/native/authorize")
	if _, ok := mappingValue(authorizePath, "post"); ok {
		t.Error("POST /api/identity/native/authorize must be absent; GET issues the code")
	}
	authorize := mustLookup(t, authorizePath, "get")
	responses := mustValue(authorize, "responses")
	if _, ok := mappingValue(responses, "200"); ok {
		t.Error("getNativeClientAuthorization must not respond 200")
	}
	redirect := mustLookup(t, responses, "302")
	if _, ok := mappingValue(mustValue(redirect, "headers"), "Location"); !ok {
		t.Error("getNativeClientAuthorization 302 must declare a Location header")
	}
	for _, code := range []string{"400", "401", "403", "426", "500"} {
		if _, ok := mappingValue(responses, code); !ok {
			t.Errorf("getNativeClientAuthorization missing %s", code)
		}
	}

	schemas := mustLookup(t, doc, "components", "schemas")
	props := mustLookup(t, schemas, "NativeAuthorizationPayload", "properties")

	if got := sequenceStrings(mustLookup(t, props, "codeChallengeMethod", "enum")); !reflect.DeepEqual(got, []string{"S256"}) {
		t.Errorf("codeChallengeMethod enum = %v, want [S256]", got)
	}
	enum := mustLookup(t, doc, "components", "parameters", "nativeCodeChallengeMethod", "schema", "enum")
	if got := sequenceStrings(enum); !reflect.DeepEqual(got, []string{"S256"}) {
		t.Errorf("nativeCodeChallengeMethod enum = %v, want [S256]", got)
	}

	// The redirect host is fixed to 127.0.0.1, so the client supplies a port
	// only: no redirect URI or host field may exist.
	for _, name := range []string{"redirectUri", "redirectUrl", "host", "callback"} {
		if _, has := mappingValue(props, name); has {
			t.Errorf("NativeAuthorizationPayload must not carry %q", name)
		}
	}
	for _, schema := range []any{mustLookup(t, doc, "components", "parameters", "nativePort", "schema"), mustLookup(t, props, "port")} {
		if mustValue(schema, "minimum") != 1024 || mustValue(schema, "maximum") != 65535 {
			t.Errorf("port bounds = [%v, %v], want [1024, 65535]", mustValue(schema, "minimum"), mustValue(schema, "maximum"))
		}
	}

	exch := mustLookup(t, schemas, "NativeCodeExchangePayload")
	if got := sequenceStrings(mustValue(exch, "required")); !reflect.DeepEqual(got, []string{"code", "codeVerifier"}) {
		t.Errorf("NativeCodeExchangePayload required = %v, want [code codeVerifier]", got)
	}
	if mustValue(exch, "additionalProperties") != false {
		t.Errorf("NativeCodeExchangePayload must set additionalProperties: false (deviceName was dropped)")
	}
}
