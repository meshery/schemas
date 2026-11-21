/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const OauthConsentRequestSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "OauthConsentRequest",
    "description": "OpenAPI schema for the pending OAuth consent requests the consent page\nshows to the signed-in user, and the two decisions the user can make on\none: allow it or deny it.\n\nThe identity provider sends the browser to the consent page with an\nopaque consent challenge. The page reads the request with\ngetOauthConsentRequest, shows which client asks and where it will send\nthe user, and then calls acceptOauthConsentRequest or\nrejectOauthConsentRequest. Both answer an OauthConsentRedirect, and the\nbrowser must navigate to its `redirectTo` to finish the authorization.\n\nThe rules every operation enforces:\n- The caller must be the signed-in user the challenge was issued for. A\n  challenge issued for any other user answers 403 and is neither shown\n  nor decided.\n- A challenge is single use. Once accepted or rejected, or once it has\n  expired, every operation on it answers 404.\n- An accept grants only what the client requested, never more: the\n  scopes in `requestedScopes`, and any audience the client asked the\n  identity provider for. The decision body cannot widen or narrow it.\n- `client.verified` marks trust and never blocks. For a dynamically\n  registered client it is true only when every redirect URI of the client\n  matches one operator-listed known-client entry. For an operator-managed\n  client (pre-registered by an operator through the identity provider's\n  admin API) it is true when the operator set the verified mark in the\n  client's identity-provider metadata, which only the admin API can write:\n  a client can never set or clear it. It is never derived from a\n  self-asserted name or from the client ID. An unverified client is shown\n  as unverified and the user may still allow it.\n\nThe server stores nothing of its own for a pending request: it reads the\nrequest from the identity provider on every call, so a 503 means the\nidentity provider could not be reached or did not answer. On a read,\nnothing was read and the call may be retried. On a decision, the outcome\nis unknown: the caller may retry, and a retry that answers 404 means the\nchallenge was already decided, so the user should restart sign-in from\nthe client.\n\nClient registration (RFC 7591) is the identity provider's protocol\nendpoint and is not part of this construct.\n",
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
      "name": "oauthConsentRequests",
      "description": "Reads of the pending OAuth consent requests of the signed-in user."
    },
    {
      "name": "oauthConsentDecisions",
      "description": "Allow and deny decisions on a pending OAuth consent request. A separate tag from the read, so a decision does not refetch the request it just consumed: the challenge is single use, and that refetch would answer 404."
    }
  ],
  "paths": {
    "/api/identity/oauth/consent-requests": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "oauthConsentRequests"
        ],
        "summary": "Get a pending OAuth consent request",
        "operationId": "getOauthConsentRequest",
        "description": "Returns the pending consent request named by the required\n`consentChallenge` query parameter, for the consent page to show.\nThe challenge is a query parameter rather than a path segment\nbecause it is a long opaque string issued by the identity provider.\nReading a request does not decide it.\n\nThe caller must be the signed-in user the challenge was issued for;\na challenge issued for another user answers 403. A challenge the\nidentity provider does not know, that has expired, or that was\nalready accepted or rejected answers 404. A missing or blank\nchallenge answers 400. A 503 means the identity provider could not\nbe reached; the 503 response says that the read may be retried.\n",
        "parameters": [
          {
            "name": "consentChallenge",
            "in": "query",
            "description": "Opaque consent challenge the identity provider issued, as the consent page received it. Required; a missing or blank value answers 400.",
            "required": true,
            "schema": {
              "type": "string",
              "minLength": 1,
              "maxLength": 8192,
              "pattern": "^[\\x21-\\x7E]+$"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "The pending OAuth consent request",
            "content": {
              "application/json": {
                "schema": {
                  "title": "OAuth Consent Request Schema",
                  "description": "A pending OAuth consent request, as the consent page shows it to the\nsigned-in user: which client asks, where it sends the user afterwards, and\nwhich scopes it asks for. The identity provider issues the request and names it by\n`consentChallenge`; the server reads it from the identity provider and\nstores no row of its own, so the schema has no `id` or timestamps.\n\nThe request belongs to the one signed-in user it was issued for. Only that\nuser may read it or decide it, and a challenge is single use: once accepted\nor rejected it can no longer be read or decided. `client.verified` marks\ntrust and never blocks. For a dynamically registered client it is true only\nwhen every redirect URI matches one operator-listed known-client entry; for\nan operator-managed client it is true when the operator set the verified\nmark in the client's identity-provider metadata (admin-only; a client can\nnever set or clear it). It is never derived from a self-asserted name or\nfrom the client ID. An unverified client is shown as such, and the user may\nstill allow it.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "consentChallenge",
                    "client",
                    "requestedScopes"
                  ],
                  "properties": {
                    "consentChallenge": {
                      "type": "string",
                      "description": "Opaque challenge the identity provider issued for this consent request, echoed unchanged. Send it back in OauthConsentDecisionPayload to allow or deny the request.",
                      "minLength": 1,
                      "maxLength": 8192,
                      "pattern": "^[\\x21-\\x7E]+$",
                      "x-order": 1
                    },
                    "client": {
                      "description": "The OAuth client that asks for consent.",
                      "x-order": 2,
                      "type": "object",
                      "additionalProperties": false,
                      "required": [
                        "clientId",
                        "clientName",
                        "redirectHosts",
                        "appSchemes",
                        "verified"
                      ],
                      "properties": {
                        "clientId": {
                          "type": "string",
                          "description": "OAuth client ID. An identifier issued by the identity provider, not a UUID.",
                          "minLength": 1,
                          "maxLength": 255,
                          "x-id-format": "external",
                          "x-go-name": "ClientID",
                          "x-order": 1
                        },
                        "clientName": {
                          "type": "string",
                          "description": "Display name the client registered. Empty when it registered none. Self-asserted by a dynamically registered client; set by the operator for an operator-managed client. Only `verified` marks trust.",
                          "maxLength": 255,
                          "x-order": 2
                        },
                        "redirectHosts": {
                          "type": "array",
                          "description": "The network hosts the client can send the user to after the decision: the host of each http or https redirect URI, with its port when the redirect has one, without duplicates. For a dynamically registered client, registration policy limits these to `https` hosts and loopback http hosts (`127.0.0.1` or `[::1]`), and never `localhost` (RFC 8252 section 8.3). For an operator-managed client any http or https redirect is listed, so a host may also be a single-label name such as `localhost`. A redirect URI of any other scheme is listed in `appSchemes` instead. Empty when the client registered only app redirects; `redirectHosts` and `appSchemes` are never both empty.",
                          "maxItems": 100,
                          "uniqueItems": true,
                          "items": {
                            "type": "string",
                            "description": "One network host as the server sends it for a registered redirect URI: a hostname or single label, an IPv4 literal, or a bracketed IPv6 literal, with an optional `:port`. No scheme, path, userinfo or whitespace. The pattern checks only that shape, not case or character set. Dynamic registration's own policy limits what a dynamically registered client can have, server-side.",
                            "minLength": 1,
                            "maxLength": 259,
                            "pattern": "^(?:[^\\s/?#@:\\[\\]]+|\\[[^\\s/?#@\\[\\]]+\\])(?::[0-9]{1,5})?$"
                          },
                          "x-order": 3
                        },
                        "appSchemes": {
                          "type": "array",
                          "description": "The URI schemes of the client's app redirect URIs (any scheme other than http and https), without duplicates, for example `vscode` or `com.example.app`: the app that claims the scheme on the user's device receives the user after the decision. For a dynamically registered client, registration accepts a private-use scheme (RFC 8252 section 7.1) only when it is on the server-side app-scheme allowlist read from configuration (defaults `vscode` and `cursor`), so only allowlisted schemes appear here. For an operator-managed client any other scheme is listed, as registered. A reverse-domain scheme such as `com.example.app` names an app, not a host, and must not be shown as one. Empty when every redirect URI of the client is http or https; `redirectHosts` and `appSchemes` are never both empty.",
                          "maxItems": 100,
                          "uniqueItems": true,
                          "items": {
                            "type": "string",
                            "description": "One URI scheme in lowercase RFC 3986 scheme form, with no `:` or `//`. Never `http` or `https`, whose redirects are listed in `redirectHosts`.",
                            "minLength": 1,
                            "maxLength": 255,
                            "pattern": "^[a-z][a-z0-9+.-]*$",
                            "not": {
                              "enum": [
                                "http",
                                "https"
                              ]
                            }
                          },
                          "x-order": 4
                        },
                        "verified": {
                          "type": "boolean",
                          "description": "Marks trust and never blocks. For a dynamically registered client it is true only when every redirect URI of the client matches one operator-listed known-client entry (that entry's https hosts or its app schemes). For an operator-managed client it is true when the operator set the verified mark in the client's identity-provider metadata, which only the admin API can write; a client can never set or clear it. It is never derived from a self-asserted name or from the client ID. A false value is shown as an unverified client, and the user may still allow it.",
                          "x-order": 5
                        },
                        "logoUri": {
                          "type": "string",
                          "format": "uri",
                          "description": "An https URL of the client's logo image. Sent only for an operator-managed client whose operator set one; never sent for a dynamically registered client, whose self-asserted logo is not shown. Omitted when there is none.",
                          "maxLength": 2048,
                          "pattern": "^https://",
                          "x-order": 6
                        }
                      }
                    },
                    "requestedScopes": {
                      "type": "array",
                      "description": "Scopes the client asks for, as the identity provider recorded them. An accept grants only what the client requested, never more: these scopes, and any audience the client asked the identity provider for. Empty when the client asks for none.",
                      "items": {
                        "type": "string",
                        "description": "One OAuth scope token (RFC 6749 section 3.3).",
                        "minLength": 1,
                        "maxLength": 255,
                        "pattern": "^[\\x21\\x23-\\x5B\\x5D-\\x7E]+$"
                      },
                      "maxItems": 100,
                      "uniqueItems": true,
                      "x-order": 3
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Invalid request body or request param",
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
          "404": {
            "description": "Result not found",
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
          "503": {
            "description": "Service unavailable - the identity provider could not be reached or did not answer. On getOauthConsentRequest nothing was read and the call may be retried. On acceptOauthConsentRequest and rejectOauthConsentRequest the outcome is unknown: the request may already have been decided. The caller may retry; a retry that answers 404 means the challenge was already decided, and the user should restart sign-in from the client.",
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
        }
      }
    },
    "/api/identity/oauth/consent-requests/accept": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "oauthConsentDecisions"
        ],
        "summary": "Allow a pending OAuth consent request",
        "operationId": "acceptOauthConsentRequest",
        "description": "Allows the pending consent request named by `consentChallenge` in\nthe body, on behalf of the signed-in user. The grant holds only what\nthe client requested, never more: the `requestedScopes` of\ngetOauthConsentRequest, and any audience the client asked the\nidentity provider for. The body cannot widen or narrow it. When\n`remember` is true, the identity provider remembers the grant so a\nlater request from the same client for the same scopes is not shown\nagain while the grant is remembered; when false or omitted, the grant\ncovers this request only.\n\nThe answer is an OauthConsentRedirect: the browser must navigate to\nits `redirectTo` to finish the authorization. The challenge is single\nuse: after an accept, every operation on it answers 404.\n\nThe caller must be the signed-in user the challenge was issued for;\na challenge issued for another user answers 403 and is not decided.\nA challenge the identity provider does not know, that has expired, or\nthat was already accepted or rejected answers 404. A malformed body,\nor a missing or blank `consentChallenge`, answers 400. A 503 leaves\nthe outcome unknown; the 503 response says how to retry.\n",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "additionalProperties": false,
                "description": "Names the pending consent request to allow (acceptOauthConsentRequest) or deny (rejectOauthConsentRequest). The grant is always what the client requested, so the body carries no scopes.",
                "required": [
                  "consentChallenge"
                ],
                "properties": {
                  "consentChallenge": {
                    "type": "string",
                    "description": "The challenge of the request being decided, as getOauthConsentRequest returned it. A blank value answers 400.",
                    "minLength": 1,
                    "maxLength": 8192,
                    "pattern": "^[\\x21-\\x7E]+$",
                    "x-order": 1
                  },
                  "remember": {
                    "type": "boolean",
                    "description": "On accept, true asks the identity provider to remember the grant, so a later request from the same client for the same scopes is not shown again while the grant is remembered. False or omitted grants this request only. Ignored on reject.",
                    "default": false,
                    "x-order": 2
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Consent request allowed; navigate to redirectTo",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": false,
                  "description": "Where the browser goes after a consent decision. The consent page must navigate the browser to `redirectTo`; the authorization does not finish until it does.",
                  "required": [
                    "redirectTo"
                  ],
                  "properties": {
                    "redirectTo": {
                      "type": "string",
                      "format": "uri",
                      "description": "Absolute URL the browser must navigate to next, issued by the identity provider. It continues the authorization and returns the user to the client.",
                      "maxLength": 16384,
                      "x-order": 1
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Invalid request body or request param",
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
          "404": {
            "description": "Result not found",
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
          "503": {
            "description": "Service unavailable - the identity provider could not be reached or did not answer. On getOauthConsentRequest nothing was read and the call may be retried. On acceptOauthConsentRequest and rejectOauthConsentRequest the outcome is unknown: the request may already have been decided. The caller may retry; a retry that answers 404 means the challenge was already decided, and the user should restart sign-in from the client.",
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
        }
      }
    },
    "/api/identity/oauth/consent-requests/reject": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "oauthConsentDecisions"
        ],
        "summary": "Deny a pending OAuth consent request",
        "operationId": "rejectOauthConsentRequest",
        "description": "Denies the pending consent request named by `consentChallenge` in\nthe body, on behalf of the signed-in user. Nothing is granted, and\nthe client receives an OAuth `access_denied` error. Only\n`consentChallenge` is read; `remember` is ignored.\n\nThe answer is an OauthConsentRedirect: the browser must navigate to\nits `redirectTo`, which returns the user to the client with the\nerror. The challenge is single use: after a reject, every operation\non it answers 404.\n\nThe caller must be the signed-in user the challenge was issued for;\na challenge issued for another user answers 403 and is not decided.\nA challenge the identity provider does not know, that has expired, or\nthat was already accepted or rejected answers 404. A malformed body,\nor a missing or blank `consentChallenge`, answers 400. A 503 leaves\nthe outcome unknown; the 503 response says how to retry.\n",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "additionalProperties": false,
                "description": "Names the pending consent request to allow (acceptOauthConsentRequest) or deny (rejectOauthConsentRequest). The grant is always what the client requested, so the body carries no scopes.",
                "required": [
                  "consentChallenge"
                ],
                "properties": {
                  "consentChallenge": {
                    "type": "string",
                    "description": "The challenge of the request being decided, as getOauthConsentRequest returned it. A blank value answers 400.",
                    "minLength": 1,
                    "maxLength": 8192,
                    "pattern": "^[\\x21-\\x7E]+$",
                    "x-order": 1
                  },
                  "remember": {
                    "type": "boolean",
                    "description": "On accept, true asks the identity provider to remember the grant, so a later request from the same client for the same scopes is not shown again while the grant is remembered. False or omitted grants this request only. Ignored on reject.",
                    "default": false,
                    "x-order": 2
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Consent request denied; navigate to redirectTo",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": false,
                  "description": "Where the browser goes after a consent decision. The consent page must navigate the browser to `redirectTo`; the authorization does not finish until it does.",
                  "required": [
                    "redirectTo"
                  ],
                  "properties": {
                    "redirectTo": {
                      "type": "string",
                      "format": "uri",
                      "description": "Absolute URL the browser must navigate to next, issued by the identity provider. It continues the authorization and returns the user to the client.",
                      "maxLength": 16384,
                      "x-order": 1
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Invalid request body or request param",
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
          "404": {
            "description": "Result not found",
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
          "503": {
            "description": "Service unavailable - the identity provider could not be reached or did not answer. On getOauthConsentRequest nothing was read and the call may be retried. On acceptOauthConsentRequest and rejectOauthConsentRequest the outcome is unknown: the request may already have been decided. The caller may retry; a retry that answers 404 means the challenge was already decided, and the user should restart sign-in from the client.",
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
      "MeshkitError400": {
        "description": "Invalid request body or request param",
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
      "MeshkitError403": {
        "description": "Forbidden",
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
      "MeshkitError404": {
        "description": "Result not found",
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
      "MeshkitError500": {
        "description": "Internal server error",
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
      "MeshkitError503": {
        "description": "Service unavailable - the identity provider could not be reached or did not answer. On getOauthConsentRequest nothing was read and the call may be retried. On acceptOauthConsentRequest and rejectOauthConsentRequest the outcome is unknown: the request may already have been decided. The caller may retry; a retry that answers 404 means the challenge was already decided, and the user should restart sign-in from the client.",
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
      "consentChallenge": {
        "name": "consentChallenge",
        "in": "query",
        "description": "Opaque consent challenge the identity provider issued, as the consent page received it. Required; a missing or blank value answers 400.",
        "required": true,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 8192,
          "pattern": "^[\\x21-\\x7E]+$"
        }
      }
    },
    "schemas": {
      "OauthConsentRequest": {
        "title": "OAuth Consent Request Schema",
        "description": "A pending OAuth consent request, as the consent page shows it to the\nsigned-in user: which client asks, where it sends the user afterwards, and\nwhich scopes it asks for. The identity provider issues the request and names it by\n`consentChallenge`; the server reads it from the identity provider and\nstores no row of its own, so the schema has no `id` or timestamps.\n\nThe request belongs to the one signed-in user it was issued for. Only that\nuser may read it or decide it, and a challenge is single use: once accepted\nor rejected it can no longer be read or decided. `client.verified` marks\ntrust and never blocks. For a dynamically registered client it is true only\nwhen every redirect URI matches one operator-listed known-client entry; for\nan operator-managed client it is true when the operator set the verified\nmark in the client's identity-provider metadata (admin-only; a client can\nnever set or clear it). It is never derived from a self-asserted name or\nfrom the client ID. An unverified client is shown as such, and the user may\nstill allow it.\n",
        "type": "object",
        "additionalProperties": false,
        "required": [
          "consentChallenge",
          "client",
          "requestedScopes"
        ],
        "properties": {
          "consentChallenge": {
            "type": "string",
            "description": "Opaque challenge the identity provider issued for this consent request, echoed unchanged. Send it back in OauthConsentDecisionPayload to allow or deny the request.",
            "minLength": 1,
            "maxLength": 8192,
            "pattern": "^[\\x21-\\x7E]+$",
            "x-order": 1
          },
          "client": {
            "description": "The OAuth client that asks for consent.",
            "x-order": 2,
            "type": "object",
            "additionalProperties": false,
            "required": [
              "clientId",
              "clientName",
              "redirectHosts",
              "appSchemes",
              "verified"
            ],
            "properties": {
              "clientId": {
                "type": "string",
                "description": "OAuth client ID. An identifier issued by the identity provider, not a UUID.",
                "minLength": 1,
                "maxLength": 255,
                "x-id-format": "external",
                "x-go-name": "ClientID",
                "x-order": 1
              },
              "clientName": {
                "type": "string",
                "description": "Display name the client registered. Empty when it registered none. Self-asserted by a dynamically registered client; set by the operator for an operator-managed client. Only `verified` marks trust.",
                "maxLength": 255,
                "x-order": 2
              },
              "redirectHosts": {
                "type": "array",
                "description": "The network hosts the client can send the user to after the decision: the host of each http or https redirect URI, with its port when the redirect has one, without duplicates. For a dynamically registered client, registration policy limits these to `https` hosts and loopback http hosts (`127.0.0.1` or `[::1]`), and never `localhost` (RFC 8252 section 8.3). For an operator-managed client any http or https redirect is listed, so a host may also be a single-label name such as `localhost`. A redirect URI of any other scheme is listed in `appSchemes` instead. Empty when the client registered only app redirects; `redirectHosts` and `appSchemes` are never both empty.",
                "maxItems": 100,
                "uniqueItems": true,
                "items": {
                  "type": "string",
                  "description": "One network host as the server sends it for a registered redirect URI: a hostname or single label, an IPv4 literal, or a bracketed IPv6 literal, with an optional `:port`. No scheme, path, userinfo or whitespace. The pattern checks only that shape, not case or character set. Dynamic registration's own policy limits what a dynamically registered client can have, server-side.",
                  "minLength": 1,
                  "maxLength": 259,
                  "pattern": "^(?:[^\\s/?#@:\\[\\]]+|\\[[^\\s/?#@\\[\\]]+\\])(?::[0-9]{1,5})?$"
                },
                "x-order": 3
              },
              "appSchemes": {
                "type": "array",
                "description": "The URI schemes of the client's app redirect URIs (any scheme other than http and https), without duplicates, for example `vscode` or `com.example.app`: the app that claims the scheme on the user's device receives the user after the decision. For a dynamically registered client, registration accepts a private-use scheme (RFC 8252 section 7.1) only when it is on the server-side app-scheme allowlist read from configuration (defaults `vscode` and `cursor`), so only allowlisted schemes appear here. For an operator-managed client any other scheme is listed, as registered. A reverse-domain scheme such as `com.example.app` names an app, not a host, and must not be shown as one. Empty when every redirect URI of the client is http or https; `redirectHosts` and `appSchemes` are never both empty.",
                "maxItems": 100,
                "uniqueItems": true,
                "items": {
                  "type": "string",
                  "description": "One URI scheme in lowercase RFC 3986 scheme form, with no `:` or `//`. Never `http` or `https`, whose redirects are listed in `redirectHosts`.",
                  "minLength": 1,
                  "maxLength": 255,
                  "pattern": "^[a-z][a-z0-9+.-]*$",
                  "not": {
                    "enum": [
                      "http",
                      "https"
                    ]
                  }
                },
                "x-order": 4
              },
              "verified": {
                "type": "boolean",
                "description": "Marks trust and never blocks. For a dynamically registered client it is true only when every redirect URI of the client matches one operator-listed known-client entry (that entry's https hosts or its app schemes). For an operator-managed client it is true when the operator set the verified mark in the client's identity-provider metadata, which only the admin API can write; a client can never set or clear it. It is never derived from a self-asserted name or from the client ID. A false value is shown as an unverified client, and the user may still allow it.",
                "x-order": 5
              },
              "logoUri": {
                "type": "string",
                "format": "uri",
                "description": "An https URL of the client's logo image. Sent only for an operator-managed client whose operator set one; never sent for a dynamically registered client, whose self-asserted logo is not shown. Omitted when there is none.",
                "maxLength": 2048,
                "pattern": "^https://",
                "x-order": 6
              }
            }
          },
          "requestedScopes": {
            "type": "array",
            "description": "Scopes the client asks for, as the identity provider recorded them. An accept grants only what the client requested, never more: these scopes, and any audience the client asked the identity provider for. Empty when the client asks for none.",
            "items": {
              "type": "string",
              "description": "One OAuth scope token (RFC 6749 section 3.3).",
              "minLength": 1,
              "maxLength": 255,
              "pattern": "^[\\x21\\x23-\\x5B\\x5D-\\x7E]+$"
            },
            "maxItems": 100,
            "uniqueItems": true,
            "x-order": 3
          }
        }
      },
      "OauthConsentClient": {
        "type": "object",
        "additionalProperties": false,
        "description": "The OAuth client that asks for consent, as the consent page names it: its ID and registered name, where it can send the user afterwards (`redirectHosts` for http and https redirects, `appSchemes` for any other scheme), an optional `logoUri`, and the `verified` mark. The client is one of two kinds. A dynamically registered client registered itself (RFC 7591), so its name is self-asserted. An operator-managed client was created by an operator through the identity provider's admin API, never through dynamic registration; it still gets the consent page, is not first-party and is not auto-accepted, and its name and logo are operator-set. `verified` marks trust and never blocks: for a dynamically registered client it is true only when every redirect URI matches one operator-listed known-client entry; for an operator-managed client it is true when the operator set the verified mark in the client's identity-provider metadata (admin-only; a client can never set or clear it). It is never derived from a self-asserted name or from the client ID, and an unverified client may still be allowed. The server classifies each registered redirect URI by its scheme into exactly one of the two lists, and at least one of them is non-empty. For a dynamically registered client the registration policy limits what can appear: https and loopback http redirects, and allowlisted private-use schemes. For an operator-managed client there is no extra constraint (the identity provider's exact-match redirect check is the only gate): an http or https redirect is listed in `redirectHosts`, any other scheme in `appSchemes`. This is display only, so the page never shows an app as a host.",
        "required": [
          "clientId",
          "clientName",
          "redirectHosts",
          "appSchemes",
          "verified"
        ],
        "properties": {
          "clientId": {
            "type": "string",
            "description": "OAuth client ID. An identifier issued by the identity provider, not a UUID.",
            "minLength": 1,
            "maxLength": 255,
            "x-id-format": "external",
            "x-go-name": "ClientID",
            "x-order": 1
          },
          "clientName": {
            "type": "string",
            "description": "Display name the client registered. Empty when it registered none. Self-asserted by a dynamically registered client; set by the operator for an operator-managed client. Only `verified` marks trust.",
            "maxLength": 255,
            "x-order": 2
          },
          "redirectHosts": {
            "type": "array",
            "description": "The network hosts the client can send the user to after the decision: the host of each http or https redirect URI, with its port when the redirect has one, without duplicates. For a dynamically registered client, registration policy limits these to `https` hosts and loopback http hosts (`127.0.0.1` or `[::1]`), and never `localhost` (RFC 8252 section 8.3). For an operator-managed client any http or https redirect is listed, so a host may also be a single-label name such as `localhost`. A redirect URI of any other scheme is listed in `appSchemes` instead. Empty when the client registered only app redirects; `redirectHosts` and `appSchemes` are never both empty.",
            "maxItems": 100,
            "uniqueItems": true,
            "items": {
              "type": "string",
              "description": "One network host as the server sends it for a registered redirect URI: a hostname or single label, an IPv4 literal, or a bracketed IPv6 literal, with an optional `:port`. No scheme, path, userinfo or whitespace. The pattern checks only that shape, not case or character set. Dynamic registration's own policy limits what a dynamically registered client can have, server-side.",
              "minLength": 1,
              "maxLength": 259,
              "pattern": "^(?:[^\\s/?#@:\\[\\]]+|\\[[^\\s/?#@\\[\\]]+\\])(?::[0-9]{1,5})?$"
            },
            "x-order": 3
          },
          "appSchemes": {
            "type": "array",
            "description": "The URI schemes of the client's app redirect URIs (any scheme other than http and https), without duplicates, for example `vscode` or `com.example.app`: the app that claims the scheme on the user's device receives the user after the decision. For a dynamically registered client, registration accepts a private-use scheme (RFC 8252 section 7.1) only when it is on the server-side app-scheme allowlist read from configuration (defaults `vscode` and `cursor`), so only allowlisted schemes appear here. For an operator-managed client any other scheme is listed, as registered. A reverse-domain scheme such as `com.example.app` names an app, not a host, and must not be shown as one. Empty when every redirect URI of the client is http or https; `redirectHosts` and `appSchemes` are never both empty.",
            "maxItems": 100,
            "uniqueItems": true,
            "items": {
              "type": "string",
              "description": "One URI scheme in lowercase RFC 3986 scheme form, with no `:` or `//`. Never `http` or `https`, whose redirects are listed in `redirectHosts`.",
              "minLength": 1,
              "maxLength": 255,
              "pattern": "^[a-z][a-z0-9+.-]*$",
              "not": {
                "enum": [
                  "http",
                  "https"
                ]
              }
            },
            "x-order": 4
          },
          "verified": {
            "type": "boolean",
            "description": "Marks trust and never blocks. For a dynamically registered client it is true only when every redirect URI of the client matches one operator-listed known-client entry (that entry's https hosts or its app schemes). For an operator-managed client it is true when the operator set the verified mark in the client's identity-provider metadata, which only the admin API can write; a client can never set or clear it. It is never derived from a self-asserted name or from the client ID. A false value is shown as an unverified client, and the user may still allow it.",
            "x-order": 5
          },
          "logoUri": {
            "type": "string",
            "format": "uri",
            "description": "An https URL of the client's logo image. Sent only for an operator-managed client whose operator set one; never sent for a dynamically registered client, whose self-asserted logo is not shown. Omitted when there is none.",
            "maxLength": 2048,
            "pattern": "^https://",
            "x-order": 6
          }
        }
      },
      "OauthConsentDecisionPayload": {
        "type": "object",
        "additionalProperties": false,
        "description": "Names the pending consent request to allow (acceptOauthConsentRequest) or deny (rejectOauthConsentRequest). The grant is always what the client requested, so the body carries no scopes.",
        "required": [
          "consentChallenge"
        ],
        "properties": {
          "consentChallenge": {
            "type": "string",
            "description": "The challenge of the request being decided, as getOauthConsentRequest returned it. A blank value answers 400.",
            "minLength": 1,
            "maxLength": 8192,
            "pattern": "^[\\x21-\\x7E]+$",
            "x-order": 1
          },
          "remember": {
            "type": "boolean",
            "description": "On accept, true asks the identity provider to remember the grant, so a later request from the same client for the same scopes is not shown again while the grant is remembered. False or omitted grants this request only. Ignored on reject.",
            "default": false,
            "x-order": 2
          }
        }
      },
      "OauthConsentRedirect": {
        "type": "object",
        "additionalProperties": false,
        "description": "Where the browser goes after a consent decision. The consent page must navigate the browser to `redirectTo`; the authorization does not finish until it does.",
        "required": [
          "redirectTo"
        ],
        "properties": {
          "redirectTo": {
            "type": "string",
            "format": "uri",
            "description": "Absolute URL the browser must navigate to next, issued by the identity provider. It continues the authorization and returns the user to the client.",
            "maxLength": 16384,
            "x-order": 1
          }
        }
      }
    }
  }
};

export default OauthConsentRequestSchema;
