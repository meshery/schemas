package validation

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"reflect"
	"sort"
	"strings"
	"testing"

	"github.com/getkin/kin-openapi/openapi3"
)

// The hosted MCP server generates its tools from x-mcp operations
// (docs/mcp-operation-contract.md). These tests pin which operations carry
// it, that the whole tree passes Rule 48, and the scope map that gives each
// scope exactly one keychain.

// hostedMcpReads is every operation that carries x-mcp, with its scope.
// Adding a tool is one x-mcp annotation plus one line here.
var hostedMcpReads = map[string]string{
	"listContentItems":          "content:read",
	"getContentItem":            "content:read",
	"getConnections":            "connections:read",
	"getEvents":                 "events:read",
	"getUser":                   "account:read",
	"getFeaturesByOrganization": "account:read",
}

type permissionRow struct {
	name      string // generated constant name (the Moniker column)
	function  string
	keychain  string
	rolesCols []int // 1-based role columns marked
	id        string
}

// readPermissionsCSV returns the key rows by constant name and the keychain
// definitions by name (name -> id).
func readPermissionsCSV(t *testing.T, root string) (map[string]permissionRow, map[string]string) {
	t.Helper()
	f, err := os.Open(filepath.Join(root, "build/permissions.csv"))
	if err != nil {
		t.Fatalf("open permissions.csv: %v", err)
	}
	defer func() { _ = f.Close() }()
	r := csv.NewReader(f)
	r.FieldsPerRecord = -1
	rows, err := r.ReadAll()
	if err != nil {
		t.Fatalf("read permissions.csv: %v", err)
	}
	keys := map[string]permissionRow{}
	keychains := map[string]string{}
	for _, row := range rows[2:] {
		if len(row) < 37 {
			continue
		}
		if row[0] == "Security Management" && row[1] == "Keychains" && row[27] != "" {
			keychains[row[2]] = row[27]
			continue
		}
		if row[29] == "" || row[36] == "" {
			continue
		}
		var roles []int
		for col := 17; col <= 23; col++ {
			if strings.TrimSpace(row[col]) != "" {
				roles = append(roles, col)
			}
		}
		keys[row[36]] = permissionRow{name: row[36], function: row[2], keychain: row[27], rolesCols: roles, id: row[29]}
	}
	return keys, keychains
}

type scopeFile struct {
	Scopes map[string]struct {
		Keychain    string   `json:"keychain"`
		Description string   `json:"description"`
		Keys        []string `json:"keys"`
	} `json:"scopes"`
}

func readScopeFile(t *testing.T, root string) scopeFile {
	t.Helper()
	data, err := os.ReadFile(filepath.Join(root, "build/oauth-scopes.json"))
	if err != nil {
		t.Fatalf("read oauth-scopes.json: %v", err)
	}
	var sf scopeFile
	if err := json.Unmarshal(data, &sf); err != nil {
		t.Fatalf("parse oauth-scopes.json: %v", err)
	}
	return sf
}

// Only the six hosted reads carry x-mcp, every one exposed with its scope,
// and the real tree passes Rule 48.
func TestHostedMcpOperationsAreExactlyTheSixReads(t *testing.T) {
	root := repoRootDir(t)
	got := map[string]string{}
	var violations []Violation
	walkBundledConstructDocs(root, func(relPath string, doc *openapi3.T, loadErr error) {
		if loadErr != nil {
			t.Errorf("%s could not be loaded, so its x-mcp operations went unchecked: %v", relPath, loadErr)
			return
		}
		violations = append(violations, checkRule48(relPath, doc, AuditOptions{RootDir: root})...)
		for _, item := range doc.Paths.Map() {
			for _, method := range httpMethods {
				op := getOperation(item, method)
				if op == nil {
					continue
				}
				raw, ok := op.Extensions[mcpExtension]
				if !ok {
					continue
				}
				value, _ := raw.(map[string]any)
				if value["expose"] != true {
					t.Errorf("%s (%s): x-mcp.expose must be true", op.OperationID, relPath)
				}
				if method != "get" {
					t.Errorf("%s (%s): the hosted reads are GET operations, got %s", op.OperationID, relPath, method)
				}
				if _, dup := got[op.OperationID]; dup {
					t.Errorf("operationId %s carries x-mcp in two places", op.OperationID)
				}
				got[op.OperationID], _ = value["scope"].(string)
			}
		}
	})
	if !reflect.DeepEqual(got, hostedMcpReads) {
		t.Errorf("x-mcp operations = %v, want exactly %v", got, hostedMcpReads)
	}
	for _, v := range violations {
		t.Errorf("Rule 48 violation in the tree: %s %s", v.File, v.Message)
	}
}

// approveRequest, denyRequest, the organization pause, the broad organization
// updates and every create stay un-annotated in this release.
func TestNothingElseIsAnnotated(t *testing.T) {
	root := repoRootDir(t)
	forbidden := map[string]bool{
		"approveRequest": true, "denyRequest": true, "listRequests": true, "getRequest": true,
		"updateOrgSchedulePause": true, "patchOrgPreferences": true, "updateOrg": true,
		"insertContentItem": true, "updateContentItem": true, "createSchedule": true,
		"listSchedules": true, "getScheduleById": true, "updateSchedule": true,
	}
	seen := map[string]bool{}
	walkBundledConstructDocs(root, func(relPath string, doc *openapi3.T, loadErr error) {
		if loadErr != nil {
			t.Errorf("%s could not be loaded, so the annotation check on it proved nothing: %v", relPath, loadErr)
			return
		}
		for _, item := range doc.Paths.Map() {
			for _, method := range httpMethods {
				op := getOperation(item, method)
				if op == nil || !forbidden[op.OperationID] {
					continue
				}
				seen[op.OperationID] = true
				if _, annotated := op.Extensions[mcpExtension]; annotated {
					t.Errorf("%s must not carry x-mcp yet (%s)", op.OperationID, relPath)
				}
			}
		}
	})
	for id := range forbidden {
		if !seen[id] {
			t.Errorf("operation %s was not found, so the check on it proved nothing", id)
		}
	}
}

// X-Current-Orgid and Idempotency-Key are defined once, in the core, and every
// use is a $ref to that definition.
func TestSharedHeaderParameters(t *testing.T) {
	root := repoRootDir(t)
	core := loadOpenAPIDocument(t, filepath.Join(root, "schemas/constructs/v1beta2/core/api.yml"))
	org := mustLookup(t, core, "components", "parameters", "currentOrgId")
	if mustValue(org, "name") != "X-Current-Orgid" || mustValue(org, "in") != "header" || mustValue(org, "required") != false {
		t.Errorf("core currentOrgId must be the optional X-Current-Orgid header, got %v", org)
	}
	idem := mustLookup(t, core, "components", "parameters", "idempotencyKey")
	if mustValue(idem, "name") != "Idempotency-Key" || mustValue(idem, "in") != "header" || mustValue(idem, "required") != false {
		t.Errorf("core idempotencyKey must be the optional Idempotency-Key header, got %v", idem)
	}
	// Every construct alias of currentOrgId / idempotencyKey is a $ref to the core.
	wantRef := func(name string) string {
		return "/v1beta2/core/api.yml#/components/parameters/" + name
	}
	idempotentOps := map[string]bool{}
	currentOrgOps := map[string]bool{}
	walkBundledConstructDocs(root, func(relPath string, doc *openapi3.T, loadErr error) {
		if loadErr != nil {
			t.Errorf("%s could not be loaded, so the header check on it proved nothing: %v", relPath, loadErr)
			return
		}
		raw := loadOpenAPIDocument(t, filepath.Join(root, relPath))
		// The core holds the definitions, and provider_capability keeps its own
		// older currentOrgId (membership reporting, not an organization selector).
		skipAliases := strings.HasSuffix(relPath, "v1beta2/core/api.yml") || strings.Contains(relPath, "/provider_capability/")
		for _, name := range []string{"currentOrgId", "idempotencyKey"} {
			if skipAliases {
				break
			}
			params, _ := mappingValue(mustLookup(t, raw, "components"), "parameters")
			alias, ok := mappingValue(params, name)
			if !ok {
				continue
			}
			ref := fmt.Sprint(mustValue(alias, "$ref"))
			if !strings.HasSuffix(ref, wantRef(name)) && !strings.HasSuffix(ref, "core/api.yml#/components/parameters/"+name) {
				t.Errorf("%s: components.parameters.%s must $ref the core definition, got %q", relPath, name, ref)
			}
		}
		for _, item := range doc.Paths.Map() {
			for _, method := range httpMethods {
				op := getOperation(item, method)
				if op == nil {
					continue
				}
				for _, p := range append(append(openapi3.Parameters{}, item.Parameters...), op.Parameters...) {
					if p == nil || p.Value == nil || p.Value.In != "header" {
						continue
					}
					switch strings.ToLower(p.Value.Name) {
					case "idempotency-key":
						idempotentOps[op.OperationID] = true
						if p.Value.Required {
							t.Errorf("%s: Idempotency-Key must be optional", op.OperationID)
						}
					case "x-current-orgid":
						currentOrgOps[op.OperationID] = true
					}
				}
			}
		}
	})
	if want := map[string]bool{"insertContentItem": true, "createSchedule": true}; !reflect.DeepEqual(idempotentOps, want) {
		t.Errorf("Idempotency-Key operations = %v, want exactly %v", sortedBoolKeys(idempotentOps), sortedBoolKeys(want))
	}
	for id := range hostedMcpReads {
		if !currentOrgOps[id] {
			t.Errorf("%s must accept the optional X-Current-Orgid header", id)
		}
	}
}

// A retry that arrives while the first request with its key is still being
// processed answers 409 with the distinct in-flight body, and both operations
// that take Idempotency-Key declare it. createSchedule reaches it through the
// shared IdempotencyKeyInFlight response in v1beta2 core. insertContentItem
// declares its own InsertConflict, which is the shared in-flight body or its
// content-specific permanent conflicts, so a client tells the cases apart by code.
func TestIdempotencyKeyInFlightIsDeclared(t *testing.T) {
	root := repoRootDir(t)
	core := loadOpenAPIDocument(t, filepath.Join(root, "schemas/constructs/v1beta2/core/api.yml"))
	const inFlight = "idempotency_key_in_flight"

	// The core body: its code is the in-flight code only, and it is required.
	body := mustLookup(t, core, "components", "schemas", "IdempotencyKeyInFlightError")
	// models/core is generated from v1alpha1/core, and a v1beta2/core schema that
	// a construct refers to resolves there, so the mirror must be identical.
	v1alpha1 := loadOpenAPIDocument(t, filepath.Join(root, coreV1alpha1Spec))
	if mirror := mustLookup(t, v1alpha1, "components", "schemas", "IdempotencyKeyInFlightError"); !reflect.DeepEqual(body, mirror) {
		t.Error("v1alpha1/core IdempotencyKeyInFlightError differs from v1beta2/core; keep the mirror identical")
	}
	if got := anyStrings(mustLookup(t, body, "properties", "code", "enum")); !reflect.DeepEqual(got, []string{inFlight}) {
		t.Errorf("IdempotencyKeyInFlightError code enum = %v, want [%s]", got, inFlight)
	}
	if got := anyStrings(mustLookup(t, body, "required")); !reflect.DeepEqual(got, []string{"code", "message"}) {
		t.Errorf("IdempotencyKeyInFlightError required = %v, want [code message]", got)
	}
	if got := mustValue(mustLookup(t, core, "components", "responses", "IdempotencyKeyInFlight", "content", "application/json", "schema"), "$ref"); got != "../../v1beta2/core/api.yml#/components/schemas/IdempotencyKeyInFlightError" {
		t.Errorf("core IdempotencyKeyInFlight must carry the in-flight body, got %v", got)
	}

	// insertContentItem: its 409 body is one of two schemas. The permanent codes are
	// the content-specific schema's; the in-flight body is the core schema, referenced
	// rather than copied, so the two cannot drift apart.
	content := loadOpenAPIDocument(t, filepath.Join(root, "schemas/constructs/v1beta3/content_item/api.yml"))
	if got := mustValue(mustLookup(t, content, "paths", "/api/content-items", "post", "responses", "409"), "$ref"); got != "#/components/responses/InsertConflict" {
		t.Errorf("insertContentItem 409 $ref = %v, want InsertConflict", got)
	}
	branches, _ := mustLookup(t, content, "components", "responses", "InsertConflict", "content", "application/json", "schema", "oneOf").([]any)
	var refs []string
	for _, branch := range branches {
		refs = append(refs, fmt.Sprint(mustValue(branch, "$ref")))
	}
	wantRefs := []string{"#/components/schemas/ContentItemInsertConflict", "../../v1beta2/core/api.yml#/components/schemas/IdempotencyKeyInFlightError"}
	if !reflect.DeepEqual(refs, wantRefs) {
		t.Errorf("InsertConflict oneOf refs = %v, want %v", refs, wantRefs)
	}
	codes := anyStrings(mustLookup(t, content, "components", "schemas", "ContentItemInsertConflict", "properties", "code", "enum"))
	want := []string{"row_number_taken", "thread_index_taken"}
	if !reflect.DeepEqual(codes, want) {
		t.Errorf("ContentItemInsertConflict codes = %v, want %v (the in-flight code lives in IdempotencyKeyInFlightError)", codes, want)
	}

	schedule := loadOpenAPIDocument(t, filepath.Join(root, "schemas/constructs/v1beta3/schedule/api.yml"))
	if got := mustValue(mustLookup(t, schedule, "paths", "/api/schedules", "post", "responses", "409"), "$ref"); got != "#/components/responses/IdempotencyKeyInFlight" {
		t.Errorf("createSchedule 409 $ref = %v, want IdempotencyKeyInFlight", got)
	}
	if got := mustValue(mustLookup(t, schedule, "components", "responses", "IdempotencyKeyInFlight"), "$ref"); got != "../../v1beta2/core/api.yml#/components/responses/IdempotencyKeyInFlight" {
		t.Errorf("schedule IdempotencyKeyInFlight must reuse the core response, got %v", got)
	}
}

func sortedBoolKeys(m map[string]bool) []string {
	keys := make([]string, 0, len(m))
	for k := range m {
		keys = append(keys, k)
	}
	sort.Strings(keys)
	return keys
}

// The scope strings are defined once, in the extension schema; the scope map
// gives each of them exactly one keychain and existing keys.
func TestScopeKeychainKeyMap(t *testing.T) {
	root := repoRootDir(t)
	defined, err := loadMcpScopes(root)
	if err != nil {
		t.Fatalf("load scopes: %v", err)
	}
	sf := readScopeFile(t, root)
	mapped := map[string]bool{}
	for scope := range sf.Scopes {
		mapped[scope] = true
	}
	if !reflect.DeepEqual(defined, mapped) {
		t.Errorf("scopes in %s = %v, in build/oauth-scopes.json = %v: they must be the same set", mcpExtensionSchema, sortedScopeNames(defined), sortedScopeNames(mapped))
	}

	keys, keychains := readPermissionsCSV(t, root)
	seenKeychain := map[string]string{}
	allScopeKeys := map[string]bool{}
	for scope, entry := range sf.Scopes {
		if _, ok := keychains[entry.Keychain]; !ok {
			t.Errorf("scope %s names keychain %q, which build/permissions.csv does not define", scope, entry.Keychain)
		}
		if other, dup := seenKeychain[entry.Keychain]; dup {
			t.Errorf("scopes %s and %s share keychain %q: a scope is exactly one keychain", other, scope, entry.Keychain)
		}
		seenKeychain[entry.Keychain] = scope
		if existing := keychainUsedElsewhere(entry.Keychain); existing {
			t.Errorf("scope %s must name a new keychain, %q already existed", scope, entry.Keychain)
		}
		for _, k := range entry.Keys {
			if _, ok := keys[k]; !ok {
				t.Errorf("scope %s lists key %s, which build/permissions.csv does not define", scope, k)
			}
			allScopeKeys[k] = true
		}
	}

	// Seeds: the keys each scope's tools need.
	want := map[string][]string{
		"content:read":     {"CatalogManagementViewContentItems"},
		"content:write":    {"CatalogManagementCreateContentItem", "CatalogManagementEditContentItem"},
		"schedule:read":    {"WorkflowManagementViewSchedules"},
		"schedule:write":   {"WorkflowManagementCreateSchedule", "WorkflowManagementEditSchedule", "WorkflowManagementPauseSchedules"},
		"connections:read": {"WorkspaceManagementViewConnections"},
		"events:read":      {"EventsManagementViewEvents"},
		"account:read":     {"AccountManagementViewProfile"},
	}
	for scope, wantKeys := range want {
		if got := sf.Scopes[scope].Keys; !reflect.DeepEqual(got, wantKeys) {
			t.Errorf("scope %s keys = %v, want %v", scope, got, wantKeys)
		}
	}

	// No scope keychain carries a key that decides a request, deletes, or
	// widens access: an AI app can never approve its own request.
	for _, k := range []string{"CatalogManagementDecideContentItemApprovals", "CatalogManagementDeleteContentItem", "WorkflowManagementDeleteSchedule"} {
		if allScopeKeys[k] {
			t.Errorf("no scope may carry %s", k)
		}
	}
}

// keychainUsedElsewhere reports whether a keychain name is one of the
// keychains that existed before the OAuth scopes.
func keychainUsedElsewhere(name string) bool {
	switch name {
	case "User View", "User Management", "Team View", "Team Management", "Organization Management",
		"Event Management", "Security Management", "Catalog Management", "Account Management", "Blowhorn Diagnostics":
		return true
	}
	return false
}

// The pause key sits in the schedule:write keychain and is seeded to the
// organization admin role only; the request keys are seeded as documented.
func TestNewPermissionKeys(t *testing.T) {
	root := repoRootDir(t)
	keys, _ := readPermissionsCSV(t, root)
	const (
		colUser, colTeamAdmin, colWorkspaceAdmin, colOrgBilling, colOrgAdmin, colProviderAdmin = 18, 19, 20, 21, 22, 23
	)
	check := func(name, keychain string, roles ...int) {
		t.Helper()
		k, ok := keys[name]
		if !ok {
			t.Fatalf("permission key %s is missing from build/permissions.csv", name)
		}
		if k.keychain != keychain {
			t.Errorf("%s keychain = %q, want %q", name, k.keychain, keychain)
		}
		if !reflect.DeepEqual(k.rolesCols, roles) {
			t.Errorf("%s role columns = %v, want %v", name, k.rolesCols, roles)
		}
	}
	check("WorkflowManagementPauseSchedules", "Schedule Edit", colOrgAdmin)
	check("WorkflowManagementViewRequests", "Organization Management", colUser, colTeamAdmin, colWorkspaceAdmin, colOrgAdmin, colProviderAdmin)
	check("CatalogManagementDecideContentItemApprovals", "Catalog Management", colOrgAdmin, colProviderAdmin)
}

// The narrow pause operation sets and clears schedulePause and nothing else.
func TestOrgSchedulePauseOperation(t *testing.T) {
	root := repoRootDir(t)
	doc := loadOpenAPIDocument(t, filepath.Join(root, "schemas/constructs/v1beta2/organization/api.yml"))
	op := mustLookup(t, doc, "paths", "/api/identity/orgs/{orgId}/schedule-pause", "put")
	if got := mustValue(op, "operationId"); got != "updateOrgSchedulePause" {
		t.Errorf("operationId = %v, want updateOrgSchedulePause", got)
	}
	if got := sequenceStrings(mustValue(op, "x-internal")); !reflect.DeepEqual(got, []string{"cloud"}) {
		t.Errorf("x-internal = %v, want [cloud]", got)
	}
	if _, annotated := mappingValue(op, mcpExtension); annotated {
		t.Error("updateOrgSchedulePause must not carry x-mcp yet")
	}
	body := mustLookup(t, op, "requestBody", "content", "application/json", "schema")
	if got := mustValue(body, "$ref"); got != "#/components/schemas/SchedulePausePayload" {
		t.Errorf("request body $ref = %v, want the existing SchedulePausePayload", got)
	}
	ok := mustLookup(t, op, "responses", "200", "content", "application/json", "schema")
	if got := mustValue(ok, "$ref"); got != "#/components/schemas/SchedulePause" {
		t.Errorf("200 body $ref = %v, want the existing SchedulePause", got)
	}
	for _, code := range []string{"400", "401", "403", "404", "500"} {
		if _, has := mappingValue(mustLookup(t, op, "responses"), code); !has {
			t.Errorf("updateOrgSchedulePause must document %s", code)
		}
	}
	// The payload is the closed pause and nothing else.
	payload := mustLookup(t, doc, "components", "schemas", "SchedulePausePayload")
	if mustValue(payload, "additionalProperties") != false {
		t.Error("SchedulePausePayload must stay closed")
	}
	props := mustLookup(t, payload, "properties").(map[string]any)
	if got := sortedAnyKeys(props); !reflect.DeepEqual(got, []string{"paused", "reason"}) {
		t.Errorf("SchedulePausePayload properties = %v, want [paused reason]", got)
	}
	// Defined once: no second schedulePause schema was added.
	for name := range mustLookup(t, doc, "components", "schemas").(map[string]any) {
		if strings.Contains(strings.ToLower(name), "pause") && name != "SchedulePause" && name != "SchedulePausePayload" {
			t.Errorf("schema %s duplicates the schedulePause definition", name)
		}
	}
}

func sortedAnyKeys(m map[string]any) []string {
	keys := make([]string, 0, len(m))
	for k := range m {
		keys = append(keys, k)
	}
	sort.Strings(keys)
	return keys
}

// A content item carries a typed approved flag and the OAuth client that
// created it. Both are server-set and so are not in the payload: approved
// becomes true only through approveRequest.
func TestContentItemApprovalFields(t *testing.T) {
	root := repoRootDir(t)
	dir := filepath.Join(root, "schemas/constructs/v1beta3/content_item")
	entity := loadOpenAPIDocument(t, filepath.Join(dir, "content_item.yaml"))
	api := loadOpenAPIDocument(t, filepath.Join(dir, "api.yml"))
	entityProps := mustLookup(t, entity, "properties")
	payloadProps := mustLookup(t, api, "components", "schemas", "ContentItemPayload", "properties")

	if got := mustValue(mustLookup(t, entityProps, "approved"), "type"); got != "boolean" {
		t.Errorf("entity approved type = %v, want boolean", got)
	}
	if got := mustValue(mustLookup(t, entityProps, "createdByClient"), "type"); got != "string" {
		t.Errorf("entity createdByClient type = %v, want string", got)
	}
	if _, has := mappingValue(payloadProps, "createdByClient"); has {
		t.Error("createdByClient is server-set and must not be in ContentItemPayload")
	}
	// Optional on the entity: rows written before the column have none.
	required, _ := mustLookup(t, entity, "required").([]any)
	for _, r := range required {
		if r == "approved" || r == "createdByClient" {
			t.Errorf("%v must stay optional on the entity", r)
		}
	}
	if required, _ := mustLookup(t, api, "components", "schemas", "ContentItemPayload", "required").([]any); len(required) != 1 || required[0] != "profile" {
		t.Errorf("ContentItemPayload required = %v, want [profile] only", required)
	}
}

// No content item write can approve: the request body of insertContentItem
// and updateContentItem has no approved property, so approveRequest is the
// only way an item's approved becomes true. See docs/content-item-contract.md.
func TestContentItemWritePayloadsHaveNoApproved(t *testing.T) {
	root := repoRootDir(t)
	api := loadOpenAPIDocument(t, filepath.Join(root, "schemas/constructs/v1beta3/content_item/api.yml"))

	writes := map[string]string{"/api/content-items": "post", "/api/content-items/{contentItemId}": "put"}
	for path, method := range writes {
		ref := mustValue(mustLookup(t, api, "paths", path, method, "requestBody", "content", "application/json", "schema"), "$ref")
		if ref != "#/components/schemas/ContentItemPayload" {
			t.Errorf("%s %s requestBody = %v, want ContentItemPayload", method, path, ref)
		}
	}

	// Every payload the construct defines, so a new write body is covered too.
	schemas := mustLookup(t, api, "components", "schemas").(map[string]any)
	if _, ok := mappingValue(schemas, "ContentItemPayload"); !ok {
		t.Fatal("ContentItemPayload is missing")
	}
	for _, name := range sortedAnyKeys(schemas) {
		if !strings.HasSuffix(name, "Payload") {
			continue
		}
		props, _ := mappingValue(schemas[name], "properties")
		if _, has := mappingValue(props, "approved"); has {
			t.Errorf("%s must not have approved: only approveRequest approves a content item", name)
		}
	}
}

// The request construct is generic: one kind for now, the deciding key named
// per kind, approve and deny never tools.
func TestRequestConstruct(t *testing.T) {
	root := repoRootDir(t)
	dir := filepath.Join(root, "schemas/constructs/v1beta3/request")
	doc := loadOpenAPIDocument(t, filepath.Join(dir, "api.yml"))
	entity := loadOpenAPIDocument(t, filepath.Join(dir, "request.yaml"))

	wantOps := map[string]map[string]string{
		"/api/requests":                     {"get": "listRequests"},
		"/api/requests/{requestId}":         {"get": "getRequest"},
		"/api/requests/{requestId}/approve": {"post": "approveRequest"},
		"/api/requests/{requestId}/deny":    {"post": "denyRequest"},
	}
	for path, ops := range wantOps {
		for method, id := range ops {
			op := mustLookup(t, doc, "paths", path, method)
			if got := mustValue(op, "operationId"); got != id {
				t.Errorf("%s %s operationId = %v, want %s", method, path, got, id)
			}
			if got := sequenceStrings(mustValue(op, "x-internal")); !reflect.DeepEqual(got, []string{"cloud"}) {
				t.Errorf("%s x-internal = %v, want [cloud]", id, got)
			}
			if _, annotated := mappingValue(op, mcpExtension); annotated {
				t.Errorf("%s must not carry x-mcp", id)
			}
		}
	}
	for _, id := range []string{"approve", "deny"} {
		op := mustLookup(t, doc, "paths", "/api/requests/{requestId}/"+id, "post")
		body := mustLookup(t, op, "requestBody")
		if required, _ := mappingValue(body, "required"); required == true {
			t.Errorf("%s body must be optional", id)
		}
		if got := mustValue(mustLookup(t, body, "content", "application/json", "schema"), "$ref"); got != "#/components/schemas/RequestDecisionPayload" {
			t.Errorf("%s body $ref = %v, want RequestDecisionPayload", id, got)
		}
		responses := mustLookup(t, op, "responses")
		if got := mustValue(mustLookup(t, responses, "409"), "$ref"); got != "#/components/responses/409" {
			t.Errorf("%s 409 $ref = %v, want the shared 409 for a request that is not pending or whose subject is soft-deleted", id, got)
		}
		if got := mustValue(mustLookup(t, responses, "404"), "$ref"); got != "#/components/responses/DecisionNotFound" {
			t.Errorf("%s 404 $ref = %v, want DecisionNotFound for a subject that is gone", id, got)
		}
	}
	list := mustLookup(t, doc, "paths", "/api/requests", "get", "parameters").([]any)
	var refs []string
	for _, p := range list {
		refs = append(refs, fmt.Sprint(mustValue(p, "$ref")))
	}
	for _, want := range []string{"#/components/parameters/page", "#/components/parameters/pageSize", "#/components/parameters/kind", "#/components/parameters/status"} {
		if !containsString(refs, want) {
			t.Errorf("listRequests must take %s", want)
		}
	}

	// Kinds and statuses.
	kind := mustLookup(t, doc, "components", "schemas", "RequestKind")
	if got := anyStrings(mustValue(kind, "enum")); !reflect.DeepEqual(got, []string{"content_item_approval"}) {
		t.Errorf("RequestKind enum = %v, want [content_item_approval]", got)
	}
	status := mustLookup(t, doc, "components", "schemas", "RequestStatus")
	if got := anyStrings(mustValue(status, "enum")); !reflect.DeepEqual(got, []string{"pending", "approved", "denied", "superseded"}) {
		t.Errorf("RequestStatus enum = %v, want [pending approved denied superseded]", got)
	}

	// Each kind names the key that may decide it, and the key exists and is
	// in no OAuth scope keychain.
	keys, _ := readPermissionsCSV(t, root)
	decision := mustLookup(t, kind, "x-decision-key").(map[string]any)
	subject := mustLookup(t, kind, "x-subject-type").(map[string]any)
	sf := readScopeFile(t, root)
	for _, k := range anyStrings(mustValue(kind, "enum")) {
		keyName, ok := decision[k].(string)
		if !ok {
			t.Errorf("kind %s names no deciding key in x-decision-key", k)
			continue
		}
		if _, exists := keys[keyName]; !exists {
			t.Errorf("kind %s names deciding key %s, which build/permissions.csv does not define", k, keyName)
		}
		for scope, entry := range sf.Scopes {
			if containsString(entry.Keys, keyName) {
				t.Errorf("deciding key %s of kind %s is in scope %s", keyName, k, scope)
			}
		}
		if _, ok := subject[k].(string); !ok {
			t.Errorf("kind %s names no subject type in x-subject-type", k)
		}
	}
	if len(decision) != len(anyStrings(mustValue(kind, "enum"))) {
		t.Errorf("x-decision-key = %v: it must name exactly the kinds of the enum", sortedAnyKeys(decision))
	}

	// Entity: the fields the contract lists.
	props := mustLookup(t, entity, "properties").(map[string]any)
	for _, field := range []string{"id", "kind", "subjectType", "subjectId", "requesterId", "createdByClient", "status", "decidedBy", "decidedAt", "note", "organizationId", "createdAt", "updatedAt"} {
		if _, has := props[field]; !has {
			t.Errorf("request entity is missing %s", field)
		}
	}
	if mustValue(entity, "additionalProperties") != false {
		t.Error("the request entity must be closed")
	}
	payload := mustLookup(t, doc, "components", "schemas", "RequestDecisionPayload", "properties").(map[string]any)
	if got := sortedAnyKeys(payload); !reflect.DeepEqual(got, []string{"note"}) {
		t.Errorf("RequestDecisionPayload properties = %v, want [note] only", got)
	}
}

func anyStrings(v any) []string {
	items, _ := v.([]any)
	out := make([]string, 0, len(items))
	for _, item := range items {
		out = append(out, fmt.Sprint(item))
	}
	return out
}

// Every operation that takes a UUID-constrained parameter declares the 400
// that a malformed UUID answers (core responses/400: "Invalid request body
// or request param"). The six hosted reads take X-Current-Orgid
// (listContentItems also takes threadId), and getRequest also takes
// requestId; listRequests, approveRequest and denyRequest already declared
// it. A missing 400 leaves clients without a documented answer for invalid
// input.
func TestOperationsWithUuidParametersDeclare400(t *testing.T) {
	root := repoRootDir(t)
	want := map[string]bool{
		"listContentItems": true, "getContentItem": true, "getConnections": true,
		"getEvents": true, "getUser": true, "getFeaturesByOrganization": true,
		"getRequest": true,
	}
	seen := map[string]bool{}
	walkBundledConstructDocs(root, func(relPath string, doc *openapi3.T, loadErr error) {
		if loadErr != nil {
			t.Errorf("%s could not be loaded, so the 400 check on it proved nothing: %v", relPath, loadErr)
			return
		}
		for _, item := range doc.Paths.Map() {
			for _, method := range httpMethods {
				op := getOperation(item, method)
				if op == nil || !want[op.OperationID] {
					continue
				}
				seen[op.OperationID] = true
				if op.Responses == nil {
					t.Errorf("%s (%s) declares no responses, so no 400 for a malformed UUID parameter", op.OperationID, relPath)
					continue
				}
				ref, ok := op.Responses.Map()["400"]
				if !ok || ref == nil || ref.Value == nil {
					t.Errorf("%s (%s) must declare a 400 response for a malformed UUID parameter", op.OperationID, relPath)
				}
			}
		}
	})
	for id := range want {
		if !seen[id] {
			t.Errorf("operation %s was not found, so the 400 check on it proved nothing", id)
		}
	}
}

// The organization selector (docs/mcp-operation-contract.md, "The organization
// selector"): an operation that takes an organization in its path or query also
// takes X-Current-Orgid, its description points at the rule, and it declares the
// 400 that a header-and-path mismatch answers and the 403 that a mismatch with
// the session organization answers. The rule itself is stated once, in the doc.
func TestOrganizationSelectorIsDeclared(t *testing.T) {
	root := repoRootDir(t)
	features := loadOpenAPIDocument(t, filepath.Join(root, "schemas/constructs/v1beta1/feature/feature_operations.yml"))
	connections := loadOpenAPIDocument(t, filepath.Join(root, "schemas/constructs/v1beta3/connection/api.yml"))

	cases := []struct {
		operationID, orgRef, currentOrgRef string
		op                                 any
	}{
		{"getFeaturesByOrganization", "./api.yml#/components/parameters/orgId", "./api.yml#/components/parameters/currentOrgId", mustLookup(t, features, "organizationCollection", "get")},
		{"getConnections", "#/components/parameters/orgIdQuery", "#/components/parameters/currentOrgId", mustLookup(t, connections, "paths", "/api/integrations/connections", "get")},
	}
	for _, tc := range cases {
		if got := mustValue(tc.op, "operationId"); got != tc.operationID {
			t.Fatalf("operation %v has operationId %v, want %s", tc.op, got, tc.operationID)
		}
		refs := map[string]bool{}
		for _, p := range mustValue(tc.op, "parameters").([]any) {
			if ref, ok := mustValue(p, "$ref").(string); ok {
				refs[ref] = true
			}
		}
		for _, ref := range []string{tc.orgRef, tc.currentOrgRef} {
			if !refs[ref] {
				t.Errorf("%s must take %s", tc.operationID, ref)
			}
		}
		if ref := mustLookup(t, tc.op, "responses", "403", "$ref"); ref != "../../v1beta2/core/api.yml#/components/responses/403" {
			t.Errorf("%s must declare the 403 response, got %v", tc.operationID, ref)
		}
		if ref, _ := mustLookup(t, tc.op, "responses", "400", "$ref").(string); !strings.HasSuffix(ref, "components/responses/400") {
			t.Errorf("%s must declare the 400 response for a header and path mismatch, got %q", tc.operationID, ref)
		}
	}

	// An operation that takes its organization in the path and declares no
	// X-Current-Orgid checks membership in that organization, and says so. The
	// rule in the doc above covers only the operations that declare the header.
	orgDoc := loadOpenAPIDocument(t, filepath.Join(root, "schemas/constructs/v1beta2/organization/api.yml"))
	pause := mustLookup(t, orgDoc, "paths", "/api/identity/orgs/{orgId}/schedule-pause", "put")
	for _, p := range mustValue(pause, "parameters").([]any) {
		if ref := fmt.Sprint(mustValue(p, "$ref")); strings.HasSuffix(ref, "currentOrgId") {
			t.Errorf("updateOrgSchedulePause must not declare X-Current-Orgid, got %s", ref)
		}
	}
}

// No new identifier carries a product name.
func TestHostedMcpIdentifiersAreProductNeutral(t *testing.T) {
	root := repoRootDir(t)
	banned := []string{"meshery", "layer5", "kanvas"}
	check := func(what, value string) {
		// The Go import path of the shared models names the repository, not a
		// new identifier.
		lower := strings.ToLower(strings.ReplaceAll(value, "github.com/meshery/schemas", ""))
		for _, word := range banned {
			if strings.Contains(lower, word) {
				t.Errorf("%s %q contains the product name %q", what, value, word)
			}
		}
	}
	sf := readScopeFile(t, root)
	for scope, entry := range sf.Scopes {
		check("scope", scope)
		check("keychain", entry.Keychain)
		check("scope description", entry.Description)
		for _, k := range entry.Keys {
			check("permission key", k)
		}
	}
	for _, name := range []string{"WorkflowManagementPauseSchedules", "WorkflowManagementViewRequests", "CatalogManagementDecideContentItemApprovals"} {
		check("permission key", name)
	}
	for _, rel := range []string{
		"schemas/extensions/mcp-operation.yaml",
		"schemas/constructs/v1beta3/request/request.yaml",
		"schemas/constructs/v1beta3/request/templates/request_template.json",
		"schemas/constructs/v1beta3/request/templates/request_template.yaml",
	} {
		data, err := os.ReadFile(filepath.Join(root, rel))
		if err != nil {
			t.Errorf("read %s: %v", rel, err)
			continue
		}
		check(rel, string(data))
	}
	// The request api.yml names the project in its contact block, as every
	// api.yml does; its paths and components carry the new identifiers.
	requestAPI := loadOpenAPIDocument(t, filepath.Join(root, "schemas/constructs/v1beta3/request/api.yml"))
	for _, section := range []string{"paths", "components"} {
		encoded, err := json.Marshal(stringKeyed(requestAPI[section]))
		if err != nil {
			t.Fatal(err)
		}
		check("request api.yml "+section, string(encoded))
	}
	// Doc headings are identifiers too.
	for _, rel := range []string{"docs/mcp-operation-contract.md", "docs/request-contract.md", "docs/schedule-pause-contract.md"} {
		data, err := os.ReadFile(filepath.Join(root, rel))
		if err != nil {
			t.Errorf("read %s: %v", rel, err)
			continue
		}
		for _, line := range strings.Split(string(data), "\n") {
			if strings.HasPrefix(line, "#") {
				check(rel+" heading", line)
			}
		}
	}
	walkBundledConstructDocs(root, func(relPath string, doc *openapi3.T, loadErr error) {
		if loadErr != nil {
			t.Errorf("%s could not be loaded, so the title check on it proved nothing: %v", relPath, loadErr)
			return
		}
		for _, item := range doc.Paths.Map() {
			for _, method := range httpMethods {
				if op := getOperation(item, method); op != nil {
					if value, ok := op.Extensions[mcpExtension].(map[string]any); ok {
						check("x-mcp title of "+op.OperationID, fmt.Sprint(value["title"]))
					}
				}
			}
		}
	})
}

// stringKeyed returns a copy of a decoded YAML tree with every mapping keyed
// by string. yaml.v3 decodes a mapping with an unquoted numeric key (`400:`)
// as map[any]any, which encoding/json rejects on the Go releases CI builds
// with, so the test renders keys by their string form before marshalling.
func stringKeyed(node any) any {
	switch typed := node.(type) {
	case map[string]any:
		out := make(map[string]any, len(typed))
		for key, value := range typed {
			out[key] = stringKeyed(value)
		}
		return out
	case map[any]any:
		out := make(map[string]any, len(typed))
		for key, value := range typed {
			out[fmt.Sprint(key)] = stringKeyed(value)
		}
		return out
	case []any:
		out := make([]any, len(typed))
		for i, value := range typed {
			out[i] = stringKeyed(value)
		}
		return out
	}

	return node
}
