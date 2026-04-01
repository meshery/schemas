"use strict";

const ID_PROPERTY_PATTERN = /(?:^id$|_id$|Id$|ID$)/;
const PAGE_SIZE_NAMES = new Set(["page_size", "pagesize", "pageSize"]);
const COMBINERS = ["allOf", "oneOf", "anyOf"];

function formatContext(scope) {
  return scope ? `Schema "${scope}" — ` : "";
}

function validatePropertyDescriptions(issues, properties, scope) {
  if (!properties || typeof properties !== "object") return;

  for (const [propName, propDef] of Object.entries(properties)) {
    if (!propDef || typeof propDef !== "object") continue;

    // Skip any $ref property — descriptions are inherited from the referenced schema.
    if (propDef.$ref) continue;

    if (!propDef.description) {
      issues.push(`${formatContext(scope)}property "${propName}" is missing a \`description\`.`);
    }
  }
}

function validateStringConstraints(issues, properties, scope) {
  if (!properties || typeof properties !== "object") return;

  for (const [propName, propDef] of Object.entries(properties)) {
    if (!propDef || typeof propDef !== "object") continue;
    if (propDef.type !== "string") continue;
    if (propDef.$ref || propDef.enum || propDef.const !== undefined) continue;

    const hasConstraint =
      propDef.minLength !== undefined ||
      propDef.maxLength !== undefined ||
      propDef.pattern !== undefined ||
      propDef.format !== undefined;

    if (!hasConstraint) {
      issues.push(
        `${formatContext(scope)}string property "${propName}" has no validation constraint (minLength, maxLength, pattern, or format). ` +
          `Add at least one to prevent unbounded input.`,
      );
    }
  }
}

function validateNumericBounds(issues, properties, scope) {
  if (!properties || typeof properties !== "object") return;

  for (const [propName, propDef] of Object.entries(properties)) {
    if (!propDef || typeof propDef !== "object") continue;
    if (propDef.type !== "integer" && propDef.type !== "number") continue;

    const hasBound =
      propDef.minimum !== undefined ||
      propDef.maximum !== undefined ||
      propDef.exclusiveMinimum !== undefined ||
      propDef.exclusiveMaximum !== undefined ||
      propDef.enum !== undefined ||
      propDef.const !== undefined;

    if (!hasBound) {
      issues.push(
        `${formatContext(scope)}${propDef.type} property "${propName}" has no bounds (minimum/maximum). ` +
          `Add at least one to prevent unbounded values.`,
      );
    }
  }
}

function validateIdFormat(issues, properties, scope) {
  if (!properties || typeof properties !== "object") return;

  for (const [propName, propDef] of Object.entries(properties)) {
    if (!propDef || typeof propDef !== "object") continue;
    if (!ID_PROPERTY_PATTERN.test(propName)) continue;
    if (propDef.type && propDef.type !== "string") continue;
    if (propDef.$ref) continue;
    if (propDef.format === "uuid") continue;
    if (propDef["x-id-format"] === "external") continue;
    if (
      propDef.allOf?.some((entry) => entry.$ref) ||
      propDef.anyOf?.some((entry) => entry.$ref) ||
      propDef.oneOf?.some((entry) => entry.$ref)
    ) continue;

    issues.push(
      `${formatContext(scope)}ID property "${propName}" should have \`format: uuid\`, use a \`$ref\` to a UUID schema, ` +
        `or add \`x-id-format: external\` if this is an external system identifier.`,
    );
  }
}

function validatePageSizeMinimum(issues, properties, scope) {
  if (!properties || typeof properties !== "object") return;

  for (const [propName, propDef] of Object.entries(properties)) {
    if (!propDef || typeof propDef !== "object") continue;
    if (!PAGE_SIZE_NAMES.has(propName)) continue;
    if (propDef.type !== "integer" && propDef.type !== "number") continue;

    if (propDef.minimum === undefined || propDef.minimum < 1) {
      issues.push(
        `${formatContext(scope)}page-size property "${propName}" must have \`minimum: 1\`. ` +
          `A page size of 0 is invalid for pagination.`,
      );
    }
  }
}

function nextScope(scope, suffix) {
  return scope ? `${scope}.${suffix}` : suffix;
}

function walkPropertyConstraintTree(schema, scope, issues) {
  if (!schema || typeof schema !== "object") return;

  if (schema.properties && typeof schema.properties === "object") {
    validatePropertyDescriptions(issues, schema.properties, scope);
    validateStringConstraints(issues, schema.properties, scope);
    validateNumericBounds(issues, schema.properties, scope);
    validateIdFormat(issues, schema.properties, scope);
    validatePageSizeMinimum(issues, schema.properties, scope);

    for (const [propName, propDef] of Object.entries(schema.properties)) {
      walkPropertyConstraintTree(propDef, nextScope(scope, propName), issues);
    }
  }

  for (const combiner of COMBINERS) {
    if (Array.isArray(schema[combiner])) {
      schema[combiner].forEach((subSchema, index) => {
        walkPropertyConstraintTree(subSchema, nextScope(scope, `${combiner}[${index}]`), issues);
      });
    }
  }

  if (schema.items) {
    walkPropertyConstraintTree(schema.items, nextScope(scope, "items"), issues);
  }

  if (schema.additionalProperties && typeof schema.additionalProperties === "object") {
    walkPropertyConstraintTree(schema.additionalProperties, nextScope(scope, "additionalProperties"), issues);
  }
}

function collectPropertyConstraintIssues(doc) {
  const issues = [];

  if (doc && typeof doc === "object" && (doc.properties || doc.items || doc.additionalProperties || doc.allOf || doc.oneOf || doc.anyOf)) {
    walkPropertyConstraintTree(doc, null, issues);
  }

  if (doc?.components?.schemas) {
    for (const [schemaName, schemaDef] of Object.entries(doc.components.schemas)) {
      walkPropertyConstraintTree(schemaDef, schemaName, issues);
    }
  }

  return issues;
}

module.exports = {
  collectPropertyConstraintIssues,
};
