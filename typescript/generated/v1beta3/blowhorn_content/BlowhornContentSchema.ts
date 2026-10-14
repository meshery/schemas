/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const BlowhornContentSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "BlowhornContent",
    "description": "OpenAPI schema for Blowhorn content rows - fingerprinted content\nvalues keyed by owning profile and row number, with conditional\nupdates.\n",
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
      "name": "blowhornContent",
      "description": "Operations related to Blowhorn content."
    }
  ],
  "paths": {
    "/api/blowhorn/content": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "blowhornContent"
        ],
        "summary": "List Blowhorn content",
        "operationId": "listBlowhornContent",
        "description": "Returns a paginated list of Blowhorn content rows in the organization of the authenticated session.",
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
            "description": "Filter by owning profile subject.",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Blowhorn content page",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated collection of Blowhorn content rows.",
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
                    "blowhornContent": {
                      "type": "array",
                      "items": {
                        "x-go-type": "BlowhornContent",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "title": "Blowhorn Content Schema",
                        "description": "Server-returned Blowhorn content row as persisted by meshery-cloud.\nContent rows carry a row number and a server-computed fingerprint over\ntheir canonical values; updates are conditional on the fingerprint the\nwriter read, so stale writes are refused rather than silently applied.\n",
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
                            "description": "Server-generated Blowhorn content ID.",
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
                            "description": "Subject of the owning Blowhorn profile.",
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
                            "description": "Timestamp of Blowhorn content creation.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at"
                            },
                            "x-order": 7,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp of last Blowhorn content modification.",
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
                            "description": "Timestamp when the Blowhorn content was soft-deleted.",
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
                      "description": "Blowhorn content rows included on this page of results."
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
          "blowhornContent"
        ],
        "summary": "Insert Blowhorn content",
        "operationId": "insertBlowhornContent",
        "description": "Inserts a new Blowhorn content row. Insert-only: any supplied\n`id` and `expectedFingerprint` are ignored; existing rows change\nonly through the conditional `updateBlowhornContent`. The\n`fingerprint` is server-computed.\n",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for inserting or updating a Blowhorn content row.\nContains only client-settable fields; the owning\n`organizationId` (derived from the authenticated session), the\nserver-computed `fingerprint` and the server-generated\n`createdAt` / `updatedAt` timestamps are intentionally excluded.\n",
                "required": [
                  "profile",
                  "rowNumber"
                ],
                "properties": {
                  "id": {
                    "description": "Existing Blowhorn content ID for updates; ignored on insert.",
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
                    "description": "Subject of the owning Blowhorn profile.",
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
            "description": "Blowhorn content created",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Blowhorn Content Schema",
                  "description": "Server-returned Blowhorn content row as persisted by meshery-cloud.\nContent rows carry a row number and a server-computed fingerprint over\ntheir canonical values; updates are conditional on the fingerprint the\nwriter read, so stale writes are refused rather than silently applied.\n",
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
                      "description": "Server-generated Blowhorn content ID.",
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
                      "description": "Subject of the owning Blowhorn profile.",
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
                      "description": "Timestamp of Blowhorn content creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 7,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last Blowhorn content modification.",
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
                      "description": "Timestamp when the Blowhorn content was soft-deleted.",
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
    "/api/blowhorn/content/{blowhornContentId}": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "blowhornContent"
        ],
        "summary": "Get Blowhorn content by ID",
        "operationId": "getBlowhornContent",
        "parameters": [
          {
            "name": "blowhornContentId",
            "in": "path",
            "description": "Blowhorn content ID",
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
            "description": "Blowhorn content response",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Blowhorn Content Schema",
                  "description": "Server-returned Blowhorn content row as persisted by meshery-cloud.\nContent rows carry a row number and a server-computed fingerprint over\ntheir canonical values; updates are conditional on the fingerprint the\nwriter read, so stale writes are refused rather than silently applied.\n",
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
                      "description": "Server-generated Blowhorn content ID.",
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
                      "description": "Subject of the owning Blowhorn profile.",
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
                      "description": "Timestamp of Blowhorn content creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 7,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last Blowhorn content modification.",
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
                      "description": "Timestamp when the Blowhorn content was soft-deleted.",
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
          "blowhornContent"
        ],
        "summary": "Update Blowhorn content",
        "operationId": "updateBlowhornContent",
        "description": "Conditionally updates the Blowhorn content row. When\n`expectedFingerprint` is supplied and stale, the update is\nrefused with a 409.\n",
        "parameters": [
          {
            "name": "blowhornContentId",
            "in": "path",
            "description": "Blowhorn content ID",
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
                "description": "Payload for inserting or updating a Blowhorn content row.\nContains only client-settable fields; the owning\n`organizationId` (derived from the authenticated session), the\nserver-computed `fingerprint` and the server-generated\n`createdAt` / `updatedAt` timestamps are intentionally excluded.\n",
                "required": [
                  "profile",
                  "rowNumber"
                ],
                "properties": {
                  "id": {
                    "description": "Existing Blowhorn content ID for updates; ignored on insert.",
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
                    "description": "Subject of the owning Blowhorn profile.",
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
            "description": "Blowhorn content updated",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Blowhorn Content Schema",
                  "description": "Server-returned Blowhorn content row as persisted by meshery-cloud.\nContent rows carry a row number and a server-computed fingerprint over\ntheir canonical values; updates are conditional on the fingerprint the\nwriter read, so stale writes are refused rather than silently applied.\n",
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
                      "description": "Server-generated Blowhorn content ID.",
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
                      "description": "Subject of the owning Blowhorn profile.",
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
                      "description": "Timestamp of Blowhorn content creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 7,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last Blowhorn content modification.",
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
                      "description": "Timestamp when the Blowhorn content was soft-deleted.",
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
            "description": "Conflict - the stale expectedFingerprint precondition no longer matches the stored content fingerprint",
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
          "blowhornContent"
        ],
        "summary": "Delete Blowhorn content",
        "operationId": "deleteBlowhornContent",
        "description": "Soft-deletes the Blowhorn content row.",
        "parameters": [
          {
            "name": "blowhornContentId",
            "in": "path",
            "description": "Blowhorn content ID",
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
            "description": "Blowhorn content deleted"
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
        "description": "Conflict - the stale expectedFingerprint precondition no longer matches the stored content fingerprint",
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
      "blowhornContentId": {
        "name": "blowhornContentId",
        "in": "path",
        "description": "Blowhorn content ID",
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
      "BlowhornContent": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Blowhorn Content Schema",
        "description": "Server-returned Blowhorn content row as persisted by meshery-cloud.\nContent rows carry a row number and a server-computed fingerprint over\ntheir canonical values; updates are conditional on the fingerprint the\nwriter read, so stale writes are refused rather than silently applied.\n",
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
            "description": "Server-generated Blowhorn content ID.",
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
            "description": "Subject of the owning Blowhorn profile.",
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
            "description": "Timestamp of Blowhorn content creation.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at"
            },
            "x-order": 7,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp of last Blowhorn content modification.",
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
            "description": "Timestamp when the Blowhorn content was soft-deleted.",
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
      "BlowhornContentPayload": {
        "type": "object",
        "description": "Payload for inserting or updating a Blowhorn content row.\nContains only client-settable fields; the owning\n`organizationId` (derived from the authenticated session), the\nserver-computed `fingerprint` and the server-generated\n`createdAt` / `updatedAt` timestamps are intentionally excluded.\n",
        "required": [
          "profile",
          "rowNumber"
        ],
        "properties": {
          "id": {
            "description": "Existing Blowhorn content ID for updates; ignored on insert.",
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
            "description": "Subject of the owning Blowhorn profile.",
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
      "BlowhornContentPage": {
        "type": "object",
        "description": "Paginated collection of Blowhorn content rows.",
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
          "blowhornContent": {
            "type": "array",
            "items": {
              "x-go-type": "BlowhornContent",
              "$schema": "http://json-schema.org/draft-07/schema#",
              "title": "Blowhorn Content Schema",
              "description": "Server-returned Blowhorn content row as persisted by meshery-cloud.\nContent rows carry a row number and a server-computed fingerprint over\ntheir canonical values; updates are conditional on the fingerprint the\nwriter read, so stale writes are refused rather than silently applied.\n",
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
                  "description": "Server-generated Blowhorn content ID.",
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
                  "description": "Subject of the owning Blowhorn profile.",
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
                  "description": "Timestamp of Blowhorn content creation.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at"
                  },
                  "x-order": 7,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updatedAt": {
                  "description": "Timestamp of last Blowhorn content modification.",
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
                  "description": "Timestamp when the Blowhorn content was soft-deleted.",
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
            "description": "Blowhorn content rows included on this page of results."
          }
        }
      }
    }
  }
};

export default BlowhornContentSchema;
