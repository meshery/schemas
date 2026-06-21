/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const CredentialSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "credential",
    "description": "Documentation for Meshery Cloud REST APIs for Credentials",
    "contact": {
      "name": "Meshery Maintainers",
      "email": "maintainers@meshery.io",
      "url": "https://meshery.io"
    },
    "license": {
      "name": "Apache 2.0",
      "url": "https://www.apache.org/licenses/LICENSE-2.0.html"
    },
    "version": "v1beta2"
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
      "name": "credentials",
      "description": "Operations related to integration credentials"
    }
  ],
  "paths": {
    "/api/integrations/credentials": {
      "get": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "credentials"
        ],
        "summary": "Get credentials",
        "operationId": "getUserCredentials",
        "description": "Retrieves all credentials belonging to the authenticated user.",
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
            "description": "Credentials response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A paginated list of credentials.",
                  "required": [
                    "credentials",
                    "total_count",
                    "page",
                    "page_size"
                  ],
                  "properties": {
                    "credentials": {
                      "type": "array",
                      "items": {
                        "x-go-type": "Credential",
                        "type": "object",
                        "additionalProperties": false,
                        "description": "Meshery Credentials store sensitive information such as API keys, tokens, and passwords used by connections to external systems.\n",
                        "required": [
                          "id",
                          "name",
                          "type",
                          "userId",
                          "createdAt",
                          "updatedAt"
                        ],
                        "properties": {
                          "id": {
                            "description": "Unique identifier for the credential.",
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
                          "name": {
                            "type": "string",
                            "description": "Human-readable name for the credential.",
                            "x-order": 2,
                            "x-oapi-codegen-extra-tags": {
                              "db": "name"
                            },
                            "minLength": 1,
                            "maxLength": 255
                          },
                          "userId": {
                            "description": "UUID of the user who owns this credential.",
                            "x-order": 3,
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
                          "type": {
                            "type": "string",
                            "description": "Credential type (e.g. token, basic, AWS).",
                            "x-order": 4,
                            "x-oapi-codegen-extra-tags": {
                              "db": "type"
                            },
                            "maxLength": 255
                          },
                          "secret": {
                            "type": "object",
                            "description": "Key-value pairs containing the sensitive credential data.",
                            "x-order": 5,
                            "x-go-type": "core.Map",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "secret"
                            }
                          },
                          "createdAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the credential was created.",
                            "x-go-type": "time.Time",
                            "x-go-type-skip-optional-pointer": true,
                            "x-order": 6,
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at"
                            }
                          },
                          "updatedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the credential was last updated.",
                            "x-go-type": "time.Time",
                            "x-go-type-skip-optional-pointer": true,
                            "x-order": 7,
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at"
                            }
                          },
                          "deletedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the credential was soft-deleted.",
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-order": 8,
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at"
                            }
                          }
                        }
                      },
                      "x-order": 1,
                      "description": "The credentials returned on the current page."
                    },
                    "total_count": {
                      "type": "integer",
                      "description": "Total number of credentials across all pages.",
                      "x-order": 2,
                      "minimum": 0
                    },
                    "page": {
                      "type": "integer",
                      "description": "Current page number (zero-based).",
                      "x-order": 3,
                      "minimum": 0
                    },
                    "page_size": {
                      "type": "integer",
                      "description": "Number of credentials per page.",
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
          "credentials"
        ],
        "summary": "Save credential",
        "operationId": "saveUserCredential",
        "description": "Saves a new credential for the authenticated user.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for creating or updating a credential.",
                "required": [
                  "name",
                  "type"
                ],
                "properties": {
                  "id": {
                    "description": "Existing credential ID for updates; omit on create.",
                    "x-order": 1,
                    "x-oapi-codegen-extra-tags": {
                      "json": "id,omitempty"
                    },
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  },
                  "name": {
                    "type": "string",
                    "description": "Human-readable name for the credential.",
                    "x-order": 2,
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "userId": {
                    "description": "UUID of the user who owns this credential.",
                    "x-order": 3,
                    "x-oapi-codegen-extra-tags": {
                      "json": "userId,omitempty"
                    },
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  },
                  "type": {
                    "type": "string",
                    "description": "Credential type (e.g. token, basic, AWS).",
                    "x-order": 4,
                    "maxLength": 255
                  },
                  "secret": {
                    "type": "object",
                    "description": "Key-value pairs containing the sensitive credential data.",
                    "x-order": 5,
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core"
                    },
                    "x-go-type-skip-optional-pointer": true
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Credential saved",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": false,
                  "description": "Meshery Credentials store sensitive information such as API keys, tokens, and passwords used by connections to external systems.\n",
                  "required": [
                    "id",
                    "name",
                    "type",
                    "userId",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Unique identifier for the credential.",
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
                    "name": {
                      "type": "string",
                      "description": "Human-readable name for the credential.",
                      "x-order": 2,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      },
                      "minLength": 1,
                      "maxLength": 255
                    },
                    "userId": {
                      "description": "UUID of the user who owns this credential.",
                      "x-order": 3,
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
                    "type": {
                      "type": "string",
                      "description": "Credential type (e.g. token, basic, AWS).",
                      "x-order": 4,
                      "x-oapi-codegen-extra-tags": {
                        "db": "type"
                      },
                      "maxLength": 255
                    },
                    "secret": {
                      "type": "object",
                      "description": "Key-value pairs containing the sensitive credential data.",
                      "x-order": 5,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "secret"
                      }
                    },
                    "createdAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the credential was created.",
                      "x-go-type": "time.Time",
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 6,
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      }
                    },
                    "updatedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the credential was last updated.",
                      "x-go-type": "time.Time",
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 7,
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      }
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the credential was soft-deleted.",
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 8,
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at"
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
      "put": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "credentials"
        ],
        "summary": "Update credential",
        "operationId": "updateUserCredential",
        "description": "Updates an existing credential for the authenticated user.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for creating or updating a credential.",
                "required": [
                  "name",
                  "type"
                ],
                "properties": {
                  "id": {
                    "description": "Existing credential ID for updates; omit on create.",
                    "x-order": 1,
                    "x-oapi-codegen-extra-tags": {
                      "json": "id,omitempty"
                    },
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  },
                  "name": {
                    "type": "string",
                    "description": "Human-readable name for the credential.",
                    "x-order": 2,
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "userId": {
                    "description": "UUID of the user who owns this credential.",
                    "x-order": 3,
                    "x-oapi-codegen-extra-tags": {
                      "json": "userId,omitempty"
                    },
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  },
                  "type": {
                    "type": "string",
                    "description": "Credential type (e.g. token, basic, AWS).",
                    "x-order": 4,
                    "maxLength": 255
                  },
                  "secret": {
                    "type": "object",
                    "description": "Key-value pairs containing the sensitive credential data.",
                    "x-order": 5,
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core"
                    },
                    "x-go-type-skip-optional-pointer": true
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Credential updated",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": false,
                  "description": "Meshery Credentials store sensitive information such as API keys, tokens, and passwords used by connections to external systems.\n",
                  "required": [
                    "id",
                    "name",
                    "type",
                    "userId",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Unique identifier for the credential.",
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
                    "name": {
                      "type": "string",
                      "description": "Human-readable name for the credential.",
                      "x-order": 2,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      },
                      "minLength": 1,
                      "maxLength": 255
                    },
                    "userId": {
                      "description": "UUID of the user who owns this credential.",
                      "x-order": 3,
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
                    "type": {
                      "type": "string",
                      "description": "Credential type (e.g. token, basic, AWS).",
                      "x-order": 4,
                      "x-oapi-codegen-extra-tags": {
                        "db": "type"
                      },
                      "maxLength": 255
                    },
                    "secret": {
                      "type": "object",
                      "description": "Key-value pairs containing the sensitive credential data.",
                      "x-order": 5,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "secret"
                      }
                    },
                    "createdAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the credential was created.",
                      "x-go-type": "time.Time",
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 6,
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      }
                    },
                    "updatedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the credential was last updated.",
                      "x-go-type": "time.Time",
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 7,
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      }
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the credential was soft-deleted.",
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 8,
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at"
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
          "credentials"
        ],
        "summary": "Delete credential",
        "operationId": "deleteUserCredential",
        "description": "Deletes a credential belonging to the authenticated user.",
        "parameters": [
          {
            "name": "credentialId",
            "in": "query",
            "description": "Credential ID",
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
            "description": "Credential deleted"
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
    "/api/integrations/credentials/{credentialId}": {
      "get": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "credentials"
        ],
        "summary": "Get credential by ID",
        "operationId": "getCredentialById",
        "description": "Retrieves a specific credential by its ID.",
        "parameters": [
          {
            "name": "credentialId",
            "in": "path",
            "description": "Credential ID",
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
            "description": "Credential response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": false,
                  "description": "Meshery Credentials store sensitive information such as API keys, tokens, and passwords used by connections to external systems.\n",
                  "required": [
                    "id",
                    "name",
                    "type",
                    "userId",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Unique identifier for the credential.",
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
                    "name": {
                      "type": "string",
                      "description": "Human-readable name for the credential.",
                      "x-order": 2,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      },
                      "minLength": 1,
                      "maxLength": 255
                    },
                    "userId": {
                      "description": "UUID of the user who owns this credential.",
                      "x-order": 3,
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
                    "type": {
                      "type": "string",
                      "description": "Credential type (e.g. token, basic, AWS).",
                      "x-order": 4,
                      "x-oapi-codegen-extra-tags": {
                        "db": "type"
                      },
                      "maxLength": 255
                    },
                    "secret": {
                      "type": "object",
                      "description": "Key-value pairs containing the sensitive credential data.",
                      "x-order": 5,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "secret"
                      }
                    },
                    "createdAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the credential was created.",
                      "x-go-type": "time.Time",
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 6,
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      }
                    },
                    "updatedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the credential was last updated.",
                      "x-go-type": "time.Time",
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 7,
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      }
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the credential was soft-deleted.",
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 8,
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at"
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
      "credentialId": {
        "name": "credentialId",
        "in": "path",
        "description": "Credential ID",
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
      "credentialIdQuery": {
        "name": "credentialId",
        "in": "query",
        "description": "Credential ID",
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
      }
    },
    "schemas": {
      "Credential": {
        "type": "object",
        "additionalProperties": false,
        "description": "Meshery Credentials store sensitive information such as API keys, tokens, and passwords used by connections to external systems.\n",
        "required": [
          "id",
          "name",
          "type",
          "userId",
          "createdAt",
          "updatedAt"
        ],
        "properties": {
          "id": {
            "description": "Unique identifier for the credential.",
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
          "name": {
            "type": "string",
            "description": "Human-readable name for the credential.",
            "x-order": 2,
            "x-oapi-codegen-extra-tags": {
              "db": "name"
            },
            "minLength": 1,
            "maxLength": 255
          },
          "userId": {
            "description": "UUID of the user who owns this credential.",
            "x-order": 3,
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
          "type": {
            "type": "string",
            "description": "Credential type (e.g. token, basic, AWS).",
            "x-order": 4,
            "x-oapi-codegen-extra-tags": {
              "db": "type"
            },
            "maxLength": 255
          },
          "secret": {
            "type": "object",
            "description": "Key-value pairs containing the sensitive credential data.",
            "x-order": 5,
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "secret"
            }
          },
          "createdAt": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the credential was created.",
            "x-go-type": "time.Time",
            "x-go-type-skip-optional-pointer": true,
            "x-order": 6,
            "x-oapi-codegen-extra-tags": {
              "db": "created_at"
            }
          },
          "updatedAt": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the credential was last updated.",
            "x-go-type": "time.Time",
            "x-go-type-skip-optional-pointer": true,
            "x-order": 7,
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at"
            }
          },
          "deletedAt": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the credential was soft-deleted.",
            "x-go-type": "core.NullTime",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-order": 8,
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at"
            }
          }
        }
      },
      "CredentialPayload": {
        "type": "object",
        "description": "Payload for creating or updating a credential.",
        "required": [
          "name",
          "type"
        ],
        "properties": {
          "id": {
            "description": "Existing credential ID for updates; omit on create.",
            "x-order": 1,
            "x-oapi-codegen-extra-tags": {
              "json": "id,omitempty"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "name": {
            "type": "string",
            "description": "Human-readable name for the credential.",
            "x-order": 2,
            "minLength": 1,
            "maxLength": 255
          },
          "userId": {
            "description": "UUID of the user who owns this credential.",
            "x-order": 3,
            "x-oapi-codegen-extra-tags": {
              "json": "userId,omitempty"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "type": {
            "type": "string",
            "description": "Credential type (e.g. token, basic, AWS).",
            "x-order": 4,
            "maxLength": 255
          },
          "secret": {
            "type": "object",
            "description": "Key-value pairs containing the sensitive credential data.",
            "x-order": 5,
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core"
            },
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "CredentialPage": {
        "type": "object",
        "description": "A paginated list of credentials.",
        "required": [
          "credentials",
          "total_count",
          "page",
          "page_size"
        ],
        "properties": {
          "credentials": {
            "type": "array",
            "items": {
              "x-go-type": "Credential",
              "type": "object",
              "additionalProperties": false,
              "description": "Meshery Credentials store sensitive information such as API keys, tokens, and passwords used by connections to external systems.\n",
              "required": [
                "id",
                "name",
                "type",
                "userId",
                "createdAt",
                "updatedAt"
              ],
              "properties": {
                "id": {
                  "description": "Unique identifier for the credential.",
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
                "name": {
                  "type": "string",
                  "description": "Human-readable name for the credential.",
                  "x-order": 2,
                  "x-oapi-codegen-extra-tags": {
                    "db": "name"
                  },
                  "minLength": 1,
                  "maxLength": 255
                },
                "userId": {
                  "description": "UUID of the user who owns this credential.",
                  "x-order": 3,
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
                "type": {
                  "type": "string",
                  "description": "Credential type (e.g. token, basic, AWS).",
                  "x-order": 4,
                  "x-oapi-codegen-extra-tags": {
                    "db": "type"
                  },
                  "maxLength": 255
                },
                "secret": {
                  "type": "object",
                  "description": "Key-value pairs containing the sensitive credential data.",
                  "x-order": 5,
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "secret"
                  }
                },
                "createdAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Timestamp when the credential was created.",
                  "x-go-type": "time.Time",
                  "x-go-type-skip-optional-pointer": true,
                  "x-order": 6,
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at"
                  }
                },
                "updatedAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Timestamp when the credential was last updated.",
                  "x-go-type": "time.Time",
                  "x-go-type-skip-optional-pointer": true,
                  "x-order": 7,
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at"
                  }
                },
                "deletedAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Timestamp when the credential was soft-deleted.",
                  "x-go-type": "core.NullTime",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-order": 8,
                  "x-oapi-codegen-extra-tags": {
                    "db": "deleted_at"
                  }
                }
              }
            },
            "x-order": 1,
            "description": "The credentials returned on the current page."
          },
          "total_count": {
            "type": "integer",
            "description": "Total number of credentials across all pages.",
            "x-order": 2,
            "minimum": 0
          },
          "page": {
            "type": "integer",
            "description": "Current page number (zero-based).",
            "x-order": 3,
            "minimum": 0
          },
          "page_size": {
            "type": "integer",
            "description": "Number of credentials per page.",
            "x-order": 4,
            "minimum": 1
          }
        }
      }
    }
  }
};

export default CredentialSchema;
