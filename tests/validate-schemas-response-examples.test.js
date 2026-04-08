const test = require("node:test");
const assert = require("node:assert/strict");

const { collectResponseExampleIssues } = require("../build/lib/response-example-validation");

test("flags 2xx responses with content that omit response examples", () => {
  const issues = collectResponseExampleIssues({
    paths: {
      "/api/workspaces": {
        get: {
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/WorkspacePage" },
                },
              },
            },
          },
        },
      },
    },
  });

  assert.deepEqual(issues, [
    "GET /api/workspaces — response 200 application/json is missing `example` or `examples`. Add a response example for documentation and mock generation.",
  ]);
});

test("accepts a single response example on a success media type", () => {
  const issues = collectResponseExampleIssues({
    paths: {
      "/api/workspaces": {
        post: {
          responses: {
            "201": {
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Workspace" },
                  example: { id: "11111111-1111-1111-1111-111111111111" },
                },
              },
            },
          },
        },
      },
    },
  });

  assert.equal(issues.length, 0);
});

test("accepts named response examples on a success media type", () => {
  const issues = collectResponseExampleIssues({
    paths: {
      "/api/workspaces": {
        put: {
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Workspace" },
                  examples: {
                    default: {
                      value: { id: "11111111-1111-1111-1111-111111111111" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  assert.equal(issues.length, 0);
});

test("exempts 204 responses even if they define content", () => {
  const issues = collectResponseExampleIssues({
    paths: {
      "/api/workspaces/{workspaceId}": {
        delete: {
          responses: {
            "204": {
              content: {
                "application/json": {
                  schema: { type: "object" },
                },
              },
            },
          },
        },
      },
    },
  });

  assert.equal(issues.length, 0);
});

test("checks each success media type independently", () => {
  const issues = collectResponseExampleIssues({
    paths: {
      "/api/workspaces/{workspaceId}": {
        get: {
          responses: {
            "200": {
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Workspace" },
                  example: { id: "11111111-1111-1111-1111-111111111111" },
                },
                "application/yaml": {
                  schema: { $ref: "#/components/schemas/Workspace" },
                },
              },
            },
          },
        },
      },
    },
  });

  assert.deepEqual(issues, [
    "GET /api/workspaces/{workspaceId} — response 200 application/yaml is missing `example` or `examples`. Add a response example for documentation and mock generation.",
  ]);
});
