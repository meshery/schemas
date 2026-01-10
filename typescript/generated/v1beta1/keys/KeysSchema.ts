/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const KeysSchema = {
  "openapi": "3.0.0",
  "info": {
    "title": "keys",
    "version": "1.0.0"
  },
  "security": [
    {
      "jwt": []
    }
  ],
  "tags": [
    {
      "name": "Keys",
      "description": "Operations related to authorization keys"
    },
    {
      "name": "Keychains",
      "description": "Operations related to keychains"
    }
  ],
  "paths": {
    "/api/auth/keys": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Keys"
        ],
        "summary": "List keys",
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
            "description": "Keys fetched successfully",
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
                            "description": "Unique identifier for the key.",
                            "x-go-name": "ID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "id"
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
                            "description": "Owner of the key.",
                            "x-go-name": "Owner",
                            "x-oapi-codegen-extra-tags": {
                              "db": "owner"
                            },
                            "x-order": 2,
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
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
          "Keys"
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
                    "description": "Existing key identifier for updates.",
                    "x-order": 1,
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
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
                      "description": "Unique identifier for the key.",
                      "x-go-name": "ID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id"
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
                      "description": "Owner of the key.",
                      "x-go-name": "Owner",
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner"
                      },
                      "x-order": 2,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
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
    "/api/auth/keys/{keyId}": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Keys"
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
                      "description": "Unique identifier for the key.",
                      "x-go-name": "ID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id"
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
                      "description": "Owner of the key.",
                      "x-go-name": "Owner",
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner"
                      },
                      "x-order": 2,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
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
          "Keys"
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
    },
    "/api/auth/keychains": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Keychains"
        ],
        "summary": "List keychains",
        "operationId": "getKeychains",
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
            "description": "Keychains fetched successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "page",
                    "page_size",
                    "total_count",
                    "keychains"
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
                    "keychains": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "description": "Represents a collection of keys.",
                        "required": [
                          "id",
                          "name",
                          "owner",
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
                          "name": {
                            "type": "string",
                            "description": "Name of the keychain.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "name"
                            },
                            "x-order": 2
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
                            "x-order": 3
                          },
                          "created_at": {
                            "x-order": 4,
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
                            "x-order": 5,
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
                            "x-order": 6,
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
          "Keychains"
        ],
        "summary": "Create a keychain",
        "operationId": "createKeychain",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for creating or updating a keychain.",
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "Name of the keychain.",
                    "x-order": 1
                  }
                },
                "required": [
                  "name"
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Keychain created successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Represents a collection of keys.",
                  "required": [
                    "id",
                    "name",
                    "owner",
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
                    "name": {
                      "type": "string",
                      "description": "Name of the keychain.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      },
                      "x-order": 2
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
                      "x-order": 3
                    },
                    "created_at": {
                      "x-order": 4,
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
                      "x-order": 5,
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
                      "x-order": 6,
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
    "/api/auth/keychains/{keychainId}": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Keychains"
        ],
        "summary": "Get keychain by ID",
        "operationId": "getKeychainById",
        "parameters": [
          {
            "name": "keychainId",
            "in": "path",
            "description": "Keychain ID",
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
            "description": "Keychain fetched successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Represents a collection of keys.",
                  "required": [
                    "id",
                    "name",
                    "owner",
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
                    "name": {
                      "type": "string",
                      "description": "Name of the keychain.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      },
                      "x-order": 2
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
                      "x-order": 3
                    },
                    "created_at": {
                      "x-order": 4,
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
                      "x-order": 5,
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
                      "x-order": 6,
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
      "put": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Keychains"
        ],
        "summary": "Update keychain",
        "operationId": "updateKeychain",
        "parameters": [
          {
            "name": "keychainId",
            "in": "path",
            "description": "Keychain ID",
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
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for creating or updating a keychain.",
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "Name of the keychain.",
                    "x-order": 1
                  }
                },
                "required": [
                  "name"
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Keychain updated successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Represents a collection of keys.",
                  "required": [
                    "id",
                    "name",
                    "owner",
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
                    "name": {
                      "type": "string",
                      "description": "Name of the keychain.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      },
                      "x-order": 2
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
                      "x-order": 3
                    },
                    "created_at": {
                      "x-order": 4,
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
                      "x-order": 5,
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
                      "x-order": 6,
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
          "Keychains"
        ],
        "summary": "Delete keychain",
        "operationId": "deleteKeychain",
        "parameters": [
          {
            "name": "keychainId",
            "in": "path",
            "description": "Keychain ID",
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
            "description": "Keychain deleted successfully"
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
    "/api/auth/keychains/{keychainId}/{keyId}": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Keychains"
        ],
        "summary": "Add key to keychain",
        "operationId": "addKeyToKeychain",
        "parameters": [
          {
            "name": "keychainId",
            "in": "path",
            "description": "Keychain ID",
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
            "description": "Key added to keychain"
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
          "Keychains"
        ],
        "summary": "Remove key from keychain",
        "operationId": "removeKeyFromKeychain",
        "parameters": [
          {
            "name": "keychainId",
            "in": "path",
            "description": "Keychain ID",
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
            "description": "Key removed from keychain"
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
    "/api/auth/keychains/{keychainId}/keys": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Keychains"
        ],
        "summary": "List keys in a keychain",
        "operationId": "getKeysOfKeychain",
        "parameters": [
          {
            "name": "keychainId",
            "in": "path",
            "description": "Keychain ID",
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
            "description": "Keys fetched successfully",
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
                            "description": "Unique identifier for the key.",
                            "x-go-name": "ID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "id"
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
                            "description": "Owner of the key.",
                            "x-go-name": "Owner",
                            "x-oapi-codegen-extra-tags": {
                              "db": "owner"
                            },
                            "x-order": 2,
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
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
      "keychainId": {
        "name": "keychainId",
        "in": "path",
        "description": "Keychain ID",
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
            "description": "Unique identifier for the key.",
            "x-go-name": "ID",
            "x-oapi-codegen-extra-tags": {
              "db": "id"
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
            "description": "Owner of the key.",
            "x-go-name": "Owner",
            "x-oapi-codegen-extra-tags": {
              "db": "owner"
            },
            "x-order": 2,
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
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
            "description": "Existing key identifier for updates.",
            "x-order": 1,
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
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
      "KeysPage": {
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
                  "description": "Unique identifier for the key.",
                  "x-go-name": "ID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "id"
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
                  "description": "Owner of the key.",
                  "x-go-name": "Owner",
                  "x-oapi-codegen-extra-tags": {
                    "db": "owner"
                  },
                  "x-order": 2,
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
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
      },
      "Keychain": {
        "type": "object",
        "description": "Represents a collection of keys.",
        "required": [
          "id",
          "name",
          "owner",
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
          "name": {
            "type": "string",
            "description": "Name of the keychain.",
            "x-oapi-codegen-extra-tags": {
              "db": "name"
            },
            "x-order": 2
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
            "x-order": 3
          },
          "created_at": {
            "x-order": 4,
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
            "x-order": 5,
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
            "x-order": 6,
            "description": "SQL null Timestamp to handle null values of time.",
            "x-go-type": "sql.NullTime",
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "KeychainPayload": {
        "type": "object",
        "description": "Payload for creating or updating a keychain.",
        "properties": {
          "name": {
            "type": "string",
            "description": "Name of the keychain.",
            "x-order": 1
          }
        },
        "required": [
          "name"
        ]
      },
      "KeychainsPage": {
        "type": "object",
        "required": [
          "page",
          "page_size",
          "total_count",
          "keychains"
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
          "keychains": {
            "type": "array",
            "items": {
              "type": "object",
              "description": "Represents a collection of keys.",
              "required": [
                "id",
                "name",
                "owner",
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
                "name": {
                  "type": "string",
                  "description": "Name of the keychain.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "name"
                  },
                  "x-order": 2
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
                  "x-order": 3
                },
                "created_at": {
                  "x-order": 4,
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
                  "x-order": 5,
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
                  "x-order": 6,
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

export default KeysSchema;
