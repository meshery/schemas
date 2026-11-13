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
          "429": {
            "description": "Too many requests - the caller exceeded the server's per-user request rate for this route family. Wait the number of seconds in `Retry-After` before retrying.",
            "headers": {
              "Retry-After": {
                "description": "Number of seconds the caller must wait before retrying.",
                "required": true,
                "schema": {
                  "type": "integer",
                  "minimum": 1
                }
              }
            },
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A MeshKit error answered as a JSON body. `error` is the sentence the caller is shown; MeshKit's long description is never serialized. Use the `MeshkitError400`, `MeshkitError403`, `MeshkitError404`, `MeshkitError409`, `MeshkitError429`, `MeshkitError500` and `MeshkitError502` responses for an operation whose server answers its refusals this way.",
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
          "429": {
            "description": "Too many requests - the caller exceeded the server's per-user request rate for this route family. Wait the number of seconds in `Retry-After` before retrying.",
            "headers": {
              "Retry-After": {
                "description": "Number of seconds the caller must wait before retrying.",
                "required": true,
                "schema": {
                  "type": "integer",
                  "minimum": 1
                }
              }
            },
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A MeshKit error answered as a JSON body. `error` is the sentence the caller is shown; MeshKit's long description is never serialized. Use the `MeshkitError400`, `MeshkitError403`, `MeshkitError404`, `MeshkitError409`, `MeshkitError429`, `MeshkitError500` and `MeshkitError502` responses for an operation whose server answers its refusals this way.",
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
          "429": {
            "description": "Too many requests - the caller exceeded the server's per-user request rate for this route family. Wait the number of seconds in `Retry-After` before retrying.",
            "headers": {
              "Retry-After": {
                "description": "Number of seconds the caller must wait before retrying.",
                "required": true,
                "schema": {
                  "type": "integer",
                  "minimum": 1
                }
              }
            },
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A MeshKit error answered as a JSON body. `error` is the sentence the caller is shown; MeshKit's long description is never serialized. Use the `MeshkitError400`, `MeshkitError403`, `MeshkitError404`, `MeshkitError409`, `MeshkitError429`, `MeshkitError500` and `MeshkitError502` responses for an operation whose server answers its refusals this way.",
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
          "429": {
            "description": "Too many requests - the caller exceeded the server's per-user request rate for this route family. Wait the number of seconds in `Retry-After` before retrying.",
            "headers": {
              "Retry-After": {
                "description": "Number of seconds the caller must wait before retrying.",
                "required": true,
                "schema": {
                  "type": "integer",
                  "minimum": 1
                }
              }
            },
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A MeshKit error answered as a JSON body. `error` is the sentence the caller is shown; MeshKit's long description is never serialized. Use the `MeshkitError400`, `MeshkitError403`, `MeshkitError404`, `MeshkitError409`, `MeshkitError429`, `MeshkitError500` and `MeshkitError502` responses for an operation whose server answers its refusals this way.",
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
                          "visibility": {
                            "type": "string",
                            "description": "Who can see the event. `private` (the default, set by Layer5 Cloud) means visible only inside the event's organization. `public` means the event may appear on the unauthenticated event feed, subject to the owner's `shareActivityPublicly` preference at read time.",
                            "enum": [
                              "private",
                              "public"
                            ],
                            "default": "private",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "visibility",
                              "json": "visibility"
                            }
                          },
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
                            "description": "System identifier of the event source: a Meshery Server instance ID, the nil UUID for an event the provider emits itself, or the connection ID of the client machine that emitted it (for example a desktop client recording a run). Asserted by the sender, not checked.\n",
                            "maxLength": 255,
                            "x-id-format": "external",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "system_id",
                              "json": "systemId"
                            }
                          },
                          "organizationId": {
                            "type": "string",
                            "format": "uuid",
                            "description": "The organization the event belongs to (see Event.organizationId). Set by the server; lets an organization-scope listing show each row's tenant.\n",
                            "readOnly": true,
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-go-name": "OrganizationID",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "organization_id",
                              "json": "organizationId"
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
                          "avatarUrl": {
                            "type": "string",
                            "format": "uri",
                            "maxLength": 500,
                            "description": "URL to the avatar image of the user associated with the event."
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
                          },
                          "correlationKey": {
                            "type": "string",
                            "description": "Key of the ongoing condition the event records (see Event.correlationKey); omitted for an event that reports no condition.",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "correlation_key"
                            }
                          },
                          "occurrenceCount": {
                            "type": "integer",
                            "description": "How many occurrences of the condition the event counts (see Event.occurrenceCount). A create without a `correlationKey`, and a call that identifies no user, stores the payload's value exactly as sent, so an omitted count stays omitted. For a call that identifies a user and carries a `correlationKey`, it is the payload's `occurrenceCount` (1 when omitted) when the event was recorded, opening a condition or inserted already resolved, growing only as later creates that do not resolve are counted. A resolving create on the open event does not add to it.\n",
                            "minimum": 1,
                            "x-oapi-codegen-extra-tags": {
                              "db": "occurrence_count"
                            }
                          },
                          "firstSeenAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "When the condition's first counted occurrence was seen (see Event.firstSeenAt). A call that identifies no user stores the payload's value exactly as sent. For a call that identifies a user, an opening create stores the payload's `firstSeenAt`, else its `lastSeenAt`, else the time of receipt. An already-resolved insert stores the payload's `firstSeenAt`, else `resolvedAt`. A close keeps the stored time. Omitted when the payload omitted it and the create applied no default.\n",
                            "x-oapi-codegen-extra-tags": {
                              "db": "first_seen_at"
                            }
                          },
                          "lastSeenAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "When the condition was last seen (see Event.lastSeenAt). A call that identifies no user stores the payload's value exactly as sent. For a call that identifies a user, an opening create stores the payload's `lastSeenAt`, else `firstSeenAt`. An already-resolved insert stores the payload's `lastSeenAt`, else `resolvedAt`. Counting an occurrence, or closing one, brings the stored time forward. Omitted when the payload omitted it and the create applied no default.\n",
                            "x-oapi-codegen-extra-tags": {
                              "db": "last_seen_at"
                            }
                          },
                          "resolvedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "When the condition cleared (see Event.resolvedAt). A call that identifies no user stores the payload's value exactly as sent. For a call that identifies a user it is omitted while the condition is open.\n",
                            "x-oapi-codegen-extra-tags": {
                              "db": "resolved_at"
                            }
                          },
                          "source": {
                            "type": "string",
                            "format": "uri-reference",
                            "description": "Which surface emitted the event, for example `meshery-server` or `mesheryctl` (see Event.source).",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "source"
                            }
                          },
                          "type": {
                            "type": "string",
                            "description": "CloudEvents-compatible `type`, for example `io.meshery.user.signup` (see Event.type).",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "type"
                            }
                          },
                          "specversion": {
                            "description": "The CloudEvents specification version the event is compatible with (see Event.specversion).",
                            "type": "string",
                            "enum": [
                              "1.0"
                            ],
                            "x-go-type": "EventSpecVersion",
                            "x-go-name": "SpecVersion",
                            "x-oapi-codegen-extra-tags": {
                              "db": "specversion"
                            }
                          },
                          "traceId": {
                            "type": "string",
                            "description": "W3C Trace Context `trace-id` of the operation the event belongs to (see Event.traceId).",
                            "minLength": 32,
                            "maxLength": 32,
                            "pattern": "^[0-9a-f]*[1-9a-f][0-9a-f]*$",
                            "x-id-format": "external",
                            "x-go-name": "TraceID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "trace_id"
                            }
                          },
                          "parentId": {
                            "type": "string",
                            "description": "W3C Trace Context `parent-id` of the sub-operation that emitted the event (see Event.parentId).",
                            "minLength": 16,
                            "maxLength": 16,
                            "pattern": "^[0-9a-f]*[1-9a-f][0-9a-f]*$",
                            "x-id-format": "external",
                            "x-go-name": "ParentID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "parent_id"
                            }
                          },
                          "id": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "id"
                            }
                          },
                          "actedUpon": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "acted_upon"
                            }
                          },
                          "operationId": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-go-name": "OperationID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "operation_id"
                            }
                          },
                          "severity": {
                            "type": "string",
                            "description": "Event level (see Event.severity). MeshKit's producers set one of `emergency`, `alert`, `critical`, `error`, `warning`, `informational`, `debug` or `success`. The set is not closed on the wire, so consumers must tolerate other values.\n",
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "severity"
                            }
                          },
                          "status": {
                            "type": "string",
                            "description": "Read state of the event (see Event.status). MeshKit records new events as `unread`, and acknowledged ones become `read`; consumers must tolerate other values.\n",
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "status"
                            }
                          },
                          "metadata": {
                            "type": "object",
                            "description": "Event-specific details, the same nullable free-form map as Event.metadata. `null` when the producer attached none. On an error event, `metadata.error` holds only the MeshKit error, never the design or the request that failed: an EventError (the error's code, rendered descriptions, the causes and remediations that apply, `matchedCauses` and instance `details`), except that a design validation event whose operation did not complete (`status` `error`) carries it as a DesignEventOperationError. Rows recorded before EventError carry MeshKit's Go field names instead (`Code`, `Severity` as a number, `ShortDescription`, `LongDescription`, `ProbableCause` and `SuggestedRemediation` as lists); readers fall back to those keys when `code` is absent and treat their flat lists as unpaired.\n",
                            "additionalProperties": true,
                            "nullable": true,
                            "x-go-type": "core.Map",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "metadata",
                              "json": "metadata,omitempty"
                            }
                          },
                          "updatedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the event was last updated (see Event.updatedAt).",
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at"
                            }
                          },
                          "deletedAt": {
                            "type": "string",
                            "format": "date-time",
                            "nullable": true,
                            "description": "Timestamp when the event was soft-deleted; omitted when it was not (see Event.deletedAt).",
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "json": "deletedAt,omitempty"
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
          "429": {
            "description": "Too many requests - the caller exceeded the server's per-user request rate for this route family. Wait the number of seconds in `Retry-After` before retrying.",
            "headers": {
              "Retry-After": {
                "description": "Number of seconds the caller must wait before retrying.",
                "required": true,
                "schema": {
                  "type": "integer",
                  "minimum": 1
                }
              }
            },
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A MeshKit error answered as a JSON body. `error` is the sentence the caller is shown; MeshKit's long description is never serialized. Use the `MeshkitError400`, `MeshkitError403`, `MeshkitError404`, `MeshkitError409`, `MeshkitError429`, `MeshkitError500` and `MeshkitError502` responses for an operation whose server answers its refusals this way.",
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
                  "description": "A MeshKit error answered as a JSON body. `error` is the sentence the caller is shown; MeshKit's long description is never serialized. Use the `MeshkitError400`, `MeshkitError403`, `MeshkitError404`, `MeshkitError409`, `MeshkitError429`, `MeshkitError500` and `MeshkitError502` responses for an operation whose server answers its refusals this way.",
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
          "429": {
            "description": "Too many requests - the caller exceeded the server's per-user request rate for this route family. Wait the number of seconds in `Retry-After` before retrying.",
            "headers": {
              "Retry-After": {
                "description": "Number of seconds the caller must wait before retrying.",
                "required": true,
                "schema": {
                  "type": "integer",
                  "minimum": 1
                }
              }
            },
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A MeshKit error answered as a JSON body. `error` is the sentence the caller is shown; MeshKit's long description is never serialized. Use the `MeshkitError400`, `MeshkitError403`, `MeshkitError404`, `MeshkitError409`, `MeshkitError429`, `MeshkitError500` and `MeshkitError502` responses for an operation whose server answers its refusals this way.",
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
                "description": "Payload for creating a new event. If visibility is absent, the event is private.",
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
                  "visibility": {
                    "description": "Who can see the event. `private` is the default; clients may set `public` for events eligible for the unauthenticated feed.",
                    "x-oapi-codegen-extra-tags": {
                      "json": "visibility,omitempty"
                    },
                    "type": "string",
                    "enum": [
                      "private",
                      "public"
                    ],
                    "default": "private",
                    "x-go-name": "EventVisibility"
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
                  "severity": {
                    "type": "string",
                    "description": "Event level. MeshKit's producers set one of `emergency`, `alert`, `critical`, `error`, `warning`, `informational`, `debug` or `success`. The set is not closed on the wire - the event write APIs persist the value they are given - so consumers must tolerate other values.\n",
                    "maxLength": 255,
                    "x-oapi-codegen-extra-tags": {
                      "json": "severity,omitempty"
                    }
                  },
                  "idempotencyKey": {
                    "type": "string",
                    "description": "Optional client-chosen key that makes recording this event safe to retry. Keys are scoped to the authenticated caller (organization and user), never to the client-settable `owner` field, so `owner` may be omitted without affecting deduplication. The first event a caller records with a key is kept, and a later create with the same key records nothing and answers 200 with that event, whatever the rest of the payload says. Use a value that names the occurrence, for example a run id, so a client replaying a local queue after a timeout never records a duplicate. Omit it for events that need no deduplication.\n",
                    "minLength": 1,
                    "maxLength": 255,
                    "x-oapi-codegen-extra-tags": {
                      "json": "idempotencyKey,omitempty"
                    }
                  },
                  "correlationKey": {
                    "type": "string",
                    "description": "Optional key naming the ongoing condition this event reports, so repeated occurrences count on one open event instead of recording one each (see createEvent). Name the condition, not the occurrence, and qualify it by the emitting source and component plus the subject, for example `meshery-server/k8s-connection/<connectionId>/unreachable`. Never use an error code alone: codes are scoped to the component that owns them. Unlike `idempotencyKey`, which makes one create safe to retry, this key spans many creates.\n",
                    "minLength": 1,
                    "maxLength": 255,
                    "x-oapi-codegen-extra-tags": {
                      "json": "correlationKey,omitempty"
                    }
                  },
                  "occurrenceCount": {
                    "type": "integer",
                    "description": "Number of occurrences this create reports, for a producer that counted repeats locally before sending. A create without a `correlationKey`, and a call that identifies no user, stores this value exactly as sent, including when it is omitted. For a call that identifies a user and carries a `correlationKey`, omitted means 1. An opening create stores that count, counting an open condition adds it, and an already-resolved insert stores it. A resolving create on that open event does not add it.\n",
                    "minimum": 1,
                    "x-oapi-codegen-extra-tags": {
                      "json": "occurrenceCount,omitempty"
                    }
                  },
                  "firstSeenAt": {
                    "type": "string",
                    "format": "date-time",
                    "description": "When the producer first saw the occurrences this create reports. A call that identifies no user stores this value exactly as sent. For a call that identifies a user, omitted while opening a condition means `lastSeenAt`, or the time of receipt, and omitted on a resolving create that inserts an already resolved event means `resolvedAt`. Stored when that create opens a condition or inserts one already resolved; a close of an open condition keeps the stored time.\n",
                    "x-oapi-codegen-extra-tags": {
                      "json": "firstSeenAt,omitempty"
                    }
                  },
                  "lastSeenAt": {
                    "type": "string",
                    "format": "date-time",
                    "description": "When the producer last saw the occurrences this create reports. A call that identifies no user stores this value exactly as sent. For a call that identifies a user, omitted while opening a condition means `firstSeenAt`; omitted while counting an open condition, or while closing one, means the time of receipt; and omitted on a resolving create that inserts an already resolved event means `resolvedAt`.\n",
                    "x-oapi-codegen-extra-tags": {
                      "json": "lastSeenAt,omitempty"
                    }
                  },
                  "resolvedAt": {
                    "type": "string",
                    "format": "date-time",
                    "description": "When the condition named by `correlationKey` cleared. A call that identifies no user stores this value exactly as sent and does not match an open event. For a call that identifies a user, a create that carries it is a resolution: it closes that caller's open event with that key, copying this payload's `severity` and `description` onto the event when this payload carries them (an omitted field keeps the stored value) and setting `lastSeenAt` to the later of the stored time and this payload's `lastSeenAt` (the time of receipt when omitted), so the closed condition reads as cleared and the next occurrence opens a new condition (see createEvent). Give the resolution a severity and description that say what cleared, for example severity `success` and `Connection to cluster prod-1 restored`, under the condition's category.\n",
                    "x-oapi-codegen-extra-tags": {
                      "json": "resolvedAt,omitempty"
                    }
                  },
                  "source": {
                    "type": "string",
                    "format": "uri-reference",
                    "description": "Which surface emitted the event, as a CloudEvents-compatible `source` (a URI reference): `meshery-server`, `meshery-ui`, `mesheryctl`, `meshery-adapter-<name>` (for example `meshery-adapter-istio`), `layer5-cloud`, or another client's name. `systemId` says which instance; `source` says which kind of client, so a failure a person caused in the UI is told apart from the same failure from the CLI. An open set: a new surface needs no schema change.\n",
                    "minLength": 1,
                    "maxLength": 255,
                    "x-oapi-codegen-extra-tags": {
                      "json": "source,omitempty"
                    }
                  },
                  "type": {
                    "type": "string",
                    "description": "CloudEvents-compatible `type`: a reverse-DNS name of the kind of occurrence, for example `io.meshery.user.signup`. It does not replace `category` and `action`, which stay two free strings; `type` is for CloudEvents-aware consumers.\n",
                    "minLength": 1,
                    "maxLength": 255,
                    "x-oapi-codegen-extra-tags": {
                      "json": "type,omitempty"
                    }
                  },
                  "specversion": {
                    "description": "The CloudEvents specification version the event's `source`, `type` and `id` are compatible with, when the producer sets them as CloudEvents attributes. A Meshery event is CloudEvents compatible; it is not a CloudEvent.\n",
                    "type": "string",
                    "enum": [
                      "1.0"
                    ],
                    "x-go-type": "EventSpecVersion",
                    "x-go-name": "SpecVersion",
                    "x-oapi-codegen-extra-tags": {
                      "json": "specversion,omitempty"
                    }
                  },
                  "traceId": {
                    "type": "string",
                    "description": "W3C Trace Context `trace-id` (32 lowercase hex digits, not all zeros) of the user-level operation the event belongs to, so the event joins the OpenTelemetry trace that operation recorded. The client that starts the operation mints it, and every event of the operation and its sub-operations carries it; the server never mints one at persist time.\n",
                    "minLength": 32,
                    "maxLength": 32,
                    "pattern": "^[0-9a-f]*[1-9a-f][0-9a-f]*$",
                    "x-id-format": "external",
                    "x-go-name": "TraceID",
                    "x-oapi-codegen-extra-tags": {
                      "json": "traceId,omitempty"
                    }
                  },
                  "parentId": {
                    "type": "string",
                    "description": "W3C Trace Context `parent-id` (16 lowercase hex digits, not all zeros): the span of the sub-operation that emitted the event, so the events of one operation form its tree. Minted by the client with `traceId`, never by the server.\n",
                    "minLength": 16,
                    "maxLength": 16,
                    "pattern": "^[0-9a-f]*[1-9a-f][0-9a-f]*$",
                    "x-id-format": "external",
                    "x-go-name": "ParentID",
                    "x-oapi-codegen-extra-tags": {
                      "json": "parentId,omitempty"
                    }
                  }
                }
              }
            }
          }
        },
        "description": "Records an event and answers 201 with it. The server assigns the organization from the session; clients do not send it. A server MAY answer a legacy create, one carrying neither `correlationKey` nor `idempotencyKey`, with 200 and `Event-Disposition: created`, for compatibility with released Meshery Servers that treat any non-200 answer as failure. Clients accept any 2xx and read `Event-Disposition` rather than the status code to tell created from replayed.\n\n**Retries (`idempotencyKey`).** When the payload carries an `idempotencyKey` the authenticated caller already used, nothing is recorded or changed and the answer is 200 with the event that key is bound to (`Event-Disposition: replayed`). This check runs first, so a retried create never counts an occurrence twice.\n\n**Conditions (`correlationKey`).** A payload that carries a `correlationKey` reports an occurrence of an ongoing condition. A call that identifies no user records a new event and stores the correlation fields exactly as sent: no defaults are applied and no open event is matched, whether or not the payload carries `resolvedAt` (201, `Event-Disposition: created`). The open, increment and resolution rules below apply only to a call that identifies a user. A condition is open while its event has no `resolvedAt`, and that caller (organization and user, as for `idempotencyKey`) has at most one open event per key; the server enforces that atomically. For a payload without `resolvedAt`: when that caller has an open event with the key, no event is recorded; that event's `occurrenceCount` grows by the payload's `occurrenceCount` (1 when omitted), its `lastSeenAt` becomes the later of its own and the payload's `lastSeenAt` (the time of receipt when omitted), and its `updatedAt` advances. The answer is 200 with it (`Event-Disposition: incremented`). Every other field keeps the value it was first recorded with. Otherwise a new event is recorded, which opens the condition: `occurrenceCount` defaults to 1, `firstSeenAt` to the payload's `firstSeenAt`, else its `lastSeenAt`, else the time of receipt, and `lastSeenAt` to the payload's `lastSeenAt`, else `firstSeenAt` (201, `Event-Disposition: created`).\n\n**Resolution.** Only a call that identifies a user resolves. A producer closes a condition by creating an event with the condition's `correlationKey` and a `resolvedAt` time, after the condition clears. When that caller has an open event with the key, nothing new is recorded: that event gets the `resolvedAt`, its `severity` and `description` become the payload's when the payload carries them (an omitted field keeps the stored value) so the closed condition reads as cleared, its `lastSeenAt` becomes the later of its own and the payload's `lastSeenAt` (the time of receipt when omitted), and its `updatedAt` advances. The answer is 200 with the closed event (`Event-Disposition: resolved`). Every other field keeps the value it was recorded with, so `occurrenceCount` does not grow. When none is open, the payload is recorded as a new, already resolved event, using the opening defaults: `occurrenceCount` is the payload's (1 when omitted), and `firstSeenAt` and `lastSeenAt` are the payload's, else `resolvedAt` (201, `created`). Once closed, the next occurrence opens a new condition with a new event. Send a resolution only when the condition changes from present to cleared, never on every healthy check.\n\n**Composition.** When a create that carries both keys does not replay, its `idempotencyKey` is bound to the event the create recorded, incremented or resolved, so a retry answers 200 with that event and changes nothing. Deduplication a server applies on its own, without a client key, must not swallow an occurrence of an event that carries a `correlationKey`. A call that identifies a user counts the occurrence; a call that identifies no user is recorded as a new event with the correlation fields stored exactly as sent. Whether a counted occurrence notifies anyone again is the reader's policy, not this operation's. See docs/event-correlation-contract.md.\n",
        "responses": {
          "200": {
            "description": "The event the create resolved to. When no new event was recorded, that is the one already recorded under this caller's `idempotencyKey` (`replayed`, unchanged) or, for a call that identifies a user, the open event of this `correlationKey` with the occurrence counted (`incremented`), or that event closed by the payload's `resolvedAt`, with its `severity` and `description` replaced by the payload's when the payload carries them (an omitted field keeps the stored value) and its `lastSeenAt` brought forward (`resolved`). A call that identifies no user records a new event instead, with the correlation fields stored exactly as sent. A server MAY also answer a legacy create, one carrying neither `correlationKey` nor `idempotencyKey`, with 200 and `Event-Disposition: created`, returning the event it just recorded, for compatibility with released Meshery Servers that treat any non-200 answer as failure. Clients accept any 2xx and read `Event-Disposition` rather than the status code to tell created from replayed.\n",
            "headers": {
              "Event-Disposition": {
                "description": "What `createEvent` did with the payload: `created` (a new event was recorded), `replayed` (the `idempotencyKey` was already used; nothing changed), `incremented` (an occurrence of the open condition with this `correlationKey` was counted) or `resolved` (that condition was closed). `incremented` and `resolved` apply only to a call that identifies a user; a call that identifies no user is `created`, with the correlation fields stored exactly as sent. A server MAY answer a legacy create, one carrying neither `correlationKey` nor `idempotencyKey`, with 200 and `created`, for compatibility with released Meshery Servers that treat any non-200 answer as failure. Clients accept any 2xx and read this header rather than the status code to tell created from replayed. A server that implements condition correlation sends it on every 200 and 201. A server that predates correlation omits it; there 201 means created and 200 means replayed. A browser client calling a server on another origin reads it only when that server lists it in `Access-Control-Expose-Headers`.\n",
                "required": false,
                "schema": {
                  "type": "string",
                  "enum": [
                    "created",
                    "replayed",
                    "incremented",
                    "resolved"
                  ]
                }
              }
            },
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
                    "organizationId",
                    "createdAt",
                    "updatedAt",
                    "visibility"
                  ],
                  "properties": {
                    "id": {
                      "description": "Event ID.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id"
                      },
                      "x-order": 7,
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
                      "x-order": 1,
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
                      },
                      "x-order": 2
                    },
                    "category": {
                      "type": "string",
                      "description": "Resource kind the operation was invoked on, for example `pattern`.",
                      "maxLength": 500,
                      "x-oapi-codegen-extra-tags": {
                        "db": "category"
                      },
                      "x-order": 3
                    },
                    "description": {
                      "type": "string",
                      "description": "Human-readable summary of what happened.",
                      "maxLength": 5000,
                      "x-oapi-codegen-extra-tags": {
                        "db": "description"
                      },
                      "x-order": 6
                    },
                    "metadata": {
                      "type": "object",
                      "description": "Event-specific details; the structure varies by event kind. `null` when the producer attached none. It stays a free-form map; design events fill it with a named shape: RelationshipEvaluationEventMetadata (category `relationship`, action `evaluation`), DesignValidationEventMetadata (category `pattern`, actions `validate`, `deploy`, `undeploy`, `dry-run`) and DesignSavedEventMetadata (category `pattern`, actions `create`, `update`); ScheduleCompletedEventMetadata (category `schedule`, action `completed`); DesignEventIdentity names the design. Never put design contents into event metadata - no `designFile`, `patternFile`, `components`, `relationships`, `trace`, `evaluationResponse`, the raw `summary` or `validationResult`. Meshery Server applies a 16 KB guard that drops oversized metadata down to the identity fields (`designId`, `designName`, `designVersion`, `designLink`, `viewLink`). On an error event, `metadata.error` holds only the MeshKit error, never the design or the request that failed: an EventError (the error's code, rendered descriptions, the causes and remediations that apply, `matchedCauses` and instance `details`; docs/error-definition-contract.md), except that a design validation event whose operation did not complete (`status` `error`) carries it as a DesignEventOperationError. Rows recorded before EventError carry MeshKit's Go field names instead (`Code`, `Severity` as a number, `ShortDescription`, `LongDescription`, `ProbableCause` and `SuggestedRemediation` as lists); readers fall back to those keys when `code` is absent and treat their flat lists as unpaired. Older Meshery Cloud rows may carry the legacy `design_name` and `view_link` keys; readers should fall back to them when `designName` and `viewLink` are absent.\n",
                      "additionalProperties": true,
                      "nullable": true,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata"
                      },
                      "x-order": 8
                    },
                    "operationId": {
                      "description": "ID correlating the events one operation emitted.",
                      "x-go-name": "OperationID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "operation_id"
                      },
                      "x-order": 9,
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
                      },
                      "x-order": 12
                    },
                    "status": {
                      "type": "string",
                      "description": "Read state of the event. MeshKit records new events as `unread`, and acknowledged ones become `read`; the event status APIs persist any value they are given, so consumers must tolerate other values.\n",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      },
                      "x-order": 13
                    },
                    "systemId": {
                      "description": "ID of the system instance that emitted the event. A Meshery Server sends its server instance ID; an event the provider emits itself carries the nil UUID. A client that registered a connection for its machine (for example a desktop client) sets its connection ID, so an event that records a run names the computer that ran it and can be joined to the claim it released (`Claim.outcomeEventId`) and to the connection (`connections.id`). The value is asserted by the sender and is not checked against the caller's connections.\n",
                      "x-order": 14,
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
                      },
                      "x-order": 10
                    },
                    "organizationId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "readOnly": true,
                      "x-go-name": "OrganizationID",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "organization_id",
                        "json": "organizationId"
                      },
                      "x-order": 11
                    },
                    "createdAt": {
                      "description": "Timestamp when the event was recorded.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 4,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp when the event was last updated.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 15,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "visibility": {
                      "description": "Who can see the event. Defaults to `private`.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "visibility",
                        "json": "visibility"
                      },
                      "x-order": 16,
                      "type": "string",
                      "enum": [
                        "private",
                        "public"
                      ],
                      "default": "private",
                      "x-go-name": "EventVisibility"
                    },
                    "deletedAt": {
                      "description": "Timestamp when the event was soft-deleted; omitted when it was not.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at"
                      },
                      "x-order": 5,
                      "x-go-type": "meshcore.NullTime",
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "type": "string",
                      "format": "date-time",
                      "nullable": true,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "correlationKey": {
                      "type": "string",
                      "description": "Key of the ongoing condition the event records (see EventPayload.correlationKey and createEvent); omitted for an event that reports no condition.\n",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "correlation_key"
                      },
                      "x-order": 17
                    },
                    "occurrenceCount": {
                      "type": "integer",
                      "description": "How many occurrences of the condition this event counts. A create without a `correlationKey`, and a call that identifies no user, stores the payload's value exactly as sent, so an omitted count stays omitted. For a call that identifies a user and carries a `correlationKey`, an opening create or a resolving create inserted already resolved stores the payload's `occurrenceCount` (1 when omitted). Later creates that do not resolve add their count. A resolving create on the open event does not add to it.\n",
                      "minimum": 1,
                      "x-oapi-codegen-extra-tags": {
                        "db": "occurrence_count"
                      },
                      "x-order": 18
                    },
                    "firstSeenAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "When the condition's first counted occurrence was seen. A call that identifies no user stores the payload's value exactly as sent. For a call that identifies a user, an opening create stores the payload's `firstSeenAt`, else its `lastSeenAt`, else the time of receipt. An already-resolved insert stores the payload's `firstSeenAt`, else `resolvedAt`. A close keeps the stored time. Omitted when the payload omitted it and the create applied no default.\n",
                      "x-oapi-codegen-extra-tags": {
                        "db": "first_seen_at"
                      },
                      "x-order": 19
                    },
                    "lastSeenAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "When the condition was last seen. A call that identifies no user stores the payload's value exactly as sent. For a call that identifies a user, an opening create stores the payload's `lastSeenAt`, else `firstSeenAt`. An already-resolved insert stores the payload's `lastSeenAt`, else `resolvedAt`. Counting an occurrence, or closing one, brings the stored time forward. Omitted when the payload omitted it and the create applied no default.\n",
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_seen_at"
                      },
                      "x-order": 20
                    },
                    "resolvedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "When the condition cleared. A call that identifies no user stores the payload's value exactly as sent and does not close another event. For a call that identifies a user it is omitted while the condition is open, and set by a resolution (see createEvent), which also replaces `severity` and `description` with the payload's when the payload carries them (an omitted field keeps the stored value) and brings `lastSeenAt` forward, after which a new occurrence opens a new event.\n",
                      "x-oapi-codegen-extra-tags": {
                        "db": "resolved_at"
                      },
                      "x-order": 21
                    },
                    "source": {
                      "type": "string",
                      "format": "uri-reference",
                      "description": "Which surface emitted the event (CloudEvents-compatible `source`), for example `meshery-server`, `meshery-ui`, `mesheryctl` or `meshery-adapter-istio`; see EventPayload.source. Omitted when the producer did not say.\n",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "source"
                      },
                      "x-order": 22
                    },
                    "type": {
                      "type": "string",
                      "description": "CloudEvents-compatible `type`, for example `io.meshery.user.signup`; see EventPayload.type. `category` and `action` stay the event's classification.\n",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "type"
                      },
                      "x-order": 23
                    },
                    "specversion": {
                      "description": "The CloudEvents specification version the event is compatible with; see EventPayload.specversion.",
                      "type": "string",
                      "enum": [
                        "1.0"
                      ],
                      "x-go-type": "EventSpecVersion",
                      "x-go-name": "SpecVersion",
                      "x-oapi-codegen-extra-tags": {
                        "db": "specversion"
                      },
                      "x-order": 24
                    },
                    "traceId": {
                      "type": "string",
                      "description": "W3C Trace Context `trace-id` of the operation the event belongs to, as its client minted it; see EventPayload.traceId.\n",
                      "minLength": 32,
                      "maxLength": 32,
                      "pattern": "^[0-9a-f]*[1-9a-f][0-9a-f]*$",
                      "x-id-format": "external",
                      "x-go-name": "TraceID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "trace_id"
                      },
                      "x-order": 25
                    },
                    "parentId": {
                      "type": "string",
                      "description": "W3C Trace Context `parent-id` of the sub-operation that emitted the event; see EventPayload.parentId.\n",
                      "minLength": 16,
                      "maxLength": 16,
                      "pattern": "^[0-9a-f]*[1-9a-f][0-9a-f]*$",
                      "x-id-format": "external",
                      "x-go-name": "ParentID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "parent_id"
                      },
                      "x-order": 26
                    }
                  }
                }
              }
            }
          },
          "201": {
            "description": "A new event was recorded (`Event-Disposition: created`). A call that identifies no user stores the correlation fields exactly as sent. For a call that identifies a user and carries a `correlationKey`, the event opens a condition, or records one already resolved when the payload carries `resolvedAt`. An already resolved insert uses `occurrenceCount` 1 when omitted, and `firstSeenAt` and `lastSeenAt` from the payload, else `resolvedAt`.\n",
            "headers": {
              "Event-Disposition": {
                "description": "What `createEvent` did with the payload: `created` (a new event was recorded), `replayed` (the `idempotencyKey` was already used; nothing changed), `incremented` (an occurrence of the open condition with this `correlationKey` was counted) or `resolved` (that condition was closed). `incremented` and `resolved` apply only to a call that identifies a user; a call that identifies no user is `created`, with the correlation fields stored exactly as sent. A server MAY answer a legacy create, one carrying neither `correlationKey` nor `idempotencyKey`, with 200 and `created`, for compatibility with released Meshery Servers that treat any non-200 answer as failure. Clients accept any 2xx and read this header rather than the status code to tell created from replayed. A server that implements condition correlation sends it on every 200 and 201. A server that predates correlation omits it; there 201 means created and 200 means replayed. A browser client calling a server on another origin reads it only when that server lists it in `Access-Control-Expose-Headers`.\n",
                "required": false,
                "schema": {
                  "type": "string",
                  "enum": [
                    "created",
                    "replayed",
                    "incremented",
                    "resolved"
                  ]
                }
              }
            },
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
                    "organizationId",
                    "createdAt",
                    "updatedAt",
                    "visibility"
                  ],
                  "properties": {
                    "id": {
                      "description": "Event ID.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id"
                      },
                      "x-order": 7,
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
                      "x-order": 1,
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
                      },
                      "x-order": 2
                    },
                    "category": {
                      "type": "string",
                      "description": "Resource kind the operation was invoked on, for example `pattern`.",
                      "maxLength": 500,
                      "x-oapi-codegen-extra-tags": {
                        "db": "category"
                      },
                      "x-order": 3
                    },
                    "description": {
                      "type": "string",
                      "description": "Human-readable summary of what happened.",
                      "maxLength": 5000,
                      "x-oapi-codegen-extra-tags": {
                        "db": "description"
                      },
                      "x-order": 6
                    },
                    "metadata": {
                      "type": "object",
                      "description": "Event-specific details; the structure varies by event kind. `null` when the producer attached none. It stays a free-form map; design events fill it with a named shape: RelationshipEvaluationEventMetadata (category `relationship`, action `evaluation`), DesignValidationEventMetadata (category `pattern`, actions `validate`, `deploy`, `undeploy`, `dry-run`) and DesignSavedEventMetadata (category `pattern`, actions `create`, `update`); ScheduleCompletedEventMetadata (category `schedule`, action `completed`); DesignEventIdentity names the design. Never put design contents into event metadata - no `designFile`, `patternFile`, `components`, `relationships`, `trace`, `evaluationResponse`, the raw `summary` or `validationResult`. Meshery Server applies a 16 KB guard that drops oversized metadata down to the identity fields (`designId`, `designName`, `designVersion`, `designLink`, `viewLink`). On an error event, `metadata.error` holds only the MeshKit error, never the design or the request that failed: an EventError (the error's code, rendered descriptions, the causes and remediations that apply, `matchedCauses` and instance `details`; docs/error-definition-contract.md), except that a design validation event whose operation did not complete (`status` `error`) carries it as a DesignEventOperationError. Rows recorded before EventError carry MeshKit's Go field names instead (`Code`, `Severity` as a number, `ShortDescription`, `LongDescription`, `ProbableCause` and `SuggestedRemediation` as lists); readers fall back to those keys when `code` is absent and treat their flat lists as unpaired. Older Meshery Cloud rows may carry the legacy `design_name` and `view_link` keys; readers should fall back to them when `designName` and `viewLink` are absent.\n",
                      "additionalProperties": true,
                      "nullable": true,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata"
                      },
                      "x-order": 8
                    },
                    "operationId": {
                      "description": "ID correlating the events one operation emitted.",
                      "x-go-name": "OperationID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "operation_id"
                      },
                      "x-order": 9,
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
                      },
                      "x-order": 12
                    },
                    "status": {
                      "type": "string",
                      "description": "Read state of the event. MeshKit records new events as `unread`, and acknowledged ones become `read`; the event status APIs persist any value they are given, so consumers must tolerate other values.\n",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      },
                      "x-order": 13
                    },
                    "systemId": {
                      "description": "ID of the system instance that emitted the event. A Meshery Server sends its server instance ID; an event the provider emits itself carries the nil UUID. A client that registered a connection for its machine (for example a desktop client) sets its connection ID, so an event that records a run names the computer that ran it and can be joined to the claim it released (`Claim.outcomeEventId`) and to the connection (`connections.id`). The value is asserted by the sender and is not checked against the caller's connections.\n",
                      "x-order": 14,
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
                      },
                      "x-order": 10
                    },
                    "organizationId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "readOnly": true,
                      "x-go-name": "OrganizationID",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "organization_id",
                        "json": "organizationId"
                      },
                      "x-order": 11
                    },
                    "createdAt": {
                      "description": "Timestamp when the event was recorded.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 4,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp when the event was last updated.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 15,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "visibility": {
                      "description": "Who can see the event. Defaults to `private`.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "visibility",
                        "json": "visibility"
                      },
                      "x-order": 16,
                      "type": "string",
                      "enum": [
                        "private",
                        "public"
                      ],
                      "default": "private",
                      "x-go-name": "EventVisibility"
                    },
                    "deletedAt": {
                      "description": "Timestamp when the event was soft-deleted; omitted when it was not.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at"
                      },
                      "x-order": 5,
                      "x-go-type": "meshcore.NullTime",
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "type": "string",
                      "format": "date-time",
                      "nullable": true,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "correlationKey": {
                      "type": "string",
                      "description": "Key of the ongoing condition the event records (see EventPayload.correlationKey and createEvent); omitted for an event that reports no condition.\n",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "correlation_key"
                      },
                      "x-order": 17
                    },
                    "occurrenceCount": {
                      "type": "integer",
                      "description": "How many occurrences of the condition this event counts. A create without a `correlationKey`, and a call that identifies no user, stores the payload's value exactly as sent, so an omitted count stays omitted. For a call that identifies a user and carries a `correlationKey`, an opening create or a resolving create inserted already resolved stores the payload's `occurrenceCount` (1 when omitted). Later creates that do not resolve add their count. A resolving create on the open event does not add to it.\n",
                      "minimum": 1,
                      "x-oapi-codegen-extra-tags": {
                        "db": "occurrence_count"
                      },
                      "x-order": 18
                    },
                    "firstSeenAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "When the condition's first counted occurrence was seen. A call that identifies no user stores the payload's value exactly as sent. For a call that identifies a user, an opening create stores the payload's `firstSeenAt`, else its `lastSeenAt`, else the time of receipt. An already-resolved insert stores the payload's `firstSeenAt`, else `resolvedAt`. A close keeps the stored time. Omitted when the payload omitted it and the create applied no default.\n",
                      "x-oapi-codegen-extra-tags": {
                        "db": "first_seen_at"
                      },
                      "x-order": 19
                    },
                    "lastSeenAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "When the condition was last seen. A call that identifies no user stores the payload's value exactly as sent. For a call that identifies a user, an opening create stores the payload's `lastSeenAt`, else `firstSeenAt`. An already-resolved insert stores the payload's `lastSeenAt`, else `resolvedAt`. Counting an occurrence, or closing one, brings the stored time forward. Omitted when the payload omitted it and the create applied no default.\n",
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_seen_at"
                      },
                      "x-order": 20
                    },
                    "resolvedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "When the condition cleared. A call that identifies no user stores the payload's value exactly as sent and does not close another event. For a call that identifies a user it is omitted while the condition is open, and set by a resolution (see createEvent), which also replaces `severity` and `description` with the payload's when the payload carries them (an omitted field keeps the stored value) and brings `lastSeenAt` forward, after which a new occurrence opens a new event.\n",
                      "x-oapi-codegen-extra-tags": {
                        "db": "resolved_at"
                      },
                      "x-order": 21
                    },
                    "source": {
                      "type": "string",
                      "format": "uri-reference",
                      "description": "Which surface emitted the event (CloudEvents-compatible `source`), for example `meshery-server`, `meshery-ui`, `mesheryctl` or `meshery-adapter-istio`; see EventPayload.source. Omitted when the producer did not say.\n",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "source"
                      },
                      "x-order": 22
                    },
                    "type": {
                      "type": "string",
                      "description": "CloudEvents-compatible `type`, for example `io.meshery.user.signup`; see EventPayload.type. `category` and `action` stay the event's classification.\n",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "type"
                      },
                      "x-order": 23
                    },
                    "specversion": {
                      "description": "The CloudEvents specification version the event is compatible with; see EventPayload.specversion.",
                      "type": "string",
                      "enum": [
                        "1.0"
                      ],
                      "x-go-type": "EventSpecVersion",
                      "x-go-name": "SpecVersion",
                      "x-oapi-codegen-extra-tags": {
                        "db": "specversion"
                      },
                      "x-order": 24
                    },
                    "traceId": {
                      "type": "string",
                      "description": "W3C Trace Context `trace-id` of the operation the event belongs to, as its client minted it; see EventPayload.traceId.\n",
                      "minLength": 32,
                      "maxLength": 32,
                      "pattern": "^[0-9a-f]*[1-9a-f][0-9a-f]*$",
                      "x-id-format": "external",
                      "x-go-name": "TraceID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "trace_id"
                      },
                      "x-order": 25
                    },
                    "parentId": {
                      "type": "string",
                      "description": "W3C Trace Context `parent-id` of the sub-operation that emitted the event; see EventPayload.parentId.\n",
                      "minLength": 16,
                      "maxLength": 16,
                      "pattern": "^[0-9a-f]*[1-9a-f][0-9a-f]*$",
                      "x-id-format": "external",
                      "x-go-name": "ParentID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "parent_id"
                      },
                      "x-order": 26
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
          "429": {
            "description": "Too many requests - the caller exceeded the server's per-user request rate for this route family. Wait the number of seconds in `Retry-After` before retrying.",
            "headers": {
              "Retry-After": {
                "description": "Number of seconds the caller must wait before retrying.",
                "required": true,
                "schema": {
                  "type": "integer",
                  "minimum": 1
                }
              }
            },
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A MeshKit error answered as a JSON body. `error` is the sentence the caller is shown; MeshKit's long description is never serialized. Use the `MeshkitError400`, `MeshkitError403`, `MeshkitError404`, `MeshkitError409`, `MeshkitError429`, `MeshkitError500` and `MeshkitError502` responses for an operation whose server answers its refusals this way.",
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
          },
          {
            "name": "scope",
            "in": "query",
            "required": false,
            "description": "Which events are returned. `user` (default): only the caller's own events (unchanged behavior). `organization`: every member's events in the caller's session organization. Requires organization administration permission in the session organization; callers without it get 403.\n",
            "schema": {
              "type": "string",
              "enum": [
                "user",
                "organization"
              ],
              "default": "user"
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
                          "visibility": {
                            "type": "string",
                            "description": "Who can see the event. `private` (the default, set by Layer5 Cloud) means visible only inside the event's organization. `public` means the event may appear on the unauthenticated event feed, subject to the owner's `shareActivityPublicly` preference at read time.",
                            "enum": [
                              "private",
                              "public"
                            ],
                            "default": "private",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "visibility",
                              "json": "visibility"
                            }
                          },
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
                            "description": "System identifier of the event source: a Meshery Server instance ID, the nil UUID for an event the provider emits itself, or the connection ID of the client machine that emitted it (for example a desktop client recording a run). Asserted by the sender, not checked.\n",
                            "maxLength": 255,
                            "x-id-format": "external",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "system_id",
                              "json": "systemId"
                            }
                          },
                          "organizationId": {
                            "type": "string",
                            "format": "uuid",
                            "description": "The organization the event belongs to (see Event.organizationId). Set by the server; lets an organization-scope listing show each row's tenant.\n",
                            "readOnly": true,
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-go-name": "OrganizationID",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "organization_id",
                              "json": "organizationId"
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
                          "avatarUrl": {
                            "type": "string",
                            "format": "uri",
                            "maxLength": 500,
                            "description": "URL to the avatar image of the user associated with the event."
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
                          },
                          "correlationKey": {
                            "type": "string",
                            "description": "Key of the ongoing condition the event records (see Event.correlationKey); omitted for an event that reports no condition.",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "correlation_key"
                            }
                          },
                          "occurrenceCount": {
                            "type": "integer",
                            "description": "How many occurrences of the condition the event counts (see Event.occurrenceCount). A create without a `correlationKey`, and a call that identifies no user, stores the payload's value exactly as sent, so an omitted count stays omitted. For a call that identifies a user and carries a `correlationKey`, it is the payload's `occurrenceCount` (1 when omitted) when the event was recorded, opening a condition or inserted already resolved, growing only as later creates that do not resolve are counted. A resolving create on the open event does not add to it.\n",
                            "minimum": 1,
                            "x-oapi-codegen-extra-tags": {
                              "db": "occurrence_count"
                            }
                          },
                          "firstSeenAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "When the condition's first counted occurrence was seen (see Event.firstSeenAt). A call that identifies no user stores the payload's value exactly as sent. For a call that identifies a user, an opening create stores the payload's `firstSeenAt`, else its `lastSeenAt`, else the time of receipt. An already-resolved insert stores the payload's `firstSeenAt`, else `resolvedAt`. A close keeps the stored time. Omitted when the payload omitted it and the create applied no default.\n",
                            "x-oapi-codegen-extra-tags": {
                              "db": "first_seen_at"
                            }
                          },
                          "lastSeenAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "When the condition was last seen (see Event.lastSeenAt). A call that identifies no user stores the payload's value exactly as sent. For a call that identifies a user, an opening create stores the payload's `lastSeenAt`, else `firstSeenAt`. An already-resolved insert stores the payload's `lastSeenAt`, else `resolvedAt`. Counting an occurrence, or closing one, brings the stored time forward. Omitted when the payload omitted it and the create applied no default.\n",
                            "x-oapi-codegen-extra-tags": {
                              "db": "last_seen_at"
                            }
                          },
                          "resolvedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "When the condition cleared (see Event.resolvedAt). A call that identifies no user stores the payload's value exactly as sent. For a call that identifies a user it is omitted while the condition is open.\n",
                            "x-oapi-codegen-extra-tags": {
                              "db": "resolved_at"
                            }
                          },
                          "source": {
                            "type": "string",
                            "format": "uri-reference",
                            "description": "Which surface emitted the event, for example `meshery-server` or `mesheryctl` (see Event.source).",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "source"
                            }
                          },
                          "type": {
                            "type": "string",
                            "description": "CloudEvents-compatible `type`, for example `io.meshery.user.signup` (see Event.type).",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "type"
                            }
                          },
                          "specversion": {
                            "description": "The CloudEvents specification version the event is compatible with (see Event.specversion).",
                            "type": "string",
                            "enum": [
                              "1.0"
                            ],
                            "x-go-type": "EventSpecVersion",
                            "x-go-name": "SpecVersion",
                            "x-oapi-codegen-extra-tags": {
                              "db": "specversion"
                            }
                          },
                          "traceId": {
                            "type": "string",
                            "description": "W3C Trace Context `trace-id` of the operation the event belongs to (see Event.traceId).",
                            "minLength": 32,
                            "maxLength": 32,
                            "pattern": "^[0-9a-f]*[1-9a-f][0-9a-f]*$",
                            "x-id-format": "external",
                            "x-go-name": "TraceID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "trace_id"
                            }
                          },
                          "parentId": {
                            "type": "string",
                            "description": "W3C Trace Context `parent-id` of the sub-operation that emitted the event (see Event.parentId).",
                            "minLength": 16,
                            "maxLength": 16,
                            "pattern": "^[0-9a-f]*[1-9a-f][0-9a-f]*$",
                            "x-id-format": "external",
                            "x-go-name": "ParentID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "parent_id"
                            }
                          },
                          "id": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "id"
                            }
                          },
                          "actedUpon": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "acted_upon"
                            }
                          },
                          "operationId": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-go-name": "OperationID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "operation_id"
                            }
                          },
                          "severity": {
                            "type": "string",
                            "description": "Event level (see Event.severity). MeshKit's producers set one of `emergency`, `alert`, `critical`, `error`, `warning`, `informational`, `debug` or `success`. The set is not closed on the wire, so consumers must tolerate other values.\n",
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "severity"
                            }
                          },
                          "status": {
                            "type": "string",
                            "description": "Read state of the event (see Event.status). MeshKit records new events as `unread`, and acknowledged ones become `read`; consumers must tolerate other values.\n",
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "status"
                            }
                          },
                          "metadata": {
                            "type": "object",
                            "description": "Event-specific details, the same nullable free-form map as Event.metadata. `null` when the producer attached none. On an error event, `metadata.error` holds only the MeshKit error, never the design or the request that failed: an EventError (the error's code, rendered descriptions, the causes and remediations that apply, `matchedCauses` and instance `details`), except that a design validation event whose operation did not complete (`status` `error`) carries it as a DesignEventOperationError. Rows recorded before EventError carry MeshKit's Go field names instead (`Code`, `Severity` as a number, `ShortDescription`, `LongDescription`, `ProbableCause` and `SuggestedRemediation` as lists); readers fall back to those keys when `code` is absent and treat their flat lists as unpaired.\n",
                            "additionalProperties": true,
                            "nullable": true,
                            "x-go-type": "core.Map",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "metadata",
                              "json": "metadata,omitempty"
                            }
                          },
                          "updatedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the event was last updated (see Event.updatedAt).",
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at"
                            }
                          },
                          "deletedAt": {
                            "type": "string",
                            "format": "date-time",
                            "nullable": true,
                            "description": "Timestamp when the event was soft-deleted; omitted when it was not (see Event.deletedAt).",
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "json": "deletedAt,omitempty"
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
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A MeshKit error answered as a JSON body. `error` is the sentence the caller is shown; MeshKit's long description is never serialized. Use the `MeshkitError400`, `MeshkitError403`, `MeshkitError404`, `MeshkitError409`, `MeshkitError429`, `MeshkitError500` and `MeshkitError502` responses for an operation whose server answers its refusals this way.",
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
            "description": "Not found"
          },
          "429": {
            "description": "Too many requests - the caller exceeded the server's per-user request rate for this route family. Wait the number of seconds in `Retry-After` before retrying.",
            "headers": {
              "Retry-After": {
                "description": "Number of seconds the caller must wait before retrying.",
                "required": true,
                "schema": {
                  "type": "integer",
                  "minimum": 1
                }
              }
            },
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A MeshKit error answered as a JSON body. `error` is the sentence the caller is shown; MeshKit's long description is never serialized. Use the `MeshkitError400`, `MeshkitError403`, `MeshkitError404`, `MeshkitError409`, `MeshkitError429`, `MeshkitError500` and `MeshkitError502` responses for an operation whose server answers its refusals this way.",
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
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/api/events/feed": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "events"
        ],
        "operationId": "getEventFeed",
        "summary": "Get event feed",
        "description": "Generic, unauthenticated feed of events whose visibility is `public`\nand whose owner's `shareActivityPublicly` preference is on at read\ntime. Results are ordered newest first by `createdAt` and can be\nfiltered by category and action. Rate limited per client IP; an\nover-limit client receives 429 with `Retry-After`. Responses carry\n`Cache-Control: public, max-age=N` where N is at most 30 seconds.\nSee docs/event-feed-contract.md.\n",
        "security": [],
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
            "required": false,
            "description": "Number of feed items per page.",
            "schema": {
              "type": "integer",
              "minimum": 1,
              "maximum": 50,
              "default": 20
            }
          },
          {
            "name": "category",
            "in": "query",
            "required": false,
            "description": "Optional event category filter.",
            "schema": {
              "type": "string",
              "maxLength": 500
            }
          },
          {
            "name": "action",
            "in": "query",
            "required": false,
            "description": "Optional event action filter.",
            "schema": {
              "type": "string",
              "maxLength": 500
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Event feed page",
            "headers": {
              "Cache-Control": {
                "description": "`public, max-age=N` with N from 0 to 30; max-age never exceeds 30 seconds.",
                "required": true,
                "schema": {
                  "type": "string",
                  "pattern": "^public, max-age=([0-9]|[12][0-9]|30)$"
                }
              }
            },
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": false,
                  "description": "One page of event feed items, newest first.",
                  "required": [
                    "page",
                    "pageSize",
                    "totalCount",
                    "data"
                  ],
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
                      "maximum": 50
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of matching feed events.",
                      "minimum": 0
                    },
                    "data": {
                      "type": "array",
                      "maxItems": 50,
                      "items": {
                        "type": "object",
                        "additionalProperties": false,
                        "description": "An event projected into the public feed. It never includes email,\nfirstName, lastName, description, provider or raw metadata.\n`platform`, `role`, `line` and `networks` are projected from\nScheduleCompletedEventMetadata; events without valid required\nmetadata are skipped. Public profile fields are resolved by Cloud at\nread time for every served owner (live, active, and\nshareActivityPublicly on).\n",
                        "required": [
                          "id",
                          "userId",
                          "category",
                          "action",
                          "createdAt",
                          "visibility",
                          "platform",
                          "role",
                          "line"
                        ],
                        "properties": {
                          "id": {
                            "description": "Event ID.",
                            "x-go-name": "ID",
                            "x-order": 1,
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
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
                            "x-order": 2
                          },
                          "category": {
                            "type": "string",
                            "description": "Event category.",
                            "maxLength": 500,
                            "x-order": 3
                          },
                          "action": {
                            "type": "string",
                            "description": "Event action.",
                            "maxLength": 500,
                            "x-order": 4
                          },
                          "createdAt": {
                            "description": "Event creation time; the feed is ordered newest first.",
                            "x-order": 5,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "visibility": {
                            "description": "Always `public` in the feed.",
                            "x-order": 6,
                            "type": "string",
                            "enum": [
                              "private",
                              "public"
                            ],
                            "default": "private",
                            "x-go-name": "EventVisibility"
                          },
                          "platform": {
                            "type": "string",
                            "description": "Platform from ScheduleCompletedEventMetadata.",
                            "enum": [
                              "linkedin",
                              "x",
                              "reddit",
                              "hacker-news",
                              "slack",
                              "bluesky",
                              "github"
                            ],
                            "x-order": 7
                          },
                          "role": {
                            "type": "string",
                            "description": "Role from ScheduleCompletedEventMetadata.",
                            "minLength": 3,
                            "maxLength": 40,
                            "x-order": 8
                          },
                          "line": {
                            "type": "string",
                            "description": "One-line result from ScheduleCompletedEventMetadata.",
                            "minLength": 10,
                            "maxLength": 120,
                            "x-order": 9
                          },
                          "networks": {
                            "type": "array",
                            "description": "Networks from ScheduleCompletedEventMetadata, when present.",
                            "minItems": 1,
                            "maxItems": 20,
                            "items": {
                              "type": "string",
                              "minLength": 1,
                              "maxLength": 255
                            },
                            "x-oapi-codegen-extra-tags": {
                              "json": "networks,omitempty"
                            },
                            "x-order": 10
                          },
                          "displayName": {
                            "type": "string",
                            "description": "The same value PublicUser.username carries for the owner. Never email. Resolved for every served owner; omitted when empty.\n",
                            "maxLength": 200,
                            "x-oapi-codegen-extra-tags": {
                              "json": "displayName,omitempty"
                            },
                            "x-order": 11
                          },
                          "avatarUrl": {
                            "type": "string",
                            "format": "uri",
                            "maxLength": 500,
                            "description": "Public avatar URL; resolved for every served owner, omitted when empty.",
                            "x-go-name": "AvatarURL",
                            "x-oapi-codegen-extra-tags": {
                              "json": "avatarUrl,omitempty"
                            },
                            "x-order": 12
                          },
                          "organizationName": {
                            "type": "string",
                            "description": "Public organization name; omitted when organization memberships are not public to an anonymous caller.",
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "json": "organizationName,omitempty"
                            },
                            "x-order": 13
                          },
                          "publicProfileUrl": {
                            "type": "string",
                            "format": "uri",
                            "description": "HTTPS URL of the user's public profile.",
                            "pattern": "^https://",
                            "maxLength": 2048,
                            "x-go-name": "PublicProfileURL",
                            "x-oapi-codegen-extra-tags": {
                              "json": "publicProfileUrl,omitempty"
                            },
                            "x-order": 14
                          }
                        }
                      },
                      "description": "Events for the requested page, newest first."
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
          "429": {
            "description": "Too many requests - the caller exceeded the server's per-user request rate for this route family. Wait the number of seconds in `Retry-After` before retrying.",
            "headers": {
              "Retry-After": {
                "description": "Number of seconds the caller must wait before retrying.",
                "required": true,
                "schema": {
                  "type": "integer",
                  "minimum": 1
                }
              }
            },
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A MeshKit error answered as a JSON body. `error` is the sentence the caller is shown; MeshKit's long description is never serialized. Use the `MeshkitError400`, `MeshkitError403`, `MeshkitError404`, `MeshkitError409`, `MeshkitError429`, `MeshkitError500` and `MeshkitError502` responses for an operation whose server answers its refusals this way.",
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
          "429": {
            "description": "Too many requests - the caller exceeded the server's per-user request rate for this route family. Wait the number of seconds in `Retry-After` before retrying.",
            "headers": {
              "Retry-After": {
                "description": "Number of seconds the caller must wait before retrying.",
                "required": true,
                "schema": {
                  "type": "integer",
                  "minimum": 1
                }
              }
            },
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A MeshKit error answered as a JSON body. `error` is the sentence the caller is shown; MeshKit's long description is never serialized. Use the `MeshkitError400`, `MeshkitError403`, `MeshkitError404`, `MeshkitError409`, `MeshkitError429`, `MeshkitError500` and `MeshkitError502` responses for an operation whose server answers its refusals this way.",
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
          "429": {
            "description": "Too many requests - the caller exceeded the server's per-user request rate for this route family. Wait the number of seconds in `Retry-After` before retrying.",
            "headers": {
              "Retry-After": {
                "description": "Number of seconds the caller must wait before retrying.",
                "required": true,
                "schema": {
                  "type": "integer",
                  "minimum": 1
                }
              }
            },
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A MeshKit error answered as a JSON body. `error` is the sentence the caller is shown; MeshKit's long description is never serialized. Use the `MeshkitError400`, `MeshkitError403`, `MeshkitError404`, `MeshkitError409`, `MeshkitError429`, `MeshkitError500` and `MeshkitError502` responses for an operation whose server answers its refusals this way.",
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
      "MeshkitError429": {
        "description": "Too many requests - the caller exceeded the server's per-user request rate for this route family. Wait the number of seconds in `Retry-After` before retrying.",
        "headers": {
          "Retry-After": {
            "description": "Number of seconds the caller must wait before retrying.",
            "required": true,
            "schema": {
              "type": "integer",
              "minimum": 1
            }
          }
        },
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "description": "A MeshKit error answered as a JSON body. `error` is the sentence the caller is shown; MeshKit's long description is never serialized. Use the `MeshkitError400`, `MeshkitError403`, `MeshkitError404`, `MeshkitError409`, `MeshkitError429`, `MeshkitError500` and `MeshkitError502` responses for an operation whose server answers its refusals this way.",
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
      "MeshkitError403": {
        "description": "Forbidden",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "description": "A MeshKit error answered as a JSON body. `error` is the sentence the caller is shown; MeshKit's long description is never serialized. Use the `MeshkitError400`, `MeshkitError403`, `MeshkitError404`, `MeshkitError409`, `MeshkitError429`, `MeshkitError500` and `MeshkitError502` responses for an operation whose server answers its refusals this way.",
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
    "headers": {
      "EventDisposition": {
        "description": "What `createEvent` did with the payload: `created` (a new event was recorded), `replayed` (the `idempotencyKey` was already used; nothing changed), `incremented` (an occurrence of the open condition with this `correlationKey` was counted) or `resolved` (that condition was closed). `incremented` and `resolved` apply only to a call that identifies a user; a call that identifies no user is `created`, with the correlation fields stored exactly as sent. A server MAY answer a legacy create, one carrying neither `correlationKey` nor `idempotencyKey`, with 200 and `created`, for compatibility with released Meshery Servers that treat any non-200 answer as failure. Clients accept any 2xx and read this header rather than the status code to tell created from replayed. A server that implements condition correlation sends it on every 200 and 201. A server that predates correlation omits it; there 201 means created and 200 means replayed. A browser client calling a server on another origin reads it only when that server lists it in `Access-Control-Expose-Headers`.\n",
        "required": false,
        "schema": {
          "type": "string",
          "enum": [
            "created",
            "replayed",
            "incremented",
            "resolved"
          ]
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
      "feedPagesize": {
        "name": "pagesize",
        "in": "query",
        "required": false,
        "description": "Number of feed items per page.",
        "schema": {
          "type": "integer",
          "minimum": 1,
          "maximum": 50,
          "default": 20
        }
      },
      "feedCategory": {
        "name": "category",
        "in": "query",
        "required": false,
        "description": "Optional event category filter.",
        "schema": {
          "type": "string",
          "maxLength": 500
        }
      },
      "feedAction": {
        "name": "action",
        "in": "query",
        "required": false,
        "description": "Optional event action filter.",
        "schema": {
          "type": "string",
          "maxLength": 500
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
      },
      "eventsScope": {
        "name": "scope",
        "in": "query",
        "required": false,
        "description": "Which events are returned. `user` (default): only the caller's own events (unchanged behavior). `organization`: every member's events in the caller's session organization. Requires organization administration permission in the session organization; callers without it get 403.\n",
        "schema": {
          "type": "string",
          "enum": [
            "user",
            "organization"
          ],
          "default": "user"
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
        "description": "Payload for creating a new event. If visibility is absent, the event is private.",
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
          "visibility": {
            "description": "Who can see the event. `private` is the default; clients may set `public` for events eligible for the unauthenticated feed.",
            "x-oapi-codegen-extra-tags": {
              "json": "visibility,omitempty"
            },
            "type": "string",
            "enum": [
              "private",
              "public"
            ],
            "default": "private",
            "x-go-name": "EventVisibility"
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
          "severity": {
            "type": "string",
            "description": "Event level. MeshKit's producers set one of `emergency`, `alert`, `critical`, `error`, `warning`, `informational`, `debug` or `success`. The set is not closed on the wire - the event write APIs persist the value they are given - so consumers must tolerate other values.\n",
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "json": "severity,omitempty"
            }
          },
          "idempotencyKey": {
            "type": "string",
            "description": "Optional client-chosen key that makes recording this event safe to retry. Keys are scoped to the authenticated caller (organization and user), never to the client-settable `owner` field, so `owner` may be omitted without affecting deduplication. The first event a caller records with a key is kept, and a later create with the same key records nothing and answers 200 with that event, whatever the rest of the payload says. Use a value that names the occurrence, for example a run id, so a client replaying a local queue after a timeout never records a duplicate. Omit it for events that need no deduplication.\n",
            "minLength": 1,
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "json": "idempotencyKey,omitempty"
            }
          },
          "correlationKey": {
            "type": "string",
            "description": "Optional key naming the ongoing condition this event reports, so repeated occurrences count on one open event instead of recording one each (see createEvent). Name the condition, not the occurrence, and qualify it by the emitting source and component plus the subject, for example `meshery-server/k8s-connection/<connectionId>/unreachable`. Never use an error code alone: codes are scoped to the component that owns them. Unlike `idempotencyKey`, which makes one create safe to retry, this key spans many creates.\n",
            "minLength": 1,
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "json": "correlationKey,omitempty"
            }
          },
          "occurrenceCount": {
            "type": "integer",
            "description": "Number of occurrences this create reports, for a producer that counted repeats locally before sending. A create without a `correlationKey`, and a call that identifies no user, stores this value exactly as sent, including when it is omitted. For a call that identifies a user and carries a `correlationKey`, omitted means 1. An opening create stores that count, counting an open condition adds it, and an already-resolved insert stores it. A resolving create on that open event does not add it.\n",
            "minimum": 1,
            "x-oapi-codegen-extra-tags": {
              "json": "occurrenceCount,omitempty"
            }
          },
          "firstSeenAt": {
            "type": "string",
            "format": "date-time",
            "description": "When the producer first saw the occurrences this create reports. A call that identifies no user stores this value exactly as sent. For a call that identifies a user, omitted while opening a condition means `lastSeenAt`, or the time of receipt, and omitted on a resolving create that inserts an already resolved event means `resolvedAt`. Stored when that create opens a condition or inserts one already resolved; a close of an open condition keeps the stored time.\n",
            "x-oapi-codegen-extra-tags": {
              "json": "firstSeenAt,omitempty"
            }
          },
          "lastSeenAt": {
            "type": "string",
            "format": "date-time",
            "description": "When the producer last saw the occurrences this create reports. A call that identifies no user stores this value exactly as sent. For a call that identifies a user, omitted while opening a condition means `firstSeenAt`; omitted while counting an open condition, or while closing one, means the time of receipt; and omitted on a resolving create that inserts an already resolved event means `resolvedAt`.\n",
            "x-oapi-codegen-extra-tags": {
              "json": "lastSeenAt,omitempty"
            }
          },
          "resolvedAt": {
            "type": "string",
            "format": "date-time",
            "description": "When the condition named by `correlationKey` cleared. A call that identifies no user stores this value exactly as sent and does not match an open event. For a call that identifies a user, a create that carries it is a resolution: it closes that caller's open event with that key, copying this payload's `severity` and `description` onto the event when this payload carries them (an omitted field keeps the stored value) and setting `lastSeenAt` to the later of the stored time and this payload's `lastSeenAt` (the time of receipt when omitted), so the closed condition reads as cleared and the next occurrence opens a new condition (see createEvent). Give the resolution a severity and description that say what cleared, for example severity `success` and `Connection to cluster prod-1 restored`, under the condition's category.\n",
            "x-oapi-codegen-extra-tags": {
              "json": "resolvedAt,omitempty"
            }
          },
          "source": {
            "type": "string",
            "format": "uri-reference",
            "description": "Which surface emitted the event, as a CloudEvents-compatible `source` (a URI reference): `meshery-server`, `meshery-ui`, `mesheryctl`, `meshery-adapter-<name>` (for example `meshery-adapter-istio`), `layer5-cloud`, or another client's name. `systemId` says which instance; `source` says which kind of client, so a failure a person caused in the UI is told apart from the same failure from the CLI. An open set: a new surface needs no schema change.\n",
            "minLength": 1,
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "json": "source,omitempty"
            }
          },
          "type": {
            "type": "string",
            "description": "CloudEvents-compatible `type`: a reverse-DNS name of the kind of occurrence, for example `io.meshery.user.signup`. It does not replace `category` and `action`, which stay two free strings; `type` is for CloudEvents-aware consumers.\n",
            "minLength": 1,
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "json": "type,omitempty"
            }
          },
          "specversion": {
            "description": "The CloudEvents specification version the event's `source`, `type` and `id` are compatible with, when the producer sets them as CloudEvents attributes. A Meshery event is CloudEvents compatible; it is not a CloudEvent.\n",
            "type": "string",
            "enum": [
              "1.0"
            ],
            "x-go-type": "EventSpecVersion",
            "x-go-name": "SpecVersion",
            "x-oapi-codegen-extra-tags": {
              "json": "specversion,omitempty"
            }
          },
          "traceId": {
            "type": "string",
            "description": "W3C Trace Context `trace-id` (32 lowercase hex digits, not all zeros) of the user-level operation the event belongs to, so the event joins the OpenTelemetry trace that operation recorded. The client that starts the operation mints it, and every event of the operation and its sub-operations carries it; the server never mints one at persist time.\n",
            "minLength": 32,
            "maxLength": 32,
            "pattern": "^[0-9a-f]*[1-9a-f][0-9a-f]*$",
            "x-id-format": "external",
            "x-go-name": "TraceID",
            "x-oapi-codegen-extra-tags": {
              "json": "traceId,omitempty"
            }
          },
          "parentId": {
            "type": "string",
            "description": "W3C Trace Context `parent-id` (16 lowercase hex digits, not all zeros): the span of the sub-operation that emitted the event, so the events of one operation form its tree. Minted by the client with `traceId`, never by the server.\n",
            "minLength": 16,
            "maxLength": 16,
            "pattern": "^[0-9a-f]*[1-9a-f][0-9a-f]*$",
            "x-id-format": "external",
            "x-go-name": "ParentID",
            "x-oapi-codegen-extra-tags": {
              "json": "parentId,omitempty"
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
          "visibility": {
            "type": "string",
            "description": "Who can see the event. `private` (the default, set by Layer5 Cloud) means visible only inside the event's organization. `public` means the event may appear on the unauthenticated event feed, subject to the owner's `shareActivityPublicly` preference at read time.",
            "enum": [
              "private",
              "public"
            ],
            "default": "private",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "visibility",
              "json": "visibility"
            }
          },
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
            "description": "System identifier of the event source: a Meshery Server instance ID, the nil UUID for an event the provider emits itself, or the connection ID of the client machine that emitted it (for example a desktop client recording a run). Asserted by the sender, not checked.\n",
            "maxLength": 255,
            "x-id-format": "external",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "system_id",
              "json": "systemId"
            }
          },
          "organizationId": {
            "type": "string",
            "format": "uuid",
            "description": "The organization the event belongs to (see Event.organizationId). Set by the server; lets an organization-scope listing show each row's tenant.\n",
            "readOnly": true,
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-name": "OrganizationID",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "organization_id",
              "json": "organizationId"
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
          "avatarUrl": {
            "type": "string",
            "format": "uri",
            "maxLength": 500,
            "description": "URL to the avatar image of the user associated with the event."
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
          },
          "correlationKey": {
            "type": "string",
            "description": "Key of the ongoing condition the event records (see Event.correlationKey); omitted for an event that reports no condition.",
            "minLength": 1,
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "correlation_key"
            }
          },
          "occurrenceCount": {
            "type": "integer",
            "description": "How many occurrences of the condition the event counts (see Event.occurrenceCount). A create without a `correlationKey`, and a call that identifies no user, stores the payload's value exactly as sent, so an omitted count stays omitted. For a call that identifies a user and carries a `correlationKey`, it is the payload's `occurrenceCount` (1 when omitted) when the event was recorded, opening a condition or inserted already resolved, growing only as later creates that do not resolve are counted. A resolving create on the open event does not add to it.\n",
            "minimum": 1,
            "x-oapi-codegen-extra-tags": {
              "db": "occurrence_count"
            }
          },
          "firstSeenAt": {
            "type": "string",
            "format": "date-time",
            "description": "When the condition's first counted occurrence was seen (see Event.firstSeenAt). A call that identifies no user stores the payload's value exactly as sent. For a call that identifies a user, an opening create stores the payload's `firstSeenAt`, else its `lastSeenAt`, else the time of receipt. An already-resolved insert stores the payload's `firstSeenAt`, else `resolvedAt`. A close keeps the stored time. Omitted when the payload omitted it and the create applied no default.\n",
            "x-oapi-codegen-extra-tags": {
              "db": "first_seen_at"
            }
          },
          "lastSeenAt": {
            "type": "string",
            "format": "date-time",
            "description": "When the condition was last seen (see Event.lastSeenAt). A call that identifies no user stores the payload's value exactly as sent. For a call that identifies a user, an opening create stores the payload's `lastSeenAt`, else `firstSeenAt`. An already-resolved insert stores the payload's `lastSeenAt`, else `resolvedAt`. Counting an occurrence, or closing one, brings the stored time forward. Omitted when the payload omitted it and the create applied no default.\n",
            "x-oapi-codegen-extra-tags": {
              "db": "last_seen_at"
            }
          },
          "resolvedAt": {
            "type": "string",
            "format": "date-time",
            "description": "When the condition cleared (see Event.resolvedAt). A call that identifies no user stores the payload's value exactly as sent. For a call that identifies a user it is omitted while the condition is open.\n",
            "x-oapi-codegen-extra-tags": {
              "db": "resolved_at"
            }
          },
          "source": {
            "type": "string",
            "format": "uri-reference",
            "description": "Which surface emitted the event, for example `meshery-server` or `mesheryctl` (see Event.source).",
            "minLength": 1,
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "source"
            }
          },
          "type": {
            "type": "string",
            "description": "CloudEvents-compatible `type`, for example `io.meshery.user.signup` (see Event.type).",
            "minLength": 1,
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "type"
            }
          },
          "specversion": {
            "description": "The CloudEvents specification version the event is compatible with (see Event.specversion).",
            "type": "string",
            "enum": [
              "1.0"
            ],
            "x-go-type": "EventSpecVersion",
            "x-go-name": "SpecVersion",
            "x-oapi-codegen-extra-tags": {
              "db": "specversion"
            }
          },
          "traceId": {
            "type": "string",
            "description": "W3C Trace Context `trace-id` of the operation the event belongs to (see Event.traceId).",
            "minLength": 32,
            "maxLength": 32,
            "pattern": "^[0-9a-f]*[1-9a-f][0-9a-f]*$",
            "x-id-format": "external",
            "x-go-name": "TraceID",
            "x-oapi-codegen-extra-tags": {
              "db": "trace_id"
            }
          },
          "parentId": {
            "type": "string",
            "description": "W3C Trace Context `parent-id` of the sub-operation that emitted the event (see Event.parentId).",
            "minLength": 16,
            "maxLength": 16,
            "pattern": "^[0-9a-f]*[1-9a-f][0-9a-f]*$",
            "x-id-format": "external",
            "x-go-name": "ParentID",
            "x-oapi-codegen-extra-tags": {
              "db": "parent_id"
            }
          },
          "id": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "id"
            }
          },
          "actedUpon": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "acted_upon"
            }
          },
          "operationId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-name": "OperationID",
            "x-oapi-codegen-extra-tags": {
              "db": "operation_id"
            }
          },
          "severity": {
            "type": "string",
            "description": "Event level (see Event.severity). MeshKit's producers set one of `emergency`, `alert`, `critical`, `error`, `warning`, `informational`, `debug` or `success`. The set is not closed on the wire, so consumers must tolerate other values.\n",
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "severity"
            }
          },
          "status": {
            "type": "string",
            "description": "Read state of the event (see Event.status). MeshKit records new events as `unread`, and acknowledged ones become `read`; consumers must tolerate other values.\n",
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "status"
            }
          },
          "metadata": {
            "type": "object",
            "description": "Event-specific details, the same nullable free-form map as Event.metadata. `null` when the producer attached none. On an error event, `metadata.error` holds only the MeshKit error, never the design or the request that failed: an EventError (the error's code, rendered descriptions, the causes and remediations that apply, `matchedCauses` and instance `details`), except that a design validation event whose operation did not complete (`status` `error`) carries it as a DesignEventOperationError. Rows recorded before EventError carry MeshKit's Go field names instead (`Code`, `Severity` as a number, `ShortDescription`, `LongDescription`, `ProbableCause` and `SuggestedRemediation` as lists); readers fall back to those keys when `code` is absent and treat their flat lists as unpaired.\n",
            "additionalProperties": true,
            "nullable": true,
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "metadata",
              "json": "metadata,omitempty"
            }
          },
          "updatedAt": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the event was last updated (see Event.updatedAt).",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at"
            }
          },
          "deletedAt": {
            "type": "string",
            "format": "date-time",
            "nullable": true,
            "description": "Timestamp when the event was soft-deleted; omitted when it was not (see Event.deletedAt).",
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at",
              "json": "deletedAt,omitempty"
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
          "organizationId",
          "createdAt",
          "updatedAt",
          "visibility"
        ],
        "properties": {
          "id": {
            "description": "Event ID.",
            "x-oapi-codegen-extra-tags": {
              "db": "id"
            },
            "x-order": 7,
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
            "x-order": 1,
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
            },
            "x-order": 2
          },
          "category": {
            "type": "string",
            "description": "Resource kind the operation was invoked on, for example `pattern`.",
            "maxLength": 500,
            "x-oapi-codegen-extra-tags": {
              "db": "category"
            },
            "x-order": 3
          },
          "description": {
            "type": "string",
            "description": "Human-readable summary of what happened.",
            "maxLength": 5000,
            "x-oapi-codegen-extra-tags": {
              "db": "description"
            },
            "x-order": 6
          },
          "metadata": {
            "type": "object",
            "description": "Event-specific details; the structure varies by event kind. `null` when the producer attached none. It stays a free-form map; design events fill it with a named shape: RelationshipEvaluationEventMetadata (category `relationship`, action `evaluation`), DesignValidationEventMetadata (category `pattern`, actions `validate`, `deploy`, `undeploy`, `dry-run`) and DesignSavedEventMetadata (category `pattern`, actions `create`, `update`); ScheduleCompletedEventMetadata (category `schedule`, action `completed`); DesignEventIdentity names the design. Never put design contents into event metadata - no `designFile`, `patternFile`, `components`, `relationships`, `trace`, `evaluationResponse`, the raw `summary` or `validationResult`. Meshery Server applies a 16 KB guard that drops oversized metadata down to the identity fields (`designId`, `designName`, `designVersion`, `designLink`, `viewLink`). On an error event, `metadata.error` holds only the MeshKit error, never the design or the request that failed: an EventError (the error's code, rendered descriptions, the causes and remediations that apply, `matchedCauses` and instance `details`; docs/error-definition-contract.md), except that a design validation event whose operation did not complete (`status` `error`) carries it as a DesignEventOperationError. Rows recorded before EventError carry MeshKit's Go field names instead (`Code`, `Severity` as a number, `ShortDescription`, `LongDescription`, `ProbableCause` and `SuggestedRemediation` as lists); readers fall back to those keys when `code` is absent and treat their flat lists as unpaired. Older Meshery Cloud rows may carry the legacy `design_name` and `view_link` keys; readers should fall back to them when `designName` and `viewLink` are absent.\n",
            "additionalProperties": true,
            "nullable": true,
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "metadata"
            },
            "x-order": 8
          },
          "operationId": {
            "description": "ID correlating the events one operation emitted.",
            "x-go-name": "OperationID",
            "x-oapi-codegen-extra-tags": {
              "db": "operation_id"
            },
            "x-order": 9,
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
            },
            "x-order": 12
          },
          "status": {
            "type": "string",
            "description": "Read state of the event. MeshKit records new events as `unread`, and acknowledged ones become `read`; the event status APIs persist any value they are given, so consumers must tolerate other values.\n",
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "status"
            },
            "x-order": 13
          },
          "systemId": {
            "description": "ID of the system instance that emitted the event. A Meshery Server sends its server instance ID; an event the provider emits itself carries the nil UUID. A client that registered a connection for its machine (for example a desktop client) sets its connection ID, so an event that records a run names the computer that ran it and can be joined to the claim it released (`Claim.outcomeEventId`) and to the connection (`connections.id`). The value is asserted by the sender and is not checked against the caller's connections.\n",
            "x-order": 14,
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
            },
            "x-order": 10
          },
          "organizationId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "readOnly": true,
            "x-go-name": "OrganizationID",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "organization_id",
              "json": "organizationId"
            },
            "x-order": 11
          },
          "createdAt": {
            "description": "Timestamp when the event was recorded.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at"
            },
            "x-order": 4,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp when the event was last updated.",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at"
            },
            "x-order": 15,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "visibility": {
            "description": "Who can see the event. Defaults to `private`.",
            "x-oapi-codegen-extra-tags": {
              "db": "visibility",
              "json": "visibility"
            },
            "x-order": 16,
            "type": "string",
            "enum": [
              "private",
              "public"
            ],
            "default": "private",
            "x-go-name": "EventVisibility"
          },
          "deletedAt": {
            "description": "Timestamp when the event was soft-deleted; omitted when it was not.",
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at"
            },
            "x-order": 5,
            "x-go-type": "meshcore.NullTime",
            "x-go-type-import": {
              "name": "meshcore",
              "path": "github.com/meshery/schemas/models/core"
            },
            "type": "string",
            "format": "date-time",
            "nullable": true,
            "x-go-type-skip-optional-pointer": true
          },
          "correlationKey": {
            "type": "string",
            "description": "Key of the ongoing condition the event records (see EventPayload.correlationKey and createEvent); omitted for an event that reports no condition.\n",
            "minLength": 1,
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "correlation_key"
            },
            "x-order": 17
          },
          "occurrenceCount": {
            "type": "integer",
            "description": "How many occurrences of the condition this event counts. A create without a `correlationKey`, and a call that identifies no user, stores the payload's value exactly as sent, so an omitted count stays omitted. For a call that identifies a user and carries a `correlationKey`, an opening create or a resolving create inserted already resolved stores the payload's `occurrenceCount` (1 when omitted). Later creates that do not resolve add their count. A resolving create on the open event does not add to it.\n",
            "minimum": 1,
            "x-oapi-codegen-extra-tags": {
              "db": "occurrence_count"
            },
            "x-order": 18
          },
          "firstSeenAt": {
            "type": "string",
            "format": "date-time",
            "description": "When the condition's first counted occurrence was seen. A call that identifies no user stores the payload's value exactly as sent. For a call that identifies a user, an opening create stores the payload's `firstSeenAt`, else its `lastSeenAt`, else the time of receipt. An already-resolved insert stores the payload's `firstSeenAt`, else `resolvedAt`. A close keeps the stored time. Omitted when the payload omitted it and the create applied no default.\n",
            "x-oapi-codegen-extra-tags": {
              "db": "first_seen_at"
            },
            "x-order": 19
          },
          "lastSeenAt": {
            "type": "string",
            "format": "date-time",
            "description": "When the condition was last seen. A call that identifies no user stores the payload's value exactly as sent. For a call that identifies a user, an opening create stores the payload's `lastSeenAt`, else `firstSeenAt`. An already-resolved insert stores the payload's `lastSeenAt`, else `resolvedAt`. Counting an occurrence, or closing one, brings the stored time forward. Omitted when the payload omitted it and the create applied no default.\n",
            "x-oapi-codegen-extra-tags": {
              "db": "last_seen_at"
            },
            "x-order": 20
          },
          "resolvedAt": {
            "type": "string",
            "format": "date-time",
            "description": "When the condition cleared. A call that identifies no user stores the payload's value exactly as sent and does not close another event. For a call that identifies a user it is omitted while the condition is open, and set by a resolution (see createEvent), which also replaces `severity` and `description` with the payload's when the payload carries them (an omitted field keeps the stored value) and brings `lastSeenAt` forward, after which a new occurrence opens a new event.\n",
            "x-oapi-codegen-extra-tags": {
              "db": "resolved_at"
            },
            "x-order": 21
          },
          "source": {
            "type": "string",
            "format": "uri-reference",
            "description": "Which surface emitted the event (CloudEvents-compatible `source`), for example `meshery-server`, `meshery-ui`, `mesheryctl` or `meshery-adapter-istio`; see EventPayload.source. Omitted when the producer did not say.\n",
            "minLength": 1,
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "source"
            },
            "x-order": 22
          },
          "type": {
            "type": "string",
            "description": "CloudEvents-compatible `type`, for example `io.meshery.user.signup`; see EventPayload.type. `category` and `action` stay the event's classification.\n",
            "minLength": 1,
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "type"
            },
            "x-order": 23
          },
          "specversion": {
            "description": "The CloudEvents specification version the event is compatible with; see EventPayload.specversion.",
            "type": "string",
            "enum": [
              "1.0"
            ],
            "x-go-type": "EventSpecVersion",
            "x-go-name": "SpecVersion",
            "x-oapi-codegen-extra-tags": {
              "db": "specversion"
            },
            "x-order": 24
          },
          "traceId": {
            "type": "string",
            "description": "W3C Trace Context `trace-id` of the operation the event belongs to, as its client minted it; see EventPayload.traceId.\n",
            "minLength": 32,
            "maxLength": 32,
            "pattern": "^[0-9a-f]*[1-9a-f][0-9a-f]*$",
            "x-id-format": "external",
            "x-go-name": "TraceID",
            "x-oapi-codegen-extra-tags": {
              "db": "trace_id"
            },
            "x-order": 25
          },
          "parentId": {
            "type": "string",
            "description": "W3C Trace Context `parent-id` of the sub-operation that emitted the event; see EventPayload.parentId.\n",
            "minLength": 16,
            "maxLength": 16,
            "pattern": "^[0-9a-f]*[1-9a-f][0-9a-f]*$",
            "x-id-format": "external",
            "x-go-name": "ParentID",
            "x-oapi-codegen-extra-tags": {
              "db": "parent_id"
            },
            "x-order": 26
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
                "visibility": {
                  "type": "string",
                  "description": "Who can see the event. `private` (the default, set by Layer5 Cloud) means visible only inside the event's organization. `public` means the event may appear on the unauthenticated event feed, subject to the owner's `shareActivityPublicly` preference at read time.",
                  "enum": [
                    "private",
                    "public"
                  ],
                  "default": "private",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "visibility",
                    "json": "visibility"
                  }
                },
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
                  "description": "System identifier of the event source: a Meshery Server instance ID, the nil UUID for an event the provider emits itself, or the connection ID of the client machine that emitted it (for example a desktop client recording a run). Asserted by the sender, not checked.\n",
                  "maxLength": 255,
                  "x-id-format": "external",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "system_id",
                    "json": "systemId"
                  }
                },
                "organizationId": {
                  "type": "string",
                  "format": "uuid",
                  "description": "The organization the event belongs to (see Event.organizationId). Set by the server; lets an organization-scope listing show each row's tenant.\n",
                  "readOnly": true,
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-go-name": "OrganizationID",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "organization_id",
                    "json": "organizationId"
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
                "avatarUrl": {
                  "type": "string",
                  "format": "uri",
                  "maxLength": 500,
                  "description": "URL to the avatar image of the user associated with the event."
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
                },
                "correlationKey": {
                  "type": "string",
                  "description": "Key of the ongoing condition the event records (see Event.correlationKey); omitted for an event that reports no condition.",
                  "minLength": 1,
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "correlation_key"
                  }
                },
                "occurrenceCount": {
                  "type": "integer",
                  "description": "How many occurrences of the condition the event counts (see Event.occurrenceCount). A create without a `correlationKey`, and a call that identifies no user, stores the payload's value exactly as sent, so an omitted count stays omitted. For a call that identifies a user and carries a `correlationKey`, it is the payload's `occurrenceCount` (1 when omitted) when the event was recorded, opening a condition or inserted already resolved, growing only as later creates that do not resolve are counted. A resolving create on the open event does not add to it.\n",
                  "minimum": 1,
                  "x-oapi-codegen-extra-tags": {
                    "db": "occurrence_count"
                  }
                },
                "firstSeenAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "When the condition's first counted occurrence was seen (see Event.firstSeenAt). A call that identifies no user stores the payload's value exactly as sent. For a call that identifies a user, an opening create stores the payload's `firstSeenAt`, else its `lastSeenAt`, else the time of receipt. An already-resolved insert stores the payload's `firstSeenAt`, else `resolvedAt`. A close keeps the stored time. Omitted when the payload omitted it and the create applied no default.\n",
                  "x-oapi-codegen-extra-tags": {
                    "db": "first_seen_at"
                  }
                },
                "lastSeenAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "When the condition was last seen (see Event.lastSeenAt). A call that identifies no user stores the payload's value exactly as sent. For a call that identifies a user, an opening create stores the payload's `lastSeenAt`, else `firstSeenAt`. An already-resolved insert stores the payload's `lastSeenAt`, else `resolvedAt`. Counting an occurrence, or closing one, brings the stored time forward. Omitted when the payload omitted it and the create applied no default.\n",
                  "x-oapi-codegen-extra-tags": {
                    "db": "last_seen_at"
                  }
                },
                "resolvedAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "When the condition cleared (see Event.resolvedAt). A call that identifies no user stores the payload's value exactly as sent. For a call that identifies a user it is omitted while the condition is open.\n",
                  "x-oapi-codegen-extra-tags": {
                    "db": "resolved_at"
                  }
                },
                "source": {
                  "type": "string",
                  "format": "uri-reference",
                  "description": "Which surface emitted the event, for example `meshery-server` or `mesheryctl` (see Event.source).",
                  "minLength": 1,
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "source"
                  }
                },
                "type": {
                  "type": "string",
                  "description": "CloudEvents-compatible `type`, for example `io.meshery.user.signup` (see Event.type).",
                  "minLength": 1,
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "type"
                  }
                },
                "specversion": {
                  "description": "The CloudEvents specification version the event is compatible with (see Event.specversion).",
                  "type": "string",
                  "enum": [
                    "1.0"
                  ],
                  "x-go-type": "EventSpecVersion",
                  "x-go-name": "SpecVersion",
                  "x-oapi-codegen-extra-tags": {
                    "db": "specversion"
                  }
                },
                "traceId": {
                  "type": "string",
                  "description": "W3C Trace Context `trace-id` of the operation the event belongs to (see Event.traceId).",
                  "minLength": 32,
                  "maxLength": 32,
                  "pattern": "^[0-9a-f]*[1-9a-f][0-9a-f]*$",
                  "x-id-format": "external",
                  "x-go-name": "TraceID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "trace_id"
                  }
                },
                "parentId": {
                  "type": "string",
                  "description": "W3C Trace Context `parent-id` of the sub-operation that emitted the event (see Event.parentId).",
                  "minLength": 16,
                  "maxLength": 16,
                  "pattern": "^[0-9a-f]*[1-9a-f][0-9a-f]*$",
                  "x-id-format": "external",
                  "x-go-name": "ParentID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "parent_id"
                  }
                },
                "id": {
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "id"
                  }
                },
                "actedUpon": {
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "acted_upon"
                  }
                },
                "operationId": {
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-go-name": "OperationID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "operation_id"
                  }
                },
                "severity": {
                  "type": "string",
                  "description": "Event level (see Event.severity). MeshKit's producers set one of `emergency`, `alert`, `critical`, `error`, `warning`, `informational`, `debug` or `success`. The set is not closed on the wire, so consumers must tolerate other values.\n",
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "severity"
                  }
                },
                "status": {
                  "type": "string",
                  "description": "Read state of the event (see Event.status). MeshKit records new events as `unread`, and acknowledged ones become `read`; consumers must tolerate other values.\n",
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "status"
                  }
                },
                "metadata": {
                  "type": "object",
                  "description": "Event-specific details, the same nullable free-form map as Event.metadata. `null` when the producer attached none. On an error event, `metadata.error` holds only the MeshKit error, never the design or the request that failed: an EventError (the error's code, rendered descriptions, the causes and remediations that apply, `matchedCauses` and instance `details`), except that a design validation event whose operation did not complete (`status` `error`) carries it as a DesignEventOperationError. Rows recorded before EventError carry MeshKit's Go field names instead (`Code`, `Severity` as a number, `ShortDescription`, `LongDescription`, `ProbableCause` and `SuggestedRemediation` as lists); readers fall back to those keys when `code` is absent and treat their flat lists as unpaired.\n",
                  "additionalProperties": true,
                  "nullable": true,
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "metadata",
                    "json": "metadata,omitempty"
                  }
                },
                "updatedAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Timestamp when the event was last updated (see Event.updatedAt).",
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at"
                  }
                },
                "deletedAt": {
                  "type": "string",
                  "format": "date-time",
                  "nullable": true,
                  "description": "Timestamp when the event was soft-deleted; omitted when it was not (see Event.deletedAt).",
                  "x-oapi-codegen-extra-tags": {
                    "db": "deleted_at",
                    "json": "deletedAt,omitempty"
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
      "EventSpecVersion": {
        "type": "string",
        "description": "A CloudEvents specification version a Meshery event is compatible with. Only `1.0` is defined.\n",
        "enum": [
          "1.0"
        ],
        "x-enum-varnames": [
          "SpecVersion10"
        ]
      },
      "EventVisibility": {
        "type": "string",
        "description": "Who can see the event. `private` (the default, set by Layer5 Cloud) means visible only inside the event's organization. `public` means the event may appear on the unauthenticated event feed, subject to the owner's `shareActivityPublicly` preference at read time. Clients such as Blowhorn decide whether to mark their own events public.",
        "enum": [
          "private",
          "public"
        ],
        "default": "private",
        "x-go-name": "EventVisibility"
      },
      "EventFeedItem": {
        "type": "object",
        "additionalProperties": false,
        "description": "An event projected into the public feed. It never includes email,\nfirstName, lastName, description, provider or raw metadata.\n`platform`, `role`, `line` and `networks` are projected from\nScheduleCompletedEventMetadata; events without valid required\nmetadata are skipped. Public profile fields are resolved by Cloud at\nread time for every served owner (live, active, and\nshareActivityPublicly on).\n",
        "required": [
          "id",
          "userId",
          "category",
          "action",
          "createdAt",
          "visibility",
          "platform",
          "role",
          "line"
        ],
        "properties": {
          "id": {
            "description": "Event ID.",
            "x-go-name": "ID",
            "x-order": 1,
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
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
            "x-order": 2
          },
          "category": {
            "type": "string",
            "description": "Event category.",
            "maxLength": 500,
            "x-order": 3
          },
          "action": {
            "type": "string",
            "description": "Event action.",
            "maxLength": 500,
            "x-order": 4
          },
          "createdAt": {
            "description": "Event creation time; the feed is ordered newest first.",
            "x-order": 5,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "visibility": {
            "description": "Always `public` in the feed.",
            "x-order": 6,
            "type": "string",
            "enum": [
              "private",
              "public"
            ],
            "default": "private",
            "x-go-name": "EventVisibility"
          },
          "platform": {
            "type": "string",
            "description": "Platform from ScheduleCompletedEventMetadata.",
            "enum": [
              "linkedin",
              "x",
              "reddit",
              "hacker-news",
              "slack",
              "bluesky",
              "github"
            ],
            "x-order": 7
          },
          "role": {
            "type": "string",
            "description": "Role from ScheduleCompletedEventMetadata.",
            "minLength": 3,
            "maxLength": 40,
            "x-order": 8
          },
          "line": {
            "type": "string",
            "description": "One-line result from ScheduleCompletedEventMetadata.",
            "minLength": 10,
            "maxLength": 120,
            "x-order": 9
          },
          "networks": {
            "type": "array",
            "description": "Networks from ScheduleCompletedEventMetadata, when present.",
            "minItems": 1,
            "maxItems": 20,
            "items": {
              "type": "string",
              "minLength": 1,
              "maxLength": 255
            },
            "x-oapi-codegen-extra-tags": {
              "json": "networks,omitempty"
            },
            "x-order": 10
          },
          "displayName": {
            "type": "string",
            "description": "The same value PublicUser.username carries for the owner. Never email. Resolved for every served owner; omitted when empty.\n",
            "maxLength": 200,
            "x-oapi-codegen-extra-tags": {
              "json": "displayName,omitempty"
            },
            "x-order": 11
          },
          "avatarUrl": {
            "type": "string",
            "format": "uri",
            "maxLength": 500,
            "description": "Public avatar URL; resolved for every served owner, omitted when empty.",
            "x-go-name": "AvatarURL",
            "x-oapi-codegen-extra-tags": {
              "json": "avatarUrl,omitempty"
            },
            "x-order": 12
          },
          "organizationName": {
            "type": "string",
            "description": "Public organization name; omitted when organization memberships are not public to an anonymous caller.",
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "json": "organizationName,omitempty"
            },
            "x-order": 13
          },
          "publicProfileUrl": {
            "type": "string",
            "format": "uri",
            "description": "HTTPS URL of the user's public profile.",
            "pattern": "^https://",
            "maxLength": 2048,
            "x-go-name": "PublicProfileURL",
            "x-oapi-codegen-extra-tags": {
              "json": "publicProfileUrl,omitempty"
            },
            "x-order": 14
          }
        }
      },
      "EventFeedPage": {
        "type": "object",
        "additionalProperties": false,
        "description": "One page of event feed items, newest first.",
        "required": [
          "page",
          "pageSize",
          "totalCount",
          "data"
        ],
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
            "maximum": 50
          },
          "totalCount": {
            "type": "integer",
            "description": "Total number of matching feed events.",
            "minimum": 0
          },
          "data": {
            "type": "array",
            "maxItems": 50,
            "items": {
              "type": "object",
              "additionalProperties": false,
              "description": "An event projected into the public feed. It never includes email,\nfirstName, lastName, description, provider or raw metadata.\n`platform`, `role`, `line` and `networks` are projected from\nScheduleCompletedEventMetadata; events without valid required\nmetadata are skipped. Public profile fields are resolved by Cloud at\nread time for every served owner (live, active, and\nshareActivityPublicly on).\n",
              "required": [
                "id",
                "userId",
                "category",
                "action",
                "createdAt",
                "visibility",
                "platform",
                "role",
                "line"
              ],
              "properties": {
                "id": {
                  "description": "Event ID.",
                  "x-go-name": "ID",
                  "x-order": 1,
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
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
                  "x-order": 2
                },
                "category": {
                  "type": "string",
                  "description": "Event category.",
                  "maxLength": 500,
                  "x-order": 3
                },
                "action": {
                  "type": "string",
                  "description": "Event action.",
                  "maxLength": 500,
                  "x-order": 4
                },
                "createdAt": {
                  "description": "Event creation time; the feed is ordered newest first.",
                  "x-order": 5,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "visibility": {
                  "description": "Always `public` in the feed.",
                  "x-order": 6,
                  "type": "string",
                  "enum": [
                    "private",
                    "public"
                  ],
                  "default": "private",
                  "x-go-name": "EventVisibility"
                },
                "platform": {
                  "type": "string",
                  "description": "Platform from ScheduleCompletedEventMetadata.",
                  "enum": [
                    "linkedin",
                    "x",
                    "reddit",
                    "hacker-news",
                    "slack",
                    "bluesky",
                    "github"
                  ],
                  "x-order": 7
                },
                "role": {
                  "type": "string",
                  "description": "Role from ScheduleCompletedEventMetadata.",
                  "minLength": 3,
                  "maxLength": 40,
                  "x-order": 8
                },
                "line": {
                  "type": "string",
                  "description": "One-line result from ScheduleCompletedEventMetadata.",
                  "minLength": 10,
                  "maxLength": 120,
                  "x-order": 9
                },
                "networks": {
                  "type": "array",
                  "description": "Networks from ScheduleCompletedEventMetadata, when present.",
                  "minItems": 1,
                  "maxItems": 20,
                  "items": {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "x-oapi-codegen-extra-tags": {
                    "json": "networks,omitempty"
                  },
                  "x-order": 10
                },
                "displayName": {
                  "type": "string",
                  "description": "The same value PublicUser.username carries for the owner. Never email. Resolved for every served owner; omitted when empty.\n",
                  "maxLength": 200,
                  "x-oapi-codegen-extra-tags": {
                    "json": "displayName,omitempty"
                  },
                  "x-order": 11
                },
                "avatarUrl": {
                  "type": "string",
                  "format": "uri",
                  "maxLength": 500,
                  "description": "Public avatar URL; resolved for every served owner, omitted when empty.",
                  "x-go-name": "AvatarURL",
                  "x-oapi-codegen-extra-tags": {
                    "json": "avatarUrl,omitempty"
                  },
                  "x-order": 12
                },
                "organizationName": {
                  "type": "string",
                  "description": "Public organization name; omitted when organization memberships are not public to an anonymous caller.",
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "json": "organizationName,omitempty"
                  },
                  "x-order": 13
                },
                "publicProfileUrl": {
                  "type": "string",
                  "format": "uri",
                  "description": "HTTPS URL of the user's public profile.",
                  "pattern": "^https://",
                  "maxLength": 2048,
                  "x-go-name": "PublicProfileURL",
                  "x-oapi-codegen-extra-tags": {
                    "json": "publicProfileUrl,omitempty"
                  },
                  "x-order": 14
                }
              }
            },
            "description": "Events for the requested page, newest first."
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
      },
      "DesignEventIdentity": {
        "type": "object",
        "description": "The fields that identify the design a design event is about. Every design event that names a design carries them, and they are what remains when Meshery Server's 16 KB guard drops oversized metadata. Event metadata names a design, it never carries one: never put design contents into event metadata - no `designFile`, `patternFile`, `components`, `relationships`, `trace`, `evaluationResponse`, the raw `summary` or `validationResult`. Meshery Server applies a 16 KB guard that drops oversized metadata down to these identity fields. Older Meshery Cloud rows may carry the legacy `design_name` and `view_link` keys instead of `designName` and `viewLink`; readers should fall back to them.\n",
        "additionalProperties": false,
        "required": [
          "designId"
        ],
        "properties": {
          "designId": {
            "type": "string",
            "format": "uuid",
            "description": "ID of the design the event is about.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-name": "DesignID"
          },
          "designName": {
            "type": "string",
            "description": "Name of the design when the event was recorded.",
            "maxLength": 255,
            "x-go-name": "DesignName"
          },
          "designVersion": {
            "type": "string",
            "description": "Version of the design when the event was recorded, for example `v0.0.3`; omitted when the producer does not know it.",
            "maxLength": 50,
            "x-go-name": "DesignVersion"
          },
          "designLink": {
            "type": "string",
            "format": "uri",
            "description": "Link that opens the design in the designer view, for example `<base>/extension/meshmap?mode=design&design=<designId>`.\n",
            "maxLength": 2048,
            "x-go-name": "DesignLink"
          },
          "viewLink": {
            "type": "string",
            "format": "uri",
            "description": "Link that opens the design in the operator view, for example `<base>/extension/meshmap?mode=operator&type=view&design_id=<designId>`; omitted when the producer has no operator view to link.\n",
            "maxLength": 2048,
            "x-go-name": "ViewLink"
          }
        }
      },
      "RelationshipEvaluationEventMetadata": {
        "type": "object",
        "description": "Metadata of a relationship evaluation event (category `relationship`, action `evaluation`): the design's identity fields (DesignEventIdentity) plus counts of what the evaluation changed. It summarizes the evaluation; it does not carry it. Never put design contents into event metadata - no `designFile`, `patternFile`, `components`, `relationships`, `trace`, `evaluationResponse`, the raw `summary` or `validationResult`. Meshery Server applies a 16 KB guard that drops oversized metadata down to the identity fields.\n",
        "additionalProperties": false,
        "required": [
          "designId"
        ],
        "properties": {
          "designId": {
            "type": "string",
            "format": "uuid",
            "description": "ID of the design the event is about.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-name": "DesignID"
          },
          "designName": {
            "type": "string",
            "description": "Name of the design when the event was recorded.",
            "maxLength": 255,
            "x-go-name": "DesignName"
          },
          "designVersion": {
            "type": "string",
            "description": "Version of the design when the event was recorded, for example `v0.0.3`; omitted when the producer does not know it.",
            "maxLength": 50,
            "x-go-name": "DesignVersion"
          },
          "designLink": {
            "type": "string",
            "format": "uri",
            "description": "Link that opens the design in the designer view, for example `<base>/extension/meshmap?mode=design&design=<designId>`.\n",
            "maxLength": 2048,
            "x-go-name": "DesignLink"
          },
          "viewLink": {
            "type": "string",
            "format": "uri",
            "description": "Link that opens the design in the operator view, for example `<base>/extension/meshmap?mode=operator&type=view&design_id=<designId>`; omitted when the producer has no operator view to link.\n",
            "maxLength": 2048,
            "x-go-name": "ViewLink"
          },
          "historyTitle": {
            "type": "string",
            "description": "One-line title of the evaluation for the design's history, for example `3 changes made at version v0.0.3`.",
            "maxLength": 500,
            "x-go-name": "HistoryTitle"
          },
          "evaluatedAt": {
            "type": "string",
            "format": "date-time",
            "description": "When the evaluation ran.",
            "x-go-name": "EvaluatedAt"
          },
          "relationshipsAdded": {
            "type": "integer",
            "minimum": 0,
            "description": "Number of relationships the evaluation added to the design.",
            "x-go-name": "RelationshipsAdded"
          },
          "relationshipsRemoved": {
            "type": "integer",
            "minimum": 0,
            "description": "Number of relationships the evaluation removed from the design.",
            "x-go-name": "RelationshipsRemoved"
          },
          "relationshipsUpdated": {
            "type": "integer",
            "minimum": 0,
            "description": "Number of existing relationships the evaluation updated.",
            "x-go-name": "RelationshipsUpdated"
          },
          "evaluationStatus": {
            "type": "string",
            "description": "Outcome of the evaluation as the evaluator reports it, for example `completed`; consumers must tolerate values they do not know.",
            "maxLength": 255,
            "x-go-name": "EvaluationStatus"
          },
          "evaluationDurationMs": {
            "type": "integer",
            "minimum": 0,
            "description": "How long the evaluation took, in milliseconds.",
            "x-go-name": "EvaluationDurationMs"
          }
        }
      },
      "DesignValidationEventMetadata": {
        "type": "object",
        "description": "Metadata of a design validate, deploy, undeploy or dry-run event (category `pattern`, action `validate`, `deploy`, `undeploy` or `dry-run`): the design's identity fields (DesignEventIdentity) plus the outcome and at most 20 of its errors. It summarizes the result; it does not carry it. When the operation did not complete (`status` `error`), there is no verdict: `errors` is empty or omitted, `errorCount` and `truncated` are omitted, the identity fields are kept, `error` names why the operation failed, and the event is recorded with severity `error` under its usual category `pattern` and action (`validate` for a design validation). Never put design contents into event metadata - no `designFile`, `patternFile`, `components`, `relationships`, `trace`, `evaluationResponse`, the raw `summary` or `validationResult`. Meshery Server applies a 16 KB guard that drops oversized metadata down to the identity fields.\n",
        "additionalProperties": false,
        "required": [
          "designId"
        ],
        "properties": {
          "designId": {
            "type": "string",
            "format": "uuid",
            "description": "ID of the design the event is about.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-name": "DesignID"
          },
          "designName": {
            "type": "string",
            "description": "Name of the design when the event was recorded.",
            "maxLength": 255,
            "x-go-name": "DesignName"
          },
          "designVersion": {
            "type": "string",
            "description": "Version of the design when the event was recorded, for example `v0.0.3`; omitted when the producer does not know it.",
            "maxLength": 50,
            "x-go-name": "DesignVersion"
          },
          "designLink": {
            "type": "string",
            "format": "uri",
            "description": "Link that opens the design in the designer view, for example `<base>/extension/meshmap?mode=design&design=<designId>`.\n",
            "maxLength": 2048,
            "x-go-name": "DesignLink"
          },
          "viewLink": {
            "type": "string",
            "format": "uri",
            "description": "Link that opens the design in the operator view, for example `<base>/extension/meshmap?mode=operator&type=view&design_id=<designId>`; omitted when the producer has no operator view to link.\n",
            "maxLength": 2048,
            "x-go-name": "ViewLink"
          },
          "status": {
            "type": "string",
            "description": "Outcome of the operation as the producer reports it: `success` (the operation ran and found no errors), `partial` (the operation ran and part of it succeeded), `failed` (the operation ran and found errors, listed in `errors`) or `error` (the operation did not complete, so there is no verdict; `error` says why). It is an open string, not an enum: consumers must tolerate values they do not know.\n",
            "maxLength": 255,
            "x-go-name": "Status"
          },
          "errorCount": {
            "type": "integer",
            "minimum": 0,
            "description": "Total number of errors the operation found. It may exceed the number of entries in `errors`, which lists at most 20. Omitted when `status` is `error`, because an operation that did not complete found nothing.\n",
            "x-go-name": "ErrorCount"
          },
          "errors": {
            "type": "array",
            "maxItems": 20,
            "description": "Up to 20 of the errors the operation found, each naming its error code and the component it is about. `truncated` says whether more were found than are listed. Empty or omitted when `status` is `error`.\n",
            "items": {
              "type": "object",
              "description": "One error a design validate, deploy, undeploy or dry-run operation found: a code and the component it is about, never the offending component itself.\n",
              "additionalProperties": false,
              "required": [
                "code"
              ],
              "properties": {
                "code": {
                  "type": "string",
                  "description": "The error's code: a JSON-schema validator keyword such as `required` or `type` when design validation rejected the design, or a MeshKit error code (for example `meshery-server-1234`) when a server-side step failed. Consumers must tolerate codes they do not know.\n",
                  "maxLength": 255,
                  "x-go-name": "Code"
                },
                "componentId": {
                  "type": "string",
                  "description": "ID of the design component the error is about, as the design names it; omitted when the error is about the design as a whole. It is not checked as a UUID, because an invalid design can carry any value here and one bad value must not make the event unreadable.\n",
                  "maxLength": 255,
                  "x-id-format": "external",
                  "x-go-name": "ComponentID"
                }
              }
            },
            "x-go-name": "Errors"
          },
          "truncated": {
            "type": "boolean",
            "description": "True when `errorCount` is greater than the number of entries in `errors`, so the list is not complete. Omitted when `status` is `error`.",
            "x-go-name": "Truncated"
          },
          "error": {
            "description": "Why the operation did not complete. Present only when `status` is `error`; omitted for every other status, including `failed`, whose findings are in `errors`.\n",
            "x-go-name": "Error",
            "type": "object",
            "additionalProperties": false,
            "required": [
              "code"
            ],
            "properties": {
              "code": {
                "type": "string",
                "description": "The error's code: a MeshKit error code (for example `meshery-server-1130`) when the failure has one, otherwise a code the producer names, such as `validator-exception` (the validator threw) or `validator-no-result` (no result came back). Consumers must tolerate codes they do not know.\n",
                "minLength": 1,
                "maxLength": 255,
                "x-go-name": "Code"
              },
              "message": {
                "type": "string",
                "description": "One short, human-readable line saying what went wrong; omitted when the producer has none. Never design contents.\n",
                "maxLength": 512,
                "x-go-name": "Message"
              }
            }
          }
        }
      },
      "DesignValidationEventError": {
        "type": "object",
        "description": "One error a design validate, deploy, undeploy or dry-run operation found: a code and the component it is about, never the offending component itself.\n",
        "additionalProperties": false,
        "required": [
          "code"
        ],
        "properties": {
          "code": {
            "type": "string",
            "description": "The error's code: a JSON-schema validator keyword such as `required` or `type` when design validation rejected the design, or a MeshKit error code (for example `meshery-server-1234`) when a server-side step failed. Consumers must tolerate codes they do not know.\n",
            "maxLength": 255,
            "x-go-name": "Code"
          },
          "componentId": {
            "type": "string",
            "description": "ID of the design component the error is about, as the design names it; omitted when the error is about the design as a whole. It is not checked as a UUID, because an invalid design can carry any value here and one bad value must not make the event unreadable.\n",
            "maxLength": 255,
            "x-id-format": "external",
            "x-go-name": "ComponentID"
          }
        }
      },
      "DesignEventOperationError": {
        "type": "object",
        "description": "Why a design operation did not complete, carried as `error` on design event metadata whose `status` is `error`. It holds only the error's code and one short line, never the design, the request or the failed operation's response.\n",
        "additionalProperties": false,
        "required": [
          "code"
        ],
        "properties": {
          "code": {
            "type": "string",
            "description": "The error's code: a MeshKit error code (for example `meshery-server-1130`) when the failure has one, otherwise a code the producer names, such as `validator-exception` (the validator threw) or `validator-no-result` (no result came back). Consumers must tolerate codes they do not know.\n",
            "minLength": 1,
            "maxLength": 255,
            "x-go-name": "Code"
          },
          "message": {
            "type": "string",
            "description": "One short, human-readable line saying what went wrong; omitted when the producer has none. Never design contents.\n",
            "maxLength": 512,
            "x-go-name": "Message"
          }
        }
      },
      "EventError": {
        "type": "object",
        "description": "The `metadata.error` of an event that reports an error: one occurrence of an ErrorDefinition (the error construct). It carries the code, the descriptions as rendered for this occurrence, the causes and remediations that apply, which of those causes are likely this time (`matchedCauses`), and the values the descriptions were rendered from (`details`). It holds only the error, never the design, the request or the response that failed. A producer that has only MeshKit's flat lists sends `probableCause` and `suggestedRemediation` alone; such an error is unpaired, and nothing may pair the lists by position. A producer with the nested form sends `probableCauses` and should also send the flat lists derived from it, for readers that predate the nesting. Like every metadata shape it is a sub-shape of Event.metadata, which stays a free-form map, so it has no `*Payload` twin (docs/error-definition-contract.md).\n",
        "additionalProperties": false,
        "required": [
          "code"
        ],
        "properties": {
          "code": {
            "type": "string",
            "description": "The full error code, for example `meshery-server-1033`, as the definition names it. Consumers must tolerate codes they do not know.\n",
            "minLength": 1,
            "maxLength": 255,
            "x-go-name": "Code"
          },
          "component": {
            "x-go-type": "*errorcodev1beta3.ErrorComponent",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/v1beta3/errorcode",
              "name": "errorcodev1beta3"
            },
            "description": "The component that owns the code, when the producer names it; the code's prefix is the component's name.\n",
            "x-go-name": "Component",
            "type": "object",
            "additionalProperties": false,
            "required": [
              "type",
              "name"
            ],
            "properties": {
              "type": {
                "type": "string",
                "description": "The kind of component, for example `component` (Meshery Server), `adapter`, `library` (MeshKit) or `client` (mesheryctl). An open set: a new kind of component needs no schema change.\n",
                "minLength": 1,
                "maxLength": 100,
                "pattern": "^[a-z][a-z0-9-]*$",
                "x-go-name": "Type"
              },
              "name": {
                "type": "string",
                "description": "The component's name, for example `meshery-server`, `meshkit` or `mesheryctl`. It is the prefix of every code the component owns.\n",
                "minLength": 1,
                "maxLength": 200,
                "pattern": "^[a-z][a-z0-9]*(-[a-z0-9]+)*$",
                "x-go-name": "Name"
              }
            }
          },
          "severity": {
            "x-go-type": "*errorcodev1beta3.ErrorSeverity",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/v1beta3/errorcode",
              "name": "errorcodev1beta3"
            },
            "description": "The definition's severity. The event's own `severity` is the level this occurrence was recorded at.\n",
            "x-go-name": "Severity",
            "type": "string",
            "enum": [
              "emergency",
              "alert",
              "critical",
              "fatal",
              "error",
              "warning",
              "informational",
              "debug"
            ],
            "x-enum-varnames": [
              "SeverityEmergency",
              "SeverityAlert",
              "SeverityCritical",
              "SeverityFatal",
              "SeverityError",
              "SeverityWarning",
              "SeverityInformational",
              "SeverityDebug"
            ]
          },
          "shortDescription": {
            "type": "string",
            "description": "The definition's short description, rendered for this occurrence.",
            "maxLength": 1000,
            "x-go-name": "ShortDescription"
          },
          "longDescription": {
            "type": "string",
            "description": "The definition's long description, rendered for this occurrence.",
            "maxLength": 10000,
            "x-go-name": "LongDescription"
          },
          "probableCauses": {
            "type": "array",
            "description": "The definition's causes that apply to this occurrence, each with the remediations that answer it, in the definition's order. A producer may narrow the definition's causes to those that can apply; omitted when the producer has only flat lists.\n",
            "minItems": 1,
            "maxItems": 20,
            "items": {
              "type": "object",
              "additionalProperties": false,
              "description": "One probable cause of an error, with the remediations that answer it. Remediations are nested under the cause they address, never kept in a parallel list.\n",
              "required": [
                "id",
                "description",
                "remediations"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "description": "Stable id of the cause, unique within the error's definition, for example `service-not-running`. An event names the causes that apply to one occurrence by this id (`EventError.matchedCauses`), and the docs page links to it, so it never changes once published. Lowercase words joined by hyphens.\n",
                  "minLength": 1,
                  "maxLength": 100,
                  "pattern": "^[a-z][a-z0-9]*(-[a-z0-9]+)*$",
                  "x-id-format": "external",
                  "x-go-name": "ID"
                },
                "description": {
                  "type": "string",
                  "description": "What may have caused the error, for example `The service is not running.`",
                  "minLength": 1,
                  "maxLength": 2000,
                  "x-go-name": "Description"
                },
                "remediations": {
                  "type": "array",
                  "description": "What answers this cause, the most likely fix first. A remediation that also answers another cause is repeated under that cause with the same `id` and identical fields.\n",
                  "minItems": 1,
                  "items": {
                    "type": "object",
                    "additionalProperties": false,
                    "description": "One remediation for a probable cause: what to do, and optionally a machine-readable action a client may run and the policy that says whether it may run it without asking a person.\n",
                    "required": [
                      "id",
                      "description"
                    ],
                    "properties": {
                      "id": {
                        "type": "string",
                        "description": "Stable id of the remediation, unique within the error's definition, for example `start-service`. The same id under two causes is one remediation answering both, so its fields must be identical in each place, and the flattened `suggestedRemediation` list carries it once. Lowercase words joined by hyphens.\n",
                        "minLength": 1,
                        "maxLength": 100,
                        "pattern": "^[a-z][a-z0-9]*(-[a-z0-9]+)*$",
                        "x-id-format": "external",
                        "x-go-name": "ID"
                      },
                      "description": {
                        "type": "string",
                        "description": "What to do, written for a person, for example `Start the service.`",
                        "minLength": 1,
                        "maxLength": 2000,
                        "x-go-name": "Description"
                      },
                      "action": {
                        "type": "string",
                        "description": "Identifier of an action a client can run to apply this remediation, as dot-separated lowercase words, for example `service.start` or `connection.reconnect`. The client that runs it owns its meaning; the definition only names it. Omitted when only a person can apply the remediation.\n",
                        "minLength": 3,
                        "maxLength": 255,
                        "pattern": "^[a-z][a-z0-9-]*(\\.[a-z][a-z0-9-]*)+$",
                        "x-go-name": "Action"
                      },
                      "actionPolicy": {
                        "description": "Whether a client may run `action` on its own. `automatic` and `requiresApproval` need an `action`. Omitted means `manual`.\n",
                        "x-go-name": "ActionPolicy",
                        "type": "string",
                        "enum": [
                          "automatic",
                          "requiresApproval",
                          "manual"
                        ],
                        "x-enum-casing-exempt": true,
                        "x-enum-varnames": [
                          "ActionPolicyAutomatic",
                          "ActionPolicyRequiresApproval",
                          "ActionPolicyManual"
                        ]
                      }
                    }
                  },
                  "x-go-name": "Remediations"
                }
              }
            },
            "x-go-type": "[]errorcodev1beta3.ProbableCause",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/v1beta3/errorcode",
              "name": "errorcodev1beta3"
            },
            "x-go-name": "ProbableCauses"
          },
          "matchedCauses": {
            "type": "array",
            "description": "The causes most likely for this occurrence, most likely first, so a reader leads with their remediations. Each names a cause `id` of the definition and, when `probableCauses` is present, one of its causes. Omitted when the producer cannot tell which cause applies.\n",
            "minItems": 1,
            "maxItems": 20,
            "items": {
              "type": "object",
              "description": "One cause an error event names as likely for this occurrence (EventError.matchedCauses).\n",
              "additionalProperties": false,
              "required": [
                "causeId"
              ],
              "properties": {
                "causeId": {
                  "type": "string",
                  "description": "The `id` of the matched cause in the error's definition (ProbableCause.id).",
                  "minLength": 1,
                  "maxLength": 100,
                  "pattern": "^[a-z][a-z0-9]*(-[a-z0-9]+)*$",
                  "x-id-format": "external",
                  "x-go-name": "CauseID"
                },
                "confidence": {
                  "type": "number",
                  "description": "How sure the producer is that this cause applies, from 0 (a guess) to 1 (certain); omitted when the producer does not estimate it.\n",
                  "minimum": 0,
                  "maximum": 1,
                  "x-go-name": "Confidence"
                }
              }
            },
            "x-go-name": "MatchedCauses"
          },
          "probableCause": {
            "type": "array",
            "description": "The flat list of cause descriptions (MeshKit's `ProbableCause`). With `probableCauses`, it equals each cause's `description` in order; without, it is unpaired.\n",
            "maxItems": 20,
            "items": {
              "type": "string",
              "minLength": 1,
              "maxLength": 2000
            },
            "x-go-name": "ProbableCause"
          },
          "suggestedRemediation": {
            "type": "array",
            "description": "The flat list of remediation descriptions (MeshKit's `SuggestedRemediation`). With `probableCauses`, it equals every remediation's `description` in order, each remediation `id` once; without, it is unpaired.\n",
            "items": {
              "type": "string",
              "minLength": 1,
              "maxLength": 2000
            },
            "x-go-name": "SuggestedRemediation"
          },
          "referenceUrl": {
            "type": "string",
            "format": "uri",
            "description": "The code's page on docs.meshery.io (ErrorDefinition.referenceUrl), when the producer knows it.",
            "maxLength": 2048,
            "pattern": "^https://",
            "x-go-name": "ReferenceURL"
          },
          "details": {
            "type": "object",
            "description": "The instance values this occurrence's descriptions were rendered from, for example the connection name or the path that failed. Keys are camelCase. Never secrets, credentials, design contents or request bodies; Meshery Server's 16 KB metadata guard applies.\n",
            "additionalProperties": true,
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-go-name": "Details"
          }
        }
      },
      "EventMatchedCause": {
        "type": "object",
        "description": "One cause an error event names as likely for this occurrence (EventError.matchedCauses).\n",
        "additionalProperties": false,
        "required": [
          "causeId"
        ],
        "properties": {
          "causeId": {
            "type": "string",
            "description": "The `id` of the matched cause in the error's definition (ProbableCause.id).",
            "minLength": 1,
            "maxLength": 100,
            "pattern": "^[a-z][a-z0-9]*(-[a-z0-9]+)*$",
            "x-id-format": "external",
            "x-go-name": "CauseID"
          },
          "confidence": {
            "type": "number",
            "description": "How sure the producer is that this cause applies, from 0 (a guess) to 1 (certain); omitted when the producer does not estimate it.\n",
            "minimum": 0,
            "maximum": 1,
            "x-go-name": "Confidence"
          }
        }
      },
      "DesignSavedEventMetadata": {
        "type": "object",
        "description": "Metadata of a design saved event (category `pattern`, action `create` or `update`): a history title and the saved design's ID and name, never its contents. Never put design contents into event metadata - no `designFile`, `patternFile`, `components`, `relationships`, `trace`, `evaluationResponse`, the raw `summary` or `validationResult`. Meshery Server applies a 16 KB guard that drops oversized metadata down to the identity fields.\n",
        "additionalProperties": false,
        "required": [
          "design"
        ],
        "properties": {
          "historyTitle": {
            "type": "string",
            "description": "One-line title of the save for the design's history, for example `Version v0.0.3 - 12 components and 9 relationships`.",
            "maxLength": 500,
            "x-go-name": "HistoryTitle"
          },
          "design": {
            "description": "The saved design's ID and name.",
            "x-go-name": "Design",
            "type": "object",
            "additionalProperties": false,
            "required": [
              "id"
            ],
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "description": "ID of the saved design.",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                },
                "x-go-name": "ID"
              },
              "name": {
                "type": "string",
                "description": "Name of the saved design.",
                "maxLength": 255,
                "x-go-name": "Name"
              }
            }
          }
        }
      },
      "DesignSavedEventDesign": {
        "type": "object",
        "description": "The ID and name of the design a saved event is about - only those two fields, never the design file or any of its contents.\n",
        "additionalProperties": false,
        "required": [
          "id"
        ],
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "description": "ID of the saved design.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-name": "ID"
          },
          "name": {
            "type": "string",
            "description": "Name of the saved design.",
            "maxLength": 255,
            "x-go-name": "Name"
          }
        }
      },
      "ScheduleCompletedEventMetadata": {
        "type": "object",
        "description": "Metadata for a completed scheduled run (category `schedule`, action `completed`). This typed shape keeps client-specific display data out of the core Event fields and is projected into EventFeedItem.",
        "additionalProperties": false,
        "required": [
          "platform",
          "role",
          "line"
        ],
        "properties": {
          "platform": {
            "type": "string",
            "description": "Platform the completed run acted on.",
            "enum": [
              "linkedin",
              "x",
              "reddit",
              "hacker-news",
              "slack",
              "bluesky",
              "github"
            ],
            "x-go-name": "Platform"
          },
          "role": {
            "type": "string",
            "description": "Role the completed run acted in.",
            "minLength": 3,
            "maxLength": 40,
            "x-go-name": "Role"
          },
          "line": {
            "type": "string",
            "description": "One-line result of the run.",
            "minLength": 10,
            "maxLength": 120,
            "x-go-name": "Line"
          },
          "networks": {
            "type": "array",
            "description": "Networks or communities where the run acted.",
            "minItems": 1,
            "maxItems": 20,
            "items": {
              "type": "string",
              "minLength": 1,
              "maxLength": 255
            },
            "x-go-name": "Networks"
          }
        }
      }
    }
  }
};

export default EventSchema;
