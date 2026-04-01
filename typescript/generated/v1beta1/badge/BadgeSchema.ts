/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const BadgeSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Badge",
    "description": "OpenAPI schema for managing badges.",
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
  "tags": [
    {
      "name": "Badge"
    }
  ],
  "paths": {
    "/api/organizations/badges/{id}": {
      "delete": {
        "x-internal": [
          "cloud"
        ],
        "operationId": "deleteBadgeById",
        "tags": [
          "Badge"
        ],
        "summary": "Delete a badge by its ID",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "Unique identifier",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
              "x-go-type-skip-optional-pointer": true
            },
            "required": true
          }
        ],
        "responses": {
          "204": {
            "description": "Badge deleted"
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
      "get": {
        "x-internal": [
          "cloud"
        ],
        "operationId": "getBadgeById",
        "tags": [
          "Badge"
        ],
        "summary": "Get a badge by its ID",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "Unique identifier",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
              "x-go-type-skip-optional-pointer": true
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "schema": {
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
                      },
                      "maxLength": 500
                    },
                    "name": {
                      "type": "string",
                      "description": "Concise descriptor for the badge or certificate.",
                      "example": "Kubernetes Expert",
                      "x-oapi-codegen-extra-tags": {
                        "db": "name",
                        "json": "name"
                      },
                      "minLength": 1,
                      "maxLength": 255
                    },
                    "description": {
                      "type": "string",
                      "description": "A description of the milestone achieved, often including criteria for receiving this recognition.",
                      "example": "Awarded for mastering Kubernetes concepts and practices.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "description",
                        "json": "description"
                      },
                      "maxLength": 5000
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
                      "type": "string",
                      "format": "date-time",
                      "x-go-type": "core.NullTime",
                      "description": "Timestamp when the resource was deleted, if applicable",
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deleted_at"
                      }
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
      }
    },
    "/api/organizations/badges": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "operationId": "createOrUpdateBadge",
        "tags": [
          "Badge"
        ],
        "summary": "Create a new badge or update an existing badge",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for creating or updating a badge.",
                "required": [
                  "label",
                  "name",
                  "org_id",
                  "description",
                  "image_url"
                ],
                "properties": {
                  "id": {
                    "x-go-name": "ID",
                    "description": "Existing badge ID for updates; omit on create.",
                    "x-oapi-codegen-extra-tags": {
                      "db": "id",
                      "json": "id,omitempty"
                    },
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  },
                  "org_id": {
                    "description": "The ID of the organization in which this badge is available.",
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
                    },
                    "maxLength": 500
                  },
                  "name": {
                    "type": "string",
                    "description": "Concise descriptor for the badge or certificate.",
                    "example": "Kubernetes Expert",
                    "x-oapi-codegen-extra-tags": {
                      "db": "name",
                      "json": "name"
                    },
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "description": {
                    "type": "string",
                    "description": "A description of the milestone achieved, often including criteria for receiving this recognition.",
                    "example": "Awarded for mastering Kubernetes concepts and practices.",
                    "x-oapi-codegen-extra-tags": {
                      "db": "description",
                      "json": "description"
                    },
                    "maxLength": 5000
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
                  }
                }
              }
            }
          },
          "required": true
        },
        "responses": {
          "201": {
            "content": {
              "application/json": {
                "schema": {
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
                      },
                      "maxLength": 500
                    },
                    "name": {
                      "type": "string",
                      "description": "Concise descriptor for the badge or certificate.",
                      "example": "Kubernetes Expert",
                      "x-oapi-codegen-extra-tags": {
                        "db": "name",
                        "json": "name"
                      },
                      "minLength": 1,
                      "maxLength": 255
                    },
                    "description": {
                      "type": "string",
                      "description": "A description of the milestone achieved, often including criteria for receiving this recognition.",
                      "example": "Awarded for mastering Kubernetes concepts and practices.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "description",
                        "json": "description"
                      },
                      "maxLength": 5000
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
                      "type": "string",
                      "format": "date-time",
                      "x-go-type": "core.NullTime",
                      "description": "Timestamp when the resource was deleted, if applicable",
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deleted_at"
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
      }
    },
    "/api/identity/badges": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "operationId": "getAvailableBadges",
        "tags": [
          "Badge"
        ],
        "summary": "Get available badges",
        "responses": {
          "200": {
            "description": "Available badges",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "badges": {
                      "type": "object",
                      "additionalProperties": {
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
                            },
                            "maxLength": 500
                          },
                          "name": {
                            "type": "string",
                            "description": "Concise descriptor for the badge or certificate.",
                            "example": "Kubernetes Expert",
                            "x-oapi-codegen-extra-tags": {
                              "db": "name",
                              "json": "name"
                            },
                            "minLength": 1,
                            "maxLength": 255
                          },
                          "description": {
                            "type": "string",
                            "description": "A description of the milestone achieved, often including criteria for receiving this recognition.",
                            "example": "Awarded for mastering Kubernetes concepts and practices.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "description",
                              "json": "description"
                            },
                            "maxLength": 5000
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
                            "type": "string",
                            "format": "date-time",
                            "x-go-type": "core.NullTime",
                            "description": "Timestamp when the resource was deleted, if applicable",
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "json": "deleted_at"
                            }
                          }
                        }
                      },
                      "description": "The badges of the badgespage."
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
    "/api/identity/users/badges": {
      "put": {
        "x-internal": [
          "cloud"
        ],
        "operationId": "assignBadges",
        "tags": [
          "Badge"
        ],
        "summary": "Assign badges to a user",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "badges": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    },
                    "description": "The badges of the badgeassignment."
                  },
                  "user_id": {
                    "type": "string",
                    "description": "ID of the user who owns or created this resource.",
                    "maxLength": 500,
                    "format": "uuid"
                  },
                  "notify": {
                    "type": "boolean",
                    "description": "The notify of the badgeassignment."
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Badge assignment result",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": true
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
    "schemas": {
      "BadgePayload": {
        "type": "object",
        "description": "Payload for creating or updating a badge.",
        "required": [
          "label",
          "name",
          "org_id",
          "description",
          "image_url"
        ],
        "properties": {
          "id": {
            "x-go-name": "ID",
            "description": "Existing badge ID for updates; omit on create.",
            "x-oapi-codegen-extra-tags": {
              "db": "id",
              "json": "id,omitempty"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "org_id": {
            "description": "The ID of the organization in which this badge is available.",
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
            },
            "maxLength": 500
          },
          "name": {
            "type": "string",
            "description": "Concise descriptor for the badge or certificate.",
            "example": "Kubernetes Expert",
            "x-oapi-codegen-extra-tags": {
              "db": "name",
              "json": "name"
            },
            "minLength": 1,
            "maxLength": 255
          },
          "description": {
            "type": "string",
            "description": "A description of the milestone achieved, often including criteria for receiving this recognition.",
            "example": "Awarded for mastering Kubernetes concepts and practices.",
            "x-oapi-codegen-extra-tags": {
              "db": "description",
              "json": "description"
            },
            "maxLength": 5000
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
          }
        }
      },
      "Badge": {
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
            },
            "maxLength": 500
          },
          "name": {
            "type": "string",
            "description": "Concise descriptor for the badge or certificate.",
            "example": "Kubernetes Expert",
            "x-oapi-codegen-extra-tags": {
              "db": "name",
              "json": "name"
            },
            "minLength": 1,
            "maxLength": 255
          },
          "description": {
            "type": "string",
            "description": "A description of the milestone achieved, often including criteria for receiving this recognition.",
            "example": "Awarded for mastering Kubernetes concepts and practices.",
            "x-oapi-codegen-extra-tags": {
              "db": "description",
              "json": "description"
            },
            "maxLength": 5000
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
            "type": "string",
            "format": "date-time",
            "x-go-type": "core.NullTime",
            "description": "Timestamp when the resource was deleted, if applicable",
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at",
              "json": "deleted_at"
            }
          }
        }
      },
      "BadgesPage": {
        "type": "object",
        "properties": {
          "badges": {
            "type": "object",
            "additionalProperties": {
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
                  },
                  "maxLength": 500
                },
                "name": {
                  "type": "string",
                  "description": "Concise descriptor for the badge or certificate.",
                  "example": "Kubernetes Expert",
                  "x-oapi-codegen-extra-tags": {
                    "db": "name",
                    "json": "name"
                  },
                  "minLength": 1,
                  "maxLength": 255
                },
                "description": {
                  "type": "string",
                  "description": "A description of the milestone achieved, often including criteria for receiving this recognition.",
                  "example": "Awarded for mastering Kubernetes concepts and practices.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "description",
                    "json": "description"
                  },
                  "maxLength": 5000
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
                  "type": "string",
                  "format": "date-time",
                  "x-go-type": "core.NullTime",
                  "description": "Timestamp when the resource was deleted, if applicable",
                  "x-oapi-codegen-extra-tags": {
                    "db": "deleted_at",
                    "json": "deleted_at"
                  }
                }
              }
            },
            "description": "The badges of the badgespage."
          }
        }
      },
      "BadgeAssignmentPayload": {
        "type": "object",
        "properties": {
          "badges": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "The badges of the badgeassignment."
          },
          "user_id": {
            "type": "string",
            "description": "ID of the user who owns or created this resource.",
            "maxLength": 500,
            "format": "uuid"
          },
          "notify": {
            "type": "boolean",
            "description": "The notify of the badgeassignment."
          }
        }
      }
    }
  }
};

export default BadgeSchema;
