/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const ContentItemSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "ContentItem",
    "description": "OpenAPI schema for content items - fingerprinted content\nvalues keyed by organization and row number, with conditional\nupdates.\nA content item may carry its own rules of engagement\n(`rulesOfEngagement`), which can only tighten the rules its profile and\nplatform run under, and may belong to a thread (`threadId`,\n`replyToId`, `threadIndex`): the parts of a split post, or the replies\nof a conversation between profiles.\nOrganization scope: every operation acts only in the organization the\nsession resolved to (X-Current-Orgid, then the user's selected\norganization), and only when the caller is a live member of it.\nAuthorization: each operation requires one permission key in that\norganization (Catalog Management / Content Items: View Content\nItems for the reads, Create Content Item, Edit Content Item and\nDelete Content Item for the writes); a caller without it receives a\n403 before any row is read. Past that check, an id that does not name\na live content item of the organization, and a caller who is not a\nlive member of it, receive the same 404, so the existence of another\norganization's rows is never disclosed.\n",
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
      "name": "contentItems",
      "description": "Operations related to content items."
    }
  ],
  "paths": {
    "/api/content-items": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "contentItems"
        ],
        "summary": "List content items",
        "operationId": "listContentItems",
        "description": "Returns a paginated list of the live content items in the\norganization of the authenticated session, ordered by `rowNumber`\nunless `order` names another column (`rowNumber`, `createdAt`,\n`updatedAt`). `search` matches the profile or the content values,\ncase-insensitively. `threadId` returns one whole thread: the root\nitem it names and every live item whose `threadId` names it,\nordered by `threadIndex` (the root first) unless `order` names\nanother column.\n",
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
            "name": "profile",
            "in": "query",
            "required": false,
            "description": "Filter by owning profile subject (exact match).",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "threadId",
            "in": "query",
            "required": false,
            "description": "Return one thread: the root item this ID names and every live item\nwhose `threadId` names it.\n",
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
            "description": "Content item page",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated collection of content items.",
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
                    "contentItems": {
                      "type": "array",
                      "items": {
                        "x-go-type": "ContentItem",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "title": "Content Item Schema",
                        "description": "Server-returned content item as persisted by the owning service.\nContent items carry a row number and a server-computed fingerprint over\ntheir canonical values; updates are conditional on the fingerprint the\nwriter read, so stale writes are refused rather than silently applied.\nAn item may carry its own rules of engagement, which can only tighten,\nand may belong to a thread through `threadId`, `replyToId` and\n`threadIndex`. See docs/content-item-contract.md.\n",
                        "type": "object",
                        "additionalProperties": false,
                        "required": [
                          "id",
                          "organizationId",
                          "profile",
                          "rowNumber",
                          "fingerprint",
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
                            "x-oapi-codegen-extra-tags": {
                              "db": "id"
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
                          "profile": {
                            "type": "string",
                            "description": "Subject of the owning profile.",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "profile"
                            },
                            "x-order": 3
                          },
                          "rowNumber": {
                            "type": "integer",
                            "description": "Row number of the content item, unique across the live content items of the organization.",
                            "minimum": 0,
                            "x-oapi-codegen-extra-tags": {
                              "db": "row_number"
                            },
                            "x-order": 4
                          },
                          "fingerprint": {
                            "type": "string",
                            "description": "Hex digest over the canonical content values (`data`, `profile`, `rowNumber` and, when set, `rulesOfEngagement` and `mediaAssetIds`), typed so null, empty string, zero and false differ. An item without them hashes exactly as it did before the fields existed. The thread fields are fixed at insert and are not part of it. Server-computed; used for conditional updates.\n",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "fingerprint"
                            },
                            "x-order": 5
                          },
                          "data": {
                            "type": "object",
                            "description": "Content values, stored as a JSON blob.",
                            "x-go-type": "core.Map",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "data"
                            },
                            "x-order": 6
                          },
                          "createdAt": {
                            "description": "Timestamp of content item creation.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at"
                            },
                            "x-order": 7,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp of last content item modification.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at"
                            },
                            "x-order": 8,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deletedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the content item was soft-deleted.",
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
                            "x-order": 9
                          },
                          "createdBy": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-go-name": "CreatedBy",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_by",
                              "json": "createdBy,omitempty"
                            },
                            "x-order": 10
                          },
                          "rulesOfEngagement": {
                            "description": "The item's own rules of engagement, set by the order that wrote it. They can only tighten: the client that runs the item applies the stricter of these and the rules that apply to the item's profile and platform without them, and the warm-up and the pause after a sign-in challenge always apply. The server validates the shape and stores the value; it does not resolve it. Omitted when the item has none, in which case the item runs under the rules that apply without them.\n",
                            "x-oapi-codegen-extra-tags": {
                              "db": "rules_of_engagement",
                              "json": "rulesOfEngagement,omitempty"
                            },
                            "x-order": 11,
                            "type": "object",
                            "x-generate-db-helpers": true,
                            "additionalProperties": false,
                            "required": [
                              "preset"
                            ],
                            "properties": {
                              "preset": {
                                "x-go-type": "posturev1beta3.Posture",
                                "x-go-type-import": {
                                  "path": "github.com/meshery/schemas/models/v1beta3/posture",
                                  "name": "posturev1beta3"
                                },
                                "description": "The preset the item asks for. It applies only when it is at\nleast as cautious as the preset its profile and platform\nresolve to.\n",
                                "$schema": "http://json-schema.org/draft-07/schema#",
                                "title": "Posture Schema",
                                "type": "string",
                                "enum": [
                                  "cautious",
                                  "standard",
                                  "brisk"
                                ]
                              },
                              "dials": {
                                "description": "Dials changed for this item only. Omitted when none were\nchanged; present, the item's rules read as adjusted.\n",
                                "type": "object",
                                "additionalProperties": false,
                                "properties": {
                                  "pace": {
                                    "type": "string",
                                    "description": "Typing and interaction pace.",
                                    "enum": [
                                      "slow",
                                      "normal",
                                      "fast"
                                    ],
                                    "x-enum-varnames": [
                                      "ContentItemPaceSlow",
                                      "ContentItemPaceNormal",
                                      "ContentItemPaceFast"
                                    ]
                                  },
                                  "minDelaySeconds": {
                                    "type": "integer",
                                    "description": "Least time, in seconds, between two public actions on one platform for one profile.",
                                    "minimum": 0,
                                    "maximum": 86400
                                  },
                                  "quietHours": {
                                    "description": "Local hours with no public actions.",
                                    "type": "object",
                                    "additionalProperties": false,
                                    "required": [
                                      "start",
                                      "end"
                                    ],
                                    "properties": {
                                      "start": {
                                        "type": "integer",
                                        "description": "Local hour the window opens.",
                                        "minimum": 0,
                                        "maximum": 23
                                      },
                                      "end": {
                                        "type": "integer",
                                        "description": "Local hour the window closes.",
                                        "minimum": 0,
                                        "maximum": 23
                                      }
                                    }
                                  },
                                  "capFraction": {
                                    "type": "number",
                                    "format": "double",
                                    "description": "Share of each built-in daily cap the item may use, above 0 and at most 1.",
                                    "minimum": 0,
                                    "exclusiveMinimum": true,
                                    "maximum": 1
                                  },
                                  "noMouseMove": {
                                    "type": "boolean",
                                    "description": "Whether the item runs without pointer movement."
                                  }
                                }
                              }
                            }
                          },
                          "threadId": {
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "core.Uuid",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "description": "ID of the root item of the thread this item belongs to: the first post of a split thread, or the first transmission of a conversation between profiles. Omitted on a standalone item and on a root itself; a root is the item other items name here. Set on insert only.\n",
                            "x-go-name": "ThreadID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "thread_id",
                              "json": "threadId,omitempty"
                            },
                            "x-order": 12
                          },
                          "replyToId": {
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "core.Uuid",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "description": "ID of the item this item answers directly: the thread root or another item of the same thread. A split thread's part names the part before it; a reply in a conversation between profiles names the transmission above it. Omitted when the item answers nothing. Never set without `threadId`. Set on insert only.\n",
                            "x-go-name": "ReplyToID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "reply_to_id",
                              "json": "replyToId,omitempty"
                            },
                            "x-order": 13
                          },
                          "threadIndex": {
                            "type": "integer",
                            "description": "Position of the item in its thread, counting the root as 0. Present exactly when `threadId` is, unique among the live items of the thread, and greater than the position of the item named by `replyToId`. Set on insert only.\n",
                            "minimum": 1,
                            "x-oapi-codegen-extra-tags": {
                              "db": "thread_index",
                              "json": "threadIndex,omitempty"
                            },
                            "x-order": 14
                          },
                          "mediaAssetIds": {
                            "type": "array",
                            "uniqueItems": true,
                            "maxItems": 20,
                            "x-go-type": "pq.StringArray",
                            "x-go-type-import": {
                              "path": "github.com/lib/pq"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "items": {
                              "type": "string",
                              "format": "uuid",
                              "description": "ID of a media_asset in the same organization."
                            },
                            "description": "The media assets the item posts, in posting order. Ids only, never URLs. Omitted when the item posts no file.\n",
                            "x-oapi-codegen-extra-tags": {
                              "db": "media_asset_ids",
                              "json": "mediaAssetIds,omitempty"
                            },
                            "x-order": 15
                          }
                        }
                      },
                      "description": "Content items included on this page of results."
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
          "403": {
            "description": "Forbidden",
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
          "contentItems"
        ],
        "summary": "Insert a content item",
        "operationId": "insertContentItem",
        "description": "Inserts a new content item. Insert-only: any supplied\n`id` and `expectedFingerprint` are ignored; existing rows change\nonly through the conditional `updateContentItem`. The\n`fingerprint` is server-computed. Row numbers are unique across\nthe live content items of the organization, whatever their\n`profile`. When `rowNumber` is omitted the server assigns the next\nrow number of the organization (one more than the highest row\nnumber the organization has used, counting soft-deleted content\nitems so a deleted item's number is not handed out again by\nassignment), atomically with the insert, so\nconcurrent inserts never receive the same number. An organization\nthat has never had a content item is assigned row number 1 first\n(an explicit `rowNumber` of 0 is still accepted). A supplied\n`rowNumber` that another live content item of the organization\nalready holds refuses the insert with a 409.\nA `rulesOfEngagement` outside its schema (an unknown preset or\ndial, or a value out of range) is refused with a 400, on insert\nand on update alike.\nEach `mediaAssetIds` entry must name a media asset of the session\norganization, else 400 (the same 400 for a missing, another\norganization's and a deleted asset), on insert and on update alike.\nThe server does not require the asset to be ready at write time:\ndeleting an asset does not check content item references, and such\nan item is refused by name when it posts, so the posting client\nchecks readiness.\nThread fields are checked against the organization's live content\nitems in the same transaction as the insert, and a violation is\nrefused with a 400: `threadId` must name a live item of the\norganization that is not itself part of a thread; `replyToId`\nrequires `threadId` and must name that root or a live item of the\nsame thread; `threadIndex` is required exactly when `threadId` is\ngiven and must exceed the position of the item `replyToId` names\n(the root counts as 0). An item of another organization, a deleted\nitem and a missing one receive the same 400. A `threadIndex` that\nanother live item of the same thread already holds refuses the\ninsert with a 409.\n",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for inserting or updating a content item.\nContains only client-settable fields; the owning\n`organizationId` (derived from the authenticated session), the\nserver-computed `fingerprint` and the server-generated\n`createdAt` / `updatedAt` timestamps are intentionally excluded.\n",
                "required": [
                  "profile"
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
                  "profile": {
                    "type": "string",
                    "description": "Subject of the owning profile.",
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "rowNumber": {
                    "type": "integer",
                    "description": "Row number of the content item, unique across the live content\nitems of the organization. Optional: omitted on insert, the\nserver assigns the next row number of the organization; omitted\non update, the stored row number is kept.\n",
                    "minimum": 0
                  },
                  "data": {
                    "type": "object",
                    "description": "Content values, stored as a JSON blob.",
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    },
                    "x-go-type-skip-optional-pointer": true
                  },
                  "expectedFingerprint": {
                    "type": "string",
                    "description": "Optimistic-concurrency precondition for update: when supplied,\nthe update applies only when the stored fingerprint still\nmatches, and is refused with a 409 otherwise. Ignored on\ninsert.\n",
                    "maxLength": 255
                  },
                  "rulesOfEngagement": {
                    "allOf": [
                      {
                        "type": "object",
                        "x-generate-db-helpers": true,
                        "additionalProperties": false,
                        "description": "A content item's own rules of engagement: a Posture preset and,\noptionally, dials changed for this item only. Every value can only\ntighten. The client that runs the item resolves the effective rules\nas the stricter of these and the rules that apply to its profile and\nplatform without them (the more cautious preset wins, and each dial\napplies only where it is stricter than the resolved preset's own);\nthe warm-up and the pause after a sign-in challenge always apply.\nThe server validates the shape and stores the value as given; it\nnever resolves or loosens it.\n",
                        "required": [
                          "preset"
                        ],
                        "properties": {
                          "preset": {
                            "x-go-type": "posturev1beta3.Posture",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/v1beta3/posture",
                              "name": "posturev1beta3"
                            },
                            "description": "The preset the item asks for. It applies only when it is at\nleast as cautious as the preset its profile and platform\nresolve to.\n",
                            "$schema": "http://json-schema.org/draft-07/schema#",
                            "title": "Posture Schema",
                            "type": "string",
                            "enum": [
                              "cautious",
                              "standard",
                              "brisk"
                            ]
                          },
                          "dials": {
                            "description": "Dials changed for this item only. Omitted when none were\nchanged; present, the item's rules read as adjusted.\n",
                            "type": "object",
                            "additionalProperties": false,
                            "properties": {
                              "pace": {
                                "type": "string",
                                "description": "Typing and interaction pace.",
                                "enum": [
                                  "slow",
                                  "normal",
                                  "fast"
                                ],
                                "x-enum-varnames": [
                                  "ContentItemPaceSlow",
                                  "ContentItemPaceNormal",
                                  "ContentItemPaceFast"
                                ]
                              },
                              "minDelaySeconds": {
                                "type": "integer",
                                "description": "Least time, in seconds, between two public actions on one platform for one profile.",
                                "minimum": 0,
                                "maximum": 86400
                              },
                              "quietHours": {
                                "description": "Local hours with no public actions.",
                                "type": "object",
                                "additionalProperties": false,
                                "required": [
                                  "start",
                                  "end"
                                ],
                                "properties": {
                                  "start": {
                                    "type": "integer",
                                    "description": "Local hour the window opens.",
                                    "minimum": 0,
                                    "maximum": 23
                                  },
                                  "end": {
                                    "type": "integer",
                                    "description": "Local hour the window closes.",
                                    "minimum": 0,
                                    "maximum": 23
                                  }
                                }
                              },
                              "capFraction": {
                                "type": "number",
                                "format": "double",
                                "description": "Share of each built-in daily cap the item may use, above 0 and at most 1.",
                                "minimum": 0,
                                "exclusiveMinimum": true,
                                "maximum": 1
                              },
                              "noMouseMove": {
                                "type": "boolean",
                                "description": "Whether the item runs without pointer movement."
                              }
                            }
                          }
                        }
                      }
                    ],
                    "description": "The item's own rules of engagement, which can only tighten the\nrules its profile and platform run under. Omitted on insert, the\nitem has none; omitted on update, the stored rules are kept;\n`null` on update clears them.\n",
                    "nullable": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "rulesOfEngagement,omitempty"
                    }
                  },
                  "threadId": {
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "core.Uuid",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    },
                    "description": "ID of the thread's root item. Read on insert; on update it must\nbe omitted or equal the stored value.\n",
                    "x-go-name": "ThreadID",
                    "x-oapi-codegen-extra-tags": {
                      "json": "threadId,omitempty"
                    }
                  },
                  "replyToId": {
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "core.Uuid",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    },
                    "description": "ID of the item this item answers directly: the root named by\n`threadId` or an item of the same thread. Requires `threadId`.\nRead on insert; on update it must be omitted or equal the stored\nvalue.\n",
                    "x-go-name": "ReplyToID",
                    "x-oapi-codegen-extra-tags": {
                      "json": "replyToId,omitempty"
                    }
                  },
                  "threadIndex": {
                    "type": "integer",
                    "description": "Position of the item in its thread, the root counting as 0.\nRequired exactly when `threadId` is given. Read on insert; on\nupdate it must be omitted or equal the stored value.\n",
                    "minimum": 1
                  },
                  "mediaAssetIds": {
                    "type": "array",
                    "uniqueItems": true,
                    "maxItems": 20,
                    "x-go-type": "pq.StringArray",
                    "x-go-type-import": {
                      "path": "github.com/lib/pq"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "description": "ID of a media_asset in the same organization."
                    },
                    "description": "The media assets the item posts, in posting order. Omitted on\ninsert means none; omitted on update keeps the stored list (old\nclients send the whole item without it); an empty array clears it.\n",
                    "x-oapi-codegen-extra-tags": {
                      "json": "mediaAssetIds,omitempty"
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Content item created",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Content Item Schema",
                  "description": "Server-returned content item as persisted by the owning service.\nContent items carry a row number and a server-computed fingerprint over\ntheir canonical values; updates are conditional on the fingerprint the\nwriter read, so stale writes are refused rather than silently applied.\nAn item may carry its own rules of engagement, which can only tighten,\nand may belong to a thread through `threadId`, `replyToId` and\n`threadIndex`. See docs/content-item-contract.md.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "profile",
                    "rowNumber",
                    "fingerprint",
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
                      "x-oapi-codegen-extra-tags": {
                        "db": "id"
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
                    "profile": {
                      "type": "string",
                      "description": "Subject of the owning profile.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "profile"
                      },
                      "x-order": 3
                    },
                    "rowNumber": {
                      "type": "integer",
                      "description": "Row number of the content item, unique across the live content items of the organization.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "row_number"
                      },
                      "x-order": 4
                    },
                    "fingerprint": {
                      "type": "string",
                      "description": "Hex digest over the canonical content values (`data`, `profile`, `rowNumber` and, when set, `rulesOfEngagement` and `mediaAssetIds`), typed so null, empty string, zero and false differ. An item without them hashes exactly as it did before the fields existed. The thread fields are fixed at insert and are not part of it. Server-computed; used for conditional updates.\n",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "fingerprint"
                      },
                      "x-order": 5
                    },
                    "data": {
                      "type": "object",
                      "description": "Content values, stored as a JSON blob.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "data"
                      },
                      "x-order": 6
                    },
                    "createdAt": {
                      "description": "Timestamp of content item creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 7,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last content item modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 8,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the content item was soft-deleted.",
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
                      "x-order": 9
                    },
                    "createdBy": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-name": "CreatedBy",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_by",
                        "json": "createdBy,omitempty"
                      },
                      "x-order": 10
                    },
                    "rulesOfEngagement": {
                      "description": "The item's own rules of engagement, set by the order that wrote it. They can only tighten: the client that runs the item applies the stricter of these and the rules that apply to the item's profile and platform without them, and the warm-up and the pause after a sign-in challenge always apply. The server validates the shape and stores the value; it does not resolve it. Omitted when the item has none, in which case the item runs under the rules that apply without them.\n",
                      "x-oapi-codegen-extra-tags": {
                        "db": "rules_of_engagement",
                        "json": "rulesOfEngagement,omitempty"
                      },
                      "x-order": 11,
                      "type": "object",
                      "x-generate-db-helpers": true,
                      "additionalProperties": false,
                      "required": [
                        "preset"
                      ],
                      "properties": {
                        "preset": {
                          "x-go-type": "posturev1beta3.Posture",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/v1beta3/posture",
                            "name": "posturev1beta3"
                          },
                          "description": "The preset the item asks for. It applies only when it is at\nleast as cautious as the preset its profile and platform\nresolve to.\n",
                          "$schema": "http://json-schema.org/draft-07/schema#",
                          "title": "Posture Schema",
                          "type": "string",
                          "enum": [
                            "cautious",
                            "standard",
                            "brisk"
                          ]
                        },
                        "dials": {
                          "description": "Dials changed for this item only. Omitted when none were\nchanged; present, the item's rules read as adjusted.\n",
                          "type": "object",
                          "additionalProperties": false,
                          "properties": {
                            "pace": {
                              "type": "string",
                              "description": "Typing and interaction pace.",
                              "enum": [
                                "slow",
                                "normal",
                                "fast"
                              ],
                              "x-enum-varnames": [
                                "ContentItemPaceSlow",
                                "ContentItemPaceNormal",
                                "ContentItemPaceFast"
                              ]
                            },
                            "minDelaySeconds": {
                              "type": "integer",
                              "description": "Least time, in seconds, between two public actions on one platform for one profile.",
                              "minimum": 0,
                              "maximum": 86400
                            },
                            "quietHours": {
                              "description": "Local hours with no public actions.",
                              "type": "object",
                              "additionalProperties": false,
                              "required": [
                                "start",
                                "end"
                              ],
                              "properties": {
                                "start": {
                                  "type": "integer",
                                  "description": "Local hour the window opens.",
                                  "minimum": 0,
                                  "maximum": 23
                                },
                                "end": {
                                  "type": "integer",
                                  "description": "Local hour the window closes.",
                                  "minimum": 0,
                                  "maximum": 23
                                }
                              }
                            },
                            "capFraction": {
                              "type": "number",
                              "format": "double",
                              "description": "Share of each built-in daily cap the item may use, above 0 and at most 1.",
                              "minimum": 0,
                              "exclusiveMinimum": true,
                              "maximum": 1
                            },
                            "noMouseMove": {
                              "type": "boolean",
                              "description": "Whether the item runs without pointer movement."
                            }
                          }
                        }
                      }
                    },
                    "threadId": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "core.Uuid",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "description": "ID of the root item of the thread this item belongs to: the first post of a split thread, or the first transmission of a conversation between profiles. Omitted on a standalone item and on a root itself; a root is the item other items name here. Set on insert only.\n",
                      "x-go-name": "ThreadID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "thread_id",
                        "json": "threadId,omitempty"
                      },
                      "x-order": 12
                    },
                    "replyToId": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "core.Uuid",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "description": "ID of the item this item answers directly: the thread root or another item of the same thread. A split thread's part names the part before it; a reply in a conversation between profiles names the transmission above it. Omitted when the item answers nothing. Never set without `threadId`. Set on insert only.\n",
                      "x-go-name": "ReplyToID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "reply_to_id",
                        "json": "replyToId,omitempty"
                      },
                      "x-order": 13
                    },
                    "threadIndex": {
                      "type": "integer",
                      "description": "Position of the item in its thread, counting the root as 0. Present exactly when `threadId` is, unique among the live items of the thread, and greater than the position of the item named by `replyToId`. Set on insert only.\n",
                      "minimum": 1,
                      "x-oapi-codegen-extra-tags": {
                        "db": "thread_index",
                        "json": "threadIndex,omitempty"
                      },
                      "x-order": 14
                    },
                    "mediaAssetIds": {
                      "type": "array",
                      "uniqueItems": true,
                      "maxItems": 20,
                      "x-go-type": "pq.StringArray",
                      "x-go-type-import": {
                        "path": "github.com/lib/pq"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "description": "ID of a media_asset in the same organization."
                      },
                      "description": "The media assets the item posts, in posting order. Ids only, never URLs. Omitted when the item posts no file.\n",
                      "x-oapi-codegen-extra-tags": {
                        "db": "media_asset_ids",
                        "json": "mediaAssetIds,omitempty"
                      },
                      "x-order": 15
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
          "403": {
            "description": "Forbidden",
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
            "description": "Conflict - the stale expectedFingerprint precondition no longer matches the stored content fingerprint, another live content item of the organization already holds the same rowNumber, or another live item of the same thread already holds the same threadIndex",
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
    "/api/content-items/{contentItemId}": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "contentItems"
        ],
        "summary": "Get a content item by ID",
        "operationId": "getContentItem",
        "parameters": [
          {
            "name": "contentItemId",
            "in": "path",
            "description": "Content item ID",
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
            "description": "Content item response",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Content Item Schema",
                  "description": "Server-returned content item as persisted by the owning service.\nContent items carry a row number and a server-computed fingerprint over\ntheir canonical values; updates are conditional on the fingerprint the\nwriter read, so stale writes are refused rather than silently applied.\nAn item may carry its own rules of engagement, which can only tighten,\nand may belong to a thread through `threadId`, `replyToId` and\n`threadIndex`. See docs/content-item-contract.md.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "profile",
                    "rowNumber",
                    "fingerprint",
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
                      "x-oapi-codegen-extra-tags": {
                        "db": "id"
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
                    "profile": {
                      "type": "string",
                      "description": "Subject of the owning profile.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "profile"
                      },
                      "x-order": 3
                    },
                    "rowNumber": {
                      "type": "integer",
                      "description": "Row number of the content item, unique across the live content items of the organization.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "row_number"
                      },
                      "x-order": 4
                    },
                    "fingerprint": {
                      "type": "string",
                      "description": "Hex digest over the canonical content values (`data`, `profile`, `rowNumber` and, when set, `rulesOfEngagement` and `mediaAssetIds`), typed so null, empty string, zero and false differ. An item without them hashes exactly as it did before the fields existed. The thread fields are fixed at insert and are not part of it. Server-computed; used for conditional updates.\n",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "fingerprint"
                      },
                      "x-order": 5
                    },
                    "data": {
                      "type": "object",
                      "description": "Content values, stored as a JSON blob.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "data"
                      },
                      "x-order": 6
                    },
                    "createdAt": {
                      "description": "Timestamp of content item creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 7,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last content item modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 8,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the content item was soft-deleted.",
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
                      "x-order": 9
                    },
                    "createdBy": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-name": "CreatedBy",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_by",
                        "json": "createdBy,omitempty"
                      },
                      "x-order": 10
                    },
                    "rulesOfEngagement": {
                      "description": "The item's own rules of engagement, set by the order that wrote it. They can only tighten: the client that runs the item applies the stricter of these and the rules that apply to the item's profile and platform without them, and the warm-up and the pause after a sign-in challenge always apply. The server validates the shape and stores the value; it does not resolve it. Omitted when the item has none, in which case the item runs under the rules that apply without them.\n",
                      "x-oapi-codegen-extra-tags": {
                        "db": "rules_of_engagement",
                        "json": "rulesOfEngagement,omitempty"
                      },
                      "x-order": 11,
                      "type": "object",
                      "x-generate-db-helpers": true,
                      "additionalProperties": false,
                      "required": [
                        "preset"
                      ],
                      "properties": {
                        "preset": {
                          "x-go-type": "posturev1beta3.Posture",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/v1beta3/posture",
                            "name": "posturev1beta3"
                          },
                          "description": "The preset the item asks for. It applies only when it is at\nleast as cautious as the preset its profile and platform\nresolve to.\n",
                          "$schema": "http://json-schema.org/draft-07/schema#",
                          "title": "Posture Schema",
                          "type": "string",
                          "enum": [
                            "cautious",
                            "standard",
                            "brisk"
                          ]
                        },
                        "dials": {
                          "description": "Dials changed for this item only. Omitted when none were\nchanged; present, the item's rules read as adjusted.\n",
                          "type": "object",
                          "additionalProperties": false,
                          "properties": {
                            "pace": {
                              "type": "string",
                              "description": "Typing and interaction pace.",
                              "enum": [
                                "slow",
                                "normal",
                                "fast"
                              ],
                              "x-enum-varnames": [
                                "ContentItemPaceSlow",
                                "ContentItemPaceNormal",
                                "ContentItemPaceFast"
                              ]
                            },
                            "minDelaySeconds": {
                              "type": "integer",
                              "description": "Least time, in seconds, between two public actions on one platform for one profile.",
                              "minimum": 0,
                              "maximum": 86400
                            },
                            "quietHours": {
                              "description": "Local hours with no public actions.",
                              "type": "object",
                              "additionalProperties": false,
                              "required": [
                                "start",
                                "end"
                              ],
                              "properties": {
                                "start": {
                                  "type": "integer",
                                  "description": "Local hour the window opens.",
                                  "minimum": 0,
                                  "maximum": 23
                                },
                                "end": {
                                  "type": "integer",
                                  "description": "Local hour the window closes.",
                                  "minimum": 0,
                                  "maximum": 23
                                }
                              }
                            },
                            "capFraction": {
                              "type": "number",
                              "format": "double",
                              "description": "Share of each built-in daily cap the item may use, above 0 and at most 1.",
                              "minimum": 0,
                              "exclusiveMinimum": true,
                              "maximum": 1
                            },
                            "noMouseMove": {
                              "type": "boolean",
                              "description": "Whether the item runs without pointer movement."
                            }
                          }
                        }
                      }
                    },
                    "threadId": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "core.Uuid",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "description": "ID of the root item of the thread this item belongs to: the first post of a split thread, or the first transmission of a conversation between profiles. Omitted on a standalone item and on a root itself; a root is the item other items name here. Set on insert only.\n",
                      "x-go-name": "ThreadID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "thread_id",
                        "json": "threadId,omitempty"
                      },
                      "x-order": 12
                    },
                    "replyToId": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "core.Uuid",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "description": "ID of the item this item answers directly: the thread root or another item of the same thread. A split thread's part names the part before it; a reply in a conversation between profiles names the transmission above it. Omitted when the item answers nothing. Never set without `threadId`. Set on insert only.\n",
                      "x-go-name": "ReplyToID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "reply_to_id",
                        "json": "replyToId,omitempty"
                      },
                      "x-order": 13
                    },
                    "threadIndex": {
                      "type": "integer",
                      "description": "Position of the item in its thread, counting the root as 0. Present exactly when `threadId` is, unique among the live items of the thread, and greater than the position of the item named by `replyToId`. Set on insert only.\n",
                      "minimum": 1,
                      "x-oapi-codegen-extra-tags": {
                        "db": "thread_index",
                        "json": "threadIndex,omitempty"
                      },
                      "x-order": 14
                    },
                    "mediaAssetIds": {
                      "type": "array",
                      "uniqueItems": true,
                      "maxItems": 20,
                      "x-go-type": "pq.StringArray",
                      "x-go-type-import": {
                        "path": "github.com/lib/pq"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "description": "ID of a media_asset in the same organization."
                      },
                      "description": "The media assets the item posts, in posting order. Ids only, never URLs. Omitted when the item posts no file.\n",
                      "x-oapi-codegen-extra-tags": {
                        "db": "media_asset_ids",
                        "json": "mediaAssetIds,omitempty"
                      },
                      "x-order": 15
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
          "403": {
            "description": "Forbidden",
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
          "contentItems"
        ],
        "summary": "Update a content item",
        "operationId": "updateContentItem",
        "description": "Conditionally updates the content item. When\n`expectedFingerprint` is supplied and stale, the update is\nrefused with a 409, as is an update that would move the item\nonto a `rowNumber` another live content item of the organization\nholds. An omitted `rowNumber` keeps the stored one.\nAn omitted `rulesOfEngagement` keeps the stored rules and `null`\nclears them, so a writer that does not know the field never erases\nit. An omitted `mediaAssetIds` keeps the stored list and `[]`\nclears it. The thread fields are fixed at insert: omitted, or equal to the\nstored values, they are kept; any other value is refused with a 400.\n",
        "parameters": [
          {
            "name": "contentItemId",
            "in": "path",
            "description": "Content item ID",
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
                "description": "Payload for inserting or updating a content item.\nContains only client-settable fields; the owning\n`organizationId` (derived from the authenticated session), the\nserver-computed `fingerprint` and the server-generated\n`createdAt` / `updatedAt` timestamps are intentionally excluded.\n",
                "required": [
                  "profile"
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
                  "profile": {
                    "type": "string",
                    "description": "Subject of the owning profile.",
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "rowNumber": {
                    "type": "integer",
                    "description": "Row number of the content item, unique across the live content\nitems of the organization. Optional: omitted on insert, the\nserver assigns the next row number of the organization; omitted\non update, the stored row number is kept.\n",
                    "minimum": 0
                  },
                  "data": {
                    "type": "object",
                    "description": "Content values, stored as a JSON blob.",
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    },
                    "x-go-type-skip-optional-pointer": true
                  },
                  "expectedFingerprint": {
                    "type": "string",
                    "description": "Optimistic-concurrency precondition for update: when supplied,\nthe update applies only when the stored fingerprint still\nmatches, and is refused with a 409 otherwise. Ignored on\ninsert.\n",
                    "maxLength": 255
                  },
                  "rulesOfEngagement": {
                    "allOf": [
                      {
                        "type": "object",
                        "x-generate-db-helpers": true,
                        "additionalProperties": false,
                        "description": "A content item's own rules of engagement: a Posture preset and,\noptionally, dials changed for this item only. Every value can only\ntighten. The client that runs the item resolves the effective rules\nas the stricter of these and the rules that apply to its profile and\nplatform without them (the more cautious preset wins, and each dial\napplies only where it is stricter than the resolved preset's own);\nthe warm-up and the pause after a sign-in challenge always apply.\nThe server validates the shape and stores the value as given; it\nnever resolves or loosens it.\n",
                        "required": [
                          "preset"
                        ],
                        "properties": {
                          "preset": {
                            "x-go-type": "posturev1beta3.Posture",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/v1beta3/posture",
                              "name": "posturev1beta3"
                            },
                            "description": "The preset the item asks for. It applies only when it is at\nleast as cautious as the preset its profile and platform\nresolve to.\n",
                            "$schema": "http://json-schema.org/draft-07/schema#",
                            "title": "Posture Schema",
                            "type": "string",
                            "enum": [
                              "cautious",
                              "standard",
                              "brisk"
                            ]
                          },
                          "dials": {
                            "description": "Dials changed for this item only. Omitted when none were\nchanged; present, the item's rules read as adjusted.\n",
                            "type": "object",
                            "additionalProperties": false,
                            "properties": {
                              "pace": {
                                "type": "string",
                                "description": "Typing and interaction pace.",
                                "enum": [
                                  "slow",
                                  "normal",
                                  "fast"
                                ],
                                "x-enum-varnames": [
                                  "ContentItemPaceSlow",
                                  "ContentItemPaceNormal",
                                  "ContentItemPaceFast"
                                ]
                              },
                              "minDelaySeconds": {
                                "type": "integer",
                                "description": "Least time, in seconds, between two public actions on one platform for one profile.",
                                "minimum": 0,
                                "maximum": 86400
                              },
                              "quietHours": {
                                "description": "Local hours with no public actions.",
                                "type": "object",
                                "additionalProperties": false,
                                "required": [
                                  "start",
                                  "end"
                                ],
                                "properties": {
                                  "start": {
                                    "type": "integer",
                                    "description": "Local hour the window opens.",
                                    "minimum": 0,
                                    "maximum": 23
                                  },
                                  "end": {
                                    "type": "integer",
                                    "description": "Local hour the window closes.",
                                    "minimum": 0,
                                    "maximum": 23
                                  }
                                }
                              },
                              "capFraction": {
                                "type": "number",
                                "format": "double",
                                "description": "Share of each built-in daily cap the item may use, above 0 and at most 1.",
                                "minimum": 0,
                                "exclusiveMinimum": true,
                                "maximum": 1
                              },
                              "noMouseMove": {
                                "type": "boolean",
                                "description": "Whether the item runs without pointer movement."
                              }
                            }
                          }
                        }
                      }
                    ],
                    "description": "The item's own rules of engagement, which can only tighten the\nrules its profile and platform run under. Omitted on insert, the\nitem has none; omitted on update, the stored rules are kept;\n`null` on update clears them.\n",
                    "nullable": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "rulesOfEngagement,omitempty"
                    }
                  },
                  "threadId": {
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "core.Uuid",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    },
                    "description": "ID of the thread's root item. Read on insert; on update it must\nbe omitted or equal the stored value.\n",
                    "x-go-name": "ThreadID",
                    "x-oapi-codegen-extra-tags": {
                      "json": "threadId,omitempty"
                    }
                  },
                  "replyToId": {
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "core.Uuid",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    },
                    "description": "ID of the item this item answers directly: the root named by\n`threadId` or an item of the same thread. Requires `threadId`.\nRead on insert; on update it must be omitted or equal the stored\nvalue.\n",
                    "x-go-name": "ReplyToID",
                    "x-oapi-codegen-extra-tags": {
                      "json": "replyToId,omitempty"
                    }
                  },
                  "threadIndex": {
                    "type": "integer",
                    "description": "Position of the item in its thread, the root counting as 0.\nRequired exactly when `threadId` is given. Read on insert; on\nupdate it must be omitted or equal the stored value.\n",
                    "minimum": 1
                  },
                  "mediaAssetIds": {
                    "type": "array",
                    "uniqueItems": true,
                    "maxItems": 20,
                    "x-go-type": "pq.StringArray",
                    "x-go-type-import": {
                      "path": "github.com/lib/pq"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "description": "ID of a media_asset in the same organization."
                    },
                    "description": "The media assets the item posts, in posting order. Omitted on\ninsert means none; omitted on update keeps the stored list (old\nclients send the whole item without it); an empty array clears it.\n",
                    "x-oapi-codegen-extra-tags": {
                      "json": "mediaAssetIds,omitempty"
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Content item updated",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Content Item Schema",
                  "description": "Server-returned content item as persisted by the owning service.\nContent items carry a row number and a server-computed fingerprint over\ntheir canonical values; updates are conditional on the fingerprint the\nwriter read, so stale writes are refused rather than silently applied.\nAn item may carry its own rules of engagement, which can only tighten,\nand may belong to a thread through `threadId`, `replyToId` and\n`threadIndex`. See docs/content-item-contract.md.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "profile",
                    "rowNumber",
                    "fingerprint",
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
                      "x-oapi-codegen-extra-tags": {
                        "db": "id"
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
                    "profile": {
                      "type": "string",
                      "description": "Subject of the owning profile.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "profile"
                      },
                      "x-order": 3
                    },
                    "rowNumber": {
                      "type": "integer",
                      "description": "Row number of the content item, unique across the live content items of the organization.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "row_number"
                      },
                      "x-order": 4
                    },
                    "fingerprint": {
                      "type": "string",
                      "description": "Hex digest over the canonical content values (`data`, `profile`, `rowNumber` and, when set, `rulesOfEngagement` and `mediaAssetIds`), typed so null, empty string, zero and false differ. An item without them hashes exactly as it did before the fields existed. The thread fields are fixed at insert and are not part of it. Server-computed; used for conditional updates.\n",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "fingerprint"
                      },
                      "x-order": 5
                    },
                    "data": {
                      "type": "object",
                      "description": "Content values, stored as a JSON blob.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "data"
                      },
                      "x-order": 6
                    },
                    "createdAt": {
                      "description": "Timestamp of content item creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 7,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last content item modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 8,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the content item was soft-deleted.",
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
                      "x-order": 9
                    },
                    "createdBy": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-name": "CreatedBy",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_by",
                        "json": "createdBy,omitempty"
                      },
                      "x-order": 10
                    },
                    "rulesOfEngagement": {
                      "description": "The item's own rules of engagement, set by the order that wrote it. They can only tighten: the client that runs the item applies the stricter of these and the rules that apply to the item's profile and platform without them, and the warm-up and the pause after a sign-in challenge always apply. The server validates the shape and stores the value; it does not resolve it. Omitted when the item has none, in which case the item runs under the rules that apply without them.\n",
                      "x-oapi-codegen-extra-tags": {
                        "db": "rules_of_engagement",
                        "json": "rulesOfEngagement,omitempty"
                      },
                      "x-order": 11,
                      "type": "object",
                      "x-generate-db-helpers": true,
                      "additionalProperties": false,
                      "required": [
                        "preset"
                      ],
                      "properties": {
                        "preset": {
                          "x-go-type": "posturev1beta3.Posture",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/v1beta3/posture",
                            "name": "posturev1beta3"
                          },
                          "description": "The preset the item asks for. It applies only when it is at\nleast as cautious as the preset its profile and platform\nresolve to.\n",
                          "$schema": "http://json-schema.org/draft-07/schema#",
                          "title": "Posture Schema",
                          "type": "string",
                          "enum": [
                            "cautious",
                            "standard",
                            "brisk"
                          ]
                        },
                        "dials": {
                          "description": "Dials changed for this item only. Omitted when none were\nchanged; present, the item's rules read as adjusted.\n",
                          "type": "object",
                          "additionalProperties": false,
                          "properties": {
                            "pace": {
                              "type": "string",
                              "description": "Typing and interaction pace.",
                              "enum": [
                                "slow",
                                "normal",
                                "fast"
                              ],
                              "x-enum-varnames": [
                                "ContentItemPaceSlow",
                                "ContentItemPaceNormal",
                                "ContentItemPaceFast"
                              ]
                            },
                            "minDelaySeconds": {
                              "type": "integer",
                              "description": "Least time, in seconds, between two public actions on one platform for one profile.",
                              "minimum": 0,
                              "maximum": 86400
                            },
                            "quietHours": {
                              "description": "Local hours with no public actions.",
                              "type": "object",
                              "additionalProperties": false,
                              "required": [
                                "start",
                                "end"
                              ],
                              "properties": {
                                "start": {
                                  "type": "integer",
                                  "description": "Local hour the window opens.",
                                  "minimum": 0,
                                  "maximum": 23
                                },
                                "end": {
                                  "type": "integer",
                                  "description": "Local hour the window closes.",
                                  "minimum": 0,
                                  "maximum": 23
                                }
                              }
                            },
                            "capFraction": {
                              "type": "number",
                              "format": "double",
                              "description": "Share of each built-in daily cap the item may use, above 0 and at most 1.",
                              "minimum": 0,
                              "exclusiveMinimum": true,
                              "maximum": 1
                            },
                            "noMouseMove": {
                              "type": "boolean",
                              "description": "Whether the item runs without pointer movement."
                            }
                          }
                        }
                      }
                    },
                    "threadId": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "core.Uuid",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "description": "ID of the root item of the thread this item belongs to: the first post of a split thread, or the first transmission of a conversation between profiles. Omitted on a standalone item and on a root itself; a root is the item other items name here. Set on insert only.\n",
                      "x-go-name": "ThreadID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "thread_id",
                        "json": "threadId,omitempty"
                      },
                      "x-order": 12
                    },
                    "replyToId": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "core.Uuid",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "description": "ID of the item this item answers directly: the thread root or another item of the same thread. A split thread's part names the part before it; a reply in a conversation between profiles names the transmission above it. Omitted when the item answers nothing. Never set without `threadId`. Set on insert only.\n",
                      "x-go-name": "ReplyToID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "reply_to_id",
                        "json": "replyToId,omitempty"
                      },
                      "x-order": 13
                    },
                    "threadIndex": {
                      "type": "integer",
                      "description": "Position of the item in its thread, counting the root as 0. Present exactly when `threadId` is, unique among the live items of the thread, and greater than the position of the item named by `replyToId`. Set on insert only.\n",
                      "minimum": 1,
                      "x-oapi-codegen-extra-tags": {
                        "db": "thread_index",
                        "json": "threadIndex,omitempty"
                      },
                      "x-order": 14
                    },
                    "mediaAssetIds": {
                      "type": "array",
                      "uniqueItems": true,
                      "maxItems": 20,
                      "x-go-type": "pq.StringArray",
                      "x-go-type-import": {
                        "path": "github.com/lib/pq"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "description": "ID of a media_asset in the same organization."
                      },
                      "description": "The media assets the item posts, in posting order. Ids only, never URLs. Omitted when the item posts no file.\n",
                      "x-oapi-codegen-extra-tags": {
                        "db": "media_asset_ids",
                        "json": "mediaAssetIds,omitempty"
                      },
                      "x-order": 15
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
          "403": {
            "description": "Forbidden",
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
            "description": "Conflict - the stale expectedFingerprint precondition no longer matches the stored content fingerprint, another live content item of the organization already holds the same rowNumber, or another live item of the same thread already holds the same threadIndex",
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
          "contentItems"
        ],
        "summary": "Delete a content item",
        "operationId": "deleteContentItem",
        "description": "Soft-deletes the content item. When `expectedFingerprint` is\nsupplied, the delete applies only when the stored fingerprint\nstill matches and is refused with a 409 otherwise; without it the\ndelete is unconditional. Deleting an item that other items name in\n`threadId` or `replyToId` leaves their references as they are.\n",
        "parameters": [
          {
            "name": "contentItemId",
            "in": "path",
            "description": "Content item ID",
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
            "name": "expectedFingerprint",
            "in": "query",
            "description": "Optional optimistic-concurrency precondition for delete: the\ndelete applies only when the stored fingerprint still matches.\n",
            "required": false,
            "schema": {
              "type": "string",
              "maxLength": 255
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Content item deleted"
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
          "403": {
            "description": "Forbidden",
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
            "description": "Conflict - the stale expectedFingerprint precondition no longer matches the stored content fingerprint, another live content item of the organization already holds the same rowNumber, or another live item of the same thread already holds the same threadIndex",
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
      "403": {
        "description": "Forbidden",
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
        "description": "Conflict - the stale expectedFingerprint precondition no longer matches the stored content fingerprint, another live content item of the organization already holds the same rowNumber, or another live item of the same thread already holds the same threadIndex",
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
    "parameters": {
      "expectedFingerprint": {
        "name": "expectedFingerprint",
        "in": "query",
        "description": "Optional optimistic-concurrency precondition for delete: the\ndelete applies only when the stored fingerprint still matches.\n",
        "required": false,
        "schema": {
          "type": "string",
          "maxLength": 255
        }
      },
      "threadId": {
        "name": "threadId",
        "in": "query",
        "required": false,
        "description": "Return one thread: the root item this ID names and every live item\nwhose `threadId` names it.\n",
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
      "contentItemId": {
        "name": "contentItemId",
        "in": "path",
        "description": "Content item ID",
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
      "ContentItem": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Content Item Schema",
        "description": "Server-returned content item as persisted by the owning service.\nContent items carry a row number and a server-computed fingerprint over\ntheir canonical values; updates are conditional on the fingerprint the\nwriter read, so stale writes are refused rather than silently applied.\nAn item may carry its own rules of engagement, which can only tighten,\nand may belong to a thread through `threadId`, `replyToId` and\n`threadIndex`. See docs/content-item-contract.md.\n",
        "type": "object",
        "additionalProperties": false,
        "required": [
          "id",
          "organizationId",
          "profile",
          "rowNumber",
          "fingerprint",
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
            "x-oapi-codegen-extra-tags": {
              "db": "id"
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
          "profile": {
            "type": "string",
            "description": "Subject of the owning profile.",
            "minLength": 1,
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "profile"
            },
            "x-order": 3
          },
          "rowNumber": {
            "type": "integer",
            "description": "Row number of the content item, unique across the live content items of the organization.",
            "minimum": 0,
            "x-oapi-codegen-extra-tags": {
              "db": "row_number"
            },
            "x-order": 4
          },
          "fingerprint": {
            "type": "string",
            "description": "Hex digest over the canonical content values (`data`, `profile`, `rowNumber` and, when set, `rulesOfEngagement` and `mediaAssetIds`), typed so null, empty string, zero and false differ. An item without them hashes exactly as it did before the fields existed. The thread fields are fixed at insert and are not part of it. Server-computed; used for conditional updates.\n",
            "minLength": 1,
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "fingerprint"
            },
            "x-order": 5
          },
          "data": {
            "type": "object",
            "description": "Content values, stored as a JSON blob.",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "data"
            },
            "x-order": 6
          },
          "createdAt": {
            "description": "Timestamp of content item creation.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at"
            },
            "x-order": 7,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp of last content item modification.",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at"
            },
            "x-order": 8,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deletedAt": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the content item was soft-deleted.",
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
            "x-order": 9
          },
          "createdBy": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-name": "CreatedBy",
            "x-oapi-codegen-extra-tags": {
              "db": "created_by",
              "json": "createdBy,omitempty"
            },
            "x-order": 10
          },
          "rulesOfEngagement": {
            "description": "The item's own rules of engagement, set by the order that wrote it. They can only tighten: the client that runs the item applies the stricter of these and the rules that apply to the item's profile and platform without them, and the warm-up and the pause after a sign-in challenge always apply. The server validates the shape and stores the value; it does not resolve it. Omitted when the item has none, in which case the item runs under the rules that apply without them.\n",
            "x-oapi-codegen-extra-tags": {
              "db": "rules_of_engagement",
              "json": "rulesOfEngagement,omitempty"
            },
            "x-order": 11,
            "type": "object",
            "x-generate-db-helpers": true,
            "additionalProperties": false,
            "required": [
              "preset"
            ],
            "properties": {
              "preset": {
                "x-go-type": "posturev1beta3.Posture",
                "x-go-type-import": {
                  "path": "github.com/meshery/schemas/models/v1beta3/posture",
                  "name": "posturev1beta3"
                },
                "description": "The preset the item asks for. It applies only when it is at\nleast as cautious as the preset its profile and platform\nresolve to.\n",
                "$schema": "http://json-schema.org/draft-07/schema#",
                "title": "Posture Schema",
                "type": "string",
                "enum": [
                  "cautious",
                  "standard",
                  "brisk"
                ]
              },
              "dials": {
                "description": "Dials changed for this item only. Omitted when none were\nchanged; present, the item's rules read as adjusted.\n",
                "type": "object",
                "additionalProperties": false,
                "properties": {
                  "pace": {
                    "type": "string",
                    "description": "Typing and interaction pace.",
                    "enum": [
                      "slow",
                      "normal",
                      "fast"
                    ],
                    "x-enum-varnames": [
                      "ContentItemPaceSlow",
                      "ContentItemPaceNormal",
                      "ContentItemPaceFast"
                    ]
                  },
                  "minDelaySeconds": {
                    "type": "integer",
                    "description": "Least time, in seconds, between two public actions on one platform for one profile.",
                    "minimum": 0,
                    "maximum": 86400
                  },
                  "quietHours": {
                    "description": "Local hours with no public actions.",
                    "type": "object",
                    "additionalProperties": false,
                    "required": [
                      "start",
                      "end"
                    ],
                    "properties": {
                      "start": {
                        "type": "integer",
                        "description": "Local hour the window opens.",
                        "minimum": 0,
                        "maximum": 23
                      },
                      "end": {
                        "type": "integer",
                        "description": "Local hour the window closes.",
                        "minimum": 0,
                        "maximum": 23
                      }
                    }
                  },
                  "capFraction": {
                    "type": "number",
                    "format": "double",
                    "description": "Share of each built-in daily cap the item may use, above 0 and at most 1.",
                    "minimum": 0,
                    "exclusiveMinimum": true,
                    "maximum": 1
                  },
                  "noMouseMove": {
                    "type": "boolean",
                    "description": "Whether the item runs without pointer movement."
                  }
                }
              }
            }
          },
          "threadId": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "core.Uuid",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "description": "ID of the root item of the thread this item belongs to: the first post of a split thread, or the first transmission of a conversation between profiles. Omitted on a standalone item and on a root itself; a root is the item other items name here. Set on insert only.\n",
            "x-go-name": "ThreadID",
            "x-oapi-codegen-extra-tags": {
              "db": "thread_id",
              "json": "threadId,omitempty"
            },
            "x-order": 12
          },
          "replyToId": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "core.Uuid",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "description": "ID of the item this item answers directly: the thread root or another item of the same thread. A split thread's part names the part before it; a reply in a conversation between profiles names the transmission above it. Omitted when the item answers nothing. Never set without `threadId`. Set on insert only.\n",
            "x-go-name": "ReplyToID",
            "x-oapi-codegen-extra-tags": {
              "db": "reply_to_id",
              "json": "replyToId,omitempty"
            },
            "x-order": 13
          },
          "threadIndex": {
            "type": "integer",
            "description": "Position of the item in its thread, counting the root as 0. Present exactly when `threadId` is, unique among the live items of the thread, and greater than the position of the item named by `replyToId`. Set on insert only.\n",
            "minimum": 1,
            "x-oapi-codegen-extra-tags": {
              "db": "thread_index",
              "json": "threadIndex,omitempty"
            },
            "x-order": 14
          },
          "mediaAssetIds": {
            "type": "array",
            "uniqueItems": true,
            "maxItems": 20,
            "x-go-type": "pq.StringArray",
            "x-go-type-import": {
              "path": "github.com/lib/pq"
            },
            "x-go-type-skip-optional-pointer": true,
            "items": {
              "type": "string",
              "format": "uuid",
              "description": "ID of a media_asset in the same organization."
            },
            "description": "The media assets the item posts, in posting order. Ids only, never URLs. Omitted when the item posts no file.\n",
            "x-oapi-codegen-extra-tags": {
              "db": "media_asset_ids",
              "json": "mediaAssetIds,omitempty"
            },
            "x-order": 15
          }
        }
      },
      "ContentItemPayload": {
        "type": "object",
        "description": "Payload for inserting or updating a content item.\nContains only client-settable fields; the owning\n`organizationId` (derived from the authenticated session), the\nserver-computed `fingerprint` and the server-generated\n`createdAt` / `updatedAt` timestamps are intentionally excluded.\n",
        "required": [
          "profile"
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
          "profile": {
            "type": "string",
            "description": "Subject of the owning profile.",
            "minLength": 1,
            "maxLength": 255
          },
          "rowNumber": {
            "type": "integer",
            "description": "Row number of the content item, unique across the live content\nitems of the organization. Optional: omitted on insert, the\nserver assigns the next row number of the organization; omitted\non update, the stored row number is kept.\n",
            "minimum": 0
          },
          "data": {
            "type": "object",
            "description": "Content values, stored as a JSON blob.",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "expectedFingerprint": {
            "type": "string",
            "description": "Optimistic-concurrency precondition for update: when supplied,\nthe update applies only when the stored fingerprint still\nmatches, and is refused with a 409 otherwise. Ignored on\ninsert.\n",
            "maxLength": 255
          },
          "rulesOfEngagement": {
            "allOf": [
              {
                "type": "object",
                "x-generate-db-helpers": true,
                "additionalProperties": false,
                "description": "A content item's own rules of engagement: a Posture preset and,\noptionally, dials changed for this item only. Every value can only\ntighten. The client that runs the item resolves the effective rules\nas the stricter of these and the rules that apply to its profile and\nplatform without them (the more cautious preset wins, and each dial\napplies only where it is stricter than the resolved preset's own);\nthe warm-up and the pause after a sign-in challenge always apply.\nThe server validates the shape and stores the value as given; it\nnever resolves or loosens it.\n",
                "required": [
                  "preset"
                ],
                "properties": {
                  "preset": {
                    "x-go-type": "posturev1beta3.Posture",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/v1beta3/posture",
                      "name": "posturev1beta3"
                    },
                    "description": "The preset the item asks for. It applies only when it is at\nleast as cautious as the preset its profile and platform\nresolve to.\n",
                    "$schema": "http://json-schema.org/draft-07/schema#",
                    "title": "Posture Schema",
                    "type": "string",
                    "enum": [
                      "cautious",
                      "standard",
                      "brisk"
                    ]
                  },
                  "dials": {
                    "description": "Dials changed for this item only. Omitted when none were\nchanged; present, the item's rules read as adjusted.\n",
                    "type": "object",
                    "additionalProperties": false,
                    "properties": {
                      "pace": {
                        "type": "string",
                        "description": "Typing and interaction pace.",
                        "enum": [
                          "slow",
                          "normal",
                          "fast"
                        ],
                        "x-enum-varnames": [
                          "ContentItemPaceSlow",
                          "ContentItemPaceNormal",
                          "ContentItemPaceFast"
                        ]
                      },
                      "minDelaySeconds": {
                        "type": "integer",
                        "description": "Least time, in seconds, between two public actions on one platform for one profile.",
                        "minimum": 0,
                        "maximum": 86400
                      },
                      "quietHours": {
                        "description": "Local hours with no public actions.",
                        "type": "object",
                        "additionalProperties": false,
                        "required": [
                          "start",
                          "end"
                        ],
                        "properties": {
                          "start": {
                            "type": "integer",
                            "description": "Local hour the window opens.",
                            "minimum": 0,
                            "maximum": 23
                          },
                          "end": {
                            "type": "integer",
                            "description": "Local hour the window closes.",
                            "minimum": 0,
                            "maximum": 23
                          }
                        }
                      },
                      "capFraction": {
                        "type": "number",
                        "format": "double",
                        "description": "Share of each built-in daily cap the item may use, above 0 and at most 1.",
                        "minimum": 0,
                        "exclusiveMinimum": true,
                        "maximum": 1
                      },
                      "noMouseMove": {
                        "type": "boolean",
                        "description": "Whether the item runs without pointer movement."
                      }
                    }
                  }
                }
              }
            ],
            "description": "The item's own rules of engagement, which can only tighten the\nrules its profile and platform run under. Omitted on insert, the\nitem has none; omitted on update, the stored rules are kept;\n`null` on update clears them.\n",
            "nullable": true,
            "x-oapi-codegen-extra-tags": {
              "json": "rulesOfEngagement,omitempty"
            }
          },
          "threadId": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "core.Uuid",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "description": "ID of the thread's root item. Read on insert; on update it must\nbe omitted or equal the stored value.\n",
            "x-go-name": "ThreadID",
            "x-oapi-codegen-extra-tags": {
              "json": "threadId,omitempty"
            }
          },
          "replyToId": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "core.Uuid",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "description": "ID of the item this item answers directly: the root named by\n`threadId` or an item of the same thread. Requires `threadId`.\nRead on insert; on update it must be omitted or equal the stored\nvalue.\n",
            "x-go-name": "ReplyToID",
            "x-oapi-codegen-extra-tags": {
              "json": "replyToId,omitempty"
            }
          },
          "threadIndex": {
            "type": "integer",
            "description": "Position of the item in its thread, the root counting as 0.\nRequired exactly when `threadId` is given. Read on insert; on\nupdate it must be omitted or equal the stored value.\n",
            "minimum": 1
          },
          "mediaAssetIds": {
            "type": "array",
            "uniqueItems": true,
            "maxItems": 20,
            "x-go-type": "pq.StringArray",
            "x-go-type-import": {
              "path": "github.com/lib/pq"
            },
            "x-go-type-skip-optional-pointer": true,
            "items": {
              "type": "string",
              "format": "uuid",
              "description": "ID of a media_asset in the same organization."
            },
            "description": "The media assets the item posts, in posting order. Omitted on\ninsert means none; omitted on update keeps the stored list (old\nclients send the whole item without it); an empty array clears it.\n",
            "x-oapi-codegen-extra-tags": {
              "json": "mediaAssetIds,omitempty"
            }
          }
        }
      },
      "ContentItemRulesOfEngagement": {
        "type": "object",
        "x-generate-db-helpers": true,
        "additionalProperties": false,
        "description": "A content item's own rules of engagement: a Posture preset and,\noptionally, dials changed for this item only. Every value can only\ntighten. The client that runs the item resolves the effective rules\nas the stricter of these and the rules that apply to its profile and\nplatform without them (the more cautious preset wins, and each dial\napplies only where it is stricter than the resolved preset's own);\nthe warm-up and the pause after a sign-in challenge always apply.\nThe server validates the shape and stores the value as given; it\nnever resolves or loosens it.\n",
        "required": [
          "preset"
        ],
        "properties": {
          "preset": {
            "x-go-type": "posturev1beta3.Posture",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/v1beta3/posture",
              "name": "posturev1beta3"
            },
            "description": "The preset the item asks for. It applies only when it is at\nleast as cautious as the preset its profile and platform\nresolve to.\n",
            "$schema": "http://json-schema.org/draft-07/schema#",
            "title": "Posture Schema",
            "type": "string",
            "enum": [
              "cautious",
              "standard",
              "brisk"
            ]
          },
          "dials": {
            "description": "Dials changed for this item only. Omitted when none were\nchanged; present, the item's rules read as adjusted.\n",
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "pace": {
                "type": "string",
                "description": "Typing and interaction pace.",
                "enum": [
                  "slow",
                  "normal",
                  "fast"
                ],
                "x-enum-varnames": [
                  "ContentItemPaceSlow",
                  "ContentItemPaceNormal",
                  "ContentItemPaceFast"
                ]
              },
              "minDelaySeconds": {
                "type": "integer",
                "description": "Least time, in seconds, between two public actions on one platform for one profile.",
                "minimum": 0,
                "maximum": 86400
              },
              "quietHours": {
                "description": "Local hours with no public actions.",
                "type": "object",
                "additionalProperties": false,
                "required": [
                  "start",
                  "end"
                ],
                "properties": {
                  "start": {
                    "type": "integer",
                    "description": "Local hour the window opens.",
                    "minimum": 0,
                    "maximum": 23
                  },
                  "end": {
                    "type": "integer",
                    "description": "Local hour the window closes.",
                    "minimum": 0,
                    "maximum": 23
                  }
                }
              },
              "capFraction": {
                "type": "number",
                "format": "double",
                "description": "Share of each built-in daily cap the item may use, above 0 and at most 1.",
                "minimum": 0,
                "exclusiveMinimum": true,
                "maximum": 1
              },
              "noMouseMove": {
                "type": "boolean",
                "description": "Whether the item runs without pointer movement."
              }
            }
          }
        }
      },
      "ContentItemRulesOfEngagementDials": {
        "type": "object",
        "additionalProperties": false,
        "description": "Dials of a content item's rules of engagement. Each is optional and\napplies only where it is stricter than the resolved preset's own\nvalue; a dial that would loosen is ignored by the client that runs\nthe item.\n",
        "properties": {
          "pace": {
            "type": "string",
            "description": "Typing and interaction pace.",
            "enum": [
              "slow",
              "normal",
              "fast"
            ],
            "x-enum-varnames": [
              "ContentItemPaceSlow",
              "ContentItemPaceNormal",
              "ContentItemPaceFast"
            ]
          },
          "minDelaySeconds": {
            "type": "integer",
            "description": "Least time, in seconds, between two public actions on one platform for one profile.",
            "minimum": 0,
            "maximum": 86400
          },
          "quietHours": {
            "description": "Local hours with no public actions.",
            "type": "object",
            "additionalProperties": false,
            "required": [
              "start",
              "end"
            ],
            "properties": {
              "start": {
                "type": "integer",
                "description": "Local hour the window opens.",
                "minimum": 0,
                "maximum": 23
              },
              "end": {
                "type": "integer",
                "description": "Local hour the window closes.",
                "minimum": 0,
                "maximum": 23
              }
            }
          },
          "capFraction": {
            "type": "number",
            "format": "double",
            "description": "Share of each built-in daily cap the item may use, above 0 and at most 1.",
            "minimum": 0,
            "exclusiveMinimum": true,
            "maximum": 1
          },
          "noMouseMove": {
            "type": "boolean",
            "description": "Whether the item runs without pointer movement."
          }
        }
      },
      "ContentItemQuietHours": {
        "type": "object",
        "additionalProperties": false,
        "description": "A window of local hours with no public actions, from `start` up to\n`end`, wrapping past midnight when `end` is earlier than `start`.\n",
        "required": [
          "start",
          "end"
        ],
        "properties": {
          "start": {
            "type": "integer",
            "description": "Local hour the window opens.",
            "minimum": 0,
            "maximum": 23
          },
          "end": {
            "type": "integer",
            "description": "Local hour the window closes.",
            "minimum": 0,
            "maximum": 23
          }
        }
      },
      "ContentItemPage": {
        "type": "object",
        "description": "Paginated collection of content items.",
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
          "contentItems": {
            "type": "array",
            "items": {
              "x-go-type": "ContentItem",
              "$schema": "http://json-schema.org/draft-07/schema#",
              "title": "Content Item Schema",
              "description": "Server-returned content item as persisted by the owning service.\nContent items carry a row number and a server-computed fingerprint over\ntheir canonical values; updates are conditional on the fingerprint the\nwriter read, so stale writes are refused rather than silently applied.\nAn item may carry its own rules of engagement, which can only tighten,\nand may belong to a thread through `threadId`, `replyToId` and\n`threadIndex`. See docs/content-item-contract.md.\n",
              "type": "object",
              "additionalProperties": false,
              "required": [
                "id",
                "organizationId",
                "profile",
                "rowNumber",
                "fingerprint",
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
                  "x-oapi-codegen-extra-tags": {
                    "db": "id"
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
                "profile": {
                  "type": "string",
                  "description": "Subject of the owning profile.",
                  "minLength": 1,
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "profile"
                  },
                  "x-order": 3
                },
                "rowNumber": {
                  "type": "integer",
                  "description": "Row number of the content item, unique across the live content items of the organization.",
                  "minimum": 0,
                  "x-oapi-codegen-extra-tags": {
                    "db": "row_number"
                  },
                  "x-order": 4
                },
                "fingerprint": {
                  "type": "string",
                  "description": "Hex digest over the canonical content values (`data`, `profile`, `rowNumber` and, when set, `rulesOfEngagement` and `mediaAssetIds`), typed so null, empty string, zero and false differ. An item without them hashes exactly as it did before the fields existed. The thread fields are fixed at insert and are not part of it. Server-computed; used for conditional updates.\n",
                  "minLength": 1,
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "fingerprint"
                  },
                  "x-order": 5
                },
                "data": {
                  "type": "object",
                  "description": "Content values, stored as a JSON blob.",
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "data"
                  },
                  "x-order": 6
                },
                "createdAt": {
                  "description": "Timestamp of content item creation.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at"
                  },
                  "x-order": 7,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updatedAt": {
                  "description": "Timestamp of last content item modification.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at"
                  },
                  "x-order": 8,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "deletedAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Timestamp when the content item was soft-deleted.",
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
                  "x-order": 9
                },
                "createdBy": {
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-go-name": "CreatedBy",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_by",
                    "json": "createdBy,omitempty"
                  },
                  "x-order": 10
                },
                "rulesOfEngagement": {
                  "description": "The item's own rules of engagement, set by the order that wrote it. They can only tighten: the client that runs the item applies the stricter of these and the rules that apply to the item's profile and platform without them, and the warm-up and the pause after a sign-in challenge always apply. The server validates the shape and stores the value; it does not resolve it. Omitted when the item has none, in which case the item runs under the rules that apply without them.\n",
                  "x-oapi-codegen-extra-tags": {
                    "db": "rules_of_engagement",
                    "json": "rulesOfEngagement,omitempty"
                  },
                  "x-order": 11,
                  "type": "object",
                  "x-generate-db-helpers": true,
                  "additionalProperties": false,
                  "required": [
                    "preset"
                  ],
                  "properties": {
                    "preset": {
                      "x-go-type": "posturev1beta3.Posture",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta3/posture",
                        "name": "posturev1beta3"
                      },
                      "description": "The preset the item asks for. It applies only when it is at\nleast as cautious as the preset its profile and platform\nresolve to.\n",
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "title": "Posture Schema",
                      "type": "string",
                      "enum": [
                        "cautious",
                        "standard",
                        "brisk"
                      ]
                    },
                    "dials": {
                      "description": "Dials changed for this item only. Omitted when none were\nchanged; present, the item's rules read as adjusted.\n",
                      "type": "object",
                      "additionalProperties": false,
                      "properties": {
                        "pace": {
                          "type": "string",
                          "description": "Typing and interaction pace.",
                          "enum": [
                            "slow",
                            "normal",
                            "fast"
                          ],
                          "x-enum-varnames": [
                            "ContentItemPaceSlow",
                            "ContentItemPaceNormal",
                            "ContentItemPaceFast"
                          ]
                        },
                        "minDelaySeconds": {
                          "type": "integer",
                          "description": "Least time, in seconds, between two public actions on one platform for one profile.",
                          "minimum": 0,
                          "maximum": 86400
                        },
                        "quietHours": {
                          "description": "Local hours with no public actions.",
                          "type": "object",
                          "additionalProperties": false,
                          "required": [
                            "start",
                            "end"
                          ],
                          "properties": {
                            "start": {
                              "type": "integer",
                              "description": "Local hour the window opens.",
                              "minimum": 0,
                              "maximum": 23
                            },
                            "end": {
                              "type": "integer",
                              "description": "Local hour the window closes.",
                              "minimum": 0,
                              "maximum": 23
                            }
                          }
                        },
                        "capFraction": {
                          "type": "number",
                          "format": "double",
                          "description": "Share of each built-in daily cap the item may use, above 0 and at most 1.",
                          "minimum": 0,
                          "exclusiveMinimum": true,
                          "maximum": 1
                        },
                        "noMouseMove": {
                          "type": "boolean",
                          "description": "Whether the item runs without pointer movement."
                        }
                      }
                    }
                  }
                },
                "threadId": {
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "core.Uuid",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "description": "ID of the root item of the thread this item belongs to: the first post of a split thread, or the first transmission of a conversation between profiles. Omitted on a standalone item and on a root itself; a root is the item other items name here. Set on insert only.\n",
                  "x-go-name": "ThreadID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "thread_id",
                    "json": "threadId,omitempty"
                  },
                  "x-order": 12
                },
                "replyToId": {
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "core.Uuid",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "description": "ID of the item this item answers directly: the thread root or another item of the same thread. A split thread's part names the part before it; a reply in a conversation between profiles names the transmission above it. Omitted when the item answers nothing. Never set without `threadId`. Set on insert only.\n",
                  "x-go-name": "ReplyToID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "reply_to_id",
                    "json": "replyToId,omitempty"
                  },
                  "x-order": 13
                },
                "threadIndex": {
                  "type": "integer",
                  "description": "Position of the item in its thread, counting the root as 0. Present exactly when `threadId` is, unique among the live items of the thread, and greater than the position of the item named by `replyToId`. Set on insert only.\n",
                  "minimum": 1,
                  "x-oapi-codegen-extra-tags": {
                    "db": "thread_index",
                    "json": "threadIndex,omitempty"
                  },
                  "x-order": 14
                },
                "mediaAssetIds": {
                  "type": "array",
                  "uniqueItems": true,
                  "maxItems": 20,
                  "x-go-type": "pq.StringArray",
                  "x-go-type-import": {
                    "path": "github.com/lib/pq"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "items": {
                    "type": "string",
                    "format": "uuid",
                    "description": "ID of a media_asset in the same organization."
                  },
                  "description": "The media assets the item posts, in posting order. Ids only, never URLs. Omitted when the item posts no file.\n",
                  "x-oapi-codegen-extra-tags": {
                    "db": "media_asset_ids",
                    "json": "mediaAssetIds,omitempty"
                  },
                  "x-order": 15
                }
              }
            },
            "description": "Content items included on this page of results."
          }
        }
      }
    }
  }
};

export default ContentItemSchema;
