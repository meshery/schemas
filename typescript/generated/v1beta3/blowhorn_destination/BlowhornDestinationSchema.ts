/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const BlowhornDestinationSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "BlowhornDestination",
    "description": "OpenAPI schema for Blowhorn destinations - named publishing targets\nper platform, scoped by organization.\n",
    "version": "v1beta3",
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
      "name": "blowhornDestinations",
      "description": "Operations related to Blowhorn destinations."
    }
  ],
  "paths": {
    "/api/blowhorn/destinations": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "blowhornDestinations"
        ],
        "summary": "List Blowhorn destinations",
        "operationId": "listBlowhornDestinations",
        "description": "Returns a paginated list of Blowhorn destinations in the organization of the authenticated session.",
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "description": "Get responses by page",
            "schema": {
              "type": "integer",
              "minimum": 0
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "description": "Number of items per page (canonical camelCase form).",
            "schema": {
              "type": "integer",
              "minimum": 1
            }
          },
          {
            "name": "pagesize",
            "in": "query",
            "description": "Number of items per page. Deprecated alias of pageSize;\ncanonical `pageSize` wins when both are present.\n",
            "deprecated": true,
            "schema": {
              "type": "integer",
              "minimum": 1
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
            "name": "platform",
            "in": "query",
            "required": false,
            "description": "Filter by target platform (e.g. linkedin).",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Blowhorn destinations page",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated collection of Blowhorn destinations.",
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
                    "blowhornDestinations": {
                      "type": "array",
                      "items": {
                        "x-go-type": "BlowhornDestination",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "title": "Blowhorn Destination Schema",
                        "description": "Server-returned Blowhorn destination as persisted by meshery-cloud. A\ndestination names where an organization publishes on a platform. An\nenvironment reference may be attached later; destinations do not carry\none in this version.\n",
                        "type": "object",
                        "additionalProperties": false,
                        "required": [
                          "id",
                          "organizationId",
                          "platform",
                          "createdAt",
                          "updatedAt"
                        ],
                        "properties": {
                          "id": {
                            "description": "Server-generated Blowhorn destination ID.",
                            "x-order": 1,
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "organizationId": {
                            "description": "Owning organization ID. Derived from the authenticated session, never client-settable.",
                            "x-go-name": "OrganizationID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "organization_id"
                            },
                            "x-order": 2,
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "name": {
                            "type": "string",
                            "description": "Human-readable destination name.",
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "name"
                            },
                            "x-order": 3
                          },
                          "platform": {
                            "type": "string",
                            "description": "Target platform for the destination (e.g. linkedin).",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "platform"
                            },
                            "x-order": 4
                          },
                          "target": {
                            "type": "string",
                            "description": "Platform-side publishing target (page, group or channel identifier).",
                            "maxLength": 1024,
                            "x-oapi-codegen-extra-tags": {
                              "db": "target"
                            },
                            "x-order": 5
                          },
                          "settings": {
                            "type": "object",
                            "description": "Destination settings, stored as a JSON blob.",
                            "x-go-type": "core.Map",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "settings"
                            },
                            "x-order": 6
                          },
                          "createdAt": {
                            "description": "Timestamp of Blowhorn destination creation.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at"
                            },
                            "x-order": 7,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp of last Blowhorn destination modification.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at"
                            },
                            "x-order": 8,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deletedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the Blowhorn destination was soft-deleted.",
                            "nullable": true,
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "json": "deletedAt,omitempty"
                            },
                            "x-order": 9
                          }
                        }
                      },
                      "description": "Blowhorn destinations included on this page of results."
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
          "blowhornDestinations"
        ],
        "summary": "Upsert Blowhorn destination",
        "operationId": "upsertBlowhornDestination",
        "description": "Creates a new Blowhorn destination when no `id` is supplied, or\nupdates the entry matching the provided `id`. Ownership is\nderived from the authenticated session; any client-supplied\nowner is ignored.\n",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for creating or updating a Blowhorn destination. Contains\nonly client-settable fields; the owning `organizationId` (derived\nfrom the authenticated session) and the server-generated\n`createdAt` / `updatedAt` timestamps are intentionally excluded.\n",
                "required": [
                  "platform"
                ],
                "properties": {
                  "id": {
                    "description": "Existing Blowhorn destination ID for updates; omit on create.",
                    "x-oapi-codegen-extra-tags": {
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
                    "description": "Human-readable destination name.",
                    "maxLength": 255
                  },
                  "platform": {
                    "type": "string",
                    "description": "Target platform for the destination (e.g. linkedin).",
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "target": {
                    "type": "string",
                    "description": "Platform-side publishing target (page, group or channel identifier).",
                    "maxLength": 1024
                  },
                  "settings": {
                    "type": "object",
                    "description": "Destination settings, stored as a JSON blob.",
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    },
                    "x-go-type-skip-optional-pointer": true
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Blowhorn destination saved",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Blowhorn Destination Schema",
                  "description": "Server-returned Blowhorn destination as persisted by meshery-cloud. A\ndestination names where an organization publishes on a platform. An\nenvironment reference may be attached later; destinations do not carry\none in this version.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "platform",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Server-generated Blowhorn destination ID.",
                      "x-order": 1,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "organizationId": {
                      "description": "Owning organization ID. Derived from the authenticated session, never client-settable.",
                      "x-go-name": "OrganizationID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "organization_id"
                      },
                      "x-order": 2,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "name": {
                      "type": "string",
                      "description": "Human-readable destination name.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      },
                      "x-order": 3
                    },
                    "platform": {
                      "type": "string",
                      "description": "Target platform for the destination (e.g. linkedin).",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "platform"
                      },
                      "x-order": 4
                    },
                    "target": {
                      "type": "string",
                      "description": "Platform-side publishing target (page, group or channel identifier).",
                      "maxLength": 1024,
                      "x-oapi-codegen-extra-tags": {
                        "db": "target"
                      },
                      "x-order": 5
                    },
                    "settings": {
                      "type": "object",
                      "description": "Destination settings, stored as a JSON blob.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "settings"
                      },
                      "x-order": 6
                    },
                    "createdAt": {
                      "description": "Timestamp of Blowhorn destination creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 7,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last Blowhorn destination modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 8,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the Blowhorn destination was soft-deleted.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deletedAt,omitempty"
                      },
                      "x-order": 9
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
    "/api/blowhorn/destinations/{blowhornDestinationId}": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "blowhornDestinations"
        ],
        "summary": "Get Blowhorn destination by ID",
        "operationId": "getBlowhornDestination",
        "parameters": [
          {
            "name": "blowhornDestinationId",
            "in": "path",
            "description": "Blowhorn destination ID",
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
            "description": "Blowhorn destination response",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Blowhorn Destination Schema",
                  "description": "Server-returned Blowhorn destination as persisted by meshery-cloud. A\ndestination names where an organization publishes on a platform. An\nenvironment reference may be attached later; destinations do not carry\none in this version.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "platform",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Server-generated Blowhorn destination ID.",
                      "x-order": 1,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "organizationId": {
                      "description": "Owning organization ID. Derived from the authenticated session, never client-settable.",
                      "x-go-name": "OrganizationID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "organization_id"
                      },
                      "x-order": 2,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "name": {
                      "type": "string",
                      "description": "Human-readable destination name.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      },
                      "x-order": 3
                    },
                    "platform": {
                      "type": "string",
                      "description": "Target platform for the destination (e.g. linkedin).",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "platform"
                      },
                      "x-order": 4
                    },
                    "target": {
                      "type": "string",
                      "description": "Platform-side publishing target (page, group or channel identifier).",
                      "maxLength": 1024,
                      "x-oapi-codegen-extra-tags": {
                        "db": "target"
                      },
                      "x-order": 5
                    },
                    "settings": {
                      "type": "object",
                      "description": "Destination settings, stored as a JSON blob.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "settings"
                      },
                      "x-order": 6
                    },
                    "createdAt": {
                      "description": "Timestamp of Blowhorn destination creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 7,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last Blowhorn destination modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 8,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the Blowhorn destination was soft-deleted.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deletedAt,omitempty"
                      },
                      "x-order": 9
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
    "securitySchemes": {
      "jwt": {
        "type": "http",
        "scheme": "Bearer [REDACTED]",
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
      "blowhornDestinationId": {
        "name": "blowhornDestinationId",
        "in": "path",
        "description": "Blowhorn destination ID",
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
          "type": "integer",
          "minimum": 0
        }
      },
      "pageSize": {
        "name": "pageSize",
        "in": "query",
        "description": "Number of items per page (canonical camelCase form).",
        "schema": {
          "type": "integer",
          "minimum": 1
        }
      },
      "pagesize": {
        "name": "pagesize",
        "in": "query",
        "description": "Number of items per page. Deprecated alias of pageSize;\ncanonical `pageSize` wins when both are present.\n",
        "deprecated": true,
        "schema": {
          "type": "integer",
          "minimum": 1
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
      "BlowhornDestination": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Blowhorn Destination Schema",
        "description": "Server-returned Blowhorn destination as persisted by meshery-cloud. A\ndestination names where an organization publishes on a platform. An\nenvironment reference may be attached later; destinations do not carry\none in this version.\n",
        "type": "object",
        "additionalProperties": false,
        "required": [
          "id",
          "organizationId",
          "platform",
          "createdAt",
          "updatedAt"
        ],
        "properties": {
          "id": {
            "description": "Server-generated Blowhorn destination ID.",
            "x-order": 1,
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "organizationId": {
            "description": "Owning organization ID. Derived from the authenticated session, never client-settable.",
            "x-go-name": "OrganizationID",
            "x-oapi-codegen-extra-tags": {
              "db": "organization_id"
            },
            "x-order": 2,
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "name": {
            "type": "string",
            "description": "Human-readable destination name.",
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "name"
            },
            "x-order": 3
          },
          "platform": {
            "type": "string",
            "description": "Target platform for the destination (e.g. linkedin).",
            "minLength": 1,
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "platform"
            },
            "x-order": 4
          },
          "target": {
            "type": "string",
            "description": "Platform-side publishing target (page, group or channel identifier).",
            "maxLength": 1024,
            "x-oapi-codegen-extra-tags": {
              "db": "target"
            },
            "x-order": 5
          },
          "settings": {
            "type": "object",
            "description": "Destination settings, stored as a JSON blob.",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "settings"
            },
            "x-order": 6
          },
          "createdAt": {
            "description": "Timestamp of Blowhorn destination creation.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at"
            },
            "x-order": 7,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp of last Blowhorn destination modification.",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at"
            },
            "x-order": 8,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deletedAt": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the Blowhorn destination was soft-deleted.",
            "nullable": true,
            "x-go-type": "core.NullTime",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at",
              "json": "deletedAt,omitempty"
            },
            "x-order": 9
          }
        }
      },
      "BlowhornDestinationPayload": {
        "type": "object",
        "description": "Payload for creating or updating a Blowhorn destination. Contains\nonly client-settable fields; the owning `organizationId` (derived\nfrom the authenticated session) and the server-generated\n`createdAt` / `updatedAt` timestamps are intentionally excluded.\n",
        "required": [
          "platform"
        ],
        "properties": {
          "id": {
            "description": "Existing Blowhorn destination ID for updates; omit on create.",
            "x-oapi-codegen-extra-tags": {
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
            "description": "Human-readable destination name.",
            "maxLength": 255
          },
          "platform": {
            "type": "string",
            "description": "Target platform for the destination (e.g. linkedin).",
            "minLength": 1,
            "maxLength": 255
          },
          "target": {
            "type": "string",
            "description": "Platform-side publishing target (page, group or channel identifier).",
            "maxLength": 1024
          },
          "settings": {
            "type": "object",
            "description": "Destination settings, stored as a JSON blob.",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "BlowhornDestinationPage": {
        "type": "object",
        "description": "Paginated collection of Blowhorn destinations.",
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
          "blowhornDestinations": {
            "type": "array",
            "items": {
              "x-go-type": "BlowhornDestination",
              "$schema": "http://json-schema.org/draft-07/schema#",
              "title": "Blowhorn Destination Schema",
              "description": "Server-returned Blowhorn destination as persisted by meshery-cloud. A\ndestination names where an organization publishes on a platform. An\nenvironment reference may be attached later; destinations do not carry\none in this version.\n",
              "type": "object",
              "additionalProperties": false,
              "required": [
                "id",
                "organizationId",
                "platform",
                "createdAt",
                "updatedAt"
              ],
              "properties": {
                "id": {
                  "description": "Server-generated Blowhorn destination ID.",
                  "x-order": 1,
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "organizationId": {
                  "description": "Owning organization ID. Derived from the authenticated session, never client-settable.",
                  "x-go-name": "OrganizationID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "organization_id"
                  },
                  "x-order": 2,
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "name": {
                  "type": "string",
                  "description": "Human-readable destination name.",
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "name"
                  },
                  "x-order": 3
                },
                "platform": {
                  "type": "string",
                  "description": "Target platform for the destination (e.g. linkedin).",
                  "minLength": 1,
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "platform"
                  },
                  "x-order": 4
                },
                "target": {
                  "type": "string",
                  "description": "Platform-side publishing target (page, group or channel identifier).",
                  "maxLength": 1024,
                  "x-oapi-codegen-extra-tags": {
                    "db": "target"
                  },
                  "x-order": 5
                },
                "settings": {
                  "type": "object",
                  "description": "Destination settings, stored as a JSON blob.",
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "settings"
                  },
                  "x-order": 6
                },
                "createdAt": {
                  "description": "Timestamp of Blowhorn destination creation.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at"
                  },
                  "x-order": 7,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updatedAt": {
                  "description": "Timestamp of last Blowhorn destination modification.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at"
                  },
                  "x-order": 8,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "deletedAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Timestamp when the Blowhorn destination was soft-deleted.",
                  "nullable": true,
                  "x-go-type": "core.NullTime",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "deleted_at",
                    "json": "deletedAt,omitempty"
                  },
                  "x-order": 9
                }
              }
            },
            "description": "Blowhorn destinations included on this page of results."
          }
        }
      }
    }
  }
};

export default BlowhornDestinationSchema;
