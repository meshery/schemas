/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const BlowhornHealthSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "BlowhornHealth",
    "description": "OpenAPI schema for the Blowhorn health probe - the frozen contract\nversion plus the organization binding check. Read-only; carries no\npayload and no template.\n",
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
  "security": [
    {
      "jwt": []
    }
  ],
  "tags": [
    {
      "name": "blowhornHealth",
      "description": "Operations related to Blowhorn health."
    }
  ],
  "paths": {
    "/api/blowhorn/health": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "blowhornHealth"
        ],
        "summary": "Get Blowhorn health",
        "operationId": "getBlowhornHealth",
        "description": "Returns the frozen Blowhorn contract version and whether the\norganization of the authenticated session is bound. Migrations move\nserver-side; this endpoint reports the contract the server speaks.\n",
        "responses": {
          "200": {
            "description": "Blowhorn health response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Blowhorn contract version and organization binding status.",
                  "additionalProperties": false,
                  "required": [
                    "contractVersion",
                    "bound"
                  ],
                  "properties": {
                    "contractVersion": {
                      "type": "string",
                      "description": "Frozen Blowhorn contract version the server speaks.",
                      "minLength": 1,
                      "maxLength": 255
                    },
                    "bound": {
                      "type": "boolean",
                      "description": "Whether the organization is bound for Blowhorn operations."
                    },
                    "organizationId": {
                      "description": "Organization whose binding was checked.",
                      "x-go-name": "OrganizationID",
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "checkedAt": {
                      "description": "Time the binding was checked.",
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
        }
      }
    }
  },
  "components": {
    "securitySchemes": {
      "jwt": {
        "type": "http",
        "scheme": "Bearer [REDACTED]",
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
      "BlowhornHealth": {
        "type": "object",
        "description": "Blowhorn contract version and organization binding status.",
        "additionalProperties": false,
        "required": [
          "contractVersion",
          "bound"
        ],
        "properties": {
          "contractVersion": {
            "type": "string",
            "description": "Frozen Blowhorn contract version the server speaks.",
            "minLength": 1,
            "maxLength": 255
          },
          "bound": {
            "type": "boolean",
            "description": "Whether the organization is bound for Blowhorn operations."
          },
          "organizationId": {
            "description": "Organization whose binding was checked.",
            "x-go-name": "OrganizationID",
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "checkedAt": {
            "description": "Time the binding was checked.",
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          }
        }
      }
    }
  }
};

export default BlowhornHealthSchema;
