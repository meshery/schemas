"use strict";

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"];

function hasResponseExample(mediaObj) {
  if (!mediaObj || typeof mediaObj !== "object") return false;

  if (Object.prototype.hasOwnProperty.call(mediaObj, "example") && mediaObj.example !== undefined) {
    return true;
  }

  return !!mediaObj.examples && typeof mediaObj.examples === "object" && Object.keys(mediaObj.examples).length > 0;
}

function collectResponseExampleIssues(doc) {
  const issues = [];

  if (!doc?.paths) {
    return issues;
  }

  for (const [routePath, pathItem] of Object.entries(doc.paths)) {
    for (const method of HTTP_METHODS) {
      const op = pathItem[method];
      if (!op?.responses) continue;

      for (const [statusCode, response] of Object.entries(op.responses)) {
        if (!/^2\d\d$/.test(statusCode) || statusCode === "204") continue;

        const contentMap = response?.content;
        if (!contentMap) continue;

        for (const [mediaType, mediaObj] of Object.entries(contentMap)) {
          if (hasResponseExample(mediaObj)) continue;

          issues.push(
            `${method.toUpperCase()} ${routePath} — response ${statusCode} ${mediaType} is missing ` +
              `\`example\` or \`examples\`. Add a response example for documentation and mock generation.`,
          );
        }
      }
    }
  }

  return issues;
}

module.exports = {
  collectResponseExampleIssues,
};
