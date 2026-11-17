/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const RequestSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Request",
    "description": "OpenAPI schema for requests - generic decisions that a person with the\nright to make them is asked to make about a subject. The first kind,\n`content_item_approval`, is created when a content item is inserted\nwhose effective approval is required, by a person or an AI app: that\nitem waits unapproved until a person approves or denies its request in\nthe app. An item whose approval is not required opens no request on insert.\nA content edit supersedes the item's open request and, when it leaves the\nitem unapproved, opens a fresh one, whatever the resolved approval. An\napprovalPolicy change opens one when it resets an approved item or finds an\nunapproved item with no open request. approveRequest is the only\nway a content item's `approved` becomes true; ContentItemPayload has no\n`approved`. A request names its subject by type and ID, so any construct\ncan be the subject of a kind. Requests are created by the server, not by\na client call, and are decided once, or superseded when a content edit or\na delete changes the subject before a decision (the approval then applies to the\ncontent as of the new open request). Closed requests are kept as\nhistory.\nEach kind names the permission key that may decide it (`x-decision-key`\non RequestKind). Deciding is a human act: approveRequest and denyRequest\ncarry no `x-mcp` annotation and the schema lint refuses one, so no AI\napp tool can approve or deny, and no OAuth scope keychain carries a\ndeciding key.\nOrganization scope: every operation acts only in the organization the\nsession resolved to (X-Current-Orgid, then the user's selected\norganization), and only when the caller is a live member of it. A\ncaller who is not a member receives the same 404 as an unknown id, so\nthe existence of another organization's requests is never disclosed.\nAuthorization: reading requests takes the View Requests key; deciding a\nrequest takes the deciding key of its kind (for `content_item_approval`,\nDecide Content Item Approvals). Every key is checked in the session\norganization.\n",
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
      "name": "requests",
      "description": "Operations related to requests for a decision."
    }
  ],
  "paths": {
    "/api/requests": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "requests"
        ],
        "summary": "List requests",
        "operationId": "listRequests",
        "description": "Returns a paginated list of the requests in the organization of the authenticated session, pending and decided, optionally filtered by kind and status. Ordered by `createdAt`, newest first, unless `order` is `createdAt asc`. Every member holding View Requests sees every request in the organization.\n",
        "parameters": [
          {
            "name": "X-Current-Orgid",
            "in": "header",
            "required": false,
            "description": "Organization the call acts in, by ID (a UUID). When present, the server resolves the session organization from it instead of the caller's selected organization, and runs its membership and permission checks there. A caller who is not a live member of the named organization receives the same 404 as an unknown resource. Omitted, the caller's selected organization applies.",
            "schema": {
              "type": "string",
              "minLength": 36,
              "maxLength": 36,
              "pattern": "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"
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
            "name": "order",
            "in": "query",
            "description": "Get ordered responses",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "kind",
            "in": "query",
            "required": false,
            "description": "Filter by request kind.",
            "schema": {
              "type": "string",
              "description": "What a request asks a person to decide. Each kind fixes the subject type and names the permission key that may decide it, in `x-decision-key` (the generated constant name in models/permissions). A kind is added together with its deciding key and its handling in docs/request-contract.md.\n",
              "enum": [
                "content_item_approval"
              ],
              "x-enum-varnames": [
                "RequestKindContentItemApproval"
              ],
              "x-enumDescriptions": {
                "content_item_approval": "A content item, written by a person or an AI app, waits for a person to approve it before it may run. The subject is a `content_item`.\n"
              },
              "x-decision-key": {
                "content_item_approval": "CatalogManagementDecideContentItemApprovals"
              },
              "x-subject-type": {
                "content_item_approval": "content_item"
              }
            }
          },
          {
            "name": "status",
            "in": "query",
            "required": false,
            "description": "Filter by request status, for example `superseded` for the requests a content edit or a delete closed before a decision.",
            "schema": {
              "type": "string",
              "description": "Lifecycle of a request. `pending` until it is decided. `approved` or `denied` once, by a person with the kind's deciding key. `superseded` when a content edit or a delete changes the subject before a decision: the request is closed with `decidedAt` set, no `decidedBy` and no note, and a fresh pending request opens if the edit leaves the item unapproved, whatever the result. Each of `approved`, `denied` and `superseded` is final.\n",
              "enum": [
                "pending",
                "approved",
                "denied",
                "superseded"
              ],
              "x-enum-varnames": [
                "RequestStatusPending",
                "RequestStatusApproved",
                "RequestStatusDenied",
                "RequestStatusSuperseded"
              ]
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Requests page",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated collection of requests.",
                  "required": [
                    "page",
                    "pageSize",
                    "totalCount",
                    "requests"
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
                    "requests": {
                      "type": "array",
                      "items": {
                        "x-go-type": "Request",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "title": "Request Schema",
                        "description": "Server-returned request: one decision that a person with the right to make\nit has been asked to make about a subject, for example whether a content\nitem may run. A request is generic. Its `kind` says\nwhat is being decided and which permission key may decide it, and it names\nits subject by type and ID, so any construct can be the subject of a kind.\nA request is created `pending` by the server when the thing that needs a\ndecision happens (it is not created by a client call), and is decided once:\n`approved` or `denied`, by a user holding the kind's deciding permission\nkey. A content edit or a delete that changes the subject before it is decided closes\nthe request as `superseded`, so an approval always applies to the content\nas of the open request. Closed requests are kept as history. See\ndocs/request-contract.md.\n",
                        "type": "object",
                        "additionalProperties": false,
                        "required": [
                          "id",
                          "organizationId",
                          "kind",
                          "subjectType",
                          "subjectId",
                          "requesterId",
                          "status",
                          "createdAt",
                          "updatedAt"
                        ],
                        "properties": {
                          "id": {
                            "description": "Server-generated request ID.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "id"
                            },
                            "x-order": 1,
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "organizationId": {
                            "description": "Owning organization ID. Derived from the subject, never client-settable.",
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
                          "kind": {
                            "type": "string",
                            "description": "What a request asks a person to decide. Each kind fixes the subject type and names the permission key that may decide it, in `x-decision-key` (the generated constant name in models/permissions). A kind is added together with its deciding key and its handling in docs/request-contract.md.\n",
                            "enum": [
                              "content_item_approval"
                            ],
                            "x-enum-varnames": [
                              "RequestKindContentItemApproval"
                            ],
                            "x-enumDescriptions": {
                              "content_item_approval": "A content item, written by a person or an AI app, waits for a person to approve it before it may run. The subject is a `content_item`.\n"
                            },
                            "x-decision-key": {
                              "content_item_approval": "CatalogManagementDecideContentItemApprovals"
                            },
                            "x-subject-type": {
                              "content_item_approval": "content_item"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "kind"
                            },
                            "x-order": 3
                          },
                          "subjectType": {
                            "type": "string",
                            "description": "Type of the subject, the construct name in snake_case, for example `content_item`. Fixed by the kind.",
                            "minLength": 1,
                            "maxLength": 64,
                            "x-oapi-codegen-extra-tags": {
                              "db": "subject_type"
                            },
                            "x-order": 4
                          },
                          "subjectId": {
                            "description": "ID of the subject the request is about.",
                            "x-go-name": "SubjectID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "subject_id"
                            },
                            "x-order": 5,
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "requesterId": {
                            "description": "ID of the user on whose behalf the request was made: the user whose session or AI app made the write that needs a decision. Server-set.\n",
                            "x-go-name": "RequesterID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "requester_id"
                            },
                            "x-order": 6,
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "createdByClient": {
                            "type": "string",
                            "description": "OAuth client ID of the AI app that made the write behind the request. Server-set from the access token. Empty or omitted when a person made it.\n",
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_by_client",
                              "json": "createdByClient,omitempty"
                            },
                            "x-order": 7
                          },
                          "status": {
                            "type": "string",
                            "description": "Lifecycle of a request. `pending` until it is decided. `approved` or `denied` once, by a person with the kind's deciding key. `superseded` when a content edit or a delete changes the subject before a decision: the request is closed with `decidedAt` set, no `decidedBy` and no note, and a fresh pending request opens if the edit leaves the item unapproved, whatever the result. Each of `approved`, `denied` and `superseded` is final.\n",
                            "enum": [
                              "pending",
                              "approved",
                              "denied",
                              "superseded"
                            ],
                            "x-enum-varnames": [
                              "RequestStatusPending",
                              "RequestStatusApproved",
                              "RequestStatusDenied",
                              "RequestStatusSuperseded"
                            ],
                            "x-oapi-codegen-extra-tags": {
                              "db": "status"
                            },
                            "x-order": 8
                          },
                          "decidedBy": {
                            "description": "ID of the user who approved or denied the request. Derived from the session; omitted while the request is pending and when it is superseded, since no user decided it.",
                            "x-go-name": "DecidedBy",
                            "x-oapi-codegen-extra-tags": {
                              "db": "decided_by",
                              "json": "decidedBy,omitempty"
                            },
                            "x-order": 9,
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "decidedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Time the request was decided, or superseded by a content edit or a delete (decidedBy and note are then omitted). Null while the request is pending.",
                            "nullable": true,
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "decided_at"
                            },
                            "x-order": 10
                          },
                          "note": {
                            "type": "string",
                            "description": "The note the decider left with the decision. Omitted while the request is pending, when it is superseded, and when the decider left none.",
                            "maxLength": 2000,
                            "x-oapi-codegen-extra-tags": {
                              "db": "note",
                              "json": "note,omitempty"
                            },
                            "x-order": 11
                          },
                          "createdAt": {
                            "description": "Timestamp of request creation.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at"
                            },
                            "x-order": 12,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp of last request modification.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at"
                            },
                            "x-order": 13,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          }
                        }
                      },
                      "description": "Requests included on this page of results."
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
    "/api/requests/{requestId}": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "requests"
        ],
        "summary": "Get a request by ID",
        "operationId": "getRequest",
        "description": "Returns the request with the given id. A `requestId` or `X-Current-Orgid` that is not a UUID answers 400.\n",
        "parameters": [
          {
            "name": "X-Current-Orgid",
            "in": "header",
            "required": false,
            "description": "Organization the call acts in, by ID (a UUID). When present, the server resolves the session organization from it instead of the caller's selected organization, and runs its membership and permission checks there. A caller who is not a live member of the named organization receives the same 404 as an unknown resource. Omitted, the caller's selected organization applies.",
            "schema": {
              "type": "string",
              "minLength": 36,
              "maxLength": 36,
              "pattern": "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"
            }
          },
          {
            "name": "requestId",
            "in": "path",
            "description": "Request ID",
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
            "description": "Request response",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Request Schema",
                  "description": "Server-returned request: one decision that a person with the right to make\nit has been asked to make about a subject, for example whether a content\nitem may run. A request is generic. Its `kind` says\nwhat is being decided and which permission key may decide it, and it names\nits subject by type and ID, so any construct can be the subject of a kind.\nA request is created `pending` by the server when the thing that needs a\ndecision happens (it is not created by a client call), and is decided once:\n`approved` or `denied`, by a user holding the kind's deciding permission\nkey. A content edit or a delete that changes the subject before it is decided closes\nthe request as `superseded`, so an approval always applies to the content\nas of the open request. Closed requests are kept as history. See\ndocs/request-contract.md.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "kind",
                    "subjectType",
                    "subjectId",
                    "requesterId",
                    "status",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Server-generated request ID.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id"
                      },
                      "x-order": 1,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "organizationId": {
                      "description": "Owning organization ID. Derived from the subject, never client-settable.",
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
                    "kind": {
                      "type": "string",
                      "description": "What a request asks a person to decide. Each kind fixes the subject type and names the permission key that may decide it, in `x-decision-key` (the generated constant name in models/permissions). A kind is added together with its deciding key and its handling in docs/request-contract.md.\n",
                      "enum": [
                        "content_item_approval"
                      ],
                      "x-enum-varnames": [
                        "RequestKindContentItemApproval"
                      ],
                      "x-enumDescriptions": {
                        "content_item_approval": "A content item, written by a person or an AI app, waits for a person to approve it before it may run. The subject is a `content_item`.\n"
                      },
                      "x-decision-key": {
                        "content_item_approval": "CatalogManagementDecideContentItemApprovals"
                      },
                      "x-subject-type": {
                        "content_item_approval": "content_item"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "kind"
                      },
                      "x-order": 3
                    },
                    "subjectType": {
                      "type": "string",
                      "description": "Type of the subject, the construct name in snake_case, for example `content_item`. Fixed by the kind.",
                      "minLength": 1,
                      "maxLength": 64,
                      "x-oapi-codegen-extra-tags": {
                        "db": "subject_type"
                      },
                      "x-order": 4
                    },
                    "subjectId": {
                      "description": "ID of the subject the request is about.",
                      "x-go-name": "SubjectID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "subject_id"
                      },
                      "x-order": 5,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "requesterId": {
                      "description": "ID of the user on whose behalf the request was made: the user whose session or AI app made the write that needs a decision. Server-set.\n",
                      "x-go-name": "RequesterID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "requester_id"
                      },
                      "x-order": 6,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "createdByClient": {
                      "type": "string",
                      "description": "OAuth client ID of the AI app that made the write behind the request. Server-set from the access token. Empty or omitted when a person made it.\n",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_by_client",
                        "json": "createdByClient,omitempty"
                      },
                      "x-order": 7
                    },
                    "status": {
                      "type": "string",
                      "description": "Lifecycle of a request. `pending` until it is decided. `approved` or `denied` once, by a person with the kind's deciding key. `superseded` when a content edit or a delete changes the subject before a decision: the request is closed with `decidedAt` set, no `decidedBy` and no note, and a fresh pending request opens if the edit leaves the item unapproved, whatever the result. Each of `approved`, `denied` and `superseded` is final.\n",
                      "enum": [
                        "pending",
                        "approved",
                        "denied",
                        "superseded"
                      ],
                      "x-enum-varnames": [
                        "RequestStatusPending",
                        "RequestStatusApproved",
                        "RequestStatusDenied",
                        "RequestStatusSuperseded"
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      },
                      "x-order": 8
                    },
                    "decidedBy": {
                      "description": "ID of the user who approved or denied the request. Derived from the session; omitted while the request is pending and when it is superseded, since no user decided it.",
                      "x-go-name": "DecidedBy",
                      "x-oapi-codegen-extra-tags": {
                        "db": "decided_by",
                        "json": "decidedBy,omitempty"
                      },
                      "x-order": 9,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "decidedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the request was decided, or superseded by a content edit or a delete (decidedBy and note are then omitted). Null while the request is pending.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "decided_at"
                      },
                      "x-order": 10
                    },
                    "note": {
                      "type": "string",
                      "description": "The note the decider left with the decision. Omitted while the request is pending, when it is superseded, and when the decider left none.",
                      "maxLength": 2000,
                      "x-oapi-codegen-extra-tags": {
                        "db": "note",
                        "json": "note,omitempty"
                      },
                      "x-order": 11
                    },
                    "createdAt": {
                      "description": "Timestamp of request creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 12,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last request modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 13,
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
    "/api/requests/{requestId}/approve": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "requests"
        ],
        "summary": "Approve a request",
        "operationId": "approveRequest",
        "description": "Approves a pending request: sets `status` to `approved`, `decidedBy` to the session user, `decidedAt` to now and `note` to the optional note. The caller must hold the deciding permission key of the request's `kind`, else 403 and nothing changes. For `content_item_approval` the server also sets the subject content item's `approved` to true in the same transaction; this is the only operation that does, since no content item request body carries `approved`. The refusals are checked in this order, and each changes nothing and leaves the request as it was: a request that is not `pending` answers 409 whatever its subject (decided, or `superseded`, including by a soft delete of its subject); a pending request whose subject is hard-deleted answers 404, as does an unknown request. The body may be omitted.\n",
        "parameters": [
          {
            "name": "X-Current-Orgid",
            "in": "header",
            "required": false,
            "description": "Organization the call acts in, by ID (a UUID). When present, the server resolves the session organization from it instead of the caller's selected organization, and runs its membership and permission checks there. A caller who is not a live member of the named organization receives the same 404 as an unknown resource. Omitted, the caller's selected organization applies.",
            "schema": {
              "type": "string",
              "minLength": 36,
              "maxLength": 36,
              "pattern": "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"
            }
          },
          {
            "name": "requestId",
            "in": "path",
            "description": "Request ID",
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
                "additionalProperties": false,
                "description": "Payload for approving or denying a request. Contains only the decider's note; `status`, `decidedBy` and `decidedAt` are set by the server from the operation and the session.\n",
                "properties": {
                  "note": {
                    "type": "string",
                    "description": "Optional note left with the decision, shown to the requester.",
                    "minLength": 1,
                    "maxLength": 2000
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Request approved",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Request Schema",
                  "description": "Server-returned request: one decision that a person with the right to make\nit has been asked to make about a subject, for example whether a content\nitem may run. A request is generic. Its `kind` says\nwhat is being decided and which permission key may decide it, and it names\nits subject by type and ID, so any construct can be the subject of a kind.\nA request is created `pending` by the server when the thing that needs a\ndecision happens (it is not created by a client call), and is decided once:\n`approved` or `denied`, by a user holding the kind's deciding permission\nkey. A content edit or a delete that changes the subject before it is decided closes\nthe request as `superseded`, so an approval always applies to the content\nas of the open request. Closed requests are kept as history. See\ndocs/request-contract.md.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "kind",
                    "subjectType",
                    "subjectId",
                    "requesterId",
                    "status",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Server-generated request ID.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id"
                      },
                      "x-order": 1,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "organizationId": {
                      "description": "Owning organization ID. Derived from the subject, never client-settable.",
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
                    "kind": {
                      "type": "string",
                      "description": "What a request asks a person to decide. Each kind fixes the subject type and names the permission key that may decide it, in `x-decision-key` (the generated constant name in models/permissions). A kind is added together with its deciding key and its handling in docs/request-contract.md.\n",
                      "enum": [
                        "content_item_approval"
                      ],
                      "x-enum-varnames": [
                        "RequestKindContentItemApproval"
                      ],
                      "x-enumDescriptions": {
                        "content_item_approval": "A content item, written by a person or an AI app, waits for a person to approve it before it may run. The subject is a `content_item`.\n"
                      },
                      "x-decision-key": {
                        "content_item_approval": "CatalogManagementDecideContentItemApprovals"
                      },
                      "x-subject-type": {
                        "content_item_approval": "content_item"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "kind"
                      },
                      "x-order": 3
                    },
                    "subjectType": {
                      "type": "string",
                      "description": "Type of the subject, the construct name in snake_case, for example `content_item`. Fixed by the kind.",
                      "minLength": 1,
                      "maxLength": 64,
                      "x-oapi-codegen-extra-tags": {
                        "db": "subject_type"
                      },
                      "x-order": 4
                    },
                    "subjectId": {
                      "description": "ID of the subject the request is about.",
                      "x-go-name": "SubjectID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "subject_id"
                      },
                      "x-order": 5,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "requesterId": {
                      "description": "ID of the user on whose behalf the request was made: the user whose session or AI app made the write that needs a decision. Server-set.\n",
                      "x-go-name": "RequesterID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "requester_id"
                      },
                      "x-order": 6,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "createdByClient": {
                      "type": "string",
                      "description": "OAuth client ID of the AI app that made the write behind the request. Server-set from the access token. Empty or omitted when a person made it.\n",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_by_client",
                        "json": "createdByClient,omitempty"
                      },
                      "x-order": 7
                    },
                    "status": {
                      "type": "string",
                      "description": "Lifecycle of a request. `pending` until it is decided. `approved` or `denied` once, by a person with the kind's deciding key. `superseded` when a content edit or a delete changes the subject before a decision: the request is closed with `decidedAt` set, no `decidedBy` and no note, and a fresh pending request opens if the edit leaves the item unapproved, whatever the result. Each of `approved`, `denied` and `superseded` is final.\n",
                      "enum": [
                        "pending",
                        "approved",
                        "denied",
                        "superseded"
                      ],
                      "x-enum-varnames": [
                        "RequestStatusPending",
                        "RequestStatusApproved",
                        "RequestStatusDenied",
                        "RequestStatusSuperseded"
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      },
                      "x-order": 8
                    },
                    "decidedBy": {
                      "description": "ID of the user who approved or denied the request. Derived from the session; omitted while the request is pending and when it is superseded, since no user decided it.",
                      "x-go-name": "DecidedBy",
                      "x-oapi-codegen-extra-tags": {
                        "db": "decided_by",
                        "json": "decidedBy,omitempty"
                      },
                      "x-order": 9,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "decidedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the request was decided, or superseded by a content edit or a delete (decidedBy and note are then omitted). Null while the request is pending.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "decided_at"
                      },
                      "x-order": 10
                    },
                    "note": {
                      "type": "string",
                      "description": "The note the decider left with the decision. Omitted while the request is pending, when it is superseded, and when the decider left none.",
                      "maxLength": 2000,
                      "x-oapi-codegen-extra-tags": {
                        "db": "note",
                        "json": "note,omitempty"
                      },
                      "x-order": 11
                    },
                    "createdAt": {
                      "description": "Timestamp of request creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 12,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last request modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 13,
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
            "description": "Not found - the request does not exist in the organization, or its subject content item no longer exists (hard-deleted). Nothing changes; the request stays as it was.",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "409": {
            "description": "Conflict - the request is not pending, so it was already decided or superseded by a content edit or a delete and is never changed, or its subject content item is soft-deleted (deletedAt set), which superseded the request. Nothing changes; the request stays as it was.",
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
    "/api/requests/{requestId}/deny": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "requests"
        ],
        "summary": "Deny a request",
        "operationId": "denyRequest",
        "description": "Denies a pending request: sets `status` to `denied`, `decidedBy` to the session user, `decidedAt` to now and `note` to the optional note. The caller must hold the deciding permission key of the request's `kind`, else 403 and nothing changes. For `content_item_approval` the subject content item stays unapproved. The refusals are checked in this order, and each changes nothing and leaves the request as it was: a request that is not `pending` answers 409 whatever its subject (decided, or `superseded`, including by a soft delete of its subject); a pending request whose subject is hard-deleted answers 404, as does an unknown request. The body may be omitted.\n",
        "parameters": [
          {
            "name": "X-Current-Orgid",
            "in": "header",
            "required": false,
            "description": "Organization the call acts in, by ID (a UUID). When present, the server resolves the session organization from it instead of the caller's selected organization, and runs its membership and permission checks there. A caller who is not a live member of the named organization receives the same 404 as an unknown resource. Omitted, the caller's selected organization applies.",
            "schema": {
              "type": "string",
              "minLength": 36,
              "maxLength": 36,
              "pattern": "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"
            }
          },
          {
            "name": "requestId",
            "in": "path",
            "description": "Request ID",
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
                "additionalProperties": false,
                "description": "Payload for approving or denying a request. Contains only the decider's note; `status`, `decidedBy` and `decidedAt` are set by the server from the operation and the session.\n",
                "properties": {
                  "note": {
                    "type": "string",
                    "description": "Optional note left with the decision, shown to the requester.",
                    "minLength": 1,
                    "maxLength": 2000
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Request denied",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Request Schema",
                  "description": "Server-returned request: one decision that a person with the right to make\nit has been asked to make about a subject, for example whether a content\nitem may run. A request is generic. Its `kind` says\nwhat is being decided and which permission key may decide it, and it names\nits subject by type and ID, so any construct can be the subject of a kind.\nA request is created `pending` by the server when the thing that needs a\ndecision happens (it is not created by a client call), and is decided once:\n`approved` or `denied`, by a user holding the kind's deciding permission\nkey. A content edit or a delete that changes the subject before it is decided closes\nthe request as `superseded`, so an approval always applies to the content\nas of the open request. Closed requests are kept as history. See\ndocs/request-contract.md.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "kind",
                    "subjectType",
                    "subjectId",
                    "requesterId",
                    "status",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Server-generated request ID.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id"
                      },
                      "x-order": 1,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "organizationId": {
                      "description": "Owning organization ID. Derived from the subject, never client-settable.",
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
                    "kind": {
                      "type": "string",
                      "description": "What a request asks a person to decide. Each kind fixes the subject type and names the permission key that may decide it, in `x-decision-key` (the generated constant name in models/permissions). A kind is added together with its deciding key and its handling in docs/request-contract.md.\n",
                      "enum": [
                        "content_item_approval"
                      ],
                      "x-enum-varnames": [
                        "RequestKindContentItemApproval"
                      ],
                      "x-enumDescriptions": {
                        "content_item_approval": "A content item, written by a person or an AI app, waits for a person to approve it before it may run. The subject is a `content_item`.\n"
                      },
                      "x-decision-key": {
                        "content_item_approval": "CatalogManagementDecideContentItemApprovals"
                      },
                      "x-subject-type": {
                        "content_item_approval": "content_item"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "kind"
                      },
                      "x-order": 3
                    },
                    "subjectType": {
                      "type": "string",
                      "description": "Type of the subject, the construct name in snake_case, for example `content_item`. Fixed by the kind.",
                      "minLength": 1,
                      "maxLength": 64,
                      "x-oapi-codegen-extra-tags": {
                        "db": "subject_type"
                      },
                      "x-order": 4
                    },
                    "subjectId": {
                      "description": "ID of the subject the request is about.",
                      "x-go-name": "SubjectID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "subject_id"
                      },
                      "x-order": 5,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "requesterId": {
                      "description": "ID of the user on whose behalf the request was made: the user whose session or AI app made the write that needs a decision. Server-set.\n",
                      "x-go-name": "RequesterID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "requester_id"
                      },
                      "x-order": 6,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "createdByClient": {
                      "type": "string",
                      "description": "OAuth client ID of the AI app that made the write behind the request. Server-set from the access token. Empty or omitted when a person made it.\n",
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_by_client",
                        "json": "createdByClient,omitempty"
                      },
                      "x-order": 7
                    },
                    "status": {
                      "type": "string",
                      "description": "Lifecycle of a request. `pending` until it is decided. `approved` or `denied` once, by a person with the kind's deciding key. `superseded` when a content edit or a delete changes the subject before a decision: the request is closed with `decidedAt` set, no `decidedBy` and no note, and a fresh pending request opens if the edit leaves the item unapproved, whatever the result. Each of `approved`, `denied` and `superseded` is final.\n",
                      "enum": [
                        "pending",
                        "approved",
                        "denied",
                        "superseded"
                      ],
                      "x-enum-varnames": [
                        "RequestStatusPending",
                        "RequestStatusApproved",
                        "RequestStatusDenied",
                        "RequestStatusSuperseded"
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      },
                      "x-order": 8
                    },
                    "decidedBy": {
                      "description": "ID of the user who approved or denied the request. Derived from the session; omitted while the request is pending and when it is superseded, since no user decided it.",
                      "x-go-name": "DecidedBy",
                      "x-oapi-codegen-extra-tags": {
                        "db": "decided_by",
                        "json": "decidedBy,omitempty"
                      },
                      "x-order": 9,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "decidedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the request was decided, or superseded by a content edit or a delete (decidedBy and note are then omitted). Null while the request is pending.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "decided_at"
                      },
                      "x-order": 10
                    },
                    "note": {
                      "type": "string",
                      "description": "The note the decider left with the decision. Omitted while the request is pending, when it is superseded, and when the decider left none.",
                      "maxLength": 2000,
                      "x-oapi-codegen-extra-tags": {
                        "db": "note",
                        "json": "note,omitempty"
                      },
                      "x-order": 11
                    },
                    "createdAt": {
                      "description": "Timestamp of request creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 12,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last request modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 13,
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
            "description": "Not found - the request does not exist in the organization, or its subject content item no longer exists (hard-deleted). Nothing changes; the request stays as it was.",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "409": {
            "description": "Conflict - the request is not pending, so it was already decided or superseded by a content edit or a delete and is never changed, or its subject content item is soft-deleted (deletedAt set), which superseded the request. Nothing changes; the request stays as it was.",
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
        "description": "Conflict - the request is not pending, so it was already decided or superseded by a content edit or a delete and is never changed, or its subject content item is soft-deleted (deletedAt set), which superseded the request. Nothing changes; the request stays as it was.",
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
      "DecisionNotFound": {
        "description": "Not found - the request does not exist in the organization, or its subject content item no longer exists (hard-deleted). Nothing changes; the request stays as it was.",
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
      "currentOrgId": {
        "name": "X-Current-Orgid",
        "in": "header",
        "required": false,
        "description": "Organization the call acts in, by ID (a UUID). When present, the server resolves the session organization from it instead of the caller's selected organization, and runs its membership and permission checks there. A caller who is not a live member of the named organization receives the same 404 as an unknown resource. Omitted, the caller's selected organization applies.",
        "schema": {
          "type": "string",
          "minLength": 36,
          "maxLength": 36,
          "pattern": "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"
        }
      },
      "requestId": {
        "name": "requestId",
        "in": "path",
        "description": "Request ID",
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
      },
      "kind": {
        "name": "kind",
        "in": "query",
        "required": false,
        "description": "Filter by request kind.",
        "schema": {
          "type": "string",
          "description": "What a request asks a person to decide. Each kind fixes the subject type and names the permission key that may decide it, in `x-decision-key` (the generated constant name in models/permissions). A kind is added together with its deciding key and its handling in docs/request-contract.md.\n",
          "enum": [
            "content_item_approval"
          ],
          "x-enum-varnames": [
            "RequestKindContentItemApproval"
          ],
          "x-enumDescriptions": {
            "content_item_approval": "A content item, written by a person or an AI app, waits for a person to approve it before it may run. The subject is a `content_item`.\n"
          },
          "x-decision-key": {
            "content_item_approval": "CatalogManagementDecideContentItemApprovals"
          },
          "x-subject-type": {
            "content_item_approval": "content_item"
          }
        }
      },
      "status": {
        "name": "status",
        "in": "query",
        "required": false,
        "description": "Filter by request status, for example `superseded` for the requests a content edit or a delete closed before a decision.",
        "schema": {
          "type": "string",
          "description": "Lifecycle of a request. `pending` until it is decided. `approved` or `denied` once, by a person with the kind's deciding key. `superseded` when a content edit or a delete changes the subject before a decision: the request is closed with `decidedAt` set, no `decidedBy` and no note, and a fresh pending request opens if the edit leaves the item unapproved, whatever the result. Each of `approved`, `denied` and `superseded` is final.\n",
          "enum": [
            "pending",
            "approved",
            "denied",
            "superseded"
          ],
          "x-enum-varnames": [
            "RequestStatusPending",
            "RequestStatusApproved",
            "RequestStatusDenied",
            "RequestStatusSuperseded"
          ]
        }
      }
    },
    "schemas": {
      "Request": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Request Schema",
        "description": "Server-returned request: one decision that a person with the right to make\nit has been asked to make about a subject, for example whether a content\nitem may run. A request is generic. Its `kind` says\nwhat is being decided and which permission key may decide it, and it names\nits subject by type and ID, so any construct can be the subject of a kind.\nA request is created `pending` by the server when the thing that needs a\ndecision happens (it is not created by a client call), and is decided once:\n`approved` or `denied`, by a user holding the kind's deciding permission\nkey. A content edit or a delete that changes the subject before it is decided closes\nthe request as `superseded`, so an approval always applies to the content\nas of the open request. Closed requests are kept as history. See\ndocs/request-contract.md.\n",
        "type": "object",
        "additionalProperties": false,
        "required": [
          "id",
          "organizationId",
          "kind",
          "subjectType",
          "subjectId",
          "requesterId",
          "status",
          "createdAt",
          "updatedAt"
        ],
        "properties": {
          "id": {
            "description": "Server-generated request ID.",
            "x-oapi-codegen-extra-tags": {
              "db": "id"
            },
            "x-order": 1,
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "organizationId": {
            "description": "Owning organization ID. Derived from the subject, never client-settable.",
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
          "kind": {
            "type": "string",
            "description": "What a request asks a person to decide. Each kind fixes the subject type and names the permission key that may decide it, in `x-decision-key` (the generated constant name in models/permissions). A kind is added together with its deciding key and its handling in docs/request-contract.md.\n",
            "enum": [
              "content_item_approval"
            ],
            "x-enum-varnames": [
              "RequestKindContentItemApproval"
            ],
            "x-enumDescriptions": {
              "content_item_approval": "A content item, written by a person or an AI app, waits for a person to approve it before it may run. The subject is a `content_item`.\n"
            },
            "x-decision-key": {
              "content_item_approval": "CatalogManagementDecideContentItemApprovals"
            },
            "x-subject-type": {
              "content_item_approval": "content_item"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "kind"
            },
            "x-order": 3
          },
          "subjectType": {
            "type": "string",
            "description": "Type of the subject, the construct name in snake_case, for example `content_item`. Fixed by the kind.",
            "minLength": 1,
            "maxLength": 64,
            "x-oapi-codegen-extra-tags": {
              "db": "subject_type"
            },
            "x-order": 4
          },
          "subjectId": {
            "description": "ID of the subject the request is about.",
            "x-go-name": "SubjectID",
            "x-oapi-codegen-extra-tags": {
              "db": "subject_id"
            },
            "x-order": 5,
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "requesterId": {
            "description": "ID of the user on whose behalf the request was made: the user whose session or AI app made the write that needs a decision. Server-set.\n",
            "x-go-name": "RequesterID",
            "x-oapi-codegen-extra-tags": {
              "db": "requester_id"
            },
            "x-order": 6,
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "createdByClient": {
            "type": "string",
            "description": "OAuth client ID of the AI app that made the write behind the request. Server-set from the access token. Empty or omitted when a person made it.\n",
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "created_by_client",
              "json": "createdByClient,omitempty"
            },
            "x-order": 7
          },
          "status": {
            "type": "string",
            "description": "Lifecycle of a request. `pending` until it is decided. `approved` or `denied` once, by a person with the kind's deciding key. `superseded` when a content edit or a delete changes the subject before a decision: the request is closed with `decidedAt` set, no `decidedBy` and no note, and a fresh pending request opens if the edit leaves the item unapproved, whatever the result. Each of `approved`, `denied` and `superseded` is final.\n",
            "enum": [
              "pending",
              "approved",
              "denied",
              "superseded"
            ],
            "x-enum-varnames": [
              "RequestStatusPending",
              "RequestStatusApproved",
              "RequestStatusDenied",
              "RequestStatusSuperseded"
            ],
            "x-oapi-codegen-extra-tags": {
              "db": "status"
            },
            "x-order": 8
          },
          "decidedBy": {
            "description": "ID of the user who approved or denied the request. Derived from the session; omitted while the request is pending and when it is superseded, since no user decided it.",
            "x-go-name": "DecidedBy",
            "x-oapi-codegen-extra-tags": {
              "db": "decided_by",
              "json": "decidedBy,omitempty"
            },
            "x-order": 9,
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "decidedAt": {
            "type": "string",
            "format": "date-time",
            "description": "Time the request was decided, or superseded by a content edit or a delete (decidedBy and note are then omitted). Null while the request is pending.",
            "nullable": true,
            "x-go-type": "core.NullTime",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "decided_at"
            },
            "x-order": 10
          },
          "note": {
            "type": "string",
            "description": "The note the decider left with the decision. Omitted while the request is pending, when it is superseded, and when the decider left none.",
            "maxLength": 2000,
            "x-oapi-codegen-extra-tags": {
              "db": "note",
              "json": "note,omitempty"
            },
            "x-order": 11
          },
          "createdAt": {
            "description": "Timestamp of request creation.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at"
            },
            "x-order": 12,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp of last request modification.",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at"
            },
            "x-order": 13,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "RequestKind": {
        "type": "string",
        "description": "What a request asks a person to decide. Each kind fixes the subject type and names the permission key that may decide it, in `x-decision-key` (the generated constant name in models/permissions). A kind is added together with its deciding key and its handling in docs/request-contract.md.\n",
        "enum": [
          "content_item_approval"
        ],
        "x-enum-varnames": [
          "RequestKindContentItemApproval"
        ],
        "x-enumDescriptions": {
          "content_item_approval": "A content item, written by a person or an AI app, waits for a person to approve it before it may run. The subject is a `content_item`.\n"
        },
        "x-decision-key": {
          "content_item_approval": "CatalogManagementDecideContentItemApprovals"
        },
        "x-subject-type": {
          "content_item_approval": "content_item"
        }
      },
      "RequestStatus": {
        "type": "string",
        "description": "Lifecycle of a request. `pending` until it is decided. `approved` or `denied` once, by a person with the kind's deciding key. `superseded` when a content edit or a delete changes the subject before a decision: the request is closed with `decidedAt` set, no `decidedBy` and no note, and a fresh pending request opens if the edit leaves the item unapproved, whatever the result. Each of `approved`, `denied` and `superseded` is final.\n",
        "enum": [
          "pending",
          "approved",
          "denied",
          "superseded"
        ],
        "x-enum-varnames": [
          "RequestStatusPending",
          "RequestStatusApproved",
          "RequestStatusDenied",
          "RequestStatusSuperseded"
        ]
      },
      "RequestDecisionPayload": {
        "type": "object",
        "additionalProperties": false,
        "description": "Payload for approving or denying a request. Contains only the decider's note; `status`, `decidedBy` and `decidedAt` are set by the server from the operation and the session.\n",
        "properties": {
          "note": {
            "type": "string",
            "description": "Optional note left with the decision, shown to the requester.",
            "minLength": 1,
            "maxLength": 2000
          }
        }
      },
      "RequestPage": {
        "type": "object",
        "description": "Paginated collection of requests.",
        "required": [
          "page",
          "pageSize",
          "totalCount",
          "requests"
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
          "requests": {
            "type": "array",
            "items": {
              "x-go-type": "Request",
              "$schema": "http://json-schema.org/draft-07/schema#",
              "title": "Request Schema",
              "description": "Server-returned request: one decision that a person with the right to make\nit has been asked to make about a subject, for example whether a content\nitem may run. A request is generic. Its `kind` says\nwhat is being decided and which permission key may decide it, and it names\nits subject by type and ID, so any construct can be the subject of a kind.\nA request is created `pending` by the server when the thing that needs a\ndecision happens (it is not created by a client call), and is decided once:\n`approved` or `denied`, by a user holding the kind's deciding permission\nkey. A content edit or a delete that changes the subject before it is decided closes\nthe request as `superseded`, so an approval always applies to the content\nas of the open request. Closed requests are kept as history. See\ndocs/request-contract.md.\n",
              "type": "object",
              "additionalProperties": false,
              "required": [
                "id",
                "organizationId",
                "kind",
                "subjectType",
                "subjectId",
                "requesterId",
                "status",
                "createdAt",
                "updatedAt"
              ],
              "properties": {
                "id": {
                  "description": "Server-generated request ID.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "id"
                  },
                  "x-order": 1,
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "organizationId": {
                  "description": "Owning organization ID. Derived from the subject, never client-settable.",
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
                "kind": {
                  "type": "string",
                  "description": "What a request asks a person to decide. Each kind fixes the subject type and names the permission key that may decide it, in `x-decision-key` (the generated constant name in models/permissions). A kind is added together with its deciding key and its handling in docs/request-contract.md.\n",
                  "enum": [
                    "content_item_approval"
                  ],
                  "x-enum-varnames": [
                    "RequestKindContentItemApproval"
                  ],
                  "x-enumDescriptions": {
                    "content_item_approval": "A content item, written by a person or an AI app, waits for a person to approve it before it may run. The subject is a `content_item`.\n"
                  },
                  "x-decision-key": {
                    "content_item_approval": "CatalogManagementDecideContentItemApprovals"
                  },
                  "x-subject-type": {
                    "content_item_approval": "content_item"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "kind"
                  },
                  "x-order": 3
                },
                "subjectType": {
                  "type": "string",
                  "description": "Type of the subject, the construct name in snake_case, for example `content_item`. Fixed by the kind.",
                  "minLength": 1,
                  "maxLength": 64,
                  "x-oapi-codegen-extra-tags": {
                    "db": "subject_type"
                  },
                  "x-order": 4
                },
                "subjectId": {
                  "description": "ID of the subject the request is about.",
                  "x-go-name": "SubjectID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "subject_id"
                  },
                  "x-order": 5,
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "requesterId": {
                  "description": "ID of the user on whose behalf the request was made: the user whose session or AI app made the write that needs a decision. Server-set.\n",
                  "x-go-name": "RequesterID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "requester_id"
                  },
                  "x-order": 6,
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "createdByClient": {
                  "type": "string",
                  "description": "OAuth client ID of the AI app that made the write behind the request. Server-set from the access token. Empty or omitted when a person made it.\n",
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_by_client",
                    "json": "createdByClient,omitempty"
                  },
                  "x-order": 7
                },
                "status": {
                  "type": "string",
                  "description": "Lifecycle of a request. `pending` until it is decided. `approved` or `denied` once, by a person with the kind's deciding key. `superseded` when a content edit or a delete changes the subject before a decision: the request is closed with `decidedAt` set, no `decidedBy` and no note, and a fresh pending request opens if the edit leaves the item unapproved, whatever the result. Each of `approved`, `denied` and `superseded` is final.\n",
                  "enum": [
                    "pending",
                    "approved",
                    "denied",
                    "superseded"
                  ],
                  "x-enum-varnames": [
                    "RequestStatusPending",
                    "RequestStatusApproved",
                    "RequestStatusDenied",
                    "RequestStatusSuperseded"
                  ],
                  "x-oapi-codegen-extra-tags": {
                    "db": "status"
                  },
                  "x-order": 8
                },
                "decidedBy": {
                  "description": "ID of the user who approved or denied the request. Derived from the session; omitted while the request is pending and when it is superseded, since no user decided it.",
                  "x-go-name": "DecidedBy",
                  "x-oapi-codegen-extra-tags": {
                    "db": "decided_by",
                    "json": "decidedBy,omitempty"
                  },
                  "x-order": 9,
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "decidedAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Time the request was decided, or superseded by a content edit or a delete (decidedBy and note are then omitted). Null while the request is pending.",
                  "nullable": true,
                  "x-go-type": "core.NullTime",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "decided_at"
                  },
                  "x-order": 10
                },
                "note": {
                  "type": "string",
                  "description": "The note the decider left with the decision. Omitted while the request is pending, when it is superseded, and when the decider left none.",
                  "maxLength": 2000,
                  "x-oapi-codegen-extra-tags": {
                    "db": "note",
                    "json": "note,omitempty"
                  },
                  "x-order": 11
                },
                "createdAt": {
                  "description": "Timestamp of request creation.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at"
                  },
                  "x-order": 12,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updatedAt": {
                  "description": "Timestamp of last request modification.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at"
                  },
                  "x-order": 13,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                }
              }
            },
            "description": "Requests included on this page of results."
          }
        }
      }
    }
  }
};

export default RequestSchema;
