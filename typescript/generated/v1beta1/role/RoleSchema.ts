/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const RoleSchema = {
  "openapi": "3.0.0",
  "info": {
    "title": "role",
    "description": "Documentation for Meshery Cloud REST APIs for Roles",
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
      "name": "roles",
      "description": "Operations related to roles and role assignments"
    }
  ],
  "paths": {
    "/api/identity/roles": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "roles"
        ],
        "summary": "Add role holder",
        "operationId": "addRoleHolder",
        "description": "Assigns a role to a user identified by email.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Request body for assigning a role to a user.",
                "required": [
                  "email",
                  "role_names"
                ],
                "properties": {
                  "email": {
                    "type": "string",
                    "format": "email",
                    "description": "Email of the user to assign roles to.",
                    "x-order": 1
                  },
                  "role_names": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    },
                    "description": "List of role names to assign.",
                    "x-order": 2
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Role holder added successfully"
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
    "/api/identity/roles/{id}": {
      "delete": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "roles"
        ],
        "summary": "Delete role",
        "operationId": "deleteRole",
        "description": "Removes a role assignment by ID.",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "Role ID",
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
            "description": "Role deleted successfully"
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
    "/api/identity/orgs/{orgID}/roles": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "roles"
        ],
        "summary": "Get organization roles",
        "operationId": "getAllRoles",
        "description": "Returns all roles defined for the specified organization.",
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
            "description": "Roles fetched successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A paginated list of roles.",
                  "required": [
                    "page",
                    "page_size",
                    "total_count",
                    "roles"
                  ],
                  "properties": {
                    "page": {
                      "type": "integer",
                      "description": "Current page number (zero-based).",
                      "x-order": 1
                    },
                    "page_size": {
                      "type": "integer",
                      "description": "Number of roles per page.",
                      "x-order": 2
                    },
                    "total_count": {
                      "type": "integer",
                      "description": "Total number of roles across all pages.",
                      "x-order": 3
                    },
                    "roles": {
                      "type": "array",
                      "items": {
                        "x-go-type": "Role",
                        "type": "object",
                        "description": "Role definition for Layer5 Cloud (Meshery).",
                        "required": [
                          "role_name",
                          "description"
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
                            "x-order": 1,
                            "x-oapi-codegen-extra-tags": {
                              "db": "id"
                            }
                          },
                          "role_name": {
                            "type": "string",
                            "description": "Unique name of the role.",
                            "x-order": 2,
                            "x-oapi-codegen-extra-tags": {
                              "db": "role_name"
                            }
                          },
                          "description": {
                            "type": "string",
                            "description": "Human-readable description of the role.",
                            "x-order": 3,
                            "x-oapi-codegen-extra-tags": {
                              "db": "description"
                            }
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
                            "description": "Timestamp when the role was soft-deleted.",
                            "x-order": 6,
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at"
                            },
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
      },
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "roles"
        ],
        "summary": "Upsert organization roles",
        "operationId": "upsertRoles",
        "description": "Creates or updates roles for the specified organization.",
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
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "array",
                "items": {
                  "type": "object",
                  "description": "Role definition for Layer5 Cloud (Meshery).",
                  "required": [
                    "role_name",
                    "description"
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
                      "x-order": 1,
                      "x-oapi-codegen-extra-tags": {
                        "db": "id"
                      }
                    },
                    "role_name": {
                      "type": "string",
                      "description": "Unique name of the role.",
                      "x-order": 2,
                      "x-oapi-codegen-extra-tags": {
                        "db": "role_name"
                      }
                    },
                    "description": {
                      "type": "string",
                      "description": "Human-readable description of the role.",
                      "x-order": 3,
                      "x-oapi-codegen-extra-tags": {
                        "db": "description"
                      }
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
                      "description": "Timestamp when the role was soft-deleted.",
                      "x-order": 6,
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at"
                      },
                      "x-go-type": "sql.NullTime",
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Roles upserted successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A paginated list of roles.",
                  "required": [
                    "page",
                    "page_size",
                    "total_count",
                    "roles"
                  ],
                  "properties": {
                    "page": {
                      "type": "integer",
                      "description": "Current page number (zero-based).",
                      "x-order": 1
                    },
                    "page_size": {
                      "type": "integer",
                      "description": "Number of roles per page.",
                      "x-order": 2
                    },
                    "total_count": {
                      "type": "integer",
                      "description": "Total number of roles across all pages.",
                      "x-order": 3
                    },
                    "roles": {
                      "type": "array",
                      "items": {
                        "x-go-type": "Role",
                        "type": "object",
                        "description": "Role definition for Layer5 Cloud (Meshery).",
                        "required": [
                          "role_name",
                          "description"
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
                            "x-order": 1,
                            "x-oapi-codegen-extra-tags": {
                              "db": "id"
                            }
                          },
                          "role_name": {
                            "type": "string",
                            "description": "Unique name of the role.",
                            "x-order": 2,
                            "x-oapi-codegen-extra-tags": {
                              "db": "role_name"
                            }
                          },
                          "description": {
                            "type": "string",
                            "description": "Human-readable description of the role.",
                            "x-order": 3,
                            "x-oapi-codegen-extra-tags": {
                              "db": "description"
                            }
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
                            "description": "Timestamp when the role was soft-deleted.",
                            "x-order": 6,
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at"
                            },
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
      "put": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "roles"
        ],
        "summary": "Bulk edit role holders",
        "operationId": "bulkEditRoleHolder",
        "description": "Updates role assignments for multiple users in the organization.",
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
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "array",
                "items": {
                  "type": "object",
                  "description": "Request to update role assignments for a user.",
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
                    "user_id": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-order": 2
                    },
                    "username": {
                      "type": "string",
                      "x-order": 3
                    },
                    "email": {
                      "type": "string",
                      "format": "email",
                      "x-order": 4
                    },
                    "first_name": {
                      "type": "string",
                      "x-order": 5
                    },
                    "last_name": {
                      "type": "string",
                      "x-order": 6
                    },
                    "status": {
                      "type": "string",
                      "x-order": 7
                    },
                    "role_names": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      },
                      "x-order": 8
                    },
                    "created_at": {
                      "x-order": 9,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updated_at": {
                      "x-order": 10,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deleted_at": {
                      "x-order": 11,
                      "description": "SQL null Timestamp to handle null values of time.",
                      "x-go-type": "sql.NullTime",
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Role holders updated successfully"
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
    "/api/identity/orgs/{orgID}/roles/{roleID}/keychains": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "roles"
        ],
        "summary": "Get keychains for role",
        "operationId": "getRoleKeychains",
        "description": "Returns all keychains assigned to the specified role.",
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
          },
          {
            "name": "roleID",
            "in": "path",
            "description": "Role ID",
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
            "description": "Keychains fetched successfully"
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
    "/api/identity/orgs/{orgID}/roles/{roleID}/keychains/{keychainID}": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "roles"
        ],
        "summary": "Assign keychain to role",
        "operationId": "assignKeychainToRole",
        "description": "Associates a keychain with the specified role.",
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
          },
          {
            "name": "roleID",
            "in": "path",
            "description": "Role ID",
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
            "name": "keychainID",
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
            "description": "Keychain assigned to role successfully"
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
          "roles"
        ],
        "summary": "Unassign keychain from role",
        "operationId": "unassignKeychainFromRole",
        "description": "Removes the association between a keychain and a role.",
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
          },
          {
            "name": "roleID",
            "in": "path",
            "description": "Role ID",
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
            "name": "keychainID",
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
            "description": "Keychain unassigned from role successfully"
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
        "description": "Role ID",
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
      "roleID": {
        "name": "roleID",
        "in": "path",
        "description": "Role ID",
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
      "keychainID": {
        "name": "keychainID",
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
      "Role": {
        "type": "object",
        "description": "Role definition for Layer5 Cloud (Meshery).",
        "required": [
          "role_name",
          "description"
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
            "x-order": 1,
            "x-oapi-codegen-extra-tags": {
              "db": "id"
            }
          },
          "role_name": {
            "type": "string",
            "description": "Unique name of the role.",
            "x-order": 2,
            "x-oapi-codegen-extra-tags": {
              "db": "role_name"
            }
          },
          "description": {
            "type": "string",
            "description": "Human-readable description of the role.",
            "x-order": 3,
            "x-oapi-codegen-extra-tags": {
              "db": "description"
            }
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
            "description": "Timestamp when the role was soft-deleted.",
            "x-order": 6,
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at"
            },
            "x-go-type": "sql.NullTime",
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "RolesPage": {
        "type": "object",
        "description": "A paginated list of roles.",
        "required": [
          "page",
          "page_size",
          "total_count",
          "roles"
        ],
        "properties": {
          "page": {
            "type": "integer",
            "description": "Current page number (zero-based).",
            "x-order": 1
          },
          "page_size": {
            "type": "integer",
            "description": "Number of roles per page.",
            "x-order": 2
          },
          "total_count": {
            "type": "integer",
            "description": "Total number of roles across all pages.",
            "x-order": 3
          },
          "roles": {
            "type": "array",
            "items": {
              "x-go-type": "Role",
              "type": "object",
              "description": "Role definition for Layer5 Cloud (Meshery).",
              "required": [
                "role_name",
                "description"
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
                  "x-order": 1,
                  "x-oapi-codegen-extra-tags": {
                    "db": "id"
                  }
                },
                "role_name": {
                  "type": "string",
                  "description": "Unique name of the role.",
                  "x-order": 2,
                  "x-oapi-codegen-extra-tags": {
                    "db": "role_name"
                  }
                },
                "description": {
                  "type": "string",
                  "description": "Human-readable description of the role.",
                  "x-order": 3,
                  "x-oapi-codegen-extra-tags": {
                    "db": "description"
                  }
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
                  "description": "Timestamp when the role was soft-deleted.",
                  "x-order": 6,
                  "x-oapi-codegen-extra-tags": {
                    "db": "deleted_at"
                  },
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
      "RolesKeychainsMapping": {
        "type": "object",
        "description": "Mapping between a role and a keychain.",
        "required": [
          "id",
          "keychain_id",
          "role_id",
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
            "x-order": 1,
            "x-oapi-codegen-extra-tags": {
              "db": "id"
            }
          },
          "keychain_id": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-order": 2,
            "x-oapi-codegen-extra-tags": {
              "db": "keychain_id"
            }
          },
          "role_id": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-order": 3,
            "x-oapi-codegen-extra-tags": {
              "db": "role_id"
            }
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
            "x-order": 6,
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at"
            },
            "description": "SQL null Timestamp to handle null values of time.",
            "x-go-type": "sql.NullTime",
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "RoleHolderRequest": {
        "type": "object",
        "description": "Request body for assigning a role to a user.",
        "required": [
          "email",
          "role_names"
        ],
        "properties": {
          "email": {
            "type": "string",
            "format": "email",
            "description": "Email of the user to assign roles to.",
            "x-order": 1
          },
          "role_names": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "List of role names to assign.",
            "x-order": 2
          }
        }
      },
      "UserRoleUpdateRequest": {
        "type": "object",
        "description": "Request to update role assignments for a user.",
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
          "user_id": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-order": 2
          },
          "username": {
            "type": "string",
            "x-order": 3
          },
          "email": {
            "type": "string",
            "format": "email",
            "x-order": 4
          },
          "first_name": {
            "type": "string",
            "x-order": 5
          },
          "last_name": {
            "type": "string",
            "x-order": 6
          },
          "status": {
            "type": "string",
            "x-order": 7
          },
          "role_names": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "x-order": 8
          },
          "created_at": {
            "x-order": 9,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updated_at": {
            "x-order": 10,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deleted_at": {
            "x-order": 11,
            "description": "SQL null Timestamp to handle null values of time.",
            "x-go-type": "sql.NullTime",
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "Preference": {
        "type": "object",
        "description": "User notification preferences.",
        "required": [
          "welcome_email",
          "notify_role_change"
        ],
        "properties": {
          "welcome_email": {
            "type": "boolean",
            "description": "Whether to send a welcome email to new users.",
            "x-order": 1
          },
          "notify_role_change": {
            "type": "boolean",
            "description": "Whether to notify the user of role changes.",
            "x-order": 2
          }
        }
      }
    }
  }
} as const satisfies Record<string, unknown>;

export default RoleSchema;
