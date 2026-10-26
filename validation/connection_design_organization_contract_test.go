package validation

import (
	"path/filepath"
	"strings"
	"testing"
)

// Connection.organizationId and MesheryPattern.organizationId are
// server-assigned. Write payloads do not accept them. Closed list
// projections declare them so the server can return them.
func TestConnectionOrganizationIDIsServerAssigned(t *testing.T) {
	root := repoRootDir(t)
	doc := loadOpenAPIDocument(t, filepath.Join(root, "schemas/constructs/v1beta3/connection/api.yml"))
	entity := loadYAMLMap(t, "schemas/constructs/v1beta3/connection/connection.yaml")

	// Required on write (the server always assigns it), nullable on read:
	// connections registered before servers recorded an organization have
	// none, and their owner may belong to several organizations, so none can
	// be assigned after the fact. A required non-pointer field made every
	// connection read fail on those rows (gofrs uuid cannot Scan NULL).
	if got := sequenceStrings(entity["required"]); containsString(got, "organizationId") {
		t.Errorf("Connection.required = %v, want organizationId optional: legacy connections have none", got)
	}

	prop := mustLookup(t, entity, "properties", "organizationId")
	// readOnly is omitted on purpose. RegistrantData inlines Connection into
	// registry registration requests, and readOnly there drops the connection
	// field from the generated RTK client.
	assertServerOrganizationIDShape(t, "Connection.organizationId", prop, false, true)
	orgDesc, _ := mustValue(prop, "description").(string)
	for _, phrase := range []string{"organization the connection belongs to", "session organization", "Never accepted from clients", "Not marked readOnly", "ignored", "Absent only on connections registered before", "backfill"} {
		if !strings.Contains(orgDesc, phrase) {
			t.Errorf("Connection.organizationId description = %q, want it to mention %q", orgDesc, phrase)
		}
	}
	if got := mustValue(mustLookup(t, prop, "x-oapi-codegen-extra-tags"), "db"); got != "organization_id" {
		t.Errorf("Connection.organizationId db = %v, want organization_id", got)
	}

	for _, schema := range []string{"ConnectionPayload", "ConnectionRegistrationEvent", "ConnectionActionRequest"} {
		props := mustLookup(t, doc, "components", "schemas", schema, "properties")
		if _, has := mappingValue(props, "organizationId"); has {
			t.Errorf("%s must not accept organizationId", schema)
		}
	}

	register := mustLookup(t, doc, "paths", "/api/integrations/connections", "post")
	desc, _ := mustValue(register, "description").(string)
	if !strings.Contains(desc, "session") {
		t.Errorf("registerConnection description = %q, want it to say the server assigns the organization from the session", desc)
	}
	if got := mustLookup(t, register, "requestBody", "content", "application/json", "schema", "$ref"); got != "#/components/schemas/ConnectionPayload" {
		t.Errorf("registerConnection requestBody = %v, want ConnectionPayload", got)
	}
	header := headerParam(t, register, "X-Current-Orgid")
	headerDesc, _ := mustValue(header, "description").(string)
	if strings.Contains(headerDesc, "ignored for other kinds") {
		t.Errorf("X-Current-Orgid description = %q, want every kind to take the session organization", headerDesc)
	}
	if !strings.Contains(headerDesc, "selected") {
		t.Errorf("X-Current-Orgid description = %q, want it to name the selected organization", headerDesc)
	}

	summary := mustLookup(t, doc, "components", "schemas", "ConnectionSummary")
	if got := mustValue(summary, "additionalProperties"); got != false {
		t.Errorf("ConnectionSummary additionalProperties = %v, want false", got)
	}
	if got := sequenceStrings(mustValue(summary, "required")); !containsString(got, "organizationId") {
		t.Errorf("ConnectionSummary.required = %v, want organizationId", got)
	}
	summaryOrg := mustLookup(t, summary, "properties", "organizationId")
	assertServerOrganizationID(t, "ConnectionSummary.organizationId", summaryOrg, true)
}

func TestDesignOrganizationIDIsServerAssigned(t *testing.T) {
	root := repoRootDir(t)
	doc := loadOpenAPIDocument(t, filepath.Join(root, "schemas/constructs/v1beta3/design/api.yml"))
	pattern := mustLookup(t, doc, "components", "schemas", "MesheryPattern")

	if got := sequenceStrings(mustValue(pattern, "required")); !containsString(got, "organizationId") {
		t.Errorf("MesheryPattern.required = %v, want organizationId", got)
	}

	prop := mustLookup(t, pattern, "properties", "organizationId")
	assertServerOrganizationID(t, "MesheryPattern.organizationId", prop, true)
	orgDesc, _ := mustValue(prop, "description").(string)
	for _, phrase := range []string{
		"organization the design belongs to",
		"session organization",
		"Never accepted from clients",
		"workspace",
		"same organization",
	} {
		if !strings.Contains(orgDesc, phrase) {
			t.Errorf("MesheryPattern.organizationId description = %q, want it to mention %q", orgDesc, phrase)
		}
	}
	if got := mustValue(mustLookup(t, prop, "x-oapi-codegen-extra-tags"), "db"); got != "organization_id" {
		t.Errorf("MesheryPattern.organizationId db = %v, want organization_id", got)
	}

	for _, schema := range []string{
		"MesheryPatternPayload",
		"MesheryPatternRequestBody",
		"MesheryPatternImportFilePayload",
		"MesheryPatternImportURLPayload",
		"MesheryPatternDeleteRequestBody",
		"GithubImportPayload",
		"DesignSourceBindingPayload",
	} {
		props := mustLookup(t, doc, "components", "schemas", schema, "properties")
		if _, has := mappingValue(props, "organizationId"); has {
			t.Errorf("%s must not accept organizationId", schema)
		}
	}

	upsert := mustLookup(t, doc, "paths", "/api/content/patterns", "post")
	desc, _ := mustValue(upsert, "description").(string)
	if !strings.Contains(desc, "session") {
		t.Errorf("upsertPattern description = %q, want it to say the server assigns the organization from the session", desc)
	}
	if got := mustLookup(t, upsert, "requestBody", "content", "application/json", "schema", "$ref"); got != "#/components/schemas/MesheryPatternRequestBody" {
		t.Errorf("upsertPattern requestBody = %v, want MesheryPatternRequestBody", got)
	}

	// The design document is not the meshery_patterns row.
	designDoc := loadYAMLMap(t, "schemas/constructs/v1beta3/design/design.yaml")
	if _, has := mappingValue(designDoc["properties"], "organizationId"); has {
		t.Error("PatternFile (design.yaml) must not carry organizationId")
	}
}

// Live responses still embed the superseded v1beta1 shapes. Those schemas
// either forbid extra properties or list their fields, so organizationId has
// to be declared for the server to return it. It stays optional there.
// v1beta2 is deprecated and is not embedded in a live response.
func TestSupersededConnectionAndDesignShapes(t *testing.T) {
	root := repoRootDir(t)

	conn := loadYAMLMap(t, "schemas/constructs/v1beta1/connection/connection.yaml")
	if got := sequenceStrings(conn["required"]); containsString(got, "organizationId") {
		t.Errorf("v1beta1 Connection.required = %v, want organizationId optional on the superseded shape", got)
	}
	connOrg := mustLookup(t, conn, "properties", "organizationId")
	// Same RTK constraint as v1beta3 Connection: this shape is inlined into
	// POST /api/registry/relationships/evaluate, so readOnly is omitted.
	if _, has := mappingValue(connOrg, "readOnly"); has {
		t.Errorf("v1beta1 Connection.organizationId must not set readOnly, got %v", mustValue(connOrg, "readOnly"))
	}
	connDesc, _ := mustValue(connOrg, "description").(string)
	if !strings.Contains(connDesc, "ignored") {
		t.Errorf("v1beta1 Connection.organizationId description = %q, want it to say a client value is ignored", connDesc)
	}
	if got := mustValue(connOrg, "$ref"); got != "../core/api.yml#/components/schemas/uuid" {
		t.Errorf("v1beta1 Connection.organizationId $ref = %v, want the v1beta1 uuid schema", got)
	}

	v1beta1Conn := loadOpenAPIDocument(t, filepath.Join(root, "schemas/constructs/v1beta1/connection/api.yml"))
	payload := mustLookup(t, v1beta1Conn, "components", "schemas", "ConnectionPayload", "properties")
	if _, has := mappingValue(payload, "organizationId"); has {
		t.Error("v1beta1 ConnectionPayload must not accept organizationId")
	}

	v1beta1Design := loadOpenAPIDocument(t, filepath.Join(root, "schemas/constructs/v1beta1/design/api.yml"))
	patternOrg := mustLookup(t, v1beta1Design, "components", "schemas", "MesheryPattern", "properties", "organizationId")
	if got := mustValue(patternOrg, "readOnly"); got != true {
		t.Errorf("v1beta1 MesheryPattern.organizationId readOnly = %v, want true", got)
	}
	patternDesc, _ := mustValue(patternOrg, "description").(string)
	if !strings.Contains(patternDesc, "ignored") {
		t.Errorf("v1beta1 MesheryPattern.organizationId description = %q, want it to say a client value is ignored", patternDesc)
	}

	// v1beta2 connection and design are x-deprecated and no live response
	// embeds them, so they do not gain organizationId in this change.
	for _, spec := range []string{
		"schemas/constructs/v1beta2/connection/api.yml",
		"schemas/constructs/v1beta2/design/api.yml",
	} {
		doc := loadOpenAPIDocument(t, filepath.Join(root, spec))
		info := mustLookup(t, doc, "info")
		if got := mustValue(info, "x-deprecated"); got != true {
			t.Errorf("%s x-deprecated = %v, want true", spec, got)
		}
	}
	v1beta2Conn := loadYAMLMap(t, "schemas/constructs/v1beta2/connection/connection.yaml")
	if _, has := mappingValue(v1beta2Conn["properties"], "organizationId"); has {
		t.Error("v1beta2 Connection must not declare organizationId; that package is deprecated and not embedded in a live response")
	}
	v1beta2Design := loadOpenAPIDocument(t, filepath.Join(root, "schemas/constructs/v1beta2/design/api.yml"))
	props := mustLookup(t, v1beta2Design, "components", "schemas", "MesheryPattern", "properties")
	if _, has := mappingValue(props, "organizationId"); has {
		t.Error("v1beta2 MesheryPattern must not declare organizationId; that package is deprecated and not embedded in a live response")
	}
}

func assertServerOrganizationID(t *testing.T, name string, prop any, readOnly bool) {
	t.Helper()
	assertServerOrganizationIDShape(t, name, prop, readOnly, false)
}

// assertServerOrganizationIDShape pins the server-assigned organization field.
// nullable selects the read shape: a required non-pointer UUID, or (for
// Connection, whose legacy rows have none) nullable, a pointer and omitempty.
func assertServerOrganizationIDShape(t *testing.T, name string, prop any, readOnly, nullable bool) {
	t.Helper()
	if got := mustValue(prop, "$ref"); got != "../../v1beta2/core/api.yml#/components/schemas/Uuid" {
		t.Errorf("%s $ref = %v, want the v1beta2 Uuid schema", name, got)
	}
	if readOnly {
		if got := mustValue(prop, "readOnly"); got != true {
			t.Errorf("%s readOnly = %v, want true", name, got)
		}
	} else if _, has := mappingValue(prop, "readOnly"); has {
		t.Errorf("%s must not set readOnly, got %v", name, mustValue(prop, "readOnly"))
	}
	if got := mustValue(prop, "x-go-name"); got != "OrganizationID" {
		t.Errorf("%s x-go-name = %v, want OrganizationID", name, got)
	}
	tags := mustLookup(t, prop, "x-oapi-codegen-extra-tags")
	if nullable {
		if got := mustValue(prop, "nullable"); got != true {
			t.Errorf("%s nullable = %v, want true", name, got)
		}
		if _, has := mappingValue(prop, "x-go-type-skip-optional-pointer"); has {
			t.Errorf("%s must generate a pointer, so a NULL column scans as nil", name)
		}
		if got := mustValue(tags, "json"); got != "organizationId,omitempty" {
			t.Errorf("%s json = %v, want organizationId,omitempty", name, got)
		}
		return
	}
	if got := mustValue(prop, "x-go-type-skip-optional-pointer"); got != true {
		t.Errorf("%s x-go-type-skip-optional-pointer = %v, want true", name, got)
	}
	if got := mustValue(tags, "json"); got != "organizationId" {
		t.Errorf("%s json = %v, want organizationId", name, got)
	}
}

func headerParam(t *testing.T, op any, name string) any {
	t.Helper()
	params, _ := mustValue(op, "parameters").([]any)
	for _, p := range params {
		m, ok := p.(map[string]any)
		if !ok {
			continue
		}
		if mustValue(m, "name") == name && mustValue(m, "in") == "header" {
			return m
		}
	}
	t.Fatalf("operation has no header parameter %s", name)
	return nil
}
