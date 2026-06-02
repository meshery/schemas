/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const OrganizationSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Organization",
    "description": "OpenAPI schema for organization management in Meshery Cloud.",
    "version": "v1beta2",
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
  "tags": [
    {
      "name": "Organizations",
      "description": "Operations related to organization management"
    }
  ],
  "paths": {
    "/api/identity/orgs": {
      "get": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "Organizations"
        ],
        "security": [
          {
            "jwt": []
          }
        ],
        "summary": "Read organizations",
        "description": "Returns organizations for the current user.",
        "operationId": "getOrgs",
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "description": "Zero-based index of the result page to return.",
            "schema": {
              "type": "integer",
              "minimum": 0
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "description": "Maximum number of items returned on each page.",
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
            "name": "all",
            "in": "query",
            "description": "Get all possible entries",
            "schema": {
              "type": "boolean"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Organizations response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated list of organizations.",
                  "properties": {
                    "page": {
                      "type": "integer",
                      "description": "Zero-based page index returned in this response.",
                      "minimum": 0
                    },
                    "pageSize": {
                      "type": "integer",
                      "description": "Maximum number of items returned on each page.",
                      "minimum": 1,
                      "x-oapi-codegen-extra-tags": {
                        "json": "pageSize,omitempty"
                      }
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of items across all pages.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "json": "totalCount,omitempty"
                      }
                    },
                    "organizations": {
                      "type": "array",
                      "description": "Organizations in this page.",
                      "items": {
                        "type": "object",
                        "description": "Organization listing record used in list and get responses.",
                        "additionalProperties": false,
                        "properties": {
                          "id": {
                            "description": "Organization ID.",
                            "x-go-name": "ID",
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "name": {
                            "description": "Name of the organization.",
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "description": {
                            "description": "Description of the organization.",
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "country": {
                            "description": "Country of the organization.",
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "region": {
                            "description": "Region of the organization.",
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "owner": {
                            "description": "Display name of the organization owner.",
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "metadata": {
                            "x-go-type": "OrgMetadata",
                            "type": "object",
                            "description": "Free-form metadata associated with an organization, including preferences.",
                            "required": [
                              "preferences"
                            ],
                            "properties": {
                              "preferences": {
                                "x-go-type": "Preferences",
                                "type": "object",
                                "description": "Organization-level user experience preferences.",
                                "required": [
                                  "theme",
                                  "dashboard"
                                ],
                                "properties": {
                                  "theme": {
                                    "x-go-type": "Theme",
                                    "type": "object",
                                    "description": "UI theme configured for an organization.",
                                    "required": [
                                      "id",
                                      "logo"
                                    ],
                                    "properties": {
                                      "id": {
                                        "type": "string",
                                        "description": "Theme identifier.",
                                        "format": "uuid",
                                        "maxLength": 36
                                      },
                                      "logo": {
                                        "x-go-type": "Logo",
                                        "type": "object",
                                        "description": "Themed logo assets used across light and dark, desktop and mobile presentations.",
                                        "required": [
                                          "desktopView",
                                          "mobileView",
                                          "darkDesktopView",
                                          "darkMobileView"
                                        ],
                                        "properties": {
                                          "desktopView": {
                                            "x-go-type": "Location",
                                            "type": "object",
                                            "description": "Image asset anchored to a named location within an organization theme.",
                                            "required": [
                                              "svg",
                                              "location"
                                            ],
                                            "properties": {
                                              "svg": {
                                                "type": "string",
                                                "description": "SVG markup for the asset.",
                                                "maxLength": 500
                                              },
                                              "location": {
                                                "type": "string",
                                                "description": "Named location of the asset (e.g. header, footer).",
                                                "maxLength": 500
                                              }
                                            }
                                          },
                                          "mobileView": {
                                            "x-go-type": "Location",
                                            "type": "object",
                                            "description": "Image asset anchored to a named location within an organization theme.",
                                            "required": [
                                              "svg",
                                              "location"
                                            ],
                                            "properties": {
                                              "svg": {
                                                "type": "string",
                                                "description": "SVG markup for the asset.",
                                                "maxLength": 500
                                              },
                                              "location": {
                                                "type": "string",
                                                "description": "Named location of the asset (e.g. header, footer).",
                                                "maxLength": 500
                                              }
                                            }
                                          },
                                          "darkDesktopView": {
                                            "x-go-type": "Location",
                                            "type": "object",
                                            "description": "Image asset anchored to a named location within an organization theme.",
                                            "required": [
                                              "svg",
                                              "location"
                                            ],
                                            "properties": {
                                              "svg": {
                                                "type": "string",
                                                "description": "SVG markup for the asset.",
                                                "maxLength": 500
                                              },
                                              "location": {
                                                "type": "string",
                                                "description": "Named location of the asset (e.g. header, footer).",
                                                "maxLength": 500
                                              }
                                            }
                                          },
                                          "darkMobileView": {
                                            "x-go-type": "Location",
                                            "type": "object",
                                            "description": "Image asset anchored to a named location within an organization theme.",
                                            "required": [
                                              "svg",
                                              "location"
                                            ],
                                            "properties": {
                                              "svg": {
                                                "type": "string",
                                                "description": "SVG markup for the asset.",
                                                "maxLength": 500
                                              },
                                              "location": {
                                                "type": "string",
                                                "description": "Named location of the asset (e.g. header, footer).",
                                                "maxLength": 500
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "vars": {
                                        "type": "object",
                                        "additionalProperties": true,
                                        "description": "Arbitrary theme variables keyed by name."
                                      }
                                    }
                                  },
                                  "dashboard": {
                                    "x-go-type": "DashboardPrefs",
                                    "type": "object",
                                    "description": "Preferences specific to dashboard behavior.",
                                    "additionalProperties": true
                                  }
                                }
                              }
                            }
                          },
                          "createdAt": {
                            "description": "Timestamp when the organization was created.",
                            "x-oapi-codegen-extra-tags": {
                              "json": "createdAt,omitempty"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp when the organization was last updated.",
                            "x-oapi-codegen-extra-tags": {
                              "json": "updatedAt,omitempty"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deletedAt": {
                            "description": "Timestamp when the organization was soft-deleted.",
                            "x-oapi-codegen-extra-tags": {
                              "json": "deletedAt,omitempty"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type": "sql.NullTime",
                            "x-go-type-import": {
                              "path": "database/sql"
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
          },
          "204": {
            "description": "No content"
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
          "cloud",
          "meshery"
        ],
        "tags": [
          "Organizations"
        ],
        "security": [
          {
            "jwt": []
          }
        ],
        "summary": "Create an organization",
        "description": "Creates a new organization.",
        "operationId": "createOrg",
        "requestBody": {
          "description": "Body for creating or updating an organization",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for creating or updating an organization. Contains only client-settable fields.",
                "properties": {
                  "name": {
                    "description": "Name of the organization.",
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "country": {
                    "description": "Country of the organization.",
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "region": {
                    "description": "Region of the organization.",
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "description": {
                    "description": "Description of the organization.",
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "notifyOrgUpdate": {
                    "type": "boolean",
                    "description": "Indicates whether organization members should be notified of this update."
                  },
                  "preferences": {
                    "description": "Organization-level user experience preferences.",
                    "type": "object",
                    "required": [
                      "theme",
                      "dashboard"
                    ],
                    "properties": {
                      "theme": {
                        "x-go-type": "Theme",
                        "type": "object",
                        "description": "UI theme configured for an organization.",
                        "required": [
                          "id",
                          "logo"
                        ],
                        "properties": {
                          "id": {
                            "type": "string",
                            "description": "Theme identifier.",
                            "format": "uuid",
                            "maxLength": 36
                          },
                          "logo": {
                            "x-go-type": "Logo",
                            "type": "object",
                            "description": "Themed logo assets used across light and dark, desktop and mobile presentations.",
                            "required": [
                              "desktopView",
                              "mobileView",
                              "darkDesktopView",
                              "darkMobileView"
                            ],
                            "properties": {
                              "desktopView": {
                                "x-go-type": "Location",
                                "type": "object",
                                "description": "Image asset anchored to a named location within an organization theme.",
                                "required": [
                                  "svg",
                                  "location"
                                ],
                                "properties": {
                                  "svg": {
                                    "type": "string",
                                    "description": "SVG markup for the asset.",
                                    "maxLength": 500
                                  },
                                  "location": {
                                    "type": "string",
                                    "description": "Named location of the asset (e.g. header, footer).",
                                    "maxLength": 500
                                  }
                                }
                              },
                              "mobileView": {
                                "x-go-type": "Location",
                                "type": "object",
                                "description": "Image asset anchored to a named location within an organization theme.",
                                "required": [
                                  "svg",
                                  "location"
                                ],
                                "properties": {
                                  "svg": {
                                    "type": "string",
                                    "description": "SVG markup for the asset.",
                                    "maxLength": 500
                                  },
                                  "location": {
                                    "type": "string",
                                    "description": "Named location of the asset (e.g. header, footer).",
                                    "maxLength": 500
                                  }
                                }
                              },
                              "darkDesktopView": {
                                "x-go-type": "Location",
                                "type": "object",
                                "description": "Image asset anchored to a named location within an organization theme.",
                                "required": [
                                  "svg",
                                  "location"
                                ],
                                "properties": {
                                  "svg": {
                                    "type": "string",
                                    "description": "SVG markup for the asset.",
                                    "maxLength": 500
                                  },
                                  "location": {
                                    "type": "string",
                                    "description": "Named location of the asset (e.g. header, footer).",
                                    "maxLength": 500
                                  }
                                }
                              },
                              "darkMobileView": {
                                "x-go-type": "Location",
                                "type": "object",
                                "description": "Image asset anchored to a named location within an organization theme.",
                                "required": [
                                  "svg",
                                  "location"
                                ],
                                "properties": {
                                  "svg": {
                                    "type": "string",
                                    "description": "SVG markup for the asset.",
                                    "maxLength": 500
                                  },
                                  "location": {
                                    "type": "string",
                                    "description": "Named location of the asset (e.g. header, footer).",
                                    "maxLength": 500
                                  }
                                }
                              }
                            }
                          },
                          "vars": {
                            "type": "object",
                            "additionalProperties": true,
                            "description": "Arbitrary theme variables keyed by name."
                          }
                        }
                      },
                      "dashboard": {
                        "x-go-type": "DashboardPrefs",
                        "type": "object",
                        "description": "Preferences specific to dashboard behavior.",
                        "additionalProperties": true
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Single-organization page response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Single-organization wrapper used by current meshery-cloud organization handlers.",
                  "properties": {
                    "page": {
                      "type": "integer",
                      "description": "Zero-based page index returned in this response.",
                      "minimum": 0
                    },
                    "pageSize": {
                      "type": "integer",
                      "description": "Maximum number of items returned on each page.",
                      "minimum": 1,
                      "x-oapi-codegen-extra-tags": {
                        "json": "pageSize,omitempty"
                      }
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of items across all pages.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "json": "totalCount,omitempty"
                      }
                    },
                    "organizations": {
                      "type": "array",
                      "description": "Organizations returned in this single-item page wrapper.",
                      "maxItems": 1,
                      "items": {
                        "type": "object",
                        "description": "Organization listing record used in list and get responses.",
                        "additionalProperties": false,
                        "properties": {
                          "id": {
                            "description": "Organization ID.",
                            "x-go-name": "ID",
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "name": {
                            "description": "Name of the organization.",
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "description": {
                            "description": "Description of the organization.",
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "country": {
                            "description": "Country of the organization.",
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "region": {
                            "description": "Region of the organization.",
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "owner": {
                            "description": "Display name of the organization owner.",
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "metadata": {
                            "x-go-type": "OrgMetadata",
                            "type": "object",
                            "description": "Free-form metadata associated with an organization, including preferences.",
                            "required": [
                              "preferences"
                            ],
                            "properties": {
                              "preferences": {
                                "x-go-type": "Preferences",
                                "type": "object",
                                "description": "Organization-level user experience preferences.",
                                "required": [
                                  "theme",
                                  "dashboard"
                                ],
                                "properties": {
                                  "theme": {
                                    "x-go-type": "Theme",
                                    "type": "object",
                                    "description": "UI theme configured for an organization.",
                                    "required": [
                                      "id",
                                      "logo"
                                    ],
                                    "properties": {
                                      "id": {
                                        "type": "string",
                                        "description": "Theme identifier.",
                                        "format": "uuid",
                                        "maxLength": 36
                                      },
                                      "logo": {
                                        "x-go-type": "Logo",
                                        "type": "object",
                                        "description": "Themed logo assets used across light and dark, desktop and mobile presentations.",
                                        "required": [
                                          "desktopView",
                                          "mobileView",
                                          "darkDesktopView",
                                          "darkMobileView"
                                        ],
                                        "properties": {
                                          "desktopView": {
                                            "x-go-type": "Location",
                                            "type": "object",
                                            "description": "Image asset anchored to a named location within an organization theme.",
                                            "required": [
                                              "svg",
                                              "location"
                                            ],
                                            "properties": {
                                              "svg": {
                                                "type": "string",
                                                "description": "SVG markup for the asset.",
                                                "maxLength": 500
                                              },
                                              "location": {
                                                "type": "string",
                                                "description": "Named location of the asset (e.g. header, footer).",
                                                "maxLength": 500
                                              }
                                            }
                                          },
                                          "mobileView": {
                                            "x-go-type": "Location",
                                            "type": "object",
                                            "description": "Image asset anchored to a named location within an organization theme.",
                                            "required": [
                                              "svg",
                                              "location"
                                            ],
                                            "properties": {
                                              "svg": {
                                                "type": "string",
                                                "description": "SVG markup for the asset.",
                                                "maxLength": 500
                                              },
                                              "location": {
                                                "type": "string",
                                                "description": "Named location of the asset (e.g. header, footer).",
                                                "maxLength": 500
                                              }
                                            }
                                          },
                                          "darkDesktopView": {
                                            "x-go-type": "Location",
                                            "type": "object",
                                            "description": "Image asset anchored to a named location within an organization theme.",
                                            "required": [
                                              "svg",
                                              "location"
                                            ],
                                            "properties": {
                                              "svg": {
                                                "type": "string",
                                                "description": "SVG markup for the asset.",
                                                "maxLength": 500
                                              },
                                              "location": {
                                                "type": "string",
                                                "description": "Named location of the asset (e.g. header, footer).",
                                                "maxLength": 500
                                              }
                                            }
                                          },
                                          "darkMobileView": {
                                            "x-go-type": "Location",
                                            "type": "object",
                                            "description": "Image asset anchored to a named location within an organization theme.",
                                            "required": [
                                              "svg",
                                              "location"
                                            ],
                                            "properties": {
                                              "svg": {
                                                "type": "string",
                                                "description": "SVG markup for the asset.",
                                                "maxLength": 500
                                              },
                                              "location": {
                                                "type": "string",
                                                "description": "Named location of the asset (e.g. header, footer).",
                                                "maxLength": 500
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "vars": {
                                        "type": "object",
                                        "additionalProperties": true,
                                        "description": "Arbitrary theme variables keyed by name."
                                      }
                                    }
                                  },
                                  "dashboard": {
                                    "x-go-type": "DashboardPrefs",
                                    "type": "object",
                                    "description": "Preferences specific to dashboard behavior.",
                                    "additionalProperties": true
                                  }
                                }
                              }
                            }
                          },
                          "createdAt": {
                            "description": "Timestamp when the organization was created.",
                            "x-oapi-codegen-extra-tags": {
                              "json": "createdAt,omitempty"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp when the organization was last updated.",
                            "x-oapi-codegen-extra-tags": {
                              "json": "updatedAt,omitempty"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deletedAt": {
                            "description": "Timestamp when the organization was soft-deleted.",
                            "x-oapi-codegen-extra-tags": {
                              "json": "deletedAt,omitempty"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type": "sql.NullTime",
                            "x-go-type-import": {
                              "path": "database/sql"
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
    "/api/identity/orgs/by-domain": {
      "get": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "Organizations"
        ],
        "summary": "Get organization by domain",
        "operationId": "getOrgByDomain",
        "parameters": [
          {
            "name": "domain",
            "in": "query",
            "required": true,
            "description": "Domain name of the organization to look up.",
            "schema": {
              "type": "string",
              "maxLength": 500
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Organization response",
            "content": {
              "application/json": {
                "schema": {
                  "$id": "https://schemas.meshery.io/organization.yaml",
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "description": "An organization in Meshery Cloud. Organizations are the top-level tenancy boundary and own teams, workspaces, environments, designs, and other resources. Learn more at https://docs.meshery.io/concepts/logical/organizations",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "name",
                    "country",
                    "region",
                    "description",
                    "owner",
                    "metadata",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Organization ID.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id",
                        "json": "id"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "name": {
                      "type": "string",
                      "description": "Name of the organization.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name",
                        "json": "name"
                      }
                    },
                    "country": {
                      "type": "string",
                      "description": "Country of the organization.",
                      "maxLength": 500,
                      "x-oapi-codegen-extra-tags": {
                        "db": "country",
                        "json": "country"
                      }
                    },
                    "region": {
                      "type": "string",
                      "description": "Region of the organization.",
                      "maxLength": 500,
                      "x-oapi-codegen-extra-tags": {
                        "db": "region",
                        "json": "region"
                      }
                    },
                    "description": {
                      "type": "string",
                      "description": "Description of the organization.",
                      "maxLength": 5000,
                      "x-oapi-codegen-extra-tags": {
                        "db": "description",
                        "json": "description"
                      }
                    },
                    "owner": {
                      "description": "Owner user ID of the organization.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner",
                        "json": "owner"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "metadata": {
                      "type": "object",
                      "description": "Free-form metadata associated with the organization, including preferences.",
                      "x-go-type": "OrgMetadata",
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata",
                        "json": "metadata"
                      }
                    },
                    "domain": {
                      "type": "string",
                      "nullable": true,
                      "description": "Domain of the organization.",
                      "maxLength": 500,
                      "x-oapi-codegen-extra-tags": {
                        "db": "domain",
                        "json": "domain,omitempty"
                      }
                    },
                    "createdAt": {
                      "description": "Timestamp when the organization was created.",
                      "type": "string",
                      "format": "date-time",
                      "x-go-type": "time.Time",
                      "x-go-name": "CreatedAt",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "createdAt"
                      }
                    },
                    "updatedAt": {
                      "description": "Timestamp when the organization was last updated.",
                      "type": "string",
                      "format": "date-time",
                      "x-go-type": "time.Time",
                      "x-go-name": "UpdatedAt",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updatedAt"
                      }
                    },
                    "deletedAt": {
                      "description": "Timestamp when the organization was soft-deleted. Null while the organization is active.",
                      "type": "string",
                      "format": "date-time",
                      "x-go-type": "core.NullTime",
                      "x-go-name": "DeletedAt",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deletedAt,omitempty"
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
            "description": "Organization not found"
          },
          "500": {
            "description": "Internal server error"
          }
        }
      }
    },
    "/api/identity/orgs/{orgId}": {
      "get": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "Organizations"
        ],
        "security": [
          {
            "jwt": []
          }
        ],
        "summary": "Read an organization",
        "description": "Returns the organization in the single-item page wrapper currently emitted by meshery-cloud.",
        "operationId": "getOrg",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
            "required": true,
            "description": "Organization ID.",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
              "x-oapi-codegen-extra-tags": {
                "db": "org_id",
                "json": "org_id"
              },
              "x-go-type-name": "OrganizationId",
              "x-go-type-skip-optional-pointer": true
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Single-organization page response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Single-organization wrapper used by current meshery-cloud organization handlers.",
                  "properties": {
                    "page": {
                      "type": "integer",
                      "description": "Zero-based page index returned in this response.",
                      "minimum": 0
                    },
                    "pageSize": {
                      "type": "integer",
                      "description": "Maximum number of items returned on each page.",
                      "minimum": 1,
                      "x-oapi-codegen-extra-tags": {
                        "json": "pageSize,omitempty"
                      }
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of items across all pages.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "json": "totalCount,omitempty"
                      }
                    },
                    "organizations": {
                      "type": "array",
                      "description": "Organizations returned in this single-item page wrapper.",
                      "maxItems": 1,
                      "items": {
                        "type": "object",
                        "description": "Organization listing record used in list and get responses.",
                        "additionalProperties": false,
                        "properties": {
                          "id": {
                            "description": "Organization ID.",
                            "x-go-name": "ID",
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "name": {
                            "description": "Name of the organization.",
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "description": {
                            "description": "Description of the organization.",
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "country": {
                            "description": "Country of the organization.",
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "region": {
                            "description": "Region of the organization.",
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "owner": {
                            "description": "Display name of the organization owner.",
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "metadata": {
                            "x-go-type": "OrgMetadata",
                            "type": "object",
                            "description": "Free-form metadata associated with an organization, including preferences.",
                            "required": [
                              "preferences"
                            ],
                            "properties": {
                              "preferences": {
                                "x-go-type": "Preferences",
                                "type": "object",
                                "description": "Organization-level user experience preferences.",
                                "required": [
                                  "theme",
                                  "dashboard"
                                ],
                                "properties": {
                                  "theme": {
                                    "x-go-type": "Theme",
                                    "type": "object",
                                    "description": "UI theme configured for an organization.",
                                    "required": [
                                      "id",
                                      "logo"
                                    ],
                                    "properties": {
                                      "id": {
                                        "type": "string",
                                        "description": "Theme identifier.",
                                        "format": "uuid",
                                        "maxLength": 36
                                      },
                                      "logo": {
                                        "x-go-type": "Logo",
                                        "type": "object",
                                        "description": "Themed logo assets used across light and dark, desktop and mobile presentations.",
                                        "required": [
                                          "desktopView",
                                          "mobileView",
                                          "darkDesktopView",
                                          "darkMobileView"
                                        ],
                                        "properties": {
                                          "desktopView": {
                                            "x-go-type": "Location",
                                            "type": "object",
                                            "description": "Image asset anchored to a named location within an organization theme.",
                                            "required": [
                                              "svg",
                                              "location"
                                            ],
                                            "properties": {
                                              "svg": {
                                                "type": "string",
                                                "description": "SVG markup for the asset.",
                                                "maxLength": 500
                                              },
                                              "location": {
                                                "type": "string",
                                                "description": "Named location of the asset (e.g. header, footer).",
                                                "maxLength": 500
                                              }
                                            }
                                          },
                                          "mobileView": {
                                            "x-go-type": "Location",
                                            "type": "object",
                                            "description": "Image asset anchored to a named location within an organization theme.",
                                            "required": [
                                              "svg",
                                              "location"
                                            ],
                                            "properties": {
                                              "svg": {
                                                "type": "string",
                                                "description": "SVG markup for the asset.",
                                                "maxLength": 500
                                              },
                                              "location": {
                                                "type": "string",
                                                "description": "Named location of the asset (e.g. header, footer).",
                                                "maxLength": 500
                                              }
                                            }
                                          },
                                          "darkDesktopView": {
                                            "x-go-type": "Location",
                                            "type": "object",
                                            "description": "Image asset anchored to a named location within an organization theme.",
                                            "required": [
                                              "svg",
                                              "location"
                                            ],
                                            "properties": {
                                              "svg": {
                                                "type": "string",
                                                "description": "SVG markup for the asset.",
                                                "maxLength": 500
                                              },
                                              "location": {
                                                "type": "string",
                                                "description": "Named location of the asset (e.g. header, footer).",
                                                "maxLength": 500
                                              }
                                            }
                                          },
                                          "darkMobileView": {
                                            "x-go-type": "Location",
                                            "type": "object",
                                            "description": "Image asset anchored to a named location within an organization theme.",
                                            "required": [
                                              "svg",
                                              "location"
                                            ],
                                            "properties": {
                                              "svg": {
                                                "type": "string",
                                                "description": "SVG markup for the asset.",
                                                "maxLength": 500
                                              },
                                              "location": {
                                                "type": "string",
                                                "description": "Named location of the asset (e.g. header, footer).",
                                                "maxLength": 500
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "vars": {
                                        "type": "object",
                                        "additionalProperties": true,
                                        "description": "Arbitrary theme variables keyed by name."
                                      }
                                    }
                                  },
                                  "dashboard": {
                                    "x-go-type": "DashboardPrefs",
                                    "type": "object",
                                    "description": "Preferences specific to dashboard behavior.",
                                    "additionalProperties": true
                                  }
                                }
                              }
                            }
                          },
                          "createdAt": {
                            "description": "Timestamp when the organization was created.",
                            "x-oapi-codegen-extra-tags": {
                              "json": "createdAt,omitempty"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp when the organization was last updated.",
                            "x-oapi-codegen-extra-tags": {
                              "json": "updatedAt,omitempty"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deletedAt": {
                            "description": "Timestamp when the organization was soft-deleted.",
                            "x-oapi-codegen-extra-tags": {
                              "json": "deletedAt,omitempty"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type": "sql.NullTime",
                            "x-go-type-import": {
                              "path": "database/sql"
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
      "delete": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "Organizations"
        ],
        "security": [
          {
            "jwt": []
          }
        ],
        "summary": "Delete an organization",
        "description": "Deletes the organization.",
        "operationId": "deleteOrg",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
            "required": true,
            "description": "Organization ID.",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
              "x-oapi-codegen-extra-tags": {
                "db": "org_id",
                "json": "org_id"
              },
              "x-go-type-name": "OrganizationId",
              "x-go-type-skip-optional-pointer": true
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Organization deleted"
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
        }
      },
      "put": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "Organizations"
        ],
        "security": [
          {
            "jwt": []
          }
        ],
        "summary": "Update an organization",
        "description": "Updates the organization.",
        "operationId": "updateOrg",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
            "required": true,
            "description": "Organization ID.",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
              "x-oapi-codegen-extra-tags": {
                "db": "org_id",
                "json": "org_id"
              },
              "x-go-type-name": "OrganizationId",
              "x-go-type-skip-optional-pointer": true
            }
          }
        ],
        "requestBody": {
          "description": "Body for creating or updating an organization",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for creating or updating an organization. Contains only client-settable fields.",
                "properties": {
                  "name": {
                    "description": "Name of the organization.",
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "country": {
                    "description": "Country of the organization.",
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "region": {
                    "description": "Region of the organization.",
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "description": {
                    "description": "Description of the organization.",
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "notifyOrgUpdate": {
                    "type": "boolean",
                    "description": "Indicates whether organization members should be notified of this update."
                  },
                  "preferences": {
                    "description": "Organization-level user experience preferences.",
                    "type": "object",
                    "required": [
                      "theme",
                      "dashboard"
                    ],
                    "properties": {
                      "theme": {
                        "x-go-type": "Theme",
                        "type": "object",
                        "description": "UI theme configured for an organization.",
                        "required": [
                          "id",
                          "logo"
                        ],
                        "properties": {
                          "id": {
                            "type": "string",
                            "description": "Theme identifier.",
                            "format": "uuid",
                            "maxLength": 36
                          },
                          "logo": {
                            "x-go-type": "Logo",
                            "type": "object",
                            "description": "Themed logo assets used across light and dark, desktop and mobile presentations.",
                            "required": [
                              "desktopView",
                              "mobileView",
                              "darkDesktopView",
                              "darkMobileView"
                            ],
                            "properties": {
                              "desktopView": {
                                "x-go-type": "Location",
                                "type": "object",
                                "description": "Image asset anchored to a named location within an organization theme.",
                                "required": [
                                  "svg",
                                  "location"
                                ],
                                "properties": {
                                  "svg": {
                                    "type": "string",
                                    "description": "SVG markup for the asset.",
                                    "maxLength": 500
                                  },
                                  "location": {
                                    "type": "string",
                                    "description": "Named location of the asset (e.g. header, footer).",
                                    "maxLength": 500
                                  }
                                }
                              },
                              "mobileView": {
                                "x-go-type": "Location",
                                "type": "object",
                                "description": "Image asset anchored to a named location within an organization theme.",
                                "required": [
                                  "svg",
                                  "location"
                                ],
                                "properties": {
                                  "svg": {
                                    "type": "string",
                                    "description": "SVG markup for the asset.",
                                    "maxLength": 500
                                  },
                                  "location": {
                                    "type": "string",
                                    "description": "Named location of the asset (e.g. header, footer).",
                                    "maxLength": 500
                                  }
                                }
                              },
                              "darkDesktopView": {
                                "x-go-type": "Location",
                                "type": "object",
                                "description": "Image asset anchored to a named location within an organization theme.",
                                "required": [
                                  "svg",
                                  "location"
                                ],
                                "properties": {
                                  "svg": {
                                    "type": "string",
                                    "description": "SVG markup for the asset.",
                                    "maxLength": 500
                                  },
                                  "location": {
                                    "type": "string",
                                    "description": "Named location of the asset (e.g. header, footer).",
                                    "maxLength": 500
                                  }
                                }
                              },
                              "darkMobileView": {
                                "x-go-type": "Location",
                                "type": "object",
                                "description": "Image asset anchored to a named location within an organization theme.",
                                "required": [
                                  "svg",
                                  "location"
                                ],
                                "properties": {
                                  "svg": {
                                    "type": "string",
                                    "description": "SVG markup for the asset.",
                                    "maxLength": 500
                                  },
                                  "location": {
                                    "type": "string",
                                    "description": "Named location of the asset (e.g. header, footer).",
                                    "maxLength": 500
                                  }
                                }
                              }
                            }
                          },
                          "vars": {
                            "type": "object",
                            "additionalProperties": true,
                            "description": "Arbitrary theme variables keyed by name."
                          }
                        }
                      },
                      "dashboard": {
                        "x-go-type": "DashboardPrefs",
                        "type": "object",
                        "description": "Preferences specific to dashboard behavior.",
                        "additionalProperties": true
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
            "description": "Single-organization page response for the updated organization",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Single-organization wrapper used by current meshery-cloud organization handlers.",
                  "properties": {
                    "page": {
                      "type": "integer",
                      "description": "Zero-based page index returned in this response.",
                      "minimum": 0
                    },
                    "pageSize": {
                      "type": "integer",
                      "description": "Maximum number of items returned on each page.",
                      "minimum": 1,
                      "x-oapi-codegen-extra-tags": {
                        "json": "pageSize,omitempty"
                      }
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of items across all pages.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "json": "totalCount,omitempty"
                      }
                    },
                    "organizations": {
                      "type": "array",
                      "description": "Organizations returned in this single-item page wrapper.",
                      "maxItems": 1,
                      "items": {
                        "type": "object",
                        "description": "Organization listing record used in list and get responses.",
                        "additionalProperties": false,
                        "properties": {
                          "id": {
                            "description": "Organization ID.",
                            "x-go-name": "ID",
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "name": {
                            "description": "Name of the organization.",
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "description": {
                            "description": "Description of the organization.",
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "country": {
                            "description": "Country of the organization.",
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "region": {
                            "description": "Region of the organization.",
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "owner": {
                            "description": "Display name of the organization owner.",
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "metadata": {
                            "x-go-type": "OrgMetadata",
                            "type": "object",
                            "description": "Free-form metadata associated with an organization, including preferences.",
                            "required": [
                              "preferences"
                            ],
                            "properties": {
                              "preferences": {
                                "x-go-type": "Preferences",
                                "type": "object",
                                "description": "Organization-level user experience preferences.",
                                "required": [
                                  "theme",
                                  "dashboard"
                                ],
                                "properties": {
                                  "theme": {
                                    "x-go-type": "Theme",
                                    "type": "object",
                                    "description": "UI theme configured for an organization.",
                                    "required": [
                                      "id",
                                      "logo"
                                    ],
                                    "properties": {
                                      "id": {
                                        "type": "string",
                                        "description": "Theme identifier.",
                                        "format": "uuid",
                                        "maxLength": 36
                                      },
                                      "logo": {
                                        "x-go-type": "Logo",
                                        "type": "object",
                                        "description": "Themed logo assets used across light and dark, desktop and mobile presentations.",
                                        "required": [
                                          "desktopView",
                                          "mobileView",
                                          "darkDesktopView",
                                          "darkMobileView"
                                        ],
                                        "properties": {
                                          "desktopView": {
                                            "x-go-type": "Location",
                                            "type": "object",
                                            "description": "Image asset anchored to a named location within an organization theme.",
                                            "required": [
                                              "svg",
                                              "location"
                                            ],
                                            "properties": {
                                              "svg": {
                                                "type": "string",
                                                "description": "SVG markup for the asset.",
                                                "maxLength": 500
                                              },
                                              "location": {
                                                "type": "string",
                                                "description": "Named location of the asset (e.g. header, footer).",
                                                "maxLength": 500
                                              }
                                            }
                                          },
                                          "mobileView": {
                                            "x-go-type": "Location",
                                            "type": "object",
                                            "description": "Image asset anchored to a named location within an organization theme.",
                                            "required": [
                                              "svg",
                                              "location"
                                            ],
                                            "properties": {
                                              "svg": {
                                                "type": "string",
                                                "description": "SVG markup for the asset.",
                                                "maxLength": 500
                                              },
                                              "location": {
                                                "type": "string",
                                                "description": "Named location of the asset (e.g. header, footer).",
                                                "maxLength": 500
                                              }
                                            }
                                          },
                                          "darkDesktopView": {
                                            "x-go-type": "Location",
                                            "type": "object",
                                            "description": "Image asset anchored to a named location within an organization theme.",
                                            "required": [
                                              "svg",
                                              "location"
                                            ],
                                            "properties": {
                                              "svg": {
                                                "type": "string",
                                                "description": "SVG markup for the asset.",
                                                "maxLength": 500
                                              },
                                              "location": {
                                                "type": "string",
                                                "description": "Named location of the asset (e.g. header, footer).",
                                                "maxLength": 500
                                              }
                                            }
                                          },
                                          "darkMobileView": {
                                            "x-go-type": "Location",
                                            "type": "object",
                                            "description": "Image asset anchored to a named location within an organization theme.",
                                            "required": [
                                              "svg",
                                              "location"
                                            ],
                                            "properties": {
                                              "svg": {
                                                "type": "string",
                                                "description": "SVG markup for the asset.",
                                                "maxLength": 500
                                              },
                                              "location": {
                                                "type": "string",
                                                "description": "Named location of the asset (e.g. header, footer).",
                                                "maxLength": 500
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "vars": {
                                        "type": "object",
                                        "additionalProperties": true,
                                        "description": "Arbitrary theme variables keyed by name."
                                      }
                                    }
                                  },
                                  "dashboard": {
                                    "x-go-type": "DashboardPrefs",
                                    "type": "object",
                                    "description": "Preferences specific to dashboard behavior.",
                                    "additionalProperties": true
                                  }
                                }
                              }
                            }
                          },
                          "createdAt": {
                            "description": "Timestamp when the organization was created.",
                            "x-oapi-codegen-extra-tags": {
                              "json": "createdAt,omitempty"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp when the organization was last updated.",
                            "x-oapi-codegen-extra-tags": {
                              "json": "updatedAt,omitempty"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deletedAt": {
                            "description": "Timestamp when the organization was soft-deleted.",
                            "x-oapi-codegen-extra-tags": {
                              "json": "deletedAt,omitempty"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type": "sql.NullTime",
                            "x-go-type-import": {
                              "path": "database/sql"
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
        }
      }
    },
    "/api/identity/orgs/{orgId}/preferences": {
      "get": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "Organizations"
        ],
        "security": [
          {
            "jwt": []
          }
        ],
        "summary": "Get organization preferences",
        "description": "Returns preferences for the specified organization.",
        "operationId": "getOrgPreferences",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
            "required": true,
            "description": "Organization ID.",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
              "x-oapi-codegen-extra-tags": {
                "db": "org_id",
                "json": "org_id"
              },
              "x-go-type-name": "OrganizationId",
              "x-go-type-skip-optional-pointer": true
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Organization metadata, including preferences",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Free-form metadata associated with an organization, including preferences.",
                  "required": [
                    "preferences"
                  ],
                  "properties": {
                    "preferences": {
                      "x-go-type": "Preferences",
                      "type": "object",
                      "description": "Organization-level user experience preferences.",
                      "required": [
                        "theme",
                        "dashboard"
                      ],
                      "properties": {
                        "theme": {
                          "x-go-type": "Theme",
                          "type": "object",
                          "description": "UI theme configured for an organization.",
                          "required": [
                            "id",
                            "logo"
                          ],
                          "properties": {
                            "id": {
                              "type": "string",
                              "description": "Theme identifier.",
                              "format": "uuid",
                              "maxLength": 36
                            },
                            "logo": {
                              "x-go-type": "Logo",
                              "type": "object",
                              "description": "Themed logo assets used across light and dark, desktop and mobile presentations.",
                              "required": [
                                "desktopView",
                                "mobileView",
                                "darkDesktopView",
                                "darkMobileView"
                              ],
                              "properties": {
                                "desktopView": {
                                  "x-go-type": "Location",
                                  "type": "object",
                                  "description": "Image asset anchored to a named location within an organization theme.",
                                  "required": [
                                    "svg",
                                    "location"
                                  ],
                                  "properties": {
                                    "svg": {
                                      "type": "string",
                                      "description": "SVG markup for the asset.",
                                      "maxLength": 500
                                    },
                                    "location": {
                                      "type": "string",
                                      "description": "Named location of the asset (e.g. header, footer).",
                                      "maxLength": 500
                                    }
                                  }
                                },
                                "mobileView": {
                                  "x-go-type": "Location",
                                  "type": "object",
                                  "description": "Image asset anchored to a named location within an organization theme.",
                                  "required": [
                                    "svg",
                                    "location"
                                  ],
                                  "properties": {
                                    "svg": {
                                      "type": "string",
                                      "description": "SVG markup for the asset.",
                                      "maxLength": 500
                                    },
                                    "location": {
                                      "type": "string",
                                      "description": "Named location of the asset (e.g. header, footer).",
                                      "maxLength": 500
                                    }
                                  }
                                },
                                "darkDesktopView": {
                                  "x-go-type": "Location",
                                  "type": "object",
                                  "description": "Image asset anchored to a named location within an organization theme.",
                                  "required": [
                                    "svg",
                                    "location"
                                  ],
                                  "properties": {
                                    "svg": {
                                      "type": "string",
                                      "description": "SVG markup for the asset.",
                                      "maxLength": 500
                                    },
                                    "location": {
                                      "type": "string",
                                      "description": "Named location of the asset (e.g. header, footer).",
                                      "maxLength": 500
                                    }
                                  }
                                },
                                "darkMobileView": {
                                  "x-go-type": "Location",
                                  "type": "object",
                                  "description": "Image asset anchored to a named location within an organization theme.",
                                  "required": [
                                    "svg",
                                    "location"
                                  ],
                                  "properties": {
                                    "svg": {
                                      "type": "string",
                                      "description": "SVG markup for the asset.",
                                      "maxLength": 500
                                    },
                                    "location": {
                                      "type": "string",
                                      "description": "Named location of the asset (e.g. header, footer).",
                                      "maxLength": 500
                                    }
                                  }
                                }
                              }
                            },
                            "vars": {
                              "type": "object",
                              "additionalProperties": true,
                              "description": "Arbitrary theme variables keyed by name."
                            }
                          }
                        },
                        "dashboard": {
                          "x-go-type": "DashboardPrefs",
                          "type": "object",
                          "description": "Preferences specific to dashboard behavior.",
                          "additionalProperties": true
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
    "/api/identity/orgs/{orgId}/teams/{teamId}": {
      "post": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "Organizations"
        ],
        "security": [
          {
            "jwt": []
          }
        ],
        "summary": "Add team to organization or soft delete team",
        "description": "Adds a team to an organization. If request body contains action=delete, tombstones a team by setting its deletedAt timestamp. The team's organization mapping remains intact.",
        "operationId": "addTeamToOrg",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
            "required": true,
            "description": "Organization ID.",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
              "x-oapi-codegen-extra-tags": {
                "db": "org_id",
                "json": "org_id"
              },
              "x-go-type-name": "OrganizationId",
              "x-go-type-skip-optional-pointer": true
            }
          },
          {
            "name": "teamId",
            "in": "path",
            "required": true,
            "description": "Team ID.",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
              "x-oapi-codegen-extra-tags": {
                "db": "team_id",
                "json": "team_id"
              },
              "x-go-type-name": "TeamId",
              "x-go-type-skip-optional-pointer": true
            }
          }
        ],
        "requestBody": {
          "required": false,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Optional action payload for POST on /api/identity/orgs/{orgId}/teams/{teamId}.",
                "properties": {
                  "action": {
                    "type": "string",
                    "description": "Internal action to perform on the team resource.",
                    "enum": [
                      "delete"
                    ]
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Team added to organization or team tombstoned",
            "content": {
              "application/json": {
                "schema": {
                  "oneOf": [
                    {
                      "type": "object",
                      "description": "Paginated list of team-organization mappings.",
                      "properties": {
                        "page": {
                          "type": "integer",
                          "description": "Zero-based page index returned in this response.",
                          "minimum": 0
                        },
                        "pageSize": {
                          "type": "integer",
                          "description": "Maximum number of items returned on each page.",
                          "minimum": 1,
                          "x-oapi-codegen-extra-tags": {
                            "json": "pageSize,omitempty"
                          }
                        },
                        "totalCount": {
                          "type": "integer",
                          "description": "Total number of items across all pages.",
                          "minimum": 0,
                          "x-oapi-codegen-extra-tags": {
                            "json": "totalCount,omitempty"
                          }
                        },
                        "teamsOrganizationsMapping": {
                          "type": "array",
                          "description": "Team-organization mapping entries.",
                          "items": {
                            "type": "object",
                            "description": "Junction record linking a team to an organization.",
                            "properties": {
                              "id": {
                                "description": "Mapping record ID.",
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
                              "orgId": {
                                "description": "Organization ID for this mapping.",
                                "x-go-name": "OrgID",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "org_id",
                                  "json": "orgId"
                                },
                                "type": "string",
                                "format": "uuid",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                }
                              },
                              "teamId": {
                                "description": "Team ID for this mapping.",
                                "x-go-name": "TeamID",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "team_id",
                                  "json": "teamId"
                                },
                                "type": "string",
                                "format": "uuid",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                }
                              },
                              "createdAt": {
                                "description": "Timestamp when the mapping was created.",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "created_at",
                                  "json": "createdAt,omitempty"
                                },
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "updatedAt": {
                                "description": "Timestamp when the mapping was last updated.",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "updated_at",
                                  "json": "updatedAt,omitempty"
                                },
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "deletedAt": {
                                "description": "Timestamp when the mapping was soft-deleted.",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "deleted_at",
                                  "json": "deletedAt,omitempty"
                                },
                                "type": "string",
                                "format": "date-time",
                                "x-go-type": "sql.NullTime",
                                "x-go-type-import": {
                                  "path": "database/sql"
                                },
                                "x-go-type-skip-optional-pointer": true
                              }
                            }
                          }
                        }
                      }
                    },
                    {
                      "type": "object",
                      "description": "Paginated list of teams.",
                      "properties": {
                        "page": {
                          "type": "integer",
                          "description": "Zero-based page index returned in this response.",
                          "minimum": 0
                        },
                        "pageSize": {
                          "type": "integer",
                          "description": "Maximum number of items returned on each page.",
                          "minimum": 1,
                          "x-oapi-codegen-extra-tags": {
                            "json": "pageSize,omitempty"
                          }
                        },
                        "totalCount": {
                          "type": "integer",
                          "description": "Total number of items across all pages.",
                          "minimum": 0,
                          "x-oapi-codegen-extra-tags": {
                            "json": "totalCount,omitempty"
                          }
                        },
                        "teams": {
                          "type": "array",
                          "description": "Teams in this page.",
                          "items": {
                            "type": "object",
                            "description": "Team listing record used in team listings associated with an organization.",
                            "properties": {
                              "id": {
                                "description": "Team ID.",
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
                              "name": {
                                "description": "Name of the team.",
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "description": {
                                "description": "Description of the team.",
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "owner": {
                                "description": "Display name of the team owner.",
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "metadata": {
                                "description": "Free-form team metadata.",
                                "type": "object",
                                "additionalProperties": {
                                  "type": "string"
                                },
                                "x-go-type-skip-optional-pointer": true
                              },
                              "createdAt": {
                                "description": "Timestamp when the team was created.",
                                "x-oapi-codegen-extra-tags": {
                                  "json": "createdAt,omitempty"
                                },
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "updatedAt": {
                                "description": "Timestamp when the team was last updated.",
                                "x-oapi-codegen-extra-tags": {
                                  "json": "updatedAt,omitempty"
                                },
                                "type": "string",
                                "format": "date-time",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "deletedAt": {
                                "description": "Timestamp when the team was soft-deleted.",
                                "x-oapi-codegen-extra-tags": {
                                  "json": "deletedAt,omitempty"
                                },
                                "type": "string",
                                "format": "date-time",
                                "x-go-type": "sql.NullTime",
                                "x-go-type-import": {
                                  "path": "database/sql"
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
          "400": {
            "description": "Bad request"
          },
          "401": {
            "description": "Unauthorized"
          },
          "404": {
            "description": "Not found"
          },
          "500": {
            "description": "Internal server error"
          }
        }
      }
    },
    "/api/identity/orgs/{orgId}/teams/{teamId}/remove": {
      "post": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "Organizations"
        ],
        "security": [
          {
            "jwt": []
          }
        ],
        "summary": "Remove team from organization",
        "description": "Removes (unassigns) a team from an organization.",
        "operationId": "removeTeamFromOrg",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
            "required": true,
            "description": "Organization ID.",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
              "x-oapi-codegen-extra-tags": {
                "db": "org_id",
                "json": "org_id"
              },
              "x-go-type-name": "OrganizationId",
              "x-go-type-skip-optional-pointer": true
            }
          },
          {
            "name": "teamId",
            "in": "path",
            "required": true,
            "description": "Team ID.",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
              "x-oapi-codegen-extra-tags": {
                "db": "team_id",
                "json": "team_id"
              },
              "x-go-type-name": "TeamId",
              "x-go-type-skip-optional-pointer": true
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Team removed from organization",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated list of team-organization mappings.",
                  "properties": {
                    "page": {
                      "type": "integer",
                      "description": "Zero-based page index returned in this response.",
                      "minimum": 0
                    },
                    "pageSize": {
                      "type": "integer",
                      "description": "Maximum number of items returned on each page.",
                      "minimum": 1,
                      "x-oapi-codegen-extra-tags": {
                        "json": "pageSize,omitempty"
                      }
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of items across all pages.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "json": "totalCount,omitempty"
                      }
                    },
                    "teamsOrganizationsMapping": {
                      "type": "array",
                      "description": "Team-organization mapping entries.",
                      "items": {
                        "type": "object",
                        "description": "Junction record linking a team to an organization.",
                        "properties": {
                          "id": {
                            "description": "Mapping record ID.",
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
                          "orgId": {
                            "description": "Organization ID for this mapping.",
                            "x-go-name": "OrgID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "org_id",
                              "json": "orgId"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "teamId": {
                            "description": "Team ID for this mapping.",
                            "x-go-name": "TeamID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "team_id",
                              "json": "teamId"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "createdAt": {
                            "description": "Timestamp when the mapping was created.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "json": "createdAt,omitempty"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp when the mapping was last updated.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "json": "updatedAt,omitempty"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deletedAt": {
                            "description": "Timestamp when the mapping was soft-deleted.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "json": "deletedAt,omitempty"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type": "sql.NullTime",
                            "x-go-type-import": {
                              "path": "database/sql"
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
          },
          "400": {
            "description": "Bad request"
          },
          "401": {
            "description": "Unauthorized"
          },
          "404": {
            "description": "Not found"
          },
          "500": {
            "description": "Internal server error"
          }
        }
      }
    },
    "/api/identity/orgs/{orgId}/users/{userId}": {
      "post": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "Organizations"
        ],
        "security": [
          {
            "jwt": []
          }
        ],
        "summary": "Add user to organization",
        "operationId": "addUserToOrg",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
            "required": true,
            "description": "Organization ID.",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
              "x-oapi-codegen-extra-tags": {
                "db": "org_id",
                "json": "org_id"
              },
              "x-go-type-name": "OrganizationId",
              "x-go-type-skip-optional-pointer": true
            }
          },
          {
            "name": "userId",
            "in": "path",
            "required": true,
            "description": "User ID.",
            "schema": {
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
            }
          }
        ],
        "responses": {
          "201": {
            "description": "User added to organization",
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
            "description": "Unauthorized"
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
            "description": "Internal server error"
          }
        }
      },
      "delete": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "Organizations"
        ],
        "security": [
          {
            "jwt": []
          }
        ],
        "summary": "Remove user from organization",
        "operationId": "deleteUserFromOrg",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
            "required": true,
            "description": "Organization ID.",
            "schema": {
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              },
              "x-oapi-codegen-extra-tags": {
                "db": "org_id",
                "json": "org_id"
              },
              "x-go-type-name": "OrganizationId",
              "x-go-type-skip-optional-pointer": true
            }
          },
          {
            "name": "userId",
            "in": "path",
            "required": true,
            "description": "User ID.",
            "schema": {
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
            }
          }
        ],
        "responses": {
          "204": {
            "description": "User removed from organization"
          },
          "401": {
            "description": "Unauthorized"
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
            "description": "Internal server error"
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
    "parameters": {
      "orgId": {
        "name": "orgId",
        "in": "path",
        "required": true,
        "description": "Organization ID.",
        "schema": {
          "type": "string",
          "format": "uuid",
          "x-go-type": "uuid.UUID",
          "x-go-type-import": {
            "path": "github.com/gofrs/uuid"
          },
          "x-oapi-codegen-extra-tags": {
            "db": "org_id",
            "json": "org_id"
          },
          "x-go-type-name": "OrganizationId",
          "x-go-type-skip-optional-pointer": true
        }
      },
      "userId": {
        "name": "userId",
        "in": "path",
        "required": true,
        "description": "User ID.",
        "schema": {
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
        }
      },
      "teamId": {
        "name": "teamId",
        "in": "path",
        "required": true,
        "description": "Team ID.",
        "schema": {
          "type": "string",
          "format": "uuid",
          "x-go-type": "uuid.UUID",
          "x-go-type-import": {
            "path": "github.com/gofrs/uuid"
          },
          "x-oapi-codegen-extra-tags": {
            "db": "team_id",
            "json": "team_id"
          },
          "x-go-type-name": "TeamId",
          "x-go-type-skip-optional-pointer": true
        }
      },
      "page": {
        "name": "page",
        "in": "query",
        "description": "Zero-based index of the result page to return.",
        "schema": {
          "type": "integer",
          "minimum": 0
        }
      },
      "pageSize": {
        "name": "pageSize",
        "in": "query",
        "description": "Maximum number of items returned on each page.",
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
      },
      "all": {
        "name": "all",
        "in": "query",
        "description": "Get all possible entries",
        "schema": {
          "type": "boolean"
        }
      }
    },
    "requestBodies": {
      "organizationPayload": {
        "description": "Body for creating or updating an organization",
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "description": "Payload for creating or updating an organization. Contains only client-settable fields.",
              "properties": {
                "name": {
                  "description": "Name of the organization.",
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "country": {
                  "description": "Country of the organization.",
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "region": {
                  "description": "Region of the organization.",
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "description": {
                  "description": "Description of the organization.",
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "notifyOrgUpdate": {
                  "type": "boolean",
                  "description": "Indicates whether organization members should be notified of this update."
                },
                "preferences": {
                  "description": "Organization-level user experience preferences.",
                  "type": "object",
                  "required": [
                    "theme",
                    "dashboard"
                  ],
                  "properties": {
                    "theme": {
                      "x-go-type": "Theme",
                      "type": "object",
                      "description": "UI theme configured for an organization.",
                      "required": [
                        "id",
                        "logo"
                      ],
                      "properties": {
                        "id": {
                          "type": "string",
                          "description": "Theme identifier.",
                          "format": "uuid",
                          "maxLength": 36
                        },
                        "logo": {
                          "x-go-type": "Logo",
                          "type": "object",
                          "description": "Themed logo assets used across light and dark, desktop and mobile presentations.",
                          "required": [
                            "desktopView",
                            "mobileView",
                            "darkDesktopView",
                            "darkMobileView"
                          ],
                          "properties": {
                            "desktopView": {
                              "x-go-type": "Location",
                              "type": "object",
                              "description": "Image asset anchored to a named location within an organization theme.",
                              "required": [
                                "svg",
                                "location"
                              ],
                              "properties": {
                                "svg": {
                                  "type": "string",
                                  "description": "SVG markup for the asset.",
                                  "maxLength": 500
                                },
                                "location": {
                                  "type": "string",
                                  "description": "Named location of the asset (e.g. header, footer).",
                                  "maxLength": 500
                                }
                              }
                            },
                            "mobileView": {
                              "x-go-type": "Location",
                              "type": "object",
                              "description": "Image asset anchored to a named location within an organization theme.",
                              "required": [
                                "svg",
                                "location"
                              ],
                              "properties": {
                                "svg": {
                                  "type": "string",
                                  "description": "SVG markup for the asset.",
                                  "maxLength": 500
                                },
                                "location": {
                                  "type": "string",
                                  "description": "Named location of the asset (e.g. header, footer).",
                                  "maxLength": 500
                                }
                              }
                            },
                            "darkDesktopView": {
                              "x-go-type": "Location",
                              "type": "object",
                              "description": "Image asset anchored to a named location within an organization theme.",
                              "required": [
                                "svg",
                                "location"
                              ],
                              "properties": {
                                "svg": {
                                  "type": "string",
                                  "description": "SVG markup for the asset.",
                                  "maxLength": 500
                                },
                                "location": {
                                  "type": "string",
                                  "description": "Named location of the asset (e.g. header, footer).",
                                  "maxLength": 500
                                }
                              }
                            },
                            "darkMobileView": {
                              "x-go-type": "Location",
                              "type": "object",
                              "description": "Image asset anchored to a named location within an organization theme.",
                              "required": [
                                "svg",
                                "location"
                              ],
                              "properties": {
                                "svg": {
                                  "type": "string",
                                  "description": "SVG markup for the asset.",
                                  "maxLength": 500
                                },
                                "location": {
                                  "type": "string",
                                  "description": "Named location of the asset (e.g. header, footer).",
                                  "maxLength": 500
                                }
                              }
                            }
                          }
                        },
                        "vars": {
                          "type": "object",
                          "additionalProperties": true,
                          "description": "Arbitrary theme variables keyed by name."
                        }
                      }
                    },
                    "dashboard": {
                      "x-go-type": "DashboardPrefs",
                      "type": "object",
                      "description": "Preferences specific to dashboard behavior.",
                      "additionalProperties": true
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "schemas": {
      "UUID": {
        "type": "string",
        "format": "uuid",
        "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
        "x-go-type": "uuid.UUID",
        "x-go-type-import": {
          "path": "github.com/gofrs/uuid"
        }
      },
      "NullableTime": {
        "type": "string",
        "format": "date-time",
        "x-go-type": "sql.NullTime",
        "x-go-type-import": {
          "path": "database/sql"
        },
        "x-go-type-skip-optional-pointer": true
      },
      "Time": {
        "type": "string",
        "format": "date-time",
        "x-go-type-skip-optional-pointer": true
      },
      "Text": {
        "type": "string",
        "x-go-type-skip-optional-pointer": true
      },
      "MapObject": {
        "type": "object",
        "additionalProperties": {
          "type": "string"
        },
        "x-go-type-skip-optional-pointer": true
      },
      "OrgTeamActionPayload": {
        "type": "object",
        "description": "Optional action payload for POST on /api/identity/orgs/{orgId}/teams/{teamId}.",
        "properties": {
          "action": {
            "type": "string",
            "description": "Internal action to perform on the team resource.",
            "enum": [
              "delete"
            ]
          }
        }
      },
      "Location": {
        "type": "object",
        "description": "Image asset anchored to a named location within an organization theme.",
        "required": [
          "svg",
          "location"
        ],
        "properties": {
          "svg": {
            "type": "string",
            "description": "SVG markup for the asset.",
            "maxLength": 500
          },
          "location": {
            "type": "string",
            "description": "Named location of the asset (e.g. header, footer).",
            "maxLength": 500
          }
        }
      },
      "Logo": {
        "type": "object",
        "description": "Themed logo assets used across light and dark, desktop and mobile presentations.",
        "required": [
          "desktopView",
          "mobileView",
          "darkDesktopView",
          "darkMobileView"
        ],
        "properties": {
          "desktopView": {
            "x-go-type": "Location",
            "type": "object",
            "description": "Image asset anchored to a named location within an organization theme.",
            "required": [
              "svg",
              "location"
            ],
            "properties": {
              "svg": {
                "type": "string",
                "description": "SVG markup for the asset.",
                "maxLength": 500
              },
              "location": {
                "type": "string",
                "description": "Named location of the asset (e.g. header, footer).",
                "maxLength": 500
              }
            }
          },
          "mobileView": {
            "x-go-type": "Location",
            "type": "object",
            "description": "Image asset anchored to a named location within an organization theme.",
            "required": [
              "svg",
              "location"
            ],
            "properties": {
              "svg": {
                "type": "string",
                "description": "SVG markup for the asset.",
                "maxLength": 500
              },
              "location": {
                "type": "string",
                "description": "Named location of the asset (e.g. header, footer).",
                "maxLength": 500
              }
            }
          },
          "darkDesktopView": {
            "x-go-type": "Location",
            "type": "object",
            "description": "Image asset anchored to a named location within an organization theme.",
            "required": [
              "svg",
              "location"
            ],
            "properties": {
              "svg": {
                "type": "string",
                "description": "SVG markup for the asset.",
                "maxLength": 500
              },
              "location": {
                "type": "string",
                "description": "Named location of the asset (e.g. header, footer).",
                "maxLength": 500
              }
            }
          },
          "darkMobileView": {
            "x-go-type": "Location",
            "type": "object",
            "description": "Image asset anchored to a named location within an organization theme.",
            "required": [
              "svg",
              "location"
            ],
            "properties": {
              "svg": {
                "type": "string",
                "description": "SVG markup for the asset.",
                "maxLength": 500
              },
              "location": {
                "type": "string",
                "description": "Named location of the asset (e.g. header, footer).",
                "maxLength": 500
              }
            }
          }
        }
      },
      "Theme": {
        "type": "object",
        "description": "UI theme configured for an organization.",
        "required": [
          "id",
          "logo"
        ],
        "properties": {
          "id": {
            "type": "string",
            "description": "Theme identifier.",
            "format": "uuid",
            "maxLength": 36
          },
          "logo": {
            "x-go-type": "Logo",
            "type": "object",
            "description": "Themed logo assets used across light and dark, desktop and mobile presentations.",
            "required": [
              "desktopView",
              "mobileView",
              "darkDesktopView",
              "darkMobileView"
            ],
            "properties": {
              "desktopView": {
                "x-go-type": "Location",
                "type": "object",
                "description": "Image asset anchored to a named location within an organization theme.",
                "required": [
                  "svg",
                  "location"
                ],
                "properties": {
                  "svg": {
                    "type": "string",
                    "description": "SVG markup for the asset.",
                    "maxLength": 500
                  },
                  "location": {
                    "type": "string",
                    "description": "Named location of the asset (e.g. header, footer).",
                    "maxLength": 500
                  }
                }
              },
              "mobileView": {
                "x-go-type": "Location",
                "type": "object",
                "description": "Image asset anchored to a named location within an organization theme.",
                "required": [
                  "svg",
                  "location"
                ],
                "properties": {
                  "svg": {
                    "type": "string",
                    "description": "SVG markup for the asset.",
                    "maxLength": 500
                  },
                  "location": {
                    "type": "string",
                    "description": "Named location of the asset (e.g. header, footer).",
                    "maxLength": 500
                  }
                }
              },
              "darkDesktopView": {
                "x-go-type": "Location",
                "type": "object",
                "description": "Image asset anchored to a named location within an organization theme.",
                "required": [
                  "svg",
                  "location"
                ],
                "properties": {
                  "svg": {
                    "type": "string",
                    "description": "SVG markup for the asset.",
                    "maxLength": 500
                  },
                  "location": {
                    "type": "string",
                    "description": "Named location of the asset (e.g. header, footer).",
                    "maxLength": 500
                  }
                }
              },
              "darkMobileView": {
                "x-go-type": "Location",
                "type": "object",
                "description": "Image asset anchored to a named location within an organization theme.",
                "required": [
                  "svg",
                  "location"
                ],
                "properties": {
                  "svg": {
                    "type": "string",
                    "description": "SVG markup for the asset.",
                    "maxLength": 500
                  },
                  "location": {
                    "type": "string",
                    "description": "Named location of the asset (e.g. header, footer).",
                    "maxLength": 500
                  }
                }
              }
            }
          },
          "vars": {
            "type": "object",
            "additionalProperties": true,
            "description": "Arbitrary theme variables keyed by name."
          }
        }
      },
      "DashboardPrefs": {
        "type": "object",
        "description": "Preferences specific to dashboard behavior.",
        "additionalProperties": true
      },
      "Preferences": {
        "type": "object",
        "description": "Organization-level user experience preferences.",
        "required": [
          "theme",
          "dashboard"
        ],
        "properties": {
          "theme": {
            "x-go-type": "Theme",
            "type": "object",
            "description": "UI theme configured for an organization.",
            "required": [
              "id",
              "logo"
            ],
            "properties": {
              "id": {
                "type": "string",
                "description": "Theme identifier.",
                "format": "uuid",
                "maxLength": 36
              },
              "logo": {
                "x-go-type": "Logo",
                "type": "object",
                "description": "Themed logo assets used across light and dark, desktop and mobile presentations.",
                "required": [
                  "desktopView",
                  "mobileView",
                  "darkDesktopView",
                  "darkMobileView"
                ],
                "properties": {
                  "desktopView": {
                    "x-go-type": "Location",
                    "type": "object",
                    "description": "Image asset anchored to a named location within an organization theme.",
                    "required": [
                      "svg",
                      "location"
                    ],
                    "properties": {
                      "svg": {
                        "type": "string",
                        "description": "SVG markup for the asset.",
                        "maxLength": 500
                      },
                      "location": {
                        "type": "string",
                        "description": "Named location of the asset (e.g. header, footer).",
                        "maxLength": 500
                      }
                    }
                  },
                  "mobileView": {
                    "x-go-type": "Location",
                    "type": "object",
                    "description": "Image asset anchored to a named location within an organization theme.",
                    "required": [
                      "svg",
                      "location"
                    ],
                    "properties": {
                      "svg": {
                        "type": "string",
                        "description": "SVG markup for the asset.",
                        "maxLength": 500
                      },
                      "location": {
                        "type": "string",
                        "description": "Named location of the asset (e.g. header, footer).",
                        "maxLength": 500
                      }
                    }
                  },
                  "darkDesktopView": {
                    "x-go-type": "Location",
                    "type": "object",
                    "description": "Image asset anchored to a named location within an organization theme.",
                    "required": [
                      "svg",
                      "location"
                    ],
                    "properties": {
                      "svg": {
                        "type": "string",
                        "description": "SVG markup for the asset.",
                        "maxLength": 500
                      },
                      "location": {
                        "type": "string",
                        "description": "Named location of the asset (e.g. header, footer).",
                        "maxLength": 500
                      }
                    }
                  },
                  "darkMobileView": {
                    "x-go-type": "Location",
                    "type": "object",
                    "description": "Image asset anchored to a named location within an organization theme.",
                    "required": [
                      "svg",
                      "location"
                    ],
                    "properties": {
                      "svg": {
                        "type": "string",
                        "description": "SVG markup for the asset.",
                        "maxLength": 500
                      },
                      "location": {
                        "type": "string",
                        "description": "Named location of the asset (e.g. header, footer).",
                        "maxLength": 500
                      }
                    }
                  }
                }
              },
              "vars": {
                "type": "object",
                "additionalProperties": true,
                "description": "Arbitrary theme variables keyed by name."
              }
            }
          },
          "dashboard": {
            "x-go-type": "DashboardPrefs",
            "type": "object",
            "description": "Preferences specific to dashboard behavior.",
            "additionalProperties": true
          }
        }
      },
      "OrgMetadata": {
        "type": "object",
        "description": "Free-form metadata associated with an organization, including preferences.",
        "required": [
          "preferences"
        ],
        "properties": {
          "preferences": {
            "x-go-type": "Preferences",
            "type": "object",
            "description": "Organization-level user experience preferences.",
            "required": [
              "theme",
              "dashboard"
            ],
            "properties": {
              "theme": {
                "x-go-type": "Theme",
                "type": "object",
                "description": "UI theme configured for an organization.",
                "required": [
                  "id",
                  "logo"
                ],
                "properties": {
                  "id": {
                    "type": "string",
                    "description": "Theme identifier.",
                    "format": "uuid",
                    "maxLength": 36
                  },
                  "logo": {
                    "x-go-type": "Logo",
                    "type": "object",
                    "description": "Themed logo assets used across light and dark, desktop and mobile presentations.",
                    "required": [
                      "desktopView",
                      "mobileView",
                      "darkDesktopView",
                      "darkMobileView"
                    ],
                    "properties": {
                      "desktopView": {
                        "x-go-type": "Location",
                        "type": "object",
                        "description": "Image asset anchored to a named location within an organization theme.",
                        "required": [
                          "svg",
                          "location"
                        ],
                        "properties": {
                          "svg": {
                            "type": "string",
                            "description": "SVG markup for the asset.",
                            "maxLength": 500
                          },
                          "location": {
                            "type": "string",
                            "description": "Named location of the asset (e.g. header, footer).",
                            "maxLength": 500
                          }
                        }
                      },
                      "mobileView": {
                        "x-go-type": "Location",
                        "type": "object",
                        "description": "Image asset anchored to a named location within an organization theme.",
                        "required": [
                          "svg",
                          "location"
                        ],
                        "properties": {
                          "svg": {
                            "type": "string",
                            "description": "SVG markup for the asset.",
                            "maxLength": 500
                          },
                          "location": {
                            "type": "string",
                            "description": "Named location of the asset (e.g. header, footer).",
                            "maxLength": 500
                          }
                        }
                      },
                      "darkDesktopView": {
                        "x-go-type": "Location",
                        "type": "object",
                        "description": "Image asset anchored to a named location within an organization theme.",
                        "required": [
                          "svg",
                          "location"
                        ],
                        "properties": {
                          "svg": {
                            "type": "string",
                            "description": "SVG markup for the asset.",
                            "maxLength": 500
                          },
                          "location": {
                            "type": "string",
                            "description": "Named location of the asset (e.g. header, footer).",
                            "maxLength": 500
                          }
                        }
                      },
                      "darkMobileView": {
                        "x-go-type": "Location",
                        "type": "object",
                        "description": "Image asset anchored to a named location within an organization theme.",
                        "required": [
                          "svg",
                          "location"
                        ],
                        "properties": {
                          "svg": {
                            "type": "string",
                            "description": "SVG markup for the asset.",
                            "maxLength": 500
                          },
                          "location": {
                            "type": "string",
                            "description": "Named location of the asset (e.g. header, footer).",
                            "maxLength": 500
                          }
                        }
                      }
                    }
                  },
                  "vars": {
                    "type": "object",
                    "additionalProperties": true,
                    "description": "Arbitrary theme variables keyed by name."
                  }
                }
              },
              "dashboard": {
                "x-go-type": "DashboardPrefs",
                "type": "object",
                "description": "Preferences specific to dashboard behavior.",
                "additionalProperties": true
              }
            }
          }
        }
      },
      "Organization": {
        "$id": "https://schemas.meshery.io/organization.yaml",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "description": "An organization in Meshery Cloud. Organizations are the top-level tenancy boundary and own teams, workspaces, environments, designs, and other resources. Learn more at https://docs.meshery.io/concepts/logical/organizations",
        "type": "object",
        "additionalProperties": false,
        "required": [
          "id",
          "name",
          "country",
          "region",
          "description",
          "owner",
          "metadata",
          "createdAt",
          "updatedAt"
        ],
        "properties": {
          "id": {
            "description": "Organization ID.",
            "x-oapi-codegen-extra-tags": {
              "db": "id",
              "json": "id"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "name": {
            "type": "string",
            "description": "Name of the organization.",
            "minLength": 1,
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "name",
              "json": "name"
            }
          },
          "country": {
            "type": "string",
            "description": "Country of the organization.",
            "maxLength": 500,
            "x-oapi-codegen-extra-tags": {
              "db": "country",
              "json": "country"
            }
          },
          "region": {
            "type": "string",
            "description": "Region of the organization.",
            "maxLength": 500,
            "x-oapi-codegen-extra-tags": {
              "db": "region",
              "json": "region"
            }
          },
          "description": {
            "type": "string",
            "description": "Description of the organization.",
            "maxLength": 5000,
            "x-oapi-codegen-extra-tags": {
              "db": "description",
              "json": "description"
            }
          },
          "owner": {
            "description": "Owner user ID of the organization.",
            "x-oapi-codegen-extra-tags": {
              "db": "owner",
              "json": "owner"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "metadata": {
            "type": "object",
            "description": "Free-form metadata associated with the organization, including preferences.",
            "x-go-type": "OrgMetadata",
            "x-oapi-codegen-extra-tags": {
              "db": "metadata",
              "json": "metadata"
            }
          },
          "domain": {
            "type": "string",
            "nullable": true,
            "description": "Domain of the organization.",
            "maxLength": 500,
            "x-oapi-codegen-extra-tags": {
              "db": "domain",
              "json": "domain,omitempty"
            }
          },
          "createdAt": {
            "description": "Timestamp when the organization was created.",
            "type": "string",
            "format": "date-time",
            "x-go-type": "time.Time",
            "x-go-name": "CreatedAt",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "created_at",
              "json": "createdAt"
            }
          },
          "updatedAt": {
            "description": "Timestamp when the organization was last updated.",
            "type": "string",
            "format": "date-time",
            "x-go-type": "time.Time",
            "x-go-name": "UpdatedAt",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at",
              "json": "updatedAt"
            }
          },
          "deletedAt": {
            "description": "Timestamp when the organization was soft-deleted. Null while the organization is active.",
            "type": "string",
            "format": "date-time",
            "x-go-type": "core.NullTime",
            "x-go-name": "DeletedAt",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at",
              "json": "deletedAt,omitempty"
            }
          }
        }
      },
      "AvailableOrganization": {
        "type": "object",
        "description": "Organization listing record used in list and get responses.",
        "additionalProperties": false,
        "properties": {
          "id": {
            "description": "Organization ID.",
            "x-go-name": "ID",
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "name": {
            "description": "Name of the organization.",
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "description": {
            "description": "Description of the organization.",
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "country": {
            "description": "Country of the organization.",
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "region": {
            "description": "Region of the organization.",
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "owner": {
            "description": "Display name of the organization owner.",
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "metadata": {
            "x-go-type": "OrgMetadata",
            "type": "object",
            "description": "Free-form metadata associated with an organization, including preferences.",
            "required": [
              "preferences"
            ],
            "properties": {
              "preferences": {
                "x-go-type": "Preferences",
                "type": "object",
                "description": "Organization-level user experience preferences.",
                "required": [
                  "theme",
                  "dashboard"
                ],
                "properties": {
                  "theme": {
                    "x-go-type": "Theme",
                    "type": "object",
                    "description": "UI theme configured for an organization.",
                    "required": [
                      "id",
                      "logo"
                    ],
                    "properties": {
                      "id": {
                        "type": "string",
                        "description": "Theme identifier.",
                        "format": "uuid",
                        "maxLength": 36
                      },
                      "logo": {
                        "x-go-type": "Logo",
                        "type": "object",
                        "description": "Themed logo assets used across light and dark, desktop and mobile presentations.",
                        "required": [
                          "desktopView",
                          "mobileView",
                          "darkDesktopView",
                          "darkMobileView"
                        ],
                        "properties": {
                          "desktopView": {
                            "x-go-type": "Location",
                            "type": "object",
                            "description": "Image asset anchored to a named location within an organization theme.",
                            "required": [
                              "svg",
                              "location"
                            ],
                            "properties": {
                              "svg": {
                                "type": "string",
                                "description": "SVG markup for the asset.",
                                "maxLength": 500
                              },
                              "location": {
                                "type": "string",
                                "description": "Named location of the asset (e.g. header, footer).",
                                "maxLength": 500
                              }
                            }
                          },
                          "mobileView": {
                            "x-go-type": "Location",
                            "type": "object",
                            "description": "Image asset anchored to a named location within an organization theme.",
                            "required": [
                              "svg",
                              "location"
                            ],
                            "properties": {
                              "svg": {
                                "type": "string",
                                "description": "SVG markup for the asset.",
                                "maxLength": 500
                              },
                              "location": {
                                "type": "string",
                                "description": "Named location of the asset (e.g. header, footer).",
                                "maxLength": 500
                              }
                            }
                          },
                          "darkDesktopView": {
                            "x-go-type": "Location",
                            "type": "object",
                            "description": "Image asset anchored to a named location within an organization theme.",
                            "required": [
                              "svg",
                              "location"
                            ],
                            "properties": {
                              "svg": {
                                "type": "string",
                                "description": "SVG markup for the asset.",
                                "maxLength": 500
                              },
                              "location": {
                                "type": "string",
                                "description": "Named location of the asset (e.g. header, footer).",
                                "maxLength": 500
                              }
                            }
                          },
                          "darkMobileView": {
                            "x-go-type": "Location",
                            "type": "object",
                            "description": "Image asset anchored to a named location within an organization theme.",
                            "required": [
                              "svg",
                              "location"
                            ],
                            "properties": {
                              "svg": {
                                "type": "string",
                                "description": "SVG markup for the asset.",
                                "maxLength": 500
                              },
                              "location": {
                                "type": "string",
                                "description": "Named location of the asset (e.g. header, footer).",
                                "maxLength": 500
                              }
                            }
                          }
                        }
                      },
                      "vars": {
                        "type": "object",
                        "additionalProperties": true,
                        "description": "Arbitrary theme variables keyed by name."
                      }
                    }
                  },
                  "dashboard": {
                    "x-go-type": "DashboardPrefs",
                    "type": "object",
                    "description": "Preferences specific to dashboard behavior.",
                    "additionalProperties": true
                  }
                }
              }
            }
          },
          "createdAt": {
            "description": "Timestamp when the organization was created.",
            "x-oapi-codegen-extra-tags": {
              "json": "createdAt,omitempty"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp when the organization was last updated.",
            "x-oapi-codegen-extra-tags": {
              "json": "updatedAt,omitempty"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deletedAt": {
            "description": "Timestamp when the organization was soft-deleted.",
            "x-oapi-codegen-extra-tags": {
              "json": "deletedAt,omitempty"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type": "sql.NullTime",
            "x-go-type-import": {
              "path": "database/sql"
            },
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "OrganizationsPage": {
        "type": "object",
        "description": "Paginated list of organizations.",
        "properties": {
          "page": {
            "type": "integer",
            "description": "Zero-based page index returned in this response.",
            "minimum": 0
          },
          "pageSize": {
            "type": "integer",
            "description": "Maximum number of items returned on each page.",
            "minimum": 1,
            "x-oapi-codegen-extra-tags": {
              "json": "pageSize,omitempty"
            }
          },
          "totalCount": {
            "type": "integer",
            "description": "Total number of items across all pages.",
            "minimum": 0,
            "x-oapi-codegen-extra-tags": {
              "json": "totalCount,omitempty"
            }
          },
          "organizations": {
            "type": "array",
            "description": "Organizations in this page.",
            "items": {
              "type": "object",
              "description": "Organization listing record used in list and get responses.",
              "additionalProperties": false,
              "properties": {
                "id": {
                  "description": "Organization ID.",
                  "x-go-name": "ID",
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "name": {
                  "description": "Name of the organization.",
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "description": {
                  "description": "Description of the organization.",
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "country": {
                  "description": "Country of the organization.",
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "region": {
                  "description": "Region of the organization.",
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "owner": {
                  "description": "Display name of the organization owner.",
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "metadata": {
                  "x-go-type": "OrgMetadata",
                  "type": "object",
                  "description": "Free-form metadata associated with an organization, including preferences.",
                  "required": [
                    "preferences"
                  ],
                  "properties": {
                    "preferences": {
                      "x-go-type": "Preferences",
                      "type": "object",
                      "description": "Organization-level user experience preferences.",
                      "required": [
                        "theme",
                        "dashboard"
                      ],
                      "properties": {
                        "theme": {
                          "x-go-type": "Theme",
                          "type": "object",
                          "description": "UI theme configured for an organization.",
                          "required": [
                            "id",
                            "logo"
                          ],
                          "properties": {
                            "id": {
                              "type": "string",
                              "description": "Theme identifier.",
                              "format": "uuid",
                              "maxLength": 36
                            },
                            "logo": {
                              "x-go-type": "Logo",
                              "type": "object",
                              "description": "Themed logo assets used across light and dark, desktop and mobile presentations.",
                              "required": [
                                "desktopView",
                                "mobileView",
                                "darkDesktopView",
                                "darkMobileView"
                              ],
                              "properties": {
                                "desktopView": {
                                  "x-go-type": "Location",
                                  "type": "object",
                                  "description": "Image asset anchored to a named location within an organization theme.",
                                  "required": [
                                    "svg",
                                    "location"
                                  ],
                                  "properties": {
                                    "svg": {
                                      "type": "string",
                                      "description": "SVG markup for the asset.",
                                      "maxLength": 500
                                    },
                                    "location": {
                                      "type": "string",
                                      "description": "Named location of the asset (e.g. header, footer).",
                                      "maxLength": 500
                                    }
                                  }
                                },
                                "mobileView": {
                                  "x-go-type": "Location",
                                  "type": "object",
                                  "description": "Image asset anchored to a named location within an organization theme.",
                                  "required": [
                                    "svg",
                                    "location"
                                  ],
                                  "properties": {
                                    "svg": {
                                      "type": "string",
                                      "description": "SVG markup for the asset.",
                                      "maxLength": 500
                                    },
                                    "location": {
                                      "type": "string",
                                      "description": "Named location of the asset (e.g. header, footer).",
                                      "maxLength": 500
                                    }
                                  }
                                },
                                "darkDesktopView": {
                                  "x-go-type": "Location",
                                  "type": "object",
                                  "description": "Image asset anchored to a named location within an organization theme.",
                                  "required": [
                                    "svg",
                                    "location"
                                  ],
                                  "properties": {
                                    "svg": {
                                      "type": "string",
                                      "description": "SVG markup for the asset.",
                                      "maxLength": 500
                                    },
                                    "location": {
                                      "type": "string",
                                      "description": "Named location of the asset (e.g. header, footer).",
                                      "maxLength": 500
                                    }
                                  }
                                },
                                "darkMobileView": {
                                  "x-go-type": "Location",
                                  "type": "object",
                                  "description": "Image asset anchored to a named location within an organization theme.",
                                  "required": [
                                    "svg",
                                    "location"
                                  ],
                                  "properties": {
                                    "svg": {
                                      "type": "string",
                                      "description": "SVG markup for the asset.",
                                      "maxLength": 500
                                    },
                                    "location": {
                                      "type": "string",
                                      "description": "Named location of the asset (e.g. header, footer).",
                                      "maxLength": 500
                                    }
                                  }
                                }
                              }
                            },
                            "vars": {
                              "type": "object",
                              "additionalProperties": true,
                              "description": "Arbitrary theme variables keyed by name."
                            }
                          }
                        },
                        "dashboard": {
                          "x-go-type": "DashboardPrefs",
                          "type": "object",
                          "description": "Preferences specific to dashboard behavior.",
                          "additionalProperties": true
                        }
                      }
                    }
                  }
                },
                "createdAt": {
                  "description": "Timestamp when the organization was created.",
                  "x-oapi-codegen-extra-tags": {
                    "json": "createdAt,omitempty"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updatedAt": {
                  "description": "Timestamp when the organization was last updated.",
                  "x-oapi-codegen-extra-tags": {
                    "json": "updatedAt,omitempty"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "deletedAt": {
                  "description": "Timestamp when the organization was soft-deleted.",
                  "x-oapi-codegen-extra-tags": {
                    "json": "deletedAt,omitempty"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type": "sql.NullTime",
                  "x-go-type-import": {
                    "path": "database/sql"
                  },
                  "x-go-type-skip-optional-pointer": true
                }
              }
            }
          }
        }
      },
      "OrganizationPage": {
        "type": "object",
        "description": "Single-organization wrapper used by current meshery-cloud organization handlers.",
        "properties": {
          "page": {
            "type": "integer",
            "description": "Zero-based page index returned in this response.",
            "minimum": 0
          },
          "pageSize": {
            "type": "integer",
            "description": "Maximum number of items returned on each page.",
            "minimum": 1,
            "x-oapi-codegen-extra-tags": {
              "json": "pageSize,omitempty"
            }
          },
          "totalCount": {
            "type": "integer",
            "description": "Total number of items across all pages.",
            "minimum": 0,
            "x-oapi-codegen-extra-tags": {
              "json": "totalCount,omitempty"
            }
          },
          "organizations": {
            "type": "array",
            "description": "Organizations returned in this single-item page wrapper.",
            "maxItems": 1,
            "items": {
              "type": "object",
              "description": "Organization listing record used in list and get responses.",
              "additionalProperties": false,
              "properties": {
                "id": {
                  "description": "Organization ID.",
                  "x-go-name": "ID",
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "name": {
                  "description": "Name of the organization.",
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "description": {
                  "description": "Description of the organization.",
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "country": {
                  "description": "Country of the organization.",
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "region": {
                  "description": "Region of the organization.",
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "owner": {
                  "description": "Display name of the organization owner.",
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "metadata": {
                  "x-go-type": "OrgMetadata",
                  "type": "object",
                  "description": "Free-form metadata associated with an organization, including preferences.",
                  "required": [
                    "preferences"
                  ],
                  "properties": {
                    "preferences": {
                      "x-go-type": "Preferences",
                      "type": "object",
                      "description": "Organization-level user experience preferences.",
                      "required": [
                        "theme",
                        "dashboard"
                      ],
                      "properties": {
                        "theme": {
                          "x-go-type": "Theme",
                          "type": "object",
                          "description": "UI theme configured for an organization.",
                          "required": [
                            "id",
                            "logo"
                          ],
                          "properties": {
                            "id": {
                              "type": "string",
                              "description": "Theme identifier.",
                              "format": "uuid",
                              "maxLength": 36
                            },
                            "logo": {
                              "x-go-type": "Logo",
                              "type": "object",
                              "description": "Themed logo assets used across light and dark, desktop and mobile presentations.",
                              "required": [
                                "desktopView",
                                "mobileView",
                                "darkDesktopView",
                                "darkMobileView"
                              ],
                              "properties": {
                                "desktopView": {
                                  "x-go-type": "Location",
                                  "type": "object",
                                  "description": "Image asset anchored to a named location within an organization theme.",
                                  "required": [
                                    "svg",
                                    "location"
                                  ],
                                  "properties": {
                                    "svg": {
                                      "type": "string",
                                      "description": "SVG markup for the asset.",
                                      "maxLength": 500
                                    },
                                    "location": {
                                      "type": "string",
                                      "description": "Named location of the asset (e.g. header, footer).",
                                      "maxLength": 500
                                    }
                                  }
                                },
                                "mobileView": {
                                  "x-go-type": "Location",
                                  "type": "object",
                                  "description": "Image asset anchored to a named location within an organization theme.",
                                  "required": [
                                    "svg",
                                    "location"
                                  ],
                                  "properties": {
                                    "svg": {
                                      "type": "string",
                                      "description": "SVG markup for the asset.",
                                      "maxLength": 500
                                    },
                                    "location": {
                                      "type": "string",
                                      "description": "Named location of the asset (e.g. header, footer).",
                                      "maxLength": 500
                                    }
                                  }
                                },
                                "darkDesktopView": {
                                  "x-go-type": "Location",
                                  "type": "object",
                                  "description": "Image asset anchored to a named location within an organization theme.",
                                  "required": [
                                    "svg",
                                    "location"
                                  ],
                                  "properties": {
                                    "svg": {
                                      "type": "string",
                                      "description": "SVG markup for the asset.",
                                      "maxLength": 500
                                    },
                                    "location": {
                                      "type": "string",
                                      "description": "Named location of the asset (e.g. header, footer).",
                                      "maxLength": 500
                                    }
                                  }
                                },
                                "darkMobileView": {
                                  "x-go-type": "Location",
                                  "type": "object",
                                  "description": "Image asset anchored to a named location within an organization theme.",
                                  "required": [
                                    "svg",
                                    "location"
                                  ],
                                  "properties": {
                                    "svg": {
                                      "type": "string",
                                      "description": "SVG markup for the asset.",
                                      "maxLength": 500
                                    },
                                    "location": {
                                      "type": "string",
                                      "description": "Named location of the asset (e.g. header, footer).",
                                      "maxLength": 500
                                    }
                                  }
                                }
                              }
                            },
                            "vars": {
                              "type": "object",
                              "additionalProperties": true,
                              "description": "Arbitrary theme variables keyed by name."
                            }
                          }
                        },
                        "dashboard": {
                          "x-go-type": "DashboardPrefs",
                          "type": "object",
                          "description": "Preferences specific to dashboard behavior.",
                          "additionalProperties": true
                        }
                      }
                    }
                  }
                },
                "createdAt": {
                  "description": "Timestamp when the organization was created.",
                  "x-oapi-codegen-extra-tags": {
                    "json": "createdAt,omitempty"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updatedAt": {
                  "description": "Timestamp when the organization was last updated.",
                  "x-oapi-codegen-extra-tags": {
                    "json": "updatedAt,omitempty"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "deletedAt": {
                  "description": "Timestamp when the organization was soft-deleted.",
                  "x-oapi-codegen-extra-tags": {
                    "json": "deletedAt,omitempty"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type": "sql.NullTime",
                  "x-go-type-import": {
                    "path": "database/sql"
                  },
                  "x-go-type-skip-optional-pointer": true
                }
              }
            }
          }
        }
      },
      "OrganizationPayload": {
        "type": "object",
        "description": "Payload for creating or updating an organization. Contains only client-settable fields.",
        "properties": {
          "name": {
            "description": "Name of the organization.",
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "country": {
            "description": "Country of the organization.",
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "region": {
            "description": "Region of the organization.",
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "description": {
            "description": "Description of the organization.",
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "notifyOrgUpdate": {
            "type": "boolean",
            "description": "Indicates whether organization members should be notified of this update."
          },
          "preferences": {
            "description": "Organization-level user experience preferences.",
            "type": "object",
            "required": [
              "theme",
              "dashboard"
            ],
            "properties": {
              "theme": {
                "x-go-type": "Theme",
                "type": "object",
                "description": "UI theme configured for an organization.",
                "required": [
                  "id",
                  "logo"
                ],
                "properties": {
                  "id": {
                    "type": "string",
                    "description": "Theme identifier.",
                    "format": "uuid",
                    "maxLength": 36
                  },
                  "logo": {
                    "x-go-type": "Logo",
                    "type": "object",
                    "description": "Themed logo assets used across light and dark, desktop and mobile presentations.",
                    "required": [
                      "desktopView",
                      "mobileView",
                      "darkDesktopView",
                      "darkMobileView"
                    ],
                    "properties": {
                      "desktopView": {
                        "x-go-type": "Location",
                        "type": "object",
                        "description": "Image asset anchored to a named location within an organization theme.",
                        "required": [
                          "svg",
                          "location"
                        ],
                        "properties": {
                          "svg": {
                            "type": "string",
                            "description": "SVG markup for the asset.",
                            "maxLength": 500
                          },
                          "location": {
                            "type": "string",
                            "description": "Named location of the asset (e.g. header, footer).",
                            "maxLength": 500
                          }
                        }
                      },
                      "mobileView": {
                        "x-go-type": "Location",
                        "type": "object",
                        "description": "Image asset anchored to a named location within an organization theme.",
                        "required": [
                          "svg",
                          "location"
                        ],
                        "properties": {
                          "svg": {
                            "type": "string",
                            "description": "SVG markup for the asset.",
                            "maxLength": 500
                          },
                          "location": {
                            "type": "string",
                            "description": "Named location of the asset (e.g. header, footer).",
                            "maxLength": 500
                          }
                        }
                      },
                      "darkDesktopView": {
                        "x-go-type": "Location",
                        "type": "object",
                        "description": "Image asset anchored to a named location within an organization theme.",
                        "required": [
                          "svg",
                          "location"
                        ],
                        "properties": {
                          "svg": {
                            "type": "string",
                            "description": "SVG markup for the asset.",
                            "maxLength": 500
                          },
                          "location": {
                            "type": "string",
                            "description": "Named location of the asset (e.g. header, footer).",
                            "maxLength": 500
                          }
                        }
                      },
                      "darkMobileView": {
                        "x-go-type": "Location",
                        "type": "object",
                        "description": "Image asset anchored to a named location within an organization theme.",
                        "required": [
                          "svg",
                          "location"
                        ],
                        "properties": {
                          "svg": {
                            "type": "string",
                            "description": "SVG markup for the asset.",
                            "maxLength": 500
                          },
                          "location": {
                            "type": "string",
                            "description": "Named location of the asset (e.g. header, footer).",
                            "maxLength": 500
                          }
                        }
                      }
                    }
                  },
                  "vars": {
                    "type": "object",
                    "additionalProperties": true,
                    "description": "Arbitrary theme variables keyed by name."
                  }
                }
              },
              "dashboard": {
                "x-go-type": "DashboardPrefs",
                "type": "object",
                "description": "Preferences specific to dashboard behavior.",
                "additionalProperties": true
              }
            }
          }
        }
      },
      "AvailableTeam": {
        "type": "object",
        "description": "Team listing record used in team listings associated with an organization.",
        "properties": {
          "id": {
            "description": "Team ID.",
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
          "name": {
            "description": "Name of the team.",
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "description": {
            "description": "Description of the team.",
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "owner": {
            "description": "Display name of the team owner.",
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "metadata": {
            "description": "Free-form team metadata.",
            "type": "object",
            "additionalProperties": {
              "type": "string"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "createdAt": {
            "description": "Timestamp when the team was created.",
            "x-oapi-codegen-extra-tags": {
              "json": "createdAt,omitempty"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp when the team was last updated.",
            "x-oapi-codegen-extra-tags": {
              "json": "updatedAt,omitempty"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deletedAt": {
            "description": "Timestamp when the team was soft-deleted.",
            "x-oapi-codegen-extra-tags": {
              "json": "deletedAt,omitempty"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type": "sql.NullTime",
            "x-go-type-import": {
              "path": "database/sql"
            },
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "TeamsPage": {
        "type": "object",
        "description": "Paginated list of teams.",
        "properties": {
          "page": {
            "type": "integer",
            "description": "Zero-based page index returned in this response.",
            "minimum": 0
          },
          "pageSize": {
            "type": "integer",
            "description": "Maximum number of items returned on each page.",
            "minimum": 1,
            "x-oapi-codegen-extra-tags": {
              "json": "pageSize,omitempty"
            }
          },
          "totalCount": {
            "type": "integer",
            "description": "Total number of items across all pages.",
            "minimum": 0,
            "x-oapi-codegen-extra-tags": {
              "json": "totalCount,omitempty"
            }
          },
          "teams": {
            "type": "array",
            "description": "Teams in this page.",
            "items": {
              "type": "object",
              "description": "Team listing record used in team listings associated with an organization.",
              "properties": {
                "id": {
                  "description": "Team ID.",
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
                "name": {
                  "description": "Name of the team.",
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "description": {
                  "description": "Description of the team.",
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "owner": {
                  "description": "Display name of the team owner.",
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "metadata": {
                  "description": "Free-form team metadata.",
                  "type": "object",
                  "additionalProperties": {
                    "type": "string"
                  },
                  "x-go-type-skip-optional-pointer": true
                },
                "createdAt": {
                  "description": "Timestamp when the team was created.",
                  "x-oapi-codegen-extra-tags": {
                    "json": "createdAt,omitempty"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updatedAt": {
                  "description": "Timestamp when the team was last updated.",
                  "x-oapi-codegen-extra-tags": {
                    "json": "updatedAt,omitempty"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "deletedAt": {
                  "description": "Timestamp when the team was soft-deleted.",
                  "x-oapi-codegen-extra-tags": {
                    "json": "deletedAt,omitempty"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type": "sql.NullTime",
                  "x-go-type-import": {
                    "path": "database/sql"
                  },
                  "x-go-type-skip-optional-pointer": true
                }
              }
            }
          }
        }
      },
      "TeamsOrganizationsMapping": {
        "type": "object",
        "description": "Junction record linking a team to an organization.",
        "properties": {
          "id": {
            "description": "Mapping record ID.",
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
          "orgId": {
            "description": "Organization ID for this mapping.",
            "x-go-name": "OrgID",
            "x-oapi-codegen-extra-tags": {
              "db": "org_id",
              "json": "orgId"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "teamId": {
            "description": "Team ID for this mapping.",
            "x-go-name": "TeamID",
            "x-oapi-codegen-extra-tags": {
              "db": "team_id",
              "json": "teamId"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "createdAt": {
            "description": "Timestamp when the mapping was created.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at",
              "json": "createdAt,omitempty"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp when the mapping was last updated.",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at",
              "json": "updatedAt,omitempty"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deletedAt": {
            "description": "Timestamp when the mapping was soft-deleted.",
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at",
              "json": "deletedAt,omitempty"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type": "sql.NullTime",
            "x-go-type-import": {
              "path": "database/sql"
            },
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "TeamsOrganizationsMappingPage": {
        "type": "object",
        "description": "Paginated list of team-organization mappings.",
        "properties": {
          "page": {
            "type": "integer",
            "description": "Zero-based page index returned in this response.",
            "minimum": 0
          },
          "pageSize": {
            "type": "integer",
            "description": "Maximum number of items returned on each page.",
            "minimum": 1,
            "x-oapi-codegen-extra-tags": {
              "json": "pageSize,omitempty"
            }
          },
          "totalCount": {
            "type": "integer",
            "description": "Total number of items across all pages.",
            "minimum": 0,
            "x-oapi-codegen-extra-tags": {
              "json": "totalCount,omitempty"
            }
          },
          "teamsOrganizationsMapping": {
            "type": "array",
            "description": "Team-organization mapping entries.",
            "items": {
              "type": "object",
              "description": "Junction record linking a team to an organization.",
              "properties": {
                "id": {
                  "description": "Mapping record ID.",
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
                "orgId": {
                  "description": "Organization ID for this mapping.",
                  "x-go-name": "OrgID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "org_id",
                    "json": "orgId"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "teamId": {
                  "description": "Team ID for this mapping.",
                  "x-go-name": "TeamID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "team_id",
                    "json": "teamId"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "createdAt": {
                  "description": "Timestamp when the mapping was created.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at",
                    "json": "createdAt,omitempty"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updatedAt": {
                  "description": "Timestamp when the mapping was last updated.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at",
                    "json": "updatedAt,omitempty"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "deletedAt": {
                  "description": "Timestamp when the mapping was soft-deleted.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "deleted_at",
                    "json": "deletedAt,omitempty"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type": "sql.NullTime",
                  "x-go-type-import": {
                    "path": "database/sql"
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
};

export default OrganizationSchema;
