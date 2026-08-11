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
//   - That handler gate is not the only one. `server/router/router.go` registers
//     the POST - and not the GET - with `AuthorizationMiddlewareForOrgAdminAndOrgOwner`,
//     which answers 403 against the organization the caller currently has
//     *selected*, before the handler and its 404 gate run at all. The two
//     denials check different things and both are reachable, so the POST
//     declares both and the GET declares only the 404.
//
// These tests pin that contract so it cannot silently drift back to an
// entity-shaped request body, to a payload that re-advertises the pinned fields
// as writable, or to a denial set that does not match the route registration.

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
	// middlewareForbids records whether meshery-cloud registers the route with
	// `AuthorizationMiddlewareForOrgAdminAndOrgOwner`, which rejects with 403
	// before the handler runs. The POST carries it; the GET is registered on
	// the same authenticated group with no authorization middleware at all, so
	// 403 is unreachable there and declaring it would describe a response the
	// server never writes.
	middlewareForbids bool
}{
	{subscriptionsPath, "post", "upsertSubscription", true},
	{subscriptionByIDPath, "get", "getSubscriptionById", false},
}

// subscriptionFieldsExcludedFromTheUpdatePayload are the entity fields that must
// not appear on the write payload - for three different reasons, only the first
// of which is "the server pins it":
//
//   - `orgId`, `billingId`, `status`, `startDate` and `endDate` are exactly the
//     five columns `pinServerOwnedSubscriptionFields` copies from the stored row
//     over whatever the body carried, so a client-supplied value for one of them
//     really is discarded.
//   - `createdAt` and `updatedAt` are the ORM's, not the payload's: pop's
//     `Update` removes `id` and `created_at` from the column set, and `updatedAt`
//     is stamped on every write.
//   - `deletedAt` is neither pinned by the handler nor excluded by pop, so a body
//     carrying it *is* written and an update can soft-delete the row. That is a
//     defect in meshery-cloud, reported as a follow-up rather than encoded into
//     this contract. Keeping `deletedAt` off the payload is this repository's
//     half of the fix, not a claim that the server already neutralizes it.
var subscriptionFieldsExcludedFromTheUpdatePayload = []string{
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

			assertSubscriptionOperationShape(t, doc, op.path, op.method, operation)
		})
	}
}

// TestSubscriptionPathsAreDeclaredUnderTheApiPrefix guards the declared path
// itself. The declared path is the complete served path - nothing prepends
// `/api` at build time - and meshery-cloud registers both routes on
// `s.e.Group("/api")`. A bare `/entitlement/...` declaration would generate a
// client that 404s at runtime without failing any build step (meshery/schemas#1126),
// so neither served route may appear without the prefix.
func TestSubscriptionPathsAreDeclaredUnderTheApiPrefix(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), subscriptionSpec))

	for _, declared := range []string{subscriptionsPath, subscriptionByIDPath} {
		unprefixed := strings.TrimPrefix(declared, "/api")
		if _, err := lookupPath(doc, "paths", unprefixed); err == nil {
			t.Errorf("%q is declared without the /api prefix; the served routes are "+
				"registered on the /api Echo group, so the declared path must be %q",
				unprefixed, declared)
		}
	}
}

// assertSubscriptionOperationShape checks the parts every subscription operation
// must carry: cloud-only scoping, JWT security, a tag for the published docs, a
// 200 anchored to SubscriptionPage, and the standard error set - including the
// 404 that doubles as the handler's authorization denial. It is the sole owner
// of those four status codes; the 403 that only some routes can produce belongs
// to TestSubscriptionDenialCodesMatchTheRouteRegistration.
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

// TestSubscriptionDenialCodesMatchTheRouteRegistration owns the one denial that
// differs between the two operations. That the standard error set - 400, 401,
// 404 and 500 - is declared on both is asserted once, by
// assertSubscriptionOperationShape; this test asserts only the 403 asymmetry,
// which is the security-relevant half of the contract.
//
// Two distinct gates are in play. The handler gate, `authorizeSubscriptionByID`,
// answers 404 - never 403 - to a caller who is not an Organization Admin or
// Owner of the subscription's *own* organization, matching the answer an absent
// subscription gives so the route cannot be used to enumerate subscription ids.
// The route gate is the `AuthorizationMiddlewareForOrgAdminAndOrgOwner` the
// router wraps the POST in, which answers 403 against the organization the
// caller currently has selected before any subscription is looked up; it leaks
// nothing about which ids exist, and only the operations whose routes carry it
// may declare 403.
func TestSubscriptionDenialCodesMatchTheRouteRegistration(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), subscriptionSpec))

	for _, op := range subscriptionOperations {
		op := op
		t.Run(op.method+" "+op.path, func(t *testing.T) {
			_, err := lookupPath(doc, "paths", op.path, op.method, "responses", "403")
			switch {
			case op.middlewareForbids && err != nil:
				t.Errorf("403 is not declared, but the route is registered with "+
					"AuthorizationMiddlewareForOrgAdminAndOrgOwner, which rejects a caller who "+
					"does not administer their currently selected organization before the "+
					"handler runs: %v", err)
			case !op.middlewareForbids && err == nil:
				t.Errorf("403 is declared, but the route carries no authorization middleware; " +
					"its only denial is the handler's uniform 404 for both \"not yours\" and " +
					"\"not there\", which keeps the route from being an existence oracle")
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

	for _, field := range subscriptionFieldsExcludedFromTheUpdatePayload {
		if _, present := mappingValue(properties, field); present {
			t.Errorf("%s declares %q; a write payload carries only the fields the handler "+
				"reads off the body, and this one is not among them",
				subscriptionUpdatePayload, field)
		}
	}

	for _, field := range []string{"id", "planId", "quantity"} {
		if _, present := mappingValue(properties, field); !present {
			t.Errorf("%s is missing %q, which the handler does read off the body",
				subscriptionUpdatePayload, field)
		}
	}

	// `id` is mandatory at runtime - a body without it is refused 400 - yet it
	// is deliberately absent from `required`, because Rule 2 blocks a
	// server-generated field there even on an update-only route where `id` is
	// the row selector rather than a value the client invents. The exact-match
	// below pins that accepted asymmetry; the 400 that carries the
	// mandatory-ness is declared on the operation and owned by
	// assertSubscriptionOperationShape.
	//
	// The property's own `description` states it too, but nothing asserts on
	// that text: a `description` written beside a `$ref` loses to the `$ref`
	// target's own description, so it never reaches a generated Go or
	// TypeScript consumer. That is specific to `description` - sibling
	// `x-go-name` and `x-oapi-codegen-extra-tags` beside a `$ref` are honoured,
	// which is why `planId` keeps `x-go-name: PlanID` here to match the entity.
	required, err := lookupPath(doc, "components", "schemas", subscriptionUpdatePayload, "required")
	if err != nil {
		t.Fatalf("locating %s required: %v", subscriptionUpdatePayload, err)
	}

	got := stringSliceOf(required)
	sort.Strings(got)
	if len(got) != 2 || got[0] != "planId" || got[1] != "quantity" {
		t.Errorf("%s required = %v, want [planId quantity]", subscriptionUpdatePayload, got)
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
