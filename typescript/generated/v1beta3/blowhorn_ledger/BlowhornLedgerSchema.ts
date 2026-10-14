/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const BlowhornLedgerSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "BlowhornLedger",
    "description": "OpenAPI schema for the Blowhorn ledger - ledger-discriminated\nidempotent sets with claim-if-absent semantics, plus contacts and\nmentees.\n",
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
      "name": "blowhornLedger",
      "description": "Operations related to Blowhorn ledger entries, contacts and mentees."
    }
  ],
  "paths": {
    "/api/blowhorn/ledger": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "blowhornLedger"
        ],
        "summary": "List Blowhorn ledger entries",
        "operationId": "listBlowhornLedger",
        "description": "Returns a paginated list of Blowhorn ledger entries in the organization of the authenticated session, optionally filtered by ledger.",
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
            "name": "ledger",
            "in": "query",
            "required": false,
            "description": "Filter by ledger discriminator.",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Blowhorn ledger entries page",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated collection of Blowhorn ledger entries.",
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
                    "blowhornLedgerEntries": {
                      "type": "array",
                      "items": {
                        "x-go-type": "BlowhornLedgerEntry",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "title": "Blowhorn Ledger Entry Schema",
                        "description": "Server-returned Blowhorn ledger entry as persisted by meshery-cloud.\nLedger entries form ledger-discriminated idempotent sets keyed by\n(ledger, key): recording the same pair replays idempotently, and\nclaim-if-absent takes the entry for a holder exactly once.\n",
                        "type": "object",
                        "additionalProperties": false,
                        "required": [
                          "id",
                          "organizationId",
                          "ledger",
                          "entryKey",
                          "createdAt",
                          "updatedAt"
                        ],
                        "properties": {
                          "id": {
                            "description": "Server-generated Blowhorn ledger entry ID.",
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
                          "ledger": {
                            "type": "string",
                            "description": "Ledger discriminator naming the idempotent set.",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "ledger"
                            },
                            "x-order": 3
                          },
                          "entryKey": {
                            "type": "string",
                            "description": "Key within the ledger. Unique per ledger.",
                            "minLength": 1,
                            "maxLength": 1024,
                            "x-go-name": "EntryKey",
                            "x-oapi-codegen-extra-tags": {
                              "db": "entry_key"
                            },
                            "x-order": 4
                          },
                          "value": {
                            "type": "object",
                            "description": "Entry value, stored as a JSON blob.",
                            "x-go-type": "core.Map",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "value"
                            },
                            "x-order": 5
                          },
                          "claimedBy": {
                            "type": "string",
                            "description": "Holder that claimed the entry, if any. Set only by claim-if-absent.",
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "claimed_by"
                            },
                            "x-order": 6
                          },
                          "claimedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Time the entry was claimed, if any. Set only by claim-if-absent.",
                            "nullable": true,
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "claimed_at"
                            },
                            "x-order": 7
                          },
                          "createdAt": {
                            "description": "Timestamp of Blowhorn ledger entry creation.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at"
                            },
                            "x-order": 8,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp of last Blowhorn ledger entry modification.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at"
                            },
                            "x-order": 9,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          }
                        }
                      },
                      "description": "Blowhorn ledger entries included on this page of results."
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
          "blowhornLedger"
        ],
        "summary": "Record Blowhorn ledger entry",
        "operationId": "recordBlowhornLedgerEntry",
        "description": "Records a ledger entry, replaying idempotently on the (ledger,\nkey) pair: recording an existing pair returns the stored entry\nwith the supplied value merged. Ownership is derived from the\nauthenticated session; any client-supplied owner is ignored.\n",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for recording a Blowhorn ledger entry. Contains only\nclient-settable fields; the owning `organizationId` (derived from\nthe authenticated session), the claim columns and the\nserver-generated `createdAt` / `updatedAt` timestamps are\nintentionally excluded.\n",
                "required": [
                  "ledger",
                  "entryKey"
                ],
                "properties": {
                  "id": {
                    "description": "Existing Blowhorn ledger entry ID for updates; omit on record.",
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
                  "ledger": {
                    "type": "string",
                    "description": "Ledger discriminator naming the idempotent set.",
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "entryKey": {
                    "type": "string",
                    "description": "Key within the ledger. Unique per ledger.",
                    "minLength": 1,
                    "maxLength": 1024,
                    "x-go-name": "EntryKey"
                  },
                  "value": {
                    "type": "object",
                    "description": "Entry value, stored as a JSON blob.",
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
            "description": "Blowhorn ledger entry recorded",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Blowhorn Ledger Entry Schema",
                  "description": "Server-returned Blowhorn ledger entry as persisted by meshery-cloud.\nLedger entries form ledger-discriminated idempotent sets keyed by\n(ledger, key): recording the same pair replays idempotently, and\nclaim-if-absent takes the entry for a holder exactly once.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "ledger",
                    "entryKey",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Server-generated Blowhorn ledger entry ID.",
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
                    "ledger": {
                      "type": "string",
                      "description": "Ledger discriminator naming the idempotent set.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "ledger"
                      },
                      "x-order": 3
                    },
                    "entryKey": {
                      "type": "string",
                      "description": "Key within the ledger. Unique per ledger.",
                      "minLength": 1,
                      "maxLength": 1024,
                      "x-go-name": "EntryKey",
                      "x-oapi-codegen-extra-tags": {
                        "db": "entry_key"
                      },
                      "x-order": 4
                    },
                    "value": {
                      "type": "object",
                      "description": "Entry value, stored as a JSON blob.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "value"
                      },
                      "x-order": 5
                    },
                    "claimedBy": {
                      "type": "string",
                      "description": "Holder that claimed the entry, if any. Set only by claim-if-absent.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "claimed_by"
                      },
                      "x-order": 6
                    },
                    "claimedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the entry was claimed, if any. Set only by claim-if-absent.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "claimed_at"
                      },
                      "x-order": 7
                    },
                    "createdAt": {
                      "description": "Timestamp of Blowhorn ledger entry creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 8,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last Blowhorn ledger entry modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 9,
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
    },
    "/api/blowhorn/ledger/{blowhornLedgerEntryId}": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "blowhornLedger"
        ],
        "summary": "Get Blowhorn ledger entry by ID",
        "operationId": "getBlowhornLedgerEntry",
        "parameters": [
          {
            "name": "blowhornLedgerEntryId",
            "in": "path",
            "description": "Blowhorn ledger entry ID",
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
            "description": "Blowhorn ledger entry response",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Blowhorn Ledger Entry Schema",
                  "description": "Server-returned Blowhorn ledger entry as persisted by meshery-cloud.\nLedger entries form ledger-discriminated idempotent sets keyed by\n(ledger, key): recording the same pair replays idempotently, and\nclaim-if-absent takes the entry for a holder exactly once.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "ledger",
                    "entryKey",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Server-generated Blowhorn ledger entry ID.",
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
                    "ledger": {
                      "type": "string",
                      "description": "Ledger discriminator naming the idempotent set.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "ledger"
                      },
                      "x-order": 3
                    },
                    "entryKey": {
                      "type": "string",
                      "description": "Key within the ledger. Unique per ledger.",
                      "minLength": 1,
                      "maxLength": 1024,
                      "x-go-name": "EntryKey",
                      "x-oapi-codegen-extra-tags": {
                        "db": "entry_key"
                      },
                      "x-order": 4
                    },
                    "value": {
                      "type": "object",
                      "description": "Entry value, stored as a JSON blob.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "value"
                      },
                      "x-order": 5
                    },
                    "claimedBy": {
                      "type": "string",
                      "description": "Holder that claimed the entry, if any. Set only by claim-if-absent.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "claimed_by"
                      },
                      "x-order": 6
                    },
                    "claimedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the entry was claimed, if any. Set only by claim-if-absent.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "claimed_at"
                      },
                      "x-order": 7
                    },
                    "createdAt": {
                      "description": "Timestamp of Blowhorn ledger entry creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 8,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last Blowhorn ledger entry modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 9,
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
          "blowhornLedger"
        ],
        "summary": "Delete Blowhorn ledger entry",
        "operationId": "deleteBlowhornLedgerEntry",
        "description": "Removes the ledger entry from its idempotent set.",
        "parameters": [
          {
            "name": "blowhornLedgerEntryId",
            "in": "path",
            "description": "Blowhorn ledger entry ID",
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
            "description": "Blowhorn ledger entry deleted"
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
    "/api/blowhorn/ledger/{blowhornLedgerEntryId}/claim": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "blowhornLedger"
        ],
        "summary": "Claim Blowhorn ledger entry if absent",
        "operationId": "claimIfAbsentBlowhornLedgerEntry",
        "description": "Takes the entry for the holder named by `holder` when unclaimed.\nAn already-claimed entry is refused with a 409 - exactly-once\nsemantics for claim-if-absent sets.\n",
        "parameters": [
          {
            "name": "blowhornLedgerEntryId",
            "in": "path",
            "description": "Blowhorn ledger entry ID",
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
                "description": "Claim-if-absent payload taking an unclaimed entry for a holder.",
                "required": [
                  "holder"
                ],
                "properties": {
                  "holder": {
                    "type": "string",
                    "description": "Holder taking the entry. Refused with a 409 when the entry is already claimed.",
                    "minLength": 1,
                    "maxLength": 255
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Blowhorn ledger entry claimed",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Blowhorn Ledger Entry Schema",
                  "description": "Server-returned Blowhorn ledger entry as persisted by meshery-cloud.\nLedger entries form ledger-discriminated idempotent sets keyed by\n(ledger, key): recording the same pair replays idempotently, and\nclaim-if-absent takes the entry for a holder exactly once.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "ledger",
                    "entryKey",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Server-generated Blowhorn ledger entry ID.",
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
                    "ledger": {
                      "type": "string",
                      "description": "Ledger discriminator naming the idempotent set.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "ledger"
                      },
                      "x-order": 3
                    },
                    "entryKey": {
                      "type": "string",
                      "description": "Key within the ledger. Unique per ledger.",
                      "minLength": 1,
                      "maxLength": 1024,
                      "x-go-name": "EntryKey",
                      "x-oapi-codegen-extra-tags": {
                        "db": "entry_key"
                      },
                      "x-order": 4
                    },
                    "value": {
                      "type": "object",
                      "description": "Entry value, stored as a JSON blob.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "value"
                      },
                      "x-order": 5
                    },
                    "claimedBy": {
                      "type": "string",
                      "description": "Holder that claimed the entry, if any. Set only by claim-if-absent.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "claimed_by"
                      },
                      "x-order": 6
                    },
                    "claimedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the entry was claimed, if any. Set only by claim-if-absent.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "claimed_at"
                      },
                      "x-order": 7
                    },
                    "createdAt": {
                      "description": "Timestamp of Blowhorn ledger entry creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 8,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last Blowhorn ledger entry modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 9,
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
          "409": {
            "description": "Conflict - the ledger entry is already claimed",
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
    "/api/blowhorn/contacts": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "blowhornLedger"
        ],
        "summary": "List Blowhorn contacts",
        "operationId": "listBlowhornContacts",
        "description": "Returns a paginated list of Blowhorn contacts in the organization of the authenticated session, optionally filtered by platform.",
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
            "description": "Filter by platform (e.g. linkedin, github).",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Blowhorn contacts page",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated collection of Blowhorn contacts.",
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
                    "blowhornContacts": {
                      "type": "array",
                      "items": {
                        "x-go-type": "BlowhornContact",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "title": "Blowhorn Contact Schema",
                        "description": "Server-returned Blowhorn contact as persisted by meshery-cloud. Contacts\nare upserted per platform handle and back the credential-less platform\nopt-in rows.\n",
                        "type": "object",
                        "additionalProperties": false,
                        "required": [
                          "id",
                          "organizationId",
                          "platform",
                          "handle",
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
                          "platform": {
                            "type": "string",
                            "description": "Platform the contact belongs to (e.g. linkedin, github).",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "platform"
                            },
                            "x-order": 3
                          },
                          "handle": {
                            "type": "string",
                            "description": "Platform-side handle identifying the contact. Unique per platform within the organization.",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "handle"
                            },
                            "x-order": 4
                          },
                          "displayName": {
                            "type": "string",
                            "description": "Human-readable contact name.",
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "display_name"
                            },
                            "x-order": 5
                          },
                          "profileUrl": {
                            "type": "string",
                            "description": "Platform-side profile URL for the contact.",
                            "maxLength": 1024,
                            "x-oapi-codegen-extra-tags": {
                              "db": "profile_url"
                            },
                            "x-order": 6
                          },
                          "metadata": {
                            "type": "object",
                            "description": "Contact metadata, stored as a JSON blob.",
                            "x-go-type": "core.Map",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "metadata"
                            },
                            "x-order": 7
                          },
                          "createdAt": {
                            "description": "Timestamp of Blowhorn contact creation.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at"
                            },
                            "x-order": 8,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp of last Blowhorn contact modification.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at"
                            },
                            "x-order": 9,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          }
                        }
                      },
                      "description": "Blowhorn contacts included on this page of results."
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
          "blowhornLedger"
        ],
        "summary": "Upsert Blowhorn contact",
        "operationId": "upsertBlowhornContact",
        "description": "Creates a new Blowhorn contact when no `id` is supplied, or\nupdates the entry matching the provided `id`. Contacts are keyed\nby the (platform, handle) pair within the organization. Ownership\nis derived from the authenticated session; any client-supplied\nowner is ignored.\n",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for creating or updating a Blowhorn contact. Contains\nonly client-settable fields; the owning `organizationId` (derived\nfrom the authenticated session) and the server-generated\n`createdAt` / `updatedAt` timestamps are intentionally excluded.\n",
                "required": [
                  "platform",
                  "handle"
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
                  "platform": {
                    "type": "string",
                    "description": "Platform the contact belongs to (e.g. linkedin, github).",
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "handle": {
                    "type": "string",
                    "description": "Platform-side handle identifying the contact. Unique per platform within the organization.",
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "displayName": {
                    "type": "string",
                    "description": "Human-readable contact name.",
                    "maxLength": 255
                  },
                  "profileUrl": {
                    "type": "string",
                    "description": "Platform-side profile URL for the contact.",
                    "maxLength": 1024
                  },
                  "metadata": {
                    "type": "object",
                    "description": "Contact metadata, stored as a JSON blob.",
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
            "description": "Blowhorn contact saved",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Blowhorn Contact Schema",
                  "description": "Server-returned Blowhorn contact as persisted by meshery-cloud. Contacts\nare upserted per platform handle and back the credential-less platform\nopt-in rows.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "platform",
                    "handle",
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
                    "platform": {
                      "type": "string",
                      "description": "Platform the contact belongs to (e.g. linkedin, github).",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "platform"
                      },
                      "x-order": 3
                    },
                    "handle": {
                      "type": "string",
                      "description": "Platform-side handle identifying the contact. Unique per platform within the organization.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "handle"
                      },
                      "x-order": 4
                    },
                    "displayName": {
                      "type": "string",
                      "description": "Human-readable contact name.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "display_name"
                      },
                      "x-order": 5
                    },
                    "profileUrl": {
                      "type": "string",
                      "description": "Platform-side profile URL for the contact.",
                      "maxLength": 1024,
                      "x-oapi-codegen-extra-tags": {
                        "db": "profile_url"
                      },
                      "x-order": 6
                    },
                    "metadata": {
                      "type": "object",
                      "description": "Contact metadata, stored as a JSON blob.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata"
                      },
                      "x-order": 7
                    },
                    "createdAt": {
                      "description": "Timestamp of Blowhorn contact creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 8,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last Blowhorn contact modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 9,
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
    },
    "/api/blowhorn/mentees": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "blowhornLedger"
        ],
        "summary": "List Blowhorn mentees",
        "operationId": "listBlowhornMentees",
        "description": "Returns a paginated list of Blowhorn mentees in the organization of the authenticated session.",
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
          }
        ],
        "responses": {
          "200": {
            "description": "Blowhorn mentees page",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated collection of Blowhorn mentees.",
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
                    "blowhornMentees": {
                      "type": "array",
                      "items": {
                        "x-go-type": "BlowhornMentee",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "title": "Blowhorn Mentee Schema",
                        "description": "Server-returned Blowhorn mentee as persisted by meshery-cloud. Mentees\ntrack mentored subjects through stages; recording a mentee and dropping\nit is a single operation that stamps the drop time.\n",
                        "type": "object",
                        "additionalProperties": false,
                        "required": [
                          "id",
                          "organizationId",
                          "subject",
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
                          "subject": {
                            "type": "string",
                            "description": "Mentored subject.",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "subject"
                            },
                            "x-order": 3
                          },
                          "stage": {
                            "type": "string",
                            "description": "Mentorship stage of the subject.",
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "stage"
                            },
                            "x-order": 4
                          },
                          "metadata": {
                            "type": "object",
                            "description": "Mentee metadata, stored as a JSON blob.",
                            "x-go-type": "core.Map",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "metadata"
                            },
                            "x-order": 5
                          },
                          "droppedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Time the mentee was recorded and dropped, if any. Set only by the record-and-drop operation.",
                            "nullable": true,
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "dropped_at"
                            },
                            "x-order": 6
                          },
                          "createdAt": {
                            "description": "Timestamp of Blowhorn mentee creation.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at"
                            },
                            "x-order": 7,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp of last Blowhorn mentee modification.",
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
                      "description": "Blowhorn mentees included on this page of results."
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
          "blowhornLedger"
        ],
        "summary": "Upsert Blowhorn mentee",
        "operationId": "upsertBlowhornMentee",
        "description": "Creates a new Blowhorn mentee when no `id` is supplied, or\nupdates the entry matching the provided `id`. Ownership is\nderived from the authenticated session; any client-supplied\nowner is ignored.\n",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for creating or updating a Blowhorn mentee. Contains only\nclient-settable fields; the owning `organizationId` (derived from\nthe authenticated session), the server-managed `droppedAt` and\nthe server-generated `createdAt` / `updatedAt` timestamps are\nintentionally excluded.\n",
                "required": [
                  "subject"
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
                  "subject": {
                    "type": "string",
                    "description": "Mentored subject.",
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "stage": {
                    "type": "string",
                    "description": "Mentorship stage of the subject.",
                    "maxLength": 255
                  },
                  "metadata": {
                    "type": "object",
                    "description": "Mentee metadata, stored as a JSON blob.",
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
            "description": "Blowhorn mentee saved",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Blowhorn Mentee Schema",
                  "description": "Server-returned Blowhorn mentee as persisted by meshery-cloud. Mentees\ntrack mentored subjects through stages; recording a mentee and dropping\nit is a single operation that stamps the drop time.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "subject",
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
                    "subject": {
                      "type": "string",
                      "description": "Mentored subject.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "subject"
                      },
                      "x-order": 3
                    },
                    "stage": {
                      "type": "string",
                      "description": "Mentorship stage of the subject.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "stage"
                      },
                      "x-order": 4
                    },
                    "metadata": {
                      "type": "object",
                      "description": "Mentee metadata, stored as a JSON blob.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata"
                      },
                      "x-order": 5
                    },
                    "droppedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the mentee was recorded and dropped, if any. Set only by the record-and-drop operation.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "dropped_at"
                      },
                      "x-order": 6
                    },
                    "createdAt": {
                      "description": "Timestamp of Blowhorn mentee creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 7,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last Blowhorn mentee modification.",
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
    },
    "/api/blowhorn/mentees/{blowhornMenteeId}": {
      "delete": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "blowhornLedger"
        ],
        "summary": "Delete Blowhorn mentee",
        "operationId": "deleteBlowhornMentee",
        "description": "Removes the Blowhorn mentee.",
        "parameters": [
          {
            "name": "blowhornMenteeId",
            "in": "path",
            "description": "Blowhorn mentee ID",
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
            "description": "Blowhorn mentee deleted"
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
    "/api/blowhorn/mentees/{blowhornMenteeId}/drop": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "blowhornLedger"
        ],
        "summary": "Record and drop Blowhorn mentee",
        "operationId": "recordAndDropBlowhornMentee",
        "description": "Records the mentee and drops it in a single operation, stamping\nthe drop time on the returned entry.\n",
        "parameters": [
          {
            "name": "blowhornMenteeId",
            "in": "path",
            "description": "Blowhorn mentee ID",
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
                "description": "Record-and-drop payload.",
                "properties": {
                  "stage": {
                    "type": "string",
                    "description": "Final mentorship stage recorded with the drop.",
                    "maxLength": 255
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Blowhorn mentee recorded and dropped",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Blowhorn Mentee Schema",
                  "description": "Server-returned Blowhorn mentee as persisted by meshery-cloud. Mentees\ntrack mentored subjects through stages; recording a mentee and dropping\nit is a single operation that stamps the drop time.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "subject",
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
                    "subject": {
                      "type": "string",
                      "description": "Mentored subject.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "subject"
                      },
                      "x-order": 3
                    },
                    "stage": {
                      "type": "string",
                      "description": "Mentorship stage of the subject.",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "stage"
                      },
                      "x-order": 4
                    },
                    "metadata": {
                      "type": "object",
                      "description": "Mentee metadata, stored as a JSON blob.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata"
                      },
                      "x-order": 5
                    },
                    "droppedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the mentee was recorded and dropped, if any. Set only by the record-and-drop operation.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "dropped_at"
                      },
                      "x-order": 6
                    },
                    "createdAt": {
                      "description": "Timestamp of Blowhorn mentee creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 7,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last Blowhorn mentee modification.",
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
        "description": "Conflict - the ledger entry is already claimed",
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
      "blowhornLedgerEntryId": {
        "name": "blowhornLedgerEntryId",
        "in": "path",
        "description": "Blowhorn ledger entry ID",
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
      "blowhornMenteeId": {
        "name": "blowhornMenteeId",
        "in": "path",
        "description": "Blowhorn mentee ID",
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
      "BlowhornLedgerEntry": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Blowhorn Ledger Entry Schema",
        "description": "Server-returned Blowhorn ledger entry as persisted by meshery-cloud.\nLedger entries form ledger-discriminated idempotent sets keyed by\n(ledger, key): recording the same pair replays idempotently, and\nclaim-if-absent takes the entry for a holder exactly once.\n",
        "type": "object",
        "additionalProperties": false,
        "required": [
          "id",
          "organizationId",
          "ledger",
          "entryKey",
          "createdAt",
          "updatedAt"
        ],
        "properties": {
          "id": {
            "description": "Server-generated Blowhorn ledger entry ID.",
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
          "ledger": {
            "type": "string",
            "description": "Ledger discriminator naming the idempotent set.",
            "minLength": 1,
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "ledger"
            },
            "x-order": 3
          },
          "entryKey": {
            "type": "string",
            "description": "Key within the ledger. Unique per ledger.",
            "minLength": 1,
            "maxLength": 1024,
            "x-go-name": "EntryKey",
            "x-oapi-codegen-extra-tags": {
              "db": "entry_key"
            },
            "x-order": 4
          },
          "value": {
            "type": "object",
            "description": "Entry value, stored as a JSON blob.",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "value"
            },
            "x-order": 5
          },
          "claimedBy": {
            "type": "string",
            "description": "Holder that claimed the entry, if any. Set only by claim-if-absent.",
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "claimed_by"
            },
            "x-order": 6
          },
          "claimedAt": {
            "type": "string",
            "format": "date-time",
            "description": "Time the entry was claimed, if any. Set only by claim-if-absent.",
            "nullable": true,
            "x-go-type": "core.NullTime",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "claimed_at"
            },
            "x-order": 7
          },
          "createdAt": {
            "description": "Timestamp of Blowhorn ledger entry creation.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at"
            },
            "x-order": 8,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp of last Blowhorn ledger entry modification.",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at"
            },
            "x-order": 9,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "BlowhornContact": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Blowhorn Contact Schema",
        "description": "Server-returned Blowhorn contact as persisted by meshery-cloud. Contacts\nare upserted per platform handle and back the credential-less platform\nopt-in rows.\n",
        "type": "object",
        "additionalProperties": false,
        "required": [
          "id",
          "organizationId",
          "platform",
          "handle",
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
          "platform": {
            "type": "string",
            "description": "Platform the contact belongs to (e.g. linkedin, github).",
            "minLength": 1,
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "platform"
            },
            "x-order": 3
          },
          "handle": {
            "type": "string",
            "description": "Platform-side handle identifying the contact. Unique per platform within the organization.",
            "minLength": 1,
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "handle"
            },
            "x-order": 4
          },
          "displayName": {
            "type": "string",
            "description": "Human-readable contact name.",
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "display_name"
            },
            "x-order": 5
          },
          "profileUrl": {
            "type": "string",
            "description": "Platform-side profile URL for the contact.",
            "maxLength": 1024,
            "x-oapi-codegen-extra-tags": {
              "db": "profile_url"
            },
            "x-order": 6
          },
          "metadata": {
            "type": "object",
            "description": "Contact metadata, stored as a JSON blob.",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "metadata"
            },
            "x-order": 7
          },
          "createdAt": {
            "description": "Timestamp of Blowhorn contact creation.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at"
            },
            "x-order": 8,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp of last Blowhorn contact modification.",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at"
            },
            "x-order": 9,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "BlowhornMentee": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Blowhorn Mentee Schema",
        "description": "Server-returned Blowhorn mentee as persisted by meshery-cloud. Mentees\ntrack mentored subjects through stages; recording a mentee and dropping\nit is a single operation that stamps the drop time.\n",
        "type": "object",
        "additionalProperties": false,
        "required": [
          "id",
          "organizationId",
          "subject",
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
          "subject": {
            "type": "string",
            "description": "Mentored subject.",
            "minLength": 1,
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "subject"
            },
            "x-order": 3
          },
          "stage": {
            "type": "string",
            "description": "Mentorship stage of the subject.",
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "stage"
            },
            "x-order": 4
          },
          "metadata": {
            "type": "object",
            "description": "Mentee metadata, stored as a JSON blob.",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "metadata"
            },
            "x-order": 5
          },
          "droppedAt": {
            "type": "string",
            "format": "date-time",
            "description": "Time the mentee was recorded and dropped, if any. Set only by the record-and-drop operation.",
            "nullable": true,
            "x-go-type": "core.NullTime",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "dropped_at"
            },
            "x-order": 6
          },
          "createdAt": {
            "description": "Timestamp of Blowhorn mentee creation.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at"
            },
            "x-order": 7,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp of last Blowhorn mentee modification.",
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
      "BlowhornLedgerPayload": {
        "type": "object",
        "description": "Payload for recording a Blowhorn ledger entry. Contains only\nclient-settable fields; the owning `organizationId` (derived from\nthe authenticated session), the claim columns and the\nserver-generated `createdAt` / `updatedAt` timestamps are\nintentionally excluded.\n",
        "required": [
          "ledger",
          "entryKey"
        ],
        "properties": {
          "id": {
            "description": "Existing Blowhorn ledger entry ID for updates; omit on record.",
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
          "ledger": {
            "type": "string",
            "description": "Ledger discriminator naming the idempotent set.",
            "minLength": 1,
            "maxLength": 255
          },
          "entryKey": {
            "type": "string",
            "description": "Key within the ledger. Unique per ledger.",
            "minLength": 1,
            "maxLength": 1024,
            "x-go-name": "EntryKey"
          },
          "value": {
            "type": "object",
            "description": "Entry value, stored as a JSON blob.",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "BlowhornLedgerClaimRequest": {
        "type": "object",
        "description": "Claim-if-absent payload taking an unclaimed entry for a holder.",
        "required": [
          "holder"
        ],
        "properties": {
          "holder": {
            "type": "string",
            "description": "Holder taking the entry. Refused with a 409 when the entry is already claimed.",
            "minLength": 1,
            "maxLength": 255
          }
        }
      },
      "BlowhornContactPayload": {
        "type": "object",
        "description": "Payload for creating or updating a Blowhorn contact. Contains\nonly client-settable fields; the owning `organizationId` (derived\nfrom the authenticated session) and the server-generated\n`createdAt` / `updatedAt` timestamps are intentionally excluded.\n",
        "required": [
          "platform",
          "handle"
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
          "platform": {
            "type": "string",
            "description": "Platform the contact belongs to (e.g. linkedin, github).",
            "minLength": 1,
            "maxLength": 255
          },
          "handle": {
            "type": "string",
            "description": "Platform-side handle identifying the contact. Unique per platform within the organization.",
            "minLength": 1,
            "maxLength": 255
          },
          "displayName": {
            "type": "string",
            "description": "Human-readable contact name.",
            "maxLength": 255
          },
          "profileUrl": {
            "type": "string",
            "description": "Platform-side profile URL for the contact.",
            "maxLength": 1024
          },
          "metadata": {
            "type": "object",
            "description": "Contact metadata, stored as a JSON blob.",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "BlowhornMenteePayload": {
        "type": "object",
        "description": "Payload for creating or updating a Blowhorn mentee. Contains only\nclient-settable fields; the owning `organizationId` (derived from\nthe authenticated session), the server-managed `droppedAt` and\nthe server-generated `createdAt` / `updatedAt` timestamps are\nintentionally excluded.\n",
        "required": [
          "subject"
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
          "subject": {
            "type": "string",
            "description": "Mentored subject.",
            "minLength": 1,
            "maxLength": 255
          },
          "stage": {
            "type": "string",
            "description": "Mentorship stage of the subject.",
            "maxLength": 255
          },
          "metadata": {
            "type": "object",
            "description": "Mentee metadata, stored as a JSON blob.",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "BlowhornMenteeDropRequest": {
        "type": "object",
        "description": "Record-and-drop payload.",
        "properties": {
          "stage": {
            "type": "string",
            "description": "Final mentorship stage recorded with the drop.",
            "maxLength": 255
          }
        }
      },
      "BlowhornLedgerPage": {
        "type": "object",
        "description": "Paginated collection of Blowhorn ledger entries.",
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
          "blowhornLedgerEntries": {
            "type": "array",
            "items": {
              "x-go-type": "BlowhornLedgerEntry",
              "$schema": "http://json-schema.org/draft-07/schema#",
              "title": "Blowhorn Ledger Entry Schema",
              "description": "Server-returned Blowhorn ledger entry as persisted by meshery-cloud.\nLedger entries form ledger-discriminated idempotent sets keyed by\n(ledger, key): recording the same pair replays idempotently, and\nclaim-if-absent takes the entry for a holder exactly once.\n",
              "type": "object",
              "additionalProperties": false,
              "required": [
                "id",
                "organizationId",
                "ledger",
                "entryKey",
                "createdAt",
                "updatedAt"
              ],
              "properties": {
                "id": {
                  "description": "Server-generated Blowhorn ledger entry ID.",
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
                "ledger": {
                  "type": "string",
                  "description": "Ledger discriminator naming the idempotent set.",
                  "minLength": 1,
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "ledger"
                  },
                  "x-order": 3
                },
                "entryKey": {
                  "type": "string",
                  "description": "Key within the ledger. Unique per ledger.",
                  "minLength": 1,
                  "maxLength": 1024,
                  "x-go-name": "EntryKey",
                  "x-oapi-codegen-extra-tags": {
                    "db": "entry_key"
                  },
                  "x-order": 4
                },
                "value": {
                  "type": "object",
                  "description": "Entry value, stored as a JSON blob.",
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "value"
                  },
                  "x-order": 5
                },
                "claimedBy": {
                  "type": "string",
                  "description": "Holder that claimed the entry, if any. Set only by claim-if-absent.",
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "claimed_by"
                  },
                  "x-order": 6
                },
                "claimedAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Time the entry was claimed, if any. Set only by claim-if-absent.",
                  "nullable": true,
                  "x-go-type": "core.NullTime",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "claimed_at"
                  },
                  "x-order": 7
                },
                "createdAt": {
                  "description": "Timestamp of Blowhorn ledger entry creation.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at"
                  },
                  "x-order": 8,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updatedAt": {
                  "description": "Timestamp of last Blowhorn ledger entry modification.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at"
                  },
                  "x-order": 9,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                }
              }
            },
            "description": "Blowhorn ledger entries included on this page of results."
          }
        }
      },
      "BlowhornContactPage": {
        "type": "object",
        "description": "Paginated collection of Blowhorn contacts.",
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
          "blowhornContacts": {
            "type": "array",
            "items": {
              "x-go-type": "BlowhornContact",
              "$schema": "http://json-schema.org/draft-07/schema#",
              "title": "Blowhorn Contact Schema",
              "description": "Server-returned Blowhorn contact as persisted by meshery-cloud. Contacts\nare upserted per platform handle and back the credential-less platform\nopt-in rows.\n",
              "type": "object",
              "additionalProperties": false,
              "required": [
                "id",
                "organizationId",
                "platform",
                "handle",
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
                "platform": {
                  "type": "string",
                  "description": "Platform the contact belongs to (e.g. linkedin, github).",
                  "minLength": 1,
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "platform"
                  },
                  "x-order": 3
                },
                "handle": {
                  "type": "string",
                  "description": "Platform-side handle identifying the contact. Unique per platform within the organization.",
                  "minLength": 1,
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "handle"
                  },
                  "x-order": 4
                },
                "displayName": {
                  "type": "string",
                  "description": "Human-readable contact name.",
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "display_name"
                  },
                  "x-order": 5
                },
                "profileUrl": {
                  "type": "string",
                  "description": "Platform-side profile URL for the contact.",
                  "maxLength": 1024,
                  "x-oapi-codegen-extra-tags": {
                    "db": "profile_url"
                  },
                  "x-order": 6
                },
                "metadata": {
                  "type": "object",
                  "description": "Contact metadata, stored as a JSON blob.",
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "metadata"
                  },
                  "x-order": 7
                },
                "createdAt": {
                  "description": "Timestamp of Blowhorn contact creation.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at"
                  },
                  "x-order": 8,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updatedAt": {
                  "description": "Timestamp of last Blowhorn contact modification.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at"
                  },
                  "x-order": 9,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                }
              }
            },
            "description": "Blowhorn contacts included on this page of results."
          }
        }
      },
      "BlowhornMenteePage": {
        "type": "object",
        "description": "Paginated collection of Blowhorn mentees.",
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
          "blowhornMentees": {
            "type": "array",
            "items": {
              "x-go-type": "BlowhornMentee",
              "$schema": "http://json-schema.org/draft-07/schema#",
              "title": "Blowhorn Mentee Schema",
              "description": "Server-returned Blowhorn mentee as persisted by meshery-cloud. Mentees\ntrack mentored subjects through stages; recording a mentee and dropping\nit is a single operation that stamps the drop time.\n",
              "type": "object",
              "additionalProperties": false,
              "required": [
                "id",
                "organizationId",
                "subject",
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
                "subject": {
                  "type": "string",
                  "description": "Mentored subject.",
                  "minLength": 1,
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "subject"
                  },
                  "x-order": 3
                },
                "stage": {
                  "type": "string",
                  "description": "Mentorship stage of the subject.",
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "stage"
                  },
                  "x-order": 4
                },
                "metadata": {
                  "type": "object",
                  "description": "Mentee metadata, stored as a JSON blob.",
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "metadata"
                  },
                  "x-order": 5
                },
                "droppedAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Time the mentee was recorded and dropped, if any. Set only by the record-and-drop operation.",
                  "nullable": true,
                  "x-go-type": "core.NullTime",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "dropped_at"
                  },
                  "x-order": 6
                },
                "createdAt": {
                  "description": "Timestamp of Blowhorn mentee creation.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at"
                  },
                  "x-order": 7,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updatedAt": {
                  "description": "Timestamp of last Blowhorn mentee modification.",
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
            "description": "Blowhorn mentees included on this page of results."
          }
        }
      }
    }
  }
};

export default BlowhornLedgerSchema;
