// Generated from constructs/v1alpha1/component.json
// This file exports the original JSON schema

const schema = {
  "$id": "../component./definitions/json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "Components are the atomic units for designing infrastructure. Learn more at https://docs.meshery.io/concepts/components",
  "required": [
    "apiVersion",
    "kind",
    "schema",
    "model"
  ],
  "additionalProperties": false,
  "type": "object",
  "properties": {
    "apiVersion": {
      "type": "string",
      "description": "API Version of the component.",
      "x-order": 1,
      "x-oapi-codegen-extra-tags": {
        "yaml": "apiVersion",
        "json": "apiVersion"
      }
    },
    "kind": {
      "type": "string",
      "description": "Kind of the component.",
      "x-order": 2,
      "x-oapi-codegen-extra-tags": {
        "yaml": "kind",
        "json": "kind"
      }
    },
    "metadata": {
      "type": "object",
      "description": "Metadata contains additional information associated with the component.",
      "required": [
        "name",
        "version"
      ],
      "properties": {
        "description": {
          "type": "string",
          "description": "Description of the component.",
          "x-order": 1,
          "x-oapi-codegen-extra-tags": {
            "yaml": "description",
            "json": "description"
          }
        },
        "capabilities": {
          "type": "object",
          "description": "Meshery manages components in accordance with their specific capabilities. This field explicitly identifies those capabilities largely by what actions a given component supports; e.g. metric-scrape, sub-interface, and so on. This field is extensible. ComponentDefinitions made define a broad array of capabilities, which are in-turn dynamically interpretted by Meshery for full lifecycle management.",
          "x-order": 2,
          "x-oapi-codegen-extra-tags": {
            "yaml": "capabilities",
            "json": "capabilities"
          }
        },
        "name": {
          "description": "Name of the component.",
          "type": "string",
          "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
          "x-order": 3,
          "x-oapi-codegen-extra-tags": {
            "yaml": "name",
            "json": "name"
          }
        },
        "version": {
          "description": "Version of the component.",
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
        }
      },
      "x-order": 3
    },
    "model": {
      "description": "Model of the component. Learn more at https://docs.meshery.io/concepts/models",
      "$id": "https://schemas.meshery.io/model.json",
      "$schema": "http://json-schema.org/draft-07/schema#",
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
          "type": "string",
          "minLength": 5,
          "maxLength": 100,
          "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$",
          "default": "v0.0.1",
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
      },
      "x-order": 4
    },
    "displayName": {
      "description": "Display name of the component.",
      "type": "string",
      "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
      "x-order": 5,
      "x-oapi-codegen-extra-tags": {
        "yaml": "displayName",
        "json": "displayName"
      }
    },
    "format": {
      "type": "string",
      "enum": [
        "JSON",
        "CUE"
      ],
      "default": "JSON",
      "description": "Format specifies the format used in the `schema` field. JSON will be used as a default format.",
      "x-order": 6,
      "x-oapi-codegen-extra-tags": {
        "yaml": "format",
        "json": "format"
      }
    },
    "schema": {
      "type": "string",
      "description": "JSON schema of the component.",
      "x-order": 7,
      "x-oapi-codegen-extra-tags": {
        "yaml": "schema",
        "json": "schema"
      }
    }
  }
}

export default schema;
