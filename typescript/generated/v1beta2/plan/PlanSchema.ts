/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const PlanSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Plan",
    "description": "OpenAPI schema for subscription plan management in Meshery Cloud.",
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
  "security": [
    {
      "jwt": []
    }
  ],
  "tags": [
    {
      "name": "Plans",
      "description": "Operations related to plans"
    }
  ],
  "paths": {
    "/api/entitlement/plans": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "operationId": "getPlans",
        "tags": [
          "Plans"
        ],
        "summary": "Get all plans supported by the system",
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
          }
        ],
        "responses": {
          "200": {
            "description": "Plans response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "additionalProperties": false,
                    "description": "Plan entity schema.",
                    "required": [
                      "id",
                      "name",
                      "cadence",
                      "unit",
                      "price_per_unit",
                      "minimum_units",
                      "currency"
                    ],
                    "properties": {
                      "id": {
                        "x-oapi-codegen-extra-tags": {
                          "db": "id",
                          "json": "id",
                          "csv": "id"
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
                        "x-go-type": "PlanName",
                        "x-oapi-codegen-extra-tags": {
                          "db": "name",
                          "json": "name",
                          "csv": "name"
                        },
                        "type": "string",
                        "description": "Name of the plan",
                        "x-enum-casing-exempt": true,
                        "enum": [
                          "Free",
                          "Team Designer",
                          "Team Operator",
                          "Enterprise"
                        ]
                      },
                      "cadence": {
                        "x-go-type": "PlanCadence",
                        "x-oapi-codegen-extra-tags": {
                          "db": "cadence",
                          "json": "cadence",
                          "csv": "cadence"
                        },
                        "type": "string",
                        "enum": [
                          "none",
                          "monthly",
                          "annually"
                        ]
                      },
                      "unit": {
                        "x-go-type": "PlanUnit",
                        "x-oapi-codegen-extra-tags": {
                          "db": "unit",
                          "json": "unit",
                          "csv": "unit"
                        },
                        "type": "string",
                        "enum": [
                          "user",
                          "free"
                        ]
                      },
                      "minimum_units": {
                        "type": "integer",
                        "description": "Minimum number of units required for the plan",
                        "x-oapi-codegen-extra-tags": {
                          "db": "minimum_units",
                          "json": "minimum_units",
                          "csv": "minimum_units"
                        },
                        "minimum": 0
                      },
                      "price_per_unit": {
                        "type": "number",
                        "description": "Price per unit of the plan",
                        "x-oapi-codegen-extra-tags": {
                          "db": "price_per_unit",
                          "json": "price_per_unit",
                          "csv": "price_per_unit"
                        },
                        "minimum": 0
                      },
                      "currency": {
                        "x-go-type": "Currency",
                        "x-oapi-codegen-extra-tags": {
                          "db": "currency",
                          "json": "currency",
                          "csv": "currency"
                        },
                        "type": "string",
                        "enum": [
                          "usd"
                        ]
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
    }
  },
  "components": {
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
    "securitySchemes": {
      "jwt": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    },
    "schemas": {
      "PlanPage": {
        "type": "object",
        "required": [
          "page",
          "page_size",
          "total_count",
          "plans"
        ],
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
          "plans": {
            "type": "array",
            "items": {
              "type": "object",
              "additionalProperties": false,
              "description": "Plan entity schema.",
              "required": [
                "id",
                "name",
                "cadence",
                "unit",
                "price_per_unit",
                "minimum_units",
                "currency"
              ],
              "properties": {
                "id": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "id",
                    "json": "id",
                    "csv": "id"
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
                  "x-go-type": "PlanName",
                  "x-oapi-codegen-extra-tags": {
                    "db": "name",
                    "json": "name",
                    "csv": "name"
                  },
                  "type": "string",
                  "description": "Name of the plan",
                  "x-enum-casing-exempt": true,
                  "enum": [
                    "Free",
                    "Team Designer",
                    "Team Operator",
                    "Enterprise"
                  ]
                },
                "cadence": {
                  "x-go-type": "PlanCadence",
                  "x-oapi-codegen-extra-tags": {
                    "db": "cadence",
                    "json": "cadence",
                    "csv": "cadence"
                  },
                  "type": "string",
                  "enum": [
                    "none",
                    "monthly",
                    "annually"
                  ]
                },
                "unit": {
                  "x-go-type": "PlanUnit",
                  "x-oapi-codegen-extra-tags": {
                    "db": "unit",
                    "json": "unit",
                    "csv": "unit"
                  },
                  "type": "string",
                  "enum": [
                    "user",
                    "free"
                  ]
                },
                "minimum_units": {
                  "type": "integer",
                  "description": "Minimum number of units required for the plan",
                  "x-oapi-codegen-extra-tags": {
                    "db": "minimum_units",
                    "json": "minimum_units",
                    "csv": "minimum_units"
                  },
                  "minimum": 0
                },
                "price_per_unit": {
                  "type": "number",
                  "description": "Price per unit of the plan",
                  "x-oapi-codegen-extra-tags": {
                    "db": "price_per_unit",
                    "json": "price_per_unit",
                    "csv": "price_per_unit"
                  },
                  "minimum": 0
                },
                "currency": {
                  "x-go-type": "Currency",
                  "x-oapi-codegen-extra-tags": {
                    "db": "currency",
                    "json": "currency",
                    "csv": "currency"
                  },
                  "type": "string",
                  "enum": [
                    "usd"
                  ]
                }
              },
              "x-go-type": "Plan"
            },
            "description": "The plans of the planpage."
          }
        }
      },
      "Plan": {
        "type": "object",
        "additionalProperties": false,
        "description": "Plan entity schema.",
        "required": [
          "id",
          "name",
          "cadence",
          "unit",
          "price_per_unit",
          "minimum_units",
          "currency"
        ],
        "properties": {
          "id": {
            "x-oapi-codegen-extra-tags": {
              "db": "id",
              "json": "id",
              "csv": "id"
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
            "x-go-type": "PlanName",
            "x-oapi-codegen-extra-tags": {
              "db": "name",
              "json": "name",
              "csv": "name"
            },
            "type": "string",
            "description": "Name of the plan",
            "x-enum-casing-exempt": true,
            "enum": [
              "Free",
              "Team Designer",
              "Team Operator",
              "Enterprise"
            ]
          },
          "cadence": {
            "x-go-type": "PlanCadence",
            "x-oapi-codegen-extra-tags": {
              "db": "cadence",
              "json": "cadence",
              "csv": "cadence"
            },
            "type": "string",
            "enum": [
              "none",
              "monthly",
              "annually"
            ]
          },
          "unit": {
            "x-go-type": "PlanUnit",
            "x-oapi-codegen-extra-tags": {
              "db": "unit",
              "json": "unit",
              "csv": "unit"
            },
            "type": "string",
            "enum": [
              "user",
              "free"
            ]
          },
          "minimum_units": {
            "type": "integer",
            "description": "Minimum number of units required for the plan",
            "x-oapi-codegen-extra-tags": {
              "db": "minimum_units",
              "json": "minimum_units",
              "csv": "minimum_units"
            },
            "minimum": 0
          },
          "price_per_unit": {
            "type": "number",
            "description": "Price per unit of the plan",
            "x-oapi-codegen-extra-tags": {
              "db": "price_per_unit",
              "json": "price_per_unit",
              "csv": "price_per_unit"
            },
            "minimum": 0
          },
          "currency": {
            "x-go-type": "Currency",
            "x-oapi-codegen-extra-tags": {
              "db": "currency",
              "json": "currency",
              "csv": "currency"
            },
            "type": "string",
            "enum": [
              "usd"
            ]
          }
        }
      },
      "PlanName": {
        "type": "string",
        "description": "Name of the plan",
        "x-enum-casing-exempt": true,
        "enum": [
          "Free",
          "Team Designer",
          "Team Operator",
          "Enterprise"
        ]
      },
      "PlanCadence": {
        "type": "string",
        "enum": [
          "none",
          "monthly",
          "annually"
        ]
      },
      "PlanUnit": {
        "type": "string",
        "enum": [
          "user",
          "free"
        ]
      },
      "Currency": {
        "type": "string",
        "enum": [
          "usd"
        ]
      }
    }
  }
};

export default PlanSchema;
