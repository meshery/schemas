const test = require("node:test");
const assert = require("node:assert/strict");

const { findOperationTagIssues } = require("../build/lib/operation-tags");

function makeDoc(overrides = {}) {
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
            },
          },
        },
      },
    },
    ...overrides,
  };
}

test("Rule 36 flags operations with no tags", () => {
  const issues = findOperationTagIssues(makeDoc());

  assert.deepEqual(issues, [
    {
      method: "get",
      routePath: "/api/examples",
      type: "missing-tags",
    },
  ]);
});

test("Rule 36 flags operation tags not declared at the document root", () => {
  const issues = findOperationTagIssues(
    makeDoc({
      tags: [{ name: "Existing" }],
      paths: {
        "/api/examples": {
          get: {
            operationId: "getExamples",
            tags: ["Missing"],
            responses: {
              "200": {
                description: "Example response",
              },
            },
          },
        },
      },
    }),
  );

  assert.deepEqual(issues, [
    {
      method: "get",
      routePath: "/api/examples",
      type: "undefined-tag",
      tagName: "Missing",
    },
  ]);
});

test("Rule 36 does not flag undeclared tags when root tags are omitted", () => {
  const issues = findOperationTagIssues(
    makeDoc({
      paths: {
        "/api/examples": {
          get: {
            operationId: "getExamples",
            tags: ["Missing"],
            responses: {
              "200": {
                description: "Example response",
              },
            },
          },
        },
      },
    }),
  );

  assert.deepEqual(issues, []);
});

test("Rule 36 ignores non-operation keys on path items", () => {
  const issues = findOperationTagIssues(
    makeDoc({
      paths: {
        "/api/examples": {
          parameters: [{ name: "page", in: "query", schema: { type: "integer" } }],
          get: {
            operationId: "getExamples",
            tags: ["Examples"],
            responses: {
              "200": {
                description: "Example response",
              },
            },
          },
        },
      },
      tags: [{ name: "Examples" }],
    }),
  );

  assert.deepEqual(issues, []);
});
