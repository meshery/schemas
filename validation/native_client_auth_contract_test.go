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
		{"/api/identity/native/authorize", "post", "approveNativeClientAuthorization"},
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
	if got := mustLookup(t, exchange, "requestBody", "content", "application/json", "schema", "$ref"); got != "#/components/schemas/NativeCodeExchangeRequest" {
		t.Errorf("exchange requestBody = %v, want NativeCodeExchangeRequest", got)
	}
	approve := mustLookup(t, doc, "paths", "/api/identity/native/authorize", "post")
	if got := mustLookup(t, approve, "requestBody", "content", "application/x-www-form-urlencoded", "schema", "$ref"); got != "#/components/schemas/NativeAuthorizationRequest" {
		t.Errorf("approve requestBody = %v, want NativeAuthorizationRequest", got)
	}
	if _, ok := mappingValue(mustValue(approve, "responses"), "302"); !ok {
		t.Errorf("approveNativeClientAuthorization must respond 302")
	}

	schemas := mustLookup(t, doc, "components", "schemas")
	props := mustLookup(t, schemas, "NativeAuthorizationRequest", "properties")

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
			t.Errorf("NativeAuthorizationRequest must not carry %q", name)
		}
	}
	for _, schema := range []any{mustLookup(t, doc, "components", "parameters", "nativePort", "schema"), mustLookup(t, props, "port")} {
		if mustValue(schema, "minimum") != 1024 || mustValue(schema, "maximum") != 65535 {
			t.Errorf("port bounds = [%v, %v], want [1024, 65535]", mustValue(schema, "minimum"), mustValue(schema, "maximum"))
		}
	}

	exch := mustLookup(t, schemas, "NativeCodeExchangeRequest")
	if got := sequenceStrings(mustValue(exch, "required")); !reflect.DeepEqual(got, []string{"code", "codeVerifier"}) {
		t.Errorf("NativeCodeExchangeRequest required = %v, want [code codeVerifier]", got)
	}
	if mustValue(exch, "additionalProperties") != false {
		t.Errorf("NativeCodeExchangeRequest must set additionalProperties: false (deviceName was dropped)")
	}
}
