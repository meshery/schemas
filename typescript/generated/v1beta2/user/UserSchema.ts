/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const UserSchema: Record<string, unknown> = {
  "openapi": "3.0.3",
  "info": {
    "title": "User",
    "description": "OpenAPI schema for user management in Meshery Cloud.",
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
      "name": "users",
      "description": "Operations related to users"
    }
  ],
  "paths": {
    "/api/identity/orgs/{orgId}/users": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "users"
        ],
        "operationId": "getUsersForOrg",
        "summary": "Get organization users",
        "description": "Returns organization users, optionally filtered by team membership.",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
            "required": true,
            "description": "Organization ID",
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
            "name": "pageSize",
            "in": "query",
            "description": "Get responses by page size",
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
          },
          {
            "name": "filter",
            "in": "query",
            "description": "Get filtered reponses",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "teamId",
            "in": "query",
            "required": false,
            "description": "Optional team filter when listing organization users",
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
            "description": "Paginated list of organization users",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated list of users with organization and team role context",
                  "required": [
                    "page",
                    "pageSize",
                    "totalCount",
                    "data"
                  ],
                  "properties": {
                    "page": {
                      "type": "integer",
                      "description": "Current page number of the result set.",
                      "minimum": 0
                    },
                    "pageSize": {
                      "type": "integer",
                      "description": "Number of items per page.",
                      "minimum": 1
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of items available.",
                      "minimum": 0
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "additionalProperties": false,
                        "description": "User row returned by Cloud identity-management listings. DB tags match the users_with_roles DAO projection aliases.",
                        "properties": {
                          "userId": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "user_id"
                            }
                          },
                          "username": {
                            "type": "string",
                            "maxLength": 255,
                            "description": "Public username.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "username"
                            }
                          },
                          "email": {
                            "type": "string",
                            "format": "email",
                            "maxLength": 320,
                            "description": "User email address.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "email"
                            }
                          },
                          "firstName": {
                            "type": "string",
                            "maxLength": 200,
                            "description": "User's first name.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "first_name"
                            }
                          },
                          "lastName": {
                            "type": "string",
                            "maxLength": 300,
                            "description": "User's last name.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "last_name"
                            }
                          },
                          "status": {
                            "type": "string",
                            "maxLength": 100,
                            "description": "User account status."
                          },
                          "roleNames": {
                            "type": "array",
                            "description": "Names of roles assigned to the user in the listing context.",
                            "items": {
                              "type": "string",
                              "maxLength": 100
                            },
                            "x-go-type": "pq.StringArray",
                            "x-go-type-import": {
                              "path": "github.com/lib/pq",
                              "name": "pq"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "role_names"
                            }
                          },
                          "createdAt": {
                            "description": "Timestamp when the user was created.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "json": "createdAt"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Legacy listing timestamp currently scanned from the created_at projection.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "json": "updatedAt"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "joinedAt": {
                            "description": "Timestamp when the user joined the filtered team, when listing by team.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "joined_at",
                              "json": "joinedAt"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "lastLoginTime": {
                            "description": "Timestamp when the user last signed in.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "last_login_time",
                              "json": "lastLoginTime"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deletedAt": {
                            "description": "Timestamp when the user was soft-deleted, if applicable.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "json": "deletedAt"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type": "sql.NullTime",
                            "x-go-type-import": {
                              "path": "database/sql"
                            },
                            "x-go-type-skip-optional-pointer": true
                          },
                          "prefs": {
                            "type": "object",
                            "additionalProperties": true,
                            "description": "Legacy role notification preferences attached to listing rows."
                          },
                          "avatarUrl": {
                            "type": "string",
                            "format": "uri",
                            "maxLength": 2048,
                            "description": "URL of the user's avatar image.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "avatar_url"
                            }
                          },
                          "preferences": {
                            "type": "object",
                            "additionalProperties": true,
                            "description": "User preference JSON attached to listing rows.",
                            "x-go-type": "core.Map",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "preferences"
                            }
                          },
                          "organizationWithUserRoles": {
                            "description": "Organization role names derived by Cloud after scanning the user row.",
                            "type": "object",
                            "additionalProperties": false,
                            "properties": {
                              "roleNames": {
                                "type": "array",
                                "description": "Names of roles assigned to the user in the selected organization context.",
                                "items": {
                                  "type": "string",
                                  "maxLength": 100
                                },
                                "x-go-type": "pq.StringArray",
                                "x-go-type-import": {
                                  "path": "github.com/lib/pq",
                                  "name": "pq"
                                }
                              }
                            }
                          },
                          "teamsWithUserRoles": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "description": "Team membership record with role information.",
                              "additionalProperties": false,
                              "required": [
                                "id",
                                "name",
                                "description",
                                "owner",
                                "metadata",
                                "createdAt",
                                "updatedAt",
                                "deletedAt",
                                "roleNames"
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
                                  }
                                },
                                "name": {
                                  "type": "string",
                                  "description": "Team name.",
                                  "maxLength": 255,
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "name"
                                  }
                                },
                                "description": {
                                  "type": "string",
                                  "description": "Team description.",
                                  "maxLength": 1024,
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "description"
                                  }
                                },
                                "owner": {
                                  "type": "string",
                                  "format": "uuid",
                                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                  "x-go-type": "uuid.UUID",
                                  "x-go-type-import": {
                                    "path": "github.com/gofrs/uuid"
                                  },
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "owner"
                                  }
                                },
                                "metadata": {
                                  "type": "object",
                                  "description": "Team metadata stored with the membership row.",
                                  "additionalProperties": true,
                                  "x-go-type": "core.Map",
                                  "x-go-type-import": {
                                    "path": "github.com/meshery/schemas/models/core",
                                    "name": "core"
                                  },
                                  "x-go-type-skip-optional-pointer": true,
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "metadata"
                                  }
                                },
                                "createdAt": {
                                  "description": "Timestamp when the team was created.",
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "created_at",
                                    "json": "createdAt"
                                  },
                                  "type": "string",
                                  "format": "date-time",
                                  "x-go-type-skip-optional-pointer": true
                                },
                                "updatedAt": {
                                  "description": "Timestamp when the team was last updated.",
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "updated_at",
                                    "json": "updatedAt"
                                  },
                                  "type": "string",
                                  "format": "date-time",
                                  "x-go-type-skip-optional-pointer": true
                                },
                                "deletedAt": {
                                  "description": "Timestamp when the team was soft-deleted, if applicable.",
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "deleted_at",
                                    "json": "deletedAt"
                                  },
                                  "x-go-type": "meshcore.NullTime",
                                  "x-go-type-import": {
                                    "name": "meshcore",
                                    "path": "github.com/meshery/schemas/models/core"
                                  },
                                  "type": "string",
                                  "format": "date-time",
                                  "x-go-type-skip-optional-pointer": true
                                },
                                "roleNames": {
                                  "type": "array",
                                  "description": "Names of roles assigned to the user in this team.",
                                  "items": {
                                    "type": "string",
                                    "maxLength": 100
                                  },
                                  "x-go-type": "pq.StringArray",
                                  "x-go-type-import": {
                                    "path": "github.com/lib/pq",
                                    "name": "pq"
                                  },
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "role_names"
                                  }
                                }
                              }
                            },
                            "description": "Team role context for legacy listing consumers when present."
                          }
                        }
                      },
                      "description": "User records returned on this page."
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
    },
    "/api/identity/orgs/{orgId}/users/search": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "users"
        ],
        "operationId": "searchOrganizationUsers",
        "summary": "Search organization users",
        "description": "Returns restricted user records visible to authenticated organization identity-management flows.",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
            "required": true,
            "description": "Organization ID",
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
            "name": "pageSize",
            "in": "query",
            "description": "Get responses by page size",
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
          },
          {
            "name": "filter",
            "in": "query",
            "description": "Get filtered reponses",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Paginated list of searchable organization users",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated list of restricted user records returned by authenticated user search.",
                  "required": [
                    "page",
                    "pageSize",
                    "totalCount",
                    "data"
                  ],
                  "properties": {
                    "page": {
                      "type": "integer",
                      "description": "Current page number of the result set.",
                      "minimum": 0
                    },
                    "pageSize": {
                      "type": "integer",
                      "description": "Number of items per page.",
                      "minimum": 1
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of items available.",
                      "minimum": 0
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "additionalProperties": false,
                        "description": "Restricted user record returned by authenticated user search.",
                        "properties": {
                          "id": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "userId": {
                            "type": "string",
                            "description": "User's public identifier.",
                            "maxLength": 200,
                            "x-id-format": "external"
                          },
                          "username": {
                            "type": "string",
                            "description": "Public username.",
                            "maxLength": 255
                          },
                          "email": {
                            "type": "string",
                            "description": "User email address.",
                            "format": "email",
                            "maxLength": 320
                          },
                          "avatarUrl": {
                            "type": "string",
                            "description": "URL of the user's avatar image.",
                            "format": "uri",
                            "maxLength": 2048
                          }
                        }
                      },
                      "description": "Restricted users matching the search query."
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
    },
    "/api/identity/orgs/{orgId}/users/{userId}": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "users"
        ],
        "operationId": "addUserToOrg",
        "summary": "Add user to organization",
        "description": "Adds a user to an organization.",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
            "required": true,
            "description": "Organization ID",
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
            "name": "userId",
            "in": "path",
            "required": true,
            "description": "User ID",
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
          "201": {
            "description": "User added to organization",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": false,
                  "description": "Mapping between a user and an organization.",
                  "required": [
                    "id",
                    "userId",
                    "organizationId",
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
                      "x-oapi-codegen-extra-tags": {
                        "db": "id"
                      }
                    },
                    "userId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "user_id"
                      }
                    },
                    "organizationId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "organization_id"
                      }
                    },
                    "roleId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "role_id"
                      }
                    },
                    "createdAt": {
                      "description": "Timestamp when the mapping was created.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp when the mapping was last updated.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "description": "Timestamp when the mapping was soft-deleted, if applicable.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type": "sql.NullTime",
                      "x-go-type-import": {
                        "path": "database/sql"
                      },
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
          "403": {
            "description": "User cannot be added to organization",
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
          "users"
        ],
        "operationId": "deleteUserFromOrg",
        "summary": "Remove user from organization",
        "description": "Removes a user from an organization.",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
            "required": true,
            "description": "Organization ID",
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
            "name": "userId",
            "in": "path",
            "required": true,
            "description": "User ID",
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
            "description": "User removed from organization"
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
    "/api/identity/orgs/{orgId}/users/bulk": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "users"
        ],
        "operationId": "bulkDeleteOrganizationUsers",
        "summary": "Bulk delete organization users",
        "description": "Deletes multiple users from an organization.",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
            "required": true,
            "description": "Organization ID",
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
                "description": "Payload for deleting multiple users from an organization. User IDs and email addresses are both required and must be index-aligned so audit and response messages can identify each deleted user.",
                "required": [
                  "userIds",
                  "userEmails"
                ],
                "properties": {
                  "userIds": {
                    "type": "array",
                    "description": "User IDs to delete.",
                    "minItems": 1,
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    }
                  },
                  "userEmails": {
                    "type": "array",
                    "description": "Email addresses for the users to delete.",
                    "minItems": 1,
                    "items": {
                      "type": "string",
                      "format": "email",
                      "description": "email",
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
            "description": "Bulk user deletion result",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string"
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
    },
    "/api/identity/orgs/{orgId}/users/online": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "users"
        ],
        "operationId": "getRecentlyOnlineUsersForOrg",
        "summary": "Get recently online organization users",
        "description": "Returns recently online users for an organization.",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
            "required": true,
            "description": "Organization ID",
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
            "description": "Recently online organization users",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$id": "https://schemas.meshery.io/user.yaml",
                    "$schema": "http://json-schema.org/draft-07/schema#",
                    "type": "object",
                    "description": "Represents a user in Layer5 Cloud (Meshery)",
                    "additionalProperties": false,
                    "required": [
                      "id",
                      "userId",
                      "provider",
                      "email",
                      "firstName",
                      "lastName",
                      "status",
                      "acceptedTermsAt",
                      "firstLoginTime",
                      "lastLoginTime",
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
                        }
                      },
                      "userId": {
                        "type": "string",
                        "maxLength": 200,
                        "description": "User's identifier (username or external ID)",
                        "x-oapi-codegen-extra-tags": {
                          "db": "user_id",
                          "json": "userId"
                        },
                        "x-id-format": "external"
                      },
                      "provider": {
                        "type": "string",
                        "maxLength": 100,
                        "description": "User's authentication provider (e.g., Layer5, Twitter, Facebook, GitHub)",
                        "example": "Layer5",
                        "x-oapi-codegen-extra-tags": {
                          "db": "provider",
                          "json": "provider"
                        }
                      },
                      "email": {
                        "type": "string",
                        "format": "email",
                        "maxLength": 300,
                        "description": "User's email address",
                        "x-oapi-codegen-extra-tags": {
                          "db": "email",
                          "json": "email"
                        }
                      },
                      "firstName": {
                        "type": "string",
                        "maxLength": 200,
                        "description": "User's first name",
                        "x-oapi-codegen-extra-tags": {
                          "db": "first_name",
                          "json": "firstName"
                        }
                      },
                      "lastName": {
                        "type": "string",
                        "maxLength": 300,
                        "description": "User's last name",
                        "x-oapi-codegen-extra-tags": {
                          "db": "last_name",
                          "json": "lastName"
                        }
                      },
                      "avatarUrl": {
                        "type": "string",
                        "format": "uri",
                        "maxLength": 500,
                        "description": "URL to the user's avatar image",
                        "x-oapi-codegen-extra-tags": {
                          "db": "avatar_url",
                          "json": "avatarUrl"
                        }
                      },
                      "status": {
                        "type": "string",
                        "maxLength": 100,
                        "enum": [
                          "active",
                          "inactive",
                          "pending",
                          "anonymous"
                        ],
                        "description": "User's account status",
                        "x-oapi-codegen-extra-tags": {
                          "db": "status",
                          "json": "status"
                        }
                      },
                      "bio": {
                        "type": "string",
                        "maxLength": 1000,
                        "default": "",
                        "description": "User's biography or description",
                        "x-oapi-codegen-extra-tags": {
                          "db": "bio",
                          "json": "bio"
                        }
                      },
                      "country": {
                        "type": "object",
                        "description": "User's country information stored as JSONB",
                        "additionalProperties": true,
                        "x-go-type": "core.Map",
                        "x-go-type-import": {
                          "path": "github.com/meshery/schemas/models/core",
                          "name": "core"
                        },
                        "x-go-type-skip-optional-pointer": true,
                        "x-oapi-codegen-extra-tags": {
                          "db": "country",
                          "json": "country"
                        }
                      },
                      "region": {
                        "type": "object",
                        "description": "User's region information stored as JSONB",
                        "additionalProperties": true,
                        "x-go-type": "core.Map",
                        "x-go-type-import": {
                          "path": "github.com/meshery/schemas/models/core",
                          "name": "core"
                        },
                        "x-go-type-skip-optional-pointer": true,
                        "x-oapi-codegen-extra-tags": {
                          "db": "region",
                          "json": "region"
                        }
                      },
                      "preferences": {
                        "x-go-type": "Preference",
                        "description": "User's preferences stored as JSONB",
                        "x-oapi-codegen-extra-tags": {
                          "db": "preferences",
                          "json": "preferences"
                        },
                        "x-generate-db-helpers": true,
                        "type": "object",
                        "required": [
                          "anonymousUsageStats",
                          "anonymousPerfResults",
                          "updatedAt",
                          "dashboardPreferences",
                          "selectedOrganizationId",
                          "selectedWorkspaceForOrganizations",
                          "usersExtensionPreferences",
                          "remoteProviderPreferences"
                        ],
                        "properties": {
                          "meshAdapters": {
                            "type": "array",
                            "items": {
                              "x-go-type": "Adapter",
                              "type": "object",
                              "additionalProperties": false,
                              "description": "Meshery adapter configuration stored in user preferences.",
                              "required": [
                                "adapterLocation",
                                "name",
                                "version",
                                "gitCommitSha",
                                "ops"
                              ],
                              "properties": {
                                "adapterLocation": {
                                  "type": "string",
                                  "description": "Network location used to reach the adapter.",
                                  "minLength": 1,
                                  "maxLength": 500
                                },
                                "name": {
                                  "type": "string",
                                  "description": "Adapter name.",
                                  "minLength": 1,
                                  "maxLength": 255
                                },
                                "version": {
                                  "type": "string",
                                  "description": "Adapter version.",
                                  "maxLength": 100
                                },
                                "gitCommitSha": {
                                  "type": "string",
                                  "description": "Git commit SHA for the adapter build.",
                                  "maxLength": 64
                                },
                                "ops": {
                                  "type": "array",
                                  "description": "Operations supported by the adapter.",
                                  "items": {
                                    "type": "object",
                                    "additionalProperties": false,
                                    "description": "Operation supported by a Meshery adapter.",
                                    "required": [
                                      "key",
                                      "value",
                                      "category"
                                    ],
                                    "properties": {
                                      "key": {
                                        "type": "string",
                                        "description": "Stable operation key.",
                                        "minLength": 1,
                                        "maxLength": 255
                                      },
                                      "value": {
                                        "type": "string",
                                        "description": "Human-readable operation value.",
                                        "minLength": 1,
                                        "maxLength": 255
                                      },
                                      "category": {
                                        "type": "integer",
                                        "description": "Protobuf OpCategory wire value. Integer values intentionally mirror meshops.proto instead of using lowercase string enum literals.",
                                        "minimum": 0,
                                        "maximum": 4,
                                        "enum": [
                                          0,
                                          1,
                                          2,
                                          3,
                                          4
                                        ]
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            "description": "The mesh adapters of the preference."
                          },
                          "grafana": {
                            "x-go-type": "Grafana",
                            "type": "object",
                            "properties": {
                              "grafanaUrl": {
                                "type": "string",
                                "description": "Grafana URL for the user configuration.",
                                "maxLength": 500
                              },
                              "grafanaApiKey": {
                                "type": "string",
                                "description": "Grafana API key for the user configuration.",
                                "maxLength": 500
                              },
                              "selectedBoardsConfigs": {
                                "type": "array",
                                "items": {
                                  "type": "object",
                                  "properties": {
                                    "board": {
                                      "type": "object",
                                      "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
                                    },
                                    "panels": {
                                      "type": "array",
                                      "items": {
                                        "type": "object",
                                        "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
                                      },
                                      "description": "Panels selected for the Grafana board configuration."
                                    },
                                    "templateVars": {
                                      "type": "array",
                                      "items": {
                                        "type": "string"
                                      },
                                      "description": "Template variables applied to the selected Grafana board configuration."
                                    }
                                  }
                                },
                                "description": "Selected Grafana board configurations for the user."
                              }
                            }
                          },
                          "prometheus": {
                            "x-go-type": "Prometheus",
                            "type": "object",
                            "properties": {
                              "prometheusUrl": {
                                "type": "string",
                                "description": "The prometheus URL of the prometheus.",
                                "maxLength": 500
                              },
                              "selectedPrometheusBoardsConfigs": {
                                "type": "array",
                                "items": {
                                  "type": "object",
                                  "properties": {
                                    "board": {
                                      "type": "object",
                                      "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
                                    },
                                    "panels": {
                                      "type": "array",
                                      "items": {
                                        "type": "object",
                                        "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
                                      },
                                      "description": "Panels selected for the Grafana board configuration."
                                    },
                                    "templateVars": {
                                      "type": "array",
                                      "items": {
                                        "type": "string"
                                      },
                                      "description": "Template variables applied to the selected Grafana board configuration."
                                    }
                                  }
                                },
                                "description": "The selected prometheus boards configs of the prometheus."
                              }
                            }
                          },
                          "loadTestPrefs": {
                            "x-go-type": "LoadTestPreferences",
                            "type": "object",
                            "properties": {
                              "c": {
                                "type": "integer",
                                "description": "Concurrent requests",
                                "minimum": 0
                              },
                              "qps": {
                                "type": "integer",
                                "description": "Queries per second",
                                "minimum": 0
                              },
                              "t": {
                                "type": "string",
                                "description": "Duration",
                                "maxLength": 500
                              },
                              "gen": {
                                "type": "string",
                                "description": "Load generator",
                                "maxLength": 500
                              }
                            }
                          },
                          "anonymousUsageStats": {
                            "type": "boolean",
                            "description": "The anonymous usage stats of the preference."
                          },
                          "anonymousPerfResults": {
                            "type": "boolean",
                            "description": "The anonymous perf results of the preference."
                          },
                          "updatedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp of when the resource was last updated."
                          },
                          "dashboardPreferences": {
                            "type": "object",
                            "additionalProperties": true,
                            "description": "The dashboard preferences of the preference."
                          },
                          "selectedOrganizationId": {
                            "type": "string",
                            "description": "ID of the associated selectedOrganization.",
                            "maxLength": 500,
                            "format": "uuid",
                            "x-go-type": "core.Uuid",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            }
                          },
                          "selectedWorkspaceForOrganizations": {
                            "type": "object",
                            "additionalProperties": {
                              "type": "string"
                            },
                            "description": "The selected workspace for organizations of the preference."
                          },
                          "usersExtensionPreferences": {
                            "type": "object",
                            "additionalProperties": true,
                            "description": "The users extension preferences of the preference."
                          },
                          "remoteProviderPreferences": {
                            "type": "object",
                            "additionalProperties": true,
                            "description": "The remote provider preferences of the preference."
                          }
                        }
                      },
                      "acceptedTermsAt": {
                        "description": "Timestamp when the user accepted terms and conditions",
                        "x-oapi-codegen-extra-tags": {
                          "db": "accepted_terms_at",
                          "json": "acceptedTermsAt"
                        },
                        "type": "string",
                        "format": "date-time",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "firstLoginTime": {
                        "description": "Timestamp of the user's first login",
                        "x-oapi-codegen-extra-tags": {
                          "db": "first_login_time",
                          "json": "firstLoginTime"
                        },
                        "type": "string",
                        "format": "date-time",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "lastLoginTime": {
                        "description": "Timestamp of the user's most recent login",
                        "x-oapi-codegen-extra-tags": {
                          "db": "last_login_time",
                          "json": "lastLoginTime"
                        },
                        "type": "string",
                        "format": "date-time",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "createdAt": {
                        "description": "Timestamp when the user record was created",
                        "x-oapi-codegen-extra-tags": {
                          "db": "created_at",
                          "json": "createdAt"
                        },
                        "type": "string",
                        "format": "date-time",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "updatedAt": {
                        "description": "Timestamp when the user record was last updated",
                        "x-oapi-codegen-extra-tags": {
                          "db": "updated_at",
                          "json": "updatedAt"
                        },
                        "type": "string",
                        "format": "date-time",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "socials": {
                        "type": "array",
                        "description": "Various online profiles associated with the user's account",
                        "x-go-type": "UserSocials",
                        "items": {
                          "x-go-type": "Social",
                          "description": "Various online profiles associated with the user account, like GitHub, LinkedIn, X, and so on.",
                          "type": "object",
                          "properties": {
                            "site": {
                              "type": "string",
                              "maxLength": 50,
                              "description": "The site of the social."
                            },
                            "link": {
                              "type": "string",
                              "format": "uri",
                              "description": "The link of the social."
                            }
                          },
                          "required": [
                            "site",
                            "link"
                          ]
                        },
                        "x-oapi-codegen-extra-tags": {
                          "db": "socials",
                          "json": "socials"
                        }
                      },
                      "deletedAt": {
                        "type": "string",
                        "format": "date-time",
                        "nullable": true,
                        "description": "Timestamp when the user record was soft-deleted (null if not deleted)",
                        "x-go-type": "core.NullTime",
                        "x-go-type-import": {
                          "path": "github.com/meshery/schemas/models/core",
                          "name": "core"
                        },
                        "x-oapi-codegen-extra-tags": {
                          "db": "deleted_at",
                          "json": "deletedAt"
                        }
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
    },
    "/api/identity/users/profile/{id}": {
      "get": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "users"
        ],
        "operationId": "getUserProfileById",
        "summary": "Get user profile by ID",
        "description": "Returns the public user profile for the requested ID.",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "description": "User ID",
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
            "description": "User profile for the requested ID",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": false,
                  "description": "Public user profile fields safe to return without authentication.",
                  "required": [
                    "id",
                    "userId",
                    "firstName",
                    "lastName",
                    "status"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "userId": {
                      "type": "string",
                      "maxLength": 200,
                      "description": "User's public identifier.",
                      "x-id-format": "external"
                    },
                    "firstName": {
                      "type": "string",
                      "maxLength": 200,
                      "description": "User's first name."
                    },
                    "lastName": {
                      "type": "string",
                      "maxLength": 300,
                      "description": "User's last name."
                    },
                    "avatarUrl": {
                      "type": "string",
                      "format": "uri",
                      "maxLength": 500,
                      "description": "URL to the user's avatar image."
                    },
                    "bio": {
                      "type": "string",
                      "maxLength": 1000,
                      "description": "User's biography or description."
                    },
                    "status": {
                      "type": "string",
                      "maxLength": 100,
                      "enum": [
                        "active",
                        "inactive",
                        "pending",
                        "anonymous"
                      ],
                      "description": "User's account status."
                    },
                    "socials": {
                      "type": "array",
                      "description": "Public online profiles associated with the user's account.",
                      "items": {
                        "description": "Various online profiles associated with the user account, like GitHub, LinkedIn, X, and so on.",
                        "type": "object",
                        "properties": {
                          "site": {
                            "type": "string",
                            "maxLength": 50,
                            "description": "The site of the social."
                          },
                          "link": {
                            "type": "string",
                            "format": "uri",
                            "description": "The link of the social."
                          }
                        },
                        "required": [
                          "site",
                          "link"
                        ]
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
      }
    },
    "/api/identity/users/profile": {
      "get": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "users"
        ],
        "operationId": "getUser",
        "summary": "Get current user profile",
        "description": "Returns the authenticated user profile.",
        "responses": {
          "200": {
            "description": "Current user profile and role context",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": false,
                  "description": "Authenticated user profile with role, team, organization, and linked account context.",
                  "required": [
                    "roleNames",
                    "linkedAccounts"
                  ],
                  "properties": {
                    "user": {
                      "$id": "https://schemas.meshery.io/user.yaml",
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "type": "object",
                      "description": "Represents a user in Layer5 Cloud (Meshery)",
                      "additionalProperties": false,
                      "required": [
                        "id",
                        "userId",
                        "provider",
                        "email",
                        "firstName",
                        "lastName",
                        "status",
                        "acceptedTermsAt",
                        "firstLoginTime",
                        "lastLoginTime",
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
                          }
                        },
                        "userId": {
                          "type": "string",
                          "maxLength": 200,
                          "description": "User's identifier (username or external ID)",
                          "x-oapi-codegen-extra-tags": {
                            "db": "user_id",
                            "json": "userId"
                          },
                          "x-id-format": "external"
                        },
                        "provider": {
                          "type": "string",
                          "maxLength": 100,
                          "description": "User's authentication provider (e.g., Layer5, Twitter, Facebook, GitHub)",
                          "example": "Layer5",
                          "x-oapi-codegen-extra-tags": {
                            "db": "provider",
                            "json": "provider"
                          }
                        },
                        "email": {
                          "type": "string",
                          "format": "email",
                          "maxLength": 300,
                          "description": "User's email address",
                          "x-oapi-codegen-extra-tags": {
                            "db": "email",
                            "json": "email"
                          }
                        },
                        "firstName": {
                          "type": "string",
                          "maxLength": 200,
                          "description": "User's first name",
                          "x-oapi-codegen-extra-tags": {
                            "db": "first_name",
                            "json": "firstName"
                          }
                        },
                        "lastName": {
                          "type": "string",
                          "maxLength": 300,
                          "description": "User's last name",
                          "x-oapi-codegen-extra-tags": {
                            "db": "last_name",
                            "json": "lastName"
                          }
                        },
                        "avatarUrl": {
                          "type": "string",
                          "format": "uri",
                          "maxLength": 500,
                          "description": "URL to the user's avatar image",
                          "x-oapi-codegen-extra-tags": {
                            "db": "avatar_url",
                            "json": "avatarUrl"
                          }
                        },
                        "status": {
                          "type": "string",
                          "maxLength": 100,
                          "enum": [
                            "active",
                            "inactive",
                            "pending",
                            "anonymous"
                          ],
                          "description": "User's account status",
                          "x-oapi-codegen-extra-tags": {
                            "db": "status",
                            "json": "status"
                          }
                        },
                        "bio": {
                          "type": "string",
                          "maxLength": 1000,
                          "default": "",
                          "description": "User's biography or description",
                          "x-oapi-codegen-extra-tags": {
                            "db": "bio",
                            "json": "bio"
                          }
                        },
                        "country": {
                          "type": "object",
                          "description": "User's country information stored as JSONB",
                          "additionalProperties": true,
                          "x-go-type": "core.Map",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-go-type-skip-optional-pointer": true,
                          "x-oapi-codegen-extra-tags": {
                            "db": "country",
                            "json": "country"
                          }
                        },
                        "region": {
                          "type": "object",
                          "description": "User's region information stored as JSONB",
                          "additionalProperties": true,
                          "x-go-type": "core.Map",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-go-type-skip-optional-pointer": true,
                          "x-oapi-codegen-extra-tags": {
                            "db": "region",
                            "json": "region"
                          }
                        },
                        "preferences": {
                          "x-go-type": "Preference",
                          "description": "User's preferences stored as JSONB",
                          "x-oapi-codegen-extra-tags": {
                            "db": "preferences",
                            "json": "preferences"
                          },
                          "x-generate-db-helpers": true,
                          "type": "object",
                          "required": [
                            "anonymousUsageStats",
                            "anonymousPerfResults",
                            "updatedAt",
                            "dashboardPreferences",
                            "selectedOrganizationId",
                            "selectedWorkspaceForOrganizations",
                            "usersExtensionPreferences",
                            "remoteProviderPreferences"
                          ],
                          "properties": {
                            "meshAdapters": {
                              "type": "array",
                              "items": {
                                "x-go-type": "Adapter",
                                "type": "object",
                                "additionalProperties": false,
                                "description": "Meshery adapter configuration stored in user preferences.",
                                "required": [
                                  "adapterLocation",
                                  "name",
                                  "version",
                                  "gitCommitSha",
                                  "ops"
                                ],
                                "properties": {
                                  "adapterLocation": {
                                    "type": "string",
                                    "description": "Network location used to reach the adapter.",
                                    "minLength": 1,
                                    "maxLength": 500
                                  },
                                  "name": {
                                    "type": "string",
                                    "description": "Adapter name.",
                                    "minLength": 1,
                                    "maxLength": 255
                                  },
                                  "version": {
                                    "type": "string",
                                    "description": "Adapter version.",
                                    "maxLength": 100
                                  },
                                  "gitCommitSha": {
                                    "type": "string",
                                    "description": "Git commit SHA for the adapter build.",
                                    "maxLength": 64
                                  },
                                  "ops": {
                                    "type": "array",
                                    "description": "Operations supported by the adapter.",
                                    "items": {
                                      "type": "object",
                                      "additionalProperties": false,
                                      "description": "Operation supported by a Meshery adapter.",
                                      "required": [
                                        "key",
                                        "value",
                                        "category"
                                      ],
                                      "properties": {
                                        "key": {
                                          "type": "string",
                                          "description": "Stable operation key.",
                                          "minLength": 1,
                                          "maxLength": 255
                                        },
                                        "value": {
                                          "type": "string",
                                          "description": "Human-readable operation value.",
                                          "minLength": 1,
                                          "maxLength": 255
                                        },
                                        "category": {
                                          "type": "integer",
                                          "description": "Protobuf OpCategory wire value. Integer values intentionally mirror meshops.proto instead of using lowercase string enum literals.",
                                          "minimum": 0,
                                          "maximum": 4,
                                          "enum": [
                                            0,
                                            1,
                                            2,
                                            3,
                                            4
                                          ]
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "description": "The mesh adapters of the preference."
                            },
                            "grafana": {
                              "x-go-type": "Grafana",
                              "type": "object",
                              "properties": {
                                "grafanaUrl": {
                                  "type": "string",
                                  "description": "Grafana URL for the user configuration.",
                                  "maxLength": 500
                                },
                                "grafanaApiKey": {
                                  "type": "string",
                                  "description": "Grafana API key for the user configuration.",
                                  "maxLength": 500
                                },
                                "selectedBoardsConfigs": {
                                  "type": "array",
                                  "items": {
                                    "type": "object",
                                    "properties": {
                                      "board": {
                                        "type": "object",
                                        "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
                                      },
                                      "panels": {
                                        "type": "array",
                                        "items": {
                                          "type": "object",
                                          "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
                                        },
                                        "description": "Panels selected for the Grafana board configuration."
                                      },
                                      "templateVars": {
                                        "type": "array",
                                        "items": {
                                          "type": "string"
                                        },
                                        "description": "Template variables applied to the selected Grafana board configuration."
                                      }
                                    }
                                  },
                                  "description": "Selected Grafana board configurations for the user."
                                }
                              }
                            },
                            "prometheus": {
                              "x-go-type": "Prometheus",
                              "type": "object",
                              "properties": {
                                "prometheusUrl": {
                                  "type": "string",
                                  "description": "The prometheus URL of the prometheus.",
                                  "maxLength": 500
                                },
                                "selectedPrometheusBoardsConfigs": {
                                  "type": "array",
                                  "items": {
                                    "type": "object",
                                    "properties": {
                                      "board": {
                                        "type": "object",
                                        "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
                                      },
                                      "panels": {
                                        "type": "array",
                                        "items": {
                                          "type": "object",
                                          "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
                                        },
                                        "description": "Panels selected for the Grafana board configuration."
                                      },
                                      "templateVars": {
                                        "type": "array",
                                        "items": {
                                          "type": "string"
                                        },
                                        "description": "Template variables applied to the selected Grafana board configuration."
                                      }
                                    }
                                  },
                                  "description": "The selected prometheus boards configs of the prometheus."
                                }
                              }
                            },
                            "loadTestPrefs": {
                              "x-go-type": "LoadTestPreferences",
                              "type": "object",
                              "properties": {
                                "c": {
                                  "type": "integer",
                                  "description": "Concurrent requests",
                                  "minimum": 0
                                },
                                "qps": {
                                  "type": "integer",
                                  "description": "Queries per second",
                                  "minimum": 0
                                },
                                "t": {
                                  "type": "string",
                                  "description": "Duration",
                                  "maxLength": 500
                                },
                                "gen": {
                                  "type": "string",
                                  "description": "Load generator",
                                  "maxLength": 500
                                }
                              }
                            },
                            "anonymousUsageStats": {
                              "type": "boolean",
                              "description": "The anonymous usage stats of the preference."
                            },
                            "anonymousPerfResults": {
                              "type": "boolean",
                              "description": "The anonymous perf results of the preference."
                            },
                            "updatedAt": {
                              "type": "string",
                              "format": "date-time",
                              "description": "Timestamp of when the resource was last updated."
                            },
                            "dashboardPreferences": {
                              "type": "object",
                              "additionalProperties": true,
                              "description": "The dashboard preferences of the preference."
                            },
                            "selectedOrganizationId": {
                              "type": "string",
                              "description": "ID of the associated selectedOrganization.",
                              "maxLength": 500,
                              "format": "uuid",
                              "x-go-type": "core.Uuid",
                              "x-go-type-import": {
                                "path": "github.com/meshery/schemas/models/core",
                                "name": "core"
                              }
                            },
                            "selectedWorkspaceForOrganizations": {
                              "type": "object",
                              "additionalProperties": {
                                "type": "string"
                              },
                              "description": "The selected workspace for organizations of the preference."
                            },
                            "usersExtensionPreferences": {
                              "type": "object",
                              "additionalProperties": true,
                              "description": "The users extension preferences of the preference."
                            },
                            "remoteProviderPreferences": {
                              "type": "object",
                              "additionalProperties": true,
                              "description": "The remote provider preferences of the preference."
                            }
                          }
                        },
                        "acceptedTermsAt": {
                          "description": "Timestamp when the user accepted terms and conditions",
                          "x-oapi-codegen-extra-tags": {
                            "db": "accepted_terms_at",
                            "json": "acceptedTermsAt"
                          },
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "firstLoginTime": {
                          "description": "Timestamp of the user's first login",
                          "x-oapi-codegen-extra-tags": {
                            "db": "first_login_time",
                            "json": "firstLoginTime"
                          },
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "lastLoginTime": {
                          "description": "Timestamp of the user's most recent login",
                          "x-oapi-codegen-extra-tags": {
                            "db": "last_login_time",
                            "json": "lastLoginTime"
                          },
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "createdAt": {
                          "description": "Timestamp when the user record was created",
                          "x-oapi-codegen-extra-tags": {
                            "db": "created_at",
                            "json": "createdAt"
                          },
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "updatedAt": {
                          "description": "Timestamp when the user record was last updated",
                          "x-oapi-codegen-extra-tags": {
                            "db": "updated_at",
                            "json": "updatedAt"
                          },
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "socials": {
                          "type": "array",
                          "description": "Various online profiles associated with the user's account",
                          "x-go-type": "UserSocials",
                          "items": {
                            "x-go-type": "Social",
                            "description": "Various online profiles associated with the user account, like GitHub, LinkedIn, X, and so on.",
                            "type": "object",
                            "properties": {
                              "site": {
                                "type": "string",
                                "maxLength": 50,
                                "description": "The site of the social."
                              },
                              "link": {
                                "type": "string",
                                "format": "uri",
                                "description": "The link of the social."
                              }
                            },
                            "required": [
                              "site",
                              "link"
                            ]
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "socials",
                            "json": "socials"
                          }
                        },
                        "deletedAt": {
                          "type": "string",
                          "format": "date-time",
                          "nullable": true,
                          "description": "Timestamp when the user record was soft-deleted (null if not deleted)",
                          "x-go-type": "core.NullTime",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "deleted_at",
                            "json": "deletedAt"
                          }
                        }
                      }
                    },
                    "roleNames": {
                      "type": "array",
                      "description": "Names of roles assigned to the user.",
                      "items": {
                        "type": "string",
                        "maxLength": 100
                      }
                    },
                    "teams": {
                      "description": "Teams the user belongs to with their assigned role information.",
                      "type": "object",
                      "additionalProperties": false,
                      "required": [
                        "teamsWithRoles",
                        "totalCount"
                      ],
                      "properties": {
                        "teamsWithRoles": {
                          "type": "array",
                          "description": "Team memberships with the user's assigned roles.",
                          "items": {
                            "type": "object",
                            "description": "Team membership record with role information.",
                            "additionalProperties": false,
                            "required": [
                              "id",
                              "name",
                              "description",
                              "owner",
                              "metadata",
                              "createdAt",
                              "updatedAt",
                              "deletedAt",
                              "roleNames"
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
                                }
                              },
                              "name": {
                                "type": "string",
                                "description": "Team name.",
                                "maxLength": 255,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "name"
                                }
                              },
                              "description": {
                                "type": "string",
                                "description": "Team description.",
                                "maxLength": 1024,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "description"
                                }
                              },
                              "owner": {
                                "type": "string",
                                "format": "uuid",
                                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                },
                                "x-oapi-codegen-extra-tags": {
                                  "db": "owner"
                                }
                              },
                              "metadata": {
                                "type": "object",
                                "description": "Team metadata stored with the membership row.",
                                "additionalProperties": true,
                                "x-go-type": "core.Map",
                                "x-go-type-import": {
                                  "path": "github.com/meshery/schemas/models/core",
                                  "name": "core"
                                },
                                "x-go-type-skip-optional-pointer": true,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "metadata"
                                }
                              },
                              "createdAt": {
                                "description": "Timestamp when the team was created.",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "created_at",
                                  "json": "createdAt"
                                },
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "updatedAt": {
                                "description": "Timestamp when the team was last updated.",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "updated_at",
                                  "json": "updatedAt"
                                },
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "deletedAt": {
                                "description": "Timestamp when the team was soft-deleted, if applicable.",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "deleted_at",
                                  "json": "deletedAt"
                                },
                                "x-go-type": "meshcore.NullTime",
                                "x-go-type-import": {
                                  "name": "meshcore",
                                  "path": "github.com/meshery/schemas/models/core"
                                },
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "roleNames": {
                                "type": "array",
                                "description": "Names of roles assigned to the user in this team.",
                                "items": {
                                  "type": "string",
                                  "maxLength": 100
                                },
                                "x-go-type": "pq.StringArray",
                                "x-go-type-import": {
                                  "path": "github.com/lib/pq",
                                  "name": "pq"
                                },
                                "x-oapi-codegen-extra-tags": {
                                  "db": "role_names"
                                }
                              }
                            }
                          }
                        },
                        "totalCount": {
                          "type": "integer",
                          "description": "Total number of team memberships returned for the user.",
                          "minimum": 0
                        }
                      }
                    },
                    "organizations": {
                      "description": "Organizations the user belongs to with their assigned role information.",
                      "type": "object",
                      "additionalProperties": false,
                      "required": [
                        "organizationsWithRoles",
                        "totalCount"
                      ],
                      "properties": {
                        "organizationsWithRoles": {
                          "type": "array",
                          "description": "Organization memberships with the user's assigned roles.",
                          "items": {
                            "type": "object",
                            "description": "Organization membership record with role information.",
                            "additionalProperties": false,
                            "required": [
                              "id",
                              "name",
                              "description",
                              "country",
                              "region",
                              "owner",
                              "metadata",
                              "createdAt",
                              "updatedAt",
                              "deletedAt",
                              "roleNames"
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
                                }
                              },
                              "name": {
                                "type": "string",
                                "description": "Organization name.",
                                "maxLength": 255,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "name"
                                }
                              },
                              "description": {
                                "type": "string",
                                "description": "Organization description.",
                                "maxLength": 1024,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "description"
                                }
                              },
                              "country": {
                                "type": "string",
                                "description": "Organization country.",
                                "maxLength": 200,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "country"
                                }
                              },
                              "region": {
                                "type": "string",
                                "description": "Organization region.",
                                "maxLength": 200,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "region"
                                }
                              },
                              "owner": {
                                "type": "string",
                                "format": "uuid",
                                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                },
                                "x-oapi-codegen-extra-tags": {
                                  "db": "owner"
                                }
                              },
                              "metadata": {
                                "type": "object",
                                "description": "Organization metadata stored with the membership row.",
                                "additionalProperties": true,
                                "x-go-type": "core.Map",
                                "x-go-type-import": {
                                  "path": "github.com/meshery/schemas/models/core",
                                  "name": "core"
                                },
                                "x-go-type-skip-optional-pointer": true,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "metadata"
                                }
                              },
                              "createdAt": {
                                "description": "Timestamp when the organization was created.",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "created_at",
                                  "json": "createdAt"
                                },
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "updatedAt": {
                                "description": "Timestamp when the organization was last updated.",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "updated_at",
                                  "json": "updatedAt"
                                },
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "deletedAt": {
                                "description": "Timestamp when the organization was soft-deleted, if applicable.",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "deleted_at",
                                  "json": "deletedAt"
                                },
                                "x-go-type": "meshcore.NullTime",
                                "x-go-type-import": {
                                  "name": "meshcore",
                                  "path": "github.com/meshery/schemas/models/core"
                                },
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "roleNames": {
                                "type": "array",
                                "description": "Names of roles assigned to the user in this organization.",
                                "items": {
                                  "type": "string",
                                  "maxLength": 100
                                },
                                "x-go-type": "pq.StringArray",
                                "x-go-type-import": {
                                  "path": "github.com/lib/pq",
                                  "name": "pq"
                                },
                                "x-oapi-codegen-extra-tags": {
                                  "db": "role_names"
                                }
                              }
                            }
                          }
                        },
                        "totalCount": {
                          "type": "integer",
                          "description": "Total number of organization memberships returned for the user.",
                          "minimum": 0
                        }
                      }
                    },
                    "linkedAccounts": {
                      "type": "array",
                      "description": "Linked social account providers for the current user.",
                      "items": {
                        "type": "string",
                        "maxLength": 100
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
      "put": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "users"
        ],
        "operationId": "updateProfile",
        "summary": "Update current user profile",
        "description": "Updates a user profile.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for creating or updating a user profile.",
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    },
                    "x-oapi-codegen-extra-tags": {
                      "json": "id,omitempty"
                    }
                  },
                  "email": {
                    "type": "string",
                    "format": "email",
                    "maxLength": 300,
                    "description": "User's email address."
                  },
                  "firstName": {
                    "type": "string",
                    "maxLength": 200,
                    "description": "User's first name."
                  },
                  "lastName": {
                    "type": "string",
                    "maxLength": 300,
                    "description": "User's last name."
                  },
                  "avatarUrl": {
                    "type": "string",
                    "format": "uri",
                    "maxLength": 500,
                    "description": "URL to the user's avatar image."
                  },
                  "bio": {
                    "type": "string",
                    "maxLength": 1000,
                    "description": "User's biography or description."
                  },
                  "country": {
                    "type": "object",
                    "additionalProperties": true,
                    "description": "User's country information."
                  },
                  "region": {
                    "type": "object",
                    "additionalProperties": true,
                    "description": "User's region information."
                  },
                  "socials": {
                    "type": "array",
                    "description": "Online profiles associated with the user's account.",
                    "items": {
                      "description": "Various online profiles associated with the user account, like GitHub, LinkedIn, X, and so on.",
                      "type": "object",
                      "properties": {
                        "site": {
                          "type": "string",
                          "maxLength": 50,
                          "description": "The site of the social."
                        },
                        "link": {
                          "type": "string",
                          "format": "uri",
                          "description": "The link of the social."
                        }
                      },
                      "required": [
                        "site",
                        "link"
                      ]
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "User profile updated",
            "content": {
              "application/json": {
                "schema": {
                  "$id": "https://schemas.meshery.io/user.yaml",
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "type": "object",
                  "description": "Represents a user in Layer5 Cloud (Meshery)",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "userId",
                    "provider",
                    "email",
                    "firstName",
                    "lastName",
                    "status",
                    "acceptedTermsAt",
                    "firstLoginTime",
                    "lastLoginTime",
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
                      }
                    },
                    "userId": {
                      "type": "string",
                      "maxLength": 200,
                      "description": "User's identifier (username or external ID)",
                      "x-oapi-codegen-extra-tags": {
                        "db": "user_id",
                        "json": "userId"
                      },
                      "x-id-format": "external"
                    },
                    "provider": {
                      "type": "string",
                      "maxLength": 100,
                      "description": "User's authentication provider (e.g., Layer5, Twitter, Facebook, GitHub)",
                      "example": "Layer5",
                      "x-oapi-codegen-extra-tags": {
                        "db": "provider",
                        "json": "provider"
                      }
                    },
                    "email": {
                      "type": "string",
                      "format": "email",
                      "maxLength": 300,
                      "description": "User's email address",
                      "x-oapi-codegen-extra-tags": {
                        "db": "email",
                        "json": "email"
                      }
                    },
                    "firstName": {
                      "type": "string",
                      "maxLength": 200,
                      "description": "User's first name",
                      "x-oapi-codegen-extra-tags": {
                        "db": "first_name",
                        "json": "firstName"
                      }
                    },
                    "lastName": {
                      "type": "string",
                      "maxLength": 300,
                      "description": "User's last name",
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_name",
                        "json": "lastName"
                      }
                    },
                    "avatarUrl": {
                      "type": "string",
                      "format": "uri",
                      "maxLength": 500,
                      "description": "URL to the user's avatar image",
                      "x-oapi-codegen-extra-tags": {
                        "db": "avatar_url",
                        "json": "avatarUrl"
                      }
                    },
                    "status": {
                      "type": "string",
                      "maxLength": 100,
                      "enum": [
                        "active",
                        "inactive",
                        "pending",
                        "anonymous"
                      ],
                      "description": "User's account status",
                      "x-oapi-codegen-extra-tags": {
                        "db": "status",
                        "json": "status"
                      }
                    },
                    "bio": {
                      "type": "string",
                      "maxLength": 1000,
                      "default": "",
                      "description": "User's biography or description",
                      "x-oapi-codegen-extra-tags": {
                        "db": "bio",
                        "json": "bio"
                      }
                    },
                    "country": {
                      "type": "object",
                      "description": "User's country information stored as JSONB",
                      "additionalProperties": true,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "country",
                        "json": "country"
                      }
                    },
                    "region": {
                      "type": "object",
                      "description": "User's region information stored as JSONB",
                      "additionalProperties": true,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "region",
                        "json": "region"
                      }
                    },
                    "preferences": {
                      "x-go-type": "Preference",
                      "description": "User's preferences stored as JSONB",
                      "x-oapi-codegen-extra-tags": {
                        "db": "preferences",
                        "json": "preferences"
                      },
                      "x-generate-db-helpers": true,
                      "type": "object",
                      "required": [
                        "anonymousUsageStats",
                        "anonymousPerfResults",
                        "updatedAt",
                        "dashboardPreferences",
                        "selectedOrganizationId",
                        "selectedWorkspaceForOrganizations",
                        "usersExtensionPreferences",
                        "remoteProviderPreferences"
                      ],
                      "properties": {
                        "meshAdapters": {
                          "type": "array",
                          "items": {
                            "x-go-type": "Adapter",
                            "type": "object",
                            "additionalProperties": false,
                            "description": "Meshery adapter configuration stored in user preferences.",
                            "required": [
                              "adapterLocation",
                              "name",
                              "version",
                              "gitCommitSha",
                              "ops"
                            ],
                            "properties": {
                              "adapterLocation": {
                                "type": "string",
                                "description": "Network location used to reach the adapter.",
                                "minLength": 1,
                                "maxLength": 500
                              },
                              "name": {
                                "type": "string",
                                "description": "Adapter name.",
                                "minLength": 1,
                                "maxLength": 255
                              },
                              "version": {
                                "type": "string",
                                "description": "Adapter version.",
                                "maxLength": 100
                              },
                              "gitCommitSha": {
                                "type": "string",
                                "description": "Git commit SHA for the adapter build.",
                                "maxLength": 64
                              },
                              "ops": {
                                "type": "array",
                                "description": "Operations supported by the adapter.",
                                "items": {
                                  "type": "object",
                                  "additionalProperties": false,
                                  "description": "Operation supported by a Meshery adapter.",
                                  "required": [
                                    "key",
                                    "value",
                                    "category"
                                  ],
                                  "properties": {
                                    "key": {
                                      "type": "string",
                                      "description": "Stable operation key.",
                                      "minLength": 1,
                                      "maxLength": 255
                                    },
                                    "value": {
                                      "type": "string",
                                      "description": "Human-readable operation value.",
                                      "minLength": 1,
                                      "maxLength": 255
                                    },
                                    "category": {
                                      "type": "integer",
                                      "description": "Protobuf OpCategory wire value. Integer values intentionally mirror meshops.proto instead of using lowercase string enum literals.",
                                      "minimum": 0,
                                      "maximum": 4,
                                      "enum": [
                                        0,
                                        1,
                                        2,
                                        3,
                                        4
                                      ]
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "description": "The mesh adapters of the preference."
                        },
                        "grafana": {
                          "x-go-type": "Grafana",
                          "type": "object",
                          "properties": {
                            "grafanaUrl": {
                              "type": "string",
                              "description": "Grafana URL for the user configuration.",
                              "maxLength": 500
                            },
                            "grafanaApiKey": {
                              "type": "string",
                              "description": "Grafana API key for the user configuration.",
                              "maxLength": 500
                            },
                            "selectedBoardsConfigs": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "properties": {
                                  "board": {
                                    "type": "object",
                                    "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
                                  },
                                  "panels": {
                                    "type": "array",
                                    "items": {
                                      "type": "object",
                                      "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
                                    },
                                    "description": "Panels selected for the Grafana board configuration."
                                  },
                                  "templateVars": {
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    },
                                    "description": "Template variables applied to the selected Grafana board configuration."
                                  }
                                }
                              },
                              "description": "Selected Grafana board configurations for the user."
                            }
                          }
                        },
                        "prometheus": {
                          "x-go-type": "Prometheus",
                          "type": "object",
                          "properties": {
                            "prometheusUrl": {
                              "type": "string",
                              "description": "The prometheus URL of the prometheus.",
                              "maxLength": 500
                            },
                            "selectedPrometheusBoardsConfigs": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "properties": {
                                  "board": {
                                    "type": "object",
                                    "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
                                  },
                                  "panels": {
                                    "type": "array",
                                    "items": {
                                      "type": "object",
                                      "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
                                    },
                                    "description": "Panels selected for the Grafana board configuration."
                                  },
                                  "templateVars": {
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    },
                                    "description": "Template variables applied to the selected Grafana board configuration."
                                  }
                                }
                              },
                              "description": "The selected prometheus boards configs of the prometheus."
                            }
                          }
                        },
                        "loadTestPrefs": {
                          "x-go-type": "LoadTestPreferences",
                          "type": "object",
                          "properties": {
                            "c": {
                              "type": "integer",
                              "description": "Concurrent requests",
                              "minimum": 0
                            },
                            "qps": {
                              "type": "integer",
                              "description": "Queries per second",
                              "minimum": 0
                            },
                            "t": {
                              "type": "string",
                              "description": "Duration",
                              "maxLength": 500
                            },
                            "gen": {
                              "type": "string",
                              "description": "Load generator",
                              "maxLength": 500
                            }
                          }
                        },
                        "anonymousUsageStats": {
                          "type": "boolean",
                          "description": "The anonymous usage stats of the preference."
                        },
                        "anonymousPerfResults": {
                          "type": "boolean",
                          "description": "The anonymous perf results of the preference."
                        },
                        "updatedAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Timestamp of when the resource was last updated."
                        },
                        "dashboardPreferences": {
                          "type": "object",
                          "additionalProperties": true,
                          "description": "The dashboard preferences of the preference."
                        },
                        "selectedOrganizationId": {
                          "type": "string",
                          "description": "ID of the associated selectedOrganization.",
                          "maxLength": 500,
                          "format": "uuid",
                          "x-go-type": "core.Uuid",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          }
                        },
                        "selectedWorkspaceForOrganizations": {
                          "type": "object",
                          "additionalProperties": {
                            "type": "string"
                          },
                          "description": "The selected workspace for organizations of the preference."
                        },
                        "usersExtensionPreferences": {
                          "type": "object",
                          "additionalProperties": true,
                          "description": "The users extension preferences of the preference."
                        },
                        "remoteProviderPreferences": {
                          "type": "object",
                          "additionalProperties": true,
                          "description": "The remote provider preferences of the preference."
                        }
                      }
                    },
                    "acceptedTermsAt": {
                      "description": "Timestamp when the user accepted terms and conditions",
                      "x-oapi-codegen-extra-tags": {
                        "db": "accepted_terms_at",
                        "json": "acceptedTermsAt"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "firstLoginTime": {
                      "description": "Timestamp of the user's first login",
                      "x-oapi-codegen-extra-tags": {
                        "db": "first_login_time",
                        "json": "firstLoginTime"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "lastLoginTime": {
                      "description": "Timestamp of the user's most recent login",
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_login_time",
                        "json": "lastLoginTime"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "createdAt": {
                      "description": "Timestamp when the user record was created",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "createdAt"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp when the user record was last updated",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updatedAt"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "socials": {
                      "type": "array",
                      "description": "Various online profiles associated with the user's account",
                      "x-go-type": "UserSocials",
                      "items": {
                        "x-go-type": "Social",
                        "description": "Various online profiles associated with the user account, like GitHub, LinkedIn, X, and so on.",
                        "type": "object",
                        "properties": {
                          "site": {
                            "type": "string",
                            "maxLength": 50,
                            "description": "The site of the social."
                          },
                          "link": {
                            "type": "string",
                            "format": "uri",
                            "description": "The link of the social."
                          }
                        },
                        "required": [
                          "site",
                          "link"
                        ]
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "socials",
                        "json": "socials"
                      }
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "nullable": true,
                      "description": "Timestamp when the user record was soft-deleted (null if not deleted)",
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deletedAt"
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
      }
    },
    "/api/identity/users/profile/details": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "users"
        ],
        "operationId": "getProfileOverview",
        "summary": "Get profile details",
        "description": "Returns account profile details for the authenticated user.",
        "responses": {
          "200": {
            "description": "User profile details",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Profile details for the authenticated user, including counts of associated resources.",
                  "additionalProperties": false,
                  "required": [
                    "k8sCount",
                    "patternCount"
                  ],
                  "properties": {
                    "k8sCount": {
                      "type": "integer",
                      "description": "Number of Kubernetes contexts registered by the user.",
                      "minimum": 0
                    },
                    "patternCount": {
                      "type": "integer",
                      "description": "Number of designs owned by the user.",
                      "minimum": 0
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
    "/api/identity/users/profile/provider": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "users"
        ],
        "operationId": "getUserProvider",
        "summary": "Get user provider",
        "description": "Returns provider information for the authenticated user.",
        "responses": {
          "200": {
            "description": "User provider information",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "description": "List of external identity providers linked to the authenticated user's account.",
                  "items": {
                    "type": "string",
                    "description": "Provider name (e.g., GitHub, Google).",
                    "maxLength": 100
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
    "/api/identity/users/{userId}": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "users"
        ],
        "operationId": "getUserById",
        "summary": "Get user by ID",
        "description": "Returns a user profile by ID.",
        "parameters": [
          {
            "name": "userId",
            "in": "path",
            "required": true,
            "description": "User ID",
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
            "description": "User profile for the requested ID",
            "content": {
              "application/json": {
                "schema": {
                  "$id": "https://schemas.meshery.io/user.yaml",
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "type": "object",
                  "description": "Represents a user in Layer5 Cloud (Meshery)",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "userId",
                    "provider",
                    "email",
                    "firstName",
                    "lastName",
                    "status",
                    "acceptedTermsAt",
                    "firstLoginTime",
                    "lastLoginTime",
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
                      }
                    },
                    "userId": {
                      "type": "string",
                      "maxLength": 200,
                      "description": "User's identifier (username or external ID)",
                      "x-oapi-codegen-extra-tags": {
                        "db": "user_id",
                        "json": "userId"
                      },
                      "x-id-format": "external"
                    },
                    "provider": {
                      "type": "string",
                      "maxLength": 100,
                      "description": "User's authentication provider (e.g., Layer5, Twitter, Facebook, GitHub)",
                      "example": "Layer5",
                      "x-oapi-codegen-extra-tags": {
                        "db": "provider",
                        "json": "provider"
                      }
                    },
                    "email": {
                      "type": "string",
                      "format": "email",
                      "maxLength": 300,
                      "description": "User's email address",
                      "x-oapi-codegen-extra-tags": {
                        "db": "email",
                        "json": "email"
                      }
                    },
                    "firstName": {
                      "type": "string",
                      "maxLength": 200,
                      "description": "User's first name",
                      "x-oapi-codegen-extra-tags": {
                        "db": "first_name",
                        "json": "firstName"
                      }
                    },
                    "lastName": {
                      "type": "string",
                      "maxLength": 300,
                      "description": "User's last name",
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_name",
                        "json": "lastName"
                      }
                    },
                    "avatarUrl": {
                      "type": "string",
                      "format": "uri",
                      "maxLength": 500,
                      "description": "URL to the user's avatar image",
                      "x-oapi-codegen-extra-tags": {
                        "db": "avatar_url",
                        "json": "avatarUrl"
                      }
                    },
                    "status": {
                      "type": "string",
                      "maxLength": 100,
                      "enum": [
                        "active",
                        "inactive",
                        "pending",
                        "anonymous"
                      ],
                      "description": "User's account status",
                      "x-oapi-codegen-extra-tags": {
                        "db": "status",
                        "json": "status"
                      }
                    },
                    "bio": {
                      "type": "string",
                      "maxLength": 1000,
                      "default": "",
                      "description": "User's biography or description",
                      "x-oapi-codegen-extra-tags": {
                        "db": "bio",
                        "json": "bio"
                      }
                    },
                    "country": {
                      "type": "object",
                      "description": "User's country information stored as JSONB",
                      "additionalProperties": true,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "country",
                        "json": "country"
                      }
                    },
                    "region": {
                      "type": "object",
                      "description": "User's region information stored as JSONB",
                      "additionalProperties": true,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "region",
                        "json": "region"
                      }
                    },
                    "preferences": {
                      "x-go-type": "Preference",
                      "description": "User's preferences stored as JSONB",
                      "x-oapi-codegen-extra-tags": {
                        "db": "preferences",
                        "json": "preferences"
                      },
                      "x-generate-db-helpers": true,
                      "type": "object",
                      "required": [
                        "anonymousUsageStats",
                        "anonymousPerfResults",
                        "updatedAt",
                        "dashboardPreferences",
                        "selectedOrganizationId",
                        "selectedWorkspaceForOrganizations",
                        "usersExtensionPreferences",
                        "remoteProviderPreferences"
                      ],
                      "properties": {
                        "meshAdapters": {
                          "type": "array",
                          "items": {
                            "x-go-type": "Adapter",
                            "type": "object",
                            "additionalProperties": false,
                            "description": "Meshery adapter configuration stored in user preferences.",
                            "required": [
                              "adapterLocation",
                              "name",
                              "version",
                              "gitCommitSha",
                              "ops"
                            ],
                            "properties": {
                              "adapterLocation": {
                                "type": "string",
                                "description": "Network location used to reach the adapter.",
                                "minLength": 1,
                                "maxLength": 500
                              },
                              "name": {
                                "type": "string",
                                "description": "Adapter name.",
                                "minLength": 1,
                                "maxLength": 255
                              },
                              "version": {
                                "type": "string",
                                "description": "Adapter version.",
                                "maxLength": 100
                              },
                              "gitCommitSha": {
                                "type": "string",
                                "description": "Git commit SHA for the adapter build.",
                                "maxLength": 64
                              },
                              "ops": {
                                "type": "array",
                                "description": "Operations supported by the adapter.",
                                "items": {
                                  "type": "object",
                                  "additionalProperties": false,
                                  "description": "Operation supported by a Meshery adapter.",
                                  "required": [
                                    "key",
                                    "value",
                                    "category"
                                  ],
                                  "properties": {
                                    "key": {
                                      "type": "string",
                                      "description": "Stable operation key.",
                                      "minLength": 1,
                                      "maxLength": 255
                                    },
                                    "value": {
                                      "type": "string",
                                      "description": "Human-readable operation value.",
                                      "minLength": 1,
                                      "maxLength": 255
                                    },
                                    "category": {
                                      "type": "integer",
                                      "description": "Protobuf OpCategory wire value. Integer values intentionally mirror meshops.proto instead of using lowercase string enum literals.",
                                      "minimum": 0,
                                      "maximum": 4,
                                      "enum": [
                                        0,
                                        1,
                                        2,
                                        3,
                                        4
                                      ]
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "description": "The mesh adapters of the preference."
                        },
                        "grafana": {
                          "x-go-type": "Grafana",
                          "type": "object",
                          "properties": {
                            "grafanaUrl": {
                              "type": "string",
                              "description": "Grafana URL for the user configuration.",
                              "maxLength": 500
                            },
                            "grafanaApiKey": {
                              "type": "string",
                              "description": "Grafana API key for the user configuration.",
                              "maxLength": 500
                            },
                            "selectedBoardsConfigs": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "properties": {
                                  "board": {
                                    "type": "object",
                                    "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
                                  },
                                  "panels": {
                                    "type": "array",
                                    "items": {
                                      "type": "object",
                                      "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
                                    },
                                    "description": "Panels selected for the Grafana board configuration."
                                  },
                                  "templateVars": {
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    },
                                    "description": "Template variables applied to the selected Grafana board configuration."
                                  }
                                }
                              },
                              "description": "Selected Grafana board configurations for the user."
                            }
                          }
                        },
                        "prometheus": {
                          "x-go-type": "Prometheus",
                          "type": "object",
                          "properties": {
                            "prometheusUrl": {
                              "type": "string",
                              "description": "The prometheus URL of the prometheus.",
                              "maxLength": 500
                            },
                            "selectedPrometheusBoardsConfigs": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "properties": {
                                  "board": {
                                    "type": "object",
                                    "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
                                  },
                                  "panels": {
                                    "type": "array",
                                    "items": {
                                      "type": "object",
                                      "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
                                    },
                                    "description": "Panels selected for the Grafana board configuration."
                                  },
                                  "templateVars": {
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    },
                                    "description": "Template variables applied to the selected Grafana board configuration."
                                  }
                                }
                              },
                              "description": "The selected prometheus boards configs of the prometheus."
                            }
                          }
                        },
                        "loadTestPrefs": {
                          "x-go-type": "LoadTestPreferences",
                          "type": "object",
                          "properties": {
                            "c": {
                              "type": "integer",
                              "description": "Concurrent requests",
                              "minimum": 0
                            },
                            "qps": {
                              "type": "integer",
                              "description": "Queries per second",
                              "minimum": 0
                            },
                            "t": {
                              "type": "string",
                              "description": "Duration",
                              "maxLength": 500
                            },
                            "gen": {
                              "type": "string",
                              "description": "Load generator",
                              "maxLength": 500
                            }
                          }
                        },
                        "anonymousUsageStats": {
                          "type": "boolean",
                          "description": "The anonymous usage stats of the preference."
                        },
                        "anonymousPerfResults": {
                          "type": "boolean",
                          "description": "The anonymous perf results of the preference."
                        },
                        "updatedAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Timestamp of when the resource was last updated."
                        },
                        "dashboardPreferences": {
                          "type": "object",
                          "additionalProperties": true,
                          "description": "The dashboard preferences of the preference."
                        },
                        "selectedOrganizationId": {
                          "type": "string",
                          "description": "ID of the associated selectedOrganization.",
                          "maxLength": 500,
                          "format": "uuid",
                          "x-go-type": "core.Uuid",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          }
                        },
                        "selectedWorkspaceForOrganizations": {
                          "type": "object",
                          "additionalProperties": {
                            "type": "string"
                          },
                          "description": "The selected workspace for organizations of the preference."
                        },
                        "usersExtensionPreferences": {
                          "type": "object",
                          "additionalProperties": true,
                          "description": "The users extension preferences of the preference."
                        },
                        "remoteProviderPreferences": {
                          "type": "object",
                          "additionalProperties": true,
                          "description": "The remote provider preferences of the preference."
                        }
                      }
                    },
                    "acceptedTermsAt": {
                      "description": "Timestamp when the user accepted terms and conditions",
                      "x-oapi-codegen-extra-tags": {
                        "db": "accepted_terms_at",
                        "json": "acceptedTermsAt"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "firstLoginTime": {
                      "description": "Timestamp of the user's first login",
                      "x-oapi-codegen-extra-tags": {
                        "db": "first_login_time",
                        "json": "firstLoginTime"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "lastLoginTime": {
                      "description": "Timestamp of the user's most recent login",
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_login_time",
                        "json": "lastLoginTime"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "createdAt": {
                      "description": "Timestamp when the user record was created",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "createdAt"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp when the user record was last updated",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updatedAt"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "socials": {
                      "type": "array",
                      "description": "Various online profiles associated with the user's account",
                      "x-go-type": "UserSocials",
                      "items": {
                        "x-go-type": "Social",
                        "description": "Various online profiles associated with the user account, like GitHub, LinkedIn, X, and so on.",
                        "type": "object",
                        "properties": {
                          "site": {
                            "type": "string",
                            "maxLength": 50,
                            "description": "The site of the social."
                          },
                          "link": {
                            "type": "string",
                            "format": "uri",
                            "description": "The link of the social."
                          }
                        },
                        "required": [
                          "site",
                          "link"
                        ]
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "socials",
                        "json": "socials"
                      }
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "nullable": true,
                      "description": "Timestamp when the user record was soft-deleted (null if not deleted)",
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deletedAt"
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
          "cloud"
        ],
        "tags": [
          "users"
        ],
        "operationId": "deleteUserById",
        "summary": "Delete user by ID",
        "description": "Deletes a user account by ID.",
        "parameters": [
          {
            "name": "userId",
            "in": "path",
            "required": true,
            "description": "User ID",
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
            "description": "User deleted"
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
    "/api/identity/user": {
      "delete": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "users"
        ],
        "operationId": "deleteOwnAccount",
        "summary": "Delete own account",
        "description": "Deletes the authenticated user's account.",
        "responses": {
          "204": {
            "description": "User account deleted"
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
    "/api/identity/users/online": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "users"
        ],
        "operationId": "getRecentlyOnlineUsers",
        "summary": "Get recently online users",
        "description": "Returns recently online users.",
        "responses": {
          "200": {
            "description": "Recently online users",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$id": "https://schemas.meshery.io/user.yaml",
                    "$schema": "http://json-schema.org/draft-07/schema#",
                    "type": "object",
                    "description": "Represents a user in Layer5 Cloud (Meshery)",
                    "additionalProperties": false,
                    "required": [
                      "id",
                      "userId",
                      "provider",
                      "email",
                      "firstName",
                      "lastName",
                      "status",
                      "acceptedTermsAt",
                      "firstLoginTime",
                      "lastLoginTime",
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
                        }
                      },
                      "userId": {
                        "type": "string",
                        "maxLength": 200,
                        "description": "User's identifier (username or external ID)",
                        "x-oapi-codegen-extra-tags": {
                          "db": "user_id",
                          "json": "userId"
                        },
                        "x-id-format": "external"
                      },
                      "provider": {
                        "type": "string",
                        "maxLength": 100,
                        "description": "User's authentication provider (e.g., Layer5, Twitter, Facebook, GitHub)",
                        "example": "Layer5",
                        "x-oapi-codegen-extra-tags": {
                          "db": "provider",
                          "json": "provider"
                        }
                      },
                      "email": {
                        "type": "string",
                        "format": "email",
                        "maxLength": 300,
                        "description": "User's email address",
                        "x-oapi-codegen-extra-tags": {
                          "db": "email",
                          "json": "email"
                        }
                      },
                      "firstName": {
                        "type": "string",
                        "maxLength": 200,
                        "description": "User's first name",
                        "x-oapi-codegen-extra-tags": {
                          "db": "first_name",
                          "json": "firstName"
                        }
                      },
                      "lastName": {
                        "type": "string",
                        "maxLength": 300,
                        "description": "User's last name",
                        "x-oapi-codegen-extra-tags": {
                          "db": "last_name",
                          "json": "lastName"
                        }
                      },
                      "avatarUrl": {
                        "type": "string",
                        "format": "uri",
                        "maxLength": 500,
                        "description": "URL to the user's avatar image",
                        "x-oapi-codegen-extra-tags": {
                          "db": "avatar_url",
                          "json": "avatarUrl"
                        }
                      },
                      "status": {
                        "type": "string",
                        "maxLength": 100,
                        "enum": [
                          "active",
                          "inactive",
                          "pending",
                          "anonymous"
                        ],
                        "description": "User's account status",
                        "x-oapi-codegen-extra-tags": {
                          "db": "status",
                          "json": "status"
                        }
                      },
                      "bio": {
                        "type": "string",
                        "maxLength": 1000,
                        "default": "",
                        "description": "User's biography or description",
                        "x-oapi-codegen-extra-tags": {
                          "db": "bio",
                          "json": "bio"
                        }
                      },
                      "country": {
                        "type": "object",
                        "description": "User's country information stored as JSONB",
                        "additionalProperties": true,
                        "x-go-type": "core.Map",
                        "x-go-type-import": {
                          "path": "github.com/meshery/schemas/models/core",
                          "name": "core"
                        },
                        "x-go-type-skip-optional-pointer": true,
                        "x-oapi-codegen-extra-tags": {
                          "db": "country",
                          "json": "country"
                        }
                      },
                      "region": {
                        "type": "object",
                        "description": "User's region information stored as JSONB",
                        "additionalProperties": true,
                        "x-go-type": "core.Map",
                        "x-go-type-import": {
                          "path": "github.com/meshery/schemas/models/core",
                          "name": "core"
                        },
                        "x-go-type-skip-optional-pointer": true,
                        "x-oapi-codegen-extra-tags": {
                          "db": "region",
                          "json": "region"
                        }
                      },
                      "preferences": {
                        "x-go-type": "Preference",
                        "description": "User's preferences stored as JSONB",
                        "x-oapi-codegen-extra-tags": {
                          "db": "preferences",
                          "json": "preferences"
                        },
                        "x-generate-db-helpers": true,
                        "type": "object",
                        "required": [
                          "anonymousUsageStats",
                          "anonymousPerfResults",
                          "updatedAt",
                          "dashboardPreferences",
                          "selectedOrganizationId",
                          "selectedWorkspaceForOrganizations",
                          "usersExtensionPreferences",
                          "remoteProviderPreferences"
                        ],
                        "properties": {
                          "meshAdapters": {
                            "type": "array",
                            "items": {
                              "x-go-type": "Adapter",
                              "type": "object",
                              "additionalProperties": false,
                              "description": "Meshery adapter configuration stored in user preferences.",
                              "required": [
                                "adapterLocation",
                                "name",
                                "version",
                                "gitCommitSha",
                                "ops"
                              ],
                              "properties": {
                                "adapterLocation": {
                                  "type": "string",
                                  "description": "Network location used to reach the adapter.",
                                  "minLength": 1,
                                  "maxLength": 500
                                },
                                "name": {
                                  "type": "string",
                                  "description": "Adapter name.",
                                  "minLength": 1,
                                  "maxLength": 255
                                },
                                "version": {
                                  "type": "string",
                                  "description": "Adapter version.",
                                  "maxLength": 100
                                },
                                "gitCommitSha": {
                                  "type": "string",
                                  "description": "Git commit SHA for the adapter build.",
                                  "maxLength": 64
                                },
                                "ops": {
                                  "type": "array",
                                  "description": "Operations supported by the adapter.",
                                  "items": {
                                    "type": "object",
                                    "additionalProperties": false,
                                    "description": "Operation supported by a Meshery adapter.",
                                    "required": [
                                      "key",
                                      "value",
                                      "category"
                                    ],
                                    "properties": {
                                      "key": {
                                        "type": "string",
                                        "description": "Stable operation key.",
                                        "minLength": 1,
                                        "maxLength": 255
                                      },
                                      "value": {
                                        "type": "string",
                                        "description": "Human-readable operation value.",
                                        "minLength": 1,
                                        "maxLength": 255
                                      },
                                      "category": {
                                        "type": "integer",
                                        "description": "Protobuf OpCategory wire value. Integer values intentionally mirror meshops.proto instead of using lowercase string enum literals.",
                                        "minimum": 0,
                                        "maximum": 4,
                                        "enum": [
                                          0,
                                          1,
                                          2,
                                          3,
                                          4
                                        ]
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            "description": "The mesh adapters of the preference."
                          },
                          "grafana": {
                            "x-go-type": "Grafana",
                            "type": "object",
                            "properties": {
                              "grafanaUrl": {
                                "type": "string",
                                "description": "Grafana URL for the user configuration.",
                                "maxLength": 500
                              },
                              "grafanaApiKey": {
                                "type": "string",
                                "description": "Grafana API key for the user configuration.",
                                "maxLength": 500
                              },
                              "selectedBoardsConfigs": {
                                "type": "array",
                                "items": {
                                  "type": "object",
                                  "properties": {
                                    "board": {
                                      "type": "object",
                                      "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
                                    },
                                    "panels": {
                                      "type": "array",
                                      "items": {
                                        "type": "object",
                                        "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
                                      },
                                      "description": "Panels selected for the Grafana board configuration."
                                    },
                                    "templateVars": {
                                      "type": "array",
                                      "items": {
                                        "type": "string"
                                      },
                                      "description": "Template variables applied to the selected Grafana board configuration."
                                    }
                                  }
                                },
                                "description": "Selected Grafana board configurations for the user."
                              }
                            }
                          },
                          "prometheus": {
                            "x-go-type": "Prometheus",
                            "type": "object",
                            "properties": {
                              "prometheusUrl": {
                                "type": "string",
                                "description": "The prometheus URL of the prometheus.",
                                "maxLength": 500
                              },
                              "selectedPrometheusBoardsConfigs": {
                                "type": "array",
                                "items": {
                                  "type": "object",
                                  "properties": {
                                    "board": {
                                      "type": "object",
                                      "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
                                    },
                                    "panels": {
                                      "type": "array",
                                      "items": {
                                        "type": "object",
                                        "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
                                      },
                                      "description": "Panels selected for the Grafana board configuration."
                                    },
                                    "templateVars": {
                                      "type": "array",
                                      "items": {
                                        "type": "string"
                                      },
                                      "description": "Template variables applied to the selected Grafana board configuration."
                                    }
                                  }
                                },
                                "description": "The selected prometheus boards configs of the prometheus."
                              }
                            }
                          },
                          "loadTestPrefs": {
                            "x-go-type": "LoadTestPreferences",
                            "type": "object",
                            "properties": {
                              "c": {
                                "type": "integer",
                                "description": "Concurrent requests",
                                "minimum": 0
                              },
                              "qps": {
                                "type": "integer",
                                "description": "Queries per second",
                                "minimum": 0
                              },
                              "t": {
                                "type": "string",
                                "description": "Duration",
                                "maxLength": 500
                              },
                              "gen": {
                                "type": "string",
                                "description": "Load generator",
                                "maxLength": 500
                              }
                            }
                          },
                          "anonymousUsageStats": {
                            "type": "boolean",
                            "description": "The anonymous usage stats of the preference."
                          },
                          "anonymousPerfResults": {
                            "type": "boolean",
                            "description": "The anonymous perf results of the preference."
                          },
                          "updatedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp of when the resource was last updated."
                          },
                          "dashboardPreferences": {
                            "type": "object",
                            "additionalProperties": true,
                            "description": "The dashboard preferences of the preference."
                          },
                          "selectedOrganizationId": {
                            "type": "string",
                            "description": "ID of the associated selectedOrganization.",
                            "maxLength": 500,
                            "format": "uuid",
                            "x-go-type": "core.Uuid",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            }
                          },
                          "selectedWorkspaceForOrganizations": {
                            "type": "object",
                            "additionalProperties": {
                              "type": "string"
                            },
                            "description": "The selected workspace for organizations of the preference."
                          },
                          "usersExtensionPreferences": {
                            "type": "object",
                            "additionalProperties": true,
                            "description": "The users extension preferences of the preference."
                          },
                          "remoteProviderPreferences": {
                            "type": "object",
                            "additionalProperties": true,
                            "description": "The remote provider preferences of the preference."
                          }
                        }
                      },
                      "acceptedTermsAt": {
                        "description": "Timestamp when the user accepted terms and conditions",
                        "x-oapi-codegen-extra-tags": {
                          "db": "accepted_terms_at",
                          "json": "acceptedTermsAt"
                        },
                        "type": "string",
                        "format": "date-time",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "firstLoginTime": {
                        "description": "Timestamp of the user's first login",
                        "x-oapi-codegen-extra-tags": {
                          "db": "first_login_time",
                          "json": "firstLoginTime"
                        },
                        "type": "string",
                        "format": "date-time",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "lastLoginTime": {
                        "description": "Timestamp of the user's most recent login",
                        "x-oapi-codegen-extra-tags": {
                          "db": "last_login_time",
                          "json": "lastLoginTime"
                        },
                        "type": "string",
                        "format": "date-time",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "createdAt": {
                        "description": "Timestamp when the user record was created",
                        "x-oapi-codegen-extra-tags": {
                          "db": "created_at",
                          "json": "createdAt"
                        },
                        "type": "string",
                        "format": "date-time",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "updatedAt": {
                        "description": "Timestamp when the user record was last updated",
                        "x-oapi-codegen-extra-tags": {
                          "db": "updated_at",
                          "json": "updatedAt"
                        },
                        "type": "string",
                        "format": "date-time",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "socials": {
                        "type": "array",
                        "description": "Various online profiles associated with the user's account",
                        "x-go-type": "UserSocials",
                        "items": {
                          "x-go-type": "Social",
                          "description": "Various online profiles associated with the user account, like GitHub, LinkedIn, X, and so on.",
                          "type": "object",
                          "properties": {
                            "site": {
                              "type": "string",
                              "maxLength": 50,
                              "description": "The site of the social."
                            },
                            "link": {
                              "type": "string",
                              "format": "uri",
                              "description": "The link of the social."
                            }
                          },
                          "required": [
                            "site",
                            "link"
                          ]
                        },
                        "x-oapi-codegen-extra-tags": {
                          "db": "socials",
                          "json": "socials"
                        }
                      },
                      "deletedAt": {
                        "type": "string",
                        "format": "date-time",
                        "nullable": true,
                        "description": "Timestamp when the user record was soft-deleted (null if not deleted)",
                        "x-go-type": "core.NullTime",
                        "x-go-type-import": {
                          "path": "github.com/meshery/schemas/models/core",
                          "name": "core"
                        },
                        "x-oapi-codegen-extra-tags": {
                          "db": "deleted_at",
                          "json": "deletedAt"
                        }
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
      }
    },
    "/api/identity/users/preferences": {
      "get": {
        "x-internal": [
          "meshery"
        ],
        "tags": [
          "users"
        ],
        "operationId": "getUserPreferences",
        "summary": "Get user preferences",
        "description": "Returns preferences for the authenticated user.",
        "responses": {
          "200": {
            "description": "User preferences response",
            "content": {
              "application/json": {
                "schema": {
                  "x-generate-db-helpers": true,
                  "type": "object",
                  "required": [
                    "anonymousUsageStats",
                    "anonymousPerfResults",
                    "updatedAt",
                    "dashboardPreferences",
                    "selectedOrganizationId",
                    "selectedWorkspaceForOrganizations",
                    "usersExtensionPreferences",
                    "remoteProviderPreferences"
                  ],
                  "properties": {
                    "meshAdapters": {
                      "type": "array",
                      "items": {
                        "x-go-type": "Adapter",
                        "type": "object",
                        "additionalProperties": false,
                        "description": "Meshery adapter configuration stored in user preferences.",
                        "required": [
                          "adapterLocation",
                          "name",
                          "version",
                          "gitCommitSha",
                          "ops"
                        ],
                        "properties": {
                          "adapterLocation": {
                            "type": "string",
                            "description": "Network location used to reach the adapter.",
                            "minLength": 1,
                            "maxLength": 500
                          },
                          "name": {
                            "type": "string",
                            "description": "Adapter name.",
                            "minLength": 1,
                            "maxLength": 255
                          },
                          "version": {
                            "type": "string",
                            "description": "Adapter version.",
                            "maxLength": 100
                          },
                          "gitCommitSha": {
                            "type": "string",
                            "description": "Git commit SHA for the adapter build.",
                            "maxLength": 64
                          },
                          "ops": {
                            "type": "array",
                            "description": "Operations supported by the adapter.",
                            "items": {
                              "type": "object",
                              "additionalProperties": false,
                              "description": "Operation supported by a Meshery adapter.",
                              "required": [
                                "key",
                                "value",
                                "category"
                              ],
                              "properties": {
                                "key": {
                                  "type": "string",
                                  "description": "Stable operation key.",
                                  "minLength": 1,
                                  "maxLength": 255
                                },
                                "value": {
                                  "type": "string",
                                  "description": "Human-readable operation value.",
                                  "minLength": 1,
                                  "maxLength": 255
                                },
                                "category": {
                                  "type": "integer",
                                  "description": "Protobuf OpCategory wire value. Integer values intentionally mirror meshops.proto instead of using lowercase string enum literals.",
                                  "minimum": 0,
                                  "maximum": 4,
                                  "enum": [
                                    0,
                                    1,
                                    2,
                                    3,
                                    4
                                  ]
                                }
                              }
                            }
                          }
                        }
                      },
                      "description": "The mesh adapters of the preference."
                    },
                    "grafana": {
                      "x-go-type": "Grafana",
                      "type": "object",
                      "properties": {
                        "grafanaUrl": {
                          "type": "string",
                          "description": "Grafana URL for the user configuration.",
                          "maxLength": 500
                        },
                        "grafanaApiKey": {
                          "type": "string",
                          "description": "Grafana API key for the user configuration.",
                          "maxLength": 500
                        },
                        "selectedBoardsConfigs": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "board": {
                                "type": "object",
                                "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
                              },
                              "panels": {
                                "type": "array",
                                "items": {
                                  "type": "object",
                                  "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
                                },
                                "description": "Panels selected for the Grafana board configuration."
                              },
                              "templateVars": {
                                "type": "array",
                                "items": {
                                  "type": "string"
                                },
                                "description": "Template variables applied to the selected Grafana board configuration."
                              }
                            }
                          },
                          "description": "Selected Grafana board configurations for the user."
                        }
                      }
                    },
                    "prometheus": {
                      "x-go-type": "Prometheus",
                      "type": "object",
                      "properties": {
                        "prometheusUrl": {
                          "type": "string",
                          "description": "The prometheus URL of the prometheus.",
                          "maxLength": 500
                        },
                        "selectedPrometheusBoardsConfigs": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "board": {
                                "type": "object",
                                "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
                              },
                              "panels": {
                                "type": "array",
                                "items": {
                                  "type": "object",
                                  "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
                                },
                                "description": "Panels selected for the Grafana board configuration."
                              },
                              "templateVars": {
                                "type": "array",
                                "items": {
                                  "type": "string"
                                },
                                "description": "Template variables applied to the selected Grafana board configuration."
                              }
                            }
                          },
                          "description": "The selected prometheus boards configs of the prometheus."
                        }
                      }
                    },
                    "loadTestPrefs": {
                      "x-go-type": "LoadTestPreferences",
                      "type": "object",
                      "properties": {
                        "c": {
                          "type": "integer",
                          "description": "Concurrent requests",
                          "minimum": 0
                        },
                        "qps": {
                          "type": "integer",
                          "description": "Queries per second",
                          "minimum": 0
                        },
                        "t": {
                          "type": "string",
                          "description": "Duration",
                          "maxLength": 500
                        },
                        "gen": {
                          "type": "string",
                          "description": "Load generator",
                          "maxLength": 500
                        }
                      }
                    },
                    "anonymousUsageStats": {
                      "type": "boolean",
                      "description": "The anonymous usage stats of the preference."
                    },
                    "anonymousPerfResults": {
                      "type": "boolean",
                      "description": "The anonymous perf results of the preference."
                    },
                    "updatedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp of when the resource was last updated."
                    },
                    "dashboardPreferences": {
                      "type": "object",
                      "additionalProperties": true,
                      "description": "The dashboard preferences of the preference."
                    },
                    "selectedOrganizationId": {
                      "type": "string",
                      "description": "ID of the associated selectedOrganization.",
                      "maxLength": 500,
                      "format": "uuid",
                      "x-go-type": "core.Uuid",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      }
                    },
                    "selectedWorkspaceForOrganizations": {
                      "type": "object",
                      "additionalProperties": {
                        "type": "string"
                      },
                      "description": "The selected workspace for organizations of the preference."
                    },
                    "usersExtensionPreferences": {
                      "type": "object",
                      "additionalProperties": true,
                      "description": "The users extension preferences of the preference."
                    },
                    "remoteProviderPreferences": {
                      "type": "object",
                      "additionalProperties": true,
                      "description": "The remote provider preferences of the preference."
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
      "put": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "users"
        ],
        "operationId": "updateUserPreferences",
        "summary": "Update user preferences",
        "description": "Updates preferences for the authenticated user.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for updating user preferences. Contains only client-settable fields; omitted fields are left unchanged by the server.",
                "properties": {
                  "meshAdapters": {
                    "type": "array",
                    "items": {
                      "x-go-type": "Adapter",
                      "type": "object",
                      "additionalProperties": false,
                      "description": "Meshery adapter configuration stored in user preferences.",
                      "required": [
                        "adapterLocation",
                        "name",
                        "version",
                        "gitCommitSha",
                        "ops"
                      ],
                      "properties": {
                        "adapterLocation": {
                          "type": "string",
                          "description": "Network location used to reach the adapter.",
                          "minLength": 1,
                          "maxLength": 500
                        },
                        "name": {
                          "type": "string",
                          "description": "Adapter name.",
                          "minLength": 1,
                          "maxLength": 255
                        },
                        "version": {
                          "type": "string",
                          "description": "Adapter version.",
                          "maxLength": 100
                        },
                        "gitCommitSha": {
                          "type": "string",
                          "description": "Git commit SHA for the adapter build.",
                          "maxLength": 64
                        },
                        "ops": {
                          "type": "array",
                          "description": "Operations supported by the adapter.",
                          "items": {
                            "type": "object",
                            "additionalProperties": false,
                            "description": "Operation supported by a Meshery adapter.",
                            "required": [
                              "key",
                              "value",
                              "category"
                            ],
                            "properties": {
                              "key": {
                                "type": "string",
                                "description": "Stable operation key.",
                                "minLength": 1,
                                "maxLength": 255
                              },
                              "value": {
                                "type": "string",
                                "description": "Human-readable operation value.",
                                "minLength": 1,
                                "maxLength": 255
                              },
                              "category": {
                                "type": "integer",
                                "description": "Protobuf OpCategory wire value. Integer values intentionally mirror meshops.proto instead of using lowercase string enum literals.",
                                "minimum": 0,
                                "maximum": 4,
                                "enum": [
                                  0,
                                  1,
                                  2,
                                  3,
                                  4
                                ]
                              }
                            }
                          }
                        }
                      }
                    },
                    "description": "The mesh adapters of the preference."
                  },
                  "grafana": {
                    "type": "object",
                    "properties": {
                      "grafanaUrl": {
                        "type": "string",
                        "description": "Grafana URL for the user configuration.",
                        "maxLength": 500
                      },
                      "grafanaApiKey": {
                        "type": "string",
                        "description": "Grafana API key for the user configuration.",
                        "maxLength": 500
                      },
                      "selectedBoardsConfigs": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "board": {
                              "type": "object",
                              "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
                            },
                            "panels": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
                              },
                              "description": "Panels selected for the Grafana board configuration."
                            },
                            "templateVars": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              },
                              "description": "Template variables applied to the selected Grafana board configuration."
                            }
                          }
                        },
                        "description": "Selected Grafana board configurations for the user."
                      }
                    }
                  },
                  "prometheus": {
                    "type": "object",
                    "properties": {
                      "prometheusUrl": {
                        "type": "string",
                        "description": "The prometheus URL of the prometheus.",
                        "maxLength": 500
                      },
                      "selectedPrometheusBoardsConfigs": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "board": {
                              "type": "object",
                              "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
                            },
                            "panels": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
                              },
                              "description": "Panels selected for the Grafana board configuration."
                            },
                            "templateVars": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              },
                              "description": "Template variables applied to the selected Grafana board configuration."
                            }
                          }
                        },
                        "description": "The selected prometheus boards configs of the prometheus."
                      }
                    }
                  },
                  "loadTestPrefs": {
                    "type": "object",
                    "properties": {
                      "c": {
                        "type": "integer",
                        "description": "Concurrent requests",
                        "minimum": 0
                      },
                      "qps": {
                        "type": "integer",
                        "description": "Queries per second",
                        "minimum": 0
                      },
                      "t": {
                        "type": "string",
                        "description": "Duration",
                        "maxLength": 500
                      },
                      "gen": {
                        "type": "string",
                        "description": "Load generator",
                        "maxLength": 500
                      }
                    }
                  },
                  "anonymousUsageStats": {
                    "type": "boolean",
                    "description": "The anonymous usage stats of the preference."
                  },
                  "anonymousPerfResults": {
                    "type": "boolean",
                    "description": "The anonymous perf results of the preference."
                  },
                  "dashboardPreferences": {
                    "type": "object",
                    "additionalProperties": true,
                    "description": "The dashboard preferences of the preference."
                  },
                  "selectedOrganizationId": {
                    "type": "string",
                    "description": "ID of the associated selectedOrganization.",
                    "maxLength": 500,
                    "format": "uuid",
                    "x-go-type": "core.Uuid",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    }
                  },
                  "selectedWorkspaceForOrganizations": {
                    "type": "object",
                    "additionalProperties": {
                      "type": "string"
                    },
                    "description": "The selected workspace for organizations of the preference."
                  },
                  "usersExtensionPreferences": {
                    "type": "object",
                    "additionalProperties": true,
                    "description": "The users extension preferences of the preference."
                  },
                  "remoteProviderPreferences": {
                    "type": "object",
                    "additionalProperties": true,
                    "description": "The remote provider preferences of the preference."
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "User preferences updated",
            "content": {
              "application/json": {
                "schema": {
                  "x-generate-db-helpers": true,
                  "type": "object",
                  "required": [
                    "anonymousUsageStats",
                    "anonymousPerfResults",
                    "updatedAt",
                    "dashboardPreferences",
                    "selectedOrganizationId",
                    "selectedWorkspaceForOrganizations",
                    "usersExtensionPreferences",
                    "remoteProviderPreferences"
                  ],
                  "properties": {
                    "meshAdapters": {
                      "type": "array",
                      "items": {
                        "x-go-type": "Adapter",
                        "type": "object",
                        "additionalProperties": false,
                        "description": "Meshery adapter configuration stored in user preferences.",
                        "required": [
                          "adapterLocation",
                          "name",
                          "version",
                          "gitCommitSha",
                          "ops"
                        ],
                        "properties": {
                          "adapterLocation": {
                            "type": "string",
                            "description": "Network location used to reach the adapter.",
                            "minLength": 1,
                            "maxLength": 500
                          },
                          "name": {
                            "type": "string",
                            "description": "Adapter name.",
                            "minLength": 1,
                            "maxLength": 255
                          },
                          "version": {
                            "type": "string",
                            "description": "Adapter version.",
                            "maxLength": 100
                          },
                          "gitCommitSha": {
                            "type": "string",
                            "description": "Git commit SHA for the adapter build.",
                            "maxLength": 64
                          },
                          "ops": {
                            "type": "array",
                            "description": "Operations supported by the adapter.",
                            "items": {
                              "type": "object",
                              "additionalProperties": false,
                              "description": "Operation supported by a Meshery adapter.",
                              "required": [
                                "key",
                                "value",
                                "category"
                              ],
                              "properties": {
                                "key": {
                                  "type": "string",
                                  "description": "Stable operation key.",
                                  "minLength": 1,
                                  "maxLength": 255
                                },
                                "value": {
                                  "type": "string",
                                  "description": "Human-readable operation value.",
                                  "minLength": 1,
                                  "maxLength": 255
                                },
                                "category": {
                                  "type": "integer",
                                  "description": "Protobuf OpCategory wire value. Integer values intentionally mirror meshops.proto instead of using lowercase string enum literals.",
                                  "minimum": 0,
                                  "maximum": 4,
                                  "enum": [
                                    0,
                                    1,
                                    2,
                                    3,
                                    4
                                  ]
                                }
                              }
                            }
                          }
                        }
                      },
                      "description": "The mesh adapters of the preference."
                    },
                    "grafana": {
                      "x-go-type": "Grafana",
                      "type": "object",
                      "properties": {
                        "grafanaUrl": {
                          "type": "string",
                          "description": "Grafana URL for the user configuration.",
                          "maxLength": 500
                        },
                        "grafanaApiKey": {
                          "type": "string",
                          "description": "Grafana API key for the user configuration.",
                          "maxLength": 500
                        },
                        "selectedBoardsConfigs": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "board": {
                                "type": "object",
                                "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
                              },
                              "panels": {
                                "type": "array",
                                "items": {
                                  "type": "object",
                                  "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
                                },
                                "description": "Panels selected for the Grafana board configuration."
                              },
                              "templateVars": {
                                "type": "array",
                                "items": {
                                  "type": "string"
                                },
                                "description": "Template variables applied to the selected Grafana board configuration."
                              }
                            }
                          },
                          "description": "Selected Grafana board configurations for the user."
                        }
                      }
                    },
                    "prometheus": {
                      "x-go-type": "Prometheus",
                      "type": "object",
                      "properties": {
                        "prometheusUrl": {
                          "type": "string",
                          "description": "The prometheus URL of the prometheus.",
                          "maxLength": 500
                        },
                        "selectedPrometheusBoardsConfigs": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "board": {
                                "type": "object",
                                "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
                              },
                              "panels": {
                                "type": "array",
                                "items": {
                                  "type": "object",
                                  "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
                                },
                                "description": "Panels selected for the Grafana board configuration."
                              },
                              "templateVars": {
                                "type": "array",
                                "items": {
                                  "type": "string"
                                },
                                "description": "Template variables applied to the selected Grafana board configuration."
                              }
                            }
                          },
                          "description": "The selected prometheus boards configs of the prometheus."
                        }
                      }
                    },
                    "loadTestPrefs": {
                      "x-go-type": "LoadTestPreferences",
                      "type": "object",
                      "properties": {
                        "c": {
                          "type": "integer",
                          "description": "Concurrent requests",
                          "minimum": 0
                        },
                        "qps": {
                          "type": "integer",
                          "description": "Queries per second",
                          "minimum": 0
                        },
                        "t": {
                          "type": "string",
                          "description": "Duration",
                          "maxLength": 500
                        },
                        "gen": {
                          "type": "string",
                          "description": "Load generator",
                          "maxLength": 500
                        }
                      }
                    },
                    "anonymousUsageStats": {
                      "type": "boolean",
                      "description": "The anonymous usage stats of the preference."
                    },
                    "anonymousPerfResults": {
                      "type": "boolean",
                      "description": "The anonymous perf results of the preference."
                    },
                    "updatedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp of when the resource was last updated."
                    },
                    "dashboardPreferences": {
                      "type": "object",
                      "additionalProperties": true,
                      "description": "The dashboard preferences of the preference."
                    },
                    "selectedOrganizationId": {
                      "type": "string",
                      "description": "ID of the associated selectedOrganization.",
                      "maxLength": 500,
                      "format": "uuid",
                      "x-go-type": "core.Uuid",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      }
                    },
                    "selectedWorkspaceForOrganizations": {
                      "type": "object",
                      "additionalProperties": {
                        "type": "string"
                      },
                      "description": "The selected workspace for organizations of the preference."
                    },
                    "usersExtensionPreferences": {
                      "type": "object",
                      "additionalProperties": true,
                      "description": "The users extension preferences of the preference."
                    },
                    "remoteProviderPreferences": {
                      "type": "object",
                      "additionalProperties": true,
                      "description": "The remote provider preferences of the preference."
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
    "/api/identity/users/notifications/preferences": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "security": [],
        "tags": [
          "users"
        ],
        "operationId": "getAvailableNotificationPreferences",
        "summary": "Get notification preferences",
        "description": "Returns available notification preferences.",
        "responses": {
          "200": {
            "description": "Available notification preferences",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Available notification preferences.",
                  "properties": {
                    "notificationPreferences": {
                      "type": "object",
                      "description": "Notification preferences keyed by preference identifier.",
                      "additionalProperties": {
                        "type": "object",
                        "description": "A notification preference option.",
                        "properties": {
                          "id": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "name": {
                            "type": "string",
                            "description": "Notification preference name.",
                            "maxLength": 200
                          },
                          "description": {
                            "type": "string",
                            "description": "Notification preference description.",
                            "maxLength": 1000
                          },
                          "category": {
                            "type": "string",
                            "description": "Notification preference category.",
                            "maxLength": 200
                          },
                          "subcategory": {
                            "type": "string",
                            "description": "Notification preference subcategory.",
                            "maxLength": 200
                          },
                          "label": {
                            "type": "string",
                            "description": "Notification preference label.",
                            "maxLength": 200
                          },
                          "createdAt": {
                            "description": "Timestamp when the notification preference was created.",
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp when the notification preference was last updated.",
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          }
                        }
                      }
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of notification preferences.",
                      "minimum": 0
                    }
                  }
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
          "users"
        ],
        "operationId": "updateNotificationPreferences",
        "summary": "Update notification preferences",
        "description": "Updates notification preferences for the authenticated user.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for updating notification preferences.",
                "properties": {
                  "notificationPreferences": {
                    "type": "array",
                    "description": "Notification preference labels to enable.",
                    "items": {
                      "type": "string",
                      "maxLength": 200
                    }
                  },
                  "userId": {
                    "type": "string",
                    "format": "uuid",
                    "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Notification preferences updated"
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
    "/api/identity/users/notify/comment": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "users"
        ],
        "operationId": "handleNotifyMentionUsers",
        "summary": "Notify mentioned users",
        "description": "Sends comment mention notifications to users.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for sending comment mention notifications.",
                "required": [
                  "mentionUsers",
                  "participants",
                  "designId",
                  "usersOptedOutOfNotifications",
                  "messages"
                ],
                "properties": {
                  "mentionUsers": {
                    "type": "array",
                    "description": "Users mentioned in the comment.",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    }
                  },
                  "participants": {
                    "type": "array",
                    "description": "Users participating in the comment thread.",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    }
                  },
                  "designId": {
                    "type": "string",
                    "format": "uuid",
                    "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  },
                  "usersOptedOutOfNotifications": {
                    "type": "array",
                    "description": "Users excluded from comment notifications.",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    }
                  },
                  "messages": {
                    "type": "array",
                    "description": "Messages in the comment thread.",
                    "items": {
                      "type": "object",
                      "description": "Comment notification message.",
                      "properties": {
                        "firstName": {
                          "type": "string",
                          "description": "Sender first name.",
                          "maxLength": 200
                        },
                        "lastName": {
                          "type": "string",
                          "description": "Sender last name.",
                          "maxLength": 300
                        },
                        "avatarUrl": {
                          "type": "string",
                          "description": "Sender avatar URL.",
                          "format": "uri",
                          "maxLength": 500
                        },
                        "message": {
                          "type": "string",
                          "description": "Comment message text.",
                          "maxLength": 5000
                        },
                        "timestamp": {
                          "description": "Timestamp when the message was created.",
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "userId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Mention notifications processed"
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
    "/api/identity/users/notify/feedback": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "users"
        ],
        "operationId": "handleFeedbackFormSubmission",
        "summary": "Submit user feedback",
        "description": "Sends feedback submitted by the authenticated user.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for submitting user feedback.",
                "required": [
                  "message",
                  "scope",
                  "pageLocation"
                ],
                "properties": {
                  "message": {
                    "type": "string",
                    "description": "Feedback message.",
                    "minLength": 1,
                    "maxLength": 5000
                  },
                  "scope": {
                    "type": "string",
                    "description": "Product area or workflow for the feedback.",
                    "minLength": 1,
                    "maxLength": 200
                  },
                  "pageLocation": {
                    "type": "string",
                    "description": "Page location where the feedback was submitted.",
                    "minLength": 1,
                    "maxLength": 1000
                  },
                  "metadata": {
                    "type": "object",
                    "description": "Additional feedback metadata.",
                    "additionalProperties": true
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Feedback submitted"
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
    "/api/identity/users/password": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "users"
        ],
        "operationId": "updateUsersPassword",
        "summary": "Update user password",
        "description": "Updates the authenticated user's password.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for updating a user password.",
                "additionalProperties": false,
                "required": [
                  "currentPassword",
                  "password"
                ],
                "properties": {
                  "currentPassword": {
                    "type": "string",
                    "description": "Current password for verification before update.",
                    "minLength": 1,
                    "maxLength": 200
                  },
                  "password": {
                    "type": "string",
                    "description": "New password for the user account.",
                    "minLength": 8,
                    "maxLength": 200
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "User password updated"
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
    "/api/identity/users/account": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "users"
        ],
        "operationId": "getUserAccount",
        "summary": "Link user account",
        "description": "Starts an account-linking flow for the authenticated user.",
        "parameters": [
          {
            "name": "oidc",
            "in": "query",
            "required": false,
            "description": "Optional account-linking provider hint.",
            "schema": {
              "type": "string",
              "maxLength": 100
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Account-linking page",
            "content": {
              "text/html": {
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
    "/api/identity/users/search": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "users"
        ],
        "operationId": "searchUsers",
        "summary": "Search users",
        "description": "Returns public user records visible to authenticated identity-management flows.",
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
            "name": "pageSize",
            "in": "query",
            "description": "Get responses by page size",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "orgId",
            "in": "query",
            "description": "Organization ID to scope the request.",
            "required": false,
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
            "name": "filter",
            "in": "query",
            "description": "Get filtered reponses",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Paginated list of searchable users",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated list of restricted user records returned by authenticated user search.",
                  "required": [
                    "page",
                    "pageSize",
                    "totalCount",
                    "data"
                  ],
                  "properties": {
                    "page": {
                      "type": "integer",
                      "description": "Current page number of the result set.",
                      "minimum": 0
                    },
                    "pageSize": {
                      "type": "integer",
                      "description": "Number of items per page.",
                      "minimum": 1
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of items available.",
                      "minimum": 0
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "additionalProperties": false,
                        "description": "Restricted user record returned by authenticated user search.",
                        "properties": {
                          "id": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "userId": {
                            "type": "string",
                            "description": "User's public identifier.",
                            "maxLength": 200,
                            "x-id-format": "external"
                          },
                          "username": {
                            "type": "string",
                            "description": "Public username.",
                            "maxLength": 255
                          },
                          "email": {
                            "type": "string",
                            "description": "User email address.",
                            "format": "email",
                            "maxLength": 320
                          },
                          "avatarUrl": {
                            "type": "string",
                            "description": "URL of the user's avatar image.",
                            "format": "uri",
                            "maxLength": 2048
                          }
                        }
                      },
                      "description": "Restricted users matching the search query."
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
    "/api/identity/users": {
      "get": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "users"
        ],
        "operationId": "getUsers",
        "summary": "Get users",
        "description": "Returns user records visible to the authenticated caller.",
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
            "name": "pageSize",
            "in": "query",
            "description": "Get responses by page size",
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
          },
          {
            "name": "filter",
            "in": "query",
            "description": "Get filtered reponses",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Paginated list of users",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated list of public user picker records.",
                  "required": [
                    "page",
                    "pageSize",
                    "totalCount",
                    "data"
                  ],
                  "properties": {
                    "page": {
                      "type": "integer",
                      "description": "Current page number of the result set.",
                      "minimum": 0
                    },
                    "pageSize": {
                      "type": "integer",
                      "description": "Number of items per page.",
                      "minimum": 1
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of items available.",
                      "minimum": 0
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "additionalProperties": false,
                        "description": "Public user picker fields. Wire-compatible with legacy /api/users.\nuserId carries the user's UUID; username is the human handle.\n",
                        "required": [
                          "userId",
                          "username"
                        ],
                        "properties": {
                          "userId": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "username": {
                            "type": "string",
                            "description": "Public username or handle.",
                            "maxLength": 255
                          },
                          "avatarUrl": {
                            "type": "string",
                            "format": "uri",
                            "description": "URL to the user's avatar image.",
                            "maxLength": 500
                          }
                        }
                      },
                      "description": "Public user picker records returned on this page."
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
        "required": true,
        "description": "User ID",
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
      "orgId": {
        "name": "orgId",
        "in": "path",
        "required": true,
        "description": "Organization ID",
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
      "orgIdQuery": {
        "name": "orgId",
        "in": "query",
        "description": "Organization ID to scope the request.",
        "required": false,
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
        "name": "userId",
        "in": "path",
        "required": true,
        "description": "User ID",
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
      "pageSize": {
        "name": "pageSize",
        "in": "query",
        "description": "Get responses by page size",
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
      "filter": {
        "name": "filter",
        "in": "query",
        "description": "Get filtered reponses",
        "schema": {
          "type": "string"
        }
      },
      "teamId": {
        "name": "teamId",
        "in": "query",
        "required": false,
        "description": "Optional team filter when listing organization users",
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
    },
    "securitySchemes": {
      "jwt": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    },
    "schemas": {
      "User": {
        "$id": "https://schemas.meshery.io/user.yaml",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "type": "object",
        "description": "Represents a user in Layer5 Cloud (Meshery)",
        "additionalProperties": false,
        "required": [
          "id",
          "userId",
          "provider",
          "email",
          "firstName",
          "lastName",
          "status",
          "acceptedTermsAt",
          "firstLoginTime",
          "lastLoginTime",
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
            }
          },
          "userId": {
            "type": "string",
            "maxLength": 200,
            "description": "User's identifier (username or external ID)",
            "x-oapi-codegen-extra-tags": {
              "db": "user_id",
              "json": "userId"
            },
            "x-id-format": "external"
          },
          "provider": {
            "type": "string",
            "maxLength": 100,
            "description": "User's authentication provider (e.g., Layer5, Twitter, Facebook, GitHub)",
            "example": "Layer5",
            "x-oapi-codegen-extra-tags": {
              "db": "provider",
              "json": "provider"
            }
          },
          "email": {
            "type": "string",
            "format": "email",
            "maxLength": 300,
            "description": "User's email address",
            "x-oapi-codegen-extra-tags": {
              "db": "email",
              "json": "email"
            }
          },
          "firstName": {
            "type": "string",
            "maxLength": 200,
            "description": "User's first name",
            "x-oapi-codegen-extra-tags": {
              "db": "first_name",
              "json": "firstName"
            }
          },
          "lastName": {
            "type": "string",
            "maxLength": 300,
            "description": "User's last name",
            "x-oapi-codegen-extra-tags": {
              "db": "last_name",
              "json": "lastName"
            }
          },
          "avatarUrl": {
            "type": "string",
            "format": "uri",
            "maxLength": 500,
            "description": "URL to the user's avatar image",
            "x-oapi-codegen-extra-tags": {
              "db": "avatar_url",
              "json": "avatarUrl"
            }
          },
          "status": {
            "type": "string",
            "maxLength": 100,
            "enum": [
              "active",
              "inactive",
              "pending",
              "anonymous"
            ],
            "description": "User's account status",
            "x-oapi-codegen-extra-tags": {
              "db": "status",
              "json": "status"
            }
          },
          "bio": {
            "type": "string",
            "maxLength": 1000,
            "default": "",
            "description": "User's biography or description",
            "x-oapi-codegen-extra-tags": {
              "db": "bio",
              "json": "bio"
            }
          },
          "country": {
            "type": "object",
            "description": "User's country information stored as JSONB",
            "additionalProperties": true,
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "country",
              "json": "country"
            }
          },
          "region": {
            "type": "object",
            "description": "User's region information stored as JSONB",
            "additionalProperties": true,
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "region",
              "json": "region"
            }
          },
          "preferences": {
            "x-go-type": "Preference",
            "description": "User's preferences stored as JSONB",
            "x-oapi-codegen-extra-tags": {
              "db": "preferences",
              "json": "preferences"
            },
            "x-generate-db-helpers": true,
            "type": "object",
            "required": [
              "anonymousUsageStats",
              "anonymousPerfResults",
              "updatedAt",
              "dashboardPreferences",
              "selectedOrganizationId",
              "selectedWorkspaceForOrganizations",
              "usersExtensionPreferences",
              "remoteProviderPreferences"
            ],
            "properties": {
              "meshAdapters": {
                "type": "array",
                "items": {
                  "x-go-type": "Adapter",
                  "type": "object",
                  "additionalProperties": false,
                  "description": "Meshery adapter configuration stored in user preferences.",
                  "required": [
                    "adapterLocation",
                    "name",
                    "version",
                    "gitCommitSha",
                    "ops"
                  ],
                  "properties": {
                    "adapterLocation": {
                      "type": "string",
                      "description": "Network location used to reach the adapter.",
                      "minLength": 1,
                      "maxLength": 500
                    },
                    "name": {
                      "type": "string",
                      "description": "Adapter name.",
                      "minLength": 1,
                      "maxLength": 255
                    },
                    "version": {
                      "type": "string",
                      "description": "Adapter version.",
                      "maxLength": 100
                    },
                    "gitCommitSha": {
                      "type": "string",
                      "description": "Git commit SHA for the adapter build.",
                      "maxLength": 64
                    },
                    "ops": {
                      "type": "array",
                      "description": "Operations supported by the adapter.",
                      "items": {
                        "type": "object",
                        "additionalProperties": false,
                        "description": "Operation supported by a Meshery adapter.",
                        "required": [
                          "key",
                          "value",
                          "category"
                        ],
                        "properties": {
                          "key": {
                            "type": "string",
                            "description": "Stable operation key.",
                            "minLength": 1,
                            "maxLength": 255
                          },
                          "value": {
                            "type": "string",
                            "description": "Human-readable operation value.",
                            "minLength": 1,
                            "maxLength": 255
                          },
                          "category": {
                            "type": "integer",
                            "description": "Protobuf OpCategory wire value. Integer values intentionally mirror meshops.proto instead of using lowercase string enum literals.",
                            "minimum": 0,
                            "maximum": 4,
                            "enum": [
                              0,
                              1,
                              2,
                              3,
                              4
                            ]
                          }
                        }
                      }
                    }
                  }
                },
                "description": "The mesh adapters of the preference."
              },
              "grafana": {
                "x-go-type": "Grafana",
                "type": "object",
                "properties": {
                  "grafanaUrl": {
                    "type": "string",
                    "description": "Grafana URL for the user configuration.",
                    "maxLength": 500
                  },
                  "grafanaApiKey": {
                    "type": "string",
                    "description": "Grafana API key for the user configuration.",
                    "maxLength": 500
                  },
                  "selectedBoardsConfigs": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "board": {
                          "type": "object",
                          "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
                        },
                        "panels": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
                          },
                          "description": "Panels selected for the Grafana board configuration."
                        },
                        "templateVars": {
                          "type": "array",
                          "items": {
                            "type": "string"
                          },
                          "description": "Template variables applied to the selected Grafana board configuration."
                        }
                      }
                    },
                    "description": "Selected Grafana board configurations for the user."
                  }
                }
              },
              "prometheus": {
                "x-go-type": "Prometheus",
                "type": "object",
                "properties": {
                  "prometheusUrl": {
                    "type": "string",
                    "description": "The prometheus URL of the prometheus.",
                    "maxLength": 500
                  },
                  "selectedPrometheusBoardsConfigs": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "board": {
                          "type": "object",
                          "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
                        },
                        "panels": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
                          },
                          "description": "Panels selected for the Grafana board configuration."
                        },
                        "templateVars": {
                          "type": "array",
                          "items": {
                            "type": "string"
                          },
                          "description": "Template variables applied to the selected Grafana board configuration."
                        }
                      }
                    },
                    "description": "The selected prometheus boards configs of the prometheus."
                  }
                }
              },
              "loadTestPrefs": {
                "x-go-type": "LoadTestPreferences",
                "type": "object",
                "properties": {
                  "c": {
                    "type": "integer",
                    "description": "Concurrent requests",
                    "minimum": 0
                  },
                  "qps": {
                    "type": "integer",
                    "description": "Queries per second",
                    "minimum": 0
                  },
                  "t": {
                    "type": "string",
                    "description": "Duration",
                    "maxLength": 500
                  },
                  "gen": {
                    "type": "string",
                    "description": "Load generator",
                    "maxLength": 500
                  }
                }
              },
              "anonymousUsageStats": {
                "type": "boolean",
                "description": "The anonymous usage stats of the preference."
              },
              "anonymousPerfResults": {
                "type": "boolean",
                "description": "The anonymous perf results of the preference."
              },
              "updatedAt": {
                "type": "string",
                "format": "date-time",
                "description": "Timestamp of when the resource was last updated."
              },
              "dashboardPreferences": {
                "type": "object",
                "additionalProperties": true,
                "description": "The dashboard preferences of the preference."
              },
              "selectedOrganizationId": {
                "type": "string",
                "description": "ID of the associated selectedOrganization.",
                "maxLength": 500,
                "format": "uuid",
                "x-go-type": "core.Uuid",
                "x-go-type-import": {
                  "path": "github.com/meshery/schemas/models/core",
                  "name": "core"
                }
              },
              "selectedWorkspaceForOrganizations": {
                "type": "object",
                "additionalProperties": {
                  "type": "string"
                },
                "description": "The selected workspace for organizations of the preference."
              },
              "usersExtensionPreferences": {
                "type": "object",
                "additionalProperties": true,
                "description": "The users extension preferences of the preference."
              },
              "remoteProviderPreferences": {
                "type": "object",
                "additionalProperties": true,
                "description": "The remote provider preferences of the preference."
              }
            }
          },
          "acceptedTermsAt": {
            "description": "Timestamp when the user accepted terms and conditions",
            "x-oapi-codegen-extra-tags": {
              "db": "accepted_terms_at",
              "json": "acceptedTermsAt"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "firstLoginTime": {
            "description": "Timestamp of the user's first login",
            "x-oapi-codegen-extra-tags": {
              "db": "first_login_time",
              "json": "firstLoginTime"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "lastLoginTime": {
            "description": "Timestamp of the user's most recent login",
            "x-oapi-codegen-extra-tags": {
              "db": "last_login_time",
              "json": "lastLoginTime"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "createdAt": {
            "description": "Timestamp when the user record was created",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at",
              "json": "createdAt"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp when the user record was last updated",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at",
              "json": "updatedAt"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "socials": {
            "type": "array",
            "description": "Various online profiles associated with the user's account",
            "x-go-type": "UserSocials",
            "items": {
              "x-go-type": "Social",
              "description": "Various online profiles associated with the user account, like GitHub, LinkedIn, X, and so on.",
              "type": "object",
              "properties": {
                "site": {
                  "type": "string",
                  "maxLength": 50,
                  "description": "The site of the social."
                },
                "link": {
                  "type": "string",
                  "format": "uri",
                  "description": "The link of the social."
                }
              },
              "required": [
                "site",
                "link"
              ]
            },
            "x-oapi-codegen-extra-tags": {
              "db": "socials",
              "json": "socials"
            }
          },
          "deletedAt": {
            "type": "string",
            "format": "date-time",
            "nullable": true,
            "description": "Timestamp when the user record was soft-deleted (null if not deleted)",
            "x-go-type": "core.NullTime",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at",
              "json": "deletedAt"
            }
          }
        }
      },
      "UserProfile": {
        "type": "object",
        "additionalProperties": false,
        "description": "Authenticated user profile with role, team, organization, and linked account context.",
        "required": [
          "roleNames",
          "linkedAccounts"
        ],
        "properties": {
          "user": {
            "$id": "https://schemas.meshery.io/user.yaml",
            "$schema": "http://json-schema.org/draft-07/schema#",
            "type": "object",
            "description": "Represents a user in Layer5 Cloud (Meshery)",
            "additionalProperties": false,
            "required": [
              "id",
              "userId",
              "provider",
              "email",
              "firstName",
              "lastName",
              "status",
              "acceptedTermsAt",
              "firstLoginTime",
              "lastLoginTime",
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
                }
              },
              "userId": {
                "type": "string",
                "maxLength": 200,
                "description": "User's identifier (username or external ID)",
                "x-oapi-codegen-extra-tags": {
                  "db": "user_id",
                  "json": "userId"
                },
                "x-id-format": "external"
              },
              "provider": {
                "type": "string",
                "maxLength": 100,
                "description": "User's authentication provider (e.g., Layer5, Twitter, Facebook, GitHub)",
                "example": "Layer5",
                "x-oapi-codegen-extra-tags": {
                  "db": "provider",
                  "json": "provider"
                }
              },
              "email": {
                "type": "string",
                "format": "email",
                "maxLength": 300,
                "description": "User's email address",
                "x-oapi-codegen-extra-tags": {
                  "db": "email",
                  "json": "email"
                }
              },
              "firstName": {
                "type": "string",
                "maxLength": 200,
                "description": "User's first name",
                "x-oapi-codegen-extra-tags": {
                  "db": "first_name",
                  "json": "firstName"
                }
              },
              "lastName": {
                "type": "string",
                "maxLength": 300,
                "description": "User's last name",
                "x-oapi-codegen-extra-tags": {
                  "db": "last_name",
                  "json": "lastName"
                }
              },
              "avatarUrl": {
                "type": "string",
                "format": "uri",
                "maxLength": 500,
                "description": "URL to the user's avatar image",
                "x-oapi-codegen-extra-tags": {
                  "db": "avatar_url",
                  "json": "avatarUrl"
                }
              },
              "status": {
                "type": "string",
                "maxLength": 100,
                "enum": [
                  "active",
                  "inactive",
                  "pending",
                  "anonymous"
                ],
                "description": "User's account status",
                "x-oapi-codegen-extra-tags": {
                  "db": "status",
                  "json": "status"
                }
              },
              "bio": {
                "type": "string",
                "maxLength": 1000,
                "default": "",
                "description": "User's biography or description",
                "x-oapi-codegen-extra-tags": {
                  "db": "bio",
                  "json": "bio"
                }
              },
              "country": {
                "type": "object",
                "description": "User's country information stored as JSONB",
                "additionalProperties": true,
                "x-go-type": "core.Map",
                "x-go-type-import": {
                  "path": "github.com/meshery/schemas/models/core",
                  "name": "core"
                },
                "x-go-type-skip-optional-pointer": true,
                "x-oapi-codegen-extra-tags": {
                  "db": "country",
                  "json": "country"
                }
              },
              "region": {
                "type": "object",
                "description": "User's region information stored as JSONB",
                "additionalProperties": true,
                "x-go-type": "core.Map",
                "x-go-type-import": {
                  "path": "github.com/meshery/schemas/models/core",
                  "name": "core"
                },
                "x-go-type-skip-optional-pointer": true,
                "x-oapi-codegen-extra-tags": {
                  "db": "region",
                  "json": "region"
                }
              },
              "preferences": {
                "x-go-type": "Preference",
                "description": "User's preferences stored as JSONB",
                "x-oapi-codegen-extra-tags": {
                  "db": "preferences",
                  "json": "preferences"
                },
                "x-generate-db-helpers": true,
                "type": "object",
                "required": [
                  "anonymousUsageStats",
                  "anonymousPerfResults",
                  "updatedAt",
                  "dashboardPreferences",
                  "selectedOrganizationId",
                  "selectedWorkspaceForOrganizations",
                  "usersExtensionPreferences",
                  "remoteProviderPreferences"
                ],
                "properties": {
                  "meshAdapters": {
                    "type": "array",
                    "items": {
                      "x-go-type": "Adapter",
                      "type": "object",
                      "additionalProperties": false,
                      "description": "Meshery adapter configuration stored in user preferences.",
                      "required": [
                        "adapterLocation",
                        "name",
                        "version",
                        "gitCommitSha",
                        "ops"
                      ],
                      "properties": {
                        "adapterLocation": {
                          "type": "string",
                          "description": "Network location used to reach the adapter.",
                          "minLength": 1,
                          "maxLength": 500
                        },
                        "name": {
                          "type": "string",
                          "description": "Adapter name.",
                          "minLength": 1,
                          "maxLength": 255
                        },
                        "version": {
                          "type": "string",
                          "description": "Adapter version.",
                          "maxLength": 100
                        },
                        "gitCommitSha": {
                          "type": "string",
                          "description": "Git commit SHA for the adapter build.",
                          "maxLength": 64
                        },
                        "ops": {
                          "type": "array",
                          "description": "Operations supported by the adapter.",
                          "items": {
                            "type": "object",
                            "additionalProperties": false,
                            "description": "Operation supported by a Meshery adapter.",
                            "required": [
                              "key",
                              "value",
                              "category"
                            ],
                            "properties": {
                              "key": {
                                "type": "string",
                                "description": "Stable operation key.",
                                "minLength": 1,
                                "maxLength": 255
                              },
                              "value": {
                                "type": "string",
                                "description": "Human-readable operation value.",
                                "minLength": 1,
                                "maxLength": 255
                              },
                              "category": {
                                "type": "integer",
                                "description": "Protobuf OpCategory wire value. Integer values intentionally mirror meshops.proto instead of using lowercase string enum literals.",
                                "minimum": 0,
                                "maximum": 4,
                                "enum": [
                                  0,
                                  1,
                                  2,
                                  3,
                                  4
                                ]
                              }
                            }
                          }
                        }
                      }
                    },
                    "description": "The mesh adapters of the preference."
                  },
                  "grafana": {
                    "x-go-type": "Grafana",
                    "type": "object",
                    "properties": {
                      "grafanaUrl": {
                        "type": "string",
                        "description": "Grafana URL for the user configuration.",
                        "maxLength": 500
                      },
                      "grafanaApiKey": {
                        "type": "string",
                        "description": "Grafana API key for the user configuration.",
                        "maxLength": 500
                      },
                      "selectedBoardsConfigs": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "board": {
                              "type": "object",
                              "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
                            },
                            "panels": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
                              },
                              "description": "Panels selected for the Grafana board configuration."
                            },
                            "templateVars": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              },
                              "description": "Template variables applied to the selected Grafana board configuration."
                            }
                          }
                        },
                        "description": "Selected Grafana board configurations for the user."
                      }
                    }
                  },
                  "prometheus": {
                    "x-go-type": "Prometheus",
                    "type": "object",
                    "properties": {
                      "prometheusUrl": {
                        "type": "string",
                        "description": "The prometheus URL of the prometheus.",
                        "maxLength": 500
                      },
                      "selectedPrometheusBoardsConfigs": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "board": {
                              "type": "object",
                              "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
                            },
                            "panels": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
                              },
                              "description": "Panels selected for the Grafana board configuration."
                            },
                            "templateVars": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              },
                              "description": "Template variables applied to the selected Grafana board configuration."
                            }
                          }
                        },
                        "description": "The selected prometheus boards configs of the prometheus."
                      }
                    }
                  },
                  "loadTestPrefs": {
                    "x-go-type": "LoadTestPreferences",
                    "type": "object",
                    "properties": {
                      "c": {
                        "type": "integer",
                        "description": "Concurrent requests",
                        "minimum": 0
                      },
                      "qps": {
                        "type": "integer",
                        "description": "Queries per second",
                        "minimum": 0
                      },
                      "t": {
                        "type": "string",
                        "description": "Duration",
                        "maxLength": 500
                      },
                      "gen": {
                        "type": "string",
                        "description": "Load generator",
                        "maxLength": 500
                      }
                    }
                  },
                  "anonymousUsageStats": {
                    "type": "boolean",
                    "description": "The anonymous usage stats of the preference."
                  },
                  "anonymousPerfResults": {
                    "type": "boolean",
                    "description": "The anonymous perf results of the preference."
                  },
                  "updatedAt": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Timestamp of when the resource was last updated."
                  },
                  "dashboardPreferences": {
                    "type": "object",
                    "additionalProperties": true,
                    "description": "The dashboard preferences of the preference."
                  },
                  "selectedOrganizationId": {
                    "type": "string",
                    "description": "ID of the associated selectedOrganization.",
                    "maxLength": 500,
                    "format": "uuid",
                    "x-go-type": "core.Uuid",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    }
                  },
                  "selectedWorkspaceForOrganizations": {
                    "type": "object",
                    "additionalProperties": {
                      "type": "string"
                    },
                    "description": "The selected workspace for organizations of the preference."
                  },
                  "usersExtensionPreferences": {
                    "type": "object",
                    "additionalProperties": true,
                    "description": "The users extension preferences of the preference."
                  },
                  "remoteProviderPreferences": {
                    "type": "object",
                    "additionalProperties": true,
                    "description": "The remote provider preferences of the preference."
                  }
                }
              },
              "acceptedTermsAt": {
                "description": "Timestamp when the user accepted terms and conditions",
                "x-oapi-codegen-extra-tags": {
                  "db": "accepted_terms_at",
                  "json": "acceptedTermsAt"
                },
                "type": "string",
                "format": "date-time",
                "x-go-type-skip-optional-pointer": true
              },
              "firstLoginTime": {
                "description": "Timestamp of the user's first login",
                "x-oapi-codegen-extra-tags": {
                  "db": "first_login_time",
                  "json": "firstLoginTime"
                },
                "type": "string",
                "format": "date-time",
                "x-go-type-skip-optional-pointer": true
              },
              "lastLoginTime": {
                "description": "Timestamp of the user's most recent login",
                "x-oapi-codegen-extra-tags": {
                  "db": "last_login_time",
                  "json": "lastLoginTime"
                },
                "type": "string",
                "format": "date-time",
                "x-go-type-skip-optional-pointer": true
              },
              "createdAt": {
                "description": "Timestamp when the user record was created",
                "x-oapi-codegen-extra-tags": {
                  "db": "created_at",
                  "json": "createdAt"
                },
                "type": "string",
                "format": "date-time",
                "x-go-type-skip-optional-pointer": true
              },
              "updatedAt": {
                "description": "Timestamp when the user record was last updated",
                "x-oapi-codegen-extra-tags": {
                  "db": "updated_at",
                  "json": "updatedAt"
                },
                "type": "string",
                "format": "date-time",
                "x-go-type-skip-optional-pointer": true
              },
              "socials": {
                "type": "array",
                "description": "Various online profiles associated with the user's account",
                "x-go-type": "UserSocials",
                "items": {
                  "x-go-type": "Social",
                  "description": "Various online profiles associated with the user account, like GitHub, LinkedIn, X, and so on.",
                  "type": "object",
                  "properties": {
                    "site": {
                      "type": "string",
                      "maxLength": 50,
                      "description": "The site of the social."
                    },
                    "link": {
                      "type": "string",
                      "format": "uri",
                      "description": "The link of the social."
                    }
                  },
                  "required": [
                    "site",
                    "link"
                  ]
                },
                "x-oapi-codegen-extra-tags": {
                  "db": "socials",
                  "json": "socials"
                }
              },
              "deletedAt": {
                "type": "string",
                "format": "date-time",
                "nullable": true,
                "description": "Timestamp when the user record was soft-deleted (null if not deleted)",
                "x-go-type": "core.NullTime",
                "x-go-type-import": {
                  "path": "github.com/meshery/schemas/models/core",
                  "name": "core"
                },
                "x-oapi-codegen-extra-tags": {
                  "db": "deleted_at",
                  "json": "deletedAt"
                }
              }
            }
          },
          "roleNames": {
            "type": "array",
            "description": "Names of roles assigned to the user.",
            "items": {
              "type": "string",
              "maxLength": 100
            }
          },
          "teams": {
            "description": "Teams the user belongs to with their assigned role information.",
            "type": "object",
            "additionalProperties": false,
            "required": [
              "teamsWithRoles",
              "totalCount"
            ],
            "properties": {
              "teamsWithRoles": {
                "type": "array",
                "description": "Team memberships with the user's assigned roles.",
                "items": {
                  "type": "object",
                  "description": "Team membership record with role information.",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "name",
                    "description",
                    "owner",
                    "metadata",
                    "createdAt",
                    "updatedAt",
                    "deletedAt",
                    "roleNames"
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
                      }
                    },
                    "name": {
                      "type": "string",
                      "description": "Team name.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      }
                    },
                    "description": {
                      "type": "string",
                      "description": "Team description.",
                      "maxLength": 1024,
                      "x-oapi-codegen-extra-tags": {
                        "db": "description"
                      }
                    },
                    "owner": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner"
                      }
                    },
                    "metadata": {
                      "type": "object",
                      "description": "Team metadata stored with the membership row.",
                      "additionalProperties": true,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata"
                      }
                    },
                    "createdAt": {
                      "description": "Timestamp when the team was created.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "createdAt"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp when the team was last updated.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updatedAt"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "description": "Timestamp when the team was soft-deleted, if applicable.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deletedAt"
                      },
                      "x-go-type": "meshcore.NullTime",
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "roleNames": {
                      "type": "array",
                      "description": "Names of roles assigned to the user in this team.",
                      "items": {
                        "type": "string",
                        "maxLength": 100
                      },
                      "x-go-type": "pq.StringArray",
                      "x-go-type-import": {
                        "path": "github.com/lib/pq",
                        "name": "pq"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "role_names"
                      }
                    }
                  }
                }
              },
              "totalCount": {
                "type": "integer",
                "description": "Total number of team memberships returned for the user.",
                "minimum": 0
              }
            }
          },
          "organizations": {
            "description": "Organizations the user belongs to with their assigned role information.",
            "type": "object",
            "additionalProperties": false,
            "required": [
              "organizationsWithRoles",
              "totalCount"
            ],
            "properties": {
              "organizationsWithRoles": {
                "type": "array",
                "description": "Organization memberships with the user's assigned roles.",
                "items": {
                  "type": "object",
                  "description": "Organization membership record with role information.",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "name",
                    "description",
                    "country",
                    "region",
                    "owner",
                    "metadata",
                    "createdAt",
                    "updatedAt",
                    "deletedAt",
                    "roleNames"
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
                      }
                    },
                    "name": {
                      "type": "string",
                      "description": "Organization name.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      }
                    },
                    "description": {
                      "type": "string",
                      "description": "Organization description.",
                      "maxLength": 1024,
                      "x-oapi-codegen-extra-tags": {
                        "db": "description"
                      }
                    },
                    "country": {
                      "type": "string",
                      "description": "Organization country.",
                      "maxLength": 200,
                      "x-oapi-codegen-extra-tags": {
                        "db": "country"
                      }
                    },
                    "region": {
                      "type": "string",
                      "description": "Organization region.",
                      "maxLength": 200,
                      "x-oapi-codegen-extra-tags": {
                        "db": "region"
                      }
                    },
                    "owner": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner"
                      }
                    },
                    "metadata": {
                      "type": "object",
                      "description": "Organization metadata stored with the membership row.",
                      "additionalProperties": true,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata"
                      }
                    },
                    "createdAt": {
                      "description": "Timestamp when the organization was created.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "createdAt"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp when the organization was last updated.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updatedAt"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "description": "Timestamp when the organization was soft-deleted, if applicable.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deletedAt"
                      },
                      "x-go-type": "meshcore.NullTime",
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "roleNames": {
                      "type": "array",
                      "description": "Names of roles assigned to the user in this organization.",
                      "items": {
                        "type": "string",
                        "maxLength": 100
                      },
                      "x-go-type": "pq.StringArray",
                      "x-go-type-import": {
                        "path": "github.com/lib/pq",
                        "name": "pq"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "role_names"
                      }
                    }
                  }
                }
              },
              "totalCount": {
                "type": "integer",
                "description": "Total number of organization memberships returned for the user.",
                "minimum": 0
              }
            }
          },
          "linkedAccounts": {
            "type": "array",
            "description": "Linked social account providers for the current user.",
            "items": {
              "type": "string",
              "maxLength": 100
            }
          }
        }
      },
      "UserPublicProfile": {
        "type": "object",
        "additionalProperties": false,
        "description": "Public user profile fields safe to return without authentication.",
        "required": [
          "id",
          "userId",
          "firstName",
          "lastName",
          "status"
        ],
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "userId": {
            "type": "string",
            "maxLength": 200,
            "description": "User's public identifier.",
            "x-id-format": "external"
          },
          "firstName": {
            "type": "string",
            "maxLength": 200,
            "description": "User's first name."
          },
          "lastName": {
            "type": "string",
            "maxLength": 300,
            "description": "User's last name."
          },
          "avatarUrl": {
            "type": "string",
            "format": "uri",
            "maxLength": 500,
            "description": "URL to the user's avatar image."
          },
          "bio": {
            "type": "string",
            "maxLength": 1000,
            "description": "User's biography or description."
          },
          "status": {
            "type": "string",
            "maxLength": 100,
            "enum": [
              "active",
              "inactive",
              "pending",
              "anonymous"
            ],
            "description": "User's account status."
          },
          "socials": {
            "type": "array",
            "description": "Public online profiles associated with the user's account.",
            "items": {
              "description": "Various online profiles associated with the user account, like GitHub, LinkedIn, X, and so on.",
              "type": "object",
              "properties": {
                "site": {
                  "type": "string",
                  "maxLength": 50,
                  "description": "The site of the social."
                },
                "link": {
                  "type": "string",
                  "format": "uri",
                  "description": "The link of the social."
                }
              },
              "required": [
                "site",
                "link"
              ]
            }
          }
        }
      },
      "TeamsWithCount": {
        "type": "object",
        "additionalProperties": false,
        "description": "Team memberships with the total membership count.",
        "required": [
          "teamsWithRoles",
          "totalCount"
        ],
        "properties": {
          "teamsWithRoles": {
            "type": "array",
            "description": "Team memberships with the user's assigned roles.",
            "items": {
              "type": "object",
              "description": "Team membership record with role information.",
              "additionalProperties": false,
              "required": [
                "id",
                "name",
                "description",
                "owner",
                "metadata",
                "createdAt",
                "updatedAt",
                "deletedAt",
                "roleNames"
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
                  }
                },
                "name": {
                  "type": "string",
                  "description": "Team name.",
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "name"
                  }
                },
                "description": {
                  "type": "string",
                  "description": "Team description.",
                  "maxLength": 1024,
                  "x-oapi-codegen-extra-tags": {
                    "db": "description"
                  }
                },
                "owner": {
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "owner"
                  }
                },
                "metadata": {
                  "type": "object",
                  "description": "Team metadata stored with the membership row.",
                  "additionalProperties": true,
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "metadata"
                  }
                },
                "createdAt": {
                  "description": "Timestamp when the team was created.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at",
                    "json": "createdAt"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updatedAt": {
                  "description": "Timestamp when the team was last updated.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at",
                    "json": "updatedAt"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "deletedAt": {
                  "description": "Timestamp when the team was soft-deleted, if applicable.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "deleted_at",
                    "json": "deletedAt"
                  },
                  "x-go-type": "meshcore.NullTime",
                  "x-go-type-import": {
                    "name": "meshcore",
                    "path": "github.com/meshery/schemas/models/core"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "roleNames": {
                  "type": "array",
                  "description": "Names of roles assigned to the user in this team.",
                  "items": {
                    "type": "string",
                    "maxLength": 100
                  },
                  "x-go-type": "pq.StringArray",
                  "x-go-type-import": {
                    "path": "github.com/lib/pq",
                    "name": "pq"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "role_names"
                  }
                }
              }
            }
          },
          "totalCount": {
            "type": "integer",
            "description": "Total number of team memberships returned for the user.",
            "minimum": 0
          }
        }
      },
      "OrganizationsWithCount": {
        "type": "object",
        "additionalProperties": false,
        "description": "Organization memberships with the total membership count.",
        "required": [
          "organizationsWithRoles",
          "totalCount"
        ],
        "properties": {
          "organizationsWithRoles": {
            "type": "array",
            "description": "Organization memberships with the user's assigned roles.",
            "items": {
              "type": "object",
              "description": "Organization membership record with role information.",
              "additionalProperties": false,
              "required": [
                "id",
                "name",
                "description",
                "country",
                "region",
                "owner",
                "metadata",
                "createdAt",
                "updatedAt",
                "deletedAt",
                "roleNames"
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
                  }
                },
                "name": {
                  "type": "string",
                  "description": "Organization name.",
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "name"
                  }
                },
                "description": {
                  "type": "string",
                  "description": "Organization description.",
                  "maxLength": 1024,
                  "x-oapi-codegen-extra-tags": {
                    "db": "description"
                  }
                },
                "country": {
                  "type": "string",
                  "description": "Organization country.",
                  "maxLength": 200,
                  "x-oapi-codegen-extra-tags": {
                    "db": "country"
                  }
                },
                "region": {
                  "type": "string",
                  "description": "Organization region.",
                  "maxLength": 200,
                  "x-oapi-codegen-extra-tags": {
                    "db": "region"
                  }
                },
                "owner": {
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "owner"
                  }
                },
                "metadata": {
                  "type": "object",
                  "description": "Organization metadata stored with the membership row.",
                  "additionalProperties": true,
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "metadata"
                  }
                },
                "createdAt": {
                  "description": "Timestamp when the organization was created.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at",
                    "json": "createdAt"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updatedAt": {
                  "description": "Timestamp when the organization was last updated.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at",
                    "json": "updatedAt"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "deletedAt": {
                  "description": "Timestamp when the organization was soft-deleted, if applicable.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "deleted_at",
                    "json": "deletedAt"
                  },
                  "x-go-type": "meshcore.NullTime",
                  "x-go-type-import": {
                    "name": "meshcore",
                    "path": "github.com/meshery/schemas/models/core"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "roleNames": {
                  "type": "array",
                  "description": "Names of roles assigned to the user in this organization.",
                  "items": {
                    "type": "string",
                    "maxLength": 100
                  },
                  "x-go-type": "pq.StringArray",
                  "x-go-type-import": {
                    "path": "github.com/lib/pq",
                    "name": "pq"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "role_names"
                  }
                }
              }
            }
          },
          "totalCount": {
            "type": "integer",
            "description": "Total number of organization memberships returned for the user.",
            "minimum": 0
          }
        }
      },
      "TeamWithUserRoles": {
        "type": "object",
        "description": "Team membership record with role information.",
        "additionalProperties": false,
        "required": [
          "id",
          "name",
          "description",
          "owner",
          "metadata",
          "createdAt",
          "updatedAt",
          "deletedAt",
          "roleNames"
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
            }
          },
          "name": {
            "type": "string",
            "description": "Team name.",
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "name"
            }
          },
          "description": {
            "type": "string",
            "description": "Team description.",
            "maxLength": 1024,
            "x-oapi-codegen-extra-tags": {
              "db": "description"
            }
          },
          "owner": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "owner"
            }
          },
          "metadata": {
            "type": "object",
            "description": "Team metadata stored with the membership row.",
            "additionalProperties": true,
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "metadata"
            }
          },
          "createdAt": {
            "description": "Timestamp when the team was created.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at",
              "json": "createdAt"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp when the team was last updated.",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at",
              "json": "updatedAt"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deletedAt": {
            "description": "Timestamp when the team was soft-deleted, if applicable.",
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at",
              "json": "deletedAt"
            },
            "x-go-type": "meshcore.NullTime",
            "x-go-type-import": {
              "name": "meshcore",
              "path": "github.com/meshery/schemas/models/core"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "roleNames": {
            "type": "array",
            "description": "Names of roles assigned to the user in this team.",
            "items": {
              "type": "string",
              "maxLength": 100
            },
            "x-go-type": "pq.StringArray",
            "x-go-type-import": {
              "path": "github.com/lib/pq",
              "name": "pq"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "role_names"
            }
          }
        }
      },
      "OrganizationWithUserRoles": {
        "type": "object",
        "description": "Organization membership record with role information.",
        "additionalProperties": false,
        "required": [
          "id",
          "name",
          "description",
          "country",
          "region",
          "owner",
          "metadata",
          "createdAt",
          "updatedAt",
          "deletedAt",
          "roleNames"
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
            }
          },
          "name": {
            "type": "string",
            "description": "Organization name.",
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "name"
            }
          },
          "description": {
            "type": "string",
            "description": "Organization description.",
            "maxLength": 1024,
            "x-oapi-codegen-extra-tags": {
              "db": "description"
            }
          },
          "country": {
            "type": "string",
            "description": "Organization country.",
            "maxLength": 200,
            "x-oapi-codegen-extra-tags": {
              "db": "country"
            }
          },
          "region": {
            "type": "string",
            "description": "Organization region.",
            "maxLength": 200,
            "x-oapi-codegen-extra-tags": {
              "db": "region"
            }
          },
          "owner": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "owner"
            }
          },
          "metadata": {
            "type": "object",
            "description": "Organization metadata stored with the membership row.",
            "additionalProperties": true,
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "metadata"
            }
          },
          "createdAt": {
            "description": "Timestamp when the organization was created.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at",
              "json": "createdAt"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp when the organization was last updated.",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at",
              "json": "updatedAt"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deletedAt": {
            "description": "Timestamp when the organization was soft-deleted, if applicable.",
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at",
              "json": "deletedAt"
            },
            "x-go-type": "meshcore.NullTime",
            "x-go-type-import": {
              "name": "meshcore",
              "path": "github.com/meshery/schemas/models/core"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "roleNames": {
            "type": "array",
            "description": "Names of roles assigned to the user in this organization.",
            "items": {
              "type": "string",
              "maxLength": 100
            },
            "x-go-type": "pq.StringArray",
            "x-go-type-import": {
              "path": "github.com/lib/pq",
              "name": "pq"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "role_names"
            }
          }
        }
      },
      "UserPayload": {
        "type": "object",
        "description": "Payload for creating or updating a user profile.",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "json": "id,omitempty"
            }
          },
          "email": {
            "type": "string",
            "format": "email",
            "maxLength": 300,
            "description": "User's email address."
          },
          "firstName": {
            "type": "string",
            "maxLength": 200,
            "description": "User's first name."
          },
          "lastName": {
            "type": "string",
            "maxLength": 300,
            "description": "User's last name."
          },
          "avatarUrl": {
            "type": "string",
            "format": "uri",
            "maxLength": 500,
            "description": "URL to the user's avatar image."
          },
          "bio": {
            "type": "string",
            "maxLength": 1000,
            "description": "User's biography or description."
          },
          "country": {
            "type": "object",
            "additionalProperties": true,
            "description": "User's country information."
          },
          "region": {
            "type": "object",
            "additionalProperties": true,
            "description": "User's region information."
          },
          "socials": {
            "type": "array",
            "description": "Online profiles associated with the user's account.",
            "items": {
              "description": "Various online profiles associated with the user account, like GitHub, LinkedIn, X, and so on.",
              "type": "object",
              "properties": {
                "site": {
                  "type": "string",
                  "maxLength": 50,
                  "description": "The site of the social."
                },
                "link": {
                  "type": "string",
                  "format": "uri",
                  "description": "The link of the social."
                }
              },
              "required": [
                "site",
                "link"
              ]
            }
          }
        }
      },
      "BulkUserDeletePayload": {
        "type": "object",
        "description": "Payload for deleting multiple users from an organization. User IDs and email addresses are both required and must be index-aligned so audit and response messages can identify each deleted user.",
        "required": [
          "userIds",
          "userEmails"
        ],
        "properties": {
          "userIds": {
            "type": "array",
            "description": "User IDs to delete.",
            "minItems": 1,
            "items": {
              "type": "string",
              "format": "uuid",
              "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              }
            }
          },
          "userEmails": {
            "type": "array",
            "description": "Email addresses for the users to delete.",
            "minItems": 1,
            "items": {
              "type": "string",
              "format": "email",
              "description": "email",
              "x-go-type-skip-optional-pointer": true
            }
          }
        }
      },
      "ProfileDetails": {
        "type": "object",
        "description": "Profile details for the authenticated user, including counts of associated resources.",
        "additionalProperties": false,
        "required": [
          "k8sCount",
          "patternCount"
        ],
        "properties": {
          "k8sCount": {
            "type": "integer",
            "description": "Number of Kubernetes contexts registered by the user.",
            "minimum": 0
          },
          "patternCount": {
            "type": "integer",
            "description": "Number of designs owned by the user.",
            "minimum": 0
          }
        }
      },
      "UserProvider": {
        "type": "array",
        "description": "List of external identity providers linked to the authenticated user's account.",
        "items": {
          "type": "string",
          "description": "Provider name (e.g., GitHub, Google).",
          "maxLength": 100
        }
      },
      "NotificationPreference": {
        "type": "object",
        "description": "A notification preference option.",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "name": {
            "type": "string",
            "description": "Notification preference name.",
            "maxLength": 200
          },
          "description": {
            "type": "string",
            "description": "Notification preference description.",
            "maxLength": 1000
          },
          "category": {
            "type": "string",
            "description": "Notification preference category.",
            "maxLength": 200
          },
          "subcategory": {
            "type": "string",
            "description": "Notification preference subcategory.",
            "maxLength": 200
          },
          "label": {
            "type": "string",
            "description": "Notification preference label.",
            "maxLength": 200
          },
          "createdAt": {
            "description": "Timestamp when the notification preference was created.",
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp when the notification preference was last updated.",
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "AvailableNotificationPreferences": {
        "type": "object",
        "description": "Available notification preferences.",
        "properties": {
          "notificationPreferences": {
            "type": "object",
            "description": "Notification preferences keyed by preference identifier.",
            "additionalProperties": {
              "type": "object",
              "description": "A notification preference option.",
              "properties": {
                "id": {
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "name": {
                  "type": "string",
                  "description": "Notification preference name.",
                  "maxLength": 200
                },
                "description": {
                  "type": "string",
                  "description": "Notification preference description.",
                  "maxLength": 1000
                },
                "category": {
                  "type": "string",
                  "description": "Notification preference category.",
                  "maxLength": 200
                },
                "subcategory": {
                  "type": "string",
                  "description": "Notification preference subcategory.",
                  "maxLength": 200
                },
                "label": {
                  "type": "string",
                  "description": "Notification preference label.",
                  "maxLength": 200
                },
                "createdAt": {
                  "description": "Timestamp when the notification preference was created.",
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updatedAt": {
                  "description": "Timestamp when the notification preference was last updated.",
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                }
              }
            }
          },
          "totalCount": {
            "type": "integer",
            "description": "Total number of notification preferences.",
            "minimum": 0
          }
        }
      },
      "NotificationPreferencePayload": {
        "type": "object",
        "description": "Payload for updating notification preferences.",
        "properties": {
          "notificationPreferences": {
            "type": "array",
            "description": "Notification preference labels to enable.",
            "items": {
              "type": "string",
              "maxLength": 200
            }
          },
          "userId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          }
        }
      },
      "Message": {
        "type": "object",
        "description": "Comment notification message.",
        "properties": {
          "firstName": {
            "type": "string",
            "description": "Sender first name.",
            "maxLength": 200
          },
          "lastName": {
            "type": "string",
            "description": "Sender last name.",
            "maxLength": 300
          },
          "avatarUrl": {
            "type": "string",
            "description": "Sender avatar URL.",
            "format": "uri",
            "maxLength": 500
          },
          "message": {
            "type": "string",
            "description": "Comment message text.",
            "maxLength": 5000
          },
          "timestamp": {
            "description": "Timestamp when the message was created.",
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "userId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          }
        }
      },
      "MentionNotificationPayload": {
        "type": "object",
        "description": "Payload for sending comment mention notifications.",
        "required": [
          "mentionUsers",
          "participants",
          "designId",
          "usersOptedOutOfNotifications",
          "messages"
        ],
        "properties": {
          "mentionUsers": {
            "type": "array",
            "description": "Users mentioned in the comment.",
            "items": {
              "type": "string",
              "format": "uuid",
              "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              }
            }
          },
          "participants": {
            "type": "array",
            "description": "Users participating in the comment thread.",
            "items": {
              "type": "string",
              "format": "uuid",
              "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              }
            }
          },
          "designId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "usersOptedOutOfNotifications": {
            "type": "array",
            "description": "Users excluded from comment notifications.",
            "items": {
              "type": "string",
              "format": "uuid",
              "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              }
            }
          },
          "messages": {
            "type": "array",
            "description": "Messages in the comment thread.",
            "items": {
              "type": "object",
              "description": "Comment notification message.",
              "properties": {
                "firstName": {
                  "type": "string",
                  "description": "Sender first name.",
                  "maxLength": 200
                },
                "lastName": {
                  "type": "string",
                  "description": "Sender last name.",
                  "maxLength": 300
                },
                "avatarUrl": {
                  "type": "string",
                  "description": "Sender avatar URL.",
                  "format": "uri",
                  "maxLength": 500
                },
                "message": {
                  "type": "string",
                  "description": "Comment message text.",
                  "maxLength": 5000
                },
                "timestamp": {
                  "description": "Timestamp when the message was created.",
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "userId": {
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                }
              }
            }
          }
        }
      },
      "UserFeedbackPayload": {
        "type": "object",
        "description": "Payload for submitting user feedback.",
        "required": [
          "message",
          "scope",
          "pageLocation"
        ],
        "properties": {
          "message": {
            "type": "string",
            "description": "Feedback message.",
            "minLength": 1,
            "maxLength": 5000
          },
          "scope": {
            "type": "string",
            "description": "Product area or workflow for the feedback.",
            "minLength": 1,
            "maxLength": 200
          },
          "pageLocation": {
            "type": "string",
            "description": "Page location where the feedback was submitted.",
            "minLength": 1,
            "maxLength": 1000
          },
          "metadata": {
            "type": "object",
            "description": "Additional feedback metadata.",
            "additionalProperties": true
          }
        }
      },
      "PasswordUpdatePayload": {
        "type": "object",
        "description": "Payload for updating a user password.",
        "additionalProperties": false,
        "required": [
          "currentPassword",
          "password"
        ],
        "properties": {
          "currentPassword": {
            "type": "string",
            "description": "Current password for verification before update.",
            "minLength": 1,
            "maxLength": 200
          },
          "password": {
            "type": "string",
            "description": "New password for the user account.",
            "minLength": 8,
            "maxLength": 200
          }
        }
      },
      "AnonymousFlowResponse": {
        "type": "object",
        "description": "Anonymous user identity response.",
        "required": [
          "accessToken",
          "userId"
        ],
        "properties": {
          "accessToken": {
            "type": "string",
            "description": "Access token for the anonymous user.",
            "minLength": 1,
            "maxLength": 4096
          },
          "capability": {
            "type": "object",
            "description": "Capability set for the anonymous user.",
            "additionalProperties": true
          },
          "userId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          }
        }
      },
      "UsersPageForAdmin": {
        "type": "object",
        "description": "Paginated list of users with organization and team role context",
        "required": [
          "page",
          "pageSize",
          "totalCount",
          "data"
        ],
        "properties": {
          "page": {
            "type": "integer",
            "description": "Current page number of the result set.",
            "minimum": 0
          },
          "pageSize": {
            "type": "integer",
            "description": "Number of items per page.",
            "minimum": 1
          },
          "totalCount": {
            "type": "integer",
            "description": "Total number of items available.",
            "minimum": 0
          },
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "additionalProperties": false,
              "description": "User row returned by Cloud identity-management listings. DB tags match the users_with_roles DAO projection aliases.",
              "properties": {
                "userId": {
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "user_id"
                  }
                },
                "username": {
                  "type": "string",
                  "maxLength": 255,
                  "description": "Public username.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "username"
                  }
                },
                "email": {
                  "type": "string",
                  "format": "email",
                  "maxLength": 320,
                  "description": "User email address.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "email"
                  }
                },
                "firstName": {
                  "type": "string",
                  "maxLength": 200,
                  "description": "User's first name.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "first_name"
                  }
                },
                "lastName": {
                  "type": "string",
                  "maxLength": 300,
                  "description": "User's last name.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "last_name"
                  }
                },
                "status": {
                  "type": "string",
                  "maxLength": 100,
                  "description": "User account status."
                },
                "roleNames": {
                  "type": "array",
                  "description": "Names of roles assigned to the user in the listing context.",
                  "items": {
                    "type": "string",
                    "maxLength": 100
                  },
                  "x-go-type": "pq.StringArray",
                  "x-go-type-import": {
                    "path": "github.com/lib/pq",
                    "name": "pq"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "role_names"
                  }
                },
                "createdAt": {
                  "description": "Timestamp when the user was created.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at",
                    "json": "createdAt"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updatedAt": {
                  "description": "Legacy listing timestamp currently scanned from the created_at projection.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at",
                    "json": "updatedAt"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "joinedAt": {
                  "description": "Timestamp when the user joined the filtered team, when listing by team.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "joined_at",
                    "json": "joinedAt"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "lastLoginTime": {
                  "description": "Timestamp when the user last signed in.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "last_login_time",
                    "json": "lastLoginTime"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "deletedAt": {
                  "description": "Timestamp when the user was soft-deleted, if applicable.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "deleted_at",
                    "json": "deletedAt"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type": "sql.NullTime",
                  "x-go-type-import": {
                    "path": "database/sql"
                  },
                  "x-go-type-skip-optional-pointer": true
                },
                "prefs": {
                  "type": "object",
                  "additionalProperties": true,
                  "description": "Legacy role notification preferences attached to listing rows."
                },
                "avatarUrl": {
                  "type": "string",
                  "format": "uri",
                  "maxLength": 2048,
                  "description": "URL of the user's avatar image.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "avatar_url"
                  }
                },
                "preferences": {
                  "type": "object",
                  "additionalProperties": true,
                  "description": "User preference JSON attached to listing rows.",
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "preferences"
                  }
                },
                "organizationWithUserRoles": {
                  "description": "Organization role names derived by Cloud after scanning the user row.",
                  "type": "object",
                  "additionalProperties": false,
                  "properties": {
                    "roleNames": {
                      "type": "array",
                      "description": "Names of roles assigned to the user in the selected organization context.",
                      "items": {
                        "type": "string",
                        "maxLength": 100
                      },
                      "x-go-type": "pq.StringArray",
                      "x-go-type-import": {
                        "path": "github.com/lib/pq",
                        "name": "pq"
                      }
                    }
                  }
                },
                "teamsWithUserRoles": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "description": "Team membership record with role information.",
                    "additionalProperties": false,
                    "required": [
                      "id",
                      "name",
                      "description",
                      "owner",
                      "metadata",
                      "createdAt",
                      "updatedAt",
                      "deletedAt",
                      "roleNames"
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
                        }
                      },
                      "name": {
                        "type": "string",
                        "description": "Team name.",
                        "maxLength": 255,
                        "x-oapi-codegen-extra-tags": {
                          "db": "name"
                        }
                      },
                      "description": {
                        "type": "string",
                        "description": "Team description.",
                        "maxLength": 1024,
                        "x-oapi-codegen-extra-tags": {
                          "db": "description"
                        }
                      },
                      "owner": {
                        "type": "string",
                        "format": "uuid",
                        "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        },
                        "x-oapi-codegen-extra-tags": {
                          "db": "owner"
                        }
                      },
                      "metadata": {
                        "type": "object",
                        "description": "Team metadata stored with the membership row.",
                        "additionalProperties": true,
                        "x-go-type": "core.Map",
                        "x-go-type-import": {
                          "path": "github.com/meshery/schemas/models/core",
                          "name": "core"
                        },
                        "x-go-type-skip-optional-pointer": true,
                        "x-oapi-codegen-extra-tags": {
                          "db": "metadata"
                        }
                      },
                      "createdAt": {
                        "description": "Timestamp when the team was created.",
                        "x-oapi-codegen-extra-tags": {
                          "db": "created_at",
                          "json": "createdAt"
                        },
                        "type": "string",
                        "format": "date-time",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "updatedAt": {
                        "description": "Timestamp when the team was last updated.",
                        "x-oapi-codegen-extra-tags": {
                          "db": "updated_at",
                          "json": "updatedAt"
                        },
                        "type": "string",
                        "format": "date-time",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "deletedAt": {
                        "description": "Timestamp when the team was soft-deleted, if applicable.",
                        "x-oapi-codegen-extra-tags": {
                          "db": "deleted_at",
                          "json": "deletedAt"
                        },
                        "x-go-type": "meshcore.NullTime",
                        "x-go-type-import": {
                          "name": "meshcore",
                          "path": "github.com/meshery/schemas/models/core"
                        },
                        "type": "string",
                        "format": "date-time",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "roleNames": {
                        "type": "array",
                        "description": "Names of roles assigned to the user in this team.",
                        "items": {
                          "type": "string",
                          "maxLength": 100
                        },
                        "x-go-type": "pq.StringArray",
                        "x-go-type-import": {
                          "path": "github.com/lib/pq",
                          "name": "pq"
                        },
                        "x-oapi-codegen-extra-tags": {
                          "db": "role_names"
                        }
                      }
                    }
                  },
                  "description": "Team role context for legacy listing consumers when present."
                }
              }
            },
            "description": "User records returned on this page."
          }
        }
      },
      "UserWithRole": {
        "type": "object",
        "additionalProperties": false,
        "description": "User row returned by Cloud identity-management listings. DB tags match the users_with_roles DAO projection aliases.",
        "properties": {
          "userId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "user_id"
            }
          },
          "username": {
            "type": "string",
            "maxLength": 255,
            "description": "Public username.",
            "x-oapi-codegen-extra-tags": {
              "db": "username"
            }
          },
          "email": {
            "type": "string",
            "format": "email",
            "maxLength": 320,
            "description": "User email address.",
            "x-oapi-codegen-extra-tags": {
              "db": "email"
            }
          },
          "firstName": {
            "type": "string",
            "maxLength": 200,
            "description": "User's first name.",
            "x-oapi-codegen-extra-tags": {
              "db": "first_name"
            }
          },
          "lastName": {
            "type": "string",
            "maxLength": 300,
            "description": "User's last name.",
            "x-oapi-codegen-extra-tags": {
              "db": "last_name"
            }
          },
          "status": {
            "type": "string",
            "maxLength": 100,
            "description": "User account status."
          },
          "roleNames": {
            "type": "array",
            "description": "Names of roles assigned to the user in the listing context.",
            "items": {
              "type": "string",
              "maxLength": 100
            },
            "x-go-type": "pq.StringArray",
            "x-go-type-import": {
              "path": "github.com/lib/pq",
              "name": "pq"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "role_names"
            }
          },
          "createdAt": {
            "description": "Timestamp when the user was created.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at",
              "json": "createdAt"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Legacy listing timestamp currently scanned from the created_at projection.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at",
              "json": "updatedAt"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "joinedAt": {
            "description": "Timestamp when the user joined the filtered team, when listing by team.",
            "x-oapi-codegen-extra-tags": {
              "db": "joined_at",
              "json": "joinedAt"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "lastLoginTime": {
            "description": "Timestamp when the user last signed in.",
            "x-oapi-codegen-extra-tags": {
              "db": "last_login_time",
              "json": "lastLoginTime"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deletedAt": {
            "description": "Timestamp when the user was soft-deleted, if applicable.",
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at",
              "json": "deletedAt"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type": "sql.NullTime",
            "x-go-type-import": {
              "path": "database/sql"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "prefs": {
            "type": "object",
            "additionalProperties": true,
            "description": "Legacy role notification preferences attached to listing rows."
          },
          "avatarUrl": {
            "type": "string",
            "format": "uri",
            "maxLength": 2048,
            "description": "URL of the user's avatar image.",
            "x-oapi-codegen-extra-tags": {
              "db": "avatar_url"
            }
          },
          "preferences": {
            "type": "object",
            "additionalProperties": true,
            "description": "User preference JSON attached to listing rows.",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "preferences"
            }
          },
          "organizationWithUserRoles": {
            "description": "Organization role names derived by Cloud after scanning the user row.",
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "roleNames": {
                "type": "array",
                "description": "Names of roles assigned to the user in the selected organization context.",
                "items": {
                  "type": "string",
                  "maxLength": 100
                },
                "x-go-type": "pq.StringArray",
                "x-go-type-import": {
                  "path": "github.com/lib/pq",
                  "name": "pq"
                }
              }
            }
          },
          "teamsWithUserRoles": {
            "type": "array",
            "items": {
              "type": "object",
              "description": "Team membership record with role information.",
              "additionalProperties": false,
              "required": [
                "id",
                "name",
                "description",
                "owner",
                "metadata",
                "createdAt",
                "updatedAt",
                "deletedAt",
                "roleNames"
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
                  }
                },
                "name": {
                  "type": "string",
                  "description": "Team name.",
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "name"
                  }
                },
                "description": {
                  "type": "string",
                  "description": "Team description.",
                  "maxLength": 1024,
                  "x-oapi-codegen-extra-tags": {
                    "db": "description"
                  }
                },
                "owner": {
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "owner"
                  }
                },
                "metadata": {
                  "type": "object",
                  "description": "Team metadata stored with the membership row.",
                  "additionalProperties": true,
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "metadata"
                  }
                },
                "createdAt": {
                  "description": "Timestamp when the team was created.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at",
                    "json": "createdAt"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updatedAt": {
                  "description": "Timestamp when the team was last updated.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at",
                    "json": "updatedAt"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "deletedAt": {
                  "description": "Timestamp when the team was soft-deleted, if applicable.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "deleted_at",
                    "json": "deletedAt"
                  },
                  "x-go-type": "meshcore.NullTime",
                  "x-go-type-import": {
                    "name": "meshcore",
                    "path": "github.com/meshery/schemas/models/core"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "roleNames": {
                  "type": "array",
                  "description": "Names of roles assigned to the user in this team.",
                  "items": {
                    "type": "string",
                    "maxLength": 100
                  },
                  "x-go-type": "pq.StringArray",
                  "x-go-type-import": {
                    "path": "github.com/lib/pq",
                    "name": "pq"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "role_names"
                  }
                }
              }
            },
            "description": "Team role context for legacy listing consumers when present."
          }
        }
      },
      "UserListingOrganizationRoles": {
        "type": "object",
        "additionalProperties": false,
        "description": "Organization role context attached to Cloud user listing rows.",
        "properties": {
          "roleNames": {
            "type": "array",
            "description": "Names of roles assigned to the user in the selected organization context.",
            "items": {
              "type": "string",
              "maxLength": 100
            },
            "x-go-type": "pq.StringArray",
            "x-go-type-import": {
              "path": "github.com/lib/pq",
              "name": "pq"
            }
          }
        }
      },
      "UserOrganizationMapping": {
        "type": "object",
        "additionalProperties": false,
        "description": "Mapping between a user and an organization.",
        "required": [
          "id",
          "userId",
          "organizationId",
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
            "x-oapi-codegen-extra-tags": {
              "db": "id"
            }
          },
          "userId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "user_id"
            }
          },
          "organizationId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "organization_id"
            }
          },
          "roleId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "role_id"
            }
          },
          "createdAt": {
            "description": "Timestamp when the mapping was created.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp when the mapping was last updated.",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deletedAt": {
            "description": "Timestamp when the mapping was soft-deleted, if applicable.",
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type": "sql.NullTime",
            "x-go-type-import": {
              "path": "database/sql"
            },
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "PublicUserView": {
        "type": "object",
        "additionalProperties": false,
        "description": "Public user picker fields. Wire-compatible with legacy /api/users.\nuserId carries the user's UUID; username is the human handle.\n",
        "required": [
          "userId",
          "username"
        ],
        "properties": {
          "userId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "username": {
            "type": "string",
            "description": "Public username or handle.",
            "maxLength": 255
          },
          "avatarUrl": {
            "type": "string",
            "format": "uri",
            "description": "URL to the user's avatar image.",
            "maxLength": 500
          }
        }
      },
      "PublicUsersPage": {
        "type": "object",
        "description": "Paginated list of public user picker records.",
        "required": [
          "page",
          "pageSize",
          "totalCount",
          "data"
        ],
        "properties": {
          "page": {
            "type": "integer",
            "description": "Current page number of the result set.",
            "minimum": 0
          },
          "pageSize": {
            "type": "integer",
            "description": "Number of items per page.",
            "minimum": 1
          },
          "totalCount": {
            "type": "integer",
            "description": "Total number of items available.",
            "minimum": 0
          },
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "additionalProperties": false,
              "description": "Public user picker fields. Wire-compatible with legacy /api/users.\nuserId carries the user's UUID; username is the human handle.\n",
              "required": [
                "userId",
                "username"
              ],
              "properties": {
                "userId": {
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "username": {
                  "type": "string",
                  "description": "Public username or handle.",
                  "maxLength": 255
                },
                "avatarUrl": {
                  "type": "string",
                  "format": "uri",
                  "description": "URL to the user's avatar image.",
                  "maxLength": 500
                }
              }
            },
            "description": "Public user picker records returned on this page."
          }
        }
      },
      "SearchableUserView": {
        "type": "object",
        "additionalProperties": false,
        "description": "Restricted user record returned by authenticated user search.",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "userId": {
            "type": "string",
            "description": "User's public identifier.",
            "maxLength": 200,
            "x-id-format": "external"
          },
          "username": {
            "type": "string",
            "description": "Public username.",
            "maxLength": 255
          },
          "email": {
            "type": "string",
            "description": "User email address.",
            "format": "email",
            "maxLength": 320
          },
          "avatarUrl": {
            "type": "string",
            "description": "URL of the user's avatar image.",
            "format": "uri",
            "maxLength": 2048
          }
        }
      },
      "SearchableUsersPage": {
        "type": "object",
        "description": "Paginated list of restricted user records returned by authenticated user search.",
        "required": [
          "page",
          "pageSize",
          "totalCount",
          "data"
        ],
        "properties": {
          "page": {
            "type": "integer",
            "description": "Current page number of the result set.",
            "minimum": 0
          },
          "pageSize": {
            "type": "integer",
            "description": "Number of items per page.",
            "minimum": 1
          },
          "totalCount": {
            "type": "integer",
            "description": "Total number of items available.",
            "minimum": 0
          },
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "additionalProperties": false,
              "description": "Restricted user record returned by authenticated user search.",
              "properties": {
                "id": {
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "userId": {
                  "type": "string",
                  "description": "User's public identifier.",
                  "maxLength": 200,
                  "x-id-format": "external"
                },
                "username": {
                  "type": "string",
                  "description": "Public username.",
                  "maxLength": 255
                },
                "email": {
                  "type": "string",
                  "description": "User email address.",
                  "format": "email",
                  "maxLength": 320
                },
                "avatarUrl": {
                  "type": "string",
                  "description": "URL of the user's avatar image.",
                  "format": "uri",
                  "maxLength": 2048
                }
              }
            },
            "description": "Restricted users matching the search query."
          }
        }
      },
      "NullTime": {
        "description": "SQL null Timestamp to handle null values of time.",
        "x-go-type": "meshcore.NullTime",
        "x-go-type-import": {
          "name": "meshcore",
          "path": "github.com/meshery/schemas/models/core"
        },
        "type": "string",
        "format": "date-time",
        "x-go-type-skip-optional-pointer": true
      },
      "SqlNullTime": {
        "type": "string",
        "format": "date-time",
        "x-go-type": "sql.NullTime",
        "x-go-type-import": {
          "path": "database/sql"
        },
        "x-go-type-skip-optional-pointer": true
      },
      "Preference": {
        "x-generate-db-helpers": true,
        "type": "object",
        "required": [
          "anonymousUsageStats",
          "anonymousPerfResults",
          "updatedAt",
          "dashboardPreferences",
          "selectedOrganizationId",
          "selectedWorkspaceForOrganizations",
          "usersExtensionPreferences",
          "remoteProviderPreferences"
        ],
        "properties": {
          "meshAdapters": {
            "type": "array",
            "items": {
              "x-go-type": "Adapter",
              "type": "object",
              "additionalProperties": false,
              "description": "Meshery adapter configuration stored in user preferences.",
              "required": [
                "adapterLocation",
                "name",
                "version",
                "gitCommitSha",
                "ops"
              ],
              "properties": {
                "adapterLocation": {
                  "type": "string",
                  "description": "Network location used to reach the adapter.",
                  "minLength": 1,
                  "maxLength": 500
                },
                "name": {
                  "type": "string",
                  "description": "Adapter name.",
                  "minLength": 1,
                  "maxLength": 255
                },
                "version": {
                  "type": "string",
                  "description": "Adapter version.",
                  "maxLength": 100
                },
                "gitCommitSha": {
                  "type": "string",
                  "description": "Git commit SHA for the adapter build.",
                  "maxLength": 64
                },
                "ops": {
                  "type": "array",
                  "description": "Operations supported by the adapter.",
                  "items": {
                    "type": "object",
                    "additionalProperties": false,
                    "description": "Operation supported by a Meshery adapter.",
                    "required": [
                      "key",
                      "value",
                      "category"
                    ],
                    "properties": {
                      "key": {
                        "type": "string",
                        "description": "Stable operation key.",
                        "minLength": 1,
                        "maxLength": 255
                      },
                      "value": {
                        "type": "string",
                        "description": "Human-readable operation value.",
                        "minLength": 1,
                        "maxLength": 255
                      },
                      "category": {
                        "type": "integer",
                        "description": "Protobuf OpCategory wire value. Integer values intentionally mirror meshops.proto instead of using lowercase string enum literals.",
                        "minimum": 0,
                        "maximum": 4,
                        "enum": [
                          0,
                          1,
                          2,
                          3,
                          4
                        ]
                      }
                    }
                  }
                }
              }
            },
            "description": "The mesh adapters of the preference."
          },
          "grafana": {
            "x-go-type": "Grafana",
            "type": "object",
            "properties": {
              "grafanaUrl": {
                "type": "string",
                "description": "Grafana URL for the user configuration.",
                "maxLength": 500
              },
              "grafanaApiKey": {
                "type": "string",
                "description": "Grafana API key for the user configuration.",
                "maxLength": 500
              },
              "selectedBoardsConfigs": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "board": {
                      "type": "object",
                      "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
                    },
                    "panels": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
                      },
                      "description": "Panels selected for the Grafana board configuration."
                    },
                    "templateVars": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      },
                      "description": "Template variables applied to the selected Grafana board configuration."
                    }
                  }
                },
                "description": "Selected Grafana board configurations for the user."
              }
            }
          },
          "prometheus": {
            "x-go-type": "Prometheus",
            "type": "object",
            "properties": {
              "prometheusUrl": {
                "type": "string",
                "description": "The prometheus URL of the prometheus.",
                "maxLength": 500
              },
              "selectedPrometheusBoardsConfigs": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "board": {
                      "type": "object",
                      "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
                    },
                    "panels": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
                      },
                      "description": "Panels selected for the Grafana board configuration."
                    },
                    "templateVars": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      },
                      "description": "Template variables applied to the selected Grafana board configuration."
                    }
                  }
                },
                "description": "The selected prometheus boards configs of the prometheus."
              }
            }
          },
          "loadTestPrefs": {
            "x-go-type": "LoadTestPreferences",
            "type": "object",
            "properties": {
              "c": {
                "type": "integer",
                "description": "Concurrent requests",
                "minimum": 0
              },
              "qps": {
                "type": "integer",
                "description": "Queries per second",
                "minimum": 0
              },
              "t": {
                "type": "string",
                "description": "Duration",
                "maxLength": 500
              },
              "gen": {
                "type": "string",
                "description": "Load generator",
                "maxLength": 500
              }
            }
          },
          "anonymousUsageStats": {
            "type": "boolean",
            "description": "The anonymous usage stats of the preference."
          },
          "anonymousPerfResults": {
            "type": "boolean",
            "description": "The anonymous perf results of the preference."
          },
          "updatedAt": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp of when the resource was last updated."
          },
          "dashboardPreferences": {
            "type": "object",
            "additionalProperties": true,
            "description": "The dashboard preferences of the preference."
          },
          "selectedOrganizationId": {
            "type": "string",
            "description": "ID of the associated selectedOrganization.",
            "maxLength": 500,
            "format": "uuid",
            "x-go-type": "core.Uuid",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            }
          },
          "selectedWorkspaceForOrganizations": {
            "type": "object",
            "additionalProperties": {
              "type": "string"
            },
            "description": "The selected workspace for organizations of the preference."
          },
          "usersExtensionPreferences": {
            "type": "object",
            "additionalProperties": true,
            "description": "The users extension preferences of the preference."
          },
          "remoteProviderPreferences": {
            "type": "object",
            "additionalProperties": true,
            "description": "The remote provider preferences of the preference."
          }
        }
      },
      "PreferencePayload": {
        "type": "object",
        "description": "Payload for updating user preferences. Contains only client-settable fields; omitted fields are left unchanged by the server.",
        "properties": {
          "meshAdapters": {
            "type": "array",
            "items": {
              "x-go-type": "Adapter",
              "type": "object",
              "additionalProperties": false,
              "description": "Meshery adapter configuration stored in user preferences.",
              "required": [
                "adapterLocation",
                "name",
                "version",
                "gitCommitSha",
                "ops"
              ],
              "properties": {
                "adapterLocation": {
                  "type": "string",
                  "description": "Network location used to reach the adapter.",
                  "minLength": 1,
                  "maxLength": 500
                },
                "name": {
                  "type": "string",
                  "description": "Adapter name.",
                  "minLength": 1,
                  "maxLength": 255
                },
                "version": {
                  "type": "string",
                  "description": "Adapter version.",
                  "maxLength": 100
                },
                "gitCommitSha": {
                  "type": "string",
                  "description": "Git commit SHA for the adapter build.",
                  "maxLength": 64
                },
                "ops": {
                  "type": "array",
                  "description": "Operations supported by the adapter.",
                  "items": {
                    "type": "object",
                    "additionalProperties": false,
                    "description": "Operation supported by a Meshery adapter.",
                    "required": [
                      "key",
                      "value",
                      "category"
                    ],
                    "properties": {
                      "key": {
                        "type": "string",
                        "description": "Stable operation key.",
                        "minLength": 1,
                        "maxLength": 255
                      },
                      "value": {
                        "type": "string",
                        "description": "Human-readable operation value.",
                        "minLength": 1,
                        "maxLength": 255
                      },
                      "category": {
                        "type": "integer",
                        "description": "Protobuf OpCategory wire value. Integer values intentionally mirror meshops.proto instead of using lowercase string enum literals.",
                        "minimum": 0,
                        "maximum": 4,
                        "enum": [
                          0,
                          1,
                          2,
                          3,
                          4
                        ]
                      }
                    }
                  }
                }
              }
            },
            "description": "The mesh adapters of the preference."
          },
          "grafana": {
            "type": "object",
            "properties": {
              "grafanaUrl": {
                "type": "string",
                "description": "Grafana URL for the user configuration.",
                "maxLength": 500
              },
              "grafanaApiKey": {
                "type": "string",
                "description": "Grafana API key for the user configuration.",
                "maxLength": 500
              },
              "selectedBoardsConfigs": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "board": {
                      "type": "object",
                      "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
                    },
                    "panels": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
                      },
                      "description": "Panels selected for the Grafana board configuration."
                    },
                    "templateVars": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      },
                      "description": "Template variables applied to the selected Grafana board configuration."
                    }
                  }
                },
                "description": "Selected Grafana board configurations for the user."
              }
            }
          },
          "prometheus": {
            "type": "object",
            "properties": {
              "prometheusUrl": {
                "type": "string",
                "description": "The prometheus URL of the prometheus.",
                "maxLength": 500
              },
              "selectedPrometheusBoardsConfigs": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "board": {
                      "type": "object",
                      "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
                    },
                    "panels": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
                      },
                      "description": "Panels selected for the Grafana board configuration."
                    },
                    "templateVars": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      },
                      "description": "Template variables applied to the selected Grafana board configuration."
                    }
                  }
                },
                "description": "The selected prometheus boards configs of the prometheus."
              }
            }
          },
          "loadTestPrefs": {
            "type": "object",
            "properties": {
              "c": {
                "type": "integer",
                "description": "Concurrent requests",
                "minimum": 0
              },
              "qps": {
                "type": "integer",
                "description": "Queries per second",
                "minimum": 0
              },
              "t": {
                "type": "string",
                "description": "Duration",
                "maxLength": 500
              },
              "gen": {
                "type": "string",
                "description": "Load generator",
                "maxLength": 500
              }
            }
          },
          "anonymousUsageStats": {
            "type": "boolean",
            "description": "The anonymous usage stats of the preference."
          },
          "anonymousPerfResults": {
            "type": "boolean",
            "description": "The anonymous perf results of the preference."
          },
          "dashboardPreferences": {
            "type": "object",
            "additionalProperties": true,
            "description": "The dashboard preferences of the preference."
          },
          "selectedOrganizationId": {
            "type": "string",
            "description": "ID of the associated selectedOrganization.",
            "maxLength": 500,
            "format": "uuid",
            "x-go-type": "core.Uuid",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            }
          },
          "selectedWorkspaceForOrganizations": {
            "type": "object",
            "additionalProperties": {
              "type": "string"
            },
            "description": "The selected workspace for organizations of the preference."
          },
          "usersExtensionPreferences": {
            "type": "object",
            "additionalProperties": true,
            "description": "The users extension preferences of the preference."
          },
          "remoteProviderPreferences": {
            "type": "object",
            "additionalProperties": true,
            "description": "The remote provider preferences of the preference."
          }
        }
      },
      "Adapter": {
        "type": "object",
        "additionalProperties": false,
        "description": "Meshery adapter configuration stored in user preferences.",
        "required": [
          "adapterLocation",
          "name",
          "version",
          "gitCommitSha",
          "ops"
        ],
        "properties": {
          "adapterLocation": {
            "type": "string",
            "description": "Network location used to reach the adapter.",
            "minLength": 1,
            "maxLength": 500
          },
          "name": {
            "type": "string",
            "description": "Adapter name.",
            "minLength": 1,
            "maxLength": 255
          },
          "version": {
            "type": "string",
            "description": "Adapter version.",
            "maxLength": 100
          },
          "gitCommitSha": {
            "type": "string",
            "description": "Git commit SHA for the adapter build.",
            "maxLength": 64
          },
          "ops": {
            "type": "array",
            "description": "Operations supported by the adapter.",
            "items": {
              "type": "object",
              "additionalProperties": false,
              "description": "Operation supported by a Meshery adapter.",
              "required": [
                "key",
                "value",
                "category"
              ],
              "properties": {
                "key": {
                  "type": "string",
                  "description": "Stable operation key.",
                  "minLength": 1,
                  "maxLength": 255
                },
                "value": {
                  "type": "string",
                  "description": "Human-readable operation value.",
                  "minLength": 1,
                  "maxLength": 255
                },
                "category": {
                  "type": "integer",
                  "description": "Protobuf OpCategory wire value. Integer values intentionally mirror meshops.proto instead of using lowercase string enum literals.",
                  "minimum": 0,
                  "maximum": 4,
                  "enum": [
                    0,
                    1,
                    2,
                    3,
                    4
                  ]
                }
              }
            }
          }
        }
      },
      "SupportedOperation": {
        "type": "object",
        "additionalProperties": false,
        "description": "Operation supported by a Meshery adapter.",
        "required": [
          "key",
          "value",
          "category"
        ],
        "properties": {
          "key": {
            "type": "string",
            "description": "Stable operation key.",
            "minLength": 1,
            "maxLength": 255
          },
          "value": {
            "type": "string",
            "description": "Human-readable operation value.",
            "minLength": 1,
            "maxLength": 255
          },
          "category": {
            "type": "integer",
            "description": "Protobuf OpCategory wire value. Integer values intentionally mirror meshops.proto instead of using lowercase string enum literals.",
            "minimum": 0,
            "maximum": 4,
            "enum": [
              0,
              1,
              2,
              3,
              4
            ]
          }
        }
      },
      "Grafana": {
        "type": "object",
        "properties": {
          "grafanaUrl": {
            "type": "string",
            "description": "Grafana URL for the user configuration.",
            "maxLength": 500
          },
          "grafanaApiKey": {
            "type": "string",
            "description": "Grafana API key for the user configuration.",
            "maxLength": 500
          },
          "selectedBoardsConfigs": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "board": {
                  "type": "object",
                  "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
                },
                "panels": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
                  },
                  "description": "Panels selected for the Grafana board configuration."
                },
                "templateVars": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "Template variables applied to the selected Grafana board configuration."
                }
              }
            },
            "description": "Selected Grafana board configurations for the user."
          }
        }
      },
      "SelectedGrafanaConfig": {
        "type": "object",
        "properties": {
          "board": {
            "type": "object",
            "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
          },
          "panels": {
            "type": "array",
            "items": {
              "type": "object",
              "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
            },
            "description": "Panels selected for the Grafana board configuration."
          },
          "templateVars": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Template variables applied to the selected Grafana board configuration."
          }
        }
      },
      "GrafanaBoard": {
        "type": "object",
        "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
      },
      "Panel": {
        "type": "object",
        "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
      },
      "Prometheus": {
        "type": "object",
        "properties": {
          "prometheusUrl": {
            "type": "string",
            "description": "The prometheus URL of the prometheus.",
            "maxLength": 500
          },
          "selectedPrometheusBoardsConfigs": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "board": {
                  "type": "object",
                  "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
                },
                "panels": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
                  },
                  "description": "Panels selected for the Grafana board configuration."
                },
                "templateVars": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "Template variables applied to the selected Grafana board configuration."
                }
              }
            },
            "description": "The selected prometheus boards configs of the prometheus."
          }
        }
      },
      "LoadTestPreferences": {
        "type": "object",
        "properties": {
          "c": {
            "type": "integer",
            "description": "Concurrent requests",
            "minimum": 0
          },
          "qps": {
            "type": "integer",
            "description": "Queries per second",
            "minimum": 0
          },
          "t": {
            "type": "string",
            "description": "Duration",
            "maxLength": 500
          },
          "gen": {
            "type": "string",
            "description": "Load generator",
            "maxLength": 500
          }
        }
      },
      "Social": {
        "description": "Various online profiles associated with the user account, like GitHub, LinkedIn, X, and so on.",
        "type": "object",
        "properties": {
          "site": {
            "type": "string",
            "maxLength": 50,
            "description": "The site of the social."
          },
          "link": {
            "type": "string",
            "format": "uri",
            "description": "The link of the social."
          }
        },
        "required": [
          "site",
          "link"
        ]
      }
    }
  }
};

export default UserSchema;
