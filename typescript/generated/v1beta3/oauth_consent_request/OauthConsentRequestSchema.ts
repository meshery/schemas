/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const OauthConsentRequestSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "OauthConsentRequest",
    "description": "OpenAPI schema for the pending OAuth consent requests the consent page\nshows to the signed-in user, and the two decisions the user can make on\none: allow it or deny it.\n\nThe identity provider sends the browser to the consent page with an\nopaque consent challenge. The page reads the request with\ngetOauthConsentRequest, shows which client asks and where it will send\nthe user, and then calls acceptOauthConsentRequest or\nrejectOauthConsentRequest. Both answer an OauthConsentRedirect, and the\nbrowser must navigate to its `redirectTo` to finish the authorization.\n\nThe rules every operation enforces:\n- The caller must be the signed-in user the challenge was issued for. A\n  challenge issued for any other user answers 403 and is neither shown\n  nor decided.\n- A challenge is single use. Once accepted or rejected, or once it has\n  expired, every operation on it answers 404.\n- An accept grants only what the client requested, never more: the\n  scopes in `requestedScopes`, and any audience the client asked the\n  identity provider for. The decision body cannot widen or narrow it.\n- `client.verified` marks trust and never blocks. It is derived only\n  from the client's redirect targets, never from `clientName` or\n  `clientId`: true only when every redirect URI of the client matches one\n  operator-listed known-client entry. An unverified client is shown as\n  unverified and the user may still allow it.\n\nThe server stores nothing of its own for a pending request: it reads the\nrequest from the identity provider on every call, so a 503 means the\nidentity provider could not be reached or did not answer. On a read,\nnothing was read and the call may be retried. On a decision, the outcome\nis unknown: the caller may retry, and a retry that answers 404 means the\nchallenge was already decided, so the user should restart sign-in from\nthe client.\n\nClient registration (RFC 7591) is the identity provider's protocol\nendpoint and is not part of this construct.\n",
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
                  "description": "A pending OAuth consent request, as the consent page shows it to the\nsigned-in user: which client asks, where it sends the user afterwards, and\nwhich scopes it asks for. The identity provider issues the request and names it by\n`consentChallenge`; the server reads it from the identity provider and\nstores no row of its own, so the schema has no `id` or timestamps.\n\nThe request belongs to the one signed-in user it was issued for. Only that\nuser may read it or decide it, and a challenge is single use: once accepted\nor rejected it can no longer be read or decided. `client.verified` is\nderived only from the client's redirect targets, never from its name or ID.\nIt marks trust and never blocks: an unverified client is shown as such, and\nthe user may still allow it.\n",
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
                          "description": "Display name the client registered. Empty when it registered none. Self-asserted by the client; only `verified` marks trust.",
                          "maxLength": 255,
                          "x-order": 2
                        },
                        "redirectHosts": {
                          "type": "array",
                          "description": "The network hosts the client can send the user to after the decision: the host of each https redirect URI (for example `app.example.com`) and of each loopback redirect URI (`127.0.0.1` or `[::1]`), without duplicates. Only redirect URIs whose scheme is `https`, or `http` on a loopback IP literal, are listed here; the `localhost` hostname is never registered (RFC 8252 section 8.3), and a private-use app redirect is listed in `appSchemes` instead. Lowercase ASCII, with no scheme, port or path; an internationalized hostname is sent in IDNA A-label (punycode) form. Empty when the client registered only app redirects; `redirectHosts` and `appSchemes` are never both empty.",
                          "maxItems": 100,
                          "uniqueItems": true,
                          "items": {
                            "type": "string",
                            "description": "One network host: a DNS hostname of at least two labels whose last label starts with a letter, in IDNA A-label (punycode) form when internationalized, a dotted-decimal IPv4 literal, or a bracketed hexadecimal IPv6 literal. A colon appears only inside IPv6 brackets, so no entry carries a port, and a bare single-label name such as `localhost` or an app scheme (`vscode`) is not a host.",
                            "minLength": 1,
                            "maxLength": 253,
                            "pattern": "^(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z](?:[a-z0-9-]*[a-z0-9])?|(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])|\\[[0-9a-f]{0,4}(?::[0-9a-f]{0,4}){2,7}\\])$"
                          },
                          "x-order": 3
                        },
                        "appSchemes": {
                          "type": "array",
                          "description": "The private-use URI schemes (RFC 8252 section 7.1) of the client's app redirect URIs, without duplicates, for example `vscode` or `com.example.app`: the app that claims the scheme on the user's device receives the user after the decision. Registration accepts a private-use scheme only when it is on the server-side app-scheme allowlist read from configuration (defaults `vscode` and `cursor`), so only allowlisted schemes appear here. A reverse-domain scheme such as `com.example.app` names an app, not a host, and must not be shown as one. Empty when the client registered only https and loopback redirects; `redirectHosts` and `appSchemes` are never both empty.",
                          "maxItems": 100,
                          "uniqueItems": true,
                          "items": {
                            "type": "string",
                            "description": "One private-use scheme in lowercase RFC 3986 scheme form, with no `:` or `//`. Never `http` or `https`, whose redirects are listed in `redirectHosts`.",
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
                          "description": "Derived only from the client's redirect targets, never from `clientName` or `clientId`: true only when every redirect URI of the client matches one operator-listed known-client entry (that entry's https hosts or its app schemes). Marks trust and never blocks: a false value is shown as an unverified client, and the user may still allow it.",
                          "x-order": 5
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
        "description": "A pending OAuth consent request, as the consent page shows it to the\nsigned-in user: which client asks, where it sends the user afterwards, and\nwhich scopes it asks for. The identity provider issues the request and names it by\n`consentChallenge`; the server reads it from the identity provider and\nstores no row of its own, so the schema has no `id` or timestamps.\n\nThe request belongs to the one signed-in user it was issued for. Only that\nuser may read it or decide it, and a challenge is single use: once accepted\nor rejected it can no longer be read or decided. `client.verified` is\nderived only from the client's redirect targets, never from its name or ID.\nIt marks trust and never blocks: an unverified client is shown as such, and\nthe user may still allow it.\n",
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
                "description": "Display name the client registered. Empty when it registered none. Self-asserted by the client; only `verified` marks trust.",
                "maxLength": 255,
                "x-order": 2
              },
              "redirectHosts": {
                "type": "array",
                "description": "The network hosts the client can send the user to after the decision: the host of each https redirect URI (for example `app.example.com`) and of each loopback redirect URI (`127.0.0.1` or `[::1]`), without duplicates. Only redirect URIs whose scheme is `https`, or `http` on a loopback IP literal, are listed here; the `localhost` hostname is never registered (RFC 8252 section 8.3), and a private-use app redirect is listed in `appSchemes` instead. Lowercase ASCII, with no scheme, port or path; an internationalized hostname is sent in IDNA A-label (punycode) form. Empty when the client registered only app redirects; `redirectHosts` and `appSchemes` are never both empty.",
                "maxItems": 100,
                "uniqueItems": true,
                "items": {
                  "type": "string",
                  "description": "One network host: a DNS hostname of at least two labels whose last label starts with a letter, in IDNA A-label (punycode) form when internationalized, a dotted-decimal IPv4 literal, or a bracketed hexadecimal IPv6 literal. A colon appears only inside IPv6 brackets, so no entry carries a port, and a bare single-label name such as `localhost` or an app scheme (`vscode`) is not a host.",
                  "minLength": 1,
                  "maxLength": 253,
                  "pattern": "^(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z](?:[a-z0-9-]*[a-z0-9])?|(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])|\\[[0-9a-f]{0,4}(?::[0-9a-f]{0,4}){2,7}\\])$"
                },
                "x-order": 3
              },
              "appSchemes": {
                "type": "array",
                "description": "The private-use URI schemes (RFC 8252 section 7.1) of the client's app redirect URIs, without duplicates, for example `vscode` or `com.example.app`: the app that claims the scheme on the user's device receives the user after the decision. Registration accepts a private-use scheme only when it is on the server-side app-scheme allowlist read from configuration (defaults `vscode` and `cursor`), so only allowlisted schemes appear here. A reverse-domain scheme such as `com.example.app` names an app, not a host, and must not be shown as one. Empty when the client registered only https and loopback redirects; `redirectHosts` and `appSchemes` are never both empty.",
                "maxItems": 100,
                "uniqueItems": true,
                "items": {
                  "type": "string",
                  "description": "One private-use scheme in lowercase RFC 3986 scheme form, with no `:` or `//`. Never `http` or `https`, whose redirects are listed in `redirectHosts`.",
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
                "description": "Derived only from the client's redirect targets, never from `clientName` or `clientId`: true only when every redirect URI of the client matches one operator-listed known-client entry (that entry's https hosts or its app schemes). Marks trust and never blocks: a false value is shown as an unverified client, and the user may still allow it.",
                "x-order": 5
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
        "description": "The OAuth client that asks for consent, as the consent page names it: its ID and registered name, where it can send the user afterwards (`redirectHosts` for https and loopback redirects, `appSchemes` for private-use app redirects), and the `verified` mark. `verified` marks trust and never blocks: it is true only when every redirect URI of the client matches one operator-listed known-client entry, and an unverified client may still be allowed. The server classifies each registered redirect URI by its scheme into exactly one of the two lists, and at least one of them is non-empty.",
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
            "description": "Display name the client registered. Empty when it registered none. Self-asserted by the client; only `verified` marks trust.",
            "maxLength": 255,
            "x-order": 2
          },
          "redirectHosts": {
            "type": "array",
            "description": "The network hosts the client can send the user to after the decision: the host of each https redirect URI (for example `app.example.com`) and of each loopback redirect URI (`127.0.0.1` or `[::1]`), without duplicates. Only redirect URIs whose scheme is `https`, or `http` on a loopback IP literal, are listed here; the `localhost` hostname is never registered (RFC 8252 section 8.3), and a private-use app redirect is listed in `appSchemes` instead. Lowercase ASCII, with no scheme, port or path; an internationalized hostname is sent in IDNA A-label (punycode) form. Empty when the client registered only app redirects; `redirectHosts` and `appSchemes` are never both empty.",
            "maxItems": 100,
            "uniqueItems": true,
            "items": {
              "type": "string",
              "description": "One network host: a DNS hostname of at least two labels whose last label starts with a letter, in IDNA A-label (punycode) form when internationalized, a dotted-decimal IPv4 literal, or a bracketed hexadecimal IPv6 literal. A colon appears only inside IPv6 brackets, so no entry carries a port, and a bare single-label name such as `localhost` or an app scheme (`vscode`) is not a host.",
              "minLength": 1,
              "maxLength": 253,
              "pattern": "^(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z](?:[a-z0-9-]*[a-z0-9])?|(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])|\\[[0-9a-f]{0,4}(?::[0-9a-f]{0,4}){2,7}\\])$"
            },
            "x-order": 3
          },
          "appSchemes": {
            "type": "array",
            "description": "The private-use URI schemes (RFC 8252 section 7.1) of the client's app redirect URIs, without duplicates, for example `vscode` or `com.example.app`: the app that claims the scheme on the user's device receives the user after the decision. Registration accepts a private-use scheme only when it is on the server-side app-scheme allowlist read from configuration (defaults `vscode` and `cursor`), so only allowlisted schemes appear here. A reverse-domain scheme such as `com.example.app` names an app, not a host, and must not be shown as one. Empty when the client registered only https and loopback redirects; `redirectHosts` and `appSchemes` are never both empty.",
            "maxItems": 100,
            "uniqueItems": true,
            "items": {
              "type": "string",
              "description": "One private-use scheme in lowercase RFC 3986 scheme form, with no `:` or `//`. Never `http` or `https`, whose redirects are listed in `redirectHosts`.",
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
            "description": "Derived only from the client's redirect targets, never from `clientName` or `clientId`: true only when every redirect URI of the client matches one operator-listed known-client entry (that entry's https hosts or its app schemes). Marks trust and never blocks: a false value is shown as an unverified client, and the user may still allow it.",
            "x-order": 5
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
