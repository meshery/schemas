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
      "$ref": "../core.json#/definitions/inputString",
      "description": "The name for the model."
    },
    "displayName": {
      "$ref": "../core.json#/definitions/inputString",
      "description": "The display name for the model."
    },
    "status": {
      "type": "string",
      "description": "Status of model, e.g. Registered, Ignored, Enabled ..."
    },
    "version": {
      "$ref": "../core.json#/definitions/versionString",
      "description": "Version of the model."
    },
    "category": {
      "type": "string",
      "description": "Category of the model."
    },
    "subCategory": {
      "type": "string",
      "description": "Sub-category of the model."
    }
  }
}

export default schema;
