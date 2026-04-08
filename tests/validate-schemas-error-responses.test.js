const test = require("node:test");
const assert = require("node:assert/strict");

const {
  collectErrorResponseTypeIssues,
  responseUsesTypedErrorSchema,
} = require("../build/lib/error-response-validation");

test("accepts standard response component refs for typed errors", () => {
  const doc = {
    paths: {
      "/api/items": {
        post: {
          responses: {
            "400": { $ref: "#/components/responses/400" },
            "500": { $ref: "../core/api.yml#/components/responses/500" },
          },
        },
      },
    },
  };

  assert.deepEqual(collectErrorResponseTypeIssues(doc), []);
});

test("accepts inline ErrorResponse schema refs", () => {
  const doc = {
    paths: {
      "/api/items/{itemId}": {
        get: {
          responses: {
            "404": {
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        ErrorResponse: {
          type: "object",
        },
      },
    },
  };

  assert.deepEqual(collectErrorResponseTypeIssues(doc), []);
});

test("accepts construct-specific allOf extensions of ErrorResponse", () => {
  const doc = {
    paths: {
      "/api/items": {
        post: {
          responses: {
            "409": {
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ConflictResponse" },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        ConflictResponse: {
          allOf: [
            { $ref: "#/components/schemas/ErrorResponse" },
            {
              type: "object",
              properties: {
                conflictId: { type: "string" },
              },
            },
          ],
        },
        ErrorResponse: {
          type: "object",
        },
      },
    },
  };

  assert.equal(
    responseUsesTypedErrorSchema(doc, "409", doc.paths["/api/items"].post.responses["409"]),
    true,
  );
  assert.deepEqual(collectErrorResponseTypeIssues(doc), []);
});

test("flags ad-hoc 4xx/5xx responses without a typed error schema", () => {
  const doc = {
    paths: {
      "/api/items": {
        get: {
          responses: {
            "500": {
              description: "Internal server error",
              content: {
                "text/plain": {
                  schema: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
  };

  const issues = collectErrorResponseTypeIssues(doc);
  assert.equal(issues.length, 1);
  assert.match(issues[0], /500 response should reference the standard ErrorResponse schema/);
});
