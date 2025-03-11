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
      "description": "API Version of the component."
    },
    "kind": {
      "type": "string",
      "description": "Kind of the component."
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
          "description": "Description of the component."
        },
        "capabilities": {
          "type": "object",
          "description": "Meshery manages components in accordance with their specific capabilities. This field explicitly identifies those capabilities largely by what actions a given component supports; e.g. metric-scrape, sub-interface, and so on. This field is extensible. ComponentDefinitions made define a broad array of capabilities, which are in-turn dynamically interpretted by Meshery for full lifecycle management."
        },
        "name": {
          "$ref": "../core.json#/definitions/inputString",
          "description": "Name of the component."
        },
        "version": {
          "$ref": "../core.json#/definitions/versionString",
          "description": "Version of the component."
        }
      }
    },
    "model": {
      "$ref": "./model.json#",
      "description": "Model of the component. Learn more at https://docs.meshery.io/concepts/models"
    },
    "displayName": {
      "$ref": "../core.json#/definitions/inputString",
      "description": "Display name of the component."
    },
    "format": {
      "type": "string",
      "enum": [
        "JSON",
        "CUE"
      ],
      "default": "JSON",
      "description": "Format specifies the format used in the `schema` field. JSON will be used as a default format."
    },
    "schema": {
      "type": "string",
      "description": "JSON schema of the component."
    }
  }
}

export default schema;
