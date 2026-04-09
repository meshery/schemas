/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const ViewSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "View",
    "description": "OpenAPI schema for managing Meshery views — saved perspectives with filters and metadata.",
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
      "name": "views",
      "description": "APIs for managing Meshery views."
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
          "x-oapi-codegen-extra-tags": {
            "db": "view_id",
            "json": "view_id"
          },
          "x-go-type-name": "ViewId",
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
      "orgIdQuery": {
        "name": "orgId",
        "in": "query",
        "description": "Organization ID to scope the request.",
        "schema": {
          "type": "string"
        },
        "required": false
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
      "MesheryView": {
        "$id": "https://schemas.meshery.io/view.yaml",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "MesheryView",
        "description": "A saved view with filters and metadata that defines a customized perspective of Meshery resources. Learn more at https://docs.meshery.io/concepts/logical/views",
        "additionalProperties": false,
        "type": "object",
        "example": {
          "id": "00000000-0000-0000-0000-000000000000",
          "name": "My Kubernetes View",
          "visibility": "private",
          "filters": {},
          "metadata": {},
          "user_id": "00000000-0000-0000-0000-000000000000",
          "created_at": "0001-01-01T00:00:00Z",
          "updated_at": "0001-01-01T00:00:00Z",
          "deleted_at": null
        },
        "required": [
          "id",
          "name",
          "visibility",
          "user_id",
          "created_at",
          "updated_at"
        ],
        "properties": {
          "id": {
            "description": "Unique identifier for the view.",
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
            "type": "string",
            "description": "Display name of the view.",
            "maxLength": 255,
            "minLength": 1,
            "x-order": 2,
            "x-oapi-codegen-extra-tags": {
              "db": "name",
              "yaml": "name"
            }
          },
          "visibility": {
            "type": "string",
            "description": "Visibility level of the view.",
            "maxLength": 255,
            "x-order": 3,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "visibility",
              "yaml": "visibility"
            }
          },
          "filters": {
            "type": "object",
            "description": "Filter configuration that defines which resources this view displays.",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-order": 4,
            "x-oapi-codegen-extra-tags": {
              "db": "filters",
              "yaml": "filters"
            }
          },
          "metadata": {
            "type": "object",
            "description": "Additional metadata associated with the view.",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-order": 5,
            "x-oapi-codegen-extra-tags": {
              "db": "metadata",
              "yaml": "metadata"
            }
          },
          "user_id": {
            "description": "ID of the user who created the view.",
            "x-go-name": "UserID",
            "x-go-type-skip-optional-pointer": true,
            "x-order": 6,
            "x-oapi-codegen-extra-tags": {
              "db": "user_id",
              "yaml": "user_id"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "created_at": {
            "description": "Timestamp when the view was created.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at",
              "yaml": "created_at"
            },
            "x-order": 7,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updated_at": {
            "description": "Timestamp when the view was last updated.",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at",
              "yaml": "updated_at"
            },
            "x-order": 8,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deleted_at": {
            "description": "Timestamp when the view was soft deleted. Null while the view remains active.",
            "nullable": true,
            "x-go-type": "core.NullTime",
            "x-go-import": "database/sql",
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at",
              "yaml": "deleted_at"
            },
            "x-order": 9,
            "x-go-type-import": {
              "name": "meshcore",
              "path": "github.com/meshery/schemas/models/core"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "MesheryViewWithLocation": {
        "type": "object",
        "description": "A view enriched with the workspace and organization it belongs to.",
        "required": [
          "workspace_id",
          "organization_id"
        ],
        "properties": {
          "id": {
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
            "description": "Display name of the view.",
            "maxLength": 255,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "name",
              "json": "name,omitempty"
            }
          },
          "visibility": {
            "type": "string",
            "description": "Visibility level of the view.",
            "maxLength": 255,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "visibility",
              "json": "visibility,omitempty"
            }
          },
          "filters": {
            "type": "object",
            "description": "Filter configuration for this view.",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "filters",
              "json": "filters,omitempty"
            }
          },
          "metadata": {
            "type": "object",
            "description": "Metadata associated with the view.",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "metadata",
              "json": "metadata,omitempty"
            }
          },
          "user_id": {
            "description": "ID of the user who created the view.",
            "x-go-name": "UserID",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "user_id",
              "json": "user_id,omitempty"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "workspace_name": {
            "type": "string",
            "description": "Name of the workspace this view belongs to.",
            "maxLength": 255,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "workspace_name",
              "json": "workspace_name,omitempty"
            }
          },
          "workspace_id": {
            "description": "ID of the workspace this view belongs to.",
            "x-go-name": "WorkspaceID",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "workspace_id",
              "json": "workspace_id"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "organization_id": {
            "description": "ID of the organization this view belongs to.",
            "x-go-name": "OrganizationID",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "organization_id",
              "json": "organization_id"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "organization_name": {
            "type": "string",
            "description": "Name of the organization this view belongs to.",
            "maxLength": 255,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "organization_name",
              "json": "organization_name,omitempty"
            }
          },
          "created_at": {
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
            "description": "Timestamp when the view was soft deleted. Null while the view remains active.",
            "x-go-type": "meshcore.NullTime",
            "x-go-type-import": {
              "name": "meshcore",
              "path": "github.com/meshery/schemas/models/core"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "ViewPayload": {
        "type": "object",
        "description": "Payload for creating or updating a view.",
        "required": [
          "name"
        ],
        "properties": {
          "name": {
            "type": "string",
            "description": "Display name of the view.",
            "maxLength": 255,
            "minLength": 1,
            "x-oapi-codegen-extra-tags": {
              "json": "name,omitempty"
            }
          },
          "filters": {
            "type": "object",
            "description": "Filter configuration for this view.",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "filters,omitempty"
            }
          },
          "visibility": {
            "type": "string",
            "description": "Visibility level of the view.",
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "json": "visibility,omitempty"
            }
          },
          "metadata": {
            "type": "object",
            "description": "Metadata associated with the view.",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "metadata,omitempty"
            }
          }
        }
      },
      "MesheryViewPage": {
        "type": "object",
        "description": "Paginated list of views with location enrichment.",
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
          "views": {
            "type": "array",
            "x-go-type-skip-optional-pointer": true,
            "items": {
              "x-go-type": "MesheryViewWithLocation",
              "type": "object",
              "description": "A view enriched with the workspace and organization it belongs to.",
              "required": [
                "workspace_id",
                "organization_id"
              ],
              "properties": {
                "id": {
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
                  "description": "Display name of the view.",
                  "maxLength": 255,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "name",
                    "json": "name,omitempty"
                  }
                },
                "visibility": {
                  "type": "string",
                  "description": "Visibility level of the view.",
                  "maxLength": 255,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "visibility",
                    "json": "visibility,omitempty"
                  }
                },
                "filters": {
                  "type": "object",
                  "description": "Filter configuration for this view.",
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "filters",
                    "json": "filters,omitempty"
                  }
                },
                "metadata": {
                  "type": "object",
                  "description": "Metadata associated with the view.",
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "metadata",
                    "json": "metadata,omitempty"
                  }
                },
                "user_id": {
                  "description": "ID of the user who created the view.",
                  "x-go-name": "UserID",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "user_id",
                    "json": "user_id,omitempty"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "workspace_name": {
                  "type": "string",
                  "description": "Name of the workspace this view belongs to.",
                  "maxLength": 255,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "workspace_name",
                    "json": "workspace_name,omitempty"
                  }
                },
                "workspace_id": {
                  "description": "ID of the workspace this view belongs to.",
                  "x-go-name": "WorkspaceID",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "workspace_id",
                    "json": "workspace_id"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "organization_id": {
                  "description": "ID of the organization this view belongs to.",
                  "x-go-name": "OrganizationID",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "organization_id",
                    "json": "organization_id"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "organization_name": {
                  "type": "string",
                  "description": "Name of the organization this view belongs to.",
                  "maxLength": 255,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "organization_name",
                    "json": "organization_name,omitempty"
                  }
                },
                "created_at": {
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
                  "description": "Timestamp when the view was soft deleted. Null while the view remains active.",
                  "x-go-type": "meshcore.NullTime",
                  "x-go-type-import": {
                    "name": "meshcore",
                    "path": "github.com/meshery/schemas/models/core"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                }
              }
            },
            "description": "Views in this page, enriched with workspace and organization context."
          }
        }
      }
    },
    "requestBodies": {
      "viewPayload": {
        "description": "Body for creating or updating a view",
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "description": "Payload for creating or updating a view.",
              "required": [
                "name"
              ],
              "properties": {
                "name": {
                  "type": "string",
                  "description": "Display name of the view.",
                  "maxLength": 255,
                  "minLength": 1,
                  "x-oapi-codegen-extra-tags": {
                    "json": "name,omitempty"
                  }
                },
                "filters": {
                  "type": "object",
                  "description": "Filter configuration for this view.",
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "filters,omitempty"
                  }
                },
                "visibility": {
                  "type": "string",
                  "description": "Visibility level of the view.",
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "json": "visibility,omitempty"
                  }
                },
                "metadata": {
                  "type": "object",
                  "description": "Metadata associated with the view.",
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "metadata,omitempty"
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "paths": {
    "/api/content/views": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "views"
        ],
        "operationId": "createView",
        "summary": "Create a view",
        "description": "Creates a new view with the given filters and metadata.",
        "requestBody": {
          "description": "Body for creating or updating a view",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for creating or updating a view.",
                "required": [
                  "name"
                ],
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "Display name of the view.",
                    "maxLength": 255,
                    "minLength": 1,
                    "x-oapi-codegen-extra-tags": {
                      "json": "name,omitempty"
                    }
                  },
                  "filters": {
                    "type": "object",
                    "description": "Filter configuration for this view.",
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "filters,omitempty"
                    }
                  },
                  "visibility": {
                    "type": "string",
                    "description": "Visibility level of the view.",
                    "maxLength": 255,
                    "x-oapi-codegen-extra-tags": {
                      "json": "visibility,omitempty"
                    }
                  },
                  "metadata": {
                    "type": "object",
                    "description": "Metadata associated with the view.",
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "metadata,omitempty"
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Created view",
            "content": {
              "application/json": {
                "schema": {
                  "$id": "https://schemas.meshery.io/view.yaml",
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "MesheryView",
                  "description": "A saved view with filters and metadata that defines a customized perspective of Meshery resources. Learn more at https://docs.meshery.io/concepts/logical/views",
                  "additionalProperties": false,
                  "type": "object",
                  "example": {
                    "id": "00000000-0000-0000-0000-000000000000",
                    "name": "My Kubernetes View",
                    "visibility": "private",
                    "filters": {},
                    "metadata": {},
                    "user_id": "00000000-0000-0000-0000-000000000000",
                    "created_at": "0001-01-01T00:00:00Z",
                    "updated_at": "0001-01-01T00:00:00Z",
                    "deleted_at": null
                  },
                  "required": [
                    "id",
                    "name",
                    "visibility",
                    "user_id",
                    "created_at",
                    "updated_at"
                  ],
                  "properties": {
                    "id": {
                      "description": "Unique identifier for the view.",
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
                      "type": "string",
                      "description": "Display name of the view.",
                      "maxLength": 255,
                      "minLength": 1,
                      "x-order": 2,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name",
                        "yaml": "name"
                      }
                    },
                    "visibility": {
                      "type": "string",
                      "description": "Visibility level of the view.",
                      "maxLength": 255,
                      "x-order": 3,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "visibility",
                        "yaml": "visibility"
                      }
                    },
                    "filters": {
                      "type": "object",
                      "description": "Filter configuration that defines which resources this view displays.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 4,
                      "x-oapi-codegen-extra-tags": {
                        "db": "filters",
                        "yaml": "filters"
                      }
                    },
                    "metadata": {
                      "type": "object",
                      "description": "Additional metadata associated with the view.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 5,
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata",
                        "yaml": "metadata"
                      }
                    },
                    "user_id": {
                      "description": "ID of the user who created the view.",
                      "x-go-name": "UserID",
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 6,
                      "x-oapi-codegen-extra-tags": {
                        "db": "user_id",
                        "yaml": "user_id"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "created_at": {
                      "description": "Timestamp when the view was created.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "yaml": "created_at"
                      },
                      "x-order": 7,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updated_at": {
                      "description": "Timestamp when the view was last updated.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "yaml": "updated_at"
                      },
                      "x-order": 8,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deleted_at": {
                      "description": "Timestamp when the view was soft deleted. Null while the view remains active.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-import": "database/sql",
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "yaml": "deleted_at"
                      },
                      "x-order": 9,
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
                      },
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
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "views"
        ],
        "operationId": "getViews",
        "summary": "Get views",
        "description": "Returns a paginated list of views accessible to the user.",
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
            "name": "filter",
            "in": "query",
            "description": "JSON-encoded filter string for assignment and soft-delete filters.",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "shared",
            "in": "query",
            "description": "When true, include views shared with the user.",
            "required": false,
            "schema": {
              "type": "boolean"
            }
          },
          {
            "name": "visibility",
            "in": "query",
            "description": "Filter by visibility level (public, private).",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "orgId",
            "in": "query",
            "description": "Organization ID to scope the request.",
            "schema": {
              "type": "string"
            },
            "required": false
          },
          {
            "name": "userId",
            "in": "query",
            "description": "UUID of the user whose views to retrieve.",
            "required": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Views page",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated list of views with location enrichment.",
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
                    "views": {
                      "type": "array",
                      "x-go-type-skip-optional-pointer": true,
                      "items": {
                        "x-go-type": "MesheryViewWithLocation",
                        "type": "object",
                        "description": "A view enriched with the workspace and organization it belongs to.",
                        "required": [
                          "workspace_id",
                          "organization_id"
                        ],
                        "properties": {
                          "id": {
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
                            "description": "Display name of the view.",
                            "maxLength": 255,
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "name",
                              "json": "name,omitempty"
                            }
                          },
                          "visibility": {
                            "type": "string",
                            "description": "Visibility level of the view.",
                            "maxLength": 255,
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "visibility",
                              "json": "visibility,omitempty"
                            }
                          },
                          "filters": {
                            "type": "object",
                            "description": "Filter configuration for this view.",
                            "x-go-type": "core.Map",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "filters",
                              "json": "filters,omitempty"
                            }
                          },
                          "metadata": {
                            "type": "object",
                            "description": "Metadata associated with the view.",
                            "x-go-type": "core.Map",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "metadata",
                              "json": "metadata,omitempty"
                            }
                          },
                          "user_id": {
                            "description": "ID of the user who created the view.",
                            "x-go-name": "UserID",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "user_id",
                              "json": "user_id,omitempty"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "workspace_name": {
                            "type": "string",
                            "description": "Name of the workspace this view belongs to.",
                            "maxLength": 255,
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "workspace_name",
                              "json": "workspace_name,omitempty"
                            }
                          },
                          "workspace_id": {
                            "description": "ID of the workspace this view belongs to.",
                            "x-go-name": "WorkspaceID",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "workspace_id",
                              "json": "workspace_id"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "organization_id": {
                            "description": "ID of the organization this view belongs to.",
                            "x-go-name": "OrganizationID",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "organization_id",
                              "json": "organization_id"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "organization_name": {
                            "type": "string",
                            "description": "Name of the organization this view belongs to.",
                            "maxLength": 255,
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "organization_name",
                              "json": "organization_name,omitempty"
                            }
                          },
                          "created_at": {
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
                            "description": "Timestamp when the view was soft deleted. Null while the view remains active.",
                            "x-go-type": "meshcore.NullTime",
                            "x-go-type-import": {
                              "name": "meshcore",
                              "path": "github.com/meshery/schemas/models/core"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          }
                        }
                      },
                      "description": "Views in this page, enriched with workspace and organization context."
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
    "/api/content/views/{viewId}": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "views"
        ],
        "operationId": "getViewById",
        "summary": "Get a view by ID",
        "description": "Returns a single view by its unique identifier.",
        "parameters": [
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
              "x-oapi-codegen-extra-tags": {
                "db": "view_id",
                "json": "view_id"
              },
              "x-go-type-name": "ViewId",
              "x-go-type-skip-optional-pointer": true
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "View",
            "content": {
              "application/json": {
                "schema": {
                  "$id": "https://schemas.meshery.io/view.yaml",
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "MesheryView",
                  "description": "A saved view with filters and metadata that defines a customized perspective of Meshery resources. Learn more at https://docs.meshery.io/concepts/logical/views",
                  "additionalProperties": false,
                  "type": "object",
                  "example": {
                    "id": "00000000-0000-0000-0000-000000000000",
                    "name": "My Kubernetes View",
                    "visibility": "private",
                    "filters": {},
                    "metadata": {},
                    "user_id": "00000000-0000-0000-0000-000000000000",
                    "created_at": "0001-01-01T00:00:00Z",
                    "updated_at": "0001-01-01T00:00:00Z",
                    "deleted_at": null
                  },
                  "required": [
                    "id",
                    "name",
                    "visibility",
                    "user_id",
                    "created_at",
                    "updated_at"
                  ],
                  "properties": {
                    "id": {
                      "description": "Unique identifier for the view.",
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
                      "type": "string",
                      "description": "Display name of the view.",
                      "maxLength": 255,
                      "minLength": 1,
                      "x-order": 2,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name",
                        "yaml": "name"
                      }
                    },
                    "visibility": {
                      "type": "string",
                      "description": "Visibility level of the view.",
                      "maxLength": 255,
                      "x-order": 3,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "visibility",
                        "yaml": "visibility"
                      }
                    },
                    "filters": {
                      "type": "object",
                      "description": "Filter configuration that defines which resources this view displays.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 4,
                      "x-oapi-codegen-extra-tags": {
                        "db": "filters",
                        "yaml": "filters"
                      }
                    },
                    "metadata": {
                      "type": "object",
                      "description": "Additional metadata associated with the view.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 5,
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata",
                        "yaml": "metadata"
                      }
                    },
                    "user_id": {
                      "description": "ID of the user who created the view.",
                      "x-go-name": "UserID",
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 6,
                      "x-oapi-codegen-extra-tags": {
                        "db": "user_id",
                        "yaml": "user_id"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "created_at": {
                      "description": "Timestamp when the view was created.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "yaml": "created_at"
                      },
                      "x-order": 7,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updated_at": {
                      "description": "Timestamp when the view was last updated.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "yaml": "updated_at"
                      },
                      "x-order": 8,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deleted_at": {
                      "description": "Timestamp when the view was soft deleted. Null while the view remains active.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-import": "database/sql",
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "yaml": "deleted_at"
                      },
                      "x-order": 9,
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
                      },
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
          "cloud"
        ],
        "tags": [
          "views"
        ],
        "operationId": "updateView",
        "summary": "Update a view",
        "description": "Updates an existing view with new filters, metadata, or visibility.",
        "parameters": [
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
              "x-oapi-codegen-extra-tags": {
                "db": "view_id",
                "json": "view_id"
              },
              "x-go-type-name": "ViewId",
              "x-go-type-skip-optional-pointer": true
            },
            "required": true
          }
        ],
        "requestBody": {
          "description": "Body for creating or updating a view",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for creating or updating a view.",
                "required": [
                  "name"
                ],
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "Display name of the view.",
                    "maxLength": 255,
                    "minLength": 1,
                    "x-oapi-codegen-extra-tags": {
                      "json": "name,omitempty"
                    }
                  },
                  "filters": {
                    "type": "object",
                    "description": "Filter configuration for this view.",
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "filters,omitempty"
                    }
                  },
                  "visibility": {
                    "type": "string",
                    "description": "Visibility level of the view.",
                    "maxLength": 255,
                    "x-oapi-codegen-extra-tags": {
                      "json": "visibility,omitempty"
                    }
                  },
                  "metadata": {
                    "type": "object",
                    "description": "Metadata associated with the view.",
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "metadata,omitempty"
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Updated view",
            "content": {
              "application/json": {
                "schema": {
                  "$id": "https://schemas.meshery.io/view.yaml",
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "MesheryView",
                  "description": "A saved view with filters and metadata that defines a customized perspective of Meshery resources. Learn more at https://docs.meshery.io/concepts/logical/views",
                  "additionalProperties": false,
                  "type": "object",
                  "example": {
                    "id": "00000000-0000-0000-0000-000000000000",
                    "name": "My Kubernetes View",
                    "visibility": "private",
                    "filters": {},
                    "metadata": {},
                    "user_id": "00000000-0000-0000-0000-000000000000",
                    "created_at": "0001-01-01T00:00:00Z",
                    "updated_at": "0001-01-01T00:00:00Z",
                    "deleted_at": null
                  },
                  "required": [
                    "id",
                    "name",
                    "visibility",
                    "user_id",
                    "created_at",
                    "updated_at"
                  ],
                  "properties": {
                    "id": {
                      "description": "Unique identifier for the view.",
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
                      "type": "string",
                      "description": "Display name of the view.",
                      "maxLength": 255,
                      "minLength": 1,
                      "x-order": 2,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name",
                        "yaml": "name"
                      }
                    },
                    "visibility": {
                      "type": "string",
                      "description": "Visibility level of the view.",
                      "maxLength": 255,
                      "x-order": 3,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "visibility",
                        "yaml": "visibility"
                      }
                    },
                    "filters": {
                      "type": "object",
                      "description": "Filter configuration that defines which resources this view displays.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 4,
                      "x-oapi-codegen-extra-tags": {
                        "db": "filters",
                        "yaml": "filters"
                      }
                    },
                    "metadata": {
                      "type": "object",
                      "description": "Additional metadata associated with the view.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 5,
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata",
                        "yaml": "metadata"
                      }
                    },
                    "user_id": {
                      "description": "ID of the user who created the view.",
                      "x-go-name": "UserID",
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 6,
                      "x-oapi-codegen-extra-tags": {
                        "db": "user_id",
                        "yaml": "user_id"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "created_at": {
                      "description": "Timestamp when the view was created.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "yaml": "created_at"
                      },
                      "x-order": 7,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updated_at": {
                      "description": "Timestamp when the view was last updated.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "yaml": "updated_at"
                      },
                      "x-order": 8,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deleted_at": {
                      "description": "Timestamp when the view was soft deleted. Null while the view remains active.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-import": "database/sql",
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "yaml": "deleted_at"
                      },
                      "x-order": 9,
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
                      },
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
          "cloud"
        ],
        "tags": [
          "views"
        ],
        "operationId": "deleteView",
        "summary": "Delete a view",
        "description": "Soft-deletes a view by its unique identifier.",
        "parameters": [
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
              "x-oapi-codegen-extra-tags": {
                "db": "view_id",
                "json": "view_id"
              },
              "x-go-type-name": "ViewId",
              "x-go-type-skip-optional-pointer": true
            },
            "required": true
          }
        ],
        "responses": {
          "204": {
            "description": "View deleted"
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

export default ViewSchema;
