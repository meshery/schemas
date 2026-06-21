/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const ScheduleSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "schedule",
    "description": "Documentation for Meshery Cloud REST APIs for Schedules",
    "x-deprecated": true,
    "x-superseded-by": "v1beta2",
    "contact": {
      "name": "Meshery Maintainers",
      "email": "maintainers@meshery.io",
      "url": "https://meshery.io"
    },
    "license": {
      "name": "Apache 2.0",
      "url": "https://www.apache.org/licenses/LICENSE-2.0.html"
    },
    "version": "v1beta1"
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
      "description": "Meshery Cloud development server URL"
    }
  ],
  "security": [
    {
      "jwt": []
    }
  ],
  "tags": [
    {
      "name": "scheduler",
      "description": "Operations related to scheduled tasks"
    }
  ],
  "paths": {
    "/user/schedules": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "scheduler"
        ],
        "summary": "Get schedules",
        "operationId": "getSchedules",
        "description": "Returns all schedules for the authenticated user.",
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
            "description": "Schedules response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A paginated list of schedules.",
                  "required": [
                    "page",
                    "page_size",
                    "total_count",
                    "schedules"
                  ],
                  "properties": {
                    "page": {
                      "type": "integer",
                      "description": "Current page number (zero-based).",
                      "x-order": 1,
                      "minimum": 0
                    },
                    "page_size": {
                      "type": "integer",
                      "description": "Number of schedules per page.",
                      "x-order": 2,
                      "minimum": 1
                    },
                    "total_count": {
                      "type": "integer",
                      "description": "Total number of schedules across all pages.",
                      "x-order": 3,
                      "minimum": 0
                    },
                    "schedules": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "description": "A schedule defines a recurring cron-based trigger for performance tests or other automated tasks.\n",
                        "required": [
                          "name",
                          "user_id",
                          "cron_expression"
                        ],
                        "properties": {
                          "id": {
                            "description": "Unique identifier for the schedule.",
                            "x-order": 1,
                            "x-oapi-codegen-extra-tags": {
                              "db": "id"
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
                            "description": "Human-readable name for the schedule.",
                            "x-order": 2,
                            "x-oapi-codegen-extra-tags": {
                              "db": "name"
                            },
                            "minLength": 1,
                            "maxLength": 255
                          },
                          "user_id": {
                            "description": "UUID of the user who owns this schedule.",
                            "x-order": 3,
                            "x-oapi-codegen-extra-tags": {
                              "db": "user_id"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "cron_expression": {
                            "type": "string",
                            "description": "Cron expression defining the schedule's recurrence (e.g. \"0 0 * * *\" for daily at midnight).\n",
                            "x-order": 4,
                            "x-oapi-codegen-extra-tags": {
                              "db": "cron_expression"
                            },
                            "maxLength": 500
                          },
                          "created_at": {
                            "x-order": 5,
                            "description": "Timestamp when the resource was created.",
                            "x-go-type": "time.Time",
                            "type": "string",
                            "format": "date-time",
                            "x-go-name": "CreatedAt",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "yaml": "created_at"
                            },
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updated_at": {
                            "x-order": 6,
                            "description": "Timestamp when the resource was updated.",
                            "x-go-type": "time.Time",
                            "type": "string",
                            "format": "date-time",
                            "x-go-name": "UpdatedAt",
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "yaml": "updated_at"
                            },
                            "x-go-type-skip-optional-pointer": true
                          }
                        }
                      },
                      "x-order": 4,
                      "description": "The schedules of the schedulepage."
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
          "scheduler"
        ],
        "summary": "Create or update schedule",
        "operationId": "upsertSchedule",
        "description": "Creates or updates a schedule for the authenticated user.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "A schedule defines a recurring cron-based trigger for performance tests or other automated tasks.\n",
                "required": [
                  "name",
                  "user_id",
                  "cron_expression"
                ],
                "properties": {
                  "id": {
                    "description": "Unique identifier for the schedule.",
                    "x-order": 1,
                    "x-oapi-codegen-extra-tags": {
                      "db": "id"
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
                    "description": "Human-readable name for the schedule.",
                    "x-order": 2,
                    "x-oapi-codegen-extra-tags": {
                      "db": "name"
                    },
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "user_id": {
                    "description": "UUID of the user who owns this schedule.",
                    "x-order": 3,
                    "x-oapi-codegen-extra-tags": {
                      "db": "user_id"
                    },
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  },
                  "cron_expression": {
                    "type": "string",
                    "description": "Cron expression defining the schedule's recurrence (e.g. \"0 0 * * *\" for daily at midnight).\n",
                    "x-order": 4,
                    "x-oapi-codegen-extra-tags": {
                      "db": "cron_expression"
                    },
                    "maxLength": 500
                  },
                  "created_at": {
                    "x-order": 5,
                    "description": "Timestamp when the resource was created.",
                    "x-go-type": "time.Time",
                    "type": "string",
                    "format": "date-time",
                    "x-go-name": "CreatedAt",
                    "x-oapi-codegen-extra-tags": {
                      "db": "created_at",
                      "yaml": "created_at"
                    },
                    "x-go-type-skip-optional-pointer": true
                  },
                  "updated_at": {
                    "x-order": 6,
                    "description": "Timestamp when the resource was updated.",
                    "x-go-type": "time.Time",
                    "type": "string",
                    "format": "date-time",
                    "x-go-name": "UpdatedAt",
                    "x-oapi-codegen-extra-tags": {
                      "db": "updated_at",
                      "yaml": "updated_at"
                    },
                    "x-go-type-skip-optional-pointer": true
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Schedule upserted",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A schedule defines a recurring cron-based trigger for performance tests or other automated tasks.\n",
                  "required": [
                    "name",
                    "user_id",
                    "cron_expression"
                  ],
                  "properties": {
                    "id": {
                      "description": "Unique identifier for the schedule.",
                      "x-order": 1,
                      "x-oapi-codegen-extra-tags": {
                        "db": "id"
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
                      "description": "Human-readable name for the schedule.",
                      "x-order": 2,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      },
                      "minLength": 1,
                      "maxLength": 255
                    },
                    "user_id": {
                      "description": "UUID of the user who owns this schedule.",
                      "x-order": 3,
                      "x-oapi-codegen-extra-tags": {
                        "db": "user_id"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "cron_expression": {
                      "type": "string",
                      "description": "Cron expression defining the schedule's recurrence (e.g. \"0 0 * * *\" for daily at midnight).\n",
                      "x-order": 4,
                      "x-oapi-codegen-extra-tags": {
                        "db": "cron_expression"
                      },
                      "maxLength": 500
                    },
                    "created_at": {
                      "x-order": 5,
                      "description": "Timestamp when the resource was created.",
                      "x-go-type": "time.Time",
                      "type": "string",
                      "format": "date-time",
                      "x-go-name": "CreatedAt",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "yaml": "created_at"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updated_at": {
                      "x-order": 6,
                      "description": "Timestamp when the resource was updated.",
                      "x-go-type": "time.Time",
                      "type": "string",
                      "format": "date-time",
                      "x-go-name": "UpdatedAt",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "yaml": "updated_at"
                      },
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
    "/user/schedules/{id}": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "scheduler"
        ],
        "summary": "Get schedule by ID",
        "operationId": "getSchedule",
        "description": "Returns a specific schedule by its ID.",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "Schedule ID",
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
            "description": "Schedule response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A schedule defines a recurring cron-based trigger for performance tests or other automated tasks.\n",
                  "required": [
                    "name",
                    "user_id",
                    "cron_expression"
                  ],
                  "properties": {
                    "id": {
                      "description": "Unique identifier for the schedule.",
                      "x-order": 1,
                      "x-oapi-codegen-extra-tags": {
                        "db": "id"
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
                      "description": "Human-readable name for the schedule.",
                      "x-order": 2,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      },
                      "minLength": 1,
                      "maxLength": 255
                    },
                    "user_id": {
                      "description": "UUID of the user who owns this schedule.",
                      "x-order": 3,
                      "x-oapi-codegen-extra-tags": {
                        "db": "user_id"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "cron_expression": {
                      "type": "string",
                      "description": "Cron expression defining the schedule's recurrence (e.g. \"0 0 * * *\" for daily at midnight).\n",
                      "x-order": 4,
                      "x-oapi-codegen-extra-tags": {
                        "db": "cron_expression"
                      },
                      "maxLength": 500
                    },
                    "created_at": {
                      "x-order": 5,
                      "description": "Timestamp when the resource was created.",
                      "x-go-type": "time.Time",
                      "type": "string",
                      "format": "date-time",
                      "x-go-name": "CreatedAt",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "yaml": "created_at"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updated_at": {
                      "x-order": 6,
                      "description": "Timestamp when the resource was updated.",
                      "x-go-type": "time.Time",
                      "type": "string",
                      "format": "date-time",
                      "x-go-name": "UpdatedAt",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "yaml": "updated_at"
                      },
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
      },
      "delete": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "scheduler"
        ],
        "summary": "Delete schedule",
        "operationId": "deleteSchedule",
        "description": "Deletes a schedule by its ID.",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "Schedule ID",
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
            "description": "Schedule deleted"
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
      "id": {
        "name": "id",
        "in": "path",
        "description": "Schedule ID",
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
      "pagesize": {
        "name": "pagesize",
        "in": "query",
        "description": "Get responses by pagesize",
        "schema": {
          "type": "string"
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
      "Schedule": {
        "type": "object",
        "description": "A schedule defines a recurring cron-based trigger for performance tests or other automated tasks.\n",
        "required": [
          "name",
          "user_id",
          "cron_expression"
        ],
        "properties": {
          "id": {
            "description": "Unique identifier for the schedule.",
            "x-order": 1,
            "x-oapi-codegen-extra-tags": {
              "db": "id"
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
            "description": "Human-readable name for the schedule.",
            "x-order": 2,
            "x-oapi-codegen-extra-tags": {
              "db": "name"
            },
            "minLength": 1,
            "maxLength": 255
          },
          "user_id": {
            "description": "UUID of the user who owns this schedule.",
            "x-order": 3,
            "x-oapi-codegen-extra-tags": {
              "db": "user_id"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "cron_expression": {
            "type": "string",
            "description": "Cron expression defining the schedule's recurrence (e.g. \"0 0 * * *\" for daily at midnight).\n",
            "x-order": 4,
            "x-oapi-codegen-extra-tags": {
              "db": "cron_expression"
            },
            "maxLength": 500
          },
          "created_at": {
            "x-order": 5,
            "description": "Timestamp when the resource was created.",
            "x-go-type": "time.Time",
            "type": "string",
            "format": "date-time",
            "x-go-name": "CreatedAt",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at",
              "yaml": "created_at"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "updated_at": {
            "x-order": 6,
            "description": "Timestamp when the resource was updated.",
            "x-go-type": "time.Time",
            "type": "string",
            "format": "date-time",
            "x-go-name": "UpdatedAt",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at",
              "yaml": "updated_at"
            },
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "SchedulePage": {
        "type": "object",
        "description": "A paginated list of schedules.",
        "required": [
          "page",
          "page_size",
          "total_count",
          "schedules"
        ],
        "properties": {
          "page": {
            "type": "integer",
            "description": "Current page number (zero-based).",
            "x-order": 1,
            "minimum": 0
          },
          "page_size": {
            "type": "integer",
            "description": "Number of schedules per page.",
            "x-order": 2,
            "minimum": 1
          },
          "total_count": {
            "type": "integer",
            "description": "Total number of schedules across all pages.",
            "x-order": 3,
            "minimum": 0
          },
          "schedules": {
            "type": "array",
            "items": {
              "type": "object",
              "description": "A schedule defines a recurring cron-based trigger for performance tests or other automated tasks.\n",
              "required": [
                "name",
                "user_id",
                "cron_expression"
              ],
              "properties": {
                "id": {
                  "description": "Unique identifier for the schedule.",
                  "x-order": 1,
                  "x-oapi-codegen-extra-tags": {
                    "db": "id"
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
                  "description": "Human-readable name for the schedule.",
                  "x-order": 2,
                  "x-oapi-codegen-extra-tags": {
                    "db": "name"
                  },
                  "minLength": 1,
                  "maxLength": 255
                },
                "user_id": {
                  "description": "UUID of the user who owns this schedule.",
                  "x-order": 3,
                  "x-oapi-codegen-extra-tags": {
                    "db": "user_id"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "cron_expression": {
                  "type": "string",
                  "description": "Cron expression defining the schedule's recurrence (e.g. \"0 0 * * *\" for daily at midnight).\n",
                  "x-order": 4,
                  "x-oapi-codegen-extra-tags": {
                    "db": "cron_expression"
                  },
                  "maxLength": 500
                },
                "created_at": {
                  "x-order": 5,
                  "description": "Timestamp when the resource was created.",
                  "x-go-type": "time.Time",
                  "type": "string",
                  "format": "date-time",
                  "x-go-name": "CreatedAt",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at",
                    "yaml": "created_at"
                  },
                  "x-go-type-skip-optional-pointer": true
                },
                "updated_at": {
                  "x-order": 6,
                  "description": "Timestamp when the resource was updated.",
                  "x-go-type": "time.Time",
                  "type": "string",
                  "format": "date-time",
                  "x-go-name": "UpdatedAt",
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at",
                    "yaml": "updated_at"
                  },
                  "x-go-type-skip-optional-pointer": true
                }
              }
            },
            "x-order": 4,
            "description": "The schedules of the schedulepage."
          }
        }
      }
    }
  }
};

export default ScheduleSchema;
