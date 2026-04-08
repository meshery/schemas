"use strict";

const HTTP_METHODS = ["get", "put", "post", "delete", "options", "head", "patch", "trace"];

function isStandardErrorStatus(statusCode) {
  return typeof statusCode === "string" && /^[45]\d\d$/.test(statusCode);
}

function isErrorResponseSchemaRef(ref) {
  return typeof ref === "string" && /[#/]components\/schemas\/[A-Za-z0-9_]*ErrorResponse$/.test(ref);
}

function isStandardResponseRef(ref, statusCode) {
  return typeof ref === "string" && new RegExp(`[#/]components/responses/${statusCode}$`).test(ref);
}

function schemaExtendsErrorResponse(doc, schema, seen = new Set()) {
  if (!schema || typeof schema !== "object") {
    return false;
  }

  if (typeof schema.$ref === "string") {
    if (isErrorResponseSchemaRef(schema.$ref)) {
      return true;
    }

    if (!schema.$ref.startsWith("#/components/schemas/")) {
      return false;
    }

    const schemaName = schema.$ref.split("/").pop();
    if (!schemaName || seen.has(schemaName)) {
      return false;
    }

    seen.add(schemaName);
    return schemaExtendsErrorResponse(doc, doc?.components?.schemas?.[schemaName], seen);
  }

  if (Array.isArray(schema.allOf)) {
    return schema.allOf.some((subschema) => schemaExtendsErrorResponse(doc, subschema, seen));
  }

  return false;
}

function responseUsesTypedErrorSchema(doc, statusCode, response) {
  if (!response || typeof response !== "object") {
    return false;
  }

  if (isStandardResponseRef(response.$ref, statusCode)) {
    return true;
  }

  const content = response.content;
  if (!content || typeof content !== "object") {
    return false;
  }

  return Object.values(content).some((media) => schemaExtendsErrorResponse(doc, media?.schema));
}

function collectErrorResponseTypeIssues(doc) {
  const issues = [];
  if (!doc?.paths) {
    return issues;
  }

  for (const [routePath, pathItem] of Object.entries(doc.paths)) {
    for (const method of HTTP_METHODS) {
      const op = pathItem?.[method];
      if (!op?.responses) {
        continue;
      }

      for (const [statusCode, response] of Object.entries(op.responses)) {
        if (!isStandardErrorStatus(statusCode)) {
          continue;
        }

        if (responseUsesTypedErrorSchema(doc, statusCode, response)) {
          continue;
        }

        issues.push(
          `${method.toUpperCase()} ${routePath} — ${statusCode} response should reference the standard ` +
            "ErrorResponse schema directly, via a construct-specific allOf extension, or via " +
            `components/responses/${statusCode}.`,
        );
      }
    }
  }

  return issues;
}

module.exports = {
  collectErrorResponseTypeIssues,
  responseUsesTypedErrorSchema,
};
