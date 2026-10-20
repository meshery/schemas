/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const ProviderCapabilitySchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "ProviderCapability",
    "description": "OpenAPI schema for the remote provider's capabilities document: what the\nprovider supports and where, read by a client right after it\nauthenticates. It is the provider-level manifest (provider identity,\npackage, extensions, advertised features and their endpoints), not the\nmodel capability construct. Besides the features list it carries a\n`contractVersion`, so a client can refuse a provider whose contract major\nit does not speak, and, for an authenticated request that names an\norganization in `X-Current-Orgid`, a `membership` block saying whether the\ncaller is a live member of that organization. An unauthenticated request\nstill receives the document, without `membership`, so a client can tell\n\"not signed in\" from \"signed in but not a member\" from \"old provider\"\n(no `contractVersion`).\n",
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
    },
    {}
  ],
  "tags": [
    {
      "name": "capabilities",
      "description": "Operations related to the provider's capabilities document."
    }
  ],
  "paths": {
    "/{version}/capabilities": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "capabilities"
        ],
        "summary": "Get the provider's capabilities",
        "operationId": "getProviderCapabilities",
        "description": "Returns the capabilities document for a client of the given version.\nAuthentication is optional: with a valid token the document reflects\nthe caller's roles, and with a valid token plus `X-Current-Orgid` it\nalso carries `membership`. An invalid or absent token is not an error;\nthe document is returned without `membership`. A malformed\n`X-Current-Orgid` is a client error and returns 400.\n",
        "parameters": [
          {
            "name": "version",
            "in": "path",
            "description": "Version of the requesting client, for example `v0.8.0`.",
            "required": true,
            "schema": {
              "type": "string",
              "maxLength": 64
            }
          },
          {
            "name": "X-Current-Orgid",
            "in": "header",
            "description": "Organization whose membership the caller wants reported.",
            "required": false,
            "schema": {
              "type": "string",
              "format": "uuid",
              "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              }
            }
          },
          {
            "name": "os",
            "in": "query",
            "description": "Operating system of the client, used to select packages.",
            "schema": {
              "type": "string",
              "maxLength": 64
            }
          }
        ],
        "responses": {
          "200": {
            "description": "The capabilities document",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Provider Capability Schema",
                  "description": "The remote provider's capabilities document. Existing fields describe the\nprovider and its extensions; `contractVersion` and `membership` let a\nnative client gate on the provider's contract and on its organization\nmembership after authenticating. New fields arrive only with a new\n`contractVersion`.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "providerType"
                  ],
                  "properties": {
                    "providerType": {
                      "type": "string",
                      "description": "Provider type, for example `remote`.",
                      "maxLength": 64
                    },
                    "packageVersion": {
                      "type": "string",
                      "description": "Version of the extension package the provider offers this client.",
                      "maxLength": 64
                    },
                    "packageUrl": {
                      "type": "string",
                      "description": "Download URL of that package.",
                      "maxLength": 2048
                    },
                    "providerName": {
                      "type": "string",
                      "description": "Display name of the provider.",
                      "maxLength": 255
                    },
                    "providerDescription": {
                      "type": "array",
                      "description": "Lines describing the provider.",
                      "items": {
                        "type": "string"
                      }
                    },
                    "providerUrl": {
                      "type": "string",
                      "description": "Home page URL of the provider.",
                      "maxLength": 2048
                    },
                    "redirects": {
                      "type": "object",
                      "description": "Redirect targets the provider serves to this client, keyed by name.",
                      "additionalProperties": {
                        "type": "string"
                      }
                    },
                    "contractVersion": {
                      "type": "string",
                      "description": "Version of the provider's REST contract for native clients, as\n`MAJOR.MINOR`. A client refuses a provider whose major differs from the\none it was built against. A provider that predates this field omits\nit, which a client treats as not serving the contract.\n",
                      "pattern": "^[0-9]+\\.[0-9]+$",
                      "maxLength": 32
                    },
                    "membership": {
                      "type": "object",
                      "description": "Whether the authenticated caller is a live member of the organization\nnamed by `X-Current-Orgid`. Present only on an authenticated request\nthat carried that header.\n",
                      "additionalProperties": false,
                      "required": [
                        "organizationId",
                        "bound"
                      ],
                      "properties": {
                        "organizationId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          }
                        },
                        "bound": {
                          "type": "boolean",
                          "description": "True when the caller is a live member of the organization."
                        }
                      }
                    },
                    "extensions": {
                      "type": "object",
                      "description": "Extension points; shape owned by the provider.",
                      "additionalProperties": true,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "capabilities": {
                      "type": "array",
                      "description": "Features the provider serves and their endpoints. Clients read paths from here instead of hard-coding them.",
                      "items": {
                        "type": "object",
                        "description": "One feature the provider serves and the endpoint that serves it.",
                        "additionalProperties": false,
                        "required": [
                          "feature"
                        ],
                        "properties": {
                          "feature": {
                            "type": "string",
                            "description": "Feature name, for example `persist-connection`.",
                            "maxLength": 255
                          },
                          "endpoint": {
                            "type": "string",
                            "description": "Path that serves the feature, relative to the provider's base URL.",
                            "maxLength": 1024
                          }
                        }
                      }
                    },
                    "restrictedAccess": {
                      "type": "object",
                      "description": "Access restrictions applied to this client; shape owned by the provider.",
                      "additionalProperties": true,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
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
      "version": {
        "name": "version",
        "in": "path",
        "description": "Version of the requesting client, for example `v0.8.0`.",
        "required": true,
        "schema": {
          "type": "string",
          "maxLength": 64
        }
      },
      "currentOrgId": {
        "name": "X-Current-Orgid",
        "in": "header",
        "description": "Organization whose membership the caller wants reported.",
        "required": false,
        "schema": {
          "type": "string",
          "format": "uuid",
          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
          "x-go-type": "uuid.UUID",
          "x-go-type-import": {
            "path": "github.com/gofrs/uuid"
          }
        }
      }
    },
    "schemas": {
      "ProviderCapability": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Provider Capability Schema",
        "description": "The remote provider's capabilities document. Existing fields describe the\nprovider and its extensions; `contractVersion` and `membership` let a\nnative client gate on the provider's contract and on its organization\nmembership after authenticating. New fields arrive only with a new\n`contractVersion`.\n",
        "type": "object",
        "additionalProperties": false,
        "required": [
          "providerType"
        ],
        "properties": {
          "providerType": {
            "type": "string",
            "description": "Provider type, for example `remote`.",
            "maxLength": 64
          },
          "packageVersion": {
            "type": "string",
            "description": "Version of the extension package the provider offers this client.",
            "maxLength": 64
          },
          "packageUrl": {
            "type": "string",
            "description": "Download URL of that package.",
            "maxLength": 2048
          },
          "providerName": {
            "type": "string",
            "description": "Display name of the provider.",
            "maxLength": 255
          },
          "providerDescription": {
            "type": "array",
            "description": "Lines describing the provider.",
            "items": {
              "type": "string"
            }
          },
          "providerUrl": {
            "type": "string",
            "description": "Home page URL of the provider.",
            "maxLength": 2048
          },
          "redirects": {
            "type": "object",
            "description": "Redirect targets the provider serves to this client, keyed by name.",
            "additionalProperties": {
              "type": "string"
            }
          },
          "contractVersion": {
            "type": "string",
            "description": "Version of the provider's REST contract for native clients, as\n`MAJOR.MINOR`. A client refuses a provider whose major differs from the\none it was built against. A provider that predates this field omits\nit, which a client treats as not serving the contract.\n",
            "pattern": "^[0-9]+\\.[0-9]+$",
            "maxLength": 32
          },
          "membership": {
            "type": "object",
            "description": "Whether the authenticated caller is a live member of the organization\nnamed by `X-Current-Orgid`. Present only on an authenticated request\nthat carried that header.\n",
            "additionalProperties": false,
            "required": [
              "organizationId",
              "bound"
            ],
            "properties": {
              "organizationId": {
                "type": "string",
                "format": "uuid",
                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                }
              },
              "bound": {
                "type": "boolean",
                "description": "True when the caller is a live member of the organization."
              }
            }
          },
          "extensions": {
            "type": "object",
            "description": "Extension points; shape owned by the provider.",
            "additionalProperties": true,
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "capabilities": {
            "type": "array",
            "description": "Features the provider serves and their endpoints. Clients read paths from here instead of hard-coding them.",
            "items": {
              "type": "object",
              "description": "One feature the provider serves and the endpoint that serves it.",
              "additionalProperties": false,
              "required": [
                "feature"
              ],
              "properties": {
                "feature": {
                  "type": "string",
                  "description": "Feature name, for example `persist-connection`.",
                  "maxLength": 255
                },
                "endpoint": {
                  "type": "string",
                  "description": "Path that serves the feature, relative to the provider's base URL.",
                  "maxLength": 1024
                }
              }
            }
          },
          "restrictedAccess": {
            "type": "object",
            "description": "Access restrictions applied to this client; shape owned by the provider.",
            "additionalProperties": true,
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "ProviderFeature": {
        "type": "object",
        "description": "One feature the provider serves and the endpoint that serves it.",
        "additionalProperties": false,
        "required": [
          "feature"
        ],
        "properties": {
          "feature": {
            "type": "string",
            "description": "Feature name, for example `persist-connection`.",
            "maxLength": 255
          },
          "endpoint": {
            "type": "string",
            "description": "Path that serves the feature, relative to the provider's base URL.",
            "maxLength": 1024
          }
        }
      },
      "ProviderMembership": {
        "type": "object",
        "description": "Whether the authenticated caller is a live member of the organization\nnamed by `X-Current-Orgid`. Present only on an authenticated request\nthat carried that header.\n",
        "additionalProperties": false,
        "required": [
          "organizationId",
          "bound"
        ],
        "properties": {
          "organizationId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "bound": {
            "type": "boolean",
            "description": "True when the caller is a live member of the organization."
          }
        }
      }
    }
  }
};

export default ProviderCapabilitySchema;
