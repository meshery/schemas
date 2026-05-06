/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const SupportSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Support",
    "description": "OpenAPI schema for Meshery help-and-support request submission.",
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
      "name": "Support",
      "description": "Operations related to help and support requests"
    }
  ],
  "paths": {
    "/api/integrations/support": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Support"
        ],
        "summary": "Submit a support request",
        "operationId": "submitSupportRequest",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for submitting a help-and-support request.",
                "required": [
                  "subject",
                  "message"
                ],
                "properties": {
                  "subject": {
                    "type": "string",
                    "title": "Subject",
                    "minLength": 1,
                    "maxLength": 255,
                    "description": "Concise and descriptive title for the support request."
                  },
                  "message": {
                    "type": "string",
                    "title": "Description",
                    "minLength": 10,
                    "description": "Detailed description of the issue or question."
                  },
                  "scope": {
                    "type": "string",
                    "title": "Scope",
                    "enum": [
                      "Support",
                      "Community",
                      "Account",
                      "Commercial"
                    ],
                    "description": "Category that best represents the nature of the inquiry."
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Support request submitted",
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
            "description": "Internal server error"
          }
        }
      }
    }
  },
  "components": {
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
      "SupportRequest": {
        "type": "object",
        "description": "Payload for submitting a help-and-support request.",
        "required": [
          "subject",
          "message"
        ],
        "properties": {
          "subject": {
            "type": "string",
            "title": "Subject",
            "minLength": 1,
            "maxLength": 255,
            "description": "Concise and descriptive title for the support request."
          },
          "message": {
            "type": "string",
            "title": "Description",
            "minLength": 10,
            "description": "Detailed description of the issue or question."
          },
          "scope": {
            "type": "string",
            "title": "Scope",
            "enum": [
              "Support",
              "Community",
              "Account",
              "Commercial"
            ],
            "description": "Category that best represents the nature of the inquiry."
          }
        }
      }
    }
  }
};

export default SupportSchema;
