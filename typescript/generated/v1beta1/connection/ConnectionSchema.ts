/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const ConnectionSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Connection API",
    "description": "API for managing Meshery connections - managed and unmanaged resources tracked by Meshery.",
    "x-deprecated": true,
    "x-superseded-by": "v1beta2",
    "version": "v1beta1",
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
              "default": 0
            }
          },
          {
            "name": "pagesize",
            "in": "query",
            "description": "Number of items per page",
            "required": false,
            "schema": {
              "type": "integer",
              "default": 10
            }
          },
          {
            "name": "search",
            "in": "query",
            "description": "Search term",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "order",
            "in": "query",
            "description": "Sort order",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "filter",
            "in": "query",
            "description": "Filter connections (general filter string)",
            "required": false,
            "schema": {
              "type": "string"
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
                "type": "string"
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
                "type": "string"
              }
            }
          },
          {
            "name": "name",
            "in": "query",
            "description": "Filter by connection name (partial match supported)",
            "required": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Paginated list of connections with summary information",
            "content": {
              "application/json": {
                "schema": {
                  "$id": "https://schemas.meshery.io/connection_page.yaml",
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "description": "Represents a page of connections with meta information about connections count",
                  "additionalProperties": false,
                  "type": "object",
                  "required": [
                    "connections",
                    "total_count",
                    "page",
                    "page_size"
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
                      "x-order": 1
                    },
                    "total_count": {
                      "type": "integer",
                      "description": "Total number of connections on all pages",
                      "x-oapi-codegen-extra-tags": {
                        "json": "total_count",
                        "yaml": "total_count"
                      },
                      "x-order": 2
                    },
                    "page": {
                      "type": "integer",
                      "description": "Current page number",
                      "x-oapi-codegen-extra-tags": {
                        "json": "page",
                        "yaml": "page"
                      },
                      "x-order": 3
                    },
                    "page_size": {
                      "type": "integer",
                      "description": "Number of elements per page",
                      "x-oapi-codegen-extra-tags": {
                        "json": "page_size",
                        "yaml": "page_size"
                      },
                      "x-order": 4
                    },
                    "status_summary": {
                      "type": "object",
                      "description": "Aggregate count of connections grouped by status",
                      "additionalProperties": {
                        "type": "integer"
                      },
                      "x-go-type": "map[ConnectionStatus]int",
                      "x-oapi-codegen-extra-tags": {
                        "json": "status_summary,omitempty",
                        "yaml": "status_summary,omitempty"
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
                    }
                  },
                  "kind": {
                    "type": "string",
                    "description": "Connection kind",
                    "x-oapi-codegen-extra-tags": {
                      "json": "kind"
                    }
                  },
                  "type": {
                    "type": "string",
                    "description": "Connection type",
                    "x-oapi-codegen-extra-tags": {
                      "json": "type"
                    }
                  },
                  "subType": {
                    "type": "string",
                    "description": "Connection sub-type",
                    "x-oapi-codegen-extra-tags": {
                      "db": "sub_type",
                      "json": "subType"
                    }
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
                  "status": {
                    "type": "string",
                    "description": "Connection status",
                    "x-oapi-codegen-extra-tags": {
                      "json": "status"
                    }
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
                    }
                  },
                  "kind": {
                    "type": "string",
                    "description": "Connection kind",
                    "x-oapi-codegen-extra-tags": {
                      "json": "kind"
                    }
                  },
                  "type": {
                    "type": "string",
                    "description": "Connection type",
                    "x-oapi-codegen-extra-tags": {
                      "json": "type"
                    }
                  },
                  "subType": {
                    "type": "string",
                    "description": "Connection sub-type",
                    "x-oapi-codegen-extra-tags": {
                      "db": "sub_type",
                      "json": "subType"
                    }
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
                  "status": {
                    "type": "string",
                    "description": "Connection status",
                    "x-oapi-codegen-extra-tags": {
                      "json": "status"
                    }
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
      "connectionKind": {
        "name": "connectionKind",
        "in": "path",
        "required": true,
        "description": "Connection kind (meshery, kubernetes, prometheus, grafana, etc.)",
        "schema": {
          "type": "string"
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
      "page": {
        "name": "page",
        "in": "query",
        "description": "Page number",
        "required": false,
        "schema": {
          "type": "integer",
          "default": 0
        }
      },
      "pagesize": {
        "name": "pagesize",
        "in": "query",
        "description": "Number of items per page",
        "required": false,
        "schema": {
          "type": "integer",
          "default": 10
        }
      },
      "search": {
        "name": "search",
        "in": "query",
        "description": "Search term",
        "required": false,
        "schema": {
          "type": "string"
        }
      },
      "order": {
        "name": "order",
        "in": "query",
        "description": "Sort order",
        "required": false,
        "schema": {
          "type": "string"
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
      "ConnectionPage": {
        "$id": "https://schemas.meshery.io/connection_page.yaml",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "description": "Represents a page of connections with meta information about connections count",
        "additionalProperties": false,
        "type": "object",
        "required": [
          "connections",
          "total_count",
          "page",
          "page_size"
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
            "x-order": 1
          },
          "total_count": {
            "type": "integer",
            "description": "Total number of connections on all pages",
            "x-oapi-codegen-extra-tags": {
              "json": "total_count",
              "yaml": "total_count"
            },
            "x-order": 2
          },
          "page": {
            "type": "integer",
            "description": "Current page number",
            "x-oapi-codegen-extra-tags": {
              "json": "page",
              "yaml": "page"
            },
            "x-order": 3
          },
          "page_size": {
            "type": "integer",
            "description": "Number of elements per page",
            "x-oapi-codegen-extra-tags": {
              "json": "page_size",
              "yaml": "page_size"
            },
            "x-order": 4
          },
          "status_summary": {
            "type": "object",
            "description": "Aggregate count of connections grouped by status",
            "additionalProperties": {
              "type": "integer"
            },
            "x-go-type": "map[ConnectionStatus]int",
            "x-oapi-codegen-extra-tags": {
              "json": "status_summary,omitempty",
              "yaml": "status_summary,omitempty"
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
            }
          },
          "kind": {
            "type": "string",
            "description": "Connection kind",
            "x-oapi-codegen-extra-tags": {
              "json": "kind"
            }
          },
          "type": {
            "type": "string",
            "description": "Connection type",
            "x-oapi-codegen-extra-tags": {
              "json": "type"
            }
          },
          "subType": {
            "type": "string",
            "description": "Connection sub-type",
            "x-oapi-codegen-extra-tags": {
              "db": "sub_type",
              "json": "subType"
            }
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
          "status": {
            "type": "string",
            "description": "Connection status",
            "x-oapi-codegen-extra-tags": {
              "json": "status"
            }
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
            }
          },
          "count": {
            "type": "integer",
            "description": "Number of connections with this status",
            "x-oapi-codegen-extra-tags": {
              "json": "count",
              "db": "count"
            }
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
          "total_count": {
            "type": "integer",
            "description": "Total number of status entries",
            "x-oapi-codegen-extra-tags": {
              "json": "total_count"
            }
          },
          "page": {
            "type": "integer",
            "description": "Current page number",
            "x-oapi-codegen-extra-tags": {
              "json": "page"
            }
          },
          "page_size": {
            "type": "integer",
            "description": "Number of items per page",
            "x-oapi-codegen-extra-tags": {
              "json": "page_size"
            }
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
                  }
                },
                "count": {
                  "type": "integer",
                  "description": "Number of connections with this status",
                  "x-oapi-codegen-extra-tags": {
                    "json": "count",
                    "db": "count"
                  }
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
          "total_count",
          "page",
          "page_size",
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
            }
          },
          "name": {
            "type": "string",
            "description": "Instance name",
            "x-oapi-codegen-extra-tags": {
              "json": "name,omitempty",
              "db": "name"
            }
          },
          "server_id": {
            "type": "string",
            "description": "Server ID",
            "x-go-name": "ServerID",
            "x-oapi-codegen-extra-tags": {
              "json": "server_id,omitempty",
              "db": "server_id"
            }
          },
          "server_version": {
            "type": "string",
            "description": "Meshery server version",
            "x-oapi-codegen-extra-tags": {
              "json": "server_version,omitempty",
              "db": "server_version"
            }
          },
          "server_location": {
            "type": "string",
            "description": "Server location URL",
            "x-oapi-codegen-extra-tags": {
              "json": "server_location,omitempty",
              "db": "server_location"
            }
          },
          "server_build_sha": {
            "type": "string",
            "description": "Server build SHA",
            "x-go-name": "ServerBuildSHA",
            "x-oapi-codegen-extra-tags": {
              "json": "server_build_sha,omitempty",
              "db": "server_build_sha"
            }
          },
          "created_at": {
            "type": "string",
            "description": "Creation timestamp",
            "x-oapi-codegen-extra-tags": {
              "json": "created_at,omitempty",
              "db": "created_at"
            }
          },
          "updated_at": {
            "type": "string",
            "description": "Last update timestamp",
            "x-oapi-codegen-extra-tags": {
              "json": "updated_at,omitempty",
              "db": "updated_at"
            }
          },
          "deleted_at": {
            "type": "string",
            "description": "Deletion timestamp",
            "x-oapi-codegen-extra-tags": {
              "json": "deleted_at,omitempty",
              "db": "deleted_at"
            }
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
                  }
                },
                "name": {
                  "type": "string",
                  "description": "Instance name",
                  "x-oapi-codegen-extra-tags": {
                    "json": "name,omitempty",
                    "db": "name"
                  }
                },
                "server_id": {
                  "type": "string",
                  "description": "Server ID",
                  "x-go-name": "ServerID",
                  "x-oapi-codegen-extra-tags": {
                    "json": "server_id,omitempty",
                    "db": "server_id"
                  }
                },
                "server_version": {
                  "type": "string",
                  "description": "Meshery server version",
                  "x-oapi-codegen-extra-tags": {
                    "json": "server_version,omitempty",
                    "db": "server_version"
                  }
                },
                "server_location": {
                  "type": "string",
                  "description": "Server location URL",
                  "x-oapi-codegen-extra-tags": {
                    "json": "server_location,omitempty",
                    "db": "server_location"
                  }
                },
                "server_build_sha": {
                  "type": "string",
                  "description": "Server build SHA",
                  "x-go-name": "ServerBuildSHA",
                  "x-oapi-codegen-extra-tags": {
                    "json": "server_build_sha,omitempty",
                    "db": "server_build_sha"
                  }
                },
                "created_at": {
                  "type": "string",
                  "description": "Creation timestamp",
                  "x-oapi-codegen-extra-tags": {
                    "json": "created_at,omitempty",
                    "db": "created_at"
                  }
                },
                "updated_at": {
                  "type": "string",
                  "description": "Last update timestamp",
                  "x-oapi-codegen-extra-tags": {
                    "json": "updated_at,omitempty",
                    "db": "updated_at"
                  }
                },
                "deleted_at": {
                  "type": "string",
                  "description": "Deletion timestamp",
                  "x-oapi-codegen-extra-tags": {
                    "json": "deleted_at,omitempty",
                    "db": "deleted_at"
                  }
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
            }
          },
          "page_size": {
            "type": "integer",
            "description": "Number of items per page",
            "x-oapi-codegen-extra-tags": {
              "json": "page_size"
            }
          },
          "total_count": {
            "type": "integer",
            "description": "Total number of instances",
            "x-oapi-codegen-extra-tags": {
              "json": "total_count"
            }
          }
        },
        "required": [
          "mesheryInstances",
          "page",
          "page_size",
          "total_count"
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
            }
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
