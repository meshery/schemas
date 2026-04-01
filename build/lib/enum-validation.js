"use strict";

function isLowercaseEnumValue(value) {
  return value === value.toLowerCase() && !/[A-Z]/.test(value);
}

function collectEnumValuesByPath(doc) {
  const enumValuesByPath = new Map();
  if (!doc?.components?.schemas) return enumValuesByPath;

  function visit(schema, path) {
    if (!schema || typeof schema !== "object") return;

    if (Array.isArray(schema.enum)) {
      enumValuesByPath.set(
        path,
        new Set(schema.enum.filter((value) => typeof value === "string")),
      );
    }

    if (schema.properties) {
      for (const [propertyName, propertyDefinition] of Object.entries(schema.properties)) {
        visit(propertyDefinition, `${path}.${propertyName}`);
      }
    }

    for (const combiner of ["allOf", "oneOf", "anyOf"]) {
      if (Array.isArray(schema[combiner])) {
        for (let index = 0; index < schema[combiner].length; index++) {
          visit(schema[combiner][index], `${path}.${combiner}[${index}]`);
        }
      }
    }

    if (schema.items) {
      visit(schema.items, `${path}.items`);
    }
  }

  for (const [schemaName, schemaDefinition] of Object.entries(doc.components.schemas)) {
    visit(schemaDefinition, `Schema "${schemaName}"`);
  }

  return enumValuesByPath;
}

function findNewNonLowercaseEnumValues(doc, baselineDoc) {
  if (!doc?.components?.schemas) return [];

  const findings = [];
  const baselineEnumValues = collectEnumValuesByPath(baselineDoc);

  function visit(schema, path) {
    if (!schema || typeof schema !== "object") return;

    // x-enum-casing-exempt: true permanently exempts all values in this
    // enum from the lowercase rule. Use for published enum values that
    // will never change (e.g. PlanName, FeatureName).
    if (Array.isArray(schema.enum) && schema["x-enum-casing-exempt"] !== true) {
      const existingValues = baselineEnumValues.get(path) ?? new Set();

      for (const value of schema.enum) {
        if (typeof value !== "string") continue;
        if (isLowercaseEnumValue(value) || existingValues.has(value)) continue;

        findings.push({
          path,
          value,
          suggestedValue: value.toLowerCase(),
        });
      }
    }

    if (schema.properties) {
      for (const [propertyName, propertyDefinition] of Object.entries(schema.properties)) {
        visit(propertyDefinition, `${path}.${propertyName}`);
      }
    }

    for (const combiner of ["allOf", "oneOf", "anyOf"]) {
      if (Array.isArray(schema[combiner])) {
        for (let index = 0; index < schema[combiner].length; index++) {
          visit(schema[combiner][index], `${path}.${combiner}[${index}]`);
        }
      }
    }

    if (schema.items) {
      visit(schema.items, `${path}.items`);
    }
  }

  for (const [schemaName, schemaDefinition] of Object.entries(doc.components.schemas)) {
    visit(schemaDefinition, `Schema "${schemaName}"`);
  }

  return findings;
}

module.exports = {
  collectEnumValuesByPath,
  findNewNonLowercaseEnumValues,
  isLowercaseEnumValue,
};