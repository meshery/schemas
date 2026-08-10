/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const TokenSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "token",
    "description": "Documentation for Meshery Cloud REST APIs for user tokens and sessions",
    "contact": {
      "name": "Meshery Maintainers",
      "email": "maintainers@meshery.io",
      "url": "https://meshery.io"
    },
    "license": {
      "name": "Apache 2.0",
      "url": "https://www.apache.org/licenses/LICENSE-2.0.html"
    },
    "version": "v1beta3"
  },
  "servers": [
    {
      "url": "https://cloud.meshery.io",
      "description": "Meshery Cloud production server URL"
    },
    {
      "url": "https://staging-cloud.meshery.io",
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
            "name": "isOauth",
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
              "type": "integer",
              "minimum": 0
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "description": "Number of responses to return per page. Canonical camelCase pagination parameter; prefer this over the deprecated all-lowercase `pagesize`.",
            "schema": {
              "type": "integer",
              "minimum": 1
            }
          },
          {
            "name": "pagesize",
            "in": "query",
            "description": "Get responses by pagesize. Deprecated alias of pageSize.",
            "deprecated": true,
            "schema": {
              "type": "integer"
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
                    "totalCount",
                    "page",
                    "pageSize"
                  ],
                  "properties": {
                    "tokens": {
                      "type": "array",
                      "items": {
                        "x-go-type": "UserToken",
                        "type": "object",
                        "additionalProperties": false,
                        "description": "Represents a user-owned API token or OAuth session.",
                        "required": [
                          "id",
                          "owner",
                          "provider",
                          "accessToken",
                          "name",
                          "purpose",
                          "isOauth",
                          "createdAt",
                          "updatedAt"
                        ],
                        "properties": {
                          "id": {
                            "description": "Unique identifier for the token.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "id",
                              "json": "id"
                            },
                            "x-order": 1,
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "owner": {
                            "description": "UUID of the user who owns the token.",
                            "x-go-name": "Owner",
                            "x-oapi-codegen-extra-tags": {
                              "db": "owner",
                              "json": "owner"
                            },
                            "x-order": 2,
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
                            "x-oapi-codegen-extra-tags": {
                              "db": "provider",
                              "json": "provider"
                            },
                            "maxLength": 500,
                            "x-order": 3
                          },
                          "accessToken": {
                            "type": "string",
                            "description": "Access token value.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "access_token",
                              "json": "accessToken"
                            },
                            "maxLength": 4096,
                            "x-order": 4
                          },
                          "refreshToken": {
                            "type": "string",
                            "description": "Refresh token value when applicable.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "refresh_token",
                              "json": "refreshToken"
                            },
                            "maxLength": 4096,
                            "x-order": 5
                          },
                          "name": {
                            "type": "string",
                            "description": "Human-readable token name.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "name",
                              "json": "name"
                            },
                            "minLength": 1,
                            "maxLength": 255,
                            "x-order": 6
                          },
                          "purpose": {
                            "type": "string",
                            "description": "Purpose for which the token was created.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "purpose",
                              "json": "purpose"
                            },
                            "maxLength": 500,
                            "x-order": 7
                          },
                          "isOauth": {
                            "type": "boolean",
                            "description": "Whether this entry represents an OAuth session.",
                            "x-go-name": "IsOAuth",
                            "x-oapi-codegen-extra-tags": {
                              "db": "is_oauth",
                              "json": "isOauth"
                            },
                            "x-order": 8
                          },
                          "createdAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the token was created.",
                            "x-go-type": "time.Time",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "json": "createdAt"
                            },
                            "x-order": 9
                          },
                          "updatedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the token was last updated.",
                            "x-go-type": "time.Time",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "json": "updatedAt"
                            },
                            "x-order": 10
                          }
                        }
                      },
                      "x-order": 1,
                      "description": "Tokens returned on the current page."
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of tokens across all pages.",
                      "minimum": 0,
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 2,
                      "x-oapi-codegen-extra-tags": {
                        "json": "totalCount"
                      }
                    },
                    "page": {
                      "type": "integer",
                      "description": "Current page number (zero-based).",
                      "minimum": 0,
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 3
                    },
                    "pageSize": {
                      "type": "integer",
                      "description": "Number of tokens per page.",
                      "minimum": 1,
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 4,
                      "x-oapi-codegen-extra-tags": {
                        "json": "pageSize"
                      }
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
              "type": "string",
              "minLength": 1,
              "maxLength": 255
            }
          },
          {
            "name": "purpose",
            "in": "query",
            "description": "Purpose for which the token is generated.",
            "schema": {
              "type": "string",
              "maxLength": 500
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Token generated",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A paginated list of tokens.",
                  "required": [
                    "tokens",
                    "totalCount",
                    "page",
                    "pageSize"
                  ],
                  "properties": {
                    "tokens": {
                      "type": "array",
                      "items": {
                        "x-go-type": "UserToken",
                        "type": "object",
                        "additionalProperties": false,
                        "description": "Represents a user-owned API token or OAuth session.",
                        "required": [
                          "id",
                          "owner",
                          "provider",
                          "accessToken",
                          "name",
                          "purpose",
                          "isOauth",
                          "createdAt",
                          "updatedAt"
                        ],
                        "properties": {
                          "id": {
                            "description": "Unique identifier for the token.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "id",
                              "json": "id"
                            },
                            "x-order": 1,
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "owner": {
                            "description": "UUID of the user who owns the token.",
                            "x-go-name": "Owner",
                            "x-oapi-codegen-extra-tags": {
                              "db": "owner",
                              "json": "owner"
                            },
                            "x-order": 2,
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
                            "x-oapi-codegen-extra-tags": {
                              "db": "provider",
                              "json": "provider"
                            },
                            "maxLength": 500,
                            "x-order": 3
                          },
                          "accessToken": {
                            "type": "string",
                            "description": "Access token value.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "access_token",
                              "json": "accessToken"
                            },
                            "maxLength": 4096,
                            "x-order": 4
                          },
                          "refreshToken": {
                            "type": "string",
                            "description": "Refresh token value when applicable.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "refresh_token",
                              "json": "refreshToken"
                            },
                            "maxLength": 4096,
                            "x-order": 5
                          },
                          "name": {
                            "type": "string",
                            "description": "Human-readable token name.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "name",
                              "json": "name"
                            },
                            "minLength": 1,
                            "maxLength": 255,
                            "x-order": 6
                          },
                          "purpose": {
                            "type": "string",
                            "description": "Purpose for which the token was created.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "purpose",
                              "json": "purpose"
                            },
                            "maxLength": 500,
                            "x-order": 7
                          },
                          "isOauth": {
                            "type": "boolean",
                            "description": "Whether this entry represents an OAuth session.",
                            "x-go-name": "IsOAuth",
                            "x-oapi-codegen-extra-tags": {
                              "db": "is_oauth",
                              "json": "isOauth"
                            },
                            "x-order": 8
                          },
                          "createdAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the token was created.",
                            "x-go-type": "time.Time",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "json": "createdAt"
                            },
                            "x-order": 9
                          },
                          "updatedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the token was last updated.",
                            "x-go-type": "time.Time",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "json": "updatedAt"
                            },
                            "x-order": 10
                          }
                        }
                      },
                      "x-order": 1,
                      "description": "Tokens returned on the current page."
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of tokens across all pages.",
                      "minimum": 0,
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 2,
                      "x-oapi-codegen-extra-tags": {
                        "json": "totalCount"
                      }
                    },
                    "page": {
                      "type": "integer",
                      "description": "Current page number (zero-based).",
                      "minimum": 0,
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 3
                    },
                    "pageSize": {
                      "type": "integer",
                      "description": "Number of tokens per page.",
                      "minimum": 1,
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 4,
                      "x-oapi-codegen-extra-tags": {
                        "json": "pageSize"
                      }
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
            "name": "tokenId",
            "in": "query",
            "description": "ID of the token to delete.",
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
                    "totalCount",
                    "page",
                    "pageSize"
                  ],
                  "properties": {
                    "tokens": {
                      "type": "array",
                      "items": {
                        "x-go-type": "UserToken",
                        "type": "object",
                        "additionalProperties": false,
                        "description": "Represents a user-owned API token or OAuth session.",
                        "required": [
                          "id",
                          "owner",
                          "provider",
                          "accessToken",
                          "name",
                          "purpose",
                          "isOauth",
                          "createdAt",
                          "updatedAt"
                        ],
                        "properties": {
                          "id": {
                            "description": "Unique identifier for the token.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "id",
                              "json": "id"
                            },
                            "x-order": 1,
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "owner": {
                            "description": "UUID of the user who owns the token.",
                            "x-go-name": "Owner",
                            "x-oapi-codegen-extra-tags": {
                              "db": "owner",
                              "json": "owner"
                            },
                            "x-order": 2,
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
                            "x-oapi-codegen-extra-tags": {
                              "db": "provider",
                              "json": "provider"
                            },
                            "maxLength": 500,
                            "x-order": 3
                          },
                          "accessToken": {
                            "type": "string",
                            "description": "Access token value.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "access_token",
                              "json": "accessToken"
                            },
                            "maxLength": 4096,
                            "x-order": 4
                          },
                          "refreshToken": {
                            "type": "string",
                            "description": "Refresh token value when applicable.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "refresh_token",
                              "json": "refreshToken"
                            },
                            "maxLength": 4096,
                            "x-order": 5
                          },
                          "name": {
                            "type": "string",
                            "description": "Human-readable token name.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "name",
                              "json": "name"
                            },
                            "minLength": 1,
                            "maxLength": 255,
                            "x-order": 6
                          },
                          "purpose": {
                            "type": "string",
                            "description": "Purpose for which the token was created.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "purpose",
                              "json": "purpose"
                            },
                            "maxLength": 500,
                            "x-order": 7
                          },
                          "isOauth": {
                            "type": "boolean",
                            "description": "Whether this entry represents an OAuth session.",
                            "x-go-name": "IsOAuth",
                            "x-oapi-codegen-extra-tags": {
                              "db": "is_oauth",
                              "json": "isOauth"
                            },
                            "x-order": 8
                          },
                          "createdAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the token was created.",
                            "x-go-type": "time.Time",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "json": "createdAt"
                            },
                            "x-order": 9
                          },
                          "updatedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the token was last updated.",
                            "x-go-type": "time.Time",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "json": "updatedAt"
                            },
                            "x-order": 10
                          }
                        }
                      },
                      "x-order": 1,
                      "description": "Tokens returned on the current page."
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of tokens across all pages.",
                      "minimum": 0,
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 2,
                      "x-oapi-codegen-extra-tags": {
                        "json": "totalCount"
                      }
                    },
                    "page": {
                      "type": "integer",
                      "description": "Current page number (zero-based).",
                      "minimum": 0,
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 3
                    },
                    "pageSize": {
                      "type": "integer",
                      "description": "Number of tokens per page.",
                      "minimum": 1,
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 4,
                      "x-oapi-codegen-extra-tags": {
                        "json": "pageSize"
                      }
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
    "/api/identity/tokens/{tokenId}": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "tokens"
        ],
        "summary": "Download token",
        "operationId": "downloadToken",
        "description": "Downloads a specific token by its ID for use as a local credential file (e.g. mesheryctl's auth.json). Gated by the Download Token permission and recorded as a distinct audit event from viewing or listing tokens.",
        "parameters": [
          {
            "name": "tokenId",
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
                  "additionalProperties": false,
                  "description": "Represents a user-owned API token or OAuth session.",
                  "required": [
                    "id",
                    "owner",
                    "provider",
                    "accessToken",
                    "name",
                    "purpose",
                    "isOauth",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Unique identifier for the token.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id",
                        "json": "id"
                      },
                      "x-order": 1,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "owner": {
                      "description": "UUID of the user who owns the token.",
                      "x-go-name": "Owner",
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner",
                        "json": "owner"
                      },
                      "x-order": 2,
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
                      "x-oapi-codegen-extra-tags": {
                        "db": "provider",
                        "json": "provider"
                      },
                      "maxLength": 500,
                      "x-order": 3
                    },
                    "accessToken": {
                      "type": "string",
                      "description": "Access token value.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "access_token",
                        "json": "accessToken"
                      },
                      "maxLength": 4096,
                      "x-order": 4
                    },
                    "refreshToken": {
                      "type": "string",
                      "description": "Refresh token value when applicable.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "refresh_token",
                        "json": "refreshToken"
                      },
                      "maxLength": 4096,
                      "x-order": 5
                    },
                    "name": {
                      "type": "string",
                      "description": "Human-readable token name.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "name",
                        "json": "name"
                      },
                      "minLength": 1,
                      "maxLength": 255,
                      "x-order": 6
                    },
                    "purpose": {
                      "type": "string",
                      "description": "Purpose for which the token was created.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "purpose",
                        "json": "purpose"
                      },
                      "maxLength": 500,
                      "x-order": 7
                    },
                    "isOauth": {
                      "type": "boolean",
                      "description": "Whether this entry represents an OAuth session.",
                      "x-go-name": "IsOAuth",
                      "x-oapi-codegen-extra-tags": {
                        "db": "is_oauth",
                        "json": "isOauth"
                      },
                      "x-order": 8
                    },
                    "createdAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the token was created.",
                      "x-go-type": "time.Time",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "createdAt"
                      },
                      "x-order": 9
                    },
                    "updatedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the token was last updated.",
                      "x-go-type": "time.Time",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updatedAt"
                      },
                      "x-order": 10
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
            "name": "userId",
            "in": "query",
            "description": "UUID of the user to issue the indefinite token for.",
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
            "description": "Authentication provider to associate with the indefinite token.",
            "required": true,
            "schema": {
              "type": "string",
              "maxLength": 500
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
                    "totalCount",
                    "page",
                    "pageSize"
                  ],
                  "properties": {
                    "tokens": {
                      "type": "array",
                      "items": {
                        "x-go-type": "UserToken",
                        "type": "object",
                        "additionalProperties": false,
                        "description": "Represents a user-owned API token or OAuth session.",
                        "required": [
                          "id",
                          "owner",
                          "provider",
                          "accessToken",
                          "name",
                          "purpose",
                          "isOauth",
                          "createdAt",
                          "updatedAt"
                        ],
                        "properties": {
                          "id": {
                            "description": "Unique identifier for the token.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "id",
                              "json": "id"
                            },
                            "x-order": 1,
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "owner": {
                            "description": "UUID of the user who owns the token.",
                            "x-go-name": "Owner",
                            "x-oapi-codegen-extra-tags": {
                              "db": "owner",
                              "json": "owner"
                            },
                            "x-order": 2,
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
                            "x-oapi-codegen-extra-tags": {
                              "db": "provider",
                              "json": "provider"
                            },
                            "maxLength": 500,
                            "x-order": 3
                          },
                          "accessToken": {
                            "type": "string",
                            "description": "Access token value.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "access_token",
                              "json": "accessToken"
                            },
                            "maxLength": 4096,
                            "x-order": 4
                          },
                          "refreshToken": {
                            "type": "string",
                            "description": "Refresh token value when applicable.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "refresh_token",
                              "json": "refreshToken"
                            },
                            "maxLength": 4096,
                            "x-order": 5
                          },
                          "name": {
                            "type": "string",
                            "description": "Human-readable token name.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "name",
                              "json": "name"
                            },
                            "minLength": 1,
                            "maxLength": 255,
                            "x-order": 6
                          },
                          "purpose": {
                            "type": "string",
                            "description": "Purpose for which the token was created.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "purpose",
                              "json": "purpose"
                            },
                            "maxLength": 500,
                            "x-order": 7
                          },
                          "isOauth": {
                            "type": "boolean",
                            "description": "Whether this entry represents an OAuth session.",
                            "x-go-name": "IsOAuth",
                            "x-oapi-codegen-extra-tags": {
                              "db": "is_oauth",
                              "json": "isOauth"
                            },
                            "x-order": 8
                          },
                          "createdAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the token was created.",
                            "x-go-type": "time.Time",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "json": "createdAt"
                            },
                            "x-order": 9
                          },
                          "updatedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the token was last updated.",
                            "x-go-type": "time.Time",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "json": "updatedAt"
                            },
                            "x-order": 10
                          }
                        }
                      },
                      "x-order": 1,
                      "description": "Tokens returned on the current page."
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of tokens across all pages.",
                      "minimum": 0,
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 2,
                      "x-oapi-codegen-extra-tags": {
                        "json": "totalCount"
                      }
                    },
                    "page": {
                      "type": "integer",
                      "description": "Current page number (zero-based).",
                      "minimum": 0,
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 3
                    },
                    "pageSize": {
                      "type": "integer",
                      "description": "Number of tokens per page.",
                      "minimum": 1,
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 4,
                      "x-oapi-codegen-extra-tags": {
                        "json": "pageSize"
                      }
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
      "tokenId": {
        "name": "tokenId",
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
      "tokenIdQuery": {
        "name": "tokenId",
        "in": "query",
        "description": "ID of the token to delete.",
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
      "userIdQuery": {
        "name": "userId",
        "in": "query",
        "description": "UUID of the user to issue the indefinite token for.",
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
      "providerQuery": {
        "name": "provider",
        "in": "query",
        "description": "Authentication provider to associate with the indefinite token.",
        "required": true,
        "schema": {
          "type": "string",
          "maxLength": 500
        }
      },
      "page": {
        "name": "page",
        "in": "query",
        "description": "Get responses by page",
        "schema": {
          "type": "integer",
          "minimum": 0
        }
      },
      "pageSize": {
        "name": "pageSize",
        "in": "query",
        "description": "Number of responses to return per page. Canonical camelCase pagination parameter; prefer this over the deprecated all-lowercase `pagesize`.",
        "schema": {
          "type": "integer",
          "minimum": 1
        }
      },
      "pagesize": {
        "name": "pagesize",
        "in": "query",
        "description": "Get responses by pagesize. Deprecated alias of pageSize.",
        "deprecated": true,
        "schema": {
          "type": "integer"
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
      "isOauth": {
        "name": "isOauth",
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
          "type": "string",
          "minLength": 1,
          "maxLength": 255
        }
      },
      "purpose": {
        "name": "purpose",
        "in": "query",
        "description": "Purpose for which the token is generated.",
        "schema": {
          "type": "string",
          "maxLength": 500
        }
      }
    },
    "schemas": {
      "UserToken": {
        "type": "object",
        "additionalProperties": false,
        "description": "Represents a user-owned API token or OAuth session.",
        "required": [
          "id",
          "owner",
          "provider",
          "accessToken",
          "name",
          "purpose",
          "isOauth",
          "createdAt",
          "updatedAt"
        ],
        "properties": {
          "id": {
            "description": "Unique identifier for the token.",
            "x-oapi-codegen-extra-tags": {
              "db": "id",
              "json": "id"
            },
            "x-order": 1,
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "owner": {
            "description": "UUID of the user who owns the token.",
            "x-go-name": "Owner",
            "x-oapi-codegen-extra-tags": {
              "db": "owner",
              "json": "owner"
            },
            "x-order": 2,
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
            "x-oapi-codegen-extra-tags": {
              "db": "provider",
              "json": "provider"
            },
            "maxLength": 500,
            "x-order": 3
          },
          "accessToken": {
            "type": "string",
            "description": "Access token value.",
            "x-oapi-codegen-extra-tags": {
              "db": "access_token",
              "json": "accessToken"
            },
            "maxLength": 4096,
            "x-order": 4
          },
          "refreshToken": {
            "type": "string",
            "description": "Refresh token value when applicable.",
            "x-oapi-codegen-extra-tags": {
              "db": "refresh_token",
              "json": "refreshToken"
            },
            "maxLength": 4096,
            "x-order": 5
          },
          "name": {
            "type": "string",
            "description": "Human-readable token name.",
            "x-oapi-codegen-extra-tags": {
              "db": "name",
              "json": "name"
            },
            "minLength": 1,
            "maxLength": 255,
            "x-order": 6
          },
          "purpose": {
            "type": "string",
            "description": "Purpose for which the token was created.",
            "x-oapi-codegen-extra-tags": {
              "db": "purpose",
              "json": "purpose"
            },
            "maxLength": 500,
            "x-order": 7
          },
          "isOauth": {
            "type": "boolean",
            "description": "Whether this entry represents an OAuth session.",
            "x-go-name": "IsOAuth",
            "x-oapi-codegen-extra-tags": {
              "db": "is_oauth",
              "json": "isOauth"
            },
            "x-order": 8
          },
          "createdAt": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the token was created.",
            "x-go-type": "time.Time",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "created_at",
              "json": "createdAt"
            },
            "x-order": 9
          },
          "updatedAt": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the token was last updated.",
            "x-go-type": "time.Time",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at",
              "json": "updatedAt"
            },
            "x-order": 10
          }
        }
      },
      "TokenPage": {
        "type": "object",
        "description": "A paginated list of tokens.",
        "required": [
          "tokens",
          "totalCount",
          "page",
          "pageSize"
        ],
        "properties": {
          "tokens": {
            "type": "array",
            "items": {
              "x-go-type": "UserToken",
              "type": "object",
              "additionalProperties": false,
              "description": "Represents a user-owned API token or OAuth session.",
              "required": [
                "id",
                "owner",
                "provider",
                "accessToken",
                "name",
                "purpose",
                "isOauth",
                "createdAt",
                "updatedAt"
              ],
              "properties": {
                "id": {
                  "description": "Unique identifier for the token.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "id",
                    "json": "id"
                  },
                  "x-order": 1,
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "owner": {
                  "description": "UUID of the user who owns the token.",
                  "x-go-name": "Owner",
                  "x-oapi-codegen-extra-tags": {
                    "db": "owner",
                    "json": "owner"
                  },
                  "x-order": 2,
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
                  "x-oapi-codegen-extra-tags": {
                    "db": "provider",
                    "json": "provider"
                  },
                  "maxLength": 500,
                  "x-order": 3
                },
                "accessToken": {
                  "type": "string",
                  "description": "Access token value.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "access_token",
                    "json": "accessToken"
                  },
                  "maxLength": 4096,
                  "x-order": 4
                },
                "refreshToken": {
                  "type": "string",
                  "description": "Refresh token value when applicable.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "refresh_token",
                    "json": "refreshToken"
                  },
                  "maxLength": 4096,
                  "x-order": 5
                },
                "name": {
                  "type": "string",
                  "description": "Human-readable token name.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "name",
                    "json": "name"
                  },
                  "minLength": 1,
                  "maxLength": 255,
                  "x-order": 6
                },
                "purpose": {
                  "type": "string",
                  "description": "Purpose for which the token was created.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "purpose",
                    "json": "purpose"
                  },
                  "maxLength": 500,
                  "x-order": 7
                },
                "isOauth": {
                  "type": "boolean",
                  "description": "Whether this entry represents an OAuth session.",
                  "x-go-name": "IsOAuth",
                  "x-oapi-codegen-extra-tags": {
                    "db": "is_oauth",
                    "json": "isOauth"
                  },
                  "x-order": 8
                },
                "createdAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Timestamp when the token was created.",
                  "x-go-type": "time.Time",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at",
                    "json": "createdAt"
                  },
                  "x-order": 9
                },
                "updatedAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Timestamp when the token was last updated.",
                  "x-go-type": "time.Time",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at",
                    "json": "updatedAt"
                  },
                  "x-order": 10
                }
              }
            },
            "x-order": 1,
            "description": "Tokens returned on the current page."
          },
          "totalCount": {
            "type": "integer",
            "description": "Total number of tokens across all pages.",
            "minimum": 0,
            "x-go-type-skip-optional-pointer": true,
            "x-order": 2,
            "x-oapi-codegen-extra-tags": {
              "json": "totalCount"
            }
          },
          "page": {
            "type": "integer",
            "description": "Current page number (zero-based).",
            "minimum": 0,
            "x-go-type-skip-optional-pointer": true,
            "x-order": 3
          },
          "pageSize": {
            "type": "integer",
            "description": "Number of tokens per page.",
            "minimum": 1,
            "x-go-type-skip-optional-pointer": true,
            "x-order": 4,
            "x-oapi-codegen-extra-tags": {
              "json": "pageSize"
            }
          }
        }
      }
    }
  }
};

export default TokenSchema;
