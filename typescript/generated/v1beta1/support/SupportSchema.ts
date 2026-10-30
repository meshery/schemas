/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const SupportSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Support",
    "description": "OpenAPI schema for Meshery help-and-support request submission.",
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
      "name": "Support",
      "description": "Operations related to help and support requests"
    }
  ],
  "paths": {
    "/api/integrations/support": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Support"
        ],
        "summary": "Submit a support request",
        "operationId": "submitSupportRequest",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for submitting a help-and-support request.",
                "required": [
                  "subject",
                  "message"
                ],
                "properties": {
                  "subject": {
                    "type": "string",
                    "title": "Subject",
                    "minLength": 1,
                    "maxLength": 255,
                    "description": "Concise and descriptive title for the support request."
                  },
                  "message": {
                    "type": "string",
                    "title": "Description",
                    "minLength": 10,
                    "description": "Detailed description of the issue or question."
                  },
                  "scope": {
                    "type": "string",
                    "title": "Scope",
                    "enum": [
                      "Support",
                      "Community",
                      "Account",
                      "Commercial"
                    ],
                    "description": "Category that best represents the nature of the inquiry."
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Support request submitted",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Invalid request format"
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
            "description": "Internal server error"
          }
        }
      }
    },
    "/api/support/anonymous": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "Support"
        ],
        "summary": "Submit an anonymous support request",
        "description": "Accepts a support request without requiring a signed-in user, so a desktop client can offer a \"Contact support\" action whether or not the person is signed in. A signed-out client authenticates with the same per-client-kind `X-Client-Key` as submitFailureDiagnostic; a signed-in caller may use its bearer token instead, and only then is the organization attached. A request carrying neither is a 401. The email address is only ever sent when the person types it in, and diagnosticId links this report to the automatic failure diagnostic submitted for the same incident, when one exists. Served by Layer5 Cloud; see Blowhorn issue #771.",
        "operationId": "submitAnonymousSupportRequest",
        "security": [
          {
            "clientKey": []
          },
          {
            "jwt": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for submitting a help-and-support request without signing in. It carries the same subject, message, and scope as SupportRequest, plus two optional fields: an email address the person typed in for a follow-up, and the diagnosticId of the automatic failure diagnostic for the same incident, when one was submitted. The fields are spelled out here rather than composed with allOf so generated clients expose them flat, exactly like SupportRequest. The object is closed: Cloud decodes it strictly and refuses an unknown field with a 400.",
                "additionalProperties": false,
                "required": [
                  "subject",
                  "message"
                ],
                "properties": {
                  "subject": {
                    "type": "string",
                    "title": "Subject",
                    "minLength": 1,
                    "maxLength": 255,
                    "description": "Concise and descriptive title for the support request."
                  },
                  "message": {
                    "type": "string",
                    "title": "Description",
                    "minLength": 10,
                    "description": "Detailed description of the issue or question."
                  },
                  "scope": {
                    "type": "string",
                    "title": "Scope",
                    "enum": [
                      "Support",
                      "Community",
                      "Account",
                      "Commercial"
                    ],
                    "description": "Category that best represents the nature of the inquiry."
                  },
                  "email": {
                    "type": "string",
                    "title": "Email",
                    "format": "email",
                    "maxLength": 254,
                    "description": "Optional email address the person typed in for a follow-up. Absent when they did not ask to be contacted; never inferred from an account, because this request may come from a signed-out client."
                  },
                  "diagnosticId": {
                    "type": "string",
                    "title": "Diagnostic ID",
                    "format": "uuid",
                    "description": "Optional id of the FailureDiagnostic submitted for the same incident (schemas/constructs/v1beta1/diagnostics/api.yml), linking the human report to the automatic diagnostic."
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Support request received and forwarded",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "status"
                  ],
                  "properties": {
                    "status": {
                      "type": "string",
                      "enum": [
                        "received"
                      ],
                      "description": "Always `received`."
                    },
                    "diagnosticId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "Echoes the request's diagnosticId; omitted when the request linked none."
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
            "description": "Neither a signed-in session nor a valid X-Client-Key. A missing, revoked, expired, not-yet-valid or unknown key all answer alike, so key existence is not an oracle. Rotate the client key; this is not an expired session.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "message"
                  ],
                  "properties": {
                    "message": {
                      "type": "string",
                      "description": "The refusal, for example \"Client key required for operation is invalid or missing\"."
                    }
                  }
                }
              }
            }
          },
          "413": {
            "description": "The request body exceeds the 16 KB cap. Do not retry the same body.",
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
          "429": {
            "description": "Rate limit exceeded; retry after the Retry-After interval.",
            "headers": {
              "Retry-After": {
                "description": "Seconds to wait before retrying; always a whole number of at least 1.",
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
          "502": {
            "description": "Bad gateway - an upstream service the operation depends on could not be reached or rejected the request",
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
      "ClientKeyUnauthorized": {
        "description": "Neither a signed-in session nor a valid X-Client-Key. A missing, revoked, expired, not-yet-valid or unknown key all answer alike, so key existence is not an oracle. Rotate the client key; this is not an expired session.",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "required": [
                "message"
              ],
              "properties": {
                "message": {
                  "type": "string",
                  "description": "The refusal, for example \"Client key required for operation is invalid or missing\"."
                }
              }
            }
          }
        }
      },
      "PayloadTooLarge": {
        "description": "The request body exceeds the 16 KB cap. Do not retry the same body.",
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
      "RateLimited": {
        "description": "Rate limit exceeded; retry after the Retry-After interval.",
        "headers": {
          "Retry-After": {
            "description": "Seconds to wait before retrying; always a whole number of at least 1.",
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
      "MeshkitError502": {
        "description": "Bad gateway - an upstream service the operation depends on could not be reached or rejected the request",
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
    "securitySchemes": {
      "clientKey": {
        "type": "apiKey",
        "in": "header",
        "name": "X-Client-Key",
        "description": "Per-client-kind, per-release-channel pre-shared key, of the form `<key id>.<secret>`. The same key authenticates submitFailureDiagnostic (v1beta1/diagnostics)."
      },
      "jwt": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    },
    "schemas": {
      "SupportRequest": {
        "type": "object",
        "description": "Payload for submitting a help-and-support request.",
        "required": [
          "subject",
          "message"
        ],
        "properties": {
          "subject": {
            "type": "string",
            "title": "Subject",
            "minLength": 1,
            "maxLength": 255,
            "description": "Concise and descriptive title for the support request."
          },
          "message": {
            "type": "string",
            "title": "Description",
            "minLength": 10,
            "description": "Detailed description of the issue or question."
          },
          "scope": {
            "type": "string",
            "title": "Scope",
            "enum": [
              "Support",
              "Community",
              "Account",
              "Commercial"
            ],
            "description": "Category that best represents the nature of the inquiry."
          }
        }
      },
      "AnonymousSupportRequest": {
        "type": "object",
        "description": "Payload for submitting a help-and-support request without signing in. It carries the same subject, message, and scope as SupportRequest, plus two optional fields: an email address the person typed in for a follow-up, and the diagnosticId of the automatic failure diagnostic for the same incident, when one was submitted. The fields are spelled out here rather than composed with allOf so generated clients expose them flat, exactly like SupportRequest. The object is closed: Cloud decodes it strictly and refuses an unknown field with a 400.",
        "additionalProperties": false,
        "required": [
          "subject",
          "message"
        ],
        "properties": {
          "subject": {
            "type": "string",
            "title": "Subject",
            "minLength": 1,
            "maxLength": 255,
            "description": "Concise and descriptive title for the support request."
          },
          "message": {
            "type": "string",
            "title": "Description",
            "minLength": 10,
            "description": "Detailed description of the issue or question."
          },
          "scope": {
            "type": "string",
            "title": "Scope",
            "enum": [
              "Support",
              "Community",
              "Account",
              "Commercial"
            ],
            "description": "Category that best represents the nature of the inquiry."
          },
          "email": {
            "type": "string",
            "title": "Email",
            "format": "email",
            "maxLength": 254,
            "description": "Optional email address the person typed in for a follow-up. Absent when they did not ask to be contacted; never inferred from an account, because this request may come from a signed-out client."
          },
          "diagnosticId": {
            "type": "string",
            "title": "Diagnostic ID",
            "format": "uuid",
            "description": "Optional id of the FailureDiagnostic submitted for the same incident (schemas/constructs/v1beta1/diagnostics/api.yml), linking the human report to the automatic diagnostic."
          }
        }
      }
    }
  }
};

export default SupportSchema;
