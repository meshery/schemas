const test = require("node:test");
const assert = require("node:assert/strict");

const { collectPropertyConstraintIssues } = require("../build/lib/property-constraint-validation");

test("skips description advisories for properties that use $ref with siblings", () => {
  const issues = collectPropertyConstraintIssues({
    components: {
      schemas: {
        Example: {
          type: "object",
          properties: {
            orgId: {
              $ref: "#/components/schemas/Uuid",
              nullable: true,
            },
          },
        },
      },
    },
  });

  assert.equal(issues.some((issue) => issue.includes('property "orgId" is missing a `description`')), false);
});

test("treats numeric const values as satisfying the numeric bound rule", () => {
  const issues = collectPropertyConstraintIssues({
    components: {
      schemas: {
        Example: {
          type: "object",
          properties: {
            fixedVersion: {
              type: "integer",
              const: 1,
              description: "Fixed schema version.",
            },
          },
        },
      },
    },
  });

  assert.equal(issues.some((issue) => issue.includes('property "fixedVersion"')), false);
});


test("treats string const values as satisfying the string constraint rule", () => {
  const issues = collectPropertyConstraintIssues({
    components: {
      schemas: {
        Example: {
          type: "object",
          properties: {
            fixedKind: {
              type: "string",
              const: "meshery",
              description: "Fixed kind marker.",
            },
          },
        },
      },
    },
  });

  assert.equal(issues.some((issue) => issue.includes('property "fixedKind"')), false);
});

test("recursively validates nested object, array item, combiner, and additionalProperties schemas", () => {
  const issues = collectPropertyConstraintIssues({
    components: {
      schemas: {
        Example: {
          type: "object",
          properties: {
            config: {
              type: "object",
              description: "Nested configuration.",
              properties: {
                mode: { type: "string" },
              },
            },
            entries: {
              type: "array",
              description: "Collection of entries.",
              items: {
                type: "object",
                properties: {
                  retries: { type: "integer" },
                },
              },
            },
            metadataMap: {
              type: "object",
              description: "Metadata values indexed by key.",
              additionalProperties: {
                type: "object",
                properties: {
                  externalId: { type: "string" },
                },
              },
            },
            variant: {
              description: "Variant-specific fields.",
              oneOf: [
                {
                  type: "object",
                  properties: {
                    size: { type: "integer" },
                  },
                },
              ],
            },
          },
        },
      },
    },
  });

  const issuesText = issues.join("\n");

  assert.match(issuesText, /Schema "Example\.config" — property "mode" is missing a `description`/);
  assert.match(issuesText, /Schema "Example\.config" — string property "mode" has no validation constraint/);
  assert.match(issuesText, /Schema "Example\.entries\.items" — property "retries" is missing a `description`/);
  assert.match(issuesText, /Schema "Example\.entries\.items" — integer property "retries" has no bounds/);
  assert.match(issuesText, /Schema "Example\.metadataMap\.additionalProperties" — property "externalId" is missing a `description`/);
  assert.match(issuesText, /Schema "Example\.metadataMap\.additionalProperties" — ID property "externalId" should have `format: uuid`/);
  assert.match(issuesText, /Schema "Example\.variant\.oneOf\[0\]" — property "size" is missing a `description`/);
});


test("does not treat arbitrary lowercase id suffixes as ID fields", () => {
  const issues = collectPropertyConstraintIssues({
    components: {
      schemas: {
        Example: {
          type: "object",
          properties: {
            grid: {
              type: "string",
              description: "Grid label.",
              maxLength: 100,
            },
            android: {
              type: "string",
              description: "Android package label.",
              maxLength: 100,
            },
          },
        },
      },
    },
  });

  assert.equal(issues.some((issue) => issue.includes('ID property "grid"')), false);
  assert.equal(issues.some((issue) => issue.includes('ID property "android"')), false);
});
