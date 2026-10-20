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
	claim := mustLookup(t, doc, "paths", "/api/ledgers/{ledger}/entries/claim", "post")
	claimResponses := mustLookup(t, claim, "responses")
	for _, code := range []string{"200", "201", "409"} {
		if _, ok := mappingValue(claimResponses, code); !ok {
			t.Errorf("claimLedgerEntry must document %s", code)
		}
	}

	for _, gone := range []string{"blowhorn_ledger", "blowhorn_binding"} {
		if _, err := os.Stat(filepath.Join(root, "schemas/constructs/v1beta3", gone)); err == nil {
			t.Errorf("construct v1beta3/%s must be removed", gone)
		}
	}
}
