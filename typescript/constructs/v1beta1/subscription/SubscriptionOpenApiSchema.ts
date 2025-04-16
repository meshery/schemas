/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

export const SubscriptionSchema = {
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
      "org_id": {
        "type": "string",
        "description": "Organization ID"
      },
      "plan_id": {
        "type": "string",
        "description": "Price ID from the payment processor"
      },
      "user_count": {
        "type": "integer",
        "description": "Number of users in the organization"
      },
      "email": {
        "type": "string",
        "format": "email",
        "description": "Email of the customer"
      },
      "payment_processor": {
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
  "CreateSubscriptionResponse": {
    "type": "object",
    "properties": {
      "subscription_id": {
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
      "payment_processor": {
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
      "subscription_id": {
        "type": "string",
        "description": "Subscription ID from the payment processor"
      },
      "payment_processor": {
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
            "ID": {
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
              "x-go-type": "plan.Plan",
              "x-go-type-import": {
                "path": "github.com/meshery/schemas/models/v1beta1/plan"
              },
              "x-oapi-codegen-extra-tags": {
                "belongs_to": "plans",
                "fk_id": "PlanId",
                "yaml": "plan,omitempty",
                "json": "plan,omitempty"
              },
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
            "ID",
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
      "ID": {
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
        "x-go-type": "plan.Plan",
        "x-go-type-import": {
          "path": "github.com/meshery/schemas/models/v1beta1/plan"
        },
        "x-oapi-codegen-extra-tags": {
          "belongs_to": "plans",
          "fk_id": "PlanId",
          "yaml": "plan,omitempty",
          "json": "plan,omitempty"
        },
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
      "ID",
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
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
};
