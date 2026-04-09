const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");

const config = require("../build/lib/config");
const { dereferenceOpenapiSpec, mergeOpenapiSpec } = require("../build/bundle-openapi");

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
