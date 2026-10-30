/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const ProviderCapabilitySchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "ProviderCapability",
    "description": "OpenAPI schema for the remote provider's capabilities document: what the\nprovider supports and where, read by a client right after it\nauthenticates. It is the provider-level manifest (provider identity,\npackage, extensions, advertised features and their endpoints), not the\nmodel capability construct. Besides the features list it carries a\n`contractVersion`, so a client can refuse a provider whose contract major\nit does not speak, and, for an authenticated request that names an\norganization in `X-Current-Orgid`, a `membership` block saying whether the\ncaller is a live member of that organization. An unauthenticated request\nstill receives the document, without `membership`, so a client can tell\n\"not signed in\" from \"signed in but not a member\" from \"old provider\"\n(no `contractVersion`).\n\nA client that names itself with the `client` query parameter also\nreceives `compatibility`: whether its version (the `{version}` path\nparameter) meets the provider's minimum for that client. The document is\nalways answered with 200 for an outdated client, so the client learns\nfrom it that it must update. An authenticated request additionally\nreceives `session`: the caller's roles, the plan and the entitlements of\nthe caller's roles and, when the caller is a live member of the\norganization in `X-Current-Orgid`, that organization's plan, entitlements\nand registered device usage.\n",
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
    },
    {}
  ],
  "tags": [
    {
      "name": "capabilities",
      "description": "Operations related to the provider's capabilities document."
    }
  ],
  "paths": {
    "/{version}/capabilities": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "capabilities"
        ],
        "summary": "Get the provider's capabilities",
        "operationId": "getProviderCapabilities",
        "description": "Returns the capabilities document for a client of the given version.\nAuthentication is optional: with a valid token the document reflects\nthe caller's roles, and with a valid token plus `X-Current-Orgid` it\nalso carries `membership`. An invalid or absent token is not an error;\nthe document is returned without `membership`. A malformed\n`X-Current-Orgid` is a client error and returns 400. With `client`,\nthe document carries `compatibility` for that client at `{version}`;\nan outdated client still receives 200 with `compatible` false. With a\nvalid token the document carries `session`; for a live member of the\n`X-Current-Orgid` organization it includes that organization's plan,\nentitlements and device usage.\n",
        "parameters": [
          {
            "name": "version",
            "in": "path",
            "description": "Version of the requesting client, for example `v0.8.0`.",
            "required": true,
            "schema": {
              "type": "string",
              "maxLength": 64
            }
          },
          {
            "name": "X-Current-Orgid",
            "in": "header",
            "description": "Organization whose membership the caller wants reported.",
            "required": false,
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
          {
            "name": "client",
            "in": "query",
            "description": "Identifier of the requesting client application, for example the product name of a desktop app. When present, the document carries `compatibility` for this client at the `{version}` path parameter.\n",
            "required": false,
            "schema": {
              "type": "string",
              "description": "Identifier of a client application, for example the product name of a desktop app, lowercase. It is a value chosen by the client; the provider keys its minimum client versions by it.\n",
              "minLength": 1,
              "maxLength": 64,
              "pattern": "^[a-z0-9][a-z0-9-]*$"
            }
          },
          {
            "name": "os",
            "in": "query",
            "description": "Operating system of the client, used to select packages.",
            "schema": {
              "type": "string",
              "maxLength": 64
            }
          }
        ],
        "responses": {
          "200": {
            "description": "The capabilities document",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Provider Capability Schema",
                  "description": "The remote provider's capabilities document. Existing fields describe the\nprovider and its extensions; `contractVersion` and `membership` let a\nnative client gate on the provider's contract and on its organization\nmembership after authenticating; `compatibility` tells a client that\nnamed itself whether its version is still accepted, and `session`\ndescribes the authenticated caller's roles, plan and entitlements. New\nfields arrive only with a new `contractVersion` (1.1 added\n`compatibility` and `session`).\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "providerType"
                  ],
                  "properties": {
                    "providerType": {
                      "type": "string",
                      "description": "Provider type, for example `remote`.",
                      "maxLength": 64
                    },
                    "packageVersion": {
                      "type": "string",
                      "description": "Version of the extension package the provider offers this client.",
                      "maxLength": 64
                    },
                    "packageUrl": {
                      "type": "string",
                      "description": "Download URL of that package.",
                      "maxLength": 2048
                    },
                    "providerName": {
                      "type": "string",
                      "description": "Display name of the provider.",
                      "maxLength": 255
                    },
                    "providerDescription": {
                      "type": "array",
                      "description": "Lines describing the provider.",
                      "items": {
                        "type": "string"
                      }
                    },
                    "providerUrl": {
                      "type": "string",
                      "description": "Home page URL of the provider.",
                      "maxLength": 2048
                    },
                    "redirects": {
                      "type": "object",
                      "description": "Redirect targets the provider serves to this client, keyed by name.",
                      "additionalProperties": {
                        "type": "string"
                      }
                    },
                    "contractVersion": {
                      "type": "string",
                      "description": "Version of the provider's REST contract for native clients, as\n`MAJOR.MINOR`. A client refuses a provider whose major differs from the\none it was built against. A provider that predates this field omits\nit, which a client treats as not serving the contract.\n",
                      "pattern": "^[0-9]+\\.[0-9]+$",
                      "maxLength": 32
                    },
                    "membership": {
                      "type": "object",
                      "description": "Whether the authenticated caller is a live member of the organization\nnamed by `X-Current-Orgid`. Present only on an authenticated request\nthat carried that header.\n",
                      "additionalProperties": false,
                      "required": [
                        "organizationId",
                        "bound"
                      ],
                      "properties": {
                        "organizationId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          }
                        },
                        "bound": {
                          "type": "boolean",
                          "description": "True when the caller is a live member of the organization."
                        }
                      }
                    },
                    "compatibility": {
                      "type": "object",
                      "description": "Whether a client application's version meets the provider's minimum for that client. A client whose `compatible` is false must update before it registers or keeps a connection alive; the provider answers those calls with 426. A client the provider has no minimum for is compatible and has no `minimumVersion`.\n",
                      "additionalProperties": false,
                      "required": [
                        "clientName",
                        "clientVersion",
                        "compatible"
                      ],
                      "properties": {
                        "clientName": {
                          "type": "string",
                          "description": "Identifier of a client application, for example the product name of a desktop app, lowercase. It is a value chosen by the client; the provider keys its minimum client versions by it.\n",
                          "minLength": 1,
                          "maxLength": 64,
                          "pattern": "^[a-z0-9][a-z0-9-]*$"
                        },
                        "clientVersion": {
                          "type": "string",
                          "description": "The client's version as it reported it, as `MAJOR.MINOR.PATCH` with an optional leading `v`, for example `v1.25.0`. Versions are ordered by their numeric parts, so `v1.9.0` is older than `v1.25.0`.",
                          "maxLength": 64
                        },
                        "minimumVersion": {
                          "type": "string",
                          "description": "Oldest client version the provider accepts for this client. Absent when the provider sets no minimum.",
                          "maxLength": 64
                        },
                        "compatible": {
                          "type": "boolean",
                          "description": "True when `clientVersion` is at or above `minimumVersion`, or when there is no minimum."
                        },
                        "upgradeUrl": {
                          "type": "string",
                          "description": "Where the client can get an update, when the provider knows one.",
                          "maxLength": 2048
                        }
                      }
                    },
                    "session": {
                      "type": "object",
                      "description": "The authenticated caller's session as the provider sees it: who the caller is, the caller's roles, and, for the organization named by `X-Current-Orgid` when the caller is a live member of it, that organization's roles, plan, entitlements and device usage. Present only on an authenticated request.\n",
                      "additionalProperties": false,
                      "required": [
                        "userId",
                        "providerRoles"
                      ],
                      "properties": {
                        "userId": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          }
                        },
                        "providerRoles": {
                          "type": "array",
                          "description": "The caller's provider-wide role names.",
                          "items": {
                            "type": "string",
                            "maxLength": 255
                          }
                        },
                        "organizationRoles": {
                          "type": "array",
                          "description": "The caller's role names in the organization.",
                          "items": {
                            "type": "string",
                            "maxLength": 255
                          }
                        },
                        "plan": {
                          "description": "The plan of the organization's active subscription, when it has one.",
                          "x-go-type": "planv1beta3.Plan",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/v1beta3/plan",
                            "name": "planv1beta3"
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
                        "entitlements": {
                          "type": "array",
                          "description": "The features the organization's active subscriptions entitle it to.",
                          "items": {
                            "x-go-type": "featurev1beta1.Feature",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/v1beta1/feature",
                              "name": "featurev1beta1"
                            },
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
                                  "SizePerDesign",
                                  "BlowhornProfiles",
                                  "BlowhornBrowserAutomation",
                                  "BlowhornScheduler",
                                  "BlowhornDevicesPerSeat",
                                  "BlowhornPlatformLinkedIn",
                                  "BlowhornPlatformX",
                                  "BlowhornPlatformReddit",
                                  "BlowhornPlatformHackerNews",
                                  "BlowhornPlatformSlack",
                                  "BlowhornPlatformBluesky",
                                  "BlowhornPlatformGitHub",
                                  "BlowhornPlatformBlog"
                                ],
                                "x-enumDescriptions": {
                                  "ComponentsInDesign": "Maximum number of components in a single design; 999999999999 is unlimited.",
                                  "RelationshipsInDesign": "Maximum number of relationships in a single design; 999999999999 is unlimited.",
                                  "DesignsInWorkspace": "Maximum number of designs in a single workspace; 999999999999 is unlimited.",
                                  "WorkspacesInOrganization": "Maximum number of workspaces in an organization; 999999999999 is unlimited.",
                                  "ImageSizeInDesign": "Maximum size, in bytes, of an image embedded in a design; 999999999999 is unlimited.",
                                  "SizePerDesign": "Maximum size of a single design; 999999999999 is unlimited.",
                                  "BlowhornProfiles": "Maximum number of Blowhorn posting profiles the organization may hold; 999999999999 is unlimited.",
                                  "BlowhornBrowserAutomation": "Blowhorn may publish through browser automation; granted when quantity is greater than 0.",
                                  "BlowhornScheduler": "Blowhorn may run scheduled publishes; granted when quantity is greater than 0.",
                                  "BlowhornDevicesPerSeat": "Maximum number of devices one Blowhorn seat may publish from; 999999999999 is unlimited.",
                                  "BlowhornPlatformLinkedIn": "Blowhorn may publish to LinkedIn; granted when quantity is greater than 0.",
                                  "BlowhornPlatformX": "Blowhorn may publish to X; granted when quantity is greater than 0.",
                                  "BlowhornPlatformReddit": "Blowhorn may publish to Reddit; granted when quantity is greater than 0.",
                                  "BlowhornPlatformHackerNews": "Blowhorn may publish to Hacker News; granted when quantity is greater than 0.",
                                  "BlowhornPlatformSlack": "Blowhorn may publish to Slack; granted when quantity is greater than 0.",
                                  "BlowhornPlatformBluesky": "Blowhorn may publish to Bluesky; granted when quantity is greater than 0.",
                                  "BlowhornPlatformGitHub": "Blowhorn may publish to GitHub; granted when quantity is greater than 0.",
                                  "BlowhornPlatformBlog": "Blowhorn may publish to a blog; granted when quantity is greater than 0."
                                }
                              },
                              "quantity": {
                                "type": "number",
                                "format": "double",
                                "description": "Quantity of the feature granted by the plan. For a cap-style feature this is the maximum, and the sentinel value 999999999999 denotes unlimited. For a capability-style feature any value greater than 0 grants the capability.",
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
                        },
                        "deviceUsage": {
                          "type": "object",
                          "description": "Registered devices (live `desktop` connections) in the organization against the organization's device limit. Registrations over the limit are accepted; `overLimit` flags the organization instead.\n",
                          "additionalProperties": false,
                          "required": [
                            "registered",
                            "overLimit"
                          ],
                          "properties": {
                            "registered": {
                              "type": "integer",
                              "minimum": 0,
                              "description": "Live `desktop` connections registered in the organization."
                            },
                            "limit": {
                              "type": "integer",
                              "minimum": 0,
                              "description": "Devices the organization's subscriptions allow. Absent when unlimited or when no subscription sets a device limit."
                            },
                            "overLimit": {
                              "type": "boolean",
                              "description": "True when `limit` is present and `registered` exceeds it."
                            }
                          }
                        }
                      }
                    },
                    "extensions": {
                      "type": "object",
                      "description": "Extension points; shape owned by the provider.",
                      "additionalProperties": true,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "capabilities": {
                      "type": "array",
                      "description": "Features the provider serves and their endpoints. Clients read paths from here instead of hard-coding them. A provider serving desktop connections lists `register-connection`, `connection-heartbeat` and `deregister-desktop-connection`; an endpoint may hold `{connectionId}` or `{installationId}` placeholders.\n",
                      "items": {
                        "type": "object",
                        "description": "One feature the provider serves and the endpoint that serves it.",
                        "additionalProperties": false,
                        "required": [
                          "feature"
                        ],
                        "properties": {
                          "feature": {
                            "type": "string",
                            "description": "Feature name, for example `persist-connection`.",
                            "maxLength": 255
                          },
                          "endpoint": {
                            "type": "string",
                            "description": "Path that serves the feature, relative to the provider's base URL.",
                            "maxLength": 1024
                          }
                        }
                      }
                    },
                    "restrictedAccess": {
                      "type": "object",
                      "description": "Access restrictions applied to this client; shape owned by the provider.",
                      "additionalProperties": true,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true
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
          "429": {
            "description": "Too many requests - the caller exceeded the server's per-user request rate for this route family. Wait the number of seconds in `Retry-After` before retrying.",
            "headers": {
              "Retry-After": {
                "description": "Number of seconds the caller must wait before retrying.",
                "required": true,
                "schema": {
                  "type": "integer",
                  "minimum": 1
                }
              }
            },
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A MeshKit error answered as a JSON body. `error` is the sentence the caller is shown; MeshKit's long description is never serialized. Use the `MeshkitError400`, `MeshkitError403`, `MeshkitError404`, `MeshkitError409`, `MeshkitError429`, `MeshkitError500` and `MeshkitError502` responses for an operation whose server answers its refusals this way.",
                  "required": [
                    "error"
                  ],
                  "additionalProperties": false,
                  "properties": {
                    "error": {
                      "type": "string",
                      "minLength": 1,
                      "description": "The sentence the caller is shown."
                    },
                    "code": {
                      "type": "string",
                      "minLength": 1,
                      "description": "MeshKit error code, a component-scoped identifier allocated by the emitting service (e.g. `<component>-<number>`); it is not a stable part of this contract. Omitted for an error that is not a MeshKit error."
                    },
                    "severity": {
                      "type": "string",
                      "description": "MeshKit severity name. Omitted when MeshKit reports none.",
                      "enum": [
                        "emergency",
                        "alert",
                        "critical",
                        "fatal"
                      ]
                    },
                    "probableCause": {
                      "type": "array",
                      "description": "MeshKit's probable causes of the error.",
                      "items": {
                        "type": "string"
                      }
                    },
                    "suggestedRemediation": {
                      "type": "array",
                      "description": "MeshKit's suggested remediations for the error.",
                      "items": {
                        "type": "string"
                      }
                    }
                  }
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
    "securitySchemes": {
      "jwt": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    },
    "responses": {
      "500": {
        "description": "Internal server error",
        "content": {
          "text/plain": {
            "schema": {
              "type": "string"
            }
          }
        }
      },
      "MeshkitError429": {
        "description": "Too many requests - the caller exceeded the server's per-user request rate for this route family. Wait the number of seconds in `Retry-After` before retrying.",
        "headers": {
          "Retry-After": {
            "description": "Number of seconds the caller must wait before retrying.",
            "required": true,
            "schema": {
              "type": "integer",
              "minimum": 1
            }
          }
        },
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "description": "A MeshKit error answered as a JSON body. `error` is the sentence the caller is shown; MeshKit's long description is never serialized. Use the `MeshkitError400`, `MeshkitError403`, `MeshkitError404`, `MeshkitError409`, `MeshkitError429`, `MeshkitError500` and `MeshkitError502` responses for an operation whose server answers its refusals this way.",
              "required": [
                "error"
              ],
              "additionalProperties": false,
              "properties": {
                "error": {
                  "type": "string",
                  "minLength": 1,
                  "description": "The sentence the caller is shown."
                },
                "code": {
                  "type": "string",
                  "minLength": 1,
                  "description": "MeshKit error code, a component-scoped identifier allocated by the emitting service (e.g. `<component>-<number>`); it is not a stable part of this contract. Omitted for an error that is not a MeshKit error."
                },
                "severity": {
                  "type": "string",
                  "description": "MeshKit severity name. Omitted when MeshKit reports none.",
                  "enum": [
                    "emergency",
                    "alert",
                    "critical",
                    "fatal"
                  ]
                },
                "probableCause": {
                  "type": "array",
                  "description": "MeshKit's probable causes of the error.",
                  "items": {
                    "type": "string"
                  }
                },
                "suggestedRemediation": {
                  "type": "array",
                  "description": "MeshKit's suggested remediations for the error.",
                  "items": {
                    "type": "string"
                  }
                }
              }
            }
          }
        }
      },
      "ClientUpgradeRequired": {
        "description": "The client's version is below the provider's minimum for that client. The client must update before it can register or keep a connection alive; the body names the minimum and where to get an update.\n",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "description": "Body of a 426 answer: a MeshKit error sentence plus the client's compatibility, so the client can show the minimum and where to update.\n",
              "additionalProperties": false,
              "required": [
                "error",
                "compatibility"
              ],
              "properties": {
                "error": {
                  "type": "string",
                  "minLength": 1,
                  "description": "The sentence the caller is shown."
                },
                "code": {
                  "type": "string",
                  "minLength": 1,
                  "description": "MeshKit error code allocated by the emitting service; not a stable part of this contract."
                },
                "compatibility": {
                  "type": "object",
                  "description": "Whether a client application's version meets the provider's minimum for that client. A client whose `compatible` is false must update before it registers or keeps a connection alive; the provider answers those calls with 426. A client the provider has no minimum for is compatible and has no `minimumVersion`.\n",
                  "additionalProperties": false,
                  "required": [
                    "clientName",
                    "clientVersion",
                    "compatible"
                  ],
                  "properties": {
                    "clientName": {
                      "type": "string",
                      "description": "Identifier of a client application, for example the product name of a desktop app, lowercase. It is a value chosen by the client; the provider keys its minimum client versions by it.\n",
                      "minLength": 1,
                      "maxLength": 64,
                      "pattern": "^[a-z0-9][a-z0-9-]*$"
                    },
                    "clientVersion": {
                      "type": "string",
                      "description": "The client's version as it reported it, as `MAJOR.MINOR.PATCH` with an optional leading `v`, for example `v1.25.0`. Versions are ordered by their numeric parts, so `v1.9.0` is older than `v1.25.0`.",
                      "maxLength": 64
                    },
                    "minimumVersion": {
                      "type": "string",
                      "description": "Oldest client version the provider accepts for this client. Absent when the provider sets no minimum.",
                      "maxLength": 64
                    },
                    "compatible": {
                      "type": "boolean",
                      "description": "True when `clientVersion` is at or above `minimumVersion`, or when there is no minimum."
                    },
                    "upgradeUrl": {
                      "type": "string",
                      "description": "Where the client can get an update, when the provider knows one.",
                      "maxLength": 2048
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "parameters": {
      "version": {
        "name": "version",
        "in": "path",
        "description": "Version of the requesting client, for example `v0.8.0`.",
        "required": true,
        "schema": {
          "type": "string",
          "maxLength": 64
        }
      },
      "client": {
        "name": "client",
        "in": "query",
        "description": "Identifier of the requesting client application, for example the product name of a desktop app. When present, the document carries `compatibility` for this client at the `{version}` path parameter.\n",
        "required": false,
        "schema": {
          "type": "string",
          "description": "Identifier of a client application, for example the product name of a desktop app, lowercase. It is a value chosen by the client; the provider keys its minimum client versions by it.\n",
          "minLength": 1,
          "maxLength": 64,
          "pattern": "^[a-z0-9][a-z0-9-]*$"
        }
      },
      "currentOrgId": {
        "name": "X-Current-Orgid",
        "in": "header",
        "description": "Organization whose membership the caller wants reported.",
        "required": false,
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
    },
    "schemas": {
      "ProviderCapability": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Provider Capability Schema",
        "description": "The remote provider's capabilities document. Existing fields describe the\nprovider and its extensions; `contractVersion` and `membership` let a\nnative client gate on the provider's contract and on its organization\nmembership after authenticating; `compatibility` tells a client that\nnamed itself whether its version is still accepted, and `session`\ndescribes the authenticated caller's roles, plan and entitlements. New\nfields arrive only with a new `contractVersion` (1.1 added\n`compatibility` and `session`).\n",
        "type": "object",
        "additionalProperties": false,
        "required": [
          "providerType"
        ],
        "properties": {
          "providerType": {
            "type": "string",
            "description": "Provider type, for example `remote`.",
            "maxLength": 64
          },
          "packageVersion": {
            "type": "string",
            "description": "Version of the extension package the provider offers this client.",
            "maxLength": 64
          },
          "packageUrl": {
            "type": "string",
            "description": "Download URL of that package.",
            "maxLength": 2048
          },
          "providerName": {
            "type": "string",
            "description": "Display name of the provider.",
            "maxLength": 255
          },
          "providerDescription": {
            "type": "array",
            "description": "Lines describing the provider.",
            "items": {
              "type": "string"
            }
          },
          "providerUrl": {
            "type": "string",
            "description": "Home page URL of the provider.",
            "maxLength": 2048
          },
          "redirects": {
            "type": "object",
            "description": "Redirect targets the provider serves to this client, keyed by name.",
            "additionalProperties": {
              "type": "string"
            }
          },
          "contractVersion": {
            "type": "string",
            "description": "Version of the provider's REST contract for native clients, as\n`MAJOR.MINOR`. A client refuses a provider whose major differs from the\none it was built against. A provider that predates this field omits\nit, which a client treats as not serving the contract.\n",
            "pattern": "^[0-9]+\\.[0-9]+$",
            "maxLength": 32
          },
          "membership": {
            "type": "object",
            "description": "Whether the authenticated caller is a live member of the organization\nnamed by `X-Current-Orgid`. Present only on an authenticated request\nthat carried that header.\n",
            "additionalProperties": false,
            "required": [
              "organizationId",
              "bound"
            ],
            "properties": {
              "organizationId": {
                "type": "string",
                "format": "uuid",
                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                }
              },
              "bound": {
                "type": "boolean",
                "description": "True when the caller is a live member of the organization."
              }
            }
          },
          "compatibility": {
            "type": "object",
            "description": "Whether a client application's version meets the provider's minimum for that client. A client whose `compatible` is false must update before it registers or keeps a connection alive; the provider answers those calls with 426. A client the provider has no minimum for is compatible and has no `minimumVersion`.\n",
            "additionalProperties": false,
            "required": [
              "clientName",
              "clientVersion",
              "compatible"
            ],
            "properties": {
              "clientName": {
                "type": "string",
                "description": "Identifier of a client application, for example the product name of a desktop app, lowercase. It is a value chosen by the client; the provider keys its minimum client versions by it.\n",
                "minLength": 1,
                "maxLength": 64,
                "pattern": "^[a-z0-9][a-z0-9-]*$"
              },
              "clientVersion": {
                "type": "string",
                "description": "The client's version as it reported it, as `MAJOR.MINOR.PATCH` with an optional leading `v`, for example `v1.25.0`. Versions are ordered by their numeric parts, so `v1.9.0` is older than `v1.25.0`.",
                "maxLength": 64
              },
              "minimumVersion": {
                "type": "string",
                "description": "Oldest client version the provider accepts for this client. Absent when the provider sets no minimum.",
                "maxLength": 64
              },
              "compatible": {
                "type": "boolean",
                "description": "True when `clientVersion` is at or above `minimumVersion`, or when there is no minimum."
              },
              "upgradeUrl": {
                "type": "string",
                "description": "Where the client can get an update, when the provider knows one.",
                "maxLength": 2048
              }
            }
          },
          "session": {
            "type": "object",
            "description": "The authenticated caller's session as the provider sees it: who the caller is, the caller's roles, and, for the organization named by `X-Current-Orgid` when the caller is a live member of it, that organization's roles, plan, entitlements and device usage. Present only on an authenticated request.\n",
            "additionalProperties": false,
            "required": [
              "userId",
              "providerRoles"
            ],
            "properties": {
              "userId": {
                "type": "string",
                "format": "uuid",
                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                }
              },
              "providerRoles": {
                "type": "array",
                "description": "The caller's provider-wide role names.",
                "items": {
                  "type": "string",
                  "maxLength": 255
                }
              },
              "organizationRoles": {
                "type": "array",
                "description": "The caller's role names in the organization.",
                "items": {
                  "type": "string",
                  "maxLength": 255
                }
              },
              "plan": {
                "description": "The plan of the organization's active subscription, when it has one.",
                "x-go-type": "planv1beta3.Plan",
                "x-go-type-import": {
                  "path": "github.com/meshery/schemas/models/v1beta3/plan",
                  "name": "planv1beta3"
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
              "entitlements": {
                "type": "array",
                "description": "The features the organization's active subscriptions entitle it to.",
                "items": {
                  "x-go-type": "featurev1beta1.Feature",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/v1beta1/feature",
                    "name": "featurev1beta1"
                  },
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
                        "SizePerDesign",
                        "BlowhornProfiles",
                        "BlowhornBrowserAutomation",
                        "BlowhornScheduler",
                        "BlowhornDevicesPerSeat",
                        "BlowhornPlatformLinkedIn",
                        "BlowhornPlatformX",
                        "BlowhornPlatformReddit",
                        "BlowhornPlatformHackerNews",
                        "BlowhornPlatformSlack",
                        "BlowhornPlatformBluesky",
                        "BlowhornPlatformGitHub",
                        "BlowhornPlatformBlog"
                      ],
                      "x-enumDescriptions": {
                        "ComponentsInDesign": "Maximum number of components in a single design; 999999999999 is unlimited.",
                        "RelationshipsInDesign": "Maximum number of relationships in a single design; 999999999999 is unlimited.",
                        "DesignsInWorkspace": "Maximum number of designs in a single workspace; 999999999999 is unlimited.",
                        "WorkspacesInOrganization": "Maximum number of workspaces in an organization; 999999999999 is unlimited.",
                        "ImageSizeInDesign": "Maximum size, in bytes, of an image embedded in a design; 999999999999 is unlimited.",
                        "SizePerDesign": "Maximum size of a single design; 999999999999 is unlimited.",
                        "BlowhornProfiles": "Maximum number of Blowhorn posting profiles the organization may hold; 999999999999 is unlimited.",
                        "BlowhornBrowserAutomation": "Blowhorn may publish through browser automation; granted when quantity is greater than 0.",
                        "BlowhornScheduler": "Blowhorn may run scheduled publishes; granted when quantity is greater than 0.",
                        "BlowhornDevicesPerSeat": "Maximum number of devices one Blowhorn seat may publish from; 999999999999 is unlimited.",
                        "BlowhornPlatformLinkedIn": "Blowhorn may publish to LinkedIn; granted when quantity is greater than 0.",
                        "BlowhornPlatformX": "Blowhorn may publish to X; granted when quantity is greater than 0.",
                        "BlowhornPlatformReddit": "Blowhorn may publish to Reddit; granted when quantity is greater than 0.",
                        "BlowhornPlatformHackerNews": "Blowhorn may publish to Hacker News; granted when quantity is greater than 0.",
                        "BlowhornPlatformSlack": "Blowhorn may publish to Slack; granted when quantity is greater than 0.",
                        "BlowhornPlatformBluesky": "Blowhorn may publish to Bluesky; granted when quantity is greater than 0.",
                        "BlowhornPlatformGitHub": "Blowhorn may publish to GitHub; granted when quantity is greater than 0.",
                        "BlowhornPlatformBlog": "Blowhorn may publish to a blog; granted when quantity is greater than 0."
                      }
                    },
                    "quantity": {
                      "type": "number",
                      "format": "double",
                      "description": "Quantity of the feature granted by the plan. For a cap-style feature this is the maximum, and the sentinel value 999999999999 denotes unlimited. For a capability-style feature any value greater than 0 grants the capability.",
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
              },
              "deviceUsage": {
                "type": "object",
                "description": "Registered devices (live `desktop` connections) in the organization against the organization's device limit. Registrations over the limit are accepted; `overLimit` flags the organization instead.\n",
                "additionalProperties": false,
                "required": [
                  "registered",
                  "overLimit"
                ],
                "properties": {
                  "registered": {
                    "type": "integer",
                    "minimum": 0,
                    "description": "Live `desktop` connections registered in the organization."
                  },
                  "limit": {
                    "type": "integer",
                    "minimum": 0,
                    "description": "Devices the organization's subscriptions allow. Absent when unlimited or when no subscription sets a device limit."
                  },
                  "overLimit": {
                    "type": "boolean",
                    "description": "True when `limit` is present and `registered` exceeds it."
                  }
                }
              }
            }
          },
          "extensions": {
            "type": "object",
            "description": "Extension points; shape owned by the provider.",
            "additionalProperties": true,
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "capabilities": {
            "type": "array",
            "description": "Features the provider serves and their endpoints. Clients read paths from here instead of hard-coding them. A provider serving desktop connections lists `register-connection`, `connection-heartbeat` and `deregister-desktop-connection`; an endpoint may hold `{connectionId}` or `{installationId}` placeholders.\n",
            "items": {
              "type": "object",
              "description": "One feature the provider serves and the endpoint that serves it.",
              "additionalProperties": false,
              "required": [
                "feature"
              ],
              "properties": {
                "feature": {
                  "type": "string",
                  "description": "Feature name, for example `persist-connection`.",
                  "maxLength": 255
                },
                "endpoint": {
                  "type": "string",
                  "description": "Path that serves the feature, relative to the provider's base URL.",
                  "maxLength": 1024
                }
              }
            }
          },
          "restrictedAccess": {
            "type": "object",
            "description": "Access restrictions applied to this client; shape owned by the provider.",
            "additionalProperties": true,
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "ProviderFeature": {
        "type": "object",
        "description": "One feature the provider serves and the endpoint that serves it.",
        "additionalProperties": false,
        "required": [
          "feature"
        ],
        "properties": {
          "feature": {
            "type": "string",
            "description": "Feature name, for example `persist-connection`.",
            "maxLength": 255
          },
          "endpoint": {
            "type": "string",
            "description": "Path that serves the feature, relative to the provider's base URL.",
            "maxLength": 1024
          }
        }
      },
      "ProviderMembership": {
        "type": "object",
        "description": "Whether the authenticated caller is a live member of the organization\nnamed by `X-Current-Orgid`. Present only on an authenticated request\nthat carried that header.\n",
        "additionalProperties": false,
        "required": [
          "organizationId",
          "bound"
        ],
        "properties": {
          "organizationId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "bound": {
            "type": "boolean",
            "description": "True when the caller is a live member of the organization."
          }
        }
      },
      "ClientName": {
        "type": "string",
        "description": "Identifier of a client application, for example the product name of a desktop app, lowercase. It is a value chosen by the client; the provider keys its minimum client versions by it.\n",
        "minLength": 1,
        "maxLength": 64,
        "pattern": "^[a-z0-9][a-z0-9-]*$"
      },
      "ClientCompatibility": {
        "type": "object",
        "description": "Whether a client application's version meets the provider's minimum for that client. A client whose `compatible` is false must update before it registers or keeps a connection alive; the provider answers those calls with 426. A client the provider has no minimum for is compatible and has no `minimumVersion`.\n",
        "additionalProperties": false,
        "required": [
          "clientName",
          "clientVersion",
          "compatible"
        ],
        "properties": {
          "clientName": {
            "type": "string",
            "description": "Identifier of a client application, for example the product name of a desktop app, lowercase. It is a value chosen by the client; the provider keys its minimum client versions by it.\n",
            "minLength": 1,
            "maxLength": 64,
            "pattern": "^[a-z0-9][a-z0-9-]*$"
          },
          "clientVersion": {
            "type": "string",
            "description": "The client's version as it reported it, as `MAJOR.MINOR.PATCH` with an optional leading `v`, for example `v1.25.0`. Versions are ordered by their numeric parts, so `v1.9.0` is older than `v1.25.0`.",
            "maxLength": 64
          },
          "minimumVersion": {
            "type": "string",
            "description": "Oldest client version the provider accepts for this client. Absent when the provider sets no minimum.",
            "maxLength": 64
          },
          "compatible": {
            "type": "boolean",
            "description": "True when `clientVersion` is at or above `minimumVersion`, or when there is no minimum."
          },
          "upgradeUrl": {
            "type": "string",
            "description": "Where the client can get an update, when the provider knows one.",
            "maxLength": 2048
          }
        }
      },
      "ClientUpgradeRequiredError": {
        "type": "object",
        "description": "Body of a 426 answer: a MeshKit error sentence plus the client's compatibility, so the client can show the minimum and where to update.\n",
        "additionalProperties": false,
        "required": [
          "error",
          "compatibility"
        ],
        "properties": {
          "error": {
            "type": "string",
            "minLength": 1,
            "description": "The sentence the caller is shown."
          },
          "code": {
            "type": "string",
            "minLength": 1,
            "description": "MeshKit error code allocated by the emitting service; not a stable part of this contract."
          },
          "compatibility": {
            "type": "object",
            "description": "Whether a client application's version meets the provider's minimum for that client. A client whose `compatible` is false must update before it registers or keeps a connection alive; the provider answers those calls with 426. A client the provider has no minimum for is compatible and has no `minimumVersion`.\n",
            "additionalProperties": false,
            "required": [
              "clientName",
              "clientVersion",
              "compatible"
            ],
            "properties": {
              "clientName": {
                "type": "string",
                "description": "Identifier of a client application, for example the product name of a desktop app, lowercase. It is a value chosen by the client; the provider keys its minimum client versions by it.\n",
                "minLength": 1,
                "maxLength": 64,
                "pattern": "^[a-z0-9][a-z0-9-]*$"
              },
              "clientVersion": {
                "type": "string",
                "description": "The client's version as it reported it, as `MAJOR.MINOR.PATCH` with an optional leading `v`, for example `v1.25.0`. Versions are ordered by their numeric parts, so `v1.9.0` is older than `v1.25.0`.",
                "maxLength": 64
              },
              "minimumVersion": {
                "type": "string",
                "description": "Oldest client version the provider accepts for this client. Absent when the provider sets no minimum.",
                "maxLength": 64
              },
              "compatible": {
                "type": "boolean",
                "description": "True when `clientVersion` is at or above `minimumVersion`, or when there is no minimum."
              },
              "upgradeUrl": {
                "type": "string",
                "description": "Where the client can get an update, when the provider knows one.",
                "maxLength": 2048
              }
            }
          }
        }
      },
      "ProviderDeviceUsage": {
        "type": "object",
        "description": "Registered devices (live `desktop` connections) in the organization against the organization's device limit. Registrations over the limit are accepted; `overLimit` flags the organization instead.\n",
        "additionalProperties": false,
        "required": [
          "registered",
          "overLimit"
        ],
        "properties": {
          "registered": {
            "type": "integer",
            "minimum": 0,
            "description": "Live `desktop` connections registered in the organization."
          },
          "limit": {
            "type": "integer",
            "minimum": 0,
            "description": "Devices the organization's subscriptions allow. Absent when unlimited or when no subscription sets a device limit."
          },
          "overLimit": {
            "type": "boolean",
            "description": "True when `limit` is present and `registered` exceeds it."
          }
        }
      },
      "ProviderSession": {
        "type": "object",
        "description": "The authenticated caller's session as the provider sees it: who the caller is, the caller's roles, and, for the organization named by `X-Current-Orgid` when the caller is a live member of it, that organization's roles, plan, entitlements and device usage. Present only on an authenticated request.\n",
        "additionalProperties": false,
        "required": [
          "userId",
          "providerRoles"
        ],
        "properties": {
          "userId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "providerRoles": {
            "type": "array",
            "description": "The caller's provider-wide role names.",
            "items": {
              "type": "string",
              "maxLength": 255
            }
          },
          "organizationRoles": {
            "type": "array",
            "description": "The caller's role names in the organization.",
            "items": {
              "type": "string",
              "maxLength": 255
            }
          },
          "plan": {
            "description": "The plan of the organization's active subscription, when it has one.",
            "x-go-type": "planv1beta3.Plan",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/v1beta3/plan",
              "name": "planv1beta3"
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
          "entitlements": {
            "type": "array",
            "description": "The features the organization's active subscriptions entitle it to.",
            "items": {
              "x-go-type": "featurev1beta1.Feature",
              "x-go-type-import": {
                "path": "github.com/meshery/schemas/models/v1beta1/feature",
                "name": "featurev1beta1"
              },
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
                    "SizePerDesign",
                    "BlowhornProfiles",
                    "BlowhornBrowserAutomation",
                    "BlowhornScheduler",
                    "BlowhornDevicesPerSeat",
                    "BlowhornPlatformLinkedIn",
                    "BlowhornPlatformX",
                    "BlowhornPlatformReddit",
                    "BlowhornPlatformHackerNews",
                    "BlowhornPlatformSlack",
                    "BlowhornPlatformBluesky",
                    "BlowhornPlatformGitHub",
                    "BlowhornPlatformBlog"
                  ],
                  "x-enumDescriptions": {
                    "ComponentsInDesign": "Maximum number of components in a single design; 999999999999 is unlimited.",
                    "RelationshipsInDesign": "Maximum number of relationships in a single design; 999999999999 is unlimited.",
                    "DesignsInWorkspace": "Maximum number of designs in a single workspace; 999999999999 is unlimited.",
                    "WorkspacesInOrganization": "Maximum number of workspaces in an organization; 999999999999 is unlimited.",
                    "ImageSizeInDesign": "Maximum size, in bytes, of an image embedded in a design; 999999999999 is unlimited.",
                    "SizePerDesign": "Maximum size of a single design; 999999999999 is unlimited.",
                    "BlowhornProfiles": "Maximum number of Blowhorn posting profiles the organization may hold; 999999999999 is unlimited.",
                    "BlowhornBrowserAutomation": "Blowhorn may publish through browser automation; granted when quantity is greater than 0.",
                    "BlowhornScheduler": "Blowhorn may run scheduled publishes; granted when quantity is greater than 0.",
                    "BlowhornDevicesPerSeat": "Maximum number of devices one Blowhorn seat may publish from; 999999999999 is unlimited.",
                    "BlowhornPlatformLinkedIn": "Blowhorn may publish to LinkedIn; granted when quantity is greater than 0.",
                    "BlowhornPlatformX": "Blowhorn may publish to X; granted when quantity is greater than 0.",
                    "BlowhornPlatformReddit": "Blowhorn may publish to Reddit; granted when quantity is greater than 0.",
                    "BlowhornPlatformHackerNews": "Blowhorn may publish to Hacker News; granted when quantity is greater than 0.",
                    "BlowhornPlatformSlack": "Blowhorn may publish to Slack; granted when quantity is greater than 0.",
                    "BlowhornPlatformBluesky": "Blowhorn may publish to Bluesky; granted when quantity is greater than 0.",
                    "BlowhornPlatformGitHub": "Blowhorn may publish to GitHub; granted when quantity is greater than 0.",
                    "BlowhornPlatformBlog": "Blowhorn may publish to a blog; granted when quantity is greater than 0."
                  }
                },
                "quantity": {
                  "type": "number",
                  "format": "double",
                  "description": "Quantity of the feature granted by the plan. For a cap-style feature this is the maximum, and the sentinel value 999999999999 denotes unlimited. For a capability-style feature any value greater than 0 grants the capability.",
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
          },
          "deviceUsage": {
            "type": "object",
            "description": "Registered devices (live `desktop` connections) in the organization against the organization's device limit. Registrations over the limit are accepted; `overLimit` flags the organization instead.\n",
            "additionalProperties": false,
            "required": [
              "registered",
              "overLimit"
            ],
            "properties": {
              "registered": {
                "type": "integer",
                "minimum": 0,
                "description": "Live `desktop` connections registered in the organization."
              },
              "limit": {
                "type": "integer",
                "minimum": 0,
                "description": "Devices the organization's subscriptions allow. Absent when unlimited or when no subscription sets a device limit."
              },
              "overLimit": {
                "type": "boolean",
                "description": "True when `limit` is present and `registered` exceeds it."
              }
            }
          }
        }
      }
    }
  }
};

export default ProviderCapabilitySchema;
