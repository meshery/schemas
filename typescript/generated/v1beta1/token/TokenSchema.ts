/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const TokenSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "token",
    "description": "Documentation for Meshery Cloud REST APIs for user tokens and sessions",
    "x-deprecated": true,
    "x-superseded-by": "v1beta2",
    "contact": {
      "name": "Meshery Maintainers",
      "email": "maintainers@meshery.io",
      "url": "https://meshery.io"
    },
    "license": {
      "name": "Apache 2.0",
      "url": "https://www.apache.org/licenses/LICENSE-2.0.html"
    },
    "version": "v1beta1"
  },
  "servers": [
    {
      "url": "https://cloud.layer5.io",
      "description": "Meshery Cloud production server URL"
    },
    {
      "url": "https://staging-cloud.layer5.io",
      "description": "Meshery Cloud staging server URL"
    },
    {
      "url": "http://localhost:9876",
      "description": "Meshery Cloud development server URL"
    }
  ],
  "security": [
    {
      "jwt": []
    }
  ],
  "tags": [
    {
      "name": "tokens",
      "description": "Operations related to user tokens and sessions"
    }
  ],
  "paths": {
    "/api/identity/tokens": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "tokens"
        ],
        "summary": "Get tokens",
        "operationId": "getUserTokens",
        "description": "Retrieves tokens associated with the authenticated user.",
        "parameters": [
          {
            "name": "isOAuth",
            "in": "query",
            "description": "Whether to retrieve OAuth-backed sessions instead of API tokens.",
            "schema": {
              "type": "boolean"
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
            "description": "Tokens response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A paginated list of tokens.",
                  "required": [
                    "tokens",
                    "total_count",
                    "page",
                    "page_size"
                  ],
                  "properties": {
                    "tokens": {
                      "type": "array",
                      "items": {
                        "x-go-type": "UserToken",
                        "type": "object",
                        "description": "Represents a user-owned API token or OAuth session.",
                        "properties": {
                          "id": {
                            "description": "Unique identifier for the token.",
                            "x-order": 1,
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
                          "user_id": {
                            "description": "UUID of the user who owns the token.",
                            "x-order": 2,
                            "x-oapi-codegen-extra-tags": {
                              "db": "user_id"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "provider": {
                            "type": "string",
                            "description": "Authentication provider associated with the token.",
                            "x-order": 3,
                            "x-oapi-codegen-extra-tags": {
                              "db": "provider"
                            }
                          },
                          "access_token": {
                            "type": "string",
                            "description": "Access token value.",
                            "x-order": 4,
                            "x-oapi-codegen-extra-tags": {
                              "db": "access_token"
                            }
                          },
                          "refresh_token": {
                            "type": "string",
                            "description": "Refresh token value when applicable.",
                            "x-order": 5,
                            "x-oapi-codegen-extra-tags": {
                              "db": "refresh_token"
                            }
                          },
                          "name": {
                            "type": "string",
                            "description": "Human-readable token name.",
                            "x-order": 6,
                            "x-oapi-codegen-extra-tags": {
                              "db": "name"
                            }
                          },
                          "purpose": {
                            "type": "string",
                            "description": "Purpose for which the token was created.",
                            "x-order": 7,
                            "x-oapi-codegen-extra-tags": {
                              "db": "purpose"
                            }
                          },
                          "is_oauth": {
                            "type": "boolean",
                            "description": "Whether this entry represents an OAuth session.",
                            "x-order": 8,
                            "x-oapi-codegen-extra-tags": {
                              "db": "is_oauth"
                            }
                          },
                          "created_at": {
                            "x-order": 9,
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
                            "x-order": 10,
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
                        }
                      },
                      "x-order": 1
                    },
                    "total_count": {
                      "type": "integer",
                      "description": "Total number of tokens across all pages.",
                      "x-order": 2
                    },
                    "page": {
                      "type": "integer",
                      "description": "Current page number (zero-based).",
                      "x-order": 3
                    },
                    "page_size": {
                      "type": "integer",
                      "description": "Number of tokens per page.",
                      "x-order": 4
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
          "cloud"
        ],
        "tags": [
          "tokens"
        ],
        "summary": "Generate token",
        "operationId": "generateToken",
        "description": "Generates a token for the authenticated user.",
        "parameters": [
          {
            "name": "name",
            "in": "query",
            "description": "Name of the token.",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "purpose",
            "in": "query",
            "description": "Purpose for which the token is generated.",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Token generated",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A paginated list of tokens.",
                  "required": [
                    "tokens",
                    "total_count",
                    "page",
                    "page_size"
                  ],
                  "properties": {
                    "tokens": {
                      "type": "array",
                      "items": {
                        "x-go-type": "UserToken",
                        "type": "object",
                        "description": "Represents a user-owned API token or OAuth session.",
                        "properties": {
                          "id": {
                            "description": "Unique identifier for the token.",
                            "x-order": 1,
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
                          "user_id": {
                            "description": "UUID of the user who owns the token.",
                            "x-order": 2,
                            "x-oapi-codegen-extra-tags": {
                              "db": "user_id"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "provider": {
                            "type": "string",
                            "description": "Authentication provider associated with the token.",
                            "x-order": 3,
                            "x-oapi-codegen-extra-tags": {
                              "db": "provider"
                            }
                          },
                          "access_token": {
                            "type": "string",
                            "description": "Access token value.",
                            "x-order": 4,
                            "x-oapi-codegen-extra-tags": {
                              "db": "access_token"
                            }
                          },
                          "refresh_token": {
                            "type": "string",
                            "description": "Refresh token value when applicable.",
                            "x-order": 5,
                            "x-oapi-codegen-extra-tags": {
                              "db": "refresh_token"
                            }
                          },
                          "name": {
                            "type": "string",
                            "description": "Human-readable token name.",
                            "x-order": 6,
                            "x-oapi-codegen-extra-tags": {
                              "db": "name"
                            }
                          },
                          "purpose": {
                            "type": "string",
                            "description": "Purpose for which the token was created.",
                            "x-order": 7,
                            "x-oapi-codegen-extra-tags": {
                              "db": "purpose"
                            }
                          },
                          "is_oauth": {
                            "type": "boolean",
                            "description": "Whether this entry represents an OAuth session.",
                            "x-order": 8,
                            "x-oapi-codegen-extra-tags": {
                              "db": "is_oauth"
                            }
                          },
                          "created_at": {
                            "x-order": 9,
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
                            "x-order": 10,
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
                        }
                      },
                      "x-order": 1
                    },
                    "total_count": {
                      "type": "integer",
                      "description": "Total number of tokens across all pages.",
                      "x-order": 2
                    },
                    "page": {
                      "type": "integer",
                      "description": "Current page number (zero-based).",
                      "x-order": 3
                    },
                    "page_size": {
                      "type": "integer",
                      "description": "Number of tokens per page.",
                      "x-order": 4
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
      "delete": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "tokens"
        ],
        "summary": "Delete token",
        "operationId": "deleteUserToken",
        "description": "Deletes a specific token for the authenticated user.",
        "parameters": [
          {
            "name": "token_id",
            "in": "query",
            "description": "ID of the token.",
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
            "description": "Token deleted",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A paginated list of tokens.",
                  "required": [
                    "tokens",
                    "total_count",
                    "page",
                    "page_size"
                  ],
                  "properties": {
                    "tokens": {
                      "type": "array",
                      "items": {
                        "x-go-type": "UserToken",
                        "type": "object",
                        "description": "Represents a user-owned API token or OAuth session.",
                        "properties": {
                          "id": {
                            "description": "Unique identifier for the token.",
                            "x-order": 1,
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
                          "user_id": {
                            "description": "UUID of the user who owns the token.",
                            "x-order": 2,
                            "x-oapi-codegen-extra-tags": {
                              "db": "user_id"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "provider": {
                            "type": "string",
                            "description": "Authentication provider associated with the token.",
                            "x-order": 3,
                            "x-oapi-codegen-extra-tags": {
                              "db": "provider"
                            }
                          },
                          "access_token": {
                            "type": "string",
                            "description": "Access token value.",
                            "x-order": 4,
                            "x-oapi-codegen-extra-tags": {
                              "db": "access_token"
                            }
                          },
                          "refresh_token": {
                            "type": "string",
                            "description": "Refresh token value when applicable.",
                            "x-order": 5,
                            "x-oapi-codegen-extra-tags": {
                              "db": "refresh_token"
                            }
                          },
                          "name": {
                            "type": "string",
                            "description": "Human-readable token name.",
                            "x-order": 6,
                            "x-oapi-codegen-extra-tags": {
                              "db": "name"
                            }
                          },
                          "purpose": {
                            "type": "string",
                            "description": "Purpose for which the token was created.",
                            "x-order": 7,
                            "x-oapi-codegen-extra-tags": {
                              "db": "purpose"
                            }
                          },
                          "is_oauth": {
                            "type": "boolean",
                            "description": "Whether this entry represents an OAuth session.",
                            "x-order": 8,
                            "x-oapi-codegen-extra-tags": {
                              "db": "is_oauth"
                            }
                          },
                          "created_at": {
                            "x-order": 9,
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
                            "x-order": 10,
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
                        }
                      },
                      "x-order": 1
                    },
                    "total_count": {
                      "type": "integer",
                      "description": "Total number of tokens across all pages.",
                      "x-order": 2
                    },
                    "page": {
                      "type": "integer",
                      "description": "Current page number (zero-based).",
                      "x-order": 3
                    },
                    "page_size": {
                      "type": "integer",
                      "description": "Number of tokens per page.",
                      "x-order": 4
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
    "/api/identity/tokens/{id}": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "tokens"
        ],
        "summary": "Get token by ID",
        "operationId": "getUserTokensById",
        "description": "Retrieves a specific token by its ID.",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "Token ID",
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
            "description": "Token response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Represents a user-owned API token or OAuth session.",
                  "properties": {
                    "id": {
                      "description": "Unique identifier for the token.",
                      "x-order": 1,
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
                    "user_id": {
                      "description": "UUID of the user who owns the token.",
                      "x-order": 2,
                      "x-oapi-codegen-extra-tags": {
                        "db": "user_id"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "provider": {
                      "type": "string",
                      "description": "Authentication provider associated with the token.",
                      "x-order": 3,
                      "x-oapi-codegen-extra-tags": {
                        "db": "provider"
                      }
                    },
                    "access_token": {
                      "type": "string",
                      "description": "Access token value.",
                      "x-order": 4,
                      "x-oapi-codegen-extra-tags": {
                        "db": "access_token"
                      }
                    },
                    "refresh_token": {
                      "type": "string",
                      "description": "Refresh token value when applicable.",
                      "x-order": 5,
                      "x-oapi-codegen-extra-tags": {
                        "db": "refresh_token"
                      }
                    },
                    "name": {
                      "type": "string",
                      "description": "Human-readable token name.",
                      "x-order": 6,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      }
                    },
                    "purpose": {
                      "type": "string",
                      "description": "Purpose for which the token was created.",
                      "x-order": 7,
                      "x-oapi-codegen-extra-tags": {
                        "db": "purpose"
                      }
                    },
                    "is_oauth": {
                      "type": "boolean",
                      "description": "Whether this entry represents an OAuth session.",
                      "x-order": 8,
                      "x-oapi-codegen-extra-tags": {
                        "db": "is_oauth"
                      }
                    },
                    "created_at": {
                      "x-order": 9,
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
                      "x-order": 10,
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
    "/api/identity/tokens/infinite": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "tokens"
        ],
        "summary": "Issue indefinite lifetime token",
        "operationId": "issueIndefiniteLifetimeToken",
        "description": "Creates a non-expiring user token for provider admin use cases.",
        "parameters": [
          {
            "name": "user_id",
            "in": "query",
            "description": "UUID of the user.",
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
            "name": "provider",
            "in": "query",
            "description": "Remote provider.",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Token generated",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A paginated list of tokens.",
                  "required": [
                    "tokens",
                    "total_count",
                    "page",
                    "page_size"
                  ],
                  "properties": {
                    "tokens": {
                      "type": "array",
                      "items": {
                        "x-go-type": "UserToken",
                        "type": "object",
                        "description": "Represents a user-owned API token or OAuth session.",
                        "properties": {
                          "id": {
                            "description": "Unique identifier for the token.",
                            "x-order": 1,
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
                          "user_id": {
                            "description": "UUID of the user who owns the token.",
                            "x-order": 2,
                            "x-oapi-codegen-extra-tags": {
                              "db": "user_id"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "provider": {
                            "type": "string",
                            "description": "Authentication provider associated with the token.",
                            "x-order": 3,
                            "x-oapi-codegen-extra-tags": {
                              "db": "provider"
                            }
                          },
                          "access_token": {
                            "type": "string",
                            "description": "Access token value.",
                            "x-order": 4,
                            "x-oapi-codegen-extra-tags": {
                              "db": "access_token"
                            }
                          },
                          "refresh_token": {
                            "type": "string",
                            "description": "Refresh token value when applicable.",
                            "x-order": 5,
                            "x-oapi-codegen-extra-tags": {
                              "db": "refresh_token"
                            }
                          },
                          "name": {
                            "type": "string",
                            "description": "Human-readable token name.",
                            "x-order": 6,
                            "x-oapi-codegen-extra-tags": {
                              "db": "name"
                            }
                          },
                          "purpose": {
                            "type": "string",
                            "description": "Purpose for which the token was created.",
                            "x-order": 7,
                            "x-oapi-codegen-extra-tags": {
                              "db": "purpose"
                            }
                          },
                          "is_oauth": {
                            "type": "boolean",
                            "description": "Whether this entry represents an OAuth session.",
                            "x-order": 8,
                            "x-oapi-codegen-extra-tags": {
                              "db": "is_oauth"
                            }
                          },
                          "created_at": {
                            "x-order": 9,
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
                            "x-order": 10,
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
                        }
                      },
                      "x-order": 1
                    },
                    "total_count": {
                      "type": "integer",
                      "description": "Total number of tokens across all pages.",
                      "x-order": 2
                    },
                    "page": {
                      "type": "integer",
                      "description": "Current page number (zero-based).",
                      "x-order": 3
                    },
                    "page_size": {
                      "type": "integer",
                      "description": "Number of tokens per page.",
                      "x-order": 4
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
    }
  },
  "components": {
    "securitySchemes": {
      "jwt": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    },
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
      "id": {
        "name": "id",
        "in": "path",
        "description": "Token ID",
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
      "isOAuth": {
        "name": "isOAuth",
        "in": "query",
        "description": "Whether to retrieve OAuth-backed sessions instead of API tokens.",
        "schema": {
          "type": "boolean"
        }
      },
      "name": {
        "name": "name",
        "in": "query",
        "description": "Name of the token.",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      "purpose": {
        "name": "purpose",
        "in": "query",
        "description": "Purpose for which the token is generated.",
        "schema": {
          "type": "string"
        }
      },
      "tokenId": {
        "name": "token_id",
        "in": "query",
        "description": "ID of the token.",
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
      "userId": {
        "name": "user_id",
        "in": "query",
        "description": "UUID of the user.",
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
      "provider": {
        "name": "provider",
        "in": "query",
        "description": "Remote provider.",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    },
    "schemas": {
      "UserToken": {
        "type": "object",
        "description": "Represents a user-owned API token or OAuth session.",
        "properties": {
          "id": {
            "description": "Unique identifier for the token.",
            "x-order": 1,
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
          "user_id": {
            "description": "UUID of the user who owns the token.",
            "x-order": 2,
            "x-oapi-codegen-extra-tags": {
              "db": "user_id"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "provider": {
            "type": "string",
            "description": "Authentication provider associated with the token.",
            "x-order": 3,
            "x-oapi-codegen-extra-tags": {
              "db": "provider"
            }
          },
          "access_token": {
            "type": "string",
            "description": "Access token value.",
            "x-order": 4,
            "x-oapi-codegen-extra-tags": {
              "db": "access_token"
            }
          },
          "refresh_token": {
            "type": "string",
            "description": "Refresh token value when applicable.",
            "x-order": 5,
            "x-oapi-codegen-extra-tags": {
              "db": "refresh_token"
            }
          },
          "name": {
            "type": "string",
            "description": "Human-readable token name.",
            "x-order": 6,
            "x-oapi-codegen-extra-tags": {
              "db": "name"
            }
          },
          "purpose": {
            "type": "string",
            "description": "Purpose for which the token was created.",
            "x-order": 7,
            "x-oapi-codegen-extra-tags": {
              "db": "purpose"
            }
          },
          "is_oauth": {
            "type": "boolean",
            "description": "Whether this entry represents an OAuth session.",
            "x-order": 8,
            "x-oapi-codegen-extra-tags": {
              "db": "is_oauth"
            }
          },
          "created_at": {
            "x-order": 9,
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
            "x-order": 10,
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
        }
      },
      "TokenPage": {
        "type": "object",
        "description": "A paginated list of tokens.",
        "required": [
          "tokens",
          "total_count",
          "page",
          "page_size"
        ],
        "properties": {
          "tokens": {
            "type": "array",
            "items": {
              "x-go-type": "UserToken",
              "type": "object",
              "description": "Represents a user-owned API token or OAuth session.",
              "properties": {
                "id": {
                  "description": "Unique identifier for the token.",
                  "x-order": 1,
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
                "user_id": {
                  "description": "UUID of the user who owns the token.",
                  "x-order": 2,
                  "x-oapi-codegen-extra-tags": {
                    "db": "user_id"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "provider": {
                  "type": "string",
                  "description": "Authentication provider associated with the token.",
                  "x-order": 3,
                  "x-oapi-codegen-extra-tags": {
                    "db": "provider"
                  }
                },
                "access_token": {
                  "type": "string",
                  "description": "Access token value.",
                  "x-order": 4,
                  "x-oapi-codegen-extra-tags": {
                    "db": "access_token"
                  }
                },
                "refresh_token": {
                  "type": "string",
                  "description": "Refresh token value when applicable.",
                  "x-order": 5,
                  "x-oapi-codegen-extra-tags": {
                    "db": "refresh_token"
                  }
                },
                "name": {
                  "type": "string",
                  "description": "Human-readable token name.",
                  "x-order": 6,
                  "x-oapi-codegen-extra-tags": {
                    "db": "name"
                  }
                },
                "purpose": {
                  "type": "string",
                  "description": "Purpose for which the token was created.",
                  "x-order": 7,
                  "x-oapi-codegen-extra-tags": {
                    "db": "purpose"
                  }
                },
                "is_oauth": {
                  "type": "boolean",
                  "description": "Whether this entry represents an OAuth session.",
                  "x-order": 8,
                  "x-oapi-codegen-extra-tags": {
                    "db": "is_oauth"
                  }
                },
                "created_at": {
                  "x-order": 9,
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
                  "x-order": 10,
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
              }
            },
            "x-order": 1
          },
          "total_count": {
            "type": "integer",
            "description": "Total number of tokens across all pages.",
            "x-order": 2
          },
          "page": {
            "type": "integer",
            "description": "Current page number (zero-based).",
            "x-order": 3
          },
          "page_size": {
            "type": "integer",
            "description": "Number of tokens per page.",
            "x-order": 4
          }
        }
      }
    }
  }
};

export default TokenSchema;
