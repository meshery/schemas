/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const ControllersConfigSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Meshery Controllers Configuration",
    "description": "OpenAPI schema for configuring the Meshery controllers (Meshery Operator, MeshSync, and Meshery Broker) that Meshery Server deploys and manages for each Kubernetes connection. Server-wide defaults apply to every managed cluster; per-connection overrides, stored in connection metadata, take precedence over the server-wide defaults, which in turn take precedence over built-in defaults.",
    "version": "v1alpha1",
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
  "servers": [
    {
      "url": "https://playground.meshery.io",
      "description": "Meshery Playground server URL"
    },
    {
      "url": "http://localhost:9081",
      "description": "Meshery Server URL (controlled via PORT environment variable)"
    }
  ],
  "security": [
    {
      "jwt": []
    }
  ],
  "tags": [
    {
      "name": "controllers",
      "description": "APIs for configuring Meshery Operator, MeshSync, and Meshery Broker."
    }
  ],
  "paths": {
    "/api/system/controllers/config": {
      "get": {
        "x-internal": [
          "meshery"
        ],
        "tags": [
          "controllers"
        ],
        "operationId": "getControllersDefaultConfig",
        "summary": "Get server-wide controllers configuration defaults",
        "description": "Returns the server-wide default configuration for Meshery Operator, MeshSync, and Meshery Broker. These defaults apply to every managed Kubernetes connection that does not override them. Fields that have never been set are absent, meaning the built-in defaults apply.",
        "responses": {
          "200": {
            "description": "Server-wide controllers configuration defaults",
            "content": {
              "application/json": {
                "schema": {
                  "$id": "https://schemas.meshery.io/controllers_config.yaml",
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "MesheryControllersConfig",
                  "description": "Deployment and runtime configuration for the Meshery controllers that manage a Kubernetes connection: Meshery Operator, MeshSync, and Meshery Broker. The same document shape is used at two layers. As a server-wide default it declares how Meshery Server deploys and configures the controllers for every managed cluster. As a per-connection override, stored in the connection's metadata, it overrides the server-wide default for a single connection. Every configuration field is optional: an absent field inherits the value from the next layer (per-connection override, then server-wide default, then built-in default). The only required field is the server-stamped schemaVersion discriminator, which identifies the document revision for future migrations. Learn more at https://docs.meshery.io/concepts/architecture",
                  "additionalProperties": false,
                  "type": "object",
                  "required": [
                    "schemaVersion"
                  ],
                  "properties": {
                    "schemaVersion": {
                      "description": "Specifies the version of the schema used for this configuration document.",
                      "default": "controllers.meshery.io/v1alpha1",
                      "x-order": 0,
                      "x-oapi-codegen-extra-tags": {
                        "json": "schemaVersion"
                      },
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
                    "operator": {
                      "description": "Configuration for the Meshery Operator on the managed cluster.",
                      "x-order": 1,
                      "x-oapi-codegen-extra-tags": {
                        "json": "operator,omitempty"
                      },
                      "type": "object",
                      "additionalProperties": false,
                      "properties": {
                        "deploymentMode": {
                          "type": "string",
                          "description": "How MeshSync is deployed for the connection. \"operator\" installs Meshery Operator into the cluster, which runs MeshSync and Meshery Broker there; \"embedded\" runs MeshSync in-process inside Meshery Server and installs nothing into the cluster.",
                          "enum": [
                            "operator",
                            "embedded"
                          ],
                          "x-order": 1,
                          "x-oapi-codegen-extra-tags": {
                            "json": "deploymentMode,omitempty"
                          }
                        },
                        "version": {
                          "type": "string",
                          "description": "Meshery Operator Helm chart version to deploy. When absent, the operator version tracks the Meshery Server release.",
                          "minLength": 1,
                          "maxLength": 128,
                          "x-order": 2,
                          "x-oapi-codegen-extra-tags": {
                            "json": "version,omitempty"
                          }
                        }
                      }
                    },
                    "meshsync": {
                      "description": "Configuration for the MeshSync agent on the managed cluster.",
                      "x-order": 2,
                      "x-oapi-codegen-extra-tags": {
                        "json": "meshsync,omitempty"
                      },
                      "type": "object",
                      "additionalProperties": false,
                      "properties": {
                        "version": {
                          "type": "string",
                          "description": "MeshSync image tag to run (for example \"v1.0.2\" or \"stable-latest\"). Applies to operator deployment mode only; in embedded mode MeshSync runs at the version compiled into Meshery Server. Secret redaction and broker content deduplication require MeshSync v1.0.2 or newer.",
                          "minLength": 1,
                          "maxLength": 128,
                          "x-order": 1,
                          "x-oapi-codegen-extra-tags": {
                            "json": "version,omitempty"
                          }
                        },
                        "replicas": {
                          "type": "integer",
                          "description": "Number of MeshSync replicas (MeshSync custom resource spec.size). Applies to operator deployment mode only.",
                          "minimum": 1,
                          "maximum": 10,
                          "x-order": 2,
                          "x-oapi-codegen-extra-tags": {
                            "json": "replicas,omitempty"
                          }
                        },
                        "watchList": {
                          "description": "Discovery scope for MeshSync, as a whitelist or a blacklist of Kubernetes resource types.",
                          "x-order": 3,
                          "x-oapi-codegen-extra-tags": {
                            "json": "watchList,omitempty"
                          },
                          "type": "object",
                          "additionalProperties": false,
                          "not": {
                            "required": [
                              "whitelist",
                              "blacklist"
                            ]
                          },
                          "properties": {
                            "whitelist": {
                              "type": "array",
                              "description": "Resource types MeshSync watches, each with the event types to subscribe to. Mutually exclusive with blacklist.",
                              "maxItems": 1000,
                              "items": {
                                "type": "object",
                                "description": "A single watched Kubernetes resource type and the event types MeshSync subscribes to for it.",
                                "additionalProperties": false,
                                "required": [
                                  "resource"
                                ],
                                "properties": {
                                  "resource": {
                                    "type": "string",
                                    "description": "Resource key in \"<plural>.<version>.<group>\" form (for example \"pods.v1.\" for core-group pods or \"deployments.v1.apps\").",
                                    "minLength": 1,
                                    "maxLength": 512,
                                    "pattern": "^[a-z0-9-]+\\.[a-z0-9]+\\.[a-z0-9.-]*$",
                                    "x-go-type-skip-optional-pointer": true,
                                    "x-order": 1,
                                    "x-oapi-codegen-extra-tags": {
                                      "json": "resource"
                                    }
                                  },
                                  "events": {
                                    "type": "array",
                                    "description": "Event types to subscribe to for this resource. Empty or absent subscribes to all event types.",
                                    "maxItems": 3,
                                    "items": {
                                      "type": "string",
                                      "description": "A single Kubernetes watch event type.",
                                      "enum": [
                                        "ADDED",
                                        "MODIFIED",
                                        "DELETED"
                                      ]
                                    },
                                    "x-go-type-skip-optional-pointer": true,
                                    "x-order": 2,
                                    "x-oapi-codegen-extra-tags": {
                                      "json": "events,omitempty"
                                    }
                                  }
                                }
                              },
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 1,
                              "x-oapi-codegen-extra-tags": {
                                "json": "whitelist,omitempty"
                              }
                            },
                            "blacklist": {
                              "type": "array",
                              "description": "Resource types excluded from MeshSync's default discovery scope, in \"<plural>.<version>.<group>\" form (for example \"pods.v1.\" or \"deployments.v1.apps\"). Mutually exclusive with whitelist.",
                              "maxItems": 1000,
                              "items": {
                                "type": "string",
                                "description": "A single resource key in \"<plural>.<version>.<group>\" form.",
                                "minLength": 1,
                                "maxLength": 512,
                                "pattern": "^[a-z0-9-]+\\.[a-z0-9]+\\.[a-z0-9.-]*$"
                              },
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 2,
                              "x-oapi-codegen-extra-tags": {
                                "json": "blacklist,omitempty"
                              }
                            }
                          }
                        },
                        "outputNamespaces": {
                          "type": "array",
                          "description": "Namespaces whose resources MeshSync publishes. Empty or absent publishes resources from all namespaces. Discovery scope is unaffected; this filters only what is published.",
                          "maxItems": 500,
                          "items": {
                            "type": "string",
                            "description": "A single Kubernetes namespace name (DNS-1123 label).",
                            "minLength": 1,
                            "maxLength": 63,
                            "pattern": "^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
                          },
                          "x-go-type-skip-optional-pointer": true,
                          "x-order": 4,
                          "x-oapi-codegen-extra-tags": {
                            "json": "outputNamespaces,omitempty"
                          }
                        },
                        "outputResources": {
                          "type": "array",
                          "description": "Resource types MeshSync publishes (lowercase Kubernetes kinds, for example \"pod\" or \"deployment\"). Empty or absent publishes all discovered resource types. Discovery scope is unaffected; this filters only what is published.",
                          "maxItems": 500,
                          "items": {
                            "type": "string",
                            "description": "A single lowercase Kubernetes resource kind.",
                            "minLength": 1,
                            "maxLength": 128,
                            "pattern": "^[a-z0-9-]+$"
                          },
                          "x-go-type-skip-optional-pointer": true,
                          "x-order": 5,
                          "x-oapi-codegen-extra-tags": {
                            "json": "outputResources,omitempty"
                          }
                        },
                        "redactSecrets": {
                          "type": "boolean",
                          "description": "When true, MeshSync redacts Kubernetes Secret data values (keys are preserved) before publishing. Requires MeshSync v1.0.2 or newer. Off by default; enabling is recommended when Secrets are within the discovery scope.",
                          "x-order": 6,
                          "x-oapi-codegen-extra-tags": {
                            "json": "redactSecrets,omitempty"
                          }
                        },
                        "brokerContentDedup": {
                          "type": "boolean",
                          "description": "When true, MeshSync suppresses byte-identical republishes of a resource to the broker. Requires MeshSync v1.0.2 or newer. Off by default.",
                          "x-order": 7,
                          "x-oapi-codegen-extra-tags": {
                            "json": "brokerContentDedup,omitempty"
                          }
                        },
                        "debugLogging": {
                          "type": "boolean",
                          "description": "When true, MeshSync runs with debug-level logging (DEBUG environment variable).",
                          "x-order": 8,
                          "x-oapi-codegen-extra-tags": {
                            "json": "debugLogging,omitempty"
                          }
                        }
                      }
                    },
                    "broker": {
                      "description": "Configuration for the Meshery Broker (NATS) on the managed cluster.",
                      "x-order": 3,
                      "x-oapi-codegen-extra-tags": {
                        "json": "broker,omitempty"
                      },
                      "type": "object",
                      "additionalProperties": false,
                      "properties": {
                        "version": {
                          "type": "string",
                          "description": "NATS server image tag to run (Broker custom resource spec.version). When absent, the operator's bundled default NATS version is used.",
                          "minLength": 1,
                          "maxLength": 128,
                          "x-order": 1,
                          "x-oapi-codegen-extra-tags": {
                            "json": "version,omitempty"
                          }
                        },
                        "replicas": {
                          "type": "integer",
                          "description": "Number of NATS server replicas (Broker custom resource spec.size).",
                          "minimum": 1,
                          "maximum": 10,
                          "x-order": 2,
                          "x-oapi-codegen-extra-tags": {
                            "json": "replicas,omitempty"
                          }
                        },
                        "service": {
                          "description": "How the broker is exposed on the network. Service changes reconcile in place without restarting broker pods.",
                          "x-order": 3,
                          "x-oapi-codegen-extra-tags": {
                            "json": "service,omitempty"
                          },
                          "type": "object",
                          "additionalProperties": false,
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "Kubernetes Service type for client access. When absent the broker stays cluster-internal (ClusterIP). LoadBalancer acquires a cloud load-balancer address; NodePort exposes the broker on node IPs.",
                              "enum": [
                                "ClusterIP",
                                "NodePort",
                                "LoadBalancer"
                              ],
                              "x-order": 1,
                              "x-oapi-codegen-extra-tags": {
                                "json": "type,omitempty"
                              }
                            },
                            "annotations": {
                              "type": "object",
                              "description": "Annotations merged onto the client Service (cloud load-balancer hints, MetalLB address pools, internal-LB switches).",
                              "additionalProperties": {
                                "type": "string",
                                "description": "A single annotation value.",
                                "maxLength": 4096
                              },
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 2,
                              "x-oapi-codegen-extra-tags": {
                                "json": "annotations,omitempty"
                              }
                            },
                            "loadBalancerClass": {
                              "type": "string",
                              "description": "Load-balancer implementation to use. Valid only when type is LoadBalancer.",
                              "minLength": 1,
                              "maxLength": 253,
                              "x-order": 3,
                              "x-oapi-codegen-extra-tags": {
                                "json": "loadBalancerClass,omitempty"
                              }
                            },
                            "loadBalancerSourceRanges": {
                              "type": "array",
                              "description": "CIDR ranges allowed to reach the broker. Valid only when type is LoadBalancer.",
                              "maxItems": 100,
                              "items": {
                                "type": "string",
                                "description": "A single CIDR range.",
                                "minLength": 1,
                                "maxLength": 64
                              },
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 4,
                              "x-oapi-codegen-extra-tags": {
                                "json": "loadBalancerSourceRanges,omitempty"
                              }
                            },
                            "externalEndpointOverride": {
                              "type": "string",
                              "description": "Pins the advertised external broker endpoint as \"host:port\" when auto-derivation is undesirable: an ingress or gateway in front of the broker, an air-gapped topology, or NAT. The nats:// scheme is added by consumers.",
                              "minLength": 3,
                              "maxLength": 262,
                              "pattern": "^([A-Za-z0-9.-]+|\\[[A-Fa-f0-9:.]+\\]):[0-9]{1,5}$",
                              "x-order": 5,
                              "x-oapi-codegen-extra-tags": {
                                "json": "externalEndpointOverride,omitempty"
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
          "meshery"
        ],
        "tags": [
          "controllers"
        ],
        "operationId": "updateControllersDefaultConfig",
        "summary": "Update server-wide controllers configuration defaults",
        "description": "Persists the server-wide default configuration for Meshery Operator, MeshSync, and Meshery Broker, then re-applies the effective configuration to every connected Kubernetes connection that inherits the changed fields. Absent fields fall back to built-in defaults.",
        "requestBody": {
          "description": "Controllers configuration document. Absent fields inherit from the next precedence layer.",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Client-settable controllers configuration document, used as the body of update requests at both layers (server-wide defaults and per-connection override). Identical to MesheryControllersConfig minus the server-stamped schemaVersion. Every field is optional: an absent field inherits from the next precedence layer, and an empty document clears the layer entirely.",
                "additionalProperties": false,
                "properties": {
                  "operator": {
                    "description": "Configuration for the Meshery Operator on the managed cluster.",
                    "x-order": 1,
                    "x-oapi-codegen-extra-tags": {
                      "json": "operator,omitempty"
                    },
                    "type": "object",
                    "additionalProperties": false,
                    "properties": {
                      "deploymentMode": {
                        "type": "string",
                        "description": "How MeshSync is deployed for the connection. \"operator\" installs Meshery Operator into the cluster, which runs MeshSync and Meshery Broker there; \"embedded\" runs MeshSync in-process inside Meshery Server and installs nothing into the cluster.",
                        "enum": [
                          "operator",
                          "embedded"
                        ],
                        "x-order": 1,
                        "x-oapi-codegen-extra-tags": {
                          "json": "deploymentMode,omitempty"
                        }
                      },
                      "version": {
                        "type": "string",
                        "description": "Meshery Operator Helm chart version to deploy. When absent, the operator version tracks the Meshery Server release.",
                        "minLength": 1,
                        "maxLength": 128,
                        "x-order": 2,
                        "x-oapi-codegen-extra-tags": {
                          "json": "version,omitempty"
                        }
                      }
                    }
                  },
                  "meshsync": {
                    "description": "Configuration for the MeshSync agent on the managed cluster.",
                    "x-order": 2,
                    "x-oapi-codegen-extra-tags": {
                      "json": "meshsync,omitempty"
                    },
                    "type": "object",
                    "additionalProperties": false,
                    "properties": {
                      "version": {
                        "type": "string",
                        "description": "MeshSync image tag to run (for example \"v1.0.2\" or \"stable-latest\"). Applies to operator deployment mode only; in embedded mode MeshSync runs at the version compiled into Meshery Server. Secret redaction and broker content deduplication require MeshSync v1.0.2 or newer.",
                        "minLength": 1,
                        "maxLength": 128,
                        "x-order": 1,
                        "x-oapi-codegen-extra-tags": {
                          "json": "version,omitempty"
                        }
                      },
                      "replicas": {
                        "type": "integer",
                        "description": "Number of MeshSync replicas (MeshSync custom resource spec.size). Applies to operator deployment mode only.",
                        "minimum": 1,
                        "maximum": 10,
                        "x-order": 2,
                        "x-oapi-codegen-extra-tags": {
                          "json": "replicas,omitempty"
                        }
                      },
                      "watchList": {
                        "description": "Discovery scope for MeshSync, as a whitelist or a blacklist of Kubernetes resource types.",
                        "x-order": 3,
                        "x-oapi-codegen-extra-tags": {
                          "json": "watchList,omitempty"
                        },
                        "type": "object",
                        "additionalProperties": false,
                        "not": {
                          "required": [
                            "whitelist",
                            "blacklist"
                          ]
                        },
                        "properties": {
                          "whitelist": {
                            "type": "array",
                            "description": "Resource types MeshSync watches, each with the event types to subscribe to. Mutually exclusive with blacklist.",
                            "maxItems": 1000,
                            "items": {
                              "type": "object",
                              "description": "A single watched Kubernetes resource type and the event types MeshSync subscribes to for it.",
                              "additionalProperties": false,
                              "required": [
                                "resource"
                              ],
                              "properties": {
                                "resource": {
                                  "type": "string",
                                  "description": "Resource key in \"<plural>.<version>.<group>\" form (for example \"pods.v1.\" for core-group pods or \"deployments.v1.apps\").",
                                  "minLength": 1,
                                  "maxLength": 512,
                                  "pattern": "^[a-z0-9-]+\\.[a-z0-9]+\\.[a-z0-9.-]*$",
                                  "x-go-type-skip-optional-pointer": true,
                                  "x-order": 1,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "resource"
                                  }
                                },
                                "events": {
                                  "type": "array",
                                  "description": "Event types to subscribe to for this resource. Empty or absent subscribes to all event types.",
                                  "maxItems": 3,
                                  "items": {
                                    "type": "string",
                                    "description": "A single Kubernetes watch event type.",
                                    "enum": [
                                      "ADDED",
                                      "MODIFIED",
                                      "DELETED"
                                    ]
                                  },
                                  "x-go-type-skip-optional-pointer": true,
                                  "x-order": 2,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "events,omitempty"
                                  }
                                }
                              }
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-order": 1,
                            "x-oapi-codegen-extra-tags": {
                              "json": "whitelist,omitempty"
                            }
                          },
                          "blacklist": {
                            "type": "array",
                            "description": "Resource types excluded from MeshSync's default discovery scope, in \"<plural>.<version>.<group>\" form (for example \"pods.v1.\" or \"deployments.v1.apps\"). Mutually exclusive with whitelist.",
                            "maxItems": 1000,
                            "items": {
                              "type": "string",
                              "description": "A single resource key in \"<plural>.<version>.<group>\" form.",
                              "minLength": 1,
                              "maxLength": 512,
                              "pattern": "^[a-z0-9-]+\\.[a-z0-9]+\\.[a-z0-9.-]*$"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-order": 2,
                            "x-oapi-codegen-extra-tags": {
                              "json": "blacklist,omitempty"
                            }
                          }
                        }
                      },
                      "outputNamespaces": {
                        "type": "array",
                        "description": "Namespaces whose resources MeshSync publishes. Empty or absent publishes resources from all namespaces. Discovery scope is unaffected; this filters only what is published.",
                        "maxItems": 500,
                        "items": {
                          "type": "string",
                          "description": "A single Kubernetes namespace name (DNS-1123 label).",
                          "minLength": 1,
                          "maxLength": 63,
                          "pattern": "^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
                        },
                        "x-go-type-skip-optional-pointer": true,
                        "x-order": 4,
                        "x-oapi-codegen-extra-tags": {
                          "json": "outputNamespaces,omitempty"
                        }
                      },
                      "outputResources": {
                        "type": "array",
                        "description": "Resource types MeshSync publishes (lowercase Kubernetes kinds, for example \"pod\" or \"deployment\"). Empty or absent publishes all discovered resource types. Discovery scope is unaffected; this filters only what is published.",
                        "maxItems": 500,
                        "items": {
                          "type": "string",
                          "description": "A single lowercase Kubernetes resource kind.",
                          "minLength": 1,
                          "maxLength": 128,
                          "pattern": "^[a-z0-9-]+$"
                        },
                        "x-go-type-skip-optional-pointer": true,
                        "x-order": 5,
                        "x-oapi-codegen-extra-tags": {
                          "json": "outputResources,omitempty"
                        }
                      },
                      "redactSecrets": {
                        "type": "boolean",
                        "description": "When true, MeshSync redacts Kubernetes Secret data values (keys are preserved) before publishing. Requires MeshSync v1.0.2 or newer. Off by default; enabling is recommended when Secrets are within the discovery scope.",
                        "x-order": 6,
                        "x-oapi-codegen-extra-tags": {
                          "json": "redactSecrets,omitempty"
                        }
                      },
                      "brokerContentDedup": {
                        "type": "boolean",
                        "description": "When true, MeshSync suppresses byte-identical republishes of a resource to the broker. Requires MeshSync v1.0.2 or newer. Off by default.",
                        "x-order": 7,
                        "x-oapi-codegen-extra-tags": {
                          "json": "brokerContentDedup,omitempty"
                        }
                      },
                      "debugLogging": {
                        "type": "boolean",
                        "description": "When true, MeshSync runs with debug-level logging (DEBUG environment variable).",
                        "x-order": 8,
                        "x-oapi-codegen-extra-tags": {
                          "json": "debugLogging,omitempty"
                        }
                      }
                    }
                  },
                  "broker": {
                    "description": "Configuration for the Meshery Broker (NATS) on the managed cluster.",
                    "x-order": 3,
                    "x-oapi-codegen-extra-tags": {
                      "json": "broker,omitempty"
                    },
                    "type": "object",
                    "additionalProperties": false,
                    "properties": {
                      "version": {
                        "type": "string",
                        "description": "NATS server image tag to run (Broker custom resource spec.version). When absent, the operator's bundled default NATS version is used.",
                        "minLength": 1,
                        "maxLength": 128,
                        "x-order": 1,
                        "x-oapi-codegen-extra-tags": {
                          "json": "version,omitempty"
                        }
                      },
                      "replicas": {
                        "type": "integer",
                        "description": "Number of NATS server replicas (Broker custom resource spec.size).",
                        "minimum": 1,
                        "maximum": 10,
                        "x-order": 2,
                        "x-oapi-codegen-extra-tags": {
                          "json": "replicas,omitempty"
                        }
                      },
                      "service": {
                        "description": "How the broker is exposed on the network. Service changes reconcile in place without restarting broker pods.",
                        "x-order": 3,
                        "x-oapi-codegen-extra-tags": {
                          "json": "service,omitempty"
                        },
                        "type": "object",
                        "additionalProperties": false,
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "Kubernetes Service type for client access. When absent the broker stays cluster-internal (ClusterIP). LoadBalancer acquires a cloud load-balancer address; NodePort exposes the broker on node IPs.",
                            "enum": [
                              "ClusterIP",
                              "NodePort",
                              "LoadBalancer"
                            ],
                            "x-order": 1,
                            "x-oapi-codegen-extra-tags": {
                              "json": "type,omitempty"
                            }
                          },
                          "annotations": {
                            "type": "object",
                            "description": "Annotations merged onto the client Service (cloud load-balancer hints, MetalLB address pools, internal-LB switches).",
                            "additionalProperties": {
                              "type": "string",
                              "description": "A single annotation value.",
                              "maxLength": 4096
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-order": 2,
                            "x-oapi-codegen-extra-tags": {
                              "json": "annotations,omitempty"
                            }
                          },
                          "loadBalancerClass": {
                            "type": "string",
                            "description": "Load-balancer implementation to use. Valid only when type is LoadBalancer.",
                            "minLength": 1,
                            "maxLength": 253,
                            "x-order": 3,
                            "x-oapi-codegen-extra-tags": {
                              "json": "loadBalancerClass,omitempty"
                            }
                          },
                          "loadBalancerSourceRanges": {
                            "type": "array",
                            "description": "CIDR ranges allowed to reach the broker. Valid only when type is LoadBalancer.",
                            "maxItems": 100,
                            "items": {
                              "type": "string",
                              "description": "A single CIDR range.",
                              "minLength": 1,
                              "maxLength": 64
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-order": 4,
                            "x-oapi-codegen-extra-tags": {
                              "json": "loadBalancerSourceRanges,omitempty"
                            }
                          },
                          "externalEndpointOverride": {
                            "type": "string",
                            "description": "Pins the advertised external broker endpoint as \"host:port\" when auto-derivation is undesirable: an ingress or gateway in front of the broker, an air-gapped topology, or NAT. The nats:// scheme is added by consumers.",
                            "minLength": 3,
                            "maxLength": 262,
                            "pattern": "^([A-Za-z0-9.-]+|\\[[A-Fa-f0-9:.]+\\]):[0-9]{1,5}$",
                            "x-order": 5,
                            "x-oapi-codegen-extra-tags": {
                              "json": "externalEndpointOverride,omitempty"
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
        "responses": {
          "200": {
            "description": "Persisted server-wide controllers configuration defaults",
            "content": {
              "application/json": {
                "schema": {
                  "$id": "https://schemas.meshery.io/controllers_config.yaml",
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "MesheryControllersConfig",
                  "description": "Deployment and runtime configuration for the Meshery controllers that manage a Kubernetes connection: Meshery Operator, MeshSync, and Meshery Broker. The same document shape is used at two layers. As a server-wide default it declares how Meshery Server deploys and configures the controllers for every managed cluster. As a per-connection override, stored in the connection's metadata, it overrides the server-wide default for a single connection. Every configuration field is optional: an absent field inherits the value from the next layer (per-connection override, then server-wide default, then built-in default). The only required field is the server-stamped schemaVersion discriminator, which identifies the document revision for future migrations. Learn more at https://docs.meshery.io/concepts/architecture",
                  "additionalProperties": false,
                  "type": "object",
                  "required": [
                    "schemaVersion"
                  ],
                  "properties": {
                    "schemaVersion": {
                      "description": "Specifies the version of the schema used for this configuration document.",
                      "default": "controllers.meshery.io/v1alpha1",
                      "x-order": 0,
                      "x-oapi-codegen-extra-tags": {
                        "json": "schemaVersion"
                      },
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
                    "operator": {
                      "description": "Configuration for the Meshery Operator on the managed cluster.",
                      "x-order": 1,
                      "x-oapi-codegen-extra-tags": {
                        "json": "operator,omitempty"
                      },
                      "type": "object",
                      "additionalProperties": false,
                      "properties": {
                        "deploymentMode": {
                          "type": "string",
                          "description": "How MeshSync is deployed for the connection. \"operator\" installs Meshery Operator into the cluster, which runs MeshSync and Meshery Broker there; \"embedded\" runs MeshSync in-process inside Meshery Server and installs nothing into the cluster.",
                          "enum": [
                            "operator",
                            "embedded"
                          ],
                          "x-order": 1,
                          "x-oapi-codegen-extra-tags": {
                            "json": "deploymentMode,omitempty"
                          }
                        },
                        "version": {
                          "type": "string",
                          "description": "Meshery Operator Helm chart version to deploy. When absent, the operator version tracks the Meshery Server release.",
                          "minLength": 1,
                          "maxLength": 128,
                          "x-order": 2,
                          "x-oapi-codegen-extra-tags": {
                            "json": "version,omitempty"
                          }
                        }
                      }
                    },
                    "meshsync": {
                      "description": "Configuration for the MeshSync agent on the managed cluster.",
                      "x-order": 2,
                      "x-oapi-codegen-extra-tags": {
                        "json": "meshsync,omitempty"
                      },
                      "type": "object",
                      "additionalProperties": false,
                      "properties": {
                        "version": {
                          "type": "string",
                          "description": "MeshSync image tag to run (for example \"v1.0.2\" or \"stable-latest\"). Applies to operator deployment mode only; in embedded mode MeshSync runs at the version compiled into Meshery Server. Secret redaction and broker content deduplication require MeshSync v1.0.2 or newer.",
                          "minLength": 1,
                          "maxLength": 128,
                          "x-order": 1,
                          "x-oapi-codegen-extra-tags": {
                            "json": "version,omitempty"
                          }
                        },
                        "replicas": {
                          "type": "integer",
                          "description": "Number of MeshSync replicas (MeshSync custom resource spec.size). Applies to operator deployment mode only.",
                          "minimum": 1,
                          "maximum": 10,
                          "x-order": 2,
                          "x-oapi-codegen-extra-tags": {
                            "json": "replicas,omitempty"
                          }
                        },
                        "watchList": {
                          "description": "Discovery scope for MeshSync, as a whitelist or a blacklist of Kubernetes resource types.",
                          "x-order": 3,
                          "x-oapi-codegen-extra-tags": {
                            "json": "watchList,omitempty"
                          },
                          "type": "object",
                          "additionalProperties": false,
                          "not": {
                            "required": [
                              "whitelist",
                              "blacklist"
                            ]
                          },
                          "properties": {
                            "whitelist": {
                              "type": "array",
                              "description": "Resource types MeshSync watches, each with the event types to subscribe to. Mutually exclusive with blacklist.",
                              "maxItems": 1000,
                              "items": {
                                "type": "object",
                                "description": "A single watched Kubernetes resource type and the event types MeshSync subscribes to for it.",
                                "additionalProperties": false,
                                "required": [
                                  "resource"
                                ],
                                "properties": {
                                  "resource": {
                                    "type": "string",
                                    "description": "Resource key in \"<plural>.<version>.<group>\" form (for example \"pods.v1.\" for core-group pods or \"deployments.v1.apps\").",
                                    "minLength": 1,
                                    "maxLength": 512,
                                    "pattern": "^[a-z0-9-]+\\.[a-z0-9]+\\.[a-z0-9.-]*$",
                                    "x-go-type-skip-optional-pointer": true,
                                    "x-order": 1,
                                    "x-oapi-codegen-extra-tags": {
                                      "json": "resource"
                                    }
                                  },
                                  "events": {
                                    "type": "array",
                                    "description": "Event types to subscribe to for this resource. Empty or absent subscribes to all event types.",
                                    "maxItems": 3,
                                    "items": {
                                      "type": "string",
                                      "description": "A single Kubernetes watch event type.",
                                      "enum": [
                                        "ADDED",
                                        "MODIFIED",
                                        "DELETED"
                                      ]
                                    },
                                    "x-go-type-skip-optional-pointer": true,
                                    "x-order": 2,
                                    "x-oapi-codegen-extra-tags": {
                                      "json": "events,omitempty"
                                    }
                                  }
                                }
                              },
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 1,
                              "x-oapi-codegen-extra-tags": {
                                "json": "whitelist,omitempty"
                              }
                            },
                            "blacklist": {
                              "type": "array",
                              "description": "Resource types excluded from MeshSync's default discovery scope, in \"<plural>.<version>.<group>\" form (for example \"pods.v1.\" or \"deployments.v1.apps\"). Mutually exclusive with whitelist.",
                              "maxItems": 1000,
                              "items": {
                                "type": "string",
                                "description": "A single resource key in \"<plural>.<version>.<group>\" form.",
                                "minLength": 1,
                                "maxLength": 512,
                                "pattern": "^[a-z0-9-]+\\.[a-z0-9]+\\.[a-z0-9.-]*$"
                              },
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 2,
                              "x-oapi-codegen-extra-tags": {
                                "json": "blacklist,omitempty"
                              }
                            }
                          }
                        },
                        "outputNamespaces": {
                          "type": "array",
                          "description": "Namespaces whose resources MeshSync publishes. Empty or absent publishes resources from all namespaces. Discovery scope is unaffected; this filters only what is published.",
                          "maxItems": 500,
                          "items": {
                            "type": "string",
                            "description": "A single Kubernetes namespace name (DNS-1123 label).",
                            "minLength": 1,
                            "maxLength": 63,
                            "pattern": "^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
                          },
                          "x-go-type-skip-optional-pointer": true,
                          "x-order": 4,
                          "x-oapi-codegen-extra-tags": {
                            "json": "outputNamespaces,omitempty"
                          }
                        },
                        "outputResources": {
                          "type": "array",
                          "description": "Resource types MeshSync publishes (lowercase Kubernetes kinds, for example \"pod\" or \"deployment\"). Empty or absent publishes all discovered resource types. Discovery scope is unaffected; this filters only what is published.",
                          "maxItems": 500,
                          "items": {
                            "type": "string",
                            "description": "A single lowercase Kubernetes resource kind.",
                            "minLength": 1,
                            "maxLength": 128,
                            "pattern": "^[a-z0-9-]+$"
                          },
                          "x-go-type-skip-optional-pointer": true,
                          "x-order": 5,
                          "x-oapi-codegen-extra-tags": {
                            "json": "outputResources,omitempty"
                          }
                        },
                        "redactSecrets": {
                          "type": "boolean",
                          "description": "When true, MeshSync redacts Kubernetes Secret data values (keys are preserved) before publishing. Requires MeshSync v1.0.2 or newer. Off by default; enabling is recommended when Secrets are within the discovery scope.",
                          "x-order": 6,
                          "x-oapi-codegen-extra-tags": {
                            "json": "redactSecrets,omitempty"
                          }
                        },
                        "brokerContentDedup": {
                          "type": "boolean",
                          "description": "When true, MeshSync suppresses byte-identical republishes of a resource to the broker. Requires MeshSync v1.0.2 or newer. Off by default.",
                          "x-order": 7,
                          "x-oapi-codegen-extra-tags": {
                            "json": "brokerContentDedup,omitempty"
                          }
                        },
                        "debugLogging": {
                          "type": "boolean",
                          "description": "When true, MeshSync runs with debug-level logging (DEBUG environment variable).",
                          "x-order": 8,
                          "x-oapi-codegen-extra-tags": {
                            "json": "debugLogging,omitempty"
                          }
                        }
                      }
                    },
                    "broker": {
                      "description": "Configuration for the Meshery Broker (NATS) on the managed cluster.",
                      "x-order": 3,
                      "x-oapi-codegen-extra-tags": {
                        "json": "broker,omitempty"
                      },
                      "type": "object",
                      "additionalProperties": false,
                      "properties": {
                        "version": {
                          "type": "string",
                          "description": "NATS server image tag to run (Broker custom resource spec.version). When absent, the operator's bundled default NATS version is used.",
                          "minLength": 1,
                          "maxLength": 128,
                          "x-order": 1,
                          "x-oapi-codegen-extra-tags": {
                            "json": "version,omitempty"
                          }
                        },
                        "replicas": {
                          "type": "integer",
                          "description": "Number of NATS server replicas (Broker custom resource spec.size).",
                          "minimum": 1,
                          "maximum": 10,
                          "x-order": 2,
                          "x-oapi-codegen-extra-tags": {
                            "json": "replicas,omitempty"
                          }
                        },
                        "service": {
                          "description": "How the broker is exposed on the network. Service changes reconcile in place without restarting broker pods.",
                          "x-order": 3,
                          "x-oapi-codegen-extra-tags": {
                            "json": "service,omitempty"
                          },
                          "type": "object",
                          "additionalProperties": false,
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "Kubernetes Service type for client access. When absent the broker stays cluster-internal (ClusterIP). LoadBalancer acquires a cloud load-balancer address; NodePort exposes the broker on node IPs.",
                              "enum": [
                                "ClusterIP",
                                "NodePort",
                                "LoadBalancer"
                              ],
                              "x-order": 1,
                              "x-oapi-codegen-extra-tags": {
                                "json": "type,omitempty"
                              }
                            },
                            "annotations": {
                              "type": "object",
                              "description": "Annotations merged onto the client Service (cloud load-balancer hints, MetalLB address pools, internal-LB switches).",
                              "additionalProperties": {
                                "type": "string",
                                "description": "A single annotation value.",
                                "maxLength": 4096
                              },
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 2,
                              "x-oapi-codegen-extra-tags": {
                                "json": "annotations,omitempty"
                              }
                            },
                            "loadBalancerClass": {
                              "type": "string",
                              "description": "Load-balancer implementation to use. Valid only when type is LoadBalancer.",
                              "minLength": 1,
                              "maxLength": 253,
                              "x-order": 3,
                              "x-oapi-codegen-extra-tags": {
                                "json": "loadBalancerClass,omitempty"
                              }
                            },
                            "loadBalancerSourceRanges": {
                              "type": "array",
                              "description": "CIDR ranges allowed to reach the broker. Valid only when type is LoadBalancer.",
                              "maxItems": 100,
                              "items": {
                                "type": "string",
                                "description": "A single CIDR range.",
                                "minLength": 1,
                                "maxLength": 64
                              },
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 4,
                              "x-oapi-codegen-extra-tags": {
                                "json": "loadBalancerSourceRanges,omitempty"
                              }
                            },
                            "externalEndpointOverride": {
                              "type": "string",
                              "description": "Pins the advertised external broker endpoint as \"host:port\" when auto-derivation is undesirable: an ingress or gateway in front of the broker, an air-gapped topology, or NAT. The nats:// scheme is added by consumers.",
                              "minLength": 3,
                              "maxLength": 262,
                              "pattern": "^([A-Za-z0-9.-]+|\\[[A-Fa-f0-9:.]+\\]):[0-9]{1,5}$",
                              "x-order": 5,
                              "x-oapi-codegen-extra-tags": {
                                "json": "externalEndpointOverride,omitempty"
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
    "/api/integrations/connections/{connectionId}/controllers/config": {
      "get": {
        "x-internal": [
          "meshery"
        ],
        "tags": [
          "controllers"
        ],
        "operationId": "getConnectionControllersConfig",
        "summary": "Get controllers configuration for a connection",
        "description": "Returns the controllers configuration for a single Kubernetes connection at every layer: the per-connection override stored on the connection, the current server-wide default, and the resolved effective configuration (override, then server default, then built-in default).",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "description": "Kubernetes connection ID.",
            "schema": {
              "type": "string",
              "format": "uuid",
              "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              }
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "Controllers configuration for the connection",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Layered view of the controllers configuration for a single Kubernetes connection. Exposes each precedence layer so clients can indicate, per field, whether the effective value is inherited from the server-wide default or overridden on the connection.",
                  "additionalProperties": false,
                  "required": [
                    "effective"
                  ],
                  "properties": {
                    "override": {
                      "$id": "https://schemas.meshery.io/controllers_config.yaml",
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "title": "MesheryControllersConfig",
                      "description": "Deployment and runtime configuration for the Meshery controllers that manage a Kubernetes connection: Meshery Operator, MeshSync, and Meshery Broker. The same document shape is used at two layers. As a server-wide default it declares how Meshery Server deploys and configures the controllers for every managed cluster. As a per-connection override, stored in the connection's metadata, it overrides the server-wide default for a single connection. Every configuration field is optional: an absent field inherits the value from the next layer (per-connection override, then server-wide default, then built-in default). The only required field is the server-stamped schemaVersion discriminator, which identifies the document revision for future migrations. Learn more at https://docs.meshery.io/concepts/architecture",
                      "additionalProperties": false,
                      "type": "object",
                      "required": [
                        "schemaVersion"
                      ],
                      "properties": {
                        "schemaVersion": {
                          "description": "Specifies the version of the schema used for this configuration document.",
                          "default": "controllers.meshery.io/v1alpha1",
                          "x-order": 0,
                          "x-oapi-codegen-extra-tags": {
                            "json": "schemaVersion"
                          },
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
                        "operator": {
                          "description": "Configuration for the Meshery Operator on the managed cluster.",
                          "x-order": 1,
                          "x-oapi-codegen-extra-tags": {
                            "json": "operator,omitempty"
                          },
                          "type": "object",
                          "additionalProperties": false,
                          "properties": {
                            "deploymentMode": {
                              "type": "string",
                              "description": "How MeshSync is deployed for the connection. \"operator\" installs Meshery Operator into the cluster, which runs MeshSync and Meshery Broker there; \"embedded\" runs MeshSync in-process inside Meshery Server and installs nothing into the cluster.",
                              "enum": [
                                "operator",
                                "embedded"
                              ],
                              "x-order": 1,
                              "x-oapi-codegen-extra-tags": {
                                "json": "deploymentMode,omitempty"
                              }
                            },
                            "version": {
                              "type": "string",
                              "description": "Meshery Operator Helm chart version to deploy. When absent, the operator version tracks the Meshery Server release.",
                              "minLength": 1,
                              "maxLength": 128,
                              "x-order": 2,
                              "x-oapi-codegen-extra-tags": {
                                "json": "version,omitempty"
                              }
                            }
                          }
                        },
                        "meshsync": {
                          "description": "Configuration for the MeshSync agent on the managed cluster.",
                          "x-order": 2,
                          "x-oapi-codegen-extra-tags": {
                            "json": "meshsync,omitempty"
                          },
                          "type": "object",
                          "additionalProperties": false,
                          "properties": {
                            "version": {
                              "type": "string",
                              "description": "MeshSync image tag to run (for example \"v1.0.2\" or \"stable-latest\"). Applies to operator deployment mode only; in embedded mode MeshSync runs at the version compiled into Meshery Server. Secret redaction and broker content deduplication require MeshSync v1.0.2 or newer.",
                              "minLength": 1,
                              "maxLength": 128,
                              "x-order": 1,
                              "x-oapi-codegen-extra-tags": {
                                "json": "version,omitempty"
                              }
                            },
                            "replicas": {
                              "type": "integer",
                              "description": "Number of MeshSync replicas (MeshSync custom resource spec.size). Applies to operator deployment mode only.",
                              "minimum": 1,
                              "maximum": 10,
                              "x-order": 2,
                              "x-oapi-codegen-extra-tags": {
                                "json": "replicas,omitempty"
                              }
                            },
                            "watchList": {
                              "description": "Discovery scope for MeshSync, as a whitelist or a blacklist of Kubernetes resource types.",
                              "x-order": 3,
                              "x-oapi-codegen-extra-tags": {
                                "json": "watchList,omitempty"
                              },
                              "type": "object",
                              "additionalProperties": false,
                              "not": {
                                "required": [
                                  "whitelist",
                                  "blacklist"
                                ]
                              },
                              "properties": {
                                "whitelist": {
                                  "type": "array",
                                  "description": "Resource types MeshSync watches, each with the event types to subscribe to. Mutually exclusive with blacklist.",
                                  "maxItems": 1000,
                                  "items": {
                                    "type": "object",
                                    "description": "A single watched Kubernetes resource type and the event types MeshSync subscribes to for it.",
                                    "additionalProperties": false,
                                    "required": [
                                      "resource"
                                    ],
                                    "properties": {
                                      "resource": {
                                        "type": "string",
                                        "description": "Resource key in \"<plural>.<version>.<group>\" form (for example \"pods.v1.\" for core-group pods or \"deployments.v1.apps\").",
                                        "minLength": 1,
                                        "maxLength": 512,
                                        "pattern": "^[a-z0-9-]+\\.[a-z0-9]+\\.[a-z0-9.-]*$",
                                        "x-go-type-skip-optional-pointer": true,
                                        "x-order": 1,
                                        "x-oapi-codegen-extra-tags": {
                                          "json": "resource"
                                        }
                                      },
                                      "events": {
                                        "type": "array",
                                        "description": "Event types to subscribe to for this resource. Empty or absent subscribes to all event types.",
                                        "maxItems": 3,
                                        "items": {
                                          "type": "string",
                                          "description": "A single Kubernetes watch event type.",
                                          "enum": [
                                            "ADDED",
                                            "MODIFIED",
                                            "DELETED"
                                          ]
                                        },
                                        "x-go-type-skip-optional-pointer": true,
                                        "x-order": 2,
                                        "x-oapi-codegen-extra-tags": {
                                          "json": "events,omitempty"
                                        }
                                      }
                                    }
                                  },
                                  "x-go-type-skip-optional-pointer": true,
                                  "x-order": 1,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "whitelist,omitempty"
                                  }
                                },
                                "blacklist": {
                                  "type": "array",
                                  "description": "Resource types excluded from MeshSync's default discovery scope, in \"<plural>.<version>.<group>\" form (for example \"pods.v1.\" or \"deployments.v1.apps\"). Mutually exclusive with whitelist.",
                                  "maxItems": 1000,
                                  "items": {
                                    "type": "string",
                                    "description": "A single resource key in \"<plural>.<version>.<group>\" form.",
                                    "minLength": 1,
                                    "maxLength": 512,
                                    "pattern": "^[a-z0-9-]+\\.[a-z0-9]+\\.[a-z0-9.-]*$"
                                  },
                                  "x-go-type-skip-optional-pointer": true,
                                  "x-order": 2,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "blacklist,omitempty"
                                  }
                                }
                              }
                            },
                            "outputNamespaces": {
                              "type": "array",
                              "description": "Namespaces whose resources MeshSync publishes. Empty or absent publishes resources from all namespaces. Discovery scope is unaffected; this filters only what is published.",
                              "maxItems": 500,
                              "items": {
                                "type": "string",
                                "description": "A single Kubernetes namespace name (DNS-1123 label).",
                                "minLength": 1,
                                "maxLength": 63,
                                "pattern": "^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
                              },
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 4,
                              "x-oapi-codegen-extra-tags": {
                                "json": "outputNamespaces,omitempty"
                              }
                            },
                            "outputResources": {
                              "type": "array",
                              "description": "Resource types MeshSync publishes (lowercase Kubernetes kinds, for example \"pod\" or \"deployment\"). Empty or absent publishes all discovered resource types. Discovery scope is unaffected; this filters only what is published.",
                              "maxItems": 500,
                              "items": {
                                "type": "string",
                                "description": "A single lowercase Kubernetes resource kind.",
                                "minLength": 1,
                                "maxLength": 128,
                                "pattern": "^[a-z0-9-]+$"
                              },
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 5,
                              "x-oapi-codegen-extra-tags": {
                                "json": "outputResources,omitempty"
                              }
                            },
                            "redactSecrets": {
                              "type": "boolean",
                              "description": "When true, MeshSync redacts Kubernetes Secret data values (keys are preserved) before publishing. Requires MeshSync v1.0.2 or newer. Off by default; enabling is recommended when Secrets are within the discovery scope.",
                              "x-order": 6,
                              "x-oapi-codegen-extra-tags": {
                                "json": "redactSecrets,omitempty"
                              }
                            },
                            "brokerContentDedup": {
                              "type": "boolean",
                              "description": "When true, MeshSync suppresses byte-identical republishes of a resource to the broker. Requires MeshSync v1.0.2 or newer. Off by default.",
                              "x-order": 7,
                              "x-oapi-codegen-extra-tags": {
                                "json": "brokerContentDedup,omitempty"
                              }
                            },
                            "debugLogging": {
                              "type": "boolean",
                              "description": "When true, MeshSync runs with debug-level logging (DEBUG environment variable).",
                              "x-order": 8,
                              "x-oapi-codegen-extra-tags": {
                                "json": "debugLogging,omitempty"
                              }
                            }
                          }
                        },
                        "broker": {
                          "description": "Configuration for the Meshery Broker (NATS) on the managed cluster.",
                          "x-order": 3,
                          "x-oapi-codegen-extra-tags": {
                            "json": "broker,omitempty"
                          },
                          "type": "object",
                          "additionalProperties": false,
                          "properties": {
                            "version": {
                              "type": "string",
                              "description": "NATS server image tag to run (Broker custom resource spec.version). When absent, the operator's bundled default NATS version is used.",
                              "minLength": 1,
                              "maxLength": 128,
                              "x-order": 1,
                              "x-oapi-codegen-extra-tags": {
                                "json": "version,omitempty"
                              }
                            },
                            "replicas": {
                              "type": "integer",
                              "description": "Number of NATS server replicas (Broker custom resource spec.size).",
                              "minimum": 1,
                              "maximum": 10,
                              "x-order": 2,
                              "x-oapi-codegen-extra-tags": {
                                "json": "replicas,omitempty"
                              }
                            },
                            "service": {
                              "description": "How the broker is exposed on the network. Service changes reconcile in place without restarting broker pods.",
                              "x-order": 3,
                              "x-oapi-codegen-extra-tags": {
                                "json": "service,omitempty"
                              },
                              "type": "object",
                              "additionalProperties": false,
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "Kubernetes Service type for client access. When absent the broker stays cluster-internal (ClusterIP). LoadBalancer acquires a cloud load-balancer address; NodePort exposes the broker on node IPs.",
                                  "enum": [
                                    "ClusterIP",
                                    "NodePort",
                                    "LoadBalancer"
                                  ],
                                  "x-order": 1,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "type,omitempty"
                                  }
                                },
                                "annotations": {
                                  "type": "object",
                                  "description": "Annotations merged onto the client Service (cloud load-balancer hints, MetalLB address pools, internal-LB switches).",
                                  "additionalProperties": {
                                    "type": "string",
                                    "description": "A single annotation value.",
                                    "maxLength": 4096
                                  },
                                  "x-go-type-skip-optional-pointer": true,
                                  "x-order": 2,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "annotations,omitempty"
                                  }
                                },
                                "loadBalancerClass": {
                                  "type": "string",
                                  "description": "Load-balancer implementation to use. Valid only when type is LoadBalancer.",
                                  "minLength": 1,
                                  "maxLength": 253,
                                  "x-order": 3,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "loadBalancerClass,omitempty"
                                  }
                                },
                                "loadBalancerSourceRanges": {
                                  "type": "array",
                                  "description": "CIDR ranges allowed to reach the broker. Valid only when type is LoadBalancer.",
                                  "maxItems": 100,
                                  "items": {
                                    "type": "string",
                                    "description": "A single CIDR range.",
                                    "minLength": 1,
                                    "maxLength": 64
                                  },
                                  "x-go-type-skip-optional-pointer": true,
                                  "x-order": 4,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "loadBalancerSourceRanges,omitempty"
                                  }
                                },
                                "externalEndpointOverride": {
                                  "type": "string",
                                  "description": "Pins the advertised external broker endpoint as \"host:port\" when auto-derivation is undesirable: an ingress or gateway in front of the broker, an air-gapped topology, or NAT. The nats:// scheme is added by consumers.",
                                  "minLength": 3,
                                  "maxLength": 262,
                                  "pattern": "^([A-Za-z0-9.-]+|\\[[A-Fa-f0-9:.]+\\]):[0-9]{1,5}$",
                                  "x-order": 5,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "externalEndpointOverride,omitempty"
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      "x-order": 1,
                      "x-oapi-codegen-extra-tags": {
                        "json": "override,omitempty"
                      }
                    },
                    "default": {
                      "$id": "https://schemas.meshery.io/controllers_config.yaml",
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "title": "MesheryControllersConfig",
                      "description": "Deployment and runtime configuration for the Meshery controllers that manage a Kubernetes connection: Meshery Operator, MeshSync, and Meshery Broker. The same document shape is used at two layers. As a server-wide default it declares how Meshery Server deploys and configures the controllers for every managed cluster. As a per-connection override, stored in the connection's metadata, it overrides the server-wide default for a single connection. Every configuration field is optional: an absent field inherits the value from the next layer (per-connection override, then server-wide default, then built-in default). The only required field is the server-stamped schemaVersion discriminator, which identifies the document revision for future migrations. Learn more at https://docs.meshery.io/concepts/architecture",
                      "additionalProperties": false,
                      "type": "object",
                      "required": [
                        "schemaVersion"
                      ],
                      "properties": {
                        "schemaVersion": {
                          "description": "Specifies the version of the schema used for this configuration document.",
                          "default": "controllers.meshery.io/v1alpha1",
                          "x-order": 0,
                          "x-oapi-codegen-extra-tags": {
                            "json": "schemaVersion"
                          },
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
                        "operator": {
                          "description": "Configuration for the Meshery Operator on the managed cluster.",
                          "x-order": 1,
                          "x-oapi-codegen-extra-tags": {
                            "json": "operator,omitempty"
                          },
                          "type": "object",
                          "additionalProperties": false,
                          "properties": {
                            "deploymentMode": {
                              "type": "string",
                              "description": "How MeshSync is deployed for the connection. \"operator\" installs Meshery Operator into the cluster, which runs MeshSync and Meshery Broker there; \"embedded\" runs MeshSync in-process inside Meshery Server and installs nothing into the cluster.",
                              "enum": [
                                "operator",
                                "embedded"
                              ],
                              "x-order": 1,
                              "x-oapi-codegen-extra-tags": {
                                "json": "deploymentMode,omitempty"
                              }
                            },
                            "version": {
                              "type": "string",
                              "description": "Meshery Operator Helm chart version to deploy. When absent, the operator version tracks the Meshery Server release.",
                              "minLength": 1,
                              "maxLength": 128,
                              "x-order": 2,
                              "x-oapi-codegen-extra-tags": {
                                "json": "version,omitempty"
                              }
                            }
                          }
                        },
                        "meshsync": {
                          "description": "Configuration for the MeshSync agent on the managed cluster.",
                          "x-order": 2,
                          "x-oapi-codegen-extra-tags": {
                            "json": "meshsync,omitempty"
                          },
                          "type": "object",
                          "additionalProperties": false,
                          "properties": {
                            "version": {
                              "type": "string",
                              "description": "MeshSync image tag to run (for example \"v1.0.2\" or \"stable-latest\"). Applies to operator deployment mode only; in embedded mode MeshSync runs at the version compiled into Meshery Server. Secret redaction and broker content deduplication require MeshSync v1.0.2 or newer.",
                              "minLength": 1,
                              "maxLength": 128,
                              "x-order": 1,
                              "x-oapi-codegen-extra-tags": {
                                "json": "version,omitempty"
                              }
                            },
                            "replicas": {
                              "type": "integer",
                              "description": "Number of MeshSync replicas (MeshSync custom resource spec.size). Applies to operator deployment mode only.",
                              "minimum": 1,
                              "maximum": 10,
                              "x-order": 2,
                              "x-oapi-codegen-extra-tags": {
                                "json": "replicas,omitempty"
                              }
                            },
                            "watchList": {
                              "description": "Discovery scope for MeshSync, as a whitelist or a blacklist of Kubernetes resource types.",
                              "x-order": 3,
                              "x-oapi-codegen-extra-tags": {
                                "json": "watchList,omitempty"
                              },
                              "type": "object",
                              "additionalProperties": false,
                              "not": {
                                "required": [
                                  "whitelist",
                                  "blacklist"
                                ]
                              },
                              "properties": {
                                "whitelist": {
                                  "type": "array",
                                  "description": "Resource types MeshSync watches, each with the event types to subscribe to. Mutually exclusive with blacklist.",
                                  "maxItems": 1000,
                                  "items": {
                                    "type": "object",
                                    "description": "A single watched Kubernetes resource type and the event types MeshSync subscribes to for it.",
                                    "additionalProperties": false,
                                    "required": [
                                      "resource"
                                    ],
                                    "properties": {
                                      "resource": {
                                        "type": "string",
                                        "description": "Resource key in \"<plural>.<version>.<group>\" form (for example \"pods.v1.\" for core-group pods or \"deployments.v1.apps\").",
                                        "minLength": 1,
                                        "maxLength": 512,
                                        "pattern": "^[a-z0-9-]+\\.[a-z0-9]+\\.[a-z0-9.-]*$",
                                        "x-go-type-skip-optional-pointer": true,
                                        "x-order": 1,
                                        "x-oapi-codegen-extra-tags": {
                                          "json": "resource"
                                        }
                                      },
                                      "events": {
                                        "type": "array",
                                        "description": "Event types to subscribe to for this resource. Empty or absent subscribes to all event types.",
                                        "maxItems": 3,
                                        "items": {
                                          "type": "string",
                                          "description": "A single Kubernetes watch event type.",
                                          "enum": [
                                            "ADDED",
                                            "MODIFIED",
                                            "DELETED"
                                          ]
                                        },
                                        "x-go-type-skip-optional-pointer": true,
                                        "x-order": 2,
                                        "x-oapi-codegen-extra-tags": {
                                          "json": "events,omitempty"
                                        }
                                      }
                                    }
                                  },
                                  "x-go-type-skip-optional-pointer": true,
                                  "x-order": 1,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "whitelist,omitempty"
                                  }
                                },
                                "blacklist": {
                                  "type": "array",
                                  "description": "Resource types excluded from MeshSync's default discovery scope, in \"<plural>.<version>.<group>\" form (for example \"pods.v1.\" or \"deployments.v1.apps\"). Mutually exclusive with whitelist.",
                                  "maxItems": 1000,
                                  "items": {
                                    "type": "string",
                                    "description": "A single resource key in \"<plural>.<version>.<group>\" form.",
                                    "minLength": 1,
                                    "maxLength": 512,
                                    "pattern": "^[a-z0-9-]+\\.[a-z0-9]+\\.[a-z0-9.-]*$"
                                  },
                                  "x-go-type-skip-optional-pointer": true,
                                  "x-order": 2,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "blacklist,omitempty"
                                  }
                                }
                              }
                            },
                            "outputNamespaces": {
                              "type": "array",
                              "description": "Namespaces whose resources MeshSync publishes. Empty or absent publishes resources from all namespaces. Discovery scope is unaffected; this filters only what is published.",
                              "maxItems": 500,
                              "items": {
                                "type": "string",
                                "description": "A single Kubernetes namespace name (DNS-1123 label).",
                                "minLength": 1,
                                "maxLength": 63,
                                "pattern": "^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
                              },
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 4,
                              "x-oapi-codegen-extra-tags": {
                                "json": "outputNamespaces,omitempty"
                              }
                            },
                            "outputResources": {
                              "type": "array",
                              "description": "Resource types MeshSync publishes (lowercase Kubernetes kinds, for example \"pod\" or \"deployment\"). Empty or absent publishes all discovered resource types. Discovery scope is unaffected; this filters only what is published.",
                              "maxItems": 500,
                              "items": {
                                "type": "string",
                                "description": "A single lowercase Kubernetes resource kind.",
                                "minLength": 1,
                                "maxLength": 128,
                                "pattern": "^[a-z0-9-]+$"
                              },
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 5,
                              "x-oapi-codegen-extra-tags": {
                                "json": "outputResources,omitempty"
                              }
                            },
                            "redactSecrets": {
                              "type": "boolean",
                              "description": "When true, MeshSync redacts Kubernetes Secret data values (keys are preserved) before publishing. Requires MeshSync v1.0.2 or newer. Off by default; enabling is recommended when Secrets are within the discovery scope.",
                              "x-order": 6,
                              "x-oapi-codegen-extra-tags": {
                                "json": "redactSecrets,omitempty"
                              }
                            },
                            "brokerContentDedup": {
                              "type": "boolean",
                              "description": "When true, MeshSync suppresses byte-identical republishes of a resource to the broker. Requires MeshSync v1.0.2 or newer. Off by default.",
                              "x-order": 7,
                              "x-oapi-codegen-extra-tags": {
                                "json": "brokerContentDedup,omitempty"
                              }
                            },
                            "debugLogging": {
                              "type": "boolean",
                              "description": "When true, MeshSync runs with debug-level logging (DEBUG environment variable).",
                              "x-order": 8,
                              "x-oapi-codegen-extra-tags": {
                                "json": "debugLogging,omitempty"
                              }
                            }
                          }
                        },
                        "broker": {
                          "description": "Configuration for the Meshery Broker (NATS) on the managed cluster.",
                          "x-order": 3,
                          "x-oapi-codegen-extra-tags": {
                            "json": "broker,omitempty"
                          },
                          "type": "object",
                          "additionalProperties": false,
                          "properties": {
                            "version": {
                              "type": "string",
                              "description": "NATS server image tag to run (Broker custom resource spec.version). When absent, the operator's bundled default NATS version is used.",
                              "minLength": 1,
                              "maxLength": 128,
                              "x-order": 1,
                              "x-oapi-codegen-extra-tags": {
                                "json": "version,omitempty"
                              }
                            },
                            "replicas": {
                              "type": "integer",
                              "description": "Number of NATS server replicas (Broker custom resource spec.size).",
                              "minimum": 1,
                              "maximum": 10,
                              "x-order": 2,
                              "x-oapi-codegen-extra-tags": {
                                "json": "replicas,omitempty"
                              }
                            },
                            "service": {
                              "description": "How the broker is exposed on the network. Service changes reconcile in place without restarting broker pods.",
                              "x-order": 3,
                              "x-oapi-codegen-extra-tags": {
                                "json": "service,omitempty"
                              },
                              "type": "object",
                              "additionalProperties": false,
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "Kubernetes Service type for client access. When absent the broker stays cluster-internal (ClusterIP). LoadBalancer acquires a cloud load-balancer address; NodePort exposes the broker on node IPs.",
                                  "enum": [
                                    "ClusterIP",
                                    "NodePort",
                                    "LoadBalancer"
                                  ],
                                  "x-order": 1,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "type,omitempty"
                                  }
                                },
                                "annotations": {
                                  "type": "object",
                                  "description": "Annotations merged onto the client Service (cloud load-balancer hints, MetalLB address pools, internal-LB switches).",
                                  "additionalProperties": {
                                    "type": "string",
                                    "description": "A single annotation value.",
                                    "maxLength": 4096
                                  },
                                  "x-go-type-skip-optional-pointer": true,
                                  "x-order": 2,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "annotations,omitempty"
                                  }
                                },
                                "loadBalancerClass": {
                                  "type": "string",
                                  "description": "Load-balancer implementation to use. Valid only when type is LoadBalancer.",
                                  "minLength": 1,
                                  "maxLength": 253,
                                  "x-order": 3,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "loadBalancerClass,omitempty"
                                  }
                                },
                                "loadBalancerSourceRanges": {
                                  "type": "array",
                                  "description": "CIDR ranges allowed to reach the broker. Valid only when type is LoadBalancer.",
                                  "maxItems": 100,
                                  "items": {
                                    "type": "string",
                                    "description": "A single CIDR range.",
                                    "minLength": 1,
                                    "maxLength": 64
                                  },
                                  "x-go-type-skip-optional-pointer": true,
                                  "x-order": 4,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "loadBalancerSourceRanges,omitempty"
                                  }
                                },
                                "externalEndpointOverride": {
                                  "type": "string",
                                  "description": "Pins the advertised external broker endpoint as \"host:port\" when auto-derivation is undesirable: an ingress or gateway in front of the broker, an air-gapped topology, or NAT. The nats:// scheme is added by consumers.",
                                  "minLength": 3,
                                  "maxLength": 262,
                                  "pattern": "^([A-Za-z0-9.-]+|\\[[A-Fa-f0-9:.]+\\]):[0-9]{1,5}$",
                                  "x-order": 5,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "externalEndpointOverride,omitempty"
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      "x-order": 2,
                      "x-oapi-codegen-extra-tags": {
                        "json": "default,omitempty"
                      }
                    },
                    "effective": {
                      "$id": "https://schemas.meshery.io/controllers_config.yaml",
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "title": "MesheryControllersConfig",
                      "description": "Deployment and runtime configuration for the Meshery controllers that manage a Kubernetes connection: Meshery Operator, MeshSync, and Meshery Broker. The same document shape is used at two layers. As a server-wide default it declares how Meshery Server deploys and configures the controllers for every managed cluster. As a per-connection override, stored in the connection's metadata, it overrides the server-wide default for a single connection. Every configuration field is optional: an absent field inherits the value from the next layer (per-connection override, then server-wide default, then built-in default). The only required field is the server-stamped schemaVersion discriminator, which identifies the document revision for future migrations. Learn more at https://docs.meshery.io/concepts/architecture",
                      "additionalProperties": false,
                      "type": "object",
                      "required": [
                        "schemaVersion"
                      ],
                      "properties": {
                        "schemaVersion": {
                          "description": "Specifies the version of the schema used for this configuration document.",
                          "default": "controllers.meshery.io/v1alpha1",
                          "x-order": 0,
                          "x-oapi-codegen-extra-tags": {
                            "json": "schemaVersion"
                          },
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
                        "operator": {
                          "description": "Configuration for the Meshery Operator on the managed cluster.",
                          "x-order": 1,
                          "x-oapi-codegen-extra-tags": {
                            "json": "operator,omitempty"
                          },
                          "type": "object",
                          "additionalProperties": false,
                          "properties": {
                            "deploymentMode": {
                              "type": "string",
                              "description": "How MeshSync is deployed for the connection. \"operator\" installs Meshery Operator into the cluster, which runs MeshSync and Meshery Broker there; \"embedded\" runs MeshSync in-process inside Meshery Server and installs nothing into the cluster.",
                              "enum": [
                                "operator",
                                "embedded"
                              ],
                              "x-order": 1,
                              "x-oapi-codegen-extra-tags": {
                                "json": "deploymentMode,omitempty"
                              }
                            },
                            "version": {
                              "type": "string",
                              "description": "Meshery Operator Helm chart version to deploy. When absent, the operator version tracks the Meshery Server release.",
                              "minLength": 1,
                              "maxLength": 128,
                              "x-order": 2,
                              "x-oapi-codegen-extra-tags": {
                                "json": "version,omitempty"
                              }
                            }
                          }
                        },
                        "meshsync": {
                          "description": "Configuration for the MeshSync agent on the managed cluster.",
                          "x-order": 2,
                          "x-oapi-codegen-extra-tags": {
                            "json": "meshsync,omitempty"
                          },
                          "type": "object",
                          "additionalProperties": false,
                          "properties": {
                            "version": {
                              "type": "string",
                              "description": "MeshSync image tag to run (for example \"v1.0.2\" or \"stable-latest\"). Applies to operator deployment mode only; in embedded mode MeshSync runs at the version compiled into Meshery Server. Secret redaction and broker content deduplication require MeshSync v1.0.2 or newer.",
                              "minLength": 1,
                              "maxLength": 128,
                              "x-order": 1,
                              "x-oapi-codegen-extra-tags": {
                                "json": "version,omitempty"
                              }
                            },
                            "replicas": {
                              "type": "integer",
                              "description": "Number of MeshSync replicas (MeshSync custom resource spec.size). Applies to operator deployment mode only.",
                              "minimum": 1,
                              "maximum": 10,
                              "x-order": 2,
                              "x-oapi-codegen-extra-tags": {
                                "json": "replicas,omitempty"
                              }
                            },
                            "watchList": {
                              "description": "Discovery scope for MeshSync, as a whitelist or a blacklist of Kubernetes resource types.",
                              "x-order": 3,
                              "x-oapi-codegen-extra-tags": {
                                "json": "watchList,omitempty"
                              },
                              "type": "object",
                              "additionalProperties": false,
                              "not": {
                                "required": [
                                  "whitelist",
                                  "blacklist"
                                ]
                              },
                              "properties": {
                                "whitelist": {
                                  "type": "array",
                                  "description": "Resource types MeshSync watches, each with the event types to subscribe to. Mutually exclusive with blacklist.",
                                  "maxItems": 1000,
                                  "items": {
                                    "type": "object",
                                    "description": "A single watched Kubernetes resource type and the event types MeshSync subscribes to for it.",
                                    "additionalProperties": false,
                                    "required": [
                                      "resource"
                                    ],
                                    "properties": {
                                      "resource": {
                                        "type": "string",
                                        "description": "Resource key in \"<plural>.<version>.<group>\" form (for example \"pods.v1.\" for core-group pods or \"deployments.v1.apps\").",
                                        "minLength": 1,
                                        "maxLength": 512,
                                        "pattern": "^[a-z0-9-]+\\.[a-z0-9]+\\.[a-z0-9.-]*$",
                                        "x-go-type-skip-optional-pointer": true,
                                        "x-order": 1,
                                        "x-oapi-codegen-extra-tags": {
                                          "json": "resource"
                                        }
                                      },
                                      "events": {
                                        "type": "array",
                                        "description": "Event types to subscribe to for this resource. Empty or absent subscribes to all event types.",
                                        "maxItems": 3,
                                        "items": {
                                          "type": "string",
                                          "description": "A single Kubernetes watch event type.",
                                          "enum": [
                                            "ADDED",
                                            "MODIFIED",
                                            "DELETED"
                                          ]
                                        },
                                        "x-go-type-skip-optional-pointer": true,
                                        "x-order": 2,
                                        "x-oapi-codegen-extra-tags": {
                                          "json": "events,omitempty"
                                        }
                                      }
                                    }
                                  },
                                  "x-go-type-skip-optional-pointer": true,
                                  "x-order": 1,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "whitelist,omitempty"
                                  }
                                },
                                "blacklist": {
                                  "type": "array",
                                  "description": "Resource types excluded from MeshSync's default discovery scope, in \"<plural>.<version>.<group>\" form (for example \"pods.v1.\" or \"deployments.v1.apps\"). Mutually exclusive with whitelist.",
                                  "maxItems": 1000,
                                  "items": {
                                    "type": "string",
                                    "description": "A single resource key in \"<plural>.<version>.<group>\" form.",
                                    "minLength": 1,
                                    "maxLength": 512,
                                    "pattern": "^[a-z0-9-]+\\.[a-z0-9]+\\.[a-z0-9.-]*$"
                                  },
                                  "x-go-type-skip-optional-pointer": true,
                                  "x-order": 2,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "blacklist,omitempty"
                                  }
                                }
                              }
                            },
                            "outputNamespaces": {
                              "type": "array",
                              "description": "Namespaces whose resources MeshSync publishes. Empty or absent publishes resources from all namespaces. Discovery scope is unaffected; this filters only what is published.",
                              "maxItems": 500,
                              "items": {
                                "type": "string",
                                "description": "A single Kubernetes namespace name (DNS-1123 label).",
                                "minLength": 1,
                                "maxLength": 63,
                                "pattern": "^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
                              },
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 4,
                              "x-oapi-codegen-extra-tags": {
                                "json": "outputNamespaces,omitempty"
                              }
                            },
                            "outputResources": {
                              "type": "array",
                              "description": "Resource types MeshSync publishes (lowercase Kubernetes kinds, for example \"pod\" or \"deployment\"). Empty or absent publishes all discovered resource types. Discovery scope is unaffected; this filters only what is published.",
                              "maxItems": 500,
                              "items": {
                                "type": "string",
                                "description": "A single lowercase Kubernetes resource kind.",
                                "minLength": 1,
                                "maxLength": 128,
                                "pattern": "^[a-z0-9-]+$"
                              },
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 5,
                              "x-oapi-codegen-extra-tags": {
                                "json": "outputResources,omitempty"
                              }
                            },
                            "redactSecrets": {
                              "type": "boolean",
                              "description": "When true, MeshSync redacts Kubernetes Secret data values (keys are preserved) before publishing. Requires MeshSync v1.0.2 or newer. Off by default; enabling is recommended when Secrets are within the discovery scope.",
                              "x-order": 6,
                              "x-oapi-codegen-extra-tags": {
                                "json": "redactSecrets,omitempty"
                              }
                            },
                            "brokerContentDedup": {
                              "type": "boolean",
                              "description": "When true, MeshSync suppresses byte-identical republishes of a resource to the broker. Requires MeshSync v1.0.2 or newer. Off by default.",
                              "x-order": 7,
                              "x-oapi-codegen-extra-tags": {
                                "json": "brokerContentDedup,omitempty"
                              }
                            },
                            "debugLogging": {
                              "type": "boolean",
                              "description": "When true, MeshSync runs with debug-level logging (DEBUG environment variable).",
                              "x-order": 8,
                              "x-oapi-codegen-extra-tags": {
                                "json": "debugLogging,omitempty"
                              }
                            }
                          }
                        },
                        "broker": {
                          "description": "Configuration for the Meshery Broker (NATS) on the managed cluster.",
                          "x-order": 3,
                          "x-oapi-codegen-extra-tags": {
                            "json": "broker,omitempty"
                          },
                          "type": "object",
                          "additionalProperties": false,
                          "properties": {
                            "version": {
                              "type": "string",
                              "description": "NATS server image tag to run (Broker custom resource spec.version). When absent, the operator's bundled default NATS version is used.",
                              "minLength": 1,
                              "maxLength": 128,
                              "x-order": 1,
                              "x-oapi-codegen-extra-tags": {
                                "json": "version,omitempty"
                              }
                            },
                            "replicas": {
                              "type": "integer",
                              "description": "Number of NATS server replicas (Broker custom resource spec.size).",
                              "minimum": 1,
                              "maximum": 10,
                              "x-order": 2,
                              "x-oapi-codegen-extra-tags": {
                                "json": "replicas,omitempty"
                              }
                            },
                            "service": {
                              "description": "How the broker is exposed on the network. Service changes reconcile in place without restarting broker pods.",
                              "x-order": 3,
                              "x-oapi-codegen-extra-tags": {
                                "json": "service,omitempty"
                              },
                              "type": "object",
                              "additionalProperties": false,
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "Kubernetes Service type for client access. When absent the broker stays cluster-internal (ClusterIP). LoadBalancer acquires a cloud load-balancer address; NodePort exposes the broker on node IPs.",
                                  "enum": [
                                    "ClusterIP",
                                    "NodePort",
                                    "LoadBalancer"
                                  ],
                                  "x-order": 1,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "type,omitempty"
                                  }
                                },
                                "annotations": {
                                  "type": "object",
                                  "description": "Annotations merged onto the client Service (cloud load-balancer hints, MetalLB address pools, internal-LB switches).",
                                  "additionalProperties": {
                                    "type": "string",
                                    "description": "A single annotation value.",
                                    "maxLength": 4096
                                  },
                                  "x-go-type-skip-optional-pointer": true,
                                  "x-order": 2,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "annotations,omitempty"
                                  }
                                },
                                "loadBalancerClass": {
                                  "type": "string",
                                  "description": "Load-balancer implementation to use. Valid only when type is LoadBalancer.",
                                  "minLength": 1,
                                  "maxLength": 253,
                                  "x-order": 3,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "loadBalancerClass,omitempty"
                                  }
                                },
                                "loadBalancerSourceRanges": {
                                  "type": "array",
                                  "description": "CIDR ranges allowed to reach the broker. Valid only when type is LoadBalancer.",
                                  "maxItems": 100,
                                  "items": {
                                    "type": "string",
                                    "description": "A single CIDR range.",
                                    "minLength": 1,
                                    "maxLength": 64
                                  },
                                  "x-go-type-skip-optional-pointer": true,
                                  "x-order": 4,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "loadBalancerSourceRanges,omitempty"
                                  }
                                },
                                "externalEndpointOverride": {
                                  "type": "string",
                                  "description": "Pins the advertised external broker endpoint as \"host:port\" when auto-derivation is undesirable: an ingress or gateway in front of the broker, an air-gapped topology, or NAT. The nats:// scheme is added by consumers.",
                                  "minLength": 3,
                                  "maxLength": 262,
                                  "pattern": "^([A-Za-z0-9.-]+|\\[[A-Fa-f0-9:.]+\\]):[0-9]{1,5}$",
                                  "x-order": 5,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "externalEndpointOverride,omitempty"
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      "x-order": 3,
                      "x-oapi-codegen-extra-tags": {
                        "json": "effective"
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
          "meshery"
        ],
        "tags": [
          "controllers"
        ],
        "operationId": "updateConnectionControllersConfig",
        "summary": "Update controllers configuration override for a connection",
        "description": "Persists the per-connection controllers configuration override into the connection's metadata and applies the resolved effective configuration to that connection's cluster. Absent fields inherit the server-wide default; an empty document removes the override entirely.",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "description": "Kubernetes connection ID.",
            "schema": {
              "type": "string",
              "format": "uuid",
              "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              }
            },
            "required": true
          }
        ],
        "requestBody": {
          "description": "Controllers configuration document. Absent fields inherit from the next precedence layer.",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Client-settable controllers configuration document, used as the body of update requests at both layers (server-wide defaults and per-connection override). Identical to MesheryControllersConfig minus the server-stamped schemaVersion. Every field is optional: an absent field inherits from the next precedence layer, and an empty document clears the layer entirely.",
                "additionalProperties": false,
                "properties": {
                  "operator": {
                    "description": "Configuration for the Meshery Operator on the managed cluster.",
                    "x-order": 1,
                    "x-oapi-codegen-extra-tags": {
                      "json": "operator,omitempty"
                    },
                    "type": "object",
                    "additionalProperties": false,
                    "properties": {
                      "deploymentMode": {
                        "type": "string",
                        "description": "How MeshSync is deployed for the connection. \"operator\" installs Meshery Operator into the cluster, which runs MeshSync and Meshery Broker there; \"embedded\" runs MeshSync in-process inside Meshery Server and installs nothing into the cluster.",
                        "enum": [
                          "operator",
                          "embedded"
                        ],
                        "x-order": 1,
                        "x-oapi-codegen-extra-tags": {
                          "json": "deploymentMode,omitempty"
                        }
                      },
                      "version": {
                        "type": "string",
                        "description": "Meshery Operator Helm chart version to deploy. When absent, the operator version tracks the Meshery Server release.",
                        "minLength": 1,
                        "maxLength": 128,
                        "x-order": 2,
                        "x-oapi-codegen-extra-tags": {
                          "json": "version,omitempty"
                        }
                      }
                    }
                  },
                  "meshsync": {
                    "description": "Configuration for the MeshSync agent on the managed cluster.",
                    "x-order": 2,
                    "x-oapi-codegen-extra-tags": {
                      "json": "meshsync,omitempty"
                    },
                    "type": "object",
                    "additionalProperties": false,
                    "properties": {
                      "version": {
                        "type": "string",
                        "description": "MeshSync image tag to run (for example \"v1.0.2\" or \"stable-latest\"). Applies to operator deployment mode only; in embedded mode MeshSync runs at the version compiled into Meshery Server. Secret redaction and broker content deduplication require MeshSync v1.0.2 or newer.",
                        "minLength": 1,
                        "maxLength": 128,
                        "x-order": 1,
                        "x-oapi-codegen-extra-tags": {
                          "json": "version,omitempty"
                        }
                      },
                      "replicas": {
                        "type": "integer",
                        "description": "Number of MeshSync replicas (MeshSync custom resource spec.size). Applies to operator deployment mode only.",
                        "minimum": 1,
                        "maximum": 10,
                        "x-order": 2,
                        "x-oapi-codegen-extra-tags": {
                          "json": "replicas,omitempty"
                        }
                      },
                      "watchList": {
                        "description": "Discovery scope for MeshSync, as a whitelist or a blacklist of Kubernetes resource types.",
                        "x-order": 3,
                        "x-oapi-codegen-extra-tags": {
                          "json": "watchList,omitempty"
                        },
                        "type": "object",
                        "additionalProperties": false,
                        "not": {
                          "required": [
                            "whitelist",
                            "blacklist"
                          ]
                        },
                        "properties": {
                          "whitelist": {
                            "type": "array",
                            "description": "Resource types MeshSync watches, each with the event types to subscribe to. Mutually exclusive with blacklist.",
                            "maxItems": 1000,
                            "items": {
                              "type": "object",
                              "description": "A single watched Kubernetes resource type and the event types MeshSync subscribes to for it.",
                              "additionalProperties": false,
                              "required": [
                                "resource"
                              ],
                              "properties": {
                                "resource": {
                                  "type": "string",
                                  "description": "Resource key in \"<plural>.<version>.<group>\" form (for example \"pods.v1.\" for core-group pods or \"deployments.v1.apps\").",
                                  "minLength": 1,
                                  "maxLength": 512,
                                  "pattern": "^[a-z0-9-]+\\.[a-z0-9]+\\.[a-z0-9.-]*$",
                                  "x-go-type-skip-optional-pointer": true,
                                  "x-order": 1,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "resource"
                                  }
                                },
                                "events": {
                                  "type": "array",
                                  "description": "Event types to subscribe to for this resource. Empty or absent subscribes to all event types.",
                                  "maxItems": 3,
                                  "items": {
                                    "type": "string",
                                    "description": "A single Kubernetes watch event type.",
                                    "enum": [
                                      "ADDED",
                                      "MODIFIED",
                                      "DELETED"
                                    ]
                                  },
                                  "x-go-type-skip-optional-pointer": true,
                                  "x-order": 2,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "events,omitempty"
                                  }
                                }
                              }
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-order": 1,
                            "x-oapi-codegen-extra-tags": {
                              "json": "whitelist,omitempty"
                            }
                          },
                          "blacklist": {
                            "type": "array",
                            "description": "Resource types excluded from MeshSync's default discovery scope, in \"<plural>.<version>.<group>\" form (for example \"pods.v1.\" or \"deployments.v1.apps\"). Mutually exclusive with whitelist.",
                            "maxItems": 1000,
                            "items": {
                              "type": "string",
                              "description": "A single resource key in \"<plural>.<version>.<group>\" form.",
                              "minLength": 1,
                              "maxLength": 512,
                              "pattern": "^[a-z0-9-]+\\.[a-z0-9]+\\.[a-z0-9.-]*$"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-order": 2,
                            "x-oapi-codegen-extra-tags": {
                              "json": "blacklist,omitempty"
                            }
                          }
                        }
                      },
                      "outputNamespaces": {
                        "type": "array",
                        "description": "Namespaces whose resources MeshSync publishes. Empty or absent publishes resources from all namespaces. Discovery scope is unaffected; this filters only what is published.",
                        "maxItems": 500,
                        "items": {
                          "type": "string",
                          "description": "A single Kubernetes namespace name (DNS-1123 label).",
                          "minLength": 1,
                          "maxLength": 63,
                          "pattern": "^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
                        },
                        "x-go-type-skip-optional-pointer": true,
                        "x-order": 4,
                        "x-oapi-codegen-extra-tags": {
                          "json": "outputNamespaces,omitempty"
                        }
                      },
                      "outputResources": {
                        "type": "array",
                        "description": "Resource types MeshSync publishes (lowercase Kubernetes kinds, for example \"pod\" or \"deployment\"). Empty or absent publishes all discovered resource types. Discovery scope is unaffected; this filters only what is published.",
                        "maxItems": 500,
                        "items": {
                          "type": "string",
                          "description": "A single lowercase Kubernetes resource kind.",
                          "minLength": 1,
                          "maxLength": 128,
                          "pattern": "^[a-z0-9-]+$"
                        },
                        "x-go-type-skip-optional-pointer": true,
                        "x-order": 5,
                        "x-oapi-codegen-extra-tags": {
                          "json": "outputResources,omitempty"
                        }
                      },
                      "redactSecrets": {
                        "type": "boolean",
                        "description": "When true, MeshSync redacts Kubernetes Secret data values (keys are preserved) before publishing. Requires MeshSync v1.0.2 or newer. Off by default; enabling is recommended when Secrets are within the discovery scope.",
                        "x-order": 6,
                        "x-oapi-codegen-extra-tags": {
                          "json": "redactSecrets,omitempty"
                        }
                      },
                      "brokerContentDedup": {
                        "type": "boolean",
                        "description": "When true, MeshSync suppresses byte-identical republishes of a resource to the broker. Requires MeshSync v1.0.2 or newer. Off by default.",
                        "x-order": 7,
                        "x-oapi-codegen-extra-tags": {
                          "json": "brokerContentDedup,omitempty"
                        }
                      },
                      "debugLogging": {
                        "type": "boolean",
                        "description": "When true, MeshSync runs with debug-level logging (DEBUG environment variable).",
                        "x-order": 8,
                        "x-oapi-codegen-extra-tags": {
                          "json": "debugLogging,omitempty"
                        }
                      }
                    }
                  },
                  "broker": {
                    "description": "Configuration for the Meshery Broker (NATS) on the managed cluster.",
                    "x-order": 3,
                    "x-oapi-codegen-extra-tags": {
                      "json": "broker,omitempty"
                    },
                    "type": "object",
                    "additionalProperties": false,
                    "properties": {
                      "version": {
                        "type": "string",
                        "description": "NATS server image tag to run (Broker custom resource spec.version). When absent, the operator's bundled default NATS version is used.",
                        "minLength": 1,
                        "maxLength": 128,
                        "x-order": 1,
                        "x-oapi-codegen-extra-tags": {
                          "json": "version,omitempty"
                        }
                      },
                      "replicas": {
                        "type": "integer",
                        "description": "Number of NATS server replicas (Broker custom resource spec.size).",
                        "minimum": 1,
                        "maximum": 10,
                        "x-order": 2,
                        "x-oapi-codegen-extra-tags": {
                          "json": "replicas,omitempty"
                        }
                      },
                      "service": {
                        "description": "How the broker is exposed on the network. Service changes reconcile in place without restarting broker pods.",
                        "x-order": 3,
                        "x-oapi-codegen-extra-tags": {
                          "json": "service,omitempty"
                        },
                        "type": "object",
                        "additionalProperties": false,
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "Kubernetes Service type for client access. When absent the broker stays cluster-internal (ClusterIP). LoadBalancer acquires a cloud load-balancer address; NodePort exposes the broker on node IPs.",
                            "enum": [
                              "ClusterIP",
                              "NodePort",
                              "LoadBalancer"
                            ],
                            "x-order": 1,
                            "x-oapi-codegen-extra-tags": {
                              "json": "type,omitempty"
                            }
                          },
                          "annotations": {
                            "type": "object",
                            "description": "Annotations merged onto the client Service (cloud load-balancer hints, MetalLB address pools, internal-LB switches).",
                            "additionalProperties": {
                              "type": "string",
                              "description": "A single annotation value.",
                              "maxLength": 4096
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-order": 2,
                            "x-oapi-codegen-extra-tags": {
                              "json": "annotations,omitempty"
                            }
                          },
                          "loadBalancerClass": {
                            "type": "string",
                            "description": "Load-balancer implementation to use. Valid only when type is LoadBalancer.",
                            "minLength": 1,
                            "maxLength": 253,
                            "x-order": 3,
                            "x-oapi-codegen-extra-tags": {
                              "json": "loadBalancerClass,omitempty"
                            }
                          },
                          "loadBalancerSourceRanges": {
                            "type": "array",
                            "description": "CIDR ranges allowed to reach the broker. Valid only when type is LoadBalancer.",
                            "maxItems": 100,
                            "items": {
                              "type": "string",
                              "description": "A single CIDR range.",
                              "minLength": 1,
                              "maxLength": 64
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-order": 4,
                            "x-oapi-codegen-extra-tags": {
                              "json": "loadBalancerSourceRanges,omitempty"
                            }
                          },
                          "externalEndpointOverride": {
                            "type": "string",
                            "description": "Pins the advertised external broker endpoint as \"host:port\" when auto-derivation is undesirable: an ingress or gateway in front of the broker, an air-gapped topology, or NAT. The nats:// scheme is added by consumers.",
                            "minLength": 3,
                            "maxLength": 262,
                            "pattern": "^([A-Za-z0-9.-]+|\\[[A-Fa-f0-9:.]+\\]):[0-9]{1,5}$",
                            "x-order": 5,
                            "x-oapi-codegen-extra-tags": {
                              "json": "externalEndpointOverride,omitempty"
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
        "responses": {
          "200": {
            "description": "Updated controllers configuration for the connection",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Layered view of the controllers configuration for a single Kubernetes connection. Exposes each precedence layer so clients can indicate, per field, whether the effective value is inherited from the server-wide default or overridden on the connection.",
                  "additionalProperties": false,
                  "required": [
                    "effective"
                  ],
                  "properties": {
                    "override": {
                      "$id": "https://schemas.meshery.io/controllers_config.yaml",
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "title": "MesheryControllersConfig",
                      "description": "Deployment and runtime configuration for the Meshery controllers that manage a Kubernetes connection: Meshery Operator, MeshSync, and Meshery Broker. The same document shape is used at two layers. As a server-wide default it declares how Meshery Server deploys and configures the controllers for every managed cluster. As a per-connection override, stored in the connection's metadata, it overrides the server-wide default for a single connection. Every configuration field is optional: an absent field inherits the value from the next layer (per-connection override, then server-wide default, then built-in default). The only required field is the server-stamped schemaVersion discriminator, which identifies the document revision for future migrations. Learn more at https://docs.meshery.io/concepts/architecture",
                      "additionalProperties": false,
                      "type": "object",
                      "required": [
                        "schemaVersion"
                      ],
                      "properties": {
                        "schemaVersion": {
                          "description": "Specifies the version of the schema used for this configuration document.",
                          "default": "controllers.meshery.io/v1alpha1",
                          "x-order": 0,
                          "x-oapi-codegen-extra-tags": {
                            "json": "schemaVersion"
                          },
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
                        "operator": {
                          "description": "Configuration for the Meshery Operator on the managed cluster.",
                          "x-order": 1,
                          "x-oapi-codegen-extra-tags": {
                            "json": "operator,omitempty"
                          },
                          "type": "object",
                          "additionalProperties": false,
                          "properties": {
                            "deploymentMode": {
                              "type": "string",
                              "description": "How MeshSync is deployed for the connection. \"operator\" installs Meshery Operator into the cluster, which runs MeshSync and Meshery Broker there; \"embedded\" runs MeshSync in-process inside Meshery Server and installs nothing into the cluster.",
                              "enum": [
                                "operator",
                                "embedded"
                              ],
                              "x-order": 1,
                              "x-oapi-codegen-extra-tags": {
                                "json": "deploymentMode,omitempty"
                              }
                            },
                            "version": {
                              "type": "string",
                              "description": "Meshery Operator Helm chart version to deploy. When absent, the operator version tracks the Meshery Server release.",
                              "minLength": 1,
                              "maxLength": 128,
                              "x-order": 2,
                              "x-oapi-codegen-extra-tags": {
                                "json": "version,omitempty"
                              }
                            }
                          }
                        },
                        "meshsync": {
                          "description": "Configuration for the MeshSync agent on the managed cluster.",
                          "x-order": 2,
                          "x-oapi-codegen-extra-tags": {
                            "json": "meshsync,omitempty"
                          },
                          "type": "object",
                          "additionalProperties": false,
                          "properties": {
                            "version": {
                              "type": "string",
                              "description": "MeshSync image tag to run (for example \"v1.0.2\" or \"stable-latest\"). Applies to operator deployment mode only; in embedded mode MeshSync runs at the version compiled into Meshery Server. Secret redaction and broker content deduplication require MeshSync v1.0.2 or newer.",
                              "minLength": 1,
                              "maxLength": 128,
                              "x-order": 1,
                              "x-oapi-codegen-extra-tags": {
                                "json": "version,omitempty"
                              }
                            },
                            "replicas": {
                              "type": "integer",
                              "description": "Number of MeshSync replicas (MeshSync custom resource spec.size). Applies to operator deployment mode only.",
                              "minimum": 1,
                              "maximum": 10,
                              "x-order": 2,
                              "x-oapi-codegen-extra-tags": {
                                "json": "replicas,omitempty"
                              }
                            },
                            "watchList": {
                              "description": "Discovery scope for MeshSync, as a whitelist or a blacklist of Kubernetes resource types.",
                              "x-order": 3,
                              "x-oapi-codegen-extra-tags": {
                                "json": "watchList,omitempty"
                              },
                              "type": "object",
                              "additionalProperties": false,
                              "not": {
                                "required": [
                                  "whitelist",
                                  "blacklist"
                                ]
                              },
                              "properties": {
                                "whitelist": {
                                  "type": "array",
                                  "description": "Resource types MeshSync watches, each with the event types to subscribe to. Mutually exclusive with blacklist.",
                                  "maxItems": 1000,
                                  "items": {
                                    "type": "object",
                                    "description": "A single watched Kubernetes resource type and the event types MeshSync subscribes to for it.",
                                    "additionalProperties": false,
                                    "required": [
                                      "resource"
                                    ],
                                    "properties": {
                                      "resource": {
                                        "type": "string",
                                        "description": "Resource key in \"<plural>.<version>.<group>\" form (for example \"pods.v1.\" for core-group pods or \"deployments.v1.apps\").",
                                        "minLength": 1,
                                        "maxLength": 512,
                                        "pattern": "^[a-z0-9-]+\\.[a-z0-9]+\\.[a-z0-9.-]*$",
                                        "x-go-type-skip-optional-pointer": true,
                                        "x-order": 1,
                                        "x-oapi-codegen-extra-tags": {
                                          "json": "resource"
                                        }
                                      },
                                      "events": {
                                        "type": "array",
                                        "description": "Event types to subscribe to for this resource. Empty or absent subscribes to all event types.",
                                        "maxItems": 3,
                                        "items": {
                                          "type": "string",
                                          "description": "A single Kubernetes watch event type.",
                                          "enum": [
                                            "ADDED",
                                            "MODIFIED",
                                            "DELETED"
                                          ]
                                        },
                                        "x-go-type-skip-optional-pointer": true,
                                        "x-order": 2,
                                        "x-oapi-codegen-extra-tags": {
                                          "json": "events,omitempty"
                                        }
                                      }
                                    }
                                  },
                                  "x-go-type-skip-optional-pointer": true,
                                  "x-order": 1,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "whitelist,omitempty"
                                  }
                                },
                                "blacklist": {
                                  "type": "array",
                                  "description": "Resource types excluded from MeshSync's default discovery scope, in \"<plural>.<version>.<group>\" form (for example \"pods.v1.\" or \"deployments.v1.apps\"). Mutually exclusive with whitelist.",
                                  "maxItems": 1000,
                                  "items": {
                                    "type": "string",
                                    "description": "A single resource key in \"<plural>.<version>.<group>\" form.",
                                    "minLength": 1,
                                    "maxLength": 512,
                                    "pattern": "^[a-z0-9-]+\\.[a-z0-9]+\\.[a-z0-9.-]*$"
                                  },
                                  "x-go-type-skip-optional-pointer": true,
                                  "x-order": 2,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "blacklist,omitempty"
                                  }
                                }
                              }
                            },
                            "outputNamespaces": {
                              "type": "array",
                              "description": "Namespaces whose resources MeshSync publishes. Empty or absent publishes resources from all namespaces. Discovery scope is unaffected; this filters only what is published.",
                              "maxItems": 500,
                              "items": {
                                "type": "string",
                                "description": "A single Kubernetes namespace name (DNS-1123 label).",
                                "minLength": 1,
                                "maxLength": 63,
                                "pattern": "^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
                              },
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 4,
                              "x-oapi-codegen-extra-tags": {
                                "json": "outputNamespaces,omitempty"
                              }
                            },
                            "outputResources": {
                              "type": "array",
                              "description": "Resource types MeshSync publishes (lowercase Kubernetes kinds, for example \"pod\" or \"deployment\"). Empty or absent publishes all discovered resource types. Discovery scope is unaffected; this filters only what is published.",
                              "maxItems": 500,
                              "items": {
                                "type": "string",
                                "description": "A single lowercase Kubernetes resource kind.",
                                "minLength": 1,
                                "maxLength": 128,
                                "pattern": "^[a-z0-9-]+$"
                              },
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 5,
                              "x-oapi-codegen-extra-tags": {
                                "json": "outputResources,omitempty"
                              }
                            },
                            "redactSecrets": {
                              "type": "boolean",
                              "description": "When true, MeshSync redacts Kubernetes Secret data values (keys are preserved) before publishing. Requires MeshSync v1.0.2 or newer. Off by default; enabling is recommended when Secrets are within the discovery scope.",
                              "x-order": 6,
                              "x-oapi-codegen-extra-tags": {
                                "json": "redactSecrets,omitempty"
                              }
                            },
                            "brokerContentDedup": {
                              "type": "boolean",
                              "description": "When true, MeshSync suppresses byte-identical republishes of a resource to the broker. Requires MeshSync v1.0.2 or newer. Off by default.",
                              "x-order": 7,
                              "x-oapi-codegen-extra-tags": {
                                "json": "brokerContentDedup,omitempty"
                              }
                            },
                            "debugLogging": {
                              "type": "boolean",
                              "description": "When true, MeshSync runs with debug-level logging (DEBUG environment variable).",
                              "x-order": 8,
                              "x-oapi-codegen-extra-tags": {
                                "json": "debugLogging,omitempty"
                              }
                            }
                          }
                        },
                        "broker": {
                          "description": "Configuration for the Meshery Broker (NATS) on the managed cluster.",
                          "x-order": 3,
                          "x-oapi-codegen-extra-tags": {
                            "json": "broker,omitempty"
                          },
                          "type": "object",
                          "additionalProperties": false,
                          "properties": {
                            "version": {
                              "type": "string",
                              "description": "NATS server image tag to run (Broker custom resource spec.version). When absent, the operator's bundled default NATS version is used.",
                              "minLength": 1,
                              "maxLength": 128,
                              "x-order": 1,
                              "x-oapi-codegen-extra-tags": {
                                "json": "version,omitempty"
                              }
                            },
                            "replicas": {
                              "type": "integer",
                              "description": "Number of NATS server replicas (Broker custom resource spec.size).",
                              "minimum": 1,
                              "maximum": 10,
                              "x-order": 2,
                              "x-oapi-codegen-extra-tags": {
                                "json": "replicas,omitempty"
                              }
                            },
                            "service": {
                              "description": "How the broker is exposed on the network. Service changes reconcile in place without restarting broker pods.",
                              "x-order": 3,
                              "x-oapi-codegen-extra-tags": {
                                "json": "service,omitempty"
                              },
                              "type": "object",
                              "additionalProperties": false,
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "Kubernetes Service type for client access. When absent the broker stays cluster-internal (ClusterIP). LoadBalancer acquires a cloud load-balancer address; NodePort exposes the broker on node IPs.",
                                  "enum": [
                                    "ClusterIP",
                                    "NodePort",
                                    "LoadBalancer"
                                  ],
                                  "x-order": 1,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "type,omitempty"
                                  }
                                },
                                "annotations": {
                                  "type": "object",
                                  "description": "Annotations merged onto the client Service (cloud load-balancer hints, MetalLB address pools, internal-LB switches).",
                                  "additionalProperties": {
                                    "type": "string",
                                    "description": "A single annotation value.",
                                    "maxLength": 4096
                                  },
                                  "x-go-type-skip-optional-pointer": true,
                                  "x-order": 2,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "annotations,omitempty"
                                  }
                                },
                                "loadBalancerClass": {
                                  "type": "string",
                                  "description": "Load-balancer implementation to use. Valid only when type is LoadBalancer.",
                                  "minLength": 1,
                                  "maxLength": 253,
                                  "x-order": 3,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "loadBalancerClass,omitempty"
                                  }
                                },
                                "loadBalancerSourceRanges": {
                                  "type": "array",
                                  "description": "CIDR ranges allowed to reach the broker. Valid only when type is LoadBalancer.",
                                  "maxItems": 100,
                                  "items": {
                                    "type": "string",
                                    "description": "A single CIDR range.",
                                    "minLength": 1,
                                    "maxLength": 64
                                  },
                                  "x-go-type-skip-optional-pointer": true,
                                  "x-order": 4,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "loadBalancerSourceRanges,omitempty"
                                  }
                                },
                                "externalEndpointOverride": {
                                  "type": "string",
                                  "description": "Pins the advertised external broker endpoint as \"host:port\" when auto-derivation is undesirable: an ingress or gateway in front of the broker, an air-gapped topology, or NAT. The nats:// scheme is added by consumers.",
                                  "minLength": 3,
                                  "maxLength": 262,
                                  "pattern": "^([A-Za-z0-9.-]+|\\[[A-Fa-f0-9:.]+\\]):[0-9]{1,5}$",
                                  "x-order": 5,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "externalEndpointOverride,omitempty"
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      "x-order": 1,
                      "x-oapi-codegen-extra-tags": {
                        "json": "override,omitempty"
                      }
                    },
                    "default": {
                      "$id": "https://schemas.meshery.io/controllers_config.yaml",
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "title": "MesheryControllersConfig",
                      "description": "Deployment and runtime configuration for the Meshery controllers that manage a Kubernetes connection: Meshery Operator, MeshSync, and Meshery Broker. The same document shape is used at two layers. As a server-wide default it declares how Meshery Server deploys and configures the controllers for every managed cluster. As a per-connection override, stored in the connection's metadata, it overrides the server-wide default for a single connection. Every configuration field is optional: an absent field inherits the value from the next layer (per-connection override, then server-wide default, then built-in default). The only required field is the server-stamped schemaVersion discriminator, which identifies the document revision for future migrations. Learn more at https://docs.meshery.io/concepts/architecture",
                      "additionalProperties": false,
                      "type": "object",
                      "required": [
                        "schemaVersion"
                      ],
                      "properties": {
                        "schemaVersion": {
                          "description": "Specifies the version of the schema used for this configuration document.",
                          "default": "controllers.meshery.io/v1alpha1",
                          "x-order": 0,
                          "x-oapi-codegen-extra-tags": {
                            "json": "schemaVersion"
                          },
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
                        "operator": {
                          "description": "Configuration for the Meshery Operator on the managed cluster.",
                          "x-order": 1,
                          "x-oapi-codegen-extra-tags": {
                            "json": "operator,omitempty"
                          },
                          "type": "object",
                          "additionalProperties": false,
                          "properties": {
                            "deploymentMode": {
                              "type": "string",
                              "description": "How MeshSync is deployed for the connection. \"operator\" installs Meshery Operator into the cluster, which runs MeshSync and Meshery Broker there; \"embedded\" runs MeshSync in-process inside Meshery Server and installs nothing into the cluster.",
                              "enum": [
                                "operator",
                                "embedded"
                              ],
                              "x-order": 1,
                              "x-oapi-codegen-extra-tags": {
                                "json": "deploymentMode,omitempty"
                              }
                            },
                            "version": {
                              "type": "string",
                              "description": "Meshery Operator Helm chart version to deploy. When absent, the operator version tracks the Meshery Server release.",
                              "minLength": 1,
                              "maxLength": 128,
                              "x-order": 2,
                              "x-oapi-codegen-extra-tags": {
                                "json": "version,omitempty"
                              }
                            }
                          }
                        },
                        "meshsync": {
                          "description": "Configuration for the MeshSync agent on the managed cluster.",
                          "x-order": 2,
                          "x-oapi-codegen-extra-tags": {
                            "json": "meshsync,omitempty"
                          },
                          "type": "object",
                          "additionalProperties": false,
                          "properties": {
                            "version": {
                              "type": "string",
                              "description": "MeshSync image tag to run (for example \"v1.0.2\" or \"stable-latest\"). Applies to operator deployment mode only; in embedded mode MeshSync runs at the version compiled into Meshery Server. Secret redaction and broker content deduplication require MeshSync v1.0.2 or newer.",
                              "minLength": 1,
                              "maxLength": 128,
                              "x-order": 1,
                              "x-oapi-codegen-extra-tags": {
                                "json": "version,omitempty"
                              }
                            },
                            "replicas": {
                              "type": "integer",
                              "description": "Number of MeshSync replicas (MeshSync custom resource spec.size). Applies to operator deployment mode only.",
                              "minimum": 1,
                              "maximum": 10,
                              "x-order": 2,
                              "x-oapi-codegen-extra-tags": {
                                "json": "replicas,omitempty"
                              }
                            },
                            "watchList": {
                              "description": "Discovery scope for MeshSync, as a whitelist or a blacklist of Kubernetes resource types.",
                              "x-order": 3,
                              "x-oapi-codegen-extra-tags": {
                                "json": "watchList,omitempty"
                              },
                              "type": "object",
                              "additionalProperties": false,
                              "not": {
                                "required": [
                                  "whitelist",
                                  "blacklist"
                                ]
                              },
                              "properties": {
                                "whitelist": {
                                  "type": "array",
                                  "description": "Resource types MeshSync watches, each with the event types to subscribe to. Mutually exclusive with blacklist.",
                                  "maxItems": 1000,
                                  "items": {
                                    "type": "object",
                                    "description": "A single watched Kubernetes resource type and the event types MeshSync subscribes to for it.",
                                    "additionalProperties": false,
                                    "required": [
                                      "resource"
                                    ],
                                    "properties": {
                                      "resource": {
                                        "type": "string",
                                        "description": "Resource key in \"<plural>.<version>.<group>\" form (for example \"pods.v1.\" for core-group pods or \"deployments.v1.apps\").",
                                        "minLength": 1,
                                        "maxLength": 512,
                                        "pattern": "^[a-z0-9-]+\\.[a-z0-9]+\\.[a-z0-9.-]*$",
                                        "x-go-type-skip-optional-pointer": true,
                                        "x-order": 1,
                                        "x-oapi-codegen-extra-tags": {
                                          "json": "resource"
                                        }
                                      },
                                      "events": {
                                        "type": "array",
                                        "description": "Event types to subscribe to for this resource. Empty or absent subscribes to all event types.",
                                        "maxItems": 3,
                                        "items": {
                                          "type": "string",
                                          "description": "A single Kubernetes watch event type.",
                                          "enum": [
                                            "ADDED",
                                            "MODIFIED",
                                            "DELETED"
                                          ]
                                        },
                                        "x-go-type-skip-optional-pointer": true,
                                        "x-order": 2,
                                        "x-oapi-codegen-extra-tags": {
                                          "json": "events,omitempty"
                                        }
                                      }
                                    }
                                  },
                                  "x-go-type-skip-optional-pointer": true,
                                  "x-order": 1,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "whitelist,omitempty"
                                  }
                                },
                                "blacklist": {
                                  "type": "array",
                                  "description": "Resource types excluded from MeshSync's default discovery scope, in \"<plural>.<version>.<group>\" form (for example \"pods.v1.\" or \"deployments.v1.apps\"). Mutually exclusive with whitelist.",
                                  "maxItems": 1000,
                                  "items": {
                                    "type": "string",
                                    "description": "A single resource key in \"<plural>.<version>.<group>\" form.",
                                    "minLength": 1,
                                    "maxLength": 512,
                                    "pattern": "^[a-z0-9-]+\\.[a-z0-9]+\\.[a-z0-9.-]*$"
                                  },
                                  "x-go-type-skip-optional-pointer": true,
                                  "x-order": 2,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "blacklist,omitempty"
                                  }
                                }
                              }
                            },
                            "outputNamespaces": {
                              "type": "array",
                              "description": "Namespaces whose resources MeshSync publishes. Empty or absent publishes resources from all namespaces. Discovery scope is unaffected; this filters only what is published.",
                              "maxItems": 500,
                              "items": {
                                "type": "string",
                                "description": "A single Kubernetes namespace name (DNS-1123 label).",
                                "minLength": 1,
                                "maxLength": 63,
                                "pattern": "^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
                              },
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 4,
                              "x-oapi-codegen-extra-tags": {
                                "json": "outputNamespaces,omitempty"
                              }
                            },
                            "outputResources": {
                              "type": "array",
                              "description": "Resource types MeshSync publishes (lowercase Kubernetes kinds, for example \"pod\" or \"deployment\"). Empty or absent publishes all discovered resource types. Discovery scope is unaffected; this filters only what is published.",
                              "maxItems": 500,
                              "items": {
                                "type": "string",
                                "description": "A single lowercase Kubernetes resource kind.",
                                "minLength": 1,
                                "maxLength": 128,
                                "pattern": "^[a-z0-9-]+$"
                              },
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 5,
                              "x-oapi-codegen-extra-tags": {
                                "json": "outputResources,omitempty"
                              }
                            },
                            "redactSecrets": {
                              "type": "boolean",
                              "description": "When true, MeshSync redacts Kubernetes Secret data values (keys are preserved) before publishing. Requires MeshSync v1.0.2 or newer. Off by default; enabling is recommended when Secrets are within the discovery scope.",
                              "x-order": 6,
                              "x-oapi-codegen-extra-tags": {
                                "json": "redactSecrets,omitempty"
                              }
                            },
                            "brokerContentDedup": {
                              "type": "boolean",
                              "description": "When true, MeshSync suppresses byte-identical republishes of a resource to the broker. Requires MeshSync v1.0.2 or newer. Off by default.",
                              "x-order": 7,
                              "x-oapi-codegen-extra-tags": {
                                "json": "brokerContentDedup,omitempty"
                              }
                            },
                            "debugLogging": {
                              "type": "boolean",
                              "description": "When true, MeshSync runs with debug-level logging (DEBUG environment variable).",
                              "x-order": 8,
                              "x-oapi-codegen-extra-tags": {
                                "json": "debugLogging,omitempty"
                              }
                            }
                          }
                        },
                        "broker": {
                          "description": "Configuration for the Meshery Broker (NATS) on the managed cluster.",
                          "x-order": 3,
                          "x-oapi-codegen-extra-tags": {
                            "json": "broker,omitempty"
                          },
                          "type": "object",
                          "additionalProperties": false,
                          "properties": {
                            "version": {
                              "type": "string",
                              "description": "NATS server image tag to run (Broker custom resource spec.version). When absent, the operator's bundled default NATS version is used.",
                              "minLength": 1,
                              "maxLength": 128,
                              "x-order": 1,
                              "x-oapi-codegen-extra-tags": {
                                "json": "version,omitempty"
                              }
                            },
                            "replicas": {
                              "type": "integer",
                              "description": "Number of NATS server replicas (Broker custom resource spec.size).",
                              "minimum": 1,
                              "maximum": 10,
                              "x-order": 2,
                              "x-oapi-codegen-extra-tags": {
                                "json": "replicas,omitempty"
                              }
                            },
                            "service": {
                              "description": "How the broker is exposed on the network. Service changes reconcile in place without restarting broker pods.",
                              "x-order": 3,
                              "x-oapi-codegen-extra-tags": {
                                "json": "service,omitempty"
                              },
                              "type": "object",
                              "additionalProperties": false,
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "Kubernetes Service type for client access. When absent the broker stays cluster-internal (ClusterIP). LoadBalancer acquires a cloud load-balancer address; NodePort exposes the broker on node IPs.",
                                  "enum": [
                                    "ClusterIP",
                                    "NodePort",
                                    "LoadBalancer"
                                  ],
                                  "x-order": 1,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "type,omitempty"
                                  }
                                },
                                "annotations": {
                                  "type": "object",
                                  "description": "Annotations merged onto the client Service (cloud load-balancer hints, MetalLB address pools, internal-LB switches).",
                                  "additionalProperties": {
                                    "type": "string",
                                    "description": "A single annotation value.",
                                    "maxLength": 4096
                                  },
                                  "x-go-type-skip-optional-pointer": true,
                                  "x-order": 2,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "annotations,omitempty"
                                  }
                                },
                                "loadBalancerClass": {
                                  "type": "string",
                                  "description": "Load-balancer implementation to use. Valid only when type is LoadBalancer.",
                                  "minLength": 1,
                                  "maxLength": 253,
                                  "x-order": 3,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "loadBalancerClass,omitempty"
                                  }
                                },
                                "loadBalancerSourceRanges": {
                                  "type": "array",
                                  "description": "CIDR ranges allowed to reach the broker. Valid only when type is LoadBalancer.",
                                  "maxItems": 100,
                                  "items": {
                                    "type": "string",
                                    "description": "A single CIDR range.",
                                    "minLength": 1,
                                    "maxLength": 64
                                  },
                                  "x-go-type-skip-optional-pointer": true,
                                  "x-order": 4,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "loadBalancerSourceRanges,omitempty"
                                  }
                                },
                                "externalEndpointOverride": {
                                  "type": "string",
                                  "description": "Pins the advertised external broker endpoint as \"host:port\" when auto-derivation is undesirable: an ingress or gateway in front of the broker, an air-gapped topology, or NAT. The nats:// scheme is added by consumers.",
                                  "minLength": 3,
                                  "maxLength": 262,
                                  "pattern": "^([A-Za-z0-9.-]+|\\[[A-Fa-f0-9:.]+\\]):[0-9]{1,5}$",
                                  "x-order": 5,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "externalEndpointOverride,omitempty"
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      "x-order": 2,
                      "x-oapi-codegen-extra-tags": {
                        "json": "default,omitempty"
                      }
                    },
                    "effective": {
                      "$id": "https://schemas.meshery.io/controllers_config.yaml",
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "title": "MesheryControllersConfig",
                      "description": "Deployment and runtime configuration for the Meshery controllers that manage a Kubernetes connection: Meshery Operator, MeshSync, and Meshery Broker. The same document shape is used at two layers. As a server-wide default it declares how Meshery Server deploys and configures the controllers for every managed cluster. As a per-connection override, stored in the connection's metadata, it overrides the server-wide default for a single connection. Every configuration field is optional: an absent field inherits the value from the next layer (per-connection override, then server-wide default, then built-in default). The only required field is the server-stamped schemaVersion discriminator, which identifies the document revision for future migrations. Learn more at https://docs.meshery.io/concepts/architecture",
                      "additionalProperties": false,
                      "type": "object",
                      "required": [
                        "schemaVersion"
                      ],
                      "properties": {
                        "schemaVersion": {
                          "description": "Specifies the version of the schema used for this configuration document.",
                          "default": "controllers.meshery.io/v1alpha1",
                          "x-order": 0,
                          "x-oapi-codegen-extra-tags": {
                            "json": "schemaVersion"
                          },
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
                        "operator": {
                          "description": "Configuration for the Meshery Operator on the managed cluster.",
                          "x-order": 1,
                          "x-oapi-codegen-extra-tags": {
                            "json": "operator,omitempty"
                          },
                          "type": "object",
                          "additionalProperties": false,
                          "properties": {
                            "deploymentMode": {
                              "type": "string",
                              "description": "How MeshSync is deployed for the connection. \"operator\" installs Meshery Operator into the cluster, which runs MeshSync and Meshery Broker there; \"embedded\" runs MeshSync in-process inside Meshery Server and installs nothing into the cluster.",
                              "enum": [
                                "operator",
                                "embedded"
                              ],
                              "x-order": 1,
                              "x-oapi-codegen-extra-tags": {
                                "json": "deploymentMode,omitempty"
                              }
                            },
                            "version": {
                              "type": "string",
                              "description": "Meshery Operator Helm chart version to deploy. When absent, the operator version tracks the Meshery Server release.",
                              "minLength": 1,
                              "maxLength": 128,
                              "x-order": 2,
                              "x-oapi-codegen-extra-tags": {
                                "json": "version,omitempty"
                              }
                            }
                          }
                        },
                        "meshsync": {
                          "description": "Configuration for the MeshSync agent on the managed cluster.",
                          "x-order": 2,
                          "x-oapi-codegen-extra-tags": {
                            "json": "meshsync,omitempty"
                          },
                          "type": "object",
                          "additionalProperties": false,
                          "properties": {
                            "version": {
                              "type": "string",
                              "description": "MeshSync image tag to run (for example \"v1.0.2\" or \"stable-latest\"). Applies to operator deployment mode only; in embedded mode MeshSync runs at the version compiled into Meshery Server. Secret redaction and broker content deduplication require MeshSync v1.0.2 or newer.",
                              "minLength": 1,
                              "maxLength": 128,
                              "x-order": 1,
                              "x-oapi-codegen-extra-tags": {
                                "json": "version,omitempty"
                              }
                            },
                            "replicas": {
                              "type": "integer",
                              "description": "Number of MeshSync replicas (MeshSync custom resource spec.size). Applies to operator deployment mode only.",
                              "minimum": 1,
                              "maximum": 10,
                              "x-order": 2,
                              "x-oapi-codegen-extra-tags": {
                                "json": "replicas,omitempty"
                              }
                            },
                            "watchList": {
                              "description": "Discovery scope for MeshSync, as a whitelist or a blacklist of Kubernetes resource types.",
                              "x-order": 3,
                              "x-oapi-codegen-extra-tags": {
                                "json": "watchList,omitempty"
                              },
                              "type": "object",
                              "additionalProperties": false,
                              "not": {
                                "required": [
                                  "whitelist",
                                  "blacklist"
                                ]
                              },
                              "properties": {
                                "whitelist": {
                                  "type": "array",
                                  "description": "Resource types MeshSync watches, each with the event types to subscribe to. Mutually exclusive with blacklist.",
                                  "maxItems": 1000,
                                  "items": {
                                    "type": "object",
                                    "description": "A single watched Kubernetes resource type and the event types MeshSync subscribes to for it.",
                                    "additionalProperties": false,
                                    "required": [
                                      "resource"
                                    ],
                                    "properties": {
                                      "resource": {
                                        "type": "string",
                                        "description": "Resource key in \"<plural>.<version>.<group>\" form (for example \"pods.v1.\" for core-group pods or \"deployments.v1.apps\").",
                                        "minLength": 1,
                                        "maxLength": 512,
                                        "pattern": "^[a-z0-9-]+\\.[a-z0-9]+\\.[a-z0-9.-]*$",
                                        "x-go-type-skip-optional-pointer": true,
                                        "x-order": 1,
                                        "x-oapi-codegen-extra-tags": {
                                          "json": "resource"
                                        }
                                      },
                                      "events": {
                                        "type": "array",
                                        "description": "Event types to subscribe to for this resource. Empty or absent subscribes to all event types.",
                                        "maxItems": 3,
                                        "items": {
                                          "type": "string",
                                          "description": "A single Kubernetes watch event type.",
                                          "enum": [
                                            "ADDED",
                                            "MODIFIED",
                                            "DELETED"
                                          ]
                                        },
                                        "x-go-type-skip-optional-pointer": true,
                                        "x-order": 2,
                                        "x-oapi-codegen-extra-tags": {
                                          "json": "events,omitempty"
                                        }
                                      }
                                    }
                                  },
                                  "x-go-type-skip-optional-pointer": true,
                                  "x-order": 1,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "whitelist,omitempty"
                                  }
                                },
                                "blacklist": {
                                  "type": "array",
                                  "description": "Resource types excluded from MeshSync's default discovery scope, in \"<plural>.<version>.<group>\" form (for example \"pods.v1.\" or \"deployments.v1.apps\"). Mutually exclusive with whitelist.",
                                  "maxItems": 1000,
                                  "items": {
                                    "type": "string",
                                    "description": "A single resource key in \"<plural>.<version>.<group>\" form.",
                                    "minLength": 1,
                                    "maxLength": 512,
                                    "pattern": "^[a-z0-9-]+\\.[a-z0-9]+\\.[a-z0-9.-]*$"
                                  },
                                  "x-go-type-skip-optional-pointer": true,
                                  "x-order": 2,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "blacklist,omitempty"
                                  }
                                }
                              }
                            },
                            "outputNamespaces": {
                              "type": "array",
                              "description": "Namespaces whose resources MeshSync publishes. Empty or absent publishes resources from all namespaces. Discovery scope is unaffected; this filters only what is published.",
                              "maxItems": 500,
                              "items": {
                                "type": "string",
                                "description": "A single Kubernetes namespace name (DNS-1123 label).",
                                "minLength": 1,
                                "maxLength": 63,
                                "pattern": "^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
                              },
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 4,
                              "x-oapi-codegen-extra-tags": {
                                "json": "outputNamespaces,omitempty"
                              }
                            },
                            "outputResources": {
                              "type": "array",
                              "description": "Resource types MeshSync publishes (lowercase Kubernetes kinds, for example \"pod\" or \"deployment\"). Empty or absent publishes all discovered resource types. Discovery scope is unaffected; this filters only what is published.",
                              "maxItems": 500,
                              "items": {
                                "type": "string",
                                "description": "A single lowercase Kubernetes resource kind.",
                                "minLength": 1,
                                "maxLength": 128,
                                "pattern": "^[a-z0-9-]+$"
                              },
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 5,
                              "x-oapi-codegen-extra-tags": {
                                "json": "outputResources,omitempty"
                              }
                            },
                            "redactSecrets": {
                              "type": "boolean",
                              "description": "When true, MeshSync redacts Kubernetes Secret data values (keys are preserved) before publishing. Requires MeshSync v1.0.2 or newer. Off by default; enabling is recommended when Secrets are within the discovery scope.",
                              "x-order": 6,
                              "x-oapi-codegen-extra-tags": {
                                "json": "redactSecrets,omitempty"
                              }
                            },
                            "brokerContentDedup": {
                              "type": "boolean",
                              "description": "When true, MeshSync suppresses byte-identical republishes of a resource to the broker. Requires MeshSync v1.0.2 or newer. Off by default.",
                              "x-order": 7,
                              "x-oapi-codegen-extra-tags": {
                                "json": "brokerContentDedup,omitempty"
                              }
                            },
                            "debugLogging": {
                              "type": "boolean",
                              "description": "When true, MeshSync runs with debug-level logging (DEBUG environment variable).",
                              "x-order": 8,
                              "x-oapi-codegen-extra-tags": {
                                "json": "debugLogging,omitempty"
                              }
                            }
                          }
                        },
                        "broker": {
                          "description": "Configuration for the Meshery Broker (NATS) on the managed cluster.",
                          "x-order": 3,
                          "x-oapi-codegen-extra-tags": {
                            "json": "broker,omitempty"
                          },
                          "type": "object",
                          "additionalProperties": false,
                          "properties": {
                            "version": {
                              "type": "string",
                              "description": "NATS server image tag to run (Broker custom resource spec.version). When absent, the operator's bundled default NATS version is used.",
                              "minLength": 1,
                              "maxLength": 128,
                              "x-order": 1,
                              "x-oapi-codegen-extra-tags": {
                                "json": "version,omitempty"
                              }
                            },
                            "replicas": {
                              "type": "integer",
                              "description": "Number of NATS server replicas (Broker custom resource spec.size).",
                              "minimum": 1,
                              "maximum": 10,
                              "x-order": 2,
                              "x-oapi-codegen-extra-tags": {
                                "json": "replicas,omitempty"
                              }
                            },
                            "service": {
                              "description": "How the broker is exposed on the network. Service changes reconcile in place without restarting broker pods.",
                              "x-order": 3,
                              "x-oapi-codegen-extra-tags": {
                                "json": "service,omitempty"
                              },
                              "type": "object",
                              "additionalProperties": false,
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "Kubernetes Service type for client access. When absent the broker stays cluster-internal (ClusterIP). LoadBalancer acquires a cloud load-balancer address; NodePort exposes the broker on node IPs.",
                                  "enum": [
                                    "ClusterIP",
                                    "NodePort",
                                    "LoadBalancer"
                                  ],
                                  "x-order": 1,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "type,omitempty"
                                  }
                                },
                                "annotations": {
                                  "type": "object",
                                  "description": "Annotations merged onto the client Service (cloud load-balancer hints, MetalLB address pools, internal-LB switches).",
                                  "additionalProperties": {
                                    "type": "string",
                                    "description": "A single annotation value.",
                                    "maxLength": 4096
                                  },
                                  "x-go-type-skip-optional-pointer": true,
                                  "x-order": 2,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "annotations,omitempty"
                                  }
                                },
                                "loadBalancerClass": {
                                  "type": "string",
                                  "description": "Load-balancer implementation to use. Valid only when type is LoadBalancer.",
                                  "minLength": 1,
                                  "maxLength": 253,
                                  "x-order": 3,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "loadBalancerClass,omitempty"
                                  }
                                },
                                "loadBalancerSourceRanges": {
                                  "type": "array",
                                  "description": "CIDR ranges allowed to reach the broker. Valid only when type is LoadBalancer.",
                                  "maxItems": 100,
                                  "items": {
                                    "type": "string",
                                    "description": "A single CIDR range.",
                                    "minLength": 1,
                                    "maxLength": 64
                                  },
                                  "x-go-type-skip-optional-pointer": true,
                                  "x-order": 4,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "loadBalancerSourceRanges,omitempty"
                                  }
                                },
                                "externalEndpointOverride": {
                                  "type": "string",
                                  "description": "Pins the advertised external broker endpoint as \"host:port\" when auto-derivation is undesirable: an ingress or gateway in front of the broker, an air-gapped topology, or NAT. The nats:// scheme is added by consumers.",
                                  "minLength": 3,
                                  "maxLength": 262,
                                  "pattern": "^([A-Za-z0-9.-]+|\\[[A-Fa-f0-9:.]+\\]):[0-9]{1,5}$",
                                  "x-order": 5,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "externalEndpointOverride,omitempty"
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      "x-order": 3,
                      "x-oapi-codegen-extra-tags": {
                        "json": "effective"
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
      "connectionId": {
        "name": "connectionId",
        "in": "path",
        "description": "Kubernetes connection ID.",
        "schema": {
          "type": "string",
          "format": "uuid",
          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
          "x-go-type": "uuid.UUID",
          "x-go-type-import": {
            "path": "github.com/gofrs/uuid"
          }
        },
        "required": true
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
      "MesheryControllersConfig": {
        "$id": "https://schemas.meshery.io/controllers_config.yaml",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "MesheryControllersConfig",
        "description": "Deployment and runtime configuration for the Meshery controllers that manage a Kubernetes connection: Meshery Operator, MeshSync, and Meshery Broker. The same document shape is used at two layers. As a server-wide default it declares how Meshery Server deploys and configures the controllers for every managed cluster. As a per-connection override, stored in the connection's metadata, it overrides the server-wide default for a single connection. Every configuration field is optional: an absent field inherits the value from the next layer (per-connection override, then server-wide default, then built-in default). The only required field is the server-stamped schemaVersion discriminator, which identifies the document revision for future migrations. Learn more at https://docs.meshery.io/concepts/architecture",
        "additionalProperties": false,
        "type": "object",
        "required": [
          "schemaVersion"
        ],
        "properties": {
          "schemaVersion": {
            "description": "Specifies the version of the schema used for this configuration document.",
            "default": "controllers.meshery.io/v1alpha1",
            "x-order": 0,
            "x-oapi-codegen-extra-tags": {
              "json": "schemaVersion"
            },
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
          "operator": {
            "description": "Configuration for the Meshery Operator on the managed cluster.",
            "x-order": 1,
            "x-oapi-codegen-extra-tags": {
              "json": "operator,omitempty"
            },
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "deploymentMode": {
                "type": "string",
                "description": "How MeshSync is deployed for the connection. \"operator\" installs Meshery Operator into the cluster, which runs MeshSync and Meshery Broker there; \"embedded\" runs MeshSync in-process inside Meshery Server and installs nothing into the cluster.",
                "enum": [
                  "operator",
                  "embedded"
                ],
                "x-order": 1,
                "x-oapi-codegen-extra-tags": {
                  "json": "deploymentMode,omitempty"
                }
              },
              "version": {
                "type": "string",
                "description": "Meshery Operator Helm chart version to deploy. When absent, the operator version tracks the Meshery Server release.",
                "minLength": 1,
                "maxLength": 128,
                "x-order": 2,
                "x-oapi-codegen-extra-tags": {
                  "json": "version,omitempty"
                }
              }
            }
          },
          "meshsync": {
            "description": "Configuration for the MeshSync agent on the managed cluster.",
            "x-order": 2,
            "x-oapi-codegen-extra-tags": {
              "json": "meshsync,omitempty"
            },
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "version": {
                "type": "string",
                "description": "MeshSync image tag to run (for example \"v1.0.2\" or \"stable-latest\"). Applies to operator deployment mode only; in embedded mode MeshSync runs at the version compiled into Meshery Server. Secret redaction and broker content deduplication require MeshSync v1.0.2 or newer.",
                "minLength": 1,
                "maxLength": 128,
                "x-order": 1,
                "x-oapi-codegen-extra-tags": {
                  "json": "version,omitempty"
                }
              },
              "replicas": {
                "type": "integer",
                "description": "Number of MeshSync replicas (MeshSync custom resource spec.size). Applies to operator deployment mode only.",
                "minimum": 1,
                "maximum": 10,
                "x-order": 2,
                "x-oapi-codegen-extra-tags": {
                  "json": "replicas,omitempty"
                }
              },
              "watchList": {
                "description": "Discovery scope for MeshSync, as a whitelist or a blacklist of Kubernetes resource types.",
                "x-order": 3,
                "x-oapi-codegen-extra-tags": {
                  "json": "watchList,omitempty"
                },
                "type": "object",
                "additionalProperties": false,
                "not": {
                  "required": [
                    "whitelist",
                    "blacklist"
                  ]
                },
                "properties": {
                  "whitelist": {
                    "type": "array",
                    "description": "Resource types MeshSync watches, each with the event types to subscribe to. Mutually exclusive with blacklist.",
                    "maxItems": 1000,
                    "items": {
                      "type": "object",
                      "description": "A single watched Kubernetes resource type and the event types MeshSync subscribes to for it.",
                      "additionalProperties": false,
                      "required": [
                        "resource"
                      ],
                      "properties": {
                        "resource": {
                          "type": "string",
                          "description": "Resource key in \"<plural>.<version>.<group>\" form (for example \"pods.v1.\" for core-group pods or \"deployments.v1.apps\").",
                          "minLength": 1,
                          "maxLength": 512,
                          "pattern": "^[a-z0-9-]+\\.[a-z0-9]+\\.[a-z0-9.-]*$",
                          "x-go-type-skip-optional-pointer": true,
                          "x-order": 1,
                          "x-oapi-codegen-extra-tags": {
                            "json": "resource"
                          }
                        },
                        "events": {
                          "type": "array",
                          "description": "Event types to subscribe to for this resource. Empty or absent subscribes to all event types.",
                          "maxItems": 3,
                          "items": {
                            "type": "string",
                            "description": "A single Kubernetes watch event type.",
                            "enum": [
                              "ADDED",
                              "MODIFIED",
                              "DELETED"
                            ]
                          },
                          "x-go-type-skip-optional-pointer": true,
                          "x-order": 2,
                          "x-oapi-codegen-extra-tags": {
                            "json": "events,omitempty"
                          }
                        }
                      }
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-order": 1,
                    "x-oapi-codegen-extra-tags": {
                      "json": "whitelist,omitempty"
                    }
                  },
                  "blacklist": {
                    "type": "array",
                    "description": "Resource types excluded from MeshSync's default discovery scope, in \"<plural>.<version>.<group>\" form (for example \"pods.v1.\" or \"deployments.v1.apps\"). Mutually exclusive with whitelist.",
                    "maxItems": 1000,
                    "items": {
                      "type": "string",
                      "description": "A single resource key in \"<plural>.<version>.<group>\" form.",
                      "minLength": 1,
                      "maxLength": 512,
                      "pattern": "^[a-z0-9-]+\\.[a-z0-9]+\\.[a-z0-9.-]*$"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-order": 2,
                    "x-oapi-codegen-extra-tags": {
                      "json": "blacklist,omitempty"
                    }
                  }
                }
              },
              "outputNamespaces": {
                "type": "array",
                "description": "Namespaces whose resources MeshSync publishes. Empty or absent publishes resources from all namespaces. Discovery scope is unaffected; this filters only what is published.",
                "maxItems": 500,
                "items": {
                  "type": "string",
                  "description": "A single Kubernetes namespace name (DNS-1123 label).",
                  "minLength": 1,
                  "maxLength": 63,
                  "pattern": "^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
                },
                "x-go-type-skip-optional-pointer": true,
                "x-order": 4,
                "x-oapi-codegen-extra-tags": {
                  "json": "outputNamespaces,omitempty"
                }
              },
              "outputResources": {
                "type": "array",
                "description": "Resource types MeshSync publishes (lowercase Kubernetes kinds, for example \"pod\" or \"deployment\"). Empty or absent publishes all discovered resource types. Discovery scope is unaffected; this filters only what is published.",
                "maxItems": 500,
                "items": {
                  "type": "string",
                  "description": "A single lowercase Kubernetes resource kind.",
                  "minLength": 1,
                  "maxLength": 128,
                  "pattern": "^[a-z0-9-]+$"
                },
                "x-go-type-skip-optional-pointer": true,
                "x-order": 5,
                "x-oapi-codegen-extra-tags": {
                  "json": "outputResources,omitempty"
                }
              },
              "redactSecrets": {
                "type": "boolean",
                "description": "When true, MeshSync redacts Kubernetes Secret data values (keys are preserved) before publishing. Requires MeshSync v1.0.2 or newer. Off by default; enabling is recommended when Secrets are within the discovery scope.",
                "x-order": 6,
                "x-oapi-codegen-extra-tags": {
                  "json": "redactSecrets,omitempty"
                }
              },
              "brokerContentDedup": {
                "type": "boolean",
                "description": "When true, MeshSync suppresses byte-identical republishes of a resource to the broker. Requires MeshSync v1.0.2 or newer. Off by default.",
                "x-order": 7,
                "x-oapi-codegen-extra-tags": {
                  "json": "brokerContentDedup,omitempty"
                }
              },
              "debugLogging": {
                "type": "boolean",
                "description": "When true, MeshSync runs with debug-level logging (DEBUG environment variable).",
                "x-order": 8,
                "x-oapi-codegen-extra-tags": {
                  "json": "debugLogging,omitempty"
                }
              }
            }
          },
          "broker": {
            "description": "Configuration for the Meshery Broker (NATS) on the managed cluster.",
            "x-order": 3,
            "x-oapi-codegen-extra-tags": {
              "json": "broker,omitempty"
            },
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "version": {
                "type": "string",
                "description": "NATS server image tag to run (Broker custom resource spec.version). When absent, the operator's bundled default NATS version is used.",
                "minLength": 1,
                "maxLength": 128,
                "x-order": 1,
                "x-oapi-codegen-extra-tags": {
                  "json": "version,omitempty"
                }
              },
              "replicas": {
                "type": "integer",
                "description": "Number of NATS server replicas (Broker custom resource spec.size).",
                "minimum": 1,
                "maximum": 10,
                "x-order": 2,
                "x-oapi-codegen-extra-tags": {
                  "json": "replicas,omitempty"
                }
              },
              "service": {
                "description": "How the broker is exposed on the network. Service changes reconcile in place without restarting broker pods.",
                "x-order": 3,
                "x-oapi-codegen-extra-tags": {
                  "json": "service,omitempty"
                },
                "type": "object",
                "additionalProperties": false,
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Kubernetes Service type for client access. When absent the broker stays cluster-internal (ClusterIP). LoadBalancer acquires a cloud load-balancer address; NodePort exposes the broker on node IPs.",
                    "enum": [
                      "ClusterIP",
                      "NodePort",
                      "LoadBalancer"
                    ],
                    "x-order": 1,
                    "x-oapi-codegen-extra-tags": {
                      "json": "type,omitempty"
                    }
                  },
                  "annotations": {
                    "type": "object",
                    "description": "Annotations merged onto the client Service (cloud load-balancer hints, MetalLB address pools, internal-LB switches).",
                    "additionalProperties": {
                      "type": "string",
                      "description": "A single annotation value.",
                      "maxLength": 4096
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-order": 2,
                    "x-oapi-codegen-extra-tags": {
                      "json": "annotations,omitempty"
                    }
                  },
                  "loadBalancerClass": {
                    "type": "string",
                    "description": "Load-balancer implementation to use. Valid only when type is LoadBalancer.",
                    "minLength": 1,
                    "maxLength": 253,
                    "x-order": 3,
                    "x-oapi-codegen-extra-tags": {
                      "json": "loadBalancerClass,omitempty"
                    }
                  },
                  "loadBalancerSourceRanges": {
                    "type": "array",
                    "description": "CIDR ranges allowed to reach the broker. Valid only when type is LoadBalancer.",
                    "maxItems": 100,
                    "items": {
                      "type": "string",
                      "description": "A single CIDR range.",
                      "minLength": 1,
                      "maxLength": 64
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-order": 4,
                    "x-oapi-codegen-extra-tags": {
                      "json": "loadBalancerSourceRanges,omitempty"
                    }
                  },
                  "externalEndpointOverride": {
                    "type": "string",
                    "description": "Pins the advertised external broker endpoint as \"host:port\" when auto-derivation is undesirable: an ingress or gateway in front of the broker, an air-gapped topology, or NAT. The nats:// scheme is added by consumers.",
                    "minLength": 3,
                    "maxLength": 262,
                    "pattern": "^([A-Za-z0-9.-]+|\\[[A-Fa-f0-9:.]+\\]):[0-9]{1,5}$",
                    "x-order": 5,
                    "x-oapi-codegen-extra-tags": {
                      "json": "externalEndpointOverride,omitempty"
                    }
                  }
                }
              }
            }
          }
        }
      },
      "ConnectionControllersConfig": {
        "type": "object",
        "description": "Layered view of the controllers configuration for a single Kubernetes connection. Exposes each precedence layer so clients can indicate, per field, whether the effective value is inherited from the server-wide default or overridden on the connection.",
        "additionalProperties": false,
        "required": [
          "effective"
        ],
        "properties": {
          "override": {
            "$id": "https://schemas.meshery.io/controllers_config.yaml",
            "$schema": "http://json-schema.org/draft-07/schema#",
            "title": "MesheryControllersConfig",
            "description": "Deployment and runtime configuration for the Meshery controllers that manage a Kubernetes connection: Meshery Operator, MeshSync, and Meshery Broker. The same document shape is used at two layers. As a server-wide default it declares how Meshery Server deploys and configures the controllers for every managed cluster. As a per-connection override, stored in the connection's metadata, it overrides the server-wide default for a single connection. Every configuration field is optional: an absent field inherits the value from the next layer (per-connection override, then server-wide default, then built-in default). The only required field is the server-stamped schemaVersion discriminator, which identifies the document revision for future migrations. Learn more at https://docs.meshery.io/concepts/architecture",
            "additionalProperties": false,
            "type": "object",
            "required": [
              "schemaVersion"
            ],
            "properties": {
              "schemaVersion": {
                "description": "Specifies the version of the schema used for this configuration document.",
                "default": "controllers.meshery.io/v1alpha1",
                "x-order": 0,
                "x-oapi-codegen-extra-tags": {
                  "json": "schemaVersion"
                },
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
              "operator": {
                "description": "Configuration for the Meshery Operator on the managed cluster.",
                "x-order": 1,
                "x-oapi-codegen-extra-tags": {
                  "json": "operator,omitempty"
                },
                "type": "object",
                "additionalProperties": false,
                "properties": {
                  "deploymentMode": {
                    "type": "string",
                    "description": "How MeshSync is deployed for the connection. \"operator\" installs Meshery Operator into the cluster, which runs MeshSync and Meshery Broker there; \"embedded\" runs MeshSync in-process inside Meshery Server and installs nothing into the cluster.",
                    "enum": [
                      "operator",
                      "embedded"
                    ],
                    "x-order": 1,
                    "x-oapi-codegen-extra-tags": {
                      "json": "deploymentMode,omitempty"
                    }
                  },
                  "version": {
                    "type": "string",
                    "description": "Meshery Operator Helm chart version to deploy. When absent, the operator version tracks the Meshery Server release.",
                    "minLength": 1,
                    "maxLength": 128,
                    "x-order": 2,
                    "x-oapi-codegen-extra-tags": {
                      "json": "version,omitempty"
                    }
                  }
                }
              },
              "meshsync": {
                "description": "Configuration for the MeshSync agent on the managed cluster.",
                "x-order": 2,
                "x-oapi-codegen-extra-tags": {
                  "json": "meshsync,omitempty"
                },
                "type": "object",
                "additionalProperties": false,
                "properties": {
                  "version": {
                    "type": "string",
                    "description": "MeshSync image tag to run (for example \"v1.0.2\" or \"stable-latest\"). Applies to operator deployment mode only; in embedded mode MeshSync runs at the version compiled into Meshery Server. Secret redaction and broker content deduplication require MeshSync v1.0.2 or newer.",
                    "minLength": 1,
                    "maxLength": 128,
                    "x-order": 1,
                    "x-oapi-codegen-extra-tags": {
                      "json": "version,omitempty"
                    }
                  },
                  "replicas": {
                    "type": "integer",
                    "description": "Number of MeshSync replicas (MeshSync custom resource spec.size). Applies to operator deployment mode only.",
                    "minimum": 1,
                    "maximum": 10,
                    "x-order": 2,
                    "x-oapi-codegen-extra-tags": {
                      "json": "replicas,omitempty"
                    }
                  },
                  "watchList": {
                    "description": "Discovery scope for MeshSync, as a whitelist or a blacklist of Kubernetes resource types.",
                    "x-order": 3,
                    "x-oapi-codegen-extra-tags": {
                      "json": "watchList,omitempty"
                    },
                    "type": "object",
                    "additionalProperties": false,
                    "not": {
                      "required": [
                        "whitelist",
                        "blacklist"
                      ]
                    },
                    "properties": {
                      "whitelist": {
                        "type": "array",
                        "description": "Resource types MeshSync watches, each with the event types to subscribe to. Mutually exclusive with blacklist.",
                        "maxItems": 1000,
                        "items": {
                          "type": "object",
                          "description": "A single watched Kubernetes resource type and the event types MeshSync subscribes to for it.",
                          "additionalProperties": false,
                          "required": [
                            "resource"
                          ],
                          "properties": {
                            "resource": {
                              "type": "string",
                              "description": "Resource key in \"<plural>.<version>.<group>\" form (for example \"pods.v1.\" for core-group pods or \"deployments.v1.apps\").",
                              "minLength": 1,
                              "maxLength": 512,
                              "pattern": "^[a-z0-9-]+\\.[a-z0-9]+\\.[a-z0-9.-]*$",
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 1,
                              "x-oapi-codegen-extra-tags": {
                                "json": "resource"
                              }
                            },
                            "events": {
                              "type": "array",
                              "description": "Event types to subscribe to for this resource. Empty or absent subscribes to all event types.",
                              "maxItems": 3,
                              "items": {
                                "type": "string",
                                "description": "A single Kubernetes watch event type.",
                                "enum": [
                                  "ADDED",
                                  "MODIFIED",
                                  "DELETED"
                                ]
                              },
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 2,
                              "x-oapi-codegen-extra-tags": {
                                "json": "events,omitempty"
                              }
                            }
                          }
                        },
                        "x-go-type-skip-optional-pointer": true,
                        "x-order": 1,
                        "x-oapi-codegen-extra-tags": {
                          "json": "whitelist,omitempty"
                        }
                      },
                      "blacklist": {
                        "type": "array",
                        "description": "Resource types excluded from MeshSync's default discovery scope, in \"<plural>.<version>.<group>\" form (for example \"pods.v1.\" or \"deployments.v1.apps\"). Mutually exclusive with whitelist.",
                        "maxItems": 1000,
                        "items": {
                          "type": "string",
                          "description": "A single resource key in \"<plural>.<version>.<group>\" form.",
                          "minLength": 1,
                          "maxLength": 512,
                          "pattern": "^[a-z0-9-]+\\.[a-z0-9]+\\.[a-z0-9.-]*$"
                        },
                        "x-go-type-skip-optional-pointer": true,
                        "x-order": 2,
                        "x-oapi-codegen-extra-tags": {
                          "json": "blacklist,omitempty"
                        }
                      }
                    }
                  },
                  "outputNamespaces": {
                    "type": "array",
                    "description": "Namespaces whose resources MeshSync publishes. Empty or absent publishes resources from all namespaces. Discovery scope is unaffected; this filters only what is published.",
                    "maxItems": 500,
                    "items": {
                      "type": "string",
                      "description": "A single Kubernetes namespace name (DNS-1123 label).",
                      "minLength": 1,
                      "maxLength": 63,
                      "pattern": "^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-order": 4,
                    "x-oapi-codegen-extra-tags": {
                      "json": "outputNamespaces,omitempty"
                    }
                  },
                  "outputResources": {
                    "type": "array",
                    "description": "Resource types MeshSync publishes (lowercase Kubernetes kinds, for example \"pod\" or \"deployment\"). Empty or absent publishes all discovered resource types. Discovery scope is unaffected; this filters only what is published.",
                    "maxItems": 500,
                    "items": {
                      "type": "string",
                      "description": "A single lowercase Kubernetes resource kind.",
                      "minLength": 1,
                      "maxLength": 128,
                      "pattern": "^[a-z0-9-]+$"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-order": 5,
                    "x-oapi-codegen-extra-tags": {
                      "json": "outputResources,omitempty"
                    }
                  },
                  "redactSecrets": {
                    "type": "boolean",
                    "description": "When true, MeshSync redacts Kubernetes Secret data values (keys are preserved) before publishing. Requires MeshSync v1.0.2 or newer. Off by default; enabling is recommended when Secrets are within the discovery scope.",
                    "x-order": 6,
                    "x-oapi-codegen-extra-tags": {
                      "json": "redactSecrets,omitempty"
                    }
                  },
                  "brokerContentDedup": {
                    "type": "boolean",
                    "description": "When true, MeshSync suppresses byte-identical republishes of a resource to the broker. Requires MeshSync v1.0.2 or newer. Off by default.",
                    "x-order": 7,
                    "x-oapi-codegen-extra-tags": {
                      "json": "brokerContentDedup,omitempty"
                    }
                  },
                  "debugLogging": {
                    "type": "boolean",
                    "description": "When true, MeshSync runs with debug-level logging (DEBUG environment variable).",
                    "x-order": 8,
                    "x-oapi-codegen-extra-tags": {
                      "json": "debugLogging,omitempty"
                    }
                  }
                }
              },
              "broker": {
                "description": "Configuration for the Meshery Broker (NATS) on the managed cluster.",
                "x-order": 3,
                "x-oapi-codegen-extra-tags": {
                  "json": "broker,omitempty"
                },
                "type": "object",
                "additionalProperties": false,
                "properties": {
                  "version": {
                    "type": "string",
                    "description": "NATS server image tag to run (Broker custom resource spec.version). When absent, the operator's bundled default NATS version is used.",
                    "minLength": 1,
                    "maxLength": 128,
                    "x-order": 1,
                    "x-oapi-codegen-extra-tags": {
                      "json": "version,omitempty"
                    }
                  },
                  "replicas": {
                    "type": "integer",
                    "description": "Number of NATS server replicas (Broker custom resource spec.size).",
                    "minimum": 1,
                    "maximum": 10,
                    "x-order": 2,
                    "x-oapi-codegen-extra-tags": {
                      "json": "replicas,omitempty"
                    }
                  },
                  "service": {
                    "description": "How the broker is exposed on the network. Service changes reconcile in place without restarting broker pods.",
                    "x-order": 3,
                    "x-oapi-codegen-extra-tags": {
                      "json": "service,omitempty"
                    },
                    "type": "object",
                    "additionalProperties": false,
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "Kubernetes Service type for client access. When absent the broker stays cluster-internal (ClusterIP). LoadBalancer acquires a cloud load-balancer address; NodePort exposes the broker on node IPs.",
                        "enum": [
                          "ClusterIP",
                          "NodePort",
                          "LoadBalancer"
                        ],
                        "x-order": 1,
                        "x-oapi-codegen-extra-tags": {
                          "json": "type,omitempty"
                        }
                      },
                      "annotations": {
                        "type": "object",
                        "description": "Annotations merged onto the client Service (cloud load-balancer hints, MetalLB address pools, internal-LB switches).",
                        "additionalProperties": {
                          "type": "string",
                          "description": "A single annotation value.",
                          "maxLength": 4096
                        },
                        "x-go-type-skip-optional-pointer": true,
                        "x-order": 2,
                        "x-oapi-codegen-extra-tags": {
                          "json": "annotations,omitempty"
                        }
                      },
                      "loadBalancerClass": {
                        "type": "string",
                        "description": "Load-balancer implementation to use. Valid only when type is LoadBalancer.",
                        "minLength": 1,
                        "maxLength": 253,
                        "x-order": 3,
                        "x-oapi-codegen-extra-tags": {
                          "json": "loadBalancerClass,omitempty"
                        }
                      },
                      "loadBalancerSourceRanges": {
                        "type": "array",
                        "description": "CIDR ranges allowed to reach the broker. Valid only when type is LoadBalancer.",
                        "maxItems": 100,
                        "items": {
                          "type": "string",
                          "description": "A single CIDR range.",
                          "minLength": 1,
                          "maxLength": 64
                        },
                        "x-go-type-skip-optional-pointer": true,
                        "x-order": 4,
                        "x-oapi-codegen-extra-tags": {
                          "json": "loadBalancerSourceRanges,omitempty"
                        }
                      },
                      "externalEndpointOverride": {
                        "type": "string",
                        "description": "Pins the advertised external broker endpoint as \"host:port\" when auto-derivation is undesirable: an ingress or gateway in front of the broker, an air-gapped topology, or NAT. The nats:// scheme is added by consumers.",
                        "minLength": 3,
                        "maxLength": 262,
                        "pattern": "^([A-Za-z0-9.-]+|\\[[A-Fa-f0-9:.]+\\]):[0-9]{1,5}$",
                        "x-order": 5,
                        "x-oapi-codegen-extra-tags": {
                          "json": "externalEndpointOverride,omitempty"
                        }
                      }
                    }
                  }
                }
              }
            },
            "x-order": 1,
            "x-oapi-codegen-extra-tags": {
              "json": "override,omitempty"
            }
          },
          "default": {
            "$id": "https://schemas.meshery.io/controllers_config.yaml",
            "$schema": "http://json-schema.org/draft-07/schema#",
            "title": "MesheryControllersConfig",
            "description": "Deployment and runtime configuration for the Meshery controllers that manage a Kubernetes connection: Meshery Operator, MeshSync, and Meshery Broker. The same document shape is used at two layers. As a server-wide default it declares how Meshery Server deploys and configures the controllers for every managed cluster. As a per-connection override, stored in the connection's metadata, it overrides the server-wide default for a single connection. Every configuration field is optional: an absent field inherits the value from the next layer (per-connection override, then server-wide default, then built-in default). The only required field is the server-stamped schemaVersion discriminator, which identifies the document revision for future migrations. Learn more at https://docs.meshery.io/concepts/architecture",
            "additionalProperties": false,
            "type": "object",
            "required": [
              "schemaVersion"
            ],
            "properties": {
              "schemaVersion": {
                "description": "Specifies the version of the schema used for this configuration document.",
                "default": "controllers.meshery.io/v1alpha1",
                "x-order": 0,
                "x-oapi-codegen-extra-tags": {
                  "json": "schemaVersion"
                },
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
              "operator": {
                "description": "Configuration for the Meshery Operator on the managed cluster.",
                "x-order": 1,
                "x-oapi-codegen-extra-tags": {
                  "json": "operator,omitempty"
                },
                "type": "object",
                "additionalProperties": false,
                "properties": {
                  "deploymentMode": {
                    "type": "string",
                    "description": "How MeshSync is deployed for the connection. \"operator\" installs Meshery Operator into the cluster, which runs MeshSync and Meshery Broker there; \"embedded\" runs MeshSync in-process inside Meshery Server and installs nothing into the cluster.",
                    "enum": [
                      "operator",
                      "embedded"
                    ],
                    "x-order": 1,
                    "x-oapi-codegen-extra-tags": {
                      "json": "deploymentMode,omitempty"
                    }
                  },
                  "version": {
                    "type": "string",
                    "description": "Meshery Operator Helm chart version to deploy. When absent, the operator version tracks the Meshery Server release.",
                    "minLength": 1,
                    "maxLength": 128,
                    "x-order": 2,
                    "x-oapi-codegen-extra-tags": {
                      "json": "version,omitempty"
                    }
                  }
                }
              },
              "meshsync": {
                "description": "Configuration for the MeshSync agent on the managed cluster.",
                "x-order": 2,
                "x-oapi-codegen-extra-tags": {
                  "json": "meshsync,omitempty"
                },
                "type": "object",
                "additionalProperties": false,
                "properties": {
                  "version": {
                    "type": "string",
                    "description": "MeshSync image tag to run (for example \"v1.0.2\" or \"stable-latest\"). Applies to operator deployment mode only; in embedded mode MeshSync runs at the version compiled into Meshery Server. Secret redaction and broker content deduplication require MeshSync v1.0.2 or newer.",
                    "minLength": 1,
                    "maxLength": 128,
                    "x-order": 1,
                    "x-oapi-codegen-extra-tags": {
                      "json": "version,omitempty"
                    }
                  },
                  "replicas": {
                    "type": "integer",
                    "description": "Number of MeshSync replicas (MeshSync custom resource spec.size). Applies to operator deployment mode only.",
                    "minimum": 1,
                    "maximum": 10,
                    "x-order": 2,
                    "x-oapi-codegen-extra-tags": {
                      "json": "replicas,omitempty"
                    }
                  },
                  "watchList": {
                    "description": "Discovery scope for MeshSync, as a whitelist or a blacklist of Kubernetes resource types.",
                    "x-order": 3,
                    "x-oapi-codegen-extra-tags": {
                      "json": "watchList,omitempty"
                    },
                    "type": "object",
                    "additionalProperties": false,
                    "not": {
                      "required": [
                        "whitelist",
                        "blacklist"
                      ]
                    },
                    "properties": {
                      "whitelist": {
                        "type": "array",
                        "description": "Resource types MeshSync watches, each with the event types to subscribe to. Mutually exclusive with blacklist.",
                        "maxItems": 1000,
                        "items": {
                          "type": "object",
                          "description": "A single watched Kubernetes resource type and the event types MeshSync subscribes to for it.",
                          "additionalProperties": false,
                          "required": [
                            "resource"
                          ],
                          "properties": {
                            "resource": {
                              "type": "string",
                              "description": "Resource key in \"<plural>.<version>.<group>\" form (for example \"pods.v1.\" for core-group pods or \"deployments.v1.apps\").",
                              "minLength": 1,
                              "maxLength": 512,
                              "pattern": "^[a-z0-9-]+\\.[a-z0-9]+\\.[a-z0-9.-]*$",
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 1,
                              "x-oapi-codegen-extra-tags": {
                                "json": "resource"
                              }
                            },
                            "events": {
                              "type": "array",
                              "description": "Event types to subscribe to for this resource. Empty or absent subscribes to all event types.",
                              "maxItems": 3,
                              "items": {
                                "type": "string",
                                "description": "A single Kubernetes watch event type.",
                                "enum": [
                                  "ADDED",
                                  "MODIFIED",
                                  "DELETED"
                                ]
                              },
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 2,
                              "x-oapi-codegen-extra-tags": {
                                "json": "events,omitempty"
                              }
                            }
                          }
                        },
                        "x-go-type-skip-optional-pointer": true,
                        "x-order": 1,
                        "x-oapi-codegen-extra-tags": {
                          "json": "whitelist,omitempty"
                        }
                      },
                      "blacklist": {
                        "type": "array",
                        "description": "Resource types excluded from MeshSync's default discovery scope, in \"<plural>.<version>.<group>\" form (for example \"pods.v1.\" or \"deployments.v1.apps\"). Mutually exclusive with whitelist.",
                        "maxItems": 1000,
                        "items": {
                          "type": "string",
                          "description": "A single resource key in \"<plural>.<version>.<group>\" form.",
                          "minLength": 1,
                          "maxLength": 512,
                          "pattern": "^[a-z0-9-]+\\.[a-z0-9]+\\.[a-z0-9.-]*$"
                        },
                        "x-go-type-skip-optional-pointer": true,
                        "x-order": 2,
                        "x-oapi-codegen-extra-tags": {
                          "json": "blacklist,omitempty"
                        }
                      }
                    }
                  },
                  "outputNamespaces": {
                    "type": "array",
                    "description": "Namespaces whose resources MeshSync publishes. Empty or absent publishes resources from all namespaces. Discovery scope is unaffected; this filters only what is published.",
                    "maxItems": 500,
                    "items": {
                      "type": "string",
                      "description": "A single Kubernetes namespace name (DNS-1123 label).",
                      "minLength": 1,
                      "maxLength": 63,
                      "pattern": "^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-order": 4,
                    "x-oapi-codegen-extra-tags": {
                      "json": "outputNamespaces,omitempty"
                    }
                  },
                  "outputResources": {
                    "type": "array",
                    "description": "Resource types MeshSync publishes (lowercase Kubernetes kinds, for example \"pod\" or \"deployment\"). Empty or absent publishes all discovered resource types. Discovery scope is unaffected; this filters only what is published.",
                    "maxItems": 500,
                    "items": {
                      "type": "string",
                      "description": "A single lowercase Kubernetes resource kind.",
                      "minLength": 1,
                      "maxLength": 128,
                      "pattern": "^[a-z0-9-]+$"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-order": 5,
                    "x-oapi-codegen-extra-tags": {
                      "json": "outputResources,omitempty"
                    }
                  },
                  "redactSecrets": {
                    "type": "boolean",
                    "description": "When true, MeshSync redacts Kubernetes Secret data values (keys are preserved) before publishing. Requires MeshSync v1.0.2 or newer. Off by default; enabling is recommended when Secrets are within the discovery scope.",
                    "x-order": 6,
                    "x-oapi-codegen-extra-tags": {
                      "json": "redactSecrets,omitempty"
                    }
                  },
                  "brokerContentDedup": {
                    "type": "boolean",
                    "description": "When true, MeshSync suppresses byte-identical republishes of a resource to the broker. Requires MeshSync v1.0.2 or newer. Off by default.",
                    "x-order": 7,
                    "x-oapi-codegen-extra-tags": {
                      "json": "brokerContentDedup,omitempty"
                    }
                  },
                  "debugLogging": {
                    "type": "boolean",
                    "description": "When true, MeshSync runs with debug-level logging (DEBUG environment variable).",
                    "x-order": 8,
                    "x-oapi-codegen-extra-tags": {
                      "json": "debugLogging,omitempty"
                    }
                  }
                }
              },
              "broker": {
                "description": "Configuration for the Meshery Broker (NATS) on the managed cluster.",
                "x-order": 3,
                "x-oapi-codegen-extra-tags": {
                  "json": "broker,omitempty"
                },
                "type": "object",
                "additionalProperties": false,
                "properties": {
                  "version": {
                    "type": "string",
                    "description": "NATS server image tag to run (Broker custom resource spec.version). When absent, the operator's bundled default NATS version is used.",
                    "minLength": 1,
                    "maxLength": 128,
                    "x-order": 1,
                    "x-oapi-codegen-extra-tags": {
                      "json": "version,omitempty"
                    }
                  },
                  "replicas": {
                    "type": "integer",
                    "description": "Number of NATS server replicas (Broker custom resource spec.size).",
                    "minimum": 1,
                    "maximum": 10,
                    "x-order": 2,
                    "x-oapi-codegen-extra-tags": {
                      "json": "replicas,omitempty"
                    }
                  },
                  "service": {
                    "description": "How the broker is exposed on the network. Service changes reconcile in place without restarting broker pods.",
                    "x-order": 3,
                    "x-oapi-codegen-extra-tags": {
                      "json": "service,omitempty"
                    },
                    "type": "object",
                    "additionalProperties": false,
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "Kubernetes Service type for client access. When absent the broker stays cluster-internal (ClusterIP). LoadBalancer acquires a cloud load-balancer address; NodePort exposes the broker on node IPs.",
                        "enum": [
                          "ClusterIP",
                          "NodePort",
                          "LoadBalancer"
                        ],
                        "x-order": 1,
                        "x-oapi-codegen-extra-tags": {
                          "json": "type,omitempty"
                        }
                      },
                      "annotations": {
                        "type": "object",
                        "description": "Annotations merged onto the client Service (cloud load-balancer hints, MetalLB address pools, internal-LB switches).",
                        "additionalProperties": {
                          "type": "string",
                          "description": "A single annotation value.",
                          "maxLength": 4096
                        },
                        "x-go-type-skip-optional-pointer": true,
                        "x-order": 2,
                        "x-oapi-codegen-extra-tags": {
                          "json": "annotations,omitempty"
                        }
                      },
                      "loadBalancerClass": {
                        "type": "string",
                        "description": "Load-balancer implementation to use. Valid only when type is LoadBalancer.",
                        "minLength": 1,
                        "maxLength": 253,
                        "x-order": 3,
                        "x-oapi-codegen-extra-tags": {
                          "json": "loadBalancerClass,omitempty"
                        }
                      },
                      "loadBalancerSourceRanges": {
                        "type": "array",
                        "description": "CIDR ranges allowed to reach the broker. Valid only when type is LoadBalancer.",
                        "maxItems": 100,
                        "items": {
                          "type": "string",
                          "description": "A single CIDR range.",
                          "minLength": 1,
                          "maxLength": 64
                        },
                        "x-go-type-skip-optional-pointer": true,
                        "x-order": 4,
                        "x-oapi-codegen-extra-tags": {
                          "json": "loadBalancerSourceRanges,omitempty"
                        }
                      },
                      "externalEndpointOverride": {
                        "type": "string",
                        "description": "Pins the advertised external broker endpoint as \"host:port\" when auto-derivation is undesirable: an ingress or gateway in front of the broker, an air-gapped topology, or NAT. The nats:// scheme is added by consumers.",
                        "minLength": 3,
                        "maxLength": 262,
                        "pattern": "^([A-Za-z0-9.-]+|\\[[A-Fa-f0-9:.]+\\]):[0-9]{1,5}$",
                        "x-order": 5,
                        "x-oapi-codegen-extra-tags": {
                          "json": "externalEndpointOverride,omitempty"
                        }
                      }
                    }
                  }
                }
              }
            },
            "x-order": 2,
            "x-oapi-codegen-extra-tags": {
              "json": "default,omitempty"
            }
          },
          "effective": {
            "$id": "https://schemas.meshery.io/controllers_config.yaml",
            "$schema": "http://json-schema.org/draft-07/schema#",
            "title": "MesheryControllersConfig",
            "description": "Deployment and runtime configuration for the Meshery controllers that manage a Kubernetes connection: Meshery Operator, MeshSync, and Meshery Broker. The same document shape is used at two layers. As a server-wide default it declares how Meshery Server deploys and configures the controllers for every managed cluster. As a per-connection override, stored in the connection's metadata, it overrides the server-wide default for a single connection. Every configuration field is optional: an absent field inherits the value from the next layer (per-connection override, then server-wide default, then built-in default). The only required field is the server-stamped schemaVersion discriminator, which identifies the document revision for future migrations. Learn more at https://docs.meshery.io/concepts/architecture",
            "additionalProperties": false,
            "type": "object",
            "required": [
              "schemaVersion"
            ],
            "properties": {
              "schemaVersion": {
                "description": "Specifies the version of the schema used for this configuration document.",
                "default": "controllers.meshery.io/v1alpha1",
                "x-order": 0,
                "x-oapi-codegen-extra-tags": {
                  "json": "schemaVersion"
                },
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
              "operator": {
                "description": "Configuration for the Meshery Operator on the managed cluster.",
                "x-order": 1,
                "x-oapi-codegen-extra-tags": {
                  "json": "operator,omitempty"
                },
                "type": "object",
                "additionalProperties": false,
                "properties": {
                  "deploymentMode": {
                    "type": "string",
                    "description": "How MeshSync is deployed for the connection. \"operator\" installs Meshery Operator into the cluster, which runs MeshSync and Meshery Broker there; \"embedded\" runs MeshSync in-process inside Meshery Server and installs nothing into the cluster.",
                    "enum": [
                      "operator",
                      "embedded"
                    ],
                    "x-order": 1,
                    "x-oapi-codegen-extra-tags": {
                      "json": "deploymentMode,omitempty"
                    }
                  },
                  "version": {
                    "type": "string",
                    "description": "Meshery Operator Helm chart version to deploy. When absent, the operator version tracks the Meshery Server release.",
                    "minLength": 1,
                    "maxLength": 128,
                    "x-order": 2,
                    "x-oapi-codegen-extra-tags": {
                      "json": "version,omitempty"
                    }
                  }
                }
              },
              "meshsync": {
                "description": "Configuration for the MeshSync agent on the managed cluster.",
                "x-order": 2,
                "x-oapi-codegen-extra-tags": {
                  "json": "meshsync,omitempty"
                },
                "type": "object",
                "additionalProperties": false,
                "properties": {
                  "version": {
                    "type": "string",
                    "description": "MeshSync image tag to run (for example \"v1.0.2\" or \"stable-latest\"). Applies to operator deployment mode only; in embedded mode MeshSync runs at the version compiled into Meshery Server. Secret redaction and broker content deduplication require MeshSync v1.0.2 or newer.",
                    "minLength": 1,
                    "maxLength": 128,
                    "x-order": 1,
                    "x-oapi-codegen-extra-tags": {
                      "json": "version,omitempty"
                    }
                  },
                  "replicas": {
                    "type": "integer",
                    "description": "Number of MeshSync replicas (MeshSync custom resource spec.size). Applies to operator deployment mode only.",
                    "minimum": 1,
                    "maximum": 10,
                    "x-order": 2,
                    "x-oapi-codegen-extra-tags": {
                      "json": "replicas,omitempty"
                    }
                  },
                  "watchList": {
                    "description": "Discovery scope for MeshSync, as a whitelist or a blacklist of Kubernetes resource types.",
                    "x-order": 3,
                    "x-oapi-codegen-extra-tags": {
                      "json": "watchList,omitempty"
                    },
                    "type": "object",
                    "additionalProperties": false,
                    "not": {
                      "required": [
                        "whitelist",
                        "blacklist"
                      ]
                    },
                    "properties": {
                      "whitelist": {
                        "type": "array",
                        "description": "Resource types MeshSync watches, each with the event types to subscribe to. Mutually exclusive with blacklist.",
                        "maxItems": 1000,
                        "items": {
                          "type": "object",
                          "description": "A single watched Kubernetes resource type and the event types MeshSync subscribes to for it.",
                          "additionalProperties": false,
                          "required": [
                            "resource"
                          ],
                          "properties": {
                            "resource": {
                              "type": "string",
                              "description": "Resource key in \"<plural>.<version>.<group>\" form (for example \"pods.v1.\" for core-group pods or \"deployments.v1.apps\").",
                              "minLength": 1,
                              "maxLength": 512,
                              "pattern": "^[a-z0-9-]+\\.[a-z0-9]+\\.[a-z0-9.-]*$",
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 1,
                              "x-oapi-codegen-extra-tags": {
                                "json": "resource"
                              }
                            },
                            "events": {
                              "type": "array",
                              "description": "Event types to subscribe to for this resource. Empty or absent subscribes to all event types.",
                              "maxItems": 3,
                              "items": {
                                "type": "string",
                                "description": "A single Kubernetes watch event type.",
                                "enum": [
                                  "ADDED",
                                  "MODIFIED",
                                  "DELETED"
                                ]
                              },
                              "x-go-type-skip-optional-pointer": true,
                              "x-order": 2,
                              "x-oapi-codegen-extra-tags": {
                                "json": "events,omitempty"
                              }
                            }
                          }
                        },
                        "x-go-type-skip-optional-pointer": true,
                        "x-order": 1,
                        "x-oapi-codegen-extra-tags": {
                          "json": "whitelist,omitempty"
                        }
                      },
                      "blacklist": {
                        "type": "array",
                        "description": "Resource types excluded from MeshSync's default discovery scope, in \"<plural>.<version>.<group>\" form (for example \"pods.v1.\" or \"deployments.v1.apps\"). Mutually exclusive with whitelist.",
                        "maxItems": 1000,
                        "items": {
                          "type": "string",
                          "description": "A single resource key in \"<plural>.<version>.<group>\" form.",
                          "minLength": 1,
                          "maxLength": 512,
                          "pattern": "^[a-z0-9-]+\\.[a-z0-9]+\\.[a-z0-9.-]*$"
                        },
                        "x-go-type-skip-optional-pointer": true,
                        "x-order": 2,
                        "x-oapi-codegen-extra-tags": {
                          "json": "blacklist,omitempty"
                        }
                      }
                    }
                  },
                  "outputNamespaces": {
                    "type": "array",
                    "description": "Namespaces whose resources MeshSync publishes. Empty or absent publishes resources from all namespaces. Discovery scope is unaffected; this filters only what is published.",
                    "maxItems": 500,
                    "items": {
                      "type": "string",
                      "description": "A single Kubernetes namespace name (DNS-1123 label).",
                      "minLength": 1,
                      "maxLength": 63,
                      "pattern": "^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-order": 4,
                    "x-oapi-codegen-extra-tags": {
                      "json": "outputNamespaces,omitempty"
                    }
                  },
                  "outputResources": {
                    "type": "array",
                    "description": "Resource types MeshSync publishes (lowercase Kubernetes kinds, for example \"pod\" or \"deployment\"). Empty or absent publishes all discovered resource types. Discovery scope is unaffected; this filters only what is published.",
                    "maxItems": 500,
                    "items": {
                      "type": "string",
                      "description": "A single lowercase Kubernetes resource kind.",
                      "minLength": 1,
                      "maxLength": 128,
                      "pattern": "^[a-z0-9-]+$"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-order": 5,
                    "x-oapi-codegen-extra-tags": {
                      "json": "outputResources,omitempty"
                    }
                  },
                  "redactSecrets": {
                    "type": "boolean",
                    "description": "When true, MeshSync redacts Kubernetes Secret data values (keys are preserved) before publishing. Requires MeshSync v1.0.2 or newer. Off by default; enabling is recommended when Secrets are within the discovery scope.",
                    "x-order": 6,
                    "x-oapi-codegen-extra-tags": {
                      "json": "redactSecrets,omitempty"
                    }
                  },
                  "brokerContentDedup": {
                    "type": "boolean",
                    "description": "When true, MeshSync suppresses byte-identical republishes of a resource to the broker. Requires MeshSync v1.0.2 or newer. Off by default.",
                    "x-order": 7,
                    "x-oapi-codegen-extra-tags": {
                      "json": "brokerContentDedup,omitempty"
                    }
                  },
                  "debugLogging": {
                    "type": "boolean",
                    "description": "When true, MeshSync runs with debug-level logging (DEBUG environment variable).",
                    "x-order": 8,
                    "x-oapi-codegen-extra-tags": {
                      "json": "debugLogging,omitempty"
                    }
                  }
                }
              },
              "broker": {
                "description": "Configuration for the Meshery Broker (NATS) on the managed cluster.",
                "x-order": 3,
                "x-oapi-codegen-extra-tags": {
                  "json": "broker,omitempty"
                },
                "type": "object",
                "additionalProperties": false,
                "properties": {
                  "version": {
                    "type": "string",
                    "description": "NATS server image tag to run (Broker custom resource spec.version). When absent, the operator's bundled default NATS version is used.",
                    "minLength": 1,
                    "maxLength": 128,
                    "x-order": 1,
                    "x-oapi-codegen-extra-tags": {
                      "json": "version,omitempty"
                    }
                  },
                  "replicas": {
                    "type": "integer",
                    "description": "Number of NATS server replicas (Broker custom resource spec.size).",
                    "minimum": 1,
                    "maximum": 10,
                    "x-order": 2,
                    "x-oapi-codegen-extra-tags": {
                      "json": "replicas,omitempty"
                    }
                  },
                  "service": {
                    "description": "How the broker is exposed on the network. Service changes reconcile in place without restarting broker pods.",
                    "x-order": 3,
                    "x-oapi-codegen-extra-tags": {
                      "json": "service,omitempty"
                    },
                    "type": "object",
                    "additionalProperties": false,
                    "properties": {
                      "type": {
                        "type": "string",
                        "description": "Kubernetes Service type for client access. When absent the broker stays cluster-internal (ClusterIP). LoadBalancer acquires a cloud load-balancer address; NodePort exposes the broker on node IPs.",
                        "enum": [
                          "ClusterIP",
                          "NodePort",
                          "LoadBalancer"
                        ],
                        "x-order": 1,
                        "x-oapi-codegen-extra-tags": {
                          "json": "type,omitempty"
                        }
                      },
                      "annotations": {
                        "type": "object",
                        "description": "Annotations merged onto the client Service (cloud load-balancer hints, MetalLB address pools, internal-LB switches).",
                        "additionalProperties": {
                          "type": "string",
                          "description": "A single annotation value.",
                          "maxLength": 4096
                        },
                        "x-go-type-skip-optional-pointer": true,
                        "x-order": 2,
                        "x-oapi-codegen-extra-tags": {
                          "json": "annotations,omitempty"
                        }
                      },
                      "loadBalancerClass": {
                        "type": "string",
                        "description": "Load-balancer implementation to use. Valid only when type is LoadBalancer.",
                        "minLength": 1,
                        "maxLength": 253,
                        "x-order": 3,
                        "x-oapi-codegen-extra-tags": {
                          "json": "loadBalancerClass,omitempty"
                        }
                      },
                      "loadBalancerSourceRanges": {
                        "type": "array",
                        "description": "CIDR ranges allowed to reach the broker. Valid only when type is LoadBalancer.",
                        "maxItems": 100,
                        "items": {
                          "type": "string",
                          "description": "A single CIDR range.",
                          "minLength": 1,
                          "maxLength": 64
                        },
                        "x-go-type-skip-optional-pointer": true,
                        "x-order": 4,
                        "x-oapi-codegen-extra-tags": {
                          "json": "loadBalancerSourceRanges,omitempty"
                        }
                      },
                      "externalEndpointOverride": {
                        "type": "string",
                        "description": "Pins the advertised external broker endpoint as \"host:port\" when auto-derivation is undesirable: an ingress or gateway in front of the broker, an air-gapped topology, or NAT. The nats:// scheme is added by consumers.",
                        "minLength": 3,
                        "maxLength": 262,
                        "pattern": "^([A-Za-z0-9.-]+|\\[[A-Fa-f0-9:.]+\\]):[0-9]{1,5}$",
                        "x-order": 5,
                        "x-oapi-codegen-extra-tags": {
                          "json": "externalEndpointOverride,omitempty"
                        }
                      }
                    }
                  }
                }
              }
            },
            "x-order": 3,
            "x-oapi-codegen-extra-tags": {
              "json": "effective"
            }
          }
        }
      },
      "MesheryControllersConfigPayload": {
        "type": "object",
        "description": "Client-settable controllers configuration document, used as the body of update requests at both layers (server-wide defaults and per-connection override). Identical to MesheryControllersConfig minus the server-stamped schemaVersion. Every field is optional: an absent field inherits from the next precedence layer, and an empty document clears the layer entirely.",
        "additionalProperties": false,
        "properties": {
          "operator": {
            "description": "Configuration for the Meshery Operator on the managed cluster.",
            "x-order": 1,
            "x-oapi-codegen-extra-tags": {
              "json": "operator,omitempty"
            },
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "deploymentMode": {
                "type": "string",
                "description": "How MeshSync is deployed for the connection. \"operator\" installs Meshery Operator into the cluster, which runs MeshSync and Meshery Broker there; \"embedded\" runs MeshSync in-process inside Meshery Server and installs nothing into the cluster.",
                "enum": [
                  "operator",
                  "embedded"
                ],
                "x-order": 1,
                "x-oapi-codegen-extra-tags": {
                  "json": "deploymentMode,omitempty"
                }
              },
              "version": {
                "type": "string",
                "description": "Meshery Operator Helm chart version to deploy. When absent, the operator version tracks the Meshery Server release.",
                "minLength": 1,
                "maxLength": 128,
                "x-order": 2,
                "x-oapi-codegen-extra-tags": {
                  "json": "version,omitempty"
                }
              }
            }
          },
          "meshsync": {
            "description": "Configuration for the MeshSync agent on the managed cluster.",
            "x-order": 2,
            "x-oapi-codegen-extra-tags": {
              "json": "meshsync,omitempty"
            },
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "version": {
                "type": "string",
                "description": "MeshSync image tag to run (for example \"v1.0.2\" or \"stable-latest\"). Applies to operator deployment mode only; in embedded mode MeshSync runs at the version compiled into Meshery Server. Secret redaction and broker content deduplication require MeshSync v1.0.2 or newer.",
                "minLength": 1,
                "maxLength": 128,
                "x-order": 1,
                "x-oapi-codegen-extra-tags": {
                  "json": "version,omitempty"
                }
              },
              "replicas": {
                "type": "integer",
                "description": "Number of MeshSync replicas (MeshSync custom resource spec.size). Applies to operator deployment mode only.",
                "minimum": 1,
                "maximum": 10,
                "x-order": 2,
                "x-oapi-codegen-extra-tags": {
                  "json": "replicas,omitempty"
                }
              },
              "watchList": {
                "description": "Discovery scope for MeshSync, as a whitelist or a blacklist of Kubernetes resource types.",
                "x-order": 3,
                "x-oapi-codegen-extra-tags": {
                  "json": "watchList,omitempty"
                },
                "type": "object",
                "additionalProperties": false,
                "not": {
                  "required": [
                    "whitelist",
                    "blacklist"
                  ]
                },
                "properties": {
                  "whitelist": {
                    "type": "array",
                    "description": "Resource types MeshSync watches, each with the event types to subscribe to. Mutually exclusive with blacklist.",
                    "maxItems": 1000,
                    "items": {
                      "type": "object",
                      "description": "A single watched Kubernetes resource type and the event types MeshSync subscribes to for it.",
                      "additionalProperties": false,
                      "required": [
                        "resource"
                      ],
                      "properties": {
                        "resource": {
                          "type": "string",
                          "description": "Resource key in \"<plural>.<version>.<group>\" form (for example \"pods.v1.\" for core-group pods or \"deployments.v1.apps\").",
                          "minLength": 1,
                          "maxLength": 512,
                          "pattern": "^[a-z0-9-]+\\.[a-z0-9]+\\.[a-z0-9.-]*$",
                          "x-go-type-skip-optional-pointer": true,
                          "x-order": 1,
                          "x-oapi-codegen-extra-tags": {
                            "json": "resource"
                          }
                        },
                        "events": {
                          "type": "array",
                          "description": "Event types to subscribe to for this resource. Empty or absent subscribes to all event types.",
                          "maxItems": 3,
                          "items": {
                            "type": "string",
                            "description": "A single Kubernetes watch event type.",
                            "enum": [
                              "ADDED",
                              "MODIFIED",
                              "DELETED"
                            ]
                          },
                          "x-go-type-skip-optional-pointer": true,
                          "x-order": 2,
                          "x-oapi-codegen-extra-tags": {
                            "json": "events,omitempty"
                          }
                        }
                      }
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-order": 1,
                    "x-oapi-codegen-extra-tags": {
                      "json": "whitelist,omitempty"
                    }
                  },
                  "blacklist": {
                    "type": "array",
                    "description": "Resource types excluded from MeshSync's default discovery scope, in \"<plural>.<version>.<group>\" form (for example \"pods.v1.\" or \"deployments.v1.apps\"). Mutually exclusive with whitelist.",
                    "maxItems": 1000,
                    "items": {
                      "type": "string",
                      "description": "A single resource key in \"<plural>.<version>.<group>\" form.",
                      "minLength": 1,
                      "maxLength": 512,
                      "pattern": "^[a-z0-9-]+\\.[a-z0-9]+\\.[a-z0-9.-]*$"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-order": 2,
                    "x-oapi-codegen-extra-tags": {
                      "json": "blacklist,omitempty"
                    }
                  }
                }
              },
              "outputNamespaces": {
                "type": "array",
                "description": "Namespaces whose resources MeshSync publishes. Empty or absent publishes resources from all namespaces. Discovery scope is unaffected; this filters only what is published.",
                "maxItems": 500,
                "items": {
                  "type": "string",
                  "description": "A single Kubernetes namespace name (DNS-1123 label).",
                  "minLength": 1,
                  "maxLength": 63,
                  "pattern": "^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
                },
                "x-go-type-skip-optional-pointer": true,
                "x-order": 4,
                "x-oapi-codegen-extra-tags": {
                  "json": "outputNamespaces,omitempty"
                }
              },
              "outputResources": {
                "type": "array",
                "description": "Resource types MeshSync publishes (lowercase Kubernetes kinds, for example \"pod\" or \"deployment\"). Empty or absent publishes all discovered resource types. Discovery scope is unaffected; this filters only what is published.",
                "maxItems": 500,
                "items": {
                  "type": "string",
                  "description": "A single lowercase Kubernetes resource kind.",
                  "minLength": 1,
                  "maxLength": 128,
                  "pattern": "^[a-z0-9-]+$"
                },
                "x-go-type-skip-optional-pointer": true,
                "x-order": 5,
                "x-oapi-codegen-extra-tags": {
                  "json": "outputResources,omitempty"
                }
              },
              "redactSecrets": {
                "type": "boolean",
                "description": "When true, MeshSync redacts Kubernetes Secret data values (keys are preserved) before publishing. Requires MeshSync v1.0.2 or newer. Off by default; enabling is recommended when Secrets are within the discovery scope.",
                "x-order": 6,
                "x-oapi-codegen-extra-tags": {
                  "json": "redactSecrets,omitempty"
                }
              },
              "brokerContentDedup": {
                "type": "boolean",
                "description": "When true, MeshSync suppresses byte-identical republishes of a resource to the broker. Requires MeshSync v1.0.2 or newer. Off by default.",
                "x-order": 7,
                "x-oapi-codegen-extra-tags": {
                  "json": "brokerContentDedup,omitempty"
                }
              },
              "debugLogging": {
                "type": "boolean",
                "description": "When true, MeshSync runs with debug-level logging (DEBUG environment variable).",
                "x-order": 8,
                "x-oapi-codegen-extra-tags": {
                  "json": "debugLogging,omitempty"
                }
              }
            }
          },
          "broker": {
            "description": "Configuration for the Meshery Broker (NATS) on the managed cluster.",
            "x-order": 3,
            "x-oapi-codegen-extra-tags": {
              "json": "broker,omitempty"
            },
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "version": {
                "type": "string",
                "description": "NATS server image tag to run (Broker custom resource spec.version). When absent, the operator's bundled default NATS version is used.",
                "minLength": 1,
                "maxLength": 128,
                "x-order": 1,
                "x-oapi-codegen-extra-tags": {
                  "json": "version,omitempty"
                }
              },
              "replicas": {
                "type": "integer",
                "description": "Number of NATS server replicas (Broker custom resource spec.size).",
                "minimum": 1,
                "maximum": 10,
                "x-order": 2,
                "x-oapi-codegen-extra-tags": {
                  "json": "replicas,omitempty"
                }
              },
              "service": {
                "description": "How the broker is exposed on the network. Service changes reconcile in place without restarting broker pods.",
                "x-order": 3,
                "x-oapi-codegen-extra-tags": {
                  "json": "service,omitempty"
                },
                "type": "object",
                "additionalProperties": false,
                "properties": {
                  "type": {
                    "type": "string",
                    "description": "Kubernetes Service type for client access. When absent the broker stays cluster-internal (ClusterIP). LoadBalancer acquires a cloud load-balancer address; NodePort exposes the broker on node IPs.",
                    "enum": [
                      "ClusterIP",
                      "NodePort",
                      "LoadBalancer"
                    ],
                    "x-order": 1,
                    "x-oapi-codegen-extra-tags": {
                      "json": "type,omitempty"
                    }
                  },
                  "annotations": {
                    "type": "object",
                    "description": "Annotations merged onto the client Service (cloud load-balancer hints, MetalLB address pools, internal-LB switches).",
                    "additionalProperties": {
                      "type": "string",
                      "description": "A single annotation value.",
                      "maxLength": 4096
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-order": 2,
                    "x-oapi-codegen-extra-tags": {
                      "json": "annotations,omitempty"
                    }
                  },
                  "loadBalancerClass": {
                    "type": "string",
                    "description": "Load-balancer implementation to use. Valid only when type is LoadBalancer.",
                    "minLength": 1,
                    "maxLength": 253,
                    "x-order": 3,
                    "x-oapi-codegen-extra-tags": {
                      "json": "loadBalancerClass,omitempty"
                    }
                  },
                  "loadBalancerSourceRanges": {
                    "type": "array",
                    "description": "CIDR ranges allowed to reach the broker. Valid only when type is LoadBalancer.",
                    "maxItems": 100,
                    "items": {
                      "type": "string",
                      "description": "A single CIDR range.",
                      "minLength": 1,
                      "maxLength": 64
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-order": 4,
                    "x-oapi-codegen-extra-tags": {
                      "json": "loadBalancerSourceRanges,omitempty"
                    }
                  },
                  "externalEndpointOverride": {
                    "type": "string",
                    "description": "Pins the advertised external broker endpoint as \"host:port\" when auto-derivation is undesirable: an ingress or gateway in front of the broker, an air-gapped topology, or NAT. The nats:// scheme is added by consumers.",
                    "minLength": 3,
                    "maxLength": 262,
                    "pattern": "^([A-Za-z0-9.-]+|\\[[A-Fa-f0-9:.]+\\]):[0-9]{1,5}$",
                    "x-order": 5,
                    "x-oapi-codegen-extra-tags": {
                      "json": "externalEndpointOverride,omitempty"
                    }
                  }
                }
              }
            }
          }
        }
      },
      "MesheryOperatorConfig": {
        "type": "object",
        "description": "Configuration for the Meshery Operator on a managed cluster. The operator deploys and reconciles MeshSync and Meshery Broker; in embedded mode no operator is installed and MeshSync runs in-process inside Meshery Server.",
        "additionalProperties": false,
        "properties": {
          "deploymentMode": {
            "type": "string",
            "description": "How MeshSync is deployed for the connection. \"operator\" installs Meshery Operator into the cluster, which runs MeshSync and Meshery Broker there; \"embedded\" runs MeshSync in-process inside Meshery Server and installs nothing into the cluster.",
            "enum": [
              "operator",
              "embedded"
            ],
            "x-order": 1,
            "x-oapi-codegen-extra-tags": {
              "json": "deploymentMode,omitempty"
            }
          },
          "version": {
            "type": "string",
            "description": "Meshery Operator Helm chart version to deploy. When absent, the operator version tracks the Meshery Server release.",
            "minLength": 1,
            "maxLength": 128,
            "x-order": 2,
            "x-oapi-codegen-extra-tags": {
              "json": "version,omitempty"
            }
          }
        }
      },
      "MeshSyncConfig": {
        "type": "object",
        "description": "Configuration for the MeshSync agent that discovers and synchronizes cluster state. In operator deployment mode these settings are applied through the MeshSync custom resource and the MeshSync Deployment on the managed cluster; in embedded mode the applicable settings are passed to the in-process MeshSync run.",
        "additionalProperties": false,
        "properties": {
          "version": {
            "type": "string",
            "description": "MeshSync image tag to run (for example \"v1.0.2\" or \"stable-latest\"). Applies to operator deployment mode only; in embedded mode MeshSync runs at the version compiled into Meshery Server. Secret redaction and broker content deduplication require MeshSync v1.0.2 or newer.",
            "minLength": 1,
            "maxLength": 128,
            "x-order": 1,
            "x-oapi-codegen-extra-tags": {
              "json": "version,omitempty"
            }
          },
          "replicas": {
            "type": "integer",
            "description": "Number of MeshSync replicas (MeshSync custom resource spec.size). Applies to operator deployment mode only.",
            "minimum": 1,
            "maximum": 10,
            "x-order": 2,
            "x-oapi-codegen-extra-tags": {
              "json": "replicas,omitempty"
            }
          },
          "watchList": {
            "description": "Discovery scope for MeshSync, as a whitelist or a blacklist of Kubernetes resource types.",
            "x-order": 3,
            "x-oapi-codegen-extra-tags": {
              "json": "watchList,omitempty"
            },
            "type": "object",
            "additionalProperties": false,
            "not": {
              "required": [
                "whitelist",
                "blacklist"
              ]
            },
            "properties": {
              "whitelist": {
                "type": "array",
                "description": "Resource types MeshSync watches, each with the event types to subscribe to. Mutually exclusive with blacklist.",
                "maxItems": 1000,
                "items": {
                  "type": "object",
                  "description": "A single watched Kubernetes resource type and the event types MeshSync subscribes to for it.",
                  "additionalProperties": false,
                  "required": [
                    "resource"
                  ],
                  "properties": {
                    "resource": {
                      "type": "string",
                      "description": "Resource key in \"<plural>.<version>.<group>\" form (for example \"pods.v1.\" for core-group pods or \"deployments.v1.apps\").",
                      "minLength": 1,
                      "maxLength": 512,
                      "pattern": "^[a-z0-9-]+\\.[a-z0-9]+\\.[a-z0-9.-]*$",
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 1,
                      "x-oapi-codegen-extra-tags": {
                        "json": "resource"
                      }
                    },
                    "events": {
                      "type": "array",
                      "description": "Event types to subscribe to for this resource. Empty or absent subscribes to all event types.",
                      "maxItems": 3,
                      "items": {
                        "type": "string",
                        "description": "A single Kubernetes watch event type.",
                        "enum": [
                          "ADDED",
                          "MODIFIED",
                          "DELETED"
                        ]
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 2,
                      "x-oapi-codegen-extra-tags": {
                        "json": "events,omitempty"
                      }
                    }
                  }
                },
                "x-go-type-skip-optional-pointer": true,
                "x-order": 1,
                "x-oapi-codegen-extra-tags": {
                  "json": "whitelist,omitempty"
                }
              },
              "blacklist": {
                "type": "array",
                "description": "Resource types excluded from MeshSync's default discovery scope, in \"<plural>.<version>.<group>\" form (for example \"pods.v1.\" or \"deployments.v1.apps\"). Mutually exclusive with whitelist.",
                "maxItems": 1000,
                "items": {
                  "type": "string",
                  "description": "A single resource key in \"<plural>.<version>.<group>\" form.",
                  "minLength": 1,
                  "maxLength": 512,
                  "pattern": "^[a-z0-9-]+\\.[a-z0-9]+\\.[a-z0-9.-]*$"
                },
                "x-go-type-skip-optional-pointer": true,
                "x-order": 2,
                "x-oapi-codegen-extra-tags": {
                  "json": "blacklist,omitempty"
                }
              }
            }
          },
          "outputNamespaces": {
            "type": "array",
            "description": "Namespaces whose resources MeshSync publishes. Empty or absent publishes resources from all namespaces. Discovery scope is unaffected; this filters only what is published.",
            "maxItems": 500,
            "items": {
              "type": "string",
              "description": "A single Kubernetes namespace name (DNS-1123 label).",
              "minLength": 1,
              "maxLength": 63,
              "pattern": "^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-order": 4,
            "x-oapi-codegen-extra-tags": {
              "json": "outputNamespaces,omitempty"
            }
          },
          "outputResources": {
            "type": "array",
            "description": "Resource types MeshSync publishes (lowercase Kubernetes kinds, for example \"pod\" or \"deployment\"). Empty or absent publishes all discovered resource types. Discovery scope is unaffected; this filters only what is published.",
            "maxItems": 500,
            "items": {
              "type": "string",
              "description": "A single lowercase Kubernetes resource kind.",
              "minLength": 1,
              "maxLength": 128,
              "pattern": "^[a-z0-9-]+$"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-order": 5,
            "x-oapi-codegen-extra-tags": {
              "json": "outputResources,omitempty"
            }
          },
          "redactSecrets": {
            "type": "boolean",
            "description": "When true, MeshSync redacts Kubernetes Secret data values (keys are preserved) before publishing. Requires MeshSync v1.0.2 or newer. Off by default; enabling is recommended when Secrets are within the discovery scope.",
            "x-order": 6,
            "x-oapi-codegen-extra-tags": {
              "json": "redactSecrets,omitempty"
            }
          },
          "brokerContentDedup": {
            "type": "boolean",
            "description": "When true, MeshSync suppresses byte-identical republishes of a resource to the broker. Requires MeshSync v1.0.2 or newer. Off by default.",
            "x-order": 7,
            "x-oapi-codegen-extra-tags": {
              "json": "brokerContentDedup,omitempty"
            }
          },
          "debugLogging": {
            "type": "boolean",
            "description": "When true, MeshSync runs with debug-level logging (DEBUG environment variable).",
            "x-order": 8,
            "x-oapi-codegen-extra-tags": {
              "json": "debugLogging,omitempty"
            }
          }
        }
      },
      "MeshSyncWatchList": {
        "type": "object",
        "description": "Discovery scope for MeshSync. At most one of whitelist or blacklist may be set (enforced by this schema and by MeshSync itself): a whitelist watches only the listed resource types with the listed event types, while a blacklist watches MeshSync's default resource set minus the listed resource types. When both are empty or absent, MeshSync watches its built-in default resource set. Applied through the MeshSync custom resource; MeshSync reads it at startup, so changes trigger a MeshSync restart.",
        "additionalProperties": false,
        "not": {
          "required": [
            "whitelist",
            "blacklist"
          ]
        },
        "properties": {
          "whitelist": {
            "type": "array",
            "description": "Resource types MeshSync watches, each with the event types to subscribe to. Mutually exclusive with blacklist.",
            "maxItems": 1000,
            "items": {
              "type": "object",
              "description": "A single watched Kubernetes resource type and the event types MeshSync subscribes to for it.",
              "additionalProperties": false,
              "required": [
                "resource"
              ],
              "properties": {
                "resource": {
                  "type": "string",
                  "description": "Resource key in \"<plural>.<version>.<group>\" form (for example \"pods.v1.\" for core-group pods or \"deployments.v1.apps\").",
                  "minLength": 1,
                  "maxLength": 512,
                  "pattern": "^[a-z0-9-]+\\.[a-z0-9]+\\.[a-z0-9.-]*$",
                  "x-go-type-skip-optional-pointer": true,
                  "x-order": 1,
                  "x-oapi-codegen-extra-tags": {
                    "json": "resource"
                  }
                },
                "events": {
                  "type": "array",
                  "description": "Event types to subscribe to for this resource. Empty or absent subscribes to all event types.",
                  "maxItems": 3,
                  "items": {
                    "type": "string",
                    "description": "A single Kubernetes watch event type.",
                    "enum": [
                      "ADDED",
                      "MODIFIED",
                      "DELETED"
                    ]
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-order": 2,
                  "x-oapi-codegen-extra-tags": {
                    "json": "events,omitempty"
                  }
                }
              }
            },
            "x-go-type-skip-optional-pointer": true,
            "x-order": 1,
            "x-oapi-codegen-extra-tags": {
              "json": "whitelist,omitempty"
            }
          },
          "blacklist": {
            "type": "array",
            "description": "Resource types excluded from MeshSync's default discovery scope, in \"<plural>.<version>.<group>\" form (for example \"pods.v1.\" or \"deployments.v1.apps\"). Mutually exclusive with whitelist.",
            "maxItems": 1000,
            "items": {
              "type": "string",
              "description": "A single resource key in \"<plural>.<version>.<group>\" form.",
              "minLength": 1,
              "maxLength": 512,
              "pattern": "^[a-z0-9-]+\\.[a-z0-9]+\\.[a-z0-9.-]*$"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-order": 2,
            "x-oapi-codegen-extra-tags": {
              "json": "blacklist,omitempty"
            }
          }
        }
      },
      "MeshSyncWatchedResource": {
        "type": "object",
        "description": "A single watched Kubernetes resource type and the event types MeshSync subscribes to for it.",
        "additionalProperties": false,
        "required": [
          "resource"
        ],
        "properties": {
          "resource": {
            "type": "string",
            "description": "Resource key in \"<plural>.<version>.<group>\" form (for example \"pods.v1.\" for core-group pods or \"deployments.v1.apps\").",
            "minLength": 1,
            "maxLength": 512,
            "pattern": "^[a-z0-9-]+\\.[a-z0-9]+\\.[a-z0-9.-]*$",
            "x-go-type-skip-optional-pointer": true,
            "x-order": 1,
            "x-oapi-codegen-extra-tags": {
              "json": "resource"
            }
          },
          "events": {
            "type": "array",
            "description": "Event types to subscribe to for this resource. Empty or absent subscribes to all event types.",
            "maxItems": 3,
            "items": {
              "type": "string",
              "description": "A single Kubernetes watch event type.",
              "enum": [
                "ADDED",
                "MODIFIED",
                "DELETED"
              ]
            },
            "x-go-type-skip-optional-pointer": true,
            "x-order": 2,
            "x-oapi-codegen-extra-tags": {
              "json": "events,omitempty"
            }
          }
        }
      },
      "MesheryBrokerConfig": {
        "type": "object",
        "description": "Configuration for the Meshery Broker (NATS) that MeshSync publishes to. Applies to operator deployment mode only: the settings are applied through the Broker custom resource on the managed cluster. In embedded mode no broker is installed; MeshSync publishes over an in-process channel inside Meshery Server.",
        "additionalProperties": false,
        "properties": {
          "version": {
            "type": "string",
            "description": "NATS server image tag to run (Broker custom resource spec.version). When absent, the operator's bundled default NATS version is used.",
            "minLength": 1,
            "maxLength": 128,
            "x-order": 1,
            "x-oapi-codegen-extra-tags": {
              "json": "version,omitempty"
            }
          },
          "replicas": {
            "type": "integer",
            "description": "Number of NATS server replicas (Broker custom resource spec.size).",
            "minimum": 1,
            "maximum": 10,
            "x-order": 2,
            "x-oapi-codegen-extra-tags": {
              "json": "replicas,omitempty"
            }
          },
          "service": {
            "description": "How the broker is exposed on the network. Service changes reconcile in place without restarting broker pods.",
            "x-order": 3,
            "x-oapi-codegen-extra-tags": {
              "json": "service,omitempty"
            },
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "type": {
                "type": "string",
                "description": "Kubernetes Service type for client access. When absent the broker stays cluster-internal (ClusterIP). LoadBalancer acquires a cloud load-balancer address; NodePort exposes the broker on node IPs.",
                "enum": [
                  "ClusterIP",
                  "NodePort",
                  "LoadBalancer"
                ],
                "x-order": 1,
                "x-oapi-codegen-extra-tags": {
                  "json": "type,omitempty"
                }
              },
              "annotations": {
                "type": "object",
                "description": "Annotations merged onto the client Service (cloud load-balancer hints, MetalLB address pools, internal-LB switches).",
                "additionalProperties": {
                  "type": "string",
                  "description": "A single annotation value.",
                  "maxLength": 4096
                },
                "x-go-type-skip-optional-pointer": true,
                "x-order": 2,
                "x-oapi-codegen-extra-tags": {
                  "json": "annotations,omitempty"
                }
              },
              "loadBalancerClass": {
                "type": "string",
                "description": "Load-balancer implementation to use. Valid only when type is LoadBalancer.",
                "minLength": 1,
                "maxLength": 253,
                "x-order": 3,
                "x-oapi-codegen-extra-tags": {
                  "json": "loadBalancerClass,omitempty"
                }
              },
              "loadBalancerSourceRanges": {
                "type": "array",
                "description": "CIDR ranges allowed to reach the broker. Valid only when type is LoadBalancer.",
                "maxItems": 100,
                "items": {
                  "type": "string",
                  "description": "A single CIDR range.",
                  "minLength": 1,
                  "maxLength": 64
                },
                "x-go-type-skip-optional-pointer": true,
                "x-order": 4,
                "x-oapi-codegen-extra-tags": {
                  "json": "loadBalancerSourceRanges,omitempty"
                }
              },
              "externalEndpointOverride": {
                "type": "string",
                "description": "Pins the advertised external broker endpoint as \"host:port\" when auto-derivation is undesirable: an ingress or gateway in front of the broker, an air-gapped topology, or NAT. The nats:// scheme is added by consumers.",
                "minLength": 3,
                "maxLength": 262,
                "pattern": "^([A-Za-z0-9.-]+|\\[[A-Fa-f0-9:.]+\\]):[0-9]{1,5}$",
                "x-order": 5,
                "x-oapi-codegen-extra-tags": {
                  "json": "externalEndpointOverride,omitempty"
                }
              }
            }
          }
        }
      },
      "MesheryBrokerServiceConfig": {
        "type": "object",
        "description": "Networking configuration for the broker's client-facing Kubernetes Service (Broker custom resource spec.service). Every field reconciles in place: the operator updates the live Service and re-derives the broker endpoint without recreating broker pods.",
        "additionalProperties": false,
        "properties": {
          "type": {
            "type": "string",
            "description": "Kubernetes Service type for client access. When absent the broker stays cluster-internal (ClusterIP). LoadBalancer acquires a cloud load-balancer address; NodePort exposes the broker on node IPs.",
            "enum": [
              "ClusterIP",
              "NodePort",
              "LoadBalancer"
            ],
            "x-order": 1,
            "x-oapi-codegen-extra-tags": {
              "json": "type,omitempty"
            }
          },
          "annotations": {
            "type": "object",
            "description": "Annotations merged onto the client Service (cloud load-balancer hints, MetalLB address pools, internal-LB switches).",
            "additionalProperties": {
              "type": "string",
              "description": "A single annotation value.",
              "maxLength": 4096
            },
            "x-go-type-skip-optional-pointer": true,
            "x-order": 2,
            "x-oapi-codegen-extra-tags": {
              "json": "annotations,omitempty"
            }
          },
          "loadBalancerClass": {
            "type": "string",
            "description": "Load-balancer implementation to use. Valid only when type is LoadBalancer.",
            "minLength": 1,
            "maxLength": 253,
            "x-order": 3,
            "x-oapi-codegen-extra-tags": {
              "json": "loadBalancerClass,omitempty"
            }
          },
          "loadBalancerSourceRanges": {
            "type": "array",
            "description": "CIDR ranges allowed to reach the broker. Valid only when type is LoadBalancer.",
            "maxItems": 100,
            "items": {
              "type": "string",
              "description": "A single CIDR range.",
              "minLength": 1,
              "maxLength": 64
            },
            "x-go-type-skip-optional-pointer": true,
            "x-order": 4,
            "x-oapi-codegen-extra-tags": {
              "json": "loadBalancerSourceRanges,omitempty"
            }
          },
          "externalEndpointOverride": {
            "type": "string",
            "description": "Pins the advertised external broker endpoint as \"host:port\" when auto-derivation is undesirable: an ingress or gateway in front of the broker, an air-gapped topology, or NAT. The nats:// scheme is added by consumers.",
            "minLength": 3,
            "maxLength": 262,
            "pattern": "^([A-Za-z0-9.-]+|\\[[A-Fa-f0-9:.]+\\]):[0-9]{1,5}$",
            "x-order": 5,
            "x-oapi-codegen-extra-tags": {
              "json": "externalEndpointOverride,omitempty"
            }
          }
        }
      }
    },
    "requestBodies": {
      "controllersConfigPayload": {
        "description": "Controllers configuration document. Absent fields inherit from the next precedence layer.",
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "description": "Client-settable controllers configuration document, used as the body of update requests at both layers (server-wide defaults and per-connection override). Identical to MesheryControllersConfig minus the server-stamped schemaVersion. Every field is optional: an absent field inherits from the next precedence layer, and an empty document clears the layer entirely.",
              "additionalProperties": false,
              "properties": {
                "operator": {
                  "description": "Configuration for the Meshery Operator on the managed cluster.",
                  "x-order": 1,
                  "x-oapi-codegen-extra-tags": {
                    "json": "operator,omitempty"
                  },
                  "type": "object",
                  "additionalProperties": false,
                  "properties": {
                    "deploymentMode": {
                      "type": "string",
                      "description": "How MeshSync is deployed for the connection. \"operator\" installs Meshery Operator into the cluster, which runs MeshSync and Meshery Broker there; \"embedded\" runs MeshSync in-process inside Meshery Server and installs nothing into the cluster.",
                      "enum": [
                        "operator",
                        "embedded"
                      ],
                      "x-order": 1,
                      "x-oapi-codegen-extra-tags": {
                        "json": "deploymentMode,omitempty"
                      }
                    },
                    "version": {
                      "type": "string",
                      "description": "Meshery Operator Helm chart version to deploy. When absent, the operator version tracks the Meshery Server release.",
                      "minLength": 1,
                      "maxLength": 128,
                      "x-order": 2,
                      "x-oapi-codegen-extra-tags": {
                        "json": "version,omitempty"
                      }
                    }
                  }
                },
                "meshsync": {
                  "description": "Configuration for the MeshSync agent on the managed cluster.",
                  "x-order": 2,
                  "x-oapi-codegen-extra-tags": {
                    "json": "meshsync,omitempty"
                  },
                  "type": "object",
                  "additionalProperties": false,
                  "properties": {
                    "version": {
                      "type": "string",
                      "description": "MeshSync image tag to run (for example \"v1.0.2\" or \"stable-latest\"). Applies to operator deployment mode only; in embedded mode MeshSync runs at the version compiled into Meshery Server. Secret redaction and broker content deduplication require MeshSync v1.0.2 or newer.",
                      "minLength": 1,
                      "maxLength": 128,
                      "x-order": 1,
                      "x-oapi-codegen-extra-tags": {
                        "json": "version,omitempty"
                      }
                    },
                    "replicas": {
                      "type": "integer",
                      "description": "Number of MeshSync replicas (MeshSync custom resource spec.size). Applies to operator deployment mode only.",
                      "minimum": 1,
                      "maximum": 10,
                      "x-order": 2,
                      "x-oapi-codegen-extra-tags": {
                        "json": "replicas,omitempty"
                      }
                    },
                    "watchList": {
                      "description": "Discovery scope for MeshSync, as a whitelist or a blacklist of Kubernetes resource types.",
                      "x-order": 3,
                      "x-oapi-codegen-extra-tags": {
                        "json": "watchList,omitempty"
                      },
                      "type": "object",
                      "additionalProperties": false,
                      "not": {
                        "required": [
                          "whitelist",
                          "blacklist"
                        ]
                      },
                      "properties": {
                        "whitelist": {
                          "type": "array",
                          "description": "Resource types MeshSync watches, each with the event types to subscribe to. Mutually exclusive with blacklist.",
                          "maxItems": 1000,
                          "items": {
                            "type": "object",
                            "description": "A single watched Kubernetes resource type and the event types MeshSync subscribes to for it.",
                            "additionalProperties": false,
                            "required": [
                              "resource"
                            ],
                            "properties": {
                              "resource": {
                                "type": "string",
                                "description": "Resource key in \"<plural>.<version>.<group>\" form (for example \"pods.v1.\" for core-group pods or \"deployments.v1.apps\").",
                                "minLength": 1,
                                "maxLength": 512,
                                "pattern": "^[a-z0-9-]+\\.[a-z0-9]+\\.[a-z0-9.-]*$",
                                "x-go-type-skip-optional-pointer": true,
                                "x-order": 1,
                                "x-oapi-codegen-extra-tags": {
                                  "json": "resource"
                                }
                              },
                              "events": {
                                "type": "array",
                                "description": "Event types to subscribe to for this resource. Empty or absent subscribes to all event types.",
                                "maxItems": 3,
                                "items": {
                                  "type": "string",
                                  "description": "A single Kubernetes watch event type.",
                                  "enum": [
                                    "ADDED",
                                    "MODIFIED",
                                    "DELETED"
                                  ]
                                },
                                "x-go-type-skip-optional-pointer": true,
                                "x-order": 2,
                                "x-oapi-codegen-extra-tags": {
                                  "json": "events,omitempty"
                                }
                              }
                            }
                          },
                          "x-go-type-skip-optional-pointer": true,
                          "x-order": 1,
                          "x-oapi-codegen-extra-tags": {
                            "json": "whitelist,omitempty"
                          }
                        },
                        "blacklist": {
                          "type": "array",
                          "description": "Resource types excluded from MeshSync's default discovery scope, in \"<plural>.<version>.<group>\" form (for example \"pods.v1.\" or \"deployments.v1.apps\"). Mutually exclusive with whitelist.",
                          "maxItems": 1000,
                          "items": {
                            "type": "string",
                            "description": "A single resource key in \"<plural>.<version>.<group>\" form.",
                            "minLength": 1,
                            "maxLength": 512,
                            "pattern": "^[a-z0-9-]+\\.[a-z0-9]+\\.[a-z0-9.-]*$"
                          },
                          "x-go-type-skip-optional-pointer": true,
                          "x-order": 2,
                          "x-oapi-codegen-extra-tags": {
                            "json": "blacklist,omitempty"
                          }
                        }
                      }
                    },
                    "outputNamespaces": {
                      "type": "array",
                      "description": "Namespaces whose resources MeshSync publishes. Empty or absent publishes resources from all namespaces. Discovery scope is unaffected; this filters only what is published.",
                      "maxItems": 500,
                      "items": {
                        "type": "string",
                        "description": "A single Kubernetes namespace name (DNS-1123 label).",
                        "minLength": 1,
                        "maxLength": 63,
                        "pattern": "^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 4,
                      "x-oapi-codegen-extra-tags": {
                        "json": "outputNamespaces,omitempty"
                      }
                    },
                    "outputResources": {
                      "type": "array",
                      "description": "Resource types MeshSync publishes (lowercase Kubernetes kinds, for example \"pod\" or \"deployment\"). Empty or absent publishes all discovered resource types. Discovery scope is unaffected; this filters only what is published.",
                      "maxItems": 500,
                      "items": {
                        "type": "string",
                        "description": "A single lowercase Kubernetes resource kind.",
                        "minLength": 1,
                        "maxLength": 128,
                        "pattern": "^[a-z0-9-]+$"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 5,
                      "x-oapi-codegen-extra-tags": {
                        "json": "outputResources,omitempty"
                      }
                    },
                    "redactSecrets": {
                      "type": "boolean",
                      "description": "When true, MeshSync redacts Kubernetes Secret data values (keys are preserved) before publishing. Requires MeshSync v1.0.2 or newer. Off by default; enabling is recommended when Secrets are within the discovery scope.",
                      "x-order": 6,
                      "x-oapi-codegen-extra-tags": {
                        "json": "redactSecrets,omitempty"
                      }
                    },
                    "brokerContentDedup": {
                      "type": "boolean",
                      "description": "When true, MeshSync suppresses byte-identical republishes of a resource to the broker. Requires MeshSync v1.0.2 or newer. Off by default.",
                      "x-order": 7,
                      "x-oapi-codegen-extra-tags": {
                        "json": "brokerContentDedup,omitempty"
                      }
                    },
                    "debugLogging": {
                      "type": "boolean",
                      "description": "When true, MeshSync runs with debug-level logging (DEBUG environment variable).",
                      "x-order": 8,
                      "x-oapi-codegen-extra-tags": {
                        "json": "debugLogging,omitempty"
                      }
                    }
                  }
                },
                "broker": {
                  "description": "Configuration for the Meshery Broker (NATS) on the managed cluster.",
                  "x-order": 3,
                  "x-oapi-codegen-extra-tags": {
                    "json": "broker,omitempty"
                  },
                  "type": "object",
                  "additionalProperties": false,
                  "properties": {
                    "version": {
                      "type": "string",
                      "description": "NATS server image tag to run (Broker custom resource spec.version). When absent, the operator's bundled default NATS version is used.",
                      "minLength": 1,
                      "maxLength": 128,
                      "x-order": 1,
                      "x-oapi-codegen-extra-tags": {
                        "json": "version,omitempty"
                      }
                    },
                    "replicas": {
                      "type": "integer",
                      "description": "Number of NATS server replicas (Broker custom resource spec.size).",
                      "minimum": 1,
                      "maximum": 10,
                      "x-order": 2,
                      "x-oapi-codegen-extra-tags": {
                        "json": "replicas,omitempty"
                      }
                    },
                    "service": {
                      "description": "How the broker is exposed on the network. Service changes reconcile in place without restarting broker pods.",
                      "x-order": 3,
                      "x-oapi-codegen-extra-tags": {
                        "json": "service,omitempty"
                      },
                      "type": "object",
                      "additionalProperties": false,
                      "properties": {
                        "type": {
                          "type": "string",
                          "description": "Kubernetes Service type for client access. When absent the broker stays cluster-internal (ClusterIP). LoadBalancer acquires a cloud load-balancer address; NodePort exposes the broker on node IPs.",
                          "enum": [
                            "ClusterIP",
                            "NodePort",
                            "LoadBalancer"
                          ],
                          "x-order": 1,
                          "x-oapi-codegen-extra-tags": {
                            "json": "type,omitempty"
                          }
                        },
                        "annotations": {
                          "type": "object",
                          "description": "Annotations merged onto the client Service (cloud load-balancer hints, MetalLB address pools, internal-LB switches).",
                          "additionalProperties": {
                            "type": "string",
                            "description": "A single annotation value.",
                            "maxLength": 4096
                          },
                          "x-go-type-skip-optional-pointer": true,
                          "x-order": 2,
                          "x-oapi-codegen-extra-tags": {
                            "json": "annotations,omitempty"
                          }
                        },
                        "loadBalancerClass": {
                          "type": "string",
                          "description": "Load-balancer implementation to use. Valid only when type is LoadBalancer.",
                          "minLength": 1,
                          "maxLength": 253,
                          "x-order": 3,
                          "x-oapi-codegen-extra-tags": {
                            "json": "loadBalancerClass,omitempty"
                          }
                        },
                        "loadBalancerSourceRanges": {
                          "type": "array",
                          "description": "CIDR ranges allowed to reach the broker. Valid only when type is LoadBalancer.",
                          "maxItems": 100,
                          "items": {
                            "type": "string",
                            "description": "A single CIDR range.",
                            "minLength": 1,
                            "maxLength": 64
                          },
                          "x-go-type-skip-optional-pointer": true,
                          "x-order": 4,
                          "x-oapi-codegen-extra-tags": {
                            "json": "loadBalancerSourceRanges,omitempty"
                          }
                        },
                        "externalEndpointOverride": {
                          "type": "string",
                          "description": "Pins the advertised external broker endpoint as \"host:port\" when auto-derivation is undesirable: an ingress or gateway in front of the broker, an air-gapped topology, or NAT. The nats:// scheme is added by consumers.",
                          "minLength": 3,
                          "maxLength": 262,
                          "pattern": "^([A-Za-z0-9.-]+|\\[[A-Fa-f0-9:.]+\\]):[0-9]{1,5}$",
                          "x-order": 5,
                          "x-oapi-codegen-extra-tags": {
                            "json": "externalEndpointOverride,omitempty"
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
      }
    }
  }
};

export default ControllersConfigSchema;
