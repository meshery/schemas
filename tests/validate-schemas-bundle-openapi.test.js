const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");

const config = require("../build/lib/config");
const { dereferenceOpenapiSpec, mergeOpenapiSpec } = require("../build/bundle-openapi");
const { filterOpenapiByTag } = require("../build/filterOpenapiByTag");

test("mergeOpenapiSpec prefixes tags, components, refs, and security requirements", () => {
  const baseSpec = {
    openapi: "3.0.0",
    info: { title: "Meshery Cloud", version: "v0.0.0" },
    tags: [],
    paths: {},
    components: {},
  };

  const constructSpec = {
    openapi: "3.0.0",
    info: { title: "Connection API", version: "v1beta2" },
    tags: [{ name: "Connections", description: "Connection operations" }],
    paths: {
      "/api/connections": {
        get: {
          tags: ["Connections"],
          security: [{ jwt: [] }],
          responses: {
            "200": {
              description: "Connections response",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ConnectionPage" },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        ConnectionPage: {
          type: "object",
          properties: {
            items: {
              type: "array",
              items: { $ref: "#/components/schemas/Connection" },
            },
          },
        },
        Connection: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
        },
      },
      securitySchemes: {
        jwt: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
  };

  const mergedSpec = mergeOpenapiSpec(baseSpec, constructSpec);

  assert.deepEqual(mergedSpec.tags, [
    {
      name: "Connection_API_Connections",
      description: "Connection operations",
    },
  ]);
  assert.deepEqual(mergedSpec.paths["/api/connections"].get.tags, [
    "Connection_API_Connections",
  ]);
  assert.deepEqual(mergedSpec.paths["/api/connections"].get.security, [
    { Connection_API_jwt: [] },
  ]);
  assert.equal(
    mergedSpec.paths["/api/connections"].get.responses["200"].content["application/json"].schema.$ref,
    "#/components/schemas/Connection_API_ConnectionPage",
  );
  assert.equal(
    mergedSpec.components.schemas.Connection_API_ConnectionPage.properties.items.items.$ref,
    "#/components/schemas/Connection_API_Connection",
  );
  assert.deepEqual(mergedSpec.components.securitySchemes.Connection_API_jwt, {
    type: "http",
    scheme: "bearer",
  });
});

test("mergeOpenapiSpec rejects duplicate path operations", () => {
  const baseSpec = {
    openapi: "3.0.0",
    info: { title: "Meshery Cloud", version: "v0.0.0" },
    tags: [],
    paths: {
      "/api/connections": {
        get: { responses: { "200": { description: "Existing response" } } },
      },
    },
    components: {},
  };

  assert.throws(
    () =>
      mergeOpenapiSpec(baseSpec, {
        openapi: "3.0.0",
        info: { title: "Connection API", version: "v1beta2" },
        paths: {
          "/api/connections": {
            get: { responses: { "200": { description: "Duplicate response" } } },
          },
        },
      }),
    /Duplicate path operation during merge/,
  );
});

test("mergeOpenapiSpec lets later component definitions override earlier ones", () => {
  const baseSpec = {
    openapi: "3.0.0",
    info: { title: "Meshery Cloud", version: "v0.0.0" },
    tags: [],
    paths: {},
    components: {
      schemas: {
        Catalog_CatalogData: {
          type: "object",
          properties: {
            publishedVersion: { type: "string" },
          },
        },
      },
    },
  };

  mergeOpenapiSpec(baseSpec, {
    openapi: "3.0.0",
    info: { title: "Catalog", version: "v1beta2" },
    components: {
      schemas: {
        CatalogData: {
          type: "object",
          properties: {
            publishedVersion: { type: "string", maxLength: 500 },
          },
        },
      },
    },
  });

  assert.equal(
    baseSpec.components.schemas.Catalog_CatalogData.properties.publishedVersion.maxLength,
    500,
  );
});

test("dereferenceOpenapiSpec resolves a construct api.yml in-process", async () => {
  const projectRoot = config.getProjectRoot();
  const entryPath = path.join(projectRoot, "schemas/constructs/v1beta1/key/api.yml");

  const document = await dereferenceOpenapiSpec(entryPath);

  assert.equal(document.openapi, "3.0.0");
  assert.equal(document.info.title, "Key");
  assert.equal(document.paths["/api/auth/keys"].get.tags[0], "Key");
  assert.ok(document.components.schemas.KeyPage);
});

test("clonePattern declares a request body for generated clients", async () => {
  const projectRoot = config.getProjectRoot();
  const document = await dereferenceOpenapiSpec(
    path.join(projectRoot, "schemas/constructs/v1beta3/design/api.yml"),
  );
  const operation = document.paths["/api/content/patterns/clone/{designId}"].post;

  assert.equal(operation.operationId, "clonePattern");
  assert.equal(operation.requestBody.required, true);
  assert.deepEqual(operation.requestBody.content["application/json"].schema.properties.name, {
    type: "string",
    description: "Optional name to apply to the cloned design.",
    minLength: 1,
    maxLength: 255,
  });
});

test("filterOpenapiByTag applies consumer-specific base metadata", () => {
  const doc = {
    openapi: "3.0.0",
    info: { title: "Merged", version: "v0.0.0" },
    servers: [{ url: "https://merged.meshery.io", description: "Merged" }],
    paths: {
      "/api/cloud": {
        get: {
          "x-internal": ["cloud"],
          responses: { "200": { description: "Cloud response" } },
        },
      },
      "/api/meshery": {
        get: {
          "x-internal": ["meshery"],
          responses: { "200": { description: "Meshery response" } },
        },
      },
    },
  };

  const filteredDoc = filterOpenapiByTag(doc, "meshery", {
    openapi: "3.0.0",
    info: { title: "Meshery Server", version: "v1.2.2" },
    servers: [{ url: "https://playground.meshery.io", description: "Meshery Playground server URL" }],
  });

  assert.deepEqual(filteredDoc.info, {
    title: "Meshery Server",
    version: "v1.2.2",
  });
  assert.deepEqual(filteredDoc.servers, [
    {
      url: "https://playground.meshery.io",
      description: "Meshery Playground server URL",
    },
  ]);
  assert.deepEqual(Object.keys(filteredDoc.paths), ["/api/meshery"]);
});

// Route ownership: a v1beta3 user operation moves the v1beta2 route with
// x-supersedes. The helpers below build one construct version's spec.
const PREFERENCES_PATH = "/api/identity/users/preferences";

function userVersionSpec(version, operation, { title = "User" } = {}) {
  return {
    openapi: "3.0.3",
    info: { title, version },
    tags: [{ name: "users" }],
    paths: {
      [PREFERENCES_PATH]: {
        put: { "x-internal": ["cloud"], operationId: "updateUserPreferences", ...operation },
      },
    },
    components: {},
  };
}

const v1beta2Preferences = userVersionSpec("v1beta2", {
  responses: { "201": { description: "Preferences updated (v1beta2)" } },
});

const v1beta3Preferences = userVersionSpec("v1beta3", {
  "x-supersedes": "v1beta2",
  responses: {
    "201": { description: "Preferences updated (v1beta3)" },
    "403": { description: "Forbidden" },
  },
});

// Merges the specs in the given order into an empty cloud base, so the result
// can be checked for each order.
function mergeInOrder(specs) {
  const base = { openapi: "3.0.3", info: { title: "Meshery Cloud", version: "v0.0.0" }, tags: [], paths: {}, components: {} };
  for (const spec of specs) {
    mergeOpenapiSpec(base, JSON.parse(JSON.stringify(spec)));
  }
  return base;
}

test("route ownership: the newer version owns a moved route in either merge order", () => {
  for (const specs of [
    [v1beta2Preferences, v1beta3Preferences],
    [v1beta3Preferences, v1beta2Preferences],
  ]) {
    const merged = mergeInOrder(specs);
    const operation = merged.paths[PREFERENCES_PATH].put;

    assert.equal(operation.operationId, "updateUserPreferences");
    assert.equal(operation["x-supersedes"], "v1beta2");
    assert.equal(operation.responses["201"].description, "Preferences updated (v1beta3)");
    assert.equal(operation.responses["403"].description, "Forbidden");
    assert.equal(Object.keys(merged.paths).length, 1);
  }
});

test("route ownership: an undeclared duplicate still throws", () => {
  const undeclared = userVersionSpec("v1beta3", {
    responses: { "201": { description: "Preferences updated (v1beta3)" } },
  });

  for (const specs of [
    [v1beta2Preferences, undeclared],
    [undeclared, v1beta2Preferences],
  ]) {
    assert.throws(() => mergeInOrder(specs), /Duplicate path operation during merge/);
  }
});

test("route ownership: a superseded version that does not match throws", () => {
  const namesOlderVersion = userVersionSpec("v1beta3", {
    "x-supersedes": "v1beta1",
    responses: { "201": { description: "Preferences updated (v1beta3)" } },
  });

  for (const specs of [
    [v1beta2Preferences, namesOlderVersion],
    [namesOlderVersion, v1beta2Preferences],
  ]) {
    assert.throws(
      () => mergeInOrder(specs),
      /Duplicate path operation during merge: \/api\/identity\/users\/preferences put \(x-supersedes does not name/,
    );
  }
});

test("route ownership: an operationId mismatch throws", () => {
  const renamed = userVersionSpec("v1beta3", {
    "x-supersedes": "v1beta2",
    operationId: "setUserPreferences",
    responses: { "201": { description: "Preferences updated (v1beta3)" } },
  });

  for (const specs of [
    [v1beta2Preferences, renamed],
    [renamed, v1beta2Preferences],
  ]) {
    assert.throws(() => mergeInOrder(specs), /operationIds differ/);
  }
});

test("route ownership: a different construct cannot supersede the route", () => {
  const otherConstruct = userVersionSpec(
    "v1beta3",
    { "x-supersedes": "v1beta2", responses: { "201": { description: "Other" } } },
    { title: "Token" },
  );

  assert.throws(() => mergeInOrder([v1beta2Preferences, otherConstruct]), /Duplicate path operation during merge/);
});

test("route ownership: the owner must be newer than the version it supersedes", () => {
  const olderOwner = userVersionSpec("v1beta2", {
    "x-supersedes": "v1beta3",
    responses: { "201": { description: "Preferences updated (v1beta2)" } },
  });

  const undeclaredNewer = userVersionSpec("v1beta3", {
    responses: { "201": { description: "Preferences updated (v1beta3)" } },
  });

  for (const specs of [
    [undeclaredNewer, olderOwner],
    [olderOwner, undeclaredNewer],
  ]) {
    assert.throws(() => mergeInOrder(specs), /v1beta2 is not newer than v1beta3/);
  }
});

test("route ownership: ownership does not chain", () => {
  const middle = userVersionSpec("v1beta2", {
    "x-supersedes": "v1beta1",
    responses: { "201": { description: "Preferences updated (v1beta2)" } },
  });
  const oldest = userVersionSpec("v1beta1", {
    responses: { "201": { description: "Preferences updated (v1beta1)" } },
  });

  assert.throws(() => mergeInOrder([oldest, middle, v1beta3Preferences]), /ownership does not chain/);
});

test("route ownership: x-supersedes must be a version string", () => {
  const malformed = userVersionSpec("v1beta3", {
    "x-supersedes": 2,
    responses: { "201": { description: "Preferences updated (v1beta3)" } },
  });

  assert.throws(() => mergeInOrder([v1beta2Preferences, malformed]), /x-supersedes on \/api\/identity\/users\/preferences put must be a version string/);
});
