// Generated from constructs/v1alpha1/relationship.json
// This file exports the original JSON schema

const schema = {
  "$id": "https://schemas.meshery.io/relationship.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "`Relationships` define the genealogy between one or more interconnected `Components`. Just as in familial relationships, Meshery `Relationships` are represented in a variety of forms very much resembling familiar ancestral lineage, including `hierarchical` relationships such as direct parent and child relationships as well as any number of layers of indirect grandparent and grandchild relationships and branch relationships (e.g. aunt, uncle,..). Peer relationships like that of `sibling`s take on different types such as `network` and `dependency`.  Each type of `Relationship` has a `subtype`, `metadata`, `selectors` and some optional parameters.",
  "required": [
    "apiVersion",
    "kind",
    "subType",
    "model"
  ],
  "additionalProperties": false,
  "type": "object",
  "properties": {
    "apiVersion": {
      "type": "string",
      "description": "API Version of the Relationship."
    },
    "kind": {
      "type": "string",
      "description": "Kind of the Relationship."
    },
    "metadata": {
      "type": "object",
      "description": "Metadata contains additional information associated with the Relationship.",
      "properties": {
        "description": {
          "type": "string",
          "description": "Description of the Relationship."
        }
      }
    },
    "model": {
      "$ref": "./model.json",
      "description": "Model of the Relationship."
    },
    "subType": {
      "type": "string",
      "description": "Used for further classification of Relationships. Type and SubType together identifies a Relationship."
    },
    "selectors": {
      "type": "array",
      "description": "Selectors are organized as an array, with each item containing a distinct set of selectors that share a common functionality. This structure allows for flexibility in defining relationships, even when different components are involved.",
      "items": {
        "type": "object",
        "description": "Optional selectors used to match Components. Absence of a selector means that it is applied to all Components.",
        "additionalProperties": false,
        "properties": {
          "deny": {
            "type": "object",
            "description": "Optional selectors used to define relationships which should not be created / is restricted.",
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
            "description": "Selectors used to define relationships which are allowed",
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
