/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const GithubSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "GitHub",
    "description": "OpenAPI schema for Meshery Cloud's GitHub integration - the GitHub App\nconnection, the repositories its installations reach, and the Kanvas\nworkflow it commits. Every operation acts only through the caller's own\nverified GitHub App installations: the installations GitHub lists for the\ncaller's own GitHub account when they authorize the App. Carries no\nentity schema; the GitHub App connection itself is a `kind: github`\nconnection of the v1beta3 `connection` construct, and its metadata is\ndescribed by `GithubConnectionMetadata`. The GitHub operations that read\nor write designs (import, imported-designs inventory, refresh, remap,\nbranch list) live in the v1beta3 `design` construct.\n",
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
      "name": "github",
      "description": "GitHub App connection status and authorization, installation repositories, repository trees and the Kanvas workflow."
    }
  ],
  "paths": {
    "/api/integrations/github/status": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "github"
        ],
        "summary": "Whether the caller's GitHub connection is usable",
        "operationId": "getGithubAppStatus",
        "description": "Checks the caller's GitHub App connection. A connection is usable only when its installations were verified against the caller's own GitHub account and GitHub confirms the installation it opens on still exists. `403` with a MeshKit error saying the connection must be re-authorized means it predates verification; re-authorize it with `startGithubAuthorization` (`flow=authorize`). When GitHub reports the installation the connection opens on removed, that installation is dropped and the connection re-points at its next verified installation, which is checked in turn: `200` when one remains. `404` means the caller has no GitHub connection, or no verified installation remains - in which case the connection is deleted. `502` means GitHub could not confirm either way; the connection is kept.\n",
        "responses": {
          "200": {
            "description": "The connection is verified and its installation exists. No body."
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
    },
    "/api/integrations/github": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "github"
        ],
        "summary": "List the repositories one of the caller's installations can access",
        "operationId": "getGithubInstallationRepositories",
        "description": "Returns one page of the repositories a GitHub App installation can access. `id` must name one of the caller's verified GitHub App installations; any other id - another account's, or one that does not exist - is the same `403`, so the route does not reveal which installations exist. `502` means GitHub could not be reached or rejected the request.\n",
        "parameters": [
          {
            "name": "id",
            "in": "query",
            "required": true,
            "description": "GitHub App installation id; must be one of the caller's verified installations.",
            "schema": {
              "type": "string",
              "pattern": "^[1-9][0-9]*$"
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
          }
        ],
        "responses": {
          "200": {
            "description": "One page of the installation's repositories.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "One page of GitHub's `GET /installation/repositories` answer, passed through as GitHub returns it (`total_count`, `repositories`).",
                  "additionalProperties": true
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
    },
    "/api/integrations/github/scan": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "github"
        ],
        "summary": "One page of a repository's file tree",
        "operationId": "scanGithubRepository",
        "description": "Returns one page of a repository's file tree, as nested tree items. The repository must be reachable through one of the caller's verified GitHub App installations; otherwise the request is refused with the same uniform `403` as `importGithubRepository`, which does not reveal where the App is installed. With `ref`, the tree is read at the commit the ref resolves to. `206` answers a page of a tree that has further pages.\n",
        "parameters": [
          {
            "name": "name",
            "in": "query",
            "required": true,
            "description": "Repository as `<owner>/<repo>`.",
            "schema": {
              "type": "string",
              "maxLength": 512
            }
          },
          {
            "name": "ref",
            "in": "query",
            "required": false,
            "description": "Branch or tag to scan. Empty or omitted scans the repository's default branch. A ref that names no commit answers 409.",
            "schema": {
              "type": "string",
              "maxLength": 255
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
            "description": "Number of items per page.",
            "schema": {
              "type": "integer",
              "minimum": 1
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Tree page.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "description": "One page of a repository's file tree.",
                  "items": {
                    "type": "object",
                    "description": "One file or directory of a repository's file tree, with its children.",
                    "additionalProperties": false,
                    "properties": {
                      "id": {
                        "description": "Identifier of the tree item, for the UI's tree view.",
                        "x-go-name": "ID",
                        "type": "string",
                        "format": "uuid",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        }
                      },
                      "label": {
                        "type": "string",
                        "description": "Display name of the file or directory.",
                        "maxLength": 4096
                      },
                      "type": {
                        "type": "string",
                        "description": "Kind of the tree item, such as a file or a directory.",
                        "maxLength": 64
                      },
                      "entry": {
                        "type": "object",
                        "description": "GitHub's tree entry for the item, passed through as GitHub returns it.",
                        "additionalProperties": true
                      },
                      "children": {
                        "type": "array",
                        "description": "The items under a directory, each shaped as a `GithubRepositoryTreeItem`.",
                        "items": {
                          "type": "object",
                          "additionalProperties": true
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "206": {
            "description": "Tree page of a tree that has further pages.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "description": "One page of a repository's file tree.",
                  "items": {
                    "type": "object",
                    "description": "One file or directory of a repository's file tree, with its children.",
                    "additionalProperties": false,
                    "properties": {
                      "id": {
                        "description": "Identifier of the tree item, for the UI's tree view.",
                        "x-go-name": "ID",
                        "type": "string",
                        "format": "uuid",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        }
                      },
                      "label": {
                        "type": "string",
                        "description": "Display name of the file or directory.",
                        "maxLength": 4096
                      },
                      "type": {
                        "type": "string",
                        "description": "Kind of the tree item, such as a file or a directory.",
                        "maxLength": 64
                      },
                      "entry": {
                        "type": "object",
                        "description": "GitHub's tree entry for the item, passed through as GitHub returns it.",
                        "additionalProperties": true
                      },
                      "children": {
                        "type": "array",
                        "description": "The items under a directory, each shaped as a `GithubRepositoryTreeItem`.",
                        "items": {
                          "type": "object",
                          "additionalProperties": true
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
          "409": {
            "description": "Conflict",
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
    },
    "/api/integrations/github/verify/{owner}/{repo}": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "github"
        ],
        "summary": "Whether the Kanvas workflow is already present in a repository",
        "operationId": "verifyGithubRepositoryWorkflow",
        "description": "Reports whether the Kanvas workflow is already committed to a repository. The repository's installation is resolved and authorized by the server; the `id` query parameter is accepted for compatibility and is not consulted. A repository the caller cannot reach through one of their verified GitHub App installations is refused with the same uniform `403` as `importGithubRepository`. No request body.\n",
        "parameters": [
          {
            "name": "owner",
            "in": "path",
            "required": true,
            "description": "Login of the account that owns the repository.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "repo",
            "in": "path",
            "required": true,
            "description": "Repository name, without its owner.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "id",
            "in": "query",
            "required": false,
            "deprecated": true,
            "description": "Ignored. Accepted for compatibility; the server resolves the installation itself.",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Workflow presence.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Whether the Kanvas workflow is already present in a repository.",
                  "additionalProperties": false,
                  "required": [
                    "status"
                  ],
                  "properties": {
                    "status": {
                      "type": "string",
                      "description": "`ok` when no workflow is present; `error` when one is (`fileUrl` names it) or the check failed (`error` says why).",
                      "enum": [
                        "ok",
                        "error"
                      ]
                    },
                    "fileUrl": {
                      "type": "string",
                      "format": "uri",
                      "description": "URL of the workflow file already present."
                    },
                    "error": {
                      "type": "string",
                      "maxLength": 4096,
                      "description": "Why the repository cannot take the workflow."
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
    },
    "/api/integrations/github/install": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "github"
        ],
        "summary": "Commit the Kanvas workflow into repositories",
        "operationId": "installGithubWorkflow",
        "description": "Commits the Kanvas workflow into each requested repository. Every well-formed repository is authorized before anything is written: one repository the caller cannot reach through their verified GitHub App installations refuses the whole request with the uniform `403`, and nothing is committed anywhere. A malformed repository identifier is reported per repository (`code: 400`) and never reaches GitHub. The `id` query parameter is accepted for compatibility and is not consulted.\n",
        "parameters": [
          {
            "name": "id",
            "in": "query",
            "required": false,
            "deprecated": true,
            "description": "Ignored. Accepted for compatibility; the server resolves the installation itself.",
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "The repositories to commit the Kanvas workflow into.",
                "additionalProperties": false,
                "required": [
                  "repositories"
                ],
                "properties": {
                  "repositories": {
                    "type": "array",
                    "description": "Repositories as `<owner>/<repo>`.",
                    "items": {
                      "type": "string",
                      "maxLength": 512
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "One entry per requested repository.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "description": "One single-key entry per requested repository, keyed by `<owner>/<repo>`.",
                  "items": {
                    "type": "object",
                    "additionalProperties": {
                      "type": "object",
                      "description": "The outcome of committing the workflow into one repository.",
                      "additionalProperties": false,
                      "properties": {
                        "code": {
                          "type": "integer",
                          "minimum": 100,
                          "maximum": 599,
                          "description": "HTTP-style status of the repository's outcome; `400` for a malformed repository identifier."
                        },
                        "description": {
                          "type": "string",
                          "maxLength": 4096,
                          "description": "The outcome, in words."
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
    },
    "/api/integrations/github/authorize": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "github"
        ],
        "summary": "Start a trip to GitHub (browser navigation)",
        "operationId": "startGithubAuthorization",
        "description": "Browser navigation, not a data call. Issues a single-use state bound to the signed-in user (consumed once, five-minute lifetime) and redirects to GitHub carrying it: `flow=install` to the GitHub App's installation page (derived from the App's own `html_url`), `flow=authorize` to GitHub's user-authorization page for the App. The UI never links to GitHub directly. Failures redirect to `/connect/github/new/<userId>?githubError=<reason>`, as the callback does.\n",
        "parameters": [
          {
            "name": "flow",
            "in": "query",
            "required": true,
            "description": "`install` sends the browser to the GitHub App's installation page; `authorize` sends it to GitHub's user-authorization page for the App.",
            "schema": {
              "type": "string",
              "enum": [
                "install",
                "authorize"
              ]
            }
          }
        ],
        "responses": {
          "302": {
            "description": "Redirect to GitHub, or to the connection wizard with a reason."
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
          }
        }
      }
    },
    "/api/integrations/github/callback": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "github"
        ],
        "summary": "The GitHub App's callback (browser navigation)",
        "operationId": "githubAppCallback",
        "description": "Browser navigation, not a data call. GitHub returns the browser here with the `state` issued by `startGithubAuthorization` and a one-time `code`. A missing, expired, reused or foreign `state` is refused before the code is exchanged or any connection is touched (`githubError=authorization-stale`). The server then exchanges the code for a user-to-server token, lists the installations of the App the authorizing GitHub account can access (GitHub's `GET /user/installations`) and stores exactly that set on the caller's GitHub connection - creating it, or updating it in place. An `installation_id` not in that set is never stored, and a result of zero installations never deletes or replaces an existing connection. Always answers a `302`: to `/connect/github/verify?githubLogin=true&id=<installation>[&setup_action=update]` on success, else to `/connect/github/new/<userId>?githubError=<reason>`, `reason` one of `authorization-failed`, `authorization-stale`, `authorization-unavailable`, `connection-failed`, `installation-not-verified`, `no-installations`. The `installation_id` and `setup_action` query parameter names are GitHub's and are kept as GitHub sends them.\n",
        "parameters": [
          {
            "name": "state",
            "in": "query",
            "required": true,
            "description": "The single-use state `startGithubAuthorization` issued.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "code",
            "in": "query",
            "required": false,
            "description": "GitHub's one-time authorization code.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "installation_id",
            "in": "query",
            "required": false,
            "description": "The installation GitHub names on return (GitHub's parameter name). It is stored only when it is one of the installations GitHub lists for the authorizing account.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "setup_action",
            "in": "query",
            "required": false,
            "description": "GitHub's setup action (GitHub's parameter name).",
            "schema": {
              "type": "string",
              "enum": [
                "install",
                "update",
                "request"
              ]
            }
          }
        ],
        "responses": {
          "302": {
            "description": "Redirect to the connection wizard, as described."
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
      "MeshkitError409": {
        "description": "Conflict",
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
        "description": "Number of items per page.",
        "schema": {
          "type": "integer",
          "minimum": 1
        }
      },
      "installationIdQuery": {
        "name": "id",
        "in": "query",
        "required": true,
        "description": "GitHub App installation id; must be one of the caller's verified installations.",
        "schema": {
          "type": "string",
          "pattern": "^[1-9][0-9]*$"
        }
      },
      "ignoredInstallationId": {
        "name": "id",
        "in": "query",
        "required": false,
        "deprecated": true,
        "description": "Ignored. Accepted for compatibility; the server resolves the installation itself.",
        "schema": {
          "type": "string"
        }
      },
      "repositoryName": {
        "name": "name",
        "in": "query",
        "required": true,
        "description": "Repository as `<owner>/<repo>`.",
        "schema": {
          "type": "string",
          "maxLength": 512
        }
      },
      "repositoryRef": {
        "name": "ref",
        "in": "query",
        "required": false,
        "description": "Branch or tag to scan. Empty or omitted scans the repository's default branch. A ref that names no commit answers 409.",
        "schema": {
          "type": "string",
          "maxLength": 255
        }
      },
      "owner": {
        "name": "owner",
        "in": "path",
        "required": true,
        "description": "Login of the account that owns the repository.",
        "schema": {
          "type": "string"
        }
      },
      "repo": {
        "name": "repo",
        "in": "path",
        "required": true,
        "description": "Repository name, without its owner.",
        "schema": {
          "type": "string"
        }
      },
      "flow": {
        "name": "flow",
        "in": "query",
        "required": true,
        "description": "`install` sends the browser to the GitHub App's installation page; `authorize` sends it to GitHub's user-authorization page for the App.",
        "schema": {
          "type": "string",
          "enum": [
            "install",
            "authorize"
          ]
        }
      },
      "state": {
        "name": "state",
        "in": "query",
        "required": true,
        "description": "The single-use state `startGithubAuthorization` issued.",
        "schema": {
          "type": "string"
        }
      },
      "code": {
        "name": "code",
        "in": "query",
        "required": false,
        "description": "GitHub's one-time authorization code.",
        "schema": {
          "type": "string"
        }
      },
      "githubInstallationId": {
        "name": "installation_id",
        "in": "query",
        "required": false,
        "description": "The installation GitHub names on return (GitHub's parameter name). It is stored only when it is one of the installations GitHub lists for the authorizing account.",
        "schema": {
          "type": "string"
        }
      },
      "githubSetupAction": {
        "name": "setup_action",
        "in": "query",
        "required": false,
        "description": "GitHub's setup action (GitHub's parameter name).",
        "schema": {
          "type": "string",
          "enum": [
            "install",
            "update",
            "request"
          ]
        }
      }
    },
    "schemas": {
      "GithubInstallationRepositoryPage": {
        "type": "object",
        "description": "One page of GitHub's `GET /installation/repositories` answer, passed through as GitHub returns it (`total_count`, `repositories`).",
        "additionalProperties": true
      },
      "GithubRepositoryTree": {
        "type": "array",
        "description": "One page of a repository's file tree.",
        "items": {
          "type": "object",
          "description": "One file or directory of a repository's file tree, with its children.",
          "additionalProperties": false,
          "properties": {
            "id": {
              "description": "Identifier of the tree item, for the UI's tree view.",
              "x-go-name": "ID",
              "type": "string",
              "format": "uuid",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              }
            },
            "label": {
              "type": "string",
              "description": "Display name of the file or directory.",
              "maxLength": 4096
            },
            "type": {
              "type": "string",
              "description": "Kind of the tree item, such as a file or a directory.",
              "maxLength": 64
            },
            "entry": {
              "type": "object",
              "description": "GitHub's tree entry for the item, passed through as GitHub returns it.",
              "additionalProperties": true
            },
            "children": {
              "type": "array",
              "description": "The items under a directory, each shaped as a `GithubRepositoryTreeItem`.",
              "items": {
                "type": "object",
                "additionalProperties": true
              }
            }
          }
        }
      },
      "GithubRepositoryTreeItem": {
        "type": "object",
        "description": "One file or directory of a repository's file tree, with its children.",
        "additionalProperties": false,
        "properties": {
          "id": {
            "description": "Identifier of the tree item, for the UI's tree view.",
            "x-go-name": "ID",
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "label": {
            "type": "string",
            "description": "Display name of the file or directory.",
            "maxLength": 4096
          },
          "type": {
            "type": "string",
            "description": "Kind of the tree item, such as a file or a directory.",
            "maxLength": 64
          },
          "entry": {
            "type": "object",
            "description": "GitHub's tree entry for the item, passed through as GitHub returns it.",
            "additionalProperties": true
          },
          "children": {
            "type": "array",
            "description": "The items under a directory, each shaped as a `GithubRepositoryTreeItem`.",
            "items": {
              "type": "object",
              "additionalProperties": true
            }
          }
        }
      },
      "GithubWorkflowVerification": {
        "type": "object",
        "description": "Whether the Kanvas workflow is already present in a repository.",
        "additionalProperties": false,
        "required": [
          "status"
        ],
        "properties": {
          "status": {
            "type": "string",
            "description": "`ok` when no workflow is present; `error` when one is (`fileUrl` names it) or the check failed (`error` says why).",
            "enum": [
              "ok",
              "error"
            ]
          },
          "fileUrl": {
            "type": "string",
            "format": "uri",
            "description": "URL of the workflow file already present."
          },
          "error": {
            "type": "string",
            "maxLength": 4096,
            "description": "Why the repository cannot take the workflow."
          }
        }
      },
      "GithubWorkflowInstallPayload": {
        "type": "object",
        "description": "The repositories to commit the Kanvas workflow into.",
        "additionalProperties": false,
        "required": [
          "repositories"
        ],
        "properties": {
          "repositories": {
            "type": "array",
            "description": "Repositories as `<owner>/<repo>`.",
            "items": {
              "type": "string",
              "maxLength": 512
            }
          }
        }
      },
      "GithubWorkflowInstallResponse": {
        "type": "array",
        "description": "One single-key entry per requested repository, keyed by `<owner>/<repo>`.",
        "items": {
          "type": "object",
          "additionalProperties": {
            "type": "object",
            "description": "The outcome of committing the workflow into one repository.",
            "additionalProperties": false,
            "properties": {
              "code": {
                "type": "integer",
                "minimum": 100,
                "maximum": 599,
                "description": "HTTP-style status of the repository's outcome; `400` for a malformed repository identifier."
              },
              "description": {
                "type": "string",
                "maxLength": 4096,
                "description": "The outcome, in words."
              }
            }
          }
        }
      },
      "GithubWorkflowInstallResult": {
        "type": "object",
        "description": "The outcome of committing the workflow into one repository.",
        "additionalProperties": false,
        "properties": {
          "code": {
            "type": "integer",
            "minimum": 100,
            "maximum": 599,
            "description": "HTTP-style status of the repository's outcome; `400` for a malformed repository identifier."
          },
          "description": {
            "type": "string",
            "maxLength": 4096,
            "description": "The outcome, in words."
          }
        }
      },
      "GithubConnectionMetadata": {
        "type": "object",
        "description": "Metadata of a `kind: github` connection, as Meshery Cloud writes it. `installations`, `installationId` and `installationsVerifiedAt` are server-written: a connection edit can neither set nor erase them (see `updateConnection`).",
        "properties": {
          "installationId": {
            "type": "string",
            "description": "The installation the connection wizard opens on; always one of `installations`.",
            "x-id-format": "external",
            "pattern": "^[1-9][0-9]*$"
          },
          "installations": {
            "type": "array",
            "description": "The verified installations - those GitHub listed for the owner's GitHub account at the last authorization. Absent on a connection that predates verification (which must be re-authorized); an empty set is never stored.",
            "items": {
              "type": "object",
              "description": "One verified GitHub App installation.",
              "required": [
                "id"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "description": "GitHub App installation id.",
                  "x-id-format": "external",
                  "pattern": "^[1-9][0-9]*$"
                },
                "account": {
                  "type": "string",
                  "description": "Login of the account the App is installed on.",
                  "maxLength": 255
                },
                "accountType": {
                  "type": "string",
                  "description": "Type of the account the App is installed on, as GitHub names it.",
                  "x-enum-casing-exempt": true,
                  "enum": [
                    "User",
                    "Organization"
                  ]
                }
              }
            }
          },
          "installationsVerifiedAt": {
            "type": "string",
            "format": "date-time",
            "description": "When `installations` was last verified with GitHub."
          },
          "snapshotPaths": {
            "type": "array",
            "description": "Per-repository snapshot path preferences.",
            "items": {
              "type": "object",
              "additionalProperties": {
                "type": "string"
              }
            }
          }
        }
      },
      "GithubInstallation": {
        "type": "object",
        "description": "One verified GitHub App installation.",
        "required": [
          "id"
        ],
        "properties": {
          "id": {
            "type": "string",
            "description": "GitHub App installation id.",
            "x-id-format": "external",
            "pattern": "^[1-9][0-9]*$"
          },
          "account": {
            "type": "string",
            "description": "Login of the account the App is installed on.",
            "maxLength": 255
          },
          "accountType": {
            "type": "string",
            "description": "Type of the account the App is installed on, as GitHub names it.",
            "x-enum-casing-exempt": true,
            "enum": [
              "User",
              "Organization"
            ]
          }
        }
      }
    }
  }
};

export default GithubSchema;
