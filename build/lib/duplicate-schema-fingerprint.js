"use strict";

const CONSTRAINT_KEYS = [
  "minLength",
  "maxLength",
  "pattern",
  "minimum",
  "maximum",
  "exclusiveMinimum",
  "exclusiveMaximum",
  "multipleOf",
  "minItems",
  "maxItems",
  "uniqueItems",
  "minProperties",
  "maxProperties",
];

const COMBINER_KEYS = ["allOf", "anyOf", "oneOf"];

function normalizeSchema(schema) {
  if (!schema || typeof schema !== "object") return schema;

  const normalized = {};

  if (schema.$ref !== undefined) normalized.$ref = schema.$ref;
  if (schema.type !== undefined) normalized.type = schema.type;
  if (schema.format !== undefined) normalized.format = schema.format;
  if (schema.description !== undefined) normalized.description = schema.description;
  if (schema.nullable !== undefined) normalized.nullable = schema.nullable;
  if (schema.const !== undefined) normalized.const = schema.const;
  if (schema.enum !== undefined) normalized.enum = schema.enum;

  if (Array.isArray(schema.required) && schema.required.length > 0) {
    normalized.required = [...schema.required].sort();
  }

  for (const key of CONSTRAINT_KEYS) {
    if (schema[key] !== undefined) {
      normalized[key] = schema[key];
    }
  }

  if (schema.properties && typeof schema.properties === "object") {
    normalized.properties = {};
    for (const propName of Object.keys(schema.properties).sort()) {
      normalized.properties[propName] = normalizeSchema(schema.properties[propName]);
    }
  }

  if (schema.items !== undefined) {
    normalized.items = normalizeSchema(schema.items);
  }

  if (schema.additionalProperties !== undefined) {
    normalized.additionalProperties =
      typeof schema.additionalProperties === "object"
        ? normalizeSchema(schema.additionalProperties)
        : schema.additionalProperties;
  }

  for (const key of COMBINER_KEYS) {
    if (Array.isArray(schema[key]) && schema[key].length > 0) {
      normalized[key] = schema[key].map((entry) => normalizeSchema(entry));
    }
  }

  return normalized;
}

function fingerprintSchema(schema) {
  if (!schema || typeof schema !== "object") return null;
  if (!schema.properties || typeof schema.properties !== "object") return null;

  const propKeys = Object.keys(schema.properties).sort();
  if (propKeys.length < 3) return null;

  return JSON.stringify(normalizeSchema(schema));
}

module.exports = {
  fingerprintSchema,
};
