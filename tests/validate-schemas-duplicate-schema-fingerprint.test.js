const test = require("node:test");
const assert = require("node:assert/strict");

const { fingerprintSchema } = require("../build/lib/duplicate-schema-fingerprint");

function makeBaseSchema() {
  return {
    type: "object",
    description: "Shared schema description.",
    required: ["name", "id"],
    properties: {
      name: {
        type: "string",
        description: "Display name.",
        minLength: 1,
      },
      created_at: {
        type: "string",
        format: "date-time",
        description: "Creation timestamp.",
      },
      id: {
        $ref: "../../v1alpha1/core/api.yml#/components/schemas/uuid",
        description: "Schema identifier.",
      },
    },
  };
}

test("fingerprint is stable across property and required ordering", () => {
  const schemaA = makeBaseSchema();
  const schemaB = {
    ...makeBaseSchema(),
    required: ["id", "name"],
    properties: {
      id: makeBaseSchema().properties.id,
      created_at: makeBaseSchema().properties.created_at,
      name: makeBaseSchema().properties.name,
    },
  };

  assert.equal(fingerprintSchema(schemaA), fingerprintSchema(schemaB));
});

test("fingerprint distinguishes full $ref paths", () => {
  const schemaA = makeBaseSchema();
  const schemaB = makeBaseSchema();

  schemaB.properties.id = {
    ...schemaB.properties.id,
    $ref: "../../v1beta1/core/api.yml#/components/schemas/uuid",
  };

  assert.notEqual(fingerprintSchema(schemaA), fingerprintSchema(schemaB));
});

test("fingerprint distinguishes different required fields", () => {
  const schemaA = makeBaseSchema();
  const schemaB = {
    ...makeBaseSchema(),
    required: ["id"],
  };

  assert.notEqual(fingerprintSchema(schemaA), fingerprintSchema(schemaB));
});

test("fingerprint distinguishes constraint differences", () => {
  const schemaA = makeBaseSchema();
  const schemaB = makeBaseSchema();

  schemaB.properties.name = {
    ...schemaB.properties.name,
    minLength: 5,
  };

  assert.notEqual(fingerprintSchema(schemaA), fingerprintSchema(schemaB));
});

test("fingerprint distinguishes description differences", () => {
  const schemaA = makeBaseSchema();
  const schemaB = makeBaseSchema();

  schemaB.properties.name = {
    ...schemaB.properties.name,
    description: "Canonical resource name.",
  };

  assert.notEqual(fingerprintSchema(schemaA), fingerprintSchema(schemaB));
});
