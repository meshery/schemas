// Generated from constructs/v1beta1/model/model.json
// This file exports the original JSON schema

const schema = {
  "$id": "https://schemas.meshery.io/model.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "Meshery Models serve as a portable unit of packaging to define managed entities, their relationships, and capabilities.",
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
      },
      "default": "00000000-00000000-00000000-00000000"
    },
    "schemaVersion": {
      "description": "Specifies the version of the schema used for the definition.",
      "x-order": 2,
      "x-oapi-codegen-extra-tags": {
        "yaml": "schemaVersion",
        "json": "schemaVersion"
      },
      "default": "v1beta1",
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
      "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$",
      "default": "v0.0.1"
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
      },
      "default": "untitled-model"
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
      },
      "default": "Untitled Model"
    },
    "description": {
      "type": "string",
      "default": "A new Meshery model.",
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
      },
      "default": "enabled"
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
          "default": "00000000-00000000-00000000-00000000",
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
          },
          "default": "00000000-00000000-00000000-00000000"
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
          },
          "default": "00000000-00000000-00000000-00000000"
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
      },
      "default": "00000000-00000000-00000000-00000000"
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
      },
      "default": "00000000-00000000-00000000-00000000"
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
          "default": "00000000-00000000-00000000-00000000",
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
          "x-order": 2,
          "default": false
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
          "x-order": 5,
          "default": "<svg width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M16.405 8.732v6.57l5.694-3.297-5.694-3.273Zm0 7.942v6.602l5.747-3.285-5.747-3.317Z\" fill=\"#fff\"/><path d=\"M15.586 15.256v-6.47l-5.622 3.225 5.622 3.245ZM4.307 23.252a13.809 13.809 0 0 0 4.362 4.39v-6.914l-4.362 2.524Zm11.279-.008v-6.52L9.95 19.985l5.636 3.258Z\" fill=\"#fff\" fill-opacity=\".8\"/><path d=\"m9.49 27.23 5.707-3.263-5.707-3.3v6.563Z\" fill=\"#fff\"/><path d=\"M22.54 27.265v-6.553l-5.699 3.259 5.7 3.294Zm5.58-4.773a13.697 13.697 0 0 0 1.612-5.895l-5.934 3.397 4.323 2.498Z\" fill=\"#fff\" fill-opacity=\".8\"/><path d=\"m23.362 19.298 5.728-3.276-5.728-3.291v6.567Z\" fill=\"#fff\"/><path d=\"M22.541 11.315V4.8l-5.673 3.253 5.673 3.262Zm0 7.955v-6.574l-5.685 3.292 5.685 3.281Z\" fill=\"#fff\" fill-opacity=\".8\"/><path d=\"M9.49 12.684v6.622l5.728-3.316-5.728-3.306Z\" fill=\"#fff\"/><path d=\"M15.586 2.25a13.69 13.69 0 0 0-6.037 1.595l6.037 3.463V2.25Z\" fill=\"#fff\" fill-opacity=\".8\"/><path d=\"M9.49 4.756v6.583l5.732-3.288L9.49 4.756Z\" fill=\"#fff\"/><path d=\"M8.669 4.356a13.83 13.83 0 0 0-4.362 4.39l4.362 2.518V4.356Z\" fill=\"#fff\" fill-opacity=\".8\"/><path d=\"M22.504 3.88a13.695 13.695 0 0 0-6.099-1.63v5.123l6.1-3.493ZM2.25 16.483c.071 2.12.634 4.196 1.644 6.062l4.418-2.559-6.062-3.503Zm1.644-7.028a13.68 13.68 0 0 0-1.644 6.036l6.068-3.482-4.424-2.554Z\" fill=\"#fff\"/><path d=\"M9.539 28.147a13.673 13.673 0 0 0 6.047 1.603v-5.062L9.54 28.147Z\" fill=\"#fff\" fill-opacity=\".8\"/><path d=\"M27.697 8.768a13.83 13.83 0 0 0-4.335-4.383v6.889l4.335-2.506ZM23.362 27.62a13.851 13.851 0 0 0 4.351-4.417l-4.351-2.514v6.93Z\" fill=\"#fff\"/><path d=\"M29.75 15.452a13.659 13.659 0 0 0-1.63-5.979l-4.381 2.53 6.011 3.45Z\" fill=\"#fff\" fill-opacity=\".8\"/><path d=\"M16.405 29.75a13.673 13.673 0 0 0 6.036-1.595l-6.036-3.498v5.093Z\" fill=\"#fff\"/><path d=\"M8.669 19.247v-6.494L3.03 15.986l5.639 3.261Z\" fill=\"#fff\" fill-opacity=\".8\"/></svg>"
        },
        "svgColor": {
          "type": "string",
          "description": "SVG representation of the model in colored format.",
          "minLength": 1,
          "x-oapi-codegen-extra-tags": {
            "yaml": "svgColor",
            "json": "svgColor"
          },
          "x-order": 6,
          "default": "<svg xmlns=\"http://www.w3.org/2000/svg\" id=\"Layer_1\" data-name=\"Layer 1\" viewBox=\"0 0 134.95 135.02\"><defs><style>.cls-1{fill:#00d3a9}.cls-2{fill:#00b39f}</style></defs><title>meshery-logo-light</title><polygon points=\"69.49 31.82 69.49 64.07 97.44 47.89 69.49 31.82\" class=\"cls-1\"/><polygon points=\"69.49 70.81 69.49 103.22 97.7 87.09 69.49 70.81\" class=\"cls-1\"/><polygon points=\"65.47 63.85 65.47 32.09 37.87 47.92 65.47 63.85\" class=\"cls-2\"/><path d=\"M10.1,103.1a67.79,67.79,0,0,0,21.41,21.55V90.71Z\" class=\"cls-2\"/><polygon points=\"65.47 103.06 65.47 71.05 37.8 87.07 65.47 103.06\" class=\"cls-2\"/><polygon points=\"35.54 122.63 63.56 106.61 35.54 90.41 35.54 122.63\" class=\"cls-1\"/><polygon points=\"99.61 122.8 99.61 90.63 71.63 106.63 99.61 122.8\" class=\"cls-2\"/><path d=\"M127,99.37a67.22,67.22,0,0,0,7.91-28.94L105.78,87.11Z\" class=\"cls-2\"/><polygon points=\"103.64 83.69 131.76 67.61 103.64 51.45 103.64 83.69\" class=\"cls-1\"/><polygon points=\"99.61 44.5 99.61 12.52 71.76 28.49 99.61 44.5\" class=\"cls-2\"/><polygon points=\"99.61 83.55 99.61 51.28 71.7 67.44 99.61 83.55\" class=\"cls-2\"/><polygon points=\"67.48 135.02 67.49 135.02 67.48 135.02 67.48 135.02\" class=\"cls-2\"/><polygon points=\"35.54 51.22 35.54 83.73 63.66 67.45 35.54 51.22\" class=\"cls-1\"/><path d=\"M65.47,0A67.2,67.2,0,0,0,35.83,7.83l29.64,17Z\" class=\"cls-2\"/><polygon points=\"35.54 12.3 35.54 44.62 63.68 28.48 35.54 12.3\" class=\"cls-1\"/><path d=\"M31.51,10.34A67.89,67.89,0,0,0,10.1,31.89L31.51,44.25Z\" class=\"cls-2\"/><path d=\"M99.43,8A67.23,67.23,0,0,0,69.49,0V25.15Z\" class=\"cls-1\"/><path d=\"M0,69.87A67.27,67.27,0,0,0,8.07,99.63L29.76,87.07Z\" class=\"cls-1\"/><path d=\"M8.07,35.37A67.16,67.16,0,0,0,0,65L29.79,47.91Z\" class=\"cls-1\"/><path d=\"M35.78,127.13A67.13,67.13,0,0,0,65.47,135V110.15Z\" class=\"cls-2\"/><path d=\"M124.92,32a67.9,67.9,0,0,0-21.28-21.52V44.3Z\" class=\"cls-1\"/><path d=\"M103.64,124.54A68,68,0,0,0,125,102.86L103.64,90.52Z\" class=\"cls-1\"/><path d=\"M135,64.81a67.06,67.06,0,0,0-8-29.35L105.49,47.88Z\" class=\"cls-2\"/><path d=\"M69.49,135a67.12,67.12,0,0,0,29.63-7.83L69.49,110Z\" class=\"cls-1\"/><polygon points=\"31.51 83.44 31.51 51.56 3.83 67.43 31.51 83.44\" class=\"cls-2\"/></svg>"
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
              "description": "A valid semantic version string between 5 and 256 characters. The pattern allows for a major.minor.patch version followed by an optional pre-release tag like '-alpha' or '-beta.2' and an optional build metadata tag like '+build.1.",
              "default": "v0.0.1"
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
      },
      "default": 0
    },
    "relationshipsCount": {
      "type": "integer",
      "description": "Number of relationships associated with the model.",
      "x-order": 18,
      "x-oapi-codegen-extra-tags": {
        "gorm": "-",
        "json": "relationshipsCount",
        "yaml": "relationshipsCount"
      },
      "default": 0
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
}

export default schema;
