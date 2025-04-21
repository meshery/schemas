// Generated from constructs/v1alpha1/capability/capability.json
// This file exports the original JSON schema

const schema = {
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
      "pattern": "([a-z.])*(?!^/)v(alpha|beta|[0-9]+)([.-]*[a-z0-9]+)*$",
      "example": [
        "v1",
        "v1alpha1",
        "v2beta3",
        "v1.custom-suffix"
      ],
      "x-order": 1,
      "x-oapi-codegen-extra-tags": {
        "yaml": "schemaVersion",
        "json": "schemaVersion"
      }
    },
    "version": {
      "description": "Version of the capability definition.",
      "type": "string",
      "minLength": 5,
      "maxLength": 100,
      "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$",
      "default": "v0.0.1",
      "x-order": 2,
      "x-oapi-codegen-extra-tags": {
        "yaml": "version",
        "json": "version"
      }
    },
    "displayName": {
      "description": "Name of the capability in human-readible format.",
      "type": "string",
      "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
      "x-order": 3,
      "x-oapi-codegen-extra-tags": {
        "yaml": "displayName",
        "json": "displayName"
      }
    },
    "description": {
      "type": "string",
      "description": "A written representation of the purpose and characteristics of the capability.",
      "x-order": 4,
      "x-oapi-codegen-extra-tags": {
        "yaml": "description",
        "json": "description"
      }
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
      "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
      "x-order": 5,
      "x-oapi-codegen-extra-tags": {
        "yaml": "kind",
        "json": "kind"
      }
    },
    "type": {
      "description": "Classification of capabilities. Used to group capabilities similar in nature.",
      "type": "string",
      "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
      "x-order": 6,
      "x-oapi-codegen-extra-tags": {
        "yaml": "type",
        "json": "type"
      }
    },
    "subType": {
      "description": "Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Capability.",
      "type": "string",
      "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
      "x-order": 7,
      "x-oapi-codegen-extra-tags": {
        "yaml": "subType",
        "json": "subType"
      }
    },
    "key": {
      "description": "Key that backs the capability.",
      "type": "string",
      "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
      "x-order": 8,
      "x-oapi-codegen-extra-tags": {
        "yaml": "key",
        "json": "key"
      }
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
        "description": "A string starting with an alphanumeric character. Spaces and hyphens allowed.",
        "x-oapi-codegen-extra-tags": {
          "yaml": "entityState",
          "json": "entityState"
        }
      },
      "x-order": 9
    },
    "status": {
      "type": "string",
      "description": "Status of the capability",
      "default": "enabled",
      "enum": [
        "enabled",
        "disabled"
      ],
      "x-order": 10,
      "x-oapi-codegen-extra-tags": {
        "yaml": "status",
        "json": "status"
      }
    },
    "metadata": {
      "type": "object",
      "description": "Metadata contains additional information associated with the capability. Extension point.",
      "additionalProperties": true,
      "x-order": 11,
      "x-oapi-codegen-extra-tags": {
        "yaml": "metadata",
        "json": "metadata"
      }
    }
  },
  "default": [
    {
      "description": "Configure the visual styles for the component",
      "displayName": "Styling",
      "entityState": [
        "declaration"
      ],
      "key": "",
      "kind": "mutate",
      "schemaVersion": "capability.meshery.io/v1alpha1",
      "status": "enabled",
      "subType": "",
      "type": "style",
      "version": "0.7.0"
    },
    {
      "description": "Change the shape of the component",
      "displayName": "Change Shape",
      "entityState": [
        "declaration"
      ],
      "key": "",
      "kind": "mutate",
      "schemaVersion": "capability.meshery.io/v1alpha1",
      "status": "enabled",
      "subType": "shape",
      "type": "style",
      "version": "0.7.0"
    },
    {
      "description": "Drag and Drop a component into a parent component in graph view",
      "displayName": "Compound Drag And Drop",
      "entityState": [
        "declaration"
      ],
      "key": "",
      "kind": "interaction",
      "schemaVersion": "capability.meshery.io/v1alpha1",
      "status": "enabled",
      "subType": "compoundDnd",
      "type": "graph",
      "version": "0.7.0"
    },
    {
      "description": "Add text to nodes body",
      "displayName": "Body Text",
      "entityState": [
        "declaration"
      ],
      "key": "",
      "kind": "mutate",
      "schemaVersion": "capability.meshery.io/v1alpha1",
      "status": "enabled",
      "subType": "body-text",
      "type": "style",
      "version": "0.7.0"
    }
  ]
}

export default schema;
