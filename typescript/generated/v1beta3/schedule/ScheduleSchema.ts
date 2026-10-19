/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const ScheduleSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Schedule",
    "description": "OpenAPI schema for organization schedules. A schedule is a job: an action\nwith parameters, a due time, an optional recurrence, a retry budget and a\nstatus. Schedules belong to an organization and may be linked to a\nworkspace. Workers take a schedule through a claim, the generic `claim`\nconstruct nested under the schedule at `/api/schedules/{scheduleId}/claim`:\nthe race between workers is decided server-side in a single statement,\nonly the holder renews or releases, and a claim past its `expiresAt` is\nstale so the schedule is claimable again. Pausing has two server scopes,\nthe organization-wide pause and a per-schedule pause; a schedule is\nclaimed only when neither says paused. Supersedes the per-user\n`/user/schedules` routes of v1beta2, which remain as a deprecated alias.\nOrganization scope: every operation acts only in the organization the\nsession resolved to (X-Current-Orgid, then the user's selected\norganization), and only when the caller is a live member of it. A\ncaller who is not a member receives the same 404 as an unknown id, so\nthe existence of another organization's schedules is never disclosed.\n",
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
      "name": "schedules",
      "description": "Operations related to organization schedules and their claims."
    }
  ],
  "paths": {
    "/api/schedules": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "schedules"
        ],
        "summary": "List schedules",
        "operationId": "listSchedules",
        "description": "Returns a paginated list of the schedules in the organization of the\nauthenticated session, optionally filtered by workspace or status. Each\nschedule carries its live claim, when one is held.\n",
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
            "description": "Number of items per page.",
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
            "name": "workspaceId",
            "in": "query",
            "required": false,
            "description": "Only schedules linked to this workspace.",
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
            "name": "status",
            "in": "query",
            "required": false,
            "description": "Only schedules in this status.",
            "schema": {
              "type": "string",
              "enum": [
                "pending",
                "scheduled",
                "assigned",
                "claimed",
                "running",
                "retrying",
                "completed",
                "failed",
                "cancelled"
              ]
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Schedules page",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated collection of schedules.",
                  "required": [
                    "page",
                    "pageSize",
                    "totalCount",
                    "schedules"
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
                      "minimum": 1
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of items available.",
                      "minimum": 0
                    },
                    "schedules": {
                      "type": "array",
                      "items": {
                        "x-go-type": "Schedule",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "title": "Schedule Schema",
                        "description": "Server-returned schedule. A schedule is a job: an action to run with its\nparameters, when it is due (`runAt`, `nextRunAt`, `recurrence`), its retry\nbudget and its outcome. Schedules belong to an organization and may be\nlinked to a workspace. A worker takes a schedule through a claim (the\ngeneric `claim` construct, nested under the schedule); while the claim is\nlive no other worker can take it, and a claim past its `expiresAt` is\nstale and the schedule is claimable again. The `claim`, the status\nvalues `assigned`, `claimed` and `running`, and the pause fields are\nserver-managed: they change only through the claim, release, pause and\nresume operations and are refused on create and update.\n",
                        "type": "object",
                        "additionalProperties": false,
                        "required": [
                          "id",
                          "organizationId",
                          "name",
                          "action",
                          "enabled",
                          "status",
                          "retryCount",
                          "maxRetries",
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
                            "x-order": 1
                          },
                          "organizationId": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-go-name": "OrganizationID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "organization_id"
                            },
                            "x-order": 2
                          },
                          "workspaceId": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "workspace_id",
                              "json": "workspaceId,omitempty"
                            },
                            "x-order": 3
                          },
                          "name": {
                            "type": "string",
                            "description": "Human-readable name for the schedule.",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "name"
                            },
                            "x-order": 4
                          },
                          "action": {
                            "type": "string",
                            "description": "The action the worker runs when it holds the schedule's claim, for example a command name.",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "action"
                            },
                            "x-order": 5
                          },
                          "params": {
                            "type": "object",
                            "description": "Action parameters, stored as a JSON blob.",
                            "x-go-type": "core.Map",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "params"
                            },
                            "x-order": 6
                          },
                          "enabled": {
                            "type": "boolean",
                            "description": "Whether the schedule is eligible to run. A disabled schedule is never claimed.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "enabled"
                            },
                            "x-order": 7
                          },
                          "runAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Time the schedule first becomes due.",
                            "nullable": true,
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "run_at"
                            },
                            "x-order": 8
                          },
                          "nextRunAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Next time a recurring or retrying schedule becomes due.",
                            "nullable": true,
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "next_run_at"
                            },
                            "x-order": 9
                          },
                          "recurrence": {
                            "type": "string",
                            "description": "Recurrence rule for repeating schedules. Empty for a run-once schedule.",
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "recurrence"
                            },
                            "x-order": 10
                          },
                          "status": {
                            "type": "string",
                            "description": "Lifecycle status. `pending`: created, not yet due-scheduled.\n`scheduled`: waiting for its due time. `assigned`: designated for a\nparticular worker but not yet claimed. `claimed`: a worker holds the\nclaim and has not started. `running`: the claim holder is executing\nit. `retrying`: the last attempt failed and another is due.\n`completed`, `failed` and `cancelled` are terminal for a run-once\nschedule; a recurring schedule returns to `scheduled`.\n",
                            "enum": [
                              "pending",
                              "scheduled",
                              "assigned",
                              "claimed",
                              "running",
                              "retrying",
                              "completed",
                              "failed",
                              "cancelled"
                            ],
                            "x-oapi-codegen-extra-tags": {
                              "db": "status"
                            },
                            "x-order": 11
                          },
                          "retryCount": {
                            "type": "integer",
                            "description": "Attempts already retried for the current run.",
                            "minimum": 0,
                            "x-oapi-codegen-extra-tags": {
                              "db": "retry_count"
                            },
                            "x-order": 12
                          },
                          "maxRetries": {
                            "type": "integer",
                            "description": "Maximum retries before the run is marked failed.",
                            "minimum": 0,
                            "x-oapi-codegen-extra-tags": {
                              "db": "max_retries"
                            },
                            "x-order": 13
                          },
                          "retryDelayMinutes": {
                            "type": "integer",
                            "description": "Minutes to wait before a retry becomes due.",
                            "minimum": 0,
                            "x-oapi-codegen-extra-tags": {
                              "db": "retry_delay_minutes"
                            },
                            "x-order": 14
                          },
                          "lastRunAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Time of the most recent attempt.",
                            "nullable": true,
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "last_run_at"
                            },
                            "x-order": 15
                          },
                          "lastError": {
                            "type": "string",
                            "description": "Error reported by the most recent attempt.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "last_error"
                            },
                            "x-order": 16
                          },
                          "claim": {
                            "x-go-type": "*claimv1beta3.Claim",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/v1beta3/claim",
                              "name": "claimv1beta3"
                            },
                            "description": "The schedule's live claim, when one is held. Server-managed; omitted when the schedule is unclaimed.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "-",
                              "json": "claim,omitempty"
                            },
                            "x-order": 17,
                            "$schema": "http://json-schema.org/draft-07/schema#",
                            "title": "Claim Schema",
                            "type": "object",
                            "additionalProperties": false,
                            "required": [
                              "id",
                              "organizationId",
                              "resourceType",
                              "resourceId",
                              "claimant",
                              "status",
                              "claimedAt",
                              "expiresAt",
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
                                "x-order": 1
                              },
                              "organizationId": {
                                "type": "string",
                                "format": "uuid",
                                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                },
                                "x-go-name": "OrganizationID",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "organization_id"
                                },
                                "x-order": 2
                              },
                              "resourceType": {
                                "type": "string",
                                "description": "Type of the claimed resource, for example `schedule`.",
                                "minLength": 1,
                                "maxLength": 64,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "resource_type"
                                },
                                "x-order": 3
                              },
                              "resourceId": {
                                "type": "string",
                                "format": "uuid",
                                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                },
                                "x-oapi-codegen-extra-tags": {
                                  "db": "resource_id"
                                },
                                "x-order": 4
                              },
                              "claimant": {
                                "type": "string",
                                "description": "Identity of the holder, as asserted by the worker that took the claim (for example a machine and process identifier).",
                                "minLength": 1,
                                "maxLength": 255,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "claimant"
                                },
                                "x-order": 5
                              },
                              "status": {
                                "type": "string",
                                "description": "Lifecycle of the claim. `active` while held, `released` once the holder lets it go, `expired` once `expiresAt` passed without a renewal.",
                                "enum": [
                                  "active",
                                  "released",
                                  "expired"
                                ],
                                "x-oapi-codegen-extra-tags": {
                                  "db": "status"
                                },
                                "x-order": 6
                              },
                              "claimedAt": {
                                "description": "Time the claim was taken.",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "claimed_at"
                                },
                                "x-order": 7,
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "expiresAt": {
                                "description": "Time the claim lapses unless the holder renews it. Always set by the server; a claim past this time is stale.",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "expires_at"
                                },
                                "x-order": 8,
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "releasedAt": {
                                "type": "string",
                                "format": "date-time",
                                "description": "Time the holder released the claim. Null while the claim is active or after it expired.",
                                "nullable": true,
                                "x-go-type": "core.NullTime",
                                "x-go-type-import": {
                                  "path": "github.com/meshery/schemas/models/core",
                                  "name": "core"
                                },
                                "x-oapi-codegen-extra-tags": {
                                  "db": "released_at"
                                },
                                "x-order": 9
                              },
                              "createdAt": {
                                "description": "Timestamp of claim creation.",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "created_at"
                                },
                                "x-order": 10,
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "updatedAt": {
                                "description": "Timestamp of last claim modification.",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "updated_at"
                                },
                                "x-order": 11,
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              }
                            }
                          },
                          "pausedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Time the schedule was paused. Null when the schedule is not paused. Server-managed.",
                            "nullable": true,
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "paused_at"
                            },
                            "x-order": 18
                          },
                          "pausedBy": {
                            "type": "string",
                            "description": "Identity that paused the schedule. Server-managed.",
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "paused_by"
                            },
                            "x-order": 19
                          },
                          "pauseReason": {
                            "type": "string",
                            "description": "Reason given for pausing the schedule. Server-managed.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "pause_reason"
                            },
                            "x-order": 20
                          },
                          "createdAt": {
                            "description": "Timestamp of schedule creation.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at"
                            },
                            "x-order": 21,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp of last schedule modification.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at"
                            },
                            "x-order": 22,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deletedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the schedule was soft-deleted. Null while live.",
                            "nullable": true,
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at"
                            },
                            "x-order": 23
                          }
                        }
                      },
                      "description": "Schedules included on this page of results."
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
          "cloud"
        ],
        "tags": [
          "schedules"
        ],
        "summary": "Create a schedule",
        "operationId": "createSchedule",
        "description": "Creates a schedule in the organization of the authenticated session. The\nclaim, the server-managed status values (`assigned`, `claimed`, `running`)\nand the pause fields are refused here.\n",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for creating or updating a schedule. Contains only\nclient-settable fields; the owning `organizationId`, the claim, the\npause fields, `retryCount`, `lastRunAt`, `lastError` and the\ntimestamps are server-managed. `status` accepts only `pending`,\n`scheduled` and `cancelled` here; the other values are set by the\nclaim and release operations.\n",
                "required": [
                  "name",
                  "action"
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
                    "x-oapi-codegen-extra-tags": {
                      "json": "id,omitempty"
                    }
                  },
                  "workspaceId": {
                    "type": "string",
                    "format": "uuid",
                    "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    },
                    "x-oapi-codegen-extra-tags": {
                      "json": "workspaceId,omitempty"
                    }
                  },
                  "name": {
                    "type": "string",
                    "description": "Human-readable name for the schedule.",
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "action": {
                    "type": "string",
                    "description": "The action the worker runs, for example a command name.",
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "params": {
                    "type": "object",
                    "description": "Action parameters, stored as a JSON blob.",
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    },
                    "x-go-type-skip-optional-pointer": true
                  },
                  "enabled": {
                    "type": "boolean",
                    "description": "Whether the schedule is eligible to run. Defaults to true."
                  },
                  "runAt": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Time the schedule first becomes due.",
                    "nullable": true,
                    "x-go-type": "core.NullTime",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    }
                  },
                  "recurrence": {
                    "type": "string",
                    "description": "Recurrence rule for repeating schedules. Empty for a run-once schedule.",
                    "maxLength": 255
                  },
                  "status": {
                    "type": "string",
                    "description": "Client-settable status. Omit to let the server choose `scheduled` for a due-timed schedule and `pending` otherwise.",
                    "enum": [
                      "pending",
                      "scheduled",
                      "cancelled"
                    ]
                  },
                  "maxRetries": {
                    "type": "integer",
                    "description": "Maximum retries before the run is marked failed.",
                    "minimum": 0
                  },
                  "retryDelayMinutes": {
                    "type": "integer",
                    "description": "Minutes to wait before a retry becomes due.",
                    "minimum": 0
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Schedule created",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Schedule Schema",
                  "description": "Server-returned schedule. A schedule is a job: an action to run with its\nparameters, when it is due (`runAt`, `nextRunAt`, `recurrence`), its retry\nbudget and its outcome. Schedules belong to an organization and may be\nlinked to a workspace. A worker takes a schedule through a claim (the\ngeneric `claim` construct, nested under the schedule); while the claim is\nlive no other worker can take it, and a claim past its `expiresAt` is\nstale and the schedule is claimable again. The `claim`, the status\nvalues `assigned`, `claimed` and `running`, and the pause fields are\nserver-managed: they change only through the claim, release, pause and\nresume operations and are refused on create and update.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "name",
                    "action",
                    "enabled",
                    "status",
                    "retryCount",
                    "maxRetries",
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
                      "x-order": 1
                    },
                    "organizationId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-name": "OrganizationID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "organization_id"
                      },
                      "x-order": 2
                    },
                    "workspaceId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "workspace_id",
                        "json": "workspaceId,omitempty"
                      },
                      "x-order": 3
                    },
                    "name": {
                      "type": "string",
                      "description": "Human-readable name for the schedule.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      },
                      "x-order": 4
                    },
                    "action": {
                      "type": "string",
                      "description": "The action the worker runs when it holds the schedule's claim, for example a command name.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "action"
                      },
                      "x-order": 5
                    },
                    "params": {
                      "type": "object",
                      "description": "Action parameters, stored as a JSON blob.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "params"
                      },
                      "x-order": 6
                    },
                    "enabled": {
                      "type": "boolean",
                      "description": "Whether the schedule is eligible to run. A disabled schedule is never claimed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "enabled"
                      },
                      "x-order": 7
                    },
                    "runAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the schedule first becomes due.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "run_at"
                      },
                      "x-order": 8
                    },
                    "nextRunAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Next time a recurring or retrying schedule becomes due.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "next_run_at"
                      },
                      "x-order": 9
                    },
                    "recurrence": {
                      "type": "string",
                      "description": "Recurrence rule for repeating schedules. Empty for a run-once schedule.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "recurrence"
                      },
                      "x-order": 10
                    },
                    "status": {
                      "type": "string",
                      "description": "Lifecycle status. `pending`: created, not yet due-scheduled.\n`scheduled`: waiting for its due time. `assigned`: designated for a\nparticular worker but not yet claimed. `claimed`: a worker holds the\nclaim and has not started. `running`: the claim holder is executing\nit. `retrying`: the last attempt failed and another is due.\n`completed`, `failed` and `cancelled` are terminal for a run-once\nschedule; a recurring schedule returns to `scheduled`.\n",
                      "enum": [
                        "pending",
                        "scheduled",
                        "assigned",
                        "claimed",
                        "running",
                        "retrying",
                        "completed",
                        "failed",
                        "cancelled"
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      },
                      "x-order": 11
                    },
                    "retryCount": {
                      "type": "integer",
                      "description": "Attempts already retried for the current run.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "retry_count"
                      },
                      "x-order": 12
                    },
                    "maxRetries": {
                      "type": "integer",
                      "description": "Maximum retries before the run is marked failed.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "max_retries"
                      },
                      "x-order": 13
                    },
                    "retryDelayMinutes": {
                      "type": "integer",
                      "description": "Minutes to wait before a retry becomes due.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "retry_delay_minutes"
                      },
                      "x-order": 14
                    },
                    "lastRunAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time of the most recent attempt.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_run_at"
                      },
                      "x-order": 15
                    },
                    "lastError": {
                      "type": "string",
                      "description": "Error reported by the most recent attempt.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_error"
                      },
                      "x-order": 16
                    },
                    "claim": {
                      "x-go-type": "*claimv1beta3.Claim",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta3/claim",
                        "name": "claimv1beta3"
                      },
                      "description": "The schedule's live claim, when one is held. Server-managed; omitted when the schedule is unclaimed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "-",
                        "json": "claim,omitempty"
                      },
                      "x-order": 17,
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "title": "Claim Schema",
                      "type": "object",
                      "additionalProperties": false,
                      "required": [
                        "id",
                        "organizationId",
                        "resourceType",
                        "resourceId",
                        "claimant",
                        "status",
                        "claimedAt",
                        "expiresAt",
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
                          "x-order": 1
                        },
                        "organizationId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-go-name": "OrganizationID",
                          "x-oapi-codegen-extra-tags": {
                            "db": "organization_id"
                          },
                          "x-order": 2
                        },
                        "resourceType": {
                          "type": "string",
                          "description": "Type of the claimed resource, for example `schedule`.",
                          "minLength": 1,
                          "maxLength": 64,
                          "x-oapi-codegen-extra-tags": {
                            "db": "resource_type"
                          },
                          "x-order": 3
                        },
                        "resourceId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "resource_id"
                          },
                          "x-order": 4
                        },
                        "claimant": {
                          "type": "string",
                          "description": "Identity of the holder, as asserted by the worker that took the claim (for example a machine and process identifier).",
                          "minLength": 1,
                          "maxLength": 255,
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimant"
                          },
                          "x-order": 5
                        },
                        "status": {
                          "type": "string",
                          "description": "Lifecycle of the claim. `active` while held, `released` once the holder lets it go, `expired` once `expiresAt` passed without a renewal.",
                          "enum": [
                            "active",
                            "released",
                            "expired"
                          ],
                          "x-oapi-codegen-extra-tags": {
                            "db": "status"
                          },
                          "x-order": 6
                        },
                        "claimedAt": {
                          "description": "Time the claim was taken.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimed_at"
                          },
                          "x-order": 7,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "expiresAt": {
                          "description": "Time the claim lapses unless the holder renews it. Always set by the server; a claim past this time is stale.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "expires_at"
                          },
                          "x-order": 8,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "releasedAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Time the holder released the claim. Null while the claim is active or after it expired.",
                          "nullable": true,
                          "x-go-type": "core.NullTime",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "released_at"
                          },
                          "x-order": 9
                        },
                        "createdAt": {
                          "description": "Timestamp of claim creation.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "created_at"
                          },
                          "x-order": 10,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "updatedAt": {
                          "description": "Timestamp of last claim modification.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "updated_at"
                          },
                          "x-order": 11,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        }
                      }
                    },
                    "pausedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the schedule was paused. Null when the schedule is not paused. Server-managed.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_at"
                      },
                      "x-order": 18
                    },
                    "pausedBy": {
                      "type": "string",
                      "description": "Identity that paused the schedule. Server-managed.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_by"
                      },
                      "x-order": 19
                    },
                    "pauseReason": {
                      "type": "string",
                      "description": "Reason given for pausing the schedule. Server-managed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "pause_reason"
                      },
                      "x-order": 20
                    },
                    "createdAt": {
                      "description": "Timestamp of schedule creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 21,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last schedule modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 22,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the schedule was soft-deleted. Null while live.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at"
                      },
                      "x-order": 23
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
    "/api/schedules/claim": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "schedules"
        ],
        "summary": "Claim the next due schedule",
        "operationId": "claimNextSchedule",
        "description": "Claims one due, enabled, unclaimed and unpaused schedule for `claimant`\nin a single server-side statement, optionally restricted to one\nworkspace, and answers it with its new claim. When no schedule\nqualifies the answer is 204: a lost race is never an error.\n`ignorePause` is the single operator override over the pause scopes.\n",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Request to claim the next due schedule.",
                "required": [
                  "claimant"
                ],
                "properties": {
                  "claimant": {
                    "type": "string",
                    "description": "Identity of the worker taking the claim.",
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "durationMinutes": {
                    "type": "integer",
                    "description": "Requested claim duration in minutes; the server applies its default when omitted and may cap it.",
                    "minimum": 1,
                    "maximum": 1440
                  },
                  "workspaceId": {
                    "type": "string",
                    "format": "uuid",
                    "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    },
                    "x-oapi-codegen-extra-tags": {
                      "json": "workspaceId,omitempty"
                    }
                  },
                  "ignorePause": {
                    "type": "boolean",
                    "description": "Operator override that claims through the organization-wide and per-schedule pauses."
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "The claimed schedule",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Schedule Schema",
                  "description": "Server-returned schedule. A schedule is a job: an action to run with its\nparameters, when it is due (`runAt`, `nextRunAt`, `recurrence`), its retry\nbudget and its outcome. Schedules belong to an organization and may be\nlinked to a workspace. A worker takes a schedule through a claim (the\ngeneric `claim` construct, nested under the schedule); while the claim is\nlive no other worker can take it, and a claim past its `expiresAt` is\nstale and the schedule is claimable again. The `claim`, the status\nvalues `assigned`, `claimed` and `running`, and the pause fields are\nserver-managed: they change only through the claim, release, pause and\nresume operations and are refused on create and update.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "name",
                    "action",
                    "enabled",
                    "status",
                    "retryCount",
                    "maxRetries",
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
                      "x-order": 1
                    },
                    "organizationId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-name": "OrganizationID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "organization_id"
                      },
                      "x-order": 2
                    },
                    "workspaceId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "workspace_id",
                        "json": "workspaceId,omitempty"
                      },
                      "x-order": 3
                    },
                    "name": {
                      "type": "string",
                      "description": "Human-readable name for the schedule.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      },
                      "x-order": 4
                    },
                    "action": {
                      "type": "string",
                      "description": "The action the worker runs when it holds the schedule's claim, for example a command name.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "action"
                      },
                      "x-order": 5
                    },
                    "params": {
                      "type": "object",
                      "description": "Action parameters, stored as a JSON blob.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "params"
                      },
                      "x-order": 6
                    },
                    "enabled": {
                      "type": "boolean",
                      "description": "Whether the schedule is eligible to run. A disabled schedule is never claimed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "enabled"
                      },
                      "x-order": 7
                    },
                    "runAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the schedule first becomes due.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "run_at"
                      },
                      "x-order": 8
                    },
                    "nextRunAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Next time a recurring or retrying schedule becomes due.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "next_run_at"
                      },
                      "x-order": 9
                    },
                    "recurrence": {
                      "type": "string",
                      "description": "Recurrence rule for repeating schedules. Empty for a run-once schedule.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "recurrence"
                      },
                      "x-order": 10
                    },
                    "status": {
                      "type": "string",
                      "description": "Lifecycle status. `pending`: created, not yet due-scheduled.\n`scheduled`: waiting for its due time. `assigned`: designated for a\nparticular worker but not yet claimed. `claimed`: a worker holds the\nclaim and has not started. `running`: the claim holder is executing\nit. `retrying`: the last attempt failed and another is due.\n`completed`, `failed` and `cancelled` are terminal for a run-once\nschedule; a recurring schedule returns to `scheduled`.\n",
                      "enum": [
                        "pending",
                        "scheduled",
                        "assigned",
                        "claimed",
                        "running",
                        "retrying",
                        "completed",
                        "failed",
                        "cancelled"
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      },
                      "x-order": 11
                    },
                    "retryCount": {
                      "type": "integer",
                      "description": "Attempts already retried for the current run.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "retry_count"
                      },
                      "x-order": 12
                    },
                    "maxRetries": {
                      "type": "integer",
                      "description": "Maximum retries before the run is marked failed.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "max_retries"
                      },
                      "x-order": 13
                    },
                    "retryDelayMinutes": {
                      "type": "integer",
                      "description": "Minutes to wait before a retry becomes due.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "retry_delay_minutes"
                      },
                      "x-order": 14
                    },
                    "lastRunAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time of the most recent attempt.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_run_at"
                      },
                      "x-order": 15
                    },
                    "lastError": {
                      "type": "string",
                      "description": "Error reported by the most recent attempt.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_error"
                      },
                      "x-order": 16
                    },
                    "claim": {
                      "x-go-type": "*claimv1beta3.Claim",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta3/claim",
                        "name": "claimv1beta3"
                      },
                      "description": "The schedule's live claim, when one is held. Server-managed; omitted when the schedule is unclaimed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "-",
                        "json": "claim,omitempty"
                      },
                      "x-order": 17,
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "title": "Claim Schema",
                      "type": "object",
                      "additionalProperties": false,
                      "required": [
                        "id",
                        "organizationId",
                        "resourceType",
                        "resourceId",
                        "claimant",
                        "status",
                        "claimedAt",
                        "expiresAt",
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
                          "x-order": 1
                        },
                        "organizationId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-go-name": "OrganizationID",
                          "x-oapi-codegen-extra-tags": {
                            "db": "organization_id"
                          },
                          "x-order": 2
                        },
                        "resourceType": {
                          "type": "string",
                          "description": "Type of the claimed resource, for example `schedule`.",
                          "minLength": 1,
                          "maxLength": 64,
                          "x-oapi-codegen-extra-tags": {
                            "db": "resource_type"
                          },
                          "x-order": 3
                        },
                        "resourceId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "resource_id"
                          },
                          "x-order": 4
                        },
                        "claimant": {
                          "type": "string",
                          "description": "Identity of the holder, as asserted by the worker that took the claim (for example a machine and process identifier).",
                          "minLength": 1,
                          "maxLength": 255,
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimant"
                          },
                          "x-order": 5
                        },
                        "status": {
                          "type": "string",
                          "description": "Lifecycle of the claim. `active` while held, `released` once the holder lets it go, `expired` once `expiresAt` passed without a renewal.",
                          "enum": [
                            "active",
                            "released",
                            "expired"
                          ],
                          "x-oapi-codegen-extra-tags": {
                            "db": "status"
                          },
                          "x-order": 6
                        },
                        "claimedAt": {
                          "description": "Time the claim was taken.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimed_at"
                          },
                          "x-order": 7,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "expiresAt": {
                          "description": "Time the claim lapses unless the holder renews it. Always set by the server; a claim past this time is stale.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "expires_at"
                          },
                          "x-order": 8,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "releasedAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Time the holder released the claim. Null while the claim is active or after it expired.",
                          "nullable": true,
                          "x-go-type": "core.NullTime",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "released_at"
                          },
                          "x-order": 9
                        },
                        "createdAt": {
                          "description": "Timestamp of claim creation.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "created_at"
                          },
                          "x-order": 10,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "updatedAt": {
                          "description": "Timestamp of last claim modification.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "updated_at"
                          },
                          "x-order": 11,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        }
                      }
                    },
                    "pausedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the schedule was paused. Null when the schedule is not paused. Server-managed.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_at"
                      },
                      "x-order": 18
                    },
                    "pausedBy": {
                      "type": "string",
                      "description": "Identity that paused the schedule. Server-managed.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_by"
                      },
                      "x-order": 19
                    },
                    "pauseReason": {
                      "type": "string",
                      "description": "Reason given for pausing the schedule. Server-managed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "pause_reason"
                      },
                      "x-order": 20
                    },
                    "createdAt": {
                      "description": "Timestamp of schedule creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 21,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last schedule modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 22,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the schedule was soft-deleted. Null while live.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at"
                      },
                      "x-order": 23
                    }
                  }
                }
              }
            }
          },
          "204": {
            "description": "No schedule was due and claimable"
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
    "/api/schedules/pause": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "schedules"
        ],
        "summary": "Get the organization-wide schedule pause",
        "operationId": "getSchedulePause",
        "description": "Returns the organization-wide pause, or 204 when every schedule in the\norganization may be claimed.\n",
        "responses": {
          "200": {
            "description": "The organization-wide pause",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Schedule Pause Schema",
                  "description": "Server-returned organization-wide schedule pause. While a pause exists for\nan organization, none of its schedules is claimed unless the claim\nrequest carries the operator override. Absence of a pause means\nunpaused; there is at most one live pause per organization. A pause on a\nsingle schedule is carried on the schedule itself.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "pausedAt",
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
                      "x-order": 1
                    },
                    "organizationId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-name": "OrganizationID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "organization_id"
                      },
                      "x-order": 2
                    },
                    "pausedAt": {
                      "description": "Time the pause was set.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_at"
                      },
                      "x-order": 3,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "pausedBy": {
                      "type": "string",
                      "description": "Identity that set the pause. Server-managed.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_by"
                      },
                      "x-order": 4
                    },
                    "reason": {
                      "type": "string",
                      "description": "Reason given for pausing every schedule in the organization.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "reason"
                      },
                      "x-order": 5
                    },
                    "createdAt": {
                      "description": "Timestamp of schedule pause creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 6,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last schedule pause modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 7,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    }
                  }
                }
              }
            }
          },
          "204": {
            "description": "The organization is not paused"
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
          "schedules"
        ],
        "summary": "Pause every schedule in the organization",
        "operationId": "setSchedulePause",
        "description": "Sets the organization-wide pause. While it exists no schedule in the\norganization is claimed unless the claim request carries `ignorePause`.\nSetting it again updates the reason and keeps the original time.\n",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Request to pause a schedule or every schedule in the organization.",
                "properties": {
                  "pausedBy": {
                    "type": "string",
                    "description": "Identity setting the pause; defaults to the authenticated user.",
                    "maxLength": 255
                  },
                  "reason": {
                    "type": "string",
                    "description": "Reason for the pause.",
                    "maxLength": 1000
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "The organization-wide pause",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Schedule Pause Schema",
                  "description": "Server-returned organization-wide schedule pause. While a pause exists for\nan organization, none of its schedules is claimed unless the claim\nrequest carries the operator override. Absence of a pause means\nunpaused; there is at most one live pause per organization. A pause on a\nsingle schedule is carried on the schedule itself.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "pausedAt",
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
                      "x-order": 1
                    },
                    "organizationId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-name": "OrganizationID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "organization_id"
                      },
                      "x-order": 2
                    },
                    "pausedAt": {
                      "description": "Time the pause was set.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_at"
                      },
                      "x-order": 3,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "pausedBy": {
                      "type": "string",
                      "description": "Identity that set the pause. Server-managed.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_by"
                      },
                      "x-order": 4
                    },
                    "reason": {
                      "type": "string",
                      "description": "Reason given for pausing every schedule in the organization.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "reason"
                      },
                      "x-order": 5
                    },
                    "createdAt": {
                      "description": "Timestamp of schedule pause creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 6,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last schedule pause modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 7,
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
          "schedules"
        ],
        "summary": "Lift the organization-wide schedule pause",
        "operationId": "clearSchedulePause",
        "description": "Lifts the organization-wide pause. Lifting a pause that does not exist\nis a no-op.\n",
        "responses": {
          "204": {
            "description": "The organization is not paused"
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
    "/api/schedules/{scheduleId}": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "schedules"
        ],
        "summary": "Get a schedule by ID",
        "operationId": "getScheduleById",
        "description": "Returns the schedule with its live claim, when one is held.\n",
        "parameters": [
          {
            "name": "scheduleId",
            "in": "path",
            "description": "Schedule ID",
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
            "description": "Schedule response",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Schedule Schema",
                  "description": "Server-returned schedule. A schedule is a job: an action to run with its\nparameters, when it is due (`runAt`, `nextRunAt`, `recurrence`), its retry\nbudget and its outcome. Schedules belong to an organization and may be\nlinked to a workspace. A worker takes a schedule through a claim (the\ngeneric `claim` construct, nested under the schedule); while the claim is\nlive no other worker can take it, and a claim past its `expiresAt` is\nstale and the schedule is claimable again. The `claim`, the status\nvalues `assigned`, `claimed` and `running`, and the pause fields are\nserver-managed: they change only through the claim, release, pause and\nresume operations and are refused on create and update.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "name",
                    "action",
                    "enabled",
                    "status",
                    "retryCount",
                    "maxRetries",
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
                      "x-order": 1
                    },
                    "organizationId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-name": "OrganizationID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "organization_id"
                      },
                      "x-order": 2
                    },
                    "workspaceId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "workspace_id",
                        "json": "workspaceId,omitempty"
                      },
                      "x-order": 3
                    },
                    "name": {
                      "type": "string",
                      "description": "Human-readable name for the schedule.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      },
                      "x-order": 4
                    },
                    "action": {
                      "type": "string",
                      "description": "The action the worker runs when it holds the schedule's claim, for example a command name.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "action"
                      },
                      "x-order": 5
                    },
                    "params": {
                      "type": "object",
                      "description": "Action parameters, stored as a JSON blob.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "params"
                      },
                      "x-order": 6
                    },
                    "enabled": {
                      "type": "boolean",
                      "description": "Whether the schedule is eligible to run. A disabled schedule is never claimed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "enabled"
                      },
                      "x-order": 7
                    },
                    "runAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the schedule first becomes due.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "run_at"
                      },
                      "x-order": 8
                    },
                    "nextRunAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Next time a recurring or retrying schedule becomes due.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "next_run_at"
                      },
                      "x-order": 9
                    },
                    "recurrence": {
                      "type": "string",
                      "description": "Recurrence rule for repeating schedules. Empty for a run-once schedule.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "recurrence"
                      },
                      "x-order": 10
                    },
                    "status": {
                      "type": "string",
                      "description": "Lifecycle status. `pending`: created, not yet due-scheduled.\n`scheduled`: waiting for its due time. `assigned`: designated for a\nparticular worker but not yet claimed. `claimed`: a worker holds the\nclaim and has not started. `running`: the claim holder is executing\nit. `retrying`: the last attempt failed and another is due.\n`completed`, `failed` and `cancelled` are terminal for a run-once\nschedule; a recurring schedule returns to `scheduled`.\n",
                      "enum": [
                        "pending",
                        "scheduled",
                        "assigned",
                        "claimed",
                        "running",
                        "retrying",
                        "completed",
                        "failed",
                        "cancelled"
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      },
                      "x-order": 11
                    },
                    "retryCount": {
                      "type": "integer",
                      "description": "Attempts already retried for the current run.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "retry_count"
                      },
                      "x-order": 12
                    },
                    "maxRetries": {
                      "type": "integer",
                      "description": "Maximum retries before the run is marked failed.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "max_retries"
                      },
                      "x-order": 13
                    },
                    "retryDelayMinutes": {
                      "type": "integer",
                      "description": "Minutes to wait before a retry becomes due.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "retry_delay_minutes"
                      },
                      "x-order": 14
                    },
                    "lastRunAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time of the most recent attempt.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_run_at"
                      },
                      "x-order": 15
                    },
                    "lastError": {
                      "type": "string",
                      "description": "Error reported by the most recent attempt.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_error"
                      },
                      "x-order": 16
                    },
                    "claim": {
                      "x-go-type": "*claimv1beta3.Claim",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta3/claim",
                        "name": "claimv1beta3"
                      },
                      "description": "The schedule's live claim, when one is held. Server-managed; omitted when the schedule is unclaimed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "-",
                        "json": "claim,omitempty"
                      },
                      "x-order": 17,
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "title": "Claim Schema",
                      "type": "object",
                      "additionalProperties": false,
                      "required": [
                        "id",
                        "organizationId",
                        "resourceType",
                        "resourceId",
                        "claimant",
                        "status",
                        "claimedAt",
                        "expiresAt",
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
                          "x-order": 1
                        },
                        "organizationId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-go-name": "OrganizationID",
                          "x-oapi-codegen-extra-tags": {
                            "db": "organization_id"
                          },
                          "x-order": 2
                        },
                        "resourceType": {
                          "type": "string",
                          "description": "Type of the claimed resource, for example `schedule`.",
                          "minLength": 1,
                          "maxLength": 64,
                          "x-oapi-codegen-extra-tags": {
                            "db": "resource_type"
                          },
                          "x-order": 3
                        },
                        "resourceId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "resource_id"
                          },
                          "x-order": 4
                        },
                        "claimant": {
                          "type": "string",
                          "description": "Identity of the holder, as asserted by the worker that took the claim (for example a machine and process identifier).",
                          "minLength": 1,
                          "maxLength": 255,
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimant"
                          },
                          "x-order": 5
                        },
                        "status": {
                          "type": "string",
                          "description": "Lifecycle of the claim. `active` while held, `released` once the holder lets it go, `expired` once `expiresAt` passed without a renewal.",
                          "enum": [
                            "active",
                            "released",
                            "expired"
                          ],
                          "x-oapi-codegen-extra-tags": {
                            "db": "status"
                          },
                          "x-order": 6
                        },
                        "claimedAt": {
                          "description": "Time the claim was taken.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimed_at"
                          },
                          "x-order": 7,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "expiresAt": {
                          "description": "Time the claim lapses unless the holder renews it. Always set by the server; a claim past this time is stale.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "expires_at"
                          },
                          "x-order": 8,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "releasedAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Time the holder released the claim. Null while the claim is active or after it expired.",
                          "nullable": true,
                          "x-go-type": "core.NullTime",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "released_at"
                          },
                          "x-order": 9
                        },
                        "createdAt": {
                          "description": "Timestamp of claim creation.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "created_at"
                          },
                          "x-order": 10,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "updatedAt": {
                          "description": "Timestamp of last claim modification.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "updated_at"
                          },
                          "x-order": 11,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        }
                      }
                    },
                    "pausedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the schedule was paused. Null when the schedule is not paused. Server-managed.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_at"
                      },
                      "x-order": 18
                    },
                    "pausedBy": {
                      "type": "string",
                      "description": "Identity that paused the schedule. Server-managed.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_by"
                      },
                      "x-order": 19
                    },
                    "pauseReason": {
                      "type": "string",
                      "description": "Reason given for pausing the schedule. Server-managed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "pause_reason"
                      },
                      "x-order": 20
                    },
                    "createdAt": {
                      "description": "Timestamp of schedule creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 21,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last schedule modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 22,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the schedule was soft-deleted. Null while live.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at"
                      },
                      "x-order": 23
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
      "put": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "schedules"
        ],
        "summary": "Update a schedule",
        "operationId": "updateSchedule",
        "description": "Updates the client-settable fields of a schedule. The claim, the\nserver-managed status values and the pause fields are refused here.\n",
        "parameters": [
          {
            "name": "scheduleId",
            "in": "path",
            "description": "Schedule ID",
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
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for creating or updating a schedule. Contains only\nclient-settable fields; the owning `organizationId`, the claim, the\npause fields, `retryCount`, `lastRunAt`, `lastError` and the\ntimestamps are server-managed. `status` accepts only `pending`,\n`scheduled` and `cancelled` here; the other values are set by the\nclaim and release operations.\n",
                "required": [
                  "name",
                  "action"
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
                    "x-oapi-codegen-extra-tags": {
                      "json": "id,omitempty"
                    }
                  },
                  "workspaceId": {
                    "type": "string",
                    "format": "uuid",
                    "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    },
                    "x-oapi-codegen-extra-tags": {
                      "json": "workspaceId,omitempty"
                    }
                  },
                  "name": {
                    "type": "string",
                    "description": "Human-readable name for the schedule.",
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "action": {
                    "type": "string",
                    "description": "The action the worker runs, for example a command name.",
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "params": {
                    "type": "object",
                    "description": "Action parameters, stored as a JSON blob.",
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    },
                    "x-go-type-skip-optional-pointer": true
                  },
                  "enabled": {
                    "type": "boolean",
                    "description": "Whether the schedule is eligible to run. Defaults to true."
                  },
                  "runAt": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Time the schedule first becomes due.",
                    "nullable": true,
                    "x-go-type": "core.NullTime",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    }
                  },
                  "recurrence": {
                    "type": "string",
                    "description": "Recurrence rule for repeating schedules. Empty for a run-once schedule.",
                    "maxLength": 255
                  },
                  "status": {
                    "type": "string",
                    "description": "Client-settable status. Omit to let the server choose `scheduled` for a due-timed schedule and `pending` otherwise.",
                    "enum": [
                      "pending",
                      "scheduled",
                      "cancelled"
                    ]
                  },
                  "maxRetries": {
                    "type": "integer",
                    "description": "Maximum retries before the run is marked failed.",
                    "minimum": 0
                  },
                  "retryDelayMinutes": {
                    "type": "integer",
                    "description": "Minutes to wait before a retry becomes due.",
                    "minimum": 0
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Schedule updated",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Schedule Schema",
                  "description": "Server-returned schedule. A schedule is a job: an action to run with its\nparameters, when it is due (`runAt`, `nextRunAt`, `recurrence`), its retry\nbudget and its outcome. Schedules belong to an organization and may be\nlinked to a workspace. A worker takes a schedule through a claim (the\ngeneric `claim` construct, nested under the schedule); while the claim is\nlive no other worker can take it, and a claim past its `expiresAt` is\nstale and the schedule is claimable again. The `claim`, the status\nvalues `assigned`, `claimed` and `running`, and the pause fields are\nserver-managed: they change only through the claim, release, pause and\nresume operations and are refused on create and update.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "name",
                    "action",
                    "enabled",
                    "status",
                    "retryCount",
                    "maxRetries",
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
                      "x-order": 1
                    },
                    "organizationId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-name": "OrganizationID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "organization_id"
                      },
                      "x-order": 2
                    },
                    "workspaceId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "workspace_id",
                        "json": "workspaceId,omitempty"
                      },
                      "x-order": 3
                    },
                    "name": {
                      "type": "string",
                      "description": "Human-readable name for the schedule.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      },
                      "x-order": 4
                    },
                    "action": {
                      "type": "string",
                      "description": "The action the worker runs when it holds the schedule's claim, for example a command name.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "action"
                      },
                      "x-order": 5
                    },
                    "params": {
                      "type": "object",
                      "description": "Action parameters, stored as a JSON blob.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "params"
                      },
                      "x-order": 6
                    },
                    "enabled": {
                      "type": "boolean",
                      "description": "Whether the schedule is eligible to run. A disabled schedule is never claimed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "enabled"
                      },
                      "x-order": 7
                    },
                    "runAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the schedule first becomes due.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "run_at"
                      },
                      "x-order": 8
                    },
                    "nextRunAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Next time a recurring or retrying schedule becomes due.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "next_run_at"
                      },
                      "x-order": 9
                    },
                    "recurrence": {
                      "type": "string",
                      "description": "Recurrence rule for repeating schedules. Empty for a run-once schedule.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "recurrence"
                      },
                      "x-order": 10
                    },
                    "status": {
                      "type": "string",
                      "description": "Lifecycle status. `pending`: created, not yet due-scheduled.\n`scheduled`: waiting for its due time. `assigned`: designated for a\nparticular worker but not yet claimed. `claimed`: a worker holds the\nclaim and has not started. `running`: the claim holder is executing\nit. `retrying`: the last attempt failed and another is due.\n`completed`, `failed` and `cancelled` are terminal for a run-once\nschedule; a recurring schedule returns to `scheduled`.\n",
                      "enum": [
                        "pending",
                        "scheduled",
                        "assigned",
                        "claimed",
                        "running",
                        "retrying",
                        "completed",
                        "failed",
                        "cancelled"
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      },
                      "x-order": 11
                    },
                    "retryCount": {
                      "type": "integer",
                      "description": "Attempts already retried for the current run.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "retry_count"
                      },
                      "x-order": 12
                    },
                    "maxRetries": {
                      "type": "integer",
                      "description": "Maximum retries before the run is marked failed.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "max_retries"
                      },
                      "x-order": 13
                    },
                    "retryDelayMinutes": {
                      "type": "integer",
                      "description": "Minutes to wait before a retry becomes due.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "retry_delay_minutes"
                      },
                      "x-order": 14
                    },
                    "lastRunAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time of the most recent attempt.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_run_at"
                      },
                      "x-order": 15
                    },
                    "lastError": {
                      "type": "string",
                      "description": "Error reported by the most recent attempt.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_error"
                      },
                      "x-order": 16
                    },
                    "claim": {
                      "x-go-type": "*claimv1beta3.Claim",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta3/claim",
                        "name": "claimv1beta3"
                      },
                      "description": "The schedule's live claim, when one is held. Server-managed; omitted when the schedule is unclaimed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "-",
                        "json": "claim,omitempty"
                      },
                      "x-order": 17,
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "title": "Claim Schema",
                      "type": "object",
                      "additionalProperties": false,
                      "required": [
                        "id",
                        "organizationId",
                        "resourceType",
                        "resourceId",
                        "claimant",
                        "status",
                        "claimedAt",
                        "expiresAt",
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
                          "x-order": 1
                        },
                        "organizationId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-go-name": "OrganizationID",
                          "x-oapi-codegen-extra-tags": {
                            "db": "organization_id"
                          },
                          "x-order": 2
                        },
                        "resourceType": {
                          "type": "string",
                          "description": "Type of the claimed resource, for example `schedule`.",
                          "minLength": 1,
                          "maxLength": 64,
                          "x-oapi-codegen-extra-tags": {
                            "db": "resource_type"
                          },
                          "x-order": 3
                        },
                        "resourceId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "resource_id"
                          },
                          "x-order": 4
                        },
                        "claimant": {
                          "type": "string",
                          "description": "Identity of the holder, as asserted by the worker that took the claim (for example a machine and process identifier).",
                          "minLength": 1,
                          "maxLength": 255,
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimant"
                          },
                          "x-order": 5
                        },
                        "status": {
                          "type": "string",
                          "description": "Lifecycle of the claim. `active` while held, `released` once the holder lets it go, `expired` once `expiresAt` passed without a renewal.",
                          "enum": [
                            "active",
                            "released",
                            "expired"
                          ],
                          "x-oapi-codegen-extra-tags": {
                            "db": "status"
                          },
                          "x-order": 6
                        },
                        "claimedAt": {
                          "description": "Time the claim was taken.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimed_at"
                          },
                          "x-order": 7,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "expiresAt": {
                          "description": "Time the claim lapses unless the holder renews it. Always set by the server; a claim past this time is stale.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "expires_at"
                          },
                          "x-order": 8,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "releasedAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Time the holder released the claim. Null while the claim is active or after it expired.",
                          "nullable": true,
                          "x-go-type": "core.NullTime",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "released_at"
                          },
                          "x-order": 9
                        },
                        "createdAt": {
                          "description": "Timestamp of claim creation.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "created_at"
                          },
                          "x-order": 10,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "updatedAt": {
                          "description": "Timestamp of last claim modification.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "updated_at"
                          },
                          "x-order": 11,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        }
                      }
                    },
                    "pausedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the schedule was paused. Null when the schedule is not paused. Server-managed.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_at"
                      },
                      "x-order": 18
                    },
                    "pausedBy": {
                      "type": "string",
                      "description": "Identity that paused the schedule. Server-managed.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_by"
                      },
                      "x-order": 19
                    },
                    "pauseReason": {
                      "type": "string",
                      "description": "Reason given for pausing the schedule. Server-managed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "pause_reason"
                      },
                      "x-order": 20
                    },
                    "createdAt": {
                      "description": "Timestamp of schedule creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 21,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last schedule modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 22,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the schedule was soft-deleted. Null while live.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at"
                      },
                      "x-order": 23
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
          "schedules"
        ],
        "summary": "Delete a schedule",
        "operationId": "deleteScheduleById",
        "description": "Soft-deletes the schedule. A schedule with a live claim is deleted all the same; its claim is released.\n",
        "parameters": [
          {
            "name": "scheduleId",
            "in": "path",
            "description": "Schedule ID",
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
          "204": {
            "description": "Schedule deleted"
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
    "/api/schedules/{scheduleId}/claim": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "schedules"
        ],
        "summary": "Claim a schedule",
        "operationId": "claimSchedule",
        "description": "Claims this schedule for `claimant`. Without `force` the schedule must be\ndue; `force` drops only the due test (trigger now), and a live claim held\nby another claimant still answers 409. Pauses refuse the claim unless\n`ignorePause` is set. Answers the schedule with its new claim.\n",
        "parameters": [
          {
            "name": "scheduleId",
            "in": "path",
            "description": "Schedule ID",
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
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Request to claim one named schedule.",
                "required": [
                  "claimant"
                ],
                "properties": {
                  "claimant": {
                    "type": "string",
                    "description": "Identity of the worker taking the claim.",
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "durationMinutes": {
                    "type": "integer",
                    "description": "Requested claim duration in minutes; the server applies its default when omitted and may cap it.",
                    "minimum": 1,
                    "maximum": 1440
                  },
                  "force": {
                    "type": "boolean",
                    "description": "Claim even though the schedule is not yet due (trigger now). A live claim held by another claimant still refuses."
                  },
                  "ignorePause": {
                    "type": "boolean",
                    "description": "Operator override that claims through the organization-wide and per-schedule pauses."
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "The claimed schedule",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Schedule Schema",
                  "description": "Server-returned schedule. A schedule is a job: an action to run with its\nparameters, when it is due (`runAt`, `nextRunAt`, `recurrence`), its retry\nbudget and its outcome. Schedules belong to an organization and may be\nlinked to a workspace. A worker takes a schedule through a claim (the\ngeneric `claim` construct, nested under the schedule); while the claim is\nlive no other worker can take it, and a claim past its `expiresAt` is\nstale and the schedule is claimable again. The `claim`, the status\nvalues `assigned`, `claimed` and `running`, and the pause fields are\nserver-managed: they change only through the claim, release, pause and\nresume operations and are refused on create and update.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "name",
                    "action",
                    "enabled",
                    "status",
                    "retryCount",
                    "maxRetries",
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
                      "x-order": 1
                    },
                    "organizationId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-name": "OrganizationID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "organization_id"
                      },
                      "x-order": 2
                    },
                    "workspaceId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "workspace_id",
                        "json": "workspaceId,omitempty"
                      },
                      "x-order": 3
                    },
                    "name": {
                      "type": "string",
                      "description": "Human-readable name for the schedule.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      },
                      "x-order": 4
                    },
                    "action": {
                      "type": "string",
                      "description": "The action the worker runs when it holds the schedule's claim, for example a command name.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "action"
                      },
                      "x-order": 5
                    },
                    "params": {
                      "type": "object",
                      "description": "Action parameters, stored as a JSON blob.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "params"
                      },
                      "x-order": 6
                    },
                    "enabled": {
                      "type": "boolean",
                      "description": "Whether the schedule is eligible to run. A disabled schedule is never claimed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "enabled"
                      },
                      "x-order": 7
                    },
                    "runAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the schedule first becomes due.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "run_at"
                      },
                      "x-order": 8
                    },
                    "nextRunAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Next time a recurring or retrying schedule becomes due.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "next_run_at"
                      },
                      "x-order": 9
                    },
                    "recurrence": {
                      "type": "string",
                      "description": "Recurrence rule for repeating schedules. Empty for a run-once schedule.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "recurrence"
                      },
                      "x-order": 10
                    },
                    "status": {
                      "type": "string",
                      "description": "Lifecycle status. `pending`: created, not yet due-scheduled.\n`scheduled`: waiting for its due time. `assigned`: designated for a\nparticular worker but not yet claimed. `claimed`: a worker holds the\nclaim and has not started. `running`: the claim holder is executing\nit. `retrying`: the last attempt failed and another is due.\n`completed`, `failed` and `cancelled` are terminal for a run-once\nschedule; a recurring schedule returns to `scheduled`.\n",
                      "enum": [
                        "pending",
                        "scheduled",
                        "assigned",
                        "claimed",
                        "running",
                        "retrying",
                        "completed",
                        "failed",
                        "cancelled"
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      },
                      "x-order": 11
                    },
                    "retryCount": {
                      "type": "integer",
                      "description": "Attempts already retried for the current run.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "retry_count"
                      },
                      "x-order": 12
                    },
                    "maxRetries": {
                      "type": "integer",
                      "description": "Maximum retries before the run is marked failed.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "max_retries"
                      },
                      "x-order": 13
                    },
                    "retryDelayMinutes": {
                      "type": "integer",
                      "description": "Minutes to wait before a retry becomes due.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "retry_delay_minutes"
                      },
                      "x-order": 14
                    },
                    "lastRunAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time of the most recent attempt.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_run_at"
                      },
                      "x-order": 15
                    },
                    "lastError": {
                      "type": "string",
                      "description": "Error reported by the most recent attempt.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_error"
                      },
                      "x-order": 16
                    },
                    "claim": {
                      "x-go-type": "*claimv1beta3.Claim",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta3/claim",
                        "name": "claimv1beta3"
                      },
                      "description": "The schedule's live claim, when one is held. Server-managed; omitted when the schedule is unclaimed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "-",
                        "json": "claim,omitempty"
                      },
                      "x-order": 17,
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "title": "Claim Schema",
                      "type": "object",
                      "additionalProperties": false,
                      "required": [
                        "id",
                        "organizationId",
                        "resourceType",
                        "resourceId",
                        "claimant",
                        "status",
                        "claimedAt",
                        "expiresAt",
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
                          "x-order": 1
                        },
                        "organizationId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-go-name": "OrganizationID",
                          "x-oapi-codegen-extra-tags": {
                            "db": "organization_id"
                          },
                          "x-order": 2
                        },
                        "resourceType": {
                          "type": "string",
                          "description": "Type of the claimed resource, for example `schedule`.",
                          "minLength": 1,
                          "maxLength": 64,
                          "x-oapi-codegen-extra-tags": {
                            "db": "resource_type"
                          },
                          "x-order": 3
                        },
                        "resourceId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "resource_id"
                          },
                          "x-order": 4
                        },
                        "claimant": {
                          "type": "string",
                          "description": "Identity of the holder, as asserted by the worker that took the claim (for example a machine and process identifier).",
                          "minLength": 1,
                          "maxLength": 255,
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimant"
                          },
                          "x-order": 5
                        },
                        "status": {
                          "type": "string",
                          "description": "Lifecycle of the claim. `active` while held, `released` once the holder lets it go, `expired` once `expiresAt` passed without a renewal.",
                          "enum": [
                            "active",
                            "released",
                            "expired"
                          ],
                          "x-oapi-codegen-extra-tags": {
                            "db": "status"
                          },
                          "x-order": 6
                        },
                        "claimedAt": {
                          "description": "Time the claim was taken.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimed_at"
                          },
                          "x-order": 7,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "expiresAt": {
                          "description": "Time the claim lapses unless the holder renews it. Always set by the server; a claim past this time is stale.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "expires_at"
                          },
                          "x-order": 8,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "releasedAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Time the holder released the claim. Null while the claim is active or after it expired.",
                          "nullable": true,
                          "x-go-type": "core.NullTime",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "released_at"
                          },
                          "x-order": 9
                        },
                        "createdAt": {
                          "description": "Timestamp of claim creation.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "created_at"
                          },
                          "x-order": 10,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "updatedAt": {
                          "description": "Timestamp of last claim modification.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "updated_at"
                          },
                          "x-order": 11,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        }
                      }
                    },
                    "pausedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the schedule was paused. Null when the schedule is not paused. Server-managed.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_at"
                      },
                      "x-order": 18
                    },
                    "pausedBy": {
                      "type": "string",
                      "description": "Identity that paused the schedule. Server-managed.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_by"
                      },
                      "x-order": 19
                    },
                    "pauseReason": {
                      "type": "string",
                      "description": "Reason given for pausing the schedule. Server-managed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "pause_reason"
                      },
                      "x-order": 20
                    },
                    "createdAt": {
                      "description": "Timestamp of schedule creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 21,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last schedule modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 22,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the schedule was soft-deleted. Null while live.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at"
                      },
                      "x-order": 23
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
          "409": {
            "description": "Conflict - the schedule is held by another claimant's live claim, or the caller is not the holder of the claim it tried to renew or release",
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
    "/api/schedules/{scheduleId}/claim/renew": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "schedules"
        ],
        "summary": "Renew a schedule's claim",
        "operationId": "renewScheduleClaim",
        "description": "Moves the claim's `expiresAt` forward for the holder only. A claim that\nis not live or belongs to another claimant answers 409 and is never\ntaken back.\n",
        "parameters": [
          {
            "name": "scheduleId",
            "in": "path",
            "description": "Schedule ID",
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
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for renewing a claim. Only the holder named by `claimant` may renew.",
                "required": [
                  "claimant"
                ],
                "properties": {
                  "claimant": {
                    "type": "string",
                    "description": "Identity of the holder renewing the claim.",
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "durationMinutes": {
                    "type": "integer",
                    "description": "Requested extension in minutes from now; the server applies its default when omitted and may cap it.",
                    "minimum": 1,
                    "maximum": 1440
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "The schedule with its renewed claim",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Schedule Schema",
                  "description": "Server-returned schedule. A schedule is a job: an action to run with its\nparameters, when it is due (`runAt`, `nextRunAt`, `recurrence`), its retry\nbudget and its outcome. Schedules belong to an organization and may be\nlinked to a workspace. A worker takes a schedule through a claim (the\ngeneric `claim` construct, nested under the schedule); while the claim is\nlive no other worker can take it, and a claim past its `expiresAt` is\nstale and the schedule is claimable again. The `claim`, the status\nvalues `assigned`, `claimed` and `running`, and the pause fields are\nserver-managed: they change only through the claim, release, pause and\nresume operations and are refused on create and update.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "name",
                    "action",
                    "enabled",
                    "status",
                    "retryCount",
                    "maxRetries",
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
                      "x-order": 1
                    },
                    "organizationId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-name": "OrganizationID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "organization_id"
                      },
                      "x-order": 2
                    },
                    "workspaceId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "workspace_id",
                        "json": "workspaceId,omitempty"
                      },
                      "x-order": 3
                    },
                    "name": {
                      "type": "string",
                      "description": "Human-readable name for the schedule.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      },
                      "x-order": 4
                    },
                    "action": {
                      "type": "string",
                      "description": "The action the worker runs when it holds the schedule's claim, for example a command name.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "action"
                      },
                      "x-order": 5
                    },
                    "params": {
                      "type": "object",
                      "description": "Action parameters, stored as a JSON blob.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "params"
                      },
                      "x-order": 6
                    },
                    "enabled": {
                      "type": "boolean",
                      "description": "Whether the schedule is eligible to run. A disabled schedule is never claimed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "enabled"
                      },
                      "x-order": 7
                    },
                    "runAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the schedule first becomes due.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "run_at"
                      },
                      "x-order": 8
                    },
                    "nextRunAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Next time a recurring or retrying schedule becomes due.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "next_run_at"
                      },
                      "x-order": 9
                    },
                    "recurrence": {
                      "type": "string",
                      "description": "Recurrence rule for repeating schedules. Empty for a run-once schedule.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "recurrence"
                      },
                      "x-order": 10
                    },
                    "status": {
                      "type": "string",
                      "description": "Lifecycle status. `pending`: created, not yet due-scheduled.\n`scheduled`: waiting for its due time. `assigned`: designated for a\nparticular worker but not yet claimed. `claimed`: a worker holds the\nclaim and has not started. `running`: the claim holder is executing\nit. `retrying`: the last attempt failed and another is due.\n`completed`, `failed` and `cancelled` are terminal for a run-once\nschedule; a recurring schedule returns to `scheduled`.\n",
                      "enum": [
                        "pending",
                        "scheduled",
                        "assigned",
                        "claimed",
                        "running",
                        "retrying",
                        "completed",
                        "failed",
                        "cancelled"
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      },
                      "x-order": 11
                    },
                    "retryCount": {
                      "type": "integer",
                      "description": "Attempts already retried for the current run.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "retry_count"
                      },
                      "x-order": 12
                    },
                    "maxRetries": {
                      "type": "integer",
                      "description": "Maximum retries before the run is marked failed.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "max_retries"
                      },
                      "x-order": 13
                    },
                    "retryDelayMinutes": {
                      "type": "integer",
                      "description": "Minutes to wait before a retry becomes due.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "retry_delay_minutes"
                      },
                      "x-order": 14
                    },
                    "lastRunAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time of the most recent attempt.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_run_at"
                      },
                      "x-order": 15
                    },
                    "lastError": {
                      "type": "string",
                      "description": "Error reported by the most recent attempt.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_error"
                      },
                      "x-order": 16
                    },
                    "claim": {
                      "x-go-type": "*claimv1beta3.Claim",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta3/claim",
                        "name": "claimv1beta3"
                      },
                      "description": "The schedule's live claim, when one is held. Server-managed; omitted when the schedule is unclaimed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "-",
                        "json": "claim,omitempty"
                      },
                      "x-order": 17,
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "title": "Claim Schema",
                      "type": "object",
                      "additionalProperties": false,
                      "required": [
                        "id",
                        "organizationId",
                        "resourceType",
                        "resourceId",
                        "claimant",
                        "status",
                        "claimedAt",
                        "expiresAt",
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
                          "x-order": 1
                        },
                        "organizationId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-go-name": "OrganizationID",
                          "x-oapi-codegen-extra-tags": {
                            "db": "organization_id"
                          },
                          "x-order": 2
                        },
                        "resourceType": {
                          "type": "string",
                          "description": "Type of the claimed resource, for example `schedule`.",
                          "minLength": 1,
                          "maxLength": 64,
                          "x-oapi-codegen-extra-tags": {
                            "db": "resource_type"
                          },
                          "x-order": 3
                        },
                        "resourceId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "resource_id"
                          },
                          "x-order": 4
                        },
                        "claimant": {
                          "type": "string",
                          "description": "Identity of the holder, as asserted by the worker that took the claim (for example a machine and process identifier).",
                          "minLength": 1,
                          "maxLength": 255,
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimant"
                          },
                          "x-order": 5
                        },
                        "status": {
                          "type": "string",
                          "description": "Lifecycle of the claim. `active` while held, `released` once the holder lets it go, `expired` once `expiresAt` passed without a renewal.",
                          "enum": [
                            "active",
                            "released",
                            "expired"
                          ],
                          "x-oapi-codegen-extra-tags": {
                            "db": "status"
                          },
                          "x-order": 6
                        },
                        "claimedAt": {
                          "description": "Time the claim was taken.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimed_at"
                          },
                          "x-order": 7,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "expiresAt": {
                          "description": "Time the claim lapses unless the holder renews it. Always set by the server; a claim past this time is stale.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "expires_at"
                          },
                          "x-order": 8,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "releasedAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Time the holder released the claim. Null while the claim is active or after it expired.",
                          "nullable": true,
                          "x-go-type": "core.NullTime",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "released_at"
                          },
                          "x-order": 9
                        },
                        "createdAt": {
                          "description": "Timestamp of claim creation.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "created_at"
                          },
                          "x-order": 10,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "updatedAt": {
                          "description": "Timestamp of last claim modification.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "updated_at"
                          },
                          "x-order": 11,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        }
                      }
                    },
                    "pausedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the schedule was paused. Null when the schedule is not paused. Server-managed.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_at"
                      },
                      "x-order": 18
                    },
                    "pausedBy": {
                      "type": "string",
                      "description": "Identity that paused the schedule. Server-managed.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_by"
                      },
                      "x-order": 19
                    },
                    "pauseReason": {
                      "type": "string",
                      "description": "Reason given for pausing the schedule. Server-managed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "pause_reason"
                      },
                      "x-order": 20
                    },
                    "createdAt": {
                      "description": "Timestamp of schedule creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 21,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last schedule modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 22,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the schedule was soft-deleted. Null while live.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at"
                      },
                      "x-order": 23
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
          "409": {
            "description": "Conflict - the schedule is held by another claimant's live claim, or the caller is not the holder of the claim it tried to renew or release",
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
    "/api/schedules/{scheduleId}/claim/release": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "schedules"
        ],
        "summary": "Release a schedule's claim",
        "operationId": "releaseScheduleClaim",
        "description": "Releases the holder's claim and applies the run's outcome in the same\nstatement (`status`, `lastRunAt`, `lastError`, `nextRunAt`,\n`retryCount`). A release by another claimant answers 409.\n",
        "parameters": [
          {
            "name": "scheduleId",
            "in": "path",
            "description": "Schedule ID",
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
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Request to release a schedule's claim and record the run's outcome.",
                "required": [
                  "claimant"
                ],
                "properties": {
                  "claimant": {
                    "type": "string",
                    "description": "Identity of the holder releasing the claim.",
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "status": {
                    "type": "string",
                    "description": "Outcome status to record with the release.",
                    "enum": [
                      "scheduled",
                      "retrying",
                      "completed",
                      "failed",
                      "cancelled"
                    ]
                  },
                  "lastRunAt": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Time of the attempt being reported.",
                    "nullable": true,
                    "x-go-type": "core.NullTime",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    }
                  },
                  "lastError": {
                    "type": "string",
                    "description": "Error reported by the attempt; empty on success."
                  },
                  "nextRunAt": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Next due time for a recurring or retrying schedule.",
                    "nullable": true,
                    "x-go-type": "core.NullTime",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    }
                  },
                  "retryCount": {
                    "type": "integer",
                    "description": "Retries used so far for the current run.",
                    "minimum": 0
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "The released schedule",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Schedule Schema",
                  "description": "Server-returned schedule. A schedule is a job: an action to run with its\nparameters, when it is due (`runAt`, `nextRunAt`, `recurrence`), its retry\nbudget and its outcome. Schedules belong to an organization and may be\nlinked to a workspace. A worker takes a schedule through a claim (the\ngeneric `claim` construct, nested under the schedule); while the claim is\nlive no other worker can take it, and a claim past its `expiresAt` is\nstale and the schedule is claimable again. The `claim`, the status\nvalues `assigned`, `claimed` and `running`, and the pause fields are\nserver-managed: they change only through the claim, release, pause and\nresume operations and are refused on create and update.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "name",
                    "action",
                    "enabled",
                    "status",
                    "retryCount",
                    "maxRetries",
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
                      "x-order": 1
                    },
                    "organizationId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-name": "OrganizationID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "organization_id"
                      },
                      "x-order": 2
                    },
                    "workspaceId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "workspace_id",
                        "json": "workspaceId,omitempty"
                      },
                      "x-order": 3
                    },
                    "name": {
                      "type": "string",
                      "description": "Human-readable name for the schedule.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      },
                      "x-order": 4
                    },
                    "action": {
                      "type": "string",
                      "description": "The action the worker runs when it holds the schedule's claim, for example a command name.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "action"
                      },
                      "x-order": 5
                    },
                    "params": {
                      "type": "object",
                      "description": "Action parameters, stored as a JSON blob.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "params"
                      },
                      "x-order": 6
                    },
                    "enabled": {
                      "type": "boolean",
                      "description": "Whether the schedule is eligible to run. A disabled schedule is never claimed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "enabled"
                      },
                      "x-order": 7
                    },
                    "runAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the schedule first becomes due.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "run_at"
                      },
                      "x-order": 8
                    },
                    "nextRunAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Next time a recurring or retrying schedule becomes due.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "next_run_at"
                      },
                      "x-order": 9
                    },
                    "recurrence": {
                      "type": "string",
                      "description": "Recurrence rule for repeating schedules. Empty for a run-once schedule.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "recurrence"
                      },
                      "x-order": 10
                    },
                    "status": {
                      "type": "string",
                      "description": "Lifecycle status. `pending`: created, not yet due-scheduled.\n`scheduled`: waiting for its due time. `assigned`: designated for a\nparticular worker but not yet claimed. `claimed`: a worker holds the\nclaim and has not started. `running`: the claim holder is executing\nit. `retrying`: the last attempt failed and another is due.\n`completed`, `failed` and `cancelled` are terminal for a run-once\nschedule; a recurring schedule returns to `scheduled`.\n",
                      "enum": [
                        "pending",
                        "scheduled",
                        "assigned",
                        "claimed",
                        "running",
                        "retrying",
                        "completed",
                        "failed",
                        "cancelled"
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      },
                      "x-order": 11
                    },
                    "retryCount": {
                      "type": "integer",
                      "description": "Attempts already retried for the current run.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "retry_count"
                      },
                      "x-order": 12
                    },
                    "maxRetries": {
                      "type": "integer",
                      "description": "Maximum retries before the run is marked failed.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "max_retries"
                      },
                      "x-order": 13
                    },
                    "retryDelayMinutes": {
                      "type": "integer",
                      "description": "Minutes to wait before a retry becomes due.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "retry_delay_minutes"
                      },
                      "x-order": 14
                    },
                    "lastRunAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time of the most recent attempt.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_run_at"
                      },
                      "x-order": 15
                    },
                    "lastError": {
                      "type": "string",
                      "description": "Error reported by the most recent attempt.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_error"
                      },
                      "x-order": 16
                    },
                    "claim": {
                      "x-go-type": "*claimv1beta3.Claim",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta3/claim",
                        "name": "claimv1beta3"
                      },
                      "description": "The schedule's live claim, when one is held. Server-managed; omitted when the schedule is unclaimed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "-",
                        "json": "claim,omitempty"
                      },
                      "x-order": 17,
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "title": "Claim Schema",
                      "type": "object",
                      "additionalProperties": false,
                      "required": [
                        "id",
                        "organizationId",
                        "resourceType",
                        "resourceId",
                        "claimant",
                        "status",
                        "claimedAt",
                        "expiresAt",
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
                          "x-order": 1
                        },
                        "organizationId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-go-name": "OrganizationID",
                          "x-oapi-codegen-extra-tags": {
                            "db": "organization_id"
                          },
                          "x-order": 2
                        },
                        "resourceType": {
                          "type": "string",
                          "description": "Type of the claimed resource, for example `schedule`.",
                          "minLength": 1,
                          "maxLength": 64,
                          "x-oapi-codegen-extra-tags": {
                            "db": "resource_type"
                          },
                          "x-order": 3
                        },
                        "resourceId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "resource_id"
                          },
                          "x-order": 4
                        },
                        "claimant": {
                          "type": "string",
                          "description": "Identity of the holder, as asserted by the worker that took the claim (for example a machine and process identifier).",
                          "minLength": 1,
                          "maxLength": 255,
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimant"
                          },
                          "x-order": 5
                        },
                        "status": {
                          "type": "string",
                          "description": "Lifecycle of the claim. `active` while held, `released` once the holder lets it go, `expired` once `expiresAt` passed without a renewal.",
                          "enum": [
                            "active",
                            "released",
                            "expired"
                          ],
                          "x-oapi-codegen-extra-tags": {
                            "db": "status"
                          },
                          "x-order": 6
                        },
                        "claimedAt": {
                          "description": "Time the claim was taken.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimed_at"
                          },
                          "x-order": 7,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "expiresAt": {
                          "description": "Time the claim lapses unless the holder renews it. Always set by the server; a claim past this time is stale.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "expires_at"
                          },
                          "x-order": 8,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "releasedAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Time the holder released the claim. Null while the claim is active or after it expired.",
                          "nullable": true,
                          "x-go-type": "core.NullTime",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "released_at"
                          },
                          "x-order": 9
                        },
                        "createdAt": {
                          "description": "Timestamp of claim creation.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "created_at"
                          },
                          "x-order": 10,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "updatedAt": {
                          "description": "Timestamp of last claim modification.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "updated_at"
                          },
                          "x-order": 11,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        }
                      }
                    },
                    "pausedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the schedule was paused. Null when the schedule is not paused. Server-managed.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_at"
                      },
                      "x-order": 18
                    },
                    "pausedBy": {
                      "type": "string",
                      "description": "Identity that paused the schedule. Server-managed.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_by"
                      },
                      "x-order": 19
                    },
                    "pauseReason": {
                      "type": "string",
                      "description": "Reason given for pausing the schedule. Server-managed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "pause_reason"
                      },
                      "x-order": 20
                    },
                    "createdAt": {
                      "description": "Timestamp of schedule creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 21,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last schedule modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 22,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the schedule was soft-deleted. Null while live.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at"
                      },
                      "x-order": 23
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
          "409": {
            "description": "Conflict - the schedule is held by another claimant's live claim, or the caller is not the holder of the claim it tried to renew or release",
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
    "/api/schedules/{scheduleId}/pause": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "schedules"
        ],
        "summary": "Pause a schedule",
        "operationId": "pauseSchedule",
        "description": "Pauses this schedule so it is never claimed until resumed. Pausing a\npaused schedule keeps its original pause time.\n",
        "parameters": [
          {
            "name": "scheduleId",
            "in": "path",
            "description": "Schedule ID",
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
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Request to pause a schedule or every schedule in the organization.",
                "properties": {
                  "pausedBy": {
                    "type": "string",
                    "description": "Identity setting the pause; defaults to the authenticated user.",
                    "maxLength": 255
                  },
                  "reason": {
                    "type": "string",
                    "description": "Reason for the pause.",
                    "maxLength": 1000
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "The paused schedule",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Schedule Schema",
                  "description": "Server-returned schedule. A schedule is a job: an action to run with its\nparameters, when it is due (`runAt`, `nextRunAt`, `recurrence`), its retry\nbudget and its outcome. Schedules belong to an organization and may be\nlinked to a workspace. A worker takes a schedule through a claim (the\ngeneric `claim` construct, nested under the schedule); while the claim is\nlive no other worker can take it, and a claim past its `expiresAt` is\nstale and the schedule is claimable again. The `claim`, the status\nvalues `assigned`, `claimed` and `running`, and the pause fields are\nserver-managed: they change only through the claim, release, pause and\nresume operations and are refused on create and update.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "name",
                    "action",
                    "enabled",
                    "status",
                    "retryCount",
                    "maxRetries",
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
                      "x-order": 1
                    },
                    "organizationId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-name": "OrganizationID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "organization_id"
                      },
                      "x-order": 2
                    },
                    "workspaceId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "workspace_id",
                        "json": "workspaceId,omitempty"
                      },
                      "x-order": 3
                    },
                    "name": {
                      "type": "string",
                      "description": "Human-readable name for the schedule.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      },
                      "x-order": 4
                    },
                    "action": {
                      "type": "string",
                      "description": "The action the worker runs when it holds the schedule's claim, for example a command name.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "action"
                      },
                      "x-order": 5
                    },
                    "params": {
                      "type": "object",
                      "description": "Action parameters, stored as a JSON blob.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "params"
                      },
                      "x-order": 6
                    },
                    "enabled": {
                      "type": "boolean",
                      "description": "Whether the schedule is eligible to run. A disabled schedule is never claimed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "enabled"
                      },
                      "x-order": 7
                    },
                    "runAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the schedule first becomes due.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "run_at"
                      },
                      "x-order": 8
                    },
                    "nextRunAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Next time a recurring or retrying schedule becomes due.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "next_run_at"
                      },
                      "x-order": 9
                    },
                    "recurrence": {
                      "type": "string",
                      "description": "Recurrence rule for repeating schedules. Empty for a run-once schedule.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "recurrence"
                      },
                      "x-order": 10
                    },
                    "status": {
                      "type": "string",
                      "description": "Lifecycle status. `pending`: created, not yet due-scheduled.\n`scheduled`: waiting for its due time. `assigned`: designated for a\nparticular worker but not yet claimed. `claimed`: a worker holds the\nclaim and has not started. `running`: the claim holder is executing\nit. `retrying`: the last attempt failed and another is due.\n`completed`, `failed` and `cancelled` are terminal for a run-once\nschedule; a recurring schedule returns to `scheduled`.\n",
                      "enum": [
                        "pending",
                        "scheduled",
                        "assigned",
                        "claimed",
                        "running",
                        "retrying",
                        "completed",
                        "failed",
                        "cancelled"
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      },
                      "x-order": 11
                    },
                    "retryCount": {
                      "type": "integer",
                      "description": "Attempts already retried for the current run.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "retry_count"
                      },
                      "x-order": 12
                    },
                    "maxRetries": {
                      "type": "integer",
                      "description": "Maximum retries before the run is marked failed.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "max_retries"
                      },
                      "x-order": 13
                    },
                    "retryDelayMinutes": {
                      "type": "integer",
                      "description": "Minutes to wait before a retry becomes due.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "retry_delay_minutes"
                      },
                      "x-order": 14
                    },
                    "lastRunAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time of the most recent attempt.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_run_at"
                      },
                      "x-order": 15
                    },
                    "lastError": {
                      "type": "string",
                      "description": "Error reported by the most recent attempt.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_error"
                      },
                      "x-order": 16
                    },
                    "claim": {
                      "x-go-type": "*claimv1beta3.Claim",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta3/claim",
                        "name": "claimv1beta3"
                      },
                      "description": "The schedule's live claim, when one is held. Server-managed; omitted when the schedule is unclaimed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "-",
                        "json": "claim,omitempty"
                      },
                      "x-order": 17,
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "title": "Claim Schema",
                      "type": "object",
                      "additionalProperties": false,
                      "required": [
                        "id",
                        "organizationId",
                        "resourceType",
                        "resourceId",
                        "claimant",
                        "status",
                        "claimedAt",
                        "expiresAt",
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
                          "x-order": 1
                        },
                        "organizationId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-go-name": "OrganizationID",
                          "x-oapi-codegen-extra-tags": {
                            "db": "organization_id"
                          },
                          "x-order": 2
                        },
                        "resourceType": {
                          "type": "string",
                          "description": "Type of the claimed resource, for example `schedule`.",
                          "minLength": 1,
                          "maxLength": 64,
                          "x-oapi-codegen-extra-tags": {
                            "db": "resource_type"
                          },
                          "x-order": 3
                        },
                        "resourceId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "resource_id"
                          },
                          "x-order": 4
                        },
                        "claimant": {
                          "type": "string",
                          "description": "Identity of the holder, as asserted by the worker that took the claim (for example a machine and process identifier).",
                          "minLength": 1,
                          "maxLength": 255,
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimant"
                          },
                          "x-order": 5
                        },
                        "status": {
                          "type": "string",
                          "description": "Lifecycle of the claim. `active` while held, `released` once the holder lets it go, `expired` once `expiresAt` passed without a renewal.",
                          "enum": [
                            "active",
                            "released",
                            "expired"
                          ],
                          "x-oapi-codegen-extra-tags": {
                            "db": "status"
                          },
                          "x-order": 6
                        },
                        "claimedAt": {
                          "description": "Time the claim was taken.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimed_at"
                          },
                          "x-order": 7,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "expiresAt": {
                          "description": "Time the claim lapses unless the holder renews it. Always set by the server; a claim past this time is stale.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "expires_at"
                          },
                          "x-order": 8,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "releasedAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Time the holder released the claim. Null while the claim is active or after it expired.",
                          "nullable": true,
                          "x-go-type": "core.NullTime",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "released_at"
                          },
                          "x-order": 9
                        },
                        "createdAt": {
                          "description": "Timestamp of claim creation.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "created_at"
                          },
                          "x-order": 10,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "updatedAt": {
                          "description": "Timestamp of last claim modification.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "updated_at"
                          },
                          "x-order": 11,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        }
                      }
                    },
                    "pausedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the schedule was paused. Null when the schedule is not paused. Server-managed.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_at"
                      },
                      "x-order": 18
                    },
                    "pausedBy": {
                      "type": "string",
                      "description": "Identity that paused the schedule. Server-managed.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_by"
                      },
                      "x-order": 19
                    },
                    "pauseReason": {
                      "type": "string",
                      "description": "Reason given for pausing the schedule. Server-managed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "pause_reason"
                      },
                      "x-order": 20
                    },
                    "createdAt": {
                      "description": "Timestamp of schedule creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 21,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last schedule modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 22,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the schedule was soft-deleted. Null while live.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at"
                      },
                      "x-order": 23
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
    "/api/schedules/{scheduleId}/resume": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "schedules"
        ],
        "summary": "Resume a schedule",
        "operationId": "resumeSchedule",
        "description": "Clears this schedule's pause. Resuming a schedule that is not paused is a no-op.\n",
        "parameters": [
          {
            "name": "scheduleId",
            "in": "path",
            "description": "Schedule ID",
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
            "description": "The resumed schedule",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Schedule Schema",
                  "description": "Server-returned schedule. A schedule is a job: an action to run with its\nparameters, when it is due (`runAt`, `nextRunAt`, `recurrence`), its retry\nbudget and its outcome. Schedules belong to an organization and may be\nlinked to a workspace. A worker takes a schedule through a claim (the\ngeneric `claim` construct, nested under the schedule); while the claim is\nlive no other worker can take it, and a claim past its `expiresAt` is\nstale and the schedule is claimable again. The `claim`, the status\nvalues `assigned`, `claimed` and `running`, and the pause fields are\nserver-managed: they change only through the claim, release, pause and\nresume operations and are refused on create and update.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "name",
                    "action",
                    "enabled",
                    "status",
                    "retryCount",
                    "maxRetries",
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
                      "x-order": 1
                    },
                    "organizationId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-name": "OrganizationID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "organization_id"
                      },
                      "x-order": 2
                    },
                    "workspaceId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "workspace_id",
                        "json": "workspaceId,omitempty"
                      },
                      "x-order": 3
                    },
                    "name": {
                      "type": "string",
                      "description": "Human-readable name for the schedule.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      },
                      "x-order": 4
                    },
                    "action": {
                      "type": "string",
                      "description": "The action the worker runs when it holds the schedule's claim, for example a command name.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "action"
                      },
                      "x-order": 5
                    },
                    "params": {
                      "type": "object",
                      "description": "Action parameters, stored as a JSON blob.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "params"
                      },
                      "x-order": 6
                    },
                    "enabled": {
                      "type": "boolean",
                      "description": "Whether the schedule is eligible to run. A disabled schedule is never claimed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "enabled"
                      },
                      "x-order": 7
                    },
                    "runAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the schedule first becomes due.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "run_at"
                      },
                      "x-order": 8
                    },
                    "nextRunAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Next time a recurring or retrying schedule becomes due.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "next_run_at"
                      },
                      "x-order": 9
                    },
                    "recurrence": {
                      "type": "string",
                      "description": "Recurrence rule for repeating schedules. Empty for a run-once schedule.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "recurrence"
                      },
                      "x-order": 10
                    },
                    "status": {
                      "type": "string",
                      "description": "Lifecycle status. `pending`: created, not yet due-scheduled.\n`scheduled`: waiting for its due time. `assigned`: designated for a\nparticular worker but not yet claimed. `claimed`: a worker holds the\nclaim and has not started. `running`: the claim holder is executing\nit. `retrying`: the last attempt failed and another is due.\n`completed`, `failed` and `cancelled` are terminal for a run-once\nschedule; a recurring schedule returns to `scheduled`.\n",
                      "enum": [
                        "pending",
                        "scheduled",
                        "assigned",
                        "claimed",
                        "running",
                        "retrying",
                        "completed",
                        "failed",
                        "cancelled"
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      },
                      "x-order": 11
                    },
                    "retryCount": {
                      "type": "integer",
                      "description": "Attempts already retried for the current run.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "retry_count"
                      },
                      "x-order": 12
                    },
                    "maxRetries": {
                      "type": "integer",
                      "description": "Maximum retries before the run is marked failed.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "max_retries"
                      },
                      "x-order": 13
                    },
                    "retryDelayMinutes": {
                      "type": "integer",
                      "description": "Minutes to wait before a retry becomes due.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "retry_delay_minutes"
                      },
                      "x-order": 14
                    },
                    "lastRunAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time of the most recent attempt.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_run_at"
                      },
                      "x-order": 15
                    },
                    "lastError": {
                      "type": "string",
                      "description": "Error reported by the most recent attempt.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_error"
                      },
                      "x-order": 16
                    },
                    "claim": {
                      "x-go-type": "*claimv1beta3.Claim",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta3/claim",
                        "name": "claimv1beta3"
                      },
                      "description": "The schedule's live claim, when one is held. Server-managed; omitted when the schedule is unclaimed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "-",
                        "json": "claim,omitempty"
                      },
                      "x-order": 17,
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "title": "Claim Schema",
                      "type": "object",
                      "additionalProperties": false,
                      "required": [
                        "id",
                        "organizationId",
                        "resourceType",
                        "resourceId",
                        "claimant",
                        "status",
                        "claimedAt",
                        "expiresAt",
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
                          "x-order": 1
                        },
                        "organizationId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-go-name": "OrganizationID",
                          "x-oapi-codegen-extra-tags": {
                            "db": "organization_id"
                          },
                          "x-order": 2
                        },
                        "resourceType": {
                          "type": "string",
                          "description": "Type of the claimed resource, for example `schedule`.",
                          "minLength": 1,
                          "maxLength": 64,
                          "x-oapi-codegen-extra-tags": {
                            "db": "resource_type"
                          },
                          "x-order": 3
                        },
                        "resourceId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "resource_id"
                          },
                          "x-order": 4
                        },
                        "claimant": {
                          "type": "string",
                          "description": "Identity of the holder, as asserted by the worker that took the claim (for example a machine and process identifier).",
                          "minLength": 1,
                          "maxLength": 255,
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimant"
                          },
                          "x-order": 5
                        },
                        "status": {
                          "type": "string",
                          "description": "Lifecycle of the claim. `active` while held, `released` once the holder lets it go, `expired` once `expiresAt` passed without a renewal.",
                          "enum": [
                            "active",
                            "released",
                            "expired"
                          ],
                          "x-oapi-codegen-extra-tags": {
                            "db": "status"
                          },
                          "x-order": 6
                        },
                        "claimedAt": {
                          "description": "Time the claim was taken.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimed_at"
                          },
                          "x-order": 7,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "expiresAt": {
                          "description": "Time the claim lapses unless the holder renews it. Always set by the server; a claim past this time is stale.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "expires_at"
                          },
                          "x-order": 8,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "releasedAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Time the holder released the claim. Null while the claim is active or after it expired.",
                          "nullable": true,
                          "x-go-type": "core.NullTime",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "released_at"
                          },
                          "x-order": 9
                        },
                        "createdAt": {
                          "description": "Timestamp of claim creation.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "created_at"
                          },
                          "x-order": 10,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "updatedAt": {
                          "description": "Timestamp of last claim modification.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "updated_at"
                          },
                          "x-order": 11,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        }
                      }
                    },
                    "pausedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the schedule was paused. Null when the schedule is not paused. Server-managed.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_at"
                      },
                      "x-order": 18
                    },
                    "pausedBy": {
                      "type": "string",
                      "description": "Identity that paused the schedule. Server-managed.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_by"
                      },
                      "x-order": 19
                    },
                    "pauseReason": {
                      "type": "string",
                      "description": "Reason given for pausing the schedule. Server-managed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "pause_reason"
                      },
                      "x-order": 20
                    },
                    "createdAt": {
                      "description": "Timestamp of schedule creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 21,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last schedule modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 22,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the schedule was soft-deleted. Null while live.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at"
                      },
                      "x-order": 23
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
    "/api/workspaces/{workspaceId}/schedules": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "schedules"
        ],
        "summary": "List a workspace's schedules",
        "operationId": "getSchedulesOfWorkspace",
        "description": "Returns a paginated list of the schedules linked to the workspace.\n",
        "parameters": [
          {
            "name": "workspaceId",
            "in": "path",
            "description": "Workspace ID",
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
            "description": "Number of items per page.",
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
            "name": "status",
            "in": "query",
            "required": false,
            "description": "Only schedules in this status.",
            "schema": {
              "type": "string",
              "enum": [
                "pending",
                "scheduled",
                "assigned",
                "claimed",
                "running",
                "retrying",
                "completed",
                "failed",
                "cancelled"
              ]
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Schedules page",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated collection of schedules.",
                  "required": [
                    "page",
                    "pageSize",
                    "totalCount",
                    "schedules"
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
                      "minimum": 1
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of items available.",
                      "minimum": 0
                    },
                    "schedules": {
                      "type": "array",
                      "items": {
                        "x-go-type": "Schedule",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "title": "Schedule Schema",
                        "description": "Server-returned schedule. A schedule is a job: an action to run with its\nparameters, when it is due (`runAt`, `nextRunAt`, `recurrence`), its retry\nbudget and its outcome. Schedules belong to an organization and may be\nlinked to a workspace. A worker takes a schedule through a claim (the\ngeneric `claim` construct, nested under the schedule); while the claim is\nlive no other worker can take it, and a claim past its `expiresAt` is\nstale and the schedule is claimable again. The `claim`, the status\nvalues `assigned`, `claimed` and `running`, and the pause fields are\nserver-managed: they change only through the claim, release, pause and\nresume operations and are refused on create and update.\n",
                        "type": "object",
                        "additionalProperties": false,
                        "required": [
                          "id",
                          "organizationId",
                          "name",
                          "action",
                          "enabled",
                          "status",
                          "retryCount",
                          "maxRetries",
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
                            "x-order": 1
                          },
                          "organizationId": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-go-name": "OrganizationID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "organization_id"
                            },
                            "x-order": 2
                          },
                          "workspaceId": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "workspace_id",
                              "json": "workspaceId,omitempty"
                            },
                            "x-order": 3
                          },
                          "name": {
                            "type": "string",
                            "description": "Human-readable name for the schedule.",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "name"
                            },
                            "x-order": 4
                          },
                          "action": {
                            "type": "string",
                            "description": "The action the worker runs when it holds the schedule's claim, for example a command name.",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "action"
                            },
                            "x-order": 5
                          },
                          "params": {
                            "type": "object",
                            "description": "Action parameters, stored as a JSON blob.",
                            "x-go-type": "core.Map",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "params"
                            },
                            "x-order": 6
                          },
                          "enabled": {
                            "type": "boolean",
                            "description": "Whether the schedule is eligible to run. A disabled schedule is never claimed.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "enabled"
                            },
                            "x-order": 7
                          },
                          "runAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Time the schedule first becomes due.",
                            "nullable": true,
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "run_at"
                            },
                            "x-order": 8
                          },
                          "nextRunAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Next time a recurring or retrying schedule becomes due.",
                            "nullable": true,
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "next_run_at"
                            },
                            "x-order": 9
                          },
                          "recurrence": {
                            "type": "string",
                            "description": "Recurrence rule for repeating schedules. Empty for a run-once schedule.",
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "recurrence"
                            },
                            "x-order": 10
                          },
                          "status": {
                            "type": "string",
                            "description": "Lifecycle status. `pending`: created, not yet due-scheduled.\n`scheduled`: waiting for its due time. `assigned`: designated for a\nparticular worker but not yet claimed. `claimed`: a worker holds the\nclaim and has not started. `running`: the claim holder is executing\nit. `retrying`: the last attempt failed and another is due.\n`completed`, `failed` and `cancelled` are terminal for a run-once\nschedule; a recurring schedule returns to `scheduled`.\n",
                            "enum": [
                              "pending",
                              "scheduled",
                              "assigned",
                              "claimed",
                              "running",
                              "retrying",
                              "completed",
                              "failed",
                              "cancelled"
                            ],
                            "x-oapi-codegen-extra-tags": {
                              "db": "status"
                            },
                            "x-order": 11
                          },
                          "retryCount": {
                            "type": "integer",
                            "description": "Attempts already retried for the current run.",
                            "minimum": 0,
                            "x-oapi-codegen-extra-tags": {
                              "db": "retry_count"
                            },
                            "x-order": 12
                          },
                          "maxRetries": {
                            "type": "integer",
                            "description": "Maximum retries before the run is marked failed.",
                            "minimum": 0,
                            "x-oapi-codegen-extra-tags": {
                              "db": "max_retries"
                            },
                            "x-order": 13
                          },
                          "retryDelayMinutes": {
                            "type": "integer",
                            "description": "Minutes to wait before a retry becomes due.",
                            "minimum": 0,
                            "x-oapi-codegen-extra-tags": {
                              "db": "retry_delay_minutes"
                            },
                            "x-order": 14
                          },
                          "lastRunAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Time of the most recent attempt.",
                            "nullable": true,
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "last_run_at"
                            },
                            "x-order": 15
                          },
                          "lastError": {
                            "type": "string",
                            "description": "Error reported by the most recent attempt.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "last_error"
                            },
                            "x-order": 16
                          },
                          "claim": {
                            "x-go-type": "*claimv1beta3.Claim",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/v1beta3/claim",
                              "name": "claimv1beta3"
                            },
                            "description": "The schedule's live claim, when one is held. Server-managed; omitted when the schedule is unclaimed.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "-",
                              "json": "claim,omitempty"
                            },
                            "x-order": 17,
                            "$schema": "http://json-schema.org/draft-07/schema#",
                            "title": "Claim Schema",
                            "type": "object",
                            "additionalProperties": false,
                            "required": [
                              "id",
                              "organizationId",
                              "resourceType",
                              "resourceId",
                              "claimant",
                              "status",
                              "claimedAt",
                              "expiresAt",
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
                                "x-order": 1
                              },
                              "organizationId": {
                                "type": "string",
                                "format": "uuid",
                                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                },
                                "x-go-name": "OrganizationID",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "organization_id"
                                },
                                "x-order": 2
                              },
                              "resourceType": {
                                "type": "string",
                                "description": "Type of the claimed resource, for example `schedule`.",
                                "minLength": 1,
                                "maxLength": 64,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "resource_type"
                                },
                                "x-order": 3
                              },
                              "resourceId": {
                                "type": "string",
                                "format": "uuid",
                                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                },
                                "x-oapi-codegen-extra-tags": {
                                  "db": "resource_id"
                                },
                                "x-order": 4
                              },
                              "claimant": {
                                "type": "string",
                                "description": "Identity of the holder, as asserted by the worker that took the claim (for example a machine and process identifier).",
                                "minLength": 1,
                                "maxLength": 255,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "claimant"
                                },
                                "x-order": 5
                              },
                              "status": {
                                "type": "string",
                                "description": "Lifecycle of the claim. `active` while held, `released` once the holder lets it go, `expired` once `expiresAt` passed without a renewal.",
                                "enum": [
                                  "active",
                                  "released",
                                  "expired"
                                ],
                                "x-oapi-codegen-extra-tags": {
                                  "db": "status"
                                },
                                "x-order": 6
                              },
                              "claimedAt": {
                                "description": "Time the claim was taken.",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "claimed_at"
                                },
                                "x-order": 7,
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "expiresAt": {
                                "description": "Time the claim lapses unless the holder renews it. Always set by the server; a claim past this time is stale.",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "expires_at"
                                },
                                "x-order": 8,
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "releasedAt": {
                                "type": "string",
                                "format": "date-time",
                                "description": "Time the holder released the claim. Null while the claim is active or after it expired.",
                                "nullable": true,
                                "x-go-type": "core.NullTime",
                                "x-go-type-import": {
                                  "path": "github.com/meshery/schemas/models/core",
                                  "name": "core"
                                },
                                "x-oapi-codegen-extra-tags": {
                                  "db": "released_at"
                                },
                                "x-order": 9
                              },
                              "createdAt": {
                                "description": "Timestamp of claim creation.",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "created_at"
                                },
                                "x-order": 10,
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "updatedAt": {
                                "description": "Timestamp of last claim modification.",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "updated_at"
                                },
                                "x-order": 11,
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              }
                            }
                          },
                          "pausedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Time the schedule was paused. Null when the schedule is not paused. Server-managed.",
                            "nullable": true,
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "paused_at"
                            },
                            "x-order": 18
                          },
                          "pausedBy": {
                            "type": "string",
                            "description": "Identity that paused the schedule. Server-managed.",
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "paused_by"
                            },
                            "x-order": 19
                          },
                          "pauseReason": {
                            "type": "string",
                            "description": "Reason given for pausing the schedule. Server-managed.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "pause_reason"
                            },
                            "x-order": 20
                          },
                          "createdAt": {
                            "description": "Timestamp of schedule creation.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at"
                            },
                            "x-order": 21,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp of last schedule modification.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at"
                            },
                            "x-order": 22,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deletedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the schedule was soft-deleted. Null while live.",
                            "nullable": true,
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at"
                            },
                            "x-order": 23
                          }
                        }
                      },
                      "description": "Schedules included on this page of results."
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
    "/api/workspaces/{workspaceId}/schedules/{scheduleId}": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "schedules"
        ],
        "summary": "Link a schedule to a workspace",
        "operationId": "assignScheduleToWorkspace",
        "description": "Links the schedule to the workspace, replacing any previous workspace link: a schedule belongs to at most one workspace.\n",
        "parameters": [
          {
            "name": "workspaceId",
            "in": "path",
            "description": "Workspace ID",
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
          {
            "name": "scheduleId",
            "in": "path",
            "description": "Schedule ID",
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
            "description": "The linked schedule",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Schedule Schema",
                  "description": "Server-returned schedule. A schedule is a job: an action to run with its\nparameters, when it is due (`runAt`, `nextRunAt`, `recurrence`), its retry\nbudget and its outcome. Schedules belong to an organization and may be\nlinked to a workspace. A worker takes a schedule through a claim (the\ngeneric `claim` construct, nested under the schedule); while the claim is\nlive no other worker can take it, and a claim past its `expiresAt` is\nstale and the schedule is claimable again. The `claim`, the status\nvalues `assigned`, `claimed` and `running`, and the pause fields are\nserver-managed: they change only through the claim, release, pause and\nresume operations and are refused on create and update.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "name",
                    "action",
                    "enabled",
                    "status",
                    "retryCount",
                    "maxRetries",
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
                      "x-order": 1
                    },
                    "organizationId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-name": "OrganizationID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "organization_id"
                      },
                      "x-order": 2
                    },
                    "workspaceId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "workspace_id",
                        "json": "workspaceId,omitempty"
                      },
                      "x-order": 3
                    },
                    "name": {
                      "type": "string",
                      "description": "Human-readable name for the schedule.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      },
                      "x-order": 4
                    },
                    "action": {
                      "type": "string",
                      "description": "The action the worker runs when it holds the schedule's claim, for example a command name.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "action"
                      },
                      "x-order": 5
                    },
                    "params": {
                      "type": "object",
                      "description": "Action parameters, stored as a JSON blob.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "params"
                      },
                      "x-order": 6
                    },
                    "enabled": {
                      "type": "boolean",
                      "description": "Whether the schedule is eligible to run. A disabled schedule is never claimed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "enabled"
                      },
                      "x-order": 7
                    },
                    "runAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the schedule first becomes due.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "run_at"
                      },
                      "x-order": 8
                    },
                    "nextRunAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Next time a recurring or retrying schedule becomes due.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "next_run_at"
                      },
                      "x-order": 9
                    },
                    "recurrence": {
                      "type": "string",
                      "description": "Recurrence rule for repeating schedules. Empty for a run-once schedule.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "recurrence"
                      },
                      "x-order": 10
                    },
                    "status": {
                      "type": "string",
                      "description": "Lifecycle status. `pending`: created, not yet due-scheduled.\n`scheduled`: waiting for its due time. `assigned`: designated for a\nparticular worker but not yet claimed. `claimed`: a worker holds the\nclaim and has not started. `running`: the claim holder is executing\nit. `retrying`: the last attempt failed and another is due.\n`completed`, `failed` and `cancelled` are terminal for a run-once\nschedule; a recurring schedule returns to `scheduled`.\n",
                      "enum": [
                        "pending",
                        "scheduled",
                        "assigned",
                        "claimed",
                        "running",
                        "retrying",
                        "completed",
                        "failed",
                        "cancelled"
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      },
                      "x-order": 11
                    },
                    "retryCount": {
                      "type": "integer",
                      "description": "Attempts already retried for the current run.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "retry_count"
                      },
                      "x-order": 12
                    },
                    "maxRetries": {
                      "type": "integer",
                      "description": "Maximum retries before the run is marked failed.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "max_retries"
                      },
                      "x-order": 13
                    },
                    "retryDelayMinutes": {
                      "type": "integer",
                      "description": "Minutes to wait before a retry becomes due.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "retry_delay_minutes"
                      },
                      "x-order": 14
                    },
                    "lastRunAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time of the most recent attempt.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_run_at"
                      },
                      "x-order": 15
                    },
                    "lastError": {
                      "type": "string",
                      "description": "Error reported by the most recent attempt.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_error"
                      },
                      "x-order": 16
                    },
                    "claim": {
                      "x-go-type": "*claimv1beta3.Claim",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta3/claim",
                        "name": "claimv1beta3"
                      },
                      "description": "The schedule's live claim, when one is held. Server-managed; omitted when the schedule is unclaimed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "-",
                        "json": "claim,omitempty"
                      },
                      "x-order": 17,
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "title": "Claim Schema",
                      "type": "object",
                      "additionalProperties": false,
                      "required": [
                        "id",
                        "organizationId",
                        "resourceType",
                        "resourceId",
                        "claimant",
                        "status",
                        "claimedAt",
                        "expiresAt",
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
                          "x-order": 1
                        },
                        "organizationId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-go-name": "OrganizationID",
                          "x-oapi-codegen-extra-tags": {
                            "db": "organization_id"
                          },
                          "x-order": 2
                        },
                        "resourceType": {
                          "type": "string",
                          "description": "Type of the claimed resource, for example `schedule`.",
                          "minLength": 1,
                          "maxLength": 64,
                          "x-oapi-codegen-extra-tags": {
                            "db": "resource_type"
                          },
                          "x-order": 3
                        },
                        "resourceId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "resource_id"
                          },
                          "x-order": 4
                        },
                        "claimant": {
                          "type": "string",
                          "description": "Identity of the holder, as asserted by the worker that took the claim (for example a machine and process identifier).",
                          "minLength": 1,
                          "maxLength": 255,
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimant"
                          },
                          "x-order": 5
                        },
                        "status": {
                          "type": "string",
                          "description": "Lifecycle of the claim. `active` while held, `released` once the holder lets it go, `expired` once `expiresAt` passed without a renewal.",
                          "enum": [
                            "active",
                            "released",
                            "expired"
                          ],
                          "x-oapi-codegen-extra-tags": {
                            "db": "status"
                          },
                          "x-order": 6
                        },
                        "claimedAt": {
                          "description": "Time the claim was taken.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimed_at"
                          },
                          "x-order": 7,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "expiresAt": {
                          "description": "Time the claim lapses unless the holder renews it. Always set by the server; a claim past this time is stale.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "expires_at"
                          },
                          "x-order": 8,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "releasedAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Time the holder released the claim. Null while the claim is active or after it expired.",
                          "nullable": true,
                          "x-go-type": "core.NullTime",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "released_at"
                          },
                          "x-order": 9
                        },
                        "createdAt": {
                          "description": "Timestamp of claim creation.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "created_at"
                          },
                          "x-order": 10,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "updatedAt": {
                          "description": "Timestamp of last claim modification.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "updated_at"
                          },
                          "x-order": 11,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        }
                      }
                    },
                    "pausedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the schedule was paused. Null when the schedule is not paused. Server-managed.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_at"
                      },
                      "x-order": 18
                    },
                    "pausedBy": {
                      "type": "string",
                      "description": "Identity that paused the schedule. Server-managed.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_by"
                      },
                      "x-order": 19
                    },
                    "pauseReason": {
                      "type": "string",
                      "description": "Reason given for pausing the schedule. Server-managed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "pause_reason"
                      },
                      "x-order": 20
                    },
                    "createdAt": {
                      "description": "Timestamp of schedule creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 21,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last schedule modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 22,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the schedule was soft-deleted. Null while live.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at"
                      },
                      "x-order": 23
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
      "delete": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "schedules"
        ],
        "summary": "Unlink a schedule from a workspace",
        "operationId": "unassignScheduleFromWorkspace",
        "description": "Removes the schedule's link to the workspace. The schedule itself is kept.\n",
        "parameters": [
          {
            "name": "workspaceId",
            "in": "path",
            "description": "Workspace ID",
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
          {
            "name": "scheduleId",
            "in": "path",
            "description": "Schedule ID",
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
            "description": "The unlinked schedule",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Schedule Schema",
                  "description": "Server-returned schedule. A schedule is a job: an action to run with its\nparameters, when it is due (`runAt`, `nextRunAt`, `recurrence`), its retry\nbudget and its outcome. Schedules belong to an organization and may be\nlinked to a workspace. A worker takes a schedule through a claim (the\ngeneric `claim` construct, nested under the schedule); while the claim is\nlive no other worker can take it, and a claim past its `expiresAt` is\nstale and the schedule is claimable again. The `claim`, the status\nvalues `assigned`, `claimed` and `running`, and the pause fields are\nserver-managed: they change only through the claim, release, pause and\nresume operations and are refused on create and update.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "name",
                    "action",
                    "enabled",
                    "status",
                    "retryCount",
                    "maxRetries",
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
                      "x-order": 1
                    },
                    "organizationId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-name": "OrganizationID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "organization_id"
                      },
                      "x-order": 2
                    },
                    "workspaceId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "workspace_id",
                        "json": "workspaceId,omitempty"
                      },
                      "x-order": 3
                    },
                    "name": {
                      "type": "string",
                      "description": "Human-readable name for the schedule.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      },
                      "x-order": 4
                    },
                    "action": {
                      "type": "string",
                      "description": "The action the worker runs when it holds the schedule's claim, for example a command name.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "action"
                      },
                      "x-order": 5
                    },
                    "params": {
                      "type": "object",
                      "description": "Action parameters, stored as a JSON blob.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "params"
                      },
                      "x-order": 6
                    },
                    "enabled": {
                      "type": "boolean",
                      "description": "Whether the schedule is eligible to run. A disabled schedule is never claimed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "enabled"
                      },
                      "x-order": 7
                    },
                    "runAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the schedule first becomes due.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "run_at"
                      },
                      "x-order": 8
                    },
                    "nextRunAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Next time a recurring or retrying schedule becomes due.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "next_run_at"
                      },
                      "x-order": 9
                    },
                    "recurrence": {
                      "type": "string",
                      "description": "Recurrence rule for repeating schedules. Empty for a run-once schedule.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "recurrence"
                      },
                      "x-order": 10
                    },
                    "status": {
                      "type": "string",
                      "description": "Lifecycle status. `pending`: created, not yet due-scheduled.\n`scheduled`: waiting for its due time. `assigned`: designated for a\nparticular worker but not yet claimed. `claimed`: a worker holds the\nclaim and has not started. `running`: the claim holder is executing\nit. `retrying`: the last attempt failed and another is due.\n`completed`, `failed` and `cancelled` are terminal for a run-once\nschedule; a recurring schedule returns to `scheduled`.\n",
                      "enum": [
                        "pending",
                        "scheduled",
                        "assigned",
                        "claimed",
                        "running",
                        "retrying",
                        "completed",
                        "failed",
                        "cancelled"
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      },
                      "x-order": 11
                    },
                    "retryCount": {
                      "type": "integer",
                      "description": "Attempts already retried for the current run.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "retry_count"
                      },
                      "x-order": 12
                    },
                    "maxRetries": {
                      "type": "integer",
                      "description": "Maximum retries before the run is marked failed.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "max_retries"
                      },
                      "x-order": 13
                    },
                    "retryDelayMinutes": {
                      "type": "integer",
                      "description": "Minutes to wait before a retry becomes due.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "retry_delay_minutes"
                      },
                      "x-order": 14
                    },
                    "lastRunAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time of the most recent attempt.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_run_at"
                      },
                      "x-order": 15
                    },
                    "lastError": {
                      "type": "string",
                      "description": "Error reported by the most recent attempt.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_error"
                      },
                      "x-order": 16
                    },
                    "claim": {
                      "x-go-type": "*claimv1beta3.Claim",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta3/claim",
                        "name": "claimv1beta3"
                      },
                      "description": "The schedule's live claim, when one is held. Server-managed; omitted when the schedule is unclaimed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "-",
                        "json": "claim,omitempty"
                      },
                      "x-order": 17,
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "title": "Claim Schema",
                      "type": "object",
                      "additionalProperties": false,
                      "required": [
                        "id",
                        "organizationId",
                        "resourceType",
                        "resourceId",
                        "claimant",
                        "status",
                        "claimedAt",
                        "expiresAt",
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
                          "x-order": 1
                        },
                        "organizationId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-go-name": "OrganizationID",
                          "x-oapi-codegen-extra-tags": {
                            "db": "organization_id"
                          },
                          "x-order": 2
                        },
                        "resourceType": {
                          "type": "string",
                          "description": "Type of the claimed resource, for example `schedule`.",
                          "minLength": 1,
                          "maxLength": 64,
                          "x-oapi-codegen-extra-tags": {
                            "db": "resource_type"
                          },
                          "x-order": 3
                        },
                        "resourceId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "resource_id"
                          },
                          "x-order": 4
                        },
                        "claimant": {
                          "type": "string",
                          "description": "Identity of the holder, as asserted by the worker that took the claim (for example a machine and process identifier).",
                          "minLength": 1,
                          "maxLength": 255,
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimant"
                          },
                          "x-order": 5
                        },
                        "status": {
                          "type": "string",
                          "description": "Lifecycle of the claim. `active` while held, `released` once the holder lets it go, `expired` once `expiresAt` passed without a renewal.",
                          "enum": [
                            "active",
                            "released",
                            "expired"
                          ],
                          "x-oapi-codegen-extra-tags": {
                            "db": "status"
                          },
                          "x-order": 6
                        },
                        "claimedAt": {
                          "description": "Time the claim was taken.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimed_at"
                          },
                          "x-order": 7,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "expiresAt": {
                          "description": "Time the claim lapses unless the holder renews it. Always set by the server; a claim past this time is stale.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "expires_at"
                          },
                          "x-order": 8,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "releasedAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Time the holder released the claim. Null while the claim is active or after it expired.",
                          "nullable": true,
                          "x-go-type": "core.NullTime",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "released_at"
                          },
                          "x-order": 9
                        },
                        "createdAt": {
                          "description": "Timestamp of claim creation.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "created_at"
                          },
                          "x-order": 10,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "updatedAt": {
                          "description": "Timestamp of last claim modification.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "updated_at"
                          },
                          "x-order": 11,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        }
                      }
                    },
                    "pausedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the schedule was paused. Null when the schedule is not paused. Server-managed.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_at"
                      },
                      "x-order": 18
                    },
                    "pausedBy": {
                      "type": "string",
                      "description": "Identity that paused the schedule. Server-managed.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_by"
                      },
                      "x-order": 19
                    },
                    "pauseReason": {
                      "type": "string",
                      "description": "Reason given for pausing the schedule. Server-managed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "pause_reason"
                      },
                      "x-order": 20
                    },
                    "createdAt": {
                      "description": "Timestamp of schedule creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 21,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last schedule modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 22,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the schedule was soft-deleted. Null while live.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at"
                      },
                      "x-order": 23
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
      "409": {
        "description": "Conflict - the schedule is held by another claimant's live claim, or the caller is not the holder of the claim it tried to renew or release",
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
      "scheduleId": {
        "name": "scheduleId",
        "in": "path",
        "description": "Schedule ID",
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
      "workspaceId": {
        "name": "workspaceId",
        "in": "path",
        "description": "Workspace ID",
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
      "workspaceIdQuery": {
        "name": "workspaceId",
        "in": "query",
        "required": false,
        "description": "Only schedules linked to this workspace.",
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
      "statusQuery": {
        "name": "status",
        "in": "query",
        "required": false,
        "description": "Only schedules in this status.",
        "schema": {
          "type": "string",
          "enum": [
            "pending",
            "scheduled",
            "assigned",
            "claimed",
            "running",
            "retrying",
            "completed",
            "failed",
            "cancelled"
          ]
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
        "description": "Number of items per page.",
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
      "Schedule": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Schedule Schema",
        "description": "Server-returned schedule. A schedule is a job: an action to run with its\nparameters, when it is due (`runAt`, `nextRunAt`, `recurrence`), its retry\nbudget and its outcome. Schedules belong to an organization and may be\nlinked to a workspace. A worker takes a schedule through a claim (the\ngeneric `claim` construct, nested under the schedule); while the claim is\nlive no other worker can take it, and a claim past its `expiresAt` is\nstale and the schedule is claimable again. The `claim`, the status\nvalues `assigned`, `claimed` and `running`, and the pause fields are\nserver-managed: they change only through the claim, release, pause and\nresume operations and are refused on create and update.\n",
        "type": "object",
        "additionalProperties": false,
        "required": [
          "id",
          "organizationId",
          "name",
          "action",
          "enabled",
          "status",
          "retryCount",
          "maxRetries",
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
            "x-order": 1
          },
          "organizationId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-name": "OrganizationID",
            "x-oapi-codegen-extra-tags": {
              "db": "organization_id"
            },
            "x-order": 2
          },
          "workspaceId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "workspace_id",
              "json": "workspaceId,omitempty"
            },
            "x-order": 3
          },
          "name": {
            "type": "string",
            "description": "Human-readable name for the schedule.",
            "minLength": 1,
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "name"
            },
            "x-order": 4
          },
          "action": {
            "type": "string",
            "description": "The action the worker runs when it holds the schedule's claim, for example a command name.",
            "minLength": 1,
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "action"
            },
            "x-order": 5
          },
          "params": {
            "type": "object",
            "description": "Action parameters, stored as a JSON blob.",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "params"
            },
            "x-order": 6
          },
          "enabled": {
            "type": "boolean",
            "description": "Whether the schedule is eligible to run. A disabled schedule is never claimed.",
            "x-oapi-codegen-extra-tags": {
              "db": "enabled"
            },
            "x-order": 7
          },
          "runAt": {
            "type": "string",
            "format": "date-time",
            "description": "Time the schedule first becomes due.",
            "nullable": true,
            "x-go-type": "core.NullTime",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "run_at"
            },
            "x-order": 8
          },
          "nextRunAt": {
            "type": "string",
            "format": "date-time",
            "description": "Next time a recurring or retrying schedule becomes due.",
            "nullable": true,
            "x-go-type": "core.NullTime",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "next_run_at"
            },
            "x-order": 9
          },
          "recurrence": {
            "type": "string",
            "description": "Recurrence rule for repeating schedules. Empty for a run-once schedule.",
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "recurrence"
            },
            "x-order": 10
          },
          "status": {
            "type": "string",
            "description": "Lifecycle status. `pending`: created, not yet due-scheduled.\n`scheduled`: waiting for its due time. `assigned`: designated for a\nparticular worker but not yet claimed. `claimed`: a worker holds the\nclaim and has not started. `running`: the claim holder is executing\nit. `retrying`: the last attempt failed and another is due.\n`completed`, `failed` and `cancelled` are terminal for a run-once\nschedule; a recurring schedule returns to `scheduled`.\n",
            "enum": [
              "pending",
              "scheduled",
              "assigned",
              "claimed",
              "running",
              "retrying",
              "completed",
              "failed",
              "cancelled"
            ],
            "x-oapi-codegen-extra-tags": {
              "db": "status"
            },
            "x-order": 11
          },
          "retryCount": {
            "type": "integer",
            "description": "Attempts already retried for the current run.",
            "minimum": 0,
            "x-oapi-codegen-extra-tags": {
              "db": "retry_count"
            },
            "x-order": 12
          },
          "maxRetries": {
            "type": "integer",
            "description": "Maximum retries before the run is marked failed.",
            "minimum": 0,
            "x-oapi-codegen-extra-tags": {
              "db": "max_retries"
            },
            "x-order": 13
          },
          "retryDelayMinutes": {
            "type": "integer",
            "description": "Minutes to wait before a retry becomes due.",
            "minimum": 0,
            "x-oapi-codegen-extra-tags": {
              "db": "retry_delay_minutes"
            },
            "x-order": 14
          },
          "lastRunAt": {
            "type": "string",
            "format": "date-time",
            "description": "Time of the most recent attempt.",
            "nullable": true,
            "x-go-type": "core.NullTime",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "last_run_at"
            },
            "x-order": 15
          },
          "lastError": {
            "type": "string",
            "description": "Error reported by the most recent attempt.",
            "x-oapi-codegen-extra-tags": {
              "db": "last_error"
            },
            "x-order": 16
          },
          "claim": {
            "x-go-type": "*claimv1beta3.Claim",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/v1beta3/claim",
              "name": "claimv1beta3"
            },
            "description": "The schedule's live claim, when one is held. Server-managed; omitted when the schedule is unclaimed.",
            "x-oapi-codegen-extra-tags": {
              "db": "-",
              "json": "claim,omitempty"
            },
            "x-order": 17,
            "$schema": "http://json-schema.org/draft-07/schema#",
            "title": "Claim Schema",
            "type": "object",
            "additionalProperties": false,
            "required": [
              "id",
              "organizationId",
              "resourceType",
              "resourceId",
              "claimant",
              "status",
              "claimedAt",
              "expiresAt",
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
                "x-order": 1
              },
              "organizationId": {
                "type": "string",
                "format": "uuid",
                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                },
                "x-go-name": "OrganizationID",
                "x-oapi-codegen-extra-tags": {
                  "db": "organization_id"
                },
                "x-order": 2
              },
              "resourceType": {
                "type": "string",
                "description": "Type of the claimed resource, for example `schedule`.",
                "minLength": 1,
                "maxLength": 64,
                "x-oapi-codegen-extra-tags": {
                  "db": "resource_type"
                },
                "x-order": 3
              },
              "resourceId": {
                "type": "string",
                "format": "uuid",
                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                },
                "x-oapi-codegen-extra-tags": {
                  "db": "resource_id"
                },
                "x-order": 4
              },
              "claimant": {
                "type": "string",
                "description": "Identity of the holder, as asserted by the worker that took the claim (for example a machine and process identifier).",
                "minLength": 1,
                "maxLength": 255,
                "x-oapi-codegen-extra-tags": {
                  "db": "claimant"
                },
                "x-order": 5
              },
              "status": {
                "type": "string",
                "description": "Lifecycle of the claim. `active` while held, `released` once the holder lets it go, `expired` once `expiresAt` passed without a renewal.",
                "enum": [
                  "active",
                  "released",
                  "expired"
                ],
                "x-oapi-codegen-extra-tags": {
                  "db": "status"
                },
                "x-order": 6
              },
              "claimedAt": {
                "description": "Time the claim was taken.",
                "x-oapi-codegen-extra-tags": {
                  "db": "claimed_at"
                },
                "x-order": 7,
                "type": "string",
                "format": "date-time",
                "x-go-type-skip-optional-pointer": true
              },
              "expiresAt": {
                "description": "Time the claim lapses unless the holder renews it. Always set by the server; a claim past this time is stale.",
                "x-oapi-codegen-extra-tags": {
                  "db": "expires_at"
                },
                "x-order": 8,
                "type": "string",
                "format": "date-time",
                "x-go-type-skip-optional-pointer": true
              },
              "releasedAt": {
                "type": "string",
                "format": "date-time",
                "description": "Time the holder released the claim. Null while the claim is active or after it expired.",
                "nullable": true,
                "x-go-type": "core.NullTime",
                "x-go-type-import": {
                  "path": "github.com/meshery/schemas/models/core",
                  "name": "core"
                },
                "x-oapi-codegen-extra-tags": {
                  "db": "released_at"
                },
                "x-order": 9
              },
              "createdAt": {
                "description": "Timestamp of claim creation.",
                "x-oapi-codegen-extra-tags": {
                  "db": "created_at"
                },
                "x-order": 10,
                "type": "string",
                "format": "date-time",
                "x-go-type-skip-optional-pointer": true
              },
              "updatedAt": {
                "description": "Timestamp of last claim modification.",
                "x-oapi-codegen-extra-tags": {
                  "db": "updated_at"
                },
                "x-order": 11,
                "type": "string",
                "format": "date-time",
                "x-go-type-skip-optional-pointer": true
              }
            }
          },
          "pausedAt": {
            "type": "string",
            "format": "date-time",
            "description": "Time the schedule was paused. Null when the schedule is not paused. Server-managed.",
            "nullable": true,
            "x-go-type": "core.NullTime",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "paused_at"
            },
            "x-order": 18
          },
          "pausedBy": {
            "type": "string",
            "description": "Identity that paused the schedule. Server-managed.",
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "paused_by"
            },
            "x-order": 19
          },
          "pauseReason": {
            "type": "string",
            "description": "Reason given for pausing the schedule. Server-managed.",
            "x-oapi-codegen-extra-tags": {
              "db": "pause_reason"
            },
            "x-order": 20
          },
          "createdAt": {
            "description": "Timestamp of schedule creation.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at"
            },
            "x-order": 21,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp of last schedule modification.",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at"
            },
            "x-order": 22,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deletedAt": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the schedule was soft-deleted. Null while live.",
            "nullable": true,
            "x-go-type": "core.NullTime",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at"
            },
            "x-order": 23
          }
        }
      },
      "SchedulePause": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Schedule Pause Schema",
        "description": "Server-returned organization-wide schedule pause. While a pause exists for\nan organization, none of its schedules is claimed unless the claim\nrequest carries the operator override. Absence of a pause means\nunpaused; there is at most one live pause per organization. A pause on a\nsingle schedule is carried on the schedule itself.\n",
        "type": "object",
        "additionalProperties": false,
        "required": [
          "id",
          "organizationId",
          "pausedAt",
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
            "x-order": 1
          },
          "organizationId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-name": "OrganizationID",
            "x-oapi-codegen-extra-tags": {
              "db": "organization_id"
            },
            "x-order": 2
          },
          "pausedAt": {
            "description": "Time the pause was set.",
            "x-oapi-codegen-extra-tags": {
              "db": "paused_at"
            },
            "x-order": 3,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "pausedBy": {
            "type": "string",
            "description": "Identity that set the pause. Server-managed.",
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "paused_by"
            },
            "x-order": 4
          },
          "reason": {
            "type": "string",
            "description": "Reason given for pausing every schedule in the organization.",
            "x-oapi-codegen-extra-tags": {
              "db": "reason"
            },
            "x-order": 5
          },
          "createdAt": {
            "description": "Timestamp of schedule pause creation.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at"
            },
            "x-order": 6,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp of last schedule pause modification.",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at"
            },
            "x-order": 7,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "SchedulePayload": {
        "type": "object",
        "description": "Payload for creating or updating a schedule. Contains only\nclient-settable fields; the owning `organizationId`, the claim, the\npause fields, `retryCount`, `lastRunAt`, `lastError` and the\ntimestamps are server-managed. `status` accepts only `pending`,\n`scheduled` and `cancelled` here; the other values are set by the\nclaim and release operations.\n",
        "required": [
          "name",
          "action"
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
            "x-oapi-codegen-extra-tags": {
              "json": "id,omitempty"
            }
          },
          "workspaceId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "json": "workspaceId,omitempty"
            }
          },
          "name": {
            "type": "string",
            "description": "Human-readable name for the schedule.",
            "minLength": 1,
            "maxLength": 255
          },
          "action": {
            "type": "string",
            "description": "The action the worker runs, for example a command name.",
            "minLength": 1,
            "maxLength": 255
          },
          "params": {
            "type": "object",
            "description": "Action parameters, stored as a JSON blob.",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "enabled": {
            "type": "boolean",
            "description": "Whether the schedule is eligible to run. Defaults to true."
          },
          "runAt": {
            "type": "string",
            "format": "date-time",
            "description": "Time the schedule first becomes due.",
            "nullable": true,
            "x-go-type": "core.NullTime",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            }
          },
          "recurrence": {
            "type": "string",
            "description": "Recurrence rule for repeating schedules. Empty for a run-once schedule.",
            "maxLength": 255
          },
          "status": {
            "type": "string",
            "description": "Client-settable status. Omit to let the server choose `scheduled` for a due-timed schedule and `pending` otherwise.",
            "enum": [
              "pending",
              "scheduled",
              "cancelled"
            ]
          },
          "maxRetries": {
            "type": "integer",
            "description": "Maximum retries before the run is marked failed.",
            "minimum": 0
          },
          "retryDelayMinutes": {
            "type": "integer",
            "description": "Minutes to wait before a retry becomes due.",
            "minimum": 0
          }
        }
      },
      "ScheduleClaimRequest": {
        "type": "object",
        "description": "Request to claim the next due schedule.",
        "required": [
          "claimant"
        ],
        "properties": {
          "claimant": {
            "type": "string",
            "description": "Identity of the worker taking the claim.",
            "minLength": 1,
            "maxLength": 255
          },
          "durationMinutes": {
            "type": "integer",
            "description": "Requested claim duration in minutes; the server applies its default when omitted and may cap it.",
            "minimum": 1,
            "maximum": 1440
          },
          "workspaceId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "json": "workspaceId,omitempty"
            }
          },
          "ignorePause": {
            "type": "boolean",
            "description": "Operator override that claims through the organization-wide and per-schedule pauses."
          }
        }
      },
      "ScheduleTargetedClaimRequest": {
        "type": "object",
        "description": "Request to claim one named schedule.",
        "required": [
          "claimant"
        ],
        "properties": {
          "claimant": {
            "type": "string",
            "description": "Identity of the worker taking the claim.",
            "minLength": 1,
            "maxLength": 255
          },
          "durationMinutes": {
            "type": "integer",
            "description": "Requested claim duration in minutes; the server applies its default when omitted and may cap it.",
            "minimum": 1,
            "maximum": 1440
          },
          "force": {
            "type": "boolean",
            "description": "Claim even though the schedule is not yet due (trigger now). A live claim held by another claimant still refuses."
          },
          "ignorePause": {
            "type": "boolean",
            "description": "Operator override that claims through the organization-wide and per-schedule pauses."
          }
        }
      },
      "ScheduleClaimReleaseRequest": {
        "type": "object",
        "description": "Request to release a schedule's claim and record the run's outcome.",
        "required": [
          "claimant"
        ],
        "properties": {
          "claimant": {
            "type": "string",
            "description": "Identity of the holder releasing the claim.",
            "minLength": 1,
            "maxLength": 255
          },
          "status": {
            "type": "string",
            "description": "Outcome status to record with the release.",
            "enum": [
              "scheduled",
              "retrying",
              "completed",
              "failed",
              "cancelled"
            ]
          },
          "lastRunAt": {
            "type": "string",
            "format": "date-time",
            "description": "Time of the attempt being reported.",
            "nullable": true,
            "x-go-type": "core.NullTime",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            }
          },
          "lastError": {
            "type": "string",
            "description": "Error reported by the attempt; empty on success."
          },
          "nextRunAt": {
            "type": "string",
            "format": "date-time",
            "description": "Next due time for a recurring or retrying schedule.",
            "nullable": true,
            "x-go-type": "core.NullTime",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            }
          },
          "retryCount": {
            "type": "integer",
            "description": "Retries used so far for the current run.",
            "minimum": 0
          }
        }
      },
      "SchedulePausePayload": {
        "type": "object",
        "description": "Request to pause a schedule or every schedule in the organization.",
        "properties": {
          "pausedBy": {
            "type": "string",
            "description": "Identity setting the pause; defaults to the authenticated user.",
            "maxLength": 255
          },
          "reason": {
            "type": "string",
            "description": "Reason for the pause.",
            "maxLength": 1000
          }
        }
      },
      "SchedulePage": {
        "type": "object",
        "description": "Paginated collection of schedules.",
        "required": [
          "page",
          "pageSize",
          "totalCount",
          "schedules"
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
            "minimum": 1
          },
          "totalCount": {
            "type": "integer",
            "description": "Total number of items available.",
            "minimum": 0
          },
          "schedules": {
            "type": "array",
            "items": {
              "x-go-type": "Schedule",
              "$schema": "http://json-schema.org/draft-07/schema#",
              "title": "Schedule Schema",
              "description": "Server-returned schedule. A schedule is a job: an action to run with its\nparameters, when it is due (`runAt`, `nextRunAt`, `recurrence`), its retry\nbudget and its outcome. Schedules belong to an organization and may be\nlinked to a workspace. A worker takes a schedule through a claim (the\ngeneric `claim` construct, nested under the schedule); while the claim is\nlive no other worker can take it, and a claim past its `expiresAt` is\nstale and the schedule is claimable again. The `claim`, the status\nvalues `assigned`, `claimed` and `running`, and the pause fields are\nserver-managed: they change only through the claim, release, pause and\nresume operations and are refused on create and update.\n",
              "type": "object",
              "additionalProperties": false,
              "required": [
                "id",
                "organizationId",
                "name",
                "action",
                "enabled",
                "status",
                "retryCount",
                "maxRetries",
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
                  "x-order": 1
                },
                "organizationId": {
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-go-name": "OrganizationID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "organization_id"
                  },
                  "x-order": 2
                },
                "workspaceId": {
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "workspace_id",
                    "json": "workspaceId,omitempty"
                  },
                  "x-order": 3
                },
                "name": {
                  "type": "string",
                  "description": "Human-readable name for the schedule.",
                  "minLength": 1,
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "name"
                  },
                  "x-order": 4
                },
                "action": {
                  "type": "string",
                  "description": "The action the worker runs when it holds the schedule's claim, for example a command name.",
                  "minLength": 1,
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "action"
                  },
                  "x-order": 5
                },
                "params": {
                  "type": "object",
                  "description": "Action parameters, stored as a JSON blob.",
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "params"
                  },
                  "x-order": 6
                },
                "enabled": {
                  "type": "boolean",
                  "description": "Whether the schedule is eligible to run. A disabled schedule is never claimed.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "enabled"
                  },
                  "x-order": 7
                },
                "runAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Time the schedule first becomes due.",
                  "nullable": true,
                  "x-go-type": "core.NullTime",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "run_at"
                  },
                  "x-order": 8
                },
                "nextRunAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Next time a recurring or retrying schedule becomes due.",
                  "nullable": true,
                  "x-go-type": "core.NullTime",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "next_run_at"
                  },
                  "x-order": 9
                },
                "recurrence": {
                  "type": "string",
                  "description": "Recurrence rule for repeating schedules. Empty for a run-once schedule.",
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "recurrence"
                  },
                  "x-order": 10
                },
                "status": {
                  "type": "string",
                  "description": "Lifecycle status. `pending`: created, not yet due-scheduled.\n`scheduled`: waiting for its due time. `assigned`: designated for a\nparticular worker but not yet claimed. `claimed`: a worker holds the\nclaim and has not started. `running`: the claim holder is executing\nit. `retrying`: the last attempt failed and another is due.\n`completed`, `failed` and `cancelled` are terminal for a run-once\nschedule; a recurring schedule returns to `scheduled`.\n",
                  "enum": [
                    "pending",
                    "scheduled",
                    "assigned",
                    "claimed",
                    "running",
                    "retrying",
                    "completed",
                    "failed",
                    "cancelled"
                  ],
                  "x-oapi-codegen-extra-tags": {
                    "db": "status"
                  },
                  "x-order": 11
                },
                "retryCount": {
                  "type": "integer",
                  "description": "Attempts already retried for the current run.",
                  "minimum": 0,
                  "x-oapi-codegen-extra-tags": {
                    "db": "retry_count"
                  },
                  "x-order": 12
                },
                "maxRetries": {
                  "type": "integer",
                  "description": "Maximum retries before the run is marked failed.",
                  "minimum": 0,
                  "x-oapi-codegen-extra-tags": {
                    "db": "max_retries"
                  },
                  "x-order": 13
                },
                "retryDelayMinutes": {
                  "type": "integer",
                  "description": "Minutes to wait before a retry becomes due.",
                  "minimum": 0,
                  "x-oapi-codegen-extra-tags": {
                    "db": "retry_delay_minutes"
                  },
                  "x-order": 14
                },
                "lastRunAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Time of the most recent attempt.",
                  "nullable": true,
                  "x-go-type": "core.NullTime",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "last_run_at"
                  },
                  "x-order": 15
                },
                "lastError": {
                  "type": "string",
                  "description": "Error reported by the most recent attempt.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "last_error"
                  },
                  "x-order": 16
                },
                "claim": {
                  "x-go-type": "*claimv1beta3.Claim",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/v1beta3/claim",
                    "name": "claimv1beta3"
                  },
                  "description": "The schedule's live claim, when one is held. Server-managed; omitted when the schedule is unclaimed.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "-",
                    "json": "claim,omitempty"
                  },
                  "x-order": 17,
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Claim Schema",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "resourceType",
                    "resourceId",
                    "claimant",
                    "status",
                    "claimedAt",
                    "expiresAt",
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
                      "x-order": 1
                    },
                    "organizationId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-name": "OrganizationID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "organization_id"
                      },
                      "x-order": 2
                    },
                    "resourceType": {
                      "type": "string",
                      "description": "Type of the claimed resource, for example `schedule`.",
                      "minLength": 1,
                      "maxLength": 64,
                      "x-oapi-codegen-extra-tags": {
                        "db": "resource_type"
                      },
                      "x-order": 3
                    },
                    "resourceId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "resource_id"
                      },
                      "x-order": 4
                    },
                    "claimant": {
                      "type": "string",
                      "description": "Identity of the holder, as asserted by the worker that took the claim (for example a machine and process identifier).",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "claimant"
                      },
                      "x-order": 5
                    },
                    "status": {
                      "type": "string",
                      "description": "Lifecycle of the claim. `active` while held, `released` once the holder lets it go, `expired` once `expiresAt` passed without a renewal.",
                      "enum": [
                        "active",
                        "released",
                        "expired"
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      },
                      "x-order": 6
                    },
                    "claimedAt": {
                      "description": "Time the claim was taken.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "claimed_at"
                      },
                      "x-order": 7,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "expiresAt": {
                      "description": "Time the claim lapses unless the holder renews it. Always set by the server; a claim past this time is stale.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "expires_at"
                      },
                      "x-order": 8,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "releasedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the holder released the claim. Null while the claim is active or after it expired.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "released_at"
                      },
                      "x-order": 9
                    },
                    "createdAt": {
                      "description": "Timestamp of claim creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 10,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last claim modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 11,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    }
                  }
                },
                "pausedAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Time the schedule was paused. Null when the schedule is not paused. Server-managed.",
                  "nullable": true,
                  "x-go-type": "core.NullTime",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "paused_at"
                  },
                  "x-order": 18
                },
                "pausedBy": {
                  "type": "string",
                  "description": "Identity that paused the schedule. Server-managed.",
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "paused_by"
                  },
                  "x-order": 19
                },
                "pauseReason": {
                  "type": "string",
                  "description": "Reason given for pausing the schedule. Server-managed.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "pause_reason"
                  },
                  "x-order": 20
                },
                "createdAt": {
                  "description": "Timestamp of schedule creation.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at"
                  },
                  "x-order": 21,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updatedAt": {
                  "description": "Timestamp of last schedule modification.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at"
                  },
                  "x-order": 22,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "deletedAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Timestamp when the schedule was soft-deleted. Null while live.",
                  "nullable": true,
                  "x-go-type": "core.NullTime",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "deleted_at"
                  },
                  "x-order": 23
                }
              }
            },
            "description": "Schedules included on this page of results."
          }
        }
      }
    }
  }
};

export default ScheduleSchema;
