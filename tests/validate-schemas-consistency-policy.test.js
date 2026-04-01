const test = require("node:test");
const assert = require("node:assert/strict");

const {
  classifyContractIssue,
  classifyDesignIssue,
  classifyStyleIssue,
} = require("../build/lib/consistency-policy");

test("strict consistency makes style issues blocking for every file", () => {
  const severity = classifyStyleIssue({
    strictConsistency: true,
    strictStyleFile: false,
    includeLegacyStyleDebt: false,
  });

  assert.equal(severity, "error");
});

test("legacy style debt stays advisory outside strict consistency mode", () => {
  const severity = classifyStyleIssue({
    strictConsistency: false,
    strictStyleFile: false,
    includeLegacyStyleDebt: true,
  });

  assert.equal(severity, "warning");
});

test("strict consistency makes design advisories blocking", () => {
  const severity = classifyDesignIssue({ strictConsistency: true });

  assert.equal(severity, "error");
});

test("strict consistency makes contract debt blocking for every file", () => {
  const severity = classifyContractIssue({
    strictConsistency: true,
    strictStyleFile: false,
    includeLegacyContractDebt: false,
  });

  assert.equal(severity, "error");
});

test("legacy contract debt stays advisory outside strict consistency mode", () => {
  const severity = classifyContractIssue({
    strictConsistency: false,
    strictStyleFile: false,
    includeLegacyContractDebt: true,
  });

  assert.equal(severity, "warning");
});

test("contract issues are advisory by default with no flags", () => {
  const severity = classifyContractIssue({
    strictConsistency: false,
    strictStyleFile: false,
    includeLegacyContractDebt: false,
  });

  assert.equal(severity, "warning");
});