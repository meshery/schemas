// Generated from constructs/v1alpha1/capability.json
// This file exports the original JSON schema

const schema = {
  "$id": "https://schemas.meshery.io/capability.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "Meshery manages entities in accordance with their specific capabilities. This field explicitly identifies those capabilities largely by what actions a given component supports; e.g. metric-scrape, sub-interface, and so on. This field is extensible. Entities may define a broad array of capabilities, which are in-turn dynamically interpretted by Meshery for full lifecycle management.",
  "additionalProperties": false,
  "type": "object",

  "required": ["schemaVersion", "version", "displayName", "kind", "type", "entityState", "status"],
  "x-oapi-codegen-extra-tags": {
    "gorm": "type:bytes;serializer:json"
  },
  "properties": {
    "schemaVersion": {
      "$ref": "../core.json#/definitions/versionString",
      "description": "Specifies the version of the schema to which the capability definition conforms."
    },
    "version": {
      "$ref": "../core.json#/definitions/semverString",
      "description": "Version of the capability definition."
    },
    "displayName": {
      "$ref": "../core.json#/definitions/inputString",
      "description": "Name of the capability in human-readible format."
    },
    "description": {
      "type": "string",
      "description": "A written representation of the purpose and characteristics of the capability."
    },

    "kind": {
      "$ref": "../core.json#/definitions/inputString",
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
      ]
    },

    "type": {
      "$ref": "../core.json#/definitions/inputString",
      "description": "Classification of capabilities. Used to group capabilities similar in nature."
    },

    "subType": {
      "$ref": "../core.json#/definitions/inputString",
      "description": "Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Capability."
    },

    "key": {
      "$ref": "../core.json#/definitions/inputString",
      "description": "Key that backs the capability."
    },

    "entityState": {
      "description": "State of the entity in which the capability is applicable.",
      "type": "array",
      "items": {
        "$ref": "../core.json#/definitions/inputString",
        "type": "string",
        "enum": ["declaration", "instance"]
      }
    },

    "status": {
      "type": "string",
      "description": "Status of the capability",
      "default": "enabled",
      "enum": ["enabled", "disabled"]
    },

    "metadata": {
      "type": "object",
      "description": "Metadata contains additional information associated with the capability. Extension point.",
      "additionalProperties": true
    }
  }
}

export default schema;
