/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const OrganizationSchema = {
  "openapi": "3.0.0",
  "info": {
    "title": "Organization",
    "version": "1.0.0"
  },
  "paths": {
    "/api/identity/orgs/by-domain": {
      "get": {
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
                      }
                    },
                    "country": {
                      "type": "string",
                      "x-oapi-codegen-extra-tags": {
                        "db": "country"
                      }
                    },
                    "region": {
                      "type": "string",
                      "x-oapi-codegen-extra-tags": {
                        "db": "region"
                      }
                    },
                    "description": {
                      "type": "string",
                      "x-oapi-codegen-extra-tags": {
                        "db": "description"
                      }
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
                                  "type": "string"
                                },
                                "logo": {
                                  "x-go-type": "Logo",
                                  "type": "object",
                                  "required": [
                                    "desktop_view",
                                    "mobile_view",
                                    "dark_desktop_view",
                                    "dark_mobile_view"
                                  ],
                                  "properties": {
                                    "desktop_view": {
                                      "x-go-type": "Location",
                                      "type": "object",
                                      "required": [
                                        "svg",
                                        "location"
                                      ],
                                      "properties": {
                                        "svg": {
                                          "type": "string"
                                        },
                                        "location": {
                                          "type": "string"
                                        }
                                      }
                                    },
                                    "mobile_view": {
                                      "x-go-type": "Location",
                                      "type": "object",
                                      "required": [
                                        "svg",
                                        "location"
                                      ],
                                      "properties": {
                                        "svg": {
                                          "type": "string"
                                        },
                                        "location": {
                                          "type": "string"
                                        }
                                      }
                                    },
                                    "dark_desktop_view": {
                                      "x-go-type": "Location",
                                      "type": "object",
                                      "required": [
                                        "svg",
                                        "location"
                                      ],
                                      "properties": {
                                        "svg": {
                                          "type": "string"
                                        },
                                        "location": {
                                          "type": "string"
                                        }
                                      }
                                    },
                                    "dark_mobile_view": {
                                      "x-go-type": "Location",
                                      "type": "object",
                                      "required": [
                                        "svg",
                                        "location"
                                      ],
                                      "properties": {
                                        "svg": {
                                          "type": "string"
                                        },
                                        "location": {
                                          "type": "string"
                                        }
                                      }
                                    }
                                  }
                                },
                                "vars": {
                                  "type": "object",
                                  "additionalProperties": true
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
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updated_at": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deleted_at": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type": "sql.NullTime",
                      "x-go-type-import": {
                        "path": "database/sql"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "domain": {
                      "type": "string",
                      "nullable": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "domain"
                      }
                    }
                  }
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
    "/api/identity/orgs/{orgID}/teams/{teamId}": {
      "post": {
        "summary": "Add team to organization or soft delete team",
        "description": "Adds a team to an organization. If request body contains action=delete, tombstones a team by setting its deleted_at timestamp. The team's organization mapping remains intact.",
        "operationId": "AddTeamToOrg",
        "parameters": [
          {
            "name": "orgID",
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
                "description": "Optional action payload for POST on /api/identity/orgs/{orgID}/teams/{teamId}.",
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
          "200": {
            "description": "Team added to organization or team tombstoned",
            "content": {
              "application/json": {
                "schema": {
                  "oneOf": [
                    {
                      "type": "object",
                      "properties": {
                        "page": {
                          "type": "integer"
                        },
                        "page_size": {
                          "type": "integer"
                        },
                        "total_count": {
                          "type": "integer"
                        },
                        "teams_organizations_mapping": {
                          "type": "array",
                          "items": {
                            "type": "object",
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
                              "org_id": {
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
                          }
                        }
                      }
                    },
                    {
                      "type": "object",
                      "properties": {
                        "page": {
                          "type": "integer"
                        },
                        "page_size": {
                          "type": "integer"
                        },
                        "total_count": {
                          "type": "integer"
                        },
                        "teams": {
                          "type": "array",
                          "items": {
                            "type": "object",
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
      },
      "delete": {
        "summary": "Remove team from organization",
        "description": "Removes (unassigns) a team from an organization.",
        "operationId": "RemoveTeamFromOrg",
        "parameters": [
          {
            "name": "orgID",
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
                      "type": "integer"
                    },
                    "page_size": {
                      "type": "integer"
                    },
                    "total_count": {
                      "type": "integer"
                    },
                    "teams_organizations_mapping": {
                      "type": "array",
                      "items": {
                        "type": "object",
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
                          "org_id": {
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
    }
  },
  "components": {
    "parameters": {
      "orgID": {
        "name": "orgID",
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
        "description": "Optional action payload for POST on /api/identity/orgs/{orgID}/teams/{teamId}.",
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
            "type": "string"
          },
          "location": {
            "type": "string"
          }
        }
      },
      "Logo": {
        "type": "object",
        "required": [
          "desktop_view",
          "mobile_view",
          "dark_desktop_view",
          "dark_mobile_view"
        ],
        "properties": {
          "desktop_view": {
            "x-go-type": "Location",
            "type": "object",
            "required": [
              "svg",
              "location"
            ],
            "properties": {
              "svg": {
                "type": "string"
              },
              "location": {
                "type": "string"
              }
            }
          },
          "mobile_view": {
            "x-go-type": "Location",
            "type": "object",
            "required": [
              "svg",
              "location"
            ],
            "properties": {
              "svg": {
                "type": "string"
              },
              "location": {
                "type": "string"
              }
            }
          },
          "dark_desktop_view": {
            "x-go-type": "Location",
            "type": "object",
            "required": [
              "svg",
              "location"
            ],
            "properties": {
              "svg": {
                "type": "string"
              },
              "location": {
                "type": "string"
              }
            }
          },
          "dark_mobile_view": {
            "x-go-type": "Location",
            "type": "object",
            "required": [
              "svg",
              "location"
            ],
            "properties": {
              "svg": {
                "type": "string"
              },
              "location": {
                "type": "string"
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
            "type": "string"
          },
          "logo": {
            "x-go-type": "Logo",
            "type": "object",
            "required": [
              "desktop_view",
              "mobile_view",
              "dark_desktop_view",
              "dark_mobile_view"
            ],
            "properties": {
              "desktop_view": {
                "x-go-type": "Location",
                "type": "object",
                "required": [
                  "svg",
                  "location"
                ],
                "properties": {
                  "svg": {
                    "type": "string"
                  },
                  "location": {
                    "type": "string"
                  }
                }
              },
              "mobile_view": {
                "x-go-type": "Location",
                "type": "object",
                "required": [
                  "svg",
                  "location"
                ],
                "properties": {
                  "svg": {
                    "type": "string"
                  },
                  "location": {
                    "type": "string"
                  }
                }
              },
              "dark_desktop_view": {
                "x-go-type": "Location",
                "type": "object",
                "required": [
                  "svg",
                  "location"
                ],
                "properties": {
                  "svg": {
                    "type": "string"
                  },
                  "location": {
                    "type": "string"
                  }
                }
              },
              "dark_mobile_view": {
                "x-go-type": "Location",
                "type": "object",
                "required": [
                  "svg",
                  "location"
                ],
                "properties": {
                  "svg": {
                    "type": "string"
                  },
                  "location": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "vars": {
            "type": "object",
            "additionalProperties": true
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
                "type": "string"
              },
              "logo": {
                "x-go-type": "Logo",
                "type": "object",
                "required": [
                  "desktop_view",
                  "mobile_view",
                  "dark_desktop_view",
                  "dark_mobile_view"
                ],
                "properties": {
                  "desktop_view": {
                    "x-go-type": "Location",
                    "type": "object",
                    "required": [
                      "svg",
                      "location"
                    ],
                    "properties": {
                      "svg": {
                        "type": "string"
                      },
                      "location": {
                        "type": "string"
                      }
                    }
                  },
                  "mobile_view": {
                    "x-go-type": "Location",
                    "type": "object",
                    "required": [
                      "svg",
                      "location"
                    ],
                    "properties": {
                      "svg": {
                        "type": "string"
                      },
                      "location": {
                        "type": "string"
                      }
                    }
                  },
                  "dark_desktop_view": {
                    "x-go-type": "Location",
                    "type": "object",
                    "required": [
                      "svg",
                      "location"
                    ],
                    "properties": {
                      "svg": {
                        "type": "string"
                      },
                      "location": {
                        "type": "string"
                      }
                    }
                  },
                  "dark_mobile_view": {
                    "x-go-type": "Location",
                    "type": "object",
                    "required": [
                      "svg",
                      "location"
                    ],
                    "properties": {
                      "svg": {
                        "type": "string"
                      },
                      "location": {
                        "type": "string"
                      }
                    }
                  }
                }
              },
              "vars": {
                "type": "object",
                "additionalProperties": true
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
                    "type": "string"
                  },
                  "logo": {
                    "x-go-type": "Logo",
                    "type": "object",
                    "required": [
                      "desktop_view",
                      "mobile_view",
                      "dark_desktop_view",
                      "dark_mobile_view"
                    ],
                    "properties": {
                      "desktop_view": {
                        "x-go-type": "Location",
                        "type": "object",
                        "required": [
                          "svg",
                          "location"
                        ],
                        "properties": {
                          "svg": {
                            "type": "string"
                          },
                          "location": {
                            "type": "string"
                          }
                        }
                      },
                      "mobile_view": {
                        "x-go-type": "Location",
                        "type": "object",
                        "required": [
                          "svg",
                          "location"
                        ],
                        "properties": {
                          "svg": {
                            "type": "string"
                          },
                          "location": {
                            "type": "string"
                          }
                        }
                      },
                      "dark_desktop_view": {
                        "x-go-type": "Location",
                        "type": "object",
                        "required": [
                          "svg",
                          "location"
                        ],
                        "properties": {
                          "svg": {
                            "type": "string"
                          },
                          "location": {
                            "type": "string"
                          }
                        }
                      },
                      "dark_mobile_view": {
                        "x-go-type": "Location",
                        "type": "object",
                        "required": [
                          "svg",
                          "location"
                        ],
                        "properties": {
                          "svg": {
                            "type": "string"
                          },
                          "location": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  },
                  "vars": {
                    "type": "object",
                    "additionalProperties": true
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
            }
          },
          "country": {
            "type": "string",
            "x-oapi-codegen-extra-tags": {
              "db": "country"
            }
          },
          "region": {
            "type": "string",
            "x-oapi-codegen-extra-tags": {
              "db": "region"
            }
          },
          "description": {
            "type": "string",
            "x-oapi-codegen-extra-tags": {
              "db": "description"
            }
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
                        "type": "string"
                      },
                      "logo": {
                        "x-go-type": "Logo",
                        "type": "object",
                        "required": [
                          "desktop_view",
                          "mobile_view",
                          "dark_desktop_view",
                          "dark_mobile_view"
                        ],
                        "properties": {
                          "desktop_view": {
                            "x-go-type": "Location",
                            "type": "object",
                            "required": [
                              "svg",
                              "location"
                            ],
                            "properties": {
                              "svg": {
                                "type": "string"
                              },
                              "location": {
                                "type": "string"
                              }
                            }
                          },
                          "mobile_view": {
                            "x-go-type": "Location",
                            "type": "object",
                            "required": [
                              "svg",
                              "location"
                            ],
                            "properties": {
                              "svg": {
                                "type": "string"
                              },
                              "location": {
                                "type": "string"
                              }
                            }
                          },
                          "dark_desktop_view": {
                            "x-go-type": "Location",
                            "type": "object",
                            "required": [
                              "svg",
                              "location"
                            ],
                            "properties": {
                              "svg": {
                                "type": "string"
                              },
                              "location": {
                                "type": "string"
                              }
                            }
                          },
                          "dark_mobile_view": {
                            "x-go-type": "Location",
                            "type": "object",
                            "required": [
                              "svg",
                              "location"
                            ],
                            "properties": {
                              "svg": {
                                "type": "string"
                              },
                              "location": {
                                "type": "string"
                              }
                            }
                          }
                        }
                      },
                      "vars": {
                        "type": "object",
                        "additionalProperties": true
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
            "x-oapi-codegen-extra-tags": {
              "db": "created_at"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updated_at": {
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deleted_at": {
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type": "sql.NullTime",
            "x-go-type-import": {
              "path": "database/sql"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "domain": {
            "type": "string",
            "nullable": true,
            "x-oapi-codegen-extra-tags": {
              "db": "domain"
            }
          }
        }
      },
      "AvailableTeam": {
        "type": "object",
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
            "type": "integer"
          },
          "page_size": {
            "type": "integer"
          },
          "total_count": {
            "type": "integer"
          },
          "teams": {
            "type": "array",
            "items": {
              "type": "object",
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
            }
          }
        }
      },
      "TeamsOrganizationsMapping": {
        "type": "object",
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
          "org_id": {
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
            "type": "integer"
          },
          "page_size": {
            "type": "integer"
          },
          "total_count": {
            "type": "integer"
          },
          "teams_organizations_mapping": {
            "type": "array",
            "items": {
              "type": "object",
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
                "org_id": {
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
            }
          }
        }
      }
    }
  }
} as const;

export default OrganizationSchema;
