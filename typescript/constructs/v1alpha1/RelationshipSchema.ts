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
      "description": "API Version of the Relationship.",
      "x-order": 1,
      "x-oapi-codegen-extra-tags": {
        "yaml": "apiVersion",
        "json": "apiVersion"
      }
    },
    "kind": {
      "type": "string",
      "description": "Kind of the Relationship.",
      "x-order": 2,
      "x-oapi-codegen-extra-tags": {
        "yaml": "kind",
        "json": "kind"
      }
    },
    "metadata": {
      "type": "object",
      "description": "Metadata contains additional information associated with the Relationship.",
      "properties": {
        "description": {
          "type": "string",
          "description": "Description of the Relationship.",
          "x-order": 1,
          "x-oapi-codegen-extra-tags": {
            "yaml": "description",
            "json": "description"
          }
        }
      },
      "x-order": 3
    },
    "model": {
      "description": "Model of the Relationship.",
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
          "default": "meshery-integration-template",
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
          "default": "Meshery Integration Template",
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
          "default": "v0.1.0",
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
      },
      "x-order": 4
    },
    "subType": {
      "type": "string",
      "description": "Used for further classification of Relationships. Type and SubType together identifies a Relationship.",
      "x-order": 5,
      "x-oapi-codegen-extra-tags": {
        "yaml": "subType",
        "json": "subType"
      }
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
                "type": "array",
                "items": {
                  "type": "object",
                  "additionalProperties": false,
                  "properties": {
                    "kind": {
                      "type": "string",
                      "x-order": 1,
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "kind",
                        "json": "kind"
                      }
                    },
                    "model": {
                      "type": "string",
                      "x-order": 2,
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "model",
                        "json": "model"
                      }
                    },
                    "version": {
                      "type": "string",
                      "minLength": 2,
                      "maxLength": 100,
                      "description": "API version of the object",
                      "pattern": "([a-z.])*(?!^/)v(alpha|beta|[0-9]+)([.-]*[a-z0-9]+)*$",
                      "example": [
                        "v1",
                        "v1alpha1",
                        "v2beta3",
                        "v1.custom-suffix"
                      ],
                      "x-order": 3,
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "version",
                        "json": "version"
                      }
                    },
                    "match": {
                      "type": "object",
                      "additionalProperties": false,
                      "properties": {
                        "self": {
                          "description": "Defines paths which should be matched with 'kind'.",
                          "type": "array",
                          "items": {
                            "type": "string",
                            "x-oapi-codegen-extra-tags": {
                              "yaml": "self",
                              "json": "self"
                            }
                          },
                          "x-order": 1
                        },
                        "kind": {
                          "description": "Optional property which defines paths which should be matched with 'self'. Here 'kind' is valid Component 'kind' belonging to the above specifed model. eg: If model is Kubernetes, valid 'kind' are 'Pod', 'Secret'. If the value for all paths of 'self' & 'kind' along with the value of all paths inside 'to.match.self' & 'to.match.kind are equal then the component with 'kind' act as an binded component. eg: ClusterRole, ClusterRoleBinding and ServiceAccount. If the paths for ClusterRole & ClusterRoleBinding and ServiceAccount & ClusterRoleBinding are equal then ClusterRoleBinding acts as an binding. Make sure the 'kind' value in 'from' and 'to' should be equal.",
                          "type": "array",
                          "items": {
                            "type": "string",
                            "x-oapi-codegen-extra-tags": {
                              "yaml": "kind",
                              "json": "kind"
                            }
                          },
                          "x-order": 2
                        }
                      },
                      "x-order": 4
                    },
                    "patch": {
                      "type": "object",
                      "additionalProperties": false,
                      "properties": {
                        "patchStrategy": {
                          "type": "string",
                          "enum": [
                            "replace"
                          ],
                          "x-order": 1,
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "patchStrategy",
                            "json": "patchStrategy"
                          }
                        },
                        "mutatorRef": {
                          "type": "array",
                          "items": {
                            "type": "array",
                            "items": {
                              "type": "string"
                            },
                            "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name].",
                            "x-oapi-codegen-extra-tags": {
                              "yaml": "mutatorRef",
                              "json": "mutatorRef"
                            }
                          },
                          "description": "JSON ref to value from where patch should be applied.",
                          "x-order": 2
                        }
                      },
                      "x-order": 5
                    }
                  },
                  "description": "Optional fields that are a part of the `from` selector. Absence of a field has an implied * meaning."
                },
                "x-order": 1
              },
              "to": {
                "type": "array",
                "items": {
                  "type": "object",
                  "additionalProperties": false,
                  "properties": {
                    "kind": {
                      "type": "string",
                      "x-order": 1,
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "kind",
                        "json": "kind"
                      }
                    },
                    "model": {
                      "type": "string",
                      "x-order": 2,
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "model",
                        "json": "model"
                      }
                    },
                    "version": {
                      "type": "string",
                      "minLength": 2,
                      "maxLength": 100,
                      "description": "API version of the object",
                      "pattern": "([a-z.])*(?!^/)v(alpha|beta|[0-9]+)([.-]*[a-z0-9]+)*$",
                      "example": [
                        "v1",
                        "v1alpha1",
                        "v2beta3",
                        "v1.custom-suffix"
                      ],
                      "x-order": 3,
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "version",
                        "json": "version"
                      }
                    },
                    "match": {
                      "type": "object",
                      "additionalProperties": false,
                      "properties": {
                        "self": {
                          "description": "Defines paths which should be matched with 'kind'.",
                          "type": "array",
                          "items": {
                            "type": "string",
                            "x-oapi-codegen-extra-tags": {
                              "yaml": "self",
                              "json": "self"
                            }
                          },
                          "x-order": 1
                        },
                        "kind": {
                          "description": "Optional property which defines paths which should be matched with 'self'. Here 'kind' is valid Component 'kind' belonging to the above specifed model. eg: If model is Kubernetes, valid 'kind' are 'Pod', 'Secret'. If the value for all paths of 'self' & 'kind' along with the value of all paths inside 'to.match.self' & 'to.match.kind are equal then the component with 'kind' act as an binded component. eg: ClusterRole, ClusterRoleBinding and ServiceAccount. If the paths for ClusterRole & ClusterRoleBinding and ServiceAccount & ClusterRoleBinding are equal then ClusterRoleBinding acts as an binding. Make sure the 'kind' value in 'from' and 'to' should be equal.",
                          "type": "array",
                          "items": {
                            "type": "string",
                            "x-oapi-codegen-extra-tags": {
                              "yaml": "kind",
                              "json": "kind"
                            }
                          },
                          "x-order": 2
                        }
                      },
                      "x-order": 4
                    },
                    "patch": {
                      "type": "object",
                      "additionalProperties": false,
                      "properties": {
                        "patchStrategy": {
                          "type": "string",
                          "enum": [
                            "replace"
                          ],
                          "x-order": 1,
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "patchStrategy",
                            "json": "patchStrategy"
                          }
                        },
                        "mutatedRef": {
                          "type": "string",
                          "description": "JSON ref to value that should be patched.",
                          "x-order": 2,
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "mutatedRef",
                            "json": "mutatedRef"
                          }
                        }
                      },
                      "x-order": 5
                    }
                  },
                  "description": "Optional fields that are a part of the `to` selector. Absence of a field has an implied * meaning."
                },
                "x-order": 2
              }
            },
            "x-order": 1
          },
          "allow": {
            "type": "object",
            "description": "Selectors used to define relationships which are allowed",
            "properties": {
              "from": {
                "type": "array",
                "items": {
                  "type": "object",
                  "additionalProperties": false,
                  "properties": {
                    "kind": {
                      "type": "string",
                      "x-order": 1,
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "kind",
                        "json": "kind"
                      }
                    },
                    "model": {
                      "type": "string",
                      "x-order": 2,
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "model",
                        "json": "model"
                      }
                    },
                    "version": {
                      "type": "string",
                      "minLength": 2,
                      "maxLength": 100,
                      "description": "API version of the object",
                      "pattern": "([a-z.])*(?!^/)v(alpha|beta|[0-9]+)([.-]*[a-z0-9]+)*$",
                      "example": [
                        "v1",
                        "v1alpha1",
                        "v2beta3",
                        "v1.custom-suffix"
                      ],
                      "x-order": 3,
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "version",
                        "json": "version"
                      }
                    },
                    "match": {
                      "type": "object",
                      "additionalProperties": false,
                      "properties": {
                        "self": {
                          "description": "Defines paths which should be matched with 'kind'.",
                          "type": "array",
                          "items": {
                            "type": "string",
                            "x-oapi-codegen-extra-tags": {
                              "yaml": "self",
                              "json": "self"
                            }
                          },
                          "x-order": 1
                        },
                        "kind": {
                          "description": "Optional property which defines paths which should be matched with 'self'. Here 'kind' is valid Component 'kind' belonging to the above specifed model. eg: If model is Kubernetes, valid 'kind' are 'Pod', 'Secret'. If the value for all paths of 'self' & 'kind' along with the value of all paths inside 'to.match.self' & 'to.match.kind are equal then the component with 'kind' act as an binded component. eg: ClusterRole, ClusterRoleBinding and ServiceAccount. If the paths for ClusterRole & ClusterRoleBinding and ServiceAccount & ClusterRoleBinding are equal then ClusterRoleBinding acts as an binding. Make sure the 'kind' value in 'from' and 'to' should be equal.",
                          "type": "array",
                          "items": {
                            "type": "string",
                            "x-oapi-codegen-extra-tags": {
                              "yaml": "kind",
                              "json": "kind"
                            }
                          },
                          "x-order": 2
                        }
                      },
                      "x-order": 4
                    },
                    "patch": {
                      "type": "object",
                      "additionalProperties": false,
                      "properties": {
                        "patchStrategy": {
                          "type": "string",
                          "enum": [
                            "replace"
                          ],
                          "x-order": 1,
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "patchStrategy",
                            "json": "patchStrategy"
                          }
                        },
                        "mutatorRef": {
                          "type": "array",
                          "items": {
                            "type": "array",
                            "items": {
                              "type": "string"
                            },
                            "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name].",
                            "x-oapi-codegen-extra-tags": {
                              "yaml": "mutatorRef",
                              "json": "mutatorRef"
                            }
                          },
                          "description": "JSON ref to value from where patch should be applied.",
                          "x-order": 2
                        }
                      },
                      "x-order": 5
                    }
                  },
                  "description": "Optional fields that are a part of the `from` selector. Absence of a field has an implied * meaning."
                },
                "x-order": 1
              },
              "to": {
                "type": "array",
                "items": {
                  "type": "object",
                  "additionalProperties": false,
                  "properties": {
                    "kind": {
                      "type": "string",
                      "x-order": 1,
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "kind",
                        "json": "kind"
                      }
                    },
                    "model": {
                      "type": "string",
                      "x-order": 2,
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "model",
                        "json": "model"
                      }
                    },
                    "version": {
                      "type": "string",
                      "minLength": 2,
                      "maxLength": 100,
                      "description": "API version of the object",
                      "pattern": "([a-z.])*(?!^/)v(alpha|beta|[0-9]+)([.-]*[a-z0-9]+)*$",
                      "example": [
                        "v1",
                        "v1alpha1",
                        "v2beta3",
                        "v1.custom-suffix"
                      ],
                      "x-order": 3,
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "version",
                        "json": "version"
                      }
                    },
                    "match": {
                      "type": "object",
                      "additionalProperties": false,
                      "properties": {
                        "self": {
                          "description": "Defines paths which should be matched with 'kind'.",
                          "type": "array",
                          "items": {
                            "type": "string",
                            "x-oapi-codegen-extra-tags": {
                              "yaml": "self",
                              "json": "self"
                            }
                          },
                          "x-order": 1
                        },
                        "kind": {
                          "description": "Optional property which defines paths which should be matched with 'self'. Here 'kind' is valid Component 'kind' belonging to the above specifed model. eg: If model is Kubernetes, valid 'kind' are 'Pod', 'Secret'. If the value for all paths of 'self' & 'kind' along with the value of all paths inside 'to.match.self' & 'to.match.kind are equal then the component with 'kind' act as an binded component. eg: ClusterRole, ClusterRoleBinding and ServiceAccount. If the paths for ClusterRole & ClusterRoleBinding and ServiceAccount & ClusterRoleBinding are equal then ClusterRoleBinding acts as an binding. Make sure the 'kind' value in 'from' and 'to' should be equal.",
                          "type": "array",
                          "items": {
                            "type": "string",
                            "x-oapi-codegen-extra-tags": {
                              "yaml": "kind",
                              "json": "kind"
                            }
                          },
                          "x-order": 2
                        }
                      },
                      "x-order": 4
                    },
                    "patch": {
                      "type": "object",
                      "additionalProperties": false,
                      "properties": {
                        "patchStrategy": {
                          "type": "string",
                          "enum": [
                            "replace"
                          ],
                          "x-order": 1,
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "patchStrategy",
                            "json": "patchStrategy"
                          }
                        },
                        "mutatedRef": {
                          "type": "string",
                          "description": "JSON ref to value that should be patched.",
                          "x-order": 2,
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "mutatedRef",
                            "json": "mutatedRef"
                          }
                        }
                      },
                      "x-order": 5
                    }
                  },
                  "description": "Optional fields that are a part of the `to` selector. Absence of a field has an implied * meaning."
                },
                "x-order": 2
              }
            },
            "x-order": 2
          }
        }
      },
      "x-order": 6
    }
  }
}

export default schema;
