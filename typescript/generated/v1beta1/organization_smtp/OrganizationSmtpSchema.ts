/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const OrganizationSmtpSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Organization SMTP Configuration",
    "description": "OpenAPI schema for per-organization outbound mail. A Cloud deployment ships with one shared SMTP relay owned by the provider organization, so every message - whichever tenant it concerns - leaves from the provider's domain. These operations let an organization register its own mail server and credentials instead, so that every email whose reader belongs to that organization is delivered from the organization's own domain. This covers application notifications and identity-flow mail (account verification, password recovery) alike, because both are rendered and sent by Cloud.\nThe password is encrypted at rest and never returned. A configuration cannot be enabled until control of its from domain has been proven, and a failing server falls back to the provider relay unless the organization has opted out.",
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
    "/api/identity/orgs/{orgId}/smtp-configuration": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "OrganizationSmtp"
        ],
        "operationId": "getOrganizationSmtpConfiguration",
        "summary": "Get an organization's SMTP configuration",
        "description": "Returns the organization's mail server configuration, including its current health and from-domain verification state. The password is always the redaction sentinel `***`.",
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
                  "description": "An organization's own outbound mail server. When present and enabled, every transactional email whose reader belongs to this organization - application notifications and identity-flow mail (account verification, password recovery) alike - is delivered through this server rather than through the provider's shared relay, so the message leaves from the organization's own domain. At most one live configuration exists per organization. The SMTP password is encrypted at rest and is never returned; reads always carry the redaction sentinel instead.",
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
                    "enabled": true,
                    "fallbackToProvider": true,
                    "fromDomain": "example.com",
                    "fromDomainVerificationToken": "0f6a5d2c9b1e4a7f8c3d6b0e2a4f7c19",
                    "fromDomainVerifiedAt": null,
                    "verificationState": "unverified",
                    "lastSuccessAt": null,
                    "lastFailureAt": null,
                    "lastFailureReason": null,
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
                    "enabled",
                    "fallbackToProvider",
                    "verificationState",
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
                      "x-go-name": "ID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id"
                      }
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
                      "x-go-name": "OrganizationID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "organization_id"
                      }
                    },
                    "host": {
                      "type": "string",
                      "description": "Hostname of the organization's SMTP server.",
                      "minLength": 1,
                      "maxLength": 253,
                      "x-order": 3,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "host"
                      }
                    },
                    "port": {
                      "type": "integer",
                      "description": "TCP port the organization's SMTP server listens on.",
                      "minimum": 1,
                      "maximum": 65535,
                      "default": 587,
                      "x-order": 4,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "port"
                      }
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
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "encryption"
                      }
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
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "auth_mechanism"
                      }
                    },
                    "username": {
                      "type": "string",
                      "description": "Username presented to the organization's SMTP server.",
                      "maxLength": 320,
                      "x-order": 7,
                      "x-oapi-codegen-extra-tags": {
                        "db": "username",
                        "json": "username,omitempty"
                      }
                    },
                    "password": {
                      "type": "string",
                      "description": "Password presented to the organization's SMTP server. Write-only. A read always returns the redaction sentinel `***`; the stored value is encrypted at rest and is never projected into a response. Writing `***` or an empty string preserves the stored password, so a client may round-trip a read without erasing the credential.",
                      "maxLength": 512,
                      "x-order": 8,
                      "x-oapi-codegen-extra-tags": {
                        "db": "-",
                        "json": "password,omitempty"
                      }
                    },
                    "fromAddress": {
                      "description": "Address the organization's mail is sent from. Its domain must be verified before the configuration can be enabled.",
                      "x-order": 9,
                      "x-oapi-codegen-extra-tags": {
                        "db": "from_address"
                      },
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
                        "db": "from_display_name",
                        "json": "fromDisplayName,omitempty"
                      }
                    },
                    "replyToAddress": {
                      "description": "Address replies are directed to. It is also the address carried when a message falls back to the provider relay, which rewrites the from address to the provider's own so the message stays aligned for SPF and DMARC.",
                      "x-order": 11,
                      "x-oapi-codegen-extra-tags": {
                        "db": "reply_to_address",
                        "json": "replyToAddress,omitempty"
                      },
                      "type": "string",
                      "format": "email",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "enabled": {
                      "type": "boolean",
                      "description": "Whether mail is routed through this server. Cannot be set while the from domain is unverified.",
                      "default": false,
                      "x-order": 12,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "enabled"
                      }
                    },
                    "fallbackToProvider": {
                      "type": "boolean",
                      "description": "Whether a message that this server fails to accept is re-sent through the provider's shared relay. Disabling it means the organization owns delivery entirely and a failure is a dropped message, including account verification and password recovery.",
                      "default": true,
                      "x-order": 13,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "fallback_to_provider"
                      }
                    },
                    "fromDomain": {
                      "type": "string",
                      "description": "Registrable domain of the from address, held separately as the unit that ownership is proven for.",
                      "maxLength": 253,
                      "x-order": 14,
                      "x-oapi-codegen-extra-tags": {
                        "db": "from_domain",
                        "json": "fromDomain,omitempty"
                      }
                    },
                    "fromDomainVerificationToken": {
                      "type": "string",
                      "description": "Token the organization publishes in DNS to prove control of the from domain. Not a credential - it authorizes nothing and grants no access.",
                      "maxLength": 128,
                      "x-order": 15,
                      "x-oapi-codegen-extra-tags": {
                        "db": "from_domain_verification_token",
                        "json": "fromDomainVerificationToken,omitempty"
                      }
                    },
                    "fromDomainVerifiedAt": {
                      "description": "Timestamp at which control of the from domain was last proven. Null while unproven.",
                      "nullable": true,
                      "x-order": 16,
                      "x-oapi-codegen-extra-tags": {
                        "db": "from_domain_verified_at"
                      },
                      "x-go-type": "meshcore.NullTime",
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "verificationState": {
                      "type": "string",
                      "description": "Health of the configuration. `unverified` means it has never delivered a test message, `verified` means the last delivery attempt succeeded, and `failing` means consecutive failures have opened the circuit and mail is being handled under the fallback setting without dialling this server.",
                      "enum": [
                        "unverified",
                        "verified",
                        "failing"
                      ],
                      "default": "unverified",
                      "x-order": 17,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "verification_state"
                      }
                    },
                    "lastSuccessAt": {
                      "description": "Timestamp of the last message this server accepted.",
                      "nullable": true,
                      "x-order": 18,
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_success_at"
                      },
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
                      "x-order": 19,
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_failure_at"
                      },
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
                      "x-order": 20,
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_failure_reason",
                        "json": "lastFailureReason,omitempty"
                      }
                    },
                    "consecutiveFailures": {
                      "type": "integer",
                      "description": "Delivery failures since the last success. Drives the circuit that stops dialling a persistently unreachable server.",
                      "minimum": 0,
                      "default": 0,
                      "x-order": 21,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "consecutive_failures"
                      }
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
                      "x-order": 22,
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_by",
                        "json": "createdBy,omitempty"
                      }
                    },
                    "createdAt": {
                      "description": "Timestamp when the configuration was created.",
                      "x-order": 23,
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
                      "x-order": 24,
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
                      "x-order": 25,
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at"
                      },
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
      "put": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "OrganizationSmtp"
        ],
        "operationId": "upsertOrganizationSmtpConfiguration",
        "summary": "Create or replace an organization's SMTP configuration",
        "description": "Writes the organization's single mail server configuration, creating it if absent. The whole document is replaced, with one exception: a `password` of `***` or an empty string preserves the stored password, so a client may edit an unrelated field after a read without erasing the credential.\nChanging the from address resets from-domain verification, and `enabled` is refused while the from domain is unverified.",
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
                "description": "Client-settable fields of an organization's mail server configuration. Health, verification state and timestamps are server-owned and are not accepted here.",
                "required": [
                  "host",
                  "port",
                  "fromAddress"
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
                    "x-oapi-codegen-extra-tags": {
                      "json": "id,omitempty"
                    }
                  },
                  "host": {
                    "type": "string",
                    "description": "Hostname of the organization's SMTP server.",
                    "minLength": 1,
                    "maxLength": 253,
                    "x-order": 2,
                    "x-go-type-skip-optional-pointer": true
                  },
                  "port": {
                    "type": "integer",
                    "description": "TCP port the organization's SMTP server listens on.",
                    "minimum": 1,
                    "maximum": 65535,
                    "default": 587,
                    "x-order": 3,
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
                    "x-order": 4,
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
                    "x-order": 5,
                    "x-go-type-skip-optional-pointer": true
                  },
                  "username": {
                    "type": "string",
                    "description": "Username presented to the organization's SMTP server.",
                    "maxLength": 320,
                    "x-order": 6,
                    "x-oapi-codegen-extra-tags": {
                      "json": "username,omitempty"
                    }
                  },
                  "password": {
                    "type": "string",
                    "description": "Password presented to the organization's SMTP server. Write-only. `***` or an empty string preserves the stored password, so a client may round-trip a read without erasing the credential.",
                    "maxLength": 512,
                    "x-order": 7,
                    "x-oapi-codegen-extra-tags": {
                      "json": "password,omitempty"
                    }
                  },
                  "fromAddress": {
                    "description": "Address the organization's mail is sent from. Changing it resets from-domain verification.",
                    "x-order": 8,
                    "type": "string",
                    "format": "email",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "fromDisplayName": {
                    "type": "string",
                    "description": "Display name shown alongside the from address.",
                    "maxLength": 255,
                    "x-order": 9,
                    "x-oapi-codegen-extra-tags": {
                      "json": "fromDisplayName,omitempty"
                    }
                  },
                  "replyToAddress": {
                    "description": "Address replies are directed to.",
                    "x-order": 10,
                    "x-oapi-codegen-extra-tags": {
                      "json": "replyToAddress,omitempty"
                    },
                    "type": "string",
                    "format": "email",
                    "x-go-type-skip-optional-pointer": true
                  },
                  "enabled": {
                    "type": "boolean",
                    "description": "Whether mail is routed through this server. Refused while the from domain is unverified.",
                    "default": false,
                    "x-order": 11,
                    "x-go-type-skip-optional-pointer": true
                  },
                  "fallbackToProvider": {
                    "type": "boolean",
                    "description": "Whether a message this server fails to accept is re-sent through the provider's shared relay. Disabling it means a failure is a dropped message, account verification and password recovery included.",
                    "default": true,
                    "x-order": 12,
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
                  "description": "An organization's own outbound mail server. When present and enabled, every transactional email whose reader belongs to this organization - application notifications and identity-flow mail (account verification, password recovery) alike - is delivered through this server rather than through the provider's shared relay, so the message leaves from the organization's own domain. At most one live configuration exists per organization. The SMTP password is encrypted at rest and is never returned; reads always carry the redaction sentinel instead.",
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
                    "enabled": true,
                    "fallbackToProvider": true,
                    "fromDomain": "example.com",
                    "fromDomainVerificationToken": "0f6a5d2c9b1e4a7f8c3d6b0e2a4f7c19",
                    "fromDomainVerifiedAt": null,
                    "verificationState": "unverified",
                    "lastSuccessAt": null,
                    "lastFailureAt": null,
                    "lastFailureReason": null,
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
                    "enabled",
                    "fallbackToProvider",
                    "verificationState",
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
                      "x-go-name": "ID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id"
                      }
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
                      "x-go-name": "OrganizationID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "organization_id"
                      }
                    },
                    "host": {
                      "type": "string",
                      "description": "Hostname of the organization's SMTP server.",
                      "minLength": 1,
                      "maxLength": 253,
                      "x-order": 3,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "host"
                      }
                    },
                    "port": {
                      "type": "integer",
                      "description": "TCP port the organization's SMTP server listens on.",
                      "minimum": 1,
                      "maximum": 65535,
                      "default": 587,
                      "x-order": 4,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "port"
                      }
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
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "encryption"
                      }
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
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "auth_mechanism"
                      }
                    },
                    "username": {
                      "type": "string",
                      "description": "Username presented to the organization's SMTP server.",
                      "maxLength": 320,
                      "x-order": 7,
                      "x-oapi-codegen-extra-tags": {
                        "db": "username",
                        "json": "username,omitempty"
                      }
                    },
                    "password": {
                      "type": "string",
                      "description": "Password presented to the organization's SMTP server. Write-only. A read always returns the redaction sentinel `***`; the stored value is encrypted at rest and is never projected into a response. Writing `***` or an empty string preserves the stored password, so a client may round-trip a read without erasing the credential.",
                      "maxLength": 512,
                      "x-order": 8,
                      "x-oapi-codegen-extra-tags": {
                        "db": "-",
                        "json": "password,omitempty"
                      }
                    },
                    "fromAddress": {
                      "description": "Address the organization's mail is sent from. Its domain must be verified before the configuration can be enabled.",
                      "x-order": 9,
                      "x-oapi-codegen-extra-tags": {
                        "db": "from_address"
                      },
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
                        "db": "from_display_name",
                        "json": "fromDisplayName,omitempty"
                      }
                    },
                    "replyToAddress": {
                      "description": "Address replies are directed to. It is also the address carried when a message falls back to the provider relay, which rewrites the from address to the provider's own so the message stays aligned for SPF and DMARC.",
                      "x-order": 11,
                      "x-oapi-codegen-extra-tags": {
                        "db": "reply_to_address",
                        "json": "replyToAddress,omitempty"
                      },
                      "type": "string",
                      "format": "email",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "enabled": {
                      "type": "boolean",
                      "description": "Whether mail is routed through this server. Cannot be set while the from domain is unverified.",
                      "default": false,
                      "x-order": 12,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "enabled"
                      }
                    },
                    "fallbackToProvider": {
                      "type": "boolean",
                      "description": "Whether a message that this server fails to accept is re-sent through the provider's shared relay. Disabling it means the organization owns delivery entirely and a failure is a dropped message, including account verification and password recovery.",
                      "default": true,
                      "x-order": 13,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "fallback_to_provider"
                      }
                    },
                    "fromDomain": {
                      "type": "string",
                      "description": "Registrable domain of the from address, held separately as the unit that ownership is proven for.",
                      "maxLength": 253,
                      "x-order": 14,
                      "x-oapi-codegen-extra-tags": {
                        "db": "from_domain",
                        "json": "fromDomain,omitempty"
                      }
                    },
                    "fromDomainVerificationToken": {
                      "type": "string",
                      "description": "Token the organization publishes in DNS to prove control of the from domain. Not a credential - it authorizes nothing and grants no access.",
                      "maxLength": 128,
                      "x-order": 15,
                      "x-oapi-codegen-extra-tags": {
                        "db": "from_domain_verification_token",
                        "json": "fromDomainVerificationToken,omitempty"
                      }
                    },
                    "fromDomainVerifiedAt": {
                      "description": "Timestamp at which control of the from domain was last proven. Null while unproven.",
                      "nullable": true,
                      "x-order": 16,
                      "x-oapi-codegen-extra-tags": {
                        "db": "from_domain_verified_at"
                      },
                      "x-go-type": "meshcore.NullTime",
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "verificationState": {
                      "type": "string",
                      "description": "Health of the configuration. `unverified` means it has never delivered a test message, `verified` means the last delivery attempt succeeded, and `failing` means consecutive failures have opened the circuit and mail is being handled under the fallback setting without dialling this server.",
                      "enum": [
                        "unverified",
                        "verified",
                        "failing"
                      ],
                      "default": "unverified",
                      "x-order": 17,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "verification_state"
                      }
                    },
                    "lastSuccessAt": {
                      "description": "Timestamp of the last message this server accepted.",
                      "nullable": true,
                      "x-order": 18,
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_success_at"
                      },
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
                      "x-order": 19,
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_failure_at"
                      },
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
                      "x-order": 20,
                      "x-oapi-codegen-extra-tags": {
                        "db": "last_failure_reason",
                        "json": "lastFailureReason,omitempty"
                      }
                    },
                    "consecutiveFailures": {
                      "type": "integer",
                      "description": "Delivery failures since the last success. Drives the circuit that stops dialling a persistently unreachable server.",
                      "minimum": 0,
                      "default": 0,
                      "x-order": 21,
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "db": "consecutive_failures"
                      }
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
                      "x-order": 22,
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_by",
                        "json": "createdBy,omitempty"
                      }
                    },
                    "createdAt": {
                      "description": "Timestamp when the configuration was created.",
                      "x-order": 23,
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
                      "x-order": 24,
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
                      "x-order": 25,
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at"
                      },
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
      },
      "delete": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "OrganizationSmtp"
        ],
        "operationId": "deleteOrganizationSmtpConfiguration",
        "summary": "Remove an organization's SMTP configuration",
        "description": "Removes the configuration and its stored credential. The organization's mail reverts to the provider's shared relay.",
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
    "/api/identity/orgs/{orgId}/smtp-configuration/test": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "OrganizationSmtp"
        ],
        "operationId": "testOrganizationSmtpConfiguration",
        "summary": "Send a test message through an organization's SMTP configuration",
        "description": "Delivers a real message through the configured server and reports a classified outcome. A real delivery rather than a connection probe on purpose: a server that connects and authenticates but refuses the sender or the recipient is the most common misconfiguration, and a probe reports it healthy.\nThe recipient defaults to the calling administrator's own address. The outcome is a classification, never the remote server's own text.",
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
    "/api/identity/orgs/{orgId}/smtp-configuration/domain-verification": {
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
        "description": "Resolves the challenge record and records the result. Proving the domain is what permits the configuration to be enabled.",
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
              "description": "Client-settable fields of an organization's mail server configuration. Health, verification state and timestamps are server-owned and are not accepted here.",
              "required": [
                "host",
                "port",
                "fromAddress"
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
                  "x-oapi-codegen-extra-tags": {
                    "json": "id,omitempty"
                  }
                },
                "host": {
                  "type": "string",
                  "description": "Hostname of the organization's SMTP server.",
                  "minLength": 1,
                  "maxLength": 253,
                  "x-order": 2,
                  "x-go-type-skip-optional-pointer": true
                },
                "port": {
                  "type": "integer",
                  "description": "TCP port the organization's SMTP server listens on.",
                  "minimum": 1,
                  "maximum": 65535,
                  "default": 587,
                  "x-order": 3,
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
                  "x-order": 4,
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
                  "x-order": 5,
                  "x-go-type-skip-optional-pointer": true
                },
                "username": {
                  "type": "string",
                  "description": "Username presented to the organization's SMTP server.",
                  "maxLength": 320,
                  "x-order": 6,
                  "x-oapi-codegen-extra-tags": {
                    "json": "username,omitempty"
                  }
                },
                "password": {
                  "type": "string",
                  "description": "Password presented to the organization's SMTP server. Write-only. `***` or an empty string preserves the stored password, so a client may round-trip a read without erasing the credential.",
                  "maxLength": 512,
                  "x-order": 7,
                  "x-oapi-codegen-extra-tags": {
                    "json": "password,omitempty"
                  }
                },
                "fromAddress": {
                  "description": "Address the organization's mail is sent from. Changing it resets from-domain verification.",
                  "x-order": 8,
                  "type": "string",
                  "format": "email",
                  "x-go-type-skip-optional-pointer": true
                },
                "fromDisplayName": {
                  "type": "string",
                  "description": "Display name shown alongside the from address.",
                  "maxLength": 255,
                  "x-order": 9,
                  "x-oapi-codegen-extra-tags": {
                    "json": "fromDisplayName,omitempty"
                  }
                },
                "replyToAddress": {
                  "description": "Address replies are directed to.",
                  "x-order": 10,
                  "x-oapi-codegen-extra-tags": {
                    "json": "replyToAddress,omitempty"
                  },
                  "type": "string",
                  "format": "email",
                  "x-go-type-skip-optional-pointer": true
                },
                "enabled": {
                  "type": "boolean",
                  "description": "Whether mail is routed through this server. Refused while the from domain is unverified.",
                  "default": false,
                  "x-order": 11,
                  "x-go-type-skip-optional-pointer": true
                },
                "fallbackToProvider": {
                  "type": "boolean",
                  "description": "Whether a message this server fails to accept is re-sent through the provider's shared relay. Disabling it means a failure is a dropped message, account verification and password recovery included.",
                  "default": true,
                  "x-order": 12,
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
        "description": "An organization's own outbound mail server. When present and enabled, every transactional email whose reader belongs to this organization - application notifications and identity-flow mail (account verification, password recovery) alike - is delivered through this server rather than through the provider's shared relay, so the message leaves from the organization's own domain. At most one live configuration exists per organization. The SMTP password is encrypted at rest and is never returned; reads always carry the redaction sentinel instead.",
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
          "enabled": true,
          "fallbackToProvider": true,
          "fromDomain": "example.com",
          "fromDomainVerificationToken": "0f6a5d2c9b1e4a7f8c3d6b0e2a4f7c19",
          "fromDomainVerifiedAt": null,
          "verificationState": "unverified",
          "lastSuccessAt": null,
          "lastFailureAt": null,
          "lastFailureReason": null,
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
          "enabled",
          "fallbackToProvider",
          "verificationState",
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
            "x-go-name": "ID",
            "x-oapi-codegen-extra-tags": {
              "db": "id"
            }
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
            "x-go-name": "OrganizationID",
            "x-oapi-codegen-extra-tags": {
              "db": "organization_id"
            }
          },
          "host": {
            "type": "string",
            "description": "Hostname of the organization's SMTP server.",
            "minLength": 1,
            "maxLength": 253,
            "x-order": 3,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "host"
            }
          },
          "port": {
            "type": "integer",
            "description": "TCP port the organization's SMTP server listens on.",
            "minimum": 1,
            "maximum": 65535,
            "default": 587,
            "x-order": 4,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "port"
            }
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
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "encryption"
            }
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
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "auth_mechanism"
            }
          },
          "username": {
            "type": "string",
            "description": "Username presented to the organization's SMTP server.",
            "maxLength": 320,
            "x-order": 7,
            "x-oapi-codegen-extra-tags": {
              "db": "username",
              "json": "username,omitempty"
            }
          },
          "password": {
            "type": "string",
            "description": "Password presented to the organization's SMTP server. Write-only. A read always returns the redaction sentinel `***`; the stored value is encrypted at rest and is never projected into a response. Writing `***` or an empty string preserves the stored password, so a client may round-trip a read without erasing the credential.",
            "maxLength": 512,
            "x-order": 8,
            "x-oapi-codegen-extra-tags": {
              "db": "-",
              "json": "password,omitempty"
            }
          },
          "fromAddress": {
            "description": "Address the organization's mail is sent from. Its domain must be verified before the configuration can be enabled.",
            "x-order": 9,
            "x-oapi-codegen-extra-tags": {
              "db": "from_address"
            },
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
              "db": "from_display_name",
              "json": "fromDisplayName,omitempty"
            }
          },
          "replyToAddress": {
            "description": "Address replies are directed to. It is also the address carried when a message falls back to the provider relay, which rewrites the from address to the provider's own so the message stays aligned for SPF and DMARC.",
            "x-order": 11,
            "x-oapi-codegen-extra-tags": {
              "db": "reply_to_address",
              "json": "replyToAddress,omitempty"
            },
            "type": "string",
            "format": "email",
            "x-go-type-skip-optional-pointer": true
          },
          "enabled": {
            "type": "boolean",
            "description": "Whether mail is routed through this server. Cannot be set while the from domain is unverified.",
            "default": false,
            "x-order": 12,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "enabled"
            }
          },
          "fallbackToProvider": {
            "type": "boolean",
            "description": "Whether a message that this server fails to accept is re-sent through the provider's shared relay. Disabling it means the organization owns delivery entirely and a failure is a dropped message, including account verification and password recovery.",
            "default": true,
            "x-order": 13,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "fallback_to_provider"
            }
          },
          "fromDomain": {
            "type": "string",
            "description": "Registrable domain of the from address, held separately as the unit that ownership is proven for.",
            "maxLength": 253,
            "x-order": 14,
            "x-oapi-codegen-extra-tags": {
              "db": "from_domain",
              "json": "fromDomain,omitempty"
            }
          },
          "fromDomainVerificationToken": {
            "type": "string",
            "description": "Token the organization publishes in DNS to prove control of the from domain. Not a credential - it authorizes nothing and grants no access.",
            "maxLength": 128,
            "x-order": 15,
            "x-oapi-codegen-extra-tags": {
              "db": "from_domain_verification_token",
              "json": "fromDomainVerificationToken,omitempty"
            }
          },
          "fromDomainVerifiedAt": {
            "description": "Timestamp at which control of the from domain was last proven. Null while unproven.",
            "nullable": true,
            "x-order": 16,
            "x-oapi-codegen-extra-tags": {
              "db": "from_domain_verified_at"
            },
            "x-go-type": "meshcore.NullTime",
            "x-go-type-import": {
              "name": "meshcore",
              "path": "github.com/meshery/schemas/models/core"
            },
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "verificationState": {
            "type": "string",
            "description": "Health of the configuration. `unverified` means it has never delivered a test message, `verified` means the last delivery attempt succeeded, and `failing` means consecutive failures have opened the circuit and mail is being handled under the fallback setting without dialling this server.",
            "enum": [
              "unverified",
              "verified",
              "failing"
            ],
            "default": "unverified",
            "x-order": 17,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "verification_state"
            }
          },
          "lastSuccessAt": {
            "description": "Timestamp of the last message this server accepted.",
            "nullable": true,
            "x-order": 18,
            "x-oapi-codegen-extra-tags": {
              "db": "last_success_at"
            },
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
            "x-order": 19,
            "x-oapi-codegen-extra-tags": {
              "db": "last_failure_at"
            },
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
            "x-order": 20,
            "x-oapi-codegen-extra-tags": {
              "db": "last_failure_reason",
              "json": "lastFailureReason,omitempty"
            }
          },
          "consecutiveFailures": {
            "type": "integer",
            "description": "Delivery failures since the last success. Drives the circuit that stops dialling a persistently unreachable server.",
            "minimum": 0,
            "default": 0,
            "x-order": 21,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "consecutive_failures"
            }
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
            "x-order": 22,
            "x-oapi-codegen-extra-tags": {
              "db": "created_by",
              "json": "createdBy,omitempty"
            }
          },
          "createdAt": {
            "description": "Timestamp when the configuration was created.",
            "x-order": 23,
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
            "x-order": 24,
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
            "x-order": 25,
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at"
            },
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
        "description": "Client-settable fields of an organization's mail server configuration. Health, verification state and timestamps are server-owned and are not accepted here.",
        "required": [
          "host",
          "port",
          "fromAddress"
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
            "x-oapi-codegen-extra-tags": {
              "json": "id,omitempty"
            }
          },
          "host": {
            "type": "string",
            "description": "Hostname of the organization's SMTP server.",
            "minLength": 1,
            "maxLength": 253,
            "x-order": 2,
            "x-go-type-skip-optional-pointer": true
          },
          "port": {
            "type": "integer",
            "description": "TCP port the organization's SMTP server listens on.",
            "minimum": 1,
            "maximum": 65535,
            "default": 587,
            "x-order": 3,
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
            "x-order": 4,
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
            "x-order": 5,
            "x-go-type-skip-optional-pointer": true
          },
          "username": {
            "type": "string",
            "description": "Username presented to the organization's SMTP server.",
            "maxLength": 320,
            "x-order": 6,
            "x-oapi-codegen-extra-tags": {
              "json": "username,omitempty"
            }
          },
          "password": {
            "type": "string",
            "description": "Password presented to the organization's SMTP server. Write-only. `***` or an empty string preserves the stored password, so a client may round-trip a read without erasing the credential.",
            "maxLength": 512,
            "x-order": 7,
            "x-oapi-codegen-extra-tags": {
              "json": "password,omitempty"
            }
          },
          "fromAddress": {
            "description": "Address the organization's mail is sent from. Changing it resets from-domain verification.",
            "x-order": 8,
            "type": "string",
            "format": "email",
            "x-go-type-skip-optional-pointer": true
          },
          "fromDisplayName": {
            "type": "string",
            "description": "Display name shown alongside the from address.",
            "maxLength": 255,
            "x-order": 9,
            "x-oapi-codegen-extra-tags": {
              "json": "fromDisplayName,omitempty"
            }
          },
          "replyToAddress": {
            "description": "Address replies are directed to.",
            "x-order": 10,
            "x-oapi-codegen-extra-tags": {
              "json": "replyToAddress,omitempty"
            },
            "type": "string",
            "format": "email",
            "x-go-type-skip-optional-pointer": true
          },
          "enabled": {
            "type": "boolean",
            "description": "Whether mail is routed through this server. Refused while the from domain is unverified.",
            "default": false,
            "x-order": 11,
            "x-go-type-skip-optional-pointer": true
          },
          "fallbackToProvider": {
            "type": "boolean",
            "description": "Whether a message this server fails to accept is re-sent through the provider's shared relay. Disabling it means a failure is a dropped message, account verification and password recovery included.",
            "default": true,
            "x-order": 12,
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
