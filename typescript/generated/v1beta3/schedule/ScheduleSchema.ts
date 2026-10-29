/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const ScheduleSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Schedule",
    "description": "OpenAPI schema for organization schedules. A schedule is a job: an action\nwith a typed target and parameters, a due time, an optional recurrence in\nan IANA timezone, a retry budget and a status. Schedules belong to an\norganization and may be linked to a workspace. Workers take a schedule\nthrough the generic `claim` construct, with `resourceType` `schedule` on\n`POST /api/claims`; there is one claim path and no schedule-specific\nclaim route. The race between workers is decided server-side in a\nsingle statement, only the holder renews, and a claim past its\n`expiresAt` is stale so the schedule is claimable again. Releasing a\nschedule's claim records the run's outcome on the schedule in the same\ntransaction: `lastRunAt` becomes the release time and `lastError` the\nclaim's `outcomeError`; a `failed` outcome with retries left increments\n`retryCount`, sets `status` `retrying` and makes the schedule due again\nafter `retryDelayMinutes`. Any other outcome (`completed`, `cancelled`,\nor `failed` with no retries left) resets `retryCount`; a recurring\nschedule then returns to `status` `scheduled` with `nextRunAt` at its\nnext occurrence, and a run-once schedule takes the outcome as its\n`status` with no `nextRunAt`. Deleting a schedule expires its live\nclaim. Pausing has two server scopes, the organization-wide pause\nand a per-schedule pause; a schedule is claimed only when neither says\npaused. Pause state is data, never a path: a schedule is paused or\nresumed with `paused` on `PUT /api/schedules/{scheduleId}`, and the\norganization-wide pause is the `schedulePause` organization preference\n(v1beta2 organization). Supersedes the per-user `/user/schedules` routes\nof v1beta2, which remain as a deprecated alias.\nOrganization scope: every operation acts only in the organization the\nsession resolved to (X-Current-Orgid, then the user's selected\norganization), and only when the caller is a live member of it. A\ncaller who is not a member receives the same 404 as an unknown id, so\nthe existence of another organization's schedules is never disclosed.\n",
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
      "description": "Operations related to organization schedules."
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
              "description": "Lifecycle status of a schedule. `pending`: created, not yet\ndue-scheduled. `scheduled`: waiting for its due time. `assigned`:\ndesignated for a particular worker but not yet claimed. `claimed`: a\nworker holds the claim and has not started. `running`: the claim\nholder is executing it. `retrying`: the last attempt failed and\nanother is due. `completed`, `failed` and `cancelled` are terminal\nfor a run-once schedule; a recurring schedule returns to `scheduled`\nwhen its claim is released with a `completed` outcome.\n",
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
                        "description": "Server-returned schedule. A schedule is a job: an action to run, what it\nacts on (`targetType`, `targetId`) and its parameters, when it is due\n(`runAt`, `nextRunAt`, `recurrence` in `timezone`), its retry budget and\nits outcome. Schedules belong to an organization and may be linked to a\nworkspace. A worker takes a schedule through the generic `claim`\nconstruct (`POST /api/claims` with `resourceType` `schedule`); there is\nno schedule-specific claim route. While the claim is live no other worker\ncan take the schedule, and a claim past its `expiresAt` is stale so the\nschedule is claimable again. Releasing the claim records the run's\noutcome on the schedule in the same transaction (see `status`). The\n`claim` and the status values `assigned`, `claimed` and `running` are\nserver-managed. Pausing is data, not an operation: a client sets `paused`\n(and optionally `pauseReason`) on create or update, and the server\nrecords `pausedAt` and `pausedBy`. Fields marked readOnly are\nserver-managed and ignored on input.\n",
                        "type": "object",
                        "additionalProperties": false,
                        "required": [
                          "id",
                          "organizationId",
                          "name",
                          "action",
                          "enabled",
                          "timezone",
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
                            "readOnly": true,
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
                            "readOnly": true,
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
                          "createdBy": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "readOnly": true,
                            "x-go-name": "CreatedBy",
                            "x-oapi-codegen-extra-tags": {
                              "db": "owner"
                            },
                            "x-order": 4
                          },
                          "name": {
                            "type": "string",
                            "description": "Human-readable name for the schedule.",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "name"
                            },
                            "x-order": 5
                          },
                          "action": {
                            "type": "string",
                            "description": "The action the worker runs when it holds the schedule's claim, for example a command name.",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "action"
                            },
                            "x-order": 6
                          },
                          "targetType": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "target_type",
                              "json": "targetType,omitempty"
                            },
                            "x-order": 7,
                            "type": "string",
                            "description": "Type of the resource the schedule acts on, named the way a claim's\n`resourceType` is (lowercase snake_case construct name, for example\n`content_item` or `profile`). A server verifies the target types it\nserves and refuses others with 400. Set together with `targetId` or\nnot at all.\n",
                            "pattern": "^[a-z][a-z0-9_]*$",
                            "minLength": 1,
                            "maxLength": 64
                          },
                          "targetId": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-go-name": "TargetID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "target_id",
                              "json": "targetId,omitempty"
                            },
                            "x-order": 8
                          },
                          "params": {
                            "type": "object",
                            "description": "Action parameters, stored as a JSON blob. What the schedule acts on belongs in `targetType` and `targetId`, not here.",
                            "x-go-type": "core.Map",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "params"
                            },
                            "x-order": 9
                          },
                          "enabled": {
                            "type": "boolean",
                            "description": "Whether the schedule is eligible to run. A disabled schedule is never claimed.",
                            "default": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "enabled"
                            },
                            "x-order": 10
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
                            "x-order": 11
                          },
                          "nextRunAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Next time the schedule becomes due. Null when it is never due again.",
                            "nullable": true,
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "next_run"
                            },
                            "x-order": 12
                          },
                          "recurrence": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "recurrence"
                            },
                            "x-order": 13,
                            "type": "string",
                            "description": "How the schedule repeats once it has run. Empty, `once` and `none`\nmean run once. `hourly` repeats every hour; `daily`, `weekly` and\n`monthly` repeat at the same wall-clock time one calendar day, week\nor month later in the schedule's `timezone`, so a daily schedule\nkeeps its local time across daylight-saving changes. `every:<n>`\nrepeats every `n` minutes (1 to 999999). Occurrences are counted\nfrom `runAt` (else from the current `nextRunAt`); the next due time\nis the first occurrence after the run is released, so missed runs\nare not replayed.\n",
                            "pattern": "^(|once|none|hourly|daily|weekly|monthly|every:[1-9][0-9]{0,5})$",
                            "maxLength": 255,
                            "default": ""
                          },
                          "timezone": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "timezone"
                            },
                            "x-order": 14,
                            "type": "string",
                            "description": "IANA time zone name (for example `UTC` or `America/Chicago`) in which\n`daily`, `weekly` and `monthly` recurrences keep their wall-clock\ntime. Instants (`runAt`, `nextRunAt`) are always absolute. The server\nrefuses a name it does not know with 400.\n",
                            "minLength": 1,
                            "maxLength": 64,
                            "pattern": "^[A-Za-z][A-Za-z0-9_+-]*(/[A-Za-z0-9_+-]+)*$",
                            "default": "UTC"
                          },
                          "status": {
                            "type": "string",
                            "description": "Lifecycle status of a schedule. `pending`: created, not yet\ndue-scheduled. `scheduled`: waiting for its due time. `assigned`:\ndesignated for a particular worker but not yet claimed. `claimed`: a\nworker holds the claim and has not started. `running`: the claim\nholder is executing it. `retrying`: the last attempt failed and\nanother is due. `completed`, `failed` and `cancelled` are terminal\nfor a run-once schedule; a recurring schedule returns to `scheduled`\nwhen its claim is released with a `completed` outcome.\n",
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
                            "x-order": 15
                          },
                          "retryCount": {
                            "type": "integer",
                            "description": "Attempts already retried for the current run.",
                            "minimum": 0,
                            "default": 0,
                            "x-oapi-codegen-extra-tags": {
                              "db": "retry_count"
                            },
                            "x-order": 16
                          },
                          "maxRetries": {
                            "type": "integer",
                            "description": "Maximum retries before the run is marked failed.",
                            "minimum": 0,
                            "default": 0,
                            "x-oapi-codegen-extra-tags": {
                              "db": "max_retries"
                            },
                            "x-order": 17
                          },
                          "retryDelayMinutes": {
                            "type": "integer",
                            "description": "Minutes to wait before a retry becomes due.",
                            "minimum": 0,
                            "default": 0,
                            "x-oapi-codegen-extra-tags": {
                              "db": "retry_delay_minutes"
                            },
                            "x-order": 18
                          },
                          "lastRunAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Time the most recent attempt ended (the release time of its claim). Server-managed.",
                            "nullable": true,
                            "readOnly": true,
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "last_run"
                            },
                            "x-order": 19
                          },
                          "lastError": {
                            "type": "string",
                            "description": "Error reported by the most recent attempt; empty after a successful one. Server-managed.",
                            "maxLength": 5000,
                            "readOnly": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "last_error"
                            },
                            "x-order": 20
                          },
                          "claim": {
                            "x-go-type": "*claimv1beta3.Claim",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/v1beta3/claim",
                              "name": "claimv1beta3"
                            },
                            "description": "The schedule's live claim, when one is held. A read-only view of the claim construct; omitted when the schedule is unclaimed.",
                            "readOnly": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "-",
                              "json": "claim,omitempty"
                            },
                            "x-order": 21,
                            "$schema": "http://json-schema.org/draft-07/schema#",
                            "title": "Claim Schema",
                            "type": "object",
                            "additionalProperties": false,
                            "required": [
                              "id",
                              "organizationId",
                              "resourceType",
                              "resourceId",
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
                                "description": "Type of the claimed resource, the construct name in snake_case, for example `content_item` or `schedule`.",
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
                              "claimantConnectionId": {
                                "type": "string",
                                "format": "uuid",
                                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                },
                                "x-go-name": "ClaimantConnectionID",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "claimant_connection_id",
                                  "json": "claimantConnectionId,omitempty"
                                },
                                "x-order": 5
                              },
                              "claimantUserId": {
                                "type": "string",
                                "format": "uuid",
                                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                },
                                "x-go-name": "ClaimantUserID",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "claimant_user_id",
                                  "json": "claimantUserId,omitempty"
                                },
                                "x-order": 6
                              },
                              "status": {
                                "type": "string",
                                "description": "Lifecycle of the claim. `active` while held, `released` once the holder (or a member allowed to release it) lets it go, `expired` once `expiresAt` passed without a renewal or the holding connection was deleted. Expiry is evaluated when the claim is read, so a claim never reads `active` past its `expiresAt`.\n",
                                "enum": [
                                  "active",
                                  "released",
                                  "expired"
                                ],
                                "x-oapi-codegen-extra-tags": {
                                  "db": "status"
                                },
                                "x-order": 7
                              },
                              "claimedAt": {
                                "description": "Time the claim was taken.",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "claimed_at"
                                },
                                "x-order": 8,
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "expiresAt": {
                                "description": "Time the claim lapses unless the holder renews it. Always set by the server; a claim past this time is stale.",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "expires_at"
                                },
                                "x-order": 9,
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "renewedAt": {
                                "type": "string",
                                "format": "date-time",
                                "description": "Time of the last renewal. Null until the claim is first renewed.",
                                "nullable": true,
                                "x-go-type": "core.NullTime",
                                "x-go-type-import": {
                                  "path": "github.com/meshery/schemas/models/core",
                                  "name": "core"
                                },
                                "x-oapi-codegen-extra-tags": {
                                  "db": "renewed_at"
                                },
                                "x-order": 10
                              },
                              "releasedAt": {
                                "type": "string",
                                "format": "date-time",
                                "description": "Time the claim was released. Null while the claim is active or after it expired.",
                                "nullable": true,
                                "x-go-type": "core.NullTime",
                                "x-go-type-import": {
                                  "path": "github.com/meshery/schemas/models/core",
                                  "name": "core"
                                },
                                "x-oapi-codegen-extra-tags": {
                                  "db": "released_at"
                                },
                                "x-order": 11
                              },
                              "outcome": {
                                "type": "string",
                                "description": "What the releaser reported when the claim was released: `completed` when the work behind it finished, `failed` when it was attempted and did not succeed, `cancelled` when it was let go without the work being done (including a release by another member). Omitted while the claim is active and on an expired claim.\n",
                                "enum": [
                                  "completed",
                                  "failed",
                                  "cancelled"
                                ],
                                "x-oapi-codegen-extra-tags": {
                                  "db": "outcome",
                                  "json": "outcome,omitempty"
                                },
                                "x-order": 12
                              },
                              "outcomeError": {
                                "type": "string",
                                "description": "Error reported with a `failed` outcome. Omitted otherwise.",
                                "maxLength": 5000,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "outcome_error",
                                  "json": "outcomeError,omitempty"
                                },
                                "x-order": 13
                              },
                              "outcomeEventId": {
                                "type": "string",
                                "format": "uuid",
                                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                },
                                "x-go-name": "OutcomeEventID",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "outcome_event_id",
                                  "json": "outcomeEventId,omitempty"
                                },
                                "x-order": 14
                              },
                              "releasedBy": {
                                "type": "string",
                                "format": "uuid",
                                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                },
                                "x-go-name": "ReleasedBy",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "released_by",
                                  "json": "releasedBy,omitempty"
                                },
                                "x-order": 15
                              },
                              "createdAt": {
                                "description": "Timestamp of claim creation.",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "created_at"
                                },
                                "x-order": 16,
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "updatedAt": {
                                "description": "Timestamp of last claim modification.",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "updated_at"
                                },
                                "x-order": 17,
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
                            "readOnly": true,
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "paused_at"
                            },
                            "x-order": 22
                          },
                          "pausedBy": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "readOnly": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "paused_by",
                              "json": "pausedBy,omitempty"
                            },
                            "x-order": 23
                          },
                          "pauseReason": {
                            "type": "string",
                            "description": "Reason given for pausing the schedule, set with `paused` on create or update. Empty when not paused.",
                            "maxLength": 1000,
                            "x-oapi-codegen-extra-tags": {
                              "db": "pause_reason"
                            },
                            "x-order": 24
                          },
                          "createdAt": {
                            "description": "Timestamp of schedule creation.",
                            "readOnly": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at"
                            },
                            "x-order": 25,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp of last schedule modification.",
                            "readOnly": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at"
                            },
                            "x-order": 26,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deletedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the schedule was soft-deleted. Null while live.",
                            "nullable": true,
                            "readOnly": true,
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at"
                            },
                            "x-order": 27
                          },
                          "posture": {
                            "x-go-type": "*posturev1beta3.Posture",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/v1beta3/posture",
                              "name": "posturev1beta3"
                            },
                            "description": "Optional Posture this schedule runs under, resolved above the\nprofile x platform resolution and below an explicit per-run flag.\nOmitted when the schedule has no override: it then runs under whatever\nprofile x platform, configuration, environment, account or default\nresolves to, exactly as before. Any value outside the Posture\nenum is refused with 400.\n",
                            "x-oapi-codegen-extra-tags": {
                              "db": "posture",
                              "json": "posture,omitempty"
                            },
                            "x-order": 28,
                            "$schema": "http://json-schema.org/draft-07/schema#",
                            "title": "Posture Schema",
                            "type": "string",
                            "enum": [
                              "cautious",
                              "standard",
                              "brisk"
                            ]
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
        "description": "Creates a schedule in the organization of the authenticated session,\nowned by the session user (`createdBy`). `status` accepts only\n`pending`, `scheduled` and `cancelled`; omitted, the server picks\n`scheduled` when the schedule has a due time and `pending` otherwise.\n`nextRunAt` defaults to `runAt`. A `targetId` must name a live\nresource of `targetType` in the organization, else 400. Send\n`paused: true` to create the schedule already paused.\n",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "additionalProperties": false,
                "description": "Payload for creating or updating a schedule. Contains only\nclient-settable fields; the owning `organizationId`, `createdBy`, the\nclaim, `pausedAt`, `pausedBy`, `lastRunAt`, `lastError` and the\ntimestamps are server-managed and refused as unknown fields. Pausing\nis a field, not an operation: `paused` pauses or resumes the\nschedule. `status` accepts only `pending`, `scheduled` and\n`cancelled` here (otherwise 400); the other values are set by the\nserver as the schedule is claimed and released.\n",
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
                  "targetType": {
                    "x-oapi-codegen-extra-tags": {
                      "json": "targetType,omitempty"
                    },
                    "type": "string",
                    "description": "Type of the resource the schedule acts on, named the way a claim's\n`resourceType` is (lowercase snake_case construct name, for example\n`content_item` or `profile`). A server verifies the target types it\nserves and refuses others with 400. Set together with `targetId` or\nnot at all.\n",
                    "pattern": "^[a-z][a-z0-9_]*$",
                    "minLength": 1,
                    "maxLength": 64
                  },
                  "targetId": {
                    "type": "string",
                    "format": "uuid",
                    "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    },
                    "x-go-name": "TargetID",
                    "x-oapi-codegen-extra-tags": {
                      "json": "targetId,omitempty"
                    }
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
                    "description": "Whether the schedule is eligible to run.",
                    "default": true
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
                  "nextRunAt": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Next time the schedule becomes due. Omitted on create, it defaults to `runAt`; omitted on update, it is kept. Send null for never due again.",
                    "nullable": true,
                    "x-go-type": "core.NullTime",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    }
                  },
                  "recurrence": {
                    "type": "string",
                    "description": "How the schedule repeats once it has run. Empty, `once` and `none`\nmean run once. `hourly` repeats every hour; `daily`, `weekly` and\n`monthly` repeat at the same wall-clock time one calendar day, week\nor month later in the schedule's `timezone`, so a daily schedule\nkeeps its local time across daylight-saving changes. `every:<n>`\nrepeats every `n` minutes (1 to 999999). Occurrences are counted\nfrom `runAt` (else from the current `nextRunAt`); the next due time\nis the first occurrence after the run is released, so missed runs\nare not replayed.\n",
                    "pattern": "^(|once|none|hourly|daily|weekly|monthly|every:[1-9][0-9]{0,5})$",
                    "maxLength": 255,
                    "default": ""
                  },
                  "timezone": {
                    "type": "string",
                    "description": "IANA time zone name (for example `UTC` or `America/Chicago`) in which\n`daily`, `weekly` and `monthly` recurrences keep their wall-clock\ntime. Instants (`runAt`, `nextRunAt`) are always absolute. The server\nrefuses a name it does not know with 400.\n",
                    "minLength": 1,
                    "maxLength": 64,
                    "pattern": "^[A-Za-z][A-Za-z0-9_+-]*(/[A-Za-z0-9_+-]+)*$",
                    "default": "UTC"
                  },
                  "status": {
                    "type": "string",
                    "description": "Lifecycle status of a schedule. `pending`: created, not yet\ndue-scheduled. `scheduled`: waiting for its due time. `assigned`:\ndesignated for a particular worker but not yet claimed. `claimed`: a\nworker holds the claim and has not started. `running`: the claim\nholder is executing it. `retrying`: the last attempt failed and\nanother is due. `completed`, `failed` and `cancelled` are terminal\nfor a run-once schedule; a recurring schedule returns to `scheduled`\nwhen its claim is released with a `completed` outcome.\n",
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
                  },
                  "retryCount": {
                    "type": "integer",
                    "description": "Retries used so far for the current run, for example 0 to re-arm a schedule. Omitted on update, it is kept.",
                    "minimum": 0
                  },
                  "maxRetries": {
                    "type": "integer",
                    "description": "Maximum retries before the run is marked failed.",
                    "minimum": 0,
                    "default": 0
                  },
                  "retryDelayMinutes": {
                    "type": "integer",
                    "description": "Minutes to wait before a retry becomes due.",
                    "minimum": 0,
                    "default": 0
                  },
                  "paused": {
                    "type": "boolean",
                    "description": "`true` pauses the schedule so it is never claimed; `false`\nresumes it. Omit to leave the pause unchanged. The server records\n`pausedAt` and `pausedBy`.\n"
                  },
                  "pauseReason": {
                    "type": "string",
                    "description": "Reason for pausing; stored only while `paused` is true and cleared on resume.",
                    "maxLength": 1000
                  },
                  "posture": {
                    "x-go-type": "*posturev1beta3.Posture",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/v1beta3/posture",
                      "name": "posturev1beta3"
                    },
                    "description": "Optional Posture this schedule runs under, resolved above\nthe profile x platform resolution and below an explicit per-run\nflag. Omit to inherit: the schedule then runs under whatever\nprofile x platform, configuration, environment, account or\ndefault resolves to, exactly as before.\n",
                    "x-oapi-codegen-extra-tags": {
                      "json": "posture,omitempty"
                    },
                    "$schema": "http://json-schema.org/draft-07/schema#",
                    "title": "Posture Schema",
                    "type": "string",
                    "enum": [
                      "cautious",
                      "standard",
                      "brisk"
                    ]
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Schedule created",
            "headers": {
              "ETag": {
                "description": "Strong entity tag of the schedule. It changes whenever the schedule changes; send it back as `If-Match` to make updateSchedule conditional.",
                "schema": {
                  "type": "string"
                }
              }
            },
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Schedule Schema",
                  "description": "Server-returned schedule. A schedule is a job: an action to run, what it\nacts on (`targetType`, `targetId`) and its parameters, when it is due\n(`runAt`, `nextRunAt`, `recurrence` in `timezone`), its retry budget and\nits outcome. Schedules belong to an organization and may be linked to a\nworkspace. A worker takes a schedule through the generic `claim`\nconstruct (`POST /api/claims` with `resourceType` `schedule`); there is\nno schedule-specific claim route. While the claim is live no other worker\ncan take the schedule, and a claim past its `expiresAt` is stale so the\nschedule is claimable again. Releasing the claim records the run's\noutcome on the schedule in the same transaction (see `status`). The\n`claim` and the status values `assigned`, `claimed` and `running` are\nserver-managed. Pausing is data, not an operation: a client sets `paused`\n(and optionally `pauseReason`) on create or update, and the server\nrecords `pausedAt` and `pausedBy`. Fields marked readOnly are\nserver-managed and ignored on input.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "name",
                    "action",
                    "enabled",
                    "timezone",
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
                      "readOnly": true,
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
                      "readOnly": true,
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
                    "createdBy": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "readOnly": true,
                      "x-go-name": "CreatedBy",
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner"
                      },
                      "x-order": 4
                    },
                    "name": {
                      "type": "string",
                      "description": "Human-readable name for the schedule.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      },
                      "x-order": 5
                    },
                    "action": {
                      "type": "string",
                      "description": "The action the worker runs when it holds the schedule's claim, for example a command name.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "action"
                      },
                      "x-order": 6
                    },
                    "targetType": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "target_type",
                        "json": "targetType,omitempty"
                      },
                      "x-order": 7,
                      "type": "string",
                      "description": "Type of the resource the schedule acts on, named the way a claim's\n`resourceType` is (lowercase snake_case construct name, for example\n`content_item` or `profile`). A server verifies the target types it\nserves and refuses others with 400. Set together with `targetId` or\nnot at all.\n",
                      "pattern": "^[a-z][a-z0-9_]*$",
                      "minLength": 1,
                      "maxLength": 64
                    },
                    "targetId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-name": "TargetID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "target_id",
                        "json": "targetId,omitempty"
                      },
                      "x-order": 8
                    },
                    "params": {
                      "type": "object",
                      "description": "Action parameters, stored as a JSON blob. What the schedule acts on belongs in `targetType` and `targetId`, not here.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "params"
                      },
                      "x-order": 9
                    },
                    "enabled": {
                      "type": "boolean",
                      "description": "Whether the schedule is eligible to run. A disabled schedule is never claimed.",
                      "default": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "enabled"
                      },
                      "x-order": 10
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
                      "x-order": 11
                    },
                    "nextRunAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Next time the schedule becomes due. Null when it is never due again.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "next_run"
                      },
                      "x-order": 12
                    },
                    "recurrence": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "recurrence"
                      },
                      "x-order": 13,
                      "type": "string",
                      "description": "How the schedule repeats once it has run. Empty, `once` and `none`\nmean run once. `hourly` repeats every hour; `daily`, `weekly` and\n`monthly` repeat at the same wall-clock time one calendar day, week\nor month later in the schedule's `timezone`, so a daily schedule\nkeeps its local time across daylight-saving changes. `every:<n>`\nrepeats every `n` minutes (1 to 999999). Occurrences are counted\nfrom `runAt` (else from the current `nextRunAt`); the next due time\nis the first occurrence after the run is released, so missed runs\nare not replayed.\n",
                      "pattern": "^(|once|none|hourly|daily|weekly|monthly|every:[1-9][0-9]{0,5})$",
                      "maxLength": 255,
                      "default": ""
                    },
                    "timezone": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "timezone"
                      },
                      "x-order": 14,
                      "type": "string",
                      "description": "IANA time zone name (for example `UTC` or `America/Chicago`) in which\n`daily`, `weekly` and `monthly` recurrences keep their wall-clock\ntime. Instants (`runAt`, `nextRunAt`) are always absolute. The server\nrefuses a name it does not know with 400.\n",
                      "minLength": 1,
                      "maxLength": 64,
                      "pattern": "^[A-Za-z][A-Za-z0-9_+-]*(/[A-Za-z0-9_+-]+)*$",
                      "default": "UTC"
                    },
                    "status": {
                      "type": "string",
                      "description": "Lifecycle status of a schedule. `pending`: created, not yet\ndue-scheduled. `scheduled`: waiting for its due time. `assigned`:\ndesignated for a particular worker but not yet claimed. `claimed`: a\nworker holds the claim and has not started. `running`: the claim\nholder is executing it. `retrying`: the last attempt failed and\nanother is due. `completed`, `failed` and `cancelled` are terminal\nfor a run-once schedule; a recurring schedule returns to `scheduled`\nwhen its claim is released with a `completed` outcome.\n",
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
                      "x-order": 15
                    },
                    "retryCount": {
                      "type": "integer",
                      "description": "Attempts already retried for the current run.",
                      "minimum": 0,
                      "default": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "retry_count"
                      },
                      "x-order": 16
                    },
                    "maxRetries": {
                      "type": "integer",
                      "description": "Maximum retries before the run is marked failed.",
                      "minimum": 0,
                      "default": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "max_retries"
                      },
                      "x-order": 17
                    },
                    "retryDelayMinutes": {
                      "type": "integer",
                      "description": "Minutes to wait before a retry becomes due.",
                      "minimum": 0,
                      "default": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "retry_delay_minutes"
                      },
                      "x-order": 18
                    },
                    "lastRunAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the most recent attempt ended (the release time of its claim). Server-managed.",
                      "nullable": true,
                      "readOnly": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_run"
                      },
                      "x-order": 19
                    },
                    "lastError": {
                      "type": "string",
                      "description": "Error reported by the most recent attempt; empty after a successful one. Server-managed.",
                      "maxLength": 5000,
                      "readOnly": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_error"
                      },
                      "x-order": 20
                    },
                    "claim": {
                      "x-go-type": "*claimv1beta3.Claim",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta3/claim",
                        "name": "claimv1beta3"
                      },
                      "description": "The schedule's live claim, when one is held. A read-only view of the claim construct; omitted when the schedule is unclaimed.",
                      "readOnly": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "-",
                        "json": "claim,omitempty"
                      },
                      "x-order": 21,
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "title": "Claim Schema",
                      "type": "object",
                      "additionalProperties": false,
                      "required": [
                        "id",
                        "organizationId",
                        "resourceType",
                        "resourceId",
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
                          "description": "Type of the claimed resource, the construct name in snake_case, for example `content_item` or `schedule`.",
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
                        "claimantConnectionId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-go-name": "ClaimantConnectionID",
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimant_connection_id",
                            "json": "claimantConnectionId,omitempty"
                          },
                          "x-order": 5
                        },
                        "claimantUserId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-go-name": "ClaimantUserID",
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimant_user_id",
                            "json": "claimantUserId,omitempty"
                          },
                          "x-order": 6
                        },
                        "status": {
                          "type": "string",
                          "description": "Lifecycle of the claim. `active` while held, `released` once the holder (or a member allowed to release it) lets it go, `expired` once `expiresAt` passed without a renewal or the holding connection was deleted. Expiry is evaluated when the claim is read, so a claim never reads `active` past its `expiresAt`.\n",
                          "enum": [
                            "active",
                            "released",
                            "expired"
                          ],
                          "x-oapi-codegen-extra-tags": {
                            "db": "status"
                          },
                          "x-order": 7
                        },
                        "claimedAt": {
                          "description": "Time the claim was taken.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimed_at"
                          },
                          "x-order": 8,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "expiresAt": {
                          "description": "Time the claim lapses unless the holder renews it. Always set by the server; a claim past this time is stale.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "expires_at"
                          },
                          "x-order": 9,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "renewedAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Time of the last renewal. Null until the claim is first renewed.",
                          "nullable": true,
                          "x-go-type": "core.NullTime",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "renewed_at"
                          },
                          "x-order": 10
                        },
                        "releasedAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Time the claim was released. Null while the claim is active or after it expired.",
                          "nullable": true,
                          "x-go-type": "core.NullTime",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "released_at"
                          },
                          "x-order": 11
                        },
                        "outcome": {
                          "type": "string",
                          "description": "What the releaser reported when the claim was released: `completed` when the work behind it finished, `failed` when it was attempted and did not succeed, `cancelled` when it was let go without the work being done (including a release by another member). Omitted while the claim is active and on an expired claim.\n",
                          "enum": [
                            "completed",
                            "failed",
                            "cancelled"
                          ],
                          "x-oapi-codegen-extra-tags": {
                            "db": "outcome",
                            "json": "outcome,omitempty"
                          },
                          "x-order": 12
                        },
                        "outcomeError": {
                          "type": "string",
                          "description": "Error reported with a `failed` outcome. Omitted otherwise.",
                          "maxLength": 5000,
                          "x-oapi-codegen-extra-tags": {
                            "db": "outcome_error",
                            "json": "outcomeError,omitempty"
                          },
                          "x-order": 13
                        },
                        "outcomeEventId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-go-name": "OutcomeEventID",
                          "x-oapi-codegen-extra-tags": {
                            "db": "outcome_event_id",
                            "json": "outcomeEventId,omitempty"
                          },
                          "x-order": 14
                        },
                        "releasedBy": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-go-name": "ReleasedBy",
                          "x-oapi-codegen-extra-tags": {
                            "db": "released_by",
                            "json": "releasedBy,omitempty"
                          },
                          "x-order": 15
                        },
                        "createdAt": {
                          "description": "Timestamp of claim creation.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "created_at"
                          },
                          "x-order": 16,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "updatedAt": {
                          "description": "Timestamp of last claim modification.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "updated_at"
                          },
                          "x-order": 17,
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
                      "readOnly": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_at"
                      },
                      "x-order": 22
                    },
                    "pausedBy": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "readOnly": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_by",
                        "json": "pausedBy,omitempty"
                      },
                      "x-order": 23
                    },
                    "pauseReason": {
                      "type": "string",
                      "description": "Reason given for pausing the schedule, set with `paused` on create or update. Empty when not paused.",
                      "maxLength": 1000,
                      "x-oapi-codegen-extra-tags": {
                        "db": "pause_reason"
                      },
                      "x-order": 24
                    },
                    "createdAt": {
                      "description": "Timestamp of schedule creation.",
                      "readOnly": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 25,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last schedule modification.",
                      "readOnly": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 26,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the schedule was soft-deleted. Null while live.",
                      "nullable": true,
                      "readOnly": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at"
                      },
                      "x-order": 27
                    },
                    "posture": {
                      "x-go-type": "*posturev1beta3.Posture",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta3/posture",
                        "name": "posturev1beta3"
                      },
                      "description": "Optional Posture this schedule runs under, resolved above the\nprofile x platform resolution and below an explicit per-run flag.\nOmitted when the schedule has no override: it then runs under whatever\nprofile x platform, configuration, environment, account or default\nresolves to, exactly as before. Any value outside the Posture\nenum is refused with 400.\n",
                      "x-oapi-codegen-extra-tags": {
                        "db": "posture",
                        "json": "posture,omitempty"
                      },
                      "x-order": 28,
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "title": "Posture Schema",
                      "type": "string",
                      "enum": [
                        "cautious",
                        "standard",
                        "brisk"
                      ]
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
        "description": "Returns the schedule with its live claim, when one is held, and its\nentity tag in the `ETag` header.\n",
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
            "headers": {
              "ETag": {
                "description": "Strong entity tag of the schedule. It changes whenever the schedule changes; send it back as `If-Match` to make updateSchedule conditional.",
                "schema": {
                  "type": "string"
                }
              }
            },
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Schedule Schema",
                  "description": "Server-returned schedule. A schedule is a job: an action to run, what it\nacts on (`targetType`, `targetId`) and its parameters, when it is due\n(`runAt`, `nextRunAt`, `recurrence` in `timezone`), its retry budget and\nits outcome. Schedules belong to an organization and may be linked to a\nworkspace. A worker takes a schedule through the generic `claim`\nconstruct (`POST /api/claims` with `resourceType` `schedule`); there is\nno schedule-specific claim route. While the claim is live no other worker\ncan take the schedule, and a claim past its `expiresAt` is stale so the\nschedule is claimable again. Releasing the claim records the run's\noutcome on the schedule in the same transaction (see `status`). The\n`claim` and the status values `assigned`, `claimed` and `running` are\nserver-managed. Pausing is data, not an operation: a client sets `paused`\n(and optionally `pauseReason`) on create or update, and the server\nrecords `pausedAt` and `pausedBy`. Fields marked readOnly are\nserver-managed and ignored on input.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "name",
                    "action",
                    "enabled",
                    "timezone",
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
                      "readOnly": true,
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
                      "readOnly": true,
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
                    "createdBy": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "readOnly": true,
                      "x-go-name": "CreatedBy",
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner"
                      },
                      "x-order": 4
                    },
                    "name": {
                      "type": "string",
                      "description": "Human-readable name for the schedule.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      },
                      "x-order": 5
                    },
                    "action": {
                      "type": "string",
                      "description": "The action the worker runs when it holds the schedule's claim, for example a command name.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "action"
                      },
                      "x-order": 6
                    },
                    "targetType": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "target_type",
                        "json": "targetType,omitempty"
                      },
                      "x-order": 7,
                      "type": "string",
                      "description": "Type of the resource the schedule acts on, named the way a claim's\n`resourceType` is (lowercase snake_case construct name, for example\n`content_item` or `profile`). A server verifies the target types it\nserves and refuses others with 400. Set together with `targetId` or\nnot at all.\n",
                      "pattern": "^[a-z][a-z0-9_]*$",
                      "minLength": 1,
                      "maxLength": 64
                    },
                    "targetId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-name": "TargetID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "target_id",
                        "json": "targetId,omitempty"
                      },
                      "x-order": 8
                    },
                    "params": {
                      "type": "object",
                      "description": "Action parameters, stored as a JSON blob. What the schedule acts on belongs in `targetType` and `targetId`, not here.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "params"
                      },
                      "x-order": 9
                    },
                    "enabled": {
                      "type": "boolean",
                      "description": "Whether the schedule is eligible to run. A disabled schedule is never claimed.",
                      "default": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "enabled"
                      },
                      "x-order": 10
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
                      "x-order": 11
                    },
                    "nextRunAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Next time the schedule becomes due. Null when it is never due again.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "next_run"
                      },
                      "x-order": 12
                    },
                    "recurrence": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "recurrence"
                      },
                      "x-order": 13,
                      "type": "string",
                      "description": "How the schedule repeats once it has run. Empty, `once` and `none`\nmean run once. `hourly` repeats every hour; `daily`, `weekly` and\n`monthly` repeat at the same wall-clock time one calendar day, week\nor month later in the schedule's `timezone`, so a daily schedule\nkeeps its local time across daylight-saving changes. `every:<n>`\nrepeats every `n` minutes (1 to 999999). Occurrences are counted\nfrom `runAt` (else from the current `nextRunAt`); the next due time\nis the first occurrence after the run is released, so missed runs\nare not replayed.\n",
                      "pattern": "^(|once|none|hourly|daily|weekly|monthly|every:[1-9][0-9]{0,5})$",
                      "maxLength": 255,
                      "default": ""
                    },
                    "timezone": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "timezone"
                      },
                      "x-order": 14,
                      "type": "string",
                      "description": "IANA time zone name (for example `UTC` or `America/Chicago`) in which\n`daily`, `weekly` and `monthly` recurrences keep their wall-clock\ntime. Instants (`runAt`, `nextRunAt`) are always absolute. The server\nrefuses a name it does not know with 400.\n",
                      "minLength": 1,
                      "maxLength": 64,
                      "pattern": "^[A-Za-z][A-Za-z0-9_+-]*(/[A-Za-z0-9_+-]+)*$",
                      "default": "UTC"
                    },
                    "status": {
                      "type": "string",
                      "description": "Lifecycle status of a schedule. `pending`: created, not yet\ndue-scheduled. `scheduled`: waiting for its due time. `assigned`:\ndesignated for a particular worker but not yet claimed. `claimed`: a\nworker holds the claim and has not started. `running`: the claim\nholder is executing it. `retrying`: the last attempt failed and\nanother is due. `completed`, `failed` and `cancelled` are terminal\nfor a run-once schedule; a recurring schedule returns to `scheduled`\nwhen its claim is released with a `completed` outcome.\n",
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
                      "x-order": 15
                    },
                    "retryCount": {
                      "type": "integer",
                      "description": "Attempts already retried for the current run.",
                      "minimum": 0,
                      "default": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "retry_count"
                      },
                      "x-order": 16
                    },
                    "maxRetries": {
                      "type": "integer",
                      "description": "Maximum retries before the run is marked failed.",
                      "minimum": 0,
                      "default": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "max_retries"
                      },
                      "x-order": 17
                    },
                    "retryDelayMinutes": {
                      "type": "integer",
                      "description": "Minutes to wait before a retry becomes due.",
                      "minimum": 0,
                      "default": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "retry_delay_minutes"
                      },
                      "x-order": 18
                    },
                    "lastRunAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the most recent attempt ended (the release time of its claim). Server-managed.",
                      "nullable": true,
                      "readOnly": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_run"
                      },
                      "x-order": 19
                    },
                    "lastError": {
                      "type": "string",
                      "description": "Error reported by the most recent attempt; empty after a successful one. Server-managed.",
                      "maxLength": 5000,
                      "readOnly": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_error"
                      },
                      "x-order": 20
                    },
                    "claim": {
                      "x-go-type": "*claimv1beta3.Claim",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta3/claim",
                        "name": "claimv1beta3"
                      },
                      "description": "The schedule's live claim, when one is held. A read-only view of the claim construct; omitted when the schedule is unclaimed.",
                      "readOnly": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "-",
                        "json": "claim,omitempty"
                      },
                      "x-order": 21,
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "title": "Claim Schema",
                      "type": "object",
                      "additionalProperties": false,
                      "required": [
                        "id",
                        "organizationId",
                        "resourceType",
                        "resourceId",
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
                          "description": "Type of the claimed resource, the construct name in snake_case, for example `content_item` or `schedule`.",
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
                        "claimantConnectionId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-go-name": "ClaimantConnectionID",
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimant_connection_id",
                            "json": "claimantConnectionId,omitempty"
                          },
                          "x-order": 5
                        },
                        "claimantUserId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-go-name": "ClaimantUserID",
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimant_user_id",
                            "json": "claimantUserId,omitempty"
                          },
                          "x-order": 6
                        },
                        "status": {
                          "type": "string",
                          "description": "Lifecycle of the claim. `active` while held, `released` once the holder (or a member allowed to release it) lets it go, `expired` once `expiresAt` passed without a renewal or the holding connection was deleted. Expiry is evaluated when the claim is read, so a claim never reads `active` past its `expiresAt`.\n",
                          "enum": [
                            "active",
                            "released",
                            "expired"
                          ],
                          "x-oapi-codegen-extra-tags": {
                            "db": "status"
                          },
                          "x-order": 7
                        },
                        "claimedAt": {
                          "description": "Time the claim was taken.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimed_at"
                          },
                          "x-order": 8,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "expiresAt": {
                          "description": "Time the claim lapses unless the holder renews it. Always set by the server; a claim past this time is stale.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "expires_at"
                          },
                          "x-order": 9,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "renewedAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Time of the last renewal. Null until the claim is first renewed.",
                          "nullable": true,
                          "x-go-type": "core.NullTime",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "renewed_at"
                          },
                          "x-order": 10
                        },
                        "releasedAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Time the claim was released. Null while the claim is active or after it expired.",
                          "nullable": true,
                          "x-go-type": "core.NullTime",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "released_at"
                          },
                          "x-order": 11
                        },
                        "outcome": {
                          "type": "string",
                          "description": "What the releaser reported when the claim was released: `completed` when the work behind it finished, `failed` when it was attempted and did not succeed, `cancelled` when it was let go without the work being done (including a release by another member). Omitted while the claim is active and on an expired claim.\n",
                          "enum": [
                            "completed",
                            "failed",
                            "cancelled"
                          ],
                          "x-oapi-codegen-extra-tags": {
                            "db": "outcome",
                            "json": "outcome,omitempty"
                          },
                          "x-order": 12
                        },
                        "outcomeError": {
                          "type": "string",
                          "description": "Error reported with a `failed` outcome. Omitted otherwise.",
                          "maxLength": 5000,
                          "x-oapi-codegen-extra-tags": {
                            "db": "outcome_error",
                            "json": "outcomeError,omitempty"
                          },
                          "x-order": 13
                        },
                        "outcomeEventId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-go-name": "OutcomeEventID",
                          "x-oapi-codegen-extra-tags": {
                            "db": "outcome_event_id",
                            "json": "outcomeEventId,omitempty"
                          },
                          "x-order": 14
                        },
                        "releasedBy": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-go-name": "ReleasedBy",
                          "x-oapi-codegen-extra-tags": {
                            "db": "released_by",
                            "json": "releasedBy,omitempty"
                          },
                          "x-order": 15
                        },
                        "createdAt": {
                          "description": "Timestamp of claim creation.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "created_at"
                          },
                          "x-order": 16,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "updatedAt": {
                          "description": "Timestamp of last claim modification.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "updated_at"
                          },
                          "x-order": 17,
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
                      "readOnly": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_at"
                      },
                      "x-order": 22
                    },
                    "pausedBy": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "readOnly": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_by",
                        "json": "pausedBy,omitempty"
                      },
                      "x-order": 23
                    },
                    "pauseReason": {
                      "type": "string",
                      "description": "Reason given for pausing the schedule, set with `paused` on create or update. Empty when not paused.",
                      "maxLength": 1000,
                      "x-oapi-codegen-extra-tags": {
                        "db": "pause_reason"
                      },
                      "x-order": 24
                    },
                    "createdAt": {
                      "description": "Timestamp of schedule creation.",
                      "readOnly": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 25,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last schedule modification.",
                      "readOnly": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 26,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the schedule was soft-deleted. Null while live.",
                      "nullable": true,
                      "readOnly": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at"
                      },
                      "x-order": 27
                    },
                    "posture": {
                      "x-go-type": "*posturev1beta3.Posture",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta3/posture",
                        "name": "posturev1beta3"
                      },
                      "description": "Optional Posture this schedule runs under, resolved above the\nprofile x platform resolution and below an explicit per-run flag.\nOmitted when the schedule has no override: it then runs under whatever\nprofile x platform, configuration, environment, account or default\nresolves to, exactly as before. Any value outside the Posture\nenum is refused with 400.\n",
                      "x-oapi-codegen-extra-tags": {
                        "db": "posture",
                        "json": "posture,omitempty"
                      },
                      "x-order": 28,
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "title": "Posture Schema",
                      "type": "string",
                      "enum": [
                        "cautious",
                        "standard",
                        "brisk"
                      ]
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
        "description": "Updates the client-settable fields present in the payload; an\nomitted optional field keeps its stored value, and `null` clears a\nnullable one (`workspaceId`, `runAt`, `nextRunAt`, and `targetType`\nwith `targetId`). `status` accepts only\n`pending`, `scheduled` and `cancelled`. Pause or resume the schedule\nby setting `paused` (with an optional `pauseReason`); the server then\nrecords `pausedAt` and `pausedBy`. Pausing a paused schedule keeps\nits original `pausedAt`; omitting `paused` leaves the pause\nunchanged. The optional `If-Match` header makes the write\nconditional on the entity tag the schedule carried when it was read:\nwhen it no longer matches, the request is refused with 412 and\nnothing is written. Without `If-Match` the write is unconditional.\n",
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
          },
          {
            "name": "If-Match",
            "in": "header",
            "required": false,
            "description": "Entity tag of the schedule as last read, from the `ETag` header of getScheduleById, createSchedule or updateSchedule. When present the write applies only if it still matches; otherwise 412.",
            "schema": {
              "type": "string",
              "maxLength": 255
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "additionalProperties": false,
                "description": "Payload for creating or updating a schedule. Contains only\nclient-settable fields; the owning `organizationId`, `createdBy`, the\nclaim, `pausedAt`, `pausedBy`, `lastRunAt`, `lastError` and the\ntimestamps are server-managed and refused as unknown fields. Pausing\nis a field, not an operation: `paused` pauses or resumes the\nschedule. `status` accepts only `pending`, `scheduled` and\n`cancelled` here (otherwise 400); the other values are set by the\nserver as the schedule is claimed and released.\n",
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
                  "targetType": {
                    "x-oapi-codegen-extra-tags": {
                      "json": "targetType,omitempty"
                    },
                    "type": "string",
                    "description": "Type of the resource the schedule acts on, named the way a claim's\n`resourceType` is (lowercase snake_case construct name, for example\n`content_item` or `profile`). A server verifies the target types it\nserves and refuses others with 400. Set together with `targetId` or\nnot at all.\n",
                    "pattern": "^[a-z][a-z0-9_]*$",
                    "minLength": 1,
                    "maxLength": 64
                  },
                  "targetId": {
                    "type": "string",
                    "format": "uuid",
                    "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    },
                    "x-go-name": "TargetID",
                    "x-oapi-codegen-extra-tags": {
                      "json": "targetId,omitempty"
                    }
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
                    "description": "Whether the schedule is eligible to run.",
                    "default": true
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
                  "nextRunAt": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Next time the schedule becomes due. Omitted on create, it defaults to `runAt`; omitted on update, it is kept. Send null for never due again.",
                    "nullable": true,
                    "x-go-type": "core.NullTime",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    }
                  },
                  "recurrence": {
                    "type": "string",
                    "description": "How the schedule repeats once it has run. Empty, `once` and `none`\nmean run once. `hourly` repeats every hour; `daily`, `weekly` and\n`monthly` repeat at the same wall-clock time one calendar day, week\nor month later in the schedule's `timezone`, so a daily schedule\nkeeps its local time across daylight-saving changes. `every:<n>`\nrepeats every `n` minutes (1 to 999999). Occurrences are counted\nfrom `runAt` (else from the current `nextRunAt`); the next due time\nis the first occurrence after the run is released, so missed runs\nare not replayed.\n",
                    "pattern": "^(|once|none|hourly|daily|weekly|monthly|every:[1-9][0-9]{0,5})$",
                    "maxLength": 255,
                    "default": ""
                  },
                  "timezone": {
                    "type": "string",
                    "description": "IANA time zone name (for example `UTC` or `America/Chicago`) in which\n`daily`, `weekly` and `monthly` recurrences keep their wall-clock\ntime. Instants (`runAt`, `nextRunAt`) are always absolute. The server\nrefuses a name it does not know with 400.\n",
                    "minLength": 1,
                    "maxLength": 64,
                    "pattern": "^[A-Za-z][A-Za-z0-9_+-]*(/[A-Za-z0-9_+-]+)*$",
                    "default": "UTC"
                  },
                  "status": {
                    "type": "string",
                    "description": "Lifecycle status of a schedule. `pending`: created, not yet\ndue-scheduled. `scheduled`: waiting for its due time. `assigned`:\ndesignated for a particular worker but not yet claimed. `claimed`: a\nworker holds the claim and has not started. `running`: the claim\nholder is executing it. `retrying`: the last attempt failed and\nanother is due. `completed`, `failed` and `cancelled` are terminal\nfor a run-once schedule; a recurring schedule returns to `scheduled`\nwhen its claim is released with a `completed` outcome.\n",
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
                  },
                  "retryCount": {
                    "type": "integer",
                    "description": "Retries used so far for the current run, for example 0 to re-arm a schedule. Omitted on update, it is kept.",
                    "minimum": 0
                  },
                  "maxRetries": {
                    "type": "integer",
                    "description": "Maximum retries before the run is marked failed.",
                    "minimum": 0,
                    "default": 0
                  },
                  "retryDelayMinutes": {
                    "type": "integer",
                    "description": "Minutes to wait before a retry becomes due.",
                    "minimum": 0,
                    "default": 0
                  },
                  "paused": {
                    "type": "boolean",
                    "description": "`true` pauses the schedule so it is never claimed; `false`\nresumes it. Omit to leave the pause unchanged. The server records\n`pausedAt` and `pausedBy`.\n"
                  },
                  "pauseReason": {
                    "type": "string",
                    "description": "Reason for pausing; stored only while `paused` is true and cleared on resume.",
                    "maxLength": 1000
                  },
                  "posture": {
                    "x-go-type": "*posturev1beta3.Posture",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/v1beta3/posture",
                      "name": "posturev1beta3"
                    },
                    "description": "Optional Posture this schedule runs under, resolved above\nthe profile x platform resolution and below an explicit per-run\nflag. Omit to inherit: the schedule then runs under whatever\nprofile x platform, configuration, environment, account or\ndefault resolves to, exactly as before.\n",
                    "x-oapi-codegen-extra-tags": {
                      "json": "posture,omitempty"
                    },
                    "$schema": "http://json-schema.org/draft-07/schema#",
                    "title": "Posture Schema",
                    "type": "string",
                    "enum": [
                      "cautious",
                      "standard",
                      "brisk"
                    ]
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Schedule updated",
            "headers": {
              "ETag": {
                "description": "Strong entity tag of the schedule. It changes whenever the schedule changes; send it back as `If-Match` to make updateSchedule conditional.",
                "schema": {
                  "type": "string"
                }
              }
            },
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Schedule Schema",
                  "description": "Server-returned schedule. A schedule is a job: an action to run, what it\nacts on (`targetType`, `targetId`) and its parameters, when it is due\n(`runAt`, `nextRunAt`, `recurrence` in `timezone`), its retry budget and\nits outcome. Schedules belong to an organization and may be linked to a\nworkspace. A worker takes a schedule through the generic `claim`\nconstruct (`POST /api/claims` with `resourceType` `schedule`); there is\nno schedule-specific claim route. While the claim is live no other worker\ncan take the schedule, and a claim past its `expiresAt` is stale so the\nschedule is claimable again. Releasing the claim records the run's\noutcome on the schedule in the same transaction (see `status`). The\n`claim` and the status values `assigned`, `claimed` and `running` are\nserver-managed. Pausing is data, not an operation: a client sets `paused`\n(and optionally `pauseReason`) on create or update, and the server\nrecords `pausedAt` and `pausedBy`. Fields marked readOnly are\nserver-managed and ignored on input.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "name",
                    "action",
                    "enabled",
                    "timezone",
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
                      "readOnly": true,
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
                      "readOnly": true,
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
                    "createdBy": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "readOnly": true,
                      "x-go-name": "CreatedBy",
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner"
                      },
                      "x-order": 4
                    },
                    "name": {
                      "type": "string",
                      "description": "Human-readable name for the schedule.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      },
                      "x-order": 5
                    },
                    "action": {
                      "type": "string",
                      "description": "The action the worker runs when it holds the schedule's claim, for example a command name.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "action"
                      },
                      "x-order": 6
                    },
                    "targetType": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "target_type",
                        "json": "targetType,omitempty"
                      },
                      "x-order": 7,
                      "type": "string",
                      "description": "Type of the resource the schedule acts on, named the way a claim's\n`resourceType` is (lowercase snake_case construct name, for example\n`content_item` or `profile`). A server verifies the target types it\nserves and refuses others with 400. Set together with `targetId` or\nnot at all.\n",
                      "pattern": "^[a-z][a-z0-9_]*$",
                      "minLength": 1,
                      "maxLength": 64
                    },
                    "targetId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-name": "TargetID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "target_id",
                        "json": "targetId,omitempty"
                      },
                      "x-order": 8
                    },
                    "params": {
                      "type": "object",
                      "description": "Action parameters, stored as a JSON blob. What the schedule acts on belongs in `targetType` and `targetId`, not here.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "params"
                      },
                      "x-order": 9
                    },
                    "enabled": {
                      "type": "boolean",
                      "description": "Whether the schedule is eligible to run. A disabled schedule is never claimed.",
                      "default": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "enabled"
                      },
                      "x-order": 10
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
                      "x-order": 11
                    },
                    "nextRunAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Next time the schedule becomes due. Null when it is never due again.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "next_run"
                      },
                      "x-order": 12
                    },
                    "recurrence": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "recurrence"
                      },
                      "x-order": 13,
                      "type": "string",
                      "description": "How the schedule repeats once it has run. Empty, `once` and `none`\nmean run once. `hourly` repeats every hour; `daily`, `weekly` and\n`monthly` repeat at the same wall-clock time one calendar day, week\nor month later in the schedule's `timezone`, so a daily schedule\nkeeps its local time across daylight-saving changes. `every:<n>`\nrepeats every `n` minutes (1 to 999999). Occurrences are counted\nfrom `runAt` (else from the current `nextRunAt`); the next due time\nis the first occurrence after the run is released, so missed runs\nare not replayed.\n",
                      "pattern": "^(|once|none|hourly|daily|weekly|monthly|every:[1-9][0-9]{0,5})$",
                      "maxLength": 255,
                      "default": ""
                    },
                    "timezone": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "timezone"
                      },
                      "x-order": 14,
                      "type": "string",
                      "description": "IANA time zone name (for example `UTC` or `America/Chicago`) in which\n`daily`, `weekly` and `monthly` recurrences keep their wall-clock\ntime. Instants (`runAt`, `nextRunAt`) are always absolute. The server\nrefuses a name it does not know with 400.\n",
                      "minLength": 1,
                      "maxLength": 64,
                      "pattern": "^[A-Za-z][A-Za-z0-9_+-]*(/[A-Za-z0-9_+-]+)*$",
                      "default": "UTC"
                    },
                    "status": {
                      "type": "string",
                      "description": "Lifecycle status of a schedule. `pending`: created, not yet\ndue-scheduled. `scheduled`: waiting for its due time. `assigned`:\ndesignated for a particular worker but not yet claimed. `claimed`: a\nworker holds the claim and has not started. `running`: the claim\nholder is executing it. `retrying`: the last attempt failed and\nanother is due. `completed`, `failed` and `cancelled` are terminal\nfor a run-once schedule; a recurring schedule returns to `scheduled`\nwhen its claim is released with a `completed` outcome.\n",
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
                      "x-order": 15
                    },
                    "retryCount": {
                      "type": "integer",
                      "description": "Attempts already retried for the current run.",
                      "minimum": 0,
                      "default": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "retry_count"
                      },
                      "x-order": 16
                    },
                    "maxRetries": {
                      "type": "integer",
                      "description": "Maximum retries before the run is marked failed.",
                      "minimum": 0,
                      "default": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "max_retries"
                      },
                      "x-order": 17
                    },
                    "retryDelayMinutes": {
                      "type": "integer",
                      "description": "Minutes to wait before a retry becomes due.",
                      "minimum": 0,
                      "default": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "retry_delay_minutes"
                      },
                      "x-order": 18
                    },
                    "lastRunAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the most recent attempt ended (the release time of its claim). Server-managed.",
                      "nullable": true,
                      "readOnly": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_run"
                      },
                      "x-order": 19
                    },
                    "lastError": {
                      "type": "string",
                      "description": "Error reported by the most recent attempt; empty after a successful one. Server-managed.",
                      "maxLength": 5000,
                      "readOnly": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_error"
                      },
                      "x-order": 20
                    },
                    "claim": {
                      "x-go-type": "*claimv1beta3.Claim",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta3/claim",
                        "name": "claimv1beta3"
                      },
                      "description": "The schedule's live claim, when one is held. A read-only view of the claim construct; omitted when the schedule is unclaimed.",
                      "readOnly": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "-",
                        "json": "claim,omitempty"
                      },
                      "x-order": 21,
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "title": "Claim Schema",
                      "type": "object",
                      "additionalProperties": false,
                      "required": [
                        "id",
                        "organizationId",
                        "resourceType",
                        "resourceId",
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
                          "description": "Type of the claimed resource, the construct name in snake_case, for example `content_item` or `schedule`.",
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
                        "claimantConnectionId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-go-name": "ClaimantConnectionID",
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimant_connection_id",
                            "json": "claimantConnectionId,omitempty"
                          },
                          "x-order": 5
                        },
                        "claimantUserId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-go-name": "ClaimantUserID",
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimant_user_id",
                            "json": "claimantUserId,omitempty"
                          },
                          "x-order": 6
                        },
                        "status": {
                          "type": "string",
                          "description": "Lifecycle of the claim. `active` while held, `released` once the holder (or a member allowed to release it) lets it go, `expired` once `expiresAt` passed without a renewal or the holding connection was deleted. Expiry is evaluated when the claim is read, so a claim never reads `active` past its `expiresAt`.\n",
                          "enum": [
                            "active",
                            "released",
                            "expired"
                          ],
                          "x-oapi-codegen-extra-tags": {
                            "db": "status"
                          },
                          "x-order": 7
                        },
                        "claimedAt": {
                          "description": "Time the claim was taken.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimed_at"
                          },
                          "x-order": 8,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "expiresAt": {
                          "description": "Time the claim lapses unless the holder renews it. Always set by the server; a claim past this time is stale.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "expires_at"
                          },
                          "x-order": 9,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "renewedAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Time of the last renewal. Null until the claim is first renewed.",
                          "nullable": true,
                          "x-go-type": "core.NullTime",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "renewed_at"
                          },
                          "x-order": 10
                        },
                        "releasedAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Time the claim was released. Null while the claim is active or after it expired.",
                          "nullable": true,
                          "x-go-type": "core.NullTime",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "released_at"
                          },
                          "x-order": 11
                        },
                        "outcome": {
                          "type": "string",
                          "description": "What the releaser reported when the claim was released: `completed` when the work behind it finished, `failed` when it was attempted and did not succeed, `cancelled` when it was let go without the work being done (including a release by another member). Omitted while the claim is active and on an expired claim.\n",
                          "enum": [
                            "completed",
                            "failed",
                            "cancelled"
                          ],
                          "x-oapi-codegen-extra-tags": {
                            "db": "outcome",
                            "json": "outcome,omitempty"
                          },
                          "x-order": 12
                        },
                        "outcomeError": {
                          "type": "string",
                          "description": "Error reported with a `failed` outcome. Omitted otherwise.",
                          "maxLength": 5000,
                          "x-oapi-codegen-extra-tags": {
                            "db": "outcome_error",
                            "json": "outcomeError,omitempty"
                          },
                          "x-order": 13
                        },
                        "outcomeEventId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-go-name": "OutcomeEventID",
                          "x-oapi-codegen-extra-tags": {
                            "db": "outcome_event_id",
                            "json": "outcomeEventId,omitempty"
                          },
                          "x-order": 14
                        },
                        "releasedBy": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-go-name": "ReleasedBy",
                          "x-oapi-codegen-extra-tags": {
                            "db": "released_by",
                            "json": "releasedBy,omitempty"
                          },
                          "x-order": 15
                        },
                        "createdAt": {
                          "description": "Timestamp of claim creation.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "created_at"
                          },
                          "x-order": 16,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "updatedAt": {
                          "description": "Timestamp of last claim modification.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "updated_at"
                          },
                          "x-order": 17,
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
                      "readOnly": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_at"
                      },
                      "x-order": 22
                    },
                    "pausedBy": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "readOnly": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_by",
                        "json": "pausedBy,omitempty"
                      },
                      "x-order": 23
                    },
                    "pauseReason": {
                      "type": "string",
                      "description": "Reason given for pausing the schedule, set with `paused` on create or update. Empty when not paused.",
                      "maxLength": 1000,
                      "x-oapi-codegen-extra-tags": {
                        "db": "pause_reason"
                      },
                      "x-order": 24
                    },
                    "createdAt": {
                      "description": "Timestamp of schedule creation.",
                      "readOnly": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 25,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last schedule modification.",
                      "readOnly": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 26,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the schedule was soft-deleted. Null while live.",
                      "nullable": true,
                      "readOnly": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at"
                      },
                      "x-order": 27
                    },
                    "posture": {
                      "x-go-type": "*posturev1beta3.Posture",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta3/posture",
                        "name": "posturev1beta3"
                      },
                      "description": "Optional Posture this schedule runs under, resolved above the\nprofile x platform resolution and below an explicit per-run flag.\nOmitted when the schedule has no override: it then runs under whatever\nprofile x platform, configuration, environment, account or default\nresolves to, exactly as before. Any value outside the Posture\nenum is refused with 400.\n",
                      "x-oapi-codegen-extra-tags": {
                        "db": "posture",
                        "json": "posture,omitempty"
                      },
                      "x-order": 28,
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "title": "Posture Schema",
                      "type": "string",
                      "enum": [
                        "cautious",
                        "standard",
                        "brisk"
                      ]
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
          "412": {
            "description": "Precondition failed - `If-Match` does not match the schedule's current entity tag, so nothing was written. Read the schedule again and reapply the change."
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
        "description": "Soft-deletes the schedule. A schedule with a live claim is deleted\nall the same, and that claim is expired in the same transaction.\n",
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
              "description": "Lifecycle status of a schedule. `pending`: created, not yet\ndue-scheduled. `scheduled`: waiting for its due time. `assigned`:\ndesignated for a particular worker but not yet claimed. `claimed`: a\nworker holds the claim and has not started. `running`: the claim\nholder is executing it. `retrying`: the last attempt failed and\nanother is due. `completed`, `failed` and `cancelled` are terminal\nfor a run-once schedule; a recurring schedule returns to `scheduled`\nwhen its claim is released with a `completed` outcome.\n",
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
                        "description": "Server-returned schedule. A schedule is a job: an action to run, what it\nacts on (`targetType`, `targetId`) and its parameters, when it is due\n(`runAt`, `nextRunAt`, `recurrence` in `timezone`), its retry budget and\nits outcome. Schedules belong to an organization and may be linked to a\nworkspace. A worker takes a schedule through the generic `claim`\nconstruct (`POST /api/claims` with `resourceType` `schedule`); there is\nno schedule-specific claim route. While the claim is live no other worker\ncan take the schedule, and a claim past its `expiresAt` is stale so the\nschedule is claimable again. Releasing the claim records the run's\noutcome on the schedule in the same transaction (see `status`). The\n`claim` and the status values `assigned`, `claimed` and `running` are\nserver-managed. Pausing is data, not an operation: a client sets `paused`\n(and optionally `pauseReason`) on create or update, and the server\nrecords `pausedAt` and `pausedBy`. Fields marked readOnly are\nserver-managed and ignored on input.\n",
                        "type": "object",
                        "additionalProperties": false,
                        "required": [
                          "id",
                          "organizationId",
                          "name",
                          "action",
                          "enabled",
                          "timezone",
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
                            "readOnly": true,
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
                            "readOnly": true,
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
                          "createdBy": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "readOnly": true,
                            "x-go-name": "CreatedBy",
                            "x-oapi-codegen-extra-tags": {
                              "db": "owner"
                            },
                            "x-order": 4
                          },
                          "name": {
                            "type": "string",
                            "description": "Human-readable name for the schedule.",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "name"
                            },
                            "x-order": 5
                          },
                          "action": {
                            "type": "string",
                            "description": "The action the worker runs when it holds the schedule's claim, for example a command name.",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "action"
                            },
                            "x-order": 6
                          },
                          "targetType": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "target_type",
                              "json": "targetType,omitempty"
                            },
                            "x-order": 7,
                            "type": "string",
                            "description": "Type of the resource the schedule acts on, named the way a claim's\n`resourceType` is (lowercase snake_case construct name, for example\n`content_item` or `profile`). A server verifies the target types it\nserves and refuses others with 400. Set together with `targetId` or\nnot at all.\n",
                            "pattern": "^[a-z][a-z0-9_]*$",
                            "minLength": 1,
                            "maxLength": 64
                          },
                          "targetId": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-go-name": "TargetID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "target_id",
                              "json": "targetId,omitempty"
                            },
                            "x-order": 8
                          },
                          "params": {
                            "type": "object",
                            "description": "Action parameters, stored as a JSON blob. What the schedule acts on belongs in `targetType` and `targetId`, not here.",
                            "x-go-type": "core.Map",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "params"
                            },
                            "x-order": 9
                          },
                          "enabled": {
                            "type": "boolean",
                            "description": "Whether the schedule is eligible to run. A disabled schedule is never claimed.",
                            "default": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "enabled"
                            },
                            "x-order": 10
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
                            "x-order": 11
                          },
                          "nextRunAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Next time the schedule becomes due. Null when it is never due again.",
                            "nullable": true,
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "next_run"
                            },
                            "x-order": 12
                          },
                          "recurrence": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "recurrence"
                            },
                            "x-order": 13,
                            "type": "string",
                            "description": "How the schedule repeats once it has run. Empty, `once` and `none`\nmean run once. `hourly` repeats every hour; `daily`, `weekly` and\n`monthly` repeat at the same wall-clock time one calendar day, week\nor month later in the schedule's `timezone`, so a daily schedule\nkeeps its local time across daylight-saving changes. `every:<n>`\nrepeats every `n` minutes (1 to 999999). Occurrences are counted\nfrom `runAt` (else from the current `nextRunAt`); the next due time\nis the first occurrence after the run is released, so missed runs\nare not replayed.\n",
                            "pattern": "^(|once|none|hourly|daily|weekly|monthly|every:[1-9][0-9]{0,5})$",
                            "maxLength": 255,
                            "default": ""
                          },
                          "timezone": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "timezone"
                            },
                            "x-order": 14,
                            "type": "string",
                            "description": "IANA time zone name (for example `UTC` or `America/Chicago`) in which\n`daily`, `weekly` and `monthly` recurrences keep their wall-clock\ntime. Instants (`runAt`, `nextRunAt`) are always absolute. The server\nrefuses a name it does not know with 400.\n",
                            "minLength": 1,
                            "maxLength": 64,
                            "pattern": "^[A-Za-z][A-Za-z0-9_+-]*(/[A-Za-z0-9_+-]+)*$",
                            "default": "UTC"
                          },
                          "status": {
                            "type": "string",
                            "description": "Lifecycle status of a schedule. `pending`: created, not yet\ndue-scheduled. `scheduled`: waiting for its due time. `assigned`:\ndesignated for a particular worker but not yet claimed. `claimed`: a\nworker holds the claim and has not started. `running`: the claim\nholder is executing it. `retrying`: the last attempt failed and\nanother is due. `completed`, `failed` and `cancelled` are terminal\nfor a run-once schedule; a recurring schedule returns to `scheduled`\nwhen its claim is released with a `completed` outcome.\n",
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
                            "x-order": 15
                          },
                          "retryCount": {
                            "type": "integer",
                            "description": "Attempts already retried for the current run.",
                            "minimum": 0,
                            "default": 0,
                            "x-oapi-codegen-extra-tags": {
                              "db": "retry_count"
                            },
                            "x-order": 16
                          },
                          "maxRetries": {
                            "type": "integer",
                            "description": "Maximum retries before the run is marked failed.",
                            "minimum": 0,
                            "default": 0,
                            "x-oapi-codegen-extra-tags": {
                              "db": "max_retries"
                            },
                            "x-order": 17
                          },
                          "retryDelayMinutes": {
                            "type": "integer",
                            "description": "Minutes to wait before a retry becomes due.",
                            "minimum": 0,
                            "default": 0,
                            "x-oapi-codegen-extra-tags": {
                              "db": "retry_delay_minutes"
                            },
                            "x-order": 18
                          },
                          "lastRunAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Time the most recent attempt ended (the release time of its claim). Server-managed.",
                            "nullable": true,
                            "readOnly": true,
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "last_run"
                            },
                            "x-order": 19
                          },
                          "lastError": {
                            "type": "string",
                            "description": "Error reported by the most recent attempt; empty after a successful one. Server-managed.",
                            "maxLength": 5000,
                            "readOnly": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "last_error"
                            },
                            "x-order": 20
                          },
                          "claim": {
                            "x-go-type": "*claimv1beta3.Claim",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/v1beta3/claim",
                              "name": "claimv1beta3"
                            },
                            "description": "The schedule's live claim, when one is held. A read-only view of the claim construct; omitted when the schedule is unclaimed.",
                            "readOnly": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "-",
                              "json": "claim,omitempty"
                            },
                            "x-order": 21,
                            "$schema": "http://json-schema.org/draft-07/schema#",
                            "title": "Claim Schema",
                            "type": "object",
                            "additionalProperties": false,
                            "required": [
                              "id",
                              "organizationId",
                              "resourceType",
                              "resourceId",
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
                                "description": "Type of the claimed resource, the construct name in snake_case, for example `content_item` or `schedule`.",
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
                              "claimantConnectionId": {
                                "type": "string",
                                "format": "uuid",
                                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                },
                                "x-go-name": "ClaimantConnectionID",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "claimant_connection_id",
                                  "json": "claimantConnectionId,omitempty"
                                },
                                "x-order": 5
                              },
                              "claimantUserId": {
                                "type": "string",
                                "format": "uuid",
                                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                },
                                "x-go-name": "ClaimantUserID",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "claimant_user_id",
                                  "json": "claimantUserId,omitempty"
                                },
                                "x-order": 6
                              },
                              "status": {
                                "type": "string",
                                "description": "Lifecycle of the claim. `active` while held, `released` once the holder (or a member allowed to release it) lets it go, `expired` once `expiresAt` passed without a renewal or the holding connection was deleted. Expiry is evaluated when the claim is read, so a claim never reads `active` past its `expiresAt`.\n",
                                "enum": [
                                  "active",
                                  "released",
                                  "expired"
                                ],
                                "x-oapi-codegen-extra-tags": {
                                  "db": "status"
                                },
                                "x-order": 7
                              },
                              "claimedAt": {
                                "description": "Time the claim was taken.",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "claimed_at"
                                },
                                "x-order": 8,
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "expiresAt": {
                                "description": "Time the claim lapses unless the holder renews it. Always set by the server; a claim past this time is stale.",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "expires_at"
                                },
                                "x-order": 9,
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "renewedAt": {
                                "type": "string",
                                "format": "date-time",
                                "description": "Time of the last renewal. Null until the claim is first renewed.",
                                "nullable": true,
                                "x-go-type": "core.NullTime",
                                "x-go-type-import": {
                                  "path": "github.com/meshery/schemas/models/core",
                                  "name": "core"
                                },
                                "x-oapi-codegen-extra-tags": {
                                  "db": "renewed_at"
                                },
                                "x-order": 10
                              },
                              "releasedAt": {
                                "type": "string",
                                "format": "date-time",
                                "description": "Time the claim was released. Null while the claim is active or after it expired.",
                                "nullable": true,
                                "x-go-type": "core.NullTime",
                                "x-go-type-import": {
                                  "path": "github.com/meshery/schemas/models/core",
                                  "name": "core"
                                },
                                "x-oapi-codegen-extra-tags": {
                                  "db": "released_at"
                                },
                                "x-order": 11
                              },
                              "outcome": {
                                "type": "string",
                                "description": "What the releaser reported when the claim was released: `completed` when the work behind it finished, `failed` when it was attempted and did not succeed, `cancelled` when it was let go without the work being done (including a release by another member). Omitted while the claim is active and on an expired claim.\n",
                                "enum": [
                                  "completed",
                                  "failed",
                                  "cancelled"
                                ],
                                "x-oapi-codegen-extra-tags": {
                                  "db": "outcome",
                                  "json": "outcome,omitempty"
                                },
                                "x-order": 12
                              },
                              "outcomeError": {
                                "type": "string",
                                "description": "Error reported with a `failed` outcome. Omitted otherwise.",
                                "maxLength": 5000,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "outcome_error",
                                  "json": "outcomeError,omitempty"
                                },
                                "x-order": 13
                              },
                              "outcomeEventId": {
                                "type": "string",
                                "format": "uuid",
                                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                },
                                "x-go-name": "OutcomeEventID",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "outcome_event_id",
                                  "json": "outcomeEventId,omitempty"
                                },
                                "x-order": 14
                              },
                              "releasedBy": {
                                "type": "string",
                                "format": "uuid",
                                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                },
                                "x-go-name": "ReleasedBy",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "released_by",
                                  "json": "releasedBy,omitempty"
                                },
                                "x-order": 15
                              },
                              "createdAt": {
                                "description": "Timestamp of claim creation.",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "created_at"
                                },
                                "x-order": 16,
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "updatedAt": {
                                "description": "Timestamp of last claim modification.",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "updated_at"
                                },
                                "x-order": 17,
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
                            "readOnly": true,
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "paused_at"
                            },
                            "x-order": 22
                          },
                          "pausedBy": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "readOnly": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "paused_by",
                              "json": "pausedBy,omitempty"
                            },
                            "x-order": 23
                          },
                          "pauseReason": {
                            "type": "string",
                            "description": "Reason given for pausing the schedule, set with `paused` on create or update. Empty when not paused.",
                            "maxLength": 1000,
                            "x-oapi-codegen-extra-tags": {
                              "db": "pause_reason"
                            },
                            "x-order": 24
                          },
                          "createdAt": {
                            "description": "Timestamp of schedule creation.",
                            "readOnly": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at"
                            },
                            "x-order": 25,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp of last schedule modification.",
                            "readOnly": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at"
                            },
                            "x-order": 26,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deletedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the schedule was soft-deleted. Null while live.",
                            "nullable": true,
                            "readOnly": true,
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at"
                            },
                            "x-order": 27
                          },
                          "posture": {
                            "x-go-type": "*posturev1beta3.Posture",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/v1beta3/posture",
                              "name": "posturev1beta3"
                            },
                            "description": "Optional Posture this schedule runs under, resolved above the\nprofile x platform resolution and below an explicit per-run flag.\nOmitted when the schedule has no override: it then runs under whatever\nprofile x platform, configuration, environment, account or default\nresolves to, exactly as before. Any value outside the Posture\nenum is refused with 400.\n",
                            "x-oapi-codegen-extra-tags": {
                              "db": "posture",
                              "json": "posture,omitempty"
                            },
                            "x-order": 28,
                            "$schema": "http://json-schema.org/draft-07/schema#",
                            "title": "Posture Schema",
                            "type": "string",
                            "enum": [
                              "cautious",
                              "standard",
                              "brisk"
                            ]
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
        "description": "Links the schedule to the workspace, replacing any previous\nworkspace link: a schedule belongs to at most one workspace. The\nworkspace must be in the schedule's organization.\n",
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
                  "description": "Server-returned schedule. A schedule is a job: an action to run, what it\nacts on (`targetType`, `targetId`) and its parameters, when it is due\n(`runAt`, `nextRunAt`, `recurrence` in `timezone`), its retry budget and\nits outcome. Schedules belong to an organization and may be linked to a\nworkspace. A worker takes a schedule through the generic `claim`\nconstruct (`POST /api/claims` with `resourceType` `schedule`); there is\nno schedule-specific claim route. While the claim is live no other worker\ncan take the schedule, and a claim past its `expiresAt` is stale so the\nschedule is claimable again. Releasing the claim records the run's\noutcome on the schedule in the same transaction (see `status`). The\n`claim` and the status values `assigned`, `claimed` and `running` are\nserver-managed. Pausing is data, not an operation: a client sets `paused`\n(and optionally `pauseReason`) on create or update, and the server\nrecords `pausedAt` and `pausedBy`. Fields marked readOnly are\nserver-managed and ignored on input.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "name",
                    "action",
                    "enabled",
                    "timezone",
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
                      "readOnly": true,
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
                      "readOnly": true,
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
                    "createdBy": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "readOnly": true,
                      "x-go-name": "CreatedBy",
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner"
                      },
                      "x-order": 4
                    },
                    "name": {
                      "type": "string",
                      "description": "Human-readable name for the schedule.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      },
                      "x-order": 5
                    },
                    "action": {
                      "type": "string",
                      "description": "The action the worker runs when it holds the schedule's claim, for example a command name.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "action"
                      },
                      "x-order": 6
                    },
                    "targetType": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "target_type",
                        "json": "targetType,omitempty"
                      },
                      "x-order": 7,
                      "type": "string",
                      "description": "Type of the resource the schedule acts on, named the way a claim's\n`resourceType` is (lowercase snake_case construct name, for example\n`content_item` or `profile`). A server verifies the target types it\nserves and refuses others with 400. Set together with `targetId` or\nnot at all.\n",
                      "pattern": "^[a-z][a-z0-9_]*$",
                      "minLength": 1,
                      "maxLength": 64
                    },
                    "targetId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-name": "TargetID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "target_id",
                        "json": "targetId,omitempty"
                      },
                      "x-order": 8
                    },
                    "params": {
                      "type": "object",
                      "description": "Action parameters, stored as a JSON blob. What the schedule acts on belongs in `targetType` and `targetId`, not here.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "params"
                      },
                      "x-order": 9
                    },
                    "enabled": {
                      "type": "boolean",
                      "description": "Whether the schedule is eligible to run. A disabled schedule is never claimed.",
                      "default": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "enabled"
                      },
                      "x-order": 10
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
                      "x-order": 11
                    },
                    "nextRunAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Next time the schedule becomes due. Null when it is never due again.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "next_run"
                      },
                      "x-order": 12
                    },
                    "recurrence": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "recurrence"
                      },
                      "x-order": 13,
                      "type": "string",
                      "description": "How the schedule repeats once it has run. Empty, `once` and `none`\nmean run once. `hourly` repeats every hour; `daily`, `weekly` and\n`monthly` repeat at the same wall-clock time one calendar day, week\nor month later in the schedule's `timezone`, so a daily schedule\nkeeps its local time across daylight-saving changes. `every:<n>`\nrepeats every `n` minutes (1 to 999999). Occurrences are counted\nfrom `runAt` (else from the current `nextRunAt`); the next due time\nis the first occurrence after the run is released, so missed runs\nare not replayed.\n",
                      "pattern": "^(|once|none|hourly|daily|weekly|monthly|every:[1-9][0-9]{0,5})$",
                      "maxLength": 255,
                      "default": ""
                    },
                    "timezone": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "timezone"
                      },
                      "x-order": 14,
                      "type": "string",
                      "description": "IANA time zone name (for example `UTC` or `America/Chicago`) in which\n`daily`, `weekly` and `monthly` recurrences keep their wall-clock\ntime. Instants (`runAt`, `nextRunAt`) are always absolute. The server\nrefuses a name it does not know with 400.\n",
                      "minLength": 1,
                      "maxLength": 64,
                      "pattern": "^[A-Za-z][A-Za-z0-9_+-]*(/[A-Za-z0-9_+-]+)*$",
                      "default": "UTC"
                    },
                    "status": {
                      "type": "string",
                      "description": "Lifecycle status of a schedule. `pending`: created, not yet\ndue-scheduled. `scheduled`: waiting for its due time. `assigned`:\ndesignated for a particular worker but not yet claimed. `claimed`: a\nworker holds the claim and has not started. `running`: the claim\nholder is executing it. `retrying`: the last attempt failed and\nanother is due. `completed`, `failed` and `cancelled` are terminal\nfor a run-once schedule; a recurring schedule returns to `scheduled`\nwhen its claim is released with a `completed` outcome.\n",
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
                      "x-order": 15
                    },
                    "retryCount": {
                      "type": "integer",
                      "description": "Attempts already retried for the current run.",
                      "minimum": 0,
                      "default": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "retry_count"
                      },
                      "x-order": 16
                    },
                    "maxRetries": {
                      "type": "integer",
                      "description": "Maximum retries before the run is marked failed.",
                      "minimum": 0,
                      "default": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "max_retries"
                      },
                      "x-order": 17
                    },
                    "retryDelayMinutes": {
                      "type": "integer",
                      "description": "Minutes to wait before a retry becomes due.",
                      "minimum": 0,
                      "default": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "retry_delay_minutes"
                      },
                      "x-order": 18
                    },
                    "lastRunAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the most recent attempt ended (the release time of its claim). Server-managed.",
                      "nullable": true,
                      "readOnly": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_run"
                      },
                      "x-order": 19
                    },
                    "lastError": {
                      "type": "string",
                      "description": "Error reported by the most recent attempt; empty after a successful one. Server-managed.",
                      "maxLength": 5000,
                      "readOnly": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_error"
                      },
                      "x-order": 20
                    },
                    "claim": {
                      "x-go-type": "*claimv1beta3.Claim",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta3/claim",
                        "name": "claimv1beta3"
                      },
                      "description": "The schedule's live claim, when one is held. A read-only view of the claim construct; omitted when the schedule is unclaimed.",
                      "readOnly": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "-",
                        "json": "claim,omitempty"
                      },
                      "x-order": 21,
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "title": "Claim Schema",
                      "type": "object",
                      "additionalProperties": false,
                      "required": [
                        "id",
                        "organizationId",
                        "resourceType",
                        "resourceId",
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
                          "description": "Type of the claimed resource, the construct name in snake_case, for example `content_item` or `schedule`.",
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
                        "claimantConnectionId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-go-name": "ClaimantConnectionID",
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimant_connection_id",
                            "json": "claimantConnectionId,omitempty"
                          },
                          "x-order": 5
                        },
                        "claimantUserId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-go-name": "ClaimantUserID",
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimant_user_id",
                            "json": "claimantUserId,omitempty"
                          },
                          "x-order": 6
                        },
                        "status": {
                          "type": "string",
                          "description": "Lifecycle of the claim. `active` while held, `released` once the holder (or a member allowed to release it) lets it go, `expired` once `expiresAt` passed without a renewal or the holding connection was deleted. Expiry is evaluated when the claim is read, so a claim never reads `active` past its `expiresAt`.\n",
                          "enum": [
                            "active",
                            "released",
                            "expired"
                          ],
                          "x-oapi-codegen-extra-tags": {
                            "db": "status"
                          },
                          "x-order": 7
                        },
                        "claimedAt": {
                          "description": "Time the claim was taken.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimed_at"
                          },
                          "x-order": 8,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "expiresAt": {
                          "description": "Time the claim lapses unless the holder renews it. Always set by the server; a claim past this time is stale.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "expires_at"
                          },
                          "x-order": 9,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "renewedAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Time of the last renewal. Null until the claim is first renewed.",
                          "nullable": true,
                          "x-go-type": "core.NullTime",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "renewed_at"
                          },
                          "x-order": 10
                        },
                        "releasedAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Time the claim was released. Null while the claim is active or after it expired.",
                          "nullable": true,
                          "x-go-type": "core.NullTime",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "released_at"
                          },
                          "x-order": 11
                        },
                        "outcome": {
                          "type": "string",
                          "description": "What the releaser reported when the claim was released: `completed` when the work behind it finished, `failed` when it was attempted and did not succeed, `cancelled` when it was let go without the work being done (including a release by another member). Omitted while the claim is active and on an expired claim.\n",
                          "enum": [
                            "completed",
                            "failed",
                            "cancelled"
                          ],
                          "x-oapi-codegen-extra-tags": {
                            "db": "outcome",
                            "json": "outcome,omitempty"
                          },
                          "x-order": 12
                        },
                        "outcomeError": {
                          "type": "string",
                          "description": "Error reported with a `failed` outcome. Omitted otherwise.",
                          "maxLength": 5000,
                          "x-oapi-codegen-extra-tags": {
                            "db": "outcome_error",
                            "json": "outcomeError,omitempty"
                          },
                          "x-order": 13
                        },
                        "outcomeEventId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-go-name": "OutcomeEventID",
                          "x-oapi-codegen-extra-tags": {
                            "db": "outcome_event_id",
                            "json": "outcomeEventId,omitempty"
                          },
                          "x-order": 14
                        },
                        "releasedBy": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-go-name": "ReleasedBy",
                          "x-oapi-codegen-extra-tags": {
                            "db": "released_by",
                            "json": "releasedBy,omitempty"
                          },
                          "x-order": 15
                        },
                        "createdAt": {
                          "description": "Timestamp of claim creation.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "created_at"
                          },
                          "x-order": 16,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "updatedAt": {
                          "description": "Timestamp of last claim modification.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "updated_at"
                          },
                          "x-order": 17,
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
                      "readOnly": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_at"
                      },
                      "x-order": 22
                    },
                    "pausedBy": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "readOnly": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_by",
                        "json": "pausedBy,omitempty"
                      },
                      "x-order": 23
                    },
                    "pauseReason": {
                      "type": "string",
                      "description": "Reason given for pausing the schedule, set with `paused` on create or update. Empty when not paused.",
                      "maxLength": 1000,
                      "x-oapi-codegen-extra-tags": {
                        "db": "pause_reason"
                      },
                      "x-order": 24
                    },
                    "createdAt": {
                      "description": "Timestamp of schedule creation.",
                      "readOnly": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 25,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last schedule modification.",
                      "readOnly": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 26,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the schedule was soft-deleted. Null while live.",
                      "nullable": true,
                      "readOnly": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at"
                      },
                      "x-order": 27
                    },
                    "posture": {
                      "x-go-type": "*posturev1beta3.Posture",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta3/posture",
                        "name": "posturev1beta3"
                      },
                      "description": "Optional Posture this schedule runs under, resolved above the\nprofile x platform resolution and below an explicit per-run flag.\nOmitted when the schedule has no override: it then runs under whatever\nprofile x platform, configuration, environment, account or default\nresolves to, exactly as before. Any value outside the Posture\nenum is refused with 400.\n",
                      "x-oapi-codegen-extra-tags": {
                        "db": "posture",
                        "json": "posture,omitempty"
                      },
                      "x-order": 28,
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "title": "Posture Schema",
                      "type": "string",
                      "enum": [
                        "cautious",
                        "standard",
                        "brisk"
                      ]
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
        "description": "Removes the schedule's link to the workspace. The schedule itself is\nkept. A schedule that is not linked to this workspace answers 404.\n",
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
          "204": {
            "description": "Schedule unlinked"
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
      }
    },
    "headers": {
      "ScheduleETag": {
        "description": "Strong entity tag of the schedule. It changes whenever the schedule changes; send it back as `If-Match` to make updateSchedule conditional.",
        "schema": {
          "type": "string"
        }
      }
    },
    "parameters": {
      "ifMatch": {
        "name": "If-Match",
        "in": "header",
        "required": false,
        "description": "Entity tag of the schedule as last read, from the `ETag` header of getScheduleById, createSchedule or updateSchedule. When present the write applies only if it still matches; otherwise 412.",
        "schema": {
          "type": "string",
          "maxLength": 255
        }
      },
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
          "description": "Lifecycle status of a schedule. `pending`: created, not yet\ndue-scheduled. `scheduled`: waiting for its due time. `assigned`:\ndesignated for a particular worker but not yet claimed. `claimed`: a\nworker holds the claim and has not started. `running`: the claim\nholder is executing it. `retrying`: the last attempt failed and\nanother is due. `completed`, `failed` and `cancelled` are terminal\nfor a run-once schedule; a recurring schedule returns to `scheduled`\nwhen its claim is released with a `completed` outcome.\n",
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
        "description": "Server-returned schedule. A schedule is a job: an action to run, what it\nacts on (`targetType`, `targetId`) and its parameters, when it is due\n(`runAt`, `nextRunAt`, `recurrence` in `timezone`), its retry budget and\nits outcome. Schedules belong to an organization and may be linked to a\nworkspace. A worker takes a schedule through the generic `claim`\nconstruct (`POST /api/claims` with `resourceType` `schedule`); there is\nno schedule-specific claim route. While the claim is live no other worker\ncan take the schedule, and a claim past its `expiresAt` is stale so the\nschedule is claimable again. Releasing the claim records the run's\noutcome on the schedule in the same transaction (see `status`). The\n`claim` and the status values `assigned`, `claimed` and `running` are\nserver-managed. Pausing is data, not an operation: a client sets `paused`\n(and optionally `pauseReason`) on create or update, and the server\nrecords `pausedAt` and `pausedBy`. Fields marked readOnly are\nserver-managed and ignored on input.\n",
        "type": "object",
        "additionalProperties": false,
        "required": [
          "id",
          "organizationId",
          "name",
          "action",
          "enabled",
          "timezone",
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
            "readOnly": true,
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
            "readOnly": true,
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
          "createdBy": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "readOnly": true,
            "x-go-name": "CreatedBy",
            "x-oapi-codegen-extra-tags": {
              "db": "owner"
            },
            "x-order": 4
          },
          "name": {
            "type": "string",
            "description": "Human-readable name for the schedule.",
            "minLength": 1,
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "name"
            },
            "x-order": 5
          },
          "action": {
            "type": "string",
            "description": "The action the worker runs when it holds the schedule's claim, for example a command name.",
            "minLength": 1,
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "action"
            },
            "x-order": 6
          },
          "targetType": {
            "x-oapi-codegen-extra-tags": {
              "db": "target_type",
              "json": "targetType,omitempty"
            },
            "x-order": 7,
            "type": "string",
            "description": "Type of the resource the schedule acts on, named the way a claim's\n`resourceType` is (lowercase snake_case construct name, for example\n`content_item` or `profile`). A server verifies the target types it\nserves and refuses others with 400. Set together with `targetId` or\nnot at all.\n",
            "pattern": "^[a-z][a-z0-9_]*$",
            "minLength": 1,
            "maxLength": 64
          },
          "targetId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-name": "TargetID",
            "x-oapi-codegen-extra-tags": {
              "db": "target_id",
              "json": "targetId,omitempty"
            },
            "x-order": 8
          },
          "params": {
            "type": "object",
            "description": "Action parameters, stored as a JSON blob. What the schedule acts on belongs in `targetType` and `targetId`, not here.",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "params"
            },
            "x-order": 9
          },
          "enabled": {
            "type": "boolean",
            "description": "Whether the schedule is eligible to run. A disabled schedule is never claimed.",
            "default": true,
            "x-oapi-codegen-extra-tags": {
              "db": "enabled"
            },
            "x-order": 10
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
            "x-order": 11
          },
          "nextRunAt": {
            "type": "string",
            "format": "date-time",
            "description": "Next time the schedule becomes due. Null when it is never due again.",
            "nullable": true,
            "x-go-type": "core.NullTime",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "next_run"
            },
            "x-order": 12
          },
          "recurrence": {
            "x-oapi-codegen-extra-tags": {
              "db": "recurrence"
            },
            "x-order": 13,
            "type": "string",
            "description": "How the schedule repeats once it has run. Empty, `once` and `none`\nmean run once. `hourly` repeats every hour; `daily`, `weekly` and\n`monthly` repeat at the same wall-clock time one calendar day, week\nor month later in the schedule's `timezone`, so a daily schedule\nkeeps its local time across daylight-saving changes. `every:<n>`\nrepeats every `n` minutes (1 to 999999). Occurrences are counted\nfrom `runAt` (else from the current `nextRunAt`); the next due time\nis the first occurrence after the run is released, so missed runs\nare not replayed.\n",
            "pattern": "^(|once|none|hourly|daily|weekly|monthly|every:[1-9][0-9]{0,5})$",
            "maxLength": 255,
            "default": ""
          },
          "timezone": {
            "x-oapi-codegen-extra-tags": {
              "db": "timezone"
            },
            "x-order": 14,
            "type": "string",
            "description": "IANA time zone name (for example `UTC` or `America/Chicago`) in which\n`daily`, `weekly` and `monthly` recurrences keep their wall-clock\ntime. Instants (`runAt`, `nextRunAt`) are always absolute. The server\nrefuses a name it does not know with 400.\n",
            "minLength": 1,
            "maxLength": 64,
            "pattern": "^[A-Za-z][A-Za-z0-9_+-]*(/[A-Za-z0-9_+-]+)*$",
            "default": "UTC"
          },
          "status": {
            "type": "string",
            "description": "Lifecycle status of a schedule. `pending`: created, not yet\ndue-scheduled. `scheduled`: waiting for its due time. `assigned`:\ndesignated for a particular worker but not yet claimed. `claimed`: a\nworker holds the claim and has not started. `running`: the claim\nholder is executing it. `retrying`: the last attempt failed and\nanother is due. `completed`, `failed` and `cancelled` are terminal\nfor a run-once schedule; a recurring schedule returns to `scheduled`\nwhen its claim is released with a `completed` outcome.\n",
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
            "x-order": 15
          },
          "retryCount": {
            "type": "integer",
            "description": "Attempts already retried for the current run.",
            "minimum": 0,
            "default": 0,
            "x-oapi-codegen-extra-tags": {
              "db": "retry_count"
            },
            "x-order": 16
          },
          "maxRetries": {
            "type": "integer",
            "description": "Maximum retries before the run is marked failed.",
            "minimum": 0,
            "default": 0,
            "x-oapi-codegen-extra-tags": {
              "db": "max_retries"
            },
            "x-order": 17
          },
          "retryDelayMinutes": {
            "type": "integer",
            "description": "Minutes to wait before a retry becomes due.",
            "minimum": 0,
            "default": 0,
            "x-oapi-codegen-extra-tags": {
              "db": "retry_delay_minutes"
            },
            "x-order": 18
          },
          "lastRunAt": {
            "type": "string",
            "format": "date-time",
            "description": "Time the most recent attempt ended (the release time of its claim). Server-managed.",
            "nullable": true,
            "readOnly": true,
            "x-go-type": "core.NullTime",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "last_run"
            },
            "x-order": 19
          },
          "lastError": {
            "type": "string",
            "description": "Error reported by the most recent attempt; empty after a successful one. Server-managed.",
            "maxLength": 5000,
            "readOnly": true,
            "x-oapi-codegen-extra-tags": {
              "db": "last_error"
            },
            "x-order": 20
          },
          "claim": {
            "x-go-type": "*claimv1beta3.Claim",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/v1beta3/claim",
              "name": "claimv1beta3"
            },
            "description": "The schedule's live claim, when one is held. A read-only view of the claim construct; omitted when the schedule is unclaimed.",
            "readOnly": true,
            "x-oapi-codegen-extra-tags": {
              "db": "-",
              "json": "claim,omitempty"
            },
            "x-order": 21,
            "$schema": "http://json-schema.org/draft-07/schema#",
            "title": "Claim Schema",
            "type": "object",
            "additionalProperties": false,
            "required": [
              "id",
              "organizationId",
              "resourceType",
              "resourceId",
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
                "description": "Type of the claimed resource, the construct name in snake_case, for example `content_item` or `schedule`.",
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
              "claimantConnectionId": {
                "type": "string",
                "format": "uuid",
                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                },
                "x-go-name": "ClaimantConnectionID",
                "x-oapi-codegen-extra-tags": {
                  "db": "claimant_connection_id",
                  "json": "claimantConnectionId,omitempty"
                },
                "x-order": 5
              },
              "claimantUserId": {
                "type": "string",
                "format": "uuid",
                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                },
                "x-go-name": "ClaimantUserID",
                "x-oapi-codegen-extra-tags": {
                  "db": "claimant_user_id",
                  "json": "claimantUserId,omitempty"
                },
                "x-order": 6
              },
              "status": {
                "type": "string",
                "description": "Lifecycle of the claim. `active` while held, `released` once the holder (or a member allowed to release it) lets it go, `expired` once `expiresAt` passed without a renewal or the holding connection was deleted. Expiry is evaluated when the claim is read, so a claim never reads `active` past its `expiresAt`.\n",
                "enum": [
                  "active",
                  "released",
                  "expired"
                ],
                "x-oapi-codegen-extra-tags": {
                  "db": "status"
                },
                "x-order": 7
              },
              "claimedAt": {
                "description": "Time the claim was taken.",
                "x-oapi-codegen-extra-tags": {
                  "db": "claimed_at"
                },
                "x-order": 8,
                "type": "string",
                "format": "date-time",
                "x-go-type-skip-optional-pointer": true
              },
              "expiresAt": {
                "description": "Time the claim lapses unless the holder renews it. Always set by the server; a claim past this time is stale.",
                "x-oapi-codegen-extra-tags": {
                  "db": "expires_at"
                },
                "x-order": 9,
                "type": "string",
                "format": "date-time",
                "x-go-type-skip-optional-pointer": true
              },
              "renewedAt": {
                "type": "string",
                "format": "date-time",
                "description": "Time of the last renewal. Null until the claim is first renewed.",
                "nullable": true,
                "x-go-type": "core.NullTime",
                "x-go-type-import": {
                  "path": "github.com/meshery/schemas/models/core",
                  "name": "core"
                },
                "x-oapi-codegen-extra-tags": {
                  "db": "renewed_at"
                },
                "x-order": 10
              },
              "releasedAt": {
                "type": "string",
                "format": "date-time",
                "description": "Time the claim was released. Null while the claim is active or after it expired.",
                "nullable": true,
                "x-go-type": "core.NullTime",
                "x-go-type-import": {
                  "path": "github.com/meshery/schemas/models/core",
                  "name": "core"
                },
                "x-oapi-codegen-extra-tags": {
                  "db": "released_at"
                },
                "x-order": 11
              },
              "outcome": {
                "type": "string",
                "description": "What the releaser reported when the claim was released: `completed` when the work behind it finished, `failed` when it was attempted and did not succeed, `cancelled` when it was let go without the work being done (including a release by another member). Omitted while the claim is active and on an expired claim.\n",
                "enum": [
                  "completed",
                  "failed",
                  "cancelled"
                ],
                "x-oapi-codegen-extra-tags": {
                  "db": "outcome",
                  "json": "outcome,omitempty"
                },
                "x-order": 12
              },
              "outcomeError": {
                "type": "string",
                "description": "Error reported with a `failed` outcome. Omitted otherwise.",
                "maxLength": 5000,
                "x-oapi-codegen-extra-tags": {
                  "db": "outcome_error",
                  "json": "outcomeError,omitempty"
                },
                "x-order": 13
              },
              "outcomeEventId": {
                "type": "string",
                "format": "uuid",
                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                },
                "x-go-name": "OutcomeEventID",
                "x-oapi-codegen-extra-tags": {
                  "db": "outcome_event_id",
                  "json": "outcomeEventId,omitempty"
                },
                "x-order": 14
              },
              "releasedBy": {
                "type": "string",
                "format": "uuid",
                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                },
                "x-go-name": "ReleasedBy",
                "x-oapi-codegen-extra-tags": {
                  "db": "released_by",
                  "json": "releasedBy,omitempty"
                },
                "x-order": 15
              },
              "createdAt": {
                "description": "Timestamp of claim creation.",
                "x-oapi-codegen-extra-tags": {
                  "db": "created_at"
                },
                "x-order": 16,
                "type": "string",
                "format": "date-time",
                "x-go-type-skip-optional-pointer": true
              },
              "updatedAt": {
                "description": "Timestamp of last claim modification.",
                "x-oapi-codegen-extra-tags": {
                  "db": "updated_at"
                },
                "x-order": 17,
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
            "readOnly": true,
            "x-go-type": "core.NullTime",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "paused_at"
            },
            "x-order": 22
          },
          "pausedBy": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "readOnly": true,
            "x-oapi-codegen-extra-tags": {
              "db": "paused_by",
              "json": "pausedBy,omitempty"
            },
            "x-order": 23
          },
          "pauseReason": {
            "type": "string",
            "description": "Reason given for pausing the schedule, set with `paused` on create or update. Empty when not paused.",
            "maxLength": 1000,
            "x-oapi-codegen-extra-tags": {
              "db": "pause_reason"
            },
            "x-order": 24
          },
          "createdAt": {
            "description": "Timestamp of schedule creation.",
            "readOnly": true,
            "x-oapi-codegen-extra-tags": {
              "db": "created_at"
            },
            "x-order": 25,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp of last schedule modification.",
            "readOnly": true,
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at"
            },
            "x-order": 26,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deletedAt": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the schedule was soft-deleted. Null while live.",
            "nullable": true,
            "readOnly": true,
            "x-go-type": "core.NullTime",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at"
            },
            "x-order": 27
          },
          "posture": {
            "x-go-type": "*posturev1beta3.Posture",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/v1beta3/posture",
              "name": "posturev1beta3"
            },
            "description": "Optional Posture this schedule runs under, resolved above the\nprofile x platform resolution and below an explicit per-run flag.\nOmitted when the schedule has no override: it then runs under whatever\nprofile x platform, configuration, environment, account or default\nresolves to, exactly as before. Any value outside the Posture\nenum is refused with 400.\n",
            "x-oapi-codegen-extra-tags": {
              "db": "posture",
              "json": "posture,omitempty"
            },
            "x-order": 28,
            "$schema": "http://json-schema.org/draft-07/schema#",
            "title": "Posture Schema",
            "type": "string",
            "enum": [
              "cautious",
              "standard",
              "brisk"
            ]
          }
        }
      },
      "ScheduleStatus": {
        "type": "string",
        "description": "Lifecycle status of a schedule. `pending`: created, not yet\ndue-scheduled. `scheduled`: waiting for its due time. `assigned`:\ndesignated for a particular worker but not yet claimed. `claimed`: a\nworker holds the claim and has not started. `running`: the claim\nholder is executing it. `retrying`: the last attempt failed and\nanother is due. `completed`, `failed` and `cancelled` are terminal\nfor a run-once schedule; a recurring schedule returns to `scheduled`\nwhen its claim is released with a `completed` outcome.\n",
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
      },
      "ScheduleRecurrence": {
        "type": "string",
        "description": "How the schedule repeats once it has run. Empty, `once` and `none`\nmean run once. `hourly` repeats every hour; `daily`, `weekly` and\n`monthly` repeat at the same wall-clock time one calendar day, week\nor month later in the schedule's `timezone`, so a daily schedule\nkeeps its local time across daylight-saving changes. `every:<n>`\nrepeats every `n` minutes (1 to 999999). Occurrences are counted\nfrom `runAt` (else from the current `nextRunAt`); the next due time\nis the first occurrence after the run is released, so missed runs\nare not replayed.\n",
        "pattern": "^(|once|none|hourly|daily|weekly|monthly|every:[1-9][0-9]{0,5})$",
        "maxLength": 255,
        "default": ""
      },
      "ScheduleTimezone": {
        "type": "string",
        "description": "IANA time zone name (for example `UTC` or `America/Chicago`) in which\n`daily`, `weekly` and `monthly` recurrences keep their wall-clock\ntime. Instants (`runAt`, `nextRunAt`) are always absolute. The server\nrefuses a name it does not know with 400.\n",
        "minLength": 1,
        "maxLength": 64,
        "pattern": "^[A-Za-z][A-Za-z0-9_+-]*(/[A-Za-z0-9_+-]+)*$",
        "default": "UTC"
      },
      "ScheduleTargetType": {
        "type": "string",
        "description": "Type of the resource the schedule acts on, named the way a claim's\n`resourceType` is (lowercase snake_case construct name, for example\n`content_item` or `profile`). A server verifies the target types it\nserves and refuses others with 400. Set together with `targetId` or\nnot at all.\n",
        "pattern": "^[a-z][a-z0-9_]*$",
        "minLength": 1,
        "maxLength": 64
      },
      "SchedulePayload": {
        "type": "object",
        "additionalProperties": false,
        "description": "Payload for creating or updating a schedule. Contains only\nclient-settable fields; the owning `organizationId`, `createdBy`, the\nclaim, `pausedAt`, `pausedBy`, `lastRunAt`, `lastError` and the\ntimestamps are server-managed and refused as unknown fields. Pausing\nis a field, not an operation: `paused` pauses or resumes the\nschedule. `status` accepts only `pending`, `scheduled` and\n`cancelled` here (otherwise 400); the other values are set by the\nserver as the schedule is claimed and released.\n",
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
          "targetType": {
            "x-oapi-codegen-extra-tags": {
              "json": "targetType,omitempty"
            },
            "type": "string",
            "description": "Type of the resource the schedule acts on, named the way a claim's\n`resourceType` is (lowercase snake_case construct name, for example\n`content_item` or `profile`). A server verifies the target types it\nserves and refuses others with 400. Set together with `targetId` or\nnot at all.\n",
            "pattern": "^[a-z][a-z0-9_]*$",
            "minLength": 1,
            "maxLength": 64
          },
          "targetId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-name": "TargetID",
            "x-oapi-codegen-extra-tags": {
              "json": "targetId,omitempty"
            }
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
            "description": "Whether the schedule is eligible to run.",
            "default": true
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
          "nextRunAt": {
            "type": "string",
            "format": "date-time",
            "description": "Next time the schedule becomes due. Omitted on create, it defaults to `runAt`; omitted on update, it is kept. Send null for never due again.",
            "nullable": true,
            "x-go-type": "core.NullTime",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            }
          },
          "recurrence": {
            "type": "string",
            "description": "How the schedule repeats once it has run. Empty, `once` and `none`\nmean run once. `hourly` repeats every hour; `daily`, `weekly` and\n`monthly` repeat at the same wall-clock time one calendar day, week\nor month later in the schedule's `timezone`, so a daily schedule\nkeeps its local time across daylight-saving changes. `every:<n>`\nrepeats every `n` minutes (1 to 999999). Occurrences are counted\nfrom `runAt` (else from the current `nextRunAt`); the next due time\nis the first occurrence after the run is released, so missed runs\nare not replayed.\n",
            "pattern": "^(|once|none|hourly|daily|weekly|monthly|every:[1-9][0-9]{0,5})$",
            "maxLength": 255,
            "default": ""
          },
          "timezone": {
            "type": "string",
            "description": "IANA time zone name (for example `UTC` or `America/Chicago`) in which\n`daily`, `weekly` and `monthly` recurrences keep their wall-clock\ntime. Instants (`runAt`, `nextRunAt`) are always absolute. The server\nrefuses a name it does not know with 400.\n",
            "minLength": 1,
            "maxLength": 64,
            "pattern": "^[A-Za-z][A-Za-z0-9_+-]*(/[A-Za-z0-9_+-]+)*$",
            "default": "UTC"
          },
          "status": {
            "type": "string",
            "description": "Lifecycle status of a schedule. `pending`: created, not yet\ndue-scheduled. `scheduled`: waiting for its due time. `assigned`:\ndesignated for a particular worker but not yet claimed. `claimed`: a\nworker holds the claim and has not started. `running`: the claim\nholder is executing it. `retrying`: the last attempt failed and\nanother is due. `completed`, `failed` and `cancelled` are terminal\nfor a run-once schedule; a recurring schedule returns to `scheduled`\nwhen its claim is released with a `completed` outcome.\n",
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
          },
          "retryCount": {
            "type": "integer",
            "description": "Retries used so far for the current run, for example 0 to re-arm a schedule. Omitted on update, it is kept.",
            "minimum": 0
          },
          "maxRetries": {
            "type": "integer",
            "description": "Maximum retries before the run is marked failed.",
            "minimum": 0,
            "default": 0
          },
          "retryDelayMinutes": {
            "type": "integer",
            "description": "Minutes to wait before a retry becomes due.",
            "minimum": 0,
            "default": 0
          },
          "paused": {
            "type": "boolean",
            "description": "`true` pauses the schedule so it is never claimed; `false`\nresumes it. Omit to leave the pause unchanged. The server records\n`pausedAt` and `pausedBy`.\n"
          },
          "pauseReason": {
            "type": "string",
            "description": "Reason for pausing; stored only while `paused` is true and cleared on resume.",
            "maxLength": 1000
          },
          "posture": {
            "x-go-type": "*posturev1beta3.Posture",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/v1beta3/posture",
              "name": "posturev1beta3"
            },
            "description": "Optional Posture this schedule runs under, resolved above\nthe profile x platform resolution and below an explicit per-run\nflag. Omit to inherit: the schedule then runs under whatever\nprofile x platform, configuration, environment, account or\ndefault resolves to, exactly as before.\n",
            "x-oapi-codegen-extra-tags": {
              "json": "posture,omitempty"
            },
            "$schema": "http://json-schema.org/draft-07/schema#",
            "title": "Posture Schema",
            "type": "string",
            "enum": [
              "cautious",
              "standard",
              "brisk"
            ]
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
              "description": "Server-returned schedule. A schedule is a job: an action to run, what it\nacts on (`targetType`, `targetId`) and its parameters, when it is due\n(`runAt`, `nextRunAt`, `recurrence` in `timezone`), its retry budget and\nits outcome. Schedules belong to an organization and may be linked to a\nworkspace. A worker takes a schedule through the generic `claim`\nconstruct (`POST /api/claims` with `resourceType` `schedule`); there is\nno schedule-specific claim route. While the claim is live no other worker\ncan take the schedule, and a claim past its `expiresAt` is stale so the\nschedule is claimable again. Releasing the claim records the run's\noutcome on the schedule in the same transaction (see `status`). The\n`claim` and the status values `assigned`, `claimed` and `running` are\nserver-managed. Pausing is data, not an operation: a client sets `paused`\n(and optionally `pauseReason`) on create or update, and the server\nrecords `pausedAt` and `pausedBy`. Fields marked readOnly are\nserver-managed and ignored on input.\n",
              "type": "object",
              "additionalProperties": false,
              "required": [
                "id",
                "organizationId",
                "name",
                "action",
                "enabled",
                "timezone",
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
                  "readOnly": true,
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
                  "readOnly": true,
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
                "createdBy": {
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "readOnly": true,
                  "x-go-name": "CreatedBy",
                  "x-oapi-codegen-extra-tags": {
                    "db": "owner"
                  },
                  "x-order": 4
                },
                "name": {
                  "type": "string",
                  "description": "Human-readable name for the schedule.",
                  "minLength": 1,
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "name"
                  },
                  "x-order": 5
                },
                "action": {
                  "type": "string",
                  "description": "The action the worker runs when it holds the schedule's claim, for example a command name.",
                  "minLength": 1,
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "action"
                  },
                  "x-order": 6
                },
                "targetType": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "target_type",
                    "json": "targetType,omitempty"
                  },
                  "x-order": 7,
                  "type": "string",
                  "description": "Type of the resource the schedule acts on, named the way a claim's\n`resourceType` is (lowercase snake_case construct name, for example\n`content_item` or `profile`). A server verifies the target types it\nserves and refuses others with 400. Set together with `targetId` or\nnot at all.\n",
                  "pattern": "^[a-z][a-z0-9_]*$",
                  "minLength": 1,
                  "maxLength": 64
                },
                "targetId": {
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-go-name": "TargetID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "target_id",
                    "json": "targetId,omitempty"
                  },
                  "x-order": 8
                },
                "params": {
                  "type": "object",
                  "description": "Action parameters, stored as a JSON blob. What the schedule acts on belongs in `targetType` and `targetId`, not here.",
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "params"
                  },
                  "x-order": 9
                },
                "enabled": {
                  "type": "boolean",
                  "description": "Whether the schedule is eligible to run. A disabled schedule is never claimed.",
                  "default": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "enabled"
                  },
                  "x-order": 10
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
                  "x-order": 11
                },
                "nextRunAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Next time the schedule becomes due. Null when it is never due again.",
                  "nullable": true,
                  "x-go-type": "core.NullTime",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "next_run"
                  },
                  "x-order": 12
                },
                "recurrence": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "recurrence"
                  },
                  "x-order": 13,
                  "type": "string",
                  "description": "How the schedule repeats once it has run. Empty, `once` and `none`\nmean run once. `hourly` repeats every hour; `daily`, `weekly` and\n`monthly` repeat at the same wall-clock time one calendar day, week\nor month later in the schedule's `timezone`, so a daily schedule\nkeeps its local time across daylight-saving changes. `every:<n>`\nrepeats every `n` minutes (1 to 999999). Occurrences are counted\nfrom `runAt` (else from the current `nextRunAt`); the next due time\nis the first occurrence after the run is released, so missed runs\nare not replayed.\n",
                  "pattern": "^(|once|none|hourly|daily|weekly|monthly|every:[1-9][0-9]{0,5})$",
                  "maxLength": 255,
                  "default": ""
                },
                "timezone": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "timezone"
                  },
                  "x-order": 14,
                  "type": "string",
                  "description": "IANA time zone name (for example `UTC` or `America/Chicago`) in which\n`daily`, `weekly` and `monthly` recurrences keep their wall-clock\ntime. Instants (`runAt`, `nextRunAt`) are always absolute. The server\nrefuses a name it does not know with 400.\n",
                  "minLength": 1,
                  "maxLength": 64,
                  "pattern": "^[A-Za-z][A-Za-z0-9_+-]*(/[A-Za-z0-9_+-]+)*$",
                  "default": "UTC"
                },
                "status": {
                  "type": "string",
                  "description": "Lifecycle status of a schedule. `pending`: created, not yet\ndue-scheduled. `scheduled`: waiting for its due time. `assigned`:\ndesignated for a particular worker but not yet claimed. `claimed`: a\nworker holds the claim and has not started. `running`: the claim\nholder is executing it. `retrying`: the last attempt failed and\nanother is due. `completed`, `failed` and `cancelled` are terminal\nfor a run-once schedule; a recurring schedule returns to `scheduled`\nwhen its claim is released with a `completed` outcome.\n",
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
                  "x-order": 15
                },
                "retryCount": {
                  "type": "integer",
                  "description": "Attempts already retried for the current run.",
                  "minimum": 0,
                  "default": 0,
                  "x-oapi-codegen-extra-tags": {
                    "db": "retry_count"
                  },
                  "x-order": 16
                },
                "maxRetries": {
                  "type": "integer",
                  "description": "Maximum retries before the run is marked failed.",
                  "minimum": 0,
                  "default": 0,
                  "x-oapi-codegen-extra-tags": {
                    "db": "max_retries"
                  },
                  "x-order": 17
                },
                "retryDelayMinutes": {
                  "type": "integer",
                  "description": "Minutes to wait before a retry becomes due.",
                  "minimum": 0,
                  "default": 0,
                  "x-oapi-codegen-extra-tags": {
                    "db": "retry_delay_minutes"
                  },
                  "x-order": 18
                },
                "lastRunAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Time the most recent attempt ended (the release time of its claim). Server-managed.",
                  "nullable": true,
                  "readOnly": true,
                  "x-go-type": "core.NullTime",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "last_run"
                  },
                  "x-order": 19
                },
                "lastError": {
                  "type": "string",
                  "description": "Error reported by the most recent attempt; empty after a successful one. Server-managed.",
                  "maxLength": 5000,
                  "readOnly": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "last_error"
                  },
                  "x-order": 20
                },
                "claim": {
                  "x-go-type": "*claimv1beta3.Claim",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/v1beta3/claim",
                    "name": "claimv1beta3"
                  },
                  "description": "The schedule's live claim, when one is held. A read-only view of the claim construct; omitted when the schedule is unclaimed.",
                  "readOnly": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "-",
                    "json": "claim,omitempty"
                  },
                  "x-order": 21,
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Claim Schema",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "resourceType",
                    "resourceId",
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
                      "description": "Type of the claimed resource, the construct name in snake_case, for example `content_item` or `schedule`.",
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
                    "claimantConnectionId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-name": "ClaimantConnectionID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "claimant_connection_id",
                        "json": "claimantConnectionId,omitempty"
                      },
                      "x-order": 5
                    },
                    "claimantUserId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-name": "ClaimantUserID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "claimant_user_id",
                        "json": "claimantUserId,omitempty"
                      },
                      "x-order": 6
                    },
                    "status": {
                      "type": "string",
                      "description": "Lifecycle of the claim. `active` while held, `released` once the holder (or a member allowed to release it) lets it go, `expired` once `expiresAt` passed without a renewal or the holding connection was deleted. Expiry is evaluated when the claim is read, so a claim never reads `active` past its `expiresAt`.\n",
                      "enum": [
                        "active",
                        "released",
                        "expired"
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      },
                      "x-order": 7
                    },
                    "claimedAt": {
                      "description": "Time the claim was taken.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "claimed_at"
                      },
                      "x-order": 8,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "expiresAt": {
                      "description": "Time the claim lapses unless the holder renews it. Always set by the server; a claim past this time is stale.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "expires_at"
                      },
                      "x-order": 9,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "renewedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time of the last renewal. Null until the claim is first renewed.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "renewed_at"
                      },
                      "x-order": 10
                    },
                    "releasedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the claim was released. Null while the claim is active or after it expired.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "released_at"
                      },
                      "x-order": 11
                    },
                    "outcome": {
                      "type": "string",
                      "description": "What the releaser reported when the claim was released: `completed` when the work behind it finished, `failed` when it was attempted and did not succeed, `cancelled` when it was let go without the work being done (including a release by another member). Omitted while the claim is active and on an expired claim.\n",
                      "enum": [
                        "completed",
                        "failed",
                        "cancelled"
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "db": "outcome",
                        "json": "outcome,omitempty"
                      },
                      "x-order": 12
                    },
                    "outcomeError": {
                      "type": "string",
                      "description": "Error reported with a `failed` outcome. Omitted otherwise.",
                      "maxLength": 5000,
                      "x-oapi-codegen-extra-tags": {
                        "db": "outcome_error",
                        "json": "outcomeError,omitempty"
                      },
                      "x-order": 13
                    },
                    "outcomeEventId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-name": "OutcomeEventID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "outcome_event_id",
                        "json": "outcomeEventId,omitempty"
                      },
                      "x-order": 14
                    },
                    "releasedBy": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-name": "ReleasedBy",
                      "x-oapi-codegen-extra-tags": {
                        "db": "released_by",
                        "json": "releasedBy,omitempty"
                      },
                      "x-order": 15
                    },
                    "createdAt": {
                      "description": "Timestamp of claim creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 16,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last claim modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 17,
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
                  "readOnly": true,
                  "x-go-type": "core.NullTime",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "paused_at"
                  },
                  "x-order": 22
                },
                "pausedBy": {
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "readOnly": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "paused_by",
                    "json": "pausedBy,omitempty"
                  },
                  "x-order": 23
                },
                "pauseReason": {
                  "type": "string",
                  "description": "Reason given for pausing the schedule, set with `paused` on create or update. Empty when not paused.",
                  "maxLength": 1000,
                  "x-oapi-codegen-extra-tags": {
                    "db": "pause_reason"
                  },
                  "x-order": 24
                },
                "createdAt": {
                  "description": "Timestamp of schedule creation.",
                  "readOnly": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at"
                  },
                  "x-order": 25,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updatedAt": {
                  "description": "Timestamp of last schedule modification.",
                  "readOnly": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at"
                  },
                  "x-order": 26,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "deletedAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Timestamp when the schedule was soft-deleted. Null while live.",
                  "nullable": true,
                  "readOnly": true,
                  "x-go-type": "core.NullTime",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "deleted_at"
                  },
                  "x-order": 27
                },
                "posture": {
                  "x-go-type": "*posturev1beta3.Posture",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/v1beta3/posture",
                    "name": "posturev1beta3"
                  },
                  "description": "Optional Posture this schedule runs under, resolved above the\nprofile x platform resolution and below an explicit per-run flag.\nOmitted when the schedule has no override: it then runs under whatever\nprofile x platform, configuration, environment, account or default\nresolves to, exactly as before. Any value outside the Posture\nenum is refused with 400.\n",
                  "x-oapi-codegen-extra-tags": {
                    "db": "posture",
                    "json": "posture,omitempty"
                  },
                  "x-order": 28,
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Posture Schema",
                  "type": "string",
                  "enum": [
                    "cautious",
                    "standard",
                    "brisk"
                  ]
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
