/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const OrganizationSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Organization",
    "description": "OpenAPI schema for organization management in Meshery Cloud.",
    "x-deprecated": true,
    "x-superseded-by": "v1beta2",
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
                  "properties": {
                    "page": {
                      "type": "integer",
                      "description": "Current page number of the result set.",
                      "minimum": 0
                    },
                    "page_size": {
                      "type": "integer",
                      "description": "Number of items per page.",
                      "minimum": 1
                    },
                    "total_count": {
                      "type": "integer",
                      "description": "Total number of items available.",
                      "minimum": 0
                    },
                    "organizations": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "x-go-name": "ID",
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "name": {
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "description": {
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "country": {
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "region": {
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "owner": {
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "metadata": {
                            "x-go-type": "OrgMetadata",
                            "type": "object",
                            "required": [
                              "preferences"
                            ],
                            "properties": {
                              "preferences": {
                                "x-go-type": "Preferences",
                                "type": "object",
                                "required": [
                                  "theme",
                                  "dashboard"
                                ],
                                "properties": {
                                  "theme": {
                                    "x-go-type": "Theme",
                                    "type": "object",
                                    "required": [
                                      "id",
                                      "logo"
                                    ],
                                    "properties": {
                                      "id": {
                                        "type": "string",
                                        "description": "Theme ID.",
                                        "maxLength": 500,
                                        "format": "uuid"
                                      },
                                      "logo": {
                                        "x-go-type": "Logo",
                                        "type": "object",
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
                                            "required": [
                                              "svg",
                                              "location"
                                            ],
                                            "properties": {
                                              "svg": {
                                                "type": "string",
                                                "description": "The svg of the location.",
                                                "maxLength": 500
                                              },
                                              "location": {
                                                "type": "string",
                                                "description": "The location of the location.",
                                                "maxLength": 500
                                              }
                                            }
                                          },
                                          "mobileView": {
                                            "x-go-type": "Location",
                                            "type": "object",
                                            "required": [
                                              "svg",
                                              "location"
                                            ],
                                            "properties": {
                                              "svg": {
                                                "type": "string",
                                                "description": "The svg of the location.",
                                                "maxLength": 500
                                              },
                                              "location": {
                                                "type": "string",
                                                "description": "The location of the location.",
                                                "maxLength": 500
                                              }
                                            }
                                          },
                                          "darkDesktopView": {
                                            "x-go-type": "Location",
                                            "type": "object",
                                            "required": [
                                              "svg",
                                              "location"
                                            ],
                                            "properties": {
                                              "svg": {
                                                "type": "string",
                                                "description": "The svg of the location.",
                                                "maxLength": 500
                                              },
                                              "location": {
                                                "type": "string",
                                                "description": "The location of the location.",
                                                "maxLength": 500
                                              }
                                            }
                                          },
                                          "darkMobileView": {
                                            "x-go-type": "Location",
                                            "type": "object",
                                            "required": [
                                              "svg",
                                              "location"
                                            ],
                                            "properties": {
                                              "svg": {
                                                "type": "string",
                                                "description": "The svg of the location.",
                                                "maxLength": 500
                                              },
                                              "location": {
                                                "type": "string",
                                                "description": "The location of the location.",
                                                "maxLength": 500
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "vars": {
                                        "type": "object",
                                        "additionalProperties": true,
                                        "description": "The vars of the theme."
                                      }
                                    }
                                  },
                                  "dashboard": {
                                    "x-go-type": "DashboardPrefs",
                                    "type": "object",
                                    "description": "Preferences specific to dashboard behavior",
                                    "additionalProperties": true
                                  }
                                }
                              }
                            }
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
                            "x-go-type": "sql.NullTime",
                            "x-go-type-import": {
                              "path": "database/sql"
                            },
                            "x-go-type-skip-optional-pointer": true
                          }
                        }
                      },
                      "description": "The organizations of the organizationspage."
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
                "properties": {
                  "name": {
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "country": {
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "region": {
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "description": {
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "notifyOrgUpdate": {
                    "type": "boolean",
                    "description": "The notify org update of the organization."
                  },
                  "preferences": {
                    "type": "object",
                    "required": [
                      "theme",
                      "dashboard"
                    ],
                    "properties": {
                      "theme": {
                        "x-go-type": "Theme",
                        "type": "object",
                        "required": [
                          "id",
                          "logo"
                        ],
                        "properties": {
                          "id": {
                            "type": "string",
                            "description": "Theme ID.",
                            "maxLength": 500,
                            "format": "uuid"
                          },
                          "logo": {
                            "x-go-type": "Logo",
                            "type": "object",
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
                                "required": [
                                  "svg",
                                  "location"
                                ],
                                "properties": {
                                  "svg": {
                                    "type": "string",
                                    "description": "The svg of the location.",
                                    "maxLength": 500
                                  },
                                  "location": {
                                    "type": "string",
                                    "description": "The location of the location.",
                                    "maxLength": 500
                                  }
                                }
                              },
                              "mobileView": {
                                "x-go-type": "Location",
                                "type": "object",
                                "required": [
                                  "svg",
                                  "location"
                                ],
                                "properties": {
                                  "svg": {
                                    "type": "string",
                                    "description": "The svg of the location.",
                                    "maxLength": 500
                                  },
                                  "location": {
                                    "type": "string",
                                    "description": "The location of the location.",
                                    "maxLength": 500
                                  }
                                }
                              },
                              "darkDesktopView": {
                                "x-go-type": "Location",
                                "type": "object",
                                "required": [
                                  "svg",
                                  "location"
                                ],
                                "properties": {
                                  "svg": {
                                    "type": "string",
                                    "description": "The svg of the location.",
                                    "maxLength": 500
                                  },
                                  "location": {
                                    "type": "string",
                                    "description": "The location of the location.",
                                    "maxLength": 500
                                  }
                                }
                              },
                              "darkMobileView": {
                                "x-go-type": "Location",
                                "type": "object",
                                "required": [
                                  "svg",
                                  "location"
                                ],
                                "properties": {
                                  "svg": {
                                    "type": "string",
                                    "description": "The svg of the location.",
                                    "maxLength": 500
                                  },
                                  "location": {
                                    "type": "string",
                                    "description": "The location of the location.",
                                    "maxLength": 500
                                  }
                                }
                              }
                            }
                          },
                          "vars": {
                            "type": "object",
                            "additionalProperties": true,
                            "description": "The vars of the theme."
                          }
                        }
                      },
                      "dashboard": {
                        "x-go-type": "DashboardPrefs",
                        "type": "object",
                        "description": "Preferences specific to dashboard behavior",
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
                      "description": "Current page number of the result set.",
                      "minimum": 0
                    },
                    "page_size": {
                      "type": "integer",
                      "description": "Number of items per page.",
                      "minimum": 1
                    },
                    "total_count": {
                      "type": "integer",
                      "description": "Total number of items available.",
                      "minimum": 0
                    },
                    "organizations": {
                      "type": "array",
                      "maxItems": 1,
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "x-go-name": "ID",
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "name": {
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "description": {
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "country": {
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "region": {
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "owner": {
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "metadata": {
                            "x-go-type": "OrgMetadata",
                            "type": "object",
                            "required": [
                              "preferences"
                            ],
                            "properties": {
                              "preferences": {
                                "x-go-type": "Preferences",
                                "type": "object",
                                "required": [
                                  "theme",
                                  "dashboard"
                                ],
                                "properties": {
                                  "theme": {
                                    "x-go-type": "Theme",
                                    "type": "object",
                                    "required": [
                                      "id",
                                      "logo"
                                    ],
                                    "properties": {
                                      "id": {
                                        "type": "string",
                                        "description": "Theme ID.",
                                        "maxLength": 500,
                                        "format": "uuid"
                                      },
                                      "logo": {
                                        "x-go-type": "Logo",
                                        "type": "object",
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
                                            "required": [
                                              "svg",
                                              "location"
                                            ],
                                            "properties": {
                                              "svg": {
                                                "type": "string",
                                                "description": "The svg of the location.",
                                                "maxLength": 500
                                              },
                                              "location": {
                                                "type": "string",
                                                "description": "The location of the location.",
                                                "maxLength": 500
                                              }
                                            }
                                          },
                                          "mobileView": {
                                            "x-go-type": "Location",
                                            "type": "object",
                                            "required": [
                                              "svg",
                                              "location"
                                            ],
                                            "properties": {
                                              "svg": {
                                                "type": "string",
                                                "description": "The svg of the location.",
                                                "maxLength": 500
                                              },
                                              "location": {
                                                "type": "string",
                                                "description": "The location of the location.",
                                                "maxLength": 500
                                              }
                                            }
                                          },
                                          "darkDesktopView": {
                                            "x-go-type": "Location",
                                            "type": "object",
                                            "required": [
                                              "svg",
                                              "location"
                                            ],
                                            "properties": {
                                              "svg": {
                                                "type": "string",
                                                "description": "The svg of the location.",
                                                "maxLength": 500
                                              },
                                              "location": {
                                                "type": "string",
                                                "description": "The location of the location.",
                                                "maxLength": 500
                                              }
                                            }
                                          },
                                          "darkMobileView": {
                                            "x-go-type": "Location",
                                            "type": "object",
                                            "required": [
                                              "svg",
                                              "location"
                                            ],
                                            "properties": {
                                              "svg": {
                                                "type": "string",
                                                "description": "The svg of the location.",
                                                "maxLength": 500
                                              },
                                              "location": {
                                                "type": "string",
                                                "description": "The location of the location.",
                                                "maxLength": 500
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "vars": {
                                        "type": "object",
                                        "additionalProperties": true,
                                        "description": "The vars of the theme."
                                      }
                                    }
                                  },
                                  "dashboard": {
                                    "x-go-type": "DashboardPrefs",
                                    "type": "object",
                                    "description": "Preferences specific to dashboard behavior",
                                    "additionalProperties": true
                                  }
                                }
                              }
                            }
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
                            "x-go-type": "sql.NullTime",
                            "x-go-type-import": {
                              "path": "database/sql"
                            },
                            "x-go-type-skip-optional-pointer": true
                          }
                        }
                      },
                      "description": "The organizations of the organizationpage."
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
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "id",
                    "name",
                    "country",
                    "region",
                    "description",
                    "owner",
                    "metadata",
                    "created_at",
                    "updated_at"
                  ],
                  "properties": {
                    "id": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "id"
                      },
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "name": {
                      "type": "string",
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      },
                      "description": "Name of the organization.",
                      "minLength": 1,
                      "maxLength": 255
                    },
                    "country": {
                      "type": "string",
                      "x-oapi-codegen-extra-tags": {
                        "db": "country"
                      },
                      "description": "The country of the organization.",
                      "maxLength": 500
                    },
                    "region": {
                      "type": "string",
                      "x-oapi-codegen-extra-tags": {
                        "db": "region"
                      },
                      "description": "The region of the organization.",
                      "maxLength": 500
                    },
                    "description": {
                      "type": "string",
                      "x-oapi-codegen-extra-tags": {
                        "db": "description"
                      },
                      "description": "Description of the organization.",
                      "maxLength": 5000
                    },
                    "owner": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner"
                      },
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "metadata": {
                      "x-go-type": "OrgMetadata",
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata"
                      },
                      "type": "object",
                      "required": [
                        "preferences"
                      ],
                      "properties": {
                        "preferences": {
                          "x-go-type": "Preferences",
                          "type": "object",
                          "required": [
                            "theme",
                            "dashboard"
                          ],
                          "properties": {
                            "theme": {
                              "x-go-type": "Theme",
                              "type": "object",
                              "required": [
                                "id",
                                "logo"
                              ],
                              "properties": {
                                "id": {
                                  "type": "string",
                                  "description": "Theme ID.",
                                  "maxLength": 500,
                                  "format": "uuid"
                                },
                                "logo": {
                                  "x-go-type": "Logo",
                                  "type": "object",
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
                                      "required": [
                                        "svg",
                                        "location"
                                      ],
                                      "properties": {
                                        "svg": {
                                          "type": "string",
                                          "description": "The svg of the location.",
                                          "maxLength": 500
                                        },
                                        "location": {
                                          "type": "string",
                                          "description": "The location of the location.",
                                          "maxLength": 500
                                        }
                                      }
                                    },
                                    "mobileView": {
                                      "x-go-type": "Location",
                                      "type": "object",
                                      "required": [
                                        "svg",
                                        "location"
                                      ],
                                      "properties": {
                                        "svg": {
                                          "type": "string",
                                          "description": "The svg of the location.",
                                          "maxLength": 500
                                        },
                                        "location": {
                                          "type": "string",
                                          "description": "The location of the location.",
                                          "maxLength": 500
                                        }
                                      }
                                    },
                                    "darkDesktopView": {
                                      "x-go-type": "Location",
                                      "type": "object",
                                      "required": [
                                        "svg",
                                        "location"
                                      ],
                                      "properties": {
                                        "svg": {
                                          "type": "string",
                                          "description": "The svg of the location.",
                                          "maxLength": 500
                                        },
                                        "location": {
                                          "type": "string",
                                          "description": "The location of the location.",
                                          "maxLength": 500
                                        }
                                      }
                                    },
                                    "darkMobileView": {
                                      "x-go-type": "Location",
                                      "type": "object",
                                      "required": [
                                        "svg",
                                        "location"
                                      ],
                                      "properties": {
                                        "svg": {
                                          "type": "string",
                                          "description": "The svg of the location.",
                                          "maxLength": 500
                                        },
                                        "location": {
                                          "type": "string",
                                          "description": "The location of the location.",
                                          "maxLength": 500
                                        }
                                      }
                                    }
                                  }
                                },
                                "vars": {
                                  "type": "object",
                                  "additionalProperties": true,
                                  "description": "The vars of the theme."
                                }
                              }
                            },
                            "dashboard": {
                              "x-go-type": "DashboardPrefs",
                              "type": "object",
                              "description": "Preferences specific to dashboard behavior",
                              "additionalProperties": true
                            }
                          }
                        }
                      }
                    },
                    "created_at": {
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      }
                    },
                    "updated_at": {
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      }
                    },
                    "deleted_at": {
                      "type": "string",
                      "format": "date-time",
                      "x-go-type": "sql.NullTime",
                      "x-go-type-import": {
                        "path": "database/sql"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at"
                      }
                    },
                    "domain": {
                      "type": "string",
                      "nullable": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "domain"
                      },
                      "description": "The domain of the organization.",
                      "maxLength": 500
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
                      "description": "Current page number of the result set.",
                      "minimum": 0
                    },
                    "page_size": {
                      "type": "integer",
                      "description": "Number of items per page.",
                      "minimum": 1
                    },
                    "total_count": {
                      "type": "integer",
                      "description": "Total number of items available.",
                      "minimum": 0
                    },
                    "organizations": {
                      "type": "array",
                      "maxItems": 1,
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "x-go-name": "ID",
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "name": {
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "description": {
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "country": {
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "region": {
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "owner": {
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "metadata": {
                            "x-go-type": "OrgMetadata",
                            "type": "object",
                            "required": [
                              "preferences"
                            ],
                            "properties": {
                              "preferences": {
                                "x-go-type": "Preferences",
                                "type": "object",
                                "required": [
                                  "theme",
                                  "dashboard"
                                ],
                                "properties": {
                                  "theme": {
                                    "x-go-type": "Theme",
                                    "type": "object",
                                    "required": [
                                      "id",
                                      "logo"
                                    ],
                                    "properties": {
                                      "id": {
                                        "type": "string",
                                        "description": "Theme ID.",
                                        "maxLength": 500,
                                        "format": "uuid"
                                      },
                                      "logo": {
                                        "x-go-type": "Logo",
                                        "type": "object",
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
                                            "required": [
                                              "svg",
                                              "location"
                                            ],
                                            "properties": {
                                              "svg": {
                                                "type": "string",
                                                "description": "The svg of the location.",
                                                "maxLength": 500
                                              },
                                              "location": {
                                                "type": "string",
                                                "description": "The location of the location.",
                                                "maxLength": 500
                                              }
                                            }
                                          },
                                          "mobileView": {
                                            "x-go-type": "Location",
                                            "type": "object",
                                            "required": [
                                              "svg",
                                              "location"
                                            ],
                                            "properties": {
                                              "svg": {
                                                "type": "string",
                                                "description": "The svg of the location.",
                                                "maxLength": 500
                                              },
                                              "location": {
                                                "type": "string",
                                                "description": "The location of the location.",
                                                "maxLength": 500
                                              }
                                            }
                                          },
                                          "darkDesktopView": {
                                            "x-go-type": "Location",
                                            "type": "object",
                                            "required": [
                                              "svg",
                                              "location"
                                            ],
                                            "properties": {
                                              "svg": {
                                                "type": "string",
                                                "description": "The svg of the location.",
                                                "maxLength": 500
                                              },
                                              "location": {
                                                "type": "string",
                                                "description": "The location of the location.",
                                                "maxLength": 500
                                              }
                                            }
                                          },
                                          "darkMobileView": {
                                            "x-go-type": "Location",
                                            "type": "object",
                                            "required": [
                                              "svg",
                                              "location"
                                            ],
                                            "properties": {
                                              "svg": {
                                                "type": "string",
                                                "description": "The svg of the location.",
                                                "maxLength": 500
                                              },
                                              "location": {
                                                "type": "string",
                                                "description": "The location of the location.",
                                                "maxLength": 500
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "vars": {
                                        "type": "object",
                                        "additionalProperties": true,
                                        "description": "The vars of the theme."
                                      }
                                    }
                                  },
                                  "dashboard": {
                                    "x-go-type": "DashboardPrefs",
                                    "type": "object",
                                    "description": "Preferences specific to dashboard behavior",
                                    "additionalProperties": true
                                  }
                                }
                              }
                            }
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
                            "x-go-type": "sql.NullTime",
                            "x-go-type-import": {
                              "path": "database/sql"
                            },
                            "x-go-type-skip-optional-pointer": true
                          }
                        }
                      },
                      "description": "The organizations of the organizationpage."
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
        "operationId": "handleUpdateOrg",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
            "required": true,
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
                "properties": {
                  "name": {
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "country": {
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "region": {
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "description": {
                    "type": "string",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "notifyOrgUpdate": {
                    "type": "boolean",
                    "description": "The notify org update of the organization."
                  },
                  "preferences": {
                    "type": "object",
                    "required": [
                      "theme",
                      "dashboard"
                    ],
                    "properties": {
                      "theme": {
                        "x-go-type": "Theme",
                        "type": "object",
                        "required": [
                          "id",
                          "logo"
                        ],
                        "properties": {
                          "id": {
                            "type": "string",
                            "description": "Theme ID.",
                            "maxLength": 500,
                            "format": "uuid"
                          },
                          "logo": {
                            "x-go-type": "Logo",
                            "type": "object",
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
                                "required": [
                                  "svg",
                                  "location"
                                ],
                                "properties": {
                                  "svg": {
                                    "type": "string",
                                    "description": "The svg of the location.",
                                    "maxLength": 500
                                  },
                                  "location": {
                                    "type": "string",
                                    "description": "The location of the location.",
                                    "maxLength": 500
                                  }
                                }
                              },
                              "mobileView": {
                                "x-go-type": "Location",
                                "type": "object",
                                "required": [
                                  "svg",
                                  "location"
                                ],
                                "properties": {
                                  "svg": {
                                    "type": "string",
                                    "description": "The svg of the location.",
                                    "maxLength": 500
                                  },
                                  "location": {
                                    "type": "string",
                                    "description": "The location of the location.",
                                    "maxLength": 500
                                  }
                                }
                              },
                              "darkDesktopView": {
                                "x-go-type": "Location",
                                "type": "object",
                                "required": [
                                  "svg",
                                  "location"
                                ],
                                "properties": {
                                  "svg": {
                                    "type": "string",
                                    "description": "The svg of the location.",
                                    "maxLength": 500
                                  },
                                  "location": {
                                    "type": "string",
                                    "description": "The location of the location.",
                                    "maxLength": 500
                                  }
                                }
                              },
                              "darkMobileView": {
                                "x-go-type": "Location",
                                "type": "object",
                                "required": [
                                  "svg",
                                  "location"
                                ],
                                "properties": {
                                  "svg": {
                                    "type": "string",
                                    "description": "The svg of the location.",
                                    "maxLength": 500
                                  },
                                  "location": {
                                    "type": "string",
                                    "description": "The location of the location.",
                                    "maxLength": 500
                                  }
                                }
                              }
                            }
                          },
                          "vars": {
                            "type": "object",
                            "additionalProperties": true,
                            "description": "The vars of the theme."
                          }
                        }
                      },
                      "dashboard": {
                        "x-go-type": "DashboardPrefs",
                        "type": "object",
                        "description": "Preferences specific to dashboard behavior",
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
                      "description": "Current page number of the result set.",
                      "minimum": 0
                    },
                    "page_size": {
                      "type": "integer",
                      "description": "Number of items per page.",
                      "minimum": 1
                    },
                    "total_count": {
                      "type": "integer",
                      "description": "Total number of items available.",
                      "minimum": 0
                    },
                    "organizations": {
                      "type": "array",
                      "maxItems": 1,
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "x-go-name": "ID",
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "name": {
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "description": {
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "country": {
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "region": {
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "owner": {
                            "type": "string",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "metadata": {
                            "x-go-type": "OrgMetadata",
                            "type": "object",
                            "required": [
                              "preferences"
                            ],
                            "properties": {
                              "preferences": {
                                "x-go-type": "Preferences",
                                "type": "object",
                                "required": [
                                  "theme",
                                  "dashboard"
                                ],
                                "properties": {
                                  "theme": {
                                    "x-go-type": "Theme",
                                    "type": "object",
                                    "required": [
                                      "id",
                                      "logo"
                                    ],
                                    "properties": {
                                      "id": {
                                        "type": "string",
                                        "description": "Theme ID.",
                                        "maxLength": 500,
                                        "format": "uuid"
                                      },
                                      "logo": {
                                        "x-go-type": "Logo",
                                        "type": "object",
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
                                            "required": [
                                              "svg",
                                              "location"
                                            ],
                                            "properties": {
                                              "svg": {
                                                "type": "string",
                                                "description": "The svg of the location.",
                                                "maxLength": 500
                                              },
                                              "location": {
                                                "type": "string",
                                                "description": "The location of the location.",
                                                "maxLength": 500
                                              }
                                            }
                                          },
                                          "mobileView": {
                                            "x-go-type": "Location",
                                            "type": "object",
                                            "required": [
                                              "svg",
                                              "location"
                                            ],
                                            "properties": {
                                              "svg": {
                                                "type": "string",
                                                "description": "The svg of the location.",
                                                "maxLength": 500
                                              },
                                              "location": {
                                                "type": "string",
                                                "description": "The location of the location.",
                                                "maxLength": 500
                                              }
                                            }
                                          },
                                          "darkDesktopView": {
                                            "x-go-type": "Location",
                                            "type": "object",
                                            "required": [
                                              "svg",
                                              "location"
                                            ],
                                            "properties": {
                                              "svg": {
                                                "type": "string",
                                                "description": "The svg of the location.",
                                                "maxLength": 500
                                              },
                                              "location": {
                                                "type": "string",
                                                "description": "The location of the location.",
                                                "maxLength": 500
                                              }
                                            }
                                          },
                                          "darkMobileView": {
                                            "x-go-type": "Location",
                                            "type": "object",
                                            "required": [
                                              "svg",
                                              "location"
                                            ],
                                            "properties": {
                                              "svg": {
                                                "type": "string",
                                                "description": "The svg of the location.",
                                                "maxLength": 500
                                              },
                                              "location": {
                                                "type": "string",
                                                "description": "The location of the location.",
                                                "maxLength": 500
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "vars": {
                                        "type": "object",
                                        "additionalProperties": true,
                                        "description": "The vars of the theme."
                                      }
                                    }
                                  },
                                  "dashboard": {
                                    "x-go-type": "DashboardPrefs",
                                    "type": "object",
                                    "description": "Preferences specific to dashboard behavior",
                                    "additionalProperties": true
                                  }
                                }
                              }
                            }
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
                            "x-go-type": "sql.NullTime",
                            "x-go-type-import": {
                              "path": "database/sql"
                            },
                            "x-go-type-skip-optional-pointer": true
                          }
                        }
                      },
                      "description": "The organizations of the organizationpage."
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
                  "required": [
                    "preferences"
                  ],
                  "properties": {
                    "preferences": {
                      "x-go-type": "Preferences",
                      "type": "object",
                      "required": [
                        "theme",
                        "dashboard"
                      ],
                      "properties": {
                        "theme": {
                          "x-go-type": "Theme",
                          "type": "object",
                          "required": [
                            "id",
                            "logo"
                          ],
                          "properties": {
                            "id": {
                              "type": "string",
                              "description": "Theme ID.",
                              "maxLength": 500,
                              "format": "uuid"
                            },
                            "logo": {
                              "x-go-type": "Logo",
                              "type": "object",
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
                                  "required": [
                                    "svg",
                                    "location"
                                  ],
                                  "properties": {
                                    "svg": {
                                      "type": "string",
                                      "description": "The svg of the location.",
                                      "maxLength": 500
                                    },
                                    "location": {
                                      "type": "string",
                                      "description": "The location of the location.",
                                      "maxLength": 500
                                    }
                                  }
                                },
                                "mobileView": {
                                  "x-go-type": "Location",
                                  "type": "object",
                                  "required": [
                                    "svg",
                                    "location"
                                  ],
                                  "properties": {
                                    "svg": {
                                      "type": "string",
                                      "description": "The svg of the location.",
                                      "maxLength": 500
                                    },
                                    "location": {
                                      "type": "string",
                                      "description": "The location of the location.",
                                      "maxLength": 500
                                    }
                                  }
                                },
                                "darkDesktopView": {
                                  "x-go-type": "Location",
                                  "type": "object",
                                  "required": [
                                    "svg",
                                    "location"
                                  ],
                                  "properties": {
                                    "svg": {
                                      "type": "string",
                                      "description": "The svg of the location.",
                                      "maxLength": 500
                                    },
                                    "location": {
                                      "type": "string",
                                      "description": "The location of the location.",
                                      "maxLength": 500
                                    }
                                  }
                                },
                                "darkMobileView": {
                                  "x-go-type": "Location",
                                  "type": "object",
                                  "required": [
                                    "svg",
                                    "location"
                                  ],
                                  "properties": {
                                    "svg": {
                                      "type": "string",
                                      "description": "The svg of the location.",
                                      "maxLength": 500
                                    },
                                    "location": {
                                      "type": "string",
                                      "description": "The location of the location.",
                                      "maxLength": 500
                                    }
                                  }
                                }
                              }
                            },
                            "vars": {
                              "type": "object",
                              "additionalProperties": true,
                              "description": "The vars of the theme."
                            }
                          }
                        },
                        "dashboard": {
                          "x-go-type": "DashboardPrefs",
                          "type": "object",
                          "description": "Preferences specific to dashboard behavior",
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
        "description": "Adds a team to an organization. If request body contains action=delete, tombstones a team by setting its deleted_at timestamp. The team's organization mapping remains intact.",
        "operationId": "addTeamToOrg",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
            "required": true,
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
                      "properties": {
                        "page": {
                          "type": "integer",
                          "description": "Current page number of the result set.",
                          "minimum": 0
                        },
                        "page_size": {
                          "type": "integer",
                          "description": "Number of items per page.",
                          "minimum": 1
                        },
                        "total_count": {
                          "type": "integer",
                          "description": "Total number of items available.",
                          "minimum": 0
                        },
                        "teamsOrganizationsMapping": {
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
                                "x-oapi-codegen-extra-tags": {
                                  "db": "id",
                                  "json": "id"
                                },
                                "x-go-type-name": "GeneralId",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "orgId": {
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
                              },
                              "team_id": {
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
                                "x-go-type": "sql.NullTime",
                                "x-go-type-import": {
                                  "path": "database/sql"
                                },
                                "x-go-type-skip-optional-pointer": true
                              }
                            }
                          },
                          "description": "The teams organizations mapping of the teamsorganizationsmappingpage."
                        }
                      }
                    },
                    {
                      "type": "object",
                      "properties": {
                        "page": {
                          "type": "integer",
                          "description": "Current page number of the result set.",
                          "minimum": 0
                        },
                        "page_size": {
                          "type": "integer",
                          "description": "Number of items per page.",
                          "minimum": 1
                        },
                        "total_count": {
                          "type": "integer",
                          "description": "Total number of items available.",
                          "minimum": 0
                        },
                        "teams": {
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
                                "x-oapi-codegen-extra-tags": {
                                  "db": "id",
                                  "json": "id"
                                },
                                "x-go-type-name": "GeneralId",
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
                              "owner": {
                                "type": "string",
                                "x-go-type-skip-optional-pointer": true
                              },
                              "metadata": {
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
                              },
                              "deleted_at": {
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
                          "description": "The teams of the teamspage."
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
                  "properties": {
                    "page": {
                      "type": "integer",
                      "description": "Current page number of the result set.",
                      "minimum": 0
                    },
                    "page_size": {
                      "type": "integer",
                      "description": "Number of items per page.",
                      "minimum": 1
                    },
                    "total_count": {
                      "type": "integer",
                      "description": "Total number of items available.",
                      "minimum": 0
                    },
                    "teamsOrganizationsMapping": {
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
                            "x-oapi-codegen-extra-tags": {
                              "db": "id",
                              "json": "id"
                            },
                            "x-go-type-name": "GeneralId",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "orgId": {
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
                          },
                          "team_id": {
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
                            "x-go-type": "sql.NullTime",
                            "x-go-type-import": {
                              "path": "database/sql"
                            },
                            "x-go-type-skip-optional-pointer": true
                          }
                        }
                      },
                      "description": "The teams organizations mapping of the teamsorganizationsmappingpage."
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
            "schema": {
              "type": "string",
              "description": "user's email or username",
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
            "schema": {
              "type": "string",
              "description": "user's email or username",
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
      },
      "teamId": {
        "name": "teamId",
        "in": "path",
        "required": true,
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
    },
    "requestBodies": {
      "organizationPayload": {
        "description": "Body for creating or updating an organization",
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "country": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "region": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "description": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "notifyOrgUpdate": {
                  "type": "boolean",
                  "description": "The notify org update of the organization."
                },
                "preferences": {
                  "type": "object",
                  "required": [
                    "theme",
                    "dashboard"
                  ],
                  "properties": {
                    "theme": {
                      "x-go-type": "Theme",
                      "type": "object",
                      "required": [
                        "id",
                        "logo"
                      ],
                      "properties": {
                        "id": {
                          "type": "string",
                          "description": "Theme ID.",
                          "maxLength": 500,
                          "format": "uuid"
                        },
                        "logo": {
                          "x-go-type": "Logo",
                          "type": "object",
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
                              "required": [
                                "svg",
                                "location"
                              ],
                              "properties": {
                                "svg": {
                                  "type": "string",
                                  "description": "The svg of the location.",
                                  "maxLength": 500
                                },
                                "location": {
                                  "type": "string",
                                  "description": "The location of the location.",
                                  "maxLength": 500
                                }
                              }
                            },
                            "mobileView": {
                              "x-go-type": "Location",
                              "type": "object",
                              "required": [
                                "svg",
                                "location"
                              ],
                              "properties": {
                                "svg": {
                                  "type": "string",
                                  "description": "The svg of the location.",
                                  "maxLength": 500
                                },
                                "location": {
                                  "type": "string",
                                  "description": "The location of the location.",
                                  "maxLength": 500
                                }
                              }
                            },
                            "darkDesktopView": {
                              "x-go-type": "Location",
                              "type": "object",
                              "required": [
                                "svg",
                                "location"
                              ],
                              "properties": {
                                "svg": {
                                  "type": "string",
                                  "description": "The svg of the location.",
                                  "maxLength": 500
                                },
                                "location": {
                                  "type": "string",
                                  "description": "The location of the location.",
                                  "maxLength": 500
                                }
                              }
                            },
                            "darkMobileView": {
                              "x-go-type": "Location",
                              "type": "object",
                              "required": [
                                "svg",
                                "location"
                              ],
                              "properties": {
                                "svg": {
                                  "type": "string",
                                  "description": "The svg of the location.",
                                  "maxLength": 500
                                },
                                "location": {
                                  "type": "string",
                                  "description": "The location of the location.",
                                  "maxLength": 500
                                }
                              }
                            }
                          }
                        },
                        "vars": {
                          "type": "object",
                          "additionalProperties": true,
                          "description": "The vars of the theme."
                        }
                      }
                    },
                    "dashboard": {
                      "x-go-type": "DashboardPrefs",
                      "type": "object",
                      "description": "Preferences specific to dashboard behavior",
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
        "required": [
          "svg",
          "location"
        ],
        "properties": {
          "svg": {
            "type": "string",
            "description": "The svg of the location.",
            "maxLength": 500
          },
          "location": {
            "type": "string",
            "description": "The location of the location.",
            "maxLength": 500
          }
        }
      },
      "Logo": {
        "type": "object",
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
            "required": [
              "svg",
              "location"
            ],
            "properties": {
              "svg": {
                "type": "string",
                "description": "The svg of the location.",
                "maxLength": 500
              },
              "location": {
                "type": "string",
                "description": "The location of the location.",
                "maxLength": 500
              }
            }
          },
          "mobileView": {
            "x-go-type": "Location",
            "type": "object",
            "required": [
              "svg",
              "location"
            ],
            "properties": {
              "svg": {
                "type": "string",
                "description": "The svg of the location.",
                "maxLength": 500
              },
              "location": {
                "type": "string",
                "description": "The location of the location.",
                "maxLength": 500
              }
            }
          },
          "darkDesktopView": {
            "x-go-type": "Location",
            "type": "object",
            "required": [
              "svg",
              "location"
            ],
            "properties": {
              "svg": {
                "type": "string",
                "description": "The svg of the location.",
                "maxLength": 500
              },
              "location": {
                "type": "string",
                "description": "The location of the location.",
                "maxLength": 500
              }
            }
          },
          "darkMobileView": {
            "x-go-type": "Location",
            "type": "object",
            "required": [
              "svg",
              "location"
            ],
            "properties": {
              "svg": {
                "type": "string",
                "description": "The svg of the location.",
                "maxLength": 500
              },
              "location": {
                "type": "string",
                "description": "The location of the location.",
                "maxLength": 500
              }
            }
          }
        }
      },
      "Theme": {
        "type": "object",
        "required": [
          "id",
          "logo"
        ],
        "properties": {
          "id": {
            "type": "string",
            "description": "Theme ID.",
            "maxLength": 500,
            "format": "uuid"
          },
          "logo": {
            "x-go-type": "Logo",
            "type": "object",
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
                "required": [
                  "svg",
                  "location"
                ],
                "properties": {
                  "svg": {
                    "type": "string",
                    "description": "The svg of the location.",
                    "maxLength": 500
                  },
                  "location": {
                    "type": "string",
                    "description": "The location of the location.",
                    "maxLength": 500
                  }
                }
              },
              "mobileView": {
                "x-go-type": "Location",
                "type": "object",
                "required": [
                  "svg",
                  "location"
                ],
                "properties": {
                  "svg": {
                    "type": "string",
                    "description": "The svg of the location.",
                    "maxLength": 500
                  },
                  "location": {
                    "type": "string",
                    "description": "The location of the location.",
                    "maxLength": 500
                  }
                }
              },
              "darkDesktopView": {
                "x-go-type": "Location",
                "type": "object",
                "required": [
                  "svg",
                  "location"
                ],
                "properties": {
                  "svg": {
                    "type": "string",
                    "description": "The svg of the location.",
                    "maxLength": 500
                  },
                  "location": {
                    "type": "string",
                    "description": "The location of the location.",
                    "maxLength": 500
                  }
                }
              },
              "darkMobileView": {
                "x-go-type": "Location",
                "type": "object",
                "required": [
                  "svg",
                  "location"
                ],
                "properties": {
                  "svg": {
                    "type": "string",
                    "description": "The svg of the location.",
                    "maxLength": 500
                  },
                  "location": {
                    "type": "string",
                    "description": "The location of the location.",
                    "maxLength": 500
                  }
                }
              }
            }
          },
          "vars": {
            "type": "object",
            "additionalProperties": true,
            "description": "The vars of the theme."
          }
        }
      },
      "DashboardPrefs": {
        "type": "object",
        "description": "Preferences specific to dashboard behavior",
        "additionalProperties": true
      },
      "Preferences": {
        "type": "object",
        "required": [
          "theme",
          "dashboard"
        ],
        "properties": {
          "theme": {
            "x-go-type": "Theme",
            "type": "object",
            "required": [
              "id",
              "logo"
            ],
            "properties": {
              "id": {
                "type": "string",
                "description": "Theme ID.",
                "maxLength": 500,
                "format": "uuid"
              },
              "logo": {
                "x-go-type": "Logo",
                "type": "object",
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
                    "required": [
                      "svg",
                      "location"
                    ],
                    "properties": {
                      "svg": {
                        "type": "string",
                        "description": "The svg of the location.",
                        "maxLength": 500
                      },
                      "location": {
                        "type": "string",
                        "description": "The location of the location.",
                        "maxLength": 500
                      }
                    }
                  },
                  "mobileView": {
                    "x-go-type": "Location",
                    "type": "object",
                    "required": [
                      "svg",
                      "location"
                    ],
                    "properties": {
                      "svg": {
                        "type": "string",
                        "description": "The svg of the location.",
                        "maxLength": 500
                      },
                      "location": {
                        "type": "string",
                        "description": "The location of the location.",
                        "maxLength": 500
                      }
                    }
                  },
                  "darkDesktopView": {
                    "x-go-type": "Location",
                    "type": "object",
                    "required": [
                      "svg",
                      "location"
                    ],
                    "properties": {
                      "svg": {
                        "type": "string",
                        "description": "The svg of the location.",
                        "maxLength": 500
                      },
                      "location": {
                        "type": "string",
                        "description": "The location of the location.",
                        "maxLength": 500
                      }
                    }
                  },
                  "darkMobileView": {
                    "x-go-type": "Location",
                    "type": "object",
                    "required": [
                      "svg",
                      "location"
                    ],
                    "properties": {
                      "svg": {
                        "type": "string",
                        "description": "The svg of the location.",
                        "maxLength": 500
                      },
                      "location": {
                        "type": "string",
                        "description": "The location of the location.",
                        "maxLength": 500
                      }
                    }
                  }
                }
              },
              "vars": {
                "type": "object",
                "additionalProperties": true,
                "description": "The vars of the theme."
              }
            }
          },
          "dashboard": {
            "x-go-type": "DashboardPrefs",
            "type": "object",
            "description": "Preferences specific to dashboard behavior",
            "additionalProperties": true
          }
        }
      },
      "OrgMetadata": {
        "type": "object",
        "required": [
          "preferences"
        ],
        "properties": {
          "preferences": {
            "x-go-type": "Preferences",
            "type": "object",
            "required": [
              "theme",
              "dashboard"
            ],
            "properties": {
              "theme": {
                "x-go-type": "Theme",
                "type": "object",
                "required": [
                  "id",
                  "logo"
                ],
                "properties": {
                  "id": {
                    "type": "string",
                    "description": "Theme ID.",
                    "maxLength": 500,
                    "format": "uuid"
                  },
                  "logo": {
                    "x-go-type": "Logo",
                    "type": "object",
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
                        "required": [
                          "svg",
                          "location"
                        ],
                        "properties": {
                          "svg": {
                            "type": "string",
                            "description": "The svg of the location.",
                            "maxLength": 500
                          },
                          "location": {
                            "type": "string",
                            "description": "The location of the location.",
                            "maxLength": 500
                          }
                        }
                      },
                      "mobileView": {
                        "x-go-type": "Location",
                        "type": "object",
                        "required": [
                          "svg",
                          "location"
                        ],
                        "properties": {
                          "svg": {
                            "type": "string",
                            "description": "The svg of the location.",
                            "maxLength": 500
                          },
                          "location": {
                            "type": "string",
                            "description": "The location of the location.",
                            "maxLength": 500
                          }
                        }
                      },
                      "darkDesktopView": {
                        "x-go-type": "Location",
                        "type": "object",
                        "required": [
                          "svg",
                          "location"
                        ],
                        "properties": {
                          "svg": {
                            "type": "string",
                            "description": "The svg of the location.",
                            "maxLength": 500
                          },
                          "location": {
                            "type": "string",
                            "description": "The location of the location.",
                            "maxLength": 500
                          }
                        }
                      },
                      "darkMobileView": {
                        "x-go-type": "Location",
                        "type": "object",
                        "required": [
                          "svg",
                          "location"
                        ],
                        "properties": {
                          "svg": {
                            "type": "string",
                            "description": "The svg of the location.",
                            "maxLength": 500
                          },
                          "location": {
                            "type": "string",
                            "description": "The location of the location.",
                            "maxLength": 500
                          }
                        }
                      }
                    }
                  },
                  "vars": {
                    "type": "object",
                    "additionalProperties": true,
                    "description": "The vars of the theme."
                  }
                }
              },
              "dashboard": {
                "x-go-type": "DashboardPrefs",
                "type": "object",
                "description": "Preferences specific to dashboard behavior",
                "additionalProperties": true
              }
            }
          }
        }
      },
      "Organization": {
        "type": "object",
        "required": [
          "id",
          "name",
          "country",
          "region",
          "description",
          "owner",
          "metadata",
          "created_at",
          "updated_at"
        ],
        "properties": {
          "id": {
            "x-oapi-codegen-extra-tags": {
              "db": "id"
            },
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "name": {
            "type": "string",
            "x-oapi-codegen-extra-tags": {
              "db": "name"
            },
            "description": "Name of the organization.",
            "minLength": 1,
            "maxLength": 255
          },
          "country": {
            "type": "string",
            "x-oapi-codegen-extra-tags": {
              "db": "country"
            },
            "description": "The country of the organization.",
            "maxLength": 500
          },
          "region": {
            "type": "string",
            "x-oapi-codegen-extra-tags": {
              "db": "region"
            },
            "description": "The region of the organization.",
            "maxLength": 500
          },
          "description": {
            "type": "string",
            "x-oapi-codegen-extra-tags": {
              "db": "description"
            },
            "description": "Description of the organization.",
            "maxLength": 5000
          },
          "owner": {
            "x-oapi-codegen-extra-tags": {
              "db": "owner"
            },
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "metadata": {
            "x-go-type": "OrgMetadata",
            "x-oapi-codegen-extra-tags": {
              "db": "metadata"
            },
            "type": "object",
            "required": [
              "preferences"
            ],
            "properties": {
              "preferences": {
                "x-go-type": "Preferences",
                "type": "object",
                "required": [
                  "theme",
                  "dashboard"
                ],
                "properties": {
                  "theme": {
                    "x-go-type": "Theme",
                    "type": "object",
                    "required": [
                      "id",
                      "logo"
                    ],
                    "properties": {
                      "id": {
                        "type": "string",
                        "description": "Theme ID.",
                        "maxLength": 500,
                        "format": "uuid"
                      },
                      "logo": {
                        "x-go-type": "Logo",
                        "type": "object",
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
                            "required": [
                              "svg",
                              "location"
                            ],
                            "properties": {
                              "svg": {
                                "type": "string",
                                "description": "The svg of the location.",
                                "maxLength": 500
                              },
                              "location": {
                                "type": "string",
                                "description": "The location of the location.",
                                "maxLength": 500
                              }
                            }
                          },
                          "mobileView": {
                            "x-go-type": "Location",
                            "type": "object",
                            "required": [
                              "svg",
                              "location"
                            ],
                            "properties": {
                              "svg": {
                                "type": "string",
                                "description": "The svg of the location.",
                                "maxLength": 500
                              },
                              "location": {
                                "type": "string",
                                "description": "The location of the location.",
                                "maxLength": 500
                              }
                            }
                          },
                          "darkDesktopView": {
                            "x-go-type": "Location",
                            "type": "object",
                            "required": [
                              "svg",
                              "location"
                            ],
                            "properties": {
                              "svg": {
                                "type": "string",
                                "description": "The svg of the location.",
                                "maxLength": 500
                              },
                              "location": {
                                "type": "string",
                                "description": "The location of the location.",
                                "maxLength": 500
                              }
                            }
                          },
                          "darkMobileView": {
                            "x-go-type": "Location",
                            "type": "object",
                            "required": [
                              "svg",
                              "location"
                            ],
                            "properties": {
                              "svg": {
                                "type": "string",
                                "description": "The svg of the location.",
                                "maxLength": 500
                              },
                              "location": {
                                "type": "string",
                                "description": "The location of the location.",
                                "maxLength": 500
                              }
                            }
                          }
                        }
                      },
                      "vars": {
                        "type": "object",
                        "additionalProperties": true,
                        "description": "The vars of the theme."
                      }
                    }
                  },
                  "dashboard": {
                    "x-go-type": "DashboardPrefs",
                    "type": "object",
                    "description": "Preferences specific to dashboard behavior",
                    "additionalProperties": true
                  }
                }
              }
            }
          },
          "created_at": {
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "created_at"
            }
          },
          "updated_at": {
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at"
            }
          },
          "deleted_at": {
            "type": "string",
            "format": "date-time",
            "x-go-type": "sql.NullTime",
            "x-go-type-import": {
              "path": "database/sql"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at"
            }
          },
          "domain": {
            "type": "string",
            "nullable": true,
            "x-oapi-codegen-extra-tags": {
              "db": "domain"
            },
            "description": "The domain of the organization.",
            "maxLength": 500
          }
        }
      },
      "AvailableOrganization": {
        "type": "object",
        "properties": {
          "id": {
            "x-go-name": "ID",
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "name": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "description": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "country": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "region": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "owner": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "metadata": {
            "x-go-type": "OrgMetadata",
            "type": "object",
            "required": [
              "preferences"
            ],
            "properties": {
              "preferences": {
                "x-go-type": "Preferences",
                "type": "object",
                "required": [
                  "theme",
                  "dashboard"
                ],
                "properties": {
                  "theme": {
                    "x-go-type": "Theme",
                    "type": "object",
                    "required": [
                      "id",
                      "logo"
                    ],
                    "properties": {
                      "id": {
                        "type": "string",
                        "description": "Theme ID.",
                        "maxLength": 500,
                        "format": "uuid"
                      },
                      "logo": {
                        "x-go-type": "Logo",
                        "type": "object",
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
                            "required": [
                              "svg",
                              "location"
                            ],
                            "properties": {
                              "svg": {
                                "type": "string",
                                "description": "The svg of the location.",
                                "maxLength": 500
                              },
                              "location": {
                                "type": "string",
                                "description": "The location of the location.",
                                "maxLength": 500
                              }
                            }
                          },
                          "mobileView": {
                            "x-go-type": "Location",
                            "type": "object",
                            "required": [
                              "svg",
                              "location"
                            ],
                            "properties": {
                              "svg": {
                                "type": "string",
                                "description": "The svg of the location.",
                                "maxLength": 500
                              },
                              "location": {
                                "type": "string",
                                "description": "The location of the location.",
                                "maxLength": 500
                              }
                            }
                          },
                          "darkDesktopView": {
                            "x-go-type": "Location",
                            "type": "object",
                            "required": [
                              "svg",
                              "location"
                            ],
                            "properties": {
                              "svg": {
                                "type": "string",
                                "description": "The svg of the location.",
                                "maxLength": 500
                              },
                              "location": {
                                "type": "string",
                                "description": "The location of the location.",
                                "maxLength": 500
                              }
                            }
                          },
                          "darkMobileView": {
                            "x-go-type": "Location",
                            "type": "object",
                            "required": [
                              "svg",
                              "location"
                            ],
                            "properties": {
                              "svg": {
                                "type": "string",
                                "description": "The svg of the location.",
                                "maxLength": 500
                              },
                              "location": {
                                "type": "string",
                                "description": "The location of the location.",
                                "maxLength": 500
                              }
                            }
                          }
                        }
                      },
                      "vars": {
                        "type": "object",
                        "additionalProperties": true,
                        "description": "The vars of the theme."
                      }
                    }
                  },
                  "dashboard": {
                    "x-go-type": "DashboardPrefs",
                    "type": "object",
                    "description": "Preferences specific to dashboard behavior",
                    "additionalProperties": true
                  }
                }
              }
            }
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
        "properties": {
          "page": {
            "type": "integer",
            "description": "Current page number of the result set.",
            "minimum": 0
          },
          "page_size": {
            "type": "integer",
            "description": "Number of items per page.",
            "minimum": 1
          },
          "total_count": {
            "type": "integer",
            "description": "Total number of items available.",
            "minimum": 0
          },
          "organizations": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "x-go-name": "ID",
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "name": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "description": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "country": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "region": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "owner": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "metadata": {
                  "x-go-type": "OrgMetadata",
                  "type": "object",
                  "required": [
                    "preferences"
                  ],
                  "properties": {
                    "preferences": {
                      "x-go-type": "Preferences",
                      "type": "object",
                      "required": [
                        "theme",
                        "dashboard"
                      ],
                      "properties": {
                        "theme": {
                          "x-go-type": "Theme",
                          "type": "object",
                          "required": [
                            "id",
                            "logo"
                          ],
                          "properties": {
                            "id": {
                              "type": "string",
                              "description": "Theme ID.",
                              "maxLength": 500,
                              "format": "uuid"
                            },
                            "logo": {
                              "x-go-type": "Logo",
                              "type": "object",
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
                                  "required": [
                                    "svg",
                                    "location"
                                  ],
                                  "properties": {
                                    "svg": {
                                      "type": "string",
                                      "description": "The svg of the location.",
                                      "maxLength": 500
                                    },
                                    "location": {
                                      "type": "string",
                                      "description": "The location of the location.",
                                      "maxLength": 500
                                    }
                                  }
                                },
                                "mobileView": {
                                  "x-go-type": "Location",
                                  "type": "object",
                                  "required": [
                                    "svg",
                                    "location"
                                  ],
                                  "properties": {
                                    "svg": {
                                      "type": "string",
                                      "description": "The svg of the location.",
                                      "maxLength": 500
                                    },
                                    "location": {
                                      "type": "string",
                                      "description": "The location of the location.",
                                      "maxLength": 500
                                    }
                                  }
                                },
                                "darkDesktopView": {
                                  "x-go-type": "Location",
                                  "type": "object",
                                  "required": [
                                    "svg",
                                    "location"
                                  ],
                                  "properties": {
                                    "svg": {
                                      "type": "string",
                                      "description": "The svg of the location.",
                                      "maxLength": 500
                                    },
                                    "location": {
                                      "type": "string",
                                      "description": "The location of the location.",
                                      "maxLength": 500
                                    }
                                  }
                                },
                                "darkMobileView": {
                                  "x-go-type": "Location",
                                  "type": "object",
                                  "required": [
                                    "svg",
                                    "location"
                                  ],
                                  "properties": {
                                    "svg": {
                                      "type": "string",
                                      "description": "The svg of the location.",
                                      "maxLength": 500
                                    },
                                    "location": {
                                      "type": "string",
                                      "description": "The location of the location.",
                                      "maxLength": 500
                                    }
                                  }
                                }
                              }
                            },
                            "vars": {
                              "type": "object",
                              "additionalProperties": true,
                              "description": "The vars of the theme."
                            }
                          }
                        },
                        "dashboard": {
                          "x-go-type": "DashboardPrefs",
                          "type": "object",
                          "description": "Preferences specific to dashboard behavior",
                          "additionalProperties": true
                        }
                      }
                    }
                  }
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
                  "x-go-type": "sql.NullTime",
                  "x-go-type-import": {
                    "path": "database/sql"
                  },
                  "x-go-type-skip-optional-pointer": true
                }
              }
            },
            "description": "The organizations of the organizationspage."
          }
        }
      },
      "OrganizationPage": {
        "type": "object",
        "description": "Single-organization wrapper used by current meshery-cloud organization handlers.",
        "properties": {
          "page": {
            "type": "integer",
            "description": "Current page number of the result set.",
            "minimum": 0
          },
          "page_size": {
            "type": "integer",
            "description": "Number of items per page.",
            "minimum": 1
          },
          "total_count": {
            "type": "integer",
            "description": "Total number of items available.",
            "minimum": 0
          },
          "organizations": {
            "type": "array",
            "maxItems": 1,
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "x-go-name": "ID",
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "name": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "description": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "country": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "region": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "owner": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "metadata": {
                  "x-go-type": "OrgMetadata",
                  "type": "object",
                  "required": [
                    "preferences"
                  ],
                  "properties": {
                    "preferences": {
                      "x-go-type": "Preferences",
                      "type": "object",
                      "required": [
                        "theme",
                        "dashboard"
                      ],
                      "properties": {
                        "theme": {
                          "x-go-type": "Theme",
                          "type": "object",
                          "required": [
                            "id",
                            "logo"
                          ],
                          "properties": {
                            "id": {
                              "type": "string",
                              "description": "Theme ID.",
                              "maxLength": 500,
                              "format": "uuid"
                            },
                            "logo": {
                              "x-go-type": "Logo",
                              "type": "object",
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
                                  "required": [
                                    "svg",
                                    "location"
                                  ],
                                  "properties": {
                                    "svg": {
                                      "type": "string",
                                      "description": "The svg of the location.",
                                      "maxLength": 500
                                    },
                                    "location": {
                                      "type": "string",
                                      "description": "The location of the location.",
                                      "maxLength": 500
                                    }
                                  }
                                },
                                "mobileView": {
                                  "x-go-type": "Location",
                                  "type": "object",
                                  "required": [
                                    "svg",
                                    "location"
                                  ],
                                  "properties": {
                                    "svg": {
                                      "type": "string",
                                      "description": "The svg of the location.",
                                      "maxLength": 500
                                    },
                                    "location": {
                                      "type": "string",
                                      "description": "The location of the location.",
                                      "maxLength": 500
                                    }
                                  }
                                },
                                "darkDesktopView": {
                                  "x-go-type": "Location",
                                  "type": "object",
                                  "required": [
                                    "svg",
                                    "location"
                                  ],
                                  "properties": {
                                    "svg": {
                                      "type": "string",
                                      "description": "The svg of the location.",
                                      "maxLength": 500
                                    },
                                    "location": {
                                      "type": "string",
                                      "description": "The location of the location.",
                                      "maxLength": 500
                                    }
                                  }
                                },
                                "darkMobileView": {
                                  "x-go-type": "Location",
                                  "type": "object",
                                  "required": [
                                    "svg",
                                    "location"
                                  ],
                                  "properties": {
                                    "svg": {
                                      "type": "string",
                                      "description": "The svg of the location.",
                                      "maxLength": 500
                                    },
                                    "location": {
                                      "type": "string",
                                      "description": "The location of the location.",
                                      "maxLength": 500
                                    }
                                  }
                                }
                              }
                            },
                            "vars": {
                              "type": "object",
                              "additionalProperties": true,
                              "description": "The vars of the theme."
                            }
                          }
                        },
                        "dashboard": {
                          "x-go-type": "DashboardPrefs",
                          "type": "object",
                          "description": "Preferences specific to dashboard behavior",
                          "additionalProperties": true
                        }
                      }
                    }
                  }
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
                  "x-go-type": "sql.NullTime",
                  "x-go-type-import": {
                    "path": "database/sql"
                  },
                  "x-go-type-skip-optional-pointer": true
                }
              }
            },
            "description": "The organizations of the organizationpage."
          }
        }
      },
      "OrganizationPayload": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "country": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "region": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "description": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "notifyOrgUpdate": {
            "type": "boolean",
            "description": "The notify org update of the organization."
          },
          "preferences": {
            "type": "object",
            "required": [
              "theme",
              "dashboard"
            ],
            "properties": {
              "theme": {
                "x-go-type": "Theme",
                "type": "object",
                "required": [
                  "id",
                  "logo"
                ],
                "properties": {
                  "id": {
                    "type": "string",
                    "description": "Theme ID.",
                    "maxLength": 500,
                    "format": "uuid"
                  },
                  "logo": {
                    "x-go-type": "Logo",
                    "type": "object",
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
                        "required": [
                          "svg",
                          "location"
                        ],
                        "properties": {
                          "svg": {
                            "type": "string",
                            "description": "The svg of the location.",
                            "maxLength": 500
                          },
                          "location": {
                            "type": "string",
                            "description": "The location of the location.",
                            "maxLength": 500
                          }
                        }
                      },
                      "mobileView": {
                        "x-go-type": "Location",
                        "type": "object",
                        "required": [
                          "svg",
                          "location"
                        ],
                        "properties": {
                          "svg": {
                            "type": "string",
                            "description": "The svg of the location.",
                            "maxLength": 500
                          },
                          "location": {
                            "type": "string",
                            "description": "The location of the location.",
                            "maxLength": 500
                          }
                        }
                      },
                      "darkDesktopView": {
                        "x-go-type": "Location",
                        "type": "object",
                        "required": [
                          "svg",
                          "location"
                        ],
                        "properties": {
                          "svg": {
                            "type": "string",
                            "description": "The svg of the location.",
                            "maxLength": 500
                          },
                          "location": {
                            "type": "string",
                            "description": "The location of the location.",
                            "maxLength": 500
                          }
                        }
                      },
                      "darkMobileView": {
                        "x-go-type": "Location",
                        "type": "object",
                        "required": [
                          "svg",
                          "location"
                        ],
                        "properties": {
                          "svg": {
                            "type": "string",
                            "description": "The svg of the location.",
                            "maxLength": 500
                          },
                          "location": {
                            "type": "string",
                            "description": "The location of the location.",
                            "maxLength": 500
                          }
                        }
                      }
                    }
                  },
                  "vars": {
                    "type": "object",
                    "additionalProperties": true,
                    "description": "The vars of the theme."
                  }
                }
              },
              "dashboard": {
                "x-go-type": "DashboardPrefs",
                "type": "object",
                "description": "Preferences specific to dashboard behavior",
                "additionalProperties": true
              }
            }
          }
        }
      },
      "AvailableTeam": {
        "type": "object",
        "properties": {
          "id": {
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
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "description": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "owner": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          },
          "metadata": {
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
          },
          "deleted_at": {
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
        "properties": {
          "page": {
            "type": "integer",
            "description": "Current page number of the result set.",
            "minimum": 0
          },
          "page_size": {
            "type": "integer",
            "description": "Number of items per page.",
            "minimum": 1
          },
          "total_count": {
            "type": "integer",
            "description": "Total number of items available.",
            "minimum": 0
          },
          "teams": {
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
                  "x-oapi-codegen-extra-tags": {
                    "db": "id",
                    "json": "id"
                  },
                  "x-go-type-name": "GeneralId",
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
                "owner": {
                  "type": "string",
                  "x-go-type-skip-optional-pointer": true
                },
                "metadata": {
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
                },
                "deleted_at": {
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
            "description": "The teams of the teamspage."
          }
        }
      },
      "TeamsOrganizationsMapping": {
        "type": "object",
        "properties": {
          "id": {
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
          },
          "team_id": {
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
        "properties": {
          "page": {
            "type": "integer",
            "description": "Current page number of the result set.",
            "minimum": 0
          },
          "page_size": {
            "type": "integer",
            "description": "Number of items per page.",
            "minimum": 1
          },
          "total_count": {
            "type": "integer",
            "description": "Total number of items available.",
            "minimum": 0
          },
          "teamsOrganizationsMapping": {
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
                  "x-oapi-codegen-extra-tags": {
                    "db": "id",
                    "json": "id"
                  },
                  "x-go-type-name": "GeneralId",
                  "x-go-type-skip-optional-pointer": true
                },
                "orgId": {
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
                },
                "team_id": {
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
                  "x-go-type": "sql.NullTime",
                  "x-go-type-import": {
                    "path": "database/sql"
                  },
                  "x-go-type-skip-optional-pointer": true
                }
              }
            },
            "description": "The teams organizations mapping of the teamsorganizationsmappingpage."
          }
        }
      }
    }
  }
};

export default OrganizationSchema;
