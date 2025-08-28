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
    "/api/academy/cirricula/registered": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Academy"
        ],
        "operationId": "getMyAcademyCirricula",
        "summary": "Get academy content",
        "description": "Returns a list of academy content registered by the user with optional filtering.",
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
                            "certification"
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
                              "x-go-type": "CurriculaMetadata",
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
                                  "description": "Filename of the banner image, which should be placed in the same directory as the _index.md file",
                                  "example": "kubernetes-icon.svg"
                                },
                                "permalink": {
                                  "type": "string",
                                  "format": "uri",
                                  "description": "Canonical URL for the learning path",
                                  "example": "http://localhost:9876/academy/learning-paths/layer5/mastering-kubernetes-for-engineers/"
                                },
                                "badge": {
                                  "x-go-type-import": {
                                    "path": "github.com/meshery/schemas/models/v1beta1/badge"
                                  },
                                  "x-go-type": "badge.Badge",
                                  "type": "object",
                                  "required": [
                                    "id",
                                    "label",
                                    "name",
                                    "org_id",
                                    "description",
                                    "image_url",
                                    "created_at",
                                    "updated_at",
                                    "deleted_at"
                                  ],
                                  "properties": {
                                    "id": {
                                      "x-go-name": "ID",
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "id",
                                        "json": "id"
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
                                      "description": "The ID of the organization in which this badge is available .",
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "org_id",
                                        "json": "org_id"
                                      },
                                      "type": "string",
                                      "format": "uuid",
                                      "x-go-type": "uuid.UUID",
                                      "x-go-type-import": {
                                        "path": "github.com/gofrs/uuid"
                                      }
                                    },
                                    "label": {
                                      "type": "string",
                                      "description": "unique identifier for the badge ( auto generated )",
                                      "example": "Kubernetes-Expert",
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "label",
                                        "json": "label"
                                      }
                                    },
                                    "name": {
                                      "type": "string",
                                      "description": "Concise descriptor for the badge or certificate.",
                                      "example": "Kubernetes Expert",
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "name",
                                        "json": "name"
                                      }
                                    },
                                    "description": {
                                      "type": "string",
                                      "description": "A description of the milestone achieved, often including criteria for receiving this recognition.",
                                      "example": "Awarded for mastering Kubernetes concepts and practices.",
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "description",
                                        "json": "description"
                                      }
                                    },
                                    "image_url": {
                                      "type": "string",
                                      "format": "uri",
                                      "description": "URL to the badge image",
                                      "example": "https://raw.githubusercontent.com/layer5io/layer5-academy/refs/heads/master/static/11111111-1111-1111-1111-111111111111/images/meshery-logo-light.webp",
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "image_url",
                                        "json": "image_url"
                                      }
                                    },
                                    "created_at": {
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
                                    },
                                    "deleted_at": {
                                      "description": "Timestamp when the resource was deleted.",
                                      "x-go-type": "time.Time",
                                      "type": "string",
                                      "format": "date-time",
                                      "x-go-name": "DeletedAt",
                                      "x-oapi-codegen-extra-tags": {
                                        "db": "deleted_at",
                                        "yaml": "deleted_at"
                                      },
                                      "x-go-type-skip-optional-pointer": true
                                    }
                                  }
                                },
                                "certificate": {
                                  "x-go-type": "Certificate",
                                  "type": "object",
                                  "required": [
                                    "id",
                                    "org_id",
                                    "title",
                                    "description",
                                    "issuing_authorities",
                                    "issued_date",
                                    "recipient_id",
                                    "recipient_name"
                                  ],
                                  "properties": {
                                    "id": {
                                      "type": "string",
                                      "description": "Unique identifier for the certificate",
                                      "example": "1234567890abcdef",
                                      "x-go-name": "ID"
                                    },
                                    "org_id": {
                                      "description": "UUID of the organization that issued the certificate",
                                      "type": "string",
                                      "format": "uuid",
                                      "x-go-type": "uuid.UUID",
                                      "x-go-type-import": {
                                        "path": "github.com/gofrs/uuid"
                                      }
                                    },
                                    "recipient_id": {
                                      "type": "string",
                                      "description": "ID of the recipient (user) who received the certificate",
                                      "example": "1234567890abcdef"
                                    },
                                    "recipient_name": {
                                      "type": "string",
                                      "description": "Name of the recipient (user) who received the certificate",
                                      "example": "John Doe"
                                    },
                                    "title": {
                                      "type": "string",
                                      "description": "Title of the certificate",
                                      "example": "Kubernetes Expert Certification"
                                    },
                                    "description": {
                                      "type": "string",
                                      "description": "Description of the certificate",
                                      "example": "Awarded for successfully completing the Kubernetes Expert course"
                                    },
                                    "issuing_authorities": {
                                      "type": "array",
                                      "items": {
                                        "x-go-type": "CertificateIssuingAuthority",
                                        "type": "object",
                                        "required": [
                                          "name",
                                          "url"
                                        ],
                                        "properties": {
                                          "name": {
                                            "type": "string",
                                            "description": "Name of the issuing authority",
                                            "example": "Cloud Native Foundation"
                                          },
                                          "role": {
                                            "type": "string",
                                            "description": "Role of the issuing authority",
                                            "example": "COO"
                                          },
                                          "signature_url": {
                                            "type": "string",
                                            "format": "uri",
                                            "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                                            "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                                          }
                                        }
                                      },
                                      "description": "List of issuing authorities for the certificate"
                                    },
                                    "issued_date": {
                                      "type": "string",
                                      "format": "date-time",
                                      "description": "Date when the certificate was issued",
                                      "example": "2023-10-01T12:00:00Z"
                                    },
                                    "expiration_date": {
                                      "type": "string",
                                      "format": "date-time",
                                      "description": "Date when the certificate expires (optional)",
                                      "example": "2025-10-01T12:00:00Z"
                                    }
                                  }
                                },
                                "children": {
                                  "type": "array",
                                  "description": "List of children items in the top-level curricula",
                                  "items": {
                                    "x-go-type": "ChildNode",
                                    "type": "object",
                                    "properties": {
                                      "id": {
                                        "type": "string",
                                        "description": "Unique identifier for the course",
                                        "example": "1234567890abcdef",
                                        "x-go-name": "ID",
                                        "x-oapi-codegen-extra-tags": {
                                          "db": "id",
                                          "json": "id",
                                          "yaml": "id"
                                        }
                                      },
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
                                        "description": "A numeric value to determine the display order. A smaller number appears first. If not specified, items will be sorted alphabetically by title.",
                                        "example": "eg 1 , 2"
                                      },
                                      "banner": {
                                        "type": "string",
                                        "format": "uri",
                                        "nullable": true,
                                        "description": "Filename of the banner image, which should be placed in the same directory as the _index.md file",
                                        "example": "kubernetes-icon.svg"
                                      },
                                      "type": {
                                        "x-go-type": "ContentType",
                                        "description": "Type of the content (e.g., learning-path, challenge, certification)",
                                        "type": "string",
                                        "enum": [
                                          "learning-path",
                                          "challenge",
                                          "certification"
                                        ]
                                      },
                                      "children": {
                                        "type": "array",
                                        "description": "List of child nodes (sub-courses or modules)",
                                        "items": {
                                          "type": "object",
                                          "x-go-type": "ChildNode"
                                        }
                                      }
                                    },
                                    "required": [
                                      "title",
                                      "description",
                                      "id",
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
    "/api/academy/cirricula": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Academy"
        ],
        "operationId": "getAcademyCirricula",
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
            "name": "visibility",
            "in": "query",
            "description": "Filter content by visibility (public/private)",
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
            "name": "level",
            "in": "query",
            "description": "Filter content by difficulty level",
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
                      "x-go-type": "AcademyCurriculaWithMetrics",
                      "x-go-type-skip-optional-pointer": true,
                      "allOf": [
                        {
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
                                "certification"
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
                                  "x-go-type": "CurriculaMetadata",
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
                                      "description": "Filename of the banner image, which should be placed in the same directory as the _index.md file",
                                      "example": "kubernetes-icon.svg"
                                    },
                                    "permalink": {
                                      "type": "string",
                                      "format": "uri",
                                      "description": "Canonical URL for the learning path",
                                      "example": "http://localhost:9876/academy/learning-paths/layer5/mastering-kubernetes-for-engineers/"
                                    },
                                    "badge": {
                                      "x-go-type-import": {
                                        "path": "github.com/meshery/schemas/models/v1beta1/badge"
                                      },
                                      "x-go-type": "badge.Badge",
                                      "type": "object",
                                      "required": [
                                        "id",
                                        "label",
                                        "name",
                                        "org_id",
                                        "description",
                                        "image_url",
                                        "created_at",
                                        "updated_at",
                                        "deleted_at"
                                      ],
                                      "properties": {
                                        "id": {
                                          "x-go-name": "ID",
                                          "x-oapi-codegen-extra-tags": {
                                            "db": "id",
                                            "json": "id"
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
                                          "description": "The ID of the organization in which this badge is available .",
                                          "x-oapi-codegen-extra-tags": {
                                            "db": "org_id",
                                            "json": "org_id"
                                          },
                                          "type": "string",
                                          "format": "uuid",
                                          "x-go-type": "uuid.UUID",
                                          "x-go-type-import": {
                                            "path": "github.com/gofrs/uuid"
                                          }
                                        },
                                        "label": {
                                          "type": "string",
                                          "description": "unique identifier for the badge ( auto generated )",
                                          "example": "Kubernetes-Expert",
                                          "x-oapi-codegen-extra-tags": {
                                            "db": "label",
                                            "json": "label"
                                          }
                                        },
                                        "name": {
                                          "type": "string",
                                          "description": "Concise descriptor for the badge or certificate.",
                                          "example": "Kubernetes Expert",
                                          "x-oapi-codegen-extra-tags": {
                                            "db": "name",
                                            "json": "name"
                                          }
                                        },
                                        "description": {
                                          "type": "string",
                                          "description": "A description of the milestone achieved, often including criteria for receiving this recognition.",
                                          "example": "Awarded for mastering Kubernetes concepts and practices.",
                                          "x-oapi-codegen-extra-tags": {
                                            "db": "description",
                                            "json": "description"
                                          }
                                        },
                                        "image_url": {
                                          "type": "string",
                                          "format": "uri",
                                          "description": "URL to the badge image",
                                          "example": "https://raw.githubusercontent.com/layer5io/layer5-academy/refs/heads/master/static/11111111-1111-1111-1111-111111111111/images/meshery-logo-light.webp",
                                          "x-oapi-codegen-extra-tags": {
                                            "db": "image_url",
                                            "json": "image_url"
                                          }
                                        },
                                        "created_at": {
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
                                        },
                                        "deleted_at": {
                                          "description": "Timestamp when the resource was deleted.",
                                          "x-go-type": "time.Time",
                                          "type": "string",
                                          "format": "date-time",
                                          "x-go-name": "DeletedAt",
                                          "x-oapi-codegen-extra-tags": {
                                            "db": "deleted_at",
                                            "yaml": "deleted_at"
                                          },
                                          "x-go-type-skip-optional-pointer": true
                                        }
                                      }
                                    },
                                    "certificate": {
                                      "x-go-type": "Certificate",
                                      "type": "object",
                                      "required": [
                                        "id",
                                        "org_id",
                                        "title",
                                        "description",
                                        "issuing_authorities",
                                        "issued_date",
                                        "recipient_id",
                                        "recipient_name"
                                      ],
                                      "properties": {
                                        "id": {
                                          "type": "string",
                                          "description": "Unique identifier for the certificate",
                                          "example": "1234567890abcdef",
                                          "x-go-name": "ID"
                                        },
                                        "org_id": {
                                          "description": "UUID of the organization that issued the certificate",
                                          "type": "string",
                                          "format": "uuid",
                                          "x-go-type": "uuid.UUID",
                                          "x-go-type-import": {
                                            "path": "github.com/gofrs/uuid"
                                          }
                                        },
                                        "recipient_id": {
                                          "type": "string",
                                          "description": "ID of the recipient (user) who received the certificate",
                                          "example": "1234567890abcdef"
                                        },
                                        "recipient_name": {
                                          "type": "string",
                                          "description": "Name of the recipient (user) who received the certificate",
                                          "example": "John Doe"
                                        },
                                        "title": {
                                          "type": "string",
                                          "description": "Title of the certificate",
                                          "example": "Kubernetes Expert Certification"
                                        },
                                        "description": {
                                          "type": "string",
                                          "description": "Description of the certificate",
                                          "example": "Awarded for successfully completing the Kubernetes Expert course"
                                        },
                                        "issuing_authorities": {
                                          "type": "array",
                                          "items": {
                                            "x-go-type": "CertificateIssuingAuthority",
                                            "type": "object",
                                            "required": [
                                              "name",
                                              "url"
                                            ],
                                            "properties": {
                                              "name": {
                                                "type": "string",
                                                "description": "Name of the issuing authority",
                                                "example": "Cloud Native Foundation"
                                              },
                                              "role": {
                                                "type": "string",
                                                "description": "Role of the issuing authority",
                                                "example": "COO"
                                              },
                                              "signature_url": {
                                                "type": "string",
                                                "format": "uri",
                                                "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                                                "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                                              }
                                            }
                                          },
                                          "description": "List of issuing authorities for the certificate"
                                        },
                                        "issued_date": {
                                          "type": "string",
                                          "format": "date-time",
                                          "description": "Date when the certificate was issued",
                                          "example": "2023-10-01T12:00:00Z"
                                        },
                                        "expiration_date": {
                                          "type": "string",
                                          "format": "date-time",
                                          "description": "Date when the certificate expires (optional)",
                                          "example": "2025-10-01T12:00:00Z"
                                        }
                                      }
                                    },
                                    "children": {
                                      "type": "array",
                                      "description": "List of children items in the top-level curricula",
                                      "items": {
                                        "x-go-type": "ChildNode",
                                        "type": "object",
                                        "properties": {
                                          "id": {
                                            "type": "string",
                                            "description": "Unique identifier for the course",
                                            "example": "1234567890abcdef",
                                            "x-go-name": "ID",
                                            "x-oapi-codegen-extra-tags": {
                                              "db": "id",
                                              "json": "id",
                                              "yaml": "id"
                                            }
                                          },
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
                                            "description": "A numeric value to determine the display order. A smaller number appears first. If not specified, items will be sorted alphabetically by title.",
                                            "example": "eg 1 , 2"
                                          },
                                          "banner": {
                                            "type": "string",
                                            "format": "uri",
                                            "nullable": true,
                                            "description": "Filename of the banner image, which should be placed in the same directory as the _index.md file",
                                            "example": "kubernetes-icon.svg"
                                          },
                                          "type": {
                                            "x-go-type": "ContentType",
                                            "description": "Type of the content (e.g., learning-path, challenge, certification)",
                                            "type": "string",
                                            "enum": [
                                              "learning-path",
                                              "challenge",
                                              "certification"
                                            ]
                                          },
                                          "children": {
                                            "type": "array",
                                            "description": "List of child nodes (sub-courses or modules)",
                                            "items": {
                                              "type": "object",
                                              "x-go-type": "ChildNode"
                                            }
                                          }
                                        },
                                        "required": [
                                          "title",
                                          "description",
                                          "id",
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
                        {
                          "type": "object",
                          "required": [
                            "RegistrationCount"
                          ],
                          "properties": {
                            "RegistrationCount": {
                              "type": "number",
                              "x-oapi-codegen-extra-tags": {
                                "db": "registration_count,omitempty",
                                "json": "registration_count,omitempty",
                                "yaml": "registration_count,omitempty"
                              }
                            }
                          }
                        }
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
                        "certification"
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
                          "x-go-type": "CurriculaMetadata",
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
                              "description": "Filename of the banner image, which should be placed in the same directory as the _index.md file",
                              "example": "kubernetes-icon.svg"
                            },
                            "permalink": {
                              "type": "string",
                              "format": "uri",
                              "description": "Canonical URL for the learning path",
                              "example": "http://localhost:9876/academy/learning-paths/layer5/mastering-kubernetes-for-engineers/"
                            },
                            "badge": {
                              "x-go-type-import": {
                                "path": "github.com/meshery/schemas/models/v1beta1/badge"
                              },
                              "x-go-type": "badge.Badge",
                              "type": "object",
                              "required": [
                                "id",
                                "label",
                                "name",
                                "org_id",
                                "description",
                                "image_url",
                                "created_at",
                                "updated_at",
                                "deleted_at"
                              ],
                              "properties": {
                                "id": {
                                  "x-go-name": "ID",
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "id",
                                    "json": "id"
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
                                  "description": "The ID of the organization in which this badge is available .",
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "org_id",
                                    "json": "org_id"
                                  },
                                  "type": "string",
                                  "format": "uuid",
                                  "x-go-type": "uuid.UUID",
                                  "x-go-type-import": {
                                    "path": "github.com/gofrs/uuid"
                                  }
                                },
                                "label": {
                                  "type": "string",
                                  "description": "unique identifier for the badge ( auto generated )",
                                  "example": "Kubernetes-Expert",
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "label",
                                    "json": "label"
                                  }
                                },
                                "name": {
                                  "type": "string",
                                  "description": "Concise descriptor for the badge or certificate.",
                                  "example": "Kubernetes Expert",
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "name",
                                    "json": "name"
                                  }
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the milestone achieved, often including criteria for receiving this recognition.",
                                  "example": "Awarded for mastering Kubernetes concepts and practices.",
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "description",
                                    "json": "description"
                                  }
                                },
                                "image_url": {
                                  "type": "string",
                                  "format": "uri",
                                  "description": "URL to the badge image",
                                  "example": "https://raw.githubusercontent.com/layer5io/layer5-academy/refs/heads/master/static/11111111-1111-1111-1111-111111111111/images/meshery-logo-light.webp",
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "image_url",
                                    "json": "image_url"
                                  }
                                },
                                "created_at": {
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
                                },
                                "deleted_at": {
                                  "description": "Timestamp when the resource was deleted.",
                                  "x-go-type": "time.Time",
                                  "type": "string",
                                  "format": "date-time",
                                  "x-go-name": "DeletedAt",
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "deleted_at",
                                    "yaml": "deleted_at"
                                  },
                                  "x-go-type-skip-optional-pointer": true
                                }
                              }
                            },
                            "certificate": {
                              "x-go-type": "Certificate",
                              "type": "object",
                              "required": [
                                "id",
                                "org_id",
                                "title",
                                "description",
                                "issuing_authorities",
                                "issued_date",
                                "recipient_id",
                                "recipient_name"
                              ],
                              "properties": {
                                "id": {
                                  "type": "string",
                                  "description": "Unique identifier for the certificate",
                                  "example": "1234567890abcdef",
                                  "x-go-name": "ID"
                                },
                                "org_id": {
                                  "description": "UUID of the organization that issued the certificate",
                                  "type": "string",
                                  "format": "uuid",
                                  "x-go-type": "uuid.UUID",
                                  "x-go-type-import": {
                                    "path": "github.com/gofrs/uuid"
                                  }
                                },
                                "recipient_id": {
                                  "type": "string",
                                  "description": "ID of the recipient (user) who received the certificate",
                                  "example": "1234567890abcdef"
                                },
                                "recipient_name": {
                                  "type": "string",
                                  "description": "Name of the recipient (user) who received the certificate",
                                  "example": "John Doe"
                                },
                                "title": {
                                  "type": "string",
                                  "description": "Title of the certificate",
                                  "example": "Kubernetes Expert Certification"
                                },
                                "description": {
                                  "type": "string",
                                  "description": "Description of the certificate",
                                  "example": "Awarded for successfully completing the Kubernetes Expert course"
                                },
                                "issuing_authorities": {
                                  "type": "array",
                                  "items": {
                                    "x-go-type": "CertificateIssuingAuthority",
                                    "type": "object",
                                    "required": [
                                      "name",
                                      "url"
                                    ],
                                    "properties": {
                                      "name": {
                                        "type": "string",
                                        "description": "Name of the issuing authority",
                                        "example": "Cloud Native Foundation"
                                      },
                                      "role": {
                                        "type": "string",
                                        "description": "Role of the issuing authority",
                                        "example": "COO"
                                      },
                                      "signature_url": {
                                        "type": "string",
                                        "format": "uri",
                                        "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                                        "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                                      }
                                    }
                                  },
                                  "description": "List of issuing authorities for the certificate"
                                },
                                "issued_date": {
                                  "type": "string",
                                  "format": "date-time",
                                  "description": "Date when the certificate was issued",
                                  "example": "2023-10-01T12:00:00Z"
                                },
                                "expiration_date": {
                                  "type": "string",
                                  "format": "date-time",
                                  "description": "Date when the certificate expires (optional)",
                                  "example": "2025-10-01T12:00:00Z"
                                }
                              }
                            },
                            "children": {
                              "type": "array",
                              "description": "List of children items in the top-level curricula",
                              "items": {
                                "x-go-type": "ChildNode",
                                "type": "object",
                                "properties": {
                                  "id": {
                                    "type": "string",
                                    "description": "Unique identifier for the course",
                                    "example": "1234567890abcdef",
                                    "x-go-name": "ID",
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "id",
                                      "json": "id",
                                      "yaml": "id"
                                    }
                                  },
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
                                    "description": "A numeric value to determine the display order. A smaller number appears first. If not specified, items will be sorted alphabetically by title.",
                                    "example": "eg 1 , 2"
                                  },
                                  "banner": {
                                    "type": "string",
                                    "format": "uri",
                                    "nullable": true,
                                    "description": "Filename of the banner image, which should be placed in the same directory as the _index.md file",
                                    "example": "kubernetes-icon.svg"
                                  },
                                  "type": {
                                    "x-go-type": "ContentType",
                                    "description": "Type of the content (e.g., learning-path, challenge, certification)",
                                    "type": "string",
                                    "enum": [
                                      "learning-path",
                                      "challenge",
                                      "certification"
                                    ]
                                  },
                                  "children": {
                                    "type": "array",
                                    "description": "List of child nodes (sub-courses or modules)",
                                    "items": {
                                      "type": "object",
                                      "x-go-type": "ChildNode"
                                    }
                                  }
                                },
                                "required": [
                                  "title",
                                  "description",
                                  "id",
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
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Academy"
        ],
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
                      "certification"
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
                    "id",
                    "org_id",
                    "user_id",
                    "status",
                    "created_at",
                    "updated_at",
                    "content_id",
                    "certificate",
                    "metadata"
                  ],
                  "properties": {
                    "id": {
                      "x-go-name": "ID",
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
                      "x-go-type": "AcademyRegistrationStatus",
                      "description": "Status of the user's course registration",
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      },
                      "type": "string",
                      "enum": [
                        "registered",
                        "completed",
                        "failed",
                        "withdrawn"
                      ]
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
                      "description": "Timestamp when the resource was deleted.",
                      "x-go-type": "time.Time",
                      "type": "string",
                      "format": "date-time",
                      "x-go-name": "DeletedAt",
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "yaml": "deleted_at"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "certificate": {
                      "x-go-type": "core.Map",
                      "description": "Issued certificate for completing the curricula under registration",
                      "x-oapi-codegen-extra-tags": {
                        "db": "certificate"
                      },
                      "type": "object",
                      "required": [
                        "id",
                        "org_id",
                        "title",
                        "description",
                        "issuing_authorities",
                        "issued_date",
                        "recipient_id",
                        "recipient_name"
                      ],
                      "properties": {
                        "id": {
                          "type": "string",
                          "description": "Unique identifier for the certificate",
                          "example": "1234567890abcdef",
                          "x-go-name": "ID"
                        },
                        "org_id": {
                          "description": "UUID of the organization that issued the certificate",
                          "type": "string",
                          "format": "uuid",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          }
                        },
                        "recipient_id": {
                          "type": "string",
                          "description": "ID of the recipient (user) who received the certificate",
                          "example": "1234567890abcdef"
                        },
                        "recipient_name": {
                          "type": "string",
                          "description": "Name of the recipient (user) who received the certificate",
                          "example": "John Doe"
                        },
                        "title": {
                          "type": "string",
                          "description": "Title of the certificate",
                          "example": "Kubernetes Expert Certification"
                        },
                        "description": {
                          "type": "string",
                          "description": "Description of the certificate",
                          "example": "Awarded for successfully completing the Kubernetes Expert course"
                        },
                        "issuing_authorities": {
                          "type": "array",
                          "items": {
                            "x-go-type": "CertificateIssuingAuthority",
                            "type": "object",
                            "required": [
                              "name",
                              "url"
                            ],
                            "properties": {
                              "name": {
                                "type": "string",
                                "description": "Name of the issuing authority",
                                "example": "Cloud Native Foundation"
                              },
                              "role": {
                                "type": "string",
                                "description": "Role of the issuing authority",
                                "example": "COO"
                              },
                              "signature_url": {
                                "type": "string",
                                "format": "uri",
                                "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                                "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                              }
                            }
                          },
                          "description": "List of issuing authorities for the certificate"
                        },
                        "issued_date": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Date when the certificate was issued",
                          "example": "2023-10-01T12:00:00Z"
                        },
                        "expiration_date": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Date when the certificate expires (optional)",
                          "example": "2025-10-01T12:00:00Z"
                        }
                      }
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
        }
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
                    "id",
                    "org_id",
                    "user_id",
                    "status",
                    "created_at",
                    "updated_at",
                    "content_id",
                    "certificate",
                    "metadata"
                  ],
                  "properties": {
                    "id": {
                      "x-go-name": "ID",
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
                      "x-go-type": "AcademyRegistrationStatus",
                      "description": "Status of the user's course registration",
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      },
                      "type": "string",
                      "enum": [
                        "registered",
                        "completed",
                        "failed",
                        "withdrawn"
                      ]
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
                      "description": "Timestamp when the resource was deleted.",
                      "x-go-type": "time.Time",
                      "type": "string",
                      "format": "date-time",
                      "x-go-name": "DeletedAt",
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "yaml": "deleted_at"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "certificate": {
                      "x-go-type": "core.Map",
                      "description": "Issued certificate for completing the curricula under registration",
                      "x-oapi-codegen-extra-tags": {
                        "db": "certificate"
                      },
                      "type": "object",
                      "required": [
                        "id",
                        "org_id",
                        "title",
                        "description",
                        "issuing_authorities",
                        "issued_date",
                        "recipient_id",
                        "recipient_name"
                      ],
                      "properties": {
                        "id": {
                          "type": "string",
                          "description": "Unique identifier for the certificate",
                          "example": "1234567890abcdef",
                          "x-go-name": "ID"
                        },
                        "org_id": {
                          "description": "UUID of the organization that issued the certificate",
                          "type": "string",
                          "format": "uuid",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          }
                        },
                        "recipient_id": {
                          "type": "string",
                          "description": "ID of the recipient (user) who received the certificate",
                          "example": "1234567890abcdef"
                        },
                        "recipient_name": {
                          "type": "string",
                          "description": "Name of the recipient (user) who received the certificate",
                          "example": "John Doe"
                        },
                        "title": {
                          "type": "string",
                          "description": "Title of the certificate",
                          "example": "Kubernetes Expert Certification"
                        },
                        "description": {
                          "type": "string",
                          "description": "Description of the certificate",
                          "example": "Awarded for successfully completing the Kubernetes Expert course"
                        },
                        "issuing_authorities": {
                          "type": "array",
                          "items": {
                            "x-go-type": "CertificateIssuingAuthority",
                            "type": "object",
                            "required": [
                              "name",
                              "url"
                            ],
                            "properties": {
                              "name": {
                                "type": "string",
                                "description": "Name of the issuing authority",
                                "example": "Cloud Native Foundation"
                              },
                              "role": {
                                "type": "string",
                                "description": "Role of the issuing authority",
                                "example": "COO"
                              },
                              "signature_url": {
                                "type": "string",
                                "format": "uri",
                                "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                                "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                              }
                            }
                          },
                          "description": "List of issuing authorities for the certificate"
                        },
                        "issued_date": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Date when the certificate was issued",
                          "example": "2023-10-01T12:00:00Z"
                        },
                        "expiration_date": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Date when the certificate expires (optional)",
                          "example": "2025-10-01T12:00:00Z"
                        }
                      }
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
    },
    "/api/academy/registrations/{registrationId}/progress-tracker/update-current-item": {
      "post": {
        "tags": [
          "Academy"
        ],
        "x-internal": [
          "cloud"
        ],
        "operationId": "updateCurrentItemInProgressTracker",
        "summary": "Update the current item in the progress tracker",
        "parameters": [
          {
            "name": "registrationId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            },
            "description": "The ID of the registration"
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "content_type": {
                    "type": "string",
                    "enum": [
                      "learning-path",
                      "challenge",
                      "certification"
                    ],
                    "x-go-type": "ContentType"
                  },
                  "item_data": {
                    "x-go-type": "CirriculaCurrentItemData",
                    "type": "object",
                    "required": [
                      "id",
                      "last_opened",
                      "content_type"
                    ],
                    "properties": {
                      "id": {
                        "type": "string"
                      },
                      "last_opened": {
                        "type": "string",
                        "format": "date-time"
                      },
                      "content_type": {
                        "type": "string",
                        "enum": [
                          "learning-path",
                          "challenge",
                          "certification"
                        ],
                        "x-go-type": "ContentType"
                      }
                    }
                  }
                },
                "required": [
                  "content_type",
                  "item_data"
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successfully updated the progress tracker",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "progress_tracker": {
                      "type": "object",
                      "required": [
                        "current_item",
                        "grades",
                        "time_spent",
                        "completed",
                        "completed_items"
                      ],
                      "properties": {
                        "current_item": {
                          "type": "object",
                          "additionalProperties": {
                            "x-go-type": "CirriculaCurrentItemData",
                            "type": "object",
                            "required": [
                              "id",
                              "last_opened",
                              "content_type"
                            ],
                            "properties": {
                              "id": {
                                "type": "string"
                              },
                              "last_opened": {
                                "type": "string",
                                "format": "date-time"
                              },
                              "content_type": {
                                "type": "string",
                                "enum": [
                                  "learning-path",
                                  "challenge",
                                  "certification"
                                ],
                                "x-go-type": "ContentType"
                              }
                            }
                          }
                        },
                        "grades": {
                          "type": "object",
                          "additionalProperties": {
                            "x-go-type": "QuizEvaluationResult",
                            "type": "object",
                            "required": [
                              "score",
                              "passed",
                              "total_marks",
                              "pass_percentage",
                              "quiz",
                              "attempted_at",
                              "attempts",
                              "percentage_scored",
                              "correct_submissions"
                            ],
                            "properties": {
                              "score": {
                                "type": "integer"
                              },
                              "passed": {
                                "type": "boolean"
                              },
                              "percentage_scored": {
                                "type": "number",
                                "format": "float"
                              },
                              "total_marks": {
                                "type": "integer"
                              },
                              "pass_percentage": {
                                "type": "number",
                                "format": "float"
                              },
                              "correct_submissions": {
                                "type": "object",
                                "additionalProperties": {
                                  "type": "boolean"
                                }
                              },
                              "quiz": {
                                "x-go-type": "Quiz",
                                "type": "object",
                                "required": [
                                  "id",
                                  "title",
                                  "orgId",
                                  "description",
                                  "slug",
                                  "relPermalink",
                                  "permalink",
                                  "type",
                                  "section",
                                  "layout",
                                  "date",
                                  "final",
                                  "lastmod",
                                  "draft",
                                  "file_path",
                                  "pass_percentage",
                                  "time_limit",
                                  "questions",
                                  "total_questions",
                                  "total_marks",
                                  "prerequisites"
                                ],
                                "properties": {
                                  "id": {
                                    "type": "string",
                                    "x-go-name": "ID",
                                    "x-oapi-codegen-extra-tags": {
                                      "json": "id"
                                    }
                                  },
                                  "orgId": {
                                    "type": "string",
                                    "description": "Organization ID that owns this quiz",
                                    "example": "layer5",
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "org_id",
                                      "json": "org_id",
                                      "yaml": "org_id"
                                    }
                                  },
                                  "final": {
                                    "type": "boolean",
                                    "description": "Indicates if the quiz is final . i.e this quiz will used to evaluate the completion of parent section eg course , module , learning path",
                                    "example": true
                                  },
                                  "title": {
                                    "type": "string"
                                  },
                                  "description": {
                                    "type": "string"
                                  },
                                  "slug": {
                                    "type": "string"
                                  },
                                  "relPermalink": {
                                    "type": "string"
                                  },
                                  "permalink": {
                                    "type": "string"
                                  },
                                  "type": {
                                    "type": "string"
                                  },
                                  "section": {
                                    "type": "string"
                                  },
                                  "layout": {
                                    "type": "string"
                                  },
                                  "date": {
                                    "type": "string",
                                    "format": "date"
                                  },
                                  "lastmod": {
                                    "type": "string",
                                    "format": "date"
                                  },
                                  "draft": {
                                    "type": "boolean"
                                  },
                                  "file_path": {
                                    "type": "string"
                                  },
                                  "pass_percentage": {
                                    "type": "number",
                                    "format": "float"
                                  },
                                  "time_limit": {
                                    "type": "string"
                                  },
                                  "questions": {
                                    "type": "array",
                                    "items": {
                                      "x-go-type": "Question",
                                      "type": "object",
                                      "required": [
                                        "id",
                                        "text",
                                        "type",
                                        "marks",
                                        "options",
                                        "correct_answer"
                                      ],
                                      "properties": {
                                        "id": {
                                          "type": "string"
                                        },
                                        "text": {
                                          "type": "string"
                                        },
                                        "type": {
                                          "x-go-type": "QuestionType",
                                          "type": "string",
                                          "x-enum-varnames": [
                                            "QuestionTypeMultipleAnswers",
                                            "QuestionTypeSingleAnswer",
                                            "QuestionTypeShortAnswer",
                                            "QuestionTypeEssay"
                                          ],
                                          "enum": [
                                            "multiple-answers",
                                            "single-answer",
                                            "short-answer",
                                            "essay"
                                          ]
                                        },
                                        "marks": {
                                          "type": "integer"
                                        },
                                        "multiple_answers": {
                                          "type": "boolean"
                                        },
                                        "options": {
                                          "type": "array",
                                          "items": {
                                            "x-go-type": "QuestionOption",
                                            "type": "object",
                                            "required": [
                                              "id",
                                              "text",
                                              "is_correct"
                                            ],
                                            "properties": {
                                              "id": {
                                                "type": "string"
                                              },
                                              "text": {
                                                "type": "string"
                                              },
                                              "is_correct": {
                                                "type": "boolean"
                                              }
                                            }
                                          }
                                        },
                                        "correct_answer": {
                                          "type": "string"
                                        }
                                      }
                                    }
                                  },
                                  "total_questions": {
                                    "type": "integer"
                                  },
                                  "total_marks": {
                                    "type": "integer"
                                  },
                                  "prerequisites": {
                                    "type": "array",
                                    "items": {
                                      "x-go-type": "Parent",
                                      "type": "object",
                                      "required": [
                                        "id",
                                        "title",
                                        "relPermalink",
                                        "type"
                                      ],
                                      "properties": {
                                        "id": {
                                          "type": "string"
                                        },
                                        "title": {
                                          "type": "string"
                                        },
                                        "relPermalink": {
                                          "type": "string"
                                        },
                                        "type": {
                                          "type": "string"
                                        }
                                      }
                                    }
                                  },
                                  "parent": {
                                    "x-go-type": "Parent",
                                    "type": "object",
                                    "required": [
                                      "id",
                                      "title",
                                      "relPermalink",
                                      "type"
                                    ],
                                    "properties": {
                                      "id": {
                                        "type": "string"
                                      },
                                      "title": {
                                        "type": "string"
                                      },
                                      "relPermalink": {
                                        "type": "string"
                                      },
                                      "type": {
                                        "type": "string"
                                      }
                                    }
                                  }
                                }
                              },
                              "attempted_at": {
                                "type": "string",
                                "format": "date-time"
                              },
                              "attempts": {
                                "type": "integer"
                              }
                            }
                          }
                        },
                        "time_spent": {
                          "type": "integer",
                          "description": "Total time spent in seconds"
                        },
                        "completed_items": {
                          "type": "object",
                          "description": "Items that have been completed (map of item IDs to item data)",
                          "additionalProperties": {
                            "x-go-type": "ProgressItemCompleted",
                            "type": "object",
                            "required": [
                              "completed_at",
                              "item_data"
                            ],
                            "properties": {
                              "completed_at": {
                                "type": "string",
                                "format": "date-time",
                                "description": "Timestamp when the item was completed"
                              },
                              "item_data": {
                                "x-go-type": "Parent",
                                "type": "object",
                                "required": [
                                  "id",
                                  "title",
                                  "relPermalink",
                                  "type"
                                ],
                                "properties": {
                                  "id": {
                                    "type": "string"
                                  },
                                  "title": {
                                    "type": "string"
                                  },
                                  "relPermalink": {
                                    "type": "string"
                                  },
                                  "type": {
                                    "type": "string"
                                  }
                                }
                              }
                            }
                          }
                        },
                        "completed": {
                          "type": "string",
                          "format": "date-time",
                          "x-go-type": "core.NullTime"
                        }
                      }
                    },
                    "registration_id": {
                      "type": "string"
                    },
                    "content_type": {
                      "type": "string",
                      "enum": [
                        "learning-path",
                        "challenge",
                        "certification"
                      ]
                    },
                    "item_data": {
                      "type": "object",
                      "required": [
                        "id",
                        "last_opened",
                        "content_type"
                      ],
                      "properties": {
                        "id": {
                          "type": "string"
                        },
                        "last_opened": {
                          "type": "string",
                          "format": "date-time"
                        },
                        "content_type": {
                          "type": "string",
                          "enum": [
                            "learning-path",
                            "challenge",
                            "certification"
                          ],
                          "x-go-type": "ContentType"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string"
                    },
                    "details": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "500": {
            "description": "Server error",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string"
                    },
                    "details": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/academy/quiz/submit": {
      "post": {
        "tags": [
          "Academy"
        ],
        "x-internal": [
          "cloud"
        ],
        "operationId": "submitQuiz",
        "summary": "Submit a quiz for evaluation",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "quiz_abs_path",
                  "registration_id",
                  "user_id",
                  "answers"
                ],
                "properties": {
                  "quiz_abs_path": {
                    "type": "string"
                  },
                  "registration_id": {
                    "type": "string"
                  },
                  "user_id": {
                    "type": "string"
                  },
                  "answers": {
                    "type": "array",
                    "items": {
                      "x-go-type": "SubmittedAnswer",
                      "type": "object",
                      "required": [
                        "question_id",
                        "selected_option_id",
                        "answer_text"
                      ],
                      "properties": {
                        "question_id": {
                          "type": "string"
                        },
                        "selected_option_id": {
                          "type": "object",
                          "additionalProperties": {
                            "type": "boolean"
                          }
                        },
                        "answer_text": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successfully updated the progress tracker",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "score",
                    "passed",
                    "total_marks",
                    "pass_percentage",
                    "quiz",
                    "attempted_at",
                    "attempts",
                    "percentage_scored",
                    "correct_submissions"
                  ],
                  "properties": {
                    "score": {
                      "type": "integer"
                    },
                    "passed": {
                      "type": "boolean"
                    },
                    "percentage_scored": {
                      "type": "number",
                      "format": "float"
                    },
                    "total_marks": {
                      "type": "integer"
                    },
                    "pass_percentage": {
                      "type": "number",
                      "format": "float"
                    },
                    "correct_submissions": {
                      "type": "object",
                      "additionalProperties": {
                        "type": "boolean"
                      }
                    },
                    "quiz": {
                      "x-go-type": "Quiz",
                      "type": "object",
                      "required": [
                        "id",
                        "title",
                        "orgId",
                        "description",
                        "slug",
                        "relPermalink",
                        "permalink",
                        "type",
                        "section",
                        "layout",
                        "date",
                        "final",
                        "lastmod",
                        "draft",
                        "file_path",
                        "pass_percentage",
                        "time_limit",
                        "questions",
                        "total_questions",
                        "total_marks",
                        "prerequisites"
                      ],
                      "properties": {
                        "id": {
                          "type": "string",
                          "x-go-name": "ID",
                          "x-oapi-codegen-extra-tags": {
                            "json": "id"
                          }
                        },
                        "orgId": {
                          "type": "string",
                          "description": "Organization ID that owns this quiz",
                          "example": "layer5",
                          "x-oapi-codegen-extra-tags": {
                            "db": "org_id",
                            "json": "org_id",
                            "yaml": "org_id"
                          }
                        },
                        "final": {
                          "type": "boolean",
                          "description": "Indicates if the quiz is final . i.e this quiz will used to evaluate the completion of parent section eg course , module , learning path",
                          "example": true
                        },
                        "title": {
                          "type": "string"
                        },
                        "description": {
                          "type": "string"
                        },
                        "slug": {
                          "type": "string"
                        },
                        "relPermalink": {
                          "type": "string"
                        },
                        "permalink": {
                          "type": "string"
                        },
                        "type": {
                          "type": "string"
                        },
                        "section": {
                          "type": "string"
                        },
                        "layout": {
                          "type": "string"
                        },
                        "date": {
                          "type": "string",
                          "format": "date"
                        },
                        "lastmod": {
                          "type": "string",
                          "format": "date"
                        },
                        "draft": {
                          "type": "boolean"
                        },
                        "file_path": {
                          "type": "string"
                        },
                        "pass_percentage": {
                          "type": "number",
                          "format": "float"
                        },
                        "time_limit": {
                          "type": "string"
                        },
                        "questions": {
                          "type": "array",
                          "items": {
                            "x-go-type": "Question",
                            "type": "object",
                            "required": [
                              "id",
                              "text",
                              "type",
                              "marks",
                              "options",
                              "correct_answer"
                            ],
                            "properties": {
                              "id": {
                                "type": "string"
                              },
                              "text": {
                                "type": "string"
                              },
                              "type": {
                                "x-go-type": "QuestionType",
                                "type": "string",
                                "x-enum-varnames": [
                                  "QuestionTypeMultipleAnswers",
                                  "QuestionTypeSingleAnswer",
                                  "QuestionTypeShortAnswer",
                                  "QuestionTypeEssay"
                                ],
                                "enum": [
                                  "multiple-answers",
                                  "single-answer",
                                  "short-answer",
                                  "essay"
                                ]
                              },
                              "marks": {
                                "type": "integer"
                              },
                              "multiple_answers": {
                                "type": "boolean"
                              },
                              "options": {
                                "type": "array",
                                "items": {
                                  "x-go-type": "QuestionOption",
                                  "type": "object",
                                  "required": [
                                    "id",
                                    "text",
                                    "is_correct"
                                  ],
                                  "properties": {
                                    "id": {
                                      "type": "string"
                                    },
                                    "text": {
                                      "type": "string"
                                    },
                                    "is_correct": {
                                      "type": "boolean"
                                    }
                                  }
                                }
                              },
                              "correct_answer": {
                                "type": "string"
                              }
                            }
                          }
                        },
                        "total_questions": {
                          "type": "integer"
                        },
                        "total_marks": {
                          "type": "integer"
                        },
                        "prerequisites": {
                          "type": "array",
                          "items": {
                            "x-go-type": "Parent",
                            "type": "object",
                            "required": [
                              "id",
                              "title",
                              "relPermalink",
                              "type"
                            ],
                            "properties": {
                              "id": {
                                "type": "string"
                              },
                              "title": {
                                "type": "string"
                              },
                              "relPermalink": {
                                "type": "string"
                              },
                              "type": {
                                "type": "string"
                              }
                            }
                          }
                        },
                        "parent": {
                          "x-go-type": "Parent",
                          "type": "object",
                          "required": [
                            "id",
                            "title",
                            "relPermalink",
                            "type"
                          ],
                          "properties": {
                            "id": {
                              "type": "string"
                            },
                            "title": {
                              "type": "string"
                            },
                            "relPermalink": {
                              "type": "string"
                            },
                            "type": {
                              "type": "string"
                            }
                          }
                        }
                      }
                    },
                    "attempted_at": {
                      "type": "string",
                      "format": "date-time"
                    },
                    "attempts": {
                      "type": "integer"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string"
                    },
                    "details": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "500": {
            "description": "Server error",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string"
                    },
                    "details": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/academy/admin/summary": {
      "get": {
        "tags": [
          "Academy"
        ],
        "x-internal": [
          "cloud"
        ],
        "operationId": "getAcademyAdminSummary",
        "summary": "Get academy content summary",
        "description": "Returns a summary of all academy content with  metrics.",
        "responses": {
          "200": {
            "description": "A list of content with total count and registration metrics",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object"
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
    "/api/academy/admin/registrations": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Academy"
        ],
        "operationId": "getAcademyAdminRegistrations",
        "summary": "Get academy registrations",
        "description": "Returns a list of academy registrations with user, curricula, and pagination details.",
        "parameters": [
          {
            "name": "pagesize",
            "in": "query",
            "required": false,
            "description": "Number of results per page",
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "description": "Page number",
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "content_type",
            "in": "query",
            "required": false,
            "description": "Filter by content types",
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
            "required": false,
            "description": "Filter by registration status",
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "style": "form",
              "explode": true
            }
          }
        ],
        "responses": {
          "200": {
            "description": "List of registrations with pagination info",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "data",
                    "total_count",
                    "page_size",
                    "page"
                  ],
                  "properties": {
                    "data": {
                      "type": "array",
                      "items": {
                        "x-go-type": "UserRegistration",
                        "type": "object",
                        "required": [
                          "curricula_title",
                          "curricula_type",
                          "curricula_permalink",
                          "registration_id",
                          "status",
                          "user_id",
                          "user_email",
                          "user_last_name",
                          "user_first_name",
                          "user_avatar_url",
                          "total_count"
                        ],
                        "properties": {
                          "curricula_title": {
                            "type": "string",
                            "description": "Title of the curricula",
                            "x-oapi-codegen-extra-tags": {
                              "db": "curricula_title"
                            }
                          },
                          "curricula_type": {
                            "type": "string",
                            "enum": [
                              "learning-path",
                              "challenge",
                              "certification"
                            ],
                            "description": "Type of the curricula",
                            "x-go-type": "ContentType",
                            "x-oapi-codegen-extra-tags": {
                              "db": "curricula_type"
                            }
                          },
                          "curricula_permalink": {
                            "type": "string",
                            "description": "Permalink of the curricula",
                            "x-oapi-codegen-extra-tags": {
                              "db": "curricula_permalink"
                            }
                          },
                          "registration_id": {
                            "type": "string",
                            "format": "uuid",
                            "description": "Unique ID of the registration",
                            "x-oapi-codegen-extra-tags": {
                              "db": "registration_id"
                            }
                          },
                          "status": {
                            "description": "Registration status",
                            "x-go-type": "AcademyRegistrationStatus",
                            "x-oapi-codegen-extra-tags": {
                              "db": "status"
                            },
                            "type": "string",
                            "enum": [
                              "registered",
                              "completed",
                              "failed",
                              "withdrawn"
                            ]
                          },
                          "created_at": {
                            "type": "string",
                            "format": "date-time",
                            "description": "When the registration was created",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at"
                            }
                          },
                          "user_id": {
                            "type": "string",
                            "format": "uuid",
                            "description": "ID of the user",
                            "x-oapi-codegen-extra-tags": {
                              "db": "user_id"
                            }
                          },
                          "user_first_name": {
                            "type": "string",
                            "description": "First name of the user",
                            "x-oapi-codegen-extra-tags": {
                              "db": "user_first_name"
                            }
                          },
                          "user_last_name": {
                            "type": "string",
                            "description": "Last name of the user",
                            "x-oapi-codegen-extra-tags": {
                              "db": "user_last_name"
                            }
                          },
                          "user_email": {
                            "type": "string",
                            "format": "email",
                            "description": "Email of the user",
                            "x-oapi-codegen-extra-tags": {
                              "db": "user_email"
                            }
                          },
                          "user_avatar_url": {
                            "type": "string",
                            "format": "uri",
                            "description": "Avatar URL of the user",
                            "x-oapi-codegen-extra-tags": {
                              "db": "user_avatar_url"
                            }
                          },
                          "total_count": {
                            "type": "integer",
                            "format": "int64",
                            "description": "Total count for pagination",
                            "x-oapi-codegen-extra-tags": {
                              "db": "total_count"
                            }
                          }
                        }
                      }
                    },
                    "total_count": {
                      "type": "integer",
                      "format": "int64"
                    },
                    "page_size": {
                      "type": "integer"
                    },
                    "page": {
                      "type": "integer"
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
        }
      }
    },
    "/api/academy/certificates/{certificateId}": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Academy"
        ],
        "operationId": "getCertificateById",
        "summary": "Get a certificate by ID",
        "description": "Returns a certificate identified by its ID.",
        "parameters": [
          {
            "name": "certificateId",
            "in": "path",
            "required": true,
            "description": "The ID of the certificate to retrieve",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "A single certificate",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "id",
                    "org_id",
                    "title",
                    "description",
                    "issuing_authorities",
                    "issued_date",
                    "recipient_id",
                    "recipient_name"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "description": "Unique identifier for the certificate",
                      "example": "1234567890abcdef",
                      "x-go-name": "ID"
                    },
                    "org_id": {
                      "description": "UUID of the organization that issued the certificate",
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "recipient_id": {
                      "type": "string",
                      "description": "ID of the recipient (user) who received the certificate",
                      "example": "1234567890abcdef"
                    },
                    "recipient_name": {
                      "type": "string",
                      "description": "Name of the recipient (user) who received the certificate",
                      "example": "John Doe"
                    },
                    "title": {
                      "type": "string",
                      "description": "Title of the certificate",
                      "example": "Kubernetes Expert Certification"
                    },
                    "description": {
                      "type": "string",
                      "description": "Description of the certificate",
                      "example": "Awarded for successfully completing the Kubernetes Expert course"
                    },
                    "issuing_authorities": {
                      "type": "array",
                      "items": {
                        "x-go-type": "CertificateIssuingAuthority",
                        "type": "object",
                        "required": [
                          "name",
                          "url"
                        ],
                        "properties": {
                          "name": {
                            "type": "string",
                            "description": "Name of the issuing authority",
                            "example": "Cloud Native Foundation"
                          },
                          "role": {
                            "type": "string",
                            "description": "Role of the issuing authority",
                            "example": "COO"
                          },
                          "signature_url": {
                            "type": "string",
                            "format": "uri",
                            "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                            "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                          }
                        }
                      },
                      "description": "List of issuing authorities for the certificate"
                    },
                    "issued_date": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Date when the certificate was issued",
                      "example": "2023-10-01T12:00:00Z"
                    },
                    "expiration_date": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Date when the certificate expires (optional)",
                      "example": "2025-10-01T12:00:00Z"
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
            "description": "Certificate not found"
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
              "certification"
            ]
          }
        }
      },
      "ContentType": {
        "type": "string",
        "enum": [
          "learning-path",
          "challenge",
          "certification"
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
              "certification"
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
                "x-go-type": "CurriculaMetadata",
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
                    "description": "Filename of the banner image, which should be placed in the same directory as the _index.md file",
                    "example": "kubernetes-icon.svg"
                  },
                  "permalink": {
                    "type": "string",
                    "format": "uri",
                    "description": "Canonical URL for the learning path",
                    "example": "http://localhost:9876/academy/learning-paths/layer5/mastering-kubernetes-for-engineers/"
                  },
                  "badge": {
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/v1beta1/badge"
                    },
                    "x-go-type": "badge.Badge",
                    "type": "object",
                    "required": [
                      "id",
                      "label",
                      "name",
                      "org_id",
                      "description",
                      "image_url",
                      "created_at",
                      "updated_at",
                      "deleted_at"
                    ],
                    "properties": {
                      "id": {
                        "x-go-name": "ID",
                        "x-oapi-codegen-extra-tags": {
                          "db": "id",
                          "json": "id"
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
                        "description": "The ID of the organization in which this badge is available .",
                        "x-oapi-codegen-extra-tags": {
                          "db": "org_id",
                          "json": "org_id"
                        },
                        "type": "string",
                        "format": "uuid",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        }
                      },
                      "label": {
                        "type": "string",
                        "description": "unique identifier for the badge ( auto generated )",
                        "example": "Kubernetes-Expert",
                        "x-oapi-codegen-extra-tags": {
                          "db": "label",
                          "json": "label"
                        }
                      },
                      "name": {
                        "type": "string",
                        "description": "Concise descriptor for the badge or certificate.",
                        "example": "Kubernetes Expert",
                        "x-oapi-codegen-extra-tags": {
                          "db": "name",
                          "json": "name"
                        }
                      },
                      "description": {
                        "type": "string",
                        "description": "A description of the milestone achieved, often including criteria for receiving this recognition.",
                        "example": "Awarded for mastering Kubernetes concepts and practices.",
                        "x-oapi-codegen-extra-tags": {
                          "db": "description",
                          "json": "description"
                        }
                      },
                      "image_url": {
                        "type": "string",
                        "format": "uri",
                        "description": "URL to the badge image",
                        "example": "https://raw.githubusercontent.com/layer5io/layer5-academy/refs/heads/master/static/11111111-1111-1111-1111-111111111111/images/meshery-logo-light.webp",
                        "x-oapi-codegen-extra-tags": {
                          "db": "image_url",
                          "json": "image_url"
                        }
                      },
                      "created_at": {
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
                      },
                      "deleted_at": {
                        "description": "Timestamp when the resource was deleted.",
                        "x-go-type": "time.Time",
                        "type": "string",
                        "format": "date-time",
                        "x-go-name": "DeletedAt",
                        "x-oapi-codegen-extra-tags": {
                          "db": "deleted_at",
                          "yaml": "deleted_at"
                        },
                        "x-go-type-skip-optional-pointer": true
                      }
                    }
                  },
                  "certificate": {
                    "x-go-type": "Certificate",
                    "type": "object",
                    "required": [
                      "id",
                      "org_id",
                      "title",
                      "description",
                      "issuing_authorities",
                      "issued_date",
                      "recipient_id",
                      "recipient_name"
                    ],
                    "properties": {
                      "id": {
                        "type": "string",
                        "description": "Unique identifier for the certificate",
                        "example": "1234567890abcdef",
                        "x-go-name": "ID"
                      },
                      "org_id": {
                        "description": "UUID of the organization that issued the certificate",
                        "type": "string",
                        "format": "uuid",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        }
                      },
                      "recipient_id": {
                        "type": "string",
                        "description": "ID of the recipient (user) who received the certificate",
                        "example": "1234567890abcdef"
                      },
                      "recipient_name": {
                        "type": "string",
                        "description": "Name of the recipient (user) who received the certificate",
                        "example": "John Doe"
                      },
                      "title": {
                        "type": "string",
                        "description": "Title of the certificate",
                        "example": "Kubernetes Expert Certification"
                      },
                      "description": {
                        "type": "string",
                        "description": "Description of the certificate",
                        "example": "Awarded for successfully completing the Kubernetes Expert course"
                      },
                      "issuing_authorities": {
                        "type": "array",
                        "items": {
                          "x-go-type": "CertificateIssuingAuthority",
                          "type": "object",
                          "required": [
                            "name",
                            "url"
                          ],
                          "properties": {
                            "name": {
                              "type": "string",
                              "description": "Name of the issuing authority",
                              "example": "Cloud Native Foundation"
                            },
                            "role": {
                              "type": "string",
                              "description": "Role of the issuing authority",
                              "example": "COO"
                            },
                            "signature_url": {
                              "type": "string",
                              "format": "uri",
                              "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                              "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                            }
                          }
                        },
                        "description": "List of issuing authorities for the certificate"
                      },
                      "issued_date": {
                        "type": "string",
                        "format": "date-time",
                        "description": "Date when the certificate was issued",
                        "example": "2023-10-01T12:00:00Z"
                      },
                      "expiration_date": {
                        "type": "string",
                        "format": "date-time",
                        "description": "Date when the certificate expires (optional)",
                        "example": "2025-10-01T12:00:00Z"
                      }
                    }
                  },
                  "children": {
                    "type": "array",
                    "description": "List of children items in the top-level curricula",
                    "items": {
                      "x-go-type": "ChildNode",
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "string",
                          "description": "Unique identifier for the course",
                          "example": "1234567890abcdef",
                          "x-go-name": "ID",
                          "x-oapi-codegen-extra-tags": {
                            "db": "id",
                            "json": "id",
                            "yaml": "id"
                          }
                        },
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
                          "description": "A numeric value to determine the display order. A smaller number appears first. If not specified, items will be sorted alphabetically by title.",
                          "example": "eg 1 , 2"
                        },
                        "banner": {
                          "type": "string",
                          "format": "uri",
                          "nullable": true,
                          "description": "Filename of the banner image, which should be placed in the same directory as the _index.md file",
                          "example": "kubernetes-icon.svg"
                        },
                        "type": {
                          "x-go-type": "ContentType",
                          "description": "Type of the content (e.g., learning-path, challenge, certification)",
                          "type": "string",
                          "enum": [
                            "learning-path",
                            "challenge",
                            "certification"
                          ]
                        },
                        "children": {
                          "type": "array",
                          "description": "List of child nodes (sub-courses or modules)",
                          "items": {
                            "type": "object",
                            "x-go-type": "ChildNode"
                          }
                        }
                      },
                      "required": [
                        "title",
                        "description",
                        "id",
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
      "AcademyCurriculaWithMetrics": {
        "allOf": [
          {
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
                  "certification"
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
                    "x-go-type": "CurriculaMetadata",
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
                        "description": "Filename of the banner image, which should be placed in the same directory as the _index.md file",
                        "example": "kubernetes-icon.svg"
                      },
                      "permalink": {
                        "type": "string",
                        "format": "uri",
                        "description": "Canonical URL for the learning path",
                        "example": "http://localhost:9876/academy/learning-paths/layer5/mastering-kubernetes-for-engineers/"
                      },
                      "badge": {
                        "x-go-type-import": {
                          "path": "github.com/meshery/schemas/models/v1beta1/badge"
                        },
                        "x-go-type": "badge.Badge",
                        "type": "object",
                        "required": [
                          "id",
                          "label",
                          "name",
                          "org_id",
                          "description",
                          "image_url",
                          "created_at",
                          "updated_at",
                          "deleted_at"
                        ],
                        "properties": {
                          "id": {
                            "x-go-name": "ID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "id",
                              "json": "id"
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
                            "description": "The ID of the organization in which this badge is available .",
                            "x-oapi-codegen-extra-tags": {
                              "db": "org_id",
                              "json": "org_id"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "label": {
                            "type": "string",
                            "description": "unique identifier for the badge ( auto generated )",
                            "example": "Kubernetes-Expert",
                            "x-oapi-codegen-extra-tags": {
                              "db": "label",
                              "json": "label"
                            }
                          },
                          "name": {
                            "type": "string",
                            "description": "Concise descriptor for the badge or certificate.",
                            "example": "Kubernetes Expert",
                            "x-oapi-codegen-extra-tags": {
                              "db": "name",
                              "json": "name"
                            }
                          },
                          "description": {
                            "type": "string",
                            "description": "A description of the milestone achieved, often including criteria for receiving this recognition.",
                            "example": "Awarded for mastering Kubernetes concepts and practices.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "description",
                              "json": "description"
                            }
                          },
                          "image_url": {
                            "type": "string",
                            "format": "uri",
                            "description": "URL to the badge image",
                            "example": "https://raw.githubusercontent.com/layer5io/layer5-academy/refs/heads/master/static/11111111-1111-1111-1111-111111111111/images/meshery-logo-light.webp",
                            "x-oapi-codegen-extra-tags": {
                              "db": "image_url",
                              "json": "image_url"
                            }
                          },
                          "created_at": {
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
                          },
                          "deleted_at": {
                            "description": "Timestamp when the resource was deleted.",
                            "x-go-type": "time.Time",
                            "type": "string",
                            "format": "date-time",
                            "x-go-name": "DeletedAt",
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "yaml": "deleted_at"
                            },
                            "x-go-type-skip-optional-pointer": true
                          }
                        }
                      },
                      "certificate": {
                        "x-go-type": "Certificate",
                        "type": "object",
                        "required": [
                          "id",
                          "org_id",
                          "title",
                          "description",
                          "issuing_authorities",
                          "issued_date",
                          "recipient_id",
                          "recipient_name"
                        ],
                        "properties": {
                          "id": {
                            "type": "string",
                            "description": "Unique identifier for the certificate",
                            "example": "1234567890abcdef",
                            "x-go-name": "ID"
                          },
                          "org_id": {
                            "description": "UUID of the organization that issued the certificate",
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "recipient_id": {
                            "type": "string",
                            "description": "ID of the recipient (user) who received the certificate",
                            "example": "1234567890abcdef"
                          },
                          "recipient_name": {
                            "type": "string",
                            "description": "Name of the recipient (user) who received the certificate",
                            "example": "John Doe"
                          },
                          "title": {
                            "type": "string",
                            "description": "Title of the certificate",
                            "example": "Kubernetes Expert Certification"
                          },
                          "description": {
                            "type": "string",
                            "description": "Description of the certificate",
                            "example": "Awarded for successfully completing the Kubernetes Expert course"
                          },
                          "issuing_authorities": {
                            "type": "array",
                            "items": {
                              "x-go-type": "CertificateIssuingAuthority",
                              "type": "object",
                              "required": [
                                "name",
                                "url"
                              ],
                              "properties": {
                                "name": {
                                  "type": "string",
                                  "description": "Name of the issuing authority",
                                  "example": "Cloud Native Foundation"
                                },
                                "role": {
                                  "type": "string",
                                  "description": "Role of the issuing authority",
                                  "example": "COO"
                                },
                                "signature_url": {
                                  "type": "string",
                                  "format": "uri",
                                  "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                                  "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                                }
                              }
                            },
                            "description": "List of issuing authorities for the certificate"
                          },
                          "issued_date": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Date when the certificate was issued",
                            "example": "2023-10-01T12:00:00Z"
                          },
                          "expiration_date": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Date when the certificate expires (optional)",
                            "example": "2025-10-01T12:00:00Z"
                          }
                        }
                      },
                      "children": {
                        "type": "array",
                        "description": "List of children items in the top-level curricula",
                        "items": {
                          "x-go-type": "ChildNode",
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "string",
                              "description": "Unique identifier for the course",
                              "example": "1234567890abcdef",
                              "x-go-name": "ID",
                              "x-oapi-codegen-extra-tags": {
                                "db": "id",
                                "json": "id",
                                "yaml": "id"
                              }
                            },
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
                              "description": "A numeric value to determine the display order. A smaller number appears first. If not specified, items will be sorted alphabetically by title.",
                              "example": "eg 1 , 2"
                            },
                            "banner": {
                              "type": "string",
                              "format": "uri",
                              "nullable": true,
                              "description": "Filename of the banner image, which should be placed in the same directory as the _index.md file",
                              "example": "kubernetes-icon.svg"
                            },
                            "type": {
                              "x-go-type": "ContentType",
                              "description": "Type of the content (e.g., learning-path, challenge, certification)",
                              "type": "string",
                              "enum": [
                                "learning-path",
                                "challenge",
                                "certification"
                              ]
                            },
                            "children": {
                              "type": "array",
                              "description": "List of child nodes (sub-courses or modules)",
                              "items": {
                                "type": "object",
                                "x-go-type": "ChildNode"
                              }
                            }
                          },
                          "required": [
                            "title",
                            "description",
                            "id",
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
          {
            "type": "object",
            "required": [
              "RegistrationCount"
            ],
            "properties": {
              "RegistrationCount": {
                "type": "number",
                "x-oapi-codegen-extra-tags": {
                  "db": "registration_count,omitempty",
                  "json": "registration_count,omitempty",
                  "yaml": "registration_count,omitempty"
                }
              }
            }
          }
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
                    "certification"
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
                      "x-go-type": "CurriculaMetadata",
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
                          "description": "Filename of the banner image, which should be placed in the same directory as the _index.md file",
                          "example": "kubernetes-icon.svg"
                        },
                        "permalink": {
                          "type": "string",
                          "format": "uri",
                          "description": "Canonical URL for the learning path",
                          "example": "http://localhost:9876/academy/learning-paths/layer5/mastering-kubernetes-for-engineers/"
                        },
                        "badge": {
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/v1beta1/badge"
                          },
                          "x-go-type": "badge.Badge",
                          "type": "object",
                          "required": [
                            "id",
                            "label",
                            "name",
                            "org_id",
                            "description",
                            "image_url",
                            "created_at",
                            "updated_at",
                            "deleted_at"
                          ],
                          "properties": {
                            "id": {
                              "x-go-name": "ID",
                              "x-oapi-codegen-extra-tags": {
                                "db": "id",
                                "json": "id"
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
                              "description": "The ID of the organization in which this badge is available .",
                              "x-oapi-codegen-extra-tags": {
                                "db": "org_id",
                                "json": "org_id"
                              },
                              "type": "string",
                              "format": "uuid",
                              "x-go-type": "uuid.UUID",
                              "x-go-type-import": {
                                "path": "github.com/gofrs/uuid"
                              }
                            },
                            "label": {
                              "type": "string",
                              "description": "unique identifier for the badge ( auto generated )",
                              "example": "Kubernetes-Expert",
                              "x-oapi-codegen-extra-tags": {
                                "db": "label",
                                "json": "label"
                              }
                            },
                            "name": {
                              "type": "string",
                              "description": "Concise descriptor for the badge or certificate.",
                              "example": "Kubernetes Expert",
                              "x-oapi-codegen-extra-tags": {
                                "db": "name",
                                "json": "name"
                              }
                            },
                            "description": {
                              "type": "string",
                              "description": "A description of the milestone achieved, often including criteria for receiving this recognition.",
                              "example": "Awarded for mastering Kubernetes concepts and practices.",
                              "x-oapi-codegen-extra-tags": {
                                "db": "description",
                                "json": "description"
                              }
                            },
                            "image_url": {
                              "type": "string",
                              "format": "uri",
                              "description": "URL to the badge image",
                              "example": "https://raw.githubusercontent.com/layer5io/layer5-academy/refs/heads/master/static/11111111-1111-1111-1111-111111111111/images/meshery-logo-light.webp",
                              "x-oapi-codegen-extra-tags": {
                                "db": "image_url",
                                "json": "image_url"
                              }
                            },
                            "created_at": {
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
                            },
                            "deleted_at": {
                              "description": "Timestamp when the resource was deleted.",
                              "x-go-type": "time.Time",
                              "type": "string",
                              "format": "date-time",
                              "x-go-name": "DeletedAt",
                              "x-oapi-codegen-extra-tags": {
                                "db": "deleted_at",
                                "yaml": "deleted_at"
                              },
                              "x-go-type-skip-optional-pointer": true
                            }
                          }
                        },
                        "certificate": {
                          "x-go-type": "Certificate",
                          "type": "object",
                          "required": [
                            "id",
                            "org_id",
                            "title",
                            "description",
                            "issuing_authorities",
                            "issued_date",
                            "recipient_id",
                            "recipient_name"
                          ],
                          "properties": {
                            "id": {
                              "type": "string",
                              "description": "Unique identifier for the certificate",
                              "example": "1234567890abcdef",
                              "x-go-name": "ID"
                            },
                            "org_id": {
                              "description": "UUID of the organization that issued the certificate",
                              "type": "string",
                              "format": "uuid",
                              "x-go-type": "uuid.UUID",
                              "x-go-type-import": {
                                "path": "github.com/gofrs/uuid"
                              }
                            },
                            "recipient_id": {
                              "type": "string",
                              "description": "ID of the recipient (user) who received the certificate",
                              "example": "1234567890abcdef"
                            },
                            "recipient_name": {
                              "type": "string",
                              "description": "Name of the recipient (user) who received the certificate",
                              "example": "John Doe"
                            },
                            "title": {
                              "type": "string",
                              "description": "Title of the certificate",
                              "example": "Kubernetes Expert Certification"
                            },
                            "description": {
                              "type": "string",
                              "description": "Description of the certificate",
                              "example": "Awarded for successfully completing the Kubernetes Expert course"
                            },
                            "issuing_authorities": {
                              "type": "array",
                              "items": {
                                "x-go-type": "CertificateIssuingAuthority",
                                "type": "object",
                                "required": [
                                  "name",
                                  "url"
                                ],
                                "properties": {
                                  "name": {
                                    "type": "string",
                                    "description": "Name of the issuing authority",
                                    "example": "Cloud Native Foundation"
                                  },
                                  "role": {
                                    "type": "string",
                                    "description": "Role of the issuing authority",
                                    "example": "COO"
                                  },
                                  "signature_url": {
                                    "type": "string",
                                    "format": "uri",
                                    "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                                    "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                                  }
                                }
                              },
                              "description": "List of issuing authorities for the certificate"
                            },
                            "issued_date": {
                              "type": "string",
                              "format": "date-time",
                              "description": "Date when the certificate was issued",
                              "example": "2023-10-01T12:00:00Z"
                            },
                            "expiration_date": {
                              "type": "string",
                              "format": "date-time",
                              "description": "Date when the certificate expires (optional)",
                              "example": "2025-10-01T12:00:00Z"
                            }
                          }
                        },
                        "children": {
                          "type": "array",
                          "description": "List of children items in the top-level curricula",
                          "items": {
                            "x-go-type": "ChildNode",
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "string",
                                "description": "Unique identifier for the course",
                                "example": "1234567890abcdef",
                                "x-go-name": "ID",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "id",
                                  "json": "id",
                                  "yaml": "id"
                                }
                              },
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
                                "description": "A numeric value to determine the display order. A smaller number appears first. If not specified, items will be sorted alphabetically by title.",
                                "example": "eg 1 , 2"
                              },
                              "banner": {
                                "type": "string",
                                "format": "uri",
                                "nullable": true,
                                "description": "Filename of the banner image, which should be placed in the same directory as the _index.md file",
                                "example": "kubernetes-icon.svg"
                              },
                              "type": {
                                "x-go-type": "ContentType",
                                "description": "Type of the content (e.g., learning-path, challenge, certification)",
                                "type": "string",
                                "enum": [
                                  "learning-path",
                                  "challenge",
                                  "certification"
                                ]
                              },
                              "children": {
                                "type": "array",
                                "description": "List of child nodes (sub-courses or modules)",
                                "items": {
                                  "type": "object",
                                  "x-go-type": "ChildNode"
                                }
                              }
                            },
                            "required": [
                              "title",
                              "description",
                              "id",
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
      "AcademyCurriculaWithMetricsListResponse": {
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
              "x-go-type": "AcademyCurriculaWithMetrics",
              "x-go-type-skip-optional-pointer": true,
              "allOf": [
                {
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
                        "certification"
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
                          "x-go-type": "CurriculaMetadata",
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
                              "description": "Filename of the banner image, which should be placed in the same directory as the _index.md file",
                              "example": "kubernetes-icon.svg"
                            },
                            "permalink": {
                              "type": "string",
                              "format": "uri",
                              "description": "Canonical URL for the learning path",
                              "example": "http://localhost:9876/academy/learning-paths/layer5/mastering-kubernetes-for-engineers/"
                            },
                            "badge": {
                              "x-go-type-import": {
                                "path": "github.com/meshery/schemas/models/v1beta1/badge"
                              },
                              "x-go-type": "badge.Badge",
                              "type": "object",
                              "required": [
                                "id",
                                "label",
                                "name",
                                "org_id",
                                "description",
                                "image_url",
                                "created_at",
                                "updated_at",
                                "deleted_at"
                              ],
                              "properties": {
                                "id": {
                                  "x-go-name": "ID",
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "id",
                                    "json": "id"
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
                                  "description": "The ID of the organization in which this badge is available .",
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "org_id",
                                    "json": "org_id"
                                  },
                                  "type": "string",
                                  "format": "uuid",
                                  "x-go-type": "uuid.UUID",
                                  "x-go-type-import": {
                                    "path": "github.com/gofrs/uuid"
                                  }
                                },
                                "label": {
                                  "type": "string",
                                  "description": "unique identifier for the badge ( auto generated )",
                                  "example": "Kubernetes-Expert",
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "label",
                                    "json": "label"
                                  }
                                },
                                "name": {
                                  "type": "string",
                                  "description": "Concise descriptor for the badge or certificate.",
                                  "example": "Kubernetes Expert",
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "name",
                                    "json": "name"
                                  }
                                },
                                "description": {
                                  "type": "string",
                                  "description": "A description of the milestone achieved, often including criteria for receiving this recognition.",
                                  "example": "Awarded for mastering Kubernetes concepts and practices.",
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "description",
                                    "json": "description"
                                  }
                                },
                                "image_url": {
                                  "type": "string",
                                  "format": "uri",
                                  "description": "URL to the badge image",
                                  "example": "https://raw.githubusercontent.com/layer5io/layer5-academy/refs/heads/master/static/11111111-1111-1111-1111-111111111111/images/meshery-logo-light.webp",
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "image_url",
                                    "json": "image_url"
                                  }
                                },
                                "created_at": {
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
                                },
                                "deleted_at": {
                                  "description": "Timestamp when the resource was deleted.",
                                  "x-go-type": "time.Time",
                                  "type": "string",
                                  "format": "date-time",
                                  "x-go-name": "DeletedAt",
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "deleted_at",
                                    "yaml": "deleted_at"
                                  },
                                  "x-go-type-skip-optional-pointer": true
                                }
                              }
                            },
                            "certificate": {
                              "x-go-type": "Certificate",
                              "type": "object",
                              "required": [
                                "id",
                                "org_id",
                                "title",
                                "description",
                                "issuing_authorities",
                                "issued_date",
                                "recipient_id",
                                "recipient_name"
                              ],
                              "properties": {
                                "id": {
                                  "type": "string",
                                  "description": "Unique identifier for the certificate",
                                  "example": "1234567890abcdef",
                                  "x-go-name": "ID"
                                },
                                "org_id": {
                                  "description": "UUID of the organization that issued the certificate",
                                  "type": "string",
                                  "format": "uuid",
                                  "x-go-type": "uuid.UUID",
                                  "x-go-type-import": {
                                    "path": "github.com/gofrs/uuid"
                                  }
                                },
                                "recipient_id": {
                                  "type": "string",
                                  "description": "ID of the recipient (user) who received the certificate",
                                  "example": "1234567890abcdef"
                                },
                                "recipient_name": {
                                  "type": "string",
                                  "description": "Name of the recipient (user) who received the certificate",
                                  "example": "John Doe"
                                },
                                "title": {
                                  "type": "string",
                                  "description": "Title of the certificate",
                                  "example": "Kubernetes Expert Certification"
                                },
                                "description": {
                                  "type": "string",
                                  "description": "Description of the certificate",
                                  "example": "Awarded for successfully completing the Kubernetes Expert course"
                                },
                                "issuing_authorities": {
                                  "type": "array",
                                  "items": {
                                    "x-go-type": "CertificateIssuingAuthority",
                                    "type": "object",
                                    "required": [
                                      "name",
                                      "url"
                                    ],
                                    "properties": {
                                      "name": {
                                        "type": "string",
                                        "description": "Name of the issuing authority",
                                        "example": "Cloud Native Foundation"
                                      },
                                      "role": {
                                        "type": "string",
                                        "description": "Role of the issuing authority",
                                        "example": "COO"
                                      },
                                      "signature_url": {
                                        "type": "string",
                                        "format": "uri",
                                        "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                                        "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                                      }
                                    }
                                  },
                                  "description": "List of issuing authorities for the certificate"
                                },
                                "issued_date": {
                                  "type": "string",
                                  "format": "date-time",
                                  "description": "Date when the certificate was issued",
                                  "example": "2023-10-01T12:00:00Z"
                                },
                                "expiration_date": {
                                  "type": "string",
                                  "format": "date-time",
                                  "description": "Date when the certificate expires (optional)",
                                  "example": "2025-10-01T12:00:00Z"
                                }
                              }
                            },
                            "children": {
                              "type": "array",
                              "description": "List of children items in the top-level curricula",
                              "items": {
                                "x-go-type": "ChildNode",
                                "type": "object",
                                "properties": {
                                  "id": {
                                    "type": "string",
                                    "description": "Unique identifier for the course",
                                    "example": "1234567890abcdef",
                                    "x-go-name": "ID",
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "id",
                                      "json": "id",
                                      "yaml": "id"
                                    }
                                  },
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
                                    "description": "A numeric value to determine the display order. A smaller number appears first. If not specified, items will be sorted alphabetically by title.",
                                    "example": "eg 1 , 2"
                                  },
                                  "banner": {
                                    "type": "string",
                                    "format": "uri",
                                    "nullable": true,
                                    "description": "Filename of the banner image, which should be placed in the same directory as the _index.md file",
                                    "example": "kubernetes-icon.svg"
                                  },
                                  "type": {
                                    "x-go-type": "ContentType",
                                    "description": "Type of the content (e.g., learning-path, challenge, certification)",
                                    "type": "string",
                                    "enum": [
                                      "learning-path",
                                      "challenge",
                                      "certification"
                                    ]
                                  },
                                  "children": {
                                    "type": "array",
                                    "description": "List of child nodes (sub-courses or modules)",
                                    "items": {
                                      "type": "object",
                                      "x-go-type": "ChildNode"
                                    }
                                  }
                                },
                                "required": [
                                  "title",
                                  "description",
                                  "id",
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
                {
                  "type": "object",
                  "required": [
                    "RegistrationCount"
                  ],
                  "properties": {
                    "RegistrationCount": {
                      "type": "number",
                      "x-oapi-codegen-extra-tags": {
                        "db": "registration_count,omitempty",
                        "json": "registration_count,omitempty",
                        "yaml": "registration_count,omitempty"
                      }
                    }
                  }
                }
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
        "x-go-type": "CurriculaMetadata",
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
            "description": "Filename of the banner image, which should be placed in the same directory as the _index.md file",
            "example": "kubernetes-icon.svg"
          },
          "permalink": {
            "type": "string",
            "format": "uri",
            "description": "Canonical URL for the learning path",
            "example": "http://localhost:9876/academy/learning-paths/layer5/mastering-kubernetes-for-engineers/"
          },
          "badge": {
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/v1beta1/badge"
            },
            "x-go-type": "badge.Badge",
            "type": "object",
            "required": [
              "id",
              "label",
              "name",
              "org_id",
              "description",
              "image_url",
              "created_at",
              "updated_at",
              "deleted_at"
            ],
            "properties": {
              "id": {
                "x-go-name": "ID",
                "x-oapi-codegen-extra-tags": {
                  "db": "id",
                  "json": "id"
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
                "description": "The ID of the organization in which this badge is available .",
                "x-oapi-codegen-extra-tags": {
                  "db": "org_id",
                  "json": "org_id"
                },
                "type": "string",
                "format": "uuid",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                }
              },
              "label": {
                "type": "string",
                "description": "unique identifier for the badge ( auto generated )",
                "example": "Kubernetes-Expert",
                "x-oapi-codegen-extra-tags": {
                  "db": "label",
                  "json": "label"
                }
              },
              "name": {
                "type": "string",
                "description": "Concise descriptor for the badge or certificate.",
                "example": "Kubernetes Expert",
                "x-oapi-codegen-extra-tags": {
                  "db": "name",
                  "json": "name"
                }
              },
              "description": {
                "type": "string",
                "description": "A description of the milestone achieved, often including criteria for receiving this recognition.",
                "example": "Awarded for mastering Kubernetes concepts and practices.",
                "x-oapi-codegen-extra-tags": {
                  "db": "description",
                  "json": "description"
                }
              },
              "image_url": {
                "type": "string",
                "format": "uri",
                "description": "URL to the badge image",
                "example": "https://raw.githubusercontent.com/layer5io/layer5-academy/refs/heads/master/static/11111111-1111-1111-1111-111111111111/images/meshery-logo-light.webp",
                "x-oapi-codegen-extra-tags": {
                  "db": "image_url",
                  "json": "image_url"
                }
              },
              "created_at": {
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
              },
              "deleted_at": {
                "description": "Timestamp when the resource was deleted.",
                "x-go-type": "time.Time",
                "type": "string",
                "format": "date-time",
                "x-go-name": "DeletedAt",
                "x-oapi-codegen-extra-tags": {
                  "db": "deleted_at",
                  "yaml": "deleted_at"
                },
                "x-go-type-skip-optional-pointer": true
              }
            }
          },
          "certificate": {
            "x-go-type": "Certificate",
            "type": "object",
            "required": [
              "id",
              "org_id",
              "title",
              "description",
              "issuing_authorities",
              "issued_date",
              "recipient_id",
              "recipient_name"
            ],
            "properties": {
              "id": {
                "type": "string",
                "description": "Unique identifier for the certificate",
                "example": "1234567890abcdef",
                "x-go-name": "ID"
              },
              "org_id": {
                "description": "UUID of the organization that issued the certificate",
                "type": "string",
                "format": "uuid",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                }
              },
              "recipient_id": {
                "type": "string",
                "description": "ID of the recipient (user) who received the certificate",
                "example": "1234567890abcdef"
              },
              "recipient_name": {
                "type": "string",
                "description": "Name of the recipient (user) who received the certificate",
                "example": "John Doe"
              },
              "title": {
                "type": "string",
                "description": "Title of the certificate",
                "example": "Kubernetes Expert Certification"
              },
              "description": {
                "type": "string",
                "description": "Description of the certificate",
                "example": "Awarded for successfully completing the Kubernetes Expert course"
              },
              "issuing_authorities": {
                "type": "array",
                "items": {
                  "x-go-type": "CertificateIssuingAuthority",
                  "type": "object",
                  "required": [
                    "name",
                    "url"
                  ],
                  "properties": {
                    "name": {
                      "type": "string",
                      "description": "Name of the issuing authority",
                      "example": "Cloud Native Foundation"
                    },
                    "role": {
                      "type": "string",
                      "description": "Role of the issuing authority",
                      "example": "COO"
                    },
                    "signature_url": {
                      "type": "string",
                      "format": "uri",
                      "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                      "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                    }
                  }
                },
                "description": "List of issuing authorities for the certificate"
              },
              "issued_date": {
                "type": "string",
                "format": "date-time",
                "description": "Date when the certificate was issued",
                "example": "2023-10-01T12:00:00Z"
              },
              "expiration_date": {
                "type": "string",
                "format": "date-time",
                "description": "Date when the certificate expires (optional)",
                "example": "2025-10-01T12:00:00Z"
              }
            }
          },
          "children": {
            "type": "array",
            "description": "List of children items in the top-level curricula",
            "items": {
              "x-go-type": "ChildNode",
              "type": "object",
              "properties": {
                "id": {
                  "type": "string",
                  "description": "Unique identifier for the course",
                  "example": "1234567890abcdef",
                  "x-go-name": "ID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "id",
                    "json": "id",
                    "yaml": "id"
                  }
                },
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
                  "description": "A numeric value to determine the display order. A smaller number appears first. If not specified, items will be sorted alphabetically by title.",
                  "example": "eg 1 , 2"
                },
                "banner": {
                  "type": "string",
                  "format": "uri",
                  "nullable": true,
                  "description": "Filename of the banner image, which should be placed in the same directory as the _index.md file",
                  "example": "kubernetes-icon.svg"
                },
                "type": {
                  "x-go-type": "ContentType",
                  "description": "Type of the content (e.g., learning-path, challenge, certification)",
                  "type": "string",
                  "enum": [
                    "learning-path",
                    "challenge",
                    "certification"
                  ]
                },
                "children": {
                  "type": "array",
                  "description": "List of child nodes (sub-courses or modules)",
                  "items": {
                    "type": "object",
                    "x-go-type": "ChildNode"
                  }
                }
              },
              "required": [
                "title",
                "description",
                "id",
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
        "x-go-type": "CurriculaMetadata",
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
            "description": "Filename of the banner image, which should be placed in the same directory as the _index.md file",
            "example": "kubernetes-icon.svg"
          },
          "permalink": {
            "type": "string",
            "format": "uri",
            "description": "Canonical URL for the learning path",
            "example": "http://localhost:9876/academy/learning-paths/layer5/mastering-kubernetes-for-engineers/"
          },
          "badge": {
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/v1beta1/badge"
            },
            "x-go-type": "badge.Badge",
            "type": "object",
            "required": [
              "id",
              "label",
              "name",
              "org_id",
              "description",
              "image_url",
              "created_at",
              "updated_at",
              "deleted_at"
            ],
            "properties": {
              "id": {
                "x-go-name": "ID",
                "x-oapi-codegen-extra-tags": {
                  "db": "id",
                  "json": "id"
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
                "description": "The ID of the organization in which this badge is available .",
                "x-oapi-codegen-extra-tags": {
                  "db": "org_id",
                  "json": "org_id"
                },
                "type": "string",
                "format": "uuid",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                }
              },
              "label": {
                "type": "string",
                "description": "unique identifier for the badge ( auto generated )",
                "example": "Kubernetes-Expert",
                "x-oapi-codegen-extra-tags": {
                  "db": "label",
                  "json": "label"
                }
              },
              "name": {
                "type": "string",
                "description": "Concise descriptor for the badge or certificate.",
                "example": "Kubernetes Expert",
                "x-oapi-codegen-extra-tags": {
                  "db": "name",
                  "json": "name"
                }
              },
              "description": {
                "type": "string",
                "description": "A description of the milestone achieved, often including criteria for receiving this recognition.",
                "example": "Awarded for mastering Kubernetes concepts and practices.",
                "x-oapi-codegen-extra-tags": {
                  "db": "description",
                  "json": "description"
                }
              },
              "image_url": {
                "type": "string",
                "format": "uri",
                "description": "URL to the badge image",
                "example": "https://raw.githubusercontent.com/layer5io/layer5-academy/refs/heads/master/static/11111111-1111-1111-1111-111111111111/images/meshery-logo-light.webp",
                "x-oapi-codegen-extra-tags": {
                  "db": "image_url",
                  "json": "image_url"
                }
              },
              "created_at": {
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
              },
              "deleted_at": {
                "description": "Timestamp when the resource was deleted.",
                "x-go-type": "time.Time",
                "type": "string",
                "format": "date-time",
                "x-go-name": "DeletedAt",
                "x-oapi-codegen-extra-tags": {
                  "db": "deleted_at",
                  "yaml": "deleted_at"
                },
                "x-go-type-skip-optional-pointer": true
              }
            }
          },
          "certificate": {
            "x-go-type": "Certificate",
            "type": "object",
            "required": [
              "id",
              "org_id",
              "title",
              "description",
              "issuing_authorities",
              "issued_date",
              "recipient_id",
              "recipient_name"
            ],
            "properties": {
              "id": {
                "type": "string",
                "description": "Unique identifier for the certificate",
                "example": "1234567890abcdef",
                "x-go-name": "ID"
              },
              "org_id": {
                "description": "UUID of the organization that issued the certificate",
                "type": "string",
                "format": "uuid",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                }
              },
              "recipient_id": {
                "type": "string",
                "description": "ID of the recipient (user) who received the certificate",
                "example": "1234567890abcdef"
              },
              "recipient_name": {
                "type": "string",
                "description": "Name of the recipient (user) who received the certificate",
                "example": "John Doe"
              },
              "title": {
                "type": "string",
                "description": "Title of the certificate",
                "example": "Kubernetes Expert Certification"
              },
              "description": {
                "type": "string",
                "description": "Description of the certificate",
                "example": "Awarded for successfully completing the Kubernetes Expert course"
              },
              "issuing_authorities": {
                "type": "array",
                "items": {
                  "x-go-type": "CertificateIssuingAuthority",
                  "type": "object",
                  "required": [
                    "name",
                    "url"
                  ],
                  "properties": {
                    "name": {
                      "type": "string",
                      "description": "Name of the issuing authority",
                      "example": "Cloud Native Foundation"
                    },
                    "role": {
                      "type": "string",
                      "description": "Role of the issuing authority",
                      "example": "COO"
                    },
                    "signature_url": {
                      "type": "string",
                      "format": "uri",
                      "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                      "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                    }
                  }
                },
                "description": "List of issuing authorities for the certificate"
              },
              "issued_date": {
                "type": "string",
                "format": "date-time",
                "description": "Date when the certificate was issued",
                "example": "2023-10-01T12:00:00Z"
              },
              "expiration_date": {
                "type": "string",
                "format": "date-time",
                "description": "Date when the certificate expires (optional)",
                "example": "2025-10-01T12:00:00Z"
              }
            }
          },
          "children": {
            "type": "array",
            "description": "List of children items in the top-level curricula",
            "items": {
              "x-go-type": "ChildNode",
              "type": "object",
              "properties": {
                "id": {
                  "type": "string",
                  "description": "Unique identifier for the course",
                  "example": "1234567890abcdef",
                  "x-go-name": "ID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "id",
                    "json": "id",
                    "yaml": "id"
                  }
                },
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
                  "description": "A numeric value to determine the display order. A smaller number appears first. If not specified, items will be sorted alphabetically by title.",
                  "example": "eg 1 , 2"
                },
                "banner": {
                  "type": "string",
                  "format": "uri",
                  "nullable": true,
                  "description": "Filename of the banner image, which should be placed in the same directory as the _index.md file",
                  "example": "kubernetes-icon.svg"
                },
                "type": {
                  "x-go-type": "ContentType",
                  "description": "Type of the content (e.g., learning-path, challenge, certification)",
                  "type": "string",
                  "enum": [
                    "learning-path",
                    "challenge",
                    "certification"
                  ]
                },
                "children": {
                  "type": "array",
                  "description": "List of child nodes (sub-courses or modules)",
                  "items": {
                    "type": "object",
                    "x-go-type": "ChildNode"
                  }
                }
              },
              "required": [
                "title",
                "description",
                "id",
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
      "CertificateIssuingAuthority": {
        "type": "object",
        "required": [
          "name",
          "url"
        ],
        "properties": {
          "name": {
            "type": "string",
            "description": "Name of the issuing authority",
            "example": "Cloud Native Foundation"
          },
          "role": {
            "type": "string",
            "description": "Role of the issuing authority",
            "example": "COO"
          },
          "signature_url": {
            "type": "string",
            "format": "uri",
            "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
            "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
          }
        }
      },
      "Certificate": {
        "type": "object",
        "required": [
          "id",
          "org_id",
          "title",
          "description",
          "issuing_authorities",
          "issued_date",
          "recipient_id",
          "recipient_name"
        ],
        "properties": {
          "id": {
            "type": "string",
            "description": "Unique identifier for the certificate",
            "example": "1234567890abcdef",
            "x-go-name": "ID"
          },
          "org_id": {
            "description": "UUID of the organization that issued the certificate",
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "recipient_id": {
            "type": "string",
            "description": "ID of the recipient (user) who received the certificate",
            "example": "1234567890abcdef"
          },
          "recipient_name": {
            "type": "string",
            "description": "Name of the recipient (user) who received the certificate",
            "example": "John Doe"
          },
          "title": {
            "type": "string",
            "description": "Title of the certificate",
            "example": "Kubernetes Expert Certification"
          },
          "description": {
            "type": "string",
            "description": "Description of the certificate",
            "example": "Awarded for successfully completing the Kubernetes Expert course"
          },
          "issuing_authorities": {
            "type": "array",
            "items": {
              "x-go-type": "CertificateIssuingAuthority",
              "type": "object",
              "required": [
                "name",
                "url"
              ],
              "properties": {
                "name": {
                  "type": "string",
                  "description": "Name of the issuing authority",
                  "example": "Cloud Native Foundation"
                },
                "role": {
                  "type": "string",
                  "description": "Role of the issuing authority",
                  "example": "COO"
                },
                "signature_url": {
                  "type": "string",
                  "format": "uri",
                  "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                  "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                }
              }
            },
            "description": "List of issuing authorities for the certificate"
          },
          "issued_date": {
            "type": "string",
            "format": "date-time",
            "description": "Date when the certificate was issued",
            "example": "2023-10-01T12:00:00Z"
          },
          "expiration_date": {
            "type": "string",
            "format": "date-time",
            "description": "Date when the certificate expires (optional)",
            "example": "2025-10-01T12:00:00Z"
          }
        }
      },
      "CurriculaMetadata": {
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
            "description": "Filename of the banner image, which should be placed in the same directory as the _index.md file",
            "example": "kubernetes-icon.svg"
          },
          "permalink": {
            "type": "string",
            "format": "uri",
            "description": "Canonical URL for the learning path",
            "example": "http://localhost:9876/academy/learning-paths/layer5/mastering-kubernetes-for-engineers/"
          },
          "badge": {
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/v1beta1/badge"
            },
            "x-go-type": "badge.Badge",
            "type": "object",
            "required": [
              "id",
              "label",
              "name",
              "org_id",
              "description",
              "image_url",
              "created_at",
              "updated_at",
              "deleted_at"
            ],
            "properties": {
              "id": {
                "x-go-name": "ID",
                "x-oapi-codegen-extra-tags": {
                  "db": "id",
                  "json": "id"
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
                "description": "The ID of the organization in which this badge is available .",
                "x-oapi-codegen-extra-tags": {
                  "db": "org_id",
                  "json": "org_id"
                },
                "type": "string",
                "format": "uuid",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                }
              },
              "label": {
                "type": "string",
                "description": "unique identifier for the badge ( auto generated )",
                "example": "Kubernetes-Expert",
                "x-oapi-codegen-extra-tags": {
                  "db": "label",
                  "json": "label"
                }
              },
              "name": {
                "type": "string",
                "description": "Concise descriptor for the badge or certificate.",
                "example": "Kubernetes Expert",
                "x-oapi-codegen-extra-tags": {
                  "db": "name",
                  "json": "name"
                }
              },
              "description": {
                "type": "string",
                "description": "A description of the milestone achieved, often including criteria for receiving this recognition.",
                "example": "Awarded for mastering Kubernetes concepts and practices.",
                "x-oapi-codegen-extra-tags": {
                  "db": "description",
                  "json": "description"
                }
              },
              "image_url": {
                "type": "string",
                "format": "uri",
                "description": "URL to the badge image",
                "example": "https://raw.githubusercontent.com/layer5io/layer5-academy/refs/heads/master/static/11111111-1111-1111-1111-111111111111/images/meshery-logo-light.webp",
                "x-oapi-codegen-extra-tags": {
                  "db": "image_url",
                  "json": "image_url"
                }
              },
              "created_at": {
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
              },
              "deleted_at": {
                "description": "Timestamp when the resource was deleted.",
                "x-go-type": "time.Time",
                "type": "string",
                "format": "date-time",
                "x-go-name": "DeletedAt",
                "x-oapi-codegen-extra-tags": {
                  "db": "deleted_at",
                  "yaml": "deleted_at"
                },
                "x-go-type-skip-optional-pointer": true
              }
            }
          },
          "certificate": {
            "x-go-type": "Certificate",
            "type": "object",
            "required": [
              "id",
              "org_id",
              "title",
              "description",
              "issuing_authorities",
              "issued_date",
              "recipient_id",
              "recipient_name"
            ],
            "properties": {
              "id": {
                "type": "string",
                "description": "Unique identifier for the certificate",
                "example": "1234567890abcdef",
                "x-go-name": "ID"
              },
              "org_id": {
                "description": "UUID of the organization that issued the certificate",
                "type": "string",
                "format": "uuid",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                }
              },
              "recipient_id": {
                "type": "string",
                "description": "ID of the recipient (user) who received the certificate",
                "example": "1234567890abcdef"
              },
              "recipient_name": {
                "type": "string",
                "description": "Name of the recipient (user) who received the certificate",
                "example": "John Doe"
              },
              "title": {
                "type": "string",
                "description": "Title of the certificate",
                "example": "Kubernetes Expert Certification"
              },
              "description": {
                "type": "string",
                "description": "Description of the certificate",
                "example": "Awarded for successfully completing the Kubernetes Expert course"
              },
              "issuing_authorities": {
                "type": "array",
                "items": {
                  "x-go-type": "CertificateIssuingAuthority",
                  "type": "object",
                  "required": [
                    "name",
                    "url"
                  ],
                  "properties": {
                    "name": {
                      "type": "string",
                      "description": "Name of the issuing authority",
                      "example": "Cloud Native Foundation"
                    },
                    "role": {
                      "type": "string",
                      "description": "Role of the issuing authority",
                      "example": "COO"
                    },
                    "signature_url": {
                      "type": "string",
                      "format": "uri",
                      "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                      "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                    }
                  }
                },
                "description": "List of issuing authorities for the certificate"
              },
              "issued_date": {
                "type": "string",
                "format": "date-time",
                "description": "Date when the certificate was issued",
                "example": "2023-10-01T12:00:00Z"
              },
              "expiration_date": {
                "type": "string",
                "format": "date-time",
                "description": "Date when the certificate expires (optional)",
                "example": "2025-10-01T12:00:00Z"
              }
            }
          },
          "children": {
            "type": "array",
            "description": "List of children items in the top-level curricula",
            "items": {
              "x-go-type": "ChildNode",
              "type": "object",
              "properties": {
                "id": {
                  "type": "string",
                  "description": "Unique identifier for the course",
                  "example": "1234567890abcdef",
                  "x-go-name": "ID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "id",
                    "json": "id",
                    "yaml": "id"
                  }
                },
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
                  "description": "A numeric value to determine the display order. A smaller number appears first. If not specified, items will be sorted alphabetically by title.",
                  "example": "eg 1 , 2"
                },
                "banner": {
                  "type": "string",
                  "format": "uri",
                  "nullable": true,
                  "description": "Filename of the banner image, which should be placed in the same directory as the _index.md file",
                  "example": "kubernetes-icon.svg"
                },
                "type": {
                  "x-go-type": "ContentType",
                  "description": "Type of the content (e.g., learning-path, challenge, certification)",
                  "type": "string",
                  "enum": [
                    "learning-path",
                    "challenge",
                    "certification"
                  ]
                },
                "children": {
                  "type": "array",
                  "description": "List of child nodes (sub-courses or modules)",
                  "items": {
                    "type": "object",
                    "x-go-type": "ChildNode"
                  }
                }
              },
              "required": [
                "title",
                "description",
                "id",
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
      "AcademyRegistrationStatus": {
        "type": "string",
        "enum": [
          "registered",
          "completed",
          "failed",
          "withdrawn"
        ],
        "description": "Status of the user's course registration",
        "x-oapi-codegen-extra-tags": {
          "db": "status"
        }
      },
      "AcademyRegistration": {
        "type": "object",
        "required": [
          "id",
          "org_id",
          "user_id",
          "status",
          "created_at",
          "updated_at",
          "content_id",
          "certificate",
          "metadata"
        ],
        "properties": {
          "id": {
            "x-go-name": "ID",
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
            "x-go-type": "AcademyRegistrationStatus",
            "description": "Status of the user's course registration",
            "x-oapi-codegen-extra-tags": {
              "db": "status"
            },
            "type": "string",
            "enum": [
              "registered",
              "completed",
              "failed",
              "withdrawn"
            ]
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
            "description": "Timestamp when the resource was deleted.",
            "x-go-type": "time.Time",
            "type": "string",
            "format": "date-time",
            "x-go-name": "DeletedAt",
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at",
              "yaml": "deleted_at"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "certificate": {
            "x-go-type": "core.Map",
            "description": "Issued certificate for completing the curricula under registration",
            "x-oapi-codegen-extra-tags": {
              "db": "certificate"
            },
            "type": "object",
            "required": [
              "id",
              "org_id",
              "title",
              "description",
              "issuing_authorities",
              "issued_date",
              "recipient_id",
              "recipient_name"
            ],
            "properties": {
              "id": {
                "type": "string",
                "description": "Unique identifier for the certificate",
                "example": "1234567890abcdef",
                "x-go-name": "ID"
              },
              "org_id": {
                "description": "UUID of the organization that issued the certificate",
                "type": "string",
                "format": "uuid",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                }
              },
              "recipient_id": {
                "type": "string",
                "description": "ID of the recipient (user) who received the certificate",
                "example": "1234567890abcdef"
              },
              "recipient_name": {
                "type": "string",
                "description": "Name of the recipient (user) who received the certificate",
                "example": "John Doe"
              },
              "title": {
                "type": "string",
                "description": "Title of the certificate",
                "example": "Kubernetes Expert Certification"
              },
              "description": {
                "type": "string",
                "description": "Description of the certificate",
                "example": "Awarded for successfully completing the Kubernetes Expert course"
              },
              "issuing_authorities": {
                "type": "array",
                "items": {
                  "x-go-type": "CertificateIssuingAuthority",
                  "type": "object",
                  "required": [
                    "name",
                    "url"
                  ],
                  "properties": {
                    "name": {
                      "type": "string",
                      "description": "Name of the issuing authority",
                      "example": "Cloud Native Foundation"
                    },
                    "role": {
                      "type": "string",
                      "description": "Role of the issuing authority",
                      "example": "COO"
                    },
                    "signature_url": {
                      "type": "string",
                      "format": "uri",
                      "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                      "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                    }
                  }
                },
                "description": "List of issuing authorities for the certificate"
              },
              "issued_date": {
                "type": "string",
                "format": "date-time",
                "description": "Date when the certificate was issued",
                "example": "2023-10-01T12:00:00Z"
              },
              "expiration_date": {
                "type": "string",
                "format": "date-time",
                "description": "Date when the certificate expires (optional)",
                "example": "2025-10-01T12:00:00Z"
              }
            }
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
      "ChildNode": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "Unique identifier for the course",
            "example": "1234567890abcdef",
            "x-go-name": "ID",
            "x-oapi-codegen-extra-tags": {
              "db": "id",
              "json": "id",
              "yaml": "id"
            }
          },
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
            "description": "A numeric value to determine the display order. A smaller number appears first. If not specified, items will be sorted alphabetically by title.",
            "example": "eg 1 , 2"
          },
          "banner": {
            "type": "string",
            "format": "uri",
            "nullable": true,
            "description": "Filename of the banner image, which should be placed in the same directory as the _index.md file",
            "example": "kubernetes-icon.svg"
          },
          "type": {
            "x-go-type": "ContentType",
            "description": "Type of the content (e.g., learning-path, challenge, certification)",
            "type": "string",
            "enum": [
              "learning-path",
              "challenge",
              "certification"
            ]
          },
          "children": {
            "type": "array",
            "description": "List of child nodes (sub-courses or modules)",
            "items": {
              "type": "object",
              "x-go-type": "ChildNode"
            }
          }
        },
        "required": [
          "title",
          "description",
          "id",
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
                "id",
                "org_id",
                "user_id",
                "status",
                "created_at",
                "updated_at",
                "content_id",
                "certificate",
                "metadata"
              ],
              "properties": {
                "id": {
                  "x-go-name": "ID",
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
                  "x-go-type": "AcademyRegistrationStatus",
                  "description": "Status of the user's course registration",
                  "x-oapi-codegen-extra-tags": {
                    "db": "status"
                  },
                  "type": "string",
                  "enum": [
                    "registered",
                    "completed",
                    "failed",
                    "withdrawn"
                  ]
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
                  "description": "Timestamp when the resource was deleted.",
                  "x-go-type": "time.Time",
                  "type": "string",
                  "format": "date-time",
                  "x-go-name": "DeletedAt",
                  "x-oapi-codegen-extra-tags": {
                    "db": "deleted_at",
                    "yaml": "deleted_at"
                  },
                  "x-go-type-skip-optional-pointer": true
                },
                "certificate": {
                  "x-go-type": "core.Map",
                  "description": "Issued certificate for completing the curricula under registration",
                  "x-oapi-codegen-extra-tags": {
                    "db": "certificate"
                  },
                  "type": "object",
                  "required": [
                    "id",
                    "org_id",
                    "title",
                    "description",
                    "issuing_authorities",
                    "issued_date",
                    "recipient_id",
                    "recipient_name"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "description": "Unique identifier for the certificate",
                      "example": "1234567890abcdef",
                      "x-go-name": "ID"
                    },
                    "org_id": {
                      "description": "UUID of the organization that issued the certificate",
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "recipient_id": {
                      "type": "string",
                      "description": "ID of the recipient (user) who received the certificate",
                      "example": "1234567890abcdef"
                    },
                    "recipient_name": {
                      "type": "string",
                      "description": "Name of the recipient (user) who received the certificate",
                      "example": "John Doe"
                    },
                    "title": {
                      "type": "string",
                      "description": "Title of the certificate",
                      "example": "Kubernetes Expert Certification"
                    },
                    "description": {
                      "type": "string",
                      "description": "Description of the certificate",
                      "example": "Awarded for successfully completing the Kubernetes Expert course"
                    },
                    "issuing_authorities": {
                      "type": "array",
                      "items": {
                        "x-go-type": "CertificateIssuingAuthority",
                        "type": "object",
                        "required": [
                          "name",
                          "url"
                        ],
                        "properties": {
                          "name": {
                            "type": "string",
                            "description": "Name of the issuing authority",
                            "example": "Cloud Native Foundation"
                          },
                          "role": {
                            "type": "string",
                            "description": "Role of the issuing authority",
                            "example": "COO"
                          },
                          "signature_url": {
                            "type": "string",
                            "format": "uri",
                            "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                            "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                          }
                        }
                      },
                      "description": "List of issuing authorities for the certificate"
                    },
                    "issued_date": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Date when the certificate was issued",
                      "example": "2023-10-01T12:00:00Z"
                    },
                    "expiration_date": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Date when the certificate expires (optional)",
                      "example": "2025-10-01T12:00:00Z"
                    }
                  }
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
      },
      "CirriculaCurrentItemData": {
        "type": "object",
        "required": [
          "id",
          "last_opened",
          "content_type"
        ],
        "properties": {
          "id": {
            "type": "string"
          },
          "last_opened": {
            "type": "string",
            "format": "date-time"
          },
          "content_type": {
            "type": "string",
            "enum": [
              "learning-path",
              "challenge",
              "certification"
            ],
            "x-go-type": "ContentType"
          }
        }
      },
      "CirriculaProgressTracker": {
        "type": "object",
        "required": [
          "current_item",
          "grades",
          "time_spent",
          "completed",
          "completed_items"
        ],
        "properties": {
          "current_item": {
            "type": "object",
            "additionalProperties": {
              "x-go-type": "CirriculaCurrentItemData",
              "type": "object",
              "required": [
                "id",
                "last_opened",
                "content_type"
              ],
              "properties": {
                "id": {
                  "type": "string"
                },
                "last_opened": {
                  "type": "string",
                  "format": "date-time"
                },
                "content_type": {
                  "type": "string",
                  "enum": [
                    "learning-path",
                    "challenge",
                    "certification"
                  ],
                  "x-go-type": "ContentType"
                }
              }
            }
          },
          "grades": {
            "type": "object",
            "additionalProperties": {
              "x-go-type": "QuizEvaluationResult",
              "type": "object",
              "required": [
                "score",
                "passed",
                "total_marks",
                "pass_percentage",
                "quiz",
                "attempted_at",
                "attempts",
                "percentage_scored",
                "correct_submissions"
              ],
              "properties": {
                "score": {
                  "type": "integer"
                },
                "passed": {
                  "type": "boolean"
                },
                "percentage_scored": {
                  "type": "number",
                  "format": "float"
                },
                "total_marks": {
                  "type": "integer"
                },
                "pass_percentage": {
                  "type": "number",
                  "format": "float"
                },
                "correct_submissions": {
                  "type": "object",
                  "additionalProperties": {
                    "type": "boolean"
                  }
                },
                "quiz": {
                  "x-go-type": "Quiz",
                  "type": "object",
                  "required": [
                    "id",
                    "title",
                    "orgId",
                    "description",
                    "slug",
                    "relPermalink",
                    "permalink",
                    "type",
                    "section",
                    "layout",
                    "date",
                    "final",
                    "lastmod",
                    "draft",
                    "file_path",
                    "pass_percentage",
                    "time_limit",
                    "questions",
                    "total_questions",
                    "total_marks",
                    "prerequisites"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "x-go-name": "ID",
                      "x-oapi-codegen-extra-tags": {
                        "json": "id"
                      }
                    },
                    "orgId": {
                      "type": "string",
                      "description": "Organization ID that owns this quiz",
                      "example": "layer5",
                      "x-oapi-codegen-extra-tags": {
                        "db": "org_id",
                        "json": "org_id",
                        "yaml": "org_id"
                      }
                    },
                    "final": {
                      "type": "boolean",
                      "description": "Indicates if the quiz is final . i.e this quiz will used to evaluate the completion of parent section eg course , module , learning path",
                      "example": true
                    },
                    "title": {
                      "type": "string"
                    },
                    "description": {
                      "type": "string"
                    },
                    "slug": {
                      "type": "string"
                    },
                    "relPermalink": {
                      "type": "string"
                    },
                    "permalink": {
                      "type": "string"
                    },
                    "type": {
                      "type": "string"
                    },
                    "section": {
                      "type": "string"
                    },
                    "layout": {
                      "type": "string"
                    },
                    "date": {
                      "type": "string",
                      "format": "date"
                    },
                    "lastmod": {
                      "type": "string",
                      "format": "date"
                    },
                    "draft": {
                      "type": "boolean"
                    },
                    "file_path": {
                      "type": "string"
                    },
                    "pass_percentage": {
                      "type": "number",
                      "format": "float"
                    },
                    "time_limit": {
                      "type": "string"
                    },
                    "questions": {
                      "type": "array",
                      "items": {
                        "x-go-type": "Question",
                        "type": "object",
                        "required": [
                          "id",
                          "text",
                          "type",
                          "marks",
                          "options",
                          "correct_answer"
                        ],
                        "properties": {
                          "id": {
                            "type": "string"
                          },
                          "text": {
                            "type": "string"
                          },
                          "type": {
                            "x-go-type": "QuestionType",
                            "type": "string",
                            "x-enum-varnames": [
                              "QuestionTypeMultipleAnswers",
                              "QuestionTypeSingleAnswer",
                              "QuestionTypeShortAnswer",
                              "QuestionTypeEssay"
                            ],
                            "enum": [
                              "multiple-answers",
                              "single-answer",
                              "short-answer",
                              "essay"
                            ]
                          },
                          "marks": {
                            "type": "integer"
                          },
                          "multiple_answers": {
                            "type": "boolean"
                          },
                          "options": {
                            "type": "array",
                            "items": {
                              "x-go-type": "QuestionOption",
                              "type": "object",
                              "required": [
                                "id",
                                "text",
                                "is_correct"
                              ],
                              "properties": {
                                "id": {
                                  "type": "string"
                                },
                                "text": {
                                  "type": "string"
                                },
                                "is_correct": {
                                  "type": "boolean"
                                }
                              }
                            }
                          },
                          "correct_answer": {
                            "type": "string"
                          }
                        }
                      }
                    },
                    "total_questions": {
                      "type": "integer"
                    },
                    "total_marks": {
                      "type": "integer"
                    },
                    "prerequisites": {
                      "type": "array",
                      "items": {
                        "x-go-type": "Parent",
                        "type": "object",
                        "required": [
                          "id",
                          "title",
                          "relPermalink",
                          "type"
                        ],
                        "properties": {
                          "id": {
                            "type": "string"
                          },
                          "title": {
                            "type": "string"
                          },
                          "relPermalink": {
                            "type": "string"
                          },
                          "type": {
                            "type": "string"
                          }
                        }
                      }
                    },
                    "parent": {
                      "x-go-type": "Parent",
                      "type": "object",
                      "required": [
                        "id",
                        "title",
                        "relPermalink",
                        "type"
                      ],
                      "properties": {
                        "id": {
                          "type": "string"
                        },
                        "title": {
                          "type": "string"
                        },
                        "relPermalink": {
                          "type": "string"
                        },
                        "type": {
                          "type": "string"
                        }
                      }
                    }
                  }
                },
                "attempted_at": {
                  "type": "string",
                  "format": "date-time"
                },
                "attempts": {
                  "type": "integer"
                }
              }
            }
          },
          "time_spent": {
            "type": "integer",
            "description": "Total time spent in seconds"
          },
          "completed_items": {
            "type": "object",
            "description": "Items that have been completed (map of item IDs to item data)",
            "additionalProperties": {
              "x-go-type": "ProgressItemCompleted",
              "type": "object",
              "required": [
                "completed_at",
                "item_data"
              ],
              "properties": {
                "completed_at": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Timestamp when the item was completed"
                },
                "item_data": {
                  "x-go-type": "Parent",
                  "type": "object",
                  "required": [
                    "id",
                    "title",
                    "relPermalink",
                    "type"
                  ],
                  "properties": {
                    "id": {
                      "type": "string"
                    },
                    "title": {
                      "type": "string"
                    },
                    "relPermalink": {
                      "type": "string"
                    },
                    "type": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "completed": {
            "type": "string",
            "format": "date-time",
            "x-go-type": "core.NullTime"
          }
        }
      },
      "ProgressItemCompleted": {
        "type": "object",
        "required": [
          "completed_at",
          "item_data"
        ],
        "properties": {
          "completed_at": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the item was completed"
          },
          "item_data": {
            "x-go-type": "Parent",
            "type": "object",
            "required": [
              "id",
              "title",
              "relPermalink",
              "type"
            ],
            "properties": {
              "id": {
                "type": "string"
              },
              "title": {
                "type": "string"
              },
              "relPermalink": {
                "type": "string"
              },
              "type": {
                "type": "string"
              }
            }
          }
        }
      },
      "UpdateCurrentItemRequest": {
        "type": "object",
        "properties": {
          "content_type": {
            "type": "string",
            "enum": [
              "learning-path",
              "challenge",
              "certification"
            ],
            "x-go-type": "ContentType"
          },
          "item_data": {
            "x-go-type": "CirriculaCurrentItemData",
            "type": "object",
            "required": [
              "id",
              "last_opened",
              "content_type"
            ],
            "properties": {
              "id": {
                "type": "string"
              },
              "last_opened": {
                "type": "string",
                "format": "date-time"
              },
              "content_type": {
                "type": "string",
                "enum": [
                  "learning-path",
                  "challenge",
                  "certification"
                ],
                "x-go-type": "ContentType"
              }
            }
          }
        },
        "required": [
          "content_type",
          "item_data"
        ]
      },
      "ErrorResponse": {
        "type": "object",
        "properties": {
          "error": {
            "type": "string"
          },
          "details": {
            "type": "string"
          }
        }
      },
      "Quiz": {
        "type": "object",
        "required": [
          "id",
          "title",
          "orgId",
          "description",
          "slug",
          "relPermalink",
          "permalink",
          "type",
          "section",
          "layout",
          "date",
          "final",
          "lastmod",
          "draft",
          "file_path",
          "pass_percentage",
          "time_limit",
          "questions",
          "total_questions",
          "total_marks",
          "prerequisites"
        ],
        "properties": {
          "id": {
            "type": "string",
            "x-go-name": "ID",
            "x-oapi-codegen-extra-tags": {
              "json": "id"
            }
          },
          "orgId": {
            "type": "string",
            "description": "Organization ID that owns this quiz",
            "example": "layer5",
            "x-oapi-codegen-extra-tags": {
              "db": "org_id",
              "json": "org_id",
              "yaml": "org_id"
            }
          },
          "final": {
            "type": "boolean",
            "description": "Indicates if the quiz is final . i.e this quiz will used to evaluate the completion of parent section eg course , module , learning path",
            "example": true
          },
          "title": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "slug": {
            "type": "string"
          },
          "relPermalink": {
            "type": "string"
          },
          "permalink": {
            "type": "string"
          },
          "type": {
            "type": "string"
          },
          "section": {
            "type": "string"
          },
          "layout": {
            "type": "string"
          },
          "date": {
            "type": "string",
            "format": "date"
          },
          "lastmod": {
            "type": "string",
            "format": "date"
          },
          "draft": {
            "type": "boolean"
          },
          "file_path": {
            "type": "string"
          },
          "pass_percentage": {
            "type": "number",
            "format": "float"
          },
          "time_limit": {
            "type": "string"
          },
          "questions": {
            "type": "array",
            "items": {
              "x-go-type": "Question",
              "type": "object",
              "required": [
                "id",
                "text",
                "type",
                "marks",
                "options",
                "correct_answer"
              ],
              "properties": {
                "id": {
                  "type": "string"
                },
                "text": {
                  "type": "string"
                },
                "type": {
                  "x-go-type": "QuestionType",
                  "type": "string",
                  "x-enum-varnames": [
                    "QuestionTypeMultipleAnswers",
                    "QuestionTypeSingleAnswer",
                    "QuestionTypeShortAnswer",
                    "QuestionTypeEssay"
                  ],
                  "enum": [
                    "multiple-answers",
                    "single-answer",
                    "short-answer",
                    "essay"
                  ]
                },
                "marks": {
                  "type": "integer"
                },
                "multiple_answers": {
                  "type": "boolean"
                },
                "options": {
                  "type": "array",
                  "items": {
                    "x-go-type": "QuestionOption",
                    "type": "object",
                    "required": [
                      "id",
                      "text",
                      "is_correct"
                    ],
                    "properties": {
                      "id": {
                        "type": "string"
                      },
                      "text": {
                        "type": "string"
                      },
                      "is_correct": {
                        "type": "boolean"
                      }
                    }
                  }
                },
                "correct_answer": {
                  "type": "string"
                }
              }
            }
          },
          "total_questions": {
            "type": "integer"
          },
          "total_marks": {
            "type": "integer"
          },
          "prerequisites": {
            "type": "array",
            "items": {
              "x-go-type": "Parent",
              "type": "object",
              "required": [
                "id",
                "title",
                "relPermalink",
                "type"
              ],
              "properties": {
                "id": {
                  "type": "string"
                },
                "title": {
                  "type": "string"
                },
                "relPermalink": {
                  "type": "string"
                },
                "type": {
                  "type": "string"
                }
              }
            }
          },
          "parent": {
            "x-go-type": "Parent",
            "type": "object",
            "required": [
              "id",
              "title",
              "relPermalink",
              "type"
            ],
            "properties": {
              "id": {
                "type": "string"
              },
              "title": {
                "type": "string"
              },
              "relPermalink": {
                "type": "string"
              },
              "type": {
                "type": "string"
              }
            }
          }
        }
      },
      "Parent": {
        "type": "object",
        "required": [
          "id",
          "title",
          "relPermalink",
          "type"
        ],
        "properties": {
          "id": {
            "type": "string"
          },
          "title": {
            "type": "string"
          },
          "relPermalink": {
            "type": "string"
          },
          "type": {
            "type": "string"
          }
        }
      },
      "QuestionType": {
        "type": "string",
        "x-enum-varnames": [
          "QuestionTypeMultipleAnswers",
          "QuestionTypeSingleAnswer",
          "QuestionTypeShortAnswer",
          "QuestionTypeEssay"
        ],
        "enum": [
          "multiple-answers",
          "single-answer",
          "short-answer",
          "essay"
        ]
      },
      "Question": {
        "type": "object",
        "required": [
          "id",
          "text",
          "type",
          "marks",
          "options",
          "correct_answer"
        ],
        "properties": {
          "id": {
            "type": "string"
          },
          "text": {
            "type": "string"
          },
          "type": {
            "x-go-type": "QuestionType",
            "type": "string",
            "x-enum-varnames": [
              "QuestionTypeMultipleAnswers",
              "QuestionTypeSingleAnswer",
              "QuestionTypeShortAnswer",
              "QuestionTypeEssay"
            ],
            "enum": [
              "multiple-answers",
              "single-answer",
              "short-answer",
              "essay"
            ]
          },
          "marks": {
            "type": "integer"
          },
          "multiple_answers": {
            "type": "boolean"
          },
          "options": {
            "type": "array",
            "items": {
              "x-go-type": "QuestionOption",
              "type": "object",
              "required": [
                "id",
                "text",
                "is_correct"
              ],
              "properties": {
                "id": {
                  "type": "string"
                },
                "text": {
                  "type": "string"
                },
                "is_correct": {
                  "type": "boolean"
                }
              }
            }
          },
          "correct_answer": {
            "type": "string"
          }
        }
      },
      "QuestionOption": {
        "type": "object",
        "required": [
          "id",
          "text",
          "is_correct"
        ],
        "properties": {
          "id": {
            "type": "string"
          },
          "text": {
            "type": "string"
          },
          "is_correct": {
            "type": "boolean"
          }
        }
      },
      "QuizSubmission": {
        "type": "object",
        "required": [
          "quiz_abs_path",
          "registration_id",
          "user_id",
          "answers"
        ],
        "properties": {
          "quiz_abs_path": {
            "type": "string"
          },
          "registration_id": {
            "type": "string"
          },
          "user_id": {
            "type": "string"
          },
          "answers": {
            "type": "array",
            "items": {
              "x-go-type": "SubmittedAnswer",
              "type": "object",
              "required": [
                "question_id",
                "selected_option_id",
                "answer_text"
              ],
              "properties": {
                "question_id": {
                  "type": "string"
                },
                "selected_option_id": {
                  "type": "object",
                  "additionalProperties": {
                    "type": "boolean"
                  }
                },
                "answer_text": {
                  "type": "string"
                }
              }
            }
          }
        }
      },
      "SubmittedAnswer": {
        "type": "object",
        "required": [
          "question_id",
          "selected_option_id",
          "answer_text"
        ],
        "properties": {
          "question_id": {
            "type": "string"
          },
          "selected_option_id": {
            "type": "object",
            "additionalProperties": {
              "type": "boolean"
            }
          },
          "answer_text": {
            "type": "string"
          }
        }
      },
      "QuizEvaluationResult": {
        "type": "object",
        "required": [
          "score",
          "passed",
          "total_marks",
          "pass_percentage",
          "quiz",
          "attempted_at",
          "attempts",
          "percentage_scored",
          "correct_submissions"
        ],
        "properties": {
          "score": {
            "type": "integer"
          },
          "passed": {
            "type": "boolean"
          },
          "percentage_scored": {
            "type": "number",
            "format": "float"
          },
          "total_marks": {
            "type": "integer"
          },
          "pass_percentage": {
            "type": "number",
            "format": "float"
          },
          "correct_submissions": {
            "type": "object",
            "additionalProperties": {
              "type": "boolean"
            }
          },
          "quiz": {
            "x-go-type": "Quiz",
            "type": "object",
            "required": [
              "id",
              "title",
              "orgId",
              "description",
              "slug",
              "relPermalink",
              "permalink",
              "type",
              "section",
              "layout",
              "date",
              "final",
              "lastmod",
              "draft",
              "file_path",
              "pass_percentage",
              "time_limit",
              "questions",
              "total_questions",
              "total_marks",
              "prerequisites"
            ],
            "properties": {
              "id": {
                "type": "string",
                "x-go-name": "ID",
                "x-oapi-codegen-extra-tags": {
                  "json": "id"
                }
              },
              "orgId": {
                "type": "string",
                "description": "Organization ID that owns this quiz",
                "example": "layer5",
                "x-oapi-codegen-extra-tags": {
                  "db": "org_id",
                  "json": "org_id",
                  "yaml": "org_id"
                }
              },
              "final": {
                "type": "boolean",
                "description": "Indicates if the quiz is final . i.e this quiz will used to evaluate the completion of parent section eg course , module , learning path",
                "example": true
              },
              "title": {
                "type": "string"
              },
              "description": {
                "type": "string"
              },
              "slug": {
                "type": "string"
              },
              "relPermalink": {
                "type": "string"
              },
              "permalink": {
                "type": "string"
              },
              "type": {
                "type": "string"
              },
              "section": {
                "type": "string"
              },
              "layout": {
                "type": "string"
              },
              "date": {
                "type": "string",
                "format": "date"
              },
              "lastmod": {
                "type": "string",
                "format": "date"
              },
              "draft": {
                "type": "boolean"
              },
              "file_path": {
                "type": "string"
              },
              "pass_percentage": {
                "type": "number",
                "format": "float"
              },
              "time_limit": {
                "type": "string"
              },
              "questions": {
                "type": "array",
                "items": {
                  "x-go-type": "Question",
                  "type": "object",
                  "required": [
                    "id",
                    "text",
                    "type",
                    "marks",
                    "options",
                    "correct_answer"
                  ],
                  "properties": {
                    "id": {
                      "type": "string"
                    },
                    "text": {
                      "type": "string"
                    },
                    "type": {
                      "x-go-type": "QuestionType",
                      "type": "string",
                      "x-enum-varnames": [
                        "QuestionTypeMultipleAnswers",
                        "QuestionTypeSingleAnswer",
                        "QuestionTypeShortAnswer",
                        "QuestionTypeEssay"
                      ],
                      "enum": [
                        "multiple-answers",
                        "single-answer",
                        "short-answer",
                        "essay"
                      ]
                    },
                    "marks": {
                      "type": "integer"
                    },
                    "multiple_answers": {
                      "type": "boolean"
                    },
                    "options": {
                      "type": "array",
                      "items": {
                        "x-go-type": "QuestionOption",
                        "type": "object",
                        "required": [
                          "id",
                          "text",
                          "is_correct"
                        ],
                        "properties": {
                          "id": {
                            "type": "string"
                          },
                          "text": {
                            "type": "string"
                          },
                          "is_correct": {
                            "type": "boolean"
                          }
                        }
                      }
                    },
                    "correct_answer": {
                      "type": "string"
                    }
                  }
                }
              },
              "total_questions": {
                "type": "integer"
              },
              "total_marks": {
                "type": "integer"
              },
              "prerequisites": {
                "type": "array",
                "items": {
                  "x-go-type": "Parent",
                  "type": "object",
                  "required": [
                    "id",
                    "title",
                    "relPermalink",
                    "type"
                  ],
                  "properties": {
                    "id": {
                      "type": "string"
                    },
                    "title": {
                      "type": "string"
                    },
                    "relPermalink": {
                      "type": "string"
                    },
                    "type": {
                      "type": "string"
                    }
                  }
                }
              },
              "parent": {
                "x-go-type": "Parent",
                "type": "object",
                "required": [
                  "id",
                  "title",
                  "relPermalink",
                  "type"
                ],
                "properties": {
                  "id": {
                    "type": "string"
                  },
                  "title": {
                    "type": "string"
                  },
                  "relPermalink": {
                    "type": "string"
                  },
                  "type": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "attempted_at": {
            "type": "string",
            "format": "date-time"
          },
          "attempts": {
            "type": "integer"
          }
        }
      },
      "UserRegistration": {
        "type": "object",
        "required": [
          "curricula_title",
          "curricula_type",
          "curricula_permalink",
          "registration_id",
          "status",
          "user_id",
          "user_email",
          "user_last_name",
          "user_first_name",
          "user_avatar_url",
          "total_count"
        ],
        "properties": {
          "curricula_title": {
            "type": "string",
            "description": "Title of the curricula",
            "x-oapi-codegen-extra-tags": {
              "db": "curricula_title"
            }
          },
          "curricula_type": {
            "type": "string",
            "enum": [
              "learning-path",
              "challenge",
              "certification"
            ],
            "description": "Type of the curricula",
            "x-go-type": "ContentType",
            "x-oapi-codegen-extra-tags": {
              "db": "curricula_type"
            }
          },
          "curricula_permalink": {
            "type": "string",
            "description": "Permalink of the curricula",
            "x-oapi-codegen-extra-tags": {
              "db": "curricula_permalink"
            }
          },
          "registration_id": {
            "type": "string",
            "format": "uuid",
            "description": "Unique ID of the registration",
            "x-oapi-codegen-extra-tags": {
              "db": "registration_id"
            }
          },
          "status": {
            "description": "Registration status",
            "x-go-type": "AcademyRegistrationStatus",
            "x-oapi-codegen-extra-tags": {
              "db": "status"
            },
            "type": "string",
            "enum": [
              "registered",
              "completed",
              "failed",
              "withdrawn"
            ]
          },
          "created_at": {
            "type": "string",
            "format": "date-time",
            "description": "When the registration was created",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at"
            }
          },
          "user_id": {
            "type": "string",
            "format": "uuid",
            "description": "ID of the user",
            "x-oapi-codegen-extra-tags": {
              "db": "user_id"
            }
          },
          "user_first_name": {
            "type": "string",
            "description": "First name of the user",
            "x-oapi-codegen-extra-tags": {
              "db": "user_first_name"
            }
          },
          "user_last_name": {
            "type": "string",
            "description": "Last name of the user",
            "x-oapi-codegen-extra-tags": {
              "db": "user_last_name"
            }
          },
          "user_email": {
            "type": "string",
            "format": "email",
            "description": "Email of the user",
            "x-oapi-codegen-extra-tags": {
              "db": "user_email"
            }
          },
          "user_avatar_url": {
            "type": "string",
            "format": "uri",
            "description": "Avatar URL of the user",
            "x-oapi-codegen-extra-tags": {
              "db": "user_avatar_url"
            }
          },
          "total_count": {
            "type": "integer",
            "format": "int64",
            "description": "Total count for pagination",
            "x-oapi-codegen-extra-tags": {
              "db": "total_count"
            }
          }
        }
      },
      "CurriculaRegistrationsFilter": {
        "type": "object",
        "required": [
          "pagesize",
          "page",
          "content_type",
          "status"
        ],
        "properties": {
          "pagesize": {
            "type": "integer"
          },
          "page": {
            "type": "integer"
          },
          "content_type": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "status": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        }
      },
      "CurriculaRegistrationsResponse": {
        "type": "object",
        "required": [
          "data",
          "total_count",
          "page_size",
          "page"
        ],
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "x-go-type": "UserRegistration",
              "type": "object",
              "required": [
                "curricula_title",
                "curricula_type",
                "curricula_permalink",
                "registration_id",
                "status",
                "user_id",
                "user_email",
                "user_last_name",
                "user_first_name",
                "user_avatar_url",
                "total_count"
              ],
              "properties": {
                "curricula_title": {
                  "type": "string",
                  "description": "Title of the curricula",
                  "x-oapi-codegen-extra-tags": {
                    "db": "curricula_title"
                  }
                },
                "curricula_type": {
                  "type": "string",
                  "enum": [
                    "learning-path",
                    "challenge",
                    "certification"
                  ],
                  "description": "Type of the curricula",
                  "x-go-type": "ContentType",
                  "x-oapi-codegen-extra-tags": {
                    "db": "curricula_type"
                  }
                },
                "curricula_permalink": {
                  "type": "string",
                  "description": "Permalink of the curricula",
                  "x-oapi-codegen-extra-tags": {
                    "db": "curricula_permalink"
                  }
                },
                "registration_id": {
                  "type": "string",
                  "format": "uuid",
                  "description": "Unique ID of the registration",
                  "x-oapi-codegen-extra-tags": {
                    "db": "registration_id"
                  }
                },
                "status": {
                  "description": "Registration status",
                  "x-go-type": "AcademyRegistrationStatus",
                  "x-oapi-codegen-extra-tags": {
                    "db": "status"
                  },
                  "type": "string",
                  "enum": [
                    "registered",
                    "completed",
                    "failed",
                    "withdrawn"
                  ]
                },
                "created_at": {
                  "type": "string",
                  "format": "date-time",
                  "description": "When the registration was created",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at"
                  }
                },
                "user_id": {
                  "type": "string",
                  "format": "uuid",
                  "description": "ID of the user",
                  "x-oapi-codegen-extra-tags": {
                    "db": "user_id"
                  }
                },
                "user_first_name": {
                  "type": "string",
                  "description": "First name of the user",
                  "x-oapi-codegen-extra-tags": {
                    "db": "user_first_name"
                  }
                },
                "user_last_name": {
                  "type": "string",
                  "description": "Last name of the user",
                  "x-oapi-codegen-extra-tags": {
                    "db": "user_last_name"
                  }
                },
                "user_email": {
                  "type": "string",
                  "format": "email",
                  "description": "Email of the user",
                  "x-oapi-codegen-extra-tags": {
                    "db": "user_email"
                  }
                },
                "user_avatar_url": {
                  "type": "string",
                  "format": "uri",
                  "description": "Avatar URL of the user",
                  "x-oapi-codegen-extra-tags": {
                    "db": "user_avatar_url"
                  }
                },
                "total_count": {
                  "type": "integer",
                  "format": "int64",
                  "description": "Total count for pagination",
                  "x-oapi-codegen-extra-tags": {
                    "db": "total_count"
                  }
                }
              }
            }
          },
          "total_count": {
            "type": "integer",
            "format": "int64"
          },
          "page_size": {
            "type": "integer"
          },
          "page": {
            "type": "integer"
          }
        }
      }
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
};

export default schema;
