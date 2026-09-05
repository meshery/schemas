const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const yaml = require("js-yaml");

const REPO_ROOT = path.join(__dirname, "..");
const BUNDLED_SPECS = ["_openapi_build/meshery_openapi.yml", "_openapi_build/cloud_openapi.yml"];

// `readOnly: true` is the natural OpenAPI annotation for a server-owned
// property, and on a schema that is only ever a response it is harmless. On a
// schema that is ALSO reachable from a requestBody it silently corrupts the
// generated RTK client.
//
// The RTK generator is @rtk-query/codegen-openapi, which builds request types
// through oazapfts. Two pieces of oazapfts combine badly:
//
//   - checkSchemaOnlyMode() propagates readOnly UP the containment tree. A
//     schema counts as readOnly if ANY property nested anywhere beneath it is
//     readOnly. It stops at $ref boundaries, so only INLINED subschemas
//     propagate - and the bundler inlines aggressively.
//   - getTypeFromProperties(), generating a request type, keeps a property only
//     when it is writeOnly or not readOnly. A property whose subtree contains
//     one readOnly field is therefore dropped from the request type entirely.
//
// The result is that adding `readOnly: true` to one leaf property deletes an
// entire, unrelated, possibly required field from a published client - with no
// build failure, no validation failure, and a diff that reads as an unrelated
// regeneration. It cost one such property being added to Environment to delete
// the whole `connection` field from registerRegistryComponent and
// registerRegistryRelationship.
//
// Nothing in the repo relies on readOnly inside a request body today, so this
// test pins that at zero rather than trying to enumerate the damage.
//
// If you need to mark a property server-owned, keep it out of the `*Payload`
// schema instead. That is the stronger mechanism anyway: the generated clients
// get no field at all, rather than a field a non-validating client can still
// send. See docs/schema-authoring-reference.md#server-owned-properties.
function findReadOnlyReachableFromRequestBodies(spec) {
  const found = [];

  const walk = (node, trail, depth) => {
    if (node == null || depth > 100) return;
    if (Array.isArray(node)) {
      node.forEach((item, index) => walk(item, `${trail}/${index}`, depth + 1));
      return;
    }
    if (typeof node !== "object") return;
    if (node.readOnly === true) found.push(trail);
    for (const key of Object.keys(node)) {
      walk(node[key], `${trail}/${key}`, depth + 1);
    }
  };

  for (const [route, item] of Object.entries(spec.paths || {})) {
    for (const [method, operation] of Object.entries(item || {})) {
      if (!operation || typeof operation !== "object" || !operation.requestBody) continue;
      walk(operation.requestBody, `${method.toUpperCase()} ${route} requestBody`, 0);
    }
  }

  return found;
}

for (const specPath of BUNDLED_SPECS) {
  test(`no readOnly property is reachable from a requestBody in ${specPath}`, () => {
    const absolute = path.join(REPO_ROOT, specPath);
    assert.ok(
      fs.existsSync(absolute),
      `${specPath} not found - run 'node build/bundle-openapi.js' first`,
    );

    const spec = yaml.load(fs.readFileSync(absolute, "utf8"));
    const found = findReadOnlyReachableFromRequestBodies(spec);

    assert.deepEqual(
      found,
      [],
      `readOnly is set on a schema reachable from a requestBody:\n  ${found.join("\n  ")}\n\n` +
        "The RTK generator drops every property whose inlined subtree contains a " +
        "readOnly field, so this silently deletes an unrelated - possibly required - " +
        "field from the published client. Mark the property server-owned by keeping " +
        "it out of the *Payload schema instead. See " +
        "docs/schema-authoring-reference.md#server-owned-properties.",
    );
  });
}

// Guards the guard. If the walker ever stops descending - a refactor that only
// looks one level into `content`, say - the assertion above would pass on any
// input and this whole file would be inert.
test("the walker finds readOnly nested behind content, schema, properties and arrays", () => {
  const spec = {
    paths: {
      "/api/things": {
        post: {
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    items: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          serverOwned: { type: "string", readOnly: true },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        get: { responses: { 200: { content: { "application/json": { schema: { readOnly: true } } } } } },
      },
    },
  };

  const found = findReadOnlyReachableFromRequestBodies(spec);
  assert.equal(found.length, 1, "expected exactly the request-body hit, got: " + JSON.stringify(found));
  assert.match(found[0], /POST \/api\/things requestBody/);
  // The GET response also carries readOnly and must NOT be reported - readOnly
  // on a response-only schema is correct and common.
  assert.ok(!found.some((hit) => hit.startsWith("GET ")));
});
