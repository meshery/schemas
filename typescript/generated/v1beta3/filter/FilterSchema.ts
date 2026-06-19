/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const FilterSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Filter",
    "description": "OpenAPI schema for managing Meshery filters. Filters carry an\nopaque body (`filterFile`) plus catalog and visibility metadata,\npersisted by `meshery-cloud` in the `meshery_filters` table and\nconsumed locally by `meshery/server/models.MesheryFilter`.\n\nThe endpoint surface mirrors the live `meshery-cloud` Echo handlers\n(`POST/GET /api/content/filters`,\n`GET/DELETE /api/content/filters/{filterId}`,\n`POST /api/content/filters/clone/{filterId}`,\n`GET /api/content/filters/download/{filterId}`) plus the bulk-delete\nsub-resource and the cross-construct content-share endpoint owned by\nthe design package.\n",
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
      "name": "filters",
      "description": "Operations related to Meshery filters."
    }
  ],
  "paths": {
    "/api/content/filters": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "filters"
        ],
        "summary": "Get filters",
        "operationId": "getFilters",
        "description": "Returns a paginated list of filters accessible to the user.",
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "description": "Get responses by page",
            "schema": {
              "type": "string"
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
            "name": "orgId",
            "in": "query",
            "description": "User's organization ID",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "name": "visibility",
            "in": "query",
            "required": false,
            "description": "Filter by visibility (public, private, published). May be repeated.",
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          {
            "name": "userId",
            "in": "query",
            "required": false,
            "description": "UUID of the owning user. Pass when fetching public/published\nfilters for a specific user (public-profile lookups).\n",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Filters response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated collection of filters.",
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
                    "filters": {
                      "type": "array",
                      "items": {
                        "x-go-type": "MesheryFilter",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "title": "Filter Schema",
                        "description": "Server-returned Meshery filter resource as persisted by meshery-cloud\n(`meshery_filters` table) and consumed by meshery's\n`models.MesheryFilter`. Filters carry an opaque body (`filterFile`) plus\ncatalog and visibility metadata, and follow the same content-resource\nshape as designs minus the catalog engagement counters (the\n`meshery_filters` table has no `view_count` / `download_count` columns).\n",
                        "type": "object",
                        "additionalProperties": false,
                        "required": [
                          "id",
                          "name",
                          "owner",
                          "createdAt",
                          "updatedAt"
                        ],
                        "properties": {
                          "id": {
                            "description": "Server-generated filter ID.",
                            "x-order": 1,
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "name": {
                            "type": "string",
                            "description": "Human-readable filter name; required, used for catalog listings.",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-order": 2
                          },
                          "owner": {
                            "description": "Owning user ID.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "owner",
                              "json": "owner"
                            },
                            "x-order": 3,
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "filterFile": {
                            "type": "string",
                            "format": "byte",
                            "description": "Raw filter source persisted as a byte array (`bytea` column\n`filter_file`). Wire form is base64 per OpenAPI `format: byte`.\n",
                            "maxLength": 10485760,
                            "x-oapi-codegen-extra-tags": {
                              "db": "filter_file"
                            },
                            "x-order": 4
                          },
                          "filterResource": {
                            "type": "string",
                            "description": "Filter resource discriminator describing the filter body's source\nformat (e.g. WASM module identifier or external resource path).\nStored in the `filter_resource` text column.\n",
                            "maxLength": 5000,
                            "x-oapi-codegen-extra-tags": {
                              "db": "filter_resource"
                            },
                            "x-order": 5
                          },
                          "location": {
                            "description": "Optional structured location metadata (branch, host, path, ...).",
                            "x-order": 6,
                            "type": "object",
                            "additionalProperties": {
                              "type": "string"
                            },
                            "x-go-type-skip-optional-pointer": true
                          },
                          "visibility": {
                            "description": "Visibility scope (private, public, published).",
                            "x-order": 7,
                            "type": "string",
                            "enum": [
                              "private",
                              "public",
                              "published"
                            ],
                            "x-go-type-skip-optional-pointer": true
                          },
                          "catalogData": {
                            "description": "Catalog metadata attached to the filter when published.",
                            "x-go-type": "catalogv1alpha2.CatalogData",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/v1alpha2/catalog",
                              "name": "catalogv1alpha2"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "catalog_data"
                            },
                            "x-order": 8,
                            "type": "object",
                            "additionalProperties": false,
                            "properties": {
                              "publishedVersion": {
                                "description": "Tracks the specific content version that has been made available in the Catalog.",
                                "type": "string",
                                "maxLength": 500
                              },
                              "class": {
                                "description": "Published content is classifed by its support level. Content classes help you understand the origin and expected support level for each piece of content. It is important to note that the level of support may vary within each class, and you should exercise discretion when using community-contributed content. Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable. Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility. Content produced and supported by the respective project or organization responsible for the specific technology. This class offers a level of support from the project maintainers themselves. Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Community content may have varying levels of support and reliability.",
                                "type": "string",
                                "oneOf": [
                                  {
                                    "const": "official",
                                    "description": "Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable."
                                  },
                                  {
                                    "const": "verified",
                                    "description": "Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility."
                                  },
                                  {
                                    "const": "reference architecture",
                                    "description": "Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Reference architecture content may have varying levels of support and reliability."
                                  }
                                ],
                                "maxLength": 500
                              },
                              "compatibility": {
                                "type": "array",
                                "title": "Model",
                                "items": {
                                  "enum": [
                                    "kubernetes"
                                  ],
                                  "type": "string"
                                },
                                "uniqueItems": true,
                                "minItems": 1,
                                "description": "One or more models associated with this catalog item. For designs, a list of one or more models implicated by components within the design. For models, this is self-referential."
                              },
                              "patternCaveats": {
                                "type": "string",
                                "title": "Caveats and Considerations",
                                "description": "Specific stipulations to consider and known behaviors to be aware of when using this design.",
                                "maxLength": 500
                              },
                              "patternInfo": {
                                "type": "string",
                                "title": "Description",
                                "minLength": 1,
                                "description": "Purpose of the design along with its intended and unintended uses."
                              },
                              "type": {
                                "type": "string",
                                "title": "Type",
                                "x-enum-casing-exempt": true,
                                "enum": [
                                  "Deployment",
                                  "Observability",
                                  "Resiliency",
                                  "Scaling",
                                  "Security",
                                  "Traffic-management",
                                  "Troubleshooting",
                                  "Workloads"
                                ],
                                "default": "Deployment",
                                "description": "Categorization of the type of design or operational flow depicted in this design."
                              },
                              "snapshotURL": {
                                "type": "array",
                                "items": {
                                  "type": "string",
                                  "format": "uri",
                                  "pattern": "^(https?|http?|oci)://"
                                },
                                "description": "Contains reference to the dark and light mode snapshots of the design."
                              }
                            },
                            "required": [
                              "compatibility",
                              "patternCaveats",
                              "patternInfo",
                              "type"
                            ]
                          },
                          "createdAt": {
                            "description": "Timestamp of filter creation.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at"
                            },
                            "x-order": 9,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp of last filter modification.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at"
                            },
                            "x-order": 10,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          }
                        }
                      },
                      "description": "Filters included on this page of results."
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
          "filters"
        ],
        "summary": "Save filter",
        "operationId": "upsertFilter",
        "description": "Creates or updates a Meshery filter.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for upserting a filter via `POST /api/content/filters`.\nMirrors meshery-cloud's `MesheryFilterRequestBody` and\nmeshery's `MesheryFilterRequestBody` — the wrapper carries an\noptional source URL/path plus a `save` toggle and an embedded\n`filterData` payload. Wire form for the embedded payload field\nis canonical camelCase (`filterData`); legacy snake_case\n(`filter_data`) is accepted by the existing handlers for the\ndeprecation window but new clients MUST emit `filterData`.\n",
                "properties": {
                  "url": {
                    "description": "Optional source URL the filter was fetched from.",
                    "format": "uri",
                    "pattern": "^https?://",
                    "x-go-type-skip-optional-pointer": true,
                    "type": "string"
                  },
                  "path": {
                    "description": "Optional source path the filter was loaded from.",
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "save": {
                    "type": "boolean",
                    "description": "When true, persist the filter in addition to parsing it.\nWhen false, the server returns the parsed payload without\ncommitting it to the database.\n"
                  },
                  "filterData": {
                    "description": "Filter body to persist.",
                    "x-go-type": "MesheryFilterPayload",
                    "type": "object",
                    "required": [
                      "name"
                    ],
                    "properties": {
                      "id": {
                        "description": "Existing filter ID for updates; omit on create. Wrapped in\nan `allOf` so we can attach the `json:\"id,omitempty\"` tag\nfor upsert ergonomics without recursing into the underlying\nUUID definition.\n",
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
                        "description": "Human-readable filter name.",
                        "minLength": 1,
                        "maxLength": 255
                      },
                      "filterFile": {
                        "type": "string",
                        "format": "byte",
                        "description": "Raw filter source as base64-encoded bytes (`format: byte`).\nOptional on update — the server preserves the existing body\nwhen omitted.\n",
                        "maxLength": 10485760
                      },
                      "filterResource": {
                        "type": "string",
                        "description": "Filter resource discriminator describing the body's source\nformat (e.g. WASM module identifier or external resource\npath).\n",
                        "maxLength": 5000
                      },
                      "location": {
                        "description": "Optional structured location metadata.",
                        "type": "object",
                        "additionalProperties": {
                          "type": "string"
                        },
                        "x-go-type-skip-optional-pointer": true
                      },
                      "visibility": {
                        "description": "Requested visibility scope. The server may downgrade a\nrequested `published` value to `private` for callers that\ndo not own the filter.\n",
                        "type": "string",
                        "enum": [
                          "private",
                          "public",
                          "published"
                        ],
                        "x-go-type-skip-optional-pointer": true
                      },
                      "catalogData": {
                        "description": "Catalog metadata to attach when publishing.",
                        "x-go-type": "catalogv1alpha2.CatalogData",
                        "x-go-type-import": {
                          "path": "github.com/meshery/schemas/models/v1alpha2/catalog",
                          "name": "catalogv1alpha2"
                        },
                        "type": "object",
                        "additionalProperties": false,
                        "properties": {
                          "publishedVersion": {
                            "description": "Tracks the specific content version that has been made available in the Catalog.",
                            "type": "string",
                            "maxLength": 500
                          },
                          "class": {
                            "description": "Published content is classifed by its support level. Content classes help you understand the origin and expected support level for each piece of content. It is important to note that the level of support may vary within each class, and you should exercise discretion when using community-contributed content. Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable. Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility. Content produced and supported by the respective project or organization responsible for the specific technology. This class offers a level of support from the project maintainers themselves. Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Community content may have varying levels of support and reliability.",
                            "type": "string",
                            "oneOf": [
                              {
                                "const": "official",
                                "description": "Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable."
                              },
                              {
                                "const": "verified",
                                "description": "Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility."
                              },
                              {
                                "const": "reference architecture",
                                "description": "Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Reference architecture content may have varying levels of support and reliability."
                              }
                            ],
                            "maxLength": 500
                          },
                          "compatibility": {
                            "type": "array",
                            "title": "Model",
                            "items": {
                              "enum": [
                                "kubernetes"
                              ],
                              "type": "string"
                            },
                            "uniqueItems": true,
                            "minItems": 1,
                            "description": "One or more models associated with this catalog item. For designs, a list of one or more models implicated by components within the design. For models, this is self-referential."
                          },
                          "patternCaveats": {
                            "type": "string",
                            "title": "Caveats and Considerations",
                            "description": "Specific stipulations to consider and known behaviors to be aware of when using this design.",
                            "maxLength": 500
                          },
                          "patternInfo": {
                            "type": "string",
                            "title": "Description",
                            "minLength": 1,
                            "description": "Purpose of the design along with its intended and unintended uses."
                          },
                          "type": {
                            "type": "string",
                            "title": "Type",
                            "x-enum-casing-exempt": true,
                            "enum": [
                              "Deployment",
                              "Observability",
                              "Resiliency",
                              "Scaling",
                              "Security",
                              "Traffic-management",
                              "Troubleshooting",
                              "Workloads"
                            ],
                            "default": "Deployment",
                            "description": "Categorization of the type of design or operational flow depicted in this design."
                          },
                          "snapshotURL": {
                            "type": "array",
                            "items": {
                              "type": "string",
                              "format": "uri",
                              "pattern": "^(https?|http?|oci)://"
                            },
                            "description": "Contains reference to the dark and light mode snapshots of the design."
                          }
                        },
                        "required": [
                          "compatibility",
                          "patternCaveats",
                          "patternInfo",
                          "type"
                        ]
                      }
                    }
                  },
                  "config": {
                    "type": "string",
                    "description": "Optional opaque configuration string passed through to the\nunderlying filter runtime. Persisted only on the local\nmeshery `MesheryFilterPayload` shape; meshery-cloud\ncurrently ignores the field, but it is documented here so\nthe canonical contract is single-sourced.\n",
                    "maxLength": 65536
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Filter saved",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Filter Schema",
                  "description": "Server-returned Meshery filter resource as persisted by meshery-cloud\n(`meshery_filters` table) and consumed by meshery's\n`models.MesheryFilter`. Filters carry an opaque body (`filterFile`) plus\ncatalog and visibility metadata, and follow the same content-resource\nshape as designs minus the catalog engagement counters (the\n`meshery_filters` table has no `view_count` / `download_count` columns).\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "name",
                    "owner",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Server-generated filter ID.",
                      "x-order": 1,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "name": {
                      "type": "string",
                      "description": "Human-readable filter name; required, used for catalog listings.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-order": 2
                    },
                    "owner": {
                      "description": "Owning user ID.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner",
                        "json": "owner"
                      },
                      "x-order": 3,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "filterFile": {
                      "type": "string",
                      "format": "byte",
                      "description": "Raw filter source persisted as a byte array (`bytea` column\n`filter_file`). Wire form is base64 per OpenAPI `format: byte`.\n",
                      "maxLength": 10485760,
                      "x-oapi-codegen-extra-tags": {
                        "db": "filter_file"
                      },
                      "x-order": 4
                    },
                    "filterResource": {
                      "type": "string",
                      "description": "Filter resource discriminator describing the filter body's source\nformat (e.g. WASM module identifier or external resource path).\nStored in the `filter_resource` text column.\n",
                      "maxLength": 5000,
                      "x-oapi-codegen-extra-tags": {
                        "db": "filter_resource"
                      },
                      "x-order": 5
                    },
                    "location": {
                      "description": "Optional structured location metadata (branch, host, path, ...).",
                      "x-order": 6,
                      "type": "object",
                      "additionalProperties": {
                        "type": "string"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "visibility": {
                      "description": "Visibility scope (private, public, published).",
                      "x-order": 7,
                      "type": "string",
                      "enum": [
                        "private",
                        "public",
                        "published"
                      ],
                      "x-go-type-skip-optional-pointer": true
                    },
                    "catalogData": {
                      "description": "Catalog metadata attached to the filter when published.",
                      "x-go-type": "catalogv1alpha2.CatalogData",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1alpha2/catalog",
                        "name": "catalogv1alpha2"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "catalog_data"
                      },
                      "x-order": 8,
                      "type": "object",
                      "additionalProperties": false,
                      "properties": {
                        "publishedVersion": {
                          "description": "Tracks the specific content version that has been made available in the Catalog.",
                          "type": "string",
                          "maxLength": 500
                        },
                        "class": {
                          "description": "Published content is classifed by its support level. Content classes help you understand the origin and expected support level for each piece of content. It is important to note that the level of support may vary within each class, and you should exercise discretion when using community-contributed content. Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable. Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility. Content produced and supported by the respective project or organization responsible for the specific technology. This class offers a level of support from the project maintainers themselves. Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Community content may have varying levels of support and reliability.",
                          "type": "string",
                          "oneOf": [
                            {
                              "const": "official",
                              "description": "Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable."
                            },
                            {
                              "const": "verified",
                              "description": "Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility."
                            },
                            {
                              "const": "reference architecture",
                              "description": "Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Reference architecture content may have varying levels of support and reliability."
                            }
                          ],
                          "maxLength": 500
                        },
                        "compatibility": {
                          "type": "array",
                          "title": "Model",
                          "items": {
                            "enum": [
                              "kubernetes"
                            ],
                            "type": "string"
                          },
                          "uniqueItems": true,
                          "minItems": 1,
                          "description": "One or more models associated with this catalog item. For designs, a list of one or more models implicated by components within the design. For models, this is self-referential."
                        },
                        "patternCaveats": {
                          "type": "string",
                          "title": "Caveats and Considerations",
                          "description": "Specific stipulations to consider and known behaviors to be aware of when using this design.",
                          "maxLength": 500
                        },
                        "patternInfo": {
                          "type": "string",
                          "title": "Description",
                          "minLength": 1,
                          "description": "Purpose of the design along with its intended and unintended uses."
                        },
                        "type": {
                          "type": "string",
                          "title": "Type",
                          "x-enum-casing-exempt": true,
                          "enum": [
                            "Deployment",
                            "Observability",
                            "Resiliency",
                            "Scaling",
                            "Security",
                            "Traffic-management",
                            "Troubleshooting",
                            "Workloads"
                          ],
                          "default": "Deployment",
                          "description": "Categorization of the type of design or operational flow depicted in this design."
                        },
                        "snapshotURL": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uri",
                            "pattern": "^(https?|http?|oci)://"
                          },
                          "description": "Contains reference to the dark and light mode snapshots of the design."
                        }
                      },
                      "required": [
                        "compatibility",
                        "patternCaveats",
                        "patternInfo",
                        "type"
                      ]
                    },
                    "createdAt": {
                      "description": "Timestamp of filter creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 9,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last filter modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 10,
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
    "/api/content/filters/delete": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "filters"
        ],
        "summary": "Bulk delete filters",
        "operationId": "deleteFilters",
        "description": "Deletes multiple filters by ID. Modeled as a `POST .../delete`\nsub-resource because REST clients and proxies may strip request\nbodies on `DELETE`.\n",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for bulk deleting filters by ID.",
                "required": [
                  "filters"
                ],
                "properties": {
                  "filters": {
                    "type": "array",
                    "items": {
                      "x-go-type": "DeleteFilterModel",
                      "type": "object",
                      "description": "Reference to a filter for bulk deletion by ID.",
                      "properties": {
                        "id": {
                          "description": "Filter ID targeted for deletion.",
                          "type": "string",
                          "format": "uuid",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-go-type-skip-optional-pointer": true
                        },
                        "name": {
                          "description": "Human-readable filter name (informational only; the server\nmatches on `id`).\n",
                          "type": "string",
                          "x-go-type-skip-optional-pointer": true
                        }
                      }
                    },
                    "description": "Filters targeted for deletion."
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Filters deleted"
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
    "/api/content/filters/{filterId}": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "filters"
        ],
        "summary": "Get filter by ID",
        "operationId": "getFilter",
        "parameters": [
          {
            "name": "filterId",
            "in": "path",
            "description": "Filter ID",
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
            "description": "Filter response",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Filter Schema",
                  "description": "Server-returned Meshery filter resource as persisted by meshery-cloud\n(`meshery_filters` table) and consumed by meshery's\n`models.MesheryFilter`. Filters carry an opaque body (`filterFile`) plus\ncatalog and visibility metadata, and follow the same content-resource\nshape as designs minus the catalog engagement counters (the\n`meshery_filters` table has no `view_count` / `download_count` columns).\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "name",
                    "owner",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Server-generated filter ID.",
                      "x-order": 1,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "name": {
                      "type": "string",
                      "description": "Human-readable filter name; required, used for catalog listings.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-order": 2
                    },
                    "owner": {
                      "description": "Owning user ID.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner",
                        "json": "owner"
                      },
                      "x-order": 3,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "filterFile": {
                      "type": "string",
                      "format": "byte",
                      "description": "Raw filter source persisted as a byte array (`bytea` column\n`filter_file`). Wire form is base64 per OpenAPI `format: byte`.\n",
                      "maxLength": 10485760,
                      "x-oapi-codegen-extra-tags": {
                        "db": "filter_file"
                      },
                      "x-order": 4
                    },
                    "filterResource": {
                      "type": "string",
                      "description": "Filter resource discriminator describing the filter body's source\nformat (e.g. WASM module identifier or external resource path).\nStored in the `filter_resource` text column.\n",
                      "maxLength": 5000,
                      "x-oapi-codegen-extra-tags": {
                        "db": "filter_resource"
                      },
                      "x-order": 5
                    },
                    "location": {
                      "description": "Optional structured location metadata (branch, host, path, ...).",
                      "x-order": 6,
                      "type": "object",
                      "additionalProperties": {
                        "type": "string"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "visibility": {
                      "description": "Visibility scope (private, public, published).",
                      "x-order": 7,
                      "type": "string",
                      "enum": [
                        "private",
                        "public",
                        "published"
                      ],
                      "x-go-type-skip-optional-pointer": true
                    },
                    "catalogData": {
                      "description": "Catalog metadata attached to the filter when published.",
                      "x-go-type": "catalogv1alpha2.CatalogData",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1alpha2/catalog",
                        "name": "catalogv1alpha2"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "catalog_data"
                      },
                      "x-order": 8,
                      "type": "object",
                      "additionalProperties": false,
                      "properties": {
                        "publishedVersion": {
                          "description": "Tracks the specific content version that has been made available in the Catalog.",
                          "type": "string",
                          "maxLength": 500
                        },
                        "class": {
                          "description": "Published content is classifed by its support level. Content classes help you understand the origin and expected support level for each piece of content. It is important to note that the level of support may vary within each class, and you should exercise discretion when using community-contributed content. Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable. Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility. Content produced and supported by the respective project or organization responsible for the specific technology. This class offers a level of support from the project maintainers themselves. Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Community content may have varying levels of support and reliability.",
                          "type": "string",
                          "oneOf": [
                            {
                              "const": "official",
                              "description": "Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable."
                            },
                            {
                              "const": "verified",
                              "description": "Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility."
                            },
                            {
                              "const": "reference architecture",
                              "description": "Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Reference architecture content may have varying levels of support and reliability."
                            }
                          ],
                          "maxLength": 500
                        },
                        "compatibility": {
                          "type": "array",
                          "title": "Model",
                          "items": {
                            "enum": [
                              "kubernetes"
                            ],
                            "type": "string"
                          },
                          "uniqueItems": true,
                          "minItems": 1,
                          "description": "One or more models associated with this catalog item. For designs, a list of one or more models implicated by components within the design. For models, this is self-referential."
                        },
                        "patternCaveats": {
                          "type": "string",
                          "title": "Caveats and Considerations",
                          "description": "Specific stipulations to consider and known behaviors to be aware of when using this design.",
                          "maxLength": 500
                        },
                        "patternInfo": {
                          "type": "string",
                          "title": "Description",
                          "minLength": 1,
                          "description": "Purpose of the design along with its intended and unintended uses."
                        },
                        "type": {
                          "type": "string",
                          "title": "Type",
                          "x-enum-casing-exempt": true,
                          "enum": [
                            "Deployment",
                            "Observability",
                            "Resiliency",
                            "Scaling",
                            "Security",
                            "Traffic-management",
                            "Troubleshooting",
                            "Workloads"
                          ],
                          "default": "Deployment",
                          "description": "Categorization of the type of design or operational flow depicted in this design."
                        },
                        "snapshotURL": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uri",
                            "pattern": "^(https?|http?|oci)://"
                          },
                          "description": "Contains reference to the dark and light mode snapshots of the design."
                        }
                      },
                      "required": [
                        "compatibility",
                        "patternCaveats",
                        "patternInfo",
                        "type"
                      ]
                    },
                    "createdAt": {
                      "description": "Timestamp of filter creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 9,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last filter modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 10,
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
      "put": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "filters"
        ],
        "summary": "Update filter by ID",
        "operationId": "updateFilter",
        "description": "Updates the filter at the supplied ID with the provided payload.\nProvided as a canonical-CRUD complement to the upsert `POST\n/api/content/filters` form so consumers that prefer explicit\nupdate semantics can address the resource directly.\n",
        "parameters": [
          {
            "name": "filterId",
            "in": "path",
            "description": "Filter ID",
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
                "description": "Payload for creating or updating a filter via\n`POST /api/content/filters` or\n`PUT /api/content/filters/{filterId}`. Contains only\nclient-settable fields; server-generated `createdAt` /\n`updatedAt` and the owning `userId` (which the server derives\nfrom the authenticated session) are intentionally excluded.\n",
                "required": [
                  "name"
                ],
                "properties": {
                  "id": {
                    "description": "Existing filter ID for updates; omit on create. Wrapped in\nan `allOf` so we can attach the `json:\"id,omitempty\"` tag\nfor upsert ergonomics without recursing into the underlying\nUUID definition.\n",
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
                    "description": "Human-readable filter name.",
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "filterFile": {
                    "type": "string",
                    "format": "byte",
                    "description": "Raw filter source as base64-encoded bytes (`format: byte`).\nOptional on update — the server preserves the existing body\nwhen omitted.\n",
                    "maxLength": 10485760
                  },
                  "filterResource": {
                    "type": "string",
                    "description": "Filter resource discriminator describing the body's source\nformat (e.g. WASM module identifier or external resource\npath).\n",
                    "maxLength": 5000
                  },
                  "location": {
                    "description": "Optional structured location metadata.",
                    "type": "object",
                    "additionalProperties": {
                      "type": "string"
                    },
                    "x-go-type-skip-optional-pointer": true
                  },
                  "visibility": {
                    "description": "Requested visibility scope. The server may downgrade a\nrequested `published` value to `private` for callers that\ndo not own the filter.\n",
                    "type": "string",
                    "enum": [
                      "private",
                      "public",
                      "published"
                    ],
                    "x-go-type-skip-optional-pointer": true
                  },
                  "catalogData": {
                    "description": "Catalog metadata to attach when publishing.",
                    "x-go-type": "catalogv1alpha2.CatalogData",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/v1alpha2/catalog",
                      "name": "catalogv1alpha2"
                    },
                    "type": "object",
                    "additionalProperties": false,
                    "properties": {
                      "publishedVersion": {
                        "description": "Tracks the specific content version that has been made available in the Catalog.",
                        "type": "string",
                        "maxLength": 500
                      },
                      "class": {
                        "description": "Published content is classifed by its support level. Content classes help you understand the origin and expected support level for each piece of content. It is important to note that the level of support may vary within each class, and you should exercise discretion when using community-contributed content. Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable. Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility. Content produced and supported by the respective project or organization responsible for the specific technology. This class offers a level of support from the project maintainers themselves. Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Community content may have varying levels of support and reliability.",
                        "type": "string",
                        "oneOf": [
                          {
                            "const": "official",
                            "description": "Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable."
                          },
                          {
                            "const": "verified",
                            "description": "Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility."
                          },
                          {
                            "const": "reference architecture",
                            "description": "Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Reference architecture content may have varying levels of support and reliability."
                          }
                        ],
                        "maxLength": 500
                      },
                      "compatibility": {
                        "type": "array",
                        "title": "Model",
                        "items": {
                          "enum": [
                            "kubernetes"
                          ],
                          "type": "string"
                        },
                        "uniqueItems": true,
                        "minItems": 1,
                        "description": "One or more models associated with this catalog item. For designs, a list of one or more models implicated by components within the design. For models, this is self-referential."
                      },
                      "patternCaveats": {
                        "type": "string",
                        "title": "Caveats and Considerations",
                        "description": "Specific stipulations to consider and known behaviors to be aware of when using this design.",
                        "maxLength": 500
                      },
                      "patternInfo": {
                        "type": "string",
                        "title": "Description",
                        "minLength": 1,
                        "description": "Purpose of the design along with its intended and unintended uses."
                      },
                      "type": {
                        "type": "string",
                        "title": "Type",
                        "x-enum-casing-exempt": true,
                        "enum": [
                          "Deployment",
                          "Observability",
                          "Resiliency",
                          "Scaling",
                          "Security",
                          "Traffic-management",
                          "Troubleshooting",
                          "Workloads"
                        ],
                        "default": "Deployment",
                        "description": "Categorization of the type of design or operational flow depicted in this design."
                      },
                      "snapshotURL": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uri",
                          "pattern": "^(https?|http?|oci)://"
                        },
                        "description": "Contains reference to the dark and light mode snapshots of the design."
                      }
                    },
                    "required": [
                      "compatibility",
                      "patternCaveats",
                      "patternInfo",
                      "type"
                    ]
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Filter updated",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Filter Schema",
                  "description": "Server-returned Meshery filter resource as persisted by meshery-cloud\n(`meshery_filters` table) and consumed by meshery's\n`models.MesheryFilter`. Filters carry an opaque body (`filterFile`) plus\ncatalog and visibility metadata, and follow the same content-resource\nshape as designs minus the catalog engagement counters (the\n`meshery_filters` table has no `view_count` / `download_count` columns).\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "name",
                    "owner",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Server-generated filter ID.",
                      "x-order": 1,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "name": {
                      "type": "string",
                      "description": "Human-readable filter name; required, used for catalog listings.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-order": 2
                    },
                    "owner": {
                      "description": "Owning user ID.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner",
                        "json": "owner"
                      },
                      "x-order": 3,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "filterFile": {
                      "type": "string",
                      "format": "byte",
                      "description": "Raw filter source persisted as a byte array (`bytea` column\n`filter_file`). Wire form is base64 per OpenAPI `format: byte`.\n",
                      "maxLength": 10485760,
                      "x-oapi-codegen-extra-tags": {
                        "db": "filter_file"
                      },
                      "x-order": 4
                    },
                    "filterResource": {
                      "type": "string",
                      "description": "Filter resource discriminator describing the filter body's source\nformat (e.g. WASM module identifier or external resource path).\nStored in the `filter_resource` text column.\n",
                      "maxLength": 5000,
                      "x-oapi-codegen-extra-tags": {
                        "db": "filter_resource"
                      },
                      "x-order": 5
                    },
                    "location": {
                      "description": "Optional structured location metadata (branch, host, path, ...).",
                      "x-order": 6,
                      "type": "object",
                      "additionalProperties": {
                        "type": "string"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "visibility": {
                      "description": "Visibility scope (private, public, published).",
                      "x-order": 7,
                      "type": "string",
                      "enum": [
                        "private",
                        "public",
                        "published"
                      ],
                      "x-go-type-skip-optional-pointer": true
                    },
                    "catalogData": {
                      "description": "Catalog metadata attached to the filter when published.",
                      "x-go-type": "catalogv1alpha2.CatalogData",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1alpha2/catalog",
                        "name": "catalogv1alpha2"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "catalog_data"
                      },
                      "x-order": 8,
                      "type": "object",
                      "additionalProperties": false,
                      "properties": {
                        "publishedVersion": {
                          "description": "Tracks the specific content version that has been made available in the Catalog.",
                          "type": "string",
                          "maxLength": 500
                        },
                        "class": {
                          "description": "Published content is classifed by its support level. Content classes help you understand the origin and expected support level for each piece of content. It is important to note that the level of support may vary within each class, and you should exercise discretion when using community-contributed content. Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable. Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility. Content produced and supported by the respective project or organization responsible for the specific technology. This class offers a level of support from the project maintainers themselves. Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Community content may have varying levels of support and reliability.",
                          "type": "string",
                          "oneOf": [
                            {
                              "const": "official",
                              "description": "Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable."
                            },
                            {
                              "const": "verified",
                              "description": "Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility."
                            },
                            {
                              "const": "reference architecture",
                              "description": "Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Reference architecture content may have varying levels of support and reliability."
                            }
                          ],
                          "maxLength": 500
                        },
                        "compatibility": {
                          "type": "array",
                          "title": "Model",
                          "items": {
                            "enum": [
                              "kubernetes"
                            ],
                            "type": "string"
                          },
                          "uniqueItems": true,
                          "minItems": 1,
                          "description": "One or more models associated with this catalog item. For designs, a list of one or more models implicated by components within the design. For models, this is self-referential."
                        },
                        "patternCaveats": {
                          "type": "string",
                          "title": "Caveats and Considerations",
                          "description": "Specific stipulations to consider and known behaviors to be aware of when using this design.",
                          "maxLength": 500
                        },
                        "patternInfo": {
                          "type": "string",
                          "title": "Description",
                          "minLength": 1,
                          "description": "Purpose of the design along with its intended and unintended uses."
                        },
                        "type": {
                          "type": "string",
                          "title": "Type",
                          "x-enum-casing-exempt": true,
                          "enum": [
                            "Deployment",
                            "Observability",
                            "Resiliency",
                            "Scaling",
                            "Security",
                            "Traffic-management",
                            "Troubleshooting",
                            "Workloads"
                          ],
                          "default": "Deployment",
                          "description": "Categorization of the type of design or operational flow depicted in this design."
                        },
                        "snapshotURL": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uri",
                            "pattern": "^(https?|http?|oci)://"
                          },
                          "description": "Contains reference to the dark and light mode snapshots of the design."
                        }
                      },
                      "required": [
                        "compatibility",
                        "patternCaveats",
                        "patternInfo",
                        "type"
                      ]
                    },
                    "createdAt": {
                      "description": "Timestamp of filter creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 9,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last filter modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 10,
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
          "filters"
        ],
        "summary": "Delete filter by ID",
        "operationId": "deleteFilter",
        "parameters": [
          {
            "name": "filterId",
            "in": "path",
            "description": "Filter ID",
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
            "description": "Filter deleted"
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
    "/api/content/filters/clone/{filterId}": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "filters"
        ],
        "summary": "Clone filter",
        "operationId": "cloneFilter",
        "description": "Creates a copy of an existing filter.",
        "parameters": [
          {
            "name": "filterId",
            "in": "path",
            "description": "Filter ID",
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
                "description": "Payload for `POST /api/content/filters/clone/{filterId}`. The\nonly client-settable field is the optional name applied to the\ncloned filter; the server derives ownership and visibility from\nthe request context.\n",
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "Optional name to apply to the cloned filter. Defaults to a\nserver-generated derivative of the source filter's name.\n",
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
            "description": "Filter cloned",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Filter Schema",
                  "description": "Server-returned Meshery filter resource as persisted by meshery-cloud\n(`meshery_filters` table) and consumed by meshery's\n`models.MesheryFilter`. Filters carry an opaque body (`filterFile`) plus\ncatalog and visibility metadata, and follow the same content-resource\nshape as designs minus the catalog engagement counters (the\n`meshery_filters` table has no `view_count` / `download_count` columns).\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "name",
                    "owner",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Server-generated filter ID.",
                      "x-order": 1,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "name": {
                      "type": "string",
                      "description": "Human-readable filter name; required, used for catalog listings.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-order": 2
                    },
                    "owner": {
                      "description": "Owning user ID.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner",
                        "json": "owner"
                      },
                      "x-order": 3,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "filterFile": {
                      "type": "string",
                      "format": "byte",
                      "description": "Raw filter source persisted as a byte array (`bytea` column\n`filter_file`). Wire form is base64 per OpenAPI `format: byte`.\n",
                      "maxLength": 10485760,
                      "x-oapi-codegen-extra-tags": {
                        "db": "filter_file"
                      },
                      "x-order": 4
                    },
                    "filterResource": {
                      "type": "string",
                      "description": "Filter resource discriminator describing the filter body's source\nformat (e.g. WASM module identifier or external resource path).\nStored in the `filter_resource` text column.\n",
                      "maxLength": 5000,
                      "x-oapi-codegen-extra-tags": {
                        "db": "filter_resource"
                      },
                      "x-order": 5
                    },
                    "location": {
                      "description": "Optional structured location metadata (branch, host, path, ...).",
                      "x-order": 6,
                      "type": "object",
                      "additionalProperties": {
                        "type": "string"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "visibility": {
                      "description": "Visibility scope (private, public, published).",
                      "x-order": 7,
                      "type": "string",
                      "enum": [
                        "private",
                        "public",
                        "published"
                      ],
                      "x-go-type-skip-optional-pointer": true
                    },
                    "catalogData": {
                      "description": "Catalog metadata attached to the filter when published.",
                      "x-go-type": "catalogv1alpha2.CatalogData",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1alpha2/catalog",
                        "name": "catalogv1alpha2"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "catalog_data"
                      },
                      "x-order": 8,
                      "type": "object",
                      "additionalProperties": false,
                      "properties": {
                        "publishedVersion": {
                          "description": "Tracks the specific content version that has been made available in the Catalog.",
                          "type": "string",
                          "maxLength": 500
                        },
                        "class": {
                          "description": "Published content is classifed by its support level. Content classes help you understand the origin and expected support level for each piece of content. It is important to note that the level of support may vary within each class, and you should exercise discretion when using community-contributed content. Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable. Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility. Content produced and supported by the respective project or organization responsible for the specific technology. This class offers a level of support from the project maintainers themselves. Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Community content may have varying levels of support and reliability.",
                          "type": "string",
                          "oneOf": [
                            {
                              "const": "official",
                              "description": "Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable."
                            },
                            {
                              "const": "verified",
                              "description": "Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility."
                            },
                            {
                              "const": "reference architecture",
                              "description": "Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Reference architecture content may have varying levels of support and reliability."
                            }
                          ],
                          "maxLength": 500
                        },
                        "compatibility": {
                          "type": "array",
                          "title": "Model",
                          "items": {
                            "enum": [
                              "kubernetes"
                            ],
                            "type": "string"
                          },
                          "uniqueItems": true,
                          "minItems": 1,
                          "description": "One or more models associated with this catalog item. For designs, a list of one or more models implicated by components within the design. For models, this is self-referential."
                        },
                        "patternCaveats": {
                          "type": "string",
                          "title": "Caveats and Considerations",
                          "description": "Specific stipulations to consider and known behaviors to be aware of when using this design.",
                          "maxLength": 500
                        },
                        "patternInfo": {
                          "type": "string",
                          "title": "Description",
                          "minLength": 1,
                          "description": "Purpose of the design along with its intended and unintended uses."
                        },
                        "type": {
                          "type": "string",
                          "title": "Type",
                          "x-enum-casing-exempt": true,
                          "enum": [
                            "Deployment",
                            "Observability",
                            "Resiliency",
                            "Scaling",
                            "Security",
                            "Traffic-management",
                            "Troubleshooting",
                            "Workloads"
                          ],
                          "default": "Deployment",
                          "description": "Categorization of the type of design or operational flow depicted in this design."
                        },
                        "snapshotURL": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uri",
                            "pattern": "^(https?|http?|oci)://"
                          },
                          "description": "Contains reference to the dark and light mode snapshots of the design."
                        }
                      },
                      "required": [
                        "compatibility",
                        "patternCaveats",
                        "patternInfo",
                        "type"
                      ]
                    },
                    "createdAt": {
                      "description": "Timestamp of filter creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 9,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last filter modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 10,
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
    },
    "/api/content/filters/download/{filterId}": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "filters"
        ],
        "summary": "Download filter file",
        "operationId": "getFilterFile",
        "description": "Downloads the raw filter body associated with the supplied\nfilter ID. The server streams the bytes verbatim with\n`Content-Type: application/wasm` and a\n`Content-Disposition: attachment` header naming the filter.\n",
        "parameters": [
          {
            "name": "filterId",
            "in": "path",
            "description": "Filter ID",
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
            "description": "Filter file content",
            "content": {
              "application/wasm": {
                "schema": {
                  "type": "string",
                  "format": "binary"
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
      "filterId": {
        "name": "filterId",
        "in": "path",
        "description": "Filter ID",
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
          "type": "string"
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
      "orgIdQuery": {
        "name": "orgId",
        "in": "query",
        "description": "User's organization ID",
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    },
    "schemas": {
      "MesheryFilter": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Filter Schema",
        "description": "Server-returned Meshery filter resource as persisted by meshery-cloud\n(`meshery_filters` table) and consumed by meshery's\n`models.MesheryFilter`. Filters carry an opaque body (`filterFile`) plus\ncatalog and visibility metadata, and follow the same content-resource\nshape as designs minus the catalog engagement counters (the\n`meshery_filters` table has no `view_count` / `download_count` columns).\n",
        "type": "object",
        "additionalProperties": false,
        "required": [
          "id",
          "name",
          "owner",
          "createdAt",
          "updatedAt"
        ],
        "properties": {
          "id": {
            "description": "Server-generated filter ID.",
            "x-order": 1,
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "name": {
            "type": "string",
            "description": "Human-readable filter name; required, used for catalog listings.",
            "minLength": 1,
            "maxLength": 255,
            "x-order": 2
          },
          "owner": {
            "description": "Owning user ID.",
            "x-oapi-codegen-extra-tags": {
              "db": "owner",
              "json": "owner"
            },
            "x-order": 3,
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "filterFile": {
            "type": "string",
            "format": "byte",
            "description": "Raw filter source persisted as a byte array (`bytea` column\n`filter_file`). Wire form is base64 per OpenAPI `format: byte`.\n",
            "maxLength": 10485760,
            "x-oapi-codegen-extra-tags": {
              "db": "filter_file"
            },
            "x-order": 4
          },
          "filterResource": {
            "type": "string",
            "description": "Filter resource discriminator describing the filter body's source\nformat (e.g. WASM module identifier or external resource path).\nStored in the `filter_resource` text column.\n",
            "maxLength": 5000,
            "x-oapi-codegen-extra-tags": {
              "db": "filter_resource"
            },
            "x-order": 5
          },
          "location": {
            "description": "Optional structured location metadata (branch, host, path, ...).",
            "x-order": 6,
            "type": "object",
            "additionalProperties": {
              "type": "string"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "visibility": {
            "description": "Visibility scope (private, public, published).",
            "x-order": 7,
            "type": "string",
            "enum": [
              "private",
              "public",
              "published"
            ],
            "x-go-type-skip-optional-pointer": true
          },
          "catalogData": {
            "description": "Catalog metadata attached to the filter when published.",
            "x-go-type": "catalogv1alpha2.CatalogData",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/v1alpha2/catalog",
              "name": "catalogv1alpha2"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "catalog_data"
            },
            "x-order": 8,
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "publishedVersion": {
                "description": "Tracks the specific content version that has been made available in the Catalog.",
                "type": "string",
                "maxLength": 500
              },
              "class": {
                "description": "Published content is classifed by its support level. Content classes help you understand the origin and expected support level for each piece of content. It is important to note that the level of support may vary within each class, and you should exercise discretion when using community-contributed content. Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable. Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility. Content produced and supported by the respective project or organization responsible for the specific technology. This class offers a level of support from the project maintainers themselves. Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Community content may have varying levels of support and reliability.",
                "type": "string",
                "oneOf": [
                  {
                    "const": "official",
                    "description": "Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable."
                  },
                  {
                    "const": "verified",
                    "description": "Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility."
                  },
                  {
                    "const": "reference architecture",
                    "description": "Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Reference architecture content may have varying levels of support and reliability."
                  }
                ],
                "maxLength": 500
              },
              "compatibility": {
                "type": "array",
                "title": "Model",
                "items": {
                  "enum": [
                    "kubernetes"
                  ],
                  "type": "string"
                },
                "uniqueItems": true,
                "minItems": 1,
                "description": "One or more models associated with this catalog item. For designs, a list of one or more models implicated by components within the design. For models, this is self-referential."
              },
              "patternCaveats": {
                "type": "string",
                "title": "Caveats and Considerations",
                "description": "Specific stipulations to consider and known behaviors to be aware of when using this design.",
                "maxLength": 500
              },
              "patternInfo": {
                "type": "string",
                "title": "Description",
                "minLength": 1,
                "description": "Purpose of the design along with its intended and unintended uses."
              },
              "type": {
                "type": "string",
                "title": "Type",
                "x-enum-casing-exempt": true,
                "enum": [
                  "Deployment",
                  "Observability",
                  "Resiliency",
                  "Scaling",
                  "Security",
                  "Traffic-management",
                  "Troubleshooting",
                  "Workloads"
                ],
                "default": "Deployment",
                "description": "Categorization of the type of design or operational flow depicted in this design."
              },
              "snapshotURL": {
                "type": "array",
                "items": {
                  "type": "string",
                  "format": "uri",
                  "pattern": "^(https?|http?|oci)://"
                },
                "description": "Contains reference to the dark and light mode snapshots of the design."
              }
            },
            "required": [
              "compatibility",
              "patternCaveats",
              "patternInfo",
              "type"
            ]
          },
          "createdAt": {
            "description": "Timestamp of filter creation.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at"
            },
            "x-order": 9,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp of last filter modification.",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at"
            },
            "x-order": 10,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "MesheryFilterPayload": {
        "type": "object",
        "description": "Payload for creating or updating a filter via\n`POST /api/content/filters` or\n`PUT /api/content/filters/{filterId}`. Contains only\nclient-settable fields; server-generated `createdAt` /\n`updatedAt` and the owning `userId` (which the server derives\nfrom the authenticated session) are intentionally excluded.\n",
        "required": [
          "name"
        ],
        "properties": {
          "id": {
            "description": "Existing filter ID for updates; omit on create. Wrapped in\nan `allOf` so we can attach the `json:\"id,omitempty\"` tag\nfor upsert ergonomics without recursing into the underlying\nUUID definition.\n",
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
            "description": "Human-readable filter name.",
            "minLength": 1,
            "maxLength": 255
          },
          "filterFile": {
            "type": "string",
            "format": "byte",
            "description": "Raw filter source as base64-encoded bytes (`format: byte`).\nOptional on update — the server preserves the existing body\nwhen omitted.\n",
            "maxLength": 10485760
          },
          "filterResource": {
            "type": "string",
            "description": "Filter resource discriminator describing the body's source\nformat (e.g. WASM module identifier or external resource\npath).\n",
            "maxLength": 5000
          },
          "location": {
            "description": "Optional structured location metadata.",
            "type": "object",
            "additionalProperties": {
              "type": "string"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "visibility": {
            "description": "Requested visibility scope. The server may downgrade a\nrequested `published` value to `private` for callers that\ndo not own the filter.\n",
            "type": "string",
            "enum": [
              "private",
              "public",
              "published"
            ],
            "x-go-type-skip-optional-pointer": true
          },
          "catalogData": {
            "description": "Catalog metadata to attach when publishing.",
            "x-go-type": "catalogv1alpha2.CatalogData",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/v1alpha2/catalog",
              "name": "catalogv1alpha2"
            },
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "publishedVersion": {
                "description": "Tracks the specific content version that has been made available in the Catalog.",
                "type": "string",
                "maxLength": 500
              },
              "class": {
                "description": "Published content is classifed by its support level. Content classes help you understand the origin and expected support level for each piece of content. It is important to note that the level of support may vary within each class, and you should exercise discretion when using community-contributed content. Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable. Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility. Content produced and supported by the respective project or organization responsible for the specific technology. This class offers a level of support from the project maintainers themselves. Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Community content may have varying levels of support and reliability.",
                "type": "string",
                "oneOf": [
                  {
                    "const": "official",
                    "description": "Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable."
                  },
                  {
                    "const": "verified",
                    "description": "Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility."
                  },
                  {
                    "const": "reference architecture",
                    "description": "Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Reference architecture content may have varying levels of support and reliability."
                  }
                ],
                "maxLength": 500
              },
              "compatibility": {
                "type": "array",
                "title": "Model",
                "items": {
                  "enum": [
                    "kubernetes"
                  ],
                  "type": "string"
                },
                "uniqueItems": true,
                "minItems": 1,
                "description": "One or more models associated with this catalog item. For designs, a list of one or more models implicated by components within the design. For models, this is self-referential."
              },
              "patternCaveats": {
                "type": "string",
                "title": "Caveats and Considerations",
                "description": "Specific stipulations to consider and known behaviors to be aware of when using this design.",
                "maxLength": 500
              },
              "patternInfo": {
                "type": "string",
                "title": "Description",
                "minLength": 1,
                "description": "Purpose of the design along with its intended and unintended uses."
              },
              "type": {
                "type": "string",
                "title": "Type",
                "x-enum-casing-exempt": true,
                "enum": [
                  "Deployment",
                  "Observability",
                  "Resiliency",
                  "Scaling",
                  "Security",
                  "Traffic-management",
                  "Troubleshooting",
                  "Workloads"
                ],
                "default": "Deployment",
                "description": "Categorization of the type of design or operational flow depicted in this design."
              },
              "snapshotURL": {
                "type": "array",
                "items": {
                  "type": "string",
                  "format": "uri",
                  "pattern": "^(https?|http?|oci)://"
                },
                "description": "Contains reference to the dark and light mode snapshots of the design."
              }
            },
            "required": [
              "compatibility",
              "patternCaveats",
              "patternInfo",
              "type"
            ]
          }
        }
      },
      "MesheryFilterPage": {
        "type": "object",
        "description": "Paginated collection of filters.",
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
          "filters": {
            "type": "array",
            "items": {
              "x-go-type": "MesheryFilter",
              "$schema": "http://json-schema.org/draft-07/schema#",
              "title": "Filter Schema",
              "description": "Server-returned Meshery filter resource as persisted by meshery-cloud\n(`meshery_filters` table) and consumed by meshery's\n`models.MesheryFilter`. Filters carry an opaque body (`filterFile`) plus\ncatalog and visibility metadata, and follow the same content-resource\nshape as designs minus the catalog engagement counters (the\n`meshery_filters` table has no `view_count` / `download_count` columns).\n",
              "type": "object",
              "additionalProperties": false,
              "required": [
                "id",
                "name",
                "owner",
                "createdAt",
                "updatedAt"
              ],
              "properties": {
                "id": {
                  "description": "Server-generated filter ID.",
                  "x-order": 1,
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "name": {
                  "type": "string",
                  "description": "Human-readable filter name; required, used for catalog listings.",
                  "minLength": 1,
                  "maxLength": 255,
                  "x-order": 2
                },
                "owner": {
                  "description": "Owning user ID.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "owner",
                    "json": "owner"
                  },
                  "x-order": 3,
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "filterFile": {
                  "type": "string",
                  "format": "byte",
                  "description": "Raw filter source persisted as a byte array (`bytea` column\n`filter_file`). Wire form is base64 per OpenAPI `format: byte`.\n",
                  "maxLength": 10485760,
                  "x-oapi-codegen-extra-tags": {
                    "db": "filter_file"
                  },
                  "x-order": 4
                },
                "filterResource": {
                  "type": "string",
                  "description": "Filter resource discriminator describing the filter body's source\nformat (e.g. WASM module identifier or external resource path).\nStored in the `filter_resource` text column.\n",
                  "maxLength": 5000,
                  "x-oapi-codegen-extra-tags": {
                    "db": "filter_resource"
                  },
                  "x-order": 5
                },
                "location": {
                  "description": "Optional structured location metadata (branch, host, path, ...).",
                  "x-order": 6,
                  "type": "object",
                  "additionalProperties": {
                    "type": "string"
                  },
                  "x-go-type-skip-optional-pointer": true
                },
                "visibility": {
                  "description": "Visibility scope (private, public, published).",
                  "x-order": 7,
                  "type": "string",
                  "enum": [
                    "private",
                    "public",
                    "published"
                  ],
                  "x-go-type-skip-optional-pointer": true
                },
                "catalogData": {
                  "description": "Catalog metadata attached to the filter when published.",
                  "x-go-type": "catalogv1alpha2.CatalogData",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/v1alpha2/catalog",
                    "name": "catalogv1alpha2"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "catalog_data"
                  },
                  "x-order": 8,
                  "type": "object",
                  "additionalProperties": false,
                  "properties": {
                    "publishedVersion": {
                      "description": "Tracks the specific content version that has been made available in the Catalog.",
                      "type": "string",
                      "maxLength": 500
                    },
                    "class": {
                      "description": "Published content is classifed by its support level. Content classes help you understand the origin and expected support level for each piece of content. It is important to note that the level of support may vary within each class, and you should exercise discretion when using community-contributed content. Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable. Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility. Content produced and supported by the respective project or organization responsible for the specific technology. This class offers a level of support from the project maintainers themselves. Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Community content may have varying levels of support and reliability.",
                      "type": "string",
                      "oneOf": [
                        {
                          "const": "official",
                          "description": "Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable."
                        },
                        {
                          "const": "verified",
                          "description": "Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility."
                        },
                        {
                          "const": "reference architecture",
                          "description": "Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Reference architecture content may have varying levels of support and reliability."
                        }
                      ],
                      "maxLength": 500
                    },
                    "compatibility": {
                      "type": "array",
                      "title": "Model",
                      "items": {
                        "enum": [
                          "kubernetes"
                        ],
                        "type": "string"
                      },
                      "uniqueItems": true,
                      "minItems": 1,
                      "description": "One or more models associated with this catalog item. For designs, a list of one or more models implicated by components within the design. For models, this is self-referential."
                    },
                    "patternCaveats": {
                      "type": "string",
                      "title": "Caveats and Considerations",
                      "description": "Specific stipulations to consider and known behaviors to be aware of when using this design.",
                      "maxLength": 500
                    },
                    "patternInfo": {
                      "type": "string",
                      "title": "Description",
                      "minLength": 1,
                      "description": "Purpose of the design along with its intended and unintended uses."
                    },
                    "type": {
                      "type": "string",
                      "title": "Type",
                      "x-enum-casing-exempt": true,
                      "enum": [
                        "Deployment",
                        "Observability",
                        "Resiliency",
                        "Scaling",
                        "Security",
                        "Traffic-management",
                        "Troubleshooting",
                        "Workloads"
                      ],
                      "default": "Deployment",
                      "description": "Categorization of the type of design or operational flow depicted in this design."
                    },
                    "snapshotURL": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uri",
                        "pattern": "^(https?|http?|oci)://"
                      },
                      "description": "Contains reference to the dark and light mode snapshots of the design."
                    }
                  },
                  "required": [
                    "compatibility",
                    "patternCaveats",
                    "patternInfo",
                    "type"
                  ]
                },
                "createdAt": {
                  "description": "Timestamp of filter creation.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at"
                  },
                  "x-order": 9,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updatedAt": {
                  "description": "Timestamp of last filter modification.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at"
                  },
                  "x-order": 10,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                }
              }
            },
            "description": "Filters included on this page of results."
          }
        }
      },
      "DeleteFilterModel": {
        "type": "object",
        "description": "Reference to a filter for bulk deletion by ID.",
        "properties": {
          "id": {
            "description": "Filter ID targeted for deletion.",
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "name": {
            "description": "Human-readable filter name (informational only; the server\nmatches on `id`).\n",
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "MesheryFilterDeleteRequestBody": {
        "type": "object",
        "description": "Payload for bulk deleting filters by ID.",
        "required": [
          "filters"
        ],
        "properties": {
          "filters": {
            "type": "array",
            "items": {
              "x-go-type": "DeleteFilterModel",
              "type": "object",
              "description": "Reference to a filter for bulk deletion by ID.",
              "properties": {
                "id": {
                  "description": "Filter ID targeted for deletion.",
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-go-type-skip-optional-pointer": true
                },
                "name": {
                  "description": "Human-readable filter name (informational only; the server\nmatches on `id`).\n",
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                }
              }
            },
            "description": "Filters targeted for deletion."
          }
        }
      },
      "MesheryFilterCloneRequestBody": {
        "type": "object",
        "description": "Payload for `POST /api/content/filters/clone/{filterId}`. The\nonly client-settable field is the optional name applied to the\ncloned filter; the server derives ownership and visibility from\nthe request context.\n",
        "properties": {
          "name": {
            "type": "string",
            "description": "Optional name to apply to the cloned filter. Defaults to a\nserver-generated derivative of the source filter's name.\n",
            "minLength": 1,
            "maxLength": 255
          }
        }
      },
      "MesheryFilterRequestBody": {
        "type": "object",
        "description": "Payload for upserting a filter via `POST /api/content/filters`.\nMirrors meshery-cloud's `MesheryFilterRequestBody` and\nmeshery's `MesheryFilterRequestBody` — the wrapper carries an\noptional source URL/path plus a `save` toggle and an embedded\n`filterData` payload. Wire form for the embedded payload field\nis canonical camelCase (`filterData`); legacy snake_case\n(`filter_data`) is accepted by the existing handlers for the\ndeprecation window but new clients MUST emit `filterData`.\n",
        "properties": {
          "url": {
            "description": "Optional source URL the filter was fetched from.",
            "format": "uri",
            "pattern": "^https?://",
            "x-go-type-skip-optional-pointer": true,
            "type": "string"
          },
          "path": {
            "description": "Optional source path the filter was loaded from.",
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "save": {
            "type": "boolean",
            "description": "When true, persist the filter in addition to parsing it.\nWhen false, the server returns the parsed payload without\ncommitting it to the database.\n"
          },
          "filterData": {
            "description": "Filter body to persist.",
            "x-go-type": "MesheryFilterPayload",
            "type": "object",
            "required": [
              "name"
            ],
            "properties": {
              "id": {
                "description": "Existing filter ID for updates; omit on create. Wrapped in\nan `allOf` so we can attach the `json:\"id,omitempty\"` tag\nfor upsert ergonomics without recursing into the underlying\nUUID definition.\n",
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
                "description": "Human-readable filter name.",
                "minLength": 1,
                "maxLength": 255
              },
              "filterFile": {
                "type": "string",
                "format": "byte",
                "description": "Raw filter source as base64-encoded bytes (`format: byte`).\nOptional on update — the server preserves the existing body\nwhen omitted.\n",
                "maxLength": 10485760
              },
              "filterResource": {
                "type": "string",
                "description": "Filter resource discriminator describing the body's source\nformat (e.g. WASM module identifier or external resource\npath).\n",
                "maxLength": 5000
              },
              "location": {
                "description": "Optional structured location metadata.",
                "type": "object",
                "additionalProperties": {
                  "type": "string"
                },
                "x-go-type-skip-optional-pointer": true
              },
              "visibility": {
                "description": "Requested visibility scope. The server may downgrade a\nrequested `published` value to `private` for callers that\ndo not own the filter.\n",
                "type": "string",
                "enum": [
                  "private",
                  "public",
                  "published"
                ],
                "x-go-type-skip-optional-pointer": true
              },
              "catalogData": {
                "description": "Catalog metadata to attach when publishing.",
                "x-go-type": "catalogv1alpha2.CatalogData",
                "x-go-type-import": {
                  "path": "github.com/meshery/schemas/models/v1alpha2/catalog",
                  "name": "catalogv1alpha2"
                },
                "type": "object",
                "additionalProperties": false,
                "properties": {
                  "publishedVersion": {
                    "description": "Tracks the specific content version that has been made available in the Catalog.",
                    "type": "string",
                    "maxLength": 500
                  },
                  "class": {
                    "description": "Published content is classifed by its support level. Content classes help you understand the origin and expected support level for each piece of content. It is important to note that the level of support may vary within each class, and you should exercise discretion when using community-contributed content. Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable. Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility. Content produced and supported by the respective project or organization responsible for the specific technology. This class offers a level of support from the project maintainers themselves. Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Community content may have varying levels of support and reliability.",
                    "type": "string",
                    "oneOf": [
                      {
                        "const": "official",
                        "description": "Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable."
                      },
                      {
                        "const": "verified",
                        "description": "Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility."
                      },
                      {
                        "const": "reference architecture",
                        "description": "Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Reference architecture content may have varying levels of support and reliability."
                      }
                    ],
                    "maxLength": 500
                  },
                  "compatibility": {
                    "type": "array",
                    "title": "Model",
                    "items": {
                      "enum": [
                        "kubernetes"
                      ],
                      "type": "string"
                    },
                    "uniqueItems": true,
                    "minItems": 1,
                    "description": "One or more models associated with this catalog item. For designs, a list of one or more models implicated by components within the design. For models, this is self-referential."
                  },
                  "patternCaveats": {
                    "type": "string",
                    "title": "Caveats and Considerations",
                    "description": "Specific stipulations to consider and known behaviors to be aware of when using this design.",
                    "maxLength": 500
                  },
                  "patternInfo": {
                    "type": "string",
                    "title": "Description",
                    "minLength": 1,
                    "description": "Purpose of the design along with its intended and unintended uses."
                  },
                  "type": {
                    "type": "string",
                    "title": "Type",
                    "x-enum-casing-exempt": true,
                    "enum": [
                      "Deployment",
                      "Observability",
                      "Resiliency",
                      "Scaling",
                      "Security",
                      "Traffic-management",
                      "Troubleshooting",
                      "Workloads"
                    ],
                    "default": "Deployment",
                    "description": "Categorization of the type of design or operational flow depicted in this design."
                  },
                  "snapshotURL": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uri",
                      "pattern": "^(https?|http?|oci)://"
                    },
                    "description": "Contains reference to the dark and light mode snapshots of the design."
                  }
                },
                "required": [
                  "compatibility",
                  "patternCaveats",
                  "patternInfo",
                  "type"
                ]
              }
            }
          },
          "config": {
            "type": "string",
            "description": "Optional opaque configuration string passed through to the\nunderlying filter runtime. Persisted only on the local\nmeshery `MesheryFilterPayload` shape; meshery-cloud\ncurrently ignores the field, but it is documented here so\nthe canonical contract is single-sourced.\n",
            "maxLength": 65536
          }
        }
      },
      "MesheryFilterImportFormPayload": {
        "type": "object",
        "description": "Flat canonical representation of the filter import form that combines the UI-level uploadType discriminator with the union of properties from MesheryFilterPayload (filterFile, filterResource). This schema is the authoritative source for the canonical RJSF form schema at schemas/constructs/v1beta3/filter/forms/import.json. The server receives a MesheryFilterPayload; this form schema captures the superset of user-facing fields (including the UI-only uploadType discriminator) so the form schema can be validated as a subset of this canonical type.\n",
        "required": [
          "name",
          "uploadType"
        ],
        "properties": {
          "name": {
            "type": "string",
            "description": "Human-readable filter name.",
            "minLength": 1,
            "maxLength": 255
          },
          "uploadType": {
            "type": "string",
            "title": "Upload method",
            "x-enum-casing-exempt": true,
            "enum": [
              "File Upload",
              "URL Upload"
            ],
            "description": "UI-level discriminator that controls which import variant the form submits. \"File Upload\" maps to a base64-encoded filterFile body; \"URL Upload\" maps to a filterResource path/URL.\n"
          },
          "filterFile": {
            "type": "string",
            "format": "byte",
            "description": "Raw filter source as base64-encoded bytes. Required when uploadType is \"File Upload\".\n",
            "maxLength": 10485760
          },
          "filterResource": {
            "type": "string",
            "description": "Filter resource discriminator describing the body's source format (e.g. WASM module identifier or external resource path). Required when uploadType is \"URL Upload\".\n",
            "maxLength": 5000
          }
        }
      }
    }
  }
};

export default FilterSchema;
