/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const KeySchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Key",
    "description": "OpenAPI schema for authorization key management in Meshery.",
    "version": "v1beta2",
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
  "tags": [
    {
      "name": "Key",
      "description": "Operations related to authorization keys"
    },
    {
      "name": "users",
      "description": "Operations related to users and their authorization keys"
    }
  ],
  "paths": {
    "/api/identity/orgs/{orgId}/users/keys": {
      "get": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "users"
        ],
        "operationId": "getUserKeys",
        "summary": "Get User Keys",
        "description": "Get all keys based on roles assigned to user",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
            "description": "Organization ID",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid",
              "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              }
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
          }
        ],
        "responses": {
          "200": {
            "description": "Returns user keys based on roles assigned to user",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A paginated list of authorization keys.",
                  "required": [
                    "page",
                    "pageSize",
                    "totalCount",
                    "keys"
                  ],
                  "properties": {
                    "page": {
                      "type": "integer",
                      "description": "Zero-based page index returned in this response.",
                      "minimum": 0,
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 1
                    },
                    "pageSize": {
                      "type": "integer",
                      "description": "Maximum number of items returned on each page.",
                      "minimum": 1,
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 2,
                      "x-oapi-codegen-extra-tags": {
                        "json": "pageSize"
                      }
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of items across all pages.",
                      "minimum": 0,
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 3,
                      "x-oapi-codegen-extra-tags": {
                        "json": "totalCount"
                      }
                    },
                    "keys": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "additionalProperties": false,
                        "description": "Represents an authorization key used for access control.",
                        "required": [
                          "id",
                          "owner",
                          "function",
                          "category",
                          "subcategory",
                          "description",
                          "createdAt",
                          "updatedAt"
                        ],
                        "properties": {
                          "id": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-go-name": "ID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "id",
                              "json": "id"
                            },
                            "x-order": 1
                          },
                          "owner": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-go-name": "Owner",
                            "x-oapi-codegen-extra-tags": {
                              "db": "owner",
                              "json": "owner"
                            },
                            "x-order": 2
                          },
                          "function": {
                            "type": "string",
                            "description": "Operation permitted by the key.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "function",
                              "json": "function"
                            },
                            "x-order": 3,
                            "maxLength": 500
                          },
                          "category": {
                            "type": "string",
                            "description": "Category for the key.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "category",
                              "json": "category"
                            },
                            "x-order": 4,
                            "maxLength": 500
                          },
                          "subcategory": {
                            "type": "string",
                            "description": "Subcategory for the key.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "subcategory",
                              "json": "subcategory"
                            },
                            "x-order": 5,
                            "maxLength": 500
                          },
                          "description": {
                            "type": "string",
                            "description": "Human readable description of the key.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "description",
                              "json": "description"
                            },
                            "x-order": 6,
                            "maxLength": 5000
                          },
                          "createdAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the key was created.",
                            "x-go-type": "time.Time",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "json": "createdAt"
                            },
                            "x-order": 7
                          },
                          "updatedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the key was last updated.",
                            "x-go-type": "time.Time",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "json": "updatedAt"
                            },
                            "x-order": 8
                          },
                          "deletedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the key was soft-deleted.",
                            "nullable": true,
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "json": "deletedAt,omitempty"
                            },
                            "x-order": 9
                          }
                        }
                      },
                      "x-order": 4,
                      "description": "Keys returned on the current page."
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
      }
    },
    "/api/auth/keys": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Key"
        ],
        "summary": "List key",
        "operationId": "getKeys",
        "parameters": [
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
          }
        ],
        "responses": {
          "200": {
            "description": "Keys fetched",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A paginated list of authorization keys.",
                  "required": [
                    "page",
                    "pageSize",
                    "totalCount",
                    "keys"
                  ],
                  "properties": {
                    "page": {
                      "type": "integer",
                      "description": "Zero-based page index returned in this response.",
                      "minimum": 0,
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 1
                    },
                    "pageSize": {
                      "type": "integer",
                      "description": "Maximum number of items returned on each page.",
                      "minimum": 1,
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 2,
                      "x-oapi-codegen-extra-tags": {
                        "json": "pageSize"
                      }
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of items across all pages.",
                      "minimum": 0,
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 3,
                      "x-oapi-codegen-extra-tags": {
                        "json": "totalCount"
                      }
                    },
                    "keys": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "additionalProperties": false,
                        "description": "Represents an authorization key used for access control.",
                        "required": [
                          "id",
                          "owner",
                          "function",
                          "category",
                          "subcategory",
                          "description",
                          "createdAt",
                          "updatedAt"
                        ],
                        "properties": {
                          "id": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-go-name": "ID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "id",
                              "json": "id"
                            },
                            "x-order": 1
                          },
                          "owner": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-go-name": "Owner",
                            "x-oapi-codegen-extra-tags": {
                              "db": "owner",
                              "json": "owner"
                            },
                            "x-order": 2
                          },
                          "function": {
                            "type": "string",
                            "description": "Operation permitted by the key.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "function",
                              "json": "function"
                            },
                            "x-order": 3,
                            "maxLength": 500
                          },
                          "category": {
                            "type": "string",
                            "description": "Category for the key.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "category",
                              "json": "category"
                            },
                            "x-order": 4,
                            "maxLength": 500
                          },
                          "subcategory": {
                            "type": "string",
                            "description": "Subcategory for the key.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "subcategory",
                              "json": "subcategory"
                            },
                            "x-order": 5,
                            "maxLength": 500
                          },
                          "description": {
                            "type": "string",
                            "description": "Human readable description of the key.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "description",
                              "json": "description"
                            },
                            "x-order": 6,
                            "maxLength": 5000
                          },
                          "createdAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the key was created.",
                            "x-go-type": "time.Time",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "json": "createdAt"
                            },
                            "x-order": 7
                          },
                          "updatedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the key was last updated.",
                            "x-go-type": "time.Time",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "json": "updatedAt"
                            },
                            "x-order": 8
                          },
                          "deletedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the key was soft-deleted.",
                            "nullable": true,
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "json": "deletedAt,omitempty"
                            },
                            "x-order": 9
                          }
                        }
                      },
                      "x-order": 4,
                      "description": "Keys returned on the current page."
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
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Key"
        ],
        "summary": "Create or update a key",
        "operationId": "upsertKey",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for creating or updating a key.",
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    },
                    "x-order": 1,
                    "x-oapi-codegen-extra-tags": {
                      "json": "id,omitempty"
                    }
                  },
                  "function": {
                    "type": "string",
                    "description": "Operation permitted by the key.",
                    "x-order": 2,
                    "maxLength": 500
                  },
                  "category": {
                    "type": "string",
                    "description": "Category for the key.",
                    "x-order": 3,
                    "maxLength": 500
                  },
                  "subcategory": {
                    "type": "string",
                    "description": "Subcategory for the key.",
                    "x-order": 4,
                    "maxLength": 500
                  },
                  "description": {
                    "type": "string",
                    "description": "Human readable description of the key.",
                    "x-order": 5,
                    "maxLength": 5000
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Key upserted",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": false,
                  "description": "Represents an authorization key used for access control.",
                  "required": [
                    "id",
                    "owner",
                    "function",
                    "category",
                    "subcategory",
                    "description",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-name": "ID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id",
                        "json": "id"
                      },
                      "x-order": 1
                    },
                    "owner": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-name": "Owner",
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner",
                        "json": "owner"
                      },
                      "x-order": 2
                    },
                    "function": {
                      "type": "string",
                      "description": "Operation permitted by the key.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "function",
                        "json": "function"
                      },
                      "x-order": 3,
                      "maxLength": 500
                    },
                    "category": {
                      "type": "string",
                      "description": "Category for the key.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "category",
                        "json": "category"
                      },
                      "x-order": 4,
                      "maxLength": 500
                    },
                    "subcategory": {
                      "type": "string",
                      "description": "Subcategory for the key.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "subcategory",
                        "json": "subcategory"
                      },
                      "x-order": 5,
                      "maxLength": 500
                    },
                    "description": {
                      "type": "string",
                      "description": "Human readable description of the key.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "description",
                        "json": "description"
                      },
                      "x-order": 6,
                      "maxLength": 5000
                    },
                    "createdAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the key was created.",
                      "x-go-type": "time.Time",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "createdAt"
                      },
                      "x-order": 7
                    },
                    "updatedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the key was last updated.",
                      "x-go-type": "time.Time",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updatedAt"
                      },
                      "x-order": 8
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the key was soft-deleted.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deletedAt,omitempty"
                      },
                      "x-order": 9
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
    "/api/auth/key/{keyId}": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Key"
        ],
        "summary": "Get key by ID",
        "operationId": "getKeyById",
        "parameters": [
          {
            "name": "keyId",
            "in": "path",
            "description": "Key ID",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid",
              "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Key response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": false,
                  "description": "Represents an authorization key used for access control.",
                  "required": [
                    "id",
                    "owner",
                    "function",
                    "category",
                    "subcategory",
                    "description",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-name": "ID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id",
                        "json": "id"
                      },
                      "x-order": 1
                    },
                    "owner": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-name": "Owner",
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner",
                        "json": "owner"
                      },
                      "x-order": 2
                    },
                    "function": {
                      "type": "string",
                      "description": "Operation permitted by the key.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "function",
                        "json": "function"
                      },
                      "x-order": 3,
                      "maxLength": 500
                    },
                    "category": {
                      "type": "string",
                      "description": "Category for the key.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "category",
                        "json": "category"
                      },
                      "x-order": 4,
                      "maxLength": 500
                    },
                    "subcategory": {
                      "type": "string",
                      "description": "Subcategory for the key.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "subcategory",
                        "json": "subcategory"
                      },
                      "x-order": 5,
                      "maxLength": 500
                    },
                    "description": {
                      "type": "string",
                      "description": "Human readable description of the key.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "description",
                        "json": "description"
                      },
                      "x-order": 6,
                      "maxLength": 5000
                    },
                    "createdAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the key was created.",
                      "x-go-type": "time.Time",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "createdAt"
                      },
                      "x-order": 7
                    },
                    "updatedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the key was last updated.",
                      "x-go-type": "time.Time",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updatedAt"
                      },
                      "x-order": 8
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the key was soft-deleted.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deletedAt,omitempty"
                      },
                      "x-order": 9
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
          "cloud"
        ],
        "tags": [
          "Key"
        ],
        "summary": "Delete key",
        "operationId": "deleteKey",
        "parameters": [
          {
            "name": "keyId",
            "in": "path",
            "description": "Key ID",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid",
              "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              }
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Key deleted"
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
    "parameters": {
      "orgId": {
        "name": "orgId",
        "in": "path",
        "description": "Organization ID",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid",
          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
          "x-go-type": "uuid.UUID",
          "x-go-type-import": {
            "path": "github.com/gofrs/uuid"
          }
        }
      },
      "keyId": {
        "name": "keyId",
        "in": "path",
        "description": "Key ID",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid",
          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
          "x-go-type": "uuid.UUID",
          "x-go-type-import": {
            "path": "github.com/gofrs/uuid"
          }
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
      "order": {
        "name": "order",
        "in": "query",
        "description": "Get ordered responses",
        "schema": {
          "type": "string"
        }
      },
      "search": {
        "name": "search",
        "in": "query",
        "description": "Get responses that match search param value",
        "schema": {
          "type": "string"
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
    "schemas": {
      "Key": {
        "type": "object",
        "additionalProperties": false,
        "description": "Represents an authorization key used for access control.",
        "required": [
          "id",
          "owner",
          "function",
          "category",
          "subcategory",
          "description",
          "createdAt",
          "updatedAt"
        ],
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-name": "ID",
            "x-oapi-codegen-extra-tags": {
              "db": "id",
              "json": "id"
            },
            "x-order": 1
          },
          "owner": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-name": "Owner",
            "x-oapi-codegen-extra-tags": {
              "db": "owner",
              "json": "owner"
            },
            "x-order": 2
          },
          "function": {
            "type": "string",
            "description": "Operation permitted by the key.",
            "x-oapi-codegen-extra-tags": {
              "db": "function",
              "json": "function"
            },
            "x-order": 3,
            "maxLength": 500
          },
          "category": {
            "type": "string",
            "description": "Category for the key.",
            "x-oapi-codegen-extra-tags": {
              "db": "category",
              "json": "category"
            },
            "x-order": 4,
            "maxLength": 500
          },
          "subcategory": {
            "type": "string",
            "description": "Subcategory for the key.",
            "x-oapi-codegen-extra-tags": {
              "db": "subcategory",
              "json": "subcategory"
            },
            "x-order": 5,
            "maxLength": 500
          },
          "description": {
            "type": "string",
            "description": "Human readable description of the key.",
            "x-oapi-codegen-extra-tags": {
              "db": "description",
              "json": "description"
            },
            "x-order": 6,
            "maxLength": 5000
          },
          "createdAt": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the key was created.",
            "x-go-type": "time.Time",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "created_at",
              "json": "createdAt"
            },
            "x-order": 7
          },
          "updatedAt": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the key was last updated.",
            "x-go-type": "time.Time",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at",
              "json": "updatedAt"
            },
            "x-order": 8
          },
          "deletedAt": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the key was soft-deleted.",
            "nullable": true,
            "x-go-type": "core.NullTime",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at",
              "json": "deletedAt,omitempty"
            },
            "x-order": 9
          }
        }
      },
      "KeyPayload": {
        "type": "object",
        "description": "Payload for creating or updating a key.",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-order": 1,
            "x-oapi-codegen-extra-tags": {
              "json": "id,omitempty"
            }
          },
          "function": {
            "type": "string",
            "description": "Operation permitted by the key.",
            "x-order": 2,
            "maxLength": 500
          },
          "category": {
            "type": "string",
            "description": "Category for the key.",
            "x-order": 3,
            "maxLength": 500
          },
          "subcategory": {
            "type": "string",
            "description": "Subcategory for the key.",
            "x-order": 4,
            "maxLength": 500
          },
          "description": {
            "type": "string",
            "description": "Human readable description of the key.",
            "x-order": 5,
            "maxLength": 5000
          }
        }
      },
      "KeyPage": {
        "type": "object",
        "description": "A paginated list of authorization keys.",
        "required": [
          "page",
          "pageSize",
          "totalCount",
          "keys"
        ],
        "properties": {
          "page": {
            "type": "integer",
            "description": "Zero-based page index returned in this response.",
            "minimum": 0,
            "x-go-type-skip-optional-pointer": true,
            "x-order": 1
          },
          "pageSize": {
            "type": "integer",
            "description": "Maximum number of items returned on each page.",
            "minimum": 1,
            "x-go-type-skip-optional-pointer": true,
            "x-order": 2,
            "x-oapi-codegen-extra-tags": {
              "json": "pageSize"
            }
          },
          "totalCount": {
            "type": "integer",
            "description": "Total number of items across all pages.",
            "minimum": 0,
            "x-go-type-skip-optional-pointer": true,
            "x-order": 3,
            "x-oapi-codegen-extra-tags": {
              "json": "totalCount"
            }
          },
          "keys": {
            "type": "array",
            "items": {
              "type": "object",
              "additionalProperties": false,
              "description": "Represents an authorization key used for access control.",
              "required": [
                "id",
                "owner",
                "function",
                "category",
                "subcategory",
                "description",
                "createdAt",
                "updatedAt"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-go-name": "ID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "id",
                    "json": "id"
                  },
                  "x-order": 1
                },
                "owner": {
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-go-name": "Owner",
                  "x-oapi-codegen-extra-tags": {
                    "db": "owner",
                    "json": "owner"
                  },
                  "x-order": 2
                },
                "function": {
                  "type": "string",
                  "description": "Operation permitted by the key.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "function",
                    "json": "function"
                  },
                  "x-order": 3,
                  "maxLength": 500
                },
                "category": {
                  "type": "string",
                  "description": "Category for the key.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "category",
                    "json": "category"
                  },
                  "x-order": 4,
                  "maxLength": 500
                },
                "subcategory": {
                  "type": "string",
                  "description": "Subcategory for the key.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "subcategory",
                    "json": "subcategory"
                  },
                  "x-order": 5,
                  "maxLength": 500
                },
                "description": {
                  "type": "string",
                  "description": "Human readable description of the key.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "description",
                    "json": "description"
                  },
                  "x-order": 6,
                  "maxLength": 5000
                },
                "createdAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Timestamp when the key was created.",
                  "x-go-type": "time.Time",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at",
                    "json": "createdAt"
                  },
                  "x-order": 7
                },
                "updatedAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Timestamp when the key was last updated.",
                  "x-go-type": "time.Time",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at",
                    "json": "updatedAt"
                  },
                  "x-order": 8
                },
                "deletedAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Timestamp when the key was soft-deleted.",
                  "nullable": true,
                  "x-go-type": "core.NullTime",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "deleted_at",
                    "json": "deletedAt,omitempty"
                  },
                  "x-order": 9
                }
              }
            },
            "x-order": 4,
            "description": "Keys returned on the current page."
          }
        }
      }
    }
  }
};

export default KeySchema;
