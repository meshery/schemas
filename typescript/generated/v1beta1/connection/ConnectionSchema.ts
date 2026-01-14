/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const ConnectionSchema = {
  "openapi": "3.0.0",
  "info": {
    "title": "Connection API",
    "version": "v1beta1",
    "description": "API for managing Meshery connections - managed and unmanaged resources tracked by Meshery"
  },
  "paths": {
    "/api/integrations/connections": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Connections"
        ],
        "operationId": "GetConnections",
        "summary": "Get all connections",
        "description": "Returns a paginated list of connections for the authenticated user",
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
            "description": "Filter connections",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "kind",
            "in": "query",
            "description": "Filter by connection kind",
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
          }
        ],
        "responses": {
          "200": {
            "description": "List of connections",
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
                      "items": {
                        "x-go-type": "*Connection",
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
                          "sub_type",
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
                          "credential_id": {
                            "x-go-name": "CredentialID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "credential_id",
                              "yaml": "credential_id"
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
                          "sub_type": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "sub_type",
                              "yaml": "sub_type"
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
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core"
                            },
                            "x-order": 12,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "environments": {
                            "type": "array",
                            "description": "Associated environments for this connection",
                            "items": {
                              "x-go-type": "*environment.Environment",
                              "x-go-type-import": {
                                "path": "github.com/meshery/schemas/models/v1beta1/environment"
                              },
                              "$id": "https://schemas.meshery.io/environment.yaml",
                              "$schema": "http://json-schema.org/draft-07/schema#",
                              "description": "Meshery Environments allow you to logically group related Connections and their associated Credentials.. Learn more at https://docs.meshery.io/concepts/logical/environments",
                              "additionalProperties": false,
                              "type": "object",
                              "required": [
                                "id",
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
                                "name": {
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "name",
                                    "yaml": "name"
                                  },
                                  "x-order": 2,
                                  "type": "string",
                                  "description": "Environment name"
                                },
                                "description": {
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "description",
                                    "yaml": "description"
                                  },
                                  "x-order": 3,
                                  "type": "string",
                                  "description": "Environment description"
                                },
                                "organization_id": {
                                  "x-go-name": "OrganizationID",
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "organization_id",
                                    "yaml": "organization_id"
                                  },
                                  "x-order": 4,
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
                                  "x-order": 5,
                                  "description": "Environment owner",
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
                                  "x-order": 6,
                                  "type": "string",
                                  "format": "date-time",
                                  "x-go-type-skip-optional-pointer": true
                                },
                                "metadata": {
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "metadata",
                                    "yaml": "metadata"
                                  },
                                  "x-order": 7,
                                  "x-go-type": "core.Map",
                                  "x-go-type-skip-optional-pointer": true,
                                  "type": "object"
                                },
                                "updated_at": {
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "updated_at",
                                    "yaml": "updated_at"
                                  },
                                  "x-order": 8,
                                  "type": "string",
                                  "format": "date-time",
                                  "x-go-type-skip-optional-pointer": true
                                },
                                "deleted_at": {
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "deleted_at",
                                    "yaml": "deleted_at"
                                  },
                                  "x-go-type": "core.NullTime",
                                  "x-go-import": "database/sql",
                                  "x-order": 9,
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
                            "pattern": "([a-z.])*(?!^/)v(alpha|beta|[0-9]+)([.-]*[a-z0-9]+)*$",
                            "example": [
                              "v1",
                              "v1alpha1",
                              "v2beta3",
                              "v1.custom-suffix"
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
                    }
                  }
                }
              }
            }
          },
          "500": {
            "description": "Server error"
          }
        }
      },
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Connections"
        ],
        "operationId": "RegisterConnection",
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
                  "sub_type": {
                    "type": "string",
                    "description": "Connection sub-type",
                    "x-oapi-codegen-extra-tags": {
                      "json": "sub_type"
                    }
                  },
                  "credential_secret": {
                    "type": "object",
                    "description": "Credential secret data",
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "credential_secret"
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
                  "credential_id": {
                    "type": "string",
                    "format": "uuid",
                    "description": "Associated credential ID",
                    "x-go-name": "CredentialID",
                    "x-go-type": "*uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    },
                    "x-oapi-codegen-extra-tags": {
                      "json": "credential_id,omitempty"
                    }
                  }
                },
                "required": [
                  "name",
                  "kind",
                  "type",
                  "sub_type",
                  "status"
                ]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Connection registered successfully",
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
                    "sub_type",
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
                    "credential_id": {
                      "x-go-name": "CredentialID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "credential_id",
                        "yaml": "credential_id"
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
                    "sub_type": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "sub_type",
                        "yaml": "sub_type"
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
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-order": 12,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "environments": {
                      "type": "array",
                      "description": "Associated environments for this connection",
                      "items": {
                        "x-go-type": "*environment.Environment",
                        "x-go-type-import": {
                          "path": "github.com/meshery/schemas/models/v1beta1/environment"
                        },
                        "$id": "https://schemas.meshery.io/environment.yaml",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "description": "Meshery Environments allow you to logically group related Connections and their associated Credentials.. Learn more at https://docs.meshery.io/concepts/logical/environments",
                        "additionalProperties": false,
                        "type": "object",
                        "required": [
                          "id",
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
                          "name": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "name",
                              "yaml": "name"
                            },
                            "x-order": 2,
                            "type": "string",
                            "description": "Environment name"
                          },
                          "description": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "description",
                              "yaml": "description"
                            },
                            "x-order": 3,
                            "type": "string",
                            "description": "Environment description"
                          },
                          "organization_id": {
                            "x-go-name": "OrganizationID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "organization_id",
                              "yaml": "organization_id"
                            },
                            "x-order": 4,
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
                            "x-order": 5,
                            "description": "Environment owner",
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
                            "x-order": 6,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "metadata": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "metadata",
                              "yaml": "metadata"
                            },
                            "x-order": 7,
                            "x-go-type": "core.Map",
                            "x-go-type-skip-optional-pointer": true,
                            "type": "object"
                          },
                          "updated_at": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "yaml": "updated_at"
                            },
                            "x-order": 8,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deleted_at": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "yaml": "deleted_at"
                            },
                            "x-go-type": "core.NullTime",
                            "x-go-import": "database/sql",
                            "x-order": 9,
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
                      "pattern": "([a-z.])*(?!^/)v(alpha|beta|[0-9]+)([.-]*[a-z0-9]+)*$",
                      "example": [
                        "v1",
                        "v1alpha1",
                        "v2beta3",
                        "v1.custom-suffix"
                      ]
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Invalid request parameters"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/api/integrations/connections/{connectionKind}": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Connections"
        ],
        "operationId": "GetConnectionsByKind",
        "summary": "Get connections by kind",
        "description": "Returns connections filtered by kind (meshery, kubernetes, etc.)",
        "parameters": [
          {
            "name": "connectionKind",
            "in": "path",
            "required": true,
            "description": "Connection kind (meshery, kubernetes, prometheus, grafana, etc.)",
            "schema": {
              "type": "string"
            }
          },
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
            "name": "status",
            "in": "query",
            "description": "Filter by connection status",
            "required": false,
            "schema": {
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
          },
          {
            "name": "meshery_instance_id",
            "in": "query",
            "description": "Filter by Meshery instance ID (for kubernetes connections)",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "with_credentials",
            "in": "query",
            "description": "Include credentials in response (for kubernetes connections)",
            "required": false,
            "schema": {
              "type": "boolean"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "List of connections by kind",
            "content": {
              "application/json": {
                "schema": {
                  "oneOf": [
                    {
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
                          "items": {
                            "x-go-type": "*Connection",
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
                              "sub_type",
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
                              "credential_id": {
                                "x-go-name": "CredentialID",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "credential_id",
                                  "yaml": "credential_id"
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
                              "sub_type": {
                                "x-oapi-codegen-extra-tags": {
                                  "db": "sub_type",
                                  "yaml": "sub_type"
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
                                "x-go-type": "core.NullTime",
                                "x-go-type-import": {
                                  "path": "github.com/meshery/schemas/models/core"
                                },
                                "x-order": 12,
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "environments": {
                                "type": "array",
                                "description": "Associated environments for this connection",
                                "items": {
                                  "x-go-type": "*environment.Environment",
                                  "x-go-type-import": {
                                    "path": "github.com/meshery/schemas/models/v1beta1/environment"
                                  },
                                  "$id": "https://schemas.meshery.io/environment.yaml",
                                  "$schema": "http://json-schema.org/draft-07/schema#",
                                  "description": "Meshery Environments allow you to logically group related Connections and their associated Credentials.. Learn more at https://docs.meshery.io/concepts/logical/environments",
                                  "additionalProperties": false,
                                  "type": "object",
                                  "required": [
                                    "id",
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
                                    "name": {
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "name",
                                        "yaml": "name"
                                      },
                                      "x-order": 2,
                                      "type": "string",
                                      "description": "Environment name"
                                    },
                                    "description": {
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "description",
                                        "yaml": "description"
                                      },
                                      "x-order": 3,
                                      "type": "string",
                                      "description": "Environment description"
                                    },
                                    "organization_id": {
                                      "x-go-name": "OrganizationID",
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "organization_id",
                                        "yaml": "organization_id"
                                      },
                                      "x-order": 4,
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
                                      "x-order": 5,
                                      "description": "Environment owner",
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
                                      "x-order": 6,
                                      "type": "string",
                                      "format": "date-time",
                                      "x-go-type-skip-optional-pointer": true
                                    },
                                    "metadata": {
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "metadata",
                                        "yaml": "metadata"
                                      },
                                      "x-order": 7,
                                      "x-go-type": "core.Map",
                                      "x-go-type-skip-optional-pointer": true,
                                      "type": "object"
                                    },
                                    "updated_at": {
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "updated_at",
                                        "yaml": "updated_at"
                                      },
                                      "x-order": 8,
                                      "type": "string",
                                      "format": "date-time",
                                      "x-go-type-skip-optional-pointer": true
                                    },
                                    "deleted_at": {
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "deleted_at",
                                        "yaml": "deleted_at"
                                      },
                                      "x-go-type": "core.NullTime",
                                      "x-go-import": "database/sql",
                                      "x-order": 9,
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
                                "pattern": "([a-z.])*(?!^/)v(alpha|beta|[0-9]+)([.-]*[a-z0-9]+)*$",
                                "example": [
                                  "v1",
                                  "v1alpha1",
                                  "v2beta3",
                                  "v1.custom-suffix"
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
                        }
                      }
                    },
                    {
                      "type": "object",
                      "description": "Paginated list of Meshery instances",
                      "properties": {
                        "meshery_instances": {
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
                            "json": "meshery_instances"
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
                        "meshery_instances",
                        "page",
                        "page_size",
                        "total_count"
                      ]
                    }
                  ]
                }
              }
            }
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/api/integrations/connections/status": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Connections"
        ],
        "operationId": "GetConnectionsStatus",
        "summary": "Get connections status summary",
        "description": "Returns aggregated status information for all connections",
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
          }
        ],
        "responses": {
          "200": {
            "description": "Connection status summary",
            "content": {
              "application/json": {
                "schema": {
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
                    "connections_status": {
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
                        "json": "connections_status"
                      }
                    }
                  },
                  "required": [
                    "total_count",
                    "page",
                    "page_size",
                    "connections_status"
                  ]
                }
              }
            }
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/api/integrations/connections/status/{connectionId}": {
      "put": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Connections"
        ],
        "operationId": "UpdateConnectionStatusByID",
        "summary": "Update connection status",
        "description": "Update the status of a specific connection",
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
            "text/plain": {
              "schema": {
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
          }
        },
        "responses": {
          "200": {
            "description": "Connection status updated successfully",
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
                      "items": {
                        "x-go-type": "*Connection",
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
                          "sub_type",
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
                          "credential_id": {
                            "x-go-name": "CredentialID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "credential_id",
                              "yaml": "credential_id"
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
                          "sub_type": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "sub_type",
                              "yaml": "sub_type"
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
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core"
                            },
                            "x-order": 12,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "environments": {
                            "type": "array",
                            "description": "Associated environments for this connection",
                            "items": {
                              "x-go-type": "*environment.Environment",
                              "x-go-type-import": {
                                "path": "github.com/meshery/schemas/models/v1beta1/environment"
                              },
                              "$id": "https://schemas.meshery.io/environment.yaml",
                              "$schema": "http://json-schema.org/draft-07/schema#",
                              "description": "Meshery Environments allow you to logically group related Connections and their associated Credentials.. Learn more at https://docs.meshery.io/concepts/logical/environments",
                              "additionalProperties": false,
                              "type": "object",
                              "required": [
                                "id",
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
                                "name": {
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "name",
                                    "yaml": "name"
                                  },
                                  "x-order": 2,
                                  "type": "string",
                                  "description": "Environment name"
                                },
                                "description": {
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "description",
                                    "yaml": "description"
                                  },
                                  "x-order": 3,
                                  "type": "string",
                                  "description": "Environment description"
                                },
                                "organization_id": {
                                  "x-go-name": "OrganizationID",
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "organization_id",
                                    "yaml": "organization_id"
                                  },
                                  "x-order": 4,
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
                                  "x-order": 5,
                                  "description": "Environment owner",
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
                                  "x-order": 6,
                                  "type": "string",
                                  "format": "date-time",
                                  "x-go-type-skip-optional-pointer": true
                                },
                                "metadata": {
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "metadata",
                                    "yaml": "metadata"
                                  },
                                  "x-order": 7,
                                  "x-go-type": "core.Map",
                                  "x-go-type-skip-optional-pointer": true,
                                  "type": "object"
                                },
                                "updated_at": {
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "updated_at",
                                    "yaml": "updated_at"
                                  },
                                  "x-order": 8,
                                  "type": "string",
                                  "format": "date-time",
                                  "x-go-type-skip-optional-pointer": true
                                },
                                "deleted_at": {
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "deleted_at",
                                    "yaml": "deleted_at"
                                  },
                                  "x-go-type": "core.NullTime",
                                  "x-go-import": "database/sql",
                                  "x-order": 9,
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
                            "pattern": "([a-z.])*(?!^/)v(alpha|beta|[0-9]+)([.-]*[a-z0-9]+)*$",
                            "example": [
                              "v1",
                              "v1alpha1",
                              "v2beta3",
                              "v1.custom-suffix"
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
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "Connection not found"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/api/integrations/connections/{connectionKind}/{connectionId}": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Connections"
        ],
        "operationId": "GetConnectionByID",
        "summary": "Get connection by ID",
        "description": "Returns a specific connection by kind and ID",
        "parameters": [
          {
            "name": "connectionKind",
            "in": "path",
            "required": true,
            "description": "Connection kind (meshery, kubernetes, prometheus, grafana, etc.)",
            "schema": {
              "type": "string"
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
                    "sub_type",
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
                    "credential_id": {
                      "x-go-name": "CredentialID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "credential_id",
                        "yaml": "credential_id"
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
                    "sub_type": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "sub_type",
                        "yaml": "sub_type"
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
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-order": 12,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "environments": {
                      "type": "array",
                      "description": "Associated environments for this connection",
                      "items": {
                        "x-go-type": "*environment.Environment",
                        "x-go-type-import": {
                          "path": "github.com/meshery/schemas/models/v1beta1/environment"
                        },
                        "$id": "https://schemas.meshery.io/environment.yaml",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "description": "Meshery Environments allow you to logically group related Connections and their associated Credentials.. Learn more at https://docs.meshery.io/concepts/logical/environments",
                        "additionalProperties": false,
                        "type": "object",
                        "required": [
                          "id",
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
                          "name": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "name",
                              "yaml": "name"
                            },
                            "x-order": 2,
                            "type": "string",
                            "description": "Environment name"
                          },
                          "description": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "description",
                              "yaml": "description"
                            },
                            "x-order": 3,
                            "type": "string",
                            "description": "Environment description"
                          },
                          "organization_id": {
                            "x-go-name": "OrganizationID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "organization_id",
                              "yaml": "organization_id"
                            },
                            "x-order": 4,
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
                            "x-order": 5,
                            "description": "Environment owner",
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
                            "x-order": 6,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "metadata": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "metadata",
                              "yaml": "metadata"
                            },
                            "x-order": 7,
                            "x-go-type": "core.Map",
                            "x-go-type-skip-optional-pointer": true,
                            "type": "object"
                          },
                          "updated_at": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "yaml": "updated_at"
                            },
                            "x-order": 8,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deleted_at": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "yaml": "deleted_at"
                            },
                            "x-go-type": "core.NullTime",
                            "x-go-import": "database/sql",
                            "x-order": 9,
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
                      "pattern": "([a-z.])*(?!^/)v(alpha|beta|[0-9]+)([.-]*[a-z0-9]+)*$",
                      "example": [
                        "v1",
                        "v1alpha1",
                        "v2beta3",
                        "v1.custom-suffix"
                      ]
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "Connection not found"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/api/integrations/connections/{connectionId}": {
      "put": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Connections"
        ],
        "operationId": "UpdateConnection",
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
                  "sub_type": {
                    "type": "string",
                    "description": "Connection sub-type",
                    "x-oapi-codegen-extra-tags": {
                      "json": "sub_type"
                    }
                  },
                  "credential_secret": {
                    "type": "object",
                    "description": "Credential secret data",
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "credential_secret"
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
                  "credential_id": {
                    "type": "string",
                    "format": "uuid",
                    "description": "Associated credential ID",
                    "x-go-name": "CredentialID",
                    "x-go-type": "*uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    },
                    "x-oapi-codegen-extra-tags": {
                      "json": "credential_id,omitempty"
                    }
                  }
                },
                "required": [
                  "name",
                  "kind",
                  "type",
                  "sub_type",
                  "status"
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Connection updated successfully",
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
                    "sub_type",
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
                    "credential_id": {
                      "x-go-name": "CredentialID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "credential_id",
                        "yaml": "credential_id"
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
                    "sub_type": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "sub_type",
                        "yaml": "sub_type"
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
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-order": 12,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "environments": {
                      "type": "array",
                      "description": "Associated environments for this connection",
                      "items": {
                        "x-go-type": "*environment.Environment",
                        "x-go-type-import": {
                          "path": "github.com/meshery/schemas/models/v1beta1/environment"
                        },
                        "$id": "https://schemas.meshery.io/environment.yaml",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "description": "Meshery Environments allow you to logically group related Connections and their associated Credentials.. Learn more at https://docs.meshery.io/concepts/logical/environments",
                        "additionalProperties": false,
                        "type": "object",
                        "required": [
                          "id",
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
                          "name": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "name",
                              "yaml": "name"
                            },
                            "x-order": 2,
                            "type": "string",
                            "description": "Environment name"
                          },
                          "description": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "description",
                              "yaml": "description"
                            },
                            "x-order": 3,
                            "type": "string",
                            "description": "Environment description"
                          },
                          "organization_id": {
                            "x-go-name": "OrganizationID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "organization_id",
                              "yaml": "organization_id"
                            },
                            "x-order": 4,
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
                            "x-order": 5,
                            "description": "Environment owner",
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
                            "x-order": 6,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "metadata": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "metadata",
                              "yaml": "metadata"
                            },
                            "x-order": 7,
                            "x-go-type": "core.Map",
                            "x-go-type-skip-optional-pointer": true,
                            "type": "object"
                          },
                          "updated_at": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "yaml": "updated_at"
                            },
                            "x-order": 8,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deleted_at": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "yaml": "deleted_at"
                            },
                            "x-go-type": "core.NullTime",
                            "x-go-import": "database/sql",
                            "x-order": 9,
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
                      "pattern": "([a-z.])*(?!^/)v(alpha|beta|[0-9]+)([.-]*[a-z0-9]+)*$",
                      "example": [
                        "v1",
                        "v1alpha1",
                        "v2beta3",
                        "v1.custom-suffix"
                      ]
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "Connection not found"
          },
          "500": {
            "description": "Server error"
          }
        }
      },
      "delete": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Connections"
        ],
        "operationId": "DeleteConnection",
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
            "description": "Connection deleted successfully"
          },
          "404": {
            "description": "Connection not found"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/api/integrations/connections/meshery/{mesheryServerId}": {
      "delete": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Connections"
        ],
        "operationId": "DeleteMesheryConnection",
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
            "description": "Meshery connection deleted successfully"
          },
          "404": {
            "description": "Connection not found"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/api/integrations/connections/kubernetes/{connectionId}/context": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Connections"
        ],
        "operationId": "GetKubernetesContext",
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
          "404": {
            "description": "Connection not found"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/api/environments/{environmentId}/connections/{connectionId}": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Connections"
        ],
        "operationId": "AddConnectionToEnvironment",
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
          "200": {
            "description": "Connection added to environment successfully"
          },
          "404": {
            "description": "Connection or environment not found"
          },
          "500": {
            "description": "Server error"
          }
        }
      },
      "delete": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Connections"
        ],
        "operationId": "RemoveConnectionFromEnvironment",
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
            "description": "Connection removed from environment successfully"
          },
          "404": {
            "description": "Connection or environment not found"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    }
  },
  "components": {
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
          "sub_type",
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
          "credential_id": {
            "x-go-name": "CredentialID",
            "x-oapi-codegen-extra-tags": {
              "db": "credential_id",
              "yaml": "credential_id"
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
          "sub_type": {
            "x-oapi-codegen-extra-tags": {
              "db": "sub_type",
              "yaml": "sub_type"
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
            "x-go-type": "core.NullTime",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core"
            },
            "x-order": 12,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "environments": {
            "type": "array",
            "description": "Associated environments for this connection",
            "items": {
              "x-go-type": "*environment.Environment",
              "x-go-type-import": {
                "path": "github.com/meshery/schemas/models/v1beta1/environment"
              },
              "$id": "https://schemas.meshery.io/environment.yaml",
              "$schema": "http://json-schema.org/draft-07/schema#",
              "description": "Meshery Environments allow you to logically group related Connections and their associated Credentials.. Learn more at https://docs.meshery.io/concepts/logical/environments",
              "additionalProperties": false,
              "type": "object",
              "required": [
                "id",
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
                "name": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "name",
                    "yaml": "name"
                  },
                  "x-order": 2,
                  "type": "string",
                  "description": "Environment name"
                },
                "description": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "description",
                    "yaml": "description"
                  },
                  "x-order": 3,
                  "type": "string",
                  "description": "Environment description"
                },
                "organization_id": {
                  "x-go-name": "OrganizationID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "organization_id",
                    "yaml": "organization_id"
                  },
                  "x-order": 4,
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
                  "x-order": 5,
                  "description": "Environment owner",
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
                  "x-order": 6,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "metadata": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "metadata",
                    "yaml": "metadata"
                  },
                  "x-order": 7,
                  "x-go-type": "core.Map",
                  "x-go-type-skip-optional-pointer": true,
                  "type": "object"
                },
                "updated_at": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at",
                    "yaml": "updated_at"
                  },
                  "x-order": 8,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "deleted_at": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "deleted_at",
                    "yaml": "deleted_at"
                  },
                  "x-go-type": "core.NullTime",
                  "x-go-import": "database/sql",
                  "x-order": 9,
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
            "pattern": "([a-z.])*(?!^/)v(alpha|beta|[0-9]+)([.-]*[a-z0-9]+)*$",
            "example": [
              "v1",
              "v1alpha1",
              "v2beta3",
              "v1.custom-suffix"
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
            "items": {
              "x-go-type": "*Connection",
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
                "sub_type",
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
                "credential_id": {
                  "x-go-name": "CredentialID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "credential_id",
                    "yaml": "credential_id"
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
                "sub_type": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "sub_type",
                    "yaml": "sub_type"
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
                  "x-go-type": "core.NullTime",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core"
                  },
                  "x-order": 12,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "environments": {
                  "type": "array",
                  "description": "Associated environments for this connection",
                  "items": {
                    "x-go-type": "*environment.Environment",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/v1beta1/environment"
                    },
                    "$id": "https://schemas.meshery.io/environment.yaml",
                    "$schema": "http://json-schema.org/draft-07/schema#",
                    "description": "Meshery Environments allow you to logically group related Connections and their associated Credentials.. Learn more at https://docs.meshery.io/concepts/logical/environments",
                    "additionalProperties": false,
                    "type": "object",
                    "required": [
                      "id",
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
                      "name": {
                        "x-oapi-codegen-extra-tags": {
                          "db": "name",
                          "yaml": "name"
                        },
                        "x-order": 2,
                        "type": "string",
                        "description": "Environment name"
                      },
                      "description": {
                        "x-oapi-codegen-extra-tags": {
                          "db": "description",
                          "yaml": "description"
                        },
                        "x-order": 3,
                        "type": "string",
                        "description": "Environment description"
                      },
                      "organization_id": {
                        "x-go-name": "OrganizationID",
                        "x-oapi-codegen-extra-tags": {
                          "db": "organization_id",
                          "yaml": "organization_id"
                        },
                        "x-order": 4,
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
                        "x-order": 5,
                        "description": "Environment owner",
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
                        "x-order": 6,
                        "type": "string",
                        "format": "date-time",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "metadata": {
                        "x-oapi-codegen-extra-tags": {
                          "db": "metadata",
                          "yaml": "metadata"
                        },
                        "x-order": 7,
                        "x-go-type": "core.Map",
                        "x-go-type-skip-optional-pointer": true,
                        "type": "object"
                      },
                      "updated_at": {
                        "x-oapi-codegen-extra-tags": {
                          "db": "updated_at",
                          "yaml": "updated_at"
                        },
                        "x-order": 8,
                        "type": "string",
                        "format": "date-time",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "deleted_at": {
                        "x-oapi-codegen-extra-tags": {
                          "db": "deleted_at",
                          "yaml": "deleted_at"
                        },
                        "x-go-type": "core.NullTime",
                        "x-go-import": "database/sql",
                        "x-order": 9,
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
                  "pattern": "([a-z.])*(?!^/)v(alpha|beta|[0-9]+)([.-]*[a-z0-9]+)*$",
                  "example": [
                    "v1",
                    "v1alpha1",
                    "v2beta3",
                    "v1.custom-suffix"
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
          "sub_type": {
            "type": "string",
            "description": "Connection sub-type",
            "x-oapi-codegen-extra-tags": {
              "json": "sub_type"
            }
          },
          "credential_secret": {
            "type": "object",
            "description": "Credential secret data",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "credential_secret"
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
          "credential_id": {
            "type": "string",
            "format": "uuid",
            "description": "Associated credential ID",
            "x-go-name": "CredentialID",
            "x-go-type": "*uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "json": "credential_id,omitempty"
            }
          }
        },
        "required": [
          "name",
          "kind",
          "type",
          "sub_type",
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
          "connections_status": {
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
              "json": "connections_status"
            }
          }
        },
        "required": [
          "total_count",
          "page",
          "page_size",
          "connections_status"
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
          "meshery_instances": {
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
              "json": "meshery_instances"
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
          "meshery_instances",
          "page",
          "page_size",
          "total_count"
        ]
      },
      "MesheryCompatibility": {
        "type": "object",
        "description": "Meshery version compatibility check",
        "properties": {
          "meshery_version": {
            "type": "string",
            "description": "Meshery version string",
            "x-oapi-codegen-extra-tags": {
              "json": "meshery_version,omitempty"
            }
          },
          "check_compatibility": {
            "type": "boolean",
            "description": "Whether to check compatibility",
            "x-oapi-codegen-extra-tags": {
              "json": "check_compatibility,omitempty"
            }
          }
        }
      }
    }
  }
} as const;

export default ConnectionSchema;
