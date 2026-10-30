/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const ClaimSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Claim",
    "description": "OpenAPI schema for claims - generic, time-bound holds that one connection\ntakes on one resource so competing workers never act on it twice. Any\nconstruct can be claimed, schedules included, through these routes\nalone; no construct defines its own claim routes. A claim is held by the caller's own\nlive connection in the session organization (`connectionId` on the\nrequest, `claimantConnectionId` on the claim) on behalf of the session\nuser (`claimantUserId`). At most one claim per resource is active in an\norganization; the race between claimants is decided server-side in a\nsingle statement. A claim past `expiresAt` reads as `expired` and the\nresource can be claimed again. Released and expired claims are kept as\nhistory, so a handoff reads as an expired claim followed by an active\nclaim on the same resource.\nOrganization scope: every operation acts only in the organization the\nsession resolved to (X-Current-Orgid, then the user's selected\norganization), and only when the caller is a live member of it. A\ncaller who is not a member, a connection that is not the caller's own\nlive connection in that organization, and a resource the organization\ndoes not have all receive the same 404 as an unknown id, so the\nexistence of another organization's claims, connections and resources\nis never disclosed.\nAuthorization: reading claims takes the View Claims key; taking and\nrenewing a claim takes Take and renew claims; releasing one's own claim\ntakes Release claim; releasing a claim another member holds takes\nRelease claims of other members. Every key is checked in the session\norganization.\n",
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
      "name": "claims",
      "description": "Operations related to claims on resources."
    }
  ],
  "paths": {
    "/api/claims": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "claims"
        ],
        "summary": "List claims",
        "operationId": "listClaims",
        "description": "Returns a paginated list of the claims in the organization of the authenticated session, active and historical, optionally filtered by resource, holding connection, user, status, outcome and the time the claim was taken. Ordered by `claimedAt`, newest first, unless `order` is `claimedAt asc`. Every member holding View Claims sees every claim in the organization.\n",
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
            "name": "order",
            "in": "query",
            "description": "Get ordered responses",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "resourceType",
            "in": "query",
            "required": false,
            "description": "Filter by claimed resource type.",
            "schema": {
              "type": "string",
              "maxLength": 64
            }
          },
          {
            "name": "resourceId",
            "in": "query",
            "required": false,
            "description": "Filter by claimed resource ID.",
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
            "name": "claimantConnectionId",
            "in": "query",
            "required": false,
            "description": "Filter by the connection that holds or held the claim.",
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
            "name": "claimantUserId",
            "in": "query",
            "required": false,
            "description": "Filter by the user whose session took the claim.",
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
            "description": "Filter by claim status, as read (a claim past `expiresAt` is `expired`).",
            "schema": {
              "type": "string",
              "enum": [
                "active",
                "released",
                "expired"
              ]
            }
          },
          {
            "name": "outcome",
            "in": "query",
            "required": false,
            "description": "Filter by the outcome reported on release.",
            "schema": {
              "type": "string",
              "enum": [
                "completed",
                "failed",
                "cancelled"
              ]
            }
          },
          {
            "name": "claimedSince",
            "in": "query",
            "required": false,
            "description": "Only claims taken at or after this time.",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "name": "claimedUntil",
            "in": "query",
            "required": false,
            "description": "Only claims taken before this time.",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Claims page",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated collection of claims.",
                  "required": [
                    "page",
                    "pageSize",
                    "totalCount",
                    "claims"
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
                    "claims": {
                      "type": "array",
                      "items": {
                        "x-go-type": "Claim",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "title": "Claim Schema",
                        "description": "Server-returned claim: a time-bound hold that one connection takes on one\nresource so that competing workers never act on it twice. A claim is\ngeneric: it names the resource it holds by type and ID, and any construct\ncan be claimed. A claim is held by a connection (`claimantConnectionId`,\nfor example the connection a desktop client registered for its machine)\non behalf of the user whose session took it (`claimantUserId`). At most\none claim per resource is `active` in an organization. A claim whose\n`expiresAt` has passed reads as `expired` and the resource may be claimed\nagain, so a holder that disappears never strands the resource. Released\nand expired claims are kept as history: a handoff is an `expired` claim\nfollowed by an `active` claim on the same resource. The holder reports\nwhat happened (`outcome`) when it releases the claim. The race between\nclaimants is decided server-side in a single statement.\n",
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
                      "description": "Claims included on this page of results."
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
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "claims"
        ],
        "summary": "Claim a resource",
        "operationId": "createClaim",
        "description": "Takes a claim on the named resource for the connection\n`connectionId`, which must be the caller's own live connection in the\nsession organization. Succeeds with `201` when the resource has no\nactive claim. When the same connection already holds the active claim\nthe call is a replay and returns it unchanged with `200`. An active\nclaim held by another connection answers `409`. A claim past\n`expiresAt`, or one whose holding connection was deleted, is marked\n`expired` and superseded. The resource must exist in the session\norganization; a server verifies the resource types it serves (for\nexample `content_item` and `schedule`) and refuses any other type with\n`400`. Decided in a single server-side statement, so of two racing\nclaimants exactly one wins.\n",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for taking a claim. Contains only client-settable fields;\nthe owning `organizationId`, `claimantUserId`, `status`,\n`claimedAt`, `expiresAt` and the timestamps are server-managed.\n",
                "required": [
                  "resourceType",
                  "resourceId",
                  "connectionId"
                ],
                "properties": {
                  "resourceType": {
                    "type": "string",
                    "description": "Type of the resource to claim, for example `content_item`.",
                    "minLength": 1,
                    "maxLength": 64
                  },
                  "resourceId": {
                    "type": "string",
                    "format": "uuid",
                    "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  },
                  "connectionId": {
                    "type": "string",
                    "format": "uuid",
                    "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    },
                    "x-go-name": "ConnectionID",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "durationMinutes": {
                    "type": "integer",
                    "description": "Requested claim duration in minutes; the server applies its default (30) when omitted and may cap it.",
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
            "description": "Replay - the same connection already holds the active claim",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Claim Schema",
                  "description": "Server-returned claim: a time-bound hold that one connection takes on one\nresource so that competing workers never act on it twice. A claim is\ngeneric: it names the resource it holds by type and ID, and any construct\ncan be claimed. A claim is held by a connection (`claimantConnectionId`,\nfor example the connection a desktop client registered for its machine)\non behalf of the user whose session took it (`claimantUserId`). At most\none claim per resource is `active` in an organization. A claim whose\n`expiresAt` has passed reads as `expired` and the resource may be claimed\nagain, so a holder that disappears never strands the resource. Released\nand expired claims are kept as history: a handoff is an `expired` claim\nfollowed by an `active` claim on the same resource. The holder reports\nwhat happened (`outcome`) when it releases the claim. The race between\nclaimants is decided server-side in a single statement.\n",
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
                }
              }
            }
          },
          "201": {
            "description": "Claim taken",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Claim Schema",
                  "description": "Server-returned claim: a time-bound hold that one connection takes on one\nresource so that competing workers never act on it twice. A claim is\ngeneric: it names the resource it holds by type and ID, and any construct\ncan be claimed. A claim is held by a connection (`claimantConnectionId`,\nfor example the connection a desktop client registered for its machine)\non behalf of the user whose session took it (`claimantUserId`). At most\none claim per resource is `active` in an organization. A claim whose\n`expiresAt` has passed reads as `expired` and the resource may be claimed\nagain, so a holder that disappears never strands the resource. Released\nand expired claims are kept as history: a handoff is an `expired` claim\nfollowed by an `active` claim on the same resource. The holder reports\nwhat happened (`outcome`) when it releases the claim. The race between\nclaimants is decided server-side in a single statement.\n",
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
            "description": "Conflict - another connection holds the resource's active claim, the claim is not active, or the caller may not renew or release it",
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
    "/api/claims/{claimId}": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "claims"
        ],
        "summary": "Get a claim by ID",
        "operationId": "getClaim",
        "parameters": [
          {
            "name": "claimId",
            "in": "path",
            "description": "Claim ID",
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
            "description": "Claim response",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Claim Schema",
                  "description": "Server-returned claim: a time-bound hold that one connection takes on one\nresource so that competing workers never act on it twice. A claim is\ngeneric: it names the resource it holds by type and ID, and any construct\ncan be claimed. A claim is held by a connection (`claimantConnectionId`,\nfor example the connection a desktop client registered for its machine)\non behalf of the user whose session took it (`claimantUserId`). At most\none claim per resource is `active` in an organization. A claim whose\n`expiresAt` has passed reads as `expired` and the resource may be claimed\nagain, so a holder that disappears never strands the resource. Released\nand expired claims are kept as history: a handoff is an `expired` claim\nfollowed by an `active` claim on the same resource. The holder reports\nwhat happened (`outcome`) when it releases the claim. The race between\nclaimants is decided server-side in a single statement.\n",
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
      }
    },
    "/api/claims/{claimId}/renew": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "claims"
        ],
        "summary": "Renew a claim",
        "operationId": "renewClaim",
        "description": "Moves `expiresAt` forward and sets `renewedAt`, for the holding connection only: `connectionId` must be the caller's own live connection and the one that holds the claim. A claim that is not active (released, or past `expiresAt`), or that another connection holds, answers `409` and is never taken back.\n",
        "parameters": [
          {
            "name": "claimId",
            "in": "path",
            "description": "Claim ID",
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
                "description": "Payload for renewing a claim. Only the holding connection may renew.",
                "required": [
                  "connectionId"
                ],
                "properties": {
                  "connectionId": {
                    "type": "string",
                    "format": "uuid",
                    "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    },
                    "x-go-name": "ConnectionID",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "durationMinutes": {
                    "type": "integer",
                    "description": "Requested extension in minutes from now; the server applies its default (30) when omitted and may cap it.",
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
            "description": "Claim renewed",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Claim Schema",
                  "description": "Server-returned claim: a time-bound hold that one connection takes on one\nresource so that competing workers never act on it twice. A claim is\ngeneric: it names the resource it holds by type and ID, and any construct\ncan be claimed. A claim is held by a connection (`claimantConnectionId`,\nfor example the connection a desktop client registered for its machine)\non behalf of the user whose session took it (`claimantUserId`). At most\none claim per resource is `active` in an organization. A claim whose\n`expiresAt` has passed reads as `expired` and the resource may be claimed\nagain, so a holder that disappears never strands the resource. Released\nand expired claims are kept as history: a handoff is an `expired` claim\nfollowed by an `active` claim on the same resource. The holder reports\nwhat happened (`outcome`) when it releases the claim. The race between\nclaimants is decided server-side in a single statement.\n",
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
            "description": "Conflict - another connection holds the resource's active claim, the claim is not active, or the caller may not renew or release it",
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
    "/api/claims/{claimId}/release": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "claims"
        ],
        "summary": "Release a claim",
        "operationId": "releaseClaim",
        "description": "Ends an active claim and records what happened: sets `status` to `released`, `releasedAt`, `releasedBy` and the reported `outcome`, `outcomeError` and `outcomeEventId`. The holder may release its own claim from any of its connections (the claim's `claimantUserId` is the caller); a member holding Release claims of other members may release anyone's. Anyone else is answered `409`. Releasing a claim that is already released is a no-op that returns the stored claim unchanged, whatever outcome is sent. A claim that expired cannot be released (`409`): the resource may already have been handed off. `outcomeError` is accepted only with `outcome: failed`; `outcomeEventId` must name a live event the claim's holder owns, else `404`.\n",
        "parameters": [
          {
            "name": "claimId",
            "in": "path",
            "description": "Claim ID",
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
                "description": "Payload for releasing a claim with the outcome of the work it held. The releaser is the session user; no connection is needed, so a holder can release a stuck hold from another of its computers, and an authorized member can release someone else's.\n",
                "required": [
                  "outcome"
                ],
                "properties": {
                  "outcome": {
                    "type": "string",
                    "description": "What happened to the work the claim held.",
                    "enum": [
                      "completed",
                      "failed",
                      "cancelled"
                    ]
                  },
                  "outcomeError": {
                    "type": "string",
                    "description": "Error behind a `failed` outcome. Refused with any other outcome.",
                    "minLength": 1,
                    "maxLength": 5000
                  },
                  "outcomeEventId": {
                    "type": "string",
                    "format": "uuid",
                    "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    },
                    "x-go-name": "OutcomeEventID"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Claim released",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Claim Schema",
                  "description": "Server-returned claim: a time-bound hold that one connection takes on one\nresource so that competing workers never act on it twice. A claim is\ngeneric: it names the resource it holds by type and ID, and any construct\ncan be claimed. A claim is held by a connection (`claimantConnectionId`,\nfor example the connection a desktop client registered for its machine)\non behalf of the user whose session took it (`claimantUserId`). At most\none claim per resource is `active` in an organization. A claim whose\n`expiresAt` has passed reads as `expired` and the resource may be claimed\nagain, so a holder that disappears never strands the resource. Released\nand expired claims are kept as history: a handoff is an `expired` claim\nfollowed by an `active` claim on the same resource. The holder reports\nwhat happened (`outcome`) when it releases the claim. The race between\nclaimants is decided server-side in a single statement.\n",
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
            "description": "Conflict - another connection holds the resource's active claim, the claim is not active, or the caller may not renew or release it",
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
        "description": "Conflict - another connection holds the resource's active claim, the claim is not active, or the caller may not renew or release it",
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
      "claimId": {
        "name": "claimId",
        "in": "path",
        "description": "Claim ID",
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
        "description": "Number of items per page.",
        "schema": {
          "type": "integer",
          "minimum": 1
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
      "Claim": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Claim Schema",
        "description": "Server-returned claim: a time-bound hold that one connection takes on one\nresource so that competing workers never act on it twice. A claim is\ngeneric: it names the resource it holds by type and ID, and any construct\ncan be claimed. A claim is held by a connection (`claimantConnectionId`,\nfor example the connection a desktop client registered for its machine)\non behalf of the user whose session took it (`claimantUserId`). At most\none claim per resource is `active` in an organization. A claim whose\n`expiresAt` has passed reads as `expired` and the resource may be claimed\nagain, so a holder that disappears never strands the resource. Released\nand expired claims are kept as history: a handoff is an `expired` claim\nfollowed by an `active` claim on the same resource. The holder reports\nwhat happened (`outcome`) when it releases the claim. The race between\nclaimants is decided server-side in a single statement.\n",
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
      "ClaimPayload": {
        "type": "object",
        "description": "Payload for taking a claim. Contains only client-settable fields;\nthe owning `organizationId`, `claimantUserId`, `status`,\n`claimedAt`, `expiresAt` and the timestamps are server-managed.\n",
        "required": [
          "resourceType",
          "resourceId",
          "connectionId"
        ],
        "properties": {
          "resourceType": {
            "type": "string",
            "description": "Type of the resource to claim, for example `content_item`.",
            "minLength": 1,
            "maxLength": 64
          },
          "resourceId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "connectionId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-name": "ConnectionID",
            "x-go-type-skip-optional-pointer": true
          },
          "durationMinutes": {
            "type": "integer",
            "description": "Requested claim duration in minutes; the server applies its default (30) when omitted and may cap it.",
            "minimum": 1,
            "maximum": 1440
          }
        }
      },
      "ClaimRenewPayload": {
        "type": "object",
        "description": "Payload for renewing a claim. Only the holding connection may renew.",
        "required": [
          "connectionId"
        ],
        "properties": {
          "connectionId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-name": "ConnectionID",
            "x-go-type-skip-optional-pointer": true
          },
          "durationMinutes": {
            "type": "integer",
            "description": "Requested extension in minutes from now; the server applies its default (30) when omitted and may cap it.",
            "minimum": 1,
            "maximum": 1440
          }
        }
      },
      "ClaimReleasePayload": {
        "type": "object",
        "description": "Payload for releasing a claim with the outcome of the work it held. The releaser is the session user; no connection is needed, so a holder can release a stuck hold from another of its computers, and an authorized member can release someone else's.\n",
        "required": [
          "outcome"
        ],
        "properties": {
          "outcome": {
            "type": "string",
            "description": "What happened to the work the claim held.",
            "enum": [
              "completed",
              "failed",
              "cancelled"
            ]
          },
          "outcomeError": {
            "type": "string",
            "description": "Error behind a `failed` outcome. Refused with any other outcome.",
            "minLength": 1,
            "maxLength": 5000
          },
          "outcomeEventId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-name": "OutcomeEventID"
          }
        }
      },
      "ClaimPage": {
        "type": "object",
        "description": "Paginated collection of claims.",
        "required": [
          "page",
          "pageSize",
          "totalCount",
          "claims"
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
          "claims": {
            "type": "array",
            "items": {
              "x-go-type": "Claim",
              "$schema": "http://json-schema.org/draft-07/schema#",
              "title": "Claim Schema",
              "description": "Server-returned claim: a time-bound hold that one connection takes on one\nresource so that competing workers never act on it twice. A claim is\ngeneric: it names the resource it holds by type and ID, and any construct\ncan be claimed. A claim is held by a connection (`claimantConnectionId`,\nfor example the connection a desktop client registered for its machine)\non behalf of the user whose session took it (`claimantUserId`). At most\none claim per resource is `active` in an organization. A claim whose\n`expiresAt` has passed reads as `expired` and the resource may be claimed\nagain, so a holder that disappears never strands the resource. Released\nand expired claims are kept as history: a handoff is an `expired` claim\nfollowed by an `active` claim on the same resource. The holder reports\nwhat happened (`outcome`) when it releases the claim. The race between\nclaimants is decided server-side in a single statement.\n",
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
            "description": "Claims included on this page of results."
          }
        }
      }
    }
  }
};

export default ClaimSchema;
