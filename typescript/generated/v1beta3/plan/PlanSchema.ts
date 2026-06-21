/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const PlanSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Plan",
    "description": "OpenAPI schema for subscription plan management in Meshery Cloud.",
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
                      "pricePerUnit",
                      "minimumUnits",
                      "currency"
                    ],
                    "properties": {
                      "id": {
                        "description": "Unique identifier for the plan.",
                        "x-oapi-codegen-extra-tags": {
                          "db": "id",
                          "json": "id",
                          "csv": "id"
                        },
                        "type": "string",
                        "format": "uuid",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        }
                      },
                      "name": {
                        "description": "Display name of the plan.",
                        "x-go-type": "PlanName",
                        "x-oapi-codegen-extra-tags": {
                          "db": "name",
                          "json": "name",
                          "csv": "name"
                        },
                        "type": "string",
                        "x-enum-casing-exempt": true,
                        "enum": [
                          "Free",
                          "Team Designer",
                          "Team Operator",
                          "Enterprise"
                        ]
                      },
                      "cadence": {
                        "description": "Billing cadence for the plan (monthly, annually, or none).",
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
                        "description": "Unit of consumption this plan charges against (e.g. user).",
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
                      "minimumUnits": {
                        "type": "integer",
                        "description": "Minimum number of units required for the plan.",
                        "x-oapi-codegen-extra-tags": {
                          "db": "minimum_units",
                          "json": "minimumUnits",
                          "csv": "minimum_units"
                        },
                        "minimum": 0
                      },
                      "pricePerUnit": {
                        "type": "number",
                        "description": "Price per unit of the plan.",
                        "x-oapi-codegen-extra-tags": {
                          "db": "price_per_unit",
                          "json": "pricePerUnit",
                          "csv": "price_per_unit"
                        },
                        "minimum": 0
                      },
                      "currency": {
                        "description": "Currency in which the plan is priced.",
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
        "description": "Paginated list of plans supported by the system.",
        "required": [
          "page",
          "pageSize",
          "totalCount",
          "plans"
        ],
        "properties": {
          "page": {
            "type": "integer",
            "description": "Current page number of the result set.",
            "minimum": 0,
            "x-go-type-skip-optional-pointer": true
          },
          "pageSize": {
            "type": "integer",
            "description": "Number of items per page.",
            "minimum": 1,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "pageSize"
            }
          },
          "totalCount": {
            "type": "integer",
            "description": "Total number of items available.",
            "minimum": 0,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "totalCount"
            }
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
                "pricePerUnit",
                "minimumUnits",
                "currency"
              ],
              "properties": {
                "id": {
                  "description": "Unique identifier for the plan.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "id",
                    "json": "id",
                    "csv": "id"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "name": {
                  "description": "Display name of the plan.",
                  "x-go-type": "PlanName",
                  "x-oapi-codegen-extra-tags": {
                    "db": "name",
                    "json": "name",
                    "csv": "name"
                  },
                  "type": "string",
                  "x-enum-casing-exempt": true,
                  "enum": [
                    "Free",
                    "Team Designer",
                    "Team Operator",
                    "Enterprise"
                  ]
                },
                "cadence": {
                  "description": "Billing cadence for the plan (monthly, annually, or none).",
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
                  "description": "Unit of consumption this plan charges against (e.g. user).",
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
                "minimumUnits": {
                  "type": "integer",
                  "description": "Minimum number of units required for the plan.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "minimum_units",
                    "json": "minimumUnits",
                    "csv": "minimum_units"
                  },
                  "minimum": 0
                },
                "pricePerUnit": {
                  "type": "number",
                  "description": "Price per unit of the plan.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "price_per_unit",
                    "json": "pricePerUnit",
                    "csv": "price_per_unit"
                  },
                  "minimum": 0
                },
                "currency": {
                  "description": "Currency in which the plan is priced.",
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
            "description": "Plans returned on the current page."
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
          "pricePerUnit",
          "minimumUnits",
          "currency"
        ],
        "properties": {
          "id": {
            "description": "Unique identifier for the plan.",
            "x-oapi-codegen-extra-tags": {
              "db": "id",
              "json": "id",
              "csv": "id"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "name": {
            "description": "Display name of the plan.",
            "x-go-type": "PlanName",
            "x-oapi-codegen-extra-tags": {
              "db": "name",
              "json": "name",
              "csv": "name"
            },
            "type": "string",
            "x-enum-casing-exempt": true,
            "enum": [
              "Free",
              "Team Designer",
              "Team Operator",
              "Enterprise"
            ]
          },
          "cadence": {
            "description": "Billing cadence for the plan (monthly, annually, or none).",
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
            "description": "Unit of consumption this plan charges against (e.g. user).",
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
          "minimumUnits": {
            "type": "integer",
            "description": "Minimum number of units required for the plan.",
            "x-oapi-codegen-extra-tags": {
              "db": "minimum_units",
              "json": "minimumUnits",
              "csv": "minimum_units"
            },
            "minimum": 0
          },
          "pricePerUnit": {
            "type": "number",
            "description": "Price per unit of the plan.",
            "x-oapi-codegen-extra-tags": {
              "db": "price_per_unit",
              "json": "pricePerUnit",
              "csv": "price_per_unit"
            },
            "minimum": 0
          },
          "currency": {
            "description": "Currency in which the plan is priced.",
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
        "description": "Display name of the subscription plan.",
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
        "description": "Billing cadence of the subscription plan.",
        "enum": [
          "none",
          "monthly",
          "annually"
        ]
      },
      "PlanUnit": {
        "type": "string",
        "description": "Unit of consumption the plan charges against.",
        "enum": [
          "user",
          "free"
        ]
      },
      "Currency": {
        "type": "string",
        "description": "Currency code for the plan pricing.",
        "enum": [
          "usd"
        ]
      }
    }
  }
};

export default PlanSchema;
