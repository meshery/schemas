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
          "cloud",
          "meshery"
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
              "format": "uuid"
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
              "format": "uuid"
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
                        "description": "Represents a user",
                        "required": [
                          "id",
                          "userId",
                          "provider",
                          "email",
                          "firstName",
                          "lastName",
                          "status",
                          "createdAt",
                          "updatedAt",
                          "lastLoginTime",
                          "deletedAt"
                        ],
                        "properties": {
                          "id": {
                            "description": "Unique identifier for the user",
                            "x-go-name": "ID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "id",
                              "json": "id"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "userId": {
                            "type": "string",
                            "maxLength": 200,
                            "description": "User identifier (username or external ID)",
                            "x-oapi-codegen-extra-tags": {
                              "db": "user_id",
                              "json": "userId"
                            },
                            "x-id-format": "external"
                          },
                          "provider": {
                            "type": "string",
                            "maxLength": 100,
                            "description": "Authentication provider (e.g., Google, Github)",
                            "example": [
                              "local",
                              "github",
                              "google",
                              "twitter"
                            ],
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
                            "description": "URL to user's avatar image",
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
                            "description": "User account status",
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
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "region",
                              "json": "region"
                            }
                          },
                          "preferences": {
                            "x-go-type": "Preference",
                            "description": "User preferences stored as JSONB",
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
                                  "description": "Placeholder for Adapter struct definition."
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
                                "format": "uuid"
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
                            "description": "Timestamp when user accepted terms and conditions",
                            "x-oapi-codegen-extra-tags": {
                              "db": "accepted_terms_at",
                              "json": "acceptedTermsAt"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "firstLoginTime": {
                            "description": "Timestamp of user's first login",
                            "x-oapi-codegen-extra-tags": {
                              "db": "first_login_time",
                              "json": "firstLoginTime"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "lastLoginTime": {
                            "description": "Timestamp of user's most recent login",
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
                            "description": "Various online profiles associated with the user account",
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
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "json": "deletedAt"
                            }
                          },
                          "roleNames": {
                            "type": "array",
                            "x-go-type": "pq.StringArray",
                            "x-go-type-import": {
                              "path": "github.com/lib/pq"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "items": {
                              "type": "string"
                            },
                            "description": "Names of the global roles assigned to the user. Free-form, user-generated values sourced from the roles table (role_name is a varchar, not a fixed enumeration); the seeded system roles such as \"admin\", \"organization admin\" and \"user\" are a subset, not the whole set.",
                            "example": [
                              "organization admin",
                              "user"
                            ],
                            "x-oapi-codegen-extra-tags": {
                              "db": "role_names",
                              "json": "roleNames"
                            }
                          },
                          "teams": {
                            "type": "object",
                            "description": "Teams the user belongs to with role information",
                            "x-oapi-codegen-extra-tags": {
                              "db": "teams",
                              "json": "teams"
                            },
                            "properties": {
                              "teamsWithRoles": {
                                "type": "array",
                                "description": "Team memberships for the user with their assigned roles.",
                                "items": {
                                  "type": "object",
                                  "additionalProperties": false,
                                  "description": "A team the user is a member of, together with the names of the roles assigned to that user within the team. Returned as an item of User.teams.teamsWithRoles. The role names are dynamic, user-generated values (no fixed enumeration).",
                                  "required": [
                                    "id",
                                    "name",
                                    "roleNames"
                                  ],
                                  "properties": {
                                    "id": {
                                      "description": "Unique identifier of the team.",
                                      "x-go-name": "ID",
                                      "x-order": 1,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "id",
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
                                      "description": "Name of the team.",
                                      "x-order": 2,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "name",
                                        "json": "name,omitempty"
                                      }
                                    },
                                    "description": {
                                      "type": "string",
                                      "description": "Human readable description of the team.",
                                      "x-order": 3,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "description",
                                        "json": "description,omitempty"
                                      }
                                    },
                                    "owner": {
                                      "description": "Identifier of the team owner.",
                                      "x-order": 4,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "owner",
                                        "json": "owner,omitempty"
                                      },
                                      "type": "string",
                                      "format": "uuid",
                                      "x-go-type": "uuid.UUID",
                                      "x-go-type-import": {
                                        "path": "github.com/gofrs/uuid"
                                      }
                                    },
                                    "metadata": {
                                      "type": "object",
                                      "additionalProperties": true,
                                      "description": "Free-form metadata associated with the team.",
                                      "x-go-type": "core.Map",
                                      "x-go-type-skip-optional-pointer": true,
                                      "x-order": 5,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "metadata",
                                        "json": "metadata,omitempty"
                                      }
                                    },
                                    "createdAt": {
                                      "description": "Timestamp when the team was created.",
                                      "x-order": 6,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "created_at",
                                        "json": "createdAt,omitempty"
                                      },
                                      "type": "string",
                                      "format": "date-time",
                                      "x-go-type-skip-optional-pointer": true
                                    },
                                    "updatedAt": {
                                      "description": "Timestamp when the team was last updated.",
                                      "x-order": 7,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "updated_at",
                                        "json": "updatedAt,omitempty"
                                      },
                                      "type": "string",
                                      "format": "date-time",
                                      "x-go-type-skip-optional-pointer": true
                                    },
                                    "deletedAt": {
                                      "type": "string",
                                      "format": "date-time",
                                      "nullable": true,
                                      "description": "Timestamp when the team was soft-deleted (null if not deleted).",
                                      "x-go-type": "core.NullTime",
                                      "x-order": 8,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "deleted_at",
                                        "json": "deletedAt,omitempty"
                                      }
                                    },
                                    "roleNames": {
                                      "type": "array",
                                      "x-go-type": "pq.StringArray",
                                      "x-go-type-import": {
                                        "path": "github.com/lib/pq"
                                      },
                                      "description": "Names of the roles assigned to the user within this team. Free-form, user-generated role names; not a fixed enumeration.",
                                      "items": {
                                        "type": "string"
                                      },
                                      "x-order": 9,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "role_names",
                                        "json": "roleNames"
                                      }
                                    }
                                  }
                                },
                                "x-oapi-codegen-extra-tags": {
                                  "db": "teams_with_roles",
                                  "json": "teamsWithRoles"
                                }
                              },
                              "totalCount": {
                                "type": "integer",
                                "description": "Total number of team memberships returned for the user.",
                                "minimum": 0,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "total_count",
                                  "json": "totalCount"
                                }
                              }
                            }
                          },
                          "organizations": {
                            "type": "object",
                            "description": "Organizations the user belongs to with role information",
                            "x-oapi-codegen-extra-tags": {
                              "db": "organizations",
                              "json": "organizations"
                            },
                            "properties": {
                              "organizationsWithRoles": {
                                "type": "array",
                                "description": "Organization memberships for the user with their assigned roles.",
                                "items": {
                                  "type": "object",
                                  "additionalProperties": false,
                                  "description": "An organization the user is a member of, together with the names of the roles assigned to that user within the organization. Returned as an item of User.organizations.organizationsWithRoles. The role names are dynamic, user-generated values (no fixed enumeration).",
                                  "required": [
                                    "id",
                                    "name",
                                    "roleNames"
                                  ],
                                  "properties": {
                                    "id": {
                                      "description": "Unique identifier of the organization.",
                                      "x-go-name": "ID",
                                      "x-order": 1,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "id",
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
                                      "description": "Name of the organization.",
                                      "x-order": 2,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "name",
                                        "json": "name,omitempty"
                                      }
                                    },
                                    "description": {
                                      "type": "string",
                                      "description": "Human readable description of the organization.",
                                      "x-order": 3,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "description",
                                        "json": "description,omitempty"
                                      }
                                    },
                                    "country": {
                                      "type": "string",
                                      "description": "Country associated with the organization.",
                                      "x-order": 4,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "country",
                                        "json": "country,omitempty"
                                      }
                                    },
                                    "region": {
                                      "type": "string",
                                      "description": "Region associated with the organization.",
                                      "x-order": 5,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "region",
                                        "json": "region,omitempty"
                                      }
                                    },
                                    "owner": {
                                      "description": "Identifier of the organization owner.",
                                      "x-order": 6,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "owner",
                                        "json": "owner,omitempty"
                                      },
                                      "type": "string",
                                      "format": "uuid",
                                      "x-go-type": "uuid.UUID",
                                      "x-go-type-import": {
                                        "path": "github.com/gofrs/uuid"
                                      }
                                    },
                                    "createdAt": {
                                      "description": "Timestamp when the organization was created.",
                                      "x-order": 7,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "created_at",
                                        "json": "createdAt,omitempty"
                                      },
                                      "type": "string",
                                      "format": "date-time",
                                      "x-go-type-skip-optional-pointer": true
                                    },
                                    "updatedAt": {
                                      "description": "Timestamp when the organization was last updated.",
                                      "x-order": 8,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "updated_at",
                                        "json": "updatedAt,omitempty"
                                      },
                                      "type": "string",
                                      "format": "date-time",
                                      "x-go-type-skip-optional-pointer": true
                                    },
                                    "deletedAt": {
                                      "type": "string",
                                      "format": "date-time",
                                      "nullable": true,
                                      "description": "Timestamp when the organization was soft-deleted (null if not deleted).",
                                      "x-go-type": "core.NullTime",
                                      "x-order": 9,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "deleted_at",
                                        "json": "deletedAt,omitempty"
                                      }
                                    },
                                    "roleNames": {
                                      "type": "array",
                                      "x-go-type": "pq.StringArray",
                                      "x-go-type-import": {
                                        "path": "github.com/lib/pq"
                                      },
                                      "description": "Names of the roles assigned to the user within this organization. Free-form, user-generated role names; not a fixed enumeration.",
                                      "items": {
                                        "type": "string"
                                      },
                                      "x-order": 10,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "role_names",
                                        "json": "roleNames"
                                      }
                                    }
                                  }
                                },
                                "x-oapi-codegen-extra-tags": {
                                  "db": "organizations_with_roles",
                                  "json": "organizationsWithRoles"
                                }
                              },
                              "totalCount": {
                                "type": "integer",
                                "description": "Total number of organization memberships returned for the user.",
                                "minimum": 0,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "total_count",
                                  "json": "totalCount"
                                }
                              }
                            }
                          }
                        },
                        "additionalProperties": false
                      },
                      "description": "The data of the userspageforadmin."
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
    "/api/users": {
      "get": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "users"
        ],
        "operationId": "getUsers",
        "summary": "Get public users",
        "description": "Returns publicly viewable user records.",
        "security": [],
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
            "description": "Paginated list of public users",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated list of public user records",
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
                        "description": "Represents a user",
                        "required": [
                          "id",
                          "userId",
                          "provider",
                          "email",
                          "firstName",
                          "lastName",
                          "status",
                          "createdAt",
                          "updatedAt",
                          "lastLoginTime",
                          "deletedAt"
                        ],
                        "properties": {
                          "id": {
                            "description": "Unique identifier for the user",
                            "x-go-name": "ID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "id",
                              "json": "id"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "userId": {
                            "type": "string",
                            "maxLength": 200,
                            "description": "User identifier (username or external ID)",
                            "x-oapi-codegen-extra-tags": {
                              "db": "user_id",
                              "json": "userId"
                            },
                            "x-id-format": "external"
                          },
                          "provider": {
                            "type": "string",
                            "maxLength": 100,
                            "description": "Authentication provider (e.g., Google, Github)",
                            "example": [
                              "local",
                              "github",
                              "google",
                              "twitter"
                            ],
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
                            "description": "URL to user's avatar image",
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
                            "description": "User account status",
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
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "region",
                              "json": "region"
                            }
                          },
                          "preferences": {
                            "x-go-type": "Preference",
                            "description": "User preferences stored as JSONB",
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
                                  "description": "Placeholder for Adapter struct definition."
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
                                "format": "uuid"
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
                            "description": "Timestamp when user accepted terms and conditions",
                            "x-oapi-codegen-extra-tags": {
                              "db": "accepted_terms_at",
                              "json": "acceptedTermsAt"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "firstLoginTime": {
                            "description": "Timestamp of user's first login",
                            "x-oapi-codegen-extra-tags": {
                              "db": "first_login_time",
                              "json": "firstLoginTime"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "lastLoginTime": {
                            "description": "Timestamp of user's most recent login",
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
                            "description": "Various online profiles associated with the user account",
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
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "json": "deletedAt"
                            }
                          },
                          "roleNames": {
                            "type": "array",
                            "x-go-type": "pq.StringArray",
                            "x-go-type-import": {
                              "path": "github.com/lib/pq"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "items": {
                              "type": "string"
                            },
                            "description": "Names of the global roles assigned to the user. Free-form, user-generated values sourced from the roles table (role_name is a varchar, not a fixed enumeration); the seeded system roles such as \"admin\", \"organization admin\" and \"user\" are a subset, not the whole set.",
                            "example": [
                              "organization admin",
                              "user"
                            ],
                            "x-oapi-codegen-extra-tags": {
                              "db": "role_names",
                              "json": "roleNames"
                            }
                          },
                          "teams": {
                            "type": "object",
                            "description": "Teams the user belongs to with role information",
                            "x-oapi-codegen-extra-tags": {
                              "db": "teams",
                              "json": "teams"
                            },
                            "properties": {
                              "teamsWithRoles": {
                                "type": "array",
                                "description": "Team memberships for the user with their assigned roles.",
                                "items": {
                                  "type": "object",
                                  "additionalProperties": false,
                                  "description": "A team the user is a member of, together with the names of the roles assigned to that user within the team. Returned as an item of User.teams.teamsWithRoles. The role names are dynamic, user-generated values (no fixed enumeration).",
                                  "required": [
                                    "id",
                                    "name",
                                    "roleNames"
                                  ],
                                  "properties": {
                                    "id": {
                                      "description": "Unique identifier of the team.",
                                      "x-go-name": "ID",
                                      "x-order": 1,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "id",
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
                                      "description": "Name of the team.",
                                      "x-order": 2,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "name",
                                        "json": "name,omitempty"
                                      }
                                    },
                                    "description": {
                                      "type": "string",
                                      "description": "Human readable description of the team.",
                                      "x-order": 3,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "description",
                                        "json": "description,omitempty"
                                      }
                                    },
                                    "owner": {
                                      "description": "Identifier of the team owner.",
                                      "x-order": 4,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "owner",
                                        "json": "owner,omitempty"
                                      },
                                      "type": "string",
                                      "format": "uuid",
                                      "x-go-type": "uuid.UUID",
                                      "x-go-type-import": {
                                        "path": "github.com/gofrs/uuid"
                                      }
                                    },
                                    "metadata": {
                                      "type": "object",
                                      "additionalProperties": true,
                                      "description": "Free-form metadata associated with the team.",
                                      "x-go-type": "core.Map",
                                      "x-go-type-skip-optional-pointer": true,
                                      "x-order": 5,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "metadata",
                                        "json": "metadata,omitempty"
                                      }
                                    },
                                    "createdAt": {
                                      "description": "Timestamp when the team was created.",
                                      "x-order": 6,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "created_at",
                                        "json": "createdAt,omitempty"
                                      },
                                      "type": "string",
                                      "format": "date-time",
                                      "x-go-type-skip-optional-pointer": true
                                    },
                                    "updatedAt": {
                                      "description": "Timestamp when the team was last updated.",
                                      "x-order": 7,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "updated_at",
                                        "json": "updatedAt,omitempty"
                                      },
                                      "type": "string",
                                      "format": "date-time",
                                      "x-go-type-skip-optional-pointer": true
                                    },
                                    "deletedAt": {
                                      "type": "string",
                                      "format": "date-time",
                                      "nullable": true,
                                      "description": "Timestamp when the team was soft-deleted (null if not deleted).",
                                      "x-go-type": "core.NullTime",
                                      "x-order": 8,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "deleted_at",
                                        "json": "deletedAt,omitempty"
                                      }
                                    },
                                    "roleNames": {
                                      "type": "array",
                                      "x-go-type": "pq.StringArray",
                                      "x-go-type-import": {
                                        "path": "github.com/lib/pq"
                                      },
                                      "description": "Names of the roles assigned to the user within this team. Free-form, user-generated role names; not a fixed enumeration.",
                                      "items": {
                                        "type": "string"
                                      },
                                      "x-order": 9,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "role_names",
                                        "json": "roleNames"
                                      }
                                    }
                                  }
                                },
                                "x-oapi-codegen-extra-tags": {
                                  "db": "teams_with_roles",
                                  "json": "teamsWithRoles"
                                }
                              },
                              "totalCount": {
                                "type": "integer",
                                "description": "Total number of team memberships returned for the user.",
                                "minimum": 0,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "total_count",
                                  "json": "totalCount"
                                }
                              }
                            }
                          },
                          "organizations": {
                            "type": "object",
                            "description": "Organizations the user belongs to with role information",
                            "x-oapi-codegen-extra-tags": {
                              "db": "organizations",
                              "json": "organizations"
                            },
                            "properties": {
                              "organizationsWithRoles": {
                                "type": "array",
                                "description": "Organization memberships for the user with their assigned roles.",
                                "items": {
                                  "type": "object",
                                  "additionalProperties": false,
                                  "description": "An organization the user is a member of, together with the names of the roles assigned to that user within the organization. Returned as an item of User.organizations.organizationsWithRoles. The role names are dynamic, user-generated values (no fixed enumeration).",
                                  "required": [
                                    "id",
                                    "name",
                                    "roleNames"
                                  ],
                                  "properties": {
                                    "id": {
                                      "description": "Unique identifier of the organization.",
                                      "x-go-name": "ID",
                                      "x-order": 1,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "id",
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
                                      "description": "Name of the organization.",
                                      "x-order": 2,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "name",
                                        "json": "name,omitempty"
                                      }
                                    },
                                    "description": {
                                      "type": "string",
                                      "description": "Human readable description of the organization.",
                                      "x-order": 3,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "description",
                                        "json": "description,omitempty"
                                      }
                                    },
                                    "country": {
                                      "type": "string",
                                      "description": "Country associated with the organization.",
                                      "x-order": 4,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "country",
                                        "json": "country,omitempty"
                                      }
                                    },
                                    "region": {
                                      "type": "string",
                                      "description": "Region associated with the organization.",
                                      "x-order": 5,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "region",
                                        "json": "region,omitempty"
                                      }
                                    },
                                    "owner": {
                                      "description": "Identifier of the organization owner.",
                                      "x-order": 6,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "owner",
                                        "json": "owner,omitempty"
                                      },
                                      "type": "string",
                                      "format": "uuid",
                                      "x-go-type": "uuid.UUID",
                                      "x-go-type-import": {
                                        "path": "github.com/gofrs/uuid"
                                      }
                                    },
                                    "createdAt": {
                                      "description": "Timestamp when the organization was created.",
                                      "x-order": 7,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "created_at",
                                        "json": "createdAt,omitempty"
                                      },
                                      "type": "string",
                                      "format": "date-time",
                                      "x-go-type-skip-optional-pointer": true
                                    },
                                    "updatedAt": {
                                      "description": "Timestamp when the organization was last updated.",
                                      "x-order": 8,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "updated_at",
                                        "json": "updatedAt,omitempty"
                                      },
                                      "type": "string",
                                      "format": "date-time",
                                      "x-go-type-skip-optional-pointer": true
                                    },
                                    "deletedAt": {
                                      "type": "string",
                                      "format": "date-time",
                                      "nullable": true,
                                      "description": "Timestamp when the organization was soft-deleted (null if not deleted).",
                                      "x-go-type": "core.NullTime",
                                      "x-order": 9,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "deleted_at",
                                        "json": "deletedAt,omitempty"
                                      }
                                    },
                                    "roleNames": {
                                      "type": "array",
                                      "x-go-type": "pq.StringArray",
                                      "x-go-type-import": {
                                        "path": "github.com/lib/pq"
                                      },
                                      "description": "Names of the roles assigned to the user within this organization. Free-form, user-generated role names; not a fixed enumeration.",
                                      "items": {
                                        "type": "string"
                                      },
                                      "x-order": 10,
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "role_names",
                                        "json": "roleNames"
                                      }
                                    }
                                  }
                                },
                                "x-oapi-codegen-extra-tags": {
                                  "db": "organizations_with_roles",
                                  "json": "organizationsWithRoles"
                                }
                              },
                              "totalCount": {
                                "type": "integer",
                                "description": "Total number of organization memberships returned for the user.",
                                "minimum": 0,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "total_count",
                                  "json": "totalCount"
                                }
                              }
                            }
                          }
                        },
                        "additionalProperties": false
                      },
                      "description": "The data of the userspagefornonadmin."
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
        "x-internal": [
          "cloud",
          "meshery"
        ],
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
                  "description": "Represents a user",
                  "required": [
                    "id",
                    "userId",
                    "provider",
                    "email",
                    "firstName",
                    "lastName",
                    "status",
                    "createdAt",
                    "updatedAt",
                    "lastLoginTime",
                    "deletedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Unique identifier for the user",
                      "x-go-name": "ID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id",
                        "json": "id"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "userId": {
                      "type": "string",
                      "maxLength": 200,
                      "description": "User identifier (username or external ID)",
                      "x-oapi-codegen-extra-tags": {
                        "db": "user_id",
                        "json": "userId"
                      },
                      "x-id-format": "external"
                    },
                    "provider": {
                      "type": "string",
                      "maxLength": 100,
                      "description": "Authentication provider (e.g., Google, Github)",
                      "example": [
                        "local",
                        "github",
                        "google",
                        "twitter"
                      ],
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
                      "description": "URL to user's avatar image",
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
                      "description": "User account status",
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
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "region",
                        "json": "region"
                      }
                    },
                    "preferences": {
                      "x-go-type": "Preference",
                      "description": "User preferences stored as JSONB",
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
                            "description": "Placeholder for Adapter struct definition."
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
                          "format": "uuid"
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
                      "description": "Timestamp when user accepted terms and conditions",
                      "x-oapi-codegen-extra-tags": {
                        "db": "accepted_terms_at",
                        "json": "acceptedTermsAt"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "firstLoginTime": {
                      "description": "Timestamp of user's first login",
                      "x-oapi-codegen-extra-tags": {
                        "db": "first_login_time",
                        "json": "firstLoginTime"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "lastLoginTime": {
                      "description": "Timestamp of user's most recent login",
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
                      "description": "Various online profiles associated with the user account",
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
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deletedAt"
                      }
                    },
                    "roleNames": {
                      "type": "array",
                      "x-go-type": "pq.StringArray",
                      "x-go-type-import": {
                        "path": "github.com/lib/pq"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "items": {
                        "type": "string"
                      },
                      "description": "Names of the global roles assigned to the user. Free-form, user-generated values sourced from the roles table (role_name is a varchar, not a fixed enumeration); the seeded system roles such as \"admin\", \"organization admin\" and \"user\" are a subset, not the whole set.",
                      "example": [
                        "organization admin",
                        "user"
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "db": "role_names",
                        "json": "roleNames"
                      }
                    },
                    "teams": {
                      "type": "object",
                      "description": "Teams the user belongs to with role information",
                      "x-oapi-codegen-extra-tags": {
                        "db": "teams",
                        "json": "teams"
                      },
                      "properties": {
                        "teamsWithRoles": {
                          "type": "array",
                          "description": "Team memberships for the user with their assigned roles.",
                          "items": {
                            "type": "object",
                            "additionalProperties": false,
                            "description": "A team the user is a member of, together with the names of the roles assigned to that user within the team. Returned as an item of User.teams.teamsWithRoles. The role names are dynamic, user-generated values (no fixed enumeration).",
                            "required": [
                              "id",
                              "name",
                              "roleNames"
                            ],
                            "properties": {
                              "id": {
                                "description": "Unique identifier of the team.",
                                "x-go-name": "ID",
                                "x-order": 1,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "id",
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
                                "description": "Name of the team.",
                                "x-order": 2,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "name",
                                  "json": "name,omitempty"
                                }
                              },
                              "description": {
                                "type": "string",
                                "description": "Human readable description of the team.",
                                "x-order": 3,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "description",
                                  "json": "description,omitempty"
                                }
                              },
                              "owner": {
                                "description": "Identifier of the team owner.",
                                "x-order": 4,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "owner",
                                  "json": "owner,omitempty"
                                },
                                "type": "string",
                                "format": "uuid",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                }
                              },
                              "metadata": {
                                "type": "object",
                                "additionalProperties": true,
                                "description": "Free-form metadata associated with the team.",
                                "x-go-type": "core.Map",
                                "x-go-type-skip-optional-pointer": true,
                                "x-order": 5,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "metadata",
                                  "json": "metadata,omitempty"
                                }
                              },
                              "createdAt": {
                                "description": "Timestamp when the team was created.",
                                "x-order": 6,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "created_at",
                                  "json": "createdAt,omitempty"
                                },
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "updatedAt": {
                                "description": "Timestamp when the team was last updated.",
                                "x-order": 7,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "updated_at",
                                  "json": "updatedAt,omitempty"
                                },
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "deletedAt": {
                                "type": "string",
                                "format": "date-time",
                                "nullable": true,
                                "description": "Timestamp when the team was soft-deleted (null if not deleted).",
                                "x-go-type": "core.NullTime",
                                "x-order": 8,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "deleted_at",
                                  "json": "deletedAt,omitempty"
                                }
                              },
                              "roleNames": {
                                "type": "array",
                                "x-go-type": "pq.StringArray",
                                "x-go-type-import": {
                                  "path": "github.com/lib/pq"
                                },
                                "description": "Names of the roles assigned to the user within this team. Free-form, user-generated role names; not a fixed enumeration.",
                                "items": {
                                  "type": "string"
                                },
                                "x-order": 9,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "role_names",
                                  "json": "roleNames"
                                }
                              }
                            }
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "teams_with_roles",
                            "json": "teamsWithRoles"
                          }
                        },
                        "totalCount": {
                          "type": "integer",
                          "description": "Total number of team memberships returned for the user.",
                          "minimum": 0,
                          "x-oapi-codegen-extra-tags": {
                            "db": "total_count",
                            "json": "totalCount"
                          }
                        }
                      }
                    },
                    "organizations": {
                      "type": "object",
                      "description": "Organizations the user belongs to with role information",
                      "x-oapi-codegen-extra-tags": {
                        "db": "organizations",
                        "json": "organizations"
                      },
                      "properties": {
                        "organizationsWithRoles": {
                          "type": "array",
                          "description": "Organization memberships for the user with their assigned roles.",
                          "items": {
                            "type": "object",
                            "additionalProperties": false,
                            "description": "An organization the user is a member of, together with the names of the roles assigned to that user within the organization. Returned as an item of User.organizations.organizationsWithRoles. The role names are dynamic, user-generated values (no fixed enumeration).",
                            "required": [
                              "id",
                              "name",
                              "roleNames"
                            ],
                            "properties": {
                              "id": {
                                "description": "Unique identifier of the organization.",
                                "x-go-name": "ID",
                                "x-order": 1,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "id",
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
                                "description": "Name of the organization.",
                                "x-order": 2,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "name",
                                  "json": "name,omitempty"
                                }
                              },
                              "description": {
                                "type": "string",
                                "description": "Human readable description of the organization.",
                                "x-order": 3,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "description",
                                  "json": "description,omitempty"
                                }
                              },
                              "country": {
                                "type": "string",
                                "description": "Country associated with the organization.",
                                "x-order": 4,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "country",
                                  "json": "country,omitempty"
                                }
                              },
                              "region": {
                                "type": "string",
                                "description": "Region associated with the organization.",
                                "x-order": 5,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "region",
                                  "json": "region,omitempty"
                                }
                              },
                              "owner": {
                                "description": "Identifier of the organization owner.",
                                "x-order": 6,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "owner",
                                  "json": "owner,omitempty"
                                },
                                "type": "string",
                                "format": "uuid",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                }
                              },
                              "createdAt": {
                                "description": "Timestamp when the organization was created.",
                                "x-order": 7,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "created_at",
                                  "json": "createdAt,omitempty"
                                },
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "updatedAt": {
                                "description": "Timestamp when the organization was last updated.",
                                "x-order": 8,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "updated_at",
                                  "json": "updatedAt,omitempty"
                                },
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "deletedAt": {
                                "type": "string",
                                "format": "date-time",
                                "nullable": true,
                                "description": "Timestamp when the organization was soft-deleted (null if not deleted).",
                                "x-go-type": "core.NullTime",
                                "x-order": 9,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "deleted_at",
                                  "json": "deletedAt,omitempty"
                                }
                              },
                              "roleNames": {
                                "type": "array",
                                "x-go-type": "pq.StringArray",
                                "x-go-type-import": {
                                  "path": "github.com/lib/pq"
                                },
                                "description": "Names of the roles assigned to the user within this organization. Free-form, user-generated role names; not a fixed enumeration.",
                                "items": {
                                  "type": "string"
                                },
                                "x-order": 10,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "role_names",
                                  "json": "roleNames"
                                }
                              }
                            }
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "organizations_with_roles",
                            "json": "organizationsWithRoles"
                          }
                        },
                        "totalCount": {
                          "type": "integer",
                          "description": "Total number of organization memberships returned for the user.",
                          "minimum": 0,
                          "x-oapi-codegen-extra-tags": {
                            "db": "total_count",
                            "json": "totalCount"
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
        "responses": {
          "200": {
            "description": "Current user profile and role context",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Represents a user",
                  "required": [
                    "id",
                    "userId",
                    "provider",
                    "email",
                    "firstName",
                    "lastName",
                    "status",
                    "createdAt",
                    "updatedAt",
                    "lastLoginTime",
                    "deletedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Unique identifier for the user",
                      "x-go-name": "ID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id",
                        "json": "id"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "userId": {
                      "type": "string",
                      "maxLength": 200,
                      "description": "User identifier (username or external ID)",
                      "x-oapi-codegen-extra-tags": {
                        "db": "user_id",
                        "json": "userId"
                      },
                      "x-id-format": "external"
                    },
                    "provider": {
                      "type": "string",
                      "maxLength": 100,
                      "description": "Authentication provider (e.g., Google, Github)",
                      "example": [
                        "local",
                        "github",
                        "google",
                        "twitter"
                      ],
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
                      "description": "URL to user's avatar image",
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
                      "description": "User account status",
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
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "region",
                        "json": "region"
                      }
                    },
                    "preferences": {
                      "x-go-type": "Preference",
                      "description": "User preferences stored as JSONB",
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
                            "description": "Placeholder for Adapter struct definition."
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
                          "format": "uuid"
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
                      "description": "Timestamp when user accepted terms and conditions",
                      "x-oapi-codegen-extra-tags": {
                        "db": "accepted_terms_at",
                        "json": "acceptedTermsAt"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "firstLoginTime": {
                      "description": "Timestamp of user's first login",
                      "x-oapi-codegen-extra-tags": {
                        "db": "first_login_time",
                        "json": "firstLoginTime"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "lastLoginTime": {
                      "description": "Timestamp of user's most recent login",
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
                      "description": "Various online profiles associated with the user account",
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
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deletedAt"
                      }
                    },
                    "roleNames": {
                      "type": "array",
                      "x-go-type": "pq.StringArray",
                      "x-go-type-import": {
                        "path": "github.com/lib/pq"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "items": {
                        "type": "string"
                      },
                      "description": "Names of the global roles assigned to the user. Free-form, user-generated values sourced from the roles table (role_name is a varchar, not a fixed enumeration); the seeded system roles such as \"admin\", \"organization admin\" and \"user\" are a subset, not the whole set.",
                      "example": [
                        "organization admin",
                        "user"
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "db": "role_names",
                        "json": "roleNames"
                      }
                    },
                    "teams": {
                      "type": "object",
                      "description": "Teams the user belongs to with role information",
                      "x-oapi-codegen-extra-tags": {
                        "db": "teams",
                        "json": "teams"
                      },
                      "properties": {
                        "teamsWithRoles": {
                          "type": "array",
                          "description": "Team memberships for the user with their assigned roles.",
                          "items": {
                            "type": "object",
                            "additionalProperties": false,
                            "description": "A team the user is a member of, together with the names of the roles assigned to that user within the team. Returned as an item of User.teams.teamsWithRoles. The role names are dynamic, user-generated values (no fixed enumeration).",
                            "required": [
                              "id",
                              "name",
                              "roleNames"
                            ],
                            "properties": {
                              "id": {
                                "description": "Unique identifier of the team.",
                                "x-go-name": "ID",
                                "x-order": 1,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "id",
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
                                "description": "Name of the team.",
                                "x-order": 2,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "name",
                                  "json": "name,omitempty"
                                }
                              },
                              "description": {
                                "type": "string",
                                "description": "Human readable description of the team.",
                                "x-order": 3,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "description",
                                  "json": "description,omitempty"
                                }
                              },
                              "owner": {
                                "description": "Identifier of the team owner.",
                                "x-order": 4,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "owner",
                                  "json": "owner,omitempty"
                                },
                                "type": "string",
                                "format": "uuid",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                }
                              },
                              "metadata": {
                                "type": "object",
                                "additionalProperties": true,
                                "description": "Free-form metadata associated with the team.",
                                "x-go-type": "core.Map",
                                "x-go-type-skip-optional-pointer": true,
                                "x-order": 5,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "metadata",
                                  "json": "metadata,omitempty"
                                }
                              },
                              "createdAt": {
                                "description": "Timestamp when the team was created.",
                                "x-order": 6,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "created_at",
                                  "json": "createdAt,omitempty"
                                },
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "updatedAt": {
                                "description": "Timestamp when the team was last updated.",
                                "x-order": 7,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "updated_at",
                                  "json": "updatedAt,omitempty"
                                },
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "deletedAt": {
                                "type": "string",
                                "format": "date-time",
                                "nullable": true,
                                "description": "Timestamp when the team was soft-deleted (null if not deleted).",
                                "x-go-type": "core.NullTime",
                                "x-order": 8,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "deleted_at",
                                  "json": "deletedAt,omitempty"
                                }
                              },
                              "roleNames": {
                                "type": "array",
                                "x-go-type": "pq.StringArray",
                                "x-go-type-import": {
                                  "path": "github.com/lib/pq"
                                },
                                "description": "Names of the roles assigned to the user within this team. Free-form, user-generated role names; not a fixed enumeration.",
                                "items": {
                                  "type": "string"
                                },
                                "x-order": 9,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "role_names",
                                  "json": "roleNames"
                                }
                              }
                            }
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "teams_with_roles",
                            "json": "teamsWithRoles"
                          }
                        },
                        "totalCount": {
                          "type": "integer",
                          "description": "Total number of team memberships returned for the user.",
                          "minimum": 0,
                          "x-oapi-codegen-extra-tags": {
                            "db": "total_count",
                            "json": "totalCount"
                          }
                        }
                      }
                    },
                    "organizations": {
                      "type": "object",
                      "description": "Organizations the user belongs to with role information",
                      "x-oapi-codegen-extra-tags": {
                        "db": "organizations",
                        "json": "organizations"
                      },
                      "properties": {
                        "organizationsWithRoles": {
                          "type": "array",
                          "description": "Organization memberships for the user with their assigned roles.",
                          "items": {
                            "type": "object",
                            "additionalProperties": false,
                            "description": "An organization the user is a member of, together with the names of the roles assigned to that user within the organization. Returned as an item of User.organizations.organizationsWithRoles. The role names are dynamic, user-generated values (no fixed enumeration).",
                            "required": [
                              "id",
                              "name",
                              "roleNames"
                            ],
                            "properties": {
                              "id": {
                                "description": "Unique identifier of the organization.",
                                "x-go-name": "ID",
                                "x-order": 1,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "id",
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
                                "description": "Name of the organization.",
                                "x-order": 2,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "name",
                                  "json": "name,omitempty"
                                }
                              },
                              "description": {
                                "type": "string",
                                "description": "Human readable description of the organization.",
                                "x-order": 3,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "description",
                                  "json": "description,omitempty"
                                }
                              },
                              "country": {
                                "type": "string",
                                "description": "Country associated with the organization.",
                                "x-order": 4,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "country",
                                  "json": "country,omitempty"
                                }
                              },
                              "region": {
                                "type": "string",
                                "description": "Region associated with the organization.",
                                "x-order": 5,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "region",
                                  "json": "region,omitempty"
                                }
                              },
                              "owner": {
                                "description": "Identifier of the organization owner.",
                                "x-order": 6,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "owner",
                                  "json": "owner,omitempty"
                                },
                                "type": "string",
                                "format": "uuid",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                }
                              },
                              "createdAt": {
                                "description": "Timestamp when the organization was created.",
                                "x-order": 7,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "created_at",
                                  "json": "createdAt,omitempty"
                                },
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "updatedAt": {
                                "description": "Timestamp when the organization was last updated.",
                                "x-order": 8,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "updated_at",
                                  "json": "updatedAt,omitempty"
                                },
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "deletedAt": {
                                "type": "string",
                                "format": "date-time",
                                "nullable": true,
                                "description": "Timestamp when the organization was soft-deleted (null if not deleted).",
                                "x-go-type": "core.NullTime",
                                "x-order": 9,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "deleted_at",
                                  "json": "deletedAt,omitempty"
                                }
                              },
                              "roleNames": {
                                "type": "array",
                                "x-go-type": "pq.StringArray",
                                "x-go-type-import": {
                                  "path": "github.com/lib/pq"
                                },
                                "description": "Names of the roles assigned to the user within this organization. Free-form, user-generated role names; not a fixed enumeration.",
                                "items": {
                                  "type": "string"
                                },
                                "x-order": 10,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "role_names",
                                  "json": "roleNames"
                                }
                              }
                            }
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "organizations_with_roles",
                            "json": "organizationsWithRoles"
                          }
                        },
                        "totalCount": {
                          "type": "integer",
                          "description": "Total number of organization memberships returned for the user.",
                          "minimum": 0,
                          "x-oapi-codegen-extra-tags": {
                            "db": "total_count",
                            "json": "totalCount"
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
    "/api/identity/users/self/account-deletion-eligibility": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "users"
        ],
        "operationId": "getAccountDeletionEligibility",
        "summary": "Get account deletion eligibility",
        "description": "Pre-check evaluated before an account self-deletion is confirmed. Reports whether deleting the caller's account would also require or permit hard-deleting their organization, whether that organization is the shared Layer5 provider organization or carries an active paid subscription, how many of its resources are also shared into other surviving organizations, and the per-resource blast radius of the deletion.",
        "parameters": [
          {
            "name": "organizationId",
            "in": "query",
            "required": false,
            "description": "Organization to evaluate for deletion alongside the account. When omitted, the caller's currently selected organization is evaluated.",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Account deletion eligibility for the caller",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": false,
                  "description": "Pre-check result returned before an account self-deletion is confirmed. Describes whether deleting the caller's account would also require or permit hard-deleting their organization and quantifies the blast radius. All fields are always present so the client can render the confirmation state deterministically.",
                  "required": [
                    "isSoleActiveMember",
                    "organizationId",
                    "organizationName",
                    "isProviderOrg",
                    "hasActivePaidSubscription",
                    "crossTenantSharedResourceCount",
                    "impact"
                  ],
                  "properties": {
                    "isSoleActiveMember": {
                      "type": "boolean",
                      "description": "True when the caller is the only active member of the organization, so deleting their account would leave the organization without any active members."
                    },
                    "organizationId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "Unique identifier of the organization evaluated for deletion."
                    },
                    "organizationName": {
                      "type": "string",
                      "maxLength": 255,
                      "description": "Human-readable name of the organization evaluated for deletion. The client echoes this value back as organizationNameConfirmation when requesting deletion."
                    },
                    "isProviderOrg": {
                      "type": "boolean",
                      "description": "True when this is the shared Layer5 provider organization, which is never deletable regardless of membership."
                    },
                    "hasActivePaidSubscription": {
                      "type": "boolean",
                      "description": "True when the organization has an active paid (non-\"Personal\"/free) plan subscription that must be cancelled before the organization can be hard-deleted."
                    },
                    "crossTenantSharedResourceCount": {
                      "type": "integer",
                      "minimum": 0,
                      "description": "Count of resources reachable from this organization that are also shared into a different, surviving organization; destroying them affects other tenants. When greater than zero the client must set confirmSharedResourceDestruction to proceed."
                    },
                    "impact": {
                      "type": "object",
                      "additionalProperties": false,
                      "description": "Per-resource counts of the objects that would be destroyed when an organization is hard-deleted alongside the account.",
                      "required": [
                        "workspaces",
                        "environments",
                        "designs",
                        "views",
                        "connections",
                        "credentials",
                        "members",
                        "invitations",
                        "academyRecords"
                      ],
                      "properties": {
                        "workspaces": {
                          "type": "integer",
                          "minimum": 0,
                          "description": "Number of workspaces that would be destroyed."
                        },
                        "environments": {
                          "type": "integer",
                          "minimum": 0,
                          "description": "Number of environments that would be destroyed."
                        },
                        "designs": {
                          "type": "integer",
                          "minimum": 0,
                          "description": "Number of designs that would be destroyed."
                        },
                        "views": {
                          "type": "integer",
                          "minimum": 0,
                          "description": "Number of views that would be destroyed."
                        },
                        "connections": {
                          "type": "integer",
                          "minimum": 0,
                          "description": "Number of connections that would be destroyed."
                        },
                        "credentials": {
                          "type": "integer",
                          "minimum": 0,
                          "description": "Number of credentials that would be destroyed."
                        },
                        "members": {
                          "type": "integer",
                          "minimum": 0,
                          "description": "Number of organization members that would lose access."
                        },
                        "invitations": {
                          "type": "integer",
                          "minimum": 0,
                          "description": "Number of pending invitations that would be revoked."
                        },
                        "academyRecords": {
                          "type": "integer",
                          "minimum": 0,
                          "description": "Number of academy records (challenges, certifications) that would be destroyed."
                        }
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
    "/api/identity/users/self": {
      "delete": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "users"
        ],
        "operationId": "deleteUserAccount",
        "summary": "Delete the caller's own account",
        "description": "Soft-deletes the caller's Layer5 Cloud user record and hard-deletes the backing identity. When deleteOrganization is true, the caller's organization is hard-deleted in the same operation, subject to server-side re-validation: the organization must not be the shared Layer5 provider organization, must not have an active paid subscription, and organizationNameConfirmation must match the stored organization name. When the organization shares resources into other surviving organizations, confirmSharedResourceDestruction must also be true. Inputs are passed as query parameters because DELETE request bodies are unreliable across the extension proxy and intermediate HTTP clients.",
        "parameters": [
          {
            "name": "deleteOrganization",
            "in": "query",
            "required": false,
            "description": "When true, hard-delete the caller's organization along with the account. Defaults to false (delete only the account).",
            "schema": {
              "type": "boolean"
            }
          },
          {
            "name": "organizationId",
            "in": "query",
            "required": false,
            "description": "Identifier of the organization to hard-delete. Required by the server when deleteOrganization is true.",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "name": "organizationNameConfirmation",
            "in": "query",
            "required": false,
            "description": "User-typed organization name. The server re-validates this against the stored organization name when deleteOrganization is true and rejects the request on mismatch.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "confirmSharedResourceDestruction",
            "in": "query",
            "required": false,
            "description": "Explicit acknowledgement that resources shared into other surviving organizations will be destroyed. Required by the server when the organization's crossTenantSharedResourceCount is greater than zero.",
            "schema": {
              "type": "boolean"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Account (and organization, when requested) deleted"
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
          "409": {
            "description": "Publish request already exists",
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
      "409": {
        "description": "Publish request already exists",
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
          "format": "uuid"
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
          "format": "uuid"
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
        "description": "Represents a user",
        "required": [
          "id",
          "userId",
          "provider",
          "email",
          "firstName",
          "lastName",
          "status",
          "createdAt",
          "updatedAt",
          "lastLoginTime",
          "deletedAt"
        ],
        "properties": {
          "id": {
            "description": "Unique identifier for the user",
            "x-go-name": "ID",
            "x-oapi-codegen-extra-tags": {
              "db": "id",
              "json": "id"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "userId": {
            "type": "string",
            "maxLength": 200,
            "description": "User identifier (username or external ID)",
            "x-oapi-codegen-extra-tags": {
              "db": "user_id",
              "json": "userId"
            },
            "x-id-format": "external"
          },
          "provider": {
            "type": "string",
            "maxLength": 100,
            "description": "Authentication provider (e.g., Google, Github)",
            "example": [
              "local",
              "github",
              "google",
              "twitter"
            ],
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
            "description": "URL to user's avatar image",
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
            "description": "User account status",
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
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "region",
              "json": "region"
            }
          },
          "preferences": {
            "x-go-type": "Preference",
            "description": "User preferences stored as JSONB",
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
                  "description": "Placeholder for Adapter struct definition."
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
                "format": "uuid"
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
            "description": "Timestamp when user accepted terms and conditions",
            "x-oapi-codegen-extra-tags": {
              "db": "accepted_terms_at",
              "json": "acceptedTermsAt"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "firstLoginTime": {
            "description": "Timestamp of user's first login",
            "x-oapi-codegen-extra-tags": {
              "db": "first_login_time",
              "json": "firstLoginTime"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "lastLoginTime": {
            "description": "Timestamp of user's most recent login",
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
            "description": "Various online profiles associated with the user account",
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
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at",
              "json": "deletedAt"
            }
          },
          "roleNames": {
            "type": "array",
            "x-go-type": "pq.StringArray",
            "x-go-type-import": {
              "path": "github.com/lib/pq"
            },
            "x-go-type-skip-optional-pointer": true,
            "items": {
              "type": "string"
            },
            "description": "Names of the global roles assigned to the user. Free-form, user-generated values sourced from the roles table (role_name is a varchar, not a fixed enumeration); the seeded system roles such as \"admin\", \"organization admin\" and \"user\" are a subset, not the whole set.",
            "example": [
              "organization admin",
              "user"
            ],
            "x-oapi-codegen-extra-tags": {
              "db": "role_names",
              "json": "roleNames"
            }
          },
          "teams": {
            "type": "object",
            "description": "Teams the user belongs to with role information",
            "x-oapi-codegen-extra-tags": {
              "db": "teams",
              "json": "teams"
            },
            "properties": {
              "teamsWithRoles": {
                "type": "array",
                "description": "Team memberships for the user with their assigned roles.",
                "items": {
                  "type": "object",
                  "additionalProperties": false,
                  "description": "A team the user is a member of, together with the names of the roles assigned to that user within the team. Returned as an item of User.teams.teamsWithRoles. The role names are dynamic, user-generated values (no fixed enumeration).",
                  "required": [
                    "id",
                    "name",
                    "roleNames"
                  ],
                  "properties": {
                    "id": {
                      "description": "Unique identifier of the team.",
                      "x-go-name": "ID",
                      "x-order": 1,
                      "x-oapi-codegen-extra-tags": {
                        "db": "id",
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
                      "description": "Name of the team.",
                      "x-order": 2,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name",
                        "json": "name,omitempty"
                      }
                    },
                    "description": {
                      "type": "string",
                      "description": "Human readable description of the team.",
                      "x-order": 3,
                      "x-oapi-codegen-extra-tags": {
                        "db": "description",
                        "json": "description,omitempty"
                      }
                    },
                    "owner": {
                      "description": "Identifier of the team owner.",
                      "x-order": 4,
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner",
                        "json": "owner,omitempty"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "metadata": {
                      "type": "object",
                      "additionalProperties": true,
                      "description": "Free-form metadata associated with the team.",
                      "x-go-type": "core.Map",
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 5,
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata",
                        "json": "metadata,omitempty"
                      }
                    },
                    "createdAt": {
                      "description": "Timestamp when the team was created.",
                      "x-order": 6,
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "createdAt,omitempty"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp when the team was last updated.",
                      "x-order": 7,
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updatedAt,omitempty"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "nullable": true,
                      "description": "Timestamp when the team was soft-deleted (null if not deleted).",
                      "x-go-type": "core.NullTime",
                      "x-order": 8,
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deletedAt,omitempty"
                      }
                    },
                    "roleNames": {
                      "type": "array",
                      "x-go-type": "pq.StringArray",
                      "x-go-type-import": {
                        "path": "github.com/lib/pq"
                      },
                      "description": "Names of the roles assigned to the user within this team. Free-form, user-generated role names; not a fixed enumeration.",
                      "items": {
                        "type": "string"
                      },
                      "x-order": 9,
                      "x-oapi-codegen-extra-tags": {
                        "db": "role_names",
                        "json": "roleNames"
                      }
                    }
                  }
                },
                "x-oapi-codegen-extra-tags": {
                  "db": "teams_with_roles",
                  "json": "teamsWithRoles"
                }
              },
              "totalCount": {
                "type": "integer",
                "description": "Total number of team memberships returned for the user.",
                "minimum": 0,
                "x-oapi-codegen-extra-tags": {
                  "db": "total_count",
                  "json": "totalCount"
                }
              }
            }
          },
          "organizations": {
            "type": "object",
            "description": "Organizations the user belongs to with role information",
            "x-oapi-codegen-extra-tags": {
              "db": "organizations",
              "json": "organizations"
            },
            "properties": {
              "organizationsWithRoles": {
                "type": "array",
                "description": "Organization memberships for the user with their assigned roles.",
                "items": {
                  "type": "object",
                  "additionalProperties": false,
                  "description": "An organization the user is a member of, together with the names of the roles assigned to that user within the organization. Returned as an item of User.organizations.organizationsWithRoles. The role names are dynamic, user-generated values (no fixed enumeration).",
                  "required": [
                    "id",
                    "name",
                    "roleNames"
                  ],
                  "properties": {
                    "id": {
                      "description": "Unique identifier of the organization.",
                      "x-go-name": "ID",
                      "x-order": 1,
                      "x-oapi-codegen-extra-tags": {
                        "db": "id",
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
                      "description": "Name of the organization.",
                      "x-order": 2,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name",
                        "json": "name,omitempty"
                      }
                    },
                    "description": {
                      "type": "string",
                      "description": "Human readable description of the organization.",
                      "x-order": 3,
                      "x-oapi-codegen-extra-tags": {
                        "db": "description",
                        "json": "description,omitempty"
                      }
                    },
                    "country": {
                      "type": "string",
                      "description": "Country associated with the organization.",
                      "x-order": 4,
                      "x-oapi-codegen-extra-tags": {
                        "db": "country",
                        "json": "country,omitempty"
                      }
                    },
                    "region": {
                      "type": "string",
                      "description": "Region associated with the organization.",
                      "x-order": 5,
                      "x-oapi-codegen-extra-tags": {
                        "db": "region",
                        "json": "region,omitempty"
                      }
                    },
                    "owner": {
                      "description": "Identifier of the organization owner.",
                      "x-order": 6,
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner",
                        "json": "owner,omitempty"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "createdAt": {
                      "description": "Timestamp when the organization was created.",
                      "x-order": 7,
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "createdAt,omitempty"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp when the organization was last updated.",
                      "x-order": 8,
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updatedAt,omitempty"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "nullable": true,
                      "description": "Timestamp when the organization was soft-deleted (null if not deleted).",
                      "x-go-type": "core.NullTime",
                      "x-order": 9,
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deletedAt,omitempty"
                      }
                    },
                    "roleNames": {
                      "type": "array",
                      "x-go-type": "pq.StringArray",
                      "x-go-type-import": {
                        "path": "github.com/lib/pq"
                      },
                      "description": "Names of the roles assigned to the user within this organization. Free-form, user-generated role names; not a fixed enumeration.",
                      "items": {
                        "type": "string"
                      },
                      "x-order": 10,
                      "x-oapi-codegen-extra-tags": {
                        "db": "role_names",
                        "json": "roleNames"
                      }
                    }
                  }
                },
                "x-oapi-codegen-extra-tags": {
                  "db": "organizations_with_roles",
                  "json": "organizationsWithRoles"
                }
              },
              "totalCount": {
                "type": "integer",
                "description": "Total number of organization memberships returned for the user.",
                "minimum": 0,
                "x-oapi-codegen-extra-tags": {
                  "db": "total_count",
                  "json": "totalCount"
                }
              }
            }
          }
        },
        "additionalProperties": false
      },
      "OrganizationWithRoles": {
        "type": "object",
        "additionalProperties": false,
        "description": "An organization the user is a member of, together with the names of the roles assigned to that user within the organization. Returned as an item of User.organizations.organizationsWithRoles. The role names are dynamic, user-generated values (no fixed enumeration).",
        "required": [
          "id",
          "name",
          "roleNames"
        ],
        "properties": {
          "id": {
            "description": "Unique identifier of the organization.",
            "x-go-name": "ID",
            "x-order": 1,
            "x-oapi-codegen-extra-tags": {
              "db": "id",
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
            "description": "Name of the organization.",
            "x-order": 2,
            "x-oapi-codegen-extra-tags": {
              "db": "name",
              "json": "name,omitempty"
            }
          },
          "description": {
            "type": "string",
            "description": "Human readable description of the organization.",
            "x-order": 3,
            "x-oapi-codegen-extra-tags": {
              "db": "description",
              "json": "description,omitempty"
            }
          },
          "country": {
            "type": "string",
            "description": "Country associated with the organization.",
            "x-order": 4,
            "x-oapi-codegen-extra-tags": {
              "db": "country",
              "json": "country,omitempty"
            }
          },
          "region": {
            "type": "string",
            "description": "Region associated with the organization.",
            "x-order": 5,
            "x-oapi-codegen-extra-tags": {
              "db": "region",
              "json": "region,omitempty"
            }
          },
          "owner": {
            "description": "Identifier of the organization owner.",
            "x-order": 6,
            "x-oapi-codegen-extra-tags": {
              "db": "owner",
              "json": "owner,omitempty"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "createdAt": {
            "description": "Timestamp when the organization was created.",
            "x-order": 7,
            "x-oapi-codegen-extra-tags": {
              "db": "created_at",
              "json": "createdAt,omitempty"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp when the organization was last updated.",
            "x-order": 8,
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at",
              "json": "updatedAt,omitempty"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deletedAt": {
            "type": "string",
            "format": "date-time",
            "nullable": true,
            "description": "Timestamp when the organization was soft-deleted (null if not deleted).",
            "x-go-type": "core.NullTime",
            "x-order": 9,
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at",
              "json": "deletedAt,omitempty"
            }
          },
          "roleNames": {
            "type": "array",
            "x-go-type": "pq.StringArray",
            "x-go-type-import": {
              "path": "github.com/lib/pq"
            },
            "description": "Names of the roles assigned to the user within this organization. Free-form, user-generated role names; not a fixed enumeration.",
            "items": {
              "type": "string"
            },
            "x-order": 10,
            "x-oapi-codegen-extra-tags": {
              "db": "role_names",
              "json": "roleNames"
            }
          }
        }
      },
      "TeamWithRoles": {
        "type": "object",
        "additionalProperties": false,
        "description": "A team the user is a member of, together with the names of the roles assigned to that user within the team. Returned as an item of User.teams.teamsWithRoles. The role names are dynamic, user-generated values (no fixed enumeration).",
        "required": [
          "id",
          "name",
          "roleNames"
        ],
        "properties": {
          "id": {
            "description": "Unique identifier of the team.",
            "x-go-name": "ID",
            "x-order": 1,
            "x-oapi-codegen-extra-tags": {
              "db": "id",
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
            "description": "Name of the team.",
            "x-order": 2,
            "x-oapi-codegen-extra-tags": {
              "db": "name",
              "json": "name,omitempty"
            }
          },
          "description": {
            "type": "string",
            "description": "Human readable description of the team.",
            "x-order": 3,
            "x-oapi-codegen-extra-tags": {
              "db": "description",
              "json": "description,omitempty"
            }
          },
          "owner": {
            "description": "Identifier of the team owner.",
            "x-order": 4,
            "x-oapi-codegen-extra-tags": {
              "db": "owner",
              "json": "owner,omitempty"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "metadata": {
            "type": "object",
            "additionalProperties": true,
            "description": "Free-form metadata associated with the team.",
            "x-go-type": "core.Map",
            "x-go-type-skip-optional-pointer": true,
            "x-order": 5,
            "x-oapi-codegen-extra-tags": {
              "db": "metadata",
              "json": "metadata,omitempty"
            }
          },
          "createdAt": {
            "description": "Timestamp when the team was created.",
            "x-order": 6,
            "x-oapi-codegen-extra-tags": {
              "db": "created_at",
              "json": "createdAt,omitempty"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp when the team was last updated.",
            "x-order": 7,
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at",
              "json": "updatedAt,omitempty"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deletedAt": {
            "type": "string",
            "format": "date-time",
            "nullable": true,
            "description": "Timestamp when the team was soft-deleted (null if not deleted).",
            "x-go-type": "core.NullTime",
            "x-order": 8,
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at",
              "json": "deletedAt,omitempty"
            }
          },
          "roleNames": {
            "type": "array",
            "x-go-type": "pq.StringArray",
            "x-go-type-import": {
              "path": "github.com/lib/pq"
            },
            "description": "Names of the roles assigned to the user within this team. Free-form, user-generated role names; not a fixed enumeration.",
            "items": {
              "type": "string"
            },
            "x-order": 9,
            "x-oapi-codegen-extra-tags": {
              "db": "role_names",
              "json": "roleNames"
            }
          }
        }
      },
      "UsersPageForAdmin": {
        "type": "object",
        "description": "Paginated list of users with organization and team role context",
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
              "description": "Represents a user",
              "required": [
                "id",
                "userId",
                "provider",
                "email",
                "firstName",
                "lastName",
                "status",
                "createdAt",
                "updatedAt",
                "lastLoginTime",
                "deletedAt"
              ],
              "properties": {
                "id": {
                  "description": "Unique identifier for the user",
                  "x-go-name": "ID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "id",
                    "json": "id"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "userId": {
                  "type": "string",
                  "maxLength": 200,
                  "description": "User identifier (username or external ID)",
                  "x-oapi-codegen-extra-tags": {
                    "db": "user_id",
                    "json": "userId"
                  },
                  "x-id-format": "external"
                },
                "provider": {
                  "type": "string",
                  "maxLength": 100,
                  "description": "Authentication provider (e.g., Google, Github)",
                  "example": [
                    "local",
                    "github",
                    "google",
                    "twitter"
                  ],
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
                  "description": "URL to user's avatar image",
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
                  "description": "User account status",
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
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "region",
                    "json": "region"
                  }
                },
                "preferences": {
                  "x-go-type": "Preference",
                  "description": "User preferences stored as JSONB",
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
                        "description": "Placeholder for Adapter struct definition."
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
                      "format": "uuid"
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
                  "description": "Timestamp when user accepted terms and conditions",
                  "x-oapi-codegen-extra-tags": {
                    "db": "accepted_terms_at",
                    "json": "acceptedTermsAt"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "firstLoginTime": {
                  "description": "Timestamp of user's first login",
                  "x-oapi-codegen-extra-tags": {
                    "db": "first_login_time",
                    "json": "firstLoginTime"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "lastLoginTime": {
                  "description": "Timestamp of user's most recent login",
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
                  "description": "Various online profiles associated with the user account",
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
                  "x-oapi-codegen-extra-tags": {
                    "db": "deleted_at",
                    "json": "deletedAt"
                  }
                },
                "roleNames": {
                  "type": "array",
                  "x-go-type": "pq.StringArray",
                  "x-go-type-import": {
                    "path": "github.com/lib/pq"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "items": {
                    "type": "string"
                  },
                  "description": "Names of the global roles assigned to the user. Free-form, user-generated values sourced from the roles table (role_name is a varchar, not a fixed enumeration); the seeded system roles such as \"admin\", \"organization admin\" and \"user\" are a subset, not the whole set.",
                  "example": [
                    "organization admin",
                    "user"
                  ],
                  "x-oapi-codegen-extra-tags": {
                    "db": "role_names",
                    "json": "roleNames"
                  }
                },
                "teams": {
                  "type": "object",
                  "description": "Teams the user belongs to with role information",
                  "x-oapi-codegen-extra-tags": {
                    "db": "teams",
                    "json": "teams"
                  },
                  "properties": {
                    "teamsWithRoles": {
                      "type": "array",
                      "description": "Team memberships for the user with their assigned roles.",
                      "items": {
                        "type": "object",
                        "additionalProperties": false,
                        "description": "A team the user is a member of, together with the names of the roles assigned to that user within the team. Returned as an item of User.teams.teamsWithRoles. The role names are dynamic, user-generated values (no fixed enumeration).",
                        "required": [
                          "id",
                          "name",
                          "roleNames"
                        ],
                        "properties": {
                          "id": {
                            "description": "Unique identifier of the team.",
                            "x-go-name": "ID",
                            "x-order": 1,
                            "x-oapi-codegen-extra-tags": {
                              "db": "id",
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
                            "description": "Name of the team.",
                            "x-order": 2,
                            "x-oapi-codegen-extra-tags": {
                              "db": "name",
                              "json": "name,omitempty"
                            }
                          },
                          "description": {
                            "type": "string",
                            "description": "Human readable description of the team.",
                            "x-order": 3,
                            "x-oapi-codegen-extra-tags": {
                              "db": "description",
                              "json": "description,omitempty"
                            }
                          },
                          "owner": {
                            "description": "Identifier of the team owner.",
                            "x-order": 4,
                            "x-oapi-codegen-extra-tags": {
                              "db": "owner",
                              "json": "owner,omitempty"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "metadata": {
                            "type": "object",
                            "additionalProperties": true,
                            "description": "Free-form metadata associated with the team.",
                            "x-go-type": "core.Map",
                            "x-go-type-skip-optional-pointer": true,
                            "x-order": 5,
                            "x-oapi-codegen-extra-tags": {
                              "db": "metadata",
                              "json": "metadata,omitempty"
                            }
                          },
                          "createdAt": {
                            "description": "Timestamp when the team was created.",
                            "x-order": 6,
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "json": "createdAt,omitempty"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp when the team was last updated.",
                            "x-order": 7,
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "json": "updatedAt,omitempty"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deletedAt": {
                            "type": "string",
                            "format": "date-time",
                            "nullable": true,
                            "description": "Timestamp when the team was soft-deleted (null if not deleted).",
                            "x-go-type": "core.NullTime",
                            "x-order": 8,
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "json": "deletedAt,omitempty"
                            }
                          },
                          "roleNames": {
                            "type": "array",
                            "x-go-type": "pq.StringArray",
                            "x-go-type-import": {
                              "path": "github.com/lib/pq"
                            },
                            "description": "Names of the roles assigned to the user within this team. Free-form, user-generated role names; not a fixed enumeration.",
                            "items": {
                              "type": "string"
                            },
                            "x-order": 9,
                            "x-oapi-codegen-extra-tags": {
                              "db": "role_names",
                              "json": "roleNames"
                            }
                          }
                        }
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "teams_with_roles",
                        "json": "teamsWithRoles"
                      }
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of team memberships returned for the user.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "total_count",
                        "json": "totalCount"
                      }
                    }
                  }
                },
                "organizations": {
                  "type": "object",
                  "description": "Organizations the user belongs to with role information",
                  "x-oapi-codegen-extra-tags": {
                    "db": "organizations",
                    "json": "organizations"
                  },
                  "properties": {
                    "organizationsWithRoles": {
                      "type": "array",
                      "description": "Organization memberships for the user with their assigned roles.",
                      "items": {
                        "type": "object",
                        "additionalProperties": false,
                        "description": "An organization the user is a member of, together with the names of the roles assigned to that user within the organization. Returned as an item of User.organizations.organizationsWithRoles. The role names are dynamic, user-generated values (no fixed enumeration).",
                        "required": [
                          "id",
                          "name",
                          "roleNames"
                        ],
                        "properties": {
                          "id": {
                            "description": "Unique identifier of the organization.",
                            "x-go-name": "ID",
                            "x-order": 1,
                            "x-oapi-codegen-extra-tags": {
                              "db": "id",
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
                            "description": "Name of the organization.",
                            "x-order": 2,
                            "x-oapi-codegen-extra-tags": {
                              "db": "name",
                              "json": "name,omitempty"
                            }
                          },
                          "description": {
                            "type": "string",
                            "description": "Human readable description of the organization.",
                            "x-order": 3,
                            "x-oapi-codegen-extra-tags": {
                              "db": "description",
                              "json": "description,omitempty"
                            }
                          },
                          "country": {
                            "type": "string",
                            "description": "Country associated with the organization.",
                            "x-order": 4,
                            "x-oapi-codegen-extra-tags": {
                              "db": "country",
                              "json": "country,omitempty"
                            }
                          },
                          "region": {
                            "type": "string",
                            "description": "Region associated with the organization.",
                            "x-order": 5,
                            "x-oapi-codegen-extra-tags": {
                              "db": "region",
                              "json": "region,omitempty"
                            }
                          },
                          "owner": {
                            "description": "Identifier of the organization owner.",
                            "x-order": 6,
                            "x-oapi-codegen-extra-tags": {
                              "db": "owner",
                              "json": "owner,omitempty"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "createdAt": {
                            "description": "Timestamp when the organization was created.",
                            "x-order": 7,
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "json": "createdAt,omitempty"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp when the organization was last updated.",
                            "x-order": 8,
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "json": "updatedAt,omitempty"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deletedAt": {
                            "type": "string",
                            "format": "date-time",
                            "nullable": true,
                            "description": "Timestamp when the organization was soft-deleted (null if not deleted).",
                            "x-go-type": "core.NullTime",
                            "x-order": 9,
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "json": "deletedAt,omitempty"
                            }
                          },
                          "roleNames": {
                            "type": "array",
                            "x-go-type": "pq.StringArray",
                            "x-go-type-import": {
                              "path": "github.com/lib/pq"
                            },
                            "description": "Names of the roles assigned to the user within this organization. Free-form, user-generated role names; not a fixed enumeration.",
                            "items": {
                              "type": "string"
                            },
                            "x-order": 10,
                            "x-oapi-codegen-extra-tags": {
                              "db": "role_names",
                              "json": "roleNames"
                            }
                          }
                        }
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "organizations_with_roles",
                        "json": "organizationsWithRoles"
                      }
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of organization memberships returned for the user.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "total_count",
                        "json": "totalCount"
                      }
                    }
                  }
                }
              },
              "additionalProperties": false
            },
            "description": "The data of the userspageforadmin."
          }
        }
      },
      "UsersPageForNonAdmin": {
        "type": "object",
        "description": "Paginated list of public user records",
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
              "description": "Represents a user",
              "required": [
                "id",
                "userId",
                "provider",
                "email",
                "firstName",
                "lastName",
                "status",
                "createdAt",
                "updatedAt",
                "lastLoginTime",
                "deletedAt"
              ],
              "properties": {
                "id": {
                  "description": "Unique identifier for the user",
                  "x-go-name": "ID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "id",
                    "json": "id"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "userId": {
                  "type": "string",
                  "maxLength": 200,
                  "description": "User identifier (username or external ID)",
                  "x-oapi-codegen-extra-tags": {
                    "db": "user_id",
                    "json": "userId"
                  },
                  "x-id-format": "external"
                },
                "provider": {
                  "type": "string",
                  "maxLength": 100,
                  "description": "Authentication provider (e.g., Google, Github)",
                  "example": [
                    "local",
                    "github",
                    "google",
                    "twitter"
                  ],
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
                  "description": "URL to user's avatar image",
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
                  "description": "User account status",
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
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "region",
                    "json": "region"
                  }
                },
                "preferences": {
                  "x-go-type": "Preference",
                  "description": "User preferences stored as JSONB",
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
                        "description": "Placeholder for Adapter struct definition."
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
                      "format": "uuid"
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
                  "description": "Timestamp when user accepted terms and conditions",
                  "x-oapi-codegen-extra-tags": {
                    "db": "accepted_terms_at",
                    "json": "acceptedTermsAt"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "firstLoginTime": {
                  "description": "Timestamp of user's first login",
                  "x-oapi-codegen-extra-tags": {
                    "db": "first_login_time",
                    "json": "firstLoginTime"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "lastLoginTime": {
                  "description": "Timestamp of user's most recent login",
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
                  "description": "Various online profiles associated with the user account",
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
                  "x-oapi-codegen-extra-tags": {
                    "db": "deleted_at",
                    "json": "deletedAt"
                  }
                },
                "roleNames": {
                  "type": "array",
                  "x-go-type": "pq.StringArray",
                  "x-go-type-import": {
                    "path": "github.com/lib/pq"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "items": {
                    "type": "string"
                  },
                  "description": "Names of the global roles assigned to the user. Free-form, user-generated values sourced from the roles table (role_name is a varchar, not a fixed enumeration); the seeded system roles such as \"admin\", \"organization admin\" and \"user\" are a subset, not the whole set.",
                  "example": [
                    "organization admin",
                    "user"
                  ],
                  "x-oapi-codegen-extra-tags": {
                    "db": "role_names",
                    "json": "roleNames"
                  }
                },
                "teams": {
                  "type": "object",
                  "description": "Teams the user belongs to with role information",
                  "x-oapi-codegen-extra-tags": {
                    "db": "teams",
                    "json": "teams"
                  },
                  "properties": {
                    "teamsWithRoles": {
                      "type": "array",
                      "description": "Team memberships for the user with their assigned roles.",
                      "items": {
                        "type": "object",
                        "additionalProperties": false,
                        "description": "A team the user is a member of, together with the names of the roles assigned to that user within the team. Returned as an item of User.teams.teamsWithRoles. The role names are dynamic, user-generated values (no fixed enumeration).",
                        "required": [
                          "id",
                          "name",
                          "roleNames"
                        ],
                        "properties": {
                          "id": {
                            "description": "Unique identifier of the team.",
                            "x-go-name": "ID",
                            "x-order": 1,
                            "x-oapi-codegen-extra-tags": {
                              "db": "id",
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
                            "description": "Name of the team.",
                            "x-order": 2,
                            "x-oapi-codegen-extra-tags": {
                              "db": "name",
                              "json": "name,omitempty"
                            }
                          },
                          "description": {
                            "type": "string",
                            "description": "Human readable description of the team.",
                            "x-order": 3,
                            "x-oapi-codegen-extra-tags": {
                              "db": "description",
                              "json": "description,omitempty"
                            }
                          },
                          "owner": {
                            "description": "Identifier of the team owner.",
                            "x-order": 4,
                            "x-oapi-codegen-extra-tags": {
                              "db": "owner",
                              "json": "owner,omitempty"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "metadata": {
                            "type": "object",
                            "additionalProperties": true,
                            "description": "Free-form metadata associated with the team.",
                            "x-go-type": "core.Map",
                            "x-go-type-skip-optional-pointer": true,
                            "x-order": 5,
                            "x-oapi-codegen-extra-tags": {
                              "db": "metadata",
                              "json": "metadata,omitempty"
                            }
                          },
                          "createdAt": {
                            "description": "Timestamp when the team was created.",
                            "x-order": 6,
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "json": "createdAt,omitempty"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp when the team was last updated.",
                            "x-order": 7,
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "json": "updatedAt,omitempty"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deletedAt": {
                            "type": "string",
                            "format": "date-time",
                            "nullable": true,
                            "description": "Timestamp when the team was soft-deleted (null if not deleted).",
                            "x-go-type": "core.NullTime",
                            "x-order": 8,
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "json": "deletedAt,omitempty"
                            }
                          },
                          "roleNames": {
                            "type": "array",
                            "x-go-type": "pq.StringArray",
                            "x-go-type-import": {
                              "path": "github.com/lib/pq"
                            },
                            "description": "Names of the roles assigned to the user within this team. Free-form, user-generated role names; not a fixed enumeration.",
                            "items": {
                              "type": "string"
                            },
                            "x-order": 9,
                            "x-oapi-codegen-extra-tags": {
                              "db": "role_names",
                              "json": "roleNames"
                            }
                          }
                        }
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "teams_with_roles",
                        "json": "teamsWithRoles"
                      }
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of team memberships returned for the user.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "total_count",
                        "json": "totalCount"
                      }
                    }
                  }
                },
                "organizations": {
                  "type": "object",
                  "description": "Organizations the user belongs to with role information",
                  "x-oapi-codegen-extra-tags": {
                    "db": "organizations",
                    "json": "organizations"
                  },
                  "properties": {
                    "organizationsWithRoles": {
                      "type": "array",
                      "description": "Organization memberships for the user with their assigned roles.",
                      "items": {
                        "type": "object",
                        "additionalProperties": false,
                        "description": "An organization the user is a member of, together with the names of the roles assigned to that user within the organization. Returned as an item of User.organizations.organizationsWithRoles. The role names are dynamic, user-generated values (no fixed enumeration).",
                        "required": [
                          "id",
                          "name",
                          "roleNames"
                        ],
                        "properties": {
                          "id": {
                            "description": "Unique identifier of the organization.",
                            "x-go-name": "ID",
                            "x-order": 1,
                            "x-oapi-codegen-extra-tags": {
                              "db": "id",
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
                            "description": "Name of the organization.",
                            "x-order": 2,
                            "x-oapi-codegen-extra-tags": {
                              "db": "name",
                              "json": "name,omitempty"
                            }
                          },
                          "description": {
                            "type": "string",
                            "description": "Human readable description of the organization.",
                            "x-order": 3,
                            "x-oapi-codegen-extra-tags": {
                              "db": "description",
                              "json": "description,omitempty"
                            }
                          },
                          "country": {
                            "type": "string",
                            "description": "Country associated with the organization.",
                            "x-order": 4,
                            "x-oapi-codegen-extra-tags": {
                              "db": "country",
                              "json": "country,omitempty"
                            }
                          },
                          "region": {
                            "type": "string",
                            "description": "Region associated with the organization.",
                            "x-order": 5,
                            "x-oapi-codegen-extra-tags": {
                              "db": "region",
                              "json": "region,omitempty"
                            }
                          },
                          "owner": {
                            "description": "Identifier of the organization owner.",
                            "x-order": 6,
                            "x-oapi-codegen-extra-tags": {
                              "db": "owner",
                              "json": "owner,omitempty"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "createdAt": {
                            "description": "Timestamp when the organization was created.",
                            "x-order": 7,
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "json": "createdAt,omitempty"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp when the organization was last updated.",
                            "x-order": 8,
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "json": "updatedAt,omitempty"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deletedAt": {
                            "type": "string",
                            "format": "date-time",
                            "nullable": true,
                            "description": "Timestamp when the organization was soft-deleted (null if not deleted).",
                            "x-go-type": "core.NullTime",
                            "x-order": 9,
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "json": "deletedAt,omitempty"
                            }
                          },
                          "roleNames": {
                            "type": "array",
                            "x-go-type": "pq.StringArray",
                            "x-go-type-import": {
                              "path": "github.com/lib/pq"
                            },
                            "description": "Names of the roles assigned to the user within this organization. Free-form, user-generated role names; not a fixed enumeration.",
                            "items": {
                              "type": "string"
                            },
                            "x-order": 10,
                            "x-oapi-codegen-extra-tags": {
                              "db": "role_names",
                              "json": "roleNames"
                            }
                          }
                        }
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "organizations_with_roles",
                        "json": "organizationsWithRoles"
                      }
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of organization memberships returned for the user.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "total_count",
                        "json": "totalCount"
                      }
                    }
                  }
                }
              },
              "additionalProperties": false
            },
            "description": "The data of the userspagefornonadmin."
          }
        }
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
              "description": "Placeholder for Adapter struct definition."
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
            "format": "uuid"
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
        "description": "Placeholder for Adapter struct definition."
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
      },
      "AccountDeletionEligibility": {
        "type": "object",
        "additionalProperties": false,
        "description": "Pre-check result returned before an account self-deletion is confirmed. Describes whether deleting the caller's account would also require or permit hard-deleting their organization and quantifies the blast radius. All fields are always present so the client can render the confirmation state deterministically.",
        "required": [
          "isSoleActiveMember",
          "organizationId",
          "organizationName",
          "isProviderOrg",
          "hasActivePaidSubscription",
          "crossTenantSharedResourceCount",
          "impact"
        ],
        "properties": {
          "isSoleActiveMember": {
            "type": "boolean",
            "description": "True when the caller is the only active member of the organization, so deleting their account would leave the organization without any active members."
          },
          "organizationId": {
            "type": "string",
            "format": "uuid",
            "description": "Unique identifier of the organization evaluated for deletion."
          },
          "organizationName": {
            "type": "string",
            "maxLength": 255,
            "description": "Human-readable name of the organization evaluated for deletion. The client echoes this value back as organizationNameConfirmation when requesting deletion."
          },
          "isProviderOrg": {
            "type": "boolean",
            "description": "True when this is the shared Layer5 provider organization, which is never deletable regardless of membership."
          },
          "hasActivePaidSubscription": {
            "type": "boolean",
            "description": "True when the organization has an active paid (non-\"Personal\"/free) plan subscription that must be cancelled before the organization can be hard-deleted."
          },
          "crossTenantSharedResourceCount": {
            "type": "integer",
            "minimum": 0,
            "description": "Count of resources reachable from this organization that are also shared into a different, surviving organization; destroying them affects other tenants. When greater than zero the client must set confirmSharedResourceDestruction to proceed."
          },
          "impact": {
            "type": "object",
            "additionalProperties": false,
            "description": "Per-resource counts of the objects that would be destroyed when an organization is hard-deleted alongside the account.",
            "required": [
              "workspaces",
              "environments",
              "designs",
              "views",
              "connections",
              "credentials",
              "members",
              "invitations",
              "academyRecords"
            ],
            "properties": {
              "workspaces": {
                "type": "integer",
                "minimum": 0,
                "description": "Number of workspaces that would be destroyed."
              },
              "environments": {
                "type": "integer",
                "minimum": 0,
                "description": "Number of environments that would be destroyed."
              },
              "designs": {
                "type": "integer",
                "minimum": 0,
                "description": "Number of designs that would be destroyed."
              },
              "views": {
                "type": "integer",
                "minimum": 0,
                "description": "Number of views that would be destroyed."
              },
              "connections": {
                "type": "integer",
                "minimum": 0,
                "description": "Number of connections that would be destroyed."
              },
              "credentials": {
                "type": "integer",
                "minimum": 0,
                "description": "Number of credentials that would be destroyed."
              },
              "members": {
                "type": "integer",
                "minimum": 0,
                "description": "Number of organization members that would lose access."
              },
              "invitations": {
                "type": "integer",
                "minimum": 0,
                "description": "Number of pending invitations that would be revoked."
              },
              "academyRecords": {
                "type": "integer",
                "minimum": 0,
                "description": "Number of academy records (challenges, certifications) that would be destroyed."
              }
            }
          }
        }
      },
      "AccountDeletionImpact": {
        "type": "object",
        "additionalProperties": false,
        "description": "Per-resource counts of the objects that would be destroyed when an organization is hard-deleted alongside the account.",
        "required": [
          "workspaces",
          "environments",
          "designs",
          "views",
          "connections",
          "credentials",
          "members",
          "invitations",
          "academyRecords"
        ],
        "properties": {
          "workspaces": {
            "type": "integer",
            "minimum": 0,
            "description": "Number of workspaces that would be destroyed."
          },
          "environments": {
            "type": "integer",
            "minimum": 0,
            "description": "Number of environments that would be destroyed."
          },
          "designs": {
            "type": "integer",
            "minimum": 0,
            "description": "Number of designs that would be destroyed."
          },
          "views": {
            "type": "integer",
            "minimum": 0,
            "description": "Number of views that would be destroyed."
          },
          "connections": {
            "type": "integer",
            "minimum": 0,
            "description": "Number of connections that would be destroyed."
          },
          "credentials": {
            "type": "integer",
            "minimum": 0,
            "description": "Number of credentials that would be destroyed."
          },
          "members": {
            "type": "integer",
            "minimum": 0,
            "description": "Number of organization members that would lose access."
          },
          "invitations": {
            "type": "integer",
            "minimum": 0,
            "description": "Number of pending invitations that would be revoked."
          },
          "academyRecords": {
            "type": "integer",
            "minimum": 0,
            "description": "Number of academy records (challenges, certifications) that would be destroyed."
          }
        }
      }
    }
  }
};

export default UserSchema;
