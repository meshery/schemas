/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const BlowhornRunSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "BlowhornRun",
    "description": "OpenAPI schema for the Blowhorn run ledger - idempotent appends of\nrun records plus analytics rollups.\n",
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
      "name": "blowhornRuns",
      "description": "Operations related to Blowhorn run records and analytics."
    }
  ],
  "paths": {
    "/api/blowhorn/runs": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "blowhornRuns"
        ],
        "summary": "List Blowhorn run records",
        "operationId": "listBlowhornRunRecords",
        "description": "Returns a paginated list of Blowhorn run records in the organization of the authenticated session.",
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
            "name": "runId",
            "in": "query",
            "required": false,
            "description": "Filter by run identifier.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "kind",
            "in": "query",
            "required": false,
            "description": "Filter by record kind.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "profile",
            "in": "query",
            "required": false,
            "description": "Filter by profile subject.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "platform",
            "in": "query",
            "required": false,
            "description": "Filter by platform (e.g. linkedin).",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Blowhorn run records page",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated collection of Blowhorn run records.",
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
                    "blowhornRunRecords": {
                      "type": "array",
                      "items": {
                        "x-go-type": "BlowhornRunRecord",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "title": "Blowhorn Run Record Schema",
                        "description": "Server-returned Blowhorn run record as persisted by meshery-cloud. Run\nrecords form an append-only ledger: appends replay idempotently on the\n(runId, kind, ts, profile, platform) tuple. The local spool stays on the\nmachine; only the append crosses the API. Writers also emit Cloud events\nso the organization audit trail sees publishes without a second read\npath.\n",
                        "type": "object",
                        "additionalProperties": false,
                        "required": [
                          "id",
                          "organizationId",
                          "runId",
                          "kind",
                          "ts",
                          "createdAt",
                          "updatedAt"
                        ],
                        "properties": {
                          "id": {
                            "description": "Server-generated Blowhorn run record ID.",
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
                          "runId": {
                            "type": "string",
                            "description": "Run identifier grouping the records of one execution.",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-go-name": "RunID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "run_id"
                            },
                            "x-order": 3
                          },
                          "kind": {
                            "type": "string",
                            "description": "Record kind within the run.",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "kind"
                            },
                            "x-order": 4
                          },
                          "ts": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Event time of the record within the run. Part of the idempotency tuple.",
                            "x-go-type": "time.Time",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "ts"
                            },
                            "x-order": 5
                          },
                          "profile": {
                            "type": "string",
                            "description": "Subject of the profile the record concerns.",
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "profile"
                            },
                            "x-order": 6
                          },
                          "platform": {
                            "type": "string",
                            "description": "Platform the record concerns (e.g. linkedin).",
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "platform"
                            },
                            "x-order": 7
                          },
                          "data": {
                            "type": "object",
                            "description": "Record values, stored as a JSON blob.",
                            "x-go-type": "core.Map",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "data"
                            },
                            "x-order": 8
                          },
                          "createdAt": {
                            "description": "Timestamp of Blowhorn run record creation.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at"
                            },
                            "x-order": 9,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp of last Blowhorn run record modification.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at"
                            },
                            "x-order": 10,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deletedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the Blowhorn run record was soft-deleted.",
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
                            "x-order": 11
                          }
                        }
                      },
                      "description": "Blowhorn run records included on this page of results."
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
          "blowhornRuns"
        ],
        "summary": "Append Blowhorn run record",
        "operationId": "appendBlowhornRunRecord",
        "description": "Appends a run record to the ledger, replaying idempotently on the\n(runId, kind, ts, profile, platform) tuple: replaying an existing\ntuple returns the stored record unchanged. Ownership is derived\nfrom the authenticated session; any client-supplied owner is\nignored.\n",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for appending a Blowhorn run record. Contains only\nclient-settable fields; the owning `organizationId` (derived from\nthe authenticated session) and the server-generated `createdAt` /\n`updatedAt` timestamps are intentionally excluded.\n",
                "required": [
                  "runId",
                  "kind",
                  "ts"
                ],
                "properties": {
                  "id": {
                    "description": "Existing Blowhorn run record ID; omit on append.",
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
                  "runId": {
                    "type": "string",
                    "description": "Run identifier grouping the records of one execution.",
                    "minLength": 1,
                    "maxLength": 255,
                    "x-go-name": "RunID"
                  },
                  "kind": {
                    "type": "string",
                    "description": "Record kind within the run.",
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "ts": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Event time of the record within the run. Part of the idempotency tuple."
                  },
                  "profile": {
                    "type": "string",
                    "description": "Subject of the profile the record concerns.",
                    "maxLength": 255
                  },
                  "platform": {
                    "type": "string",
                    "description": "Platform the record concerns (e.g. linkedin).",
                    "maxLength": 255
                  },
                  "data": {
                    "type": "object",
                    "description": "Record values, stored as a JSON blob.",
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
            "description": "Blowhorn run record appended",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Blowhorn Run Record Schema",
                  "description": "Server-returned Blowhorn run record as persisted by meshery-cloud. Run\nrecords form an append-only ledger: appends replay idempotently on the\n(runId, kind, ts, profile, platform) tuple. The local spool stays on the\nmachine; only the append crosses the API. Writers also emit Cloud events\nso the organization audit trail sees publishes without a second read\npath.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "runId",
                    "kind",
                    "ts",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Server-generated Blowhorn run record ID.",
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
                    "runId": {
                      "type": "string",
                      "description": "Run identifier grouping the records of one execution.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-go-name": "RunID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "run_id"
                      },
                      "x-order": 3
                    },
                    "kind": {
                      "type": "string",
                      "description": "Record kind within the run.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "kind"
                      },
                      "x-order": 4
                    },
                    "ts": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Event time of the record within the run. Part of the idempotency tuple.",
                      "x-go-type": "time.Time",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "ts"
                      },
                      "x-order": 5
                    },
                    "profile": {
                      "type": "string",
                      "description": "Subject of the profile the record concerns.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "profile"
                      },
                      "x-order": 6
                    },
                    "platform": {
                      "type": "string",
                      "description": "Platform the record concerns (e.g. linkedin).",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "platform"
                      },
                      "x-order": 7
                    },
                    "data": {
                      "type": "object",
                      "description": "Record values, stored as a JSON blob.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "data"
                      },
                      "x-order": 8
                    },
                    "createdAt": {
                      "description": "Timestamp of Blowhorn run record creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 9,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last Blowhorn run record modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 10,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the Blowhorn run record was soft-deleted.",
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
                      "x-order": 11
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
    "/api/blowhorn/analytics": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "blowhornRuns"
        ],
        "summary": "List Blowhorn analytics",
        "operationId": "listBlowhornAnalytics",
        "description": "Returns a paginated list of Blowhorn analytics rollups in the organization of the authenticated session.",
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
            "name": "scope",
            "in": "query",
            "required": false,
            "description": "Filter by aggregation scope.",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Blowhorn analytics page",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated collection of Blowhorn analytics rollups.",
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
                    "blowhornAnalytics": {
                      "type": "array",
                      "items": {
                        "x-go-type": "BlowhornAnalytics",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "title": "Blowhorn Analytics Schema",
                        "description": "Server-returned Blowhorn analytics rollup as persisted by\nmeshery-cloud. Analytics rows aggregate run records per scope and\nwindow; recording the same (scope, window) pair replaces the stored\nmetrics.\n",
                        "type": "object",
                        "additionalProperties": false,
                        "required": [
                          "id",
                          "organizationId",
                          "scope",
                          "metrics",
                          "createdAt",
                          "updatedAt"
                        ],
                        "properties": {
                          "id": {
                            "description": "Server-generated Blowhorn analytics ID.",
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
                          "scope": {
                            "type": "string",
                            "description": "Aggregation scope (e.g. profile subject or organization-wide rollup name).",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "scope"
                            },
                            "x-order": 3
                          },
                          "window": {
                            "type": "string",
                            "description": "Aggregation window the metrics cover (e.g. day, week).",
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "window"
                            },
                            "x-order": 4
                          },
                          "metrics": {
                            "type": "object",
                            "description": "Aggregated metrics, stored as a JSON blob.",
                            "x-go-type": "core.Map",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "metrics"
                            },
                            "x-order": 5
                          },
                          "computedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Time the metrics were computed.",
                            "nullable": true,
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "computed_at"
                            },
                            "x-order": 6
                          },
                          "createdAt": {
                            "description": "Timestamp of Blowhorn analytics creation.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at"
                            },
                            "x-order": 7,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp of last Blowhorn analytics modification.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at"
                            },
                            "x-order": 8,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          }
                        }
                      },
                      "description": "Blowhorn analytics rollups included on this page of results."
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
          "blowhornRuns"
        ],
        "summary": "Record Blowhorn analytics",
        "operationId": "recordBlowhornAnalytics",
        "description": "Records an analytics rollup, replacing the stored metrics for the\n(scope, window) pair. Ownership is derived from the authenticated\nsession; any client-supplied owner is ignored.\n",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for recording a Blowhorn analytics rollup. Contains only\nclient-settable fields; the owning `organizationId` (derived from\nthe authenticated session) and the server-generated `createdAt` /\n`updatedAt` timestamps are intentionally excluded.\n",
                "required": [
                  "scope",
                  "metrics"
                ],
                "properties": {
                  "id": {
                    "description": "Existing Blowhorn analytics ID for updates; omit on record.",
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
                  "scope": {
                    "type": "string",
                    "description": "Aggregation scope (e.g. profile subject or organization-wide rollup name).",
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "window": {
                    "type": "string",
                    "description": "Aggregation window the metrics cover (e.g. day, week).",
                    "maxLength": 255
                  },
                  "metrics": {
                    "type": "object",
                    "description": "Aggregated metrics, stored as a JSON blob.",
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    },
                    "x-go-type-skip-optional-pointer": true
                  },
                  "computedAt": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Time the metrics were computed."
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Blowhorn analytics recorded",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Blowhorn Analytics Schema",
                  "description": "Server-returned Blowhorn analytics rollup as persisted by\nmeshery-cloud. Analytics rows aggregate run records per scope and\nwindow; recording the same (scope, window) pair replaces the stored\nmetrics.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "scope",
                    "metrics",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Server-generated Blowhorn analytics ID.",
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
                    "scope": {
                      "type": "string",
                      "description": "Aggregation scope (e.g. profile subject or organization-wide rollup name).",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "scope"
                      },
                      "x-order": 3
                    },
                    "window": {
                      "type": "string",
                      "description": "Aggregation window the metrics cover (e.g. day, week).",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "window"
                      },
                      "x-order": 4
                    },
                    "metrics": {
                      "type": "object",
                      "description": "Aggregated metrics, stored as a JSON blob.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "metrics"
                      },
                      "x-order": 5
                    },
                    "computedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the metrics were computed.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "computed_at"
                      },
                      "x-order": 6
                    },
                    "createdAt": {
                      "description": "Timestamp of Blowhorn analytics creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 7,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last Blowhorn analytics modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 8,
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
      "BlowhornRunRecord": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Blowhorn Run Record Schema",
        "description": "Server-returned Blowhorn run record as persisted by meshery-cloud. Run\nrecords form an append-only ledger: appends replay idempotently on the\n(runId, kind, ts, profile, platform) tuple. The local spool stays on the\nmachine; only the append crosses the API. Writers also emit Cloud events\nso the organization audit trail sees publishes without a second read\npath.\n",
        "type": "object",
        "additionalProperties": false,
        "required": [
          "id",
          "organizationId",
          "runId",
          "kind",
          "ts",
          "createdAt",
          "updatedAt"
        ],
        "properties": {
          "id": {
            "description": "Server-generated Blowhorn run record ID.",
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
          "runId": {
            "type": "string",
            "description": "Run identifier grouping the records of one execution.",
            "minLength": 1,
            "maxLength": 255,
            "x-go-name": "RunID",
            "x-oapi-codegen-extra-tags": {
              "db": "run_id"
            },
            "x-order": 3
          },
          "kind": {
            "type": "string",
            "description": "Record kind within the run.",
            "minLength": 1,
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "kind"
            },
            "x-order": 4
          },
          "ts": {
            "type": "string",
            "format": "date-time",
            "description": "Event time of the record within the run. Part of the idempotency tuple.",
            "x-go-type": "time.Time",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "ts"
            },
            "x-order": 5
          },
          "profile": {
            "type": "string",
            "description": "Subject of the profile the record concerns.",
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "profile"
            },
            "x-order": 6
          },
          "platform": {
            "type": "string",
            "description": "Platform the record concerns (e.g. linkedin).",
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "platform"
            },
            "x-order": 7
          },
          "data": {
            "type": "object",
            "description": "Record values, stored as a JSON blob.",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "data"
            },
            "x-order": 8
          },
          "createdAt": {
            "description": "Timestamp of Blowhorn run record creation.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at"
            },
            "x-order": 9,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp of last Blowhorn run record modification.",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at"
            },
            "x-order": 10,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deletedAt": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the Blowhorn run record was soft-deleted.",
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
            "x-order": 11
          }
        }
      },
      "BlowhornAnalytics": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Blowhorn Analytics Schema",
        "description": "Server-returned Blowhorn analytics rollup as persisted by\nmeshery-cloud. Analytics rows aggregate run records per scope and\nwindow; recording the same (scope, window) pair replaces the stored\nmetrics.\n",
        "type": "object",
        "additionalProperties": false,
        "required": [
          "id",
          "organizationId",
          "scope",
          "metrics",
          "createdAt",
          "updatedAt"
        ],
        "properties": {
          "id": {
            "description": "Server-generated Blowhorn analytics ID.",
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
          "scope": {
            "type": "string",
            "description": "Aggregation scope (e.g. profile subject or organization-wide rollup name).",
            "minLength": 1,
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "scope"
            },
            "x-order": 3
          },
          "window": {
            "type": "string",
            "description": "Aggregation window the metrics cover (e.g. day, week).",
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "window"
            },
            "x-order": 4
          },
          "metrics": {
            "type": "object",
            "description": "Aggregated metrics, stored as a JSON blob.",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "metrics"
            },
            "x-order": 5
          },
          "computedAt": {
            "type": "string",
            "format": "date-time",
            "description": "Time the metrics were computed.",
            "nullable": true,
            "x-go-type": "core.NullTime",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "computed_at"
            },
            "x-order": 6
          },
          "createdAt": {
            "description": "Timestamp of Blowhorn analytics creation.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at"
            },
            "x-order": 7,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp of last Blowhorn analytics modification.",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at"
            },
            "x-order": 8,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "BlowhornRunRecordPayload": {
        "type": "object",
        "description": "Payload for appending a Blowhorn run record. Contains only\nclient-settable fields; the owning `organizationId` (derived from\nthe authenticated session) and the server-generated `createdAt` /\n`updatedAt` timestamps are intentionally excluded.\n",
        "required": [
          "runId",
          "kind",
          "ts"
        ],
        "properties": {
          "id": {
            "description": "Existing Blowhorn run record ID; omit on append.",
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
          "runId": {
            "type": "string",
            "description": "Run identifier grouping the records of one execution.",
            "minLength": 1,
            "maxLength": 255,
            "x-go-name": "RunID"
          },
          "kind": {
            "type": "string",
            "description": "Record kind within the run.",
            "minLength": 1,
            "maxLength": 255
          },
          "ts": {
            "type": "string",
            "format": "date-time",
            "description": "Event time of the record within the run. Part of the idempotency tuple."
          },
          "profile": {
            "type": "string",
            "description": "Subject of the profile the record concerns.",
            "maxLength": 255
          },
          "platform": {
            "type": "string",
            "description": "Platform the record concerns (e.g. linkedin).",
            "maxLength": 255
          },
          "data": {
            "type": "object",
            "description": "Record values, stored as a JSON blob.",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "BlowhornAnalyticsPayload": {
        "type": "object",
        "description": "Payload for recording a Blowhorn analytics rollup. Contains only\nclient-settable fields; the owning `organizationId` (derived from\nthe authenticated session) and the server-generated `createdAt` /\n`updatedAt` timestamps are intentionally excluded.\n",
        "required": [
          "scope",
          "metrics"
        ],
        "properties": {
          "id": {
            "description": "Existing Blowhorn analytics ID for updates; omit on record.",
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
          "scope": {
            "type": "string",
            "description": "Aggregation scope (e.g. profile subject or organization-wide rollup name).",
            "minLength": 1,
            "maxLength": 255
          },
          "window": {
            "type": "string",
            "description": "Aggregation window the metrics cover (e.g. day, week).",
            "maxLength": 255
          },
          "metrics": {
            "type": "object",
            "description": "Aggregated metrics, stored as a JSON blob.",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "computedAt": {
            "type": "string",
            "format": "date-time",
            "description": "Time the metrics were computed."
          }
        }
      },
      "BlowhornRunRecordPage": {
        "type": "object",
        "description": "Paginated collection of Blowhorn run records.",
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
          "blowhornRunRecords": {
            "type": "array",
            "items": {
              "x-go-type": "BlowhornRunRecord",
              "$schema": "http://json-schema.org/draft-07/schema#",
              "title": "Blowhorn Run Record Schema",
              "description": "Server-returned Blowhorn run record as persisted by meshery-cloud. Run\nrecords form an append-only ledger: appends replay idempotently on the\n(runId, kind, ts, profile, platform) tuple. The local spool stays on the\nmachine; only the append crosses the API. Writers also emit Cloud events\nso the organization audit trail sees publishes without a second read\npath.\n",
              "type": "object",
              "additionalProperties": false,
              "required": [
                "id",
                "organizationId",
                "runId",
                "kind",
                "ts",
                "createdAt",
                "updatedAt"
              ],
              "properties": {
                "id": {
                  "description": "Server-generated Blowhorn run record ID.",
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
                "runId": {
                  "type": "string",
                  "description": "Run identifier grouping the records of one execution.",
                  "minLength": 1,
                  "maxLength": 255,
                  "x-go-name": "RunID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "run_id"
                  },
                  "x-order": 3
                },
                "kind": {
                  "type": "string",
                  "description": "Record kind within the run.",
                  "minLength": 1,
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "kind"
                  },
                  "x-order": 4
                },
                "ts": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Event time of the record within the run. Part of the idempotency tuple.",
                  "x-go-type": "time.Time",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "ts"
                  },
                  "x-order": 5
                },
                "profile": {
                  "type": "string",
                  "description": "Subject of the profile the record concerns.",
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "profile"
                  },
                  "x-order": 6
                },
                "platform": {
                  "type": "string",
                  "description": "Platform the record concerns (e.g. linkedin).",
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "platform"
                  },
                  "x-order": 7
                },
                "data": {
                  "type": "object",
                  "description": "Record values, stored as a JSON blob.",
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "data"
                  },
                  "x-order": 8
                },
                "createdAt": {
                  "description": "Timestamp of Blowhorn run record creation.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at"
                  },
                  "x-order": 9,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updatedAt": {
                  "description": "Timestamp of last Blowhorn run record modification.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at"
                  },
                  "x-order": 10,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "deletedAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Timestamp when the Blowhorn run record was soft-deleted.",
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
                  "x-order": 11
                }
              }
            },
            "description": "Blowhorn run records included on this page of results."
          }
        }
      },
      "BlowhornAnalyticsPage": {
        "type": "object",
        "description": "Paginated collection of Blowhorn analytics rollups.",
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
          "blowhornAnalytics": {
            "type": "array",
            "items": {
              "x-go-type": "BlowhornAnalytics",
              "$schema": "http://json-schema.org/draft-07/schema#",
              "title": "Blowhorn Analytics Schema",
              "description": "Server-returned Blowhorn analytics rollup as persisted by\nmeshery-cloud. Analytics rows aggregate run records per scope and\nwindow; recording the same (scope, window) pair replaces the stored\nmetrics.\n",
              "type": "object",
              "additionalProperties": false,
              "required": [
                "id",
                "organizationId",
                "scope",
                "metrics",
                "createdAt",
                "updatedAt"
              ],
              "properties": {
                "id": {
                  "description": "Server-generated Blowhorn analytics ID.",
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
                "scope": {
                  "type": "string",
                  "description": "Aggregation scope (e.g. profile subject or organization-wide rollup name).",
                  "minLength": 1,
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "scope"
                  },
                  "x-order": 3
                },
                "window": {
                  "type": "string",
                  "description": "Aggregation window the metrics cover (e.g. day, week).",
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "window"
                  },
                  "x-order": 4
                },
                "metrics": {
                  "type": "object",
                  "description": "Aggregated metrics, stored as a JSON blob.",
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "metrics"
                  },
                  "x-order": 5
                },
                "computedAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Time the metrics were computed.",
                  "nullable": true,
                  "x-go-type": "core.NullTime",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "computed_at"
                  },
                  "x-order": 6
                },
                "createdAt": {
                  "description": "Timestamp of Blowhorn analytics creation.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at"
                  },
                  "x-order": 7,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updatedAt": {
                  "description": "Timestamp of last Blowhorn analytics modification.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at"
                  },
                  "x-order": 8,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                }
              }
            },
            "description": "Blowhorn analytics rollups included on this page of results."
          }
        }
      }
    }
  }
};

export default BlowhornRunSchema;
