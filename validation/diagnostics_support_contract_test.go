package validation

import (
	"os"
	"path/filepath"
	"runtime"
	"sort"
	"testing"

	"gopkg.in/yaml.v3"
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

func loadSpecYAML(t *testing.T, rel string) map[string]any {
	t.Helper()
	_, file, _, ok := runtime.Caller(0)
	if !ok {
		t.Fatal("cannot locate test file")
	}
	abs := filepath.Join(filepath.Dir(file), "..", rel)
	raw, err := os.ReadFile(abs)
	if err != nil {
		t.Fatalf("reading %s: %v", rel, err)
	}
	var doc map[string]any
	if err := yaml.Unmarshal(raw, &doc); err != nil {
		t.Fatalf("parsing %s: %v", rel, err)
	}
	return doc
}

func specMap(t *testing.T, m map[string]any, key string) map[string]any {
	t.Helper()
	v, ok := m[key]
	if !ok {
		t.Fatalf("missing key %q", key)
	}
	out, ok := v.(map[string]any)
	if !ok {
		t.Fatalf("key %q is %T, want a mapping", key, v)
	}
	return out
}

func schemaProps(t *testing.T, doc map[string]any, name string) (map[string]any, []string) {
	t.Helper()
	schemas := specMap(t, specMap(t, doc, "components"), "schemas")
	schema := specMap(t, schemas, name)
	props, ok := schema["properties"].(map[string]any)
	if !ok {
		t.Fatalf("schema %s has no properties mapping", name)
	}
	var required []string
	if raw, ok := schema["required"]; ok {
		for _, item := range raw.([]any) {
			required = append(required, item.(string))
		}
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
	nested, ok := props[name].(map[string]any)
	if !ok {
		t.Fatalf("property %s is not an object schema", name)
	}
	out, ok := nested["properties"].(map[string]any)
	if !ok {
		t.Fatalf("property %s has no properties mapping", name)
	}
	return out
}

// TestSupportRequestUnchanged pins the drift decision: the schema side of
// Blowhorn #771 does NOT reshape SupportRequest to match Cloud's legacy
// webhook payload. meshery/schemas is the post-migration authority, so
// Cloud adopts SupportRequest at POST /api/integrations/support and keeps
// /api/webhook/support as a deprecated alias on its own side. If this test
// fails, someone reshaped the canonical contract toward the legacy shape.
func TestSupportRequestUnchanged(t *testing.T) {
	doc := loadSpecYAML(t, supportSpecPath)
	props, required := schemaProps(t, doc, "SupportRequest")
	assertKeysEqual(t, "SupportRequest", props, "subject", "message", "scope")
	assertStringSliceEqual(t, "SupportRequest.required", required, "subject", "message")

	subject := props["subject"].(map[string]any)
	if subject["minLength"] != 1 || subject["maxLength"] != 255 {
		t.Errorf("SupportRequest.subject bounds = %v/%v, want 1/255", subject["minLength"], subject["maxLength"])
	}
	message := props["message"].(map[string]any)
	if message["minLength"] != 10 {
		t.Errorf("SupportRequest.message minLength = %v, want 10", message["minLength"])
	}
	var scopeEnum []string
	for _, item := range props["scope"].(map[string]any)["enum"].([]any) {
		scopeEnum = append(scopeEnum, item.(string))
	}
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
	doc := loadSpecYAML(t, supportSpecPath)
	props, required := schemaProps(t, doc, "AnonymousSupportRequest")
	assertKeysEqual(t, "AnonymousSupportRequest", props, "subject", "message", "scope", "email", "diagnosticId")
	assertStringSliceEqual(t, "AnonymousSupportRequest.required", required, "subject", "message")

	email := props["email"].(map[string]any)
	if email["format"] != "email" {
		t.Errorf("AnonymousSupportRequest.email format = %v, want email", email["format"])
	}
	diagnostic := props["diagnosticId"].(map[string]any)
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
	assertClientKeyOrJWT(t, "anonymous support operation", op)
	assertRetryAfterOn429(t, "anonymous support operation", op)
	if _, ok := op["responses"].(map[string]any)["401"]; !ok {
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
		for scheme := range entry.(map[string]any) {
			schemes = append(schemes, scheme)
		}
	}
	assertStringSliceEqual(t, label+" security schemes", schemes, "clientKey", "jwt")
}

// assertRetryAfterOn429 asserts the 429 response declares the Retry-After
// header Cloud sets on every rate-limit refusal (writeRateLimited).
func assertRetryAfterOn429(t *testing.T, label string, op map[string]any) {
	t.Helper()
	resp, ok := op["responses"].(map[string]any)["429"].(map[string]any)
	if !ok {
		t.Fatalf("%s declares no 429", label)
	}
	headers, _ := resp["headers"].(map[string]any)
	header, ok := headers["Retry-After"].(map[string]any)
	if !ok {
		t.Fatalf("%s 429 does not declare a Retry-After header", label)
	}
	if schema, _ := header["schema"].(map[string]any); schema["type"] != "integer" {
		t.Errorf("%s Retry-After schema = %v, want integer seconds", label, header["schema"])
	}
}

// TestFailureDiagnosticExactFieldList pins the field list the Cloud and
// Blowhorn workers were briefed with. Only installId is optional; every
// object is closed.
func TestFailureDiagnosticExactFieldList(t *testing.T) {
	doc := loadSpecYAML(t, diagnosticsSpecPath)
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

	if props["diagnosticId"].(map[string]any)["format"] != "uuid" {
		t.Errorf("diagnosticId format = %v, want uuid", props["diagnosticId"].(map[string]any)["format"])
	}
	if props["occurredAt"].(map[string]any)["format"] != "date-time" {
		t.Errorf("occurredAt format = %v, want date-time", props["occurredAt"].(map[string]any)["format"])
	}
	if props["firstSeenAt"].(map[string]any)["format"] != "date-time" {
		t.Errorf("firstSeenAt format = %v, want date-time", props["firstSeenAt"].(map[string]any)["format"])
	}
	if props["count"].(map[string]any)["minimum"] != 1 {
		t.Errorf("count minimum = %v, want 1", props["count"].(map[string]any)["minimum"])
	}
	// installId is optional, and it IS format uuid: the per-install id
	// is a uuid4 minted once per install (Blowhorn's installationId,
	// written beside cloud.yaml and reused), never a hardware id.
	if props["installId"].(map[string]any)["format"] != "uuid" {
		t.Errorf("installId format = %v, want uuid", props["installId"].(map[string]any)["format"])
	}

	assertKeysEqual(t, "FailureDiagnostic.client", nestedProps(t, props, "client"),
		"kind", "version", "buildSha", "channel")
	assertAdditionalPropertiesFalse(t, "FailureDiagnostic.client", props["client"].(map[string]any))
	var kindEnum []string
	for _, item := range nestedProps(t, props, "client")["kind"].(map[string]any)["enum"].([]any) {
		kindEnum = append(kindEnum, item.(string))
	}
	assertStringSliceEqual(t, "FailureDiagnostic.client.kind enum", kindEnum, "blowhorn-desktop")

	assertKeysEqual(t, "FailureDiagnostic.os", nestedProps(t, props, "os"),
		"name", "version", "arch")
	assertAdditionalPropertiesFalse(t, "FailureDiagnostic.os", props["os"].(map[string]any))

	failureProps := nestedProps(t, props, "failure")
	assertKeysEqual(t, "FailureDiagnostic.failure", failureProps,
		"surface", "cause", "code", "message", "ticksSkipped")
	assertAdditionalPropertiesFalse(t, "FailureDiagnostic.failure", props["failure"].(map[string]any))
	var surfaceEnum []string
	for _, item := range failureProps["surface"].(map[string]any)["enum"].([]any) {
		surfaceEnum = append(surfaceEnum, item.(string))
	}
	assertStringSliceEqual(t, "FailureDiagnostic.failure.surface enum", surfaceEnum,
		"tray", "popover", "console", "service")
	// cause is a patterned string, NOT a closed enum: a closed enum would
	// make the server reject reports carrying a cause it does not know yet.
	cause := failureProps["cause"].(map[string]any)
	if _, isEnum := cause["enum"]; isEnum {
		t.Errorf("failure.cause must not be a closed enum; it is a patterned string so future named causes are accepted")
	}
	if cause["pattern"] != "^[a-z][a-z0-9_]*$" {
		t.Errorf("failure.cause pattern = %v, want ^[a-z][a-z0-9_]*$", cause["pattern"])
	}
	if failureProps["message"].(map[string]any)["maxLength"] != 500 {
		t.Errorf("failure.message maxLength = %v, want 500", failureProps["message"].(map[string]any)["maxLength"])
	}
	if failureProps["ticksSkipped"].(map[string]any)["minimum"] != 0 {
		t.Errorf("failure.ticksSkipped minimum = %v, want 0", failureProps["ticksSkipped"].(map[string]any)["minimum"])
	}

	assertKeysEqual(t, "FailureDiagnostic.compat", nestedProps(t, props, "compat"),
		"requiresSchema", "contractVersion")
	assertAdditionalPropertiesFalse(t, "FailureDiagnostic.compat", props["compat"].(map[string]any))

	op := operation(t, doc, "/api/diagnostics/failures", "post")
	if op["operationId"] != "submitFailureDiagnostic" {
		t.Errorf("diagnostics operation operationId = %v, want submitFailureDiagnostic", op["operationId"])
	}
	// Either the client key or a bearer token authenticates the call.
	assertClientKeyOrJWT(t, "diagnostics operation", op)
	assertRetryAfterOn429(t, "diagnostics operation", op)
}
