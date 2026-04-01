/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const AcademySchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Academy API",
    "description": "OpenAPI schema for Meshery Academy content and curriculum management.",
    "x-deprecated": true,
    "x-superseded-by": "v1beta2",
    "version": "v1beta1",
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
  "paths": {
    "/api/academy/Curricula/registered": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Academy"
        ],
        "operationId": "getMyAcademyCurricula",
        "summary": "Get academy content",
        "description": "Returns a list of academy content registered by the user with optional filtering.",
        "parameters": [
          {
            "name": "contentType",
            "in": "query",
            "description": "Filter content by content types",
            "required": false,
            "style": "form",
            "explode": true,
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          {
            "name": "orgId",
            "in": "query",
            "description": "Filter content by organization IDs",
            "required": false,
            "style": "form",
            "explode": true,
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          }
        ],
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
                      "description": "Total number of Curricula",
                      "example": 7
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "x-go-type": "AcademyCurricula",
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string",
                            "description": "Id of the Curricula",
                            "example": "923458-3490394-934893",
                            "x-go-name": "ID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "id",
                              "json": "id"
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
                              "json": "org_id"
                            }
                          },
                          "visibility": {
                            "description": "Visibility of the Curricula",
                            "x-go-type": "Visibility",
                            "x-oapi-codegen-extra-tags": {
                              "db": "visibility",
                              "json": "visibility"
                            },
                            "type": "string",
                            "enum": [
                              "public",
                              "private"
                            ]
                          },
                          "status": {
                            "example": "ready",
                            "description": "Status of the Curricula",
                            "x-go-type": "Status",
                            "x-oapi-codegen-extra-tags": {
                              "db": "status",
                              "json": "status"
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
                            "description": "slug of the Curricula",
                            "example": "intro-kubernetes-course"
                          },
                          "level": {
                            "description": "Level of the Curricula",
                            "x-go-type": "Level",
                            "x-oapi-codegen-extra-tags": {
                              "db": "level",
                              "json": "level"
                            },
                            "type": "string",
                            "enum": [
                              "beginner",
                              "intermediate",
                              "advanced"
                            ]
                          },
                          "badge_id": {
                            "type": "string",
                            "format": "uuid",
                            "description": "ID of the badge to be awarded on completion of this curricula",
                            "x-go-type": "core.Uuid",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "badge_id",
                              "json": "badge_id"
                            }
                          },
                          "inviteId": {
                            "allOf": [
                              {
                                "type": "string",
                                "format": "uuid",
                                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                }
                              }
                            ],
                            "description": "ID of the invite associated with this Curricula",
                            "x-oapi-codegen-extra-tags": {
                              "db": "invite_id",
                              "json": "invite_id"
                            }
                          },
                          "workspace_id": {
                            "allOf": [
                              {
                                "type": "string",
                                "format": "uuid",
                                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                }
                              }
                            ],
                            "description": "ID of the workspace to which this Curricula belongs",
                            "x-oapi-codegen-extra-tags": {
                              "db": "workspace_id",
                              "json": "workspace_id"
                            }
                          },
                          "createdAt": {
                            "allOf": [
                              {
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              }
                            ],
                            "description": "When the Curricula item was created",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "json": "created_at"
                            }
                          },
                          "updatedAt": {
                            "allOf": [
                              {
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              }
                            ],
                            "description": "When the Curricula was last updated",
                            "x-go-type": "core.Time",
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "json": "updated_at"
                            }
                          },
                          "deletedAt": {
                            "allOf": [
                              {
                                "description": "Timestamp when the resource was deleted.",
                                "x-go-type": "NullTime",
                                "type": "string",
                                "format": "date-time",
                                "x-go-name": "DeletedAt",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "deleted_at",
                                  "yaml": "deleted_at"
                                },
                                "x-go-type-skip-optional-pointer": true
                              }
                            ],
                            "x-go-type": "core.NullTime",
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "json": "deleted_at"
                            }
                          },
                          "metadata": {
                            "type": "object",
                            "description": "Additional metadata about the Curricula",
                            "additionalProperties": true,
                            "x-go-type": "core.Map",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "metadata",
                              "json": "metadata"
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
                                    "description": "Short description of the curricula",
                                    "example": "Learn how to configure your Kubernetes clusters and manage the lifecycle of your workloads"
                                  },
                                  "detailedDescription": {
                                    "type": "string",
                                    "description": "Detailed description of the curricula",
                                    "example": "This learning path covers everything from Kubernetes architecture to advanced deployment strategies, including hands-on labs and real-world scenarios."
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
                                  "certificate": {
                                    "x-go-type": "Certificate",
                                    "type": "object",
                                    "required": [
                                      "id",
                                      "orgId",
                                      "title",
                                      "description",
                                      "issuingAuthorities",
                                      "issuedDate",
                                      "recipientId",
                                      "recipientName"
                                    ],
                                    "properties": {
                                      "id": {
                                        "type": "string",
                                        "description": "Unique identifier for the certificate",
                                        "example": "1234567890abcdef",
                                        "x-go-name": "ID"
                                      },
                                      "orgId": {
                                        "type": "string",
                                        "format": "uuid",
                                        "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                        "x-go-type": "uuid.UUID",
                                        "x-go-type-import": {
                                          "path": "github.com/gofrs/uuid"
                                        }
                                      },
                                      "recipientId": {
                                        "type": "string",
                                        "description": "ID of the recipient (user) who received the certificate",
                                        "example": "1234567890abcdef"
                                      },
                                      "recipientName": {
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
                                      "issuingAuthorities": {
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
                                            "signatureUrl": {
                                              "type": "string",
                                              "format": "uri",
                                              "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                                              "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                                            }
                                          }
                                        },
                                        "description": "List of issuing authorities for the certificate"
                                      },
                                      "issuedDate": {
                                        "type": "string",
                                        "format": "date-time",
                                        "description": "Date when the certificate was issued",
                                        "example": "2023-10-01T12:00:00Z"
                                      },
                                      "expirationDate": {
                                        "type": "string",
                                        "format": "date-time",
                                        "description": "Date when the certificate expires (optional)",
                                        "example": "2025-10-01T12:00:00Z"
                                      },
                                      "expiresIn": {
                                        "type": "integer",
                                        "description": "Number of months after which the certificate expires",
                                        "example": 24
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
                                            "json": "id"
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
            "description": "Server error"
          }
        }
      }
    },
    "/api/academy/curricula": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Academy"
        ],
        "operationId": "createAcademyCurricula",
        "summary": "Create a new academy curricula",
        "description": "Creates a new academy curricula with the provided details.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "type": {
                    "description": "Type of the curricula",
                    "x-go-name": "Type",
                    "x-go-type": "ContentType",
                    "x-oapi-codegen-extra-tags": {
                      "json": "type"
                    },
                    "type": "string",
                    "enum": [
                      "learning-path",
                      "challenge",
                      "certification"
                    ]
                  },
                  "title": {
                    "type": "string",
                    "description": "Title of the curricula",
                    "example": "Introduction to Kubernetes",
                    "x-go-name": "Title",
                    "x-oapi-codegen-extra-tags": {
                      "json": "title"
                    }
                  },
                  "orgId": {
                    "type": "string",
                    "description": "Organization ID that owns this learning path",
                    "example": "layer5",
                    "x-oapi-codegen-extra-tags": {
                      "db": "org_id",
                      "json": "org_id"
                    }
                  },
                  "workspace_id": {
                    "allOf": [
                      {
                        "type": "string",
                        "format": "uuid",
                        "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        }
                      }
                    ],
                    "description": "ID of the workspace to which this Curricula belongs",
                    "x-oapi-codegen-extra-tags": {
                      "db": "workspace_id",
                      "json": "workspace_id"
                    }
                  },
                  "badge_id": {
                    "type": "string",
                    "format": "uuid",
                    "description": "ID of the badge to be awarded on completion of this curricula",
                    "x-go-type": "core.Uuid",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    },
                    "x-oapi-codegen-extra-tags": {
                      "db": "badge_id",
                      "json": "badge_id"
                    }
                  },
                  "team_id": {
                    "type": "string",
                    "format": "uuid",
                    "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    },
                    "x-go-name": "TeamId",
                    "x-oapi-codegen-extra-tags": {
                      "json": "team_id",
                      "db": "team_id"
                    }
                  },
                  "access_expires_at": {
                    "allOf": [
                      {
                        "type": "string",
                        "format": "date-time",
                        "x-go-type-skip-optional-pointer": true
                      }
                    ],
                    "description": "Expiry time for curricula access",
                    "x-go-type": "*time.Time",
                    "x-oapi-codegen-extra-tags": {
                      "json": "access_expires_at",
                      "db": "access_expires_at"
                    }
                  },
                  "access_status": {
                    "description": "Current access status of the curricula",
                    "x-go-name": "AccessStatus",
                    "x-go-type": "invitationv1beta1.InvitationStatus",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/v1beta1/invitation",
                      "name": "invitationv1beta1"
                    },
                    "x-oapi-codegen-extra-tags": {
                      "json": "access_status",
                      "db": "access_status"
                    },
                    "type": "string",
                    "enum": [
                      "enabled",
                      "disabled"
                    ]
                  },
                  "metadata": {
                    "type": "object",
                    "description": "Additional metadata about the Curricula",
                    "additionalProperties": true,
                    "x-go-type": "core.Map",
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "db": "metadata",
                      "json": "metadata"
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
                            "description": "Short description of the curricula",
                            "example": "Learn how to configure your Kubernetes clusters and manage the lifecycle of your workloads"
                          },
                          "detailedDescription": {
                            "type": "string",
                            "description": "Detailed description of the curricula",
                            "example": "This learning path covers everything from Kubernetes architecture to advanced deployment strategies, including hands-on labs and real-world scenarios."
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
                          "certificate": {
                            "x-go-type": "Certificate",
                            "type": "object",
                            "required": [
                              "id",
                              "orgId",
                              "title",
                              "description",
                              "issuingAuthorities",
                              "issuedDate",
                              "recipientId",
                              "recipientName"
                            ],
                            "properties": {
                              "id": {
                                "type": "string",
                                "description": "Unique identifier for the certificate",
                                "example": "1234567890abcdef",
                                "x-go-name": "ID"
                              },
                              "orgId": {
                                "type": "string",
                                "format": "uuid",
                                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                }
                              },
                              "recipientId": {
                                "type": "string",
                                "description": "ID of the recipient (user) who received the certificate",
                                "example": "1234567890abcdef"
                              },
                              "recipientName": {
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
                              "issuingAuthorities": {
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
                                    "signatureUrl": {
                                      "type": "string",
                                      "format": "uri",
                                      "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                                      "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                                    }
                                  }
                                },
                                "description": "List of issuing authorities for the certificate"
                              },
                              "issuedDate": {
                                "type": "string",
                                "format": "date-time",
                                "description": "Date when the certificate was issued",
                                "example": "2023-10-01T12:00:00Z"
                              },
                              "expirationDate": {
                                "type": "string",
                                "format": "date-time",
                                "description": "Date when the certificate expires (optional)",
                                "example": "2025-10-01T12:00:00Z"
                              },
                              "expiresIn": {
                                "type": "integer",
                                "description": "Number of months after which the certificate expires",
                                "example": 24
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
                                    "json": "id"
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
                  "type",
                  "title",
                  "orgId",
                  "workspace_id",
                  "team_id",
                  "access_status",
                  "metadata"
                ]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "created the curricula",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "description": "Id of the Curricula",
                      "example": "923458-3490394-934893",
                      "x-go-name": "ID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id",
                        "json": "id"
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
                        "json": "org_id"
                      }
                    },
                    "visibility": {
                      "description": "Visibility of the Curricula",
                      "x-go-type": "Visibility",
                      "x-oapi-codegen-extra-tags": {
                        "db": "visibility",
                        "json": "visibility"
                      },
                      "type": "string",
                      "enum": [
                        "public",
                        "private"
                      ]
                    },
                    "status": {
                      "example": "ready",
                      "description": "Status of the Curricula",
                      "x-go-type": "Status",
                      "x-oapi-codegen-extra-tags": {
                        "db": "status",
                        "json": "status"
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
                      "description": "slug of the Curricula",
                      "example": "intro-kubernetes-course"
                    },
                    "level": {
                      "description": "Level of the Curricula",
                      "x-go-type": "Level",
                      "x-oapi-codegen-extra-tags": {
                        "db": "level",
                        "json": "level"
                      },
                      "type": "string",
                      "enum": [
                        "beginner",
                        "intermediate",
                        "advanced"
                      ]
                    },
                    "badge_id": {
                      "type": "string",
                      "format": "uuid",
                      "description": "ID of the badge to be awarded on completion of this curricula",
                      "x-go-type": "core.Uuid",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "badge_id",
                        "json": "badge_id"
                      }
                    },
                    "inviteId": {
                      "allOf": [
                        {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          }
                        }
                      ],
                      "description": "ID of the invite associated with this Curricula",
                      "x-oapi-codegen-extra-tags": {
                        "db": "invite_id",
                        "json": "invite_id"
                      }
                    },
                    "workspace_id": {
                      "allOf": [
                        {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          }
                        }
                      ],
                      "description": "ID of the workspace to which this Curricula belongs",
                      "x-oapi-codegen-extra-tags": {
                        "db": "workspace_id",
                        "json": "workspace_id"
                      }
                    },
                    "createdAt": {
                      "allOf": [
                        {
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        }
                      ],
                      "description": "When the Curricula item was created",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "created_at"
                      }
                    },
                    "updatedAt": {
                      "allOf": [
                        {
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        }
                      ],
                      "description": "When the Curricula was last updated",
                      "x-go-type": "core.Time",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updated_at"
                      }
                    },
                    "deletedAt": {
                      "allOf": [
                        {
                          "description": "Timestamp when the resource was deleted.",
                          "x-go-type": "NullTime",
                          "type": "string",
                          "format": "date-time",
                          "x-go-name": "DeletedAt",
                          "x-oapi-codegen-extra-tags": {
                            "db": "deleted_at",
                            "yaml": "deleted_at"
                          },
                          "x-go-type-skip-optional-pointer": true
                        }
                      ],
                      "x-go-type": "core.NullTime",
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deleted_at"
                      }
                    },
                    "metadata": {
                      "type": "object",
                      "description": "Additional metadata about the Curricula",
                      "additionalProperties": true,
                      "x-go-type": "core.Map",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata",
                        "json": "metadata"
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
                              "description": "Short description of the curricula",
                              "example": "Learn how to configure your Kubernetes clusters and manage the lifecycle of your workloads"
                            },
                            "detailedDescription": {
                              "type": "string",
                              "description": "Detailed description of the curricula",
                              "example": "This learning path covers everything from Kubernetes architecture to advanced deployment strategies, including hands-on labs and real-world scenarios."
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
                            "certificate": {
                              "x-go-type": "Certificate",
                              "type": "object",
                              "required": [
                                "id",
                                "orgId",
                                "title",
                                "description",
                                "issuingAuthorities",
                                "issuedDate",
                                "recipientId",
                                "recipientName"
                              ],
                              "properties": {
                                "id": {
                                  "type": "string",
                                  "description": "Unique identifier for the certificate",
                                  "example": "1234567890abcdef",
                                  "x-go-name": "ID"
                                },
                                "orgId": {
                                  "type": "string",
                                  "format": "uuid",
                                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                  "x-go-type": "uuid.UUID",
                                  "x-go-type-import": {
                                    "path": "github.com/gofrs/uuid"
                                  }
                                },
                                "recipientId": {
                                  "type": "string",
                                  "description": "ID of the recipient (user) who received the certificate",
                                  "example": "1234567890abcdef"
                                },
                                "recipientName": {
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
                                "issuingAuthorities": {
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
                                      "signatureUrl": {
                                        "type": "string",
                                        "format": "uri",
                                        "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                                        "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                                      }
                                    }
                                  },
                                  "description": "List of issuing authorities for the certificate"
                                },
                                "issuedDate": {
                                  "type": "string",
                                  "format": "date-time",
                                  "description": "Date when the certificate was issued",
                                  "example": "2023-10-01T12:00:00Z"
                                },
                                "expirationDate": {
                                  "type": "string",
                                  "format": "date-time",
                                  "description": "Date when the certificate expires (optional)",
                                  "example": "2025-10-01T12:00:00Z"
                                },
                                "expiresIn": {
                                  "type": "integer",
                                  "description": "Number of months after which the certificate expires",
                                  "example": 24
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
                                      "json": "id"
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
            "description": "Server error"
          }
        }
      }
    },
    "/api/academy/Curricula": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Academy"
        ],
        "operationId": "getAcademyCurricula",
        "summary": "Get academy content",
        "description": "Returns a list of academy content with optional filtering.",
        "parameters": [
          {
            "name": "contentType",
            "in": "query",
            "description": "Filter content by content types",
            "required": false,
            "style": "form",
            "explode": true,
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          {
            "name": "visibility",
            "in": "query",
            "description": "Filter content by visibility (public/private)",
            "required": false,
            "style": "form",
            "explode": true,
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          {
            "name": "level",
            "in": "query",
            "description": "Filter content by difficulty level",
            "required": false,
            "style": "form",
            "explode": true,
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          {
            "name": "orgId",
            "in": "query",
            "description": "Filter content by organization IDs",
            "required": false,
            "style": "form",
            "explode": true,
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          {
            "name": "category",
            "in": "query",
            "description": "Filter content by categories",
            "required": false,
            "style": "form",
            "explode": true,
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          {
            "name": "status",
            "in": "query",
            "description": "Filter by registration status",
            "required": false,
            "style": "form",
            "explode": true,
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
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
          },
          {
            "name": "sort",
            "in": "query",
            "description": "Sort results by a specific field (e.g., title, createdAt)",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "order",
            "in": "query",
            "description": "Order of sorting (asc or desc)",
            "required": false,
            "schema": {
              "type": "string",
              "enum": [
                "asc",
                "desc"
              ]
            }
          },
          {
            "name": "pagesize",
            "in": "query",
            "description": "Number of results per page",
            "required": false,
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "page",
            "in": "query",
            "description": "Page number",
            "required": false,
            "schema": {
              "type": "integer"
            }
          }
        ],
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
                      "description": "Total number of Curricula",
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
                                "description": "Id of the Curricula",
                                "example": "923458-3490394-934893",
                                "x-go-name": "ID",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "id",
                                  "json": "id"
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
                                  "json": "org_id"
                                }
                              },
                              "visibility": {
                                "description": "Visibility of the Curricula",
                                "x-go-type": "Visibility",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "visibility",
                                  "json": "visibility"
                                },
                                "type": "string",
                                "enum": [
                                  "public",
                                  "private"
                                ]
                              },
                              "status": {
                                "example": "ready",
                                "description": "Status of the Curricula",
                                "x-go-type": "Status",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "status",
                                  "json": "status"
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
                                "description": "slug of the Curricula",
                                "example": "intro-kubernetes-course"
                              },
                              "level": {
                                "description": "Level of the Curricula",
                                "x-go-type": "Level",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "level",
                                  "json": "level"
                                },
                                "type": "string",
                                "enum": [
                                  "beginner",
                                  "intermediate",
                                  "advanced"
                                ]
                              },
                              "badge_id": {
                                "type": "string",
                                "format": "uuid",
                                "description": "ID of the badge to be awarded on completion of this curricula",
                                "x-go-type": "core.Uuid",
                                "x-go-type-import": {
                                  "path": "github.com/meshery/schemas/models/core",
                                  "name": "core"
                                },
                                "x-oapi-codegen-extra-tags": {
                                  "db": "badge_id",
                                  "json": "badge_id"
                                }
                              },
                              "inviteId": {
                                "allOf": [
                                  {
                                    "type": "string",
                                    "format": "uuid",
                                    "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                    "x-go-type": "uuid.UUID",
                                    "x-go-type-import": {
                                      "path": "github.com/gofrs/uuid"
                                    }
                                  }
                                ],
                                "description": "ID of the invite associated with this Curricula",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "invite_id",
                                  "json": "invite_id"
                                }
                              },
                              "workspace_id": {
                                "allOf": [
                                  {
                                    "type": "string",
                                    "format": "uuid",
                                    "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                    "x-go-type": "uuid.UUID",
                                    "x-go-type-import": {
                                      "path": "github.com/gofrs/uuid"
                                    }
                                  }
                                ],
                                "description": "ID of the workspace to which this Curricula belongs",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "workspace_id",
                                  "json": "workspace_id"
                                }
                              },
                              "createdAt": {
                                "allOf": [
                                  {
                                    "type": "string",
                                    "format": "date-time",
                                    "x-go-type-skip-optional-pointer": true
                                  }
                                ],
                                "description": "When the Curricula item was created",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "created_at",
                                  "json": "created_at"
                                }
                              },
                              "updatedAt": {
                                "allOf": [
                                  {
                                    "type": "string",
                                    "format": "date-time",
                                    "x-go-type-skip-optional-pointer": true
                                  }
                                ],
                                "description": "When the Curricula was last updated",
                                "x-go-type": "core.Time",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "updated_at",
                                  "json": "updated_at"
                                }
                              },
                              "deletedAt": {
                                "allOf": [
                                  {
                                    "description": "Timestamp when the resource was deleted.",
                                    "x-go-type": "NullTime",
                                    "type": "string",
                                    "format": "date-time",
                                    "x-go-name": "DeletedAt",
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "deleted_at",
                                      "yaml": "deleted_at"
                                    },
                                    "x-go-type-skip-optional-pointer": true
                                  }
                                ],
                                "x-go-type": "core.NullTime",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "deleted_at",
                                  "json": "deleted_at"
                                }
                              },
                              "metadata": {
                                "type": "object",
                                "description": "Additional metadata about the Curricula",
                                "additionalProperties": true,
                                "x-go-type": "core.Map",
                                "x-go-type-skip-optional-pointer": true,
                                "x-oapi-codegen-extra-tags": {
                                  "db": "metadata",
                                  "json": "metadata"
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
                                        "description": "Short description of the curricula",
                                        "example": "Learn how to configure your Kubernetes clusters and manage the lifecycle of your workloads"
                                      },
                                      "detailedDescription": {
                                        "type": "string",
                                        "description": "Detailed description of the curricula",
                                        "example": "This learning path covers everything from Kubernetes architecture to advanced deployment strategies, including hands-on labs and real-world scenarios."
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
                                      "certificate": {
                                        "x-go-type": "Certificate",
                                        "type": "object",
                                        "required": [
                                          "id",
                                          "orgId",
                                          "title",
                                          "description",
                                          "issuingAuthorities",
                                          "issuedDate",
                                          "recipientId",
                                          "recipientName"
                                        ],
                                        "properties": {
                                          "id": {
                                            "type": "string",
                                            "description": "Unique identifier for the certificate",
                                            "example": "1234567890abcdef",
                                            "x-go-name": "ID"
                                          },
                                          "orgId": {
                                            "type": "string",
                                            "format": "uuid",
                                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                            "x-go-type": "uuid.UUID",
                                            "x-go-type-import": {
                                              "path": "github.com/gofrs/uuid"
                                            }
                                          },
                                          "recipientId": {
                                            "type": "string",
                                            "description": "ID of the recipient (user) who received the certificate",
                                            "example": "1234567890abcdef"
                                          },
                                          "recipientName": {
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
                                          "issuingAuthorities": {
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
                                                "signatureUrl": {
                                                  "type": "string",
                                                  "format": "uri",
                                                  "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                                                  "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                                                }
                                              }
                                            },
                                            "description": "List of issuing authorities for the certificate"
                                          },
                                          "issuedDate": {
                                            "type": "string",
                                            "format": "date-time",
                                            "description": "Date when the certificate was issued",
                                            "example": "2023-10-01T12:00:00Z"
                                          },
                                          "expirationDate": {
                                            "type": "string",
                                            "format": "date-time",
                                            "description": "Date when the certificate expires (optional)",
                                            "example": "2025-10-01T12:00:00Z"
                                          },
                                          "expiresIn": {
                                            "type": "integer",
                                            "description": "Number of months after which the certificate expires",
                                            "example": 24
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
                                                "json": "id"
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
                              "registration_count"
                            ],
                            "properties": {
                              "registration_count": {
                                "type": "number",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "registration_count,omitempty",
                                  "json": "registration_count,omitempty"
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
            "description": "Server error"
          }
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
                      "description": "Id of the Curricula",
                      "example": "923458-3490394-934893",
                      "x-go-name": "ID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id",
                        "json": "id"
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
                        "json": "org_id"
                      }
                    },
                    "visibility": {
                      "description": "Visibility of the Curricula",
                      "x-go-type": "Visibility",
                      "x-oapi-codegen-extra-tags": {
                        "db": "visibility",
                        "json": "visibility"
                      },
                      "type": "string",
                      "enum": [
                        "public",
                        "private"
                      ]
                    },
                    "status": {
                      "example": "ready",
                      "description": "Status of the Curricula",
                      "x-go-type": "Status",
                      "x-oapi-codegen-extra-tags": {
                        "db": "status",
                        "json": "status"
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
                      "description": "slug of the Curricula",
                      "example": "intro-kubernetes-course"
                    },
                    "level": {
                      "description": "Level of the Curricula",
                      "x-go-type": "Level",
                      "x-oapi-codegen-extra-tags": {
                        "db": "level",
                        "json": "level"
                      },
                      "type": "string",
                      "enum": [
                        "beginner",
                        "intermediate",
                        "advanced"
                      ]
                    },
                    "badge_id": {
                      "type": "string",
                      "format": "uuid",
                      "description": "ID of the badge to be awarded on completion of this curricula",
                      "x-go-type": "core.Uuid",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "badge_id",
                        "json": "badge_id"
                      }
                    },
                    "inviteId": {
                      "allOf": [
                        {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          }
                        }
                      ],
                      "description": "ID of the invite associated with this Curricula",
                      "x-oapi-codegen-extra-tags": {
                        "db": "invite_id",
                        "json": "invite_id"
                      }
                    },
                    "workspace_id": {
                      "allOf": [
                        {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          }
                        }
                      ],
                      "description": "ID of the workspace to which this Curricula belongs",
                      "x-oapi-codegen-extra-tags": {
                        "db": "workspace_id",
                        "json": "workspace_id"
                      }
                    },
                    "createdAt": {
                      "allOf": [
                        {
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        }
                      ],
                      "description": "When the Curricula item was created",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "created_at"
                      }
                    },
                    "updatedAt": {
                      "allOf": [
                        {
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        }
                      ],
                      "description": "When the Curricula was last updated",
                      "x-go-type": "core.Time",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updated_at"
                      }
                    },
                    "deletedAt": {
                      "allOf": [
                        {
                          "description": "Timestamp when the resource was deleted.",
                          "x-go-type": "NullTime",
                          "type": "string",
                          "format": "date-time",
                          "x-go-name": "DeletedAt",
                          "x-oapi-codegen-extra-tags": {
                            "db": "deleted_at",
                            "yaml": "deleted_at"
                          },
                          "x-go-type-skip-optional-pointer": true
                        }
                      ],
                      "x-go-type": "core.NullTime",
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deleted_at"
                      }
                    },
                    "metadata": {
                      "type": "object",
                      "description": "Additional metadata about the Curricula",
                      "additionalProperties": true,
                      "x-go-type": "core.Map",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata",
                        "json": "metadata"
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
                              "description": "Short description of the curricula",
                              "example": "Learn how to configure your Kubernetes clusters and manage the lifecycle of your workloads"
                            },
                            "detailedDescription": {
                              "type": "string",
                              "description": "Detailed description of the curricula",
                              "example": "This learning path covers everything from Kubernetes architecture to advanced deployment strategies, including hands-on labs and real-world scenarios."
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
                            "certificate": {
                              "x-go-type": "Certificate",
                              "type": "object",
                              "required": [
                                "id",
                                "orgId",
                                "title",
                                "description",
                                "issuingAuthorities",
                                "issuedDate",
                                "recipientId",
                                "recipientName"
                              ],
                              "properties": {
                                "id": {
                                  "type": "string",
                                  "description": "Unique identifier for the certificate",
                                  "example": "1234567890abcdef",
                                  "x-go-name": "ID"
                                },
                                "orgId": {
                                  "type": "string",
                                  "format": "uuid",
                                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                  "x-go-type": "uuid.UUID",
                                  "x-go-type-import": {
                                    "path": "github.com/gofrs/uuid"
                                  }
                                },
                                "recipientId": {
                                  "type": "string",
                                  "description": "ID of the recipient (user) who received the certificate",
                                  "example": "1234567890abcdef"
                                },
                                "recipientName": {
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
                                "issuingAuthorities": {
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
                                      "signatureUrl": {
                                        "type": "string",
                                        "format": "uri",
                                        "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                                        "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                                      }
                                    }
                                  },
                                  "description": "List of issuing authorities for the certificate"
                                },
                                "issuedDate": {
                                  "type": "string",
                                  "format": "date-time",
                                  "description": "Date when the certificate was issued",
                                  "example": "2023-10-01T12:00:00Z"
                                },
                                "expirationDate": {
                                  "type": "string",
                                  "format": "date-time",
                                  "description": "Date when the certificate expires (optional)",
                                  "example": "2025-10-01T12:00:00Z"
                                },
                                "expiresIn": {
                                  "type": "integer",
                                  "description": "Number of months after which the certificate expires",
                                  "example": 24
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
                                      "json": "id"
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
                  "contentId",
                  "user_id"
                ],
                "properties": {
                  "contentId": {
                    "type": "string",
                    "description": "ID of the academy content to register for"
                  },
                  "contentType": {
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
          "201": {
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
                    "test_submissions",
                    "metadata"
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
                      "x-go-name": "ID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id",
                        "json": "id"
                      }
                    },
                    "org_id": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "org_id"
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
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "user_id"
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
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "When the registration was updated",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      }
                    },
                    "created_at": {
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "When the registration was created",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      }
                    },
                    "deleted_at": {
                      "description": "Timestamp when the resource was deleted.",
                      "x-go-type": "NullTime",
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
                      "x-go-type-skip-optional-pointer": true,
                      "description": "Issued certificate for completing the curricula under registration",
                      "x-oapi-codegen-extra-tags": {
                        "db": "certificate"
                      },
                      "type": "object",
                      "required": [
                        "id",
                        "orgId",
                        "title",
                        "description",
                        "issuingAuthorities",
                        "issuedDate",
                        "recipientId",
                        "recipientName"
                      ],
                      "properties": {
                        "id": {
                          "type": "string",
                          "description": "Unique identifier for the certificate",
                          "example": "1234567890abcdef",
                          "x-go-name": "ID"
                        },
                        "orgId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          }
                        },
                        "recipientId": {
                          "type": "string",
                          "description": "ID of the recipient (user) who received the certificate",
                          "example": "1234567890abcdef"
                        },
                        "recipientName": {
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
                        "issuingAuthorities": {
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
                              "signatureUrl": {
                                "type": "string",
                                "format": "uri",
                                "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                                "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                              }
                            }
                          },
                          "description": "List of issuing authorities for the certificate"
                        },
                        "issuedDate": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Date when the certificate was issued",
                          "example": "2023-10-01T12:00:00Z"
                        },
                        "expirationDate": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Date when the certificate expires (optional)",
                          "example": "2025-10-01T12:00:00Z"
                        },
                        "expiresIn": {
                          "type": "integer",
                          "description": "Number of months after which the certificate expires",
                          "example": 24
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
            "description": "Server error"
          }
        }
      }
    },
    "/api/academy/curricula/registrations/{id}/withdraw": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Academy"
        ],
        "summary": "Withdraw a user from academy content",
        "operationId": "withdrawFromAcademyContent",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "description": "The ID of the curricula",
            "schema": {
              "type": "string"
            }
          }
        ],
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
                    "test_submissions",
                    "metadata"
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
                      "x-go-name": "ID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id",
                        "json": "id"
                      }
                    },
                    "org_id": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "org_id"
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
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "user_id"
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
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "When the registration was updated",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      }
                    },
                    "created_at": {
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "When the registration was created",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      }
                    },
                    "deleted_at": {
                      "description": "Timestamp when the resource was deleted.",
                      "x-go-type": "NullTime",
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
                      "x-go-type-skip-optional-pointer": true,
                      "description": "Issued certificate for completing the curricula under registration",
                      "x-oapi-codegen-extra-tags": {
                        "db": "certificate"
                      },
                      "type": "object",
                      "required": [
                        "id",
                        "orgId",
                        "title",
                        "description",
                        "issuingAuthorities",
                        "issuedDate",
                        "recipientId",
                        "recipientName"
                      ],
                      "properties": {
                        "id": {
                          "type": "string",
                          "description": "Unique identifier for the certificate",
                          "example": "1234567890abcdef",
                          "x-go-name": "ID"
                        },
                        "orgId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          }
                        },
                        "recipientId": {
                          "type": "string",
                          "description": "ID of the recipient (user) who received the certificate",
                          "example": "1234567890abcdef"
                        },
                        "recipientName": {
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
                        "issuingAuthorities": {
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
                              "signatureUrl": {
                                "type": "string",
                                "format": "uri",
                                "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                                "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                              }
                            }
                          },
                          "description": "List of issuing authorities for the certificate"
                        },
                        "issuedDate": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Date when the certificate was issued",
                          "example": "2023-10-01T12:00:00Z"
                        },
                        "expirationDate": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Date when the certificate expires (optional)",
                          "example": "2025-10-01T12:00:00Z"
                        },
                        "expiresIn": {
                          "type": "integer",
                          "description": "Number of months after which the certificate expires",
                          "example": 24
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
            "description": "Server error"
          }
        }
      }
    },
    "/api/academy/curricula/{id}": {
      "put": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Academy"
        ],
        "operationId": "updateAcademyCurriculaById",
        "summary": "Update an existing academy curricula by ID",
        "description": "Updates the details of an existing academy curricula identified by its ID.",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "description": "The ID of the curricula",
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "type": {
                    "description": "Type of the curricula",
                    "x-go-name": "Type",
                    "x-go-type": "ContentType",
                    "x-oapi-codegen-extra-tags": {
                      "json": "type"
                    },
                    "type": "string",
                    "enum": [
                      "learning-path",
                      "challenge",
                      "certification"
                    ]
                  },
                  "title": {
                    "type": "string",
                    "description": "Title of the curricula",
                    "example": "Introduction to Kubernetes",
                    "x-go-name": "Title",
                    "x-oapi-codegen-extra-tags": {
                      "json": "title"
                    }
                  },
                  "orgId": {
                    "type": "string",
                    "description": "Organization ID that owns this learning path",
                    "example": "layer5",
                    "x-oapi-codegen-extra-tags": {
                      "db": "org_id",
                      "json": "org_id"
                    }
                  },
                  "workspace_id": {
                    "allOf": [
                      {
                        "type": "string",
                        "format": "uuid",
                        "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        }
                      }
                    ],
                    "description": "ID of the workspace to which this Curricula belongs",
                    "x-oapi-codegen-extra-tags": {
                      "db": "workspace_id",
                      "json": "workspace_id"
                    }
                  },
                  "badge_id": {
                    "type": "string",
                    "format": "uuid",
                    "description": "ID of the badge to be awarded on completion of this curricula",
                    "x-go-type": "core.Uuid",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    },
                    "x-oapi-codegen-extra-tags": {
                      "db": "badge_id",
                      "json": "badge_id"
                    }
                  },
                  "team_id": {
                    "type": "string",
                    "format": "uuid",
                    "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    },
                    "x-go-name": "TeamId",
                    "x-oapi-codegen-extra-tags": {
                      "json": "team_id",
                      "db": "team_id"
                    }
                  },
                  "access_expires_at": {
                    "allOf": [
                      {
                        "type": "string",
                        "format": "date-time",
                        "x-go-type-skip-optional-pointer": true
                      }
                    ],
                    "description": "Expiry time for curricula access",
                    "x-go-type": "*time.Time",
                    "x-oapi-codegen-extra-tags": {
                      "json": "access_expires_at",
                      "db": "access_expires_at"
                    }
                  },
                  "access_status": {
                    "description": "Current access status of the curricula",
                    "x-go-name": "AccessStatus",
                    "x-go-type": "invitationv1beta1.InvitationStatus",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/v1beta1/invitation",
                      "name": "invitationv1beta1"
                    },
                    "x-oapi-codegen-extra-tags": {
                      "json": "access_status",
                      "db": "access_status"
                    },
                    "type": "string",
                    "enum": [
                      "enabled",
                      "disabled"
                    ]
                  },
                  "metadata": {
                    "type": "object",
                    "description": "Additional metadata about the Curricula",
                    "additionalProperties": true,
                    "x-go-type": "core.Map",
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "db": "metadata",
                      "json": "metadata"
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
                            "description": "Short description of the curricula",
                            "example": "Learn how to configure your Kubernetes clusters and manage the lifecycle of your workloads"
                          },
                          "detailedDescription": {
                            "type": "string",
                            "description": "Detailed description of the curricula",
                            "example": "This learning path covers everything from Kubernetes architecture to advanced deployment strategies, including hands-on labs and real-world scenarios."
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
                          "certificate": {
                            "x-go-type": "Certificate",
                            "type": "object",
                            "required": [
                              "id",
                              "orgId",
                              "title",
                              "description",
                              "issuingAuthorities",
                              "issuedDate",
                              "recipientId",
                              "recipientName"
                            ],
                            "properties": {
                              "id": {
                                "type": "string",
                                "description": "Unique identifier for the certificate",
                                "example": "1234567890abcdef",
                                "x-go-name": "ID"
                              },
                              "orgId": {
                                "type": "string",
                                "format": "uuid",
                                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                }
                              },
                              "recipientId": {
                                "type": "string",
                                "description": "ID of the recipient (user) who received the certificate",
                                "example": "1234567890abcdef"
                              },
                              "recipientName": {
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
                              "issuingAuthorities": {
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
                                    "signatureUrl": {
                                      "type": "string",
                                      "format": "uri",
                                      "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                                      "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                                    }
                                  }
                                },
                                "description": "List of issuing authorities for the certificate"
                              },
                              "issuedDate": {
                                "type": "string",
                                "format": "date-time",
                                "description": "Date when the certificate was issued",
                                "example": "2023-10-01T12:00:00Z"
                              },
                              "expirationDate": {
                                "type": "string",
                                "format": "date-time",
                                "description": "Date when the certificate expires (optional)",
                                "example": "2025-10-01T12:00:00Z"
                              },
                              "expiresIn": {
                                "type": "integer",
                                "description": "Number of months after which the certificate expires",
                                "example": 24
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
                                    "json": "id"
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
                  "type",
                  "title",
                  "orgId",
                  "workspace_id",
                  "team_id",
                  "access_status",
                  "metadata"
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "updated the curricula",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "allOf": [
                    {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "string",
                          "description": "Id of the Curricula",
                          "example": "923458-3490394-934893",
                          "x-go-name": "ID",
                          "x-oapi-codegen-extra-tags": {
                            "db": "id",
                            "json": "id"
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
                            "json": "org_id"
                          }
                        },
                        "visibility": {
                          "description": "Visibility of the Curricula",
                          "x-go-type": "Visibility",
                          "x-oapi-codegen-extra-tags": {
                            "db": "visibility",
                            "json": "visibility"
                          },
                          "type": "string",
                          "enum": [
                            "public",
                            "private"
                          ]
                        },
                        "status": {
                          "example": "ready",
                          "description": "Status of the Curricula",
                          "x-go-type": "Status",
                          "x-oapi-codegen-extra-tags": {
                            "db": "status",
                            "json": "status"
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
                          "description": "slug of the Curricula",
                          "example": "intro-kubernetes-course"
                        },
                        "level": {
                          "description": "Level of the Curricula",
                          "x-go-type": "Level",
                          "x-oapi-codegen-extra-tags": {
                            "db": "level",
                            "json": "level"
                          },
                          "type": "string",
                          "enum": [
                            "beginner",
                            "intermediate",
                            "advanced"
                          ]
                        },
                        "badge_id": {
                          "type": "string",
                          "format": "uuid",
                          "description": "ID of the badge to be awarded on completion of this curricula",
                          "x-go-type": "core.Uuid",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "badge_id",
                            "json": "badge_id"
                          }
                        },
                        "inviteId": {
                          "allOf": [
                            {
                              "type": "string",
                              "format": "uuid",
                              "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                              "x-go-type": "uuid.UUID",
                              "x-go-type-import": {
                                "path": "github.com/gofrs/uuid"
                              }
                            }
                          ],
                          "description": "ID of the invite associated with this Curricula",
                          "x-oapi-codegen-extra-tags": {
                            "db": "invite_id",
                            "json": "invite_id"
                          }
                        },
                        "workspace_id": {
                          "allOf": [
                            {
                              "type": "string",
                              "format": "uuid",
                              "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                              "x-go-type": "uuid.UUID",
                              "x-go-type-import": {
                                "path": "github.com/gofrs/uuid"
                              }
                            }
                          ],
                          "description": "ID of the workspace to which this Curricula belongs",
                          "x-oapi-codegen-extra-tags": {
                            "db": "workspace_id",
                            "json": "workspace_id"
                          }
                        },
                        "createdAt": {
                          "allOf": [
                            {
                              "type": "string",
                              "format": "date-time",
                              "x-go-type-skip-optional-pointer": true
                            }
                          ],
                          "description": "When the Curricula item was created",
                          "x-oapi-codegen-extra-tags": {
                            "db": "created_at",
                            "json": "created_at"
                          }
                        },
                        "updatedAt": {
                          "allOf": [
                            {
                              "type": "string",
                              "format": "date-time",
                              "x-go-type-skip-optional-pointer": true
                            }
                          ],
                          "description": "When the Curricula was last updated",
                          "x-go-type": "core.Time",
                          "x-oapi-codegen-extra-tags": {
                            "db": "updated_at",
                            "json": "updated_at"
                          }
                        },
                        "deletedAt": {
                          "allOf": [
                            {
                              "description": "Timestamp when the resource was deleted.",
                              "x-go-type": "NullTime",
                              "type": "string",
                              "format": "date-time",
                              "x-go-name": "DeletedAt",
                              "x-oapi-codegen-extra-tags": {
                                "db": "deleted_at",
                                "yaml": "deleted_at"
                              },
                              "x-go-type-skip-optional-pointer": true
                            }
                          ],
                          "x-go-type": "core.NullTime",
                          "x-oapi-codegen-extra-tags": {
                            "db": "deleted_at",
                            "json": "deleted_at"
                          }
                        },
                        "metadata": {
                          "type": "object",
                          "description": "Additional metadata about the Curricula",
                          "additionalProperties": true,
                          "x-go-type": "core.Map",
                          "x-go-type-skip-optional-pointer": true,
                          "x-oapi-codegen-extra-tags": {
                            "db": "metadata",
                            "json": "metadata"
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
                                  "description": "Short description of the curricula",
                                  "example": "Learn how to configure your Kubernetes clusters and manage the lifecycle of your workloads"
                                },
                                "detailedDescription": {
                                  "type": "string",
                                  "description": "Detailed description of the curricula",
                                  "example": "This learning path covers everything from Kubernetes architecture to advanced deployment strategies, including hands-on labs and real-world scenarios."
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
                                "certificate": {
                                  "x-go-type": "Certificate",
                                  "type": "object",
                                  "required": [
                                    "id",
                                    "orgId",
                                    "title",
                                    "description",
                                    "issuingAuthorities",
                                    "issuedDate",
                                    "recipientId",
                                    "recipientName"
                                  ],
                                  "properties": {
                                    "id": {
                                      "type": "string",
                                      "description": "Unique identifier for the certificate",
                                      "example": "1234567890abcdef",
                                      "x-go-name": "ID"
                                    },
                                    "orgId": {
                                      "type": "string",
                                      "format": "uuid",
                                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                      "x-go-type": "uuid.UUID",
                                      "x-go-type-import": {
                                        "path": "github.com/gofrs/uuid"
                                      }
                                    },
                                    "recipientId": {
                                      "type": "string",
                                      "description": "ID of the recipient (user) who received the certificate",
                                      "example": "1234567890abcdef"
                                    },
                                    "recipientName": {
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
                                    "issuingAuthorities": {
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
                                          "signatureUrl": {
                                            "type": "string",
                                            "format": "uri",
                                            "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                                            "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                                          }
                                        }
                                      },
                                      "description": "List of issuing authorities for the certificate"
                                    },
                                    "issuedDate": {
                                      "type": "string",
                                      "format": "date-time",
                                      "description": "Date when the certificate was issued",
                                      "example": "2023-10-01T12:00:00Z"
                                    },
                                    "expirationDate": {
                                      "type": "string",
                                      "format": "date-time",
                                      "description": "Date when the certificate expires (optional)",
                                      "example": "2025-10-01T12:00:00Z"
                                    },
                                    "expiresIn": {
                                      "type": "integer",
                                      "description": "Number of months after which the certificate expires",
                                      "example": 24
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
                                          "json": "id"
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
                        "registration_count"
                      ],
                      "properties": {
                        "registration_count": {
                          "type": "number",
                          "x-oapi-codegen-extra-tags": {
                            "db": "registration_count,omitempty",
                            "json": "registration_count,omitempty"
                          }
                        },
                        "invitation": {
                          "x-go-type": "invitationv1beta1.Invitation",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/v1beta1/invitation",
                            "name": "invitationv1beta1"
                          },
                          "type": "object",
                          "required": [
                            "id",
                            "owner_id",
                            "name",
                            "description",
                            "org_id",
                            "accepted_by",
                            "emails",
                            "roles",
                            "teams",
                            "status",
                            "created_at",
                            "updated_at",
                            "deleted_at"
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
                              "x-go-name": "ID"
                            },
                            "owner_id": {
                              "type": "string",
                              "format": "uuid",
                              "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                              "x-go-type": "uuid.UUID",
                              "x-go-type-import": {
                                "path": "github.com/gofrs/uuid"
                              },
                              "x-oapi-codegen-extra-tags": {
                                "db": "owner_id",
                                "json": "owner_id"
                              }
                            },
                            "is_default": {
                              "type": "boolean",
                              "description": "Indicates whether the invitation is a default invitation (open invite), which can be used to assign users when signing up from fqdn or custom domain, a organization can only have one default invitation",
                              "x-oapi-codegen-extra-tags": {
                                "db": "is_default",
                                "json": "is_default"
                              }
                            },
                            "name": {
                              "type": "string",
                              "description": "Name of the invitation, which can be used to identify the invitation, required and cant be empty string,"
                            },
                            "description": {
                              "type": "string",
                              "description": "Description of the invitation, which can be used to provide additional information about the invitation, null or empty string means the invitation does not have a description"
                            },
                            "emails": {
                              "type": "array",
                              "x-go-type": "pq.StringArray",
                              "x-go-type-import": {
                                "path": "github.com/lib/pq"
                              },
                              "items": {
                                "type": "string",
                                "pattern": "^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,}|@[a-zA-Z0-9.-]+\\.[a-z]{2,})$",
                                "x-go-type": "string",
                                "description": "Exact email address or the email address pattern for which the invitation is valid , null means the invitation is valid for all email addresses"
                              }
                            },
                            "org_id": {
                              "type": "string",
                              "description": "ID of the organization to which the user is invited",
                              "x-oapi-codegen-extra-tags": {
                                "db": "org_id",
                                "json": "org_id"
                              }
                            },
                            "expires_at": {
                              "type": "string",
                              "format": "date-time",
                              "description": "Timestamp when the invitation expires, if applicable , null or empty string means the invitation does not expire",
                              "x-oapi-codegen-extra-tags": {
                                "db": "expires_at",
                                "json": "expires_at"
                              }
                            },
                            "quota": {
                              "type": "integer",
                              "description": "Quota for the invitation, which can be used to limit the number of users that can accept the invitation, null or empty string means the invitation does not have a quota"
                            },
                            "accepted_by": {
                              "type": "array",
                              "x-go-type": "pq.StringArray",
                              "x-go-type-import": {
                                "path": "github.com/lib/pq"
                              },
                              "items": {
                                "type": "string"
                              },
                              "description": "List of user ids that have already accepted the invitation, null or empty string means the invitation has not been used yet",
                              "x-oapi-codegen-extra-tags": {
                                "db": "accepted_by",
                                "json": "accepted_by"
                              }
                            },
                            "roles": {
                              "type": "array",
                              "x-go-type": "pq.StringArray",
                              "x-go-type-import": {
                                "path": "github.com/lib/pq"
                              },
                              "items": {
                                "type": "string",
                                "description": "Roles that the user will have when accepting the invitation, null or empty string means the invitation does not specify any roles"
                              }
                            },
                            "teams": {
                              "type": "array",
                              "x-go-type": "pq.StringArray",
                              "x-go-type-import": {
                                "path": "github.com/lib/pq"
                              },
                              "items": {
                                "type": "string",
                                "description": "Teams that the user will be added to when accepting the invitation, null or empty string means the invitation does not specify any teams"
                              }
                            },
                            "status": {
                              "type": "string",
                              "x-go-type": "InvitationStatus",
                              "enum": [
                                "enabled",
                                "disabled"
                              ],
                              "description": "Status of the invitation, where enabled means the invitation is active and can be used, disabled means the invitation is no longer valid and is temporarily inactive, disabled invitations can be re-enabled later."
                            },
                            "created_at": {
                              "type": "string",
                              "format": "date-time",
                              "description": "Timestamp when the invitation was created",
                              "x-oapi-codegen-extra-tags": {
                                "db": "created_at",
                                "json": "created_at"
                              }
                            },
                            "updated_at": {
                              "type": "string",
                              "format": "date-time",
                              "description": "Timestamp when the invitation was last updated",
                              "x-oapi-codegen-extra-tags": {
                                "db": "updated_at",
                                "json": "updated_at"
                              }
                            },
                            "deleted_at": {
                              "type": "string",
                              "format": "date-time",
                              "x-go-type": "core.NullTime",
                              "description": "Timestamp when the invitation was deleted, if applicable",
                              "x-oapi-codegen-extra-tags": {
                                "db": "deleted_at",
                                "json": "deleted_at"
                              }
                            }
                          }
                        }
                      }
                    }
                  ]
                }
              }
            }
          },
          "400": {
            "description": "Invalid request parameters"
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
            "description": "Curricula not found"
          },
          "500": {
            "description": "Server error"
          }
        }
      },
      "delete": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Academy"
        ],
        "operationId": "deleteAcademyCurriculaById",
        "summary": "Delete an academy curricula by ID",
        "description": "Deletes an existing academy curricula identified by its ID.",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "description": "The ID of the curricula",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Curricula deleted"
          },
          "400": {
            "description": "Invalid request parameters"
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
            "description": "Curricula not found"
          },
          "500": {
            "description": "Server error"
          }
        }
      },
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Academy"
        ],
        "operationId": "getAcademyCurriculaById",
        "summary": "Get a single academy curricula by ID",
        "description": "Returns a single academy curricula identified by its ID.",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "description": "The ID of the curricula",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "A single curricula",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "allOf": [
                    {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "string",
                          "description": "Id of the Curricula",
                          "example": "923458-3490394-934893",
                          "x-go-name": "ID",
                          "x-oapi-codegen-extra-tags": {
                            "db": "id",
                            "json": "id"
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
                            "json": "org_id"
                          }
                        },
                        "visibility": {
                          "description": "Visibility of the Curricula",
                          "x-go-type": "Visibility",
                          "x-oapi-codegen-extra-tags": {
                            "db": "visibility",
                            "json": "visibility"
                          },
                          "type": "string",
                          "enum": [
                            "public",
                            "private"
                          ]
                        },
                        "status": {
                          "example": "ready",
                          "description": "Status of the Curricula",
                          "x-go-type": "Status",
                          "x-oapi-codegen-extra-tags": {
                            "db": "status",
                            "json": "status"
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
                          "description": "slug of the Curricula",
                          "example": "intro-kubernetes-course"
                        },
                        "level": {
                          "description": "Level of the Curricula",
                          "x-go-type": "Level",
                          "x-oapi-codegen-extra-tags": {
                            "db": "level",
                            "json": "level"
                          },
                          "type": "string",
                          "enum": [
                            "beginner",
                            "intermediate",
                            "advanced"
                          ]
                        },
                        "badge_id": {
                          "type": "string",
                          "format": "uuid",
                          "description": "ID of the badge to be awarded on completion of this curricula",
                          "x-go-type": "core.Uuid",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "badge_id",
                            "json": "badge_id"
                          }
                        },
                        "inviteId": {
                          "allOf": [
                            {
                              "type": "string",
                              "format": "uuid",
                              "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                              "x-go-type": "uuid.UUID",
                              "x-go-type-import": {
                                "path": "github.com/gofrs/uuid"
                              }
                            }
                          ],
                          "description": "ID of the invite associated with this Curricula",
                          "x-oapi-codegen-extra-tags": {
                            "db": "invite_id",
                            "json": "invite_id"
                          }
                        },
                        "workspace_id": {
                          "allOf": [
                            {
                              "type": "string",
                              "format": "uuid",
                              "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                              "x-go-type": "uuid.UUID",
                              "x-go-type-import": {
                                "path": "github.com/gofrs/uuid"
                              }
                            }
                          ],
                          "description": "ID of the workspace to which this Curricula belongs",
                          "x-oapi-codegen-extra-tags": {
                            "db": "workspace_id",
                            "json": "workspace_id"
                          }
                        },
                        "createdAt": {
                          "allOf": [
                            {
                              "type": "string",
                              "format": "date-time",
                              "x-go-type-skip-optional-pointer": true
                            }
                          ],
                          "description": "When the Curricula item was created",
                          "x-oapi-codegen-extra-tags": {
                            "db": "created_at",
                            "json": "created_at"
                          }
                        },
                        "updatedAt": {
                          "allOf": [
                            {
                              "type": "string",
                              "format": "date-time",
                              "x-go-type-skip-optional-pointer": true
                            }
                          ],
                          "description": "When the Curricula was last updated",
                          "x-go-type": "core.Time",
                          "x-oapi-codegen-extra-tags": {
                            "db": "updated_at",
                            "json": "updated_at"
                          }
                        },
                        "deletedAt": {
                          "allOf": [
                            {
                              "description": "Timestamp when the resource was deleted.",
                              "x-go-type": "NullTime",
                              "type": "string",
                              "format": "date-time",
                              "x-go-name": "DeletedAt",
                              "x-oapi-codegen-extra-tags": {
                                "db": "deleted_at",
                                "yaml": "deleted_at"
                              },
                              "x-go-type-skip-optional-pointer": true
                            }
                          ],
                          "x-go-type": "core.NullTime",
                          "x-oapi-codegen-extra-tags": {
                            "db": "deleted_at",
                            "json": "deleted_at"
                          }
                        },
                        "metadata": {
                          "type": "object",
                          "description": "Additional metadata about the Curricula",
                          "additionalProperties": true,
                          "x-go-type": "core.Map",
                          "x-go-type-skip-optional-pointer": true,
                          "x-oapi-codegen-extra-tags": {
                            "db": "metadata",
                            "json": "metadata"
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
                                  "description": "Short description of the curricula",
                                  "example": "Learn how to configure your Kubernetes clusters and manage the lifecycle of your workloads"
                                },
                                "detailedDescription": {
                                  "type": "string",
                                  "description": "Detailed description of the curricula",
                                  "example": "This learning path covers everything from Kubernetes architecture to advanced deployment strategies, including hands-on labs and real-world scenarios."
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
                                "certificate": {
                                  "x-go-type": "Certificate",
                                  "type": "object",
                                  "required": [
                                    "id",
                                    "orgId",
                                    "title",
                                    "description",
                                    "issuingAuthorities",
                                    "issuedDate",
                                    "recipientId",
                                    "recipientName"
                                  ],
                                  "properties": {
                                    "id": {
                                      "type": "string",
                                      "description": "Unique identifier for the certificate",
                                      "example": "1234567890abcdef",
                                      "x-go-name": "ID"
                                    },
                                    "orgId": {
                                      "type": "string",
                                      "format": "uuid",
                                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                      "x-go-type": "uuid.UUID",
                                      "x-go-type-import": {
                                        "path": "github.com/gofrs/uuid"
                                      }
                                    },
                                    "recipientId": {
                                      "type": "string",
                                      "description": "ID of the recipient (user) who received the certificate",
                                      "example": "1234567890abcdef"
                                    },
                                    "recipientName": {
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
                                    "issuingAuthorities": {
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
                                          "signatureUrl": {
                                            "type": "string",
                                            "format": "uri",
                                            "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                                            "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                                          }
                                        }
                                      },
                                      "description": "List of issuing authorities for the certificate"
                                    },
                                    "issuedDate": {
                                      "type": "string",
                                      "format": "date-time",
                                      "description": "Date when the certificate was issued",
                                      "example": "2023-10-01T12:00:00Z"
                                    },
                                    "expirationDate": {
                                      "type": "string",
                                      "format": "date-time",
                                      "description": "Date when the certificate expires (optional)",
                                      "example": "2025-10-01T12:00:00Z"
                                    },
                                    "expiresIn": {
                                      "type": "integer",
                                      "description": "Number of months after which the certificate expires",
                                      "example": 24
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
                                          "json": "id"
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
                        "registration_count"
                      ],
                      "properties": {
                        "registration_count": {
                          "type": "number",
                          "x-oapi-codegen-extra-tags": {
                            "db": "registration_count,omitempty",
                            "json": "registration_count,omitempty"
                          }
                        },
                        "invitation": {
                          "x-go-type": "invitationv1beta1.Invitation",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/v1beta1/invitation",
                            "name": "invitationv1beta1"
                          },
                          "type": "object",
                          "required": [
                            "id",
                            "owner_id",
                            "name",
                            "description",
                            "org_id",
                            "accepted_by",
                            "emails",
                            "roles",
                            "teams",
                            "status",
                            "created_at",
                            "updated_at",
                            "deleted_at"
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
                              "x-go-name": "ID"
                            },
                            "owner_id": {
                              "type": "string",
                              "format": "uuid",
                              "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                              "x-go-type": "uuid.UUID",
                              "x-go-type-import": {
                                "path": "github.com/gofrs/uuid"
                              },
                              "x-oapi-codegen-extra-tags": {
                                "db": "owner_id",
                                "json": "owner_id"
                              }
                            },
                            "is_default": {
                              "type": "boolean",
                              "description": "Indicates whether the invitation is a default invitation (open invite), which can be used to assign users when signing up from fqdn or custom domain, a organization can only have one default invitation",
                              "x-oapi-codegen-extra-tags": {
                                "db": "is_default",
                                "json": "is_default"
                              }
                            },
                            "name": {
                              "type": "string",
                              "description": "Name of the invitation, which can be used to identify the invitation, required and cant be empty string,"
                            },
                            "description": {
                              "type": "string",
                              "description": "Description of the invitation, which can be used to provide additional information about the invitation, null or empty string means the invitation does not have a description"
                            },
                            "emails": {
                              "type": "array",
                              "x-go-type": "pq.StringArray",
                              "x-go-type-import": {
                                "path": "github.com/lib/pq"
                              },
                              "items": {
                                "type": "string",
                                "pattern": "^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,}|@[a-zA-Z0-9.-]+\\.[a-z]{2,})$",
                                "x-go-type": "string",
                                "description": "Exact email address or the email address pattern for which the invitation is valid , null means the invitation is valid for all email addresses"
                              }
                            },
                            "org_id": {
                              "type": "string",
                              "description": "ID of the organization to which the user is invited",
                              "x-oapi-codegen-extra-tags": {
                                "db": "org_id",
                                "json": "org_id"
                              }
                            },
                            "expires_at": {
                              "type": "string",
                              "format": "date-time",
                              "description": "Timestamp when the invitation expires, if applicable , null or empty string means the invitation does not expire",
                              "x-oapi-codegen-extra-tags": {
                                "db": "expires_at",
                                "json": "expires_at"
                              }
                            },
                            "quota": {
                              "type": "integer",
                              "description": "Quota for the invitation, which can be used to limit the number of users that can accept the invitation, null or empty string means the invitation does not have a quota"
                            },
                            "accepted_by": {
                              "type": "array",
                              "x-go-type": "pq.StringArray",
                              "x-go-type-import": {
                                "path": "github.com/lib/pq"
                              },
                              "items": {
                                "type": "string"
                              },
                              "description": "List of user ids that have already accepted the invitation, null or empty string means the invitation has not been used yet",
                              "x-oapi-codegen-extra-tags": {
                                "db": "accepted_by",
                                "json": "accepted_by"
                              }
                            },
                            "roles": {
                              "type": "array",
                              "x-go-type": "pq.StringArray",
                              "x-go-type-import": {
                                "path": "github.com/lib/pq"
                              },
                              "items": {
                                "type": "string",
                                "description": "Roles that the user will have when accepting the invitation, null or empty string means the invitation does not specify any roles"
                              }
                            },
                            "teams": {
                              "type": "array",
                              "x-go-type": "pq.StringArray",
                              "x-go-type-import": {
                                "path": "github.com/lib/pq"
                              },
                              "items": {
                                "type": "string",
                                "description": "Teams that the user will be added to when accepting the invitation, null or empty string means the invitation does not specify any teams"
                              }
                            },
                            "status": {
                              "type": "string",
                              "x-go-type": "InvitationStatus",
                              "enum": [
                                "enabled",
                                "disabled"
                              ],
                              "description": "Status of the invitation, where enabled means the invitation is active and can be used, disabled means the invitation is no longer valid and is temporarily inactive, disabled invitations can be re-enabled later."
                            },
                            "created_at": {
                              "type": "string",
                              "format": "date-time",
                              "description": "Timestamp when the invitation was created",
                              "x-oapi-codegen-extra-tags": {
                                "db": "created_at",
                                "json": "created_at"
                              }
                            },
                            "updated_at": {
                              "type": "string",
                              "format": "date-time",
                              "description": "Timestamp when the invitation was last updated",
                              "x-oapi-codegen-extra-tags": {
                                "db": "updated_at",
                                "json": "updated_at"
                              }
                            },
                            "deleted_at": {
                              "type": "string",
                              "format": "date-time",
                              "x-go-type": "core.NullTime",
                              "description": "Timestamp when the invitation was deleted, if applicable",
                              "x-oapi-codegen-extra-tags": {
                                "db": "deleted_at",
                                "json": "deleted_at"
                              }
                            }
                          }
                        }
                      }
                    }
                  ]
                }
              }
            }
          },
          "400": {
            "description": "Invalid request parameters"
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
            "description": "Curricula not found"
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
                    "test_submissions",
                    "metadata"
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
                      "x-go-name": "ID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id",
                        "json": "id"
                      }
                    },
                    "org_id": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "org_id"
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
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "user_id"
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
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "When the registration was updated",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      }
                    },
                    "created_at": {
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "When the registration was created",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      }
                    },
                    "deleted_at": {
                      "description": "Timestamp when the resource was deleted.",
                      "x-go-type": "NullTime",
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
                      "x-go-type-skip-optional-pointer": true,
                      "description": "Issued certificate for completing the curricula under registration",
                      "x-oapi-codegen-extra-tags": {
                        "db": "certificate"
                      },
                      "type": "object",
                      "required": [
                        "id",
                        "orgId",
                        "title",
                        "description",
                        "issuingAuthorities",
                        "issuedDate",
                        "recipientId",
                        "recipientName"
                      ],
                      "properties": {
                        "id": {
                          "type": "string",
                          "description": "Unique identifier for the certificate",
                          "example": "1234567890abcdef",
                          "x-go-name": "ID"
                        },
                        "orgId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          }
                        },
                        "recipientId": {
                          "type": "string",
                          "description": "ID of the recipient (user) who received the certificate",
                          "example": "1234567890abcdef"
                        },
                        "recipientName": {
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
                        "issuingAuthorities": {
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
                              "signatureUrl": {
                                "type": "string",
                                "format": "uri",
                                "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                                "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                              }
                            }
                          },
                          "description": "List of issuing authorities for the certificate"
                        },
                        "issuedDate": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Date when the certificate was issued",
                          "example": "2023-10-01T12:00:00Z"
                        },
                        "expirationDate": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Date when the certificate expires (optional)",
                          "example": "2025-10-01T12:00:00Z"
                        },
                        "expiresIn": {
                          "type": "integer",
                          "description": "Number of months after which the certificate expires",
                          "example": 24
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
                  "contentType": {
                    "type": "string",
                    "enum": [
                      "learning-path",
                      "challenge",
                      "certification"
                    ],
                    "x-go-type": "ContentType"
                  },
                  "itemData": {
                    "x-go-type": "CurriculaCurrentItemData",
                    "type": "object",
                    "required": [
                      "id",
                      "lastOpened",
                      "contentType"
                    ],
                    "properties": {
                      "id": {
                        "type": "string"
                      },
                      "lastOpened": {
                        "type": "string",
                        "format": "date-time"
                      },
                      "contentType": {
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
                  "contentType",
                  "itemData"
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Progress tracker updated",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    },
                    "progressTracker": {
                      "type": "object",
                      "required": [
                        "currentItem",
                        "grades",
                        "timeSpent",
                        "completed",
                        "completedItems"
                      ],
                      "properties": {
                        "currentItem": {
                          "type": "object",
                          "additionalProperties": {
                            "x-go-type": "CurriculaCurrentItemData",
                            "type": "object",
                            "required": [
                              "id",
                              "lastOpened",
                              "contentType"
                            ],
                            "properties": {
                              "id": {
                                "type": "string"
                              },
                              "lastOpened": {
                                "type": "string",
                                "format": "date-time"
                              },
                              "contentType": {
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
                                "x-generate-db-helpers": true,
                                "type": "object",
                                "required": [
                                  "id",
                                  "title",
                                  "org_id",
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
                                  "max_attempts",
                                  "questions",
                                  "total_questions",
                                  "total_questions_in_bank",
                                  "total_question_sets",
                                  "total_marks",
                                  "prerequisites",
                                  "next_page"
                                ],
                                "properties": {
                                  "id": {
                                    "type": "string",
                                    "x-go-name": "ID",
                                    "x-oapi-codegen-extra-tags": {
                                      "json": "id"
                                    }
                                  },
                                  "org_id": {
                                    "type": "string",
                                    "description": "Organization ID that owns this quiz",
                                    "example": "layer5",
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "org_id",
                                      "json": "org_id"
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
                                    "description": "Time limit for the quiz in minutes. A value of 0 indicates no time limit.",
                                    "type": "string"
                                  },
                                  "max_attempts": {
                                    "description": "Maximum number of attempts allowed for the quiz. A value of 0 indicates unlimited attempts.",
                                    "type": "integer"
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
                                        "correctAnswer"
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
                                        "multipleAnswers": {
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
                                              "isCorrect"
                                            ],
                                            "properties": {
                                              "id": {
                                                "type": "string"
                                              },
                                              "text": {
                                                "type": "string"
                                              },
                                              "isCorrect": {
                                                "type": "boolean"
                                              }
                                            }
                                          }
                                        },
                                        "correctAnswer": {
                                          "type": "string"
                                        }
                                      }
                                    }
                                  },
                                  "total_questions": {
                                    "type": "integer"
                                  },
                                  "total_questions_in_bank": {
                                    "type": "integer"
                                  },
                                  "total_question_sets": {
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
                                  },
                                  "next_page": {
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
                        "timeSpent": {
                          "type": "integer",
                          "description": "Total time spent in seconds"
                        },
                        "completedItems": {
                          "type": "object",
                          "description": "Items that have been completed (map of item IDs to item data)",
                          "additionalProperties": {
                            "x-go-type": "ProgressItemCompleted",
                            "type": "object",
                            "required": [
                              "completedAt",
                              "itemData"
                            ],
                            "properties": {
                              "completedAt": {
                                "type": "string",
                                "format": "date-time",
                                "description": "Timestamp when the item was completed"
                              },
                              "itemData": {
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
                    "registrationId": {
                      "type": "string"
                    },
                    "contentType": {
                      "type": "string",
                      "enum": [
                        "learning-path",
                        "challenge",
                        "certification"
                      ]
                    },
                    "itemData": {
                      "type": "object",
                      "required": [
                        "id",
                        "lastOpened",
                        "contentType"
                      ],
                      "properties": {
                        "id": {
                          "type": "string"
                        },
                        "lastOpened": {
                          "type": "string",
                          "format": "date-time"
                        },
                        "contentType": {
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
    "/api/academy/registrations/tests": {
      "get": {
        "tags": [
          "Academy"
        ],
        "x-internal": [
          "cloud"
        ],
        "operationId": "getTestByAbsPath",
        "summary": "Get test metadata",
        "description": "Returns metadata for test identified by its absolute path.",
        "parameters": [
          {
            "name": "absPath",
            "in": "query",
            "required": true,
            "description": "The absolute path of the test to retrieve",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "A single test",
            "content": {
              "application/json": {
                "schema": {
                  "x-generate-db-helpers": true,
                  "type": "object",
                  "required": [
                    "id",
                    "title",
                    "org_id",
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
                    "max_attempts",
                    "questions",
                    "total_questions",
                    "total_questions_in_bank",
                    "total_question_sets",
                    "total_marks",
                    "prerequisites",
                    "next_page"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "x-go-name": "ID",
                      "x-oapi-codegen-extra-tags": {
                        "json": "id"
                      }
                    },
                    "org_id": {
                      "type": "string",
                      "description": "Organization ID that owns this quiz",
                      "example": "layer5",
                      "x-oapi-codegen-extra-tags": {
                        "db": "org_id",
                        "json": "org_id"
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
                      "description": "Time limit for the quiz in minutes. A value of 0 indicates no time limit.",
                      "type": "string"
                    },
                    "max_attempts": {
                      "description": "Maximum number of attempts allowed for the quiz. A value of 0 indicates unlimited attempts.",
                      "type": "integer"
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
                          "correctAnswer"
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
                          "multipleAnswers": {
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
                                "isCorrect"
                              ],
                              "properties": {
                                "id": {
                                  "type": "string"
                                },
                                "text": {
                                  "type": "string"
                                },
                                "isCorrect": {
                                  "type": "boolean"
                                }
                              }
                            }
                          },
                          "correctAnswer": {
                            "type": "string"
                          }
                        }
                      }
                    },
                    "total_questions": {
                      "type": "integer"
                    },
                    "total_questions_in_bank": {
                      "type": "integer"
                    },
                    "total_question_sets": {
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
                    },
                    "next_page": {
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
              }
            }
          },
          "400": {
            "description": "Invalid request parameters"
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
            "description": "Quiz not found"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/api/academy/registrations/test-sessions/start": {
      "post": {
        "tags": [
          "Academy"
        ],
        "x-internal": [
          "cloud"
        ],
        "operationId": "startTestById",
        "summary": "Start a Test by ID",
        "description": "Starts a new test session for the quiz identified by its ID.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "testAbsPath",
                  "registrationId"
                ],
                "properties": {
                  "testAbsPath": {
                    "type": "string"
                  },
                  "registrationId": {
                    "type": "string"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "A single test",
            "content": {
              "application/json": {
                "schema": {
                  "x-generate-db-helpers": true,
                  "type": "object",
                  "required": [
                    "id",
                    "title",
                    "org_id",
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
                    "max_attempts",
                    "questions",
                    "total_questions",
                    "total_questions_in_bank",
                    "total_question_sets",
                    "total_marks",
                    "prerequisites",
                    "next_page"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "x-go-name": "ID",
                      "x-oapi-codegen-extra-tags": {
                        "json": "id"
                      }
                    },
                    "org_id": {
                      "type": "string",
                      "description": "Organization ID that owns this quiz",
                      "example": "layer5",
                      "x-oapi-codegen-extra-tags": {
                        "db": "org_id",
                        "json": "org_id"
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
                      "description": "Time limit for the quiz in minutes. A value of 0 indicates no time limit.",
                      "type": "string"
                    },
                    "max_attempts": {
                      "description": "Maximum number of attempts allowed for the quiz. A value of 0 indicates unlimited attempts.",
                      "type": "integer"
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
                          "correctAnswer"
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
                          "multipleAnswers": {
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
                                "isCorrect"
                              ],
                              "properties": {
                                "id": {
                                  "type": "string"
                                },
                                "text": {
                                  "type": "string"
                                },
                                "isCorrect": {
                                  "type": "boolean"
                                }
                              }
                            }
                          },
                          "correctAnswer": {
                            "type": "string"
                          }
                        }
                      }
                    },
                    "total_questions": {
                      "type": "integer"
                    },
                    "total_questions_in_bank": {
                      "type": "integer"
                    },
                    "total_question_sets": {
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
                    },
                    "next_page": {
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
              }
            }
          },
          "400": {
            "description": "Invalid request parameters"
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
            "description": "Quiz not found"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/api/academy/registrations/{id}/test-sessions": {
      "get": {
        "tags": [
          "Academy"
        ],
        "x-internal": [
          "cloud"
        ],
        "operationId": "getAllTestSessionsForRegistration",
        "summary": "Get all tests for a registration",
        "description": "Returns all tests associated with a specific registration ID for a user.",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "description": "The ID of the registration to retrieve tests for",
            "schema": {
              "type": "string"
            }
          },
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
            "name": "testAbsPath",
            "in": "query",
            "required": false,
            "description": "Filter tests by absolute path",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "A list of tests for the specified registration",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "array",
                    "description": "Test submissions made by the user (array of QuizEvaluationResult)",
                    "items": {
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
                          "x-generate-db-helpers": true,
                          "type": "object",
                          "required": [
                            "id",
                            "title",
                            "org_id",
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
                            "max_attempts",
                            "questions",
                            "total_questions",
                            "total_questions_in_bank",
                            "total_question_sets",
                            "total_marks",
                            "prerequisites",
                            "next_page"
                          ],
                          "properties": {
                            "id": {
                              "type": "string",
                              "x-go-name": "ID",
                              "x-oapi-codegen-extra-tags": {
                                "json": "id"
                              }
                            },
                            "org_id": {
                              "type": "string",
                              "description": "Organization ID that owns this quiz",
                              "example": "layer5",
                              "x-oapi-codegen-extra-tags": {
                                "db": "org_id",
                                "json": "org_id"
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
                              "description": "Time limit for the quiz in minutes. A value of 0 indicates no time limit.",
                              "type": "string"
                            },
                            "max_attempts": {
                              "description": "Maximum number of attempts allowed for the quiz. A value of 0 indicates unlimited attempts.",
                              "type": "integer"
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
                                  "correctAnswer"
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
                                  "multipleAnswers": {
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
                                        "isCorrect"
                                      ],
                                      "properties": {
                                        "id": {
                                          "type": "string"
                                        },
                                        "text": {
                                          "type": "string"
                                        },
                                        "isCorrect": {
                                          "type": "boolean"
                                        }
                                      }
                                    }
                                  },
                                  "correctAnswer": {
                                    "type": "string"
                                  }
                                }
                              }
                            },
                            "total_questions": {
                              "type": "integer"
                            },
                            "total_questions_in_bank": {
                              "type": "integer"
                            },
                            "total_question_sets": {
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
                            },
                            "next_page": {
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
              }
            }
          },
          "400": {
            "description": "Invalid request parameters"
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
            "description": "Registration not found"
          },
          "500": {
            "description": "Server error"
          }
        }
      }
    },
    "/api/academy/registrations/test-sessions/submit": {
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
                  "quizAbsPath",
                  "registrationId",
                  "testSessionId",
                  "user_id",
                  "answers"
                ],
                "properties": {
                  "testSessionId": {
                    "type": "string",
                    "format": "uuid",
                    "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  },
                  "quizAbsPath": {
                    "type": "string"
                  },
                  "registrationId": {
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
                        "questionId",
                        "selectedOptionId",
                        "answerText"
                      ],
                      "properties": {
                        "questionId": {
                          "type": "string"
                        },
                        "selectedOptionId": {
                          "type": "object",
                          "additionalProperties": {
                            "type": "boolean"
                          }
                        },
                        "answerText": {
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
            "description": "Progress tracker updated",
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
                      "x-generate-db-helpers": true,
                      "type": "object",
                      "required": [
                        "id",
                        "title",
                        "org_id",
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
                        "max_attempts",
                        "questions",
                        "total_questions",
                        "total_questions_in_bank",
                        "total_question_sets",
                        "total_marks",
                        "prerequisites",
                        "next_page"
                      ],
                      "properties": {
                        "id": {
                          "type": "string",
                          "x-go-name": "ID",
                          "x-oapi-codegen-extra-tags": {
                            "json": "id"
                          }
                        },
                        "org_id": {
                          "type": "string",
                          "description": "Organization ID that owns this quiz",
                          "example": "layer5",
                          "x-oapi-codegen-extra-tags": {
                            "db": "org_id",
                            "json": "org_id"
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
                          "description": "Time limit for the quiz in minutes. A value of 0 indicates no time limit.",
                          "type": "string"
                        },
                        "max_attempts": {
                          "description": "Maximum number of attempts allowed for the quiz. A value of 0 indicates unlimited attempts.",
                          "type": "integer"
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
                              "correctAnswer"
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
                              "multipleAnswers": {
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
                                    "isCorrect"
                                  ],
                                  "properties": {
                                    "id": {
                                      "type": "string"
                                    },
                                    "text": {
                                      "type": "string"
                                    },
                                    "isCorrect": {
                                      "type": "boolean"
                                    }
                                  }
                                }
                              },
                              "correctAnswer": {
                                "type": "string"
                              }
                            }
                          }
                        },
                        "total_questions": {
                          "type": "integer"
                        },
                        "total_questions_in_bank": {
                          "type": "integer"
                        },
                        "total_question_sets": {
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
                        },
                        "next_page": {
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
            "name": "contentType",
            "in": "query",
            "required": false,
            "description": "Filter by content types",
            "style": "form",
            "explode": true,
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          {
            "name": "status",
            "in": "query",
            "required": false,
            "description": "Filter by registration status",
            "style": "form",
            "explode": true,
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
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
                    "orgId",
                    "title",
                    "description",
                    "issuingAuthorities",
                    "issuedDate",
                    "recipientId",
                    "recipientName"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "description": "Unique identifier for the certificate",
                      "example": "1234567890abcdef",
                      "x-go-name": "ID"
                    },
                    "orgId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "recipientId": {
                      "type": "string",
                      "description": "ID of the recipient (user) who received the certificate",
                      "example": "1234567890abcdef"
                    },
                    "recipientName": {
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
                    "issuingAuthorities": {
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
                          "signatureUrl": {
                            "type": "string",
                            "format": "uri",
                            "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                            "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                          }
                        }
                      },
                      "description": "List of issuing authorities for the certificate"
                    },
                    "issuedDate": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Date when the certificate was issued",
                      "example": "2023-10-01T12:00:00Z"
                    },
                    "expirationDate": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Date when the certificate expires (optional)",
                      "example": "2025-10-01T12:00:00Z"
                    },
                    "expiresIn": {
                      "type": "integer",
                      "description": "Number of months after which the certificate expires",
                      "example": 24
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Invalid request parameters"
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
    "securitySchemes": {
      "jwt": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    },
    "parameters": {
      "id": {
        "name": "id",
        "in": "path",
        "required": true,
        "description": "The ID of the curricula",
        "schema": {
          "type": "string"
        }
      }
    },
    "schemas": {
      "AcademyCurriculaOrgId": {
        "type": "string",
        "description": "Organization ID that owns this learning path",
        "example": "layer5",
        "x-oapi-codegen-extra-tags": {
          "db": "org_id",
          "json": "org_id"
        }
      },
      "AcademyCurriculaBadgeId": {
        "allOf": [
          {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          }
        ],
        "description": "ID of the badge to be awarded on completion of this curricula",
        "x-oapi-codegen-extra-tags": {
          "db": "badge_id",
          "json": "badge_id"
        }
      },
      "AcademyCurriculaInviteId": {
        "allOf": [
          {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          }
        ],
        "description": "ID of the invite associated with this Curricula",
        "x-oapi-codegen-extra-tags": {
          "db": "invite_id",
          "json": "invite_id"
        }
      },
      "AcademyCurriculaWorkspaceId": {
        "allOf": [
          {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          }
        ],
        "description": "ID of the workspace to which this Curricula belongs",
        "x-oapi-codegen-extra-tags": {
          "db": "workspace_id",
          "json": "workspace_id"
        }
      },
      "AcademyCurriculaCreatedAt": {
        "allOf": [
          {
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          }
        ],
        "description": "When the Curricula item was created",
        "x-oapi-codegen-extra-tags": {
          "db": "created_at",
          "json": "created_at"
        }
      },
      "AcademyCurriculaUpdatedAt": {
        "allOf": [
          {
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          }
        ],
        "description": "When the Curricula was last updated",
        "x-go-type": "core.Time",
        "x-oapi-codegen-extra-tags": {
          "db": "updated_at",
          "json": "updated_at"
        }
      },
      "AcademyCurriculaDeletedAt": {
        "allOf": [
          {
            "description": "Timestamp when the resource was deleted.",
            "x-go-type": "NullTime",
            "type": "string",
            "format": "date-time",
            "x-go-name": "DeletedAt",
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at",
              "yaml": "deleted_at"
            },
            "x-go-type-skip-optional-pointer": true
          }
        ],
        "x-go-type": "core.NullTime",
        "x-oapi-codegen-extra-tags": {
          "db": "deleted_at",
          "json": "deleted_at"
        }
      },
      "AcademyCurriculaMetadata": {
        "type": "object",
        "description": "Additional metadata about the Curricula",
        "additionalProperties": true,
        "x-go-type": "core.Map",
        "x-go-type-skip-optional-pointer": true,
        "x-oapi-codegen-extra-tags": {
          "db": "metadata",
          "json": "metadata"
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
                "description": "Short description of the curricula",
                "example": "Learn how to configure your Kubernetes clusters and manage the lifecycle of your workloads"
              },
              "detailedDescription": {
                "type": "string",
                "description": "Detailed description of the curricula",
                "example": "This learning path covers everything from Kubernetes architecture to advanced deployment strategies, including hands-on labs and real-world scenarios."
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
              "certificate": {
                "x-go-type": "Certificate",
                "type": "object",
                "required": [
                  "id",
                  "orgId",
                  "title",
                  "description",
                  "issuingAuthorities",
                  "issuedDate",
                  "recipientId",
                  "recipientName"
                ],
                "properties": {
                  "id": {
                    "type": "string",
                    "description": "Unique identifier for the certificate",
                    "example": "1234567890abcdef",
                    "x-go-name": "ID"
                  },
                  "orgId": {
                    "type": "string",
                    "format": "uuid",
                    "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  },
                  "recipientId": {
                    "type": "string",
                    "description": "ID of the recipient (user) who received the certificate",
                    "example": "1234567890abcdef"
                  },
                  "recipientName": {
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
                  "issuingAuthorities": {
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
                        "signatureUrl": {
                          "type": "string",
                          "format": "uri",
                          "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                          "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                        }
                      }
                    },
                    "description": "List of issuing authorities for the certificate"
                  },
                  "issuedDate": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Date when the certificate was issued",
                    "example": "2023-10-01T12:00:00Z"
                  },
                  "expirationDate": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Date when the certificate expires (optional)",
                    "example": "2025-10-01T12:00:00Z"
                  },
                  "expiresIn": {
                    "type": "integer",
                    "description": "Number of months after which the certificate expires",
                    "example": 24
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
                        "json": "id"
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
      },
      "AcademyCurriculaAccessExpiresAt": {
        "allOf": [
          {
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          }
        ],
        "description": "Expiry time for curricula access",
        "x-go-type": "*time.Time",
        "x-oapi-codegen-extra-tags": {
          "json": "access_expires_at",
          "db": "access_expires_at"
        }
      },
      "RegisterToAcademyContentRequest": {
        "type": "object",
        "required": [
          "contentId",
          "user_id"
        ],
        "properties": {
          "contentId": {
            "type": "string",
            "description": "ID of the academy content to register for"
          },
          "contentType": {
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
      "AcademyCurricula": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "Id of the Curricula",
            "example": "923458-3490394-934893",
            "x-go-name": "ID",
            "x-oapi-codegen-extra-tags": {
              "db": "id",
              "json": "id"
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
              "json": "org_id"
            }
          },
          "visibility": {
            "description": "Visibility of the Curricula",
            "x-go-type": "Visibility",
            "x-oapi-codegen-extra-tags": {
              "db": "visibility",
              "json": "visibility"
            },
            "type": "string",
            "enum": [
              "public",
              "private"
            ]
          },
          "status": {
            "example": "ready",
            "description": "Status of the Curricula",
            "x-go-type": "Status",
            "x-oapi-codegen-extra-tags": {
              "db": "status",
              "json": "status"
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
            "description": "slug of the Curricula",
            "example": "intro-kubernetes-course"
          },
          "level": {
            "description": "Level of the Curricula",
            "x-go-type": "Level",
            "x-oapi-codegen-extra-tags": {
              "db": "level",
              "json": "level"
            },
            "type": "string",
            "enum": [
              "beginner",
              "intermediate",
              "advanced"
            ]
          },
          "badge_id": {
            "type": "string",
            "format": "uuid",
            "description": "ID of the badge to be awarded on completion of this curricula",
            "x-go-type": "core.Uuid",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "badge_id",
              "json": "badge_id"
            }
          },
          "inviteId": {
            "allOf": [
              {
                "type": "string",
                "format": "uuid",
                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                }
              }
            ],
            "description": "ID of the invite associated with this Curricula",
            "x-oapi-codegen-extra-tags": {
              "db": "invite_id",
              "json": "invite_id"
            }
          },
          "workspace_id": {
            "allOf": [
              {
                "type": "string",
                "format": "uuid",
                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                }
              }
            ],
            "description": "ID of the workspace to which this Curricula belongs",
            "x-oapi-codegen-extra-tags": {
              "db": "workspace_id",
              "json": "workspace_id"
            }
          },
          "createdAt": {
            "allOf": [
              {
                "type": "string",
                "format": "date-time",
                "x-go-type-skip-optional-pointer": true
              }
            ],
            "description": "When the Curricula item was created",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at",
              "json": "created_at"
            }
          },
          "updatedAt": {
            "allOf": [
              {
                "type": "string",
                "format": "date-time",
                "x-go-type-skip-optional-pointer": true
              }
            ],
            "description": "When the Curricula was last updated",
            "x-go-type": "core.Time",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at",
              "json": "updated_at"
            }
          },
          "deletedAt": {
            "allOf": [
              {
                "description": "Timestamp when the resource was deleted.",
                "x-go-type": "NullTime",
                "type": "string",
                "format": "date-time",
                "x-go-name": "DeletedAt",
                "x-oapi-codegen-extra-tags": {
                  "db": "deleted_at",
                  "yaml": "deleted_at"
                },
                "x-go-type-skip-optional-pointer": true
              }
            ],
            "x-go-type": "core.NullTime",
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at",
              "json": "deleted_at"
            }
          },
          "metadata": {
            "type": "object",
            "description": "Additional metadata about the Curricula",
            "additionalProperties": true,
            "x-go-type": "core.Map",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "metadata",
              "json": "metadata"
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
                    "description": "Short description of the curricula",
                    "example": "Learn how to configure your Kubernetes clusters and manage the lifecycle of your workloads"
                  },
                  "detailedDescription": {
                    "type": "string",
                    "description": "Detailed description of the curricula",
                    "example": "This learning path covers everything from Kubernetes architecture to advanced deployment strategies, including hands-on labs and real-world scenarios."
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
                  "certificate": {
                    "x-go-type": "Certificate",
                    "type": "object",
                    "required": [
                      "id",
                      "orgId",
                      "title",
                      "description",
                      "issuingAuthorities",
                      "issuedDate",
                      "recipientId",
                      "recipientName"
                    ],
                    "properties": {
                      "id": {
                        "type": "string",
                        "description": "Unique identifier for the certificate",
                        "example": "1234567890abcdef",
                        "x-go-name": "ID"
                      },
                      "orgId": {
                        "type": "string",
                        "format": "uuid",
                        "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        }
                      },
                      "recipientId": {
                        "type": "string",
                        "description": "ID of the recipient (user) who received the certificate",
                        "example": "1234567890abcdef"
                      },
                      "recipientName": {
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
                      "issuingAuthorities": {
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
                            "signatureUrl": {
                              "type": "string",
                              "format": "uri",
                              "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                              "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                            }
                          }
                        },
                        "description": "List of issuing authorities for the certificate"
                      },
                      "issuedDate": {
                        "type": "string",
                        "format": "date-time",
                        "description": "Date when the certificate was issued",
                        "example": "2023-10-01T12:00:00Z"
                      },
                      "expirationDate": {
                        "type": "string",
                        "format": "date-time",
                        "description": "Date when the certificate expires (optional)",
                        "example": "2025-10-01T12:00:00Z"
                      },
                      "expiresIn": {
                        "type": "integer",
                        "description": "Number of months after which the certificate expires",
                        "example": 24
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
                            "json": "id"
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
      "SingleAcademyCurriculaResponse": {
        "type": "object",
        "allOf": [
          {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "description": "Id of the Curricula",
                "example": "923458-3490394-934893",
                "x-go-name": "ID",
                "x-oapi-codegen-extra-tags": {
                  "db": "id",
                  "json": "id"
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
                  "json": "org_id"
                }
              },
              "visibility": {
                "description": "Visibility of the Curricula",
                "x-go-type": "Visibility",
                "x-oapi-codegen-extra-tags": {
                  "db": "visibility",
                  "json": "visibility"
                },
                "type": "string",
                "enum": [
                  "public",
                  "private"
                ]
              },
              "status": {
                "example": "ready",
                "description": "Status of the Curricula",
                "x-go-type": "Status",
                "x-oapi-codegen-extra-tags": {
                  "db": "status",
                  "json": "status"
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
                "description": "slug of the Curricula",
                "example": "intro-kubernetes-course"
              },
              "level": {
                "description": "Level of the Curricula",
                "x-go-type": "Level",
                "x-oapi-codegen-extra-tags": {
                  "db": "level",
                  "json": "level"
                },
                "type": "string",
                "enum": [
                  "beginner",
                  "intermediate",
                  "advanced"
                ]
              },
              "badge_id": {
                "type": "string",
                "format": "uuid",
                "description": "ID of the badge to be awarded on completion of this curricula",
                "x-go-type": "core.Uuid",
                "x-go-type-import": {
                  "path": "github.com/meshery/schemas/models/core",
                  "name": "core"
                },
                "x-oapi-codegen-extra-tags": {
                  "db": "badge_id",
                  "json": "badge_id"
                }
              },
              "inviteId": {
                "allOf": [
                  {
                    "type": "string",
                    "format": "uuid",
                    "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  }
                ],
                "description": "ID of the invite associated with this Curricula",
                "x-oapi-codegen-extra-tags": {
                  "db": "invite_id",
                  "json": "invite_id"
                }
              },
              "workspace_id": {
                "allOf": [
                  {
                    "type": "string",
                    "format": "uuid",
                    "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  }
                ],
                "description": "ID of the workspace to which this Curricula belongs",
                "x-oapi-codegen-extra-tags": {
                  "db": "workspace_id",
                  "json": "workspace_id"
                }
              },
              "createdAt": {
                "allOf": [
                  {
                    "type": "string",
                    "format": "date-time",
                    "x-go-type-skip-optional-pointer": true
                  }
                ],
                "description": "When the Curricula item was created",
                "x-oapi-codegen-extra-tags": {
                  "db": "created_at",
                  "json": "created_at"
                }
              },
              "updatedAt": {
                "allOf": [
                  {
                    "type": "string",
                    "format": "date-time",
                    "x-go-type-skip-optional-pointer": true
                  }
                ],
                "description": "When the Curricula was last updated",
                "x-go-type": "core.Time",
                "x-oapi-codegen-extra-tags": {
                  "db": "updated_at",
                  "json": "updated_at"
                }
              },
              "deletedAt": {
                "allOf": [
                  {
                    "description": "Timestamp when the resource was deleted.",
                    "x-go-type": "NullTime",
                    "type": "string",
                    "format": "date-time",
                    "x-go-name": "DeletedAt",
                    "x-oapi-codegen-extra-tags": {
                      "db": "deleted_at",
                      "yaml": "deleted_at"
                    },
                    "x-go-type-skip-optional-pointer": true
                  }
                ],
                "x-go-type": "core.NullTime",
                "x-oapi-codegen-extra-tags": {
                  "db": "deleted_at",
                  "json": "deleted_at"
                }
              },
              "metadata": {
                "type": "object",
                "description": "Additional metadata about the Curricula",
                "additionalProperties": true,
                "x-go-type": "core.Map",
                "x-go-type-skip-optional-pointer": true,
                "x-oapi-codegen-extra-tags": {
                  "db": "metadata",
                  "json": "metadata"
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
                        "description": "Short description of the curricula",
                        "example": "Learn how to configure your Kubernetes clusters and manage the lifecycle of your workloads"
                      },
                      "detailedDescription": {
                        "type": "string",
                        "description": "Detailed description of the curricula",
                        "example": "This learning path covers everything from Kubernetes architecture to advanced deployment strategies, including hands-on labs and real-world scenarios."
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
                      "certificate": {
                        "x-go-type": "Certificate",
                        "type": "object",
                        "required": [
                          "id",
                          "orgId",
                          "title",
                          "description",
                          "issuingAuthorities",
                          "issuedDate",
                          "recipientId",
                          "recipientName"
                        ],
                        "properties": {
                          "id": {
                            "type": "string",
                            "description": "Unique identifier for the certificate",
                            "example": "1234567890abcdef",
                            "x-go-name": "ID"
                          },
                          "orgId": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "recipientId": {
                            "type": "string",
                            "description": "ID of the recipient (user) who received the certificate",
                            "example": "1234567890abcdef"
                          },
                          "recipientName": {
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
                          "issuingAuthorities": {
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
                                "signatureUrl": {
                                  "type": "string",
                                  "format": "uri",
                                  "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                                  "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                                }
                              }
                            },
                            "description": "List of issuing authorities for the certificate"
                          },
                          "issuedDate": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Date when the certificate was issued",
                            "example": "2023-10-01T12:00:00Z"
                          },
                          "expirationDate": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Date when the certificate expires (optional)",
                            "example": "2025-10-01T12:00:00Z"
                          },
                          "expiresIn": {
                            "type": "integer",
                            "description": "Number of months after which the certificate expires",
                            "example": 24
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
                                "json": "id"
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
              "registration_count"
            ],
            "properties": {
              "registration_count": {
                "type": "number",
                "x-oapi-codegen-extra-tags": {
                  "db": "registration_count,omitempty",
                  "json": "registration_count,omitempty"
                }
              },
              "invitation": {
                "x-go-type": "invitationv1beta1.Invitation",
                "x-go-type-import": {
                  "path": "github.com/meshery/schemas/models/v1beta1/invitation",
                  "name": "invitationv1beta1"
                },
                "type": "object",
                "required": [
                  "id",
                  "owner_id",
                  "name",
                  "description",
                  "org_id",
                  "accepted_by",
                  "emails",
                  "roles",
                  "teams",
                  "status",
                  "created_at",
                  "updated_at",
                  "deleted_at"
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
                    "x-go-name": "ID"
                  },
                  "owner_id": {
                    "type": "string",
                    "format": "uuid",
                    "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    },
                    "x-oapi-codegen-extra-tags": {
                      "db": "owner_id",
                      "json": "owner_id"
                    }
                  },
                  "is_default": {
                    "type": "boolean",
                    "description": "Indicates whether the invitation is a default invitation (open invite), which can be used to assign users when signing up from fqdn or custom domain, a organization can only have one default invitation",
                    "x-oapi-codegen-extra-tags": {
                      "db": "is_default",
                      "json": "is_default"
                    }
                  },
                  "name": {
                    "type": "string",
                    "description": "Name of the invitation, which can be used to identify the invitation, required and cant be empty string,"
                  },
                  "description": {
                    "type": "string",
                    "description": "Description of the invitation, which can be used to provide additional information about the invitation, null or empty string means the invitation does not have a description"
                  },
                  "emails": {
                    "type": "array",
                    "x-go-type": "pq.StringArray",
                    "x-go-type-import": {
                      "path": "github.com/lib/pq"
                    },
                    "items": {
                      "type": "string",
                      "pattern": "^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,}|@[a-zA-Z0-9.-]+\\.[a-z]{2,})$",
                      "x-go-type": "string",
                      "description": "Exact email address or the email address pattern for which the invitation is valid , null means the invitation is valid for all email addresses"
                    }
                  },
                  "org_id": {
                    "type": "string",
                    "description": "ID of the organization to which the user is invited",
                    "x-oapi-codegen-extra-tags": {
                      "db": "org_id",
                      "json": "org_id"
                    }
                  },
                  "expires_at": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Timestamp when the invitation expires, if applicable , null or empty string means the invitation does not expire",
                    "x-oapi-codegen-extra-tags": {
                      "db": "expires_at",
                      "json": "expires_at"
                    }
                  },
                  "quota": {
                    "type": "integer",
                    "description": "Quota for the invitation, which can be used to limit the number of users that can accept the invitation, null or empty string means the invitation does not have a quota"
                  },
                  "accepted_by": {
                    "type": "array",
                    "x-go-type": "pq.StringArray",
                    "x-go-type-import": {
                      "path": "github.com/lib/pq"
                    },
                    "items": {
                      "type": "string"
                    },
                    "description": "List of user ids that have already accepted the invitation, null or empty string means the invitation has not been used yet",
                    "x-oapi-codegen-extra-tags": {
                      "db": "accepted_by",
                      "json": "accepted_by"
                    }
                  },
                  "roles": {
                    "type": "array",
                    "x-go-type": "pq.StringArray",
                    "x-go-type-import": {
                      "path": "github.com/lib/pq"
                    },
                    "items": {
                      "type": "string",
                      "description": "Roles that the user will have when accepting the invitation, null or empty string means the invitation does not specify any roles"
                    }
                  },
                  "teams": {
                    "type": "array",
                    "x-go-type": "pq.StringArray",
                    "x-go-type-import": {
                      "path": "github.com/lib/pq"
                    },
                    "items": {
                      "type": "string",
                      "description": "Teams that the user will be added to when accepting the invitation, null or empty string means the invitation does not specify any teams"
                    }
                  },
                  "status": {
                    "type": "string",
                    "x-go-type": "InvitationStatus",
                    "enum": [
                      "enabled",
                      "disabled"
                    ],
                    "description": "Status of the invitation, where enabled means the invitation is active and can be used, disabled means the invitation is no longer valid and is temporarily inactive, disabled invitations can be re-enabled later."
                  },
                  "created_at": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Timestamp when the invitation was created",
                    "x-oapi-codegen-extra-tags": {
                      "db": "created_at",
                      "json": "created_at"
                    }
                  },
                  "updated_at": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Timestamp when the invitation was last updated",
                    "x-oapi-codegen-extra-tags": {
                      "db": "updated_at",
                      "json": "updated_at"
                    }
                  },
                  "deleted_at": {
                    "type": "string",
                    "format": "date-time",
                    "x-go-type": "core.NullTime",
                    "description": "Timestamp when the invitation was deleted, if applicable",
                    "x-oapi-codegen-extra-tags": {
                      "db": "deleted_at",
                      "json": "deleted_at"
                    }
                  }
                }
              }
            }
          }
        ]
      },
      "CreateAcademyCurriculaRequest": {
        "type": "object",
        "properties": {
          "type": {
            "description": "Type of the curricula",
            "x-go-name": "Type",
            "x-go-type": "ContentType",
            "x-oapi-codegen-extra-tags": {
              "json": "type"
            },
            "type": "string",
            "enum": [
              "learning-path",
              "challenge",
              "certification"
            ]
          },
          "title": {
            "type": "string",
            "description": "Title of the curricula",
            "example": "Introduction to Kubernetes",
            "x-go-name": "Title",
            "x-oapi-codegen-extra-tags": {
              "json": "title"
            }
          },
          "orgId": {
            "type": "string",
            "description": "Organization ID that owns this learning path",
            "example": "layer5",
            "x-oapi-codegen-extra-tags": {
              "db": "org_id",
              "json": "org_id"
            }
          },
          "workspace_id": {
            "allOf": [
              {
                "type": "string",
                "format": "uuid",
                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                }
              }
            ],
            "description": "ID of the workspace to which this Curricula belongs",
            "x-oapi-codegen-extra-tags": {
              "db": "workspace_id",
              "json": "workspace_id"
            }
          },
          "badge_id": {
            "type": "string",
            "format": "uuid",
            "description": "ID of the badge to be awarded on completion of this curricula",
            "x-go-type": "core.Uuid",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "badge_id",
              "json": "badge_id"
            }
          },
          "team_id": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-name": "TeamId",
            "x-oapi-codegen-extra-tags": {
              "json": "team_id",
              "db": "team_id"
            }
          },
          "access_expires_at": {
            "allOf": [
              {
                "type": "string",
                "format": "date-time",
                "x-go-type-skip-optional-pointer": true
              }
            ],
            "description": "Expiry time for curricula access",
            "x-go-type": "*time.Time",
            "x-oapi-codegen-extra-tags": {
              "json": "access_expires_at",
              "db": "access_expires_at"
            }
          },
          "access_status": {
            "description": "Current access status of the curricula",
            "x-go-name": "AccessStatus",
            "x-go-type": "invitationv1beta1.InvitationStatus",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/v1beta1/invitation",
              "name": "invitationv1beta1"
            },
            "x-oapi-codegen-extra-tags": {
              "json": "access_status",
              "db": "access_status"
            },
            "type": "string",
            "enum": [
              "enabled",
              "disabled"
            ]
          },
          "metadata": {
            "type": "object",
            "description": "Additional metadata about the Curricula",
            "additionalProperties": true,
            "x-go-type": "core.Map",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "metadata",
              "json": "metadata"
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
                    "description": "Short description of the curricula",
                    "example": "Learn how to configure your Kubernetes clusters and manage the lifecycle of your workloads"
                  },
                  "detailedDescription": {
                    "type": "string",
                    "description": "Detailed description of the curricula",
                    "example": "This learning path covers everything from Kubernetes architecture to advanced deployment strategies, including hands-on labs and real-world scenarios."
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
                  "certificate": {
                    "x-go-type": "Certificate",
                    "type": "object",
                    "required": [
                      "id",
                      "orgId",
                      "title",
                      "description",
                      "issuingAuthorities",
                      "issuedDate",
                      "recipientId",
                      "recipientName"
                    ],
                    "properties": {
                      "id": {
                        "type": "string",
                        "description": "Unique identifier for the certificate",
                        "example": "1234567890abcdef",
                        "x-go-name": "ID"
                      },
                      "orgId": {
                        "type": "string",
                        "format": "uuid",
                        "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        }
                      },
                      "recipientId": {
                        "type": "string",
                        "description": "ID of the recipient (user) who received the certificate",
                        "example": "1234567890abcdef"
                      },
                      "recipientName": {
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
                      "issuingAuthorities": {
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
                            "signatureUrl": {
                              "type": "string",
                              "format": "uri",
                              "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                              "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                            }
                          }
                        },
                        "description": "List of issuing authorities for the certificate"
                      },
                      "issuedDate": {
                        "type": "string",
                        "format": "date-time",
                        "description": "Date when the certificate was issued",
                        "example": "2023-10-01T12:00:00Z"
                      },
                      "expirationDate": {
                        "type": "string",
                        "format": "date-time",
                        "description": "Date when the certificate expires (optional)",
                        "example": "2025-10-01T12:00:00Z"
                      },
                      "expiresIn": {
                        "type": "integer",
                        "description": "Number of months after which the certificate expires",
                        "example": 24
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
                            "json": "id"
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
          "type",
          "title",
          "orgId",
          "workspace_id",
          "team_id",
          "access_status",
          "metadata"
        ]
      },
      "AcademyCurriculaWithMetrics": {
        "allOf": [
          {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "description": "Id of the Curricula",
                "example": "923458-3490394-934893",
                "x-go-name": "ID",
                "x-oapi-codegen-extra-tags": {
                  "db": "id",
                  "json": "id"
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
                  "json": "org_id"
                }
              },
              "visibility": {
                "description": "Visibility of the Curricula",
                "x-go-type": "Visibility",
                "x-oapi-codegen-extra-tags": {
                  "db": "visibility",
                  "json": "visibility"
                },
                "type": "string",
                "enum": [
                  "public",
                  "private"
                ]
              },
              "status": {
                "example": "ready",
                "description": "Status of the Curricula",
                "x-go-type": "Status",
                "x-oapi-codegen-extra-tags": {
                  "db": "status",
                  "json": "status"
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
                "description": "slug of the Curricula",
                "example": "intro-kubernetes-course"
              },
              "level": {
                "description": "Level of the Curricula",
                "x-go-type": "Level",
                "x-oapi-codegen-extra-tags": {
                  "db": "level",
                  "json": "level"
                },
                "type": "string",
                "enum": [
                  "beginner",
                  "intermediate",
                  "advanced"
                ]
              },
              "badge_id": {
                "type": "string",
                "format": "uuid",
                "description": "ID of the badge to be awarded on completion of this curricula",
                "x-go-type": "core.Uuid",
                "x-go-type-import": {
                  "path": "github.com/meshery/schemas/models/core",
                  "name": "core"
                },
                "x-oapi-codegen-extra-tags": {
                  "db": "badge_id",
                  "json": "badge_id"
                }
              },
              "inviteId": {
                "allOf": [
                  {
                    "type": "string",
                    "format": "uuid",
                    "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  }
                ],
                "description": "ID of the invite associated with this Curricula",
                "x-oapi-codegen-extra-tags": {
                  "db": "invite_id",
                  "json": "invite_id"
                }
              },
              "workspace_id": {
                "allOf": [
                  {
                    "type": "string",
                    "format": "uuid",
                    "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  }
                ],
                "description": "ID of the workspace to which this Curricula belongs",
                "x-oapi-codegen-extra-tags": {
                  "db": "workspace_id",
                  "json": "workspace_id"
                }
              },
              "createdAt": {
                "allOf": [
                  {
                    "type": "string",
                    "format": "date-time",
                    "x-go-type-skip-optional-pointer": true
                  }
                ],
                "description": "When the Curricula item was created",
                "x-oapi-codegen-extra-tags": {
                  "db": "created_at",
                  "json": "created_at"
                }
              },
              "updatedAt": {
                "allOf": [
                  {
                    "type": "string",
                    "format": "date-time",
                    "x-go-type-skip-optional-pointer": true
                  }
                ],
                "description": "When the Curricula was last updated",
                "x-go-type": "core.Time",
                "x-oapi-codegen-extra-tags": {
                  "db": "updated_at",
                  "json": "updated_at"
                }
              },
              "deletedAt": {
                "allOf": [
                  {
                    "description": "Timestamp when the resource was deleted.",
                    "x-go-type": "NullTime",
                    "type": "string",
                    "format": "date-time",
                    "x-go-name": "DeletedAt",
                    "x-oapi-codegen-extra-tags": {
                      "db": "deleted_at",
                      "yaml": "deleted_at"
                    },
                    "x-go-type-skip-optional-pointer": true
                  }
                ],
                "x-go-type": "core.NullTime",
                "x-oapi-codegen-extra-tags": {
                  "db": "deleted_at",
                  "json": "deleted_at"
                }
              },
              "metadata": {
                "type": "object",
                "description": "Additional metadata about the Curricula",
                "additionalProperties": true,
                "x-go-type": "core.Map",
                "x-go-type-skip-optional-pointer": true,
                "x-oapi-codegen-extra-tags": {
                  "db": "metadata",
                  "json": "metadata"
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
                        "description": "Short description of the curricula",
                        "example": "Learn how to configure your Kubernetes clusters and manage the lifecycle of your workloads"
                      },
                      "detailedDescription": {
                        "type": "string",
                        "description": "Detailed description of the curricula",
                        "example": "This learning path covers everything from Kubernetes architecture to advanced deployment strategies, including hands-on labs and real-world scenarios."
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
                      "certificate": {
                        "x-go-type": "Certificate",
                        "type": "object",
                        "required": [
                          "id",
                          "orgId",
                          "title",
                          "description",
                          "issuingAuthorities",
                          "issuedDate",
                          "recipientId",
                          "recipientName"
                        ],
                        "properties": {
                          "id": {
                            "type": "string",
                            "description": "Unique identifier for the certificate",
                            "example": "1234567890abcdef",
                            "x-go-name": "ID"
                          },
                          "orgId": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "recipientId": {
                            "type": "string",
                            "description": "ID of the recipient (user) who received the certificate",
                            "example": "1234567890abcdef"
                          },
                          "recipientName": {
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
                          "issuingAuthorities": {
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
                                "signatureUrl": {
                                  "type": "string",
                                  "format": "uri",
                                  "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                                  "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                                }
                              }
                            },
                            "description": "List of issuing authorities for the certificate"
                          },
                          "issuedDate": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Date when the certificate was issued",
                            "example": "2023-10-01T12:00:00Z"
                          },
                          "expirationDate": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Date when the certificate expires (optional)",
                            "example": "2025-10-01T12:00:00Z"
                          },
                          "expiresIn": {
                            "type": "integer",
                            "description": "Number of months after which the certificate expires",
                            "example": 24
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
                                "json": "id"
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
              "registration_count"
            ],
            "properties": {
              "registration_count": {
                "type": "number",
                "x-oapi-codegen-extra-tags": {
                  "db": "registration_count,omitempty",
                  "json": "registration_count,omitempty"
                }
              }
            }
          }
        ]
      },
      "AcademyCurriculaListResponse": {
        "type": "object",
        "properties": {
          "total": {
            "type": "integer",
            "description": "Total number of Curricula",
            "example": 7
          },
          "data": {
            "type": "array",
            "items": {
              "x-go-type": "AcademyCurricula",
              "type": "object",
              "properties": {
                "id": {
                  "type": "string",
                  "description": "Id of the Curricula",
                  "example": "923458-3490394-934893",
                  "x-go-name": "ID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "id",
                    "json": "id"
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
                    "json": "org_id"
                  }
                },
                "visibility": {
                  "description": "Visibility of the Curricula",
                  "x-go-type": "Visibility",
                  "x-oapi-codegen-extra-tags": {
                    "db": "visibility",
                    "json": "visibility"
                  },
                  "type": "string",
                  "enum": [
                    "public",
                    "private"
                  ]
                },
                "status": {
                  "example": "ready",
                  "description": "Status of the Curricula",
                  "x-go-type": "Status",
                  "x-oapi-codegen-extra-tags": {
                    "db": "status",
                    "json": "status"
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
                  "description": "slug of the Curricula",
                  "example": "intro-kubernetes-course"
                },
                "level": {
                  "description": "Level of the Curricula",
                  "x-go-type": "Level",
                  "x-oapi-codegen-extra-tags": {
                    "db": "level",
                    "json": "level"
                  },
                  "type": "string",
                  "enum": [
                    "beginner",
                    "intermediate",
                    "advanced"
                  ]
                },
                "badge_id": {
                  "type": "string",
                  "format": "uuid",
                  "description": "ID of the badge to be awarded on completion of this curricula",
                  "x-go-type": "core.Uuid",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "badge_id",
                    "json": "badge_id"
                  }
                },
                "inviteId": {
                  "allOf": [
                    {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    }
                  ],
                  "description": "ID of the invite associated with this Curricula",
                  "x-oapi-codegen-extra-tags": {
                    "db": "invite_id",
                    "json": "invite_id"
                  }
                },
                "workspace_id": {
                  "allOf": [
                    {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    }
                  ],
                  "description": "ID of the workspace to which this Curricula belongs",
                  "x-oapi-codegen-extra-tags": {
                    "db": "workspace_id",
                    "json": "workspace_id"
                  }
                },
                "createdAt": {
                  "allOf": [
                    {
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    }
                  ],
                  "description": "When the Curricula item was created",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at",
                    "json": "created_at"
                  }
                },
                "updatedAt": {
                  "allOf": [
                    {
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    }
                  ],
                  "description": "When the Curricula was last updated",
                  "x-go-type": "core.Time",
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at",
                    "json": "updated_at"
                  }
                },
                "deletedAt": {
                  "allOf": [
                    {
                      "description": "Timestamp when the resource was deleted.",
                      "x-go-type": "NullTime",
                      "type": "string",
                      "format": "date-time",
                      "x-go-name": "DeletedAt",
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "yaml": "deleted_at"
                      },
                      "x-go-type-skip-optional-pointer": true
                    }
                  ],
                  "x-go-type": "core.NullTime",
                  "x-oapi-codegen-extra-tags": {
                    "db": "deleted_at",
                    "json": "deleted_at"
                  }
                },
                "metadata": {
                  "type": "object",
                  "description": "Additional metadata about the Curricula",
                  "additionalProperties": true,
                  "x-go-type": "core.Map",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "metadata",
                    "json": "metadata"
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
                          "description": "Short description of the curricula",
                          "example": "Learn how to configure your Kubernetes clusters and manage the lifecycle of your workloads"
                        },
                        "detailedDescription": {
                          "type": "string",
                          "description": "Detailed description of the curricula",
                          "example": "This learning path covers everything from Kubernetes architecture to advanced deployment strategies, including hands-on labs and real-world scenarios."
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
                        "certificate": {
                          "x-go-type": "Certificate",
                          "type": "object",
                          "required": [
                            "id",
                            "orgId",
                            "title",
                            "description",
                            "issuingAuthorities",
                            "issuedDate",
                            "recipientId",
                            "recipientName"
                          ],
                          "properties": {
                            "id": {
                              "type": "string",
                              "description": "Unique identifier for the certificate",
                              "example": "1234567890abcdef",
                              "x-go-name": "ID"
                            },
                            "orgId": {
                              "type": "string",
                              "format": "uuid",
                              "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                              "x-go-type": "uuid.UUID",
                              "x-go-type-import": {
                                "path": "github.com/gofrs/uuid"
                              }
                            },
                            "recipientId": {
                              "type": "string",
                              "description": "ID of the recipient (user) who received the certificate",
                              "example": "1234567890abcdef"
                            },
                            "recipientName": {
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
                            "issuingAuthorities": {
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
                                  "signatureUrl": {
                                    "type": "string",
                                    "format": "uri",
                                    "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                                    "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                                  }
                                }
                              },
                              "description": "List of issuing authorities for the certificate"
                            },
                            "issuedDate": {
                              "type": "string",
                              "format": "date-time",
                              "description": "Date when the certificate was issued",
                              "example": "2023-10-01T12:00:00Z"
                            },
                            "expirationDate": {
                              "type": "string",
                              "format": "date-time",
                              "description": "Date when the certificate expires (optional)",
                              "example": "2025-10-01T12:00:00Z"
                            },
                            "expiresIn": {
                              "type": "integer",
                              "description": "Number of months after which the certificate expires",
                              "example": 24
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
                                  "json": "id"
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
            "description": "Total number of Curricula",
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
                      "description": "Id of the Curricula",
                      "example": "923458-3490394-934893",
                      "x-go-name": "ID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id",
                        "json": "id"
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
                        "json": "org_id"
                      }
                    },
                    "visibility": {
                      "description": "Visibility of the Curricula",
                      "x-go-type": "Visibility",
                      "x-oapi-codegen-extra-tags": {
                        "db": "visibility",
                        "json": "visibility"
                      },
                      "type": "string",
                      "enum": [
                        "public",
                        "private"
                      ]
                    },
                    "status": {
                      "example": "ready",
                      "description": "Status of the Curricula",
                      "x-go-type": "Status",
                      "x-oapi-codegen-extra-tags": {
                        "db": "status",
                        "json": "status"
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
                      "description": "slug of the Curricula",
                      "example": "intro-kubernetes-course"
                    },
                    "level": {
                      "description": "Level of the Curricula",
                      "x-go-type": "Level",
                      "x-oapi-codegen-extra-tags": {
                        "db": "level",
                        "json": "level"
                      },
                      "type": "string",
                      "enum": [
                        "beginner",
                        "intermediate",
                        "advanced"
                      ]
                    },
                    "badge_id": {
                      "type": "string",
                      "format": "uuid",
                      "description": "ID of the badge to be awarded on completion of this curricula",
                      "x-go-type": "core.Uuid",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "badge_id",
                        "json": "badge_id"
                      }
                    },
                    "inviteId": {
                      "allOf": [
                        {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          }
                        }
                      ],
                      "description": "ID of the invite associated with this Curricula",
                      "x-oapi-codegen-extra-tags": {
                        "db": "invite_id",
                        "json": "invite_id"
                      }
                    },
                    "workspace_id": {
                      "allOf": [
                        {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          }
                        }
                      ],
                      "description": "ID of the workspace to which this Curricula belongs",
                      "x-oapi-codegen-extra-tags": {
                        "db": "workspace_id",
                        "json": "workspace_id"
                      }
                    },
                    "createdAt": {
                      "allOf": [
                        {
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        }
                      ],
                      "description": "When the Curricula item was created",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "created_at"
                      }
                    },
                    "updatedAt": {
                      "allOf": [
                        {
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        }
                      ],
                      "description": "When the Curricula was last updated",
                      "x-go-type": "core.Time",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updated_at"
                      }
                    },
                    "deletedAt": {
                      "allOf": [
                        {
                          "description": "Timestamp when the resource was deleted.",
                          "x-go-type": "NullTime",
                          "type": "string",
                          "format": "date-time",
                          "x-go-name": "DeletedAt",
                          "x-oapi-codegen-extra-tags": {
                            "db": "deleted_at",
                            "yaml": "deleted_at"
                          },
                          "x-go-type-skip-optional-pointer": true
                        }
                      ],
                      "x-go-type": "core.NullTime",
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deleted_at"
                      }
                    },
                    "metadata": {
                      "type": "object",
                      "description": "Additional metadata about the Curricula",
                      "additionalProperties": true,
                      "x-go-type": "core.Map",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata",
                        "json": "metadata"
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
                              "description": "Short description of the curricula",
                              "example": "Learn how to configure your Kubernetes clusters and manage the lifecycle of your workloads"
                            },
                            "detailedDescription": {
                              "type": "string",
                              "description": "Detailed description of the curricula",
                              "example": "This learning path covers everything from Kubernetes architecture to advanced deployment strategies, including hands-on labs and real-world scenarios."
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
                            "certificate": {
                              "x-go-type": "Certificate",
                              "type": "object",
                              "required": [
                                "id",
                                "orgId",
                                "title",
                                "description",
                                "issuingAuthorities",
                                "issuedDate",
                                "recipientId",
                                "recipientName"
                              ],
                              "properties": {
                                "id": {
                                  "type": "string",
                                  "description": "Unique identifier for the certificate",
                                  "example": "1234567890abcdef",
                                  "x-go-name": "ID"
                                },
                                "orgId": {
                                  "type": "string",
                                  "format": "uuid",
                                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                  "x-go-type": "uuid.UUID",
                                  "x-go-type-import": {
                                    "path": "github.com/gofrs/uuid"
                                  }
                                },
                                "recipientId": {
                                  "type": "string",
                                  "description": "ID of the recipient (user) who received the certificate",
                                  "example": "1234567890abcdef"
                                },
                                "recipientName": {
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
                                "issuingAuthorities": {
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
                                      "signatureUrl": {
                                        "type": "string",
                                        "format": "uri",
                                        "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                                        "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                                      }
                                    }
                                  },
                                  "description": "List of issuing authorities for the certificate"
                                },
                                "issuedDate": {
                                  "type": "string",
                                  "format": "date-time",
                                  "description": "Date when the certificate was issued",
                                  "example": "2023-10-01T12:00:00Z"
                                },
                                "expirationDate": {
                                  "type": "string",
                                  "format": "date-time",
                                  "description": "Date when the certificate expires (optional)",
                                  "example": "2025-10-01T12:00:00Z"
                                },
                                "expiresIn": {
                                  "type": "integer",
                                  "description": "Number of months after which the certificate expires",
                                  "example": 24
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
                                      "json": "id"
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
                    "registration_count"
                  ],
                  "properties": {
                    "registration_count": {
                      "type": "number",
                      "x-oapi-codegen-extra-tags": {
                        "db": "registration_count,omitempty",
                        "json": "registration_count,omitempty"
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
            "description": "Short description of the curricula",
            "example": "Learn how to configure your Kubernetes clusters and manage the lifecycle of your workloads"
          },
          "detailedDescription": {
            "type": "string",
            "description": "Detailed description of the curricula",
            "example": "This learning path covers everything from Kubernetes architecture to advanced deployment strategies, including hands-on labs and real-world scenarios."
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
          "certificate": {
            "x-go-type": "Certificate",
            "type": "object",
            "required": [
              "id",
              "orgId",
              "title",
              "description",
              "issuingAuthorities",
              "issuedDate",
              "recipientId",
              "recipientName"
            ],
            "properties": {
              "id": {
                "type": "string",
                "description": "Unique identifier for the certificate",
                "example": "1234567890abcdef",
                "x-go-name": "ID"
              },
              "orgId": {
                "type": "string",
                "format": "uuid",
                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                }
              },
              "recipientId": {
                "type": "string",
                "description": "ID of the recipient (user) who received the certificate",
                "example": "1234567890abcdef"
              },
              "recipientName": {
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
              "issuingAuthorities": {
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
                    "signatureUrl": {
                      "type": "string",
                      "format": "uri",
                      "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                      "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                    }
                  }
                },
                "description": "List of issuing authorities for the certificate"
              },
              "issuedDate": {
                "type": "string",
                "format": "date-time",
                "description": "Date when the certificate was issued",
                "example": "2023-10-01T12:00:00Z"
              },
              "expirationDate": {
                "type": "string",
                "format": "date-time",
                "description": "Date when the certificate expires (optional)",
                "example": "2025-10-01T12:00:00Z"
              },
              "expiresIn": {
                "type": "integer",
                "description": "Number of months after which the certificate expires",
                "example": 24
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
                    "json": "id"
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
            "description": "Short description of the curricula",
            "example": "Learn how to configure your Kubernetes clusters and manage the lifecycle of your workloads"
          },
          "detailedDescription": {
            "type": "string",
            "description": "Detailed description of the curricula",
            "example": "This learning path covers everything from Kubernetes architecture to advanced deployment strategies, including hands-on labs and real-world scenarios."
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
          "certificate": {
            "x-go-type": "Certificate",
            "type": "object",
            "required": [
              "id",
              "orgId",
              "title",
              "description",
              "issuingAuthorities",
              "issuedDate",
              "recipientId",
              "recipientName"
            ],
            "properties": {
              "id": {
                "type": "string",
                "description": "Unique identifier for the certificate",
                "example": "1234567890abcdef",
                "x-go-name": "ID"
              },
              "orgId": {
                "type": "string",
                "format": "uuid",
                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                }
              },
              "recipientId": {
                "type": "string",
                "description": "ID of the recipient (user) who received the certificate",
                "example": "1234567890abcdef"
              },
              "recipientName": {
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
              "issuingAuthorities": {
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
                    "signatureUrl": {
                      "type": "string",
                      "format": "uri",
                      "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                      "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                    }
                  }
                },
                "description": "List of issuing authorities for the certificate"
              },
              "issuedDate": {
                "type": "string",
                "format": "date-time",
                "description": "Date when the certificate was issued",
                "example": "2023-10-01T12:00:00Z"
              },
              "expirationDate": {
                "type": "string",
                "format": "date-time",
                "description": "Date when the certificate expires (optional)",
                "example": "2025-10-01T12:00:00Z"
              },
              "expiresIn": {
                "type": "integer",
                "description": "Number of months after which the certificate expires",
                "example": 24
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
                    "json": "id"
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
          "signatureUrl": {
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
          "orgId",
          "title",
          "description",
          "issuingAuthorities",
          "issuedDate",
          "recipientId",
          "recipientName"
        ],
        "properties": {
          "id": {
            "type": "string",
            "description": "Unique identifier for the certificate",
            "example": "1234567890abcdef",
            "x-go-name": "ID"
          },
          "orgId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "recipientId": {
            "type": "string",
            "description": "ID of the recipient (user) who received the certificate",
            "example": "1234567890abcdef"
          },
          "recipientName": {
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
          "issuingAuthorities": {
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
                "signatureUrl": {
                  "type": "string",
                  "format": "uri",
                  "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                  "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                }
              }
            },
            "description": "List of issuing authorities for the certificate"
          },
          "issuedDate": {
            "type": "string",
            "format": "date-time",
            "description": "Date when the certificate was issued",
            "example": "2023-10-01T12:00:00Z"
          },
          "expirationDate": {
            "type": "string",
            "format": "date-time",
            "description": "Date when the certificate expires (optional)",
            "example": "2025-10-01T12:00:00Z"
          },
          "expiresIn": {
            "type": "integer",
            "description": "Number of months after which the certificate expires",
            "example": 24
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
            "description": "Short description of the curricula",
            "example": "Learn how to configure your Kubernetes clusters and manage the lifecycle of your workloads"
          },
          "detailedDescription": {
            "type": "string",
            "description": "Detailed description of the curricula",
            "example": "This learning path covers everything from Kubernetes architecture to advanced deployment strategies, including hands-on labs and real-world scenarios."
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
          "certificate": {
            "x-go-type": "Certificate",
            "type": "object",
            "required": [
              "id",
              "orgId",
              "title",
              "description",
              "issuingAuthorities",
              "issuedDate",
              "recipientId",
              "recipientName"
            ],
            "properties": {
              "id": {
                "type": "string",
                "description": "Unique identifier for the certificate",
                "example": "1234567890abcdef",
                "x-go-name": "ID"
              },
              "orgId": {
                "type": "string",
                "format": "uuid",
                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                }
              },
              "recipientId": {
                "type": "string",
                "description": "ID of the recipient (user) who received the certificate",
                "example": "1234567890abcdef"
              },
              "recipientName": {
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
              "issuingAuthorities": {
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
                    "signatureUrl": {
                      "type": "string",
                      "format": "uri",
                      "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                      "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                    }
                  }
                },
                "description": "List of issuing authorities for the certificate"
              },
              "issuedDate": {
                "type": "string",
                "format": "date-time",
                "description": "Date when the certificate was issued",
                "example": "2023-10-01T12:00:00Z"
              },
              "expirationDate": {
                "type": "string",
                "format": "date-time",
                "description": "Date when the certificate expires (optional)",
                "example": "2025-10-01T12:00:00Z"
              },
              "expiresIn": {
                "type": "integer",
                "description": "Number of months after which the certificate expires",
                "example": 24
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
                    "json": "id"
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
          "test_submissions",
          "metadata"
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
            "x-go-name": "ID",
            "x-oapi-codegen-extra-tags": {
              "db": "id",
              "json": "id"
            }
          },
          "org_id": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "org_id"
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
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "user_id"
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
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true,
            "description": "When the registration was updated",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at"
            }
          },
          "created_at": {
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true,
            "description": "When the registration was created",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at"
            }
          },
          "deleted_at": {
            "description": "Timestamp when the resource was deleted.",
            "x-go-type": "NullTime",
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
            "x-go-type-skip-optional-pointer": true,
            "description": "Issued certificate for completing the curricula under registration",
            "x-oapi-codegen-extra-tags": {
              "db": "certificate"
            },
            "type": "object",
            "required": [
              "id",
              "orgId",
              "title",
              "description",
              "issuingAuthorities",
              "issuedDate",
              "recipientId",
              "recipientName"
            ],
            "properties": {
              "id": {
                "type": "string",
                "description": "Unique identifier for the certificate",
                "example": "1234567890abcdef",
                "x-go-name": "ID"
              },
              "orgId": {
                "type": "string",
                "format": "uuid",
                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                }
              },
              "recipientId": {
                "type": "string",
                "description": "ID of the recipient (user) who received the certificate",
                "example": "1234567890abcdef"
              },
              "recipientName": {
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
              "issuingAuthorities": {
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
                    "signatureUrl": {
                      "type": "string",
                      "format": "uri",
                      "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                      "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                    }
                  }
                },
                "description": "List of issuing authorities for the certificate"
              },
              "issuedDate": {
                "type": "string",
                "format": "date-time",
                "description": "Date when the certificate was issued",
                "example": "2023-10-01T12:00:00Z"
              },
              "expirationDate": {
                "type": "string",
                "format": "date-time",
                "description": "Date when the certificate expires (optional)",
                "example": "2025-10-01T12:00:00Z"
              },
              "expiresIn": {
                "type": "integer",
                "description": "Number of months after which the certificate expires",
                "example": 24
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
      "AllTestSubmissionsForCurricula": {
        "type": "object",
        "description": "Test submissions made by the user (map of test IDs to Submissions)",
        "additionalProperties": {
          "type": "array",
          "description": "Test submissions made by the user (array of QuizEvaluationResult)",
          "items": {
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
                "x-generate-db-helpers": true,
                "type": "object",
                "required": [
                  "id",
                  "title",
                  "org_id",
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
                  "max_attempts",
                  "questions",
                  "total_questions",
                  "total_questions_in_bank",
                  "total_question_sets",
                  "total_marks",
                  "prerequisites",
                  "next_page"
                ],
                "properties": {
                  "id": {
                    "type": "string",
                    "x-go-name": "ID",
                    "x-oapi-codegen-extra-tags": {
                      "json": "id"
                    }
                  },
                  "org_id": {
                    "type": "string",
                    "description": "Organization ID that owns this quiz",
                    "example": "layer5",
                    "x-oapi-codegen-extra-tags": {
                      "db": "org_id",
                      "json": "org_id"
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
                    "description": "Time limit for the quiz in minutes. A value of 0 indicates no time limit.",
                    "type": "string"
                  },
                  "max_attempts": {
                    "description": "Maximum number of attempts allowed for the quiz. A value of 0 indicates unlimited attempts.",
                    "type": "integer"
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
                        "correctAnswer"
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
                        "multipleAnswers": {
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
                              "isCorrect"
                            ],
                            "properties": {
                              "id": {
                                "type": "string"
                              },
                              "text": {
                                "type": "string"
                              },
                              "isCorrect": {
                                "type": "boolean"
                              }
                            }
                          }
                        },
                        "correctAnswer": {
                          "type": "string"
                        }
                      }
                    }
                  },
                  "total_questions": {
                    "type": "integer"
                  },
                  "total_questions_in_bank": {
                    "type": "integer"
                  },
                  "total_question_sets": {
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
                  },
                  "next_page": {
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
          "x-go-type": "TestSubmissions"
        }
      },
      "TestSubmissions": {
        "type": "array",
        "description": "Test submissions made by the user (array of QuizEvaluationResult)",
        "items": {
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
              "x-generate-db-helpers": true,
              "type": "object",
              "required": [
                "id",
                "title",
                "org_id",
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
                "max_attempts",
                "questions",
                "total_questions",
                "total_questions_in_bank",
                "total_question_sets",
                "total_marks",
                "prerequisites",
                "next_page"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "x-go-name": "ID",
                  "x-oapi-codegen-extra-tags": {
                    "json": "id"
                  }
                },
                "org_id": {
                  "type": "string",
                  "description": "Organization ID that owns this quiz",
                  "example": "layer5",
                  "x-oapi-codegen-extra-tags": {
                    "db": "org_id",
                    "json": "org_id"
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
                  "description": "Time limit for the quiz in minutes. A value of 0 indicates no time limit.",
                  "type": "string"
                },
                "max_attempts": {
                  "description": "Maximum number of attempts allowed for the quiz. A value of 0 indicates unlimited attempts.",
                  "type": "integer"
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
                      "correctAnswer"
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
                      "multipleAnswers": {
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
                            "isCorrect"
                          ],
                          "properties": {
                            "id": {
                              "type": "string"
                            },
                            "text": {
                              "type": "string"
                            },
                            "isCorrect": {
                              "type": "boolean"
                            }
                          }
                        }
                      },
                      "correctAnswer": {
                        "type": "string"
                      }
                    }
                  }
                },
                "total_questions": {
                  "type": "integer"
                },
                "total_questions_in_bank": {
                  "type": "integer"
                },
                "total_question_sets": {
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
                },
                "next_page": {
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
              "json": "id"
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
                "test_submissions",
                "metadata"
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
                  "x-go-name": "ID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "id",
                    "json": "id"
                  }
                },
                "org_id": {
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "org_id"
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
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "user_id"
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
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true,
                  "description": "When the registration was updated",
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at"
                  }
                },
                "created_at": {
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true,
                  "description": "When the registration was created",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at"
                  }
                },
                "deleted_at": {
                  "description": "Timestamp when the resource was deleted.",
                  "x-go-type": "NullTime",
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
                  "x-go-type-skip-optional-pointer": true,
                  "description": "Issued certificate for completing the curricula under registration",
                  "x-oapi-codegen-extra-tags": {
                    "db": "certificate"
                  },
                  "type": "object",
                  "required": [
                    "id",
                    "orgId",
                    "title",
                    "description",
                    "issuingAuthorities",
                    "issuedDate",
                    "recipientId",
                    "recipientName"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "description": "Unique identifier for the certificate",
                      "example": "1234567890abcdef",
                      "x-go-name": "ID"
                    },
                    "orgId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "recipientId": {
                      "type": "string",
                      "description": "ID of the recipient (user) who received the certificate",
                      "example": "1234567890abcdef"
                    },
                    "recipientName": {
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
                    "issuingAuthorities": {
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
                          "signatureUrl": {
                            "type": "string",
                            "format": "uri",
                            "description": "URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format",
                            "example": "http://localhost:9876/signatures/cloud-native-foundation.png"
                          }
                        }
                      },
                      "description": "List of issuing authorities for the certificate"
                    },
                    "issuedDate": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Date when the certificate was issued",
                      "example": "2023-10-01T12:00:00Z"
                    },
                    "expirationDate": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Date when the certificate expires (optional)",
                      "example": "2025-10-01T12:00:00Z"
                    },
                    "expiresIn": {
                      "type": "integer",
                      "description": "Number of months after which the certificate expires",
                      "example": 24
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
      "CurriculaCurrentItemData": {
        "type": "object",
        "required": [
          "id",
          "lastOpened",
          "contentType"
        ],
        "properties": {
          "id": {
            "type": "string"
          },
          "lastOpened": {
            "type": "string",
            "format": "date-time"
          },
          "contentType": {
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
      "CurriculaProgressTracker": {
        "type": "object",
        "required": [
          "currentItem",
          "grades",
          "timeSpent",
          "completed",
          "completedItems"
        ],
        "properties": {
          "currentItem": {
            "type": "object",
            "additionalProperties": {
              "x-go-type": "CurriculaCurrentItemData",
              "type": "object",
              "required": [
                "id",
                "lastOpened",
                "contentType"
              ],
              "properties": {
                "id": {
                  "type": "string"
                },
                "lastOpened": {
                  "type": "string",
                  "format": "date-time"
                },
                "contentType": {
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
                  "x-generate-db-helpers": true,
                  "type": "object",
                  "required": [
                    "id",
                    "title",
                    "org_id",
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
                    "max_attempts",
                    "questions",
                    "total_questions",
                    "total_questions_in_bank",
                    "total_question_sets",
                    "total_marks",
                    "prerequisites",
                    "next_page"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "x-go-name": "ID",
                      "x-oapi-codegen-extra-tags": {
                        "json": "id"
                      }
                    },
                    "org_id": {
                      "type": "string",
                      "description": "Organization ID that owns this quiz",
                      "example": "layer5",
                      "x-oapi-codegen-extra-tags": {
                        "db": "org_id",
                        "json": "org_id"
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
                      "description": "Time limit for the quiz in minutes. A value of 0 indicates no time limit.",
                      "type": "string"
                    },
                    "max_attempts": {
                      "description": "Maximum number of attempts allowed for the quiz. A value of 0 indicates unlimited attempts.",
                      "type": "integer"
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
                          "correctAnswer"
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
                          "multipleAnswers": {
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
                                "isCorrect"
                              ],
                              "properties": {
                                "id": {
                                  "type": "string"
                                },
                                "text": {
                                  "type": "string"
                                },
                                "isCorrect": {
                                  "type": "boolean"
                                }
                              }
                            }
                          },
                          "correctAnswer": {
                            "type": "string"
                          }
                        }
                      }
                    },
                    "total_questions": {
                      "type": "integer"
                    },
                    "total_questions_in_bank": {
                      "type": "integer"
                    },
                    "total_question_sets": {
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
                    },
                    "next_page": {
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
          "timeSpent": {
            "type": "integer",
            "description": "Total time spent in seconds"
          },
          "completedItems": {
            "type": "object",
            "description": "Items that have been completed (map of item IDs to item data)",
            "additionalProperties": {
              "x-go-type": "ProgressItemCompleted",
              "type": "object",
              "required": [
                "completedAt",
                "itemData"
              ],
              "properties": {
                "completedAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Timestamp when the item was completed"
                },
                "itemData": {
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
          "completedAt",
          "itemData"
        ],
        "properties": {
          "completedAt": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the item was completed"
          },
          "itemData": {
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
          "contentType": {
            "type": "string",
            "enum": [
              "learning-path",
              "challenge",
              "certification"
            ],
            "x-go-type": "ContentType"
          },
          "itemData": {
            "x-go-type": "CurriculaCurrentItemData",
            "type": "object",
            "required": [
              "id",
              "lastOpened",
              "contentType"
            ],
            "properties": {
              "id": {
                "type": "string"
              },
              "lastOpened": {
                "type": "string",
                "format": "date-time"
              },
              "contentType": {
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
          "contentType",
          "itemData"
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
        "x-generate-db-helpers": true,
        "type": "object",
        "required": [
          "id",
          "title",
          "org_id",
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
          "max_attempts",
          "questions",
          "total_questions",
          "total_questions_in_bank",
          "total_question_sets",
          "total_marks",
          "prerequisites",
          "next_page"
        ],
        "properties": {
          "id": {
            "type": "string",
            "x-go-name": "ID",
            "x-oapi-codegen-extra-tags": {
              "json": "id"
            }
          },
          "org_id": {
            "type": "string",
            "description": "Organization ID that owns this quiz",
            "example": "layer5",
            "x-oapi-codegen-extra-tags": {
              "db": "org_id",
              "json": "org_id"
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
            "description": "Time limit for the quiz in minutes. A value of 0 indicates no time limit.",
            "type": "string"
          },
          "max_attempts": {
            "description": "Maximum number of attempts allowed for the quiz. A value of 0 indicates unlimited attempts.",
            "type": "integer"
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
                "correctAnswer"
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
                "multipleAnswers": {
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
                      "isCorrect"
                    ],
                    "properties": {
                      "id": {
                        "type": "string"
                      },
                      "text": {
                        "type": "string"
                      },
                      "isCorrect": {
                        "type": "boolean"
                      }
                    }
                  }
                },
                "correctAnswer": {
                  "type": "string"
                }
              }
            }
          },
          "total_questions": {
            "type": "integer"
          },
          "total_questions_in_bank": {
            "type": "integer"
          },
          "total_question_sets": {
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
          },
          "next_page": {
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
          "correctAnswer"
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
          "multipleAnswers": {
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
                "isCorrect"
              ],
              "properties": {
                "id": {
                  "type": "string"
                },
                "text": {
                  "type": "string"
                },
                "isCorrect": {
                  "type": "boolean"
                }
              }
            }
          },
          "correctAnswer": {
            "type": "string"
          }
        }
      },
      "QuestionOption": {
        "type": "object",
        "required": [
          "id",
          "text",
          "isCorrect"
        ],
        "properties": {
          "id": {
            "type": "string"
          },
          "text": {
            "type": "string"
          },
          "isCorrect": {
            "type": "boolean"
          }
        }
      },
      "StartTestRequest": {
        "type": "object",
        "required": [
          "testAbsPath",
          "registrationId"
        ],
        "properties": {
          "testAbsPath": {
            "type": "string"
          },
          "registrationId": {
            "type": "string"
          }
        }
      },
      "QuizSubmission": {
        "type": "object",
        "required": [
          "quizAbsPath",
          "registrationId",
          "testSessionId",
          "user_id",
          "answers"
        ],
        "properties": {
          "testSessionId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "quizAbsPath": {
            "type": "string"
          },
          "registrationId": {
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
                "questionId",
                "selectedOptionId",
                "answerText"
              ],
              "properties": {
                "questionId": {
                  "type": "string"
                },
                "selectedOptionId": {
                  "type": "object",
                  "additionalProperties": {
                    "type": "boolean"
                  }
                },
                "answerText": {
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
          "questionId",
          "selectedOptionId",
          "answerText"
        ],
        "properties": {
          "questionId": {
            "type": "string"
          },
          "selectedOptionId": {
            "type": "object",
            "additionalProperties": {
              "type": "boolean"
            }
          },
          "answerText": {
            "type": "string"
          }
        }
      },
      "TestSubmissionStatus": {
        "type": "string",
        "enum": [
          "not-attempted",
          "failed",
          "passed"
        ],
        "x-enum-varnames": [
          "TestSubmissionStatusNotAttempted",
          "TestSubmissionStatusFailed",
          "TestSubmissionStatusPassed"
        ]
      },
      "TestSubmission": {
        "type": "object",
        "required": [
          "id",
          "registration_id",
          "test_abs_path",
          "user_id",
          "created_at",
          "status",
          "test"
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
            "x-go-name": "ID",
            "x-oapi-codegen-extra-tags": {
              "db": "id",
              "json": "id"
            }
          },
          "registration_id": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "registration_id",
              "json": "registration_id"
            }
          },
          "test_abs_path": {
            "type": "string",
            "x-oapi-codegen-extra-tags": {
              "db": "test_abs_path"
            }
          },
          "user_id": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "user_id"
            }
          },
          "created_at": {
            "description": "When the submission was created or started",
            "type": "string",
            "format": "date-time",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at"
            }
          },
          "updated_at": {
            "description": "When the submission was last updated",
            "type": "string",
            "format": "date-time",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at"
            }
          },
          "deleted_at": {
            "description": "Timestamp when the resource was deleted.",
            "x-go-type": "NullTime",
            "type": "string",
            "format": "date-time",
            "x-go-name": "DeletedAt",
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at",
              "yaml": "deleted_at"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "submitted_at": {
            "type": "string",
            "format": "date-time",
            "x-oapi-codegen-extra-tags": {
              "db": "submitted_at"
            }
          },
          "submission_data": {
            "type": "object",
            "required": [
              "quizAbsPath",
              "registrationId",
              "testSessionId",
              "user_id",
              "answers"
            ],
            "properties": {
              "testSessionId": {
                "type": "string",
                "format": "uuid",
                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                }
              },
              "quizAbsPath": {
                "type": "string"
              },
              "registrationId": {
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
                    "questionId",
                    "selectedOptionId",
                    "answerText"
                  ],
                  "properties": {
                    "questionId": {
                      "type": "string"
                    },
                    "selectedOptionId": {
                      "type": "object",
                      "additionalProperties": {
                        "type": "boolean"
                      }
                    },
                    "answerText": {
                      "type": "string"
                    }
                  }
                }
              }
            },
            "x-go-type": "QuizSubmission",
            "x-oapi-codegen-extra-tags": {
              "db": "submission_data"
            }
          },
          "expires_at": {
            "type": "string",
            "description": "Expiry time for the test submission ( based on the time limit of the test )",
            "format": "date-time",
            "x-oapi-codegen-extra-tags": {
              "db": "expires_at"
            }
          },
          "status": {
            "x-go-type": "TestSubmissionStatus",
            "type": "string",
            "enum": [
              "not-attempted",
              "failed",
              "passed"
            ],
            "x-enum-varnames": [
              "TestSubmissionStatusNotAttempted",
              "TestSubmissionStatusFailed",
              "TestSubmissionStatusPassed"
            ]
          },
          "result": {
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
                "x-generate-db-helpers": true,
                "type": "object",
                "required": [
                  "id",
                  "title",
                  "org_id",
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
                  "max_attempts",
                  "questions",
                  "total_questions",
                  "total_questions_in_bank",
                  "total_question_sets",
                  "total_marks",
                  "prerequisites",
                  "next_page"
                ],
                "properties": {
                  "id": {
                    "type": "string",
                    "x-go-name": "ID",
                    "x-oapi-codegen-extra-tags": {
                      "json": "id"
                    }
                  },
                  "org_id": {
                    "type": "string",
                    "description": "Organization ID that owns this quiz",
                    "example": "layer5",
                    "x-oapi-codegen-extra-tags": {
                      "db": "org_id",
                      "json": "org_id"
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
                    "description": "Time limit for the quiz in minutes. A value of 0 indicates no time limit.",
                    "type": "string"
                  },
                  "max_attempts": {
                    "description": "Maximum number of attempts allowed for the quiz. A value of 0 indicates unlimited attempts.",
                    "type": "integer"
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
                        "correctAnswer"
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
                        "multipleAnswers": {
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
                              "isCorrect"
                            ],
                            "properties": {
                              "id": {
                                "type": "string"
                              },
                              "text": {
                                "type": "string"
                              },
                              "isCorrect": {
                                "type": "boolean"
                              }
                            }
                          }
                        },
                        "correctAnswer": {
                          "type": "string"
                        }
                      }
                    }
                  },
                  "total_questions": {
                    "type": "integer"
                  },
                  "total_questions_in_bank": {
                    "type": "integer"
                  },
                  "total_question_sets": {
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
                  },
                  "next_page": {
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
            },
            "x-go-type": "QuizEvaluationResult",
            "x-oapi-codegen-extra-tags": {
              "db": "result"
            }
          },
          "test": {
            "x-generate-db-helpers": true,
            "type": "object",
            "required": [
              "id",
              "title",
              "org_id",
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
              "max_attempts",
              "questions",
              "total_questions",
              "total_questions_in_bank",
              "total_question_sets",
              "total_marks",
              "prerequisites",
              "next_page"
            ],
            "properties": {
              "id": {
                "type": "string",
                "x-go-name": "ID",
                "x-oapi-codegen-extra-tags": {
                  "json": "id"
                }
              },
              "org_id": {
                "type": "string",
                "description": "Organization ID that owns this quiz",
                "example": "layer5",
                "x-oapi-codegen-extra-tags": {
                  "db": "org_id",
                  "json": "org_id"
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
                "description": "Time limit for the quiz in minutes. A value of 0 indicates no time limit.",
                "type": "string"
              },
              "max_attempts": {
                "description": "Maximum number of attempts allowed for the quiz. A value of 0 indicates unlimited attempts.",
                "type": "integer"
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
                    "correctAnswer"
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
                    "multipleAnswers": {
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
                          "isCorrect"
                        ],
                        "properties": {
                          "id": {
                            "type": "string"
                          },
                          "text": {
                            "type": "string"
                          },
                          "isCorrect": {
                            "type": "boolean"
                          }
                        }
                      }
                    },
                    "correctAnswer": {
                      "type": "string"
                    }
                  }
                }
              },
              "total_questions": {
                "type": "integer"
              },
              "total_questions_in_bank": {
                "type": "integer"
              },
              "total_question_sets": {
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
              },
              "next_page": {
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
            "x-go-type": "Quiz"
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
            "x-generate-db-helpers": true,
            "type": "object",
            "required": [
              "id",
              "title",
              "org_id",
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
              "max_attempts",
              "questions",
              "total_questions",
              "total_questions_in_bank",
              "total_question_sets",
              "total_marks",
              "prerequisites",
              "next_page"
            ],
            "properties": {
              "id": {
                "type": "string",
                "x-go-name": "ID",
                "x-oapi-codegen-extra-tags": {
                  "json": "id"
                }
              },
              "org_id": {
                "type": "string",
                "description": "Organization ID that owns this quiz",
                "example": "layer5",
                "x-oapi-codegen-extra-tags": {
                  "db": "org_id",
                  "json": "org_id"
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
                "description": "Time limit for the quiz in minutes. A value of 0 indicates no time limit.",
                "type": "string"
              },
              "max_attempts": {
                "description": "Maximum number of attempts allowed for the quiz. A value of 0 indicates unlimited attempts.",
                "type": "integer"
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
                    "correctAnswer"
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
                    "multipleAnswers": {
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
                          "isCorrect"
                        ],
                        "properties": {
                          "id": {
                            "type": "string"
                          },
                          "text": {
                            "type": "string"
                          },
                          "isCorrect": {
                            "type": "boolean"
                          }
                        }
                      }
                    },
                    "correctAnswer": {
                      "type": "string"
                    }
                  }
                }
              },
              "total_questions": {
                "type": "integer"
              },
              "total_questions_in_bank": {
                "type": "integer"
              },
              "total_question_sets": {
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
              },
              "next_page": {
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
      },
      "UpdateCurrentItemProgressResponse": {
        "type": "object",
        "properties": {
          "message": {
            "type": "string"
          },
          "progressTracker": {
            "type": "object",
            "required": [
              "currentItem",
              "grades",
              "timeSpent",
              "completed",
              "completedItems"
            ],
            "properties": {
              "currentItem": {
                "type": "object",
                "additionalProperties": {
                  "x-go-type": "CurriculaCurrentItemData",
                  "type": "object",
                  "required": [
                    "id",
                    "lastOpened",
                    "contentType"
                  ],
                  "properties": {
                    "id": {
                      "type": "string"
                    },
                    "lastOpened": {
                      "type": "string",
                      "format": "date-time"
                    },
                    "contentType": {
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
                      "x-generate-db-helpers": true,
                      "type": "object",
                      "required": [
                        "id",
                        "title",
                        "org_id",
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
                        "max_attempts",
                        "questions",
                        "total_questions",
                        "total_questions_in_bank",
                        "total_question_sets",
                        "total_marks",
                        "prerequisites",
                        "next_page"
                      ],
                      "properties": {
                        "id": {
                          "type": "string",
                          "x-go-name": "ID",
                          "x-oapi-codegen-extra-tags": {
                            "json": "id"
                          }
                        },
                        "org_id": {
                          "type": "string",
                          "description": "Organization ID that owns this quiz",
                          "example": "layer5",
                          "x-oapi-codegen-extra-tags": {
                            "db": "org_id",
                            "json": "org_id"
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
                          "description": "Time limit for the quiz in minutes. A value of 0 indicates no time limit.",
                          "type": "string"
                        },
                        "max_attempts": {
                          "description": "Maximum number of attempts allowed for the quiz. A value of 0 indicates unlimited attempts.",
                          "type": "integer"
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
                              "correctAnswer"
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
                              "multipleAnswers": {
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
                                    "isCorrect"
                                  ],
                                  "properties": {
                                    "id": {
                                      "type": "string"
                                    },
                                    "text": {
                                      "type": "string"
                                    },
                                    "isCorrect": {
                                      "type": "boolean"
                                    }
                                  }
                                }
                              },
                              "correctAnswer": {
                                "type": "string"
                              }
                            }
                          }
                        },
                        "total_questions": {
                          "type": "integer"
                        },
                        "total_questions_in_bank": {
                          "type": "integer"
                        },
                        "total_question_sets": {
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
                        },
                        "next_page": {
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
              "timeSpent": {
                "type": "integer",
                "description": "Total time spent in seconds"
              },
              "completedItems": {
                "type": "object",
                "description": "Items that have been completed (map of item IDs to item data)",
                "additionalProperties": {
                  "x-go-type": "ProgressItemCompleted",
                  "type": "object",
                  "required": [
                    "completedAt",
                    "itemData"
                  ],
                  "properties": {
                    "completedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the item was completed"
                    },
                    "itemData": {
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
          "registrationId": {
            "type": "string"
          },
          "contentType": {
            "type": "string",
            "enum": [
              "learning-path",
              "challenge",
              "certification"
            ]
          },
          "itemData": {
            "type": "object",
            "required": [
              "id",
              "lastOpened",
              "contentType"
            ],
            "properties": {
              "id": {
                "type": "string"
              },
              "lastOpened": {
                "type": "string",
                "format": "date-time"
              },
              "contentType": {
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
};

export default AcademySchema;
