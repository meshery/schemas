/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const LedgerSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Ledger",
    "description": "OpenAPI schema for organization ledgers: named idempotent sets of keyed\nentries that several workers share, so work done once (a record processed,\na contact reached) is never done twice. Recording is idempotent on\n(ledger, entryKey) and never changes an existing entry. Change a stored\nvalue with updateLedgerEntry, which replaces `value` wholesale (not a\nmerge) and advances `updatedAt`. Claim-if-absent hands a key to exactly\none claiming connection atomically. Ledgers belong to the organization of\nthe authenticated session; any client-supplied organization is ignored.\n\nAuthorization: ledgers are organization-shared bookkeeping. Any member of\nthe session organization may record, claim, list, read, update and delete\nentries in that organization's ledgers. A claim names the connection that\ntakes the key (`connectionId`), which must be the caller's own live\nconnection in the session organization; any other connection, including\none that does not exist, is `404`, the same answer as a missing ledger. A\ndelete or an update never checks who holds the key. A key is scoped to\n(organization, ledger), so an entry in another ledger is `404`.\n\nUpdating an entry replaces the stored `value` and advances `updatedAt`\n(strictly increasing, so it works as a version token). It never changes\n`entryKey`, `claimedByConnectionId`, `claimedAt`, `createdAt` or `id`,\nand it does not create entries: a key that is not in the ledger is `404`\n(use POST entries or claims to create). `expectedValue`, when present,\napplies the update only if the stored value equals it (JSON equality; key\norder and whitespace do not matter). `expectedUpdatedAt`, when present,\napplies the update only if the stored entry's `updatedAt` equals it\nexactly; clients echo the `updatedAt` they last read. Both preconditions\nmay be sent; then both must hold. With neither, the update is\nunconditional. A precondition that does not match returns `412` and\nchanges nothing.\n",
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
      "name": "ledgers",
      "description": "Operations related to organization ledgers and their entries."
    }
  ],
  "paths": {
    "/api/ledgers/{ledger}/entries": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "ledgers"
        ],
        "summary": "List ledger entries",
        "operationId": "listLedgerEntries",
        "description": "Returns a paginated list of the entries in the ledger, in the organization of the authenticated session. `search` matches entry keys that contain the term, ignoring case. `order` sorts by `entryKey`, `createdAt` or `updatedAt` (`asc` or `desc`); the default is `entryKey asc`. A ledger with no entries returns an empty page, and a caller who is not a member of the session organization gets `404`.\n",
        "parameters": [
          {
            "name": "ledger",
            "in": "path",
            "description": "Name of the ledger, for example `processed-profiles`.",
            "required": true,
            "schema": {
              "type": "string",
              "pattern": "^[a-z0-9][a-z0-9._-]*$",
              "minLength": 1,
              "maxLength": 255
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
            "description": "Number of responses to return per page. Canonical camelCase pagination parameter; prefer this over the deprecated all-lowercase `pagesize`.",
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
            "description": "Ledger entries page",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated collection of ledger entries.",
                  "required": [
                    "page",
                    "pageSize",
                    "totalCount",
                    "ledgerEntries"
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
                    "ledgerEntries": {
                      "type": "array",
                      "items": {
                        "x-go-type": "LedgerEntry",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "title": "Ledger Entry Schema",
                        "description": "Server-returned ledger entry. An organization keeps any number of named ledgers, each an idempotent set keyed by entryKey: recording an existing key never creates a second entry and never changes that entry, and claim-if-absent gives a key to exactly one claiming connection, so two workers never both act on it. Change a stored value with updateLedgerEntry, which replaces the value wholesale and advances updatedAt. Any organization member may read, update and delete entries; a claim names the connection that holds it, which must be the caller's own live connection in the organization. An update does not check who holds a claim.\n",
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
                            "description": "Server-generated ledger entry ID.",
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
                            "description": "Name of the ledger (the idempotent set) the entry belongs to.",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "ledger"
                            },
                            "x-order": 3
                          },
                          "entryKey": {
                            "type": "string",
                            "description": "Key within the ledger. Unique per (organization, ledger).",
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
                          "claimedByConnectionId": {
                            "description": "ID of the connection that holds the entry, if any. Set only by claim-if-absent and never changed afterwards. References a connection (`connections.id`); a claim held by a connection that is later deleted is released, so the key may be claimed again. Omitted when the entry is unclaimed.\n",
                            "x-go-name": "ClaimedByConnectionID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "claimed_by_connection_id",
                              "json": "claimedByConnectionId,omitempty"
                            },
                            "x-order": 6,
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "claimedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Time the current or most recent claim was taken. Set only by claim-if-absent; null when the entry was never claimed. An entry whose claimedByConnectionId is omitted is unclaimed whatever this holds.",
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
                            "description": "Timestamp of ledger entry creation.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at"
                            },
                            "x-order": 8,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp of last ledger entry modification; advances on every update.",
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
                      "description": "Ledger entries included on this page of results."
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
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "ledgers"
        ],
        "summary": "Record a ledger entry",
        "operationId": "recordLedgerEntry",
        "description": "Records `entryKey` in the ledger. A new key creates the entry and returns `201`. Recording never changes an existing entry: the stored entry is returned unchanged with `200`, and the supplied `value` is ignored. Change a stored value with updateLedgerEntry. Recording never changes `claimedByConnectionId` or `claimedAt`.\n",
        "parameters": [
          {
            "name": "ledger",
            "in": "path",
            "description": "Name of the ledger, for example `processed-profiles`.",
            "required": true,
            "schema": {
              "type": "string",
              "pattern": "^[a-z0-9][a-z0-9._-]*$",
              "minLength": 1,
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
                "description": "Payload for recording a ledger entry. The ledger comes from the path and the organization from the session; claim fields and timestamps are server-owned.\n",
                "required": [
                  "entryKey"
                ],
                "properties": {
                  "entryKey": {
                    "type": "string",
                    "description": "Key within the ledger.",
                    "minLength": 1,
                    "maxLength": 1024,
                    "x-go-name": "EntryKey"
                  },
                  "value": {
                    "type": "object",
                    "description": "Entry value, stored as a JSON object.",
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
            "description": "The key was already recorded; the stored entry, unchanged",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Ledger Entry Schema",
                  "description": "Server-returned ledger entry. An organization keeps any number of named ledgers, each an idempotent set keyed by entryKey: recording an existing key never creates a second entry and never changes that entry, and claim-if-absent gives a key to exactly one claiming connection, so two workers never both act on it. Change a stored value with updateLedgerEntry, which replaces the value wholesale and advances updatedAt. Any organization member may read, update and delete entries; a claim names the connection that holds it, which must be the caller's own live connection in the organization. An update does not check who holds a claim.\n",
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
                      "description": "Server-generated ledger entry ID.",
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
                      "description": "Name of the ledger (the idempotent set) the entry belongs to.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "ledger"
                      },
                      "x-order": 3
                    },
                    "entryKey": {
                      "type": "string",
                      "description": "Key within the ledger. Unique per (organization, ledger).",
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
                    "claimedByConnectionId": {
                      "description": "ID of the connection that holds the entry, if any. Set only by claim-if-absent and never changed afterwards. References a connection (`connections.id`); a claim held by a connection that is later deleted is released, so the key may be claimed again. Omitted when the entry is unclaimed.\n",
                      "x-go-name": "ClaimedByConnectionID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "claimed_by_connection_id",
                        "json": "claimedByConnectionId,omitempty"
                      },
                      "x-order": 6,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "claimedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the current or most recent claim was taken. Set only by claim-if-absent; null when the entry was never claimed. An entry whose claimedByConnectionId is omitted is unclaimed whatever this holds.",
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
                      "description": "Timestamp of ledger entry creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 8,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last ledger entry modification; advances on every update.",
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
          "201": {
            "description": "The key was recorded",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Ledger Entry Schema",
                  "description": "Server-returned ledger entry. An organization keeps any number of named ledgers, each an idempotent set keyed by entryKey: recording an existing key never creates a second entry and never changes that entry, and claim-if-absent gives a key to exactly one claiming connection, so two workers never both act on it. Change a stored value with updateLedgerEntry, which replaces the value wholesale and advances updatedAt. Any organization member may read, update and delete entries; a claim names the connection that holds it, which must be the caller's own live connection in the organization. An update does not check who holds a claim.\n",
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
                      "description": "Server-generated ledger entry ID.",
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
                      "description": "Name of the ledger (the idempotent set) the entry belongs to.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "ledger"
                      },
                      "x-order": 3
                    },
                    "entryKey": {
                      "type": "string",
                      "description": "Key within the ledger. Unique per (organization, ledger).",
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
                    "claimedByConnectionId": {
                      "description": "ID of the connection that holds the entry, if any. Set only by claim-if-absent and never changed afterwards. References a connection (`connections.id`); a claim held by a connection that is later deleted is released, so the key may be claimed again. Omitted when the entry is unclaimed.\n",
                      "x-go-name": "ClaimedByConnectionID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "claimed_by_connection_id",
                        "json": "claimedByConnectionId,omitempty"
                      },
                      "x-order": 6,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "claimedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the current or most recent claim was taken. Set only by claim-if-absent; null when the entry was never claimed. An entry whose claimedByConnectionId is omitted is unclaimed whatever this holds.",
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
                      "description": "Timestamp of ledger entry creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 8,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last ledger entry modification; advances on every update.",
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
    "/api/ledgers/{ledger}/claims": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "ledgers"
        ],
        "summary": "Claim a ledger key if absent",
        "operationId": "claimLedgerEntry",
        "description": "Atomically gives `entryKey` to the connection `connectionId`, which must be the caller's own live connection in the session organization; any other connection is `404`. When the key is not in the ledger, the entry is created already claimed and returned with `201`. When it is recorded but unclaimed, it is claimed and returned with `200`. When `connectionId` already holds it, the call is a replay and returns the entry with `200`. When another live connection holds it, the call is refused with `409` and nothing changes. A claim ends when the entry is deleted or when the holding connection is deleted; a key whose holder was deleted can be claimed again.\n",
        "parameters": [
          {
            "name": "ledger",
            "in": "path",
            "description": "Name of the ledger, for example `processed-profiles`.",
            "required": true,
            "schema": {
              "type": "string",
              "pattern": "^[a-z0-9][a-z0-9._-]*$",
              "minLength": 1,
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
                "description": "Claim-if-absent payload giving a key to one connection.",
                "required": [
                  "entryKey",
                  "connectionId"
                ],
                "properties": {
                  "entryKey": {
                    "type": "string",
                    "description": "Key to claim.",
                    "minLength": 1,
                    "maxLength": 1024,
                    "x-go-name": "EntryKey"
                  },
                  "connectionId": {
                    "description": "ID of the connection taking the key: the caller's own live connection in the session organization (for example the connection a desktop client registered for its machine).\n",
                    "x-go-name": "ConnectionID",
                    "x-go-type-skip-optional-pointer": true,
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  },
                  "value": {
                    "type": "object",
                    "description": "Value stored when the claim creates the entry; ignored when the entry already exists.",
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
            "description": "The caller's connection now holds the existing entry",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Ledger Entry Schema",
                  "description": "Server-returned ledger entry. An organization keeps any number of named ledgers, each an idempotent set keyed by entryKey: recording an existing key never creates a second entry and never changes that entry, and claim-if-absent gives a key to exactly one claiming connection, so two workers never both act on it. Change a stored value with updateLedgerEntry, which replaces the value wholesale and advances updatedAt. Any organization member may read, update and delete entries; a claim names the connection that holds it, which must be the caller's own live connection in the organization. An update does not check who holds a claim.\n",
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
                      "description": "Server-generated ledger entry ID.",
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
                      "description": "Name of the ledger (the idempotent set) the entry belongs to.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "ledger"
                      },
                      "x-order": 3
                    },
                    "entryKey": {
                      "type": "string",
                      "description": "Key within the ledger. Unique per (organization, ledger).",
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
                    "claimedByConnectionId": {
                      "description": "ID of the connection that holds the entry, if any. Set only by claim-if-absent and never changed afterwards. References a connection (`connections.id`); a claim held by a connection that is later deleted is released, so the key may be claimed again. Omitted when the entry is unclaimed.\n",
                      "x-go-name": "ClaimedByConnectionID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "claimed_by_connection_id",
                        "json": "claimedByConnectionId,omitempty"
                      },
                      "x-order": 6,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "claimedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the current or most recent claim was taken. Set only by claim-if-absent; null when the entry was never claimed. An entry whose claimedByConnectionId is omitted is unclaimed whatever this holds.",
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
                      "description": "Timestamp of ledger entry creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 8,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last ledger entry modification; advances on every update.",
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
          "201": {
            "description": "The key was absent; it was recorded and claimed",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Ledger Entry Schema",
                  "description": "Server-returned ledger entry. An organization keeps any number of named ledgers, each an idempotent set keyed by entryKey: recording an existing key never creates a second entry and never changes that entry, and claim-if-absent gives a key to exactly one claiming connection, so two workers never both act on it. Change a stored value with updateLedgerEntry, which replaces the value wholesale and advances updatedAt. Any organization member may read, update and delete entries; a claim names the connection that holds it, which must be the caller's own live connection in the organization. An update does not check who holds a claim.\n",
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
                      "description": "Server-generated ledger entry ID.",
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
                      "description": "Name of the ledger (the idempotent set) the entry belongs to.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "ledger"
                      },
                      "x-order": 3
                    },
                    "entryKey": {
                      "type": "string",
                      "description": "Key within the ledger. Unique per (organization, ledger).",
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
                    "claimedByConnectionId": {
                      "description": "ID of the connection that holds the entry, if any. Set only by claim-if-absent and never changed afterwards. References a connection (`connections.id`); a claim held by a connection that is later deleted is released, so the key may be claimed again. Omitted when the entry is unclaimed.\n",
                      "x-go-name": "ClaimedByConnectionID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "claimed_by_connection_id",
                        "json": "claimedByConnectionId,omitempty"
                      },
                      "x-order": 6,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "claimedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the current or most recent claim was taken. Set only by claim-if-absent; null when the entry was never claimed. An entry whose claimedByConnectionId is omitted is unclaimed whatever this holds.",
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
                      "description": "Timestamp of ledger entry creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 8,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last ledger entry modification; advances on every update.",
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
            "description": "Conflict - another connection holds the ledger entry",
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
    "/api/ledgers/{ledger}/entries/{entryKey}": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "ledgers"
        ],
        "summary": "Get a ledger entry",
        "operationId": "getLedgerEntry",
        "description": "Returns the entry recorded under `entryKey` in the ledger, or `404` when the key is not in this ledger.",
        "parameters": [
          {
            "name": "ledger",
            "in": "path",
            "description": "Name of the ledger, for example `processed-profiles`.",
            "required": true,
            "schema": {
              "type": "string",
              "pattern": "^[a-z0-9][a-z0-9._-]*$",
              "minLength": 1,
              "maxLength": 255
            }
          },
          {
            "name": "entryKey",
            "in": "path",
            "description": "Key within the ledger. URL-encode keys that contain reserved characters such as `/`.",
            "required": true,
            "schema": {
              "type": "string",
              "minLength": 1,
              "maxLength": 1024,
              "not": {
                "enum": [
                  ".",
                  ".."
                ]
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Ledger entry",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Ledger Entry Schema",
                  "description": "Server-returned ledger entry. An organization keeps any number of named ledgers, each an idempotent set keyed by entryKey: recording an existing key never creates a second entry and never changes that entry, and claim-if-absent gives a key to exactly one claiming connection, so two workers never both act on it. Change a stored value with updateLedgerEntry, which replaces the value wholesale and advances updatedAt. Any organization member may read, update and delete entries; a claim names the connection that holds it, which must be the caller's own live connection in the organization. An update does not check who holds a claim.\n",
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
                      "description": "Server-generated ledger entry ID.",
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
                      "description": "Name of the ledger (the idempotent set) the entry belongs to.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "ledger"
                      },
                      "x-order": 3
                    },
                    "entryKey": {
                      "type": "string",
                      "description": "Key within the ledger. Unique per (organization, ledger).",
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
                    "claimedByConnectionId": {
                      "description": "ID of the connection that holds the entry, if any. Set only by claim-if-absent and never changed afterwards. References a connection (`connections.id`); a claim held by a connection that is later deleted is released, so the key may be claimed again. Omitted when the entry is unclaimed.\n",
                      "x-go-name": "ClaimedByConnectionID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "claimed_by_connection_id",
                        "json": "claimedByConnectionId,omitempty"
                      },
                      "x-order": 6,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "claimedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the current or most recent claim was taken. Set only by claim-if-absent; null when the entry was never claimed. An entry whose claimedByConnectionId is omitted is unclaimed whatever this holds.",
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
                      "description": "Timestamp of ledger entry creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 8,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last ledger entry modification; advances on every update.",
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
          "ledgers"
        ],
        "summary": "Update a ledger entry",
        "operationId": "updateLedgerEntry",
        "description": "Replaces the stored `value` wholesale (not a merge) and advances `updatedAt` (strictly increasing, so it works as a version token). Never changes `entryKey`, `claimedByConnectionId`, `claimedAt`, `createdAt` or `id`. Does not create entries: a key that is not in the ledger is `404` (use POST entries or claims to create). Does not check who holds a claim (same as delete). Any member of the session organization may update. `expectedValue`, when present, applies the update only if the stored value equals it (JSON equality; key order and whitespace do not matter). `expectedUpdatedAt`, when present, applies the update only if the stored entry's `updatedAt` equals it exactly; clients echo the `updatedAt` they last read. Both preconditions may be sent; then both must hold. With neither, the update is unconditional. A precondition that does not match returns `412` and changes nothing. A bad ledger name, key, or body (for example a missing `value` or a non-object value) is `400`.\n",
        "parameters": [
          {
            "name": "ledger",
            "in": "path",
            "description": "Name of the ledger, for example `processed-profiles`.",
            "required": true,
            "schema": {
              "type": "string",
              "pattern": "^[a-z0-9][a-z0-9._-]*$",
              "minLength": 1,
              "maxLength": 255
            }
          },
          {
            "name": "entryKey",
            "in": "path",
            "description": "Key within the ledger. URL-encode keys that contain reserved characters such as `/`.",
            "required": true,
            "schema": {
              "type": "string",
              "minLength": 1,
              "maxLength": 1024,
              "not": {
                "enum": [
                  ".",
                  ".."
                ]
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
                "description": "Payload for replacing a ledger entry's value. The ledger and entryKey come from the path. Claim fields, id and timestamps are server-owned and are not accepted here.\n",
                "required": [
                  "value"
                ],
                "properties": {
                  "value": {
                    "type": "object",
                    "description": "The new entry value, stored as a JSON object. Replaces the stored value wholesale.",
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    },
                    "x-go-type-skip-optional-pointer": true
                  },
                  "expectedValue": {
                    "type": "object",
                    "description": "Optional precondition. When present, including as an empty object, the update applies only if the stored value equals this object (JSON equality; key order and whitespace do not matter). Omit the property to skip this check. Absence is distinct from an empty object.\n",
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    },
                    "x-go-type-skip-optional-pointer": true
                  },
                  "expectedUpdatedAt": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Optional precondition. When present, the update applies only if the stored entry's updatedAt equals this instant exactly. Clients echo the updatedAt they last read. Omit the property to skip this check.\n",
                    "x-go-type": "core.NullTime",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "The updated ledger entry",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Ledger Entry Schema",
                  "description": "Server-returned ledger entry. An organization keeps any number of named ledgers, each an idempotent set keyed by entryKey: recording an existing key never creates a second entry and never changes that entry, and claim-if-absent gives a key to exactly one claiming connection, so two workers never both act on it. Change a stored value with updateLedgerEntry, which replaces the value wholesale and advances updatedAt. Any organization member may read, update and delete entries; a claim names the connection that holds it, which must be the caller's own live connection in the organization. An update does not check who holds a claim.\n",
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
                      "description": "Server-generated ledger entry ID.",
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
                      "description": "Name of the ledger (the idempotent set) the entry belongs to.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "ledger"
                      },
                      "x-order": 3
                    },
                    "entryKey": {
                      "type": "string",
                      "description": "Key within the ledger. Unique per (organization, ledger).",
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
                    "claimedByConnectionId": {
                      "description": "ID of the connection that holds the entry, if any. Set only by claim-if-absent and never changed afterwards. References a connection (`connections.id`); a claim held by a connection that is later deleted is released, so the key may be claimed again. Omitted when the entry is unclaimed.\n",
                      "x-go-name": "ClaimedByConnectionID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "claimed_by_connection_id",
                        "json": "claimedByConnectionId,omitempty"
                      },
                      "x-order": 6,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "claimedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the current or most recent claim was taken. Set only by claim-if-absent; null when the entry was never claimed. An entry whose claimedByConnectionId is omitted is unclaimed whatever this holds.",
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
                      "description": "Timestamp of ledger entry creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 8,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last ledger entry modification; advances on every update.",
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
          "412": {
            "description": "Precondition Failed - expectedValue or expectedUpdatedAt does not match the stored entry, so nothing was changed",
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
          "ledgers"
        ],
        "summary": "Delete a ledger entry",
        "operationId": "deleteLedgerEntry",
        "description": "Removes the entry, and with it any claim, so its key can be recorded or claimed again. Returns `404` when the key is not in this ledger.",
        "parameters": [
          {
            "name": "ledger",
            "in": "path",
            "description": "Name of the ledger, for example `processed-profiles`.",
            "required": true,
            "schema": {
              "type": "string",
              "pattern": "^[a-z0-9][a-z0-9._-]*$",
              "minLength": 1,
              "maxLength": 255
            }
          },
          {
            "name": "entryKey",
            "in": "path",
            "description": "Key within the ledger. URL-encode keys that contain reserved characters such as `/`.",
            "required": true,
            "schema": {
              "type": "string",
              "minLength": 1,
              "maxLength": 1024,
              "not": {
                "enum": [
                  ".",
                  ".."
                ]
              }
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Ledger entry deleted"
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
        "scheme": "bearer",
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
        "description": "Conflict - another connection holds the ledger entry",
        "content": {
          "text/plain": {
            "schema": {
              "type": "string"
            }
          }
        }
      },
      "412": {
        "description": "Precondition Failed - expectedValue or expectedUpdatedAt does not match the stored entry, so nothing was changed",
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
        "description": "Number of responses to return per page. Canonical camelCase pagination parameter; prefer this over the deprecated all-lowercase `pagesize`.",
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
      },
      "ledger": {
        "name": "ledger",
        "in": "path",
        "description": "Name of the ledger, for example `processed-profiles`.",
        "required": true,
        "schema": {
          "type": "string",
          "pattern": "^[a-z0-9][a-z0-9._-]*$",
          "minLength": 1,
          "maxLength": 255
        }
      },
      "entryKey": {
        "name": "entryKey",
        "in": "path",
        "description": "Key within the ledger. URL-encode keys that contain reserved characters such as `/`.",
        "required": true,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 1024,
          "not": {
            "enum": [
              ".",
              ".."
            ]
          }
        }
      }
    },
    "schemas": {
      "LedgerEntry": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Ledger Entry Schema",
        "description": "Server-returned ledger entry. An organization keeps any number of named ledgers, each an idempotent set keyed by entryKey: recording an existing key never creates a second entry and never changes that entry, and claim-if-absent gives a key to exactly one claiming connection, so two workers never both act on it. Change a stored value with updateLedgerEntry, which replaces the value wholesale and advances updatedAt. Any organization member may read, update and delete entries; a claim names the connection that holds it, which must be the caller's own live connection in the organization. An update does not check who holds a claim.\n",
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
            "description": "Server-generated ledger entry ID.",
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
            "description": "Name of the ledger (the idempotent set) the entry belongs to.",
            "minLength": 1,
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "ledger"
            },
            "x-order": 3
          },
          "entryKey": {
            "type": "string",
            "description": "Key within the ledger. Unique per (organization, ledger).",
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
          "claimedByConnectionId": {
            "description": "ID of the connection that holds the entry, if any. Set only by claim-if-absent and never changed afterwards. References a connection (`connections.id`); a claim held by a connection that is later deleted is released, so the key may be claimed again. Omitted when the entry is unclaimed.\n",
            "x-go-name": "ClaimedByConnectionID",
            "x-oapi-codegen-extra-tags": {
              "db": "claimed_by_connection_id",
              "json": "claimedByConnectionId,omitempty"
            },
            "x-order": 6,
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "claimedAt": {
            "type": "string",
            "format": "date-time",
            "description": "Time the current or most recent claim was taken. Set only by claim-if-absent; null when the entry was never claimed. An entry whose claimedByConnectionId is omitted is unclaimed whatever this holds.",
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
            "description": "Timestamp of ledger entry creation.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at"
            },
            "x-order": 8,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp of last ledger entry modification; advances on every update.",
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
      "LedgerEntryPage": {
        "type": "object",
        "description": "Paginated collection of ledger entries.",
        "required": [
          "page",
          "pageSize",
          "totalCount",
          "ledgerEntries"
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
          "ledgerEntries": {
            "type": "array",
            "items": {
              "x-go-type": "LedgerEntry",
              "$schema": "http://json-schema.org/draft-07/schema#",
              "title": "Ledger Entry Schema",
              "description": "Server-returned ledger entry. An organization keeps any number of named ledgers, each an idempotent set keyed by entryKey: recording an existing key never creates a second entry and never changes that entry, and claim-if-absent gives a key to exactly one claiming connection, so two workers never both act on it. Change a stored value with updateLedgerEntry, which replaces the value wholesale and advances updatedAt. Any organization member may read, update and delete entries; a claim names the connection that holds it, which must be the caller's own live connection in the organization. An update does not check who holds a claim.\n",
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
                  "description": "Server-generated ledger entry ID.",
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
                  "description": "Name of the ledger (the idempotent set) the entry belongs to.",
                  "minLength": 1,
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "ledger"
                  },
                  "x-order": 3
                },
                "entryKey": {
                  "type": "string",
                  "description": "Key within the ledger. Unique per (organization, ledger).",
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
                "claimedByConnectionId": {
                  "description": "ID of the connection that holds the entry, if any. Set only by claim-if-absent and never changed afterwards. References a connection (`connections.id`); a claim held by a connection that is later deleted is released, so the key may be claimed again. Omitted when the entry is unclaimed.\n",
                  "x-go-name": "ClaimedByConnectionID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "claimed_by_connection_id",
                    "json": "claimedByConnectionId,omitempty"
                  },
                  "x-order": 6,
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "claimedAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Time the current or most recent claim was taken. Set only by claim-if-absent; null when the entry was never claimed. An entry whose claimedByConnectionId is omitted is unclaimed whatever this holds.",
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
                  "description": "Timestamp of ledger entry creation.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at"
                  },
                  "x-order": 8,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updatedAt": {
                  "description": "Timestamp of last ledger entry modification; advances on every update.",
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
            "description": "Ledger entries included on this page of results."
          }
        }
      },
      "LedgerEntryPayload": {
        "type": "object",
        "description": "Payload for recording a ledger entry. The ledger comes from the path and the organization from the session; claim fields and timestamps are server-owned.\n",
        "required": [
          "entryKey"
        ],
        "properties": {
          "entryKey": {
            "type": "string",
            "description": "Key within the ledger.",
            "minLength": 1,
            "maxLength": 1024,
            "x-go-name": "EntryKey"
          },
          "value": {
            "type": "object",
            "description": "Entry value, stored as a JSON object.",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "LedgerEntryUpdatePayload": {
        "type": "object",
        "description": "Payload for replacing a ledger entry's value. The ledger and entryKey come from the path. Claim fields, id and timestamps are server-owned and are not accepted here.\n",
        "required": [
          "value"
        ],
        "properties": {
          "value": {
            "type": "object",
            "description": "The new entry value, stored as a JSON object. Replaces the stored value wholesale.",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "expectedValue": {
            "type": "object",
            "description": "Optional precondition. When present, including as an empty object, the update applies only if the stored value equals this object (JSON equality; key order and whitespace do not matter). Omit the property to skip this check. Absence is distinct from an empty object.\n",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "expectedUpdatedAt": {
            "type": "string",
            "format": "date-time",
            "description": "Optional precondition. When present, the update applies only if the stored entry's updatedAt equals this instant exactly. Clients echo the updatedAt they last read. Omit the property to skip this check.\n",
            "x-go-type": "core.NullTime",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            }
          }
        }
      },
      "LedgerClaimPayload": {
        "type": "object",
        "description": "Claim-if-absent payload giving a key to one connection.",
        "required": [
          "entryKey",
          "connectionId"
        ],
        "properties": {
          "entryKey": {
            "type": "string",
            "description": "Key to claim.",
            "minLength": 1,
            "maxLength": 1024,
            "x-go-name": "EntryKey"
          },
          "connectionId": {
            "description": "ID of the connection taking the key: the caller's own live connection in the session organization (for example the connection a desktop client registered for its machine).\n",
            "x-go-name": "ConnectionID",
            "x-go-type-skip-optional-pointer": true,
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "value": {
            "type": "object",
            "description": "Value stored when the claim creates the entry; ignored when the entry already exists.",
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
};

export default LedgerSchema;
