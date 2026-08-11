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
//     which answers 403 before the handler and its 404 gate run at all. That
//     middleware authorizes against the organization named by the route's
//     `:orgId` path param when the route has one, and otherwise against the
//     organization the caller currently has selected; no subscription route
//     carries `:orgId`, so on these routes it is the selected one. The two
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
}{
	{subscriptionsPath, "post", "upsertSubscription"},
	{subscriptionByIDPath, "get", "getSubscriptionById"},
}

// subscriptionRouteAuthorization is every operation this construct declares,
// paired with whether meshery-cloud registers its route with
// `AuthorizationMiddlewareForOrgAdminAndOrgOwner` - the middleware that answers
// 403 before the handler runs.
//
// The whole file is listed, not just the two operations this change added,
// because this change also added the missing 403 to five pre-existing
// operations whose routes carry that middleware. Nothing else pins those, so
// without this table a later edit could drop one and no test would notice. The
// `routerLine` is the registration this was read off, so a reviewer can check
// the claim instead of trusting it.
var subscriptionRouteAuthorization = []struct {
	path              string
	method            string
	operationID       string
	middlewareForbids bool
	routerLine        string
}{
	{subscriptionsPath, "get", "getSubscriptions", true, "router.go:1315"},
	{subscriptionsPath, "post", "upsertSubscription", true, "router.go:1317"},
	{"/api/entitlement/subscriptions/create", "post", "createSubscription", true, "router.go:1711"},
	{"/api/entitlement/subscriptions/{subscriptionId}/upgrade", "post", "upgradeSubscription", true, "router.go:1712"},
	{"/api/entitlement/subscriptions/{subscriptionId}/upgrade-preview", "post", "previewSubscriptionUpgrade", true, "router.go:1713"},
	{"/api/entitlement/subscriptions/{subscriptionId}/cancel", "post", "cancelSubscription", true, "router.go:1714"},

	// Registered on the same authenticated `/api` group but with NO
	// authorization middleware, so 403 is unreachable and declaring it would
	// describe a response the server never writes.
	{subscriptionByIDPath, "get", "getSubscriptionById", false, "router.go:1318"},

	// Registered on the bare router, not the `/api` group, and declares
	// `security: []` - the payment processor calls it, not a Meshery user.
	{"/api/entitlement/subscriptions/webhooks", "post", "handleSubscriptionWebhook", false, "router.go:1715"},
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
//     live defect in meshery-cloud, not something this contract encodes: a
//     schema cannot make the server ignore a column, and declaring `deletedAt`
//     writable would advertise the defect as a feature. Keeping it off the
//     payload is this repository's half of the fix, not a claim that the server
//     already neutralizes it. This PR's description enumerates that defect and
//     the other adjacent findings left unfixed here.
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

	// Presence alone is not the contract: `security: []` is *present* and means
	// the opposite - anonymous access, which is what the webhook route declares.
	// Both of these routes sit behind the authenticated `/api` group, so the
	// requirement must actually name the jwt scheme.
	security, present := mappingValue(operation, "security")
	if !present {
		t.Error("security is missing; both routes sit behind the authenticated /api group")
	} else if !securityRequires(security, "jwt") {
		t.Errorf("security = %v, want a requirement naming the jwt scheme; an empty or "+
			"unrelated requirement would drop the documented authentication while still "+
			"parsing as a valid security section", security)
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
// router wraps some of these routes in. It answers 403 against the organization
// named by the route's `:orgId` path param, or - as on every subscription route,
// none of which has one - against the organization the caller currently has
// selected, before any subscription is looked up. It leaks nothing about which
// ids exist, and only the operations whose routes carry it may declare 403.
//
// The table is the whole construct, so the 403s this change added to the five
// pre-existing middleware-guarded operations are pinned too.
func TestSubscriptionDenialCodesMatchTheRouteRegistration(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), subscriptionSpec))

	for _, op := range subscriptionRouteAuthorization {
		op := op
		t.Run(op.operationID, func(t *testing.T) {
			// Guards against the table drifting from the spec: a renamed path
			// or operationId would otherwise make every assertion below vacuous.
			declared, err := lookupPath(doc, "paths", op.path, op.method)
			if err != nil {
				t.Fatalf("%s %s is not declared: %v", op.method, op.path, err)
			}
			if got, _ := mappingValue(declared, "operationId"); got != op.operationID {
				t.Fatalf("%s %s has operationId %v, want %q", op.method, op.path, got, op.operationID)
			}

			_, err = lookupPath(doc, "paths", op.path, op.method, "responses", "403")
			switch {
			case op.middlewareForbids && err != nil:
				t.Errorf("403 is not declared, but %s registers this route with "+
					"AuthorizationMiddlewareForOrgAdminAndOrgOwner, which rejects a caller who "+
					"does not administer the authorizing organization before the handler runs: %v",
					op.routerLine, err)
			case !op.middlewareForbids && err == nil:
				t.Errorf("403 is declared, but %s registers this route with no authorization "+
					"middleware; declaring a status the server never writes misleads consumers, "+
					"and on the id-addressed read the only denial is the handler's uniform 404 "+
					"for both \"not yours\" and \"not there\"", op.routerLine)
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

	// Without this flag a generated client treats a bodyless update as valid,
	// which the server does not: it decodes an empty body to a zero-value
	// subscription, finds no `id`, and refuses with 400.
	required, err := lookupPath(doc, "paths", subscriptionsPath, "post", "requestBody", "required")
	if err != nil {
		t.Fatalf("locating the upsert requestBody required flag: %v", err)
	}
	if required != true {
		t.Errorf("upsert requestBody required = %v, want true", required)
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

	// Exact equality, not "contains these / excludes those": an extra property
	// is the failure mode a containment check misses, and it is the likely one -
	// an eager-loaded association such as `plan`, or a column added to the entity
	// later and copied here out of symmetry. Anything the handler does not read
	// off the body advertises a write that never happens.
	got := mappingKeys(properties)
	want := []string{"id", "planId", "quantity"}
	sort.Strings(got)

	if strings.Join(got, ",") != strings.Join(want, ",") {
		t.Errorf("%s properties = %v, want exactly %v. The payload is the set of fields "+
			"UpsertSubscription reads off the body, nothing wider.%s",
			subscriptionUpdatePayload, got, want, explainExcludedSubscriptionFields(got))
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

	gotRequired := stringSliceOf(required)
	wantRequired := []string{"planId", "quantity"}
	sort.Strings(gotRequired)

	if strings.Join(gotRequired, ",") != strings.Join(wantRequired, ",") {
		t.Errorf("%s required = %v, want exactly %v", subscriptionUpdatePayload, gotRequired, wantRequired)
	}
}

// securityRequires reports whether an OpenAPI `security` section names the given
// scheme. The section decodes as a sequence of single-key mappings, so an empty
// sequence - which declares anonymous access - correctly answers false.
func securityRequires(section any, scheme string) bool {
	requirements, ok := section.([]any)
	if !ok {
		return false
	}

	for _, requirement := range requirements {
		if _, present := mappingValue(requirement, scheme); present {
			return true
		}
	}
	return false
}

// mappingKeys renders the keys of a decoded YAML mapping as a []string, in
// whatever order the decoder produced; callers that compare sort first.
func mappingKeys(node any) []string {
	switch typed := node.(type) {
	case map[string]any:
		out := make([]string, 0, len(typed))
		for k := range typed {
			out = append(out, k)
		}
		return out
	case map[any]any:
		out := make([]string, 0, len(typed))
		for k := range typed {
			out = append(out, fmt.Sprint(k))
		}
		return out
	}
	return nil
}

// explainExcludedSubscriptionFields turns a property-set mismatch into a
// diagnosis when the offending extra is one of the entity fields that is kept
// off the payload deliberately, so the failure says WHY rather than only WHAT.
func explainExcludedSubscriptionFields(properties []string) string {
	present := make(map[string]bool, len(properties))
	for _, p := range properties {
		present[p] = true
	}

	var offenders []string
	for _, field := range subscriptionFieldsExcludedFromTheUpdatePayload {
		if present[field] {
			offenders = append(offenders, field)
		}
	}
	if len(offenders) == 0 {
		return ""
	}

	return fmt.Sprintf(" %v is excluded on purpose - see "+
		"subscriptionFieldsExcludedFromTheUpdatePayload for which of the three reasons applies.",
		offenders)
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
