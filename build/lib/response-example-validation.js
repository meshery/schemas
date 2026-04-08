"use strict";

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"];

function hasResponseExample(mediaObj) {
  if (!mediaObj || typeof mediaObj !== "object") {
    return false;
  }

  if (Object.hasOwn(mediaObj, "example")) {
    return true;
  }

  return mediaObj.examples && typeof mediaObj.examples === "object" && Object.keys(mediaObj.examples).length > 0;
}

function collectMissingResponseExampleIssues(doc) {
  if (!doc?.paths) {
    return [];
  }

  const issues = [];

  for (const [routePath, pathItem] of Object.entries(doc.paths)) {
    for (const [method, op] of Object.entries(pathItem || {})) {
      if (!op || !HTTP_METHODS.includes(method)) {
        continue;
      }

      for (const statusCode of ["200", "201"]) {
        const mediaObj = op.responses?.[statusCode]?.content?.["application/json"];
        if (!mediaObj?.schema || hasResponseExample(mediaObj)) {
          continue;
        }

        issues.push({
          method,
          routePath,
          statusCode,
          mediaType: "application/json",
        });
      }
    }
  }

  return issues;
}

module.exports = {
  collectMissingResponseExampleIssues,
  hasResponseExample,
};
