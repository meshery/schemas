/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const ContentPieceSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "ContentPiece",
    "description": "OpenAPI schema for content pieces - fingerprinted content\nvalues keyed by owning profile and row number, with conditional\nupdates.\nOrganization scope: every operation acts only in the organization the\nsession resolved to (X-Current-Orgid, then the user's selected\norganization), and only when the caller is a live member of it.\nAuthorization: each operation requires one permission key in that\norganization (Catalog Management / Content Pieces: View Content\nPieces for the reads, Create Content Piece, Edit Content Piece and\nDelete Content Piece for the writes); a caller without it receives a\n403 before any row is read. Past that check, an id that does not name\na live content piece of the organization, and a caller who is not a\nlive member of it, receive the same 404, so the existence of another\norganization's rows is never disclosed.\n",
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
      "name": "contentPieces",
      "description": "Operations related to content pieces."
    }
  ],
  "paths": {
    "/api/content/pieces": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "contentPieces"
        ],
        "summary": "List content pieces",
        "operationId": "listContentPieces",
        "description": "Returns a paginated list of the live content pieces in the\norganization of the authenticated session, ordered by `rowNumber`\nunless `order` names another column (`rowNumber`, `createdAt`,\n`updatedAt`). `search` matches the profile or the content values,\ncase-insensitively.\n",
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
          }
        ],
        "responses": {
          "200": {
            "description": "Content piece page",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated collection of content pieces.",
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
                    "contentPieces": {
                      "type": "array",
                      "items": {
                        "x-go-type": "ContentPiece",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "title": "Content Piece Schema",
                        "description": "Server-returned content piece as persisted by meshery-cloud.\nContent pieces carry a row number and a server-computed fingerprint over\ntheir canonical values; updates are conditional on the fingerprint the\nwriter read, so stale writes are refused rather than silently applied.\n",
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
                            "description": "Server-generated content piece ID.",
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
                            "description": "Row number of the content within the owning profile.",
                            "minimum": 0,
                            "x-oapi-codegen-extra-tags": {
                              "db": "row_number"
                            },
                            "x-order": 4
                          },
                          "fingerprint": {
                            "type": "string",
                            "description": "Hex digest over the canonical content values, typed so null, empty string, zero and false differ. Server-computed; used for conditional updates.",
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
                            "description": "Timestamp of content piece creation.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at"
                            },
                            "x-order": 7,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp of last content piece modification.",
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
                            "description": "Timestamp when the content piece was soft-deleted.",
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
                          }
                        }
                      },
                      "description": "Content pieces included on this page of results."
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
          "contentPieces"
        ],
        "summary": "Insert a content piece",
        "operationId": "insertContentPiece",
        "description": "Inserts a new content piece. Insert-only: any supplied\n`id` and `expectedFingerprint` are ignored; existing rows change\nonly through the conditional `updateContentPiece`. The\n`fingerprint` is server-computed. A live content piece of the\norganization that already holds the same `profile` and\n`rowNumber` refuses the insert with a 409.\n",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for inserting or updating a content piece.\nContains only client-settable fields; the owning\n`organizationId` (derived from the authenticated session), the\nserver-computed `fingerprint` and the server-generated\n`createdAt` / `updatedAt` timestamps are intentionally excluded.\n",
                "required": [
                  "profile",
                  "rowNumber"
                ],
                "properties": {
                  "id": {
                    "description": "Existing content piece ID for updates; ignored on insert.",
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
                  "profile": {
                    "type": "string",
                    "description": "Subject of the owning profile.",
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "rowNumber": {
                    "type": "integer",
                    "description": "Row number of the content within the owning profile.",
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
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Content piece created",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Content Piece Schema",
                  "description": "Server-returned content piece as persisted by meshery-cloud.\nContent pieces carry a row number and a server-computed fingerprint over\ntheir canonical values; updates are conditional on the fingerprint the\nwriter read, so stale writes are refused rather than silently applied.\n",
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
                      "description": "Server-generated content piece ID.",
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
                      "description": "Row number of the content within the owning profile.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "row_number"
                      },
                      "x-order": 4
                    },
                    "fingerprint": {
                      "type": "string",
                      "description": "Hex digest over the canonical content values, typed so null, empty string, zero and false differ. Server-computed; used for conditional updates.",
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
                      "description": "Timestamp of content piece creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 7,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last content piece modification.",
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
                      "description": "Timestamp when the content piece was soft-deleted.",
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
            "description": "Conflict - the stale expectedFingerprint precondition no longer matches the stored content fingerprint, or another live content piece of the organization already holds the same profile and rowNumber",
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
    "/api/content/pieces/{contentPieceId}": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "contentPieces"
        ],
        "summary": "Get a content piece by ID",
        "operationId": "getContentPiece",
        "parameters": [
          {
            "name": "contentPieceId",
            "in": "path",
            "description": "Content piece ID",
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
            "description": "Content piece response",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Content Piece Schema",
                  "description": "Server-returned content piece as persisted by meshery-cloud.\nContent pieces carry a row number and a server-computed fingerprint over\ntheir canonical values; updates are conditional on the fingerprint the\nwriter read, so stale writes are refused rather than silently applied.\n",
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
                      "description": "Server-generated content piece ID.",
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
                      "description": "Row number of the content within the owning profile.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "row_number"
                      },
                      "x-order": 4
                    },
                    "fingerprint": {
                      "type": "string",
                      "description": "Hex digest over the canonical content values, typed so null, empty string, zero and false differ. Server-computed; used for conditional updates.",
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
                      "description": "Timestamp of content piece creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 7,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last content piece modification.",
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
                      "description": "Timestamp when the content piece was soft-deleted.",
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
      },
      "put": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "contentPieces"
        ],
        "summary": "Update a content piece",
        "operationId": "updateContentPiece",
        "description": "Conditionally updates the content piece. When\n`expectedFingerprint` is supplied and stale, the update is\nrefused with a 409, as is an update that would move the piece\nonto a `profile` and `rowNumber` another live content piece of\nthe organization holds.\n",
        "parameters": [
          {
            "name": "contentPieceId",
            "in": "path",
            "description": "Content piece ID",
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
                "description": "Payload for inserting or updating a content piece.\nContains only client-settable fields; the owning\n`organizationId` (derived from the authenticated session), the\nserver-computed `fingerprint` and the server-generated\n`createdAt` / `updatedAt` timestamps are intentionally excluded.\n",
                "required": [
                  "profile",
                  "rowNumber"
                ],
                "properties": {
                  "id": {
                    "description": "Existing content piece ID for updates; ignored on insert.",
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
                  "profile": {
                    "type": "string",
                    "description": "Subject of the owning profile.",
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "rowNumber": {
                    "type": "integer",
                    "description": "Row number of the content within the owning profile.",
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
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Content piece updated",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Content Piece Schema",
                  "description": "Server-returned content piece as persisted by meshery-cloud.\nContent pieces carry a row number and a server-computed fingerprint over\ntheir canonical values; updates are conditional on the fingerprint the\nwriter read, so stale writes are refused rather than silently applied.\n",
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
                      "description": "Server-generated content piece ID.",
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
                      "description": "Row number of the content within the owning profile.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "db": "row_number"
                      },
                      "x-order": 4
                    },
                    "fingerprint": {
                      "type": "string",
                      "description": "Hex digest over the canonical content values, typed so null, empty string, zero and false differ. Server-computed; used for conditional updates.",
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
                      "description": "Timestamp of content piece creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 7,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last content piece modification.",
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
                      "description": "Timestamp when the content piece was soft-deleted.",
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
            "description": "Conflict - the stale expectedFingerprint precondition no longer matches the stored content fingerprint, or another live content piece of the organization already holds the same profile and rowNumber",
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
          "contentPieces"
        ],
        "summary": "Delete a content piece",
        "operationId": "deleteContentPiece",
        "description": "Soft-deletes the content piece.",
        "parameters": [
          {
            "name": "contentPieceId",
            "in": "path",
            "description": "Content piece ID",
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
            "description": "Content piece deleted"
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
        "description": "Conflict - the stale expectedFingerprint precondition no longer matches the stored content fingerprint, or another live content piece of the organization already holds the same profile and rowNumber",
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
      "contentPieceId": {
        "name": "contentPieceId",
        "in": "path",
        "description": "Content piece ID",
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
      "ContentPiece": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Content Piece Schema",
        "description": "Server-returned content piece as persisted by meshery-cloud.\nContent pieces carry a row number and a server-computed fingerprint over\ntheir canonical values; updates are conditional on the fingerprint the\nwriter read, so stale writes are refused rather than silently applied.\n",
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
            "description": "Server-generated content piece ID.",
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
            "description": "Row number of the content within the owning profile.",
            "minimum": 0,
            "x-oapi-codegen-extra-tags": {
              "db": "row_number"
            },
            "x-order": 4
          },
          "fingerprint": {
            "type": "string",
            "description": "Hex digest over the canonical content values, typed so null, empty string, zero and false differ. Server-computed; used for conditional updates.",
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
            "description": "Timestamp of content piece creation.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at"
            },
            "x-order": 7,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp of last content piece modification.",
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
            "description": "Timestamp when the content piece was soft-deleted.",
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
          }
        }
      },
      "ContentPiecePayload": {
        "type": "object",
        "description": "Payload for inserting or updating a content piece.\nContains only client-settable fields; the owning\n`organizationId` (derived from the authenticated session), the\nserver-computed `fingerprint` and the server-generated\n`createdAt` / `updatedAt` timestamps are intentionally excluded.\n",
        "required": [
          "profile",
          "rowNumber"
        ],
        "properties": {
          "id": {
            "description": "Existing content piece ID for updates; ignored on insert.",
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
          "profile": {
            "type": "string",
            "description": "Subject of the owning profile.",
            "minLength": 1,
            "maxLength": 255
          },
          "rowNumber": {
            "type": "integer",
            "description": "Row number of the content within the owning profile.",
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
          }
        }
      },
      "ContentPiecePage": {
        "type": "object",
        "description": "Paginated collection of content pieces.",
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
          "contentPieces": {
            "type": "array",
            "items": {
              "x-go-type": "ContentPiece",
              "$schema": "http://json-schema.org/draft-07/schema#",
              "title": "Content Piece Schema",
              "description": "Server-returned content piece as persisted by meshery-cloud.\nContent pieces carry a row number and a server-computed fingerprint over\ntheir canonical values; updates are conditional on the fingerprint the\nwriter read, so stale writes are refused rather than silently applied.\n",
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
                  "description": "Server-generated content piece ID.",
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
                  "description": "Row number of the content within the owning profile.",
                  "minimum": 0,
                  "x-oapi-codegen-extra-tags": {
                    "db": "row_number"
                  },
                  "x-order": 4
                },
                "fingerprint": {
                  "type": "string",
                  "description": "Hex digest over the canonical content values, typed so null, empty string, zero and false differ. Server-computed; used for conditional updates.",
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
                  "description": "Timestamp of content piece creation.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at"
                  },
                  "x-order": 7,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updatedAt": {
                  "description": "Timestamp of last content piece modification.",
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
                  "description": "Timestamp when the content piece was soft-deleted.",
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
                }
              }
            },
            "description": "Content pieces included on this page of results."
          }
        }
      }
    }
  }
};

export default ContentPieceSchema;
