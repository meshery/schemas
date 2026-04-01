const test = require("node:test");
const assert = require("node:assert/strict");

const { findNewNonLowercaseEnumValues } = require("../build/lib/enum-validation");

function makeDoc(enumValues) {
  return {
    components: {
      schemas: {
        Example: {
          type: "object",
          properties: {
            status: {
              type: "string",
              enum: enumValues,
            },
          },
        },
      },
    },
  };
}

test("preserves existing published mixed-case enum values from the baseline", () => {
  const findings = findNewNonLowercaseEnumValues(
    makeDoc(["ComponentsInDesign", "enabled"]),
    makeDoc(["ComponentsInDesign"]),
  );

  assert.deepEqual(findings, []);
});

test("flags only newly introduced non-lowercase enum values", () => {
  const findings = findNewNonLowercaseEnumValues(
    makeDoc(["ComponentsInDesign", "enabled", "NewFeatureGate"]),
    makeDoc(["ComponentsInDesign", "enabled"]),
  );

  assert.deepEqual(findings, [
    {
      path: 'Schema "Example".status',
      value: "NewFeatureGate",
      suggestedValue: "newfeaturegate",
    },
  ]);
});

test("does not flag lowercase enum additions", () => {
  const findings = findNewNonLowercaseEnumValues(
    makeDoc(["enabled", "ignored"]),
    makeDoc(["enabled"]),
  );

  assert.deepEqual(findings, []);
});

test("x-enum-casing-exempt skips all values regardless of baseline", () => {
  const doc = {
    components: {
      schemas: {
        PlanName: {
          type: "string",
          "x-enum-casing-exempt": true,
          enum: ["Free", "Team Designer", "Enterprise"],
        },
      },
    },
  };

  // null baseline — no master copy exists (new file)
  const findings = findNewNonLowercaseEnumValues(doc, null);
  assert.deepEqual(findings, []);
});

test("x-enum-casing-exempt only affects the annotated schema", () => {
  const doc = {
    components: {
      schemas: {
        Exempt: {
          type: "string",
          "x-enum-casing-exempt": true,
          enum: ["MixedCase"],
        },
        NotExempt: {
          type: "object",
          properties: {
            status: {
              type: "string",
              enum: ["AlsoMixed"],
            },
          },
        },
      },
    },
  };

  const findings = findNewNonLowercaseEnumValues(doc, null);
  assert.equal(findings.length, 1);
  assert.equal(findings[0].value, "AlsoMixed");
});