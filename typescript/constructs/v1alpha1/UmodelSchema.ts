// Generated from constructs/v1alpha1/model.json
// This file exports the original JSON schema

const schema = {
  "$id": "https://schemas.meshery.io/model.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "Meshery Models serve as a portable unit of packaging to define managed entities, their relationships, and capabilities.",
  "additionalProperties": false,
  "type": "object",
  "required": [
    "status",
    "name",
    "version",
    "category"
  ],
  "properties": {
    "name": {
      "description": "The name for the model.",
      "default": "untitled-model",
      "type": "string",
      "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
      "x-order": 1,
      "x-oapi-codegen-extra-tags": {
        "yaml": "name",
        "json": "name"
      }
    },
    "displayName": {
      "description": "The display name for the model.",
      "default": "Untitled Model",
      "type": "string",
      "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
      "x-order": 2,
      "x-oapi-codegen-extra-tags": {
        "yaml": "displayName",
        "json": "displayName"
      }
    },
    "status": {
      "type": "string",
      "description": "Status of model, e.g. Registered, Ignored, Enabled ...",
      "default": "enabled",
      "x-order": 3,
      "x-oapi-codegen-extra-tags": {
        "yaml": "status",
        "json": "status"
      }
    },
    "version": {
      "description": "Version of the model.",
      "default": "v0.0.1",
      "type": "string",
      "minLength": 2,
      "maxLength": 100,
      "pattern": "([a-z.])*(?!^/)v(alpha|beta|[0-9]+)([.-]*[a-z0-9]+)*$",
      "example": [
        "v1",
        "v1alpha1",
        "v2beta3",
        "v1.custom-suffix"
      ],
      "x-order": 4,
      "x-oapi-codegen-extra-tags": {
        "yaml": "version",
        "json": "version"
      }
    },
    "category": {
      "type": "string",
      "description": "Category of the model.",
      "default": "Uncategorized",
      "x-order": 5,
      "x-oapi-codegen-extra-tags": {
        "yaml": "category",
        "json": "category"
      }
    },
    "subCategory": {
      "type": "string",
      "description": "Sub-category of the model.",
      "default": "Uncategorized",
      "x-order": 6,
      "x-oapi-codegen-extra-tags": {
        "yaml": "subCategory",
        "json": "subCategory"
      }
    }
  }
}

export default schema;
