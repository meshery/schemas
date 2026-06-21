/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const TeamSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Team",
    "description": "OpenAPI schema for team management in Meshery Cloud.",
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
      "description": "Meshery Cloud development server URL (controlled via PORT environment variable)"
    }
  ],
  "security": [
    {
      "jwt": []
    }
  ],
  "tags": [
    {
      "name": "teams",
      "description": "A Team is a group of one or more users. Teams are used for assigning permissions in organizations and workspaces. Learn more at https://docs.meshery.io/concepts/logical/teams"
    }
  ],
  "components": {
    "responses": {
      "200": {
        "description": "ok",
        "content": {
          "text/plain": {
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
      "teamId": {
        "name": "teamId",
        "in": "path",
        "description": "Team ID",
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
        },
        "required": true
      },
      "orgId": {
        "name": "orgId",
        "in": "path",
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
        },
        "required": true
      },
      "userId": {
        "name": "userId",
        "in": "path",
        "description": "User ID",
        "schema": {
          "type": "string",
          "description": "user's email or username",
          "x-go-type-skip-optional-pointer": true
        },
        "required": true
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
      "Team": {
        "$id": "https://schemas.meshery.io/team.yaml",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "description": "A Team is a group of one or more users. Teams are often used as a grouping mechanism for assigning permissions, whether in the context of an organization, a workspace, or some other domain within Meshery. Learn more at https://docs.meshery.io/concepts/logical/teams",
        "additionalProperties": false,
        "type": "object",
        "required": [
          "id",
          "name",
          "createdAt",
          "updatedAt"
        ],
        "properties": {
          "id": {
            "description": "Team ID",
            "x-order": 1,
            "x-go-name": "ID",
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
            "x-oapi-codegen-extra-tags": {
              "db": "name"
            },
            "x-order": 2,
            "type": "string",
            "description": "Team name",
            "minLength": 1,
            "maxLength": 255
          },
          "description": {
            "x-oapi-codegen-extra-tags": {
              "db": "description"
            },
            "x-order": 3,
            "type": "string",
            "description": "Team description",
            "maxLength": 5000
          },
          "owner": {
            "x-oapi-codegen-extra-tags": {
              "db": "owner"
            },
            "x-order": 4,
            "description": "User ID of the owner of the team",
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "metadata": {
            "x-oapi-codegen-extra-tags": {
              "db": "metadata"
            },
            "x-order": 5,
            "x-go-type": "core.Map",
            "x-go-type-skip-optional-pointer": true,
            "type": "object",
            "description": "Additional metadata for the team"
          },
          "createdAt": {
            "description": "Timestamp when the team was created.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at",
              "json": "createdAt"
            },
            "x-order": 6,
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
            "x-order": 7,
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
            "x-order": 8,
            "x-go-type": "NullTime",
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "TeamPayload": {
        "type": "object",
        "description": "Payload for creating a new team",
        "required": [
          "name"
        ],
        "properties": {
          "name": {
            "description": "Team name. Provide a meaningful name that represents this team.",
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "description": {
            "description": "A detailed description of the team's purpose and responsibilities.",
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "TeamUpdatePayload": {
        "type": "object",
        "description": "Payload for updating an existing team",
        "properties": {
          "name": {
            "description": "Updated team name",
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "description": {
            "description": "Updated team description",
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "TeamPage": {
        "type": "object",
        "description": "Paginated list of teams",
        "properties": {
          "page": {
            "type": "integer",
            "description": "Current page number of the result set.",
            "minimum": 0
          },
          "page_size": {
            "type": "integer",
            "description": "Number of items per page.",
            "minimum": 1
          },
          "total_count": {
            "type": "integer",
            "description": "Total number of items available.",
            "minimum": 0
          },
          "teams": {
            "type": "array",
            "x-go-type-skip-optional-pointer": true,
            "items": {
              "x-go-type": "Team",
              "$id": "https://schemas.meshery.io/team.yaml",
              "$schema": "http://json-schema.org/draft-07/schema#",
              "description": "A Team is a group of one or more users. Teams are often used as a grouping mechanism for assigning permissions, whether in the context of an organization, a workspace, or some other domain within Meshery. Learn more at https://docs.meshery.io/concepts/logical/teams",
              "additionalProperties": false,
              "type": "object",
              "required": [
                "id",
                "name",
                "createdAt",
                "updatedAt"
              ],
              "properties": {
                "id": {
                  "description": "Team ID",
                  "x-order": 1,
                  "x-go-name": "ID",
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
                  "x-oapi-codegen-extra-tags": {
                    "db": "name"
                  },
                  "x-order": 2,
                  "type": "string",
                  "description": "Team name",
                  "minLength": 1,
                  "maxLength": 255
                },
                "description": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "description"
                  },
                  "x-order": 3,
                  "type": "string",
                  "description": "Team description",
                  "maxLength": 5000
                },
                "owner": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "owner"
                  },
                  "x-order": 4,
                  "description": "User ID of the owner of the team",
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "metadata": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "metadata"
                  },
                  "x-order": 5,
                  "x-go-type": "core.Map",
                  "x-go-type-skip-optional-pointer": true,
                  "type": "object",
                  "description": "Additional metadata for the team"
                },
                "createdAt": {
                  "description": "Timestamp when the team was created.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at",
                    "json": "createdAt"
                  },
                  "x-order": 6,
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
                  "x-order": 7,
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
                  "x-order": 8,
                  "x-go-type": "NullTime",
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                }
              }
            },
            "description": "The teams of the teampage."
          }
        }
      },
      "UsersTeamsMapping": {
        "type": "object",
        "description": "Join row between users and teams. The schema name is `UsersTeamsMapping` (rather than `TeamsUsersMapping`) so that pop's tableize default produces the live DB table name `users_teams_mappings`, eliminating the need for an explicit `TableName()` helper on the generated Go struct.\n",
        "properties": {
          "id": {
            "x-go-name": "ID",
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "id",
              "json": "id"
            },
            "x-go-type-name": "GeneralId",
            "x-go-type-skip-optional-pointer": true
          },
          "teamId": {
            "description": "Team ID",
            "x-oapi-codegen-extra-tags": {
              "db": "team_id",
              "json": "teamId"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "userId": {
            "description": "User ID",
            "x-oapi-codegen-extra-tags": {
              "db": "user_id",
              "json": "userId"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "roleId": {
            "description": "Optional role assigned to this team membership. Nullable because a membership may exist without an explicit role (e.g., team-admin assignments are stamped on insert; non-owner adds may leave `role_id` null until a role is assigned). References `roles.id`.\n",
            "x-oapi-codegen-extra-tags": {
              "db": "role_id",
              "json": "roleId,omitempty"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "createdAt": {
            "description": "Timestamp when the mapping was created.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at",
              "json": "createdAt"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp when the mapping was last updated.",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at",
              "json": "updatedAt"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deletedAt": {
            "description": "Timestamp when the mapping was soft-deleted, if applicable.",
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at",
              "json": "deletedAt"
            },
            "x-go-type": "NullTime",
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "UsersTeamsMappingPage": {
        "type": "object",
        "description": "Paginated list of user-team mappings",
        "properties": {
          "page": {
            "type": "integer",
            "description": "Current page number of the result set.",
            "minimum": 0
          },
          "page_size": {
            "type": "integer",
            "description": "Number of items per page.",
            "minimum": 1
          },
          "total_count": {
            "type": "integer",
            "description": "Total number of items available.",
            "minimum": 0
          },
          "usersTeamsMapping": {
            "type": "array",
            "x-go-type-skip-optional-pointer": true,
            "items": {
              "x-go-type": "UsersTeamsMapping",
              "type": "object",
              "description": "Join row between users and teams. The schema name is `UsersTeamsMapping` (rather than `TeamsUsersMapping`) so that pop's tableize default produces the live DB table name `users_teams_mappings`, eliminating the need for an explicit `TableName()` helper on the generated Go struct.\n",
              "properties": {
                "id": {
                  "x-go-name": "ID",
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "id",
                    "json": "id"
                  },
                  "x-go-type-name": "GeneralId",
                  "x-go-type-skip-optional-pointer": true
                },
                "teamId": {
                  "description": "Team ID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "team_id",
                    "json": "teamId"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "userId": {
                  "description": "User ID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "user_id",
                    "json": "userId"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "roleId": {
                  "description": "Optional role assigned to this team membership. Nullable because a membership may exist without an explicit role (e.g., team-admin assignments are stamped on insert; non-owner adds may leave `role_id` null until a role is assigned). References `roles.id`.\n",
                  "x-oapi-codegen-extra-tags": {
                    "db": "role_id",
                    "json": "roleId,omitempty"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "createdAt": {
                  "description": "Timestamp when the mapping was created.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at",
                    "json": "createdAt"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updatedAt": {
                  "description": "Timestamp when the mapping was last updated.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at",
                    "json": "updatedAt"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "deletedAt": {
                  "description": "Timestamp when the mapping was soft-deleted, if applicable.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "deleted_at",
                    "json": "deletedAt"
                  },
                  "x-go-type": "NullTime",
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                }
              }
            },
            "description": "The user-team mappings on the current page."
          }
        }
      },
      "TeamMember": {
        "type": "object",
        "description": "A user who is a prospective or existing team member. Returned by the \"list users in team\" endpoint. `joinedAt` is the first canonicalised projection field — other user fields (`id`, `firstName`, `lastName`, `email`, `avatarUrl`) continue to flow through `additionalProperties` pending migration of the user schema to the canonical-casing contract. See meshery/schemas#832 for the per-field roadmap.\n",
        "additionalProperties": true,
        "properties": {
          "joinedAt": {
            "description": "Timestamp when the user joined the team. Server-computed from the earliest matching row in `users_teams_mapping` for this (team, user) pair. Server-managed; clients cannot set this.\n",
            "x-oapi-codegen-extra-tags": {
              "db": "joined_at",
              "json": "joinedAt"
            },
            "x-go-type": "NullTime",
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "TeamMembersPage": {
        "type": "object",
        "description": "Paginated list of team members.",
        "properties": {
          "page": {
            "type": "integer",
            "description": "Current page number of the result set.",
            "minimum": 0
          },
          "page_size": {
            "type": "integer",
            "description": "Number of items per page.",
            "minimum": 1
          },
          "total_count": {
            "type": "integer",
            "description": "Total number of items available.",
            "minimum": 0
          },
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "description": "A user who is a prospective or existing team member. Returned by the \"list users in team\" endpoint. `joinedAt` is the first canonicalised projection field — other user fields (`id`, `firstName`, `lastName`, `email`, `avatarUrl`) continue to flow through `additionalProperties` pending migration of the user schema to the canonical-casing contract. See meshery/schemas#832 for the per-field roadmap.\n",
              "additionalProperties": true,
              "properties": {
                "joinedAt": {
                  "description": "Timestamp when the user joined the team. Server-computed from the earliest matching row in `users_teams_mapping` for this (team, user) pair. Server-managed; clients cannot set this.\n",
                  "x-oapi-codegen-extra-tags": {
                    "db": "joined_at",
                    "json": "joinedAt"
                  },
                  "x-go-type": "NullTime",
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                }
              }
            },
            "description": "The data of the teammemberspage."
          }
        }
      }
    },
    "requestBodies": {
      "teamPayload": {
        "description": "Body for creating a team",
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "description": "Payload for creating a new team",
              "required": [
                "name"
              ],
              "properties": {
                "name": {
                  "description": "Team name. Provide a meaningful name that represents this team.",
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "description": {
                  "description": "A detailed description of the team's purpose and responsibilities.",
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                }
              }
            }
          }
        }
      },
      "teamUpdatePayload": {
        "description": "Body for updating a team",
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "description": "Payload for updating an existing team",
              "properties": {
                "name": {
                  "description": "Updated team name",
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "description": {
                  "description": "Updated team description",
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                }
              }
            }
          }
        }
      }
    }
  },
  "paths": {
    "/api/identity/orgs/{orgId}/teams": {
      "get": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "teams"
        ],
        "operationId": "getTeams",
        "summary": "Get all teams for an organization",
        "description": "Gets all teams within an organization",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
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
            },
            "required": true
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
          }
        ],
        "responses": {
          "200": {
            "description": "Teams",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated list of teams",
                  "properties": {
                    "page": {
                      "type": "integer",
                      "description": "Current page number of the result set.",
                      "minimum": 0
                    },
                    "page_size": {
                      "type": "integer",
                      "description": "Number of items per page.",
                      "minimum": 1
                    },
                    "total_count": {
                      "type": "integer",
                      "description": "Total number of items available.",
                      "minimum": 0
                    },
                    "teams": {
                      "type": "array",
                      "x-go-type-skip-optional-pointer": true,
                      "items": {
                        "x-go-type": "Team",
                        "$id": "https://schemas.meshery.io/team.yaml",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "description": "A Team is a group of one or more users. Teams are often used as a grouping mechanism for assigning permissions, whether in the context of an organization, a workspace, or some other domain within Meshery. Learn more at https://docs.meshery.io/concepts/logical/teams",
                        "additionalProperties": false,
                        "type": "object",
                        "required": [
                          "id",
                          "name",
                          "createdAt",
                          "updatedAt"
                        ],
                        "properties": {
                          "id": {
                            "description": "Team ID",
                            "x-order": 1,
                            "x-go-name": "ID",
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
                            "x-oapi-codegen-extra-tags": {
                              "db": "name"
                            },
                            "x-order": 2,
                            "type": "string",
                            "description": "Team name",
                            "minLength": 1,
                            "maxLength": 255
                          },
                          "description": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "description"
                            },
                            "x-order": 3,
                            "type": "string",
                            "description": "Team description",
                            "maxLength": 5000
                          },
                          "owner": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "owner"
                            },
                            "x-order": 4,
                            "description": "User ID of the owner of the team",
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "metadata": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "metadata"
                            },
                            "x-order": 5,
                            "x-go-type": "core.Map",
                            "x-go-type-skip-optional-pointer": true,
                            "type": "object",
                            "description": "Additional metadata for the team"
                          },
                          "createdAt": {
                            "description": "Timestamp when the team was created.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "json": "createdAt"
                            },
                            "x-order": 6,
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
                            "x-order": 7,
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
                            "x-order": 8,
                            "x-go-type": "NullTime",
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          }
                        }
                      },
                      "description": "The teams of the teampage."
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
      },
      "post": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "teams"
        ],
        "operationId": "createTeam",
        "summary": "Create a team",
        "description": "Creates a new team within an organization",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
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
            },
            "required": true
          }
        ],
        "requestBody": {
          "description": "Body for creating a team",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for creating a new team",
                "required": [
                  "name"
                ],
                "properties": {
                  "name": {
                    "description": "Team name. Provide a meaningful name that represents this team.",
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "description": {
                    "description": "A detailed description of the team's purpose and responsibilities.",
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Created team",
            "content": {
              "application/json": {
                "schema": {
                  "$id": "https://schemas.meshery.io/team.yaml",
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "description": "A Team is a group of one or more users. Teams are often used as a grouping mechanism for assigning permissions, whether in the context of an organization, a workspace, or some other domain within Meshery. Learn more at https://docs.meshery.io/concepts/logical/teams",
                  "additionalProperties": false,
                  "type": "object",
                  "required": [
                    "id",
                    "name",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Team ID",
                      "x-order": 1,
                      "x-go-name": "ID",
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
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      },
                      "x-order": 2,
                      "type": "string",
                      "description": "Team name",
                      "minLength": 1,
                      "maxLength": 255
                    },
                    "description": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "description"
                      },
                      "x-order": 3,
                      "type": "string",
                      "description": "Team description",
                      "maxLength": 5000
                    },
                    "owner": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner"
                      },
                      "x-order": 4,
                      "description": "User ID of the owner of the team",
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "metadata": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata"
                      },
                      "x-order": 5,
                      "x-go-type": "core.Map",
                      "x-go-type-skip-optional-pointer": true,
                      "type": "object",
                      "description": "Additional metadata for the team"
                    },
                    "createdAt": {
                      "description": "Timestamp when the team was created.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "createdAt"
                      },
                      "x-order": 6,
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
                      "x-order": 7,
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
                      "x-order": 8,
                      "x-go-type": "NullTime",
                      "type": "string",
                      "format": "date-time",
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
      }
    },
    "/api/identity/orgs/{orgId}/teams/{teamId}": {
      "get": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "teams"
        ],
        "operationId": "getTeamById",
        "summary": "Get a team by ID",
        "description": "Gets a team by its ID",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
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
            },
            "required": true
          },
          {
            "name": "teamId",
            "in": "path",
            "description": "Team ID",
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
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "Team",
            "content": {
              "application/json": {
                "schema": {
                  "$id": "https://schemas.meshery.io/team.yaml",
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "description": "A Team is a group of one or more users. Teams are often used as a grouping mechanism for assigning permissions, whether in the context of an organization, a workspace, or some other domain within Meshery. Learn more at https://docs.meshery.io/concepts/logical/teams",
                  "additionalProperties": false,
                  "type": "object",
                  "required": [
                    "id",
                    "name",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Team ID",
                      "x-order": 1,
                      "x-go-name": "ID",
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
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      },
                      "x-order": 2,
                      "type": "string",
                      "description": "Team name",
                      "minLength": 1,
                      "maxLength": 255
                    },
                    "description": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "description"
                      },
                      "x-order": 3,
                      "type": "string",
                      "description": "Team description",
                      "maxLength": 5000
                    },
                    "owner": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner"
                      },
                      "x-order": 4,
                      "description": "User ID of the owner of the team",
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "metadata": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata"
                      },
                      "x-order": 5,
                      "x-go-type": "core.Map",
                      "x-go-type-skip-optional-pointer": true,
                      "type": "object",
                      "description": "Additional metadata for the team"
                    },
                    "createdAt": {
                      "description": "Timestamp when the team was created.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "createdAt"
                      },
                      "x-order": 6,
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
                      "x-order": 7,
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
                      "x-order": 8,
                      "x-go-type": "NullTime",
                      "type": "string",
                      "format": "date-time",
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
          "cloud",
          "meshery"
        ],
        "tags": [
          "teams"
        ],
        "operationId": "updateTeam",
        "summary": "Update a team",
        "description": "Updates a team's information",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
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
            },
            "required": true
          },
          {
            "name": "teamId",
            "in": "path",
            "description": "Team ID",
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
            },
            "required": true
          }
        ],
        "requestBody": {
          "description": "Body for updating a team",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for updating an existing team",
                "properties": {
                  "name": {
                    "description": "Updated team name",
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "description": {
                    "description": "Updated team description",
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Updated team",
            "content": {
              "application/json": {
                "schema": {
                  "$id": "https://schemas.meshery.io/team.yaml",
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "description": "A Team is a group of one or more users. Teams are often used as a grouping mechanism for assigning permissions, whether in the context of an organization, a workspace, or some other domain within Meshery. Learn more at https://docs.meshery.io/concepts/logical/teams",
                  "additionalProperties": false,
                  "type": "object",
                  "required": [
                    "id",
                    "name",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Team ID",
                      "x-order": 1,
                      "x-go-name": "ID",
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
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      },
                      "x-order": 2,
                      "type": "string",
                      "description": "Team name",
                      "minLength": 1,
                      "maxLength": 255
                    },
                    "description": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "description"
                      },
                      "x-order": 3,
                      "type": "string",
                      "description": "Team description",
                      "maxLength": 5000
                    },
                    "owner": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner"
                      },
                      "x-order": 4,
                      "description": "User ID of the owner of the team",
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "metadata": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata"
                      },
                      "x-order": 5,
                      "x-go-type": "core.Map",
                      "x-go-type-skip-optional-pointer": true,
                      "type": "object",
                      "description": "Additional metadata for the team"
                    },
                    "createdAt": {
                      "description": "Timestamp when the team was created.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "createdAt"
                      },
                      "x-order": 6,
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
                      "x-order": 7,
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
                      "x-order": 8,
                      "x-go-type": "NullTime",
                      "type": "string",
                      "format": "date-time",
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
          "cloud",
          "meshery"
        ],
        "tags": [
          "teams"
        ],
        "operationId": "deleteTeam",
        "summary": "Delete a team",
        "description": "Deletes a team by its ID",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
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
            },
            "required": true
          },
          {
            "name": "teamId",
            "in": "path",
            "description": "Team ID",
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
            },
            "required": true
          }
        ],
        "responses": {
          "204": {
            "description": "Team deleted"
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
    "/api/identity/teams/{teamId}/users": {
      "get": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "teams"
        ],
        "operationId": "getTeamUsers",
        "summary": "Get all users in a team",
        "description": "Gets all users that belong to a team",
        "parameters": [
          {
            "name": "teamId",
            "in": "path",
            "description": "Team ID",
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
            },
            "required": true
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
          }
        ],
        "responses": {
          "200": {
            "description": "Team users mapping",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated list of user-team mappings",
                  "properties": {
                    "page": {
                      "type": "integer",
                      "description": "Current page number of the result set.",
                      "minimum": 0
                    },
                    "page_size": {
                      "type": "integer",
                      "description": "Number of items per page.",
                      "minimum": 1
                    },
                    "total_count": {
                      "type": "integer",
                      "description": "Total number of items available.",
                      "minimum": 0
                    },
                    "usersTeamsMapping": {
                      "type": "array",
                      "x-go-type-skip-optional-pointer": true,
                      "items": {
                        "x-go-type": "UsersTeamsMapping",
                        "type": "object",
                        "description": "Join row between users and teams. The schema name is `UsersTeamsMapping` (rather than `TeamsUsersMapping`) so that pop's tableize default produces the live DB table name `users_teams_mappings`, eliminating the need for an explicit `TableName()` helper on the generated Go struct.\n",
                        "properties": {
                          "id": {
                            "x-go-name": "ID",
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "id",
                              "json": "id"
                            },
                            "x-go-type-name": "GeneralId",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "teamId": {
                            "description": "Team ID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "team_id",
                              "json": "teamId"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "userId": {
                            "description": "User ID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "user_id",
                              "json": "userId"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "roleId": {
                            "description": "Optional role assigned to this team membership. Nullable because a membership may exist without an explicit role (e.g., team-admin assignments are stamped on insert; non-owner adds may leave `role_id` null until a role is assigned). References `roles.id`.\n",
                            "x-oapi-codegen-extra-tags": {
                              "db": "role_id",
                              "json": "roleId,omitempty"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "createdAt": {
                            "description": "Timestamp when the mapping was created.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "json": "createdAt"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp when the mapping was last updated.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "json": "updatedAt"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deletedAt": {
                            "description": "Timestamp when the mapping was soft-deleted, if applicable.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "json": "deletedAt"
                            },
                            "x-go-type": "NullTime",
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          }
                        }
                      },
                      "description": "The user-team mappings on the current page."
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
    "/api/identity/orgs/{orgId}/teams/{teamId}/users/{userId}": {
      "post": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "teams"
        ],
        "operationId": "addUserToTeam",
        "summary": "Add a user to a team",
        "description": "Assigns a user to a team",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
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
            },
            "required": true
          },
          {
            "name": "teamId",
            "in": "path",
            "description": "Team ID",
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
            },
            "required": true
          },
          {
            "name": "userId",
            "in": "path",
            "description": "User ID",
            "schema": {
              "type": "string",
              "description": "user's email or username",
              "x-go-type-skip-optional-pointer": true
            },
            "required": true
          }
        ],
        "responses": {
          "201": {
            "description": "User added to team",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Join row between users and teams. The schema name is `UsersTeamsMapping` (rather than `TeamsUsersMapping`) so that pop's tableize default produces the live DB table name `users_teams_mappings`, eliminating the need for an explicit `TableName()` helper on the generated Go struct.\n",
                  "properties": {
                    "id": {
                      "x-go-name": "ID",
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "id",
                        "json": "id"
                      },
                      "x-go-type-name": "GeneralId",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "teamId": {
                      "description": "Team ID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "team_id",
                        "json": "teamId"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "userId": {
                      "description": "User ID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "user_id",
                        "json": "userId"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "roleId": {
                      "description": "Optional role assigned to this team membership. Nullable because a membership may exist without an explicit role (e.g., team-admin assignments are stamped on insert; non-owner adds may leave `role_id` null until a role is assigned). References `roles.id`.\n",
                      "x-oapi-codegen-extra-tags": {
                        "db": "role_id",
                        "json": "roleId,omitempty"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "createdAt": {
                      "description": "Timestamp when the mapping was created.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "createdAt"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp when the mapping was last updated.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updatedAt"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "description": "Timestamp when the mapping was soft-deleted, if applicable.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deletedAt"
                      },
                      "x-go-type": "NullTime",
                      "type": "string",
                      "format": "date-time",
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
          "cloud",
          "meshery"
        ],
        "tags": [
          "teams"
        ],
        "operationId": "removeUserFromTeam",
        "summary": "Remove a user from a team",
        "description": "Unassigns a user from a team",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
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
            },
            "required": true
          },
          {
            "name": "teamId",
            "in": "path",
            "description": "Team ID",
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
            },
            "required": true
          },
          {
            "name": "userId",
            "in": "path",
            "description": "User ID",
            "schema": {
              "type": "string",
              "description": "user's email or username",
              "x-go-type-skip-optional-pointer": true
            },
            "required": true
          }
        ],
        "responses": {
          "204": {
            "description": "User removed from team"
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
    "/api/identity/orgs/{orgId}/teams/{teamId}/users": {
      "get": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "teams"
        ],
        "operationId": "listUsersNotInTeam",
        "summary": "Get users that are not in a team",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
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
            },
            "required": true
          },
          {
            "name": "teamId",
            "in": "path",
            "description": "Team ID",
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
            },
            "required": true
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
          }
        ],
        "responses": {
          "200": {
            "description": "Users not currently in the team",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated list of team members.",
                  "properties": {
                    "page": {
                      "type": "integer",
                      "description": "Current page number of the result set.",
                      "minimum": 0
                    },
                    "page_size": {
                      "type": "integer",
                      "description": "Number of items per page.",
                      "minimum": 1
                    },
                    "total_count": {
                      "type": "integer",
                      "description": "Total number of items available.",
                      "minimum": 0
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "description": "A user who is a prospective or existing team member. Returned by the \"list users in team\" endpoint. `joinedAt` is the first canonicalised projection field — other user fields (`id`, `firstName`, `lastName`, `email`, `avatarUrl`) continue to flow through `additionalProperties` pending migration of the user schema to the canonical-casing contract. See meshery/schemas#832 for the per-field roadmap.\n",
                        "additionalProperties": true,
                        "properties": {
                          "joinedAt": {
                            "description": "Timestamp when the user joined the team. Server-computed from the earliest matching row in `users_teams_mapping` for this (team, user) pair. Server-managed; clients cannot set this.\n",
                            "x-oapi-codegen-extra-tags": {
                              "db": "joined_at",
                              "json": "joinedAt"
                            },
                            "x-go-type": "NullTime",
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          }
                        }
                      },
                      "description": "The data of the teammemberspage."
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
  }
};

export default TeamSchema;
