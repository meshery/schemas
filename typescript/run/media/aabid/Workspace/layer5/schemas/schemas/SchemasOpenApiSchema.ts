/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const schema = {
  "openapi": "3.0.0",
  "info": {
    "title": "Meshery Cloud",
    "description": "Documentation for meshery Cloud REST APIs",
    "contact": {
      "email": "maintainers@meshery.io"
    },
    "version": "v0.6.394"
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
  "tags": [
    {
      "name": "capabilities",
      "description": "APIs for remote provider capablities",
      "x-displayName": "capabilities"
    },
    {
      "name": "collaboration",
      "description": "APIs for collaboration",
      "x-displayName": "collaboration"
    },
    {
      "name": "integrations",
      "description": "APIs for integrations",
      "x-displayName": "integrations"
    },
    {
      "name": "credentials",
      "description": "APIs for Credentials",
      "x-displayName": "credentials"
    },
    {
      "name": "events",
      "description": "APIs for events",
      "x-displayName": "events"
    },
    {
      "name": "filters",
      "description": "APIs for filters",
      "x-displayName": "filters"
    },
    {
      "name": "mesheryHandlers_other",
      "x-displayName": "other"
    },
    {
      "name": "roles",
      "description": "APIs for roles",
      "x-displayName": "roles"
    },
    {
      "name": "smp_profile",
      "description": "APIs for Service Mesh Performace profile",
      "x-displayName": "smp_profile"
    },
    {
      "name": "cloud native performance",
      "x-displayName": "cloud native performance"
    },
    {
      "name": "tokens",
      "description": "APIs for tokens",
      "x-displayName": "tokens"
    },
    {
      "name": "user tokens",
      "x-displayName": "user tokens"
    },
    {
      "name": "users",
      "description": "APIs for users",
      "x-displayName": "users"
    }
  ],
  "paths": {
    "/capabilities": {
      "get": {
        "deprecated": true,
        "tags": [
          "capabilities"
        ],
        "operationId": "GetCapabilitie",
        "summary": "Capabilities",
        "description": "Get available capabilities for logged in user",
        "parameters": [
          {
            "name": "os",
            "in": "query",
            "description": "user's os",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "playground",
            "in": "query",
            "description": "Is playground mode",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "capabilities",
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "provider_type": {
                      "description": "Provider type",
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "package_version": {
                      "description": "Package version",
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "package_url": {
                      "description": "Package url",
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "provider_name": {
                      "description": "Provider name",
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "provider_description": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "x-go-type-skip-optional-pointer": true
                      }
                    },
                    "extensions": {
                      "properties": {
                        "navigator": {
                          "type": "array",
                          "items": {
                            "properties": {
                              "title": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true,
                                "description": "Title"
                              },
                              "on_click_callback": {
                                "type": "integer"
                              },
                              "href": {
                                "properties": {
                                  "uri": {
                                    "type": "string",
                                    "format": "uri"
                                  },
                                  "external": {
                                    "type": "boolean"
                                  }
                                }
                              },
                              "component": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true,
                                "description": "Component"
                              },
                              "icon": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true,
                                "description": "Icon link"
                              },
                              "link": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true,
                                "description": "link",
                                "format": "uri"
                              },
                              "show": {
                                "type": "boolean",
                                "description": "Controls whether to show the extension or not"
                              },
                              "type": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true,
                                "description": "Extension type"
                              },
                              "allowedTo": {
                                "type": "object"
                              }
                            }
                          }
                        },
                        "user_prefs": {
                          "type": "array",
                          "items": {
                            "properties": {
                              "component": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true,
                                "description": "Component"
                              },
                              "type": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true,
                                "description": "Extension type"
                              }
                            }
                          }
                        },
                        "graphql": {
                          "type": "array",
                          "items": {
                            "properties": {
                              "component": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true,
                                "description": "Component"
                              },
                              "path": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true,
                                "description": "Path"
                              },
                              "type": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true,
                                "description": "Extension type"
                              }
                            }
                          }
                        },
                        "account": {
                          "type": "array",
                          "items": {
                            "properties": {
                              "title": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true,
                                "description": "Title"
                              },
                              "on_click_callback": {
                                "type": "integer"
                              },
                              "href": {
                                "properties": {
                                  "uri": {
                                    "type": "string",
                                    "format": "uri"
                                  },
                                  "external": {
                                    "type": "boolean"
                                  }
                                }
                              },
                              "component": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true,
                                "description": "Component"
                              },
                              "link": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true,
                                "description": "link",
                                "format": "uri"
                              },
                              "show": {
                                "type": "boolean",
                                "description": "Controls whether to show the extension or not"
                              },
                              "type": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true,
                                "description": "Extension type"
                              }
                            }
                          }
                        }
                      }
                    },
                    "capabilities": {
                      "properties": {
                        "feature": {
                          "type": "string",
                          "x-go-type-skip-optional-pointer": true,
                          "description": "Feature name"
                        },
                        "endpoint": {
                          "type": "string",
                          "x-go-type-skip-optional-pointer": true
                        }
                      }
                    },
                    "restrictedAccess": {
                      "properties": {
                        "isMesheryUIRestricted": {
                          "type": "boolean"
                        },
                        "allowedComponents": {
                          "properties": {
                            "navigator": {
                              "type": "object"
                            },
                            "header": {
                              "type": "object"
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
        "security": []
      }
    },
    "/{meshery-version}/capabilities": {
      "get": {
        "tags": [
          "capabilities"
        ],
        "operationId": "GetCapabilities",
        "summary": "Capabilities By server version",
        "description": "Get available capabilities for logged in user",
        "parameters": [
          {
            "name": "meshery-version",
            "in": "path",
            "description": "meshery version",
            "schema": {
              "type": "string"
            },
            "required": true
          },
          {
            "name": "os",
            "in": "query",
            "description": "user's os",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "playground",
            "in": "query",
            "description": "Is playground mode",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "capabilities",
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "provider_type": {
                      "description": "Provider type",
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "package_version": {
                      "description": "Package version",
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "package_url": {
                      "description": "Package url",
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "provider_name": {
                      "description": "Provider name",
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "provider_description": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "x-go-type-skip-optional-pointer": true
                      }
                    },
                    "extensions": {
                      "properties": {
                        "navigator": {
                          "type": "array",
                          "items": {
                            "properties": {
                              "title": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true,
                                "description": "Title"
                              },
                              "on_click_callback": {
                                "type": "integer"
                              },
                              "href": {
                                "properties": {
                                  "uri": {
                                    "type": "string",
                                    "format": "uri"
                                  },
                                  "external": {
                                    "type": "boolean"
                                  }
                                }
                              },
                              "component": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true,
                                "description": "Component"
                              },
                              "icon": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true,
                                "description": "Icon link"
                              },
                              "link": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true,
                                "description": "link",
                                "format": "uri"
                              },
                              "show": {
                                "type": "boolean",
                                "description": "Controls whether to show the extension or not"
                              },
                              "type": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true,
                                "description": "Extension type"
                              },
                              "allowedTo": {
                                "type": "object"
                              }
                            }
                          }
                        },
                        "user_prefs": {
                          "type": "array",
                          "items": {
                            "properties": {
                              "component": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true,
                                "description": "Component"
                              },
                              "type": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true,
                                "description": "Extension type"
                              }
                            }
                          }
                        },
                        "graphql": {
                          "type": "array",
                          "items": {
                            "properties": {
                              "component": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true,
                                "description": "Component"
                              },
                              "path": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true,
                                "description": "Path"
                              },
                              "type": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true,
                                "description": "Extension type"
                              }
                            }
                          }
                        },
                        "account": {
                          "type": "array",
                          "items": {
                            "properties": {
                              "title": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true,
                                "description": "Title"
                              },
                              "on_click_callback": {
                                "type": "integer"
                              },
                              "href": {
                                "properties": {
                                  "uri": {
                                    "type": "string",
                                    "format": "uri"
                                  },
                                  "external": {
                                    "type": "boolean"
                                  }
                                }
                              },
                              "component": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true,
                                "description": "Component"
                              },
                              "link": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true,
                                "description": "link",
                                "format": "uri"
                              },
                              "show": {
                                "type": "boolean",
                                "description": "Controls whether to show the extension or not"
                              },
                              "type": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true,
                                "description": "Extension type"
                              }
                            }
                          }
                        }
                      }
                    },
                    "capabilities": {
                      "properties": {
                        "feature": {
                          "type": "string",
                          "x-go-type-skip-optional-pointer": true,
                          "description": "Feature name"
                        },
                        "endpoint": {
                          "type": "string",
                          "x-go-type-skip-optional-pointer": true
                        }
                      }
                    },
                    "restrictedAccess": {
                      "properties": {
                        "isMesheryUIRestricted": {
                          "type": "boolean"
                        },
                        "allowedComponents": {
                          "properties": {
                            "navigator": {
                              "type": "object"
                            },
                            "header": {
                              "type": "object"
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
        "security": []
      }
    },
    "/collaboration": {
      "get": {
        "tags": [
          "collaboration"
        ],
        "operationId": "CollaborationHandler",
        "summary": "Collaboration",
        "description": "Collaboration",
        "security": [],
        "responses": {
          "101": {
            "description": "initate cross server collaboration"
          }
        }
      }
    },
    "/api/integrations/connections": {
      "post": {
        "tags": [
          "integrations"
        ],
        "operationId": "RegisterConnection",
        "summary": "Register Connection",
        "description": "Register with Meshery Cloud",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "kind": {
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true,
                    "description": "Kind"
                  },
                  "type": {
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true,
                    "description": "Connection type"
                  },
                  "sub_type": {
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true,
                    "description": "Connection subtype"
                  },
                  "credential_secret": {
                    "type": "object",
                    "additionalProperties": {
                      "type": "string"
                    },
                    "x-go-type-skip-optional-pointer": true
                  },
                  "metadata": {
                    "type": "object",
                    "additionalProperties": {
                      "type": "string"
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
            "description": "Inserted connection",
            "content": {
              "application/json": {
                "schema": {
                  "$id": "https://schemas.meshery.io/component.json",
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "description": "Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections",
                  "additionalProperties": false,
                  "type": "object",
                  "required": [
                    "kind",
                    "type",
                    "status"
                  ],
                  "properties": {
                    "id": {
                      "x-order": 1,
                      "description": "ID",
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "default": "00000000-00000000-00000000-00000000"
                    },
                    "name": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "name",
                        "yaml": "name"
                      },
                      "x-order": 2,
                      "type": "string",
                      "description": "Connection Name"
                    },
                    "credential_id": {
                      "x-go-name": "CredentialId",
                      "x-oapi-codegen-extra-tags": {
                        "db": "credential_id",
                        "yaml": "credential_id"
                      },
                      "x-order": 3,
                      "description": "Credential ID",
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "default": "00000000-00000000-00000000-00000000"
                    },
                    "type": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "type",
                        "yaml": "type"
                      },
                      "x-order": 4,
                      "type": "string",
                      "description": "Connection Type"
                    },
                    "sub_type": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "sub_type",
                        "yaml": "sub_type"
                      },
                      "x-order": 5,
                      "type": "string",
                      "description": "Connection Subtype"
                    },
                    "kind": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "kind",
                        "yaml": "kind"
                      },
                      "x-order": 6,
                      "type": "string",
                      "description": "Connection Kind"
                    },
                    "metadata": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata",
                        "yaml": "metadata"
                      },
                      "x-order": 7,
                      "type": "object"
                    },
                    "status": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "status",
                        "yaml": "status"
                      },
                      "x-order": 8,
                      "description": "Connection Status",
                      "type": "string",
                      "enum": [
                        "discovered",
                        "registered",
                        "connected",
                        "ignored",
                        "maintenance",
                        "disconnected",
                        "deleted",
                        "not found"
                      ]
                    },
                    "user_id": {
                      "x-go-name": "UserID",
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "user_id",
                        "json": "user_id"
                      },
                      "x-order": 9,
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "default": "00000000-00000000-00000000-00000000"
                    },
                    "created_at": {
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "created_at",
                        "json": "created_at"
                      },
                      "x-order": 10,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updated_at": {
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "updated_at",
                        "json": "updated_at"
                      },
                      "x-order": 11,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deleted_at": {
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "deleted_at",
                        "json": "deleted_at"
                      },
                      "x-order": 12,
                      "type": "string",
                      "format": "date-time",
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
        "security": [
          {
            "jwt": []
          }
        ]
      },
      "get": {
        "tags": [
          "integrations"
        ],
        "operationId": "GetConnections",
        "summary": "Get connections",
        "description": "Get connections",
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "description": "Get reponses by page",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "description": "Get reponses by pageSize",
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
            "description": "Paginated list of connections",
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "discriminator": {
                        "propertyName": "resultType"
                      },
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
                        "resultType": {
                          "type": "string",
                          "x-go-type-skip-optional-pointer": true
                        }
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    {
                      "type": "object",
                      "properties": {
                        "connections": {
                          "x-go-type-skip-optional-pointer": true,
                          "type": "array",
                          "items": {
                            "$id": "https://schemas.meshery.io/component.json",
                            "$schema": "http://json-schema.org/draft-07/schema#",
                            "description": "Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections",
                            "additionalProperties": false,
                            "type": "object",
                            "required": [
                              "kind",
                              "type",
                              "status"
                            ],
                            "properties": {
                              "id": {
                                "x-order": 1,
                                "description": "ID",
                                "type": "string",
                                "format": "uuid",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                },
                                "default": "00000000-00000000-00000000-00000000"
                              },
                              "name": {
                                "x-oapi-codegen-extra-tags": {
                                  "db": "name",
                                  "yaml": "name"
                                },
                                "x-order": 2,
                                "type": "string",
                                "description": "Connection Name"
                              },
                              "credential_id": {
                                "x-go-name": "CredentialId",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "credential_id",
                                  "yaml": "credential_id"
                                },
                                "x-order": 3,
                                "description": "Credential ID",
                                "type": "string",
                                "format": "uuid",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                },
                                "default": "00000000-00000000-00000000-00000000"
                              },
                              "type": {
                                "x-oapi-codegen-extra-tags": {
                                  "db": "type",
                                  "yaml": "type"
                                },
                                "x-order": 4,
                                "type": "string",
                                "description": "Connection Type"
                              },
                              "sub_type": {
                                "x-oapi-codegen-extra-tags": {
                                  "db": "sub_type",
                                  "yaml": "sub_type"
                                },
                                "x-order": 5,
                                "type": "string",
                                "description": "Connection Subtype"
                              },
                              "kind": {
                                "x-oapi-codegen-extra-tags": {
                                  "db": "kind",
                                  "yaml": "kind"
                                },
                                "x-order": 6,
                                "type": "string",
                                "description": "Connection Kind"
                              },
                              "metadata": {
                                "x-oapi-codegen-extra-tags": {
                                  "db": "metadata",
                                  "yaml": "metadata"
                                },
                                "x-order": 7,
                                "type": "object"
                              },
                              "status": {
                                "x-oapi-codegen-extra-tags": {
                                  "db": "status",
                                  "yaml": "status"
                                },
                                "x-order": 8,
                                "description": "Connection Status",
                                "type": "string",
                                "enum": [
                                  "discovered",
                                  "registered",
                                  "connected",
                                  "ignored",
                                  "maintenance",
                                  "disconnected",
                                  "deleted",
                                  "not found"
                                ]
                              },
                              "user_id": {
                                "x-go-name": "UserID",
                                "x-oapi-codegen-extra-tags": {
                                  "yaml": "user_id",
                                  "json": "user_id"
                                },
                                "x-order": 9,
                                "type": "string",
                                "format": "uuid",
                                "description": "A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas.",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                },
                                "default": "00000000-00000000-00000000-00000000"
                              },
                              "created_at": {
                                "x-oapi-codegen-extra-tags": {
                                  "yaml": "created_at",
                                  "json": "created_at"
                                },
                                "x-order": 10,
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "updated_at": {
                                "x-oapi-codegen-extra-tags": {
                                  "yaml": "updated_at",
                                  "json": "updated_at"
                                },
                                "x-order": 11,
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "deleted_at": {
                                "x-oapi-codegen-extra-tags": {
                                  "yaml": "deleted_at",
                                  "json": "deleted_at"
                                },
                                "x-order": 12,
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
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
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/api/integrations/connections/{connectionId}": {
      "put": {
        "tags": [
          "integrations"
        ],
        "operationId": "EditConnectionByID",
        "summary": "Edit Connection by ID",
        "description": "Edit registered connection using the connection ID",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "description": "Connection ID",
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
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "kind": {
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true,
                    "description": "Kind"
                  },
                  "type": {
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true,
                    "description": "Connection type"
                  },
                  "sub_type": {
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true,
                    "description": "Connection subtype"
                  },
                  "credential_secret": {
                    "type": "object",
                    "additionalProperties": {
                      "type": "string"
                    },
                    "x-go-type-skip-optional-pointer": true
                  },
                  "metadata": {
                    "type": "object",
                    "additionalProperties": {
                      "type": "string"
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
            "description": "Edited connection",
            "content": {
              "application/json": {
                "schema": {
                  "$id": "https://schemas.meshery.io/component.json",
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "description": "Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections",
                  "additionalProperties": false,
                  "type": "object",
                  "required": [
                    "kind",
                    "type",
                    "status"
                  ],
                  "properties": {
                    "id": {
                      "x-order": 1,
                      "description": "ID",
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "default": "00000000-00000000-00000000-00000000"
                    },
                    "name": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "name",
                        "yaml": "name"
                      },
                      "x-order": 2,
                      "type": "string",
                      "description": "Connection Name"
                    },
                    "credential_id": {
                      "x-go-name": "CredentialId",
                      "x-oapi-codegen-extra-tags": {
                        "db": "credential_id",
                        "yaml": "credential_id"
                      },
                      "x-order": 3,
                      "description": "Credential ID",
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "default": "00000000-00000000-00000000-00000000"
                    },
                    "type": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "type",
                        "yaml": "type"
                      },
                      "x-order": 4,
                      "type": "string",
                      "description": "Connection Type"
                    },
                    "sub_type": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "sub_type",
                        "yaml": "sub_type"
                      },
                      "x-order": 5,
                      "type": "string",
                      "description": "Connection Subtype"
                    },
                    "kind": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "kind",
                        "yaml": "kind"
                      },
                      "x-order": 6,
                      "type": "string",
                      "description": "Connection Kind"
                    },
                    "metadata": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata",
                        "yaml": "metadata"
                      },
                      "x-order": 7,
                      "type": "object"
                    },
                    "status": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "status",
                        "yaml": "status"
                      },
                      "x-order": 8,
                      "description": "Connection Status",
                      "type": "string",
                      "enum": [
                        "discovered",
                        "registered",
                        "connected",
                        "ignored",
                        "maintenance",
                        "disconnected",
                        "deleted",
                        "not found"
                      ]
                    },
                    "user_id": {
                      "x-go-name": "UserID",
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "user_id",
                        "json": "user_id"
                      },
                      "x-order": 9,
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "default": "00000000-00000000-00000000-00000000"
                    },
                    "created_at": {
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "created_at",
                        "json": "created_at"
                      },
                      "x-order": 10,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updated_at": {
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "updated_at",
                        "json": "updated_at"
                      },
                      "x-order": 11,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deleted_at": {
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "deleted_at",
                        "json": "deleted_at"
                      },
                      "x-order": 12,
                      "type": "string",
                      "format": "date-time",
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
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/api/integrations/connections/status": {
      "get": {
        "tags": [
          "integrations"
        ],
        "operationId": "GetConnectionStatus",
        "summary": "Get status of all connections",
        "description": "Get summary about the status of all connections",
        "responses": {
          "200": {
            "description": "Status of connections",
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "connections_status": {
                      "x-go-type-skip-optional-pointer": true,
                      "type": "array",
                      "items": {
                        "properties": {
                          "status": {
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true,
                            "description": "Connection status"
                          },
                          "count": {
                            "type": "integer",
                            "description": "Number of connections having the status",
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
        },
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/api/integrations/connections/{connectionKind}": {
      "get": {
        "tags": [
          "integrations"
        ],
        "operationId": "GetConnectionsByKind",
        "summary": "Get connections by kind",
        "description": "Get connections by kind",
        "parameters": [
          {
            "name": "connectionKind",
            "in": "path",
            "description": "Connection kind (eg: Meshery)",
            "required": true,
            "schema": {
              "type": "string",
              "x-go-type-skip-optional-pointer": true
            }
          },
          {
            "name": "page",
            "in": "query",
            "description": "Get reponses by page",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "description": "Get reponses by pageSize",
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
            "description": "Connections by kind",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object"
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
        "security": []
      },
      "delete": {
        "tags": [
          "integrations"
        ],
        "operationId": "DeleteConnection",
        "summary": "Delete connection",
        "description": "Delete registered connection",
        "parameters": [
          {
            "name": "connectionKind",
            "in": "path",
            "description": "Connection kind (eg: Meshery)",
            "required": true,
            "schema": {
              "type": "string",
              "x-go-type-skip-optional-pointer": true
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Deleted connection",
            "content": {
              "application/json": {
                "schema": {
                  "$id": "https://schemas.meshery.io/component.json",
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "description": "Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections",
                  "additionalProperties": false,
                  "type": "object",
                  "required": [
                    "kind",
                    "type",
                    "status"
                  ],
                  "properties": {
                    "id": {
                      "x-order": 1,
                      "description": "ID",
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "default": "00000000-00000000-00000000-00000000"
                    },
                    "name": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "name",
                        "yaml": "name"
                      },
                      "x-order": 2,
                      "type": "string",
                      "description": "Connection Name"
                    },
                    "credential_id": {
                      "x-go-name": "CredentialId",
                      "x-oapi-codegen-extra-tags": {
                        "db": "credential_id",
                        "yaml": "credential_id"
                      },
                      "x-order": 3,
                      "description": "Credential ID",
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "default": "00000000-00000000-00000000-00000000"
                    },
                    "type": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "type",
                        "yaml": "type"
                      },
                      "x-order": 4,
                      "type": "string",
                      "description": "Connection Type"
                    },
                    "sub_type": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "sub_type",
                        "yaml": "sub_type"
                      },
                      "x-order": 5,
                      "type": "string",
                      "description": "Connection Subtype"
                    },
                    "kind": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "kind",
                        "yaml": "kind"
                      },
                      "x-order": 6,
                      "type": "string",
                      "description": "Connection Kind"
                    },
                    "metadata": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata",
                        "yaml": "metadata"
                      },
                      "x-order": 7,
                      "type": "object"
                    },
                    "status": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "status",
                        "yaml": "status"
                      },
                      "x-order": 8,
                      "description": "Connection Status",
                      "type": "string",
                      "enum": [
                        "discovered",
                        "registered",
                        "connected",
                        "ignored",
                        "maintenance",
                        "disconnected",
                        "deleted",
                        "not found"
                      ]
                    },
                    "user_id": {
                      "x-go-name": "UserID",
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "user_id",
                        "json": "user_id"
                      },
                      "x-order": 9,
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "default": "00000000-00000000-00000000-00000000"
                    },
                    "created_at": {
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "created_at",
                        "json": "created_at"
                      },
                      "x-order": 10,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updated_at": {
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "updated_at",
                        "json": "updated_at"
                      },
                      "x-order": 11,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deleted_at": {
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "deleted_at",
                        "json": "deleted_at"
                      },
                      "x-order": 12,
                      "type": "string",
                      "format": "date-time",
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
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/api/integrations/connections/{connectionKind}/{connectionId}": {
      "get": {
        "tags": [
          "integrations"
        ],
        "operationId": "GetConnectionsByKindAndConnectionID",
        "summary": "Get connections by kind and connectionID.",
        "description": "Get connections by kind (kind is required because this API returns the results in non std format of a connection)",
        "parameters": [
          {
            "name": "connectionKind",
            "in": "path",
            "description": "Connection kind (eg: Meshery)",
            "required": true,
            "schema": {
              "type": "string",
              "x-go-type-skip-optional-pointer": true
            }
          },
          {
            "name": "connectionId",
            "in": "path",
            "description": "Connection ID",
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
          {
            "name": "page",
            "in": "query",
            "description": "Get reponses by page",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "description": "Get reponses by pageSize",
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
            "description": "Connections by kind",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "oneOf": [
                    {
                      "properties": {
                        "k8sContext": {
                          "properties": {
                            "id": {
                              "type": "string",
                              "format": "uuid",
                              "x-go-type": "uuid.UUID",
                              "x-go-type-import": {
                                "path": "github.com/gofrs/uuid"
                              },
                              "x-go-type-skip-optional-pointer": true
                            },
                            "name": {
                              "type": "string",
                              "x-go-type-skip-optional-pointer": true
                            },
                            "auth": {
                              "type": "object",
                              "additionalProperties": {
                                "type": "string"
                              },
                              "x-go-type-skip-optional-pointer": true
                            },
                            "cluster": {
                              "type": "object",
                              "additionalProperties": {
                                "type": "string"
                              },
                              "x-go-type-skip-optional-pointer": true
                            },
                            "server": {
                              "type": "string"
                            },
                            "owner": {
                              "type": "string",
                              "format": "uuid",
                              "x-go-type": "uuid.UUID",
                              "x-go-type-import": {
                                "path": "github.com/gofrs/uuid"
                              },
                              "x-go-type-skip-optional-pointer": true
                            },
                            "created_by": {
                              "type": "string",
                              "format": "uuid",
                              "x-go-type": "uuid.UUID",
                              "x-go-type-import": {
                                "path": "github.com/gofrs/uuid"
                              },
                              "x-go-type-skip-optional-pointer": true
                            },
                            "meshery_instance_id": {
                              "type": "string",
                              "format": "uuid",
                              "x-go-type": "uuid.UUID",
                              "x-go-type-import": {
                                "path": "github.com/gofrs/uuid"
                              },
                              "x-go-type-skip-optional-pointer": true
                            },
                            "kubernetes_server_id": {
                              "type": "string",
                              "format": "uuid",
                              "x-go-type": "uuid.UUID",
                              "x-go-type-import": {
                                "path": "github.com/gofrs/uuid"
                              },
                              "x-go-type-skip-optional-pointer": true
                            },
                            "deployment_type": {
                              "type": "string"
                            },
                            "updated_at": {
                              "type": "string",
                              "format": "date-time",
                              "x-go-type-skip-optional-pointer": true
                            },
                            "created_at": {
                              "type": "string",
                              "format": "date-time",
                              "x-go-type-skip-optional-pointer": true
                            }
                          }
                        },
                        "inserted": {
                          "type": "boolean"
                        }
                      }
                    }
                  ]
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
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/api/integrations/connections/meshery/{mesheryServerID}": {
      "delete": {
        "tags": [
          "integrations"
        ],
        "operationId": "DeleteMesheryConnection",
        "summary": "Delete Meshery connection",
        "description": "Deletes a given meshery connection. This is generally used for deleting connections from Meshery Server UI where UI is not aware of connection IDs.",
        "parameters": [
          {
            "name": "mesheryServerID",
            "in": "path",
            "description": "Meshery server ID",
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
            "description": "ok",
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
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/api/system/user/credentials": {
      "get": {
        "tags": [
          "credentials"
        ],
        "operationId": "GetUserCredentials",
        "summary": "Get user's credentials",
        "description": "Get all user's credentials for logged in user",
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "description": "Get reponses by page",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "description": "Get reponses by pageSize",
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
            "description": "credentials",
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "discriminator": {
                        "propertyName": "resultType"
                      },
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
                        "resultType": {
                          "type": "string",
                          "x-go-type-skip-optional-pointer": true
                        }
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    {
                      "type": "object",
                      "properties": {
                        "credential": {
                          "type": "array",
                          "items": {
                            "properties": {
                              "id": {
                                "type": "string",
                                "format": "uuid",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                },
                                "x-go-type-skip-optional-pointer": true
                              },
                              "user_id": {
                                "type": "string",
                                "format": "uuid",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                },
                                "x-go-type-skip-optional-pointer": true
                              },
                              "name": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "type": {
                                "type": "string"
                              },
                              "secret": {
                                "type": "object",
                                "additionalProperties": {
                                  "type": "string"
                                },
                                "x-go-type-skip-optional-pointer": true
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
                  ]
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
        "security": [
          {
            "jwt": []
          }
        ]
      },
      "delete": {
        "tags": [
          "credentials"
        ],
        "operationId": "DeleteUserCredential",
        "summary": "Delete user's credentials",
        "description": "Delete user's credentials (tombstoned records) for logged in user",
        "parameters": [
          {
            "name": "credential_id",
            "in": "query",
            "description": "credential Id",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
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
        "security": [
          {
            "jwt": []
          }
        ]
      },
      "post": {
        "tags": [
          "credentials"
        ],
        "operationId": "SaveUserCredential",
        "summary": "Create Credential",
        "description": "Create new credentials for logged in user",
        "requestBody": {
          "description": "Body for user credential",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    },
                    "x-go-type-skip-optional-pointer": true
                  },
                  "user_id": {
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    },
                    "x-go-type-skip-optional-pointer": true
                  },
                  "name": {
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "type": {
                    "type": "string"
                  },
                  "secret": {
                    "type": "object",
                    "additionalProperties": {
                      "type": "string"
                    },
                    "x-go-type-skip-optional-pointer": true
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
        },
        "responses": {
          "201": {
            "description": "created",
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
        "security": [
          {
            "jwt": []
          }
        ]
      },
      "put": {
        "tags": [
          "credentials"
        ],
        "operationId": "UpdateUserCredential",
        "summary": "Update credential",
        "description": "Update credentials for logged in user",
        "requestBody": {
          "description": "Body for user credential",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    },
                    "x-go-type-skip-optional-pointer": true
                  },
                  "user_id": {
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    },
                    "x-go-type-skip-optional-pointer": true
                  },
                  "name": {
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "type": {
                    "type": "string"
                  },
                  "secret": {
                    "type": "object",
                    "additionalProperties": {
                      "type": "string"
                    },
                    "x-go-type-skip-optional-pointer": true
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
        },
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
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/api/events": {
      "get": {
        "tags": [
          "events"
        ],
        "operationId": "GetEventsAggregate",
        "summary": "Get Events Aggregate",
        "description": "Get Events Aggreate Count",
        "parameters": [
          {
            "name": "cumulative",
            "in": "query",
            "description": "Cumulative events",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Events Aggregate Count",
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "audit": {
                      "type": "integer",
                      "description": "Number of audit events"
                    },
                    "summary": {
                      "type": "integer",
                      "description": "Number of summary events"
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
        },
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/api/events/date": {
      "get": {
        "tags": [
          "events"
        ],
        "operationId": "RetrieveResultsByDate",
        "summary": "Events by Date",
        "description": "Get Events by date",
        "parameters": [
          {
            "name": "cumulative",
            "in": "query",
            "description": "Cumulative events",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Events by date",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "properties": {
                      "count": {
                        "type": "integer"
                      },
                      "event_type": {
                        "type": "string",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "dt": {
                        "type": "string",
                        "format": "date-time",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "week": {
                        "type": "string",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "month": {
                        "type": "string",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "year": {
                        "type": "string",
                        "x-go-type-skip-optional-pointer": true
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
        },
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/api/events/week": {
      "get": {
        "tags": [
          "events"
        ],
        "operationId": "RetrieveResultsByWeek",
        "summary": "Events by Week",
        "description": "Get Events by week",
        "parameters": [
          {
            "name": "cumulative",
            "in": "query",
            "description": "Cumulative events",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Events by week",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "properties": {
                      "count": {
                        "type": "integer"
                      },
                      "event_type": {
                        "type": "string",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "dt": {
                        "type": "string",
                        "format": "date-time",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "week": {
                        "type": "string",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "month": {
                        "type": "string",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "year": {
                        "type": "string",
                        "x-go-type-skip-optional-pointer": true
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
        },
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/api/events/month": {
      "get": {
        "tags": [
          "events"
        ],
        "operationId": "RetrieveResultsByMonth",
        "summary": "Events by Month",
        "description": "Get Events by month",
        "parameters": [
          {
            "name": "cumulative",
            "in": "query",
            "description": "Cumulative events",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Events by month",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "properties": {
                      "count": {
                        "type": "integer"
                      },
                      "event_type": {
                        "type": "string",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "dt": {
                        "type": "string",
                        "format": "date-time",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "week": {
                        "type": "string",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "month": {
                        "type": "string",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "year": {
                        "type": "string",
                        "x-go-type-skip-optional-pointer": true
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
        },
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/api/events/list": {
      "get": {
        "tags": [
          "events"
        ],
        "operationId": "GetEvents",
        "summary": "All Events",
        "description": "Get All events",
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "description": "Get reponses by page",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "description": "Get reponses by pageSize",
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
          },
          {
            "name": "filter",
            "in": "query",
            "description": "Filter for retrieving events",
            "schema": {
              "type": "object",
              "properties": {
                "provider": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "event_type": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Events list",
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "discriminator": {
                        "propertyName": "recordType"
                      },
                      "properties": {
                        "page": {
                          "type": "integer",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "page_size": {
                          "type": "integer",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "records_total": {
                          "type": "integer",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "recordType": {
                          "type": "string",
                          "x-go-type-skip-optional-pointer": true
                        }
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    {
                      "type": "object",
                      "properties": {
                        "data": {
                          "type": "array",
                          "items": {
                            "properties": {
                              "event": {
                                "description": "Defines model for event_trackers",
                                "properties": {
                                  "id": {
                                    "type": "string",
                                    "format": "uuid",
                                    "x-go-type": "uuid.UUID",
                                    "x-go-type-import": {
                                      "path": "github.com/gofrs/uuid"
                                    },
                                    "x-go-type-skip-optional-pointer": true,
                                    "description": "UUID of the event.\n"
                                  },
                                  "user_id": {
                                    "description": "UUID of the user that initiated the event. In most cases this would be present, but not always.\n",
                                    "type": "string",
                                    "format": "uuid",
                                    "x-go-type": "uuid.UUID",
                                    "x-go-type-import": {
                                      "path": "github.com/gofrs/uuid"
                                    },
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "user_id",
                                      "json": "user_id"
                                    },
                                    "x-go-name": "UserID",
                                    "x-go-type-skip-optional-pointer": true
                                  },
                                  "system_id": {
                                    "description": "The system from which the request is sourced. In the case of Meshery Server,\nthe ID is meshery_instance_id of Meshery Server (which can be found in the metadata of`Connections` table).\n",
                                    "type": "string",
                                    "format": "uuid",
                                    "x-go-type": "uuid.UUID",
                                    "x-go-type-import": {
                                      "path": "github.com/gofrs/uuid"
                                    },
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "system_id"
                                    },
                                    "x-go-name": "SystemID",
                                    "x-go-type-skip-optional-pointer": true
                                  },
                                  "operation_id": {
                                    "description": "Each Event will have a OperationID. This field is never NULL, which is to say an operation can result in series of events, for eg: Different stages of Pattern Engine / activities of Workflow engine. Each operation (and sub-operation) will have a different operation ID.\n",
                                    "type": "string",
                                    "format": "uuid",
                                    "x-go-type": "uuid.UUID",
                                    "x-go-type-import": {
                                      "path": "github.com/gofrs/uuid"
                                    },
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "operation_id"
                                    },
                                    "x-go-name": "OperationID",
                                    "x-go-type-skip-optional-pointer": true
                                  },
                                  "category": {
                                    "description": "Resource name on which the operation is invoked.\n",
                                    "type": "string",
                                    "example": "pattern",
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "category"
                                    }
                                  },
                                  "action": {
                                    "description": "Action taken on the resource.\n",
                                    "type": "string",
                                    "example": "deployed",
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "action"
                                    }
                                  },
                                  "status": {
                                    "description": "Status for the event.\n",
                                    "type": "string",
                                    "enum": [
                                      "read",
                                      "unread"
                                    ],
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "status"
                                    }
                                  },
                                  "acted_upon": {
                                    "type": "string",
                                    "format": "uuid",
                                    "description": "UUID of the entity on which the event was performed.\n",
                                    "example": "110020-123230-434231-000213",
                                    "x-go-type": "uuid.UUID",
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "acted_upon"
                                    }
                                  },
                                  "description": {
                                    "description": "A summary/receipt of event that occured.\n",
                                    "type": "string",
                                    "example": "“Prometheus” pattern deployed in K8s ctx “Meshery Cloud”.",
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "description"
                                    }
                                  },
                                  "severity": {
                                    "description": "A set of seven standard event levels.\n",
                                    "type": "string",
                                    "enum": [
                                      "emergency",
                                      "critical",
                                      "alert",
                                      "error",
                                      "warning",
                                      "debug",
                                      "informational",
                                      "success"
                                    ],
                                    "example": "info",
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "severity"
                                    }
                                  },
                                  "metadata": {
                                    "description": "Contains meaningful information, specific to the type of event.\nStructure of metadata can be different for different events.\n",
                                    "type": "object",
                                    "x-go-type": "[]byte",
                                    "x-oapi-codegen-extra-tags": {
                                      "db": "metadata"
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
                                },
                                "required": [
                                  "id",
                                  "system_id",
                                  "operation_id",
                                  "category",
                                  "action",
                                  "status",
                                  "acted_upon",
                                  "description",
                                  "severity",
                                  "metadata",
                                  "created_at",
                                  "updated_at"
                                ]
                              },
                              "events_count": {
                                "type": "integer",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "events_count"
                                }
                              }
                            },
                            "required": [
                              "event",
                              "events_count"
                            ]
                          }
                        }
                      }
                    }
                  ]
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
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/api/events/summary": {
      "get": {
        "tags": [
          "events"
        ],
        "operationId": "GetEventSummaryByUser",
        "summary": "Events Summary",
        "description": "Get Events summary for a user",
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "description": "Get reponses by page",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "description": "Get reponses by pageSize",
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
            "description": "Events Summary",
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "discriminator": {
                        "propertyName": "recordType"
                      },
                      "properties": {
                        "page": {
                          "type": "integer",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "page_size": {
                          "type": "integer",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "records_total": {
                          "type": "integer",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "recordType": {
                          "type": "string",
                          "x-go-type-skip-optional-pointer": true
                        }
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    {
                      "type": "object",
                      "properties": {
                        "data": {
                          "type": "array",
                          "items": {
                            "properties": {
                              "user_id": {
                                "type": "string",
                                "description": "user's email or username"
                              },
                              "provider": {
                                "type": "string"
                              },
                              "email": {
                                "type": "string"
                              },
                              "first_name": {
                                "type": "string",
                                "description": "First Name"
                              },
                              "last_name": {
                                "type": "string",
                                "description": "Last Name"
                              },
                              "activity_count": {
                                "type": "integer"
                              },
                              "login_count": {
                                "type": "integer"
                              },
                              "signup_count": {
                                "type": "integer"
                              },
                              "perf_results_count": {
                                "type": "integer"
                              },
                              "smi_results_count": {
                                "type": "integer"
                              },
                              "meshery_apps_count": {
                                "type": "integer"
                              },
                              "meshery_patterns_count": {
                                "type": "integer"
                              },
                              "meshery_filters_count": {
                                "type": "integer"
                              },
                              "last_login_time": {
                                "type": "string",
                                "format": "data-time",
                                "x-go-type": "time.Time"
                              }
                            },
                            "required": [
                              "user_id",
                              "provider",
                              "email",
                              "first_name",
                              "last_name",
                              "activity_count",
                              "login_count",
                              "signup_count",
                              "perf_results_count",
                              "smi_results_count",
                              "meshery_apps_count",
                              "meshery_patterns_count",
                              "meshery_filters_count",
                              "last_login_time"
                            ]
                          }
                        }
                      }
                    }
                  ]
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
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/api/content/filters": {
      "post": {
        "tags": [
          "filters"
        ],
        "operationId": "UpsertFilter",
        "summary": "Upsert Filter",
        "description": "It will insert the filter if not present else it will update the matching entry",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "url": {
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "path": {
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "save": {
                    "type": "boolean"
                  },
                  "filter_data": {
                    "properties": {
                      "id": {
                        "type": "string",
                        "format": "uuid",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        },
                        "x-go-type-skip-optional-pointer": true,
                        "description": "Connection id"
                      },
                      "user_id": {
                        "type": "string",
                        "format": "uuid",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        },
                        "x-go-type-skip-optional-pointer": true
                      },
                      "filter_file": {
                        "type": "string",
                        "format": "byte",
                        "description": "Filter file"
                      },
                      "name": {
                        "type": "string",
                        "x-go-type-skip-optional-pointer": true,
                        "description": "Filter Name"
                      },
                      "location": {
                        "type": "object",
                        "additionalProperties": {
                          "type": "string"
                        },
                        "x-go-type-skip-optional-pointer": true
                      },
                      "visibility": {
                        "type": "string",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "catalog_data": {
                        "type": "object",
                        "additionalProperties": {
                          "type": "string"
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
            "description": "Upserted filter",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "properties": {
                      "id": {
                        "type": "string",
                        "format": "uuid",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        },
                        "x-go-type-skip-optional-pointer": true,
                        "description": "Connection id"
                      },
                      "user_id": {
                        "type": "string",
                        "format": "uuid",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        },
                        "x-go-type-skip-optional-pointer": true
                      },
                      "filter_file": {
                        "type": "string",
                        "format": "byte",
                        "description": "Filter file"
                      },
                      "name": {
                        "type": "string",
                        "x-go-type-skip-optional-pointer": true,
                        "description": "Filter Name"
                      },
                      "location": {
                        "type": "object",
                        "additionalProperties": {
                          "type": "string"
                        },
                        "x-go-type-skip-optional-pointer": true
                      },
                      "visibility": {
                        "type": "string",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "catalog_data": {
                        "type": "object",
                        "additionalProperties": {
                          "type": "string"
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
        },
        "security": [
          {
            "jwt": []
          }
        ]
      },
      "get": {
        "tags": [
          "filters"
        ],
        "operationId": "GetFilters",
        "summary": "Get Filters",
        "description": "Get paginated filters",
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "description": "Get reponses by page",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "description": "Get reponses by pageSize",
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
            "description": "Filters",
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "discriminator": {
                        "propertyName": "resultType"
                      },
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
                        "resultType": {
                          "type": "string",
                          "x-go-type-skip-optional-pointer": true
                        }
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    {
                      "type": "object",
                      "properties": {
                        "filters": {
                          "type": "array",
                          "items": {
                            "properties": {
                              "id": {
                                "type": "string",
                                "format": "uuid",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                },
                                "x-go-type-skip-optional-pointer": true,
                                "description": "Connection id"
                              },
                              "user_id": {
                                "type": "string",
                                "format": "uuid",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                },
                                "x-go-type-skip-optional-pointer": true
                              },
                              "filter_file": {
                                "type": "string",
                                "format": "byte",
                                "description": "Filter file"
                              },
                              "name": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true,
                                "description": "Filter Name"
                              },
                              "location": {
                                "type": "object",
                                "additionalProperties": {
                                  "type": "string"
                                },
                                "x-go-type-skip-optional-pointer": true
                              },
                              "visibility": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "catalog_data": {
                                "type": "object",
                                "additionalProperties": {
                                  "type": "string"
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
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/api/content/filters/file/{id}": {
      "get": {
        "tags": [
          "filters"
        ],
        "operationId": "GetFilterFile",
        "summary": "Filter file",
        "description": "Get the filter associated with the given filter id without any metadata",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "Unique identifier",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "Filter file",
            "content": {
              "application/json": {
                "schema": {
                  "type": "string",
                  "format": "byte",
                  "description": "Filter file"
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
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/api/content/filters/{id}": {
      "get": {
        "tags": [
          "filters"
        ],
        "operationId": "GetFilter",
        "summary": "Get filter by ID",
        "description": "Get filter by ID",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "Unique identifier",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "Filter associated with ID",
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "description": "Connection id"
                    },
                    "user_id": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "filter_file": {
                      "type": "string",
                      "format": "byte",
                      "description": "Filter file"
                    },
                    "name": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "Filter Name"
                    },
                    "location": {
                      "type": "object",
                      "additionalProperties": {
                        "type": "string"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "visibility": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "catalog_data": {
                      "type": "object",
                      "additionalProperties": {
                        "type": "string"
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
        },
        "security": [
          {
            "jwt": []
          }
        ]
      },
      "delete": {
        "tags": [
          "filters"
        ],
        "operationId": "DeleteFilter",
        "summary": "Delete filter by ID",
        "description": "Delete filter associated with ID",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "Unique identifier",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "Deleted filter",
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "description": "Connection id"
                    },
                    "user_id": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "filter_file": {
                      "type": "string",
                      "format": "byte",
                      "description": "Filter file"
                    },
                    "name": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "Filter Name"
                    },
                    "location": {
                      "type": "object",
                      "additionalProperties": {
                        "type": "string"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "visibility": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "catalog_data": {
                      "type": "object",
                      "additionalProperties": {
                        "type": "string"
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
        },
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/api/content/filters/clone/{id}": {
      "post": {
        "tags": [
          "filters"
        ],
        "operationId": "CloneFilter",
        "summary": "Clone filter",
        "description": "Clone filter associated with ID",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "Unique identifier",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
        "requestBody": {
          "description": "Body for cloning design",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "properties": {
                  "name": {
                    "type": "string"
                  }
                },
                "required": [
                  "name"
                ]
              }
            }
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
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/api/meshmodels/register": {
      "post": {
        "summary": "Register mesh models",
        "operationId": "RegisterMeshmodels",
        "requestBody": {
          "required": true,
          "content": {
            "multipart/form-data": {
              "schema": {
                "type": "object",
                "required": [
                  "importBody",
                  "uploadType",
                  "register"
                ],
                "properties": {
                  "importBody": {
                    "type": "object",
                    "required": [
                      "model_file",
                      "url",
                      "file_name",
                      "model_csv",
                      "component_csv",
                      "relationship_csv",
                      "model"
                    ],
                    "properties": {
                      "model_file": {
                        "type": "string",
                        "format": "byte",
                        "description": "This represents the binary content of the file as a byte array"
                      },
                      "url": {
                        "type": "string"
                      },
                      "file_name": {
                        "type": "string"
                      },
                      "model_csv": {
                        "type": "string"
                      },
                      "component_csv": {
                        "type": "string"
                      },
                      "relationship_csv": {
                        "type": "string"
                      },
                      "model": {
                        "type": "object",
                        "required": [
                          "modelDisplayName",
                          "registrant",
                          "model",
                          "category",
                          "subCategory",
                          "shape",
                          "primaryColor",
                          "secondaryColor",
                          "svgColor",
                          "svgWhite",
                          "svgComplete",
                          "isAnnotation",
                          "publishToRegistry"
                        ],
                        "properties": {
                          "modelDisplayName": {
                            "type": "string"
                          },
                          "registrant": {
                            "type": "string"
                          },
                          "model": {
                            "type": "string"
                          },
                          "category": {
                            "$id": "https://schemas.meshery.io/category.json",
                            "$schema": "http://json-schema.org/draft-07/schema#",
                            "type": "object",
                            "description": "Category of the model.",
                            "required": [
                              "id",
                              "name",
                              "metadata"
                            ],
                            "properties": {
                              "id": {
                                "x-order": 1,
                                "type": "string",
                                "format": "uuid",
                                "description": "A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas.",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                },
                                "default": "00000000-00000000-00000000-00000000"
                              },
                              "name": {
                                "type": "string",
                                "minLength": 1,
                                "maxLength": 100,
                                "x-oapi-codegen-extra-tags": {
                                  "yaml": "name",
                                  "json": "name",
                                  "gorm": "name"
                                },
                                "default": "Uncategorized",
                                "description": "The category of the model that determines the main grouping.",
                                "enum": [
                                  "Analytics",
                                  "App Definition and Development",
                                  "Cloud Native Network",
                                  "Cloud Native Storage",
                                  "Database",
                                  "Machine Learning",
                                  "Observability and Analysis",
                                  "Orchestration & Management",
                                  "Platform",
                                  "Provisioning",
                                  "Runtime",
                                  "Security & Compliance",
                                  "Serverless",
                                  "Tools",
                                  "Uncategorized"
                                ],
                                "x-order": 2
                              },
                              "metadata": {
                                "type": "object",
                                "x-oapi-codegen-extra-tags": {
                                  "yaml": "metadata,omitempty",
                                  "json": "metadata,omitempty",
                                  "gorm": "type:bytes;serializer:json"
                                },
                                "x-order": 3
                              }
                            }
                          },
                          "subCategory": {
                            "$id": "https://schemas.meshery.io/category.json",
                            "$schema": "http://json-schema.org/draft-07/schema#",
                            "type": "string",
                            "title": "SubCategory",
                            "description": "Sub category of the model determines the secondary grouping.",
                            "default": "Uncategorized",
                            "enum": [
                              "API Gateway",
                              "API Integration",
                              "Application Definition & Image Build",
                              "Automation & Configuration",
                              "Certified Kubernetes - Distribution",
                              "Chaos Engineering",
                              "Cloud Native Storage",
                              "Cloud Provider",
                              "CNI",
                              "Compute",
                              "Container Registry",
                              "Container Runtime",
                              "Container Security",
                              "Container",
                              "Content Delivery Network",
                              "Continuous Integration & Delivery",
                              "Coordination & Service Discovery",
                              "Database",
                              "Flowchart",
                              "Framework",
                              "Installable Platform",
                              "Key Management",
                              "Key Management Service",
                              "Kubernetes",
                              "Logging",
                              "Machine Learning",
                              "Management Governance",
                              "Metrics",
                              "Monitoring",
                              "Networking Content Delivery",
                              "Operating System",
                              "Query",
                              "Remote Procedure Call",
                              "Scheduling & Orchestration",
                              "Secrets Management",
                              "Security Identity & Compliance",
                              "Service Mesh",
                              "Service Proxy",
                              "Source Version Control",
                              "Storage",
                              "Specifications",
                              "Streaming & Messaging",
                              "Tools",
                              "Tracing",
                              "Uncategorized",
                              "Video Conferencing"
                            ],
                            "minLength": 1,
                            "maxLength": 100,
                            "x-oapi-codegen-extra-tags": {
                              "yaml": "subCategory",
                              "json": "subCategory"
                            }
                          },
                          "shape": {
                            "type": "string"
                          },
                          "primaryColor": {
                            "type": "string",
                            "pattern": "^#[0-9A-Fa-f]{6}$"
                          },
                          "secondaryColor": {
                            "type": "string",
                            "pattern": "^#[0-9A-Fa-f]{6}$"
                          },
                          "svgColor": {
                            "type": "string"
                          },
                          "svgWhite": {
                            "type": "string"
                          },
                          "svgComplete": {
                            "type": "string"
                          },
                          "isAnnotation": {
                            "type": "boolean"
                          },
                          "publishToRegistry": {
                            "type": "boolean"
                          }
                        }
                      }
                    }
                  },
                  "uploadType": {
                    "type": "string"
                  },
                  "register": {
                    "type": "boolean",
                    "nullable": false
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful registration",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Invalid request format"
          },
          "500": {
            "description": "Internal server error"
          }
        },
        "tags": [
          "mesheryHandlers_other"
        ]
      }
    },
    "/api/meshmodels/export": {
      "get": {
        "summary": "Export a mesh model",
        "operationId": "ExportModel",
        "parameters": [
          {
            "in": "query",
            "name": "id",
            "schema": {
              "type": "string"
            },
            "required": true
          },
          {
            "in": "query",
            "name": "name",
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "version",
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "output_format",
            "schema": {
              "type": "string",
              "enum": [
                "json",
                "yaml",
                "oci"
              ],
              "default": "oci"
            }
          },
          {
            "in": "query",
            "name": "file_type",
            "schema": {
              "type": "string",
              "enum": [
                "oci",
                "tar",
                "gzip"
              ],
              "default": "oci"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful export",
            "content": {
              "application/octet-stream": {
                "schema": {
                  "type": "string",
                  "format": "binary"
                }
              }
            }
          },
          "400": {
            "description": "Invalid request format"
          },
          "500": {
            "description": "Internal server error"
          }
        },
        "tags": [
          "mesheryHandlers_other"
        ]
      }
    },
    "/system/roles": {
      "get": {
        "tags": [
          "roles"
        ],
        "operationId": "GetAllRoles",
        "summary": "Get All Roles",
        "description": "Get All supported roles",
        "responses": {
          "200": {
            "description": "Get all roles",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string"
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
        },
        "security": [
          {
            "jwt": []
          }
        ]
      },
      "post": {
        "tags": [
          "roles"
        ],
        "operationId": "AddRoleHolder",
        "summary": "Assign role",
        "description": "Assign role to user",
        "requestBody": {
          "description": "Body for assigning role to the user",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "role_names": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "x-go-type-skip-optional-pointer": true
                  },
                  "email": {
                    "type": "string",
                    "format": "email",
                    "description": "email",
                    "x-go-type-skip-optional-pointer": true
                  }
                },
                "required": [
                  "role_names",
                  "email"
                ]
              }
            }
          }
        },
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
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/system/roles/edit": {
      "post": {
        "tags": [
          "roles"
        ],
        "operationId": "EditRoleHolder",
        "summary": "Edit Role",
        "description": "Edit role of user",
        "requestBody": {
          "description": "Body for editing role of the user",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    },
                    "x-go-type-skip-optional-pointer": true
                  },
                  "user_id": {
                    "type": "string",
                    "description": "user's email or username",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "username": {
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "email": {
                    "type": "string",
                    "format": "email",
                    "description": "email",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "first_name": {
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true,
                    "description": "First Name"
                  },
                  "last_name": {
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true,
                    "description": "Last Name"
                  },
                  "status": {
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "role_names": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
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
                  "last_login_time": {
                    "type": "string",
                    "format": "date-time",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "deleted_at": {
                    "type": "string",
                    "format": "date-time",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "prefs": {
                    "type": "object",
                    "properties": {
                      "welcome_email": {
                        "type": "boolean",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "notify_role_change": {
                        "type": "boolean",
                        "x-go-type-skip-optional-pointer": true
                      }
                    },
                    "x-go-type-skip-optional-pointer": true
                  }
                },
                "required": [
                  "id",
                  "user_id",
                  "username",
                  "email",
                  "first_name",
                  "last_name",
                  "status",
                  "role_names",
                  "created_at",
                  "updated_at",
                  "last_login_time",
                  "deleted_at"
                ]
              }
            }
          }
        },
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
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/system/roles/edit/bulk": {
      "post": {
        "tags": [
          "roles"
        ],
        "operationId": "BulkEditRoleHolder",
        "summary": "Bulk Edit Role",
        "description": "Edit roles of user in bulk",
        "requestBody": {
          "description": "Body for editing role of the users in bulk",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "user_id": {
                      "type": "string",
                      "description": "user's email or username",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "username": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "email": {
                      "type": "string",
                      "format": "email",
                      "description": "email",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "first_name": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "First Name"
                    },
                    "last_name": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "Last Name"
                    },
                    "status": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "role_names": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "x-go-type-skip-optional-pointer": true
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
                    "last_login_time": {
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deleted_at": {
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "prefs": {
                      "type": "object",
                      "properties": {
                        "welcome_email": {
                          "type": "boolean",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "notify_role_change": {
                          "type": "boolean",
                          "x-go-type-skip-optional-pointer": true
                        }
                      },
                      "x-go-type-skip-optional-pointer": true
                    }
                  },
                  "required": [
                    "id",
                    "user_id",
                    "username",
                    "email",
                    "first_name",
                    "last_name",
                    "status",
                    "role_names",
                    "created_at",
                    "updated_at",
                    "last_login_time",
                    "deleted_at"
                  ]
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "created",
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
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/system/roles/{id}": {
      "delete": {
        "tags": [
          "roles"
        ],
        "operationId": "DeleteRole",
        "summary": "Delete Role",
        "description": "Edit roles of user in bulk",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "Unique identifier",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
        "responses": {
          "201": {
            "description": "Deleted roles",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string",
                        "format": "uuid",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        },
                        "x-go-type-skip-optional-pointer": true
                      },
                      "user_id": {
                        "type": "string",
                        "description": "user's email or username",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "username": {
                        "type": "string",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "email": {
                        "type": "string",
                        "format": "email",
                        "description": "email",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "first_name": {
                        "type": "string",
                        "x-go-type-skip-optional-pointer": true,
                        "description": "First Name"
                      },
                      "last_name": {
                        "type": "string",
                        "x-go-type-skip-optional-pointer": true,
                        "description": "Last Name"
                      },
                      "status": {
                        "type": "string",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "role_names": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "x-go-type-skip-optional-pointer": true
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
                      "last_login_time": {
                        "type": "string",
                        "format": "date-time",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "deleted_at": {
                        "type": "string",
                        "format": "date-time",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "prefs": {
                        "type": "object",
                        "properties": {
                          "welcome_email": {
                            "type": "boolean",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "notify_role_change": {
                            "type": "boolean",
                            "x-go-type-skip-optional-pointer": true
                          }
                        },
                        "x-go-type-skip-optional-pointer": true
                      }
                    },
                    "required": [
                      "id",
                      "user_id",
                      "username",
                      "email",
                      "first_name",
                      "last_name",
                      "status",
                      "role_names",
                      "created_at",
                      "updated_at",
                      "last_login_time",
                      "deleted_at"
                    ]
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
        },
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/api/performance/smp/profiles": {
      "get": {
        "tags": [
          "cloud native performance"
        ],
        "operationId": "SMPDashboardPerfProfiles",
        "summary": "Performance Profiles",
        "description": "Get Performance Profiles for SMP Dashboard",
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "description": "Get reponses by page",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "description": "Get reponses by pageSize",
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
            "description": "Get Performance Profiles with pagination",
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "discriminator": {
                        "propertyName": "resultType"
                      },
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
                        "resultType": {
                          "type": "string",
                          "x-go-type-skip-optional-pointer": true
                        }
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    {
                      "type": "object",
                      "properties": {
                        "profiles": {
                          "type": "array",
                          "items": {
                            "properties": {
                              "id": {
                                "type": "string",
                                "format": "uuid",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                },
                                "x-go-type-skip-optional-pointer": true
                              },
                              "name": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "user_id": {
                                "type": "string",
                                "format": "uuid",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                },
                                "x-go-type-skip-optional-pointer": true
                              },
                              "schedule": {
                                "type": "string",
                                "format": "uuid",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                },
                                "x-go-type-skip-optional-pointer": true
                              },
                              "load_generators": {
                                "type": "string"
                              },
                              "endpoints": {
                                "type": "string"
                              },
                              "service_mesh": {
                                "type": "string"
                              },
                              "concurrent_request": {
                                "type": "integer"
                              },
                              "qps": {
                                "type": "integer"
                              },
                              "duration": {
                                "type": "string"
                              },
                              "last_run": {
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "total_results": {
                                "type": "integer"
                              },
                              "request_headers": {
                                "type": "string"
                              },
                              "request_cookies": {
                                "type": "string"
                              },
                              "request_body": {
                                "type": "string"
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
        "security": []
      }
    },
    "/api/performance/smp/profiles/{id}/results": {
      "get": {
        "tags": [
          "cloud native performance"
        ],
        "operationId": "SMPDashboardTestResults",
        "summary": "Performance Profiles Results by ID",
        "description": "Get Performance Profiles results by ID for SMP Dashboard",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "Unique identifier",
            "schema": {
              "type": "string"
            },
            "required": true
          },
          {
            "name": "page",
            "in": "query",
            "description": "Get reponses by page",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "description": "Get reponses by pageSize",
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
            "description": "Get Performance Profiles Results with pagination",
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "discriminator": {
                        "propertyName": "resultType"
                      },
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
                        "resultType": {
                          "type": "string",
                          "x-go-type-skip-optional-pointer": true
                        }
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    {
                      "type": "object",
                      "properties": {
                        "results": {
                          "type": "array",
                          "items": {
                            "properties": {
                              "id": {
                                "type": "string",
                                "format": "uuid",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                },
                                "x-go-type-skip-optional-pointer": true
                              },
                              "name": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "test_start_time": {
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "mesh": {
                                "type": "string"
                              },
                              "runner_results": {
                                "type": "object",
                                "additionalProperties": {
                                  "type": "string"
                                },
                                "x-go-type-skip-optional-pointer": true
                              },
                              "deleted": {
                                "type": "boolean"
                              },
                              "server_metrics": {
                                "type": "object",
                                "additionalProperties": {
                                  "type": "string"
                                },
                                "x-go-type-skip-optional-pointer": true
                              },
                              "server_board_config": {
                                "type": "object",
                                "additionalProperties": {
                                  "type": "string"
                                },
                                "x-go-type-skip-optional-pointer": true
                              },
                              "performance_profile": {
                                "type": "string",
                                "format": "uuid",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
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
          "500": {
            "description": "Internal server error",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "502": {
            "description": "Invalid path parameter \"id\"",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          }
        },
        "security": []
      }
    },
    "/api/performance/profiles": {
      "post": {
        "tags": [
          "cloud native performance"
        ],
        "operationId": "UpsertPerformanceProfile",
        "summary": "Upsert Performance Profiles",
        "description": "Update performance profiles or create a new performance profile if no id is provided",
        "requestBody": {
          "description": "Body for upserting performance profile",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    },
                    "x-go-type-skip-optional-pointer": true
                  },
                  "name": {
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "user_id": {
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    },
                    "x-go-type-skip-optional-pointer": true
                  },
                  "schedule": {
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    },
                    "x-go-type-skip-optional-pointer": true
                  },
                  "load_generators": {
                    "type": "string"
                  },
                  "endpoints": {
                    "type": "string"
                  },
                  "service_mesh": {
                    "type": "string"
                  },
                  "concurrent_request": {
                    "type": "integer"
                  },
                  "qps": {
                    "type": "integer"
                  },
                  "duration": {
                    "type": "string"
                  },
                  "last_run": {
                    "type": "string",
                    "format": "date-time",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "total_results": {
                    "type": "integer"
                  },
                  "request_headers": {
                    "type": "string"
                  },
                  "request_cookies": {
                    "type": "string"
                  },
                  "request_body": {
                    "type": "string"
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
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "updated performance profile",
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "name": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "user_id": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "schedule": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "load_generators": {
                      "type": "string"
                    },
                    "endpoints": {
                      "type": "string"
                    },
                    "service_mesh": {
                      "type": "string"
                    },
                    "concurrent_request": {
                      "type": "integer"
                    },
                    "qps": {
                      "type": "integer"
                    },
                    "duration": {
                      "type": "string"
                    },
                    "last_run": {
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "total_results": {
                      "type": "integer"
                    },
                    "request_headers": {
                      "type": "string"
                    },
                    "request_cookies": {
                      "type": "string"
                    },
                    "request_body": {
                      "type": "string"
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
        },
        "security": [
          {
            "jwt": []
          }
        ]
      },
      "get": {
        "tags": [
          "cloud native performance"
        ],
        "operationId": "GetPerformanceProfiles",
        "summary": "Get Performance Profiles",
        "description": "Get performance profiles",
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "description": "Get reponses by page",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "description": "Get reponses by pageSize",
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
            "description": "Performance Profiles",
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "discriminator": {
                        "propertyName": "resultType"
                      },
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
                        "resultType": {
                          "type": "string",
                          "x-go-type-skip-optional-pointer": true
                        }
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    {
                      "type": "object",
                      "properties": {
                        "profiles": {
                          "type": "array",
                          "items": {
                            "properties": {
                              "id": {
                                "type": "string",
                                "format": "uuid",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                },
                                "x-go-type-skip-optional-pointer": true
                              },
                              "name": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "user_id": {
                                "type": "string",
                                "format": "uuid",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                },
                                "x-go-type-skip-optional-pointer": true
                              },
                              "schedule": {
                                "type": "string",
                                "format": "uuid",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                },
                                "x-go-type-skip-optional-pointer": true
                              },
                              "load_generators": {
                                "type": "string"
                              },
                              "endpoints": {
                                "type": "string"
                              },
                              "service_mesh": {
                                "type": "string"
                              },
                              "concurrent_request": {
                                "type": "integer"
                              },
                              "qps": {
                                "type": "integer"
                              },
                              "duration": {
                                "type": "string"
                              },
                              "last_run": {
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "total_results": {
                                "type": "integer"
                              },
                              "request_headers": {
                                "type": "string"
                              },
                              "request_cookies": {
                                "type": "string"
                              },
                              "request_body": {
                                "type": "string"
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
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/api/performance/profiles/{id}": {
      "get": {
        "tags": [
          "cloud native performance"
        ],
        "operationId": "GetPerformanceProfile",
        "summary": "Performance Profile by Id",
        "description": "Get Performance Profile by ID",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "Unique identifier",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "Performance Profile for provided performance profile id",
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "name": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "user_id": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "schedule": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "load_generators": {
                      "type": "string"
                    },
                    "endpoints": {
                      "type": "string"
                    },
                    "service_mesh": {
                      "type": "string"
                    },
                    "concurrent_request": {
                      "type": "integer"
                    },
                    "qps": {
                      "type": "integer"
                    },
                    "duration": {
                      "type": "string"
                    },
                    "last_run": {
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "total_results": {
                      "type": "integer"
                    },
                    "request_headers": {
                      "type": "string"
                    },
                    "request_cookies": {
                      "type": "string"
                    },
                    "request_body": {
                      "type": "string"
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
        },
        "security": [
          {
            "jwt": []
          }
        ]
      },
      "delete": {
        "tags": [
          "cloud native performance"
        ],
        "operationId": "DeletePerformanceProfile",
        "summary": "Delete Performance Profiles",
        "description": "Delete performance profiles by ID",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "Unique identifier",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "Deleted Performance Profile",
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "name": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "user_id": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "schedule": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "load_generators": {
                      "type": "string"
                    },
                    "endpoints": {
                      "type": "string"
                    },
                    "service_mesh": {
                      "type": "string"
                    },
                    "concurrent_request": {
                      "type": "integer"
                    },
                    "qps": {
                      "type": "integer"
                    },
                    "duration": {
                      "type": "string"
                    },
                    "last_run": {
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "total_results": {
                      "type": "integer"
                    },
                    "request_headers": {
                      "type": "string"
                    },
                    "request_cookies": {
                      "type": "string"
                    },
                    "request_body": {
                      "type": "string"
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
        },
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/api/performance/profiles/{id}/results": {
      "get": {
        "tags": [
          "cloud native performance"
        ],
        "operationId": "GetPerformanceProfileResults",
        "summary": "Performance Profiles result",
        "description": "Get paginated Performance Profiles result",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "Unique identifier",
            "schema": {
              "type": "string"
            },
            "required": true
          },
          {
            "name": "page",
            "in": "query",
            "description": "Get reponses by page",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "description": "Get reponses by pageSize",
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
            "description": "Performance Profile results",
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "discriminator": {
                        "propertyName": "resultType"
                      },
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
                        "resultType": {
                          "type": "string",
                          "x-go-type-skip-optional-pointer": true
                        }
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    {
                      "type": "object",
                      "properties": {
                        "results": {
                          "type": "array",
                          "items": {
                            "properties": {
                              "id": {
                                "type": "string",
                                "format": "uuid",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                },
                                "x-go-type-skip-optional-pointer": true
                              },
                              "name": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "test_start_time": {
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "mesh": {
                                "type": "string"
                              },
                              "runner_results": {
                                "type": "object",
                                "additionalProperties": {
                                  "type": "string"
                                },
                                "x-go-type-skip-optional-pointer": true
                              },
                              "deleted": {
                                "type": "boolean"
                              },
                              "server_metrics": {
                                "type": "object",
                                "additionalProperties": {
                                  "type": "string"
                                },
                                "x-go-type-skip-optional-pointer": true
                              },
                              "server_board_config": {
                                "type": "object",
                                "additionalProperties": {
                                  "type": "string"
                                },
                                "x-go-type-skip-optional-pointer": true
                              },
                              "performance_profile": {
                                "type": "string",
                                "format": "uuid",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
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
        "security": [
          {
            "jwt": []
          }
        ]
      },
      "post": {
        "tags": [
          "cloud native performance"
        ],
        "operationId": "AddPerformanceProfileResult",
        "summary": "Add performance profiles result",
        "description": "Add performance profile result in given performance profile id",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "Unique identifier",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
        "requestBody": {
          "description": "Body for adding perfor mance profile result",
          "content": {
            "application/json": {
              "schema": {
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    },
                    "x-go-type-skip-optional-pointer": true
                  },
                  "name": {
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "test_start_time": {
                    "type": "string",
                    "format": "date-time",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "mesh": {
                    "type": "string"
                  },
                  "runner_results": {
                    "type": "object",
                    "additionalProperties": {
                      "type": "string"
                    },
                    "x-go-type-skip-optional-pointer": true
                  },
                  "deleted": {
                    "type": "boolean"
                  },
                  "server_metrics": {
                    "type": "object",
                    "additionalProperties": {
                      "type": "string"
                    },
                    "x-go-type-skip-optional-pointer": true
                  },
                  "server_board_config": {
                    "type": "object",
                    "additionalProperties": {
                      "type": "string"
                    },
                    "x-go-type-skip-optional-pointer": true
                  },
                  "performance_profile": {
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
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
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Performance Profile results",
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid"
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
        },
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/api/performance/profiles/{id}/results/{resultID}": {
      "get": {
        "tags": [
          "cloud native performance"
        ],
        "operationId": "GetPerformanceProfileResult",
        "summary": "Performance Profiles result",
        "description": "Get the performance test result associated with the given profile id and with the given test id",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "Unique identifier",
            "schema": {
              "type": "string"
            },
            "required": true
          },
          {
            "name": "resultID",
            "in": "path",
            "description": "Performance Result Id",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "Performance Profile results",
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "name": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "test_start_time": {
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "mesh": {
                      "type": "string"
                    },
                    "runner_results": {
                      "type": "object",
                      "additionalProperties": {
                        "type": "string"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deleted": {
                      "type": "boolean"
                    },
                    "server_metrics": {
                      "type": "object",
                      "additionalProperties": {
                        "type": "string"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "server_board_config": {
                      "type": "object",
                      "additionalProperties": {
                        "type": "string"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "performance_profile": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
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
        },
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/system/user/tokens": {
      "get": {
        "tags": [
          "user tokens"
        ],
        "operationId": "GetUserTokens",
        "summary": "Get Tokens",
        "description": "Get tokens associated with logged in user",
        "parameters": [
          {
            "name": "isOAuth",
            "in": "query",
            "description": "To get OAuth tokens as well",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "page",
            "in": "query",
            "description": "Get reponses by page",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "description": "Get reponses by pageSize",
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
            "description": "user tokens",
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "discriminator": {
                        "propertyName": "resultType"
                      },
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
                        "resultType": {
                          "type": "string",
                          "x-go-type-skip-optional-pointer": true
                        }
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    {
                      "type": "object",
                      "properties": {
                        "tokens": {
                          "type": "array",
                          "items": {
                            "properties": {
                              "id": {
                                "type": "string",
                                "format": "uuid",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                },
                                "x-go-type-skip-optional-pointer": true
                              },
                              "user_id": {
                                "type": "string",
                                "format": "uuid",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                },
                                "x-go-type-skip-optional-pointer": true
                              },
                              "provider": {
                                "type": "string",
                                "description": "One of (x-oapi-codegen-extra-tags-cloud, github, google)",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "access_token": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "refresh_token": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "name": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "purpose": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "is_oauth": {
                                "type": "boolean"
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
        "security": [
          {
            "jwt": []
          }
        ]
      },
      "post": {
        "tags": [
          "user tokens"
        ],
        "operationId": "GenerateToken",
        "summary": "Generate token for logged in user",
        "description": "Generates infinite token (i.e. tokens that do not expire) for the logged in user.",
        "parameters": [
          {
            "name": "name",
            "in": "query",
            "description": "Name of the resource",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "purpose",
            "in": "query",
            "description": "Purpose for which token is generated",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "generated token",
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
        "security": [
          {
            "jwt": []
          }
        ]
      },
      "delete": {
        "tags": [
          "user tokens"
        ],
        "operationId": "DeleteUserTokens",
        "summary": "Delete token",
        "description": "Delete token for logged in user",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "additionalProperties": {
                  "type": "string"
                },
                "x-go-type-skip-optional-pointer": true
              }
            }
          }
        },
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
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/system/token": {
      "get": {
        "tags": [
          "user tokens"
        ],
        "operationId": "IssueIndefiniteLifetimeToken",
        "summary": "Infinite token",
        "description": "Get Infinite Token",
        "parameters": [
          {
            "name": "user_id",
            "in": "path",
            "description": "User's user_id",
            "schema": {
              "type": "string"
            },
            "required": true
          },
          {
            "name": "provider",
            "in": "query",
            "description": "Remote provider",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "generated token",
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
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/api/identity/users/invite": {
      "post": {
        "tags": [
          "users"
        ],
        "operationId": "HandleUserInvite",
        "summary": "User Invite",
        "description": "Send invitation request to users",
        "requestBody": {
          "description": "Body for user invite request",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "properties": {
                  "first_name": {
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true,
                    "description": "First Name"
                  },
                  "last_name": {
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true,
                    "description": "Last Name"
                  },
                  "email": {
                    "type": "string",
                    "format": "email",
                    "description": "email",
                    "x-go-type-skip-optional-pointer": true
                  }
                },
                "required": [
                  "first_name",
                  "last_name",
                  "email"
                ]
              }
            }
          }
        },
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
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/api/identity/users/preferences": {
      "put": {
        "tags": [
          "users"
        ],
        "operationId": "UpdateUserPreference",
        "summary": "User Preference",
        "description": "Upsert user preferences",
        "requestBody": {
          "description": "Body for upserting user preferences",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "additionalProperties": {
                  "type": "string"
                },
                "x-go-type-skip-optional-pointer": true
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "created",
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
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/api/identity/users/keys": {
      "get": {
        "tags": [
          "users"
        ],
        "operationId": "GetUserKeys",
        "summary": "Get User Keys",
        "description": "Get all keys based on roles assigned to user",
        "responses": {
          "200": {
            "description": "Returns user keys based on roles assigned to user",
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "keys": {
                      "type": "array",
                      "items": {
                        "properties": {
                          "ID": {
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-go-type-skip-optional-pointer": true
                          },
                          "subcategory": {
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "function": {
                            "type": "string",
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
                          },
                          "category": {
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "description": {
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "owner": {
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-go-type-skip-optional-pointer": true
                          }
                        }
                      }
                    },
                    "total_count": {
                      "type": "integer"
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
        },
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/api/user/{user_id}": {
      "get": {
        "tags": [
          "users"
        ],
        "operationId": "GetUserById",
        "summary": "Get User by ID",
        "description": "Get specific user by user id",
        "parameters": [
          {
            "name": "user_id",
            "in": "path",
            "description": "User's user_id",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "Returns user with given user_id",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "user_id": {
                      "type": "string",
                      "description": "user's email or username",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "provider": {
                      "type": "string",
                      "description": "One of (x-oapi-codegen-extra-tags-cloud, github, google)",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "email": {
                      "type": "string",
                      "format": "email",
                      "description": "email",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "first_name": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "First Name"
                    },
                    "last_name": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "Last Name"
                    },
                    "avatar_url": {
                      "type": "string",
                      "description": "Link for profile picture",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "status": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "bio": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "preferences": {
                      "type": "object",
                      "additionalProperties": {
                        "type": "string"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "accepted_terms_at": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "first_login_time": {
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "last_login_time": {
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    }
                  },
                  "required": [
                    "id",
                    "user_id",
                    "provider",
                    "email",
                    "first_name",
                    "last_name",
                    "status",
                    "created_at",
                    "updated_at",
                    "last_login_time",
                    "deleted_at"
                  ]
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
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/api/identity/users/{delete_on}": {
      "post": {
        "tags": [
          "users"
        ],
        "operationId": "DeleteUsers",
        "summary": "Delete users",
        "description": "Delete users based on delete_for parameter",
        "parameters": [
          {
            "in": "path",
            "required": true,
            "name": "delete_on",
            "description": "Defines on whom the delete operation is to be performed",
            "schema": {
              "type": "string",
              "enum": [
                "self",
                "bulk"
              ]
            }
          }
        ],
        "requestBody": {
          "description": "Body for delete of user accounts",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "oneOf": [
                  {
                    "type": "object",
                    "properties": {
                      "user_ids": {
                        "type": "string",
                        "format": "uuid",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        },
                        "x-go-type-skip-optional-pointer": true
                      },
                      "user_emails": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "email",
                          "description": "email",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "x-go-type-skip-optional-pointer": true
                      }
                    },
                    "required": [
                      "user_ids",
                      "user_emails"
                    ]
                  },
                  {
                    "description": "Body for empty request",
                    "type": "object",
                    "properties": {},
                    "x-go-type-skip-optional-pointer": true
                  }
                ]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "created",
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
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/api/system/delete/user/{user_id}": {
      "get": {
        "tags": [
          "users"
        ],
        "operationId": "DeleteUserAccountById",
        "summary": "Delete account by ID",
        "description": "Delete account by ID",
        "parameters": [
          {
            "name": "user_id",
            "in": "path",
            "description": "User's user_id",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
        "responses": {
          "201": {
            "description": "created",
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
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/api/identity/users": {
      "get": {
        "tags": [
          "users"
        ],
        "operationId": "GetRoleHolders",
        "summary": "Get All users",
        "description": "Get All users",
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "description": "Get reponses by page",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "description": "Get reponses by pageSize",
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
          },
          {
            "name": "filter",
            "in": "query",
            "description": "Get filtered reponses",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Get all user with pagination",
            "content": {
              "application/json": {
                "schema": {
                  "anyOf": [
                    {
                      "allOf": [
                        {
                          "discriminator": {
                            "propertyName": "recordType"
                          },
                          "properties": {
                            "page": {
                              "type": "integer",
                              "x-go-type-skip-optional-pointer": true
                            },
                            "page_size": {
                              "type": "integer",
                              "x-go-type-skip-optional-pointer": true
                            },
                            "records_total": {
                              "type": "integer",
                              "x-go-type-skip-optional-pointer": true
                            },
                            "recordType": {
                              "type": "string",
                              "x-go-type-skip-optional-pointer": true
                            }
                          },
                          "x-go-type-skip-optional-pointer": true
                        },
                        {
                          "type": "object",
                          "properties": {
                            "data": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "properties": {
                                  "id": {
                                    "type": "string",
                                    "format": "uuid",
                                    "x-go-type": "uuid.UUID",
                                    "x-go-type-import": {
                                      "path": "github.com/gofrs/uuid"
                                    },
                                    "x-go-type-skip-optional-pointer": true
                                  },
                                  "user_id": {
                                    "type": "string",
                                    "description": "user's email or username",
                                    "x-go-type-skip-optional-pointer": true
                                  },
                                  "username": {
                                    "type": "string",
                                    "x-go-type-skip-optional-pointer": true
                                  },
                                  "email": {
                                    "type": "string",
                                    "format": "email",
                                    "description": "email",
                                    "x-go-type-skip-optional-pointer": true
                                  },
                                  "first_name": {
                                    "type": "string",
                                    "x-go-type-skip-optional-pointer": true,
                                    "description": "First Name"
                                  },
                                  "last_name": {
                                    "type": "string",
                                    "x-go-type-skip-optional-pointer": true,
                                    "description": "Last Name"
                                  },
                                  "status": {
                                    "type": "string",
                                    "x-go-type-skip-optional-pointer": true
                                  },
                                  "role_names": {
                                    "type": "array",
                                    "items": {
                                      "type": "string",
                                      "x-go-type-skip-optional-pointer": true
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
                                  "last_login_time": {
                                    "type": "string",
                                    "format": "date-time",
                                    "x-go-type-skip-optional-pointer": true
                                  },
                                  "deleted_at": {
                                    "type": "string",
                                    "format": "date-time",
                                    "x-go-type-skip-optional-pointer": true
                                  },
                                  "prefs": {
                                    "type": "object",
                                    "properties": {
                                      "welcome_email": {
                                        "type": "boolean",
                                        "x-go-type-skip-optional-pointer": true
                                      },
                                      "notify_role_change": {
                                        "type": "boolean",
                                        "x-go-type-skip-optional-pointer": true
                                      }
                                    },
                                    "x-go-type-skip-optional-pointer": true
                                  },
                                  "avatar_url": {
                                    "type": "string",
                                    "description": "Link for profile picture",
                                    "x-go-type-skip-optional-pointer": true
                                  },
                                  "preferences": {
                                    "type": "object",
                                    "additionalProperties": {
                                      "type": "string"
                                    },
                                    "x-go-type-skip-optional-pointer": true
                                  }
                                },
                                "required": [
                                  "id",
                                  "user_id",
                                  "username",
                                  "email",
                                  "first_name",
                                  "last_name",
                                  "status",
                                  "role_names",
                                  "created_at",
                                  "updated_at",
                                  "last_login_time",
                                  "deleted_at"
                                ]
                              }
                            }
                          }
                        }
                      ]
                    },
                    {
                      "allOf": [
                        {
                          "discriminator": {
                            "propertyName": "recordType"
                          },
                          "properties": {
                            "page": {
                              "type": "integer",
                              "x-go-type-skip-optional-pointer": true
                            },
                            "page_size": {
                              "type": "integer",
                              "x-go-type-skip-optional-pointer": true
                            },
                            "records_total": {
                              "type": "integer",
                              "x-go-type-skip-optional-pointer": true
                            },
                            "recordType": {
                              "type": "string",
                              "x-go-type-skip-optional-pointer": true
                            }
                          },
                          "x-go-type-skip-optional-pointer": true
                        },
                        {
                          "type": "object",
                          "properties": {
                            "data": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "properties": {
                                  "id": {
                                    "type": "string",
                                    "format": "uuid",
                                    "x-go-type": "uuid.UUID",
                                    "x-go-type-import": {
                                      "path": "github.com/gofrs/uuid"
                                    },
                                    "x-go-type-skip-optional-pointer": true
                                  },
                                  "user_id": {
                                    "type": "string",
                                    "description": "user's email or username",
                                    "x-go-type-skip-optional-pointer": true
                                  },
                                  "username": {
                                    "type": "string",
                                    "x-go-type-skip-optional-pointer": true
                                  },
                                  "email": {
                                    "type": "string",
                                    "format": "email",
                                    "description": "email",
                                    "x-go-type-skip-optional-pointer": true
                                  },
                                  "first_name": {
                                    "type": "string",
                                    "x-go-type-skip-optional-pointer": true,
                                    "description": "First Name"
                                  },
                                  "last_name": {
                                    "type": "string",
                                    "x-go-type-skip-optional-pointer": true,
                                    "description": "Last Name"
                                  },
                                  "status": {
                                    "type": "string",
                                    "x-go-type-skip-optional-pointer": true
                                  },
                                  "role_names": {
                                    "type": "array",
                                    "items": {
                                      "type": "string",
                                      "x-go-type-skip-optional-pointer": true
                                    },
                                    "x-go-type-skip-optional-pointer": true
                                  },
                                  "joined_at": {
                                    "type": "string",
                                    "format": "date-time",
                                    "x-go-type-skip-optional-pointer": true
                                  },
                                  "updated_at": {
                                    "type": "string",
                                    "format": "date-time",
                                    "x-go-type-skip-optional-pointer": true
                                  },
                                  "last_login_time": {
                                    "type": "string",
                                    "format": "date-time",
                                    "x-go-type-skip-optional-pointer": true
                                  },
                                  "deleted_at": {
                                    "type": "string",
                                    "format": "date-time",
                                    "x-go-type-skip-optional-pointer": true
                                  },
                                  "prefs": {
                                    "type": "object",
                                    "properties": {
                                      "welcome_email": {
                                        "type": "boolean",
                                        "x-go-type-skip-optional-pointer": true
                                      },
                                      "notify_role_change": {
                                        "type": "boolean",
                                        "x-go-type-skip-optional-pointer": true
                                      }
                                    },
                                    "x-go-type-skip-optional-pointer": true
                                  },
                                  "avatar_url": {
                                    "type": "string",
                                    "description": "Link for profile picture",
                                    "x-go-type-skip-optional-pointer": true
                                  }
                                },
                                "required": [
                                  "id",
                                  "user_id",
                                  "username",
                                  "email",
                                  "first_name",
                                  "last_name",
                                  "status",
                                  "role_names",
                                  "joined_at",
                                  "updated_at",
                                  "last_login_time",
                                  "deleted_at"
                                ]
                              }
                            }
                          }
                        }
                      ]
                    }
                  ]
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
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/api/users": {
      "get": {
        "tags": [
          "users"
        ],
        "operationId": "GetUsers",
        "summary": "Get All users",
        "description": "Get All users",
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "description": "Get reponses by page",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "page_size",
            "in": "query",
            "description": "Get reponses by pageSize",
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
          },
          {
            "name": "filter",
            "in": "query",
            "description": "Get filtered reponses",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Get all user with pagination",
            "content": {
              "application/json": {
                "schema": {
                  "allOf": [
                    {
                      "discriminator": {
                        "propertyName": "recordType"
                      },
                      "properties": {
                        "page": {
                          "type": "integer",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "page_size": {
                          "type": "integer",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "records_total": {
                          "type": "integer",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "recordType": {
                          "type": "string",
                          "x-go-type-skip-optional-pointer": true
                        }
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    {
                      "type": "object",
                      "properties": {
                        "data": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "string",
                                "format": "uuid",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                },
                                "x-go-type-skip-optional-pointer": true
                              },
                              "user_id": {
                                "type": "string",
                                "description": "user's email or username",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "username": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "email": {
                                "type": "string",
                                "format": "email",
                                "description": "email",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "first_name": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true,
                                "description": "First Name"
                              },
                              "last_name": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true,
                                "description": "Last Name"
                              },
                              "prefs": {
                                "type": "object",
                                "properties": {
                                  "welcome_email": {
                                    "type": "boolean",
                                    "x-go-type-skip-optional-pointer": true
                                  },
                                  "notify_role_change": {
                                    "type": "boolean",
                                    "x-go-type-skip-optional-pointer": true
                                  }
                                },
                                "x-go-type-skip-optional-pointer": true
                              },
                              "avatar_url": {
                                "type": "string",
                                "description": "Link for profile picture",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "preferences": {
                                "type": "object",
                                "additionalProperties": {
                                  "type": "string"
                                },
                                "x-go-type-skip-optional-pointer": true
                              }
                            },
                            "required": [
                              "id",
                              "user_id",
                              "username",
                              "email",
                              "first_name",
                              "last_name"
                            ]
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
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/api/identity/users/profile/{id}": {
      "get": {
        "tags": [
          "users"
        ],
        "operationId": "GetUserProfileById",
        "summary": "Get user profile by Id",
        "description": "Get user profile of given user Id",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "Unique identifier",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "Returns user with given id",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "user_id": {
                      "type": "string",
                      "description": "user's email or username",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "provider": {
                      "type": "string",
                      "description": "One of (x-oapi-codegen-extra-tags-cloud, github, google)",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "email": {
                      "type": "string",
                      "format": "email",
                      "description": "email",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "first_name": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "First Name"
                    },
                    "last_name": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "Last Name"
                    },
                    "avatar_url": {
                      "type": "string",
                      "description": "Link for profile picture",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "status": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "bio": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "preferences": {
                      "type": "object",
                      "additionalProperties": {
                        "type": "string"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "accepted_terms_at": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "first_login_time": {
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "last_login_time": {
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    }
                  },
                  "required": [
                    "id",
                    "user_id",
                    "provider",
                    "email",
                    "first_name",
                    "last_name",
                    "status",
                    "created_at",
                    "updated_at",
                    "last_login_time",
                    "deleted_at"
                  ]
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
        },
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/api/identity/users/profile": {
      "get": {
        "tags": [
          "users"
        ],
        "operationId": "GetUser",
        "summary": "Get User details",
        "description": "Get user details for logged in user",
        "responses": {
          "200": {
            "description": "user details",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "user_id": {
                      "type": "string",
                      "description": "user's email or username",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "provider": {
                      "type": "string",
                      "description": "One of (x-oapi-codegen-extra-tags-cloud, github, google)",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "email": {
                      "type": "string",
                      "format": "email",
                      "description": "email",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "first_name": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "First Name"
                    },
                    "last_name": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "Last Name"
                    },
                    "avatar_url": {
                      "type": "string",
                      "description": "Link for profile picture",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "status": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "bio": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "preferences": {
                      "type": "object",
                      "additionalProperties": {
                        "type": "string"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "accepted_terms_at": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "first_login_time": {
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "last_login_time": {
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    }
                  },
                  "required": [
                    "id",
                    "user_id",
                    "provider",
                    "email",
                    "first_name",
                    "last_name",
                    "status",
                    "created_at",
                    "updated_at",
                    "last_login_time",
                    "deleted_at"
                  ]
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
        "security": [
          {
            "jwt": []
          }
        ]
      },
      "put": {
        "tags": [
          "users"
        ],
        "operationId": "UpdateProfile",
        "summary": "Update Profile",
        "description": "Update user profile data (also updates kratos identity)",
        "requestBody": {
          "description": "Body for upserting user",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    },
                    "x-go-type-skip-optional-pointer": true
                  },
                  "user_id": {
                    "type": "string",
                    "description": "user's email or username",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "provider": {
                    "type": "string",
                    "description": "One of (x-oapi-codegen-extra-tags-cloud, github, google)",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "email": {
                    "type": "string",
                    "format": "email",
                    "description": "email",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "first_name": {
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true,
                    "description": "First Name"
                  },
                  "last_name": {
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true,
                    "description": "Last Name"
                  },
                  "avatar_url": {
                    "type": "string",
                    "description": "Link for profile picture",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "status": {
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "bio": {
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "preferences": {
                    "type": "object",
                    "additionalProperties": {
                      "type": "string"
                    },
                    "x-go-type-skip-optional-pointer": true
                  },
                  "accepted_terms_at": {
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "first_login_time": {
                    "type": "string",
                    "format": "date-time",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "last_login_time": {
                    "type": "string",
                    "format": "date-time",
                    "x-go-type-skip-optional-pointer": true
                  }
                },
                "required": [
                  "id",
                  "user_id",
                  "provider",
                  "email",
                  "first_name",
                  "last_name",
                  "status",
                  "created_at",
                  "updated_at",
                  "last_login_time",
                  "deleted_at"
                ]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "created",
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
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/api/identity/users/profile/details": {
      "get": {
        "tags": [
          "users"
        ],
        "operationId": "GetProfileOverview",
        "summary": "Profile Overview",
        "description": "Get Profile overview for logged in user",
        "responses": {
          "200": {
            "description": "user account overview",
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "k8s_count": {
                      "type": "integer"
                    },
                    "app_count": {
                      "type": "integer"
                    },
                    "pattern_count": {
                      "type": "integer"
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
        },
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/api/identity/users/{user_id}/profile/activity": {
      "get": {
        "tags": [
          "users"
        ],
        "operationId": "GetUserActivity",
        "summary": "User Activity",
        "description": "Get last 10 user activities",
        "parameters": [
          {
            "name": "user_id",
            "in": "path",
            "description": "UUID of User",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "user activity",
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "recent_activity": {
                      "type": "array",
                      "items": {
                        "description": "Defines model for event_trackers",
                        "properties": {
                          "id": {
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "description": "UUID of the event.\n"
                          },
                          "user_id": {
                            "description": "UUID of the user that initiated the event. In most cases this would be present, but not always.\n",
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "user_id",
                              "json": "user_id"
                            },
                            "x-go-name": "UserID",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "system_id": {
                            "description": "The system from which the request is sourced. In the case of Meshery Server,\nthe ID is meshery_instance_id of Meshery Server (which can be found in the metadata of`Connections` table).\n",
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "system_id"
                            },
                            "x-go-name": "SystemID",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "operation_id": {
                            "description": "Each Event will have a OperationID. This field is never NULL, which is to say an operation can result in series of events, for eg: Different stages of Pattern Engine / activities of Workflow engine. Each operation (and sub-operation) will have a different operation ID.\n",
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "operation_id"
                            },
                            "x-go-name": "OperationID",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "category": {
                            "description": "Resource name on which the operation is invoked.\n",
                            "type": "string",
                            "example": "pattern",
                            "x-oapi-codegen-extra-tags": {
                              "db": "category"
                            }
                          },
                          "action": {
                            "description": "Action taken on the resource.\n",
                            "type": "string",
                            "example": "deployed",
                            "x-oapi-codegen-extra-tags": {
                              "db": "action"
                            }
                          },
                          "status": {
                            "description": "Status for the event.\n",
                            "type": "string",
                            "enum": [
                              "read",
                              "unread"
                            ],
                            "x-oapi-codegen-extra-tags": {
                              "db": "status"
                            }
                          },
                          "acted_upon": {
                            "type": "string",
                            "format": "uuid",
                            "description": "UUID of the entity on which the event was performed.\n",
                            "example": "110020-123230-434231-000213",
                            "x-go-type": "uuid.UUID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "acted_upon"
                            }
                          },
                          "description": {
                            "description": "A summary/receipt of event that occured.\n",
                            "type": "string",
                            "example": "“Prometheus” pattern deployed in K8s ctx “Meshery Cloud”.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "description"
                            }
                          },
                          "severity": {
                            "description": "A set of seven standard event levels.\n",
                            "type": "string",
                            "enum": [
                              "emergency",
                              "critical",
                              "alert",
                              "error",
                              "warning",
                              "debug",
                              "informational",
                              "success"
                            ],
                            "example": "info",
                            "x-oapi-codegen-extra-tags": {
                              "db": "severity"
                            }
                          },
                          "metadata": {
                            "description": "Contains meaningful information, specific to the type of event.\nStructure of metadata can be different for different events.\n",
                            "type": "object",
                            "x-go-type": "[]byte",
                            "x-oapi-codegen-extra-tags": {
                              "db": "metadata"
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
                        },
                        "required": [
                          "id",
                          "system_id",
                          "operation_id",
                          "category",
                          "action",
                          "status",
                          "acted_upon",
                          "description",
                          "severity",
                          "metadata",
                          "created_at",
                          "updated_at"
                        ]
                      }
                    }
                  }
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
        "security": []
      }
    },
    "/api/identity/users/online": {
      "get": {
        "tags": [
          "users"
        ],
        "operationId": "GetRecentlyOnlineUsers",
        "summary": "Online users",
        "description": "Get info of active / online users in last 24 hours",
        "responses": {
          "200": {
            "description": "active users",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string",
                        "format": "uuid",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        },
                        "x-go-type-skip-optional-pointer": true
                      },
                      "first_name": {
                        "type": "string",
                        "x-go-type-skip-optional-pointer": true,
                        "description": "First Name"
                      },
                      "last_name": {
                        "type": "string",
                        "x-go-type-skip-optional-pointer": true,
                        "description": "Last Name"
                      },
                      "avatar_url": {
                        "type": "string",
                        "description": "Link for profile picture",
                        "x-go-type-skip-optional-pointer": true
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
        },
        "security": [
          {
            "jwt": []
          }
        ]
      }
    },
    "/api/identity/badges": {
      "get": {
        "tags": [
          "users"
        ],
        "operationId": "GetAvailableBadges",
        "summary": "Gets available badges",
        "description": "Gets available badges",
        "responses": {
          "200": {
            "description": "Badges",
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "badges": {
                      "type": "object",
                      "additionalProperties": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-go-type-skip-optional-pointer": true
                          },
                          "name": {
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "description": {
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "label": {
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "svg_location": {
                            "type": "string",
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
                      }
                    },
                    "total_count": {
                      "type": "integer"
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
        },
        "security": [
          {
            "jwt": []
          }
        ]
      }
    }
  },
  "components": {
    "schemas": {
      "capability": {
        "properties": {
          "provider_type": {
            "description": "Provider type",
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "package_version": {
            "description": "Package version",
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "package_url": {
            "description": "Package url",
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "provider_name": {
            "description": "Provider name",
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "provider_description": {
            "type": "array",
            "items": {
              "type": "string",
              "x-go-type-skip-optional-pointer": true
            }
          },
          "extensions": {
            "properties": {
              "navigator": {
                "type": "array",
                "items": {
                  "properties": {
                    "title": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "Title"
                    },
                    "on_click_callback": {
                      "type": "integer"
                    },
                    "href": {
                      "properties": {
                        "uri": {
                          "type": "string",
                          "format": "uri"
                        },
                        "external": {
                          "type": "boolean"
                        }
                      }
                    },
                    "component": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "Component"
                    },
                    "icon": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "Icon link"
                    },
                    "link": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "link",
                      "format": "uri"
                    },
                    "show": {
                      "type": "boolean",
                      "description": "Controls whether to show the extension or not"
                    },
                    "type": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "Extension type"
                    },
                    "allowedTo": {
                      "type": "object"
                    }
                  }
                }
              },
              "user_prefs": {
                "type": "array",
                "items": {
                  "properties": {
                    "component": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "Component"
                    },
                    "type": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "Extension type"
                    }
                  }
                }
              },
              "graphql": {
                "type": "array",
                "items": {
                  "properties": {
                    "component": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "Component"
                    },
                    "path": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "Path"
                    },
                    "type": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "Extension type"
                    }
                  }
                }
              },
              "account": {
                "type": "array",
                "items": {
                  "properties": {
                    "title": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "Title"
                    },
                    "on_click_callback": {
                      "type": "integer"
                    },
                    "href": {
                      "properties": {
                        "uri": {
                          "type": "string",
                          "format": "uri"
                        },
                        "external": {
                          "type": "boolean"
                        }
                      }
                    },
                    "component": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "Component"
                    },
                    "link": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "link",
                      "format": "uri"
                    },
                    "show": {
                      "type": "boolean",
                      "description": "Controls whether to show the extension or not"
                    },
                    "type": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "Extension type"
                    }
                  }
                }
              }
            }
          },
          "capabilities": {
            "properties": {
              "feature": {
                "type": "string",
                "x-go-type-skip-optional-pointer": true,
                "description": "Feature name"
              },
              "endpoint": {
                "type": "string",
                "x-go-type-skip-optional-pointer": true
              }
            }
          },
          "restrictedAccess": {
            "properties": {
              "isMesheryUIRestricted": {
                "type": "boolean"
              },
              "allowedComponents": {
                "properties": {
                  "navigator": {
                    "type": "object"
                  },
                  "header": {
                    "type": "object"
                  }
                }
              }
            }
          }
        }
      },
      "capabilityNavigatorExtension": {
        "properties": {
          "title": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "Title"
          },
          "on_click_callback": {
            "type": "integer"
          },
          "href": {
            "properties": {
              "uri": {
                "type": "string",
                "format": "uri"
              },
              "external": {
                "type": "boolean"
              }
            }
          },
          "component": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "Component"
          },
          "icon": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "Icon link"
          },
          "link": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "link",
            "format": "uri"
          },
          "show": {
            "type": "boolean",
            "description": "Controls whether to show the extension or not"
          },
          "type": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "Extension type"
          },
          "allowedTo": {
            "type": "object"
          }
        }
      },
      "capabilityUserPrefExtension": {
        "properties": {
          "component": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "Component"
          },
          "type": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "Extension type"
          }
        }
      },
      "capabilityGraphQLExtension": {
        "properties": {
          "component": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "Component"
          },
          "path": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "Path"
          },
          "type": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "Extension type"
          }
        }
      },
      "capabilitiesAccountExtension": {
        "properties": {
          "title": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "Title"
          },
          "on_click_callback": {
            "type": "integer"
          },
          "href": {
            "properties": {
              "uri": {
                "type": "string",
                "format": "uri"
              },
              "external": {
                "type": "boolean"
              }
            }
          },
          "component": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "Component"
          },
          "link": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "link",
            "format": "uri"
          },
          "show": {
            "type": "boolean",
            "description": "Controls whether to show the extension or not"
          },
          "type": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "Extension type"
          }
        }
      },
      "restrictedAccess": {
        "properties": {
          "isMesheryUIRestricted": {
            "type": "boolean"
          },
          "allowedComponents": {
            "properties": {
              "navigator": {
                "type": "object"
              },
              "header": {
                "type": "object"
              }
            }
          }
        }
      },
      "capabilityGeneralCapability": {
        "properties": {
          "feature": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "Feature name"
          },
          "endpoint": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "capabilityExtension": {
        "properties": {
          "navigator": {
            "type": "array",
            "items": {
              "properties": {
                "title": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true,
                  "description": "Title"
                },
                "on_click_callback": {
                  "type": "integer"
                },
                "href": {
                  "properties": {
                    "uri": {
                      "type": "string",
                      "format": "uri"
                    },
                    "external": {
                      "type": "boolean"
                    }
                  }
                },
                "component": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true,
                  "description": "Component"
                },
                "icon": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true,
                  "description": "Icon link"
                },
                "link": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true,
                  "description": "link",
                  "format": "uri"
                },
                "show": {
                  "type": "boolean",
                  "description": "Controls whether to show the extension or not"
                },
                "type": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true,
                  "description": "Extension type"
                },
                "allowedTo": {
                  "type": "object"
                }
              }
            }
          },
          "user_prefs": {
            "type": "array",
            "items": {
              "properties": {
                "component": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true,
                  "description": "Component"
                },
                "type": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true,
                  "description": "Extension type"
                }
              }
            }
          },
          "graphql": {
            "type": "array",
            "items": {
              "properties": {
                "component": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true,
                  "description": "Component"
                },
                "path": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true,
                  "description": "Path"
                },
                "type": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true,
                  "description": "Extension type"
                }
              }
            }
          },
          "account": {
            "type": "array",
            "items": {
              "properties": {
                "title": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true,
                  "description": "Title"
                },
                "on_click_callback": {
                  "type": "integer"
                },
                "href": {
                  "properties": {
                    "uri": {
                      "type": "string",
                      "format": "uri"
                    },
                    "external": {
                      "type": "boolean"
                    }
                  }
                },
                "component": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true,
                  "description": "Component"
                },
                "link": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true,
                  "description": "link",
                  "format": "uri"
                },
                "show": {
                  "type": "boolean",
                  "description": "Controls whether to show the extension or not"
                },
                "type": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true,
                  "description": "Extension type"
                }
              }
            }
          }
        }
      },
      "provider": {
        "type": "string",
        "description": "One of (x-oapi-codegen-extra-tags-cloud, github, google)",
        "x-go-type-skip-optional-pointer": true
      },
      "text": {
        "type": "string",
        "x-go-type-skip-optional-pointer": true
      },
      "connection": {
        "$id": "https://schemas.meshery.io/component.json",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "description": "Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections",
        "additionalProperties": false,
        "type": "object",
        "required": [
          "kind",
          "type",
          "status"
        ],
        "properties": {
          "id": {
            "x-order": 1,
            "description": "ID",
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "default": "00000000-00000000-00000000-00000000"
          },
          "name": {
            "x-oapi-codegen-extra-tags": {
              "db": "name",
              "yaml": "name"
            },
            "x-order": 2,
            "type": "string",
            "description": "Connection Name"
          },
          "credential_id": {
            "x-go-name": "CredentialId",
            "x-oapi-codegen-extra-tags": {
              "db": "credential_id",
              "yaml": "credential_id"
            },
            "x-order": 3,
            "description": "Credential ID",
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "default": "00000000-00000000-00000000-00000000"
          },
          "type": {
            "x-oapi-codegen-extra-tags": {
              "db": "type",
              "yaml": "type"
            },
            "x-order": 4,
            "type": "string",
            "description": "Connection Type"
          },
          "sub_type": {
            "x-oapi-codegen-extra-tags": {
              "db": "sub_type",
              "yaml": "sub_type"
            },
            "x-order": 5,
            "type": "string",
            "description": "Connection Subtype"
          },
          "kind": {
            "x-oapi-codegen-extra-tags": {
              "db": "kind",
              "yaml": "kind"
            },
            "x-order": 6,
            "type": "string",
            "description": "Connection Kind"
          },
          "metadata": {
            "x-oapi-codegen-extra-tags": {
              "db": "metadata",
              "yaml": "metadata"
            },
            "x-order": 7,
            "type": "object"
          },
          "status": {
            "x-oapi-codegen-extra-tags": {
              "db": "status",
              "yaml": "status"
            },
            "x-order": 8,
            "description": "Connection Status",
            "type": "string",
            "enum": [
              "discovered",
              "registered",
              "connected",
              "ignored",
              "maintenance",
              "disconnected",
              "deleted",
              "not found"
            ]
          },
          "user_id": {
            "x-go-name": "UserID",
            "x-oapi-codegen-extra-tags": {
              "yaml": "user_id",
              "json": "user_id"
            },
            "x-order": 9,
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "default": "00000000-00000000-00000000-00000000"
          },
          "created_at": {
            "x-oapi-codegen-extra-tags": {
              "yaml": "created_at",
              "json": "created_at"
            },
            "x-order": 10,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updated_at": {
            "x-oapi-codegen-extra-tags": {
              "yaml": "updated_at",
              "json": "updated_at"
            },
            "x-order": 11,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deleted_at": {
            "x-oapi-codegen-extra-tags": {
              "yaml": "deleted_at",
              "json": "deleted_at"
            },
            "x-order": 12,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "mesheryInstance": {
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-type-skip-optional-pointer": true,
            "description": "Connection id"
          },
          "name": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "Connection name"
          },
          "server_id": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "Connected server id"
          },
          "server_version": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "Running server version"
          },
          "server_location": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "server_build_sha": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "Server build SHA"
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
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "status": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "Status"
          }
        }
      },
      "connectionPage": {
        "allOf": [
          {
            "discriminator": {
              "propertyName": "resultType"
            },
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
              "resultType": {
                "type": "string",
                "x-go-type-skip-optional-pointer": true
              }
            },
            "x-go-type-skip-optional-pointer": true
          },
          {
            "type": "object",
            "properties": {
              "connections": {
                "x-go-type-skip-optional-pointer": true,
                "type": "array",
                "items": {
                  "$id": "https://schemas.meshery.io/component.json",
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "description": "Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections",
                  "additionalProperties": false,
                  "type": "object",
                  "required": [
                    "kind",
                    "type",
                    "status"
                  ],
                  "properties": {
                    "id": {
                      "x-order": 1,
                      "description": "ID",
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "default": "00000000-00000000-00000000-00000000"
                    },
                    "name": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "name",
                        "yaml": "name"
                      },
                      "x-order": 2,
                      "type": "string",
                      "description": "Connection Name"
                    },
                    "credential_id": {
                      "x-go-name": "CredentialId",
                      "x-oapi-codegen-extra-tags": {
                        "db": "credential_id",
                        "yaml": "credential_id"
                      },
                      "x-order": 3,
                      "description": "Credential ID",
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "default": "00000000-00000000-00000000-00000000"
                    },
                    "type": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "type",
                        "yaml": "type"
                      },
                      "x-order": 4,
                      "type": "string",
                      "description": "Connection Type"
                    },
                    "sub_type": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "sub_type",
                        "yaml": "sub_type"
                      },
                      "x-order": 5,
                      "type": "string",
                      "description": "Connection Subtype"
                    },
                    "kind": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "kind",
                        "yaml": "kind"
                      },
                      "x-order": 6,
                      "type": "string",
                      "description": "Connection Kind"
                    },
                    "metadata": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata",
                        "yaml": "metadata"
                      },
                      "x-order": 7,
                      "type": "object"
                    },
                    "status": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "status",
                        "yaml": "status"
                      },
                      "x-order": 8,
                      "description": "Connection Status",
                      "type": "string",
                      "enum": [
                        "discovered",
                        "registered",
                        "connected",
                        "ignored",
                        "maintenance",
                        "disconnected",
                        "deleted",
                        "not found"
                      ]
                    },
                    "user_id": {
                      "x-go-name": "UserID",
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "user_id",
                        "json": "user_id"
                      },
                      "x-order": 9,
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "default": "00000000-00000000-00000000-00000000"
                    },
                    "created_at": {
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "created_at",
                        "json": "created_at"
                      },
                      "x-order": 10,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updated_at": {
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "updated_at",
                        "json": "updated_at"
                      },
                      "x-order": 11,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deleted_at": {
                      "x-oapi-codegen-extra-tags": {
                        "yaml": "deleted_at",
                        "json": "deleted_at"
                      },
                      "x-order": 12,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    }
                  }
                }
              }
            }
          }
        ]
      },
      "connectionStatusInfo": {
        "properties": {
          "status": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "Connection status"
          },
          "count": {
            "type": "integer",
            "description": "Number of connections having the status",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "connectionsStatusPage": {
        "properties": {
          "connections_status": {
            "x-go-type-skip-optional-pointer": true,
            "type": "array",
            "items": {
              "properties": {
                "status": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true,
                  "description": "Connection status"
                },
                "count": {
                  "type": "integer",
                  "description": "Number of connections having the status",
                  "x-go-type-skip-optional-pointer": true
                }
              }
            }
          }
        }
      },
      "k8sContext": {
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "name": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "auth": {
            "type": "object",
            "additionalProperties": {
              "type": "string"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "cluster": {
            "type": "object",
            "additionalProperties": {
              "type": "string"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "server": {
            "type": "string"
          },
          "owner": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "created_by": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "meshery_instance_id": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "kubernetes_server_id": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "deployment_type": {
            "type": "string"
          },
          "updated_at": {
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "created_at": {
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "k8sContextPersistResponse": {
        "properties": {
          "k8sContext": {
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                },
                "x-go-type-skip-optional-pointer": true
              },
              "name": {
                "type": "string",
                "x-go-type-skip-optional-pointer": true
              },
              "auth": {
                "type": "object",
                "additionalProperties": {
                  "type": "string"
                },
                "x-go-type-skip-optional-pointer": true
              },
              "cluster": {
                "type": "object",
                "additionalProperties": {
                  "type": "string"
                },
                "x-go-type-skip-optional-pointer": true
              },
              "server": {
                "type": "string"
              },
              "owner": {
                "type": "string",
                "format": "uuid",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                },
                "x-go-type-skip-optional-pointer": true
              },
              "created_by": {
                "type": "string",
                "format": "uuid",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                },
                "x-go-type-skip-optional-pointer": true
              },
              "meshery_instance_id": {
                "type": "string",
                "format": "uuid",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                },
                "x-go-type-skip-optional-pointer": true
              },
              "kubernetes_server_id": {
                "type": "string",
                "format": "uuid",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                },
                "x-go-type-skip-optional-pointer": true
              },
              "deployment_type": {
                "type": "string"
              },
              "updated_at": {
                "type": "string",
                "format": "date-time",
                "x-go-type-skip-optional-pointer": true
              },
              "created_at": {
                "type": "string",
                "format": "date-time",
                "x-go-type-skip-optional-pointer": true
              }
            }
          },
          "inserted": {
            "type": "boolean"
          }
        }
      },
      "resultsPage": {
        "discriminator": {
          "propertyName": "resultType"
        },
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
          "resultType": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          }
        },
        "x-go-type-skip-optional-pointer": true
      },
      "uuid": {
        "type": "string",
        "format": "uuid",
        "description": "A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas.",
        "x-go-type": "uuid.UUID",
        "x-go-type-import": {
          "path": "github.com/gofrs/uuid"
        },
        "default": "00000000-00000000-00000000-00000000"
      },
      "time": {
        "type": "string",
        "format": "date-time",
        "x-go-type-skip-optional-pointer": true
      },
      "map_object": {
        "type": "object",
        "additionalProperties": {
          "type": "string"
        },
        "x-go-type-skip-optional-pointer": true
      },
      "id": {
        "type": "string",
        "format": "uuid",
        "x-go-type": "uuid.UUID",
        "x-go-type-import": {
          "path": "github.com/gofrs/uuid"
        },
        "x-go-type-skip-optional-pointer": true
      },
      "credential": {
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "user_id": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "name": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "type": {
            "type": "string"
          },
          "secret": {
            "type": "object",
            "additionalProperties": {
              "type": "string"
            },
            "x-go-type-skip-optional-pointer": true
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
      "credentialsPage": {
        "allOf": [
          {
            "discriminator": {
              "propertyName": "resultType"
            },
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
              "resultType": {
                "type": "string",
                "x-go-type-skip-optional-pointer": true
              }
            },
            "x-go-type-skip-optional-pointer": true
          },
          {
            "type": "object",
            "properties": {
              "credential": {
                "type": "array",
                "items": {
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "user_id": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "name": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "type": {
                      "type": "string"
                    },
                    "secret": {
                      "type": "object",
                      "additionalProperties": {
                        "type": "string"
                      },
                      "x-go-type-skip-optional-pointer": true
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
        ]
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
      },
      "eventType": {
        "type": "string",
        "x-oapi-codegen-extra-tags": {
          "db": "event_type"
        }
      },
      "event": {
        "description": "Defines model for event_trackers",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-type-skip-optional-pointer": true,
            "description": "UUID of the event.\n"
          },
          "user_id": {
            "description": "UUID of the user that initiated the event. In most cases this would be present, but not always.\n",
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "user_id",
              "json": "user_id"
            },
            "x-go-name": "UserID",
            "x-go-type-skip-optional-pointer": true
          },
          "system_id": {
            "description": "The system from which the request is sourced. In the case of Meshery Server,\nthe ID is meshery_instance_id of Meshery Server (which can be found in the metadata of`Connections` table).\n",
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "system_id"
            },
            "x-go-name": "SystemID",
            "x-go-type-skip-optional-pointer": true
          },
          "operation_id": {
            "description": "Each Event will have a OperationID. This field is never NULL, which is to say an operation can result in series of events, for eg: Different stages of Pattern Engine / activities of Workflow engine. Each operation (and sub-operation) will have a different operation ID.\n",
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "operation_id"
            },
            "x-go-name": "OperationID",
            "x-go-type-skip-optional-pointer": true
          },
          "category": {
            "description": "Resource name on which the operation is invoked.\n",
            "type": "string",
            "example": "pattern",
            "x-oapi-codegen-extra-tags": {
              "db": "category"
            }
          },
          "action": {
            "description": "Action taken on the resource.\n",
            "type": "string",
            "example": "deployed",
            "x-oapi-codegen-extra-tags": {
              "db": "action"
            }
          },
          "status": {
            "description": "Status for the event.\n",
            "type": "string",
            "enum": [
              "read",
              "unread"
            ],
            "x-oapi-codegen-extra-tags": {
              "db": "status"
            }
          },
          "acted_upon": {
            "type": "string",
            "format": "uuid",
            "description": "UUID of the entity on which the event was performed.\n",
            "example": "110020-123230-434231-000213",
            "x-go-type": "uuid.UUID",
            "x-oapi-codegen-extra-tags": {
              "db": "acted_upon"
            }
          },
          "description": {
            "description": "A summary/receipt of event that occured.\n",
            "type": "string",
            "example": "“Prometheus” pattern deployed in K8s ctx “Meshery Cloud”.",
            "x-oapi-codegen-extra-tags": {
              "db": "description"
            }
          },
          "severity": {
            "description": "A set of seven standard event levels.\n",
            "type": "string",
            "enum": [
              "emergency",
              "critical",
              "alert",
              "error",
              "warning",
              "debug",
              "informational",
              "success"
            ],
            "example": "info",
            "x-oapi-codegen-extra-tags": {
              "db": "severity"
            }
          },
          "metadata": {
            "description": "Contains meaningful information, specific to the type of event.\nStructure of metadata can be different for different events.\n",
            "type": "object",
            "x-go-type": "[]byte",
            "x-oapi-codegen-extra-tags": {
              "db": "metadata"
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
        },
        "required": [
          "id",
          "system_id",
          "operation_id",
          "category",
          "action",
          "status",
          "acted_upon",
          "description",
          "severity",
          "metadata",
          "created_at",
          "updated_at"
        ]
      },
      "events_filter": {
        "type": "object",
        "properties": {
          "provider": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "category": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "action": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "severity": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "limit": {
            "type": "integer"
          },
          "offset": {
            "type": "integer"
          },
          "sort_on": {
            "type": "string",
            "description": "Field on which records are sorted"
          },
          "order": {
            "type": "string",
            "description": "order of sort asc/desc, default is asc"
          }
        },
        "required": [
          "provider",
          "category",
          "action",
          "severity",
          "limit",
          "offset",
          "sort_on",
          "order"
        ]
      },
      "eventTrackerGrouped": {
        "properties": {
          "count": {
            "type": "integer"
          },
          "event_type": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "dt": {
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "week": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "month": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "year": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "eventTrackerGroupedArray": {
        "type": "array",
        "items": {
          "properties": {
            "count": {
              "type": "integer"
            },
            "event_type": {
              "type": "string",
              "x-go-type-skip-optional-pointer": true
            },
            "dt": {
              "type": "string",
              "format": "date-time",
              "x-go-type-skip-optional-pointer": true
            },
            "week": {
              "type": "string",
              "x-go-type-skip-optional-pointer": true
            },
            "month": {
              "type": "string",
              "x-go-type-skip-optional-pointer": true
            },
            "year": {
              "type": "string",
              "x-go-type-skip-optional-pointer": true
            }
          }
        }
      },
      "eventResult": {
        "properties": {
          "event": {
            "description": "Defines model for event_trackers",
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                },
                "x-go-type-skip-optional-pointer": true,
                "description": "UUID of the event.\n"
              },
              "user_id": {
                "description": "UUID of the user that initiated the event. In most cases this would be present, but not always.\n",
                "type": "string",
                "format": "uuid",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                },
                "x-oapi-codegen-extra-tags": {
                  "db": "user_id",
                  "json": "user_id"
                },
                "x-go-name": "UserID",
                "x-go-type-skip-optional-pointer": true
              },
              "system_id": {
                "description": "The system from which the request is sourced. In the case of Meshery Server,\nthe ID is meshery_instance_id of Meshery Server (which can be found in the metadata of`Connections` table).\n",
                "type": "string",
                "format": "uuid",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                },
                "x-oapi-codegen-extra-tags": {
                  "db": "system_id"
                },
                "x-go-name": "SystemID",
                "x-go-type-skip-optional-pointer": true
              },
              "operation_id": {
                "description": "Each Event will have a OperationID. This field is never NULL, which is to say an operation can result in series of events, for eg: Different stages of Pattern Engine / activities of Workflow engine. Each operation (and sub-operation) will have a different operation ID.\n",
                "type": "string",
                "format": "uuid",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                },
                "x-oapi-codegen-extra-tags": {
                  "db": "operation_id"
                },
                "x-go-name": "OperationID",
                "x-go-type-skip-optional-pointer": true
              },
              "category": {
                "description": "Resource name on which the operation is invoked.\n",
                "type": "string",
                "example": "pattern",
                "x-oapi-codegen-extra-tags": {
                  "db": "category"
                }
              },
              "action": {
                "description": "Action taken on the resource.\n",
                "type": "string",
                "example": "deployed",
                "x-oapi-codegen-extra-tags": {
                  "db": "action"
                }
              },
              "status": {
                "description": "Status for the event.\n",
                "type": "string",
                "enum": [
                  "read",
                  "unread"
                ],
                "x-oapi-codegen-extra-tags": {
                  "db": "status"
                }
              },
              "acted_upon": {
                "type": "string",
                "format": "uuid",
                "description": "UUID of the entity on which the event was performed.\n",
                "example": "110020-123230-434231-000213",
                "x-go-type": "uuid.UUID",
                "x-oapi-codegen-extra-tags": {
                  "db": "acted_upon"
                }
              },
              "description": {
                "description": "A summary/receipt of event that occured.\n",
                "type": "string",
                "example": "“Prometheus” pattern deployed in K8s ctx “Meshery Cloud”.",
                "x-oapi-codegen-extra-tags": {
                  "db": "description"
                }
              },
              "severity": {
                "description": "A set of seven standard event levels.\n",
                "type": "string",
                "enum": [
                  "emergency",
                  "critical",
                  "alert",
                  "error",
                  "warning",
                  "debug",
                  "informational",
                  "success"
                ],
                "example": "info",
                "x-oapi-codegen-extra-tags": {
                  "db": "severity"
                }
              },
              "metadata": {
                "description": "Contains meaningful information, specific to the type of event.\nStructure of metadata can be different for different events.\n",
                "type": "object",
                "x-go-type": "[]byte",
                "x-oapi-codegen-extra-tags": {
                  "db": "metadata"
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
            },
            "required": [
              "id",
              "system_id",
              "operation_id",
              "category",
              "action",
              "status",
              "acted_upon",
              "description",
              "severity",
              "metadata",
              "created_at",
              "updated_at"
            ]
          },
          "events_count": {
            "type": "integer",
            "x-oapi-codegen-extra-tags": {
              "db": "events_count"
            }
          }
        },
        "required": [
          "event",
          "events_count"
        ]
      },
      "eventsPage": {
        "allOf": [
          {
            "discriminator": {
              "propertyName": "recordType"
            },
            "properties": {
              "page": {
                "type": "integer",
                "x-go-type-skip-optional-pointer": true
              },
              "page_size": {
                "type": "integer",
                "x-go-type-skip-optional-pointer": true
              },
              "records_total": {
                "type": "integer",
                "x-go-type-skip-optional-pointer": true
              },
              "recordType": {
                "type": "string",
                "x-go-type-skip-optional-pointer": true
              }
            },
            "x-go-type-skip-optional-pointer": true
          },
          {
            "type": "object",
            "properties": {
              "data": {
                "type": "array",
                "items": {
                  "properties": {
                    "event": {
                      "description": "Defines model for event_trackers",
                      "properties": {
                        "id": {
                          "type": "string",
                          "format": "uuid",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-go-type-skip-optional-pointer": true,
                          "description": "UUID of the event.\n"
                        },
                        "user_id": {
                          "description": "UUID of the user that initiated the event. In most cases this would be present, but not always.\n",
                          "type": "string",
                          "format": "uuid",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "user_id",
                            "json": "user_id"
                          },
                          "x-go-name": "UserID",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "system_id": {
                          "description": "The system from which the request is sourced. In the case of Meshery Server,\nthe ID is meshery_instance_id of Meshery Server (which can be found in the metadata of`Connections` table).\n",
                          "type": "string",
                          "format": "uuid",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "system_id"
                          },
                          "x-go-name": "SystemID",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "operation_id": {
                          "description": "Each Event will have a OperationID. This field is never NULL, which is to say an operation can result in series of events, for eg: Different stages of Pattern Engine / activities of Workflow engine. Each operation (and sub-operation) will have a different operation ID.\n",
                          "type": "string",
                          "format": "uuid",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "operation_id"
                          },
                          "x-go-name": "OperationID",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "category": {
                          "description": "Resource name on which the operation is invoked.\n",
                          "type": "string",
                          "example": "pattern",
                          "x-oapi-codegen-extra-tags": {
                            "db": "category"
                          }
                        },
                        "action": {
                          "description": "Action taken on the resource.\n",
                          "type": "string",
                          "example": "deployed",
                          "x-oapi-codegen-extra-tags": {
                            "db": "action"
                          }
                        },
                        "status": {
                          "description": "Status for the event.\n",
                          "type": "string",
                          "enum": [
                            "read",
                            "unread"
                          ],
                          "x-oapi-codegen-extra-tags": {
                            "db": "status"
                          }
                        },
                        "acted_upon": {
                          "type": "string",
                          "format": "uuid",
                          "description": "UUID of the entity on which the event was performed.\n",
                          "example": "110020-123230-434231-000213",
                          "x-go-type": "uuid.UUID",
                          "x-oapi-codegen-extra-tags": {
                            "db": "acted_upon"
                          }
                        },
                        "description": {
                          "description": "A summary/receipt of event that occured.\n",
                          "type": "string",
                          "example": "“Prometheus” pattern deployed in K8s ctx “Meshery Cloud”.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "description"
                          }
                        },
                        "severity": {
                          "description": "A set of seven standard event levels.\n",
                          "type": "string",
                          "enum": [
                            "emergency",
                            "critical",
                            "alert",
                            "error",
                            "warning",
                            "debug",
                            "informational",
                            "success"
                          ],
                          "example": "info",
                          "x-oapi-codegen-extra-tags": {
                            "db": "severity"
                          }
                        },
                        "metadata": {
                          "description": "Contains meaningful information, specific to the type of event.\nStructure of metadata can be different for different events.\n",
                          "type": "object",
                          "x-go-type": "[]byte",
                          "x-oapi-codegen-extra-tags": {
                            "db": "metadata"
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
                      },
                      "required": [
                        "id",
                        "system_id",
                        "operation_id",
                        "category",
                        "action",
                        "status",
                        "acted_upon",
                        "description",
                        "severity",
                        "metadata",
                        "created_at",
                        "updated_at"
                      ]
                    },
                    "events_count": {
                      "type": "integer",
                      "x-oapi-codegen-extra-tags": {
                        "db": "events_count"
                      }
                    }
                  },
                  "required": [
                    "event",
                    "events_count"
                  ]
                }
              }
            }
          }
        ]
      },
      "eventSummary": {
        "properties": {
          "user_id": {
            "type": "string",
            "description": "user's email or username"
          },
          "provider": {
            "type": "string"
          },
          "email": {
            "type": "string"
          },
          "first_name": {
            "type": "string",
            "description": "First Name"
          },
          "last_name": {
            "type": "string",
            "description": "Last Name"
          },
          "activity_count": {
            "type": "integer"
          },
          "login_count": {
            "type": "integer"
          },
          "signup_count": {
            "type": "integer"
          },
          "perf_results_count": {
            "type": "integer"
          },
          "smi_results_count": {
            "type": "integer"
          },
          "meshery_apps_count": {
            "type": "integer"
          },
          "meshery_patterns_count": {
            "type": "integer"
          },
          "meshery_filters_count": {
            "type": "integer"
          },
          "last_login_time": {
            "type": "string",
            "format": "data-time",
            "x-go-type": "time.Time"
          }
        },
        "required": [
          "user_id",
          "provider",
          "email",
          "first_name",
          "last_name",
          "activity_count",
          "login_count",
          "signup_count",
          "perf_results_count",
          "smi_results_count",
          "meshery_apps_count",
          "meshery_patterns_count",
          "meshery_filters_count",
          "last_login_time"
        ]
      },
      "eventSummaryPage": {
        "allOf": [
          {
            "discriminator": {
              "propertyName": "recordType"
            },
            "properties": {
              "page": {
                "type": "integer",
                "x-go-type-skip-optional-pointer": true
              },
              "page_size": {
                "type": "integer",
                "x-go-type-skip-optional-pointer": true
              },
              "records_total": {
                "type": "integer",
                "x-go-type-skip-optional-pointer": true
              },
              "recordType": {
                "type": "string",
                "x-go-type-skip-optional-pointer": true
              }
            },
            "x-go-type-skip-optional-pointer": true
          },
          {
            "type": "object",
            "properties": {
              "data": {
                "type": "array",
                "items": {
                  "properties": {
                    "user_id": {
                      "type": "string",
                      "description": "user's email or username"
                    },
                    "provider": {
                      "type": "string"
                    },
                    "email": {
                      "type": "string"
                    },
                    "first_name": {
                      "type": "string",
                      "description": "First Name"
                    },
                    "last_name": {
                      "type": "string",
                      "description": "Last Name"
                    },
                    "activity_count": {
                      "type": "integer"
                    },
                    "login_count": {
                      "type": "integer"
                    },
                    "signup_count": {
                      "type": "integer"
                    },
                    "perf_results_count": {
                      "type": "integer"
                    },
                    "smi_results_count": {
                      "type": "integer"
                    },
                    "meshery_apps_count": {
                      "type": "integer"
                    },
                    "meshery_patterns_count": {
                      "type": "integer"
                    },
                    "meshery_filters_count": {
                      "type": "integer"
                    },
                    "last_login_time": {
                      "type": "string",
                      "format": "data-time",
                      "x-go-type": "time.Time"
                    }
                  },
                  "required": [
                    "user_id",
                    "provider",
                    "email",
                    "first_name",
                    "last_name",
                    "activity_count",
                    "login_count",
                    "signup_count",
                    "perf_results_count",
                    "smi_results_count",
                    "meshery_apps_count",
                    "meshery_patterns_count",
                    "meshery_filters_count",
                    "last_login_time"
                  ]
                }
              }
            }
          }
        ]
      },
      "eventsAggregate": {
        "properties": {
          "audit": {
            "type": "integer",
            "description": "Number of audit events"
          },
          "summary": {
            "type": "integer",
            "description": "Number of summary events"
          }
        }
      },
      "recordsPage": {
        "discriminator": {
          "propertyName": "recordType"
        },
        "properties": {
          "page": {
            "type": "integer",
            "x-go-type-skip-optional-pointer": true
          },
          "page_size": {
            "type": "integer",
            "x-go-type-skip-optional-pointer": true
          },
          "records_total": {
            "type": "integer",
            "x-go-type-skip-optional-pointer": true
          },
          "recordType": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          }
        },
        "x-go-type-skip-optional-pointer": true
      },
      "user_uuid": {
        "type": "string",
        "format": "uuid",
        "x-go-type": "uuid.UUID",
        "x-go-type-import": {
          "path": "github.com/gofrs/uuid"
        },
        "x-oapi-codegen-extra-tags": {
          "db": "user_id",
          "json": "user_id"
        },
        "x-go-name": "UserID",
        "x-go-type-skip-optional-pointer": true
      },
      "system_id": {
        "type": "string",
        "format": "uuid",
        "x-go-type": "uuid.UUID",
        "x-go-type-import": {
          "path": "github.com/gofrs/uuid"
        },
        "x-oapi-codegen-extra-tags": {
          "db": "system_id"
        },
        "x-go-name": "SystemID",
        "x-go-type-skip-optional-pointer": true
      },
      "operation_id": {
        "type": "string",
        "format": "uuid",
        "x-go-type": "uuid.UUID",
        "x-go-type-import": {
          "path": "github.com/gofrs/uuid"
        },
        "x-oapi-codegen-extra-tags": {
          "db": "operation_id"
        },
        "x-go-name": "OperationID",
        "x-go-type-skip-optional-pointer": true
      },
      "mesheryFilter": {
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-type-skip-optional-pointer": true,
            "description": "Connection id"
          },
          "user_id": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "filter_file": {
            "type": "string",
            "format": "byte",
            "description": "Filter file"
          },
          "name": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "Filter Name"
          },
          "location": {
            "type": "object",
            "additionalProperties": {
              "type": "string"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "visibility": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "catalog_data": {
            "type": "object",
            "additionalProperties": {
              "type": "string"
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
          }
        }
      },
      "mesheryFilterPage": {
        "allOf": [
          {
            "discriminator": {
              "propertyName": "resultType"
            },
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
              "resultType": {
                "type": "string",
                "x-go-type-skip-optional-pointer": true
              }
            },
            "x-go-type-skip-optional-pointer": true
          },
          {
            "type": "object",
            "properties": {
              "filters": {
                "type": "array",
                "items": {
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "description": "Connection id"
                    },
                    "user_id": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "filter_file": {
                      "type": "string",
                      "format": "byte",
                      "description": "Filter file"
                    },
                    "name": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "Filter Name"
                    },
                    "location": {
                      "type": "object",
                      "additionalProperties": {
                        "type": "string"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "visibility": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "catalog_data": {
                      "type": "object",
                      "additionalProperties": {
                        "type": "string"
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
                    }
                  }
                }
              }
            }
          }
        ]
      },
      "ImportRequest": {
        "type": "object",
        "required": [
          "importBody",
          "uploadType",
          "register"
        ],
        "properties": {
          "importBody": {
            "type": "object",
            "required": [
              "model_file",
              "url",
              "file_name",
              "model_csv",
              "component_csv",
              "relationship_csv",
              "model"
            ],
            "properties": {
              "model_file": {
                "type": "string",
                "format": "byte",
                "description": "This represents the binary content of the file as a byte array"
              },
              "url": {
                "type": "string"
              },
              "file_name": {
                "type": "string"
              },
              "model_csv": {
                "type": "string"
              },
              "component_csv": {
                "type": "string"
              },
              "relationship_csv": {
                "type": "string"
              },
              "model": {
                "type": "object",
                "required": [
                  "modelDisplayName",
                  "registrant",
                  "model",
                  "category",
                  "subCategory",
                  "shape",
                  "primaryColor",
                  "secondaryColor",
                  "svgColor",
                  "svgWhite",
                  "svgComplete",
                  "isAnnotation",
                  "publishToRegistry"
                ],
                "properties": {
                  "modelDisplayName": {
                    "type": "string"
                  },
                  "registrant": {
                    "type": "string"
                  },
                  "model": {
                    "type": "string"
                  },
                  "category": {
                    "$id": "https://schemas.meshery.io/category.json",
                    "$schema": "http://json-schema.org/draft-07/schema#",
                    "type": "object",
                    "description": "Category of the model.",
                    "required": [
                      "id",
                      "name",
                      "metadata"
                    ],
                    "properties": {
                      "id": {
                        "x-order": 1,
                        "type": "string",
                        "format": "uuid",
                        "description": "A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas.",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        },
                        "default": "00000000-00000000-00000000-00000000"
                      },
                      "name": {
                        "type": "string",
                        "minLength": 1,
                        "maxLength": 100,
                        "x-oapi-codegen-extra-tags": {
                          "yaml": "name",
                          "json": "name",
                          "gorm": "name"
                        },
                        "default": "Uncategorized",
                        "description": "The category of the model that determines the main grouping.",
                        "enum": [
                          "Analytics",
                          "App Definition and Development",
                          "Cloud Native Network",
                          "Cloud Native Storage",
                          "Database",
                          "Machine Learning",
                          "Observability and Analysis",
                          "Orchestration & Management",
                          "Platform",
                          "Provisioning",
                          "Runtime",
                          "Security & Compliance",
                          "Serverless",
                          "Tools",
                          "Uncategorized"
                        ],
                        "x-order": 2
                      },
                      "metadata": {
                        "type": "object",
                        "x-oapi-codegen-extra-tags": {
                          "yaml": "metadata,omitempty",
                          "json": "metadata,omitempty",
                          "gorm": "type:bytes;serializer:json"
                        },
                        "x-order": 3
                      }
                    }
                  },
                  "subCategory": {
                    "$id": "https://schemas.meshery.io/category.json",
                    "$schema": "http://json-schema.org/draft-07/schema#",
                    "type": "string",
                    "title": "SubCategory",
                    "description": "Sub category of the model determines the secondary grouping.",
                    "default": "Uncategorized",
                    "enum": [
                      "API Gateway",
                      "API Integration",
                      "Application Definition & Image Build",
                      "Automation & Configuration",
                      "Certified Kubernetes - Distribution",
                      "Chaos Engineering",
                      "Cloud Native Storage",
                      "Cloud Provider",
                      "CNI",
                      "Compute",
                      "Container Registry",
                      "Container Runtime",
                      "Container Security",
                      "Container",
                      "Content Delivery Network",
                      "Continuous Integration & Delivery",
                      "Coordination & Service Discovery",
                      "Database",
                      "Flowchart",
                      "Framework",
                      "Installable Platform",
                      "Key Management",
                      "Key Management Service",
                      "Kubernetes",
                      "Logging",
                      "Machine Learning",
                      "Management Governance",
                      "Metrics",
                      "Monitoring",
                      "Networking Content Delivery",
                      "Operating System",
                      "Query",
                      "Remote Procedure Call",
                      "Scheduling & Orchestration",
                      "Secrets Management",
                      "Security Identity & Compliance",
                      "Service Mesh",
                      "Service Proxy",
                      "Source Version Control",
                      "Storage",
                      "Specifications",
                      "Streaming & Messaging",
                      "Tools",
                      "Tracing",
                      "Uncategorized",
                      "Video Conferencing"
                    ],
                    "minLength": 1,
                    "maxLength": 100,
                    "x-oapi-codegen-extra-tags": {
                      "yaml": "subCategory",
                      "json": "subCategory"
                    }
                  },
                  "shape": {
                    "type": "string"
                  },
                  "primaryColor": {
                    "type": "string",
                    "pattern": "^#[0-9A-Fa-f]{6}$"
                  },
                  "secondaryColor": {
                    "type": "string",
                    "pattern": "^#[0-9A-Fa-f]{6}$"
                  },
                  "svgColor": {
                    "type": "string"
                  },
                  "svgWhite": {
                    "type": "string"
                  },
                  "svgComplete": {
                    "type": "string"
                  },
                  "isAnnotation": {
                    "type": "boolean"
                  },
                  "publishToRegistry": {
                    "type": "boolean"
                  }
                }
              }
            }
          },
          "uploadType": {
            "type": "string"
          },
          "register": {
            "type": "boolean",
            "nullable": false
          }
        }
      },
      "ImportBody": {
        "type": "object",
        "required": [
          "model_file",
          "url",
          "file_name",
          "model_csv",
          "component_csv",
          "relationship_csv",
          "model"
        ],
        "properties": {
          "model_file": {
            "type": "string",
            "format": "byte",
            "description": "This represents the binary content of the file as a byte array"
          },
          "url": {
            "type": "string"
          },
          "file_name": {
            "type": "string"
          },
          "model_csv": {
            "type": "string"
          },
          "component_csv": {
            "type": "string"
          },
          "relationship_csv": {
            "type": "string"
          },
          "model": {
            "type": "object",
            "required": [
              "modelDisplayName",
              "registrant",
              "model",
              "category",
              "subCategory",
              "shape",
              "primaryColor",
              "secondaryColor",
              "svgColor",
              "svgWhite",
              "svgComplete",
              "isAnnotation",
              "publishToRegistry"
            ],
            "properties": {
              "modelDisplayName": {
                "type": "string"
              },
              "registrant": {
                "type": "string"
              },
              "model": {
                "type": "string"
              },
              "category": {
                "$id": "https://schemas.meshery.io/category.json",
                "$schema": "http://json-schema.org/draft-07/schema#",
                "type": "object",
                "description": "Category of the model.",
                "required": [
                  "id",
                  "name",
                  "metadata"
                ],
                "properties": {
                  "id": {
                    "x-order": 1,
                    "type": "string",
                    "format": "uuid",
                    "description": "A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas.",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    },
                    "default": "00000000-00000000-00000000-00000000"
                  },
                  "name": {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 100,
                    "x-oapi-codegen-extra-tags": {
                      "yaml": "name",
                      "json": "name",
                      "gorm": "name"
                    },
                    "default": "Uncategorized",
                    "description": "The category of the model that determines the main grouping.",
                    "enum": [
                      "Analytics",
                      "App Definition and Development",
                      "Cloud Native Network",
                      "Cloud Native Storage",
                      "Database",
                      "Machine Learning",
                      "Observability and Analysis",
                      "Orchestration & Management",
                      "Platform",
                      "Provisioning",
                      "Runtime",
                      "Security & Compliance",
                      "Serverless",
                      "Tools",
                      "Uncategorized"
                    ],
                    "x-order": 2
                  },
                  "metadata": {
                    "type": "object",
                    "x-oapi-codegen-extra-tags": {
                      "yaml": "metadata,omitempty",
                      "json": "metadata,omitempty",
                      "gorm": "type:bytes;serializer:json"
                    },
                    "x-order": 3
                  }
                }
              },
              "subCategory": {
                "$id": "https://schemas.meshery.io/category.json",
                "$schema": "http://json-schema.org/draft-07/schema#",
                "type": "string",
                "title": "SubCategory",
                "description": "Sub category of the model determines the secondary grouping.",
                "default": "Uncategorized",
                "enum": [
                  "API Gateway",
                  "API Integration",
                  "Application Definition & Image Build",
                  "Automation & Configuration",
                  "Certified Kubernetes - Distribution",
                  "Chaos Engineering",
                  "Cloud Native Storage",
                  "Cloud Provider",
                  "CNI",
                  "Compute",
                  "Container Registry",
                  "Container Runtime",
                  "Container Security",
                  "Container",
                  "Content Delivery Network",
                  "Continuous Integration & Delivery",
                  "Coordination & Service Discovery",
                  "Database",
                  "Flowchart",
                  "Framework",
                  "Installable Platform",
                  "Key Management",
                  "Key Management Service",
                  "Kubernetes",
                  "Logging",
                  "Machine Learning",
                  "Management Governance",
                  "Metrics",
                  "Monitoring",
                  "Networking Content Delivery",
                  "Operating System",
                  "Query",
                  "Remote Procedure Call",
                  "Scheduling & Orchestration",
                  "Secrets Management",
                  "Security Identity & Compliance",
                  "Service Mesh",
                  "Service Proxy",
                  "Source Version Control",
                  "Storage",
                  "Specifications",
                  "Streaming & Messaging",
                  "Tools",
                  "Tracing",
                  "Uncategorized",
                  "Video Conferencing"
                ],
                "minLength": 1,
                "maxLength": 100,
                "x-oapi-codegen-extra-tags": {
                  "yaml": "subCategory",
                  "json": "subCategory"
                }
              },
              "shape": {
                "type": "string"
              },
              "primaryColor": {
                "type": "string",
                "pattern": "^#[0-9A-Fa-f]{6}$"
              },
              "secondaryColor": {
                "type": "string",
                "pattern": "^#[0-9A-Fa-f]{6}$"
              },
              "svgColor": {
                "type": "string"
              },
              "svgWhite": {
                "type": "string"
              },
              "svgComplete": {
                "type": "string"
              },
              "isAnnotation": {
                "type": "boolean"
              },
              "publishToRegistry": {
                "type": "boolean"
              }
            }
          }
        }
      },
      "Model": {
        "type": "object",
        "required": [
          "modelDisplayName",
          "registrant",
          "model",
          "category",
          "subCategory",
          "shape",
          "primaryColor",
          "secondaryColor",
          "svgColor",
          "svgWhite",
          "svgComplete",
          "isAnnotation",
          "publishToRegistry"
        ],
        "properties": {
          "modelDisplayName": {
            "type": "string"
          },
          "registrant": {
            "type": "string"
          },
          "model": {
            "type": "string"
          },
          "category": {
            "$id": "https://schemas.meshery.io/category.json",
            "$schema": "http://json-schema.org/draft-07/schema#",
            "type": "object",
            "description": "Category of the model.",
            "required": [
              "id",
              "name",
              "metadata"
            ],
            "properties": {
              "id": {
                "x-order": 1,
                "type": "string",
                "format": "uuid",
                "description": "A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas.",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                },
                "default": "00000000-00000000-00000000-00000000"
              },
              "name": {
                "type": "string",
                "minLength": 1,
                "maxLength": 100,
                "x-oapi-codegen-extra-tags": {
                  "yaml": "name",
                  "json": "name",
                  "gorm": "name"
                },
                "default": "Uncategorized",
                "description": "The category of the model that determines the main grouping.",
                "enum": [
                  "Analytics",
                  "App Definition and Development",
                  "Cloud Native Network",
                  "Cloud Native Storage",
                  "Database",
                  "Machine Learning",
                  "Observability and Analysis",
                  "Orchestration & Management",
                  "Platform",
                  "Provisioning",
                  "Runtime",
                  "Security & Compliance",
                  "Serverless",
                  "Tools",
                  "Uncategorized"
                ],
                "x-order": 2
              },
              "metadata": {
                "type": "object",
                "x-oapi-codegen-extra-tags": {
                  "yaml": "metadata,omitempty",
                  "json": "metadata,omitempty",
                  "gorm": "type:bytes;serializer:json"
                },
                "x-order": 3
              }
            }
          },
          "subCategory": {
            "$id": "https://schemas.meshery.io/category.json",
            "$schema": "http://json-schema.org/draft-07/schema#",
            "type": "string",
            "title": "SubCategory",
            "description": "Sub category of the model determines the secondary grouping.",
            "default": "Uncategorized",
            "enum": [
              "API Gateway",
              "API Integration",
              "Application Definition & Image Build",
              "Automation & Configuration",
              "Certified Kubernetes - Distribution",
              "Chaos Engineering",
              "Cloud Native Storage",
              "Cloud Provider",
              "CNI",
              "Compute",
              "Container Registry",
              "Container Runtime",
              "Container Security",
              "Container",
              "Content Delivery Network",
              "Continuous Integration & Delivery",
              "Coordination & Service Discovery",
              "Database",
              "Flowchart",
              "Framework",
              "Installable Platform",
              "Key Management",
              "Key Management Service",
              "Kubernetes",
              "Logging",
              "Machine Learning",
              "Management Governance",
              "Metrics",
              "Monitoring",
              "Networking Content Delivery",
              "Operating System",
              "Query",
              "Remote Procedure Call",
              "Scheduling & Orchestration",
              "Secrets Management",
              "Security Identity & Compliance",
              "Service Mesh",
              "Service Proxy",
              "Source Version Control",
              "Storage",
              "Specifications",
              "Streaming & Messaging",
              "Tools",
              "Tracing",
              "Uncategorized",
              "Video Conferencing"
            ],
            "minLength": 1,
            "maxLength": 100,
            "x-oapi-codegen-extra-tags": {
              "yaml": "subCategory",
              "json": "subCategory"
            }
          },
          "shape": {
            "type": "string"
          },
          "primaryColor": {
            "type": "string",
            "pattern": "^#[0-9A-Fa-f]{6}$"
          },
          "secondaryColor": {
            "type": "string",
            "pattern": "^#[0-9A-Fa-f]{6}$"
          },
          "svgColor": {
            "type": "string"
          },
          "svgWhite": {
            "type": "string"
          },
          "svgComplete": {
            "type": "string"
          },
          "isAnnotation": {
            "type": "boolean"
          },
          "publishToRegistry": {
            "type": "boolean"
          }
        }
      },
      "category": {
        "$id": "https://schemas.meshery.io/category.json",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "type": "object",
        "description": "Category of the model.",
        "required": [
          "id",
          "name",
          "metadata"
        ],
        "properties": {
          "id": {
            "x-order": 1,
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "default": "00000000-00000000-00000000-00000000"
          },
          "name": {
            "type": "string",
            "minLength": 1,
            "maxLength": 100,
            "x-oapi-codegen-extra-tags": {
              "yaml": "name",
              "json": "name",
              "gorm": "name"
            },
            "default": "Uncategorized",
            "description": "The category of the model that determines the main grouping.",
            "enum": [
              "Analytics",
              "App Definition and Development",
              "Cloud Native Network",
              "Cloud Native Storage",
              "Database",
              "Machine Learning",
              "Observability and Analysis",
              "Orchestration & Management",
              "Platform",
              "Provisioning",
              "Runtime",
              "Security & Compliance",
              "Serverless",
              "Tools",
              "Uncategorized"
            ],
            "x-order": 2
          },
          "metadata": {
            "type": "object",
            "x-oapi-codegen-extra-tags": {
              "yaml": "metadata,omitempty",
              "json": "metadata,omitempty",
              "gorm": "type:bytes;serializer:json"
            },
            "x-order": 3
          }
        }
      },
      "subcategory": {
        "$id": "https://schemas.meshery.io/category.json",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "type": "string",
        "title": "SubCategory",
        "description": "Sub category of the model determines the secondary grouping.",
        "default": "Uncategorized",
        "enum": [
          "API Gateway",
          "API Integration",
          "Application Definition & Image Build",
          "Automation & Configuration",
          "Certified Kubernetes - Distribution",
          "Chaos Engineering",
          "Cloud Native Storage",
          "Cloud Provider",
          "CNI",
          "Compute",
          "Container Registry",
          "Container Runtime",
          "Container Security",
          "Container",
          "Content Delivery Network",
          "Continuous Integration & Delivery",
          "Coordination & Service Discovery",
          "Database",
          "Flowchart",
          "Framework",
          "Installable Platform",
          "Key Management",
          "Key Management Service",
          "Kubernetes",
          "Logging",
          "Machine Learning",
          "Management Governance",
          "Metrics",
          "Monitoring",
          "Networking Content Delivery",
          "Operating System",
          "Query",
          "Remote Procedure Call",
          "Scheduling & Orchestration",
          "Secrets Management",
          "Security Identity & Compliance",
          "Service Mesh",
          "Service Proxy",
          "Source Version Control",
          "Storage",
          "Specifications",
          "Streaming & Messaging",
          "Tools",
          "Tracing",
          "Uncategorized",
          "Video Conferencing"
        ],
        "minLength": 1,
        "maxLength": 100,
        "x-oapi-codegen-extra-tags": {
          "yaml": "subCategory",
          "json": "subCategory"
        }
      },
      "roleHolderRequest": {
        "type": "object",
        "properties": {
          "role_names": {
            "type": "array",
            "items": {
              "type": "string",
              "x-go-type-skip-optional-pointer": true
            },
            "x-go-type-skip-optional-pointer": true
          },
          "email": {
            "type": "string",
            "format": "email",
            "description": "email",
            "x-go-type-skip-optional-pointer": true
          }
        },
        "required": [
          "role_names",
          "email"
        ]
      },
      "role": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "user_id": {
            "type": "string",
            "description": "user's email or username",
            "x-go-type-skip-optional-pointer": true
          },
          "username": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "email": {
            "type": "string",
            "format": "email",
            "description": "email",
            "x-go-type-skip-optional-pointer": true
          },
          "first_name": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "First Name"
          },
          "last_name": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "Last Name"
          },
          "status": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "role_names": {
            "type": "array",
            "items": {
              "type": "string",
              "x-go-type-skip-optional-pointer": true
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
          "last_login_time": {
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deleted_at": {
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "prefs": {
            "type": "object",
            "properties": {
              "welcome_email": {
                "type": "boolean",
                "x-go-type-skip-optional-pointer": true
              },
              "notify_role_change": {
                "type": "boolean",
                "x-go-type-skip-optional-pointer": true
              }
            },
            "x-go-type-skip-optional-pointer": true
          }
        },
        "required": [
          "id",
          "user_id",
          "username",
          "email",
          "first_name",
          "last_name",
          "status",
          "role_names",
          "created_at",
          "updated_at",
          "last_login_time",
          "deleted_at"
        ]
      },
      "roleNames": {
        "type": "array",
        "items": {
          "type": "string",
          "x-go-type-skip-optional-pointer": true
        },
        "x-go-type-skip-optional-pointer": true
      },
      "email": {
        "type": "string",
        "format": "email",
        "description": "email",
        "x-go-type-skip-optional-pointer": true
      },
      "user_id": {
        "type": "string",
        "description": "user's email or username",
        "x-go-type-skip-optional-pointer": true
      },
      "username": {
        "type": "string",
        "x-go-type-skip-optional-pointer": true
      },
      "status": {
        "type": "string",
        "x-go-type-skip-optional-pointer": true
      },
      "email_preference": {
        "type": "object",
        "properties": {
          "welcome_email": {
            "type": "boolean",
            "x-go-type-skip-optional-pointer": true
          },
          "notify_role_change": {
            "type": "boolean",
            "x-go-type-skip-optional-pointer": true
          }
        },
        "x-go-type-skip-optional-pointer": true
      },
      "performanceProfile": {
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "name": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "user_id": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "schedule": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "load_generators": {
            "type": "string"
          },
          "endpoints": {
            "type": "string"
          },
          "service_mesh": {
            "type": "string"
          },
          "concurrent_request": {
            "type": "integer"
          },
          "qps": {
            "type": "integer"
          },
          "duration": {
            "type": "string"
          },
          "last_run": {
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "total_results": {
            "type": "integer"
          },
          "request_headers": {
            "type": "string"
          },
          "request_cookies": {
            "type": "string"
          },
          "request_body": {
            "type": "string"
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
          }
        }
      },
      "performanceProfilePage": {
        "allOf": [
          {
            "discriminator": {
              "propertyName": "resultType"
            },
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
              "resultType": {
                "type": "string",
                "x-go-type-skip-optional-pointer": true
              }
            },
            "x-go-type-skip-optional-pointer": true
          },
          {
            "type": "object",
            "properties": {
              "profiles": {
                "type": "array",
                "items": {
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "name": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "user_id": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "schedule": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "load_generators": {
                      "type": "string"
                    },
                    "endpoints": {
                      "type": "string"
                    },
                    "service_mesh": {
                      "type": "string"
                    },
                    "concurrent_request": {
                      "type": "integer"
                    },
                    "qps": {
                      "type": "integer"
                    },
                    "duration": {
                      "type": "string"
                    },
                    "last_run": {
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "total_results": {
                      "type": "integer"
                    },
                    "request_headers": {
                      "type": "string"
                    },
                    "request_cookies": {
                      "type": "string"
                    },
                    "request_body": {
                      "type": "string"
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
                    }
                  }
                }
              }
            }
          }
        ]
      },
      "performanceResult": {
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "name": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "test_start_time": {
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "mesh": {
            "type": "string"
          },
          "runner_results": {
            "type": "object",
            "additionalProperties": {
              "type": "string"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "deleted": {
            "type": "boolean"
          },
          "server_metrics": {
            "type": "object",
            "additionalProperties": {
              "type": "string"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "server_board_config": {
            "type": "object",
            "additionalProperties": {
              "type": "string"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "performance_profile": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
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
          }
        }
      },
      "mesheryResultPage": {
        "allOf": [
          {
            "discriminator": {
              "propertyName": "resultType"
            },
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
              "resultType": {
                "type": "string",
                "x-go-type-skip-optional-pointer": true
              }
            },
            "x-go-type-skip-optional-pointer": true
          },
          {
            "type": "object",
            "properties": {
              "results": {
                "type": "array",
                "items": {
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "name": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "test_start_time": {
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "mesh": {
                      "type": "string"
                    },
                    "runner_results": {
                      "type": "object",
                      "additionalProperties": {
                        "type": "string"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deleted": {
                      "type": "boolean"
                    },
                    "server_metrics": {
                      "type": "object",
                      "additionalProperties": {
                        "type": "string"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "server_board_config": {
                      "type": "object",
                      "additionalProperties": {
                        "type": "string"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "performance_profile": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
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
                    }
                  }
                }
              }
            }
          }
        ]
      },
      "tokenPage": {
        "allOf": [
          {
            "discriminator": {
              "propertyName": "resultType"
            },
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
              "resultType": {
                "type": "string",
                "x-go-type-skip-optional-pointer": true
              }
            },
            "x-go-type-skip-optional-pointer": true
          },
          {
            "type": "object",
            "properties": {
              "tokens": {
                "type": "array",
                "items": {
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "user_id": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "provider": {
                      "type": "string",
                      "description": "One of (x-oapi-codegen-extra-tags-cloud, github, google)",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "access_token": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "refresh_token": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "name": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "purpose": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "is_oauth": {
                      "type": "boolean"
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
                    }
                  }
                }
              }
            }
          }
        ]
      },
      "userToken": {
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "user_id": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "provider": {
            "type": "string",
            "description": "One of (x-oapi-codegen-extra-tags-cloud, github, google)",
            "x-go-type-skip-optional-pointer": true
          },
          "access_token": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "refresh_token": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "name": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "purpose": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "is_oauth": {
            "type": "boolean"
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
          }
        }
      },
      "userInvite": {
        "type": "object",
        "properties": {
          "first_name": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "First Name"
          },
          "last_name": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "Last Name"
          },
          "email": {
            "type": "string",
            "format": "email",
            "description": "email",
            "x-go-type-skip-optional-pointer": true
          }
        },
        "required": [
          "first_name",
          "last_name",
          "email"
        ]
      },
      "bulkDelete": {
        "type": "object",
        "properties": {
          "user_ids": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "user_emails": {
            "type": "array",
            "items": {
              "type": "string",
              "format": "email",
              "description": "email",
              "x-go-type-skip-optional-pointer": true
            },
            "x-go-type-skip-optional-pointer": true
          }
        },
        "required": [
          "user_ids",
          "user_emails"
        ]
      },
      "user": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "user_id": {
            "type": "string",
            "description": "user's email or username",
            "x-go-type-skip-optional-pointer": true
          },
          "provider": {
            "type": "string",
            "description": "One of (x-oapi-codegen-extra-tags-cloud, github, google)",
            "x-go-type-skip-optional-pointer": true
          },
          "email": {
            "type": "string",
            "format": "email",
            "description": "email",
            "x-go-type-skip-optional-pointer": true
          },
          "first_name": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "First Name"
          },
          "last_name": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "Last Name"
          },
          "avatar_url": {
            "type": "string",
            "description": "Link for profile picture",
            "x-go-type-skip-optional-pointer": true
          },
          "status": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "bio": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "preferences": {
            "type": "object",
            "additionalProperties": {
              "type": "string"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "accepted_terms_at": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "first_login_time": {
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "last_login_time": {
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          }
        },
        "required": [
          "id",
          "user_id",
          "provider",
          "email",
          "first_name",
          "last_name",
          "status",
          "created_at",
          "updated_at",
          "last_login_time",
          "deleted_at"
        ]
      },
      "recentUsers": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "first_name": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "First Name"
          },
          "last_name": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "Last Name"
          },
          "avatar_url": {
            "type": "string",
            "description": "Link for profile picture",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "rolesPage": {
        "allOf": [
          {
            "discriminator": {
              "propertyName": "recordType"
            },
            "properties": {
              "page": {
                "type": "integer",
                "x-go-type-skip-optional-pointer": true
              },
              "page_size": {
                "type": "integer",
                "x-go-type-skip-optional-pointer": true
              },
              "records_total": {
                "type": "integer",
                "x-go-type-skip-optional-pointer": true
              },
              "recordType": {
                "type": "string",
                "x-go-type-skip-optional-pointer": true
              }
            },
            "x-go-type-skip-optional-pointer": true
          },
          {
            "type": "object",
            "properties": {
              "data": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "user_id": {
                      "type": "string",
                      "description": "user's email or username",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "username": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "email": {
                      "type": "string",
                      "format": "email",
                      "description": "email",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "first_name": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "First Name"
                    },
                    "last_name": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "Last Name"
                    },
                    "status": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "role_names": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "x-go-type-skip-optional-pointer": true
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
                    "last_login_time": {
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deleted_at": {
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "prefs": {
                      "type": "object",
                      "properties": {
                        "welcome_email": {
                          "type": "boolean",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "notify_role_change": {
                          "type": "boolean",
                          "x-go-type-skip-optional-pointer": true
                        }
                      },
                      "x-go-type-skip-optional-pointer": true
                    }
                  },
                  "required": [
                    "id",
                    "user_id",
                    "username",
                    "email",
                    "first_name",
                    "last_name",
                    "status",
                    "role_names",
                    "created_at",
                    "updated_at",
                    "last_login_time",
                    "deleted_at"
                  ]
                }
              }
            }
          }
        ]
      },
      "key": {
        "properties": {
          "ID": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "subcategory": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "function": {
            "type": "string",
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
          },
          "category": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "description": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "owner": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "userKeys": {
        "properties": {
          "keys": {
            "type": "array",
            "items": {
              "properties": {
                "ID": {
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-go-type-skip-optional-pointer": true
                },
                "subcategory": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "function": {
                  "type": "string",
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
                },
                "category": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "description": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "owner": {
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-go-type-skip-optional-pointer": true
                }
              }
            }
          },
          "total_count": {
            "type": "integer"
          }
        }
      },
      "deleteOn": {
        "type": "string",
        "enum": [
          "self",
          "bulk"
        ]
      },
      "usersPageForAdmin": {
        "allOf": [
          {
            "discriminator": {
              "propertyName": "recordType"
            },
            "properties": {
              "page": {
                "type": "integer",
                "x-go-type-skip-optional-pointer": true
              },
              "page_size": {
                "type": "integer",
                "x-go-type-skip-optional-pointer": true
              },
              "records_total": {
                "type": "integer",
                "x-go-type-skip-optional-pointer": true
              },
              "recordType": {
                "type": "string",
                "x-go-type-skip-optional-pointer": true
              }
            },
            "x-go-type-skip-optional-pointer": true
          },
          {
            "type": "object",
            "properties": {
              "data": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "user_id": {
                      "type": "string",
                      "description": "user's email or username",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "username": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "email": {
                      "type": "string",
                      "format": "email",
                      "description": "email",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "first_name": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "First Name"
                    },
                    "last_name": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "Last Name"
                    },
                    "status": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "role_names": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "x-go-type-skip-optional-pointer": true
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
                    "last_login_time": {
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deleted_at": {
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "prefs": {
                      "type": "object",
                      "properties": {
                        "welcome_email": {
                          "type": "boolean",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "notify_role_change": {
                          "type": "boolean",
                          "x-go-type-skip-optional-pointer": true
                        }
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "avatar_url": {
                      "type": "string",
                      "description": "Link for profile picture",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "preferences": {
                      "type": "object",
                      "additionalProperties": {
                        "type": "string"
                      },
                      "x-go-type-skip-optional-pointer": true
                    }
                  },
                  "required": [
                    "id",
                    "user_id",
                    "username",
                    "email",
                    "first_name",
                    "last_name",
                    "status",
                    "role_names",
                    "created_at",
                    "updated_at",
                    "last_login_time",
                    "deleted_at"
                  ]
                }
              }
            }
          }
        ]
      },
      "usersWithRolesForAdmin": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "user_id": {
            "type": "string",
            "description": "user's email or username",
            "x-go-type-skip-optional-pointer": true
          },
          "username": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "email": {
            "type": "string",
            "format": "email",
            "description": "email",
            "x-go-type-skip-optional-pointer": true
          },
          "first_name": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "First Name"
          },
          "last_name": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "Last Name"
          },
          "status": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "role_names": {
            "type": "array",
            "items": {
              "type": "string",
              "x-go-type-skip-optional-pointer": true
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
          "last_login_time": {
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deleted_at": {
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "prefs": {
            "type": "object",
            "properties": {
              "welcome_email": {
                "type": "boolean",
                "x-go-type-skip-optional-pointer": true
              },
              "notify_role_change": {
                "type": "boolean",
                "x-go-type-skip-optional-pointer": true
              }
            },
            "x-go-type-skip-optional-pointer": true
          },
          "avatar_url": {
            "type": "string",
            "description": "Link for profile picture",
            "x-go-type-skip-optional-pointer": true
          },
          "preferences": {
            "type": "object",
            "additionalProperties": {
              "type": "string"
            },
            "x-go-type-skip-optional-pointer": true
          }
        },
        "required": [
          "id",
          "user_id",
          "username",
          "email",
          "first_name",
          "last_name",
          "status",
          "role_names",
          "created_at",
          "updated_at",
          "last_login_time",
          "deleted_at"
        ]
      },
      "teamMembers": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "user_id": {
            "type": "string",
            "description": "user's email or username",
            "x-go-type-skip-optional-pointer": true
          },
          "username": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "email": {
            "type": "string",
            "format": "email",
            "description": "email",
            "x-go-type-skip-optional-pointer": true
          },
          "first_name": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "First Name"
          },
          "last_name": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "Last Name"
          },
          "status": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "role_names": {
            "type": "array",
            "items": {
              "type": "string",
              "x-go-type-skip-optional-pointer": true
            },
            "x-go-type-skip-optional-pointer": true
          },
          "joined_at": {
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updated_at": {
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "last_login_time": {
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deleted_at": {
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "prefs": {
            "type": "object",
            "properties": {
              "welcome_email": {
                "type": "boolean",
                "x-go-type-skip-optional-pointer": true
              },
              "notify_role_change": {
                "type": "boolean",
                "x-go-type-skip-optional-pointer": true
              }
            },
            "x-go-type-skip-optional-pointer": true
          },
          "avatar_url": {
            "type": "string",
            "description": "Link for profile picture",
            "x-go-type-skip-optional-pointer": true
          }
        },
        "required": [
          "id",
          "user_id",
          "username",
          "email",
          "first_name",
          "last_name",
          "status",
          "role_names",
          "joined_at",
          "updated_at",
          "last_login_time",
          "deleted_at"
        ]
      },
      "teamMembersPage": {
        "allOf": [
          {
            "discriminator": {
              "propertyName": "recordType"
            },
            "properties": {
              "page": {
                "type": "integer",
                "x-go-type-skip-optional-pointer": true
              },
              "page_size": {
                "type": "integer",
                "x-go-type-skip-optional-pointer": true
              },
              "records_total": {
                "type": "integer",
                "x-go-type-skip-optional-pointer": true
              },
              "recordType": {
                "type": "string",
                "x-go-type-skip-optional-pointer": true
              }
            },
            "x-go-type-skip-optional-pointer": true
          },
          {
            "type": "object",
            "properties": {
              "data": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "user_id": {
                      "type": "string",
                      "description": "user's email or username",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "username": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "email": {
                      "type": "string",
                      "format": "email",
                      "description": "email",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "first_name": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "First Name"
                    },
                    "last_name": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "Last Name"
                    },
                    "status": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "role_names": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "joined_at": {
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updated_at": {
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "last_login_time": {
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deleted_at": {
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "prefs": {
                      "type": "object",
                      "properties": {
                        "welcome_email": {
                          "type": "boolean",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "notify_role_change": {
                          "type": "boolean",
                          "x-go-type-skip-optional-pointer": true
                        }
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "avatar_url": {
                      "type": "string",
                      "description": "Link for profile picture",
                      "x-go-type-skip-optional-pointer": true
                    }
                  },
                  "required": [
                    "id",
                    "user_id",
                    "username",
                    "email",
                    "first_name",
                    "last_name",
                    "status",
                    "role_names",
                    "joined_at",
                    "updated_at",
                    "last_login_time",
                    "deleted_at"
                  ]
                }
              }
            }
          }
        ]
      },
      "usersForNonAdmin": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "user_id": {
            "type": "string",
            "description": "user's email or username",
            "x-go-type-skip-optional-pointer": true
          },
          "username": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "email": {
            "type": "string",
            "format": "email",
            "description": "email",
            "x-go-type-skip-optional-pointer": true
          },
          "first_name": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "First Name"
          },
          "last_name": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "description": "Last Name"
          },
          "prefs": {
            "type": "object",
            "properties": {
              "welcome_email": {
                "type": "boolean",
                "x-go-type-skip-optional-pointer": true
              },
              "notify_role_change": {
                "type": "boolean",
                "x-go-type-skip-optional-pointer": true
              }
            },
            "x-go-type-skip-optional-pointer": true
          },
          "avatar_url": {
            "type": "string",
            "description": "Link for profile picture",
            "x-go-type-skip-optional-pointer": true
          },
          "preferences": {
            "type": "object",
            "additionalProperties": {
              "type": "string"
            },
            "x-go-type-skip-optional-pointer": true
          }
        },
        "required": [
          "id",
          "user_id",
          "username",
          "email",
          "first_name",
          "last_name"
        ]
      },
      "usersPageForNonAdmin": {
        "allOf": [
          {
            "discriminator": {
              "propertyName": "recordType"
            },
            "properties": {
              "page": {
                "type": "integer",
                "x-go-type-skip-optional-pointer": true
              },
              "page_size": {
                "type": "integer",
                "x-go-type-skip-optional-pointer": true
              },
              "records_total": {
                "type": "integer",
                "x-go-type-skip-optional-pointer": true
              },
              "recordType": {
                "type": "string",
                "x-go-type-skip-optional-pointer": true
              }
            },
            "x-go-type-skip-optional-pointer": true
          },
          {
            "type": "object",
            "properties": {
              "data": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "user_id": {
                      "type": "string",
                      "description": "user's email or username",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "username": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "email": {
                      "type": "string",
                      "format": "email",
                      "description": "email",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "first_name": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "First Name"
                    },
                    "last_name": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "Last Name"
                    },
                    "prefs": {
                      "type": "object",
                      "properties": {
                        "welcome_email": {
                          "type": "boolean",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "notify_role_change": {
                          "type": "boolean",
                          "x-go-type-skip-optional-pointer": true
                        }
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "avatar_url": {
                      "type": "string",
                      "description": "Link for profile picture",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "preferences": {
                      "type": "object",
                      "additionalProperties": {
                        "type": "string"
                      },
                      "x-go-type-skip-optional-pointer": true
                    }
                  },
                  "required": [
                    "id",
                    "user_id",
                    "username",
                    "email",
                    "first_name",
                    "last_name"
                  ]
                }
              }
            }
          }
        ]
      },
      "recentActivityPage": {
        "properties": {
          "recent_activity": {
            "type": "array",
            "items": {
              "description": "Defines model for event_trackers",
              "properties": {
                "id": {
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "description": "UUID of the event.\n"
                },
                "user_id": {
                  "description": "UUID of the user that initiated the event. In most cases this would be present, but not always.\n",
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "user_id",
                    "json": "user_id"
                  },
                  "x-go-name": "UserID",
                  "x-go-type-skip-optional-pointer": true
                },
                "system_id": {
                  "description": "The system from which the request is sourced. In the case of Meshery Server,\nthe ID is meshery_instance_id of Meshery Server (which can be found in the metadata of`Connections` table).\n",
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "system_id"
                  },
                  "x-go-name": "SystemID",
                  "x-go-type-skip-optional-pointer": true
                },
                "operation_id": {
                  "description": "Each Event will have a OperationID. This field is never NULL, which is to say an operation can result in series of events, for eg: Different stages of Pattern Engine / activities of Workflow engine. Each operation (and sub-operation) will have a different operation ID.\n",
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "operation_id"
                  },
                  "x-go-name": "OperationID",
                  "x-go-type-skip-optional-pointer": true
                },
                "category": {
                  "description": "Resource name on which the operation is invoked.\n",
                  "type": "string",
                  "example": "pattern",
                  "x-oapi-codegen-extra-tags": {
                    "db": "category"
                  }
                },
                "action": {
                  "description": "Action taken on the resource.\n",
                  "type": "string",
                  "example": "deployed",
                  "x-oapi-codegen-extra-tags": {
                    "db": "action"
                  }
                },
                "status": {
                  "description": "Status for the event.\n",
                  "type": "string",
                  "enum": [
                    "read",
                    "unread"
                  ],
                  "x-oapi-codegen-extra-tags": {
                    "db": "status"
                  }
                },
                "acted_upon": {
                  "type": "string",
                  "format": "uuid",
                  "description": "UUID of the entity on which the event was performed.\n",
                  "example": "110020-123230-434231-000213",
                  "x-go-type": "uuid.UUID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "acted_upon"
                  }
                },
                "description": {
                  "description": "A summary/receipt of event that occured.\n",
                  "type": "string",
                  "example": "“Prometheus” pattern deployed in K8s ctx “Meshery Cloud”.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "description"
                  }
                },
                "severity": {
                  "description": "A set of seven standard event levels.\n",
                  "type": "string",
                  "enum": [
                    "emergency",
                    "critical",
                    "alert",
                    "error",
                    "warning",
                    "debug",
                    "informational",
                    "success"
                  ],
                  "example": "info",
                  "x-oapi-codegen-extra-tags": {
                    "db": "severity"
                  }
                },
                "metadata": {
                  "description": "Contains meaningful information, specific to the type of event.\nStructure of metadata can be different for different events.\n",
                  "type": "object",
                  "x-go-type": "[]byte",
                  "x-oapi-codegen-extra-tags": {
                    "db": "metadata"
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
              },
              "required": [
                "id",
                "system_id",
                "operation_id",
                "category",
                "action",
                "status",
                "acted_upon",
                "description",
                "severity",
                "metadata",
                "created_at",
                "updated_at"
              ]
            }
          }
        }
      },
      "accountOverview": {
        "properties": {
          "k8s_count": {
            "type": "integer"
          },
          "app_count": {
            "type": "integer"
          },
          "pattern_count": {
            "type": "integer"
          }
        }
      },
      "badge": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "name": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "description": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "label": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "svg_location": {
            "type": "string",
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
      "badges": {
        "properties": {
          "badges": {
            "type": "object",
            "additionalProperties": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-go-type-skip-optional-pointer": true
                },
                "name": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "description": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "label": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "svg_location": {
                  "type": "string",
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
            }
          },
          "total_count": {
            "type": "integer"
          }
        }
      },
      "nullTime": {
        "description": "SQL null Timestamp to handle null values of time.",
        "x-go-type": "sql.NullTime",
        "type": "string",
        "x-go-type-skip-optional-pointer": true
      },
      "avatar_url": {
        "type": "string",
        "description": "Link for profile picture",
        "x-go-type-skip-optional-pointer": true
      },
      "bio": {
        "type": "string",
        "x-go-type-skip-optional-pointer": true
      },
      "accepted_terms_at": {
        "type": "string",
        "x-go-type-skip-optional-pointer": true
      },
      "emails": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "email",
          "description": "email",
          "x-go-type-skip-optional-pointer": true
        },
        "x-go-type-skip-optional-pointer": true
      },
      "empty": {
        "description": "Body for empty request",
        "type": "object",
        "properties": {},
        "x-go-type-skip-optional-pointer": true
      }
    },
    "parameters": {
      "os": {
        "name": "os",
        "in": "query",
        "description": "user's os",
        "schema": {
          "type": "string"
        }
      },
      "playground": {
        "name": "playground",
        "in": "query",
        "description": "Is playground mode",
        "schema": {
          "type": "string"
        }
      },
      "mesheryVersion": {
        "name": "meshery-version",
        "in": "path",
        "description": "meshery version",
        "schema": {
          "type": "string"
        },
        "required": true
      },
      "connectionKind": {
        "name": "connectionKind",
        "in": "path",
        "description": "Connection kind (eg: Meshery)",
        "required": true,
        "schema": {
          "type": "string",
          "x-go-type-skip-optional-pointer": true
        }
      },
      "connectionId": {
        "name": "connectionId",
        "in": "path",
        "description": "Connection ID",
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
      "serverId": {
        "name": "mesheryServerID",
        "in": "path",
        "description": "Meshery server ID",
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
      "page": {
        "name": "page",
        "in": "query",
        "description": "Get reponses by page",
        "schema": {
          "type": "string"
        }
      },
      "page_size": {
        "name": "page_size",
        "in": "query",
        "description": "Get reponses by pageSize",
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
      },
      "credentialId": {
        "name": "credential_id",
        "in": "query",
        "description": "credential Id",
        "schema": {
          "type": "string"
        },
        "required": true
      },
      "cumulative": {
        "name": "cumulative",
        "in": "query",
        "description": "Cumulative events",
        "schema": {
          "type": "string"
        }
      },
      "eventsFilter": {
        "name": "filter",
        "in": "query",
        "description": "Filter for retrieving events",
        "schema": {
          "type": "object",
          "properties": {
            "provider": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "event_type": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          }
        }
      },
      "id": {
        "name": "id",
        "in": "path",
        "description": "Unique identifier",
        "schema": {
          "type": "string"
        },
        "required": true
      },
      "resultId": {
        "name": "result_id",
        "in": "path",
        "description": "Result id",
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
      "resultID": {
        "name": "resultID",
        "in": "path",
        "description": "Performance Result Id",
        "schema": {
          "type": "string"
        },
        "required": true
      },
      "isOAuth": {
        "name": "isOAuth",
        "in": "query",
        "description": "To get OAuth tokens as well",
        "schema": {
          "type": "string"
        }
      },
      "name": {
        "name": "name",
        "in": "query",
        "description": "Name of the resource",
        "schema": {
          "type": "string"
        }
      },
      "purpose": {
        "name": "purpose",
        "in": "query",
        "description": "Purpose for which token is generated",
        "schema": {
          "type": "string"
        }
      },
      "userId": {
        "name": "user_id",
        "in": "path",
        "description": "User's user_id",
        "schema": {
          "type": "string"
        },
        "required": true
      },
      "provider": {
        "name": "provider",
        "in": "query",
        "description": "Remote provider",
        "schema": {
          "type": "string"
        },
        "required": true
      },
      "deleteOn": {
        "in": "path",
        "required": true,
        "name": "delete_on",
        "description": "Defines on whom the delete operation is to be performed",
        "schema": {
          "type": "string",
          "enum": [
            "self",
            "bulk"
          ]
        }
      },
      "filter": {
        "name": "filter",
        "in": "query",
        "description": "Get filtered reponses",
        "schema": {
          "type": "string"
        }
      }
    },
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
      "201": {
        "description": "created",
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
    "requestBodies": {
      "connectionPayload": {
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "kind": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true,
                  "description": "Kind"
                },
                "type": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true,
                  "description": "Connection type"
                },
                "sub_type": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true,
                  "description": "Connection subtype"
                },
                "credential_secret": {
                  "type": "object",
                  "additionalProperties": {
                    "type": "string"
                  },
                  "x-go-type-skip-optional-pointer": true
                },
                "metadata": {
                  "type": "object",
                  "additionalProperties": {
                    "type": "string"
                  },
                  "x-go-type-skip-optional-pointer": true
                }
              }
            }
          }
        }
      },
      "credentialBody": {
        "description": "Body for user credential",
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "properties": {
                "id": {
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-go-type-skip-optional-pointer": true
                },
                "user_id": {
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-go-type-skip-optional-pointer": true
                },
                "name": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "type": {
                  "type": "string"
                },
                "secret": {
                  "type": "object",
                  "additionalProperties": {
                    "type": "string"
                  },
                  "x-go-type-skip-optional-pointer": true
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
      },
      "mesheryFilterRequestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "url": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "path": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "save": {
                  "type": "boolean"
                },
                "filter_data": {
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "description": "Connection id"
                    },
                    "user_id": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "filter_file": {
                      "type": "string",
                      "format": "byte",
                      "description": "Filter file"
                    },
                    "name": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true,
                      "description": "Filter Name"
                    },
                    "location": {
                      "type": "object",
                      "additionalProperties": {
                        "type": "string"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "visibility": {
                      "type": "string",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "catalog_data": {
                      "type": "object",
                      "additionalProperties": {
                        "type": "string"
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
                    }
                  }
                }
              }
            }
          }
        }
      },
      "userInvite": {
        "description": "Body for user invite request",
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "properties": {
                "first_name": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true,
                  "description": "First Name"
                },
                "last_name": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true,
                  "description": "Last Name"
                },
                "email": {
                  "type": "string",
                  "format": "email",
                  "description": "email",
                  "x-go-type-skip-optional-pointer": true
                }
              },
              "required": [
                "first_name",
                "last_name",
                "email"
              ]
            }
          }
        }
      },
      "deleteUsers": {
        "description": "Body for delete of user accounts",
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "oneOf": [
                {
                  "type": "object",
                  "properties": {
                    "user_ids": {
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "user_emails": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "email",
                        "description": "email",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "x-go-type-skip-optional-pointer": true
                    }
                  },
                  "required": [
                    "user_ids",
                    "user_emails"
                  ]
                },
                {
                  "description": "Body for empty request",
                  "type": "object",
                  "properties": {},
                  "x-go-type-skip-optional-pointer": true
                }
              ]
            }
          }
        }
      },
      "user": {
        "description": "Body for upserting user",
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-go-type-skip-optional-pointer": true
                },
                "user_id": {
                  "type": "string",
                  "description": "user's email or username",
                  "x-go-type-skip-optional-pointer": true
                },
                "provider": {
                  "type": "string",
                  "description": "One of (x-oapi-codegen-extra-tags-cloud, github, google)",
                  "x-go-type-skip-optional-pointer": true
                },
                "email": {
                  "type": "string",
                  "format": "email",
                  "description": "email",
                  "x-go-type-skip-optional-pointer": true
                },
                "first_name": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true,
                  "description": "First Name"
                },
                "last_name": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true,
                  "description": "Last Name"
                },
                "avatar_url": {
                  "type": "string",
                  "description": "Link for profile picture",
                  "x-go-type-skip-optional-pointer": true
                },
                "status": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "bio": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "preferences": {
                  "type": "object",
                  "additionalProperties": {
                    "type": "string"
                  },
                  "x-go-type-skip-optional-pointer": true
                },
                "accepted_terms_at": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "first_login_time": {
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "last_login_time": {
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                }
              },
              "required": [
                "id",
                "user_id",
                "provider",
                "email",
                "first_name",
                "last_name",
                "status",
                "created_at",
                "updated_at",
                "last_login_time",
                "deleted_at"
              ]
            }
          }
        }
      }
    },
    "securitySchemes": {
      "jwt": {
        "type": "http",
        "scheme": "Bearer",
        "bearerFormat": "JWT"
      }
    }
  },
  "x-tagGroups": [
    {
      "name": "Meshery Cloud",
      "tags": [
        "capabilities",
        "collaboration",
        "integrations",
        "credentials",
        "events",
        "filters",
        "roles",
        "smp_profile",
        "cloud native performance",
        "tokens",
        "user tokens",
        "users"
      ]
    },
    {
      "name": "Meshmodels API",
      "tags": [
        "mesheryHandlers_other"
      ]
    }
  ],
  "$schema": "http://json-schema.org/draft-04/schema#"
};

export default schema;
