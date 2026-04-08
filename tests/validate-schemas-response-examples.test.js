const test = require("node:test");
const assert = require("node:assert/strict");

const { collectMissingResponseExampleIssues } = require("../build/lib/response-example-validation");

function makeDoc(responseOverrides = {}) {
  return {
    openapi: "3.0.0",
    info: { title: "Example API", version: "v1beta2" },
    paths: {
      "/api/examples": {
        get: {
          operationId: "getExamples",
          responses: {
            "200": {
              description: "Example response",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Example",
                  },
                  ...responseOverrides,
                },
              },
            },
          },
        },
      },
    },
  };
}

test("flags 200 JSON responses with schemas but no example blocks", () => {
  const issues = collectMissingResponseExampleIssues(makeDoc());

  assert.deepEqual(issues, [
    {
      method: "get",
      routePath: "/api/examples",
      statusCode: "200",
      mediaType: "application/json",
    },
  ]);
});

test("does not flag responses that define example", () => {
  const issues = collectMissingResponseExampleIssues(
    makeDoc({
      example: {
        id: "00000000-0000-0000-0000-000000000000",
      },
    }),
  );

  assert.deepEqual(issues, []);
});

test("does not flag responses that define examples", () => {
  const issues = collectMissingResponseExampleIssues(
    makeDoc({
      examples: {
        default: {
          value: {
            id: "00000000-0000-0000-0000-000000000000",
          },
        },
      },
    }),
  );

  assert.deepEqual(issues, []);
});

test("ignores non-200/201 responses and responses without JSON schemas", () => {
  const issues = collectMissingResponseExampleIssues({
    openapi: "3.0.0",
    info: { title: "Example API", version: "v1beta2" },
    paths: {
      "/api/examples": {
        post: {
          operationId: "createExample",
          responses: {
            "202": {
              description: "Accepted",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Example",
                  },
                },
              },
            },
            "201": {
              description: "Created",
            },
          },
        },
      },
    },
  });

  assert.deepEqual(issues, []);
});
