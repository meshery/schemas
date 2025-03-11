// Generated from constructs/v1alpha2/relationship.json
// This file exports the original JSON schema

const schema = {
  "$id": "https://schemas.meshery.io/relationship.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "Relationships define the nature of interaction between interconnected components in Meshery. The combination of relationship properties kind, type, and subtype characterize various genealogical relations among and between components. Relationships have selectors, selector sets, metadata, and optional parameters. Learn more at https://docs.meshery.io/concepts/logical/relationships.",
  "required": [
    "schemaVersion",
    "version",
    "kind",
    "type",
    "subType",
    "model",
    "evaluationQuery"
  ],
  "additionalProperties": false,
  "type": "object",
  "properties": {
    "schemaVersion": {
      "$ref": "../core.json#/definitions/versionString",
      "description": "Specifies the version of the schema used for the definition."
    },
    "version": {
      "$ref": "../core.json#/definitions/semverString",
      "description": "Specifies the version of the definition."
    },
    "kind": {
      "$ref": "../core.json#/definitions/inputString",
      "description": "Kind of the Relationship.",
      "enum": [
        "hierarchical",
        "edge",
        "sibling"
      ]
    },
    "type": {
      "$ref": "../core.json#/definitions/inputString",
      "description": "Classification of relationships. Used to group relationships similar in nature."
    },
    "subType": {
      "$ref": "../core.json#/definitions/inputString",
      "description": "Used for further classification of Relationships. Type and SubType together identifies a Relationship."
    },
    "evaluationQuery": {
      "$ref": "../core.json#/definitions/inputString",
      "description": "Determines the policy rule to be used for the evaluation of the relationship."
    },
    "metadata": {
      "type": "object",
      "description": "Metadata contains additional information associated with the Relationship.",
      "properties": {
        "description": {
          "$ref": "../core.json#/definitions/inputString",
          "description": "Description of the Relationship."
        }
      }
    },
    "model": {
      "$ref": "../v1beta1/model.json",
      "description": "Model of the Relationship."
    },
    "selectors": {
      "type": "array",
      "description": "Selectors are organized as an array, with each item containing a distinct set of selectors that share a common functionality. This structure allows for flexibility in defining relationships, even when different components are involved.",
      "$comment": "Sets of selectors are interpreted as a locical OR, while sets of allow/deny are interpreted a logical AND.",
      "items": {
        "type": "object",
        "description": "Optional selectors used to match Components. Absence of a selector means that it is applied to all Components.",
        "additionalProperties": false,
        "required": [
          "alllow"
        ],
        "properties": {
          "deny": {
            "type": "object",
            "description": "Optional selectors used to define relationships which should not be created / is restricted.",
            "required": [
              "to",
              "from"
            ],
            "properties": {
              "from": {
                "$ref": "./selectors.json#/from"
              },
              "to": {
                "$ref": "./selectors.json#/to"
              }
            }
          },
          "allow": {
            "type": "object",
            "description": "Selectors used to define relationships which are allowed.",
            "required": [
              "to",
              "from"
            ],
            "properties": {
              "from": {
                "$ref": "./selectors.json#/from"
              },
              "to": {
                "$ref": "./selectors.json#/to"
              }
            }
          }
        }
      }
    }
  }
}

export default schema;
