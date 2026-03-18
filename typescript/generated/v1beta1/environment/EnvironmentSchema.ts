/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const EnvironmentSchema = {
  "openapi": "3.0.0",
  "info": {
    "title": "Environment",
    "description": "OpenAPI schema for environment management in Meshery Cloud.",
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
  "servers": [
    {
      "url": "http://localhost:9081",
      "description": "Meshery Server development server URL (controlled via PORT environment variable)"
    }
  ],
  "security": [
    {
      "jwt": []
    }
  ],
  "tags": [
    {
      "name": "environments",
      "description": "APIs for environments"
    }
  ],
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
      "environmentId": {
        "name": "environmentId",
        "in": "path",
        "description": "Environment ID",
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
      },
      "orgIDQuery": {
        "name": "orgID",
        "in": "query",
        "description": "User's organization ID",
        "schema": {
          "type": "string"
        },
        "required": true
      }
    },
    "securitySchemes": {
      "jwt": {
        "type": "http",
        "scheme": "Bearer",
        "bearerFormat": "JWT"
      }
    },
    "schemas": {
      "environment": {
        "$id": "https://schemas.meshery.io/environment.yaml",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "description": "Meshery Environments allow you to logically group related Connections and their associated Credentials.. Learn more at https://docs.meshery.io/concepts/logical/environments",
        "additionalProperties": false,
        "type": "object",
        "required": [
          "id",
          "schemaVersion",
          "name",
          "description",
          "organization_id"
        ],
        "properties": {
          "id": {
            "description": "ID",
            "x-order": 1,
            "x-go-name": "ID",
            "x-oapi-codegen-extra-tags": {
              "db": "id",
              "yaml": "id"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "schemaVersion": {
            "description": "Specifies the version of the schema to which the environment conforms.",
            "x-order": 2,
            "x-oapi-codegen-extra-tags": {
              "yaml": "schemaVersion",
              "db": "-",
              "gorm": "-"
            },
            "default": "environments.meshery.io/v1beta1",
            "type": "string",
            "minLength": 2,
            "maxLength": 100,
            "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
            "example": [
              "v1",
              "v1alpha1",
              "v2beta3",
              "v1.custom-suffix",
              "models.meshery.io/v1beta1",
              "capability.meshery.io/v1alpha1"
            ]
          },
          "name": {
            "x-oapi-codegen-extra-tags": {
              "db": "name",
              "yaml": "name"
            },
            "x-order": 3,
            "type": "string",
            "description": "Environment name"
          },
          "description": {
            "x-oapi-codegen-extra-tags": {
              "db": "description",
              "yaml": "description"
            },
            "x-order": 4,
            "type": "string",
            "description": "Environment description"
          },
          "organization_id": {
            "x-go-name": "OrganizationID",
            "x-oapi-codegen-extra-tags": {
              "db": "organization_id",
              "yaml": "organization_id"
            },
            "x-order": 5,
            "description": "Environment organization ID",
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "owner": {
            "x-oapi-codegen-extra-tags": {
              "db": "owner",
              "yaml": "owner"
            },
            "x-order": 6,
            "description": "Environment owner",
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "created_at": {
            "x-oapi-codegen-extra-tags": {
              "db": "created_at",
              "yaml": "created_at"
            },
            "x-order": 7,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "metadata": {
            "x-oapi-codegen-extra-tags": {
              "db": "metadata",
              "yaml": "metadata"
            },
            "x-order": 8,
            "x-go-type": "core.Map",
            "x-go-type-skip-optional-pointer": true,
            "type": "object"
          },
          "updated_at": {
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at",
              "yaml": "updated_at"
            },
            "x-order": 9,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deleted_at": {
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at",
              "yaml": "deleted_at"
            },
            "x-order": 10,
            "description": "SQL null Timestamp to handle null values of time.",
            "x-go-type": "sql.NullTime",
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "environmentConnectionMapping": {
        "properties": {
          "ID": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "id",
              "json": "id"
            },
            "x-go-type-name": "GeneralId",
            "x-go-type-skip-optional-pointer": true
          },
          "environment_id": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "environment_id",
              "json": "environment_id"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "connection_id": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "connection_id",
              "json": "connection_id"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "created_at": {
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updated_at": {
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deleted_at": {
            "description": "SQL null Timestamp to handle null values of time.",
            "x-go-type": "sql.NullTime",
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "environmentPayload": {
        "properties": {
          "name": {
            "description": "An environment is a collection of resources. Provide a name that meaningfully represents these resources. You can change the name of the environment even after its creation.",
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "description": {
            "description": "An environment is a collection of resources, such as connections & credentail. Provide a detailed description to clarify the purpose of this environment and the types of resources it encompasses. You can modify the description at any Time. Learn more about environments [here](https://docs.meshery.io/concepts/logical/environments).",
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "OrganizationID": {
            "type": "string",
            "description": "Select an organization in which you want to create this new environment. Keep in mind that the organization cannot be changed after creation.",
            "x-go-type-skip-optional-pointer": true,
            "x-go-name": "OrgId",
            "x-oapi-codegen-extra-tags": {
              "json": "organization_id"
            }
          }
        },
        "required": [
          "name",
          "organizationID"
        ]
      },
      "environmentPage": {
        "properties": {
          "page": {
            "type": "integer",
            "x-go-type-skip-optional-pointer": true
          },
          "page_size": {
            "type": "integer",
            "x-go-type-skip-optional-pointer": true
          },
          "total_count": {
            "type": "integer",
            "x-go-type-skip-optional-pointer": true
          },
          "environments": {
            "type": "array",
            "x-go-type-skip-optional-pointer": true,
            "items": {
              "x-go-type": "Environment",
              "$id": "https://schemas.meshery.io/environment.yaml",
              "$schema": "http://json-schema.org/draft-07/schema#",
              "description": "Meshery Environments allow you to logically group related Connections and their associated Credentials.. Learn more at https://docs.meshery.io/concepts/logical/environments",
              "additionalProperties": false,
              "type": "object",
              "required": [
                "id",
                "schemaVersion",
                "name",
                "description",
                "organization_id"
              ],
              "properties": {
                "id": {
                  "description": "ID",
                  "x-order": 1,
                  "x-go-name": "ID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "id",
                    "yaml": "id"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "schemaVersion": {
                  "description": "Specifies the version of the schema to which the environment conforms.",
                  "x-order": 2,
                  "x-oapi-codegen-extra-tags": {
                    "yaml": "schemaVersion",
                    "db": "-",
                    "gorm": "-"
                  },
                  "default": "environments.meshery.io/v1beta1",
                  "type": "string",
                  "minLength": 2,
                  "maxLength": 100,
                  "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                  "example": [
                    "v1",
                    "v1alpha1",
                    "v2beta3",
                    "v1.custom-suffix",
                    "models.meshery.io/v1beta1",
                    "capability.meshery.io/v1alpha1"
                  ]
                },
                "name": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "name",
                    "yaml": "name"
                  },
                  "x-order": 3,
                  "type": "string",
                  "description": "Environment name"
                },
                "description": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "description",
                    "yaml": "description"
                  },
                  "x-order": 4,
                  "type": "string",
                  "description": "Environment description"
                },
                "organization_id": {
                  "x-go-name": "OrganizationID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "organization_id",
                    "yaml": "organization_id"
                  },
                  "x-order": 5,
                  "description": "Environment organization ID",
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "owner": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "owner",
                    "yaml": "owner"
                  },
                  "x-order": 6,
                  "description": "Environment owner",
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "created_at": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at",
                    "yaml": "created_at"
                  },
                  "x-order": 7,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "metadata": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "metadata",
                    "yaml": "metadata"
                  },
                  "x-order": 8,
                  "x-go-type": "core.Map",
                  "x-go-type-skip-optional-pointer": true,
                  "type": "object"
                },
                "updated_at": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at",
                    "yaml": "updated_at"
                  },
                  "x-order": 9,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "deleted_at": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "deleted_at",
                    "yaml": "deleted_at"
                  },
                  "x-order": 10,
                  "description": "SQL null Timestamp to handle null values of time.",
                  "x-go-type": "sql.NullTime",
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                }
              }
            }
          }
        }
      }
    },
    "requestBodies": {
      "environmentPayload": {
        "description": "Body for creating environment",
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "properties": {
                "name": {
                  "description": "An environment is a collection of resources. Provide a name that meaningfully represents these resources. You can change the name of the environment even after its creation.",
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "description": {
                  "description": "An environment is a collection of resources, such as connections & credentail. Provide a detailed description to clarify the purpose of this environment and the types of resources it encompasses. You can modify the description at any Time. Learn more about environments [here](https://docs.meshery.io/concepts/logical/environments).",
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "OrganizationID": {
                  "type": "string",
                  "description": "Select an organization in which you want to create this new environment. Keep in mind that the organization cannot be changed after creation.",
                  "x-go-type-skip-optional-pointer": true,
                  "x-go-name": "OrgId",
                  "x-oapi-codegen-extra-tags": {
                    "json": "organization_id"
                  }
                }
              },
              "required": [
                "name",
                "organizationID"
              ]
            }
          }
        }
      }
    }
  },
  "paths": {
    "/api/environments": {
      "post": {
        "tags": [
          "environments"
        ],
        "operationId": "CreateEnvironment",
        "summary": "Create an environment",
        "description": "Creates a new environment",
        "requestBody": {
          "description": "Body for creating environment",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "properties": {
                  "name": {
                    "description": "An environment is a collection of resources. Provide a name that meaningfully represents these resources. You can change the name of the environment even after its creation.",
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "description": {
                    "description": "An environment is a collection of resources, such as connections & credentail. Provide a detailed description to clarify the purpose of this environment and the types of resources it encompasses. You can modify the description at any Time. Learn more about environments [here](https://docs.meshery.io/concepts/logical/environments).",
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "OrganizationID": {
                    "type": "string",
                    "description": "Select an organization in which you want to create this new environment. Keep in mind that the organization cannot be changed after creation.",
                    "x-go-type-skip-optional-pointer": true,
                    "x-go-name": "OrgId",
                    "x-oapi-codegen-extra-tags": {
                      "json": "organization_id"
                    }
                  }
                },
                "required": [
                  "name",
                  "organizationID"
                ]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Created environment",
            "content": {
              "application/json": {
                "schema": {
                  "$id": "https://schemas.meshery.io/environment.yaml",
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "description": "Meshery Environments allow you to logically group related Connections and their associated Credentials.. Learn more at https://docs.meshery.io/concepts/logical/environments",
                  "additionalProperties": false,
                  "type": "object",
                  "required": [
                    "id",
                    "schemaVersion",
                    "name",
                    "description",
                    "organization_id"
                  ],
                  "properties": {
                    "id": {
                      "description": "ID",
                      "x-order": 1,
                      "x-go-name": "ID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id",
                        "yaml": "id"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "schemaVersion": {
                      "description": "Specifies the version of the schema to which the environment conforms.",
                      "x-order": 2,
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "schemaVersion",
                        "db": "-",
                        "gorm": "-"
                      },
                      "default": "environments.meshery.io/v1beta1",
                      "type": "string",
                      "minLength": 2,
                      "maxLength": 100,
                      "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                      "example": [
                        "v1",
                        "v1alpha1",
                        "v2beta3",
                        "v1.custom-suffix",
                        "models.meshery.io/v1beta1",
                        "capability.meshery.io/v1alpha1"
                      ]
                    },
                    "name": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "name",
                        "yaml": "name"
                      },
                      "x-order": 3,
                      "type": "string",
                      "description": "Environment name"
                    },
                    "description": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "description",
                        "yaml": "description"
                      },
                      "x-order": 4,
                      "type": "string",
                      "description": "Environment description"
                    },
                    "organization_id": {
                      "x-go-name": "OrganizationID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "organization_id",
                        "yaml": "organization_id"
                      },
                      "x-order": 5,
                      "description": "Environment organization ID",
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "owner": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner",
                        "yaml": "owner"
                      },
                      "x-order": 6,
                      "description": "Environment owner",
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "created_at": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "yaml": "created_at"
                      },
                      "x-order": 7,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "metadata": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata",
                        "yaml": "metadata"
                      },
                      "x-order": 8,
                      "x-go-type": "core.Map",
                      "x-go-type-skip-optional-pointer": true,
                      "type": "object"
                    },
                    "updated_at": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "yaml": "updated_at"
                      },
                      "x-order": 9,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deleted_at": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "yaml": "deleted_at"
                      },
                      "x-order": 10,
                      "description": "SQL null Timestamp to handle null values of time.",
                      "x-go-type": "sql.NullTime",
                      "type": "string",
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
        "tags": [
          "environments"
        ],
        "operationId": "GetEnvironments",
        "summary": "Get all environments",
        "description": "Gets all environments",
        "parameters": [
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
            "name": "orgID",
            "in": "query",
            "description": "User's organization ID",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "Environments",
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "page": {
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "page_size": {
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "total_count": {
                      "type": "integer",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "environments": {
                      "type": "array",
                      "x-go-type-skip-optional-pointer": true,
                      "items": {
                        "x-go-type": "Environment",
                        "$id": "https://schemas.meshery.io/environment.yaml",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "description": "Meshery Environments allow you to logically group related Connections and their associated Credentials.. Learn more at https://docs.meshery.io/concepts/logical/environments",
                        "additionalProperties": false,
                        "type": "object",
                        "required": [
                          "id",
                          "schemaVersion",
                          "name",
                          "description",
                          "organization_id"
                        ],
                        "properties": {
                          "id": {
                            "description": "ID",
                            "x-order": 1,
                            "x-go-name": "ID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "id",
                              "yaml": "id"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "schemaVersion": {
                            "description": "Specifies the version of the schema to which the environment conforms.",
                            "x-order": 2,
                            "x-oapi-codegen-extra-tags": {
                              "yaml": "schemaVersion",
                              "db": "-",
                              "gorm": "-"
                            },
                            "default": "environments.meshery.io/v1beta1",
                            "type": "string",
                            "minLength": 2,
                            "maxLength": 100,
                            "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                            "example": [
                              "v1",
                              "v1alpha1",
                              "v2beta3",
                              "v1.custom-suffix",
                              "models.meshery.io/v1beta1",
                              "capability.meshery.io/v1alpha1"
                            ]
                          },
                          "name": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "name",
                              "yaml": "name"
                            },
                            "x-order": 3,
                            "type": "string",
                            "description": "Environment name"
                          },
                          "description": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "description",
                              "yaml": "description"
                            },
                            "x-order": 4,
                            "type": "string",
                            "description": "Environment description"
                          },
                          "organization_id": {
                            "x-go-name": "OrganizationID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "organization_id",
                              "yaml": "organization_id"
                            },
                            "x-order": 5,
                            "description": "Environment organization ID",
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "owner": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "owner",
                              "yaml": "owner"
                            },
                            "x-order": 6,
                            "description": "Environment owner",
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "created_at": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "yaml": "created_at"
                            },
                            "x-order": 7,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "metadata": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "metadata",
                              "yaml": "metadata"
                            },
                            "x-order": 8,
                            "x-go-type": "core.Map",
                            "x-go-type-skip-optional-pointer": true,
                            "type": "object"
                          },
                          "updated_at": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "yaml": "updated_at"
                            },
                            "x-order": 9,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deleted_at": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "yaml": "deleted_at"
                            },
                            "x-order": 10,
                            "description": "SQL null Timestamp to handle null values of time.",
                            "x-go-type": "sql.NullTime",
                            "type": "string",
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
  }
} as const satisfies Record<string, unknown>;

export default EnvironmentSchema;
