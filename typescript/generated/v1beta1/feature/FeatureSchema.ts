/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const FeatureSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Feature",
    "description": "OpenAPI schema for the Features construct - the quantified entitlements granted by Meshery Cloud subscription plans.",
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
      "name": "Features",
      "description": "Operations related to features and entitlements"
    }
  ],
  "paths": {
    "/api/entitlement/features": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Features"
        ],
        "summary": "Get all features defined across plans",
        "operationId": "getFeatures",
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
            "description": "Features response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "description": "List of features.",
                  "items": {
                    "x-go-type": "Feature",
                    "type": "object",
                    "additionalProperties": false,
                    "description": "A feature is a quantified entitlement granted to an organization through its subscription plan, such as the number of components allowed in a design.",
                    "required": [
                      "id",
                      "plan_id",
                      "name",
                      "quantity",
                      "created_at",
                      "updated_at"
                    ],
                    "properties": {
                      "id": {
                        "description": "Unique identifier for the feature.",
                        "x-go-name": "ID",
                        "x-oapi-codegen-extra-tags": {
                          "db": "id",
                          "csv": "id"
                        },
                        "x-order": 1,
                        "type": "string",
                        "format": "uuid",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        }
                      },
                      "plan_id": {
                        "description": "Identifier of the plan granting this feature.",
                        "x-go-name": "PlanId",
                        "x-oapi-codegen-extra-tags": {
                          "db": "plan_id",
                          "csv": "plan_id"
                        },
                        "x-order": 2,
                        "type": "string",
                        "format": "uuid",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        }
                      },
                      "plan": {
                        "description": "The plan granting this feature. Populated only when the association is explicitly loaded.",
                        "x-go-type": "planv1beta3.Plan",
                        "x-go-type-import": {
                          "path": "github.com/meshery/schemas/models/v1beta3/plan",
                          "name": "planv1beta3"
                        },
                        "x-oapi-codegen-extra-tags": {
                          "belongs_to": "plans",
                          "fk_id": "PlanId",
                          "json": "plan,omitempty"
                        },
                        "x-order": 3,
                        "type": "object",
                        "additionalProperties": false,
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
                      "name": {
                        "description": "Name of the entitled feature.",
                        "x-go-type": "FeatureName",
                        "x-oapi-codegen-extra-tags": {
                          "db": "name",
                          "csv": "name"
                        },
                        "x-order": 4,
                        "type": "string",
                        "x-enum-casing-exempt": true,
                        "enum": [
                          "ComponentsInDesign",
                          "RelationshipsInDesign",
                          "DesignsInWorkspace",
                          "WorkspacesInOrganization",
                          "ImageSizeInDesign",
                          "SizePerDesign"
                        ]
                      },
                      "quantity": {
                        "type": "number",
                        "format": "double",
                        "description": "Quantity of the feature granted by the plan. The sentinel value 999999999999 denotes unlimited.",
                        "minimum": 0,
                        "x-oapi-codegen-extra-tags": {
                          "db": "quantity",
                          "csv": "quantity"
                        },
                        "x-order": 5
                      },
                      "created_at": {
                        "x-order": 6,
                        "description": "Timestamp when the resource was created.",
                        "x-go-type": "time.Time",
                        "type": "string",
                        "format": "date-time",
                        "x-go-name": "CreatedAt",
                        "x-oapi-codegen-extra-tags": {
                          "db": "created_at",
                          "yaml": "created_at"
                        },
                        "x-go-type-skip-optional-pointer": true
                      },
                      "updated_at": {
                        "x-order": 7,
                        "description": "Timestamp when the resource was updated.",
                        "x-go-type": "time.Time",
                        "type": "string",
                        "format": "date-time",
                        "x-go-name": "UpdatedAt",
                        "x-oapi-codegen-extra-tags": {
                          "db": "updated_at",
                          "yaml": "updated_at"
                        },
                        "x-go-type-skip-optional-pointer": true
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
    "/api/entitlement/subscriptions/organizations/{orgId}/features": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Features"
        ],
        "summary": "Get the active features entitled to an organization through its subscriptions",
        "operationId": "getFeaturesByOrganization",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
            "description": "The ID of the organization",
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
          "200": {
            "description": "Features response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "description": "List of features.",
                  "items": {
                    "x-go-type": "Feature",
                    "type": "object",
                    "additionalProperties": false,
                    "description": "A feature is a quantified entitlement granted to an organization through its subscription plan, such as the number of components allowed in a design.",
                    "required": [
                      "id",
                      "plan_id",
                      "name",
                      "quantity",
                      "created_at",
                      "updated_at"
                    ],
                    "properties": {
                      "id": {
                        "description": "Unique identifier for the feature.",
                        "x-go-name": "ID",
                        "x-oapi-codegen-extra-tags": {
                          "db": "id",
                          "csv": "id"
                        },
                        "x-order": 1,
                        "type": "string",
                        "format": "uuid",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        }
                      },
                      "plan_id": {
                        "description": "Identifier of the plan granting this feature.",
                        "x-go-name": "PlanId",
                        "x-oapi-codegen-extra-tags": {
                          "db": "plan_id",
                          "csv": "plan_id"
                        },
                        "x-order": 2,
                        "type": "string",
                        "format": "uuid",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        }
                      },
                      "plan": {
                        "description": "The plan granting this feature. Populated only when the association is explicitly loaded.",
                        "x-go-type": "planv1beta3.Plan",
                        "x-go-type-import": {
                          "path": "github.com/meshery/schemas/models/v1beta3/plan",
                          "name": "planv1beta3"
                        },
                        "x-oapi-codegen-extra-tags": {
                          "belongs_to": "plans",
                          "fk_id": "PlanId",
                          "json": "plan,omitempty"
                        },
                        "x-order": 3,
                        "type": "object",
                        "additionalProperties": false,
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
                      "name": {
                        "description": "Name of the entitled feature.",
                        "x-go-type": "FeatureName",
                        "x-oapi-codegen-extra-tags": {
                          "db": "name",
                          "csv": "name"
                        },
                        "x-order": 4,
                        "type": "string",
                        "x-enum-casing-exempt": true,
                        "enum": [
                          "ComponentsInDesign",
                          "RelationshipsInDesign",
                          "DesignsInWorkspace",
                          "WorkspacesInOrganization",
                          "ImageSizeInDesign",
                          "SizePerDesign"
                        ]
                      },
                      "quantity": {
                        "type": "number",
                        "format": "double",
                        "description": "Quantity of the feature granted by the plan. The sentinel value 999999999999 denotes unlimited.",
                        "minimum": 0,
                        "x-oapi-codegen-extra-tags": {
                          "db": "quantity",
                          "csv": "quantity"
                        },
                        "x-order": 5
                      },
                      "created_at": {
                        "x-order": 6,
                        "description": "Timestamp when the resource was created.",
                        "x-go-type": "time.Time",
                        "type": "string",
                        "format": "date-time",
                        "x-go-name": "CreatedAt",
                        "x-oapi-codegen-extra-tags": {
                          "db": "created_at",
                          "yaml": "created_at"
                        },
                        "x-go-type-skip-optional-pointer": true
                      },
                      "updated_at": {
                        "x-order": 7,
                        "description": "Timestamp when the resource was updated.",
                        "x-go-type": "time.Time",
                        "type": "string",
                        "format": "date-time",
                        "x-go-name": "UpdatedAt",
                        "x-oapi-codegen-extra-tags": {
                          "db": "updated_at",
                          "yaml": "updated_at"
                        },
                        "x-go-type-skip-optional-pointer": true
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
        "description": "The ID of the organization",
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
      "Feature": {
        "type": "object",
        "additionalProperties": false,
        "description": "A feature is a quantified entitlement granted to an organization through its subscription plan, such as the number of components allowed in a design.",
        "required": [
          "id",
          "plan_id",
          "name",
          "quantity",
          "created_at",
          "updated_at"
        ],
        "properties": {
          "id": {
            "description": "Unique identifier for the feature.",
            "x-go-name": "ID",
            "x-oapi-codegen-extra-tags": {
              "db": "id",
              "csv": "id"
            },
            "x-order": 1,
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "plan_id": {
            "description": "Identifier of the plan granting this feature.",
            "x-go-name": "PlanId",
            "x-oapi-codegen-extra-tags": {
              "db": "plan_id",
              "csv": "plan_id"
            },
            "x-order": 2,
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "plan": {
            "description": "The plan granting this feature. Populated only when the association is explicitly loaded.",
            "x-go-type": "planv1beta3.Plan",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/v1beta3/plan",
              "name": "planv1beta3"
            },
            "x-oapi-codegen-extra-tags": {
              "belongs_to": "plans",
              "fk_id": "PlanId",
              "json": "plan,omitempty"
            },
            "x-order": 3,
            "type": "object",
            "additionalProperties": false,
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
          "name": {
            "description": "Name of the entitled feature.",
            "x-go-type": "FeatureName",
            "x-oapi-codegen-extra-tags": {
              "db": "name",
              "csv": "name"
            },
            "x-order": 4,
            "type": "string",
            "x-enum-casing-exempt": true,
            "enum": [
              "ComponentsInDesign",
              "RelationshipsInDesign",
              "DesignsInWorkspace",
              "WorkspacesInOrganization",
              "ImageSizeInDesign",
              "SizePerDesign"
            ]
          },
          "quantity": {
            "type": "number",
            "format": "double",
            "description": "Quantity of the feature granted by the plan. The sentinel value 999999999999 denotes unlimited.",
            "minimum": 0,
            "x-oapi-codegen-extra-tags": {
              "db": "quantity",
              "csv": "quantity"
            },
            "x-order": 5
          },
          "created_at": {
            "x-order": 6,
            "description": "Timestamp when the resource was created.",
            "x-go-type": "time.Time",
            "type": "string",
            "format": "date-time",
            "x-go-name": "CreatedAt",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at",
              "yaml": "created_at"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "updated_at": {
            "x-order": 7,
            "description": "Timestamp when the resource was updated.",
            "x-go-type": "time.Time",
            "type": "string",
            "format": "date-time",
            "x-go-name": "UpdatedAt",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at",
              "yaml": "updated_at"
            },
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "FeatureName": {
        "type": "string",
        "x-enum-casing-exempt": true,
        "enum": [
          "ComponentsInDesign",
          "RelationshipsInDesign",
          "DesignsInWorkspace",
          "WorkspacesInOrganization",
          "ImageSizeInDesign",
          "SizePerDesign"
        ],
        "description": "Enumeration of feature names that can be granted by a plan."
      },
      "FeaturesPage": {
        "type": "array",
        "description": "List of features.",
        "items": {
          "x-go-type": "Feature",
          "type": "object",
          "additionalProperties": false,
          "description": "A feature is a quantified entitlement granted to an organization through its subscription plan, such as the number of components allowed in a design.",
          "required": [
            "id",
            "plan_id",
            "name",
            "quantity",
            "created_at",
            "updated_at"
          ],
          "properties": {
            "id": {
              "description": "Unique identifier for the feature.",
              "x-go-name": "ID",
              "x-oapi-codegen-extra-tags": {
                "db": "id",
                "csv": "id"
              },
              "x-order": 1,
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              }
            },
            "plan_id": {
              "description": "Identifier of the plan granting this feature.",
              "x-go-name": "PlanId",
              "x-oapi-codegen-extra-tags": {
                "db": "plan_id",
                "csv": "plan_id"
              },
              "x-order": 2,
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              }
            },
            "plan": {
              "description": "The plan granting this feature. Populated only when the association is explicitly loaded.",
              "x-go-type": "planv1beta3.Plan",
              "x-go-type-import": {
                "path": "github.com/meshery/schemas/models/v1beta3/plan",
                "name": "planv1beta3"
              },
              "x-oapi-codegen-extra-tags": {
                "belongs_to": "plans",
                "fk_id": "PlanId",
                "json": "plan,omitempty"
              },
              "x-order": 3,
              "type": "object",
              "additionalProperties": false,
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
            "name": {
              "description": "Name of the entitled feature.",
              "x-go-type": "FeatureName",
              "x-oapi-codegen-extra-tags": {
                "db": "name",
                "csv": "name"
              },
              "x-order": 4,
              "type": "string",
              "x-enum-casing-exempt": true,
              "enum": [
                "ComponentsInDesign",
                "RelationshipsInDesign",
                "DesignsInWorkspace",
                "WorkspacesInOrganization",
                "ImageSizeInDesign",
                "SizePerDesign"
              ]
            },
            "quantity": {
              "type": "number",
              "format": "double",
              "description": "Quantity of the feature granted by the plan. The sentinel value 999999999999 denotes unlimited.",
              "minimum": 0,
              "x-oapi-codegen-extra-tags": {
                "db": "quantity",
                "csv": "quantity"
              },
              "x-order": 5
            },
            "created_at": {
              "x-order": 6,
              "description": "Timestamp when the resource was created.",
              "x-go-type": "time.Time",
              "type": "string",
              "format": "date-time",
              "x-go-name": "CreatedAt",
              "x-oapi-codegen-extra-tags": {
                "db": "created_at",
                "yaml": "created_at"
              },
              "x-go-type-skip-optional-pointer": true
            },
            "updated_at": {
              "x-order": 7,
              "description": "Timestamp when the resource was updated.",
              "x-go-type": "time.Time",
              "type": "string",
              "format": "date-time",
              "x-go-name": "UpdatedAt",
              "x-oapi-codegen-extra-tags": {
                "db": "updated_at",
                "yaml": "updated_at"
              },
              "x-go-type-skip-optional-pointer": true
            }
          }
        }
      }
    }
  }
};

export default FeatureSchema;
