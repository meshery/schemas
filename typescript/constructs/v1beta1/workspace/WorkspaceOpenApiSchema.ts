/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const schema = {
  "openapi": "3.0.0",
  "info": {
    "title": "workspace",
    "description": "Documentation for meshery Cloud REST APIs",
    "contact": {
      "email": "maintainers@meshery.io"
    },
    "version": "v0.6.394"
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
      "name": "workspaces",
      "description": "Workspaces serve as a virtual space for your team-based work, allows you to control access and more, Provide a detailed description to clarify the purpose of this workspace. Remember you can changes description of workspace after it's creations too. Learn more about workspaces [here](https://docs.meshery.io/concepts/logical/workspaces)."
    }
  ],
  "paths": {
    "/api/workspaces": {
      "get": {
        "summary": "Get all workspaces",
        "tags": [
          "workspaces"
        ],
        "operationId": "GetWorkspaces",
        "description": "Gets all workspaces",
        "parameters": [
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
          },
          {
            "name": "orgID",
            "in": "query",
            "description": "Organization ID",
            "schema": {
              "type": "string"
            },
            "required": false
          }
        ],
        "responses": {
          "200": {
            "description": "List of workspaces",
            "content": {
              "application/json": {
                "schema": {
                  "description": "Paginated list of workspaces",
                  "type": "object",
                  "properties": {
                    "page": {
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "json": "page"
                      }
                    },
                    "page_size": {
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "json": "page_size"
                      }
                    },
                    "total_count": {
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "json": "total_count"
                      }
                    },
                    "workspaces": {
                      "type": "array",
                      "x-go-type-skip-optional-pointer": true,
                      "items": {
                        "description": "Workspace represents a workspace entity with all its properties",
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string",
                            "format": "uuid",
                            "description": "Unique identifier of the workspace",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "id",
                              "json": "id"
                            },
                            "x-go-name": "ID",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "name": {
                            "type": "string",
                            "description": "Name of the workspace",
                            "x-oapi-codegen-extra-tags": {
                              "db": "name",
                              "json": "name"
                            },
                            "x-go-type-skip-optional-pointer": true
                          },
                          "description": {
                            "type": "string",
                            "description": "Description of the workspace",
                            "x-oapi-codegen-extra-tags": {
                              "db": "description",
                              "json": "description"
                            },
                            "x-go-type-skip-optional-pointer": true
                          },
                          "organization_id": {
                            "type": "string",
                            "format": "uuid",
                            "description": "Organization ID to which the workspace belongs",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "organization_id",
                              "json": "organization_id"
                            },
                            "x-go-name": "OrganizationID",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "owner": {
                            "type": "string",
                            "format": "uuid",
                            "description": "Owner of the workspace (user ID)",
                            "x-go-type": "*uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "owner",
                              "json": "owner"
                            },
                            "x-go-type-skip-optional-pointer": true
                          },
                          "metadata": {
                            "type": "object",
                            "description": "Additional metadata for the workspace",
                            "x-go-type": "core.Map",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "metadata",
                              "json": "metadata"
                            },
                            "x-go-type-skip-optional-pointer": true
                          },
                          "created_at": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the workspace was created",
                            "x-go-type": "time.Time",
                            "x-go-type-import": {
                              "path": "time"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "json": "created_at"
                            },
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updated_at": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the workspace was last updated",
                            "x-go-type": "time.Time",
                            "x-go-type-import": {
                              "path": "time"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "json": "updated_at"
                            },
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deleted_at": {
                            "description": "Timestamp when the workspace was deleted (soft delete)",
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "json": "deleted_at"
                            },
                            "x-go-type-skip-optional-pointer": true
                          }
                        }
                      },
                      "x-oapi-codegen-extra-tags": {
                        "json": "workspaces"
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
        "summary": "Create a workspace",
        "tags": [
          "workspaces"
        ],
        "operationId": "CreateWorkspace",
        "description": "Creates a new workspace",
        "requestBody": {
          "description": "Body for creating workspace",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "description": "Payload for creating a new workspace",
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "Provide a name that meaningfully represents this workspace. You can change the name of the workspace even after its creation.",
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "name"
                    }
                  },
                  "description": {
                    "type": "string",
                    "description": "Workspaces serve as a virtual space for your team-based work, allows you to control access and more. Provide a detailed description to clarify the purpose of this workspace. Remember you can change the description of workspace after its creation too. Learn more about workspaces [here](https://docs.meshery.io/concepts/logical/workspaces)",
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "description"
                    }
                  },
                  "organization_id": {
                    "type": "string",
                    "description": "Select an organization in which you want to create this new workspace. Keep in mind that the organization cannot be changed after creation.",
                    "x-go-type-skip-optional-pointer": true,
                    "x-go-name": "OrganizationID",
                    "x-oapi-codegen-extra-tags": {
                      "json": "organization_id"
                    }
                  },
                  "metadata": {
                    "type": "object",
                    "description": "Additional metadata for the workspace",
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core"
                    },
                    "x-oapi-codegen-extra-tags": {
                      "json": "metadata"
                    },
                    "x-go-type-skip-optional-pointer": true
                  }
                },
                "required": [
                  "name",
                  "organization_id"
                ]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Workspace created successfully",
            "content": {
              "application/json": {
                "schema": {
                  "description": "Workspace represents a workspace entity with all its properties",
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "description": "Unique identifier of the workspace",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "id",
                        "json": "id"
                      },
                      "x-go-name": "ID",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "name": {
                      "type": "string",
                      "description": "Name of the workspace",
                      "x-oapi-codegen-extra-tags": {
                        "db": "name",
                        "json": "name"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "description": {
                      "type": "string",
                      "description": "Description of the workspace",
                      "x-oapi-codegen-extra-tags": {
                        "db": "description",
                        "json": "description"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "organization_id": {
                      "type": "string",
                      "format": "uuid",
                      "description": "Organization ID to which the workspace belongs",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "organization_id",
                        "json": "organization_id"
                      },
                      "x-go-name": "OrganizationID",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "owner": {
                      "type": "string",
                      "format": "uuid",
                      "description": "Owner of the workspace (user ID)",
                      "x-go-type": "*uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner",
                        "json": "owner"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "metadata": {
                      "type": "object",
                      "description": "Additional metadata for the workspace",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata",
                        "json": "metadata"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "created_at": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the workspace was created",
                      "x-go-type": "time.Time",
                      "x-go-type-import": {
                        "path": "time"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "created_at"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updated_at": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the workspace was last updated",
                      "x-go-type": "time.Time",
                      "x-go-type-import": {
                        "path": "time"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updated_at"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deleted_at": {
                      "description": "Timestamp when the workspace was deleted (soft delete)",
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deleted_at"
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
    "/api/workspaces/{workspaceId}": {
      "get": {
        "summary": "Get workspace by ID",
        "tags": [
          "workspaces"
        ],
        "operationId": "GetWorkspaceByID",
        "description": "Gets a workspace by its ID",
        "parameters": [
          {
            "name": "workspaceId",
            "in": "path",
            "description": "Workspace ID",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
              "x-go-type-skip-optional-pointer": true
            },
            "required": true
          },
          {
            "name": "orgID",
            "in": "query",
            "description": "Organization ID",
            "schema": {
              "type": "string"
            },
            "required": false
          }
        ],
        "responses": {
          "200": {
            "description": "Workspace details",
            "content": {
              "application/json": {
                "schema": {
                  "description": "Workspace represents a workspace entity with all its properties",
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "description": "Unique identifier of the workspace",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "id",
                        "json": "id"
                      },
                      "x-go-name": "ID",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "name": {
                      "type": "string",
                      "description": "Name of the workspace",
                      "x-oapi-codegen-extra-tags": {
                        "db": "name",
                        "json": "name"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "description": {
                      "type": "string",
                      "description": "Description of the workspace",
                      "x-oapi-codegen-extra-tags": {
                        "db": "description",
                        "json": "description"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "organization_id": {
                      "type": "string",
                      "format": "uuid",
                      "description": "Organization ID to which the workspace belongs",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "organization_id",
                        "json": "organization_id"
                      },
                      "x-go-name": "OrganizationID",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "owner": {
                      "type": "string",
                      "format": "uuid",
                      "description": "Owner of the workspace (user ID)",
                      "x-go-type": "*uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner",
                        "json": "owner"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "metadata": {
                      "type": "object",
                      "description": "Additional metadata for the workspace",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata",
                        "json": "metadata"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "created_at": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the workspace was created",
                      "x-go-type": "time.Time",
                      "x-go-type-import": {
                        "path": "time"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "created_at"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updated_at": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the workspace was last updated",
                      "x-go-type": "time.Time",
                      "x-go-type-import": {
                        "path": "time"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updated_at"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deleted_at": {
                      "description": "Timestamp when the workspace was deleted (soft delete)",
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deleted_at"
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
        "summary": "Update workspace",
        "tags": [
          "workspaces"
        ],
        "operationId": "UpdateWorkspace",
        "description": "Updates a workspace",
        "parameters": [
          {
            "name": "workspaceId",
            "in": "path",
            "description": "Workspace ID",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
              "x-go-type-skip-optional-pointer": true
            },
            "required": true
          }
        ],
        "requestBody": {
          "description": "Body for updating workspace",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "description": "Payload for updating an existing workspace",
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "Name of workspace",
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "name"
                    }
                  },
                  "description": {
                    "type": "string",
                    "description": "Description of the workspace",
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "description"
                    }
                  },
                  "organization_id": {
                    "type": "string",
                    "description": "Organization ID",
                    "x-go-type-skip-optional-pointer": true,
                    "x-go-name": "OrganizationID",
                    "x-oapi-codegen-extra-tags": {
                      "json": "organization_id"
                    }
                  },
                  "metadata": {
                    "type": "object",
                    "description": "Additional metadata for the workspace",
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core"
                    },
                    "x-oapi-codegen-extra-tags": {
                      "json": "metadata"
                    },
                    "x-go-type-skip-optional-pointer": true
                  }
                },
                "required": [
                  "organization_id"
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Workspace updated successfully",
            "content": {
              "application/json": {
                "schema": {
                  "description": "Workspace represents a workspace entity with all its properties",
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "description": "Unique identifier of the workspace",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "id",
                        "json": "id"
                      },
                      "x-go-name": "ID",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "name": {
                      "type": "string",
                      "description": "Name of the workspace",
                      "x-oapi-codegen-extra-tags": {
                        "db": "name",
                        "json": "name"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "description": {
                      "type": "string",
                      "description": "Description of the workspace",
                      "x-oapi-codegen-extra-tags": {
                        "db": "description",
                        "json": "description"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "organization_id": {
                      "type": "string",
                      "format": "uuid",
                      "description": "Organization ID to which the workspace belongs",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "organization_id",
                        "json": "organization_id"
                      },
                      "x-go-name": "OrganizationID",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "owner": {
                      "type": "string",
                      "format": "uuid",
                      "description": "Owner of the workspace (user ID)",
                      "x-go-type": "*uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner",
                        "json": "owner"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "metadata": {
                      "type": "object",
                      "description": "Additional metadata for the workspace",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata",
                        "json": "metadata"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "created_at": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the workspace was created",
                      "x-go-type": "time.Time",
                      "x-go-type-import": {
                        "path": "time"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "created_at"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updated_at": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the workspace was last updated",
                      "x-go-type": "time.Time",
                      "x-go-type-import": {
                        "path": "time"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updated_at"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deleted_at": {
                      "description": "Timestamp when the workspace was deleted (soft delete)",
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deleted_at"
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
        "summary": "Delete workspace",
        "tags": [
          "workspaces"
        ],
        "operationId": "DeleteWorkspace",
        "description": "Deletes a workspace by its ID",
        "parameters": [
          {
            "name": "workspaceId",
            "in": "path",
            "description": "Workspace ID",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
              "x-go-type-skip-optional-pointer": true
            },
            "required": true
          }
        ],
        "responses": {
          "204": {
            "description": "Workspace deleted successfully"
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
    "/api/workspaces/{workspaceId}/designs": {
      "get": {
        "tags": [
          "workspaces"
        ],
        "operationId": "GetDesignsOfWorkspace",
        "summary": "Get all designs assigned to a workspace",
        "description": "Gets designs assigned to a given workspace by its ID",
        "parameters": [
          {
            "name": "workspaceId",
            "in": "path",
            "description": "Workspace ID",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
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
            "description": "Designs list",
            "content": {
              "application/json": {
                "schema": {
                  "description": "Paginated list of Meshery designs",
                  "type": "object",
                  "properties": {
                    "page": {
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "json": "page"
                      }
                    },
                    "page_size": {
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "json": "page_size"
                      }
                    },
                    "total_count": {
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "json": "total_count"
                      }
                    },
                    "designs": {
                      "type": "array",
                      "x-go-type-skip-optional-pointer": true,
                      "items": {
                        "type": "object"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "json": "designs"
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
    "/api/workspaces/{workspaceId}/designs/{designId}": {
      "post": {
        "tags": [
          "workspaces"
        ],
        "operationId": "AssignDesignToWorkspace",
        "summary": "Assign a design to a workspace",
        "description": "Assigns a design to a workspace",
        "parameters": [
          {
            "name": "workspaceId",
            "in": "path",
            "description": "Workspace ID",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
              "x-go-type-skip-optional-pointer": true
            },
            "required": true
          },
          {
            "name": "designId",
            "in": "path",
            "description": "Design ID",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
              "x-go-type-skip-optional-pointer": true
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "Workspaces designs mapping",
            "content": {
              "application/json": {
                "schema": {
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
          "workspaces"
        ],
        "operationId": "UnassignDesignFromWorkspace",
        "summary": "Unassign a design from a workspace",
        "description": "Unassigns a design from a workspace",
        "parameters": [
          {
            "name": "workspaceId",
            "in": "path",
            "description": "Workspace ID",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
              "x-go-type-skip-optional-pointer": true
            },
            "required": true
          },
          {
            "name": "designId",
            "in": "path",
            "description": "Design ID",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
              "x-go-type-skip-optional-pointer": true
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "Workspaces designs mapping",
            "content": {
              "application/json": {
                "schema": {
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
    "/api/workspaces/{workspaceId}/environments": {
      "get": {
        "tags": [
          "workspaces"
        ],
        "operationId": "GetEnvironmentsOfWorkspace",
        "summary": "Get all environments assigned to a workspace",
        "description": "Gets environments assigned to a given workspace by its ID",
        "parameters": [
          {
            "name": "workspaceId",
            "in": "path",
            "description": "Workspace ID",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
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
            "description": "Environments list",
            "content": {
              "application/json": {
                "schema": {
                  "description": "Paginated list of environments",
                  "type": "object",
                  "properties": {
                    "page": {
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "json": "page"
                      }
                    },
                    "page_size": {
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "json": "page_size"
                      }
                    },
                    "total_count": {
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "json": "total_count"
                      }
                    },
                    "environments": {
                      "type": "array",
                      "x-go-type-skip-optional-pointer": true,
                      "items": {
                        "type": "object"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "json": "environments"
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
    "/api/workspaces/{workspaceId}/environments/{environmentId}": {
      "post": {
        "tags": [
          "workspaces"
        ],
        "operationId": "AssignEnvironmentToWorkspace",
        "summary": "Assign an environment to a workspace",
        "description": "Assigns an environment to a workspace",
        "parameters": [
          {
            "name": "workspaceId",
            "in": "path",
            "description": "Workspace ID",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
              "x-go-type-skip-optional-pointer": true
            },
            "required": true
          },
          {
            "name": "environmentId",
            "in": "path",
            "description": "Environment ID",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
              "x-go-type-skip-optional-pointer": true
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "Workspaces environments mapping",
            "content": {
              "application/json": {
                "schema": {
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
          "workspaces"
        ],
        "operationId": "UnassignEnvironmentFromWorkspace",
        "summary": "Unassign an environment from a workspace",
        "description": "Unassigns an environment from a workspace",
        "parameters": [
          {
            "name": "workspaceId",
            "in": "path",
            "description": "Workspace ID",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
              "x-go-type-skip-optional-pointer": true
            },
            "required": true
          },
          {
            "name": "environmentId",
            "in": "path",
            "description": "Environment ID",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
              "x-go-type-skip-optional-pointer": true
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "Workspaces environments mapping",
            "content": {
              "application/json": {
                "schema": {
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
    "/api/workspaces/{workspaceId}/teams": {
      "get": {
        "tags": [
          "workspaces"
        ],
        "operationId": "GetTeamsOfWorkspace",
        "summary": "Get all teams assigned to a workspace",
        "description": "Gets teams assigned to a given workspace by its ID",
        "parameters": [
          {
            "name": "workspaceId",
            "in": "path",
            "description": "Workspace ID",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
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
            "description": "Teams list",
            "content": {
              "application/json": {
                "schema": {
                  "description": "Paginated list of teams",
                  "type": "object",
                  "properties": {
                    "page": {
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "json": "page"
                      }
                    },
                    "page_size": {
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "json": "page_size"
                      }
                    },
                    "total_count": {
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "json": "total_count"
                      }
                    },
                    "teams": {
                      "type": "array",
                      "x-go-type-skip-optional-pointer": true,
                      "items": {
                        "type": "object"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "json": "teams"
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
    "/api/workspaces/{workspaceId}/teams/{teamId}": {
      "post": {
        "tags": [
          "workspaces"
        ],
        "operationId": "AssignTeamToWorkspace",
        "summary": "Assign a team to a workspace",
        "description": "Assigns a team to a workspace",
        "parameters": [
          {
            "name": "workspaceId",
            "in": "path",
            "description": "Workspace ID",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
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
              "x-go-type-skip-optional-pointer": true
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "Workspaces teams mapping",
            "content": {
              "application/json": {
                "schema": {
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
          "workspaces"
        ],
        "operationId": "UnassignTeamFromWorkspace",
        "summary": "Unassign a team from a workspace",
        "description": "Unassigns a team from a workspace",
        "parameters": [
          {
            "name": "workspaceId",
            "in": "path",
            "description": "Workspace ID",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
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
              "x-go-type-skip-optional-pointer": true
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "Workspaces teams mapping",
            "content": {
              "application/json": {
                "schema": {
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
    "/api/workspaces/{workspaceId}/views": {
      "get": {
        "tags": [
          "workspaces"
        ],
        "operationId": "GetViewsOfWorkspace",
        "summary": "Get all views assigned to a workspace",
        "description": "Gets views assigned to a given workspace by its ID",
        "parameters": [
          {
            "name": "workspaceId",
            "in": "path",
            "description": "Workspace ID",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
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
            "description": "Views list",
            "content": {
              "application/json": {
                "schema": {
                  "description": "Paginated list of views",
                  "type": "object",
                  "properties": {
                    "page": {
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "json": "page"
                      }
                    },
                    "page_size": {
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "json": "page_size"
                      }
                    },
                    "total_count": {
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "json": "total_count"
                      }
                    },
                    "views": {
                      "type": "array",
                      "x-go-type-skip-optional-pointer": true,
                      "items": {
                        "type": "object"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "json": "views"
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
    "/api/workspaces/{workspaceId}/views/{viewId}": {
      "post": {
        "tags": [
          "workspaces"
        ],
        "operationId": "AssignViewToWorkspace",
        "summary": "Assign a view to a workspace",
        "description": "Assigns a view to a workspace",
        "parameters": [
          {
            "name": "workspaceId",
            "in": "path",
            "description": "Workspace ID",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
              "x-go-type-skip-optional-pointer": true
            },
            "required": true
          },
          {
            "name": "viewId",
            "in": "path",
            "description": "View ID",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
              "x-go-type-skip-optional-pointer": true
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "Workspaces views mapping",
            "content": {
              "application/json": {
                "schema": {
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
          "workspaces"
        ],
        "operationId": "UnassignViewFromWorkspace",
        "summary": "Unassign a view from a workspace",
        "description": "Unassigns a view from a workspace",
        "parameters": [
          {
            "name": "workspaceId",
            "in": "path",
            "description": "Workspace ID",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
              "x-go-type-skip-optional-pointer": true
            },
            "required": true
          },
          {
            "name": "viewId",
            "in": "path",
            "description": "View ID",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
              "x-go-type-skip-optional-pointer": true
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "Workspaces views mapping",
            "content": {
              "application/json": {
                "schema": {
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
      "workspaceId": {
        "name": "workspaceId",
        "in": "path",
        "description": "Workspace ID",
        "schema": {
          "type": "string",
          "format": "uuid",
          "x-go-type": "uuid.UUID",
          "x-go-type-import": {
            "path": "github.com/gofrs/uuid"
          },
          "x-go-type-skip-optional-pointer": true
        },
        "required": true
      },
      "environmentId": {
        "name": "environmentId",
        "in": "path",
        "description": "Environment ID",
        "schema": {
          "type": "string",
          "format": "uuid",
          "x-go-type": "uuid.UUID",
          "x-go-type-import": {
            "path": "github.com/gofrs/uuid"
          },
          "x-go-type-skip-optional-pointer": true
        },
        "required": true
      },
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
          "x-go-type-skip-optional-pointer": true
        },
        "required": true
      },
      "designId": {
        "name": "designId",
        "in": "path",
        "description": "Design ID",
        "schema": {
          "type": "string",
          "format": "uuid",
          "x-go-type": "uuid.UUID",
          "x-go-type-import": {
            "path": "github.com/gofrs/uuid"
          },
          "x-go-type-skip-optional-pointer": true
        },
        "required": true
      },
      "viewId": {
        "name": "viewId",
        "in": "path",
        "description": "View ID",
        "schema": {
          "type": "string",
          "format": "uuid",
          "x-go-type": "uuid.UUID",
          "x-go-type-import": {
            "path": "github.com/gofrs/uuid"
          },
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
      },
      "filter": {
        "name": "filter",
        "in": "query",
        "description": "Get filtered reponses",
        "schema": {
          "type": "string"
        }
      },
      "orgIDQuery": {
        "name": "orgID",
        "in": "query",
        "description": "Organization ID",
        "schema": {
          "type": "string"
        },
        "required": false
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
      "workspace": {
        "description": "Workspace represents a workspace entity with all its properties",
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "description": "Unique identifier of the workspace",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "id",
              "json": "id"
            },
            "x-go-name": "ID",
            "x-go-type-skip-optional-pointer": true
          },
          "name": {
            "type": "string",
            "description": "Name of the workspace",
            "x-oapi-codegen-extra-tags": {
              "db": "name",
              "json": "name"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "description": {
            "type": "string",
            "description": "Description of the workspace",
            "x-oapi-codegen-extra-tags": {
              "db": "description",
              "json": "description"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "organization_id": {
            "type": "string",
            "format": "uuid",
            "description": "Organization ID to which the workspace belongs",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "organization_id",
              "json": "organization_id"
            },
            "x-go-name": "OrganizationID",
            "x-go-type-skip-optional-pointer": true
          },
          "owner": {
            "type": "string",
            "format": "uuid",
            "description": "Owner of the workspace (user ID)",
            "x-go-type": "*uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "owner",
              "json": "owner"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "metadata": {
            "type": "object",
            "description": "Additional metadata for the workspace",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "metadata",
              "json": "metadata"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "created_at": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the workspace was created",
            "x-go-type": "time.Time",
            "x-go-type-import": {
              "path": "time"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "created_at",
              "json": "created_at"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "updated_at": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the workspace was last updated",
            "x-go-type": "time.Time",
            "x-go-type-import": {
              "path": "time"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at",
              "json": "updated_at"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "deleted_at": {
            "description": "Timestamp when the workspace was deleted (soft delete)",
            "x-go-type": "core.NullTime",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at",
              "json": "deleted_at"
            },
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
        "description": "Payload for updating an existing workspace",
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "Name of workspace",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "name"
            }
          },
          "description": {
            "type": "string",
            "description": "Description of the workspace",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "description"
            }
          },
          "organization_id": {
            "type": "string",
            "description": "Organization ID",
            "x-go-type-skip-optional-pointer": true,
            "x-go-name": "OrganizationID",
            "x-oapi-codegen-extra-tags": {
              "json": "organization_id"
            }
          },
          "metadata": {
            "type": "object",
            "description": "Additional metadata for the workspace",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core"
            },
            "x-oapi-codegen-extra-tags": {
              "json": "metadata"
            },
            "x-go-type-skip-optional-pointer": true
          }
        },
        "required": [
          "organization_id"
        ]
      },
      "workspacePayload": {
        "description": "Payload for creating a new workspace",
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "Provide a name that meaningfully represents this workspace. You can change the name of the workspace even after its creation.",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "name"
            }
          },
          "description": {
            "type": "string",
            "description": "Workspaces serve as a virtual space for your team-based work, allows you to control access and more. Provide a detailed description to clarify the purpose of this workspace. Remember you can change the description of workspace after its creation too. Learn more about workspaces [here](https://docs.meshery.io/concepts/logical/workspaces)",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "description"
            }
          },
          "organization_id": {
            "type": "string",
            "description": "Select an organization in which you want to create this new workspace. Keep in mind that the organization cannot be changed after creation.",
            "x-go-type-skip-optional-pointer": true,
            "x-go-name": "OrganizationID",
            "x-oapi-codegen-extra-tags": {
              "json": "organization_id"
            }
          },
          "metadata": {
            "type": "object",
            "description": "Additional metadata for the workspace",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core"
            },
            "x-oapi-codegen-extra-tags": {
              "json": "metadata"
            },
            "x-go-type-skip-optional-pointer": true
          }
        },
        "required": [
          "name",
          "organization_id"
        ]
      },
      "workspacePage": {
        "description": "Paginated list of workspaces",
        "type": "object",
        "properties": {
          "page": {
            "type": "integer",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "page"
            }
          },
          "page_size": {
            "type": "integer",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "page_size"
            }
          },
          "total_count": {
            "type": "integer",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "total_count"
            }
          },
          "workspaces": {
            "type": "array",
            "x-go-type-skip-optional-pointer": true,
            "items": {
              "description": "Workspace represents a workspace entity with all its properties",
              "type": "object",
              "properties": {
                "id": {
                  "type": "string",
                  "format": "uuid",
                  "description": "Unique identifier of the workspace",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "id",
                    "json": "id"
                  },
                  "x-go-name": "ID",
                  "x-go-type-skip-optional-pointer": true
                },
                "name": {
                  "type": "string",
                  "description": "Name of the workspace",
                  "x-oapi-codegen-extra-tags": {
                    "db": "name",
                    "json": "name"
                  },
                  "x-go-type-skip-optional-pointer": true
                },
                "description": {
                  "type": "string",
                  "description": "Description of the workspace",
                  "x-oapi-codegen-extra-tags": {
                    "db": "description",
                    "json": "description"
                  },
                  "x-go-type-skip-optional-pointer": true
                },
                "organization_id": {
                  "type": "string",
                  "format": "uuid",
                  "description": "Organization ID to which the workspace belongs",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "organization_id",
                    "json": "organization_id"
                  },
                  "x-go-name": "OrganizationID",
                  "x-go-type-skip-optional-pointer": true
                },
                "owner": {
                  "type": "string",
                  "format": "uuid",
                  "description": "Owner of the workspace (user ID)",
                  "x-go-type": "*uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "owner",
                    "json": "owner"
                  },
                  "x-go-type-skip-optional-pointer": true
                },
                "metadata": {
                  "type": "object",
                  "description": "Additional metadata for the workspace",
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "metadata",
                    "json": "metadata"
                  },
                  "x-go-type-skip-optional-pointer": true
                },
                "created_at": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Timestamp when the workspace was created",
                  "x-go-type": "time.Time",
                  "x-go-type-import": {
                    "path": "time"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at",
                    "json": "created_at"
                  },
                  "x-go-type-skip-optional-pointer": true
                },
                "updated_at": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Timestamp when the workspace was last updated",
                  "x-go-type": "time.Time",
                  "x-go-type-import": {
                    "path": "time"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at",
                    "json": "updated_at"
                  },
                  "x-go-type-skip-optional-pointer": true
                },
                "deleted_at": {
                  "description": "Timestamp when the workspace was deleted (soft delete)",
                  "x-go-type": "core.NullTime",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "deleted_at",
                    "json": "deleted_at"
                  },
                  "x-go-type-skip-optional-pointer": true
                }
              }
            },
            "x-oapi-codegen-extra-tags": {
              "json": "workspaces"
            }
          }
        }
      },
      "teamsPage": {
        "description": "Paginated list of teams",
        "type": "object",
        "properties": {
          "page": {
            "type": "integer",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "page"
            }
          },
          "page_size": {
            "type": "integer",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "page_size"
            }
          },
          "total_count": {
            "type": "integer",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "total_count"
            }
          },
          "teams": {
            "type": "array",
            "x-go-type-skip-optional-pointer": true,
            "items": {
              "type": "object"
            },
            "x-oapi-codegen-extra-tags": {
              "json": "teams"
            }
          }
        }
      },
      "environmentPage": {
        "description": "Paginated list of environments",
        "type": "object",
        "properties": {
          "page": {
            "type": "integer",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "page"
            }
          },
          "page_size": {
            "type": "integer",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "page_size"
            }
          },
          "total_count": {
            "type": "integer",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "total_count"
            }
          },
          "environments": {
            "type": "array",
            "x-go-type-skip-optional-pointer": true,
            "items": {
              "type": "object"
            },
            "x-oapi-codegen-extra-tags": {
              "json": "environments"
            }
          }
        }
      },
      "mesheryDesignPage": {
        "description": "Paginated list of Meshery designs",
        "type": "object",
        "properties": {
          "page": {
            "type": "integer",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "page"
            }
          },
          "page_size": {
            "type": "integer",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "page_size"
            }
          },
          "total_count": {
            "type": "integer",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "total_count"
            }
          },
          "designs": {
            "type": "array",
            "x-go-type-skip-optional-pointer": true,
            "items": {
              "type": "object"
            },
            "x-oapi-codegen-extra-tags": {
              "json": "designs"
            }
          }
        }
      },
      "viewsPage": {
        "description": "Paginated list of views",
        "type": "object",
        "properties": {
          "page": {
            "type": "integer",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "page"
            }
          },
          "page_size": {
            "type": "integer",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "page_size"
            }
          },
          "total_count": {
            "type": "integer",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "total_count"
            }
          },
          "views": {
            "type": "array",
            "x-go-type-skip-optional-pointer": true,
            "items": {
              "type": "object"
            },
            "x-oapi-codegen-extra-tags": {
              "json": "views"
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
              "description": "Payload for creating a new workspace",
              "type": "object",
              "properties": {
                "name": {
                  "type": "string",
                  "description": "Provide a name that meaningfully represents this workspace. You can change the name of the workspace even after its creation.",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "name"
                  }
                },
                "description": {
                  "type": "string",
                  "description": "Workspaces serve as a virtual space for your team-based work, allows you to control access and more. Provide a detailed description to clarify the purpose of this workspace. Remember you can change the description of workspace after its creation too. Learn more about workspaces [here](https://docs.meshery.io/concepts/logical/workspaces)",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "description"
                  }
                },
                "organization_id": {
                  "type": "string",
                  "description": "Select an organization in which you want to create this new workspace. Keep in mind that the organization cannot be changed after creation.",
                  "x-go-type-skip-optional-pointer": true,
                  "x-go-name": "OrganizationID",
                  "x-oapi-codegen-extra-tags": {
                    "json": "organization_id"
                  }
                },
                "metadata": {
                  "type": "object",
                  "description": "Additional metadata for the workspace",
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "json": "metadata"
                  },
                  "x-go-type-skip-optional-pointer": true
                }
              },
              "required": [
                "name",
                "organization_id"
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
              "description": "Payload for updating an existing workspace",
              "type": "object",
              "properties": {
                "name": {
                  "type": "string",
                  "description": "Name of workspace",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "name"
                  }
                },
                "description": {
                  "type": "string",
                  "description": "Description of the workspace",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "description"
                  }
                },
                "organization_id": {
                  "type": "string",
                  "description": "Organization ID",
                  "x-go-type-skip-optional-pointer": true,
                  "x-go-name": "OrganizationID",
                  "x-oapi-codegen-extra-tags": {
                    "json": "organization_id"
                  }
                },
                "metadata": {
                  "type": "object",
                  "description": "Additional metadata for the workspace",
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "json": "metadata"
                  },
                  "x-go-type-skip-optional-pointer": true
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
