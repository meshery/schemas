/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const schema = {
  "openapi": "3.0.0",
  "info": {
    "title": "Organization",
    "version": "1.0.0"
  },
  "paths": {},
  "components": {
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
      }
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
};

export default schema;
