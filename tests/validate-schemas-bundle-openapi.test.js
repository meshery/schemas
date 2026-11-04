const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const Ajv = require("ajv");

const config = require("../build/lib/config");
const { dereferenceOpenapiSpec, mergeOpenapiSpec, mergeOpenapiSpecs } = require("../build/bundle-openapi");
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

test("catalog schemas, read responses, and requests share the declared contentClass enum", async () => {
  const projectRoot = config.getProjectRoot();
  const enumValues = ["official", "verified", "community"];
  const catalogSpecs = await Promise.all(
    ["v1alpha2", "v1beta1", "v1beta2"].map((version) =>
      dereferenceOpenapiSpec(
        path.join(projectRoot, `schemas/constructs/${version}/catalog/api.yml`),
      ),
    ),
  );
  const designSpec = await dereferenceOpenapiSpec(
    path.join(projectRoot, "schemas/constructs/v1beta3/design/api.yml"),
  );
  const workspaceSpec = await dereferenceOpenapiSpec(
    path.join(projectRoot, "schemas/constructs/v1beta3/workspace/api.yml"),
  );

  const catalogPattern =
    designSpec.components.schemas.CatalogContentPage.properties.patterns.items;
  const workspaceDesign =
    workspaceSpec.components.schemas.MesheryDesignPage.properties.designs.items;
  const catalogRequest = designSpec.components.schemas.CatalogRequest;

  for (const catalogSpec of catalogSpecs) {
    const catalogData = catalogSpec.components.schemas.CatalogData;
    assert.equal(Object.hasOwn(catalogData.properties, "class"), false);
    assert.deepEqual(catalogData.properties.contentClass.enum, enumValues);
  }

  for (const catalogData of [
    catalogPattern.properties.catalogData,
    workspaceDesign.properties.catalogData,
  ]) {
    assert.equal(Object.hasOwn(catalogData.properties, "class"), false);
    assert.deepEqual(catalogData.properties.contentClass.enum, enumValues);
  }

  const requestContentClass = catalogRequest.properties.contentClass;
  assert.deepEqual(requestContentClass.oneOf[0].enum, enumValues);

  const validateContentClass = new Ajv({ allErrors: true, strict: false }).compile(
    requestContentClass,
  );
  assert.equal(validateContentClass(null), true, JSON.stringify(validateContentClass.errors));
  assert.equal(validateContentClass("official"), true);
  assert.equal(validateContentClass("unknown"), false);
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
  return mergeOpenapiSpecs(base, specs.map((spec) => JSON.parse(JSON.stringify(spec))));
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

test("route ownership: the owner's x-internal must match the superseded declaration", () => {
  const widerSuperseded = userVersionSpec("v1beta2", {
    "x-internal": ["cloud", "meshery"],
    responses: { "201": { description: "Preferences updated (v1beta2)" } },
  });

  for (const specs of [
    [widerSuperseded, v1beta3Preferences],
    [v1beta3Preferences, widerSuperseded],
  ]) {
    assert.throws(() => mergeInOrder(specs), /Duplicate path operation during merge: \/api\/identity\/users\/preferences put \(x-internal differs/);
  }
});

test("route ownership: an owned operation that keeps a $ref throws", () => {
  const referencingOwner = userVersionSpec("v1beta3", {
    "x-supersedes": "v1beta2",
    requestBody: { content: { "application/json": { schema: { $ref: "#/components/schemas/User_PreferencePayload" } } } },
    responses: { "201": { description: "Preferences updated (v1beta3)" } },
  });

  assert.throws(
    () => mergeInOrder([v1beta2Preferences, referencingOwner]),
    /keeps a \$ref \(#\/components\/schemas\/User_User_PreferencePayload\)/,
  );
});

test("route ownership: an owned body is the owner's in either order even when component names collide", () => {
  const sharedComponent = (description) => ({ schemas: { User_PreferencePayload: { type: "object", description } } });
  const owner = userVersionSpec("v1beta3", {
    "x-supersedes": "v1beta2",
    requestBody: {
      content: { "application/json": { schema: { type: "object", properties: { agentsActWithoutApproval: { type: "boolean", nullable: true } } } } },
    },
    responses: { "201": { description: "Preferences updated (v1beta3)" } },
  });
  const superseded = { ...v1beta2Preferences, components: sharedComponent("v1beta2") };
  owner.components = sharedComponent("v1beta3");

  for (const specs of [
    [superseded, owner],
    [owner, superseded],
  ]) {
    const merged = mergeInOrder(specs);
    const body = merged.paths[PREFERENCES_PATH].put.requestBody.content["application/json"].schema;
    assert.ok(body.properties.agentsActWithoutApproval, "the owner's inline body is kept");
  }
});

test("route ownership: an owner whose superseded version declares no such route throws in either order", () => {
  // The v1beta2 user spec is in the merge, but it declares a different route, so
  // the owner's x-supersedes names no declaration of the moved route.
  const otherRoute = {
    ...userVersionSpec("v1beta2", { responses: { "200": { description: "Users" } } }),
    paths: { "/api/identity/users": { get: { operationId: "listUsers", responses: { "200": { description: "Users" } } } } },
  };

  for (const specs of [
    [otherRoute, v1beta3Preferences],
    [v1beta3Preferences, otherRoute],
  ]) {
    assert.throws(
      () => mergeInOrder(specs),
      /x-supersedes names no declaration: User v1beta2 declares no PUT \/api\/identity\/users\/preferences for the v1beta3 owner/,
    );
  }
});

test("route ownership: a recursive owner body without a $ref merges in either order", () => {
  // Dereferencing can leave a circular graph. The owner's body refers to itself
  // and holds no $ref, so the merge must finish instead of overflowing the stack.
  const recursiveBody = { type: "object", properties: {} };
  recursiveBody.properties.next = recursiveBody;
  const owner = userVersionSpec("v1beta3", {
    "x-supersedes": "v1beta2",
    requestBody: { content: { "application/json": { schema: recursiveBody } } },
    responses: { "201": { description: "Preferences updated (v1beta3)" } },
  });

  for (const specs of [
    [v1beta2Preferences, owner],
    [owner, v1beta2Preferences],
  ]) {
    const merged = mergeOpenapiSpecs(
      { openapi: "3.0.3", info: { title: "Meshery Cloud", version: "v0.0.0" }, tags: [], paths: {}, components: {} },
      specs,
    );
    const operation = merged.paths[PREFERENCES_PATH].put;
    assert.equal(operation["x-supersedes"], "v1beta2");
    const body = operation.requestBody.content["application/json"].schema;
    assert.equal(body.properties.next, body, "the cycle is kept");
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

test("route ownership: an owner cannot name its own version", () => {
  const selfOwned = userVersionSpec("v1beta3", {
    "x-supersedes": "v1beta3",
    responses: { "201": { description: "Preferences updated (v1beta3)" } },
  });

  for (const specs of [[selfOwned], [v1beta2Preferences, selfOwned], [selfOwned, v1beta2Preferences]]) {
    assert.throws(
      () => mergeInOrder(specs),
      /x-supersedes on \/api\/identity\/users\/preferences put names v1beta3, which is not older than v1beta3/,
    );
  }
});

test("route ownership: an owner cannot name a newer version", () => {
  // The older declaration names the newer one by mistake. Without the guard the
  // merge would keep the v1beta2 body, which lacks the v1beta3 403.
  const backwards = userVersionSpec("v1beta2", {
    "x-supersedes": "v1beta3",
    responses: { "201": { description: "Preferences updated (v1beta2)" } },
  });
  const unannotated = userVersionSpec("v1beta3", {
    responses: { "201": { description: "Preferences updated (v1beta3)" } },
  });

  for (const specs of [
    [backwards, unannotated],
    [unannotated, backwards],
  ]) {
    assert.throws(
      () => mergeInOrder(specs),
      /x-supersedes on \/api\/identity\/users\/preferences put names v1beta3, which is not older than v1beta2/,
    );
  }
});

test("route ownership: versions order by major, then stage, then number, not lexically", () => {
  const declaration = (version, supersedes) =>
    userVersionSpec(version, {
      ...(supersedes === undefined ? {} : { "x-supersedes": supersedes }),
      responses: { "201": { description: `Preferences updated (${version})` } },
    });

  for (const [owner, superseded] of [
    ["v1", "v1beta3"],
    ["v1beta2", "v1alpha9"],
    ["v1beta10", "v1beta9"],
    ["v2alpha1", "v1"],
  ]) {
    const merged = mergeInOrder([declaration(superseded), declaration(owner, superseded)]);
    assert.equal(merged.paths[PREFERENCES_PATH].put.responses["201"].description, `Preferences updated (${owner})`);
  }

  for (const [owner, superseded] of [
    ["v1beta3", "v1"],
    ["v1alpha9", "v1beta2"],
    ["v1beta9", "v1beta10"],
  ]) {
    assert.throws(
      () => mergeInOrder([declaration(superseded), declaration(owner, superseded)]),
      new RegExp(`names ${superseded}, which is not older than ${owner}`),
    );
  }
});

test("route ownership: x-supersedes must name a construct version", () => {
  const malformed = userVersionSpec("v1beta3", {
    "x-supersedes": "beta2",
    responses: { "201": { description: "Preferences updated (v1beta3)" } },
  });

  assert.throws(() => mergeInOrder([v1beta2Preferences, malformed]), /names beta2, which is not older than v1beta3/);
});

test("the real user specs merge to one updateUserPreferences, owned by v1beta3, in either order", async () => {
  const userSpec = (version) =>
    dereferenceOpenapiSpec(path.resolve(__dirname, "..", "schemas/constructs", version, "user/api.yml"));
  const specs = {
    v1beta2: await userSpec("v1beta2"),
    v1beta3: await userSpec("v1beta3"),
  };
  const route = "/api/identity/users/preferences";

  for (const order of [["v1beta2", "v1beta3"], ["v1beta3", "v1beta2"]]) {
    const merged = {
      openapi: "3.0.3",
      info: { title: "Meshery Cloud", version: "v0.0.0" },
      tags: [],
      paths: {},
      components: {},
    };
    for (const version of order) {
      mergeOpenapiSpec(merged, JSON.parse(JSON.stringify(specs[version])));
    }

    const operation = merged.paths[route].put;
    assert.equal(operation.operationId, "updateUserPreferences", `order ${order}`);
    assert.equal(operation["x-supersedes"], "v1beta2", `order ${order}`);
    assert.ok(operation.responses["403"], `order ${order}: the owned route declares 403`);
    const body = operation.requestBody.content["application/json"].schema;
    assert.ok(body.properties.agentsActWithoutApproval, `order ${order}: the owned body is the v1beta3 PreferencePayload`);
  }
});
