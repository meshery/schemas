package validation

import (
	"fmt"
	"path/filepath"
	"sort"
	"strings"
	"testing"
)

// The two id-addressed subscription routes - `POST /api/entitlement/subscriptions`
// and `GET /api/entitlement/subscriptions/{subscriptionId}` - had no operation in
// this repository at all, so the published REST reference could not describe them
// and no generated client could reach them (layer5io/meshery-cloud#5914).
//
// The contract they now carry is read off the shipped handlers rather than
// inferred from the route names (meshery-cloud `server/handlers/subscriptions.go`
// and `server/handlers/subscription_authorization.go`, as of the tenant-isolation
// hardening in layer5io/meshery-cloud#5913):
//
//   - `UpsertSubscription` is update-ONLY. A body with no `id` is refused 400
//     with `ErrSubscriptionCreateNotSupported`; subscriptions are minted by the
//     checkout flow or the Stripe webhook, neither of which traverses this route.
//   - `pinServerOwnedSubscriptionFields` overwrites `OrgID`, `BillingID`,
//     `Status`, `StartDate` and `EndDate` from the stored row, so those fields
//     are not part of the write payload at all.
//   - `authorizeSubscriptionByID` answers a uniform 404 both for a subscription
//     that does not exist and for one the caller does not administer, on purpose:
//     a 403/404 split would turn the route into an oracle for which subscription
//     ids are real.
//
// These tests pin that contract so it cannot silently drift back to an
// entity-shaped request body, to a payload that re-advertises the pinned fields
// as writable, or to an undeclared denial code.

const (
	subscriptionSpec           = "schemas/constructs/v1beta3/subscription/api.yml"
	subscriptionsPath          = "/api/entitlement/subscriptions"
	subscriptionByIDPath       = "/api/entitlement/subscriptions/{subscriptionId}"
	subscriptionUpdatePayload  = "SubscriptionUpdatePayload"
	subscriptionPageSchemaName = "SubscriptionPage"
)

// subscriptionOperations is every operation these tests cover, keyed by the
// (path, method) pair the server actually registers on its `/api` Echo group.
var subscriptionOperations = []struct {
	path        string
	method      string
	operationID string
}{
	{subscriptionsPath, "post", "upsertSubscription"},
	{subscriptionByIDPath, "get", "getSubscriptionById"},
}

// serverPinnedSubscriptionFields are the columns
// `pinServerOwnedSubscriptionFields` takes from the stored row. A client-supplied
// value for any of them is discarded, so declaring one in the write payload would
// advertise a write that does not happen.
var serverPinnedSubscriptionFields = []string{
	"orgId", "billingId", "status", "startDate", "endDate",
	"createdAt", "updatedAt", "deletedAt",
}

func TestSubscriptionIDAddressedOperationsAreDeclared(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), subscriptionSpec))

	for _, op := range subscriptionOperations {
		op := op
		t.Run(op.method+" "+op.path, func(t *testing.T) {
			operation, err := lookupPath(doc, "paths", op.path, op.method)
			if err != nil {
				t.Fatalf("%s %s is not declared: %v", op.method, op.path, err)
			}

			if got, _ := mappingValue(operation, "operationId"); got != op.operationID {
				t.Errorf("operationId = %v, want %q", got, op.operationID)
			}

			// The declared path is the complete served path - nothing prepends
			// `/api` at build time - and meshery-cloud registers both routes on
			// `s.e.Group("/api")`. A bare `/entitlement/...` here would generate
			// a client that 404s at runtime without failing any build step.
			if _, err := lookupPath(doc, "paths", "/entitlement/subscriptions"); err == nil {
				t.Errorf("an unprefixed /entitlement/subscriptions path is declared; " +
					"the served routes are under the /api Echo group")
			}

			assertSubscriptionOperationShape(t, doc, op.path, op.method, operation)
		})
	}
}

// assertSubscriptionOperationShape checks the parts every subscription operation
// must carry: cloud-only scoping, JWT security, a tag for the published docs, a
// 200 anchored to SubscriptionPage, and the full error set - including the 404
// that doubles as the authorization denial.
//
// The already-resolved operation node is passed for the flat lookups; the nested
// ones walk from the document root, because lookupPath starts at a mapping the
// decoder typed as map[string]any and an operation node is not one.
func assertSubscriptionOperationShape(t *testing.T, doc map[string]any, path, method string, operation any) {
	t.Helper()

	internal, present := mappingValue(operation, "x-internal")
	if !present {
		t.Error("x-internal is missing; the bundler rejects an operation without it")
	} else if got := fmt.Sprint(internal); got != "[cloud]" {
		t.Errorf("x-internal = %v, want [cloud] (these routes are served only by Meshery Cloud)", got)
	}

	if _, present := mappingValue(operation, "tags"); !present {
		t.Error("tags is missing; every operation needs at least one for the published docs")
	}

	if _, present := mappingValue(operation, "security"); !present {
		t.Error("security is missing; both routes sit behind the authenticated /api group")
	}

	// The handlers respond with a SubscriptionPage carrying the single
	// subscription, not a bare subscription object - `page` 0, `pageSize` 1,
	// `totalCount` 1. A response schema is a claim about bytes the server
	// already writes.
	okSchema, err := lookupPath(doc, "paths", path, method,
		"responses", "200", "content", "application/json", "schema")
	if err != nil {
		t.Fatalf("locating the 200 response schema: %v", err)
	}
	wantRef := "#/components/schemas/" + subscriptionPageSchemaName
	if got, _ := mappingValue(okSchema, "$ref"); got != wantRef {
		t.Errorf("200 response schema $ref = %v, want %q (the handler encodes a SubscriptionPage)", got, wantRef)
	}

	for _, code := range []string{"400", "401", "404", "500"} {
		if _, err := lookupPath(doc, "paths", path, method, "responses", code); err != nil {
			t.Errorf("response %s is not declared: %v", code, err)
		}
	}
}

// TestSubscriptionDenialIsDeclaredAs404 is the security-relevant half of the
// contract above, stated on its own so it reads as intent rather than as one
// entry in a list of status codes. `authorizeSubscriptionByID` answers 404 - not
// 403 - to a caller who is not an Organization Admin or Owner of the
// subscription's own organization, matching the answer an absent subscription
// gives so the route cannot be used to enumerate subscription ids. A spec that
// declared 403 would invite integrators to distinguish the two.
func TestSubscriptionDenialIsDeclaredAs404NotForbidden(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), subscriptionSpec))

	for _, op := range subscriptionOperations {
		op := op
		t.Run(op.method+" "+op.path, func(t *testing.T) {
			if _, err := lookupPath(doc, "paths", op.path, op.method, "responses", "404"); err != nil {
				t.Errorf("404 is not declared: %v", err)
			}
			if _, err := lookupPath(doc, "paths", op.path, op.method, "responses", "403"); err == nil {
				t.Errorf("403 is declared; the handler answers a uniform 404 for both " +
					"\"not yours\" and \"not there\" so the route is not an existence oracle")
			}
		})
	}
}

// TestUpsertSubscriptionUsesUpdatePayload proves the write body is the dedicated
// update payload rather than the full entity schema, which is what forces the
// dual-schema separation to survive future edits.
func TestUpsertSubscriptionUsesUpdatePayload(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), subscriptionSpec))

	schema, err := lookupPath(doc, "paths", subscriptionsPath, "post",
		"requestBody", "content", "application/json", "schema")
	if err != nil {
		t.Fatalf("locating the upsert request body schema: %v", err)
	}

	want := "#/components/schemas/" + subscriptionUpdatePayload
	if got, _ := mappingValue(schema, "$ref"); got != want {
		t.Fatalf("upsert requestBody schema $ref = %v, want %q "+
			"(referencing the entity schema would force clients to supply server-owned fields)", got, want)
	}

	if _, err := lookupPath(doc, "components", "schemas", subscriptionUpdatePayload); err != nil {
		t.Fatalf("%s is referenced by the request body but not defined: %v", subscriptionUpdatePayload, err)
	}
}

// TestSubscriptionUpdatePayloadExposesOnlyTheWritableSurface pins the payload to
// exactly what `UpsertSubscription` reads off the body. Both directions matter:
// a pinned field appearing here would advertise a write the server discards, and
// dropping `planId` or `quantity` from `required` would let a client omit one and
// silently zero that column, because `pop.Save` writes the decoded struct whole
// rather than merging it into the stored row.
func TestSubscriptionUpdatePayloadExposesOnlyTheWritableSurface(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), subscriptionSpec))

	properties, err := lookupPath(doc, "components", "schemas", subscriptionUpdatePayload, "properties")
	if err != nil {
		t.Fatalf("locating %s properties: %v", subscriptionUpdatePayload, err)
	}

	for _, field := range serverPinnedSubscriptionFields {
		if _, present := mappingValue(properties, field); present {
			t.Errorf("%s declares %q; the server pins that field to the stored row and "+
				"ignores any client-supplied value, so declaring it advertises a write that never happens",
				subscriptionUpdatePayload, field)
		}
	}

	for _, field := range []string{"id", "planId", "quantity"} {
		if _, present := mappingValue(properties, field); !present {
			t.Errorf("%s is missing %q, which the handler does read off the body",
				subscriptionUpdatePayload, field)
		}
	}

	required, err := lookupPath(doc, "components", "schemas", subscriptionUpdatePayload, "required")
	if err != nil {
		t.Fatalf("locating %s required: %v", subscriptionUpdatePayload, err)
	}

	got := stringSliceOf(required)
	sort.Strings(got)
	if len(got) != 2 || got[0] != "planId" || got[1] != "quantity" {
		t.Errorf("%s required = %v, want [planId quantity]", subscriptionUpdatePayload, got)
	}

	// `id` is mandatory at runtime - a body without it is refused 400 - but it
	// cannot be listed under `required`, because Rule 2 blocks server-generated
	// fields there. Its mandatory-ness therefore lives in the description, and
	// this asserts that the description carries it rather than leaving the only
	// statement of it in a commit message.
	description, err := lookupPath(doc, "components", "schemas", subscriptionUpdatePayload, "properties", "id", "description")
	if err != nil {
		t.Fatalf("locating the %s.id description: %v", subscriptionUpdatePayload, err)
	}
	if !strings.Contains(strings.ToLower(fmt.Sprint(description)), "mandatory") {
		t.Errorf("%s.id description does not state that the field is mandatory: %q",
			subscriptionUpdatePayload, description)
	}
}

// stringSliceOf renders a decoded YAML sequence as a []string.
func stringSliceOf(node any) []string {
	items, ok := node.([]any)
	if !ok {
		return nil
	}

	out := make([]string, 0, len(items))
	for _, item := range items {
		out = append(out, fmt.Sprint(item))
	}
	return out
}
