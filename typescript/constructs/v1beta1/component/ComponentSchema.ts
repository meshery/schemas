// Generated from constructs/v1beta1/component/component.json
// This file exports the original JSON schema

const schema = {
  "$id": "https://schemas.meshery.io/component.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "Components are reusable building blocks for depicting capabilities defined within models. Learn more at https://docs.meshery.io/concepts/components",
  "additionalProperties": false,
  "type": "object",
  "properties": {
    "id": {
      "description": "Uniquely identifies the entity (i.e. component) as defined in a declaration (i.e. design).",
      "x-order": 1,
      "x-oapi-codegen-extra-tags": {
        "yaml": "id",
        "json": "id"
      },
      "type": "string",
      "format": "uuid",
      "x-go-type": "uuid.UUID",
      "x-go-type-import": {
        "path": "github.com/gofrs/uuid"
      }
    },
    "schemaVersion": {
      "x-order": 2,
      "description": "Specifies the version of the schema to which the component definition conforms.",
      "x-oapi-codegen-extra-tags": {
        "yaml": "schemaVersion",
        "json": "schemaVersion"
      },
      "type": "string",
      "minLength": 2,
      "maxLength": 100,
      "pattern": "([a-z.])*(?!^/)v(alpha|beta|[0-9]+)([.-]*[a-z0-9]+)*$",
      "example": [
        "v1",
        "v1alpha1",
        "v2beta3",
        "v1.custom-suffix"
      ]
    },
    "version": {
      "x-order": 3,
      "description": "Version of the component definition.",
      "minLength": 1,
      "maxLength": 50,
      "x-oapi-codegen-extra-tags": {
        "yaml": "version",
        "json": "version"
      },
      "type": "string",
      "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
    },
    "displayName": {
      "x-order": 4,
      "description": "Name of the component in human-readible format.",
      "x-oapi-codegen-extra-tags": {
        "yaml": "displayName",
        "json": "displayName"
      },
      "type": "string",
      "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
    },
    "description": {
      "x-order": 5,
      "type": "string",
      "description": "A written representation of the purpose and characteristics of the component.",
      "x-oapi-codegen-extra-tags": {
        "yaml": "description",
        "json": "description"
      }
    },
    "format": {
      "x-order": 6,
      "type": "string",
      "enum": [
        "JSON",
        "CUE"
      ],
      "default": "JSON",
      "description": "Format specifies the format used in the `component.schema` field. JSON is the default.",
      "x-oapi-codegen-extra-tags": {
        "yaml": "format",
        "json": "format"
      }
    },
    "model": {
      "x-go-type": "model.ModelDefinition",
      "x-go-type-import": {
        "path": "github.com/meshery/schemas/models/v1beta1/model"
      },
      "x-order": 7,
      "description": "Reference to the specific registered model to which the component belongs and from which model version, category, and other properties may be referenced. Learn more at https://docs.meshery.io/concepts/models",
      "x-oapi-codegen-extra-tags": {
        "gorm": "foreignKey:ModelId;references:Id"
      },
      "$id": "https://schemas.meshery.io/model.json",
      "$schema": "http://json-schema.org/draft-07/schema#",
      "additionalProperties": false,
      "type": "object",
      "properties": {
        "id": {
          "description": "Uniquely identifies the entity (i.e. component) as defined in a declaration (i.e. design).",
          "x-order": 1,
          "x-oapi-codegen-extra-tags": {
            "yaml": "id",
            "json": "id"
          },
          "type": "string",
          "format": "uuid",
          "x-go-type": "uuid.UUID",
          "x-go-type-import": {
            "path": "github.com/gofrs/uuid"
          }
        },
        "schemaVersion": {
          "description": "Specifies the version of the schema used for the definition.",
          "x-order": 2,
          "x-oapi-codegen-extra-tags": {
            "yaml": "schemaVersion",
            "json": "schemaVersion"
          },
          "type": "string",
          "minLength": 2,
          "maxLength": 100,
          "pattern": "([a-z.])*(?!^/)v(alpha|beta|[0-9]+)([.-]*[a-z0-9]+)*$",
          "example": [
            "v1",
            "v1alpha1",
            "v2beta3",
            "v1.custom-suffix"
          ]
        },
        "version": {
          "description": "Version of the model definition.",
          "type": "string",
          "x-order": 3,
          "x-oapi-codegen-extra-tags": {
            "yaml": "version",
            "json": "version"
          },
          "minLength": 5,
          "maxLength": 100,
          "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
        },
        "name": {
          "description": "The unique name for the model within the scope of a registrant.",
          "x-order": 4,
          "x-oapi-codegen-extra-tags": {
            "yaml": "name",
            "json": "name"
          },
          "type": "string",
          "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
        },
        "displayName": {
          "description": "Human-readable name for the model.",
          "minLength": 1,
          "maxLength": 100,
          "type": "string",
          "pattern": "^[a-zA-Z_][a-zA-Z0-9_]*$",
          "x-order": 5,
          "x-oapi-codegen-extra-tags": {
            "yaml": "displayName",
            "json": "displayName"
          }
        },
        "description": {
          "type": "string",
          "description": "Description of the model.",
          "minLength": 1,
          "maxLength": 1000,
          "x-order": 6,
          "x-oapi-codegen-extra-tags": {
            "yaml": "description",
            "json": "description"
          }
        },
        "status": {
          "type": "string",
          "description": "Status of model, including:\n- duplicate: this component is a duplicate of another. The component that is to be the canonical reference and that is duplicated by other components should not be assigned the 'duplicate' status.\n- maintenance: model is unavailable for a period of time.\n- enabled: model is available for use for all users of this Meshery Server.\n- ignored: model is unavailable for use for all users of this Meshery Server.",
          "enum": [
            "ignored",
            "enabled",
            "duplicate"
          ],
          "x-order": 7,
          "x-oapi-codegen-extra-tags": {
            "yaml": "status",
            "json": "status"
          }
        },
        "registrant": {
          "x-oapi-codegen-extra-tags": {
            "yaml": "registrant",
            "json": "registrant",
            "gorm": "foreignKey:RegistrantId;references:Id"
          },
          "x-order": 8,
          "x-go-type": "connection.Connection",
          "x-go-type-import": {
            "path": "github.com/meshery/schemas/models/v1beta1/connection"
          },
          "$id": "https://schemas.meshery.io/component.json",
          "$schema": "http://json-schema.org/draft-07/schema#",
          "description": "Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections",
          "additionalProperties": false,
          "type": "object",
          "required": [
            "kind",
            "type",
            "status"
          ],
          "properties": {
            "id": {
              "x-order": 1,
              "description": "ID",
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
              "x-oapi-codegen-extra-tags": {
                "yaml": "id",
                "json": "id"
              }
            },
            "name": {
              "x-oapi-codegen-extra-tags": {
                "db": "name",
                "yaml": "name",
                "json": "name"
              },
              "x-order": 2,
              "type": "string",
              "description": "Connection Name"
            },
            "credential_id": {
              "x-go-name": "CredentialId",
              "x-oapi-codegen-extra-tags": {
                "db": "credential_id",
                "yaml": "credential_id",
                "json": "credential_id"
              },
              "x-order": 3,
              "description": "Credential ID",
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              }
            },
            "type": {
              "x-oapi-codegen-extra-tags": {
                "db": "type",
                "yaml": "type",
                "json": "type"
              },
              "x-order": 4,
              "type": "string",
              "description": "Connection Type"
            },
            "sub_type": {
              "x-oapi-codegen-extra-tags": {
                "db": "sub_type",
                "yaml": "sub_type",
                "json": "sub_type"
              },
              "x-order": 5,
              "type": "string",
              "description": "Connection Subtype"
            },
            "kind": {
              "x-oapi-codegen-extra-tags": {
                "db": "kind",
                "yaml": "kind",
                "json": "kind"
              },
              "x-order": 6,
              "type": "string",
              "description": "Connection Kind"
            },
            "metadata": {
              "x-oapi-codegen-extra-tags": {
                "db": "metadata",
                "yaml": "metadata",
                "json": "metadata"
              },
              "x-order": 7,
              "type": "object"
            },
            "status": {
              "x-oapi-codegen-extra-tags": {
                "db": "status",
                "yaml": "status",
                "json": "status"
              },
              "x-order": 8,
              "description": "Connection Status",
              "type": "string",
              "enum": [
                "discovered",
                "registered",
                "connected",
                "ignored",
                "maintenance",
                "disconnected",
                "deleted",
                "not found"
              ]
            },
            "user_id": {
              "x-go-name": "UserID",
              "x-oapi-codegen-extra-tags": {
                "yaml": "user_id",
                "json": "user_id"
              },
              "x-order": 9,
              "type": "string",
              "format": "uuid",
              "description": "A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas.",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              }
            },
            "created_at": {
              "x-oapi-codegen-extra-tags": {
                "yaml": "created_at",
                "json": "created_at"
              },
              "x-order": 10,
              "type": "string",
              "format": "date-time",
              "x-go-type-skip-optional-pointer": true
            },
            "updated_at": {
              "x-oapi-codegen-extra-tags": {
                "yaml": "updated_at",
                "json": "updated_at"
              },
              "x-order": 11,
              "type": "string",
              "format": "date-time",
              "x-go-type-skip-optional-pointer": true
            },
            "deleted_at": {
              "x-oapi-codegen-extra-tags": {
                "yaml": "deleted_at",
                "json": "deleted_at"
              },
              "x-order": 12,
              "type": "string",
              "format": "date-time",
              "x-go-type-skip-optional-pointer": true
            }
          }
        },
        "registrantId": {
          "description": "ID of the registrant.",
          "x-oapi-codegen-extra-tags": {
            "yaml": "registrantId",
            "json": "registrantId",
            "gorm": "column:connection_id"
          },
          "x-order": 9,
          "type": "string",
          "format": "uuid",
          "x-go-type": "uuid.UUID",
          "x-go-type-import": {
            "path": "github.com/gofrs/uuid"
          }
        },
        "categoryId": {
          "description": "ID of the category.",
          "x-oapi-codegen-extra-tags": {
            "yaml": "categoryId",
            "json": "categoryId",
            "gorm": "categoryID"
          },
          "x-order": 10,
          "type": "string",
          "format": "uuid",
          "x-go-type": "uuid.UUID",
          "x-go-type-import": {
            "path": "github.com/gofrs/uuid"
          }
        },
        "category": {
          "x-order": 11,
          "x-oapi-codegen-extra-tags": {
            "yaml": "category",
            "json": "category",
            "gorm": "foreignKey:CategoryId;references:Id"
          },
          "x-go-type": "category.CategoryDefinition",
          "x-go-type-import": {
            "path": "github.com/meshery/schemas/models/v1beta1/category"
          },
          "$id": "https://schemas.meshery.io/category.json",
          "$schema": "http://json-schema.org/draft-07/schema#",
          "type": "object",
          "description": "Category of the model.",
          "required": [
            "id",
            "name",
            "metadata"
          ],
          "properties": {
            "id": {
              "x-order": 1,
              "type": "string",
              "format": "uuid",
              "description": "A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas.",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
              "x-oapi-codegen-extra-tags": {
                "yaml": "id",
                "json": "id"
              }
            },
            "name": {
              "type": "string",
              "minLength": 1,
              "maxLength": 100,
              "x-oapi-codegen-extra-tags": {
                "yaml": "name",
                "json": "name",
                "gorm": "name"
              },
              "x-order": 2
            },
            "metadata": {
              "type": "object",
              "x-oapi-codegen-extra-tags": {
                "yaml": "metadata",
                "json": "metadata",
                "gorm": "type:bytes;serializer:json"
              },
              "x-order": 3
            }
          }
        },
        "subCategory": {
          "type": "string",
          "description": "Sub-category of the model.",
          "minLength": 1,
          "maxLength": 100,
          "x-oapi-codegen-extra-tags": {
            "yaml": "subCategory",
            "json": "subCategory"
          },
          "x-order": 12
        },
        "metadata": {
          "type": "object",
          "description": "Metadata containing additional information associated with the model.",
          "required": [
            "svgWhite",
            "svgColor"
          ],
          "properties": {
            "capabilities": {
              "type": "array",
              "description": "Capabilities associated with the model",
              "items": {
                "x-go-type": "capability.Capability",
                "x-go-type-import": {
                  "path": "github.com/meshery/schemas/models/v1alpha1/capability"
                },
                "$id": "https://schemas.meshery.io/capability.json",
                "$schema": "http://json-schema.org/draft-07/schema#",
                "description": "Meshery manages entities in accordance with their specific capabilities. This field explicitly identifies those capabilities largely by what actions a given component supports; e.g. metric-scrape, sub-interface, and so on. This field is extensible. Entities may define a broad array of capabilities, which are in-turn dynamically interpretted by Meshery for full lifecycle management.",
                "additionalProperties": false,
                "type": "object",
                "required": [
                  "schemaVersion",
                  "version",
                  "displayName",
                  "kind",
                  "type",
                  "entityState",
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
                }
              },
              "x-order": 1
            },
            "isAnnotation": {
              "type": "boolean",
              "description": "Indicates whether the model and its entities should be treated as deployable entities or as logical representations.",
              "x-oapi-codegen-extra-tags": {
                "yaml": "isAnnotation",
                "json": "isAnnotation"
              },
              "x-order": 2
            },
            "primaryColor": {
              "type": "string",
              "description": "Primary color associated with the model.",
              "minLength": 1,
              "maxLength": 50,
              "x-oapi-codegen-extra-tags": {
                "yaml": "primaryColor",
                "json": "primaryColor"
              },
              "x-order": 3
            },
            "secondaryColor": {
              "type": "string",
              "description": "Secondary color associated with the model.",
              "minLength": 1,
              "maxLength": 50,
              "x-oapi-codegen-extra-tags": {
                "yaml": "secondaryColor",
                "json": "secondaryColor"
              },
              "x-order": 4
            },
            "svgWhite": {
              "type": "string",
              "description": "SVG representation of the model in white color.",
              "minLength": 1,
              "x-oapi-codegen-extra-tags": {
                "yaml": "svgWhite",
                "json": "svgWhite"
              },
              "x-order": 5
            },
            "svgColor": {
              "type": "string",
              "description": "SVG representation of the model in colored format.",
              "minLength": 1,
              "x-oapi-codegen-extra-tags": {
                "yaml": "svgColor",
                "json": "svgColor"
              },
              "x-order": 6
            },
            "svgComplete": {
              "type": "string",
              "description": "SVG representation of the complete model.",
              "minLength": 1,
              "x-oapi-codegen-extra-tags": {
                "yaml": "svgComplete",
                "json": "svgComplete"
              },
              "x-order": 7
            }
          },
          "x-oapi-codegen-extra-tags": {
            "gorm": "type:bytes;serializer:json",
            "json": "metadata",
            "yaml": "metadata"
          },
          "x-order": 13,
          "additionalProperties": true
        },
        "model": {
          "x-oapi-codegen-extra-tags": {
            "gorm": "type:bytes;serializer:json"
          },
          "x-order": 14,
          "type": "object",
          "description": "Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31).",
          "required": [
            "version"
          ],
          "properties": {
            "version": {
              "description": "Version of the model as defined by the registrant.",
              "allOf": [
                {
                  "type": "string",
                  "minLength": 5,
                  "maxLength": 100,
                  "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$",
                  "description": "A valid semantic version string between 5 and 256 characters. The pattern allows for a major.minor.patch version followed by an optional pre-release tag like '-alpha' or '-beta.2' and an optional build metadata tag like '+build.1."
                }
              ],
              "x-oapi-codegen-extra-tags": {
                "yaml": "version",
                "json": "version"
              },
              "x-order": 1
            }
          }
        },
        "relationships": {
          "type": "array",
          "x-go-type": "interface{}",
          "x-oapi-codegen-extra-tags": {
            "gorm": "-",
            "json": "relationships",
            "yaml": "relationships"
          },
          "x-order": 15
        },
        "components": {
          "type": "array",
          "x-go-type": "interface{}",
          "x-oapi-codegen-extra-tags": {
            "gorm": "-",
            "json": "components",
            "yaml": "components"
          },
          "x-order": 16
        },
        "componentsCount": {
          "type": "integer",
          "description": "Number of components associated with the model.",
          "x-order": 17,
          "x-oapi-codegen-extra-tags": {
            "json": "componentsCount",
            "yaml": "componentsCount",
            "gorm": "-"
          }
        },
        "relationshipsCount": {
          "type": "integer",
          "description": "Number of relationships associated with the model.",
          "x-order": 18,
          "x-oapi-codegen-extra-tags": {
            "gorm": "-",
            "json": "relationshipsCount",
            "yaml": "relationshipsCount"
          }
        }
      },
      "required": [
        "id",
        "schemaVersion",
        "displayName",
        "status",
        "subCategory",
        "model",
        "name",
        "description",
        "version",
        "registrant",
        "category",
        "categoryId",
        "registrantId",
        "relationshipsCount",
        "componentsCount",
        "components",
        "relationships"
      ]
    },
    "modelId": {
      "description": "ModelId is the foreign key to the model to which the component belongs.",
      "x-oapi-codegen-extra-tags": {
        "gorm": "index:idx_component_definition_dbs_model_id,column:model_id",
        "yaml": "modelId",
        "json": "modelId"
      },
      "type": "string",
      "format": "uuid",
      "x-go-type": "uuid.UUID",
      "x-go-type-import": {
        "path": "github.com/gofrs/uuid"
      },
      "x-order": 8
    },
    "styles": {
      "x-oapi-codegen-extra-tags": {
        "gorm": "type:bytes;serializer:json",
        "yaml": "styles",
        "json": "styles"
      },
      "x-go-type": "core.ComponentStyles",
      "x-go-type-import": {
        "path": "github.com/meshery/schemas/models/v1alpha1/core"
      },
      "x-order": 9,
      "type": "object",
      "description": "Visualization styles for a component",
      "required": [
        "shape",
        "primaryColor",
        "svgColor",
        "svgWhite",
        "svgComplete"
      ],
      "allOf": [
        {
          "type": "object",
          "description": "Common styles for all entities",
          "additionalProperties": true,
          "required": [
            "primaryColor",
            "svgColor",
            "svgWhite",
            "svgComplete"
          ],
          "properties": {
            "primaryColor": {
              "type": "string",
              "description": "Primary color of the component used for UI representation."
            },
            "secondaryColor": {
              "type": "string",
              "description": "Secondary color of the entity used for UI representation."
            },
            "svgWhite": {
              "type": "string",
              "description": "White SVG of the entity used for UI representation on dark background."
            },
            "svgColor": {
              "type": "string",
              "description": "Colored SVG of the entity used for UI representation on light background."
            },
            "svgComplete": {
              "type": "string",
              "description": "Complete SVG of the entity used for UI representation, often inclusive of background."
            },
            "color": {
              "type": "string",
              "description": "The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g."
            },
            "text-opacity": {
              "type": "number",
              "description": "The opacity of the label text, including its outline.",
              "minimum": 0,
              "maximum": 1
            },
            "font-family": {
              "type": "string",
              "description": "A comma-separated list of font names to use on the label text."
            },
            "font-size": {
              "type": "string",
              "description": "The size of the label text."
            },
            "font-style": {
              "type": "string",
              "description": "A CSS font style to be applied to the label text."
            },
            "font-weight": {
              "type": "string",
              "description": "A CSS font weight to be applied to the label text."
            },
            "text-transform": {
              "type": "string",
              "description": "A transformation to apply to the label text",
              "enum": [
                "none",
                "uppercase",
                "lowercase"
              ]
            },
            "opacity": {
              "type": "number",
              "description": "The opacity of the element, ranging from 0 to 1. Note that the opacity of a compound node parent affects the effective opacity of its children.",
              "minimum": 0,
              "maximum": 1
            },
            "z-index": {
              "type": "integer",
              "description": "An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index."
            },
            "label": {
              "type": "string",
              "description": "The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id"
            },
            "animation": {
              "type": "object",
              "description": "The animation to apply to the element. example ripple,bounce,etc"
            }
          }
        },
        {
          "type": "object",
          "properties": {
            "shape": {
              "type": "string",
              "description": "The shape of the node's body. Note that each shape fits within the specified width and height, and so you may have to adjust width and height if you desire an equilateral shape (i.e. width !== height for several equilateral shapes)",
              "enum": [
                "ellipse",
                "triangle",
                "round-triangle",
                "rectangle",
                "round-rectangle",
                "bottom-round-rectangle",
                "cut-rectangle",
                "barrel",
                "rhomboid",
                "diamond",
                "round-diamond",
                "pentagon",
                "round-pentagon",
                "hexagon",
                "round-hexagon",
                "concave-hexagon",
                "heptagon",
                "round-heptagon",
                "octagon",
                "round-octagon",
                "star",
                "tag",
                "round-tag",
                "vee",
                "polygon"
              ]
            },
            "position": {
              "type": "object",
              "additionalProperties": false,
              "required": [
                "x",
                "y"
              ],
              "description": "The position of the node. If the position is set, the node is drawn at that position in the given dimensions. If the position is not set, the node is drawn at a random position.",
              "properties": {
                "x": {
                  "type": "number",
                  "description": "The x-coordinate of the node.",
                  "x-go-type": "float64"
                },
                "y": {
                  "type": "number",
                  "description": "The y-coordinate of the node.",
                  "x-go-type": "float64"
                }
              }
            },
            "body-text": {
              "type": "string",
              "description": "The text to display for an element's body. Can give a path, e.g. data(id) will label with the elements id"
            },
            "body-text-wrap": {
              "type": "string",
              "description": "How to wrap the text in the node. Can be 'none', 'wrap', or 'ellipsis'."
            },
            "body-text-max-width": {
              "type": "string",
              "description": "The maximum width for wrapping text in the node."
            },
            "body-text-opacity": {
              "type": "number",
              "description": "The opacity of the node's body text, including its outline.",
              "minimum": 0,
              "maximum": 1
            },
            "body-text-background-color": {
              "type": "string",
              "description": "The colour of the node's body text background. Colours may be specified by name (e.g. red), hex (e.g."
            },
            "body-text-font-size": {
              "type": "number",
              "description": "The size of the node's body text."
            },
            "body-text-color": {
              "type": "string",
              "description": "The colour of the node's body text. Colours may be specified by name (e.g. red), hex (e.g."
            },
            "body-text-font-weight": {
              "type": "string",
              "description": "A CSS font weight to be applied to the node's body text."
            },
            "body-text-horizontal-align": {
              "type": "string",
              "description": "A CSS horizontal alignment to be applied to the node's body text."
            },
            "body-text-decoration": {
              "type": "string",
              "description": "A CSS text decoration to be applied to the node's body text."
            },
            "body-text-vertical-align": {
              "type": "string",
              "description": "A CSS vertical alignment to be applied to the node's body text."
            },
            "width": {
              "type": "number",
              "description": "The width of the node's body or the width of an edge's line."
            },
            "height": {
              "type": "number",
              "description": "The height of the node's body"
            },
            "background-image": {
              "type": "string",
              "description": "The URL that points to the image to show in the node."
            },
            "background-color": {
              "type": "string",
              "description": "The colour of the node's body. Colours may be specified by name (e.g. red), hex (e.g."
            },
            "background-blacken": {
              "type": "number",
              "description": "Blackens the node's body for values from 0 to 1; whitens the node's body for values from 0 to -1.",
              "maximum": 1,
              "minimum": -1
            },
            "background-opacity": {
              "type": "number",
              "description": "The opacity level of the node's background colour",
              "maximum": 1,
              "minimum": 0
            },
            "background-position-x": {
              "type": "string",
              "description": "The x position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)"
            },
            "background-position-y": {
              "type": "string",
              "description": "The y position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)"
            },
            "background-offset-x": {
              "type": "string",
              "description": "The x offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)"
            },
            "background-offset-y": {
              "type": "string",
              "description": "The y offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)"
            },
            "background-fit": {
              "type": "string",
              "description": "How the background image is fit to the node. Can be 'none', 'contain', or 'cover'."
            },
            "background-clip": {
              "type": "string",
              "description": "How the background image is clipped to the node. Can be 'none', 'node', or 'node-border'."
            },
            "background-width-relative-to": {
              "type": "string",
              "description": "How the background image's width is determined. Can be 'none', 'inner', or 'outer'."
            },
            "background-height-relative-to": {
              "type": "string",
              "description": "How the background image's height is determined. Can be 'none', 'inner', or 'outer'."
            },
            "border-width": {
              "type": "number",
              "description": "The size of the node's border.",
              "minimum": 0
            },
            "border-style": {
              "type": "string",
              "description": "The style of the node's border",
              "enum": [
                "solid",
                "dotted",
                "dashed",
                "double"
              ]
            },
            "border-color": {
              "type": "string",
              "description": "The colour of the node's border. Colours may be specified by name (e.g. red), hex (e.g."
            },
            "border-opacity": {
              "type": "number",
              "description": "The opacity of the node's border",
              "minimum": 0,
              "maximum": 1
            },
            "padding": {
              "type": "number",
              "description": "The amount of padding around all sides of the node.",
              "minimum": 0
            },
            "text-halign": {
              "type": "string",
              "description": "The horizontal alignment of a node's label",
              "enum": [
                "left",
                "center",
                "right"
              ]
            },
            "text-valign": {
              "type": "string",
              "description": "The vertical alignment of a node's label",
              "enum": [
                "top",
                "center",
                "bottom"
              ]
            },
            "ghost": {
              "type": "string",
              "description": "Whether to use the ghost effect, a semitransparent duplicate of the element drawn at an offset.",
              "default": "no",
              "enum": [
                "yes",
                "no"
              ]
            },
            "active-bg-color": {
              "type": "string",
              "description": "The colour of the indicator shown when the background is grabbed by the user. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g."
            },
            "active-bg-opacity": {
              "type": "string",
              "description": "The opacity of the active background indicator. Selector needs to be *core*."
            },
            "active-bg-size": {
              "type": "string",
              "description": "The opacity of the active background indicator. Selector needs to be *core*."
            },
            "selection-box-color": {
              "type": "string",
              "description": "The background colour of the selection box used for drag selection. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g."
            },
            "selection-box-border-width": {
              "type": "number",
              "description": "The size of the border on the selection box. Selector needs to be *core*"
            },
            "selection-box-opacity": {
              "type": "number",
              "description": "The opacity of the selection box. Selector needs to be *core*",
              "minimum": 0,
              "maximum": 1
            },
            "outside-texture-bg-color": {
              "type": "string",
              "description": "The colour of the area outside the viewport texture when initOptions.textureOnViewport === true. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g."
            },
            "outside-texture-bg-opacity": {
              "type": "number",
              "description": "The opacity of the area outside the viewport texture. Selector needs to be *core*",
              "minimum": 0,
              "maximum": 1
            },
            "shape-polygon-points": {
              "type": "string",
              "description": "An array (or a space-separated string) of numbers ranging on [-1, 1], representing alternating x and y values (i.e. x1 y1 x2 y2, x3 y3 ...). This represents the points in the polygon for the node's shape. The bounding box of the node is given by (-1, -1), (1, -1), (1, 1), (-1, 1). The node's position is the origin (0, 0 )"
            },
            "menu-background-color": {
              "type": "string",
              "description": "The colour of the background of the component menu. Colours may be specified by name (e.g. red), hex (e.g."
            },
            "menu-background-opacity": {
              "type": "number",
              "description": "The opacity of the background of the component menu.",
              "minimum": 0,
              "maximum": 1
            },
            "menu-forground-color": {
              "type": "string",
              "description": "The colour of the text or icons in the component menu. Colours may be specified by name (e.g. red), hex (e.g."
            }
          }
        }
      ]
    },
    "capabilities": {
      "x-order": 10,
      "type": "array",
      "description": "Meshery manages components in accordance with their specific capabilities. This field explicitly identifies those capabilities largely by what actions a given component supports; e.g. metric-scrape, sub-interface, and so on. This field is extensible. ComponentDefinitions may define a broad array of capabilities, which are in-turn dynamically interpretted by Meshery for full lifecycle management.",
      "items": {
        "x-go-type": "capability.Capability",
        "x-go-type-import": {
          "path": "github.com/meshery/schemas/models/v1alpha1/capability"
        },
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
            "type": "string",
            "minLength": 5,
            "maxLength": 100,
            "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$",
            "description": "A valid semantic version string between 5 and 256 characters. The pattern allows for a major.minor.patch version followed by an optional pre-release tag like '-alpha' or '-beta.2' and an optional build metadata tag like '+build.1.",
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
        }
      },
      "x-oapi-codegen-extra-tags": {
        "gorm": "type:bytes;serializer:json",
        "yaml": "capabilities",
        "json": "capabilities"
      }
    },
    "status": {
      "x-order": 11,
      "type": "string",
      "description": "Status of component, including:\n- duplicate: this component is a duplicate of another. The component that is to be the canonical reference and that is duplicated by other components should not be assigned the 'duplicate' status.\n- maintenance: model is unavailable for a period of time.\n- enabled: model is available for use for all users of this Meshery Server.\n- ignored: model is unavailable for use for all users of this Meshery Server.",
      "default": "enabled",
      "enum": [
        "ignored",
        "enabled",
        "duplicate",
        "resolved",
        "open"
      ],
      "x-oapi-codegen-extra-tags": {
        "yaml": "status",
        "json": "status"
      }
    },
    "metadata": {
      "x-order": 12,
      "type": "object",
      "description": "Metadata contains additional information associated with the component.",
      "required": [
        "genealogy",
        "isAnnotation",
        "isNamespaced",
        "published",
        "instanceDetails",
        "configurationUISchema"
      ],
      "properties": {
        "genealogy": {
          "x-order": 1,
          "type": "string",
          "description": "Genealogy represents the various representational states of the component.",
          "x-oapi-codegen-extra-tags": {
            "yaml": "genealogy",
            "json": "genealogy"
          }
        },
        "isAnnotation": {
          "x-order": 2,
          "type": "boolean",
          "description": "Identifies whether the component is semantically meaningful or not; identifies whether the component should be treated as deployable entity or is for purposes of logical representation.",
          "x-oapi-codegen-extra-tags": {
            "yaml": "isAnnotation",
            "json": "isAnnotation"
          }
        },
        "isNamespaced": {
          "x-order": 3,
          "type": "boolean",
          "description": "Identifies whether the component is scoped to namespace or clsuter wide.",
          "x-oapi-codegen-extra-tags": {
            "yaml": "isNamespaced",
            "json": "isNamespaced"
          }
        },
        "published": {
          "x-order": 4,
          "type": "boolean",
          "description": "'published' controls whether the component should be registered in Meshery Registry. When the same 'published' property in Models, is set to 'false', the Model property takes precedence with all Entities in the Model not being registered.",
          "x-oapi-codegen-extra-tags": {
            "yaml": "published",
            "json": "published"
          }
        },
        "instanceDetails": {
          "x-order": 5,
          "type": "object",
          "description": "InstanceDetails contains information about the instance of the component.",
          "x-oapi-codegen-extra-tags": {
            "yaml": "instanceDetails",
            "json": "instanceDetails"
          }
        },
        "configurationUISchema": {
          "x-order": 6,
          "type": "string",
          "description": "Defines the UI schema for rendering the component's configuration. For more details, visit: https://rjsf-team.github.io/react-jsonschema-form/docs/api-reference/uiSchema/ .",
          "x-oapi-codegen-extra-tags": {
            "yaml": "configurationUISchema",
            "json": "configurationUISchema"
          }
        }
      },
      "x-oapi-codegen-extra-tags": {
        "gorm": "type:bytes;serializer:json"
      },
      "additionalProperties": true
    },
    "configuration": {
      "x-order": 13,
      "description": "The configuration of the component. The configuration is based on the schema defined within the component definition(component.schema).",
      "type": "object",
      "$comment": "The configuration of the component. The configuration is based on the schema defined within the component definition(component.schema).",
      "x-oapi-codegen-extra-tags": {
        "gorm": "type:bytes;serializer:json",
        "yaml": "configuration",
        "json": "configuration"
      }
    },
    "component": {
      "x-order": 14,
      "x-oapi-codegen-extra-tags": {
        "gorm": "type:bytes;serializer:json"
      },
      "x-go-type": "Component",
      "description": "data related to the third party capability that Component Defintion wraps , this is herematicaly sealed an",
      "type": "object",
      "properties": {
        "version": {
          "type": "string",
          "description": "Version of the component produced by the registrant. Example: APIVersion of a Kubernetes Pod.",
          "x-order": 1,
          "x-oapi-codegen-extra-tags": {
            "yaml": "version",
            "json": "version"
          }
        },
        "kind": {
          "type": "string",
          "description": "The unique identifier (name) assigned by the registrant to this component. Example: A Kubernetes Pod is of kind 'Pod'.",
          "x-order": 2,
          "x-oapi-codegen-extra-tags": {
            "yaml": "kind",
            "json": "kind"
          }
        },
        "schema": {
          "type": "string",
          "description": "JSON schema of the object as defined by the registrant.",
          "x-order": 3,
          "x-oapi-codegen-extra-tags": {
            "yaml": "schema",
            "json": "schema"
          }
        }
      },
      "required": [
        "version",
        "kind",
        "schema"
      ]
    }
  },
  "required": [
    "id",
    "displayName",
    "description",
    "schemaVersion",
    "format",
    "version",
    "configuration",
    "metadata",
    "modelId",
    "model",
    "component"
  ]
}

export default schema;
