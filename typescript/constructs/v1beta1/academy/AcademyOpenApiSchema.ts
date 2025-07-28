/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const schema = {
  "openapi": "3.0.0",
  "info": {
    "title": "Academy API",
    "version": "1.0.0"
  },
  "paths": {
    "/api/academy/content": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "summary": "Get academy content",
        "description": "Returns a list of academy content with optional filtering.",
        "parameters": [
          {
            "name": "contentType",
            "in": "query",
            "description": "Filter content by content types",
            "required": false,
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "style": "form",
              "explode": true
            }
          },
          {
            "name": "orgId",
            "in": "query",
            "description": "Filter content by organization IDs",
            "required": false,
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "style": "form",
              "explode": true
            }
          },
          {
            "name": "category",
            "in": "query",
            "description": "Filter content by categories",
            "required": false,
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "style": "form",
              "explode": true
            }
          },
          {
            "name": "status",
            "in": "query",
            "description": "Filter by registration status",
            "required": false,
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "style": "form",
              "explode": true
            }
          },
          {
            "name": "search",
            "in": "query",
            "description": "Search content by title",
            "required": false,
            "schema": {
              "type": "string"
            }
          }
        ]
      },
      "responses": {
        "200": {
          "description": "A list of content with total count",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "total": {
                    "type": "integer",
                    "description": "Total number of cirricula",
                    "example": 7
                  },
                  "data": {
                    "type": "array",
                    "items": {
                      "x-go-type": "AcademyCirricula",
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "string",
                          "description": "Id of the cirricula",
                          "example": "923458-3490394-934893",
                          "x-go-name": "ID",
                          "x-oapi-codegen-extra-tags": {
                            "db": "id",
                            "json": "id",
                            "yaml": "id"
                          }
                        },
                        "type": {
                          "x-go-type": "ContentType",
                          "x-oapi-codegen-extra-tags": {
                            "db": "type"
                          },
                          "type": "string",
                          "enum": [
                            "learning-path",
                            "challenge",
                            "exam"
                          ]
                        },
                        "orgId": {
                          "type": "string",
                          "description": "Organization ID that owns this learning path",
                          "example": "layer5",
                          "x-oapi-codegen-extra-tags": {
                            "db": "org_id",
                            "json": "org_id",
                            "yaml": "org_id"
                          }
                        },
                        "visibility": {
                          "description": "Visibility of the cirricula",
                          "x-go-type": "Visibility",
                          "x-oapi-codegen-extra-tags": {
                            "db": "visibility",
                            "json": "visibility",
                            "yaml": "visibility"
                          },
                          "type": "string",
                          "enum": [
                            "public",
                            "private"
                          ]
                        },
                        "status": {
                          "example": "ready",
                          "description": "Status of the cirricula",
                          "x-go-type": "Status",
                          "x-oapi-codegen-extra-tags": {
                            "db": "status",
                            "json": "status",
                            "yaml": "status"
                          },
                          "type": "string",
                          "enum": [
                            "ready",
                            "archived",
                            "not_ready"
                          ]
                        },
                        "slug": {
                          "type": "string",
                          "description": "slug of the cirricula",
                          "example": "intro-kubernetes-course"
                        },
                        "level": {
                          "description": "Level of the cirricula",
                          "x-go-type": "Level",
                          "x-oapi-codegen-extra-tags": {
                            "db": "level",
                            "json": "level",
                            "yaml": "level"
                          },
                          "type": "string",
                          "enum": [
                            "beginner",
                            "intermediate",
                            "advanced"
                          ]
                        },
                        "createdAt": {
                          "description": "When the cirricula item was created",
                          "x-oapi-codegen-extra-tags": {
                            "db": "created_at",
                            "json": "created_at",
                            "yaml": "created_at"
                          },
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "updatedAt": {
                          "description": "When the cirricula was last updated",
                          "x-go-type": "core.Time",
                          "x-oapi-codegen-extra-tags": {
                            "db": "updated_at",
                            "json": "updated_at",
                            "yaml": "updated_at"
                          },
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "deletedAt": {
                          "x-go-type": "core.NullTime",
                          "x-oapi-codegen-extra-tags": {
                            "db": "deleted_at",
                            "json": "deleted_at",
                            "yaml": "deleted_at"
                          },
                          "description": "Timestamp when the resource was deleted.",
                          "type": "string",
                          "format": "date-time",
                          "x-go-name": "DeletedAt",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "metadata": {
                          "type": "object",
                          "description": "Additional metadata about the cirricula",
                          "additionalProperties": true,
                          "x-go-type": "core.Map",
                          "x-go-type-skip-optional-pointer": true,
                          "x-oapi-codegen-extra-tags": {
                            "db": "metadata",
                            "json": "metadata",
                            "yaml": "metadata"
                          },
                          "oneOf": [
                            {
                              "type": "object",
                              "properties": {
                                "title": {
                                  "type": "string",
                                  "description": "Title of the learning path",
                                  "example": "Mastering Kubernetes for Engineers"
                                },
                                "description": {
                                  "type": "string",
                                  "description": "Description of the learning path",
                                  "example": "Learn how to configure your Kubernetes clusters and manage the lifecycle of your workloads"
                                },
                                "banner": {
                                  "type": "string",
                                  "format": "uri",
                                  "nullable": true,
                                  "description": "Optional banner image",
                                  "example": null
                                },
                                "permalink": {
                                  "type": "string",
                                  "format": "uri",
                                  "description": "Canonical URL for the learning path",
                                  "example": "http://localhost:9876/academy/learning-paths/layer5/mastering-kubernetes-for-engineers/"
                                },
                                "courses": {
                                  "type": "array",
                                  "description": "List of courses in this learning path",
                                  "items": {
                                    "x-go-type": "Course",
                                    "type": "object",
                                    "properties": {
                                      "title": {
                                        "type": "string",
                                        "description": "Title of the course",
                                        "example": "Kubernetes Basics"
                                      },
                                      "permalink": {
                                        "type": "string",
                                        "format": "uri",
                                        "description": "URL to the course content",
                                        "example": "http://localhost:9876/academy/learning-paths/layer5/intro-kubernetes-course/kubernetes/"
                                      },
                                      "description": {
                                        "type": "string",
                                        "description": "Course description",
                                        "example": "Learn the basics of Kubernetes"
                                      },
                                      "weight": {
                                        "type": "number",
                                        "description": "Order of the course in the list",
                                        "example": "eg 1 , 2"
                                      },
                                      "banner": {
                                        "type": "string",
                                        "format": "uri",
                                        "nullable": true,
                                        "description": "Optional banner image",
                                        "example": null
                                      }
                                    },
                                    "required": [
                                      "title",
                                      "permalink"
                                    ]
                                  }
                                }
                              },
                              "required": [
                                "title",
                                "description",
                                "permalink"
                              ]
                            },
                            {
                              "type": "object",
                              "properties": {
                                "title": {
                                  "type": "string",
                                  "description": "Title of the learning path",
                                  "example": "Mastering Kubernetes for Engineers"
                                },
                                "description": {
                                  "type": "string",
                                  "description": "Description of the learning path",
                                  "example": "Learn how to configure your Kubernetes clusters and manage the lifecycle of your workloads"
                                },
                                "banner": {
                                  "type": "string",
                                  "format": "uri",
                                  "nullable": true,
                                  "description": "Optional banner image",
                                  "example": null
                                },
                                "permalink": {
                                  "type": "string",
                                  "format": "uri",
                                  "description": "Canonical URL for the learning path",
                                  "example": "http://localhost:9876/academy/learning-paths/layer5/mastering-kubernetes-for-engineers/"
                                },
                                "courses": {
                                  "type": "array",
                                  "description": "List of courses in this learning path",
                                  "items": {
                                    "x-go-type": "Course",
                                    "type": "object",
                                    "properties": {
                                      "title": {
                                        "type": "string",
                                        "description": "Title of the course",
                                        "example": "Kubernetes Basics"
                                      },
                                      "permalink": {
                                        "type": "string",
                                        "format": "uri",
                                        "description": "URL to the course content",
                                        "example": "http://localhost:9876/academy/learning-paths/layer5/intro-kubernetes-course/kubernetes/"
                                      },
                                      "description": {
                                        "type": "string",
                                        "description": "Course description",
                                        "example": "Learn the basics of Kubernetes"
                                      },
                                      "weight": {
                                        "type": "number",
                                        "description": "Order of the course in the list",
                                        "example": "eg 1 , 2"
                                      },
                                      "banner": {
                                        "type": "string",
                                        "format": "uri",
                                        "nullable": true,
                                        "description": "Optional banner image",
                                        "example": null
                                      }
                                    },
                                    "required": [
                                      "title",
                                      "permalink"
                                    ]
                                  }
                                }
                              },
                              "required": [
                                "title",
                                "description",
                                "permalink"
                              ]
                            }
                          ]
                        }
                      },
                      "required": [
                        "id",
                        "type",
                        "orgId",
                        "visibility",
                        "status",
                        "slug",
                        "createdAt",
                        "updatedAt",
                        "deletedAt",
                        "metadata",
                        "level"
                      ]
                    }
                  }
                },
                "required": [
                  "total",
                  "data"
                ]
              }
            }
          }
        },
        "400": {
          "description": "Invalid request parameters"
        },
        "500": {
          "description": "Server error"
        }
      }
    },
    "/api/academy/{type}/{orgId}/{slug}": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "summary": "Get a single learning path",
        "description": "Returns a learning path identified by type, orgId, and slug.",
        "parameters": [
          {
            "name": "type",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "orgId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "slug",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "A single academy content",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "description": "Id of the cirricula",
                      "example": "923458-3490394-934893",
                      "x-go-name": "ID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id",
                        "json": "id",
                        "yaml": "id"
                      }
                    },
                    "type": {
                      "x-go-type": "ContentType",
                      "x-oapi-codegen-extra-tags": {
                        "db": "type"
                      },
                      "type": "string",
                      "enum": [
                        "learning-path",
                        "challenge",
                        "exam"
                      ]
                    },
                    "orgId": {
                      "type": "string",
                      "description": "Organization ID that owns this learning path",
                      "example": "layer5",
                      "x-oapi-codegen-extra-tags": {
                        "db": "org_id",
                        "json": "org_id",
                        "yaml": "org_id"
                      }
                    },
                    "visibility": {
                      "description": "Visibility of the cirricula",
                      "x-go-type": "Visibility",
                      "x-oapi-codegen-extra-tags": {
                        "db": "visibility",
                        "json": "visibility",
                        "yaml": "visibility"
                      },
                      "type": "string",
                      "enum": [
                        "public",
                        "private"
                      ]
                    },
                    "status": {
                      "example": "ready",
                      "description": "Status of the cirricula",
                      "x-go-type": "Status",
                      "x-oapi-codegen-extra-tags": {
                        "db": "status",
                        "json": "status",
                        "yaml": "status"
                      },
                      "type": "string",
                      "enum": [
                        "ready",
                        "archived",
                        "not_ready"
                      ]
                    },
                    "slug": {
                      "type": "string",
                      "description": "slug of the cirricula",
                      "example": "intro-kubernetes-course"
                    },
                    "level": {
                      "description": "Level of the cirricula",
                      "x-go-type": "Level",
                      "x-oapi-codegen-extra-tags": {
                        "db": "level",
                        "json": "level",
                        "yaml": "level"
                      },
                      "type": "string",
                      "enum": [
                        "beginner",
                        "intermediate",
                        "advanced"
                      ]
                    },
                    "createdAt": {
                      "description": "When the cirricula item was created",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "created_at",
                        "yaml": "created_at"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "When the cirricula was last updated",
                      "x-go-type": "core.Time",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updated_at",
                        "yaml": "updated_at"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "x-go-type": "core.NullTime",
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deleted_at",
                        "yaml": "deleted_at"
                      },
                      "description": "Timestamp when the resource was deleted.",
                      "type": "string",
                      "format": "date-time",
                      "x-go-name": "DeletedAt",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "metadata": {
                      "type": "object",
                      "description": "Additional metadata about the cirricula",
                      "additionalProperties": true,
                      "x-go-type": "core.Map",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata",
                        "json": "metadata",
                        "yaml": "metadata"
                      },
                      "oneOf": [
                        {
                          "type": "object",
                          "properties": {
                            "title": {
                              "type": "string",
                              "description": "Title of the learning path",
                              "example": "Mastering Kubernetes for Engineers"
                            },
                            "description": {
                              "type": "string",
                              "description": "Description of the learning path",
                              "example": "Learn how to configure your Kubernetes clusters and manage the lifecycle of your workloads"
                            },
                            "banner": {
                              "type": "string",
                              "format": "uri",
                              "nullable": true,
                              "description": "Optional banner image",
                              "example": null
                            },
                            "permalink": {
                              "type": "string",
                              "format": "uri",
                              "description": "Canonical URL for the learning path",
                              "example": "http://localhost:9876/academy/learning-paths/layer5/mastering-kubernetes-for-engineers/"
                            },
                            "courses": {
                              "type": "array",
                              "description": "List of courses in this learning path",
                              "items": {
                                "x-go-type": "Course",
                                "type": "object",
                                "properties": {
                                  "title": {
                                    "type": "string",
                                    "description": "Title of the course",
                                    "example": "Kubernetes Basics"
                                  },
                                  "permalink": {
                                    "type": "string",
                                    "format": "uri",
                                    "description": "URL to the course content",
                                    "example": "http://localhost:9876/academy/learning-paths/layer5/intro-kubernetes-course/kubernetes/"
                                  },
                                  "description": {
                                    "type": "string",
                                    "description": "Course description",
                                    "example": "Learn the basics of Kubernetes"
                                  },
                                  "weight": {
                                    "type": "number",
                                    "description": "Order of the course in the list",
                                    "example": "eg 1 , 2"
                                  },
                                  "banner": {
                                    "type": "string",
                                    "format": "uri",
                                    "nullable": true,
                                    "description": "Optional banner image",
                                    "example": null
                                  }
                                },
                                "required": [
                                  "title",
                                  "permalink"
                                ]
                              }
                            }
                          },
                          "required": [
                            "title",
                            "description",
                            "permalink"
                          ]
                        },
                        {
                          "type": "object",
                          "properties": {
                            "title": {
                              "type": "string",
                              "description": "Title of the learning path",
                              "example": "Mastering Kubernetes for Engineers"
                            },
                            "description": {
                              "type": "string",
                              "description": "Description of the learning path",
                              "example": "Learn how to configure your Kubernetes clusters and manage the lifecycle of your workloads"
                            },
                            "banner": {
                              "type": "string",
                              "format": "uri",
                              "nullable": true,
                              "description": "Optional banner image",
                              "example": null
                            },
                            "permalink": {
                              "type": "string",
                              "format": "uri",
                              "description": "Canonical URL for the learning path",
                              "example": "http://localhost:9876/academy/learning-paths/layer5/mastering-kubernetes-for-engineers/"
                            },
                            "courses": {
                              "type": "array",
                              "description": "List of courses in this learning path",
                              "items": {
                                "x-go-type": "Course",
                                "type": "object",
                                "properties": {
                                  "title": {
                                    "type": "string",
                                    "description": "Title of the course",
                                    "example": "Kubernetes Basics"
                                  },
                                  "permalink": {
                                    "type": "string",
                                    "format": "uri",
                                    "description": "URL to the course content",
                                    "example": "http://localhost:9876/academy/learning-paths/layer5/intro-kubernetes-course/kubernetes/"
                                  },
                                  "description": {
                                    "type": "string",
                                    "description": "Course description",
                                    "example": "Learn the basics of Kubernetes"
                                  },
                                  "weight": {
                                    "type": "number",
                                    "description": "Order of the course in the list",
                                    "example": "eg 1 , 2"
                                  },
                                  "banner": {
                                    "type": "string",
                                    "format": "uri",
                                    "nullable": true,
                                    "description": "Optional banner image",
                                    "example": null
                                  }
                                },
                                "required": [
                                  "title",
                                  "permalink"
                                ]
                              }
                            }
                          },
                          "required": [
                            "title",
                            "description",
                            "permalink"
                          ]
                        }
                      ]
                    }
                  },
                  "required": [
                    "id",
                    "type",
                    "orgId",
                    "visibility",
                    "status",
                    "slug",
                    "createdAt",
                    "updatedAt",
                    "deletedAt",
                    "metadata",
                    "level"
                  ]
                }
              }
            }
          },
          "400": {
            "description": "Invalid request parameters"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/api/academy/register": {
      "post": {
        "summary": "Register a user to academy content",
        "operationId": "registerToAcademyContent",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "content_id",
                  "user_id"
                ],
                "properties": {
                  "content_id": {
                    "type": "string",
                    "description": "ID of the academy content to register for"
                  },
                  "content_type": {
                    "type": "string",
                    "enum": [
                      "learning-path",
                      "challenge",
                      "exam"
                    ]
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "registered content",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "ID",
                    "org_id",
                    "user_id",
                    "status",
                    "created_at",
                    "updated_at",
                    "content_id",
                    "metadata"
                  ],
                  "properties": {
                    "ID": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "id",
                        "json": "id",
                        "yaml": "id"
                      },
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "org_id": {
                      "description": "ID of the organization",
                      "x-oapi-codegen-extra-tags": {
                        "db": "org_id"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "content_id": {
                      "type": "string",
                      "description": "ID of the course content",
                      "x-oapi-codegen-extra-tags": {
                        "db": "content_id"
                      }
                    },
                    "user_id": {
                      "description": "ID of the user (foreign key to User)",
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
                    "status": {
                      "type": "string",
                      "enum": [
                        "registered",
                        "in_progress",
                        "completed",
                        "failed",
                        "withdrawn"
                      ],
                      "description": "Status of the user's course registration",
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      }
                    },
                    "updated_at": {
                      "description": "When the registration was updated",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "created_at": {
                      "description": "When the registration was created",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deleted_at": {
                      "x-go-type": "core.NullTime",
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at"
                      },
                      "description": "Timestamp when the resource was deleted.",
                      "type": "string",
                      "format": "date-time",
                      "x-go-name": "DeletedAt",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "metadata": {
                      "type": "object",
                      "description": "Additional metadata about the registration",
                      "additionalProperties": true,
                      "x-go-type": "core.Map",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata"
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Invalid request parameters"
          },
          "500": {
            "description": "Server error"
          }
        },
        "tags": [
          "Academy"
        ]
      }
    },
    "/api/academy/registrations/{contentId}": {
      "get": {
        "tags": [
          "Academy"
        ],
        "x-internal": [
          "cloud"
        ],
        "summary": "Get registration information for academy content",
        "description": "Returns registration data for a specific content item, optionally filtered by status.",
        "parameters": [
          {
            "name": "contentId",
            "in": "path",
            "required": true,
            "description": "The ID of the content to retrieve registration data for",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "status",
            "in": "query",
            "required": false,
            "description": "Filter registrations by status (e.g., registered, completed)",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Registration data for the specified content",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "ID",
                    "org_id",
                    "user_id",
                    "status",
                    "created_at",
                    "updated_at",
                    "content_id",
                    "metadata"
                  ],
                  "properties": {
                    "ID": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "id",
                        "json": "id",
                        "yaml": "id"
                      },
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "org_id": {
                      "description": "ID of the organization",
                      "x-oapi-codegen-extra-tags": {
                        "db": "org_id"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "content_id": {
                      "type": "string",
                      "description": "ID of the course content",
                      "x-oapi-codegen-extra-tags": {
                        "db": "content_id"
                      }
                    },
                    "user_id": {
                      "description": "ID of the user (foreign key to User)",
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
                    "status": {
                      "type": "string",
                      "enum": [
                        "registered",
                        "in_progress",
                        "completed",
                        "failed",
                        "withdrawn"
                      ],
                      "description": "Status of the user's course registration",
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      }
                    },
                    "updated_at": {
                      "description": "When the registration was updated",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "created_at": {
                      "description": "When the registration was created",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deleted_at": {
                      "x-go-type": "core.NullTime",
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at"
                      },
                      "description": "Timestamp when the resource was deleted.",
                      "type": "string",
                      "format": "date-time",
                      "x-go-name": "DeletedAt",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "metadata": {
                      "type": "object",
                      "description": "Additional metadata about the registration",
                      "additionalProperties": true,
                      "x-go-type": "core.Map",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata"
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Invalid request parameters"
          },
          "404": {
            "description": "Content not found"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "RegisterToAcademyContentRequest": {
        "type": "object",
        "required": [
          "content_id",
          "user_id"
        ],
        "properties": {
          "content_id": {
            "type": "string",
            "description": "ID of the academy content to register for"
          },
          "content_type": {
            "type": "string",
            "enum": [
              "learning-path",
              "challenge",
              "exam"
            ]
          }
        }
      },
      "ContentType": {
        "type": "string",
        "enum": [
          "learning-path",
          "challenge",
          "exam"
        ]
      },
      "Visibility": {
        "type": "string",
        "enum": [
          "public",
          "private"
        ]
      },
      "Level": {
        "type": "string",
        "enum": [
          "beginner",
          "intermediate",
          "advanced"
        ]
      },
      "Status": {
        "type": "string",
        "enum": [
          "ready",
          "archived",
          "not_ready"
        ]
      },
      "AcademyCirricula": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "Id of the cirricula",
            "example": "923458-3490394-934893",
            "x-go-name": "ID",
            "x-oapi-codegen-extra-tags": {
              "db": "id",
              "json": "id",
              "yaml": "id"
            }
          },
          "type": {
            "x-go-type": "ContentType",
            "x-oapi-codegen-extra-tags": {
              "db": "type"
            },
            "type": "string",
            "enum": [
              "learning-path",
              "challenge",
              "exam"
            ]
          },
          "orgId": {
            "type": "string",
            "description": "Organization ID that owns this learning path",
            "example": "layer5",
            "x-oapi-codegen-extra-tags": {
              "db": "org_id",
              "json": "org_id",
              "yaml": "org_id"
            }
          },
          "visibility": {
            "description": "Visibility of the cirricula",
            "x-go-type": "Visibility",
            "x-oapi-codegen-extra-tags": {
              "db": "visibility",
              "json": "visibility",
              "yaml": "visibility"
            },
            "type": "string",
            "enum": [
              "public",
              "private"
            ]
          },
          "status": {
            "example": "ready",
            "description": "Status of the cirricula",
            "x-go-type": "Status",
            "x-oapi-codegen-extra-tags": {
              "db": "status",
              "json": "status",
              "yaml": "status"
            },
            "type": "string",
            "enum": [
              "ready",
              "archived",
              "not_ready"
            ]
          },
          "slug": {
            "type": "string",
            "description": "slug of the cirricula",
            "example": "intro-kubernetes-course"
          },
          "level": {
            "description": "Level of the cirricula",
            "x-go-type": "Level",
            "x-oapi-codegen-extra-tags": {
              "db": "level",
              "json": "level",
              "yaml": "level"
            },
            "type": "string",
            "enum": [
              "beginner",
              "intermediate",
              "advanced"
            ]
          },
          "createdAt": {
            "description": "When the cirricula item was created",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at",
              "json": "created_at",
              "yaml": "created_at"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "When the cirricula was last updated",
            "x-go-type": "core.Time",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at",
              "json": "updated_at",
              "yaml": "updated_at"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deletedAt": {
            "x-go-type": "core.NullTime",
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at",
              "json": "deleted_at",
              "yaml": "deleted_at"
            },
            "description": "Timestamp when the resource was deleted.",
            "type": "string",
            "format": "date-time",
            "x-go-name": "DeletedAt",
            "x-go-type-skip-optional-pointer": true
          },
          "metadata": {
            "type": "object",
            "description": "Additional metadata about the cirricula",
            "additionalProperties": true,
            "x-go-type": "core.Map",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "metadata",
              "json": "metadata",
              "yaml": "metadata"
            },
            "oneOf": [
              {
                "type": "object",
                "properties": {
                  "title": {
                    "type": "string",
                    "description": "Title of the learning path",
                    "example": "Mastering Kubernetes for Engineers"
                  },
                  "description": {
                    "type": "string",
                    "description": "Description of the learning path",
                    "example": "Learn how to configure your Kubernetes clusters and manage the lifecycle of your workloads"
                  },
                  "banner": {
                    "type": "string",
                    "format": "uri",
                    "nullable": true,
                    "description": "Optional banner image",
                    "example": null
                  },
                  "permalink": {
                    "type": "string",
                    "format": "uri",
                    "description": "Canonical URL for the learning path",
                    "example": "http://localhost:9876/academy/learning-paths/layer5/mastering-kubernetes-for-engineers/"
                  },
                  "courses": {
                    "type": "array",
                    "description": "List of courses in this learning path",
                    "items": {
                      "x-go-type": "Course",
                      "type": "object",
                      "properties": {
                        "title": {
                          "type": "string",
                          "description": "Title of the course",
                          "example": "Kubernetes Basics"
                        },
                        "permalink": {
                          "type": "string",
                          "format": "uri",
                          "description": "URL to the course content",
                          "example": "http://localhost:9876/academy/learning-paths/layer5/intro-kubernetes-course/kubernetes/"
                        },
                        "description": {
                          "type": "string",
                          "description": "Course description",
                          "example": "Learn the basics of Kubernetes"
                        },
                        "weight": {
                          "type": "number",
                          "description": "Order of the course in the list",
                          "example": "eg 1 , 2"
                        },
                        "banner": {
                          "type": "string",
                          "format": "uri",
                          "nullable": true,
                          "description": "Optional banner image",
                          "example": null
                        }
                      },
                      "required": [
                        "title",
                        "permalink"
                      ]
                    }
                  }
                },
                "required": [
                  "title",
                  "description",
                  "permalink"
                ]
              },
              {
                "type": "object",
                "properties": {
                  "title": {
                    "type": "string",
                    "description": "Title of the learning path",
                    "example": "Mastering Kubernetes for Engineers"
                  },
                  "description": {
                    "type": "string",
                    "description": "Description of the learning path",
                    "example": "Learn how to configure your Kubernetes clusters and manage the lifecycle of your workloads"
                  },
                  "banner": {
                    "type": "string",
                    "format": "uri",
                    "nullable": true,
                    "description": "Optional banner image",
                    "example": null
                  },
                  "permalink": {
                    "type": "string",
                    "format": "uri",
                    "description": "Canonical URL for the learning path",
                    "example": "http://localhost:9876/academy/learning-paths/layer5/mastering-kubernetes-for-engineers/"
                  },
                  "courses": {
                    "type": "array",
                    "description": "List of courses in this learning path",
                    "items": {
                      "x-go-type": "Course",
                      "type": "object",
                      "properties": {
                        "title": {
                          "type": "string",
                          "description": "Title of the course",
                          "example": "Kubernetes Basics"
                        },
                        "permalink": {
                          "type": "string",
                          "format": "uri",
                          "description": "URL to the course content",
                          "example": "http://localhost:9876/academy/learning-paths/layer5/intro-kubernetes-course/kubernetes/"
                        },
                        "description": {
                          "type": "string",
                          "description": "Course description",
                          "example": "Learn the basics of Kubernetes"
                        },
                        "weight": {
                          "type": "number",
                          "description": "Order of the course in the list",
                          "example": "eg 1 , 2"
                        },
                        "banner": {
                          "type": "string",
                          "format": "uri",
                          "nullable": true,
                          "description": "Optional banner image",
                          "example": null
                        }
                      },
                      "required": [
                        "title",
                        "permalink"
                      ]
                    }
                  }
                },
                "required": [
                  "title",
                  "description",
                  "permalink"
                ]
              }
            ]
          }
        },
        "required": [
          "id",
          "type",
          "orgId",
          "visibility",
          "status",
          "slug",
          "createdAt",
          "updatedAt",
          "deletedAt",
          "metadata",
          "level"
        ]
      },
      "AcademyCirriculaListResponse": {
        "type": "object",
        "properties": {
          "total": {
            "type": "integer",
            "description": "Total number of cirricula",
            "example": 7
          },
          "data": {
            "type": "array",
            "items": {
              "x-go-type": "AcademyCirricula",
              "type": "object",
              "properties": {
                "id": {
                  "type": "string",
                  "description": "Id of the cirricula",
                  "example": "923458-3490394-934893",
                  "x-go-name": "ID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "id",
                    "json": "id",
                    "yaml": "id"
                  }
                },
                "type": {
                  "x-go-type": "ContentType",
                  "x-oapi-codegen-extra-tags": {
                    "db": "type"
                  },
                  "type": "string",
                  "enum": [
                    "learning-path",
                    "challenge",
                    "exam"
                  ]
                },
                "orgId": {
                  "type": "string",
                  "description": "Organization ID that owns this learning path",
                  "example": "layer5",
                  "x-oapi-codegen-extra-tags": {
                    "db": "org_id",
                    "json": "org_id",
                    "yaml": "org_id"
                  }
                },
                "visibility": {
                  "description": "Visibility of the cirricula",
                  "x-go-type": "Visibility",
                  "x-oapi-codegen-extra-tags": {
                    "db": "visibility",
                    "json": "visibility",
                    "yaml": "visibility"
                  },
                  "type": "string",
                  "enum": [
                    "public",
                    "private"
                  ]
                },
                "status": {
                  "example": "ready",
                  "description": "Status of the cirricula",
                  "x-go-type": "Status",
                  "x-oapi-codegen-extra-tags": {
                    "db": "status",
                    "json": "status",
                    "yaml": "status"
                  },
                  "type": "string",
                  "enum": [
                    "ready",
                    "archived",
                    "not_ready"
                  ]
                },
                "slug": {
                  "type": "string",
                  "description": "slug of the cirricula",
                  "example": "intro-kubernetes-course"
                },
                "level": {
                  "description": "Level of the cirricula",
                  "x-go-type": "Level",
                  "x-oapi-codegen-extra-tags": {
                    "db": "level",
                    "json": "level",
                    "yaml": "level"
                  },
                  "type": "string",
                  "enum": [
                    "beginner",
                    "intermediate",
                    "advanced"
                  ]
                },
                "createdAt": {
                  "description": "When the cirricula item was created",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at",
                    "json": "created_at",
                    "yaml": "created_at"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updatedAt": {
                  "description": "When the cirricula was last updated",
                  "x-go-type": "core.Time",
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at",
                    "json": "updated_at",
                    "yaml": "updated_at"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "deletedAt": {
                  "x-go-type": "core.NullTime",
                  "x-oapi-codegen-extra-tags": {
                    "db": "deleted_at",
                    "json": "deleted_at",
                    "yaml": "deleted_at"
                  },
                  "description": "Timestamp when the resource was deleted.",
                  "type": "string",
                  "format": "date-time",
                  "x-go-name": "DeletedAt",
                  "x-go-type-skip-optional-pointer": true
                },
                "metadata": {
                  "type": "object",
                  "description": "Additional metadata about the cirricula",
                  "additionalProperties": true,
                  "x-go-type": "core.Map",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "metadata",
                    "json": "metadata",
                    "yaml": "metadata"
                  },
                  "oneOf": [
                    {
                      "type": "object",
                      "properties": {
                        "title": {
                          "type": "string",
                          "description": "Title of the learning path",
                          "example": "Mastering Kubernetes for Engineers"
                        },
                        "description": {
                          "type": "string",
                          "description": "Description of the learning path",
                          "example": "Learn how to configure your Kubernetes clusters and manage the lifecycle of your workloads"
                        },
                        "banner": {
                          "type": "string",
                          "format": "uri",
                          "nullable": true,
                          "description": "Optional banner image",
                          "example": null
                        },
                        "permalink": {
                          "type": "string",
                          "format": "uri",
                          "description": "Canonical URL for the learning path",
                          "example": "http://localhost:9876/academy/learning-paths/layer5/mastering-kubernetes-for-engineers/"
                        },
                        "courses": {
                          "type": "array",
                          "description": "List of courses in this learning path",
                          "items": {
                            "x-go-type": "Course",
                            "type": "object",
                            "properties": {
                              "title": {
                                "type": "string",
                                "description": "Title of the course",
                                "example": "Kubernetes Basics"
                              },
                              "permalink": {
                                "type": "string",
                                "format": "uri",
                                "description": "URL to the course content",
                                "example": "http://localhost:9876/academy/learning-paths/layer5/intro-kubernetes-course/kubernetes/"
                              },
                              "description": {
                                "type": "string",
                                "description": "Course description",
                                "example": "Learn the basics of Kubernetes"
                              },
                              "weight": {
                                "type": "number",
                                "description": "Order of the course in the list",
                                "example": "eg 1 , 2"
                              },
                              "banner": {
                                "type": "string",
                                "format": "uri",
                                "nullable": true,
                                "description": "Optional banner image",
                                "example": null
                              }
                            },
                            "required": [
                              "title",
                              "permalink"
                            ]
                          }
                        }
                      },
                      "required": [
                        "title",
                        "description",
                        "permalink"
                      ]
                    },
                    {
                      "type": "object",
                      "properties": {
                        "title": {
                          "type": "string",
                          "description": "Title of the learning path",
                          "example": "Mastering Kubernetes for Engineers"
                        },
                        "description": {
                          "type": "string",
                          "description": "Description of the learning path",
                          "example": "Learn how to configure your Kubernetes clusters and manage the lifecycle of your workloads"
                        },
                        "banner": {
                          "type": "string",
                          "format": "uri",
                          "nullable": true,
                          "description": "Optional banner image",
                          "example": null
                        },
                        "permalink": {
                          "type": "string",
                          "format": "uri",
                          "description": "Canonical URL for the learning path",
                          "example": "http://localhost:9876/academy/learning-paths/layer5/mastering-kubernetes-for-engineers/"
                        },
                        "courses": {
                          "type": "array",
                          "description": "List of courses in this learning path",
                          "items": {
                            "x-go-type": "Course",
                            "type": "object",
                            "properties": {
                              "title": {
                                "type": "string",
                                "description": "Title of the course",
                                "example": "Kubernetes Basics"
                              },
                              "permalink": {
                                "type": "string",
                                "format": "uri",
                                "description": "URL to the course content",
                                "example": "http://localhost:9876/academy/learning-paths/layer5/intro-kubernetes-course/kubernetes/"
                              },
                              "description": {
                                "type": "string",
                                "description": "Course description",
                                "example": "Learn the basics of Kubernetes"
                              },
                              "weight": {
                                "type": "number",
                                "description": "Order of the course in the list",
                                "example": "eg 1 , 2"
                              },
                              "banner": {
                                "type": "string",
                                "format": "uri",
                                "nullable": true,
                                "description": "Optional banner image",
                                "example": null
                              }
                            },
                            "required": [
                              "title",
                              "permalink"
                            ]
                          }
                        }
                      },
                      "required": [
                        "title",
                        "description",
                        "permalink"
                      ]
                    }
                  ]
                }
              },
              "required": [
                "id",
                "type",
                "orgId",
                "visibility",
                "status",
                "slug",
                "createdAt",
                "updatedAt",
                "deletedAt",
                "metadata",
                "level"
              ]
            }
          }
        },
        "required": [
          "total",
          "data"
        ]
      },
      "ChallengeMetadata": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "description": "Title of the learning path",
            "example": "Mastering Kubernetes for Engineers"
          },
          "description": {
            "type": "string",
            "description": "Description of the learning path",
            "example": "Learn how to configure your Kubernetes clusters and manage the lifecycle of your workloads"
          },
          "banner": {
            "type": "string",
            "format": "uri",
            "nullable": true,
            "description": "Optional banner image",
            "example": null
          },
          "permalink": {
            "type": "string",
            "format": "uri",
            "description": "Canonical URL for the learning path",
            "example": "http://localhost:9876/academy/learning-paths/layer5/mastering-kubernetes-for-engineers/"
          },
          "courses": {
            "type": "array",
            "description": "List of courses in this learning path",
            "items": {
              "x-go-type": "Course",
              "type": "object",
              "properties": {
                "title": {
                  "type": "string",
                  "description": "Title of the course",
                  "example": "Kubernetes Basics"
                },
                "permalink": {
                  "type": "string",
                  "format": "uri",
                  "description": "URL to the course content",
                  "example": "http://localhost:9876/academy/learning-paths/layer5/intro-kubernetes-course/kubernetes/"
                },
                "description": {
                  "type": "string",
                  "description": "Course description",
                  "example": "Learn the basics of Kubernetes"
                },
                "weight": {
                  "type": "number",
                  "description": "Order of the course in the list",
                  "example": "eg 1 , 2"
                },
                "banner": {
                  "type": "string",
                  "format": "uri",
                  "nullable": true,
                  "description": "Optional banner image",
                  "example": null
                }
              },
              "required": [
                "title",
                "permalink"
              ]
            }
          }
        },
        "required": [
          "title",
          "description",
          "permalink"
        ]
      },
      "LearningPathMetadata": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "description": "Title of the learning path",
            "example": "Mastering Kubernetes for Engineers"
          },
          "description": {
            "type": "string",
            "description": "Description of the learning path",
            "example": "Learn how to configure your Kubernetes clusters and manage the lifecycle of your workloads"
          },
          "banner": {
            "type": "string",
            "format": "uri",
            "nullable": true,
            "description": "Optional banner image",
            "example": null
          },
          "permalink": {
            "type": "string",
            "format": "uri",
            "description": "Canonical URL for the learning path",
            "example": "http://localhost:9876/academy/learning-paths/layer5/mastering-kubernetes-for-engineers/"
          },
          "courses": {
            "type": "array",
            "description": "List of courses in this learning path",
            "items": {
              "x-go-type": "Course",
              "type": "object",
              "properties": {
                "title": {
                  "type": "string",
                  "description": "Title of the course",
                  "example": "Kubernetes Basics"
                },
                "permalink": {
                  "type": "string",
                  "format": "uri",
                  "description": "URL to the course content",
                  "example": "http://localhost:9876/academy/learning-paths/layer5/intro-kubernetes-course/kubernetes/"
                },
                "description": {
                  "type": "string",
                  "description": "Course description",
                  "example": "Learn the basics of Kubernetes"
                },
                "weight": {
                  "type": "number",
                  "description": "Order of the course in the list",
                  "example": "eg 1 , 2"
                },
                "banner": {
                  "type": "string",
                  "format": "uri",
                  "nullable": true,
                  "description": "Optional banner image",
                  "example": null
                }
              },
              "required": [
                "title",
                "permalink"
              ]
            }
          }
        },
        "required": [
          "title",
          "description",
          "permalink"
        ]
      },
      "AcademyRegistration": {
        "type": "object",
        "required": [
          "ID",
          "org_id",
          "user_id",
          "status",
          "created_at",
          "updated_at",
          "content_id",
          "metadata"
        ],
        "properties": {
          "ID": {
            "x-oapi-codegen-extra-tags": {
              "db": "id",
              "json": "id",
              "yaml": "id"
            },
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "org_id": {
            "description": "ID of the organization",
            "x-oapi-codegen-extra-tags": {
              "db": "org_id"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "content_id": {
            "type": "string",
            "description": "ID of the course content",
            "x-oapi-codegen-extra-tags": {
              "db": "content_id"
            }
          },
          "user_id": {
            "description": "ID of the user (foreign key to User)",
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
          "status": {
            "type": "string",
            "enum": [
              "registered",
              "in_progress",
              "completed",
              "failed",
              "withdrawn"
            ],
            "description": "Status of the user's course registration",
            "x-oapi-codegen-extra-tags": {
              "db": "status"
            }
          },
          "updated_at": {
            "description": "When the registration was updated",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "created_at": {
            "description": "When the registration was created",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deleted_at": {
            "x-go-type": "core.NullTime",
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at"
            },
            "description": "Timestamp when the resource was deleted.",
            "type": "string",
            "format": "date-time",
            "x-go-name": "DeletedAt",
            "x-go-type-skip-optional-pointer": true
          },
          "metadata": {
            "type": "object",
            "description": "Additional metadata about the registration",
            "additionalProperties": true,
            "x-go-type": "core.Map",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "metadata"
            }
          }
        }
      },
      "Course": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "description": "Title of the course",
            "example": "Kubernetes Basics"
          },
          "permalink": {
            "type": "string",
            "format": "uri",
            "description": "URL to the course content",
            "example": "http://localhost:9876/academy/learning-paths/layer5/intro-kubernetes-course/kubernetes/"
          },
          "description": {
            "type": "string",
            "description": "Course description",
            "example": "Learn the basics of Kubernetes"
          },
          "weight": {
            "type": "number",
            "description": "Order of the course in the list",
            "example": "eg 1 , 2"
          },
          "banner": {
            "type": "string",
            "format": "uri",
            "nullable": true,
            "description": "Optional banner image",
            "example": null
          }
        },
        "required": [
          "title",
          "permalink"
        ]
      },
      "AcademyRegistrationsListResponse": {
        "type": "object",
        "properties": {
          "total": {
            "type": "integer",
            "description": "Total number of learning paths",
            "example": 7
          },
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "required": [
                "ID",
                "org_id",
                "user_id",
                "status",
                "created_at",
                "updated_at",
                "content_id",
                "metadata"
              ],
              "properties": {
                "ID": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "id",
                    "json": "id",
                    "yaml": "id"
                  },
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "org_id": {
                  "description": "ID of the organization",
                  "x-oapi-codegen-extra-tags": {
                    "db": "org_id"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "content_id": {
                  "type": "string",
                  "description": "ID of the course content",
                  "x-oapi-codegen-extra-tags": {
                    "db": "content_id"
                  }
                },
                "user_id": {
                  "description": "ID of the user (foreign key to User)",
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
                "status": {
                  "type": "string",
                  "enum": [
                    "registered",
                    "in_progress",
                    "completed",
                    "failed",
                    "withdrawn"
                  ],
                  "description": "Status of the user's course registration",
                  "x-oapi-codegen-extra-tags": {
                    "db": "status"
                  }
                },
                "updated_at": {
                  "description": "When the registration was updated",
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "created_at": {
                  "description": "When the registration was created",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "deleted_at": {
                  "x-go-type": "core.NullTime",
                  "x-oapi-codegen-extra-tags": {
                    "db": "deleted_at"
                  },
                  "description": "Timestamp when the resource was deleted.",
                  "type": "string",
                  "format": "date-time",
                  "x-go-name": "DeletedAt",
                  "x-go-type-skip-optional-pointer": true
                },
                "metadata": {
                  "type": "object",
                  "description": "Additional metadata about the registration",
                  "additionalProperties": true,
                  "x-go-type": "core.Map",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "metadata"
                  }
                }
              },
              "x-go-type": "AcademyRegistration"
            }
          }
        },
        "required": [
          "total",
          "data"
        ]
      }
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
};

export default schema;
