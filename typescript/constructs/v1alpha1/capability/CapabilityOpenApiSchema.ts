/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const schema = {
  "openapi": "3.0.0",
  "info": {
    "title": "Model API",
    "version": "1.0.0"
  },
  "paths": {},
  "components": {
    "schemas": {
      "Capability": {
        "$id": "https://schemas.meshery.io/capability.json",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "description": "Meshery manages entities in accordance with their specific capabilities. This field explicitly identifies those capabilities largely by what actions a given component supports; e.g. metric-scrape, sub-interface, and so on. This field is extensible. Entities may define a broad array of capabilities, which are in-turn dynamically interpretted by Meshery for full lifecycle management.",
        "additionalProperties": false,
        "type": "object",
        "required": [
          "description",
          "schemaVersion",
          "version",
          "displayName",
          "kind",
          "type",
          "subType",
          "entityState",
          "key",
          "status"
        ],
        "x-oapi-codegen-extra-tags": {
          "gorm": "type:bytes;serializer:json"
        },
        "properties": {
          "schemaVersion": {
            "description": "Specifies the version of the schema to which the capability definition conforms.",
            "type": "string",
            "minLength": 2,
            "maxLength": 100,
            "pattern": "^(([a-z.])+/?)*v(alpha|beta|[0-9]+)([.-]*[a-z0-9]+)*$",
            "example": [
              "v1",
              "v1alpha1",
              "v2beta3",
              "v1.custom-suffix"
            ]
          },
          "version": {
            "description": "Version of the capability definition.",
            "type": "string",
            "minLength": 5,
            "maxLength": 100,
            "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$",
            "default": "v0.0.1"
          },
          "displayName": {
            "description": "Name of the capability in human-readible format.",
            "type": "string",
            "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
          },
          "description": {
            "type": "string",
            "description": "A written representation of the purpose and characteristics of the capability."
          },
          "kind": {
            "description": "Top-level categorization of the capability",
            "additionalProperties": false,
            "anyOf": [
              {
                "const": "action",
                "description": "For capabilities related to executing actions on entities. Example: initiate log streaming on a Pod. Example: initiate deployment of a component."
              },
              {
                "const": "mutate",
                "description": "For capabilities related to mutating an entity. Example: the ability to change the configuration of a component."
              },
              {
                "const": "view",
                "description": "For capabilities related to viewing an entity. Example: the ability to view a components configuration."
              },
              {
                "const": "interaction",
                "description": "Catch all for capabilities related to interaction with entities. Example: the ability for a component to be dragged and dropped. Example: supports event bubbling to parent components. "
              }
            ],
            "type": "string",
            "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
          },
          "type": {
            "description": "Classification of capabilities. Used to group capabilities similar in nature.",
            "type": "string",
            "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
          },
          "subType": {
            "description": "Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Capability.",
            "type": "string",
            "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
          },
          "key": {
            "description": "Key that backs the capability.",
            "type": "string",
            "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
          },
          "entityState": {
            "description": "State of the entity in which the capability is applicable.",
            "type": "array",
            "items": {
              "type": "string",
              "enum": [
                "declaration",
                "instance"
              ],
              "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
              "description": "A string starting with an alphanumeric character. Spaces and hyphens allowed."
            }
          },
          "status": {
            "type": "string",
            "description": "Status of the capability",
            "default": "enabled",
            "enum": [
              "enabled",
              "disabled"
            ]
          },
          "metadata": {
            "type": "object",
            "description": "Metadata contains additional information associated with the capability. Extension point.",
            "additionalProperties": true
          }
        }
      }
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
};

export default schema;
