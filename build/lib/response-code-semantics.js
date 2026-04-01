"use strict";

const CREATE_PREFIXES = ["create", "add", "register"];

const ACTION_SUFFIXES = new RegExp(
  "\\/(accept|reject|approve|deny|revoke|verify|start|stop|cancel|upgrade|upgradePreview|webhooks|submit|withdraw)$",
);

function detectPostCreate(postOp, routePath) {
  if (!postOp?.responses) {
    return { isCreate: false, detector: null };
  }

  if (routePath.endsWith("/delete") || ACTION_SUFFIXES.test(routePath)) {
    return { isCreate: false, detector: null };
  }

  if (postOp.operationId) {
    const opId = postOp.operationId.toLowerCase();
    if (CREATE_PREFIXES.some((prefix) => opId.startsWith(prefix))) {
      return { isCreate: true, detector: `operationId "${postOp.operationId}"` };
    }
  }

  for (const [, response] of Object.entries(postOp.responses)) {
    if (
      typeof response?.description === "string" &&
      /\b(created|new)\b/i.test(response.description)
    ) {
      return { isCreate: true, detector: `response description "${response.description}"` };
    }
  }

  const content = postOp.requestBody?.content;
  if (content) {
    for (const [, mediaObj] of Object.entries(content)) {
      const ref = mediaObj?.schema?.$ref;
      if (typeof ref === "string") {
        const schemaName = ref.split("/").pop();
        if (/^Create[A-Z]/.test(schemaName)) {
          return { isCreate: true, detector: `requestBody schema "${schemaName}"` };
        }
      }
    }
  }

  return { isCreate: false, detector: null };
}

function isSingleResourceDelete(routePath) {
  return /\{[^}]+\}$/.test(routePath);
}

module.exports = {
  detectPostCreate,
  isSingleResourceDelete,
};
