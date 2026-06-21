/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const EventSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Events",
    "description": "OpenAPI schema for Meshery events and system notifications.",
    "x-deprecated": true,
    "x-superseded-by": "v1beta2",
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
  "tags": [
    {
      "name": "events",
      "description": "APIs for Meshery Cloud events."
    }
  ],
  "paths": {
    "/events/{id}": {
      "delete": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "events"
        ],
        "summary": "Delete a single event",
        "parameters": [
          {
            "in": "path",
            "name": "id",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            },
            "description": "ID of the event to delete"
          }
        ],
        "responses": {
          "204": {
            "description": "Event deleted"
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
    "/events": {
      "post": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "events"
        ],
        "summary": "Create a new event",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Event created"
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
    "/events/delete": {
      "post": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "events"
        ],
        "summary": "Bulk delete events",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "ids"
                ],
                "properties": {
                  "ids": {
                    "type": "array",
                    "items": {
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
        },
        "responses": {
          "200": {
            "description": "event deleted",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "deleted": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid"
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
    "/events/status": {
      "put": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "events"
        ],
        "summary": "Bulk update event status",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "ids",
                  "status"
                ],
                "properties": {
                  "ids": {
                    "type": "array",
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
                  "status": {
                    "type": "string",
                    "example": "failed"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Events updated",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "updated": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid"
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
    "/events/{id}/status": {
      "put": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "events"
        ],
        "summary": "Update status of a single event",
        "parameters": [
          {
            "in": "path",
            "name": "id",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            },
            "description": "ID of the event"
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "status"
                ],
                "properties": {
                  "status": {
                    "type": "string",
                    "example": "completed"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Event status updated",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "event_id": {
                      "type": "string",
                      "format": "uuid"
                    },
                    "status": {
                      "type": "string"
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
    "/api/workspaces/{workspaceId}/events": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "events"
        ],
        "security": [
          {
            "jwt": []
          }
        ],
        "operationId": "getEventsOfWorkspace",
        "summary": "Get workspace events",
        "description": "Gets events for a workspace.",
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
              "x-oapi-codegen-extra-tags": {
                "db": "workspace_id",
                "json": "workspace_id"
              },
              "x-go-type-name": "WorkspaceId",
              "x-go-type-skip-optional-pointer": true
            },
            "required": true
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
          }
        ],
        "responses": {
          "200": {
            "description": "Workspace events",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
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
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "user_id": {
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "user_id",
                              "json": "user_id"
                            },
                            "x-go-name": "UserID",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "system_id": {
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "system_id"
                            },
                            "x-go-name": "SystemID",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "category": {
                            "type": "string"
                          },
                          "action": {
                            "type": "string"
                          },
                          "description": {
                            "type": "string"
                          },
                          "firstName": {
                            "type": "string"
                          },
                          "lastName": {
                            "type": "string"
                          },
                          "email": {
                            "type": "string",
                            "format": "email",
                            "description": "email",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "provider": {
                            "type": "string",
                            "description": "One of (x-oapi-codegen-extra-tags-cloud, github, google)",
                            "x-go-type-skip-optional-pointer": true
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
            "description": "Invalid request",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          },
          "404": {
            "description": "Workspace not found"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/api/events": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "events"
        ],
        "operationId": "getEventsAggregate",
        "summary": "Get events aggregate summary",
        "parameters": [
          {
            "name": "cumulative",
            "in": "query",
            "required": false,
            "schema": {
              "type": "boolean"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Events aggregate",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "audit": {
                      "type": "integer"
                    }
                  },
                  "additionalProperties": true
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          },
          "404": {
            "description": "Not found"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/api/events/list": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "events"
        ],
        "operationId": "getEvents",
        "summary": "Get events list",
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
            "description": "Events page",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
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
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "user_id": {
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "user_id",
                              "json": "user_id"
                            },
                            "x-go-name": "UserID",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "system_id": {
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "system_id"
                            },
                            "x-go-name": "SystemID",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "category": {
                            "type": "string"
                          },
                          "action": {
                            "type": "string"
                          },
                          "description": {
                            "type": "string"
                          },
                          "firstName": {
                            "type": "string"
                          },
                          "lastName": {
                            "type": "string"
                          },
                          "email": {
                            "type": "string",
                            "format": "email",
                            "description": "email",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "provider": {
                            "type": "string",
                            "description": "One of (x-oapi-codegen-extra-tags-cloud, github, google)",
                            "x-go-type-skip-optional-pointer": true
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
            "description": "Unauthorized"
          },
          "404": {
            "description": "Not found"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/api/events/summary": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "events"
        ],
        "operationId": "getEventSummaryByUser",
        "summary": "Get event summary by user",
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
            "description": "Event summary page",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
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
                        "additionalProperties": true
                      }
                    }
                  }
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          },
          "404": {
            "description": "Not found"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/api/events/types": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "events"
        ],
        "operationId": "getEventTypes",
        "summary": "Get event types",
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
          }
        ],
        "responses": {
          "200": {
            "description": "Event types",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "category": {
                        "type": "string"
                      },
                      "action": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized"
          },
          "404": {
            "description": "Not found"
          },
          "500": {
            "description": "Server error"
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
          "x-oapi-codegen-extra-tags": {
            "db": "workspace_id",
            "json": "workspace_id"
          },
          "x-go-type-name": "WorkspaceId",
          "x-go-type-skip-optional-pointer": true
        },
        "required": true
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
      "cumulative": {
        "name": "cumulative",
        "in": "query",
        "required": false,
        "schema": {
          "type": "boolean"
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
      "eventsFilter": {
        "name": "filter",
        "in": "query",
        "description": "Get filtered reponses",
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
      "UpdateEventStatusRequest": {
        "type": "object",
        "required": [
          "status"
        ],
        "properties": {
          "status": {
            "type": "string",
            "example": "completed"
          }
        }
      },
      "BulkDeleteRequest": {
        "type": "object",
        "required": [
          "ids"
        ],
        "properties": {
          "ids": {
            "type": "array",
            "items": {
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
      },
      "BulkUpdateStatusRequest": {
        "type": "object",
        "required": [
          "ids",
          "status"
        ],
        "properties": {
          "ids": {
            "type": "array",
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
          "status": {
            "type": "string",
            "example": "failed"
          }
        }
      },
      "EventResult": {
        "type": "object",
        "properties": {
          "user_id": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "user_id",
              "json": "user_id"
            },
            "x-go-name": "UserID",
            "x-go-type-skip-optional-pointer": true
          },
          "system_id": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "system_id"
            },
            "x-go-name": "SystemID",
            "x-go-type-skip-optional-pointer": true
          },
          "category": {
            "type": "string"
          },
          "action": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "firstName": {
            "type": "string"
          },
          "lastName": {
            "type": "string"
          },
          "email": {
            "type": "string",
            "format": "email",
            "description": "email",
            "x-go-type-skip-optional-pointer": true
          },
          "provider": {
            "type": "string",
            "description": "One of (x-oapi-codegen-extra-tags-cloud, github, google)",
            "x-go-type-skip-optional-pointer": true
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
          }
        }
      },
      "EventsPage": {
        "type": "object",
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
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "user_id": {
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "user_id",
                    "json": "user_id"
                  },
                  "x-go-name": "UserID",
                  "x-go-type-skip-optional-pointer": true
                },
                "system_id": {
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "system_id"
                  },
                  "x-go-name": "SystemID",
                  "x-go-type-skip-optional-pointer": true
                },
                "category": {
                  "type": "string"
                },
                "action": {
                  "type": "string"
                },
                "description": {
                  "type": "string"
                },
                "firstName": {
                  "type": "string"
                },
                "lastName": {
                  "type": "string"
                },
                "email": {
                  "type": "string",
                  "format": "email",
                  "description": "email",
                  "x-go-type-skip-optional-pointer": true
                },
                "provider": {
                  "type": "string",
                  "description": "One of (x-oapi-codegen-extra-tags-cloud, github, google)",
                  "x-go-type-skip-optional-pointer": true
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
                }
              }
            }
          }
        }
      },
      "EventsAggregate": {
        "type": "object",
        "properties": {
          "audit": {
            "type": "integer"
          }
        },
        "additionalProperties": true
      },
      "EventSummary": {
        "type": "object",
        "additionalProperties": true
      },
      "EventSummaryPage": {
        "type": "object",
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
              "additionalProperties": true
            }
          }
        }
      },
      "EventType": {
        "type": "object",
        "properties": {
          "category": {
            "type": "string"
          },
          "action": {
            "type": "string"
          }
        }
      },
      "ErrorResponse": {
        "type": "object",
        "properties": {
          "error": {
            "type": "string"
          }
        }
      }
    }
  }
};

export default EventSchema;
