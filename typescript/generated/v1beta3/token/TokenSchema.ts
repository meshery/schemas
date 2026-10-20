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
            "name": "purpose",
            "in": "query",
            "description": "Token purpose. Tokens are minted with this purpose on generate. On list, only tokens whose purpose is exactly this value (case-sensitive, not a substring match) are returned; omit it to list every purpose.",
            "schema": {
              "type": "string",
              "maxLength": 500
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
            "description": "Token purpose. Tokens are minted with this purpose on generate. On list, only tokens whose purpose is exactly this value (case-sensitive, not a substring match) are returned; omit it to list every purpose.",
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
        "description": "Downloads a specific token by its ID for use as a local credential file (e.g. a CLI auth file). Gated by the Download Token permission and recorded as a distinct audit event from viewing or listing tokens.",
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
    },
    "/api/identity/native/authorize": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "tokens"
        ],
        "summary": "Show native client sign-in consent",
        "operationId": "getNativeClientAuthorization",
        "description": "Browser-facing step of the native client sign-in flow (RFC 8252 loopback redirect with RFC 7636 PKCE). Requires the session cookie of a signed-in user, never URL credentials. Validates the request and renders a consent page that asks the user to allow the named local client to act on their behalf. Nothing is issued by this call. When the request names the client application (`client`) and its version (`clientVersion`) and that version is below the provider's minimum for that client, an update page is rendered with status 426 instead of the consent page.",
        "parameters": [
          {
            "name": "clientName",
            "in": "query",
            "description": "Display name of the native client asking to sign in. Shown on the consent page and used as the name and purpose of the minted token.",
            "required": true,
            "schema": {
              "type": "string",
              "pattern": "^[A-Za-z0-9][A-Za-z0-9 ._-]{0,62}$"
            }
          },
          {
            "name": "client",
            "in": "query",
            "description": "Identifier of the client application, as in the capabilities `client` parameter. Selects the minimum version checked against `clientVersion`.",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Identifier of a client application, for example the product name of a desktop app, lowercase. It is a value chosen by the client; the provider keys its minimum client versions by it.\n",
              "minLength": 1,
              "maxLength": 64,
              "pattern": "^[a-z0-9][a-z0-9-]*$"
            }
          },
          {
            "name": "clientVersion",
            "in": "query",
            "description": "Version of the client application, for example `v1.25.0`.",
            "required": false,
            "schema": {
              "type": "string",
              "maxLength": 64
            }
          },
          {
            "name": "port",
            "in": "query",
            "description": "Port on 127.0.0.1 where the native client listens for the callback.",
            "required": true,
            "schema": {
              "type": "integer",
              "minimum": 1024,
              "maximum": 65535
            }
          },
          {
            "name": "codeChallenge",
            "in": "query",
            "description": "PKCE code challenge, BASE64URL(SHA256(codeVerifier)) without padding.",
            "required": true,
            "schema": {
              "type": "string",
              "pattern": "^[A-Za-z0-9_-]{43}$"
            }
          },
          {
            "name": "codeChallengeMethod",
            "in": "query",
            "description": "PKCE challenge method. Only S256 is accepted.",
            "required": true,
            "schema": {
              "type": "string",
              "enum": [
                "S256"
              ]
            }
          },
          {
            "name": "state",
            "in": "query",
            "description": "Opaque value from the native client, returned unchanged on the callback.",
            "required": true,
            "schema": {
              "type": "string",
              "minLength": 8,
              "maxLength": 512
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Consent page",
            "content": {
              "text/html": {
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
          "426": {
            "description": "Update page; the client's version is below the provider's minimum for that client.",
            "content": {
              "text/html": {
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
        "summary": "Approve native client sign-in",
        "operationId": "approveNativeClientAuthorization",
        "description": "Submitted by the consent page with the same parameters as the GET, as a same-origin form post. Stores a single-use authorization code that expires after 60 seconds, bound to the user, the client name and the PKCE code challenge, then redirects the browser to http://127.0.0.1:{port}/callback with code and state query parameters. Only the 127.0.0.1 loopback IP literal is ever used as the redirect host; no token or cookie is placed in the redirect.",
        "requestBody": {
          "required": true,
          "content": {
            "application/x-www-form-urlencoded": {
              "schema": {
                "type": "object",
                "description": "Consent form fields for approving a native client sign-in.",
                "required": [
                  "clientName",
                  "port",
                  "codeChallenge",
                  "codeChallengeMethod",
                  "state"
                ],
                "properties": {
                  "clientName": {
                    "type": "string",
                    "description": "Display name of the native client.",
                    "pattern": "^[A-Za-z0-9][A-Za-z0-9 ._-]{0,62}$",
                    "x-order": 1
                  },
                  "port": {
                    "type": "integer",
                    "description": "Port on 127.0.0.1 for the callback.",
                    "minimum": 1024,
                    "maximum": 65535,
                    "x-order": 2
                  },
                  "codeChallenge": {
                    "type": "string",
                    "description": "PKCE S256 code challenge.",
                    "pattern": "^[A-Za-z0-9_-]{43}$",
                    "x-order": 3
                  },
                  "codeChallengeMethod": {
                    "type": "string",
                    "description": "PKCE challenge method.",
                    "enum": [
                      "S256"
                    ],
                    "x-order": 4
                  },
                  "state": {
                    "type": "string",
                    "description": "Opaque client state returned on the callback.",
                    "minLength": 8,
                    "maxLength": 512,
                    "x-order": 5
                  }
                }
              }
            }
          }
        },
        "responses": {
          "302": {
            "description": "Redirect to the loopback callback carrying code and state. The callback's query parameters are described by NativeAuthorizationCallback.",
            "headers": {
              "Location": {
                "required": true,
                "description": "http://127.0.0.1:{port}/callback?code=...&state=..., whose query is a NativeAuthorizationCallback.",
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
          "403": {
            "description": "Forbidden",
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
    "/api/identity/native/token": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "tokens"
        ],
        "summary": "Exchange native client authorization code",
        "operationId": "exchangeNativeAuthorizationCode",
        "description": "Redeems a single-use authorization code from the native client sign-in flow. The caller proves possession of the PKCE code verifier (BASE64URL(SHA256(codeVerifier)) must equal the stored S256 challenge). The code is consumed on the first redemption attempt, whether or not the verifier matches. On success an API token is minted for the user with name and purpose set to the client name. This call is authenticated by the code and verifier, not by a session.",
        "security": [],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "additionalProperties": false,
                "description": "Redeems a native client authorization code with its PKCE verifier.",
                "required": [
                  "code",
                  "codeVerifier"
                ],
                "properties": {
                  "code": {
                    "type": "string",
                    "description": "Single-use authorization code from the loopback callback.",
                    "minLength": 1,
                    "maxLength": 128,
                    "x-order": 1
                  },
                  "codeVerifier": {
                    "type": "string",
                    "description": "PKCE code verifier (RFC 7636, 43 to 128 unreserved characters).",
                    "pattern": "^[A-Za-z0-9._~-]{43,128}$",
                    "x-order": 2
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "API token minted for the native client",
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
      "403": {
        "description": "Forbidden",
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
        "description": "Token purpose. Tokens are minted with this purpose on generate. On list, only tokens whose purpose is exactly this value (case-sensitive, not a substring match) are returned; omit it to list every purpose.",
        "schema": {
          "type": "string",
          "maxLength": 500
        }
      },
      "nativeClientName": {
        "name": "clientName",
        "in": "query",
        "description": "Display name of the native client asking to sign in. Shown on the consent page and used as the name and purpose of the minted token.",
        "required": true,
        "schema": {
          "type": "string",
          "pattern": "^[A-Za-z0-9][A-Za-z0-9 ._-]{0,62}$"
        }
      },
      "nativeClient": {
        "name": "client",
        "in": "query",
        "description": "Identifier of the client application, as in the capabilities `client` parameter. Selects the minimum version checked against `clientVersion`.",
        "required": false,
        "schema": {
          "type": "string",
          "description": "Identifier of a client application, for example the product name of a desktop app, lowercase. It is a value chosen by the client; the provider keys its minimum client versions by it.\n",
          "minLength": 1,
          "maxLength": 64,
          "pattern": "^[a-z0-9][a-z0-9-]*$"
        }
      },
      "nativeClientVersion": {
        "name": "clientVersion",
        "in": "query",
        "description": "Version of the client application, for example `v1.25.0`.",
        "required": false,
        "schema": {
          "type": "string",
          "maxLength": 64
        }
      },
      "nativePort": {
        "name": "port",
        "in": "query",
        "description": "Port on 127.0.0.1 where the native client listens for the callback.",
        "required": true,
        "schema": {
          "type": "integer",
          "minimum": 1024,
          "maximum": 65535
        }
      },
      "nativeCodeChallenge": {
        "name": "codeChallenge",
        "in": "query",
        "description": "PKCE code challenge, BASE64URL(SHA256(codeVerifier)) without padding.",
        "required": true,
        "schema": {
          "type": "string",
          "pattern": "^[A-Za-z0-9_-]{43}$"
        }
      },
      "nativeCodeChallengeMethod": {
        "name": "codeChallengeMethod",
        "in": "query",
        "description": "PKCE challenge method. Only S256 is accepted.",
        "required": true,
        "schema": {
          "type": "string",
          "enum": [
            "S256"
          ]
        }
      },
      "nativeState": {
        "name": "state",
        "in": "query",
        "description": "Opaque value from the native client, returned unchanged on the callback.",
        "required": true,
        "schema": {
          "type": "string",
          "minLength": 8,
          "maxLength": 512
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
      "NativeAuthorizationPayload": {
        "type": "object",
        "description": "Consent form fields for approving a native client sign-in.",
        "required": [
          "clientName",
          "port",
          "codeChallenge",
          "codeChallengeMethod",
          "state"
        ],
        "properties": {
          "clientName": {
            "type": "string",
            "description": "Display name of the native client.",
            "pattern": "^[A-Za-z0-9][A-Za-z0-9 ._-]{0,62}$",
            "x-order": 1
          },
          "port": {
            "type": "integer",
            "description": "Port on 127.0.0.1 for the callback.",
            "minimum": 1024,
            "maximum": 65535,
            "x-order": 2
          },
          "codeChallenge": {
            "type": "string",
            "description": "PKCE S256 code challenge.",
            "pattern": "^[A-Za-z0-9_-]{43}$",
            "x-order": 3
          },
          "codeChallengeMethod": {
            "type": "string",
            "description": "PKCE challenge method.",
            "enum": [
              "S256"
            ],
            "x-order": 4
          },
          "state": {
            "type": "string",
            "description": "Opaque client state returned on the callback.",
            "minLength": 8,
            "maxLength": 512,
            "x-order": 5
          }
        }
      },
      "NativeCodeExchangePayload": {
        "type": "object",
        "additionalProperties": false,
        "description": "Redeems a native client authorization code with its PKCE verifier.",
        "required": [
          "code",
          "codeVerifier"
        ],
        "properties": {
          "code": {
            "type": "string",
            "description": "Single-use authorization code from the loopback callback.",
            "minLength": 1,
            "maxLength": 128,
            "x-order": 1
          },
          "codeVerifier": {
            "type": "string",
            "description": "PKCE code verifier (RFC 7636, 43 to 128 unreserved characters).",
            "pattern": "^[A-Za-z0-9._~-]{43,128}$",
            "x-order": 2
          }
        }
      },
      "NativeAuthorizationCallback": {
        "type": "object",
        "description": "Query parameters of the loopback redirect that approveNativeClientAuthorization answers with, http://127.0.0.1:{port}/callback?code=...&state=... The code is single-use and expires after 60 seconds; no token is ever placed in the URL. The native client compares state with the one it sent before redeeming the code at /api/identity/native/token.",
        "required": [
          "code",
          "state"
        ],
        "properties": {
          "code": {
            "type": "string",
            "description": "Single-use authorization code, redeemed with the PKCE code verifier.",
            "minLength": 1,
            "maxLength": 128,
            "x-order": 1
          },
          "state": {
            "type": "string",
            "description": "The state the native client sent to the consent page, unchanged.",
            "minLength": 8,
            "maxLength": 512,
            "x-order": 2
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
