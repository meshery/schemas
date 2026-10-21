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
	for _, method := range []string{"get", "delete"} {
		op := mustLookup(t, paths, "/api/ledgers/{ledger}/entries/{entryKey}", method)
		if _, ok := mappingValue(op, "operationId"); !ok {
			t.Errorf("%s on /entries/{entryKey} must declare an operationId", method)
		}
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

	for _, gone := range []string{"blowhorn_ledger", "blowhorn_binding"} {
		if _, err := os.Stat(filepath.Join(root, "schemas/constructs/v1beta3", gone)); err == nil {
			t.Errorf("construct v1beta3/%s must be removed", gone)
		}
	}
}
