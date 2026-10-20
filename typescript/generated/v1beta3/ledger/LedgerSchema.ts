/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const LedgerSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Ledger",
    "description": "OpenAPI schema for organization ledgers: named idempotent sets of keyed\nentries that several workers share, so work done once (a record processed,\na contact reached) is never done twice. Recording is idempotent on\n(ledger, entryKey), and claim-if-absent hands a key to exactly one\nclaimant atomically. Ledgers belong to the organization of the\nauthenticated session; any client-supplied organization is ignored.\n\nAuthorization: ledgers are organization-shared bookkeeping. Any member of\nthe organization may record, claim, read and delete entries in that\norganization's ledgers. `claimant` is an advisory worker label, not an\nauthorization principal: it is not bound to the caller, and a claim or\ndelete never checks who holds the key. A key is scoped to (organization,\nledger), so an entry in another ledger is `404`.\n",
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
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "ledgers"
        ],
        "summary": "Record a ledger entry",
        "operationId": "recordLedgerEntry",
        "description": "Records `entryKey` in the ledger. A new key creates the entry and returns `201`. An existing key never creates a second entry and is not changed: the stored entry is returned unchanged with `200`, and the supplied `value` is ignored. Recording never changes `claimedBy` or `claimedAt`.\n",
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
                  "description": "Server-returned ledger entry. An organization keeps any number of named ledgers, each an idempotent set keyed by entryKey: recording an existing key never creates a second entry and returns the stored entry unchanged, and claim-if-absent gives a key to exactly one claimant, so two workers never both act on it. Any organization member may read, claim and delete entries; claimedBy is an advisory label, not an authorization principal.\n",
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
                    "claimedBy": {
                      "type": "string",
                      "description": "Claimant that holds the entry, if any. Set only by claim-if-absent and never changed afterwards.",
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
                      "description": "Timestamp of last ledger entry modification.",
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
                  "description": "Server-returned ledger entry. An organization keeps any number of named ledgers, each an idempotent set keyed by entryKey: recording an existing key never creates a second entry and returns the stored entry unchanged, and claim-if-absent gives a key to exactly one claimant, so two workers never both act on it. Any organization member may read, claim and delete entries; claimedBy is an advisory label, not an authorization principal.\n",
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
                    "claimedBy": {
                      "type": "string",
                      "description": "Claimant that holds the entry, if any. Set only by claim-if-absent and never changed afterwards.",
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
                      "description": "Timestamp of last ledger entry modification.",
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
        "description": "Atomically gives `entryKey` to `claimant`. When the key is not in the ledger, the entry is created already claimed and returned with `201`. When it is recorded but unclaimed, it is claimed and returned with `200`. When `claimant` already holds it, the call is a replay and returns the entry with `200`. When another claimant holds it, the call is refused with `409` and nothing changes. A claim is permanent: it ends only when the entry is deleted.\n",
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
                "description": "Claim-if-absent payload giving a key to one claimant.",
                "required": [
                  "entryKey",
                  "claimant"
                ],
                "properties": {
                  "entryKey": {
                    "type": "string",
                    "description": "Key to claim.",
                    "minLength": 1,
                    "maxLength": 1024,
                    "x-go-name": "EntryKey"
                  },
                  "claimant": {
                    "type": "string",
                    "description": "Advisory label naming the worker taking the key, for example a worker name. It is not bound to the caller.",
                    "minLength": 1,
                    "maxLength": 255
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
            "description": "The caller's claimant now holds the existing entry",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Ledger Entry Schema",
                  "description": "Server-returned ledger entry. An organization keeps any number of named ledgers, each an idempotent set keyed by entryKey: recording an existing key never creates a second entry and returns the stored entry unchanged, and claim-if-absent gives a key to exactly one claimant, so two workers never both act on it. Any organization member may read, claim and delete entries; claimedBy is an advisory label, not an authorization principal.\n",
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
                    "claimedBy": {
                      "type": "string",
                      "description": "Claimant that holds the entry, if any. Set only by claim-if-absent and never changed afterwards.",
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
                      "description": "Timestamp of last ledger entry modification.",
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
                  "description": "Server-returned ledger entry. An organization keeps any number of named ledgers, each an idempotent set keyed by entryKey: recording an existing key never creates a second entry and returns the stored entry unchanged, and claim-if-absent gives a key to exactly one claimant, so two workers never both act on it. Any organization member may read, claim and delete entries; claimedBy is an advisory label, not an authorization principal.\n",
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
                    "claimedBy": {
                      "type": "string",
                      "description": "Claimant that holds the entry, if any. Set only by claim-if-absent and never changed afterwards.",
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
                      "description": "Timestamp of last ledger entry modification.",
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
          "409": {
            "description": "Conflict - another claimant holds the ledger entry",
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
              "maxLength": 1024
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
                  "description": "Server-returned ledger entry. An organization keeps any number of named ledgers, each an idempotent set keyed by entryKey: recording an existing key never creates a second entry and returns the stored entry unchanged, and claim-if-absent gives a key to exactly one claimant, so two workers never both act on it. Any organization member may read, claim and delete entries; claimedBy is an advisory label, not an authorization principal.\n",
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
                    "claimedBy": {
                      "type": "string",
                      "description": "Claimant that holds the entry, if any. Set only by claim-if-absent and never changed afterwards.",
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
                      "description": "Timestamp of last ledger entry modification.",
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
              "maxLength": 1024
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
        "description": "Conflict - another claimant holds the ledger entry",
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
          "maxLength": 1024
        }
      }
    },
    "schemas": {
      "LedgerEntry": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Ledger Entry Schema",
        "description": "Server-returned ledger entry. An organization keeps any number of named ledgers, each an idempotent set keyed by entryKey: recording an existing key never creates a second entry and returns the stored entry unchanged, and claim-if-absent gives a key to exactly one claimant, so two workers never both act on it. Any organization member may read, claim and delete entries; claimedBy is an advisory label, not an authorization principal.\n",
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
          "claimedBy": {
            "type": "string",
            "description": "Claimant that holds the entry, if any. Set only by claim-if-absent and never changed afterwards.",
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
            "description": "Timestamp of last ledger entry modification.",
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
      "LedgerClaimPayload": {
        "type": "object",
        "description": "Claim-if-absent payload giving a key to one claimant.",
        "required": [
          "entryKey",
          "claimant"
        ],
        "properties": {
          "entryKey": {
            "type": "string",
            "description": "Key to claim.",
            "minLength": 1,
            "maxLength": 1024,
            "x-go-name": "EntryKey"
          },
          "claimant": {
            "type": "string",
            "description": "Advisory label naming the worker taking the key, for example a worker name. It is not bound to the caller.",
            "minLength": 1,
            "maxLength": 255
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
