/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const schema = {
  "openapi": "3.0.0",
  "info": {
    "title": "Meshery Cloud",
    "description": "Documentation for meshery Cloud REST APIs",
    "contact": {
      "email": "support@layer5.io"
    },
    "version": "v0.6.394"
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
      "name": "workspaces",
      "description": "Workspaces serve as a virtual space for your team-based work, allows you to control access and more, Provide a detailed description to clarify the purpose of this workspace. Remember you can changes description of workspace after it's creations too. Learn more about workspaces [here](https://docs.meshery.io/concepts/logical/workspaces)."
    }
  ],
  "components": {
    "securitySchemes": {
      "jwt": {
        "type": "http",
        "scheme": "Bearer",
        "bearerFormat": "JWT"
      }
    },
    "schemas": {
      "workspace": {
        "properties": {
          "ID": {
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
          "name": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "description": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "organization_id": {
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
          "owner": {
            "type": "string",
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
      "workspacesTeamsMapping": {
        "properties": {
          "ID": {
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
          "workspace_id": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "workspace_id",
              "json": "workspace_id"
            },
            "x-go-type-name": "WorkspaceId",
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
      "workspacesEnvironmentsMapping": {
        "properties": {
          "ID": {
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
          "environment_id": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "environment_id",
              "json": "environment_id"
            },
            "x-go-type-name": "EnvironmentId",
            "x-go-type-skip-optional-pointer": true
          },
          "workspace_id": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "workspace_id",
              "json": "workspace_id"
            },
            "x-go-type-name": "WorkspaceId",
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
      "workspacesViewsMapping": {
        "properties": {
          "ID": {
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
          "view_id": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "view_id",
              "json": "view_id"
            },
            "x-go-type-name": "ViewId",
            "x-go-type-skip-optional-pointer": true
          },
          "workspace_id": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "workspace_id",
              "json": "workspace_id"
            },
            "x-go-type-name": "WorkspaceId",
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
      "workspacesDesignsMapping": {
        "properties": {
          "ID": {
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
          "design_id": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "design_id",
              "json": "design_id"
            },
            "x-go-type-name": "DesignId",
            "x-go-type-skip-optional-pointer": true
          },
          "workspace_id": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "workspace_id",
              "json": "workspace_id"
            },
            "x-go-type-name": "WorkspaceId",
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
      "workspaceUpdatePayload": {
        "properties": {
          "name": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "Name of workspace"
          },
          "description": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "Environment description"
          },
          "organization_id": {
            "type": "string",
            "description": "Organization ID",
            "x-go-type-skip-optional-pointer": true,
            "x-go-name": "OrganizationID",
            "x-oapi-codegen-extra-tags": {
              "json": "organization_id"
            }
          }
        },
        "required": [
          "organization_id"
        ]
      },
      "workspacePayload": {
        "properties": {
          "name": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "Provide a name that meaningfully represents this workspace. You can change the name of the workspace even after its creation."
          },
          "description": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "Workspaces serve as a virtual space for your team-based work, allows you to control access and more, Provide a detailed description to clarify the purpose of this workspace. Remember you can changes description of workspace after it's creations too. Learn more about workspaces [here](https://docs.meshery.io/concepts/logical/workspaces)"
          },
          "organization_id": {
            "type": "string",
            "description": "Select an organization in which you want to create this new workspace. Keep in mind that the organization cannot be changed after creation.",
            "x-go-type-skip-optional-pointer": true,
            "x-go-name": "OrganizationID",
            "x-oapi-codegen-extra-tags": {
              "json": "organization_id"
            }
          }
        },
        "required": [
          "name",
          "organization"
        ]
      },
      "workspacePage": {
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
          "workspaces": {
            "type": "array",
            "x-go-type-skip-optional-pointer": true,
            "items": {
              "properties": {
                "ID": {
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
                "name": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "description": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "organization_id": {
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
                "owner": {
                  "type": "string",
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
      "workspacePayload": {
        "description": "Body for creating workspace",
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "properties": {
                "name": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true,
                  "description": "Provide a name that meaningfully represents this workspace. You can change the name of the workspace even after its creation."
                },
                "description": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true,
                  "description": "Workspaces serve as a virtual space for your team-based work, allows you to control access and more, Provide a detailed description to clarify the purpose of this workspace. Remember you can changes description of workspace after it's creations too. Learn more about workspaces [here](https://docs.meshery.io/concepts/logical/workspaces)"
                },
                "organization_id": {
                  "type": "string",
                  "description": "Select an organization in which you want to create this new workspace. Keep in mind that the organization cannot be changed after creation.",
                  "x-go-type-skip-optional-pointer": true,
                  "x-go-name": "OrganizationID",
                  "x-oapi-codegen-extra-tags": {
                    "json": "organization_id"
                  }
                }
              },
              "required": [
                "name",
                "organization"
              ]
            }
          }
        }
      },
      "workspaceUpdatePayload": {
        "description": "Body for updating workspace",
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "properties": {
                "name": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true,
                  "description": "Name of workspace"
                },
                "description": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true,
                  "description": "Environment description"
                },
                "organization_id": {
                  "type": "string",
                  "description": "Organization ID",
                  "x-go-type-skip-optional-pointer": true,
                  "x-go-name": "OrganizationID",
                  "x-oapi-codegen-extra-tags": {
                    "json": "organization_id"
                  }
                }
              },
              "required": [
                "organization_id"
              ]
            }
          }
        }
      }
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
};

export default schema;
