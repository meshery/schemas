/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const TeamSchema = {
  "openapi": "3.0.0",
  "info": {
    "title": "team",
    "description": "Documentation for Meshery Cloud REST APIs for Teams",
    "contact": {
      "email": "maintainers@meshery.io"
    },
    "version": "v1beta1"
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
        "scheme": "Bearer",
        "bearerFormat": "JWT"
      }
    },
    "schemas": {
      "team": {
        "$id": "https://schemas.meshery.io/team.yaml",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "description": "A Team is a group of one or more users. Teams are often used as a grouping mechanism for assigning permissions, whether in the context of an organization, a workspace, or some other domain within Meshery. Learn more at https://docs.meshery.io/concepts/logical/teams",
        "additionalProperties": false,
        "type": "object",
        "required": [
          "id",
          "name"
        ],
        "properties": {
          "id": {
            "description": "Team ID",
            "x-order": 1,
            "x-go-name": "ID",
            "x-oapi-codegen-extra-tags": {
              "db": "id",
              "yaml": "id"
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
              "db": "name",
              "yaml": "name"
            },
            "x-order": 2,
            "type": "string",
            "description": "Team name"
          },
          "description": {
            "x-oapi-codegen-extra-tags": {
              "db": "description",
              "yaml": "description"
            },
            "x-order": 3,
            "type": "string",
            "description": "Team description"
          },
          "owner": {
            "x-oapi-codegen-extra-tags": {
              "db": "owner",
              "yaml": "owner"
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
              "db": "metadata",
              "yaml": "metadata"
            },
            "x-order": 5,
            "x-go-type": "core.Map",
            "x-go-type-skip-optional-pointer": true,
            "type": "object",
            "description": "Additional metadata for the team"
          },
          "created_at": {
            "x-oapi-codegen-extra-tags": {
              "db": "created_at",
              "yaml": "created_at"
            },
            "x-order": 6,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updated_at": {
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at",
              "yaml": "updated_at"
            },
            "x-order": 7,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deleted_at": {
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at",
              "yaml": "deleted_at"
            },
            "x-go-type": "core.NullTime",
            "x-go-import": "database/sql",
            "x-order": 8,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "teamPayload": {
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
      "teamUpdatePayload": {
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
      "teamPage": {
        "type": "object",
        "description": "Paginated list of teams",
        "properties": {
          "page": {
            "type": "integer",
            "x-go-type-skip-optional-pointer": true
          },
          "page_size": {
            "type": "integer",
            "x-go-type-skip-optional-pointer": true
          },
          "total_count": {
            "type": "integer",
            "x-go-type-skip-optional-pointer": true
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
                "name"
              ],
              "properties": {
                "id": {
                  "description": "Team ID",
                  "x-order": 1,
                  "x-go-name": "ID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "id",
                    "yaml": "id"
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
                    "db": "name",
                    "yaml": "name"
                  },
                  "x-order": 2,
                  "type": "string",
                  "description": "Team name"
                },
                "description": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "description",
                    "yaml": "description"
                  },
                  "x-order": 3,
                  "type": "string",
                  "description": "Team description"
                },
                "owner": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "owner",
                    "yaml": "owner"
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
                    "db": "metadata",
                    "yaml": "metadata"
                  },
                  "x-order": 5,
                  "x-go-type": "core.Map",
                  "x-go-type-skip-optional-pointer": true,
                  "type": "object",
                  "description": "Additional metadata for the team"
                },
                "created_at": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at",
                    "yaml": "created_at"
                  },
                  "x-order": 6,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updated_at": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at",
                    "yaml": "updated_at"
                  },
                  "x-order": 7,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "deleted_at": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "deleted_at",
                    "yaml": "deleted_at"
                  },
                  "x-go-type": "core.NullTime",
                  "x-go-import": "database/sql",
                  "x-order": 8,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                }
              }
            }
          }
        }
      },
      "teamsUsersMapping": {
        "type": "object",
        "description": "Mapping between teams and users",
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
          "team_id": {
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
          "user_id": {
            "type": "string",
            "description": "user's email or username",
            "x-go-type-skip-optional-pointer": true
          },
          "created_at": {
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updated_at": {
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deleted_at": {
            "description": "SQL null Timestamp to handle null values of time.",
            "x-go-type": "sql.NullTime",
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "teamsUsersMappingPage": {
        "type": "object",
        "description": "Paginated list of team-user mappings",
        "properties": {
          "page": {
            "type": "integer",
            "x-go-type-skip-optional-pointer": true
          },
          "page_size": {
            "type": "integer",
            "x-go-type-skip-optional-pointer": true
          },
          "total_count": {
            "type": "integer",
            "x-go-type-skip-optional-pointer": true
          },
          "teams_users_mapping": {
            "type": "array",
            "x-go-type-skip-optional-pointer": true,
            "items": {
              "x-go-type": "TeamsUsersMapping",
              "type": "object",
              "description": "Mapping between teams and users",
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
                "team_id": {
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
                "user_id": {
                  "type": "string",
                  "description": "user's email or username",
                  "x-go-type-skip-optional-pointer": true
                },
                "created_at": {
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updated_at": {
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "deleted_at": {
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
        "tags": [
          "teams"
        ],
        "operationId": "GetTeams",
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
                      "x-go-type-skip-optional-pointer": true
                    },
                    "page_size": {
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "total_count": {
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true
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
                          "name"
                        ],
                        "properties": {
                          "id": {
                            "description": "Team ID",
                            "x-order": 1,
                            "x-go-name": "ID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "id",
                              "yaml": "id"
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
                              "db": "name",
                              "yaml": "name"
                            },
                            "x-order": 2,
                            "type": "string",
                            "description": "Team name"
                          },
                          "description": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "description",
                              "yaml": "description"
                            },
                            "x-order": 3,
                            "type": "string",
                            "description": "Team description"
                          },
                          "owner": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "owner",
                              "yaml": "owner"
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
                              "db": "metadata",
                              "yaml": "metadata"
                            },
                            "x-order": 5,
                            "x-go-type": "core.Map",
                            "x-go-type-skip-optional-pointer": true,
                            "type": "object",
                            "description": "Additional metadata for the team"
                          },
                          "created_at": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "yaml": "created_at"
                            },
                            "x-order": 6,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updated_at": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "yaml": "updated_at"
                            },
                            "x-order": 7,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deleted_at": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "yaml": "deleted_at"
                            },
                            "x-go-type": "core.NullTime",
                            "x-go-import": "database/sql",
                            "x-order": 8,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          }
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
      },
      "post": {
        "tags": [
          "teams"
        ],
        "operationId": "CreateTeam",
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
                    "name"
                  ],
                  "properties": {
                    "id": {
                      "description": "Team ID",
                      "x-order": 1,
                      "x-go-name": "ID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id",
                        "yaml": "id"
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
                        "db": "name",
                        "yaml": "name"
                      },
                      "x-order": 2,
                      "type": "string",
                      "description": "Team name"
                    },
                    "description": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "description",
                        "yaml": "description"
                      },
                      "x-order": 3,
                      "type": "string",
                      "description": "Team description"
                    },
                    "owner": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner",
                        "yaml": "owner"
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
                        "db": "metadata",
                        "yaml": "metadata"
                      },
                      "x-order": 5,
                      "x-go-type": "core.Map",
                      "x-go-type-skip-optional-pointer": true,
                      "type": "object",
                      "description": "Additional metadata for the team"
                    },
                    "created_at": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "yaml": "created_at"
                      },
                      "x-order": 6,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updated_at": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "yaml": "updated_at"
                      },
                      "x-order": 7,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deleted_at": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "yaml": "deleted_at"
                      },
                      "x-go-type": "core.NullTime",
                      "x-go-import": "database/sql",
                      "x-order": 8,
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
        "tags": [
          "teams"
        ],
        "operationId": "GetTeamByID",
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
                    "name"
                  ],
                  "properties": {
                    "id": {
                      "description": "Team ID",
                      "x-order": 1,
                      "x-go-name": "ID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id",
                        "yaml": "id"
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
                        "db": "name",
                        "yaml": "name"
                      },
                      "x-order": 2,
                      "type": "string",
                      "description": "Team name"
                    },
                    "description": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "description",
                        "yaml": "description"
                      },
                      "x-order": 3,
                      "type": "string",
                      "description": "Team description"
                    },
                    "owner": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner",
                        "yaml": "owner"
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
                        "db": "metadata",
                        "yaml": "metadata"
                      },
                      "x-order": 5,
                      "x-go-type": "core.Map",
                      "x-go-type-skip-optional-pointer": true,
                      "type": "object",
                      "description": "Additional metadata for the team"
                    },
                    "created_at": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "yaml": "created_at"
                      },
                      "x-order": 6,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updated_at": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "yaml": "updated_at"
                      },
                      "x-order": 7,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deleted_at": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "yaml": "deleted_at"
                      },
                      "x-go-type": "core.NullTime",
                      "x-go-import": "database/sql",
                      "x-order": 8,
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
        "tags": [
          "teams"
        ],
        "operationId": "UpdateTeam",
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
                    "name"
                  ],
                  "properties": {
                    "id": {
                      "description": "Team ID",
                      "x-order": 1,
                      "x-go-name": "ID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id",
                        "yaml": "id"
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
                        "db": "name",
                        "yaml": "name"
                      },
                      "x-order": 2,
                      "type": "string",
                      "description": "Team name"
                    },
                    "description": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "description",
                        "yaml": "description"
                      },
                      "x-order": 3,
                      "type": "string",
                      "description": "Team description"
                    },
                    "owner": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner",
                        "yaml": "owner"
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
                        "db": "metadata",
                        "yaml": "metadata"
                      },
                      "x-order": 5,
                      "x-go-type": "core.Map",
                      "x-go-type-skip-optional-pointer": true,
                      "type": "object",
                      "description": "Additional metadata for the team"
                    },
                    "created_at": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "yaml": "created_at"
                      },
                      "x-order": 6,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updated_at": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "yaml": "updated_at"
                      },
                      "x-order": 7,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deleted_at": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "yaml": "deleted_at"
                      },
                      "x-go-type": "core.NullTime",
                      "x-go-import": "database/sql",
                      "x-order": 8,
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
        "tags": [
          "teams"
        ],
        "operationId": "DeleteTeam",
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
            "description": "Team deleted successfully"
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
        "tags": [
          "teams"
        ],
        "operationId": "GetTeamUsers",
        "summary": "Get all users in a team",
        "description": "Gets all users that belong to a team",
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
            "description": "Team users mapping",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated list of team-user mappings",
                  "properties": {
                    "page": {
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "page_size": {
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "total_count": {
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "teams_users_mapping": {
                      "type": "array",
                      "x-go-type-skip-optional-pointer": true,
                      "items": {
                        "x-go-type": "TeamsUsersMapping",
                        "type": "object",
                        "description": "Mapping between teams and users",
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
                          "team_id": {
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
                          "user_id": {
                            "type": "string",
                            "description": "user's email or username",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "created_at": {
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updated_at": {
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deleted_at": {
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
        "tags": [
          "teams"
        ],
        "operationId": "AddUserToTeam",
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
          "200": {
            "description": "User added to team",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Mapping between teams and users",
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
                    "team_id": {
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
                    "user_id": {
                      "type": "string",
                      "description": "user's email or username",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "created_at": {
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updated_at": {
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deleted_at": {
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
      },
      "delete": {
        "tags": [
          "teams"
        ],
        "operationId": "RemoveUserFromTeam",
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
          "200": {
            "description": "User removed from team",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Mapping between teams and users",
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
                    "team_id": {
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
                    "user_id": {
                      "type": "string",
                      "description": "user's email or username",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "created_at": {
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updated_at": {
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deleted_at": {
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
      }
    }
  }
} as const;

export default TeamSchema;
