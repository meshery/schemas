// Generated from constructs/v1beta1/design/design.json
// This file exports the original JSON schema

const schema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Design Schema",
  "description": "Designs are your primary tool for collaborative authorship of your infrastructure, workflow, and processes.",
  "type": "object",
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
      "description": "Name of the design; a descriptive, but concise title for the design document.",
      "x-order": 2,
      "x-oapi-codegen-extra-tags": {
        "yaml": "name",
        "json": "name"
      }
    },
    "schemaVersion": {
      "description": "Specifies the version of the schema to which the design conforms.",
      "x-order": 3,
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
      }
    },
    "version": {
      "x-order": 4,
      "description": "Revision of the design as expressed by an auto-incremented, SemVer-compliant version number. May be manually set by a user or third-party system, but will always be required to be of version number higher than the previously defined version number.",
      "minLength": 1,
      "maxLength": 50,
      "type": "string",
      "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$",
      "x-oapi-codegen-extra-tags": {
        "yaml": "version",
        "json": "version"
      }
    },
    "metadata": {
      "type": "object",
      "x-order": 5,
      "additionalProperties": true,
      "properties": {
        "resolvedAliases": {
          "description": "Map of resolved aliases present in the design",
          "type": "object",
          "x-go-type": "map[string]core.ResolvedAlias",
          "x-go-type-import": {
            "path": "github.com/meshery/schemas/models/v1alpha1/core"
          },
          "additionalProperties": {
            "description": "An resolved alias is an component that acts as an ref/pointer to a field in another component, resolvedAlias are aware of there immediate parents and completely resolved parents also",
            "allOf": [
              {
                "description": "An alias is an component that acts as an ref/pointer to a field in another component, nonResolvedAlias are not aware of there immediate parents",
                "type": "object",
                "properties": {
                  "relationship_id": {
                    "type": "string",
                    "format": "uuid",
                    "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  },
                  "alias_component_id": {
                    "type": "string",
                    "format": "uuid",
                    "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  },
                  "immediate_parent_id": {
                    "type": "string",
                    "format": "uuid",
                    "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  },
                  "immediate_ref_field_path": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  }
                },
                "required": [
                  "relationship_id",
                  "alias_component_id",
                  "immediate_parent_id",
                  "immediate_ref_field_path"
                ]
              },
              {
                "type": "object",
                "properties": {
                  "resolved_parent_id": {
                    "type": "string",
                    "format": "uuid",
                    "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  },
                  "resolved_ref_field_path": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  }
                },
                "required": [
                  "resolved_parent_id",
                  "resolved_ref_field_path"
                ]
              }
            ]
          },
          "x-order": 1,
          "x-oapi-codegen-extra-tags": {
            "yaml": "resolvedAliases",
            "json": "resolvedAliases"
          }
        }
      }
    },
    "components": {
      "description": "A list of one or more component declarations.",
      "minItems": 0,
      "x-order": 6,
      "type": "array",
      "items": {
        "x-go-type": "*component.ComponentDefinition",
        "x-go-type-import": {
          "path": "github.com/meshery/schemas/models/v1beta1/component"
        },
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
                    "default": "Uncategorized",
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
                    ],
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
                "x-order": 12,
                "x-go-type": "subcategory.SubCategoryDefinition",
                "x-go-type-import": {
                  "path": "github.com/meshery/schemas/models/v1beta1/subcategory"
                },
                "$id": "https://schemas.meshery.io/category.json",
                "$schema": "http://json-schema.org/draft-07/schema#",
                "type": "string",
                "title": "SubCategory",
                "description": "Sub category of the model determines the secondary grouping.",
                "default": "Uncategorized",
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
                ],
                "minLength": 1,
                "maxLength": 100,
                "x-oapi-codegen-extra-tags": {
                  "yaml": "subCategory",
                  "json": "subCategory"
                }
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
                    "default": "#00b39f",
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
                    "default": "#00D3A9",
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
                    "default": "circle",
                    "enum": [
                      "circle",
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
    },
    "preferences": {
      "type": "object",
      "description": "Design-level preferences",
      "x-order": 7,
      "properties": {
        "layers": {
          "type": "object",
          "description": "List of available layers",
          "x-order": 1,
          "x-oapi-codegen-extra-tags": {
            "yaml": "layers",
            "json": "layers"
          }
        }
      },
      "required": [
        "layers"
      ]
    },
    "relationships": {
      "description": "List of relationships between components",
      "type": "array",
      "x-order": 8,
      "items": {
        "x-go-type": "*relationship.RelationshipDefinition",
        "x-go-type-import": {
          "path": "github.com/meshery/schemas/models/v1alpha3/relationship"
        },
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
            "x-order": 2
          },
          "version": {
            "description": "Specifies the version of the relationship definition.",
            "type": "string",
            "minLength": 5,
            "maxLength": 100,
            "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$",
            "x-oapi-codegen-extra-tags": {
              "yaml": "version",
              "json": "version"
            },
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
    }
  },
  "required": [
    "id",
    "name",
    "schemaVersion",
    "version",
    "components",
    "relationships"
  ]
}

export default schema;
