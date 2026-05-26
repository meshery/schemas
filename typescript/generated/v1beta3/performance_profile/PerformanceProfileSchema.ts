/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const PerformanceProfileSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Performance Profile",
    "description": "OpenAPI schema for performance-profile management in Meshery and Meshery Cloud.",
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
  "servers": [
    {
      "url": "https://cloud.meshery.io",
      "description": "Meshery Cloud production server URL"
    },
    {
      "url": "https://staging-cloud.meshery.io",
      "description": "Meshery Cloud staging server URL"
    },
    {
      "url": "http://localhost:9876",
      "description": "Meshery Cloud development server URL (controlled via PORT environment variable)"
    }
  ],
  "security": [
    {
      "jwt": []
    }
  ],
  "tags": [
    {
      "name": "performance",
      "description": "APIs for managing Meshery performance profiles."
    }
  ],
  "paths": {
    "/api/performance-profiles": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "performance"
        ],
        "operationId": "getPerformanceProfiles",
        "summary": "List performance profiles",
        "description": "Returns the performance profiles owned by the authenticated user, with pagination, search, and ordering.",
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
            "name": "pagesize",
            "in": "query",
            "description": "Get responses by pagesize",
            "schema": {
              "type": "string"
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
          }
        ],
        "responses": {
          "200": {
            "description": "Performance profiles",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated list of performance profiles.",
                  "required": [
                    "page",
                    "pageSize",
                    "totalCount",
                    "profiles"
                  ],
                  "properties": {
                    "page": {
                      "type": "integer",
                      "description": "Zero-based page index returned in this response.",
                      "minimum": 0,
                      "maximum": 1000000,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "pageSize": {
                      "type": "integer",
                      "description": "Maximum number of items returned on each page.",
                      "minimum": 1,
                      "maximum": 1000,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "json": "pageSize"
                      }
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of performance profiles across all pages.",
                      "minimum": 0,
                      "maximum": 100000000,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "json": "totalCount"
                      }
                    },
                    "profiles": {
                      "type": "array",
                      "description": "Performance profiles in this page.",
                      "x-go-type-skip-optional-pointer": true,
                      "items": {
                        "x-go-type": "PerformanceProfile",
                        "$id": "https://schemas.meshery.io/performance_profile.yaml",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "title": "PerformanceProfile",
                        "description": "A performance profile captures the configuration for a load test run by Meshery against one or more service-mesh endpoints. Profiles are owned by a user and can optionally be associated with a recurring schedule. Learn more at https://docs.meshery.io/tasks/performance-management",
                        "additionalProperties": false,
                        "type": "object",
                        "required": [
                          "id",
                          "name",
                          "userId",
                          "createdAt",
                          "updatedAt"
                        ],
                        "properties": {
                          "id": {
                            "description": "Unique identifier for the performance profile.",
                            "x-order": 1,
                            "x-go-name": "ID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "id",
                              "json": "id"
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
                            "description": "Human-readable name of the performance profile.",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-order": 2,
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "name",
                              "json": "name"
                            }
                          },
                          "userId": {
                            "description": "User ID of the profile owner.",
                            "x-order": 3,
                            "x-go-name": "UserID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "user_id",
                              "json": "userId"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "schedule": {
                            "description": "Optional schedule ID associated with this performance profile. Null when the profile is not bound to a recurring schedule.",
                            "nullable": true,
                            "x-order": 4,
                            "x-oapi-codegen-extra-tags": {
                              "db": "schedule",
                              "json": "schedule,omitempty"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "loadGenerators": {
                            "type": "array",
                            "description": "Load generators (e.g. fortio, wrk2, nighthawk) to drive the profile's load test.",
                            "minItems": 1,
                            "items": {
                              "type": "string",
                              "description": "Identifier of a single load generator.",
                              "minLength": 1,
                              "maxLength": 64
                            },
                            "x-order": 5,
                            "x-go-type": "pq.StringArray",
                            "x-go-type-import": {
                              "path": "github.com/lib/pq"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "load_generators",
                              "json": "loadGenerators"
                            }
                          },
                          "endpoints": {
                            "type": "array",
                            "description": "Endpoints (URLs) targeted by the performance profile's load test.",
                            "minItems": 1,
                            "items": {
                              "type": "string",
                              "description": "A single endpoint URL targeted by the load test.",
                              "minLength": 1,
                              "maxLength": 2048
                            },
                            "x-order": 6,
                            "x-go-type": "pq.StringArray",
                            "x-go-type-import": {
                              "path": "github.com/lib/pq"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "endpoints",
                              "json": "endpoints"
                            }
                          },
                          "serviceMesh": {
                            "type": "string",
                            "description": "Service mesh under test for the profile (e.g. istio, linkerd, consul). Empty string when the profile is mesh-agnostic.",
                            "maxLength": 100,
                            "x-order": 7,
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "service_mesh",
                              "json": "serviceMesh"
                            }
                          },
                          "concurrentRequest": {
                            "type": "integer",
                            "description": "Number of concurrent requests issued by the load generator.",
                            "minimum": 1,
                            "maximum": 100000,
                            "x-order": 8,
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "concurrent_request",
                              "json": "concurrentRequest"
                            }
                          },
                          "qps": {
                            "type": "integer",
                            "description": "Target queries-per-second rate for the load generator. Zero indicates the generator runs unthrottled.",
                            "minimum": 0,
                            "maximum": 1000000,
                            "x-order": 9,
                            "x-go-name": "QPS",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "qps",
                              "json": "qps"
                            }
                          },
                          "duration": {
                            "type": "string",
                            "description": "Duration of the load test, expressed as a Go duration string (e.g. \"30s\", \"5m\", \"1h\").",
                            "minLength": 1,
                            "maxLength": 32,
                            "pattern": "^[0-9]+(\\.[0-9]+)?(ns|us|µs|ms|s|m|h)([0-9]+(\\.[0-9]+)?(ns|us|µs|ms|s|m|h))*$",
                            "x-order": 10,
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "duration",
                              "json": "duration"
                            }
                          },
                          "requestHeaders": {
                            "type": "string",
                            "description": "HTTP request headers, serialized as JSON, sent on each load-test request. Empty string when no headers are configured.",
                            "maxLength": 16384,
                            "x-order": 11,
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "request_headers",
                              "json": "requestHeaders"
                            }
                          },
                          "requestCookies": {
                            "type": "string",
                            "description": "HTTP request cookies, serialized as JSON, sent on each load-test request. Empty string when no cookies are configured.",
                            "maxLength": 16384,
                            "x-order": 12,
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "request_cookies",
                              "json": "requestCookies"
                            }
                          },
                          "requestBody": {
                            "type": "string",
                            "description": "HTTP request body sent on each load-test request. Empty string when no body is configured.",
                            "maxLength": 1048576,
                            "x-order": 13,
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "request_body",
                              "json": "requestBody"
                            }
                          },
                          "contentType": {
                            "type": "string",
                            "description": "Content-Type header value applied to each load-test request body (e.g. \"application/json\"). Empty string when no body is configured.",
                            "maxLength": 255,
                            "x-order": 14,
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "content_type",
                              "json": "contentType"
                            }
                          },
                          "metadata": {
                            "type": "object",
                            "description": "Free-form metadata associated with the performance profile.",
                            "additionalProperties": true,
                            "x-order": 15,
                            "x-go-type": "core.Map",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "metadata",
                              "json": "metadata"
                            }
                          },
                          "lastRun": {
                            "description": "Server-computed timestamp of the most recent load-test run that used this profile. Null until the first run completes. Server-managed; clients must not set this on create/update.",
                            "nullable": true,
                            "x-order": 16,
                            "x-oapi-codegen-extra-tags": {
                              "db": "last_run",
                              "json": "lastRun,omitempty"
                            },
                            "x-go-type": "NullTime",
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "totalResults": {
                            "type": "integer",
                            "description": "Server-computed count of load-test results recorded for this profile. Server-managed; clients must not set this on create/update.",
                            "minimum": 0,
                            "x-order": 17,
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "total_results",
                              "json": "totalResults"
                            }
                          },
                          "createdAt": {
                            "description": "Timestamp when the performance profile was created.",
                            "x-order": 18,
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "yaml": "created_at",
                              "json": "createdAt"
                            },
                            "x-go-type": "time.Time",
                            "type": "string",
                            "format": "date-time",
                            "x-go-name": "CreatedAt",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp when the performance profile was last updated.",
                            "x-order": 19,
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "yaml": "updated_at",
                              "json": "updatedAt"
                            },
                            "x-go-type": "time.Time",
                            "type": "string",
                            "format": "date-time",
                            "x-go-name": "UpdatedAt",
                            "x-go-type-skip-optional-pointer": true
                          }
                        }
                      }
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
      },
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "performance"
        ],
        "operationId": "upsertPerformanceProfile",
        "summary": "Create or update a performance profile",
        "description": "Creates a new performance profile when the body omits id, or updates the matching existing profile when an id is provided.",
        "requestBody": {
          "description": "Body for creating or updating a performance profile.",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for creating or updating a performance profile. Includes only client-settable fields; server-generated fields (id on create, createdAt, updatedAt, lastRun, totalResults) are populated by the server.",
                "required": [
                  "name",
                  "loadGenerators",
                  "endpoints",
                  "duration"
                ],
                "properties": {
                  "id": {
                    "description": "Existing performance-profile ID for updates; omit on create.",
                    "x-go-name": "ID",
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
                    "description": "Human-readable name of the performance profile.",
                    "minLength": 1,
                    "maxLength": 255,
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "name"
                    }
                  },
                  "userId": {
                    "description": "Owner user ID. When omitted, the server infers it from the authenticated user.",
                    "x-go-name": "UserID",
                    "x-oapi-codegen-extra-tags": {
                      "json": "userId,omitempty"
                    },
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  },
                  "schedule": {
                    "description": "Optional schedule ID associating the profile with a recurring run.",
                    "nullable": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "schedule,omitempty"
                    },
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  },
                  "loadGenerators": {
                    "type": "array",
                    "description": "Load generators (e.g. fortio, wrk2, nighthawk) to drive the profile's load test.",
                    "minItems": 1,
                    "items": {
                      "type": "string",
                      "description": "Identifier of a single load generator.",
                      "minLength": 1,
                      "maxLength": 64
                    },
                    "x-go-type": "pq.StringArray",
                    "x-go-type-import": {
                      "path": "github.com/lib/pq"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "loadGenerators"
                    }
                  },
                  "endpoints": {
                    "type": "array",
                    "description": "Endpoints (URLs) targeted by the performance profile's load test.",
                    "minItems": 1,
                    "items": {
                      "type": "string",
                      "description": "A single endpoint URL targeted by the load test.",
                      "minLength": 1,
                      "maxLength": 2048
                    },
                    "x-go-type": "pq.StringArray",
                    "x-go-type-import": {
                      "path": "github.com/lib/pq"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "endpoints"
                    }
                  },
                  "serviceMesh": {
                    "type": "string",
                    "description": "Service mesh under test for the profile (e.g. istio, linkerd, consul). Empty string when the profile is mesh-agnostic.",
                    "maxLength": 100,
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "serviceMesh,omitempty"
                    }
                  },
                  "concurrentRequest": {
                    "type": "integer",
                    "description": "Number of concurrent requests issued by the load generator.",
                    "minimum": 1,
                    "maximum": 100000,
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "concurrentRequest,omitempty"
                    }
                  },
                  "qps": {
                    "type": "integer",
                    "description": "Target queries-per-second rate for the load generator. Zero indicates the generator runs unthrottled.",
                    "minimum": 0,
                    "maximum": 1000000,
                    "x-go-name": "QPS",
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "qps,omitempty"
                    }
                  },
                  "duration": {
                    "type": "string",
                    "description": "Duration of the load test, expressed as a Go duration string (e.g. \"30s\", \"5m\", \"1h\").",
                    "minLength": 1,
                    "maxLength": 32,
                    "pattern": "^[0-9]+(\\.[0-9]+)?(ns|us|µs|ms|s|m|h)([0-9]+(\\.[0-9]+)?(ns|us|µs|ms|s|m|h))*$",
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "duration"
                    }
                  },
                  "requestHeaders": {
                    "type": "string",
                    "description": "HTTP request headers, serialized as JSON, sent on each load-test request.",
                    "maxLength": 16384,
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "requestHeaders,omitempty"
                    }
                  },
                  "requestCookies": {
                    "type": "string",
                    "description": "HTTP request cookies, serialized as JSON, sent on each load-test request.",
                    "maxLength": 16384,
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "requestCookies,omitempty"
                    }
                  },
                  "requestBody": {
                    "type": "string",
                    "description": "HTTP request body sent on each load-test request.",
                    "maxLength": 1048576,
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "requestBody,omitempty"
                    }
                  },
                  "contentType": {
                    "type": "string",
                    "description": "Content-Type header value applied to each load-test request body (e.g. \"application/json\").",
                    "maxLength": 255,
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "contentType,omitempty"
                    }
                  },
                  "metadata": {
                    "type": "object",
                    "description": "Free-form metadata associated with the performance profile.",
                    "additionalProperties": true,
                    "x-go-type": "core.Map",
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "metadata,omitempty"
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Performance profile upserted",
            "content": {
              "application/json": {
                "schema": {
                  "$id": "https://schemas.meshery.io/performance_profile.yaml",
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "PerformanceProfile",
                  "description": "A performance profile captures the configuration for a load test run by Meshery against one or more service-mesh endpoints. Profiles are owned by a user and can optionally be associated with a recurring schedule. Learn more at https://docs.meshery.io/tasks/performance-management",
                  "additionalProperties": false,
                  "type": "object",
                  "required": [
                    "id",
                    "name",
                    "userId",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Unique identifier for the performance profile.",
                      "x-order": 1,
                      "x-go-name": "ID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id",
                        "json": "id"
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
                      "description": "Human-readable name of the performance profile.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-order": 2,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name",
                        "json": "name"
                      }
                    },
                    "userId": {
                      "description": "User ID of the profile owner.",
                      "x-order": 3,
                      "x-go-name": "UserID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "user_id",
                        "json": "userId"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "schedule": {
                      "description": "Optional schedule ID associated with this performance profile. Null when the profile is not bound to a recurring schedule.",
                      "nullable": true,
                      "x-order": 4,
                      "x-oapi-codegen-extra-tags": {
                        "db": "schedule",
                        "json": "schedule,omitempty"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "loadGenerators": {
                      "type": "array",
                      "description": "Load generators (e.g. fortio, wrk2, nighthawk) to drive the profile's load test.",
                      "minItems": 1,
                      "items": {
                        "type": "string",
                        "description": "Identifier of a single load generator.",
                        "minLength": 1,
                        "maxLength": 64
                      },
                      "x-order": 5,
                      "x-go-type": "pq.StringArray",
                      "x-go-type-import": {
                        "path": "github.com/lib/pq"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "load_generators",
                        "json": "loadGenerators"
                      }
                    },
                    "endpoints": {
                      "type": "array",
                      "description": "Endpoints (URLs) targeted by the performance profile's load test.",
                      "minItems": 1,
                      "items": {
                        "type": "string",
                        "description": "A single endpoint URL targeted by the load test.",
                        "minLength": 1,
                        "maxLength": 2048
                      },
                      "x-order": 6,
                      "x-go-type": "pq.StringArray",
                      "x-go-type-import": {
                        "path": "github.com/lib/pq"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "endpoints",
                        "json": "endpoints"
                      }
                    },
                    "serviceMesh": {
                      "type": "string",
                      "description": "Service mesh under test for the profile (e.g. istio, linkerd, consul). Empty string when the profile is mesh-agnostic.",
                      "maxLength": 100,
                      "x-order": 7,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "service_mesh",
                        "json": "serviceMesh"
                      }
                    },
                    "concurrentRequest": {
                      "type": "integer",
                      "description": "Number of concurrent requests issued by the load generator.",
                      "minimum": 1,
                      "maximum": 100000,
                      "x-order": 8,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "concurrent_request",
                        "json": "concurrentRequest"
                      }
                    },
                    "qps": {
                      "type": "integer",
                      "description": "Target queries-per-second rate for the load generator. Zero indicates the generator runs unthrottled.",
                      "minimum": 0,
                      "maximum": 1000000,
                      "x-order": 9,
                      "x-go-name": "QPS",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "qps",
                        "json": "qps"
                      }
                    },
                    "duration": {
                      "type": "string",
                      "description": "Duration of the load test, expressed as a Go duration string (e.g. \"30s\", \"5m\", \"1h\").",
                      "minLength": 1,
                      "maxLength": 32,
                      "pattern": "^[0-9]+(\\.[0-9]+)?(ns|us|µs|ms|s|m|h)([0-9]+(\\.[0-9]+)?(ns|us|µs|ms|s|m|h))*$",
                      "x-order": 10,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "duration",
                        "json": "duration"
                      }
                    },
                    "requestHeaders": {
                      "type": "string",
                      "description": "HTTP request headers, serialized as JSON, sent on each load-test request. Empty string when no headers are configured.",
                      "maxLength": 16384,
                      "x-order": 11,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "request_headers",
                        "json": "requestHeaders"
                      }
                    },
                    "requestCookies": {
                      "type": "string",
                      "description": "HTTP request cookies, serialized as JSON, sent on each load-test request. Empty string when no cookies are configured.",
                      "maxLength": 16384,
                      "x-order": 12,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "request_cookies",
                        "json": "requestCookies"
                      }
                    },
                    "requestBody": {
                      "type": "string",
                      "description": "HTTP request body sent on each load-test request. Empty string when no body is configured.",
                      "maxLength": 1048576,
                      "x-order": 13,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "request_body",
                        "json": "requestBody"
                      }
                    },
                    "contentType": {
                      "type": "string",
                      "description": "Content-Type header value applied to each load-test request body (e.g. \"application/json\"). Empty string when no body is configured.",
                      "maxLength": 255,
                      "x-order": 14,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "content_type",
                        "json": "contentType"
                      }
                    },
                    "metadata": {
                      "type": "object",
                      "description": "Free-form metadata associated with the performance profile.",
                      "additionalProperties": true,
                      "x-order": 15,
                      "x-go-type": "core.Map",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata",
                        "json": "metadata"
                      }
                    },
                    "lastRun": {
                      "description": "Server-computed timestamp of the most recent load-test run that used this profile. Null until the first run completes. Server-managed; clients must not set this on create/update.",
                      "nullable": true,
                      "x-order": 16,
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_run",
                        "json": "lastRun,omitempty"
                      },
                      "x-go-type": "NullTime",
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "totalResults": {
                      "type": "integer",
                      "description": "Server-computed count of load-test results recorded for this profile. Server-managed; clients must not set this on create/update.",
                      "minimum": 0,
                      "x-order": 17,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "total_results",
                        "json": "totalResults"
                      }
                    },
                    "createdAt": {
                      "description": "Timestamp when the performance profile was created.",
                      "x-order": 18,
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "yaml": "created_at",
                        "json": "createdAt"
                      },
                      "x-go-type": "time.Time",
                      "type": "string",
                      "format": "date-time",
                      "x-go-name": "CreatedAt",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp when the performance profile was last updated.",
                      "x-order": 19,
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "yaml": "updated_at",
                        "json": "updatedAt"
                      },
                      "x-go-type": "time.Time",
                      "type": "string",
                      "format": "date-time",
                      "x-go-name": "UpdatedAt",
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
    "/api/performance-profiles/{performanceProfileId}": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "performance"
        ],
        "operationId": "getPerformanceProfile",
        "summary": "Get a performance profile by ID",
        "description": "Returns a single performance profile owned by (or visible to) the authenticated user.",
        "parameters": [
          {
            "name": "performanceProfileId",
            "in": "path",
            "description": "Performance profile ID.",
            "schema": {
              "type": "string",
              "format": "uuid",
              "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              }
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "Performance profile",
            "content": {
              "application/json": {
                "schema": {
                  "$id": "https://schemas.meshery.io/performance_profile.yaml",
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "PerformanceProfile",
                  "description": "A performance profile captures the configuration for a load test run by Meshery against one or more service-mesh endpoints. Profiles are owned by a user and can optionally be associated with a recurring schedule. Learn more at https://docs.meshery.io/tasks/performance-management",
                  "additionalProperties": false,
                  "type": "object",
                  "required": [
                    "id",
                    "name",
                    "userId",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Unique identifier for the performance profile.",
                      "x-order": 1,
                      "x-go-name": "ID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id",
                        "json": "id"
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
                      "description": "Human-readable name of the performance profile.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-order": 2,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name",
                        "json": "name"
                      }
                    },
                    "userId": {
                      "description": "User ID of the profile owner.",
                      "x-order": 3,
                      "x-go-name": "UserID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "user_id",
                        "json": "userId"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "schedule": {
                      "description": "Optional schedule ID associated with this performance profile. Null when the profile is not bound to a recurring schedule.",
                      "nullable": true,
                      "x-order": 4,
                      "x-oapi-codegen-extra-tags": {
                        "db": "schedule",
                        "json": "schedule,omitempty"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "loadGenerators": {
                      "type": "array",
                      "description": "Load generators (e.g. fortio, wrk2, nighthawk) to drive the profile's load test.",
                      "minItems": 1,
                      "items": {
                        "type": "string",
                        "description": "Identifier of a single load generator.",
                        "minLength": 1,
                        "maxLength": 64
                      },
                      "x-order": 5,
                      "x-go-type": "pq.StringArray",
                      "x-go-type-import": {
                        "path": "github.com/lib/pq"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "load_generators",
                        "json": "loadGenerators"
                      }
                    },
                    "endpoints": {
                      "type": "array",
                      "description": "Endpoints (URLs) targeted by the performance profile's load test.",
                      "minItems": 1,
                      "items": {
                        "type": "string",
                        "description": "A single endpoint URL targeted by the load test.",
                        "minLength": 1,
                        "maxLength": 2048
                      },
                      "x-order": 6,
                      "x-go-type": "pq.StringArray",
                      "x-go-type-import": {
                        "path": "github.com/lib/pq"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "endpoints",
                        "json": "endpoints"
                      }
                    },
                    "serviceMesh": {
                      "type": "string",
                      "description": "Service mesh under test for the profile (e.g. istio, linkerd, consul). Empty string when the profile is mesh-agnostic.",
                      "maxLength": 100,
                      "x-order": 7,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "service_mesh",
                        "json": "serviceMesh"
                      }
                    },
                    "concurrentRequest": {
                      "type": "integer",
                      "description": "Number of concurrent requests issued by the load generator.",
                      "minimum": 1,
                      "maximum": 100000,
                      "x-order": 8,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "concurrent_request",
                        "json": "concurrentRequest"
                      }
                    },
                    "qps": {
                      "type": "integer",
                      "description": "Target queries-per-second rate for the load generator. Zero indicates the generator runs unthrottled.",
                      "minimum": 0,
                      "maximum": 1000000,
                      "x-order": 9,
                      "x-go-name": "QPS",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "qps",
                        "json": "qps"
                      }
                    },
                    "duration": {
                      "type": "string",
                      "description": "Duration of the load test, expressed as a Go duration string (e.g. \"30s\", \"5m\", \"1h\").",
                      "minLength": 1,
                      "maxLength": 32,
                      "pattern": "^[0-9]+(\\.[0-9]+)?(ns|us|µs|ms|s|m|h)([0-9]+(\\.[0-9]+)?(ns|us|µs|ms|s|m|h))*$",
                      "x-order": 10,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "duration",
                        "json": "duration"
                      }
                    },
                    "requestHeaders": {
                      "type": "string",
                      "description": "HTTP request headers, serialized as JSON, sent on each load-test request. Empty string when no headers are configured.",
                      "maxLength": 16384,
                      "x-order": 11,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "request_headers",
                        "json": "requestHeaders"
                      }
                    },
                    "requestCookies": {
                      "type": "string",
                      "description": "HTTP request cookies, serialized as JSON, sent on each load-test request. Empty string when no cookies are configured.",
                      "maxLength": 16384,
                      "x-order": 12,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "request_cookies",
                        "json": "requestCookies"
                      }
                    },
                    "requestBody": {
                      "type": "string",
                      "description": "HTTP request body sent on each load-test request. Empty string when no body is configured.",
                      "maxLength": 1048576,
                      "x-order": 13,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "request_body",
                        "json": "requestBody"
                      }
                    },
                    "contentType": {
                      "type": "string",
                      "description": "Content-Type header value applied to each load-test request body (e.g. \"application/json\"). Empty string when no body is configured.",
                      "maxLength": 255,
                      "x-order": 14,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "content_type",
                        "json": "contentType"
                      }
                    },
                    "metadata": {
                      "type": "object",
                      "description": "Free-form metadata associated with the performance profile.",
                      "additionalProperties": true,
                      "x-order": 15,
                      "x-go-type": "core.Map",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata",
                        "json": "metadata"
                      }
                    },
                    "lastRun": {
                      "description": "Server-computed timestamp of the most recent load-test run that used this profile. Null until the first run completes. Server-managed; clients must not set this on create/update.",
                      "nullable": true,
                      "x-order": 16,
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_run",
                        "json": "lastRun,omitempty"
                      },
                      "x-go-type": "NullTime",
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "totalResults": {
                      "type": "integer",
                      "description": "Server-computed count of load-test results recorded for this profile. Server-managed; clients must not set this on create/update.",
                      "minimum": 0,
                      "x-order": 17,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "total_results",
                        "json": "totalResults"
                      }
                    },
                    "createdAt": {
                      "description": "Timestamp when the performance profile was created.",
                      "x-order": 18,
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "yaml": "created_at",
                        "json": "createdAt"
                      },
                      "x-go-type": "time.Time",
                      "type": "string",
                      "format": "date-time",
                      "x-go-name": "CreatedAt",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp when the performance profile was last updated.",
                      "x-order": 19,
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "yaml": "updated_at",
                        "json": "updatedAt"
                      },
                      "x-go-type": "time.Time",
                      "type": "string",
                      "format": "date-time",
                      "x-go-name": "UpdatedAt",
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
          "performance"
        ],
        "operationId": "updatePerformanceProfile",
        "summary": "Update a performance profile",
        "description": "Updates the performance profile identified by the path parameter.",
        "parameters": [
          {
            "name": "performanceProfileId",
            "in": "path",
            "description": "Performance profile ID.",
            "schema": {
              "type": "string",
              "format": "uuid",
              "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              }
            },
            "required": true
          }
        ],
        "requestBody": {
          "description": "Body for creating or updating a performance profile.",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for creating or updating a performance profile. Includes only client-settable fields; server-generated fields (id on create, createdAt, updatedAt, lastRun, totalResults) are populated by the server.",
                "required": [
                  "name",
                  "loadGenerators",
                  "endpoints",
                  "duration"
                ],
                "properties": {
                  "id": {
                    "description": "Existing performance-profile ID for updates; omit on create.",
                    "x-go-name": "ID",
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
                    "description": "Human-readable name of the performance profile.",
                    "minLength": 1,
                    "maxLength": 255,
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "name"
                    }
                  },
                  "userId": {
                    "description": "Owner user ID. When omitted, the server infers it from the authenticated user.",
                    "x-go-name": "UserID",
                    "x-oapi-codegen-extra-tags": {
                      "json": "userId,omitempty"
                    },
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  },
                  "schedule": {
                    "description": "Optional schedule ID associating the profile with a recurring run.",
                    "nullable": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "schedule,omitempty"
                    },
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  },
                  "loadGenerators": {
                    "type": "array",
                    "description": "Load generators (e.g. fortio, wrk2, nighthawk) to drive the profile's load test.",
                    "minItems": 1,
                    "items": {
                      "type": "string",
                      "description": "Identifier of a single load generator.",
                      "minLength": 1,
                      "maxLength": 64
                    },
                    "x-go-type": "pq.StringArray",
                    "x-go-type-import": {
                      "path": "github.com/lib/pq"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "loadGenerators"
                    }
                  },
                  "endpoints": {
                    "type": "array",
                    "description": "Endpoints (URLs) targeted by the performance profile's load test.",
                    "minItems": 1,
                    "items": {
                      "type": "string",
                      "description": "A single endpoint URL targeted by the load test.",
                      "minLength": 1,
                      "maxLength": 2048
                    },
                    "x-go-type": "pq.StringArray",
                    "x-go-type-import": {
                      "path": "github.com/lib/pq"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "endpoints"
                    }
                  },
                  "serviceMesh": {
                    "type": "string",
                    "description": "Service mesh under test for the profile (e.g. istio, linkerd, consul). Empty string when the profile is mesh-agnostic.",
                    "maxLength": 100,
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "serviceMesh,omitempty"
                    }
                  },
                  "concurrentRequest": {
                    "type": "integer",
                    "description": "Number of concurrent requests issued by the load generator.",
                    "minimum": 1,
                    "maximum": 100000,
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "concurrentRequest,omitempty"
                    }
                  },
                  "qps": {
                    "type": "integer",
                    "description": "Target queries-per-second rate for the load generator. Zero indicates the generator runs unthrottled.",
                    "minimum": 0,
                    "maximum": 1000000,
                    "x-go-name": "QPS",
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "qps,omitempty"
                    }
                  },
                  "duration": {
                    "type": "string",
                    "description": "Duration of the load test, expressed as a Go duration string (e.g. \"30s\", \"5m\", \"1h\").",
                    "minLength": 1,
                    "maxLength": 32,
                    "pattern": "^[0-9]+(\\.[0-9]+)?(ns|us|µs|ms|s|m|h)([0-9]+(\\.[0-9]+)?(ns|us|µs|ms|s|m|h))*$",
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "duration"
                    }
                  },
                  "requestHeaders": {
                    "type": "string",
                    "description": "HTTP request headers, serialized as JSON, sent on each load-test request.",
                    "maxLength": 16384,
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "requestHeaders,omitempty"
                    }
                  },
                  "requestCookies": {
                    "type": "string",
                    "description": "HTTP request cookies, serialized as JSON, sent on each load-test request.",
                    "maxLength": 16384,
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "requestCookies,omitempty"
                    }
                  },
                  "requestBody": {
                    "type": "string",
                    "description": "HTTP request body sent on each load-test request.",
                    "maxLength": 1048576,
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "requestBody,omitempty"
                    }
                  },
                  "contentType": {
                    "type": "string",
                    "description": "Content-Type header value applied to each load-test request body (e.g. \"application/json\").",
                    "maxLength": 255,
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "contentType,omitempty"
                    }
                  },
                  "metadata": {
                    "type": "object",
                    "description": "Free-form metadata associated with the performance profile.",
                    "additionalProperties": true,
                    "x-go-type": "core.Map",
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "metadata,omitempty"
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Performance profile",
            "content": {
              "application/json": {
                "schema": {
                  "$id": "https://schemas.meshery.io/performance_profile.yaml",
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "PerformanceProfile",
                  "description": "A performance profile captures the configuration for a load test run by Meshery against one or more service-mesh endpoints. Profiles are owned by a user and can optionally be associated with a recurring schedule. Learn more at https://docs.meshery.io/tasks/performance-management",
                  "additionalProperties": false,
                  "type": "object",
                  "required": [
                    "id",
                    "name",
                    "userId",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Unique identifier for the performance profile.",
                      "x-order": 1,
                      "x-go-name": "ID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id",
                        "json": "id"
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
                      "description": "Human-readable name of the performance profile.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-order": 2,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name",
                        "json": "name"
                      }
                    },
                    "userId": {
                      "description": "User ID of the profile owner.",
                      "x-order": 3,
                      "x-go-name": "UserID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "user_id",
                        "json": "userId"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "schedule": {
                      "description": "Optional schedule ID associated with this performance profile. Null when the profile is not bound to a recurring schedule.",
                      "nullable": true,
                      "x-order": 4,
                      "x-oapi-codegen-extra-tags": {
                        "db": "schedule",
                        "json": "schedule,omitempty"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "loadGenerators": {
                      "type": "array",
                      "description": "Load generators (e.g. fortio, wrk2, nighthawk) to drive the profile's load test.",
                      "minItems": 1,
                      "items": {
                        "type": "string",
                        "description": "Identifier of a single load generator.",
                        "minLength": 1,
                        "maxLength": 64
                      },
                      "x-order": 5,
                      "x-go-type": "pq.StringArray",
                      "x-go-type-import": {
                        "path": "github.com/lib/pq"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "load_generators",
                        "json": "loadGenerators"
                      }
                    },
                    "endpoints": {
                      "type": "array",
                      "description": "Endpoints (URLs) targeted by the performance profile's load test.",
                      "minItems": 1,
                      "items": {
                        "type": "string",
                        "description": "A single endpoint URL targeted by the load test.",
                        "minLength": 1,
                        "maxLength": 2048
                      },
                      "x-order": 6,
                      "x-go-type": "pq.StringArray",
                      "x-go-type-import": {
                        "path": "github.com/lib/pq"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "endpoints",
                        "json": "endpoints"
                      }
                    },
                    "serviceMesh": {
                      "type": "string",
                      "description": "Service mesh under test for the profile (e.g. istio, linkerd, consul). Empty string when the profile is mesh-agnostic.",
                      "maxLength": 100,
                      "x-order": 7,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "service_mesh",
                        "json": "serviceMesh"
                      }
                    },
                    "concurrentRequest": {
                      "type": "integer",
                      "description": "Number of concurrent requests issued by the load generator.",
                      "minimum": 1,
                      "maximum": 100000,
                      "x-order": 8,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "concurrent_request",
                        "json": "concurrentRequest"
                      }
                    },
                    "qps": {
                      "type": "integer",
                      "description": "Target queries-per-second rate for the load generator. Zero indicates the generator runs unthrottled.",
                      "minimum": 0,
                      "maximum": 1000000,
                      "x-order": 9,
                      "x-go-name": "QPS",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "qps",
                        "json": "qps"
                      }
                    },
                    "duration": {
                      "type": "string",
                      "description": "Duration of the load test, expressed as a Go duration string (e.g. \"30s\", \"5m\", \"1h\").",
                      "minLength": 1,
                      "maxLength": 32,
                      "pattern": "^[0-9]+(\\.[0-9]+)?(ns|us|µs|ms|s|m|h)([0-9]+(\\.[0-9]+)?(ns|us|µs|ms|s|m|h))*$",
                      "x-order": 10,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "duration",
                        "json": "duration"
                      }
                    },
                    "requestHeaders": {
                      "type": "string",
                      "description": "HTTP request headers, serialized as JSON, sent on each load-test request. Empty string when no headers are configured.",
                      "maxLength": 16384,
                      "x-order": 11,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "request_headers",
                        "json": "requestHeaders"
                      }
                    },
                    "requestCookies": {
                      "type": "string",
                      "description": "HTTP request cookies, serialized as JSON, sent on each load-test request. Empty string when no cookies are configured.",
                      "maxLength": 16384,
                      "x-order": 12,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "request_cookies",
                        "json": "requestCookies"
                      }
                    },
                    "requestBody": {
                      "type": "string",
                      "description": "HTTP request body sent on each load-test request. Empty string when no body is configured.",
                      "maxLength": 1048576,
                      "x-order": 13,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "request_body",
                        "json": "requestBody"
                      }
                    },
                    "contentType": {
                      "type": "string",
                      "description": "Content-Type header value applied to each load-test request body (e.g. \"application/json\"). Empty string when no body is configured.",
                      "maxLength": 255,
                      "x-order": 14,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "content_type",
                        "json": "contentType"
                      }
                    },
                    "metadata": {
                      "type": "object",
                      "description": "Free-form metadata associated with the performance profile.",
                      "additionalProperties": true,
                      "x-order": 15,
                      "x-go-type": "core.Map",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata",
                        "json": "metadata"
                      }
                    },
                    "lastRun": {
                      "description": "Server-computed timestamp of the most recent load-test run that used this profile. Null until the first run completes. Server-managed; clients must not set this on create/update.",
                      "nullable": true,
                      "x-order": 16,
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_run",
                        "json": "lastRun,omitempty"
                      },
                      "x-go-type": "NullTime",
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "totalResults": {
                      "type": "integer",
                      "description": "Server-computed count of load-test results recorded for this profile. Server-managed; clients must not set this on create/update.",
                      "minimum": 0,
                      "x-order": 17,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "total_results",
                        "json": "totalResults"
                      }
                    },
                    "createdAt": {
                      "description": "Timestamp when the performance profile was created.",
                      "x-order": 18,
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "yaml": "created_at",
                        "json": "createdAt"
                      },
                      "x-go-type": "time.Time",
                      "type": "string",
                      "format": "date-time",
                      "x-go-name": "CreatedAt",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp when the performance profile was last updated.",
                      "x-order": 19,
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "yaml": "updated_at",
                        "json": "updatedAt"
                      },
                      "x-go-type": "time.Time",
                      "type": "string",
                      "format": "date-time",
                      "x-go-name": "UpdatedAt",
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
          "performance"
        ],
        "operationId": "deletePerformanceProfile",
        "summary": "Delete a performance profile",
        "description": "Deletes the performance profile identified by the path parameter and any associated performance results.",
        "parameters": [
          {
            "name": "performanceProfileId",
            "in": "path",
            "description": "Performance profile ID.",
            "schema": {
              "type": "string",
              "format": "uuid",
              "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              }
            },
            "required": true
          }
        ],
        "responses": {
          "204": {
            "description": "Performance profile deleted"
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
    "responses": {
      "200": {
        "description": "ok",
        "content": {
          "text/plain": {
            "schema": {
              "type": "string"
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
    },
    "parameters": {
      "performanceProfileId": {
        "name": "performanceProfileId",
        "in": "path",
        "description": "Performance profile ID.",
        "schema": {
          "type": "string",
          "format": "uuid",
          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
          "x-go-type": "uuid.UUID",
          "x-go-type-import": {
            "path": "github.com/gofrs/uuid"
          }
        },
        "required": true
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
      "page": {
        "name": "page",
        "in": "query",
        "description": "Get responses by page",
        "schema": {
          "type": "string"
        }
      },
      "pagesize": {
        "name": "pagesize",
        "in": "query",
        "description": "Get responses by pagesize",
        "schema": {
          "type": "string"
        }
      }
    },
    "securitySchemes": {
      "jwt": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    },
    "schemas": {
      "PerformanceProfile": {
        "$id": "https://schemas.meshery.io/performance_profile.yaml",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "PerformanceProfile",
        "description": "A performance profile captures the configuration for a load test run by Meshery against one or more service-mesh endpoints. Profiles are owned by a user and can optionally be associated with a recurring schedule. Learn more at https://docs.meshery.io/tasks/performance-management",
        "additionalProperties": false,
        "type": "object",
        "required": [
          "id",
          "name",
          "userId",
          "createdAt",
          "updatedAt"
        ],
        "properties": {
          "id": {
            "description": "Unique identifier for the performance profile.",
            "x-order": 1,
            "x-go-name": "ID",
            "x-oapi-codegen-extra-tags": {
              "db": "id",
              "json": "id"
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
            "description": "Human-readable name of the performance profile.",
            "minLength": 1,
            "maxLength": 255,
            "x-order": 2,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "name",
              "json": "name"
            }
          },
          "userId": {
            "description": "User ID of the profile owner.",
            "x-order": 3,
            "x-go-name": "UserID",
            "x-oapi-codegen-extra-tags": {
              "db": "user_id",
              "json": "userId"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "schedule": {
            "description": "Optional schedule ID associated with this performance profile. Null when the profile is not bound to a recurring schedule.",
            "nullable": true,
            "x-order": 4,
            "x-oapi-codegen-extra-tags": {
              "db": "schedule",
              "json": "schedule,omitempty"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "loadGenerators": {
            "type": "array",
            "description": "Load generators (e.g. fortio, wrk2, nighthawk) to drive the profile's load test.",
            "minItems": 1,
            "items": {
              "type": "string",
              "description": "Identifier of a single load generator.",
              "minLength": 1,
              "maxLength": 64
            },
            "x-order": 5,
            "x-go-type": "pq.StringArray",
            "x-go-type-import": {
              "path": "github.com/lib/pq"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "load_generators",
              "json": "loadGenerators"
            }
          },
          "endpoints": {
            "type": "array",
            "description": "Endpoints (URLs) targeted by the performance profile's load test.",
            "minItems": 1,
            "items": {
              "type": "string",
              "description": "A single endpoint URL targeted by the load test.",
              "minLength": 1,
              "maxLength": 2048
            },
            "x-order": 6,
            "x-go-type": "pq.StringArray",
            "x-go-type-import": {
              "path": "github.com/lib/pq"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "endpoints",
              "json": "endpoints"
            }
          },
          "serviceMesh": {
            "type": "string",
            "description": "Service mesh under test for the profile (e.g. istio, linkerd, consul). Empty string when the profile is mesh-agnostic.",
            "maxLength": 100,
            "x-order": 7,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "service_mesh",
              "json": "serviceMesh"
            }
          },
          "concurrentRequest": {
            "type": "integer",
            "description": "Number of concurrent requests issued by the load generator.",
            "minimum": 1,
            "maximum": 100000,
            "x-order": 8,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "concurrent_request",
              "json": "concurrentRequest"
            }
          },
          "qps": {
            "type": "integer",
            "description": "Target queries-per-second rate for the load generator. Zero indicates the generator runs unthrottled.",
            "minimum": 0,
            "maximum": 1000000,
            "x-order": 9,
            "x-go-name": "QPS",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "qps",
              "json": "qps"
            }
          },
          "duration": {
            "type": "string",
            "description": "Duration of the load test, expressed as a Go duration string (e.g. \"30s\", \"5m\", \"1h\").",
            "minLength": 1,
            "maxLength": 32,
            "pattern": "^[0-9]+(\\.[0-9]+)?(ns|us|µs|ms|s|m|h)([0-9]+(\\.[0-9]+)?(ns|us|µs|ms|s|m|h))*$",
            "x-order": 10,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "duration",
              "json": "duration"
            }
          },
          "requestHeaders": {
            "type": "string",
            "description": "HTTP request headers, serialized as JSON, sent on each load-test request. Empty string when no headers are configured.",
            "maxLength": 16384,
            "x-order": 11,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "request_headers",
              "json": "requestHeaders"
            }
          },
          "requestCookies": {
            "type": "string",
            "description": "HTTP request cookies, serialized as JSON, sent on each load-test request. Empty string when no cookies are configured.",
            "maxLength": 16384,
            "x-order": 12,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "request_cookies",
              "json": "requestCookies"
            }
          },
          "requestBody": {
            "type": "string",
            "description": "HTTP request body sent on each load-test request. Empty string when no body is configured.",
            "maxLength": 1048576,
            "x-order": 13,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "request_body",
              "json": "requestBody"
            }
          },
          "contentType": {
            "type": "string",
            "description": "Content-Type header value applied to each load-test request body (e.g. \"application/json\"). Empty string when no body is configured.",
            "maxLength": 255,
            "x-order": 14,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "content_type",
              "json": "contentType"
            }
          },
          "metadata": {
            "type": "object",
            "description": "Free-form metadata associated with the performance profile.",
            "additionalProperties": true,
            "x-order": 15,
            "x-go-type": "core.Map",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "metadata",
              "json": "metadata"
            }
          },
          "lastRun": {
            "description": "Server-computed timestamp of the most recent load-test run that used this profile. Null until the first run completes. Server-managed; clients must not set this on create/update.",
            "nullable": true,
            "x-order": 16,
            "x-oapi-codegen-extra-tags": {
              "db": "last_run",
              "json": "lastRun,omitempty"
            },
            "x-go-type": "NullTime",
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "totalResults": {
            "type": "integer",
            "description": "Server-computed count of load-test results recorded for this profile. Server-managed; clients must not set this on create/update.",
            "minimum": 0,
            "x-order": 17,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "total_results",
              "json": "totalResults"
            }
          },
          "createdAt": {
            "description": "Timestamp when the performance profile was created.",
            "x-order": 18,
            "x-oapi-codegen-extra-tags": {
              "db": "created_at",
              "yaml": "created_at",
              "json": "createdAt"
            },
            "x-go-type": "time.Time",
            "type": "string",
            "format": "date-time",
            "x-go-name": "CreatedAt",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp when the performance profile was last updated.",
            "x-order": 19,
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at",
              "yaml": "updated_at",
              "json": "updatedAt"
            },
            "x-go-type": "time.Time",
            "type": "string",
            "format": "date-time",
            "x-go-name": "UpdatedAt",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "PerformanceProfilePayload": {
        "type": "object",
        "description": "Payload for creating or updating a performance profile. Includes only client-settable fields; server-generated fields (id on create, createdAt, updatedAt, lastRun, totalResults) are populated by the server.",
        "required": [
          "name",
          "loadGenerators",
          "endpoints",
          "duration"
        ],
        "properties": {
          "id": {
            "description": "Existing performance-profile ID for updates; omit on create.",
            "x-go-name": "ID",
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
            "description": "Human-readable name of the performance profile.",
            "minLength": 1,
            "maxLength": 255,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "name"
            }
          },
          "userId": {
            "description": "Owner user ID. When omitted, the server infers it from the authenticated user.",
            "x-go-name": "UserID",
            "x-oapi-codegen-extra-tags": {
              "json": "userId,omitempty"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "schedule": {
            "description": "Optional schedule ID associating the profile with a recurring run.",
            "nullable": true,
            "x-oapi-codegen-extra-tags": {
              "json": "schedule,omitempty"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "loadGenerators": {
            "type": "array",
            "description": "Load generators (e.g. fortio, wrk2, nighthawk) to drive the profile's load test.",
            "minItems": 1,
            "items": {
              "type": "string",
              "description": "Identifier of a single load generator.",
              "minLength": 1,
              "maxLength": 64
            },
            "x-go-type": "pq.StringArray",
            "x-go-type-import": {
              "path": "github.com/lib/pq"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "loadGenerators"
            }
          },
          "endpoints": {
            "type": "array",
            "description": "Endpoints (URLs) targeted by the performance profile's load test.",
            "minItems": 1,
            "items": {
              "type": "string",
              "description": "A single endpoint URL targeted by the load test.",
              "minLength": 1,
              "maxLength": 2048
            },
            "x-go-type": "pq.StringArray",
            "x-go-type-import": {
              "path": "github.com/lib/pq"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "endpoints"
            }
          },
          "serviceMesh": {
            "type": "string",
            "description": "Service mesh under test for the profile (e.g. istio, linkerd, consul). Empty string when the profile is mesh-agnostic.",
            "maxLength": 100,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "serviceMesh,omitempty"
            }
          },
          "concurrentRequest": {
            "type": "integer",
            "description": "Number of concurrent requests issued by the load generator.",
            "minimum": 1,
            "maximum": 100000,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "concurrentRequest,omitempty"
            }
          },
          "qps": {
            "type": "integer",
            "description": "Target queries-per-second rate for the load generator. Zero indicates the generator runs unthrottled.",
            "minimum": 0,
            "maximum": 1000000,
            "x-go-name": "QPS",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "qps,omitempty"
            }
          },
          "duration": {
            "type": "string",
            "description": "Duration of the load test, expressed as a Go duration string (e.g. \"30s\", \"5m\", \"1h\").",
            "minLength": 1,
            "maxLength": 32,
            "pattern": "^[0-9]+(\\.[0-9]+)?(ns|us|µs|ms|s|m|h)([0-9]+(\\.[0-9]+)?(ns|us|µs|ms|s|m|h))*$",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "duration"
            }
          },
          "requestHeaders": {
            "type": "string",
            "description": "HTTP request headers, serialized as JSON, sent on each load-test request.",
            "maxLength": 16384,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "requestHeaders,omitempty"
            }
          },
          "requestCookies": {
            "type": "string",
            "description": "HTTP request cookies, serialized as JSON, sent on each load-test request.",
            "maxLength": 16384,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "requestCookies,omitempty"
            }
          },
          "requestBody": {
            "type": "string",
            "description": "HTTP request body sent on each load-test request.",
            "maxLength": 1048576,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "requestBody,omitempty"
            }
          },
          "contentType": {
            "type": "string",
            "description": "Content-Type header value applied to each load-test request body (e.g. \"application/json\").",
            "maxLength": 255,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "contentType,omitempty"
            }
          },
          "metadata": {
            "type": "object",
            "description": "Free-form metadata associated with the performance profile.",
            "additionalProperties": true,
            "x-go-type": "core.Map",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "metadata,omitempty"
            }
          }
        }
      },
      "PerformanceProfilePage": {
        "type": "object",
        "description": "Paginated list of performance profiles.",
        "required": [
          "page",
          "pageSize",
          "totalCount",
          "profiles"
        ],
        "properties": {
          "page": {
            "type": "integer",
            "description": "Zero-based page index returned in this response.",
            "minimum": 0,
            "maximum": 1000000,
            "x-go-type-skip-optional-pointer": true
          },
          "pageSize": {
            "type": "integer",
            "description": "Maximum number of items returned on each page.",
            "minimum": 1,
            "maximum": 1000,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "pageSize"
            }
          },
          "totalCount": {
            "type": "integer",
            "description": "Total number of performance profiles across all pages.",
            "minimum": 0,
            "maximum": 100000000,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "totalCount"
            }
          },
          "profiles": {
            "type": "array",
            "description": "Performance profiles in this page.",
            "x-go-type-skip-optional-pointer": true,
            "items": {
              "x-go-type": "PerformanceProfile",
              "$id": "https://schemas.meshery.io/performance_profile.yaml",
              "$schema": "http://json-schema.org/draft-07/schema#",
              "title": "PerformanceProfile",
              "description": "A performance profile captures the configuration for a load test run by Meshery against one or more service-mesh endpoints. Profiles are owned by a user and can optionally be associated with a recurring schedule. Learn more at https://docs.meshery.io/tasks/performance-management",
              "additionalProperties": false,
              "type": "object",
              "required": [
                "id",
                "name",
                "userId",
                "createdAt",
                "updatedAt"
              ],
              "properties": {
                "id": {
                  "description": "Unique identifier for the performance profile.",
                  "x-order": 1,
                  "x-go-name": "ID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "id",
                    "json": "id"
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
                  "description": "Human-readable name of the performance profile.",
                  "minLength": 1,
                  "maxLength": 255,
                  "x-order": 2,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "name",
                    "json": "name"
                  }
                },
                "userId": {
                  "description": "User ID of the profile owner.",
                  "x-order": 3,
                  "x-go-name": "UserID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "user_id",
                    "json": "userId"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "schedule": {
                  "description": "Optional schedule ID associated with this performance profile. Null when the profile is not bound to a recurring schedule.",
                  "nullable": true,
                  "x-order": 4,
                  "x-oapi-codegen-extra-tags": {
                    "db": "schedule",
                    "json": "schedule,omitempty"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "loadGenerators": {
                  "type": "array",
                  "description": "Load generators (e.g. fortio, wrk2, nighthawk) to drive the profile's load test.",
                  "minItems": 1,
                  "items": {
                    "type": "string",
                    "description": "Identifier of a single load generator.",
                    "minLength": 1,
                    "maxLength": 64
                  },
                  "x-order": 5,
                  "x-go-type": "pq.StringArray",
                  "x-go-type-import": {
                    "path": "github.com/lib/pq"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "load_generators",
                    "json": "loadGenerators"
                  }
                },
                "endpoints": {
                  "type": "array",
                  "description": "Endpoints (URLs) targeted by the performance profile's load test.",
                  "minItems": 1,
                  "items": {
                    "type": "string",
                    "description": "A single endpoint URL targeted by the load test.",
                    "minLength": 1,
                    "maxLength": 2048
                  },
                  "x-order": 6,
                  "x-go-type": "pq.StringArray",
                  "x-go-type-import": {
                    "path": "github.com/lib/pq"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "endpoints",
                    "json": "endpoints"
                  }
                },
                "serviceMesh": {
                  "type": "string",
                  "description": "Service mesh under test for the profile (e.g. istio, linkerd, consul). Empty string when the profile is mesh-agnostic.",
                  "maxLength": 100,
                  "x-order": 7,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "service_mesh",
                    "json": "serviceMesh"
                  }
                },
                "concurrentRequest": {
                  "type": "integer",
                  "description": "Number of concurrent requests issued by the load generator.",
                  "minimum": 1,
                  "maximum": 100000,
                  "x-order": 8,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "concurrent_request",
                    "json": "concurrentRequest"
                  }
                },
                "qps": {
                  "type": "integer",
                  "description": "Target queries-per-second rate for the load generator. Zero indicates the generator runs unthrottled.",
                  "minimum": 0,
                  "maximum": 1000000,
                  "x-order": 9,
                  "x-go-name": "QPS",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "qps",
                    "json": "qps"
                  }
                },
                "duration": {
                  "type": "string",
                  "description": "Duration of the load test, expressed as a Go duration string (e.g. \"30s\", \"5m\", \"1h\").",
                  "minLength": 1,
                  "maxLength": 32,
                  "pattern": "^[0-9]+(\\.[0-9]+)?(ns|us|µs|ms|s|m|h)([0-9]+(\\.[0-9]+)?(ns|us|µs|ms|s|m|h))*$",
                  "x-order": 10,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "duration",
                    "json": "duration"
                  }
                },
                "requestHeaders": {
                  "type": "string",
                  "description": "HTTP request headers, serialized as JSON, sent on each load-test request. Empty string when no headers are configured.",
                  "maxLength": 16384,
                  "x-order": 11,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "request_headers",
                    "json": "requestHeaders"
                  }
                },
                "requestCookies": {
                  "type": "string",
                  "description": "HTTP request cookies, serialized as JSON, sent on each load-test request. Empty string when no cookies are configured.",
                  "maxLength": 16384,
                  "x-order": 12,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "request_cookies",
                    "json": "requestCookies"
                  }
                },
                "requestBody": {
                  "type": "string",
                  "description": "HTTP request body sent on each load-test request. Empty string when no body is configured.",
                  "maxLength": 1048576,
                  "x-order": 13,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "request_body",
                    "json": "requestBody"
                  }
                },
                "contentType": {
                  "type": "string",
                  "description": "Content-Type header value applied to each load-test request body (e.g. \"application/json\"). Empty string when no body is configured.",
                  "maxLength": 255,
                  "x-order": 14,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "content_type",
                    "json": "contentType"
                  }
                },
                "metadata": {
                  "type": "object",
                  "description": "Free-form metadata associated with the performance profile.",
                  "additionalProperties": true,
                  "x-order": 15,
                  "x-go-type": "core.Map",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "metadata",
                    "json": "metadata"
                  }
                },
                "lastRun": {
                  "description": "Server-computed timestamp of the most recent load-test run that used this profile. Null until the first run completes. Server-managed; clients must not set this on create/update.",
                  "nullable": true,
                  "x-order": 16,
                  "x-oapi-codegen-extra-tags": {
                    "db": "last_run",
                    "json": "lastRun,omitempty"
                  },
                  "x-go-type": "NullTime",
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "totalResults": {
                  "type": "integer",
                  "description": "Server-computed count of load-test results recorded for this profile. Server-managed; clients must not set this on create/update.",
                  "minimum": 0,
                  "x-order": 17,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "total_results",
                    "json": "totalResults"
                  }
                },
                "createdAt": {
                  "description": "Timestamp when the performance profile was created.",
                  "x-order": 18,
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at",
                    "yaml": "created_at",
                    "json": "createdAt"
                  },
                  "x-go-type": "time.Time",
                  "type": "string",
                  "format": "date-time",
                  "x-go-name": "CreatedAt",
                  "x-go-type-skip-optional-pointer": true
                },
                "updatedAt": {
                  "description": "Timestamp when the performance profile was last updated.",
                  "x-order": 19,
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at",
                    "yaml": "updated_at",
                    "json": "updatedAt"
                  },
                  "x-go-type": "time.Time",
                  "type": "string",
                  "format": "date-time",
                  "x-go-name": "UpdatedAt",
                  "x-go-type-skip-optional-pointer": true
                }
              }
            }
          }
        }
      }
    },
    "requestBodies": {
      "performanceProfilePayload": {
        "description": "Body for creating or updating a performance profile.",
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "description": "Payload for creating or updating a performance profile. Includes only client-settable fields; server-generated fields (id on create, createdAt, updatedAt, lastRun, totalResults) are populated by the server.",
              "required": [
                "name",
                "loadGenerators",
                "endpoints",
                "duration"
              ],
              "properties": {
                "id": {
                  "description": "Existing performance-profile ID for updates; omit on create.",
                  "x-go-name": "ID",
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
                  "description": "Human-readable name of the performance profile.",
                  "minLength": 1,
                  "maxLength": 255,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "name"
                  }
                },
                "userId": {
                  "description": "Owner user ID. When omitted, the server infers it from the authenticated user.",
                  "x-go-name": "UserID",
                  "x-oapi-codegen-extra-tags": {
                    "json": "userId,omitempty"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "schedule": {
                  "description": "Optional schedule ID associating the profile with a recurring run.",
                  "nullable": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "schedule,omitempty"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "loadGenerators": {
                  "type": "array",
                  "description": "Load generators (e.g. fortio, wrk2, nighthawk) to drive the profile's load test.",
                  "minItems": 1,
                  "items": {
                    "type": "string",
                    "description": "Identifier of a single load generator.",
                    "minLength": 1,
                    "maxLength": 64
                  },
                  "x-go-type": "pq.StringArray",
                  "x-go-type-import": {
                    "path": "github.com/lib/pq"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "loadGenerators"
                  }
                },
                "endpoints": {
                  "type": "array",
                  "description": "Endpoints (URLs) targeted by the performance profile's load test.",
                  "minItems": 1,
                  "items": {
                    "type": "string",
                    "description": "A single endpoint URL targeted by the load test.",
                    "minLength": 1,
                    "maxLength": 2048
                  },
                  "x-go-type": "pq.StringArray",
                  "x-go-type-import": {
                    "path": "github.com/lib/pq"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "endpoints"
                  }
                },
                "serviceMesh": {
                  "type": "string",
                  "description": "Service mesh under test for the profile (e.g. istio, linkerd, consul). Empty string when the profile is mesh-agnostic.",
                  "maxLength": 100,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "serviceMesh,omitempty"
                  }
                },
                "concurrentRequest": {
                  "type": "integer",
                  "description": "Number of concurrent requests issued by the load generator.",
                  "minimum": 1,
                  "maximum": 100000,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "concurrentRequest,omitempty"
                  }
                },
                "qps": {
                  "type": "integer",
                  "description": "Target queries-per-second rate for the load generator. Zero indicates the generator runs unthrottled.",
                  "minimum": 0,
                  "maximum": 1000000,
                  "x-go-name": "QPS",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "qps,omitempty"
                  }
                },
                "duration": {
                  "type": "string",
                  "description": "Duration of the load test, expressed as a Go duration string (e.g. \"30s\", \"5m\", \"1h\").",
                  "minLength": 1,
                  "maxLength": 32,
                  "pattern": "^[0-9]+(\\.[0-9]+)?(ns|us|µs|ms|s|m|h)([0-9]+(\\.[0-9]+)?(ns|us|µs|ms|s|m|h))*$",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "duration"
                  }
                },
                "requestHeaders": {
                  "type": "string",
                  "description": "HTTP request headers, serialized as JSON, sent on each load-test request.",
                  "maxLength": 16384,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "requestHeaders,omitempty"
                  }
                },
                "requestCookies": {
                  "type": "string",
                  "description": "HTTP request cookies, serialized as JSON, sent on each load-test request.",
                  "maxLength": 16384,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "requestCookies,omitempty"
                  }
                },
                "requestBody": {
                  "type": "string",
                  "description": "HTTP request body sent on each load-test request.",
                  "maxLength": 1048576,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "requestBody,omitempty"
                  }
                },
                "contentType": {
                  "type": "string",
                  "description": "Content-Type header value applied to each load-test request body (e.g. \"application/json\").",
                  "maxLength": 255,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "contentType,omitempty"
                  }
                },
                "metadata": {
                  "type": "object",
                  "description": "Free-form metadata associated with the performance profile.",
                  "additionalProperties": true,
                  "x-go-type": "core.Map",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "metadata,omitempty"
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

export default PerformanceProfileSchema;
