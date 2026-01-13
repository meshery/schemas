/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const KeySchema = {
  "openapi": "3.0.0",
  "info": {
    "title": "key",
    "version": "1.0.0"
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
    }
  ],
  "paths": {
    "/api/identity/orgs/{orgID}/users/keys": {
      "get": {
        "tags": [
          "users"
        ],
        "operationId": "getUserKeys",
        "summary": "Get User Keys",
        "description": "Get all keys based on roles assigned to user",
        "parameters": [
          {
            "name": "orgID",
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
          }
        ],
        "responses": {
          "200": {
            "description": "Returns user keys based on roles assigned to user",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "page",
                    "page_size",
                    "total_count",
                    "keys"
                  ],
                  "properties": {
                    "page": {
                      "x-order": 1,
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "page_size": {
                      "x-order": 2,
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "total_count": {
                      "x-order": 3,
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "keys": {
                      "type": "array",
                      "items": {
                        "x-go-type": "Key",
                        "type": "object",
                        "description": "Represents an authorization key used for access control.",
                        "required": [
                          "id",
                          "owner",
                          "function",
                          "category",
                          "subcategory",
                          "description",
                          "created_at",
                          "updated_at"
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
                              "db": "id"
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
                              "db": "owner"
                            },
                            "x-order": 2
                          },
                          "function": {
                            "type": "string",
                            "description": "Operation permitted by the key.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "function"
                            },
                            "x-order": 3
                          },
                          "category": {
                            "type": "string",
                            "description": "Category for the key.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "category"
                            },
                            "x-order": 4
                          },
                          "subcategory": {
                            "type": "string",
                            "description": "Subcategory for the key.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "subcategory"
                            },
                            "x-order": 5
                          },
                          "description": {
                            "type": "string",
                            "description": "Human readable description of the key.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "description"
                            },
                            "x-order": 6
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
                          "updated_at": {
                            "x-order": 8,
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
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at"
                            },
                            "x-order": 9,
                            "description": "SQL null Timestamp to handle null values of time.",
                            "x-go-type": "sql.NullTime",
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          }
                        }
                      },
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
                  "required": [
                    "page",
                    "page_size",
                    "total_count",
                    "keys"
                  ],
                  "properties": {
                    "page": {
                      "x-order": 1,
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "page_size": {
                      "x-order": 2,
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "total_count": {
                      "x-order": 3,
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "keys": {
                      "type": "array",
                      "items": {
                        "x-go-type": "Key",
                        "type": "object",
                        "description": "Represents an authorization key used for access control.",
                        "required": [
                          "id",
                          "owner",
                          "function",
                          "category",
                          "subcategory",
                          "description",
                          "created_at",
                          "updated_at"
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
                              "db": "id"
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
                              "db": "owner"
                            },
                            "x-order": 2
                          },
                          "function": {
                            "type": "string",
                            "description": "Operation permitted by the key.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "function"
                            },
                            "x-order": 3
                          },
                          "category": {
                            "type": "string",
                            "description": "Category for the key.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "category"
                            },
                            "x-order": 4
                          },
                          "subcategory": {
                            "type": "string",
                            "description": "Subcategory for the key.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "subcategory"
                            },
                            "x-order": 5
                          },
                          "description": {
                            "type": "string",
                            "description": "Human readable description of the key.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "description"
                            },
                            "x-order": 6
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
                          "updated_at": {
                            "x-order": 8,
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
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at"
                            },
                            "x-order": 9,
                            "description": "SQL null Timestamp to handle null values of time.",
                            "x-go-type": "sql.NullTime",
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          }
                        }
                      },
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
                    "x-order": 1
                  },
                  "function": {
                    "type": "string",
                    "description": "Operation permitted by the key.",
                    "x-order": 2
                  },
                  "category": {
                    "type": "string",
                    "description": "Category for the key.",
                    "x-order": 3
                  },
                  "subcategory": {
                    "type": "string",
                    "description": "Subcategory for the key.",
                    "x-order": 4
                  },
                  "description": {
                    "type": "string",
                    "description": "Human readable description of the key.",
                    "x-order": 5
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Key upserted successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Represents an authorization key used for access control.",
                  "required": [
                    "id",
                    "owner",
                    "function",
                    "category",
                    "subcategory",
                    "description",
                    "created_at",
                    "updated_at"
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
                        "db": "id"
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
                        "db": "owner"
                      },
                      "x-order": 2
                    },
                    "function": {
                      "type": "string",
                      "description": "Operation permitted by the key.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "function"
                      },
                      "x-order": 3
                    },
                    "category": {
                      "type": "string",
                      "description": "Category for the key.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "category"
                      },
                      "x-order": 4
                    },
                    "subcategory": {
                      "type": "string",
                      "description": "Subcategory for the key.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "subcategory"
                      },
                      "x-order": 5
                    },
                    "description": {
                      "type": "string",
                      "description": "Human readable description of the key.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "description"
                      },
                      "x-order": 6
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
                    "updated_at": {
                      "x-order": 8,
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
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at"
                      },
                      "x-order": 9,
                      "description": "SQL null Timestamp to handle null values of time.",
                      "x-go-type": "sql.NullTime",
                      "type": "string",
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
            "description": "Key fetched successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Represents an authorization key used for access control.",
                  "required": [
                    "id",
                    "owner",
                    "function",
                    "category",
                    "subcategory",
                    "description",
                    "created_at",
                    "updated_at"
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
                        "db": "id"
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
                        "db": "owner"
                      },
                      "x-order": 2
                    },
                    "function": {
                      "type": "string",
                      "description": "Operation permitted by the key.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "function"
                      },
                      "x-order": 3
                    },
                    "category": {
                      "type": "string",
                      "description": "Category for the key.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "category"
                      },
                      "x-order": 4
                    },
                    "subcategory": {
                      "type": "string",
                      "description": "Subcategory for the key.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "subcategory"
                      },
                      "x-order": 5
                    },
                    "description": {
                      "type": "string",
                      "description": "Human readable description of the key.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "description"
                      },
                      "x-order": 6
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
                    "updated_at": {
                      "x-order": 8,
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
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at"
                      },
                      "x-order": 9,
                      "description": "SQL null Timestamp to handle null values of time.",
                      "x-go-type": "sql.NullTime",
                      "type": "string",
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
            "description": "Key deleted successfully"
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
      "orgID": {
        "name": "orgID",
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
        "description": "Represents an authorization key used for access control.",
        "required": [
          "id",
          "owner",
          "function",
          "category",
          "subcategory",
          "description",
          "created_at",
          "updated_at"
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
              "db": "id"
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
              "db": "owner"
            },
            "x-order": 2
          },
          "function": {
            "type": "string",
            "description": "Operation permitted by the key.",
            "x-oapi-codegen-extra-tags": {
              "db": "function"
            },
            "x-order": 3
          },
          "category": {
            "type": "string",
            "description": "Category for the key.",
            "x-oapi-codegen-extra-tags": {
              "db": "category"
            },
            "x-order": 4
          },
          "subcategory": {
            "type": "string",
            "description": "Subcategory for the key.",
            "x-oapi-codegen-extra-tags": {
              "db": "subcategory"
            },
            "x-order": 5
          },
          "description": {
            "type": "string",
            "description": "Human readable description of the key.",
            "x-oapi-codegen-extra-tags": {
              "db": "description"
            },
            "x-order": 6
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
          "updated_at": {
            "x-order": 8,
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
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at"
            },
            "x-order": 9,
            "description": "SQL null Timestamp to handle null values of time.",
            "x-go-type": "sql.NullTime",
            "type": "string",
            "x-go-type-skip-optional-pointer": true
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
            "x-order": 1
          },
          "function": {
            "type": "string",
            "description": "Operation permitted by the key.",
            "x-order": 2
          },
          "category": {
            "type": "string",
            "description": "Category for the key.",
            "x-order": 3
          },
          "subcategory": {
            "type": "string",
            "description": "Subcategory for the key.",
            "x-order": 4
          },
          "description": {
            "type": "string",
            "description": "Human readable description of the key.",
            "x-order": 5
          }
        }
      },
      "KeyPage": {
        "type": "object",
        "required": [
          "page",
          "page_size",
          "total_count",
          "keys"
        ],
        "properties": {
          "page": {
            "x-order": 1,
            "type": "integer",
            "x-go-type-skip-optional-pointer": true
          },
          "page_size": {
            "x-order": 2,
            "type": "integer",
            "x-go-type-skip-optional-pointer": true
          },
          "total_count": {
            "x-order": 3,
            "type": "integer",
            "x-go-type-skip-optional-pointer": true
          },
          "keys": {
            "type": "array",
            "items": {
              "x-go-type": "Key",
              "type": "object",
              "description": "Represents an authorization key used for access control.",
              "required": [
                "id",
                "owner",
                "function",
                "category",
                "subcategory",
                "description",
                "created_at",
                "updated_at"
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
                    "db": "id"
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
                    "db": "owner"
                  },
                  "x-order": 2
                },
                "function": {
                  "type": "string",
                  "description": "Operation permitted by the key.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "function"
                  },
                  "x-order": 3
                },
                "category": {
                  "type": "string",
                  "description": "Category for the key.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "category"
                  },
                  "x-order": 4
                },
                "subcategory": {
                  "type": "string",
                  "description": "Subcategory for the key.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "subcategory"
                  },
                  "x-order": 5
                },
                "description": {
                  "type": "string",
                  "description": "Human readable description of the key.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "description"
                  },
                  "x-order": 6
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
                "updated_at": {
                  "x-order": 8,
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
                  "x-oapi-codegen-extra-tags": {
                    "db": "deleted_at"
                  },
                  "x-order": 9,
                  "description": "SQL null Timestamp to handle null values of time.",
                  "x-go-type": "sql.NullTime",
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                }
              }
            },
            "x-order": 4
          }
        }
      }
    }
  }
} as const;

export default KeySchema;
