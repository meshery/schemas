package validation

import (
	"os"
	"path/filepath"
	"testing"
)

// Ledgers are one generic, organization-scoped keyed set with idempotent
// record and atomic claim-if-absent; the project-named constructs are gone.
func TestLedgerContract(t *testing.T) {
	root := repoRootDir(t)
	doc := loadOpenAPIDocument(t, filepath.Join(root, "schemas/constructs/v1beta3/ledger/api.yml"))

	record := mustLookup(t, doc, "paths", "/api/ledgers/{ledger}/entries", "post")
	responses := mustLookup(t, record, "responses")
	for _, code := range []string{"200", "201"} {
		if _, ok := mappingValue(responses, code); !ok {
			t.Errorf("recordLedgerEntry must document %s", code)
		}
	}
	claim := mustLookup(t, doc, "paths", "/api/ledgers/{ledger}/claims", "post")
	claimResponses := mustLookup(t, claim, "responses")
	for _, code := range []string{"200", "201", "409"} {
		if _, ok := mappingValue(claimResponses, code); !ok {
			t.Errorf("claimLedgerEntry must document %s", code)
		}
	}

	paths := mustLookup(t, doc, "paths")
	for _, method := range []string{"get", "put", "delete"} {
		op := mustLookup(t, paths, "/api/ledgers/{ledger}/entries/{entryKey}", method)
		if _, ok := mappingValue(op, "operationId"); !ok {
			t.Errorf("%s on /entries/{entryKey} must declare an operationId", method)
		}
	}
	update := mustLookup(t, paths, "/api/ledgers/{ledger}/entries/{entryKey}", "put")
	if id, _ := mappingValue(update, "operationId"); id != "updateLedgerEntry" {
		t.Errorf("PUT /entries/{entryKey} must be updateLedgerEntry, got %v", id)
	}
	if got := sequenceStrings(mustLookup(t, update, "x-internal")); len(got) != 1 || got[0] != "cloud" {
		t.Errorf("updateLedgerEntry x-internal = %v, want [cloud]", got)
	}
	if summary, _ := mappingValue(update, "summary"); summary != "Update a ledger entry" {
		t.Errorf("updateLedgerEntry summary = %v", summary)
	}
	tags, _ := mustLookup(t, update, "tags").([]any)
	if len(tags) != 1 || tags[0] != "ledgers" {
		t.Errorf("updateLedgerEntry tags = %v, want [ledgers]", tags)
	}
	bodyRef, _ := mustLookup(t, update, "requestBody", "content", "application/json", "schema", "$ref").(string)
	if bodyRef != "#/components/schemas/LedgerEntryUpdatePayload" {
		t.Errorf("updateLedgerEntry body = %q", bodyRef)
	}
	if requiredBody, _ := mappingValue(mustLookup(t, update, "requestBody"), "required"); requiredBody != true {
		t.Error("updateLedgerEntry request body must be required")
	}
	updateResponses := mustLookup(t, update, "responses")
	for _, code := range []string{"200", "400", "401", "404", "412", "500"} {
		if _, ok := mappingValue(updateResponses, code); !ok {
			t.Errorf("updateLedgerEntry must document %s", code)
		}
	}
	if ref, _ := mustLookup(t, updateResponses, "412", "$ref").(string); ref != "#/components/responses/412" {
		t.Errorf("updateLedgerEntry 412 must use the local response component, got %q", ref)
	}
	if _, ok := mappingValue(mustLookup(t, doc, "components", "responses", "412"), "description"); !ok {
		t.Error("local 412 response must describe the precondition failure")
	}
	payload := mustLookup(t, doc, "components", "schemas", "LedgerEntryUpdatePayload")
	requiredFields, _ := mustLookup(t, payload, "required").([]any)
	if len(requiredFields) != 1 || requiredFields[0] != "value" {
		t.Errorf("LedgerEntryUpdatePayload required = %v, want [value]", requiredFields)
	}
	props := mustLookup(t, payload, "properties")
	for _, name := range []string{"value", "expectedValue", "expectedUpdatedAt"} {
		if _, ok := mappingValue(props, name); !ok {
			t.Errorf("LedgerEntryUpdatePayload must define %s", name)
		}
	}
	for _, name := range []string{"value", "expectedValue"} {
		prop := mustLookup(t, props, name)
		if goType, _ := mappingValue(prop, "x-go-type"); goType != "core.Map" {
			t.Errorf("%s x-go-type = %v, want core.Map", name, goType)
		}
		if skip, _ := mappingValue(prop, "x-go-type-skip-optional-pointer"); skip != true {
			t.Errorf("%s must skip the optional pointer so the nil map is the absence signal, got %v", name, skip)
		}
	}
	updatedAtPrecondition := mustLookup(t, props, "expectedUpdatedAt")
	if format, _ := mappingValue(updatedAtPrecondition, "format"); format != "date-time" {
		t.Errorf("expectedUpdatedAt format = %v", format)
	}
	if goType, _ := mappingValue(updatedAtPrecondition, "x-go-type"); goType != "core.NullTime" {
		t.Errorf("expectedUpdatedAt x-go-type = %v, want core.NullTime", goType)
	}
	if _, present := mappingValue(updatedAtPrecondition, "x-go-type-skip-optional-pointer"); present {
		t.Error("expectedUpdatedAt must stay a pointer NullTime so an omitted instant is nil")
	}
	if _, ok := mappingValue(paths, "/api/ledgers/{ledger}/entries/claim"); ok {
		t.Error("claim must live on /claims so a key named claim cannot collide with /entries/{entryKey}")
	}
	if _, ok := mappingValue(paths, "/api/ledgers/{ledger}/entries/{ledgerEntryId}"); ok {
		t.Error("ledger entries must be addressed by entryKey, not ledgerEntryId")
	}
	list := mustLookup(t, paths, "/api/ledgers/{ledger}/entries", "get")
	if id, _ := mappingValue(list, "operationId"); id != "listLedgerEntries" {
		t.Errorf("GET /entries must be listLedgerEntries, got %v", id)
	}
	// The list reuses the shared pagination parameters and page envelope.
	params, _ := mustLookup(t, list, "parameters").([]any)
	refs := map[string]bool{}
	for _, p := range params {
		if ref, ok := mappingValue(p, "$ref"); ok {
			refs[ref.(string)] = true
		}
	}
	for _, name := range []string{"ledger", "page", "pageSize", "search", "order"} {
		if !refs["#/components/parameters/"+name] {
			t.Errorf("listLedgerEntries must take the %s parameter", name)
		}
	}
	for _, name := range []string{"page", "pageSize", "search", "order"} {
		ref, _ := mustLookup(t, doc, "components", "parameters", name, "$ref").(string)
		if ref != "../../v1beta2/core/api.yml#/components/parameters/"+name {
			t.Errorf("parameter %s must reference the shared core parameter, got %q", name, ref)
		}
	}
	listResponses := mustLookup(t, list, "responses")
	for _, code := range []string{"200", "404"} {
		if _, ok := mappingValue(listResponses, code); !ok {
			t.Errorf("listLedgerEntries must document %s", code)
		}
	}
	required, _ := mustLookup(t, doc, "components", "schemas", "LedgerEntryPage", "required").([]any)
	want := map[string]bool{"page": false, "pageSize": false, "totalCount": false, "ledgerEntries": false}
	for _, r := range required {
		if _, ok := want[r.(string)]; ok {
			want[r.(string)] = true
		}
	}
	for field, ok := range want {
		if !ok {
			t.Errorf("LedgerEntryPage must require %s", field)
		}
	}

	excluded, _ := mustLookup(t, doc, "components", "parameters", "entryKey", "schema", "not", "enum").([]any)
	for _, segment := range []string{".", ".."} {
		found := false
		for _, value := range excluded {
			if value == segment {
				found = true
			}
		}
		if !found {
			t.Errorf("entryKey must exclude dot-segment %q: URL normalization would address a different route", segment)
		}
	}

	// A claim is held by a connection, not a free-text label: the request
	// names the claiming connection and the entry returns it as a UUID
	// reference to connections.id.
	if _, ok := mappingValue(claimResponses, "404"); !ok {
		t.Error("claimLedgerEntry must document 404 for a connection that is not the caller's own")
	}
	claimPayload := mustLookup(t, doc, "components", "schemas", "LedgerClaimPayload")
	claimRequired, _ := mustLookup(t, claimPayload, "required").([]any)
	hasConnection := false
	for _, r := range claimRequired {
		if r == "connectionId" {
			hasConnection = true
		}
		if r == "claimant" {
			t.Error("LedgerClaimPayload must not require the retired free-text claimant")
		}
	}
	if !hasConnection {
		t.Error("LedgerClaimPayload must require connectionId")
	}
	if ref, _ := mustLookup(t, claimPayload, "properties", "connectionId", "$ref").(string); ref != "../../v1beta2/core/api.yml#/components/schemas/Uuid" {
		t.Errorf("LedgerClaimPayload.connectionId must be the core Uuid, got %q", ref)
	}
	if _, ok := mappingValue(mustLookup(t, claimPayload, "properties"), "claimant"); ok {
		t.Error("LedgerClaimPayload must not carry the retired free-text claimant")
	}
	entry := loadOpenAPIDocument(t, filepath.Join(root, "schemas/constructs/v1beta3/ledger/ledger_entry.yaml"))
	holder := mustLookup(t, entry, "properties", "claimedByConnectionId")
	if ref, _ := mustLookup(t, holder, "$ref").(string); ref != "../../v1beta2/core/api.yml#/components/schemas/Uuid" {
		t.Errorf("claimedByConnectionId must be the core Uuid, got %q", ref)
	}
	if db, _ := mustLookup(t, holder, "x-oapi-codegen-extra-tags", "db").(string); db != "claimed_by_connection_id" {
		t.Errorf("claimedByConnectionId must map to claimed_by_connection_id, got %q", db)
	}
	if _, ok := mappingValue(mustLookup(t, entry, "properties"), "claimedBy"); ok {
		t.Error("ledger entry must not carry the retired free-text claimedBy")
	}

	for _, gone := range []string{"blowhorn_ledger", "blowhorn_binding"} {
		if _, err := os.Stat(filepath.Join(root, "schemas/constructs/v1beta3", gone)); err == nil {
			t.Errorf("construct v1beta3/%s must be removed", gone)
		}
	}
}
