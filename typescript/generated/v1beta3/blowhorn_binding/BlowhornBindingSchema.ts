/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const BlowhornBindingSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "BlowhornBinding",
    "description": "OpenAPI schema for Blowhorn bindings - per-host profile-to-directory\nrecords keyed by the (profile, host) pair.\n",
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
      "name": "blowhornBindings",
      "description": "Operations related to Blowhorn bindings."
    }
  ],
  "paths": {
    "/api/blowhorn/bindings": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "blowhornBindings"
        ],
        "summary": "List Blowhorn bindings",
        "operationId": "listBlowhornBindings",
        "description": "Returns a paginated list of Blowhorn bindings in the organization of the authenticated session, optionally filtered by profile or host.",
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "description": "Get responses by page",
            "schema": {
              "type": "integer",
              "minimum": 0
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "description": "Number of items per page (canonical camelCase form).",
            "schema": {
              "type": "integer",
              "minimum": 1
            }
          },
          {
            "name": "pagesize",
            "in": "query",
            "description": "Number of items per page. Deprecated alias of pageSize;\ncanonical `pageSize` wins when both are present.\n",
            "deprecated": true,
            "schema": {
              "type": "integer",
              "minimum": 1
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
            "name": "profile",
            "in": "query",
            "required": false,
            "description": "Filter by bound profile subject.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "host",
            "in": "query",
            "required": false,
            "description": "Filter by host.",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Blowhorn bindings page",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated collection of Blowhorn bindings.",
                  "properties": {
                    "page": {
                      "type": "integer",
                      "description": "Current page number of the result set.",
                      "minimum": 0
                    },
                    "pageSize": {
                      "type": "integer",
                      "description": "Number of items per page.",
                      "minimum": 1
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of items available.",
                      "minimum": 0
                    },
                    "blowhornBindings": {
                      "type": "array",
                      "items": {
                        "x-go-type": "BlowhornBinding",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "title": "Blowhorn Binding Schema",
                        "description": "Server-returned Blowhorn binding as persisted by meshery-cloud. A binding\nmaps a profile to a directory on a host, keyed by the (profile, host)\npair, and doubles as the device and seat record. Binding the same profile\nto a different directory on the same host is a conflict.\n",
                        "type": "object",
                        "additionalProperties": false,
                        "required": [
                          "id",
                          "organizationId",
                          "profile",
                          "host",
                          "directory",
                          "createdAt",
                          "updatedAt"
                        ],
                        "properties": {
                          "id": {
                            "description": "Server-generated Blowhorn binding ID.",
                            "x-order": 1,
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "organizationId": {
                            "description": "Owning organization ID. Derived from the authenticated session, never client-settable.",
                            "x-go-name": "OrganizationID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "organization_id"
                            },
                            "x-order": 2,
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "profile": {
                            "type": "string",
                            "description": "Subject of the bound Blowhorn profile.",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "profile"
                            },
                            "x-order": 3
                          },
                          "host": {
                            "type": "string",
                            "description": "Host the profile is bound on. An identity, not a permission.",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "host"
                            },
                            "x-order": 4
                          },
                          "directory": {
                            "type": "string",
                            "description": "Profile directory on the host.",
                            "minLength": 1,
                            "maxLength": 1024,
                            "x-oapi-codegen-extra-tags": {
                              "db": "directory"
                            },
                            "x-order": 5
                          },
                          "createdAt": {
                            "description": "Timestamp of Blowhorn binding creation.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at"
                            },
                            "x-order": 6,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp of last Blowhorn binding modification.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at"
                            },
                            "x-order": 7,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          }
                        }
                      },
                      "description": "Blowhorn bindings included on this page of results."
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
      },
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "blowhornBindings"
        ],
        "summary": "Bind Blowhorn profile to host",
        "operationId": "bindBlowhornBinding",
        "description": "Binds a profile to a directory on a host, creating the binding or\nrefreshing the entry for the (profile, host) pair. Binding the\nsame profile to a different directory on the same host is refused\nwith a 409.\n",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for binding a profile to a host. Contains only\nclient-settable fields; the owning `organizationId` (derived\nfrom the authenticated session) and the server-generated\n`createdAt` / `updatedAt` timestamps are intentionally excluded.\n",
                "required": [
                  "profile",
                  "host",
                  "directory"
                ],
                "properties": {
                  "id": {
                    "description": "Existing Blowhorn binding ID for updates; omit on bind.",
                    "x-oapi-codegen-extra-tags": {
                      "json": "id,omitempty"
                    },
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  },
                  "profile": {
                    "type": "string",
                    "description": "Subject of the Blowhorn profile to bind.",
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "host": {
                    "type": "string",
                    "description": "Host the profile is bound on. An identity, not a permission.",
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "directory": {
                    "type": "string",
                    "description": "Profile directory on the host.",
                    "minLength": 1,
                    "maxLength": 1024
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Blowhorn binding saved",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Blowhorn Binding Schema",
                  "description": "Server-returned Blowhorn binding as persisted by meshery-cloud. A binding\nmaps a profile to a directory on a host, keyed by the (profile, host)\npair, and doubles as the device and seat record. Binding the same profile\nto a different directory on the same host is a conflict.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "profile",
                    "host",
                    "directory",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Server-generated Blowhorn binding ID.",
                      "x-order": 1,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "organizationId": {
                      "description": "Owning organization ID. Derived from the authenticated session, never client-settable.",
                      "x-go-name": "OrganizationID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "organization_id"
                      },
                      "x-order": 2,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "profile": {
                      "type": "string",
                      "description": "Subject of the bound Blowhorn profile.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "profile"
                      },
                      "x-order": 3
                    },
                    "host": {
                      "type": "string",
                      "description": "Host the profile is bound on. An identity, not a permission.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "host"
                      },
                      "x-order": 4
                    },
                    "directory": {
                      "type": "string",
                      "description": "Profile directory on the host.",
                      "minLength": 1,
                      "maxLength": 1024,
                      "x-oapi-codegen-extra-tags": {
                        "db": "directory"
                      },
                      "x-order": 5
                    },
                    "createdAt": {
                      "description": "Timestamp of Blowhorn binding creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 6,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last Blowhorn binding modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 7,
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
          "409": {
            "description": "Conflict - the profile is already bound to a different directory on this host",
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
    "/api/blowhorn/bindings/{blowhornBindingId}": {
      "delete": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "blowhornBindings"
        ],
        "summary": "Unbind Blowhorn profile from host",
        "operationId": "unbindBlowhornBinding",
        "description": "Removes the binding for the (profile, host) pair.",
        "parameters": [
          {
            "name": "blowhornBindingId",
            "in": "path",
            "description": "Blowhorn binding ID",
            "required": true,
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
        ],
        "responses": {
          "204": {
            "description": "Blowhorn binding removed"
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
      "409": {
        "description": "Conflict - the profile is already bound to a different directory on this host",
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
      "blowhornBindingId": {
        "name": "blowhornBindingId",
        "in": "path",
        "description": "Blowhorn binding ID",
        "required": true,
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
      "page": {
        "name": "page",
        "in": "query",
        "description": "Get responses by page",
        "schema": {
          "type": "integer",
          "minimum": 0
        }
      },
      "pageSize": {
        "name": "pageSize",
        "in": "query",
        "description": "Number of items per page (canonical camelCase form).",
        "schema": {
          "type": "integer",
          "minimum": 1
        }
      },
      "pagesize": {
        "name": "pagesize",
        "in": "query",
        "description": "Number of items per page. Deprecated alias of pageSize;\ncanonical `pageSize` wins when both are present.\n",
        "deprecated": true,
        "schema": {
          "type": "integer",
          "minimum": 1
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
      }
    },
    "schemas": {
      "BlowhornBinding": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Blowhorn Binding Schema",
        "description": "Server-returned Blowhorn binding as persisted by meshery-cloud. A binding\nmaps a profile to a directory on a host, keyed by the (profile, host)\npair, and doubles as the device and seat record. Binding the same profile\nto a different directory on the same host is a conflict.\n",
        "type": "object",
        "additionalProperties": false,
        "required": [
          "id",
          "organizationId",
          "profile",
          "host",
          "directory",
          "createdAt",
          "updatedAt"
        ],
        "properties": {
          "id": {
            "description": "Server-generated Blowhorn binding ID.",
            "x-order": 1,
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "organizationId": {
            "description": "Owning organization ID. Derived from the authenticated session, never client-settable.",
            "x-go-name": "OrganizationID",
            "x-oapi-codegen-extra-tags": {
              "db": "organization_id"
            },
            "x-order": 2,
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "profile": {
            "type": "string",
            "description": "Subject of the bound Blowhorn profile.",
            "minLength": 1,
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "profile"
            },
            "x-order": 3
          },
          "host": {
            "type": "string",
            "description": "Host the profile is bound on. An identity, not a permission.",
            "minLength": 1,
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "host"
            },
            "x-order": 4
          },
          "directory": {
            "type": "string",
            "description": "Profile directory on the host.",
            "minLength": 1,
            "maxLength": 1024,
            "x-oapi-codegen-extra-tags": {
              "db": "directory"
            },
            "x-order": 5
          },
          "createdAt": {
            "description": "Timestamp of Blowhorn binding creation.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at"
            },
            "x-order": 6,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp of last Blowhorn binding modification.",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at"
            },
            "x-order": 7,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "BlowhornBindingPayload": {
        "type": "object",
        "description": "Payload for binding a profile to a host. Contains only\nclient-settable fields; the owning `organizationId` (derived\nfrom the authenticated session) and the server-generated\n`createdAt` / `updatedAt` timestamps are intentionally excluded.\n",
        "required": [
          "profile",
          "host",
          "directory"
        ],
        "properties": {
          "id": {
            "description": "Existing Blowhorn binding ID for updates; omit on bind.",
            "x-oapi-codegen-extra-tags": {
              "json": "id,omitempty"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "profile": {
            "type": "string",
            "description": "Subject of the Blowhorn profile to bind.",
            "minLength": 1,
            "maxLength": 255
          },
          "host": {
            "type": "string",
            "description": "Host the profile is bound on. An identity, not a permission.",
            "minLength": 1,
            "maxLength": 255
          },
          "directory": {
            "type": "string",
            "description": "Profile directory on the host.",
            "minLength": 1,
            "maxLength": 1024
          }
        }
      },
      "BlowhornBindingPage": {
        "type": "object",
        "description": "Paginated collection of Blowhorn bindings.",
        "properties": {
          "page": {
            "type": "integer",
            "description": "Current page number of the result set.",
            "minimum": 0
          },
          "pageSize": {
            "type": "integer",
            "description": "Number of items per page.",
            "minimum": 1
          },
          "totalCount": {
            "type": "integer",
            "description": "Total number of items available.",
            "minimum": 0
          },
          "blowhornBindings": {
            "type": "array",
            "items": {
              "x-go-type": "BlowhornBinding",
              "$schema": "http://json-schema.org/draft-07/schema#",
              "title": "Blowhorn Binding Schema",
              "description": "Server-returned Blowhorn binding as persisted by meshery-cloud. A binding\nmaps a profile to a directory on a host, keyed by the (profile, host)\npair, and doubles as the device and seat record. Binding the same profile\nto a different directory on the same host is a conflict.\n",
              "type": "object",
              "additionalProperties": false,
              "required": [
                "id",
                "organizationId",
                "profile",
                "host",
                "directory",
                "createdAt",
                "updatedAt"
              ],
              "properties": {
                "id": {
                  "description": "Server-generated Blowhorn binding ID.",
                  "x-order": 1,
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "organizationId": {
                  "description": "Owning organization ID. Derived from the authenticated session, never client-settable.",
                  "x-go-name": "OrganizationID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "organization_id"
                  },
                  "x-order": 2,
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "profile": {
                  "type": "string",
                  "description": "Subject of the bound Blowhorn profile.",
                  "minLength": 1,
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "profile"
                  },
                  "x-order": 3
                },
                "host": {
                  "type": "string",
                  "description": "Host the profile is bound on. An identity, not a permission.",
                  "minLength": 1,
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "host"
                  },
                  "x-order": 4
                },
                "directory": {
                  "type": "string",
                  "description": "Profile directory on the host.",
                  "minLength": 1,
                  "maxLength": 1024,
                  "x-oapi-codegen-extra-tags": {
                    "db": "directory"
                  },
                  "x-order": 5
                },
                "createdAt": {
                  "description": "Timestamp of Blowhorn binding creation.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at"
                  },
                  "x-order": 6,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updatedAt": {
                  "description": "Timestamp of last Blowhorn binding modification.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at"
                  },
                  "x-order": 7,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                }
              }
            },
            "description": "Blowhorn bindings included on this page of results."
          }
        }
      }
    }
  }
};

export default BlowhornBindingSchema;
