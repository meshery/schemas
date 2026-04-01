const test = require("node:test");
const assert = require("node:assert/strict");

const { detectPostCreate, isSingleResourceDelete } = require("../build/lib/response-code-semantics");

// ─── detectPostCreate ─────────────────────────────────────────────────────────

test("detects create via operationId prefix 'create'", () => {
  const { isCreate, detector } = detectPostCreate(
    { operationId: "createEnvironment", responses: { "201": {} } },
    "/api/environments",
  );
  assert.equal(isCreate, true);
  assert.match(detector, /operationId/);
});

test("detects create via operationId prefix 'register'", () => {
  const { isCreate } = detectPostCreate(
    { operationId: "registerMeshmodels", responses: { "201": {} } },
    "/api/meshmodels/register",
  );
  assert.equal(isCreate, true);
});

test("detects create via operationId prefix 'add'", () => {
  const { isCreate } = detectPostCreate(
    { operationId: "addUserToOrg", responses: { "201": {} } },
    "/api/identity/orgs/{orgId}/users",
  );
  assert.equal(isCreate, true);
});

test("detects create via response description when operationId is absent", () => {
  const { isCreate, detector } = detectPostCreate(
    {
      responses: { "200": { description: "A new subscription has been created" } },
      requestBody: {
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/CreateSubscriptionRequest" },
          },
        },
      },
    },
    "/api/entitlement/subscriptions/create",
  );
  assert.equal(isCreate, true);
  assert.match(detector, /response description/);
});

test("detects create via requestBody schema ref starting with 'Create'", () => {
  const { isCreate, detector } = detectPostCreate(
    {
      responses: { "200": { description: "OK" } },
      requestBody: {
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/CreateFooRequest" },
          },
        },
      },
    },
    "/api/foo",
  );
  assert.equal(isCreate, true);
  assert.match(detector, /requestBody schema/);
});

test("does not detect create for non-creation operationId", () => {
  const { isCreate } = detectPostCreate(
    { operationId: "cancelSubscription", responses: { "200": {} } },
    "/api/entitlement/subscriptions/{subscriptionId}/cancel",
  );
  assert.equal(isCreate, false);
});

test("does not detect create for action paths", () => {
  const { isCreate } = detectPostCreate(
    { operationId: "acceptInvitation", responses: { "200": {} } },
    "/api/invitations/{invitationId}/accept",
  );
  assert.equal(isCreate, false);
});

test("does not detect create for bulk delete sub-resource", () => {
  const { isCreate } = detectPostCreate(
    { operationId: "deletePatterns", responses: { "200": {} } },
    "/api/content/designs/delete",
  );
  assert.equal(isCreate, false);
});

test("does not detect create for webhook endpoints", () => {
  const { isCreate } = detectPostCreate(
    { responses: { "200": {} } },
    "/api/entitlement/subscriptions/webhooks",
  );
  assert.equal(isCreate, false);
});

test("returns isCreate false when responses is missing", () => {
  const { isCreate } = detectPostCreate({}, "/api/foo");
  assert.equal(isCreate, false);
});

test("returns isCreate false for generic POST with no creation signals", () => {
  const { isCreate } = detectPostCreate(
    { operationId: "updateSettings", responses: { "200": { description: "Settings updated" } } },
    "/api/settings",
  );
  assert.equal(isCreate, false);
});

// ─── isSingleResourceDelete ───────────────────────────────────────────────────

test("returns true for path ending with path parameter", () => {
  assert.equal(isSingleResourceDelete("/api/keys/{keyId}"), true);
});

test("returns false for collection path", () => {
  assert.equal(isSingleResourceDelete("/api/keys"), false);
});

test("returns false for path with parameter in the middle", () => {
  assert.equal(isSingleResourceDelete("/api/orgs/{orgId}/users"), false);
});
