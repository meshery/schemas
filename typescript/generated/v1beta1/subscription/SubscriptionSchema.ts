/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const SubscriptionSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Subscription",
    "description": "API for managing subscriptions using various payment processors in a SaaS application.",
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
  "servers": [
    {
      "url": "http://localhost:8080",
      "description": "Local development server"
    }
  ],
  "tags": [
    {
      "name": "Subscriptions",
      "description": "Operations related to subscriptions"
    },
    {
      "name": "Plans",
      "description": "Operations related to plans"
    },
    {
      "name": "Payment Processors",
      "description": "Operations related to payment processors"
    }
  ],
  "paths": {
    "/api/entitlement/subscriptions": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "subscription"
        ],
        "description": "Returns all subscriptions for the organization",
        "operationId": "getSubscriptions",
        "summary": "Read subscriptions",
        "security": [
          {
            "jwt": []
          }
        ],
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
            "name": "order",
            "in": "query",
            "description": "Get ordered responses",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "status",
            "in": "query",
            "description": "Filter subscriptions by status",
            "required": false,
            "schema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "style": "form",
            "explode": true
          }
        ],
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "page",
                    "page_size",
                    "total_count",
                    "subscriptions"
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
                    "subscriptions": {
                      "type": "array",
                      "items": {
                        "x-go-type": "Subscription",
                        "type": "object",
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
                          "org_id": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "org_id"
                            },
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "plan_id": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "plan_id"
                            },
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "plan": {
                            "x-go-type": "planv1beta1.Plan",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/v1beta1/plan",
                              "name": "planv1beta1"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "belongs_to": "plans",
                              "fk_id": "PlanId",
                              "json": "plan,omitempty"
                            },
                            "type": "object",
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
                                "type": "string",
                                "x-go-type": "PlanName",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "name",
                                  "json": "name",
                                  "csv": "name"
                                },
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
                                "x-oapi-codegen-extra-tags": {
                                  "db": "cadence",
                                  "json": "cadence",
                                  "csv": "cadence"
                                },
                                "type": "string",
                                "enum": [
                                  "monthly",
                                  "yearly"
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
                                }
                              },
                              "price_per_unit": {
                                "type": "number",
                                "description": "Price per unit of the plan",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "price_per_unit",
                                  "json": "price_per_unit",
                                  "csv": "price_per_unit"
                                }
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
                            "required": [
                              "id",
                              "name",
                              "cadence",
                              "unit",
                              "price_per_unit",
                              "minimum_units",
                              "currency"
                            ]
                          },
                          "quantity": {
                            "decscription": "number of units subscribed (eg number of users)",
                            "type": "integer",
                            "x-oapi-codegen-extra-tags": {
                              "db": "quantity"
                            }
                          },
                          "start_date": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "start_date"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "end_date": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "end_date"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "status": {
                            "x-go-type": "SubscriptionStatus",
                            "x-oapi-codegen-extra-tags": {
                              "db": "status"
                            },
                            "type": "string",
                            "description": "Possible statuses of a Stripe subscription.",
                            "enum": [
                              "incomplete",
                              "incomplete_expired",
                              "trialing",
                              "active",
                              "past_due",
                              "canceled",
                              "unpaid"
                            ],
                            "x-enumDescriptions": {
                              "incomplete": "The subscription has been created, but the initial payment is pending. It may transition to 'active' or 'incomplete_expired'.",
                              "incomplete_expired": "The subscription was created but never activated due to failed initial payment. It is now expired.",
                              "trialing": "The subscription is currently in a trial period before the first payment is due.",
                              "active": "The subscription is active, and billing is functioning normally.",
                              "past_due": "The latest payment attempt failed, but the subscription remains active. Stripe may retry the charge.",
                              "canceled": "The subscription has been canceled and will no longer generate invoices.",
                              "unpaid": "The subscription is still technically active but has unpaid invoices and is no longer generating new invoices."
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
                          "billing_id": {
                            "type": "string",
                            "description": "Billing ID of the subscription. This is the ID of the subscription in the billing system. eg Stripe",
                            "x-oapi-codegen-extra-tags": {
                              "db": "billing_id"
                            }
                          }
                        },
                        "required": [
                          "id",
                          "org_id",
                          "plan_id",
                          "billing_id",
                          "status",
                          "quantity"
                        ]
                      }
                    }
                  }
                }
              }
            },
            "description": "Get subscription response"
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
    "/api/entitlement/subscriptions/{subscriptionId}/cancel": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Subscriptions"
        ],
        "operationId": "cancelSubscription",
        "summary": "Cancel an existing subscription . The subscription will remain active until the end of the billing period and then it will be canceled.",
        "security": [
          {
            "jwt": []
          }
        ],
        "parameters": [
          {
            "name": "subscriptionId",
            "in": "path",
            "required": true,
            "description": "Subscription ID",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "page",
                    "page_size",
                    "total_count",
                    "subscriptions"
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
                    "subscriptions": {
                      "type": "array",
                      "items": {
                        "x-go-type": "Subscription",
                        "type": "object",
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
                          "org_id": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "org_id"
                            },
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "plan_id": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "plan_id"
                            },
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "plan": {
                            "x-go-type": "planv1beta1.Plan",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/v1beta1/plan",
                              "name": "planv1beta1"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "belongs_to": "plans",
                              "fk_id": "PlanId",
                              "json": "plan,omitempty"
                            },
                            "type": "object",
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
                                "type": "string",
                                "x-go-type": "PlanName",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "name",
                                  "json": "name",
                                  "csv": "name"
                                },
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
                                "x-oapi-codegen-extra-tags": {
                                  "db": "cadence",
                                  "json": "cadence",
                                  "csv": "cadence"
                                },
                                "type": "string",
                                "enum": [
                                  "monthly",
                                  "yearly"
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
                                }
                              },
                              "price_per_unit": {
                                "type": "number",
                                "description": "Price per unit of the plan",
                                "x-oapi-codegen-extra-tags": {
                                  "db": "price_per_unit",
                                  "json": "price_per_unit",
                                  "csv": "price_per_unit"
                                }
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
                            "required": [
                              "id",
                              "name",
                              "cadence",
                              "unit",
                              "price_per_unit",
                              "minimum_units",
                              "currency"
                            ]
                          },
                          "quantity": {
                            "decscription": "number of units subscribed (eg number of users)",
                            "type": "integer",
                            "x-oapi-codegen-extra-tags": {
                              "db": "quantity"
                            }
                          },
                          "start_date": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "start_date"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "end_date": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "end_date"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "status": {
                            "x-go-type": "SubscriptionStatus",
                            "x-oapi-codegen-extra-tags": {
                              "db": "status"
                            },
                            "type": "string",
                            "description": "Possible statuses of a Stripe subscription.",
                            "enum": [
                              "incomplete",
                              "incomplete_expired",
                              "trialing",
                              "active",
                              "past_due",
                              "canceled",
                              "unpaid"
                            ],
                            "x-enumDescriptions": {
                              "incomplete": "The subscription has been created, but the initial payment is pending. It may transition to 'active' or 'incomplete_expired'.",
                              "incomplete_expired": "The subscription was created but never activated due to failed initial payment. It is now expired.",
                              "trialing": "The subscription is currently in a trial period before the first payment is due.",
                              "active": "The subscription is active, and billing is functioning normally.",
                              "past_due": "The latest payment attempt failed, but the subscription remains active. Stripe may retry the charge.",
                              "canceled": "The subscription has been canceled and will no longer generate invoices.",
                              "unpaid": "The subscription is still technically active but has unpaid invoices and is no longer generating new invoices."
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
                          "billing_id": {
                            "type": "string",
                            "description": "Billing ID of the subscription. This is the ID of the subscription in the billing system. eg Stripe",
                            "x-oapi-codegen-extra-tags": {
                              "db": "billing_id"
                            }
                          }
                        },
                        "required": [
                          "id",
                          "org_id",
                          "plan_id",
                          "billing_id",
                          "status",
                          "quantity"
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
    "/api/entitlement/subscriptions/create": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Subscriptions"
        ],
        "operationId": "createSubscription",
        "summary": "Create a new subscription for an organization",
        "security": [
          {
            "jwt": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "orgId": {
                    "type": "string",
                    "description": "Organization ID"
                  },
                  "planId": {
                    "type": "string",
                    "description": "Price ID from the payment processor"
                  },
                  "couponId": {
                    "type": "string",
                    "description": "Coupon ID to apply"
                  },
                  "userCount": {
                    "type": "integer",
                    "description": "Number of users in the organization"
                  },
                  "email": {
                    "type": "string",
                    "format": "email",
                    "description": "Email of the customer"
                  },
                  "paymentProcessor": {
                    "type": "string",
                    "enum": [
                      "stripe",
                      "paypal",
                      "braintree"
                    ],
                    "description": "Supported payment processors"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "A new subscription has been created",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "subscriptionId": {
                      "type": "string"
                    },
                    "clientSecret": {
                      "type": "string"
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
    "/api/entitlement/subscriptions/{subscriptionId}/upgrade": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Subscriptions"
        ],
        "operationId": "upgradeSubscription",
        "summary": "Upgrade or downgrade an existing subscription by changing one of the plans in the subscription",
        "security": [
          {
            "jwt": []
          }
        ],
        "parameters": [
          {
            "name": "subscriptionId",
            "in": "path",
            "required": true,
            "description": "Subscription ID",
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "oldPlanId": {
                    "description": "Old Plan id that is being changed",
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  },
                  "newPlanId": {
                    "description": "New Plan id that is being changed to",
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
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
                    "org_id": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "org_id"
                      },
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "plan_id": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "plan_id"
                      },
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "plan": {
                      "x-go-type": "planv1beta1.Plan",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta1/plan",
                        "name": "planv1beta1"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "belongs_to": "plans",
                        "fk_id": "PlanId",
                        "json": "plan,omitempty"
                      },
                      "type": "object",
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
                          "type": "string",
                          "x-go-type": "PlanName",
                          "x-oapi-codegen-extra-tags": {
                            "db": "name",
                            "json": "name",
                            "csv": "name"
                          },
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
                          "x-oapi-codegen-extra-tags": {
                            "db": "cadence",
                            "json": "cadence",
                            "csv": "cadence"
                          },
                          "type": "string",
                          "enum": [
                            "monthly",
                            "yearly"
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
                          }
                        },
                        "price_per_unit": {
                          "type": "number",
                          "description": "Price per unit of the plan",
                          "x-oapi-codegen-extra-tags": {
                            "db": "price_per_unit",
                            "json": "price_per_unit",
                            "csv": "price_per_unit"
                          }
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
                      "required": [
                        "id",
                        "name",
                        "cadence",
                        "unit",
                        "price_per_unit",
                        "minimum_units",
                        "currency"
                      ]
                    },
                    "quantity": {
                      "decscription": "number of units subscribed (eg number of users)",
                      "type": "integer",
                      "x-oapi-codegen-extra-tags": {
                        "db": "quantity"
                      }
                    },
                    "start_date": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "start_date"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "end_date": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "end_date"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "status": {
                      "x-go-type": "SubscriptionStatus",
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      },
                      "type": "string",
                      "description": "Possible statuses of a Stripe subscription.",
                      "enum": [
                        "incomplete",
                        "incomplete_expired",
                        "trialing",
                        "active",
                        "past_due",
                        "canceled",
                        "unpaid"
                      ],
                      "x-enumDescriptions": {
                        "incomplete": "The subscription has been created, but the initial payment is pending. It may transition to 'active' or 'incomplete_expired'.",
                        "incomplete_expired": "The subscription was created but never activated due to failed initial payment. It is now expired.",
                        "trialing": "The subscription is currently in a trial period before the first payment is due.",
                        "active": "The subscription is active, and billing is functioning normally.",
                        "past_due": "The latest payment attempt failed, but the subscription remains active. Stripe may retry the charge.",
                        "canceled": "The subscription has been canceled and will no longer generate invoices.",
                        "unpaid": "The subscription is still technically active but has unpaid invoices and is no longer generating new invoices."
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
                    "billing_id": {
                      "type": "string",
                      "description": "Billing ID of the subscription. This is the ID of the subscription in the billing system. eg Stripe",
                      "x-oapi-codegen-extra-tags": {
                        "db": "billing_id"
                      }
                    }
                  },
                  "required": [
                    "id",
                    "org_id",
                    "plan_id",
                    "billing_id",
                    "status",
                    "quantity"
                  ]
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
    "/api/entitlement/subscriptions/{subscriptionId}/upgradePreview": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Subscriptions"
        ],
        "operationId": "previewSubscriptionUpgrade",
        "summary": "Preview the invoice for upgrading or downgrading an existing subscription by changing one of the plans in the subscription",
        "security": [
          {
            "jwt": []
          }
        ],
        "parameters": [
          {
            "name": "subscriptionId",
            "in": "path",
            "required": true,
            "description": "Subscription ID",
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "oldPlanId": {
                    "description": "Old Plan id that is being changed",
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  },
                  "newPlanId": {
                    "description": "New Plan id that is being changed to",
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Preview of the upgraded subscription invoice",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object"
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
    "/api/entitlement/subscriptions/webhooks": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Payment Processors"
        ],
        "operationId": "handleSubscriptionWebhook",
        "summary": "Handle webhook events from payment processors",
        "security": [],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for webhook events from payment processors"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Webhook processed"
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
    "securitySchemes": {
      "jwt": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    },
    "parameters": {
      "subscriptionId": {
        "name": "subscriptionId",
        "in": "path",
        "required": true,
        "description": "Subscription ID",
        "schema": {
          "type": "string"
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
      "pagesizeWithAll": {
        "name": "pagesize",
        "in": "query",
        "description": "Get responses by pagesize (pass all to get all responses)",
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
      "PaymentProcessor": {
        "type": "string",
        "enum": [
          "stripe",
          "paypal",
          "braintree"
        ],
        "description": "Supported payment processors"
      },
      "CreateSubscriptionRequest": {
        "type": "object",
        "properties": {
          "orgId": {
            "type": "string",
            "description": "Organization ID"
          },
          "planId": {
            "type": "string",
            "description": "Price ID from the payment processor"
          },
          "couponId": {
            "type": "string",
            "description": "Coupon ID to apply"
          },
          "userCount": {
            "type": "integer",
            "description": "Number of users in the organization"
          },
          "email": {
            "type": "string",
            "format": "email",
            "description": "Email of the customer"
          },
          "paymentProcessor": {
            "type": "string",
            "enum": [
              "stripe",
              "paypal",
              "braintree"
            ],
            "description": "Supported payment processors"
          }
        }
      },
      "UpgradeSubscriptionRequest": {
        "type": "object",
        "properties": {
          "oldPlanId": {
            "description": "Old Plan id that is being changed",
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "newPlanId": {
            "description": "New Plan id that is being changed to",
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          }
        }
      },
      "CreateSubscriptionResponse": {
        "type": "object",
        "properties": {
          "subscriptionId": {
            "type": "string"
          },
          "clientSecret": {
            "type": "string"
          }
        }
      },
      "UpdateUsersRequest": {
        "type": "object",
        "properties": {
          "paymentProcessor": {
            "type": "string",
            "enum": [
              "stripe",
              "paypal",
              "braintree"
            ],
            "description": "Supported payment processors"
          }
        }
      },
      "CancelSubscriptionRequest": {
        "type": "object",
        "properties": {
          "subscriptionId": {
            "type": "string",
            "description": "Subscription ID from the payment processor"
          },
          "paymentProcessor": {
            "type": "string",
            "enum": [
              "stripe",
              "paypal",
              "braintree"
            ],
            "description": "Supported payment processors"
          }
        }
      },
      "WebhookEvent": {
        "type": "object",
        "description": "Payload for webhook events from payment processors"
      },
      "SubscriptionPage": {
        "type": "object",
        "required": [
          "page",
          "page_size",
          "total_count",
          "subscriptions"
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
          "subscriptions": {
            "type": "array",
            "items": {
              "x-go-type": "Subscription",
              "type": "object",
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
                "org_id": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "org_id"
                  },
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "plan_id": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "plan_id"
                  },
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "plan": {
                  "x-go-type": "planv1beta1.Plan",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/v1beta1/plan",
                    "name": "planv1beta1"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "belongs_to": "plans",
                    "fk_id": "PlanId",
                    "json": "plan,omitempty"
                  },
                  "type": "object",
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
                      "type": "string",
                      "x-go-type": "PlanName",
                      "x-oapi-codegen-extra-tags": {
                        "db": "name",
                        "json": "name",
                        "csv": "name"
                      },
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
                      "x-oapi-codegen-extra-tags": {
                        "db": "cadence",
                        "json": "cadence",
                        "csv": "cadence"
                      },
                      "type": "string",
                      "enum": [
                        "monthly",
                        "yearly"
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
                      }
                    },
                    "price_per_unit": {
                      "type": "number",
                      "description": "Price per unit of the plan",
                      "x-oapi-codegen-extra-tags": {
                        "db": "price_per_unit",
                        "json": "price_per_unit",
                        "csv": "price_per_unit"
                      }
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
                  "required": [
                    "id",
                    "name",
                    "cadence",
                    "unit",
                    "price_per_unit",
                    "minimum_units",
                    "currency"
                  ]
                },
                "quantity": {
                  "decscription": "number of units subscribed (eg number of users)",
                  "type": "integer",
                  "x-oapi-codegen-extra-tags": {
                    "db": "quantity"
                  }
                },
                "start_date": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "start_date"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "end_date": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "end_date"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "status": {
                  "x-go-type": "SubscriptionStatus",
                  "x-oapi-codegen-extra-tags": {
                    "db": "status"
                  },
                  "type": "string",
                  "description": "Possible statuses of a Stripe subscription.",
                  "enum": [
                    "incomplete",
                    "incomplete_expired",
                    "trialing",
                    "active",
                    "past_due",
                    "canceled",
                    "unpaid"
                  ],
                  "x-enumDescriptions": {
                    "incomplete": "The subscription has been created, but the initial payment is pending. It may transition to 'active' or 'incomplete_expired'.",
                    "incomplete_expired": "The subscription was created but never activated due to failed initial payment. It is now expired.",
                    "trialing": "The subscription is currently in a trial period before the first payment is due.",
                    "active": "The subscription is active, and billing is functioning normally.",
                    "past_due": "The latest payment attempt failed, but the subscription remains active. Stripe may retry the charge.",
                    "canceled": "The subscription has been canceled and will no longer generate invoices.",
                    "unpaid": "The subscription is still technically active but has unpaid invoices and is no longer generating new invoices."
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
                "billing_id": {
                  "type": "string",
                  "description": "Billing ID of the subscription. This is the ID of the subscription in the billing system. eg Stripe",
                  "x-oapi-codegen-extra-tags": {
                    "db": "billing_id"
                  }
                }
              },
              "required": [
                "id",
                "org_id",
                "plan_id",
                "billing_id",
                "status",
                "quantity"
              ]
            }
          }
        }
      },
      "Subscription": {
        "type": "object",
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
          "org_id": {
            "x-oapi-codegen-extra-tags": {
              "db": "org_id"
            },
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "plan_id": {
            "x-oapi-codegen-extra-tags": {
              "db": "plan_id"
            },
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "plan": {
            "x-go-type": "planv1beta1.Plan",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/v1beta1/plan",
              "name": "planv1beta1"
            },
            "x-oapi-codegen-extra-tags": {
              "belongs_to": "plans",
              "fk_id": "PlanId",
              "json": "plan,omitempty"
            },
            "type": "object",
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
                "type": "string",
                "x-go-type": "PlanName",
                "x-oapi-codegen-extra-tags": {
                  "db": "name",
                  "json": "name",
                  "csv": "name"
                },
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
                "x-oapi-codegen-extra-tags": {
                  "db": "cadence",
                  "json": "cadence",
                  "csv": "cadence"
                },
                "type": "string",
                "enum": [
                  "monthly",
                  "yearly"
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
                }
              },
              "price_per_unit": {
                "type": "number",
                "description": "Price per unit of the plan",
                "x-oapi-codegen-extra-tags": {
                  "db": "price_per_unit",
                  "json": "price_per_unit",
                  "csv": "price_per_unit"
                }
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
            "required": [
              "id",
              "name",
              "cadence",
              "unit",
              "price_per_unit",
              "minimum_units",
              "currency"
            ]
          },
          "quantity": {
            "decscription": "number of units subscribed (eg number of users)",
            "type": "integer",
            "x-oapi-codegen-extra-tags": {
              "db": "quantity"
            }
          },
          "start_date": {
            "x-oapi-codegen-extra-tags": {
              "db": "start_date"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "end_date": {
            "x-oapi-codegen-extra-tags": {
              "db": "end_date"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "status": {
            "x-go-type": "SubscriptionStatus",
            "x-oapi-codegen-extra-tags": {
              "db": "status"
            },
            "type": "string",
            "description": "Possible statuses of a Stripe subscription.",
            "enum": [
              "incomplete",
              "incomplete_expired",
              "trialing",
              "active",
              "past_due",
              "canceled",
              "unpaid"
            ],
            "x-enumDescriptions": {
              "incomplete": "The subscription has been created, but the initial payment is pending. It may transition to 'active' or 'incomplete_expired'.",
              "incomplete_expired": "The subscription was created but never activated due to failed initial payment. It is now expired.",
              "trialing": "The subscription is currently in a trial period before the first payment is due.",
              "active": "The subscription is active, and billing is functioning normally.",
              "past_due": "The latest payment attempt failed, but the subscription remains active. Stripe may retry the charge.",
              "canceled": "The subscription has been canceled and will no longer generate invoices.",
              "unpaid": "The subscription is still technically active but has unpaid invoices and is no longer generating new invoices."
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
          "billing_id": {
            "type": "string",
            "description": "Billing ID of the subscription. This is the ID of the subscription in the billing system. eg Stripe",
            "x-oapi-codegen-extra-tags": {
              "db": "billing_id"
            }
          }
        },
        "required": [
          "id",
          "org_id",
          "plan_id",
          "billing_id",
          "status",
          "quantity"
        ]
      },
      "SubscriptionStatus": {
        "type": "string",
        "description": "Possible statuses of a Stripe subscription.",
        "enum": [
          "incomplete",
          "incomplete_expired",
          "trialing",
          "active",
          "past_due",
          "canceled",
          "unpaid"
        ],
        "x-enumDescriptions": {
          "incomplete": "The subscription has been created, but the initial payment is pending. It may transition to 'active' or 'incomplete_expired'.",
          "incomplete_expired": "The subscription was created but never activated due to failed initial payment. It is now expired.",
          "trialing": "The subscription is currently in a trial period before the first payment is due.",
          "active": "The subscription is active, and billing is functioning normally.",
          "past_due": "The latest payment attempt failed, but the subscription remains active. Stripe may retry the charge.",
          "canceled": "The subscription has been canceled and will no longer generate invoices.",
          "unpaid": "The subscription is still technically active but has unpaid invoices and is no longer generating new invoices."
        }
      }
    }
  }
};

export default SubscriptionSchema;
