/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const EnvironmentSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Environment",
    "description": "OpenAPI schema for environment management in Meshery Cloud.",
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
  "servers": [
    {
      "url": "http://localhost:9081",
      "description": "Meshery Server development server URL (controlled via PORT environment variable)"
    }
  ],
  "security": [
    {
      "jwt": []
    }
  ],
  "tags": [
    {
      "name": "environments",
      "description": "APIs for environments"
    }
  ],
  "components": {
    "responses": {
      "200": {
        "description": "ok",
        "content": {
          "text/plain": {
            "schema": {
              "type": "string"
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
    },
    "parameters": {
      "environmentId": {
        "name": "environmentId",
        "in": "path",
        "description": "Environment ID",
        "schema": {
          "type": "string",
          "format": "uuid",
          "x-go-type": "uuid.UUID",
          "x-go-type-import": {
            "path": "github.com/gofrs/uuid"
          },
          "x-go-type-skip-optional-pointer": true
        },
        "required": true
      },
      "search": {
        "name": "search",
        "in": "query",
        "description": "Get responses that match search param value",
        "schema": {
          "type": "string"
        }
      },
      "order": {
        "name": "order",
        "in": "query",
        "description": "Get ordered responses",
        "schema": {
          "type": "string"
        }
      },
      "page": {
        "name": "page",
        "in": "query",
        "description": "Get responses by page",
        "schema": {
          "type": "string"
        }
      },
      "pagesize": {
        "name": "pagesize",
        "in": "query",
        "description": "Get responses by pagesize",
        "schema": {
          "type": "string"
        }
      },
      "orgIdQuery": {
        "name": "orgId",
        "in": "query",
        "description": "User's organization ID",
        "schema": {
          "type": "string",
          "format": "uuid",
          "maxLength": 36
        },
        "required": true
      }
    },
    "securitySchemes": {
      "jwt": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    },
    "schemas": {
      "Environment": {
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
      "EnvironmentConnectionMapping": {
        "type": "object",
        "description": "Junction record linking an environment to a connection.",
        "properties": {
          "id": {
            "x-go-name": "ID",
            "description": "Mapping record ID.",
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "id",
              "json": "id"
            },
            "x-go-type-name": "GeneralId",
            "x-go-type-skip-optional-pointer": true
          },
          "environmentId": {
            "x-go-name": "EnvironmentID",
            "x-oapi-codegen-extra-tags": {
              "db": "environment_id",
              "json": "environmentId"
            },
            "x-go-type-skip-optional-pointer": true,
            "description": "ID of the associated environment.",
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "connectionId": {
            "x-go-name": "ConnectionID",
            "x-oapi-codegen-extra-tags": {
              "db": "connection_id",
              "json": "connectionId"
            },
            "x-go-type-skip-optional-pointer": true,
            "description": "ID of the associated connection.",
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "createdAt": {
            "description": "Timestamp when the mapping was created.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at",
              "json": "createdAt"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp when the mapping was last updated.",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at",
              "json": "updatedAt"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deletedAt": {
            "description": "Timestamp when the mapping was soft-deleted. Null while the mapping remains active.",
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at",
              "json": "deletedAt"
            },
            "x-go-type": "NullTime",
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "EnvironmentPayload": {
        "type": "object",
        "description": "Payload for creating or updating an environment.",
        "required": [
          "name",
          "organizationId"
        ],
        "properties": {
          "name": {
            "description": "An environment is a collection of resources. Provide a name that meaningfully represents these resources. You can change the name of the environment even after its creation.",
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "description": {
            "description": "An environment is a collection of resources, such as connections & credentials. Provide a detailed description to clarify the purpose of this environment and the types of resources it encompasses. You can modify the description at any time. Learn more about environments [here](https://docs.meshery.io/concepts/logical/environments).",
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "organizationId": {
            "type": "string",
            "description": "Select an organization in which you want to create this new environment. Keep in mind that the organization cannot be changed after creation.",
            "x-go-type-skip-optional-pointer": true,
            "x-go-name": "OrgId",
            "x-oapi-codegen-extra-tags": {
              "json": "organizationId"
            },
            "maxLength": 500,
            "format": "uuid"
          }
        }
      },
      "EnvironmentPage": {
        "type": "object",
        "description": "Paginated list of environments.",
        "properties": {
          "page": {
            "description": "Zero-based page index returned in this response.",
            "minimum": 0,
            "type": "integer",
            "x-go-type-skip-optional-pointer": true
          },
          "pageSize": {
            "description": "Maximum number of items returned on each page.",
            "minimum": 1,
            "x-oapi-codegen-extra-tags": {
              "json": "pageSize"
            },
            "type": "integer",
            "x-go-type-skip-optional-pointer": true
          },
          "totalCount": {
            "description": "Total number of items across all pages.",
            "minimum": 0,
            "x-oapi-codegen-extra-tags": {
              "json": "totalCount"
            },
            "type": "integer",
            "x-go-type-skip-optional-pointer": true
          },
          "environments": {
            "type": "array",
            "x-go-type-skip-optional-pointer": true,
            "items": {
              "x-go-type": "Environment",
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
            "description": "Environments associated with this resource."
          }
        }
      },
      "EnvironmentConnectionsPage": {
        "type": "object",
        "description": "Paginated list of connections associated with an environment.",
        "properties": {
          "page": {
            "type": "integer",
            "description": "Current page number of the result set.",
            "minimum": 0
          },
          "pageSize": {
            "type": "integer",
            "description": "Number of items per page.",
            "minimum": 1,
            "x-oapi-codegen-extra-tags": {
              "json": "pageSize"
            }
          },
          "totalCount": {
            "type": "integer",
            "description": "Total number of items available.",
            "minimum": 0,
            "x-oapi-codegen-extra-tags": {
              "json": "totalCount"
            }
          },
          "connections": {
            "type": "array",
            "items": {
              "type": "object",
              "additionalProperties": true
            },
            "description": "The connections of the environmentconnectionspage."
          }
        }
      }
    },
    "requestBodies": {
      "environmentPayload": {
        "description": "Body for creating environment",
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "description": "Payload for creating or updating an environment.",
              "required": [
                "name",
                "organizationId"
              ],
              "properties": {
                "name": {
                  "description": "An environment is a collection of resources. Provide a name that meaningfully represents these resources. You can change the name of the environment even after its creation.",
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "description": {
                  "description": "An environment is a collection of resources, such as connections & credentials. Provide a detailed description to clarify the purpose of this environment and the types of resources it encompasses. You can modify the description at any time. Learn more about environments [here](https://docs.meshery.io/concepts/logical/environments).",
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "organizationId": {
                  "type": "string",
                  "description": "Select an organization in which you want to create this new environment. Keep in mind that the organization cannot be changed after creation.",
                  "x-go-type-skip-optional-pointer": true,
                  "x-go-name": "OrgId",
                  "x-oapi-codegen-extra-tags": {
                    "json": "organizationId"
                  },
                  "maxLength": 500,
                  "format": "uuid"
                }
              }
            }
          }
        }
      }
    }
  },
  "paths": {
    "/api/environments": {
      "post": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "environments"
        ],
        "operationId": "createEnvironment",
        "summary": "Create an environment",
        "description": "Creates a new environment",
        "requestBody": {
          "description": "Body for creating environment",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for creating or updating an environment.",
                "required": [
                  "name",
                  "organizationId"
                ],
                "properties": {
                  "name": {
                    "description": "An environment is a collection of resources. Provide a name that meaningfully represents these resources. You can change the name of the environment even after its creation.",
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "description": {
                    "description": "An environment is a collection of resources, such as connections & credentials. Provide a detailed description to clarify the purpose of this environment and the types of resources it encompasses. You can modify the description at any time. Learn more about environments [here](https://docs.meshery.io/concepts/logical/environments).",
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "organizationId": {
                    "type": "string",
                    "description": "Select an organization in which you want to create this new environment. Keep in mind that the organization cannot be changed after creation.",
                    "x-go-type-skip-optional-pointer": true,
                    "x-go-name": "OrgId",
                    "x-oapi-codegen-extra-tags": {
                      "json": "organizationId"
                    },
                    "maxLength": 500,
                    "format": "uuid"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Created environment",
            "content": {
              "application/json": {
                "schema": {
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
      },
      "get": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "environments"
        ],
        "operationId": "getEnvironments",
        "summary": "Get all environments",
        "description": "Gets all environments",
        "parameters": [
          {
            "name": "search",
            "in": "query",
            "description": "Get responses that match search param value",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "order",
            "in": "query",
            "description": "Get ordered responses",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "page",
            "in": "query",
            "description": "Get responses by page",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "pagesize",
            "in": "query",
            "description": "Get responses by pagesize",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "orgId",
            "in": "query",
            "description": "User's organization ID",
            "schema": {
              "type": "string",
              "format": "uuid",
              "maxLength": 36
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "Environments",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated list of environments.",
                  "properties": {
                    "page": {
                      "description": "Zero-based page index returned in this response.",
                      "minimum": 0,
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "pageSize": {
                      "description": "Maximum number of items returned on each page.",
                      "minimum": 1,
                      "x-oapi-codegen-extra-tags": {
                        "json": "pageSize"
                      },
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "totalCount": {
                      "description": "Total number of items across all pages.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "json": "totalCount"
                      },
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "environments": {
                      "type": "array",
                      "x-go-type-skip-optional-pointer": true,
                      "items": {
                        "x-go-type": "Environment",
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
                      "description": "Environments associated with this resource."
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
      }
    },
    "/api/environments/{environmentId}": {
      "get": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "environments"
        ],
        "operationId": "getEnvironmentById",
        "summary": "Get environment by ID",
        "parameters": [
          {
            "name": "environmentId",
            "in": "path",
            "description": "Environment ID",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
              "x-go-type-skip-optional-pointer": true
            },
            "required": true
          },
          {
            "name": "orgId",
            "in": "query",
            "description": "User's organization ID",
            "schema": {
              "type": "string",
              "format": "uuid",
              "maxLength": 36
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "Environment page",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated list of environments.",
                  "properties": {
                    "page": {
                      "description": "Zero-based page index returned in this response.",
                      "minimum": 0,
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "pageSize": {
                      "description": "Maximum number of items returned on each page.",
                      "minimum": 1,
                      "x-oapi-codegen-extra-tags": {
                        "json": "pageSize"
                      },
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "totalCount": {
                      "description": "Total number of items across all pages.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "json": "totalCount"
                      },
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "environments": {
                      "type": "array",
                      "x-go-type-skip-optional-pointer": true,
                      "items": {
                        "x-go-type": "Environment",
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
                      "description": "Environments associated with this resource."
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
      "put": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "environments"
        ],
        "operationId": "updateEnvironment",
        "summary": "Update an environment",
        "parameters": [
          {
            "name": "environmentId",
            "in": "path",
            "description": "Environment ID",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
              "x-go-type-skip-optional-pointer": true
            },
            "required": true
          }
        ],
        "requestBody": {
          "description": "Body for creating environment",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for creating or updating an environment.",
                "required": [
                  "name",
                  "organizationId"
                ],
                "properties": {
                  "name": {
                    "description": "An environment is a collection of resources. Provide a name that meaningfully represents these resources. You can change the name of the environment even after its creation.",
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "description": {
                    "description": "An environment is a collection of resources, such as connections & credentials. Provide a detailed description to clarify the purpose of this environment and the types of resources it encompasses. You can modify the description at any time. Learn more about environments [here](https://docs.meshery.io/concepts/logical/environments).",
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "organizationId": {
                    "type": "string",
                    "description": "Select an organization in which you want to create this new environment. Keep in mind that the organization cannot be changed after creation.",
                    "x-go-type-skip-optional-pointer": true,
                    "x-go-name": "OrgId",
                    "x-oapi-codegen-extra-tags": {
                      "json": "organizationId"
                    },
                    "maxLength": 500,
                    "format": "uuid"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Environment page",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated list of environments.",
                  "properties": {
                    "page": {
                      "description": "Zero-based page index returned in this response.",
                      "minimum": 0,
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "pageSize": {
                      "description": "Maximum number of items returned on each page.",
                      "minimum": 1,
                      "x-oapi-codegen-extra-tags": {
                        "json": "pageSize"
                      },
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "totalCount": {
                      "description": "Total number of items across all pages.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "json": "totalCount"
                      },
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "environments": {
                      "type": "array",
                      "x-go-type-skip-optional-pointer": true,
                      "items": {
                        "x-go-type": "Environment",
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
                      "description": "Environments associated with this resource."
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
          "environments"
        ],
        "operationId": "deleteEnvironment",
        "summary": "Delete an environment",
        "parameters": [
          {
            "name": "environmentId",
            "in": "path",
            "description": "Environment ID",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
              "x-go-type-skip-optional-pointer": true
            },
            "required": true
          }
        ],
        "responses": {
          "204": {
            "description": "Environment deleted"
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
      }
    },
    "/api/environments/{environmentId}/connections": {
      "get": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "environments"
        ],
        "operationId": "getEnvironmentConnections",
        "summary": "Get environment connections",
        "parameters": [
          {
            "name": "environmentId",
            "in": "path",
            "description": "Environment ID",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
              "x-go-type-skip-optional-pointer": true
            },
            "required": true
          },
          {
            "name": "search",
            "in": "query",
            "description": "Get responses that match search param value",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "order",
            "in": "query",
            "description": "Get ordered responses",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "page",
            "in": "query",
            "description": "Get responses by page",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "pagesize",
            "in": "query",
            "description": "Get responses by pagesize",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "filter",
            "in": "query",
            "required": false,
            "description": "JSON-encoded filter string used to scope the connection listing.",
            "schema": {
              "type": "string",
              "maxLength": 4096
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Environment connections",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated list of connections associated with an environment.",
                  "properties": {
                    "page": {
                      "type": "integer",
                      "description": "Current page number of the result set.",
                      "minimum": 0
                    },
                    "pageSize": {
                      "type": "integer",
                      "description": "Number of items per page.",
                      "minimum": 1,
                      "x-oapi-codegen-extra-tags": {
                        "json": "pageSize"
                      }
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of items available.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "json": "totalCount"
                      }
                    },
                    "connections": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "additionalProperties": true
                      },
                      "description": "The connections of the environmentconnectionspage."
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
      }
    }
  }
};

export default EnvironmentSchema;
