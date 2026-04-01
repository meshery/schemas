"use strict";

function findOperationTagIssues(doc) {
  if (!doc?.paths) {
    return [];
  }

  const issues = [];
  const declaredTags = Array.isArray(doc.tags)
    ? new Set(doc.tags.map((tag) => tag?.name).filter((name) => typeof name === "string" && name.length > 0))
    : null;

  for (const [routePath, pathItem] of Object.entries(doc.paths)) {
    for (const [method, op] of Object.entries(pathItem || {})) {
      if (!op || !["get", "post", "put", "patch", "delete"].includes(method)) {
        continue;
      }

      if (!Array.isArray(op.tags) || op.tags.length === 0) {
        issues.push({
          method,
          routePath,
          type: "missing-tags",
        });
        continue;
      }

      if (!declaredTags) {
        continue;
      }

      for (const tagName of op.tags) {
        if (typeof tagName !== "string" || tagName.length === 0 || declaredTags.has(tagName)) {
          continue;
        }

        issues.push({
          method,
          routePath,
          type: "undefined-tag",
          tagName,
        });
      }
    }
  }

  return issues;
}

module.exports = {
  findOperationTagIssues,
};
