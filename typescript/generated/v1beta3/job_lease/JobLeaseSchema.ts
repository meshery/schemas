/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const JobLeaseSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "JobLease",
    "description": "OpenAPI schema for shared job leases - time-bound claims on due jobs\nwith pause scopes, used by Layer5 Cloud and Blowhorn alike. Competing\nconsumers claim due, unheld, unpaused rows; a dead holder's row returns\nto the pool when its lease lapses. The claim race is decided server-side\nin a single statement: losing racers receive null, never an error.\nMachine-local pause stays on the machine and is never sent; the\norganization-wide pause and per-row pause live here.\n",
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
      "name": "jobLeases",
      "description": "Operations related to shared job leases."
    }
  ],
  "paths": {
    "/api/job-leases": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "jobLeases"
        ],
        "summary": "List job leases",
        "operationId": "listJobLeases",
        "description": "Returns a paginated list of job leases in the organization of the\nauthenticated session, optionally filtered by status. Each entry projects the computed\n`locked`, `lockedBy`, `lockedAt` and `lockStale` keys.\n",
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
            "name": "status",
            "in": "query",
            "required": false,
            "description": "Filter by job status (pending, leased, succeeded, failed).",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Job leases page",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated collection of job leases.",
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
                    "jobLeases": {
                      "type": "array",
                      "items": {
                        "x-go-type": "JobLease",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "title": "Job Lease Schema",
                        "description": "Server-returned job lease as persisted by meshery-cloud. A job lease is a\ndue-work row plus time-bound claim state, shared by Layer5 Cloud and\nBlowhorn: competing consumers claim, renew and release leases on due jobs,\nand pause scopes gate which rows are claimable. The claim race is decided\nserver-side in a single statement; losing racers receive null, never an\nerror. Claim columns (`claimedBy`, `claimedAt`, `leaseExpiresAt`) and pause\ncolumns (`pausedAt`, `pausedBy`, `pauseReason`) are server-managed and are\nrefused on CRUD paths; they change only through the claim, renew, release,\npause and resume operations. `locked`, `lockedBy`, `lockedAt` and\n`lockStale` are computed projections for schedule screens, not stored\ncolumns.\n",
                        "type": "object",
                        "additionalProperties": false,
                        "required": [
                          "id",
                          "organizationId",
                          "rowNumber",
                          "command",
                          "status",
                          "fingerprint",
                          "createdAt",
                          "updatedAt"
                        ],
                        "properties": {
                          "id": {
                            "description": "Server-generated job lease ID.",
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
                          "rowNumber": {
                            "type": "integer",
                            "description": "Targetable row number within the organization's job set. Used for per-row claims and trigger-now overrides.",
                            "minimum": 0,
                            "x-oapi-codegen-extra-tags": {
                              "db": "row_number"
                            },
                            "x-order": 3
                          },
                          "command": {
                            "type": "string",
                            "description": "Job command to execute when the lease is held.",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "command"
                            },
                            "x-order": 4
                          },
                          "profile": {
                            "type": "string",
                            "description": "Profile reference the job runs against.",
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "profile"
                            },
                            "x-order": 5
                          },
                          "platform": {
                            "type": "string",
                            "description": "Target platform for the job (e.g. linkedin).",
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "platform"
                            },
                            "x-order": 6
                          },
                          "params": {
                            "type": "object",
                            "description": "Arbitrary job parameters, stored as a JSON blob.",
                            "x-go-type": "core.Map",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "params"
                            },
                            "x-order": 7
                          },
                          "runAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Time the job becomes due.",
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
                            "description": "Next scheduled time for recurring jobs.",
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
                            "description": "Recurrence rule (cron expression) for repeating jobs. Absent for one-shot jobs.",
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "recurrence"
                            },
                            "x-order": 10
                          },
                          "retryBudget": {
                            "type": "integer",
                            "description": "Remaining execution attempts for the job.",
                            "minimum": 0,
                            "x-oapi-codegen-extra-tags": {
                              "db": "retry_budget"
                            },
                            "x-order": 11
                          },
                          "status": {
                            "type": "string",
                            "description": "Lifecycle status of the job. Managed server-side through the claim, renew, release, pause and resume operations.",
                            "enum": [
                              "pending",
                              "leased",
                              "succeeded",
                              "failed"
                            ],
                            "x-oapi-codegen-extra-tags": {
                              "db": "status"
                            },
                            "x-order": 12
                          },
                          "driverMode": {
                            "type": "string",
                            "description": "Execution driver mode for the job.",
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "driver_mode"
                            },
                            "x-order": 13
                          },
                          "lastRunAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Time of the most recent execution attempt.",
                            "nullable": true,
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "last_run_at"
                            },
                            "x-order": 14
                          },
                          "lastError": {
                            "type": "string",
                            "description": "Error reported by the most recent execution attempt.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "last_error"
                            },
                            "x-order": 15
                          },
                          "claimedBy": {
                            "type": "string",
                            "description": "Machine holding the lease. Server-managed; set only by claim, refused on every other path.",
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "claimed_by"
                            },
                            "x-order": 16
                          },
                          "claimedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Time the lease was claimed. Server-managed.",
                            "nullable": true,
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "claimed_at"
                            },
                            "x-order": 17
                          },
                          "leaseExpiresAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Time the lease lapses when unrenewed. A holder with a null or expired lease is stale and the row returns to the pool. Server-managed; moved only by renew for the holder.",
                            "nullable": true,
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "lease_expires_at"
                            },
                            "x-order": 18
                          },
                          "pausedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Time the row was paused. Server-managed; set only by pause, cleared by resume.",
                            "nullable": true,
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "paused_at"
                            },
                            "x-order": 19
                          },
                          "pausedBy": {
                            "type": "string",
                            "description": "Identity that paused the row. Server-managed.",
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "paused_by"
                            },
                            "x-order": 20
                          },
                          "pauseReason": {
                            "type": "string",
                            "description": "Operator reason for pausing the row. Server-managed.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "pause_reason"
                            },
                            "x-order": 21
                          },
                          "fingerprint": {
                            "type": "string",
                            "description": "Hex digest over the canonical job values, typed so null, empty string, zero and false differ. Server-computed; used for conditional updates.",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "fingerprint"
                            },
                            "x-order": 22
                          },
                          "locked": {
                            "type": "boolean",
                            "description": "Computed projection. True while a live lease is held on the row.",
                            "x-order": 23
                          },
                          "lockedBy": {
                            "type": "string",
                            "description": "Computed projection of the current lease holder.",
                            "maxLength": 255,
                            "x-order": 24
                          },
                          "lockedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Computed projection of the current claim time.",
                            "nullable": true,
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-order": 25
                          },
                          "lockStale": {
                            "type": "boolean",
                            "description": "Computed projection. True when the row carries a holder whose lease is null or expired, marking the row reclaimable.",
                            "x-order": 26
                          },
                          "createdAt": {
                            "description": "Timestamp of job lease creation.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at"
                            },
                            "x-order": 27,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp of last job lease modification.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at"
                            },
                            "x-order": 28,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deletedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the job lease was soft-deleted.",
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
                            "x-order": 29
                          }
                        }
                      },
                      "description": "Job leases included on this page of results."
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
          "jobLeases"
        ],
        "summary": "Create job lease",
        "operationId": "createJobLease",
        "description": "Creates a new job lease definition. Claim columns and pause columns\nare server-managed and refused here; any supplied values are\nignored. The `expectedFingerprint` precondition is ignored on\ncreate.\n",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for creating or updating a job lease. Contains only\nclient-settable job definition fields; the claim columns, the\npause columns, the server-computed `fingerprint` and the\nserver-generated timestamps are intentionally excluded.\n",
                "required": [
                  "rowNumber",
                  "command"
                ],
                "properties": {
                  "id": {
                    "description": "Existing job lease ID for updates; omit on create.",
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
                  "rowNumber": {
                    "type": "integer",
                    "description": "Targetable row number within the organization's job set.",
                    "minimum": 0
                  },
                  "command": {
                    "type": "string",
                    "description": "Job command to execute when the lease is held.",
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "profile": {
                    "type": "string",
                    "description": "Profile reference the job runs against.",
                    "maxLength": 255
                  },
                  "platform": {
                    "type": "string",
                    "description": "Target platform for the job (e.g. linkedin).",
                    "maxLength": 255
                  },
                  "params": {
                    "type": "object",
                    "description": "Arbitrary job parameters, stored as a JSON blob.",
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    },
                    "x-go-type-skip-optional-pointer": true
                  },
                  "runAt": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Time the job becomes due."
                  },
                  "nextRunAt": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Next scheduled time for recurring jobs."
                  },
                  "recurrence": {
                    "type": "string",
                    "description": "Recurrence rule (cron expression) for repeating jobs. Absent for one-shot jobs.",
                    "maxLength": 255
                  },
                  "retryBudget": {
                    "type": "integer",
                    "description": "Remaining execution attempts for the job.",
                    "minimum": 0
                  },
                  "driverMode": {
                    "type": "string",
                    "description": "Execution driver mode for the job.",
                    "maxLength": 255
                  },
                  "expectedFingerprint": {
                    "type": "string",
                    "description": "Optimistic-concurrency precondition for update: when supplied,\nthe update applies only when the stored fingerprint still\nmatches, and is refused with a 409 otherwise. Ignored on\ncreate.\n",
                    "maxLength": 255
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Job lease created",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Job Lease Schema",
                  "description": "Server-returned job lease as persisted by meshery-cloud. A job lease is a\ndue-work row plus time-bound claim state, shared by Layer5 Cloud and\nBlowhorn: competing consumers claim, renew and release leases on due jobs,\nand pause scopes gate which rows are claimable. The claim race is decided\nserver-side in a single statement; losing racers receive null, never an\nerror. Claim columns (`claimedBy`, `claimedAt`, `leaseExpiresAt`) and pause\ncolumns (`pausedAt`, `pausedBy`, `pauseReason`) are server-managed and are\nrefused on CRUD paths; they change only through the claim, renew, release,\npause and resume operations. `locked`, `lockedBy`, `lockedAt` and\n`lockStale` are computed projections for schedule screens, not stored\ncolumns.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "rowNumber",
                    "command",
                    "status",
                    "fingerprint",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Server-generated job lease ID.",
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
                    "rowNumber": {
                      "type": "integer",
                      "description": "Targetable row number within the organization's job set. Used for per-row claims and trigger-now overrides.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "row_number"
                      },
                      "x-order": 3
                    },
                    "command": {
                      "type": "string",
                      "description": "Job command to execute when the lease is held.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "command"
                      },
                      "x-order": 4
                    },
                    "profile": {
                      "type": "string",
                      "description": "Profile reference the job runs against.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "profile"
                      },
                      "x-order": 5
                    },
                    "platform": {
                      "type": "string",
                      "description": "Target platform for the job (e.g. linkedin).",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "platform"
                      },
                      "x-order": 6
                    },
                    "params": {
                      "type": "object",
                      "description": "Arbitrary job parameters, stored as a JSON blob.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "params"
                      },
                      "x-order": 7
                    },
                    "runAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the job becomes due.",
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
                      "description": "Next scheduled time for recurring jobs.",
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
                      "description": "Recurrence rule (cron expression) for repeating jobs. Absent for one-shot jobs.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "recurrence"
                      },
                      "x-order": 10
                    },
                    "retryBudget": {
                      "type": "integer",
                      "description": "Remaining execution attempts for the job.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "retry_budget"
                      },
                      "x-order": 11
                    },
                    "status": {
                      "type": "string",
                      "description": "Lifecycle status of the job. Managed server-side through the claim, renew, release, pause and resume operations.",
                      "enum": [
                        "pending",
                        "leased",
                        "succeeded",
                        "failed"
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      },
                      "x-order": 12
                    },
                    "driverMode": {
                      "type": "string",
                      "description": "Execution driver mode for the job.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "driver_mode"
                      },
                      "x-order": 13
                    },
                    "lastRunAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time of the most recent execution attempt.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_run_at"
                      },
                      "x-order": 14
                    },
                    "lastError": {
                      "type": "string",
                      "description": "Error reported by the most recent execution attempt.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_error"
                      },
                      "x-order": 15
                    },
                    "claimedBy": {
                      "type": "string",
                      "description": "Machine holding the lease. Server-managed; set only by claim, refused on every other path.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "claimed_by"
                      },
                      "x-order": 16
                    },
                    "claimedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the lease was claimed. Server-managed.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "claimed_at"
                      },
                      "x-order": 17
                    },
                    "leaseExpiresAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the lease lapses when unrenewed. A holder with a null or expired lease is stale and the row returns to the pool. Server-managed; moved only by renew for the holder.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "lease_expires_at"
                      },
                      "x-order": 18
                    },
                    "pausedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the row was paused. Server-managed; set only by pause, cleared by resume.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_at"
                      },
                      "x-order": 19
                    },
                    "pausedBy": {
                      "type": "string",
                      "description": "Identity that paused the row. Server-managed.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_by"
                      },
                      "x-order": 20
                    },
                    "pauseReason": {
                      "type": "string",
                      "description": "Operator reason for pausing the row. Server-managed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "pause_reason"
                      },
                      "x-order": 21
                    },
                    "fingerprint": {
                      "type": "string",
                      "description": "Hex digest over the canonical job values, typed so null, empty string, zero and false differ. Server-computed; used for conditional updates.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "fingerprint"
                      },
                      "x-order": 22
                    },
                    "locked": {
                      "type": "boolean",
                      "description": "Computed projection. True while a live lease is held on the row.",
                      "x-order": 23
                    },
                    "lockedBy": {
                      "type": "string",
                      "description": "Computed projection of the current lease holder.",
                      "maxLength": 255,
                      "x-order": 24
                    },
                    "lockedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Computed projection of the current claim time.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-order": 25
                    },
                    "lockStale": {
                      "type": "boolean",
                      "description": "Computed projection. True when the row carries a holder whose lease is null or expired, marking the row reclaimable.",
                      "x-order": 26
                    },
                    "createdAt": {
                      "description": "Timestamp of job lease creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 27,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last job lease modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 28,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the job lease was soft-deleted.",
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
                      "x-order": 29
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
    "/api/job-leases/claim": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "jobLeases"
        ],
        "summary": "Claim a due job lease",
        "operationId": "claimJobLease",
        "description": "Hands one due, unheld, unpaused row to the machine named by\n`machineId` in a single server-side statement, recording it as\n`claimedBy`. Answers the row, or null when no row\nqualifies - a lost race is null, never an error. `force` drops only\nthe due test for trigger-now; a live foreign lease still refuses.\n`ignorePause` is the single operator override over pause scopes.\nThe holder identity is client-asserted: in v1 the holder check on\nclaim, renew and release is advisory, not an authorization\nboundary, and calls made with purpose-scoped tokens are audited.\n",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Claim filter for handing one due row to the caller.",
                "required": [
                  "machineId"
                ],
                "properties": {
                  "machineId": {
                    "type": "string",
                    "description": "Machine taking the lease, recorded as `claimedBy`. Client-asserted; the holder check is advisory in v1.",
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "rowNumber": {
                    "type": "integer",
                    "description": "Claim only the row with this row number.",
                    "minimum": 0
                  },
                  "force": {
                    "type": "boolean",
                    "description": "Trigger-now override that drops only the due test; a live foreign lease still refuses."
                  },
                  "ignorePause": {
                    "type": "boolean",
                    "description": "Single operator override over the organization-wide and per-row pause scopes."
                  },
                  "leaseMinutes": {
                    "type": "integer",
                    "description": "Requested lease duration in minutes. When omitted the server applies its default lease duration.",
                    "minimum": 1
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Claim result holding the row, or null when nothing was claimed",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Claim and renew outcome. `jobLease` carries the row, or null when\nnothing was claimed (lost race) or the row is not held by the\ncaller (renew) - never an error.\n",
                  "properties": {
                    "jobLease": {
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "title": "Job Lease Schema",
                      "description": "Server-returned job lease as persisted by meshery-cloud. A job lease is a\ndue-work row plus time-bound claim state, shared by Layer5 Cloud and\nBlowhorn: competing consumers claim, renew and release leases on due jobs,\nand pause scopes gate which rows are claimable. The claim race is decided\nserver-side in a single statement; losing racers receive null, never an\nerror. Claim columns (`claimedBy`, `claimedAt`, `leaseExpiresAt`) and pause\ncolumns (`pausedAt`, `pausedBy`, `pauseReason`) are server-managed and are\nrefused on CRUD paths; they change only through the claim, renew, release,\npause and resume operations. `locked`, `lockedBy`, `lockedAt` and\n`lockStale` are computed projections for schedule screens, not stored\ncolumns.\n",
                      "type": "object",
                      "additionalProperties": false,
                      "required": [
                        "id",
                        "organizationId",
                        "rowNumber",
                        "command",
                        "status",
                        "fingerprint",
                        "createdAt",
                        "updatedAt"
                      ],
                      "properties": {
                        "id": {
                          "description": "Server-generated job lease ID.",
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
                        "rowNumber": {
                          "type": "integer",
                          "description": "Targetable row number within the organization's job set. Used for per-row claims and trigger-now overrides.",
                          "minimum": 0,
                          "x-oapi-codegen-extra-tags": {
                            "db": "row_number"
                          },
                          "x-order": 3
                        },
                        "command": {
                          "type": "string",
                          "description": "Job command to execute when the lease is held.",
                          "minLength": 1,
                          "maxLength": 255,
                          "x-oapi-codegen-extra-tags": {
                            "db": "command"
                          },
                          "x-order": 4
                        },
                        "profile": {
                          "type": "string",
                          "description": "Profile reference the job runs against.",
                          "maxLength": 255,
                          "x-oapi-codegen-extra-tags": {
                            "db": "profile"
                          },
                          "x-order": 5
                        },
                        "platform": {
                          "type": "string",
                          "description": "Target platform for the job (e.g. linkedin).",
                          "maxLength": 255,
                          "x-oapi-codegen-extra-tags": {
                            "db": "platform"
                          },
                          "x-order": 6
                        },
                        "params": {
                          "type": "object",
                          "description": "Arbitrary job parameters, stored as a JSON blob.",
                          "x-go-type": "core.Map",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-go-type-skip-optional-pointer": true,
                          "x-oapi-codegen-extra-tags": {
                            "db": "params"
                          },
                          "x-order": 7
                        },
                        "runAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Time the job becomes due.",
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
                          "description": "Next scheduled time for recurring jobs.",
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
                          "description": "Recurrence rule (cron expression) for repeating jobs. Absent for one-shot jobs.",
                          "maxLength": 255,
                          "x-oapi-codegen-extra-tags": {
                            "db": "recurrence"
                          },
                          "x-order": 10
                        },
                        "retryBudget": {
                          "type": "integer",
                          "description": "Remaining execution attempts for the job.",
                          "minimum": 0,
                          "x-oapi-codegen-extra-tags": {
                            "db": "retry_budget"
                          },
                          "x-order": 11
                        },
                        "status": {
                          "type": "string",
                          "description": "Lifecycle status of the job. Managed server-side through the claim, renew, release, pause and resume operations.",
                          "enum": [
                            "pending",
                            "leased",
                            "succeeded",
                            "failed"
                          ],
                          "x-oapi-codegen-extra-tags": {
                            "db": "status"
                          },
                          "x-order": 12
                        },
                        "driverMode": {
                          "type": "string",
                          "description": "Execution driver mode for the job.",
                          "maxLength": 255,
                          "x-oapi-codegen-extra-tags": {
                            "db": "driver_mode"
                          },
                          "x-order": 13
                        },
                        "lastRunAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Time of the most recent execution attempt.",
                          "nullable": true,
                          "x-go-type": "core.NullTime",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "last_run_at"
                          },
                          "x-order": 14
                        },
                        "lastError": {
                          "type": "string",
                          "description": "Error reported by the most recent execution attempt.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "last_error"
                          },
                          "x-order": 15
                        },
                        "claimedBy": {
                          "type": "string",
                          "description": "Machine holding the lease. Server-managed; set only by claim, refused on every other path.",
                          "maxLength": 255,
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimed_by"
                          },
                          "x-order": 16
                        },
                        "claimedAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Time the lease was claimed. Server-managed.",
                          "nullable": true,
                          "x-go-type": "core.NullTime",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimed_at"
                          },
                          "x-order": 17
                        },
                        "leaseExpiresAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Time the lease lapses when unrenewed. A holder with a null or expired lease is stale and the row returns to the pool. Server-managed; moved only by renew for the holder.",
                          "nullable": true,
                          "x-go-type": "core.NullTime",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "lease_expires_at"
                          },
                          "x-order": 18
                        },
                        "pausedAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Time the row was paused. Server-managed; set only by pause, cleared by resume.",
                          "nullable": true,
                          "x-go-type": "core.NullTime",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "paused_at"
                          },
                          "x-order": 19
                        },
                        "pausedBy": {
                          "type": "string",
                          "description": "Identity that paused the row. Server-managed.",
                          "maxLength": 255,
                          "x-oapi-codegen-extra-tags": {
                            "db": "paused_by"
                          },
                          "x-order": 20
                        },
                        "pauseReason": {
                          "type": "string",
                          "description": "Operator reason for pausing the row. Server-managed.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "pause_reason"
                          },
                          "x-order": 21
                        },
                        "fingerprint": {
                          "type": "string",
                          "description": "Hex digest over the canonical job values, typed so null, empty string, zero and false differ. Server-computed; used for conditional updates.",
                          "minLength": 1,
                          "maxLength": 255,
                          "x-oapi-codegen-extra-tags": {
                            "db": "fingerprint"
                          },
                          "x-order": 22
                        },
                        "locked": {
                          "type": "boolean",
                          "description": "Computed projection. True while a live lease is held on the row.",
                          "x-order": 23
                        },
                        "lockedBy": {
                          "type": "string",
                          "description": "Computed projection of the current lease holder.",
                          "maxLength": 255,
                          "x-order": 24
                        },
                        "lockedAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Computed projection of the current claim time.",
                          "nullable": true,
                          "x-go-type": "core.NullTime",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-order": 25
                        },
                        "lockStale": {
                          "type": "boolean",
                          "description": "Computed projection. True when the row carries a holder whose lease is null or expired, marking the row reclaimable.",
                          "x-order": 26
                        },
                        "createdAt": {
                          "description": "Timestamp of job lease creation.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "created_at"
                          },
                          "x-order": 27,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "updatedAt": {
                          "description": "Timestamp of last job lease modification.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "updated_at"
                          },
                          "x-order": 28,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "deletedAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Timestamp when the job lease was soft-deleted.",
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
                          "x-order": 29
                        }
                      },
                      "nullable": true,
                      "x-go-type": "JobLease",
                      "x-oapi-codegen-extra-tags": {
                        "json": "jobLease",
                        "yaml": "jobLease"
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
    "/api/job-leases/schedule-pause": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "jobLeases"
        ],
        "summary": "Get organization schedule pause",
        "operationId": "getSchedulePause",
        "description": "Returns the organization-wide pause row for the organization of the\nauthenticated session. A 404 is the ordinary answer when no pause is\nset, and is not an error condition.\n",
        "responses": {
          "200": {
            "description": "Organization schedule pause",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Schedule Pause Schema",
                  "description": "Server-returned organization-wide schedule pause. While a pause row\nexists for an organization, none of its job lease rows is claimed unless\nthe claim carries the operator override. Absence of a row means\nunpaused; there is at most one live row per organization.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Server-generated schedule pause ID.",
                      "x-order": 1,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "organizationId": {
                      "description": "Organization the pause applies to. Derived from the authenticated session, never client-settable.",
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
                    "reason": {
                      "type": "string",
                      "description": "Operator reason for pausing the organization schedule.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "reason"
                      },
                      "x-order": 3
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
                    "createdAt": {
                      "description": "Timestamp of schedule pause creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 5,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last schedule pause modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 6,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
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
          "jobLeases"
        ],
        "summary": "Set organization schedule pause",
        "operationId": "setSchedulePause",
        "description": "Sets the organization-wide pause for the organization of the\nauthenticated session. While set, no row in the organization is\nclaimed unless the claim carries `ignorePause`.\n",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for setting the organization-wide schedule pause. The\npausing identity and timestamp are server-managed.\n",
                "properties": {
                  "reason": {
                    "type": "string",
                    "description": "Operator reason for pausing the organization schedule."
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Organization schedule pause set",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Schedule Pause Schema",
                  "description": "Server-returned organization-wide schedule pause. While a pause row\nexists for an organization, none of its job lease rows is claimed unless\nthe claim carries the operator override. Absence of a row means\nunpaused; there is at most one live row per organization.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Server-generated schedule pause ID.",
                      "x-order": 1,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "organizationId": {
                      "description": "Organization the pause applies to. Derived from the authenticated session, never client-settable.",
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
                    "reason": {
                      "type": "string",
                      "description": "Operator reason for pausing the organization schedule.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "reason"
                      },
                      "x-order": 3
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
                    "createdAt": {
                      "description": "Timestamp of schedule pause creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 5,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last schedule pause modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 6,
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
      "delete": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "jobLeases"
        ],
        "summary": "Clear organization schedule pause",
        "operationId": "clearSchedulePause",
        "description": "Clears the organization-wide pause for the organization of the\nauthenticated session so due rows become claimable again.\n",
        "responses": {
          "204": {
            "description": "Organization schedule pause cleared"
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
    "/api/job-leases/{jobLeaseId}": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "jobLeases"
        ],
        "summary": "Get job lease by ID",
        "operationId": "getJobLease",
        "parameters": [
          {
            "name": "jobLeaseId",
            "in": "path",
            "description": "Job lease ID",
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
            "description": "Job lease response",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Job Lease Schema",
                  "description": "Server-returned job lease as persisted by meshery-cloud. A job lease is a\ndue-work row plus time-bound claim state, shared by Layer5 Cloud and\nBlowhorn: competing consumers claim, renew and release leases on due jobs,\nand pause scopes gate which rows are claimable. The claim race is decided\nserver-side in a single statement; losing racers receive null, never an\nerror. Claim columns (`claimedBy`, `claimedAt`, `leaseExpiresAt`) and pause\ncolumns (`pausedAt`, `pausedBy`, `pauseReason`) are server-managed and are\nrefused on CRUD paths; they change only through the claim, renew, release,\npause and resume operations. `locked`, `lockedBy`, `lockedAt` and\n`lockStale` are computed projections for schedule screens, not stored\ncolumns.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "rowNumber",
                    "command",
                    "status",
                    "fingerprint",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Server-generated job lease ID.",
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
                    "rowNumber": {
                      "type": "integer",
                      "description": "Targetable row number within the organization's job set. Used for per-row claims and trigger-now overrides.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "row_number"
                      },
                      "x-order": 3
                    },
                    "command": {
                      "type": "string",
                      "description": "Job command to execute when the lease is held.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "command"
                      },
                      "x-order": 4
                    },
                    "profile": {
                      "type": "string",
                      "description": "Profile reference the job runs against.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "profile"
                      },
                      "x-order": 5
                    },
                    "platform": {
                      "type": "string",
                      "description": "Target platform for the job (e.g. linkedin).",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "platform"
                      },
                      "x-order": 6
                    },
                    "params": {
                      "type": "object",
                      "description": "Arbitrary job parameters, stored as a JSON blob.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "params"
                      },
                      "x-order": 7
                    },
                    "runAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the job becomes due.",
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
                      "description": "Next scheduled time for recurring jobs.",
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
                      "description": "Recurrence rule (cron expression) for repeating jobs. Absent for one-shot jobs.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "recurrence"
                      },
                      "x-order": 10
                    },
                    "retryBudget": {
                      "type": "integer",
                      "description": "Remaining execution attempts for the job.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "retry_budget"
                      },
                      "x-order": 11
                    },
                    "status": {
                      "type": "string",
                      "description": "Lifecycle status of the job. Managed server-side through the claim, renew, release, pause and resume operations.",
                      "enum": [
                        "pending",
                        "leased",
                        "succeeded",
                        "failed"
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      },
                      "x-order": 12
                    },
                    "driverMode": {
                      "type": "string",
                      "description": "Execution driver mode for the job.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "driver_mode"
                      },
                      "x-order": 13
                    },
                    "lastRunAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time of the most recent execution attempt.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_run_at"
                      },
                      "x-order": 14
                    },
                    "lastError": {
                      "type": "string",
                      "description": "Error reported by the most recent execution attempt.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_error"
                      },
                      "x-order": 15
                    },
                    "claimedBy": {
                      "type": "string",
                      "description": "Machine holding the lease. Server-managed; set only by claim, refused on every other path.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "claimed_by"
                      },
                      "x-order": 16
                    },
                    "claimedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the lease was claimed. Server-managed.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "claimed_at"
                      },
                      "x-order": 17
                    },
                    "leaseExpiresAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the lease lapses when unrenewed. A holder with a null or expired lease is stale and the row returns to the pool. Server-managed; moved only by renew for the holder.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "lease_expires_at"
                      },
                      "x-order": 18
                    },
                    "pausedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the row was paused. Server-managed; set only by pause, cleared by resume.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_at"
                      },
                      "x-order": 19
                    },
                    "pausedBy": {
                      "type": "string",
                      "description": "Identity that paused the row. Server-managed.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_by"
                      },
                      "x-order": 20
                    },
                    "pauseReason": {
                      "type": "string",
                      "description": "Operator reason for pausing the row. Server-managed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "pause_reason"
                      },
                      "x-order": 21
                    },
                    "fingerprint": {
                      "type": "string",
                      "description": "Hex digest over the canonical job values, typed so null, empty string, zero and false differ. Server-computed; used for conditional updates.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "fingerprint"
                      },
                      "x-order": 22
                    },
                    "locked": {
                      "type": "boolean",
                      "description": "Computed projection. True while a live lease is held on the row.",
                      "x-order": 23
                    },
                    "lockedBy": {
                      "type": "string",
                      "description": "Computed projection of the current lease holder.",
                      "maxLength": 255,
                      "x-order": 24
                    },
                    "lockedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Computed projection of the current claim time.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-order": 25
                    },
                    "lockStale": {
                      "type": "boolean",
                      "description": "Computed projection. True when the row carries a holder whose lease is null or expired, marking the row reclaimable.",
                      "x-order": 26
                    },
                    "createdAt": {
                      "description": "Timestamp of job lease creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 27,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last job lease modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 28,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the job lease was soft-deleted.",
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
                      "x-order": 29
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
          "jobLeases"
        ],
        "summary": "Update job lease",
        "operationId": "updateJobLease",
        "description": "Updates the job definition. Claim columns and pause columns are\nrefused here; use the renew, release, pause and resume operations\nfor those. When `expectedFingerprint` is supplied and stale, the\nupdate is refused with a 409.\n",
        "parameters": [
          {
            "name": "jobLeaseId",
            "in": "path",
            "description": "Job lease ID",
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
                "description": "Payload for creating or updating a job lease. Contains only\nclient-settable job definition fields; the claim columns, the\npause columns, the server-computed `fingerprint` and the\nserver-generated timestamps are intentionally excluded.\n",
                "required": [
                  "rowNumber",
                  "command"
                ],
                "properties": {
                  "id": {
                    "description": "Existing job lease ID for updates; omit on create.",
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
                  "rowNumber": {
                    "type": "integer",
                    "description": "Targetable row number within the organization's job set.",
                    "minimum": 0
                  },
                  "command": {
                    "type": "string",
                    "description": "Job command to execute when the lease is held.",
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "profile": {
                    "type": "string",
                    "description": "Profile reference the job runs against.",
                    "maxLength": 255
                  },
                  "platform": {
                    "type": "string",
                    "description": "Target platform for the job (e.g. linkedin).",
                    "maxLength": 255
                  },
                  "params": {
                    "type": "object",
                    "description": "Arbitrary job parameters, stored as a JSON blob.",
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    },
                    "x-go-type-skip-optional-pointer": true
                  },
                  "runAt": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Time the job becomes due."
                  },
                  "nextRunAt": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Next scheduled time for recurring jobs."
                  },
                  "recurrence": {
                    "type": "string",
                    "description": "Recurrence rule (cron expression) for repeating jobs. Absent for one-shot jobs.",
                    "maxLength": 255
                  },
                  "retryBudget": {
                    "type": "integer",
                    "description": "Remaining execution attempts for the job.",
                    "minimum": 0
                  },
                  "driverMode": {
                    "type": "string",
                    "description": "Execution driver mode for the job.",
                    "maxLength": 255
                  },
                  "expectedFingerprint": {
                    "type": "string",
                    "description": "Optimistic-concurrency precondition for update: when supplied,\nthe update applies only when the stored fingerprint still\nmatches, and is refused with a 409 otherwise. Ignored on\ncreate.\n",
                    "maxLength": 255
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Job lease updated",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Job Lease Schema",
                  "description": "Server-returned job lease as persisted by meshery-cloud. A job lease is a\ndue-work row plus time-bound claim state, shared by Layer5 Cloud and\nBlowhorn: competing consumers claim, renew and release leases on due jobs,\nand pause scopes gate which rows are claimable. The claim race is decided\nserver-side in a single statement; losing racers receive null, never an\nerror. Claim columns (`claimedBy`, `claimedAt`, `leaseExpiresAt`) and pause\ncolumns (`pausedAt`, `pausedBy`, `pauseReason`) are server-managed and are\nrefused on CRUD paths; they change only through the claim, renew, release,\npause and resume operations. `locked`, `lockedBy`, `lockedAt` and\n`lockStale` are computed projections for schedule screens, not stored\ncolumns.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "rowNumber",
                    "command",
                    "status",
                    "fingerprint",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Server-generated job lease ID.",
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
                    "rowNumber": {
                      "type": "integer",
                      "description": "Targetable row number within the organization's job set. Used for per-row claims and trigger-now overrides.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "row_number"
                      },
                      "x-order": 3
                    },
                    "command": {
                      "type": "string",
                      "description": "Job command to execute when the lease is held.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "command"
                      },
                      "x-order": 4
                    },
                    "profile": {
                      "type": "string",
                      "description": "Profile reference the job runs against.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "profile"
                      },
                      "x-order": 5
                    },
                    "platform": {
                      "type": "string",
                      "description": "Target platform for the job (e.g. linkedin).",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "platform"
                      },
                      "x-order": 6
                    },
                    "params": {
                      "type": "object",
                      "description": "Arbitrary job parameters, stored as a JSON blob.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "params"
                      },
                      "x-order": 7
                    },
                    "runAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the job becomes due.",
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
                      "description": "Next scheduled time for recurring jobs.",
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
                      "description": "Recurrence rule (cron expression) for repeating jobs. Absent for one-shot jobs.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "recurrence"
                      },
                      "x-order": 10
                    },
                    "retryBudget": {
                      "type": "integer",
                      "description": "Remaining execution attempts for the job.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "retry_budget"
                      },
                      "x-order": 11
                    },
                    "status": {
                      "type": "string",
                      "description": "Lifecycle status of the job. Managed server-side through the claim, renew, release, pause and resume operations.",
                      "enum": [
                        "pending",
                        "leased",
                        "succeeded",
                        "failed"
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      },
                      "x-order": 12
                    },
                    "driverMode": {
                      "type": "string",
                      "description": "Execution driver mode for the job.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "driver_mode"
                      },
                      "x-order": 13
                    },
                    "lastRunAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time of the most recent execution attempt.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_run_at"
                      },
                      "x-order": 14
                    },
                    "lastError": {
                      "type": "string",
                      "description": "Error reported by the most recent execution attempt.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_error"
                      },
                      "x-order": 15
                    },
                    "claimedBy": {
                      "type": "string",
                      "description": "Machine holding the lease. Server-managed; set only by claim, refused on every other path.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "claimed_by"
                      },
                      "x-order": 16
                    },
                    "claimedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the lease was claimed. Server-managed.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "claimed_at"
                      },
                      "x-order": 17
                    },
                    "leaseExpiresAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the lease lapses when unrenewed. A holder with a null or expired lease is stale and the row returns to the pool. Server-managed; moved only by renew for the holder.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "lease_expires_at"
                      },
                      "x-order": 18
                    },
                    "pausedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the row was paused. Server-managed; set only by pause, cleared by resume.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_at"
                      },
                      "x-order": 19
                    },
                    "pausedBy": {
                      "type": "string",
                      "description": "Identity that paused the row. Server-managed.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_by"
                      },
                      "x-order": 20
                    },
                    "pauseReason": {
                      "type": "string",
                      "description": "Operator reason for pausing the row. Server-managed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "pause_reason"
                      },
                      "x-order": 21
                    },
                    "fingerprint": {
                      "type": "string",
                      "description": "Hex digest over the canonical job values, typed so null, empty string, zero and false differ. Server-computed; used for conditional updates.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "fingerprint"
                      },
                      "x-order": 22
                    },
                    "locked": {
                      "type": "boolean",
                      "description": "Computed projection. True while a live lease is held on the row.",
                      "x-order": 23
                    },
                    "lockedBy": {
                      "type": "string",
                      "description": "Computed projection of the current lease holder.",
                      "maxLength": 255,
                      "x-order": 24
                    },
                    "lockedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Computed projection of the current claim time.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-order": 25
                    },
                    "lockStale": {
                      "type": "boolean",
                      "description": "Computed projection. True when the row carries a holder whose lease is null or expired, marking the row reclaimable.",
                      "x-order": 26
                    },
                    "createdAt": {
                      "description": "Timestamp of job lease creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 27,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last job lease modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 28,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the job lease was soft-deleted.",
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
                      "x-order": 29
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
            "description": "Conflict - the request conflicts with the current job lease state (stale expectedFingerprint precondition, or release by a machine that is not the current lease holder)",
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
          "jobLeases"
        ],
        "summary": "Delete job lease",
        "operationId": "deleteJobLease",
        "description": "Soft-deletes the job lease definition.",
        "parameters": [
          {
            "name": "jobLeaseId",
            "in": "path",
            "description": "Job lease ID",
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
            "description": "Job lease deleted"
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
    "/api/job-leases/{jobLeaseId}/renew": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "jobLeases"
        ],
        "summary": "Renew a held job lease",
        "operationId": "renewJobLease",
        "description": "Holder-only liveness: moves only `leaseExpiresAt` for the holder\nnamed by `machineId`. Answers the row, or null when the row is not\nheld by that holder - never taken back. `machineId` is\nclient-asserted, so the holder check is advisory in v1; calls made\nwith purpose-scoped tokens are audited.\n",
        "parameters": [
          {
            "name": "jobLeaseId",
            "in": "path",
            "description": "Job lease ID",
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
                "description": "Holder-only liveness renewal.",
                "required": [
                  "machineId"
                ],
                "properties": {
                  "machineId": {
                    "type": "string",
                    "description": "Machine holding the lease. Only the holder may renew. Client-asserted; the holder check is advisory in v1.",
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "leaseMinutes": {
                    "type": "integer",
                    "description": "Requested lease extension in minutes. When omitted the server applies its default lease duration.",
                    "minimum": 1
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Renew result holding the row, or null when not held by the caller",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Claim and renew outcome. `jobLease` carries the row, or null when\nnothing was claimed (lost race) or the row is not held by the\ncaller (renew) - never an error.\n",
                  "properties": {
                    "jobLease": {
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "title": "Job Lease Schema",
                      "description": "Server-returned job lease as persisted by meshery-cloud. A job lease is a\ndue-work row plus time-bound claim state, shared by Layer5 Cloud and\nBlowhorn: competing consumers claim, renew and release leases on due jobs,\nand pause scopes gate which rows are claimable. The claim race is decided\nserver-side in a single statement; losing racers receive null, never an\nerror. Claim columns (`claimedBy`, `claimedAt`, `leaseExpiresAt`) and pause\ncolumns (`pausedAt`, `pausedBy`, `pauseReason`) are server-managed and are\nrefused on CRUD paths; they change only through the claim, renew, release,\npause and resume operations. `locked`, `lockedBy`, `lockedAt` and\n`lockStale` are computed projections for schedule screens, not stored\ncolumns.\n",
                      "type": "object",
                      "additionalProperties": false,
                      "required": [
                        "id",
                        "organizationId",
                        "rowNumber",
                        "command",
                        "status",
                        "fingerprint",
                        "createdAt",
                        "updatedAt"
                      ],
                      "properties": {
                        "id": {
                          "description": "Server-generated job lease ID.",
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
                        "rowNumber": {
                          "type": "integer",
                          "description": "Targetable row number within the organization's job set. Used for per-row claims and trigger-now overrides.",
                          "minimum": 0,
                          "x-oapi-codegen-extra-tags": {
                            "db": "row_number"
                          },
                          "x-order": 3
                        },
                        "command": {
                          "type": "string",
                          "description": "Job command to execute when the lease is held.",
                          "minLength": 1,
                          "maxLength": 255,
                          "x-oapi-codegen-extra-tags": {
                            "db": "command"
                          },
                          "x-order": 4
                        },
                        "profile": {
                          "type": "string",
                          "description": "Profile reference the job runs against.",
                          "maxLength": 255,
                          "x-oapi-codegen-extra-tags": {
                            "db": "profile"
                          },
                          "x-order": 5
                        },
                        "platform": {
                          "type": "string",
                          "description": "Target platform for the job (e.g. linkedin).",
                          "maxLength": 255,
                          "x-oapi-codegen-extra-tags": {
                            "db": "platform"
                          },
                          "x-order": 6
                        },
                        "params": {
                          "type": "object",
                          "description": "Arbitrary job parameters, stored as a JSON blob.",
                          "x-go-type": "core.Map",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-go-type-skip-optional-pointer": true,
                          "x-oapi-codegen-extra-tags": {
                            "db": "params"
                          },
                          "x-order": 7
                        },
                        "runAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Time the job becomes due.",
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
                          "description": "Next scheduled time for recurring jobs.",
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
                          "description": "Recurrence rule (cron expression) for repeating jobs. Absent for one-shot jobs.",
                          "maxLength": 255,
                          "x-oapi-codegen-extra-tags": {
                            "db": "recurrence"
                          },
                          "x-order": 10
                        },
                        "retryBudget": {
                          "type": "integer",
                          "description": "Remaining execution attempts for the job.",
                          "minimum": 0,
                          "x-oapi-codegen-extra-tags": {
                            "db": "retry_budget"
                          },
                          "x-order": 11
                        },
                        "status": {
                          "type": "string",
                          "description": "Lifecycle status of the job. Managed server-side through the claim, renew, release, pause and resume operations.",
                          "enum": [
                            "pending",
                            "leased",
                            "succeeded",
                            "failed"
                          ],
                          "x-oapi-codegen-extra-tags": {
                            "db": "status"
                          },
                          "x-order": 12
                        },
                        "driverMode": {
                          "type": "string",
                          "description": "Execution driver mode for the job.",
                          "maxLength": 255,
                          "x-oapi-codegen-extra-tags": {
                            "db": "driver_mode"
                          },
                          "x-order": 13
                        },
                        "lastRunAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Time of the most recent execution attempt.",
                          "nullable": true,
                          "x-go-type": "core.NullTime",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "last_run_at"
                          },
                          "x-order": 14
                        },
                        "lastError": {
                          "type": "string",
                          "description": "Error reported by the most recent execution attempt.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "last_error"
                          },
                          "x-order": 15
                        },
                        "claimedBy": {
                          "type": "string",
                          "description": "Machine holding the lease. Server-managed; set only by claim, refused on every other path.",
                          "maxLength": 255,
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimed_by"
                          },
                          "x-order": 16
                        },
                        "claimedAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Time the lease was claimed. Server-managed.",
                          "nullable": true,
                          "x-go-type": "core.NullTime",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "claimed_at"
                          },
                          "x-order": 17
                        },
                        "leaseExpiresAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Time the lease lapses when unrenewed. A holder with a null or expired lease is stale and the row returns to the pool. Server-managed; moved only by renew for the holder.",
                          "nullable": true,
                          "x-go-type": "core.NullTime",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "lease_expires_at"
                          },
                          "x-order": 18
                        },
                        "pausedAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Time the row was paused. Server-managed; set only by pause, cleared by resume.",
                          "nullable": true,
                          "x-go-type": "core.NullTime",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "paused_at"
                          },
                          "x-order": 19
                        },
                        "pausedBy": {
                          "type": "string",
                          "description": "Identity that paused the row. Server-managed.",
                          "maxLength": 255,
                          "x-oapi-codegen-extra-tags": {
                            "db": "paused_by"
                          },
                          "x-order": 20
                        },
                        "pauseReason": {
                          "type": "string",
                          "description": "Operator reason for pausing the row. Server-managed.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "pause_reason"
                          },
                          "x-order": 21
                        },
                        "fingerprint": {
                          "type": "string",
                          "description": "Hex digest over the canonical job values, typed so null, empty string, zero and false differ. Server-computed; used for conditional updates.",
                          "minLength": 1,
                          "maxLength": 255,
                          "x-oapi-codegen-extra-tags": {
                            "db": "fingerprint"
                          },
                          "x-order": 22
                        },
                        "locked": {
                          "type": "boolean",
                          "description": "Computed projection. True while a live lease is held on the row.",
                          "x-order": 23
                        },
                        "lockedBy": {
                          "type": "string",
                          "description": "Computed projection of the current lease holder.",
                          "maxLength": 255,
                          "x-order": 24
                        },
                        "lockedAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Computed projection of the current claim time.",
                          "nullable": true,
                          "x-go-type": "core.NullTime",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-order": 25
                        },
                        "lockStale": {
                          "type": "boolean",
                          "description": "Computed projection. True when the row carries a holder whose lease is null or expired, marking the row reclaimable.",
                          "x-order": 26
                        },
                        "createdAt": {
                          "description": "Timestamp of job lease creation.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "created_at"
                          },
                          "x-order": 27,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "updatedAt": {
                          "description": "Timestamp of last job lease modification.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "updated_at"
                          },
                          "x-order": 28,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "deletedAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Timestamp when the job lease was soft-deleted.",
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
                          "x-order": 29
                        }
                      },
                      "nullable": true,
                      "x-go-type": "JobLease",
                      "x-oapi-codegen-extra-tags": {
                        "json": "jobLease",
                        "yaml": "jobLease"
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
    "/api/job-leases/{jobLeaseId}/release": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "jobLeases"
        ],
        "summary": "Release a held job lease",
        "operationId": "releaseJobLease",
        "description": "Clears the claim (`claimedBy`, `claimedAt`, `leaseExpiresAt`) for\nthe holder named by `machineId` and merges the supplied result\nvalues. Claim and identity keys are refused here. Holder-only: when\n`machineId` is not the current holder the release is refused with a\n409 and nothing changes - the claim columns and row values are left\nuntouched, so a live foreign claim is never cleared. A holder whose\nlease lapsed and was re-claimed by another machine therefore gets a\n409 when it finishes late. `machineId` is client-asserted, so the\nholder check is advisory in v1; calls made with purpose-scoped\ntokens are audited.\n",
        "parameters": [
          {
            "name": "jobLeaseId",
            "in": "path",
            "description": "Job lease ID",
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
                "description": "Release payload clearing the claim and landing result values.",
                "required": [
                  "machineId"
                ],
                "properties": {
                  "machineId": {
                    "type": "string",
                    "description": "Machine holding the lease. Only the holder may release; a non-holder is refused with a 409 and nothing changes. Client-asserted; the holder check is advisory in v1.",
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "values": {
                    "type": "object",
                    "description": "Result values merged into the row on release (e.g. last run outcome and error).",
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
            "description": "Job lease released",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Job Lease Schema",
                  "description": "Server-returned job lease as persisted by meshery-cloud. A job lease is a\ndue-work row plus time-bound claim state, shared by Layer5 Cloud and\nBlowhorn: competing consumers claim, renew and release leases on due jobs,\nand pause scopes gate which rows are claimable. The claim race is decided\nserver-side in a single statement; losing racers receive null, never an\nerror. Claim columns (`claimedBy`, `claimedAt`, `leaseExpiresAt`) and pause\ncolumns (`pausedAt`, `pausedBy`, `pauseReason`) are server-managed and are\nrefused on CRUD paths; they change only through the claim, renew, release,\npause and resume operations. `locked`, `lockedBy`, `lockedAt` and\n`lockStale` are computed projections for schedule screens, not stored\ncolumns.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "rowNumber",
                    "command",
                    "status",
                    "fingerprint",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Server-generated job lease ID.",
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
                    "rowNumber": {
                      "type": "integer",
                      "description": "Targetable row number within the organization's job set. Used for per-row claims and trigger-now overrides.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "row_number"
                      },
                      "x-order": 3
                    },
                    "command": {
                      "type": "string",
                      "description": "Job command to execute when the lease is held.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "command"
                      },
                      "x-order": 4
                    },
                    "profile": {
                      "type": "string",
                      "description": "Profile reference the job runs against.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "profile"
                      },
                      "x-order": 5
                    },
                    "platform": {
                      "type": "string",
                      "description": "Target platform for the job (e.g. linkedin).",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "platform"
                      },
                      "x-order": 6
                    },
                    "params": {
                      "type": "object",
                      "description": "Arbitrary job parameters, stored as a JSON blob.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "params"
                      },
                      "x-order": 7
                    },
                    "runAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the job becomes due.",
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
                      "description": "Next scheduled time for recurring jobs.",
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
                      "description": "Recurrence rule (cron expression) for repeating jobs. Absent for one-shot jobs.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "recurrence"
                      },
                      "x-order": 10
                    },
                    "retryBudget": {
                      "type": "integer",
                      "description": "Remaining execution attempts for the job.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "retry_budget"
                      },
                      "x-order": 11
                    },
                    "status": {
                      "type": "string",
                      "description": "Lifecycle status of the job. Managed server-side through the claim, renew, release, pause and resume operations.",
                      "enum": [
                        "pending",
                        "leased",
                        "succeeded",
                        "failed"
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      },
                      "x-order": 12
                    },
                    "driverMode": {
                      "type": "string",
                      "description": "Execution driver mode for the job.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "driver_mode"
                      },
                      "x-order": 13
                    },
                    "lastRunAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time of the most recent execution attempt.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_run_at"
                      },
                      "x-order": 14
                    },
                    "lastError": {
                      "type": "string",
                      "description": "Error reported by the most recent execution attempt.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_error"
                      },
                      "x-order": 15
                    },
                    "claimedBy": {
                      "type": "string",
                      "description": "Machine holding the lease. Server-managed; set only by claim, refused on every other path.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "claimed_by"
                      },
                      "x-order": 16
                    },
                    "claimedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the lease was claimed. Server-managed.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "claimed_at"
                      },
                      "x-order": 17
                    },
                    "leaseExpiresAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the lease lapses when unrenewed. A holder with a null or expired lease is stale and the row returns to the pool. Server-managed; moved only by renew for the holder.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "lease_expires_at"
                      },
                      "x-order": 18
                    },
                    "pausedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the row was paused. Server-managed; set only by pause, cleared by resume.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_at"
                      },
                      "x-order": 19
                    },
                    "pausedBy": {
                      "type": "string",
                      "description": "Identity that paused the row. Server-managed.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_by"
                      },
                      "x-order": 20
                    },
                    "pauseReason": {
                      "type": "string",
                      "description": "Operator reason for pausing the row. Server-managed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "pause_reason"
                      },
                      "x-order": 21
                    },
                    "fingerprint": {
                      "type": "string",
                      "description": "Hex digest over the canonical job values, typed so null, empty string, zero and false differ. Server-computed; used for conditional updates.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "fingerprint"
                      },
                      "x-order": 22
                    },
                    "locked": {
                      "type": "boolean",
                      "description": "Computed projection. True while a live lease is held on the row.",
                      "x-order": 23
                    },
                    "lockedBy": {
                      "type": "string",
                      "description": "Computed projection of the current lease holder.",
                      "maxLength": 255,
                      "x-order": 24
                    },
                    "lockedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Computed projection of the current claim time.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-order": 25
                    },
                    "lockStale": {
                      "type": "boolean",
                      "description": "Computed projection. True when the row carries a holder whose lease is null or expired, marking the row reclaimable.",
                      "x-order": 26
                    },
                    "createdAt": {
                      "description": "Timestamp of job lease creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 27,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last job lease modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 28,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the job lease was soft-deleted.",
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
                      "x-order": 29
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
            "description": "Conflict - the request conflicts with the current job lease state (stale expectedFingerprint precondition, or release by a machine that is not the current lease holder)",
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
    "/api/job-leases/{jobLeaseId}/pause": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "jobLeases"
        ],
        "summary": "Pause a job lease row",
        "operationId": "pauseJobLease",
        "description": "Sets the per-row pause. A paused row is claimed only by claims\ncarrying `ignorePause`.\n",
        "parameters": [
          {
            "name": "jobLeaseId",
            "in": "path",
            "description": "Job lease ID",
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
          "required": false,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Per-row pause payload.",
                "properties": {
                  "reason": {
                    "type": "string",
                    "description": "Operator reason for pausing the row."
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Job lease row paused",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Job Lease Schema",
                  "description": "Server-returned job lease as persisted by meshery-cloud. A job lease is a\ndue-work row plus time-bound claim state, shared by Layer5 Cloud and\nBlowhorn: competing consumers claim, renew and release leases on due jobs,\nand pause scopes gate which rows are claimable. The claim race is decided\nserver-side in a single statement; losing racers receive null, never an\nerror. Claim columns (`claimedBy`, `claimedAt`, `leaseExpiresAt`) and pause\ncolumns (`pausedAt`, `pausedBy`, `pauseReason`) are server-managed and are\nrefused on CRUD paths; they change only through the claim, renew, release,\npause and resume operations. `locked`, `lockedBy`, `lockedAt` and\n`lockStale` are computed projections for schedule screens, not stored\ncolumns.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "rowNumber",
                    "command",
                    "status",
                    "fingerprint",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Server-generated job lease ID.",
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
                    "rowNumber": {
                      "type": "integer",
                      "description": "Targetable row number within the organization's job set. Used for per-row claims and trigger-now overrides.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "row_number"
                      },
                      "x-order": 3
                    },
                    "command": {
                      "type": "string",
                      "description": "Job command to execute when the lease is held.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "command"
                      },
                      "x-order": 4
                    },
                    "profile": {
                      "type": "string",
                      "description": "Profile reference the job runs against.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "profile"
                      },
                      "x-order": 5
                    },
                    "platform": {
                      "type": "string",
                      "description": "Target platform for the job (e.g. linkedin).",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "platform"
                      },
                      "x-order": 6
                    },
                    "params": {
                      "type": "object",
                      "description": "Arbitrary job parameters, stored as a JSON blob.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "params"
                      },
                      "x-order": 7
                    },
                    "runAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the job becomes due.",
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
                      "description": "Next scheduled time for recurring jobs.",
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
                      "description": "Recurrence rule (cron expression) for repeating jobs. Absent for one-shot jobs.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "recurrence"
                      },
                      "x-order": 10
                    },
                    "retryBudget": {
                      "type": "integer",
                      "description": "Remaining execution attempts for the job.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "retry_budget"
                      },
                      "x-order": 11
                    },
                    "status": {
                      "type": "string",
                      "description": "Lifecycle status of the job. Managed server-side through the claim, renew, release, pause and resume operations.",
                      "enum": [
                        "pending",
                        "leased",
                        "succeeded",
                        "failed"
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      },
                      "x-order": 12
                    },
                    "driverMode": {
                      "type": "string",
                      "description": "Execution driver mode for the job.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "driver_mode"
                      },
                      "x-order": 13
                    },
                    "lastRunAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time of the most recent execution attempt.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_run_at"
                      },
                      "x-order": 14
                    },
                    "lastError": {
                      "type": "string",
                      "description": "Error reported by the most recent execution attempt.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_error"
                      },
                      "x-order": 15
                    },
                    "claimedBy": {
                      "type": "string",
                      "description": "Machine holding the lease. Server-managed; set only by claim, refused on every other path.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "claimed_by"
                      },
                      "x-order": 16
                    },
                    "claimedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the lease was claimed. Server-managed.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "claimed_at"
                      },
                      "x-order": 17
                    },
                    "leaseExpiresAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the lease lapses when unrenewed. A holder with a null or expired lease is stale and the row returns to the pool. Server-managed; moved only by renew for the holder.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "lease_expires_at"
                      },
                      "x-order": 18
                    },
                    "pausedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the row was paused. Server-managed; set only by pause, cleared by resume.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_at"
                      },
                      "x-order": 19
                    },
                    "pausedBy": {
                      "type": "string",
                      "description": "Identity that paused the row. Server-managed.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_by"
                      },
                      "x-order": 20
                    },
                    "pauseReason": {
                      "type": "string",
                      "description": "Operator reason for pausing the row. Server-managed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "pause_reason"
                      },
                      "x-order": 21
                    },
                    "fingerprint": {
                      "type": "string",
                      "description": "Hex digest over the canonical job values, typed so null, empty string, zero and false differ. Server-computed; used for conditional updates.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "fingerprint"
                      },
                      "x-order": 22
                    },
                    "locked": {
                      "type": "boolean",
                      "description": "Computed projection. True while a live lease is held on the row.",
                      "x-order": 23
                    },
                    "lockedBy": {
                      "type": "string",
                      "description": "Computed projection of the current lease holder.",
                      "maxLength": 255,
                      "x-order": 24
                    },
                    "lockedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Computed projection of the current claim time.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-order": 25
                    },
                    "lockStale": {
                      "type": "boolean",
                      "description": "Computed projection. True when the row carries a holder whose lease is null or expired, marking the row reclaimable.",
                      "x-order": 26
                    },
                    "createdAt": {
                      "description": "Timestamp of job lease creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 27,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last job lease modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 28,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the job lease was soft-deleted.",
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
                      "x-order": 29
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
    "/api/job-leases/{jobLeaseId}/resume": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "jobLeases"
        ],
        "summary": "Resume a paused job lease row",
        "operationId": "resumeJobLease",
        "description": "Clears the per-row pause so the row becomes claimable again.",
        "parameters": [
          {
            "name": "jobLeaseId",
            "in": "path",
            "description": "Job lease ID",
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
            "description": "Job lease row resumed",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Job Lease Schema",
                  "description": "Server-returned job lease as persisted by meshery-cloud. A job lease is a\ndue-work row plus time-bound claim state, shared by Layer5 Cloud and\nBlowhorn: competing consumers claim, renew and release leases on due jobs,\nand pause scopes gate which rows are claimable. The claim race is decided\nserver-side in a single statement; losing racers receive null, never an\nerror. Claim columns (`claimedBy`, `claimedAt`, `leaseExpiresAt`) and pause\ncolumns (`pausedAt`, `pausedBy`, `pauseReason`) are server-managed and are\nrefused on CRUD paths; they change only through the claim, renew, release,\npause and resume operations. `locked`, `lockedBy`, `lockedAt` and\n`lockStale` are computed projections for schedule screens, not stored\ncolumns.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "rowNumber",
                    "command",
                    "status",
                    "fingerprint",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Server-generated job lease ID.",
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
                    "rowNumber": {
                      "type": "integer",
                      "description": "Targetable row number within the organization's job set. Used for per-row claims and trigger-now overrides.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "row_number"
                      },
                      "x-order": 3
                    },
                    "command": {
                      "type": "string",
                      "description": "Job command to execute when the lease is held.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "command"
                      },
                      "x-order": 4
                    },
                    "profile": {
                      "type": "string",
                      "description": "Profile reference the job runs against.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "profile"
                      },
                      "x-order": 5
                    },
                    "platform": {
                      "type": "string",
                      "description": "Target platform for the job (e.g. linkedin).",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "platform"
                      },
                      "x-order": 6
                    },
                    "params": {
                      "type": "object",
                      "description": "Arbitrary job parameters, stored as a JSON blob.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "params"
                      },
                      "x-order": 7
                    },
                    "runAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the job becomes due.",
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
                      "description": "Next scheduled time for recurring jobs.",
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
                      "description": "Recurrence rule (cron expression) for repeating jobs. Absent for one-shot jobs.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "recurrence"
                      },
                      "x-order": 10
                    },
                    "retryBudget": {
                      "type": "integer",
                      "description": "Remaining execution attempts for the job.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "retry_budget"
                      },
                      "x-order": 11
                    },
                    "status": {
                      "type": "string",
                      "description": "Lifecycle status of the job. Managed server-side through the claim, renew, release, pause and resume operations.",
                      "enum": [
                        "pending",
                        "leased",
                        "succeeded",
                        "failed"
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      },
                      "x-order": 12
                    },
                    "driverMode": {
                      "type": "string",
                      "description": "Execution driver mode for the job.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "driver_mode"
                      },
                      "x-order": 13
                    },
                    "lastRunAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time of the most recent execution attempt.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_run_at"
                      },
                      "x-order": 14
                    },
                    "lastError": {
                      "type": "string",
                      "description": "Error reported by the most recent execution attempt.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_error"
                      },
                      "x-order": 15
                    },
                    "claimedBy": {
                      "type": "string",
                      "description": "Machine holding the lease. Server-managed; set only by claim, refused on every other path.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "claimed_by"
                      },
                      "x-order": 16
                    },
                    "claimedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the lease was claimed. Server-managed.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "claimed_at"
                      },
                      "x-order": 17
                    },
                    "leaseExpiresAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the lease lapses when unrenewed. A holder with a null or expired lease is stale and the row returns to the pool. Server-managed; moved only by renew for the holder.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "lease_expires_at"
                      },
                      "x-order": 18
                    },
                    "pausedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the row was paused. Server-managed; set only by pause, cleared by resume.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_at"
                      },
                      "x-order": 19
                    },
                    "pausedBy": {
                      "type": "string",
                      "description": "Identity that paused the row. Server-managed.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "paused_by"
                      },
                      "x-order": 20
                    },
                    "pauseReason": {
                      "type": "string",
                      "description": "Operator reason for pausing the row. Server-managed.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "pause_reason"
                      },
                      "x-order": 21
                    },
                    "fingerprint": {
                      "type": "string",
                      "description": "Hex digest over the canonical job values, typed so null, empty string, zero and false differ. Server-computed; used for conditional updates.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "fingerprint"
                      },
                      "x-order": 22
                    },
                    "locked": {
                      "type": "boolean",
                      "description": "Computed projection. True while a live lease is held on the row.",
                      "x-order": 23
                    },
                    "lockedBy": {
                      "type": "string",
                      "description": "Computed projection of the current lease holder.",
                      "maxLength": 255,
                      "x-order": 24
                    },
                    "lockedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Computed projection of the current claim time.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-order": 25
                    },
                    "lockStale": {
                      "type": "boolean",
                      "description": "Computed projection. True when the row carries a holder whose lease is null or expired, marking the row reclaimable.",
                      "x-order": 26
                    },
                    "createdAt": {
                      "description": "Timestamp of job lease creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 27,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last job lease modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 28,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the job lease was soft-deleted.",
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
                      "x-order": 29
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
      "409": {
        "description": "Conflict - the request conflicts with the current job lease state (stale expectedFingerprint precondition, or release by a machine that is not the current lease holder)",
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
      "jobLeaseId": {
        "name": "jobLeaseId",
        "in": "path",
        "description": "Job lease ID",
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
      "JobLease": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Job Lease Schema",
        "description": "Server-returned job lease as persisted by meshery-cloud. A job lease is a\ndue-work row plus time-bound claim state, shared by Layer5 Cloud and\nBlowhorn: competing consumers claim, renew and release leases on due jobs,\nand pause scopes gate which rows are claimable. The claim race is decided\nserver-side in a single statement; losing racers receive null, never an\nerror. Claim columns (`claimedBy`, `claimedAt`, `leaseExpiresAt`) and pause\ncolumns (`pausedAt`, `pausedBy`, `pauseReason`) are server-managed and are\nrefused on CRUD paths; they change only through the claim, renew, release,\npause and resume operations. `locked`, `lockedBy`, `lockedAt` and\n`lockStale` are computed projections for schedule screens, not stored\ncolumns.\n",
        "type": "object",
        "additionalProperties": false,
        "required": [
          "id",
          "organizationId",
          "rowNumber",
          "command",
          "status",
          "fingerprint",
          "createdAt",
          "updatedAt"
        ],
        "properties": {
          "id": {
            "description": "Server-generated job lease ID.",
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
          "rowNumber": {
            "type": "integer",
            "description": "Targetable row number within the organization's job set. Used for per-row claims and trigger-now overrides.",
            "minimum": 0,
            "x-oapi-codegen-extra-tags": {
              "db": "row_number"
            },
            "x-order": 3
          },
          "command": {
            "type": "string",
            "description": "Job command to execute when the lease is held.",
            "minLength": 1,
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "command"
            },
            "x-order": 4
          },
          "profile": {
            "type": "string",
            "description": "Profile reference the job runs against.",
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "profile"
            },
            "x-order": 5
          },
          "platform": {
            "type": "string",
            "description": "Target platform for the job (e.g. linkedin).",
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "platform"
            },
            "x-order": 6
          },
          "params": {
            "type": "object",
            "description": "Arbitrary job parameters, stored as a JSON blob.",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "params"
            },
            "x-order": 7
          },
          "runAt": {
            "type": "string",
            "format": "date-time",
            "description": "Time the job becomes due.",
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
            "description": "Next scheduled time for recurring jobs.",
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
            "description": "Recurrence rule (cron expression) for repeating jobs. Absent for one-shot jobs.",
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "recurrence"
            },
            "x-order": 10
          },
          "retryBudget": {
            "type": "integer",
            "description": "Remaining execution attempts for the job.",
            "minimum": 0,
            "x-oapi-codegen-extra-tags": {
              "db": "retry_budget"
            },
            "x-order": 11
          },
          "status": {
            "type": "string",
            "description": "Lifecycle status of the job. Managed server-side through the claim, renew, release, pause and resume operations.",
            "enum": [
              "pending",
              "leased",
              "succeeded",
              "failed"
            ],
            "x-oapi-codegen-extra-tags": {
              "db": "status"
            },
            "x-order": 12
          },
          "driverMode": {
            "type": "string",
            "description": "Execution driver mode for the job.",
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "driver_mode"
            },
            "x-order": 13
          },
          "lastRunAt": {
            "type": "string",
            "format": "date-time",
            "description": "Time of the most recent execution attempt.",
            "nullable": true,
            "x-go-type": "core.NullTime",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "last_run_at"
            },
            "x-order": 14
          },
          "lastError": {
            "type": "string",
            "description": "Error reported by the most recent execution attempt.",
            "x-oapi-codegen-extra-tags": {
              "db": "last_error"
            },
            "x-order": 15
          },
          "claimedBy": {
            "type": "string",
            "description": "Machine holding the lease. Server-managed; set only by claim, refused on every other path.",
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "claimed_by"
            },
            "x-order": 16
          },
          "claimedAt": {
            "type": "string",
            "format": "date-time",
            "description": "Time the lease was claimed. Server-managed.",
            "nullable": true,
            "x-go-type": "core.NullTime",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "claimed_at"
            },
            "x-order": 17
          },
          "leaseExpiresAt": {
            "type": "string",
            "format": "date-time",
            "description": "Time the lease lapses when unrenewed. A holder with a null or expired lease is stale and the row returns to the pool. Server-managed; moved only by renew for the holder.",
            "nullable": true,
            "x-go-type": "core.NullTime",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "lease_expires_at"
            },
            "x-order": 18
          },
          "pausedAt": {
            "type": "string",
            "format": "date-time",
            "description": "Time the row was paused. Server-managed; set only by pause, cleared by resume.",
            "nullable": true,
            "x-go-type": "core.NullTime",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "paused_at"
            },
            "x-order": 19
          },
          "pausedBy": {
            "type": "string",
            "description": "Identity that paused the row. Server-managed.",
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "paused_by"
            },
            "x-order": 20
          },
          "pauseReason": {
            "type": "string",
            "description": "Operator reason for pausing the row. Server-managed.",
            "x-oapi-codegen-extra-tags": {
              "db": "pause_reason"
            },
            "x-order": 21
          },
          "fingerprint": {
            "type": "string",
            "description": "Hex digest over the canonical job values, typed so null, empty string, zero and false differ. Server-computed; used for conditional updates.",
            "minLength": 1,
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "fingerprint"
            },
            "x-order": 22
          },
          "locked": {
            "type": "boolean",
            "description": "Computed projection. True while a live lease is held on the row.",
            "x-order": 23
          },
          "lockedBy": {
            "type": "string",
            "description": "Computed projection of the current lease holder.",
            "maxLength": 255,
            "x-order": 24
          },
          "lockedAt": {
            "type": "string",
            "format": "date-time",
            "description": "Computed projection of the current claim time.",
            "nullable": true,
            "x-go-type": "core.NullTime",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-order": 25
          },
          "lockStale": {
            "type": "boolean",
            "description": "Computed projection. True when the row carries a holder whose lease is null or expired, marking the row reclaimable.",
            "x-order": 26
          },
          "createdAt": {
            "description": "Timestamp of job lease creation.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at"
            },
            "x-order": 27,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp of last job lease modification.",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at"
            },
            "x-order": 28,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deletedAt": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the job lease was soft-deleted.",
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
            "x-order": 29
          }
        }
      },
      "SchedulePause": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Schedule Pause Schema",
        "description": "Server-returned organization-wide schedule pause. While a pause row\nexists for an organization, none of its job lease rows is claimed unless\nthe claim carries the operator override. Absence of a row means\nunpaused; there is at most one live row per organization.\n",
        "type": "object",
        "additionalProperties": false,
        "required": [
          "id",
          "organizationId",
          "createdAt",
          "updatedAt"
        ],
        "properties": {
          "id": {
            "description": "Server-generated schedule pause ID.",
            "x-order": 1,
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "organizationId": {
            "description": "Organization the pause applies to. Derived from the authenticated session, never client-settable.",
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
          "reason": {
            "type": "string",
            "description": "Operator reason for pausing the organization schedule.",
            "x-oapi-codegen-extra-tags": {
              "db": "reason"
            },
            "x-order": 3
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
          "createdAt": {
            "description": "Timestamp of schedule pause creation.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at"
            },
            "x-order": 5,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp of last schedule pause modification.",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at"
            },
            "x-order": 6,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "JobLeasePayload": {
        "type": "object",
        "description": "Payload for creating or updating a job lease. Contains only\nclient-settable job definition fields; the claim columns, the\npause columns, the server-computed `fingerprint` and the\nserver-generated timestamps are intentionally excluded.\n",
        "required": [
          "rowNumber",
          "command"
        ],
        "properties": {
          "id": {
            "description": "Existing job lease ID for updates; omit on create.",
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
          "rowNumber": {
            "type": "integer",
            "description": "Targetable row number within the organization's job set.",
            "minimum": 0
          },
          "command": {
            "type": "string",
            "description": "Job command to execute when the lease is held.",
            "minLength": 1,
            "maxLength": 255
          },
          "profile": {
            "type": "string",
            "description": "Profile reference the job runs against.",
            "maxLength": 255
          },
          "platform": {
            "type": "string",
            "description": "Target platform for the job (e.g. linkedin).",
            "maxLength": 255
          },
          "params": {
            "type": "object",
            "description": "Arbitrary job parameters, stored as a JSON blob.",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "runAt": {
            "type": "string",
            "format": "date-time",
            "description": "Time the job becomes due."
          },
          "nextRunAt": {
            "type": "string",
            "format": "date-time",
            "description": "Next scheduled time for recurring jobs."
          },
          "recurrence": {
            "type": "string",
            "description": "Recurrence rule (cron expression) for repeating jobs. Absent for one-shot jobs.",
            "maxLength": 255
          },
          "retryBudget": {
            "type": "integer",
            "description": "Remaining execution attempts for the job.",
            "minimum": 0
          },
          "driverMode": {
            "type": "string",
            "description": "Execution driver mode for the job.",
            "maxLength": 255
          },
          "expectedFingerprint": {
            "type": "string",
            "description": "Optimistic-concurrency precondition for update: when supplied,\nthe update applies only when the stored fingerprint still\nmatches, and is refused with a 409 otherwise. Ignored on\ncreate.\n",
            "maxLength": 255
          }
        }
      },
      "SchedulePausePayload": {
        "type": "object",
        "description": "Payload for setting the organization-wide schedule pause. The\npausing identity and timestamp are server-managed.\n",
        "properties": {
          "reason": {
            "type": "string",
            "description": "Operator reason for pausing the organization schedule."
          }
        }
      },
      "JobLeaseClaimRequest": {
        "type": "object",
        "description": "Claim filter for handing one due row to the caller.",
        "required": [
          "machineId"
        ],
        "properties": {
          "machineId": {
            "type": "string",
            "description": "Machine taking the lease, recorded as `claimedBy`. Client-asserted; the holder check is advisory in v1.",
            "minLength": 1,
            "maxLength": 255
          },
          "rowNumber": {
            "type": "integer",
            "description": "Claim only the row with this row number.",
            "minimum": 0
          },
          "force": {
            "type": "boolean",
            "description": "Trigger-now override that drops only the due test; a live foreign lease still refuses."
          },
          "ignorePause": {
            "type": "boolean",
            "description": "Single operator override over the organization-wide and per-row pause scopes."
          },
          "leaseMinutes": {
            "type": "integer",
            "description": "Requested lease duration in minutes. When omitted the server applies its default lease duration.",
            "minimum": 1
          }
        }
      },
      "JobLeaseRenewRequest": {
        "type": "object",
        "description": "Holder-only liveness renewal.",
        "required": [
          "machineId"
        ],
        "properties": {
          "machineId": {
            "type": "string",
            "description": "Machine holding the lease. Only the holder may renew. Client-asserted; the holder check is advisory in v1.",
            "minLength": 1,
            "maxLength": 255
          },
          "leaseMinutes": {
            "type": "integer",
            "description": "Requested lease extension in minutes. When omitted the server applies its default lease duration.",
            "minimum": 1
          }
        }
      },
      "JobLeaseReleaseRequest": {
        "type": "object",
        "description": "Release payload clearing the claim and landing result values.",
        "required": [
          "machineId"
        ],
        "properties": {
          "machineId": {
            "type": "string",
            "description": "Machine holding the lease. Only the holder may release; a non-holder is refused with a 409 and nothing changes. Client-asserted; the holder check is advisory in v1.",
            "minLength": 1,
            "maxLength": 255
          },
          "values": {
            "type": "object",
            "description": "Result values merged into the row on release (e.g. last run outcome and error).",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "JobLeasePauseRequest": {
        "type": "object",
        "description": "Per-row pause payload.",
        "properties": {
          "reason": {
            "type": "string",
            "description": "Operator reason for pausing the row."
          }
        }
      },
      "JobLeaseActionResponse": {
        "type": "object",
        "description": "Claim and renew outcome. `jobLease` carries the row, or null when\nnothing was claimed (lost race) or the row is not held by the\ncaller (renew) - never an error.\n",
        "properties": {
          "jobLease": {
            "$schema": "http://json-schema.org/draft-07/schema#",
            "title": "Job Lease Schema",
            "description": "Server-returned job lease as persisted by meshery-cloud. A job lease is a\ndue-work row plus time-bound claim state, shared by Layer5 Cloud and\nBlowhorn: competing consumers claim, renew and release leases on due jobs,\nand pause scopes gate which rows are claimable. The claim race is decided\nserver-side in a single statement; losing racers receive null, never an\nerror. Claim columns (`claimedBy`, `claimedAt`, `leaseExpiresAt`) and pause\ncolumns (`pausedAt`, `pausedBy`, `pauseReason`) are server-managed and are\nrefused on CRUD paths; they change only through the claim, renew, release,\npause and resume operations. `locked`, `lockedBy`, `lockedAt` and\n`lockStale` are computed projections for schedule screens, not stored\ncolumns.\n",
            "type": "object",
            "additionalProperties": false,
            "required": [
              "id",
              "organizationId",
              "rowNumber",
              "command",
              "status",
              "fingerprint",
              "createdAt",
              "updatedAt"
            ],
            "properties": {
              "id": {
                "description": "Server-generated job lease ID.",
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
              "rowNumber": {
                "type": "integer",
                "description": "Targetable row number within the organization's job set. Used for per-row claims and trigger-now overrides.",
                "minimum": 0,
                "x-oapi-codegen-extra-tags": {
                  "db": "row_number"
                },
                "x-order": 3
              },
              "command": {
                "type": "string",
                "description": "Job command to execute when the lease is held.",
                "minLength": 1,
                "maxLength": 255,
                "x-oapi-codegen-extra-tags": {
                  "db": "command"
                },
                "x-order": 4
              },
              "profile": {
                "type": "string",
                "description": "Profile reference the job runs against.",
                "maxLength": 255,
                "x-oapi-codegen-extra-tags": {
                  "db": "profile"
                },
                "x-order": 5
              },
              "platform": {
                "type": "string",
                "description": "Target platform for the job (e.g. linkedin).",
                "maxLength": 255,
                "x-oapi-codegen-extra-tags": {
                  "db": "platform"
                },
                "x-order": 6
              },
              "params": {
                "type": "object",
                "description": "Arbitrary job parameters, stored as a JSON blob.",
                "x-go-type": "core.Map",
                "x-go-type-import": {
                  "path": "github.com/meshery/schemas/models/core",
                  "name": "core"
                },
                "x-go-type-skip-optional-pointer": true,
                "x-oapi-codegen-extra-tags": {
                  "db": "params"
                },
                "x-order": 7
              },
              "runAt": {
                "type": "string",
                "format": "date-time",
                "description": "Time the job becomes due.",
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
                "description": "Next scheduled time for recurring jobs.",
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
                "description": "Recurrence rule (cron expression) for repeating jobs. Absent for one-shot jobs.",
                "maxLength": 255,
                "x-oapi-codegen-extra-tags": {
                  "db": "recurrence"
                },
                "x-order": 10
              },
              "retryBudget": {
                "type": "integer",
                "description": "Remaining execution attempts for the job.",
                "minimum": 0,
                "x-oapi-codegen-extra-tags": {
                  "db": "retry_budget"
                },
                "x-order": 11
              },
              "status": {
                "type": "string",
                "description": "Lifecycle status of the job. Managed server-side through the claim, renew, release, pause and resume operations.",
                "enum": [
                  "pending",
                  "leased",
                  "succeeded",
                  "failed"
                ],
                "x-oapi-codegen-extra-tags": {
                  "db": "status"
                },
                "x-order": 12
              },
              "driverMode": {
                "type": "string",
                "description": "Execution driver mode for the job.",
                "maxLength": 255,
                "x-oapi-codegen-extra-tags": {
                  "db": "driver_mode"
                },
                "x-order": 13
              },
              "lastRunAt": {
                "type": "string",
                "format": "date-time",
                "description": "Time of the most recent execution attempt.",
                "nullable": true,
                "x-go-type": "core.NullTime",
                "x-go-type-import": {
                  "path": "github.com/meshery/schemas/models/core",
                  "name": "core"
                },
                "x-oapi-codegen-extra-tags": {
                  "db": "last_run_at"
                },
                "x-order": 14
              },
              "lastError": {
                "type": "string",
                "description": "Error reported by the most recent execution attempt.",
                "x-oapi-codegen-extra-tags": {
                  "db": "last_error"
                },
                "x-order": 15
              },
              "claimedBy": {
                "type": "string",
                "description": "Machine holding the lease. Server-managed; set only by claim, refused on every other path.",
                "maxLength": 255,
                "x-oapi-codegen-extra-tags": {
                  "db": "claimed_by"
                },
                "x-order": 16
              },
              "claimedAt": {
                "type": "string",
                "format": "date-time",
                "description": "Time the lease was claimed. Server-managed.",
                "nullable": true,
                "x-go-type": "core.NullTime",
                "x-go-type-import": {
                  "path": "github.com/meshery/schemas/models/core",
                  "name": "core"
                },
                "x-oapi-codegen-extra-tags": {
                  "db": "claimed_at"
                },
                "x-order": 17
              },
              "leaseExpiresAt": {
                "type": "string",
                "format": "date-time",
                "description": "Time the lease lapses when unrenewed. A holder with a null or expired lease is stale and the row returns to the pool. Server-managed; moved only by renew for the holder.",
                "nullable": true,
                "x-go-type": "core.NullTime",
                "x-go-type-import": {
                  "path": "github.com/meshery/schemas/models/core",
                  "name": "core"
                },
                "x-oapi-codegen-extra-tags": {
                  "db": "lease_expires_at"
                },
                "x-order": 18
              },
              "pausedAt": {
                "type": "string",
                "format": "date-time",
                "description": "Time the row was paused. Server-managed; set only by pause, cleared by resume.",
                "nullable": true,
                "x-go-type": "core.NullTime",
                "x-go-type-import": {
                  "path": "github.com/meshery/schemas/models/core",
                  "name": "core"
                },
                "x-oapi-codegen-extra-tags": {
                  "db": "paused_at"
                },
                "x-order": 19
              },
              "pausedBy": {
                "type": "string",
                "description": "Identity that paused the row. Server-managed.",
                "maxLength": 255,
                "x-oapi-codegen-extra-tags": {
                  "db": "paused_by"
                },
                "x-order": 20
              },
              "pauseReason": {
                "type": "string",
                "description": "Operator reason for pausing the row. Server-managed.",
                "x-oapi-codegen-extra-tags": {
                  "db": "pause_reason"
                },
                "x-order": 21
              },
              "fingerprint": {
                "type": "string",
                "description": "Hex digest over the canonical job values, typed so null, empty string, zero and false differ. Server-computed; used for conditional updates.",
                "minLength": 1,
                "maxLength": 255,
                "x-oapi-codegen-extra-tags": {
                  "db": "fingerprint"
                },
                "x-order": 22
              },
              "locked": {
                "type": "boolean",
                "description": "Computed projection. True while a live lease is held on the row.",
                "x-order": 23
              },
              "lockedBy": {
                "type": "string",
                "description": "Computed projection of the current lease holder.",
                "maxLength": 255,
                "x-order": 24
              },
              "lockedAt": {
                "type": "string",
                "format": "date-time",
                "description": "Computed projection of the current claim time.",
                "nullable": true,
                "x-go-type": "core.NullTime",
                "x-go-type-import": {
                  "path": "github.com/meshery/schemas/models/core",
                  "name": "core"
                },
                "x-order": 25
              },
              "lockStale": {
                "type": "boolean",
                "description": "Computed projection. True when the row carries a holder whose lease is null or expired, marking the row reclaimable.",
                "x-order": 26
              },
              "createdAt": {
                "description": "Timestamp of job lease creation.",
                "x-oapi-codegen-extra-tags": {
                  "db": "created_at"
                },
                "x-order": 27,
                "type": "string",
                "format": "date-time",
                "x-go-type-skip-optional-pointer": true
              },
              "updatedAt": {
                "description": "Timestamp of last job lease modification.",
                "x-oapi-codegen-extra-tags": {
                  "db": "updated_at"
                },
                "x-order": 28,
                "type": "string",
                "format": "date-time",
                "x-go-type-skip-optional-pointer": true
              },
              "deletedAt": {
                "type": "string",
                "format": "date-time",
                "description": "Timestamp when the job lease was soft-deleted.",
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
                "x-order": 29
              }
            },
            "nullable": true,
            "x-go-type": "JobLease",
            "x-oapi-codegen-extra-tags": {
              "json": "jobLease",
              "yaml": "jobLease"
            }
          }
        }
      },
      "JobLeasePage": {
        "type": "object",
        "description": "Paginated collection of job leases.",
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
          "jobLeases": {
            "type": "array",
            "items": {
              "x-go-type": "JobLease",
              "$schema": "http://json-schema.org/draft-07/schema#",
              "title": "Job Lease Schema",
              "description": "Server-returned job lease as persisted by meshery-cloud. A job lease is a\ndue-work row plus time-bound claim state, shared by Layer5 Cloud and\nBlowhorn: competing consumers claim, renew and release leases on due jobs,\nand pause scopes gate which rows are claimable. The claim race is decided\nserver-side in a single statement; losing racers receive null, never an\nerror. Claim columns (`claimedBy`, `claimedAt`, `leaseExpiresAt`) and pause\ncolumns (`pausedAt`, `pausedBy`, `pauseReason`) are server-managed and are\nrefused on CRUD paths; they change only through the claim, renew, release,\npause and resume operations. `locked`, `lockedBy`, `lockedAt` and\n`lockStale` are computed projections for schedule screens, not stored\ncolumns.\n",
              "type": "object",
              "additionalProperties": false,
              "required": [
                "id",
                "organizationId",
                "rowNumber",
                "command",
                "status",
                "fingerprint",
                "createdAt",
                "updatedAt"
              ],
              "properties": {
                "id": {
                  "description": "Server-generated job lease ID.",
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
                "rowNumber": {
                  "type": "integer",
                  "description": "Targetable row number within the organization's job set. Used for per-row claims and trigger-now overrides.",
                  "minimum": 0,
                  "x-oapi-codegen-extra-tags": {
                    "db": "row_number"
                  },
                  "x-order": 3
                },
                "command": {
                  "type": "string",
                  "description": "Job command to execute when the lease is held.",
                  "minLength": 1,
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "command"
                  },
                  "x-order": 4
                },
                "profile": {
                  "type": "string",
                  "description": "Profile reference the job runs against.",
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "profile"
                  },
                  "x-order": 5
                },
                "platform": {
                  "type": "string",
                  "description": "Target platform for the job (e.g. linkedin).",
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "platform"
                  },
                  "x-order": 6
                },
                "params": {
                  "type": "object",
                  "description": "Arbitrary job parameters, stored as a JSON blob.",
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "params"
                  },
                  "x-order": 7
                },
                "runAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Time the job becomes due.",
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
                  "description": "Next scheduled time for recurring jobs.",
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
                  "description": "Recurrence rule (cron expression) for repeating jobs. Absent for one-shot jobs.",
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "recurrence"
                  },
                  "x-order": 10
                },
                "retryBudget": {
                  "type": "integer",
                  "description": "Remaining execution attempts for the job.",
                  "minimum": 0,
                  "x-oapi-codegen-extra-tags": {
                    "db": "retry_budget"
                  },
                  "x-order": 11
                },
                "status": {
                  "type": "string",
                  "description": "Lifecycle status of the job. Managed server-side through the claim, renew, release, pause and resume operations.",
                  "enum": [
                    "pending",
                    "leased",
                    "succeeded",
                    "failed"
                  ],
                  "x-oapi-codegen-extra-tags": {
                    "db": "status"
                  },
                  "x-order": 12
                },
                "driverMode": {
                  "type": "string",
                  "description": "Execution driver mode for the job.",
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "driver_mode"
                  },
                  "x-order": 13
                },
                "lastRunAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Time of the most recent execution attempt.",
                  "nullable": true,
                  "x-go-type": "core.NullTime",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "last_run_at"
                  },
                  "x-order": 14
                },
                "lastError": {
                  "type": "string",
                  "description": "Error reported by the most recent execution attempt.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "last_error"
                  },
                  "x-order": 15
                },
                "claimedBy": {
                  "type": "string",
                  "description": "Machine holding the lease. Server-managed; set only by claim, refused on every other path.",
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "claimed_by"
                  },
                  "x-order": 16
                },
                "claimedAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Time the lease was claimed. Server-managed.",
                  "nullable": true,
                  "x-go-type": "core.NullTime",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "claimed_at"
                  },
                  "x-order": 17
                },
                "leaseExpiresAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Time the lease lapses when unrenewed. A holder with a null or expired lease is stale and the row returns to the pool. Server-managed; moved only by renew for the holder.",
                  "nullable": true,
                  "x-go-type": "core.NullTime",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "lease_expires_at"
                  },
                  "x-order": 18
                },
                "pausedAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Time the row was paused. Server-managed; set only by pause, cleared by resume.",
                  "nullable": true,
                  "x-go-type": "core.NullTime",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "paused_at"
                  },
                  "x-order": 19
                },
                "pausedBy": {
                  "type": "string",
                  "description": "Identity that paused the row. Server-managed.",
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "paused_by"
                  },
                  "x-order": 20
                },
                "pauseReason": {
                  "type": "string",
                  "description": "Operator reason for pausing the row. Server-managed.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "pause_reason"
                  },
                  "x-order": 21
                },
                "fingerprint": {
                  "type": "string",
                  "description": "Hex digest over the canonical job values, typed so null, empty string, zero and false differ. Server-computed; used for conditional updates.",
                  "minLength": 1,
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "fingerprint"
                  },
                  "x-order": 22
                },
                "locked": {
                  "type": "boolean",
                  "description": "Computed projection. True while a live lease is held on the row.",
                  "x-order": 23
                },
                "lockedBy": {
                  "type": "string",
                  "description": "Computed projection of the current lease holder.",
                  "maxLength": 255,
                  "x-order": 24
                },
                "lockedAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Computed projection of the current claim time.",
                  "nullable": true,
                  "x-go-type": "core.NullTime",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-order": 25
                },
                "lockStale": {
                  "type": "boolean",
                  "description": "Computed projection. True when the row carries a holder whose lease is null or expired, marking the row reclaimable.",
                  "x-order": 26
                },
                "createdAt": {
                  "description": "Timestamp of job lease creation.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at"
                  },
                  "x-order": 27,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updatedAt": {
                  "description": "Timestamp of last job lease modification.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at"
                  },
                  "x-order": 28,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "deletedAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Timestamp when the job lease was soft-deleted.",
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
                  "x-order": 29
                }
              }
            },
            "description": "Job leases included on this page of results."
          }
        }
      }
    }
  }
};

export default JobLeaseSchema;
