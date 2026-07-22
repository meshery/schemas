/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const PatternResourceSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "PatternResource",
    "description": "OpenAPI schema for Meshery pattern resources — the\nKubernetes-addressable identities (name, namespace, type, OAM type)\nof resources provisioned from designs. Persisted by meshery-cloud in\nthe `meshery_pattern_resources` table and consumed by the meshery\nserver's design engine through the remote provider.\n\nThese endpoints previously lived (schema-less) in the design\nconstruct's api.yml; they are owned by this construct now so the\nentity, page envelope, and payload are defined alongside the\noperations that serve them, mirroring the filter construct's layout.\n",
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
      "name": "patternResources",
      "description": "Operations related to Meshery pattern resources."
    }
  ],
  "paths": {
    "/api/content/patterns/resource": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "patternResources"
        ],
        "summary": "Get pattern resources",
        "operationId": "getPatternResources",
        "description": "Returns a paginated list of pattern resources owned by the\nauthenticated user, optionally filtered by resource identity\nfields and organization or workspace scope.\n",
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
            "description": "Number of items per page. Deprecated alias of pageSize kept for\nthe meshery server's remote provider, which still sends the\nlowercase form; canonical `pageSize` wins when both are present.\n",
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
            "name": "name",
            "in": "query",
            "required": false,
            "description": "Filter by resource name.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "namespace",
            "in": "query",
            "required": false,
            "description": "Filter by Kubernetes namespace.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "type",
            "in": "query",
            "required": false,
            "description": "Filter by resource type discriminator.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "oamType",
            "in": "query",
            "required": false,
            "description": "Filter by OAM categorization (e.g. workload, trait, scope).",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "orgId",
            "in": "query",
            "required": false,
            "description": "Scope results to an organization.",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "name": "workspaceId",
            "in": "query",
            "required": false,
            "description": "Scope results to a workspace.",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Pattern resources page",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated collection of pattern resources.",
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
                    "resources": {
                      "type": "array",
                      "items": {
                        "x-go-type": "MesheryPatternResource",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "title": "Pattern Resource Schema",
                        "description": "Server-returned Meshery pattern resource as persisted by meshery-cloud\n(`meshery_pattern_resources` table). A pattern resource records the\nKubernetes-addressable identity (name, namespace, type, OAM type) of a\nresource provisioned from a design, and is used by the design engine to\ndeduplicate provisioned resources. This v1beta3 shape supersedes the\nlegacy v1alpha2 snake_case wire form and corrects its `Namepace` typo\nto `namespace`.\n",
                        "type": "object",
                        "additionalProperties": false,
                        "required": [
                          "id",
                          "userId",
                          "name",
                          "namespace",
                          "type",
                          "oamType",
                          "deleted",
                          "createdAt",
                          "updatedAt"
                        ],
                        "properties": {
                          "id": {
                            "description": "Server-generated pattern resource ID.",
                            "x-order": 1,
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "userId": {
                            "description": "Owning user ID. Persisted in the `owner` column of the\n`meshery_pattern_resources` table (confirmed against the\nproduction schema dump); the wire identifier stays camelCase\n`userId` per the identifier-naming contract.\n",
                            "x-go-name": "UserID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "owner"
                            },
                            "x-order": 2,
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "name": {
                            "type": "string",
                            "description": "Name of the provisioned resource.",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-order": 3
                          },
                          "namespace": {
                            "type": "string",
                            "description": "Kubernetes namespace the resource was provisioned into. Corrects\nthe legacy v1alpha2 `Namepace` typo.\n",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-order": 4
                          },
                          "type": {
                            "type": "string",
                            "description": "Resource type discriminator (e.g. the Kubernetes kind).",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-order": 5
                          },
                          "oamType": {
                            "type": "string",
                            "description": "OAM (Open Application Model) categorization of the resource,\nstored in the `oam_type` column (e.g. `workload`, `trait`,\n`scope`).\n",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-go-name": "OAMType",
                            "x-oapi-codegen-extra-tags": {
                              "db": "oam_type"
                            },
                            "x-order": 6
                          },
                          "deleted": {
                            "type": "boolean",
                            "description": "Soft-delete marker. Server-managed; rows are flagged rather than\nremoved so the design engine can reconcile prior provisions.\n",
                            "default": false,
                            "x-order": 7
                          },
                          "createdAt": {
                            "description": "Timestamp of pattern resource creation.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at"
                            },
                            "x-order": 8,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp of last pattern resource modification.",
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
                      "description": "Pattern resources included on this page of results."
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
          "patternResources"
        ],
        "summary": "Save pattern resource",
        "operationId": "upsertPatternResource",
        "description": "Creates a new pattern resource when no `id` is supplied, or\nupdates the entry matching the provided `id`. Ownership is\nderived from the authenticated session; any client-supplied\nowner is ignored.\n",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for creating or updating a pattern resource via\n`POST /api/content/patterns/resource`. Contains only\nclient-settable fields; the owning `userId` (derived from the\nauthenticated session), the `deleted` marker, and the\nserver-generated `createdAt` / `updatedAt` timestamps are\nintentionally excluded.\n",
                "required": [
                  "name",
                  "namespace",
                  "type",
                  "oamType"
                ],
                "properties": {
                  "id": {
                    "description": "Existing pattern resource ID for updates; omit on create.",
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
                  "name": {
                    "type": "string",
                    "description": "Name of the provisioned resource.",
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "namespace": {
                    "type": "string",
                    "description": "Kubernetes namespace the resource was provisioned into.",
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "type": {
                    "type": "string",
                    "description": "Resource type discriminator (e.g. the Kubernetes kind).",
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "oamType": {
                    "type": "string",
                    "description": "OAM categorization of the resource (e.g. workload, trait, scope).",
                    "minLength": 1,
                    "maxLength": 255,
                    "x-go-name": "OAMType"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Pattern resource saved",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Pattern Resource Schema",
                  "description": "Server-returned Meshery pattern resource as persisted by meshery-cloud\n(`meshery_pattern_resources` table). A pattern resource records the\nKubernetes-addressable identity (name, namespace, type, OAM type) of a\nresource provisioned from a design, and is used by the design engine to\ndeduplicate provisioned resources. This v1beta3 shape supersedes the\nlegacy v1alpha2 snake_case wire form and corrects its `Namepace` typo\nto `namespace`.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "userId",
                    "name",
                    "namespace",
                    "type",
                    "oamType",
                    "deleted",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Server-generated pattern resource ID.",
                      "x-order": 1,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "userId": {
                      "description": "Owning user ID. Persisted in the `owner` column of the\n`meshery_pattern_resources` table (confirmed against the\nproduction schema dump); the wire identifier stays camelCase\n`userId` per the identifier-naming contract.\n",
                      "x-go-name": "UserID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner"
                      },
                      "x-order": 2,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "name": {
                      "type": "string",
                      "description": "Name of the provisioned resource.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-order": 3
                    },
                    "namespace": {
                      "type": "string",
                      "description": "Kubernetes namespace the resource was provisioned into. Corrects\nthe legacy v1alpha2 `Namepace` typo.\n",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-order": 4
                    },
                    "type": {
                      "type": "string",
                      "description": "Resource type discriminator (e.g. the Kubernetes kind).",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-order": 5
                    },
                    "oamType": {
                      "type": "string",
                      "description": "OAM (Open Application Model) categorization of the resource,\nstored in the `oam_type` column (e.g. `workload`, `trait`,\n`scope`).\n",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-go-name": "OAMType",
                      "x-oapi-codegen-extra-tags": {
                        "db": "oam_type"
                      },
                      "x-order": 6
                    },
                    "deleted": {
                      "type": "boolean",
                      "description": "Soft-delete marker. Server-managed; rows are flagged rather than\nremoved so the design engine can reconcile prior provisions.\n",
                      "default": false,
                      "x-order": 7
                    },
                    "createdAt": {
                      "description": "Timestamp of pattern resource creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 8,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last pattern resource modification.",
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
    "/api/content/patterns/resource/{patternResourceId}": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "patternResources"
        ],
        "summary": "Get pattern resource by ID",
        "operationId": "getPatternResource",
        "parameters": [
          {
            "name": "patternResourceId",
            "in": "path",
            "description": "Pattern resource ID",
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
            "description": "Pattern resource response",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Pattern Resource Schema",
                  "description": "Server-returned Meshery pattern resource as persisted by meshery-cloud\n(`meshery_pattern_resources` table). A pattern resource records the\nKubernetes-addressable identity (name, namespace, type, OAM type) of a\nresource provisioned from a design, and is used by the design engine to\ndeduplicate provisioned resources. This v1beta3 shape supersedes the\nlegacy v1alpha2 snake_case wire form and corrects its `Namepace` typo\nto `namespace`.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "userId",
                    "name",
                    "namespace",
                    "type",
                    "oamType",
                    "deleted",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Server-generated pattern resource ID.",
                      "x-order": 1,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "userId": {
                      "description": "Owning user ID. Persisted in the `owner` column of the\n`meshery_pattern_resources` table (confirmed against the\nproduction schema dump); the wire identifier stays camelCase\n`userId` per the identifier-naming contract.\n",
                      "x-go-name": "UserID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner"
                      },
                      "x-order": 2,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "name": {
                      "type": "string",
                      "description": "Name of the provisioned resource.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-order": 3
                    },
                    "namespace": {
                      "type": "string",
                      "description": "Kubernetes namespace the resource was provisioned into. Corrects\nthe legacy v1alpha2 `Namepace` typo.\n",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-order": 4
                    },
                    "type": {
                      "type": "string",
                      "description": "Resource type discriminator (e.g. the Kubernetes kind).",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-order": 5
                    },
                    "oamType": {
                      "type": "string",
                      "description": "OAM (Open Application Model) categorization of the resource,\nstored in the `oam_type` column (e.g. `workload`, `trait`,\n`scope`).\n",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-go-name": "OAMType",
                      "x-oapi-codegen-extra-tags": {
                        "db": "oam_type"
                      },
                      "x-order": 6
                    },
                    "deleted": {
                      "type": "boolean",
                      "description": "Soft-delete marker. Server-managed; rows are flagged rather than\nremoved so the design engine can reconcile prior provisions.\n",
                      "default": false,
                      "x-order": 7
                    },
                    "createdAt": {
                      "description": "Timestamp of pattern resource creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 8,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last pattern resource modification.",
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
          "patternResources"
        ],
        "summary": "Delete pattern resource",
        "operationId": "deletePatternResource",
        "description": "Soft-deletes the pattern resource and returns the deleted\nentity. The live meshery-cloud handler responds 200 with the\ndeleted resource body (not 204), so the deleted record's\nidentity remains available to the caller.\n",
        "parameters": [
          {
            "name": "patternResourceId",
            "in": "path",
            "description": "Pattern resource ID",
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
            "description": "Deleted pattern resource",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Pattern Resource Schema",
                  "description": "Server-returned Meshery pattern resource as persisted by meshery-cloud\n(`meshery_pattern_resources` table). A pattern resource records the\nKubernetes-addressable identity (name, namespace, type, OAM type) of a\nresource provisioned from a design, and is used by the design engine to\ndeduplicate provisioned resources. This v1beta3 shape supersedes the\nlegacy v1alpha2 snake_case wire form and corrects its `Namepace` typo\nto `namespace`.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "userId",
                    "name",
                    "namespace",
                    "type",
                    "oamType",
                    "deleted",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Server-generated pattern resource ID.",
                      "x-order": 1,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "userId": {
                      "description": "Owning user ID. Persisted in the `owner` column of the\n`meshery_pattern_resources` table (confirmed against the\nproduction schema dump); the wire identifier stays camelCase\n`userId` per the identifier-naming contract.\n",
                      "x-go-name": "UserID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner"
                      },
                      "x-order": 2,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "name": {
                      "type": "string",
                      "description": "Name of the provisioned resource.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-order": 3
                    },
                    "namespace": {
                      "type": "string",
                      "description": "Kubernetes namespace the resource was provisioned into. Corrects\nthe legacy v1alpha2 `Namepace` typo.\n",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-order": 4
                    },
                    "type": {
                      "type": "string",
                      "description": "Resource type discriminator (e.g. the Kubernetes kind).",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-order": 5
                    },
                    "oamType": {
                      "type": "string",
                      "description": "OAM (Open Application Model) categorization of the resource,\nstored in the `oam_type` column (e.g. `workload`, `trait`,\n`scope`).\n",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-go-name": "OAMType",
                      "x-oapi-codegen-extra-tags": {
                        "db": "oam_type"
                      },
                      "x-order": 6
                    },
                    "deleted": {
                      "type": "boolean",
                      "description": "Soft-delete marker. Server-managed; rows are flagged rather than\nremoved so the design engine can reconcile prior provisions.\n",
                      "default": false,
                      "x-order": 7
                    },
                    "createdAt": {
                      "description": "Timestamp of pattern resource creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 8,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last pattern resource modification.",
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
      "patternResourceId": {
        "name": "patternResourceId",
        "in": "path",
        "description": "Pattern resource ID",
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
        "description": "Number of items per page. Deprecated alias of pageSize kept for\nthe meshery server's remote provider, which still sends the\nlowercase form; canonical `pageSize` wins when both are present.\n",
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
      "MesheryPatternResource": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Pattern Resource Schema",
        "description": "Server-returned Meshery pattern resource as persisted by meshery-cloud\n(`meshery_pattern_resources` table). A pattern resource records the\nKubernetes-addressable identity (name, namespace, type, OAM type) of a\nresource provisioned from a design, and is used by the design engine to\ndeduplicate provisioned resources. This v1beta3 shape supersedes the\nlegacy v1alpha2 snake_case wire form and corrects its `Namepace` typo\nto `namespace`.\n",
        "type": "object",
        "additionalProperties": false,
        "required": [
          "id",
          "userId",
          "name",
          "namespace",
          "type",
          "oamType",
          "deleted",
          "createdAt",
          "updatedAt"
        ],
        "properties": {
          "id": {
            "description": "Server-generated pattern resource ID.",
            "x-order": 1,
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "userId": {
            "description": "Owning user ID. Persisted in the `owner` column of the\n`meshery_pattern_resources` table (confirmed against the\nproduction schema dump); the wire identifier stays camelCase\n`userId` per the identifier-naming contract.\n",
            "x-go-name": "UserID",
            "x-oapi-codegen-extra-tags": {
              "db": "owner"
            },
            "x-order": 2,
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "name": {
            "type": "string",
            "description": "Name of the provisioned resource.",
            "minLength": 1,
            "maxLength": 255,
            "x-order": 3
          },
          "namespace": {
            "type": "string",
            "description": "Kubernetes namespace the resource was provisioned into. Corrects\nthe legacy v1alpha2 `Namepace` typo.\n",
            "minLength": 1,
            "maxLength": 255,
            "x-order": 4
          },
          "type": {
            "type": "string",
            "description": "Resource type discriminator (e.g. the Kubernetes kind).",
            "minLength": 1,
            "maxLength": 255,
            "x-order": 5
          },
          "oamType": {
            "type": "string",
            "description": "OAM (Open Application Model) categorization of the resource,\nstored in the `oam_type` column (e.g. `workload`, `trait`,\n`scope`).\n",
            "minLength": 1,
            "maxLength": 255,
            "x-go-name": "OAMType",
            "x-oapi-codegen-extra-tags": {
              "db": "oam_type"
            },
            "x-order": 6
          },
          "deleted": {
            "type": "boolean",
            "description": "Soft-delete marker. Server-managed; rows are flagged rather than\nremoved so the design engine can reconcile prior provisions.\n",
            "default": false,
            "x-order": 7
          },
          "createdAt": {
            "description": "Timestamp of pattern resource creation.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at"
            },
            "x-order": 8,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp of last pattern resource modification.",
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
      "MesheryPatternResourcePayload": {
        "type": "object",
        "description": "Payload for creating or updating a pattern resource via\n`POST /api/content/patterns/resource`. Contains only\nclient-settable fields; the owning `userId` (derived from the\nauthenticated session), the `deleted` marker, and the\nserver-generated `createdAt` / `updatedAt` timestamps are\nintentionally excluded.\n",
        "required": [
          "name",
          "namespace",
          "type",
          "oamType"
        ],
        "properties": {
          "id": {
            "description": "Existing pattern resource ID for updates; omit on create.",
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
          "name": {
            "type": "string",
            "description": "Name of the provisioned resource.",
            "minLength": 1,
            "maxLength": 255
          },
          "namespace": {
            "type": "string",
            "description": "Kubernetes namespace the resource was provisioned into.",
            "minLength": 1,
            "maxLength": 255
          },
          "type": {
            "type": "string",
            "description": "Resource type discriminator (e.g. the Kubernetes kind).",
            "minLength": 1,
            "maxLength": 255
          },
          "oamType": {
            "type": "string",
            "description": "OAM categorization of the resource (e.g. workload, trait, scope).",
            "minLength": 1,
            "maxLength": 255,
            "x-go-name": "OAMType"
          }
        }
      },
      "MesheryPatternResourcePage": {
        "type": "object",
        "description": "Paginated collection of pattern resources.",
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
          "resources": {
            "type": "array",
            "items": {
              "x-go-type": "MesheryPatternResource",
              "$schema": "http://json-schema.org/draft-07/schema#",
              "title": "Pattern Resource Schema",
              "description": "Server-returned Meshery pattern resource as persisted by meshery-cloud\n(`meshery_pattern_resources` table). A pattern resource records the\nKubernetes-addressable identity (name, namespace, type, OAM type) of a\nresource provisioned from a design, and is used by the design engine to\ndeduplicate provisioned resources. This v1beta3 shape supersedes the\nlegacy v1alpha2 snake_case wire form and corrects its `Namepace` typo\nto `namespace`.\n",
              "type": "object",
              "additionalProperties": false,
              "required": [
                "id",
                "userId",
                "name",
                "namespace",
                "type",
                "oamType",
                "deleted",
                "createdAt",
                "updatedAt"
              ],
              "properties": {
                "id": {
                  "description": "Server-generated pattern resource ID.",
                  "x-order": 1,
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "userId": {
                  "description": "Owning user ID. Persisted in the `owner` column of the\n`meshery_pattern_resources` table (confirmed against the\nproduction schema dump); the wire identifier stays camelCase\n`userId` per the identifier-naming contract.\n",
                  "x-go-name": "UserID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "owner"
                  },
                  "x-order": 2,
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "name": {
                  "type": "string",
                  "description": "Name of the provisioned resource.",
                  "minLength": 1,
                  "maxLength": 255,
                  "x-order": 3
                },
                "namespace": {
                  "type": "string",
                  "description": "Kubernetes namespace the resource was provisioned into. Corrects\nthe legacy v1alpha2 `Namepace` typo.\n",
                  "minLength": 1,
                  "maxLength": 255,
                  "x-order": 4
                },
                "type": {
                  "type": "string",
                  "description": "Resource type discriminator (e.g. the Kubernetes kind).",
                  "minLength": 1,
                  "maxLength": 255,
                  "x-order": 5
                },
                "oamType": {
                  "type": "string",
                  "description": "OAM (Open Application Model) categorization of the resource,\nstored in the `oam_type` column (e.g. `workload`, `trait`,\n`scope`).\n",
                  "minLength": 1,
                  "maxLength": 255,
                  "x-go-name": "OAMType",
                  "x-oapi-codegen-extra-tags": {
                    "db": "oam_type"
                  },
                  "x-order": 6
                },
                "deleted": {
                  "type": "boolean",
                  "description": "Soft-delete marker. Server-managed; rows are flagged rather than\nremoved so the design engine can reconcile prior provisions.\n",
                  "default": false,
                  "x-order": 7
                },
                "createdAt": {
                  "description": "Timestamp of pattern resource creation.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at"
                  },
                  "x-order": 8,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updatedAt": {
                  "description": "Timestamp of last pattern resource modification.",
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
            "description": "Pattern resources included on this page of results."
          }
        }
      }
    }
  }
};

export default PatternResourceSchema;
