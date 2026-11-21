/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const ContentItemSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "ContentItem",
    "description": "OpenAPI schema for content items - fingerprinted content\nvalues keyed by organization and row number, with conditional\nupdates.\nA content item may carry its own rules of engagement\n(`rulesOfEngagement`), which can only tighten the rules its profile and\nplatform run under, and may belong to a thread (`threadId`,\n`replyToId`, `threadIndex`): the parts of a split post, or the replies\nof a conversation between profiles.\nAn item's approval is resolved at insert and again at each content edit\nfrom its `approvalPolicy` (explicit `required` or `not_required` wins;\n`inherit` or absent inherits from higher-level settings, hierarchy defined\nin https://github.com/layer5io/meshery-cloud/issues/6365). Interim: until\nthe upstream policies exist, `inherit` or absent resolves to `required`.\nA content edit that resolves to required resets an approved item to\nunapproved. Any content edit supersedes the item's open request, if any,\nand an item it leaves unapproved gets a fresh pending request for the\ncontent as it now is, so after the edit an unapproved item has an open\nrequest (see updateContentItem and the invariant in\ndocs/content-item-contract.md). A change to `approvalPolicy` alone whose\nresolved result is required resets an approved item the same way. Only a person\nholding Decide Content Item Approvals may write an `approvalPolicy` value\nthat changes the stored one.\nOrganization scope: every operation acts only in the organization the\nsession resolved to (X-Current-Orgid, then the user's selected\norganization), and only when the caller is a live member of it.\nAuthorization: each operation requires one permission key in that\norganization (Catalog Management / Content Items: View Content\nItems for the reads, Create Content Item, Edit Content Item and\nDelete Content Item for the writes); a caller without it receives a\n403 before any row is read. Past that check, an id that does not name\na live content item of the organization, and a caller who is not a\nlive member of it, receive the same 404, so the existence of another\norganization's rows is never disclosed.\n",
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
        "x-mcp": {
          "expose": true,
          "title": "List content items",
          "scope": "content:read",
          "description": "Read-only. Returns a paginated list of the live content items in the organization of the authenticated session, ordered by `rowNumber` unless `order` names another column (`rowNumber`, `createdAt`, `updatedAt`). `search` matches the profile or the content values, case-insensitively. `threadId` returns one whole thread: the root item it names and every live item whose `threadId` names it, ordered by `threadIndex` (the root first) unless `order` names another column. A `threadId` or `X-Current-Orgid` that is not a UUID answers 400."
        },
        "description": "Returns a paginated list of the live content items in the\norganization of the authenticated session, ordered by `rowNumber`\nunless `order` names another column (`rowNumber`, `createdAt`,\n`updatedAt`). `search` matches the profile or the content values,\ncase-insensitively. `threadId` returns one whole thread: the root\nitem it names and every live item whose `threadId` names it,\nordered by `threadIndex` (the root first) unless `order` names\nanother column. A `threadId` or `X-Current-Orgid` that is not a\nUUID answers 400.\n",
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
          },
          {
            "name": "X-Current-Orgid",
            "in": "header",
            "required": false,
            "description": "Organization the call acts in, by ID (a UUID). When present, the server resolves the session organization from it instead of the caller's selected organization, and runs its membership and permission checks there. A caller who is not a live member of the named organization receives the same 404 as an unknown resource. Omitted, a path or query `orgId` the operation takes names the organization when sent; otherwise the caller's selected organization applies when it is not nil; otherwise the server defaults among the caller's live organizations, using the only one when exactly one qualifies. When the call needs an acting organization and several qualify, an operation that declares the OrganizationSelectionRequired response answers 409 `organization_selection_required`. The resolution order is in docs/mcp-operation-contract.md, the organization selector.",
            "schema": {
              "type": "string",
              "minLength": 36,
              "maxLength": 36,
              "pattern": "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"
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
                            "minimum": 1,
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
                          },
                          "approved": {
                            "type": "boolean",
                            "description": "Whether the item is approved to run. Server-set and read-only: it is not in ContentItemPayload. At insert the server sets it from the effective approval, which is resolved at insert, again at each content edit, and again when `approvalPolicy` changes: `false` with a pending `content_item_approval` request when `approvalRequired` is true, and `true` with no request when it is false. Afterwards `approveRequest` in the request construct sets it to true, and so does the one-time backfill of a row written before this field shipped (see below); that operation needs the Decide Content Item Approvals key and is never an AI app tool. A content edit that resolves to required sets it back to false. Any content edit that leaves it unapproved supersedes an open request with a fresh pending one, so after the edit an unapproved item has an open request (see updateContentItem). A change to `approvalPolicy` whose resolved result is required does the same to an approved item. The client that runs the queue reads this field. For one release after this field ships, servers mirror it into the free-form `Approved?` column in `data` for older readers, and backfill `approved` once from that column for rows written before the field shipped, so every row carries a value. A client-sent `Approved?` never approves an item. New readers read this field only. See docs/content-item-contract.md.\n",
                            "default": false,
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "approved",
                              "json": "approved"
                            },
                            "x-order": 16
                          },
                          "createdByClient": {
                            "type": "string",
                            "description": "OAuth client ID of the AI app that created the item. Server-set from the access token, never client-settable, and never changed by an update. Empty or omitted on an item a person created.\n",
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_by_client",
                              "json": "createdByClient,omitempty"
                            },
                            "x-order": 17
                          },
                          "approvalPolicy": {
                            "description": "The item's own approval policy. Absent means inherit. An explicit `required` or `not_required` wins over every higher-level setting; `inherit` or absent inherits from higher-level settings (platform, workspace, profile), hierarchy defined in https://github.com/layer5io/meshery-cloud/issues/6365. Interim: until the upstream policies exist, `inherit` or absent resolves to `required`. Only a person with Decide Content Item Approvals may write a value that changes the stored one; an AI app never can. Changing it alone re-resolves the approval. A change whose result is required (`required`, or `inherit` or absent in the interim, which resolves to required) resets an approved item and opens its request. A change whose result is not required never changes `approved`, and any change leaves an unapproved item with an open request, whatever the result (see updateContentItem). Stored in the nullable `approval_policy` column; null means inherit, and a written `inherit` is stored as null, so reads return it absent.\n",
                            "x-oapi-codegen-extra-tags": {
                              "db": "approval_policy",
                              "json": "approvalPolicy,omitempty"
                            },
                            "x-order": 18,
                            "type": "string",
                            "enum": [
                              "required",
                              "not_required",
                              "inherit"
                            ],
                            "x-enum-varnames": [
                              "ApprovalPolicyRequired",
                              "ApprovalPolicyNotRequired",
                              "ApprovalPolicyInherit"
                            ]
                          },
                          "approvalRequired": {
                            "type": "boolean",
                            "readOnly": true,
                            "description": "Server-computed and read-only: whether the item needs a person's approval, resolved at insert, again at each content edit, and again when `approvalPolicy` changes (see updateContentItem) from its `approvalPolicy` and the higher-level settings (hierarchy defined in https://github.com/layer5io/meshery-cloud/issues/6365). Stored in the `approval_required` column. Never in a payload. A change to `approvalPolicy` alone re-resolves it; a higher-level setting alone does not, and the next content edit resolves it again. Interim: until the upstream policies exist, an absent or `inherit` policy resolves to `true` (approval source `fallback`). Absent on items inserted before this field shipped.\n",
                            "x-oapi-codegen-extra-tags": {
                              "db": "approval_required",
                              "json": "approvalRequired,omitempty"
                            },
                            "x-order": 19
                          },
                          "approvalPolicySource": {
                            "type": "string",
                            "readOnly": true,
                            "description": "Server-computed and read-only: the level that decided `approvalRequired`, resolved at insert, again at each content edit, and again when `approvalPolicy` changes (see updateContentItem), stored in the `approval_policy_source` column. `item` when the item's own `approvalPolicy` was explicit; `fallback` when no level set a value and approval is required. The other levels name the higher level that set the value: `workspace`, `profile`, `organization` and `platform`, listed in their planned order (the hierarchy is defined in https://github.com/layer5io/meshery-cloud/issues/6365). Interim: until the upstream policies exist, only `item` and `fallback` are active (an absent or `inherit` policy resolves to `fallback`). The other four levels become active as that hierarchy lands. Never in a payload. Absent on items inserted before this field shipped.\n",
                            "enum": [
                              "item",
                              "workspace",
                              "profile",
                              "organization",
                              "platform",
                              "fallback"
                            ],
                            "x-enum-varnames": [
                              "ApprovalPolicySourceItem",
                              "ApprovalPolicySourceWorkspace",
                              "ApprovalPolicySourceProfile",
                              "ApprovalPolicySourceOrganization",
                              "ApprovalPolicySourcePlatform",
                              "ApprovalPolicySourceFallback"
                            ],
                            "x-oapi-codegen-extra-tags": {
                              "db": "approval_policy_source",
                              "json": "approvalPolicySource,omitempty"
                            },
                            "x-order": 20
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
            "description": "Conflict - the call needs an organization, none was named, and more than one of the caller's organizations qualifies. Pass one of `choices[].id` as `X-Current-Orgid` (the `organizationId` tool argument). The body's `code` is `organization_selection_required`.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "The call needs an acting organization, the caller named none, and more than one of the caller's live organizations qualifies. Nothing was done by this request. Repeat it naming one of `choices` as `X-Current-Orgid` (the `organizationId` tool argument).",
                  "required": [
                    "code",
                    "message",
                    "choices"
                  ],
                  "additionalProperties": false,
                  "properties": {
                    "code": {
                      "type": "string",
                      "description": "Machine-readable reason. Always `organization_selection_required` for this body.",
                      "enum": [
                        "organization_selection_required"
                      ]
                    },
                    "message": {
                      "type": "string",
                      "minLength": 1,
                      "description": "The sentence the caller is shown."
                    },
                    "choices": {
                      "type": "array",
                      "minItems": 2,
                      "description": "The caller's own live organizations the call could act in. Pass one `id` as `X-Current-Orgid`.",
                      "items": {
                        "type": "object",
                        "description": "An organization the call could act in. Same fields as AvailableOrganization.",
                        "required": [
                          "id",
                          "name",
                          "description"
                        ],
                        "additionalProperties": false,
                        "properties": {
                          "id": {
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "description": "Organization ID.",
                            "x-go-name": "ID"
                          },
                          "name": {
                            "type": "string",
                            "description": "Name of the organization."
                          },
                          "description": {
                            "type": "string",
                            "description": "Description of the organization."
                          }
                        }
                      }
                    }
                  }
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
        "parameters": [
          {
            "name": "Idempotency-Key",
            "in": "header",
            "required": false,
            "description": "Client-chosen key that makes a create safe to retry. The server keeps the organization, the user, the key, a hash of the request and the final response for 24 hours. Only a final response that is not a 5xx is stored. The server answers a 5xx only after it has rolled back the write; a 5xx it answers is not stored and releases the key's claim, so a retry with the same key is processed as new. A response the server has committed is final and is stored, even if a gateway in front of the server later fails the client's connection. A retry with the same key and the same request hash returns the stored response without creating anything again. A retry with the same key and a different request hash answers 422 and creates nothing. A retry with the same key that arrives while the earlier request with that key is still being processed answers 409 with the body `code` `idempotency_key_in_flight` and creates nothing. Once the first request has finished without a 5xx, a retry receives the stored response; after a 5xx, a retry is processed as new. Precedence: while the first request with a key is in flight, every retry with that key answers 409 whatever its body; only once the first request has finished does a retry with a different body answer 422. The in-flight claim of a request that never finished expires 24 hours after it was taken, the same TTL as the stored response; no shorter in-flight lease applies. A retry after that expiry is processed as new. Omitted, the create is not deduplicated. Use a fresh random value (a UUID) per intended create.",
            "schema": {
              "type": "string",
              "minLength": 1,
              "maxLength": 255
            }
          }
        ],
        "description": "Inserts a new content item. Insert-only: any supplied\n`id` and `expectedFingerprint` are ignored; existing rows change\nonly through the conditional `updateContentItem`. The\n`fingerprint` is server-computed. Row numbers are unique across\nthe live content items of the organization, whatever their\n`profile`. When `rowNumber` is omitted the server assigns the next\nrow number of the organization (one more than the highest row\nnumber the organization has used, counting soft-deleted content\nitems so a deleted item's number is not handed out again by\nassignment), atomically with the insert, so\nconcurrent inserts never receive the same number. An organization\nthat has never had a content item is assigned row number 1 first.\nA supplied\n`rowNumber` that another live content item of the organization\nalready holds refuses the insert with a 409 (`code`\n`row_number_taken`).\nA `rulesOfEngagement` outside its schema (an unknown preset or\ndial, or a value out of range) is refused with a 400, on insert\nand on update alike.\nEach `mediaAssetIds` entry must name a media asset of the session\norganization, else 400 (the same 400 for a missing, another\norganization's and a deleted asset), on insert and on update alike.\nThe server does not require the asset to be ready at write time:\ndeleting an asset does not check content item references, and such\nan item is refused by name when it posts, so the posting client\nchecks readiness.\nThread fields are checked against the organization's live content\nitems in the same transaction as the insert, and a violation is\nrefused with a 400: `threadId` must name a live item of the\norganization that is not itself part of a thread; `replyToId`\nrequires `threadId` and must name that root or a live item of the\nsame thread; `threadIndex` is required exactly when `threadId` is\ngiven and must exceed the position of the item `replyToId` names\n(the root counts as 0). An item of another organization, a deleted\nitem and a missing one receive the same 400. A `threadIndex` that\nanother live item of the same thread already holds refuses the\ninsert with a 409 (`code` `thread_index_taken`).\nThe optional `Idempotency-Key` header makes the insert safe to\nretry: within 24 hours the same key with the same request hash\nreturns the first response without inserting again, and the same\nkey with a different request hash answers 422 and inserts nothing.\nA retry with the same key that arrives while the first request with\nthat key is still being processed answers 409 with the body `code`\n`idempotency_key_in_flight` and inserts nothing. Once the first request\nhas finished without a 5xx, a retry receives the stored response; after\na 5xx, a retry is processed as new. Precedence: while the\nfirst request with a key is in flight, every retry with that key\nanswers 409 whatever its body; only once the first request has finished\ndoes a retry with a different body answer 422. An in-flight claim on a\nrequest that never finished expires 24 hours after it was taken, the\nsame TTL as the stored response (no shorter in-flight lease applies),\nand a retry after that is processed as new. The permanent 409s of\nthis operation carry `row_number_taken` and `thread_index_taken`, so\na client tells the in-flight case by its `code`.\nA caller whose effective keys lack Decide Content Item Approvals in\nthe session organization who sends `approvalPolicy` `required` or\n`not_required` gets a 403 and nothing is inserted; a caller holding\nthat key may send any value. Omitted or `inherit`, the item inherits\n(the server stores both as null, so they are the same value). The server resolves the effective approval once,\nhere: when it is required the item lands `approved` false with a\npending `content_item_approval` request; when it is not required the\nserver sets `approved` true and opens no request. Interim: until the\nupstream policies exist, inherit resolves to required.\n`approved` is never in the payload (docs/content-item-contract.md,\nApproval policy).\n",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for inserting or updating a content item.\nContains only client-settable fields; the owning\n`organizationId` (derived from the authenticated session), the\nserver-computed `fingerprint`, the server-set `createdByClient`,\n`approved` (set only by `approveRequest` in the request construct),\nthe server-computed `approvalRequired` and `approvalPolicySource`\nand the server-generated `createdAt` / `updatedAt` timestamps are\nintentionally excluded. `approvalPolicy` is the one approval field a\nwrite carries; a caller without Decide Content Item Approvals may send\nonly the stored value, or omit it (docs/content-item-contract.md,\nApproval policy).\n",
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
                    "minimum": 1
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
                  },
                  "approvalPolicy": {
                    "description": "The item's own approval policy. Optional: omitted on insert, the\nitem inherits; omitted on update, the stored value is kept;\n`inherit` on update clears an explicit value back to inherit; the\nfield does not accept null.\nA caller without Decide Content Item Approvals in the session\norganization is refused with a 403 and nothing changes when it\nsends a value that would change the stored one: on insert,\n`required` or `not_required`; on update, a value different from\nthe stored one (absent and `inherit` are one value, since the\nserver stores `inherit` as null). Sending back the unchanged stored value\nis accepted, and an omitted value on update keeps the stored one and is\nnever refused. An AI app token never carries that key. Interim: until\nthe upstream policies exist, `inherit` or absent resolves to\n`required`, and the item's approval source is `item` for an\nexplicit value or `fallback` for `inherit` or absent.\n",
                    "x-oapi-codegen-extra-tags": {
                      "json": "approvalPolicy,omitempty"
                    },
                    "type": "string",
                    "enum": [
                      "required",
                      "not_required",
                      "inherit"
                    ],
                    "x-enum-varnames": [
                      "ApprovalPolicyRequired",
                      "ApprovalPolicyNotRequired",
                      "ApprovalPolicyInherit"
                    ]
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
                      "minimum": 1,
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
                    },
                    "approved": {
                      "type": "boolean",
                      "description": "Whether the item is approved to run. Server-set and read-only: it is not in ContentItemPayload. At insert the server sets it from the effective approval, which is resolved at insert, again at each content edit, and again when `approvalPolicy` changes: `false` with a pending `content_item_approval` request when `approvalRequired` is true, and `true` with no request when it is false. Afterwards `approveRequest` in the request construct sets it to true, and so does the one-time backfill of a row written before this field shipped (see below); that operation needs the Decide Content Item Approvals key and is never an AI app tool. A content edit that resolves to required sets it back to false. Any content edit that leaves it unapproved supersedes an open request with a fresh pending one, so after the edit an unapproved item has an open request (see updateContentItem). A change to `approvalPolicy` whose resolved result is required does the same to an approved item. The client that runs the queue reads this field. For one release after this field ships, servers mirror it into the free-form `Approved?` column in `data` for older readers, and backfill `approved` once from that column for rows written before the field shipped, so every row carries a value. A client-sent `Approved?` never approves an item. New readers read this field only. See docs/content-item-contract.md.\n",
                      "default": false,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "approved",
                        "json": "approved"
                      },
                      "x-order": 16
                    },
                    "createdByClient": {
                      "type": "string",
                      "description": "OAuth client ID of the AI app that created the item. Server-set from the access token, never client-settable, and never changed by an update. Empty or omitted on an item a person created.\n",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_by_client",
                        "json": "createdByClient,omitempty"
                      },
                      "x-order": 17
                    },
                    "approvalPolicy": {
                      "description": "The item's own approval policy. Absent means inherit. An explicit `required` or `not_required` wins over every higher-level setting; `inherit` or absent inherits from higher-level settings (platform, workspace, profile), hierarchy defined in https://github.com/layer5io/meshery-cloud/issues/6365. Interim: until the upstream policies exist, `inherit` or absent resolves to `required`. Only a person with Decide Content Item Approvals may write a value that changes the stored one; an AI app never can. Changing it alone re-resolves the approval. A change whose result is required (`required`, or `inherit` or absent in the interim, which resolves to required) resets an approved item and opens its request. A change whose result is not required never changes `approved`, and any change leaves an unapproved item with an open request, whatever the result (see updateContentItem). Stored in the nullable `approval_policy` column; null means inherit, and a written `inherit` is stored as null, so reads return it absent.\n",
                      "x-oapi-codegen-extra-tags": {
                        "db": "approval_policy",
                        "json": "approvalPolicy,omitempty"
                      },
                      "x-order": 18,
                      "type": "string",
                      "enum": [
                        "required",
                        "not_required",
                        "inherit"
                      ],
                      "x-enum-varnames": [
                        "ApprovalPolicyRequired",
                        "ApprovalPolicyNotRequired",
                        "ApprovalPolicyInherit"
                      ]
                    },
                    "approvalRequired": {
                      "type": "boolean",
                      "readOnly": true,
                      "description": "Server-computed and read-only: whether the item needs a person's approval, resolved at insert, again at each content edit, and again when `approvalPolicy` changes (see updateContentItem) from its `approvalPolicy` and the higher-level settings (hierarchy defined in https://github.com/layer5io/meshery-cloud/issues/6365). Stored in the `approval_required` column. Never in a payload. A change to `approvalPolicy` alone re-resolves it; a higher-level setting alone does not, and the next content edit resolves it again. Interim: until the upstream policies exist, an absent or `inherit` policy resolves to `true` (approval source `fallback`). Absent on items inserted before this field shipped.\n",
                      "x-oapi-codegen-extra-tags": {
                        "db": "approval_required",
                        "json": "approvalRequired,omitempty"
                      },
                      "x-order": 19
                    },
                    "approvalPolicySource": {
                      "type": "string",
                      "readOnly": true,
                      "description": "Server-computed and read-only: the level that decided `approvalRequired`, resolved at insert, again at each content edit, and again when `approvalPolicy` changes (see updateContentItem), stored in the `approval_policy_source` column. `item` when the item's own `approvalPolicy` was explicit; `fallback` when no level set a value and approval is required. The other levels name the higher level that set the value: `workspace`, `profile`, `organization` and `platform`, listed in their planned order (the hierarchy is defined in https://github.com/layer5io/meshery-cloud/issues/6365). Interim: until the upstream policies exist, only `item` and `fallback` are active (an absent or `inherit` policy resolves to `fallback`). The other four levels become active as that hierarchy lands. Never in a payload. Absent on items inserted before this field shipped.\n",
                      "enum": [
                        "item",
                        "workspace",
                        "profile",
                        "organization",
                        "platform",
                        "fallback"
                      ],
                      "x-enum-varnames": [
                        "ApprovalPolicySourceItem",
                        "ApprovalPolicySourceWorkspace",
                        "ApprovalPolicySourceProfile",
                        "ApprovalPolicySourceOrganization",
                        "ApprovalPolicySourcePlatform",
                        "ApprovalPolicySourceFallback"
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "db": "approval_policy_source",
                        "json": "approvalPolicySource,omitempty"
                      },
                      "x-order": 20
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
            "description": "Conflict on insert. The body's `code` says which: `row_number_taken` or `thread_index_taken` is permanent for this payload, and `idempotency_key_in_flight` is a retry whose first request with the same Idempotency-Key is still being processed. Once the first request has finished without a 5xx, a retry receives the stored response; after a 5xx, a retry is processed as new. Nothing is inserted in any case.\n",
            "content": {
              "application/json": {
                "schema": {
                  "oneOf": [
                    {
                      "type": "object",
                      "description": "Body of an insert refused for a permanent conflict with the content. `code` is the machine-readable reason and `message` the sentence the caller is shown. The in-flight retry body is `IdempotencyKeyInFlightError` in v1beta2 core.",
                      "additionalProperties": false,
                      "required": [
                        "code",
                        "message"
                      ],
                      "properties": {
                        "code": {
                          "type": "string",
                          "description": "`row_number_taken`: a live item of the organization holds the `rowNumber`. `thread_index_taken`: a live item of the same thread holds the `threadIndex`.\n",
                          "enum": [
                            "row_number_taken",
                            "thread_index_taken"
                          ]
                        },
                        "message": {
                          "type": "string",
                          "minLength": 1,
                          "description": "The sentence the caller is shown."
                        }
                      }
                    },
                    {
                      "type": "object",
                      "description": "A retry whose Idempotency-Key is still in flight. Nothing was created by this request. Once the first request has finished without a 5xx, a retry receives the stored response; after a 5xx, a retry is processed as new.",
                      "required": [
                        "code",
                        "message"
                      ],
                      "additionalProperties": false,
                      "properties": {
                        "code": {
                          "type": "string",
                          "description": "Machine-readable reason. Always `idempotency_key_in_flight` for this body.",
                          "enum": [
                            "idempotency_key_in_flight"
                          ]
                        },
                        "message": {
                          "type": "string",
                          "minLength": 1,
                          "description": "The sentence the caller is shown."
                        }
                      }
                    }
                  ]
                }
              }
            }
          },
          "422": {
            "description": "Unprocessable - the Idempotency-Key was already used with a different request body",
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
        "x-mcp": {
          "expose": true,
          "title": "Get a content item",
          "scope": "content:read",
          "description": "Read-only. Returns the content item with the given ID in the organization of the authenticated session. An `X-Current-Orgid` that is not a UUID answers 400."
        },
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
            "name": "X-Current-Orgid",
            "in": "header",
            "required": false,
            "description": "Organization the call acts in, by ID (a UUID). When present, the server resolves the session organization from it instead of the caller's selected organization, and runs its membership and permission checks there. A caller who is not a live member of the named organization receives the same 404 as an unknown resource. Omitted, a path or query `orgId` the operation takes names the organization when sent; otherwise the caller's selected organization applies when it is not nil; otherwise the server defaults among the caller's live organizations, using the only one when exactly one qualifies. When the call needs an acting organization and several qualify, an operation that declares the OrganizationSelectionRequired response answers 409 `organization_selection_required`. The resolution order is in docs/mcp-operation-contract.md, the organization selector.",
            "schema": {
              "type": "string",
              "minLength": 36,
              "maxLength": 36,
              "pattern": "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"
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
                      "minimum": 1,
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
                    },
                    "approved": {
                      "type": "boolean",
                      "description": "Whether the item is approved to run. Server-set and read-only: it is not in ContentItemPayload. At insert the server sets it from the effective approval, which is resolved at insert, again at each content edit, and again when `approvalPolicy` changes: `false` with a pending `content_item_approval` request when `approvalRequired` is true, and `true` with no request when it is false. Afterwards `approveRequest` in the request construct sets it to true, and so does the one-time backfill of a row written before this field shipped (see below); that operation needs the Decide Content Item Approvals key and is never an AI app tool. A content edit that resolves to required sets it back to false. Any content edit that leaves it unapproved supersedes an open request with a fresh pending one, so after the edit an unapproved item has an open request (see updateContentItem). A change to `approvalPolicy` whose resolved result is required does the same to an approved item. The client that runs the queue reads this field. For one release after this field ships, servers mirror it into the free-form `Approved?` column in `data` for older readers, and backfill `approved` once from that column for rows written before the field shipped, so every row carries a value. A client-sent `Approved?` never approves an item. New readers read this field only. See docs/content-item-contract.md.\n",
                      "default": false,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "approved",
                        "json": "approved"
                      },
                      "x-order": 16
                    },
                    "createdByClient": {
                      "type": "string",
                      "description": "OAuth client ID of the AI app that created the item. Server-set from the access token, never client-settable, and never changed by an update. Empty or omitted on an item a person created.\n",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_by_client",
                        "json": "createdByClient,omitempty"
                      },
                      "x-order": 17
                    },
                    "approvalPolicy": {
                      "description": "The item's own approval policy. Absent means inherit. An explicit `required` or `not_required` wins over every higher-level setting; `inherit` or absent inherits from higher-level settings (platform, workspace, profile), hierarchy defined in https://github.com/layer5io/meshery-cloud/issues/6365. Interim: until the upstream policies exist, `inherit` or absent resolves to `required`. Only a person with Decide Content Item Approvals may write a value that changes the stored one; an AI app never can. Changing it alone re-resolves the approval. A change whose result is required (`required`, or `inherit` or absent in the interim, which resolves to required) resets an approved item and opens its request. A change whose result is not required never changes `approved`, and any change leaves an unapproved item with an open request, whatever the result (see updateContentItem). Stored in the nullable `approval_policy` column; null means inherit, and a written `inherit` is stored as null, so reads return it absent.\n",
                      "x-oapi-codegen-extra-tags": {
                        "db": "approval_policy",
                        "json": "approvalPolicy,omitempty"
                      },
                      "x-order": 18,
                      "type": "string",
                      "enum": [
                        "required",
                        "not_required",
                        "inherit"
                      ],
                      "x-enum-varnames": [
                        "ApprovalPolicyRequired",
                        "ApprovalPolicyNotRequired",
                        "ApprovalPolicyInherit"
                      ]
                    },
                    "approvalRequired": {
                      "type": "boolean",
                      "readOnly": true,
                      "description": "Server-computed and read-only: whether the item needs a person's approval, resolved at insert, again at each content edit, and again when `approvalPolicy` changes (see updateContentItem) from its `approvalPolicy` and the higher-level settings (hierarchy defined in https://github.com/layer5io/meshery-cloud/issues/6365). Stored in the `approval_required` column. Never in a payload. A change to `approvalPolicy` alone re-resolves it; a higher-level setting alone does not, and the next content edit resolves it again. Interim: until the upstream policies exist, an absent or `inherit` policy resolves to `true` (approval source `fallback`). Absent on items inserted before this field shipped.\n",
                      "x-oapi-codegen-extra-tags": {
                        "db": "approval_required",
                        "json": "approvalRequired,omitempty"
                      },
                      "x-order": 19
                    },
                    "approvalPolicySource": {
                      "type": "string",
                      "readOnly": true,
                      "description": "Server-computed and read-only: the level that decided `approvalRequired`, resolved at insert, again at each content edit, and again when `approvalPolicy` changes (see updateContentItem), stored in the `approval_policy_source` column. `item` when the item's own `approvalPolicy` was explicit; `fallback` when no level set a value and approval is required. The other levels name the higher level that set the value: `workspace`, `profile`, `organization` and `platform`, listed in their planned order (the hierarchy is defined in https://github.com/layer5io/meshery-cloud/issues/6365). Interim: until the upstream policies exist, only `item` and `fallback` are active (an absent or `inherit` policy resolves to `fallback`). The other four levels become active as that hierarchy lands. Never in a payload. Absent on items inserted before this field shipped.\n",
                      "enum": [
                        "item",
                        "workspace",
                        "profile",
                        "organization",
                        "platform",
                        "fallback"
                      ],
                      "x-enum-varnames": [
                        "ApprovalPolicySourceItem",
                        "ApprovalPolicySourceWorkspace",
                        "ApprovalPolicySourceProfile",
                        "ApprovalPolicySourceOrganization",
                        "ApprovalPolicySourcePlatform",
                        "ApprovalPolicySourceFallback"
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "db": "approval_policy_source",
                        "json": "approvalPolicySource,omitempty"
                      },
                      "x-order": 20
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
            "description": "Conflict - the call needs an organization, none was named, and more than one of the caller's organizations qualifies. Pass one of `choices[].id` as `X-Current-Orgid` (the `organizationId` tool argument). The body's `code` is `organization_selection_required`.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "The call needs an acting organization, the caller named none, and more than one of the caller's live organizations qualifies. Nothing was done by this request. Repeat it naming one of `choices` as `X-Current-Orgid` (the `organizationId` tool argument).",
                  "required": [
                    "code",
                    "message",
                    "choices"
                  ],
                  "additionalProperties": false,
                  "properties": {
                    "code": {
                      "type": "string",
                      "description": "Machine-readable reason. Always `organization_selection_required` for this body.",
                      "enum": [
                        "organization_selection_required"
                      ]
                    },
                    "message": {
                      "type": "string",
                      "minLength": 1,
                      "description": "The sentence the caller is shown."
                    },
                    "choices": {
                      "type": "array",
                      "minItems": 2,
                      "description": "The caller's own live organizations the call could act in. Pass one `id` as `X-Current-Orgid`.",
                      "items": {
                        "type": "object",
                        "description": "An organization the call could act in. Same fields as AvailableOrganization.",
                        "required": [
                          "id",
                          "name",
                          "description"
                        ],
                        "additionalProperties": false,
                        "properties": {
                          "id": {
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "description": "Organization ID.",
                            "x-go-name": "ID"
                          },
                          "name": {
                            "type": "string",
                            "description": "Name of the organization."
                          },
                          "description": {
                            "type": "string",
                            "description": "Description of the organization."
                          }
                        }
                      }
                    }
                  }
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
        "description": "Conditionally updates the content item. When\n`expectedFingerprint` is supplied and stale, the update is\nrefused with a 409, as is an update that would move the item\nonto a `rowNumber` another live content item of the organization\nholds. An omitted `rowNumber` keeps the stored one.\nAn omitted `rulesOfEngagement` keeps the stored rules and `null`\nclears them, so a writer that does not know the field never erases\nit. An omitted `mediaAssetIds` keeps the stored list and `[]`\nclears it. The thread fields are fixed at insert: omitted, or equal to the\nstored values, they are kept; any other value is refused with a 400.\n`approved` is not in the payload, and no update sets it to true;\nonly `approveRequest` does. A content edit, or an `approvalPolicy`\nchange whose resolved result is required, can reset it, as described\nbelow. A caller without Decide Content Item\nApprovals gets a 403 if it sends an `approvalPolicy` different from\nthe stored one (absent and `inherit` count as one value, since\nthe server stores `inherit` as null);\nsending back the unchanged stored value is accepted and changes\nnothing. An omitted `approvalPolicy` keeps the stored value and is not\na change, so it is never refused.\nApproval on a content edit. An update that changes the item's\ncontent re-resolves its effective approval in the same transaction,\nwith the same rule as insert: the `approvalPolicy` the update stores,\nthen the higher-level settings (interim: `inherit` or absent resolves\nto `required`). It records `approvalRequired` and\n`approvalPolicySource` again. Content is `profile`, `rowNumber`,\n`data` (without the server-owned `Approved?` mirror),\n`rulesOfEngagement` and `mediaAssetIds`, the fields the fingerprint\ncovers, compared with the stored values, so a write-back that sends\nthem unchanged is not an edit. These never trigger it: the\n`approvalPolicy` (a change to it alone is handled below),\n`expectedFingerprint`, `id` and the thread fields (`threadId`,\n`replyToId`, `threadIndex`, fixed at insert).\nWhatever the resolved approval, the item's open\n`content_item_approval` request, if it has one, is superseded: it is\nclosed with `status` `superseded`, `decidedAt` set to the edit time,\nand no `decidedBy` and no `note`. When approval resolves to required,\nan item that was `approved` is set to `approved` false. When approval\nresolves to not required, `approved` is unchanged: an approved item\nstays approved and opens no request. An item the edit leaves\nunapproved gets a fresh pending request for the content as it now is,\nin the same transaction, so after the edit an unapproved item has an\nopen request\n(the open-request invariant in docs/content-item-contract.md). An\nupdate never approves: the item stays unapproved until a decider\napproves that request. A failed write keeps none of these changes, the item and\nits requests alike.\nApproval on an `approvalPolicy` change. A write that changes the stored\npolicy and no content re-resolves the approval the same way, in the\nsame transaction. When the result is required and the item was\n`approved`, `approved` is set to false and a pending request opens,\nunless one is already pending. Any other result changes no `approved`\nand closes no request: a result that is not required leaves an unapproved\nitem unapproved, and its open request stays pending for a decider. An\nunapproved item with no open request, after a denial for example, gets\na fresh pending request in the same write, whatever the result. The\nstored `approvalRequired` and `approvalPolicySource` are rewritten to\nthe new result. Sending back the unchanged stored policy re-resolves\nnothing. A write that changes nothing (a whole-item write-back of the\nstored content and policy) opens no request and closes none, so a\ndenied item stays denied until a content edit or an `approvalPolicy`\nchange. This applies to every writer, a person included.\n",
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
                "description": "Payload for inserting or updating a content item.\nContains only client-settable fields; the owning\n`organizationId` (derived from the authenticated session), the\nserver-computed `fingerprint`, the server-set `createdByClient`,\n`approved` (set only by `approveRequest` in the request construct),\nthe server-computed `approvalRequired` and `approvalPolicySource`\nand the server-generated `createdAt` / `updatedAt` timestamps are\nintentionally excluded. `approvalPolicy` is the one approval field a\nwrite carries; a caller without Decide Content Item Approvals may send\nonly the stored value, or omit it (docs/content-item-contract.md,\nApproval policy).\n",
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
                    "minimum": 1
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
                  },
                  "approvalPolicy": {
                    "description": "The item's own approval policy. Optional: omitted on insert, the\nitem inherits; omitted on update, the stored value is kept;\n`inherit` on update clears an explicit value back to inherit; the\nfield does not accept null.\nA caller without Decide Content Item Approvals in the session\norganization is refused with a 403 and nothing changes when it\nsends a value that would change the stored one: on insert,\n`required` or `not_required`; on update, a value different from\nthe stored one (absent and `inherit` are one value, since the\nserver stores `inherit` as null). Sending back the unchanged stored value\nis accepted, and an omitted value on update keeps the stored one and is\nnever refused. An AI app token never carries that key. Interim: until\nthe upstream policies exist, `inherit` or absent resolves to\n`required`, and the item's approval source is `item` for an\nexplicit value or `fallback` for `inherit` or absent.\n",
                    "x-oapi-codegen-extra-tags": {
                      "json": "approvalPolicy,omitempty"
                    },
                    "type": "string",
                    "enum": [
                      "required",
                      "not_required",
                      "inherit"
                    ],
                    "x-enum-varnames": [
                      "ApprovalPolicyRequired",
                      "ApprovalPolicyNotRequired",
                      "ApprovalPolicyInherit"
                    ]
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
                      "minimum": 1,
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
                    },
                    "approved": {
                      "type": "boolean",
                      "description": "Whether the item is approved to run. Server-set and read-only: it is not in ContentItemPayload. At insert the server sets it from the effective approval, which is resolved at insert, again at each content edit, and again when `approvalPolicy` changes: `false` with a pending `content_item_approval` request when `approvalRequired` is true, and `true` with no request when it is false. Afterwards `approveRequest` in the request construct sets it to true, and so does the one-time backfill of a row written before this field shipped (see below); that operation needs the Decide Content Item Approvals key and is never an AI app tool. A content edit that resolves to required sets it back to false. Any content edit that leaves it unapproved supersedes an open request with a fresh pending one, so after the edit an unapproved item has an open request (see updateContentItem). A change to `approvalPolicy` whose resolved result is required does the same to an approved item. The client that runs the queue reads this field. For one release after this field ships, servers mirror it into the free-form `Approved?` column in `data` for older readers, and backfill `approved` once from that column for rows written before the field shipped, so every row carries a value. A client-sent `Approved?` never approves an item. New readers read this field only. See docs/content-item-contract.md.\n",
                      "default": false,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "approved",
                        "json": "approved"
                      },
                      "x-order": 16
                    },
                    "createdByClient": {
                      "type": "string",
                      "description": "OAuth client ID of the AI app that created the item. Server-set from the access token, never client-settable, and never changed by an update. Empty or omitted on an item a person created.\n",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_by_client",
                        "json": "createdByClient,omitempty"
                      },
                      "x-order": 17
                    },
                    "approvalPolicy": {
                      "description": "The item's own approval policy. Absent means inherit. An explicit `required` or `not_required` wins over every higher-level setting; `inherit` or absent inherits from higher-level settings (platform, workspace, profile), hierarchy defined in https://github.com/layer5io/meshery-cloud/issues/6365. Interim: until the upstream policies exist, `inherit` or absent resolves to `required`. Only a person with Decide Content Item Approvals may write a value that changes the stored one; an AI app never can. Changing it alone re-resolves the approval. A change whose result is required (`required`, or `inherit` or absent in the interim, which resolves to required) resets an approved item and opens its request. A change whose result is not required never changes `approved`, and any change leaves an unapproved item with an open request, whatever the result (see updateContentItem). Stored in the nullable `approval_policy` column; null means inherit, and a written `inherit` is stored as null, so reads return it absent.\n",
                      "x-oapi-codegen-extra-tags": {
                        "db": "approval_policy",
                        "json": "approvalPolicy,omitempty"
                      },
                      "x-order": 18,
                      "type": "string",
                      "enum": [
                        "required",
                        "not_required",
                        "inherit"
                      ],
                      "x-enum-varnames": [
                        "ApprovalPolicyRequired",
                        "ApprovalPolicyNotRequired",
                        "ApprovalPolicyInherit"
                      ]
                    },
                    "approvalRequired": {
                      "type": "boolean",
                      "readOnly": true,
                      "description": "Server-computed and read-only: whether the item needs a person's approval, resolved at insert, again at each content edit, and again when `approvalPolicy` changes (see updateContentItem) from its `approvalPolicy` and the higher-level settings (hierarchy defined in https://github.com/layer5io/meshery-cloud/issues/6365). Stored in the `approval_required` column. Never in a payload. A change to `approvalPolicy` alone re-resolves it; a higher-level setting alone does not, and the next content edit resolves it again. Interim: until the upstream policies exist, an absent or `inherit` policy resolves to `true` (approval source `fallback`). Absent on items inserted before this field shipped.\n",
                      "x-oapi-codegen-extra-tags": {
                        "db": "approval_required",
                        "json": "approvalRequired,omitempty"
                      },
                      "x-order": 19
                    },
                    "approvalPolicySource": {
                      "type": "string",
                      "readOnly": true,
                      "description": "Server-computed and read-only: the level that decided `approvalRequired`, resolved at insert, again at each content edit, and again when `approvalPolicy` changes (see updateContentItem), stored in the `approval_policy_source` column. `item` when the item's own `approvalPolicy` was explicit; `fallback` when no level set a value and approval is required. The other levels name the higher level that set the value: `workspace`, `profile`, `organization` and `platform`, listed in their planned order (the hierarchy is defined in https://github.com/layer5io/meshery-cloud/issues/6365). Interim: until the upstream policies exist, only `item` and `fallback` are active (an absent or `inherit` policy resolves to `fallback`). The other four levels become active as that hierarchy lands. Never in a payload. Absent on items inserted before this field shipped.\n",
                      "enum": [
                        "item",
                        "workspace",
                        "profile",
                        "organization",
                        "platform",
                        "fallback"
                      ],
                      "x-enum-varnames": [
                        "ApprovalPolicySourceItem",
                        "ApprovalPolicySourceWorkspace",
                        "ApprovalPolicySourceProfile",
                        "ApprovalPolicySourceOrganization",
                        "ApprovalPolicySourcePlatform",
                        "ApprovalPolicySourceFallback"
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "db": "approval_policy_source",
                        "json": "approvalPolicySource,omitempty"
                      },
                      "x-order": 20
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
            "description": "Conflict - the stale expectedFingerprint precondition no longer matches the stored content fingerprint, or another live content item of the organization already holds the same rowNumber. Nothing changes.",
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
        "description": "Soft-deletes the content item. When `expectedFingerprint` is\nsupplied, the delete applies only when the stored fingerprint\nstill matches and is refused with a 409 otherwise; without it the\ndelete is unconditional. Deleting an item that other items name in\n`threadId` or `replyToId` leaves their references as they are.\nDeleting an item that has an open `content_item_approval` request\ncloses that request as `superseded` in the same transaction:\n`decidedAt` is set to the delete time, and no `decidedBy` and no\n`note` are set. `approveRequest` and `denyRequest` on it then answer\n`409`, as for any request that is not pending, and change nothing.\n",
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
            "description": "Conflict - the stale expectedFingerprint precondition no longer matches the stored content fingerprint, or another live content item of the organization already holds the same rowNumber. Nothing changes.",
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
        "description": "Conflict - the stale expectedFingerprint precondition no longer matches the stored content fingerprint, or another live content item of the organization already holds the same rowNumber. Nothing changes.",
        "content": {
          "text/plain": {
            "schema": {
              "type": "string"
            }
          }
        }
      },
      "422": {
        "description": "Unprocessable - the Idempotency-Key was already used with a different request body",
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
      "OrganizationSelectionRequired": {
        "description": "Conflict - the call needs an organization, none was named, and more than one of the caller's organizations qualifies. Pass one of `choices[].id` as `X-Current-Orgid` (the `organizationId` tool argument). The body's `code` is `organization_selection_required`.",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "description": "The call needs an acting organization, the caller named none, and more than one of the caller's live organizations qualifies. Nothing was done by this request. Repeat it naming one of `choices` as `X-Current-Orgid` (the `organizationId` tool argument).",
              "required": [
                "code",
                "message",
                "choices"
              ],
              "additionalProperties": false,
              "properties": {
                "code": {
                  "type": "string",
                  "description": "Machine-readable reason. Always `organization_selection_required` for this body.",
                  "enum": [
                    "organization_selection_required"
                  ]
                },
                "message": {
                  "type": "string",
                  "minLength": 1,
                  "description": "The sentence the caller is shown."
                },
                "choices": {
                  "type": "array",
                  "minItems": 2,
                  "description": "The caller's own live organizations the call could act in. Pass one `id` as `X-Current-Orgid`.",
                  "items": {
                    "type": "object",
                    "description": "An organization the call could act in. Same fields as AvailableOrganization.",
                    "required": [
                      "id",
                      "name",
                      "description"
                    ],
                    "additionalProperties": false,
                    "properties": {
                      "id": {
                        "type": "string",
                        "format": "uuid",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        },
                        "description": "Organization ID.",
                        "x-go-name": "ID"
                      },
                      "name": {
                        "type": "string",
                        "description": "Name of the organization."
                      },
                      "description": {
                        "type": "string",
                        "description": "Description of the organization."
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "InsertConflict": {
        "description": "Conflict on insert. The body's `code` says which: `row_number_taken` or `thread_index_taken` is permanent for this payload, and `idempotency_key_in_flight` is a retry whose first request with the same Idempotency-Key is still being processed. Once the first request has finished without a 5xx, a retry receives the stored response; after a 5xx, a retry is processed as new. Nothing is inserted in any case.\n",
        "content": {
          "application/json": {
            "schema": {
              "oneOf": [
                {
                  "type": "object",
                  "description": "Body of an insert refused for a permanent conflict with the content. `code` is the machine-readable reason and `message` the sentence the caller is shown. The in-flight retry body is `IdempotencyKeyInFlightError` in v1beta2 core.",
                  "additionalProperties": false,
                  "required": [
                    "code",
                    "message"
                  ],
                  "properties": {
                    "code": {
                      "type": "string",
                      "description": "`row_number_taken`: a live item of the organization holds the `rowNumber`. `thread_index_taken`: a live item of the same thread holds the `threadIndex`.\n",
                      "enum": [
                        "row_number_taken",
                        "thread_index_taken"
                      ]
                    },
                    "message": {
                      "type": "string",
                      "minLength": 1,
                      "description": "The sentence the caller is shown."
                    }
                  }
                },
                {
                  "type": "object",
                  "description": "A retry whose Idempotency-Key is still in flight. Nothing was created by this request. Once the first request has finished without a 5xx, a retry receives the stored response; after a 5xx, a retry is processed as new.",
                  "required": [
                    "code",
                    "message"
                  ],
                  "additionalProperties": false,
                  "properties": {
                    "code": {
                      "type": "string",
                      "description": "Machine-readable reason. Always `idempotency_key_in_flight` for this body.",
                      "enum": [
                        "idempotency_key_in_flight"
                      ]
                    },
                    "message": {
                      "type": "string",
                      "minLength": 1,
                      "description": "The sentence the caller is shown."
                    }
                  }
                }
              ]
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
      "currentOrgId": {
        "name": "X-Current-Orgid",
        "in": "header",
        "required": false,
        "description": "Organization the call acts in, by ID (a UUID). When present, the server resolves the session organization from it instead of the caller's selected organization, and runs its membership and permission checks there. A caller who is not a live member of the named organization receives the same 404 as an unknown resource. Omitted, a path or query `orgId` the operation takes names the organization when sent; otherwise the caller's selected organization applies when it is not nil; otherwise the server defaults among the caller's live organizations, using the only one when exactly one qualifies. When the call needs an acting organization and several qualify, an operation that declares the OrganizationSelectionRequired response answers 409 `organization_selection_required`. The resolution order is in docs/mcp-operation-contract.md, the organization selector.",
        "schema": {
          "type": "string",
          "minLength": 36,
          "maxLength": 36,
          "pattern": "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"
        }
      },
      "idempotencyKey": {
        "name": "Idempotency-Key",
        "in": "header",
        "required": false,
        "description": "Client-chosen key that makes a create safe to retry. The server keeps the organization, the user, the key, a hash of the request and the final response for 24 hours. Only a final response that is not a 5xx is stored. The server answers a 5xx only after it has rolled back the write; a 5xx it answers is not stored and releases the key's claim, so a retry with the same key is processed as new. A response the server has committed is final and is stored, even if a gateway in front of the server later fails the client's connection. A retry with the same key and the same request hash returns the stored response without creating anything again. A retry with the same key and a different request hash answers 422 and creates nothing. A retry with the same key that arrives while the earlier request with that key is still being processed answers 409 with the body `code` `idempotency_key_in_flight` and creates nothing. Once the first request has finished without a 5xx, a retry receives the stored response; after a 5xx, a retry is processed as new. Precedence: while the first request with a key is in flight, every retry with that key answers 409 whatever its body; only once the first request has finished does a retry with a different body answer 422. The in-flight claim of a request that never finished expires 24 hours after it was taken, the same TTL as the stored response; no shorter in-flight lease applies. A retry after that expiry is processed as new. Omitted, the create is not deduplicated. Use a fresh random value (a UUID) per intended create.",
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 255
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
            "minimum": 1,
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
          },
          "approved": {
            "type": "boolean",
            "description": "Whether the item is approved to run. Server-set and read-only: it is not in ContentItemPayload. At insert the server sets it from the effective approval, which is resolved at insert, again at each content edit, and again when `approvalPolicy` changes: `false` with a pending `content_item_approval` request when `approvalRequired` is true, and `true` with no request when it is false. Afterwards `approveRequest` in the request construct sets it to true, and so does the one-time backfill of a row written before this field shipped (see below); that operation needs the Decide Content Item Approvals key and is never an AI app tool. A content edit that resolves to required sets it back to false. Any content edit that leaves it unapproved supersedes an open request with a fresh pending one, so after the edit an unapproved item has an open request (see updateContentItem). A change to `approvalPolicy` whose resolved result is required does the same to an approved item. The client that runs the queue reads this field. For one release after this field ships, servers mirror it into the free-form `Approved?` column in `data` for older readers, and backfill `approved` once from that column for rows written before the field shipped, so every row carries a value. A client-sent `Approved?` never approves an item. New readers read this field only. See docs/content-item-contract.md.\n",
            "default": false,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "approved",
              "json": "approved"
            },
            "x-order": 16
          },
          "createdByClient": {
            "type": "string",
            "description": "OAuth client ID of the AI app that created the item. Server-set from the access token, never client-settable, and never changed by an update. Empty or omitted on an item a person created.\n",
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "created_by_client",
              "json": "createdByClient,omitempty"
            },
            "x-order": 17
          },
          "approvalPolicy": {
            "description": "The item's own approval policy. Absent means inherit. An explicit `required` or `not_required` wins over every higher-level setting; `inherit` or absent inherits from higher-level settings (platform, workspace, profile), hierarchy defined in https://github.com/layer5io/meshery-cloud/issues/6365. Interim: until the upstream policies exist, `inherit` or absent resolves to `required`. Only a person with Decide Content Item Approvals may write a value that changes the stored one; an AI app never can. Changing it alone re-resolves the approval. A change whose result is required (`required`, or `inherit` or absent in the interim, which resolves to required) resets an approved item and opens its request. A change whose result is not required never changes `approved`, and any change leaves an unapproved item with an open request, whatever the result (see updateContentItem). Stored in the nullable `approval_policy` column; null means inherit, and a written `inherit` is stored as null, so reads return it absent.\n",
            "x-oapi-codegen-extra-tags": {
              "db": "approval_policy",
              "json": "approvalPolicy,omitempty"
            },
            "x-order": 18,
            "type": "string",
            "enum": [
              "required",
              "not_required",
              "inherit"
            ],
            "x-enum-varnames": [
              "ApprovalPolicyRequired",
              "ApprovalPolicyNotRequired",
              "ApprovalPolicyInherit"
            ]
          },
          "approvalRequired": {
            "type": "boolean",
            "readOnly": true,
            "description": "Server-computed and read-only: whether the item needs a person's approval, resolved at insert, again at each content edit, and again when `approvalPolicy` changes (see updateContentItem) from its `approvalPolicy` and the higher-level settings (hierarchy defined in https://github.com/layer5io/meshery-cloud/issues/6365). Stored in the `approval_required` column. Never in a payload. A change to `approvalPolicy` alone re-resolves it; a higher-level setting alone does not, and the next content edit resolves it again. Interim: until the upstream policies exist, an absent or `inherit` policy resolves to `true` (approval source `fallback`). Absent on items inserted before this field shipped.\n",
            "x-oapi-codegen-extra-tags": {
              "db": "approval_required",
              "json": "approvalRequired,omitempty"
            },
            "x-order": 19
          },
          "approvalPolicySource": {
            "type": "string",
            "readOnly": true,
            "description": "Server-computed and read-only: the level that decided `approvalRequired`, resolved at insert, again at each content edit, and again when `approvalPolicy` changes (see updateContentItem), stored in the `approval_policy_source` column. `item` when the item's own `approvalPolicy` was explicit; `fallback` when no level set a value and approval is required. The other levels name the higher level that set the value: `workspace`, `profile`, `organization` and `platform`, listed in their planned order (the hierarchy is defined in https://github.com/layer5io/meshery-cloud/issues/6365). Interim: until the upstream policies exist, only `item` and `fallback` are active (an absent or `inherit` policy resolves to `fallback`). The other four levels become active as that hierarchy lands. Never in a payload. Absent on items inserted before this field shipped.\n",
            "enum": [
              "item",
              "workspace",
              "profile",
              "organization",
              "platform",
              "fallback"
            ],
            "x-enum-varnames": [
              "ApprovalPolicySourceItem",
              "ApprovalPolicySourceWorkspace",
              "ApprovalPolicySourceProfile",
              "ApprovalPolicySourceOrganization",
              "ApprovalPolicySourcePlatform",
              "ApprovalPolicySourceFallback"
            ],
            "x-oapi-codegen-extra-tags": {
              "db": "approval_policy_source",
              "json": "approvalPolicySource,omitempty"
            },
            "x-order": 20
          }
        }
      },
      "ContentItemPayload": {
        "type": "object",
        "description": "Payload for inserting or updating a content item.\nContains only client-settable fields; the owning\n`organizationId` (derived from the authenticated session), the\nserver-computed `fingerprint`, the server-set `createdByClient`,\n`approved` (set only by `approveRequest` in the request construct),\nthe server-computed `approvalRequired` and `approvalPolicySource`\nand the server-generated `createdAt` / `updatedAt` timestamps are\nintentionally excluded. `approvalPolicy` is the one approval field a\nwrite carries; a caller without Decide Content Item Approvals may send\nonly the stored value, or omit it (docs/content-item-contract.md,\nApproval policy).\n",
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
            "minimum": 1
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
          },
          "approvalPolicy": {
            "description": "The item's own approval policy. Optional: omitted on insert, the\nitem inherits; omitted on update, the stored value is kept;\n`inherit` on update clears an explicit value back to inherit; the\nfield does not accept null.\nA caller without Decide Content Item Approvals in the session\norganization is refused with a 403 and nothing changes when it\nsends a value that would change the stored one: on insert,\n`required` or `not_required`; on update, a value different from\nthe stored one (absent and `inherit` are one value, since the\nserver stores `inherit` as null). Sending back the unchanged stored value\nis accepted, and an omitted value on update keeps the stored one and is\nnever refused. An AI app token never carries that key. Interim: until\nthe upstream policies exist, `inherit` or absent resolves to\n`required`, and the item's approval source is `item` for an\nexplicit value or `fallback` for `inherit` or absent.\n",
            "x-oapi-codegen-extra-tags": {
              "json": "approvalPolicy,omitempty"
            },
            "type": "string",
            "enum": [
              "required",
              "not_required",
              "inherit"
            ],
            "x-enum-varnames": [
              "ApprovalPolicyRequired",
              "ApprovalPolicyNotRequired",
              "ApprovalPolicyInherit"
            ]
          }
        }
      },
      "ApprovalPolicy": {
        "type": "string",
        "description": "Whether an item needs a person's approval before it runs. `required`\nand `not_required` are explicit and win over every higher-level\nsetting. `inherit`, and an absent value, inherit from higher-level\nsettings (platform, workspace, profile), hierarchy defined in\nhttps://github.com/layer5io/meshery-cloud/issues/6365. When no level\nsets a value, approval is required (fail closed); this fallback is\nstill open for confirmation in that issue. The effective result is\nresolved at insert, again at each content edit, and again when the\nstored value changes. AI apps can never set\n`approved`; this value only says whether approval is needed.\nInterim: until the upstream platform, workspace and profile policies\nexist, `inherit` and an absent value resolve to `required`, with\napproval source `fallback`. The user preference\n`agentsActWithoutApproval` is not consulted during the interim.\n",
        "enum": [
          "required",
          "not_required",
          "inherit"
        ],
        "x-enum-varnames": [
          "ApprovalPolicyRequired",
          "ApprovalPolicyNotRequired",
          "ApprovalPolicyInherit"
        ]
      },
      "ContentItemInsertConflict": {
        "type": "object",
        "description": "Body of an insert refused for a permanent conflict with the content. `code` is the machine-readable reason and `message` the sentence the caller is shown. The in-flight retry body is `IdempotencyKeyInFlightError` in v1beta2 core.",
        "additionalProperties": false,
        "required": [
          "code",
          "message"
        ],
        "properties": {
          "code": {
            "type": "string",
            "description": "`row_number_taken`: a live item of the organization holds the `rowNumber`. `thread_index_taken`: a live item of the same thread holds the `threadIndex`.\n",
            "enum": [
              "row_number_taken",
              "thread_index_taken"
            ]
          },
          "message": {
            "type": "string",
            "minLength": 1,
            "description": "The sentence the caller is shown."
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
                  "minimum": 1,
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
                },
                "approved": {
                  "type": "boolean",
                  "description": "Whether the item is approved to run. Server-set and read-only: it is not in ContentItemPayload. At insert the server sets it from the effective approval, which is resolved at insert, again at each content edit, and again when `approvalPolicy` changes: `false` with a pending `content_item_approval` request when `approvalRequired` is true, and `true` with no request when it is false. Afterwards `approveRequest` in the request construct sets it to true, and so does the one-time backfill of a row written before this field shipped (see below); that operation needs the Decide Content Item Approvals key and is never an AI app tool. A content edit that resolves to required sets it back to false. Any content edit that leaves it unapproved supersedes an open request with a fresh pending one, so after the edit an unapproved item has an open request (see updateContentItem). A change to `approvalPolicy` whose resolved result is required does the same to an approved item. The client that runs the queue reads this field. For one release after this field ships, servers mirror it into the free-form `Approved?` column in `data` for older readers, and backfill `approved` once from that column for rows written before the field shipped, so every row carries a value. A client-sent `Approved?` never approves an item. New readers read this field only. See docs/content-item-contract.md.\n",
                  "default": false,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "approved",
                    "json": "approved"
                  },
                  "x-order": 16
                },
                "createdByClient": {
                  "type": "string",
                  "description": "OAuth client ID of the AI app that created the item. Server-set from the access token, never client-settable, and never changed by an update. Empty or omitted on an item a person created.\n",
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_by_client",
                    "json": "createdByClient,omitempty"
                  },
                  "x-order": 17
                },
                "approvalPolicy": {
                  "description": "The item's own approval policy. Absent means inherit. An explicit `required` or `not_required` wins over every higher-level setting; `inherit` or absent inherits from higher-level settings (platform, workspace, profile), hierarchy defined in https://github.com/layer5io/meshery-cloud/issues/6365. Interim: until the upstream policies exist, `inherit` or absent resolves to `required`. Only a person with Decide Content Item Approvals may write a value that changes the stored one; an AI app never can. Changing it alone re-resolves the approval. A change whose result is required (`required`, or `inherit` or absent in the interim, which resolves to required) resets an approved item and opens its request. A change whose result is not required never changes `approved`, and any change leaves an unapproved item with an open request, whatever the result (see updateContentItem). Stored in the nullable `approval_policy` column; null means inherit, and a written `inherit` is stored as null, so reads return it absent.\n",
                  "x-oapi-codegen-extra-tags": {
                    "db": "approval_policy",
                    "json": "approvalPolicy,omitempty"
                  },
                  "x-order": 18,
                  "type": "string",
                  "enum": [
                    "required",
                    "not_required",
                    "inherit"
                  ],
                  "x-enum-varnames": [
                    "ApprovalPolicyRequired",
                    "ApprovalPolicyNotRequired",
                    "ApprovalPolicyInherit"
                  ]
                },
                "approvalRequired": {
                  "type": "boolean",
                  "readOnly": true,
                  "description": "Server-computed and read-only: whether the item needs a person's approval, resolved at insert, again at each content edit, and again when `approvalPolicy` changes (see updateContentItem) from its `approvalPolicy` and the higher-level settings (hierarchy defined in https://github.com/layer5io/meshery-cloud/issues/6365). Stored in the `approval_required` column. Never in a payload. A change to `approvalPolicy` alone re-resolves it; a higher-level setting alone does not, and the next content edit resolves it again. Interim: until the upstream policies exist, an absent or `inherit` policy resolves to `true` (approval source `fallback`). Absent on items inserted before this field shipped.\n",
                  "x-oapi-codegen-extra-tags": {
                    "db": "approval_required",
                    "json": "approvalRequired,omitempty"
                  },
                  "x-order": 19
                },
                "approvalPolicySource": {
                  "type": "string",
                  "readOnly": true,
                  "description": "Server-computed and read-only: the level that decided `approvalRequired`, resolved at insert, again at each content edit, and again when `approvalPolicy` changes (see updateContentItem), stored in the `approval_policy_source` column. `item` when the item's own `approvalPolicy` was explicit; `fallback` when no level set a value and approval is required. The other levels name the higher level that set the value: `workspace`, `profile`, `organization` and `platform`, listed in their planned order (the hierarchy is defined in https://github.com/layer5io/meshery-cloud/issues/6365). Interim: until the upstream policies exist, only `item` and `fallback` are active (an absent or `inherit` policy resolves to `fallback`). The other four levels become active as that hierarchy lands. Never in a payload. Absent on items inserted before this field shipped.\n",
                  "enum": [
                    "item",
                    "workspace",
                    "profile",
                    "organization",
                    "platform",
                    "fallback"
                  ],
                  "x-enum-varnames": [
                    "ApprovalPolicySourceItem",
                    "ApprovalPolicySourceWorkspace",
                    "ApprovalPolicySourceProfile",
                    "ApprovalPolicySourceOrganization",
                    "ApprovalPolicySourcePlatform",
                    "ApprovalPolicySourceFallback"
                  ],
                  "x-oapi-codegen-extra-tags": {
                    "db": "approval_policy_source",
                    "json": "approvalPolicySource,omitempty"
                  },
                  "x-order": 20
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
