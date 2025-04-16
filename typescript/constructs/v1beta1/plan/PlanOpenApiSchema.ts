/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const schema = {
  "openapi": "3.0.0",
  "info": {
    "title": "Plans Api",
    "version": "1.0.0"
  },
  "tags": [
    {
      "name": "Plans",
      "description": "Operations related to plans"
    }
  ],
  "paths": {
    "/api/entitlement/plans": {
      "get": {
        "operationId": "getPlans",
        "tags": [
          "Plans"
        ],
        "summary": "Get all plans supported by the system",
        "responses": {
          "200": {
            "description": "Plans fetched successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "id": {
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
                        "x-go-type": "PlanName",
                        "description": "Name of the plan",
                        "enum": [
                          "Free",
                          "Team Designer",
                          "Team Operator",
                          "Enterprise"
                        ]
                      },
                      "cadence": {
                        "x-go-type": "PlanCadence",
                        "type": "string",
                        "enum": [
                          "monthly",
                          "yearly"
                        ]
                      },
                      "unit": {
                        "x-go-type": "PlanUnit",
                        "type": "string",
                        "enum": [
                          "user",
                          "free"
                        ]
                      },
                      "price_per_unit": {
                        "type": "number",
                        "description": "Price per unit of the plan",
                        "x-oapi-codegen-extra-tags": {
                          "db": "price_per_unit"
                        }
                      },
                      "currency": {
                        "x-go-type": "Currency",
                        "type": "string",
                        "enum": [
                          "usd"
                        ]
                      }
                    },
                    "required": [
                      "id",
                      "name",
                      "cadence",
                      "unit",
                      "price_per_unit",
                      "price_id",
                      "currency"
                    ]
                  }
                }
              }
            }
          },
          "400": {
            "description": "Invalid request"
          },
          "500": {
            "description": "Internal server error"
          }
        }
      }
    }
  },
  "components": {
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
            "type": "integer"
          },
          "page_size": {
            "type": "integer"
          },
          "total_count": {
            "type": "integer"
          },
          "plans": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": {
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
                  "x-go-type": "PlanName",
                  "description": "Name of the plan",
                  "enum": [
                    "Free",
                    "Team Designer",
                    "Team Operator",
                    "Enterprise"
                  ]
                },
                "cadence": {
                  "x-go-type": "PlanCadence",
                  "type": "string",
                  "enum": [
                    "monthly",
                    "yearly"
                  ]
                },
                "unit": {
                  "x-go-type": "PlanUnit",
                  "type": "string",
                  "enum": [
                    "user",
                    "free"
                  ]
                },
                "price_per_unit": {
                  "type": "number",
                  "description": "Price per unit of the plan",
                  "x-oapi-codegen-extra-tags": {
                    "db": "price_per_unit"
                  }
                },
                "currency": {
                  "x-go-type": "Currency",
                  "type": "string",
                  "enum": [
                    "usd"
                  ]
                }
              },
              "required": [
                "id",
                "name",
                "cadence",
                "unit",
                "price_per_unit",
                "price_id",
                "currency"
              ],
              "x-go-type": "Plan"
            }
          }
        }
      },
      "Plan": {
        "type": "object",
        "properties": {
          "id": {
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
            "x-go-type": "PlanName",
            "description": "Name of the plan",
            "enum": [
              "Free",
              "Team Designer",
              "Team Operator",
              "Enterprise"
            ]
          },
          "cadence": {
            "x-go-type": "PlanCadence",
            "type": "string",
            "enum": [
              "monthly",
              "yearly"
            ]
          },
          "unit": {
            "x-go-type": "PlanUnit",
            "type": "string",
            "enum": [
              "user",
              "free"
            ]
          },
          "price_per_unit": {
            "type": "number",
            "description": "Price per unit of the plan",
            "x-oapi-codegen-extra-tags": {
              "db": "price_per_unit"
            }
          },
          "currency": {
            "x-go-type": "Currency",
            "type": "string",
            "enum": [
              "usd"
            ]
          }
        },
        "required": [
          "id",
          "name",
          "cadence",
          "unit",
          "price_per_unit",
          "price_id",
          "currency"
        ]
      },
      "PlanName": {
        "type": "string",
        "description": "Name of the plan",
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
          "monthly",
          "yearly"
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
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
};

export default schema;
