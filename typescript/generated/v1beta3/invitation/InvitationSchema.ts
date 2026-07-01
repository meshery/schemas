/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const InvitationSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Invitation",
    "description": "OpenAPI schema for managing invitations.",
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
  "tags": [
    {
      "name": "Invitation",
      "description": "Operations related to invitation"
    }
  ],
  "security": [
    {
      "jwt": []
    }
  ],
  "paths": {
    "/api/organizations/invitations/{invitationId}": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "operationId": "getInvitation",
        "tags": [
          "Invitation"
        ],
        "summary": "Get an invitation by ID",
        "parameters": [
          {
            "name": "invitationId",
            "in": "path",
            "required": true,
            "description": "The ID of the invitation.",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Invitation fetched",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": false,
                  "description": "Invitation entity schema.",
                  "required": [
                    "id",
                    "owner",
                    "name",
                    "description",
                    "orgId",
                    "acceptedBy",
                    "emails",
                    "roles",
                    "teams",
                    "status",
                    "createdAt",
                    "updatedAt",
                    "deletedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Unique identifier for the invitation, also used as the invitation code.",
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
                    "owner": {
                      "description": "ID of the user who created the invitation. Tracks who created the invitation for auditing purposes.",
                      "x-go-name": "Owner",
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner",
                        "json": "owner"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "isDefault": {
                      "type": "boolean",
                      "description": "Indicates whether the invitation is a default invitation (open invite), which can be used to assign users when signing up from fqdn or custom domain. An organization can only have one default invitation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "is_default",
                        "json": "isDefault"
                      }
                    },
                    "name": {
                      "type": "string",
                      "description": "Name of the invitation, which can be used to identify it. Required; cannot be an empty string.",
                      "minLength": 1,
                      "maxLength": 255
                    },
                    "description": {
                      "type": "string",
                      "description": "Description of the invitation, which can be used to provide additional context. Null or empty string means the invitation does not have a description.",
                      "maxLength": 5000
                    },
                    "emails": {
                      "type": "array",
                      "description": "Email addresses or patterns for which the invitation is valid. Null means the invitation is valid for any email address.",
                      "x-go-type": "pq.StringArray",
                      "x-go-type-import": {
                        "path": "github.com/lib/pq"
                      },
                      "items": {
                        "type": "string",
                        "pattern": "^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,}|@[a-zA-Z0-9.-]+\\.[a-z]{2,})$",
                        "description": "Exact email address or the email address pattern for which the invitation is valid.",
                        "x-go-type": "string"
                      }
                    },
                    "orgId": {
                      "description": "ID of the organization to which the user is invited.",
                      "x-go-name": "OrgID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "org_id",
                        "json": "orgId"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "expiresAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the invitation expires, if applicable. Null or empty means the invitation does not expire.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "expires_at",
                        "json": "expiresAt"
                      }
                    },
                    "quota": {
                      "type": "integer",
                      "description": "Quota for the invitation; limits the number of users that can accept it. Null or empty means the invitation is unlimited.",
                      "minimum": 0
                    },
                    "acceptedBy": {
                      "type": "array",
                      "description": "List of user ids that have already accepted the invitation. Empty means the invitation has not been used yet.",
                      "x-go-type": "pq.StringArray",
                      "x-go-type-import": {
                        "path": "github.com/lib/pq"
                      },
                      "items": {
                        "type": "string"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "accepted_by",
                        "json": "acceptedBy"
                      }
                    },
                    "roles": {
                      "type": "array",
                      "description": "Roles that the user will have when accepting the invitation. Empty means the invitation does not specify any roles.",
                      "x-go-type": "pq.StringArray",
                      "x-go-type-import": {
                        "path": "github.com/lib/pq"
                      },
                      "items": {
                        "type": "string",
                        "description": "Role identifier granted by this invitation on acceptance."
                      }
                    },
                    "teams": {
                      "type": "array",
                      "description": "Teams that the user will be added to when accepting the invitation. Empty means the invitation does not specify any teams.",
                      "x-go-type": "pq.StringArray",
                      "x-go-type-import": {
                        "path": "github.com/lib/pq"
                      },
                      "items": {
                        "type": "string",
                        "description": "Team identifier the invited user is added to on acceptance."
                      }
                    },
                    "status": {
                      "description": "Activation status of the invitation.",
                      "x-go-type": "InvitationStatus",
                      "type": "string",
                      "enum": [
                        "enabled",
                        "disabled"
                      ]
                    },
                    "createdAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the invitation was created.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "createdAt"
                      }
                    },
                    "updatedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the invitation was last updated.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updatedAt"
                      }
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the invitation was deleted, if applicable.",
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deletedAt"
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
      },
      "delete": {
        "x-internal": [
          "cloud"
        ],
        "operationId": "deleteInvitation",
        "tags": [
          "Invitation"
        ],
        "summary": "Delete an invitation by ID",
        "parameters": [
          {
            "name": "invitationId",
            "in": "path",
            "required": true,
            "description": "The ID of the invitation.",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Invitation deleted"
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
      },
      "put": {
        "x-internal": [
          "cloud"
        ],
        "operationId": "updateInvitation",
        "tags": [
          "Invitation"
        ],
        "summary": "Update an existing invitation",
        "parameters": [
          {
            "name": "invitationId",
            "in": "path",
            "required": true,
            "description": "The ID of the invitation.",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for creating or updating an invitation.",
                "required": [
                  "name",
                  "description",
                  "orgId",
                  "emails",
                  "roles",
                  "teams",
                  "status"
                ],
                "properties": {
                  "id": {
                    "x-go-name": "ID",
                    "description": "Existing invitation ID for updates; omit on create.",
                    "x-oapi-codegen-extra-tags": {
                      "json": "id,omitempty"
                    },
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  },
                  "owner": {
                    "description": "ID of the user who created the invitation.",
                    "x-go-name": "Owner",
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
                  "isDefault": {
                    "type": "boolean",
                    "description": "Indicates whether the invitation is a default invitation (open invite).",
                    "x-oapi-codegen-extra-tags": {
                      "db": "is_default",
                      "json": "isDefault,omitempty"
                    }
                  },
                  "name": {
                    "type": "string",
                    "description": "Name of the invitation.",
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "description": {
                    "type": "string",
                    "description": "Description of the invitation.",
                    "maxLength": 5000
                  },
                  "emails": {
                    "type": "array",
                    "x-go-type": "pq.StringArray",
                    "x-go-type-import": {
                      "path": "github.com/lib/pq"
                    },
                    "items": {
                      "type": "string",
                      "pattern": "^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,}|@[a-zA-Z0-9.-]+\\.[a-z]{2,})$",
                      "description": "Email address or pattern that is permitted to use this invitation.",
                      "x-go-type": "string"
                    },
                    "description": "Email addresses or patterns this invitation is valid for."
                  },
                  "orgId": {
                    "type": "string",
                    "format": "uuid",
                    "description": "ID of the organization to which the user is invited.",
                    "x-go-name": "OrgID",
                    "x-oapi-codegen-extra-tags": {
                      "db": "org_id",
                      "json": "orgId"
                    },
                    "maxLength": 500
                  },
                  "expiresAt": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Timestamp when the invitation expires, if applicable.",
                    "x-oapi-codegen-extra-tags": {
                      "db": "expires_at",
                      "json": "expiresAt,omitempty"
                    }
                  },
                  "quota": {
                    "type": "integer",
                    "description": "Quota for the invitation; limits the number of users that can accept it.",
                    "minimum": 0
                  },
                  "roles": {
                    "type": "array",
                    "x-go-type": "pq.StringArray",
                    "x-go-type-import": {
                      "path": "github.com/lib/pq"
                    },
                    "items": {
                      "type": "string",
                      "description": "Role identifier granted by this invitation on acceptance."
                    },
                    "description": "Roles that the user will have when accepting the invitation."
                  },
                  "teams": {
                    "type": "array",
                    "x-go-type": "pq.StringArray",
                    "x-go-type-import": {
                      "path": "github.com/lib/pq"
                    },
                    "items": {
                      "type": "string",
                      "description": "Team identifier the invited user is added to on acceptance."
                    },
                    "description": "Teams that the user will be added to when accepting the invitation."
                  },
                  "status": {
                    "description": "Activation status of the invitation.",
                    "x-go-type": "InvitationStatus",
                    "type": "string",
                    "enum": [
                      "enabled",
                      "disabled"
                    ]
                  }
                }
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Invitation updated",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": false,
                  "description": "Invitation entity schema.",
                  "required": [
                    "id",
                    "owner",
                    "name",
                    "description",
                    "orgId",
                    "acceptedBy",
                    "emails",
                    "roles",
                    "teams",
                    "status",
                    "createdAt",
                    "updatedAt",
                    "deletedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Unique identifier for the invitation, also used as the invitation code.",
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
                    "owner": {
                      "description": "ID of the user who created the invitation. Tracks who created the invitation for auditing purposes.",
                      "x-go-name": "Owner",
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner",
                        "json": "owner"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "isDefault": {
                      "type": "boolean",
                      "description": "Indicates whether the invitation is a default invitation (open invite), which can be used to assign users when signing up from fqdn or custom domain. An organization can only have one default invitation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "is_default",
                        "json": "isDefault"
                      }
                    },
                    "name": {
                      "type": "string",
                      "description": "Name of the invitation, which can be used to identify it. Required; cannot be an empty string.",
                      "minLength": 1,
                      "maxLength": 255
                    },
                    "description": {
                      "type": "string",
                      "description": "Description of the invitation, which can be used to provide additional context. Null or empty string means the invitation does not have a description.",
                      "maxLength": 5000
                    },
                    "emails": {
                      "type": "array",
                      "description": "Email addresses or patterns for which the invitation is valid. Null means the invitation is valid for any email address.",
                      "x-go-type": "pq.StringArray",
                      "x-go-type-import": {
                        "path": "github.com/lib/pq"
                      },
                      "items": {
                        "type": "string",
                        "pattern": "^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,}|@[a-zA-Z0-9.-]+\\.[a-z]{2,})$",
                        "description": "Exact email address or the email address pattern for which the invitation is valid.",
                        "x-go-type": "string"
                      }
                    },
                    "orgId": {
                      "description": "ID of the organization to which the user is invited.",
                      "x-go-name": "OrgID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "org_id",
                        "json": "orgId"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "expiresAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the invitation expires, if applicable. Null or empty means the invitation does not expire.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "expires_at",
                        "json": "expiresAt"
                      }
                    },
                    "quota": {
                      "type": "integer",
                      "description": "Quota for the invitation; limits the number of users that can accept it. Null or empty means the invitation is unlimited.",
                      "minimum": 0
                    },
                    "acceptedBy": {
                      "type": "array",
                      "description": "List of user ids that have already accepted the invitation. Empty means the invitation has not been used yet.",
                      "x-go-type": "pq.StringArray",
                      "x-go-type-import": {
                        "path": "github.com/lib/pq"
                      },
                      "items": {
                        "type": "string"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "accepted_by",
                        "json": "acceptedBy"
                      }
                    },
                    "roles": {
                      "type": "array",
                      "description": "Roles that the user will have when accepting the invitation. Empty means the invitation does not specify any roles.",
                      "x-go-type": "pq.StringArray",
                      "x-go-type-import": {
                        "path": "github.com/lib/pq"
                      },
                      "items": {
                        "type": "string",
                        "description": "Role identifier granted by this invitation on acceptance."
                      }
                    },
                    "teams": {
                      "type": "array",
                      "description": "Teams that the user will be added to when accepting the invitation. Empty means the invitation does not specify any teams.",
                      "x-go-type": "pq.StringArray",
                      "x-go-type-import": {
                        "path": "github.com/lib/pq"
                      },
                      "items": {
                        "type": "string",
                        "description": "Team identifier the invited user is added to on acceptance."
                      }
                    },
                    "status": {
                      "description": "Activation status of the invitation.",
                      "x-go-type": "InvitationStatus",
                      "type": "string",
                      "enum": [
                        "enabled",
                        "disabled"
                      ]
                    },
                    "createdAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the invitation was created.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "createdAt"
                      }
                    },
                    "updatedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the invitation was last updated.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updatedAt"
                      }
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the invitation was deleted, if applicable.",
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deletedAt"
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
    "/api/organizations/invitations": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "operationId": "getInvitations",
        "tags": [
          "Invitation"
        ],
        "summary": "Get a paginated list of invitations for the organization",
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
            "description": "Invitations page",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated list of invitations for an organization.",
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
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "additionalProperties": false,
                        "description": "Invitation entity schema.",
                        "required": [
                          "id",
                          "owner",
                          "name",
                          "description",
                          "orgId",
                          "acceptedBy",
                          "emails",
                          "roles",
                          "teams",
                          "status",
                          "createdAt",
                          "updatedAt",
                          "deletedAt"
                        ],
                        "properties": {
                          "id": {
                            "description": "Unique identifier for the invitation, also used as the invitation code.",
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
                          "owner": {
                            "description": "ID of the user who created the invitation. Tracks who created the invitation for auditing purposes.",
                            "x-go-name": "Owner",
                            "x-oapi-codegen-extra-tags": {
                              "db": "owner",
                              "json": "owner"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "isDefault": {
                            "type": "boolean",
                            "description": "Indicates whether the invitation is a default invitation (open invite), which can be used to assign users when signing up from fqdn or custom domain. An organization can only have one default invitation.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "is_default",
                              "json": "isDefault"
                            }
                          },
                          "name": {
                            "type": "string",
                            "description": "Name of the invitation, which can be used to identify it. Required; cannot be an empty string.",
                            "minLength": 1,
                            "maxLength": 255
                          },
                          "description": {
                            "type": "string",
                            "description": "Description of the invitation, which can be used to provide additional context. Null or empty string means the invitation does not have a description.",
                            "maxLength": 5000
                          },
                          "emails": {
                            "type": "array",
                            "description": "Email addresses or patterns for which the invitation is valid. Null means the invitation is valid for any email address.",
                            "x-go-type": "pq.StringArray",
                            "x-go-type-import": {
                              "path": "github.com/lib/pq"
                            },
                            "items": {
                              "type": "string",
                              "pattern": "^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,}|@[a-zA-Z0-9.-]+\\.[a-z]{2,})$",
                              "description": "Exact email address or the email address pattern for which the invitation is valid.",
                              "x-go-type": "string"
                            }
                          },
                          "orgId": {
                            "description": "ID of the organization to which the user is invited.",
                            "x-go-name": "OrgID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "org_id",
                              "json": "orgId"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "expiresAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the invitation expires, if applicable. Null or empty means the invitation does not expire.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "expires_at",
                              "json": "expiresAt"
                            }
                          },
                          "quota": {
                            "type": "integer",
                            "description": "Quota for the invitation; limits the number of users that can accept it. Null or empty means the invitation is unlimited.",
                            "minimum": 0
                          },
                          "acceptedBy": {
                            "type": "array",
                            "description": "List of user ids that have already accepted the invitation. Empty means the invitation has not been used yet.",
                            "x-go-type": "pq.StringArray",
                            "x-go-type-import": {
                              "path": "github.com/lib/pq"
                            },
                            "items": {
                              "type": "string"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "accepted_by",
                              "json": "acceptedBy"
                            }
                          },
                          "roles": {
                            "type": "array",
                            "description": "Roles that the user will have when accepting the invitation. Empty means the invitation does not specify any roles.",
                            "x-go-type": "pq.StringArray",
                            "x-go-type-import": {
                              "path": "github.com/lib/pq"
                            },
                            "items": {
                              "type": "string",
                              "description": "Role identifier granted by this invitation on acceptance."
                            }
                          },
                          "teams": {
                            "type": "array",
                            "description": "Teams that the user will be added to when accepting the invitation. Empty means the invitation does not specify any teams.",
                            "x-go-type": "pq.StringArray",
                            "x-go-type-import": {
                              "path": "github.com/lib/pq"
                            },
                            "items": {
                              "type": "string",
                              "description": "Team identifier the invited user is added to on acceptance."
                            }
                          },
                          "status": {
                            "description": "Activation status of the invitation.",
                            "x-go-type": "InvitationStatus",
                            "type": "string",
                            "enum": [
                              "enabled",
                              "disabled"
                            ]
                          },
                          "createdAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the invitation was created.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "json": "createdAt"
                            }
                          },
                          "updatedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the invitation was last updated.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "json": "updatedAt"
                            }
                          },
                          "deletedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the invitation was deleted, if applicable.",
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "json": "deletedAt"
                            }
                          }
                        },
                        "x-go-type": "Invitation"
                      },
                      "description": "Invitations returned on the current page.",
                      "x-oapi-codegen-extra-tags": {
                        "json": "data"
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
      },
      "post": {
        "x-internal": [
          "cloud"
        ],
        "operationId": "createInvitation",
        "tags": [
          "Invitation"
        ],
        "summary": "Create a new invitation for the organization",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for creating or updating an invitation.",
                "required": [
                  "name",
                  "description",
                  "orgId",
                  "emails",
                  "roles",
                  "teams",
                  "status"
                ],
                "properties": {
                  "id": {
                    "x-go-name": "ID",
                    "description": "Existing invitation ID for updates; omit on create.",
                    "x-oapi-codegen-extra-tags": {
                      "json": "id,omitempty"
                    },
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  },
                  "owner": {
                    "description": "ID of the user who created the invitation.",
                    "x-go-name": "Owner",
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
                  "isDefault": {
                    "type": "boolean",
                    "description": "Indicates whether the invitation is a default invitation (open invite).",
                    "x-oapi-codegen-extra-tags": {
                      "db": "is_default",
                      "json": "isDefault,omitempty"
                    }
                  },
                  "name": {
                    "type": "string",
                    "description": "Name of the invitation.",
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "description": {
                    "type": "string",
                    "description": "Description of the invitation.",
                    "maxLength": 5000
                  },
                  "emails": {
                    "type": "array",
                    "x-go-type": "pq.StringArray",
                    "x-go-type-import": {
                      "path": "github.com/lib/pq"
                    },
                    "items": {
                      "type": "string",
                      "pattern": "^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,}|@[a-zA-Z0-9.-]+\\.[a-z]{2,})$",
                      "description": "Email address or pattern that is permitted to use this invitation.",
                      "x-go-type": "string"
                    },
                    "description": "Email addresses or patterns this invitation is valid for."
                  },
                  "orgId": {
                    "type": "string",
                    "format": "uuid",
                    "description": "ID of the organization to which the user is invited.",
                    "x-go-name": "OrgID",
                    "x-oapi-codegen-extra-tags": {
                      "db": "org_id",
                      "json": "orgId"
                    },
                    "maxLength": 500
                  },
                  "expiresAt": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Timestamp when the invitation expires, if applicable.",
                    "x-oapi-codegen-extra-tags": {
                      "db": "expires_at",
                      "json": "expiresAt,omitempty"
                    }
                  },
                  "quota": {
                    "type": "integer",
                    "description": "Quota for the invitation; limits the number of users that can accept it.",
                    "minimum": 0
                  },
                  "roles": {
                    "type": "array",
                    "x-go-type": "pq.StringArray",
                    "x-go-type-import": {
                      "path": "github.com/lib/pq"
                    },
                    "items": {
                      "type": "string",
                      "description": "Role identifier granted by this invitation on acceptance."
                    },
                    "description": "Roles that the user will have when accepting the invitation."
                  },
                  "teams": {
                    "type": "array",
                    "x-go-type": "pq.StringArray",
                    "x-go-type-import": {
                      "path": "github.com/lib/pq"
                    },
                    "items": {
                      "type": "string",
                      "description": "Team identifier the invited user is added to on acceptance."
                    },
                    "description": "Teams that the user will be added to when accepting the invitation."
                  },
                  "status": {
                    "description": "Activation status of the invitation.",
                    "x-go-type": "InvitationStatus",
                    "type": "string",
                    "enum": [
                      "enabled",
                      "disabled"
                    ]
                  }
                }
              }
            }
          },
          "required": true
        },
        "responses": {
          "201": {
            "description": "Invitation created",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": false,
                  "description": "Invitation entity schema.",
                  "required": [
                    "id",
                    "owner",
                    "name",
                    "description",
                    "orgId",
                    "acceptedBy",
                    "emails",
                    "roles",
                    "teams",
                    "status",
                    "createdAt",
                    "updatedAt",
                    "deletedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Unique identifier for the invitation, also used as the invitation code.",
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
                    "owner": {
                      "description": "ID of the user who created the invitation. Tracks who created the invitation for auditing purposes.",
                      "x-go-name": "Owner",
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner",
                        "json": "owner"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "isDefault": {
                      "type": "boolean",
                      "description": "Indicates whether the invitation is a default invitation (open invite), which can be used to assign users when signing up from fqdn or custom domain. An organization can only have one default invitation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "is_default",
                        "json": "isDefault"
                      }
                    },
                    "name": {
                      "type": "string",
                      "description": "Name of the invitation, which can be used to identify it. Required; cannot be an empty string.",
                      "minLength": 1,
                      "maxLength": 255
                    },
                    "description": {
                      "type": "string",
                      "description": "Description of the invitation, which can be used to provide additional context. Null or empty string means the invitation does not have a description.",
                      "maxLength": 5000
                    },
                    "emails": {
                      "type": "array",
                      "description": "Email addresses or patterns for which the invitation is valid. Null means the invitation is valid for any email address.",
                      "x-go-type": "pq.StringArray",
                      "x-go-type-import": {
                        "path": "github.com/lib/pq"
                      },
                      "items": {
                        "type": "string",
                        "pattern": "^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,}|@[a-zA-Z0-9.-]+\\.[a-z]{2,})$",
                        "description": "Exact email address or the email address pattern for which the invitation is valid.",
                        "x-go-type": "string"
                      }
                    },
                    "orgId": {
                      "description": "ID of the organization to which the user is invited.",
                      "x-go-name": "OrgID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "org_id",
                        "json": "orgId"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "expiresAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the invitation expires, if applicable. Null or empty means the invitation does not expire.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "expires_at",
                        "json": "expiresAt"
                      }
                    },
                    "quota": {
                      "type": "integer",
                      "description": "Quota for the invitation; limits the number of users that can accept it. Null or empty means the invitation is unlimited.",
                      "minimum": 0
                    },
                    "acceptedBy": {
                      "type": "array",
                      "description": "List of user ids that have already accepted the invitation. Empty means the invitation has not been used yet.",
                      "x-go-type": "pq.StringArray",
                      "x-go-type-import": {
                        "path": "github.com/lib/pq"
                      },
                      "items": {
                        "type": "string"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "accepted_by",
                        "json": "acceptedBy"
                      }
                    },
                    "roles": {
                      "type": "array",
                      "description": "Roles that the user will have when accepting the invitation. Empty means the invitation does not specify any roles.",
                      "x-go-type": "pq.StringArray",
                      "x-go-type-import": {
                        "path": "github.com/lib/pq"
                      },
                      "items": {
                        "type": "string",
                        "description": "Role identifier granted by this invitation on acceptance."
                      }
                    },
                    "teams": {
                      "type": "array",
                      "description": "Teams that the user will be added to when accepting the invitation. Empty means the invitation does not specify any teams.",
                      "x-go-type": "pq.StringArray",
                      "x-go-type-import": {
                        "path": "github.com/lib/pq"
                      },
                      "items": {
                        "type": "string",
                        "description": "Team identifier the invited user is added to on acceptance."
                      }
                    },
                    "status": {
                      "description": "Activation status of the invitation.",
                      "x-go-type": "InvitationStatus",
                      "type": "string",
                      "enum": [
                        "enabled",
                        "disabled"
                      ]
                    },
                    "createdAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the invitation was created.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "createdAt"
                      }
                    },
                    "updatedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the invitation was last updated.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updatedAt"
                      }
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the invitation was deleted, if applicable.",
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deletedAt"
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
    "/api/organizations/invitations/{invitationId}/accept": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "operationId": "acceptInvitation",
        "tags": [
          "Invitation"
        ],
        "summary": "Accept an invitation by ID",
        "parameters": [
          {
            "name": "invitationId",
            "in": "path",
            "required": true,
            "description": "The ID of the invitation.",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Invitation accepted",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": false,
                  "description": "Invitation entity schema.",
                  "required": [
                    "id",
                    "owner",
                    "name",
                    "description",
                    "orgId",
                    "acceptedBy",
                    "emails",
                    "roles",
                    "teams",
                    "status",
                    "createdAt",
                    "updatedAt",
                    "deletedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Unique identifier for the invitation, also used as the invitation code.",
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
                    "owner": {
                      "description": "ID of the user who created the invitation. Tracks who created the invitation for auditing purposes.",
                      "x-go-name": "Owner",
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner",
                        "json": "owner"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "isDefault": {
                      "type": "boolean",
                      "description": "Indicates whether the invitation is a default invitation (open invite), which can be used to assign users when signing up from fqdn or custom domain. An organization can only have one default invitation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "is_default",
                        "json": "isDefault"
                      }
                    },
                    "name": {
                      "type": "string",
                      "description": "Name of the invitation, which can be used to identify it. Required; cannot be an empty string.",
                      "minLength": 1,
                      "maxLength": 255
                    },
                    "description": {
                      "type": "string",
                      "description": "Description of the invitation, which can be used to provide additional context. Null or empty string means the invitation does not have a description.",
                      "maxLength": 5000
                    },
                    "emails": {
                      "type": "array",
                      "description": "Email addresses or patterns for which the invitation is valid. Null means the invitation is valid for any email address.",
                      "x-go-type": "pq.StringArray",
                      "x-go-type-import": {
                        "path": "github.com/lib/pq"
                      },
                      "items": {
                        "type": "string",
                        "pattern": "^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,}|@[a-zA-Z0-9.-]+\\.[a-z]{2,})$",
                        "description": "Exact email address or the email address pattern for which the invitation is valid.",
                        "x-go-type": "string"
                      }
                    },
                    "orgId": {
                      "description": "ID of the organization to which the user is invited.",
                      "x-go-name": "OrgID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "org_id",
                        "json": "orgId"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "expiresAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the invitation expires, if applicable. Null or empty means the invitation does not expire.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "expires_at",
                        "json": "expiresAt"
                      }
                    },
                    "quota": {
                      "type": "integer",
                      "description": "Quota for the invitation; limits the number of users that can accept it. Null or empty means the invitation is unlimited.",
                      "minimum": 0
                    },
                    "acceptedBy": {
                      "type": "array",
                      "description": "List of user ids that have already accepted the invitation. Empty means the invitation has not been used yet.",
                      "x-go-type": "pq.StringArray",
                      "x-go-type-import": {
                        "path": "github.com/lib/pq"
                      },
                      "items": {
                        "type": "string"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "accepted_by",
                        "json": "acceptedBy"
                      }
                    },
                    "roles": {
                      "type": "array",
                      "description": "Roles that the user will have when accepting the invitation. Empty means the invitation does not specify any roles.",
                      "x-go-type": "pq.StringArray",
                      "x-go-type-import": {
                        "path": "github.com/lib/pq"
                      },
                      "items": {
                        "type": "string",
                        "description": "Role identifier granted by this invitation on acceptance."
                      }
                    },
                    "teams": {
                      "type": "array",
                      "description": "Teams that the user will be added to when accepting the invitation. Empty means the invitation does not specify any teams.",
                      "x-go-type": "pq.StringArray",
                      "x-go-type-import": {
                        "path": "github.com/lib/pq"
                      },
                      "items": {
                        "type": "string",
                        "description": "Team identifier the invited user is added to on acceptance."
                      }
                    },
                    "status": {
                      "description": "Activation status of the invitation.",
                      "x-go-type": "InvitationStatus",
                      "type": "string",
                      "enum": [
                        "enabled",
                        "disabled"
                      ]
                    },
                    "createdAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the invitation was created.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "createdAt"
                      }
                    },
                    "updatedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the invitation was last updated.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updatedAt"
                      }
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the invitation was deleted, if applicable.",
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deletedAt"
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
    "/api/identity/orgs/{orgId}/users/invite": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "operationId": "handleUserInvite",
        "tags": [
          "Invitation"
        ],
        "summary": "Invite users to an organization",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
            "required": true,
            "description": "The ID of the organization.",
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
                "additionalProperties": true
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Invitation request accepted",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": true
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
    "/api/identity/users/request": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "operationId": "signupRequest",
        "tags": [
          "Invitation"
        ],
        "summary": "Create a signup request",
        "security": [],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "additionalProperties": true
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Signup request created",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": true
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
      },
      "get": {
        "x-internal": [
          "cloud"
        ],
        "operationId": "getSignupRequests",
        "tags": [
          "Invitation"
        ],
        "summary": "Get signup requests",
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
            "description": "Signup requests page",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated list of signup requests.",
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
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "description": "A signup request submitted for organization access.",
                        "additionalProperties": true
                      },
                      "description": "Signup requests returned on the current page."
                    }
                  }
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
    "/api/identity/users/request/approve": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "operationId": "approveSignupRequest",
        "tags": [
          "Invitation"
        ],
        "summary": "Approve a signup request",
        "responses": {
          "200": {
            "description": "Signup request approved",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": true
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
    "/api/identity/users/request/deny": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "operationId": "denySignupRequest",
        "tags": [
          "Invitation"
        ],
        "summary": "Deny a signup request",
        "responses": {
          "200": {
            "description": "Signup request denied",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": true
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
    "/api/identity/users/request/notification": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "operationId": "getSignupRequestNotification",
        "tags": [
          "Invitation"
        ],
        "summary": "Get signup request notification summary",
        "responses": {
          "200": {
            "description": "Signup request notification payload",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": true
                }
              }
            }
          },
          "204": {
            "description": "No pending signup request notifications"
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
    "parameters": {
      "orgId": {
        "name": "orgId",
        "in": "path",
        "required": true,
        "description": "The ID of the organization.",
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      },
      "invitationId": {
        "name": "invitationId",
        "in": "path",
        "required": true,
        "description": "The ID of the invitation.",
        "schema": {
          "type": "string",
          "format": "uuid"
        }
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
    "schemas": {
      "Uuid": {
        "type": "string",
        "format": "uuid",
        "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
        "x-go-type": "uuid.UUID",
        "x-go-type-import": {
          "path": "github.com/gofrs/uuid"
        }
      },
      "InvitationsPage": {
        "type": "object",
        "description": "Paginated list of invitations for an organization.",
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
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "additionalProperties": false,
              "description": "Invitation entity schema.",
              "required": [
                "id",
                "owner",
                "name",
                "description",
                "orgId",
                "acceptedBy",
                "emails",
                "roles",
                "teams",
                "status",
                "createdAt",
                "updatedAt",
                "deletedAt"
              ],
              "properties": {
                "id": {
                  "description": "Unique identifier for the invitation, also used as the invitation code.",
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
                "owner": {
                  "description": "ID of the user who created the invitation. Tracks who created the invitation for auditing purposes.",
                  "x-go-name": "Owner",
                  "x-oapi-codegen-extra-tags": {
                    "db": "owner",
                    "json": "owner"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "isDefault": {
                  "type": "boolean",
                  "description": "Indicates whether the invitation is a default invitation (open invite), which can be used to assign users when signing up from fqdn or custom domain. An organization can only have one default invitation.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "is_default",
                    "json": "isDefault"
                  }
                },
                "name": {
                  "type": "string",
                  "description": "Name of the invitation, which can be used to identify it. Required; cannot be an empty string.",
                  "minLength": 1,
                  "maxLength": 255
                },
                "description": {
                  "type": "string",
                  "description": "Description of the invitation, which can be used to provide additional context. Null or empty string means the invitation does not have a description.",
                  "maxLength": 5000
                },
                "emails": {
                  "type": "array",
                  "description": "Email addresses or patterns for which the invitation is valid. Null means the invitation is valid for any email address.",
                  "x-go-type": "pq.StringArray",
                  "x-go-type-import": {
                    "path": "github.com/lib/pq"
                  },
                  "items": {
                    "type": "string",
                    "pattern": "^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,}|@[a-zA-Z0-9.-]+\\.[a-z]{2,})$",
                    "description": "Exact email address or the email address pattern for which the invitation is valid.",
                    "x-go-type": "string"
                  }
                },
                "orgId": {
                  "description": "ID of the organization to which the user is invited.",
                  "x-go-name": "OrgID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "org_id",
                    "json": "orgId"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "expiresAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Timestamp when the invitation expires, if applicable. Null or empty means the invitation does not expire.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "expires_at",
                    "json": "expiresAt"
                  }
                },
                "quota": {
                  "type": "integer",
                  "description": "Quota for the invitation; limits the number of users that can accept it. Null or empty means the invitation is unlimited.",
                  "minimum": 0
                },
                "acceptedBy": {
                  "type": "array",
                  "description": "List of user ids that have already accepted the invitation. Empty means the invitation has not been used yet.",
                  "x-go-type": "pq.StringArray",
                  "x-go-type-import": {
                    "path": "github.com/lib/pq"
                  },
                  "items": {
                    "type": "string"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "accepted_by",
                    "json": "acceptedBy"
                  }
                },
                "roles": {
                  "type": "array",
                  "description": "Roles that the user will have when accepting the invitation. Empty means the invitation does not specify any roles.",
                  "x-go-type": "pq.StringArray",
                  "x-go-type-import": {
                    "path": "github.com/lib/pq"
                  },
                  "items": {
                    "type": "string",
                    "description": "Role identifier granted by this invitation on acceptance."
                  }
                },
                "teams": {
                  "type": "array",
                  "description": "Teams that the user will be added to when accepting the invitation. Empty means the invitation does not specify any teams.",
                  "x-go-type": "pq.StringArray",
                  "x-go-type-import": {
                    "path": "github.com/lib/pq"
                  },
                  "items": {
                    "type": "string",
                    "description": "Team identifier the invited user is added to on acceptance."
                  }
                },
                "status": {
                  "description": "Activation status of the invitation.",
                  "x-go-type": "InvitationStatus",
                  "type": "string",
                  "enum": [
                    "enabled",
                    "disabled"
                  ]
                },
                "createdAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Timestamp when the invitation was created.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at",
                    "json": "createdAt"
                  }
                },
                "updatedAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Timestamp when the invitation was last updated.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at",
                    "json": "updatedAt"
                  }
                },
                "deletedAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Timestamp when the invitation was deleted, if applicable.",
                  "x-go-type": "core.NullTime",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "deleted_at",
                    "json": "deletedAt"
                  }
                }
              },
              "x-go-type": "Invitation"
            },
            "description": "Invitations returned on the current page.",
            "x-oapi-codegen-extra-tags": {
              "json": "data"
            }
          }
        }
      },
      "SignupRequest": {
        "type": "object",
        "description": "A signup request submitted for organization access.",
        "additionalProperties": true
      },
      "SignupRequestsPage": {
        "type": "object",
        "description": "Paginated list of signup requests.",
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
          "data": {
            "type": "array",
            "items": {
              "type": "object",
              "description": "A signup request submitted for organization access.",
              "additionalProperties": true
            },
            "description": "Signup requests returned on the current page."
          }
        }
      },
      "InvitationPayload": {
        "type": "object",
        "description": "Payload for creating or updating an invitation.",
        "required": [
          "name",
          "description",
          "orgId",
          "emails",
          "roles",
          "teams",
          "status"
        ],
        "properties": {
          "id": {
            "x-go-name": "ID",
            "description": "Existing invitation ID for updates; omit on create.",
            "x-oapi-codegen-extra-tags": {
              "json": "id,omitempty"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "owner": {
            "description": "ID of the user who created the invitation.",
            "x-go-name": "Owner",
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
          "isDefault": {
            "type": "boolean",
            "description": "Indicates whether the invitation is a default invitation (open invite).",
            "x-oapi-codegen-extra-tags": {
              "db": "is_default",
              "json": "isDefault,omitempty"
            }
          },
          "name": {
            "type": "string",
            "description": "Name of the invitation.",
            "minLength": 1,
            "maxLength": 255
          },
          "description": {
            "type": "string",
            "description": "Description of the invitation.",
            "maxLength": 5000
          },
          "emails": {
            "type": "array",
            "x-go-type": "pq.StringArray",
            "x-go-type-import": {
              "path": "github.com/lib/pq"
            },
            "items": {
              "type": "string",
              "pattern": "^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,}|@[a-zA-Z0-9.-]+\\.[a-z]{2,})$",
              "description": "Email address or pattern that is permitted to use this invitation.",
              "x-go-type": "string"
            },
            "description": "Email addresses or patterns this invitation is valid for."
          },
          "orgId": {
            "type": "string",
            "format": "uuid",
            "description": "ID of the organization to which the user is invited.",
            "x-go-name": "OrgID",
            "x-oapi-codegen-extra-tags": {
              "db": "org_id",
              "json": "orgId"
            },
            "maxLength": 500
          },
          "expiresAt": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the invitation expires, if applicable.",
            "x-oapi-codegen-extra-tags": {
              "db": "expires_at",
              "json": "expiresAt,omitempty"
            }
          },
          "quota": {
            "type": "integer",
            "description": "Quota for the invitation; limits the number of users that can accept it.",
            "minimum": 0
          },
          "roles": {
            "type": "array",
            "x-go-type": "pq.StringArray",
            "x-go-type-import": {
              "path": "github.com/lib/pq"
            },
            "items": {
              "type": "string",
              "description": "Role identifier granted by this invitation on acceptance."
            },
            "description": "Roles that the user will have when accepting the invitation."
          },
          "teams": {
            "type": "array",
            "x-go-type": "pq.StringArray",
            "x-go-type-import": {
              "path": "github.com/lib/pq"
            },
            "items": {
              "type": "string",
              "description": "Team identifier the invited user is added to on acceptance."
            },
            "description": "Teams that the user will be added to when accepting the invitation."
          },
          "status": {
            "description": "Activation status of the invitation.",
            "x-go-type": "InvitationStatus",
            "type": "string",
            "enum": [
              "enabled",
              "disabled"
            ]
          }
        }
      },
      "InvitationStatus": {
        "type": "string",
        "enum": [
          "enabled",
          "disabled"
        ],
        "description": "Status of the invitation, where enabled means the invitation is active and can be used, disabled means the invitation is no longer valid and is temporarily inactive. Disabled invitations can be re-enabled later."
      },
      "Invitation": {
        "type": "object",
        "additionalProperties": false,
        "description": "Invitation entity schema.",
        "required": [
          "id",
          "owner",
          "name",
          "description",
          "orgId",
          "acceptedBy",
          "emails",
          "roles",
          "teams",
          "status",
          "createdAt",
          "updatedAt",
          "deletedAt"
        ],
        "properties": {
          "id": {
            "description": "Unique identifier for the invitation, also used as the invitation code.",
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
          "owner": {
            "description": "ID of the user who created the invitation. Tracks who created the invitation for auditing purposes.",
            "x-go-name": "Owner",
            "x-oapi-codegen-extra-tags": {
              "db": "owner",
              "json": "owner"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "isDefault": {
            "type": "boolean",
            "description": "Indicates whether the invitation is a default invitation (open invite), which can be used to assign users when signing up from fqdn or custom domain. An organization can only have one default invitation.",
            "x-oapi-codegen-extra-tags": {
              "db": "is_default",
              "json": "isDefault"
            }
          },
          "name": {
            "type": "string",
            "description": "Name of the invitation, which can be used to identify it. Required; cannot be an empty string.",
            "minLength": 1,
            "maxLength": 255
          },
          "description": {
            "type": "string",
            "description": "Description of the invitation, which can be used to provide additional context. Null or empty string means the invitation does not have a description.",
            "maxLength": 5000
          },
          "emails": {
            "type": "array",
            "description": "Email addresses or patterns for which the invitation is valid. Null means the invitation is valid for any email address.",
            "x-go-type": "pq.StringArray",
            "x-go-type-import": {
              "path": "github.com/lib/pq"
            },
            "items": {
              "type": "string",
              "pattern": "^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,}|@[a-zA-Z0-9.-]+\\.[a-z]{2,})$",
              "description": "Exact email address or the email address pattern for which the invitation is valid.",
              "x-go-type": "string"
            }
          },
          "orgId": {
            "description": "ID of the organization to which the user is invited.",
            "x-go-name": "OrgID",
            "x-oapi-codegen-extra-tags": {
              "db": "org_id",
              "json": "orgId"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "expiresAt": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the invitation expires, if applicable. Null or empty means the invitation does not expire.",
            "x-oapi-codegen-extra-tags": {
              "db": "expires_at",
              "json": "expiresAt"
            }
          },
          "quota": {
            "type": "integer",
            "description": "Quota for the invitation; limits the number of users that can accept it. Null or empty means the invitation is unlimited.",
            "minimum": 0
          },
          "acceptedBy": {
            "type": "array",
            "description": "List of user ids that have already accepted the invitation. Empty means the invitation has not been used yet.",
            "x-go-type": "pq.StringArray",
            "x-go-type-import": {
              "path": "github.com/lib/pq"
            },
            "items": {
              "type": "string"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "accepted_by",
              "json": "acceptedBy"
            }
          },
          "roles": {
            "type": "array",
            "description": "Roles that the user will have when accepting the invitation. Empty means the invitation does not specify any roles.",
            "x-go-type": "pq.StringArray",
            "x-go-type-import": {
              "path": "github.com/lib/pq"
            },
            "items": {
              "type": "string",
              "description": "Role identifier granted by this invitation on acceptance."
            }
          },
          "teams": {
            "type": "array",
            "description": "Teams that the user will be added to when accepting the invitation. Empty means the invitation does not specify any teams.",
            "x-go-type": "pq.StringArray",
            "x-go-type-import": {
              "path": "github.com/lib/pq"
            },
            "items": {
              "type": "string",
              "description": "Team identifier the invited user is added to on acceptance."
            }
          },
          "status": {
            "description": "Activation status of the invitation.",
            "x-go-type": "InvitationStatus",
            "type": "string",
            "enum": [
              "enabled",
              "disabled"
            ]
          },
          "createdAt": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the invitation was created.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at",
              "json": "createdAt"
            }
          },
          "updatedAt": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the invitation was last updated.",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at",
              "json": "updatedAt"
            }
          },
          "deletedAt": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the invitation was deleted, if applicable.",
            "x-go-type": "core.NullTime",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at",
              "json": "deletedAt"
            }
          }
        }
      }
    }
  }
};

export default InvitationSchema;
