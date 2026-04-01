"use strict";

function classifyStyleIssue({ strictConsistency, strictStyleFile, includeLegacyStyleDebt }) {
  if (strictConsistency || strictStyleFile) {
    return "error";
  }

  if (includeLegacyStyleDebt) {
    return "warning";
  }

  return null;
}

function classifyDesignIssue({ strictConsistency }) {
  return strictConsistency ? "error" : "warning";
}

function classifyContractIssue({ strictConsistency, strictStyleFile }) {
  if (strictConsistency || strictStyleFile) {
    return "error";
  }

  return "warning";
}

module.exports = {
  classifyContractIssue,
  classifyDesignIssue,
  classifyStyleIssue,
};