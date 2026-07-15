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
              "type": "integer"
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "description": "Get responses by page size",
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
                            "deprecated": true,
                            "description": "Legacy IdP-derived identifier. Removed in v1beta3; resolve users by id or email.",
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
                      "deprecated": true,
                      "description": "Legacy IdP-derived identifier. Removed in v1beta3; resolve users by id or email.",
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
                      "deprecated": true,
                      "description": "Legacy IdP-derived identifier. Removed in v1beta3; resolve users by id or email.",
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
    "/api/identity/users/profile/details": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "users"
        ],
        "operationId": "getUserProfileOverview",
        "summary": "Get profile overview counts for the current user",
        "description": "Returns the aggregate counts shown on the caller's profile overview: the number of Kubernetes contexts and the number of designs owned by the caller.",
        "responses": {
          "200": {
            "description": "Profile overview counts for the caller",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": false,
                  "description": "Aggregate counts shown on the current user's profile overview.",
                  "required": [
                    "k8sCount",
                    "patternCount"
                  ],
                  "properties": {
                    "k8sCount": {
                      "type": "integer",
                      "minimum": 0,
                      "description": "Number of Kubernetes contexts owned by the user.",
                      "x-go-name": "KubernetesContexts"
                    },
                    "patternCount": {
                      "type": "integer",
                      "minimum": 0,
                      "description": "Number of designs owned by the user.",
                      "x-go-name": "PatternsCount"
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
    "/api/identity/users/{userId}/profile/activity": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "users"
        ],
        "operationId": "getUserRecentActivities",
        "summary": "Get recent activity for a user's public profile",
        "description": "Returns the recent-activity feed shown on a user's public profile. Accessible without authentication; sensitive event categories are filtered out and email addresses are redacted unless the caller is a provider admin or is viewing their own profile. Pagination beyond the first page requires provider-admin privileges.",
        "security": [],
        "parameters": [
          {
            "name": "userId",
            "in": "path",
            "required": true,
            "description": "ID of the user",
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
            "description": "Zero-based page index of the activity feed.",
            "schema": {
              "type": "integer",
              "minimum": 0
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "description": "Number of activity entries per page.",
            "schema": {
              "type": "integer",
              "minimum": 1
            }
          },
          {
            "name": "pagesize",
            "in": "query",
            "deprecated": true,
            "description": "Deprecated lowercase alias of pageSize, kept while existing clients migrate to the canonical camelCase parameter.",
            "schema": {
              "type": "integer",
              "minimum": 1
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
            "description": "Recent-activity page for the requested user",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated recent-activity feed for a user's public profile.",
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
                    "activities": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "additionalProperties": false,
                        "description": "A single entry in a user's recent-activity feed. A narrow projection of the stored event record (id, category, action, description, owner and timestamps). The pre-migration meshery-cloud serialization emitted additional zero-valued event fields; those disappear once the server consumes this generated type.",
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
                          "category": {
                            "type": "string",
                            "maxLength": 500,
                            "description": "Resource category on which the activity occurred.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "category",
                              "json": "category"
                            }
                          },
                          "action": {
                            "type": "string",
                            "maxLength": 500,
                            "description": "Action recorded by the activity.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "action",
                              "json": "action"
                            }
                          },
                          "description": {
                            "type": "string",
                            "maxLength": 5000,
                            "description": "Human-readable description of the activity. Email addresses are redacted for non-privileged viewers.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "description",
                              "json": "description"
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
                              "db": "owner",
                              "json": "owner"
                            }
                          },
                          "createdAt": {
                            "description": "Timestamp when the activity was recorded.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "json": "createdAt"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp when the activity was last updated.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "json": "updatedAt"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          }
                        }
                      },
                      "description": "The activity entries on the current page."
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
        "operationId": "notifyMentionUsers",
        "summary": "Notify users mentioned in a design comment",
        "description": "Sends email notifications to the users mentioned in a design comment, to the comment thread participants, and to the design owner, and records a user event for the comment.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "additionalProperties": false,
                "description": "Request body for notifying users about a design comment: the users mentioned in the comment, the thread participants, and the comment messages to include in the notification email.",
                "required": [
                  "designId"
                ],
                "properties": {
                  "mentionUsers": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "description": "IDs of the users explicitly mentioned in the comment."
                  },
                  "participants": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "description": "IDs of the users participating in the comment thread."
                  },
                  "designId": {
                    "type": "string",
                    "format": "uuid",
                    "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    },
                    "x-go-name": "DesignID"
                  },
                  "usersOptedOutOfNotifications": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "description": "IDs of the users who opted out of mention notifications."
                  },
                  "messages": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "additionalProperties": false,
                      "description": "A single comment message included in a mention notification.",
                      "properties": {
                        "firstName": {
                          "type": "string",
                          "maxLength": 200,
                          "description": "First name of the comment author."
                        },
                        "lastName": {
                          "type": "string",
                          "maxLength": 300,
                          "description": "Last name of the comment author."
                        },
                        "avatarUrl": {
                          "type": "string",
                          "format": "uri",
                          "maxLength": 500,
                          "description": "URL to the comment author's avatar image.",
                          "x-go-name": "AvatarURL"
                        },
                        "message": {
                          "type": "string",
                          "maxLength": 5000,
                          "description": "Text of the comment message."
                        },
                        "timestamp": {
                          "description": "Timestamp when the comment message was written.",
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
                          },
                          "x-go-name": "UserID"
                        }
                      }
                    },
                    "description": "The comment messages to include in the notification email."
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Mention notifications dispatched"
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
    "/api/identity/users/anonymous": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "users"
        ],
        "operationId": "createAnonymousUserSession",
        "summary": "Create an anonymous user and issue a session token",
        "description": "Mints a synthetic anonymous user account, registers the calling Meshery instance as a connection, and returns an access token together with the capability document for the anonymous session. Authenticated with the shared anonymous-results publishing token rather than a user JWT.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for creating or updating a connection",
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "description": "Connection ID",
                    "x-go-name": "ConnectionID",
                    "x-oapi-codegen-extra-tags": {
                      "json": "id,omitempty"
                    }
                  },
                  "name": {
                    "type": "string",
                    "description": "Connection name",
                    "x-oapi-codegen-extra-tags": {
                      "json": "name"
                    },
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "kind": {
                    "type": "string",
                    "description": "Connection kind",
                    "x-oapi-codegen-extra-tags": {
                      "json": "kind"
                    },
                    "maxLength": 255
                  },
                  "type": {
                    "type": "string",
                    "description": "Connection type",
                    "x-oapi-codegen-extra-tags": {
                      "json": "type"
                    },
                    "maxLength": 255
                  },
                  "subType": {
                    "type": "string",
                    "description": "Connection sub-type",
                    "x-oapi-codegen-extra-tags": {
                      "json": "subType"
                    },
                    "maxLength": 255
                  },
                  "credentialSecret": {
                    "type": "object",
                    "description": "Credential secret data",
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "credentialSecret"
                    }
                  },
                  "metadata": {
                    "type": "object",
                    "description": "Connection metadata",
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "metadata"
                    }
                  },
                  "styles": {
                    "x-go-type": "core.ComponentStyles",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    },
                    "x-oapi-codegen-extra-tags": {
                      "json": "styles,omitempty"
                    },
                    "description": "Visualization styles for the connection, including svgColor and svgWhite used for UI representation.",
                    "type": "object",
                    "required": [
                      "shape",
                      "primaryColor",
                      "svgColor",
                      "svgWhite",
                      "svgComplete"
                    ],
                    "allOf": [
                      {
                        "type": "object",
                        "description": "Common styles for all entities",
                        "additionalProperties": true,
                        "required": [
                          "primaryColor",
                          "svgColor",
                          "svgWhite",
                          "svgComplete"
                        ],
                        "properties": {
                          "primaryColor": {
                            "type": "string",
                            "description": "Primary color of the component used for UI representation.",
                            "maxLength": 500
                          },
                          "secondaryColor": {
                            "type": "string",
                            "description": "Secondary color of the entity used for UI representation.",
                            "maxLength": 500
                          },
                          "svgWhite": {
                            "type": "string",
                            "description": "White SVG of the entity used for UI representation on dark background.",
                            "maxLength": 500
                          },
                          "svgColor": {
                            "type": "string",
                            "description": "Colored SVG of the entity used for UI representation on light background.",
                            "maxLength": 500
                          },
                          "svgComplete": {
                            "type": "string",
                            "description": "Complete SVG of the entity used for UI representation, often inclusive of background.",
                            "maxLength": 500
                          },
                          "color": {
                            "type": "string",
                            "description": "The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 500
                          },
                          "textOpacity": {
                            "type": "number",
                            "description": "The opacity of the label text, including its outline.",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "fontFamily": {
                            "type": "string",
                            "description": "A comma-separated list of font names to use on the label text.",
                            "maxLength": 500
                          },
                          "fontSize": {
                            "type": "string",
                            "description": "The size of the label text.",
                            "maxLength": 500
                          },
                          "fontStyle": {
                            "type": "string",
                            "description": "A CSS font style to be applied to the label text.",
                            "maxLength": 500
                          },
                          "fontWeight": {
                            "type": "string",
                            "description": "A CSS font weight to be applied to the label text.",
                            "maxLength": 500
                          },
                          "textTransform": {
                            "type": "string",
                            "description": "A transformation to apply to the label text",
                            "enum": [
                              "none",
                              "uppercase",
                              "lowercase"
                            ]
                          },
                          "opacity": {
                            "type": "number",
                            "description": "The opacity of the element, ranging from 0 to 1. Note that the opacity of a compound node parent affects the effective opacity of its children.",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "zIndex": {
                            "type": "integer",
                            "description": "An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index.",
                            "minimum": 0
                          },
                          "label": {
                            "type": "string",
                            "description": "The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id",
                            "maxLength": 500
                          },
                          "animation": {
                            "type": "object",
                            "description": "The animation to apply to the element. example ripple,bounce,etc"
                          }
                        }
                      },
                      {
                        "type": "object",
                        "properties": {
                          "shape": {
                            "type": "string",
                            "description": "The shape of the node's body. Note that each shape fits within the specified width and height, and so you may have to adjust width and height if you desire an equilateral shape (i.e. width !== height for several equilateral shapes)",
                            "enum": [
                              "ellipse",
                              "triangle",
                              "round-triangle",
                              "rectangle",
                              "round-rectangle",
                              "bottom-round-rectangle",
                              "cut-rectangle",
                              "barrel",
                              "rhomboid",
                              "diamond",
                              "round-diamond",
                              "pentagon",
                              "round-pentagon",
                              "hexagon",
                              "round-hexagon",
                              "concave-hexagon",
                              "heptagon",
                              "round-heptagon",
                              "octagon",
                              "round-octagon",
                              "star",
                              "tag",
                              "round-tag",
                              "vee",
                              "polygon"
                            ]
                          },
                          "position": {
                            "type": "object",
                            "additionalProperties": false,
                            "required": [
                              "x",
                              "y"
                            ],
                            "description": "The position of the node. If the position is set, the node is drawn at that position in the given dimensions. If the position is not set, the node is drawn at a random position.",
                            "properties": {
                              "x": {
                                "type": "number",
                                "description": "The x-coordinate of the node.",
                                "minimum": -1000000,
                                "maximum": 1000000,
                                "x-go-type": "float64"
                              },
                              "y": {
                                "type": "number",
                                "description": "The y-coordinate of the node.",
                                "minimum": -1000000,
                                "maximum": 1000000,
                                "x-go-type": "float64"
                              }
                            }
                          },
                          "bodyText": {
                            "type": "string",
                            "description": "The text to display for an element's body. Can give a path, e.g. data(id) will label with the elements id",
                            "maxLength": 500
                          },
                          "bodyTextWrap": {
                            "type": "string",
                            "description": "How to wrap the text in the node. Can be 'none', 'wrap', or 'ellipsis'.",
                            "enum": [
                              "none",
                              "wrap",
                              "ellipsis"
                            ]
                          },
                          "bodyTextMaxWidth": {
                            "type": "string",
                            "description": "The maximum width for wrapping text in the node.",
                            "maxLength": 50
                          },
                          "bodyTextOpacity": {
                            "type": "number",
                            "description": "The opacity of the node's body text, including its outline.",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "bodyTextBackgroundColor": {
                            "type": "string",
                            "description": "The colour of the node's body text background. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "bodyTextFontSize": {
                            "type": "number",
                            "description": "The size of the node's body text.",
                            "minimum": 0
                          },
                          "bodyTextColor": {
                            "type": "string",
                            "description": "The colour of the node's body text. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "bodyTextFontWeight": {
                            "type": "string",
                            "description": "A CSS font weight to be applied to the node's body text.",
                            "maxLength": 50
                          },
                          "bodyTextHorizontalAlign": {
                            "type": "string",
                            "description": "A CSS horizontal alignment to be applied to the node's body text.",
                            "maxLength": 50
                          },
                          "bodyTextDecoration": {
                            "type": "string",
                            "description": "A CSS text decoration to be applied to the node's body text.",
                            "maxLength": 100
                          },
                          "bodyTextVerticalAlign": {
                            "type": "string",
                            "description": "A CSS vertical alignment to be applied to the node's body text.",
                            "maxLength": 50
                          },
                          "width": {
                            "type": "number",
                            "description": "The width of the node's body or the width of an edge's line.",
                            "minimum": 0
                          },
                          "height": {
                            "type": "number",
                            "description": "The height of the node's body",
                            "minimum": 0
                          },
                          "backgroundImage": {
                            "type": "string",
                            "format": "uri",
                            "description": "The URL that points to the image to show in the node.",
                            "maxLength": 2048
                          },
                          "backgroundColor": {
                            "type": "string",
                            "description": "The colour of the node's body. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "backgroundBlacken": {
                            "type": "number",
                            "description": "Blackens the node's body for values from 0 to 1; whitens the node's body for values from 0 to -1.",
                            "maximum": 1,
                            "minimum": -1
                          },
                          "backgroundOpacity": {
                            "type": "number",
                            "description": "The opacity level of the node's background colour",
                            "maximum": 1,
                            "minimum": 0
                          },
                          "backgroundPositionX": {
                            "type": "string",
                            "description": "The x position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                            "maxLength": 50
                          },
                          "backgroundPositionY": {
                            "type": "string",
                            "description": "The y position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                            "maxLength": 50
                          },
                          "backgroundOffsetX": {
                            "type": "string",
                            "description": "The x offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                            "maxLength": 50
                          },
                          "backgroundOffsetY": {
                            "type": "string",
                            "description": "The y offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                            "maxLength": 50
                          },
                          "backgroundFit": {
                            "type": "string",
                            "description": "How the background image is fit to the node. Can be 'none', 'contain', or 'cover'.",
                            "enum": [
                              "none",
                              "contain",
                              "cover"
                            ]
                          },
                          "backgroundClip": {
                            "type": "string",
                            "description": "How the background image is clipped to the node. Can be 'none', 'node', or 'node-border'.",
                            "enum": [
                              "none",
                              "node",
                              "node-border"
                            ]
                          },
                          "backgroundWidthRelativeTo": {
                            "type": "string",
                            "description": "How the background image's width is determined. Can be 'none', 'inner', or 'outer'.",
                            "enum": [
                              "none",
                              "inner",
                              "outer"
                            ]
                          },
                          "backgroundHeightRelativeTo": {
                            "type": "string",
                            "description": "How the background image's height is determined. Can be 'none', 'inner', or 'outer'.",
                            "enum": [
                              "none",
                              "inner",
                              "outer"
                            ]
                          },
                          "borderWidth": {
                            "type": "number",
                            "description": "The size of the node's border.",
                            "minimum": 0
                          },
                          "borderStyle": {
                            "type": "string",
                            "description": "The style of the node's border",
                            "enum": [
                              "solid",
                              "dotted",
                              "dashed",
                              "double"
                            ]
                          },
                          "borderColor": {
                            "type": "string",
                            "description": "The colour of the node's border. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "borderOpacity": {
                            "type": "number",
                            "description": "The opacity of the node's border",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "padding": {
                            "type": "number",
                            "description": "The amount of padding around all sides of the node.",
                            "minimum": 0
                          },
                          "textHalign": {
                            "type": "string",
                            "description": "The horizontal alignment of a node's label",
                            "enum": [
                              "left",
                              "center",
                              "right"
                            ]
                          },
                          "textValign": {
                            "type": "string",
                            "description": "The vertical alignment of a node's label",
                            "enum": [
                              "top",
                              "center",
                              "bottom"
                            ]
                          },
                          "ghost": {
                            "type": "string",
                            "description": "Whether to use the ghost effect, a semitransparent duplicate of the element drawn at an offset.",
                            "default": "no",
                            "enum": [
                              "yes",
                              "no"
                            ]
                          },
                          "activeBgColor": {
                            "type": "string",
                            "description": "The colour of the indicator shown when the background is grabbed by the user. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "activeBgOpacity": {
                            "type": "string",
                            "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                            "maxLength": 50
                          },
                          "activeBgSize": {
                            "type": "string",
                            "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                            "maxLength": 50
                          },
                          "selectionBoxColor": {
                            "type": "string",
                            "description": "The background colour of the selection box used for drag selection. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "selectionBoxBorderWidth": {
                            "type": "number",
                            "description": "The size of the border on the selection box. Selector needs to be *core*",
                            "minimum": 0
                          },
                          "selectionBoxOpacity": {
                            "type": "number",
                            "description": "The opacity of the selection box. Selector needs to be *core*",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "outsideTextureBgColor": {
                            "type": "string",
                            "description": "The colour of the area outside the viewport texture when initOptions.textureOnViewport === true. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "outsideTextureBgOpacity": {
                            "type": "number",
                            "description": "The opacity of the area outside the viewport texture. Selector needs to be *core*",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "shapePolygonPoints": {
                            "type": "string",
                            "description": "An array (or a space-separated string) of numbers ranging on [-1, 1], representing alternating x and y values (i.e. x1 y1 x2 y2, x3 y3 ...). This represents the points in the polygon for the node's shape. The bounding box of the node is given by (-1, -1), (1, -1), (1, 1), (-1, 1). The node's position is the origin (0, 0 )",
                            "maxLength": 2000
                          },
                          "menuBackgroundColor": {
                            "type": "string",
                            "description": "The colour of the background of the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "menuBackgroundOpacity": {
                            "type": "number",
                            "description": "The opacity of the background of the component menu.",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "menuForgroundColor": {
                            "type": "string",
                            "description": "The colour of the text or icons in the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          }
                        }
                      }
                    ]
                  },
                  "status": {
                    "type": "string",
                    "description": "Connection status",
                    "x-oapi-codegen-extra-tags": {
                      "json": "status"
                    },
                    "maxLength": 255
                  },
                  "credentialId": {
                    "type": "string",
                    "format": "uuid",
                    "description": "Associated credential ID",
                    "x-go-name": "CredentialID",
                    "x-oapi-codegen-extra-tags": {
                      "json": "credentialId,omitempty"
                    }
                  }
                },
                "required": [
                  "name",
                  "kind",
                  "type",
                  "subType",
                  "status"
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Anonymous session issued",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": false,
                  "description": "Response returned after minting an anonymous user session: the session access token, the ID of the synthetic anonymous user, and the capability document for the session.",
                  "required": [
                    "accessToken",
                    "userId"
                  ],
                  "properties": {
                    "accessToken": {
                      "type": "string",
                      "maxLength": 4096,
                      "description": "JWT access token for the anonymous session.",
                      "x-oapi-codegen-extra-tags": {
                        "json": "accessToken"
                      }
                    },
                    "capability": {
                      "type": "object",
                      "additionalProperties": true,
                      "description": "Capability document for the anonymous session. Untyped pending the provider-capabilities schema tracked separately in the identifier-uniformity program.",
                      "x-go-name": "Capabilities"
                    },
                    "userId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-name": "UserID",
                      "x-oapi-codegen-extra-tags": {
                        "json": "userId"
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
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
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
    "/api/identity/users/{userId}/emails": {
      "get": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "users"
        ],
        "operationId": "getUserEmailAddresses",
        "summary": "Get email addresses for a user",
        "description": "Returns all email addresses associated with a user account: the single live primary address (mirrored in users.email) and any secondary addresses accumulated from account consolidation or explicit addition.",
        "parameters": [
          {
            "name": "userId",
            "in": "path",
            "required": true,
            "description": "ID of the user",
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
            "description": "Email addresses associated with the requested user",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "additionalProperties": false,
                    "description": "One email address associated with a user account. A user has exactly one primary address (mirrored in users.email) and any number of secondary addresses accumulated from account consolidation or explicit addition. Uniqueness across live addresses is enforced case-insensitively.",
                    "required": [
                      "id",
                      "userId",
                      "email",
                      "verified",
                      "isPrimary",
                      "source",
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
                        "format": "uuid",
                        "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        },
                        "x-go-name": "UserID",
                        "x-oapi-codegen-extra-tags": {
                          "db": "owner",
                          "json": "userId"
                        }
                      },
                      "email": {
                        "type": "string",
                        "format": "email",
                        "maxLength": 300,
                        "description": "The email address",
                        "x-oapi-codegen-extra-tags": {
                          "db": "email",
                          "json": "email"
                        }
                      },
                      "verified": {
                        "type": "boolean",
                        "default": false,
                        "description": "Whether the address was verified (per Kratos verifiable addresses) at record time",
                        "x-oapi-codegen-extra-tags": {
                          "db": "verified",
                          "json": "verified"
                        }
                      },
                      "isPrimary": {
                        "type": "boolean",
                        "default": false,
                        "description": "Exactly one live primary address per user; mirrors users.email",
                        "x-oapi-codegen-extra-tags": {
                          "db": "is_primary",
                          "json": "isPrimary"
                        }
                      },
                      "source": {
                        "type": "string",
                        "enum": [
                          "signup",
                          "consolidation",
                          "backfill",
                          "manual"
                        ],
                        "description": "How this address became associated with the account",
                        "x-oapi-codegen-extra-tags": {
                          "db": "source",
                          "json": "source"
                        }
                      },
                      "createdAt": {
                        "x-oapi-codegen-extra-tags": {
                          "db": "created_at",
                          "json": "createdAt"
                        },
                        "type": "string",
                        "format": "date-time",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "updatedAt": {
                        "x-oapi-codegen-extra-tags": {
                          "db": "updated_at",
                          "json": "updatedAt"
                        },
                        "type": "string",
                        "format": "date-time",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "deletedAt": {
                        "x-oapi-codegen-extra-tags": {
                          "db": "deleted_at",
                          "json": "deletedAt"
                        },
                        "description": "SQL null Timestamp to handle null values of time.",
                        "x-go-type": "meshcore.NullTime",
                        "x-go-type-import": {
                          "name": "meshcore",
                          "path": "github.com/meshery/schemas/models/core"
                        },
                        "type": "string",
                        "format": "date-time",
                        "nullable": true,
                        "x-go-type-skip-optional-pointer": true
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
              "format": "uuid",
              "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              }
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
            "description": "Deletion preconditions were not met. Returned when the target organization is the shared Layer5 provider organization, has an active paid subscription, the caller is not its sole active member, the typed organizationNameConfirmation did not match, or destruction of shared resources was required but not confirmed.",
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
      },
      "AccountDeletionConflict": {
        "description": "Deletion preconditions were not met. Returned when the target organization is the shared Layer5 provider organization, has an active paid subscription, the caller is not its sole active member, the typed organizationNameConfirmation did not match, or destruction of shared resources was required but not confirmed.",
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
      "userId": {
        "name": "userId",
        "in": "path",
        "required": true,
        "description": "ID of the user",
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
          "type": "integer"
        }
      },
      "pageSize": {
        "name": "pageSize",
        "in": "query",
        "description": "Get responses by page size",
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
            "deprecated": true,
            "description": "Legacy IdP-derived identifier. Removed in v1beta3; resolve users by id or email.",
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
      "UserEmailAddress": {
        "type": "object",
        "additionalProperties": false,
        "description": "One email address associated with a user account. A user has exactly one primary address (mirrored in users.email) and any number of secondary addresses accumulated from account consolidation or explicit addition. Uniqueness across live addresses is enforced case-insensitively.",
        "required": [
          "id",
          "userId",
          "email",
          "verified",
          "isPrimary",
          "source",
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
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-name": "UserID",
            "x-oapi-codegen-extra-tags": {
              "db": "owner",
              "json": "userId"
            }
          },
          "email": {
            "type": "string",
            "format": "email",
            "maxLength": 300,
            "description": "The email address",
            "x-oapi-codegen-extra-tags": {
              "db": "email",
              "json": "email"
            }
          },
          "verified": {
            "type": "boolean",
            "default": false,
            "description": "Whether the address was verified (per Kratos verifiable addresses) at record time",
            "x-oapi-codegen-extra-tags": {
              "db": "verified",
              "json": "verified"
            }
          },
          "isPrimary": {
            "type": "boolean",
            "default": false,
            "description": "Exactly one live primary address per user; mirrors users.email",
            "x-oapi-codegen-extra-tags": {
              "db": "is_primary",
              "json": "isPrimary"
            }
          },
          "source": {
            "type": "string",
            "enum": [
              "signup",
              "consolidation",
              "backfill",
              "manual"
            ],
            "description": "How this address became associated with the account",
            "x-oapi-codegen-extra-tags": {
              "db": "source",
              "json": "source"
            }
          },
          "createdAt": {
            "x-oapi-codegen-extra-tags": {
              "db": "created_at",
              "json": "createdAt"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at",
              "json": "updatedAt"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deletedAt": {
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at",
              "json": "deletedAt"
            },
            "description": "SQL null Timestamp to handle null values of time.",
            "x-go-type": "meshcore.NullTime",
            "x-go-type-import": {
              "name": "meshcore",
              "path": "github.com/meshery/schemas/models/core"
            },
            "type": "string",
            "format": "date-time",
            "nullable": true,
            "x-go-type-skip-optional-pointer": true
          }
        }
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
                  "deprecated": true,
                  "description": "Legacy IdP-derived identifier. Removed in v1beta3; resolve users by id or email.",
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
        "deprecated": true,
        "description": "Deprecated: the public users directory (/api/users, getUsers) is documented by the v1beta3 user construct's PublicUsersPage, which reflects the reduced projection actually served since the directory was hardened. This full-User page shape was never what the endpoint returned post-hardening and is retained only for compatibility with existing type imports.",
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
                  "deprecated": true,
                  "description": "Legacy IdP-derived identifier. Removed in v1beta3; resolve users by id or email.",
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
      "ProfileOverview": {
        "type": "object",
        "additionalProperties": false,
        "description": "Aggregate counts shown on the current user's profile overview.",
        "required": [
          "k8sCount",
          "patternCount"
        ],
        "properties": {
          "k8sCount": {
            "type": "integer",
            "minimum": 0,
            "description": "Number of Kubernetes contexts owned by the user.",
            "x-go-name": "KubernetesContexts"
          },
          "patternCount": {
            "type": "integer",
            "minimum": 0,
            "description": "Number of designs owned by the user.",
            "x-go-name": "PatternsCount"
          }
        }
      },
      "UserActivity": {
        "type": "object",
        "additionalProperties": false,
        "description": "A single entry in a user's recent-activity feed. A narrow projection of the stored event record (id, category, action, description, owner and timestamps). The pre-migration meshery-cloud serialization emitted additional zero-valued event fields; those disappear once the server consumes this generated type.",
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
          "category": {
            "type": "string",
            "maxLength": 500,
            "description": "Resource category on which the activity occurred.",
            "x-oapi-codegen-extra-tags": {
              "db": "category",
              "json": "category"
            }
          },
          "action": {
            "type": "string",
            "maxLength": 500,
            "description": "Action recorded by the activity.",
            "x-oapi-codegen-extra-tags": {
              "db": "action",
              "json": "action"
            }
          },
          "description": {
            "type": "string",
            "maxLength": 5000,
            "description": "Human-readable description of the activity. Email addresses are redacted for non-privileged viewers.",
            "x-oapi-codegen-extra-tags": {
              "db": "description",
              "json": "description"
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
              "db": "owner",
              "json": "owner"
            }
          },
          "createdAt": {
            "description": "Timestamp when the activity was recorded.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at",
              "json": "createdAt"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp when the activity was last updated.",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at",
              "json": "updatedAt"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "RecentActivityPage": {
        "type": "object",
        "description": "Paginated recent-activity feed for a user's public profile.",
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
          "activities": {
            "type": "array",
            "items": {
              "type": "object",
              "additionalProperties": false,
              "description": "A single entry in a user's recent-activity feed. A narrow projection of the stored event record (id, category, action, description, owner and timestamps). The pre-migration meshery-cloud serialization emitted additional zero-valued event fields; those disappear once the server consumes this generated type.",
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
                "category": {
                  "type": "string",
                  "maxLength": 500,
                  "description": "Resource category on which the activity occurred.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "category",
                    "json": "category"
                  }
                },
                "action": {
                  "type": "string",
                  "maxLength": 500,
                  "description": "Action recorded by the activity.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "action",
                    "json": "action"
                  }
                },
                "description": {
                  "type": "string",
                  "maxLength": 5000,
                  "description": "Human-readable description of the activity. Email addresses are redacted for non-privileged viewers.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "description",
                    "json": "description"
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
                    "db": "owner",
                    "json": "owner"
                  }
                },
                "createdAt": {
                  "description": "Timestamp when the activity was recorded.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at",
                    "json": "createdAt"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updatedAt": {
                  "description": "Timestamp when the activity was last updated.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at",
                    "json": "updatedAt"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                }
              }
            },
            "description": "The activity entries on the current page."
          }
        }
      },
      "MentionMessage": {
        "type": "object",
        "additionalProperties": false,
        "description": "A single comment message included in a mention notification.",
        "properties": {
          "firstName": {
            "type": "string",
            "maxLength": 200,
            "description": "First name of the comment author."
          },
          "lastName": {
            "type": "string",
            "maxLength": 300,
            "description": "Last name of the comment author."
          },
          "avatarUrl": {
            "type": "string",
            "format": "uri",
            "maxLength": 500,
            "description": "URL to the comment author's avatar image.",
            "x-go-name": "AvatarURL"
          },
          "message": {
            "type": "string",
            "maxLength": 5000,
            "description": "Text of the comment message."
          },
          "timestamp": {
            "description": "Timestamp when the comment message was written.",
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
            },
            "x-go-name": "UserID"
          }
        }
      },
      "MentionNotificationPayload": {
        "type": "object",
        "additionalProperties": false,
        "description": "Request body for notifying users about a design comment: the users mentioned in the comment, the thread participants, and the comment messages to include in the notification email.",
        "required": [
          "designId"
        ],
        "properties": {
          "mentionUsers": {
            "type": "array",
            "items": {
              "type": "string",
              "format": "uuid",
              "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              }
            },
            "description": "IDs of the users explicitly mentioned in the comment."
          },
          "participants": {
            "type": "array",
            "items": {
              "type": "string",
              "format": "uuid",
              "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              }
            },
            "description": "IDs of the users participating in the comment thread."
          },
          "designId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-name": "DesignID"
          },
          "usersOptedOutOfNotifications": {
            "type": "array",
            "items": {
              "type": "string",
              "format": "uuid",
              "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              }
            },
            "description": "IDs of the users who opted out of mention notifications."
          },
          "messages": {
            "type": "array",
            "items": {
              "type": "object",
              "additionalProperties": false,
              "description": "A single comment message included in a mention notification.",
              "properties": {
                "firstName": {
                  "type": "string",
                  "maxLength": 200,
                  "description": "First name of the comment author."
                },
                "lastName": {
                  "type": "string",
                  "maxLength": 300,
                  "description": "Last name of the comment author."
                },
                "avatarUrl": {
                  "type": "string",
                  "format": "uri",
                  "maxLength": 500,
                  "description": "URL to the comment author's avatar image.",
                  "x-go-name": "AvatarURL"
                },
                "message": {
                  "type": "string",
                  "maxLength": 5000,
                  "description": "Text of the comment message."
                },
                "timestamp": {
                  "description": "Timestamp when the comment message was written.",
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
                  },
                  "x-go-name": "UserID"
                }
              }
            },
            "description": "The comment messages to include in the notification email."
          }
        }
      },
      "AnonymousFlowResponse": {
        "type": "object",
        "additionalProperties": false,
        "description": "Response returned after minting an anonymous user session: the session access token, the ID of the synthetic anonymous user, and the capability document for the session.",
        "required": [
          "accessToken",
          "userId"
        ],
        "properties": {
          "accessToken": {
            "type": "string",
            "maxLength": 4096,
            "description": "JWT access token for the anonymous session.",
            "x-oapi-codegen-extra-tags": {
              "json": "accessToken"
            }
          },
          "capability": {
            "type": "object",
            "additionalProperties": true,
            "description": "Capability document for the anonymous session. Untyped pending the provider-capabilities schema tracked separately in the identifier-uniformity program.",
            "x-go-name": "Capabilities"
          },
          "userId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-name": "UserID",
            "x-oapi-codegen-extra-tags": {
              "json": "userId"
            }
          }
        }
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
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
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
