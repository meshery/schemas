// Generated from constructs/v1alpha3/selectors.json
// This file exports the original JSON schema

const schema = {
  "$id": "https://schemas.meshery.io/selectors.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "Reusable relationships selectors schema elements",
  "$comment": "Sets of selectors are interpreted as a logical OR, while sets of allow/deny are interpreted a logical AND.",
  "definitions": {
    "matchSelector": {
      "$comment": "Type is array so that mutliple bindings can be supported between 2 nodes",
      "type": "array",
      "items": {
        "type": "object",
        "allOf": [
          {
            "properties": {
              "kind": {
                "type": "string"
              },
              "id": {
                "$ref": "../core.json#/definitions/uuid"
              }
            }
          },
          {
            "oneOf": [
              {
                "properties": {
                  "mutatorRef": {
                    "type": "array",
                    "items": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      },
                      "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                    },
                    "description": "JSON ref to value from where patch should be applied."
                  }
                }
              },
              {
                "properties": {
                  "mutatedRef": {
                    "type": "array",
                    "items": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      },
                      "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                    }
                  }
                }
              }
            ]
          }
        ]
      }
    },
    "selector": {
      "description": "Describes the component(s) which are involved in the relationship along with a set of actions to perform upon selection match.",
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "kind": {
            "type": "string"
          },
          "model": {
            "$ref": "../v1beta1/model.json",
            "description": "Name of the model implicated by this selector. Learn more at https://docs.meshery.io/concepts/models"
          },
          "id": {
            "$ref": "../core.json#/definitions/uuid"
          },
          "match": {
            "type": "object",
            "additionalProperties": false,
            "oneOf": [
              {
                "properties": {
                  "refs": {
                    "type": "array",
                    "items": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    }
                  }
                }
              },
              {
                "properties": {
                  "from": {
                    "$ref": "#/definitions/matchSelector"
                  },
                  "to": {
                    "$ref": "#/definitions/matchSelector"
                  }
                }
              }
            ]
          },
          "patch": {
            "allOf": [
              {
                "properties": {
                  "patchStrategy": {
                    "description": "patchStrategy allows you to make specific changes to a resource using a standard JSON Patch format (RFC 6902). \n\nadd: Inserts a value into an array or adds a member to an object.\nreplace: Replaces a value.\nmerge: Combines the values of the target location with the values from the patch. If the target location doesn't exist, it is created.\nstrategic:specific to Kubernetes and understands the structure of Kubernetes objects. It can handle complex changes like updating lists and maps, as well as preserving default values. However, it's not supported for custom resources. For custom resources, only JSON Patch and Merge Patch are typically supported.\nremove: Removes a value.\ncopy: Copies a value from one location to another.\nmove: Moves a value from one location to another.\ntest: Tests that a value at the target location is equal to a specified value.",
                    "$comment": "Array Indexing: When working with arrays, be aware that Kubernetes uses zero-based indexing in JSON patch paths.\nMerge Patch vs. JSON Patch: Merge patches are less flexible than JSON patches and do not support all the same operations.\nStrategic Merge Patch: For some Kubernetes resources, you can also use the strategic type for a strategic merge patch, which understands the structure of Kubernetes objects and can handle complex operations.",
                    "type": "string",
                    "enum": [
                      "merge",
                      "strategic",
                      "add",
                      "remove",
                      "copy",
                      "move",
                      "test"
                    ],
                    "default": "copy"
                  }
                }
              },
              {
                "oneOf": [
                  {
                    "properties": {
                      "mutatorRef": {
                        "type": "array",
                        "items": {
                          "type": "array",
                          "items": {
                            "type": "string"
                          },
                          "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                        },
                        "description": "JSON ref to value from where patch should be applied."
                      }
                    }
                  },
                  {
                    "properties": {
                      "mutatedRef": {
                        "type": "array",
                        "items": {
                          "type": "array",
                          "items": {
                            "type": "string"
                          },
                          "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                        }
                      }
                    }
                  }
                ]
              }
            ]
          }
        },
        "description": "Optional fields that are a part of the `from` selector. Absence of a field has an implied * meaning."
      }
    },
    "selectors": {
      "type": "array",
      "description": "Selectors are organized as an array, with each item containing a distinct set of selectors that share a common functionality. This structure allows for flexibility in defining relationships, even when different components are involved.",
      "$comment": "Sets of selectors are interpreted as a logical UNION. Properties within a selector `allow` and `deny` are interpreted as logical AND, while 'from' and 'to' represents a UNION of set of combinatorial pairs.",
      "items": {
        "type": "object",
        "description": "Optional selectors used to match Components. Absence of a selector means that it is applied to all Components.",
        "additionalProperties": false,
        "required": [
          "allow"
        ],
        "properties": {
          "deny": {
            "description": "Optional selectors used to define relationships which should not be created / is restricted.",
            "type": "object",
            "required": [
              "to",
              "from"
            ],
            "properties": {
              "from": {
                "$ref": "#/definitions/selector"
              },
              "to": {
                "$ref": "#/definitions/selector"
              }
            }
          },
          "allow": {
            "description": "Selectors used to define relationships which are allowed.",
            "type": "object",
            "required": [
              "to",
              "from"
            ],
            "properties": {
              "from": {
                "$ref": "#/definitions/selector"
              },
              "to": {
                "$ref": "#/definitions/selector"
              }
            }
          }
        }
      }
    }
  }
}

export default schema;
