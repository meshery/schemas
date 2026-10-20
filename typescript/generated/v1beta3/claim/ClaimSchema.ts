/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const ClaimSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Claim",
    "description": "OpenAPI schema for claims - generic, time-bound holds that one claimant\ntakes on one resource so competing workers never act on it twice. Any\nconstruct can be claimed; schedules nest the same claim under\n`/api/schedules/{scheduleId}/claim`. The race between claimants is\ndecided server-side in a single statement. Only the holder renews or\nreleases a claim; a claim past `expiresAt` is stale and the resource can\nbe claimed again.\nOrganization scope: every operation acts only in the organization the\nsession resolved to (X-Current-Orgid, then the user's selected\norganization), and only when the caller is a live member of it. A\ncaller who is not a member receives the same 404 as an unknown id, so\nthe existence of another organization's claims is never disclosed.\n",
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
        "description": "Returns a paginated list of claims in the organization of the authenticated session, optionally filtered by resource, claimant or status.",
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
            "name": "claimant",
            "in": "query",
            "required": false,
            "description": "Filter by holder identity.",
            "schema": {
              "type": "string",
              "maxLength": 255
            }
          },
          {
            "name": "status",
            "in": "query",
            "required": false,
            "description": "Filter by claim status.",
            "schema": {
              "type": "string",
              "enum": [
                "active",
                "released",
                "expired"
              ]
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
                        "description": "Server-returned claim: a time-bound hold that one claimant takes on one\nresource so that competing workers never act on it twice. A claim is\ngeneric: it names the resource it holds by type and ID, and any construct\ncan be claimed (a schedule is the first). A claim is live while its\nstatus is `active` and `expiresAt` is in the future; a live claim held by\nanother claimant refuses a new claim on the same resource. A claim whose\n`expiresAt` has passed is stale and the resource may be claimed again,\nso a claimant that disappears never strands the resource. Only the\nholder renews or releases a claim. The race between claimants is decided\nserver-side in a single statement.\n",
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
                      "description": "Claims included on this page of results."
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
          "claims"
        ],
        "summary": "Claim a resource",
        "operationId": "createClaim",
        "description": "Takes a claim on the named resource for `claimant`. Succeeds when the\nresource has no live claim or its live claim already belongs to the\nsame claimant; a live claim held by another claimant answers 409. A\nstale claim (past `expiresAt`) is superseded. Decided in a single\nserver-side statement, so of two racing claimants exactly one wins.\n",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for taking a claim. Contains only client-settable fields;\nthe owning `organizationId`, `status`, `claimedAt`, `expiresAt` and\nthe timestamps are server-managed.\n",
                "required": [
                  "resourceType",
                  "resourceId",
                  "claimant"
                ],
                "properties": {
                  "resourceType": {
                    "type": "string",
                    "description": "Type of the resource to claim, for example `schedule`.",
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
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Claim taken",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Claim Schema",
                  "description": "Server-returned claim: a time-bound hold that one claimant takes on one\nresource so that competing workers never act on it twice. A claim is\ngeneric: it names the resource it holds by type and ID, and any construct\ncan be claimed (a schedule is the first). A claim is live while its\nstatus is `active` and `expiresAt` is in the future; a live claim held by\nanother claimant refuses a new claim on the same resource. A claim whose\n`expiresAt` has passed is stale and the resource may be claimed again,\nso a claimant that disappears never strands the resource. Only the\nholder renews or releases a claim. The race between claimants is decided\nserver-side in a single statement.\n",
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
            "description": "Conflict - the resource is held by another claimant's live claim, or the caller is not the holder of the claim it tried to renew or release",
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
                  "description": "Server-returned claim: a time-bound hold that one claimant takes on one\nresource so that competing workers never act on it twice. A claim is\ngeneric: it names the resource it holds by type and ID, and any construct\ncan be claimed (a schedule is the first). A claim is live while its\nstatus is `active` and `expiresAt` is in the future; a live claim held by\nanother claimant refuses a new claim on the same resource. A claim whose\n`expiresAt` has passed is stale and the resource may be claimed again,\nso a claimant that disappears never strands the resource. Only the\nholder renews or releases a claim. The race between claimants is decided\nserver-side in a single statement.\n",
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
        "description": "Moves `expiresAt` forward for the holder only. A claim that is not active, or that belongs to another claimant, answers 409 and is never taken back.",
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
            "description": "Claim renewed",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Claim Schema",
                  "description": "Server-returned claim: a time-bound hold that one claimant takes on one\nresource so that competing workers never act on it twice. A claim is\ngeneric: it names the resource it holds by type and ID, and any construct\ncan be claimed (a schedule is the first). A claim is live while its\nstatus is `active` and `expiresAt` is in the future; a live claim held by\nanother claimant refuses a new claim on the same resource. A claim whose\n`expiresAt` has passed is stale and the resource may be claimed again,\nso a claimant that disappears never strands the resource. Only the\nholder renews or releases a claim. The race between claimants is decided\nserver-side in a single statement.\n",
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
            "description": "Conflict - the resource is held by another claimant's live claim, or the caller is not the holder of the claim it tried to renew or release",
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
        "description": "Ends the claim for the holder, setting `status` to `released` and `releasedAt`. Releasing a claim that is already released is a no-op; a release by another claimant answers 409.",
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
                "description": "Payload for releasing a claim. Only the holder named by `claimant` may release.",
                "required": [
                  "claimant"
                ],
                "properties": {
                  "claimant": {
                    "type": "string",
                    "description": "Identity of the holder releasing the claim.",
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
            "description": "Claim released",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Claim Schema",
                  "description": "Server-returned claim: a time-bound hold that one claimant takes on one\nresource so that competing workers never act on it twice. A claim is\ngeneric: it names the resource it holds by type and ID, and any construct\ncan be claimed (a schedule is the first). A claim is live while its\nstatus is `active` and `expiresAt` is in the future; a live claim held by\nanother claimant refuses a new claim on the same resource. A claim whose\n`expiresAt` has passed is stale and the resource may be claimed again,\nso a claimant that disappears never strands the resource. Only the\nholder renews or releases a claim. The race between claimants is decided\nserver-side in a single statement.\n",
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
            "description": "Conflict - the resource is held by another claimant's live claim, or the caller is not the holder of the claim it tried to renew or release",
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
        "description": "Conflict - the resource is held by another claimant's live claim, or the caller is not the holder of the claim it tried to renew or release",
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
        "description": "Server-returned claim: a time-bound hold that one claimant takes on one\nresource so that competing workers never act on it twice. A claim is\ngeneric: it names the resource it holds by type and ID, and any construct\ncan be claimed (a schedule is the first). A claim is live while its\nstatus is `active` and `expiresAt` is in the future; a live claim held by\nanother claimant refuses a new claim on the same resource. A claim whose\n`expiresAt` has passed is stale and the resource may be claimed again,\nso a claimant that disappears never strands the resource. Only the\nholder renews or releases a claim. The race between claimants is decided\nserver-side in a single statement.\n",
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
      "ClaimPayload": {
        "type": "object",
        "description": "Payload for taking a claim. Contains only client-settable fields;\nthe owning `organizationId`, `status`, `claimedAt`, `expiresAt` and\nthe timestamps are server-managed.\n",
        "required": [
          "resourceType",
          "resourceId",
          "claimant"
        ],
        "properties": {
          "resourceType": {
            "type": "string",
            "description": "Type of the resource to claim, for example `schedule`.",
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
          }
        }
      },
      "ClaimRenewPayload": {
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
      },
      "ClaimReleasePayload": {
        "type": "object",
        "description": "Payload for releasing a claim. Only the holder named by `claimant` may release.",
        "required": [
          "claimant"
        ],
        "properties": {
          "claimant": {
            "type": "string",
            "description": "Identity of the holder releasing the claim.",
            "minLength": 1,
            "maxLength": 255
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
              "description": "Server-returned claim: a time-bound hold that one claimant takes on one\nresource so that competing workers never act on it twice. A claim is\ngeneric: it names the resource it holds by type and ID, and any construct\ncan be claimed (a schedule is the first). A claim is live while its\nstatus is `active` and `expiresAt` is in the future; a live claim held by\nanother claimant refuses a new claim on the same resource. A claim whose\n`expiresAt` has passed is stale and the resource may be claimed again,\nso a claimant that disappears never strands the resource. Only the\nholder renews or releases a claim. The race between claimants is decided\nserver-side in a single statement.\n",
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
            "description": "Claims included on this page of results."
          }
        }
      }
    }
  }
};

export default ClaimSchema;
