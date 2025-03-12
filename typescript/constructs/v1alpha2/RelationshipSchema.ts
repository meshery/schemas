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
      "description": "Specifies the version of the schema used for the definition.",
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
      "description": "Specifies the version of the definition.",
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
    "kind": {
      "description": "Kind of the Relationship.",
      "enum": [
        "hierarchical",
        "edge",
        "sibling"
      ],
      "type": "string",
      "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
      "x-order": 3,
      "x-oapi-codegen-extra-tags": {
        "yaml": "kind",
        "json": "kind"
      }
    },
    "type": {
      "description": "Classification of relationships. Used to group relationships similar in nature.",
      "type": "string",
      "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
      "x-order": 4,
      "x-oapi-codegen-extra-tags": {
        "yaml": "type",
        "json": "type"
      }
    },
    "subType": {
      "description": "Used for further classification of Relationships. Type and SubType together identifies a Relationship.",
      "type": "string",
      "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
      "x-order": 5,
      "x-oapi-codegen-extra-tags": {
        "yaml": "subType",
        "json": "subType"
      }
    },
    "evaluationQuery": {
      "description": "Determines the policy rule to be used for the evaluation of the relationship.",
      "type": "string",
      "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
      "x-order": 6,
      "x-oapi-codegen-extra-tags": {
        "yaml": "evaluationQuery",
        "json": "evaluationQuery"
      }
    },
    "metadata": {
      "type": "object",
      "description": "Metadata contains additional information associated with the Relationship.",
      "properties": {
        "description": {
          "description": "Description of the Relationship.",
          "type": "string",
          "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
          "x-order": 1,
          "x-oapi-codegen-extra-tags": {
            "yaml": "description",
            "json": "description"
          }
        }
      },
      "x-order": 7
    },
    "model": {
      "description": "Model of the Relationship.",
      "$id": "https://schemas.meshery.io/model.json",
      "$schema": "http://json-schema.org/draft-07/schema#",
      "additionalProperties": false,
      "type": "object",
      "properties": {
        "id": {
          "description": "Uniquely identifies the entity (i.e. component) as defined in a declaration (i.e. design).",
          "x-order": 1,
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
          "type": "string",
          "description": "The unique name for the model within the scope of a registrant.",
          "helperText": "Model name should be in lowercase with hyphens, not whitespaces.",
          "pattern": "^[a-z0-9-]+$",
          "examples": [
            "cert-manager"
          ],
          "x-order": 4,
          "x-oapi-codegen-extra-tags": {
            "yaml": "name",
            "json": "name"
          }
        },
        "displayName": {
          "description": "Human-readable name for the model.",
          "helperText": "Model display name should be a friendly name for your model.",
          "minLength": 1,
          "maxLength": 100,
          "type": "string",
          "pattern": "^[a-zA-Z0-9 ]+$",
          "examples": [
            "Cert Manager"
          ],
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
        "category": {
          "type": "object",
          "description": "Determines the main grouping of the model.",
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
              "x-order": 2,
              "type": "string",
              "minLength": 1,
              "maxLength": 100,
              "x-oapi-codegen-extra-tags": {
                "yaml": "name",
                "json": "name"
              },
              "description": "The category of the model that determines the main grouping.",
              "enum": [
                "Analytics",
                "App Definition and Development",
                "Cloud Native Network",
                "Cloud Native Storage",
                "Database",
                "Machine Learning",
                "Observability and Analysis",
                "Orchestration & Management",
                "Platform",
                "Provisioning",
                "Runtime",
                "Security & Compliance",
                "Serverless",
                "Tools",
                "Uncategorized"
              ]
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
          "x-order": 9,
          "x-oapi-codegen-extra-tags": {
            "yaml": "category",
            "json": "category",
            "gorm": "foreignKey:CategoryId;references:Id"
          }
        },
        "subCategory": {
          "x-order": 10,
          "type": "string",
          "minLength": 1,
          "maxLength": 100,
          "x-oapi-codegen-extra-tags": {
            "yaml": "subCategory",
            "json": "subCategory"
          },
          "description": "The sub-category of the model that determines the secondary grouping.",
          "enum": [
            "API Gateway",
            "API Integration",
            "Application Definition & Image Build",
            "Automation & Configuration",
            "Certified Kubernetes - Distribution",
            "Chaos Engineering",
            "Cloud Native Storage",
            "Cloud Provider",
            "CNI",
            "Compute",
            "Container Registry",
            "Container Runtime",
            "Container Security",
            "Container",
            "Content Delivery Network",
            "Continuous Integration & Delivery",
            "Coordination & Service Discovery",
            "Database",
            "Flowchart",
            "Framework",
            "Installable Platform",
            "Key Management",
            "Key Management Service",
            "Kubernetes",
            "Logging",
            "Machine Learning",
            "Management Governance",
            "Metrics",
            "Monitoring",
            "Networking Content Delivery",
            "Operating System",
            "Query",
            "Remote Procedure Call",
            "Scheduling & Orchestration",
            "Secrets Management",
            "Security Identity & Compliance",
            "Service Mesh",
            "Service Proxy",
            "Source Version Control",
            "Storage",
            "Specifications",
            "Streaming & Messaging",
            "Tools",
            "Tracing",
            "Uncategorized",
            "Video Conferencing"
          ]
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
            },
            "shape": {
              "x-order": 8,
              "type": "string",
              "description": "The shape of the node’s body. Note that each shape fits within the specified width and height, and so you may have to adjust width and height if you desire an equilateral shape (i.e. width !== height for several equilateral shapes)",
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
              ],
              "x-oapi-codegen-extra-tags": {
                "yaml": "shape",
                "json": "shape"
              }
            },
            "sourceUri": {
              "type": "string",
              "description": "URI to the source code or package of the model.",
              "oneOf": [
                {
                  "title": "GitHub",
                  "type": "string",
                  "pattern": "^git://github\\.com/[\\w.-]+/[\\w.-]+(/[\\w.-]+/[\\w/-]+)?$",
                  "description": "Git protocol URL for GitHub repository or specific resource path",
                  "examples": [
                    "git://github.com/cert-manager/cert-manager/master/deploy/crds"
                  ],
                  "metadata": {
                    "uiType": "url",
                    "validationHint": "Enter a git protocol URL (e.g., git://github.com/owner/repo)"
                  }
                },
                {
                  "title": "Artifact Hub",
                  "type": "string",
                  "pattern": "^https:\\/\\/artifacthub\\.io\\/packages\\/(search\\?ts_query_web=[\\w.-]+|[\\w.-]+\\/[\\w.-]+\\/[\\w.-]+)$",
                  "description": "Artifact Hub package URL or search query URL with model name parameter",
                  "examples": [
                    "https://artifacthub.io/packages/search?ts_query_web={model-name}"
                  ],
                  "metadata": {
                    "uiType": "url",
                    "validationHint": "Enter an Artifact Hub URL (e.g., https://artifacthub.io/packages/search?ts_query_web={meshery-operator})"
                  }
                }
              ],
              "x-order": 9,
              "x-oapi-codegen-extra-tags": {
                "yaml": "sourceUri",
                "json": "sourceUri"
              },
              "metadata": {
                "uiType": "url",
                "urlValidation": true,
                "validationHint": "Enter either a git:// GitHub URL or an Artifact Hub URL"
              }
            }
          },
          "x-oapi-codegen-extra-tags": {
            "gorm": "type:bytes;serializer:json"
          },
          "x-order": 11,
          "additionalProperties": true
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
              "x-order": 1,
              "type": "string",
              "minLength": 5,
              "maxLength": 100,
              "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
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
      "x-order": 8
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
                      "description": "Model of the component. Learn more at https://docs.meshery.io/concepts/models",
                      "$id": "https://schemas.meshery.io/model.json",
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "additionalProperties": false,
                      "type": "object",
                      "properties": {
                        "id": {
                          "description": "Uniquely identifies the entity (i.e. component) as defined in a declaration (i.e. design).",
                          "x-order": 1,
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
                          "type": "string",
                          "description": "The unique name for the model within the scope of a registrant.",
                          "helperText": "Model name should be in lowercase with hyphens, not whitespaces.",
                          "pattern": "^[a-z0-9-]+$",
                          "examples": [
                            "cert-manager"
                          ],
                          "x-order": 4,
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "name",
                            "json": "name"
                          }
                        },
                        "displayName": {
                          "description": "Human-readable name for the model.",
                          "helperText": "Model display name should be a friendly name for your model.",
                          "minLength": 1,
                          "maxLength": 100,
                          "type": "string",
                          "pattern": "^[a-zA-Z0-9 ]+$",
                          "examples": [
                            "Cert Manager"
                          ],
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
                        "category": {
                          "type": "object",
                          "description": "Determines the main grouping of the model.",
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
                              "x-order": 2,
                              "type": "string",
                              "minLength": 1,
                              "maxLength": 100,
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "name",
                                "json": "name"
                              },
                              "description": "The category of the model that determines the main grouping.",
                              "enum": [
                                "Analytics",
                                "App Definition and Development",
                                "Cloud Native Network",
                                "Cloud Native Storage",
                                "Database",
                                "Machine Learning",
                                "Observability and Analysis",
                                "Orchestration & Management",
                                "Platform",
                                "Provisioning",
                                "Runtime",
                                "Security & Compliance",
                                "Serverless",
                                "Tools",
                                "Uncategorized"
                              ]
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
                          "x-order": 9,
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "category",
                            "json": "category",
                            "gorm": "foreignKey:CategoryId;references:Id"
                          }
                        },
                        "subCategory": {
                          "x-order": 10,
                          "type": "string",
                          "minLength": 1,
                          "maxLength": 100,
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "subCategory",
                            "json": "subCategory"
                          },
                          "description": "The sub-category of the model that determines the secondary grouping.",
                          "enum": [
                            "API Gateway",
                            "API Integration",
                            "Application Definition & Image Build",
                            "Automation & Configuration",
                            "Certified Kubernetes - Distribution",
                            "Chaos Engineering",
                            "Cloud Native Storage",
                            "Cloud Provider",
                            "CNI",
                            "Compute",
                            "Container Registry",
                            "Container Runtime",
                            "Container Security",
                            "Container",
                            "Content Delivery Network",
                            "Continuous Integration & Delivery",
                            "Coordination & Service Discovery",
                            "Database",
                            "Flowchart",
                            "Framework",
                            "Installable Platform",
                            "Key Management",
                            "Key Management Service",
                            "Kubernetes",
                            "Logging",
                            "Machine Learning",
                            "Management Governance",
                            "Metrics",
                            "Monitoring",
                            "Networking Content Delivery",
                            "Operating System",
                            "Query",
                            "Remote Procedure Call",
                            "Scheduling & Orchestration",
                            "Secrets Management",
                            "Security Identity & Compliance",
                            "Service Mesh",
                            "Service Proxy",
                            "Source Version Control",
                            "Storage",
                            "Specifications",
                            "Streaming & Messaging",
                            "Tools",
                            "Tracing",
                            "Uncategorized",
                            "Video Conferencing"
                          ]
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
                            },
                            "shape": {
                              "x-order": 8,
                              "type": "string",
                              "description": "The shape of the node’s body. Note that each shape fits within the specified width and height, and so you may have to adjust width and height if you desire an equilateral shape (i.e. width !== height for several equilateral shapes)",
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
                              ],
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "shape",
                                "json": "shape"
                              }
                            },
                            "sourceUri": {
                              "type": "string",
                              "description": "URI to the source code or package of the model.",
                              "oneOf": [
                                {
                                  "title": "GitHub",
                                  "type": "string",
                                  "pattern": "^git://github\\.com/[\\w.-]+/[\\w.-]+(/[\\w.-]+/[\\w/-]+)?$",
                                  "description": "Git protocol URL for GitHub repository or specific resource path",
                                  "examples": [
                                    "git://github.com/cert-manager/cert-manager/master/deploy/crds"
                                  ],
                                  "metadata": {
                                    "uiType": "url",
                                    "validationHint": "Enter a git protocol URL (e.g., git://github.com/owner/repo)"
                                  }
                                },
                                {
                                  "title": "Artifact Hub",
                                  "type": "string",
                                  "pattern": "^https:\\/\\/artifacthub\\.io\\/packages\\/(search\\?ts_query_web=[\\w.-]+|[\\w.-]+\\/[\\w.-]+\\/[\\w.-]+)$",
                                  "description": "Artifact Hub package URL or search query URL with model name parameter",
                                  "examples": [
                                    "https://artifacthub.io/packages/search?ts_query_web={model-name}"
                                  ],
                                  "metadata": {
                                    "uiType": "url",
                                    "validationHint": "Enter an Artifact Hub URL (e.g., https://artifacthub.io/packages/search?ts_query_web={meshery-operator})"
                                  }
                                }
                              ],
                              "x-order": 9,
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "sourceUri",
                                "json": "sourceUri"
                              },
                              "metadata": {
                                "uiType": "url",
                                "urlValidation": true,
                                "validationHint": "Enter either a git:// GitHub URL or an Artifact Hub URL"
                              }
                            }
                          },
                          "x-oapi-codegen-extra-tags": {
                            "gorm": "type:bytes;serializer:json"
                          },
                          "x-order": 11,
                          "additionalProperties": true
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
                              "x-order": 1,
                              "type": "string",
                              "minLength": 5,
                              "maxLength": 100,
                              "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
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
                    "version": {
                      "type": "string",
                      "minLength": 5,
                      "maxLength": 100,
                      "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$",
                      "description": "A valid semantic version string between 5 and 256 characters. The pattern allows for a major.minor.patch version followed by an optional pre-release tag like '-alpha' or '-beta.2' and an optional build metadata tag like '+build.1.",
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
                      "description": "Model of the component. Learn more at https://docs.meshery.io/concepts/models",
                      "$id": "https://schemas.meshery.io/model.json",
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "additionalProperties": false,
                      "type": "object",
                      "properties": {
                        "id": {
                          "description": "Uniquely identifies the entity (i.e. component) as defined in a declaration (i.e. design).",
                          "x-order": 1,
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
                          "type": "string",
                          "description": "The unique name for the model within the scope of a registrant.",
                          "helperText": "Model name should be in lowercase with hyphens, not whitespaces.",
                          "pattern": "^[a-z0-9-]+$",
                          "examples": [
                            "cert-manager"
                          ],
                          "x-order": 4,
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "name",
                            "json": "name"
                          }
                        },
                        "displayName": {
                          "description": "Human-readable name for the model.",
                          "helperText": "Model display name should be a friendly name for your model.",
                          "minLength": 1,
                          "maxLength": 100,
                          "type": "string",
                          "pattern": "^[a-zA-Z0-9 ]+$",
                          "examples": [
                            "Cert Manager"
                          ],
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
                        "category": {
                          "type": "object",
                          "description": "Determines the main grouping of the model.",
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
                              "x-order": 2,
                              "type": "string",
                              "minLength": 1,
                              "maxLength": 100,
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "name",
                                "json": "name"
                              },
                              "description": "The category of the model that determines the main grouping.",
                              "enum": [
                                "Analytics",
                                "App Definition and Development",
                                "Cloud Native Network",
                                "Cloud Native Storage",
                                "Database",
                                "Machine Learning",
                                "Observability and Analysis",
                                "Orchestration & Management",
                                "Platform",
                                "Provisioning",
                                "Runtime",
                                "Security & Compliance",
                                "Serverless",
                                "Tools",
                                "Uncategorized"
                              ]
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
                          "x-order": 9,
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "category",
                            "json": "category",
                            "gorm": "foreignKey:CategoryId;references:Id"
                          }
                        },
                        "subCategory": {
                          "x-order": 10,
                          "type": "string",
                          "minLength": 1,
                          "maxLength": 100,
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "subCategory",
                            "json": "subCategory"
                          },
                          "description": "The sub-category of the model that determines the secondary grouping.",
                          "enum": [
                            "API Gateway",
                            "API Integration",
                            "Application Definition & Image Build",
                            "Automation & Configuration",
                            "Certified Kubernetes - Distribution",
                            "Chaos Engineering",
                            "Cloud Native Storage",
                            "Cloud Provider",
                            "CNI",
                            "Compute",
                            "Container Registry",
                            "Container Runtime",
                            "Container Security",
                            "Container",
                            "Content Delivery Network",
                            "Continuous Integration & Delivery",
                            "Coordination & Service Discovery",
                            "Database",
                            "Flowchart",
                            "Framework",
                            "Installable Platform",
                            "Key Management",
                            "Key Management Service",
                            "Kubernetes",
                            "Logging",
                            "Machine Learning",
                            "Management Governance",
                            "Metrics",
                            "Monitoring",
                            "Networking Content Delivery",
                            "Operating System",
                            "Query",
                            "Remote Procedure Call",
                            "Scheduling & Orchestration",
                            "Secrets Management",
                            "Security Identity & Compliance",
                            "Service Mesh",
                            "Service Proxy",
                            "Source Version Control",
                            "Storage",
                            "Specifications",
                            "Streaming & Messaging",
                            "Tools",
                            "Tracing",
                            "Uncategorized",
                            "Video Conferencing"
                          ]
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
                            },
                            "shape": {
                              "x-order": 8,
                              "type": "string",
                              "description": "The shape of the node’s body. Note that each shape fits within the specified width and height, and so you may have to adjust width and height if you desire an equilateral shape (i.e. width !== height for several equilateral shapes)",
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
                              ],
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "shape",
                                "json": "shape"
                              }
                            },
                            "sourceUri": {
                              "type": "string",
                              "description": "URI to the source code or package of the model.",
                              "oneOf": [
                                {
                                  "title": "GitHub",
                                  "type": "string",
                                  "pattern": "^git://github\\.com/[\\w.-]+/[\\w.-]+(/[\\w.-]+/[\\w/-]+)?$",
                                  "description": "Git protocol URL for GitHub repository or specific resource path",
                                  "examples": [
                                    "git://github.com/cert-manager/cert-manager/master/deploy/crds"
                                  ],
                                  "metadata": {
                                    "uiType": "url",
                                    "validationHint": "Enter a git protocol URL (e.g., git://github.com/owner/repo)"
                                  }
                                },
                                {
                                  "title": "Artifact Hub",
                                  "type": "string",
                                  "pattern": "^https:\\/\\/artifacthub\\.io\\/packages\\/(search\\?ts_query_web=[\\w.-]+|[\\w.-]+\\/[\\w.-]+\\/[\\w.-]+)$",
                                  "description": "Artifact Hub package URL or search query URL with model name parameter",
                                  "examples": [
                                    "https://artifacthub.io/packages/search?ts_query_web={model-name}"
                                  ],
                                  "metadata": {
                                    "uiType": "url",
                                    "validationHint": "Enter an Artifact Hub URL (e.g., https://artifacthub.io/packages/search?ts_query_web={meshery-operator})"
                                  }
                                }
                              ],
                              "x-order": 9,
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "sourceUri",
                                "json": "sourceUri"
                              },
                              "metadata": {
                                "uiType": "url",
                                "urlValidation": true,
                                "validationHint": "Enter either a git:// GitHub URL or an Artifact Hub URL"
                              }
                            }
                          },
                          "x-oapi-codegen-extra-tags": {
                            "gorm": "type:bytes;serializer:json"
                          },
                          "x-order": 11,
                          "additionalProperties": true
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
                              "x-order": 1,
                              "type": "string",
                              "minLength": 5,
                              "maxLength": 100,
                              "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
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
                    "version": {
                      "type": "string",
                      "minLength": 5,
                      "maxLength": 100,
                      "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$",
                      "description": "A valid semantic version string between 5 and 256 characters. The pattern allows for a major.minor.patch version followed by an optional pre-release tag like '-alpha' or '-beta.2' and an optional build metadata tag like '+build.1.",
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
            "description": "Selectors used to define relationships which are allowed.",
            "required": [
              "to",
              "from"
            ],
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
                      "description": "Model of the component. Learn more at https://docs.meshery.io/concepts/models",
                      "$id": "https://schemas.meshery.io/model.json",
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "additionalProperties": false,
                      "type": "object",
                      "properties": {
                        "id": {
                          "description": "Uniquely identifies the entity (i.e. component) as defined in a declaration (i.e. design).",
                          "x-order": 1,
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
                          "type": "string",
                          "description": "The unique name for the model within the scope of a registrant.",
                          "helperText": "Model name should be in lowercase with hyphens, not whitespaces.",
                          "pattern": "^[a-z0-9-]+$",
                          "examples": [
                            "cert-manager"
                          ],
                          "x-order": 4,
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "name",
                            "json": "name"
                          }
                        },
                        "displayName": {
                          "description": "Human-readable name for the model.",
                          "helperText": "Model display name should be a friendly name for your model.",
                          "minLength": 1,
                          "maxLength": 100,
                          "type": "string",
                          "pattern": "^[a-zA-Z0-9 ]+$",
                          "examples": [
                            "Cert Manager"
                          ],
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
                        "category": {
                          "type": "object",
                          "description": "Determines the main grouping of the model.",
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
                              "x-order": 2,
                              "type": "string",
                              "minLength": 1,
                              "maxLength": 100,
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "name",
                                "json": "name"
                              },
                              "description": "The category of the model that determines the main grouping.",
                              "enum": [
                                "Analytics",
                                "App Definition and Development",
                                "Cloud Native Network",
                                "Cloud Native Storage",
                                "Database",
                                "Machine Learning",
                                "Observability and Analysis",
                                "Orchestration & Management",
                                "Platform",
                                "Provisioning",
                                "Runtime",
                                "Security & Compliance",
                                "Serverless",
                                "Tools",
                                "Uncategorized"
                              ]
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
                          "x-order": 9,
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "category",
                            "json": "category",
                            "gorm": "foreignKey:CategoryId;references:Id"
                          }
                        },
                        "subCategory": {
                          "x-order": 10,
                          "type": "string",
                          "minLength": 1,
                          "maxLength": 100,
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "subCategory",
                            "json": "subCategory"
                          },
                          "description": "The sub-category of the model that determines the secondary grouping.",
                          "enum": [
                            "API Gateway",
                            "API Integration",
                            "Application Definition & Image Build",
                            "Automation & Configuration",
                            "Certified Kubernetes - Distribution",
                            "Chaos Engineering",
                            "Cloud Native Storage",
                            "Cloud Provider",
                            "CNI",
                            "Compute",
                            "Container Registry",
                            "Container Runtime",
                            "Container Security",
                            "Container",
                            "Content Delivery Network",
                            "Continuous Integration & Delivery",
                            "Coordination & Service Discovery",
                            "Database",
                            "Flowchart",
                            "Framework",
                            "Installable Platform",
                            "Key Management",
                            "Key Management Service",
                            "Kubernetes",
                            "Logging",
                            "Machine Learning",
                            "Management Governance",
                            "Metrics",
                            "Monitoring",
                            "Networking Content Delivery",
                            "Operating System",
                            "Query",
                            "Remote Procedure Call",
                            "Scheduling & Orchestration",
                            "Secrets Management",
                            "Security Identity & Compliance",
                            "Service Mesh",
                            "Service Proxy",
                            "Source Version Control",
                            "Storage",
                            "Specifications",
                            "Streaming & Messaging",
                            "Tools",
                            "Tracing",
                            "Uncategorized",
                            "Video Conferencing"
                          ]
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
                            },
                            "shape": {
                              "x-order": 8,
                              "type": "string",
                              "description": "The shape of the node’s body. Note that each shape fits within the specified width and height, and so you may have to adjust width and height if you desire an equilateral shape (i.e. width !== height for several equilateral shapes)",
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
                              ],
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "shape",
                                "json": "shape"
                              }
                            },
                            "sourceUri": {
                              "type": "string",
                              "description": "URI to the source code or package of the model.",
                              "oneOf": [
                                {
                                  "title": "GitHub",
                                  "type": "string",
                                  "pattern": "^git://github\\.com/[\\w.-]+/[\\w.-]+(/[\\w.-]+/[\\w/-]+)?$",
                                  "description": "Git protocol URL for GitHub repository or specific resource path",
                                  "examples": [
                                    "git://github.com/cert-manager/cert-manager/master/deploy/crds"
                                  ],
                                  "metadata": {
                                    "uiType": "url",
                                    "validationHint": "Enter a git protocol URL (e.g., git://github.com/owner/repo)"
                                  }
                                },
                                {
                                  "title": "Artifact Hub",
                                  "type": "string",
                                  "pattern": "^https:\\/\\/artifacthub\\.io\\/packages\\/(search\\?ts_query_web=[\\w.-]+|[\\w.-]+\\/[\\w.-]+\\/[\\w.-]+)$",
                                  "description": "Artifact Hub package URL or search query URL with model name parameter",
                                  "examples": [
                                    "https://artifacthub.io/packages/search?ts_query_web={model-name}"
                                  ],
                                  "metadata": {
                                    "uiType": "url",
                                    "validationHint": "Enter an Artifact Hub URL (e.g., https://artifacthub.io/packages/search?ts_query_web={meshery-operator})"
                                  }
                                }
                              ],
                              "x-order": 9,
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "sourceUri",
                                "json": "sourceUri"
                              },
                              "metadata": {
                                "uiType": "url",
                                "urlValidation": true,
                                "validationHint": "Enter either a git:// GitHub URL or an Artifact Hub URL"
                              }
                            }
                          },
                          "x-oapi-codegen-extra-tags": {
                            "gorm": "type:bytes;serializer:json"
                          },
                          "x-order": 11,
                          "additionalProperties": true
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
                              "x-order": 1,
                              "type": "string",
                              "minLength": 5,
                              "maxLength": 100,
                              "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
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
                    "version": {
                      "type": "string",
                      "minLength": 5,
                      "maxLength": 100,
                      "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$",
                      "description": "A valid semantic version string between 5 and 256 characters. The pattern allows for a major.minor.patch version followed by an optional pre-release tag like '-alpha' or '-beta.2' and an optional build metadata tag like '+build.1.",
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
                      "description": "Model of the component. Learn more at https://docs.meshery.io/concepts/models",
                      "$id": "https://schemas.meshery.io/model.json",
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "additionalProperties": false,
                      "type": "object",
                      "properties": {
                        "id": {
                          "description": "Uniquely identifies the entity (i.e. component) as defined in a declaration (i.e. design).",
                          "x-order": 1,
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
                          "type": "string",
                          "description": "The unique name for the model within the scope of a registrant.",
                          "helperText": "Model name should be in lowercase with hyphens, not whitespaces.",
                          "pattern": "^[a-z0-9-]+$",
                          "examples": [
                            "cert-manager"
                          ],
                          "x-order": 4,
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "name",
                            "json": "name"
                          }
                        },
                        "displayName": {
                          "description": "Human-readable name for the model.",
                          "helperText": "Model display name should be a friendly name for your model.",
                          "minLength": 1,
                          "maxLength": 100,
                          "type": "string",
                          "pattern": "^[a-zA-Z0-9 ]+$",
                          "examples": [
                            "Cert Manager"
                          ],
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
                        "category": {
                          "type": "object",
                          "description": "Determines the main grouping of the model.",
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
                              "x-order": 2,
                              "type": "string",
                              "minLength": 1,
                              "maxLength": 100,
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "name",
                                "json": "name"
                              },
                              "description": "The category of the model that determines the main grouping.",
                              "enum": [
                                "Analytics",
                                "App Definition and Development",
                                "Cloud Native Network",
                                "Cloud Native Storage",
                                "Database",
                                "Machine Learning",
                                "Observability and Analysis",
                                "Orchestration & Management",
                                "Platform",
                                "Provisioning",
                                "Runtime",
                                "Security & Compliance",
                                "Serverless",
                                "Tools",
                                "Uncategorized"
                              ]
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
                          "x-order": 9,
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "category",
                            "json": "category",
                            "gorm": "foreignKey:CategoryId;references:Id"
                          }
                        },
                        "subCategory": {
                          "x-order": 10,
                          "type": "string",
                          "minLength": 1,
                          "maxLength": 100,
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "subCategory",
                            "json": "subCategory"
                          },
                          "description": "The sub-category of the model that determines the secondary grouping.",
                          "enum": [
                            "API Gateway",
                            "API Integration",
                            "Application Definition & Image Build",
                            "Automation & Configuration",
                            "Certified Kubernetes - Distribution",
                            "Chaos Engineering",
                            "Cloud Native Storage",
                            "Cloud Provider",
                            "CNI",
                            "Compute",
                            "Container Registry",
                            "Container Runtime",
                            "Container Security",
                            "Container",
                            "Content Delivery Network",
                            "Continuous Integration & Delivery",
                            "Coordination & Service Discovery",
                            "Database",
                            "Flowchart",
                            "Framework",
                            "Installable Platform",
                            "Key Management",
                            "Key Management Service",
                            "Kubernetes",
                            "Logging",
                            "Machine Learning",
                            "Management Governance",
                            "Metrics",
                            "Monitoring",
                            "Networking Content Delivery",
                            "Operating System",
                            "Query",
                            "Remote Procedure Call",
                            "Scheduling & Orchestration",
                            "Secrets Management",
                            "Security Identity & Compliance",
                            "Service Mesh",
                            "Service Proxy",
                            "Source Version Control",
                            "Storage",
                            "Specifications",
                            "Streaming & Messaging",
                            "Tools",
                            "Tracing",
                            "Uncategorized",
                            "Video Conferencing"
                          ]
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
                            },
                            "shape": {
                              "x-order": 8,
                              "type": "string",
                              "description": "The shape of the node’s body. Note that each shape fits within the specified width and height, and so you may have to adjust width and height if you desire an equilateral shape (i.e. width !== height for several equilateral shapes)",
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
                              ],
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "shape",
                                "json": "shape"
                              }
                            },
                            "sourceUri": {
                              "type": "string",
                              "description": "URI to the source code or package of the model.",
                              "oneOf": [
                                {
                                  "title": "GitHub",
                                  "type": "string",
                                  "pattern": "^git://github\\.com/[\\w.-]+/[\\w.-]+(/[\\w.-]+/[\\w/-]+)?$",
                                  "description": "Git protocol URL for GitHub repository or specific resource path",
                                  "examples": [
                                    "git://github.com/cert-manager/cert-manager/master/deploy/crds"
                                  ],
                                  "metadata": {
                                    "uiType": "url",
                                    "validationHint": "Enter a git protocol URL (e.g., git://github.com/owner/repo)"
                                  }
                                },
                                {
                                  "title": "Artifact Hub",
                                  "type": "string",
                                  "pattern": "^https:\\/\\/artifacthub\\.io\\/packages\\/(search\\?ts_query_web=[\\w.-]+|[\\w.-]+\\/[\\w.-]+\\/[\\w.-]+)$",
                                  "description": "Artifact Hub package URL or search query URL with model name parameter",
                                  "examples": [
                                    "https://artifacthub.io/packages/search?ts_query_web={model-name}"
                                  ],
                                  "metadata": {
                                    "uiType": "url",
                                    "validationHint": "Enter an Artifact Hub URL (e.g., https://artifacthub.io/packages/search?ts_query_web={meshery-operator})"
                                  }
                                }
                              ],
                              "x-order": 9,
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "sourceUri",
                                "json": "sourceUri"
                              },
                              "metadata": {
                                "uiType": "url",
                                "urlValidation": true,
                                "validationHint": "Enter either a git:// GitHub URL or an Artifact Hub URL"
                              }
                            }
                          },
                          "x-oapi-codegen-extra-tags": {
                            "gorm": "type:bytes;serializer:json"
                          },
                          "x-order": 11,
                          "additionalProperties": true
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
                              "x-order": 1,
                              "type": "string",
                              "minLength": 5,
                              "maxLength": 100,
                              "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
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
                    "version": {
                      "type": "string",
                      "minLength": 5,
                      "maxLength": 100,
                      "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$",
                      "description": "A valid semantic version string between 5 and 256 characters. The pattern allows for a major.minor.patch version followed by an optional pre-release tag like '-alpha' or '-beta.2' and an optional build metadata tag like '+build.1.",
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
      "x-order": 9
    }
  }
}

export default schema;
