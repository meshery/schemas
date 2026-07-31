/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const SystemSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "System API",
    "description": "OpenAPI schema for Meshery server operational endpoints.",
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
      "name": "System",
      "description": "Operational endpoints for Meshery Server."
    }
  ],
  "paths": {
    "/api/system/database": {
      "get": {
        "x-internal": [
          "meshery"
        ],
        "tags": [
          "System"
        ],
        "summary": "Get a summary of the Meshery server's database",
        "description": "Returns a paginated summary of Meshery database tables and row counts.",
        "operationId": "getSystemDatabase",
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "description": "Zero-based page index for the table list.",
            "required": false,
            "schema": {
              "type": "integer",
              "minimum": 0
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "description": "Number of tables to include per page.",
            "required": false,
            "schema": {
              "type": "integer",
              "minimum": 1
            }
          },
          {
            "name": "search",
            "in": "query",
            "description": "Substring filter applied to table names.",
            "required": false,
            "schema": {
              "type": "string",
              "maxLength": 255
            }
          },
          {
            "name": "sort",
            "in": "query",
            "description": "Column to order the table list by.",
            "required": false,
            "schema": {
              "type": "string",
              "enum": [
                "name"
              ]
            }
          },
          {
            "name": "order",
            "in": "query",
            "description": "Sort direction for the `sort` column.",
            "required": false,
            "schema": {
              "type": "string",
              "enum": [
                "asc",
                "desc"
              ]
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Database summary",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated summary of the Meshery server's embedded database.",
                  "additionalProperties": false,
                  "required": [
                    "page",
                    "pageSize",
                    "totalTables",
                    "recordCount",
                    "tables"
                  ],
                  "properties": {
                    "page": {
                      "type": "integer",
                      "description": "Zero-based page index of the returned table slice.",
                      "minimum": 0
                    },
                    "pageSize": {
                      "type": "integer",
                      "description": "Number of tables included in this page.",
                      "minimum": 1
                    },
                    "totalTables": {
                      "type": "integer",
                      "description": "Total number of tables in the database matching the search filter.",
                      "minimum": 0
                    },
                    "recordCount": {
                      "type": "integer",
                      "description": "Aggregate row count across the tables returned in this page.",
                      "minimum": 0
                    },
                    "tables": {
                      "type": "array",
                      "description": "Tables included in this page, with per-table row counts.",
                      "items": {
                        "type": "object",
                        "description": "Database table summary.",
                        "additionalProperties": false,
                        "required": [
                          "name",
                          "type",
                          "count"
                        ],
                        "properties": {
                          "name": {
                            "type": "string",
                            "description": "Name of the table.",
                            "maxLength": 255
                          },
                          "type": {
                            "type": "string",
                            "description": "SQLite object type (e.g. `table`).",
                            "maxLength": 64
                          },
                          "count": {
                            "type": "integer",
                            "description": "Number of rows currently in the table.",
                            "format": "int64",
                            "minimum": 0
                          }
                        }
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
          "500": {
            "description": "Internal server error"
          }
        }
      }
    },
    "/api/system/database/reset": {
      "delete": {
        "x-internal": [
          "meshery"
        ],
        "tags": [
          "System"
        ],
        "summary": "Reset the Meshery server's database",
        "description": "Resets the Meshery server database. This is a destructive operation.",
        "operationId": "resetSystemDatabase",
        "responses": {
          "200": {
            "description": "Database reset",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Status message response.",
                  "additionalProperties": false,
                  "required": [
                    "message"
                  ],
                  "properties": {
                    "message": {
                      "type": "string",
                      "description": "Human-readable status message.",
                      "minLength": 1,
                      "maxLength": 1024
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
          "500": {
            "description": "Internal server error during reset (archive, drop, migrate, or reseed)."
          }
        }
      }
    },
    "/api/system/version": {
      "get": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "System"
        ],
        "summary": "Get the running Meshery server's version metadata",
        "description": "Returns version metadata for the running Meshery service.",
        "operationId": "getSystemVersion",
        "security": [],
        "responses": {
          "200": {
            "description": "Server version metadata",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Version metadata for a running Meshery service.",
                  "additionalProperties": false,
                  "properties": {
                    "version": {
                      "type": "string",
                      "description": "Meshery Cloud deployment version.",
                      "maxLength": 128
                    },
                    "build": {
                      "type": "string",
                      "description": "Build identifier (typically the git tag of the running binary).",
                      "maxLength": 128
                    },
                    "latest": {
                      "type": "string",
                      "description": "Latest available Meshery release tag fetched from GitHub.",
                      "maxLength": 128
                    },
                    "outdated": {
                      "type": "boolean",
                      "description": "True when the running build is older than the latest available release."
                    },
                    "commitsha": {
                      "type": "string",
                      "description": "Git commit SHA of the running service. The wire field is `commitsha`.",
                      "maxLength": 64
                    },
                    "releaseChannel": {
                      "type": "string",
                      "description": "Release channel of the running binary (e.g. `stable`, `edge`).",
                      "maxLength": 64
                    }
                  }
                }
              }
            }
          },
          "500": {
            "description": "Encoding error while serializing the version payload."
          }
        }
      }
    },
    "/api/system/email/test": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "System"
        ],
        "summary": "Send a test email",
        "description": "Sends a test email through the configured SMTP provider to verify the email configuration. Restricted to provider administrators.",
        "operationId": "sendTestEmail",
        "requestBody": {
          "description": "Recipient and optional subject for the test email.",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Request body for sending a test email through the configured SMTP provider.",
                "additionalProperties": false,
                "required": [
                  "to"
                ],
                "properties": {
                  "to": {
                    "type": "string",
                    "description": "Recipient email address for the test message.",
                    "format": "email",
                    "maxLength": 320
                  },
                  "subject": {
                    "type": "string",
                    "description": "Subject line for the test message. A default subject is used when omitted.",
                    "maxLength": 998,
                    "x-oapi-codegen-extra-tags": {
                      "json": "subject,omitempty"
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Test email sent",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Result of a test email send attempt.",
                  "additionalProperties": false,
                  "required": [
                    "status",
                    "message",
                    "timestamp",
                    "sentTo"
                  ],
                  "properties": {
                    "status": {
                      "type": "string",
                      "description": "Outcome status of the send attempt (e.g. `success`).",
                      "maxLength": 64
                    },
                    "message": {
                      "type": "string",
                      "description": "Human-readable result message.",
                      "maxLength": 1024
                    },
                    "timestamp": {
                      "type": "string",
                      "description": "Unix-epoch seconds, as a decimal string, when the test email was sent.",
                      "pattern": "^[0-9]+$",
                      "maxLength": 20
                    },
                    "sentTo": {
                      "type": "string",
                      "description": "Recipient address the test email was sent to.",
                      "format": "email",
                      "maxLength": 320
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Invalid request payload or malformed recipient email address."
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
            "description": "Email configuration validation failed or the send attempt errored."
          }
        }
      }
    },
    "/api/system/kubernetes": {
      "post": {
        "x-internal": [
          "meshery"
        ],
        "tags": [
          "System"
        ],
        "summary": "Import a kubeconfig",
        "description": "Uploads a kubeconfig and registers each discovered context as a Kubernetes connection. Unreachable contexts are still registered as discovered connections; reachability only gates the transition to connected. The optional `contexts` and `selectedContexts` form fields scope and configure the import.",
        "operationId": "addKubernetesConfig",
        "requestBody": {
          "required": true,
          "content": {
            "multipart/form-data": {
              "schema": {
                "type": "object",
                "description": "Multipart form payload for importing a kubeconfig. `contexts` and `selectedContexts` are JSON-encoded strings because they travel as multipart form fields alongside the file.",
                "additionalProperties": false,
                "required": [
                  "k8sfile"
                ],
                "properties": {
                  "k8sfile": {
                    "type": "string",
                    "format": "binary",
                    "description": "Kubeconfig file contents."
                  },
                  "contexts": {
                    "type": "string",
                    "description": "JSON-encoded object mapping a discovered context ID to per-context import options, e.g. `{\"<contextId>\": {\"meshsyncDeploymentMode\": \"operator\", \"name\": \"my-cluster\"}}`. `meshsyncDeploymentMode` selects how MeshSync runs for the resulting connection; `name` overrides the connection name.",
                    "maxLength": 1048576
                  },
                  "selectedContexts": {
                    "type": "string",
                    "description": "JSON-encoded array of discovered context IDs to import. When absent, every context discovered in the kubeconfig is imported.",
                    "maxLength": 1048576
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Discovered contexts bucketed by import outcome.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Discovered kubeconfig contexts bucketed by import outcome. Every bucket is always present (empty when no context landed in it).",
                  "additionalProperties": false,
                  "required": [
                    "registeredContexts",
                    "connectedContexts",
                    "ignoredContexts",
                    "erroredContexts"
                  ],
                  "properties": {
                    "registeredContexts": {
                      "type": "array",
                      "description": "Contexts newly registered as discovered connections.",
                      "items": {
                        "type": "object",
                        "description": "Kubernetes-specific authentication context projected from a kubernetes connection and its credential. Connection metadata supplies the context identity (id, name, server, version, deployment type, instance and server IDs); the credential secret supplies the auth and cluster material. This is a response projection, not a stored table row.",
                        "properties": {
                          "id": {
                            "type": "string",
                            "description": "Stable identifier of the Kubernetes context, assigned when the context is registered. Not a UUID; carried in connection metadata.",
                            "x-id-format": "external",
                            "maxLength": 255,
                            "x-go-name": "ID",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "id,omitempty"
                            }
                          },
                          "name": {
                            "type": "string",
                            "description": "Human-readable name of the Kubernetes context.",
                            "maxLength": 255,
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "name,omitempty"
                            }
                          },
                          "auth": {
                            "type": "object",
                            "description": "Authentication material for the context (token or kubeconfig reference), sourced from the connection's credential secret.",
                            "x-go-type": "core.Map",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "auth,omitempty"
                            }
                          },
                          "cluster": {
                            "type": "object",
                            "description": "Cluster definition for the context (certificate authority and server details), sourced from the connection's credential secret.",
                            "x-go-type": "core.Map",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "cluster,omitempty"
                            }
                          },
                          "server": {
                            "type": "string",
                            "description": "API server URL of the Kubernetes cluster.",
                            "maxLength": 2048,
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "server,omitempty"
                            }
                          },
                          "owner": {
                            "description": "ID of the user who owns the underlying connection.",
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
                          "createdBy": {
                            "description": "ID of the user who registered the context.",
                            "x-oapi-codegen-extra-tags": {
                              "json": "createdBy,omitempty"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "mesheryInstanceId": {
                            "description": "ID of the Meshery instance the context is registered with.",
                            "x-go-name": "MesheryInstanceID",
                            "x-oapi-codegen-extra-tags": {
                              "json": "mesheryInstanceId,omitempty"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "kubernetesServerId": {
                            "description": "ID of the Kubernetes server associated with the context.",
                            "x-go-name": "KubernetesServerID",
                            "x-oapi-codegen-extra-tags": {
                              "json": "kubernetesServerId,omitempty"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "deploymentType": {
                            "type": "string",
                            "description": "How Meshery is deployed relative to the cluster (e.g. in_cluster, out_of_cluster).",
                            "maxLength": 64,
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "deploymentType"
                            }
                          },
                          "version": {
                            "type": "string",
                            "description": "Kubernetes server version of the cluster.",
                            "maxLength": 64,
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "version"
                            }
                          },
                          "createdAt": {
                            "type": "string",
                            "description": "Timestamp when the underlying connection was created.",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "createdAt,omitempty"
                            }
                          },
                          "updatedAt": {
                            "type": "string",
                            "description": "Timestamp when the underlying connection was last updated.",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "updatedAt,omitempty"
                            }
                          },
                          "connectionId": {
                            "description": "ID of the connection this context was projected from.",
                            "x-go-name": "ConnectionID",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "connectionId,omitempty"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "reachable": {
                            "description": "Whether this context's API server answered the probe run while its kubeconfig was processed. Discovery and import surface unreachable contexts too, so they can still be registered; reachability only gates the connected transition.",
                            "x-go-type": "bool",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "reachable"
                            },
                            "type": "boolean"
                          }
                        }
                      }
                    },
                    "connectedContexts": {
                      "type": "array",
                      "description": "Contexts whose connection already exists in (or transitioned to) the connected state.",
                      "items": {
                        "type": "object",
                        "description": "Kubernetes-specific authentication context projected from a kubernetes connection and its credential. Connection metadata supplies the context identity (id, name, server, version, deployment type, instance and server IDs); the credential secret supplies the auth and cluster material. This is a response projection, not a stored table row.",
                        "properties": {
                          "id": {
                            "type": "string",
                            "description": "Stable identifier of the Kubernetes context, assigned when the context is registered. Not a UUID; carried in connection metadata.",
                            "x-id-format": "external",
                            "maxLength": 255,
                            "x-go-name": "ID",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "id,omitempty"
                            }
                          },
                          "name": {
                            "type": "string",
                            "description": "Human-readable name of the Kubernetes context.",
                            "maxLength": 255,
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "name,omitempty"
                            }
                          },
                          "auth": {
                            "type": "object",
                            "description": "Authentication material for the context (token or kubeconfig reference), sourced from the connection's credential secret.",
                            "x-go-type": "core.Map",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "auth,omitempty"
                            }
                          },
                          "cluster": {
                            "type": "object",
                            "description": "Cluster definition for the context (certificate authority and server details), sourced from the connection's credential secret.",
                            "x-go-type": "core.Map",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "cluster,omitempty"
                            }
                          },
                          "server": {
                            "type": "string",
                            "description": "API server URL of the Kubernetes cluster.",
                            "maxLength": 2048,
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "server,omitempty"
                            }
                          },
                          "owner": {
                            "description": "ID of the user who owns the underlying connection.",
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
                          "createdBy": {
                            "description": "ID of the user who registered the context.",
                            "x-oapi-codegen-extra-tags": {
                              "json": "createdBy,omitempty"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "mesheryInstanceId": {
                            "description": "ID of the Meshery instance the context is registered with.",
                            "x-go-name": "MesheryInstanceID",
                            "x-oapi-codegen-extra-tags": {
                              "json": "mesheryInstanceId,omitempty"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "kubernetesServerId": {
                            "description": "ID of the Kubernetes server associated with the context.",
                            "x-go-name": "KubernetesServerID",
                            "x-oapi-codegen-extra-tags": {
                              "json": "kubernetesServerId,omitempty"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "deploymentType": {
                            "type": "string",
                            "description": "How Meshery is deployed relative to the cluster (e.g. in_cluster, out_of_cluster).",
                            "maxLength": 64,
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "deploymentType"
                            }
                          },
                          "version": {
                            "type": "string",
                            "description": "Kubernetes server version of the cluster.",
                            "maxLength": 64,
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "version"
                            }
                          },
                          "createdAt": {
                            "type": "string",
                            "description": "Timestamp when the underlying connection was created.",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "createdAt,omitempty"
                            }
                          },
                          "updatedAt": {
                            "type": "string",
                            "description": "Timestamp when the underlying connection was last updated.",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "updatedAt,omitempty"
                            }
                          },
                          "connectionId": {
                            "description": "ID of the connection this context was projected from.",
                            "x-go-name": "ConnectionID",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "connectionId,omitempty"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "reachable": {
                            "description": "Whether this context's API server answered the probe run while its kubeconfig was processed. Discovery and import surface unreachable contexts too, so they can still be registered; reachability only gates the connected transition.",
                            "x-go-type": "bool",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "reachable"
                            },
                            "type": "boolean"
                          }
                        }
                      }
                    },
                    "ignoredContexts": {
                      "type": "array",
                      "description": "Contexts whose connection is in the ignored state.",
                      "items": {
                        "type": "object",
                        "description": "Kubernetes-specific authentication context projected from a kubernetes connection and its credential. Connection metadata supplies the context identity (id, name, server, version, deployment type, instance and server IDs); the credential secret supplies the auth and cluster material. This is a response projection, not a stored table row.",
                        "properties": {
                          "id": {
                            "type": "string",
                            "description": "Stable identifier of the Kubernetes context, assigned when the context is registered. Not a UUID; carried in connection metadata.",
                            "x-id-format": "external",
                            "maxLength": 255,
                            "x-go-name": "ID",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "id,omitempty"
                            }
                          },
                          "name": {
                            "type": "string",
                            "description": "Human-readable name of the Kubernetes context.",
                            "maxLength": 255,
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "name,omitempty"
                            }
                          },
                          "auth": {
                            "type": "object",
                            "description": "Authentication material for the context (token or kubeconfig reference), sourced from the connection's credential secret.",
                            "x-go-type": "core.Map",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "auth,omitempty"
                            }
                          },
                          "cluster": {
                            "type": "object",
                            "description": "Cluster definition for the context (certificate authority and server details), sourced from the connection's credential secret.",
                            "x-go-type": "core.Map",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "cluster,omitempty"
                            }
                          },
                          "server": {
                            "type": "string",
                            "description": "API server URL of the Kubernetes cluster.",
                            "maxLength": 2048,
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "server,omitempty"
                            }
                          },
                          "owner": {
                            "description": "ID of the user who owns the underlying connection.",
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
                          "createdBy": {
                            "description": "ID of the user who registered the context.",
                            "x-oapi-codegen-extra-tags": {
                              "json": "createdBy,omitempty"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "mesheryInstanceId": {
                            "description": "ID of the Meshery instance the context is registered with.",
                            "x-go-name": "MesheryInstanceID",
                            "x-oapi-codegen-extra-tags": {
                              "json": "mesheryInstanceId,omitempty"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "kubernetesServerId": {
                            "description": "ID of the Kubernetes server associated with the context.",
                            "x-go-name": "KubernetesServerID",
                            "x-oapi-codegen-extra-tags": {
                              "json": "kubernetesServerId,omitempty"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "deploymentType": {
                            "type": "string",
                            "description": "How Meshery is deployed relative to the cluster (e.g. in_cluster, out_of_cluster).",
                            "maxLength": 64,
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "deploymentType"
                            }
                          },
                          "version": {
                            "type": "string",
                            "description": "Kubernetes server version of the cluster.",
                            "maxLength": 64,
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "version"
                            }
                          },
                          "createdAt": {
                            "type": "string",
                            "description": "Timestamp when the underlying connection was created.",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "createdAt,omitempty"
                            }
                          },
                          "updatedAt": {
                            "type": "string",
                            "description": "Timestamp when the underlying connection was last updated.",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "updatedAt,omitempty"
                            }
                          },
                          "connectionId": {
                            "description": "ID of the connection this context was projected from.",
                            "x-go-name": "ConnectionID",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "connectionId,omitempty"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "reachable": {
                            "description": "Whether this context's API server answered the probe run while its kubeconfig was processed. Discovery and import surface unreachable contexts too, so they can still be registered; reachability only gates the connected transition.",
                            "x-go-type": "bool",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "reachable"
                            },
                            "type": "boolean"
                          }
                        }
                      }
                    },
                    "erroredContexts": {
                      "type": "array",
                      "description": "Contexts that could not be saved as connections. The failure detail is recorded in the emitted event's metadata, not on the context object.",
                      "items": {
                        "type": "object",
                        "description": "Kubernetes-specific authentication context projected from a kubernetes connection and its credential. Connection metadata supplies the context identity (id, name, server, version, deployment type, instance and server IDs); the credential secret supplies the auth and cluster material. This is a response projection, not a stored table row.",
                        "properties": {
                          "id": {
                            "type": "string",
                            "description": "Stable identifier of the Kubernetes context, assigned when the context is registered. Not a UUID; carried in connection metadata.",
                            "x-id-format": "external",
                            "maxLength": 255,
                            "x-go-name": "ID",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "id,omitempty"
                            }
                          },
                          "name": {
                            "type": "string",
                            "description": "Human-readable name of the Kubernetes context.",
                            "maxLength": 255,
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "name,omitempty"
                            }
                          },
                          "auth": {
                            "type": "object",
                            "description": "Authentication material for the context (token or kubeconfig reference), sourced from the connection's credential secret.",
                            "x-go-type": "core.Map",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "auth,omitempty"
                            }
                          },
                          "cluster": {
                            "type": "object",
                            "description": "Cluster definition for the context (certificate authority and server details), sourced from the connection's credential secret.",
                            "x-go-type": "core.Map",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "cluster,omitempty"
                            }
                          },
                          "server": {
                            "type": "string",
                            "description": "API server URL of the Kubernetes cluster.",
                            "maxLength": 2048,
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "server,omitempty"
                            }
                          },
                          "owner": {
                            "description": "ID of the user who owns the underlying connection.",
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
                          "createdBy": {
                            "description": "ID of the user who registered the context.",
                            "x-oapi-codegen-extra-tags": {
                              "json": "createdBy,omitempty"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "mesheryInstanceId": {
                            "description": "ID of the Meshery instance the context is registered with.",
                            "x-go-name": "MesheryInstanceID",
                            "x-oapi-codegen-extra-tags": {
                              "json": "mesheryInstanceId,omitempty"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "kubernetesServerId": {
                            "description": "ID of the Kubernetes server associated with the context.",
                            "x-go-name": "KubernetesServerID",
                            "x-oapi-codegen-extra-tags": {
                              "json": "kubernetesServerId,omitempty"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "deploymentType": {
                            "type": "string",
                            "description": "How Meshery is deployed relative to the cluster (e.g. in_cluster, out_of_cluster).",
                            "maxLength": 64,
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "deploymentType"
                            }
                          },
                          "version": {
                            "type": "string",
                            "description": "Kubernetes server version of the cluster.",
                            "maxLength": 64,
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "version"
                            }
                          },
                          "createdAt": {
                            "type": "string",
                            "description": "Timestamp when the underlying connection was created.",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "createdAt,omitempty"
                            }
                          },
                          "updatedAt": {
                            "type": "string",
                            "description": "Timestamp when the underlying connection was last updated.",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "updatedAt,omitempty"
                            }
                          },
                          "connectionId": {
                            "description": "ID of the connection this context was projected from.",
                            "x-go-name": "ConnectionID",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "connectionId,omitempty"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "reachable": {
                            "description": "Whether this context's API server answered the probe run while its kubeconfig was processed. Discovery and import surface unreachable contexts too, so they can still be registered; reachability only gates the connected transition.",
                            "x-go-type": "bool",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "reachable"
                            },
                            "type": "boolean"
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
            "description": "Missing or unparsable kubeconfig, or malformed `contexts` / `selectedContexts` JSON."
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
            "description": "Failed to retrieve the user token from the request context."
          }
        }
      }
    },
    "/api/system/kubernetes/contexts": {
      "post": {
        "x-internal": [
          "meshery"
        ],
        "tags": [
          "System"
        ],
        "summary": "Discover kubeconfig contexts",
        "description": "Parses an uploaded kubeconfig and returns its contexts - including unreachable ones, flagged via `reachable` - without persisting any connection. Lets a client present the discovered contexts for selection before importing them.",
        "operationId": "discoverKubernetesContexts",
        "requestBody": {
          "required": true,
          "content": {
            "multipart/form-data": {
              "schema": {
                "type": "object",
                "description": "Multipart form payload for kubeconfig context discovery.",
                "additionalProperties": false,
                "required": [
                  "k8sfile"
                ],
                "properties": {
                  "k8sfile": {
                    "type": "string",
                    "format": "binary",
                    "description": "Kubeconfig file contents."
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Contexts discovered in the uploaded kubeconfig.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "description": "Kubernetes-specific authentication context projected from a kubernetes connection and its credential. Connection metadata supplies the context identity (id, name, server, version, deployment type, instance and server IDs); the credential secret supplies the auth and cluster material. This is a response projection, not a stored table row.",
                    "properties": {
                      "id": {
                        "type": "string",
                        "description": "Stable identifier of the Kubernetes context, assigned when the context is registered. Not a UUID; carried in connection metadata.",
                        "x-id-format": "external",
                        "maxLength": 255,
                        "x-go-name": "ID",
                        "x-go-type-skip-optional-pointer": true,
                        "x-oapi-codegen-extra-tags": {
                          "json": "id,omitempty"
                        }
                      },
                      "name": {
                        "type": "string",
                        "description": "Human-readable name of the Kubernetes context.",
                        "maxLength": 255,
                        "x-go-type-skip-optional-pointer": true,
                        "x-oapi-codegen-extra-tags": {
                          "json": "name,omitempty"
                        }
                      },
                      "auth": {
                        "type": "object",
                        "description": "Authentication material for the context (token or kubeconfig reference), sourced from the connection's credential secret.",
                        "x-go-type": "core.Map",
                        "x-go-type-import": {
                          "path": "github.com/meshery/schemas/models/core"
                        },
                        "x-go-type-skip-optional-pointer": true,
                        "x-oapi-codegen-extra-tags": {
                          "json": "auth,omitempty"
                        }
                      },
                      "cluster": {
                        "type": "object",
                        "description": "Cluster definition for the context (certificate authority and server details), sourced from the connection's credential secret.",
                        "x-go-type": "core.Map",
                        "x-go-type-import": {
                          "path": "github.com/meshery/schemas/models/core"
                        },
                        "x-go-type-skip-optional-pointer": true,
                        "x-oapi-codegen-extra-tags": {
                          "json": "cluster,omitempty"
                        }
                      },
                      "server": {
                        "type": "string",
                        "description": "API server URL of the Kubernetes cluster.",
                        "maxLength": 2048,
                        "x-go-type-skip-optional-pointer": true,
                        "x-oapi-codegen-extra-tags": {
                          "json": "server,omitempty"
                        }
                      },
                      "owner": {
                        "description": "ID of the user who owns the underlying connection.",
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
                      "createdBy": {
                        "description": "ID of the user who registered the context.",
                        "x-oapi-codegen-extra-tags": {
                          "json": "createdBy,omitempty"
                        },
                        "type": "string",
                        "format": "uuid",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        }
                      },
                      "mesheryInstanceId": {
                        "description": "ID of the Meshery instance the context is registered with.",
                        "x-go-name": "MesheryInstanceID",
                        "x-oapi-codegen-extra-tags": {
                          "json": "mesheryInstanceId,omitempty"
                        },
                        "type": "string",
                        "format": "uuid",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        }
                      },
                      "kubernetesServerId": {
                        "description": "ID of the Kubernetes server associated with the context.",
                        "x-go-name": "KubernetesServerID",
                        "x-oapi-codegen-extra-tags": {
                          "json": "kubernetesServerId,omitempty"
                        },
                        "type": "string",
                        "format": "uuid",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        }
                      },
                      "deploymentType": {
                        "type": "string",
                        "description": "How Meshery is deployed relative to the cluster (e.g. in_cluster, out_of_cluster).",
                        "maxLength": 64,
                        "x-go-type-skip-optional-pointer": true,
                        "x-oapi-codegen-extra-tags": {
                          "json": "deploymentType"
                        }
                      },
                      "version": {
                        "type": "string",
                        "description": "Kubernetes server version of the cluster.",
                        "maxLength": 64,
                        "x-go-type-skip-optional-pointer": true,
                        "x-oapi-codegen-extra-tags": {
                          "json": "version"
                        }
                      },
                      "createdAt": {
                        "type": "string",
                        "description": "Timestamp when the underlying connection was created.",
                        "format": "date-time",
                        "x-go-type-skip-optional-pointer": true,
                        "x-oapi-codegen-extra-tags": {
                          "json": "createdAt,omitempty"
                        }
                      },
                      "updatedAt": {
                        "type": "string",
                        "description": "Timestamp when the underlying connection was last updated.",
                        "format": "date-time",
                        "x-go-type-skip-optional-pointer": true,
                        "x-oapi-codegen-extra-tags": {
                          "json": "updatedAt,omitempty"
                        }
                      },
                      "connectionId": {
                        "description": "ID of the connection this context was projected from.",
                        "x-go-name": "ConnectionID",
                        "x-go-type-skip-optional-pointer": true,
                        "x-oapi-codegen-extra-tags": {
                          "json": "connectionId,omitempty"
                        },
                        "type": "string",
                        "format": "uuid",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        }
                      },
                      "reachable": {
                        "description": "Whether this context's API server answered the probe run while its kubeconfig was processed. Discovery and import surface unreachable contexts too, so they can still be registered; reachability only gates the connected transition.",
                        "x-go-type": "bool",
                        "x-go-type-skip-optional-pointer": true,
                        "x-oapi-codegen-extra-tags": {
                          "json": "reachable"
                        },
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Missing or unparsable kubeconfig."
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
            "description": "Failed to retrieve the provider token for the request."
          }
        }
      }
    },
    "/api/system/kubernetes/ping": {
      "get": {
        "x-internal": [
          "meshery"
        ],
        "tags": [
          "System"
        ],
        "summary": "Ping a Kubernetes connection",
        "description": "Verifies connectivity to the Kubernetes cluster behind a connection by fetching the API server version.",
        "operationId": "pingKubernetes",
        "parameters": [
          {
            "name": "connectionId",
            "in": "query",
            "required": true,
            "description": "ID of the Kubernetes connection whose cluster to ping.",
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
            "description": "Cluster is reachable.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Result of pinging a Kubernetes connection's API server.",
                  "additionalProperties": false,
                  "required": [
                    "server_version"
                  ],
                  "properties": {
                    "server_version": {
                      "type": "string",
                      "description": "Version string reported by the cluster's API server. The wire field is `server_version` - this endpoint's published wire casing predates the camelCase convention and is preserved within this API version.",
                      "maxLength": 128
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Missing `connectionId` query parameter, or the stored kubeconfig is invalid."
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
          "404": {
            "description": "No Kubernetes context found for the given connection ID."
          },
          "500": {
            "description": "Failed to reach the cluster or fetch its server version."
          }
        }
      }
    },
    "/api/system/sync": {
      "get": {
        "x-internal": [
          "meshery"
        ],
        "tags": [
          "System"
        ],
        "summary": "Get initial session bootstrap data",
        "description": "Returns session bootstrap data for the authenticated user.",
        "operationId": "getSystemSync",
        "responses": {
          "200": {
            "description": "Session sync payload",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Session bootstrap payload for the authenticated user.",
                  "additionalProperties": true,
                  "properties": {
                    "k8sConfig": {
                      "type": "array",
                      "description": "Kubernetes contexts currently tracked by the Meshery server.",
                      "items": {
                        "type": "object",
                        "description": "Kubernetes context tracked by Meshery.",
                        "additionalProperties": false,
                        "properties": {
                          "id": {
                            "type": "string",
                            "description": "Stable identifier for the Kubernetes context.",
                            "x-id-format": "external",
                            "minLength": 32,
                            "maxLength": 32,
                            "pattern": "^[0-9a-f]{32}$"
                          },
                          "name": {
                            "type": "string",
                            "description": "Human-readable name of the Kubernetes context.",
                            "maxLength": 255
                          },
                          "clusterConfigured": {
                            "type": "boolean",
                            "description": "True when Meshery has a usable kubeconfig for this context."
                          },
                          "server": {
                            "type": "string",
                            "description": "API server URL for the Kubernetes context.",
                            "maxLength": 2048
                          },
                          "clusterId": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "createdAt": {
                            "description": "When the context was first registered with Meshery.",
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
                            "description": "When the context was last updated.",
                            "x-go-type": "time.Time",
                            "type": "string",
                            "format": "date-time",
                            "x-go-name": "UpdatedAt",
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "yaml": "updated_at"
                            },
                            "x-go-type-skip-optional-pointer": true
                          }
                        }
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
          "500": {
            "description": "Marshal error while serializing the session sync payload."
          }
        }
      }
    },
    "/api/system/controllers/operator/status": {
      "get": {
        "x-internal": [
          "meshery"
        ],
        "tags": [
          "System"
        ],
        "summary": "Get the Meshery Operator status for a connection",
        "description": "Returns the current status of the Meshery Operator controller for the given kubernetes connection. Replaces the getOperatorStatus GraphQL query.",
        "operationId": "getOperatorControllerStatus",
        "parameters": [
          {
            "name": "connectionId",
            "in": "query",
            "description": "The kubernetes connection ID whose operator status is requested.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Operator controller status",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Status of a single Meshery controller (operator, MeshSync, or broker) for a kubernetes connection. Element type of the controller-status SSE stream and the operator status response.",
                  "additionalProperties": false,
                  "required": [
                    "connectionId",
                    "controller",
                    "status",
                    "version"
                  ],
                  "properties": {
                    "connectionId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "controller": {
                      "type": "string",
                      "description": "The controller this status describes.",
                      "enum": [
                        "OPERATOR",
                        "MESHSYNC",
                        "BROKER"
                      ]
                    },
                    "status": {
                      "type": "string",
                      "x-go-type": "ControllerStatusValue",
                      "description": "Current controller status.",
                      "x-enum-casing-exempt": true,
                      "enum": [
                        "DEPLOYED",
                        "NOTDEPLOYED",
                        "DEPLOYING",
                        "UNKOWN",
                        "UNDEPLOYED",
                        "ENABLED",
                        "RUNNING",
                        "CONNECTED"
                      ]
                    },
                    "version": {
                      "type": "string",
                      "description": "Deployed controller version, when known.",
                      "maxLength": 255
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
          "500": {
            "description": "Internal server error while resolving controller status."
          }
        }
      }
    },
    "/api/system/controllers/meshsync/status": {
      "get": {
        "x-internal": [
          "meshery"
        ],
        "tags": [
          "System"
        ],
        "summary": "Get the MeshSync controller status for a connection",
        "description": "Returns the current status of the MeshSync controller for the given kubernetes connection. Replaces the getMeshsyncStatus GraphQL query.",
        "operationId": "getMeshsyncControllerStatus",
        "parameters": [
          {
            "name": "connectionId",
            "in": "query",
            "description": "The kubernetes connection ID whose MeshSync status is requested.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "MeshSync controller status",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Detailed status of a named Meshery controller (MeshSync or Broker) for a kubernetes connection.",
                  "additionalProperties": false,
                  "required": [
                    "name",
                    "version",
                    "status",
                    "connectionId"
                  ],
                  "properties": {
                    "name": {
                      "type": "string",
                      "description": "Controller name (e.g. MeshSync, MesheryBroker).",
                      "maxLength": 255
                    },
                    "version": {
                      "type": "string",
                      "description": "Deployed controller version, when known.",
                      "maxLength": 255
                    },
                    "status": {
                      "type": "string",
                      "description": "Current controller status. May be composed, e.g. \"Connected <endpoint>\".",
                      "maxLength": 1024
                    },
                    "connectionId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
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
          "500": {
            "description": "Internal server error while resolving controller status."
          }
        }
      }
    },
    "/api/system/controllers/broker/status": {
      "get": {
        "x-internal": [
          "meshery"
        ],
        "tags": [
          "System"
        ],
        "summary": "Get the Meshery Broker (NATS) controller status for a connection",
        "description": "Returns the current status of the Meshery Broker (NATS) controller for the given kubernetes connection. Replaces the getNatsStatus GraphQL query.",
        "operationId": "getBrokerControllerStatus",
        "parameters": [
          {
            "name": "connectionId",
            "in": "query",
            "description": "The kubernetes connection ID whose broker status is requested.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Broker controller status",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Detailed status of a named Meshery controller (MeshSync or Broker) for a kubernetes connection.",
                  "additionalProperties": false,
                  "required": [
                    "name",
                    "version",
                    "status",
                    "connectionId"
                  ],
                  "properties": {
                    "name": {
                      "type": "string",
                      "description": "Controller name (e.g. MeshSync, MesheryBroker).",
                      "maxLength": 255
                    },
                    "version": {
                      "type": "string",
                      "description": "Deployed controller version, when known.",
                      "maxLength": 255
                    },
                    "status": {
                      "type": "string",
                      "description": "Current controller status. May be composed, e.g. \"Connected <endpoint>\".",
                      "maxLength": 1024
                    },
                    "connectionId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
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
          "500": {
            "description": "Internal server error while resolving controller status."
          }
        }
      }
    },
    "/api/system/controllers/diagnostics": {
      "get": {
        "x-internal": [
          "meshery"
        ],
        "tags": [
          "System"
        ],
        "summary": "Get controller diagnostics and remediation for a connection",
        "description": "Returns human-actionable diagnostics for a kubernetes connection's Meshery controllers (operator, MeshSync, broker), derived from their current status and Meshery's live broker connection. Each diagnostic carries a severity, a summary, an explanation, and concrete remediation steps so the UI can render a \"Diagnostics\" section in the connection detail view. An empty diagnostics list (with healthy=true) means no problems were detected.",
        "operationId": "getControllerDiagnostics",
        "parameters": [
          {
            "name": "connectionId",
            "in": "query",
            "description": "The kubernetes connection ID whose diagnostics are requested.",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Connection controller diagnostics",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Diagnostics for a kubernetes connection's Meshery controllers, for rendering a \"Diagnostics\" section in the connection detail view.",
                  "additionalProperties": false,
                  "required": [
                    "connectionId",
                    "healthy",
                    "diagnostics"
                  ],
                  "properties": {
                    "connectionId": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "healthy": {
                      "type": "boolean",
                      "description": "True when no warning/error diagnostics were detected (informational diagnostics do not affect health)."
                    },
                    "diagnostics": {
                      "type": "array",
                      "description": "The diagnostics detected for this connection (possibly empty).",
                      "items": {
                        "type": "object",
                        "description": "A single human-actionable diagnostic about a kubernetes connection's Meshery controllers, with an explanation and remediation steps.",
                        "additionalProperties": false,
                        "required": [
                          "severity",
                          "code",
                          "summary"
                        ],
                        "properties": {
                          "severity": {
                            "type": "string",
                            "description": "How serious the diagnostic is.",
                            "enum": [
                              "info",
                              "warning",
                              "error"
                            ]
                          },
                          "controller": {
                            "type": "string",
                            "description": "The controller this diagnostic concerns, when applicable.",
                            "enum": [
                              "OPERATOR",
                              "MESHSYNC",
                              "BROKER"
                            ],
                            "x-oapi-codegen-extra-tags": {
                              "json": "controller,omitempty"
                            }
                          },
                          "code": {
                            "type": "string",
                            "description": "Stable machine-readable code for this diagnostic (e.g. `broker_unreachable`), for the UI to key on.",
                            "maxLength": 128
                          },
                          "summary": {
                            "type": "string",
                            "description": "Short, human-readable title for the diagnostic.",
                            "maxLength": 255
                          },
                          "description": {
                            "type": "string",
                            "description": "A fuller explanation of what is wrong and why.",
                            "maxLength": 2048,
                            "x-oapi-codegen-extra-tags": {
                              "json": "description,omitempty"
                            }
                          },
                          "remediation": {
                            "type": "array",
                            "description": "Ordered, concrete steps the user can take to resolve the issue.",
                            "items": {
                              "type": "string",
                              "maxLength": 1024
                            },
                            "x-oapi-codegen-extra-tags": {
                              "json": "remediation,omitempty"
                            }
                          },
                          "endpoint": {
                            "type": "string",
                            "description": "A relevant endpoint for the diagnostic, when applicable (e.g. the broker's published address the user needs to make reachable).",
                            "maxLength": 512,
                            "x-oapi-codegen-extra-tags": {
                              "json": "endpoint,omitempty"
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
            "description": "Internal server error while resolving controller diagnostics."
          }
        }
      }
    },
    "/api/system/controllers/status/subscribe": {
      "get": {
        "x-internal": [
          "meshery"
        ],
        "tags": [
          "System"
        ],
        "summary": "Stream Meshery controller status over Server-Sent Events",
        "description": "Server-Sent Events (SSE) stream of controller status (operator, MeshSync, broker) for the requested kubernetes connections. Replaces the subscribeMesheryControllersStatus GraphQL subscription. The server emits the full status array as an unnamed SSE event (`data: <json>` followed by a blank line) on subscribe and again whenever any controller's status changes; a comment keepalive is sent periodically. Consume with a native EventSource, not a buffered JSON client.",
        "operationId": "subscribeControllersStatus",
        "parameters": [
          {
            "name": "connectionIds",
            "in": "query",
            "description": "Kubernetes connection IDs to watch. Repeatable (connectionIds=<id>&connectionIds=<id>).",
            "required": false,
            "schema": {
              "type": "array",
              "items": {
                "type": "string",
                "format": "uuid"
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "An open text/event-stream of controller status snapshots.",
            "content": {
              "text/event-stream": {
                "schema": {
                  "type": "string",
                  "description": "SSE frames. Each `data:` line is a JSON array of ControllerStatus items."
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
      "EmailTestRequest": {
        "type": "object",
        "description": "Request body for sending a test email through the configured SMTP provider.",
        "additionalProperties": false,
        "required": [
          "to"
        ],
        "properties": {
          "to": {
            "type": "string",
            "description": "Recipient email address for the test message.",
            "format": "email",
            "maxLength": 320
          },
          "subject": {
            "type": "string",
            "description": "Subject line for the test message. A default subject is used when omitted.",
            "maxLength": 998,
            "x-oapi-codegen-extra-tags": {
              "json": "subject,omitempty"
            }
          }
        }
      },
      "EmailTestResponse": {
        "type": "object",
        "description": "Result of a test email send attempt.",
        "additionalProperties": false,
        "required": [
          "status",
          "message",
          "timestamp",
          "sentTo"
        ],
        "properties": {
          "status": {
            "type": "string",
            "description": "Outcome status of the send attempt (e.g. `success`).",
            "maxLength": 64
          },
          "message": {
            "type": "string",
            "description": "Human-readable result message.",
            "maxLength": 1024
          },
          "timestamp": {
            "type": "string",
            "description": "Unix-epoch seconds, as a decimal string, when the test email was sent.",
            "pattern": "^[0-9]+$",
            "maxLength": 20
          },
          "sentTo": {
            "type": "string",
            "description": "Recipient address the test email was sent to.",
            "format": "email",
            "maxLength": 320
          }
        }
      },
      "SystemMessageResponse": {
        "type": "object",
        "description": "Status message response.",
        "additionalProperties": false,
        "required": [
          "message"
        ],
        "properties": {
          "message": {
            "type": "string",
            "description": "Human-readable status message.",
            "minLength": 1,
            "maxLength": 1024
          }
        }
      },
      "ControllerStatusValue": {
        "type": "string",
        "description": "Current status of a single Meshery controller (operator, MeshSync, or broker). Mirrors the MesheryControllerStatus GraphQL enum (server/internal/graphql/schema/schema.graphql) during the ongoing migration of controller-status consumers from GraphQL to this REST API; the literal values (including the published \"UNKOWN\" spelling) are load-bearing and must not be changed independently of that enum.",
        "x-enum-casing-exempt": true,
        "enum": [
          "DEPLOYED",
          "NOTDEPLOYED",
          "DEPLOYING",
          "UNKOWN",
          "UNDEPLOYED",
          "ENABLED",
          "RUNNING",
          "CONNECTED"
        ]
      },
      "ControllerStatus": {
        "type": "object",
        "description": "Status of a single Meshery controller (operator, MeshSync, or broker) for a kubernetes connection. Element type of the controller-status SSE stream and the operator status response.",
        "additionalProperties": false,
        "required": [
          "connectionId",
          "controller",
          "status",
          "version"
        ],
        "properties": {
          "connectionId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "controller": {
            "type": "string",
            "description": "The controller this status describes.",
            "enum": [
              "OPERATOR",
              "MESHSYNC",
              "BROKER"
            ]
          },
          "status": {
            "type": "string",
            "x-go-type": "ControllerStatusValue",
            "description": "Current controller status.",
            "x-enum-casing-exempt": true,
            "enum": [
              "DEPLOYED",
              "NOTDEPLOYED",
              "DEPLOYING",
              "UNKOWN",
              "UNDEPLOYED",
              "ENABLED",
              "RUNNING",
              "CONNECTED"
            ]
          },
          "version": {
            "type": "string",
            "description": "Deployed controller version, when known.",
            "maxLength": 255
          }
        }
      },
      "ControllerInfo": {
        "type": "object",
        "description": "Detailed status of a named Meshery controller (MeshSync or Broker) for a kubernetes connection.",
        "additionalProperties": false,
        "required": [
          "name",
          "version",
          "status",
          "connectionId"
        ],
        "properties": {
          "name": {
            "type": "string",
            "description": "Controller name (e.g. MeshSync, MesheryBroker).",
            "maxLength": 255
          },
          "version": {
            "type": "string",
            "description": "Deployed controller version, when known.",
            "maxLength": 255
          },
          "status": {
            "type": "string",
            "description": "Current controller status. May be composed, e.g. \"Connected <endpoint>\".",
            "maxLength": 1024
          },
          "connectionId": {
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
      "ControllerDiagnostic": {
        "type": "object",
        "description": "A single human-actionable diagnostic about a kubernetes connection's Meshery controllers, with an explanation and remediation steps.",
        "additionalProperties": false,
        "required": [
          "severity",
          "code",
          "summary"
        ],
        "properties": {
          "severity": {
            "type": "string",
            "description": "How serious the diagnostic is.",
            "enum": [
              "info",
              "warning",
              "error"
            ]
          },
          "controller": {
            "type": "string",
            "description": "The controller this diagnostic concerns, when applicable.",
            "enum": [
              "OPERATOR",
              "MESHSYNC",
              "BROKER"
            ],
            "x-oapi-codegen-extra-tags": {
              "json": "controller,omitempty"
            }
          },
          "code": {
            "type": "string",
            "description": "Stable machine-readable code for this diagnostic (e.g. `broker_unreachable`), for the UI to key on.",
            "maxLength": 128
          },
          "summary": {
            "type": "string",
            "description": "Short, human-readable title for the diagnostic.",
            "maxLength": 255
          },
          "description": {
            "type": "string",
            "description": "A fuller explanation of what is wrong and why.",
            "maxLength": 2048,
            "x-oapi-codegen-extra-tags": {
              "json": "description,omitempty"
            }
          },
          "remediation": {
            "type": "array",
            "description": "Ordered, concrete steps the user can take to resolve the issue.",
            "items": {
              "type": "string",
              "maxLength": 1024
            },
            "x-oapi-codegen-extra-tags": {
              "json": "remediation,omitempty"
            }
          },
          "endpoint": {
            "type": "string",
            "description": "A relevant endpoint for the diagnostic, when applicable (e.g. the broker's published address the user needs to make reachable).",
            "maxLength": 512,
            "x-oapi-codegen-extra-tags": {
              "json": "endpoint,omitempty"
            }
          }
        }
      },
      "ConnectionDiagnostics": {
        "type": "object",
        "description": "Diagnostics for a kubernetes connection's Meshery controllers, for rendering a \"Diagnostics\" section in the connection detail view.",
        "additionalProperties": false,
        "required": [
          "connectionId",
          "healthy",
          "diagnostics"
        ],
        "properties": {
          "connectionId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "healthy": {
            "type": "boolean",
            "description": "True when no warning/error diagnostics were detected (informational diagnostics do not affect health)."
          },
          "diagnostics": {
            "type": "array",
            "description": "The diagnostics detected for this connection (possibly empty).",
            "items": {
              "type": "object",
              "description": "A single human-actionable diagnostic about a kubernetes connection's Meshery controllers, with an explanation and remediation steps.",
              "additionalProperties": false,
              "required": [
                "severity",
                "code",
                "summary"
              ],
              "properties": {
                "severity": {
                  "type": "string",
                  "description": "How serious the diagnostic is.",
                  "enum": [
                    "info",
                    "warning",
                    "error"
                  ]
                },
                "controller": {
                  "type": "string",
                  "description": "The controller this diagnostic concerns, when applicable.",
                  "enum": [
                    "OPERATOR",
                    "MESHSYNC",
                    "BROKER"
                  ],
                  "x-oapi-codegen-extra-tags": {
                    "json": "controller,omitempty"
                  }
                },
                "code": {
                  "type": "string",
                  "description": "Stable machine-readable code for this diagnostic (e.g. `broker_unreachable`), for the UI to key on.",
                  "maxLength": 128
                },
                "summary": {
                  "type": "string",
                  "description": "Short, human-readable title for the diagnostic.",
                  "maxLength": 255
                },
                "description": {
                  "type": "string",
                  "description": "A fuller explanation of what is wrong and why.",
                  "maxLength": 2048,
                  "x-oapi-codegen-extra-tags": {
                    "json": "description,omitempty"
                  }
                },
                "remediation": {
                  "type": "array",
                  "description": "Ordered, concrete steps the user can take to resolve the issue.",
                  "items": {
                    "type": "string",
                    "maxLength": 1024
                  },
                  "x-oapi-codegen-extra-tags": {
                    "json": "remediation,omitempty"
                  }
                },
                "endpoint": {
                  "type": "string",
                  "description": "A relevant endpoint for the diagnostic, when applicable (e.g. the broker's published address the user needs to make reachable).",
                  "maxLength": 512,
                  "x-oapi-codegen-extra-tags": {
                    "json": "endpoint,omitempty"
                  }
                }
              }
            }
          }
        }
      },
      "SystemDatabaseTable": {
        "type": "object",
        "description": "Database table summary.",
        "additionalProperties": false,
        "required": [
          "name",
          "type",
          "count"
        ],
        "properties": {
          "name": {
            "type": "string",
            "description": "Name of the table.",
            "maxLength": 255
          },
          "type": {
            "type": "string",
            "description": "SQLite object type (e.g. `table`).",
            "maxLength": 64
          },
          "count": {
            "type": "integer",
            "description": "Number of rows currently in the table.",
            "format": "int64",
            "minimum": 0
          }
        }
      },
      "SystemDatabaseSummary": {
        "type": "object",
        "description": "Paginated summary of the Meshery server's embedded database.",
        "additionalProperties": false,
        "required": [
          "page",
          "pageSize",
          "totalTables",
          "recordCount",
          "tables"
        ],
        "properties": {
          "page": {
            "type": "integer",
            "description": "Zero-based page index of the returned table slice.",
            "minimum": 0
          },
          "pageSize": {
            "type": "integer",
            "description": "Number of tables included in this page.",
            "minimum": 1
          },
          "totalTables": {
            "type": "integer",
            "description": "Total number of tables in the database matching the search filter.",
            "minimum": 0
          },
          "recordCount": {
            "type": "integer",
            "description": "Aggregate row count across the tables returned in this page.",
            "minimum": 0
          },
          "tables": {
            "type": "array",
            "description": "Tables included in this page, with per-table row counts.",
            "items": {
              "type": "object",
              "description": "Database table summary.",
              "additionalProperties": false,
              "required": [
                "name",
                "type",
                "count"
              ],
              "properties": {
                "name": {
                  "type": "string",
                  "description": "Name of the table.",
                  "maxLength": 255
                },
                "type": {
                  "type": "string",
                  "description": "SQLite object type (e.g. `table`).",
                  "maxLength": 64
                },
                "count": {
                  "type": "integer",
                  "description": "Number of rows currently in the table.",
                  "format": "int64",
                  "minimum": 0
                }
              }
            }
          }
        }
      },
      "SystemVersion": {
        "type": "object",
        "description": "Version metadata for a running Meshery service.",
        "additionalProperties": false,
        "properties": {
          "version": {
            "type": "string",
            "description": "Meshery Cloud deployment version.",
            "maxLength": 128
          },
          "build": {
            "type": "string",
            "description": "Build identifier (typically the git tag of the running binary).",
            "maxLength": 128
          },
          "latest": {
            "type": "string",
            "description": "Latest available Meshery release tag fetched from GitHub.",
            "maxLength": 128
          },
          "outdated": {
            "type": "boolean",
            "description": "True when the running build is older than the latest available release."
          },
          "commitsha": {
            "type": "string",
            "description": "Git commit SHA of the running service. The wire field is `commitsha`.",
            "maxLength": 64
          },
          "releaseChannel": {
            "type": "string",
            "description": "Release channel of the running binary (e.g. `stable`, `edge`).",
            "maxLength": 64
          }
        }
      },
      "SystemSessionSyncK8sContext": {
        "type": "object",
        "description": "Kubernetes context tracked by Meshery.",
        "additionalProperties": false,
        "properties": {
          "id": {
            "type": "string",
            "description": "Stable identifier for the Kubernetes context.",
            "x-id-format": "external",
            "minLength": 32,
            "maxLength": 32,
            "pattern": "^[0-9a-f]{32}$"
          },
          "name": {
            "type": "string",
            "description": "Human-readable name of the Kubernetes context.",
            "maxLength": 255
          },
          "clusterConfigured": {
            "type": "boolean",
            "description": "True when Meshery has a usable kubeconfig for this context."
          },
          "server": {
            "type": "string",
            "description": "API server URL for the Kubernetes context.",
            "maxLength": 2048
          },
          "clusterId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "createdAt": {
            "description": "When the context was first registered with Meshery.",
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
            "description": "When the context was last updated.",
            "x-go-type": "time.Time",
            "type": "string",
            "format": "date-time",
            "x-go-name": "UpdatedAt",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at",
              "yaml": "updated_at"
            },
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "SystemSessionSync": {
        "type": "object",
        "description": "Session bootstrap payload for the authenticated user.",
        "additionalProperties": true,
        "properties": {
          "k8sConfig": {
            "type": "array",
            "description": "Kubernetes contexts currently tracked by the Meshery server.",
            "items": {
              "type": "object",
              "description": "Kubernetes context tracked by Meshery.",
              "additionalProperties": false,
              "properties": {
                "id": {
                  "type": "string",
                  "description": "Stable identifier for the Kubernetes context.",
                  "x-id-format": "external",
                  "minLength": 32,
                  "maxLength": 32,
                  "pattern": "^[0-9a-f]{32}$"
                },
                "name": {
                  "type": "string",
                  "description": "Human-readable name of the Kubernetes context.",
                  "maxLength": 255
                },
                "clusterConfigured": {
                  "type": "boolean",
                  "description": "True when Meshery has a usable kubeconfig for this context."
                },
                "server": {
                  "type": "string",
                  "description": "API server URL for the Kubernetes context.",
                  "maxLength": 2048
                },
                "clusterId": {
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "createdAt": {
                  "description": "When the context was first registered with Meshery.",
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
                  "description": "When the context was last updated.",
                  "x-go-type": "time.Time",
                  "type": "string",
                  "format": "date-time",
                  "x-go-name": "UpdatedAt",
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at",
                    "yaml": "updated_at"
                  },
                  "x-go-type-skip-optional-pointer": true
                }
              }
            }
          }
        }
      },
      "AddKubernetesConfigPayload": {
        "type": "object",
        "description": "Multipart form payload for importing a kubeconfig. `contexts` and `selectedContexts` are JSON-encoded strings because they travel as multipart form fields alongside the file.",
        "additionalProperties": false,
        "required": [
          "k8sfile"
        ],
        "properties": {
          "k8sfile": {
            "type": "string",
            "format": "binary",
            "description": "Kubeconfig file contents."
          },
          "contexts": {
            "type": "string",
            "description": "JSON-encoded object mapping a discovered context ID to per-context import options, e.g. `{\"<contextId>\": {\"meshsyncDeploymentMode\": \"operator\", \"name\": \"my-cluster\"}}`. `meshsyncDeploymentMode` selects how MeshSync runs for the resulting connection; `name` overrides the connection name.",
            "maxLength": 1048576
          },
          "selectedContexts": {
            "type": "string",
            "description": "JSON-encoded array of discovered context IDs to import. When absent, every context discovered in the kubeconfig is imported.",
            "maxLength": 1048576
          }
        }
      },
      "DiscoverKubernetesContextsPayload": {
        "type": "object",
        "description": "Multipart form payload for kubeconfig context discovery.",
        "additionalProperties": false,
        "required": [
          "k8sfile"
        ],
        "properties": {
          "k8sfile": {
            "type": "string",
            "format": "binary",
            "description": "Kubeconfig file contents."
          }
        }
      },
      "AddKubernetesConfigResponse": {
        "type": "object",
        "description": "Discovered kubeconfig contexts bucketed by import outcome. Every bucket is always present (empty when no context landed in it).",
        "additionalProperties": false,
        "required": [
          "registeredContexts",
          "connectedContexts",
          "ignoredContexts",
          "erroredContexts"
        ],
        "properties": {
          "registeredContexts": {
            "type": "array",
            "description": "Contexts newly registered as discovered connections.",
            "items": {
              "type": "object",
              "description": "Kubernetes-specific authentication context projected from a kubernetes connection and its credential. Connection metadata supplies the context identity (id, name, server, version, deployment type, instance and server IDs); the credential secret supplies the auth and cluster material. This is a response projection, not a stored table row.",
              "properties": {
                "id": {
                  "type": "string",
                  "description": "Stable identifier of the Kubernetes context, assigned when the context is registered. Not a UUID; carried in connection metadata.",
                  "x-id-format": "external",
                  "maxLength": 255,
                  "x-go-name": "ID",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "id,omitempty"
                  }
                },
                "name": {
                  "type": "string",
                  "description": "Human-readable name of the Kubernetes context.",
                  "maxLength": 255,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "name,omitempty"
                  }
                },
                "auth": {
                  "type": "object",
                  "description": "Authentication material for the context (token or kubeconfig reference), sourced from the connection's credential secret.",
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "auth,omitempty"
                  }
                },
                "cluster": {
                  "type": "object",
                  "description": "Cluster definition for the context (certificate authority and server details), sourced from the connection's credential secret.",
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "cluster,omitempty"
                  }
                },
                "server": {
                  "type": "string",
                  "description": "API server URL of the Kubernetes cluster.",
                  "maxLength": 2048,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "server,omitempty"
                  }
                },
                "owner": {
                  "description": "ID of the user who owns the underlying connection.",
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
                "createdBy": {
                  "description": "ID of the user who registered the context.",
                  "x-oapi-codegen-extra-tags": {
                    "json": "createdBy,omitempty"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "mesheryInstanceId": {
                  "description": "ID of the Meshery instance the context is registered with.",
                  "x-go-name": "MesheryInstanceID",
                  "x-oapi-codegen-extra-tags": {
                    "json": "mesheryInstanceId,omitempty"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "kubernetesServerId": {
                  "description": "ID of the Kubernetes server associated with the context.",
                  "x-go-name": "KubernetesServerID",
                  "x-oapi-codegen-extra-tags": {
                    "json": "kubernetesServerId,omitempty"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "deploymentType": {
                  "type": "string",
                  "description": "How Meshery is deployed relative to the cluster (e.g. in_cluster, out_of_cluster).",
                  "maxLength": 64,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "deploymentType"
                  }
                },
                "version": {
                  "type": "string",
                  "description": "Kubernetes server version of the cluster.",
                  "maxLength": 64,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "version"
                  }
                },
                "createdAt": {
                  "type": "string",
                  "description": "Timestamp when the underlying connection was created.",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "createdAt,omitempty"
                  }
                },
                "updatedAt": {
                  "type": "string",
                  "description": "Timestamp when the underlying connection was last updated.",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "updatedAt,omitempty"
                  }
                },
                "connectionId": {
                  "description": "ID of the connection this context was projected from.",
                  "x-go-name": "ConnectionID",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "connectionId,omitempty"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "reachable": {
                  "description": "Whether this context's API server answered the probe run while its kubeconfig was processed. Discovery and import surface unreachable contexts too, so they can still be registered; reachability only gates the connected transition.",
                  "x-go-type": "bool",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "reachable"
                  },
                  "type": "boolean"
                }
              }
            }
          },
          "connectedContexts": {
            "type": "array",
            "description": "Contexts whose connection already exists in (or transitioned to) the connected state.",
            "items": {
              "type": "object",
              "description": "Kubernetes-specific authentication context projected from a kubernetes connection and its credential. Connection metadata supplies the context identity (id, name, server, version, deployment type, instance and server IDs); the credential secret supplies the auth and cluster material. This is a response projection, not a stored table row.",
              "properties": {
                "id": {
                  "type": "string",
                  "description": "Stable identifier of the Kubernetes context, assigned when the context is registered. Not a UUID; carried in connection metadata.",
                  "x-id-format": "external",
                  "maxLength": 255,
                  "x-go-name": "ID",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "id,omitempty"
                  }
                },
                "name": {
                  "type": "string",
                  "description": "Human-readable name of the Kubernetes context.",
                  "maxLength": 255,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "name,omitempty"
                  }
                },
                "auth": {
                  "type": "object",
                  "description": "Authentication material for the context (token or kubeconfig reference), sourced from the connection's credential secret.",
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "auth,omitempty"
                  }
                },
                "cluster": {
                  "type": "object",
                  "description": "Cluster definition for the context (certificate authority and server details), sourced from the connection's credential secret.",
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "cluster,omitempty"
                  }
                },
                "server": {
                  "type": "string",
                  "description": "API server URL of the Kubernetes cluster.",
                  "maxLength": 2048,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "server,omitempty"
                  }
                },
                "owner": {
                  "description": "ID of the user who owns the underlying connection.",
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
                "createdBy": {
                  "description": "ID of the user who registered the context.",
                  "x-oapi-codegen-extra-tags": {
                    "json": "createdBy,omitempty"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "mesheryInstanceId": {
                  "description": "ID of the Meshery instance the context is registered with.",
                  "x-go-name": "MesheryInstanceID",
                  "x-oapi-codegen-extra-tags": {
                    "json": "mesheryInstanceId,omitempty"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "kubernetesServerId": {
                  "description": "ID of the Kubernetes server associated with the context.",
                  "x-go-name": "KubernetesServerID",
                  "x-oapi-codegen-extra-tags": {
                    "json": "kubernetesServerId,omitempty"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "deploymentType": {
                  "type": "string",
                  "description": "How Meshery is deployed relative to the cluster (e.g. in_cluster, out_of_cluster).",
                  "maxLength": 64,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "deploymentType"
                  }
                },
                "version": {
                  "type": "string",
                  "description": "Kubernetes server version of the cluster.",
                  "maxLength": 64,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "version"
                  }
                },
                "createdAt": {
                  "type": "string",
                  "description": "Timestamp when the underlying connection was created.",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "createdAt,omitempty"
                  }
                },
                "updatedAt": {
                  "type": "string",
                  "description": "Timestamp when the underlying connection was last updated.",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "updatedAt,omitempty"
                  }
                },
                "connectionId": {
                  "description": "ID of the connection this context was projected from.",
                  "x-go-name": "ConnectionID",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "connectionId,omitempty"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "reachable": {
                  "description": "Whether this context's API server answered the probe run while its kubeconfig was processed. Discovery and import surface unreachable contexts too, so they can still be registered; reachability only gates the connected transition.",
                  "x-go-type": "bool",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "reachable"
                  },
                  "type": "boolean"
                }
              }
            }
          },
          "ignoredContexts": {
            "type": "array",
            "description": "Contexts whose connection is in the ignored state.",
            "items": {
              "type": "object",
              "description": "Kubernetes-specific authentication context projected from a kubernetes connection and its credential. Connection metadata supplies the context identity (id, name, server, version, deployment type, instance and server IDs); the credential secret supplies the auth and cluster material. This is a response projection, not a stored table row.",
              "properties": {
                "id": {
                  "type": "string",
                  "description": "Stable identifier of the Kubernetes context, assigned when the context is registered. Not a UUID; carried in connection metadata.",
                  "x-id-format": "external",
                  "maxLength": 255,
                  "x-go-name": "ID",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "id,omitempty"
                  }
                },
                "name": {
                  "type": "string",
                  "description": "Human-readable name of the Kubernetes context.",
                  "maxLength": 255,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "name,omitempty"
                  }
                },
                "auth": {
                  "type": "object",
                  "description": "Authentication material for the context (token or kubeconfig reference), sourced from the connection's credential secret.",
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "auth,omitempty"
                  }
                },
                "cluster": {
                  "type": "object",
                  "description": "Cluster definition for the context (certificate authority and server details), sourced from the connection's credential secret.",
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "cluster,omitempty"
                  }
                },
                "server": {
                  "type": "string",
                  "description": "API server URL of the Kubernetes cluster.",
                  "maxLength": 2048,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "server,omitempty"
                  }
                },
                "owner": {
                  "description": "ID of the user who owns the underlying connection.",
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
                "createdBy": {
                  "description": "ID of the user who registered the context.",
                  "x-oapi-codegen-extra-tags": {
                    "json": "createdBy,omitempty"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "mesheryInstanceId": {
                  "description": "ID of the Meshery instance the context is registered with.",
                  "x-go-name": "MesheryInstanceID",
                  "x-oapi-codegen-extra-tags": {
                    "json": "mesheryInstanceId,omitempty"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "kubernetesServerId": {
                  "description": "ID of the Kubernetes server associated with the context.",
                  "x-go-name": "KubernetesServerID",
                  "x-oapi-codegen-extra-tags": {
                    "json": "kubernetesServerId,omitempty"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "deploymentType": {
                  "type": "string",
                  "description": "How Meshery is deployed relative to the cluster (e.g. in_cluster, out_of_cluster).",
                  "maxLength": 64,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "deploymentType"
                  }
                },
                "version": {
                  "type": "string",
                  "description": "Kubernetes server version of the cluster.",
                  "maxLength": 64,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "version"
                  }
                },
                "createdAt": {
                  "type": "string",
                  "description": "Timestamp when the underlying connection was created.",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "createdAt,omitempty"
                  }
                },
                "updatedAt": {
                  "type": "string",
                  "description": "Timestamp when the underlying connection was last updated.",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "updatedAt,omitempty"
                  }
                },
                "connectionId": {
                  "description": "ID of the connection this context was projected from.",
                  "x-go-name": "ConnectionID",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "connectionId,omitempty"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "reachable": {
                  "description": "Whether this context's API server answered the probe run while its kubeconfig was processed. Discovery and import surface unreachable contexts too, so they can still be registered; reachability only gates the connected transition.",
                  "x-go-type": "bool",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "reachable"
                  },
                  "type": "boolean"
                }
              }
            }
          },
          "erroredContexts": {
            "type": "array",
            "description": "Contexts that could not be saved as connections. The failure detail is recorded in the emitted event's metadata, not on the context object.",
            "items": {
              "type": "object",
              "description": "Kubernetes-specific authentication context projected from a kubernetes connection and its credential. Connection metadata supplies the context identity (id, name, server, version, deployment type, instance and server IDs); the credential secret supplies the auth and cluster material. This is a response projection, not a stored table row.",
              "properties": {
                "id": {
                  "type": "string",
                  "description": "Stable identifier of the Kubernetes context, assigned when the context is registered. Not a UUID; carried in connection metadata.",
                  "x-id-format": "external",
                  "maxLength": 255,
                  "x-go-name": "ID",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "id,omitempty"
                  }
                },
                "name": {
                  "type": "string",
                  "description": "Human-readable name of the Kubernetes context.",
                  "maxLength": 255,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "name,omitempty"
                  }
                },
                "auth": {
                  "type": "object",
                  "description": "Authentication material for the context (token or kubeconfig reference), sourced from the connection's credential secret.",
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "auth,omitempty"
                  }
                },
                "cluster": {
                  "type": "object",
                  "description": "Cluster definition for the context (certificate authority and server details), sourced from the connection's credential secret.",
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "cluster,omitempty"
                  }
                },
                "server": {
                  "type": "string",
                  "description": "API server URL of the Kubernetes cluster.",
                  "maxLength": 2048,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "server,omitempty"
                  }
                },
                "owner": {
                  "description": "ID of the user who owns the underlying connection.",
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
                "createdBy": {
                  "description": "ID of the user who registered the context.",
                  "x-oapi-codegen-extra-tags": {
                    "json": "createdBy,omitempty"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "mesheryInstanceId": {
                  "description": "ID of the Meshery instance the context is registered with.",
                  "x-go-name": "MesheryInstanceID",
                  "x-oapi-codegen-extra-tags": {
                    "json": "mesheryInstanceId,omitempty"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "kubernetesServerId": {
                  "description": "ID of the Kubernetes server associated with the context.",
                  "x-go-name": "KubernetesServerID",
                  "x-oapi-codegen-extra-tags": {
                    "json": "kubernetesServerId,omitempty"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "deploymentType": {
                  "type": "string",
                  "description": "How Meshery is deployed relative to the cluster (e.g. in_cluster, out_of_cluster).",
                  "maxLength": 64,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "deploymentType"
                  }
                },
                "version": {
                  "type": "string",
                  "description": "Kubernetes server version of the cluster.",
                  "maxLength": 64,
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "version"
                  }
                },
                "createdAt": {
                  "type": "string",
                  "description": "Timestamp when the underlying connection was created.",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "createdAt,omitempty"
                  }
                },
                "updatedAt": {
                  "type": "string",
                  "description": "Timestamp when the underlying connection was last updated.",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "updatedAt,omitempty"
                  }
                },
                "connectionId": {
                  "description": "ID of the connection this context was projected from.",
                  "x-go-name": "ConnectionID",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "connectionId,omitempty"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "reachable": {
                  "description": "Whether this context's API server answered the probe run while its kubeconfig was processed. Discovery and import surface unreachable contexts too, so they can still be registered; reachability only gates the connected transition.",
                  "x-go-type": "bool",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "reachable"
                  },
                  "type": "boolean"
                }
              }
            }
          }
        }
      },
      "KubernetesPingResponse": {
        "type": "object",
        "description": "Result of pinging a Kubernetes connection's API server.",
        "additionalProperties": false,
        "required": [
          "server_version"
        ],
        "properties": {
          "server_version": {
            "type": "string",
            "description": "Version string reported by the cluster's API server. The wire field is `server_version` - this endpoint's published wire casing predates the camelCase convention and is preserved within this API version.",
            "maxLength": 128
          }
        }
      }
    }
  }
};

export default SystemSchema;
