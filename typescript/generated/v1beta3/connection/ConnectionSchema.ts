/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const ConnectionSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Connection API",
    "description": "API for managing Meshery connections - managed and unmanaged resources tracked by Meshery.",
    "version": "v1beta3",
    "contact": {
      "name": "Meshery Maintainers",
      "email": "maintainers@meshery.io",
      "url": "https://meshery.io"
    },
    "license": {
      "name": "Apache 2.0",
      "url": "https://www.apache.org/licenses/LICENSE-2.0.html"
    }
  },
  "security": [
    {
      "jwt": []
    }
  ],
  "paths": {
    "/api/integrations/connections": {
      "get": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "Connections"
        ],
        "operationId": "getConnections",
        "summary": "Get all connections",
        "description": "Returns a paginated list of connections for the authenticated user with filtering, sorting and pagination support",
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "description": "Page number",
            "required": false,
            "schema": {
              "type": "integer",
              "minimum": 0,
              "default": 0
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "description": "Number of items per page",
            "required": false,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "default": 10
            }
          },
          {
            "name": "search",
            "in": "query",
            "description": "Search term",
            "required": false,
            "schema": {
              "type": "string",
              "maxLength": 500
            }
          },
          {
            "name": "order",
            "in": "query",
            "description": "Sort order",
            "required": false,
            "schema": {
              "type": "string",
              "maxLength": 500
            }
          },
          {
            "name": "orgId",
            "in": "query",
            "description": "Organization ID to scope the request.",
            "required": false,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "name": "filter",
            "in": "query",
            "description": "Filter connections (general filter string)",
            "required": false,
            "schema": {
              "type": "string",
              "maxLength": 500
            }
          },
          {
            "name": "kind",
            "in": "query",
            "description": "Filter by connection kind (e.g., kubernetes, prometheus, grafana)",
            "required": false,
            "schema": {
              "type": "array",
              "items": {
                "type": "string",
                "maxLength": 255
              }
            }
          },
          {
            "name": "status",
            "in": "query",
            "description": "Filter by connection status",
            "required": false,
            "schema": {
              "type": "array",
              "items": {
                "type": "string",
                "description": "Connection Status Value",
                "x-go-name": "ConnectionStatusValue",
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
              }
            }
          },
          {
            "name": "type",
            "in": "query",
            "description": "Filter by connection type",
            "required": false,
            "schema": {
              "type": "array",
              "items": {
                "type": "string",
                "maxLength": 255
              }
            }
          },
          {
            "name": "name",
            "in": "query",
            "description": "Filter by connection name (partial match supported)",
            "required": false,
            "schema": {
              "type": "string",
              "maxLength": 255
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Paginated list of connections with summary information",
            "content": {
              "application/json": {
                "schema": {
                  "description": "Represents a page of connections with meta information about connections count",
                  "additionalProperties": false,
                  "type": "object",
                  "required": [
                    "connections",
                    "totalCount",
                    "page",
                    "pageSize"
                  ],
                  "properties": {
                    "connections": {
                      "type": "array",
                      "description": "List of connections on this page",
                      "x-go-type": "[]*Connection",
                      "items": {
                        "$id": "https://schemas.meshery.io/connection.yaml",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "description": "Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections",
                        "additionalProperties": false,
                        "type": "object",
                        "required": [
                          "id",
                          "schemaVersion",
                          "name",
                          "type",
                          "subType",
                          "kind",
                          "status"
                        ],
                        "properties": {
                          "id": {
                            "description": "Connection ID",
                            "x-order": 1,
                            "x-go-name": "ID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "id"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "name": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "name"
                            },
                            "x-order": 2,
                            "type": "string",
                            "description": "Connection Name",
                            "minLength": 1,
                            "maxLength": 255
                          },
                          "description": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "description",
                              "json": "description"
                            },
                            "x-order": 3,
                            "type": "string",
                            "description": "Human-readable description of the connection and its purpose.",
                            "maxLength": 1000
                          },
                          "url": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "url",
                              "json": "url"
                            },
                            "x-order": 4,
                            "type": "string",
                            "format": "uri",
                            "description": "URL of the remote resource this connection points to (e.g. the Helm repository URL, the Kubernetes API server endpoint, the Grafana instance URL).",
                            "maxLength": 2048
                          },
                          "credentialId": {
                            "x-go-name": "CredentialID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "credential_id",
                              "json": "credentialId"
                            },
                            "x-order": 5,
                            "description": "Associated Credential ID",
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
                              "json": "type",
                              "yaml": "type"
                            },
                            "x-go-name": "ConnectionType",
                            "x-order": 6,
                            "type": "string",
                            "description": "Connection Type (platform, telemetry, collaboration)",
                            "maxLength": 255
                          },
                          "subType": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "sub_type",
                              "json": "subType"
                            },
                            "x-order": 7,
                            "type": "string",
                            "description": "Connection Subtype (cloud, identity, metrics, chat, git, orchestration)",
                            "maxLength": 255
                          },
                          "kind": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "kind"
                            },
                            "x-order": 8,
                            "type": "string",
                            "description": "Connection Kind (meshery, kubernetes, prometheus, grafana, gke, aws, azure, slack, github)",
                            "maxLength": 255
                          },
                          "model": {
                            "x-go-type": "*modelv1beta1.ModelDefinition",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/v1beta1/model",
                              "name": "modelv1beta1"
                            },
                            "x-order": 7,
                            "description": "Reference to the specific registered model to which the component belongs and from which model version, category, and other properties may be referenced. Learn more at https://docs.meshery.io/concepts/models",
                            "x-oapi-codegen-extra-tags": {
                              "gorm": "foreignKey:ModelID;references:ID",
                              "json": "model",
                              "yaml": "model"
                            },
                            "$id": "https://schemas.meshery.io/model.yaml",
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
                                "default": "models.meshery.io/v1beta1",
                                "type": "string",
                                "minLength": 2,
                                "maxLength": 100,
                                "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                                "example": [
                                  "v1",
                                  "v1alpha1",
                                  "v2beta3",
                                  "v1.custom-suffix",
                                  "models.meshery.io/v1beta1",
                                  "capability.meshery.io/v1alpha1"
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
                                },
                                "default": "untitled-model"
                              },
                              "displayName": {
                                "description": "Human-readable name for the model.",
                                "helperText": "Model display name may include letters, numbers, and spaces. Special characters are not allowed.",
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
                                  "yaml": "description,omitempty",
                                  "json": "description,omitempty"
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
                                  "gorm": "foreignKey:RegistrantId;references:ID"
                                },
                                "x-order": 8,
                                "x-go-type": "connectionv1beta1.Connection",
                                "x-go-type-import": {
                                  "path": "github.com/meshery/schemas/models/v1beta1/connection",
                                  "name": "connectionv1beta1"
                                },
                                "$id": "https://schemas.meshery.io/connection.yaml",
                                "$schema": "http://json-schema.org/draft-07/schema#",
                                "description": "Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections",
                                "additionalProperties": false,
                                "type": "object",
                                "required": [
                                  "id",
                                  "schemaVersion",
                                  "name",
                                  "type",
                                  "subType",
                                  "kind",
                                  "status"
                                ],
                                "properties": {
                                  "id": {
                                    "description": "Connection ID",
                                    "x-order": 1,
                                    "x-go-name": "ID",
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "id",
                                      "yaml": "id"
                                    },
                                    "type": "string",
                                    "format": "uuid",
                                    "x-go-type": "uuid.UUID",
                                    "x-go-type-import": {
                                      "path": "github.com/gofrs/uuid"
                                    }
                                  },
                                  "name": {
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "name",
                                      "yaml": "name"
                                    },
                                    "x-order": 2,
                                    "type": "string",
                                    "description": "Connection Name"
                                  },
                                  "credentialId": {
                                    "x-go-name": "CredentialID",
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "credential_id",
                                      "yaml": "credentialId"
                                    },
                                    "x-order": 3,
                                    "description": "Associated Credential ID",
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
                                      "yaml": "type"
                                    },
                                    "x-order": 4,
                                    "type": "string",
                                    "description": "Connection Type (platform, telemetry, collaboration)"
                                  },
                                  "subType": {
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "sub_type",
                                      "yaml": "subType"
                                    },
                                    "x-order": 5,
                                    "type": "string",
                                    "description": "Connection Subtype (cloud, identity, metrics, chat, git, orchestration)"
                                  },
                                  "kind": {
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "kind",
                                      "yaml": "kind"
                                    },
                                    "x-order": 6,
                                    "type": "string",
                                    "description": "Connection Kind (meshery, kubernetes, prometheus, grafana, gke, aws, azure, slack, github)"
                                  },
                                  "metadata": {
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "metadata",
                                      "yaml": "metadata"
                                    },
                                    "x-order": 7,
                                    "x-go-type": "core.Map",
                                    "x-go-type-import": {
                                      "path": "github.com/meshery/schemas/models/core"
                                    },
                                    "x-go-type-skip-optional-pointer": true,
                                    "type": "object",
                                    "description": "Additional connection metadata"
                                  },
                                  "status": {
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "status",
                                      "yaml": "status"
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
                                      "db": "user_id",
                                      "yaml": "user_id"
                                    },
                                    "x-order": 9,
                                    "description": "User ID who owns this connection",
                                    "type": "string",
                                    "format": "uuid",
                                    "x-go-type": "uuid.UUID",
                                    "x-go-type-import": {
                                      "path": "github.com/gofrs/uuid"
                                    }
                                  },
                                  "created_at": {
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "created_at",
                                      "yaml": "created_at"
                                    },
                                    "x-order": 10,
                                    "type": "string",
                                    "format": "date-time",
                                    "x-go-type-skip-optional-pointer": true
                                  },
                                  "updated_at": {
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "updated_at",
                                      "yaml": "updated_at"
                                    },
                                    "x-order": 11,
                                    "type": "string",
                                    "format": "date-time",
                                    "x-go-type-skip-optional-pointer": true
                                  },
                                  "deleted_at": {
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "deleted_at",
                                      "yaml": "deleted_at"
                                    },
                                    "x-order": 12,
                                    "description": "SQL null Timestamp to handle null values of time.",
                                    "x-go-type": "meshcore.NullTime",
                                    "x-go-type-import": {
                                      "name": "meshcore",
                                      "path": "github.com/meshery/schemas/models/core"
                                    },
                                    "type": "string",
                                    "format": "date-time",
                                    "x-go-type-skip-optional-pointer": true
                                  },
                                  "environments": {
                                    "type": "array",
                                    "description": "Associated environments for this connection",
                                    "items": {
                                      "x-go-type": "*environmentv1beta1.Environment",
                                      "x-go-type-import": {
                                        "path": "github.com/meshery/schemas/models/v1beta1/environment",
                                        "name": "environmentv1beta1"
                                      },
                                      "$id": "https://schemas.meshery.io/environment.yaml",
                                      "$schema": "http://json-schema.org/draft-07/schema#",
                                      "title": "Environment",
                                      "description": "Environments allow you to logically group related Connections and their associated Credentials. Learn more at https://docs.meshery.io/concepts/logical/environments",
                                      "additionalProperties": false,
                                      "type": "object",
                                      "example": {
                                        "id": "00000000-0000-0000-0000-000000000000",
                                        "schemaVersion": "environments.meshery.io/v1beta1",
                                        "name": "Production Environment",
                                        "description": "Connections and credentials for the production cluster.",
                                        "organization_id": "00000000-0000-0000-0000-000000000000",
                                        "owner": "00000000-0000-0000-0000-000000000000",
                                        "created_at": "0001-01-01T00:00:00Z",
                                        "metadata": {},
                                        "updated_at": "0001-01-01T00:00:00Z",
                                        "deleted_at": null
                                      },
                                      "required": [
                                        "id",
                                        "schemaVersion",
                                        "name",
                                        "description",
                                        "organization_id"
                                      ],
                                      "properties": {
                                        "id": {
                                          "description": "ID",
                                          "x-order": 1,
                                          "x-go-name": "ID",
                                          "x-oapi-codegen-extra-tags": {
                                            "db": "id",
                                            "yaml": "id"
                                          },
                                          "type": "string",
                                          "format": "uuid",
                                          "x-go-type": "uuid.UUID",
                                          "x-go-type-import": {
                                            "path": "github.com/gofrs/uuid"
                                          }
                                        },
                                        "schemaVersion": {
                                          "description": "Specifies the version of the schema to which the environment conforms.",
                                          "x-order": 2,
                                          "x-oapi-codegen-extra-tags": {
                                            "yaml": "schemaVersion",
                                            "db": "-",
                                            "gorm": "-"
                                          },
                                          "default": "environments.meshery.io/v1beta1",
                                          "type": "string",
                                          "minLength": 2,
                                          "maxLength": 100,
                                          "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                                          "example": [
                                            "v1",
                                            "v1alpha1",
                                            "v2beta3",
                                            "v1.custom-suffix",
                                            "models.meshery.io/v1beta1",
                                            "capability.meshery.io/v1alpha1"
                                          ]
                                        },
                                        "name": {
                                          "x-oapi-codegen-extra-tags": {
                                            "db": "name",
                                            "yaml": "name"
                                          },
                                          "x-order": 3,
                                          "type": "string",
                                          "maxLength": 100,
                                          "description": "Environment name"
                                        },
                                        "description": {
                                          "x-oapi-codegen-extra-tags": {
                                            "db": "description",
                                            "yaml": "description"
                                          },
                                          "x-order": 4,
                                          "type": "string",
                                          "maxLength": 1000,
                                          "description": "Environment description"
                                        },
                                        "organization_id": {
                                          "x-go-name": "OrganizationID",
                                          "x-oapi-codegen-extra-tags": {
                                            "db": "organization_id",
                                            "yaml": "organization_id"
                                          },
                                          "x-order": 5,
                                          "description": "Environment organization ID",
                                          "type": "string",
                                          "format": "uuid",
                                          "x-go-type": "uuid.UUID",
                                          "x-go-type-import": {
                                            "path": "github.com/gofrs/uuid"
                                          }
                                        },
                                        "owner": {
                                          "x-oapi-codegen-extra-tags": {
                                            "db": "owner",
                                            "yaml": "owner"
                                          },
                                          "x-order": 6,
                                          "description": "Environment owner",
                                          "type": "string",
                                          "format": "uuid",
                                          "x-go-type": "uuid.UUID",
                                          "x-go-type-import": {
                                            "path": "github.com/gofrs/uuid"
                                          }
                                        },
                                        "created_at": {
                                          "x-order": 7,
                                          "description": "Timestamp when the resource was created.",
                                          "x-go-type": "time.Time",
                                          "type": "string",
                                          "format": "date-time",
                                          "x-go-name": "CreatedAt",
                                          "x-oapi-codegen-extra-tags": {
                                            "db": "created_at",
                                            "yaml": "created_at"
                                          },
                                          "x-go-type-skip-optional-pointer": true
                                        },
                                        "metadata": {
                                          "description": "Additional metadata associated with the environment.",
                                          "x-oapi-codegen-extra-tags": {
                                            "db": "metadata",
                                            "yaml": "metadata"
                                          },
                                          "x-order": 8,
                                          "x-go-type": "core.Map",
                                          "x-go-type-skip-optional-pointer": true,
                                          "type": "object"
                                        },
                                        "updated_at": {
                                          "x-order": 9,
                                          "description": "Timestamp when the resource was updated.",
                                          "x-go-type": "time.Time",
                                          "type": "string",
                                          "format": "date-time",
                                          "x-go-name": "UpdatedAt",
                                          "x-oapi-codegen-extra-tags": {
                                            "db": "updated_at",
                                            "yaml": "updated_at"
                                          },
                                          "x-go-type-skip-optional-pointer": true
                                        },
                                        "deleted_at": {
                                          "description": "Timestamp when the environment was soft deleted. Null while the environment remains active.",
                                          "nullable": true,
                                          "x-oapi-codegen-extra-tags": {
                                            "db": "deleted_at",
                                            "yaml": "deleted_at"
                                          },
                                          "x-go-type": "core.NullTime",
                                          "x-go-import": "database/sql",
                                          "x-order": 10,
                                          "x-go-type-import": {
                                            "name": "meshcore",
                                            "path": "github.com/meshery/schemas/models/core"
                                          },
                                          "type": "string",
                                          "format": "date-time",
                                          "x-go-type-skip-optional-pointer": true
                                        }
                                      }
                                    },
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "-",
                                      "yaml": "environments",
                                      "gorm": "-"
                                    },
                                    "x-go-type-skip-optional-pointer": true,
                                    "x-order": 13
                                  },
                                  "schemaVersion": {
                                    "description": "Specifies the version of the schema used for the definition.",
                                    "x-order": 14,
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "schemaVersion",
                                      "db": "-",
                                      "gorm": "-"
                                    },
                                    "default": "connections.meshery.io/v1beta1",
                                    "type": "string",
                                    "minLength": 2,
                                    "maxLength": 100,
                                    "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                                    "example": [
                                      "v1",
                                      "v1alpha1",
                                      "v2beta3",
                                      "v1.custom-suffix",
                                      "models.meshery.io/v1beta1",
                                      "capability.meshery.io/v1alpha1"
                                    ]
                                  }
                                }
                              },
                              "registrantId": {
                                "description": "ID of the registrant.",
                                "x-oapi-codegen-extra-tags": {
                                  "yaml": "connection_id",
                                  "json": "connection_id",
                                  "gorm": "column:connection_id"
                                },
                                "x-order": 8,
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
                                  "yaml": "-",
                                  "json": "-",
                                  "gorm": "categoryID"
                                },
                                "x-order": 8,
                                "type": "string",
                                "format": "uuid",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                }
                              },
                              "category": {
                                "x-order": 9,
                                "x-oapi-codegen-extra-tags": {
                                  "yaml": "category",
                                  "json": "category",
                                  "gorm": "foreignKey:CategoryId;references:ID"
                                },
                                "x-go-type": "categoryv1beta1.CategoryDefinition",
                                "x-go-type-import": {
                                  "path": "github.com/meshery/schemas/models/v1beta1/category",
                                  "name": "categoryv1beta1"
                                },
                                "$id": "https://schemas.meshery.io/category.yaml",
                                "$schema": "http://json-schema.org/draft-07/schema#",
                                "type": "object",
                                "additionalProperties": false,
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
                                    "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                    "x-go-type": "uuid.UUID",
                                    "x-go-type-import": {
                                      "path": "github.com/gofrs/uuid"
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
                                    "description": "Additional metadata associated with the category.",
                                    "type": "object",
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "metadata,omitempty",
                                      "json": "metadata,omitempty",
                                      "gorm": "type:bytes;serializer:json"
                                    },
                                    "x-order": 3
                                  }
                                }
                              },
                              "subCategory": {
                                "x-order": 10,
                                "x-go-type": "subcategoryv1beta1.SubCategoryDefinition",
                                "x-go-type-import": {
                                  "path": "github.com/meshery/schemas/models/v1beta1/subcategory",
                                  "name": "subcategoryv1beta1"
                                },
                                "$id": "https://schemas.meshery.io/category.yaml",
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
                                      "x-go-type": "capabilityv1alpha1.Capability",
                                      "x-go-type-import": {
                                        "path": "github.com/meshery/schemas/models/v1alpha1/capability",
                                        "name": "capabilityv1alpha1"
                                      },
                                      "$id": "https://schemas.meshery.io/capability.yaml",
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
                                          "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                                          "example": [
                                            "v1",
                                            "v1alpha1",
                                            "v2beta3",
                                            "v1.custom-suffix",
                                            "models.meshery.io/v1beta1",
                                            "capability.meshery.io/v1alpha1"
                                          ]
                                        },
                                        "version": {
                                          "description": "Version of the capability definition.",
                                          "type": "string",
                                          "minLength": 5,
                                          "maxLength": 100,
                                          "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                                        },
                                        "displayName": {
                                          "description": "Name of the capability in human-readible format.",
                                          "type": "string",
                                          "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
                                        },
                                        "description": {
                                          "type": "string",
                                          "description": "A written representation of the purpose and characteristics of the capability.",
                                          "maxLength": 5000
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
                                          "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
                                        },
                                        "type": {
                                          "description": "Classification of capabilities. Used to group capabilities similar in nature.",
                                          "type": "string",
                                          "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
                                        },
                                        "subType": {
                                          "description": "Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Capability.",
                                          "type": "string",
                                          "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
                                        },
                                        "key": {
                                          "description": "Key that backs the capability.",
                                          "type": "string",
                                          "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
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
                                            "description": "A string starting with an alphanumeric character. Spaces and hyphens allowed."
                                          }
                                        },
                                        "status": {
                                          "type": "string",
                                          "description": "Status of the capability",
                                          "default": "enabled",
                                          "enum": [
                                            "enabled",
                                            "disabled"
                                          ]
                                        },
                                        "metadata": {
                                          "type": "object",
                                          "description": "Metadata contains additional information associated with the capability. Extension point.",
                                          "additionalProperties": true
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
                                          "schemaVersion": "capability.meshery.io/v1beta1",
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
                                          "schemaVersion": "capability.meshery.io/v1beta1",
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
                                          "schemaVersion": "capability.meshery.io/v1beta1",
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
                                          "schemaVersion": "capability.meshery.io/v1beta1",
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
                                  }
                                },
                                "x-oapi-codegen-extra-tags": {
                                  "gorm": "type:bytes;serializer:json",
                                  "json": "metadata",
                                  "yaml": "metadata"
                                },
                                "x-order": 11,
                                "additionalProperties": true
                              },
                              "model": {
                                "x-oapi-codegen-extra-tags": {
                                  "gorm": "type:bytes;serializer:json"
                                },
                                "x-order": 12,
                                "type": "object",
                                "description": "Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31).",
                                "required": [
                                  "version"
                                ],
                                "properties": {
                                  "version": {
                                    "description": "Version of the model as defined by the registrant.",
                                    "x-oapi-codegen-extra-tags": {
                                      "json": "version"
                                    },
                                    "x-order": 1,
                                    "type": "string",
                                    "minLength": 5,
                                    "maxLength": 100,
                                    "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
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
                                "description": "The relationships of the model."
                              },
                              "components": {
                                "type": "array",
                                "x-go-type": "interface{}",
                                "x-oapi-codegen-extra-tags": {
                                  "gorm": "-",
                                  "json": "components",
                                  "yaml": "components"
                                },
                                "description": "The components of the model."
                              },
                              "componentsCount": {
                                "type": "integer",
                                "description": "Number of components associated with the model.",
                                "x-order": 13,
                                "x-oapi-codegen-extra-tags": {
                                  "json": "components_count",
                                  "yaml": "components_count",
                                  "gorm": "-"
                                },
                                "default": 0,
                                "minimum": 0
                              },
                              "relationshipsCount": {
                                "type": "integer",
                                "description": "Number of relationships associated with the model.",
                                "x-order": 13,
                                "x-oapi-codegen-extra-tags": {
                                  "gorm": "-",
                                  "json": "relationships_count",
                                  "yaml": "relationships_count"
                                },
                                "default": 0,
                                "minimum": 0
                              },
                              "created_at": {
                                "x-order": 14,
                                "description": "Timestamp when the resource was created.",
                                "x-go-type": "time.Time",
                                "type": "string",
                                "format": "date-time",
                                "x-go-name": "CreatedAt",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "created_at",
                                  "yaml": "created_at"
                                },
                                "x-go-type-skip-optional-pointer": true
                              },
                              "updated_at": {
                                "x-order": 15,
                                "description": "Timestamp when the resource was updated.",
                                "x-go-type": "time.Time",
                                "type": "string",
                                "format": "date-time",
                                "x-go-name": "UpdatedAt",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "updated_at",
                                  "yaml": "updated_at"
                                },
                                "x-go-type-skip-optional-pointer": true
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
                          "modelReference": {
                            "x-go-type": "modelv1beta1.ModelReference",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/v1beta1/model",
                              "name": "modelv1beta1"
                            },
                            "x-order": 8,
                            "description": "Reference to the specific registered model to which the component belongs and from which model version, category, and other properties may be referenced. Learn more at https://docs.meshery.io/concepts/models",
                            "x-oapi-codegen-extra-tags": {
                              "gorm": "-"
                            },
                            "type": "object",
                            "required": [
                              "id",
                              "name",
                              "version",
                              "displayName",
                              "model",
                              "registrant"
                            ],
                            "properties": {
                              "id": {
                                "type": "string",
                                "format": "uuid",
                                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                }
                              },
                              "name": {
                                "type": "string",
                                "description": "The unique name for the model within the scope of a registrant.",
                                "pattern": "^[a-z0-9-]+$",
                                "examples": [
                                  "cert-manager"
                                ]
                              },
                              "version": {
                                "description": "Version of the model definition.",
                                "type": "string",
                                "minLength": 5,
                                "maxLength": 100,
                                "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                              },
                              "displayName": {
                                "type": "string",
                                "description": "Human-readable name for the model.",
                                "minLength": 1,
                                "maxLength": 100,
                                "pattern": "^[a-zA-Z0-9 ]+$",
                                "examples": [
                                  "Cert Manager"
                                ]
                              },
                              "model": {
                                "type": "object",
                                "description": "Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31).",
                                "required": [
                                  "version"
                                ],
                                "properties": {
                                  "version": {
                                    "description": "Version of the model as defined by the registrant.",
                                    "x-oapi-codegen-extra-tags": {
                                      "json": "version"
                                    },
                                    "x-order": 1,
                                    "type": "string",
                                    "minLength": 5,
                                    "maxLength": 100,
                                    "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                                  }
                                }
                              },
                              "registrant": {
                                "x-go-type": "RegistrantReference",
                                "x-oapi-codegen-extra-tags": {
                                  "json": "registrant"
                                },
                                "type": "object",
                                "required": [
                                  "kind"
                                ],
                                "properties": {
                                  "kind": {
                                    "type": "string",
                                    "description": "Kind of the registrant.",
                                    "maxLength": 255
                                  }
                                }
                              }
                            }
                          },
                          "modelId": {
                            "description": "Foreign key to the model to which the component belongs. Populated by the ORM from the `model_id` column and suppressed on the JSON wire; consumers use the nested `model` object for wire-level access.",
                            "x-go-name": "ModelID",
                            "x-oapi-codegen-extra-tags": {
                              "gorm": "column:model_id",
                              "db": "model_id",
                              "yaml": "-",
                              "json": "-"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "metadata": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "metadata"
                            },
                            "x-order": 9,
                            "x-go-type": "core.Map",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "type": "object",
                            "description": "Additional connection metadata"
                          },
                          "credentialSchema": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "credential_schema"
                            },
                            "x-order": 9,
                            "x-go-type": "core.Map",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "type": "object",
                            "description": "Schema for the credential Associated with the connection"
                          },
                          "connectionSchema": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "connection_schema"
                            },
                            "x-order": 9,
                            "x-go-type": "core.Map",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "type": "object",
                            "description": "Schema for the connection"
                          },
                          "styles": {
                            "x-oapi-codegen-extra-tags": {
                              "gorm": "type:bytes;serializer:json",
                              "yaml": "styles",
                              "json": "styles"
                            },
                            "x-go-type": "core.ComponentStyles",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-order": 17,
                            "description": "Visualization styles for the connection, including svgColor and svgWhite used for UI representation.",
                            "type": "object",
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
                                    "description": "Primary color of the component used for UI representation.",
                                    "maxLength": 500
                                  },
                                  "secondaryColor": {
                                    "type": "string",
                                    "description": "Secondary color of the entity used for UI representation.",
                                    "maxLength": 500
                                  },
                                  "svgWhite": {
                                    "type": "string",
                                    "description": "White SVG of the entity used for UI representation on dark background.",
                                    "maxLength": 500
                                  },
                                  "svgColor": {
                                    "type": "string",
                                    "description": "Colored SVG of the entity used for UI representation on light background.",
                                    "maxLength": 500
                                  },
                                  "svgComplete": {
                                    "type": "string",
                                    "description": "Complete SVG of the entity used for UI representation, often inclusive of background.",
                                    "maxLength": 500
                                  },
                                  "color": {
                                    "type": "string",
                                    "description": "The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g.",
                                    "maxLength": 500
                                  },
                                  "textOpacity": {
                                    "type": "number",
                                    "description": "The opacity of the label text, including its outline.",
                                    "minimum": 0,
                                    "maximum": 1
                                  },
                                  "fontFamily": {
                                    "type": "string",
                                    "description": "A comma-separated list of font names to use on the label text.",
                                    "maxLength": 500
                                  },
                                  "fontSize": {
                                    "type": "string",
                                    "description": "The size of the label text.",
                                    "maxLength": 500
                                  },
                                  "fontStyle": {
                                    "type": "string",
                                    "description": "A CSS font style to be applied to the label text.",
                                    "maxLength": 500
                                  },
                                  "fontWeight": {
                                    "type": "string",
                                    "description": "A CSS font weight to be applied to the label text.",
                                    "maxLength": 500
                                  },
                                  "textTransform": {
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
                                  "zIndex": {
                                    "type": "integer",
                                    "description": "An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index.",
                                    "minimum": 0
                                  },
                                  "label": {
                                    "type": "string",
                                    "description": "The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id",
                                    "maxLength": 500
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
                                        "minimum": -1000000,
                                        "maximum": 1000000,
                                        "x-go-type": "float64"
                                      },
                                      "y": {
                                        "type": "number",
                                        "description": "The y-coordinate of the node.",
                                        "minimum": -1000000,
                                        "maximum": 1000000,
                                        "x-go-type": "float64"
                                      }
                                    }
                                  },
                                  "bodyText": {
                                    "type": "string",
                                    "description": "The text to display for an element's body. Can give a path, e.g. data(id) will label with the elements id",
                                    "maxLength": 500
                                  },
                                  "bodyTextWrap": {
                                    "type": "string",
                                    "description": "How to wrap the text in the node. Can be 'none', 'wrap', or 'ellipsis'.",
                                    "enum": [
                                      "none",
                                      "wrap",
                                      "ellipsis"
                                    ]
                                  },
                                  "bodyTextMaxWidth": {
                                    "type": "string",
                                    "description": "The maximum width for wrapping text in the node.",
                                    "maxLength": 50
                                  },
                                  "bodyTextOpacity": {
                                    "type": "number",
                                    "description": "The opacity of the node's body text, including its outline.",
                                    "minimum": 0,
                                    "maximum": 1
                                  },
                                  "bodyTextBackgroundColor": {
                                    "type": "string",
                                    "description": "The colour of the node's body text background. Colours may be specified by name (e.g. red), hex (e.g.",
                                    "maxLength": 100
                                  },
                                  "bodyTextFontSize": {
                                    "type": "number",
                                    "description": "The size of the node's body text.",
                                    "minimum": 0
                                  },
                                  "bodyTextColor": {
                                    "type": "string",
                                    "description": "The colour of the node's body text. Colours may be specified by name (e.g. red), hex (e.g.",
                                    "maxLength": 100
                                  },
                                  "bodyTextFontWeight": {
                                    "type": "string",
                                    "description": "A CSS font weight to be applied to the node's body text.",
                                    "maxLength": 50
                                  },
                                  "bodyTextHorizontalAlign": {
                                    "type": "string",
                                    "description": "A CSS horizontal alignment to be applied to the node's body text.",
                                    "maxLength": 50
                                  },
                                  "bodyTextDecoration": {
                                    "type": "string",
                                    "description": "A CSS text decoration to be applied to the node's body text.",
                                    "maxLength": 100
                                  },
                                  "bodyTextVerticalAlign": {
                                    "type": "string",
                                    "description": "A CSS vertical alignment to be applied to the node's body text.",
                                    "maxLength": 50
                                  },
                                  "width": {
                                    "type": "number",
                                    "description": "The width of the node's body or the width of an edge's line.",
                                    "minimum": 0
                                  },
                                  "height": {
                                    "type": "number",
                                    "description": "The height of the node's body",
                                    "minimum": 0
                                  },
                                  "backgroundImage": {
                                    "type": "string",
                                    "format": "uri",
                                    "description": "The URL that points to the image to show in the node.",
                                    "maxLength": 2048
                                  },
                                  "backgroundColor": {
                                    "type": "string",
                                    "description": "The colour of the node's body. Colours may be specified by name (e.g. red), hex (e.g.",
                                    "maxLength": 100
                                  },
                                  "backgroundBlacken": {
                                    "type": "number",
                                    "description": "Blackens the node's body for values from 0 to 1; whitens the node's body for values from 0 to -1.",
                                    "maximum": 1,
                                    "minimum": -1
                                  },
                                  "backgroundOpacity": {
                                    "type": "number",
                                    "description": "The opacity level of the node's background colour",
                                    "maximum": 1,
                                    "minimum": 0
                                  },
                                  "backgroundPositionX": {
                                    "type": "string",
                                    "description": "The x position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                                    "maxLength": 50
                                  },
                                  "backgroundPositionY": {
                                    "type": "string",
                                    "description": "The y position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                                    "maxLength": 50
                                  },
                                  "backgroundOffsetX": {
                                    "type": "string",
                                    "description": "The x offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                                    "maxLength": 50
                                  },
                                  "backgroundOffsetY": {
                                    "type": "string",
                                    "description": "The y offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                                    "maxLength": 50
                                  },
                                  "backgroundFit": {
                                    "type": "string",
                                    "description": "How the background image is fit to the node. Can be 'none', 'contain', or 'cover'.",
                                    "enum": [
                                      "none",
                                      "contain",
                                      "cover"
                                    ]
                                  },
                                  "backgroundClip": {
                                    "type": "string",
                                    "description": "How the background image is clipped to the node. Can be 'none', 'node', or 'node-border'.",
                                    "enum": [
                                      "none",
                                      "node",
                                      "node-border"
                                    ]
                                  },
                                  "backgroundWidthRelativeTo": {
                                    "type": "string",
                                    "description": "How the background image's width is determined. Can be 'none', 'inner', or 'outer'.",
                                    "enum": [
                                      "none",
                                      "inner",
                                      "outer"
                                    ]
                                  },
                                  "backgroundHeightRelativeTo": {
                                    "type": "string",
                                    "description": "How the background image's height is determined. Can be 'none', 'inner', or 'outer'.",
                                    "enum": [
                                      "none",
                                      "inner",
                                      "outer"
                                    ]
                                  },
                                  "borderWidth": {
                                    "type": "number",
                                    "description": "The size of the node's border.",
                                    "minimum": 0
                                  },
                                  "borderStyle": {
                                    "type": "string",
                                    "description": "The style of the node's border",
                                    "enum": [
                                      "solid",
                                      "dotted",
                                      "dashed",
                                      "double"
                                    ]
                                  },
                                  "borderColor": {
                                    "type": "string",
                                    "description": "The colour of the node's border. Colours may be specified by name (e.g. red), hex (e.g.",
                                    "maxLength": 100
                                  },
                                  "borderOpacity": {
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
                                  "textHalign": {
                                    "type": "string",
                                    "description": "The horizontal alignment of a node's label",
                                    "enum": [
                                      "left",
                                      "center",
                                      "right"
                                    ]
                                  },
                                  "textValign": {
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
                                  "activeBgColor": {
                                    "type": "string",
                                    "description": "The colour of the indicator shown when the background is grabbed by the user. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                                    "maxLength": 100
                                  },
                                  "activeBgOpacity": {
                                    "type": "string",
                                    "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                                    "maxLength": 50
                                  },
                                  "activeBgSize": {
                                    "type": "string",
                                    "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                                    "maxLength": 50
                                  },
                                  "selectionBoxColor": {
                                    "type": "string",
                                    "description": "The background colour of the selection box used for drag selection. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                                    "maxLength": 100
                                  },
                                  "selectionBoxBorderWidth": {
                                    "type": "number",
                                    "description": "The size of the border on the selection box. Selector needs to be *core*",
                                    "minimum": 0
                                  },
                                  "selectionBoxOpacity": {
                                    "type": "number",
                                    "description": "The opacity of the selection box. Selector needs to be *core*",
                                    "minimum": 0,
                                    "maximum": 1
                                  },
                                  "outsideTextureBgColor": {
                                    "type": "string",
                                    "description": "The colour of the area outside the viewport texture when initOptions.textureOnViewport === true. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                                    "maxLength": 100
                                  },
                                  "outsideTextureBgOpacity": {
                                    "type": "number",
                                    "description": "The opacity of the area outside the viewport texture. Selector needs to be *core*",
                                    "minimum": 0,
                                    "maximum": 1
                                  },
                                  "shapePolygonPoints": {
                                    "type": "string",
                                    "description": "An array (or a space-separated string) of numbers ranging on [-1, 1], representing alternating x and y values (i.e. x1 y1 x2 y2, x3 y3 ...). This represents the points in the polygon for the node's shape. The bounding box of the node is given by (-1, -1), (1, -1), (1, 1), (-1, 1). The node's position is the origin (0, 0 )",
                                    "maxLength": 2000
                                  },
                                  "menuBackgroundColor": {
                                    "type": "string",
                                    "description": "The colour of the background of the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                                    "maxLength": 100
                                  },
                                  "menuBackgroundOpacity": {
                                    "type": "number",
                                    "description": "The opacity of the background of the component menu.",
                                    "minimum": 0,
                                    "maximum": 1
                                  },
                                  "menuForgroundColor": {
                                    "type": "string",
                                    "description": "The colour of the text or icons in the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                                    "maxLength": 100
                                  }
                                }
                              }
                            ]
                          },
                          "status": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "status"
                            },
                            "x-order": 10,
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
                          "transitionMap": {
                            "type": "object",
                            "description": "Map describing the connection state machine. Each key is a current connection status and its value is the list of states the connection may transition to from that status, along with a description of each transition.",
                            "additionalProperties": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "additionalProperties": false,
                                "description": "A single permissible state transition for a connection, describing the next reachable state and the meaning of that transition.",
                                "required": [
                                  "nextState"
                                ],
                                "properties": {
                                  "nextState": {
                                    "type": "string",
                                    "description": "Connection Status Value",
                                    "x-go-name": "ConnectionStatusValue",
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
                                    "x-order": 1
                                  },
                                  "description": {
                                    "type": "string",
                                    "description": "Human-readable explanation of when or why this transition occurs.",
                                    "maxLength": 1000,
                                    "x-oapi-codegen-extra-tags": {
                                      "json": "description,omitempty"
                                    },
                                    "x-order": 2
                                  }
                                }
                              }
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "gorm": "type:bytes;serializer:json",
                              "json": "transitionMap,omitempty"
                            },
                            "x-order": 18
                          },
                          "userId": {
                            "x-go-name": "UserID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "user_id",
                              "json": "userId"
                            },
                            "x-order": 11,
                            "description": "User ID who owns this connection",
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "createdAt": {
                            "description": "Timestamp when the connection was created.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "json": "createdAt"
                            },
                            "x-order": 12,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp when the connection was last updated.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "json": "updatedAt"
                            },
                            "x-order": 13,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deletedAt": {
                            "description": "Timestamp when the connection was soft-deleted, if applicable.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "json": "deletedAt"
                            },
                            "x-order": 14,
                            "x-go-type": "meshcore.NullTime",
                            "x-go-type-import": {
                              "name": "meshcore",
                              "path": "github.com/meshery/schemas/models/core"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "environments": {
                            "type": "array",
                            "description": "Associated environments for this connection",
                            "items": {
                              "x-go-type": "*environmentv1beta3.Environment",
                              "x-go-type-import": {
                                "path": "github.com/meshery/schemas/models/v1beta3/environment",
                                "name": "environmentv1beta3"
                              },
                              "$id": "https://schemas.meshery.io/environment.yaml",
                              "$schema": "http://json-schema.org/draft-07/schema#",
                              "title": "Environment",
                              "description": "Environments allow you to logically group related Connections and their associated Credentials. Learn more at https://docs.meshery.io/concepts/logical/environments",
                              "additionalProperties": false,
                              "type": "object",
                              "example": {
                                "id": "00000000-0000-0000-0000-000000000000",
                                "schemaVersion": "environments.meshery.io/v1beta3",
                                "name": "Production Environment",
                                "description": "Connections and credentials for the production cluster.",
                                "organizationId": "00000000-0000-0000-0000-000000000000",
                                "owner": "00000000-0000-0000-0000-000000000000",
                                "createdAt": "0001-01-01T00:00:00Z",
                                "metadata": {},
                                "updatedAt": "0001-01-01T00:00:00Z",
                                "deletedAt": null
                              },
                              "required": [
                                "id",
                                "schemaVersion",
                                "name",
                                "description",
                                "organizationId"
                              ],
                              "properties": {
                                "id": {
                                  "description": "ID",
                                  "x-order": 1,
                                  "x-go-name": "ID",
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "id",
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
                                  "description": "Specifies the version of the schema to which the environment conforms.",
                                  "x-order": 2,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "schemaVersion",
                                    "db": "-",
                                    "gorm": "-"
                                  },
                                  "default": "environments.meshery.io/v1beta3",
                                  "type": "string",
                                  "minLength": 2,
                                  "maxLength": 100,
                                  "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                                  "example": [
                                    "v1",
                                    "v1alpha1",
                                    "v2beta3",
                                    "v1.custom-suffix",
                                    "models.meshery.io/v1beta1",
                                    "capability.meshery.io/v1alpha1"
                                  ]
                                },
                                "name": {
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "name",
                                    "json": "name"
                                  },
                                  "x-order": 3,
                                  "type": "string",
                                  "maxLength": 100,
                                  "description": "Environment name"
                                },
                                "description": {
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "description",
                                    "json": "description"
                                  },
                                  "x-order": 4,
                                  "type": "string",
                                  "maxLength": 1000,
                                  "description": "Environment description"
                                },
                                "organizationId": {
                                  "x-go-name": "OrganizationID",
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "organization_id",
                                    "json": "organizationId"
                                  },
                                  "x-order": 5,
                                  "description": "Environment organization ID",
                                  "type": "string",
                                  "format": "uuid",
                                  "x-go-type": "uuid.UUID",
                                  "x-go-type-import": {
                                    "path": "github.com/gofrs/uuid"
                                  }
                                },
                                "owner": {
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "owner",
                                    "json": "owner"
                                  },
                                  "x-order": 6,
                                  "description": "Environment owner",
                                  "type": "string",
                                  "format": "uuid",
                                  "x-go-type": "uuid.UUID",
                                  "x-go-type-import": {
                                    "path": "github.com/gofrs/uuid"
                                  }
                                },
                                "createdAt": {
                                  "description": "Timestamp when the environment was created.",
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "created_at",
                                    "yaml": "created_at",
                                    "json": "createdAt"
                                  },
                                  "x-order": 7,
                                  "x-go-type": "time.Time",
                                  "type": "string",
                                  "format": "date-time",
                                  "x-go-name": "CreatedAt",
                                  "x-go-type-skip-optional-pointer": true
                                },
                                "metadata": {
                                  "description": "Additional metadata associated with the environment.",
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "metadata",
                                    "json": "metadata"
                                  },
                                  "x-order": 8,
                                  "x-go-type": "core.Map",
                                  "x-go-type-skip-optional-pointer": true,
                                  "type": "object"
                                },
                                "updatedAt": {
                                  "description": "Timestamp when the environment was last updated.",
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "updated_at",
                                    "yaml": "updated_at",
                                    "json": "updatedAt"
                                  },
                                  "x-order": 9,
                                  "x-go-type": "time.Time",
                                  "type": "string",
                                  "format": "date-time",
                                  "x-go-name": "UpdatedAt",
                                  "x-go-type-skip-optional-pointer": true
                                },
                                "deletedAt": {
                                  "description": "Timestamp when the environment was soft deleted. Null while the environment remains active.",
                                  "nullable": true,
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "deleted_at",
                                    "json": "deletedAt"
                                  },
                                  "x-go-type": "core.NullTime",
                                  "x-go-import": "database/sql",
                                  "x-order": 10,
                                  "type": "string",
                                  "format": "date-time",
                                  "x-go-type-skip-optional-pointer": true
                                }
                              }
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "-",
                              "gorm": "-"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-order": 15
                          },
                          "schemaVersion": {
                            "description": "Specifies the version of the schema used for the definition.",
                            "x-order": 16,
                            "x-oapi-codegen-extra-tags": {
                              "db": "-",
                              "gorm": "-"
                            },
                            "default": "connections.meshery.io/v1beta3",
                            "type": "string",
                            "minLength": 2,
                            "maxLength": 100,
                            "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                            "example": [
                              "v1",
                              "v1alpha1",
                              "v2beta3",
                              "v1.custom-suffix",
                              "models.meshery.io/v1beta1",
                              "capability.meshery.io/v1alpha1"
                            ]
                          }
                        }
                      },
                      "x-order": 1
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of connections on all pages",
                      "x-oapi-codegen-extra-tags": {
                        "json": "totalCount"
                      },
                      "x-order": 2,
                      "minimum": 0
                    },
                    "page": {
                      "type": "integer",
                      "description": "Current page number",
                      "x-order": 3,
                      "minimum": 0
                    },
                    "pageSize": {
                      "type": "integer",
                      "description": "Number of elements per page",
                      "x-oapi-codegen-extra-tags": {
                        "json": "pageSize"
                      },
                      "x-order": 4,
                      "minimum": 1
                    },
                    "statusSummary": {
                      "type": "object",
                      "description": "Aggregate count of connections grouped by status",
                      "additionalProperties": {
                        "type": "integer"
                      },
                      "x-go-type": "map[ConnectionStatusValue]int",
                      "x-oapi-codegen-extra-tags": {
                        "json": "statusSummary,omitempty"
                      },
                      "x-order": 5
                    }
                  }
                }
              }
            }
          },
          "401": {
            "description": "Expired JWT token used or insufficient privilege",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "500": {
            "description": "Internal server error",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          }
        }
      },
      "post": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "Connections"
        ],
        "operationId": "registerConnection",
        "summary": "Register a new connection",
        "description": "Register a new connection with credentials",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for creating or updating a connection",
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "description": "Connection ID",
                    "x-go-name": "ConnectionID",
                    "x-oapi-codegen-extra-tags": {
                      "json": "id,omitempty"
                    }
                  },
                  "name": {
                    "type": "string",
                    "description": "Connection name",
                    "x-oapi-codegen-extra-tags": {
                      "json": "name"
                    },
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "kind": {
                    "type": "string",
                    "description": "Connection kind",
                    "x-oapi-codegen-extra-tags": {
                      "json": "kind"
                    },
                    "maxLength": 255
                  },
                  "type": {
                    "type": "string",
                    "description": "Connection type",
                    "x-oapi-codegen-extra-tags": {
                      "json": "type"
                    },
                    "maxLength": 255
                  },
                  "subType": {
                    "type": "string",
                    "description": "Connection sub-type",
                    "x-oapi-codegen-extra-tags": {
                      "json": "subType"
                    },
                    "maxLength": 255
                  },
                  "credentialSecret": {
                    "type": "object",
                    "description": "Credential secret data",
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "credentialSecret"
                    }
                  },
                  "metadata": {
                    "type": "object",
                    "description": "Connection metadata",
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "metadata"
                    }
                  },
                  "styles": {
                    "x-go-type": "core.ComponentStyles",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    },
                    "x-oapi-codegen-extra-tags": {
                      "json": "styles,omitempty"
                    },
                    "description": "Visualization styles for the connection, including svgColor and svgWhite used for UI representation.",
                    "type": "object",
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
                            "description": "Primary color of the component used for UI representation.",
                            "maxLength": 500
                          },
                          "secondaryColor": {
                            "type": "string",
                            "description": "Secondary color of the entity used for UI representation.",
                            "maxLength": 500
                          },
                          "svgWhite": {
                            "type": "string",
                            "description": "White SVG of the entity used for UI representation on dark background.",
                            "maxLength": 500
                          },
                          "svgColor": {
                            "type": "string",
                            "description": "Colored SVG of the entity used for UI representation on light background.",
                            "maxLength": 500
                          },
                          "svgComplete": {
                            "type": "string",
                            "description": "Complete SVG of the entity used for UI representation, often inclusive of background.",
                            "maxLength": 500
                          },
                          "color": {
                            "type": "string",
                            "description": "The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 500
                          },
                          "textOpacity": {
                            "type": "number",
                            "description": "The opacity of the label text, including its outline.",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "fontFamily": {
                            "type": "string",
                            "description": "A comma-separated list of font names to use on the label text.",
                            "maxLength": 500
                          },
                          "fontSize": {
                            "type": "string",
                            "description": "The size of the label text.",
                            "maxLength": 500
                          },
                          "fontStyle": {
                            "type": "string",
                            "description": "A CSS font style to be applied to the label text.",
                            "maxLength": 500
                          },
                          "fontWeight": {
                            "type": "string",
                            "description": "A CSS font weight to be applied to the label text.",
                            "maxLength": 500
                          },
                          "textTransform": {
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
                          "zIndex": {
                            "type": "integer",
                            "description": "An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index.",
                            "minimum": 0
                          },
                          "label": {
                            "type": "string",
                            "description": "The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id",
                            "maxLength": 500
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
                                "minimum": -1000000,
                                "maximum": 1000000,
                                "x-go-type": "float64"
                              },
                              "y": {
                                "type": "number",
                                "description": "The y-coordinate of the node.",
                                "minimum": -1000000,
                                "maximum": 1000000,
                                "x-go-type": "float64"
                              }
                            }
                          },
                          "bodyText": {
                            "type": "string",
                            "description": "The text to display for an element's body. Can give a path, e.g. data(id) will label with the elements id",
                            "maxLength": 500
                          },
                          "bodyTextWrap": {
                            "type": "string",
                            "description": "How to wrap the text in the node. Can be 'none', 'wrap', or 'ellipsis'.",
                            "enum": [
                              "none",
                              "wrap",
                              "ellipsis"
                            ]
                          },
                          "bodyTextMaxWidth": {
                            "type": "string",
                            "description": "The maximum width for wrapping text in the node.",
                            "maxLength": 50
                          },
                          "bodyTextOpacity": {
                            "type": "number",
                            "description": "The opacity of the node's body text, including its outline.",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "bodyTextBackgroundColor": {
                            "type": "string",
                            "description": "The colour of the node's body text background. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "bodyTextFontSize": {
                            "type": "number",
                            "description": "The size of the node's body text.",
                            "minimum": 0
                          },
                          "bodyTextColor": {
                            "type": "string",
                            "description": "The colour of the node's body text. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "bodyTextFontWeight": {
                            "type": "string",
                            "description": "A CSS font weight to be applied to the node's body text.",
                            "maxLength": 50
                          },
                          "bodyTextHorizontalAlign": {
                            "type": "string",
                            "description": "A CSS horizontal alignment to be applied to the node's body text.",
                            "maxLength": 50
                          },
                          "bodyTextDecoration": {
                            "type": "string",
                            "description": "A CSS text decoration to be applied to the node's body text.",
                            "maxLength": 100
                          },
                          "bodyTextVerticalAlign": {
                            "type": "string",
                            "description": "A CSS vertical alignment to be applied to the node's body text.",
                            "maxLength": 50
                          },
                          "width": {
                            "type": "number",
                            "description": "The width of the node's body or the width of an edge's line.",
                            "minimum": 0
                          },
                          "height": {
                            "type": "number",
                            "description": "The height of the node's body",
                            "minimum": 0
                          },
                          "backgroundImage": {
                            "type": "string",
                            "format": "uri",
                            "description": "The URL that points to the image to show in the node.",
                            "maxLength": 2048
                          },
                          "backgroundColor": {
                            "type": "string",
                            "description": "The colour of the node's body. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "backgroundBlacken": {
                            "type": "number",
                            "description": "Blackens the node's body for values from 0 to 1; whitens the node's body for values from 0 to -1.",
                            "maximum": 1,
                            "minimum": -1
                          },
                          "backgroundOpacity": {
                            "type": "number",
                            "description": "The opacity level of the node's background colour",
                            "maximum": 1,
                            "minimum": 0
                          },
                          "backgroundPositionX": {
                            "type": "string",
                            "description": "The x position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                            "maxLength": 50
                          },
                          "backgroundPositionY": {
                            "type": "string",
                            "description": "The y position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                            "maxLength": 50
                          },
                          "backgroundOffsetX": {
                            "type": "string",
                            "description": "The x offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                            "maxLength": 50
                          },
                          "backgroundOffsetY": {
                            "type": "string",
                            "description": "The y offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                            "maxLength": 50
                          },
                          "backgroundFit": {
                            "type": "string",
                            "description": "How the background image is fit to the node. Can be 'none', 'contain', or 'cover'.",
                            "enum": [
                              "none",
                              "contain",
                              "cover"
                            ]
                          },
                          "backgroundClip": {
                            "type": "string",
                            "description": "How the background image is clipped to the node. Can be 'none', 'node', or 'node-border'.",
                            "enum": [
                              "none",
                              "node",
                              "node-border"
                            ]
                          },
                          "backgroundWidthRelativeTo": {
                            "type": "string",
                            "description": "How the background image's width is determined. Can be 'none', 'inner', or 'outer'.",
                            "enum": [
                              "none",
                              "inner",
                              "outer"
                            ]
                          },
                          "backgroundHeightRelativeTo": {
                            "type": "string",
                            "description": "How the background image's height is determined. Can be 'none', 'inner', or 'outer'.",
                            "enum": [
                              "none",
                              "inner",
                              "outer"
                            ]
                          },
                          "borderWidth": {
                            "type": "number",
                            "description": "The size of the node's border.",
                            "minimum": 0
                          },
                          "borderStyle": {
                            "type": "string",
                            "description": "The style of the node's border",
                            "enum": [
                              "solid",
                              "dotted",
                              "dashed",
                              "double"
                            ]
                          },
                          "borderColor": {
                            "type": "string",
                            "description": "The colour of the node's border. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "borderOpacity": {
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
                          "textHalign": {
                            "type": "string",
                            "description": "The horizontal alignment of a node's label",
                            "enum": [
                              "left",
                              "center",
                              "right"
                            ]
                          },
                          "textValign": {
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
                          "activeBgColor": {
                            "type": "string",
                            "description": "The colour of the indicator shown when the background is grabbed by the user. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "activeBgOpacity": {
                            "type": "string",
                            "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                            "maxLength": 50
                          },
                          "activeBgSize": {
                            "type": "string",
                            "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                            "maxLength": 50
                          },
                          "selectionBoxColor": {
                            "type": "string",
                            "description": "The background colour of the selection box used for drag selection. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "selectionBoxBorderWidth": {
                            "type": "number",
                            "description": "The size of the border on the selection box. Selector needs to be *core*",
                            "minimum": 0
                          },
                          "selectionBoxOpacity": {
                            "type": "number",
                            "description": "The opacity of the selection box. Selector needs to be *core*",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "outsideTextureBgColor": {
                            "type": "string",
                            "description": "The colour of the area outside the viewport texture when initOptions.textureOnViewport === true. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "outsideTextureBgOpacity": {
                            "type": "number",
                            "description": "The opacity of the area outside the viewport texture. Selector needs to be *core*",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "shapePolygonPoints": {
                            "type": "string",
                            "description": "An array (or a space-separated string) of numbers ranging on [-1, 1], representing alternating x and y values (i.e. x1 y1 x2 y2, x3 y3 ...). This represents the points in the polygon for the node's shape. The bounding box of the node is given by (-1, -1), (1, -1), (1, 1), (-1, 1). The node's position is the origin (0, 0 )",
                            "maxLength": 2000
                          },
                          "menuBackgroundColor": {
                            "type": "string",
                            "description": "The colour of the background of the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "menuBackgroundOpacity": {
                            "type": "number",
                            "description": "The opacity of the background of the component menu.",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "menuForgroundColor": {
                            "type": "string",
                            "description": "The colour of the text or icons in the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          }
                        }
                      }
                    ]
                  },
                  "status": {
                    "type": "string",
                    "description": "Connection status",
                    "x-oapi-codegen-extra-tags": {
                      "json": "status"
                    },
                    "maxLength": 255
                  },
                  "credentialId": {
                    "type": "string",
                    "format": "uuid",
                    "description": "Associated credential ID",
                    "x-go-name": "CredentialID",
                    "x-oapi-codegen-extra-tags": {
                      "json": "credentialId,omitempty"
                    }
                  }
                },
                "required": [
                  "name",
                  "kind",
                  "type",
                  "subType",
                  "status"
                ]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Connection registered",
            "content": {
              "application/json": {
                "schema": {
                  "$id": "https://schemas.meshery.io/connection.yaml",
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "description": "Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections",
                  "additionalProperties": false,
                  "type": "object",
                  "required": [
                    "id",
                    "schemaVersion",
                    "name",
                    "type",
                    "subType",
                    "kind",
                    "status"
                  ],
                  "properties": {
                    "id": {
                      "description": "Connection ID",
                      "x-order": 1,
                      "x-go-name": "ID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "name": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      },
                      "x-order": 2,
                      "type": "string",
                      "description": "Connection Name",
                      "minLength": 1,
                      "maxLength": 255
                    },
                    "description": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "description",
                        "json": "description"
                      },
                      "x-order": 3,
                      "type": "string",
                      "description": "Human-readable description of the connection and its purpose.",
                      "maxLength": 1000
                    },
                    "url": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "url",
                        "json": "url"
                      },
                      "x-order": 4,
                      "type": "string",
                      "format": "uri",
                      "description": "URL of the remote resource this connection points to (e.g. the Helm repository URL, the Kubernetes API server endpoint, the Grafana instance URL).",
                      "maxLength": 2048
                    },
                    "credentialId": {
                      "x-go-name": "CredentialID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "credential_id",
                        "json": "credentialId"
                      },
                      "x-order": 5,
                      "description": "Associated Credential ID",
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
                        "json": "type",
                        "yaml": "type"
                      },
                      "x-go-name": "ConnectionType",
                      "x-order": 6,
                      "type": "string",
                      "description": "Connection Type (platform, telemetry, collaboration)",
                      "maxLength": 255
                    },
                    "subType": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "sub_type",
                        "json": "subType"
                      },
                      "x-order": 7,
                      "type": "string",
                      "description": "Connection Subtype (cloud, identity, metrics, chat, git, orchestration)",
                      "maxLength": 255
                    },
                    "kind": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "kind"
                      },
                      "x-order": 8,
                      "type": "string",
                      "description": "Connection Kind (meshery, kubernetes, prometheus, grafana, gke, aws, azure, slack, github)",
                      "maxLength": 255
                    },
                    "model": {
                      "x-go-type": "*modelv1beta1.ModelDefinition",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta1/model",
                        "name": "modelv1beta1"
                      },
                      "x-order": 7,
                      "description": "Reference to the specific registered model to which the component belongs and from which model version, category, and other properties may be referenced. Learn more at https://docs.meshery.io/concepts/models",
                      "x-oapi-codegen-extra-tags": {
                        "gorm": "foreignKey:ModelID;references:ID",
                        "json": "model",
                        "yaml": "model"
                      },
                      "$id": "https://schemas.meshery.io/model.yaml",
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
                          "default": "models.meshery.io/v1beta1",
                          "type": "string",
                          "minLength": 2,
                          "maxLength": 100,
                          "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                          "example": [
                            "v1",
                            "v1alpha1",
                            "v2beta3",
                            "v1.custom-suffix",
                            "models.meshery.io/v1beta1",
                            "capability.meshery.io/v1alpha1"
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
                          },
                          "default": "untitled-model"
                        },
                        "displayName": {
                          "description": "Human-readable name for the model.",
                          "helperText": "Model display name may include letters, numbers, and spaces. Special characters are not allowed.",
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
                            "yaml": "description,omitempty",
                            "json": "description,omitempty"
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
                            "gorm": "foreignKey:RegistrantId;references:ID"
                          },
                          "x-order": 8,
                          "x-go-type": "connectionv1beta1.Connection",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/v1beta1/connection",
                            "name": "connectionv1beta1"
                          },
                          "$id": "https://schemas.meshery.io/connection.yaml",
                          "$schema": "http://json-schema.org/draft-07/schema#",
                          "description": "Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections",
                          "additionalProperties": false,
                          "type": "object",
                          "required": [
                            "id",
                            "schemaVersion",
                            "name",
                            "type",
                            "subType",
                            "kind",
                            "status"
                          ],
                          "properties": {
                            "id": {
                              "description": "Connection ID",
                              "x-order": 1,
                              "x-go-name": "ID",
                              "x-oapi-codegen-extra-tags": {
                                "db": "id",
                                "yaml": "id"
                              },
                              "type": "string",
                              "format": "uuid",
                              "x-go-type": "uuid.UUID",
                              "x-go-type-import": {
                                "path": "github.com/gofrs/uuid"
                              }
                            },
                            "name": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "name",
                                "yaml": "name"
                              },
                              "x-order": 2,
                              "type": "string",
                              "description": "Connection Name"
                            },
                            "credentialId": {
                              "x-go-name": "CredentialID",
                              "x-oapi-codegen-extra-tags": {
                                "db": "credential_id",
                                "yaml": "credentialId"
                              },
                              "x-order": 3,
                              "description": "Associated Credential ID",
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
                                "yaml": "type"
                              },
                              "x-order": 4,
                              "type": "string",
                              "description": "Connection Type (platform, telemetry, collaboration)"
                            },
                            "subType": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "sub_type",
                                "yaml": "subType"
                              },
                              "x-order": 5,
                              "type": "string",
                              "description": "Connection Subtype (cloud, identity, metrics, chat, git, orchestration)"
                            },
                            "kind": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "kind",
                                "yaml": "kind"
                              },
                              "x-order": 6,
                              "type": "string",
                              "description": "Connection Kind (meshery, kubernetes, prometheus, grafana, gke, aws, azure, slack, github)"
                            },
                            "metadata": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "metadata",
                                "yaml": "metadata"
                              },
                              "x-order": 7,
                              "x-go-type": "core.Map",
                              "x-go-type-import": {
                                "path": "github.com/meshery/schemas/models/core"
                              },
                              "x-go-type-skip-optional-pointer": true,
                              "type": "object",
                              "description": "Additional connection metadata"
                            },
                            "status": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "status",
                                "yaml": "status"
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
                                "db": "user_id",
                                "yaml": "user_id"
                              },
                              "x-order": 9,
                              "description": "User ID who owns this connection",
                              "type": "string",
                              "format": "uuid",
                              "x-go-type": "uuid.UUID",
                              "x-go-type-import": {
                                "path": "github.com/gofrs/uuid"
                              }
                            },
                            "created_at": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "created_at",
                                "yaml": "created_at"
                              },
                              "x-order": 10,
                              "type": "string",
                              "format": "date-time",
                              "x-go-type-skip-optional-pointer": true
                            },
                            "updated_at": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "updated_at",
                                "yaml": "updated_at"
                              },
                              "x-order": 11,
                              "type": "string",
                              "format": "date-time",
                              "x-go-type-skip-optional-pointer": true
                            },
                            "deleted_at": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "deleted_at",
                                "yaml": "deleted_at"
                              },
                              "x-order": 12,
                              "description": "SQL null Timestamp to handle null values of time.",
                              "x-go-type": "meshcore.NullTime",
                              "x-go-type-import": {
                                "name": "meshcore",
                                "path": "github.com/meshery/schemas/models/core"
                              },
                              "type": "string",
                              "format": "date-time",
                              "x-go-type-skip-optional-pointer": true
                            },
                            "environments": {
                              "type": "array",
                              "description": "Associated environments for this connection",
                              "items": {
                                "x-go-type": "*environmentv1beta1.Environment",
                                "x-go-type-import": {
                                  "path": "github.com/meshery/schemas/models/v1beta1/environment",
                                  "name": "environmentv1beta1"
                                },
                                "$id": "https://schemas.meshery.io/environment.yaml",
                                "$schema": "http://json-schema.org/draft-07/schema#",
                                "title": "Environment",
                                "description": "Environments allow you to logically group related Connections and their associated Credentials. Learn more at https://docs.meshery.io/concepts/logical/environments",
                                "additionalProperties": false,
                                "type": "object",
                                "example": {
                                  "id": "00000000-0000-0000-0000-000000000000",
                                  "schemaVersion": "environments.meshery.io/v1beta1",
                                  "name": "Production Environment",
                                  "description": "Connections and credentials for the production cluster.",
                                  "organization_id": "00000000-0000-0000-0000-000000000000",
                                  "owner": "00000000-0000-0000-0000-000000000000",
                                  "created_at": "0001-01-01T00:00:00Z",
                                  "metadata": {},
                                  "updated_at": "0001-01-01T00:00:00Z",
                                  "deleted_at": null
                                },
                                "required": [
                                  "id",
                                  "schemaVersion",
                                  "name",
                                  "description",
                                  "organization_id"
                                ],
                                "properties": {
                                  "id": {
                                    "description": "ID",
                                    "x-order": 1,
                                    "x-go-name": "ID",
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "id",
                                      "yaml": "id"
                                    },
                                    "type": "string",
                                    "format": "uuid",
                                    "x-go-type": "uuid.UUID",
                                    "x-go-type-import": {
                                      "path": "github.com/gofrs/uuid"
                                    }
                                  },
                                  "schemaVersion": {
                                    "description": "Specifies the version of the schema to which the environment conforms.",
                                    "x-order": 2,
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "schemaVersion",
                                      "db": "-",
                                      "gorm": "-"
                                    },
                                    "default": "environments.meshery.io/v1beta1",
                                    "type": "string",
                                    "minLength": 2,
                                    "maxLength": 100,
                                    "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                                    "example": [
                                      "v1",
                                      "v1alpha1",
                                      "v2beta3",
                                      "v1.custom-suffix",
                                      "models.meshery.io/v1beta1",
                                      "capability.meshery.io/v1alpha1"
                                    ]
                                  },
                                  "name": {
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "name",
                                      "yaml": "name"
                                    },
                                    "x-order": 3,
                                    "type": "string",
                                    "maxLength": 100,
                                    "description": "Environment name"
                                  },
                                  "description": {
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "description",
                                      "yaml": "description"
                                    },
                                    "x-order": 4,
                                    "type": "string",
                                    "maxLength": 1000,
                                    "description": "Environment description"
                                  },
                                  "organization_id": {
                                    "x-go-name": "OrganizationID",
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "organization_id",
                                      "yaml": "organization_id"
                                    },
                                    "x-order": 5,
                                    "description": "Environment organization ID",
                                    "type": "string",
                                    "format": "uuid",
                                    "x-go-type": "uuid.UUID",
                                    "x-go-type-import": {
                                      "path": "github.com/gofrs/uuid"
                                    }
                                  },
                                  "owner": {
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "owner",
                                      "yaml": "owner"
                                    },
                                    "x-order": 6,
                                    "description": "Environment owner",
                                    "type": "string",
                                    "format": "uuid",
                                    "x-go-type": "uuid.UUID",
                                    "x-go-type-import": {
                                      "path": "github.com/gofrs/uuid"
                                    }
                                  },
                                  "created_at": {
                                    "x-order": 7,
                                    "description": "Timestamp when the resource was created.",
                                    "x-go-type": "time.Time",
                                    "type": "string",
                                    "format": "date-time",
                                    "x-go-name": "CreatedAt",
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "created_at",
                                      "yaml": "created_at"
                                    },
                                    "x-go-type-skip-optional-pointer": true
                                  },
                                  "metadata": {
                                    "description": "Additional metadata associated with the environment.",
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "metadata",
                                      "yaml": "metadata"
                                    },
                                    "x-order": 8,
                                    "x-go-type": "core.Map",
                                    "x-go-type-skip-optional-pointer": true,
                                    "type": "object"
                                  },
                                  "updated_at": {
                                    "x-order": 9,
                                    "description": "Timestamp when the resource was updated.",
                                    "x-go-type": "time.Time",
                                    "type": "string",
                                    "format": "date-time",
                                    "x-go-name": "UpdatedAt",
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "updated_at",
                                      "yaml": "updated_at"
                                    },
                                    "x-go-type-skip-optional-pointer": true
                                  },
                                  "deleted_at": {
                                    "description": "Timestamp when the environment was soft deleted. Null while the environment remains active.",
                                    "nullable": true,
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "deleted_at",
                                      "yaml": "deleted_at"
                                    },
                                    "x-go-type": "core.NullTime",
                                    "x-go-import": "database/sql",
                                    "x-order": 10,
                                    "x-go-type-import": {
                                      "name": "meshcore",
                                      "path": "github.com/meshery/schemas/models/core"
                                    },
                                    "type": "string",
                                    "format": "date-time",
                                    "x-go-type-skip-optional-pointer": true
                                  }
                                }
                              },
                              "x-oapi-codegen-extra-tags": {
                                "db": "-",
                                "yaml": "environments",
                                "gorm": "-"
                              },
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 13
                            },
                            "schemaVersion": {
                              "description": "Specifies the version of the schema used for the definition.",
                              "x-order": 14,
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "schemaVersion",
                                "db": "-",
                                "gorm": "-"
                              },
                              "default": "connections.meshery.io/v1beta1",
                              "type": "string",
                              "minLength": 2,
                              "maxLength": 100,
                              "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                              "example": [
                                "v1",
                                "v1alpha1",
                                "v2beta3",
                                "v1.custom-suffix",
                                "models.meshery.io/v1beta1",
                                "capability.meshery.io/v1alpha1"
                              ]
                            }
                          }
                        },
                        "registrantId": {
                          "description": "ID of the registrant.",
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "connection_id",
                            "json": "connection_id",
                            "gorm": "column:connection_id"
                          },
                          "x-order": 8,
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
                            "yaml": "-",
                            "json": "-",
                            "gorm": "categoryID"
                          },
                          "x-order": 8,
                          "type": "string",
                          "format": "uuid",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          }
                        },
                        "category": {
                          "x-order": 9,
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "category",
                            "json": "category",
                            "gorm": "foreignKey:CategoryId;references:ID"
                          },
                          "x-go-type": "categoryv1beta1.CategoryDefinition",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/v1beta1/category",
                            "name": "categoryv1beta1"
                          },
                          "$id": "https://schemas.meshery.io/category.yaml",
                          "$schema": "http://json-schema.org/draft-07/schema#",
                          "type": "object",
                          "additionalProperties": false,
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
                              "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                              "x-go-type": "uuid.UUID",
                              "x-go-type-import": {
                                "path": "github.com/gofrs/uuid"
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
                              "description": "Additional metadata associated with the category.",
                              "type": "object",
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "metadata,omitempty",
                                "json": "metadata,omitempty",
                                "gorm": "type:bytes;serializer:json"
                              },
                              "x-order": 3
                            }
                          }
                        },
                        "subCategory": {
                          "x-order": 10,
                          "x-go-type": "subcategoryv1beta1.SubCategoryDefinition",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/v1beta1/subcategory",
                            "name": "subcategoryv1beta1"
                          },
                          "$id": "https://schemas.meshery.io/category.yaml",
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
                                "x-go-type": "capabilityv1alpha1.Capability",
                                "x-go-type-import": {
                                  "path": "github.com/meshery/schemas/models/v1alpha1/capability",
                                  "name": "capabilityv1alpha1"
                                },
                                "$id": "https://schemas.meshery.io/capability.yaml",
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
                                    "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                                    "example": [
                                      "v1",
                                      "v1alpha1",
                                      "v2beta3",
                                      "v1.custom-suffix",
                                      "models.meshery.io/v1beta1",
                                      "capability.meshery.io/v1alpha1"
                                    ]
                                  },
                                  "version": {
                                    "description": "Version of the capability definition.",
                                    "type": "string",
                                    "minLength": 5,
                                    "maxLength": 100,
                                    "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                                  },
                                  "displayName": {
                                    "description": "Name of the capability in human-readible format.",
                                    "type": "string",
                                    "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
                                  },
                                  "description": {
                                    "type": "string",
                                    "description": "A written representation of the purpose and characteristics of the capability.",
                                    "maxLength": 5000
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
                                    "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
                                  },
                                  "type": {
                                    "description": "Classification of capabilities. Used to group capabilities similar in nature.",
                                    "type": "string",
                                    "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
                                  },
                                  "subType": {
                                    "description": "Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Capability.",
                                    "type": "string",
                                    "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
                                  },
                                  "key": {
                                    "description": "Key that backs the capability.",
                                    "type": "string",
                                    "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
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
                                      "description": "A string starting with an alphanumeric character. Spaces and hyphens allowed."
                                    }
                                  },
                                  "status": {
                                    "type": "string",
                                    "description": "Status of the capability",
                                    "default": "enabled",
                                    "enum": [
                                      "enabled",
                                      "disabled"
                                    ]
                                  },
                                  "metadata": {
                                    "type": "object",
                                    "description": "Metadata contains additional information associated with the capability. Extension point.",
                                    "additionalProperties": true
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
                                    "schemaVersion": "capability.meshery.io/v1beta1",
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
                                    "schemaVersion": "capability.meshery.io/v1beta1",
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
                                    "schemaVersion": "capability.meshery.io/v1beta1",
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
                                    "schemaVersion": "capability.meshery.io/v1beta1",
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
                            }
                          },
                          "x-oapi-codegen-extra-tags": {
                            "gorm": "type:bytes;serializer:json",
                            "json": "metadata",
                            "yaml": "metadata"
                          },
                          "x-order": 11,
                          "additionalProperties": true
                        },
                        "model": {
                          "x-oapi-codegen-extra-tags": {
                            "gorm": "type:bytes;serializer:json"
                          },
                          "x-order": 12,
                          "type": "object",
                          "description": "Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31).",
                          "required": [
                            "version"
                          ],
                          "properties": {
                            "version": {
                              "description": "Version of the model as defined by the registrant.",
                              "x-oapi-codegen-extra-tags": {
                                "json": "version"
                              },
                              "x-order": 1,
                              "type": "string",
                              "minLength": 5,
                              "maxLength": 100,
                              "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
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
                          "description": "The relationships of the model."
                        },
                        "components": {
                          "type": "array",
                          "x-go-type": "interface{}",
                          "x-oapi-codegen-extra-tags": {
                            "gorm": "-",
                            "json": "components",
                            "yaml": "components"
                          },
                          "description": "The components of the model."
                        },
                        "componentsCount": {
                          "type": "integer",
                          "description": "Number of components associated with the model.",
                          "x-order": 13,
                          "x-oapi-codegen-extra-tags": {
                            "json": "components_count",
                            "yaml": "components_count",
                            "gorm": "-"
                          },
                          "default": 0,
                          "minimum": 0
                        },
                        "relationshipsCount": {
                          "type": "integer",
                          "description": "Number of relationships associated with the model.",
                          "x-order": 13,
                          "x-oapi-codegen-extra-tags": {
                            "gorm": "-",
                            "json": "relationships_count",
                            "yaml": "relationships_count"
                          },
                          "default": 0,
                          "minimum": 0
                        },
                        "created_at": {
                          "x-order": 14,
                          "description": "Timestamp when the resource was created.",
                          "x-go-type": "time.Time",
                          "type": "string",
                          "format": "date-time",
                          "x-go-name": "CreatedAt",
                          "x-oapi-codegen-extra-tags": {
                            "db": "created_at",
                            "yaml": "created_at"
                          },
                          "x-go-type-skip-optional-pointer": true
                        },
                        "updated_at": {
                          "x-order": 15,
                          "description": "Timestamp when the resource was updated.",
                          "x-go-type": "time.Time",
                          "type": "string",
                          "format": "date-time",
                          "x-go-name": "UpdatedAt",
                          "x-oapi-codegen-extra-tags": {
                            "db": "updated_at",
                            "yaml": "updated_at"
                          },
                          "x-go-type-skip-optional-pointer": true
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
                    "modelReference": {
                      "x-go-type": "modelv1beta1.ModelReference",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta1/model",
                        "name": "modelv1beta1"
                      },
                      "x-order": 8,
                      "description": "Reference to the specific registered model to which the component belongs and from which model version, category, and other properties may be referenced. Learn more at https://docs.meshery.io/concepts/models",
                      "x-oapi-codegen-extra-tags": {
                        "gorm": "-"
                      },
                      "type": "object",
                      "required": [
                        "id",
                        "name",
                        "version",
                        "displayName",
                        "model",
                        "registrant"
                      ],
                      "properties": {
                        "id": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          }
                        },
                        "name": {
                          "type": "string",
                          "description": "The unique name for the model within the scope of a registrant.",
                          "pattern": "^[a-z0-9-]+$",
                          "examples": [
                            "cert-manager"
                          ]
                        },
                        "version": {
                          "description": "Version of the model definition.",
                          "type": "string",
                          "minLength": 5,
                          "maxLength": 100,
                          "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                        },
                        "displayName": {
                          "type": "string",
                          "description": "Human-readable name for the model.",
                          "minLength": 1,
                          "maxLength": 100,
                          "pattern": "^[a-zA-Z0-9 ]+$",
                          "examples": [
                            "Cert Manager"
                          ]
                        },
                        "model": {
                          "type": "object",
                          "description": "Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31).",
                          "required": [
                            "version"
                          ],
                          "properties": {
                            "version": {
                              "description": "Version of the model as defined by the registrant.",
                              "x-oapi-codegen-extra-tags": {
                                "json": "version"
                              },
                              "x-order": 1,
                              "type": "string",
                              "minLength": 5,
                              "maxLength": 100,
                              "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                            }
                          }
                        },
                        "registrant": {
                          "x-go-type": "RegistrantReference",
                          "x-oapi-codegen-extra-tags": {
                            "json": "registrant"
                          },
                          "type": "object",
                          "required": [
                            "kind"
                          ],
                          "properties": {
                            "kind": {
                              "type": "string",
                              "description": "Kind of the registrant.",
                              "maxLength": 255
                            }
                          }
                        }
                      }
                    },
                    "modelId": {
                      "description": "Foreign key to the model to which the component belongs. Populated by the ORM from the `model_id` column and suppressed on the JSON wire; consumers use the nested `model` object for wire-level access.",
                      "x-go-name": "ModelID",
                      "x-oapi-codegen-extra-tags": {
                        "gorm": "column:model_id",
                        "db": "model_id",
                        "yaml": "-",
                        "json": "-"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "metadata": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata"
                      },
                      "x-order": 9,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "type": "object",
                      "description": "Additional connection metadata"
                    },
                    "credentialSchema": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "credential_schema"
                      },
                      "x-order": 9,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "type": "object",
                      "description": "Schema for the credential Associated with the connection"
                    },
                    "connectionSchema": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "connection_schema"
                      },
                      "x-order": 9,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "type": "object",
                      "description": "Schema for the connection"
                    },
                    "styles": {
                      "x-oapi-codegen-extra-tags": {
                        "gorm": "type:bytes;serializer:json",
                        "yaml": "styles",
                        "json": "styles"
                      },
                      "x-go-type": "core.ComponentStyles",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-order": 17,
                      "description": "Visualization styles for the connection, including svgColor and svgWhite used for UI representation.",
                      "type": "object",
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
                              "description": "Primary color of the component used for UI representation.",
                              "maxLength": 500
                            },
                            "secondaryColor": {
                              "type": "string",
                              "description": "Secondary color of the entity used for UI representation.",
                              "maxLength": 500
                            },
                            "svgWhite": {
                              "type": "string",
                              "description": "White SVG of the entity used for UI representation on dark background.",
                              "maxLength": 500
                            },
                            "svgColor": {
                              "type": "string",
                              "description": "Colored SVG of the entity used for UI representation on light background.",
                              "maxLength": 500
                            },
                            "svgComplete": {
                              "type": "string",
                              "description": "Complete SVG of the entity used for UI representation, often inclusive of background.",
                              "maxLength": 500
                            },
                            "color": {
                              "type": "string",
                              "description": "The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 500
                            },
                            "textOpacity": {
                              "type": "number",
                              "description": "The opacity of the label text, including its outline.",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "fontFamily": {
                              "type": "string",
                              "description": "A comma-separated list of font names to use on the label text.",
                              "maxLength": 500
                            },
                            "fontSize": {
                              "type": "string",
                              "description": "The size of the label text.",
                              "maxLength": 500
                            },
                            "fontStyle": {
                              "type": "string",
                              "description": "A CSS font style to be applied to the label text.",
                              "maxLength": 500
                            },
                            "fontWeight": {
                              "type": "string",
                              "description": "A CSS font weight to be applied to the label text.",
                              "maxLength": 500
                            },
                            "textTransform": {
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
                            "zIndex": {
                              "type": "integer",
                              "description": "An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index.",
                              "minimum": 0
                            },
                            "label": {
                              "type": "string",
                              "description": "The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id",
                              "maxLength": 500
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
                                  "minimum": -1000000,
                                  "maximum": 1000000,
                                  "x-go-type": "float64"
                                },
                                "y": {
                                  "type": "number",
                                  "description": "The y-coordinate of the node.",
                                  "minimum": -1000000,
                                  "maximum": 1000000,
                                  "x-go-type": "float64"
                                }
                              }
                            },
                            "bodyText": {
                              "type": "string",
                              "description": "The text to display for an element's body. Can give a path, e.g. data(id) will label with the elements id",
                              "maxLength": 500
                            },
                            "bodyTextWrap": {
                              "type": "string",
                              "description": "How to wrap the text in the node. Can be 'none', 'wrap', or 'ellipsis'.",
                              "enum": [
                                "none",
                                "wrap",
                                "ellipsis"
                              ]
                            },
                            "bodyTextMaxWidth": {
                              "type": "string",
                              "description": "The maximum width for wrapping text in the node.",
                              "maxLength": 50
                            },
                            "bodyTextOpacity": {
                              "type": "number",
                              "description": "The opacity of the node's body text, including its outline.",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "bodyTextBackgroundColor": {
                              "type": "string",
                              "description": "The colour of the node's body text background. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "bodyTextFontSize": {
                              "type": "number",
                              "description": "The size of the node's body text.",
                              "minimum": 0
                            },
                            "bodyTextColor": {
                              "type": "string",
                              "description": "The colour of the node's body text. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "bodyTextFontWeight": {
                              "type": "string",
                              "description": "A CSS font weight to be applied to the node's body text.",
                              "maxLength": 50
                            },
                            "bodyTextHorizontalAlign": {
                              "type": "string",
                              "description": "A CSS horizontal alignment to be applied to the node's body text.",
                              "maxLength": 50
                            },
                            "bodyTextDecoration": {
                              "type": "string",
                              "description": "A CSS text decoration to be applied to the node's body text.",
                              "maxLength": 100
                            },
                            "bodyTextVerticalAlign": {
                              "type": "string",
                              "description": "A CSS vertical alignment to be applied to the node's body text.",
                              "maxLength": 50
                            },
                            "width": {
                              "type": "number",
                              "description": "The width of the node's body or the width of an edge's line.",
                              "minimum": 0
                            },
                            "height": {
                              "type": "number",
                              "description": "The height of the node's body",
                              "minimum": 0
                            },
                            "backgroundImage": {
                              "type": "string",
                              "format": "uri",
                              "description": "The URL that points to the image to show in the node.",
                              "maxLength": 2048
                            },
                            "backgroundColor": {
                              "type": "string",
                              "description": "The colour of the node's body. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "backgroundBlacken": {
                              "type": "number",
                              "description": "Blackens the node's body for values from 0 to 1; whitens the node's body for values from 0 to -1.",
                              "maximum": 1,
                              "minimum": -1
                            },
                            "backgroundOpacity": {
                              "type": "number",
                              "description": "The opacity level of the node's background colour",
                              "maximum": 1,
                              "minimum": 0
                            },
                            "backgroundPositionX": {
                              "type": "string",
                              "description": "The x position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                              "maxLength": 50
                            },
                            "backgroundPositionY": {
                              "type": "string",
                              "description": "The y position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                              "maxLength": 50
                            },
                            "backgroundOffsetX": {
                              "type": "string",
                              "description": "The x offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                              "maxLength": 50
                            },
                            "backgroundOffsetY": {
                              "type": "string",
                              "description": "The y offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                              "maxLength": 50
                            },
                            "backgroundFit": {
                              "type": "string",
                              "description": "How the background image is fit to the node. Can be 'none', 'contain', or 'cover'.",
                              "enum": [
                                "none",
                                "contain",
                                "cover"
                              ]
                            },
                            "backgroundClip": {
                              "type": "string",
                              "description": "How the background image is clipped to the node. Can be 'none', 'node', or 'node-border'.",
                              "enum": [
                                "none",
                                "node",
                                "node-border"
                              ]
                            },
                            "backgroundWidthRelativeTo": {
                              "type": "string",
                              "description": "How the background image's width is determined. Can be 'none', 'inner', or 'outer'.",
                              "enum": [
                                "none",
                                "inner",
                                "outer"
                              ]
                            },
                            "backgroundHeightRelativeTo": {
                              "type": "string",
                              "description": "How the background image's height is determined. Can be 'none', 'inner', or 'outer'.",
                              "enum": [
                                "none",
                                "inner",
                                "outer"
                              ]
                            },
                            "borderWidth": {
                              "type": "number",
                              "description": "The size of the node's border.",
                              "minimum": 0
                            },
                            "borderStyle": {
                              "type": "string",
                              "description": "The style of the node's border",
                              "enum": [
                                "solid",
                                "dotted",
                                "dashed",
                                "double"
                              ]
                            },
                            "borderColor": {
                              "type": "string",
                              "description": "The colour of the node's border. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "borderOpacity": {
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
                            "textHalign": {
                              "type": "string",
                              "description": "The horizontal alignment of a node's label",
                              "enum": [
                                "left",
                                "center",
                                "right"
                              ]
                            },
                            "textValign": {
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
                            "activeBgColor": {
                              "type": "string",
                              "description": "The colour of the indicator shown when the background is grabbed by the user. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "activeBgOpacity": {
                              "type": "string",
                              "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                              "maxLength": 50
                            },
                            "activeBgSize": {
                              "type": "string",
                              "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                              "maxLength": 50
                            },
                            "selectionBoxColor": {
                              "type": "string",
                              "description": "The background colour of the selection box used for drag selection. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "selectionBoxBorderWidth": {
                              "type": "number",
                              "description": "The size of the border on the selection box. Selector needs to be *core*",
                              "minimum": 0
                            },
                            "selectionBoxOpacity": {
                              "type": "number",
                              "description": "The opacity of the selection box. Selector needs to be *core*",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "outsideTextureBgColor": {
                              "type": "string",
                              "description": "The colour of the area outside the viewport texture when initOptions.textureOnViewport === true. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "outsideTextureBgOpacity": {
                              "type": "number",
                              "description": "The opacity of the area outside the viewport texture. Selector needs to be *core*",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "shapePolygonPoints": {
                              "type": "string",
                              "description": "An array (or a space-separated string) of numbers ranging on [-1, 1], representing alternating x and y values (i.e. x1 y1 x2 y2, x3 y3 ...). This represents the points in the polygon for the node's shape. The bounding box of the node is given by (-1, -1), (1, -1), (1, 1), (-1, 1). The node's position is the origin (0, 0 )",
                              "maxLength": 2000
                            },
                            "menuBackgroundColor": {
                              "type": "string",
                              "description": "The colour of the background of the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "menuBackgroundOpacity": {
                              "type": "number",
                              "description": "The opacity of the background of the component menu.",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "menuForgroundColor": {
                              "type": "string",
                              "description": "The colour of the text or icons in the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            }
                          }
                        }
                      ]
                    },
                    "status": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      },
                      "x-order": 10,
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
                    "transitionMap": {
                      "type": "object",
                      "description": "Map describing the connection state machine. Each key is a current connection status and its value is the list of states the connection may transition to from that status, along with a description of each transition.",
                      "additionalProperties": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "additionalProperties": false,
                          "description": "A single permissible state transition for a connection, describing the next reachable state and the meaning of that transition.",
                          "required": [
                            "nextState"
                          ],
                          "properties": {
                            "nextState": {
                              "type": "string",
                              "description": "Connection Status Value",
                              "x-go-name": "ConnectionStatusValue",
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
                              "x-order": 1
                            },
                            "description": {
                              "type": "string",
                              "description": "Human-readable explanation of when or why this transition occurs.",
                              "maxLength": 1000,
                              "x-oapi-codegen-extra-tags": {
                                "json": "description,omitempty"
                              },
                              "x-order": 2
                            }
                          }
                        }
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "gorm": "type:bytes;serializer:json",
                        "json": "transitionMap,omitempty"
                      },
                      "x-order": 18
                    },
                    "userId": {
                      "x-go-name": "UserID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "user_id",
                        "json": "userId"
                      },
                      "x-order": 11,
                      "description": "User ID who owns this connection",
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "createdAt": {
                      "description": "Timestamp when the connection was created.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "createdAt"
                      },
                      "x-order": 12,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp when the connection was last updated.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updatedAt"
                      },
                      "x-order": 13,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "description": "Timestamp when the connection was soft-deleted, if applicable.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deletedAt"
                      },
                      "x-order": 14,
                      "x-go-type": "meshcore.NullTime",
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "environments": {
                      "type": "array",
                      "description": "Associated environments for this connection",
                      "items": {
                        "x-go-type": "*environmentv1beta3.Environment",
                        "x-go-type-import": {
                          "path": "github.com/meshery/schemas/models/v1beta3/environment",
                          "name": "environmentv1beta3"
                        },
                        "$id": "https://schemas.meshery.io/environment.yaml",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "title": "Environment",
                        "description": "Environments allow you to logically group related Connections and their associated Credentials. Learn more at https://docs.meshery.io/concepts/logical/environments",
                        "additionalProperties": false,
                        "type": "object",
                        "example": {
                          "id": "00000000-0000-0000-0000-000000000000",
                          "schemaVersion": "environments.meshery.io/v1beta3",
                          "name": "Production Environment",
                          "description": "Connections and credentials for the production cluster.",
                          "organizationId": "00000000-0000-0000-0000-000000000000",
                          "owner": "00000000-0000-0000-0000-000000000000",
                          "createdAt": "0001-01-01T00:00:00Z",
                          "metadata": {},
                          "updatedAt": "0001-01-01T00:00:00Z",
                          "deletedAt": null
                        },
                        "required": [
                          "id",
                          "schemaVersion",
                          "name",
                          "description",
                          "organizationId"
                        ],
                        "properties": {
                          "id": {
                            "description": "ID",
                            "x-order": 1,
                            "x-go-name": "ID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "id",
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
                            "description": "Specifies the version of the schema to which the environment conforms.",
                            "x-order": 2,
                            "x-oapi-codegen-extra-tags": {
                              "json": "schemaVersion",
                              "db": "-",
                              "gorm": "-"
                            },
                            "default": "environments.meshery.io/v1beta3",
                            "type": "string",
                            "minLength": 2,
                            "maxLength": 100,
                            "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                            "example": [
                              "v1",
                              "v1alpha1",
                              "v2beta3",
                              "v1.custom-suffix",
                              "models.meshery.io/v1beta1",
                              "capability.meshery.io/v1alpha1"
                            ]
                          },
                          "name": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "name",
                              "json": "name"
                            },
                            "x-order": 3,
                            "type": "string",
                            "maxLength": 100,
                            "description": "Environment name"
                          },
                          "description": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "description",
                              "json": "description"
                            },
                            "x-order": 4,
                            "type": "string",
                            "maxLength": 1000,
                            "description": "Environment description"
                          },
                          "organizationId": {
                            "x-go-name": "OrganizationID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "organization_id",
                              "json": "organizationId"
                            },
                            "x-order": 5,
                            "description": "Environment organization ID",
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "owner": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "owner",
                              "json": "owner"
                            },
                            "x-order": 6,
                            "description": "Environment owner",
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "createdAt": {
                            "description": "Timestamp when the environment was created.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "yaml": "created_at",
                              "json": "createdAt"
                            },
                            "x-order": 7,
                            "x-go-type": "time.Time",
                            "type": "string",
                            "format": "date-time",
                            "x-go-name": "CreatedAt",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "metadata": {
                            "description": "Additional metadata associated with the environment.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "metadata",
                              "json": "metadata"
                            },
                            "x-order": 8,
                            "x-go-type": "core.Map",
                            "x-go-type-skip-optional-pointer": true,
                            "type": "object"
                          },
                          "updatedAt": {
                            "description": "Timestamp when the environment was last updated.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "yaml": "updated_at",
                              "json": "updatedAt"
                            },
                            "x-order": 9,
                            "x-go-type": "time.Time",
                            "type": "string",
                            "format": "date-time",
                            "x-go-name": "UpdatedAt",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deletedAt": {
                            "description": "Timestamp when the environment was soft deleted. Null while the environment remains active.",
                            "nullable": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "json": "deletedAt"
                            },
                            "x-go-type": "core.NullTime",
                            "x-go-import": "database/sql",
                            "x-order": 10,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          }
                        }
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "-",
                        "gorm": "-"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 15
                    },
                    "schemaVersion": {
                      "description": "Specifies the version of the schema used for the definition.",
                      "x-order": 16,
                      "x-oapi-codegen-extra-tags": {
                        "db": "-",
                        "gorm": "-"
                      },
                      "default": "connections.meshery.io/v1beta3",
                      "type": "string",
                      "minLength": 2,
                      "maxLength": 100,
                      "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                      "example": [
                        "v1",
                        "v1alpha1",
                        "v2beta3",
                        "v1.custom-suffix",
                        "models.meshery.io/v1beta1",
                        "capability.meshery.io/v1alpha1"
                      ]
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Invalid request body or request param",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "401": {
            "description": "Expired JWT token used or insufficient privilege",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "500": {
            "description": "Internal server error",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    },
    "/api/integrations/connections/{connectionId}": {
      "get": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "Connections"
        ],
        "operationId": "getConnectionById",
        "summary": "Get connection by ID",
        "description": "Returns a specific connection by its ID",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "description": "Connection ID",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Connection details",
            "content": {
              "application/json": {
                "schema": {
                  "$id": "https://schemas.meshery.io/connection.yaml",
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "description": "Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections",
                  "additionalProperties": false,
                  "type": "object",
                  "required": [
                    "id",
                    "schemaVersion",
                    "name",
                    "type",
                    "subType",
                    "kind",
                    "status"
                  ],
                  "properties": {
                    "id": {
                      "description": "Connection ID",
                      "x-order": 1,
                      "x-go-name": "ID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "name": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      },
                      "x-order": 2,
                      "type": "string",
                      "description": "Connection Name",
                      "minLength": 1,
                      "maxLength": 255
                    },
                    "description": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "description",
                        "json": "description"
                      },
                      "x-order": 3,
                      "type": "string",
                      "description": "Human-readable description of the connection and its purpose.",
                      "maxLength": 1000
                    },
                    "url": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "url",
                        "json": "url"
                      },
                      "x-order": 4,
                      "type": "string",
                      "format": "uri",
                      "description": "URL of the remote resource this connection points to (e.g. the Helm repository URL, the Kubernetes API server endpoint, the Grafana instance URL).",
                      "maxLength": 2048
                    },
                    "credentialId": {
                      "x-go-name": "CredentialID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "credential_id",
                        "json": "credentialId"
                      },
                      "x-order": 5,
                      "description": "Associated Credential ID",
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
                        "json": "type",
                        "yaml": "type"
                      },
                      "x-go-name": "ConnectionType",
                      "x-order": 6,
                      "type": "string",
                      "description": "Connection Type (platform, telemetry, collaboration)",
                      "maxLength": 255
                    },
                    "subType": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "sub_type",
                        "json": "subType"
                      },
                      "x-order": 7,
                      "type": "string",
                      "description": "Connection Subtype (cloud, identity, metrics, chat, git, orchestration)",
                      "maxLength": 255
                    },
                    "kind": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "kind"
                      },
                      "x-order": 8,
                      "type": "string",
                      "description": "Connection Kind (meshery, kubernetes, prometheus, grafana, gke, aws, azure, slack, github)",
                      "maxLength": 255
                    },
                    "model": {
                      "x-go-type": "*modelv1beta1.ModelDefinition",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta1/model",
                        "name": "modelv1beta1"
                      },
                      "x-order": 7,
                      "description": "Reference to the specific registered model to which the component belongs and from which model version, category, and other properties may be referenced. Learn more at https://docs.meshery.io/concepts/models",
                      "x-oapi-codegen-extra-tags": {
                        "gorm": "foreignKey:ModelID;references:ID",
                        "json": "model",
                        "yaml": "model"
                      },
                      "$id": "https://schemas.meshery.io/model.yaml",
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
                          "default": "models.meshery.io/v1beta1",
                          "type": "string",
                          "minLength": 2,
                          "maxLength": 100,
                          "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                          "example": [
                            "v1",
                            "v1alpha1",
                            "v2beta3",
                            "v1.custom-suffix",
                            "models.meshery.io/v1beta1",
                            "capability.meshery.io/v1alpha1"
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
                          },
                          "default": "untitled-model"
                        },
                        "displayName": {
                          "description": "Human-readable name for the model.",
                          "helperText": "Model display name may include letters, numbers, and spaces. Special characters are not allowed.",
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
                            "yaml": "description,omitempty",
                            "json": "description,omitempty"
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
                            "gorm": "foreignKey:RegistrantId;references:ID"
                          },
                          "x-order": 8,
                          "x-go-type": "connectionv1beta1.Connection",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/v1beta1/connection",
                            "name": "connectionv1beta1"
                          },
                          "$id": "https://schemas.meshery.io/connection.yaml",
                          "$schema": "http://json-schema.org/draft-07/schema#",
                          "description": "Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections",
                          "additionalProperties": false,
                          "type": "object",
                          "required": [
                            "id",
                            "schemaVersion",
                            "name",
                            "type",
                            "subType",
                            "kind",
                            "status"
                          ],
                          "properties": {
                            "id": {
                              "description": "Connection ID",
                              "x-order": 1,
                              "x-go-name": "ID",
                              "x-oapi-codegen-extra-tags": {
                                "db": "id",
                                "yaml": "id"
                              },
                              "type": "string",
                              "format": "uuid",
                              "x-go-type": "uuid.UUID",
                              "x-go-type-import": {
                                "path": "github.com/gofrs/uuid"
                              }
                            },
                            "name": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "name",
                                "yaml": "name"
                              },
                              "x-order": 2,
                              "type": "string",
                              "description": "Connection Name"
                            },
                            "credentialId": {
                              "x-go-name": "CredentialID",
                              "x-oapi-codegen-extra-tags": {
                                "db": "credential_id",
                                "yaml": "credentialId"
                              },
                              "x-order": 3,
                              "description": "Associated Credential ID",
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
                                "yaml": "type"
                              },
                              "x-order": 4,
                              "type": "string",
                              "description": "Connection Type (platform, telemetry, collaboration)"
                            },
                            "subType": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "sub_type",
                                "yaml": "subType"
                              },
                              "x-order": 5,
                              "type": "string",
                              "description": "Connection Subtype (cloud, identity, metrics, chat, git, orchestration)"
                            },
                            "kind": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "kind",
                                "yaml": "kind"
                              },
                              "x-order": 6,
                              "type": "string",
                              "description": "Connection Kind (meshery, kubernetes, prometheus, grafana, gke, aws, azure, slack, github)"
                            },
                            "metadata": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "metadata",
                                "yaml": "metadata"
                              },
                              "x-order": 7,
                              "x-go-type": "core.Map",
                              "x-go-type-import": {
                                "path": "github.com/meshery/schemas/models/core"
                              },
                              "x-go-type-skip-optional-pointer": true,
                              "type": "object",
                              "description": "Additional connection metadata"
                            },
                            "status": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "status",
                                "yaml": "status"
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
                                "db": "user_id",
                                "yaml": "user_id"
                              },
                              "x-order": 9,
                              "description": "User ID who owns this connection",
                              "type": "string",
                              "format": "uuid",
                              "x-go-type": "uuid.UUID",
                              "x-go-type-import": {
                                "path": "github.com/gofrs/uuid"
                              }
                            },
                            "created_at": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "created_at",
                                "yaml": "created_at"
                              },
                              "x-order": 10,
                              "type": "string",
                              "format": "date-time",
                              "x-go-type-skip-optional-pointer": true
                            },
                            "updated_at": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "updated_at",
                                "yaml": "updated_at"
                              },
                              "x-order": 11,
                              "type": "string",
                              "format": "date-time",
                              "x-go-type-skip-optional-pointer": true
                            },
                            "deleted_at": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "deleted_at",
                                "yaml": "deleted_at"
                              },
                              "x-order": 12,
                              "description": "SQL null Timestamp to handle null values of time.",
                              "x-go-type": "meshcore.NullTime",
                              "x-go-type-import": {
                                "name": "meshcore",
                                "path": "github.com/meshery/schemas/models/core"
                              },
                              "type": "string",
                              "format": "date-time",
                              "x-go-type-skip-optional-pointer": true
                            },
                            "environments": {
                              "type": "array",
                              "description": "Associated environments for this connection",
                              "items": {
                                "x-go-type": "*environmentv1beta1.Environment",
                                "x-go-type-import": {
                                  "path": "github.com/meshery/schemas/models/v1beta1/environment",
                                  "name": "environmentv1beta1"
                                },
                                "$id": "https://schemas.meshery.io/environment.yaml",
                                "$schema": "http://json-schema.org/draft-07/schema#",
                                "title": "Environment",
                                "description": "Environments allow you to logically group related Connections and their associated Credentials. Learn more at https://docs.meshery.io/concepts/logical/environments",
                                "additionalProperties": false,
                                "type": "object",
                                "example": {
                                  "id": "00000000-0000-0000-0000-000000000000",
                                  "schemaVersion": "environments.meshery.io/v1beta1",
                                  "name": "Production Environment",
                                  "description": "Connections and credentials for the production cluster.",
                                  "organization_id": "00000000-0000-0000-0000-000000000000",
                                  "owner": "00000000-0000-0000-0000-000000000000",
                                  "created_at": "0001-01-01T00:00:00Z",
                                  "metadata": {},
                                  "updated_at": "0001-01-01T00:00:00Z",
                                  "deleted_at": null
                                },
                                "required": [
                                  "id",
                                  "schemaVersion",
                                  "name",
                                  "description",
                                  "organization_id"
                                ],
                                "properties": {
                                  "id": {
                                    "description": "ID",
                                    "x-order": 1,
                                    "x-go-name": "ID",
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "id",
                                      "yaml": "id"
                                    },
                                    "type": "string",
                                    "format": "uuid",
                                    "x-go-type": "uuid.UUID",
                                    "x-go-type-import": {
                                      "path": "github.com/gofrs/uuid"
                                    }
                                  },
                                  "schemaVersion": {
                                    "description": "Specifies the version of the schema to which the environment conforms.",
                                    "x-order": 2,
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "schemaVersion",
                                      "db": "-",
                                      "gorm": "-"
                                    },
                                    "default": "environments.meshery.io/v1beta1",
                                    "type": "string",
                                    "minLength": 2,
                                    "maxLength": 100,
                                    "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                                    "example": [
                                      "v1",
                                      "v1alpha1",
                                      "v2beta3",
                                      "v1.custom-suffix",
                                      "models.meshery.io/v1beta1",
                                      "capability.meshery.io/v1alpha1"
                                    ]
                                  },
                                  "name": {
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "name",
                                      "yaml": "name"
                                    },
                                    "x-order": 3,
                                    "type": "string",
                                    "maxLength": 100,
                                    "description": "Environment name"
                                  },
                                  "description": {
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "description",
                                      "yaml": "description"
                                    },
                                    "x-order": 4,
                                    "type": "string",
                                    "maxLength": 1000,
                                    "description": "Environment description"
                                  },
                                  "organization_id": {
                                    "x-go-name": "OrganizationID",
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "organization_id",
                                      "yaml": "organization_id"
                                    },
                                    "x-order": 5,
                                    "description": "Environment organization ID",
                                    "type": "string",
                                    "format": "uuid",
                                    "x-go-type": "uuid.UUID",
                                    "x-go-type-import": {
                                      "path": "github.com/gofrs/uuid"
                                    }
                                  },
                                  "owner": {
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "owner",
                                      "yaml": "owner"
                                    },
                                    "x-order": 6,
                                    "description": "Environment owner",
                                    "type": "string",
                                    "format": "uuid",
                                    "x-go-type": "uuid.UUID",
                                    "x-go-type-import": {
                                      "path": "github.com/gofrs/uuid"
                                    }
                                  },
                                  "created_at": {
                                    "x-order": 7,
                                    "description": "Timestamp when the resource was created.",
                                    "x-go-type": "time.Time",
                                    "type": "string",
                                    "format": "date-time",
                                    "x-go-name": "CreatedAt",
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "created_at",
                                      "yaml": "created_at"
                                    },
                                    "x-go-type-skip-optional-pointer": true
                                  },
                                  "metadata": {
                                    "description": "Additional metadata associated with the environment.",
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "metadata",
                                      "yaml": "metadata"
                                    },
                                    "x-order": 8,
                                    "x-go-type": "core.Map",
                                    "x-go-type-skip-optional-pointer": true,
                                    "type": "object"
                                  },
                                  "updated_at": {
                                    "x-order": 9,
                                    "description": "Timestamp when the resource was updated.",
                                    "x-go-type": "time.Time",
                                    "type": "string",
                                    "format": "date-time",
                                    "x-go-name": "UpdatedAt",
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "updated_at",
                                      "yaml": "updated_at"
                                    },
                                    "x-go-type-skip-optional-pointer": true
                                  },
                                  "deleted_at": {
                                    "description": "Timestamp when the environment was soft deleted. Null while the environment remains active.",
                                    "nullable": true,
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "deleted_at",
                                      "yaml": "deleted_at"
                                    },
                                    "x-go-type": "core.NullTime",
                                    "x-go-import": "database/sql",
                                    "x-order": 10,
                                    "x-go-type-import": {
                                      "name": "meshcore",
                                      "path": "github.com/meshery/schemas/models/core"
                                    },
                                    "type": "string",
                                    "format": "date-time",
                                    "x-go-type-skip-optional-pointer": true
                                  }
                                }
                              },
                              "x-oapi-codegen-extra-tags": {
                                "db": "-",
                                "yaml": "environments",
                                "gorm": "-"
                              },
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 13
                            },
                            "schemaVersion": {
                              "description": "Specifies the version of the schema used for the definition.",
                              "x-order": 14,
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "schemaVersion",
                                "db": "-",
                                "gorm": "-"
                              },
                              "default": "connections.meshery.io/v1beta1",
                              "type": "string",
                              "minLength": 2,
                              "maxLength": 100,
                              "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                              "example": [
                                "v1",
                                "v1alpha1",
                                "v2beta3",
                                "v1.custom-suffix",
                                "models.meshery.io/v1beta1",
                                "capability.meshery.io/v1alpha1"
                              ]
                            }
                          }
                        },
                        "registrantId": {
                          "description": "ID of the registrant.",
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "connection_id",
                            "json": "connection_id",
                            "gorm": "column:connection_id"
                          },
                          "x-order": 8,
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
                            "yaml": "-",
                            "json": "-",
                            "gorm": "categoryID"
                          },
                          "x-order": 8,
                          "type": "string",
                          "format": "uuid",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          }
                        },
                        "category": {
                          "x-order": 9,
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "category",
                            "json": "category",
                            "gorm": "foreignKey:CategoryId;references:ID"
                          },
                          "x-go-type": "categoryv1beta1.CategoryDefinition",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/v1beta1/category",
                            "name": "categoryv1beta1"
                          },
                          "$id": "https://schemas.meshery.io/category.yaml",
                          "$schema": "http://json-schema.org/draft-07/schema#",
                          "type": "object",
                          "additionalProperties": false,
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
                              "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                              "x-go-type": "uuid.UUID",
                              "x-go-type-import": {
                                "path": "github.com/gofrs/uuid"
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
                              "description": "Additional metadata associated with the category.",
                              "type": "object",
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "metadata,omitempty",
                                "json": "metadata,omitempty",
                                "gorm": "type:bytes;serializer:json"
                              },
                              "x-order": 3
                            }
                          }
                        },
                        "subCategory": {
                          "x-order": 10,
                          "x-go-type": "subcategoryv1beta1.SubCategoryDefinition",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/v1beta1/subcategory",
                            "name": "subcategoryv1beta1"
                          },
                          "$id": "https://schemas.meshery.io/category.yaml",
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
                                "x-go-type": "capabilityv1alpha1.Capability",
                                "x-go-type-import": {
                                  "path": "github.com/meshery/schemas/models/v1alpha1/capability",
                                  "name": "capabilityv1alpha1"
                                },
                                "$id": "https://schemas.meshery.io/capability.yaml",
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
                                    "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                                    "example": [
                                      "v1",
                                      "v1alpha1",
                                      "v2beta3",
                                      "v1.custom-suffix",
                                      "models.meshery.io/v1beta1",
                                      "capability.meshery.io/v1alpha1"
                                    ]
                                  },
                                  "version": {
                                    "description": "Version of the capability definition.",
                                    "type": "string",
                                    "minLength": 5,
                                    "maxLength": 100,
                                    "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                                  },
                                  "displayName": {
                                    "description": "Name of the capability in human-readible format.",
                                    "type": "string",
                                    "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
                                  },
                                  "description": {
                                    "type": "string",
                                    "description": "A written representation of the purpose and characteristics of the capability.",
                                    "maxLength": 5000
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
                                    "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
                                  },
                                  "type": {
                                    "description": "Classification of capabilities. Used to group capabilities similar in nature.",
                                    "type": "string",
                                    "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
                                  },
                                  "subType": {
                                    "description": "Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Capability.",
                                    "type": "string",
                                    "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
                                  },
                                  "key": {
                                    "description": "Key that backs the capability.",
                                    "type": "string",
                                    "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
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
                                      "description": "A string starting with an alphanumeric character. Spaces and hyphens allowed."
                                    }
                                  },
                                  "status": {
                                    "type": "string",
                                    "description": "Status of the capability",
                                    "default": "enabled",
                                    "enum": [
                                      "enabled",
                                      "disabled"
                                    ]
                                  },
                                  "metadata": {
                                    "type": "object",
                                    "description": "Metadata contains additional information associated with the capability. Extension point.",
                                    "additionalProperties": true
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
                                    "schemaVersion": "capability.meshery.io/v1beta1",
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
                                    "schemaVersion": "capability.meshery.io/v1beta1",
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
                                    "schemaVersion": "capability.meshery.io/v1beta1",
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
                                    "schemaVersion": "capability.meshery.io/v1beta1",
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
                            }
                          },
                          "x-oapi-codegen-extra-tags": {
                            "gorm": "type:bytes;serializer:json",
                            "json": "metadata",
                            "yaml": "metadata"
                          },
                          "x-order": 11,
                          "additionalProperties": true
                        },
                        "model": {
                          "x-oapi-codegen-extra-tags": {
                            "gorm": "type:bytes;serializer:json"
                          },
                          "x-order": 12,
                          "type": "object",
                          "description": "Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31).",
                          "required": [
                            "version"
                          ],
                          "properties": {
                            "version": {
                              "description": "Version of the model as defined by the registrant.",
                              "x-oapi-codegen-extra-tags": {
                                "json": "version"
                              },
                              "x-order": 1,
                              "type": "string",
                              "minLength": 5,
                              "maxLength": 100,
                              "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
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
                          "description": "The relationships of the model."
                        },
                        "components": {
                          "type": "array",
                          "x-go-type": "interface{}",
                          "x-oapi-codegen-extra-tags": {
                            "gorm": "-",
                            "json": "components",
                            "yaml": "components"
                          },
                          "description": "The components of the model."
                        },
                        "componentsCount": {
                          "type": "integer",
                          "description": "Number of components associated with the model.",
                          "x-order": 13,
                          "x-oapi-codegen-extra-tags": {
                            "json": "components_count",
                            "yaml": "components_count",
                            "gorm": "-"
                          },
                          "default": 0,
                          "minimum": 0
                        },
                        "relationshipsCount": {
                          "type": "integer",
                          "description": "Number of relationships associated with the model.",
                          "x-order": 13,
                          "x-oapi-codegen-extra-tags": {
                            "gorm": "-",
                            "json": "relationships_count",
                            "yaml": "relationships_count"
                          },
                          "default": 0,
                          "minimum": 0
                        },
                        "created_at": {
                          "x-order": 14,
                          "description": "Timestamp when the resource was created.",
                          "x-go-type": "time.Time",
                          "type": "string",
                          "format": "date-time",
                          "x-go-name": "CreatedAt",
                          "x-oapi-codegen-extra-tags": {
                            "db": "created_at",
                            "yaml": "created_at"
                          },
                          "x-go-type-skip-optional-pointer": true
                        },
                        "updated_at": {
                          "x-order": 15,
                          "description": "Timestamp when the resource was updated.",
                          "x-go-type": "time.Time",
                          "type": "string",
                          "format": "date-time",
                          "x-go-name": "UpdatedAt",
                          "x-oapi-codegen-extra-tags": {
                            "db": "updated_at",
                            "yaml": "updated_at"
                          },
                          "x-go-type-skip-optional-pointer": true
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
                    "modelReference": {
                      "x-go-type": "modelv1beta1.ModelReference",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta1/model",
                        "name": "modelv1beta1"
                      },
                      "x-order": 8,
                      "description": "Reference to the specific registered model to which the component belongs and from which model version, category, and other properties may be referenced. Learn more at https://docs.meshery.io/concepts/models",
                      "x-oapi-codegen-extra-tags": {
                        "gorm": "-"
                      },
                      "type": "object",
                      "required": [
                        "id",
                        "name",
                        "version",
                        "displayName",
                        "model",
                        "registrant"
                      ],
                      "properties": {
                        "id": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          }
                        },
                        "name": {
                          "type": "string",
                          "description": "The unique name for the model within the scope of a registrant.",
                          "pattern": "^[a-z0-9-]+$",
                          "examples": [
                            "cert-manager"
                          ]
                        },
                        "version": {
                          "description": "Version of the model definition.",
                          "type": "string",
                          "minLength": 5,
                          "maxLength": 100,
                          "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                        },
                        "displayName": {
                          "type": "string",
                          "description": "Human-readable name for the model.",
                          "minLength": 1,
                          "maxLength": 100,
                          "pattern": "^[a-zA-Z0-9 ]+$",
                          "examples": [
                            "Cert Manager"
                          ]
                        },
                        "model": {
                          "type": "object",
                          "description": "Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31).",
                          "required": [
                            "version"
                          ],
                          "properties": {
                            "version": {
                              "description": "Version of the model as defined by the registrant.",
                              "x-oapi-codegen-extra-tags": {
                                "json": "version"
                              },
                              "x-order": 1,
                              "type": "string",
                              "minLength": 5,
                              "maxLength": 100,
                              "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                            }
                          }
                        },
                        "registrant": {
                          "x-go-type": "RegistrantReference",
                          "x-oapi-codegen-extra-tags": {
                            "json": "registrant"
                          },
                          "type": "object",
                          "required": [
                            "kind"
                          ],
                          "properties": {
                            "kind": {
                              "type": "string",
                              "description": "Kind of the registrant.",
                              "maxLength": 255
                            }
                          }
                        }
                      }
                    },
                    "modelId": {
                      "description": "Foreign key to the model to which the component belongs. Populated by the ORM from the `model_id` column and suppressed on the JSON wire; consumers use the nested `model` object for wire-level access.",
                      "x-go-name": "ModelID",
                      "x-oapi-codegen-extra-tags": {
                        "gorm": "column:model_id",
                        "db": "model_id",
                        "yaml": "-",
                        "json": "-"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "metadata": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata"
                      },
                      "x-order": 9,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "type": "object",
                      "description": "Additional connection metadata"
                    },
                    "credentialSchema": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "credential_schema"
                      },
                      "x-order": 9,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "type": "object",
                      "description": "Schema for the credential Associated with the connection"
                    },
                    "connectionSchema": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "connection_schema"
                      },
                      "x-order": 9,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "type": "object",
                      "description": "Schema for the connection"
                    },
                    "styles": {
                      "x-oapi-codegen-extra-tags": {
                        "gorm": "type:bytes;serializer:json",
                        "yaml": "styles",
                        "json": "styles"
                      },
                      "x-go-type": "core.ComponentStyles",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-order": 17,
                      "description": "Visualization styles for the connection, including svgColor and svgWhite used for UI representation.",
                      "type": "object",
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
                              "description": "Primary color of the component used for UI representation.",
                              "maxLength": 500
                            },
                            "secondaryColor": {
                              "type": "string",
                              "description": "Secondary color of the entity used for UI representation.",
                              "maxLength": 500
                            },
                            "svgWhite": {
                              "type": "string",
                              "description": "White SVG of the entity used for UI representation on dark background.",
                              "maxLength": 500
                            },
                            "svgColor": {
                              "type": "string",
                              "description": "Colored SVG of the entity used for UI representation on light background.",
                              "maxLength": 500
                            },
                            "svgComplete": {
                              "type": "string",
                              "description": "Complete SVG of the entity used for UI representation, often inclusive of background.",
                              "maxLength": 500
                            },
                            "color": {
                              "type": "string",
                              "description": "The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 500
                            },
                            "textOpacity": {
                              "type": "number",
                              "description": "The opacity of the label text, including its outline.",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "fontFamily": {
                              "type": "string",
                              "description": "A comma-separated list of font names to use on the label text.",
                              "maxLength": 500
                            },
                            "fontSize": {
                              "type": "string",
                              "description": "The size of the label text.",
                              "maxLength": 500
                            },
                            "fontStyle": {
                              "type": "string",
                              "description": "A CSS font style to be applied to the label text.",
                              "maxLength": 500
                            },
                            "fontWeight": {
                              "type": "string",
                              "description": "A CSS font weight to be applied to the label text.",
                              "maxLength": 500
                            },
                            "textTransform": {
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
                            "zIndex": {
                              "type": "integer",
                              "description": "An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index.",
                              "minimum": 0
                            },
                            "label": {
                              "type": "string",
                              "description": "The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id",
                              "maxLength": 500
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
                                  "minimum": -1000000,
                                  "maximum": 1000000,
                                  "x-go-type": "float64"
                                },
                                "y": {
                                  "type": "number",
                                  "description": "The y-coordinate of the node.",
                                  "minimum": -1000000,
                                  "maximum": 1000000,
                                  "x-go-type": "float64"
                                }
                              }
                            },
                            "bodyText": {
                              "type": "string",
                              "description": "The text to display for an element's body. Can give a path, e.g. data(id) will label with the elements id",
                              "maxLength": 500
                            },
                            "bodyTextWrap": {
                              "type": "string",
                              "description": "How to wrap the text in the node. Can be 'none', 'wrap', or 'ellipsis'.",
                              "enum": [
                                "none",
                                "wrap",
                                "ellipsis"
                              ]
                            },
                            "bodyTextMaxWidth": {
                              "type": "string",
                              "description": "The maximum width for wrapping text in the node.",
                              "maxLength": 50
                            },
                            "bodyTextOpacity": {
                              "type": "number",
                              "description": "The opacity of the node's body text, including its outline.",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "bodyTextBackgroundColor": {
                              "type": "string",
                              "description": "The colour of the node's body text background. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "bodyTextFontSize": {
                              "type": "number",
                              "description": "The size of the node's body text.",
                              "minimum": 0
                            },
                            "bodyTextColor": {
                              "type": "string",
                              "description": "The colour of the node's body text. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "bodyTextFontWeight": {
                              "type": "string",
                              "description": "A CSS font weight to be applied to the node's body text.",
                              "maxLength": 50
                            },
                            "bodyTextHorizontalAlign": {
                              "type": "string",
                              "description": "A CSS horizontal alignment to be applied to the node's body text.",
                              "maxLength": 50
                            },
                            "bodyTextDecoration": {
                              "type": "string",
                              "description": "A CSS text decoration to be applied to the node's body text.",
                              "maxLength": 100
                            },
                            "bodyTextVerticalAlign": {
                              "type": "string",
                              "description": "A CSS vertical alignment to be applied to the node's body text.",
                              "maxLength": 50
                            },
                            "width": {
                              "type": "number",
                              "description": "The width of the node's body or the width of an edge's line.",
                              "minimum": 0
                            },
                            "height": {
                              "type": "number",
                              "description": "The height of the node's body",
                              "minimum": 0
                            },
                            "backgroundImage": {
                              "type": "string",
                              "format": "uri",
                              "description": "The URL that points to the image to show in the node.",
                              "maxLength": 2048
                            },
                            "backgroundColor": {
                              "type": "string",
                              "description": "The colour of the node's body. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "backgroundBlacken": {
                              "type": "number",
                              "description": "Blackens the node's body for values from 0 to 1; whitens the node's body for values from 0 to -1.",
                              "maximum": 1,
                              "minimum": -1
                            },
                            "backgroundOpacity": {
                              "type": "number",
                              "description": "The opacity level of the node's background colour",
                              "maximum": 1,
                              "minimum": 0
                            },
                            "backgroundPositionX": {
                              "type": "string",
                              "description": "The x position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                              "maxLength": 50
                            },
                            "backgroundPositionY": {
                              "type": "string",
                              "description": "The y position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                              "maxLength": 50
                            },
                            "backgroundOffsetX": {
                              "type": "string",
                              "description": "The x offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                              "maxLength": 50
                            },
                            "backgroundOffsetY": {
                              "type": "string",
                              "description": "The y offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                              "maxLength": 50
                            },
                            "backgroundFit": {
                              "type": "string",
                              "description": "How the background image is fit to the node. Can be 'none', 'contain', or 'cover'.",
                              "enum": [
                                "none",
                                "contain",
                                "cover"
                              ]
                            },
                            "backgroundClip": {
                              "type": "string",
                              "description": "How the background image is clipped to the node. Can be 'none', 'node', or 'node-border'.",
                              "enum": [
                                "none",
                                "node",
                                "node-border"
                              ]
                            },
                            "backgroundWidthRelativeTo": {
                              "type": "string",
                              "description": "How the background image's width is determined. Can be 'none', 'inner', or 'outer'.",
                              "enum": [
                                "none",
                                "inner",
                                "outer"
                              ]
                            },
                            "backgroundHeightRelativeTo": {
                              "type": "string",
                              "description": "How the background image's height is determined. Can be 'none', 'inner', or 'outer'.",
                              "enum": [
                                "none",
                                "inner",
                                "outer"
                              ]
                            },
                            "borderWidth": {
                              "type": "number",
                              "description": "The size of the node's border.",
                              "minimum": 0
                            },
                            "borderStyle": {
                              "type": "string",
                              "description": "The style of the node's border",
                              "enum": [
                                "solid",
                                "dotted",
                                "dashed",
                                "double"
                              ]
                            },
                            "borderColor": {
                              "type": "string",
                              "description": "The colour of the node's border. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "borderOpacity": {
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
                            "textHalign": {
                              "type": "string",
                              "description": "The horizontal alignment of a node's label",
                              "enum": [
                                "left",
                                "center",
                                "right"
                              ]
                            },
                            "textValign": {
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
                            "activeBgColor": {
                              "type": "string",
                              "description": "The colour of the indicator shown when the background is grabbed by the user. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "activeBgOpacity": {
                              "type": "string",
                              "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                              "maxLength": 50
                            },
                            "activeBgSize": {
                              "type": "string",
                              "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                              "maxLength": 50
                            },
                            "selectionBoxColor": {
                              "type": "string",
                              "description": "The background colour of the selection box used for drag selection. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "selectionBoxBorderWidth": {
                              "type": "number",
                              "description": "The size of the border on the selection box. Selector needs to be *core*",
                              "minimum": 0
                            },
                            "selectionBoxOpacity": {
                              "type": "number",
                              "description": "The opacity of the selection box. Selector needs to be *core*",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "outsideTextureBgColor": {
                              "type": "string",
                              "description": "The colour of the area outside the viewport texture when initOptions.textureOnViewport === true. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "outsideTextureBgOpacity": {
                              "type": "number",
                              "description": "The opacity of the area outside the viewport texture. Selector needs to be *core*",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "shapePolygonPoints": {
                              "type": "string",
                              "description": "An array (or a space-separated string) of numbers ranging on [-1, 1], representing alternating x and y values (i.e. x1 y1 x2 y2, x3 y3 ...). This represents the points in the polygon for the node's shape. The bounding box of the node is given by (-1, -1), (1, -1), (1, 1), (-1, 1). The node's position is the origin (0, 0 )",
                              "maxLength": 2000
                            },
                            "menuBackgroundColor": {
                              "type": "string",
                              "description": "The colour of the background of the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "menuBackgroundOpacity": {
                              "type": "number",
                              "description": "The opacity of the background of the component menu.",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "menuForgroundColor": {
                              "type": "string",
                              "description": "The colour of the text or icons in the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            }
                          }
                        }
                      ]
                    },
                    "status": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      },
                      "x-order": 10,
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
                    "transitionMap": {
                      "type": "object",
                      "description": "Map describing the connection state machine. Each key is a current connection status and its value is the list of states the connection may transition to from that status, along with a description of each transition.",
                      "additionalProperties": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "additionalProperties": false,
                          "description": "A single permissible state transition for a connection, describing the next reachable state and the meaning of that transition.",
                          "required": [
                            "nextState"
                          ],
                          "properties": {
                            "nextState": {
                              "type": "string",
                              "description": "Connection Status Value",
                              "x-go-name": "ConnectionStatusValue",
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
                              "x-order": 1
                            },
                            "description": {
                              "type": "string",
                              "description": "Human-readable explanation of when or why this transition occurs.",
                              "maxLength": 1000,
                              "x-oapi-codegen-extra-tags": {
                                "json": "description,omitempty"
                              },
                              "x-order": 2
                            }
                          }
                        }
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "gorm": "type:bytes;serializer:json",
                        "json": "transitionMap,omitempty"
                      },
                      "x-order": 18
                    },
                    "userId": {
                      "x-go-name": "UserID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "user_id",
                        "json": "userId"
                      },
                      "x-order": 11,
                      "description": "User ID who owns this connection",
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "createdAt": {
                      "description": "Timestamp when the connection was created.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "createdAt"
                      },
                      "x-order": 12,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp when the connection was last updated.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updatedAt"
                      },
                      "x-order": 13,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "description": "Timestamp when the connection was soft-deleted, if applicable.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deletedAt"
                      },
                      "x-order": 14,
                      "x-go-type": "meshcore.NullTime",
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "environments": {
                      "type": "array",
                      "description": "Associated environments for this connection",
                      "items": {
                        "x-go-type": "*environmentv1beta3.Environment",
                        "x-go-type-import": {
                          "path": "github.com/meshery/schemas/models/v1beta3/environment",
                          "name": "environmentv1beta3"
                        },
                        "$id": "https://schemas.meshery.io/environment.yaml",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "title": "Environment",
                        "description": "Environments allow you to logically group related Connections and their associated Credentials. Learn more at https://docs.meshery.io/concepts/logical/environments",
                        "additionalProperties": false,
                        "type": "object",
                        "example": {
                          "id": "00000000-0000-0000-0000-000000000000",
                          "schemaVersion": "environments.meshery.io/v1beta3",
                          "name": "Production Environment",
                          "description": "Connections and credentials for the production cluster.",
                          "organizationId": "00000000-0000-0000-0000-000000000000",
                          "owner": "00000000-0000-0000-0000-000000000000",
                          "createdAt": "0001-01-01T00:00:00Z",
                          "metadata": {},
                          "updatedAt": "0001-01-01T00:00:00Z",
                          "deletedAt": null
                        },
                        "required": [
                          "id",
                          "schemaVersion",
                          "name",
                          "description",
                          "organizationId"
                        ],
                        "properties": {
                          "id": {
                            "description": "ID",
                            "x-order": 1,
                            "x-go-name": "ID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "id",
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
                            "description": "Specifies the version of the schema to which the environment conforms.",
                            "x-order": 2,
                            "x-oapi-codegen-extra-tags": {
                              "json": "schemaVersion",
                              "db": "-",
                              "gorm": "-"
                            },
                            "default": "environments.meshery.io/v1beta3",
                            "type": "string",
                            "minLength": 2,
                            "maxLength": 100,
                            "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                            "example": [
                              "v1",
                              "v1alpha1",
                              "v2beta3",
                              "v1.custom-suffix",
                              "models.meshery.io/v1beta1",
                              "capability.meshery.io/v1alpha1"
                            ]
                          },
                          "name": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "name",
                              "json": "name"
                            },
                            "x-order": 3,
                            "type": "string",
                            "maxLength": 100,
                            "description": "Environment name"
                          },
                          "description": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "description",
                              "json": "description"
                            },
                            "x-order": 4,
                            "type": "string",
                            "maxLength": 1000,
                            "description": "Environment description"
                          },
                          "organizationId": {
                            "x-go-name": "OrganizationID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "organization_id",
                              "json": "organizationId"
                            },
                            "x-order": 5,
                            "description": "Environment organization ID",
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "owner": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "owner",
                              "json": "owner"
                            },
                            "x-order": 6,
                            "description": "Environment owner",
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "createdAt": {
                            "description": "Timestamp when the environment was created.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "yaml": "created_at",
                              "json": "createdAt"
                            },
                            "x-order": 7,
                            "x-go-type": "time.Time",
                            "type": "string",
                            "format": "date-time",
                            "x-go-name": "CreatedAt",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "metadata": {
                            "description": "Additional metadata associated with the environment.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "metadata",
                              "json": "metadata"
                            },
                            "x-order": 8,
                            "x-go-type": "core.Map",
                            "x-go-type-skip-optional-pointer": true,
                            "type": "object"
                          },
                          "updatedAt": {
                            "description": "Timestamp when the environment was last updated.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "yaml": "updated_at",
                              "json": "updatedAt"
                            },
                            "x-order": 9,
                            "x-go-type": "time.Time",
                            "type": "string",
                            "format": "date-time",
                            "x-go-name": "UpdatedAt",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deletedAt": {
                            "description": "Timestamp when the environment was soft deleted. Null while the environment remains active.",
                            "nullable": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "json": "deletedAt"
                            },
                            "x-go-type": "core.NullTime",
                            "x-go-import": "database/sql",
                            "x-order": 10,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          }
                        }
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "-",
                        "gorm": "-"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 15
                    },
                    "schemaVersion": {
                      "description": "Specifies the version of the schema used for the definition.",
                      "x-order": 16,
                      "x-oapi-codegen-extra-tags": {
                        "db": "-",
                        "gorm": "-"
                      },
                      "default": "connections.meshery.io/v1beta3",
                      "type": "string",
                      "minLength": 2,
                      "maxLength": 100,
                      "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                      "example": [
                        "v1",
                        "v1alpha1",
                        "v2beta3",
                        "v1.custom-suffix",
                        "models.meshery.io/v1beta1",
                        "capability.meshery.io/v1alpha1"
                      ]
                    }
                  }
                }
              }
            }
          },
          "401": {
            "description": "Expired JWT token used or insufficient privilege",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "404": {
            "description": "Result not found",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "500": {
            "description": "Internal server error",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          }
        }
      },
      "put": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "Connections"
        ],
        "operationId": "updateConnection",
        "summary": "Update a connection",
        "description": "Update an existing connection",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "description": "Connection ID",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for creating or updating a connection",
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "description": "Connection ID",
                    "x-go-name": "ConnectionID",
                    "x-oapi-codegen-extra-tags": {
                      "json": "id,omitempty"
                    }
                  },
                  "name": {
                    "type": "string",
                    "description": "Connection name",
                    "x-oapi-codegen-extra-tags": {
                      "json": "name"
                    },
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "kind": {
                    "type": "string",
                    "description": "Connection kind",
                    "x-oapi-codegen-extra-tags": {
                      "json": "kind"
                    },
                    "maxLength": 255
                  },
                  "type": {
                    "type": "string",
                    "description": "Connection type",
                    "x-oapi-codegen-extra-tags": {
                      "json": "type"
                    },
                    "maxLength": 255
                  },
                  "subType": {
                    "type": "string",
                    "description": "Connection sub-type",
                    "x-oapi-codegen-extra-tags": {
                      "json": "subType"
                    },
                    "maxLength": 255
                  },
                  "credentialSecret": {
                    "type": "object",
                    "description": "Credential secret data",
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "credentialSecret"
                    }
                  },
                  "metadata": {
                    "type": "object",
                    "description": "Connection metadata",
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "metadata"
                    }
                  },
                  "styles": {
                    "x-go-type": "core.ComponentStyles",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    },
                    "x-oapi-codegen-extra-tags": {
                      "json": "styles,omitempty"
                    },
                    "description": "Visualization styles for the connection, including svgColor and svgWhite used for UI representation.",
                    "type": "object",
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
                            "description": "Primary color of the component used for UI representation.",
                            "maxLength": 500
                          },
                          "secondaryColor": {
                            "type": "string",
                            "description": "Secondary color of the entity used for UI representation.",
                            "maxLength": 500
                          },
                          "svgWhite": {
                            "type": "string",
                            "description": "White SVG of the entity used for UI representation on dark background.",
                            "maxLength": 500
                          },
                          "svgColor": {
                            "type": "string",
                            "description": "Colored SVG of the entity used for UI representation on light background.",
                            "maxLength": 500
                          },
                          "svgComplete": {
                            "type": "string",
                            "description": "Complete SVG of the entity used for UI representation, often inclusive of background.",
                            "maxLength": 500
                          },
                          "color": {
                            "type": "string",
                            "description": "The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 500
                          },
                          "textOpacity": {
                            "type": "number",
                            "description": "The opacity of the label text, including its outline.",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "fontFamily": {
                            "type": "string",
                            "description": "A comma-separated list of font names to use on the label text.",
                            "maxLength": 500
                          },
                          "fontSize": {
                            "type": "string",
                            "description": "The size of the label text.",
                            "maxLength": 500
                          },
                          "fontStyle": {
                            "type": "string",
                            "description": "A CSS font style to be applied to the label text.",
                            "maxLength": 500
                          },
                          "fontWeight": {
                            "type": "string",
                            "description": "A CSS font weight to be applied to the label text.",
                            "maxLength": 500
                          },
                          "textTransform": {
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
                          "zIndex": {
                            "type": "integer",
                            "description": "An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index.",
                            "minimum": 0
                          },
                          "label": {
                            "type": "string",
                            "description": "The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id",
                            "maxLength": 500
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
                                "minimum": -1000000,
                                "maximum": 1000000,
                                "x-go-type": "float64"
                              },
                              "y": {
                                "type": "number",
                                "description": "The y-coordinate of the node.",
                                "minimum": -1000000,
                                "maximum": 1000000,
                                "x-go-type": "float64"
                              }
                            }
                          },
                          "bodyText": {
                            "type": "string",
                            "description": "The text to display for an element's body. Can give a path, e.g. data(id) will label with the elements id",
                            "maxLength": 500
                          },
                          "bodyTextWrap": {
                            "type": "string",
                            "description": "How to wrap the text in the node. Can be 'none', 'wrap', or 'ellipsis'.",
                            "enum": [
                              "none",
                              "wrap",
                              "ellipsis"
                            ]
                          },
                          "bodyTextMaxWidth": {
                            "type": "string",
                            "description": "The maximum width for wrapping text in the node.",
                            "maxLength": 50
                          },
                          "bodyTextOpacity": {
                            "type": "number",
                            "description": "The opacity of the node's body text, including its outline.",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "bodyTextBackgroundColor": {
                            "type": "string",
                            "description": "The colour of the node's body text background. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "bodyTextFontSize": {
                            "type": "number",
                            "description": "The size of the node's body text.",
                            "minimum": 0
                          },
                          "bodyTextColor": {
                            "type": "string",
                            "description": "The colour of the node's body text. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "bodyTextFontWeight": {
                            "type": "string",
                            "description": "A CSS font weight to be applied to the node's body text.",
                            "maxLength": 50
                          },
                          "bodyTextHorizontalAlign": {
                            "type": "string",
                            "description": "A CSS horizontal alignment to be applied to the node's body text.",
                            "maxLength": 50
                          },
                          "bodyTextDecoration": {
                            "type": "string",
                            "description": "A CSS text decoration to be applied to the node's body text.",
                            "maxLength": 100
                          },
                          "bodyTextVerticalAlign": {
                            "type": "string",
                            "description": "A CSS vertical alignment to be applied to the node's body text.",
                            "maxLength": 50
                          },
                          "width": {
                            "type": "number",
                            "description": "The width of the node's body or the width of an edge's line.",
                            "minimum": 0
                          },
                          "height": {
                            "type": "number",
                            "description": "The height of the node's body",
                            "minimum": 0
                          },
                          "backgroundImage": {
                            "type": "string",
                            "format": "uri",
                            "description": "The URL that points to the image to show in the node.",
                            "maxLength": 2048
                          },
                          "backgroundColor": {
                            "type": "string",
                            "description": "The colour of the node's body. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "backgroundBlacken": {
                            "type": "number",
                            "description": "Blackens the node's body for values from 0 to 1; whitens the node's body for values from 0 to -1.",
                            "maximum": 1,
                            "minimum": -1
                          },
                          "backgroundOpacity": {
                            "type": "number",
                            "description": "The opacity level of the node's background colour",
                            "maximum": 1,
                            "minimum": 0
                          },
                          "backgroundPositionX": {
                            "type": "string",
                            "description": "The x position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                            "maxLength": 50
                          },
                          "backgroundPositionY": {
                            "type": "string",
                            "description": "The y position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                            "maxLength": 50
                          },
                          "backgroundOffsetX": {
                            "type": "string",
                            "description": "The x offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                            "maxLength": 50
                          },
                          "backgroundOffsetY": {
                            "type": "string",
                            "description": "The y offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                            "maxLength": 50
                          },
                          "backgroundFit": {
                            "type": "string",
                            "description": "How the background image is fit to the node. Can be 'none', 'contain', or 'cover'.",
                            "enum": [
                              "none",
                              "contain",
                              "cover"
                            ]
                          },
                          "backgroundClip": {
                            "type": "string",
                            "description": "How the background image is clipped to the node. Can be 'none', 'node', or 'node-border'.",
                            "enum": [
                              "none",
                              "node",
                              "node-border"
                            ]
                          },
                          "backgroundWidthRelativeTo": {
                            "type": "string",
                            "description": "How the background image's width is determined. Can be 'none', 'inner', or 'outer'.",
                            "enum": [
                              "none",
                              "inner",
                              "outer"
                            ]
                          },
                          "backgroundHeightRelativeTo": {
                            "type": "string",
                            "description": "How the background image's height is determined. Can be 'none', 'inner', or 'outer'.",
                            "enum": [
                              "none",
                              "inner",
                              "outer"
                            ]
                          },
                          "borderWidth": {
                            "type": "number",
                            "description": "The size of the node's border.",
                            "minimum": 0
                          },
                          "borderStyle": {
                            "type": "string",
                            "description": "The style of the node's border",
                            "enum": [
                              "solid",
                              "dotted",
                              "dashed",
                              "double"
                            ]
                          },
                          "borderColor": {
                            "type": "string",
                            "description": "The colour of the node's border. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "borderOpacity": {
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
                          "textHalign": {
                            "type": "string",
                            "description": "The horizontal alignment of a node's label",
                            "enum": [
                              "left",
                              "center",
                              "right"
                            ]
                          },
                          "textValign": {
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
                          "activeBgColor": {
                            "type": "string",
                            "description": "The colour of the indicator shown when the background is grabbed by the user. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "activeBgOpacity": {
                            "type": "string",
                            "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                            "maxLength": 50
                          },
                          "activeBgSize": {
                            "type": "string",
                            "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                            "maxLength": 50
                          },
                          "selectionBoxColor": {
                            "type": "string",
                            "description": "The background colour of the selection box used for drag selection. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "selectionBoxBorderWidth": {
                            "type": "number",
                            "description": "The size of the border on the selection box. Selector needs to be *core*",
                            "minimum": 0
                          },
                          "selectionBoxOpacity": {
                            "type": "number",
                            "description": "The opacity of the selection box. Selector needs to be *core*",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "outsideTextureBgColor": {
                            "type": "string",
                            "description": "The colour of the area outside the viewport texture when initOptions.textureOnViewport === true. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "outsideTextureBgOpacity": {
                            "type": "number",
                            "description": "The opacity of the area outside the viewport texture. Selector needs to be *core*",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "shapePolygonPoints": {
                            "type": "string",
                            "description": "An array (or a space-separated string) of numbers ranging on [-1, 1], representing alternating x and y values (i.e. x1 y1 x2 y2, x3 y3 ...). This represents the points in the polygon for the node's shape. The bounding box of the node is given by (-1, -1), (1, -1), (1, 1), (-1, 1). The node's position is the origin (0, 0 )",
                            "maxLength": 2000
                          },
                          "menuBackgroundColor": {
                            "type": "string",
                            "description": "The colour of the background of the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "menuBackgroundOpacity": {
                            "type": "number",
                            "description": "The opacity of the background of the component menu.",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "menuForgroundColor": {
                            "type": "string",
                            "description": "The colour of the text or icons in the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          }
                        }
                      }
                    ]
                  },
                  "status": {
                    "type": "string",
                    "description": "Connection status",
                    "x-oapi-codegen-extra-tags": {
                      "json": "status"
                    },
                    "maxLength": 255
                  },
                  "credentialId": {
                    "type": "string",
                    "format": "uuid",
                    "description": "Associated credential ID",
                    "x-go-name": "CredentialID",
                    "x-oapi-codegen-extra-tags": {
                      "json": "credentialId,omitempty"
                    }
                  }
                },
                "required": [
                  "name",
                  "kind",
                  "type",
                  "subType",
                  "status"
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Connection updated",
            "content": {
              "application/json": {
                "schema": {
                  "$id": "https://schemas.meshery.io/connection.yaml",
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "description": "Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections",
                  "additionalProperties": false,
                  "type": "object",
                  "required": [
                    "id",
                    "schemaVersion",
                    "name",
                    "type",
                    "subType",
                    "kind",
                    "status"
                  ],
                  "properties": {
                    "id": {
                      "description": "Connection ID",
                      "x-order": 1,
                      "x-go-name": "ID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "name": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      },
                      "x-order": 2,
                      "type": "string",
                      "description": "Connection Name",
                      "minLength": 1,
                      "maxLength": 255
                    },
                    "description": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "description",
                        "json": "description"
                      },
                      "x-order": 3,
                      "type": "string",
                      "description": "Human-readable description of the connection and its purpose.",
                      "maxLength": 1000
                    },
                    "url": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "url",
                        "json": "url"
                      },
                      "x-order": 4,
                      "type": "string",
                      "format": "uri",
                      "description": "URL of the remote resource this connection points to (e.g. the Helm repository URL, the Kubernetes API server endpoint, the Grafana instance URL).",
                      "maxLength": 2048
                    },
                    "credentialId": {
                      "x-go-name": "CredentialID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "credential_id",
                        "json": "credentialId"
                      },
                      "x-order": 5,
                      "description": "Associated Credential ID",
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
                        "json": "type",
                        "yaml": "type"
                      },
                      "x-go-name": "ConnectionType",
                      "x-order": 6,
                      "type": "string",
                      "description": "Connection Type (platform, telemetry, collaboration)",
                      "maxLength": 255
                    },
                    "subType": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "sub_type",
                        "json": "subType"
                      },
                      "x-order": 7,
                      "type": "string",
                      "description": "Connection Subtype (cloud, identity, metrics, chat, git, orchestration)",
                      "maxLength": 255
                    },
                    "kind": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "kind"
                      },
                      "x-order": 8,
                      "type": "string",
                      "description": "Connection Kind (meshery, kubernetes, prometheus, grafana, gke, aws, azure, slack, github)",
                      "maxLength": 255
                    },
                    "model": {
                      "x-go-type": "*modelv1beta1.ModelDefinition",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta1/model",
                        "name": "modelv1beta1"
                      },
                      "x-order": 7,
                      "description": "Reference to the specific registered model to which the component belongs and from which model version, category, and other properties may be referenced. Learn more at https://docs.meshery.io/concepts/models",
                      "x-oapi-codegen-extra-tags": {
                        "gorm": "foreignKey:ModelID;references:ID",
                        "json": "model",
                        "yaml": "model"
                      },
                      "$id": "https://schemas.meshery.io/model.yaml",
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
                          "default": "models.meshery.io/v1beta1",
                          "type": "string",
                          "minLength": 2,
                          "maxLength": 100,
                          "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                          "example": [
                            "v1",
                            "v1alpha1",
                            "v2beta3",
                            "v1.custom-suffix",
                            "models.meshery.io/v1beta1",
                            "capability.meshery.io/v1alpha1"
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
                          },
                          "default": "untitled-model"
                        },
                        "displayName": {
                          "description": "Human-readable name for the model.",
                          "helperText": "Model display name may include letters, numbers, and spaces. Special characters are not allowed.",
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
                            "yaml": "description,omitempty",
                            "json": "description,omitempty"
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
                            "gorm": "foreignKey:RegistrantId;references:ID"
                          },
                          "x-order": 8,
                          "x-go-type": "connectionv1beta1.Connection",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/v1beta1/connection",
                            "name": "connectionv1beta1"
                          },
                          "$id": "https://schemas.meshery.io/connection.yaml",
                          "$schema": "http://json-schema.org/draft-07/schema#",
                          "description": "Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections",
                          "additionalProperties": false,
                          "type": "object",
                          "required": [
                            "id",
                            "schemaVersion",
                            "name",
                            "type",
                            "subType",
                            "kind",
                            "status"
                          ],
                          "properties": {
                            "id": {
                              "description": "Connection ID",
                              "x-order": 1,
                              "x-go-name": "ID",
                              "x-oapi-codegen-extra-tags": {
                                "db": "id",
                                "yaml": "id"
                              },
                              "type": "string",
                              "format": "uuid",
                              "x-go-type": "uuid.UUID",
                              "x-go-type-import": {
                                "path": "github.com/gofrs/uuid"
                              }
                            },
                            "name": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "name",
                                "yaml": "name"
                              },
                              "x-order": 2,
                              "type": "string",
                              "description": "Connection Name"
                            },
                            "credentialId": {
                              "x-go-name": "CredentialID",
                              "x-oapi-codegen-extra-tags": {
                                "db": "credential_id",
                                "yaml": "credentialId"
                              },
                              "x-order": 3,
                              "description": "Associated Credential ID",
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
                                "yaml": "type"
                              },
                              "x-order": 4,
                              "type": "string",
                              "description": "Connection Type (platform, telemetry, collaboration)"
                            },
                            "subType": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "sub_type",
                                "yaml": "subType"
                              },
                              "x-order": 5,
                              "type": "string",
                              "description": "Connection Subtype (cloud, identity, metrics, chat, git, orchestration)"
                            },
                            "kind": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "kind",
                                "yaml": "kind"
                              },
                              "x-order": 6,
                              "type": "string",
                              "description": "Connection Kind (meshery, kubernetes, prometheus, grafana, gke, aws, azure, slack, github)"
                            },
                            "metadata": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "metadata",
                                "yaml": "metadata"
                              },
                              "x-order": 7,
                              "x-go-type": "core.Map",
                              "x-go-type-import": {
                                "path": "github.com/meshery/schemas/models/core"
                              },
                              "x-go-type-skip-optional-pointer": true,
                              "type": "object",
                              "description": "Additional connection metadata"
                            },
                            "status": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "status",
                                "yaml": "status"
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
                                "db": "user_id",
                                "yaml": "user_id"
                              },
                              "x-order": 9,
                              "description": "User ID who owns this connection",
                              "type": "string",
                              "format": "uuid",
                              "x-go-type": "uuid.UUID",
                              "x-go-type-import": {
                                "path": "github.com/gofrs/uuid"
                              }
                            },
                            "created_at": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "created_at",
                                "yaml": "created_at"
                              },
                              "x-order": 10,
                              "type": "string",
                              "format": "date-time",
                              "x-go-type-skip-optional-pointer": true
                            },
                            "updated_at": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "updated_at",
                                "yaml": "updated_at"
                              },
                              "x-order": 11,
                              "type": "string",
                              "format": "date-time",
                              "x-go-type-skip-optional-pointer": true
                            },
                            "deleted_at": {
                              "x-oapi-codegen-extra-tags": {
                                "db": "deleted_at",
                                "yaml": "deleted_at"
                              },
                              "x-order": 12,
                              "description": "SQL null Timestamp to handle null values of time.",
                              "x-go-type": "meshcore.NullTime",
                              "x-go-type-import": {
                                "name": "meshcore",
                                "path": "github.com/meshery/schemas/models/core"
                              },
                              "type": "string",
                              "format": "date-time",
                              "x-go-type-skip-optional-pointer": true
                            },
                            "environments": {
                              "type": "array",
                              "description": "Associated environments for this connection",
                              "items": {
                                "x-go-type": "*environmentv1beta1.Environment",
                                "x-go-type-import": {
                                  "path": "github.com/meshery/schemas/models/v1beta1/environment",
                                  "name": "environmentv1beta1"
                                },
                                "$id": "https://schemas.meshery.io/environment.yaml",
                                "$schema": "http://json-schema.org/draft-07/schema#",
                                "title": "Environment",
                                "description": "Environments allow you to logically group related Connections and their associated Credentials. Learn more at https://docs.meshery.io/concepts/logical/environments",
                                "additionalProperties": false,
                                "type": "object",
                                "example": {
                                  "id": "00000000-0000-0000-0000-000000000000",
                                  "schemaVersion": "environments.meshery.io/v1beta1",
                                  "name": "Production Environment",
                                  "description": "Connections and credentials for the production cluster.",
                                  "organization_id": "00000000-0000-0000-0000-000000000000",
                                  "owner": "00000000-0000-0000-0000-000000000000",
                                  "created_at": "0001-01-01T00:00:00Z",
                                  "metadata": {},
                                  "updated_at": "0001-01-01T00:00:00Z",
                                  "deleted_at": null
                                },
                                "required": [
                                  "id",
                                  "schemaVersion",
                                  "name",
                                  "description",
                                  "organization_id"
                                ],
                                "properties": {
                                  "id": {
                                    "description": "ID",
                                    "x-order": 1,
                                    "x-go-name": "ID",
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "id",
                                      "yaml": "id"
                                    },
                                    "type": "string",
                                    "format": "uuid",
                                    "x-go-type": "uuid.UUID",
                                    "x-go-type-import": {
                                      "path": "github.com/gofrs/uuid"
                                    }
                                  },
                                  "schemaVersion": {
                                    "description": "Specifies the version of the schema to which the environment conforms.",
                                    "x-order": 2,
                                    "x-oapi-codegen-extra-tags": {
                                      "yaml": "schemaVersion",
                                      "db": "-",
                                      "gorm": "-"
                                    },
                                    "default": "environments.meshery.io/v1beta1",
                                    "type": "string",
                                    "minLength": 2,
                                    "maxLength": 100,
                                    "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                                    "example": [
                                      "v1",
                                      "v1alpha1",
                                      "v2beta3",
                                      "v1.custom-suffix",
                                      "models.meshery.io/v1beta1",
                                      "capability.meshery.io/v1alpha1"
                                    ]
                                  },
                                  "name": {
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "name",
                                      "yaml": "name"
                                    },
                                    "x-order": 3,
                                    "type": "string",
                                    "maxLength": 100,
                                    "description": "Environment name"
                                  },
                                  "description": {
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "description",
                                      "yaml": "description"
                                    },
                                    "x-order": 4,
                                    "type": "string",
                                    "maxLength": 1000,
                                    "description": "Environment description"
                                  },
                                  "organization_id": {
                                    "x-go-name": "OrganizationID",
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "organization_id",
                                      "yaml": "organization_id"
                                    },
                                    "x-order": 5,
                                    "description": "Environment organization ID",
                                    "type": "string",
                                    "format": "uuid",
                                    "x-go-type": "uuid.UUID",
                                    "x-go-type-import": {
                                      "path": "github.com/gofrs/uuid"
                                    }
                                  },
                                  "owner": {
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "owner",
                                      "yaml": "owner"
                                    },
                                    "x-order": 6,
                                    "description": "Environment owner",
                                    "type": "string",
                                    "format": "uuid",
                                    "x-go-type": "uuid.UUID",
                                    "x-go-type-import": {
                                      "path": "github.com/gofrs/uuid"
                                    }
                                  },
                                  "created_at": {
                                    "x-order": 7,
                                    "description": "Timestamp when the resource was created.",
                                    "x-go-type": "time.Time",
                                    "type": "string",
                                    "format": "date-time",
                                    "x-go-name": "CreatedAt",
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "created_at",
                                      "yaml": "created_at"
                                    },
                                    "x-go-type-skip-optional-pointer": true
                                  },
                                  "metadata": {
                                    "description": "Additional metadata associated with the environment.",
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "metadata",
                                      "yaml": "metadata"
                                    },
                                    "x-order": 8,
                                    "x-go-type": "core.Map",
                                    "x-go-type-skip-optional-pointer": true,
                                    "type": "object"
                                  },
                                  "updated_at": {
                                    "x-order": 9,
                                    "description": "Timestamp when the resource was updated.",
                                    "x-go-type": "time.Time",
                                    "type": "string",
                                    "format": "date-time",
                                    "x-go-name": "UpdatedAt",
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "updated_at",
                                      "yaml": "updated_at"
                                    },
                                    "x-go-type-skip-optional-pointer": true
                                  },
                                  "deleted_at": {
                                    "description": "Timestamp when the environment was soft deleted. Null while the environment remains active.",
                                    "nullable": true,
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "deleted_at",
                                      "yaml": "deleted_at"
                                    },
                                    "x-go-type": "core.NullTime",
                                    "x-go-import": "database/sql",
                                    "x-order": 10,
                                    "x-go-type-import": {
                                      "name": "meshcore",
                                      "path": "github.com/meshery/schemas/models/core"
                                    },
                                    "type": "string",
                                    "format": "date-time",
                                    "x-go-type-skip-optional-pointer": true
                                  }
                                }
                              },
                              "x-oapi-codegen-extra-tags": {
                                "db": "-",
                                "yaml": "environments",
                                "gorm": "-"
                              },
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 13
                            },
                            "schemaVersion": {
                              "description": "Specifies the version of the schema used for the definition.",
                              "x-order": 14,
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "schemaVersion",
                                "db": "-",
                                "gorm": "-"
                              },
                              "default": "connections.meshery.io/v1beta1",
                              "type": "string",
                              "minLength": 2,
                              "maxLength": 100,
                              "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                              "example": [
                                "v1",
                                "v1alpha1",
                                "v2beta3",
                                "v1.custom-suffix",
                                "models.meshery.io/v1beta1",
                                "capability.meshery.io/v1alpha1"
                              ]
                            }
                          }
                        },
                        "registrantId": {
                          "description": "ID of the registrant.",
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "connection_id",
                            "json": "connection_id",
                            "gorm": "column:connection_id"
                          },
                          "x-order": 8,
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
                            "yaml": "-",
                            "json": "-",
                            "gorm": "categoryID"
                          },
                          "x-order": 8,
                          "type": "string",
                          "format": "uuid",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          }
                        },
                        "category": {
                          "x-order": 9,
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "category",
                            "json": "category",
                            "gorm": "foreignKey:CategoryId;references:ID"
                          },
                          "x-go-type": "categoryv1beta1.CategoryDefinition",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/v1beta1/category",
                            "name": "categoryv1beta1"
                          },
                          "$id": "https://schemas.meshery.io/category.yaml",
                          "$schema": "http://json-schema.org/draft-07/schema#",
                          "type": "object",
                          "additionalProperties": false,
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
                              "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                              "x-go-type": "uuid.UUID",
                              "x-go-type-import": {
                                "path": "github.com/gofrs/uuid"
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
                              "description": "Additional metadata associated with the category.",
                              "type": "object",
                              "x-oapi-codegen-extra-tags": {
                                "yaml": "metadata,omitempty",
                                "json": "metadata,omitempty",
                                "gorm": "type:bytes;serializer:json"
                              },
                              "x-order": 3
                            }
                          }
                        },
                        "subCategory": {
                          "x-order": 10,
                          "x-go-type": "subcategoryv1beta1.SubCategoryDefinition",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/v1beta1/subcategory",
                            "name": "subcategoryv1beta1"
                          },
                          "$id": "https://schemas.meshery.io/category.yaml",
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
                                "x-go-type": "capabilityv1alpha1.Capability",
                                "x-go-type-import": {
                                  "path": "github.com/meshery/schemas/models/v1alpha1/capability",
                                  "name": "capabilityv1alpha1"
                                },
                                "$id": "https://schemas.meshery.io/capability.yaml",
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
                                    "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                                    "example": [
                                      "v1",
                                      "v1alpha1",
                                      "v2beta3",
                                      "v1.custom-suffix",
                                      "models.meshery.io/v1beta1",
                                      "capability.meshery.io/v1alpha1"
                                    ]
                                  },
                                  "version": {
                                    "description": "Version of the capability definition.",
                                    "type": "string",
                                    "minLength": 5,
                                    "maxLength": 100,
                                    "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                                  },
                                  "displayName": {
                                    "description": "Name of the capability in human-readible format.",
                                    "type": "string",
                                    "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
                                  },
                                  "description": {
                                    "type": "string",
                                    "description": "A written representation of the purpose and characteristics of the capability.",
                                    "maxLength": 5000
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
                                    "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
                                  },
                                  "type": {
                                    "description": "Classification of capabilities. Used to group capabilities similar in nature.",
                                    "type": "string",
                                    "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
                                  },
                                  "subType": {
                                    "description": "Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Capability.",
                                    "type": "string",
                                    "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
                                  },
                                  "key": {
                                    "description": "Key that backs the capability.",
                                    "type": "string",
                                    "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
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
                                      "description": "A string starting with an alphanumeric character. Spaces and hyphens allowed."
                                    }
                                  },
                                  "status": {
                                    "type": "string",
                                    "description": "Status of the capability",
                                    "default": "enabled",
                                    "enum": [
                                      "enabled",
                                      "disabled"
                                    ]
                                  },
                                  "metadata": {
                                    "type": "object",
                                    "description": "Metadata contains additional information associated with the capability. Extension point.",
                                    "additionalProperties": true
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
                                    "schemaVersion": "capability.meshery.io/v1beta1",
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
                                    "schemaVersion": "capability.meshery.io/v1beta1",
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
                                    "schemaVersion": "capability.meshery.io/v1beta1",
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
                                    "schemaVersion": "capability.meshery.io/v1beta1",
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
                            }
                          },
                          "x-oapi-codegen-extra-tags": {
                            "gorm": "type:bytes;serializer:json",
                            "json": "metadata",
                            "yaml": "metadata"
                          },
                          "x-order": 11,
                          "additionalProperties": true
                        },
                        "model": {
                          "x-oapi-codegen-extra-tags": {
                            "gorm": "type:bytes;serializer:json"
                          },
                          "x-order": 12,
                          "type": "object",
                          "description": "Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31).",
                          "required": [
                            "version"
                          ],
                          "properties": {
                            "version": {
                              "description": "Version of the model as defined by the registrant.",
                              "x-oapi-codegen-extra-tags": {
                                "json": "version"
                              },
                              "x-order": 1,
                              "type": "string",
                              "minLength": 5,
                              "maxLength": 100,
                              "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
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
                          "description": "The relationships of the model."
                        },
                        "components": {
                          "type": "array",
                          "x-go-type": "interface{}",
                          "x-oapi-codegen-extra-tags": {
                            "gorm": "-",
                            "json": "components",
                            "yaml": "components"
                          },
                          "description": "The components of the model."
                        },
                        "componentsCount": {
                          "type": "integer",
                          "description": "Number of components associated with the model.",
                          "x-order": 13,
                          "x-oapi-codegen-extra-tags": {
                            "json": "components_count",
                            "yaml": "components_count",
                            "gorm": "-"
                          },
                          "default": 0,
                          "minimum": 0
                        },
                        "relationshipsCount": {
                          "type": "integer",
                          "description": "Number of relationships associated with the model.",
                          "x-order": 13,
                          "x-oapi-codegen-extra-tags": {
                            "gorm": "-",
                            "json": "relationships_count",
                            "yaml": "relationships_count"
                          },
                          "default": 0,
                          "minimum": 0
                        },
                        "created_at": {
                          "x-order": 14,
                          "description": "Timestamp when the resource was created.",
                          "x-go-type": "time.Time",
                          "type": "string",
                          "format": "date-time",
                          "x-go-name": "CreatedAt",
                          "x-oapi-codegen-extra-tags": {
                            "db": "created_at",
                            "yaml": "created_at"
                          },
                          "x-go-type-skip-optional-pointer": true
                        },
                        "updated_at": {
                          "x-order": 15,
                          "description": "Timestamp when the resource was updated.",
                          "x-go-type": "time.Time",
                          "type": "string",
                          "format": "date-time",
                          "x-go-name": "UpdatedAt",
                          "x-oapi-codegen-extra-tags": {
                            "db": "updated_at",
                            "yaml": "updated_at"
                          },
                          "x-go-type-skip-optional-pointer": true
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
                    "modelReference": {
                      "x-go-type": "modelv1beta1.ModelReference",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta1/model",
                        "name": "modelv1beta1"
                      },
                      "x-order": 8,
                      "description": "Reference to the specific registered model to which the component belongs and from which model version, category, and other properties may be referenced. Learn more at https://docs.meshery.io/concepts/models",
                      "x-oapi-codegen-extra-tags": {
                        "gorm": "-"
                      },
                      "type": "object",
                      "required": [
                        "id",
                        "name",
                        "version",
                        "displayName",
                        "model",
                        "registrant"
                      ],
                      "properties": {
                        "id": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          }
                        },
                        "name": {
                          "type": "string",
                          "description": "The unique name for the model within the scope of a registrant.",
                          "pattern": "^[a-z0-9-]+$",
                          "examples": [
                            "cert-manager"
                          ]
                        },
                        "version": {
                          "description": "Version of the model definition.",
                          "type": "string",
                          "minLength": 5,
                          "maxLength": 100,
                          "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                        },
                        "displayName": {
                          "type": "string",
                          "description": "Human-readable name for the model.",
                          "minLength": 1,
                          "maxLength": 100,
                          "pattern": "^[a-zA-Z0-9 ]+$",
                          "examples": [
                            "Cert Manager"
                          ]
                        },
                        "model": {
                          "type": "object",
                          "description": "Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31).",
                          "required": [
                            "version"
                          ],
                          "properties": {
                            "version": {
                              "description": "Version of the model as defined by the registrant.",
                              "x-oapi-codegen-extra-tags": {
                                "json": "version"
                              },
                              "x-order": 1,
                              "type": "string",
                              "minLength": 5,
                              "maxLength": 100,
                              "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                            }
                          }
                        },
                        "registrant": {
                          "x-go-type": "RegistrantReference",
                          "x-oapi-codegen-extra-tags": {
                            "json": "registrant"
                          },
                          "type": "object",
                          "required": [
                            "kind"
                          ],
                          "properties": {
                            "kind": {
                              "type": "string",
                              "description": "Kind of the registrant.",
                              "maxLength": 255
                            }
                          }
                        }
                      }
                    },
                    "modelId": {
                      "description": "Foreign key to the model to which the component belongs. Populated by the ORM from the `model_id` column and suppressed on the JSON wire; consumers use the nested `model` object for wire-level access.",
                      "x-go-name": "ModelID",
                      "x-oapi-codegen-extra-tags": {
                        "gorm": "column:model_id",
                        "db": "model_id",
                        "yaml": "-",
                        "json": "-"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "metadata": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata"
                      },
                      "x-order": 9,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "type": "object",
                      "description": "Additional connection metadata"
                    },
                    "credentialSchema": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "credential_schema"
                      },
                      "x-order": 9,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "type": "object",
                      "description": "Schema for the credential Associated with the connection"
                    },
                    "connectionSchema": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "connection_schema"
                      },
                      "x-order": 9,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "type": "object",
                      "description": "Schema for the connection"
                    },
                    "styles": {
                      "x-oapi-codegen-extra-tags": {
                        "gorm": "type:bytes;serializer:json",
                        "yaml": "styles",
                        "json": "styles"
                      },
                      "x-go-type": "core.ComponentStyles",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-order": 17,
                      "description": "Visualization styles for the connection, including svgColor and svgWhite used for UI representation.",
                      "type": "object",
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
                              "description": "Primary color of the component used for UI representation.",
                              "maxLength": 500
                            },
                            "secondaryColor": {
                              "type": "string",
                              "description": "Secondary color of the entity used for UI representation.",
                              "maxLength": 500
                            },
                            "svgWhite": {
                              "type": "string",
                              "description": "White SVG of the entity used for UI representation on dark background.",
                              "maxLength": 500
                            },
                            "svgColor": {
                              "type": "string",
                              "description": "Colored SVG of the entity used for UI representation on light background.",
                              "maxLength": 500
                            },
                            "svgComplete": {
                              "type": "string",
                              "description": "Complete SVG of the entity used for UI representation, often inclusive of background.",
                              "maxLength": 500
                            },
                            "color": {
                              "type": "string",
                              "description": "The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 500
                            },
                            "textOpacity": {
                              "type": "number",
                              "description": "The opacity of the label text, including its outline.",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "fontFamily": {
                              "type": "string",
                              "description": "A comma-separated list of font names to use on the label text.",
                              "maxLength": 500
                            },
                            "fontSize": {
                              "type": "string",
                              "description": "The size of the label text.",
                              "maxLength": 500
                            },
                            "fontStyle": {
                              "type": "string",
                              "description": "A CSS font style to be applied to the label text.",
                              "maxLength": 500
                            },
                            "fontWeight": {
                              "type": "string",
                              "description": "A CSS font weight to be applied to the label text.",
                              "maxLength": 500
                            },
                            "textTransform": {
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
                            "zIndex": {
                              "type": "integer",
                              "description": "An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index.",
                              "minimum": 0
                            },
                            "label": {
                              "type": "string",
                              "description": "The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id",
                              "maxLength": 500
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
                                  "minimum": -1000000,
                                  "maximum": 1000000,
                                  "x-go-type": "float64"
                                },
                                "y": {
                                  "type": "number",
                                  "description": "The y-coordinate of the node.",
                                  "minimum": -1000000,
                                  "maximum": 1000000,
                                  "x-go-type": "float64"
                                }
                              }
                            },
                            "bodyText": {
                              "type": "string",
                              "description": "The text to display for an element's body. Can give a path, e.g. data(id) will label with the elements id",
                              "maxLength": 500
                            },
                            "bodyTextWrap": {
                              "type": "string",
                              "description": "How to wrap the text in the node. Can be 'none', 'wrap', or 'ellipsis'.",
                              "enum": [
                                "none",
                                "wrap",
                                "ellipsis"
                              ]
                            },
                            "bodyTextMaxWidth": {
                              "type": "string",
                              "description": "The maximum width for wrapping text in the node.",
                              "maxLength": 50
                            },
                            "bodyTextOpacity": {
                              "type": "number",
                              "description": "The opacity of the node's body text, including its outline.",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "bodyTextBackgroundColor": {
                              "type": "string",
                              "description": "The colour of the node's body text background. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "bodyTextFontSize": {
                              "type": "number",
                              "description": "The size of the node's body text.",
                              "minimum": 0
                            },
                            "bodyTextColor": {
                              "type": "string",
                              "description": "The colour of the node's body text. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "bodyTextFontWeight": {
                              "type": "string",
                              "description": "A CSS font weight to be applied to the node's body text.",
                              "maxLength": 50
                            },
                            "bodyTextHorizontalAlign": {
                              "type": "string",
                              "description": "A CSS horizontal alignment to be applied to the node's body text.",
                              "maxLength": 50
                            },
                            "bodyTextDecoration": {
                              "type": "string",
                              "description": "A CSS text decoration to be applied to the node's body text.",
                              "maxLength": 100
                            },
                            "bodyTextVerticalAlign": {
                              "type": "string",
                              "description": "A CSS vertical alignment to be applied to the node's body text.",
                              "maxLength": 50
                            },
                            "width": {
                              "type": "number",
                              "description": "The width of the node's body or the width of an edge's line.",
                              "minimum": 0
                            },
                            "height": {
                              "type": "number",
                              "description": "The height of the node's body",
                              "minimum": 0
                            },
                            "backgroundImage": {
                              "type": "string",
                              "format": "uri",
                              "description": "The URL that points to the image to show in the node.",
                              "maxLength": 2048
                            },
                            "backgroundColor": {
                              "type": "string",
                              "description": "The colour of the node's body. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "backgroundBlacken": {
                              "type": "number",
                              "description": "Blackens the node's body for values from 0 to 1; whitens the node's body for values from 0 to -1.",
                              "maximum": 1,
                              "minimum": -1
                            },
                            "backgroundOpacity": {
                              "type": "number",
                              "description": "The opacity level of the node's background colour",
                              "maximum": 1,
                              "minimum": 0
                            },
                            "backgroundPositionX": {
                              "type": "string",
                              "description": "The x position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                              "maxLength": 50
                            },
                            "backgroundPositionY": {
                              "type": "string",
                              "description": "The y position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                              "maxLength": 50
                            },
                            "backgroundOffsetX": {
                              "type": "string",
                              "description": "The x offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                              "maxLength": 50
                            },
                            "backgroundOffsetY": {
                              "type": "string",
                              "description": "The y offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                              "maxLength": 50
                            },
                            "backgroundFit": {
                              "type": "string",
                              "description": "How the background image is fit to the node. Can be 'none', 'contain', or 'cover'.",
                              "enum": [
                                "none",
                                "contain",
                                "cover"
                              ]
                            },
                            "backgroundClip": {
                              "type": "string",
                              "description": "How the background image is clipped to the node. Can be 'none', 'node', or 'node-border'.",
                              "enum": [
                                "none",
                                "node",
                                "node-border"
                              ]
                            },
                            "backgroundWidthRelativeTo": {
                              "type": "string",
                              "description": "How the background image's width is determined. Can be 'none', 'inner', or 'outer'.",
                              "enum": [
                                "none",
                                "inner",
                                "outer"
                              ]
                            },
                            "backgroundHeightRelativeTo": {
                              "type": "string",
                              "description": "How the background image's height is determined. Can be 'none', 'inner', or 'outer'.",
                              "enum": [
                                "none",
                                "inner",
                                "outer"
                              ]
                            },
                            "borderWidth": {
                              "type": "number",
                              "description": "The size of the node's border.",
                              "minimum": 0
                            },
                            "borderStyle": {
                              "type": "string",
                              "description": "The style of the node's border",
                              "enum": [
                                "solid",
                                "dotted",
                                "dashed",
                                "double"
                              ]
                            },
                            "borderColor": {
                              "type": "string",
                              "description": "The colour of the node's border. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "borderOpacity": {
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
                            "textHalign": {
                              "type": "string",
                              "description": "The horizontal alignment of a node's label",
                              "enum": [
                                "left",
                                "center",
                                "right"
                              ]
                            },
                            "textValign": {
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
                            "activeBgColor": {
                              "type": "string",
                              "description": "The colour of the indicator shown when the background is grabbed by the user. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "activeBgOpacity": {
                              "type": "string",
                              "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                              "maxLength": 50
                            },
                            "activeBgSize": {
                              "type": "string",
                              "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                              "maxLength": 50
                            },
                            "selectionBoxColor": {
                              "type": "string",
                              "description": "The background colour of the selection box used for drag selection. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "selectionBoxBorderWidth": {
                              "type": "number",
                              "description": "The size of the border on the selection box. Selector needs to be *core*",
                              "minimum": 0
                            },
                            "selectionBoxOpacity": {
                              "type": "number",
                              "description": "The opacity of the selection box. Selector needs to be *core*",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "outsideTextureBgColor": {
                              "type": "string",
                              "description": "The colour of the area outside the viewport texture when initOptions.textureOnViewport === true. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "outsideTextureBgOpacity": {
                              "type": "number",
                              "description": "The opacity of the area outside the viewport texture. Selector needs to be *core*",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "shapePolygonPoints": {
                              "type": "string",
                              "description": "An array (or a space-separated string) of numbers ranging on [-1, 1], representing alternating x and y values (i.e. x1 y1 x2 y2, x3 y3 ...). This represents the points in the polygon for the node's shape. The bounding box of the node is given by (-1, -1), (1, -1), (1, 1), (-1, 1). The node's position is the origin (0, 0 )",
                              "maxLength": 2000
                            },
                            "menuBackgroundColor": {
                              "type": "string",
                              "description": "The colour of the background of the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "menuBackgroundOpacity": {
                              "type": "number",
                              "description": "The opacity of the background of the component menu.",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "menuForgroundColor": {
                              "type": "string",
                              "description": "The colour of the text or icons in the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            }
                          }
                        }
                      ]
                    },
                    "status": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      },
                      "x-order": 10,
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
                    "transitionMap": {
                      "type": "object",
                      "description": "Map describing the connection state machine. Each key is a current connection status and its value is the list of states the connection may transition to from that status, along with a description of each transition.",
                      "additionalProperties": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "additionalProperties": false,
                          "description": "A single permissible state transition for a connection, describing the next reachable state and the meaning of that transition.",
                          "required": [
                            "nextState"
                          ],
                          "properties": {
                            "nextState": {
                              "type": "string",
                              "description": "Connection Status Value",
                              "x-go-name": "ConnectionStatusValue",
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
                              "x-order": 1
                            },
                            "description": {
                              "type": "string",
                              "description": "Human-readable explanation of when or why this transition occurs.",
                              "maxLength": 1000,
                              "x-oapi-codegen-extra-tags": {
                                "json": "description,omitempty"
                              },
                              "x-order": 2
                            }
                          }
                        }
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "gorm": "type:bytes;serializer:json",
                        "json": "transitionMap,omitempty"
                      },
                      "x-order": 18
                    },
                    "userId": {
                      "x-go-name": "UserID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "user_id",
                        "json": "userId"
                      },
                      "x-order": 11,
                      "description": "User ID who owns this connection",
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "createdAt": {
                      "description": "Timestamp when the connection was created.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "createdAt"
                      },
                      "x-order": 12,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp when the connection was last updated.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updatedAt"
                      },
                      "x-order": 13,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "description": "Timestamp when the connection was soft-deleted, if applicable.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deletedAt"
                      },
                      "x-order": 14,
                      "x-go-type": "meshcore.NullTime",
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "environments": {
                      "type": "array",
                      "description": "Associated environments for this connection",
                      "items": {
                        "x-go-type": "*environmentv1beta3.Environment",
                        "x-go-type-import": {
                          "path": "github.com/meshery/schemas/models/v1beta3/environment",
                          "name": "environmentv1beta3"
                        },
                        "$id": "https://schemas.meshery.io/environment.yaml",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "title": "Environment",
                        "description": "Environments allow you to logically group related Connections and their associated Credentials. Learn more at https://docs.meshery.io/concepts/logical/environments",
                        "additionalProperties": false,
                        "type": "object",
                        "example": {
                          "id": "00000000-0000-0000-0000-000000000000",
                          "schemaVersion": "environments.meshery.io/v1beta3",
                          "name": "Production Environment",
                          "description": "Connections and credentials for the production cluster.",
                          "organizationId": "00000000-0000-0000-0000-000000000000",
                          "owner": "00000000-0000-0000-0000-000000000000",
                          "createdAt": "0001-01-01T00:00:00Z",
                          "metadata": {},
                          "updatedAt": "0001-01-01T00:00:00Z",
                          "deletedAt": null
                        },
                        "required": [
                          "id",
                          "schemaVersion",
                          "name",
                          "description",
                          "organizationId"
                        ],
                        "properties": {
                          "id": {
                            "description": "ID",
                            "x-order": 1,
                            "x-go-name": "ID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "id",
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
                            "description": "Specifies the version of the schema to which the environment conforms.",
                            "x-order": 2,
                            "x-oapi-codegen-extra-tags": {
                              "json": "schemaVersion",
                              "db": "-",
                              "gorm": "-"
                            },
                            "default": "environments.meshery.io/v1beta3",
                            "type": "string",
                            "minLength": 2,
                            "maxLength": 100,
                            "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                            "example": [
                              "v1",
                              "v1alpha1",
                              "v2beta3",
                              "v1.custom-suffix",
                              "models.meshery.io/v1beta1",
                              "capability.meshery.io/v1alpha1"
                            ]
                          },
                          "name": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "name",
                              "json": "name"
                            },
                            "x-order": 3,
                            "type": "string",
                            "maxLength": 100,
                            "description": "Environment name"
                          },
                          "description": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "description",
                              "json": "description"
                            },
                            "x-order": 4,
                            "type": "string",
                            "maxLength": 1000,
                            "description": "Environment description"
                          },
                          "organizationId": {
                            "x-go-name": "OrganizationID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "organization_id",
                              "json": "organizationId"
                            },
                            "x-order": 5,
                            "description": "Environment organization ID",
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "owner": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "owner",
                              "json": "owner"
                            },
                            "x-order": 6,
                            "description": "Environment owner",
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "createdAt": {
                            "description": "Timestamp when the environment was created.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "yaml": "created_at",
                              "json": "createdAt"
                            },
                            "x-order": 7,
                            "x-go-type": "time.Time",
                            "type": "string",
                            "format": "date-time",
                            "x-go-name": "CreatedAt",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "metadata": {
                            "description": "Additional metadata associated with the environment.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "metadata",
                              "json": "metadata"
                            },
                            "x-order": 8,
                            "x-go-type": "core.Map",
                            "x-go-type-skip-optional-pointer": true,
                            "type": "object"
                          },
                          "updatedAt": {
                            "description": "Timestamp when the environment was last updated.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "yaml": "updated_at",
                              "json": "updatedAt"
                            },
                            "x-order": 9,
                            "x-go-type": "time.Time",
                            "type": "string",
                            "format": "date-time",
                            "x-go-name": "UpdatedAt",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deletedAt": {
                            "description": "Timestamp when the environment was soft deleted. Null while the environment remains active.",
                            "nullable": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "json": "deletedAt"
                            },
                            "x-go-type": "core.NullTime",
                            "x-go-import": "database/sql",
                            "x-order": 10,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          }
                        }
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "-",
                        "gorm": "-"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 15
                    },
                    "schemaVersion": {
                      "description": "Specifies the version of the schema used for the definition.",
                      "x-order": 16,
                      "x-oapi-codegen-extra-tags": {
                        "db": "-",
                        "gorm": "-"
                      },
                      "default": "connections.meshery.io/v1beta3",
                      "type": "string",
                      "minLength": 2,
                      "maxLength": 100,
                      "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                      "example": [
                        "v1",
                        "v1alpha1",
                        "v2beta3",
                        "v1.custom-suffix",
                        "models.meshery.io/v1beta1",
                        "capability.meshery.io/v1alpha1"
                      ]
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Invalid request body or request param",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "401": {
            "description": "Expired JWT token used or insufficient privilege",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "404": {
            "description": "Result not found",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "500": {
            "description": "Internal server error",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          }
        }
      },
      "delete": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "Connections"
        ],
        "operationId": "deleteConnection",
        "summary": "Delete a connection",
        "description": "Delete a specific connection",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "description": "Connection ID",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Connection deleted"
          },
          "401": {
            "description": "Expired JWT token used or insufficient privilege",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "404": {
            "description": "Result not found",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "500": {
            "description": "Internal server error",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    },
    "/api/integrations/connections/meshery/{mesheryServerId}": {
      "delete": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "Connections"
        ],
        "operationId": "deleteMesheryConnection",
        "summary": "Delete Meshery instance connection",
        "description": "Delete a Meshery server connection by server ID",
        "parameters": [
          {
            "name": "mesheryServerId",
            "in": "path",
            "required": true,
            "description": "Meshery server ID",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Meshery connection deleted"
          },
          "401": {
            "description": "Expired JWT token used or insufficient privilege",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "404": {
            "description": "Result not found",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "500": {
            "description": "Internal server error",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    },
    "/api/integrations/connections/kubernetes/{connectionId}/context": {
      "get": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "Connections"
        ],
        "operationId": "getKubernetesContext",
        "summary": "Get Kubernetes context",
        "description": "Get Kubernetes context for a specific connection",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "description": "Connection ID",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Kubernetes context",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "401": {
            "description": "Expired JWT token used or insufficient privilege",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "404": {
            "description": "Result not found",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "500": {
            "description": "Internal server error",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    },
    "/api/environments/{environmentId}/connections/{connectionId}": {
      "post": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "Connections"
        ],
        "operationId": "addConnectionToEnvironment",
        "summary": "Add connection to environment",
        "description": "Associate a connection with an environment",
        "parameters": [
          {
            "name": "environmentId",
            "in": "path",
            "required": true,
            "description": "Environment ID",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "description": "Connection ID",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Connection added to environment"
          },
          "400": {
            "description": "Invalid request body or request param",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "401": {
            "description": "Expired JWT token used or insufficient privilege",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "404": {
            "description": "Result not found",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "500": {
            "description": "Internal server error",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          }
        }
      },
      "delete": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "Connections"
        ],
        "operationId": "removeConnectionFromEnvironment",
        "summary": "Remove connection from environment",
        "description": "Disassociate a connection from an environment",
        "parameters": [
          {
            "name": "environmentId",
            "in": "path",
            "required": true,
            "description": "Environment ID",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "description": "Connection ID",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Connection removed from environment"
          },
          "401": {
            "description": "Expired JWT token used or insufficient privilege",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "404": {
            "description": "Result not found",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "500": {
            "description": "Internal server error",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    },
    "/api/meshmodels/connections": {
      "get": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "ConnectionDefinitions"
        ],
        "operationId": "listConnectionDefinitions",
        "summary": "List connection definitions",
        "description": "Returns a paginated list of connection definitions registered in the registry, optionally filtered by model or kind.",
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "description": "Page number",
            "required": false,
            "schema": {
              "type": "integer",
              "minimum": 0,
              "default": 0
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "description": "Number of items per page",
            "required": false,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "default": 10
            }
          },
          {
            "name": "search",
            "in": "query",
            "description": "Search term",
            "required": false,
            "schema": {
              "type": "string",
              "maxLength": 500
            }
          },
          {
            "name": "order",
            "in": "query",
            "description": "Sort order",
            "required": false,
            "schema": {
              "type": "string",
              "maxLength": 500
            }
          },
          {
            "name": "model",
            "in": "query",
            "description": "Filter by the name of the model the connection definition belongs to",
            "required": false,
            "schema": {
              "type": "string",
              "maxLength": 255
            }
          },
          {
            "name": "kind",
            "in": "query",
            "description": "Filter by connection kind (e.g., kubernetes, prometheus, grafana)",
            "required": false,
            "schema": {
              "type": "array",
              "items": {
                "type": "string",
                "maxLength": 255
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Paginated list of connection definitions",
            "content": {
              "application/json": {
                "schema": {
                  "description": "Represents a page of connection definitions with meta information about the total count",
                  "additionalProperties": false,
                  "type": "object",
                  "required": [
                    "connectionDefinitions",
                    "totalCount",
                    "page",
                    "pageSize"
                  ],
                  "properties": {
                    "connectionDefinitions": {
                      "type": "array",
                      "description": "List of connection definitions on this page",
                      "x-go-type": "[]*ConnectionDefinition",
                      "items": {
                        "description": "A connection definition is an uninitialized connection, authored per-model (in a model's `connections/` folder) and registered into the registry alongside components and relationships. It conforms to the connection schema; the dynamic, kind-specific shape is carried in `metadata`. The `model` association scopes the definition to its owning model.",
                        "x-go-type": "Connection"
                      },
                      "x-order": 1
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of connection definitions on all pages",
                      "x-oapi-codegen-extra-tags": {
                        "json": "totalCount"
                      },
                      "x-order": 2,
                      "minimum": 0
                    },
                    "page": {
                      "type": "integer",
                      "description": "Current page number",
                      "x-order": 3,
                      "minimum": 0
                    },
                    "pageSize": {
                      "type": "integer",
                      "description": "Number of elements per page",
                      "x-oapi-codegen-extra-tags": {
                        "json": "pageSize"
                      },
                      "x-order": 4,
                      "minimum": 1
                    }
                  }
                }
              }
            }
          },
          "401": {
            "description": "Expired JWT token used or insufficient privilege",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "500": {
            "description": "Internal server error",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          }
        }
      },
      "post": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "ConnectionDefinitions"
        ],
        "operationId": "registerConnectionDefinition",
        "summary": "Register a connection definition",
        "description": "Register a new connection definition into the registry.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "description": "A connection definition is an uninitialized connection, authored per-model (in a model's `connections/` folder) and registered into the registry alongside components and relationships. It conforms to the connection schema; the dynamic, kind-specific shape is carried in `metadata`. The `model` association scopes the definition to its owning model.",
                "x-go-type": "Connection"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Connection definition registered",
            "content": {
              "application/json": {
                "schema": {
                  "description": "A connection definition is an uninitialized connection, authored per-model (in a model's `connections/` folder) and registered into the registry alongside components and relationships. It conforms to the connection schema; the dynamic, kind-specific shape is carried in `metadata`. The `model` association scopes the definition to its owning model.",
                  "x-go-type": "Connection"
                }
              }
            }
          },
          "400": {
            "description": "Invalid request body or request param",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "401": {
            "description": "Expired JWT token used or insufficient privilege",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "500": {
            "description": "Internal server error",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    },
    "/api/meshmodels/connections/{connectionDefinitionId}": {
      "get": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "ConnectionDefinitions"
        ],
        "operationId": "getConnectionDefinition",
        "summary": "Get connection definition by ID",
        "description": "Returns a specific connection definition by its ID.",
        "parameters": [
          {
            "name": "connectionDefinitionId",
            "in": "path",
            "required": true,
            "description": "Connection definition ID",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Connection definition details",
            "content": {
              "application/json": {
                "schema": {
                  "description": "A connection definition is an uninitialized connection, authored per-model (in a model's `connections/` folder) and registered into the registry alongside components and relationships. It conforms to the connection schema; the dynamic, kind-specific shape is carried in `metadata`. The `model` association scopes the definition to its owning model.",
                  "x-go-type": "Connection"
                }
              }
            }
          },
          "401": {
            "description": "Expired JWT token used or insufficient privilege",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "404": {
            "description": "Result not found",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "500": {
            "description": "Internal server error",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          }
        }
      },
      "put": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "ConnectionDefinitions"
        ],
        "operationId": "updateConnectionDefinition",
        "summary": "Update a connection definition",
        "description": "Update an existing connection definition.",
        "parameters": [
          {
            "name": "connectionDefinitionId",
            "in": "path",
            "required": true,
            "description": "Connection definition ID",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "description": "A connection definition is an uninitialized connection, authored per-model (in a model's `connections/` folder) and registered into the registry alongside components and relationships. It conforms to the connection schema; the dynamic, kind-specific shape is carried in `metadata`. The `model` association scopes the definition to its owning model.",
                "x-go-type": "Connection"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Connection definition updated",
            "content": {
              "application/json": {
                "schema": {
                  "description": "A connection definition is an uninitialized connection, authored per-model (in a model's `connections/` folder) and registered into the registry alongside components and relationships. It conforms to the connection schema; the dynamic, kind-specific shape is carried in `metadata`. The `model` association scopes the definition to its owning model.",
                  "x-go-type": "Connection"
                }
              }
            }
          },
          "400": {
            "description": "Invalid request body or request param",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "401": {
            "description": "Expired JWT token used or insufficient privilege",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "404": {
            "description": "Result not found",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "500": {
            "description": "Internal server error",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          }
        }
      },
      "delete": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "ConnectionDefinitions"
        ],
        "operationId": "deleteConnectionDefinition",
        "summary": "Delete a connection definition",
        "description": "Delete a specific connection definition from the registry.",
        "parameters": [
          {
            "name": "connectionDefinitionId",
            "in": "path",
            "required": true,
            "description": "Connection definition ID",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Connection definition deleted"
          },
          "401": {
            "description": "Expired JWT token used or insufficient privilege",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "404": {
            "description": "Result not found",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "500": {
            "description": "Internal server error",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "responses": {
      "400": {
        "description": "Invalid request body or request param",
        "content": {
          "text/plain": {
            "schema": {
              "type": "string"
            }
          }
        }
      },
      "401": {
        "description": "Expired JWT token used or insufficient privilege",
        "content": {
          "text/plain": {
            "schema": {
              "type": "string"
            }
          }
        }
      },
      "404": {
        "description": "Result not found",
        "content": {
          "text/plain": {
            "schema": {
              "type": "string"
            }
          }
        }
      },
      "500": {
        "description": "Internal server error",
        "content": {
          "text/plain": {
            "schema": {
              "type": "string"
            }
          }
        }
      }
    },
    "securitySchemes": {
      "jwt": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    },
    "parameters": {
      "connectionId": {
        "name": "connectionId",
        "in": "path",
        "required": true,
        "description": "Connection ID",
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      },
      "connectionDefinitionId": {
        "name": "connectionDefinitionId",
        "in": "path",
        "required": true,
        "description": "Connection definition ID",
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      },
      "connectionKind": {
        "name": "connectionKind",
        "in": "path",
        "required": true,
        "description": "Connection kind (meshery, kubernetes, prometheus, grafana, etc.)",
        "schema": {
          "type": "string",
          "maxLength": 255
        }
      },
      "environmentId": {
        "name": "environmentId",
        "in": "path",
        "required": true,
        "description": "Environment ID",
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      },
      "mesheryServerId": {
        "name": "mesheryServerId",
        "in": "path",
        "required": true,
        "description": "Meshery server ID",
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      },
      "page": {
        "name": "page",
        "in": "query",
        "description": "Page number",
        "required": false,
        "schema": {
          "type": "integer",
          "minimum": 0,
          "default": 0
        }
      },
      "pageSize": {
        "name": "pageSize",
        "in": "query",
        "description": "Number of items per page",
        "required": false,
        "schema": {
          "type": "integer",
          "minimum": 1,
          "default": 10
        }
      },
      "search": {
        "name": "search",
        "in": "query",
        "description": "Search term",
        "required": false,
        "schema": {
          "type": "string",
          "maxLength": 500
        }
      },
      "order": {
        "name": "order",
        "in": "query",
        "description": "Sort order",
        "required": false,
        "schema": {
          "type": "string",
          "maxLength": 500
        }
      },
      "orgIdQuery": {
        "name": "orgId",
        "in": "query",
        "description": "Organization ID to scope the request.",
        "required": false,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    },
    "schemas": {
      "Connection": {
        "$id": "https://schemas.meshery.io/connection.yaml",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "description": "Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections",
        "additionalProperties": false,
        "type": "object",
        "required": [
          "id",
          "schemaVersion",
          "name",
          "type",
          "subType",
          "kind",
          "status"
        ],
        "properties": {
          "id": {
            "description": "Connection ID",
            "x-order": 1,
            "x-go-name": "ID",
            "x-oapi-codegen-extra-tags": {
              "db": "id"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "name": {
            "x-oapi-codegen-extra-tags": {
              "db": "name"
            },
            "x-order": 2,
            "type": "string",
            "description": "Connection Name",
            "minLength": 1,
            "maxLength": 255
          },
          "description": {
            "x-oapi-codegen-extra-tags": {
              "db": "description",
              "json": "description"
            },
            "x-order": 3,
            "type": "string",
            "description": "Human-readable description of the connection and its purpose.",
            "maxLength": 1000
          },
          "url": {
            "x-oapi-codegen-extra-tags": {
              "db": "url",
              "json": "url"
            },
            "x-order": 4,
            "type": "string",
            "format": "uri",
            "description": "URL of the remote resource this connection points to (e.g. the Helm repository URL, the Kubernetes API server endpoint, the Grafana instance URL).",
            "maxLength": 2048
          },
          "credentialId": {
            "x-go-name": "CredentialID",
            "x-oapi-codegen-extra-tags": {
              "db": "credential_id",
              "json": "credentialId"
            },
            "x-order": 5,
            "description": "Associated Credential ID",
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
              "json": "type",
              "yaml": "type"
            },
            "x-go-name": "ConnectionType",
            "x-order": 6,
            "type": "string",
            "description": "Connection Type (platform, telemetry, collaboration)",
            "maxLength": 255
          },
          "subType": {
            "x-oapi-codegen-extra-tags": {
              "db": "sub_type",
              "json": "subType"
            },
            "x-order": 7,
            "type": "string",
            "description": "Connection Subtype (cloud, identity, metrics, chat, git, orchestration)",
            "maxLength": 255
          },
          "kind": {
            "x-oapi-codegen-extra-tags": {
              "db": "kind"
            },
            "x-order": 8,
            "type": "string",
            "description": "Connection Kind (meshery, kubernetes, prometheus, grafana, gke, aws, azure, slack, github)",
            "maxLength": 255
          },
          "model": {
            "x-go-type": "*modelv1beta1.ModelDefinition",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/v1beta1/model",
              "name": "modelv1beta1"
            },
            "x-order": 7,
            "description": "Reference to the specific registered model to which the component belongs and from which model version, category, and other properties may be referenced. Learn more at https://docs.meshery.io/concepts/models",
            "x-oapi-codegen-extra-tags": {
              "gorm": "foreignKey:ModelID;references:ID",
              "json": "model",
              "yaml": "model"
            },
            "$id": "https://schemas.meshery.io/model.yaml",
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
                "default": "models.meshery.io/v1beta1",
                "type": "string",
                "minLength": 2,
                "maxLength": 100,
                "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                "example": [
                  "v1",
                  "v1alpha1",
                  "v2beta3",
                  "v1.custom-suffix",
                  "models.meshery.io/v1beta1",
                  "capability.meshery.io/v1alpha1"
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
                },
                "default": "untitled-model"
              },
              "displayName": {
                "description": "Human-readable name for the model.",
                "helperText": "Model display name may include letters, numbers, and spaces. Special characters are not allowed.",
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
                  "yaml": "description,omitempty",
                  "json": "description,omitempty"
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
                  "gorm": "foreignKey:RegistrantId;references:ID"
                },
                "x-order": 8,
                "x-go-type": "connectionv1beta1.Connection",
                "x-go-type-import": {
                  "path": "github.com/meshery/schemas/models/v1beta1/connection",
                  "name": "connectionv1beta1"
                },
                "$id": "https://schemas.meshery.io/connection.yaml",
                "$schema": "http://json-schema.org/draft-07/schema#",
                "description": "Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections",
                "additionalProperties": false,
                "type": "object",
                "required": [
                  "id",
                  "schemaVersion",
                  "name",
                  "type",
                  "subType",
                  "kind",
                  "status"
                ],
                "properties": {
                  "id": {
                    "description": "Connection ID",
                    "x-order": 1,
                    "x-go-name": "ID",
                    "x-oapi-codegen-extra-tags": {
                      "db": "id",
                      "yaml": "id"
                    },
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  },
                  "name": {
                    "x-oapi-codegen-extra-tags": {
                      "db": "name",
                      "yaml": "name"
                    },
                    "x-order": 2,
                    "type": "string",
                    "description": "Connection Name"
                  },
                  "credentialId": {
                    "x-go-name": "CredentialID",
                    "x-oapi-codegen-extra-tags": {
                      "db": "credential_id",
                      "yaml": "credentialId"
                    },
                    "x-order": 3,
                    "description": "Associated Credential ID",
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
                      "yaml": "type"
                    },
                    "x-order": 4,
                    "type": "string",
                    "description": "Connection Type (platform, telemetry, collaboration)"
                  },
                  "subType": {
                    "x-oapi-codegen-extra-tags": {
                      "db": "sub_type",
                      "yaml": "subType"
                    },
                    "x-order": 5,
                    "type": "string",
                    "description": "Connection Subtype (cloud, identity, metrics, chat, git, orchestration)"
                  },
                  "kind": {
                    "x-oapi-codegen-extra-tags": {
                      "db": "kind",
                      "yaml": "kind"
                    },
                    "x-order": 6,
                    "type": "string",
                    "description": "Connection Kind (meshery, kubernetes, prometheus, grafana, gke, aws, azure, slack, github)"
                  },
                  "metadata": {
                    "x-oapi-codegen-extra-tags": {
                      "db": "metadata",
                      "yaml": "metadata"
                    },
                    "x-order": 7,
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "type": "object",
                    "description": "Additional connection metadata"
                  },
                  "status": {
                    "x-oapi-codegen-extra-tags": {
                      "db": "status",
                      "yaml": "status"
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
                      "db": "user_id",
                      "yaml": "user_id"
                    },
                    "x-order": 9,
                    "description": "User ID who owns this connection",
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  },
                  "created_at": {
                    "x-oapi-codegen-extra-tags": {
                      "db": "created_at",
                      "yaml": "created_at"
                    },
                    "x-order": 10,
                    "type": "string",
                    "format": "date-time",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "updated_at": {
                    "x-oapi-codegen-extra-tags": {
                      "db": "updated_at",
                      "yaml": "updated_at"
                    },
                    "x-order": 11,
                    "type": "string",
                    "format": "date-time",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "deleted_at": {
                    "x-oapi-codegen-extra-tags": {
                      "db": "deleted_at",
                      "yaml": "deleted_at"
                    },
                    "x-order": 12,
                    "description": "SQL null Timestamp to handle null values of time.",
                    "x-go-type": "meshcore.NullTime",
                    "x-go-type-import": {
                      "name": "meshcore",
                      "path": "github.com/meshery/schemas/models/core"
                    },
                    "type": "string",
                    "format": "date-time",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "environments": {
                    "type": "array",
                    "description": "Associated environments for this connection",
                    "items": {
                      "x-go-type": "*environmentv1beta1.Environment",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta1/environment",
                        "name": "environmentv1beta1"
                      },
                      "$id": "https://schemas.meshery.io/environment.yaml",
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "title": "Environment",
                      "description": "Environments allow you to logically group related Connections and their associated Credentials. Learn more at https://docs.meshery.io/concepts/logical/environments",
                      "additionalProperties": false,
                      "type": "object",
                      "example": {
                        "id": "00000000-0000-0000-0000-000000000000",
                        "schemaVersion": "environments.meshery.io/v1beta1",
                        "name": "Production Environment",
                        "description": "Connections and credentials for the production cluster.",
                        "organization_id": "00000000-0000-0000-0000-000000000000",
                        "owner": "00000000-0000-0000-0000-000000000000",
                        "created_at": "0001-01-01T00:00:00Z",
                        "metadata": {},
                        "updated_at": "0001-01-01T00:00:00Z",
                        "deleted_at": null
                      },
                      "required": [
                        "id",
                        "schemaVersion",
                        "name",
                        "description",
                        "organization_id"
                      ],
                      "properties": {
                        "id": {
                          "description": "ID",
                          "x-order": 1,
                          "x-go-name": "ID",
                          "x-oapi-codegen-extra-tags": {
                            "db": "id",
                            "yaml": "id"
                          },
                          "type": "string",
                          "format": "uuid",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          }
                        },
                        "schemaVersion": {
                          "description": "Specifies the version of the schema to which the environment conforms.",
                          "x-order": 2,
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "schemaVersion",
                            "db": "-",
                            "gorm": "-"
                          },
                          "default": "environments.meshery.io/v1beta1",
                          "type": "string",
                          "minLength": 2,
                          "maxLength": 100,
                          "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                          "example": [
                            "v1",
                            "v1alpha1",
                            "v2beta3",
                            "v1.custom-suffix",
                            "models.meshery.io/v1beta1",
                            "capability.meshery.io/v1alpha1"
                          ]
                        },
                        "name": {
                          "x-oapi-codegen-extra-tags": {
                            "db": "name",
                            "yaml": "name"
                          },
                          "x-order": 3,
                          "type": "string",
                          "maxLength": 100,
                          "description": "Environment name"
                        },
                        "description": {
                          "x-oapi-codegen-extra-tags": {
                            "db": "description",
                            "yaml": "description"
                          },
                          "x-order": 4,
                          "type": "string",
                          "maxLength": 1000,
                          "description": "Environment description"
                        },
                        "organization_id": {
                          "x-go-name": "OrganizationID",
                          "x-oapi-codegen-extra-tags": {
                            "db": "organization_id",
                            "yaml": "organization_id"
                          },
                          "x-order": 5,
                          "description": "Environment organization ID",
                          "type": "string",
                          "format": "uuid",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          }
                        },
                        "owner": {
                          "x-oapi-codegen-extra-tags": {
                            "db": "owner",
                            "yaml": "owner"
                          },
                          "x-order": 6,
                          "description": "Environment owner",
                          "type": "string",
                          "format": "uuid",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          }
                        },
                        "created_at": {
                          "x-order": 7,
                          "description": "Timestamp when the resource was created.",
                          "x-go-type": "time.Time",
                          "type": "string",
                          "format": "date-time",
                          "x-go-name": "CreatedAt",
                          "x-oapi-codegen-extra-tags": {
                            "db": "created_at",
                            "yaml": "created_at"
                          },
                          "x-go-type-skip-optional-pointer": true
                        },
                        "metadata": {
                          "description": "Additional metadata associated with the environment.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "metadata",
                            "yaml": "metadata"
                          },
                          "x-order": 8,
                          "x-go-type": "core.Map",
                          "x-go-type-skip-optional-pointer": true,
                          "type": "object"
                        },
                        "updated_at": {
                          "x-order": 9,
                          "description": "Timestamp when the resource was updated.",
                          "x-go-type": "time.Time",
                          "type": "string",
                          "format": "date-time",
                          "x-go-name": "UpdatedAt",
                          "x-oapi-codegen-extra-tags": {
                            "db": "updated_at",
                            "yaml": "updated_at"
                          },
                          "x-go-type-skip-optional-pointer": true
                        },
                        "deleted_at": {
                          "description": "Timestamp when the environment was soft deleted. Null while the environment remains active.",
                          "nullable": true,
                          "x-oapi-codegen-extra-tags": {
                            "db": "deleted_at",
                            "yaml": "deleted_at"
                          },
                          "x-go-type": "core.NullTime",
                          "x-go-import": "database/sql",
                          "x-order": 10,
                          "x-go-type-import": {
                            "name": "meshcore",
                            "path": "github.com/meshery/schemas/models/core"
                          },
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        }
                      }
                    },
                    "x-oapi-codegen-extra-tags": {
                      "db": "-",
                      "yaml": "environments",
                      "gorm": "-"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-order": 13
                  },
                  "schemaVersion": {
                    "description": "Specifies the version of the schema used for the definition.",
                    "x-order": 14,
                    "x-oapi-codegen-extra-tags": {
                      "yaml": "schemaVersion",
                      "db": "-",
                      "gorm": "-"
                    },
                    "default": "connections.meshery.io/v1beta1",
                    "type": "string",
                    "minLength": 2,
                    "maxLength": 100,
                    "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                    "example": [
                      "v1",
                      "v1alpha1",
                      "v2beta3",
                      "v1.custom-suffix",
                      "models.meshery.io/v1beta1",
                      "capability.meshery.io/v1alpha1"
                    ]
                  }
                }
              },
              "registrantId": {
                "description": "ID of the registrant.",
                "x-oapi-codegen-extra-tags": {
                  "yaml": "connection_id",
                  "json": "connection_id",
                  "gorm": "column:connection_id"
                },
                "x-order": 8,
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
                  "yaml": "-",
                  "json": "-",
                  "gorm": "categoryID"
                },
                "x-order": 8,
                "type": "string",
                "format": "uuid",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                }
              },
              "category": {
                "x-order": 9,
                "x-oapi-codegen-extra-tags": {
                  "yaml": "category",
                  "json": "category",
                  "gorm": "foreignKey:CategoryId;references:ID"
                },
                "x-go-type": "categoryv1beta1.CategoryDefinition",
                "x-go-type-import": {
                  "path": "github.com/meshery/schemas/models/v1beta1/category",
                  "name": "categoryv1beta1"
                },
                "$id": "https://schemas.meshery.io/category.yaml",
                "$schema": "http://json-schema.org/draft-07/schema#",
                "type": "object",
                "additionalProperties": false,
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
                    "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
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
                    "description": "Additional metadata associated with the category.",
                    "type": "object",
                    "x-oapi-codegen-extra-tags": {
                      "yaml": "metadata,omitempty",
                      "json": "metadata,omitempty",
                      "gorm": "type:bytes;serializer:json"
                    },
                    "x-order": 3
                  }
                }
              },
              "subCategory": {
                "x-order": 10,
                "x-go-type": "subcategoryv1beta1.SubCategoryDefinition",
                "x-go-type-import": {
                  "path": "github.com/meshery/schemas/models/v1beta1/subcategory",
                  "name": "subcategoryv1beta1"
                },
                "$id": "https://schemas.meshery.io/category.yaml",
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
                      "x-go-type": "capabilityv1alpha1.Capability",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1alpha1/capability",
                        "name": "capabilityv1alpha1"
                      },
                      "$id": "https://schemas.meshery.io/capability.yaml",
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
                          "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                          "example": [
                            "v1",
                            "v1alpha1",
                            "v2beta3",
                            "v1.custom-suffix",
                            "models.meshery.io/v1beta1",
                            "capability.meshery.io/v1alpha1"
                          ]
                        },
                        "version": {
                          "description": "Version of the capability definition.",
                          "type": "string",
                          "minLength": 5,
                          "maxLength": 100,
                          "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                        },
                        "displayName": {
                          "description": "Name of the capability in human-readible format.",
                          "type": "string",
                          "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
                        },
                        "description": {
                          "type": "string",
                          "description": "A written representation of the purpose and characteristics of the capability.",
                          "maxLength": 5000
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
                          "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
                        },
                        "type": {
                          "description": "Classification of capabilities. Used to group capabilities similar in nature.",
                          "type": "string",
                          "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
                        },
                        "subType": {
                          "description": "Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Capability.",
                          "type": "string",
                          "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
                        },
                        "key": {
                          "description": "Key that backs the capability.",
                          "type": "string",
                          "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
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
                            "description": "A string starting with an alphanumeric character. Spaces and hyphens allowed."
                          }
                        },
                        "status": {
                          "type": "string",
                          "description": "Status of the capability",
                          "default": "enabled",
                          "enum": [
                            "enabled",
                            "disabled"
                          ]
                        },
                        "metadata": {
                          "type": "object",
                          "description": "Metadata contains additional information associated with the capability. Extension point.",
                          "additionalProperties": true
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
                          "schemaVersion": "capability.meshery.io/v1beta1",
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
                          "schemaVersion": "capability.meshery.io/v1beta1",
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
                          "schemaVersion": "capability.meshery.io/v1beta1",
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
                          "schemaVersion": "capability.meshery.io/v1beta1",
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
                  }
                },
                "x-oapi-codegen-extra-tags": {
                  "gorm": "type:bytes;serializer:json",
                  "json": "metadata",
                  "yaml": "metadata"
                },
                "x-order": 11,
                "additionalProperties": true
              },
              "model": {
                "x-oapi-codegen-extra-tags": {
                  "gorm": "type:bytes;serializer:json"
                },
                "x-order": 12,
                "type": "object",
                "description": "Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31).",
                "required": [
                  "version"
                ],
                "properties": {
                  "version": {
                    "description": "Version of the model as defined by the registrant.",
                    "x-oapi-codegen-extra-tags": {
                      "json": "version"
                    },
                    "x-order": 1,
                    "type": "string",
                    "minLength": 5,
                    "maxLength": 100,
                    "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
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
                "description": "The relationships of the model."
              },
              "components": {
                "type": "array",
                "x-go-type": "interface{}",
                "x-oapi-codegen-extra-tags": {
                  "gorm": "-",
                  "json": "components",
                  "yaml": "components"
                },
                "description": "The components of the model."
              },
              "componentsCount": {
                "type": "integer",
                "description": "Number of components associated with the model.",
                "x-order": 13,
                "x-oapi-codegen-extra-tags": {
                  "json": "components_count",
                  "yaml": "components_count",
                  "gorm": "-"
                },
                "default": 0,
                "minimum": 0
              },
              "relationshipsCount": {
                "type": "integer",
                "description": "Number of relationships associated with the model.",
                "x-order": 13,
                "x-oapi-codegen-extra-tags": {
                  "gorm": "-",
                  "json": "relationships_count",
                  "yaml": "relationships_count"
                },
                "default": 0,
                "minimum": 0
              },
              "created_at": {
                "x-order": 14,
                "description": "Timestamp when the resource was created.",
                "x-go-type": "time.Time",
                "type": "string",
                "format": "date-time",
                "x-go-name": "CreatedAt",
                "x-oapi-codegen-extra-tags": {
                  "db": "created_at",
                  "yaml": "created_at"
                },
                "x-go-type-skip-optional-pointer": true
              },
              "updated_at": {
                "x-order": 15,
                "description": "Timestamp when the resource was updated.",
                "x-go-type": "time.Time",
                "type": "string",
                "format": "date-time",
                "x-go-name": "UpdatedAt",
                "x-oapi-codegen-extra-tags": {
                  "db": "updated_at",
                  "yaml": "updated_at"
                },
                "x-go-type-skip-optional-pointer": true
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
          "modelReference": {
            "x-go-type": "modelv1beta1.ModelReference",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/v1beta1/model",
              "name": "modelv1beta1"
            },
            "x-order": 8,
            "description": "Reference to the specific registered model to which the component belongs and from which model version, category, and other properties may be referenced. Learn more at https://docs.meshery.io/concepts/models",
            "x-oapi-codegen-extra-tags": {
              "gorm": "-"
            },
            "type": "object",
            "required": [
              "id",
              "name",
              "version",
              "displayName",
              "model",
              "registrant"
            ],
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                }
              },
              "name": {
                "type": "string",
                "description": "The unique name for the model within the scope of a registrant.",
                "pattern": "^[a-z0-9-]+$",
                "examples": [
                  "cert-manager"
                ]
              },
              "version": {
                "description": "Version of the model definition.",
                "type": "string",
                "minLength": 5,
                "maxLength": 100,
                "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
              },
              "displayName": {
                "type": "string",
                "description": "Human-readable name for the model.",
                "minLength": 1,
                "maxLength": 100,
                "pattern": "^[a-zA-Z0-9 ]+$",
                "examples": [
                  "Cert Manager"
                ]
              },
              "model": {
                "type": "object",
                "description": "Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31).",
                "required": [
                  "version"
                ],
                "properties": {
                  "version": {
                    "description": "Version of the model as defined by the registrant.",
                    "x-oapi-codegen-extra-tags": {
                      "json": "version"
                    },
                    "x-order": 1,
                    "type": "string",
                    "minLength": 5,
                    "maxLength": 100,
                    "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                  }
                }
              },
              "registrant": {
                "x-go-type": "RegistrantReference",
                "x-oapi-codegen-extra-tags": {
                  "json": "registrant"
                },
                "type": "object",
                "required": [
                  "kind"
                ],
                "properties": {
                  "kind": {
                    "type": "string",
                    "description": "Kind of the registrant.",
                    "maxLength": 255
                  }
                }
              }
            }
          },
          "modelId": {
            "description": "Foreign key to the model to which the component belongs. Populated by the ORM from the `model_id` column and suppressed on the JSON wire; consumers use the nested `model` object for wire-level access.",
            "x-go-name": "ModelID",
            "x-oapi-codegen-extra-tags": {
              "gorm": "column:model_id",
              "db": "model_id",
              "yaml": "-",
              "json": "-"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "metadata": {
            "x-oapi-codegen-extra-tags": {
              "db": "metadata"
            },
            "x-order": 9,
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core"
            },
            "x-go-type-skip-optional-pointer": true,
            "type": "object",
            "description": "Additional connection metadata"
          },
          "credentialSchema": {
            "x-oapi-codegen-extra-tags": {
              "db": "credential_schema"
            },
            "x-order": 9,
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core"
            },
            "x-go-type-skip-optional-pointer": true,
            "type": "object",
            "description": "Schema for the credential Associated with the connection"
          },
          "connectionSchema": {
            "x-oapi-codegen-extra-tags": {
              "db": "connection_schema"
            },
            "x-order": 9,
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core"
            },
            "x-go-type-skip-optional-pointer": true,
            "type": "object",
            "description": "Schema for the connection"
          },
          "styles": {
            "x-oapi-codegen-extra-tags": {
              "gorm": "type:bytes;serializer:json",
              "yaml": "styles",
              "json": "styles"
            },
            "x-go-type": "core.ComponentStyles",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-order": 17,
            "description": "Visualization styles for the connection, including svgColor and svgWhite used for UI representation.",
            "type": "object",
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
                    "description": "Primary color of the component used for UI representation.",
                    "maxLength": 500
                  },
                  "secondaryColor": {
                    "type": "string",
                    "description": "Secondary color of the entity used for UI representation.",
                    "maxLength": 500
                  },
                  "svgWhite": {
                    "type": "string",
                    "description": "White SVG of the entity used for UI representation on dark background.",
                    "maxLength": 500
                  },
                  "svgColor": {
                    "type": "string",
                    "description": "Colored SVG of the entity used for UI representation on light background.",
                    "maxLength": 500
                  },
                  "svgComplete": {
                    "type": "string",
                    "description": "Complete SVG of the entity used for UI representation, often inclusive of background.",
                    "maxLength": 500
                  },
                  "color": {
                    "type": "string",
                    "description": "The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 500
                  },
                  "textOpacity": {
                    "type": "number",
                    "description": "The opacity of the label text, including its outline.",
                    "minimum": 0,
                    "maximum": 1
                  },
                  "fontFamily": {
                    "type": "string",
                    "description": "A comma-separated list of font names to use on the label text.",
                    "maxLength": 500
                  },
                  "fontSize": {
                    "type": "string",
                    "description": "The size of the label text.",
                    "maxLength": 500
                  },
                  "fontStyle": {
                    "type": "string",
                    "description": "A CSS font style to be applied to the label text.",
                    "maxLength": 500
                  },
                  "fontWeight": {
                    "type": "string",
                    "description": "A CSS font weight to be applied to the label text.",
                    "maxLength": 500
                  },
                  "textTransform": {
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
                  "zIndex": {
                    "type": "integer",
                    "description": "An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index.",
                    "minimum": 0
                  },
                  "label": {
                    "type": "string",
                    "description": "The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id",
                    "maxLength": 500
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
                        "minimum": -1000000,
                        "maximum": 1000000,
                        "x-go-type": "float64"
                      },
                      "y": {
                        "type": "number",
                        "description": "The y-coordinate of the node.",
                        "minimum": -1000000,
                        "maximum": 1000000,
                        "x-go-type": "float64"
                      }
                    }
                  },
                  "bodyText": {
                    "type": "string",
                    "description": "The text to display for an element's body. Can give a path, e.g. data(id) will label with the elements id",
                    "maxLength": 500
                  },
                  "bodyTextWrap": {
                    "type": "string",
                    "description": "How to wrap the text in the node. Can be 'none', 'wrap', or 'ellipsis'.",
                    "enum": [
                      "none",
                      "wrap",
                      "ellipsis"
                    ]
                  },
                  "bodyTextMaxWidth": {
                    "type": "string",
                    "description": "The maximum width for wrapping text in the node.",
                    "maxLength": 50
                  },
                  "bodyTextOpacity": {
                    "type": "number",
                    "description": "The opacity of the node's body text, including its outline.",
                    "minimum": 0,
                    "maximum": 1
                  },
                  "bodyTextBackgroundColor": {
                    "type": "string",
                    "description": "The colour of the node's body text background. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "bodyTextFontSize": {
                    "type": "number",
                    "description": "The size of the node's body text.",
                    "minimum": 0
                  },
                  "bodyTextColor": {
                    "type": "string",
                    "description": "The colour of the node's body text. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "bodyTextFontWeight": {
                    "type": "string",
                    "description": "A CSS font weight to be applied to the node's body text.",
                    "maxLength": 50
                  },
                  "bodyTextHorizontalAlign": {
                    "type": "string",
                    "description": "A CSS horizontal alignment to be applied to the node's body text.",
                    "maxLength": 50
                  },
                  "bodyTextDecoration": {
                    "type": "string",
                    "description": "A CSS text decoration to be applied to the node's body text.",
                    "maxLength": 100
                  },
                  "bodyTextVerticalAlign": {
                    "type": "string",
                    "description": "A CSS vertical alignment to be applied to the node's body text.",
                    "maxLength": 50
                  },
                  "width": {
                    "type": "number",
                    "description": "The width of the node's body or the width of an edge's line.",
                    "minimum": 0
                  },
                  "height": {
                    "type": "number",
                    "description": "The height of the node's body",
                    "minimum": 0
                  },
                  "backgroundImage": {
                    "type": "string",
                    "format": "uri",
                    "description": "The URL that points to the image to show in the node.",
                    "maxLength": 2048
                  },
                  "backgroundColor": {
                    "type": "string",
                    "description": "The colour of the node's body. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "backgroundBlacken": {
                    "type": "number",
                    "description": "Blackens the node's body for values from 0 to 1; whitens the node's body for values from 0 to -1.",
                    "maximum": 1,
                    "minimum": -1
                  },
                  "backgroundOpacity": {
                    "type": "number",
                    "description": "The opacity level of the node's background colour",
                    "maximum": 1,
                    "minimum": 0
                  },
                  "backgroundPositionX": {
                    "type": "string",
                    "description": "The x position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                    "maxLength": 50
                  },
                  "backgroundPositionY": {
                    "type": "string",
                    "description": "The y position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                    "maxLength": 50
                  },
                  "backgroundOffsetX": {
                    "type": "string",
                    "description": "The x offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                    "maxLength": 50
                  },
                  "backgroundOffsetY": {
                    "type": "string",
                    "description": "The y offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                    "maxLength": 50
                  },
                  "backgroundFit": {
                    "type": "string",
                    "description": "How the background image is fit to the node. Can be 'none', 'contain', or 'cover'.",
                    "enum": [
                      "none",
                      "contain",
                      "cover"
                    ]
                  },
                  "backgroundClip": {
                    "type": "string",
                    "description": "How the background image is clipped to the node. Can be 'none', 'node', or 'node-border'.",
                    "enum": [
                      "none",
                      "node",
                      "node-border"
                    ]
                  },
                  "backgroundWidthRelativeTo": {
                    "type": "string",
                    "description": "How the background image's width is determined. Can be 'none', 'inner', or 'outer'.",
                    "enum": [
                      "none",
                      "inner",
                      "outer"
                    ]
                  },
                  "backgroundHeightRelativeTo": {
                    "type": "string",
                    "description": "How the background image's height is determined. Can be 'none', 'inner', or 'outer'.",
                    "enum": [
                      "none",
                      "inner",
                      "outer"
                    ]
                  },
                  "borderWidth": {
                    "type": "number",
                    "description": "The size of the node's border.",
                    "minimum": 0
                  },
                  "borderStyle": {
                    "type": "string",
                    "description": "The style of the node's border",
                    "enum": [
                      "solid",
                      "dotted",
                      "dashed",
                      "double"
                    ]
                  },
                  "borderColor": {
                    "type": "string",
                    "description": "The colour of the node's border. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "borderOpacity": {
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
                  "textHalign": {
                    "type": "string",
                    "description": "The horizontal alignment of a node's label",
                    "enum": [
                      "left",
                      "center",
                      "right"
                    ]
                  },
                  "textValign": {
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
                  "activeBgColor": {
                    "type": "string",
                    "description": "The colour of the indicator shown when the background is grabbed by the user. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "activeBgOpacity": {
                    "type": "string",
                    "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                    "maxLength": 50
                  },
                  "activeBgSize": {
                    "type": "string",
                    "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                    "maxLength": 50
                  },
                  "selectionBoxColor": {
                    "type": "string",
                    "description": "The background colour of the selection box used for drag selection. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "selectionBoxBorderWidth": {
                    "type": "number",
                    "description": "The size of the border on the selection box. Selector needs to be *core*",
                    "minimum": 0
                  },
                  "selectionBoxOpacity": {
                    "type": "number",
                    "description": "The opacity of the selection box. Selector needs to be *core*",
                    "minimum": 0,
                    "maximum": 1
                  },
                  "outsideTextureBgColor": {
                    "type": "string",
                    "description": "The colour of the area outside the viewport texture when initOptions.textureOnViewport === true. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "outsideTextureBgOpacity": {
                    "type": "number",
                    "description": "The opacity of the area outside the viewport texture. Selector needs to be *core*",
                    "minimum": 0,
                    "maximum": 1
                  },
                  "shapePolygonPoints": {
                    "type": "string",
                    "description": "An array (or a space-separated string) of numbers ranging on [-1, 1], representing alternating x and y values (i.e. x1 y1 x2 y2, x3 y3 ...). This represents the points in the polygon for the node's shape. The bounding box of the node is given by (-1, -1), (1, -1), (1, 1), (-1, 1). The node's position is the origin (0, 0 )",
                    "maxLength": 2000
                  },
                  "menuBackgroundColor": {
                    "type": "string",
                    "description": "The colour of the background of the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "menuBackgroundOpacity": {
                    "type": "number",
                    "description": "The opacity of the background of the component menu.",
                    "minimum": 0,
                    "maximum": 1
                  },
                  "menuForgroundColor": {
                    "type": "string",
                    "description": "The colour of the text or icons in the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  }
                }
              }
            ]
          },
          "status": {
            "x-oapi-codegen-extra-tags": {
              "db": "status"
            },
            "x-order": 10,
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
          "transitionMap": {
            "type": "object",
            "description": "Map describing the connection state machine. Each key is a current connection status and its value is the list of states the connection may transition to from that status, along with a description of each transition.",
            "additionalProperties": {
              "type": "array",
              "items": {
                "type": "object",
                "additionalProperties": false,
                "description": "A single permissible state transition for a connection, describing the next reachable state and the meaning of that transition.",
                "required": [
                  "nextState"
                ],
                "properties": {
                  "nextState": {
                    "type": "string",
                    "description": "Connection Status Value",
                    "x-go-name": "ConnectionStatusValue",
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
                    "x-order": 1
                  },
                  "description": {
                    "type": "string",
                    "description": "Human-readable explanation of when or why this transition occurs.",
                    "maxLength": 1000,
                    "x-oapi-codegen-extra-tags": {
                      "json": "description,omitempty"
                    },
                    "x-order": 2
                  }
                }
              }
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "gorm": "type:bytes;serializer:json",
              "json": "transitionMap,omitempty"
            },
            "x-order": 18
          },
          "userId": {
            "x-go-name": "UserID",
            "x-oapi-codegen-extra-tags": {
              "db": "user_id",
              "json": "userId"
            },
            "x-order": 11,
            "description": "User ID who owns this connection",
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "createdAt": {
            "description": "Timestamp when the connection was created.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at",
              "json": "createdAt"
            },
            "x-order": 12,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp when the connection was last updated.",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at",
              "json": "updatedAt"
            },
            "x-order": 13,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deletedAt": {
            "description": "Timestamp when the connection was soft-deleted, if applicable.",
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at",
              "json": "deletedAt"
            },
            "x-order": 14,
            "x-go-type": "meshcore.NullTime",
            "x-go-type-import": {
              "name": "meshcore",
              "path": "github.com/meshery/schemas/models/core"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "environments": {
            "type": "array",
            "description": "Associated environments for this connection",
            "items": {
              "x-go-type": "*environmentv1beta3.Environment",
              "x-go-type-import": {
                "path": "github.com/meshery/schemas/models/v1beta3/environment",
                "name": "environmentv1beta3"
              },
              "$id": "https://schemas.meshery.io/environment.yaml",
              "$schema": "http://json-schema.org/draft-07/schema#",
              "title": "Environment",
              "description": "Environments allow you to logically group related Connections and their associated Credentials. Learn more at https://docs.meshery.io/concepts/logical/environments",
              "additionalProperties": false,
              "type": "object",
              "example": {
                "id": "00000000-0000-0000-0000-000000000000",
                "schemaVersion": "environments.meshery.io/v1beta3",
                "name": "Production Environment",
                "description": "Connections and credentials for the production cluster.",
                "organizationId": "00000000-0000-0000-0000-000000000000",
                "owner": "00000000-0000-0000-0000-000000000000",
                "createdAt": "0001-01-01T00:00:00Z",
                "metadata": {},
                "updatedAt": "0001-01-01T00:00:00Z",
                "deletedAt": null
              },
              "required": [
                "id",
                "schemaVersion",
                "name",
                "description",
                "organizationId"
              ],
              "properties": {
                "id": {
                  "description": "ID",
                  "x-order": 1,
                  "x-go-name": "ID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "id",
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
                  "description": "Specifies the version of the schema to which the environment conforms.",
                  "x-order": 2,
                  "x-oapi-codegen-extra-tags": {
                    "json": "schemaVersion",
                    "db": "-",
                    "gorm": "-"
                  },
                  "default": "environments.meshery.io/v1beta3",
                  "type": "string",
                  "minLength": 2,
                  "maxLength": 100,
                  "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                  "example": [
                    "v1",
                    "v1alpha1",
                    "v2beta3",
                    "v1.custom-suffix",
                    "models.meshery.io/v1beta1",
                    "capability.meshery.io/v1alpha1"
                  ]
                },
                "name": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "name",
                    "json": "name"
                  },
                  "x-order": 3,
                  "type": "string",
                  "maxLength": 100,
                  "description": "Environment name"
                },
                "description": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "description",
                    "json": "description"
                  },
                  "x-order": 4,
                  "type": "string",
                  "maxLength": 1000,
                  "description": "Environment description"
                },
                "organizationId": {
                  "x-go-name": "OrganizationID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "organization_id",
                    "json": "organizationId"
                  },
                  "x-order": 5,
                  "description": "Environment organization ID",
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "owner": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "owner",
                    "json": "owner"
                  },
                  "x-order": 6,
                  "description": "Environment owner",
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "createdAt": {
                  "description": "Timestamp when the environment was created.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at",
                    "yaml": "created_at",
                    "json": "createdAt"
                  },
                  "x-order": 7,
                  "x-go-type": "time.Time",
                  "type": "string",
                  "format": "date-time",
                  "x-go-name": "CreatedAt",
                  "x-go-type-skip-optional-pointer": true
                },
                "metadata": {
                  "description": "Additional metadata associated with the environment.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "metadata",
                    "json": "metadata"
                  },
                  "x-order": 8,
                  "x-go-type": "core.Map",
                  "x-go-type-skip-optional-pointer": true,
                  "type": "object"
                },
                "updatedAt": {
                  "description": "Timestamp when the environment was last updated.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at",
                    "yaml": "updated_at",
                    "json": "updatedAt"
                  },
                  "x-order": 9,
                  "x-go-type": "time.Time",
                  "type": "string",
                  "format": "date-time",
                  "x-go-name": "UpdatedAt",
                  "x-go-type-skip-optional-pointer": true
                },
                "deletedAt": {
                  "description": "Timestamp when the environment was soft deleted. Null while the environment remains active.",
                  "nullable": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "deleted_at",
                    "json": "deletedAt"
                  },
                  "x-go-type": "core.NullTime",
                  "x-go-import": "database/sql",
                  "x-order": 10,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                }
              }
            },
            "x-oapi-codegen-extra-tags": {
              "db": "-",
              "gorm": "-"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-order": 15
          },
          "schemaVersion": {
            "description": "Specifies the version of the schema used for the definition.",
            "x-order": 16,
            "x-oapi-codegen-extra-tags": {
              "db": "-",
              "gorm": "-"
            },
            "default": "connections.meshery.io/v1beta3",
            "type": "string",
            "minLength": 2,
            "maxLength": 100,
            "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
            "example": [
              "v1",
              "v1alpha1",
              "v2beta3",
              "v1.custom-suffix",
              "models.meshery.io/v1beta1",
              "capability.meshery.io/v1alpha1"
            ]
          }
        }
      },
      "ConnectionDefinition": {
        "description": "A connection definition is an uninitialized connection, authored per-model (in a model's `connections/` folder) and registered into the registry alongside components and relationships. It conforms to the connection schema; the dynamic, kind-specific shape is carried in `metadata`. The `model` association scopes the definition to its owning model.",
        "x-go-type": "Connection"
      },
      "ConnectionDefinitionPage": {
        "description": "Represents a page of connection definitions with meta information about the total count",
        "additionalProperties": false,
        "type": "object",
        "required": [
          "connectionDefinitions",
          "totalCount",
          "page",
          "pageSize"
        ],
        "properties": {
          "connectionDefinitions": {
            "type": "array",
            "description": "List of connection definitions on this page",
            "x-go-type": "[]*ConnectionDefinition",
            "items": {
              "description": "A connection definition is an uninitialized connection, authored per-model (in a model's `connections/` folder) and registered into the registry alongside components and relationships. It conforms to the connection schema; the dynamic, kind-specific shape is carried in `metadata`. The `model` association scopes the definition to its owning model.",
              "x-go-type": "Connection"
            },
            "x-order": 1
          },
          "totalCount": {
            "type": "integer",
            "description": "Total number of connection definitions on all pages",
            "x-oapi-codegen-extra-tags": {
              "json": "totalCount"
            },
            "x-order": 2,
            "minimum": 0
          },
          "page": {
            "type": "integer",
            "description": "Current page number",
            "x-order": 3,
            "minimum": 0
          },
          "pageSize": {
            "type": "integer",
            "description": "Number of elements per page",
            "x-oapi-codegen-extra-tags": {
              "json": "pageSize"
            },
            "x-order": 4,
            "minimum": 1
          }
        }
      },
      "ConnectionPage": {
        "description": "Represents a page of connections with meta information about connections count",
        "additionalProperties": false,
        "type": "object",
        "required": [
          "connections",
          "totalCount",
          "page",
          "pageSize"
        ],
        "properties": {
          "connections": {
            "type": "array",
            "description": "List of connections on this page",
            "x-go-type": "[]*Connection",
            "items": {
              "$id": "https://schemas.meshery.io/connection.yaml",
              "$schema": "http://json-schema.org/draft-07/schema#",
              "description": "Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections",
              "additionalProperties": false,
              "type": "object",
              "required": [
                "id",
                "schemaVersion",
                "name",
                "type",
                "subType",
                "kind",
                "status"
              ],
              "properties": {
                "id": {
                  "description": "Connection ID",
                  "x-order": 1,
                  "x-go-name": "ID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "id"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "name": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "name"
                  },
                  "x-order": 2,
                  "type": "string",
                  "description": "Connection Name",
                  "minLength": 1,
                  "maxLength": 255
                },
                "description": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "description",
                    "json": "description"
                  },
                  "x-order": 3,
                  "type": "string",
                  "description": "Human-readable description of the connection and its purpose.",
                  "maxLength": 1000
                },
                "url": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "url",
                    "json": "url"
                  },
                  "x-order": 4,
                  "type": "string",
                  "format": "uri",
                  "description": "URL of the remote resource this connection points to (e.g. the Helm repository URL, the Kubernetes API server endpoint, the Grafana instance URL).",
                  "maxLength": 2048
                },
                "credentialId": {
                  "x-go-name": "CredentialID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "credential_id",
                    "json": "credentialId"
                  },
                  "x-order": 5,
                  "description": "Associated Credential ID",
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
                    "json": "type",
                    "yaml": "type"
                  },
                  "x-go-name": "ConnectionType",
                  "x-order": 6,
                  "type": "string",
                  "description": "Connection Type (platform, telemetry, collaboration)",
                  "maxLength": 255
                },
                "subType": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "sub_type",
                    "json": "subType"
                  },
                  "x-order": 7,
                  "type": "string",
                  "description": "Connection Subtype (cloud, identity, metrics, chat, git, orchestration)",
                  "maxLength": 255
                },
                "kind": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "kind"
                  },
                  "x-order": 8,
                  "type": "string",
                  "description": "Connection Kind (meshery, kubernetes, prometheus, grafana, gke, aws, azure, slack, github)",
                  "maxLength": 255
                },
                "model": {
                  "x-go-type": "*modelv1beta1.ModelDefinition",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/v1beta1/model",
                    "name": "modelv1beta1"
                  },
                  "x-order": 7,
                  "description": "Reference to the specific registered model to which the component belongs and from which model version, category, and other properties may be referenced. Learn more at https://docs.meshery.io/concepts/models",
                  "x-oapi-codegen-extra-tags": {
                    "gorm": "foreignKey:ModelID;references:ID",
                    "json": "model",
                    "yaml": "model"
                  },
                  "$id": "https://schemas.meshery.io/model.yaml",
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
                      "default": "models.meshery.io/v1beta1",
                      "type": "string",
                      "minLength": 2,
                      "maxLength": 100,
                      "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                      "example": [
                        "v1",
                        "v1alpha1",
                        "v2beta3",
                        "v1.custom-suffix",
                        "models.meshery.io/v1beta1",
                        "capability.meshery.io/v1alpha1"
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
                      },
                      "default": "untitled-model"
                    },
                    "displayName": {
                      "description": "Human-readable name for the model.",
                      "helperText": "Model display name may include letters, numbers, and spaces. Special characters are not allowed.",
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
                        "yaml": "description,omitempty",
                        "json": "description,omitempty"
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
                        "gorm": "foreignKey:RegistrantId;references:ID"
                      },
                      "x-order": 8,
                      "x-go-type": "connectionv1beta1.Connection",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta1/connection",
                        "name": "connectionv1beta1"
                      },
                      "$id": "https://schemas.meshery.io/connection.yaml",
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "description": "Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections",
                      "additionalProperties": false,
                      "type": "object",
                      "required": [
                        "id",
                        "schemaVersion",
                        "name",
                        "type",
                        "subType",
                        "kind",
                        "status"
                      ],
                      "properties": {
                        "id": {
                          "description": "Connection ID",
                          "x-order": 1,
                          "x-go-name": "ID",
                          "x-oapi-codegen-extra-tags": {
                            "db": "id",
                            "yaml": "id"
                          },
                          "type": "string",
                          "format": "uuid",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          }
                        },
                        "name": {
                          "x-oapi-codegen-extra-tags": {
                            "db": "name",
                            "yaml": "name"
                          },
                          "x-order": 2,
                          "type": "string",
                          "description": "Connection Name"
                        },
                        "credentialId": {
                          "x-go-name": "CredentialID",
                          "x-oapi-codegen-extra-tags": {
                            "db": "credential_id",
                            "yaml": "credentialId"
                          },
                          "x-order": 3,
                          "description": "Associated Credential ID",
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
                            "yaml": "type"
                          },
                          "x-order": 4,
                          "type": "string",
                          "description": "Connection Type (platform, telemetry, collaboration)"
                        },
                        "subType": {
                          "x-oapi-codegen-extra-tags": {
                            "db": "sub_type",
                            "yaml": "subType"
                          },
                          "x-order": 5,
                          "type": "string",
                          "description": "Connection Subtype (cloud, identity, metrics, chat, git, orchestration)"
                        },
                        "kind": {
                          "x-oapi-codegen-extra-tags": {
                            "db": "kind",
                            "yaml": "kind"
                          },
                          "x-order": 6,
                          "type": "string",
                          "description": "Connection Kind (meshery, kubernetes, prometheus, grafana, gke, aws, azure, slack, github)"
                        },
                        "metadata": {
                          "x-oapi-codegen-extra-tags": {
                            "db": "metadata",
                            "yaml": "metadata"
                          },
                          "x-order": 7,
                          "x-go-type": "core.Map",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core"
                          },
                          "x-go-type-skip-optional-pointer": true,
                          "type": "object",
                          "description": "Additional connection metadata"
                        },
                        "status": {
                          "x-oapi-codegen-extra-tags": {
                            "db": "status",
                            "yaml": "status"
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
                            "db": "user_id",
                            "yaml": "user_id"
                          },
                          "x-order": 9,
                          "description": "User ID who owns this connection",
                          "type": "string",
                          "format": "uuid",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          }
                        },
                        "created_at": {
                          "x-oapi-codegen-extra-tags": {
                            "db": "created_at",
                            "yaml": "created_at"
                          },
                          "x-order": 10,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "updated_at": {
                          "x-oapi-codegen-extra-tags": {
                            "db": "updated_at",
                            "yaml": "updated_at"
                          },
                          "x-order": 11,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "deleted_at": {
                          "x-oapi-codegen-extra-tags": {
                            "db": "deleted_at",
                            "yaml": "deleted_at"
                          },
                          "x-order": 12,
                          "description": "SQL null Timestamp to handle null values of time.",
                          "x-go-type": "meshcore.NullTime",
                          "x-go-type-import": {
                            "name": "meshcore",
                            "path": "github.com/meshery/schemas/models/core"
                          },
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "environments": {
                          "type": "array",
                          "description": "Associated environments for this connection",
                          "items": {
                            "x-go-type": "*environmentv1beta1.Environment",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/v1beta1/environment",
                              "name": "environmentv1beta1"
                            },
                            "$id": "https://schemas.meshery.io/environment.yaml",
                            "$schema": "http://json-schema.org/draft-07/schema#",
                            "title": "Environment",
                            "description": "Environments allow you to logically group related Connections and their associated Credentials. Learn more at https://docs.meshery.io/concepts/logical/environments",
                            "additionalProperties": false,
                            "type": "object",
                            "example": {
                              "id": "00000000-0000-0000-0000-000000000000",
                              "schemaVersion": "environments.meshery.io/v1beta1",
                              "name": "Production Environment",
                              "description": "Connections and credentials for the production cluster.",
                              "organization_id": "00000000-0000-0000-0000-000000000000",
                              "owner": "00000000-0000-0000-0000-000000000000",
                              "created_at": "0001-01-01T00:00:00Z",
                              "metadata": {},
                              "updated_at": "0001-01-01T00:00:00Z",
                              "deleted_at": null
                            },
                            "required": [
                              "id",
                              "schemaVersion",
                              "name",
                              "description",
                              "organization_id"
                            ],
                            "properties": {
                              "id": {
                                "description": "ID",
                                "x-order": 1,
                                "x-go-name": "ID",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "id",
                                  "yaml": "id"
                                },
                                "type": "string",
                                "format": "uuid",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                }
                              },
                              "schemaVersion": {
                                "description": "Specifies the version of the schema to which the environment conforms.",
                                "x-order": 2,
                                "x-oapi-codegen-extra-tags": {
                                  "yaml": "schemaVersion",
                                  "db": "-",
                                  "gorm": "-"
                                },
                                "default": "environments.meshery.io/v1beta1",
                                "type": "string",
                                "minLength": 2,
                                "maxLength": 100,
                                "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                                "example": [
                                  "v1",
                                  "v1alpha1",
                                  "v2beta3",
                                  "v1.custom-suffix",
                                  "models.meshery.io/v1beta1",
                                  "capability.meshery.io/v1alpha1"
                                ]
                              },
                              "name": {
                                "x-oapi-codegen-extra-tags": {
                                  "db": "name",
                                  "yaml": "name"
                                },
                                "x-order": 3,
                                "type": "string",
                                "maxLength": 100,
                                "description": "Environment name"
                              },
                              "description": {
                                "x-oapi-codegen-extra-tags": {
                                  "db": "description",
                                  "yaml": "description"
                                },
                                "x-order": 4,
                                "type": "string",
                                "maxLength": 1000,
                                "description": "Environment description"
                              },
                              "organization_id": {
                                "x-go-name": "OrganizationID",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "organization_id",
                                  "yaml": "organization_id"
                                },
                                "x-order": 5,
                                "description": "Environment organization ID",
                                "type": "string",
                                "format": "uuid",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                }
                              },
                              "owner": {
                                "x-oapi-codegen-extra-tags": {
                                  "db": "owner",
                                  "yaml": "owner"
                                },
                                "x-order": 6,
                                "description": "Environment owner",
                                "type": "string",
                                "format": "uuid",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                }
                              },
                              "created_at": {
                                "x-order": 7,
                                "description": "Timestamp when the resource was created.",
                                "x-go-type": "time.Time",
                                "type": "string",
                                "format": "date-time",
                                "x-go-name": "CreatedAt",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "created_at",
                                  "yaml": "created_at"
                                },
                                "x-go-type-skip-optional-pointer": true
                              },
                              "metadata": {
                                "description": "Additional metadata associated with the environment.",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "metadata",
                                  "yaml": "metadata"
                                },
                                "x-order": 8,
                                "x-go-type": "core.Map",
                                "x-go-type-skip-optional-pointer": true,
                                "type": "object"
                              },
                              "updated_at": {
                                "x-order": 9,
                                "description": "Timestamp when the resource was updated.",
                                "x-go-type": "time.Time",
                                "type": "string",
                                "format": "date-time",
                                "x-go-name": "UpdatedAt",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "updated_at",
                                  "yaml": "updated_at"
                                },
                                "x-go-type-skip-optional-pointer": true
                              },
                              "deleted_at": {
                                "description": "Timestamp when the environment was soft deleted. Null while the environment remains active.",
                                "nullable": true,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "deleted_at",
                                  "yaml": "deleted_at"
                                },
                                "x-go-type": "core.NullTime",
                                "x-go-import": "database/sql",
                                "x-order": 10,
                                "x-go-type-import": {
                                  "name": "meshcore",
                                  "path": "github.com/meshery/schemas/models/core"
                                },
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              }
                            }
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "-",
                            "yaml": "environments",
                            "gorm": "-"
                          },
                          "x-go-type-skip-optional-pointer": true,
                          "x-order": 13
                        },
                        "schemaVersion": {
                          "description": "Specifies the version of the schema used for the definition.",
                          "x-order": 14,
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "schemaVersion",
                            "db": "-",
                            "gorm": "-"
                          },
                          "default": "connections.meshery.io/v1beta1",
                          "type": "string",
                          "minLength": 2,
                          "maxLength": 100,
                          "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                          "example": [
                            "v1",
                            "v1alpha1",
                            "v2beta3",
                            "v1.custom-suffix",
                            "models.meshery.io/v1beta1",
                            "capability.meshery.io/v1alpha1"
                          ]
                        }
                      }
                    },
                    "registrantId": {
                      "description": "ID of the registrant.",
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "connection_id",
                        "json": "connection_id",
                        "gorm": "column:connection_id"
                      },
                      "x-order": 8,
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
                        "yaml": "-",
                        "json": "-",
                        "gorm": "categoryID"
                      },
                      "x-order": 8,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "category": {
                      "x-order": 9,
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "category",
                        "json": "category",
                        "gorm": "foreignKey:CategoryId;references:ID"
                      },
                      "x-go-type": "categoryv1beta1.CategoryDefinition",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta1/category",
                        "name": "categoryv1beta1"
                      },
                      "$id": "https://schemas.meshery.io/category.yaml",
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "type": "object",
                      "additionalProperties": false,
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
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
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
                          "description": "Additional metadata associated with the category.",
                          "type": "object",
                          "x-oapi-codegen-extra-tags": {
                            "yaml": "metadata,omitempty",
                            "json": "metadata,omitempty",
                            "gorm": "type:bytes;serializer:json"
                          },
                          "x-order": 3
                        }
                      }
                    },
                    "subCategory": {
                      "x-order": 10,
                      "x-go-type": "subcategoryv1beta1.SubCategoryDefinition",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta1/subcategory",
                        "name": "subcategoryv1beta1"
                      },
                      "$id": "https://schemas.meshery.io/category.yaml",
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
                            "x-go-type": "capabilityv1alpha1.Capability",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/v1alpha1/capability",
                              "name": "capabilityv1alpha1"
                            },
                            "$id": "https://schemas.meshery.io/capability.yaml",
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
                                "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                                "example": [
                                  "v1",
                                  "v1alpha1",
                                  "v2beta3",
                                  "v1.custom-suffix",
                                  "models.meshery.io/v1beta1",
                                  "capability.meshery.io/v1alpha1"
                                ]
                              },
                              "version": {
                                "description": "Version of the capability definition.",
                                "type": "string",
                                "minLength": 5,
                                "maxLength": 100,
                                "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                              },
                              "displayName": {
                                "description": "Name of the capability in human-readible format.",
                                "type": "string",
                                "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
                              },
                              "description": {
                                "type": "string",
                                "description": "A written representation of the purpose and characteristics of the capability.",
                                "maxLength": 5000
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
                                "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
                              },
                              "type": {
                                "description": "Classification of capabilities. Used to group capabilities similar in nature.",
                                "type": "string",
                                "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
                              },
                              "subType": {
                                "description": "Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Capability.",
                                "type": "string",
                                "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
                              },
                              "key": {
                                "description": "Key that backs the capability.",
                                "type": "string",
                                "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
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
                                  "description": "A string starting with an alphanumeric character. Spaces and hyphens allowed."
                                }
                              },
                              "status": {
                                "type": "string",
                                "description": "Status of the capability",
                                "default": "enabled",
                                "enum": [
                                  "enabled",
                                  "disabled"
                                ]
                              },
                              "metadata": {
                                "type": "object",
                                "description": "Metadata contains additional information associated with the capability. Extension point.",
                                "additionalProperties": true
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
                                "schemaVersion": "capability.meshery.io/v1beta1",
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
                                "schemaVersion": "capability.meshery.io/v1beta1",
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
                                "schemaVersion": "capability.meshery.io/v1beta1",
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
                                "schemaVersion": "capability.meshery.io/v1beta1",
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
                        }
                      },
                      "x-oapi-codegen-extra-tags": {
                        "gorm": "type:bytes;serializer:json",
                        "json": "metadata",
                        "yaml": "metadata"
                      },
                      "x-order": 11,
                      "additionalProperties": true
                    },
                    "model": {
                      "x-oapi-codegen-extra-tags": {
                        "gorm": "type:bytes;serializer:json"
                      },
                      "x-order": 12,
                      "type": "object",
                      "description": "Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31).",
                      "required": [
                        "version"
                      ],
                      "properties": {
                        "version": {
                          "description": "Version of the model as defined by the registrant.",
                          "x-oapi-codegen-extra-tags": {
                            "json": "version"
                          },
                          "x-order": 1,
                          "type": "string",
                          "minLength": 5,
                          "maxLength": 100,
                          "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
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
                      "description": "The relationships of the model."
                    },
                    "components": {
                      "type": "array",
                      "x-go-type": "interface{}",
                      "x-oapi-codegen-extra-tags": {
                        "gorm": "-",
                        "json": "components",
                        "yaml": "components"
                      },
                      "description": "The components of the model."
                    },
                    "componentsCount": {
                      "type": "integer",
                      "description": "Number of components associated with the model.",
                      "x-order": 13,
                      "x-oapi-codegen-extra-tags": {
                        "json": "components_count",
                        "yaml": "components_count",
                        "gorm": "-"
                      },
                      "default": 0,
                      "minimum": 0
                    },
                    "relationshipsCount": {
                      "type": "integer",
                      "description": "Number of relationships associated with the model.",
                      "x-order": 13,
                      "x-oapi-codegen-extra-tags": {
                        "gorm": "-",
                        "json": "relationships_count",
                        "yaml": "relationships_count"
                      },
                      "default": 0,
                      "minimum": 0
                    },
                    "created_at": {
                      "x-order": 14,
                      "description": "Timestamp when the resource was created.",
                      "x-go-type": "time.Time",
                      "type": "string",
                      "format": "date-time",
                      "x-go-name": "CreatedAt",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "yaml": "created_at"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updated_at": {
                      "x-order": 15,
                      "description": "Timestamp when the resource was updated.",
                      "x-go-type": "time.Time",
                      "type": "string",
                      "format": "date-time",
                      "x-go-name": "UpdatedAt",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "yaml": "updated_at"
                      },
                      "x-go-type-skip-optional-pointer": true
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
                "modelReference": {
                  "x-go-type": "modelv1beta1.ModelReference",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/v1beta1/model",
                    "name": "modelv1beta1"
                  },
                  "x-order": 8,
                  "description": "Reference to the specific registered model to which the component belongs and from which model version, category, and other properties may be referenced. Learn more at https://docs.meshery.io/concepts/models",
                  "x-oapi-codegen-extra-tags": {
                    "gorm": "-"
                  },
                  "type": "object",
                  "required": [
                    "id",
                    "name",
                    "version",
                    "displayName",
                    "model",
                    "registrant"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "name": {
                      "type": "string",
                      "description": "The unique name for the model within the scope of a registrant.",
                      "pattern": "^[a-z0-9-]+$",
                      "examples": [
                        "cert-manager"
                      ]
                    },
                    "version": {
                      "description": "Version of the model definition.",
                      "type": "string",
                      "minLength": 5,
                      "maxLength": 100,
                      "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                    },
                    "displayName": {
                      "type": "string",
                      "description": "Human-readable name for the model.",
                      "minLength": 1,
                      "maxLength": 100,
                      "pattern": "^[a-zA-Z0-9 ]+$",
                      "examples": [
                        "Cert Manager"
                      ]
                    },
                    "model": {
                      "type": "object",
                      "description": "Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31).",
                      "required": [
                        "version"
                      ],
                      "properties": {
                        "version": {
                          "description": "Version of the model as defined by the registrant.",
                          "x-oapi-codegen-extra-tags": {
                            "json": "version"
                          },
                          "x-order": 1,
                          "type": "string",
                          "minLength": 5,
                          "maxLength": 100,
                          "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                        }
                      }
                    },
                    "registrant": {
                      "x-go-type": "RegistrantReference",
                      "x-oapi-codegen-extra-tags": {
                        "json": "registrant"
                      },
                      "type": "object",
                      "required": [
                        "kind"
                      ],
                      "properties": {
                        "kind": {
                          "type": "string",
                          "description": "Kind of the registrant.",
                          "maxLength": 255
                        }
                      }
                    }
                  }
                },
                "modelId": {
                  "description": "Foreign key to the model to which the component belongs. Populated by the ORM from the `model_id` column and suppressed on the JSON wire; consumers use the nested `model` object for wire-level access.",
                  "x-go-name": "ModelID",
                  "x-oapi-codegen-extra-tags": {
                    "gorm": "column:model_id",
                    "db": "model_id",
                    "yaml": "-",
                    "json": "-"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "metadata": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "metadata"
                  },
                  "x-order": 9,
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "type": "object",
                  "description": "Additional connection metadata"
                },
                "credentialSchema": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "credential_schema"
                  },
                  "x-order": 9,
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "type": "object",
                  "description": "Schema for the credential Associated with the connection"
                },
                "connectionSchema": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "connection_schema"
                  },
                  "x-order": 9,
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "type": "object",
                  "description": "Schema for the connection"
                },
                "styles": {
                  "x-oapi-codegen-extra-tags": {
                    "gorm": "type:bytes;serializer:json",
                    "yaml": "styles",
                    "json": "styles"
                  },
                  "x-go-type": "core.ComponentStyles",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-order": 17,
                  "description": "Visualization styles for the connection, including svgColor and svgWhite used for UI representation.",
                  "type": "object",
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
                          "description": "Primary color of the component used for UI representation.",
                          "maxLength": 500
                        },
                        "secondaryColor": {
                          "type": "string",
                          "description": "Secondary color of the entity used for UI representation.",
                          "maxLength": 500
                        },
                        "svgWhite": {
                          "type": "string",
                          "description": "White SVG of the entity used for UI representation on dark background.",
                          "maxLength": 500
                        },
                        "svgColor": {
                          "type": "string",
                          "description": "Colored SVG of the entity used for UI representation on light background.",
                          "maxLength": 500
                        },
                        "svgComplete": {
                          "type": "string",
                          "description": "Complete SVG of the entity used for UI representation, often inclusive of background.",
                          "maxLength": 500
                        },
                        "color": {
                          "type": "string",
                          "description": "The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g.",
                          "maxLength": 500
                        },
                        "textOpacity": {
                          "type": "number",
                          "description": "The opacity of the label text, including its outline.",
                          "minimum": 0,
                          "maximum": 1
                        },
                        "fontFamily": {
                          "type": "string",
                          "description": "A comma-separated list of font names to use on the label text.",
                          "maxLength": 500
                        },
                        "fontSize": {
                          "type": "string",
                          "description": "The size of the label text.",
                          "maxLength": 500
                        },
                        "fontStyle": {
                          "type": "string",
                          "description": "A CSS font style to be applied to the label text.",
                          "maxLength": 500
                        },
                        "fontWeight": {
                          "type": "string",
                          "description": "A CSS font weight to be applied to the label text.",
                          "maxLength": 500
                        },
                        "textTransform": {
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
                        "zIndex": {
                          "type": "integer",
                          "description": "An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index.",
                          "minimum": 0
                        },
                        "label": {
                          "type": "string",
                          "description": "The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id",
                          "maxLength": 500
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
                              "minimum": -1000000,
                              "maximum": 1000000,
                              "x-go-type": "float64"
                            },
                            "y": {
                              "type": "number",
                              "description": "The y-coordinate of the node.",
                              "minimum": -1000000,
                              "maximum": 1000000,
                              "x-go-type": "float64"
                            }
                          }
                        },
                        "bodyText": {
                          "type": "string",
                          "description": "The text to display for an element's body. Can give a path, e.g. data(id) will label with the elements id",
                          "maxLength": 500
                        },
                        "bodyTextWrap": {
                          "type": "string",
                          "description": "How to wrap the text in the node. Can be 'none', 'wrap', or 'ellipsis'.",
                          "enum": [
                            "none",
                            "wrap",
                            "ellipsis"
                          ]
                        },
                        "bodyTextMaxWidth": {
                          "type": "string",
                          "description": "The maximum width for wrapping text in the node.",
                          "maxLength": 50
                        },
                        "bodyTextOpacity": {
                          "type": "number",
                          "description": "The opacity of the node's body text, including its outline.",
                          "minimum": 0,
                          "maximum": 1
                        },
                        "bodyTextBackgroundColor": {
                          "type": "string",
                          "description": "The colour of the node's body text background. Colours may be specified by name (e.g. red), hex (e.g.",
                          "maxLength": 100
                        },
                        "bodyTextFontSize": {
                          "type": "number",
                          "description": "The size of the node's body text.",
                          "minimum": 0
                        },
                        "bodyTextColor": {
                          "type": "string",
                          "description": "The colour of the node's body text. Colours may be specified by name (e.g. red), hex (e.g.",
                          "maxLength": 100
                        },
                        "bodyTextFontWeight": {
                          "type": "string",
                          "description": "A CSS font weight to be applied to the node's body text.",
                          "maxLength": 50
                        },
                        "bodyTextHorizontalAlign": {
                          "type": "string",
                          "description": "A CSS horizontal alignment to be applied to the node's body text.",
                          "maxLength": 50
                        },
                        "bodyTextDecoration": {
                          "type": "string",
                          "description": "A CSS text decoration to be applied to the node's body text.",
                          "maxLength": 100
                        },
                        "bodyTextVerticalAlign": {
                          "type": "string",
                          "description": "A CSS vertical alignment to be applied to the node's body text.",
                          "maxLength": 50
                        },
                        "width": {
                          "type": "number",
                          "description": "The width of the node's body or the width of an edge's line.",
                          "minimum": 0
                        },
                        "height": {
                          "type": "number",
                          "description": "The height of the node's body",
                          "minimum": 0
                        },
                        "backgroundImage": {
                          "type": "string",
                          "format": "uri",
                          "description": "The URL that points to the image to show in the node.",
                          "maxLength": 2048
                        },
                        "backgroundColor": {
                          "type": "string",
                          "description": "The colour of the node's body. Colours may be specified by name (e.g. red), hex (e.g.",
                          "maxLength": 100
                        },
                        "backgroundBlacken": {
                          "type": "number",
                          "description": "Blackens the node's body for values from 0 to 1; whitens the node's body for values from 0 to -1.",
                          "maximum": 1,
                          "minimum": -1
                        },
                        "backgroundOpacity": {
                          "type": "number",
                          "description": "The opacity level of the node's background colour",
                          "maximum": 1,
                          "minimum": 0
                        },
                        "backgroundPositionX": {
                          "type": "string",
                          "description": "The x position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                          "maxLength": 50
                        },
                        "backgroundPositionY": {
                          "type": "string",
                          "description": "The y position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                          "maxLength": 50
                        },
                        "backgroundOffsetX": {
                          "type": "string",
                          "description": "The x offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                          "maxLength": 50
                        },
                        "backgroundOffsetY": {
                          "type": "string",
                          "description": "The y offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                          "maxLength": 50
                        },
                        "backgroundFit": {
                          "type": "string",
                          "description": "How the background image is fit to the node. Can be 'none', 'contain', or 'cover'.",
                          "enum": [
                            "none",
                            "contain",
                            "cover"
                          ]
                        },
                        "backgroundClip": {
                          "type": "string",
                          "description": "How the background image is clipped to the node. Can be 'none', 'node', or 'node-border'.",
                          "enum": [
                            "none",
                            "node",
                            "node-border"
                          ]
                        },
                        "backgroundWidthRelativeTo": {
                          "type": "string",
                          "description": "How the background image's width is determined. Can be 'none', 'inner', or 'outer'.",
                          "enum": [
                            "none",
                            "inner",
                            "outer"
                          ]
                        },
                        "backgroundHeightRelativeTo": {
                          "type": "string",
                          "description": "How the background image's height is determined. Can be 'none', 'inner', or 'outer'.",
                          "enum": [
                            "none",
                            "inner",
                            "outer"
                          ]
                        },
                        "borderWidth": {
                          "type": "number",
                          "description": "The size of the node's border.",
                          "minimum": 0
                        },
                        "borderStyle": {
                          "type": "string",
                          "description": "The style of the node's border",
                          "enum": [
                            "solid",
                            "dotted",
                            "dashed",
                            "double"
                          ]
                        },
                        "borderColor": {
                          "type": "string",
                          "description": "The colour of the node's border. Colours may be specified by name (e.g. red), hex (e.g.",
                          "maxLength": 100
                        },
                        "borderOpacity": {
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
                        "textHalign": {
                          "type": "string",
                          "description": "The horizontal alignment of a node's label",
                          "enum": [
                            "left",
                            "center",
                            "right"
                          ]
                        },
                        "textValign": {
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
                        "activeBgColor": {
                          "type": "string",
                          "description": "The colour of the indicator shown when the background is grabbed by the user. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                          "maxLength": 100
                        },
                        "activeBgOpacity": {
                          "type": "string",
                          "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                          "maxLength": 50
                        },
                        "activeBgSize": {
                          "type": "string",
                          "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                          "maxLength": 50
                        },
                        "selectionBoxColor": {
                          "type": "string",
                          "description": "The background colour of the selection box used for drag selection. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                          "maxLength": 100
                        },
                        "selectionBoxBorderWidth": {
                          "type": "number",
                          "description": "The size of the border on the selection box. Selector needs to be *core*",
                          "minimum": 0
                        },
                        "selectionBoxOpacity": {
                          "type": "number",
                          "description": "The opacity of the selection box. Selector needs to be *core*",
                          "minimum": 0,
                          "maximum": 1
                        },
                        "outsideTextureBgColor": {
                          "type": "string",
                          "description": "The colour of the area outside the viewport texture when initOptions.textureOnViewport === true. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                          "maxLength": 100
                        },
                        "outsideTextureBgOpacity": {
                          "type": "number",
                          "description": "The opacity of the area outside the viewport texture. Selector needs to be *core*",
                          "minimum": 0,
                          "maximum": 1
                        },
                        "shapePolygonPoints": {
                          "type": "string",
                          "description": "An array (or a space-separated string) of numbers ranging on [-1, 1], representing alternating x and y values (i.e. x1 y1 x2 y2, x3 y3 ...). This represents the points in the polygon for the node's shape. The bounding box of the node is given by (-1, -1), (1, -1), (1, 1), (-1, 1). The node's position is the origin (0, 0 )",
                          "maxLength": 2000
                        },
                        "menuBackgroundColor": {
                          "type": "string",
                          "description": "The colour of the background of the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                          "maxLength": 100
                        },
                        "menuBackgroundOpacity": {
                          "type": "number",
                          "description": "The opacity of the background of the component menu.",
                          "minimum": 0,
                          "maximum": 1
                        },
                        "menuForgroundColor": {
                          "type": "string",
                          "description": "The colour of the text or icons in the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                          "maxLength": 100
                        }
                      }
                    }
                  ]
                },
                "status": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "status"
                  },
                  "x-order": 10,
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
                "transitionMap": {
                  "type": "object",
                  "description": "Map describing the connection state machine. Each key is a current connection status and its value is the list of states the connection may transition to from that status, along with a description of each transition.",
                  "additionalProperties": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "additionalProperties": false,
                      "description": "A single permissible state transition for a connection, describing the next reachable state and the meaning of that transition.",
                      "required": [
                        "nextState"
                      ],
                      "properties": {
                        "nextState": {
                          "type": "string",
                          "description": "Connection Status Value",
                          "x-go-name": "ConnectionStatusValue",
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
                          "x-order": 1
                        },
                        "description": {
                          "type": "string",
                          "description": "Human-readable explanation of when or why this transition occurs.",
                          "maxLength": 1000,
                          "x-oapi-codegen-extra-tags": {
                            "json": "description,omitempty"
                          },
                          "x-order": 2
                        }
                      }
                    }
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "gorm": "type:bytes;serializer:json",
                    "json": "transitionMap,omitempty"
                  },
                  "x-order": 18
                },
                "userId": {
                  "x-go-name": "UserID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "user_id",
                    "json": "userId"
                  },
                  "x-order": 11,
                  "description": "User ID who owns this connection",
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "createdAt": {
                  "description": "Timestamp when the connection was created.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at",
                    "json": "createdAt"
                  },
                  "x-order": 12,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updatedAt": {
                  "description": "Timestamp when the connection was last updated.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at",
                    "json": "updatedAt"
                  },
                  "x-order": 13,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "deletedAt": {
                  "description": "Timestamp when the connection was soft-deleted, if applicable.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "deleted_at",
                    "json": "deletedAt"
                  },
                  "x-order": 14,
                  "x-go-type": "meshcore.NullTime",
                  "x-go-type-import": {
                    "name": "meshcore",
                    "path": "github.com/meshery/schemas/models/core"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "environments": {
                  "type": "array",
                  "description": "Associated environments for this connection",
                  "items": {
                    "x-go-type": "*environmentv1beta3.Environment",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/v1beta3/environment",
                      "name": "environmentv1beta3"
                    },
                    "$id": "https://schemas.meshery.io/environment.yaml",
                    "$schema": "http://json-schema.org/draft-07/schema#",
                    "title": "Environment",
                    "description": "Environments allow you to logically group related Connections and their associated Credentials. Learn more at https://docs.meshery.io/concepts/logical/environments",
                    "additionalProperties": false,
                    "type": "object",
                    "example": {
                      "id": "00000000-0000-0000-0000-000000000000",
                      "schemaVersion": "environments.meshery.io/v1beta3",
                      "name": "Production Environment",
                      "description": "Connections and credentials for the production cluster.",
                      "organizationId": "00000000-0000-0000-0000-000000000000",
                      "owner": "00000000-0000-0000-0000-000000000000",
                      "createdAt": "0001-01-01T00:00:00Z",
                      "metadata": {},
                      "updatedAt": "0001-01-01T00:00:00Z",
                      "deletedAt": null
                    },
                    "required": [
                      "id",
                      "schemaVersion",
                      "name",
                      "description",
                      "organizationId"
                    ],
                    "properties": {
                      "id": {
                        "description": "ID",
                        "x-order": 1,
                        "x-go-name": "ID",
                        "x-oapi-codegen-extra-tags": {
                          "db": "id",
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
                        "description": "Specifies the version of the schema to which the environment conforms.",
                        "x-order": 2,
                        "x-oapi-codegen-extra-tags": {
                          "json": "schemaVersion",
                          "db": "-",
                          "gorm": "-"
                        },
                        "default": "environments.meshery.io/v1beta3",
                        "type": "string",
                        "minLength": 2,
                        "maxLength": 100,
                        "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                        "example": [
                          "v1",
                          "v1alpha1",
                          "v2beta3",
                          "v1.custom-suffix",
                          "models.meshery.io/v1beta1",
                          "capability.meshery.io/v1alpha1"
                        ]
                      },
                      "name": {
                        "x-oapi-codegen-extra-tags": {
                          "db": "name",
                          "json": "name"
                        },
                        "x-order": 3,
                        "type": "string",
                        "maxLength": 100,
                        "description": "Environment name"
                      },
                      "description": {
                        "x-oapi-codegen-extra-tags": {
                          "db": "description",
                          "json": "description"
                        },
                        "x-order": 4,
                        "type": "string",
                        "maxLength": 1000,
                        "description": "Environment description"
                      },
                      "organizationId": {
                        "x-go-name": "OrganizationID",
                        "x-oapi-codegen-extra-tags": {
                          "db": "organization_id",
                          "json": "organizationId"
                        },
                        "x-order": 5,
                        "description": "Environment organization ID",
                        "type": "string",
                        "format": "uuid",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        }
                      },
                      "owner": {
                        "x-oapi-codegen-extra-tags": {
                          "db": "owner",
                          "json": "owner"
                        },
                        "x-order": 6,
                        "description": "Environment owner",
                        "type": "string",
                        "format": "uuid",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        }
                      },
                      "createdAt": {
                        "description": "Timestamp when the environment was created.",
                        "x-oapi-codegen-extra-tags": {
                          "db": "created_at",
                          "yaml": "created_at",
                          "json": "createdAt"
                        },
                        "x-order": 7,
                        "x-go-type": "time.Time",
                        "type": "string",
                        "format": "date-time",
                        "x-go-name": "CreatedAt",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "metadata": {
                        "description": "Additional metadata associated with the environment.",
                        "x-oapi-codegen-extra-tags": {
                          "db": "metadata",
                          "json": "metadata"
                        },
                        "x-order": 8,
                        "x-go-type": "core.Map",
                        "x-go-type-skip-optional-pointer": true,
                        "type": "object"
                      },
                      "updatedAt": {
                        "description": "Timestamp when the environment was last updated.",
                        "x-oapi-codegen-extra-tags": {
                          "db": "updated_at",
                          "yaml": "updated_at",
                          "json": "updatedAt"
                        },
                        "x-order": 9,
                        "x-go-type": "time.Time",
                        "type": "string",
                        "format": "date-time",
                        "x-go-name": "UpdatedAt",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "deletedAt": {
                        "description": "Timestamp when the environment was soft deleted. Null while the environment remains active.",
                        "nullable": true,
                        "x-oapi-codegen-extra-tags": {
                          "db": "deleted_at",
                          "json": "deletedAt"
                        },
                        "x-go-type": "core.NullTime",
                        "x-go-import": "database/sql",
                        "x-order": 10,
                        "type": "string",
                        "format": "date-time",
                        "x-go-type-skip-optional-pointer": true
                      }
                    }
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "-",
                    "gorm": "-"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-order": 15
                },
                "schemaVersion": {
                  "description": "Specifies the version of the schema used for the definition.",
                  "x-order": 16,
                  "x-oapi-codegen-extra-tags": {
                    "db": "-",
                    "gorm": "-"
                  },
                  "default": "connections.meshery.io/v1beta3",
                  "type": "string",
                  "minLength": 2,
                  "maxLength": 100,
                  "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                  "example": [
                    "v1",
                    "v1alpha1",
                    "v2beta3",
                    "v1.custom-suffix",
                    "models.meshery.io/v1beta1",
                    "capability.meshery.io/v1alpha1"
                  ]
                }
              }
            },
            "x-order": 1
          },
          "totalCount": {
            "type": "integer",
            "description": "Total number of connections on all pages",
            "x-oapi-codegen-extra-tags": {
              "json": "totalCount"
            },
            "x-order": 2,
            "minimum": 0
          },
          "page": {
            "type": "integer",
            "description": "Current page number",
            "x-order": 3,
            "minimum": 0
          },
          "pageSize": {
            "type": "integer",
            "description": "Number of elements per page",
            "x-oapi-codegen-extra-tags": {
              "json": "pageSize"
            },
            "x-order": 4,
            "minimum": 1
          },
          "statusSummary": {
            "type": "object",
            "description": "Aggregate count of connections grouped by status",
            "additionalProperties": {
              "type": "integer"
            },
            "x-go-type": "map[ConnectionStatusValue]int",
            "x-oapi-codegen-extra-tags": {
              "json": "statusSummary,omitempty"
            },
            "x-order": 5
          }
        }
      },
      "ConnectionStatusValue": {
        "type": "string",
        "description": "Connection Status Value",
        "x-go-name": "ConnectionStatusValue",
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
      "ConnectionStateTransition": {
        "type": "object",
        "additionalProperties": false,
        "description": "A single permissible state transition for a connection, describing the next reachable state and the meaning of that transition.",
        "required": [
          "nextState"
        ],
        "properties": {
          "nextState": {
            "type": "string",
            "description": "Connection Status Value",
            "x-go-name": "ConnectionStatusValue",
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
            "x-order": 1
          },
          "description": {
            "type": "string",
            "description": "Human-readable explanation of when or why this transition occurs.",
            "maxLength": 1000,
            "x-oapi-codegen-extra-tags": {
              "json": "description,omitempty"
            },
            "x-order": 2
          }
        }
      },
      "ConnectionPayload": {
        "type": "object",
        "description": "Payload for creating or updating a connection",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "description": "Connection ID",
            "x-go-name": "ConnectionID",
            "x-oapi-codegen-extra-tags": {
              "json": "id,omitempty"
            }
          },
          "name": {
            "type": "string",
            "description": "Connection name",
            "x-oapi-codegen-extra-tags": {
              "json": "name"
            },
            "minLength": 1,
            "maxLength": 255
          },
          "kind": {
            "type": "string",
            "description": "Connection kind",
            "x-oapi-codegen-extra-tags": {
              "json": "kind"
            },
            "maxLength": 255
          },
          "type": {
            "type": "string",
            "description": "Connection type",
            "x-oapi-codegen-extra-tags": {
              "json": "type"
            },
            "maxLength": 255
          },
          "subType": {
            "type": "string",
            "description": "Connection sub-type",
            "x-oapi-codegen-extra-tags": {
              "json": "subType"
            },
            "maxLength": 255
          },
          "credentialSecret": {
            "type": "object",
            "description": "Credential secret data",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "credentialSecret"
            }
          },
          "metadata": {
            "type": "object",
            "description": "Connection metadata",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "metadata"
            }
          },
          "styles": {
            "x-go-type": "core.ComponentStyles",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-oapi-codegen-extra-tags": {
              "json": "styles,omitempty"
            },
            "description": "Visualization styles for the connection, including svgColor and svgWhite used for UI representation.",
            "type": "object",
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
                    "description": "Primary color of the component used for UI representation.",
                    "maxLength": 500
                  },
                  "secondaryColor": {
                    "type": "string",
                    "description": "Secondary color of the entity used for UI representation.",
                    "maxLength": 500
                  },
                  "svgWhite": {
                    "type": "string",
                    "description": "White SVG of the entity used for UI representation on dark background.",
                    "maxLength": 500
                  },
                  "svgColor": {
                    "type": "string",
                    "description": "Colored SVG of the entity used for UI representation on light background.",
                    "maxLength": 500
                  },
                  "svgComplete": {
                    "type": "string",
                    "description": "Complete SVG of the entity used for UI representation, often inclusive of background.",
                    "maxLength": 500
                  },
                  "color": {
                    "type": "string",
                    "description": "The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 500
                  },
                  "textOpacity": {
                    "type": "number",
                    "description": "The opacity of the label text, including its outline.",
                    "minimum": 0,
                    "maximum": 1
                  },
                  "fontFamily": {
                    "type": "string",
                    "description": "A comma-separated list of font names to use on the label text.",
                    "maxLength": 500
                  },
                  "fontSize": {
                    "type": "string",
                    "description": "The size of the label text.",
                    "maxLength": 500
                  },
                  "fontStyle": {
                    "type": "string",
                    "description": "A CSS font style to be applied to the label text.",
                    "maxLength": 500
                  },
                  "fontWeight": {
                    "type": "string",
                    "description": "A CSS font weight to be applied to the label text.",
                    "maxLength": 500
                  },
                  "textTransform": {
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
                  "zIndex": {
                    "type": "integer",
                    "description": "An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index.",
                    "minimum": 0
                  },
                  "label": {
                    "type": "string",
                    "description": "The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id",
                    "maxLength": 500
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
                        "minimum": -1000000,
                        "maximum": 1000000,
                        "x-go-type": "float64"
                      },
                      "y": {
                        "type": "number",
                        "description": "The y-coordinate of the node.",
                        "minimum": -1000000,
                        "maximum": 1000000,
                        "x-go-type": "float64"
                      }
                    }
                  },
                  "bodyText": {
                    "type": "string",
                    "description": "The text to display for an element's body. Can give a path, e.g. data(id) will label with the elements id",
                    "maxLength": 500
                  },
                  "bodyTextWrap": {
                    "type": "string",
                    "description": "How to wrap the text in the node. Can be 'none', 'wrap', or 'ellipsis'.",
                    "enum": [
                      "none",
                      "wrap",
                      "ellipsis"
                    ]
                  },
                  "bodyTextMaxWidth": {
                    "type": "string",
                    "description": "The maximum width for wrapping text in the node.",
                    "maxLength": 50
                  },
                  "bodyTextOpacity": {
                    "type": "number",
                    "description": "The opacity of the node's body text, including its outline.",
                    "minimum": 0,
                    "maximum": 1
                  },
                  "bodyTextBackgroundColor": {
                    "type": "string",
                    "description": "The colour of the node's body text background. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "bodyTextFontSize": {
                    "type": "number",
                    "description": "The size of the node's body text.",
                    "minimum": 0
                  },
                  "bodyTextColor": {
                    "type": "string",
                    "description": "The colour of the node's body text. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "bodyTextFontWeight": {
                    "type": "string",
                    "description": "A CSS font weight to be applied to the node's body text.",
                    "maxLength": 50
                  },
                  "bodyTextHorizontalAlign": {
                    "type": "string",
                    "description": "A CSS horizontal alignment to be applied to the node's body text.",
                    "maxLength": 50
                  },
                  "bodyTextDecoration": {
                    "type": "string",
                    "description": "A CSS text decoration to be applied to the node's body text.",
                    "maxLength": 100
                  },
                  "bodyTextVerticalAlign": {
                    "type": "string",
                    "description": "A CSS vertical alignment to be applied to the node's body text.",
                    "maxLength": 50
                  },
                  "width": {
                    "type": "number",
                    "description": "The width of the node's body or the width of an edge's line.",
                    "minimum": 0
                  },
                  "height": {
                    "type": "number",
                    "description": "The height of the node's body",
                    "minimum": 0
                  },
                  "backgroundImage": {
                    "type": "string",
                    "format": "uri",
                    "description": "The URL that points to the image to show in the node.",
                    "maxLength": 2048
                  },
                  "backgroundColor": {
                    "type": "string",
                    "description": "The colour of the node's body. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "backgroundBlacken": {
                    "type": "number",
                    "description": "Blackens the node's body for values from 0 to 1; whitens the node's body for values from 0 to -1.",
                    "maximum": 1,
                    "minimum": -1
                  },
                  "backgroundOpacity": {
                    "type": "number",
                    "description": "The opacity level of the node's background colour",
                    "maximum": 1,
                    "minimum": 0
                  },
                  "backgroundPositionX": {
                    "type": "string",
                    "description": "The x position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                    "maxLength": 50
                  },
                  "backgroundPositionY": {
                    "type": "string",
                    "description": "The y position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                    "maxLength": 50
                  },
                  "backgroundOffsetX": {
                    "type": "string",
                    "description": "The x offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                    "maxLength": 50
                  },
                  "backgroundOffsetY": {
                    "type": "string",
                    "description": "The y offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                    "maxLength": 50
                  },
                  "backgroundFit": {
                    "type": "string",
                    "description": "How the background image is fit to the node. Can be 'none', 'contain', or 'cover'.",
                    "enum": [
                      "none",
                      "contain",
                      "cover"
                    ]
                  },
                  "backgroundClip": {
                    "type": "string",
                    "description": "How the background image is clipped to the node. Can be 'none', 'node', or 'node-border'.",
                    "enum": [
                      "none",
                      "node",
                      "node-border"
                    ]
                  },
                  "backgroundWidthRelativeTo": {
                    "type": "string",
                    "description": "How the background image's width is determined. Can be 'none', 'inner', or 'outer'.",
                    "enum": [
                      "none",
                      "inner",
                      "outer"
                    ]
                  },
                  "backgroundHeightRelativeTo": {
                    "type": "string",
                    "description": "How the background image's height is determined. Can be 'none', 'inner', or 'outer'.",
                    "enum": [
                      "none",
                      "inner",
                      "outer"
                    ]
                  },
                  "borderWidth": {
                    "type": "number",
                    "description": "The size of the node's border.",
                    "minimum": 0
                  },
                  "borderStyle": {
                    "type": "string",
                    "description": "The style of the node's border",
                    "enum": [
                      "solid",
                      "dotted",
                      "dashed",
                      "double"
                    ]
                  },
                  "borderColor": {
                    "type": "string",
                    "description": "The colour of the node's border. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "borderOpacity": {
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
                  "textHalign": {
                    "type": "string",
                    "description": "The horizontal alignment of a node's label",
                    "enum": [
                      "left",
                      "center",
                      "right"
                    ]
                  },
                  "textValign": {
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
                  "activeBgColor": {
                    "type": "string",
                    "description": "The colour of the indicator shown when the background is grabbed by the user. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "activeBgOpacity": {
                    "type": "string",
                    "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                    "maxLength": 50
                  },
                  "activeBgSize": {
                    "type": "string",
                    "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                    "maxLength": 50
                  },
                  "selectionBoxColor": {
                    "type": "string",
                    "description": "The background colour of the selection box used for drag selection. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "selectionBoxBorderWidth": {
                    "type": "number",
                    "description": "The size of the border on the selection box. Selector needs to be *core*",
                    "minimum": 0
                  },
                  "selectionBoxOpacity": {
                    "type": "number",
                    "description": "The opacity of the selection box. Selector needs to be *core*",
                    "minimum": 0,
                    "maximum": 1
                  },
                  "outsideTextureBgColor": {
                    "type": "string",
                    "description": "The colour of the area outside the viewport texture when initOptions.textureOnViewport === true. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "outsideTextureBgOpacity": {
                    "type": "number",
                    "description": "The opacity of the area outside the viewport texture. Selector needs to be *core*",
                    "minimum": 0,
                    "maximum": 1
                  },
                  "shapePolygonPoints": {
                    "type": "string",
                    "description": "An array (or a space-separated string) of numbers ranging on [-1, 1], representing alternating x and y values (i.e. x1 y1 x2 y2, x3 y3 ...). This represents the points in the polygon for the node's shape. The bounding box of the node is given by (-1, -1), (1, -1), (1, 1), (-1, 1). The node's position is the origin (0, 0 )",
                    "maxLength": 2000
                  },
                  "menuBackgroundColor": {
                    "type": "string",
                    "description": "The colour of the background of the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "menuBackgroundOpacity": {
                    "type": "number",
                    "description": "The opacity of the background of the component menu.",
                    "minimum": 0,
                    "maximum": 1
                  },
                  "menuForgroundColor": {
                    "type": "string",
                    "description": "The colour of the text or icons in the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  }
                }
              }
            ]
          },
          "status": {
            "type": "string",
            "description": "Connection status",
            "x-oapi-codegen-extra-tags": {
              "json": "status"
            },
            "maxLength": 255
          },
          "credentialId": {
            "type": "string",
            "format": "uuid",
            "description": "Associated credential ID",
            "x-go-name": "CredentialID",
            "x-oapi-codegen-extra-tags": {
              "json": "credentialId,omitempty"
            }
          }
        },
        "required": [
          "name",
          "kind",
          "type",
          "subType",
          "status"
        ]
      },
      "ConnectionStatusInfo": {
        "type": "object",
        "description": "Status count information for connections",
        "properties": {
          "status": {
            "type": "string",
            "description": "Status value",
            "x-oapi-codegen-extra-tags": {
              "json": "status",
              "db": "status"
            },
            "maxLength": 255
          },
          "count": {
            "type": "integer",
            "description": "Number of connections with this status",
            "x-oapi-codegen-extra-tags": {
              "json": "count",
              "db": "count"
            },
            "minimum": 0
          }
        },
        "required": [
          "status",
          "count"
        ]
      },
      "ConnectionsStatusPage": {
        "type": "object",
        "description": "Paginated list of connection status counts",
        "properties": {
          "totalCount": {
            "type": "integer",
            "description": "Total number of status entries",
            "x-oapi-codegen-extra-tags": {
              "json": "totalCount"
            },
            "minimum": 0
          },
          "page": {
            "type": "integer",
            "description": "Current page number",
            "x-oapi-codegen-extra-tags": {
              "json": "page"
            },
            "minimum": 0
          },
          "pageSize": {
            "type": "integer",
            "description": "Number of items per page",
            "x-oapi-codegen-extra-tags": {
              "json": "pageSize"
            },
            "minimum": 1
          },
          "connectionsStatus": {
            "type": "array",
            "description": "List of status counts",
            "items": {
              "type": "object",
              "description": "Status count information for connections",
              "properties": {
                "status": {
                  "type": "string",
                  "description": "Status value",
                  "x-oapi-codegen-extra-tags": {
                    "json": "status",
                    "db": "status"
                  },
                  "maxLength": 255
                },
                "count": {
                  "type": "integer",
                  "description": "Number of connections with this status",
                  "x-oapi-codegen-extra-tags": {
                    "json": "count",
                    "db": "count"
                  },
                  "minimum": 0
                }
              },
              "required": [
                "status",
                "count"
              ]
            },
            "x-oapi-codegen-extra-tags": {
              "json": "connectionsStatus"
            }
          }
        },
        "required": [
          "totalCount",
          "page",
          "pageSize",
          "connectionsStatus"
        ]
      },
      "MesheryInstance": {
        "type": "object",
        "description": "Meshery server instance information",
        "properties": {
          "id": {
            "type": "string",
            "description": "Instance ID",
            "x-oapi-codegen-extra-tags": {
              "json": "id,omitempty",
              "db": "id"
            },
            "maxLength": 500,
            "format": "uuid"
          },
          "name": {
            "type": "string",
            "description": "Instance name",
            "x-oapi-codegen-extra-tags": {
              "json": "name,omitempty",
              "db": "name"
            },
            "minLength": 1,
            "maxLength": 255
          },
          "serverId": {
            "type": "string",
            "description": "Server ID",
            "x-go-name": "ServerID",
            "x-oapi-codegen-extra-tags": {
              "json": "serverId,omitempty",
              "db": "server_id"
            },
            "maxLength": 500,
            "format": "uuid"
          },
          "serverVersion": {
            "type": "string",
            "description": "Meshery server version",
            "x-oapi-codegen-extra-tags": {
              "json": "serverVersion,omitempty",
              "db": "server_version"
            },
            "maxLength": 500
          },
          "serverLocation": {
            "type": "string",
            "description": "Server location URL",
            "x-oapi-codegen-extra-tags": {
              "json": "serverLocation,omitempty",
              "db": "server_location"
            },
            "maxLength": 500
          },
          "serverBuildSha": {
            "type": "string",
            "description": "Server build SHA",
            "x-go-name": "ServerBuildSHA",
            "x-oapi-codegen-extra-tags": {
              "json": "serverBuildSha,omitempty",
              "db": "server_build_sha"
            },
            "maxLength": 500
          },
          "createdAt": {
            "type": "string",
            "description": "Creation timestamp",
            "x-oapi-codegen-extra-tags": {
              "json": "createdAt,omitempty",
              "db": "created_at"
            },
            "format": "date-time"
          },
          "updatedAt": {
            "type": "string",
            "description": "Last update timestamp",
            "x-oapi-codegen-extra-tags": {
              "json": "updatedAt,omitempty",
              "db": "updated_at"
            },
            "format": "date-time"
          },
          "deletedAt": {
            "type": "string",
            "description": "Deletion timestamp",
            "x-oapi-codegen-extra-tags": {
              "json": "deletedAt,omitempty",
              "db": "deleted_at"
            },
            "format": "date-time"
          }
        }
      },
      "MesheryInstancePage": {
        "type": "object",
        "description": "Paginated list of Meshery instances",
        "properties": {
          "mesheryInstances": {
            "type": "array",
            "description": "List of Meshery instances",
            "items": {
              "type": "object",
              "description": "Meshery server instance information",
              "properties": {
                "id": {
                  "type": "string",
                  "description": "Instance ID",
                  "x-oapi-codegen-extra-tags": {
                    "json": "id,omitempty",
                    "db": "id"
                  },
                  "maxLength": 500,
                  "format": "uuid"
                },
                "name": {
                  "type": "string",
                  "description": "Instance name",
                  "x-oapi-codegen-extra-tags": {
                    "json": "name,omitempty",
                    "db": "name"
                  },
                  "minLength": 1,
                  "maxLength": 255
                },
                "serverId": {
                  "type": "string",
                  "description": "Server ID",
                  "x-go-name": "ServerID",
                  "x-oapi-codegen-extra-tags": {
                    "json": "serverId,omitempty",
                    "db": "server_id"
                  },
                  "maxLength": 500,
                  "format": "uuid"
                },
                "serverVersion": {
                  "type": "string",
                  "description": "Meshery server version",
                  "x-oapi-codegen-extra-tags": {
                    "json": "serverVersion,omitempty",
                    "db": "server_version"
                  },
                  "maxLength": 500
                },
                "serverLocation": {
                  "type": "string",
                  "description": "Server location URL",
                  "x-oapi-codegen-extra-tags": {
                    "json": "serverLocation,omitempty",
                    "db": "server_location"
                  },
                  "maxLength": 500
                },
                "serverBuildSha": {
                  "type": "string",
                  "description": "Server build SHA",
                  "x-go-name": "ServerBuildSHA",
                  "x-oapi-codegen-extra-tags": {
                    "json": "serverBuildSha,omitempty",
                    "db": "server_build_sha"
                  },
                  "maxLength": 500
                },
                "createdAt": {
                  "type": "string",
                  "description": "Creation timestamp",
                  "x-oapi-codegen-extra-tags": {
                    "json": "createdAt,omitempty",
                    "db": "created_at"
                  },
                  "format": "date-time"
                },
                "updatedAt": {
                  "type": "string",
                  "description": "Last update timestamp",
                  "x-oapi-codegen-extra-tags": {
                    "json": "updatedAt,omitempty",
                    "db": "updated_at"
                  },
                  "format": "date-time"
                },
                "deletedAt": {
                  "type": "string",
                  "description": "Deletion timestamp",
                  "x-oapi-codegen-extra-tags": {
                    "json": "deletedAt,omitempty",
                    "db": "deleted_at"
                  },
                  "format": "date-time"
                }
              }
            },
            "x-oapi-codegen-extra-tags": {
              "json": "mesheryInstances"
            }
          },
          "page": {
            "type": "integer",
            "description": "Current page number",
            "x-oapi-codegen-extra-tags": {
              "json": "page"
            },
            "minimum": 0
          },
          "pageSize": {
            "type": "integer",
            "description": "Number of items per page",
            "x-oapi-codegen-extra-tags": {
              "json": "pageSize"
            },
            "minimum": 1
          },
          "totalCount": {
            "type": "integer",
            "description": "Total number of instances",
            "x-oapi-codegen-extra-tags": {
              "json": "totalCount"
            },
            "minimum": 0
          }
        },
        "required": [
          "mesheryInstances",
          "page",
          "pageSize",
          "totalCount"
        ]
      },
      "MesheryCompatibility": {
        "type": "object",
        "description": "Meshery version compatibility check",
        "properties": {
          "mesheryVersion": {
            "type": "string",
            "description": "Meshery version string",
            "x-oapi-codegen-extra-tags": {
              "json": "mesheryVersion,omitempty"
            },
            "maxLength": 500
          },
          "checkCompatibility": {
            "type": "boolean",
            "description": "Whether to check compatibility",
            "x-oapi-codegen-extra-tags": {
              "json": "checkCompatibility,omitempty"
            }
          }
        }
      }
    }
  }
};

export default ConnectionSchema;
