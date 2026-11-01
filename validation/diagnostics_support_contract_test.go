package validation

import (
	"fmt"
	"sort"
	"strings"
	"testing"
)

// This test pins the Blowhorn issue #771 schema step: the v1beta1/support
// drift decision, the AnonymousSupportRequest shape, and the exact
// FailureDiagnostic field list the Cloud and Blowhorn workers build
// against. Field names, required-vs-optional, and closed objects are the
// contract; a widening edit here breaks a worker silently, so any change
// to these lists must be a deliberate, reviewed contract change, not a
// drive-by edit.

const (
	supportSpecPath     = "schemas/constructs/v1beta1/support/api.yml"
	diagnosticsSpecPath = "schemas/constructs/v1beta1/diagnostics/api.yml"
)

func specMap(t *testing.T, m map[string]any, key string) map[string]any {
	t.Helper()
	v, ok := m[key]
	if !ok {
		t.Fatalf("missing key %q", key)
	}
	switch out := v.(type) {
	case map[string]any:
		return out
	case map[any]any:
		// yaml.v3 decodes a mapping with any non-string key (an unquoted
		// `401:` response code) this way.
		converted := make(map[string]any, len(out))
		for k, val := range out {
			converted[fmt.Sprint(k)] = val
		}
		return converted
	default:
		t.Fatalf("key %q is %T, want a mapping", key, v)
		return nil
	}
}

// prop returns the named property schema, failing the test (not panicking)
// when it is missing or not a mapping, so one broken pin does not abort the
// whole validation package.
func prop(t *testing.T, props map[string]any, name string) map[string]any {
	t.Helper()
	return specMap(t, props, name)
}

// stringList converts a YAML sequence of strings, failing the test on any
// other shape.
func stringList(t *testing.T, what string, v any) []string {
	t.Helper()
	items, ok := v.([]any)
	if !ok {
		t.Fatalf("%s is %T, want a list", what, v)
	}
	out := make([]string, 0, len(items))
	for _, item := range items {
		str, ok := item.(string)
		if !ok {
			t.Fatalf("%s holds %T, want strings", what, item)
		}
		out = append(out, str)
	}
	return out
}

func schemaProps(t *testing.T, doc map[string]any, name string) (map[string]any, []string) {
	t.Helper()
	schemas := specMap(t, specMap(t, doc, "components"), "schemas")
	schema := specMap(t, schemas, name)
	props := specMap(t, schema, "properties")
	var required []string
	if raw, ok := schema["required"]; ok {
		required = stringList(t, name+".required", raw)
	}
	return props, required
}

func assertKeysEqual(t *testing.T, what string, got map[string]any, want ...string) {
	t.Helper()
	var keys []string
	for k := range got {
		keys = append(keys, k)
	}
	sort.Strings(keys)
	sort.Strings(want)
	if len(keys) != len(want) {
		t.Errorf("%s properties = %v, want exactly %v", what, keys, want)
		return
	}
	for i := range keys {
		if keys[i] != want[i] {
			t.Errorf("%s properties = %v, want exactly %v", what, keys, want)
			return
		}
	}
}

func assertStringSliceEqual(t *testing.T, what string, got []string, want ...string) {
	t.Helper()
	sort.Strings(got)
	sort.Strings(want)
	if len(got) != len(want) {
		t.Errorf("%s = %v, want %v", what, got, want)
		return
	}
	for i := range got {
		if got[i] != want[i] {
			t.Errorf("%s = %v, want %v", what, got, want)
			return
		}
	}
}

func operation(t *testing.T, doc map[string]any, path, method string) map[string]any {
	t.Helper()
	paths := specMap(t, doc, "paths")
	entry := specMap(t, paths, path)
	return specMap(t, entry, method)
}

func assertAdditionalPropertiesFalse(t *testing.T, what string, schema map[string]any) {
	t.Helper()
	// yaml.v3 decodes `additionalProperties: false` as bool false; a
	// missing key decodes as nil, which also fails this check.
	if schema["additionalProperties"] != false {
		t.Errorf("%s must declare additionalProperties: false", what)
	}
}

func nestedProps(t *testing.T, props map[string]any, name string) map[string]any {
	t.Helper()
	return specMap(t, specMap(t, props, name), "properties")
}

// TestSupportRequestUnchanged pins the drift decision: the schema side of
// Blowhorn #771 does NOT reshape SupportRequest to match Cloud's legacy
// webhook payload. meshery/schemas is the post-migration authority, so
// Cloud adopts SupportRequest at POST /api/integrations/support and keeps
// /api/webhook/support as a deprecated alias on its own side. If this test
// fails, someone reshaped the canonical contract toward the legacy shape.
func TestSupportRequestUnchanged(t *testing.T) {
	doc := loadYAMLMap(t, supportSpecPath)
	props, required := schemaProps(t, doc, "SupportRequest")
	assertKeysEqual(t, "SupportRequest", props, "subject", "message", "scope")
	assertStringSliceEqual(t, "SupportRequest.required", required, "subject", "message")

	subject := prop(t, props, "subject")
	if subject["minLength"] != 1 || subject["maxLength"] != 255 {
		t.Errorf("SupportRequest.subject bounds = %v/%v, want 1/255", subject["minLength"], subject["maxLength"])
	}
	message := prop(t, props, "message")
	if message["minLength"] != 10 {
		t.Errorf("SupportRequest.message minLength = %v, want 10", message["minLength"])
	}
	scopeEnum := stringList(t, "scopeEnum", prop(t, props, "scope")["enum"])
	assertStringSliceEqual(t, "SupportRequest.scope enum", scopeEnum, "Support", "Community", "Account", "Commercial")

	op := operation(t, doc, "/api/integrations/support", "post")
	if op["operationId"] != "submitSupportRequest" {
		t.Errorf("submit operation operationId = %v, want submitSupportRequest", op["operationId"])
	}
}

// TestAnonymousSupportRequestIsSupportRequestPlusTwo pins the anonymous
// shape: exactly SupportRequest's fields plus optional email and
// diagnosticId, with the same required list.
func TestAnonymousSupportRequestIsSupportRequestPlusTwo(t *testing.T) {
	doc := loadYAMLMap(t, supportSpecPath)
	props, required := schemaProps(t, doc, "AnonymousSupportRequest")
	assertKeysEqual(t, "AnonymousSupportRequest", props, "subject", "message", "scope", "email", "diagnosticId")
	assertStringSliceEqual(t, "AnonymousSupportRequest.required", required, "subject", "message")

	email := prop(t, props, "email")
	if email["format"] != "email" {
		t.Errorf("AnonymousSupportRequest.email format = %v, want email", email["format"])
	}
	diagnostic := prop(t, props, "diagnosticId")
	if diagnostic["format"] != "uuid" {
		t.Errorf("AnonymousSupportRequest.diagnosticId format = %v, want uuid", diagnostic["format"])
	}

	op := operation(t, doc, "/api/support/anonymous", "post")
	if op["operationId"] != "submitAnonymousSupportRequest" {
		t.Errorf("anonymous operation operationId = %v, want submitAnonymousSupportRequest", op["operationId"])
	}
	// "Anonymous" means no signed-in user, not no credential: Cloud serves
	// this route behind the client key or a session (meshery-cloud
	// AuthWithClientKeyOrSessionMiddleware), and a request with neither is
	// a 401.
	assertAdditionalPropertiesFalse(t, "AnonymousSupportRequest", specMap(t, specMap(t, specMap(t, doc, "components"), "schemas"), "AnonymousSupportRequest"))
	assertClientKeyOrJWT(t, "anonymous support operation", op)
	// The wire Cloud sends (SubmitAnonymousSupport): 200 {status, diagnosticId?}.
	okBody := responseSchema(t, doc, op, "200")
	assertKeysEqual(t, "anonymous support 200 body", specMap(t, okBody, "properties"), "status", "diagnosticId")
	assertStringSliceEqual(t, "anonymous support 200 required", stringList(t, "required", okBody["required"]), "status")
	assertResponseCodes(t, "anonymous support operation", op, "200", "400", "401", "413", "429", "500", "502")
	assertRetryAfterOn429(t, doc, "anonymous support operation", op)
	if _, ok := specMap(t, op, "responses")["401"]; !ok {
		t.Errorf("anonymous support operation declares no 401, but a request without a client key or session is refused")
	}
}

// assertClientKeyOrJWT asserts an operation's security is exactly two
// alternatives: the X-Client-Key pre-shared key or a bearer token.
func assertClientKeyOrJWT(t *testing.T, label string, op map[string]any) {
	t.Helper()
	security, ok := op["security"].([]any)
	if !ok || len(security) != 2 {
		t.Fatalf("%s security = %v, want clientKey and jwt alternatives", label, op["security"])
	}
	var schemes []string
	for _, entry := range security {
		alternative, ok := entry.(map[string]any)
		if !ok {
			t.Fatalf("%s security entry is %T, want a mapping", label, entry)
		}
		for scheme := range alternative {
			schemes = append(schemes, scheme)
		}
	}
	assertStringSliceEqual(t, label+" security schemes", schemes, "clientKey", "jwt")
}

// assertRetryAfterOn429 asserts the 429 response, followed through its
// #/components/responses/ reference, declares the Retry-After header Cloud
// sets on every rate-limit refusal (writeRateLimited).
func assertRetryAfterOn429(t *testing.T, doc map[string]any, label string, op map[string]any) {
	t.Helper()
	resp := resolveResponse(t, doc, specMap(t, specMap(t, op, "responses"), "429"))
	header := specMap(t, specMap(t, resp, "headers"), "Retry-After")
	if schema := specMap(t, header, "schema"); schema["type"] != "integer" {
		t.Errorf("%s Retry-After schema = %v, want integer seconds", label, schema)
	}
}

// responseSchema returns the application/json schema of one response.
func responseSchema(t *testing.T, doc, op map[string]any, code string) map[string]any {
	t.Helper()
	resp := resolveResponse(t, doc, specMap(t, specMap(t, op, "responses"), code))
	return specMap(t, specMap(t, specMap(t, resp, "content"), "application/json"), "schema")
}

// assertResponseCodes pins the exact set of status codes an operation
// declares, so a code the handler answers cannot go undeclared and a code it
// never answers cannot be added.
func assertResponseCodes(t *testing.T, label string, op map[string]any, want ...string) {
	t.Helper()
	var got []string
	for code := range specMap(t, op, "responses") {
		got = append(got, code)
	}
	assertStringSliceEqual(t, label+" response codes", got, want...)
}

// resolveResponse follows a local #/components/responses/<name> reference.
func resolveResponse(t *testing.T, doc map[string]any, resp map[string]any) map[string]any {
	t.Helper()
	ref, ok := resp["$ref"].(string)
	if !ok {
		return resp
	}
	const prefix = "#/components/responses/"
	if !strings.HasPrefix(ref, prefix) {
		t.Fatalf("response $ref %q is not a local #/components/responses reference", ref)
	}
	return specMap(t, specMap(t, specMap(t, doc, "components"), "responses"), strings.TrimPrefix(ref, prefix))
}

// TestFailureDiagnosticExactFieldList pins the field list the Cloud and
// Blowhorn workers were briefed with. Only installId is optional; every
// object is closed.
func TestFailureDiagnosticExactFieldList(t *testing.T) {
	doc := loadYAMLMap(t, diagnosticsSpecPath)
	schemas := specMap(t, specMap(t, doc, "components"), "schemas")
	diagnostic := specMap(t, schemas, "FailureDiagnostic")
	props, required := schemaProps(t, doc, "FailureDiagnostic")
	assertKeysEqual(t, "FailureDiagnostic", props,
		"diagnosticId", "occurredAt", "firstSeenAt", "count",
		"client", "os", "failure", "compat", "installId")
	assertStringSliceEqual(t, "FailureDiagnostic.required", required,
		"diagnosticId", "occurredAt", "firstSeenAt", "count",
		"client", "os", "failure", "compat")
	assertAdditionalPropertiesFalse(t, "FailureDiagnostic", diagnostic)

	if prop(t, props, "diagnosticId")["format"] != "uuid" {
		t.Errorf("diagnosticId format = %v, want uuid", prop(t, props, "diagnosticId")["format"])
	}
	if prop(t, props, "occurredAt")["format"] != "date-time" {
		t.Errorf("occurredAt format = %v, want date-time", prop(t, props, "occurredAt")["format"])
	}
	if prop(t, props, "firstSeenAt")["format"] != "date-time" {
		t.Errorf("firstSeenAt format = %v, want date-time", prop(t, props, "firstSeenAt")["format"])
	}
	if prop(t, props, "count")["minimum"] != 1 {
		t.Errorf("count minimum = %v, want 1", prop(t, props, "count")["minimum"])
	}
	// installId is optional, and it IS format uuid: the per-install id
	// is a uuid4 minted once per install (Blowhorn's installationId,
	// written beside cloud.yaml and reused), never a hardware id.
	if prop(t, props, "installId")["format"] != "uuid" {
		t.Errorf("installId format = %v, want uuid", prop(t, props, "installId")["format"])
	}

	assertKeysEqual(t, "FailureDiagnostic.client", nestedProps(t, props, "client"),
		"kind", "version", "buildSha", "channel")
	assertAdditionalPropertiesFalse(t, "FailureDiagnostic.client", prop(t, props, "client"))
	kindEnum := stringList(t, "kindEnum", prop(t, nestedProps(t, props, "client"), "kind")["enum"])
	assertStringSliceEqual(t, "FailureDiagnostic.client.kind enum", kindEnum, "blowhorn-desktop")

	assertKeysEqual(t, "FailureDiagnostic.os", nestedProps(t, props, "os"),
		"name", "version", "arch")
	assertAdditionalPropertiesFalse(t, "FailureDiagnostic.os", prop(t, props, "os"))

	failureProps := nestedProps(t, props, "failure")
	assertKeysEqual(t, "FailureDiagnostic.failure", failureProps,
		"surface", "cause", "code", "message", "ticksSkipped")
	assertAdditionalPropertiesFalse(t, "FailureDiagnostic.failure", prop(t, props, "failure"))
	surfaceEnum := stringList(t, "surfaceEnum", prop(t, failureProps, "surface")["enum"])
	assertStringSliceEqual(t, "FailureDiagnostic.failure.surface enum", surfaceEnum,
		"tray", "popover", "console", "service")
	// cause is a patterned string, NOT a closed enum: a closed enum would
	// make the server reject reports carrying a cause it does not know yet.
	cause := prop(t, failureProps, "cause")
	if _, isEnum := cause["enum"]; isEnum {
		t.Errorf("failure.cause must not be a closed enum; it is a patterned string so future named causes are accepted")
	}
	if cause["pattern"] != "^[a-z][a-z0-9_]*$" {
		t.Errorf("failure.cause pattern = %v, want ^[a-z][a-z0-9_]*$", cause["pattern"])
	}
	if prop(t, failureProps, "message")["maxLength"] != 500 {
		t.Errorf("failure.message maxLength = %v, want 500", prop(t, failureProps, "message")["maxLength"])
	}
	if prop(t, failureProps, "ticksSkipped")["minimum"] != 0 {
		t.Errorf("failure.ticksSkipped minimum = %v, want 0", prop(t, failureProps, "ticksSkipped")["minimum"])
	}

	assertKeysEqual(t, "FailureDiagnostic.compat", nestedProps(t, props, "compat"),
		"requiresSchema", "contractVersion")
	assertAdditionalPropertiesFalse(t, "FailureDiagnostic.compat", prop(t, props, "compat"))

	op := operation(t, doc, "/api/diagnostics/failures", "post")
	if op["operationId"] != "submitFailureDiagnostic" {
		t.Errorf("diagnostics operation operationId = %v, want submitFailureDiagnostic", op["operationId"])
	}
	// Either the client key or a bearer token authenticates the call.
	assertClientKeyOrJWT(t, "diagnostics operation", op)
	// The wire Cloud sends (SubmitFailureDiagnostic): 201 {diagnosticId}.
	created := responseSchema(t, doc, op, "201")
	assertKeysEqual(t, "diagnostics 201 body", specMap(t, created, "properties"), "diagnosticId")
	assertStringSliceEqual(t, "diagnostics 201 required", stringList(t, "required", created["required"]), "diagnosticId")
	assertResponseCodes(t, "diagnostics operation", op, "201", "400", "401", "413", "429", "500", "503")
	assertRetryAfterOn429(t, doc, "diagnostics operation", op)
}
