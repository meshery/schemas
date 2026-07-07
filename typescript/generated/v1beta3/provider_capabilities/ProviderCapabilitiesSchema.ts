/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const ProviderCapabilitiesSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "provider_capabilities",
    "description": "Meshery Server REST API for retrieving the capabilities and metadata of the provider currently in use.",
    "contact": {
      "name": "Meshery Maintainers",
      "email": "maintainers@meshery.io",
      "url": "https://meshery.io"
    },
    "license": {
      "name": "Apache 2.0",
      "url": "https://www.apache.org/licenses/LICENSE-2.0.html"
    },
    "version": "v1beta3"
  },
  "servers": [
    {
      "url": "http://localhost:9081",
      "description": "Meshery Server URL (controlled via PORT environment variable)"
    }
  ],
  "security": [
    {
      "jwt": []
    }
  ],
  "tags": [
    {
      "name": "provider",
      "description": "Operations related to the Meshery provider."
    }
  ],
  "paths": {
    "/api/provider/capabilities": {
      "get": {
        "x-internal": [
          "meshery"
        ],
        "tags": [
          "provider"
        ],
        "summary": "Get provider capabilities",
        "operationId": "getProviderCapabilities",
        "description": "Retrieves the capabilities and metadata of the Meshery provider currently in use (local or remote): the provider type, the features it supports and their backing endpoints, its UI extension points, and any access restrictions.",
        "responses": {
          "200": {
            "description": "Provider capabilities response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": false,
                  "description": "Capabilities and metadata of the Meshery provider currently in use (the built-in local provider or a remote provider such as Meshery Cloud), as returned by GET /api/provider/capabilities. The Meshery UI reads this to determine the provider type, the features the provider supports, its UI extension points, and any access restrictions.",
                  "required": [
                    "providerType",
                    "providerName"
                  ],
                  "properties": {
                    "providerType": {
                      "type": "string",
                      "enum": [
                        "local",
                        "remote"
                      ],
                      "description": "Kind of provider currently in use.",
                      "x-oapi-codegen-extra-tags": {
                        "json": "providerType,omitempty"
                      },
                      "x-order": 1
                    },
                    "providerName": {
                      "type": "string",
                      "description": "Human-readable name of the provider.",
                      "x-oapi-codegen-extra-tags": {
                        "json": "providerName,omitempty"
                      },
                      "x-order": 2
                    },
                    "providerDescription": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      },
                      "description": "Description lines describing the provider.",
                      "x-oapi-codegen-extra-tags": {
                        "json": "providerDescription,omitempty"
                      },
                      "x-order": 3
                    },
                    "providerUrl": {
                      "type": "string",
                      "description": "Base URL of the provider.",
                      "x-oapi-codegen-extra-tags": {
                        "json": "providerUrl,omitempty"
                      },
                      "x-order": 4
                    },
                    "packageVersion": {
                      "type": "string",
                      "description": "Version of the provider capabilities package.",
                      "x-oapi-codegen-extra-tags": {
                        "json": "packageVersion,omitempty"
                      },
                      "x-order": 5
                    },
                    "packageUrl": {
                      "type": "string",
                      "description": "URL of the provider capabilities package.",
                      "x-oapi-codegen-extra-tags": {
                        "json": "packageUrl,omitempty"
                      },
                      "x-order": 6
                    },
                    "capabilities": {
                      "type": "array",
                      "description": "Features the provider supports and the endpoints that back them.",
                      "items": {
                        "type": "object",
                        "additionalProperties": false,
                        "description": "A single provider feature and the endpoint that backs it.",
                        "properties": {
                          "feature": {
                            "type": "string",
                            "description": "Provider feature identifier (for example persist-results, sync-prefs, or persist-events).",
                            "x-oapi-codegen-extra-tags": {
                              "json": "feature,omitempty"
                            }
                          },
                          "endpoint": {
                            "type": "string",
                            "description": "Endpoint that backs the feature.",
                            "x-oapi-codegen-extra-tags": {
                              "json": "endpoint,omitempty"
                            }
                          }
                        }
                      },
                      "x-oapi-codegen-extra-tags": {
                        "json": "capabilities,omitempty"
                      },
                      "x-order": 7
                    },
                    "extensions": {
                      "type": "object",
                      "description": "UI extension points contributed by the provider (navigator, user preferences, GraphQL, account, collaborator, and so on). An open, plugin-defined object interpreted by the Meshery UI extension-point loader; its inner shape is intentionally not fixed by this schema.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "json": "extensions,omitempty"
                      },
                      "x-order": 8
                    },
                    "restrictedAccess": {
                      "type": "object",
                      "additionalProperties": false,
                      "description": "Access restrictions the provider imposes on the Meshery UI.",
                      "properties": {
                        "isMesheryUiRestricted": {
                          "type": "boolean",
                          "description": "Whether the Meshery UI is restricted for this provider.",
                          "x-oapi-codegen-extra-tags": {
                            "json": "isMesheryUiRestricted"
                          }
                        },
                        "allowedComponents": {
                          "type": "object",
                          "description": "UI components permitted when the Meshery UI is restricted. An open, UI-defined object (navigator and header component toggles) whose inner shape is intentionally not fixed by this schema.",
                          "x-go-type": "core.Map",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core"
                          },
                          "x-go-type-skip-optional-pointer": true,
                          "x-oapi-codegen-extra-tags": {
                            "json": "allowedComponents,omitempty"
                          }
                        }
                      },
                      "x-oapi-codegen-extra-tags": {
                        "json": "restrictedAccess,omitempty"
                      },
                      "x-order": 9
                    },
                    "redirects": {
                      "type": "object",
                      "additionalProperties": {
                        "type": "string"
                      },
                      "description": "Redirect path mappings the provider defines.",
                      "x-oapi-codegen-extra-tags": {
                        "json": "redirects,omitempty"
                      },
                      "x-order": 10
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
    "schemas": {
      "ProviderCapabilities": {
        "type": "object",
        "additionalProperties": false,
        "description": "Capabilities and metadata of the Meshery provider currently in use (the built-in local provider or a remote provider such as Meshery Cloud), as returned by GET /api/provider/capabilities. The Meshery UI reads this to determine the provider type, the features the provider supports, its UI extension points, and any access restrictions.",
        "required": [
          "providerType",
          "providerName"
        ],
        "properties": {
          "providerType": {
            "type": "string",
            "enum": [
              "local",
              "remote"
            ],
            "description": "Kind of provider currently in use.",
            "x-oapi-codegen-extra-tags": {
              "json": "providerType,omitempty"
            },
            "x-order": 1
          },
          "providerName": {
            "type": "string",
            "description": "Human-readable name of the provider.",
            "x-oapi-codegen-extra-tags": {
              "json": "providerName,omitempty"
            },
            "x-order": 2
          },
          "providerDescription": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Description lines describing the provider.",
            "x-oapi-codegen-extra-tags": {
              "json": "providerDescription,omitempty"
            },
            "x-order": 3
          },
          "providerUrl": {
            "type": "string",
            "description": "Base URL of the provider.",
            "x-oapi-codegen-extra-tags": {
              "json": "providerUrl,omitempty"
            },
            "x-order": 4
          },
          "packageVersion": {
            "type": "string",
            "description": "Version of the provider capabilities package.",
            "x-oapi-codegen-extra-tags": {
              "json": "packageVersion,omitempty"
            },
            "x-order": 5
          },
          "packageUrl": {
            "type": "string",
            "description": "URL of the provider capabilities package.",
            "x-oapi-codegen-extra-tags": {
              "json": "packageUrl,omitempty"
            },
            "x-order": 6
          },
          "capabilities": {
            "type": "array",
            "description": "Features the provider supports and the endpoints that back them.",
            "items": {
              "type": "object",
              "additionalProperties": false,
              "description": "A single provider feature and the endpoint that backs it.",
              "properties": {
                "feature": {
                  "type": "string",
                  "description": "Provider feature identifier (for example persist-results, sync-prefs, or persist-events).",
                  "x-oapi-codegen-extra-tags": {
                    "json": "feature,omitempty"
                  }
                },
                "endpoint": {
                  "type": "string",
                  "description": "Endpoint that backs the feature.",
                  "x-oapi-codegen-extra-tags": {
                    "json": "endpoint,omitempty"
                  }
                }
              }
            },
            "x-oapi-codegen-extra-tags": {
              "json": "capabilities,omitempty"
            },
            "x-order": 7
          },
          "extensions": {
            "type": "object",
            "description": "UI extension points contributed by the provider (navigator, user preferences, GraphQL, account, collaborator, and so on). An open, plugin-defined object interpreted by the Meshery UI extension-point loader; its inner shape is intentionally not fixed by this schema.",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "extensions,omitempty"
            },
            "x-order": 8
          },
          "restrictedAccess": {
            "type": "object",
            "additionalProperties": false,
            "description": "Access restrictions the provider imposes on the Meshery UI.",
            "properties": {
              "isMesheryUiRestricted": {
                "type": "boolean",
                "description": "Whether the Meshery UI is restricted for this provider.",
                "x-oapi-codegen-extra-tags": {
                  "json": "isMesheryUiRestricted"
                }
              },
              "allowedComponents": {
                "type": "object",
                "description": "UI components permitted when the Meshery UI is restricted. An open, UI-defined object (navigator and header component toggles) whose inner shape is intentionally not fixed by this schema.",
                "x-go-type": "core.Map",
                "x-go-type-import": {
                  "path": "github.com/meshery/schemas/models/core"
                },
                "x-go-type-skip-optional-pointer": true,
                "x-oapi-codegen-extra-tags": {
                  "json": "allowedComponents,omitempty"
                }
              }
            },
            "x-oapi-codegen-extra-tags": {
              "json": "restrictedAccess,omitempty"
            },
            "x-order": 9
          },
          "redirects": {
            "type": "object",
            "additionalProperties": {
              "type": "string"
            },
            "description": "Redirect path mappings the provider defines.",
            "x-oapi-codegen-extra-tags": {
              "json": "redirects,omitempty"
            },
            "x-order": 10
          }
        }
      }
    }
  }
};

export default ProviderCapabilitiesSchema;
