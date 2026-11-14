/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const OauthConsentSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "OauthConsent",
    "description": "OpenAPI schema for the OAuth consents of the signed-in user: the OAuth\nclients (connected apps) the user has allowed to act on their behalf, and\nthe operation that withdraws that permission.\n\nA consent is created by the authorization server's consent step, never by\na call defined here, so the construct has no write payload. It belongs to\nthe user and to one client. Unique key: (user, `clientId`) among live\nconsents: a user has at most one live consent per client. A re-consent by\nthe same user to a client with a live consent updates that consent in\nplace: its scopes are replaced and `updatedAt` advances, while `id` and\n`createdAt` are kept.\n\nA re-consent also changes the client's existing tokens; the rule is in\nthe description of the OauthConsent schema.\n\nBoth operations act only on the consents of the authenticated user; they\ntake no user in the path or the query, and a consent of another user is\nnever listed, never revealed and never revoked. Listing is for the\nsigned-in session only: a token-authenticated listing answers 403, because\nthe consents of other clients are not disclosed to a client.\n\nRevoking a consent withdraws the user's permission for the client and\nrevokes every token the client holds for that user, so the client's next\ncall is refused and it must ask for consent again. A revoked consent is\nsoft-deleted (`deletedAt` set) and is no longer listed.\n",
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
      "name": "oauthConsents",
      "description": "Operations related to the OAuth consents of the signed-in user."
    }
  ],
  "paths": {
    "/api/identity/oauth/consents": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "oauthConsents"
        ],
        "summary": "List OAuth consents",
        "operationId": "getOauthConsents",
        "description": "Returns a page of the live OAuth consents of the signed-in user, one\nentry per client, ordered by updatedAt descending (a re-consent moves\na consent to the top). Revoked consents are\nnot listed. A user with no consented client receives an empty page.\n`scopes` is the set the latest consent granted. A re-consent also\nchanges the client's existing tokens, as the OauthConsent schema\ndescription states.\n\nOnly a request authenticated by the person's signed-in session may\nlist consents. A request authenticated by a token, of any kind, answers\n403 and lists nothing. The page holds the consents of every client the\nuser has allowed, so listing it to a client would disclose other\nclients' consents to that client, which is why a token may not list.\n",
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
            "description": "Number of consents per page, at most 1000. Bounded here because the list is the signed-in user's whole consent set.",
            "schema": {
              "type": "integer",
              "minimum": 1,
              "maximum": 1000
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OAuth consents of the signed-in user",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated collection of the signed-in user's live OAuth consents.",
                  "required": [
                    "page",
                    "pageSize",
                    "totalCount",
                    "oauthConsents"
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
                    "oauthConsents": {
                      "type": "array",
                      "items": {
                        "x-go-type": "OauthConsent",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "title": "OAuth Consent Schema",
                        "description": "Server-returned OAuth consent: one OAuth client (a connected app) the\nsigned-in user has allowed to act on their behalf, with what it was granted.\nUnique key: (user, `clientId`) among live consents (`deletedAt` null). A\nuser has at most one live consent per client, so `clientId` identifies the\nconsent among the user's own; `id` is the stored row's ID. The consent\nnames one root organization; the client acts only in that organization and\nits descendants. Created by the authorization server's consent step and\nsoft-deleted by revoking it; there is no write payload. A re-consent by the\nsame user to a client with a live consent updates that consent in place:\nits scopes are replaced and `updatedAt` advances, while `id` and\n`createdAt` are kept.\nA re-consent keeps the consent's `organizationId`. The consent moves to\nanother organization only when the user explicitly chooses that organization\non the consent screen. Then every existing token issued to that client for\nthat user is revoked in the same transaction, whatever its keychains, and this\noverrides the token rules below. Tokens are never re-bound to a new\norganization silently: the client gets a token for the new organization only\nunder the consent that names it.\nA consent must name a keychain scope. The server refuses a first consent\nin which no scope maps to a keychain in its scope map, with `400` and nothing\nstored; a re-consent that names no keychain scope revokes (below). The schema cannot state this: `scopes` has minItems 1,\nwhich stops only an empty list. The rule is enforced by the server against\nthe scope map, not by the schema. A scope string the scope map does not know\nis refused with `400`, never silently dropped. Standard non-keychain scopes,\nif the server accepts them at all (an open question), never count toward the\nkeychain-scope minimum. A token is never issued under a consent with an empty\nkeychain list, because a token limited to no keychains would hold no keys.\nRe-consent changes the client's existing tokens, in the same transaction as\nthe consent update, by whether each token is scoped (`keychainScoped` true,\nor a non-empty `keychainIds`). Every token matches exactly one branch:\n- A scoped token gets `keychainIds` set to the\n  intersection of its keychains and the keychains of the new scopes. A\n  re-consent never adds keychains to a scoped token: a narrower re-consent\n  narrows it, and a broader one leaves it unchanged. A token whose\n  intersection is empty is revoked, not left with an empty list, because a\n  scoped token with no keychains holds no keys. This also holds when the token's\n  keychains were all deleted: its intersection is empty, so it is revoked,\n  and it never gains keys.\n- An unrestricted token (`keychainScoped` false or absent and `keychainIds`\n  empty or absent) gets `keychainIds` set to\n  exactly the keychains of the new scopes, and `keychainScoped` set to true.\n- A re-consent that names no keychain scope (only scopes\n  that map to no keychain) revokes: the consent is revoked (soft-deleted) and\n  every token issued to that client for that user is revoked, in the same\n  transaction. An unknown scope string is still refused with `400`.\nA scope added by a re-consent takes effect only for tokens issued after that\nconsent, which is the user's fresh consent.\n",
                        "type": "object",
                        "additionalProperties": false,
                        "required": [
                          "id",
                          "clientId",
                          "clientName",
                          "scopes",
                          "organizationId",
                          "createdAt",
                          "updatedAt"
                        ],
                        "properties": {
                          "id": {
                            "description": "Server-generated consent ID.",
                            "x-go-name": "ID",
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
                          "clientId": {
                            "type": "string",
                            "description": "OAuth client ID the consent was granted to. An identifier issued by the authorization server, not a UUID. Unique per user among live consents.",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-id-format": "external",
                            "x-go-name": "ClientID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "client_id"
                            },
                            "x-order": 2
                          },
                          "clientName": {
                            "type": "string",
                            "description": "Display name the client registered, shown to the user as the connected app's name.",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "client_name"
                            },
                            "x-order": 3
                          },
                          "clientUri": {
                            "type": "string",
                            "format": "uri",
                            "description": "Home page of the client, when it registered one. Omitted otherwise.",
                            "maxLength": 2048,
                            "x-oapi-codegen-extra-tags": {
                              "db": "client_uri",
                              "json": "clientUri,omitempty"
                            },
                            "x-order": 4
                          },
                          "logoUri": {
                            "type": "string",
                            "format": "uri",
                            "description": "Logo of the client, when it registered one. Omitted otherwise.",
                            "maxLength": 2048,
                            "x-oapi-codegen-extra-tags": {
                              "db": "logo_uri",
                              "json": "logoUri,omitempty"
                            },
                            "x-order": 5
                          },
                          "scopes": {
                            "type": "array",
                            "description": "Scopes the user granted the client, as the strings the authorization server issues. A scope names one keychain, so the client's tokens are limited to the keys of those keychains (see the token scoping contract). At least one scope must map to a keychain in the server's scope map. The server refuses (`400`, nothing stored) a first consent without one (a re-consent without one revokes the consent and the client's tokens), and refuses a scope string the scope map does not know; it never drops one silently. Standard non-keychain scopes never count toward that minimum. The schema enforces only that the list is not empty; the rule is enforced by the server against the scope map. See the description of this schema.",
                            "minItems": 1,
                            "items": {
                              "type": "string",
                              "minLength": 1,
                              "maxLength": 255,
                              "pattern": "^\\S+$"
                            },
                            "maxItems": 100,
                            "uniqueItems": true,
                            "x-go-type": "pq.StringArray",
                            "x-go-type-import": {
                              "path": "github.com/lib/pq"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "scopes"
                            },
                            "x-order": 6
                          },
                          "organizationId": {
                            "description": "ID of the root organization the consent names. The client acts only in this organization and its descendants. A re-consent keeps it unless the user explicitly chooses another organization on the consent screen; see the description of this schema.",
                            "x-go-name": "OrganizationID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "organization_id"
                            },
                            "x-order": 7,
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "createdAt": {
                            "description": "Time the user first granted the consent. A re-consent keeps it.",
                            "readOnly": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at"
                            },
                            "x-order": 8,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Time the consent was last granted or changed. Server-set: equal to `createdAt` when the consent is created, and advanced when the same user consents to the same live client again, which replaces `scopes`.",
                            "readOnly": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at"
                            },
                            "x-order": 9,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "lastUsedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Time the client last used a token issued under this consent. Null when the client has not used it yet or the server does not record use.",
                            "nullable": true,
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "last_used_at",
                              "json": "lastUsedAt,omitempty"
                            },
                            "x-order": 10
                          },
                          "deletedAt": {
                            "description": "Time the consent was revoked (soft-deleted). Null while the consent is live. getOauthConsents returns live consents only.",
                            "nullable": true,
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "name": "core",
                              "path": "github.com/meshery/schemas/models/core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "json": "deletedAt,omitempty"
                            },
                            "x-order": 11,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          }
                        }
                      },
                      "description": "OAuth consents included on this page of results."
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
          "oauthConsents"
        ],
        "summary": "Revoke an OAuth consent",
        "operationId": "deleteOauthConsent",
        "description": "Revokes the signed-in user's consent for the client named by the\nrequired `clientId` query parameter, and revokes every access and\nrefresh token that client holds for the user. The consents and tokens\nof other users of the same client are untouched. Answers 204 with no\nbody. The consent is soft-deleted: its `deletedAt` is set and it is no\nlonger listed. For a session, and for a token naming its own client, a\nclient the user has no live consent for, whether it never existed, was\nnever consented to or was already revoked, is a 404.\n\nWho may revoke depends on how the request is authenticated:\n- A request authenticated by the person's signed-in session may revoke\n  any of that user's consents.\n- A request authenticated by a token issued to an OAuth client may\n  revoke only the consent of the client the token was issued to. Naming\n  any other `clientId` answers 403 and changes nothing. The 403 does\n  not depend on whether that client has a live consent, so the answer\n  reveals nothing about another client.\n- A personal API token, one not issued to an OAuth client, cannot revoke\n  a consent. Every such request answers 403 and changes nothing.\n",
        "parameters": [
          {
            "name": "clientId",
            "in": "query",
            "description": "OAuth client ID of the consent to revoke. An identifier issued by the authorization server, not a UUID.",
            "required": true,
            "schema": {
              "type": "string",
              "minLength": 1,
              "maxLength": 255
            }
          }
        ],
        "responses": {
          "204": {
            "description": "OAuth consent revoked"
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
      "page": {
        "name": "page",
        "in": "query",
        "description": "Get responses by page",
        "schema": {
          "type": "integer",
          "minimum": 0
        }
      },
      "oauthConsentPageSize": {
        "name": "pageSize",
        "in": "query",
        "description": "Number of consents per page, at most 1000. Bounded here because the list is the signed-in user's whole consent set.",
        "schema": {
          "type": "integer",
          "minimum": 1,
          "maximum": 1000
        }
      },
      "clientId": {
        "name": "clientId",
        "in": "query",
        "description": "OAuth client ID of the consent to revoke. An identifier issued by the authorization server, not a UUID.",
        "required": true,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 255
        }
      }
    },
    "schemas": {
      "OauthConsent": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "OAuth Consent Schema",
        "description": "Server-returned OAuth consent: one OAuth client (a connected app) the\nsigned-in user has allowed to act on their behalf, with what it was granted.\nUnique key: (user, `clientId`) among live consents (`deletedAt` null). A\nuser has at most one live consent per client, so `clientId` identifies the\nconsent among the user's own; `id` is the stored row's ID. The consent\nnames one root organization; the client acts only in that organization and\nits descendants. Created by the authorization server's consent step and\nsoft-deleted by revoking it; there is no write payload. A re-consent by the\nsame user to a client with a live consent updates that consent in place:\nits scopes are replaced and `updatedAt` advances, while `id` and\n`createdAt` are kept.\nA re-consent keeps the consent's `organizationId`. The consent moves to\nanother organization only when the user explicitly chooses that organization\non the consent screen. Then every existing token issued to that client for\nthat user is revoked in the same transaction, whatever its keychains, and this\noverrides the token rules below. Tokens are never re-bound to a new\norganization silently: the client gets a token for the new organization only\nunder the consent that names it.\nA consent must name a keychain scope. The server refuses a first consent\nin which no scope maps to a keychain in its scope map, with `400` and nothing\nstored; a re-consent that names no keychain scope revokes (below). The schema cannot state this: `scopes` has minItems 1,\nwhich stops only an empty list. The rule is enforced by the server against\nthe scope map, not by the schema. A scope string the scope map does not know\nis refused with `400`, never silently dropped. Standard non-keychain scopes,\nif the server accepts them at all (an open question), never count toward the\nkeychain-scope minimum. A token is never issued under a consent with an empty\nkeychain list, because a token limited to no keychains would hold no keys.\nRe-consent changes the client's existing tokens, in the same transaction as\nthe consent update, by whether each token is scoped (`keychainScoped` true,\nor a non-empty `keychainIds`). Every token matches exactly one branch:\n- A scoped token gets `keychainIds` set to the\n  intersection of its keychains and the keychains of the new scopes. A\n  re-consent never adds keychains to a scoped token: a narrower re-consent\n  narrows it, and a broader one leaves it unchanged. A token whose\n  intersection is empty is revoked, not left with an empty list, because a\n  scoped token with no keychains holds no keys. This also holds when the token's\n  keychains were all deleted: its intersection is empty, so it is revoked,\n  and it never gains keys.\n- An unrestricted token (`keychainScoped` false or absent and `keychainIds`\n  empty or absent) gets `keychainIds` set to\n  exactly the keychains of the new scopes, and `keychainScoped` set to true.\n- A re-consent that names no keychain scope (only scopes\n  that map to no keychain) revokes: the consent is revoked (soft-deleted) and\n  every token issued to that client for that user is revoked, in the same\n  transaction. An unknown scope string is still refused with `400`.\nA scope added by a re-consent takes effect only for tokens issued after that\nconsent, which is the user's fresh consent.\n",
        "type": "object",
        "additionalProperties": false,
        "required": [
          "id",
          "clientId",
          "clientName",
          "scopes",
          "organizationId",
          "createdAt",
          "updatedAt"
        ],
        "properties": {
          "id": {
            "description": "Server-generated consent ID.",
            "x-go-name": "ID",
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
          "clientId": {
            "type": "string",
            "description": "OAuth client ID the consent was granted to. An identifier issued by the authorization server, not a UUID. Unique per user among live consents.",
            "minLength": 1,
            "maxLength": 255,
            "x-id-format": "external",
            "x-go-name": "ClientID",
            "x-oapi-codegen-extra-tags": {
              "db": "client_id"
            },
            "x-order": 2
          },
          "clientName": {
            "type": "string",
            "description": "Display name the client registered, shown to the user as the connected app's name.",
            "minLength": 1,
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "client_name"
            },
            "x-order": 3
          },
          "clientUri": {
            "type": "string",
            "format": "uri",
            "description": "Home page of the client, when it registered one. Omitted otherwise.",
            "maxLength": 2048,
            "x-oapi-codegen-extra-tags": {
              "db": "client_uri",
              "json": "clientUri,omitempty"
            },
            "x-order": 4
          },
          "logoUri": {
            "type": "string",
            "format": "uri",
            "description": "Logo of the client, when it registered one. Omitted otherwise.",
            "maxLength": 2048,
            "x-oapi-codegen-extra-tags": {
              "db": "logo_uri",
              "json": "logoUri,omitempty"
            },
            "x-order": 5
          },
          "scopes": {
            "type": "array",
            "description": "Scopes the user granted the client, as the strings the authorization server issues. A scope names one keychain, so the client's tokens are limited to the keys of those keychains (see the token scoping contract). At least one scope must map to a keychain in the server's scope map. The server refuses (`400`, nothing stored) a first consent without one (a re-consent without one revokes the consent and the client's tokens), and refuses a scope string the scope map does not know; it never drops one silently. Standard non-keychain scopes never count toward that minimum. The schema enforces only that the list is not empty; the rule is enforced by the server against the scope map. See the description of this schema.",
            "minItems": 1,
            "items": {
              "type": "string",
              "minLength": 1,
              "maxLength": 255,
              "pattern": "^\\S+$"
            },
            "maxItems": 100,
            "uniqueItems": true,
            "x-go-type": "pq.StringArray",
            "x-go-type-import": {
              "path": "github.com/lib/pq"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "db": "scopes"
            },
            "x-order": 6
          },
          "organizationId": {
            "description": "ID of the root organization the consent names. The client acts only in this organization and its descendants. A re-consent keeps it unless the user explicitly chooses another organization on the consent screen; see the description of this schema.",
            "x-go-name": "OrganizationID",
            "x-oapi-codegen-extra-tags": {
              "db": "organization_id"
            },
            "x-order": 7,
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "createdAt": {
            "description": "Time the user first granted the consent. A re-consent keeps it.",
            "readOnly": true,
            "x-oapi-codegen-extra-tags": {
              "db": "created_at"
            },
            "x-order": 8,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Time the consent was last granted or changed. Server-set: equal to `createdAt` when the consent is created, and advanced when the same user consents to the same live client again, which replaces `scopes`.",
            "readOnly": true,
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at"
            },
            "x-order": 9,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "lastUsedAt": {
            "type": "string",
            "format": "date-time",
            "description": "Time the client last used a token issued under this consent. Null when the client has not used it yet or the server does not record use.",
            "nullable": true,
            "x-go-type": "core.NullTime",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "last_used_at",
              "json": "lastUsedAt,omitempty"
            },
            "x-order": 10
          },
          "deletedAt": {
            "description": "Time the consent was revoked (soft-deleted). Null while the consent is live. getOauthConsents returns live consents only.",
            "nullable": true,
            "x-go-type": "core.NullTime",
            "x-go-type-import": {
              "name": "core",
              "path": "github.com/meshery/schemas/models/core"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at",
              "json": "deletedAt,omitempty"
            },
            "x-order": 11,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "OauthConsentPage": {
        "type": "object",
        "description": "Paginated collection of the signed-in user's live OAuth consents.",
        "required": [
          "page",
          "pageSize",
          "totalCount",
          "oauthConsents"
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
          "oauthConsents": {
            "type": "array",
            "items": {
              "x-go-type": "OauthConsent",
              "$schema": "http://json-schema.org/draft-07/schema#",
              "title": "OAuth Consent Schema",
              "description": "Server-returned OAuth consent: one OAuth client (a connected app) the\nsigned-in user has allowed to act on their behalf, with what it was granted.\nUnique key: (user, `clientId`) among live consents (`deletedAt` null). A\nuser has at most one live consent per client, so `clientId` identifies the\nconsent among the user's own; `id` is the stored row's ID. The consent\nnames one root organization; the client acts only in that organization and\nits descendants. Created by the authorization server's consent step and\nsoft-deleted by revoking it; there is no write payload. A re-consent by the\nsame user to a client with a live consent updates that consent in place:\nits scopes are replaced and `updatedAt` advances, while `id` and\n`createdAt` are kept.\nA re-consent keeps the consent's `organizationId`. The consent moves to\nanother organization only when the user explicitly chooses that organization\non the consent screen. Then every existing token issued to that client for\nthat user is revoked in the same transaction, whatever its keychains, and this\noverrides the token rules below. Tokens are never re-bound to a new\norganization silently: the client gets a token for the new organization only\nunder the consent that names it.\nA consent must name a keychain scope. The server refuses a first consent\nin which no scope maps to a keychain in its scope map, with `400` and nothing\nstored; a re-consent that names no keychain scope revokes (below). The schema cannot state this: `scopes` has minItems 1,\nwhich stops only an empty list. The rule is enforced by the server against\nthe scope map, not by the schema. A scope string the scope map does not know\nis refused with `400`, never silently dropped. Standard non-keychain scopes,\nif the server accepts them at all (an open question), never count toward the\nkeychain-scope minimum. A token is never issued under a consent with an empty\nkeychain list, because a token limited to no keychains would hold no keys.\nRe-consent changes the client's existing tokens, in the same transaction as\nthe consent update, by whether each token is scoped (`keychainScoped` true,\nor a non-empty `keychainIds`). Every token matches exactly one branch:\n- A scoped token gets `keychainIds` set to the\n  intersection of its keychains and the keychains of the new scopes. A\n  re-consent never adds keychains to a scoped token: a narrower re-consent\n  narrows it, and a broader one leaves it unchanged. A token whose\n  intersection is empty is revoked, not left with an empty list, because a\n  scoped token with no keychains holds no keys. This also holds when the token's\n  keychains were all deleted: its intersection is empty, so it is revoked,\n  and it never gains keys.\n- An unrestricted token (`keychainScoped` false or absent and `keychainIds`\n  empty or absent) gets `keychainIds` set to\n  exactly the keychains of the new scopes, and `keychainScoped` set to true.\n- A re-consent that names no keychain scope (only scopes\n  that map to no keychain) revokes: the consent is revoked (soft-deleted) and\n  every token issued to that client for that user is revoked, in the same\n  transaction. An unknown scope string is still refused with `400`.\nA scope added by a re-consent takes effect only for tokens issued after that\nconsent, which is the user's fresh consent.\n",
              "type": "object",
              "additionalProperties": false,
              "required": [
                "id",
                "clientId",
                "clientName",
                "scopes",
                "organizationId",
                "createdAt",
                "updatedAt"
              ],
              "properties": {
                "id": {
                  "description": "Server-generated consent ID.",
                  "x-go-name": "ID",
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
                "clientId": {
                  "type": "string",
                  "description": "OAuth client ID the consent was granted to. An identifier issued by the authorization server, not a UUID. Unique per user among live consents.",
                  "minLength": 1,
                  "maxLength": 255,
                  "x-id-format": "external",
                  "x-go-name": "ClientID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "client_id"
                  },
                  "x-order": 2
                },
                "clientName": {
                  "type": "string",
                  "description": "Display name the client registered, shown to the user as the connected app's name.",
                  "minLength": 1,
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "client_name"
                  },
                  "x-order": 3
                },
                "clientUri": {
                  "type": "string",
                  "format": "uri",
                  "description": "Home page of the client, when it registered one. Omitted otherwise.",
                  "maxLength": 2048,
                  "x-oapi-codegen-extra-tags": {
                    "db": "client_uri",
                    "json": "clientUri,omitempty"
                  },
                  "x-order": 4
                },
                "logoUri": {
                  "type": "string",
                  "format": "uri",
                  "description": "Logo of the client, when it registered one. Omitted otherwise.",
                  "maxLength": 2048,
                  "x-oapi-codegen-extra-tags": {
                    "db": "logo_uri",
                    "json": "logoUri,omitempty"
                  },
                  "x-order": 5
                },
                "scopes": {
                  "type": "array",
                  "description": "Scopes the user granted the client, as the strings the authorization server issues. A scope names one keychain, so the client's tokens are limited to the keys of those keychains (see the token scoping contract). At least one scope must map to a keychain in the server's scope map. The server refuses (`400`, nothing stored) a first consent without one (a re-consent without one revokes the consent and the client's tokens), and refuses a scope string the scope map does not know; it never drops one silently. Standard non-keychain scopes never count toward that minimum. The schema enforces only that the list is not empty; the rule is enforced by the server against the scope map. See the description of this schema.",
                  "minItems": 1,
                  "items": {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 255,
                    "pattern": "^\\S+$"
                  },
                  "maxItems": 100,
                  "uniqueItems": true,
                  "x-go-type": "pq.StringArray",
                  "x-go-type-import": {
                    "path": "github.com/lib/pq"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "scopes"
                  },
                  "x-order": 6
                },
                "organizationId": {
                  "description": "ID of the root organization the consent names. The client acts only in this organization and its descendants. A re-consent keeps it unless the user explicitly chooses another organization on the consent screen; see the description of this schema.",
                  "x-go-name": "OrganizationID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "organization_id"
                  },
                  "x-order": 7,
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "createdAt": {
                  "description": "Time the user first granted the consent. A re-consent keeps it.",
                  "readOnly": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at"
                  },
                  "x-order": 8,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updatedAt": {
                  "description": "Time the consent was last granted or changed. Server-set: equal to `createdAt` when the consent is created, and advanced when the same user consents to the same live client again, which replaces `scopes`.",
                  "readOnly": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at"
                  },
                  "x-order": 9,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "lastUsedAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Time the client last used a token issued under this consent. Null when the client has not used it yet or the server does not record use.",
                  "nullable": true,
                  "x-go-type": "core.NullTime",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "last_used_at",
                    "json": "lastUsedAt,omitempty"
                  },
                  "x-order": 10
                },
                "deletedAt": {
                  "description": "Time the consent was revoked (soft-deleted). Null while the consent is live. getOauthConsents returns live consents only.",
                  "nullable": true,
                  "x-go-type": "core.NullTime",
                  "x-go-type-import": {
                    "name": "core",
                    "path": "github.com/meshery/schemas/models/core"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "deleted_at",
                    "json": "deletedAt,omitempty"
                  },
                  "x-order": 11,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                }
              }
            },
            "description": "OAuth consents included on this page of results."
          }
        }
      }
    }
  }
};

export default OauthConsentSchema;
