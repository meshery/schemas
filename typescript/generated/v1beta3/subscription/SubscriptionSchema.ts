/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const SubscriptionSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Subscription",
    "description": "API for managing subscriptions using various payment processors in a SaaS application.",
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
          "Subscriptions"
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
              "type": "integer"
            }
          },
          {
            "name": "pagesize",
            "in": "query",
            "description": "Get responses by pagesize",
            "schema": {
              "type": "integer"
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
          },
          {
            "name": "planId",
            "in": "query",
            "description": "Filter subscriptions by plan UUID. Repeat for multiple values.",
            "required": false,
            "schema": {
              "type": "array",
              "items": {
                "type": "string",
                "format": "uuid",
                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                }
              }
            },
            "style": "form",
            "explode": true
          }
        ],
        "responses": {
          "200": {
            "description": "Subscriptions response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated list of subscriptions.",
                  "required": [
                    "page",
                    "pageSize",
                    "totalCount",
                    "subscriptions"
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
                    "subscriptions": {
                      "type": "array",
                      "items": {
                        "x-go-type": "Subscription",
                        "type": "object",
                        "additionalProperties": false,
                        "description": "Subscription entity schema.",
                        "required": [
                          "id",
                          "orgId",
                          "planId",
                          "billingId",
                          "status",
                          "quantity"
                        ],
                        "properties": {
                          "id": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "id",
                              "json": "id"
                            }
                          },
                          "orgId": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-go-name": "OrgID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "org_id",
                              "json": "orgId"
                            }
                          },
                          "planId": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-go-name": "PlanID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "plan_id",
                              "json": "planId"
                            }
                          },
                          "plan": {
                            "description": "Eager-loaded plan associated with this subscription.",
                            "x-go-type": "planv1beta3.Plan",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/v1beta3/plan",
                              "name": "planv1beta3"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "belongs_to": "plans",
                              "fk_id": "PlanID",
                              "json": "plan,omitempty"
                            },
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
                                "type": "string",
                                "format": "uuid",
                                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                },
                                "x-oapi-codegen-extra-tags": {
                                  "db": "id",
                                  "json": "id",
                                  "csv": "id"
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
                          "quantity": {
                            "type": "integer",
                            "description": "Number of units subscribed (eg number of users).",
                            "x-oapi-codegen-extra-tags": {
                              "db": "quantity",
                              "json": "quantity"
                            },
                            "minimum": 0
                          },
                          "startDate": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the subscription period started.",
                            "x-go-type": "time.Time",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "start_date",
                              "json": "startDate"
                            }
                          },
                          "endDate": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the current subscription period ends.",
                            "x-go-type": "time.Time",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "end_date",
                              "json": "endDate"
                            }
                          },
                          "status": {
                            "description": "Current status of the subscription (e.g. active, past_due, canceled).",
                            "x-go-type": "SubscriptionStatus",
                            "x-oapi-codegen-extra-tags": {
                              "db": "status",
                              "json": "status"
                            },
                            "type": "string",
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
                          "createdAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the subscription was created.",
                            "x-go-type": "time.Time",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "json": "createdAt"
                            }
                          },
                          "updatedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the subscription was last updated.",
                            "x-go-type": "time.Time",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "json": "updatedAt"
                            }
                          },
                          "deletedAt": {
                            "description": "Timestamp when the subscription was soft-deleted, if applicable.",
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
                          },
                          "billingId": {
                            "type": "string",
                            "description": "Billing ID of the subscription. The ID of the subscription in the external billing system (for example, Stripe).",
                            "x-id-format": "external",
                            "x-go-name": "BillingID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "billing_id",
                              "json": "billingId"
                            },
                            "maxLength": 500,
                            "pattern": "^[A-Za-z0-9_\\-]+$"
                          }
                        }
                      },
                      "description": "Subscriptions returned on the current page."
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
    "/api/entitlement/subscriptions/{subscriptionId}/cancel": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Subscriptions"
        ],
        "operationId": "cancelSubscription",
        "summary": "Cancel an existing subscription. The subscription will remain active until the end of the billing period and then it will be canceled.",
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
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Subscription cancellation scheduled",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated list of subscriptions.",
                  "required": [
                    "page",
                    "pageSize",
                    "totalCount",
                    "subscriptions"
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
                    "subscriptions": {
                      "type": "array",
                      "items": {
                        "x-go-type": "Subscription",
                        "type": "object",
                        "additionalProperties": false,
                        "description": "Subscription entity schema.",
                        "required": [
                          "id",
                          "orgId",
                          "planId",
                          "billingId",
                          "status",
                          "quantity"
                        ],
                        "properties": {
                          "id": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "id",
                              "json": "id"
                            }
                          },
                          "orgId": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-go-name": "OrgID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "org_id",
                              "json": "orgId"
                            }
                          },
                          "planId": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-go-name": "PlanID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "plan_id",
                              "json": "planId"
                            }
                          },
                          "plan": {
                            "description": "Eager-loaded plan associated with this subscription.",
                            "x-go-type": "planv1beta3.Plan",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/v1beta3/plan",
                              "name": "planv1beta3"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "belongs_to": "plans",
                              "fk_id": "PlanID",
                              "json": "plan,omitempty"
                            },
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
                                "type": "string",
                                "format": "uuid",
                                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                },
                                "x-oapi-codegen-extra-tags": {
                                  "db": "id",
                                  "json": "id",
                                  "csv": "id"
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
                          "quantity": {
                            "type": "integer",
                            "description": "Number of units subscribed (eg number of users).",
                            "x-oapi-codegen-extra-tags": {
                              "db": "quantity",
                              "json": "quantity"
                            },
                            "minimum": 0
                          },
                          "startDate": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the subscription period started.",
                            "x-go-type": "time.Time",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "start_date",
                              "json": "startDate"
                            }
                          },
                          "endDate": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the current subscription period ends.",
                            "x-go-type": "time.Time",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "end_date",
                              "json": "endDate"
                            }
                          },
                          "status": {
                            "description": "Current status of the subscription (e.g. active, past_due, canceled).",
                            "x-go-type": "SubscriptionStatus",
                            "x-oapi-codegen-extra-tags": {
                              "db": "status",
                              "json": "status"
                            },
                            "type": "string",
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
                          "createdAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the subscription was created.",
                            "x-go-type": "time.Time",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "json": "createdAt"
                            }
                          },
                          "updatedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the subscription was last updated.",
                            "x-go-type": "time.Time",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "json": "updatedAt"
                            }
                          },
                          "deletedAt": {
                            "description": "Timestamp when the subscription was soft-deleted, if applicable.",
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
                          },
                          "billingId": {
                            "type": "string",
                            "description": "Billing ID of the subscription. The ID of the subscription in the external billing system (for example, Stripe).",
                            "x-id-format": "external",
                            "x-go-name": "BillingID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "billing_id",
                              "json": "billingId"
                            },
                            "maxLength": 500,
                            "pattern": "^[A-Za-z0-9_\\-]+$"
                          }
                        }
                      },
                      "description": "Subscriptions returned on the current page."
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
                "description": "Payload for creating a new subscription through a payment processor.",
                "properties": {
                  "orgId": {
                    "type": "string",
                    "format": "uuid",
                    "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  },
                  "planId": {
                    "type": "string",
                    "description": "Price ID from the payment processor.",
                    "x-id-format": "external",
                    "maxLength": 500,
                    "pattern": "^[A-Za-z0-9_\\-]+$"
                  },
                  "couponId": {
                    "type": "string",
                    "description": "Coupon ID to apply.",
                    "x-id-format": "external",
                    "maxLength": 500,
                    "pattern": "^[A-Za-z0-9_\\-]+$"
                  },
                  "userCount": {
                    "type": "integer",
                    "description": "Number of users in the organization.",
                    "minimum": 0
                  },
                  "email": {
                    "type": "string",
                    "format": "email",
                    "description": "Email of the customer.",
                    "maxLength": 500
                  },
                  "paymentProcessor": {
                    "description": "Payment processor used to complete the subscription checkout.",
                    "type": "string",
                    "enum": [
                      "stripe",
                      "paypal",
                      "braintree"
                    ]
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "A new subscription has been created",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Response body returned after a subscription is created.",
                  "properties": {
                    "subscriptionId": {
                      "type": "string",
                      "description": "ID of the associated subscription in the payment processor.",
                      "x-id-format": "external",
                      "maxLength": 500,
                      "pattern": "^[A-Za-z0-9_\\-]+$"
                    },
                    "clientSecret": {
                      "type": "string",
                      "description": "Client secret returned by the payment processor for the subscription checkout flow.",
                      "maxLength": 500
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
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for upgrading or downgrading a subscription by changing one of its plans.",
                "properties": {
                  "oldPlanId": {
                    "type": "string",
                    "format": "uuid",
                    "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  },
                  "newPlanId": {
                    "type": "string",
                    "format": "uuid",
                    "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
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
            "description": "Subscription upgraded",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": false,
                  "description": "Subscription entity schema.",
                  "required": [
                    "id",
                    "orgId",
                    "planId",
                    "billingId",
                    "status",
                    "quantity"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "id",
                        "json": "id"
                      }
                    },
                    "orgId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-name": "OrgID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "org_id",
                        "json": "orgId"
                      }
                    },
                    "planId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-name": "PlanID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "plan_id",
                        "json": "planId"
                      }
                    },
                    "plan": {
                      "description": "Eager-loaded plan associated with this subscription.",
                      "x-go-type": "planv1beta3.Plan",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta3/plan",
                        "name": "planv1beta3"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "belongs_to": "plans",
                        "fk_id": "PlanID",
                        "json": "plan,omitempty"
                      },
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
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "id",
                            "json": "id",
                            "csv": "id"
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
                    "quantity": {
                      "type": "integer",
                      "description": "Number of units subscribed (eg number of users).",
                      "x-oapi-codegen-extra-tags": {
                        "db": "quantity",
                        "json": "quantity"
                      },
                      "minimum": 0
                    },
                    "startDate": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the subscription period started.",
                      "x-go-type": "time.Time",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "start_date",
                        "json": "startDate"
                      }
                    },
                    "endDate": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the current subscription period ends.",
                      "x-go-type": "time.Time",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "end_date",
                        "json": "endDate"
                      }
                    },
                    "status": {
                      "description": "Current status of the subscription (e.g. active, past_due, canceled).",
                      "x-go-type": "SubscriptionStatus",
                      "x-oapi-codegen-extra-tags": {
                        "db": "status",
                        "json": "status"
                      },
                      "type": "string",
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
                    "createdAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the subscription was created.",
                      "x-go-type": "time.Time",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "createdAt"
                      }
                    },
                    "updatedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the subscription was last updated.",
                      "x-go-type": "time.Time",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updatedAt"
                      }
                    },
                    "deletedAt": {
                      "description": "Timestamp when the subscription was soft-deleted, if applicable.",
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
                    },
                    "billingId": {
                      "type": "string",
                      "description": "Billing ID of the subscription. The ID of the subscription in the external billing system (for example, Stripe).",
                      "x-id-format": "external",
                      "x-go-name": "BillingID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "billing_id",
                        "json": "billingId"
                      },
                      "maxLength": 500,
                      "pattern": "^[A-Za-z0-9_\\-]+$"
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
    "/api/entitlement/subscriptions/{subscriptionId}/upgrade-preview": {
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
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for upgrading or downgrading a subscription by changing one of its plans.",
                "properties": {
                  "oldPlanId": {
                    "type": "string",
                    "format": "uuid",
                    "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  },
                  "newPlanId": {
                    "type": "string",
                    "format": "uuid",
                    "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
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
                "description": "Payload for webhook events from payment processors."
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
          "type": "string",
          "format": "uuid"
        }
      },
      "page": {
        "name": "page",
        "in": "query",
        "description": "Get responses by page",
        "schema": {
          "type": "integer"
        }
      },
      "pagesize": {
        "name": "pagesize",
        "in": "query",
        "description": "Get responses by pagesize",
        "schema": {
          "type": "integer"
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
        "description": "Payment processor used to charge the subscription.",
        "enum": [
          "stripe",
          "paypal",
          "braintree"
        ]
      },
      "CreateSubscriptionRequest": {
        "type": "object",
        "description": "Payload for creating a new subscription through a payment processor.",
        "properties": {
          "orgId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "planId": {
            "type": "string",
            "description": "Price ID from the payment processor.",
            "x-id-format": "external",
            "maxLength": 500,
            "pattern": "^[A-Za-z0-9_\\-]+$"
          },
          "couponId": {
            "type": "string",
            "description": "Coupon ID to apply.",
            "x-id-format": "external",
            "maxLength": 500,
            "pattern": "^[A-Za-z0-9_\\-]+$"
          },
          "userCount": {
            "type": "integer",
            "description": "Number of users in the organization.",
            "minimum": 0
          },
          "email": {
            "type": "string",
            "format": "email",
            "description": "Email of the customer.",
            "maxLength": 500
          },
          "paymentProcessor": {
            "description": "Payment processor used to complete the subscription checkout.",
            "type": "string",
            "enum": [
              "stripe",
              "paypal",
              "braintree"
            ]
          }
        }
      },
      "UpgradeSubscriptionRequest": {
        "type": "object",
        "description": "Payload for upgrading or downgrading a subscription by changing one of its plans.",
        "properties": {
          "oldPlanId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "newPlanId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          }
        }
      },
      "CreateSubscriptionResponse": {
        "type": "object",
        "description": "Response body returned after a subscription is created.",
        "properties": {
          "subscriptionId": {
            "type": "string",
            "description": "ID of the associated subscription in the payment processor.",
            "x-id-format": "external",
            "maxLength": 500,
            "pattern": "^[A-Za-z0-9_\\-]+$"
          },
          "clientSecret": {
            "type": "string",
            "description": "Client secret returned by the payment processor for the subscription checkout flow.",
            "maxLength": 500
          }
        }
      },
      "UpdateUsersRequest": {
        "type": "object",
        "description": "Payload for synchronizing the current user count with the payment processor.",
        "properties": {
          "paymentProcessor": {
            "description": "Payment processor currently billing the subscription.",
            "type": "string",
            "enum": [
              "stripe",
              "paypal",
              "braintree"
            ]
          }
        }
      },
      "CancelSubscriptionRequest": {
        "type": "object",
        "description": "Payload for cancelling a subscription in an external processor.",
        "properties": {
          "subscriptionId": {
            "type": "string",
            "description": "Subscription ID from the payment processor.",
            "x-id-format": "external",
            "maxLength": 500,
            "pattern": "^[A-Za-z0-9_\\-]+$"
          },
          "paymentProcessor": {
            "description": "Payment processor currently billing the subscription.",
            "type": "string",
            "enum": [
              "stripe",
              "paypal",
              "braintree"
            ]
          }
        }
      },
      "WebhookEvent": {
        "type": "object",
        "description": "Payload for webhook events from payment processors."
      },
      "SubscriptionPage": {
        "type": "object",
        "description": "Paginated list of subscriptions.",
        "required": [
          "page",
          "pageSize",
          "totalCount",
          "subscriptions"
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
          "subscriptions": {
            "type": "array",
            "items": {
              "x-go-type": "Subscription",
              "type": "object",
              "additionalProperties": false,
              "description": "Subscription entity schema.",
              "required": [
                "id",
                "orgId",
                "planId",
                "billingId",
                "status",
                "quantity"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "id",
                    "json": "id"
                  }
                },
                "orgId": {
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-go-name": "OrgID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "org_id",
                    "json": "orgId"
                  }
                },
                "planId": {
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-go-name": "PlanID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "plan_id",
                    "json": "planId"
                  }
                },
                "plan": {
                  "description": "Eager-loaded plan associated with this subscription.",
                  "x-go-type": "planv1beta3.Plan",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/v1beta3/plan",
                    "name": "planv1beta3"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "belongs_to": "plans",
                    "fk_id": "PlanID",
                    "json": "plan,omitempty"
                  },
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
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "id",
                        "json": "id",
                        "csv": "id"
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
                "quantity": {
                  "type": "integer",
                  "description": "Number of units subscribed (eg number of users).",
                  "x-oapi-codegen-extra-tags": {
                    "db": "quantity",
                    "json": "quantity"
                  },
                  "minimum": 0
                },
                "startDate": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Timestamp when the subscription period started.",
                  "x-go-type": "time.Time",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "start_date",
                    "json": "startDate"
                  }
                },
                "endDate": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Timestamp when the current subscription period ends.",
                  "x-go-type": "time.Time",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "end_date",
                    "json": "endDate"
                  }
                },
                "status": {
                  "description": "Current status of the subscription (e.g. active, past_due, canceled).",
                  "x-go-type": "SubscriptionStatus",
                  "x-oapi-codegen-extra-tags": {
                    "db": "status",
                    "json": "status"
                  },
                  "type": "string",
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
                "createdAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Timestamp when the subscription was created.",
                  "x-go-type": "time.Time",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at",
                    "json": "createdAt"
                  }
                },
                "updatedAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Timestamp when the subscription was last updated.",
                  "x-go-type": "time.Time",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at",
                    "json": "updatedAt"
                  }
                },
                "deletedAt": {
                  "description": "Timestamp when the subscription was soft-deleted, if applicable.",
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
                },
                "billingId": {
                  "type": "string",
                  "description": "Billing ID of the subscription. The ID of the subscription in the external billing system (for example, Stripe).",
                  "x-id-format": "external",
                  "x-go-name": "BillingID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "billing_id",
                    "json": "billingId"
                  },
                  "maxLength": 500,
                  "pattern": "^[A-Za-z0-9_\\-]+$"
                }
              }
            },
            "description": "Subscriptions returned on the current page."
          }
        }
      },
      "Subscription": {
        "type": "object",
        "additionalProperties": false,
        "description": "Subscription entity schema.",
        "required": [
          "id",
          "orgId",
          "planId",
          "billingId",
          "status",
          "quantity"
        ],
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "id",
              "json": "id"
            }
          },
          "orgId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-name": "OrgID",
            "x-oapi-codegen-extra-tags": {
              "db": "org_id",
              "json": "orgId"
            }
          },
          "planId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-name": "PlanID",
            "x-oapi-codegen-extra-tags": {
              "db": "plan_id",
              "json": "planId"
            }
          },
          "plan": {
            "description": "Eager-loaded plan associated with this subscription.",
            "x-go-type": "planv1beta3.Plan",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/v1beta3/plan",
              "name": "planv1beta3"
            },
            "x-oapi-codegen-extra-tags": {
              "belongs_to": "plans",
              "fk_id": "PlanID",
              "json": "plan,omitempty"
            },
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
                "type": "string",
                "format": "uuid",
                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                },
                "x-oapi-codegen-extra-tags": {
                  "db": "id",
                  "json": "id",
                  "csv": "id"
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
          "quantity": {
            "type": "integer",
            "description": "Number of units subscribed (eg number of users).",
            "x-oapi-codegen-extra-tags": {
              "db": "quantity",
              "json": "quantity"
            },
            "minimum": 0
          },
          "startDate": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the subscription period started.",
            "x-go-type": "time.Time",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "start_date",
              "json": "startDate"
            }
          },
          "endDate": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the current subscription period ends.",
            "x-go-type": "time.Time",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "end_date",
              "json": "endDate"
            }
          },
          "status": {
            "description": "Current status of the subscription (e.g. active, past_due, canceled).",
            "x-go-type": "SubscriptionStatus",
            "x-oapi-codegen-extra-tags": {
              "db": "status",
              "json": "status"
            },
            "type": "string",
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
          "createdAt": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the subscription was created.",
            "x-go-type": "time.Time",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "created_at",
              "json": "createdAt"
            }
          },
          "updatedAt": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the subscription was last updated.",
            "x-go-type": "time.Time",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at",
              "json": "updatedAt"
            }
          },
          "deletedAt": {
            "description": "Timestamp when the subscription was soft-deleted, if applicable.",
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
          },
          "billingId": {
            "type": "string",
            "description": "Billing ID of the subscription. The ID of the subscription in the external billing system (for example, Stripe).",
            "x-id-format": "external",
            "x-go-name": "BillingID",
            "x-oapi-codegen-extra-tags": {
              "db": "billing_id",
              "json": "billingId"
            },
            "maxLength": 500,
            "pattern": "^[A-Za-z0-9_\\-]+$"
          }
        }
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
