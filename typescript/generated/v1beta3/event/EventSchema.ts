/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const EventSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Events",
    "description": "OpenAPI schema for Meshery events and system notifications.",
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
  "tags": [
    {
      "name": "events",
      "description": "APIs for Meshery Cloud events."
    }
  ],
  "paths": {
    "/api/events/{eventId}": {
      "delete": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "events"
        ],
        "operationId": "deleteEvent",
        "summary": "Delete a single event",
        "parameters": [
          {
            "name": "eventId",
            "in": "path",
            "description": "ID of the event.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
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
    "/api/events/delete": {
      "post": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "events"
        ],
        "operationId": "bulkDeleteEvents",
        "summary": "Bulk delete events",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for bulk-deleting events by ID.",
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
                    },
                    "description": "UUIDs of the events to delete."
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Events deleted",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Response body returned after bulk event deletion.",
                  "properties": {
                    "deleted": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid"
                      },
                      "description": "UUIDs of events that were deleted."
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
    "/api/events/status": {
      "put": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "events"
        ],
        "operationId": "bulkUpdateEventStatus",
        "summary": "Bulk update event status",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for bulk-updating the status of events.",
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
                    },
                    "description": "UUIDs of the events to update."
                  },
                  "status": {
                    "type": "string",
                    "example": "failed",
                    "description": "New status to apply to the selected events.",
                    "maxLength": 255
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
                  "description": "Response body returned after bulk event status update.",
                  "properties": {
                    "updated": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid"
                      },
                      "description": "UUIDs of events whose status was updated."
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
    "/api/events/{eventId}/status": {
      "put": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "events"
        ],
        "operationId": "updateEventStatus",
        "summary": "Update status of a single event",
        "parameters": [
          {
            "name": "eventId",
            "in": "path",
            "description": "ID of the event.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for updating the status of a single event.",
                "required": [
                  "status"
                ],
                "properties": {
                  "status": {
                    "type": "string",
                    "example": "completed",
                    "description": "Current status of the event.",
                    "maxLength": 255
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
                  "description": "Response body returned after updating an event's status.",
                  "properties": {
                    "message": {
                      "type": "string",
                      "description": "Human-readable status message.",
                      "maxLength": 500
                    },
                    "eventId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "UUID of the event whose status was updated.",
                      "x-oapi-codegen-extra-tags": {
                        "json": "eventId,omitempty"
                      }
                    },
                    "status": {
                      "type": "string",
                      "description": "Updated status of the event.",
                      "maxLength": 255
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
                "json": "workspaceId"
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
              "type": "integer",
              "minimum": 0
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "description": "Number of responses to return per page. Canonical camelCase pagination parameter; prefer this over the deprecated all-lowercase `pagesize`.",
            "schema": {
              "type": "integer",
              "minimum": 1
            }
          },
          {
            "name": "pagesize",
            "in": "query",
            "description": "Get responses by pagesize. Deprecated alias of pageSize.",
            "deprecated": true,
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
          }
        ],
        "responses": {
          "200": {
            "description": "Workspace events",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated list of events.",
                  "properties": {
                    "page": {
                      "description": "Zero-based page index returned in this response.",
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "pageSize": {
                      "description": "Maximum number of items returned on each page.",
                      "minimum": 1,
                      "x-oapi-codegen-extra-tags": {
                        "json": "pageSize,omitempty"
                      },
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "totalCount": {
                      "description": "Total number of items across all pages.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "json": "totalCount,omitempty"
                      },
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "additionalProperties": false,
                        "description": "EventResult entity schema.",
                        "properties": {
                          "owner": {
                            "type": "string",
                            "format": "uuid",
                            "description": "UUID of the user associated with the event.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-go-name": "Owner",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "owner",
                              "json": "owner"
                            }
                          },
                          "systemId": {
                            "type": "string",
                            "description": "System identifier of the event source.",
                            "maxLength": 255,
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "system_id",
                              "json": "systemId"
                            }
                          },
                          "category": {
                            "type": "string",
                            "description": "The category of the event.",
                            "maxLength": 500
                          },
                          "action": {
                            "type": "string",
                            "description": "The action of the event.",
                            "maxLength": 500
                          },
                          "description": {
                            "type": "string",
                            "description": "Description of the event.",
                            "maxLength": 5000
                          },
                          "firstName": {
                            "type": "string",
                            "description": "The first name of the user associated with the event.",
                            "maxLength": 500
                          },
                          "lastName": {
                            "type": "string",
                            "description": "The last name of the user associated with the event.",
                            "maxLength": 500
                          },
                          "email": {
                            "description": "Email address of the user associated with the event.",
                            "type": "string",
                            "format": "email",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "provider": {
                            "description": "Authentication provider of the user associated with the event.",
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "createdAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the event was recorded.",
                            "x-go-type": "time.Time",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "json": "createdAt"
                            }
                          }
                        },
                        "required": [
                          "owner",
                          "category",
                          "action"
                        ]
                      },
                      "description": "The events returned on the current page."
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
                  "description": "Generic error envelope returned for non-2xx responses.",
                  "properties": {
                    "error": {
                      "type": "string",
                      "description": "Human-readable error message.",
                      "maxLength": 500
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
            "description": "When true, return cumulative aggregate counts across all time.",
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
                  "description": "Aggregated event counts across categories.",
                  "properties": {
                    "audit": {
                      "type": "integer",
                      "description": "Count of audit-category events.",
                      "minimum": 0
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
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A MeshKit error answered as a JSON body. `error` is the sentence the caller is shown; MeshKit's long description is never serialized. Use the `MeshkitError400`, `MeshkitError403`, `MeshkitError404`, `MeshkitError409`, `MeshkitError500` and `MeshkitError502` responses for an operation whose server answers its refusals this way.",
                  "required": [
                    "error"
                  ],
                  "additionalProperties": false,
                  "properties": {
                    "error": {
                      "type": "string",
                      "minLength": 1,
                      "description": "The sentence the caller is shown."
                    },
                    "code": {
                      "type": "string",
                      "minLength": 1,
                      "description": "MeshKit error code, a component-scoped identifier allocated by the emitting service (e.g. `<component>-<number>`); it is not a stable part of this contract. Omitted for an error that is not a MeshKit error."
                    },
                    "severity": {
                      "type": "string",
                      "description": "MeshKit severity name. Omitted when MeshKit reports none.",
                      "enum": [
                        "emergency",
                        "alert",
                        "critical",
                        "fatal"
                      ]
                    },
                    "probableCause": {
                      "type": "array",
                      "description": "MeshKit's probable causes of the error.",
                      "items": {
                        "type": "string"
                      }
                    },
                    "suggestedRemediation": {
                      "type": "array",
                      "description": "MeshKit's suggested remediations for the error.",
                      "items": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "Not found - the caller is not a provider-wide Provider Admin",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "500": {
            "description": "Server error"
          }
        }
      },
      "post": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "events"
        ],
        "operationId": "createEvent",
        "summary": "Create a new event",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for creating a new event.",
                "additionalProperties": true,
                "properties": {
                  "owner": {
                    "type": "string",
                    "format": "uuid",
                    "description": "UUID of the user associated with the event.",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    },
                    "x-go-name": "Owner",
                    "x-oapi-codegen-extra-tags": {
                      "db": "owner",
                      "json": "owner,omitempty"
                    }
                  },
                  "category": {
                    "type": "string",
                    "description": "The category of the event.",
                    "maxLength": 500
                  },
                  "action": {
                    "type": "string",
                    "description": "The action of the event.",
                    "maxLength": 500
                  },
                  "description": {
                    "type": "string",
                    "description": "Description of the event.",
                    "maxLength": 5000
                  },
                  "idempotencyKey": {
                    "type": "string",
                    "description": "Optional client-chosen key that makes recording this event safe to retry. Keys are scoped to the authenticated caller (organization and user), never to the client-settable `owner` field, so `owner` may be omitted without affecting deduplication. The first event a caller records with a key is kept, and a later create with the same key records nothing and answers 200 with that event, whatever the rest of the payload says. Use a value that names the occurrence, for example a run id, so a client replaying a local queue after a timeout never records a duplicate. Omit it for events that need no deduplication.\n",
                    "minLength": 1,
                    "maxLength": 255,
                    "x-oapi-codegen-extra-tags": {
                      "json": "idempotencyKey,omitempty"
                    }
                  }
                }
              }
            }
          }
        },
        "description": "Records an event and answers 201 with it. When the payload carries an `idempotencyKey` the authenticated caller already used, nothing new is recorded and the answer is 200 with the event first recorded under that key.\n",
        "responses": {
          "200": {
            "description": "An event with this `idempotencyKey` was already recorded by the same caller; it is returned unchanged and no new event is recorded.\n",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "One recorded event (an `event_trackers` row) in the wire form MeshKit's `models/events.Event` serializes. Meshery Cloud returns these, for example, as the per-path failure records of a GitHub repository import (`importGithubRepository`, `errors`). Unlike EventResult, it carries no joined user profile fields.\n",
                  "required": [
                    "id",
                    "actedUpon",
                    "action",
                    "category",
                    "description",
                    "metadata",
                    "operationId",
                    "severity",
                    "status",
                    "systemId",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Event ID.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "actedUpon": {
                      "description": "ID of the entity on which the event was performed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "acted_upon"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "action": {
                      "type": "string",
                      "description": "Action taken on the resource, for example `import`.",
                      "maxLength": 500,
                      "x-oapi-codegen-extra-tags": {
                        "db": "action"
                      }
                    },
                    "category": {
                      "type": "string",
                      "description": "Resource kind the operation was invoked on, for example `pattern`.",
                      "maxLength": 500,
                      "x-oapi-codegen-extra-tags": {
                        "db": "category"
                      }
                    },
                    "description": {
                      "type": "string",
                      "description": "Human-readable summary of what happened.",
                      "maxLength": 5000,
                      "x-oapi-codegen-extra-tags": {
                        "db": "description"
                      }
                    },
                    "metadata": {
                      "type": "object",
                      "description": "Event-specific details; the structure varies by event kind. `null` when the producer attached none.\n",
                      "additionalProperties": true,
                      "nullable": true,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata"
                      }
                    },
                    "operationId": {
                      "description": "ID correlating the events one operation emitted.",
                      "x-go-name": "OperationID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "operation_id"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "severity": {
                      "type": "string",
                      "description": "Event level. MeshKit's producers set one of `emergency`, `alert`, `critical`, `error`, `warning`, `informational`, `debug` or `success`. The set is not closed on the wire - the event write APIs persist the value they are given - so consumers must tolerate other values.\n",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "severity"
                      }
                    },
                    "status": {
                      "type": "string",
                      "description": "Read state of the event. MeshKit records new events as `unread`, and acknowledged ones become `read`; the event status APIs persist any value they are given, so consumers must tolerate other values.\n",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      }
                    },
                    "systemId": {
                      "description": "ID of the system instance that emitted the event.",
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
                    "owner": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner"
                      }
                    },
                    "createdAt": {
                      "description": "Timestamp when the event was recorded.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp when the event was last updated.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "description": "Timestamp when the event was soft-deleted; omitted when it was not.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at"
                      },
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
          },
          "201": {
            "description": "Event created",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "One recorded event (an `event_trackers` row) in the wire form MeshKit's `models/events.Event` serializes. Meshery Cloud returns these, for example, as the per-path failure records of a GitHub repository import (`importGithubRepository`, `errors`). Unlike EventResult, it carries no joined user profile fields.\n",
                  "required": [
                    "id",
                    "actedUpon",
                    "action",
                    "category",
                    "description",
                    "metadata",
                    "operationId",
                    "severity",
                    "status",
                    "systemId",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Event ID.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "actedUpon": {
                      "description": "ID of the entity on which the event was performed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "acted_upon"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "action": {
                      "type": "string",
                      "description": "Action taken on the resource, for example `import`.",
                      "maxLength": 500,
                      "x-oapi-codegen-extra-tags": {
                        "db": "action"
                      }
                    },
                    "category": {
                      "type": "string",
                      "description": "Resource kind the operation was invoked on, for example `pattern`.",
                      "maxLength": 500,
                      "x-oapi-codegen-extra-tags": {
                        "db": "category"
                      }
                    },
                    "description": {
                      "type": "string",
                      "description": "Human-readable summary of what happened.",
                      "maxLength": 5000,
                      "x-oapi-codegen-extra-tags": {
                        "db": "description"
                      }
                    },
                    "metadata": {
                      "type": "object",
                      "description": "Event-specific details; the structure varies by event kind. `null` when the producer attached none.\n",
                      "additionalProperties": true,
                      "nullable": true,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata"
                      }
                    },
                    "operationId": {
                      "description": "ID correlating the events one operation emitted.",
                      "x-go-name": "OperationID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "operation_id"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "severity": {
                      "type": "string",
                      "description": "Event level. MeshKit's producers set one of `emergency`, `alert`, `critical`, `error`, `warning`, `informational`, `debug` or `success`. The set is not closed on the wire - the event write APIs persist the value they are given - so consumers must tolerate other values.\n",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "severity"
                      }
                    },
                    "status": {
                      "type": "string",
                      "description": "Read state of the event. MeshKit records new events as `unread`, and acknowledged ones become `read`; the event status APIs persist any value they are given, so consumers must tolerate other values.\n",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      }
                    },
                    "systemId": {
                      "description": "ID of the system instance that emitted the event.",
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
                    "owner": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner"
                      }
                    },
                    "createdAt": {
                      "description": "Timestamp when the event was recorded.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp when the event was last updated.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "description": "Timestamp when the event was soft-deleted; omitted when it was not.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at"
                      },
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
              "type": "integer",
              "minimum": 0
            }
          },
          {
            "name": "pagesize",
            "in": "query",
            "description": "Get responses by pagesize",
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
          }
        ],
        "responses": {
          "200": {
            "description": "Events page",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated list of events.",
                  "properties": {
                    "page": {
                      "description": "Zero-based page index returned in this response.",
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "pageSize": {
                      "description": "Maximum number of items returned on each page.",
                      "minimum": 1,
                      "x-oapi-codegen-extra-tags": {
                        "json": "pageSize,omitempty"
                      },
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "totalCount": {
                      "description": "Total number of items across all pages.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "json": "totalCount,omitempty"
                      },
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "additionalProperties": false,
                        "description": "EventResult entity schema.",
                        "properties": {
                          "owner": {
                            "type": "string",
                            "format": "uuid",
                            "description": "UUID of the user associated with the event.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-go-name": "Owner",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "owner",
                              "json": "owner"
                            }
                          },
                          "systemId": {
                            "type": "string",
                            "description": "System identifier of the event source.",
                            "maxLength": 255,
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "system_id",
                              "json": "systemId"
                            }
                          },
                          "category": {
                            "type": "string",
                            "description": "The category of the event.",
                            "maxLength": 500
                          },
                          "action": {
                            "type": "string",
                            "description": "The action of the event.",
                            "maxLength": 500
                          },
                          "description": {
                            "type": "string",
                            "description": "Description of the event.",
                            "maxLength": 5000
                          },
                          "firstName": {
                            "type": "string",
                            "description": "The first name of the user associated with the event.",
                            "maxLength": 500
                          },
                          "lastName": {
                            "type": "string",
                            "description": "The last name of the user associated with the event.",
                            "maxLength": 500
                          },
                          "email": {
                            "description": "Email address of the user associated with the event.",
                            "type": "string",
                            "format": "email",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "provider": {
                            "description": "Authentication provider of the user associated with the event.",
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "createdAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the event was recorded.",
                            "x-go-type": "time.Time",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "json": "createdAt"
                            }
                          }
                        },
                        "required": [
                          "owner",
                          "category",
                          "action"
                        ]
                      },
                      "description": "The events returned on the current page."
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
              "type": "integer",
              "minimum": 0
            }
          },
          {
            "name": "pagesize",
            "in": "query",
            "description": "Get responses by pagesize",
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
          }
        ],
        "responses": {
          "200": {
            "description": "Event summary page",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated list of per-user event summaries.",
                  "properties": {
                    "page": {
                      "type": "integer",
                      "description": "Current page number of the result set.",
                      "minimum": 0
                    },
                    "pageSize": {
                      "type": "integer",
                      "description": "Number of items per page.",
                      "minimum": 1,
                      "x-oapi-codegen-extra-tags": {
                        "json": "pageSize,omitempty"
                      }
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of items available.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "json": "totalCount,omitempty"
                      }
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "description": "Per-user event summary entry.",
                        "additionalProperties": true
                      },
                      "description": "The event summaries returned on the current page."
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
              "type": "integer",
              "minimum": 0
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "description": "Number of responses to return per page. Canonical camelCase pagination parameter; prefer this over the deprecated all-lowercase `pagesize`.",
            "schema": {
              "type": "integer",
              "minimum": 1
            }
          },
          {
            "name": "pagesize",
            "in": "query",
            "description": "Get responses by pagesize. Deprecated alias of pageSize.",
            "deprecated": true,
            "schema": {
              "type": "integer"
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
                    "description": "A category/action pair describing one kind of event.",
                    "properties": {
                      "category": {
                        "type": "string",
                        "description": "The category of the event type.",
                        "maxLength": 500
                      },
                      "action": {
                        "type": "string",
                        "description": "The action of the event type.",
                        "maxLength": 500
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
      },
      "MeshkitError403": {
        "description": "Forbidden",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "description": "A MeshKit error answered as a JSON body. `error` is the sentence the caller is shown; MeshKit's long description is never serialized. Use the `MeshkitError400`, `MeshkitError403`, `MeshkitError404`, `MeshkitError409`, `MeshkitError500` and `MeshkitError502` responses for an operation whose server answers its refusals this way.",
              "required": [
                "error"
              ],
              "additionalProperties": false,
              "properties": {
                "error": {
                  "type": "string",
                  "minLength": 1,
                  "description": "The sentence the caller is shown."
                },
                "code": {
                  "type": "string",
                  "minLength": 1,
                  "description": "MeshKit error code, a component-scoped identifier allocated by the emitting service (e.g. `<component>-<number>`); it is not a stable part of this contract. Omitted for an error that is not a MeshKit error."
                },
                "severity": {
                  "type": "string",
                  "description": "MeshKit severity name. Omitted when MeshKit reports none.",
                  "enum": [
                    "emergency",
                    "alert",
                    "critical",
                    "fatal"
                  ]
                },
                "probableCause": {
                  "type": "array",
                  "description": "MeshKit's probable causes of the error.",
                  "items": {
                    "type": "string"
                  }
                },
                "suggestedRemediation": {
                  "type": "array",
                  "description": "MeshKit's suggested remediations for the error.",
                  "items": {
                    "type": "string"
                  }
                }
              }
            }
          }
        }
      }
    },
    "parameters": {
      "eventId": {
        "name": "eventId",
        "in": "path",
        "description": "ID of the event.",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      },
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
            "json": "workspaceId"
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
          "type": "integer",
          "minimum": 0
        }
      },
      "pageSize": {
        "name": "pageSize",
        "in": "query",
        "description": "Number of responses to return per page. Canonical camelCase pagination parameter; prefer this over the deprecated all-lowercase `pagesize`.",
        "schema": {
          "type": "integer",
          "minimum": 1
        }
      },
      "pagesize": {
        "name": "pagesize",
        "in": "query",
        "description": "Get responses by pagesize",
        "schema": {
          "type": "integer"
        }
      },
      "pagesizeLegacy": {
        "name": "pagesize",
        "in": "query",
        "description": "Get responses by pagesize. Deprecated alias of pageSize.",
        "deprecated": true,
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
      "cumulative": {
        "name": "cumulative",
        "in": "query",
        "description": "When true, return cumulative aggregate counts across all time.",
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
      "EventPayload": {
        "type": "object",
        "description": "Payload for creating a new event.",
        "additionalProperties": true,
        "properties": {
          "owner": {
            "type": "string",
            "format": "uuid",
            "description": "UUID of the user associated with the event.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-name": "Owner",
            "x-oapi-codegen-extra-tags": {
              "db": "owner",
              "json": "owner,omitempty"
            }
          },
          "category": {
            "type": "string",
            "description": "The category of the event.",
            "maxLength": 500
          },
          "action": {
            "type": "string",
            "description": "The action of the event.",
            "maxLength": 500
          },
          "description": {
            "type": "string",
            "description": "Description of the event.",
            "maxLength": 5000
          },
          "idempotencyKey": {
            "type": "string",
            "description": "Optional client-chosen key that makes recording this event safe to retry. Keys are scoped to the authenticated caller (organization and user), never to the client-settable `owner` field, so `owner` may be omitted without affecting deduplication. The first event a caller records with a key is kept, and a later create with the same key records nothing and answers 200 with that event, whatever the rest of the payload says. Use a value that names the occurrence, for example a run id, so a client replaying a local queue after a timeout never records a duplicate. Omit it for events that need no deduplication.\n",
            "minLength": 1,
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "json": "idempotencyKey,omitempty"
            }
          }
        }
      },
      "UpdateEventStatusRequest": {
        "type": "object",
        "description": "Payload for updating the status of a single event.",
        "required": [
          "status"
        ],
        "properties": {
          "status": {
            "type": "string",
            "example": "completed",
            "description": "Current status of the event.",
            "maxLength": 255
          }
        }
      },
      "UpdateEventStatusResponse": {
        "type": "object",
        "description": "Response body returned after updating an event's status.",
        "properties": {
          "message": {
            "type": "string",
            "description": "Human-readable status message.",
            "maxLength": 500
          },
          "eventId": {
            "type": "string",
            "format": "uuid",
            "description": "UUID of the event whose status was updated.",
            "x-oapi-codegen-extra-tags": {
              "json": "eventId,omitempty"
            }
          },
          "status": {
            "type": "string",
            "description": "Updated status of the event.",
            "maxLength": 255
          }
        }
      },
      "BulkDeleteRequest": {
        "type": "object",
        "description": "Payload for bulk-deleting events by ID.",
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
            },
            "description": "UUIDs of the events to delete."
          }
        }
      },
      "BulkDeleteResponse": {
        "type": "object",
        "description": "Response body returned after bulk event deletion.",
        "properties": {
          "deleted": {
            "type": "array",
            "items": {
              "type": "string",
              "format": "uuid"
            },
            "description": "UUIDs of events that were deleted."
          }
        }
      },
      "BulkUpdateStatusRequest": {
        "type": "object",
        "description": "Payload for bulk-updating the status of events.",
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
            },
            "description": "UUIDs of the events to update."
          },
          "status": {
            "type": "string",
            "example": "failed",
            "description": "New status to apply to the selected events.",
            "maxLength": 255
          }
        }
      },
      "BulkUpdateStatusResponse": {
        "type": "object",
        "description": "Response body returned after bulk event status update.",
        "properties": {
          "updated": {
            "type": "array",
            "items": {
              "type": "string",
              "format": "uuid"
            },
            "description": "UUIDs of events whose status was updated."
          }
        }
      },
      "EventResult": {
        "type": "object",
        "additionalProperties": false,
        "description": "EventResult entity schema.",
        "properties": {
          "owner": {
            "type": "string",
            "format": "uuid",
            "description": "UUID of the user associated with the event.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-name": "Owner",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "owner",
              "json": "owner"
            }
          },
          "systemId": {
            "type": "string",
            "description": "System identifier of the event source.",
            "maxLength": 255,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "system_id",
              "json": "systemId"
            }
          },
          "category": {
            "type": "string",
            "description": "The category of the event.",
            "maxLength": 500
          },
          "action": {
            "type": "string",
            "description": "The action of the event.",
            "maxLength": 500
          },
          "description": {
            "type": "string",
            "description": "Description of the event.",
            "maxLength": 5000
          },
          "firstName": {
            "type": "string",
            "description": "The first name of the user associated with the event.",
            "maxLength": 500
          },
          "lastName": {
            "type": "string",
            "description": "The last name of the user associated with the event.",
            "maxLength": 500
          },
          "email": {
            "description": "Email address of the user associated with the event.",
            "type": "string",
            "format": "email",
            "x-go-type-skip-optional-pointer": true
          },
          "provider": {
            "description": "Authentication provider of the user associated with the event.",
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "createdAt": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the event was recorded.",
            "x-go-type": "time.Time",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "created_at",
              "json": "createdAt"
            }
          }
        },
        "required": [
          "owner",
          "category",
          "action"
        ]
      },
      "Event": {
        "type": "object",
        "description": "One recorded event (an `event_trackers` row) in the wire form MeshKit's `models/events.Event` serializes. Meshery Cloud returns these, for example, as the per-path failure records of a GitHub repository import (`importGithubRepository`, `errors`). Unlike EventResult, it carries no joined user profile fields.\n",
        "required": [
          "id",
          "actedUpon",
          "action",
          "category",
          "description",
          "metadata",
          "operationId",
          "severity",
          "status",
          "systemId",
          "createdAt",
          "updatedAt"
        ],
        "properties": {
          "id": {
            "description": "Event ID.",
            "x-oapi-codegen-extra-tags": {
              "db": "id"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "actedUpon": {
            "description": "ID of the entity on which the event was performed.",
            "x-oapi-codegen-extra-tags": {
              "db": "acted_upon"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "action": {
            "type": "string",
            "description": "Action taken on the resource, for example `import`.",
            "maxLength": 500,
            "x-oapi-codegen-extra-tags": {
              "db": "action"
            }
          },
          "category": {
            "type": "string",
            "description": "Resource kind the operation was invoked on, for example `pattern`.",
            "maxLength": 500,
            "x-oapi-codegen-extra-tags": {
              "db": "category"
            }
          },
          "description": {
            "type": "string",
            "description": "Human-readable summary of what happened.",
            "maxLength": 5000,
            "x-oapi-codegen-extra-tags": {
              "db": "description"
            }
          },
          "metadata": {
            "type": "object",
            "description": "Event-specific details; the structure varies by event kind. `null` when the producer attached none.\n",
            "additionalProperties": true,
            "nullable": true,
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "metadata"
            }
          },
          "operationId": {
            "description": "ID correlating the events one operation emitted.",
            "x-go-name": "OperationID",
            "x-oapi-codegen-extra-tags": {
              "db": "operation_id"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "severity": {
            "type": "string",
            "description": "Event level. MeshKit's producers set one of `emergency`, `alert`, `critical`, `error`, `warning`, `informational`, `debug` or `success`. The set is not closed on the wire - the event write APIs persist the value they are given - so consumers must tolerate other values.\n",
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "severity"
            }
          },
          "status": {
            "type": "string",
            "description": "Read state of the event. MeshKit records new events as `unread`, and acknowledged ones become `read`; the event status APIs persist any value they are given, so consumers must tolerate other values.\n",
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "status"
            }
          },
          "systemId": {
            "description": "ID of the system instance that emitted the event.",
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
          "owner": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "owner"
            }
          },
          "createdAt": {
            "description": "Timestamp when the event was recorded.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp when the event was last updated.",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deletedAt": {
            "description": "Timestamp when the event was soft-deleted; omitted when it was not.",
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at"
            },
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
      "EventsPage": {
        "type": "object",
        "description": "Paginated list of events.",
        "properties": {
          "page": {
            "description": "Zero-based page index returned in this response.",
            "type": "integer",
            "x-go-type-skip-optional-pointer": true
          },
          "pageSize": {
            "description": "Maximum number of items returned on each page.",
            "minimum": 1,
            "x-oapi-codegen-extra-tags": {
              "json": "pageSize,omitempty"
            },
            "type": "integer",
            "x-go-type-skip-optional-pointer": true
          },
          "totalCount": {
            "description": "Total number of items across all pages.",
            "minimum": 0,
            "x-oapi-codegen-extra-tags": {
              "json": "totalCount,omitempty"
            },
            "type": "integer",
            "x-go-type-skip-optional-pointer": true
          },
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "additionalProperties": false,
              "description": "EventResult entity schema.",
              "properties": {
                "owner": {
                  "type": "string",
                  "format": "uuid",
                  "description": "UUID of the user associated with the event.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-go-name": "Owner",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "owner",
                    "json": "owner"
                  }
                },
                "systemId": {
                  "type": "string",
                  "description": "System identifier of the event source.",
                  "maxLength": 255,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "system_id",
                    "json": "systemId"
                  }
                },
                "category": {
                  "type": "string",
                  "description": "The category of the event.",
                  "maxLength": 500
                },
                "action": {
                  "type": "string",
                  "description": "The action of the event.",
                  "maxLength": 500
                },
                "description": {
                  "type": "string",
                  "description": "Description of the event.",
                  "maxLength": 5000
                },
                "firstName": {
                  "type": "string",
                  "description": "The first name of the user associated with the event.",
                  "maxLength": 500
                },
                "lastName": {
                  "type": "string",
                  "description": "The last name of the user associated with the event.",
                  "maxLength": 500
                },
                "email": {
                  "description": "Email address of the user associated with the event.",
                  "type": "string",
                  "format": "email",
                  "x-go-type-skip-optional-pointer": true
                },
                "provider": {
                  "description": "Authentication provider of the user associated with the event.",
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "createdAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Timestamp when the event was recorded.",
                  "x-go-type": "time.Time",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at",
                    "json": "createdAt"
                  }
                }
              },
              "required": [
                "owner",
                "category",
                "action"
              ]
            },
            "description": "The events returned on the current page."
          }
        }
      },
      "EventsAggregate": {
        "type": "object",
        "description": "Aggregated event counts across categories.",
        "properties": {
          "audit": {
            "type": "integer",
            "description": "Count of audit-category events.",
            "minimum": 0
          }
        },
        "additionalProperties": true
      },
      "EventSummary": {
        "type": "object",
        "description": "Per-user event summary entry.",
        "additionalProperties": true
      },
      "EventSummaryPage": {
        "type": "object",
        "description": "Paginated list of per-user event summaries.",
        "properties": {
          "page": {
            "type": "integer",
            "description": "Current page number of the result set.",
            "minimum": 0
          },
          "pageSize": {
            "type": "integer",
            "description": "Number of items per page.",
            "minimum": 1,
            "x-oapi-codegen-extra-tags": {
              "json": "pageSize,omitempty"
            }
          },
          "totalCount": {
            "type": "integer",
            "description": "Total number of items available.",
            "minimum": 0,
            "x-oapi-codegen-extra-tags": {
              "json": "totalCount,omitempty"
            }
          },
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "description": "Per-user event summary entry.",
              "additionalProperties": true
            },
            "description": "The event summaries returned on the current page."
          }
        }
      },
      "EventType": {
        "type": "object",
        "description": "A category/action pair describing one kind of event.",
        "properties": {
          "category": {
            "type": "string",
            "description": "The category of the event type.",
            "maxLength": 500
          },
          "action": {
            "type": "string",
            "description": "The action of the event type.",
            "maxLength": 500
          }
        }
      },
      "ErrorResponse": {
        "type": "object",
        "description": "Generic error envelope returned for non-2xx responses.",
        "properties": {
          "error": {
            "type": "string",
            "description": "Human-readable error message.",
            "maxLength": 500
          }
        }
      }
    }
  }
};

export default EventSchema;
