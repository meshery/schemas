package validation

import (
	"encoding/json"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"testing"
)

const (
	environmentEntitySpec = "schemas/constructs/v1beta3/environment/environment.yaml"
	environmentAPISpec    = "schemas/constructs/v1beta3/environment/api.yml"
	environmentFormSpec   = "schemas/constructs/v1beta3/environment/forms/createOrEdit.json"
)

// The Environment `purpose` property designates an environment administrative,
// and resolvers that read organization-level configuration trust environments
// carrying that designation. The whole value of the property over the naming
// convention it replaces is that it cannot be set by whoever can merely create
// an environment. These tests pin the schema-side half of that: `purpose` stays
// out of `EnvironmentPayload` and out of the create-or-edit form, and the entity
// declares it in the shape those guarantees depend on - which deliberately
// excludes `readOnly`, because that annotation breaks the generated RTK request
// types.
//
// Neither is access control. The schema cannot stop a server from copying a
// request body into an entity struct; each consumer enforces that itself. What
// the schema can do is make the loss of the guarantee a failing test rather
// than a quiet edit, which is what these cover.

// TestEnvironmentPayloadOmitsPurpose is the load-bearing one. EnvironmentPayload
// is the schema every POST and PUT requestBody references, so a `purpose`
// property here would generate a client-settable field in Go, TypeScript, and
// the RTK client at once - reinstating, under a new spelling, exactly the
// escalation the typed property exists to close.
func TestEnvironmentPayloadOmitsPurpose(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), environmentAPISpec))

	properties, err := lookupPath(doc, "components", "schemas", "EnvironmentPayload", "properties")
	if err != nil {
		t.Fatalf("locating EnvironmentPayload properties: %v", err)
	}

	got := mappingKeys(properties)
	sort.Strings(got)
	want := []string{"description", "name", "organizationId"}

	if strings.Join(got, ",") != strings.Join(want, ",") {
		t.Errorf("EnvironmentPayload properties = %v, want exactly %v. "+
			"The payload is the set of fields a client may supply; purpose is "+
			"server-owned and every other field here is server-generated.",
			got, want)
	}
}

// TestEnvironmentEntityPurposeShape pins the property's declaration. It checks
// what must be absent as carefully as what must be present, because both
// absences here are deliberate and both read as oversights.
func TestEnvironmentEntityPurposeShape(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), environmentEntitySpec))

	purpose, err := lookupPath(doc, "properties", "purpose")
	if err != nil {
		t.Fatalf("locating the purpose property: %v", err)
	}

	// No `readOnly: true`, even though it is the natural annotation for a
	// server-owned property. The RTK generator propagates readOnly up through
	// inlined subschemas and then drops every request-body property whose
	// subtree contains one, which deleted the whole `connection` field from
	// registerRegistryComponent and registerRegistryRelationship when this
	// property first carried it. tests/readonly-request-body.test.js holds the
	// repo-wide invariant; this keeps the reason attached to the property that
	// found it. Keeping purpose out of EnvironmentPayload is what actually
	// makes it unsettable.
	if readOnly, ok := mappingValue(purpose, "readOnly"); ok {
		t.Errorf("purpose must not declare readOnly (got %v) - it silently deletes "+
			"unrelated required fields from the generated RTK request types; the "+
			"payload exclusion is the mechanism that matters", readOnly)
	}

	// No `default:`. openapi-typescript reads a default on a response property
	// as a promise the server always sends the field and emits it non-optional,
	// which is untrue for every row written before the column existed. The
	// absent-means-user rule lives in the description; the column-level default
	// belongs in each consumer's migration. See
	// docs/environment-purpose-contract.md#default-user.
	if def, ok := mappingValue(purpose, "default"); ok {
		t.Errorf("purpose must not declare a default (got %v) - it makes the "+
			"generated TypeScript claim the property is always present", def)
	}

	gotEnum := stringSliceOf(mustLookup(t, purpose, "enum"))
	wantEnum := []string{"user", "administrative"}
	if strings.Join(gotEnum, ",") != strings.Join(wantEnum, ",") {
		t.Errorf("purpose enum = %v, want %v in that order - x-enum-varnames is "+
			"positional, so reordering silently renames the generated constants",
			gotEnum, wantEnum)
	}

	for _, name := range stringSliceOf(mustLookup(t, doc, "required")) {
		if name == "purpose" {
			t.Fatal("purpose must stay out of required: every environment written " +
				"before the column existed omits it, and absent already means ordinary")
		}
	}

	// The storage tags are load-bearing, not cosmetic. `db` names the column the
	// migration in docs/environment-purpose-contract.md adds and that every
	// consumer's resolver selects on. `gorm` is what makes a GORM AutoMigrate of
	// this struct - the remediation the contract prescribes for Meshery Server -
	// create the column as NOT NULL DEFAULT 'user'; drop it and AutoMigrate
	// creates a nullable, defaultless column while every test here still passes.
	tags := mustLookup(t, purpose, "x-oapi-codegen-extra-tags")
	for _, want := range []struct{ key, value string }{
		{"db", "purpose"},
		{"gorm", "not null;default:user"},
	} {
		got, ok := mappingValue(tags, want.key)
		if !ok {
			t.Errorf("purpose must declare the %q extra tag as %q", want.key, want.value)
			continue
		}
		if got != want.value {
			t.Errorf("purpose %q extra tag = %v, want %q", want.key, got, want.value)
		}
	}
}

// TestEnvironmentCreateFormOmitsPurpose covers the surface a schema reviewer is
// least likely to look at. The RJSF form drives the create-or-edit modal, and a
// field added here becomes a control a workspace administrator can operate -
// which is the precise capability boundary this property is drawn to respect.
func TestEnvironmentCreateFormOmitsPurpose(t *testing.T) {
	raw, err := os.ReadFile(filepath.Join(repoRootDir(t), environmentFormSpec))
	if err != nil {
		t.Fatalf("read %s: %v", environmentFormSpec, err)
	}

	var form struct {
		Properties map[string]any `json:"properties"`
		Required   []string       `json:"required"`
	}
	if err := json.Unmarshal(raw, &form); err != nil {
		t.Fatalf("parse %s: %v", environmentFormSpec, err)
	}

	if _, present := form.Properties["purpose"]; present {
		t.Error("the create-or-edit form must not offer purpose as a field - it is " +
			"server-owned, and a form control for it hands the designation to " +
			"whoever can create an environment")
	}
	for _, name := range form.Required {
		if name == "purpose" {
			t.Error("purpose must not be required by the create-or-edit form")
		}
	}
}

// mustLookup fails the test rather than returning an error, for the lookups
// whose absence is itself the finding.
func mustLookup(t *testing.T, doc any, keys ...string) any {
	t.Helper()

	current := doc
	for i, key := range keys {
		value, ok := mappingValue(current, key)
		if !ok {
			t.Fatalf("locating %v: key %q not found", keys[:i+1], key)
		}
		current = value
	}
	return current
}
