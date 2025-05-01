/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const schema = {
  "openapi": "3.0.0",
  "info": {
    "title": "Features Construct Schema",
    "description": "OpenAPI schema for the Features construct with entitlement-related properties",
    "version": "v1beta1"
  },
  "tags": [
    {
      "name": "Features",
      "description": "Operations related to features and entitlements"
    }
  ],
  "paths": {
    "/api/entitlement/features": {
      "get": {
        "operationId": "getFeatures",
        "tags": [
          "Features"
        ],
        "summary": "Get all features associated with plans",
        "responses": {
          "200": {
            "description": "Features fetched successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "x-go-type": "Feature",
                    "type": "object",
                    "required": [
                      "id",
                      "plan_id",
                      "quantity",
                      "feature"
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
                      "name": {
                        "x-go-type": "FeatureName",
                        "x-oapi-codegen-extra-tags": {
                          "db": "name"
                        },
                        "type": "string",
                        "enum": [
                          "ComponentsInDesign",
                          "RelationshipsInDesign",
                          "DesignsInWorkspace",
                          "WorkspacesInOrganization",
                          "ImageSizeInDesign",
                          "SizePerDesign"
                        ],
                        "description": "Enumeration of possible feature types"
                      },
                      "quantity": {
                        "type": "number",
                        "description": "Quantity of the feature allowed, use 9999999999 for unlimited",
                        "x-oapi-codegen-extra-tags": {
                          "db": "quantity"
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
                      }
                    },
                    "additionalProperties": false
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
    "/api/entitlement/subscriptions/organizations/{organizationId}/features": {
      "get": {
        "operationId": "getFeaturesByOrganization",
        "tags": [
          "Features"
        ],
        "summary": "Get all features associated with plans",
        "parameters": [
          {
            "name": "organizationId",
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
        ],
        "responses": {
          "200": {
            "description": "Features fetched successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "x-go-type": "Feature",
                    "type": "object",
                    "required": [
                      "id",
                      "plan_id",
                      "quantity",
                      "feature"
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
                      "name": {
                        "x-go-type": "FeatureName",
                        "x-oapi-codegen-extra-tags": {
                          "db": "name"
                        },
                        "type": "string",
                        "enum": [
                          "ComponentsInDesign",
                          "RelationshipsInDesign",
                          "DesignsInWorkspace",
                          "WorkspacesInOrganization",
                          "ImageSizeInDesign",
                          "SizePerDesign"
                        ],
                        "description": "Enumeration of possible feature types"
                      },
                      "quantity": {
                        "type": "number",
                        "description": "Quantity of the feature allowed, use 9999999999 for unlimited",
                        "x-oapi-codegen-extra-tags": {
                          "db": "quantity"
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
                      }
                    },
                    "additionalProperties": false
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
    "schemas": {
      "FeaturesPage": {
        "type": "array",
        "items": {
          "x-go-type": "Feature",
          "type": "object",
          "required": [
            "id",
            "plan_id",
            "quantity",
            "feature"
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
            "name": {
              "x-go-type": "FeatureName",
              "x-oapi-codegen-extra-tags": {
                "db": "name"
              },
              "type": "string",
              "enum": [
                "ComponentsInDesign",
                "RelationshipsInDesign",
                "DesignsInWorkspace",
                "WorkspacesInOrganization",
                "ImageSizeInDesign",
                "SizePerDesign"
              ],
              "description": "Enumeration of possible feature types"
            },
            "quantity": {
              "type": "number",
              "description": "Quantity of the feature allowed, use 9999999999 for unlimited",
              "x-oapi-codegen-extra-tags": {
                "db": "quantity"
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
            }
          },
          "additionalProperties": false
        }
      },
      "FeatureName": {
        "type": "string",
        "enum": [
          "ComponentsInDesign",
          "RelationshipsInDesign",
          "DesignsInWorkspace",
          "WorkspacesInOrganization",
          "ImageSizeInDesign",
          "SizePerDesign"
        ],
        "description": "Enumeration of possible feature types"
      },
      "Feature": {
        "type": "object",
        "required": [
          "id",
          "plan_id",
          "quantity",
          "feature"
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
          "name": {
            "x-go-type": "FeatureName",
            "x-oapi-codegen-extra-tags": {
              "db": "name"
            },
            "type": "string",
            "enum": [
              "ComponentsInDesign",
              "RelationshipsInDesign",
              "DesignsInWorkspace",
              "WorkspacesInOrganization",
              "ImageSizeInDesign",
              "SizePerDesign"
            ],
            "description": "Enumeration of possible feature types"
          },
          "quantity": {
            "type": "number",
            "description": "Quantity of the feature allowed, use 9999999999 for unlimited",
            "x-oapi-codegen-extra-tags": {
              "db": "quantity"
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
          }
        },
        "additionalProperties": false
      }
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
};

export default schema;
