/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const OrganizationSmtpSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Organization SMTP Configuration",
    "description": "OpenAPI schema for per-organization outbound mail. A Cloud deployment ships with one shared SMTP relay owned by the provider organization, so every message - whichever tenant it concerns - leaves from the provider's domain. These operations let an organization register its own mail server and credentials instead, so that every email whose reader belongs to that organization is delivered from the organization's own domain. This covers application notifications and identity-flow mail (account verification, password recovery) alike, because both are rendered and sent by Cloud.\nThe configuration is stored on the same environment/connection/credential chain that bring-your-own identity providers already uses, under a second well-known environment name, so these operations are shaped around that chain: an environment that is provisioned and torn down as the organization's opt-in, a connection carrying the dial target and the message identity, and a credential carrying only the password.\nThese operations are deliberately NOT folded into the generic connection and credential operations. They exist to carry validation those cannot: the internal-address screen, the submission-port allowlist, the from-domain proof, the refusal of the redaction sentinel and the classified test outcome. Reaching these rows through the generic operations would run none of it.\nThe password is encrypted at rest and never returned. Mail is not routed through the server until control of its from domain has been proven, and a failing server falls back to the provider relay unless the organization has opted out.",
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
      "name": "OrganizationSmtp",
      "description": "Operations on an organization's own outbound mail server."
    }
  ],
  "paths": {
    "/api/orgs/{orgId}/environments/mail-relay": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "OrganizationSmtp"
        ],
        "operationId": "getOrganizationSmtpEnvironment",
        "summary": "Probe whether an organization has brought its own mail server",
        "description": "Returns the organization's mail-relay environment when it exists. A 404 is the ordinary answer for an organization using the provider's shared relay, and is not an error condition.",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
            "description": "Organization ID",
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
            "description": "The organization has its own mail-relay environment. The canonical Environment shape, not a bespoke one: this endpoint returns an ordinary environment row that happens to carry the well-known name.",
            "content": {
              "application/json": {
                "schema": {
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
            "description": "Caller lacks the permission key required for this organization",
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
        "tags": [
          "OrganizationSmtp"
        ],
        "operationId": "deleteOrganizationSmtpEnvironment",
        "summary": "Remove an organization's mail server entirely",
        "description": "Removes the configuration, its stored credential and the environment that held them, together. The organization's mail reverts to the provider's shared relay.\nIdempotent, and deliberately declares no 404: removing an absent configuration succeeds with the same 204 as removing a present one, so \"not found\" is not an outcome this operation has. An unknown or unauthorized organization is answered by the permission middleware before the handler runs.",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
            "description": "Organization ID",
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
            "description": "The configuration was removed."
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
            "description": "Caller lacks the permission key required for this organization",
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
    "/api/orgs/{orgId}/environments/mail-relay/connection": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "OrganizationSmtp"
        ],
        "operationId": "getOrganizationSmtpConfiguration",
        "summary": "Get an organization's SMTP configuration",
        "description": "Returns the organization's mail server configuration, including its current status and from-domain verification state. The password is always the redaction sentinel `***`.",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
            "description": "Organization ID",
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
            "description": "The organization's SMTP configuration.",
            "content": {
              "application/json": {
                "schema": {
                  "$id": "https://schemas.meshery.io/organization_smtp.yaml",
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "OrganizationSmtpConfiguration",
                  "description": "An organization's own outbound mail server. When present and healthy, every transactional email whose reader belongs to this organization - application notifications and identity-flow mail (account verification, password recovery) alike - is delivered through this server rather than through the provider's shared relay, so the message leaves from the organization's own domain. At most one live configuration exists per organization. The SMTP password is encrypted at rest and is never returned; reads always carry the redaction sentinel instead.\n\nThis is a WIRE contract only. It is not backed by a table of its own: the configuration is stored on the same environment/connection/credential chain that bring-your-own identity providers already uses - a well-known per-organization Environment, joined through environments_connections_mappings to a Connection whose credential_id points at a Credential. The organization relationship lives on `environments.organization_id`, the dial target on `connections.url` and `connections.metadata`, the transport verdict on `connections.status`, and the password alone in `credentials.secret`.\n\nNo property here carries a construct-specific `db` tag, because no property here names a column of its own. The exception is deliberate and inherited: `createdAt` and `updatedAt` `$ref` the shared core definitions, which declare `db: created_at` / `db: updated_at` for every construct that uses them, and those two tags are accurate for the underlying connection row.",
                  "additionalProperties": false,
                  "type": "object",
                  "example": {
                    "id": "00000000-0000-0000-0000-000000000000",
                    "organizationId": "00000000-0000-0000-0000-000000000000",
                    "host": "smtp.example.com",
                    "port": 587,
                    "encryption": "starttls",
                    "authMechanism": "plain",
                    "username": "no-reply@example.com",
                    "password": "***",
                    "fromAddress": "no-reply@example.com",
                    "fromDisplayName": "Example Corp",
                    "replyToAddress": "support@example.com",
                    "status": "registered",
                    "fallbackToProvider": true,
                    "fromDomain": "example.com",
                    "fromDomainVerificationToken": "0f6a5d2c9b1e4a7f8c3d6b0e2a4f7c19",
                    "fromDomainVerifiedAt": null,
                    "lastSuccessAt": null,
                    "lastFailureAt": null,
                    "consecutiveFailures": 0,
                    "createdBy": "00000000-0000-0000-0000-000000000000",
                    "createdAt": "0001-01-01T00:00:00Z",
                    "updatedAt": "0001-01-01T00:00:00Z",
                    "deletedAt": null
                  },
                  "required": [
                    "id",
                    "organizationId",
                    "host",
                    "port",
                    "encryption",
                    "authMechanism",
                    "fromAddress",
                    "status",
                    "fallbackToProvider",
                    "consecutiveFailures",
                    "createdAt",
                    "updatedAt"
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
                      "x-go-name": "ID"
                    },
                    "organizationId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-order": 2,
                      "x-go-name": "OrganizationID"
                    },
                    "host": {
                      "type": "string",
                      "description": "Hostname of the organization's SMTP server.",
                      "minLength": 1,
                      "maxLength": 253,
                      "x-order": 3,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "port": {
                      "type": "integer",
                      "description": "TCP port the organization's SMTP server listens on. The server additionally restricts this to a submission-port allowlist; a syntactically valid port outside it is refused.",
                      "minimum": 1,
                      "maximum": 65535,
                      "default": 587,
                      "x-order": 4,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "encryption": {
                      "type": "string",
                      "description": "Transport encryption to negotiate. `starttls` upgrades a cleartext connection (typically port 587), `tls` opens an implicit TLS connection (typically port 465), and `none` sends in cleartext and is intended only for an internal relay on a trusted network.",
                      "enum": [
                        "starttls",
                        "tls",
                        "none"
                      ],
                      "default": "starttls",
                      "x-order": 5,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "authMechanism": {
                      "type": "string",
                      "description": "SMTP authentication mechanism. `none` is permitted only for a relay that authorizes by source address; a configuration using any other mechanism must carry both a username and a password.",
                      "enum": [
                        "plain",
                        "cram-md5",
                        "none"
                      ],
                      "default": "plain",
                      "x-order": 6,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "username": {
                      "type": "string",
                      "description": "Username presented to the organization's SMTP server. Held beside the host rather than with the password because it is an identifier rather than a secret, and the health surface must show it without a decryption round trip. It is usually an email address, so it is returned only on an authorized read.",
                      "maxLength": 320,
                      "x-order": 7,
                      "x-oapi-codegen-extra-tags": {
                        "json": "username,omitempty"
                      }
                    },
                    "password": {
                      "type": "string",
                      "description": "Present only when a password is stored, and then always the redaction sentinel `***` - never the stored value, which is encrypted at rest and is never projected into a response. Its presence is therefore the only thing it reports: a configuration whose `authMechanism` is `none` stores no password and omits this property entirely. It is optional rather than required for exactly that reason.\nRead-only, and read-only here means read-only: no request body references this schema. The write semantics belong to the payload schemas - `OrganizationSmtpConfigurationPayload` on create and `OrganizationSmtpCredentialPayload` on rotation - and are documented there.",
                      "readOnly": true,
                      "pattern": "^\\*\\*\\*$",
                      "maxLength": 512,
                      "x-order": 8,
                      "x-oapi-codegen-extra-tags": {
                        "json": "password,omitempty"
                      }
                    },
                    "fromAddress": {
                      "description": "Address the organization's mail is sent from. Its domain must be verified before mail is routed through this server.",
                      "x-order": 9,
                      "type": "string",
                      "format": "email",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "fromDisplayName": {
                      "type": "string",
                      "description": "Display name shown alongside the from address in the message header.",
                      "maxLength": 255,
                      "x-order": 10,
                      "x-oapi-codegen-extra-tags": {
                        "json": "fromDisplayName,omitempty"
                      }
                    },
                    "replyToAddress": {
                      "description": "Address replies are directed to. It is also the address carried when a message falls back to the provider relay, which rewrites the from address to the provider's own so the message stays aligned for SPF and DMARC.",
                      "x-order": 11,
                      "x-oapi-codegen-extra-tags": {
                        "json": "replyToAddress,omitempty"
                      },
                      "type": "string",
                      "format": "email",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "status": {
                      "type": "string",
                      "description": "Lifecycle and transport verdict, carrying the connection status vocabulary because the configuration IS a connection. `registered` means configured but never proven - the from domain is unverified, or no message has yet been delivered - and mail takes the provider relay. `connected` means the last delivery attempt succeeded and mail is routed through this server. `disconnected` means consecutive failures opened the circuit, so the server is no longer dialled and the fallback setting decides what happens. `ignored` means an administrator turned it off.\n\nThe writers are disjoint on purpose: only an administrator writes `ignored`, and only the delivery circuit writes `connected` or `disconnected`. That is what keeps a deliberate opt-out distinguishable from a failing relay. It also makes \"enabled while the from domain is unverified\" unrepresentable rather than merely forbidden, which is why this property replaces the separate `enabled` and `verificationState` pair it supersedes.",
                      "enum": [
                        "registered",
                        "connected",
                        "disconnected",
                        "ignored"
                      ],
                      "default": "registered",
                      "x-order": 12,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "fallbackToProvider": {
                      "type": "boolean",
                      "description": "Whether a message that this server fails to accept is re-sent through the provider's shared relay. Disabling it means the organization owns delivery entirely and a failure is a dropped message, including account verification and password recovery.",
                      "default": true,
                      "x-order": 13,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "fromDomain": {
                      "type": "string",
                      "description": "Registrable domain of the from address, held separately as the unit that ownership is proven for.",
                      "maxLength": 253,
                      "x-order": 14,
                      "x-oapi-codegen-extra-tags": {
                        "json": "fromDomain,omitempty"
                      }
                    },
                    "fromDomainVerificationToken": {
                      "type": "string",
                      "description": "Token the organization publishes in DNS to prove control of the from domain. Not a credential - it authorizes nothing and grants no access.",
                      "maxLength": 128,
                      "x-order": 15,
                      "x-oapi-codegen-extra-tags": {
                        "json": "fromDomainVerificationToken,omitempty"
                      }
                    },
                    "fromDomainVerifiedAt": {
                      "description": "Timestamp at which control of the from domain was last proven. Null while unproven.",
                      "nullable": true,
                      "x-order": 16,
                      "x-go-type": "meshcore.NullTime",
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "lastSuccessAt": {
                      "description": "Timestamp of the last message this server accepted.",
                      "nullable": true,
                      "x-order": 17,
                      "x-go-type": "meshcore.NullTime",
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "lastFailureAt": {
                      "description": "Timestamp of the last delivery attempt this server rejected or failed to accept.",
                      "nullable": true,
                      "x-order": 18,
                      "x-go-type": "meshcore.NullTime",
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "lastFailureReason": {
                      "type": "string",
                      "description": "Classification of the last failure. Always a classification, never the remote server's own message: the set is closed on purpose, because reporting a remote server's text back to a caller would turn a refusal into an oracle for what the network can reach.",
                      "enum": [
                        "blocked_target",
                        "connect_refused",
                        "connect_timeout",
                        "tls_failed",
                        "starttls_unsupported",
                        "auth_rejected",
                        "relay_rejected_sender",
                        "relay_rejected_recipient",
                        "delivery_failed",
                        "credential_unreadable"
                      ],
                      "x-order": 19,
                      "x-oapi-codegen-extra-tags": {
                        "json": "lastFailureReason,omitempty"
                      }
                    },
                    "consecutiveFailures": {
                      "type": "integer",
                      "description": "Delivery failures since the last success. Drives the circuit that stops dialling a persistently unreachable server.",
                      "minimum": 0,
                      "default": 0,
                      "x-order": 20,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "createdBy": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "nullable": true,
                      "x-order": 21,
                      "x-oapi-codegen-extra-tags": {
                        "json": "createdBy,omitempty"
                      }
                    },
                    "createdAt": {
                      "description": "Timestamp when the configuration was created.",
                      "x-order": 22,
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
                    "updatedAt": {
                      "description": "Timestamp when the configuration was last changed.",
                      "x-order": 23,
                      "x-go-type": "time.Time",
                      "type": "string",
                      "format": "date-time",
                      "x-go-name": "UpdatedAt",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "yaml": "updated_at"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "description": "Timestamp when the configuration was soft deleted. Null while it remains active.",
                      "nullable": true,
                      "x-order": 24,
                      "x-go-type": "meshcore.NullTime",
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
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
            "description": "Caller lacks the permission key required for this organization",
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
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "OrganizationSmtp"
        ],
        "operationId": "createOrganizationSmtpConfiguration",
        "summary": "Register an organization's SMTP server",
        "description": "Creates the configuration, provisioning the mail-relay environment on the organization's behalf when it does not yet exist. This is the only operation that accepts the password alongside the settings; afterwards the two are written separately.\nThe new configuration starts unproven, so mail continues to take the provider relay until the from domain is verified and a test delivery succeeds.\nDeclares no 404 for the same reason the delete does not: this operation brings the configuration into existence, so its absence beforehand is the normal case rather than an error.",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
            "description": "Organization ID",
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
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "additionalProperties": false,
                "description": "Everything needed to register an organization's mail server, settings and password together, so that registration is one operation. Accepted only on create; afterwards the settings and the credential are written by separate operations.\n`status`, the delivery counters behind it, the from-domain proof and the timestamps are all server-owned and are not accepted here. A new configuration therefore always starts at `registered`, whatever the caller sends.",
                "required": [
                  "host",
                  "port",
                  "fromAddress"
                ],
                "properties": {
                  "host": {
                    "type": "string",
                    "description": "Hostname of the organization's SMTP server.",
                    "minLength": 1,
                    "maxLength": 253,
                    "x-order": 1,
                    "x-go-type-skip-optional-pointer": true
                  },
                  "port": {
                    "type": "integer",
                    "description": "TCP port the organization's SMTP server listens on. Restricted further by a submission-port allowlist.",
                    "minimum": 1,
                    "maximum": 65535,
                    "default": 587,
                    "x-order": 2,
                    "x-go-type-skip-optional-pointer": true
                  },
                  "encryption": {
                    "type": "string",
                    "description": "Transport encryption to negotiate. `starttls` upgrades a cleartext connection (typically port 587), `tls` opens an implicit TLS connection (typically port 465), and `none` sends in cleartext.",
                    "enum": [
                      "starttls",
                      "tls",
                      "none"
                    ],
                    "default": "starttls",
                    "x-order": 3,
                    "x-go-type-skip-optional-pointer": true
                  },
                  "authMechanism": {
                    "type": "string",
                    "description": "SMTP authentication mechanism. Any mechanism other than `none` requires both a username and a password.",
                    "enum": [
                      "plain",
                      "cram-md5",
                      "none"
                    ],
                    "default": "plain",
                    "x-order": 4,
                    "x-go-type-skip-optional-pointer": true
                  },
                  "username": {
                    "type": "string",
                    "description": "Username presented to the organization's SMTP server. Required by the server, together with `password`, for every `authMechanism` other than `none`; see that property for why the pairing is a server-enforced contract rather than a schema constraint.",
                    "maxLength": 320,
                    "x-order": 5,
                    "x-oapi-codegen-extra-tags": {
                      "json": "username,omitempty"
                    }
                  },
                  "password": {
                    "type": "string",
                    "description": "Password presented to the organization's SMTP server. The server requires it, together with `username`, for every `authMechanism` other than `none`, and answers 400 when either is missing.\nThat rule is deliberately NOT encoded in `required` or as a `oneOf`/`if`-`then`. Both encodings were measured against the generator: `if`/`then` collapses this payload to `interface{}`, and `oneOf` injects a `union json.RawMessage` field with a custom marshaller, either of which costs every consumer its generated type or its wire behaviour to express a constraint the server enforces anyway. Treat this property as conditionally required by contract, not by schema.\nThis is the ONLY operation that accepts the password alongside the settings, so that registering a mail server is one call and no configuration exists in a state where it is expected to send but holds no credential. Afterwards the password is written only by the rotation operation, never by the settings update, whose payload declares no `password` property at all.\nThe redaction sentinel `***` is refused, and so is the empty string - omit the property instead of sending it empty, which the `minLength` below enforces so this payload and the rotation payload agree.",
                    "minLength": 1,
                    "maxLength": 512,
                    "x-order": 6,
                    "x-oapi-codegen-extra-tags": {
                      "json": "password,omitempty"
                    }
                  },
                  "fromAddress": {
                    "description": "Address the organization's mail is sent from.",
                    "x-order": 7,
                    "type": "string",
                    "format": "email",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "fromDisplayName": {
                    "type": "string",
                    "description": "Display name shown alongside the from address.",
                    "maxLength": 255,
                    "x-order": 8,
                    "x-oapi-codegen-extra-tags": {
                      "json": "fromDisplayName,omitempty"
                    }
                  },
                  "replyToAddress": {
                    "description": "Address replies are directed to.",
                    "x-order": 9,
                    "x-oapi-codegen-extra-tags": {
                      "json": "replyToAddress,omitempty"
                    },
                    "type": "string",
                    "format": "email",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "fallbackToProvider": {
                    "type": "boolean",
                    "description": "Whether a message this server fails to accept is re-sent through the provider's shared relay. Disabling it means a failure is a dropped message, account verification and password recovery included.",
                    "default": true,
                    "x-order": 10,
                    "x-go-type-skip-optional-pointer": true
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "The stored SMTP configuration.",
            "content": {
              "application/json": {
                "schema": {
                  "$id": "https://schemas.meshery.io/organization_smtp.yaml",
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "OrganizationSmtpConfiguration",
                  "description": "An organization's own outbound mail server. When present and healthy, every transactional email whose reader belongs to this organization - application notifications and identity-flow mail (account verification, password recovery) alike - is delivered through this server rather than through the provider's shared relay, so the message leaves from the organization's own domain. At most one live configuration exists per organization. The SMTP password is encrypted at rest and is never returned; reads always carry the redaction sentinel instead.\n\nThis is a WIRE contract only. It is not backed by a table of its own: the configuration is stored on the same environment/connection/credential chain that bring-your-own identity providers already uses - a well-known per-organization Environment, joined through environments_connections_mappings to a Connection whose credential_id points at a Credential. The organization relationship lives on `environments.organization_id`, the dial target on `connections.url` and `connections.metadata`, the transport verdict on `connections.status`, and the password alone in `credentials.secret`.\n\nNo property here carries a construct-specific `db` tag, because no property here names a column of its own. The exception is deliberate and inherited: `createdAt` and `updatedAt` `$ref` the shared core definitions, which declare `db: created_at` / `db: updated_at` for every construct that uses them, and those two tags are accurate for the underlying connection row.",
                  "additionalProperties": false,
                  "type": "object",
                  "example": {
                    "id": "00000000-0000-0000-0000-000000000000",
                    "organizationId": "00000000-0000-0000-0000-000000000000",
                    "host": "smtp.example.com",
                    "port": 587,
                    "encryption": "starttls",
                    "authMechanism": "plain",
                    "username": "no-reply@example.com",
                    "password": "***",
                    "fromAddress": "no-reply@example.com",
                    "fromDisplayName": "Example Corp",
                    "replyToAddress": "support@example.com",
                    "status": "registered",
                    "fallbackToProvider": true,
                    "fromDomain": "example.com",
                    "fromDomainVerificationToken": "0f6a5d2c9b1e4a7f8c3d6b0e2a4f7c19",
                    "fromDomainVerifiedAt": null,
                    "lastSuccessAt": null,
                    "lastFailureAt": null,
                    "consecutiveFailures": 0,
                    "createdBy": "00000000-0000-0000-0000-000000000000",
                    "createdAt": "0001-01-01T00:00:00Z",
                    "updatedAt": "0001-01-01T00:00:00Z",
                    "deletedAt": null
                  },
                  "required": [
                    "id",
                    "organizationId",
                    "host",
                    "port",
                    "encryption",
                    "authMechanism",
                    "fromAddress",
                    "status",
                    "fallbackToProvider",
                    "consecutiveFailures",
                    "createdAt",
                    "updatedAt"
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
                      "x-go-name": "ID"
                    },
                    "organizationId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-order": 2,
                      "x-go-name": "OrganizationID"
                    },
                    "host": {
                      "type": "string",
                      "description": "Hostname of the organization's SMTP server.",
                      "minLength": 1,
                      "maxLength": 253,
                      "x-order": 3,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "port": {
                      "type": "integer",
                      "description": "TCP port the organization's SMTP server listens on. The server additionally restricts this to a submission-port allowlist; a syntactically valid port outside it is refused.",
                      "minimum": 1,
                      "maximum": 65535,
                      "default": 587,
                      "x-order": 4,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "encryption": {
                      "type": "string",
                      "description": "Transport encryption to negotiate. `starttls` upgrades a cleartext connection (typically port 587), `tls` opens an implicit TLS connection (typically port 465), and `none` sends in cleartext and is intended only for an internal relay on a trusted network.",
                      "enum": [
                        "starttls",
                        "tls",
                        "none"
                      ],
                      "default": "starttls",
                      "x-order": 5,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "authMechanism": {
                      "type": "string",
                      "description": "SMTP authentication mechanism. `none` is permitted only for a relay that authorizes by source address; a configuration using any other mechanism must carry both a username and a password.",
                      "enum": [
                        "plain",
                        "cram-md5",
                        "none"
                      ],
                      "default": "plain",
                      "x-order": 6,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "username": {
                      "type": "string",
                      "description": "Username presented to the organization's SMTP server. Held beside the host rather than with the password because it is an identifier rather than a secret, and the health surface must show it without a decryption round trip. It is usually an email address, so it is returned only on an authorized read.",
                      "maxLength": 320,
                      "x-order": 7,
                      "x-oapi-codegen-extra-tags": {
                        "json": "username,omitempty"
                      }
                    },
                    "password": {
                      "type": "string",
                      "description": "Present only when a password is stored, and then always the redaction sentinel `***` - never the stored value, which is encrypted at rest and is never projected into a response. Its presence is therefore the only thing it reports: a configuration whose `authMechanism` is `none` stores no password and omits this property entirely. It is optional rather than required for exactly that reason.\nRead-only, and read-only here means read-only: no request body references this schema. The write semantics belong to the payload schemas - `OrganizationSmtpConfigurationPayload` on create and `OrganizationSmtpCredentialPayload` on rotation - and are documented there.",
                      "readOnly": true,
                      "pattern": "^\\*\\*\\*$",
                      "maxLength": 512,
                      "x-order": 8,
                      "x-oapi-codegen-extra-tags": {
                        "json": "password,omitempty"
                      }
                    },
                    "fromAddress": {
                      "description": "Address the organization's mail is sent from. Its domain must be verified before mail is routed through this server.",
                      "x-order": 9,
                      "type": "string",
                      "format": "email",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "fromDisplayName": {
                      "type": "string",
                      "description": "Display name shown alongside the from address in the message header.",
                      "maxLength": 255,
                      "x-order": 10,
                      "x-oapi-codegen-extra-tags": {
                        "json": "fromDisplayName,omitempty"
                      }
                    },
                    "replyToAddress": {
                      "description": "Address replies are directed to. It is also the address carried when a message falls back to the provider relay, which rewrites the from address to the provider's own so the message stays aligned for SPF and DMARC.",
                      "x-order": 11,
                      "x-oapi-codegen-extra-tags": {
                        "json": "replyToAddress,omitempty"
                      },
                      "type": "string",
                      "format": "email",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "status": {
                      "type": "string",
                      "description": "Lifecycle and transport verdict, carrying the connection status vocabulary because the configuration IS a connection. `registered` means configured but never proven - the from domain is unverified, or no message has yet been delivered - and mail takes the provider relay. `connected` means the last delivery attempt succeeded and mail is routed through this server. `disconnected` means consecutive failures opened the circuit, so the server is no longer dialled and the fallback setting decides what happens. `ignored` means an administrator turned it off.\n\nThe writers are disjoint on purpose: only an administrator writes `ignored`, and only the delivery circuit writes `connected` or `disconnected`. That is what keeps a deliberate opt-out distinguishable from a failing relay. It also makes \"enabled while the from domain is unverified\" unrepresentable rather than merely forbidden, which is why this property replaces the separate `enabled` and `verificationState` pair it supersedes.",
                      "enum": [
                        "registered",
                        "connected",
                        "disconnected",
                        "ignored"
                      ],
                      "default": "registered",
                      "x-order": 12,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "fallbackToProvider": {
                      "type": "boolean",
                      "description": "Whether a message that this server fails to accept is re-sent through the provider's shared relay. Disabling it means the organization owns delivery entirely and a failure is a dropped message, including account verification and password recovery.",
                      "default": true,
                      "x-order": 13,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "fromDomain": {
                      "type": "string",
                      "description": "Registrable domain of the from address, held separately as the unit that ownership is proven for.",
                      "maxLength": 253,
                      "x-order": 14,
                      "x-oapi-codegen-extra-tags": {
                        "json": "fromDomain,omitempty"
                      }
                    },
                    "fromDomainVerificationToken": {
                      "type": "string",
                      "description": "Token the organization publishes in DNS to prove control of the from domain. Not a credential - it authorizes nothing and grants no access.",
                      "maxLength": 128,
                      "x-order": 15,
                      "x-oapi-codegen-extra-tags": {
                        "json": "fromDomainVerificationToken,omitempty"
                      }
                    },
                    "fromDomainVerifiedAt": {
                      "description": "Timestamp at which control of the from domain was last proven. Null while unproven.",
                      "nullable": true,
                      "x-order": 16,
                      "x-go-type": "meshcore.NullTime",
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "lastSuccessAt": {
                      "description": "Timestamp of the last message this server accepted.",
                      "nullable": true,
                      "x-order": 17,
                      "x-go-type": "meshcore.NullTime",
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "lastFailureAt": {
                      "description": "Timestamp of the last delivery attempt this server rejected or failed to accept.",
                      "nullable": true,
                      "x-order": 18,
                      "x-go-type": "meshcore.NullTime",
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "lastFailureReason": {
                      "type": "string",
                      "description": "Classification of the last failure. Always a classification, never the remote server's own message: the set is closed on purpose, because reporting a remote server's text back to a caller would turn a refusal into an oracle for what the network can reach.",
                      "enum": [
                        "blocked_target",
                        "connect_refused",
                        "connect_timeout",
                        "tls_failed",
                        "starttls_unsupported",
                        "auth_rejected",
                        "relay_rejected_sender",
                        "relay_rejected_recipient",
                        "delivery_failed",
                        "credential_unreadable"
                      ],
                      "x-order": 19,
                      "x-oapi-codegen-extra-tags": {
                        "json": "lastFailureReason,omitempty"
                      }
                    },
                    "consecutiveFailures": {
                      "type": "integer",
                      "description": "Delivery failures since the last success. Drives the circuit that stops dialling a persistently unreachable server.",
                      "minimum": 0,
                      "default": 0,
                      "x-order": 20,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "createdBy": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "nullable": true,
                      "x-order": 21,
                      "x-oapi-codegen-extra-tags": {
                        "json": "createdBy,omitempty"
                      }
                    },
                    "createdAt": {
                      "description": "Timestamp when the configuration was created.",
                      "x-order": 22,
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
                    "updatedAt": {
                      "description": "Timestamp when the configuration was last changed.",
                      "x-order": 23,
                      "x-go-type": "time.Time",
                      "type": "string",
                      "format": "date-time",
                      "x-go-name": "UpdatedAt",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "yaml": "updated_at"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "description": "Timestamp when the configuration was soft deleted. Null while it remains active.",
                      "nullable": true,
                      "x-order": 24,
                      "x-go-type": "meshcore.NullTime",
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
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
            "description": "Caller lacks the permission key required for this organization",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "409": {
            "description": "The configuration already exists, or the requested state transition is refused in the configuration's current state",
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
        "tags": [
          "OrganizationSmtp"
        ],
        "operationId": "updateOrganizationSmtpConfiguration",
        "summary": "Update an organization's SMTP settings",
        "description": "Replaces the settings. The payload has no `password` property at all and rejects unknown properties, so this operation cannot carry a credential even by accident - rotating the password is a separate operation. That is what lets an administrator rename a display name without retyping a secret, while the redaction sentinel stays refused everywhere it can be written.\nChanging the from address to a different registrable domain resets from-domain verification and returns the configuration to `registered`.",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
            "description": "Organization ID",
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
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "additionalProperties": false,
                "description": "Client-settable settings of an organization's mail server, WITHOUT the password. The omission is deliberate and structural: because this schema forbids unknown properties, a client cannot send a credential through this operation at all, so the read-then-write round trip that would otherwise overwrite a stored password with the redaction sentinel is not expressible. Rotate the password through its own operation.",
                "required": [
                  "host",
                  "port",
                  "fromAddress"
                ],
                "properties": {
                  "host": {
                    "type": "string",
                    "description": "Hostname of the organization's SMTP server.",
                    "minLength": 1,
                    "maxLength": 253,
                    "x-order": 1,
                    "x-go-type-skip-optional-pointer": true
                  },
                  "port": {
                    "type": "integer",
                    "description": "TCP port the organization's SMTP server listens on. Restricted further by a submission-port allowlist.",
                    "minimum": 1,
                    "maximum": 65535,
                    "default": 587,
                    "x-order": 2,
                    "x-go-type-skip-optional-pointer": true
                  },
                  "encryption": {
                    "type": "string",
                    "description": "Transport encryption to negotiate.",
                    "enum": [
                      "starttls",
                      "tls",
                      "none"
                    ],
                    "default": "starttls",
                    "x-order": 3,
                    "x-go-type-skip-optional-pointer": true
                  },
                  "authMechanism": {
                    "type": "string",
                    "description": "SMTP authentication mechanism. Changing this to a mechanism other than `none` while no password is stored is refused; rotate the credential first.",
                    "enum": [
                      "plain",
                      "cram-md5",
                      "none"
                    ],
                    "default": "plain",
                    "x-order": 4,
                    "x-go-type-skip-optional-pointer": true
                  },
                  "username": {
                    "type": "string",
                    "description": "Username presented to the organization's SMTP server.",
                    "maxLength": 320,
                    "x-order": 5,
                    "x-oapi-codegen-extra-tags": {
                      "json": "username,omitempty"
                    }
                  },
                  "fromAddress": {
                    "description": "Address the organization's mail is sent from. Changing it to a different registrable domain resets from-domain verification.",
                    "x-order": 6,
                    "type": "string",
                    "format": "email",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "fromDisplayName": {
                    "type": "string",
                    "description": "Display name shown alongside the from address.",
                    "maxLength": 255,
                    "x-order": 7,
                    "x-oapi-codegen-extra-tags": {
                      "json": "fromDisplayName,omitempty"
                    }
                  },
                  "replyToAddress": {
                    "description": "Address replies are directed to.",
                    "x-order": 8,
                    "x-oapi-codegen-extra-tags": {
                      "json": "replyToAddress,omitempty"
                    },
                    "type": "string",
                    "format": "email",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "fallbackToProvider": {
                    "type": "boolean",
                    "description": "Whether a message this server fails to accept is re-sent through the provider's shared relay.",
                    "default": true,
                    "x-order": 9,
                    "x-go-type-skip-optional-pointer": true
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "The stored SMTP configuration.",
            "content": {
              "application/json": {
                "schema": {
                  "$id": "https://schemas.meshery.io/organization_smtp.yaml",
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "OrganizationSmtpConfiguration",
                  "description": "An organization's own outbound mail server. When present and healthy, every transactional email whose reader belongs to this organization - application notifications and identity-flow mail (account verification, password recovery) alike - is delivered through this server rather than through the provider's shared relay, so the message leaves from the organization's own domain. At most one live configuration exists per organization. The SMTP password is encrypted at rest and is never returned; reads always carry the redaction sentinel instead.\n\nThis is a WIRE contract only. It is not backed by a table of its own: the configuration is stored on the same environment/connection/credential chain that bring-your-own identity providers already uses - a well-known per-organization Environment, joined through environments_connections_mappings to a Connection whose credential_id points at a Credential. The organization relationship lives on `environments.organization_id`, the dial target on `connections.url` and `connections.metadata`, the transport verdict on `connections.status`, and the password alone in `credentials.secret`.\n\nNo property here carries a construct-specific `db` tag, because no property here names a column of its own. The exception is deliberate and inherited: `createdAt` and `updatedAt` `$ref` the shared core definitions, which declare `db: created_at` / `db: updated_at` for every construct that uses them, and those two tags are accurate for the underlying connection row.",
                  "additionalProperties": false,
                  "type": "object",
                  "example": {
                    "id": "00000000-0000-0000-0000-000000000000",
                    "organizationId": "00000000-0000-0000-0000-000000000000",
                    "host": "smtp.example.com",
                    "port": 587,
                    "encryption": "starttls",
                    "authMechanism": "plain",
                    "username": "no-reply@example.com",
                    "password": "***",
                    "fromAddress": "no-reply@example.com",
                    "fromDisplayName": "Example Corp",
                    "replyToAddress": "support@example.com",
                    "status": "registered",
                    "fallbackToProvider": true,
                    "fromDomain": "example.com",
                    "fromDomainVerificationToken": "0f6a5d2c9b1e4a7f8c3d6b0e2a4f7c19",
                    "fromDomainVerifiedAt": null,
                    "lastSuccessAt": null,
                    "lastFailureAt": null,
                    "consecutiveFailures": 0,
                    "createdBy": "00000000-0000-0000-0000-000000000000",
                    "createdAt": "0001-01-01T00:00:00Z",
                    "updatedAt": "0001-01-01T00:00:00Z",
                    "deletedAt": null
                  },
                  "required": [
                    "id",
                    "organizationId",
                    "host",
                    "port",
                    "encryption",
                    "authMechanism",
                    "fromAddress",
                    "status",
                    "fallbackToProvider",
                    "consecutiveFailures",
                    "createdAt",
                    "updatedAt"
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
                      "x-go-name": "ID"
                    },
                    "organizationId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-order": 2,
                      "x-go-name": "OrganizationID"
                    },
                    "host": {
                      "type": "string",
                      "description": "Hostname of the organization's SMTP server.",
                      "minLength": 1,
                      "maxLength": 253,
                      "x-order": 3,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "port": {
                      "type": "integer",
                      "description": "TCP port the organization's SMTP server listens on. The server additionally restricts this to a submission-port allowlist; a syntactically valid port outside it is refused.",
                      "minimum": 1,
                      "maximum": 65535,
                      "default": 587,
                      "x-order": 4,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "encryption": {
                      "type": "string",
                      "description": "Transport encryption to negotiate. `starttls` upgrades a cleartext connection (typically port 587), `tls` opens an implicit TLS connection (typically port 465), and `none` sends in cleartext and is intended only for an internal relay on a trusted network.",
                      "enum": [
                        "starttls",
                        "tls",
                        "none"
                      ],
                      "default": "starttls",
                      "x-order": 5,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "authMechanism": {
                      "type": "string",
                      "description": "SMTP authentication mechanism. `none` is permitted only for a relay that authorizes by source address; a configuration using any other mechanism must carry both a username and a password.",
                      "enum": [
                        "plain",
                        "cram-md5",
                        "none"
                      ],
                      "default": "plain",
                      "x-order": 6,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "username": {
                      "type": "string",
                      "description": "Username presented to the organization's SMTP server. Held beside the host rather than with the password because it is an identifier rather than a secret, and the health surface must show it without a decryption round trip. It is usually an email address, so it is returned only on an authorized read.",
                      "maxLength": 320,
                      "x-order": 7,
                      "x-oapi-codegen-extra-tags": {
                        "json": "username,omitempty"
                      }
                    },
                    "password": {
                      "type": "string",
                      "description": "Present only when a password is stored, and then always the redaction sentinel `***` - never the stored value, which is encrypted at rest and is never projected into a response. Its presence is therefore the only thing it reports: a configuration whose `authMechanism` is `none` stores no password and omits this property entirely. It is optional rather than required for exactly that reason.\nRead-only, and read-only here means read-only: no request body references this schema. The write semantics belong to the payload schemas - `OrganizationSmtpConfigurationPayload` on create and `OrganizationSmtpCredentialPayload` on rotation - and are documented there.",
                      "readOnly": true,
                      "pattern": "^\\*\\*\\*$",
                      "maxLength": 512,
                      "x-order": 8,
                      "x-oapi-codegen-extra-tags": {
                        "json": "password,omitempty"
                      }
                    },
                    "fromAddress": {
                      "description": "Address the organization's mail is sent from. Its domain must be verified before mail is routed through this server.",
                      "x-order": 9,
                      "type": "string",
                      "format": "email",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "fromDisplayName": {
                      "type": "string",
                      "description": "Display name shown alongside the from address in the message header.",
                      "maxLength": 255,
                      "x-order": 10,
                      "x-oapi-codegen-extra-tags": {
                        "json": "fromDisplayName,omitempty"
                      }
                    },
                    "replyToAddress": {
                      "description": "Address replies are directed to. It is also the address carried when a message falls back to the provider relay, which rewrites the from address to the provider's own so the message stays aligned for SPF and DMARC.",
                      "x-order": 11,
                      "x-oapi-codegen-extra-tags": {
                        "json": "replyToAddress,omitempty"
                      },
                      "type": "string",
                      "format": "email",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "status": {
                      "type": "string",
                      "description": "Lifecycle and transport verdict, carrying the connection status vocabulary because the configuration IS a connection. `registered` means configured but never proven - the from domain is unverified, or no message has yet been delivered - and mail takes the provider relay. `connected` means the last delivery attempt succeeded and mail is routed through this server. `disconnected` means consecutive failures opened the circuit, so the server is no longer dialled and the fallback setting decides what happens. `ignored` means an administrator turned it off.\n\nThe writers are disjoint on purpose: only an administrator writes `ignored`, and only the delivery circuit writes `connected` or `disconnected`. That is what keeps a deliberate opt-out distinguishable from a failing relay. It also makes \"enabled while the from domain is unverified\" unrepresentable rather than merely forbidden, which is why this property replaces the separate `enabled` and `verificationState` pair it supersedes.",
                      "enum": [
                        "registered",
                        "connected",
                        "disconnected",
                        "ignored"
                      ],
                      "default": "registered",
                      "x-order": 12,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "fallbackToProvider": {
                      "type": "boolean",
                      "description": "Whether a message that this server fails to accept is re-sent through the provider's shared relay. Disabling it means the organization owns delivery entirely and a failure is a dropped message, including account verification and password recovery.",
                      "default": true,
                      "x-order": 13,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "fromDomain": {
                      "type": "string",
                      "description": "Registrable domain of the from address, held separately as the unit that ownership is proven for.",
                      "maxLength": 253,
                      "x-order": 14,
                      "x-oapi-codegen-extra-tags": {
                        "json": "fromDomain,omitempty"
                      }
                    },
                    "fromDomainVerificationToken": {
                      "type": "string",
                      "description": "Token the organization publishes in DNS to prove control of the from domain. Not a credential - it authorizes nothing and grants no access.",
                      "maxLength": 128,
                      "x-order": 15,
                      "x-oapi-codegen-extra-tags": {
                        "json": "fromDomainVerificationToken,omitempty"
                      }
                    },
                    "fromDomainVerifiedAt": {
                      "description": "Timestamp at which control of the from domain was last proven. Null while unproven.",
                      "nullable": true,
                      "x-order": 16,
                      "x-go-type": "meshcore.NullTime",
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "lastSuccessAt": {
                      "description": "Timestamp of the last message this server accepted.",
                      "nullable": true,
                      "x-order": 17,
                      "x-go-type": "meshcore.NullTime",
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "lastFailureAt": {
                      "description": "Timestamp of the last delivery attempt this server rejected or failed to accept.",
                      "nullable": true,
                      "x-order": 18,
                      "x-go-type": "meshcore.NullTime",
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "lastFailureReason": {
                      "type": "string",
                      "description": "Classification of the last failure. Always a classification, never the remote server's own message: the set is closed on purpose, because reporting a remote server's text back to a caller would turn a refusal into an oracle for what the network can reach.",
                      "enum": [
                        "blocked_target",
                        "connect_refused",
                        "connect_timeout",
                        "tls_failed",
                        "starttls_unsupported",
                        "auth_rejected",
                        "relay_rejected_sender",
                        "relay_rejected_recipient",
                        "delivery_failed",
                        "credential_unreadable"
                      ],
                      "x-order": 19,
                      "x-oapi-codegen-extra-tags": {
                        "json": "lastFailureReason,omitempty"
                      }
                    },
                    "consecutiveFailures": {
                      "type": "integer",
                      "description": "Delivery failures since the last success. Drives the circuit that stops dialling a persistently unreachable server.",
                      "minimum": 0,
                      "default": 0,
                      "x-order": 20,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "createdBy": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "nullable": true,
                      "x-order": 21,
                      "x-oapi-codegen-extra-tags": {
                        "json": "createdBy,omitempty"
                      }
                    },
                    "createdAt": {
                      "description": "Timestamp when the configuration was created.",
                      "x-order": 22,
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
                    "updatedAt": {
                      "description": "Timestamp when the configuration was last changed.",
                      "x-order": 23,
                      "x-go-type": "time.Time",
                      "type": "string",
                      "format": "date-time",
                      "x-go-name": "UpdatedAt",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "yaml": "updated_at"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "description": "Timestamp when the configuration was soft deleted. Null while it remains active.",
                      "nullable": true,
                      "x-order": 24,
                      "x-go-type": "meshcore.NullTime",
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
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
            "description": "Caller lacks the permission key required for this organization",
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
    "/api/orgs/{orgId}/environments/mail-relay/connection/credential": {
      "put": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "OrganizationSmtp"
        ],
        "operationId": "rotateOrganizationSmtpCredential",
        "summary": "Rotate the password presented to an organization's SMTP server",
        "description": "Replaces the stored password. The redaction sentinel `***` and the empty string are REFUSED with a 400 rather than treated as \"leave it alone\", so a client that echoes a read back cannot overwrite the credential with the sentinel.",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
            "description": "Organization ID",
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
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "additionalProperties": false,
                "description": "The password presented to an organization's SMTP server. The only payload that carries it after creation.",
                "required": [
                  "password"
                ],
                "properties": {
                  "password": {
                    "type": "string",
                    "description": "New password. The redaction sentinel `***` and the empty string are refused with a 400 rather than treated as \"leave the stored value alone\", so echoing a read back cannot erase the credential.",
                    "minLength": 1,
                    "maxLength": 512,
                    "x-order": 1,
                    "x-go-type-skip-optional-pointer": true
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "The stored SMTP configuration, with the password redacted.",
            "content": {
              "application/json": {
                "schema": {
                  "$id": "https://schemas.meshery.io/organization_smtp.yaml",
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "OrganizationSmtpConfiguration",
                  "description": "An organization's own outbound mail server. When present and healthy, every transactional email whose reader belongs to this organization - application notifications and identity-flow mail (account verification, password recovery) alike - is delivered through this server rather than through the provider's shared relay, so the message leaves from the organization's own domain. At most one live configuration exists per organization. The SMTP password is encrypted at rest and is never returned; reads always carry the redaction sentinel instead.\n\nThis is a WIRE contract only. It is not backed by a table of its own: the configuration is stored on the same environment/connection/credential chain that bring-your-own identity providers already uses - a well-known per-organization Environment, joined through environments_connections_mappings to a Connection whose credential_id points at a Credential. The organization relationship lives on `environments.organization_id`, the dial target on `connections.url` and `connections.metadata`, the transport verdict on `connections.status`, and the password alone in `credentials.secret`.\n\nNo property here carries a construct-specific `db` tag, because no property here names a column of its own. The exception is deliberate and inherited: `createdAt` and `updatedAt` `$ref` the shared core definitions, which declare `db: created_at` / `db: updated_at` for every construct that uses them, and those two tags are accurate for the underlying connection row.",
                  "additionalProperties": false,
                  "type": "object",
                  "example": {
                    "id": "00000000-0000-0000-0000-000000000000",
                    "organizationId": "00000000-0000-0000-0000-000000000000",
                    "host": "smtp.example.com",
                    "port": 587,
                    "encryption": "starttls",
                    "authMechanism": "plain",
                    "username": "no-reply@example.com",
                    "password": "***",
                    "fromAddress": "no-reply@example.com",
                    "fromDisplayName": "Example Corp",
                    "replyToAddress": "support@example.com",
                    "status": "registered",
                    "fallbackToProvider": true,
                    "fromDomain": "example.com",
                    "fromDomainVerificationToken": "0f6a5d2c9b1e4a7f8c3d6b0e2a4f7c19",
                    "fromDomainVerifiedAt": null,
                    "lastSuccessAt": null,
                    "lastFailureAt": null,
                    "consecutiveFailures": 0,
                    "createdBy": "00000000-0000-0000-0000-000000000000",
                    "createdAt": "0001-01-01T00:00:00Z",
                    "updatedAt": "0001-01-01T00:00:00Z",
                    "deletedAt": null
                  },
                  "required": [
                    "id",
                    "organizationId",
                    "host",
                    "port",
                    "encryption",
                    "authMechanism",
                    "fromAddress",
                    "status",
                    "fallbackToProvider",
                    "consecutiveFailures",
                    "createdAt",
                    "updatedAt"
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
                      "x-go-name": "ID"
                    },
                    "organizationId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-order": 2,
                      "x-go-name": "OrganizationID"
                    },
                    "host": {
                      "type": "string",
                      "description": "Hostname of the organization's SMTP server.",
                      "minLength": 1,
                      "maxLength": 253,
                      "x-order": 3,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "port": {
                      "type": "integer",
                      "description": "TCP port the organization's SMTP server listens on. The server additionally restricts this to a submission-port allowlist; a syntactically valid port outside it is refused.",
                      "minimum": 1,
                      "maximum": 65535,
                      "default": 587,
                      "x-order": 4,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "encryption": {
                      "type": "string",
                      "description": "Transport encryption to negotiate. `starttls` upgrades a cleartext connection (typically port 587), `tls` opens an implicit TLS connection (typically port 465), and `none` sends in cleartext and is intended only for an internal relay on a trusted network.",
                      "enum": [
                        "starttls",
                        "tls",
                        "none"
                      ],
                      "default": "starttls",
                      "x-order": 5,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "authMechanism": {
                      "type": "string",
                      "description": "SMTP authentication mechanism. `none` is permitted only for a relay that authorizes by source address; a configuration using any other mechanism must carry both a username and a password.",
                      "enum": [
                        "plain",
                        "cram-md5",
                        "none"
                      ],
                      "default": "plain",
                      "x-order": 6,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "username": {
                      "type": "string",
                      "description": "Username presented to the organization's SMTP server. Held beside the host rather than with the password because it is an identifier rather than a secret, and the health surface must show it without a decryption round trip. It is usually an email address, so it is returned only on an authorized read.",
                      "maxLength": 320,
                      "x-order": 7,
                      "x-oapi-codegen-extra-tags": {
                        "json": "username,omitempty"
                      }
                    },
                    "password": {
                      "type": "string",
                      "description": "Present only when a password is stored, and then always the redaction sentinel `***` - never the stored value, which is encrypted at rest and is never projected into a response. Its presence is therefore the only thing it reports: a configuration whose `authMechanism` is `none` stores no password and omits this property entirely. It is optional rather than required for exactly that reason.\nRead-only, and read-only here means read-only: no request body references this schema. The write semantics belong to the payload schemas - `OrganizationSmtpConfigurationPayload` on create and `OrganizationSmtpCredentialPayload` on rotation - and are documented there.",
                      "readOnly": true,
                      "pattern": "^\\*\\*\\*$",
                      "maxLength": 512,
                      "x-order": 8,
                      "x-oapi-codegen-extra-tags": {
                        "json": "password,omitempty"
                      }
                    },
                    "fromAddress": {
                      "description": "Address the organization's mail is sent from. Its domain must be verified before mail is routed through this server.",
                      "x-order": 9,
                      "type": "string",
                      "format": "email",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "fromDisplayName": {
                      "type": "string",
                      "description": "Display name shown alongside the from address in the message header.",
                      "maxLength": 255,
                      "x-order": 10,
                      "x-oapi-codegen-extra-tags": {
                        "json": "fromDisplayName,omitempty"
                      }
                    },
                    "replyToAddress": {
                      "description": "Address replies are directed to. It is also the address carried when a message falls back to the provider relay, which rewrites the from address to the provider's own so the message stays aligned for SPF and DMARC.",
                      "x-order": 11,
                      "x-oapi-codegen-extra-tags": {
                        "json": "replyToAddress,omitempty"
                      },
                      "type": "string",
                      "format": "email",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "status": {
                      "type": "string",
                      "description": "Lifecycle and transport verdict, carrying the connection status vocabulary because the configuration IS a connection. `registered` means configured but never proven - the from domain is unverified, or no message has yet been delivered - and mail takes the provider relay. `connected` means the last delivery attempt succeeded and mail is routed through this server. `disconnected` means consecutive failures opened the circuit, so the server is no longer dialled and the fallback setting decides what happens. `ignored` means an administrator turned it off.\n\nThe writers are disjoint on purpose: only an administrator writes `ignored`, and only the delivery circuit writes `connected` or `disconnected`. That is what keeps a deliberate opt-out distinguishable from a failing relay. It also makes \"enabled while the from domain is unverified\" unrepresentable rather than merely forbidden, which is why this property replaces the separate `enabled` and `verificationState` pair it supersedes.",
                      "enum": [
                        "registered",
                        "connected",
                        "disconnected",
                        "ignored"
                      ],
                      "default": "registered",
                      "x-order": 12,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "fallbackToProvider": {
                      "type": "boolean",
                      "description": "Whether a message that this server fails to accept is re-sent through the provider's shared relay. Disabling it means the organization owns delivery entirely and a failure is a dropped message, including account verification and password recovery.",
                      "default": true,
                      "x-order": 13,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "fromDomain": {
                      "type": "string",
                      "description": "Registrable domain of the from address, held separately as the unit that ownership is proven for.",
                      "maxLength": 253,
                      "x-order": 14,
                      "x-oapi-codegen-extra-tags": {
                        "json": "fromDomain,omitempty"
                      }
                    },
                    "fromDomainVerificationToken": {
                      "type": "string",
                      "description": "Token the organization publishes in DNS to prove control of the from domain. Not a credential - it authorizes nothing and grants no access.",
                      "maxLength": 128,
                      "x-order": 15,
                      "x-oapi-codegen-extra-tags": {
                        "json": "fromDomainVerificationToken,omitempty"
                      }
                    },
                    "fromDomainVerifiedAt": {
                      "description": "Timestamp at which control of the from domain was last proven. Null while unproven.",
                      "nullable": true,
                      "x-order": 16,
                      "x-go-type": "meshcore.NullTime",
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "lastSuccessAt": {
                      "description": "Timestamp of the last message this server accepted.",
                      "nullable": true,
                      "x-order": 17,
                      "x-go-type": "meshcore.NullTime",
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "lastFailureAt": {
                      "description": "Timestamp of the last delivery attempt this server rejected or failed to accept.",
                      "nullable": true,
                      "x-order": 18,
                      "x-go-type": "meshcore.NullTime",
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "lastFailureReason": {
                      "type": "string",
                      "description": "Classification of the last failure. Always a classification, never the remote server's own message: the set is closed on purpose, because reporting a remote server's text back to a caller would turn a refusal into an oracle for what the network can reach.",
                      "enum": [
                        "blocked_target",
                        "connect_refused",
                        "connect_timeout",
                        "tls_failed",
                        "starttls_unsupported",
                        "auth_rejected",
                        "relay_rejected_sender",
                        "relay_rejected_recipient",
                        "delivery_failed",
                        "credential_unreadable"
                      ],
                      "x-order": 19,
                      "x-oapi-codegen-extra-tags": {
                        "json": "lastFailureReason,omitempty"
                      }
                    },
                    "consecutiveFailures": {
                      "type": "integer",
                      "description": "Delivery failures since the last success. Drives the circuit that stops dialling a persistently unreachable server.",
                      "minimum": 0,
                      "default": 0,
                      "x-order": 20,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "createdBy": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "nullable": true,
                      "x-order": 21,
                      "x-oapi-codegen-extra-tags": {
                        "json": "createdBy,omitempty"
                      }
                    },
                    "createdAt": {
                      "description": "Timestamp when the configuration was created.",
                      "x-order": 22,
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
                    "updatedAt": {
                      "description": "Timestamp when the configuration was last changed.",
                      "x-order": 23,
                      "x-go-type": "time.Time",
                      "type": "string",
                      "format": "date-time",
                      "x-go-name": "UpdatedAt",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "yaml": "updated_at"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "description": "Timestamp when the configuration was soft deleted. Null while it remains active.",
                      "nullable": true,
                      "x-order": 24,
                      "x-go-type": "meshcore.NullTime",
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
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
            "description": "Caller lacks the permission key required for this organization",
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
    "/api/orgs/{orgId}/environments/mail-relay/connection/enablement": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "OrganizationSmtp"
        ],
        "operationId": "setOrganizationSmtpEnablement",
        "summary": "Turn an organization's own mail server on or off",
        "description": "The only operation by which an administrator writes the configuration's status, and it can write only the two administrative states: turning it off moves the configuration to `ignored`, and turning it on returns it to `registered` so that it must prove itself again before mail is routed. `connected` and `disconnected` are written by delivery outcomes alone and are never settable here, which is what keeps a deliberate opt-out distinguishable from a failing relay.\nTurning it on is refused with a 409 while the from domain is unverified.",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
            "description": "Organization ID",
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
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "additionalProperties": false,
                "description": "Administrative on/off for an organization's own mail server. It cannot express the delivery-driven states, which are written by outcomes alone.",
                "required": [
                  "enabled"
                ],
                "properties": {
                  "enabled": {
                    "type": "boolean",
                    "description": "True returns the configuration to `registered` so it may prove itself and carry mail; false moves it to `ignored`. Turning it on is refused while the from domain is unverified.",
                    "x-order": 1,
                    "x-go-type-skip-optional-pointer": true
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "The stored SMTP configuration.",
            "content": {
              "application/json": {
                "schema": {
                  "$id": "https://schemas.meshery.io/organization_smtp.yaml",
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "OrganizationSmtpConfiguration",
                  "description": "An organization's own outbound mail server. When present and healthy, every transactional email whose reader belongs to this organization - application notifications and identity-flow mail (account verification, password recovery) alike - is delivered through this server rather than through the provider's shared relay, so the message leaves from the organization's own domain. At most one live configuration exists per organization. The SMTP password is encrypted at rest and is never returned; reads always carry the redaction sentinel instead.\n\nThis is a WIRE contract only. It is not backed by a table of its own: the configuration is stored on the same environment/connection/credential chain that bring-your-own identity providers already uses - a well-known per-organization Environment, joined through environments_connections_mappings to a Connection whose credential_id points at a Credential. The organization relationship lives on `environments.organization_id`, the dial target on `connections.url` and `connections.metadata`, the transport verdict on `connections.status`, and the password alone in `credentials.secret`.\n\nNo property here carries a construct-specific `db` tag, because no property here names a column of its own. The exception is deliberate and inherited: `createdAt` and `updatedAt` `$ref` the shared core definitions, which declare `db: created_at` / `db: updated_at` for every construct that uses them, and those two tags are accurate for the underlying connection row.",
                  "additionalProperties": false,
                  "type": "object",
                  "example": {
                    "id": "00000000-0000-0000-0000-000000000000",
                    "organizationId": "00000000-0000-0000-0000-000000000000",
                    "host": "smtp.example.com",
                    "port": 587,
                    "encryption": "starttls",
                    "authMechanism": "plain",
                    "username": "no-reply@example.com",
                    "password": "***",
                    "fromAddress": "no-reply@example.com",
                    "fromDisplayName": "Example Corp",
                    "replyToAddress": "support@example.com",
                    "status": "registered",
                    "fallbackToProvider": true,
                    "fromDomain": "example.com",
                    "fromDomainVerificationToken": "0f6a5d2c9b1e4a7f8c3d6b0e2a4f7c19",
                    "fromDomainVerifiedAt": null,
                    "lastSuccessAt": null,
                    "lastFailureAt": null,
                    "consecutiveFailures": 0,
                    "createdBy": "00000000-0000-0000-0000-000000000000",
                    "createdAt": "0001-01-01T00:00:00Z",
                    "updatedAt": "0001-01-01T00:00:00Z",
                    "deletedAt": null
                  },
                  "required": [
                    "id",
                    "organizationId",
                    "host",
                    "port",
                    "encryption",
                    "authMechanism",
                    "fromAddress",
                    "status",
                    "fallbackToProvider",
                    "consecutiveFailures",
                    "createdAt",
                    "updatedAt"
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
                      "x-go-name": "ID"
                    },
                    "organizationId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "x-order": 2,
                      "x-go-name": "OrganizationID"
                    },
                    "host": {
                      "type": "string",
                      "description": "Hostname of the organization's SMTP server.",
                      "minLength": 1,
                      "maxLength": 253,
                      "x-order": 3,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "port": {
                      "type": "integer",
                      "description": "TCP port the organization's SMTP server listens on. The server additionally restricts this to a submission-port allowlist; a syntactically valid port outside it is refused.",
                      "minimum": 1,
                      "maximum": 65535,
                      "default": 587,
                      "x-order": 4,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "encryption": {
                      "type": "string",
                      "description": "Transport encryption to negotiate. `starttls` upgrades a cleartext connection (typically port 587), `tls` opens an implicit TLS connection (typically port 465), and `none` sends in cleartext and is intended only for an internal relay on a trusted network.",
                      "enum": [
                        "starttls",
                        "tls",
                        "none"
                      ],
                      "default": "starttls",
                      "x-order": 5,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "authMechanism": {
                      "type": "string",
                      "description": "SMTP authentication mechanism. `none` is permitted only for a relay that authorizes by source address; a configuration using any other mechanism must carry both a username and a password.",
                      "enum": [
                        "plain",
                        "cram-md5",
                        "none"
                      ],
                      "default": "plain",
                      "x-order": 6,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "username": {
                      "type": "string",
                      "description": "Username presented to the organization's SMTP server. Held beside the host rather than with the password because it is an identifier rather than a secret, and the health surface must show it without a decryption round trip. It is usually an email address, so it is returned only on an authorized read.",
                      "maxLength": 320,
                      "x-order": 7,
                      "x-oapi-codegen-extra-tags": {
                        "json": "username,omitempty"
                      }
                    },
                    "password": {
                      "type": "string",
                      "description": "Present only when a password is stored, and then always the redaction sentinel `***` - never the stored value, which is encrypted at rest and is never projected into a response. Its presence is therefore the only thing it reports: a configuration whose `authMechanism` is `none` stores no password and omits this property entirely. It is optional rather than required for exactly that reason.\nRead-only, and read-only here means read-only: no request body references this schema. The write semantics belong to the payload schemas - `OrganizationSmtpConfigurationPayload` on create and `OrganizationSmtpCredentialPayload` on rotation - and are documented there.",
                      "readOnly": true,
                      "pattern": "^\\*\\*\\*$",
                      "maxLength": 512,
                      "x-order": 8,
                      "x-oapi-codegen-extra-tags": {
                        "json": "password,omitempty"
                      }
                    },
                    "fromAddress": {
                      "description": "Address the organization's mail is sent from. Its domain must be verified before mail is routed through this server.",
                      "x-order": 9,
                      "type": "string",
                      "format": "email",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "fromDisplayName": {
                      "type": "string",
                      "description": "Display name shown alongside the from address in the message header.",
                      "maxLength": 255,
                      "x-order": 10,
                      "x-oapi-codegen-extra-tags": {
                        "json": "fromDisplayName,omitempty"
                      }
                    },
                    "replyToAddress": {
                      "description": "Address replies are directed to. It is also the address carried when a message falls back to the provider relay, which rewrites the from address to the provider's own so the message stays aligned for SPF and DMARC.",
                      "x-order": 11,
                      "x-oapi-codegen-extra-tags": {
                        "json": "replyToAddress,omitempty"
                      },
                      "type": "string",
                      "format": "email",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "status": {
                      "type": "string",
                      "description": "Lifecycle and transport verdict, carrying the connection status vocabulary because the configuration IS a connection. `registered` means configured but never proven - the from domain is unverified, or no message has yet been delivered - and mail takes the provider relay. `connected` means the last delivery attempt succeeded and mail is routed through this server. `disconnected` means consecutive failures opened the circuit, so the server is no longer dialled and the fallback setting decides what happens. `ignored` means an administrator turned it off.\n\nThe writers are disjoint on purpose: only an administrator writes `ignored`, and only the delivery circuit writes `connected` or `disconnected`. That is what keeps a deliberate opt-out distinguishable from a failing relay. It also makes \"enabled while the from domain is unverified\" unrepresentable rather than merely forbidden, which is why this property replaces the separate `enabled` and `verificationState` pair it supersedes.",
                      "enum": [
                        "registered",
                        "connected",
                        "disconnected",
                        "ignored"
                      ],
                      "default": "registered",
                      "x-order": 12,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "fallbackToProvider": {
                      "type": "boolean",
                      "description": "Whether a message that this server fails to accept is re-sent through the provider's shared relay. Disabling it means the organization owns delivery entirely and a failure is a dropped message, including account verification and password recovery.",
                      "default": true,
                      "x-order": 13,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "fromDomain": {
                      "type": "string",
                      "description": "Registrable domain of the from address, held separately as the unit that ownership is proven for.",
                      "maxLength": 253,
                      "x-order": 14,
                      "x-oapi-codegen-extra-tags": {
                        "json": "fromDomain,omitempty"
                      }
                    },
                    "fromDomainVerificationToken": {
                      "type": "string",
                      "description": "Token the organization publishes in DNS to prove control of the from domain. Not a credential - it authorizes nothing and grants no access.",
                      "maxLength": 128,
                      "x-order": 15,
                      "x-oapi-codegen-extra-tags": {
                        "json": "fromDomainVerificationToken,omitempty"
                      }
                    },
                    "fromDomainVerifiedAt": {
                      "description": "Timestamp at which control of the from domain was last proven. Null while unproven.",
                      "nullable": true,
                      "x-order": 16,
                      "x-go-type": "meshcore.NullTime",
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "lastSuccessAt": {
                      "description": "Timestamp of the last message this server accepted.",
                      "nullable": true,
                      "x-order": 17,
                      "x-go-type": "meshcore.NullTime",
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "lastFailureAt": {
                      "description": "Timestamp of the last delivery attempt this server rejected or failed to accept.",
                      "nullable": true,
                      "x-order": 18,
                      "x-go-type": "meshcore.NullTime",
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "lastFailureReason": {
                      "type": "string",
                      "description": "Classification of the last failure. Always a classification, never the remote server's own message: the set is closed on purpose, because reporting a remote server's text back to a caller would turn a refusal into an oracle for what the network can reach.",
                      "enum": [
                        "blocked_target",
                        "connect_refused",
                        "connect_timeout",
                        "tls_failed",
                        "starttls_unsupported",
                        "auth_rejected",
                        "relay_rejected_sender",
                        "relay_rejected_recipient",
                        "delivery_failed",
                        "credential_unreadable"
                      ],
                      "x-order": 19,
                      "x-oapi-codegen-extra-tags": {
                        "json": "lastFailureReason,omitempty"
                      }
                    },
                    "consecutiveFailures": {
                      "type": "integer",
                      "description": "Delivery failures since the last success. Drives the circuit that stops dialling a persistently unreachable server.",
                      "minimum": 0,
                      "default": 0,
                      "x-order": 20,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "createdBy": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      },
                      "nullable": true,
                      "x-order": 21,
                      "x-oapi-codegen-extra-tags": {
                        "json": "createdBy,omitempty"
                      }
                    },
                    "createdAt": {
                      "description": "Timestamp when the configuration was created.",
                      "x-order": 22,
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
                    "updatedAt": {
                      "description": "Timestamp when the configuration was last changed.",
                      "x-order": 23,
                      "x-go-type": "time.Time",
                      "type": "string",
                      "format": "date-time",
                      "x-go-name": "UpdatedAt",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "yaml": "updated_at"
                      },
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "description": "Timestamp when the configuration was soft deleted. Null while it remains active.",
                      "nullable": true,
                      "x-order": 24,
                      "x-go-type": "meshcore.NullTime",
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
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
            "description": "Caller lacks the permission key required for this organization",
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
          "409": {
            "description": "The configuration already exists, or the requested state transition is refused in the configuration's current state",
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
    "/api/orgs/{orgId}/environments/mail-relay/connection/test": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "OrganizationSmtp"
        ],
        "operationId": "testOrganizationSmtpConfiguration",
        "summary": "Send a test message through an organization's SMTP configuration",
        "description": "Delivers a real message through the configured server and reports a classified outcome. A real delivery rather than a connection probe on purpose: a server that connects and authenticates but refuses the sender or the recipient is the most common misconfiguration, and a probe reports it healthy.\nA successful test is also what promotes a verified configuration from `registered` to `connected`, so this operation is part of the lifecycle rather than a convenience. It takes the same permission as a write, because there is no read-only form of dialling an arbitrary host, and it is rate limited per organization.\nThe recipient defaults to the calling administrator's own address. The outcome is a classification, never the remote server's own text.",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
            "description": "Organization ID",
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
          "required": false,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "additionalProperties": false,
                "description": "Options for a test delivery.",
                "properties": {
                  "to": {
                    "description": "Recipient of the test message. Defaults to the calling administrator's own address.",
                    "x-order": 1,
                    "x-oapi-codegen-extra-tags": {
                      "json": "to,omitempty"
                    },
                    "type": "string",
                    "format": "email",
                    "x-go-type-skip-optional-pointer": true
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "The classified outcome of the delivery attempt.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": false,
                  "description": "Classified outcome of a test delivery. Carries no text from the remote server, so a refusal reveals nothing about what the network can reach.",
                  "required": [
                    "outcome",
                    "testedAt"
                  ],
                  "properties": {
                    "outcome": {
                      "type": "string",
                      "description": "What happened. `delivered` means the server accepted the message; every other value names the stage that refused it.",
                      "enum": [
                        "delivered",
                        "blocked_target",
                        "connect_refused",
                        "connect_timeout",
                        "tls_failed",
                        "starttls_unsupported",
                        "auth_rejected",
                        "relay_rejected_sender",
                        "relay_rejected_recipient",
                        "delivery_failed",
                        "credential_unreadable"
                      ],
                      "x-order": 1,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "message": {
                      "type": "string",
                      "description": "Human-readable summary of the outcome, drawn from a fixed set of phrasings.",
                      "maxLength": 1000,
                      "x-order": 2,
                      "x-oapi-codegen-extra-tags": {
                        "json": "message,omitempty"
                      }
                    },
                    "sentTo": {
                      "description": "Address the test message was addressed to.",
                      "x-order": 3,
                      "x-oapi-codegen-extra-tags": {
                        "json": "sentTo,omitempty"
                      },
                      "type": "string",
                      "format": "email",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "testedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "When the delivery was attempted.",
                      "x-go-type": "time.Time",
                      "x-order": 4,
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
            "description": "Caller lacks the permission key required for this organization",
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
            "description": "Too many attempts for this organization",
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
    "/api/orgs/{orgId}/environments/mail-relay/domain-verification": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "OrganizationSmtp"
        ],
        "operationId": "getOrganizationSmtpDomainVerification",
        "summary": "Get the from-domain verification challenge",
        "description": "Returns the DNS record the organization must publish to prove control of its from domain, together with the current verification state. A from domain that matches the organization's own registered custom domain is already proven and needs no record.",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
            "description": "Organization ID",
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
            "description": "The verification challenge and its current state.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": false,
                  "description": "The DNS record proving control of an organization's from domain, and the current state of that proof.",
                  "required": [
                    "domain",
                    "verified",
                    "method"
                  ],
                  "properties": {
                    "domain": {
                      "type": "string",
                      "description": "Registrable domain the proof applies to.",
                      "maxLength": 253,
                      "x-order": 1,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "method": {
                      "type": "string",
                      "description": "How the domain is proven. `custom-domain` means it matches the organization's own registered custom domain and needs no record; `dns-txt` means the record below must be published.",
                      "enum": [
                        "custom-domain",
                        "dns-txt"
                      ],
                      "x-order": 2,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "recordName": {
                      "type": "string",
                      "description": "Fully qualified name of the TXT record to publish.",
                      "maxLength": 253,
                      "x-order": 3,
                      "x-oapi-codegen-extra-tags": {
                        "json": "recordName,omitempty"
                      }
                    },
                    "recordValue": {
                      "type": "string",
                      "description": "Value the TXT record must carry.",
                      "maxLength": 512,
                      "x-order": 4,
                      "x-oapi-codegen-extra-tags": {
                        "json": "recordValue,omitempty"
                      }
                    },
                    "verified": {
                      "type": "boolean",
                      "description": "Whether control of the domain is currently proven.",
                      "x-order": 5,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "verifiedAt": {
                      "description": "When control was last proven. Null while unproven.",
                      "nullable": true,
                      "x-order": 6,
                      "x-go-type": "meshcore.NullTime",
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "failureReason": {
                      "type": "string",
                      "description": "Why the last check did not prove control.",
                      "enum": [
                        "record_not_found",
                        "record_mismatch",
                        "lookup_failed",
                        "domain_reserved"
                      ],
                      "x-order": 7,
                      "x-oapi-codegen-extra-tags": {
                        "json": "failureReason,omitempty"
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
            "description": "Caller lacks the permission key required for this organization",
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
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "OrganizationSmtp"
        ],
        "operationId": "verifyOrganizationSmtpDomain",
        "summary": "Check the from-domain verification challenge",
        "description": "Resolves the challenge record and records the result. Proving the domain is what permits mail to be routed through the organization's server. Rate limited per organization.",
        "parameters": [
          {
            "name": "orgId",
            "in": "path",
            "description": "Organization ID",
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
            "description": "The outcome of the verification check.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": false,
                  "description": "The DNS record proving control of an organization's from domain, and the current state of that proof.",
                  "required": [
                    "domain",
                    "verified",
                    "method"
                  ],
                  "properties": {
                    "domain": {
                      "type": "string",
                      "description": "Registrable domain the proof applies to.",
                      "maxLength": 253,
                      "x-order": 1,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "method": {
                      "type": "string",
                      "description": "How the domain is proven. `custom-domain` means it matches the organization's own registered custom domain and needs no record; `dns-txt` means the record below must be published.",
                      "enum": [
                        "custom-domain",
                        "dns-txt"
                      ],
                      "x-order": 2,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "recordName": {
                      "type": "string",
                      "description": "Fully qualified name of the TXT record to publish.",
                      "maxLength": 253,
                      "x-order": 3,
                      "x-oapi-codegen-extra-tags": {
                        "json": "recordName,omitempty"
                      }
                    },
                    "recordValue": {
                      "type": "string",
                      "description": "Value the TXT record must carry.",
                      "maxLength": 512,
                      "x-order": 4,
                      "x-oapi-codegen-extra-tags": {
                        "json": "recordValue,omitempty"
                      }
                    },
                    "verified": {
                      "type": "boolean",
                      "description": "Whether control of the domain is currently proven.",
                      "x-order": 5,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "verifiedAt": {
                      "description": "When control was last proven. Null while unproven.",
                      "nullable": true,
                      "x-order": 6,
                      "x-go-type": "meshcore.NullTime",
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "failureReason": {
                      "type": "string",
                      "description": "Why the last check did not prove control.",
                      "enum": [
                        "record_not_found",
                        "record_mismatch",
                        "lookup_failed",
                        "domain_reserved"
                      ],
                      "x-order": 7,
                      "x-oapi-codegen-extra-tags": {
                        "json": "failureReason,omitempty"
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
          "403": {
            "description": "Caller lacks the permission key required for this organization",
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
            "description": "Too many attempts for this organization",
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
      "403": {
        "description": "Caller lacks the permission key required for this organization",
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
      "409": {
        "description": "The configuration already exists, or the requested state transition is refused in the configuration's current state",
        "content": {
          "text/plain": {
            "schema": {
              "type": "string"
            }
          }
        }
      },
      "429": {
        "description": "Too many attempts for this organization",
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
        "description": "Organization ID",
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
    },
    "securitySchemes": {
      "jwt": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    },
    "requestBodies": {
      "organizationSmtpConfigurationPayload": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "additionalProperties": false,
              "description": "Everything needed to register an organization's mail server, settings and password together, so that registration is one operation. Accepted only on create; afterwards the settings and the credential are written by separate operations.\n`status`, the delivery counters behind it, the from-domain proof and the timestamps are all server-owned and are not accepted here. A new configuration therefore always starts at `registered`, whatever the caller sends.",
              "required": [
                "host",
                "port",
                "fromAddress"
              ],
              "properties": {
                "host": {
                  "type": "string",
                  "description": "Hostname of the organization's SMTP server.",
                  "minLength": 1,
                  "maxLength": 253,
                  "x-order": 1,
                  "x-go-type-skip-optional-pointer": true
                },
                "port": {
                  "type": "integer",
                  "description": "TCP port the organization's SMTP server listens on. Restricted further by a submission-port allowlist.",
                  "minimum": 1,
                  "maximum": 65535,
                  "default": 587,
                  "x-order": 2,
                  "x-go-type-skip-optional-pointer": true
                },
                "encryption": {
                  "type": "string",
                  "description": "Transport encryption to negotiate. `starttls` upgrades a cleartext connection (typically port 587), `tls` opens an implicit TLS connection (typically port 465), and `none` sends in cleartext.",
                  "enum": [
                    "starttls",
                    "tls",
                    "none"
                  ],
                  "default": "starttls",
                  "x-order": 3,
                  "x-go-type-skip-optional-pointer": true
                },
                "authMechanism": {
                  "type": "string",
                  "description": "SMTP authentication mechanism. Any mechanism other than `none` requires both a username and a password.",
                  "enum": [
                    "plain",
                    "cram-md5",
                    "none"
                  ],
                  "default": "plain",
                  "x-order": 4,
                  "x-go-type-skip-optional-pointer": true
                },
                "username": {
                  "type": "string",
                  "description": "Username presented to the organization's SMTP server. Required by the server, together with `password`, for every `authMechanism` other than `none`; see that property for why the pairing is a server-enforced contract rather than a schema constraint.",
                  "maxLength": 320,
                  "x-order": 5,
                  "x-oapi-codegen-extra-tags": {
                    "json": "username,omitempty"
                  }
                },
                "password": {
                  "type": "string",
                  "description": "Password presented to the organization's SMTP server. The server requires it, together with `username`, for every `authMechanism` other than `none`, and answers 400 when either is missing.\nThat rule is deliberately NOT encoded in `required` or as a `oneOf`/`if`-`then`. Both encodings were measured against the generator: `if`/`then` collapses this payload to `interface{}`, and `oneOf` injects a `union json.RawMessage` field with a custom marshaller, either of which costs every consumer its generated type or its wire behaviour to express a constraint the server enforces anyway. Treat this property as conditionally required by contract, not by schema.\nThis is the ONLY operation that accepts the password alongside the settings, so that registering a mail server is one call and no configuration exists in a state where it is expected to send but holds no credential. Afterwards the password is written only by the rotation operation, never by the settings update, whose payload declares no `password` property at all.\nThe redaction sentinel `***` is refused, and so is the empty string - omit the property instead of sending it empty, which the `minLength` below enforces so this payload and the rotation payload agree.",
                  "minLength": 1,
                  "maxLength": 512,
                  "x-order": 6,
                  "x-oapi-codegen-extra-tags": {
                    "json": "password,omitempty"
                  }
                },
                "fromAddress": {
                  "description": "Address the organization's mail is sent from.",
                  "x-order": 7,
                  "type": "string",
                  "format": "email",
                  "x-go-type-skip-optional-pointer": true
                },
                "fromDisplayName": {
                  "type": "string",
                  "description": "Display name shown alongside the from address.",
                  "maxLength": 255,
                  "x-order": 8,
                  "x-oapi-codegen-extra-tags": {
                    "json": "fromDisplayName,omitempty"
                  }
                },
                "replyToAddress": {
                  "description": "Address replies are directed to.",
                  "x-order": 9,
                  "x-oapi-codegen-extra-tags": {
                    "json": "replyToAddress,omitempty"
                  },
                  "type": "string",
                  "format": "email",
                  "x-go-type-skip-optional-pointer": true
                },
                "fallbackToProvider": {
                  "type": "boolean",
                  "description": "Whether a message this server fails to accept is re-sent through the provider's shared relay. Disabling it means a failure is a dropped message, account verification and password recovery included.",
                  "default": true,
                  "x-order": 10,
                  "x-go-type-skip-optional-pointer": true
                }
              }
            }
          }
        }
      },
      "organizationSmtpSettingsPayload": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "additionalProperties": false,
              "description": "Client-settable settings of an organization's mail server, WITHOUT the password. The omission is deliberate and structural: because this schema forbids unknown properties, a client cannot send a credential through this operation at all, so the read-then-write round trip that would otherwise overwrite a stored password with the redaction sentinel is not expressible. Rotate the password through its own operation.",
              "required": [
                "host",
                "port",
                "fromAddress"
              ],
              "properties": {
                "host": {
                  "type": "string",
                  "description": "Hostname of the organization's SMTP server.",
                  "minLength": 1,
                  "maxLength": 253,
                  "x-order": 1,
                  "x-go-type-skip-optional-pointer": true
                },
                "port": {
                  "type": "integer",
                  "description": "TCP port the organization's SMTP server listens on. Restricted further by a submission-port allowlist.",
                  "minimum": 1,
                  "maximum": 65535,
                  "default": 587,
                  "x-order": 2,
                  "x-go-type-skip-optional-pointer": true
                },
                "encryption": {
                  "type": "string",
                  "description": "Transport encryption to negotiate.",
                  "enum": [
                    "starttls",
                    "tls",
                    "none"
                  ],
                  "default": "starttls",
                  "x-order": 3,
                  "x-go-type-skip-optional-pointer": true
                },
                "authMechanism": {
                  "type": "string",
                  "description": "SMTP authentication mechanism. Changing this to a mechanism other than `none` while no password is stored is refused; rotate the credential first.",
                  "enum": [
                    "plain",
                    "cram-md5",
                    "none"
                  ],
                  "default": "plain",
                  "x-order": 4,
                  "x-go-type-skip-optional-pointer": true
                },
                "username": {
                  "type": "string",
                  "description": "Username presented to the organization's SMTP server.",
                  "maxLength": 320,
                  "x-order": 5,
                  "x-oapi-codegen-extra-tags": {
                    "json": "username,omitempty"
                  }
                },
                "fromAddress": {
                  "description": "Address the organization's mail is sent from. Changing it to a different registrable domain resets from-domain verification.",
                  "x-order": 6,
                  "type": "string",
                  "format": "email",
                  "x-go-type-skip-optional-pointer": true
                },
                "fromDisplayName": {
                  "type": "string",
                  "description": "Display name shown alongside the from address.",
                  "maxLength": 255,
                  "x-order": 7,
                  "x-oapi-codegen-extra-tags": {
                    "json": "fromDisplayName,omitempty"
                  }
                },
                "replyToAddress": {
                  "description": "Address replies are directed to.",
                  "x-order": 8,
                  "x-oapi-codegen-extra-tags": {
                    "json": "replyToAddress,omitempty"
                  },
                  "type": "string",
                  "format": "email",
                  "x-go-type-skip-optional-pointer": true
                },
                "fallbackToProvider": {
                  "type": "boolean",
                  "description": "Whether a message this server fails to accept is re-sent through the provider's shared relay.",
                  "default": true,
                  "x-order": 9,
                  "x-go-type-skip-optional-pointer": true
                }
              }
            }
          }
        }
      },
      "organizationSmtpCredentialPayload": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "additionalProperties": false,
              "description": "The password presented to an organization's SMTP server. The only payload that carries it after creation.",
              "required": [
                "password"
              ],
              "properties": {
                "password": {
                  "type": "string",
                  "description": "New password. The redaction sentinel `***` and the empty string are refused with a 400 rather than treated as \"leave the stored value alone\", so echoing a read back cannot erase the credential.",
                  "minLength": 1,
                  "maxLength": 512,
                  "x-order": 1,
                  "x-go-type-skip-optional-pointer": true
                }
              }
            }
          }
        }
      },
      "organizationSmtpEnablementPayload": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "additionalProperties": false,
              "description": "Administrative on/off for an organization's own mail server. It cannot express the delivery-driven states, which are written by outcomes alone.",
              "required": [
                "enabled"
              ],
              "properties": {
                "enabled": {
                  "type": "boolean",
                  "description": "True returns the configuration to `registered` so it may prove itself and carry mail; false moves it to `ignored`. Turning it on is refused while the from domain is unverified.",
                  "x-order": 1,
                  "x-go-type-skip-optional-pointer": true
                }
              }
            }
          }
        }
      },
      "organizationSmtpTestRequest": {
        "required": false,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "additionalProperties": false,
              "description": "Options for a test delivery.",
              "properties": {
                "to": {
                  "description": "Recipient of the test message. Defaults to the calling administrator's own address.",
                  "x-order": 1,
                  "x-oapi-codegen-extra-tags": {
                    "json": "to,omitempty"
                  },
                  "type": "string",
                  "format": "email",
                  "x-go-type-skip-optional-pointer": true
                }
              }
            }
          }
        }
      }
    },
    "schemas": {
      "OrganizationSmtpConfiguration": {
        "$id": "https://schemas.meshery.io/organization_smtp.yaml",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "OrganizationSmtpConfiguration",
        "description": "An organization's own outbound mail server. When present and healthy, every transactional email whose reader belongs to this organization - application notifications and identity-flow mail (account verification, password recovery) alike - is delivered through this server rather than through the provider's shared relay, so the message leaves from the organization's own domain. At most one live configuration exists per organization. The SMTP password is encrypted at rest and is never returned; reads always carry the redaction sentinel instead.\n\nThis is a WIRE contract only. It is not backed by a table of its own: the configuration is stored on the same environment/connection/credential chain that bring-your-own identity providers already uses - a well-known per-organization Environment, joined through environments_connections_mappings to a Connection whose credential_id points at a Credential. The organization relationship lives on `environments.organization_id`, the dial target on `connections.url` and `connections.metadata`, the transport verdict on `connections.status`, and the password alone in `credentials.secret`.\n\nNo property here carries a construct-specific `db` tag, because no property here names a column of its own. The exception is deliberate and inherited: `createdAt` and `updatedAt` `$ref` the shared core definitions, which declare `db: created_at` / `db: updated_at` for every construct that uses them, and those two tags are accurate for the underlying connection row.",
        "additionalProperties": false,
        "type": "object",
        "example": {
          "id": "00000000-0000-0000-0000-000000000000",
          "organizationId": "00000000-0000-0000-0000-000000000000",
          "host": "smtp.example.com",
          "port": 587,
          "encryption": "starttls",
          "authMechanism": "plain",
          "username": "no-reply@example.com",
          "password": "***",
          "fromAddress": "no-reply@example.com",
          "fromDisplayName": "Example Corp",
          "replyToAddress": "support@example.com",
          "status": "registered",
          "fallbackToProvider": true,
          "fromDomain": "example.com",
          "fromDomainVerificationToken": "0f6a5d2c9b1e4a7f8c3d6b0e2a4f7c19",
          "fromDomainVerifiedAt": null,
          "lastSuccessAt": null,
          "lastFailureAt": null,
          "consecutiveFailures": 0,
          "createdBy": "00000000-0000-0000-0000-000000000000",
          "createdAt": "0001-01-01T00:00:00Z",
          "updatedAt": "0001-01-01T00:00:00Z",
          "deletedAt": null
        },
        "required": [
          "id",
          "organizationId",
          "host",
          "port",
          "encryption",
          "authMechanism",
          "fromAddress",
          "status",
          "fallbackToProvider",
          "consecutiveFailures",
          "createdAt",
          "updatedAt"
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
            "x-go-name": "ID"
          },
          "organizationId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-order": 2,
            "x-go-name": "OrganizationID"
          },
          "host": {
            "type": "string",
            "description": "Hostname of the organization's SMTP server.",
            "minLength": 1,
            "maxLength": 253,
            "x-order": 3,
            "x-go-type-skip-optional-pointer": true
          },
          "port": {
            "type": "integer",
            "description": "TCP port the organization's SMTP server listens on. The server additionally restricts this to a submission-port allowlist; a syntactically valid port outside it is refused.",
            "minimum": 1,
            "maximum": 65535,
            "default": 587,
            "x-order": 4,
            "x-go-type-skip-optional-pointer": true
          },
          "encryption": {
            "type": "string",
            "description": "Transport encryption to negotiate. `starttls` upgrades a cleartext connection (typically port 587), `tls` opens an implicit TLS connection (typically port 465), and `none` sends in cleartext and is intended only for an internal relay on a trusted network.",
            "enum": [
              "starttls",
              "tls",
              "none"
            ],
            "default": "starttls",
            "x-order": 5,
            "x-go-type-skip-optional-pointer": true
          },
          "authMechanism": {
            "type": "string",
            "description": "SMTP authentication mechanism. `none` is permitted only for a relay that authorizes by source address; a configuration using any other mechanism must carry both a username and a password.",
            "enum": [
              "plain",
              "cram-md5",
              "none"
            ],
            "default": "plain",
            "x-order": 6,
            "x-go-type-skip-optional-pointer": true
          },
          "username": {
            "type": "string",
            "description": "Username presented to the organization's SMTP server. Held beside the host rather than with the password because it is an identifier rather than a secret, and the health surface must show it without a decryption round trip. It is usually an email address, so it is returned only on an authorized read.",
            "maxLength": 320,
            "x-order": 7,
            "x-oapi-codegen-extra-tags": {
              "json": "username,omitempty"
            }
          },
          "password": {
            "type": "string",
            "description": "Present only when a password is stored, and then always the redaction sentinel `***` - never the stored value, which is encrypted at rest and is never projected into a response. Its presence is therefore the only thing it reports: a configuration whose `authMechanism` is `none` stores no password and omits this property entirely. It is optional rather than required for exactly that reason.\nRead-only, and read-only here means read-only: no request body references this schema. The write semantics belong to the payload schemas - `OrganizationSmtpConfigurationPayload` on create and `OrganizationSmtpCredentialPayload` on rotation - and are documented there.",
            "readOnly": true,
            "pattern": "^\\*\\*\\*$",
            "maxLength": 512,
            "x-order": 8,
            "x-oapi-codegen-extra-tags": {
              "json": "password,omitempty"
            }
          },
          "fromAddress": {
            "description": "Address the organization's mail is sent from. Its domain must be verified before mail is routed through this server.",
            "x-order": 9,
            "type": "string",
            "format": "email",
            "x-go-type-skip-optional-pointer": true
          },
          "fromDisplayName": {
            "type": "string",
            "description": "Display name shown alongside the from address in the message header.",
            "maxLength": 255,
            "x-order": 10,
            "x-oapi-codegen-extra-tags": {
              "json": "fromDisplayName,omitempty"
            }
          },
          "replyToAddress": {
            "description": "Address replies are directed to. It is also the address carried when a message falls back to the provider relay, which rewrites the from address to the provider's own so the message stays aligned for SPF and DMARC.",
            "x-order": 11,
            "x-oapi-codegen-extra-tags": {
              "json": "replyToAddress,omitempty"
            },
            "type": "string",
            "format": "email",
            "x-go-type-skip-optional-pointer": true
          },
          "status": {
            "type": "string",
            "description": "Lifecycle and transport verdict, carrying the connection status vocabulary because the configuration IS a connection. `registered` means configured but never proven - the from domain is unverified, or no message has yet been delivered - and mail takes the provider relay. `connected` means the last delivery attempt succeeded and mail is routed through this server. `disconnected` means consecutive failures opened the circuit, so the server is no longer dialled and the fallback setting decides what happens. `ignored` means an administrator turned it off.\n\nThe writers are disjoint on purpose: only an administrator writes `ignored`, and only the delivery circuit writes `connected` or `disconnected`. That is what keeps a deliberate opt-out distinguishable from a failing relay. It also makes \"enabled while the from domain is unverified\" unrepresentable rather than merely forbidden, which is why this property replaces the separate `enabled` and `verificationState` pair it supersedes.",
            "enum": [
              "registered",
              "connected",
              "disconnected",
              "ignored"
            ],
            "default": "registered",
            "x-order": 12,
            "x-go-type-skip-optional-pointer": true
          },
          "fallbackToProvider": {
            "type": "boolean",
            "description": "Whether a message that this server fails to accept is re-sent through the provider's shared relay. Disabling it means the organization owns delivery entirely and a failure is a dropped message, including account verification and password recovery.",
            "default": true,
            "x-order": 13,
            "x-go-type-skip-optional-pointer": true
          },
          "fromDomain": {
            "type": "string",
            "description": "Registrable domain of the from address, held separately as the unit that ownership is proven for.",
            "maxLength": 253,
            "x-order": 14,
            "x-oapi-codegen-extra-tags": {
              "json": "fromDomain,omitempty"
            }
          },
          "fromDomainVerificationToken": {
            "type": "string",
            "description": "Token the organization publishes in DNS to prove control of the from domain. Not a credential - it authorizes nothing and grants no access.",
            "maxLength": 128,
            "x-order": 15,
            "x-oapi-codegen-extra-tags": {
              "json": "fromDomainVerificationToken,omitempty"
            }
          },
          "fromDomainVerifiedAt": {
            "description": "Timestamp at which control of the from domain was last proven. Null while unproven.",
            "nullable": true,
            "x-order": 16,
            "x-go-type": "meshcore.NullTime",
            "x-go-type-import": {
              "name": "meshcore",
              "path": "github.com/meshery/schemas/models/core"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "lastSuccessAt": {
            "description": "Timestamp of the last message this server accepted.",
            "nullable": true,
            "x-order": 17,
            "x-go-type": "meshcore.NullTime",
            "x-go-type-import": {
              "name": "meshcore",
              "path": "github.com/meshery/schemas/models/core"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "lastFailureAt": {
            "description": "Timestamp of the last delivery attempt this server rejected or failed to accept.",
            "nullable": true,
            "x-order": 18,
            "x-go-type": "meshcore.NullTime",
            "x-go-type-import": {
              "name": "meshcore",
              "path": "github.com/meshery/schemas/models/core"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "lastFailureReason": {
            "type": "string",
            "description": "Classification of the last failure. Always a classification, never the remote server's own message: the set is closed on purpose, because reporting a remote server's text back to a caller would turn a refusal into an oracle for what the network can reach.",
            "enum": [
              "blocked_target",
              "connect_refused",
              "connect_timeout",
              "tls_failed",
              "starttls_unsupported",
              "auth_rejected",
              "relay_rejected_sender",
              "relay_rejected_recipient",
              "delivery_failed",
              "credential_unreadable"
            ],
            "x-order": 19,
            "x-oapi-codegen-extra-tags": {
              "json": "lastFailureReason,omitempty"
            }
          },
          "consecutiveFailures": {
            "type": "integer",
            "description": "Delivery failures since the last success. Drives the circuit that stops dialling a persistently unreachable server.",
            "minimum": 0,
            "default": 0,
            "x-order": 20,
            "x-go-type-skip-optional-pointer": true
          },
          "createdBy": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "nullable": true,
            "x-order": 21,
            "x-oapi-codegen-extra-tags": {
              "json": "createdBy,omitempty"
            }
          },
          "createdAt": {
            "description": "Timestamp when the configuration was created.",
            "x-order": 22,
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
          "updatedAt": {
            "description": "Timestamp when the configuration was last changed.",
            "x-order": 23,
            "x-go-type": "time.Time",
            "type": "string",
            "format": "date-time",
            "x-go-name": "UpdatedAt",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at",
              "yaml": "updated_at"
            },
            "x-go-type-skip-optional-pointer": true
          },
          "deletedAt": {
            "description": "Timestamp when the configuration was soft deleted. Null while it remains active.",
            "nullable": true,
            "x-order": 24,
            "x-go-type": "meshcore.NullTime",
            "x-go-type-import": {
              "name": "meshcore",
              "path": "github.com/meshery/schemas/models/core"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "OrganizationSmtpConfigurationPayload": {
        "type": "object",
        "additionalProperties": false,
        "description": "Everything needed to register an organization's mail server, settings and password together, so that registration is one operation. Accepted only on create; afterwards the settings and the credential are written by separate operations.\n`status`, the delivery counters behind it, the from-domain proof and the timestamps are all server-owned and are not accepted here. A new configuration therefore always starts at `registered`, whatever the caller sends.",
        "required": [
          "host",
          "port",
          "fromAddress"
        ],
        "properties": {
          "host": {
            "type": "string",
            "description": "Hostname of the organization's SMTP server.",
            "minLength": 1,
            "maxLength": 253,
            "x-order": 1,
            "x-go-type-skip-optional-pointer": true
          },
          "port": {
            "type": "integer",
            "description": "TCP port the organization's SMTP server listens on. Restricted further by a submission-port allowlist.",
            "minimum": 1,
            "maximum": 65535,
            "default": 587,
            "x-order": 2,
            "x-go-type-skip-optional-pointer": true
          },
          "encryption": {
            "type": "string",
            "description": "Transport encryption to negotiate. `starttls` upgrades a cleartext connection (typically port 587), `tls` opens an implicit TLS connection (typically port 465), and `none` sends in cleartext.",
            "enum": [
              "starttls",
              "tls",
              "none"
            ],
            "default": "starttls",
            "x-order": 3,
            "x-go-type-skip-optional-pointer": true
          },
          "authMechanism": {
            "type": "string",
            "description": "SMTP authentication mechanism. Any mechanism other than `none` requires both a username and a password.",
            "enum": [
              "plain",
              "cram-md5",
              "none"
            ],
            "default": "plain",
            "x-order": 4,
            "x-go-type-skip-optional-pointer": true
          },
          "username": {
            "type": "string",
            "description": "Username presented to the organization's SMTP server. Required by the server, together with `password`, for every `authMechanism` other than `none`; see that property for why the pairing is a server-enforced contract rather than a schema constraint.",
            "maxLength": 320,
            "x-order": 5,
            "x-oapi-codegen-extra-tags": {
              "json": "username,omitempty"
            }
          },
          "password": {
            "type": "string",
            "description": "Password presented to the organization's SMTP server. The server requires it, together with `username`, for every `authMechanism` other than `none`, and answers 400 when either is missing.\nThat rule is deliberately NOT encoded in `required` or as a `oneOf`/`if`-`then`. Both encodings were measured against the generator: `if`/`then` collapses this payload to `interface{}`, and `oneOf` injects a `union json.RawMessage` field with a custom marshaller, either of which costs every consumer its generated type or its wire behaviour to express a constraint the server enforces anyway. Treat this property as conditionally required by contract, not by schema.\nThis is the ONLY operation that accepts the password alongside the settings, so that registering a mail server is one call and no configuration exists in a state where it is expected to send but holds no credential. Afterwards the password is written only by the rotation operation, never by the settings update, whose payload declares no `password` property at all.\nThe redaction sentinel `***` is refused, and so is the empty string - omit the property instead of sending it empty, which the `minLength` below enforces so this payload and the rotation payload agree.",
            "minLength": 1,
            "maxLength": 512,
            "x-order": 6,
            "x-oapi-codegen-extra-tags": {
              "json": "password,omitempty"
            }
          },
          "fromAddress": {
            "description": "Address the organization's mail is sent from.",
            "x-order": 7,
            "type": "string",
            "format": "email",
            "x-go-type-skip-optional-pointer": true
          },
          "fromDisplayName": {
            "type": "string",
            "description": "Display name shown alongside the from address.",
            "maxLength": 255,
            "x-order": 8,
            "x-oapi-codegen-extra-tags": {
              "json": "fromDisplayName,omitempty"
            }
          },
          "replyToAddress": {
            "description": "Address replies are directed to.",
            "x-order": 9,
            "x-oapi-codegen-extra-tags": {
              "json": "replyToAddress,omitempty"
            },
            "type": "string",
            "format": "email",
            "x-go-type-skip-optional-pointer": true
          },
          "fallbackToProvider": {
            "type": "boolean",
            "description": "Whether a message this server fails to accept is re-sent through the provider's shared relay. Disabling it means a failure is a dropped message, account verification and password recovery included.",
            "default": true,
            "x-order": 10,
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "OrganizationSmtpSettingsPayload": {
        "type": "object",
        "additionalProperties": false,
        "description": "Client-settable settings of an organization's mail server, WITHOUT the password. The omission is deliberate and structural: because this schema forbids unknown properties, a client cannot send a credential through this operation at all, so the read-then-write round trip that would otherwise overwrite a stored password with the redaction sentinel is not expressible. Rotate the password through its own operation.",
        "required": [
          "host",
          "port",
          "fromAddress"
        ],
        "properties": {
          "host": {
            "type": "string",
            "description": "Hostname of the organization's SMTP server.",
            "minLength": 1,
            "maxLength": 253,
            "x-order": 1,
            "x-go-type-skip-optional-pointer": true
          },
          "port": {
            "type": "integer",
            "description": "TCP port the organization's SMTP server listens on. Restricted further by a submission-port allowlist.",
            "minimum": 1,
            "maximum": 65535,
            "default": 587,
            "x-order": 2,
            "x-go-type-skip-optional-pointer": true
          },
          "encryption": {
            "type": "string",
            "description": "Transport encryption to negotiate.",
            "enum": [
              "starttls",
              "tls",
              "none"
            ],
            "default": "starttls",
            "x-order": 3,
            "x-go-type-skip-optional-pointer": true
          },
          "authMechanism": {
            "type": "string",
            "description": "SMTP authentication mechanism. Changing this to a mechanism other than `none` while no password is stored is refused; rotate the credential first.",
            "enum": [
              "plain",
              "cram-md5",
              "none"
            ],
            "default": "plain",
            "x-order": 4,
            "x-go-type-skip-optional-pointer": true
          },
          "username": {
            "type": "string",
            "description": "Username presented to the organization's SMTP server.",
            "maxLength": 320,
            "x-order": 5,
            "x-oapi-codegen-extra-tags": {
              "json": "username,omitempty"
            }
          },
          "fromAddress": {
            "description": "Address the organization's mail is sent from. Changing it to a different registrable domain resets from-domain verification.",
            "x-order": 6,
            "type": "string",
            "format": "email",
            "x-go-type-skip-optional-pointer": true
          },
          "fromDisplayName": {
            "type": "string",
            "description": "Display name shown alongside the from address.",
            "maxLength": 255,
            "x-order": 7,
            "x-oapi-codegen-extra-tags": {
              "json": "fromDisplayName,omitempty"
            }
          },
          "replyToAddress": {
            "description": "Address replies are directed to.",
            "x-order": 8,
            "x-oapi-codegen-extra-tags": {
              "json": "replyToAddress,omitempty"
            },
            "type": "string",
            "format": "email",
            "x-go-type-skip-optional-pointer": true
          },
          "fallbackToProvider": {
            "type": "boolean",
            "description": "Whether a message this server fails to accept is re-sent through the provider's shared relay.",
            "default": true,
            "x-order": 9,
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "OrganizationSmtpCredentialPayload": {
        "type": "object",
        "additionalProperties": false,
        "description": "The password presented to an organization's SMTP server. The only payload that carries it after creation.",
        "required": [
          "password"
        ],
        "properties": {
          "password": {
            "type": "string",
            "description": "New password. The redaction sentinel `***` and the empty string are refused with a 400 rather than treated as \"leave the stored value alone\", so echoing a read back cannot erase the credential.",
            "minLength": 1,
            "maxLength": 512,
            "x-order": 1,
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "OrganizationSmtpEnablementPayload": {
        "type": "object",
        "additionalProperties": false,
        "description": "Administrative on/off for an organization's own mail server. It cannot express the delivery-driven states, which are written by outcomes alone.",
        "required": [
          "enabled"
        ],
        "properties": {
          "enabled": {
            "type": "boolean",
            "description": "True returns the configuration to `registered` so it may prove itself and carry mail; false moves it to `ignored`. Turning it on is refused while the from domain is unverified.",
            "x-order": 1,
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "OrganizationSmtpTestRequest": {
        "type": "object",
        "additionalProperties": false,
        "description": "Options for a test delivery.",
        "properties": {
          "to": {
            "description": "Recipient of the test message. Defaults to the calling administrator's own address.",
            "x-order": 1,
            "x-oapi-codegen-extra-tags": {
              "json": "to,omitempty"
            },
            "type": "string",
            "format": "email",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "OrganizationSmtpTestResult": {
        "type": "object",
        "additionalProperties": false,
        "description": "Classified outcome of a test delivery. Carries no text from the remote server, so a refusal reveals nothing about what the network can reach.",
        "required": [
          "outcome",
          "testedAt"
        ],
        "properties": {
          "outcome": {
            "type": "string",
            "description": "What happened. `delivered` means the server accepted the message; every other value names the stage that refused it.",
            "enum": [
              "delivered",
              "blocked_target",
              "connect_refused",
              "connect_timeout",
              "tls_failed",
              "starttls_unsupported",
              "auth_rejected",
              "relay_rejected_sender",
              "relay_rejected_recipient",
              "delivery_failed",
              "credential_unreadable"
            ],
            "x-order": 1,
            "x-go-type-skip-optional-pointer": true
          },
          "message": {
            "type": "string",
            "description": "Human-readable summary of the outcome, drawn from a fixed set of phrasings.",
            "maxLength": 1000,
            "x-order": 2,
            "x-oapi-codegen-extra-tags": {
              "json": "message,omitempty"
            }
          },
          "sentTo": {
            "description": "Address the test message was addressed to.",
            "x-order": 3,
            "x-oapi-codegen-extra-tags": {
              "json": "sentTo,omitempty"
            },
            "type": "string",
            "format": "email",
            "x-go-type-skip-optional-pointer": true
          },
          "testedAt": {
            "type": "string",
            "format": "date-time",
            "description": "When the delivery was attempted.",
            "x-go-type": "time.Time",
            "x-order": 4,
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "OrganizationSmtpDomainChallenge": {
        "type": "object",
        "additionalProperties": false,
        "description": "The DNS record proving control of an organization's from domain, and the current state of that proof.",
        "required": [
          "domain",
          "verified",
          "method"
        ],
        "properties": {
          "domain": {
            "type": "string",
            "description": "Registrable domain the proof applies to.",
            "maxLength": 253,
            "x-order": 1,
            "x-go-type-skip-optional-pointer": true
          },
          "method": {
            "type": "string",
            "description": "How the domain is proven. `custom-domain` means it matches the organization's own registered custom domain and needs no record; `dns-txt` means the record below must be published.",
            "enum": [
              "custom-domain",
              "dns-txt"
            ],
            "x-order": 2,
            "x-go-type-skip-optional-pointer": true
          },
          "recordName": {
            "type": "string",
            "description": "Fully qualified name of the TXT record to publish.",
            "maxLength": 253,
            "x-order": 3,
            "x-oapi-codegen-extra-tags": {
              "json": "recordName,omitempty"
            }
          },
          "recordValue": {
            "type": "string",
            "description": "Value the TXT record must carry.",
            "maxLength": 512,
            "x-order": 4,
            "x-oapi-codegen-extra-tags": {
              "json": "recordValue,omitempty"
            }
          },
          "verified": {
            "type": "boolean",
            "description": "Whether control of the domain is currently proven.",
            "x-order": 5,
            "x-go-type-skip-optional-pointer": true
          },
          "verifiedAt": {
            "description": "When control was last proven. Null while unproven.",
            "nullable": true,
            "x-order": 6,
            "x-go-type": "meshcore.NullTime",
            "x-go-type-import": {
              "name": "meshcore",
              "path": "github.com/meshery/schemas/models/core"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "failureReason": {
            "type": "string",
            "description": "Why the last check did not prove control.",
            "enum": [
              "record_not_found",
              "record_mismatch",
              "lookup_failed",
              "domain_reserved"
            ],
            "x-order": 7,
            "x-oapi-codegen-extra-tags": {
              "json": "failureReason,omitempty"
            }
          }
        }
      }
    }
  }
};

export default OrganizationSmtpSchema;
