const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const yaml = require("js-yaml");

const config = require("../build/lib/config");

const REPO_ROOT = path.join(__dirname, "..");

// A $ref with no fragment to a file that is an OpenAPI document makes the
// whole document a schema. The bundler then inlines `openapi`, `info`, `paths`
// and `components` where the $ref sat, and the generated clients type the
// value as `unknown` (meshery/schemas#1304: `RegistryRelationshipsPage`
// typed `relationships` as `unknown[]`). Validator Rule 48 blocks that $ref
// in the source YAML. This file checks the output instead: the bundles the
// TypeScript generator (one per construct) and the RTK generator
// (meshery_openapi.yml and cloud_openapi.yml) read. So it also catches a
// regression in the bundler or a $ref form Rule 48 does not model.
//
// It reads a fresh bundle, never the committed generated TypeScript, which is
// regenerated only after merge. `make test-rtk` bundles before running it.

const RTK_SPECS = [config.paths.mesheryOpenapi, config.paths.cloudOpenapi];

// True for a JSON object, false for null, arrays and scalars.
function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

// An embedded OpenAPI document has a scalar `openapi` plus an `info` or
// `paths` object. A schema with a property named `openapi` does not match,
// because that property's value is a schema object, not a scalar.
function isOpenAPIDocument(node) {
  return (
    isPlainObject(node) &&
    Object.hasOwn(node, "openapi") &&
    (node.openapi === null || typeof node.openapi !== "object") &&
    (isPlainObject(node.info) || isPlainObject(node.paths))
  );
}

// Escapes a key for use as a JSON pointer token (RFC 6901).
function escapePointerToken(key) {
  return String(key).replace(/~/g, "~0").replace(/\//g, "~1");
}

// Returns the JSON pointer of every OpenAPI document nested below the root.
function findEmbeddedOpenAPIDocuments(spec) {
  const found = [];
  const seen = new Set();
  const walk = (node, pointer) => {
    if (node === null || typeof node !== "object" || seen.has(node)) {
      return;
    }
    seen.add(node);
    if (pointer !== "" && isOpenAPIDocument(node)) {
      found.push(`#${pointer}`);
      return;
    }
    for (const [key, value] of Object.entries(node)) {
      walk(value, `${pointer}/${escapePointerToken(key)}`);
    }
  };
  walk(spec, "");
  return found;
}

// Reads a bundled spec (JSON or YAML) by its repo-relative path. Fails with a
// hint when the bundle has not been built yet.
function loadBundle(relPath) {
  const absolute = path.join(REPO_ROOT, relPath);
  assert.ok(
    fs.existsSync(absolute),
    `${relPath} not found - run 'node build/bundle-openapi.js' first`,
  );
  const text = fs.readFileSync(absolute, "utf8");
  return relPath.endsWith(".json") ? JSON.parse(text) : yaml.load(text);
}

test("no bundled spec embeds an OpenAPI document inside a schema", () => {
  const bundles = [
    ...config.getSchemaPackages().map((pkg) => config.getBundledOutputPath(pkg)),
    ...RTK_SPECS,
  ];

  const problems = [];
  for (const relPath of bundles) {
    for (const pointer of findEmbeddedOpenAPIDocuments(loadBundle(relPath))) {
      problems.push(`${relPath} ${pointer}`);
    }
  }

  assert.deepEqual(
    problems,
    [],
    `A bundled spec carries a whole OpenAPI document where a schema belongs:\n  ${problems.join("\n  ")}\n\n` +
      "A $ref with no fragment pulled in a file that is an OpenAPI document. Point the $ref " +
      "at one schema inside it, for example `<file>#/components/schemas/<SchemaName>`. " +
      "See Common Mistake 35 in docs/schema-review-checklist.md.",
  );
});

// RegistryRelationshipsPage is the 200 body of these routes. Each
// `relationships` item must be the v1alpha3 RelationshipDefinition.
const REGISTRY_RELATIONSHIP_ROUTES = [
  "/api/registry/relationships",
  "/api/registry/models/{model}/relationships",
  "/api/registry/models/{model}/relationships/{name}",
];
const RELATIONSHIP_DEFINITION_REQUIRED = ["id", "schemaVersion", "version", "model", "kind", "type", "subType"];

// Returns the items schema of the `relationships` property of a
// RegistryRelationshipsPage schema, which sits in one of its allOf branches.
function relationshipItems(pageSchema) {
  for (const branch of pageSchema?.allOf ?? []) {
    const relationships = branch?.properties?.relationships;
    if (relationships) {
      return relationships.items;
    }
  }
  return undefined;
}

// Fails unless items is the RelationshipDefinition object schema: not a whole
// OpenAPI document, and every required field present and required.
function assertRelationshipDefinition(items, where) {
  assert.ok(isPlainObject(items), `${where}: relationships has no items schema`);
  assert.ok(!isOpenAPIDocument(items), `${where}: relationships items is a whole OpenAPI document`);
  assert.equal(items.type, "object", `${where}: relationships items should be an object schema`);
  for (const prop of RELATIONSHIP_DEFINITION_REQUIRED) {
    assert.ok(isPlainObject(items.properties?.[prop]), `${where}: relationships items has no "${prop}" property`);
    assert.ok(items.required?.includes(prop), `${where}: relationships items does not require "${prop}"`);
  }
}

test("RegistryRelationshipsPage items are RelationshipDefinition in the bundles the generators read", () => {
  const pkg = config.getSchemaPackages().find((p) => p.version === "v1beta1" && p.dirName === "registry");
  assert.ok(pkg, "v1beta1/registry package not found");

  const registryBundle = config.getBundledOutputPath(pkg);
  assertRelationshipDefinition(
    relationshipItems(loadBundle(registryBundle).components?.schemas?.RegistryRelationshipsPage),
    `${registryBundle} RegistryRelationshipsPage`,
  );

  const meshery = loadBundle(config.paths.mesheryOpenapi);
  for (const route of REGISTRY_RELATIONSHIP_ROUTES) {
    const schema = meshery.paths?.[route]?.get?.responses?.["200"]?.content?.["application/json"]?.schema;
    assertRelationshipDefinition(relationshipItems(schema), `${config.paths.mesheryOpenapi} GET ${route} 200`);
  }
});

// Guards the guard. If the walker stops descending, or starts matching a
// schema that only has a property named `openapi`, the tests above would pass
// or fail for the wrong reason.
test("the walker finds embedded OpenAPI documents and nothing else", () => {
  const embedded = { openapi: "3.0.0", info: { title: "Doc", version: "v1" }, paths: {}, components: {} };
  const spec = {
    openapi: "3.0.0",
    info: { title: "Root", version: "v1" },
    paths: {
      "/api/things": {
        get: {
          responses: {
            200: { content: { "application/json": { schema: { allOf: [{ type: "object" }, embedded] } } } },
          },
        },
      },
    },
    components: {
      schemas: {
        Page: { type: "object", properties: { items: { type: "array", items: { ...embedded } } } },
        Spec: {
          type: "object",
          properties: { openapi: { type: "string" }, info: { type: "object" }, paths: { type: "object" } },
        },
        Sample: { type: "object", example: { ...embedded } },
      },
    },
  };

  assert.deepEqual(findEmbeddedOpenAPIDocuments(spec), [
    "#/paths/~1api~1things/get/responses/200/content/application~1json/schema/allOf/1",
    "#/components/schemas/Page/properties/items/items",
    "#/components/schemas/Sample/example",
  ]);
});
