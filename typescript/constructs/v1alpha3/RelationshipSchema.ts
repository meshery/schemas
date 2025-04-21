// Generated from constructs/v1alpha3/relationship.json
// This file exports the original JSON schema

const schema = {
  "$id": "https://schemas.meshery.io/relationship.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "Relationships define the nature of interaction between interconnected components in Meshery. The combination of relationship properties kind, type, and subtype characterize various genealogical relations among and between components. Relationships have selectors, selector sets, metadata, and optional parameters. Learn more at https://docs.meshery.io/concepts/logical/relationships.",
  "required": [
    "schemaVersion",
    "version",
    "model",
    "kind",
    "type",
    "subType"
  ],
  "additionalProperties": false,
  "type": "object",
  "properties": {
    "id": {
      "description": "Uniquely identifies the entity (i.e. component) as defined in a declaration (i.e. design).",
      "type": "string",
      "format": "uuid",
      "x-go-type": "uuid.UUID",
      "x-go-type-import": {
        "path": "github.com/gofrs/uuid"
      },
      "x-oapi-codegen-extra-tags": {
        "yaml": "id",
        "json": "id"
      },
      "x-order": 1
    },
    "schemaVersion": {
      "description": "Specifies the version of the schema used for the relationship definition.",
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
      "x-oapi-codegen-extra-tags": {
        "yaml": "schemaVersion",
        "json": "schemaVersion"
      },
      "default": "v1alpha3",
      "x-order": 2
    },
    "version": {
      "description": "Specifies the version of the relationship definition.",
      "type": "string",
      "minLength": 5,
      "maxLength": 100,
      "x-oapi-codegen-extra-tags": {
        "yaml": "version",
        "json": "version"
      },
      "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$",
      "default": "v0.0.1",
      "x-order": 3
    },
    "model": {
      "description": "Name of the model in which this relationship is packaged.",
      "$id": "https://schemas.meshery.io/model.json",
      "$schema": "http://json-schema.org/draft-07/schema#",
      "additionalProperties": false,
      "type": "object",
      "properties": {
        "id": {
          "description": "Uniquely identifies the entity (i.e. component) as defined in a declaration (i.e. design).",
          "type": "string",
          "format": "uuid",
          "x-go-type": "uuid.UUID",
          "x-go-type-import": {
            "path": "github.com/gofrs/uuid"
          },
          "x-oapi-codegen-extra-tags": {
            "yaml": "id",
            "json": "id"
          },
          "x-order": 1
        },
        "schemaVersion": {
          "description": "Specifies the version of the schema used for the definition.",
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
          ],
          "x-order": 2
        },
        "version": {
          "description": "Version of the model definition.",
          "type": "string",
          "x-oapi-codegen-extra-tags": {
            "yaml": "version",
            "json": "version"
          },
          "minLength": 5,
          "maxLength": 100,
          "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$",
          "x-order": 3
        },
        "name": {
          "description": "The unique name for the model within the scope of a registrant.",
          "type": "string",
          "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
          "x-oapi-codegen-extra-tags": {
            "yaml": "name",
            "json": "name"
          },
          "x-order": 4
        },
        "displayName": {
          "description": "Human-readable name for the model.",
          "minLength": 1,
          "maxLength": 100,
          "type": "string",
          "pattern": "^[a-zA-Z_][a-zA-Z0-9_]*$",
          "x-oapi-codegen-extra-tags": {
            "yaml": "displayName",
            "json": "displayName"
          },
          "x-order": 5
        },
        "description": {
          "type": "string",
          "description": "Description of the model.",
          "minLength": 1,
          "maxLength": 1000,
          "x-oapi-codegen-extra-tags": {
            "yaml": "description",
            "json": "description"
          },
          "x-order": 6
        },
        "status": {
          "type": "string",
          "description": "Status of model, including:\n- duplicate: this component is a duplicate of another. The component that is to be the canonical reference and that is duplicated by other components should not be assigned the 'duplicate' status.\n- maintenance: model is unavailable for a period of time.\n- enabled: model is available for use for all users of this Meshery Server.\n- ignored: model is unavailable for use for all users of this Meshery Server.",
          "enum": [
            "ignored",
            "enabled",
            "duplicate"
          ],
          "x-oapi-codegen-extra-tags": {
            "yaml": "status",
            "json": "status"
          },
          "x-order": 7
        },
        "registrant": {
          "x-oapi-codegen-extra-tags": {
            "yaml": "registrant",
            "json": "registrant",
            "gorm": "foreignKey:RegistrantId;references:Id"
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
              },
              "x-order": 1
            },
            "name": {
              "x-oapi-codegen-extra-tags": {
                "db": "name",
                "yaml": "name",
                "json": "name"
              },
              "type": "string",
              "description": "Connection Name",
              "x-order": 2
            },
            "credential_id": {
              "x-go-name": "CredentialId",
              "x-oapi-codegen-extra-tags": {
                "db": "credential_id",
                "yaml": "credential_id",
                "json": "credential_id"
              },
              "description": "Credential ID",
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
              "x-order": 3
            },
            "type": {
              "x-oapi-codegen-extra-tags": {
                "db": "type",
                "yaml": "type",
                "json": "type"
              },
              "type": "string",
              "description": "Connection Type",
              "x-order": 4
            },
            "sub_type": {
              "x-oapi-codegen-extra-tags": {
                "db": "sub_type",
                "yaml": "sub_type",
                "json": "sub_type"
              },
              "type": "string",
              "description": "Connection Subtype",
              "x-order": 5
            },
            "kind": {
              "x-oapi-codegen-extra-tags": {
                "db": "kind",
                "yaml": "kind",
                "json": "kind"
              },
              "type": "string",
              "description": "Connection Kind",
              "x-order": 6
            },
            "metadata": {
              "x-oapi-codegen-extra-tags": {
                "db": "metadata",
                "yaml": "metadata",
                "json": "metadata"
              },
              "type": "object",
              "x-order": 7
            },
            "status": {
              "x-oapi-codegen-extra-tags": {
                "db": "status",
                "yaml": "status",
                "json": "status"
              },
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
              ],
              "x-order": 8
            },
            "user_id": {
              "x-go-name": "UserID",
              "x-oapi-codegen-extra-tags": {
                "yaml": "user_id",
                "json": "user_id"
              },
              "type": "string",
              "format": "uuid",
              "description": "A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas.",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
              "x-order": 9
            },
            "created_at": {
              "x-oapi-codegen-extra-tags": {
                "yaml": "created_at",
                "json": "created_at"
              },
              "type": "string",
              "format": "date-time",
              "x-go-type-skip-optional-pointer": true,
              "x-order": 10
            },
            "updated_at": {
              "x-oapi-codegen-extra-tags": {
                "yaml": "updated_at",
                "json": "updated_at"
              },
              "type": "string",
              "format": "date-time",
              "x-go-type-skip-optional-pointer": true,
              "x-order": 11
            },
            "deleted_at": {
              "x-oapi-codegen-extra-tags": {
                "yaml": "deleted_at",
                "json": "deleted_at"
              },
              "type": "string",
              "format": "date-time",
              "x-go-type-skip-optional-pointer": true,
              "x-order": 12
            }
          },
          "x-order": 8
        },
        "category": {
          "type": "object",
          "description": "Category of the model.",
          "properties": {
            "id": {
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
              },
              "x-order": 1
            },
            "name": {
              "type": "string",
              "minLength": 1,
              "maxLength": 100,
              "x-oapi-codegen-extra-tags": {
                "yaml": "name",
                "json": "name"
              },
              "x-order": 2
            },
            "metadata": {
              "type": "object",
              "x-oapi-codegen-extra-tags": {
                "yaml": "metadata",
                "json": "metadata"
              },
              "x-order": 3
            }
          },
          "x-oapi-codegen-extra-tags": {
            "yaml": "category",
            "json": "category",
            "gorm": "foreignKey:CategoryId;references:Id"
          },
          "x-order": 9
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
          "x-order": 10
        },
        "metadata": {
          "type": "object",
          "description": "Metadata containing additional information associated with the model.",
          "properties": {
            "capabilities": {
              "type": "array",
              "description": "Capabilities associated with the model",
              "items": {
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
                    "x-oapi-codegen-extra-tags": {
                      "yaml": "schemaVersion",
                      "json": "schemaVersion"
                    },
                    "x-order": 1
                  },
                  "version": {
                    "description": "Version of the capability definition.",
                    "type": "string",
                    "minLength": 5,
                    "maxLength": 100,
                    "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$",
                    "x-oapi-codegen-extra-tags": {
                      "yaml": "version",
                      "json": "version"
                    },
                    "x-order": 2
                  },
                  "displayName": {
                    "description": "Name of the capability in human-readible format.",
                    "type": "string",
                    "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
                    "x-oapi-codegen-extra-tags": {
                      "yaml": "displayName",
                      "json": "displayName"
                    },
                    "x-order": 3
                  },
                  "description": {
                    "type": "string",
                    "description": "A written representation of the purpose and characteristics of the capability.",
                    "x-oapi-codegen-extra-tags": {
                      "yaml": "description",
                      "json": "description"
                    },
                    "x-order": 4
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
                    "x-oapi-codegen-extra-tags": {
                      "yaml": "kind",
                      "json": "kind"
                    },
                    "x-order": 5
                  },
                  "type": {
                    "description": "Classification of capabilities. Used to group capabilities similar in nature.",
                    "type": "string",
                    "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
                    "x-oapi-codegen-extra-tags": {
                      "yaml": "type",
                      "json": "type"
                    },
                    "x-order": 6
                  },
                  "subType": {
                    "description": "Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Capability.",
                    "type": "string",
                    "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
                    "oneOf": [
                      {
                        "const": "inventory",
                        "description": "A hierarchical inventory relationship in which the configuration of (parent) component is patched with the configuration of other (child) component. Eg: The configuration of the EnvoyFilter (parent) component is patched with the configuration as received from WASMFilter (child) component."
                      },
                      {
                        "const": "matchLabels",
                        "description": "Match label relationships offer a dynamic association between one or more components and are a flexible way to group and manage related components in Meshery."
                      },
                      {
                        "const": "permission",
                        "description": "A relationship that represents a set of security-centric bindings between components."
                      },
                      {
                        "const": "network",
                        "description": "A relationship that represents a line of communication between two or more components."
                      },
                      {
                        "const": "firewall",
                        "description": "A relationship that act as a network-based security boundary for ingress and egress traffic."
                      },
                      {
                        "const": "mount",
                        "description": "A relationship that represents volume mounts between components."
                      },
                      {
                        "const": "alias",
                        "description": "An alias for a field path in another component."
                      },
                      {
                        "const": "annotation",
                        "description": "A relationship that provide valuable context for users, controllers, and third-party tools within the Meshery ecosystem."
                      }
                    ],
                    "x-oapi-codegen-extra-tags": {
                      "yaml": "subType",
                      "json": "subType"
                    },
                    "x-order": 7
                  },
                  "key": {
                    "description": "Key that backs the capability.",
                    "type": "string",
                    "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
                    "x-oapi-codegen-extra-tags": {
                      "yaml": "key",
                      "json": "key"
                    },
                    "x-order": 8
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
                    "x-oapi-codegen-extra-tags": {
                      "yaml": "status",
                      "json": "status"
                    },
                    "x-order": 10
                  },
                  "metadata": {
                    "type": "object",
                    "description": "Metadata contains additional information associated with the capability. Extension point.",
                    "additionalProperties": true,
                    "x-oapi-codegen-extra-tags": {
                      "yaml": "metadata",
                      "json": "metadata"
                    },
                    "x-order": 11
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
            "gorm": "type:bytes;serializer:json"
          },
          "additionalProperties": true,
          "x-order": 11
        },
        "model": {
          "type": "object",
          "description": "Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31)",
          "required": [
            "version"
          ],
          "properties": {
            "version": {
              "description": "Version of the model as defined by the registrant.",
              "x-oapi-codegen-extra-tags": {
                "yaml": "version",
                "json": "version"
              },
              "type": "string",
              "minLength": 5,
              "maxLength": 100,
              "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$",
              "x-order": 1
            }
          },
          "x-oapi-codegen-extra-tags": {
            "gorm": "type:bytes;serializer:json"
          },
          "x-order": 12
        }
      },
      "required": [
        "name",
        "version",
        "registrant",
        "category"
      ],
      "x-order": 4
    },
    "kind": {
      "description": "Kind of the Relationship. Learn more about relationships - https://docs.meshery.io/concepts/logical/relationships.",
      "enum": [
        "hierarchical",
        "edge",
        "sibling"
      ],
      "type": "string",
      "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
      "x-oapi-codegen-extra-tags": {
        "yaml": "kind",
        "json": "kind"
      },
      "x-order": 5
    },
    "type": {
      "description": "Classification of relationships. Used to group relationships similar in nature.",
      "x-go-name": "RelationshipType",
      "gorm": "column:type",
      "type": "string",
      "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
      "x-oapi-codegen-extra-tags": {
        "yaml": "type",
        "json": "type"
      },
      "x-order": 6
    },
    "subType": {
      "description": "Most granular unit of relationship classification. The combination of Kind, Type and SubType together uniquely identify a Relationship.",
      "type": "string",
      "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
      "x-oapi-codegen-extra-tags": {
        "yaml": "subType",
        "json": "subType"
      },
      "x-order": 7
    },
    "status": {
      "type": "string",
      "description": "Status of the relationship.",
      "default": "enabled",
      "enum": [
        "pending",
        "approved",
        "ignored",
        "enabled",
        "deleted"
      ],
      "x-oapi-codegen-extra-tags": {
        "yaml": "status",
        "json": "status"
      },
      "x-order": 8
    },
    "evaluationQuery": {
      "description": "Optional. Assigns the policy to be used for the evaluation of the relationship. Deprecation Notice: In the future, this property is either to be removed or to it is to be an array of optional policy $refs.",
      "type": "string",
      "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
      "x-oapi-codegen-extra-tags": {
        "yaml": "evaluationQuery",
        "json": "evaluationQuery"
      },
      "x-order": 9
    },
    "capabilities": {
      "type": "array",
      "description": "Capabilities associated with the relationship.",
      "items": {
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
            "x-oapi-codegen-extra-tags": {
              "yaml": "schemaVersion",
              "json": "schemaVersion"
            },
            "x-order": 1
          },
          "version": {
            "description": "Version of the capability definition.",
            "type": "string",
            "minLength": 5,
            "maxLength": 100,
            "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$",
            "x-oapi-codegen-extra-tags": {
              "yaml": "version",
              "json": "version"
            },
            "x-order": 2
          },
          "displayName": {
            "description": "Name of the capability in human-readible format.",
            "type": "string",
            "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
            "x-oapi-codegen-extra-tags": {
              "yaml": "displayName",
              "json": "displayName"
            },
            "x-order": 3
          },
          "description": {
            "type": "string",
            "description": "A written representation of the purpose and characteristics of the capability.",
            "x-oapi-codegen-extra-tags": {
              "yaml": "description",
              "json": "description"
            },
            "x-order": 4
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
            "x-oapi-codegen-extra-tags": {
              "yaml": "kind",
              "json": "kind"
            },
            "x-order": 5
          },
          "type": {
            "description": "Classification of capabilities. Used to group capabilities similar in nature.",
            "type": "string",
            "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
            "x-oapi-codegen-extra-tags": {
              "yaml": "type",
              "json": "type"
            },
            "x-order": 6
          },
          "subType": {
            "description": "Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Capability.",
            "type": "string",
            "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
            "x-oapi-codegen-extra-tags": {
              "yaml": "subType",
              "json": "subType"
            },
            "x-order": 7
          },
          "key": {
            "description": "Key that backs the capability.",
            "type": "string",
            "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
            "x-oapi-codegen-extra-tags": {
              "yaml": "key",
              "json": "key"
            },
            "x-order": 8
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
            "x-oapi-codegen-extra-tags": {
              "yaml": "status",
              "json": "status"
            },
            "x-order": 10
          },
          "metadata": {
            "type": "object",
            "description": "Metadata contains additional information associated with the capability. Extension point.",
            "additionalProperties": true,
            "x-oapi-codegen-extra-tags": {
              "yaml": "metadata",
              "json": "metadata"
            },
            "x-order": 11
          }
        }
      },
      "x-oapi-codegen-extra-tags": {
        "gorm": "type:bytes;serializer:json"
      },
      "x-order": 10
    },
    "metadata": {
      "type": "object",
      "description": "Metadata contains additional information associated with the Relationship.",
      "additionalProperties": true,
      "x-oapi-codegen-extra-tags": {
        "gorm": "foreignKey:ModelId;references:Id"
      },
      "properties": {
        "description": {
          "description": "Characterization of the meaning of the relationship and its relevance to both Meshery and entities under management.",
          "type": "string",
          "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
          "x-oapi-codegen-extra-tags": {
            "yaml": "description",
            "json": "description"
          },
          "x-order": 1
        },
        "isAnnotation": {
          "type": "boolean",
          "description": "Indicates whether the relationship should be treated as a logical representation only",
          "x-oapi-codegen-extra-tags": {
            "yaml": "isAnnotation",
            "json": "isAnnotation"
          },
          "default": false,
          "x-order": 2
        },
        "styles": {
          "anyOf": [
            {
              "type": "object",
              "description": "Visualization styles for a relationship",
              "allOf": [
                {
                  "type": "object",
                  "description": "Common styles for all entities",
                  "additionalProperties": false,
                  "required": [
                    "primaryColor",
                    "svgColor",
                    "svgWhite"
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
                      "description": "The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g. #ff0000 or #f00), RGB (e.g. rgb(255, 0, 0)), or HSL (e.g. hsl(0, 100%, 50%))."
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
                      "description": "The opacity of the element, ranging from 0 to 1. Note that the opacity of a compound node parent affects the effective opacity of its children.See https://js.cytoscape.org/#style/visibility",
                      "minimum": 0,
                      "maximum": 1
                    },
                    "z-index": {
                      "type": "integer",
                      "description": "An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index."
                    },
                    "label": {
                      "type": "string",
                      "description": "The text to display for an element’s label. Can give a path, e.g. data(id) will label with the elements id"
                    }
                  }
                },
                {
                  "properties": {
                    "edge-animation": {
                      "type": "string",
                      "description": "The animation to use for the edge. Can be like 'marching-ants' , 'blink' , 'moving-gradient',etc ."
                    },
                    "curve-style": {
                      "type": "string",
                      "description": "The curving method used to separate two or more edges between two nodes; may be haystack (very fast, bundled straight edges for which loops and compounds are unsupported), straight (straight edges with all arrows supported), bezier (bundled curved edges), unbundled-bezier (curved edges for use with manual control points), segments (a series of straight lines), taxi (right-angled lines, hierarchically bundled). Note that haystack edges work best with ellipse, rectangle, or similar nodes. Smaller node shapes, like triangle, will not be as aesthetically pleasing. Also note that edge endpoint arrows are unsupported for haystack edges.",
                      "default": "straight",
                      "enum": [
                        "straight",
                        "haystack",
                        "bezier",
                        "unbundled-bezier",
                        "segments",
                        "taxi"
                      ]
                    },
                    "line-color": {
                      "type": "string",
                      "description": "The colour of the edge’s line. Colours may be specified by name (e.g. red), hex (e.g. #ff0000 or #f00), RGB (e.g. rgb(255, 0, 0)), or HSL (e.g. hsl(0, 100%, 50%))."
                    },
                    "line-style": {
                      "type": "string",
                      "description": "The style of the edge’s line.",
                      "enum": [
                        "solid",
                        "dotted",
                        "dashed"
                      ]
                    },
                    "line-cap": {
                      "type": "string",
                      "description": "The cap style of the edge’s line; may be butt (default), round, or square. The cap may or may not be visible, depending on the shape of the node and the relative size of the node and edge. Caps other than butt extend beyond the specified endpoint of the edge.",
                      "enum": [
                        "butt",
                        "round",
                        "square"
                      ],
                      "default": "butt"
                    },
                    "line-opacity": {
                      "type": "number",
                      "minimum": 0,
                      "maximum": 1,
                      "default": 1,
                      "description": "The opacity of the edge’s line and arrow. Useful if you wish to have a separate opacity for the edge label versus the edge line. Note that the opacity value of the edge element affects the effective opacity of its line and label subcomponents."
                    },
                    "target-arrow-color": {
                      "type": "string",
                      "description": "The colour of the edge’s source arrow. Colours may be specified by name (e.g. red), hex (e.g. #ff0000 or #f00), RGB (e.g. rgb(255, 0, 0)), or HSL (e.g. hsl(0, 100%, 50%))."
                    },
                    "target-arrow-shape": {
                      "type": "string",
                      "description": "The shape of the edge’s source arrow",
                      "enum": [
                        "triangle",
                        "triangle-tee",
                        "circle-triangle",
                        "triangle-cross",
                        "triangle-backcurve",
                        "vee",
                        "tee",
                        "square",
                        "circle",
                        "diamond",
                        "chevron",
                        "none"
                      ]
                    },
                    "target-arrow-fill": {
                      "type": "string",
                      "description": "The fill state of the edge’s source arrow",
                      "enum": [
                        "filled",
                        "hollow"
                      ]
                    },
                    "mid-target-arrow-color": {
                      "type": "string",
                      "description": "The colour of the edge’s source arrow. Colours may be specified by name (e.g. red), hex (e.g. #ff0000 or #f00), RGB (e.g. rgb(255, 0, 0)), or HSL (e.g. hsl(0, 100%, 50%))."
                    },
                    "mid-target-arrow-shape": {
                      "type": "string",
                      "description": "The shape of the edge’s source arrow",
                      "enum": [
                        "triangle",
                        "triangle-tee",
                        "circle-triangle",
                        "triangle-cross",
                        "triangle-backcurve",
                        "vee",
                        "tee",
                        "square",
                        "circle",
                        "diamond",
                        "chevron",
                        "none"
                      ]
                    },
                    "mid-target-arrow-fill": {
                      "type": "string",
                      "description": "The fill state of the edge’s source arrow",
                      "enum": [
                        "filled",
                        "hollow"
                      ]
                    },
                    "arrow-scale": {
                      "type": "number",
                      "description": "Scaling for the arrow size.",
                      "minimum": 0
                    },
                    "source-label": {
                      "type": "string",
                      "description": "The text to display for an edge’s source label. Can give a path, e.g. data(id) will label with the elements id"
                    },
                    "target-label": {
                      "type": "string",
                      "description": "The text to display for an edge’s target label. Can give a path, e.g. data(id) will label with the elements id"
                    }
                  }
                }
              ]
            },
            {
              "type": "object",
              "description": "Common styles for all entities",
              "additionalProperties": false,
              "required": [
                "primaryColor",
                "svgColor",
                "svgWhite"
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
                  "description": "The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g. #ff0000 or #f00), RGB (e.g. rgb(255, 0, 0)), or HSL (e.g. hsl(0, 100%, 50%))."
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
                  "description": "The opacity of the element, ranging from 0 to 1. Note that the opacity of a compound node parent affects the effective opacity of its children.See https://js.cytoscape.org/#style/visibility",
                  "minimum": 0,
                  "maximum": 1
                },
                "z-index": {
                  "type": "integer",
                  "description": "An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index."
                },
                "label": {
                  "type": "string",
                  "description": "The text to display for an element’s label. Can give a path, e.g. data(id) will label with the elements id"
                }
              },
              "$comment": "Extension point for additional styles"
            }
          ],
          "x-oapi-codegen-extra-tags": {
            "yaml": "styles",
            "json": "styles"
          },
          "x-order": 3
        }
      },
      "x-order": 11
    },
    "selectors": {
      "x-oapi-codegen-extra-tags": {
        "gorm": "type:bytes;serializer:json"
      },
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
                "description": "Describes the component(s) which are involved in the relationship along with a set of actions to perform upon selection match.",
                "type": "array",
                "items": {
                  "type": "object",
                  "additionalProperties": false,
                  "properties": {
                    "kind": {
                      "type": "string",
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "kind",
                        "json": "kind"
                      },
                      "x-order": 1
                    },
                    "model": {
                      "description": "Name of the model implicated by this selector. Learn more at https://docs.meshery.io/concepts/models",
                      "$id": "https://schemas.meshery.io/model.json",
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "additionalProperties": false,
                      "type": "object",
                      "properties": {
                        "id": {
                          "description": "Uniquely identifies the entity (i.e. component) as defined in a declaration (i.e. design).",
                          "type": "string",
                          "format": "uuid",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "id",
                            "json": "id"
                          },
                          "x-order": 1
                        },
                        "schemaVersion": {
                          "description": "Specifies the version of the schema used for the definition.",
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
                          ],
                          "x-order": 2
                        },
                        "version": {
                          "description": "Version of the model definition.",
                          "type": "string",
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "version",
                            "json": "version"
                          },
                          "minLength": 5,
                          "maxLength": 100,
                          "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$",
                          "x-order": 3
                        },
                        "name": {
                          "description": "The unique name for the model within the scope of a registrant.",
                          "type": "string",
                          "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "name",
                            "json": "name"
                          },
                          "x-order": 4
                        },
                        "displayName": {
                          "description": "Human-readable name for the model.",
                          "minLength": 1,
                          "maxLength": 100,
                          "type": "string",
                          "pattern": "^[a-zA-Z_][a-zA-Z0-9_]*$",
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "displayName",
                            "json": "displayName"
                          },
                          "x-order": 5
                        },
                        "description": {
                          "type": "string",
                          "description": "Description of the model.",
                          "minLength": 1,
                          "maxLength": 1000,
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "description",
                            "json": "description"
                          },
                          "x-order": 6
                        },
                        "status": {
                          "type": "string",
                          "description": "Status of model, including:\n- duplicate: this component is a duplicate of another. The component that is to be the canonical reference and that is duplicated by other components should not be assigned the 'duplicate' status.\n- maintenance: model is unavailable for a period of time.\n- enabled: model is available for use for all users of this Meshery Server.\n- ignored: model is unavailable for use for all users of this Meshery Server.",
                          "enum": [
                            "ignored",
                            "enabled",
                            "duplicate"
                          ],
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "status",
                            "json": "status"
                          },
                          "x-order": 7
                        },
                        "registrant": {
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "registrant",
                            "json": "registrant",
                            "gorm": "foreignKey:RegistrantId;references:Id"
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
                              },
                              "x-order": 1
                            },
                            "name": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "name",
                                "yaml": "name",
                                "json": "name"
                              },
                              "type": "string",
                              "description": "Connection Name",
                              "x-order": 2
                            },
                            "credential_id": {
                              "x-go-name": "CredentialId",
                              "x-oapi-codegen-extra-tags": {
                                "db": "credential_id",
                                "yaml": "credential_id",
                                "json": "credential_id"
                              },
                              "description": "Credential ID",
                              "type": "string",
                              "format": "uuid",
                              "x-go-type": "uuid.UUID",
                              "x-go-type-import": {
                                "path": "github.com/gofrs/uuid"
                              },
                              "x-order": 3
                            },
                            "type": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "type",
                                "yaml": "type",
                                "json": "type"
                              },
                              "type": "string",
                              "description": "Connection Type",
                              "x-order": 4
                            },
                            "sub_type": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "sub_type",
                                "yaml": "sub_type",
                                "json": "sub_type"
                              },
                              "type": "string",
                              "description": "Connection Subtype",
                              "x-order": 5
                            },
                            "kind": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "kind",
                                "yaml": "kind",
                                "json": "kind"
                              },
                              "type": "string",
                              "description": "Connection Kind",
                              "x-order": 6
                            },
                            "metadata": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "metadata",
                                "yaml": "metadata",
                                "json": "metadata"
                              },
                              "type": "object",
                              "x-order": 7
                            },
                            "status": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "status",
                                "yaml": "status",
                                "json": "status"
                              },
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
                              ],
                              "x-order": 8
                            },
                            "user_id": {
                              "x-go-name": "UserID",
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "user_id",
                                "json": "user_id"
                              },
                              "type": "string",
                              "format": "uuid",
                              "description": "A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas.",
                              "x-go-type": "uuid.UUID",
                              "x-go-type-import": {
                                "path": "github.com/gofrs/uuid"
                              },
                              "x-order": 9
                            },
                            "created_at": {
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "created_at",
                                "json": "created_at"
                              },
                              "type": "string",
                              "format": "date-time",
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 10
                            },
                            "updated_at": {
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "updated_at",
                                "json": "updated_at"
                              },
                              "type": "string",
                              "format": "date-time",
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 11
                            },
                            "deleted_at": {
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "deleted_at",
                                "json": "deleted_at"
                              },
                              "type": "string",
                              "format": "date-time",
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 12
                            }
                          },
                          "x-order": 8
                        },
                        "category": {
                          "type": "object",
                          "description": "Category of the model.",
                          "properties": {
                            "id": {
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
                              },
                              "x-order": 1
                            },
                            "name": {
                              "type": "string",
                              "minLength": 1,
                              "maxLength": 100,
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "name",
                                "json": "name"
                              },
                              "x-order": 2
                            },
                            "metadata": {
                              "type": "object",
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "metadata",
                                "json": "metadata"
                              },
                              "x-order": 3
                            }
                          },
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "category",
                            "json": "category",
                            "gorm": "foreignKey:CategoryId;references:Id"
                          },
                          "x-order": 9
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
                          "x-order": 10
                        },
                        "metadata": {
                          "type": "object",
                          "description": "Metadata containing additional information associated with the model.",
                          "properties": {
                            "capabilities": {
                              "type": "array",
                              "description": "Capabilities associated with the model",
                              "items": {
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
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "schemaVersion",
                                      "json": "schemaVersion"
                                    },
                                    "x-order": 1
                                  },
                                  "version": {
                                    "description": "Version of the capability definition.",
                                    "type": "string",
                                    "minLength": 5,
                                    "maxLength": 100,
                                    "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$",
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "version",
                                      "json": "version"
                                    },
                                    "x-order": 2
                                  },
                                  "displayName": {
                                    "description": "Name of the capability in human-readible format.",
                                    "type": "string",
                                    "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "displayName",
                                      "json": "displayName"
                                    },
                                    "x-order": 3
                                  },
                                  "description": {
                                    "type": "string",
                                    "description": "A written representation of the purpose and characteristics of the capability.",
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "description",
                                      "json": "description"
                                    },
                                    "x-order": 4
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
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "kind",
                                      "json": "kind"
                                    },
                                    "x-order": 5
                                  },
                                  "type": {
                                    "description": "Classification of capabilities. Used to group capabilities similar in nature.",
                                    "type": "string",
                                    "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "type",
                                      "json": "type"
                                    },
                                    "x-order": 6
                                  },
                                  "subType": {
                                    "description": "Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Capability.",
                                    "type": "string",
                                    "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "subType",
                                      "json": "subType"
                                    },
                                    "x-order": 7
                                  },
                                  "key": {
                                    "description": "Key that backs the capability.",
                                    "type": "string",
                                    "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "key",
                                      "json": "key"
                                    },
                                    "x-order": 8
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
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "status",
                                      "json": "status"
                                    },
                                    "x-order": 10
                                  },
                                  "metadata": {
                                    "type": "object",
                                    "description": "Metadata contains additional information associated with the capability. Extension point.",
                                    "additionalProperties": true,
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "metadata",
                                      "json": "metadata"
                                    },
                                    "x-order": 11
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
                            "gorm": "type:bytes;serializer:json"
                          },
                          "additionalProperties": true,
                          "x-order": 11
                        },
                        "model": {
                          "type": "object",
                          "description": "Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31)",
                          "required": [
                            "version"
                          ],
                          "properties": {
                            "version": {
                              "description": "Version of the model as defined by the registrant.",
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "version",
                                "json": "version"
                              },
                              "type": "string",
                              "minLength": 5,
                              "maxLength": 100,
                              "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$",
                              "x-order": 1
                            }
                          },
                          "x-oapi-codegen-extra-tags": {
                            "gorm": "type:bytes;serializer:json"
                          },
                          "x-order": 12
                        }
                      },
                      "required": [
                        "name",
                        "version",
                        "registrant",
                        "category"
                      ],
                      "x-order": 2
                    },
                    "id": {
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
                      },
                      "x-order": 3
                    },
                    "match": {
                      "type": "object",
                      "additionalProperties": false,
                      "oneOf": [
                        {
                          "type": "array",
                          "items": {
                            "type": "array",
                            "items": {
                              "type": "string"
                            }
                          }
                        },
                        {
                          "properties": {
                            "from": {
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
                            "to": {
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
                            }
                          }
                        }
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "match",
                        "json": "match"
                      },
                      "x-order": 4
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
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "patch",
                        "json": "patch"
                      },
                      "x-order": 5
                    }
                  },
                  "description": "Optional fields that are a part of the `from` selector. Absence of a field has an implied * meaning."
                },
                "x-order": 1
              },
              "to": {
                "description": "Describes the component(s) which are involved in the relationship along with a set of actions to perform upon selection match.",
                "type": "array",
                "items": {
                  "type": "object",
                  "additionalProperties": false,
                  "properties": {
                    "kind": {
                      "type": "string",
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "kind",
                        "json": "kind"
                      },
                      "x-order": 1
                    },
                    "model": {
                      "description": "Name of the model implicated by this selector. Learn more at https://docs.meshery.io/concepts/models",
                      "$id": "https://schemas.meshery.io/model.json",
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "additionalProperties": false,
                      "type": "object",
                      "properties": {
                        "id": {
                          "description": "Uniquely identifies the entity (i.e. component) as defined in a declaration (i.e. design).",
                          "type": "string",
                          "format": "uuid",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "id",
                            "json": "id"
                          },
                          "x-order": 1
                        },
                        "schemaVersion": {
                          "description": "Specifies the version of the schema used for the definition.",
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
                          ],
                          "x-order": 2
                        },
                        "version": {
                          "description": "Version of the model definition.",
                          "type": "string",
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "version",
                            "json": "version"
                          },
                          "minLength": 5,
                          "maxLength": 100,
                          "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$",
                          "x-order": 3
                        },
                        "name": {
                          "description": "The unique name for the model within the scope of a registrant.",
                          "type": "string",
                          "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "name",
                            "json": "name"
                          },
                          "x-order": 4
                        },
                        "displayName": {
                          "description": "Human-readable name for the model.",
                          "minLength": 1,
                          "maxLength": 100,
                          "type": "string",
                          "pattern": "^[a-zA-Z_][a-zA-Z0-9_]*$",
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "displayName",
                            "json": "displayName"
                          },
                          "x-order": 5
                        },
                        "description": {
                          "type": "string",
                          "description": "Description of the model.",
                          "minLength": 1,
                          "maxLength": 1000,
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "description",
                            "json": "description"
                          },
                          "x-order": 6
                        },
                        "status": {
                          "type": "string",
                          "description": "Status of model, including:\n- duplicate: this component is a duplicate of another. The component that is to be the canonical reference and that is duplicated by other components should not be assigned the 'duplicate' status.\n- maintenance: model is unavailable for a period of time.\n- enabled: model is available for use for all users of this Meshery Server.\n- ignored: model is unavailable for use for all users of this Meshery Server.",
                          "enum": [
                            "ignored",
                            "enabled",
                            "duplicate"
                          ],
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "status",
                            "json": "status"
                          },
                          "x-order": 7
                        },
                        "registrant": {
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "registrant",
                            "json": "registrant",
                            "gorm": "foreignKey:RegistrantId;references:Id"
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
                              },
                              "x-order": 1
                            },
                            "name": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "name",
                                "yaml": "name",
                                "json": "name"
                              },
                              "type": "string",
                              "description": "Connection Name",
                              "x-order": 2
                            },
                            "credential_id": {
                              "x-go-name": "CredentialId",
                              "x-oapi-codegen-extra-tags": {
                                "db": "credential_id",
                                "yaml": "credential_id",
                                "json": "credential_id"
                              },
                              "description": "Credential ID",
                              "type": "string",
                              "format": "uuid",
                              "x-go-type": "uuid.UUID",
                              "x-go-type-import": {
                                "path": "github.com/gofrs/uuid"
                              },
                              "x-order": 3
                            },
                            "type": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "type",
                                "yaml": "type",
                                "json": "type"
                              },
                              "type": "string",
                              "description": "Connection Type",
                              "x-order": 4
                            },
                            "sub_type": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "sub_type",
                                "yaml": "sub_type",
                                "json": "sub_type"
                              },
                              "type": "string",
                              "description": "Connection Subtype",
                              "x-order": 5
                            },
                            "kind": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "kind",
                                "yaml": "kind",
                                "json": "kind"
                              },
                              "type": "string",
                              "description": "Connection Kind",
                              "x-order": 6
                            },
                            "metadata": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "metadata",
                                "yaml": "metadata",
                                "json": "metadata"
                              },
                              "type": "object",
                              "x-order": 7
                            },
                            "status": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "status",
                                "yaml": "status",
                                "json": "status"
                              },
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
                              ],
                              "x-order": 8
                            },
                            "user_id": {
                              "x-go-name": "UserID",
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "user_id",
                                "json": "user_id"
                              },
                              "type": "string",
                              "format": "uuid",
                              "description": "A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas.",
                              "x-go-type": "uuid.UUID",
                              "x-go-type-import": {
                                "path": "github.com/gofrs/uuid"
                              },
                              "x-order": 9
                            },
                            "created_at": {
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "created_at",
                                "json": "created_at"
                              },
                              "type": "string",
                              "format": "date-time",
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 10
                            },
                            "updated_at": {
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "updated_at",
                                "json": "updated_at"
                              },
                              "type": "string",
                              "format": "date-time",
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 11
                            },
                            "deleted_at": {
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "deleted_at",
                                "json": "deleted_at"
                              },
                              "type": "string",
                              "format": "date-time",
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 12
                            }
                          },
                          "x-order": 8
                        },
                        "category": {
                          "type": "object",
                          "description": "Category of the model.",
                          "properties": {
                            "id": {
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
                              },
                              "x-order": 1
                            },
                            "name": {
                              "type": "string",
                              "minLength": 1,
                              "maxLength": 100,
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "name",
                                "json": "name"
                              },
                              "x-order": 2
                            },
                            "metadata": {
                              "type": "object",
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "metadata",
                                "json": "metadata"
                              },
                              "x-order": 3
                            }
                          },
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "category",
                            "json": "category",
                            "gorm": "foreignKey:CategoryId;references:Id"
                          },
                          "x-order": 9
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
                          "x-order": 10
                        },
                        "metadata": {
                          "type": "object",
                          "description": "Metadata containing additional information associated with the model.",
                          "properties": {
                            "capabilities": {
                              "type": "array",
                              "description": "Capabilities associated with the model",
                              "items": {
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
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "schemaVersion",
                                      "json": "schemaVersion"
                                    },
                                    "x-order": 1
                                  },
                                  "version": {
                                    "description": "Version of the capability definition.",
                                    "type": "string",
                                    "minLength": 5,
                                    "maxLength": 100,
                                    "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$",
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "version",
                                      "json": "version"
                                    },
                                    "x-order": 2
                                  },
                                  "displayName": {
                                    "description": "Name of the capability in human-readible format.",
                                    "type": "string",
                                    "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "displayName",
                                      "json": "displayName"
                                    },
                                    "x-order": 3
                                  },
                                  "description": {
                                    "type": "string",
                                    "description": "A written representation of the purpose and characteristics of the capability.",
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "description",
                                      "json": "description"
                                    },
                                    "x-order": 4
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
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "kind",
                                      "json": "kind"
                                    },
                                    "x-order": 5
                                  },
                                  "type": {
                                    "description": "Classification of capabilities. Used to group capabilities similar in nature.",
                                    "type": "string",
                                    "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "type",
                                      "json": "type"
                                    },
                                    "x-order": 6
                                  },
                                  "subType": {
                                    "description": "Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Capability.",
                                    "type": "string",
                                    "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "subType",
                                      "json": "subType"
                                    },
                                    "x-order": 7
                                  },
                                  "key": {
                                    "description": "Key that backs the capability.",
                                    "type": "string",
                                    "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "key",
                                      "json": "key"
                                    },
                                    "x-order": 8
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
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "status",
                                      "json": "status"
                                    },
                                    "x-order": 10
                                  },
                                  "metadata": {
                                    "type": "object",
                                    "description": "Metadata contains additional information associated with the capability. Extension point.",
                                    "additionalProperties": true,
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "metadata",
                                      "json": "metadata"
                                    },
                                    "x-order": 11
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
                            "gorm": "type:bytes;serializer:json"
                          },
                          "additionalProperties": true,
                          "x-order": 11
                        },
                        "model": {
                          "type": "object",
                          "description": "Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31)",
                          "required": [
                            "version"
                          ],
                          "properties": {
                            "version": {
                              "description": "Version of the model as defined by the registrant.",
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "version",
                                "json": "version"
                              },
                              "type": "string",
                              "minLength": 5,
                              "maxLength": 100,
                              "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$",
                              "x-order": 1
                            }
                          },
                          "x-oapi-codegen-extra-tags": {
                            "gorm": "type:bytes;serializer:json"
                          },
                          "x-order": 12
                        }
                      },
                      "required": [
                        "name",
                        "version",
                        "registrant",
                        "category"
                      ],
                      "x-order": 2
                    },
                    "id": {
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
                      },
                      "x-order": 3
                    },
                    "match": {
                      "type": "object",
                      "additionalProperties": false,
                      "oneOf": [
                        {
                          "type": "array",
                          "items": {
                            "type": "array",
                            "items": {
                              "type": "string"
                            }
                          }
                        },
                        {
                          "properties": {
                            "from": {
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
                            "to": {
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
                            }
                          }
                        }
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "match",
                        "json": "match"
                      },
                      "x-order": 4
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
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "patch",
                        "json": "patch"
                      },
                      "x-order": 5
                    }
                  },
                  "description": "Optional fields that are a part of the `from` selector. Absence of a field has an implied * meaning."
                },
                "x-order": 2
              }
            },
            "x-order": 1
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
                "description": "Describes the component(s) which are involved in the relationship along with a set of actions to perform upon selection match.",
                "type": "array",
                "items": {
                  "type": "object",
                  "additionalProperties": false,
                  "properties": {
                    "kind": {
                      "type": "string",
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "kind",
                        "json": "kind"
                      },
                      "x-order": 1
                    },
                    "model": {
                      "description": "Name of the model implicated by this selector. Learn more at https://docs.meshery.io/concepts/models",
                      "$id": "https://schemas.meshery.io/model.json",
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "additionalProperties": false,
                      "type": "object",
                      "properties": {
                        "id": {
                          "description": "Uniquely identifies the entity (i.e. component) as defined in a declaration (i.e. design).",
                          "type": "string",
                          "format": "uuid",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "id",
                            "json": "id"
                          },
                          "x-order": 1
                        },
                        "schemaVersion": {
                          "description": "Specifies the version of the schema used for the definition.",
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
                          ],
                          "x-order": 2
                        },
                        "version": {
                          "description": "Version of the model definition.",
                          "type": "string",
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "version",
                            "json": "version"
                          },
                          "minLength": 5,
                          "maxLength": 100,
                          "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$",
                          "x-order": 3
                        },
                        "name": {
                          "description": "The unique name for the model within the scope of a registrant.",
                          "type": "string",
                          "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "name",
                            "json": "name"
                          },
                          "x-order": 4
                        },
                        "displayName": {
                          "description": "Human-readable name for the model.",
                          "minLength": 1,
                          "maxLength": 100,
                          "type": "string",
                          "pattern": "^[a-zA-Z_][a-zA-Z0-9_]*$",
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "displayName",
                            "json": "displayName"
                          },
                          "x-order": 5
                        },
                        "description": {
                          "type": "string",
                          "description": "Description of the model.",
                          "minLength": 1,
                          "maxLength": 1000,
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "description",
                            "json": "description"
                          },
                          "x-order": 6
                        },
                        "status": {
                          "type": "string",
                          "description": "Status of model, including:\n- duplicate: this component is a duplicate of another. The component that is to be the canonical reference and that is duplicated by other components should not be assigned the 'duplicate' status.\n- maintenance: model is unavailable for a period of time.\n- enabled: model is available for use for all users of this Meshery Server.\n- ignored: model is unavailable for use for all users of this Meshery Server.",
                          "enum": [
                            "ignored",
                            "enabled",
                            "duplicate"
                          ],
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "status",
                            "json": "status"
                          },
                          "x-order": 7
                        },
                        "registrant": {
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "registrant",
                            "json": "registrant",
                            "gorm": "foreignKey:RegistrantId;references:Id"
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
                              },
                              "x-order": 1
                            },
                            "name": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "name",
                                "yaml": "name",
                                "json": "name"
                              },
                              "type": "string",
                              "description": "Connection Name",
                              "x-order": 2
                            },
                            "credential_id": {
                              "x-go-name": "CredentialId",
                              "x-oapi-codegen-extra-tags": {
                                "db": "credential_id",
                                "yaml": "credential_id",
                                "json": "credential_id"
                              },
                              "description": "Credential ID",
                              "type": "string",
                              "format": "uuid",
                              "x-go-type": "uuid.UUID",
                              "x-go-type-import": {
                                "path": "github.com/gofrs/uuid"
                              },
                              "x-order": 3
                            },
                            "type": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "type",
                                "yaml": "type",
                                "json": "type"
                              },
                              "type": "string",
                              "description": "Connection Type",
                              "x-order": 4
                            },
                            "sub_type": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "sub_type",
                                "yaml": "sub_type",
                                "json": "sub_type"
                              },
                              "type": "string",
                              "description": "Connection Subtype",
                              "x-order": 5
                            },
                            "kind": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "kind",
                                "yaml": "kind",
                                "json": "kind"
                              },
                              "type": "string",
                              "description": "Connection Kind",
                              "x-order": 6
                            },
                            "metadata": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "metadata",
                                "yaml": "metadata",
                                "json": "metadata"
                              },
                              "type": "object",
                              "x-order": 7
                            },
                            "status": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "status",
                                "yaml": "status",
                                "json": "status"
                              },
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
                              ],
                              "x-order": 8
                            },
                            "user_id": {
                              "x-go-name": "UserID",
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "user_id",
                                "json": "user_id"
                              },
                              "type": "string",
                              "format": "uuid",
                              "description": "A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas.",
                              "x-go-type": "uuid.UUID",
                              "x-go-type-import": {
                                "path": "github.com/gofrs/uuid"
                              },
                              "x-order": 9
                            },
                            "created_at": {
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "created_at",
                                "json": "created_at"
                              },
                              "type": "string",
                              "format": "date-time",
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 10
                            },
                            "updated_at": {
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "updated_at",
                                "json": "updated_at"
                              },
                              "type": "string",
                              "format": "date-time",
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 11
                            },
                            "deleted_at": {
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "deleted_at",
                                "json": "deleted_at"
                              },
                              "type": "string",
                              "format": "date-time",
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 12
                            }
                          },
                          "x-order": 8
                        },
                        "category": {
                          "type": "object",
                          "description": "Category of the model.",
                          "properties": {
                            "id": {
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
                              },
                              "x-order": 1
                            },
                            "name": {
                              "type": "string",
                              "minLength": 1,
                              "maxLength": 100,
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "name",
                                "json": "name"
                              },
                              "x-order": 2
                            },
                            "metadata": {
                              "type": "object",
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "metadata",
                                "json": "metadata"
                              },
                              "x-order": 3
                            }
                          },
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "category",
                            "json": "category",
                            "gorm": "foreignKey:CategoryId;references:Id"
                          },
                          "x-order": 9
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
                          "x-order": 10
                        },
                        "metadata": {
                          "type": "object",
                          "description": "Metadata containing additional information associated with the model.",
                          "properties": {
                            "capabilities": {
                              "type": "array",
                              "description": "Capabilities associated with the model",
                              "items": {
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
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "schemaVersion",
                                      "json": "schemaVersion"
                                    },
                                    "x-order": 1
                                  },
                                  "version": {
                                    "description": "Version of the capability definition.",
                                    "type": "string",
                                    "minLength": 5,
                                    "maxLength": 100,
                                    "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$",
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "version",
                                      "json": "version"
                                    },
                                    "x-order": 2
                                  },
                                  "displayName": {
                                    "description": "Name of the capability in human-readible format.",
                                    "type": "string",
                                    "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "displayName",
                                      "json": "displayName"
                                    },
                                    "x-order": 3
                                  },
                                  "description": {
                                    "type": "string",
                                    "description": "A written representation of the purpose and characteristics of the capability.",
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "description",
                                      "json": "description"
                                    },
                                    "x-order": 4
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
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "kind",
                                      "json": "kind"
                                    },
                                    "x-order": 5
                                  },
                                  "type": {
                                    "description": "Classification of capabilities. Used to group capabilities similar in nature.",
                                    "type": "string",
                                    "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "type",
                                      "json": "type"
                                    },
                                    "x-order": 6
                                  },
                                  "subType": {
                                    "description": "Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Capability.",
                                    "type": "string",
                                    "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "subType",
                                      "json": "subType"
                                    },
                                    "x-order": 7
                                  },
                                  "key": {
                                    "description": "Key that backs the capability.",
                                    "type": "string",
                                    "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "key",
                                      "json": "key"
                                    },
                                    "x-order": 8
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
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "status",
                                      "json": "status"
                                    },
                                    "x-order": 10
                                  },
                                  "metadata": {
                                    "type": "object",
                                    "description": "Metadata contains additional information associated with the capability. Extension point.",
                                    "additionalProperties": true,
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "metadata",
                                      "json": "metadata"
                                    },
                                    "x-order": 11
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
                            "gorm": "type:bytes;serializer:json"
                          },
                          "additionalProperties": true,
                          "x-order": 11
                        },
                        "model": {
                          "type": "object",
                          "description": "Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31)",
                          "required": [
                            "version"
                          ],
                          "properties": {
                            "version": {
                              "description": "Version of the model as defined by the registrant.",
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "version",
                                "json": "version"
                              },
                              "type": "string",
                              "minLength": 5,
                              "maxLength": 100,
                              "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$",
                              "x-order": 1
                            }
                          },
                          "x-oapi-codegen-extra-tags": {
                            "gorm": "type:bytes;serializer:json"
                          },
                          "x-order": 12
                        }
                      },
                      "required": [
                        "name",
                        "version",
                        "registrant",
                        "category"
                      ],
                      "x-order": 2
                    },
                    "id": {
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
                      },
                      "x-order": 3
                    },
                    "match": {
                      "type": "object",
                      "additionalProperties": false,
                      "oneOf": [
                        {
                          "type": "array",
                          "items": {
                            "type": "array",
                            "items": {
                              "type": "string"
                            }
                          }
                        },
                        {
                          "properties": {
                            "from": {
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
                            "to": {
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
                            }
                          }
                        }
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "match",
                        "json": "match"
                      },
                      "x-order": 4
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
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "patch",
                        "json": "patch"
                      },
                      "x-order": 5
                    }
                  },
                  "description": "Optional fields that are a part of the `from` selector. Absence of a field has an implied * meaning."
                },
                "x-order": 1
              },
              "to": {
                "description": "Describes the component(s) which are involved in the relationship along with a set of actions to perform upon selection match.",
                "type": "array",
                "items": {
                  "type": "object",
                  "additionalProperties": false,
                  "properties": {
                    "kind": {
                      "type": "string",
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "kind",
                        "json": "kind"
                      },
                      "x-order": 1
                    },
                    "model": {
                      "description": "Name of the model implicated by this selector. Learn more at https://docs.meshery.io/concepts/models",
                      "$id": "https://schemas.meshery.io/model.json",
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "additionalProperties": false,
                      "type": "object",
                      "properties": {
                        "id": {
                          "description": "Uniquely identifies the entity (i.e. component) as defined in a declaration (i.e. design).",
                          "type": "string",
                          "format": "uuid",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "id",
                            "json": "id"
                          },
                          "x-order": 1
                        },
                        "schemaVersion": {
                          "description": "Specifies the version of the schema used for the definition.",
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
                          ],
                          "x-order": 2
                        },
                        "version": {
                          "description": "Version of the model definition.",
                          "type": "string",
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "version",
                            "json": "version"
                          },
                          "minLength": 5,
                          "maxLength": 100,
                          "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$",
                          "x-order": 3
                        },
                        "name": {
                          "description": "The unique name for the model within the scope of a registrant.",
                          "type": "string",
                          "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "name",
                            "json": "name"
                          },
                          "x-order": 4
                        },
                        "displayName": {
                          "description": "Human-readable name for the model.",
                          "minLength": 1,
                          "maxLength": 100,
                          "type": "string",
                          "pattern": "^[a-zA-Z_][a-zA-Z0-9_]*$",
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "displayName",
                            "json": "displayName"
                          },
                          "x-order": 5
                        },
                        "description": {
                          "type": "string",
                          "description": "Description of the model.",
                          "minLength": 1,
                          "maxLength": 1000,
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "description",
                            "json": "description"
                          },
                          "x-order": 6
                        },
                        "status": {
                          "type": "string",
                          "description": "Status of model, including:\n- duplicate: this component is a duplicate of another. The component that is to be the canonical reference and that is duplicated by other components should not be assigned the 'duplicate' status.\n- maintenance: model is unavailable for a period of time.\n- enabled: model is available for use for all users of this Meshery Server.\n- ignored: model is unavailable for use for all users of this Meshery Server.",
                          "enum": [
                            "ignored",
                            "enabled",
                            "duplicate"
                          ],
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "status",
                            "json": "status"
                          },
                          "x-order": 7
                        },
                        "registrant": {
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "registrant",
                            "json": "registrant",
                            "gorm": "foreignKey:RegistrantId;references:Id"
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
                              },
                              "x-order": 1
                            },
                            "name": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "name",
                                "yaml": "name",
                                "json": "name"
                              },
                              "type": "string",
                              "description": "Connection Name",
                              "x-order": 2
                            },
                            "credential_id": {
                              "x-go-name": "CredentialId",
                              "x-oapi-codegen-extra-tags": {
                                "db": "credential_id",
                                "yaml": "credential_id",
                                "json": "credential_id"
                              },
                              "description": "Credential ID",
                              "type": "string",
                              "format": "uuid",
                              "x-go-type": "uuid.UUID",
                              "x-go-type-import": {
                                "path": "github.com/gofrs/uuid"
                              },
                              "x-order": 3
                            },
                            "type": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "type",
                                "yaml": "type",
                                "json": "type"
                              },
                              "type": "string",
                              "description": "Connection Type",
                              "x-order": 4
                            },
                            "sub_type": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "sub_type",
                                "yaml": "sub_type",
                                "json": "sub_type"
                              },
                              "type": "string",
                              "description": "Connection Subtype",
                              "x-order": 5
                            },
                            "kind": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "kind",
                                "yaml": "kind",
                                "json": "kind"
                              },
                              "type": "string",
                              "description": "Connection Kind",
                              "x-order": 6
                            },
                            "metadata": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "metadata",
                                "yaml": "metadata",
                                "json": "metadata"
                              },
                              "type": "object",
                              "x-order": 7
                            },
                            "status": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "status",
                                "yaml": "status",
                                "json": "status"
                              },
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
                              ],
                              "x-order": 8
                            },
                            "user_id": {
                              "x-go-name": "UserID",
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "user_id",
                                "json": "user_id"
                              },
                              "type": "string",
                              "format": "uuid",
                              "description": "A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas.",
                              "x-go-type": "uuid.UUID",
                              "x-go-type-import": {
                                "path": "github.com/gofrs/uuid"
                              },
                              "x-order": 9
                            },
                            "created_at": {
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "created_at",
                                "json": "created_at"
                              },
                              "type": "string",
                              "format": "date-time",
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 10
                            },
                            "updated_at": {
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "updated_at",
                                "json": "updated_at"
                              },
                              "type": "string",
                              "format": "date-time",
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 11
                            },
                            "deleted_at": {
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "deleted_at",
                                "json": "deleted_at"
                              },
                              "type": "string",
                              "format": "date-time",
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 12
                            }
                          },
                          "x-order": 8
                        },
                        "category": {
                          "type": "object",
                          "description": "Category of the model.",
                          "properties": {
                            "id": {
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
                              },
                              "x-order": 1
                            },
                            "name": {
                              "type": "string",
                              "minLength": 1,
                              "maxLength": 100,
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "name",
                                "json": "name"
                              },
                              "x-order": 2
                            },
                            "metadata": {
                              "type": "object",
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "metadata",
                                "json": "metadata"
                              },
                              "x-order": 3
                            }
                          },
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "category",
                            "json": "category",
                            "gorm": "foreignKey:CategoryId;references:Id"
                          },
                          "x-order": 9
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
                          "x-order": 10
                        },
                        "metadata": {
                          "type": "object",
                          "description": "Metadata containing additional information associated with the model.",
                          "properties": {
                            "capabilities": {
                              "type": "array",
                              "description": "Capabilities associated with the model",
                              "items": {
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
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "schemaVersion",
                                      "json": "schemaVersion"
                                    },
                                    "x-order": 1
                                  },
                                  "version": {
                                    "description": "Version of the capability definition.",
                                    "type": "string",
                                    "minLength": 5,
                                    "maxLength": 100,
                                    "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$",
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "version",
                                      "json": "version"
                                    },
                                    "x-order": 2
                                  },
                                  "displayName": {
                                    "description": "Name of the capability in human-readible format.",
                                    "type": "string",
                                    "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "displayName",
                                      "json": "displayName"
                                    },
                                    "x-order": 3
                                  },
                                  "description": {
                                    "type": "string",
                                    "description": "A written representation of the purpose and characteristics of the capability.",
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "description",
                                      "json": "description"
                                    },
                                    "x-order": 4
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
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "kind",
                                      "json": "kind"
                                    },
                                    "x-order": 5
                                  },
                                  "type": {
                                    "description": "Classification of capabilities. Used to group capabilities similar in nature.",
                                    "type": "string",
                                    "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "type",
                                      "json": "type"
                                    },
                                    "x-order": 6
                                  },
                                  "subType": {
                                    "description": "Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Capability.",
                                    "type": "string",
                                    "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "subType",
                                      "json": "subType"
                                    },
                                    "x-order": 7
                                  },
                                  "key": {
                                    "description": "Key that backs the capability.",
                                    "type": "string",
                                    "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "key",
                                      "json": "key"
                                    },
                                    "x-order": 8
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
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "status",
                                      "json": "status"
                                    },
                                    "x-order": 10
                                  },
                                  "metadata": {
                                    "type": "object",
                                    "description": "Metadata contains additional information associated with the capability. Extension point.",
                                    "additionalProperties": true,
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "metadata",
                                      "json": "metadata"
                                    },
                                    "x-order": 11
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
                            "gorm": "type:bytes;serializer:json"
                          },
                          "additionalProperties": true,
                          "x-order": 11
                        },
                        "model": {
                          "type": "object",
                          "description": "Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31)",
                          "required": [
                            "version"
                          ],
                          "properties": {
                            "version": {
                              "description": "Version of the model as defined by the registrant.",
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "version",
                                "json": "version"
                              },
                              "type": "string",
                              "minLength": 5,
                              "maxLength": 100,
                              "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$",
                              "x-order": 1
                            }
                          },
                          "x-oapi-codegen-extra-tags": {
                            "gorm": "type:bytes;serializer:json"
                          },
                          "x-order": 12
                        }
                      },
                      "required": [
                        "name",
                        "version",
                        "registrant",
                        "category"
                      ],
                      "x-order": 2
                    },
                    "id": {
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
                      },
                      "x-order": 3
                    },
                    "match": {
                      "type": "object",
                      "additionalProperties": false,
                      "oneOf": [
                        {
                          "type": "array",
                          "items": {
                            "type": "array",
                            "items": {
                              "type": "string"
                            }
                          }
                        },
                        {
                          "properties": {
                            "from": {
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
                            "to": {
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
                            }
                          }
                        }
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "match",
                        "json": "match"
                      },
                      "x-order": 4
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
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "patch",
                        "json": "patch"
                      },
                      "x-order": 5
                    }
                  },
                  "description": "Optional fields that are a part of the `from` selector. Absence of a field has an implied * meaning."
                },
                "x-order": 2
              }
            },
            "x-order": 2
          }
        }
      },
      "x-order": 12
    }
  }
}

export default schema;
