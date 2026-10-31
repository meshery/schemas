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
	defer f.Close()
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
	walkBundledConstructDocs(root, func(relPath string, doc *openapi3.T) {
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
	walkBundledConstructDocs(root, func(relPath string, doc *openapi3.T) {
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
	desc := fmt.Sprint(mustValue(idem, "description"))
	for _, want := range []string{"24 hours", "same request hash", "422"} {
		if !strings.Contains(desc, want) {
			t.Errorf("Idempotency-Key description must document the replay rule, missing %q", want)
		}
	}

	// Every construct alias of currentOrgId / idempotencyKey is a $ref to the core.
	wantRef := func(name string) string {
		return "/v1beta2/core/api.yml#/components/parameters/" + name
	}
	idempotentOps := map[string]bool{}
	currentOrgOps := map[string]bool{}
	walkBundledConstructDocs(root, func(relPath string, doc *openapi3.T) {
		raw := loadOpenAPIDocument(t, filepath.Join(root, relPath))
		skipAliases := false
		// The core holds the definitions, and provider_capability keeps its own
		// older currentOrgId (membership reporting, not an organization selector).
		if strings.HasSuffix(relPath, "v1beta2/core/api.yml") || strings.Contains(relPath, "/provider_capability/") {
			skipAliases = true
		}
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
// created it. approved is client-settable (the server may override it);
// createdByClient is server-set and so is not in the payload.
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
	if got := mustValue(mustLookup(t, payloadProps, "approved"), "type"); got != "boolean" {
		t.Errorf("payload approved type = %v, want boolean", got)
	}
	if got := mustValue(mustLookup(t, entityProps, "createdByClient"), "type"); got != "string" {
		t.Errorf("entity createdByClient type = %v, want string", got)
	}
	if _, has := mappingValue(payloadProps, "createdByClient"); has {
		t.Error("createdByClient is server-set and must not be in ContentItemPayload")
	}
	// Optional on both sides: an old client that omits approved keeps it.
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
		if _, has := mappingValue(mustLookup(t, op, "responses"), "409"); !has {
			t.Errorf("%s must document 409 for a request that is not pending", id)
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
	if got := anyStrings(mustValue(status, "enum")); !reflect.DeepEqual(got, []string{"pending", "approved", "denied"}) {
		t.Errorf("RequestStatus enum = %v, want [pending approved denied]", got)
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

// No new identifier carries a product name.
func TestHostedMcpIdentifiersAreProductNeutral(t *testing.T) {
	root := repoRootDir(t)
	banned := []string{"blowhorn", "meshery", "layer5", "kanvas"}
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
		encoded, err := json.Marshal(requestAPI[section])
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
	walkBundledConstructDocs(root, func(relPath string, doc *openapi3.T) {
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
