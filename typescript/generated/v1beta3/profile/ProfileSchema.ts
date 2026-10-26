/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const ProfileSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Profile",
    "description": "OpenAPI schema for profiles: publishing or persona profiles owned by an\norganization and assigned to workspaces. A profile here is not the user\naccount profile (`/api/identity/users/profile`) and not a performance\nprofile (`/api/performance/profiles`).\nWorkspaces: like an environment, a profile can be assigned to any number\nof workspaces through `/api/workspaces/{workspaceId}/profiles`, and that\nassignment is how access to it is granted.\nRead access: a profile is visible to its owner, to organization admins,\nand to members of the workspaces it is assigned to. The owner sees their\nown profile whether or not it is assigned to any workspace. Organization\nadmins and workspace members also need Workspace Management / Profiles:\nView Profiles. Provider admins do not see profiles automatically. Seeing\na profile does not grant access to its linked connections, which keep\ntheir own access rules.\nWrite access: Create Profile, Edit Profile and Delete Profile. Edit\nProfile also governs linking and unlinking the profile's connections and\ntransferring its owner; the owner may always edit their own profile.\nAccounts: the platform accounts a profile acts through are existing\nConnections, linked by a profile-to-connection mapping that mirrors the\nenvironment-to-connection mapping.\nA caller without the required key receives a 403. An id that does not name\na live profile the caller can see receives a 404, whether it does not\nexist or belongs to another organization or workspace.\n",
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
      "url": "https://cloud.meshery.io",
      "description": "Meshery Cloud production server URL"
    },
    {
      "url": "https://staging-cloud.meshery.io",
      "description": "Meshery Cloud staging server URL"
    },
    {
      "url": "http://localhost:9876",
      "description": "Meshery Cloud development server URL (controlled via PORT environment variable)"
    }
  ],
  "security": [
    {
      "jwt": []
    }
  ],
  "tags": [
    {
      "name": "profiles",
      "description": "APIs for profiles."
    }
  ],
  "paths": {
    "/api/profiles": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "profiles"
        ],
        "operationId": "createProfile",
        "summary": "Create a profile",
        "description": "Creates a profile in the organization named by `organizationId`. The server assigns `id` and the timestamps; `owner` defaults to the authenticated user. Names are not unique.",
        "requestBody": {
          "description": "Body for creating or updating a profile",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for creating or updating a profile. Carries only the client-settable fields. `id`, `createdAt`, `updatedAt` and `deletedAt` are server-owned and deliberately absent. `owner` is optional: omitted on create it defaults to the authenticated user, and omitted on update it is unchanged.",
                "required": [
                  "name",
                  "organizationId"
                ],
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "Name of the profile, typically its short handle. Not unique.",
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "description": {
                    "type": "string",
                    "description": "Description of the profile.",
                    "maxLength": 1000,
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "description,omitempty"
                    }
                  },
                  "organizationId": {
                    "description": "Organization in which to create the profile. Cannot change after creation.",
                    "x-go-name": "OrganizationID",
                    "x-go-type-skip-optional-pointer": true,
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  },
                  "owner": {
                    "description": "ID of the user who owns the profile. Only the owner or a holder of Edit Profile in a workspace the profile is assigned to may change it.",
                    "x-oapi-codegen-extra-tags": {
                      "json": "owner,omitempty"
                    },
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  },
                  "userId": {
                    "description": "ID of the user this profile represents, when it represents a user. The user must be a member of the organization.",
                    "x-go-name": "UserID",
                    "x-oapi-codegen-extra-tags": {
                      "json": "userId,omitempty"
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
                    "description": "Free-form settings of the profile.",
                    "additionalProperties": true,
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "metadata,omitempty"
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Created profile",
            "content": {
              "application/json": {
                "schema": {
                  "$id": "https://schemas.meshery.io/profile.yaml",
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Profile",
                  "description": "A profile is a publishing or persona profile: a named set of settings, owned by an organization, that a person or brand publishes as, with the platform accounts it acts through linked to it as Connections. It is not the user account profile (`/api/identity/users/profile`) and not a performance profile (`/api/performance/profiles`), and it is neither an environment nor a workspace. Like environments, a profile is assigned to any number of workspaces, and workspace assignment is how access to it is shared: a profile is readable by its owner (whether or not it is assigned to any workspace), by organization admins, and by members of the workspaces it is assigned to. Provider admins do not see profiles automatically, and seeing a profile does not grant access to its linked connections.",
                  "additionalProperties": false,
                  "type": "object",
                  "example": {
                    "id": "00000000-0000-0000-0000-000000000000",
                    "schemaVersion": "profiles.meshery.io/v1beta3",
                    "name": "jane",
                    "description": "Profile for Jane's accounts and settings.",
                    "organizationId": "00000000-0000-0000-0000-000000000000",
                    "owner": "00000000-0000-0000-0000-000000000000",
                    "userId": "00000000-0000-0000-0000-000000000000",
                    "metadata": {},
                    "createdAt": "0001-01-01T00:00:00Z",
                    "updatedAt": "0001-01-01T00:00:00Z",
                    "deletedAt": null
                  },
                  "required": [
                    "id",
                    "schemaVersion",
                    "name",
                    "organizationId",
                    "owner",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Server-generated profile ID.",
                      "x-order": 1,
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
                    "schemaVersion": {
                      "description": "Specifies the version of the schema to which the profile conforms.",
                      "x-order": 2,
                      "x-oapi-codegen-extra-tags": {
                        "json": "schemaVersion",
                        "db": "-",
                        "gorm": "-"
                      },
                      "default": "profiles.meshery.io/v1beta3",
                      "type": "string",
                      "minLength": 2,
                      "maxLength": 100,
                      "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+(alpha[0-9]*|beta[0-9]*|rc[0-9]*)?)([.-][a-z0-9]+)*$",
                      "example": [
                        "v1",
                        "v1alpha1",
                        "v2beta3",
                        "v1.custom-suffix",
                        "models.meshery.io/v1beta1",
                        "capability.meshery.io/v1alpha1"
                      ]
                    },
                    "name": {
                      "type": "string",
                      "description": "Name of the profile, typically its short handle. Not unique; like environment names, two profiles may share one.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-order": 3,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name",
                        "json": "name"
                      }
                    },
                    "description": {
                      "type": "string",
                      "description": "Description of the profile.",
                      "maxLength": 1000,
                      "x-order": 5,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "description",
                        "json": "description,omitempty"
                      }
                    },
                    "organizationId": {
                      "description": "Owning organization ID. Fixed at creation.",
                      "x-order": 6,
                      "x-go-name": "OrganizationID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "organization_id",
                        "json": "organizationId"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "owner": {
                      "description": "ID of the user who owns the profile. Defaults to the creating user. The owner, or a holder of the Edit Profile key in a workspace the profile is assigned to, may transfer it. When the owner's account is deleted, ownership passes on by the same succession rule that applies to designs.",
                      "x-order": 7,
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
                    "userId": {
                      "description": "ID of the user this profile represents, when it represents a user. Absent for a profile that represents no user account, such as a brand. Not unique: a user may be represented by more than one profile.",
                      "x-order": 8,
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
                    "metadata": {
                      "type": "object",
                      "description": "Free-form settings of the profile, stored as a JSON blob.",
                      "x-order": 9,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata",
                        "json": "metadata"
                      }
                    },
                    "createdAt": {
                      "description": "Timestamp when the profile was created.",
                      "x-order": 10,
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "createdAt"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp when the profile was last updated.",
                      "x-order": 11,
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updatedAt"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "description": "Timestamp when the profile was soft-deleted. Null while the profile remains active.",
                      "nullable": true,
                      "x-order": 12,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "name": "core",
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deletedAt,omitempty"
                      },
                      "type": "string",
                      "format": "date-time",
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
      },
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "profiles"
        ],
        "operationId": "getProfiles",
        "summary": "Get all profiles",
        "description": "Gets the live profiles the caller can see: those the caller owns (including profiles assigned to no workspace), those assigned to a workspace the caller is a member of, and, for organization admins, every profile of the organization. Provider admins are not granted visibility automatically. `search` matches the name or description case-insensitively.",
        "parameters": [
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
            "name": "pagesize",
            "in": "query",
            "description": "Get responses by pagesize. Deprecated alias of pageSize.",
            "deprecated": true,
            "schema": {
              "type": "integer",
              "minimum": 1
            }
          },
          {
            "name": "orgId",
            "in": "query",
            "description": "Organization ID used to scope the listing. Defaults to the organization the session resolved to.",
            "required": false,
            "schema": {
              "type": "string",
              "format": "uuid",
              "maxLength": 36
            }
          },
          {
            "name": "userId",
            "in": "query",
            "description": "Return only the profile that represents this user.",
            "required": false,
            "schema": {
              "type": "string",
              "format": "uuid",
              "maxLength": 36
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Profiles",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated list of profiles.",
                  "required": [
                    "page",
                    "pageSize",
                    "totalCount",
                    "profiles"
                  ],
                  "properties": {
                    "page": {
                      "type": "integer",
                      "description": "Zero-based page index returned in this response.",
                      "minimum": 0
                    },
                    "pageSize": {
                      "type": "integer",
                      "description": "Maximum number of items returned on each page.",
                      "minimum": 1
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of items across all pages.",
                      "minimum": 0
                    },
                    "profiles": {
                      "type": "array",
                      "description": "Profiles in this page.",
                      "x-go-type-skip-optional-pointer": true,
                      "items": {
                        "$id": "https://schemas.meshery.io/profile.yaml",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "title": "Profile",
                        "description": "A profile is a publishing or persona profile: a named set of settings, owned by an organization, that a person or brand publishes as, with the platform accounts it acts through linked to it as Connections. It is not the user account profile (`/api/identity/users/profile`) and not a performance profile (`/api/performance/profiles`), and it is neither an environment nor a workspace. Like environments, a profile is assigned to any number of workspaces, and workspace assignment is how access to it is shared: a profile is readable by its owner (whether or not it is assigned to any workspace), by organization admins, and by members of the workspaces it is assigned to. Provider admins do not see profiles automatically, and seeing a profile does not grant access to its linked connections.",
                        "additionalProperties": false,
                        "type": "object",
                        "example": {
                          "id": "00000000-0000-0000-0000-000000000000",
                          "schemaVersion": "profiles.meshery.io/v1beta3",
                          "name": "jane",
                          "description": "Profile for Jane's accounts and settings.",
                          "organizationId": "00000000-0000-0000-0000-000000000000",
                          "owner": "00000000-0000-0000-0000-000000000000",
                          "userId": "00000000-0000-0000-0000-000000000000",
                          "metadata": {},
                          "createdAt": "0001-01-01T00:00:00Z",
                          "updatedAt": "0001-01-01T00:00:00Z",
                          "deletedAt": null
                        },
                        "required": [
                          "id",
                          "schemaVersion",
                          "name",
                          "organizationId",
                          "owner",
                          "createdAt",
                          "updatedAt"
                        ],
                        "properties": {
                          "id": {
                            "description": "Server-generated profile ID.",
                            "x-order": 1,
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
                          "schemaVersion": {
                            "description": "Specifies the version of the schema to which the profile conforms.",
                            "x-order": 2,
                            "x-oapi-codegen-extra-tags": {
                              "json": "schemaVersion",
                              "db": "-",
                              "gorm": "-"
                            },
                            "default": "profiles.meshery.io/v1beta3",
                            "type": "string",
                            "minLength": 2,
                            "maxLength": 100,
                            "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+(alpha[0-9]*|beta[0-9]*|rc[0-9]*)?)([.-][a-z0-9]+)*$",
                            "example": [
                              "v1",
                              "v1alpha1",
                              "v2beta3",
                              "v1.custom-suffix",
                              "models.meshery.io/v1beta1",
                              "capability.meshery.io/v1alpha1"
                            ]
                          },
                          "name": {
                            "type": "string",
                            "description": "Name of the profile, typically its short handle. Not unique; like environment names, two profiles may share one.",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-order": 3,
                            "x-oapi-codegen-extra-tags": {
                              "db": "name",
                              "json": "name"
                            }
                          },
                          "description": {
                            "type": "string",
                            "description": "Description of the profile.",
                            "maxLength": 1000,
                            "x-order": 5,
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "description",
                              "json": "description,omitempty"
                            }
                          },
                          "organizationId": {
                            "description": "Owning organization ID. Fixed at creation.",
                            "x-order": 6,
                            "x-go-name": "OrganizationID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "organization_id",
                              "json": "organizationId"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "owner": {
                            "description": "ID of the user who owns the profile. Defaults to the creating user. The owner, or a holder of the Edit Profile key in a workspace the profile is assigned to, may transfer it. When the owner's account is deleted, ownership passes on by the same succession rule that applies to designs.",
                            "x-order": 7,
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
                          "userId": {
                            "description": "ID of the user this profile represents, when it represents a user. Absent for a profile that represents no user account, such as a brand. Not unique: a user may be represented by more than one profile.",
                            "x-order": 8,
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
                          "metadata": {
                            "type": "object",
                            "description": "Free-form settings of the profile, stored as a JSON blob.",
                            "x-order": 9,
                            "x-go-type": "core.Map",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "metadata",
                              "json": "metadata"
                            }
                          },
                          "createdAt": {
                            "description": "Timestamp when the profile was created.",
                            "x-order": 10,
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "json": "createdAt"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp when the profile was last updated.",
                            "x-order": 11,
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "json": "updatedAt"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deletedAt": {
                            "description": "Timestamp when the profile was soft-deleted. Null while the profile remains active.",
                            "nullable": true,
                            "x-order": 12,
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "name": "core",
                              "path": "github.com/meshery/schemas/models/core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "json": "deletedAt,omitempty"
                            },
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          }
                        },
                        "x-go-type": "Profile"
                      }
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
    },
    "/api/profiles/{profileId}": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "profiles"
        ],
        "operationId": "getProfileById",
        "summary": "Get profile by ID",
        "description": "Gets a profile visible to the caller: its owner (whether or not the profile is assigned to any workspace), an organization admin, or a member of a workspace it is assigned to. Provider admins are not granted visibility automatically. A profile the caller cannot see returns 404. Seeing the profile does not grant access to its linked connections.",
        "parameters": [
          {
            "name": "profileId",
            "in": "path",
            "description": "Profile ID",
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
            "description": "Profile",
            "content": {
              "application/json": {
                "schema": {
                  "$id": "https://schemas.meshery.io/profile.yaml",
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Profile",
                  "description": "A profile is a publishing or persona profile: a named set of settings, owned by an organization, that a person or brand publishes as, with the platform accounts it acts through linked to it as Connections. It is not the user account profile (`/api/identity/users/profile`) and not a performance profile (`/api/performance/profiles`), and it is neither an environment nor a workspace. Like environments, a profile is assigned to any number of workspaces, and workspace assignment is how access to it is shared: a profile is readable by its owner (whether or not it is assigned to any workspace), by organization admins, and by members of the workspaces it is assigned to. Provider admins do not see profiles automatically, and seeing a profile does not grant access to its linked connections.",
                  "additionalProperties": false,
                  "type": "object",
                  "example": {
                    "id": "00000000-0000-0000-0000-000000000000",
                    "schemaVersion": "profiles.meshery.io/v1beta3",
                    "name": "jane",
                    "description": "Profile for Jane's accounts and settings.",
                    "organizationId": "00000000-0000-0000-0000-000000000000",
                    "owner": "00000000-0000-0000-0000-000000000000",
                    "userId": "00000000-0000-0000-0000-000000000000",
                    "metadata": {},
                    "createdAt": "0001-01-01T00:00:00Z",
                    "updatedAt": "0001-01-01T00:00:00Z",
                    "deletedAt": null
                  },
                  "required": [
                    "id",
                    "schemaVersion",
                    "name",
                    "organizationId",
                    "owner",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Server-generated profile ID.",
                      "x-order": 1,
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
                    "schemaVersion": {
                      "description": "Specifies the version of the schema to which the profile conforms.",
                      "x-order": 2,
                      "x-oapi-codegen-extra-tags": {
                        "json": "schemaVersion",
                        "db": "-",
                        "gorm": "-"
                      },
                      "default": "profiles.meshery.io/v1beta3",
                      "type": "string",
                      "minLength": 2,
                      "maxLength": 100,
                      "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+(alpha[0-9]*|beta[0-9]*|rc[0-9]*)?)([.-][a-z0-9]+)*$",
                      "example": [
                        "v1",
                        "v1alpha1",
                        "v2beta3",
                        "v1.custom-suffix",
                        "models.meshery.io/v1beta1",
                        "capability.meshery.io/v1alpha1"
                      ]
                    },
                    "name": {
                      "type": "string",
                      "description": "Name of the profile, typically its short handle. Not unique; like environment names, two profiles may share one.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-order": 3,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name",
                        "json": "name"
                      }
                    },
                    "description": {
                      "type": "string",
                      "description": "Description of the profile.",
                      "maxLength": 1000,
                      "x-order": 5,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "description",
                        "json": "description,omitempty"
                      }
                    },
                    "organizationId": {
                      "description": "Owning organization ID. Fixed at creation.",
                      "x-order": 6,
                      "x-go-name": "OrganizationID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "organization_id",
                        "json": "organizationId"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "owner": {
                      "description": "ID of the user who owns the profile. Defaults to the creating user. The owner, or a holder of the Edit Profile key in a workspace the profile is assigned to, may transfer it. When the owner's account is deleted, ownership passes on by the same succession rule that applies to designs.",
                      "x-order": 7,
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
                    "userId": {
                      "description": "ID of the user this profile represents, when it represents a user. Absent for a profile that represents no user account, such as a brand. Not unique: a user may be represented by more than one profile.",
                      "x-order": 8,
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
                    "metadata": {
                      "type": "object",
                      "description": "Free-form settings of the profile, stored as a JSON blob.",
                      "x-order": 9,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata",
                        "json": "metadata"
                      }
                    },
                    "createdAt": {
                      "description": "Timestamp when the profile was created.",
                      "x-order": 10,
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "createdAt"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp when the profile was last updated.",
                      "x-order": 11,
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updatedAt"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "description": "Timestamp when the profile was soft-deleted. Null while the profile remains active.",
                      "nullable": true,
                      "x-order": 12,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "name": "core",
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deletedAt,omitempty"
                      },
                      "type": "string",
                      "format": "date-time",
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
      },
      "put": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "profiles"
        ],
        "operationId": "updateProfile",
        "summary": "Update a profile",
        "description": "Replaces the client-settable fields of the profile. `organizationId` cannot change after creation; a different value is refused with 400. Changing `owner` transfers the profile; the new owner must be a member of the organization.",
        "parameters": [
          {
            "name": "profileId",
            "in": "path",
            "description": "Profile ID",
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
        "requestBody": {
          "description": "Body for creating or updating a profile",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for creating or updating a profile. Carries only the client-settable fields. `id`, `createdAt`, `updatedAt` and `deletedAt` are server-owned and deliberately absent. `owner` is optional: omitted on create it defaults to the authenticated user, and omitted on update it is unchanged.",
                "required": [
                  "name",
                  "organizationId"
                ],
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "Name of the profile, typically its short handle. Not unique.",
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "description": {
                    "type": "string",
                    "description": "Description of the profile.",
                    "maxLength": 1000,
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "description,omitempty"
                    }
                  },
                  "organizationId": {
                    "description": "Organization in which to create the profile. Cannot change after creation.",
                    "x-go-name": "OrganizationID",
                    "x-go-type-skip-optional-pointer": true,
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  },
                  "owner": {
                    "description": "ID of the user who owns the profile. Only the owner or a holder of Edit Profile in a workspace the profile is assigned to may change it.",
                    "x-oapi-codegen-extra-tags": {
                      "json": "owner,omitempty"
                    },
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  },
                  "userId": {
                    "description": "ID of the user this profile represents, when it represents a user. The user must be a member of the organization.",
                    "x-go-name": "UserID",
                    "x-oapi-codegen-extra-tags": {
                      "json": "userId,omitempty"
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
                    "description": "Free-form settings of the profile.",
                    "additionalProperties": true,
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "metadata,omitempty"
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Updated profile",
            "content": {
              "application/json": {
                "schema": {
                  "$id": "https://schemas.meshery.io/profile.yaml",
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Profile",
                  "description": "A profile is a publishing or persona profile: a named set of settings, owned by an organization, that a person or brand publishes as, with the platform accounts it acts through linked to it as Connections. It is not the user account profile (`/api/identity/users/profile`) and not a performance profile (`/api/performance/profiles`), and it is neither an environment nor a workspace. Like environments, a profile is assigned to any number of workspaces, and workspace assignment is how access to it is shared: a profile is readable by its owner (whether or not it is assigned to any workspace), by organization admins, and by members of the workspaces it is assigned to. Provider admins do not see profiles automatically, and seeing a profile does not grant access to its linked connections.",
                  "additionalProperties": false,
                  "type": "object",
                  "example": {
                    "id": "00000000-0000-0000-0000-000000000000",
                    "schemaVersion": "profiles.meshery.io/v1beta3",
                    "name": "jane",
                    "description": "Profile for Jane's accounts and settings.",
                    "organizationId": "00000000-0000-0000-0000-000000000000",
                    "owner": "00000000-0000-0000-0000-000000000000",
                    "userId": "00000000-0000-0000-0000-000000000000",
                    "metadata": {},
                    "createdAt": "0001-01-01T00:00:00Z",
                    "updatedAt": "0001-01-01T00:00:00Z",
                    "deletedAt": null
                  },
                  "required": [
                    "id",
                    "schemaVersion",
                    "name",
                    "organizationId",
                    "owner",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Server-generated profile ID.",
                      "x-order": 1,
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
                    "schemaVersion": {
                      "description": "Specifies the version of the schema to which the profile conforms.",
                      "x-order": 2,
                      "x-oapi-codegen-extra-tags": {
                        "json": "schemaVersion",
                        "db": "-",
                        "gorm": "-"
                      },
                      "default": "profiles.meshery.io/v1beta3",
                      "type": "string",
                      "minLength": 2,
                      "maxLength": 100,
                      "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+(alpha[0-9]*|beta[0-9]*|rc[0-9]*)?)([.-][a-z0-9]+)*$",
                      "example": [
                        "v1",
                        "v1alpha1",
                        "v2beta3",
                        "v1.custom-suffix",
                        "models.meshery.io/v1beta1",
                        "capability.meshery.io/v1alpha1"
                      ]
                    },
                    "name": {
                      "type": "string",
                      "description": "Name of the profile, typically its short handle. Not unique; like environment names, two profiles may share one.",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-order": 3,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name",
                        "json": "name"
                      }
                    },
                    "description": {
                      "type": "string",
                      "description": "Description of the profile.",
                      "maxLength": 1000,
                      "x-order": 5,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "description",
                        "json": "description,omitempty"
                      }
                    },
                    "organizationId": {
                      "description": "Owning organization ID. Fixed at creation.",
                      "x-order": 6,
                      "x-go-name": "OrganizationID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "organization_id",
                        "json": "organizationId"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "owner": {
                      "description": "ID of the user who owns the profile. Defaults to the creating user. The owner, or a holder of the Edit Profile key in a workspace the profile is assigned to, may transfer it. When the owner's account is deleted, ownership passes on by the same succession rule that applies to designs.",
                      "x-order": 7,
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
                    "userId": {
                      "description": "ID of the user this profile represents, when it represents a user. Absent for a profile that represents no user account, such as a brand. Not unique: a user may be represented by more than one profile.",
                      "x-order": 8,
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
                    "metadata": {
                      "type": "object",
                      "description": "Free-form settings of the profile, stored as a JSON blob.",
                      "x-order": 9,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata",
                        "json": "metadata"
                      }
                    },
                    "createdAt": {
                      "description": "Timestamp when the profile was created.",
                      "x-order": 10,
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "createdAt"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp when the profile was last updated.",
                      "x-order": 11,
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updatedAt"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "description": "Timestamp when the profile was soft-deleted. Null while the profile remains active.",
                      "nullable": true,
                      "x-order": 12,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "name": "core",
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deletedAt,omitempty"
                      },
                      "type": "string",
                      "format": "date-time",
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
      },
      "delete": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "profiles"
        ],
        "operationId": "deleteProfile",
        "summary": "Delete a profile",
        "description": "Soft-deletes the profile and removes its workspace assignments and connection links. The linked connections themselves are left intact.",
        "parameters": [
          {
            "name": "profileId",
            "in": "path",
            "description": "Profile ID",
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
          "204": {
            "description": "Profile deleted"
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
    },
    "/api/profiles/{profileId}/connections": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "profiles"
        ],
        "operationId": "getProfileConnections",
        "summary": "Get profile connections",
        "description": "Gets the connections linked to a profile visible to the caller: its owner (whether or not the profile is assigned to any workspace), an organization admin, or a member of a workspace it is assigned to. The owner needs no permission key; organization admins and workspace members also need View Profiles. Provider admins are not granted visibility automatically. A profile the caller cannot see returns 404. Seeing the profile does not grant access to its linked connections, which follow their own access rules.",
        "parameters": [
          {
            "name": "profileId",
            "in": "path",
            "description": "Profile ID",
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
            "name": "pagesize",
            "in": "query",
            "description": "Get responses by pagesize. Deprecated alias of pageSize.",
            "deprecated": true,
            "schema": {
              "type": "integer",
              "minimum": 1
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Profile connections",
            "content": {
              "application/json": {
                "schema": {
                  "description": "Represents a page of connections with meta information about connections count",
                  "additionalProperties": false,
                  "type": "object",
                  "required": [
                    "connections",
                    "totalCount",
                    "page",
                    "pageSize"
                  ],
                  "properties": {
                    "connections": {
                      "type": "array",
                      "description": "List of connections on this page",
                      "x-go-type": "[]*Connection",
                      "items": {
                        "$id": "https://schemas.meshery.io/connection.yaml",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "description": "Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections",
                        "additionalProperties": false,
                        "type": "object",
                        "required": [
                          "id",
                          "schemaVersion",
                          "name",
                          "type",
                          "subType",
                          "kind",
                          "status",
                          "organizationId"
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
                            "x-order": 1,
                            "x-go-name": "ID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "id"
                            }
                          },
                          "name": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "name"
                            },
                            "x-order": 2,
                            "type": "string",
                            "description": "Connection Name",
                            "minLength": 1,
                            "maxLength": 255
                          },
                          "description": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "description",
                              "json": "description,omitempty"
                            },
                            "x-order": 3,
                            "type": "string",
                            "description": "Human-readable description of the connection and its purpose.",
                            "maxLength": 1000
                          },
                          "url": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "url",
                              "json": "url,omitempty"
                            },
                            "x-order": 4,
                            "type": "string",
                            "format": "uri",
                            "description": "URL of the remote resource this connection points to (e.g. the Helm repository URL, the Kubernetes API server endpoint, the Grafana instance URL).",
                            "maxLength": 2048
                          },
                          "credentialId": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-go-name": "CredentialID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "credential_id",
                              "json": "credentialId"
                            },
                            "x-order": 5
                          },
                          "type": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "type",
                              "json": "type",
                              "yaml": "type"
                            },
                            "x-go-name": "ConnectionType",
                            "x-order": 6,
                            "type": "string",
                            "description": "Connection Type (platform, telemetry, collaboration)",
                            "maxLength": 255
                          },
                          "subType": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "sub_type",
                              "json": "subType"
                            },
                            "x-order": 7,
                            "type": "string",
                            "description": "Connection Subtype (cloud, identity, metrics, chat, git, orchestration)",
                            "maxLength": 255
                          },
                          "kind": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "kind"
                            },
                            "x-order": 8,
                            "type": "string",
                            "description": "Connection Kind (meshery, kubernetes, prometheus, grafana, gke, aws, azure, slack, github, desktop)",
                            "maxLength": 255
                          },
                          "modelReference": {
                            "x-go-type": "modelv1beta1.ModelReference",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/v1beta1/model",
                              "name": "modelv1beta1"
                            },
                            "x-order": 8,
                            "description": "Reference to the specific registered model to which the component belongs and from which model version, category, and other properties may be referenced. Learn more at https://docs.meshery.io/concepts/models",
                            "x-oapi-codegen-extra-tags": {
                              "gorm": "model_reference",
                              "db": "model_reference",
                              "json": "modelReference",
                              "yaml": "modelReference"
                            },
                            "x-generate-db-helpers": true,
                            "type": "object",
                            "required": [
                              "id",
                              "name",
                              "version",
                              "displayName",
                              "model",
                              "registrant"
                            ],
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
                                "description": "The unique name for the model within the scope of a registrant.",
                                "pattern": "^[a-z0-9-]+$",
                                "examples": [
                                  "cert-manager"
                                ]
                              },
                              "version": {
                                "description": "Version of the model definition.",
                                "type": "string",
                                "minLength": 5,
                                "maxLength": 100,
                                "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                              },
                              "displayName": {
                                "type": "string",
                                "description": "Human-readable name for the model.",
                                "minLength": 1,
                                "maxLength": 100,
                                "pattern": "^[a-zA-Z0-9 ]+$",
                                "examples": [
                                  "Cert Manager"
                                ]
                              },
                              "model": {
                                "type": "object",
                                "description": "Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31).",
                                "required": [
                                  "version"
                                ],
                                "properties": {
                                  "version": {
                                    "description": "Version of the model as defined by the registrant.",
                                    "x-oapi-codegen-extra-tags": {
                                      "json": "version"
                                    },
                                    "x-order": 1,
                                    "type": "string",
                                    "minLength": 5,
                                    "maxLength": 100,
                                    "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                                  }
                                }
                              },
                              "registrant": {
                                "x-go-type": "RegistrantReference",
                                "x-oapi-codegen-extra-tags": {
                                  "json": "registrant"
                                },
                                "type": "object",
                                "required": [
                                  "kind"
                                ],
                                "properties": {
                                  "kind": {
                                    "type": "string",
                                    "description": "Kind of the registrant.",
                                    "maxLength": 255
                                  }
                                }
                              }
                            }
                          },
                          "metadata": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "metadata"
                            },
                            "x-order": 9,
                            "x-go-type": "core.Map",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "type": "object",
                            "description": "Additional connection metadata"
                          },
                          "credentialSchema": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "credential_schema"
                            },
                            "x-order": 9,
                            "x-go-type": "core.Map",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "type": "object",
                            "description": "Schema for the credential Associated with the connection"
                          },
                          "connectionSchema": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "connection_schema"
                            },
                            "x-order": 9,
                            "x-go-type": "core.Map",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "type": "object",
                            "description": "Schema for the connection"
                          },
                          "styles": {
                            "x-oapi-codegen-extra-tags": {
                              "gorm": "type:bytes;serializer:json",
                              "db": "-",
                              "yaml": "styles",
                              "json": "styles"
                            },
                            "x-go-type": "core.ComponentStyles",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-order": 17,
                            "description": "Visualization styles for the connection, including svgColor and svgWhite used for UI representation.",
                            "type": "object",
                            "required": [
                              "shape",
                              "primaryColor",
                              "svgColor",
                              "svgWhite",
                              "svgComplete"
                            ],
                            "allOf": [
                              {
                                "type": "object",
                                "description": "Common styles for all entities",
                                "additionalProperties": true,
                                "required": [
                                  "primaryColor",
                                  "svgColor",
                                  "svgWhite",
                                  "svgComplete"
                                ],
                                "properties": {
                                  "primaryColor": {
                                    "type": "string",
                                    "description": "Primary color of the component used for UI representation.",
                                    "maxLength": 500
                                  },
                                  "secondaryColor": {
                                    "type": "string",
                                    "description": "Secondary color of the entity used for UI representation.",
                                    "maxLength": 500
                                  },
                                  "svgWhite": {
                                    "type": "string",
                                    "description": "White SVG of the entity used for UI representation on dark background.",
                                    "maxLength": 500
                                  },
                                  "svgColor": {
                                    "type": "string",
                                    "description": "Colored SVG of the entity used for UI representation on light background.",
                                    "maxLength": 500
                                  },
                                  "svgComplete": {
                                    "type": "string",
                                    "description": "Complete SVG of the entity used for UI representation, often inclusive of background.",
                                    "maxLength": 500
                                  },
                                  "color": {
                                    "type": "string",
                                    "description": "The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g.",
                                    "maxLength": 500
                                  },
                                  "textOpacity": {
                                    "type": "number",
                                    "description": "The opacity of the label text, including its outline.",
                                    "minimum": 0,
                                    "maximum": 1
                                  },
                                  "fontFamily": {
                                    "type": "string",
                                    "description": "A comma-separated list of font names to use on the label text.",
                                    "maxLength": 500
                                  },
                                  "fontSize": {
                                    "type": "string",
                                    "description": "The size of the label text.",
                                    "maxLength": 500
                                  },
                                  "fontStyle": {
                                    "type": "string",
                                    "description": "A CSS font style to be applied to the label text.",
                                    "maxLength": 500
                                  },
                                  "fontWeight": {
                                    "type": "string",
                                    "description": "A CSS font weight to be applied to the label text.",
                                    "maxLength": 500
                                  },
                                  "textTransform": {
                                    "type": "string",
                                    "description": "A transformation to apply to the label text",
                                    "enum": [
                                      "none",
                                      "uppercase",
                                      "lowercase"
                                    ]
                                  },
                                  "opacity": {
                                    "type": "number",
                                    "description": "The opacity of the element, ranging from 0 to 1. Note that the opacity of a compound node parent affects the effective opacity of its children.",
                                    "minimum": 0,
                                    "maximum": 1
                                  },
                                  "zIndex": {
                                    "type": "integer",
                                    "description": "An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index.",
                                    "minimum": 0
                                  },
                                  "label": {
                                    "type": "string",
                                    "description": "The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id",
                                    "maxLength": 500
                                  },
                                  "animation": {
                                    "type": "object",
                                    "description": "The animation to apply to the element. example ripple,bounce,etc"
                                  }
                                }
                              },
                              {
                                "type": "object",
                                "properties": {
                                  "shape": {
                                    "type": "string",
                                    "description": "The shape of the node's body. Note that each shape fits within the specified width and height, and so you may have to adjust width and height if you desire an equilateral shape (i.e. width !== height for several equilateral shapes)",
                                    "enum": [
                                      "ellipse",
                                      "triangle",
                                      "round-triangle",
                                      "rectangle",
                                      "round-rectangle",
                                      "bottom-round-rectangle",
                                      "cut-rectangle",
                                      "barrel",
                                      "rhomboid",
                                      "diamond",
                                      "round-diamond",
                                      "pentagon",
                                      "round-pentagon",
                                      "hexagon",
                                      "round-hexagon",
                                      "concave-hexagon",
                                      "heptagon",
                                      "round-heptagon",
                                      "octagon",
                                      "round-octagon",
                                      "star",
                                      "tag",
                                      "round-tag",
                                      "vee",
                                      "polygon"
                                    ]
                                  },
                                  "position": {
                                    "type": "object",
                                    "additionalProperties": false,
                                    "required": [
                                      "x",
                                      "y"
                                    ],
                                    "description": "The position of the node. If the position is set, the node is drawn at that position in the given dimensions. If the position is not set, the node is drawn at a random position.",
                                    "properties": {
                                      "x": {
                                        "type": "number",
                                        "description": "The x-coordinate of the node.",
                                        "minimum": -1000000,
                                        "maximum": 1000000,
                                        "x-go-type": "float64"
                                      },
                                      "y": {
                                        "type": "number",
                                        "description": "The y-coordinate of the node.",
                                        "minimum": -1000000,
                                        "maximum": 1000000,
                                        "x-go-type": "float64"
                                      }
                                    }
                                  },
                                  "bodyText": {
                                    "type": "string",
                                    "description": "The text to display for an element's body. Can give a path, e.g. data(id) will label with the elements id",
                                    "maxLength": 500
                                  },
                                  "bodyTextWrap": {
                                    "type": "string",
                                    "description": "How to wrap the text in the node. Can be 'none', 'wrap', or 'ellipsis'.",
                                    "enum": [
                                      "none",
                                      "wrap",
                                      "ellipsis"
                                    ]
                                  },
                                  "bodyTextMaxWidth": {
                                    "type": "string",
                                    "description": "The maximum width for wrapping text in the node.",
                                    "maxLength": 50
                                  },
                                  "bodyTextOpacity": {
                                    "type": "number",
                                    "description": "The opacity of the node's body text, including its outline.",
                                    "minimum": 0,
                                    "maximum": 1
                                  },
                                  "bodyTextBackgroundColor": {
                                    "type": "string",
                                    "description": "The colour of the node's body text background. Colours may be specified by name (e.g. red), hex (e.g.",
                                    "maxLength": 100
                                  },
                                  "bodyTextFontSize": {
                                    "type": "number",
                                    "description": "The size of the node's body text.",
                                    "minimum": 0
                                  },
                                  "bodyTextColor": {
                                    "type": "string",
                                    "description": "The colour of the node's body text. Colours may be specified by name (e.g. red), hex (e.g.",
                                    "maxLength": 100
                                  },
                                  "bodyTextFontWeight": {
                                    "type": "string",
                                    "description": "A CSS font weight to be applied to the node's body text.",
                                    "maxLength": 50
                                  },
                                  "bodyTextHorizontalAlign": {
                                    "type": "string",
                                    "description": "A CSS horizontal alignment to be applied to the node's body text.",
                                    "maxLength": 50
                                  },
                                  "bodyTextDecoration": {
                                    "type": "string",
                                    "description": "A CSS text decoration to be applied to the node's body text.",
                                    "maxLength": 100
                                  },
                                  "bodyTextVerticalAlign": {
                                    "type": "string",
                                    "description": "A CSS vertical alignment to be applied to the node's body text.",
                                    "maxLength": 50
                                  },
                                  "width": {
                                    "type": "number",
                                    "description": "The width of the node's body or the width of an edge's line.",
                                    "minimum": 0
                                  },
                                  "height": {
                                    "type": "number",
                                    "description": "The height of the node's body",
                                    "minimum": 0
                                  },
                                  "backgroundImage": {
                                    "type": "string",
                                    "format": "uri",
                                    "description": "The URL that points to the image to show in the node.",
                                    "maxLength": 2048
                                  },
                                  "backgroundColor": {
                                    "type": "string",
                                    "description": "The colour of the node's body. Colours may be specified by name (e.g. red), hex (e.g.",
                                    "maxLength": 100
                                  },
                                  "backgroundBlacken": {
                                    "type": "number",
                                    "description": "Blackens the node's body for values from 0 to 1; whitens the node's body for values from 0 to -1.",
                                    "maximum": 1,
                                    "minimum": -1
                                  },
                                  "backgroundOpacity": {
                                    "type": "number",
                                    "description": "The opacity level of the node's background colour",
                                    "maximum": 1,
                                    "minimum": 0
                                  },
                                  "backgroundPositionX": {
                                    "type": "string",
                                    "description": "The x position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                                    "maxLength": 50
                                  },
                                  "backgroundPositionY": {
                                    "type": "string",
                                    "description": "The y position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                                    "maxLength": 50
                                  },
                                  "backgroundOffsetX": {
                                    "type": "string",
                                    "description": "The x offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                                    "maxLength": 50
                                  },
                                  "backgroundOffsetY": {
                                    "type": "string",
                                    "description": "The y offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                                    "maxLength": 50
                                  },
                                  "backgroundFit": {
                                    "type": "string",
                                    "description": "How the background image is fit to the node. Can be 'none', 'contain', or 'cover'.",
                                    "enum": [
                                      "none",
                                      "contain",
                                      "cover"
                                    ]
                                  },
                                  "backgroundClip": {
                                    "type": "string",
                                    "description": "How the background image is clipped to the node. Can be 'none', 'node', or 'node-border'.",
                                    "enum": [
                                      "none",
                                      "node",
                                      "node-border"
                                    ]
                                  },
                                  "backgroundWidthRelativeTo": {
                                    "type": "string",
                                    "description": "How the background image's width is determined. Can be 'none', 'inner', or 'outer'.",
                                    "enum": [
                                      "none",
                                      "inner",
                                      "outer"
                                    ]
                                  },
                                  "backgroundHeightRelativeTo": {
                                    "type": "string",
                                    "description": "How the background image's height is determined. Can be 'none', 'inner', or 'outer'.",
                                    "enum": [
                                      "none",
                                      "inner",
                                      "outer"
                                    ]
                                  },
                                  "borderWidth": {
                                    "type": "number",
                                    "description": "The size of the node's border.",
                                    "minimum": 0
                                  },
                                  "borderStyle": {
                                    "type": "string",
                                    "description": "The style of the node's border",
                                    "enum": [
                                      "solid",
                                      "dotted",
                                      "dashed",
                                      "double"
                                    ]
                                  },
                                  "borderColor": {
                                    "type": "string",
                                    "description": "The colour of the node's border. Colours may be specified by name (e.g. red), hex (e.g.",
                                    "maxLength": 100
                                  },
                                  "borderOpacity": {
                                    "type": "number",
                                    "description": "The opacity of the node's border",
                                    "minimum": 0,
                                    "maximum": 1
                                  },
                                  "padding": {
                                    "type": "number",
                                    "description": "The amount of padding around all sides of the node.",
                                    "minimum": 0
                                  },
                                  "textHalign": {
                                    "type": "string",
                                    "description": "The horizontal alignment of a node's label",
                                    "enum": [
                                      "left",
                                      "center",
                                      "right"
                                    ]
                                  },
                                  "textValign": {
                                    "type": "string",
                                    "description": "The vertical alignment of a node's label",
                                    "enum": [
                                      "top",
                                      "center",
                                      "bottom"
                                    ]
                                  },
                                  "ghost": {
                                    "type": "string",
                                    "description": "Whether to use the ghost effect, a semitransparent duplicate of the element drawn at an offset.",
                                    "default": "no",
                                    "enum": [
                                      "yes",
                                      "no"
                                    ]
                                  },
                                  "activeBgColor": {
                                    "type": "string",
                                    "description": "The colour of the indicator shown when the background is grabbed by the user. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                                    "maxLength": 100
                                  },
                                  "activeBgOpacity": {
                                    "type": "string",
                                    "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                                    "maxLength": 50
                                  },
                                  "activeBgSize": {
                                    "type": "string",
                                    "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                                    "maxLength": 50
                                  },
                                  "selectionBoxColor": {
                                    "type": "string",
                                    "description": "The background colour of the selection box used for drag selection. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                                    "maxLength": 100
                                  },
                                  "selectionBoxBorderWidth": {
                                    "type": "number",
                                    "description": "The size of the border on the selection box. Selector needs to be *core*",
                                    "minimum": 0
                                  },
                                  "selectionBoxOpacity": {
                                    "type": "number",
                                    "description": "The opacity of the selection box. Selector needs to be *core*",
                                    "minimum": 0,
                                    "maximum": 1
                                  },
                                  "outsideTextureBgColor": {
                                    "type": "string",
                                    "description": "The colour of the area outside the viewport texture when initOptions.textureOnViewport === true. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                                    "maxLength": 100
                                  },
                                  "outsideTextureBgOpacity": {
                                    "type": "number",
                                    "description": "The opacity of the area outside the viewport texture. Selector needs to be *core*",
                                    "minimum": 0,
                                    "maximum": 1
                                  },
                                  "shapePolygonPoints": {
                                    "type": "string",
                                    "description": "An array (or a space-separated string) of numbers ranging on [-1, 1], representing alternating x and y values (i.e. x1 y1 x2 y2, x3 y3 ...). This represents the points in the polygon for the node's shape. The bounding box of the node is given by (-1, -1), (1, -1), (1, 1), (-1, 1). The node's position is the origin (0, 0 )",
                                    "maxLength": 2000
                                  },
                                  "menuBackgroundColor": {
                                    "type": "string",
                                    "description": "The colour of the background of the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                                    "maxLength": 100
                                  },
                                  "menuBackgroundOpacity": {
                                    "type": "number",
                                    "description": "The opacity of the background of the component menu.",
                                    "minimum": 0,
                                    "maximum": 1
                                  },
                                  "menuForgroundColor": {
                                    "type": "string",
                                    "description": "The colour of the text or icons in the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                                    "maxLength": 100
                                  }
                                }
                              }
                            ]
                          },
                          "status": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "status"
                            },
                            "x-order": 10,
                            "description": "Connection Status",
                            "type": "string",
                            "enum": [
                              "discovered",
                              "registered",
                              "connected",
                              "ignored",
                              "maintenance",
                              "disconnected",
                              "deleted",
                              "not found"
                            ]
                          },
                          "transitionMap": {
                            "type": "object",
                            "description": "Map describing the connection state machine. Each key is a current connection status and its value is the list of states the connection may transition to from that status, along with a description of each transition.",
                            "additionalProperties": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "additionalProperties": false,
                                "description": "A single permissible state transition for a connection, describing the next reachable state and the meaning of that transition.",
                                "required": [
                                  "nextState"
                                ],
                                "properties": {
                                  "nextState": {
                                    "description": "The connection state reachable from the current state.",
                                    "x-go-name": "NextState",
                                    "x-order": 1,
                                    "type": "string",
                                    "enum": [
                                      "discovered",
                                      "registered",
                                      "connected",
                                      "ignored",
                                      "maintenance",
                                      "disconnected",
                                      "deleted",
                                      "not found"
                                    ]
                                  },
                                  "description": {
                                    "type": "string",
                                    "description": "Human-readable explanation of when or why this transition occurs.",
                                    "maxLength": 1000,
                                    "x-oapi-codegen-extra-tags": {
                                      "json": "description,omitempty"
                                    },
                                    "x-order": 2
                                  }
                                }
                              }
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "gorm": "type:bytes;serializer:json",
                              "db": "-",
                              "json": "transitionMap,omitempty"
                            },
                            "x-order": 18
                          },
                          "owner": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-go-name": "Owner",
                            "x-oapi-codegen-extra-tags": {
                              "db": "owner",
                              "json": "owner"
                            },
                            "x-order": 11
                          },
                          "createdAt": {
                            "description": "Timestamp when the connection was created.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "json": "createdAt"
                            },
                            "x-order": 12,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp when the connection was last updated.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "json": "updatedAt"
                            },
                            "x-order": 13,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deletedAt": {
                            "description": "Timestamp when the connection was soft-deleted, if applicable.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "json": "deletedAt"
                            },
                            "x-order": 14,
                            "x-go-type": "meshcore.NullTime",
                            "x-go-type-import": {
                              "name": "meshcore",
                              "path": "github.com/meshery/schemas/models/core"
                            },
                            "type": "string",
                            "format": "date-time",
                            "nullable": true,
                            "x-go-type-skip-optional-pointer": true
                          },
                          "organizationId": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-go-name": "OrganizationID",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "organization_id",
                              "json": "organizationId"
                            },
                            "x-order": 19
                          },
                          "environments": {
                            "type": "array",
                            "description": "Associated environments for this connection",
                            "items": {
                              "x-go-type": "*environmentv1beta3.Environment",
                              "x-go-type-import": {
                                "path": "github.com/meshery/schemas/models/v1beta3/environment",
                                "name": "environmentv1beta3"
                              },
                              "$id": "https://schemas.meshery.io/environment.yaml",
                              "$schema": "http://json-schema.org/draft-07/schema#",
                              "title": "Environment",
                              "description": "Environments allow you to logically group related Connections and their associated Credentials. Learn more at https://docs.meshery.io/concepts/logical/environments",
                              "additionalProperties": false,
                              "type": "object",
                              "example": {
                                "id": "00000000-0000-0000-0000-000000000000",
                                "schemaVersion": "environments.meshery.io/v1beta3",
                                "name": "Production Environment",
                                "description": "Connections and credentials for the production cluster.",
                                "purpose": "user",
                                "organizationId": "00000000-0000-0000-0000-000000000000",
                                "owner": "00000000-0000-0000-0000-000000000000",
                                "createdAt": "0001-01-01T00:00:00Z",
                                "metadata": {},
                                "updatedAt": "0001-01-01T00:00:00Z",
                                "deletedAt": null
                              },
                              "required": [
                                "id",
                                "schemaVersion",
                                "name",
                                "description",
                                "organizationId"
                              ],
                              "properties": {
                                "id": {
                                  "description": "ID",
                                  "x-order": 1,
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
                                "schemaVersion": {
                                  "description": "Specifies the version of the schema to which the environment conforms.",
                                  "x-order": 2,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "schemaVersion",
                                    "db": "-",
                                    "gorm": "-"
                                  },
                                  "default": "environments.meshery.io/v1beta3",
                                  "type": "string",
                                  "minLength": 2,
                                  "maxLength": 100,
                                  "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+(alpha[0-9]*|beta[0-9]*|rc[0-9]*)?)([.-][a-z0-9]+)*$",
                                  "example": [
                                    "v1",
                                    "v1alpha1",
                                    "v2beta3",
                                    "v1.custom-suffix",
                                    "models.meshery.io/v1beta1",
                                    "capability.meshery.io/v1alpha1"
                                  ]
                                },
                                "name": {
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "name",
                                    "json": "name"
                                  },
                                  "x-order": 3,
                                  "type": "string",
                                  "maxLength": 100,
                                  "description": "Environment name"
                                },
                                "description": {
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "description",
                                    "json": "description"
                                  },
                                  "x-order": 4,
                                  "type": "string",
                                  "maxLength": 1000,
                                  "description": "Environment description"
                                },
                                "organizationId": {
                                  "x-go-name": "OrganizationID",
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "organization_id",
                                    "json": "organizationId"
                                  },
                                  "x-order": 5,
                                  "description": "Environment organization ID",
                                  "type": "string",
                                  "format": "uuid",
                                  "x-go-type": "uuid.UUID",
                                  "x-go-type-import": {
                                    "path": "github.com/gofrs/uuid"
                                  }
                                },
                                "owner": {
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "owner",
                                    "json": "owner"
                                  },
                                  "x-order": 6,
                                  "description": "Environment owner",
                                  "type": "string",
                                  "format": "uuid",
                                  "x-go-type": "uuid.UUID",
                                  "x-go-type-import": {
                                    "path": "github.com/gofrs/uuid"
                                  }
                                },
                                "createdAt": {
                                  "description": "Timestamp when the environment was created.",
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "created_at",
                                    "yaml": "created_at",
                                    "json": "createdAt"
                                  },
                                  "x-order": 7,
                                  "x-go-type": "time.Time",
                                  "type": "string",
                                  "format": "date-time",
                                  "x-go-name": "CreatedAt",
                                  "x-go-type-skip-optional-pointer": true
                                },
                                "metadata": {
                                  "description": "Additional metadata associated with the environment.",
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "metadata",
                                    "json": "metadata"
                                  },
                                  "x-order": 8,
                                  "x-go-type": "core.Map",
                                  "x-go-type-skip-optional-pointer": true,
                                  "type": "object"
                                },
                                "updatedAt": {
                                  "description": "Timestamp when the environment was last updated.",
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "updated_at",
                                    "yaml": "updated_at",
                                    "json": "updatedAt"
                                  },
                                  "x-order": 9,
                                  "x-go-type": "time.Time",
                                  "type": "string",
                                  "format": "date-time",
                                  "x-go-name": "UpdatedAt",
                                  "x-go-type-skip-optional-pointer": true
                                },
                                "deletedAt": {
                                  "description": "Timestamp when the environment was soft deleted. Null while the environment remains active.",
                                  "nullable": true,
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "deleted_at",
                                    "json": "deletedAt"
                                  },
                                  "x-go-type": "core.NullTime",
                                  "x-go-import": "database/sql",
                                  "x-order": 10,
                                  "type": "string",
                                  "format": "date-time",
                                  "x-go-type-skip-optional-pointer": true
                                },
                                "purpose": {
                                  "type": "string",
                                  "description": "What the environment exists for. `user` is an ordinary environment that people create to logically group Connections and their Credentials. `administrative` designates an environment the platform itself provisions to hold organization-level configuration, and which resolvers of that configuration therefore trust. Profiles are not environments: they are their own construct (`schemas/constructs/v1beta3/profile`, served at `/api/profiles` and assigned to workspaces under `/api/workspaces/{workspaceId}/profiles`).\n\nAbsent means `user`. Nothing may read an unset or unrecognised value as administrative: test for the administrative value explicitly rather than for \"not user\", so the property fails closed.\n\nAt most one live environment per organization may carry any single privileged purpose - `administrative`, and each privileged value a later version adds. Name those values explicitly wherever the rule is enforced, including the database index predicate: a \"not `user`\" test also matches the empty value that unmigrated rows and un-normalised writes read back as, which means ordinary. A resolver that selects an environment by purpose MUST fail closed when more than one live row matches: return an error rather than whichever row the database happened to return first.\n\nPrivileged values are server-owned and never client-settable. `EnvironmentPayload`, which every environment POST and PUT requestBody references, accepts only the non-privileged value `user`, and the create-or-edit form has no field for it, so the environment create and update endpoints cannot designate an environment administrative. That restriction is a codegen guarantee, never access control: the registrant connection inlines the full environment entity, so `registerRegistryComponent` and `registerRegistryRelationship` do carry `purpose` in a request type and consumers MUST refuse it on input there too. Whatever surface a value arrives on, every consumer MUST assign this property only from server-side provisioning or a data migration. Permission to create an environment does not confer the ability to make one administrative.\n\nThe database index that enforces the uniqueness invariant, the migration path for environments that are administrative by naming convention today, and each consumer's obligations are specified in https://github.com/meshery/schemas/blob/master/docs/environment-purpose-contract.md.",
                                  "enum": [
                                    "user",
                                    "administrative"
                                  ],
                                  "x-enum-varnames": [
                                    "EnvironmentPurposeUser",
                                    "EnvironmentPurposeAdministrative"
                                  ],
                                  "x-go-type-skip-optional-pointer": true,
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "purpose",
                                    "gorm": "not null;default:user",
                                    "json": "purpose,omitempty"
                                  },
                                  "x-order": 11
                                }
                              }
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "-",
                              "gorm": "-"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-order": 15
                          },
                          "schemaVersion": {
                            "description": "Specifies the version of the schema used for the definition.",
                            "x-order": 16,
                            "x-oapi-codegen-extra-tags": {
                              "db": "-",
                              "gorm": "-"
                            },
                            "default": "connections.meshery.io/v1beta3",
                            "type": "string",
                            "minLength": 2,
                            "maxLength": 100,
                            "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+(alpha[0-9]*|beta[0-9]*|rc[0-9]*)?)([.-][a-z0-9]+)*$",
                            "example": [
                              "v1",
                              "v1alpha1",
                              "v2beta3",
                              "v1.custom-suffix",
                              "models.meshery.io/v1beta1",
                              "capability.meshery.io/v1alpha1"
                            ]
                          }
                        }
                      },
                      "x-order": 1
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of connections on all pages",
                      "x-oapi-codegen-extra-tags": {
                        "json": "totalCount"
                      },
                      "x-order": 2,
                      "minimum": 0
                    },
                    "page": {
                      "type": "integer",
                      "description": "Current page number",
                      "x-order": 3,
                      "minimum": 0
                    },
                    "pageSize": {
                      "type": "integer",
                      "description": "Number of elements per page",
                      "x-oapi-codegen-extra-tags": {
                        "json": "pageSize"
                      },
                      "x-order": 4,
                      "minimum": 1
                    },
                    "statusSummary": {
                      "type": "object",
                      "description": "Aggregate count of connections grouped by status",
                      "additionalProperties": {
                        "type": "integer"
                      },
                      "x-go-type": "map[ConnectionStatusValue]int",
                      "x-oapi-codegen-extra-tags": {
                        "json": "statusSummary,omitempty"
                      },
                      "x-order": 5
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
    },
    "/api/profiles/{profileId}/connections/{connectionId}": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "profiles"
        ],
        "operationId": "addConnectionToProfile",
        "summary": "Add connection to profile",
        "description": "Links an existing connection of the same organization to the profile. Requires Edit Profile.",
        "parameters": [
          {
            "name": "profileId",
            "in": "path",
            "description": "Profile ID",
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
          {
            "name": "connectionId",
            "in": "path",
            "description": "Connection ID",
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
          "201": {
            "description": "Connection linked to profile",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Junction record linking a profile to a connection.",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "profileId",
                    "connectionId"
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
                      "x-go-name": "ID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id",
                        "json": "id"
                      }
                    },
                    "profileId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-name": "ProfileID",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "profile_id",
                        "json": "profileId"
                      }
                    },
                    "connectionId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-go-name": "ConnectionID",
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "connection_id",
                        "json": "connectionId"
                      }
                    },
                    "createdAt": {
                      "description": "Timestamp when the mapping was created.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "createdAt,omitempty"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp when the mapping was last updated.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updatedAt,omitempty"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "description": "Timestamp when the mapping was soft-deleted. Null while the mapping remains active.",
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
      },
      "delete": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "profiles"
        ],
        "operationId": "removeConnectionFromProfile",
        "summary": "Remove connection from profile",
        "description": "Unlinks a connection from the profile. The connection itself is left intact. Requires Edit Profile.",
        "parameters": [
          {
            "name": "profileId",
            "in": "path",
            "description": "Profile ID",
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
          {
            "name": "connectionId",
            "in": "path",
            "description": "Connection ID",
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
          "204": {
            "description": "Connection unlinked from profile"
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
      }
    },
    "parameters": {
      "profileId": {
        "name": "profileId",
        "in": "path",
        "description": "Profile ID",
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
      "connectionId": {
        "name": "connectionId",
        "in": "path",
        "description": "Connection ID",
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
      "pagesize": {
        "name": "pagesize",
        "in": "query",
        "description": "Get responses by pagesize. Deprecated alias of pageSize.",
        "deprecated": true,
        "schema": {
          "type": "integer",
          "minimum": 1
        }
      },
      "orgIdQuery": {
        "name": "orgId",
        "in": "query",
        "description": "Organization ID used to scope the listing. Defaults to the organization the session resolved to.",
        "required": false,
        "schema": {
          "type": "string",
          "format": "uuid",
          "maxLength": 36
        }
      },
      "userIdQuery": {
        "name": "userId",
        "in": "query",
        "description": "Return only the profile that represents this user.",
        "required": false,
        "schema": {
          "type": "string",
          "format": "uuid",
          "maxLength": 36
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
      "Profile": {
        "$id": "https://schemas.meshery.io/profile.yaml",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Profile",
        "description": "A profile is a publishing or persona profile: a named set of settings, owned by an organization, that a person or brand publishes as, with the platform accounts it acts through linked to it as Connections. It is not the user account profile (`/api/identity/users/profile`) and not a performance profile (`/api/performance/profiles`), and it is neither an environment nor a workspace. Like environments, a profile is assigned to any number of workspaces, and workspace assignment is how access to it is shared: a profile is readable by its owner (whether or not it is assigned to any workspace), by organization admins, and by members of the workspaces it is assigned to. Provider admins do not see profiles automatically, and seeing a profile does not grant access to its linked connections.",
        "additionalProperties": false,
        "type": "object",
        "example": {
          "id": "00000000-0000-0000-0000-000000000000",
          "schemaVersion": "profiles.meshery.io/v1beta3",
          "name": "jane",
          "description": "Profile for Jane's accounts and settings.",
          "organizationId": "00000000-0000-0000-0000-000000000000",
          "owner": "00000000-0000-0000-0000-000000000000",
          "userId": "00000000-0000-0000-0000-000000000000",
          "metadata": {},
          "createdAt": "0001-01-01T00:00:00Z",
          "updatedAt": "0001-01-01T00:00:00Z",
          "deletedAt": null
        },
        "required": [
          "id",
          "schemaVersion",
          "name",
          "organizationId",
          "owner",
          "createdAt",
          "updatedAt"
        ],
        "properties": {
          "id": {
            "description": "Server-generated profile ID.",
            "x-order": 1,
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
          "schemaVersion": {
            "description": "Specifies the version of the schema to which the profile conforms.",
            "x-order": 2,
            "x-oapi-codegen-extra-tags": {
              "json": "schemaVersion",
              "db": "-",
              "gorm": "-"
            },
            "default": "profiles.meshery.io/v1beta3",
            "type": "string",
            "minLength": 2,
            "maxLength": 100,
            "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+(alpha[0-9]*|beta[0-9]*|rc[0-9]*)?)([.-][a-z0-9]+)*$",
            "example": [
              "v1",
              "v1alpha1",
              "v2beta3",
              "v1.custom-suffix",
              "models.meshery.io/v1beta1",
              "capability.meshery.io/v1alpha1"
            ]
          },
          "name": {
            "type": "string",
            "description": "Name of the profile, typically its short handle. Not unique; like environment names, two profiles may share one.",
            "minLength": 1,
            "maxLength": 255,
            "x-order": 3,
            "x-oapi-codegen-extra-tags": {
              "db": "name",
              "json": "name"
            }
          },
          "description": {
            "type": "string",
            "description": "Description of the profile.",
            "maxLength": 1000,
            "x-order": 5,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "description",
              "json": "description,omitempty"
            }
          },
          "organizationId": {
            "description": "Owning organization ID. Fixed at creation.",
            "x-order": 6,
            "x-go-name": "OrganizationID",
            "x-oapi-codegen-extra-tags": {
              "db": "organization_id",
              "json": "organizationId"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "owner": {
            "description": "ID of the user who owns the profile. Defaults to the creating user. The owner, or a holder of the Edit Profile key in a workspace the profile is assigned to, may transfer it. When the owner's account is deleted, ownership passes on by the same succession rule that applies to designs.",
            "x-order": 7,
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
          "userId": {
            "description": "ID of the user this profile represents, when it represents a user. Absent for a profile that represents no user account, such as a brand. Not unique: a user may be represented by more than one profile.",
            "x-order": 8,
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
          "metadata": {
            "type": "object",
            "description": "Free-form settings of the profile, stored as a JSON blob.",
            "x-order": 9,
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "metadata",
              "json": "metadata"
            }
          },
          "createdAt": {
            "description": "Timestamp when the profile was created.",
            "x-order": 10,
            "x-oapi-codegen-extra-tags": {
              "db": "created_at",
              "json": "createdAt"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp when the profile was last updated.",
            "x-order": 11,
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at",
              "json": "updatedAt"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deletedAt": {
            "description": "Timestamp when the profile was soft-deleted. Null while the profile remains active.",
            "nullable": true,
            "x-order": 12,
            "x-go-type": "core.NullTime",
            "x-go-type-import": {
              "name": "core",
              "path": "github.com/meshery/schemas/models/core"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at",
              "json": "deletedAt,omitempty"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "ProfilePayload": {
        "type": "object",
        "description": "Payload for creating or updating a profile. Carries only the client-settable fields. `id`, `createdAt`, `updatedAt` and `deletedAt` are server-owned and deliberately absent. `owner` is optional: omitted on create it defaults to the authenticated user, and omitted on update it is unchanged.",
        "required": [
          "name",
          "organizationId"
        ],
        "properties": {
          "name": {
            "type": "string",
            "description": "Name of the profile, typically its short handle. Not unique.",
            "minLength": 1,
            "maxLength": 255
          },
          "description": {
            "type": "string",
            "description": "Description of the profile.",
            "maxLength": 1000,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "description,omitempty"
            }
          },
          "organizationId": {
            "description": "Organization in which to create the profile. Cannot change after creation.",
            "x-go-name": "OrganizationID",
            "x-go-type-skip-optional-pointer": true,
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "owner": {
            "description": "ID of the user who owns the profile. Only the owner or a holder of Edit Profile in a workspace the profile is assigned to may change it.",
            "x-oapi-codegen-extra-tags": {
              "json": "owner,omitempty"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "userId": {
            "description": "ID of the user this profile represents, when it represents a user. The user must be a member of the organization.",
            "x-go-name": "UserID",
            "x-oapi-codegen-extra-tags": {
              "json": "userId,omitempty"
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
            "description": "Free-form settings of the profile.",
            "additionalProperties": true,
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "metadata,omitempty"
            }
          }
        }
      },
      "ProfilePage": {
        "type": "object",
        "description": "Paginated list of profiles.",
        "required": [
          "page",
          "pageSize",
          "totalCount",
          "profiles"
        ],
        "properties": {
          "page": {
            "type": "integer",
            "description": "Zero-based page index returned in this response.",
            "minimum": 0
          },
          "pageSize": {
            "type": "integer",
            "description": "Maximum number of items returned on each page.",
            "minimum": 1
          },
          "totalCount": {
            "type": "integer",
            "description": "Total number of items across all pages.",
            "minimum": 0
          },
          "profiles": {
            "type": "array",
            "description": "Profiles in this page.",
            "x-go-type-skip-optional-pointer": true,
            "items": {
              "$id": "https://schemas.meshery.io/profile.yaml",
              "$schema": "http://json-schema.org/draft-07/schema#",
              "title": "Profile",
              "description": "A profile is a publishing or persona profile: a named set of settings, owned by an organization, that a person or brand publishes as, with the platform accounts it acts through linked to it as Connections. It is not the user account profile (`/api/identity/users/profile`) and not a performance profile (`/api/performance/profiles`), and it is neither an environment nor a workspace. Like environments, a profile is assigned to any number of workspaces, and workspace assignment is how access to it is shared: a profile is readable by its owner (whether or not it is assigned to any workspace), by organization admins, and by members of the workspaces it is assigned to. Provider admins do not see profiles automatically, and seeing a profile does not grant access to its linked connections.",
              "additionalProperties": false,
              "type": "object",
              "example": {
                "id": "00000000-0000-0000-0000-000000000000",
                "schemaVersion": "profiles.meshery.io/v1beta3",
                "name": "jane",
                "description": "Profile for Jane's accounts and settings.",
                "organizationId": "00000000-0000-0000-0000-000000000000",
                "owner": "00000000-0000-0000-0000-000000000000",
                "userId": "00000000-0000-0000-0000-000000000000",
                "metadata": {},
                "createdAt": "0001-01-01T00:00:00Z",
                "updatedAt": "0001-01-01T00:00:00Z",
                "deletedAt": null
              },
              "required": [
                "id",
                "schemaVersion",
                "name",
                "organizationId",
                "owner",
                "createdAt",
                "updatedAt"
              ],
              "properties": {
                "id": {
                  "description": "Server-generated profile ID.",
                  "x-order": 1,
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
                "schemaVersion": {
                  "description": "Specifies the version of the schema to which the profile conforms.",
                  "x-order": 2,
                  "x-oapi-codegen-extra-tags": {
                    "json": "schemaVersion",
                    "db": "-",
                    "gorm": "-"
                  },
                  "default": "profiles.meshery.io/v1beta3",
                  "type": "string",
                  "minLength": 2,
                  "maxLength": 100,
                  "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+(alpha[0-9]*|beta[0-9]*|rc[0-9]*)?)([.-][a-z0-9]+)*$",
                  "example": [
                    "v1",
                    "v1alpha1",
                    "v2beta3",
                    "v1.custom-suffix",
                    "models.meshery.io/v1beta1",
                    "capability.meshery.io/v1alpha1"
                  ]
                },
                "name": {
                  "type": "string",
                  "description": "Name of the profile, typically its short handle. Not unique; like environment names, two profiles may share one.",
                  "minLength": 1,
                  "maxLength": 255,
                  "x-order": 3,
                  "x-oapi-codegen-extra-tags": {
                    "db": "name",
                    "json": "name"
                  }
                },
                "description": {
                  "type": "string",
                  "description": "Description of the profile.",
                  "maxLength": 1000,
                  "x-order": 5,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "description",
                    "json": "description,omitempty"
                  }
                },
                "organizationId": {
                  "description": "Owning organization ID. Fixed at creation.",
                  "x-order": 6,
                  "x-go-name": "OrganizationID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "organization_id",
                    "json": "organizationId"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "owner": {
                  "description": "ID of the user who owns the profile. Defaults to the creating user. The owner, or a holder of the Edit Profile key in a workspace the profile is assigned to, may transfer it. When the owner's account is deleted, ownership passes on by the same succession rule that applies to designs.",
                  "x-order": 7,
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
                "userId": {
                  "description": "ID of the user this profile represents, when it represents a user. Absent for a profile that represents no user account, such as a brand. Not unique: a user may be represented by more than one profile.",
                  "x-order": 8,
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
                "metadata": {
                  "type": "object",
                  "description": "Free-form settings of the profile, stored as a JSON blob.",
                  "x-order": 9,
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "metadata",
                    "json": "metadata"
                  }
                },
                "createdAt": {
                  "description": "Timestamp when the profile was created.",
                  "x-order": 10,
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at",
                    "json": "createdAt"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updatedAt": {
                  "description": "Timestamp when the profile was last updated.",
                  "x-order": 11,
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at",
                    "json": "updatedAt"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "deletedAt": {
                  "description": "Timestamp when the profile was soft-deleted. Null while the profile remains active.",
                  "nullable": true,
                  "x-order": 12,
                  "x-go-type": "core.NullTime",
                  "x-go-type-import": {
                    "name": "core",
                    "path": "github.com/meshery/schemas/models/core"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "deleted_at",
                    "json": "deletedAt,omitempty"
                  },
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                }
              },
              "x-go-type": "Profile"
            }
          }
        }
      },
      "ProfileConnectionMapping": {
        "type": "object",
        "description": "Junction record linking a profile to a connection.",
        "additionalProperties": false,
        "required": [
          "id",
          "profileId",
          "connectionId"
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
            "x-go-name": "ID",
            "x-oapi-codegen-extra-tags": {
              "db": "id",
              "json": "id"
            }
          },
          "profileId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-name": "ProfileID",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "profile_id",
              "json": "profileId"
            }
          },
          "connectionId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-name": "ConnectionID",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "connection_id",
              "json": "connectionId"
            }
          },
          "createdAt": {
            "description": "Timestamp when the mapping was created.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at",
              "json": "createdAt,omitempty"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp when the mapping was last updated.",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at",
              "json": "updatedAt,omitempty"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deletedAt": {
            "description": "Timestamp when the mapping was soft-deleted. Null while the mapping remains active.",
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
      }
    },
    "requestBodies": {
      "profilePayload": {
        "description": "Body for creating or updating a profile",
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "description": "Payload for creating or updating a profile. Carries only the client-settable fields. `id`, `createdAt`, `updatedAt` and `deletedAt` are server-owned and deliberately absent. `owner` is optional: omitted on create it defaults to the authenticated user, and omitted on update it is unchanged.",
              "required": [
                "name",
                "organizationId"
              ],
              "properties": {
                "name": {
                  "type": "string",
                  "description": "Name of the profile, typically its short handle. Not unique.",
                  "minLength": 1,
                  "maxLength": 255
                },
                "description": {
                  "type": "string",
                  "description": "Description of the profile.",
                  "maxLength": 1000,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "description,omitempty"
                  }
                },
                "organizationId": {
                  "description": "Organization in which to create the profile. Cannot change after creation.",
                  "x-go-name": "OrganizationID",
                  "x-go-type-skip-optional-pointer": true,
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "owner": {
                  "description": "ID of the user who owns the profile. Only the owner or a holder of Edit Profile in a workspace the profile is assigned to may change it.",
                  "x-oapi-codegen-extra-tags": {
                    "json": "owner,omitempty"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "userId": {
                  "description": "ID of the user this profile represents, when it represents a user. The user must be a member of the organization.",
                  "x-go-name": "UserID",
                  "x-oapi-codegen-extra-tags": {
                    "json": "userId,omitempty"
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
                  "description": "Free-form settings of the profile.",
                  "additionalProperties": true,
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "metadata,omitempty"
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

export default ProfileSchema;
