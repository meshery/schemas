/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const UserSchema: Record<string, unknown> = {
  "openapi": "3.0.3",
  "info": {
    "title": "User",
    "description": "OpenAPI schema for user management in Meshery Cloud.",
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
      "name": "users",
      "description": "Operations related to users"
    }
  ],
  "paths": {
    "/api/users": {
      "get": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "users"
        ],
        "operationId": "getUsers",
        "summary": "Get public users",
        "description": "Returns the publicly viewable user directory. Records are reduced to the PublicUser projection (username and avatar); personally identifying fields such as email and real names are never served on this unauthenticated path.",
        "security": [],
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "description": "Get responses by page",
            "schema": {
              "type": "integer",
              "minimum": 0
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "description": "Number of responses to return per page. Canonical camelCase pagination parameter; prefer this over the deprecated all-lowercase `pagesize`.",
            "schema": {
              "type": "integer",
              "minimum": 1
            }
          },
          {
            "name": "search",
            "in": "query",
            "description": "Get responses that match search param value",
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
            "name": "filter",
            "in": "query",
            "description": "Get filtered reponses",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Paginated list of public users",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated list of publicly viewable user records",
                  "required": [
                    "page",
                    "pageSize",
                    "totalCount",
                    "data"
                  ],
                  "properties": {
                    "page": {
                      "type": "integer",
                      "description": "Current page number of the result set.",
                      "minimum": 0
                    },
                    "pageSize": {
                      "type": "integer",
                      "description": "Number of items per page.",
                      "minimum": 1
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of items available.",
                      "minimum": 0
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "additionalProperties": false,
                        "description": "Publicly viewable projection of User served by the unauthenticated public users directory. Deliberately excludes email, real names, and every other personally identifying or account-internal field.",
                        "required": [
                          "id"
                        ],
                        "properties": {
                          "id": {
                            "description": "Unique identifier for the user",
                            "x-go-name": "ID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "id",
                              "json": "id"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "userId": {
                            "deprecated": true,
                            "description": "Deprecated duplicate of id kept for consumers that predate the retirement of the legacy user_id column; always equals id.",
                            "x-go-name": "UserID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "user_id",
                              "json": "userId,omitempty"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "username": {
                            "type": "string",
                            "maxLength": 200,
                            "description": "Public username of the user",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "username",
                              "json": "username,omitempty"
                            }
                          },
                          "avatarUrl": {
                            "type": "string",
                            "format": "uri",
                            "maxLength": 500,
                            "description": "URL to user's avatar image",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "avatar_url",
                              "json": "avatarUrl,omitempty"
                            }
                          }
                        }
                      },
                      "description": "Public user records for the requested page."
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
    "/api/identity/users/search": {
      "get": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "users"
        ],
        "operationId": "searchUsers",
        "summary": "Search users",
        "description": "Searches user accounts by name, username, or email and returns the SearchableUser collaboration projection. Serves authenticated people-picker flows such as sharing a design with other users. A blank search returns an empty page.",
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "description": "Get responses by page",
            "schema": {
              "type": "integer",
              "minimum": 0
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "description": "Number of responses to return per page. Canonical camelCase pagination parameter; prefer this over the deprecated all-lowercase `pagesize`.",
            "schema": {
              "type": "integer",
              "minimum": 1
            }
          },
          {
            "name": "search",
            "in": "query",
            "description": "Get responses that match search param value",
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
            "name": "filter",
            "in": "query",
            "description": "Get filtered reponses",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Paginated list of matching users in the searchable projection",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated list of users in the searchable collaboration projection",
                  "required": [
                    "page",
                    "pageSize",
                    "totalCount",
                    "data"
                  ],
                  "properties": {
                    "page": {
                      "type": "integer",
                      "description": "Current page number of the result set.",
                      "minimum": 0
                    },
                    "pageSize": {
                      "type": "integer",
                      "description": "Number of items per page.",
                      "minimum": 1
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of items available.",
                      "minimum": 0
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "additionalProperties": false,
                        "description": "Minimal collaboration projection of User served by the authenticated user-search endpoints (people-picker flows such as sharing a design). Carries just enough to identify and display a person - name, username, email, avatar - and deliberately excludes roles, organization and team membership, preferences, and login metadata.",
                        "required": [
                          "id"
                        ],
                        "properties": {
                          "id": {
                            "description": "Unique identifier for the user",
                            "x-go-name": "ID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "id",
                              "json": "id"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "userId": {
                            "deprecated": true,
                            "description": "Deprecated duplicate of id kept for consumers that predate the retirement of the legacy user_id column; always equals id.",
                            "x-go-name": "UserID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "user_id",
                              "json": "userId,omitempty"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "username": {
                            "type": "string",
                            "maxLength": 200,
                            "description": "Public username of the user",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "username",
                              "json": "username,omitempty"
                            }
                          },
                          "firstName": {
                            "type": "string",
                            "maxLength": 200,
                            "description": "User's first name",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "first_name",
                              "json": "firstName,omitempty"
                            }
                          },
                          "lastName": {
                            "type": "string",
                            "maxLength": 300,
                            "description": "User's last name",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "last_name",
                              "json": "lastName,omitempty"
                            }
                          },
                          "email": {
                            "type": "string",
                            "format": "email",
                            "maxLength": 300,
                            "description": "User's email address",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "email",
                              "json": "email,omitempty"
                            }
                          },
                          "avatarUrl": {
                            "type": "string",
                            "format": "uri",
                            "maxLength": 500,
                            "description": "URL to user's avatar image",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "avatar_url",
                              "json": "avatarUrl,omitempty"
                            }
                          },
                          "deletedAt": {
                            "description": "Timestamp when the user record was soft-deleted (null if not deleted)",
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "json": "deletedAt,omitempty"
                            },
                            "x-go-type": "meshcore.NullTime",
                            "x-go-type-import": {
                              "name": "meshcore",
                              "path": "github.com/meshery/schemas/models/core"
                            },
                            "type": "string",
                            "format": "date-time",
                            "nullable": true,
                            "x-go-type-skip-optional-pointer": true
                          }
                        }
                      },
                      "description": "Matching user records for the requested page."
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
    "/api/identity/orgs/{orgId}/users/search": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "users"
        ],
        "operationId": "searchUsersInOrg",
        "summary": "Search users within an organization scope",
        "description": "Searches user accounts on behalf of an organization context and returns the SearchableUser collaboration projection. A blank search returns an empty page.",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
            "required": true,
            "description": "Organization ID",
            "x-go-name": "OrgID",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "name": "page",
            "in": "query",
            "description": "Get responses by page",
            "schema": {
              "type": "integer",
              "minimum": 0
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "description": "Number of responses to return per page. Canonical camelCase pagination parameter; prefer this over the deprecated all-lowercase `pagesize`.",
            "schema": {
              "type": "integer",
              "minimum": 1
            }
          },
          {
            "name": "search",
            "in": "query",
            "description": "Get responses that match search param value",
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
            "name": "filter",
            "in": "query",
            "description": "Get filtered reponses",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Paginated list of matching users in the searchable projection",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated list of users in the searchable collaboration projection",
                  "required": [
                    "page",
                    "pageSize",
                    "totalCount",
                    "data"
                  ],
                  "properties": {
                    "page": {
                      "type": "integer",
                      "description": "Current page number of the result set.",
                      "minimum": 0
                    },
                    "pageSize": {
                      "type": "integer",
                      "description": "Number of items per page.",
                      "minimum": 1
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of items available.",
                      "minimum": 0
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "additionalProperties": false,
                        "description": "Minimal collaboration projection of User served by the authenticated user-search endpoints (people-picker flows such as sharing a design). Carries just enough to identify and display a person - name, username, email, avatar - and deliberately excludes roles, organization and team membership, preferences, and login metadata.",
                        "required": [
                          "id"
                        ],
                        "properties": {
                          "id": {
                            "description": "Unique identifier for the user",
                            "x-go-name": "ID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "id",
                              "json": "id"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "userId": {
                            "deprecated": true,
                            "description": "Deprecated duplicate of id kept for consumers that predate the retirement of the legacy user_id column; always equals id.",
                            "x-go-name": "UserID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "user_id",
                              "json": "userId,omitempty"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "username": {
                            "type": "string",
                            "maxLength": 200,
                            "description": "Public username of the user",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "username",
                              "json": "username,omitempty"
                            }
                          },
                          "firstName": {
                            "type": "string",
                            "maxLength": 200,
                            "description": "User's first name",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "first_name",
                              "json": "firstName,omitempty"
                            }
                          },
                          "lastName": {
                            "type": "string",
                            "maxLength": 300,
                            "description": "User's last name",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "last_name",
                              "json": "lastName,omitempty"
                            }
                          },
                          "email": {
                            "type": "string",
                            "format": "email",
                            "maxLength": 300,
                            "description": "User's email address",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "email",
                              "json": "email,omitempty"
                            }
                          },
                          "avatarUrl": {
                            "type": "string",
                            "format": "uri",
                            "maxLength": 500,
                            "description": "URL to user's avatar image",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "avatar_url",
                              "json": "avatarUrl,omitempty"
                            }
                          },
                          "deletedAt": {
                            "description": "Timestamp when the user record was soft-deleted (null if not deleted)",
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "json": "deletedAt,omitempty"
                            },
                            "x-go-type": "meshcore.NullTime",
                            "x-go-type-import": {
                              "name": "meshcore",
                              "path": "github.com/meshery/schemas/models/core"
                            },
                            "type": "string",
                            "format": "date-time",
                            "nullable": true,
                            "x-go-type-skip-optional-pointer": true
                          }
                        }
                      },
                      "description": "Matching user records for the requested page."
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
    "/api/identity/users/preferences": {
      "put": {
        "x-internal": [
          "cloud"
        ],
        "x-supersedes": "v1beta2",
        "tags": [
          "users"
        ],
        "operationId": "updateUserPreferences",
        "summary": "Update the current user's preferences",
        "description": "Merges the payload onto the signed-in user's stored preferences. A key the payload names replaces the stored value; a key it leaves out keeps the stored value. Setting selectedOrganizationId switches the organization the user's session has selected, as Meshery Cloud's and Meshery's organization switchers do. Badges are server-owned and are never changed through this operation. Only the signed-in session can set agentsActWithoutApproval: a token-authenticated request that names it, with any value including null, or that changes a remoteProviderPreferences.<provider>.agentsActWithoutApproval entry, is answered 403 and no part of the payload is applied.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "The v1beta3 request body of updateUserPreferences (PUT /api/identity/users/preferences), and the client-settable fields of Preference. Every field is optional: the server merges the ones present onto the stored preferences and keeps the rest. Setting selectedOrganizationId switches the organization the user's session has selected. Badges are server-owned and are never changed through this body. updatedAt is server-recorded and is not settable. See docs/agent-approval-preference.md for who may write agentsActWithoutApproval.",
                "additionalProperties": false,
                "properties": {
                  "meshAdapters": {
                    "type": "array",
                    "items": {
                      "x-go-type": "Adapter",
                      "type": "object",
                      "description": "Placeholder for Adapter struct definition."
                    },
                    "description": "The mesh adapters of the preference."
                  },
                  "grafana": {
                    "x-go-type": "Grafana",
                    "type": "object",
                    "properties": {
                      "grafanaUrl": {
                        "type": "string",
                        "description": "Grafana URL for the user configuration.",
                        "maxLength": 500
                      },
                      "grafanaApiKey": {
                        "type": "string",
                        "description": "Grafana API key for the user configuration.",
                        "maxLength": 500
                      },
                      "selectedBoardsConfigs": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "board": {
                              "type": "object",
                              "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
                            },
                            "panels": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
                              },
                              "description": "Panels selected for the Grafana board configuration."
                            },
                            "templateVars": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              },
                              "description": "Template variables applied to the selected Grafana board configuration."
                            }
                          }
                        },
                        "description": "Selected Grafana board configurations for the user."
                      }
                    }
                  },
                  "prometheus": {
                    "x-go-type": "Prometheus",
                    "type": "object",
                    "properties": {
                      "prometheusUrl": {
                        "type": "string",
                        "description": "The prometheus URL of the prometheus.",
                        "maxLength": 500
                      },
                      "selectedPrometheusBoardsConfigs": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "board": {
                              "type": "object",
                              "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
                            },
                            "panels": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
                              },
                              "description": "Panels selected for the Grafana board configuration."
                            },
                            "templateVars": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              },
                              "description": "Template variables applied to the selected Grafana board configuration."
                            }
                          }
                        },
                        "description": "The selected prometheus boards configs of the prometheus."
                      }
                    }
                  },
                  "loadTestPrefs": {
                    "x-go-type": "LoadTestPreferences",
                    "type": "object",
                    "properties": {
                      "c": {
                        "type": "integer",
                        "description": "Concurrent requests",
                        "minimum": 0
                      },
                      "qps": {
                        "type": "integer",
                        "description": "Queries per second",
                        "minimum": 0
                      },
                      "t": {
                        "type": "string",
                        "description": "Duration",
                        "maxLength": 500
                      },
                      "gen": {
                        "type": "string",
                        "description": "Load generator",
                        "maxLength": 500
                      }
                    }
                  },
                  "anonymousUsageStats": {
                    "type": "boolean",
                    "description": "The anonymous usage stats of the preference."
                  },
                  "anonymousPerfResults": {
                    "type": "boolean",
                    "description": "The anonymous perf results of the preference."
                  },
                  "dashboardPreferences": {
                    "type": "object",
                    "additionalProperties": true,
                    "description": "The dashboard preferences of the preference."
                  },
                  "selectedOrganizationId": {
                    "type": "string",
                    "description": "ID of the organization to make the session's selected organization.",
                    "maxLength": 500,
                    "format": "uuid"
                  },
                  "selectedWorkspaceForOrganizations": {
                    "type": "object",
                    "additionalProperties": {
                      "type": "string"
                    },
                    "description": "The selected workspace for organizations of the preference."
                  },
                  "usersExtensionPreferences": {
                    "type": "object",
                    "additionalProperties": true,
                    "description": "The users extension preferences of the preference."
                  },
                  "remoteProviderPreferences": {
                    "type": "object",
                    "additionalProperties": true,
                    "description": "The remote provider preferences of the preference. Writers set the typed agentsActWithoutApproval field, not a provider's free-form agentsActWithoutApproval entry. A token-authenticated request that would change the stored state of a provider's agentsActWithoutApproval entry (a different value, adding it where absent, or removing it where present) is answered 403, and no part of the payload is applied. Writing back the stored entry unchanged is accepted. Once the typed field has been written, the entry is never read again (see Preference.agentsActWithoutApproval)."
                  },
                  "agentsActWithoutApproval": {
                    "type": "boolean",
                    "nullable": true,
                    "description": "Interim rule (temporary): until the upstream platform, workspace and profile policies exist, inherit (including absent) resolves to required, and this field is stored but not consulted by approval resolution (see Preference.agentsActWithoutApproval; the hierarchy proposal is https://github.com/layer5io/meshery-cloud/issues/6365). Target model, once the hierarchy places the profile level: one profile-level source for agent writes, consulted only for an AI-app activity whose approvalPolicy is inherit or absent, and only when no higher-level setting (hierarchy defined in https://github.com/layer5io/meshery-cloud/issues/6365) has decided (see Preference.agentsActWithoutApproval): true means not_required, false means required, and absent sets nothing. Three states on write: true or false stores that value; null clears the stored value back to absent (inherit); omitted keeps the stored value. No schema default is declared. An API token, of any kind, cannot set this field: a token-authenticated request whose payload names this field, with any value including null and whatever the stored state is, is answered 403 and no part of the payload is applied. Only a request authenticated by the signed-in session can set it. A token client doing read-modify-write must omit this field: echoing the value it read, or null, answers 403 for the whole payload. See docs/agent-approval-preference.md.",
                    "x-go-type": "nullable.Nullable[bool]",
                    "x-go-type-import": {
                      "path": "github.com/oapi-codegen/nullable"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "agentsActWithoutApproval,omitempty"
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Preferences updated"
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
          "403": {
            "description": "Forbidden",
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
    "securitySchemes": {
      "jwt": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    },
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
      "403": {
        "description": "Forbidden",
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
        "required": true,
        "description": "Organization ID",
        "x-go-name": "OrgID",
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
          "type": "integer",
          "minimum": 0
        }
      },
      "pageSize": {
        "name": "pageSize",
        "in": "query",
        "description": "Number of responses to return per page. Canonical camelCase pagination parameter; prefer this over the deprecated all-lowercase `pagesize`.",
        "schema": {
          "type": "integer",
          "minimum": 1
        }
      },
      "search": {
        "name": "search",
        "in": "query",
        "description": "Get responses that match search param value",
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
      },
      "filter": {
        "name": "filter",
        "in": "query",
        "description": "Get filtered reponses",
        "schema": {
          "type": "string"
        }
      }
    },
    "schemas": {
      "User": {
        "type": "object",
        "description": "Represents a user",
        "required": [
          "id",
          "provider",
          "email",
          "firstName",
          "lastName",
          "status",
          "createdAt",
          "updatedAt",
          "lastLoginTime",
          "deletedAt"
        ],
        "properties": {
          "id": {
            "description": "Unique identifier for the user",
            "x-go-name": "ID",
            "x-oapi-codegen-extra-tags": {
              "db": "id",
              "json": "id"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "provider": {
            "type": "string",
            "maxLength": 100,
            "description": "Authentication provider (e.g., Google, Github)",
            "example": [
              "local",
              "github",
              "google",
              "twitter"
            ],
            "x-oapi-codegen-extra-tags": {
              "db": "provider",
              "json": "provider"
            }
          },
          "email": {
            "type": "string",
            "format": "email",
            "maxLength": 300,
            "description": "User's email address",
            "x-oapi-codegen-extra-tags": {
              "db": "email",
              "json": "email"
            }
          },
          "firstName": {
            "type": "string",
            "maxLength": 200,
            "description": "User's first name",
            "x-oapi-codegen-extra-tags": {
              "db": "first_name",
              "json": "firstName"
            }
          },
          "lastName": {
            "type": "string",
            "maxLength": 300,
            "description": "User's last name",
            "x-oapi-codegen-extra-tags": {
              "db": "last_name",
              "json": "lastName"
            }
          },
          "avatarUrl": {
            "type": "string",
            "format": "uri",
            "maxLength": 500,
            "description": "URL to user's avatar image",
            "x-oapi-codegen-extra-tags": {
              "db": "avatar_url",
              "json": "avatarUrl"
            }
          },
          "status": {
            "type": "string",
            "maxLength": 100,
            "enum": [
              "active",
              "inactive",
              "pending",
              "anonymous"
            ],
            "description": "User account status",
            "x-oapi-codegen-extra-tags": {
              "db": "status",
              "json": "status"
            }
          },
          "bio": {
            "type": "string",
            "maxLength": 1000,
            "default": "",
            "description": "User's biography or description",
            "x-oapi-codegen-extra-tags": {
              "db": "bio",
              "json": "bio"
            }
          },
          "country": {
            "type": "object",
            "description": "User's country information stored as JSONB",
            "additionalProperties": true,
            "x-go-type": "core.Map",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "country",
              "json": "country"
            }
          },
          "region": {
            "type": "object",
            "description": "User's region information stored as JSONB",
            "additionalProperties": true,
            "x-go-type": "core.Map",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "region",
              "json": "region"
            }
          },
          "preferences": {
            "x-go-type": "Preference",
            "description": "User preferences stored as JSONB",
            "x-oapi-codegen-extra-tags": {
              "db": "preferences",
              "json": "preferences"
            },
            "x-generate-db-helpers": true,
            "type": "object",
            "required": [
              "anonymousUsageStats",
              "anonymousPerfResults",
              "updatedAt",
              "dashboardPreferences",
              "selectedOrganizationId",
              "selectedWorkspaceForOrganizations",
              "usersExtensionPreferences",
              "remoteProviderPreferences"
            ],
            "properties": {
              "meshAdapters": {
                "type": "array",
                "items": {
                  "x-go-type": "Adapter",
                  "type": "object",
                  "description": "Placeholder for Adapter struct definition."
                },
                "description": "The mesh adapters of the preference."
              },
              "grafana": {
                "x-go-type": "Grafana",
                "type": "object",
                "properties": {
                  "grafanaUrl": {
                    "type": "string",
                    "description": "Grafana URL for the user configuration.",
                    "maxLength": 500
                  },
                  "grafanaApiKey": {
                    "type": "string",
                    "description": "Grafana API key for the user configuration.",
                    "maxLength": 500
                  },
                  "selectedBoardsConfigs": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "board": {
                          "type": "object",
                          "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
                        },
                        "panels": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
                          },
                          "description": "Panels selected for the Grafana board configuration."
                        },
                        "templateVars": {
                          "type": "array",
                          "items": {
                            "type": "string"
                          },
                          "description": "Template variables applied to the selected Grafana board configuration."
                        }
                      }
                    },
                    "description": "Selected Grafana board configurations for the user."
                  }
                }
              },
              "prometheus": {
                "x-go-type": "Prometheus",
                "type": "object",
                "properties": {
                  "prometheusUrl": {
                    "type": "string",
                    "description": "The prometheus URL of the prometheus.",
                    "maxLength": 500
                  },
                  "selectedPrometheusBoardsConfigs": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "board": {
                          "type": "object",
                          "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
                        },
                        "panels": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
                          },
                          "description": "Panels selected for the Grafana board configuration."
                        },
                        "templateVars": {
                          "type": "array",
                          "items": {
                            "type": "string"
                          },
                          "description": "Template variables applied to the selected Grafana board configuration."
                        }
                      }
                    },
                    "description": "The selected prometheus boards configs of the prometheus."
                  }
                }
              },
              "loadTestPrefs": {
                "x-go-type": "LoadTestPreferences",
                "type": "object",
                "properties": {
                  "c": {
                    "type": "integer",
                    "description": "Concurrent requests",
                    "minimum": 0
                  },
                  "qps": {
                    "type": "integer",
                    "description": "Queries per second",
                    "minimum": 0
                  },
                  "t": {
                    "type": "string",
                    "description": "Duration",
                    "maxLength": 500
                  },
                  "gen": {
                    "type": "string",
                    "description": "Load generator",
                    "maxLength": 500
                  }
                }
              },
              "anonymousUsageStats": {
                "type": "boolean",
                "description": "The anonymous usage stats of the preference."
              },
              "anonymousPerfResults": {
                "type": "boolean",
                "description": "The anonymous perf results of the preference."
              },
              "updatedAt": {
                "type": "string",
                "format": "date-time",
                "description": "Timestamp of when the resource was last updated."
              },
              "dashboardPreferences": {
                "type": "object",
                "additionalProperties": true,
                "description": "The dashboard preferences of the preference."
              },
              "selectedOrganizationId": {
                "type": "string",
                "description": "ID of the associated selectedOrganization.",
                "maxLength": 500,
                "format": "uuid"
              },
              "selectedWorkspaceForOrganizations": {
                "type": "object",
                "additionalProperties": {
                  "type": "string"
                },
                "description": "The selected workspace for organizations of the preference."
              },
              "usersExtensionPreferences": {
                "type": "object",
                "additionalProperties": true,
                "description": "The users extension preferences of the preference."
              },
              "remoteProviderPreferences": {
                "type": "object",
                "additionalProperties": true,
                "description": "The remote provider preferences of the preference. Free-form, keyed by provider. A provider's `agentsActWithoutApproval` entry is deprecated in favor of the typed `agentsActWithoutApproval` field, and it is never read once the typed field has been written (see Preference.agentsActWithoutApproval). A token-authenticated request that would change the stored state of that entry (a different value, adding it where absent, or removing it where present) is answered 403, as for the typed field. Writing back the stored entry unchanged is accepted. See docs/agent-approval-preference.md (Migration from the free-form value)."
              },
              "agentsActWithoutApproval": {
                "type": "boolean",
                "description": "Interim rule (temporary): until the upstream platform, workspace and profile policies exist, inherit (including absent) resolves to required. During the interim this field is stored and writable but is not consulted by approval resolution; it becomes the profile-level source once the hierarchy places that level (the hierarchy proposal is https://github.com/layer5io/meshery-cloud/issues/6365, and the interim does not wait on it). Target model, once the hierarchy places the profile level: one profile-level source in the approval hierarchy (platform, workspace, profile; hierarchy defined in https://github.com/layer5io/meshery-cloud/issues/6365). Each activity carries an approvalPolicy (required, not_required or inherit; no schema default, and absent behaves like inherit). An explicit required or not_required on the activity always wins and never consults this field. This field is consulted only for an activity whose approvalPolicy is inherit or absent, only when it was written by an AI app, and only if no level that the hierarchy places ahead of the profile has already decided. For such an activity: true means not_required, false means required, and absent sets nothing. If nothing sets a value, approval is required (fail closed; this fallback is open for confirmation in https://github.com/layer5io/meshery-cloud/issues/6365). AI apps never set approved; approvalPolicy only says whether approval is needed. No schema default is declared, so absence stays distinguishable from false. Typed replacement for the free-form remoteProviderPreferences.<provider>.agentsActWithoutApproval. The server keeps a write-once marker per preference, which is not part of this schema: the first accepted write that names this field (true, false, or null) sets the marker, and nothing clears it. Only a write from the signed-in session can set the marker; a token-authenticated write that names this field never sets it. Once the marker is set, the free-form value is never read again, and null means inherit, not the free-form value. While the marker is unset, the free-form value is not shown as the preference and never changes approval resolution: during the interim inherit resolves to required whatever it says, as the migration section of docs/agent-approval-preference.md describes. On read, absent means not set (inherit); the stored value is never null. An API token, of any kind, cannot change this field: a token-authenticated request that names it, with any value including null, is answered 403. Only a request authenticated by the signed-in session can set it. See PreferencePayload.agentsActWithoutApproval and docs/agent-approval-preference.md."
              }
            }
          },
          "acceptedTermsAt": {
            "description": "Timestamp when user accepted terms and conditions",
            "x-oapi-codegen-extra-tags": {
              "db": "accepted_terms_at",
              "json": "acceptedTermsAt"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "firstLoginTime": {
            "description": "Timestamp of user's first login",
            "x-oapi-codegen-extra-tags": {
              "db": "first_login_time",
              "json": "firstLoginTime"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "lastLoginTime": {
            "description": "Timestamp of user's most recent login",
            "x-oapi-codegen-extra-tags": {
              "db": "last_login_time",
              "json": "lastLoginTime"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "createdAt": {
            "description": "Timestamp when the user record was created",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at",
              "json": "createdAt"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp when the user record was last updated",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at",
              "json": "updatedAt"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "socials": {
            "type": "array",
            "description": "Various online profiles associated with the user account",
            "x-go-type": "UserSocials",
            "items": {
              "x-go-type": "Social",
              "description": "Various online profiles associated with the user account, like GitHub, LinkedIn, X, and so on.",
              "type": "object",
              "properties": {
                "site": {
                  "type": "string",
                  "maxLength": 50,
                  "description": "The site of the social."
                },
                "link": {
                  "type": "string",
                  "format": "uri",
                  "description": "The link of the social."
                }
              },
              "required": [
                "site",
                "link"
              ]
            },
            "x-oapi-codegen-extra-tags": {
              "db": "socials",
              "json": "socials"
            }
          },
          "deletedAt": {
            "type": "string",
            "format": "date-time",
            "nullable": true,
            "description": "Timestamp when the user record was soft-deleted (null if not deleted)",
            "x-go-type": "core.NullTime",
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at",
              "json": "deletedAt"
            }
          },
          "roleNames": {
            "type": "array",
            "x-go-type": "pq.StringArray",
            "x-go-type-import": {
              "path": "github.com/lib/pq"
            },
            "x-go-type-skip-optional-pointer": true,
            "items": {
              "type": "string"
            },
            "description": "Names of the global roles assigned to the user. Free-form, user-generated values sourced from the roles table (role_name is a varchar, not a fixed enumeration); the seeded system roles such as \"admin\", \"organization admin\" and \"user\" are a subset, not the whole set.",
            "example": [
              "organization admin",
              "user"
            ],
            "x-oapi-codegen-extra-tags": {
              "db": "role_names",
              "json": "roleNames"
            }
          },
          "teams": {
            "type": "object",
            "description": "Teams the user belongs to with role information",
            "x-oapi-codegen-extra-tags": {
              "db": "teams",
              "json": "teams"
            },
            "properties": {
              "teamsWithRoles": {
                "type": "array",
                "nullable": true,
                "description": "Team memberships for the user with their assigned roles. null means the team memberships were not measured: the read failed, so the list is unknown. An empty array is only ever a measured absence of memberships.",
                "items": {
                  "type": "object",
                  "additionalProperties": false,
                  "description": "A team the user is a member of, together with the names of the roles assigned to that user within the team. Returned as an item of User.teams.teamsWithRoles. The role names are dynamic, user-generated values (no fixed enumeration).",
                  "required": [
                    "id",
                    "name",
                    "roleNames"
                  ],
                  "properties": {
                    "id": {
                      "description": "Unique identifier of the team.",
                      "x-go-name": "ID",
                      "x-order": 1,
                      "x-oapi-codegen-extra-tags": {
                        "db": "id",
                        "json": "id,omitempty"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "name": {
                      "type": "string",
                      "description": "Name of the team.",
                      "x-order": 2,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name",
                        "json": "name,omitempty"
                      }
                    },
                    "description": {
                      "type": "string",
                      "description": "Human readable description of the team.",
                      "x-order": 3,
                      "x-oapi-codegen-extra-tags": {
                        "db": "description",
                        "json": "description,omitempty"
                      }
                    },
                    "owner": {
                      "description": "Identifier of the team owner.",
                      "x-order": 4,
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner",
                        "json": "owner,omitempty"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "metadata": {
                      "type": "object",
                      "additionalProperties": true,
                      "description": "Free-form metadata associated with the team.",
                      "x-go-type": "core.Map",
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 5,
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata",
                        "json": "metadata,omitempty"
                      }
                    },
                    "createdAt": {
                      "description": "Timestamp when the team was created.",
                      "x-order": 6,
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "createdAt,omitempty"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp when the team was last updated.",
                      "x-order": 7,
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updatedAt,omitempty"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "nullable": true,
                      "description": "Timestamp when the team was soft-deleted (null if not deleted).",
                      "x-go-type": "core.NullTime",
                      "x-order": 8,
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deletedAt,omitempty"
                      }
                    },
                    "roleNames": {
                      "type": "array",
                      "x-go-type": "pq.StringArray",
                      "x-go-type-import": {
                        "path": "github.com/lib/pq"
                      },
                      "description": "Names of the roles assigned to the user within this team. Free-form, user-generated role names; not a fixed enumeration.",
                      "items": {
                        "type": "string"
                      },
                      "x-order": 9,
                      "x-oapi-codegen-extra-tags": {
                        "db": "role_names",
                        "json": "roleNames"
                      }
                    }
                  }
                },
                "x-oapi-codegen-extra-tags": {
                  "db": "teams_with_roles",
                  "json": "teamsWithRoles"
                }
              },
              "totalCount": {
                "type": "integer",
                "nullable": true,
                "description": "Total number of team memberships for the user. null means the count was not measured: the membership read failed, so the value is unknown and must be presented as unknown, never as 0. A number, including 0, is always a measured value.",
                "minimum": 0,
                "x-oapi-codegen-extra-tags": {
                  "db": "total_count",
                  "json": "totalCount"
                }
              }
            }
          },
          "organizations": {
            "type": "object",
            "description": "Organizations the user belongs to with role information",
            "x-oapi-codegen-extra-tags": {
              "db": "organizations",
              "json": "organizations"
            },
            "properties": {
              "organizationsWithRoles": {
                "type": "array",
                "nullable": true,
                "description": "Organization memberships for the user with their assigned roles. null means the organization memberships were not measured: the read failed, so the list is unknown. An empty array is only ever a measured absence of memberships.",
                "items": {
                  "type": "object",
                  "additionalProperties": false,
                  "description": "An organization the user is a member of, together with the names of the roles assigned to that user within the organization. Returned as an item of User.organizations.organizationsWithRoles. The role names are dynamic, user-generated values (no fixed enumeration).",
                  "required": [
                    "id",
                    "name",
                    "roleNames"
                  ],
                  "properties": {
                    "id": {
                      "description": "Unique identifier of the organization.",
                      "x-go-name": "ID",
                      "x-order": 1,
                      "x-oapi-codegen-extra-tags": {
                        "db": "id",
                        "json": "id,omitempty"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "name": {
                      "type": "string",
                      "description": "Name of the organization.",
                      "x-order": 2,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name",
                        "json": "name,omitempty"
                      }
                    },
                    "description": {
                      "type": "string",
                      "description": "Human readable description of the organization.",
                      "x-order": 3,
                      "x-oapi-codegen-extra-tags": {
                        "db": "description",
                        "json": "description,omitempty"
                      }
                    },
                    "country": {
                      "type": "string",
                      "description": "Country associated with the organization.",
                      "x-order": 4,
                      "x-oapi-codegen-extra-tags": {
                        "db": "country",
                        "json": "country,omitempty"
                      }
                    },
                    "region": {
                      "type": "string",
                      "description": "Region associated with the organization.",
                      "x-order": 5,
                      "x-oapi-codegen-extra-tags": {
                        "db": "region",
                        "json": "region,omitempty"
                      }
                    },
                    "owner": {
                      "description": "Identifier of the organization owner.",
                      "x-order": 6,
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner",
                        "json": "owner,omitempty"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "createdAt": {
                      "description": "Timestamp when the organization was created.",
                      "x-order": 7,
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "createdAt,omitempty"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp when the organization was last updated.",
                      "x-order": 8,
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updatedAt,omitempty"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "nullable": true,
                      "description": "Timestamp when the organization was soft-deleted (null if not deleted).",
                      "x-go-type": "core.NullTime",
                      "x-order": 9,
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deletedAt,omitempty"
                      }
                    },
                    "roleNames": {
                      "type": "array",
                      "x-go-type": "pq.StringArray",
                      "x-go-type-import": {
                        "path": "github.com/lib/pq"
                      },
                      "description": "Names of the roles assigned to the user within this organization. Free-form, user-generated role names; not a fixed enumeration.",
                      "items": {
                        "type": "string"
                      },
                      "x-order": 10,
                      "x-oapi-codegen-extra-tags": {
                        "db": "role_names",
                        "json": "roleNames"
                      }
                    }
                  }
                },
                "x-oapi-codegen-extra-tags": {
                  "db": "organizations_with_roles",
                  "json": "organizationsWithRoles"
                }
              },
              "totalCount": {
                "type": "integer",
                "nullable": true,
                "description": "Total number of organization memberships for the user. null means the count was not measured: the membership read failed, so the value is unknown and must be presented as unknown, never as 0. A number, including 0, is always a measured value.",
                "minimum": 0,
                "x-oapi-codegen-extra-tags": {
                  "db": "total_count",
                  "json": "totalCount"
                }
              }
            }
          }
        },
        "additionalProperties": false
      },
      "PublicUser": {
        "type": "object",
        "additionalProperties": false,
        "description": "Publicly viewable projection of User served by the unauthenticated public users directory. Deliberately excludes email, real names, and every other personally identifying or account-internal field.",
        "required": [
          "id"
        ],
        "properties": {
          "id": {
            "description": "Unique identifier for the user",
            "x-go-name": "ID",
            "x-oapi-codegen-extra-tags": {
              "db": "id",
              "json": "id"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "userId": {
            "deprecated": true,
            "description": "Deprecated duplicate of id kept for consumers that predate the retirement of the legacy user_id column; always equals id.",
            "x-go-name": "UserID",
            "x-oapi-codegen-extra-tags": {
              "db": "user_id",
              "json": "userId,omitempty"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "username": {
            "type": "string",
            "maxLength": 200,
            "description": "Public username of the user",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "username",
              "json": "username,omitempty"
            }
          },
          "avatarUrl": {
            "type": "string",
            "format": "uri",
            "maxLength": 500,
            "description": "URL to user's avatar image",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "avatar_url",
              "json": "avatarUrl,omitempty"
            }
          }
        }
      },
      "PublicUsersPage": {
        "type": "object",
        "description": "Paginated list of publicly viewable user records",
        "required": [
          "page",
          "pageSize",
          "totalCount",
          "data"
        ],
        "properties": {
          "page": {
            "type": "integer",
            "description": "Current page number of the result set.",
            "minimum": 0
          },
          "pageSize": {
            "type": "integer",
            "description": "Number of items per page.",
            "minimum": 1
          },
          "totalCount": {
            "type": "integer",
            "description": "Total number of items available.",
            "minimum": 0
          },
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "additionalProperties": false,
              "description": "Publicly viewable projection of User served by the unauthenticated public users directory. Deliberately excludes email, real names, and every other personally identifying or account-internal field.",
              "required": [
                "id"
              ],
              "properties": {
                "id": {
                  "description": "Unique identifier for the user",
                  "x-go-name": "ID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "id",
                    "json": "id"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "userId": {
                  "deprecated": true,
                  "description": "Deprecated duplicate of id kept for consumers that predate the retirement of the legacy user_id column; always equals id.",
                  "x-go-name": "UserID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "user_id",
                    "json": "userId,omitempty"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "username": {
                  "type": "string",
                  "maxLength": 200,
                  "description": "Public username of the user",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "username",
                    "json": "username,omitempty"
                  }
                },
                "avatarUrl": {
                  "type": "string",
                  "format": "uri",
                  "maxLength": 500,
                  "description": "URL to user's avatar image",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "avatar_url",
                    "json": "avatarUrl,omitempty"
                  }
                }
              }
            },
            "description": "Public user records for the requested page."
          }
        }
      },
      "SearchableUser": {
        "type": "object",
        "additionalProperties": false,
        "description": "Minimal collaboration projection of User served by the authenticated user-search endpoints (people-picker flows such as sharing a design). Carries just enough to identify and display a person - name, username, email, avatar - and deliberately excludes roles, organization and team membership, preferences, and login metadata.",
        "required": [
          "id"
        ],
        "properties": {
          "id": {
            "description": "Unique identifier for the user",
            "x-go-name": "ID",
            "x-oapi-codegen-extra-tags": {
              "db": "id",
              "json": "id"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "userId": {
            "deprecated": true,
            "description": "Deprecated duplicate of id kept for consumers that predate the retirement of the legacy user_id column; always equals id.",
            "x-go-name": "UserID",
            "x-oapi-codegen-extra-tags": {
              "db": "user_id",
              "json": "userId,omitempty"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "username": {
            "type": "string",
            "maxLength": 200,
            "description": "Public username of the user",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "username",
              "json": "username,omitempty"
            }
          },
          "firstName": {
            "type": "string",
            "maxLength": 200,
            "description": "User's first name",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "first_name",
              "json": "firstName,omitempty"
            }
          },
          "lastName": {
            "type": "string",
            "maxLength": 300,
            "description": "User's last name",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "last_name",
              "json": "lastName,omitempty"
            }
          },
          "email": {
            "type": "string",
            "format": "email",
            "maxLength": 300,
            "description": "User's email address",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "email",
              "json": "email,omitempty"
            }
          },
          "avatarUrl": {
            "type": "string",
            "format": "uri",
            "maxLength": 500,
            "description": "URL to user's avatar image",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "avatar_url",
              "json": "avatarUrl,omitempty"
            }
          },
          "deletedAt": {
            "description": "Timestamp when the user record was soft-deleted (null if not deleted)",
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at",
              "json": "deletedAt,omitempty"
            },
            "x-go-type": "meshcore.NullTime",
            "x-go-type-import": {
              "name": "meshcore",
              "path": "github.com/meshery/schemas/models/core"
            },
            "type": "string",
            "format": "date-time",
            "nullable": true,
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "SearchableUsersPage": {
        "type": "object",
        "description": "Paginated list of users in the searchable collaboration projection",
        "required": [
          "page",
          "pageSize",
          "totalCount",
          "data"
        ],
        "properties": {
          "page": {
            "type": "integer",
            "description": "Current page number of the result set.",
            "minimum": 0
          },
          "pageSize": {
            "type": "integer",
            "description": "Number of items per page.",
            "minimum": 1
          },
          "totalCount": {
            "type": "integer",
            "description": "Total number of items available.",
            "minimum": 0
          },
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "additionalProperties": false,
              "description": "Minimal collaboration projection of User served by the authenticated user-search endpoints (people-picker flows such as sharing a design). Carries just enough to identify and display a person - name, username, email, avatar - and deliberately excludes roles, organization and team membership, preferences, and login metadata.",
              "required": [
                "id"
              ],
              "properties": {
                "id": {
                  "description": "Unique identifier for the user",
                  "x-go-name": "ID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "id",
                    "json": "id"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "userId": {
                  "deprecated": true,
                  "description": "Deprecated duplicate of id kept for consumers that predate the retirement of the legacy user_id column; always equals id.",
                  "x-go-name": "UserID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "user_id",
                    "json": "userId,omitempty"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "username": {
                  "type": "string",
                  "maxLength": 200,
                  "description": "Public username of the user",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "username",
                    "json": "username,omitempty"
                  }
                },
                "firstName": {
                  "type": "string",
                  "maxLength": 200,
                  "description": "User's first name",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "first_name",
                    "json": "firstName,omitempty"
                  }
                },
                "lastName": {
                  "type": "string",
                  "maxLength": 300,
                  "description": "User's last name",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "last_name",
                    "json": "lastName,omitempty"
                  }
                },
                "email": {
                  "type": "string",
                  "format": "email",
                  "maxLength": 300,
                  "description": "User's email address",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "email",
                    "json": "email,omitempty"
                  }
                },
                "avatarUrl": {
                  "type": "string",
                  "format": "uri",
                  "maxLength": 500,
                  "description": "URL to user's avatar image",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "avatar_url",
                    "json": "avatarUrl,omitempty"
                  }
                },
                "deletedAt": {
                  "description": "Timestamp when the user record was soft-deleted (null if not deleted)",
                  "x-oapi-codegen-extra-tags": {
                    "db": "deleted_at",
                    "json": "deletedAt,omitempty"
                  },
                  "x-go-type": "meshcore.NullTime",
                  "x-go-type-import": {
                    "name": "meshcore",
                    "path": "github.com/meshery/schemas/models/core"
                  },
                  "type": "string",
                  "format": "date-time",
                  "nullable": true,
                  "x-go-type-skip-optional-pointer": true
                }
              }
            },
            "description": "Matching user records for the requested page."
          }
        }
      },
      "UserEmailAddress": {
        "type": "object",
        "additionalProperties": false,
        "description": "One email address associated with a user account. A user has exactly one primary address (mirrored in users.email) and any number of secondary addresses accumulated from account consolidation or explicit addition. Uniqueness across live addresses is enforced case-insensitively.",
        "required": [
          "id",
          "userId",
          "email",
          "verified",
          "isPrimary",
          "source",
          "createdAt",
          "updatedAt"
        ],
        "properties": {
          "id": {
            "description": "Unique identifier for this email-address record",
            "x-go-name": "ID",
            "x-oapi-codegen-extra-tags": {
              "db": "id",
              "json": "id"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "userId": {
            "description": "The user (users.id) this address belongs to",
            "x-go-name": "UserID",
            "x-oapi-codegen-extra-tags": {
              "db": "owner",
              "json": "userId"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "email": {
            "type": "string",
            "format": "email",
            "maxLength": 300,
            "description": "The email address",
            "x-oapi-codegen-extra-tags": {
              "db": "email",
              "json": "email"
            }
          },
          "verified": {
            "type": "boolean",
            "default": false,
            "description": "Whether the address was verified (per Kratos verifiable addresses) at record time",
            "x-oapi-codegen-extra-tags": {
              "db": "verified",
              "json": "verified"
            }
          },
          "isPrimary": {
            "type": "boolean",
            "default": false,
            "description": "Exactly one live primary address per user; mirrors users.email",
            "x-oapi-codegen-extra-tags": {
              "db": "is_primary",
              "json": "isPrimary"
            }
          },
          "source": {
            "type": "string",
            "enum": [
              "signup",
              "consolidation",
              "backfill",
              "manual"
            ],
            "description": "How this address became associated with the account",
            "x-oapi-codegen-extra-tags": {
              "db": "source",
              "json": "source"
            }
          },
          "createdAt": {
            "x-oapi-codegen-extra-tags": {
              "db": "created_at",
              "json": "createdAt"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at",
              "json": "updatedAt"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deletedAt": {
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at",
              "json": "deletedAt"
            },
            "description": "SQL null Timestamp to handle null values of time.",
            "x-go-type": "meshcore.NullTime",
            "x-go-type-import": {
              "name": "meshcore",
              "path": "github.com/meshery/schemas/models/core"
            },
            "type": "string",
            "format": "date-time",
            "nullable": true,
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "OrganizationWithRoles": {
        "type": "object",
        "additionalProperties": false,
        "description": "An organization the user is a member of, together with the names of the roles assigned to that user within the organization. Returned as an item of User.organizations.organizationsWithRoles. The role names are dynamic, user-generated values (no fixed enumeration).",
        "required": [
          "id",
          "name",
          "roleNames"
        ],
        "properties": {
          "id": {
            "description": "Unique identifier of the organization.",
            "x-go-name": "ID",
            "x-order": 1,
            "x-oapi-codegen-extra-tags": {
              "db": "id",
              "json": "id,omitempty"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "name": {
            "type": "string",
            "description": "Name of the organization.",
            "x-order": 2,
            "x-oapi-codegen-extra-tags": {
              "db": "name",
              "json": "name,omitempty"
            }
          },
          "description": {
            "type": "string",
            "description": "Human readable description of the organization.",
            "x-order": 3,
            "x-oapi-codegen-extra-tags": {
              "db": "description",
              "json": "description,omitempty"
            }
          },
          "country": {
            "type": "string",
            "description": "Country associated with the organization.",
            "x-order": 4,
            "x-oapi-codegen-extra-tags": {
              "db": "country",
              "json": "country,omitempty"
            }
          },
          "region": {
            "type": "string",
            "description": "Region associated with the organization.",
            "x-order": 5,
            "x-oapi-codegen-extra-tags": {
              "db": "region",
              "json": "region,omitempty"
            }
          },
          "owner": {
            "description": "Identifier of the organization owner.",
            "x-order": 6,
            "x-oapi-codegen-extra-tags": {
              "db": "owner",
              "json": "owner,omitempty"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "createdAt": {
            "description": "Timestamp when the organization was created.",
            "x-order": 7,
            "x-oapi-codegen-extra-tags": {
              "db": "created_at",
              "json": "createdAt,omitempty"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp when the organization was last updated.",
            "x-order": 8,
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at",
              "json": "updatedAt,omitempty"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deletedAt": {
            "type": "string",
            "format": "date-time",
            "nullable": true,
            "description": "Timestamp when the organization was soft-deleted (null if not deleted).",
            "x-go-type": "core.NullTime",
            "x-order": 9,
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at",
              "json": "deletedAt,omitempty"
            }
          },
          "roleNames": {
            "type": "array",
            "x-go-type": "pq.StringArray",
            "x-go-type-import": {
              "path": "github.com/lib/pq"
            },
            "description": "Names of the roles assigned to the user within this organization. Free-form, user-generated role names; not a fixed enumeration.",
            "items": {
              "type": "string"
            },
            "x-order": 10,
            "x-oapi-codegen-extra-tags": {
              "db": "role_names",
              "json": "roleNames"
            }
          }
        }
      },
      "TeamWithRoles": {
        "type": "object",
        "additionalProperties": false,
        "description": "A team the user is a member of, together with the names of the roles assigned to that user within the team. Returned as an item of User.teams.teamsWithRoles. The role names are dynamic, user-generated values (no fixed enumeration).",
        "required": [
          "id",
          "name",
          "roleNames"
        ],
        "properties": {
          "id": {
            "description": "Unique identifier of the team.",
            "x-go-name": "ID",
            "x-order": 1,
            "x-oapi-codegen-extra-tags": {
              "db": "id",
              "json": "id,omitempty"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "name": {
            "type": "string",
            "description": "Name of the team.",
            "x-order": 2,
            "x-oapi-codegen-extra-tags": {
              "db": "name",
              "json": "name,omitempty"
            }
          },
          "description": {
            "type": "string",
            "description": "Human readable description of the team.",
            "x-order": 3,
            "x-oapi-codegen-extra-tags": {
              "db": "description",
              "json": "description,omitempty"
            }
          },
          "owner": {
            "description": "Identifier of the team owner.",
            "x-order": 4,
            "x-oapi-codegen-extra-tags": {
              "db": "owner",
              "json": "owner,omitempty"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "metadata": {
            "type": "object",
            "additionalProperties": true,
            "description": "Free-form metadata associated with the team.",
            "x-go-type": "core.Map",
            "x-go-type-skip-optional-pointer": true,
            "x-order": 5,
            "x-oapi-codegen-extra-tags": {
              "db": "metadata",
              "json": "metadata,omitempty"
            }
          },
          "createdAt": {
            "description": "Timestamp when the team was created.",
            "x-order": 6,
            "x-oapi-codegen-extra-tags": {
              "db": "created_at",
              "json": "createdAt,omitempty"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp when the team was last updated.",
            "x-order": 7,
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at",
              "json": "updatedAt,omitempty"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deletedAt": {
            "type": "string",
            "format": "date-time",
            "nullable": true,
            "description": "Timestamp when the team was soft-deleted (null if not deleted).",
            "x-go-type": "core.NullTime",
            "x-order": 8,
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at",
              "json": "deletedAt,omitempty"
            }
          },
          "roleNames": {
            "type": "array",
            "x-go-type": "pq.StringArray",
            "x-go-type-import": {
              "path": "github.com/lib/pq"
            },
            "description": "Names of the roles assigned to the user within this team. Free-form, user-generated role names; not a fixed enumeration.",
            "items": {
              "type": "string"
            },
            "x-order": 9,
            "x-oapi-codegen-extra-tags": {
              "db": "role_names",
              "json": "roleNames"
            }
          }
        }
      },
      "Preference": {
        "x-generate-db-helpers": true,
        "type": "object",
        "required": [
          "anonymousUsageStats",
          "anonymousPerfResults",
          "updatedAt",
          "dashboardPreferences",
          "selectedOrganizationId",
          "selectedWorkspaceForOrganizations",
          "usersExtensionPreferences",
          "remoteProviderPreferences"
        ],
        "properties": {
          "meshAdapters": {
            "type": "array",
            "items": {
              "x-go-type": "Adapter",
              "type": "object",
              "description": "Placeholder for Adapter struct definition."
            },
            "description": "The mesh adapters of the preference."
          },
          "grafana": {
            "x-go-type": "Grafana",
            "type": "object",
            "properties": {
              "grafanaUrl": {
                "type": "string",
                "description": "Grafana URL for the user configuration.",
                "maxLength": 500
              },
              "grafanaApiKey": {
                "type": "string",
                "description": "Grafana API key for the user configuration.",
                "maxLength": 500
              },
              "selectedBoardsConfigs": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "board": {
                      "type": "object",
                      "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
                    },
                    "panels": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
                      },
                      "description": "Panels selected for the Grafana board configuration."
                    },
                    "templateVars": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      },
                      "description": "Template variables applied to the selected Grafana board configuration."
                    }
                  }
                },
                "description": "Selected Grafana board configurations for the user."
              }
            }
          },
          "prometheus": {
            "x-go-type": "Prometheus",
            "type": "object",
            "properties": {
              "prometheusUrl": {
                "type": "string",
                "description": "The prometheus URL of the prometheus.",
                "maxLength": 500
              },
              "selectedPrometheusBoardsConfigs": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "board": {
                      "type": "object",
                      "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
                    },
                    "panels": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
                      },
                      "description": "Panels selected for the Grafana board configuration."
                    },
                    "templateVars": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      },
                      "description": "Template variables applied to the selected Grafana board configuration."
                    }
                  }
                },
                "description": "The selected prometheus boards configs of the prometheus."
              }
            }
          },
          "loadTestPrefs": {
            "x-go-type": "LoadTestPreferences",
            "type": "object",
            "properties": {
              "c": {
                "type": "integer",
                "description": "Concurrent requests",
                "minimum": 0
              },
              "qps": {
                "type": "integer",
                "description": "Queries per second",
                "minimum": 0
              },
              "t": {
                "type": "string",
                "description": "Duration",
                "maxLength": 500
              },
              "gen": {
                "type": "string",
                "description": "Load generator",
                "maxLength": 500
              }
            }
          },
          "anonymousUsageStats": {
            "type": "boolean",
            "description": "The anonymous usage stats of the preference."
          },
          "anonymousPerfResults": {
            "type": "boolean",
            "description": "The anonymous perf results of the preference."
          },
          "updatedAt": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp of when the resource was last updated."
          },
          "dashboardPreferences": {
            "type": "object",
            "additionalProperties": true,
            "description": "The dashboard preferences of the preference."
          },
          "selectedOrganizationId": {
            "type": "string",
            "description": "ID of the associated selectedOrganization.",
            "maxLength": 500,
            "format": "uuid"
          },
          "selectedWorkspaceForOrganizations": {
            "type": "object",
            "additionalProperties": {
              "type": "string"
            },
            "description": "The selected workspace for organizations of the preference."
          },
          "usersExtensionPreferences": {
            "type": "object",
            "additionalProperties": true,
            "description": "The users extension preferences of the preference."
          },
          "remoteProviderPreferences": {
            "type": "object",
            "additionalProperties": true,
            "description": "The remote provider preferences of the preference. Free-form, keyed by provider. A provider's `agentsActWithoutApproval` entry is deprecated in favor of the typed `agentsActWithoutApproval` field, and it is never read once the typed field has been written (see Preference.agentsActWithoutApproval). A token-authenticated request that would change the stored state of that entry (a different value, adding it where absent, or removing it where present) is answered 403, as for the typed field. Writing back the stored entry unchanged is accepted. See docs/agent-approval-preference.md (Migration from the free-form value)."
          },
          "agentsActWithoutApproval": {
            "type": "boolean",
            "description": "Interim rule (temporary): until the upstream platform, workspace and profile policies exist, inherit (including absent) resolves to required. During the interim this field is stored and writable but is not consulted by approval resolution; it becomes the profile-level source once the hierarchy places that level (the hierarchy proposal is https://github.com/layer5io/meshery-cloud/issues/6365, and the interim does not wait on it). Target model, once the hierarchy places the profile level: one profile-level source in the approval hierarchy (platform, workspace, profile; hierarchy defined in https://github.com/layer5io/meshery-cloud/issues/6365). Each activity carries an approvalPolicy (required, not_required or inherit; no schema default, and absent behaves like inherit). An explicit required or not_required on the activity always wins and never consults this field. This field is consulted only for an activity whose approvalPolicy is inherit or absent, only when it was written by an AI app, and only if no level that the hierarchy places ahead of the profile has already decided. For such an activity: true means not_required, false means required, and absent sets nothing. If nothing sets a value, approval is required (fail closed; this fallback is open for confirmation in https://github.com/layer5io/meshery-cloud/issues/6365). AI apps never set approved; approvalPolicy only says whether approval is needed. No schema default is declared, so absence stays distinguishable from false. Typed replacement for the free-form remoteProviderPreferences.<provider>.agentsActWithoutApproval. The server keeps a write-once marker per preference, which is not part of this schema: the first accepted write that names this field (true, false, or null) sets the marker, and nothing clears it. Only a write from the signed-in session can set the marker; a token-authenticated write that names this field never sets it. Once the marker is set, the free-form value is never read again, and null means inherit, not the free-form value. While the marker is unset, the free-form value is not shown as the preference and never changes approval resolution: during the interim inherit resolves to required whatever it says, as the migration section of docs/agent-approval-preference.md describes. On read, absent means not set (inherit); the stored value is never null. An API token, of any kind, cannot change this field: a token-authenticated request that names it, with any value including null, is answered 403. Only a request authenticated by the signed-in session can set it. See PreferencePayload.agentsActWithoutApproval and docs/agent-approval-preference.md."
          }
        }
      },
      "PreferencePayload": {
        "type": "object",
        "description": "The v1beta3 request body of updateUserPreferences (PUT /api/identity/users/preferences), and the client-settable fields of Preference. Every field is optional: the server merges the ones present onto the stored preferences and keeps the rest. Setting selectedOrganizationId switches the organization the user's session has selected. Badges are server-owned and are never changed through this body. updatedAt is server-recorded and is not settable. See docs/agent-approval-preference.md for who may write agentsActWithoutApproval.",
        "additionalProperties": false,
        "properties": {
          "meshAdapters": {
            "type": "array",
            "items": {
              "x-go-type": "Adapter",
              "type": "object",
              "description": "Placeholder for Adapter struct definition."
            },
            "description": "The mesh adapters of the preference."
          },
          "grafana": {
            "x-go-type": "Grafana",
            "type": "object",
            "properties": {
              "grafanaUrl": {
                "type": "string",
                "description": "Grafana URL for the user configuration.",
                "maxLength": 500
              },
              "grafanaApiKey": {
                "type": "string",
                "description": "Grafana API key for the user configuration.",
                "maxLength": 500
              },
              "selectedBoardsConfigs": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "board": {
                      "type": "object",
                      "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
                    },
                    "panels": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
                      },
                      "description": "Panels selected for the Grafana board configuration."
                    },
                    "templateVars": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      },
                      "description": "Template variables applied to the selected Grafana board configuration."
                    }
                  }
                },
                "description": "Selected Grafana board configurations for the user."
              }
            }
          },
          "prometheus": {
            "x-go-type": "Prometheus",
            "type": "object",
            "properties": {
              "prometheusUrl": {
                "type": "string",
                "description": "The prometheus URL of the prometheus.",
                "maxLength": 500
              },
              "selectedPrometheusBoardsConfigs": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "board": {
                      "type": "object",
                      "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
                    },
                    "panels": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
                      },
                      "description": "Panels selected for the Grafana board configuration."
                    },
                    "templateVars": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      },
                      "description": "Template variables applied to the selected Grafana board configuration."
                    }
                  }
                },
                "description": "The selected prometheus boards configs of the prometheus."
              }
            }
          },
          "loadTestPrefs": {
            "x-go-type": "LoadTestPreferences",
            "type": "object",
            "properties": {
              "c": {
                "type": "integer",
                "description": "Concurrent requests",
                "minimum": 0
              },
              "qps": {
                "type": "integer",
                "description": "Queries per second",
                "minimum": 0
              },
              "t": {
                "type": "string",
                "description": "Duration",
                "maxLength": 500
              },
              "gen": {
                "type": "string",
                "description": "Load generator",
                "maxLength": 500
              }
            }
          },
          "anonymousUsageStats": {
            "type": "boolean",
            "description": "The anonymous usage stats of the preference."
          },
          "anonymousPerfResults": {
            "type": "boolean",
            "description": "The anonymous perf results of the preference."
          },
          "dashboardPreferences": {
            "type": "object",
            "additionalProperties": true,
            "description": "The dashboard preferences of the preference."
          },
          "selectedOrganizationId": {
            "type": "string",
            "description": "ID of the organization to make the session's selected organization.",
            "maxLength": 500,
            "format": "uuid"
          },
          "selectedWorkspaceForOrganizations": {
            "type": "object",
            "additionalProperties": {
              "type": "string"
            },
            "description": "The selected workspace for organizations of the preference."
          },
          "usersExtensionPreferences": {
            "type": "object",
            "additionalProperties": true,
            "description": "The users extension preferences of the preference."
          },
          "remoteProviderPreferences": {
            "type": "object",
            "additionalProperties": true,
            "description": "The remote provider preferences of the preference. Writers set the typed agentsActWithoutApproval field, not a provider's free-form agentsActWithoutApproval entry. A token-authenticated request that would change the stored state of a provider's agentsActWithoutApproval entry (a different value, adding it where absent, or removing it where present) is answered 403, and no part of the payload is applied. Writing back the stored entry unchanged is accepted. Once the typed field has been written, the entry is never read again (see Preference.agentsActWithoutApproval)."
          },
          "agentsActWithoutApproval": {
            "type": "boolean",
            "nullable": true,
            "description": "Interim rule (temporary): until the upstream platform, workspace and profile policies exist, inherit (including absent) resolves to required, and this field is stored but not consulted by approval resolution (see Preference.agentsActWithoutApproval; the hierarchy proposal is https://github.com/layer5io/meshery-cloud/issues/6365). Target model, once the hierarchy places the profile level: one profile-level source for agent writes, consulted only for an AI-app activity whose approvalPolicy is inherit or absent, and only when no higher-level setting (hierarchy defined in https://github.com/layer5io/meshery-cloud/issues/6365) has decided (see Preference.agentsActWithoutApproval): true means not_required, false means required, and absent sets nothing. Three states on write: true or false stores that value; null clears the stored value back to absent (inherit); omitted keeps the stored value. No schema default is declared. An API token, of any kind, cannot set this field: a token-authenticated request whose payload names this field, with any value including null and whatever the stored state is, is answered 403 and no part of the payload is applied. Only a request authenticated by the signed-in session can set it. A token client doing read-modify-write must omit this field: echoing the value it read, or null, answers 403 for the whole payload. See docs/agent-approval-preference.md.",
            "x-go-type": "nullable.Nullable[bool]",
            "x-go-type-import": {
              "path": "github.com/oapi-codegen/nullable"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "agentsActWithoutApproval,omitempty"
            }
          }
        }
      },
      "Adapter": {
        "type": "object",
        "description": "Placeholder for Adapter struct definition."
      },
      "Grafana": {
        "type": "object",
        "properties": {
          "grafanaUrl": {
            "type": "string",
            "description": "Grafana URL for the user configuration.",
            "maxLength": 500
          },
          "grafanaApiKey": {
            "type": "string",
            "description": "Grafana API key for the user configuration.",
            "maxLength": 500
          },
          "selectedBoardsConfigs": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "board": {
                  "type": "object",
                  "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
                },
                "panels": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
                  },
                  "description": "Panels selected for the Grafana board configuration."
                },
                "templateVars": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "Template variables applied to the selected Grafana board configuration."
                }
              }
            },
            "description": "Selected Grafana board configurations for the user."
          }
        }
      },
      "SelectedGrafanaConfig": {
        "type": "object",
        "properties": {
          "board": {
            "type": "object",
            "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
          },
          "panels": {
            "type": "array",
            "items": {
              "type": "object",
              "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
            },
            "description": "Panels selected for the Grafana board configuration."
          },
          "templateVars": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Template variables applied to the selected Grafana board configuration."
          }
        }
      },
      "GrafanaBoard": {
        "type": "object",
        "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
      },
      "Panel": {
        "type": "object",
        "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
      },
      "Prometheus": {
        "type": "object",
        "properties": {
          "prometheusUrl": {
            "type": "string",
            "description": "The prometheus URL of the prometheus.",
            "maxLength": 500
          },
          "selectedPrometheusBoardsConfigs": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "board": {
                  "type": "object",
                  "description": "Placeholder for GrafanaBoard definition (define fields as needed)"
                },
                "panels": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "description": "Grafana panel structure imported from github.com/grafana-tools/sdk"
                  },
                  "description": "Panels selected for the Grafana board configuration."
                },
                "templateVars": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "Template variables applied to the selected Grafana board configuration."
                }
              }
            },
            "description": "The selected prometheus boards configs of the prometheus."
          }
        }
      },
      "LoadTestPreferences": {
        "type": "object",
        "properties": {
          "c": {
            "type": "integer",
            "description": "Concurrent requests",
            "minimum": 0
          },
          "qps": {
            "type": "integer",
            "description": "Queries per second",
            "minimum": 0
          },
          "t": {
            "type": "string",
            "description": "Duration",
            "maxLength": 500
          },
          "gen": {
            "type": "string",
            "description": "Load generator",
            "maxLength": 500
          }
        }
      },
      "Social": {
        "description": "Various online profiles associated with the user account, like GitHub, LinkedIn, X, and so on.",
        "type": "object",
        "properties": {
          "site": {
            "type": "string",
            "maxLength": 50,
            "description": "The site of the social."
          },
          "link": {
            "type": "string",
            "format": "uri",
            "description": "The link of the social."
          }
        },
        "required": [
          "site",
          "link"
        ]
      }
    }
  }
};

export default UserSchema;
