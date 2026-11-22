/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const RecognitionSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Recognition",
    "description": "OpenAPI schema for peer recognition. The community guide candidates\nroute lists the kudos recipients who reached the unique-giver threshold\nin a UTC calendar month, split into those resolved to a Layer5 user and\nthose that need more information. It is read-only; a maintainer awards\nthe badge through the existing badge assignment route.\nAuthorization: the caller must be a Provider Admin.\n",
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
      "name": "recognition",
      "description": "Operations related to peer recognition."
    }
  ],
  "paths": {
    "/api/identity/recognition/community-guide/candidates": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "recognition"
        ],
        "summary": "Get Community Guide candidates",
        "operationId": "getCommunityGuideCandidates",
        "description": "Returns the kudos recipients with at least the configured number of distinct givers in a UTC calendar month, split into candidates resolved to a Layer5 user and recipients that need more information. Defaults to the previous UTC month.\n",
        "parameters": [
          {
            "name": "month",
            "in": "query",
            "required": false,
            "description": "UTC calendar month to count, formatted `YYYY-MM`. Defaults to the previous month.",
            "schema": {
              "type": "string",
              "pattern": "^[0-9]{4}-(0[1-9]|1[0-2])$"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Community Guide candidates for the month",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Server-computed list of Community Guide candidates for one UTC calendar\nmonth. Recipients with at least `minGivers` distinct givers are split\ninto `candidates` (resolved to a Layer5 user) and `needsInfo` (not\nresolved). Read-only: a maintainer confirms by awarding the badge\nthrough the existing badge assignment route.\n",
                  "additionalProperties": false,
                  "required": [
                    "month",
                    "minGivers",
                    "badge",
                    "candidates",
                    "needsInfo"
                  ],
                  "properties": {
                    "month": {
                      "type": "string",
                      "pattern": "^[0-9]{4}-(0[1-9]|1[0-2])$",
                      "description": "The UTC calendar month counted, formatted `YYYY-MM`."
                    },
                    "minGivers": {
                      "type": "integer",
                      "minimum": 1,
                      "description": "Minimum number of distinct givers a recipient needed to be listed."
                    },
                    "badge": {
                      "type": "string",
                      "minLength": 1,
                      "maxLength": 255,
                      "description": "Slug of the badge the candidates are being considered for."
                    },
                    "candidates": {
                      "type": "array",
                      "description": "Recipients resolved to a Layer5 user, most givers first.",
                      "items": {
                        "x-go-type": "CommunityGuideCandidate",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "title": "Community Guide Candidate Schema",
                        "description": "A kudos recipient who reached the unique-giver threshold for a UTC month\nand resolved to a Layer5 user. A maintainer confirms the award.\n",
                        "type": "object",
                        "additionalProperties": false,
                        "required": [
                          "userId",
                          "email",
                          "provider",
                          "externalId",
                          "givers"
                        ],
                        "properties": {
                          "userId": {
                            "description": "Layer5 user ID the recipient resolved to.",
                            "x-go-name": "UserID",
                            "x-order": 1,
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "email": {
                            "type": "string",
                            "format": "email",
                            "maxLength": 320,
                            "description": "Email address of the resolved Layer5 user.",
                            "x-order": 2
                          },
                          "provider": {
                            "type": "string",
                            "minLength": 1,
                            "maxLength": 32,
                            "description": "Identity provider the kudos recipient was recorded under, for example `github`.",
                            "x-order": 3
                          },
                          "externalId": {
                            "type": "string",
                            "minLength": 1,
                            "maxLength": 255,
                            "description": "The recipient's identifier at the provider, for example a numeric GitHub ID.",
                            "x-id-format": "external",
                            "x-go-name": "ExternalID",
                            "x-order": 4
                          },
                          "givers": {
                            "type": "integer",
                            "minimum": 1,
                            "description": "Number of distinct givers who gave the recipient valid kudos in the month.",
                            "x-order": 5
                          }
                        }
                      }
                    },
                    "needsInfo": {
                      "type": "array",
                      "description": "Recipients who could not be resolved to a Layer5 user.",
                      "items": {
                        "x-go-type": "CommunityGuideNeedsInfo",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "title": "Community Guide Needs Info Schema",
                        "description": "A kudos recipient who reached the unique-giver threshold but did not\nresolve to a Layer5 user. Ask the person for the missing link when the\nrecognition is presented.\n",
                        "type": "object",
                        "additionalProperties": false,
                        "required": [
                          "provider",
                          "externalId",
                          "givers"
                        ],
                        "properties": {
                          "provider": {
                            "type": "string",
                            "minLength": 1,
                            "maxLength": 32,
                            "description": "Identity provider the kudos recipient was recorded under, for example `github` or `slack`.",
                            "x-order": 1
                          },
                          "externalId": {
                            "type": "string",
                            "minLength": 1,
                            "maxLength": 255,
                            "description": "The recipient's identifier at the provider.",
                            "x-id-format": "external",
                            "x-go-name": "ExternalID",
                            "x-order": 2
                          },
                          "givers": {
                            "type": "integer",
                            "minimum": 1,
                            "description": "Number of distinct givers who gave the recipient valid kudos in the month.",
                            "x-order": 3
                          }
                        }
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
    "schemas": {
      "CommunityGuideCandidates": {
        "type": "object",
        "description": "Server-computed list of Community Guide candidates for one UTC calendar\nmonth. Recipients with at least `minGivers` distinct givers are split\ninto `candidates` (resolved to a Layer5 user) and `needsInfo` (not\nresolved). Read-only: a maintainer confirms by awarding the badge\nthrough the existing badge assignment route.\n",
        "additionalProperties": false,
        "required": [
          "month",
          "minGivers",
          "badge",
          "candidates",
          "needsInfo"
        ],
        "properties": {
          "month": {
            "type": "string",
            "pattern": "^[0-9]{4}-(0[1-9]|1[0-2])$",
            "description": "The UTC calendar month counted, formatted `YYYY-MM`."
          },
          "minGivers": {
            "type": "integer",
            "minimum": 1,
            "description": "Minimum number of distinct givers a recipient needed to be listed."
          },
          "badge": {
            "type": "string",
            "minLength": 1,
            "maxLength": 255,
            "description": "Slug of the badge the candidates are being considered for."
          },
          "candidates": {
            "type": "array",
            "description": "Recipients resolved to a Layer5 user, most givers first.",
            "items": {
              "x-go-type": "CommunityGuideCandidate",
              "$schema": "http://json-schema.org/draft-07/schema#",
              "title": "Community Guide Candidate Schema",
              "description": "A kudos recipient who reached the unique-giver threshold for a UTC month\nand resolved to a Layer5 user. A maintainer confirms the award.\n",
              "type": "object",
              "additionalProperties": false,
              "required": [
                "userId",
                "email",
                "provider",
                "externalId",
                "givers"
              ],
              "properties": {
                "userId": {
                  "description": "Layer5 user ID the recipient resolved to.",
                  "x-go-name": "UserID",
                  "x-order": 1,
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "email": {
                  "type": "string",
                  "format": "email",
                  "maxLength": 320,
                  "description": "Email address of the resolved Layer5 user.",
                  "x-order": 2
                },
                "provider": {
                  "type": "string",
                  "minLength": 1,
                  "maxLength": 32,
                  "description": "Identity provider the kudos recipient was recorded under, for example `github`.",
                  "x-order": 3
                },
                "externalId": {
                  "type": "string",
                  "minLength": 1,
                  "maxLength": 255,
                  "description": "The recipient's identifier at the provider, for example a numeric GitHub ID.",
                  "x-id-format": "external",
                  "x-go-name": "ExternalID",
                  "x-order": 4
                },
                "givers": {
                  "type": "integer",
                  "minimum": 1,
                  "description": "Number of distinct givers who gave the recipient valid kudos in the month.",
                  "x-order": 5
                }
              }
            }
          },
          "needsInfo": {
            "type": "array",
            "description": "Recipients who could not be resolved to a Layer5 user.",
            "items": {
              "x-go-type": "CommunityGuideNeedsInfo",
              "$schema": "http://json-schema.org/draft-07/schema#",
              "title": "Community Guide Needs Info Schema",
              "description": "A kudos recipient who reached the unique-giver threshold but did not\nresolve to a Layer5 user. Ask the person for the missing link when the\nrecognition is presented.\n",
              "type": "object",
              "additionalProperties": false,
              "required": [
                "provider",
                "externalId",
                "givers"
              ],
              "properties": {
                "provider": {
                  "type": "string",
                  "minLength": 1,
                  "maxLength": 32,
                  "description": "Identity provider the kudos recipient was recorded under, for example `github` or `slack`.",
                  "x-order": 1
                },
                "externalId": {
                  "type": "string",
                  "minLength": 1,
                  "maxLength": 255,
                  "description": "The recipient's identifier at the provider.",
                  "x-id-format": "external",
                  "x-go-name": "ExternalID",
                  "x-order": 2
                },
                "givers": {
                  "type": "integer",
                  "minimum": 1,
                  "description": "Number of distinct givers who gave the recipient valid kudos in the month.",
                  "x-order": 3
                }
              }
            }
          }
        }
      },
      "CommunityGuideCandidate": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Community Guide Candidate Schema",
        "description": "A kudos recipient who reached the unique-giver threshold for a UTC month\nand resolved to a Layer5 user. A maintainer confirms the award.\n",
        "type": "object",
        "additionalProperties": false,
        "required": [
          "userId",
          "email",
          "provider",
          "externalId",
          "givers"
        ],
        "properties": {
          "userId": {
            "description": "Layer5 user ID the recipient resolved to.",
            "x-go-name": "UserID",
            "x-order": 1,
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "email": {
            "type": "string",
            "format": "email",
            "maxLength": 320,
            "description": "Email address of the resolved Layer5 user.",
            "x-order": 2
          },
          "provider": {
            "type": "string",
            "minLength": 1,
            "maxLength": 32,
            "description": "Identity provider the kudos recipient was recorded under, for example `github`.",
            "x-order": 3
          },
          "externalId": {
            "type": "string",
            "minLength": 1,
            "maxLength": 255,
            "description": "The recipient's identifier at the provider, for example a numeric GitHub ID.",
            "x-id-format": "external",
            "x-go-name": "ExternalID",
            "x-order": 4
          },
          "givers": {
            "type": "integer",
            "minimum": 1,
            "description": "Number of distinct givers who gave the recipient valid kudos in the month.",
            "x-order": 5
          }
        }
      },
      "CommunityGuideNeedsInfo": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Community Guide Needs Info Schema",
        "description": "A kudos recipient who reached the unique-giver threshold but did not\nresolve to a Layer5 user. Ask the person for the missing link when the\nrecognition is presented.\n",
        "type": "object",
        "additionalProperties": false,
        "required": [
          "provider",
          "externalId",
          "givers"
        ],
        "properties": {
          "provider": {
            "type": "string",
            "minLength": 1,
            "maxLength": 32,
            "description": "Identity provider the kudos recipient was recorded under, for example `github` or `slack`.",
            "x-order": 1
          },
          "externalId": {
            "type": "string",
            "minLength": 1,
            "maxLength": 255,
            "description": "The recipient's identifier at the provider.",
            "x-id-format": "external",
            "x-go-name": "ExternalID",
            "x-order": 2
          },
          "givers": {
            "type": "integer",
            "minimum": 1,
            "description": "Number of distinct givers who gave the recipient valid kudos in the month.",
            "x-order": 3
          }
        }
      }
    }
  }
};

export default RecognitionSchema;
