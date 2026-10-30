/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const MentionAliasSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "MentionAlias",
    "description": "OpenAPI schema for mention aliases: an organization's memory of who's who\nacross platforms. A message tags an entity as `@entity`; one message goes\nto several platforms, and each names the same entity its own way. A\nmention alias records one confirmed answer, the entity's form on one\nplatform, so the next message that tags the entity starts from it.\n\nUniqueness: an organization keeps at most one alias per (`entity`,\n`platform`), with `entity` compared ignoring case. Writing aliases\n(`upsertMentionAliases`) creates the alias for a new key and replaces the\n`handle` of an existing one; it never adds a second alias for a key.\n\nOrganization scope: every operation acts only in the organization the\nsession resolved to (X-Current-Orgid, then the user's selected\norganization), and only when the caller is a live member of it. No\noperation takes an organization in its path or body.\n\nAuthorization: aliases describe how the organization's content items tag\npeople, so they reuse the content item keys (Catalog Management / Content\nItems) in that organization: View Content Items for the read, Edit\nContent Item for the write and Delete Content Item for the delete. A\ncaller without the key receives a 403 before any row is read. Past that\ncheck, an id that does not name a mention alias of the organization and\na caller who is not a live member of it receive the same 404, so the\nexistence of another organization's aliases is never disclosed.\n",
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
      "name": "mentionAliases",
      "description": "Operations related to mention aliases."
    }
  ],
  "paths": {
    "/api/mention-aliases": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "mentionAliases"
        ],
        "summary": "List mention aliases",
        "operationId": "getMentionAliases",
        "description": "Returns a paginated list of the mention aliases of the organization\nof the authenticated session. `entity` (repeatable) returns only the\naliases of those entities, each compared ignoring case, so the\naliases for every tag in one message come back in one read; an entity\nwith no alias contributes nothing. `platform` (repeatable) returns\nonly the aliases on those platforms. `search` matches `entity` or\n`handle` containing the term, ignoring case. `order` sorts by\n`entity`, `platform`, `createdAt` or `updatedAt` (`asc` or `desc`);\nthe default is `entity asc`, then `platform asc`. An organization\nwith no matching alias returns an empty page.\n",
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
            "name": "entity",
            "in": "query",
            "required": false,
            "description": "Return only the aliases of these entities (repeatable), each compared ignoring case.",
            "schema": {
              "type": "array",
              "maxItems": 100,
              "items": {
                "type": "string",
                "minLength": 1,
                "maxLength": 100
              }
            }
          },
          {
            "name": "platform",
            "in": "query",
            "required": false,
            "description": "Return only the aliases on these platforms (repeatable).",
            "schema": {
              "type": "array",
              "items": {
                "type": "string",
                "description": "A platform whose messages can tag an entity: `linkedin`, `x`, `bluesky`, `reddit` or `slack`. A server refuses any other value with 400. A platform joins by adding a value here.\n",
                "enum": [
                  "linkedin",
                  "x",
                  "bluesky",
                  "reddit",
                  "slack"
                ],
                "x-ts-const": "MentionAliasPlatforms",
                "x-enum-varnames": [
                  "MentionAliasPlatformLinkedin",
                  "MentionAliasPlatformX",
                  "MentionAliasPlatformBluesky",
                  "MentionAliasPlatformReddit",
                  "MentionAliasPlatformSlack"
                ]
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Mention alias page",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated collection of mention aliases.",
                  "required": [
                    "page",
                    "pageSize",
                    "totalCount",
                    "mentionAliases"
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
                    "mentionAliases": {
                      "type": "array",
                      "items": {
                        "x-go-type": "MentionAlias",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "title": "Mention Alias Schema",
                        "description": "Server-returned mention alias: how one tagged entity (a person, company,\npage or community, written `@entity` in a message) is named on one\nplatform, as a member of the organization confirmed it. An organization\nkeeps at most one alias per (entity, platform), with `entity` compared\nignoring case, so a confirmed answer is remembered across every later\nmessage that tags the same entity. Writing the same key again replaces the\nalias rather than adding a second one. Aliases belong to the organization\nof the authenticated session; any member holding the content item keys\nmay read and change them.\n",
                        "type": "object",
                        "additionalProperties": false,
                        "required": [
                          "id",
                          "organizationId",
                          "entity",
                          "platform",
                          "handle",
                          "createdAt",
                          "updatedAt"
                        ],
                        "properties": {
                          "id": {
                            "description": "Server-generated mention alias ID.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "id"
                            },
                            "x-order": 1,
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "organizationId": {
                            "description": "Owning organization ID. Derived from the authenticated session, never client-settable.",
                            "x-go-name": "OrganizationID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "organization_id"
                            },
                            "x-order": 2,
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "entity": {
                            "type": "string",
                            "description": "The tag as written after `@`, without the `@` (`kate`). Compared ignoring case: `Kate` and `kate` are the same entity, and the alias keeps the casing of the write that last stored it. The pattern is the tag grammar a message is read with: letters, digits, `_`, `.` and `-`, starting and ending with a letter, digit or `_`.\n",
                            "minLength": 1,
                            "maxLength": 100,
                            "pattern": "^[A-Za-z0-9_](?:[A-Za-z0-9_.-]*[A-Za-z0-9_])?$",
                            "x-oapi-codegen-extra-tags": {
                              "db": "entity"
                            },
                            "x-order": 3
                          },
                          "platform": {
                            "type": "string",
                            "description": "A platform whose messages can tag an entity: `linkedin`, `x`, `bluesky`, `reddit` or `slack`. A server refuses any other value with 400. A platform joins by adding a value here.\n",
                            "enum": [
                              "linkedin",
                              "x",
                              "bluesky",
                              "reddit",
                              "slack"
                            ],
                            "x-ts-const": "MentionAliasPlatforms",
                            "x-enum-varnames": [
                              "MentionAliasPlatformLinkedin",
                              "MentionAliasPlatformX",
                              "MentionAliasPlatformBluesky",
                              "MentionAliasPlatformReddit",
                              "MentionAliasPlatformSlack"
                            ],
                            "x-oapi-codegen-extra-tags": {
                              "db": "platform"
                            },
                            "x-order": 4
                          },
                          "handle": {
                            "type": "string",
                            "description": "The entity's form on `platform`, stored as confirmed: `@kate_ops` on X, `@kate.example.org` on Bluesky, `u/kate` or `r/kate` on Reddit, a member ID such as `U012AB3CD` on Slack, or a plain-text name on LinkedIn. An empty string is a confirmed answer, not a missing one: it means the entity is sent as its name in plain text on that platform. The server checks length and surrounding whitespace only; whether a value is a valid handle on its platform is the client's check.\n",
                            "minLength": 0,
                            "maxLength": 200,
                            "pattern": "^(\\S(.*\\S)?)?$",
                            "x-oapi-codegen-extra-tags": {
                              "db": "handle"
                            },
                            "x-order": 5
                          },
                          "confirmedBy": {
                            "description": "ID of the user whose session last wrote the alias. Derived from the authenticated session on every write, never client-settable. Omitted when that user was later purged.\n",
                            "x-go-name": "ConfirmedBy",
                            "x-oapi-codegen-extra-tags": {
                              "db": "confirmed_by",
                              "json": "confirmedBy,omitempty"
                            },
                            "x-order": 6,
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "createdAt": {
                            "description": "Timestamp the alias was first confirmed.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at"
                            },
                            "x-order": 7,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp the alias was last confirmed. Every write of the alias's key advances it, including one that stores the same handle again.\n",
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at"
                            },
                            "x-order": 8,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          }
                        }
                      },
                      "description": "Mention aliases included on this page of results."
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
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "mentionAliases"
        ],
        "summary": "Write mention aliases",
        "operationId": "upsertMentionAliases",
        "description": "Writes the confirmed aliases in `mentionAliases`, keyed by (`entity`,\n`platform`) with `entity` compared ignoring case. A new key creates\nthe alias; an existing key replaces its `handle` and `entity` casing,\nsets `confirmedBy` to the caller and advances `updatedAt`, even when\nthe handle is unchanged. `id`, `organizationId` and `createdAt` of an\nexisting alias never change. The write is all or nothing in one\ntransaction: a body that fails validation, or that names the same key\ntwice, is refused with a 400 and stores nothing. Answers 200 with the\nstored aliases, one per entry and in the order of the request.\n",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "The confirmed aliases to write in one all-or-nothing request.",
                "required": [
                  "mentionAliases"
                ],
                "properties": {
                  "mentionAliases": {
                    "type": "array",
                    "description": "Aliases to write, at most one per (`entity`, `platform`) key with `entity` compared ignoring case. A key named twice refuses the whole request with 400.\n",
                    "minItems": 1,
                    "maxItems": 250,
                    "items": {
                      "x-go-type": "MentionAliasPayload",
                      "type": "object",
                      "description": "One confirmed alias to write. Contains only client-settable fields: the alias is keyed by (`entity`, `platform`), so there is no `id`; the owning `organizationId` comes from the session; `confirmedBy` is the caller; and the timestamps are server-generated.\n",
                      "required": [
                        "entity",
                        "platform",
                        "handle"
                      ],
                      "properties": {
                        "entity": {
                          "type": "string",
                          "description": "The tag as written after `@`, without the `@`. Compared ignoring case; the stored alias keeps this casing.\n",
                          "minLength": 1,
                          "maxLength": 100,
                          "pattern": "^[A-Za-z0-9_](?:[A-Za-z0-9_.-]*[A-Za-z0-9_])?$"
                        },
                        "platform": {
                          "type": "string",
                          "description": "A platform whose messages can tag an entity: `linkedin`, `x`, `bluesky`, `reddit` or `slack`. A server refuses any other value with 400. A platform joins by adding a value here.\n",
                          "enum": [
                            "linkedin",
                            "x",
                            "bluesky",
                            "reddit",
                            "slack"
                          ],
                          "x-ts-const": "MentionAliasPlatforms",
                          "x-enum-varnames": [
                            "MentionAliasPlatformLinkedin",
                            "MentionAliasPlatformX",
                            "MentionAliasPlatformBluesky",
                            "MentionAliasPlatformReddit",
                            "MentionAliasPlatformSlack"
                          ]
                        },
                        "handle": {
                          "type": "string",
                          "description": "The entity's form on `platform`. Required, because the write replaces the stored handle: an empty string is the confirmed answer \"send the name as plain text\", never \"keep what is stored\".\n",
                          "minLength": 0,
                          "maxLength": 200,
                          "pattern": "^(\\S(.*\\S)?)?$"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "The stored mention aliases, one per request entry, in request order",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$schema": "http://json-schema.org/draft-07/schema#",
                    "title": "Mention Alias Schema",
                    "description": "Server-returned mention alias: how one tagged entity (a person, company,\npage or community, written `@entity` in a message) is named on one\nplatform, as a member of the organization confirmed it. An organization\nkeeps at most one alias per (entity, platform), with `entity` compared\nignoring case, so a confirmed answer is remembered across every later\nmessage that tags the same entity. Writing the same key again replaces the\nalias rather than adding a second one. Aliases belong to the organization\nof the authenticated session; any member holding the content item keys\nmay read and change them.\n",
                    "type": "object",
                    "additionalProperties": false,
                    "required": [
                      "id",
                      "organizationId",
                      "entity",
                      "platform",
                      "handle",
                      "createdAt",
                      "updatedAt"
                    ],
                    "properties": {
                      "id": {
                        "description": "Server-generated mention alias ID.",
                        "x-oapi-codegen-extra-tags": {
                          "db": "id"
                        },
                        "x-order": 1,
                        "type": "string",
                        "format": "uuid",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        }
                      },
                      "organizationId": {
                        "description": "Owning organization ID. Derived from the authenticated session, never client-settable.",
                        "x-go-name": "OrganizationID",
                        "x-oapi-codegen-extra-tags": {
                          "db": "organization_id"
                        },
                        "x-order": 2,
                        "type": "string",
                        "format": "uuid",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        }
                      },
                      "entity": {
                        "type": "string",
                        "description": "The tag as written after `@`, without the `@` (`kate`). Compared ignoring case: `Kate` and `kate` are the same entity, and the alias keeps the casing of the write that last stored it. The pattern is the tag grammar a message is read with: letters, digits, `_`, `.` and `-`, starting and ending with a letter, digit or `_`.\n",
                        "minLength": 1,
                        "maxLength": 100,
                        "pattern": "^[A-Za-z0-9_](?:[A-Za-z0-9_.-]*[A-Za-z0-9_])?$",
                        "x-oapi-codegen-extra-tags": {
                          "db": "entity"
                        },
                        "x-order": 3
                      },
                      "platform": {
                        "type": "string",
                        "description": "A platform whose messages can tag an entity: `linkedin`, `x`, `bluesky`, `reddit` or `slack`. A server refuses any other value with 400. A platform joins by adding a value here.\n",
                        "enum": [
                          "linkedin",
                          "x",
                          "bluesky",
                          "reddit",
                          "slack"
                        ],
                        "x-ts-const": "MentionAliasPlatforms",
                        "x-enum-varnames": [
                          "MentionAliasPlatformLinkedin",
                          "MentionAliasPlatformX",
                          "MentionAliasPlatformBluesky",
                          "MentionAliasPlatformReddit",
                          "MentionAliasPlatformSlack"
                        ],
                        "x-oapi-codegen-extra-tags": {
                          "db": "platform"
                        },
                        "x-order": 4
                      },
                      "handle": {
                        "type": "string",
                        "description": "The entity's form on `platform`, stored as confirmed: `@kate_ops` on X, `@kate.example.org` on Bluesky, `u/kate` or `r/kate` on Reddit, a member ID such as `U012AB3CD` on Slack, or a plain-text name on LinkedIn. An empty string is a confirmed answer, not a missing one: it means the entity is sent as its name in plain text on that platform. The server checks length and surrounding whitespace only; whether a value is a valid handle on its platform is the client's check.\n",
                        "minLength": 0,
                        "maxLength": 200,
                        "pattern": "^(\\S(.*\\S)?)?$",
                        "x-oapi-codegen-extra-tags": {
                          "db": "handle"
                        },
                        "x-order": 5
                      },
                      "confirmedBy": {
                        "description": "ID of the user whose session last wrote the alias. Derived from the authenticated session on every write, never client-settable. Omitted when that user was later purged.\n",
                        "x-go-name": "ConfirmedBy",
                        "x-oapi-codegen-extra-tags": {
                          "db": "confirmed_by",
                          "json": "confirmedBy,omitempty"
                        },
                        "x-order": 6,
                        "type": "string",
                        "format": "uuid",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        }
                      },
                      "createdAt": {
                        "description": "Timestamp the alias was first confirmed.",
                        "x-oapi-codegen-extra-tags": {
                          "db": "created_at"
                        },
                        "x-order": 7,
                        "type": "string",
                        "format": "date-time",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "updatedAt": {
                        "description": "Timestamp the alias was last confirmed. Every write of the alias's key advances it, including one that stores the same handle again.\n",
                        "x-oapi-codegen-extra-tags": {
                          "db": "updated_at"
                        },
                        "x-order": 8,
                        "type": "string",
                        "format": "date-time",
                        "x-go-type-skip-optional-pointer": true
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
    "/api/mention-aliases/{mentionAliasId}": {
      "delete": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "mentionAliases"
        ],
        "summary": "Delete a mention alias",
        "operationId": "deleteMentionAlias",
        "description": "Removes the mention alias, so the next message that tags its entity\non its platform starts without a confirmed answer. The row is\nremoved, not soft-deleted, and its key can be written again. An id\nthat does not name a mention alias of the session organization is a\n404, the same answer whether it never existed or belongs to another\norganization.\n",
        "parameters": [
          {
            "name": "mentionAliasId",
            "in": "path",
            "description": "Mention alias ID",
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
            "description": "Mention alias deleted"
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
      "entity": {
        "name": "entity",
        "in": "query",
        "required": false,
        "description": "Return only the aliases of these entities (repeatable), each compared ignoring case.",
        "schema": {
          "type": "array",
          "maxItems": 100,
          "items": {
            "type": "string",
            "minLength": 1,
            "maxLength": 100
          }
        }
      },
      "platform": {
        "name": "platform",
        "in": "query",
        "required": false,
        "description": "Return only the aliases on these platforms (repeatable).",
        "schema": {
          "type": "array",
          "items": {
            "type": "string",
            "description": "A platform whose messages can tag an entity: `linkedin`, `x`, `bluesky`, `reddit` or `slack`. A server refuses any other value with 400. A platform joins by adding a value here.\n",
            "enum": [
              "linkedin",
              "x",
              "bluesky",
              "reddit",
              "slack"
            ],
            "x-ts-const": "MentionAliasPlatforms",
            "x-enum-varnames": [
              "MentionAliasPlatformLinkedin",
              "MentionAliasPlatformX",
              "MentionAliasPlatformBluesky",
              "MentionAliasPlatformReddit",
              "MentionAliasPlatformSlack"
            ]
          }
        }
      },
      "mentionAliasId": {
        "name": "mentionAliasId",
        "in": "path",
        "description": "Mention alias ID",
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
    "schemas": {
      "MentionAlias": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Mention Alias Schema",
        "description": "Server-returned mention alias: how one tagged entity (a person, company,\npage or community, written `@entity` in a message) is named on one\nplatform, as a member of the organization confirmed it. An organization\nkeeps at most one alias per (entity, platform), with `entity` compared\nignoring case, so a confirmed answer is remembered across every later\nmessage that tags the same entity. Writing the same key again replaces the\nalias rather than adding a second one. Aliases belong to the organization\nof the authenticated session; any member holding the content item keys\nmay read and change them.\n",
        "type": "object",
        "additionalProperties": false,
        "required": [
          "id",
          "organizationId",
          "entity",
          "platform",
          "handle",
          "createdAt",
          "updatedAt"
        ],
        "properties": {
          "id": {
            "description": "Server-generated mention alias ID.",
            "x-oapi-codegen-extra-tags": {
              "db": "id"
            },
            "x-order": 1,
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "organizationId": {
            "description": "Owning organization ID. Derived from the authenticated session, never client-settable.",
            "x-go-name": "OrganizationID",
            "x-oapi-codegen-extra-tags": {
              "db": "organization_id"
            },
            "x-order": 2,
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "entity": {
            "type": "string",
            "description": "The tag as written after `@`, without the `@` (`kate`). Compared ignoring case: `Kate` and `kate` are the same entity, and the alias keeps the casing of the write that last stored it. The pattern is the tag grammar a message is read with: letters, digits, `_`, `.` and `-`, starting and ending with a letter, digit or `_`.\n",
            "minLength": 1,
            "maxLength": 100,
            "pattern": "^[A-Za-z0-9_](?:[A-Za-z0-9_.-]*[A-Za-z0-9_])?$",
            "x-oapi-codegen-extra-tags": {
              "db": "entity"
            },
            "x-order": 3
          },
          "platform": {
            "type": "string",
            "description": "A platform whose messages can tag an entity: `linkedin`, `x`, `bluesky`, `reddit` or `slack`. A server refuses any other value with 400. A platform joins by adding a value here.\n",
            "enum": [
              "linkedin",
              "x",
              "bluesky",
              "reddit",
              "slack"
            ],
            "x-ts-const": "MentionAliasPlatforms",
            "x-enum-varnames": [
              "MentionAliasPlatformLinkedin",
              "MentionAliasPlatformX",
              "MentionAliasPlatformBluesky",
              "MentionAliasPlatformReddit",
              "MentionAliasPlatformSlack"
            ],
            "x-oapi-codegen-extra-tags": {
              "db": "platform"
            },
            "x-order": 4
          },
          "handle": {
            "type": "string",
            "description": "The entity's form on `platform`, stored as confirmed: `@kate_ops` on X, `@kate.example.org` on Bluesky, `u/kate` or `r/kate` on Reddit, a member ID such as `U012AB3CD` on Slack, or a plain-text name on LinkedIn. An empty string is a confirmed answer, not a missing one: it means the entity is sent as its name in plain text on that platform. The server checks length and surrounding whitespace only; whether a value is a valid handle on its platform is the client's check.\n",
            "minLength": 0,
            "maxLength": 200,
            "pattern": "^(\\S(.*\\S)?)?$",
            "x-oapi-codegen-extra-tags": {
              "db": "handle"
            },
            "x-order": 5
          },
          "confirmedBy": {
            "description": "ID of the user whose session last wrote the alias. Derived from the authenticated session on every write, never client-settable. Omitted when that user was later purged.\n",
            "x-go-name": "ConfirmedBy",
            "x-oapi-codegen-extra-tags": {
              "db": "confirmed_by",
              "json": "confirmedBy,omitempty"
            },
            "x-order": 6,
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "createdAt": {
            "description": "Timestamp the alias was first confirmed.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at"
            },
            "x-order": 7,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp the alias was last confirmed. Every write of the alias's key advances it, including one that stores the same handle again.\n",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at"
            },
            "x-order": 8,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "MentionAliasPlatform": {
        "type": "string",
        "description": "A platform whose messages can tag an entity: `linkedin`, `x`, `bluesky`, `reddit` or `slack`. A server refuses any other value with 400. A platform joins by adding a value here.\n",
        "enum": [
          "linkedin",
          "x",
          "bluesky",
          "reddit",
          "slack"
        ],
        "x-ts-const": "MentionAliasPlatforms",
        "x-enum-varnames": [
          "MentionAliasPlatformLinkedin",
          "MentionAliasPlatformX",
          "MentionAliasPlatformBluesky",
          "MentionAliasPlatformReddit",
          "MentionAliasPlatformSlack"
        ]
      },
      "MentionAliasPage": {
        "type": "object",
        "description": "Paginated collection of mention aliases.",
        "required": [
          "page",
          "pageSize",
          "totalCount",
          "mentionAliases"
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
          "mentionAliases": {
            "type": "array",
            "items": {
              "x-go-type": "MentionAlias",
              "$schema": "http://json-schema.org/draft-07/schema#",
              "title": "Mention Alias Schema",
              "description": "Server-returned mention alias: how one tagged entity (a person, company,\npage or community, written `@entity` in a message) is named on one\nplatform, as a member of the organization confirmed it. An organization\nkeeps at most one alias per (entity, platform), with `entity` compared\nignoring case, so a confirmed answer is remembered across every later\nmessage that tags the same entity. Writing the same key again replaces the\nalias rather than adding a second one. Aliases belong to the organization\nof the authenticated session; any member holding the content item keys\nmay read and change them.\n",
              "type": "object",
              "additionalProperties": false,
              "required": [
                "id",
                "organizationId",
                "entity",
                "platform",
                "handle",
                "createdAt",
                "updatedAt"
              ],
              "properties": {
                "id": {
                  "description": "Server-generated mention alias ID.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "id"
                  },
                  "x-order": 1,
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "organizationId": {
                  "description": "Owning organization ID. Derived from the authenticated session, never client-settable.",
                  "x-go-name": "OrganizationID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "organization_id"
                  },
                  "x-order": 2,
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "entity": {
                  "type": "string",
                  "description": "The tag as written after `@`, without the `@` (`kate`). Compared ignoring case: `Kate` and `kate` are the same entity, and the alias keeps the casing of the write that last stored it. The pattern is the tag grammar a message is read with: letters, digits, `_`, `.` and `-`, starting and ending with a letter, digit or `_`.\n",
                  "minLength": 1,
                  "maxLength": 100,
                  "pattern": "^[A-Za-z0-9_](?:[A-Za-z0-9_.-]*[A-Za-z0-9_])?$",
                  "x-oapi-codegen-extra-tags": {
                    "db": "entity"
                  },
                  "x-order": 3
                },
                "platform": {
                  "type": "string",
                  "description": "A platform whose messages can tag an entity: `linkedin`, `x`, `bluesky`, `reddit` or `slack`. A server refuses any other value with 400. A platform joins by adding a value here.\n",
                  "enum": [
                    "linkedin",
                    "x",
                    "bluesky",
                    "reddit",
                    "slack"
                  ],
                  "x-ts-const": "MentionAliasPlatforms",
                  "x-enum-varnames": [
                    "MentionAliasPlatformLinkedin",
                    "MentionAliasPlatformX",
                    "MentionAliasPlatformBluesky",
                    "MentionAliasPlatformReddit",
                    "MentionAliasPlatformSlack"
                  ],
                  "x-oapi-codegen-extra-tags": {
                    "db": "platform"
                  },
                  "x-order": 4
                },
                "handle": {
                  "type": "string",
                  "description": "The entity's form on `platform`, stored as confirmed: `@kate_ops` on X, `@kate.example.org` on Bluesky, `u/kate` or `r/kate` on Reddit, a member ID such as `U012AB3CD` on Slack, or a plain-text name on LinkedIn. An empty string is a confirmed answer, not a missing one: it means the entity is sent as its name in plain text on that platform. The server checks length and surrounding whitespace only; whether a value is a valid handle on its platform is the client's check.\n",
                  "minLength": 0,
                  "maxLength": 200,
                  "pattern": "^(\\S(.*\\S)?)?$",
                  "x-oapi-codegen-extra-tags": {
                    "db": "handle"
                  },
                  "x-order": 5
                },
                "confirmedBy": {
                  "description": "ID of the user whose session last wrote the alias. Derived from the authenticated session on every write, never client-settable. Omitted when that user was later purged.\n",
                  "x-go-name": "ConfirmedBy",
                  "x-oapi-codegen-extra-tags": {
                    "db": "confirmed_by",
                    "json": "confirmedBy,omitempty"
                  },
                  "x-order": 6,
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "createdAt": {
                  "description": "Timestamp the alias was first confirmed.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at"
                  },
                  "x-order": 7,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updatedAt": {
                  "description": "Timestamp the alias was last confirmed. Every write of the alias's key advances it, including one that stores the same handle again.\n",
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at"
                  },
                  "x-order": 8,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                }
              }
            },
            "description": "Mention aliases included on this page of results."
          }
        }
      },
      "MentionAliasPayload": {
        "type": "object",
        "description": "One confirmed alias to write. Contains only client-settable fields: the alias is keyed by (`entity`, `platform`), so there is no `id`; the owning `organizationId` comes from the session; `confirmedBy` is the caller; and the timestamps are server-generated.\n",
        "required": [
          "entity",
          "platform",
          "handle"
        ],
        "properties": {
          "entity": {
            "type": "string",
            "description": "The tag as written after `@`, without the `@`. Compared ignoring case; the stored alias keeps this casing.\n",
            "minLength": 1,
            "maxLength": 100,
            "pattern": "^[A-Za-z0-9_](?:[A-Za-z0-9_.-]*[A-Za-z0-9_])?$"
          },
          "platform": {
            "type": "string",
            "description": "A platform whose messages can tag an entity: `linkedin`, `x`, `bluesky`, `reddit` or `slack`. A server refuses any other value with 400. A platform joins by adding a value here.\n",
            "enum": [
              "linkedin",
              "x",
              "bluesky",
              "reddit",
              "slack"
            ],
            "x-ts-const": "MentionAliasPlatforms",
            "x-enum-varnames": [
              "MentionAliasPlatformLinkedin",
              "MentionAliasPlatformX",
              "MentionAliasPlatformBluesky",
              "MentionAliasPlatformReddit",
              "MentionAliasPlatformSlack"
            ]
          },
          "handle": {
            "type": "string",
            "description": "The entity's form on `platform`. Required, because the write replaces the stored handle: an empty string is the confirmed answer \"send the name as plain text\", never \"keep what is stored\".\n",
            "minLength": 0,
            "maxLength": 200,
            "pattern": "^(\\S(.*\\S)?)?$"
          }
        }
      },
      "MentionAliasesPayload": {
        "type": "object",
        "description": "The confirmed aliases to write in one all-or-nothing request.",
        "required": [
          "mentionAliases"
        ],
        "properties": {
          "mentionAliases": {
            "type": "array",
            "description": "Aliases to write, at most one per (`entity`, `platform`) key with `entity` compared ignoring case. A key named twice refuses the whole request with 400.\n",
            "minItems": 1,
            "maxItems": 250,
            "items": {
              "x-go-type": "MentionAliasPayload",
              "type": "object",
              "description": "One confirmed alias to write. Contains only client-settable fields: the alias is keyed by (`entity`, `platform`), so there is no `id`; the owning `organizationId` comes from the session; `confirmedBy` is the caller; and the timestamps are server-generated.\n",
              "required": [
                "entity",
                "platform",
                "handle"
              ],
              "properties": {
                "entity": {
                  "type": "string",
                  "description": "The tag as written after `@`, without the `@`. Compared ignoring case; the stored alias keeps this casing.\n",
                  "minLength": 1,
                  "maxLength": 100,
                  "pattern": "^[A-Za-z0-9_](?:[A-Za-z0-9_.-]*[A-Za-z0-9_])?$"
                },
                "platform": {
                  "type": "string",
                  "description": "A platform whose messages can tag an entity: `linkedin`, `x`, `bluesky`, `reddit` or `slack`. A server refuses any other value with 400. A platform joins by adding a value here.\n",
                  "enum": [
                    "linkedin",
                    "x",
                    "bluesky",
                    "reddit",
                    "slack"
                  ],
                  "x-ts-const": "MentionAliasPlatforms",
                  "x-enum-varnames": [
                    "MentionAliasPlatformLinkedin",
                    "MentionAliasPlatformX",
                    "MentionAliasPlatformBluesky",
                    "MentionAliasPlatformReddit",
                    "MentionAliasPlatformSlack"
                  ]
                },
                "handle": {
                  "type": "string",
                  "description": "The entity's form on `platform`. Required, because the write replaces the stored handle: an empty string is the confirmed answer \"send the name as plain text\", never \"keep what is stored\".\n",
                  "minLength": 0,
                  "maxLength": 200,
                  "pattern": "^(\\S(.*\\S)?)?$"
                }
              }
            }
          }
        }
      }
    }
  }
};

export default MentionAliasSchema;
