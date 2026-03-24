/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const UserSchema: Record<string, unknown> = {
  "openapi": "3.0.3",
  "info": {
    "title": "User",
    "description": "OpenAPI schema for user management in Meshery Cloud.",
    "version": "v1beta1",
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
  "paths": {
    "/api/identity/orgs/{orgId}/users": {
      "get": {
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
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
              "x-oapi-codegen-extra-tags": {
                "db": "org_id",
                "json": "org_id"
              },
              "x-go-type-name": "OrganizationId",
              "x-go-type-skip-optional-pointer": true
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
            "name": "teamID",
            "in": "query",
            "required": false,
            "description": "Optional team filter when listing organization users",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
              "x-oapi-codegen-extra-tags": {
                "db": "team_id",
                "json": "team_id"
              },
              "x-go-type-name": "TeamId",
              "x-go-type-skip-optional-pointer": true
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
                  "properties": {
                    "page": {
                      "type": "integer"
                    },
                    "page_size": {
                      "type": "integer"
                    },
                    "total_count": {
                      "type": "integer"
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "description": "Represents a user in Layer5 Cloud (Meshery)",
                        "required": [
                          "id",
                          "user_id",
                          "provider",
                          "email",
                          "first_name",
                          "last_name",
                          "status",
                          "created_at",
                          "updated_at",
                          "last_login_time",
                          "deleted_at"
                        ],
                        "properties": {
                          "id": {
                            "description": "Unique identifier for the user",
                            "x-go-name": "ID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "id",
                              "json": "id",
                              "yaml": "id"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "user_id": {
                            "type": "string",
                            "maxLength": 200,
                            "description": "User identifier (username or external ID)",
                            "x-oapi-codegen-extra-tags": {
                              "db": "user_id",
                              "json": "user_id",
                              "yaml": "user_id"
                            }
                          },
                          "provider": {
                            "type": "string",
                            "maxLength": 100,
                            "description": "Authentication provider (e.g., Layer5 Cloud, Twitter, Facebook, Github)",
                            "example": [
                              "local",
                              "github",
                              "google",
                              "twitter"
                            ],
                            "x-oapi-codegen-extra-tags": {
                              "db": "provider",
                              "json": "provider",
                              "yaml": "provider"
                            }
                          },
                          "email": {
                            "type": "string",
                            "format": "email",
                            "maxLength": 300,
                            "description": "User's email address",
                            "x-oapi-codegen-extra-tags": {
                              "db": "email",
                              "json": "email",
                              "yaml": "email"
                            }
                          },
                          "first_name": {
                            "type": "string",
                            "maxLength": 200,
                            "description": "User's first name",
                            "x-oapi-codegen-extra-tags": {
                              "db": "first_name",
                              "json": "first_name",
                              "yaml": "first_name"
                            }
                          },
                          "last_name": {
                            "type": "string",
                            "maxLength": 300,
                            "description": "User's last name",
                            "x-oapi-codegen-extra-tags": {
                              "db": "last_name",
                              "json": "last_name",
                              "yaml": "last_name"
                            }
                          },
                          "avatar_url": {
                            "type": "string",
                            "format": "uri",
                            "maxLength": 500,
                            "description": "URL to user's avatar image",
                            "x-oapi-codegen-extra-tags": {
                              "db": "avatar_url",
                              "json": "avatar_url",
                              "yaml": "avatar_url"
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
                            "description": "User account status",
                            "x-oapi-codegen-extra-tags": {
                              "db": "status",
                              "json": "status",
                              "yaml": "status"
                            }
                          },
                          "bio": {
                            "type": "string",
                            "maxLength": 1000,
                            "default": "",
                            "description": "User's biography or description",
                            "x-oapi-codegen-extra-tags": {
                              "db": "bio",
                              "json": "bio",
                              "yaml": "bio"
                            }
                          },
                          "country": {
                            "type": "object",
                            "description": "User's country information stored as JSONB",
                            "additionalProperties": true,
                            "x-go-type": "core.Map",
                            "x-oapi-codegen-extra-tags": {
                              "db": "country",
                              "json": "country",
                              "yaml": "country"
                            }
                          },
                          "region": {
                            "type": "object",
                            "description": "User's region information stored as JSONB",
                            "additionalProperties": true,
                            "x-go-type": "core.Map",
                            "x-oapi-codegen-extra-tags": {
                              "db": "region",
                              "json": "region",
                              "yaml": "region"
                            }
                          },
                          "preferences": {
                            "x-go-type": "Preference",
                            "description": "User preferences stored as JSONB",
                            "x-oapi-codegen-extra-tags": {
                              "db": "preferences",
                              "json": "preferences",
                              "yaml": "preferences"
                            },
                            "x-generate-db-helpers": true,
                            "type": "object",
                            "required": [
                              "anonymousUsageStats",
                              "anonymousPerfResults",
                              "updated_at",
                              "dashboardPreferences",
                              "selectedOrganizationID",
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
                                  "description": "Placeholder for Adapter struct definition."
                                }
                              },
                              "grafana": {
                                "x-go-type": "Grafana",
                                "type": "object",
                                "properties": {
                                  "grafanaURL": {
                                    "type": "string"
                                  },
                                  "grafanaAPIKey": {
                                    "type": "string"
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
                                          }
                                        },
                                        "templateVars": {
                                          "type": "array",
                                          "items": {
                                            "type": "string"
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "prometheus": {
                                "x-go-type": "Prometheus",
                                "type": "object",
                                "properties": {
                                  "prometheusURL": {
                                    "type": "string"
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
                                          }
                                        },
                                        "templateVars": {
                                          "type": "array",
                                          "items": {
                                            "type": "string"
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "loadTestPrefs": {
                                "x-go-type": "LoadTestPreferences",
                                "type": "object",
                                "properties": {
                                  "c": {
                                    "type": "integer",
                                    "description": "Concurrent requests"
                                  },
                                  "qps": {
                                    "type": "integer",
                                    "description": "Queries per second"
                                  },
                                  "t": {
                                    "type": "string",
                                    "description": "Duration"
                                  },
                                  "gen": {
                                    "type": "string",
                                    "description": "Load generator"
                                  }
                                }
                              },
                              "anonymousUsageStats": {
                                "type": "boolean"
                              },
                              "anonymousPerfResults": {
                                "type": "boolean"
                              },
                              "updated_at": {
                                "type": "string",
                                "format": "date-time"
                              },
                              "dashboardPreferences": {
                                "type": "object",
                                "additionalProperties": true
                              },
                              "selectedOrganizationID": {
                                "type": "string"
                              },
                              "selectedWorkspaceForOrganizations": {
                                "type": "object",
                                "additionalProperties": {
                                  "type": "string"
                                }
                              },
                              "usersExtensionPreferences": {
                                "type": "object",
                                "additionalProperties": true
                              },
                              "selectedK8sContexts": {
                                "type": "array",
                                "description": "Persisted selection of active Kubernetes context IDs",
                                "items": {
                                  "type": "string"
                                }
                              },
                              "remoteProviderPreferences": {
                                "type": "object",
                                "additionalProperties": true
                              }
                            }
                          },
                          "accepted_terms_at": {
                            "description": "Timestamp when user accepted terms and conditions",
                            "x-oapi-codegen-extra-tags": {
                              "db": "accepted_terms_at",
                              "json": "accepted_terms_at",
                              "yaml": "accepted_terms_at"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "first_login_time": {
                            "description": "Timestamp of user's first login",
                            "x-oapi-codegen-extra-tags": {
                              "db": "first_login_time",
                              "json": "first_login_time",
                              "yaml": "first_login_time"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "last_login_time": {
                            "description": "Timestamp of user's most recent login",
                            "x-oapi-codegen-extra-tags": {
                              "db": "last_login_time",
                              "json": "last_login_time",
                              "yaml": "last_login_time"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "created_at": {
                            "description": "Timestamp when the user record was created",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "json": "created_at",
                              "yaml": "created_at"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updated_at": {
                            "description": "Timestamp when the user record was last updated",
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "json": "updated_at",
                              "yaml": "updated_at"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "socials": {
                            "type": "array",
                            "description": "Various online profiles associated with the user account",
                            "x-go-type": "UserSocials",
                            "items": {
                              "x-go-type": "Social",
                              "description": "Various online profiles associated with the user account, like GitHub, LinkedIn, X, and so on.",
                              "type": "object",
                              "properties": {
                                "site": {
                                  "type": "string",
                                  "maxLength": 50
                                },
                                "link": {
                                  "type": "string",
                                  "format": "uri"
                                }
                              },
                              "required": [
                                "site",
                                "link"
                              ]
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "socials",
                              "json": "socials",
                              "yaml": "socials"
                            }
                          },
                          "deleted_at": {
                            "type": "string",
                            "format": "date-time",
                            "nullable": true,
                            "description": "Timestamp when the user record was soft-deleted (null if not deleted)",
                            "x-go-type": "core.NullTime",
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "json": "deleted_at",
                              "yaml": "deleted_at"
                            }
                          },
                          "role_names": {
                            "type": "array",
                            "items": {
                              "type": "string",
                              "enum": [
                                "admin",
                                "meshmap",
                                "curator",
                                "team admin",
                                "workspace admin",
                                "workspace manager",
                                "organization admin",
                                "user"
                              ]
                            },
                            "description": "List of global roles assigned to the user",
                            "example": [
                              "admin",
                              "meshmap"
                            ],
                            "x-oapi-codegen-extra-tags": {
                              "db": "role_names",
                              "json": "role_names",
                              "yaml": "role_names"
                            }
                          },
                          "teams": {
                            "type": "object",
                            "description": "Teams the user belongs to with role information",
                            "x-oapi-codegen-extra-tags": {
                              "db": "teams",
                              "json": "teams",
                              "yaml": "teams"
                            },
                            "properties": {
                              "teams_with_roles": {
                                "type": "array",
                                "items": {
                                  "type": "object"
                                },
                                "x-oapi-codegen-extra-tags": {
                                  "db": "teams_with_roles",
                                  "json": "teams_with_roles",
                                  "yaml": "teams_with_roles"
                                }
                              },
                              "total_count": {
                                "type": "integer",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "total_count",
                                  "json": "total_count",
                                  "yaml": "total_count"
                                }
                              }
                            }
                          },
                          "organizations": {
                            "type": "object",
                            "description": "Organizations the user belongs to with role information",
                            "x-oapi-codegen-extra-tags": {
                              "db": "organizations",
                              "json": "organizations",
                              "yaml": "organizations"
                            },
                            "properties": {
                              "organizations_with_roles": {
                                "type": "array",
                                "items": {
                                  "type": "object"
                                },
                                "x-oapi-codegen-extra-tags": {
                                  "db": "organizations_with_roles",
                                  "json": "organizations_with_roles",
                                  "yaml": "organizations_with_roles"
                                }
                              },
                              "total_count": {
                                "type": "integer",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "total_count",
                                  "json": "total_count",
                                  "yaml": "total_count"
                                }
                              }
                            }
                          }
                        },
                        "additionalProperties": false
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
    "/api/users": {
      "get": {
        "tags": [
          "users"
        ],
        "operationId": "getUsers",
        "summary": "Get public users",
        "description": "Returns publicly viewable user records.",
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
            "description": "Paginated list of public users",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated list of public user records",
                  "properties": {
                    "page": {
                      "type": "integer"
                    },
                    "page_size": {
                      "type": "integer"
                    },
                    "total_count": {
                      "type": "integer"
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "description": "Represents a user in Layer5 Cloud (Meshery)",
                        "required": [
                          "id",
                          "user_id",
                          "provider",
                          "email",
                          "first_name",
                          "last_name",
                          "status",
                          "created_at",
                          "updated_at",
                          "last_login_time",
                          "deleted_at"
                        ],
                        "properties": {
                          "id": {
                            "description": "Unique identifier for the user",
                            "x-go-name": "ID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "id",
                              "json": "id",
                              "yaml": "id"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "user_id": {
                            "type": "string",
                            "maxLength": 200,
                            "description": "User identifier (username or external ID)",
                            "x-oapi-codegen-extra-tags": {
                              "db": "user_id",
                              "json": "user_id",
                              "yaml": "user_id"
                            }
                          },
                          "provider": {
                            "type": "string",
                            "maxLength": 100,
                            "description": "Authentication provider (e.g., Layer5 Cloud, Twitter, Facebook, Github)",
                            "example": [
                              "local",
                              "github",
                              "google",
                              "twitter"
                            ],
                            "x-oapi-codegen-extra-tags": {
                              "db": "provider",
                              "json": "provider",
                              "yaml": "provider"
                            }
                          },
                          "email": {
                            "type": "string",
                            "format": "email",
                            "maxLength": 300,
                            "description": "User's email address",
                            "x-oapi-codegen-extra-tags": {
                              "db": "email",
                              "json": "email",
                              "yaml": "email"
                            }
                          },
                          "first_name": {
                            "type": "string",
                            "maxLength": 200,
                            "description": "User's first name",
                            "x-oapi-codegen-extra-tags": {
                              "db": "first_name",
                              "json": "first_name",
                              "yaml": "first_name"
                            }
                          },
                          "last_name": {
                            "type": "string",
                            "maxLength": 300,
                            "description": "User's last name",
                            "x-oapi-codegen-extra-tags": {
                              "db": "last_name",
                              "json": "last_name",
                              "yaml": "last_name"
                            }
                          },
                          "avatar_url": {
                            "type": "string",
                            "format": "uri",
                            "maxLength": 500,
                            "description": "URL to user's avatar image",
                            "x-oapi-codegen-extra-tags": {
                              "db": "avatar_url",
                              "json": "avatar_url",
                              "yaml": "avatar_url"
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
                            "description": "User account status",
                            "x-oapi-codegen-extra-tags": {
                              "db": "status",
                              "json": "status",
                              "yaml": "status"
                            }
                          },
                          "bio": {
                            "type": "string",
                            "maxLength": 1000,
                            "default": "",
                            "description": "User's biography or description",
                            "x-oapi-codegen-extra-tags": {
                              "db": "bio",
                              "json": "bio",
                              "yaml": "bio"
                            }
                          },
                          "country": {
                            "type": "object",
                            "description": "User's country information stored as JSONB",
                            "additionalProperties": true,
                            "x-go-type": "core.Map",
                            "x-oapi-codegen-extra-tags": {
                              "db": "country",
                              "json": "country",
                              "yaml": "country"
                            }
                          },
                          "region": {
                            "type": "object",
                            "description": "User's region information stored as JSONB",
                            "additionalProperties": true,
                            "x-go-type": "core.Map",
                            "x-oapi-codegen-extra-tags": {
                              "db": "region",
                              "json": "region",
                              "yaml": "region"
                            }
                          },
                          "preferences": {
                            "x-go-type": "Preference",
                            "description": "User preferences stored as JSONB",
                            "x-oapi-codegen-extra-tags": {
                              "db": "preferences",
                              "json": "preferences",
                              "yaml": "preferences"
                            },
                            "x-generate-db-helpers": true,
                            "type": "object",
                            "required": [
                              "anonymousUsageStats",
                              "anonymousPerfResults",
                              "updated_at",
                              "dashboardPreferences",
                              "selectedOrganizationID",
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
                                  "description": "Placeholder for Adapter struct definition."
                                }
                              },
                              "grafana": {
                                "x-go-type": "Grafana",
                                "type": "object",
                                "properties": {
                                  "grafanaURL": {
                                    "type": "string"
                                  },
                                  "grafanaAPIKey": {
                                    "type": "string"
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
                                          }
                                        },
                                        "templateVars": {
                                          "type": "array",
                                          "items": {
                                            "type": "string"
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "prometheus": {
                                "x-go-type": "Prometheus",
                                "type": "object",
                                "properties": {
                                  "prometheusURL": {
                                    "type": "string"
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
                                          }
                                        },
                                        "templateVars": {
                                          "type": "array",
                                          "items": {
                                            "type": "string"
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "loadTestPrefs": {
                                "x-go-type": "LoadTestPreferences",
                                "type": "object",
                                "properties": {
                                  "c": {
                                    "type": "integer",
                                    "description": "Concurrent requests"
                                  },
                                  "qps": {
                                    "type": "integer",
                                    "description": "Queries per second"
                                  },
                                  "t": {
                                    "type": "string",
                                    "description": "Duration"
                                  },
                                  "gen": {
                                    "type": "string",
                                    "description": "Load generator"
                                  }
                                }
                              },
                              "anonymousUsageStats": {
                                "type": "boolean"
                              },
                              "anonymousPerfResults": {
                                "type": "boolean"
                              },
                              "updated_at": {
                                "type": "string",
                                "format": "date-time"
                              },
                              "dashboardPreferences": {
                                "type": "object",
                                "additionalProperties": true
                              },
                              "selectedOrganizationID": {
                                "type": "string"
                              },
                              "selectedWorkspaceForOrganizations": {
                                "type": "object",
                                "additionalProperties": {
                                  "type": "string"
                                }
                              },
                              "usersExtensionPreferences": {
                                "type": "object",
                                "additionalProperties": true
                              },
                              "selectedK8sContexts": {
                                "type": "array",
                                "description": "Persisted selection of active Kubernetes context IDs",
                                "items": {
                                  "type": "string"
                                }
                              },
                              "remoteProviderPreferences": {
                                "type": "object",
                                "additionalProperties": true
                              }
                            }
                          },
                          "accepted_terms_at": {
                            "description": "Timestamp when user accepted terms and conditions",
                            "x-oapi-codegen-extra-tags": {
                              "db": "accepted_terms_at",
                              "json": "accepted_terms_at",
                              "yaml": "accepted_terms_at"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "first_login_time": {
                            "description": "Timestamp of user's first login",
                            "x-oapi-codegen-extra-tags": {
                              "db": "first_login_time",
                              "json": "first_login_time",
                              "yaml": "first_login_time"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "last_login_time": {
                            "description": "Timestamp of user's most recent login",
                            "x-oapi-codegen-extra-tags": {
                              "db": "last_login_time",
                              "json": "last_login_time",
                              "yaml": "last_login_time"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "created_at": {
                            "description": "Timestamp when the user record was created",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "json": "created_at",
                              "yaml": "created_at"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updated_at": {
                            "description": "Timestamp when the user record was last updated",
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "json": "updated_at",
                              "yaml": "updated_at"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "socials": {
                            "type": "array",
                            "description": "Various online profiles associated with the user account",
                            "x-go-type": "UserSocials",
                            "items": {
                              "x-go-type": "Social",
                              "description": "Various online profiles associated with the user account, like GitHub, LinkedIn, X, and so on.",
                              "type": "object",
                              "properties": {
                                "site": {
                                  "type": "string",
                                  "maxLength": 50
                                },
                                "link": {
                                  "type": "string",
                                  "format": "uri"
                                }
                              },
                              "required": [
                                "site",
                                "link"
                              ]
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "socials",
                              "json": "socials",
                              "yaml": "socials"
                            }
                          },
                          "deleted_at": {
                            "type": "string",
                            "format": "date-time",
                            "nullable": true,
                            "description": "Timestamp when the user record was soft-deleted (null if not deleted)",
                            "x-go-type": "core.NullTime",
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "json": "deleted_at",
                              "yaml": "deleted_at"
                            }
                          },
                          "role_names": {
                            "type": "array",
                            "items": {
                              "type": "string",
                              "enum": [
                                "admin",
                                "meshmap",
                                "curator",
                                "team admin",
                                "workspace admin",
                                "workspace manager",
                                "organization admin",
                                "user"
                              ]
                            },
                            "description": "List of global roles assigned to the user",
                            "example": [
                              "admin",
                              "meshmap"
                            ],
                            "x-oapi-codegen-extra-tags": {
                              "db": "role_names",
                              "json": "role_names",
                              "yaml": "role_names"
                            }
                          },
                          "teams": {
                            "type": "object",
                            "description": "Teams the user belongs to with role information",
                            "x-oapi-codegen-extra-tags": {
                              "db": "teams",
                              "json": "teams",
                              "yaml": "teams"
                            },
                            "properties": {
                              "teams_with_roles": {
                                "type": "array",
                                "items": {
                                  "type": "object"
                                },
                                "x-oapi-codegen-extra-tags": {
                                  "db": "teams_with_roles",
                                  "json": "teams_with_roles",
                                  "yaml": "teams_with_roles"
                                }
                              },
                              "total_count": {
                                "type": "integer",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "total_count",
                                  "json": "total_count",
                                  "yaml": "total_count"
                                }
                              }
                            }
                          },
                          "organizations": {
                            "type": "object",
                            "description": "Organizations the user belongs to with role information",
                            "x-oapi-codegen-extra-tags": {
                              "db": "organizations",
                              "json": "organizations",
                              "yaml": "organizations"
                            },
                            "properties": {
                              "organizations_with_roles": {
                                "type": "array",
                                "items": {
                                  "type": "object"
                                },
                                "x-oapi-codegen-extra-tags": {
                                  "db": "organizations_with_roles",
                                  "json": "organizations_with_roles",
                                  "yaml": "organizations_with_roles"
                                }
                              },
                              "total_count": {
                                "type": "integer",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "total_count",
                                  "json": "total_count",
                                  "yaml": "total_count"
                                }
                              }
                            }
                          }
                        },
                        "additionalProperties": false
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
    "/api/identity/users/profile/{id}": {
      "get": {
        "tags": [
          "users"
        ],
        "operationId": "getUserProfileById",
        "summary": "Get user profile by ID",
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
                  "description": "Represents a user in Layer5 Cloud (Meshery)",
                  "required": [
                    "id",
                    "user_id",
                    "provider",
                    "email",
                    "first_name",
                    "last_name",
                    "status",
                    "created_at",
                    "updated_at",
                    "last_login_time",
                    "deleted_at"
                  ],
                  "properties": {
                    "id": {
                      "description": "Unique identifier for the user",
                      "x-go-name": "ID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id",
                        "json": "id",
                        "yaml": "id"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "user_id": {
                      "type": "string",
                      "maxLength": 200,
                      "description": "User identifier (username or external ID)",
                      "x-oapi-codegen-extra-tags": {
                        "db": "user_id",
                        "json": "user_id",
                        "yaml": "user_id"
                      }
                    },
                    "provider": {
                      "type": "string",
                      "maxLength": 100,
                      "description": "Authentication provider (e.g., Layer5 Cloud, Twitter, Facebook, Github)",
                      "example": [
                        "local",
                        "github",
                        "google",
                        "twitter"
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "db": "provider",
                        "json": "provider",
                        "yaml": "provider"
                      }
                    },
                    "email": {
                      "type": "string",
                      "format": "email",
                      "maxLength": 300,
                      "description": "User's email address",
                      "x-oapi-codegen-extra-tags": {
                        "db": "email",
                        "json": "email",
                        "yaml": "email"
                      }
                    },
                    "first_name": {
                      "type": "string",
                      "maxLength": 200,
                      "description": "User's first name",
                      "x-oapi-codegen-extra-tags": {
                        "db": "first_name",
                        "json": "first_name",
                        "yaml": "first_name"
                      }
                    },
                    "last_name": {
                      "type": "string",
                      "maxLength": 300,
                      "description": "User's last name",
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_name",
                        "json": "last_name",
                        "yaml": "last_name"
                      }
                    },
                    "avatar_url": {
                      "type": "string",
                      "format": "uri",
                      "maxLength": 500,
                      "description": "URL to user's avatar image",
                      "x-oapi-codegen-extra-tags": {
                        "db": "avatar_url",
                        "json": "avatar_url",
                        "yaml": "avatar_url"
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
                      "description": "User account status",
                      "x-oapi-codegen-extra-tags": {
                        "db": "status",
                        "json": "status",
                        "yaml": "status"
                      }
                    },
                    "bio": {
                      "type": "string",
                      "maxLength": 1000,
                      "default": "",
                      "description": "User's biography or description",
                      "x-oapi-codegen-extra-tags": {
                        "db": "bio",
                        "json": "bio",
                        "yaml": "bio"
                      }
                    },
                    "country": {
                      "type": "object",
                      "description": "User's country information stored as JSONB",
                      "additionalProperties": true,
                      "x-go-type": "core.Map",
                      "x-oapi-codegen-extra-tags": {
                        "db": "country",
                        "json": "country",
                        "yaml": "country"
                      }
                    },
                    "region": {
                      "type": "object",
                      "description": "User's region information stored as JSONB",
                      "additionalProperties": true,
                      "x-go-type": "core.Map",
                      "x-oapi-codegen-extra-tags": {
                        "db": "region",
                        "json": "region",
                        "yaml": "region"
                      }
                    },
                    "preferences": {
                      "x-go-type": "Preference",
                      "description": "User preferences stored as JSONB",
                      "x-oapi-codegen-extra-tags": {
                        "db": "preferences",
                        "json": "preferences",
                        "yaml": "preferences"
                      },
                      "x-generate-db-helpers": true,
                      "type": "object",
                      "required": [
                        "anonymousUsageStats",
                        "anonymousPerfResults",
                        "updated_at",
                        "dashboardPreferences",
                        "selectedOrganizationID",
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
                            "description": "Placeholder for Adapter struct definition."
                          }
                        },
                        "grafana": {
                          "x-go-type": "Grafana",
                          "type": "object",
                          "properties": {
                            "grafanaURL": {
                              "type": "string"
                            },
                            "grafanaAPIKey": {
                              "type": "string"
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
                                    }
                                  },
                                  "templateVars": {
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        "prometheus": {
                          "x-go-type": "Prometheus",
                          "type": "object",
                          "properties": {
                            "prometheusURL": {
                              "type": "string"
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
                                    }
                                  },
                                  "templateVars": {
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        "loadTestPrefs": {
                          "x-go-type": "LoadTestPreferences",
                          "type": "object",
                          "properties": {
                            "c": {
                              "type": "integer",
                              "description": "Concurrent requests"
                            },
                            "qps": {
                              "type": "integer",
                              "description": "Queries per second"
                            },
                            "t": {
                              "type": "string",
                              "description": "Duration"
                            },
                            "gen": {
                              "type": "string",
                              "description": "Load generator"
                            }
                          }
                        },
                        "anonymousUsageStats": {
                          "type": "boolean"
                        },
                        "anonymousPerfResults": {
                          "type": "boolean"
                        },
                        "updated_at": {
                          "type": "string",
                          "format": "date-time"
                        },
                        "dashboardPreferences": {
                          "type": "object",
                          "additionalProperties": true
                        },
                        "selectedOrganizationID": {
                          "type": "string"
                        },
                        "selectedWorkspaceForOrganizations": {
                          "type": "object",
                          "additionalProperties": {
                            "type": "string"
                          }
                        },
                        "usersExtensionPreferences": {
                          "type": "object",
                          "additionalProperties": true
                        },
                        "selectedK8sContexts": {
                          "type": "array",
                          "description": "Persisted selection of active Kubernetes context IDs",
                          "items": {
                            "type": "string"
                          }
                        },
                        "remoteProviderPreferences": {
                          "type": "object",
                          "additionalProperties": true
                        }
                      }
                    },
                    "accepted_terms_at": {
                      "description": "Timestamp when user accepted terms and conditions",
                      "x-oapi-codegen-extra-tags": {
                        "db": "accepted_terms_at",
                        "json": "accepted_terms_at",
                        "yaml": "accepted_terms_at"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "first_login_time": {
                      "description": "Timestamp of user's first login",
                      "x-oapi-codegen-extra-tags": {
                        "db": "first_login_time",
                        "json": "first_login_time",
                        "yaml": "first_login_time"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "last_login_time": {
                      "description": "Timestamp of user's most recent login",
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_login_time",
                        "json": "last_login_time",
                        "yaml": "last_login_time"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "created_at": {
                      "description": "Timestamp when the user record was created",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "created_at",
                        "yaml": "created_at"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updated_at": {
                      "description": "Timestamp when the user record was last updated",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updated_at",
                        "yaml": "updated_at"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "socials": {
                      "type": "array",
                      "description": "Various online profiles associated with the user account",
                      "x-go-type": "UserSocials",
                      "items": {
                        "x-go-type": "Social",
                        "description": "Various online profiles associated with the user account, like GitHub, LinkedIn, X, and so on.",
                        "type": "object",
                        "properties": {
                          "site": {
                            "type": "string",
                            "maxLength": 50
                          },
                          "link": {
                            "type": "string",
                            "format": "uri"
                          }
                        },
                        "required": [
                          "site",
                          "link"
                        ]
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "socials",
                        "json": "socials",
                        "yaml": "socials"
                      }
                    },
                    "deleted_at": {
                      "type": "string",
                      "format": "date-time",
                      "nullable": true,
                      "description": "Timestamp when the user record was soft-deleted (null if not deleted)",
                      "x-go-type": "core.NullTime",
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deleted_at",
                        "yaml": "deleted_at"
                      }
                    },
                    "role_names": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "enum": [
                          "admin",
                          "meshmap",
                          "curator",
                          "team admin",
                          "workspace admin",
                          "workspace manager",
                          "organization admin",
                          "user"
                        ]
                      },
                      "description": "List of global roles assigned to the user",
                      "example": [
                        "admin",
                        "meshmap"
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "db": "role_names",
                        "json": "role_names",
                        "yaml": "role_names"
                      }
                    },
                    "teams": {
                      "type": "object",
                      "description": "Teams the user belongs to with role information",
                      "x-oapi-codegen-extra-tags": {
                        "db": "teams",
                        "json": "teams",
                        "yaml": "teams"
                      },
                      "properties": {
                        "teams_with_roles": {
                          "type": "array",
                          "items": {
                            "type": "object"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "teams_with_roles",
                            "json": "teams_with_roles",
                            "yaml": "teams_with_roles"
                          }
                        },
                        "total_count": {
                          "type": "integer",
                          "x-oapi-codegen-extra-tags": {
                            "db": "total_count",
                            "json": "total_count",
                            "yaml": "total_count"
                          }
                        }
                      }
                    },
                    "organizations": {
                      "type": "object",
                      "description": "Organizations the user belongs to with role information",
                      "x-oapi-codegen-extra-tags": {
                        "db": "organizations",
                        "json": "organizations",
                        "yaml": "organizations"
                      },
                      "properties": {
                        "organizations_with_roles": {
                          "type": "array",
                          "items": {
                            "type": "object"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "organizations_with_roles",
                            "json": "organizations_with_roles",
                            "yaml": "organizations_with_roles"
                          }
                        },
                        "total_count": {
                          "type": "integer",
                          "x-oapi-codegen-extra-tags": {
                            "db": "total_count",
                            "json": "total_count",
                            "yaml": "total_count"
                          }
                        }
                      }
                    }
                  },
                  "additionalProperties": false
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
        "tags": [
          "users"
        ],
        "operationId": "getUser",
        "summary": "Get current user profile",
        "responses": {
          "200": {
            "description": "Current user profile and role context",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Represents a user in Layer5 Cloud (Meshery)",
                  "required": [
                    "id",
                    "user_id",
                    "provider",
                    "email",
                    "first_name",
                    "last_name",
                    "status",
                    "created_at",
                    "updated_at",
                    "last_login_time",
                    "deleted_at"
                  ],
                  "properties": {
                    "id": {
                      "description": "Unique identifier for the user",
                      "x-go-name": "ID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id",
                        "json": "id",
                        "yaml": "id"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "user_id": {
                      "type": "string",
                      "maxLength": 200,
                      "description": "User identifier (username or external ID)",
                      "x-oapi-codegen-extra-tags": {
                        "db": "user_id",
                        "json": "user_id",
                        "yaml": "user_id"
                      }
                    },
                    "provider": {
                      "type": "string",
                      "maxLength": 100,
                      "description": "Authentication provider (e.g., Layer5 Cloud, Twitter, Facebook, Github)",
                      "example": [
                        "local",
                        "github",
                        "google",
                        "twitter"
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "db": "provider",
                        "json": "provider",
                        "yaml": "provider"
                      }
                    },
                    "email": {
                      "type": "string",
                      "format": "email",
                      "maxLength": 300,
                      "description": "User's email address",
                      "x-oapi-codegen-extra-tags": {
                        "db": "email",
                        "json": "email",
                        "yaml": "email"
                      }
                    },
                    "first_name": {
                      "type": "string",
                      "maxLength": 200,
                      "description": "User's first name",
                      "x-oapi-codegen-extra-tags": {
                        "db": "first_name",
                        "json": "first_name",
                        "yaml": "first_name"
                      }
                    },
                    "last_name": {
                      "type": "string",
                      "maxLength": 300,
                      "description": "User's last name",
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_name",
                        "json": "last_name",
                        "yaml": "last_name"
                      }
                    },
                    "avatar_url": {
                      "type": "string",
                      "format": "uri",
                      "maxLength": 500,
                      "description": "URL to user's avatar image",
                      "x-oapi-codegen-extra-tags": {
                        "db": "avatar_url",
                        "json": "avatar_url",
                        "yaml": "avatar_url"
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
                      "description": "User account status",
                      "x-oapi-codegen-extra-tags": {
                        "db": "status",
                        "json": "status",
                        "yaml": "status"
                      }
                    },
                    "bio": {
                      "type": "string",
                      "maxLength": 1000,
                      "default": "",
                      "description": "User's biography or description",
                      "x-oapi-codegen-extra-tags": {
                        "db": "bio",
                        "json": "bio",
                        "yaml": "bio"
                      }
                    },
                    "country": {
                      "type": "object",
                      "description": "User's country information stored as JSONB",
                      "additionalProperties": true,
                      "x-go-type": "core.Map",
                      "x-oapi-codegen-extra-tags": {
                        "db": "country",
                        "json": "country",
                        "yaml": "country"
                      }
                    },
                    "region": {
                      "type": "object",
                      "description": "User's region information stored as JSONB",
                      "additionalProperties": true,
                      "x-go-type": "core.Map",
                      "x-oapi-codegen-extra-tags": {
                        "db": "region",
                        "json": "region",
                        "yaml": "region"
                      }
                    },
                    "preferences": {
                      "x-go-type": "Preference",
                      "description": "User preferences stored as JSONB",
                      "x-oapi-codegen-extra-tags": {
                        "db": "preferences",
                        "json": "preferences",
                        "yaml": "preferences"
                      },
                      "x-generate-db-helpers": true,
                      "type": "object",
                      "required": [
                        "anonymousUsageStats",
                        "anonymousPerfResults",
                        "updated_at",
                        "dashboardPreferences",
                        "selectedOrganizationID",
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
                            "description": "Placeholder for Adapter struct definition."
                          }
                        },
                        "grafana": {
                          "x-go-type": "Grafana",
                          "type": "object",
                          "properties": {
                            "grafanaURL": {
                              "type": "string"
                            },
                            "grafanaAPIKey": {
                              "type": "string"
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
                                    }
                                  },
                                  "templateVars": {
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        "prometheus": {
                          "x-go-type": "Prometheus",
                          "type": "object",
                          "properties": {
                            "prometheusURL": {
                              "type": "string"
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
                                    }
                                  },
                                  "templateVars": {
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        "loadTestPrefs": {
                          "x-go-type": "LoadTestPreferences",
                          "type": "object",
                          "properties": {
                            "c": {
                              "type": "integer",
                              "description": "Concurrent requests"
                            },
                            "qps": {
                              "type": "integer",
                              "description": "Queries per second"
                            },
                            "t": {
                              "type": "string",
                              "description": "Duration"
                            },
                            "gen": {
                              "type": "string",
                              "description": "Load generator"
                            }
                          }
                        },
                        "anonymousUsageStats": {
                          "type": "boolean"
                        },
                        "anonymousPerfResults": {
                          "type": "boolean"
                        },
                        "updated_at": {
                          "type": "string",
                          "format": "date-time"
                        },
                        "dashboardPreferences": {
                          "type": "object",
                          "additionalProperties": true
                        },
                        "selectedOrganizationID": {
                          "type": "string"
                        },
                        "selectedWorkspaceForOrganizations": {
                          "type": "object",
                          "additionalProperties": {
                            "type": "string"
                          }
                        },
                        "usersExtensionPreferences": {
                          "type": "object",
                          "additionalProperties": true
                        },
                        "selectedK8sContexts": {
                          "type": "array",
                          "description": "Persisted selection of active Kubernetes context IDs",
                          "items": {
                            "type": "string"
                          }
                        },
                        "remoteProviderPreferences": {
                          "type": "object",
                          "additionalProperties": true
                        }
                      }
                    },
                    "accepted_terms_at": {
                      "description": "Timestamp when user accepted terms and conditions",
                      "x-oapi-codegen-extra-tags": {
                        "db": "accepted_terms_at",
                        "json": "accepted_terms_at",
                        "yaml": "accepted_terms_at"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "first_login_time": {
                      "description": "Timestamp of user's first login",
                      "x-oapi-codegen-extra-tags": {
                        "db": "first_login_time",
                        "json": "first_login_time",
                        "yaml": "first_login_time"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "last_login_time": {
                      "description": "Timestamp of user's most recent login",
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_login_time",
                        "json": "last_login_time",
                        "yaml": "last_login_time"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "created_at": {
                      "description": "Timestamp when the user record was created",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "created_at",
                        "yaml": "created_at"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updated_at": {
                      "description": "Timestamp when the user record was last updated",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updated_at",
                        "yaml": "updated_at"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "socials": {
                      "type": "array",
                      "description": "Various online profiles associated with the user account",
                      "x-go-type": "UserSocials",
                      "items": {
                        "x-go-type": "Social",
                        "description": "Various online profiles associated with the user account, like GitHub, LinkedIn, X, and so on.",
                        "type": "object",
                        "properties": {
                          "site": {
                            "type": "string",
                            "maxLength": 50
                          },
                          "link": {
                            "type": "string",
                            "format": "uri"
                          }
                        },
                        "required": [
                          "site",
                          "link"
                        ]
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "socials",
                        "json": "socials",
                        "yaml": "socials"
                      }
                    },
                    "deleted_at": {
                      "type": "string",
                      "format": "date-time",
                      "nullable": true,
                      "description": "Timestamp when the user record was soft-deleted (null if not deleted)",
                      "x-go-type": "core.NullTime",
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deleted_at",
                        "yaml": "deleted_at"
                      }
                    },
                    "role_names": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "enum": [
                          "admin",
                          "meshmap",
                          "curator",
                          "team admin",
                          "workspace admin",
                          "workspace manager",
                          "organization admin",
                          "user"
                        ]
                      },
                      "description": "List of global roles assigned to the user",
                      "example": [
                        "admin",
                        "meshmap"
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "db": "role_names",
                        "json": "role_names",
                        "yaml": "role_names"
                      }
                    },
                    "teams": {
                      "type": "object",
                      "description": "Teams the user belongs to with role information",
                      "x-oapi-codegen-extra-tags": {
                        "db": "teams",
                        "json": "teams",
                        "yaml": "teams"
                      },
                      "properties": {
                        "teams_with_roles": {
                          "type": "array",
                          "items": {
                            "type": "object"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "teams_with_roles",
                            "json": "teams_with_roles",
                            "yaml": "teams_with_roles"
                          }
                        },
                        "total_count": {
                          "type": "integer",
                          "x-oapi-codegen-extra-tags": {
                            "db": "total_count",
                            "json": "total_count",
                            "yaml": "total_count"
                          }
                        }
                      }
                    },
                    "organizations": {
                      "type": "object",
                      "description": "Organizations the user belongs to with role information",
                      "x-oapi-codegen-extra-tags": {
                        "db": "organizations",
                        "json": "organizations",
                        "yaml": "organizations"
                      },
                      "properties": {
                        "organizations_with_roles": {
                          "type": "array",
                          "items": {
                            "type": "object"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "organizations_with_roles",
                            "json": "organizations_with_roles",
                            "yaml": "organizations_with_roles"
                          }
                        },
                        "total_count": {
                          "type": "integer",
                          "x-oapi-codegen-extra-tags": {
                            "db": "total_count",
                            "json": "total_count",
                            "yaml": "total_count"
                          }
                        }
                      }
                    }
                  },
                  "additionalProperties": false
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
    "/api/user/prefs": {
      "get": {
        "tags": [
          "users"
        ],
        "operationId": "getUserPrefs",
        "summary": "Get user preferences",
        "description": "Returns the current user's preferences including selected K8s contexts, load test settings, and other UI preferences.",
        "x-internal": [
          "meshery"
        ],
        "responses": {
          "200": {
            "description": "User preferences",
            "content": {
              "application/json": {
                "schema": {
                  "x-generate-db-helpers": true,
                  "type": "object",
                  "required": [
                    "anonymousUsageStats",
                    "anonymousPerfResults",
                    "updated_at",
                    "dashboardPreferences",
                    "selectedOrganizationID",
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
                        "description": "Placeholder for Adapter struct definition."
                      }
                    },
                    "grafana": {
                      "x-go-type": "Grafana",
                      "type": "object",
                      "properties": {
                        "grafanaURL": {
                          "type": "string"
                        },
                        "grafanaAPIKey": {
                          "type": "string"
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
                                }
                              },
                              "templateVars": {
                                "type": "array",
                                "items": {
                                  "type": "string"
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "prometheus": {
                      "x-go-type": "Prometheus",
                      "type": "object",
                      "properties": {
                        "prometheusURL": {
                          "type": "string"
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
                                }
                              },
                              "templateVars": {
                                "type": "array",
                                "items": {
                                  "type": "string"
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "loadTestPrefs": {
                      "x-go-type": "LoadTestPreferences",
                      "type": "object",
                      "properties": {
                        "c": {
                          "type": "integer",
                          "description": "Concurrent requests"
                        },
                        "qps": {
                          "type": "integer",
                          "description": "Queries per second"
                        },
                        "t": {
                          "type": "string",
                          "description": "Duration"
                        },
                        "gen": {
                          "type": "string",
                          "description": "Load generator"
                        }
                      }
                    },
                    "anonymousUsageStats": {
                      "type": "boolean"
                    },
                    "anonymousPerfResults": {
                      "type": "boolean"
                    },
                    "updated_at": {
                      "type": "string",
                      "format": "date-time"
                    },
                    "dashboardPreferences": {
                      "type": "object",
                      "additionalProperties": true
                    },
                    "selectedOrganizationID": {
                      "type": "string"
                    },
                    "selectedWorkspaceForOrganizations": {
                      "type": "object",
                      "additionalProperties": {
                        "type": "string"
                      }
                    },
                    "usersExtensionPreferences": {
                      "type": "object",
                      "additionalProperties": true
                    },
                    "selectedK8sContexts": {
                      "type": "array",
                      "description": "Persisted selection of active Kubernetes context IDs",
                      "items": {
                        "type": "string"
                      }
                    },
                    "remoteProviderPreferences": {
                      "type": "object",
                      "additionalProperties": true
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
        "tags": [
          "users"
        ],
        "operationId": "updateUserPrefs",
        "summary": "Update user preferences",
        "description": "Merges the provided fields into the current user's preferences. Only the fields present in the request body are updated.",
        "x-internal": [
          "meshery"
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "x-generate-db-helpers": true,
                "type": "object",
                "required": [
                  "anonymousUsageStats",
                  "anonymousPerfResults",
                  "updated_at",
                  "dashboardPreferences",
                  "selectedOrganizationID",
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
                      "description": "Placeholder for Adapter struct definition."
                    }
                  },
                  "grafana": {
                    "x-go-type": "Grafana",
                    "type": "object",
                    "properties": {
                      "grafanaURL": {
                        "type": "string"
                      },
                      "grafanaAPIKey": {
                        "type": "string"
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
                              }
                            },
                            "templateVars": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "prometheus": {
                    "x-go-type": "Prometheus",
                    "type": "object",
                    "properties": {
                      "prometheusURL": {
                        "type": "string"
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
                              }
                            },
                            "templateVars": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "loadTestPrefs": {
                    "x-go-type": "LoadTestPreferences",
                    "type": "object",
                    "properties": {
                      "c": {
                        "type": "integer",
                        "description": "Concurrent requests"
                      },
                      "qps": {
                        "type": "integer",
                        "description": "Queries per second"
                      },
                      "t": {
                        "type": "string",
                        "description": "Duration"
                      },
                      "gen": {
                        "type": "string",
                        "description": "Load generator"
                      }
                    }
                  },
                  "anonymousUsageStats": {
                    "type": "boolean"
                  },
                  "anonymousPerfResults": {
                    "type": "boolean"
                  },
                  "updated_at": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "dashboardPreferences": {
                    "type": "object",
                    "additionalProperties": true
                  },
                  "selectedOrganizationID": {
                    "type": "string"
                  },
                  "selectedWorkspaceForOrganizations": {
                    "type": "object",
                    "additionalProperties": {
                      "type": "string"
                    }
                  },
                  "usersExtensionPreferences": {
                    "type": "object",
                    "additionalProperties": true
                  },
                  "selectedK8sContexts": {
                    "type": "array",
                    "description": "Persisted selection of active Kubernetes context IDs",
                    "items": {
                      "type": "string"
                    }
                  },
                  "remoteProviderPreferences": {
                    "type": "object",
                    "additionalProperties": true
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Updated user preferences",
            "content": {
              "application/json": {
                "schema": {
                  "x-generate-db-helpers": true,
                  "type": "object",
                  "required": [
                    "anonymousUsageStats",
                    "anonymousPerfResults",
                    "updated_at",
                    "dashboardPreferences",
                    "selectedOrganizationID",
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
                        "description": "Placeholder for Adapter struct definition."
                      }
                    },
                    "grafana": {
                      "x-go-type": "Grafana",
                      "type": "object",
                      "properties": {
                        "grafanaURL": {
                          "type": "string"
                        },
                        "grafanaAPIKey": {
                          "type": "string"
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
                                }
                              },
                              "templateVars": {
                                "type": "array",
                                "items": {
                                  "type": "string"
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "prometheus": {
                      "x-go-type": "Prometheus",
                      "type": "object",
                      "properties": {
                        "prometheusURL": {
                          "type": "string"
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
                                }
                              },
                              "templateVars": {
                                "type": "array",
                                "items": {
                                  "type": "string"
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "loadTestPrefs": {
                      "x-go-type": "LoadTestPreferences",
                      "type": "object",
                      "properties": {
                        "c": {
                          "type": "integer",
                          "description": "Concurrent requests"
                        },
                        "qps": {
                          "type": "integer",
                          "description": "Queries per second"
                        },
                        "t": {
                          "type": "string",
                          "description": "Duration"
                        },
                        "gen": {
                          "type": "string",
                          "description": "Load generator"
                        }
                      }
                    },
                    "anonymousUsageStats": {
                      "type": "boolean"
                    },
                    "anonymousPerfResults": {
                      "type": "boolean"
                    },
                    "updated_at": {
                      "type": "string",
                      "format": "date-time"
                    },
                    "dashboardPreferences": {
                      "type": "object",
                      "additionalProperties": true
                    },
                    "selectedOrganizationID": {
                      "type": "string"
                    },
                    "selectedWorkspaceForOrganizations": {
                      "type": "object",
                      "additionalProperties": {
                        "type": "string"
                      }
                    },
                    "usersExtensionPreferences": {
                      "type": "object",
                      "additionalProperties": true
                    },
                    "selectedK8sContexts": {
                      "type": "array",
                      "description": "Persisted selection of active Kubernetes context IDs",
                      "items": {
                        "type": "string"
                      }
                    },
                    "remoteProviderPreferences": {
                      "type": "object",
                      "additionalProperties": true
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
          "x-go-type": "uuid.UUID",
          "x-go-type-import": {
            "path": "github.com/gofrs/uuid"
          },
          "x-oapi-codegen-extra-tags": {
            "db": "org_id",
            "json": "org_id"
          },
          "x-go-type-name": "OrganizationId",
          "x-go-type-skip-optional-pointer": true
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
      "filter": {
        "name": "filter",
        "in": "query",
        "description": "Get filtered reponses",
        "schema": {
          "type": "string"
        }
      },
      "teamID": {
        "name": "teamID",
        "in": "query",
        "required": false,
        "description": "Optional team filter when listing organization users",
        "schema": {
          "type": "string",
          "format": "uuid",
          "x-go-type": "uuid.UUID",
          "x-go-type-import": {
            "path": "github.com/gofrs/uuid"
          },
          "x-oapi-codegen-extra-tags": {
            "db": "team_id",
            "json": "team_id"
          },
          "x-go-type-name": "TeamId",
          "x-go-type-skip-optional-pointer": true
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
        "type": "object",
        "description": "Represents a user in Layer5 Cloud (Meshery)",
        "required": [
          "id",
          "user_id",
          "provider",
          "email",
          "first_name",
          "last_name",
          "status",
          "created_at",
          "updated_at",
          "last_login_time",
          "deleted_at"
        ],
        "properties": {
          "id": {
            "description": "Unique identifier for the user",
            "x-go-name": "ID",
            "x-oapi-codegen-extra-tags": {
              "db": "id",
              "json": "id",
              "yaml": "id"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "user_id": {
            "type": "string",
            "maxLength": 200,
            "description": "User identifier (username or external ID)",
            "x-oapi-codegen-extra-tags": {
              "db": "user_id",
              "json": "user_id",
              "yaml": "user_id"
            }
          },
          "provider": {
            "type": "string",
            "maxLength": 100,
            "description": "Authentication provider (e.g., Layer5 Cloud, Twitter, Facebook, Github)",
            "example": [
              "local",
              "github",
              "google",
              "twitter"
            ],
            "x-oapi-codegen-extra-tags": {
              "db": "provider",
              "json": "provider",
              "yaml": "provider"
            }
          },
          "email": {
            "type": "string",
            "format": "email",
            "maxLength": 300,
            "description": "User's email address",
            "x-oapi-codegen-extra-tags": {
              "db": "email",
              "json": "email",
              "yaml": "email"
            }
          },
          "first_name": {
            "type": "string",
            "maxLength": 200,
            "description": "User's first name",
            "x-oapi-codegen-extra-tags": {
              "db": "first_name",
              "json": "first_name",
              "yaml": "first_name"
            }
          },
          "last_name": {
            "type": "string",
            "maxLength": 300,
            "description": "User's last name",
            "x-oapi-codegen-extra-tags": {
              "db": "last_name",
              "json": "last_name",
              "yaml": "last_name"
            }
          },
          "avatar_url": {
            "type": "string",
            "format": "uri",
            "maxLength": 500,
            "description": "URL to user's avatar image",
            "x-oapi-codegen-extra-tags": {
              "db": "avatar_url",
              "json": "avatar_url",
              "yaml": "avatar_url"
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
            "description": "User account status",
            "x-oapi-codegen-extra-tags": {
              "db": "status",
              "json": "status",
              "yaml": "status"
            }
          },
          "bio": {
            "type": "string",
            "maxLength": 1000,
            "default": "",
            "description": "User's biography or description",
            "x-oapi-codegen-extra-tags": {
              "db": "bio",
              "json": "bio",
              "yaml": "bio"
            }
          },
          "country": {
            "type": "object",
            "description": "User's country information stored as JSONB",
            "additionalProperties": true,
            "x-go-type": "core.Map",
            "x-oapi-codegen-extra-tags": {
              "db": "country",
              "json": "country",
              "yaml": "country"
            }
          },
          "region": {
            "type": "object",
            "description": "User's region information stored as JSONB",
            "additionalProperties": true,
            "x-go-type": "core.Map",
            "x-oapi-codegen-extra-tags": {
              "db": "region",
              "json": "region",
              "yaml": "region"
            }
          },
          "preferences": {
            "x-go-type": "Preference",
            "description": "User preferences stored as JSONB",
            "x-oapi-codegen-extra-tags": {
              "db": "preferences",
              "json": "preferences",
              "yaml": "preferences"
            },
            "x-generate-db-helpers": true,
            "type": "object",
            "required": [
              "anonymousUsageStats",
              "anonymousPerfResults",
              "updated_at",
              "dashboardPreferences",
              "selectedOrganizationID",
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
                  "description": "Placeholder for Adapter struct definition."
                }
              },
              "grafana": {
                "x-go-type": "Grafana",
                "type": "object",
                "properties": {
                  "grafanaURL": {
                    "type": "string"
                  },
                  "grafanaAPIKey": {
                    "type": "string"
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
                          }
                        },
                        "templateVars": {
                          "type": "array",
                          "items": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  }
                }
              },
              "prometheus": {
                "x-go-type": "Prometheus",
                "type": "object",
                "properties": {
                  "prometheusURL": {
                    "type": "string"
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
                          }
                        },
                        "templateVars": {
                          "type": "array",
                          "items": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  }
                }
              },
              "loadTestPrefs": {
                "x-go-type": "LoadTestPreferences",
                "type": "object",
                "properties": {
                  "c": {
                    "type": "integer",
                    "description": "Concurrent requests"
                  },
                  "qps": {
                    "type": "integer",
                    "description": "Queries per second"
                  },
                  "t": {
                    "type": "string",
                    "description": "Duration"
                  },
                  "gen": {
                    "type": "string",
                    "description": "Load generator"
                  }
                }
              },
              "anonymousUsageStats": {
                "type": "boolean"
              },
              "anonymousPerfResults": {
                "type": "boolean"
              },
              "updated_at": {
                "type": "string",
                "format": "date-time"
              },
              "dashboardPreferences": {
                "type": "object",
                "additionalProperties": true
              },
              "selectedOrganizationID": {
                "type": "string"
              },
              "selectedWorkspaceForOrganizations": {
                "type": "object",
                "additionalProperties": {
                  "type": "string"
                }
              },
              "usersExtensionPreferences": {
                "type": "object",
                "additionalProperties": true
              },
              "selectedK8sContexts": {
                "type": "array",
                "description": "Persisted selection of active Kubernetes context IDs",
                "items": {
                  "type": "string"
                }
              },
              "remoteProviderPreferences": {
                "type": "object",
                "additionalProperties": true
              }
            }
          },
          "accepted_terms_at": {
            "description": "Timestamp when user accepted terms and conditions",
            "x-oapi-codegen-extra-tags": {
              "db": "accepted_terms_at",
              "json": "accepted_terms_at",
              "yaml": "accepted_terms_at"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "first_login_time": {
            "description": "Timestamp of user's first login",
            "x-oapi-codegen-extra-tags": {
              "db": "first_login_time",
              "json": "first_login_time",
              "yaml": "first_login_time"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "last_login_time": {
            "description": "Timestamp of user's most recent login",
            "x-oapi-codegen-extra-tags": {
              "db": "last_login_time",
              "json": "last_login_time",
              "yaml": "last_login_time"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "created_at": {
            "description": "Timestamp when the user record was created",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at",
              "json": "created_at",
              "yaml": "created_at"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updated_at": {
            "description": "Timestamp when the user record was last updated",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at",
              "json": "updated_at",
              "yaml": "updated_at"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "socials": {
            "type": "array",
            "description": "Various online profiles associated with the user account",
            "x-go-type": "UserSocials",
            "items": {
              "x-go-type": "Social",
              "description": "Various online profiles associated with the user account, like GitHub, LinkedIn, X, and so on.",
              "type": "object",
              "properties": {
                "site": {
                  "type": "string",
                  "maxLength": 50
                },
                "link": {
                  "type": "string",
                  "format": "uri"
                }
              },
              "required": [
                "site",
                "link"
              ]
            },
            "x-oapi-codegen-extra-tags": {
              "db": "socials",
              "json": "socials",
              "yaml": "socials"
            }
          },
          "deleted_at": {
            "type": "string",
            "format": "date-time",
            "nullable": true,
            "description": "Timestamp when the user record was soft-deleted (null if not deleted)",
            "x-go-type": "core.NullTime",
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at",
              "json": "deleted_at",
              "yaml": "deleted_at"
            }
          },
          "role_names": {
            "type": "array",
            "items": {
              "type": "string",
              "enum": [
                "admin",
                "meshmap",
                "curator",
                "team admin",
                "workspace admin",
                "workspace manager",
                "organization admin",
                "user"
              ]
            },
            "description": "List of global roles assigned to the user",
            "example": [
              "admin",
              "meshmap"
            ],
            "x-oapi-codegen-extra-tags": {
              "db": "role_names",
              "json": "role_names",
              "yaml": "role_names"
            }
          },
          "teams": {
            "type": "object",
            "description": "Teams the user belongs to with role information",
            "x-oapi-codegen-extra-tags": {
              "db": "teams",
              "json": "teams",
              "yaml": "teams"
            },
            "properties": {
              "teams_with_roles": {
                "type": "array",
                "items": {
                  "type": "object"
                },
                "x-oapi-codegen-extra-tags": {
                  "db": "teams_with_roles",
                  "json": "teams_with_roles",
                  "yaml": "teams_with_roles"
                }
              },
              "total_count": {
                "type": "integer",
                "x-oapi-codegen-extra-tags": {
                  "db": "total_count",
                  "json": "total_count",
                  "yaml": "total_count"
                }
              }
            }
          },
          "organizations": {
            "type": "object",
            "description": "Organizations the user belongs to with role information",
            "x-oapi-codegen-extra-tags": {
              "db": "organizations",
              "json": "organizations",
              "yaml": "organizations"
            },
            "properties": {
              "organizations_with_roles": {
                "type": "array",
                "items": {
                  "type": "object"
                },
                "x-oapi-codegen-extra-tags": {
                  "db": "organizations_with_roles",
                  "json": "organizations_with_roles",
                  "yaml": "organizations_with_roles"
                }
              },
              "total_count": {
                "type": "integer",
                "x-oapi-codegen-extra-tags": {
                  "db": "total_count",
                  "json": "total_count",
                  "yaml": "total_count"
                }
              }
            }
          }
        },
        "additionalProperties": false
      },
      "UsersPageForAdmin": {
        "type": "object",
        "description": "Paginated list of users with organization and team role context",
        "properties": {
          "page": {
            "type": "integer"
          },
          "page_size": {
            "type": "integer"
          },
          "total_count": {
            "type": "integer"
          },
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "description": "Represents a user in Layer5 Cloud (Meshery)",
              "required": [
                "id",
                "user_id",
                "provider",
                "email",
                "first_name",
                "last_name",
                "status",
                "created_at",
                "updated_at",
                "last_login_time",
                "deleted_at"
              ],
              "properties": {
                "id": {
                  "description": "Unique identifier for the user",
                  "x-go-name": "ID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "id",
                    "json": "id",
                    "yaml": "id"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "user_id": {
                  "type": "string",
                  "maxLength": 200,
                  "description": "User identifier (username or external ID)",
                  "x-oapi-codegen-extra-tags": {
                    "db": "user_id",
                    "json": "user_id",
                    "yaml": "user_id"
                  }
                },
                "provider": {
                  "type": "string",
                  "maxLength": 100,
                  "description": "Authentication provider (e.g., Layer5 Cloud, Twitter, Facebook, Github)",
                  "example": [
                    "local",
                    "github",
                    "google",
                    "twitter"
                  ],
                  "x-oapi-codegen-extra-tags": {
                    "db": "provider",
                    "json": "provider",
                    "yaml": "provider"
                  }
                },
                "email": {
                  "type": "string",
                  "format": "email",
                  "maxLength": 300,
                  "description": "User's email address",
                  "x-oapi-codegen-extra-tags": {
                    "db": "email",
                    "json": "email",
                    "yaml": "email"
                  }
                },
                "first_name": {
                  "type": "string",
                  "maxLength": 200,
                  "description": "User's first name",
                  "x-oapi-codegen-extra-tags": {
                    "db": "first_name",
                    "json": "first_name",
                    "yaml": "first_name"
                  }
                },
                "last_name": {
                  "type": "string",
                  "maxLength": 300,
                  "description": "User's last name",
                  "x-oapi-codegen-extra-tags": {
                    "db": "last_name",
                    "json": "last_name",
                    "yaml": "last_name"
                  }
                },
                "avatar_url": {
                  "type": "string",
                  "format": "uri",
                  "maxLength": 500,
                  "description": "URL to user's avatar image",
                  "x-oapi-codegen-extra-tags": {
                    "db": "avatar_url",
                    "json": "avatar_url",
                    "yaml": "avatar_url"
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
                  "description": "User account status",
                  "x-oapi-codegen-extra-tags": {
                    "db": "status",
                    "json": "status",
                    "yaml": "status"
                  }
                },
                "bio": {
                  "type": "string",
                  "maxLength": 1000,
                  "default": "",
                  "description": "User's biography or description",
                  "x-oapi-codegen-extra-tags": {
                    "db": "bio",
                    "json": "bio",
                    "yaml": "bio"
                  }
                },
                "country": {
                  "type": "object",
                  "description": "User's country information stored as JSONB",
                  "additionalProperties": true,
                  "x-go-type": "core.Map",
                  "x-oapi-codegen-extra-tags": {
                    "db": "country",
                    "json": "country",
                    "yaml": "country"
                  }
                },
                "region": {
                  "type": "object",
                  "description": "User's region information stored as JSONB",
                  "additionalProperties": true,
                  "x-go-type": "core.Map",
                  "x-oapi-codegen-extra-tags": {
                    "db": "region",
                    "json": "region",
                    "yaml": "region"
                  }
                },
                "preferences": {
                  "x-go-type": "Preference",
                  "description": "User preferences stored as JSONB",
                  "x-oapi-codegen-extra-tags": {
                    "db": "preferences",
                    "json": "preferences",
                    "yaml": "preferences"
                  },
                  "x-generate-db-helpers": true,
                  "type": "object",
                  "required": [
                    "anonymousUsageStats",
                    "anonymousPerfResults",
                    "updated_at",
                    "dashboardPreferences",
                    "selectedOrganizationID",
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
                        "description": "Placeholder for Adapter struct definition."
                      }
                    },
                    "grafana": {
                      "x-go-type": "Grafana",
                      "type": "object",
                      "properties": {
                        "grafanaURL": {
                          "type": "string"
                        },
                        "grafanaAPIKey": {
                          "type": "string"
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
                                }
                              },
                              "templateVars": {
                                "type": "array",
                                "items": {
                                  "type": "string"
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "prometheus": {
                      "x-go-type": "Prometheus",
                      "type": "object",
                      "properties": {
                        "prometheusURL": {
                          "type": "string"
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
                                }
                              },
                              "templateVars": {
                                "type": "array",
                                "items": {
                                  "type": "string"
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "loadTestPrefs": {
                      "x-go-type": "LoadTestPreferences",
                      "type": "object",
                      "properties": {
                        "c": {
                          "type": "integer",
                          "description": "Concurrent requests"
                        },
                        "qps": {
                          "type": "integer",
                          "description": "Queries per second"
                        },
                        "t": {
                          "type": "string",
                          "description": "Duration"
                        },
                        "gen": {
                          "type": "string",
                          "description": "Load generator"
                        }
                      }
                    },
                    "anonymousUsageStats": {
                      "type": "boolean"
                    },
                    "anonymousPerfResults": {
                      "type": "boolean"
                    },
                    "updated_at": {
                      "type": "string",
                      "format": "date-time"
                    },
                    "dashboardPreferences": {
                      "type": "object",
                      "additionalProperties": true
                    },
                    "selectedOrganizationID": {
                      "type": "string"
                    },
                    "selectedWorkspaceForOrganizations": {
                      "type": "object",
                      "additionalProperties": {
                        "type": "string"
                      }
                    },
                    "usersExtensionPreferences": {
                      "type": "object",
                      "additionalProperties": true
                    },
                    "selectedK8sContexts": {
                      "type": "array",
                      "description": "Persisted selection of active Kubernetes context IDs",
                      "items": {
                        "type": "string"
                      }
                    },
                    "remoteProviderPreferences": {
                      "type": "object",
                      "additionalProperties": true
                    }
                  }
                },
                "accepted_terms_at": {
                  "description": "Timestamp when user accepted terms and conditions",
                  "x-oapi-codegen-extra-tags": {
                    "db": "accepted_terms_at",
                    "json": "accepted_terms_at",
                    "yaml": "accepted_terms_at"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "first_login_time": {
                  "description": "Timestamp of user's first login",
                  "x-oapi-codegen-extra-tags": {
                    "db": "first_login_time",
                    "json": "first_login_time",
                    "yaml": "first_login_time"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "last_login_time": {
                  "description": "Timestamp of user's most recent login",
                  "x-oapi-codegen-extra-tags": {
                    "db": "last_login_time",
                    "json": "last_login_time",
                    "yaml": "last_login_time"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "created_at": {
                  "description": "Timestamp when the user record was created",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at",
                    "json": "created_at",
                    "yaml": "created_at"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updated_at": {
                  "description": "Timestamp when the user record was last updated",
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at",
                    "json": "updated_at",
                    "yaml": "updated_at"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "socials": {
                  "type": "array",
                  "description": "Various online profiles associated with the user account",
                  "x-go-type": "UserSocials",
                  "items": {
                    "x-go-type": "Social",
                    "description": "Various online profiles associated with the user account, like GitHub, LinkedIn, X, and so on.",
                    "type": "object",
                    "properties": {
                      "site": {
                        "type": "string",
                        "maxLength": 50
                      },
                      "link": {
                        "type": "string",
                        "format": "uri"
                      }
                    },
                    "required": [
                      "site",
                      "link"
                    ]
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "socials",
                    "json": "socials",
                    "yaml": "socials"
                  }
                },
                "deleted_at": {
                  "type": "string",
                  "format": "date-time",
                  "nullable": true,
                  "description": "Timestamp when the user record was soft-deleted (null if not deleted)",
                  "x-go-type": "core.NullTime",
                  "x-oapi-codegen-extra-tags": {
                    "db": "deleted_at",
                    "json": "deleted_at",
                    "yaml": "deleted_at"
                  }
                },
                "role_names": {
                  "type": "array",
                  "items": {
                    "type": "string",
                    "enum": [
                      "admin",
                      "meshmap",
                      "curator",
                      "team admin",
                      "workspace admin",
                      "workspace manager",
                      "organization admin",
                      "user"
                    ]
                  },
                  "description": "List of global roles assigned to the user",
                  "example": [
                    "admin",
                    "meshmap"
                  ],
                  "x-oapi-codegen-extra-tags": {
                    "db": "role_names",
                    "json": "role_names",
                    "yaml": "role_names"
                  }
                },
                "teams": {
                  "type": "object",
                  "description": "Teams the user belongs to with role information",
                  "x-oapi-codegen-extra-tags": {
                    "db": "teams",
                    "json": "teams",
                    "yaml": "teams"
                  },
                  "properties": {
                    "teams_with_roles": {
                      "type": "array",
                      "items": {
                        "type": "object"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "teams_with_roles",
                        "json": "teams_with_roles",
                        "yaml": "teams_with_roles"
                      }
                    },
                    "total_count": {
                      "type": "integer",
                      "x-oapi-codegen-extra-tags": {
                        "db": "total_count",
                        "json": "total_count",
                        "yaml": "total_count"
                      }
                    }
                  }
                },
                "organizations": {
                  "type": "object",
                  "description": "Organizations the user belongs to with role information",
                  "x-oapi-codegen-extra-tags": {
                    "db": "organizations",
                    "json": "organizations",
                    "yaml": "organizations"
                  },
                  "properties": {
                    "organizations_with_roles": {
                      "type": "array",
                      "items": {
                        "type": "object"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "organizations_with_roles",
                        "json": "organizations_with_roles",
                        "yaml": "organizations_with_roles"
                      }
                    },
                    "total_count": {
                      "type": "integer",
                      "x-oapi-codegen-extra-tags": {
                        "db": "total_count",
                        "json": "total_count",
                        "yaml": "total_count"
                      }
                    }
                  }
                }
              },
              "additionalProperties": false
            }
          }
        }
      },
      "UsersPageForNonAdmin": {
        "type": "object",
        "description": "Paginated list of public user records",
        "properties": {
          "page": {
            "type": "integer"
          },
          "page_size": {
            "type": "integer"
          },
          "total_count": {
            "type": "integer"
          },
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "description": "Represents a user in Layer5 Cloud (Meshery)",
              "required": [
                "id",
                "user_id",
                "provider",
                "email",
                "first_name",
                "last_name",
                "status",
                "created_at",
                "updated_at",
                "last_login_time",
                "deleted_at"
              ],
              "properties": {
                "id": {
                  "description": "Unique identifier for the user",
                  "x-go-name": "ID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "id",
                    "json": "id",
                    "yaml": "id"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "user_id": {
                  "type": "string",
                  "maxLength": 200,
                  "description": "User identifier (username or external ID)",
                  "x-oapi-codegen-extra-tags": {
                    "db": "user_id",
                    "json": "user_id",
                    "yaml": "user_id"
                  }
                },
                "provider": {
                  "type": "string",
                  "maxLength": 100,
                  "description": "Authentication provider (e.g., Layer5 Cloud, Twitter, Facebook, Github)",
                  "example": [
                    "local",
                    "github",
                    "google",
                    "twitter"
                  ],
                  "x-oapi-codegen-extra-tags": {
                    "db": "provider",
                    "json": "provider",
                    "yaml": "provider"
                  }
                },
                "email": {
                  "type": "string",
                  "format": "email",
                  "maxLength": 300,
                  "description": "User's email address",
                  "x-oapi-codegen-extra-tags": {
                    "db": "email",
                    "json": "email",
                    "yaml": "email"
                  }
                },
                "first_name": {
                  "type": "string",
                  "maxLength": 200,
                  "description": "User's first name",
                  "x-oapi-codegen-extra-tags": {
                    "db": "first_name",
                    "json": "first_name",
                    "yaml": "first_name"
                  }
                },
                "last_name": {
                  "type": "string",
                  "maxLength": 300,
                  "description": "User's last name",
                  "x-oapi-codegen-extra-tags": {
                    "db": "last_name",
                    "json": "last_name",
                    "yaml": "last_name"
                  }
                },
                "avatar_url": {
                  "type": "string",
                  "format": "uri",
                  "maxLength": 500,
                  "description": "URL to user's avatar image",
                  "x-oapi-codegen-extra-tags": {
                    "db": "avatar_url",
                    "json": "avatar_url",
                    "yaml": "avatar_url"
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
                  "description": "User account status",
                  "x-oapi-codegen-extra-tags": {
                    "db": "status",
                    "json": "status",
                    "yaml": "status"
                  }
                },
                "bio": {
                  "type": "string",
                  "maxLength": 1000,
                  "default": "",
                  "description": "User's biography or description",
                  "x-oapi-codegen-extra-tags": {
                    "db": "bio",
                    "json": "bio",
                    "yaml": "bio"
                  }
                },
                "country": {
                  "type": "object",
                  "description": "User's country information stored as JSONB",
                  "additionalProperties": true,
                  "x-go-type": "core.Map",
                  "x-oapi-codegen-extra-tags": {
                    "db": "country",
                    "json": "country",
                    "yaml": "country"
                  }
                },
                "region": {
                  "type": "object",
                  "description": "User's region information stored as JSONB",
                  "additionalProperties": true,
                  "x-go-type": "core.Map",
                  "x-oapi-codegen-extra-tags": {
                    "db": "region",
                    "json": "region",
                    "yaml": "region"
                  }
                },
                "preferences": {
                  "x-go-type": "Preference",
                  "description": "User preferences stored as JSONB",
                  "x-oapi-codegen-extra-tags": {
                    "db": "preferences",
                    "json": "preferences",
                    "yaml": "preferences"
                  },
                  "x-generate-db-helpers": true,
                  "type": "object",
                  "required": [
                    "anonymousUsageStats",
                    "anonymousPerfResults",
                    "updated_at",
                    "dashboardPreferences",
                    "selectedOrganizationID",
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
                        "description": "Placeholder for Adapter struct definition."
                      }
                    },
                    "grafana": {
                      "x-go-type": "Grafana",
                      "type": "object",
                      "properties": {
                        "grafanaURL": {
                          "type": "string"
                        },
                        "grafanaAPIKey": {
                          "type": "string"
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
                                }
                              },
                              "templateVars": {
                                "type": "array",
                                "items": {
                                  "type": "string"
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "prometheus": {
                      "x-go-type": "Prometheus",
                      "type": "object",
                      "properties": {
                        "prometheusURL": {
                          "type": "string"
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
                                }
                              },
                              "templateVars": {
                                "type": "array",
                                "items": {
                                  "type": "string"
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "loadTestPrefs": {
                      "x-go-type": "LoadTestPreferences",
                      "type": "object",
                      "properties": {
                        "c": {
                          "type": "integer",
                          "description": "Concurrent requests"
                        },
                        "qps": {
                          "type": "integer",
                          "description": "Queries per second"
                        },
                        "t": {
                          "type": "string",
                          "description": "Duration"
                        },
                        "gen": {
                          "type": "string",
                          "description": "Load generator"
                        }
                      }
                    },
                    "anonymousUsageStats": {
                      "type": "boolean"
                    },
                    "anonymousPerfResults": {
                      "type": "boolean"
                    },
                    "updated_at": {
                      "type": "string",
                      "format": "date-time"
                    },
                    "dashboardPreferences": {
                      "type": "object",
                      "additionalProperties": true
                    },
                    "selectedOrganizationID": {
                      "type": "string"
                    },
                    "selectedWorkspaceForOrganizations": {
                      "type": "object",
                      "additionalProperties": {
                        "type": "string"
                      }
                    },
                    "usersExtensionPreferences": {
                      "type": "object",
                      "additionalProperties": true
                    },
                    "selectedK8sContexts": {
                      "type": "array",
                      "description": "Persisted selection of active Kubernetes context IDs",
                      "items": {
                        "type": "string"
                      }
                    },
                    "remoteProviderPreferences": {
                      "type": "object",
                      "additionalProperties": true
                    }
                  }
                },
                "accepted_terms_at": {
                  "description": "Timestamp when user accepted terms and conditions",
                  "x-oapi-codegen-extra-tags": {
                    "db": "accepted_terms_at",
                    "json": "accepted_terms_at",
                    "yaml": "accepted_terms_at"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "first_login_time": {
                  "description": "Timestamp of user's first login",
                  "x-oapi-codegen-extra-tags": {
                    "db": "first_login_time",
                    "json": "first_login_time",
                    "yaml": "first_login_time"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "last_login_time": {
                  "description": "Timestamp of user's most recent login",
                  "x-oapi-codegen-extra-tags": {
                    "db": "last_login_time",
                    "json": "last_login_time",
                    "yaml": "last_login_time"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "created_at": {
                  "description": "Timestamp when the user record was created",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at",
                    "json": "created_at",
                    "yaml": "created_at"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updated_at": {
                  "description": "Timestamp when the user record was last updated",
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at",
                    "json": "updated_at",
                    "yaml": "updated_at"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "socials": {
                  "type": "array",
                  "description": "Various online profiles associated with the user account",
                  "x-go-type": "UserSocials",
                  "items": {
                    "x-go-type": "Social",
                    "description": "Various online profiles associated with the user account, like GitHub, LinkedIn, X, and so on.",
                    "type": "object",
                    "properties": {
                      "site": {
                        "type": "string",
                        "maxLength": 50
                      },
                      "link": {
                        "type": "string",
                        "format": "uri"
                      }
                    },
                    "required": [
                      "site",
                      "link"
                    ]
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "socials",
                    "json": "socials",
                    "yaml": "socials"
                  }
                },
                "deleted_at": {
                  "type": "string",
                  "format": "date-time",
                  "nullable": true,
                  "description": "Timestamp when the user record was soft-deleted (null if not deleted)",
                  "x-go-type": "core.NullTime",
                  "x-oapi-codegen-extra-tags": {
                    "db": "deleted_at",
                    "json": "deleted_at",
                    "yaml": "deleted_at"
                  }
                },
                "role_names": {
                  "type": "array",
                  "items": {
                    "type": "string",
                    "enum": [
                      "admin",
                      "meshmap",
                      "curator",
                      "team admin",
                      "workspace admin",
                      "workspace manager",
                      "organization admin",
                      "user"
                    ]
                  },
                  "description": "List of global roles assigned to the user",
                  "example": [
                    "admin",
                    "meshmap"
                  ],
                  "x-oapi-codegen-extra-tags": {
                    "db": "role_names",
                    "json": "role_names",
                    "yaml": "role_names"
                  }
                },
                "teams": {
                  "type": "object",
                  "description": "Teams the user belongs to with role information",
                  "x-oapi-codegen-extra-tags": {
                    "db": "teams",
                    "json": "teams",
                    "yaml": "teams"
                  },
                  "properties": {
                    "teams_with_roles": {
                      "type": "array",
                      "items": {
                        "type": "object"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "teams_with_roles",
                        "json": "teams_with_roles",
                        "yaml": "teams_with_roles"
                      }
                    },
                    "total_count": {
                      "type": "integer",
                      "x-oapi-codegen-extra-tags": {
                        "db": "total_count",
                        "json": "total_count",
                        "yaml": "total_count"
                      }
                    }
                  }
                },
                "organizations": {
                  "type": "object",
                  "description": "Organizations the user belongs to with role information",
                  "x-oapi-codegen-extra-tags": {
                    "db": "organizations",
                    "json": "organizations",
                    "yaml": "organizations"
                  },
                  "properties": {
                    "organizations_with_roles": {
                      "type": "array",
                      "items": {
                        "type": "object"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "organizations_with_roles",
                        "json": "organizations_with_roles",
                        "yaml": "organizations_with_roles"
                      }
                    },
                    "total_count": {
                      "type": "integer",
                      "x-oapi-codegen-extra-tags": {
                        "db": "total_count",
                        "json": "total_count",
                        "yaml": "total_count"
                      }
                    }
                  }
                }
              },
              "additionalProperties": false
            }
          }
        }
      },
      "Preference": {
        "x-generate-db-helpers": true,
        "type": "object",
        "required": [
          "anonymousUsageStats",
          "anonymousPerfResults",
          "updated_at",
          "dashboardPreferences",
          "selectedOrganizationID",
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
              "description": "Placeholder for Adapter struct definition."
            }
          },
          "grafana": {
            "x-go-type": "Grafana",
            "type": "object",
            "properties": {
              "grafanaURL": {
                "type": "string"
              },
              "grafanaAPIKey": {
                "type": "string"
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
                      }
                    },
                    "templateVars": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "prometheus": {
            "x-go-type": "Prometheus",
            "type": "object",
            "properties": {
              "prometheusURL": {
                "type": "string"
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
                      }
                    },
                    "templateVars": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "loadTestPrefs": {
            "x-go-type": "LoadTestPreferences",
            "type": "object",
            "properties": {
              "c": {
                "type": "integer",
                "description": "Concurrent requests"
              },
              "qps": {
                "type": "integer",
                "description": "Queries per second"
              },
              "t": {
                "type": "string",
                "description": "Duration"
              },
              "gen": {
                "type": "string",
                "description": "Load generator"
              }
            }
          },
          "anonymousUsageStats": {
            "type": "boolean"
          },
          "anonymousPerfResults": {
            "type": "boolean"
          },
          "updated_at": {
            "type": "string",
            "format": "date-time"
          },
          "dashboardPreferences": {
            "type": "object",
            "additionalProperties": true
          },
          "selectedOrganizationID": {
            "type": "string"
          },
          "selectedWorkspaceForOrganizations": {
            "type": "object",
            "additionalProperties": {
              "type": "string"
            }
          },
          "usersExtensionPreferences": {
            "type": "object",
            "additionalProperties": true
          },
          "selectedK8sContexts": {
            "type": "array",
            "description": "Persisted selection of active Kubernetes context IDs",
            "items": {
              "type": "string"
            }
          },
          "remoteProviderPreferences": {
            "type": "object",
            "additionalProperties": true
          }
        }
      },
      "Adapter": {
        "type": "object",
        "description": "Placeholder for Adapter struct definition."
      },
      "Grafana": {
        "type": "object",
        "properties": {
          "grafanaURL": {
            "type": "string"
          },
          "grafanaAPIKey": {
            "type": "string"
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
                  }
                },
                "templateVars": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              }
            }
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
            }
          },
          "templateVars": {
            "type": "array",
            "items": {
              "type": "string"
            }
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
          "prometheusURL": {
            "type": "string"
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
                  }
                },
                "templateVars": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              }
            }
          }
        }
      },
      "LoadTestPreferences": {
        "type": "object",
        "properties": {
          "c": {
            "type": "integer",
            "description": "Concurrent requests"
          },
          "qps": {
            "type": "integer",
            "description": "Queries per second"
          },
          "t": {
            "type": "string",
            "description": "Duration"
          },
          "gen": {
            "type": "string",
            "description": "Load generator"
          }
        }
      },
      "Social": {
        "description": "Various online profiles associated with the user account, like GitHub, LinkedIn, X, and so on.",
        "type": "object",
        "properties": {
          "site": {
            "type": "string",
            "maxLength": 50
          },
          "link": {
            "type": "string",
            "format": "uri"
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
