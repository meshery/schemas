/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const schema = {
  "openapi": "3.0.0",
  "info": {
    "title": "invitation",
    "description": "OpenAPI schema for managing invitations",
    "version": "v1beta1"
  },
  "tags": [
    {
      "name": "Invitation",
      "description": "Operations related to invitation"
    }
  ],
  "paths": {
    "/api/organizations/invitations": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "operationId": "getInvitations",
        "tags": [
          "Invitation"
        ],
        "summary": "Get all invitations for the organization",
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "items",
                    "totalCount"
                  ],
                  "properties": {
                    "data": {
                      "type": "array",
                      "items": {
                        "x-go-type": "Invitation",
                        "type": "object",
                        "required": [
                          "id",
                          "default",
                          "email",
                          "orgId",
                          "expiresAt",
                          "quota",
                          "usedQuota",
                          "status",
                          "roles",
                          "teams",
                          "createdAt",
                          "updatedAt",
                          "deletedAt"
                        ],
                        "properties": {
                          "id": {
                            "ref": "#/components/schemas/uuid",
                            "x-go-name": "ID",
                            "description": "Unique identifier for the invitation , is also used as the invitation code"
                          },
                          "is_default": {
                            "type": "boolean",
                            "description": "Indicates whether the invitation is a default invitation, which can be used to assign users when signing up from fqdn or custom domain, a organization can only have one default invitation"
                          },
                          "email": {
                            "type": "string",
                            "format": "email",
                            "description": "Exact email address or the email address pattern for which the invitation is valid , null or empty string means the invitation is valid for all email addresses"
                          },
                          "orgId": {
                            "type": "string",
                            "description": "ID of the organization to which the user is invited"
                          },
                          "expiresAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the invitation expires, if applicable , null or empty string means the invitation does not expire"
                          },
                          "quota": {
                            "type": "integer",
                            "description": "Quota for the invitation, which can be used to limit the number of users that can accept the invitation, null or empty string means the invitation does not have a quota"
                          },
                          "usedQuota": {
                            "type": "integer",
                            "description": "Number of times the invitation has been used, null or empty string means the invitation has not been used yet"
                          },
                          "roles": {
                            "type": "array",
                            "items": {
                              "type": "string",
                              "description": "Roles that the user will have when accepting the invitation, null or empty string means the invitation does not specify any roles"
                            }
                          },
                          "teams": {
                            "type": "array",
                            "items": {
                              "type": "string",
                              "description": "Teams that the user will be added to when accepting the invitation, null or empty string means the invitation does not specify any teams"
                            }
                          },
                          "status": {
                            "type": "string",
                            "x-go-type": "InvitationStatus",
                            "enum": [
                              "enabled",
                              "disabled"
                            ],
                            "description": "Status of the invitation, where enabled means the invitation is active and can be used, disabled means the invitation is no longer valid and is temporarily inactive, disabled invitations can be re-enabled later."
                          },
                          "createdAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the invitation was created"
                          },
                          "updatedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the invitation was last updated"
                          },
                          "deletedAt": {
                            "type": "string",
                            "format": "date-time",
                            "x-go-type": "core.NullTime",
                            "description": "Timestamp when the invitation was deleted, if applicable"
                          }
                        }
                      },
                      "description": "List of invitations"
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of invitations available"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request"
          },
          "401": {
            "description": "Unauthorized"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    }
  },
  "components": {
    "parameters": {
      "organization_id": {
        "name": "organizationId",
        "in": "path",
        "required": true,
        "description": "The ID of the organization",
        "schema": {
          "type": "string"
        }
      }
    },
    "responses": {
      "400": {
        "description": "Bad Request"
      },
      "401": {
        "description": "Unauthorized"
      },
      "500": {
        "description": "Internal Server Error"
      }
    },
    "schemas": {
      "uuid": {
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
        "required": [
          "items",
          "totalCount"
        ],
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "x-go-type": "Invitation",
              "type": "object",
              "required": [
                "id",
                "default",
                "email",
                "orgId",
                "expiresAt",
                "quota",
                "usedQuota",
                "status",
                "roles",
                "teams",
                "createdAt",
                "updatedAt",
                "deletedAt"
              ],
              "properties": {
                "id": {
                  "ref": "#/components/schemas/uuid",
                  "x-go-name": "ID",
                  "description": "Unique identifier for the invitation , is also used as the invitation code"
                },
                "is_default": {
                  "type": "boolean",
                  "description": "Indicates whether the invitation is a default invitation, which can be used to assign users when signing up from fqdn or custom domain, a organization can only have one default invitation"
                },
                "email": {
                  "type": "string",
                  "format": "email",
                  "description": "Exact email address or the email address pattern for which the invitation is valid , null or empty string means the invitation is valid for all email addresses"
                },
                "orgId": {
                  "type": "string",
                  "description": "ID of the organization to which the user is invited"
                },
                "expiresAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Timestamp when the invitation expires, if applicable , null or empty string means the invitation does not expire"
                },
                "quota": {
                  "type": "integer",
                  "description": "Quota for the invitation, which can be used to limit the number of users that can accept the invitation, null or empty string means the invitation does not have a quota"
                },
                "usedQuota": {
                  "type": "integer",
                  "description": "Number of times the invitation has been used, null or empty string means the invitation has not been used yet"
                },
                "roles": {
                  "type": "array",
                  "items": {
                    "type": "string",
                    "description": "Roles that the user will have when accepting the invitation, null or empty string means the invitation does not specify any roles"
                  }
                },
                "teams": {
                  "type": "array",
                  "items": {
                    "type": "string",
                    "description": "Teams that the user will be added to when accepting the invitation, null or empty string means the invitation does not specify any teams"
                  }
                },
                "status": {
                  "type": "string",
                  "x-go-type": "InvitationStatus",
                  "enum": [
                    "enabled",
                    "disabled"
                  ],
                  "description": "Status of the invitation, where enabled means the invitation is active and can be used, disabled means the invitation is no longer valid and is temporarily inactive, disabled invitations can be re-enabled later."
                },
                "createdAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Timestamp when the invitation was created"
                },
                "updatedAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Timestamp when the invitation was last updated"
                },
                "deletedAt": {
                  "type": "string",
                  "format": "date-time",
                  "x-go-type": "core.NullTime",
                  "description": "Timestamp when the invitation was deleted, if applicable"
                }
              }
            },
            "description": "List of invitations"
          },
          "totalCount": {
            "type": "integer",
            "description": "Total number of invitations available"
          }
        }
      },
      "InvitationStatus": {
        "type": "string",
        "enum": [
          "enabled",
          "disabled"
        ],
        "description": "Status of the invitation, where enabled means the invitation is active and can be used, disabled means the invitation is no longer valid and is temporarily inactive, disabled invitations can be re-enabled later."
      },
      "Invitation": {
        "type": "object",
        "required": [
          "id",
          "default",
          "email",
          "orgId",
          "expiresAt",
          "quota",
          "usedQuota",
          "status",
          "roles",
          "teams",
          "createdAt",
          "updatedAt",
          "deletedAt"
        ],
        "properties": {
          "id": {
            "ref": "#/components/schemas/uuid",
            "x-go-name": "ID",
            "description": "Unique identifier for the invitation , is also used as the invitation code"
          },
          "is_default": {
            "type": "boolean",
            "description": "Indicates whether the invitation is a default invitation, which can be used to assign users when signing up from fqdn or custom domain, a organization can only have one default invitation"
          },
          "email": {
            "type": "string",
            "format": "email",
            "description": "Exact email address or the email address pattern for which the invitation is valid , null or empty string means the invitation is valid for all email addresses"
          },
          "orgId": {
            "type": "string",
            "description": "ID of the organization to which the user is invited"
          },
          "expiresAt": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the invitation expires, if applicable , null or empty string means the invitation does not expire"
          },
          "quota": {
            "type": "integer",
            "description": "Quota for the invitation, which can be used to limit the number of users that can accept the invitation, null or empty string means the invitation does not have a quota"
          },
          "usedQuota": {
            "type": "integer",
            "description": "Number of times the invitation has been used, null or empty string means the invitation has not been used yet"
          },
          "roles": {
            "type": "array",
            "items": {
              "type": "string",
              "description": "Roles that the user will have when accepting the invitation, null or empty string means the invitation does not specify any roles"
            }
          },
          "teams": {
            "type": "array",
            "items": {
              "type": "string",
              "description": "Teams that the user will be added to when accepting the invitation, null or empty string means the invitation does not specify any teams"
            }
          },
          "status": {
            "type": "string",
            "x-go-type": "InvitationStatus",
            "enum": [
              "enabled",
              "disabled"
            ],
            "description": "Status of the invitation, where enabled means the invitation is active and can be used, disabled means the invitation is no longer valid and is temporarily inactive, disabled invitations can be re-enabled later."
          },
          "createdAt": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the invitation was created"
          },
          "updatedAt": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the invitation was last updated"
          },
          "deletedAt": {
            "type": "string",
            "format": "date-time",
            "x-go-type": "core.NullTime",
            "description": "Timestamp when the invitation was deleted, if applicable"
          }
        }
      }
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
};

export default schema;
