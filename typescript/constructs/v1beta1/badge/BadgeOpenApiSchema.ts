/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const schema = {
  "openapi": "3.0.0",
  "info": {
    "title": "badge",
    "description": "OpenAPI schema for managing badges",
    "version": "v1beta1"
  },
  "tags": [
    {
      "name": "Badge"
    }
  ],
  "paths": {
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
                      "db": "svg_location",
                      "json": "svg_location"
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
                        "db": "svg_location",
                        "json": "svg_location"
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
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
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
              "db": "svg_location",
              "json": "svg_location"
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
      }
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
};

export default schema;
