/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const ConnectionSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Connection API",
    "description": "API for managing Meshery connections - managed and unmanaged resources tracked by Meshery.",
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
  "paths": {
    "/api/integrations/connections": {
      "get": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "Connections"
        ],
        "operationId": "getConnections",
        "summary": "Get all connections",
        "description": "Returns a paginated list of connections for the authenticated user with filtering, sorting and pagination support",
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "description": "Page number",
            "required": false,
            "schema": {
              "type": "integer",
              "minimum": 0,
              "default": 0
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "description": "Number of items per page",
            "required": false,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "default": 10
            }
          },
          {
            "name": "search",
            "in": "query",
            "description": "Search term",
            "required": false,
            "schema": {
              "type": "string",
              "maxLength": 500
            }
          },
          {
            "name": "order",
            "in": "query",
            "description": "Sort order",
            "required": false,
            "schema": {
              "type": "string",
              "maxLength": 500
            }
          },
          {
            "name": "orgId",
            "in": "query",
            "description": "Organization ID to scope the request.",
            "required": false,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "name": "filter",
            "in": "query",
            "description": "Filter connections (general filter string)",
            "required": false,
            "schema": {
              "type": "string",
              "maxLength": 500
            }
          },
          {
            "name": "kind",
            "in": "query",
            "description": "Filter by connection kind (e.g., kubernetes, prometheus, grafana)",
            "required": false,
            "schema": {
              "type": "array",
              "items": {
                "type": "string",
                "maxLength": 255
              }
            }
          },
          {
            "name": "status",
            "in": "query",
            "description": "Filter by connection status",
            "required": false,
            "schema": {
              "type": "array",
              "items": {
                "type": "string",
                "description": "Connection Status Value",
                "x-go-name": "ConnectionStatusValue",
                "enum": [
                  "discovered",
                  "registered",
                  "connected",
                  "ignored",
                  "maintenance",
                  "disconnected",
                  "deleted",
                  "not found"
                ]
              }
            }
          },
          {
            "name": "type",
            "in": "query",
            "description": "Filter by connection type",
            "required": false,
            "schema": {
              "type": "array",
              "items": {
                "type": "string",
                "maxLength": 255
              }
            }
          },
          {
            "name": "name",
            "in": "query",
            "description": "Filter by connection name (partial match supported)",
            "required": false,
            "schema": {
              "type": "string",
              "maxLength": 255
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Paginated list of connections with summary information",
            "content": {
              "application/json": {
                "schema": {
                  "description": "Represents a page of connections with meta information about connections count",
                  "additionalProperties": false,
                  "type": "object",
                  "required": [
                    "connections",
                    "totalCount",
                    "page",
                    "pageSize"
                  ],
                  "properties": {
                    "connections": {
                      "type": "array",
                      "description": "List of connections on this page",
                      "x-go-type": "[]*Connection",
                      "items": {
                        "$id": "https://schemas.meshery.io/connection.yaml",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "description": "Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections",
                        "additionalProperties": false,
                        "type": "object",
                        "required": [
                          "id",
                          "schemaVersion",
                          "name",
                          "type",
                          "subType",
                          "kind",
                          "status"
                        ],
                        "properties": {
                          "id": {
                            "description": "Connection ID",
                            "x-order": 1,
                            "x-go-name": "ID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "id"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "name": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "name"
                            },
                            "x-order": 2,
                            "type": "string",
                            "description": "Connection Name",
                            "minLength": 1,
                            "maxLength": 255
                          },
                          "description": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "description",
                              "json": "description"
                            },
                            "x-order": 3,
                            "type": "string",
                            "description": "Human-readable description of the connection and its purpose.",
                            "maxLength": 1000
                          },
                          "url": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "url",
                              "json": "url"
                            },
                            "x-order": 4,
                            "type": "string",
                            "format": "uri",
                            "description": "URL of the remote resource this connection points to (e.g. the Helm repository URL, the Kubernetes API server endpoint, the Grafana instance URL).",
                            "maxLength": 2048
                          },
                          "credentialId": {
                            "x-go-name": "CredentialID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "credential_id",
                              "json": "credentialId"
                            },
                            "x-order": 5,
                            "description": "Associated Credential ID",
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "type": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "type",
                              "json": "type",
                              "yaml": "type"
                            },
                            "x-go-name": "ConnectionType",
                            "x-order": 6,
                            "type": "string",
                            "description": "Connection Type (platform, telemetry, collaboration)",
                            "maxLength": 255
                          },
                          "subType": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "sub_type",
                              "json": "subType"
                            },
                            "x-order": 7,
                            "type": "string",
                            "description": "Connection Subtype (cloud, identity, metrics, chat, git, orchestration)",
                            "maxLength": 255
                          },
                          "kind": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "kind"
                            },
                            "x-order": 8,
                            "type": "string",
                            "description": "Connection Kind (meshery, kubernetes, prometheus, grafana, gke, aws, azure, slack, github)",
                            "maxLength": 255
                          },
                          "modelReference": {
                            "x-go-type": "modelv1beta1.ModelReference",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/v1beta1/model",
                              "name": "modelv1beta1"
                            },
                            "x-order": 8,
                            "description": "Reference to the specific registered model to which the component belongs and from which model version, category, and other properties may be referenced. Learn more at https://docs.meshery.io/concepts/models",
                            "x-oapi-codegen-extra-tags": {
                              "gorm": "model_reference",
                              "db": "model_reference",
                              "json": "modelReference",
                              "yaml": "modelReference"
                            },
                            "x-generate-db-helpers": true,
                            "type": "object",
                            "required": [
                              "id",
                              "name",
                              "version",
                              "displayName",
                              "model",
                              "registrant"
                            ],
                            "properties": {
                              "id": {
                                "type": "string",
                                "format": "uuid",
                                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                }
                              },
                              "name": {
                                "type": "string",
                                "description": "The unique name for the model within the scope of a registrant.",
                                "pattern": "^[a-z0-9-]+$",
                                "examples": [
                                  "cert-manager"
                                ]
                              },
                              "version": {
                                "description": "Version of the model definition.",
                                "type": "string",
                                "minLength": 5,
                                "maxLength": 100,
                                "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                              },
                              "displayName": {
                                "type": "string",
                                "description": "Human-readable name for the model.",
                                "minLength": 1,
                                "maxLength": 100,
                                "pattern": "^[a-zA-Z0-9 ]+$",
                                "examples": [
                                  "Cert Manager"
                                ]
                              },
                              "model": {
                                "type": "object",
                                "description": "Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31).",
                                "required": [
                                  "version"
                                ],
                                "properties": {
                                  "version": {
                                    "description": "Version of the model as defined by the registrant.",
                                    "x-oapi-codegen-extra-tags": {
                                      "json": "version"
                                    },
                                    "x-order": 1,
                                    "type": "string",
                                    "minLength": 5,
                                    "maxLength": 100,
                                    "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                                  }
                                }
                              },
                              "registrant": {
                                "x-go-type": "RegistrantReference",
                                "x-oapi-codegen-extra-tags": {
                                  "json": "registrant"
                                },
                                "type": "object",
                                "required": [
                                  "kind"
                                ],
                                "properties": {
                                  "kind": {
                                    "type": "string",
                                    "description": "Kind of the registrant.",
                                    "maxLength": 255
                                  }
                                }
                              }
                            }
                          },
                          "metadata": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "metadata"
                            },
                            "x-order": 9,
                            "x-go-type": "core.Map",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "type": "object",
                            "description": "Additional connection metadata"
                          },
                          "credentialSchema": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "credential_schema"
                            },
                            "x-order": 9,
                            "x-go-type": "core.Map",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "type": "object",
                            "description": "Schema for the credential Associated with the connection"
                          },
                          "connectionSchema": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "connection_schema"
                            },
                            "x-order": 9,
                            "x-go-type": "core.Map",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "type": "object",
                            "description": "Schema for the connection"
                          },
                          "styles": {
                            "x-oapi-codegen-extra-tags": {
                              "gorm": "type:bytes;serializer:json",
                              "db": "-",
                              "yaml": "styles",
                              "json": "styles"
                            },
                            "x-go-type": "core.ComponentStyles",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-order": 17,
                            "description": "Visualization styles for the connection, including svgColor and svgWhite used for UI representation.",
                            "type": "object",
                            "required": [
                              "shape",
                              "primaryColor",
                              "svgColor",
                              "svgWhite",
                              "svgComplete"
                            ],
                            "allOf": [
                              {
                                "type": "object",
                                "description": "Common styles for all entities",
                                "additionalProperties": true,
                                "required": [
                                  "primaryColor",
                                  "svgColor",
                                  "svgWhite",
                                  "svgComplete"
                                ],
                                "properties": {
                                  "primaryColor": {
                                    "type": "string",
                                    "description": "Primary color of the component used for UI representation.",
                                    "maxLength": 500
                                  },
                                  "secondaryColor": {
                                    "type": "string",
                                    "description": "Secondary color of the entity used for UI representation.",
                                    "maxLength": 500
                                  },
                                  "svgWhite": {
                                    "type": "string",
                                    "description": "White SVG of the entity used for UI representation on dark background.",
                                    "maxLength": 500
                                  },
                                  "svgColor": {
                                    "type": "string",
                                    "description": "Colored SVG of the entity used for UI representation on light background.",
                                    "maxLength": 500
                                  },
                                  "svgComplete": {
                                    "type": "string",
                                    "description": "Complete SVG of the entity used for UI representation, often inclusive of background.",
                                    "maxLength": 500
                                  },
                                  "color": {
                                    "type": "string",
                                    "description": "The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g.",
                                    "maxLength": 500
                                  },
                                  "textOpacity": {
                                    "type": "number",
                                    "description": "The opacity of the label text, including its outline.",
                                    "minimum": 0,
                                    "maximum": 1
                                  },
                                  "fontFamily": {
                                    "type": "string",
                                    "description": "A comma-separated list of font names to use on the label text.",
                                    "maxLength": 500
                                  },
                                  "fontSize": {
                                    "type": "string",
                                    "description": "The size of the label text.",
                                    "maxLength": 500
                                  },
                                  "fontStyle": {
                                    "type": "string",
                                    "description": "A CSS font style to be applied to the label text.",
                                    "maxLength": 500
                                  },
                                  "fontWeight": {
                                    "type": "string",
                                    "description": "A CSS font weight to be applied to the label text.",
                                    "maxLength": 500
                                  },
                                  "textTransform": {
                                    "type": "string",
                                    "description": "A transformation to apply to the label text",
                                    "enum": [
                                      "none",
                                      "uppercase",
                                      "lowercase"
                                    ]
                                  },
                                  "opacity": {
                                    "type": "number",
                                    "description": "The opacity of the element, ranging from 0 to 1. Note that the opacity of a compound node parent affects the effective opacity of its children.",
                                    "minimum": 0,
                                    "maximum": 1
                                  },
                                  "zIndex": {
                                    "type": "integer",
                                    "description": "An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index.",
                                    "minimum": 0
                                  },
                                  "label": {
                                    "type": "string",
                                    "description": "The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id",
                                    "maxLength": 500
                                  },
                                  "animation": {
                                    "type": "object",
                                    "description": "The animation to apply to the element. example ripple,bounce,etc"
                                  }
                                }
                              },
                              {
                                "type": "object",
                                "properties": {
                                  "shape": {
                                    "type": "string",
                                    "description": "The shape of the node's body. Note that each shape fits within the specified width and height, and so you may have to adjust width and height if you desire an equilateral shape (i.e. width !== height for several equilateral shapes)",
                                    "enum": [
                                      "ellipse",
                                      "triangle",
                                      "round-triangle",
                                      "rectangle",
                                      "round-rectangle",
                                      "bottom-round-rectangle",
                                      "cut-rectangle",
                                      "barrel",
                                      "rhomboid",
                                      "diamond",
                                      "round-diamond",
                                      "pentagon",
                                      "round-pentagon",
                                      "hexagon",
                                      "round-hexagon",
                                      "concave-hexagon",
                                      "heptagon",
                                      "round-heptagon",
                                      "octagon",
                                      "round-octagon",
                                      "star",
                                      "tag",
                                      "round-tag",
                                      "vee",
                                      "polygon"
                                    ]
                                  },
                                  "position": {
                                    "type": "object",
                                    "additionalProperties": false,
                                    "required": [
                                      "x",
                                      "y"
                                    ],
                                    "description": "The position of the node. If the position is set, the node is drawn at that position in the given dimensions. If the position is not set, the node is drawn at a random position.",
                                    "properties": {
                                      "x": {
                                        "type": "number",
                                        "description": "The x-coordinate of the node.",
                                        "minimum": -1000000,
                                        "maximum": 1000000,
                                        "x-go-type": "float64"
                                      },
                                      "y": {
                                        "type": "number",
                                        "description": "The y-coordinate of the node.",
                                        "minimum": -1000000,
                                        "maximum": 1000000,
                                        "x-go-type": "float64"
                                      }
                                    }
                                  },
                                  "bodyText": {
                                    "type": "string",
                                    "description": "The text to display for an element's body. Can give a path, e.g. data(id) will label with the elements id",
                                    "maxLength": 500
                                  },
                                  "bodyTextWrap": {
                                    "type": "string",
                                    "description": "How to wrap the text in the node. Can be 'none', 'wrap', or 'ellipsis'.",
                                    "enum": [
                                      "none",
                                      "wrap",
                                      "ellipsis"
                                    ]
                                  },
                                  "bodyTextMaxWidth": {
                                    "type": "string",
                                    "description": "The maximum width for wrapping text in the node.",
                                    "maxLength": 50
                                  },
                                  "bodyTextOpacity": {
                                    "type": "number",
                                    "description": "The opacity of the node's body text, including its outline.",
                                    "minimum": 0,
                                    "maximum": 1
                                  },
                                  "bodyTextBackgroundColor": {
                                    "type": "string",
                                    "description": "The colour of the node's body text background. Colours may be specified by name (e.g. red), hex (e.g.",
                                    "maxLength": 100
                                  },
                                  "bodyTextFontSize": {
                                    "type": "number",
                                    "description": "The size of the node's body text.",
                                    "minimum": 0
                                  },
                                  "bodyTextColor": {
                                    "type": "string",
                                    "description": "The colour of the node's body text. Colours may be specified by name (e.g. red), hex (e.g.",
                                    "maxLength": 100
                                  },
                                  "bodyTextFontWeight": {
                                    "type": "string",
                                    "description": "A CSS font weight to be applied to the node's body text.",
                                    "maxLength": 50
                                  },
                                  "bodyTextHorizontalAlign": {
                                    "type": "string",
                                    "description": "A CSS horizontal alignment to be applied to the node's body text.",
                                    "maxLength": 50
                                  },
                                  "bodyTextDecoration": {
                                    "type": "string",
                                    "description": "A CSS text decoration to be applied to the node's body text.",
                                    "maxLength": 100
                                  },
                                  "bodyTextVerticalAlign": {
                                    "type": "string",
                                    "description": "A CSS vertical alignment to be applied to the node's body text.",
                                    "maxLength": 50
                                  },
                                  "width": {
                                    "type": "number",
                                    "description": "The width of the node's body or the width of an edge's line.",
                                    "minimum": 0
                                  },
                                  "height": {
                                    "type": "number",
                                    "description": "The height of the node's body",
                                    "minimum": 0
                                  },
                                  "backgroundImage": {
                                    "type": "string",
                                    "format": "uri",
                                    "description": "The URL that points to the image to show in the node.",
                                    "maxLength": 2048
                                  },
                                  "backgroundColor": {
                                    "type": "string",
                                    "description": "The colour of the node's body. Colours may be specified by name (e.g. red), hex (e.g.",
                                    "maxLength": 100
                                  },
                                  "backgroundBlacken": {
                                    "type": "number",
                                    "description": "Blackens the node's body for values from 0 to 1; whitens the node's body for values from 0 to -1.",
                                    "maximum": 1,
                                    "minimum": -1
                                  },
                                  "backgroundOpacity": {
                                    "type": "number",
                                    "description": "The opacity level of the node's background colour",
                                    "maximum": 1,
                                    "minimum": 0
                                  },
                                  "backgroundPositionX": {
                                    "type": "string",
                                    "description": "The x position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                                    "maxLength": 50
                                  },
                                  "backgroundPositionY": {
                                    "type": "string",
                                    "description": "The y position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                                    "maxLength": 50
                                  },
                                  "backgroundOffsetX": {
                                    "type": "string",
                                    "description": "The x offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                                    "maxLength": 50
                                  },
                                  "backgroundOffsetY": {
                                    "type": "string",
                                    "description": "The y offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                                    "maxLength": 50
                                  },
                                  "backgroundFit": {
                                    "type": "string",
                                    "description": "How the background image is fit to the node. Can be 'none', 'contain', or 'cover'.",
                                    "enum": [
                                      "none",
                                      "contain",
                                      "cover"
                                    ]
                                  },
                                  "backgroundClip": {
                                    "type": "string",
                                    "description": "How the background image is clipped to the node. Can be 'none', 'node', or 'node-border'.",
                                    "enum": [
                                      "none",
                                      "node",
                                      "node-border"
                                    ]
                                  },
                                  "backgroundWidthRelativeTo": {
                                    "type": "string",
                                    "description": "How the background image's width is determined. Can be 'none', 'inner', or 'outer'.",
                                    "enum": [
                                      "none",
                                      "inner",
                                      "outer"
                                    ]
                                  },
                                  "backgroundHeightRelativeTo": {
                                    "type": "string",
                                    "description": "How the background image's height is determined. Can be 'none', 'inner', or 'outer'.",
                                    "enum": [
                                      "none",
                                      "inner",
                                      "outer"
                                    ]
                                  },
                                  "borderWidth": {
                                    "type": "number",
                                    "description": "The size of the node's border.",
                                    "minimum": 0
                                  },
                                  "borderStyle": {
                                    "type": "string",
                                    "description": "The style of the node's border",
                                    "enum": [
                                      "solid",
                                      "dotted",
                                      "dashed",
                                      "double"
                                    ]
                                  },
                                  "borderColor": {
                                    "type": "string",
                                    "description": "The colour of the node's border. Colours may be specified by name (e.g. red), hex (e.g.",
                                    "maxLength": 100
                                  },
                                  "borderOpacity": {
                                    "type": "number",
                                    "description": "The opacity of the node's border",
                                    "minimum": 0,
                                    "maximum": 1
                                  },
                                  "padding": {
                                    "type": "number",
                                    "description": "The amount of padding around all sides of the node.",
                                    "minimum": 0
                                  },
                                  "textHalign": {
                                    "type": "string",
                                    "description": "The horizontal alignment of a node's label",
                                    "enum": [
                                      "left",
                                      "center",
                                      "right"
                                    ]
                                  },
                                  "textValign": {
                                    "type": "string",
                                    "description": "The vertical alignment of a node's label",
                                    "enum": [
                                      "top",
                                      "center",
                                      "bottom"
                                    ]
                                  },
                                  "ghost": {
                                    "type": "string",
                                    "description": "Whether to use the ghost effect, a semitransparent duplicate of the element drawn at an offset.",
                                    "default": "no",
                                    "enum": [
                                      "yes",
                                      "no"
                                    ]
                                  },
                                  "activeBgColor": {
                                    "type": "string",
                                    "description": "The colour of the indicator shown when the background is grabbed by the user. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                                    "maxLength": 100
                                  },
                                  "activeBgOpacity": {
                                    "type": "string",
                                    "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                                    "maxLength": 50
                                  },
                                  "activeBgSize": {
                                    "type": "string",
                                    "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                                    "maxLength": 50
                                  },
                                  "selectionBoxColor": {
                                    "type": "string",
                                    "description": "The background colour of the selection box used for drag selection. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                                    "maxLength": 100
                                  },
                                  "selectionBoxBorderWidth": {
                                    "type": "number",
                                    "description": "The size of the border on the selection box. Selector needs to be *core*",
                                    "minimum": 0
                                  },
                                  "selectionBoxOpacity": {
                                    "type": "number",
                                    "description": "The opacity of the selection box. Selector needs to be *core*",
                                    "minimum": 0,
                                    "maximum": 1
                                  },
                                  "outsideTextureBgColor": {
                                    "type": "string",
                                    "description": "The colour of the area outside the viewport texture when initOptions.textureOnViewport === true. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                                    "maxLength": 100
                                  },
                                  "outsideTextureBgOpacity": {
                                    "type": "number",
                                    "description": "The opacity of the area outside the viewport texture. Selector needs to be *core*",
                                    "minimum": 0,
                                    "maximum": 1
                                  },
                                  "shapePolygonPoints": {
                                    "type": "string",
                                    "description": "An array (or a space-separated string) of numbers ranging on [-1, 1], representing alternating x and y values (i.e. x1 y1 x2 y2, x3 y3 ...). This represents the points in the polygon for the node's shape. The bounding box of the node is given by (-1, -1), (1, -1), (1, 1), (-1, 1). The node's position is the origin (0, 0 )",
                                    "maxLength": 2000
                                  },
                                  "menuBackgroundColor": {
                                    "type": "string",
                                    "description": "The colour of the background of the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                                    "maxLength": 100
                                  },
                                  "menuBackgroundOpacity": {
                                    "type": "number",
                                    "description": "The opacity of the background of the component menu.",
                                    "minimum": 0,
                                    "maximum": 1
                                  },
                                  "menuForgroundColor": {
                                    "type": "string",
                                    "description": "The colour of the text or icons in the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                                    "maxLength": 100
                                  }
                                }
                              }
                            ]
                          },
                          "status": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "status"
                            },
                            "x-order": 10,
                            "description": "Connection Status",
                            "type": "string",
                            "enum": [
                              "discovered",
                              "registered",
                              "connected",
                              "ignored",
                              "maintenance",
                              "disconnected",
                              "deleted",
                              "not found"
                            ]
                          },
                          "transitionMap": {
                            "type": "object",
                            "description": "Map describing the connection state machine. Each key is a current connection status and its value is the list of states the connection may transition to from that status, along with a description of each transition.",
                            "additionalProperties": {
                              "type": "array",
                              "items": {
                                "type": "object",
                                "additionalProperties": false,
                                "description": "A single permissible state transition for a connection, describing the next reachable state and the meaning of that transition.",
                                "required": [
                                  "nextState"
                                ],
                                "properties": {
                                  "nextState": {
                                    "type": "string",
                                    "description": "Connection Status Value",
                                    "x-go-name": "ConnectionStatusValue",
                                    "enum": [
                                      "discovered",
                                      "registered",
                                      "connected",
                                      "ignored",
                                      "maintenance",
                                      "disconnected",
                                      "deleted",
                                      "not found"
                                    ],
                                    "x-order": 1
                                  },
                                  "description": {
                                    "type": "string",
                                    "description": "Human-readable explanation of when or why this transition occurs.",
                                    "maxLength": 1000,
                                    "x-oapi-codegen-extra-tags": {
                                      "json": "description,omitempty"
                                    },
                                    "x-order": 2
                                  }
                                }
                              }
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "gorm": "type:bytes;serializer:json",
                              "db": "-",
                              "json": "transitionMap,omitempty"
                            },
                            "x-order": 18
                          },
                          "owner": {
                            "x-go-name": "Owner",
                            "x-oapi-codegen-extra-tags": {
                              "db": "owner",
                              "json": "owner"
                            },
                            "x-order": 11,
                            "description": "User ID who owns this connection",
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "createdAt": {
                            "description": "Timestamp when the connection was created.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "json": "createdAt"
                            },
                            "x-order": 12,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp when the connection was last updated.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "json": "updatedAt"
                            },
                            "x-order": 13,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deletedAt": {
                            "description": "Timestamp when the connection was soft-deleted, if applicable.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "json": "deletedAt"
                            },
                            "x-order": 14,
                            "x-go-type": "meshcore.NullTime",
                            "x-go-type-import": {
                              "name": "meshcore",
                              "path": "github.com/meshery/schemas/models/core"
                            },
                            "type": "string",
                            "format": "date-time",
                            "nullable": true,
                            "x-go-type-skip-optional-pointer": true
                          },
                          "environments": {
                            "type": "array",
                            "description": "Associated environments for this connection",
                            "items": {
                              "x-go-type": "*environmentv1beta3.Environment",
                              "x-go-type-import": {
                                "path": "github.com/meshery/schemas/models/v1beta3/environment",
                                "name": "environmentv1beta3"
                              },
                              "$id": "https://schemas.meshery.io/environment.yaml",
                              "$schema": "http://json-schema.org/draft-07/schema#",
                              "title": "Environment",
                              "description": "Environments allow you to logically group related Connections and their associated Credentials. Learn more at https://docs.meshery.io/concepts/logical/environments",
                              "additionalProperties": false,
                              "type": "object",
                              "example": {
                                "id": "00000000-0000-0000-0000-000000000000",
                                "schemaVersion": "environments.meshery.io/v1beta3",
                                "name": "Production Environment",
                                "description": "Connections and credentials for the production cluster.",
                                "organizationId": "00000000-0000-0000-0000-000000000000",
                                "owner": "00000000-0000-0000-0000-000000000000",
                                "createdAt": "0001-01-01T00:00:00Z",
                                "metadata": {},
                                "updatedAt": "0001-01-01T00:00:00Z",
                                "deletedAt": null
                              },
                              "required": [
                                "id",
                                "schemaVersion",
                                "name",
                                "description",
                                "organizationId"
                              ],
                              "properties": {
                                "id": {
                                  "description": "ID",
                                  "x-order": 1,
                                  "x-go-name": "ID",
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "id",
                                    "json": "id"
                                  },
                                  "type": "string",
                                  "format": "uuid",
                                  "x-go-type": "uuid.UUID",
                                  "x-go-type-import": {
                                    "path": "github.com/gofrs/uuid"
                                  }
                                },
                                "schemaVersion": {
                                  "description": "Specifies the version of the schema to which the environment conforms.",
                                  "x-order": 2,
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "schemaVersion",
                                    "db": "-",
                                    "gorm": "-"
                                  },
                                  "default": "environments.meshery.io/v1beta3",
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
                                "name": {
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "name",
                                    "json": "name"
                                  },
                                  "x-order": 3,
                                  "type": "string",
                                  "maxLength": 100,
                                  "description": "Environment name"
                                },
                                "description": {
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "description",
                                    "json": "description"
                                  },
                                  "x-order": 4,
                                  "type": "string",
                                  "maxLength": 1000,
                                  "description": "Environment description"
                                },
                                "organizationId": {
                                  "x-go-name": "OrganizationID",
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "organization_id",
                                    "json": "organizationId"
                                  },
                                  "x-order": 5,
                                  "description": "Environment organization ID",
                                  "type": "string",
                                  "format": "uuid",
                                  "x-go-type": "uuid.UUID",
                                  "x-go-type-import": {
                                    "path": "github.com/gofrs/uuid"
                                  }
                                },
                                "owner": {
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "owner",
                                    "json": "owner"
                                  },
                                  "x-order": 6,
                                  "description": "Environment owner",
                                  "type": "string",
                                  "format": "uuid",
                                  "x-go-type": "uuid.UUID",
                                  "x-go-type-import": {
                                    "path": "github.com/gofrs/uuid"
                                  }
                                },
                                "createdAt": {
                                  "description": "Timestamp when the environment was created.",
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "created_at",
                                    "yaml": "created_at",
                                    "json": "createdAt"
                                  },
                                  "x-order": 7,
                                  "x-go-type": "time.Time",
                                  "type": "string",
                                  "format": "date-time",
                                  "x-go-name": "CreatedAt",
                                  "x-go-type-skip-optional-pointer": true
                                },
                                "metadata": {
                                  "description": "Additional metadata associated with the environment.",
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "metadata",
                                    "json": "metadata"
                                  },
                                  "x-order": 8,
                                  "x-go-type": "core.Map",
                                  "x-go-type-skip-optional-pointer": true,
                                  "type": "object"
                                },
                                "updatedAt": {
                                  "description": "Timestamp when the environment was last updated.",
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "updated_at",
                                    "yaml": "updated_at",
                                    "json": "updatedAt"
                                  },
                                  "x-order": 9,
                                  "x-go-type": "time.Time",
                                  "type": "string",
                                  "format": "date-time",
                                  "x-go-name": "UpdatedAt",
                                  "x-go-type-skip-optional-pointer": true
                                },
                                "deletedAt": {
                                  "description": "Timestamp when the environment was soft deleted. Null while the environment remains active.",
                                  "nullable": true,
                                  "x-oapi-codegen-extra-tags": {
                                    "db": "deleted_at",
                                    "json": "deletedAt"
                                  },
                                  "x-go-type": "core.NullTime",
                                  "x-go-import": "database/sql",
                                  "x-order": 10,
                                  "type": "string",
                                  "format": "date-time",
                                  "x-go-type-skip-optional-pointer": true
                                }
                              }
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "-",
                              "gorm": "-"
                            },
                            "x-go-type-skip-optional-pointer": true,
                            "x-order": 15
                          },
                          "schemaVersion": {
                            "description": "Specifies the version of the schema used for the definition.",
                            "x-order": 16,
                            "x-oapi-codegen-extra-tags": {
                              "db": "-",
                              "gorm": "-"
                            },
                            "default": "connections.meshery.io/v1beta3",
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
                          }
                        }
                      },
                      "x-order": 1
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of connections on all pages",
                      "x-oapi-codegen-extra-tags": {
                        "json": "totalCount"
                      },
                      "x-order": 2,
                      "minimum": 0
                    },
                    "page": {
                      "type": "integer",
                      "description": "Current page number",
                      "x-order": 3,
                      "minimum": 0
                    },
                    "pageSize": {
                      "type": "integer",
                      "description": "Number of elements per page",
                      "x-oapi-codegen-extra-tags": {
                        "json": "pageSize"
                      },
                      "x-order": 4,
                      "minimum": 1
                    },
                    "statusSummary": {
                      "type": "object",
                      "description": "Aggregate count of connections grouped by status",
                      "additionalProperties": {
                        "type": "integer"
                      },
                      "x-go-type": "map[ConnectionStatusValue]int",
                      "x-oapi-codegen-extra-tags": {
                        "json": "statusSummary,omitempty"
                      },
                      "x-order": 5
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
      "post": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "Connections"
        ],
        "operationId": "registerConnection",
        "summary": "Register a new connection",
        "description": "Register a new connection with credentials",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for creating or updating a connection",
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "description": "Connection ID",
                    "x-go-name": "ConnectionID",
                    "x-oapi-codegen-extra-tags": {
                      "json": "id,omitempty"
                    }
                  },
                  "name": {
                    "type": "string",
                    "description": "Connection name",
                    "x-oapi-codegen-extra-tags": {
                      "json": "name"
                    },
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "kind": {
                    "type": "string",
                    "description": "Connection kind",
                    "x-oapi-codegen-extra-tags": {
                      "json": "kind"
                    },
                    "maxLength": 255
                  },
                  "type": {
                    "type": "string",
                    "description": "Connection type",
                    "x-oapi-codegen-extra-tags": {
                      "json": "type"
                    },
                    "maxLength": 255
                  },
                  "subType": {
                    "type": "string",
                    "description": "Connection sub-type",
                    "x-oapi-codegen-extra-tags": {
                      "json": "subType"
                    },
                    "maxLength": 255
                  },
                  "credentialSecret": {
                    "type": "object",
                    "description": "Credential secret data",
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "credentialSecret"
                    }
                  },
                  "metadata": {
                    "type": "object",
                    "description": "Connection metadata",
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "metadata"
                    }
                  },
                  "styles": {
                    "x-go-type": "core.ComponentStyles",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    },
                    "x-oapi-codegen-extra-tags": {
                      "json": "styles,omitempty"
                    },
                    "description": "Visualization styles for the connection, including svgColor and svgWhite used for UI representation.",
                    "type": "object",
                    "required": [
                      "shape",
                      "primaryColor",
                      "svgColor",
                      "svgWhite",
                      "svgComplete"
                    ],
                    "allOf": [
                      {
                        "type": "object",
                        "description": "Common styles for all entities",
                        "additionalProperties": true,
                        "required": [
                          "primaryColor",
                          "svgColor",
                          "svgWhite",
                          "svgComplete"
                        ],
                        "properties": {
                          "primaryColor": {
                            "type": "string",
                            "description": "Primary color of the component used for UI representation.",
                            "maxLength": 500
                          },
                          "secondaryColor": {
                            "type": "string",
                            "description": "Secondary color of the entity used for UI representation.",
                            "maxLength": 500
                          },
                          "svgWhite": {
                            "type": "string",
                            "description": "White SVG of the entity used for UI representation on dark background.",
                            "maxLength": 500
                          },
                          "svgColor": {
                            "type": "string",
                            "description": "Colored SVG of the entity used for UI representation on light background.",
                            "maxLength": 500
                          },
                          "svgComplete": {
                            "type": "string",
                            "description": "Complete SVG of the entity used for UI representation, often inclusive of background.",
                            "maxLength": 500
                          },
                          "color": {
                            "type": "string",
                            "description": "The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 500
                          },
                          "textOpacity": {
                            "type": "number",
                            "description": "The opacity of the label text, including its outline.",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "fontFamily": {
                            "type": "string",
                            "description": "A comma-separated list of font names to use on the label text.",
                            "maxLength": 500
                          },
                          "fontSize": {
                            "type": "string",
                            "description": "The size of the label text.",
                            "maxLength": 500
                          },
                          "fontStyle": {
                            "type": "string",
                            "description": "A CSS font style to be applied to the label text.",
                            "maxLength": 500
                          },
                          "fontWeight": {
                            "type": "string",
                            "description": "A CSS font weight to be applied to the label text.",
                            "maxLength": 500
                          },
                          "textTransform": {
                            "type": "string",
                            "description": "A transformation to apply to the label text",
                            "enum": [
                              "none",
                              "uppercase",
                              "lowercase"
                            ]
                          },
                          "opacity": {
                            "type": "number",
                            "description": "The opacity of the element, ranging from 0 to 1. Note that the opacity of a compound node parent affects the effective opacity of its children.",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "zIndex": {
                            "type": "integer",
                            "description": "An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index.",
                            "minimum": 0
                          },
                          "label": {
                            "type": "string",
                            "description": "The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id",
                            "maxLength": 500
                          },
                          "animation": {
                            "type": "object",
                            "description": "The animation to apply to the element. example ripple,bounce,etc"
                          }
                        }
                      },
                      {
                        "type": "object",
                        "properties": {
                          "shape": {
                            "type": "string",
                            "description": "The shape of the node's body. Note that each shape fits within the specified width and height, and so you may have to adjust width and height if you desire an equilateral shape (i.e. width !== height for several equilateral shapes)",
                            "enum": [
                              "ellipse",
                              "triangle",
                              "round-triangle",
                              "rectangle",
                              "round-rectangle",
                              "bottom-round-rectangle",
                              "cut-rectangle",
                              "barrel",
                              "rhomboid",
                              "diamond",
                              "round-diamond",
                              "pentagon",
                              "round-pentagon",
                              "hexagon",
                              "round-hexagon",
                              "concave-hexagon",
                              "heptagon",
                              "round-heptagon",
                              "octagon",
                              "round-octagon",
                              "star",
                              "tag",
                              "round-tag",
                              "vee",
                              "polygon"
                            ]
                          },
                          "position": {
                            "type": "object",
                            "additionalProperties": false,
                            "required": [
                              "x",
                              "y"
                            ],
                            "description": "The position of the node. If the position is set, the node is drawn at that position in the given dimensions. If the position is not set, the node is drawn at a random position.",
                            "properties": {
                              "x": {
                                "type": "number",
                                "description": "The x-coordinate of the node.",
                                "minimum": -1000000,
                                "maximum": 1000000,
                                "x-go-type": "float64"
                              },
                              "y": {
                                "type": "number",
                                "description": "The y-coordinate of the node.",
                                "minimum": -1000000,
                                "maximum": 1000000,
                                "x-go-type": "float64"
                              }
                            }
                          },
                          "bodyText": {
                            "type": "string",
                            "description": "The text to display for an element's body. Can give a path, e.g. data(id) will label with the elements id",
                            "maxLength": 500
                          },
                          "bodyTextWrap": {
                            "type": "string",
                            "description": "How to wrap the text in the node. Can be 'none', 'wrap', or 'ellipsis'.",
                            "enum": [
                              "none",
                              "wrap",
                              "ellipsis"
                            ]
                          },
                          "bodyTextMaxWidth": {
                            "type": "string",
                            "description": "The maximum width for wrapping text in the node.",
                            "maxLength": 50
                          },
                          "bodyTextOpacity": {
                            "type": "number",
                            "description": "The opacity of the node's body text, including its outline.",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "bodyTextBackgroundColor": {
                            "type": "string",
                            "description": "The colour of the node's body text background. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "bodyTextFontSize": {
                            "type": "number",
                            "description": "The size of the node's body text.",
                            "minimum": 0
                          },
                          "bodyTextColor": {
                            "type": "string",
                            "description": "The colour of the node's body text. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "bodyTextFontWeight": {
                            "type": "string",
                            "description": "A CSS font weight to be applied to the node's body text.",
                            "maxLength": 50
                          },
                          "bodyTextHorizontalAlign": {
                            "type": "string",
                            "description": "A CSS horizontal alignment to be applied to the node's body text.",
                            "maxLength": 50
                          },
                          "bodyTextDecoration": {
                            "type": "string",
                            "description": "A CSS text decoration to be applied to the node's body text.",
                            "maxLength": 100
                          },
                          "bodyTextVerticalAlign": {
                            "type": "string",
                            "description": "A CSS vertical alignment to be applied to the node's body text.",
                            "maxLength": 50
                          },
                          "width": {
                            "type": "number",
                            "description": "The width of the node's body or the width of an edge's line.",
                            "minimum": 0
                          },
                          "height": {
                            "type": "number",
                            "description": "The height of the node's body",
                            "minimum": 0
                          },
                          "backgroundImage": {
                            "type": "string",
                            "format": "uri",
                            "description": "The URL that points to the image to show in the node.",
                            "maxLength": 2048
                          },
                          "backgroundColor": {
                            "type": "string",
                            "description": "The colour of the node's body. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "backgroundBlacken": {
                            "type": "number",
                            "description": "Blackens the node's body for values from 0 to 1; whitens the node's body for values from 0 to -1.",
                            "maximum": 1,
                            "minimum": -1
                          },
                          "backgroundOpacity": {
                            "type": "number",
                            "description": "The opacity level of the node's background colour",
                            "maximum": 1,
                            "minimum": 0
                          },
                          "backgroundPositionX": {
                            "type": "string",
                            "description": "The x position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                            "maxLength": 50
                          },
                          "backgroundPositionY": {
                            "type": "string",
                            "description": "The y position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                            "maxLength": 50
                          },
                          "backgroundOffsetX": {
                            "type": "string",
                            "description": "The x offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                            "maxLength": 50
                          },
                          "backgroundOffsetY": {
                            "type": "string",
                            "description": "The y offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                            "maxLength": 50
                          },
                          "backgroundFit": {
                            "type": "string",
                            "description": "How the background image is fit to the node. Can be 'none', 'contain', or 'cover'.",
                            "enum": [
                              "none",
                              "contain",
                              "cover"
                            ]
                          },
                          "backgroundClip": {
                            "type": "string",
                            "description": "How the background image is clipped to the node. Can be 'none', 'node', or 'node-border'.",
                            "enum": [
                              "none",
                              "node",
                              "node-border"
                            ]
                          },
                          "backgroundWidthRelativeTo": {
                            "type": "string",
                            "description": "How the background image's width is determined. Can be 'none', 'inner', or 'outer'.",
                            "enum": [
                              "none",
                              "inner",
                              "outer"
                            ]
                          },
                          "backgroundHeightRelativeTo": {
                            "type": "string",
                            "description": "How the background image's height is determined. Can be 'none', 'inner', or 'outer'.",
                            "enum": [
                              "none",
                              "inner",
                              "outer"
                            ]
                          },
                          "borderWidth": {
                            "type": "number",
                            "description": "The size of the node's border.",
                            "minimum": 0
                          },
                          "borderStyle": {
                            "type": "string",
                            "description": "The style of the node's border",
                            "enum": [
                              "solid",
                              "dotted",
                              "dashed",
                              "double"
                            ]
                          },
                          "borderColor": {
                            "type": "string",
                            "description": "The colour of the node's border. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "borderOpacity": {
                            "type": "number",
                            "description": "The opacity of the node's border",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "padding": {
                            "type": "number",
                            "description": "The amount of padding around all sides of the node.",
                            "minimum": 0
                          },
                          "textHalign": {
                            "type": "string",
                            "description": "The horizontal alignment of a node's label",
                            "enum": [
                              "left",
                              "center",
                              "right"
                            ]
                          },
                          "textValign": {
                            "type": "string",
                            "description": "The vertical alignment of a node's label",
                            "enum": [
                              "top",
                              "center",
                              "bottom"
                            ]
                          },
                          "ghost": {
                            "type": "string",
                            "description": "Whether to use the ghost effect, a semitransparent duplicate of the element drawn at an offset.",
                            "default": "no",
                            "enum": [
                              "yes",
                              "no"
                            ]
                          },
                          "activeBgColor": {
                            "type": "string",
                            "description": "The colour of the indicator shown when the background is grabbed by the user. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "activeBgOpacity": {
                            "type": "string",
                            "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                            "maxLength": 50
                          },
                          "activeBgSize": {
                            "type": "string",
                            "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                            "maxLength": 50
                          },
                          "selectionBoxColor": {
                            "type": "string",
                            "description": "The background colour of the selection box used for drag selection. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "selectionBoxBorderWidth": {
                            "type": "number",
                            "description": "The size of the border on the selection box. Selector needs to be *core*",
                            "minimum": 0
                          },
                          "selectionBoxOpacity": {
                            "type": "number",
                            "description": "The opacity of the selection box. Selector needs to be *core*",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "outsideTextureBgColor": {
                            "type": "string",
                            "description": "The colour of the area outside the viewport texture when initOptions.textureOnViewport === true. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "outsideTextureBgOpacity": {
                            "type": "number",
                            "description": "The opacity of the area outside the viewport texture. Selector needs to be *core*",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "shapePolygonPoints": {
                            "type": "string",
                            "description": "An array (or a space-separated string) of numbers ranging on [-1, 1], representing alternating x and y values (i.e. x1 y1 x2 y2, x3 y3 ...). This represents the points in the polygon for the node's shape. The bounding box of the node is given by (-1, -1), (1, -1), (1, 1), (-1, 1). The node's position is the origin (0, 0 )",
                            "maxLength": 2000
                          },
                          "menuBackgroundColor": {
                            "type": "string",
                            "description": "The colour of the background of the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "menuBackgroundOpacity": {
                            "type": "number",
                            "description": "The opacity of the background of the component menu.",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "menuForgroundColor": {
                            "type": "string",
                            "description": "The colour of the text or icons in the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          }
                        }
                      }
                    ]
                  },
                  "status": {
                    "type": "string",
                    "description": "Connection status",
                    "x-oapi-codegen-extra-tags": {
                      "json": "status"
                    },
                    "maxLength": 255
                  },
                  "credentialId": {
                    "type": "string",
                    "format": "uuid",
                    "description": "Associated credential ID",
                    "x-go-name": "CredentialID",
                    "x-oapi-codegen-extra-tags": {
                      "json": "credentialId,omitempty"
                    }
                  }
                },
                "required": [
                  "name",
                  "kind",
                  "type",
                  "subType",
                  "status"
                ]
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Connection registered",
            "content": {
              "application/json": {
                "schema": {
                  "$id": "https://schemas.meshery.io/connection.yaml",
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "description": "Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections",
                  "additionalProperties": false,
                  "type": "object",
                  "required": [
                    "id",
                    "schemaVersion",
                    "name",
                    "type",
                    "subType",
                    "kind",
                    "status"
                  ],
                  "properties": {
                    "id": {
                      "description": "Connection ID",
                      "x-order": 1,
                      "x-go-name": "ID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "name": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      },
                      "x-order": 2,
                      "type": "string",
                      "description": "Connection Name",
                      "minLength": 1,
                      "maxLength": 255
                    },
                    "description": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "description",
                        "json": "description"
                      },
                      "x-order": 3,
                      "type": "string",
                      "description": "Human-readable description of the connection and its purpose.",
                      "maxLength": 1000
                    },
                    "url": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "url",
                        "json": "url"
                      },
                      "x-order": 4,
                      "type": "string",
                      "format": "uri",
                      "description": "URL of the remote resource this connection points to (e.g. the Helm repository URL, the Kubernetes API server endpoint, the Grafana instance URL).",
                      "maxLength": 2048
                    },
                    "credentialId": {
                      "x-go-name": "CredentialID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "credential_id",
                        "json": "credentialId"
                      },
                      "x-order": 5,
                      "description": "Associated Credential ID",
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "type": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "type",
                        "json": "type",
                        "yaml": "type"
                      },
                      "x-go-name": "ConnectionType",
                      "x-order": 6,
                      "type": "string",
                      "description": "Connection Type (platform, telemetry, collaboration)",
                      "maxLength": 255
                    },
                    "subType": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "sub_type",
                        "json": "subType"
                      },
                      "x-order": 7,
                      "type": "string",
                      "description": "Connection Subtype (cloud, identity, metrics, chat, git, orchestration)",
                      "maxLength": 255
                    },
                    "kind": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "kind"
                      },
                      "x-order": 8,
                      "type": "string",
                      "description": "Connection Kind (meshery, kubernetes, prometheus, grafana, gke, aws, azure, slack, github)",
                      "maxLength": 255
                    },
                    "modelReference": {
                      "x-go-type": "modelv1beta1.ModelReference",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta1/model",
                        "name": "modelv1beta1"
                      },
                      "x-order": 8,
                      "description": "Reference to the specific registered model to which the component belongs and from which model version, category, and other properties may be referenced. Learn more at https://docs.meshery.io/concepts/models",
                      "x-oapi-codegen-extra-tags": {
                        "gorm": "model_reference",
                        "db": "model_reference",
                        "json": "modelReference",
                        "yaml": "modelReference"
                      },
                      "x-generate-db-helpers": true,
                      "type": "object",
                      "required": [
                        "id",
                        "name",
                        "version",
                        "displayName",
                        "model",
                        "registrant"
                      ],
                      "properties": {
                        "id": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          }
                        },
                        "name": {
                          "type": "string",
                          "description": "The unique name for the model within the scope of a registrant.",
                          "pattern": "^[a-z0-9-]+$",
                          "examples": [
                            "cert-manager"
                          ]
                        },
                        "version": {
                          "description": "Version of the model definition.",
                          "type": "string",
                          "minLength": 5,
                          "maxLength": 100,
                          "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                        },
                        "displayName": {
                          "type": "string",
                          "description": "Human-readable name for the model.",
                          "minLength": 1,
                          "maxLength": 100,
                          "pattern": "^[a-zA-Z0-9 ]+$",
                          "examples": [
                            "Cert Manager"
                          ]
                        },
                        "model": {
                          "type": "object",
                          "description": "Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31).",
                          "required": [
                            "version"
                          ],
                          "properties": {
                            "version": {
                              "description": "Version of the model as defined by the registrant.",
                              "x-oapi-codegen-extra-tags": {
                                "json": "version"
                              },
                              "x-order": 1,
                              "type": "string",
                              "minLength": 5,
                              "maxLength": 100,
                              "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                            }
                          }
                        },
                        "registrant": {
                          "x-go-type": "RegistrantReference",
                          "x-oapi-codegen-extra-tags": {
                            "json": "registrant"
                          },
                          "type": "object",
                          "required": [
                            "kind"
                          ],
                          "properties": {
                            "kind": {
                              "type": "string",
                              "description": "Kind of the registrant.",
                              "maxLength": 255
                            }
                          }
                        }
                      }
                    },
                    "metadata": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata"
                      },
                      "x-order": 9,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "type": "object",
                      "description": "Additional connection metadata"
                    },
                    "credentialSchema": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "credential_schema"
                      },
                      "x-order": 9,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "type": "object",
                      "description": "Schema for the credential Associated with the connection"
                    },
                    "connectionSchema": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "connection_schema"
                      },
                      "x-order": 9,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "type": "object",
                      "description": "Schema for the connection"
                    },
                    "styles": {
                      "x-oapi-codegen-extra-tags": {
                        "gorm": "type:bytes;serializer:json",
                        "db": "-",
                        "yaml": "styles",
                        "json": "styles"
                      },
                      "x-go-type": "core.ComponentStyles",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-order": 17,
                      "description": "Visualization styles for the connection, including svgColor and svgWhite used for UI representation.",
                      "type": "object",
                      "required": [
                        "shape",
                        "primaryColor",
                        "svgColor",
                        "svgWhite",
                        "svgComplete"
                      ],
                      "allOf": [
                        {
                          "type": "object",
                          "description": "Common styles for all entities",
                          "additionalProperties": true,
                          "required": [
                            "primaryColor",
                            "svgColor",
                            "svgWhite",
                            "svgComplete"
                          ],
                          "properties": {
                            "primaryColor": {
                              "type": "string",
                              "description": "Primary color of the component used for UI representation.",
                              "maxLength": 500
                            },
                            "secondaryColor": {
                              "type": "string",
                              "description": "Secondary color of the entity used for UI representation.",
                              "maxLength": 500
                            },
                            "svgWhite": {
                              "type": "string",
                              "description": "White SVG of the entity used for UI representation on dark background.",
                              "maxLength": 500
                            },
                            "svgColor": {
                              "type": "string",
                              "description": "Colored SVG of the entity used for UI representation on light background.",
                              "maxLength": 500
                            },
                            "svgComplete": {
                              "type": "string",
                              "description": "Complete SVG of the entity used for UI representation, often inclusive of background.",
                              "maxLength": 500
                            },
                            "color": {
                              "type": "string",
                              "description": "The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 500
                            },
                            "textOpacity": {
                              "type": "number",
                              "description": "The opacity of the label text, including its outline.",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "fontFamily": {
                              "type": "string",
                              "description": "A comma-separated list of font names to use on the label text.",
                              "maxLength": 500
                            },
                            "fontSize": {
                              "type": "string",
                              "description": "The size of the label text.",
                              "maxLength": 500
                            },
                            "fontStyle": {
                              "type": "string",
                              "description": "A CSS font style to be applied to the label text.",
                              "maxLength": 500
                            },
                            "fontWeight": {
                              "type": "string",
                              "description": "A CSS font weight to be applied to the label text.",
                              "maxLength": 500
                            },
                            "textTransform": {
                              "type": "string",
                              "description": "A transformation to apply to the label text",
                              "enum": [
                                "none",
                                "uppercase",
                                "lowercase"
                              ]
                            },
                            "opacity": {
                              "type": "number",
                              "description": "The opacity of the element, ranging from 0 to 1. Note that the opacity of a compound node parent affects the effective opacity of its children.",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "zIndex": {
                              "type": "integer",
                              "description": "An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index.",
                              "minimum": 0
                            },
                            "label": {
                              "type": "string",
                              "description": "The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id",
                              "maxLength": 500
                            },
                            "animation": {
                              "type": "object",
                              "description": "The animation to apply to the element. example ripple,bounce,etc"
                            }
                          }
                        },
                        {
                          "type": "object",
                          "properties": {
                            "shape": {
                              "type": "string",
                              "description": "The shape of the node's body. Note that each shape fits within the specified width and height, and so you may have to adjust width and height if you desire an equilateral shape (i.e. width !== height for several equilateral shapes)",
                              "enum": [
                                "ellipse",
                                "triangle",
                                "round-triangle",
                                "rectangle",
                                "round-rectangle",
                                "bottom-round-rectangle",
                                "cut-rectangle",
                                "barrel",
                                "rhomboid",
                                "diamond",
                                "round-diamond",
                                "pentagon",
                                "round-pentagon",
                                "hexagon",
                                "round-hexagon",
                                "concave-hexagon",
                                "heptagon",
                                "round-heptagon",
                                "octagon",
                                "round-octagon",
                                "star",
                                "tag",
                                "round-tag",
                                "vee",
                                "polygon"
                              ]
                            },
                            "position": {
                              "type": "object",
                              "additionalProperties": false,
                              "required": [
                                "x",
                                "y"
                              ],
                              "description": "The position of the node. If the position is set, the node is drawn at that position in the given dimensions. If the position is not set, the node is drawn at a random position.",
                              "properties": {
                                "x": {
                                  "type": "number",
                                  "description": "The x-coordinate of the node.",
                                  "minimum": -1000000,
                                  "maximum": 1000000,
                                  "x-go-type": "float64"
                                },
                                "y": {
                                  "type": "number",
                                  "description": "The y-coordinate of the node.",
                                  "minimum": -1000000,
                                  "maximum": 1000000,
                                  "x-go-type": "float64"
                                }
                              }
                            },
                            "bodyText": {
                              "type": "string",
                              "description": "The text to display for an element's body. Can give a path, e.g. data(id) will label with the elements id",
                              "maxLength": 500
                            },
                            "bodyTextWrap": {
                              "type": "string",
                              "description": "How to wrap the text in the node. Can be 'none', 'wrap', or 'ellipsis'.",
                              "enum": [
                                "none",
                                "wrap",
                                "ellipsis"
                              ]
                            },
                            "bodyTextMaxWidth": {
                              "type": "string",
                              "description": "The maximum width for wrapping text in the node.",
                              "maxLength": 50
                            },
                            "bodyTextOpacity": {
                              "type": "number",
                              "description": "The opacity of the node's body text, including its outline.",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "bodyTextBackgroundColor": {
                              "type": "string",
                              "description": "The colour of the node's body text background. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "bodyTextFontSize": {
                              "type": "number",
                              "description": "The size of the node's body text.",
                              "minimum": 0
                            },
                            "bodyTextColor": {
                              "type": "string",
                              "description": "The colour of the node's body text. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "bodyTextFontWeight": {
                              "type": "string",
                              "description": "A CSS font weight to be applied to the node's body text.",
                              "maxLength": 50
                            },
                            "bodyTextHorizontalAlign": {
                              "type": "string",
                              "description": "A CSS horizontal alignment to be applied to the node's body text.",
                              "maxLength": 50
                            },
                            "bodyTextDecoration": {
                              "type": "string",
                              "description": "A CSS text decoration to be applied to the node's body text.",
                              "maxLength": 100
                            },
                            "bodyTextVerticalAlign": {
                              "type": "string",
                              "description": "A CSS vertical alignment to be applied to the node's body text.",
                              "maxLength": 50
                            },
                            "width": {
                              "type": "number",
                              "description": "The width of the node's body or the width of an edge's line.",
                              "minimum": 0
                            },
                            "height": {
                              "type": "number",
                              "description": "The height of the node's body",
                              "minimum": 0
                            },
                            "backgroundImage": {
                              "type": "string",
                              "format": "uri",
                              "description": "The URL that points to the image to show in the node.",
                              "maxLength": 2048
                            },
                            "backgroundColor": {
                              "type": "string",
                              "description": "The colour of the node's body. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "backgroundBlacken": {
                              "type": "number",
                              "description": "Blackens the node's body for values from 0 to 1; whitens the node's body for values from 0 to -1.",
                              "maximum": 1,
                              "minimum": -1
                            },
                            "backgroundOpacity": {
                              "type": "number",
                              "description": "The opacity level of the node's background colour",
                              "maximum": 1,
                              "minimum": 0
                            },
                            "backgroundPositionX": {
                              "type": "string",
                              "description": "The x position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                              "maxLength": 50
                            },
                            "backgroundPositionY": {
                              "type": "string",
                              "description": "The y position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                              "maxLength": 50
                            },
                            "backgroundOffsetX": {
                              "type": "string",
                              "description": "The x offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                              "maxLength": 50
                            },
                            "backgroundOffsetY": {
                              "type": "string",
                              "description": "The y offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                              "maxLength": 50
                            },
                            "backgroundFit": {
                              "type": "string",
                              "description": "How the background image is fit to the node. Can be 'none', 'contain', or 'cover'.",
                              "enum": [
                                "none",
                                "contain",
                                "cover"
                              ]
                            },
                            "backgroundClip": {
                              "type": "string",
                              "description": "How the background image is clipped to the node. Can be 'none', 'node', or 'node-border'.",
                              "enum": [
                                "none",
                                "node",
                                "node-border"
                              ]
                            },
                            "backgroundWidthRelativeTo": {
                              "type": "string",
                              "description": "How the background image's width is determined. Can be 'none', 'inner', or 'outer'.",
                              "enum": [
                                "none",
                                "inner",
                                "outer"
                              ]
                            },
                            "backgroundHeightRelativeTo": {
                              "type": "string",
                              "description": "How the background image's height is determined. Can be 'none', 'inner', or 'outer'.",
                              "enum": [
                                "none",
                                "inner",
                                "outer"
                              ]
                            },
                            "borderWidth": {
                              "type": "number",
                              "description": "The size of the node's border.",
                              "minimum": 0
                            },
                            "borderStyle": {
                              "type": "string",
                              "description": "The style of the node's border",
                              "enum": [
                                "solid",
                                "dotted",
                                "dashed",
                                "double"
                              ]
                            },
                            "borderColor": {
                              "type": "string",
                              "description": "The colour of the node's border. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "borderOpacity": {
                              "type": "number",
                              "description": "The opacity of the node's border",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "padding": {
                              "type": "number",
                              "description": "The amount of padding around all sides of the node.",
                              "minimum": 0
                            },
                            "textHalign": {
                              "type": "string",
                              "description": "The horizontal alignment of a node's label",
                              "enum": [
                                "left",
                                "center",
                                "right"
                              ]
                            },
                            "textValign": {
                              "type": "string",
                              "description": "The vertical alignment of a node's label",
                              "enum": [
                                "top",
                                "center",
                                "bottom"
                              ]
                            },
                            "ghost": {
                              "type": "string",
                              "description": "Whether to use the ghost effect, a semitransparent duplicate of the element drawn at an offset.",
                              "default": "no",
                              "enum": [
                                "yes",
                                "no"
                              ]
                            },
                            "activeBgColor": {
                              "type": "string",
                              "description": "The colour of the indicator shown when the background is grabbed by the user. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "activeBgOpacity": {
                              "type": "string",
                              "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                              "maxLength": 50
                            },
                            "activeBgSize": {
                              "type": "string",
                              "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                              "maxLength": 50
                            },
                            "selectionBoxColor": {
                              "type": "string",
                              "description": "The background colour of the selection box used for drag selection. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "selectionBoxBorderWidth": {
                              "type": "number",
                              "description": "The size of the border on the selection box. Selector needs to be *core*",
                              "minimum": 0
                            },
                            "selectionBoxOpacity": {
                              "type": "number",
                              "description": "The opacity of the selection box. Selector needs to be *core*",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "outsideTextureBgColor": {
                              "type": "string",
                              "description": "The colour of the area outside the viewport texture when initOptions.textureOnViewport === true. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "outsideTextureBgOpacity": {
                              "type": "number",
                              "description": "The opacity of the area outside the viewport texture. Selector needs to be *core*",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "shapePolygonPoints": {
                              "type": "string",
                              "description": "An array (or a space-separated string) of numbers ranging on [-1, 1], representing alternating x and y values (i.e. x1 y1 x2 y2, x3 y3 ...). This represents the points in the polygon for the node's shape. The bounding box of the node is given by (-1, -1), (1, -1), (1, 1), (-1, 1). The node's position is the origin (0, 0 )",
                              "maxLength": 2000
                            },
                            "menuBackgroundColor": {
                              "type": "string",
                              "description": "The colour of the background of the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "menuBackgroundOpacity": {
                              "type": "number",
                              "description": "The opacity of the background of the component menu.",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "menuForgroundColor": {
                              "type": "string",
                              "description": "The colour of the text or icons in the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            }
                          }
                        }
                      ]
                    },
                    "status": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      },
                      "x-order": 10,
                      "description": "Connection Status",
                      "type": "string",
                      "enum": [
                        "discovered",
                        "registered",
                        "connected",
                        "ignored",
                        "maintenance",
                        "disconnected",
                        "deleted",
                        "not found"
                      ]
                    },
                    "transitionMap": {
                      "type": "object",
                      "description": "Map describing the connection state machine. Each key is a current connection status and its value is the list of states the connection may transition to from that status, along with a description of each transition.",
                      "additionalProperties": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "additionalProperties": false,
                          "description": "A single permissible state transition for a connection, describing the next reachable state and the meaning of that transition.",
                          "required": [
                            "nextState"
                          ],
                          "properties": {
                            "nextState": {
                              "type": "string",
                              "description": "Connection Status Value",
                              "x-go-name": "ConnectionStatusValue",
                              "enum": [
                                "discovered",
                                "registered",
                                "connected",
                                "ignored",
                                "maintenance",
                                "disconnected",
                                "deleted",
                                "not found"
                              ],
                              "x-order": 1
                            },
                            "description": {
                              "type": "string",
                              "description": "Human-readable explanation of when or why this transition occurs.",
                              "maxLength": 1000,
                              "x-oapi-codegen-extra-tags": {
                                "json": "description,omitempty"
                              },
                              "x-order": 2
                            }
                          }
                        }
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "gorm": "type:bytes;serializer:json",
                        "db": "-",
                        "json": "transitionMap,omitempty"
                      },
                      "x-order": 18
                    },
                    "owner": {
                      "x-go-name": "Owner",
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner",
                        "json": "owner"
                      },
                      "x-order": 11,
                      "description": "User ID who owns this connection",
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "createdAt": {
                      "description": "Timestamp when the connection was created.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "createdAt"
                      },
                      "x-order": 12,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp when the connection was last updated.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updatedAt"
                      },
                      "x-order": 13,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "description": "Timestamp when the connection was soft-deleted, if applicable.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deletedAt"
                      },
                      "x-order": 14,
                      "x-go-type": "meshcore.NullTime",
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "type": "string",
                      "format": "date-time",
                      "nullable": true,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "environments": {
                      "type": "array",
                      "description": "Associated environments for this connection",
                      "items": {
                        "x-go-type": "*environmentv1beta3.Environment",
                        "x-go-type-import": {
                          "path": "github.com/meshery/schemas/models/v1beta3/environment",
                          "name": "environmentv1beta3"
                        },
                        "$id": "https://schemas.meshery.io/environment.yaml",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "title": "Environment",
                        "description": "Environments allow you to logically group related Connections and their associated Credentials. Learn more at https://docs.meshery.io/concepts/logical/environments",
                        "additionalProperties": false,
                        "type": "object",
                        "example": {
                          "id": "00000000-0000-0000-0000-000000000000",
                          "schemaVersion": "environments.meshery.io/v1beta3",
                          "name": "Production Environment",
                          "description": "Connections and credentials for the production cluster.",
                          "organizationId": "00000000-0000-0000-0000-000000000000",
                          "owner": "00000000-0000-0000-0000-000000000000",
                          "createdAt": "0001-01-01T00:00:00Z",
                          "metadata": {},
                          "updatedAt": "0001-01-01T00:00:00Z",
                          "deletedAt": null
                        },
                        "required": [
                          "id",
                          "schemaVersion",
                          "name",
                          "description",
                          "organizationId"
                        ],
                        "properties": {
                          "id": {
                            "description": "ID",
                            "x-order": 1,
                            "x-go-name": "ID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "id",
                              "json": "id"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "schemaVersion": {
                            "description": "Specifies the version of the schema to which the environment conforms.",
                            "x-order": 2,
                            "x-oapi-codegen-extra-tags": {
                              "json": "schemaVersion",
                              "db": "-",
                              "gorm": "-"
                            },
                            "default": "environments.meshery.io/v1beta3",
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
                          "name": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "name",
                              "json": "name"
                            },
                            "x-order": 3,
                            "type": "string",
                            "maxLength": 100,
                            "description": "Environment name"
                          },
                          "description": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "description",
                              "json": "description"
                            },
                            "x-order": 4,
                            "type": "string",
                            "maxLength": 1000,
                            "description": "Environment description"
                          },
                          "organizationId": {
                            "x-go-name": "OrganizationID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "organization_id",
                              "json": "organizationId"
                            },
                            "x-order": 5,
                            "description": "Environment organization ID",
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "owner": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "owner",
                              "json": "owner"
                            },
                            "x-order": 6,
                            "description": "Environment owner",
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "createdAt": {
                            "description": "Timestamp when the environment was created.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "yaml": "created_at",
                              "json": "createdAt"
                            },
                            "x-order": 7,
                            "x-go-type": "time.Time",
                            "type": "string",
                            "format": "date-time",
                            "x-go-name": "CreatedAt",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "metadata": {
                            "description": "Additional metadata associated with the environment.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "metadata",
                              "json": "metadata"
                            },
                            "x-order": 8,
                            "x-go-type": "core.Map",
                            "x-go-type-skip-optional-pointer": true,
                            "type": "object"
                          },
                          "updatedAt": {
                            "description": "Timestamp when the environment was last updated.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "yaml": "updated_at",
                              "json": "updatedAt"
                            },
                            "x-order": 9,
                            "x-go-type": "time.Time",
                            "type": "string",
                            "format": "date-time",
                            "x-go-name": "UpdatedAt",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deletedAt": {
                            "description": "Timestamp when the environment was soft deleted. Null while the environment remains active.",
                            "nullable": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "json": "deletedAt"
                            },
                            "x-go-type": "core.NullTime",
                            "x-go-import": "database/sql",
                            "x-order": 10,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          }
                        }
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "-",
                        "gorm": "-"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 15
                    },
                    "schemaVersion": {
                      "description": "Specifies the version of the schema used for the definition.",
                      "x-order": 16,
                      "x-oapi-codegen-extra-tags": {
                        "db": "-",
                        "gorm": "-"
                      },
                      "default": "connections.meshery.io/v1beta3",
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
    "/api/integrations/connections/register": {
      "post": {
        "x-internal": [
          "meshery"
        ],
        "tags": [
          "Connections"
        ],
        "summary": "Drive the connection registration state machine",
        "description": "Dispatches a lifecycle event for an in-progress connection registration. With status `initialize`, responds with the registration bootstrap - the kind's connection (and credential, when one exists) registry component definitions plus a tracker `id` the client echoes on subsequent events. Every other status is forwarded to the tracked registration's state machine and the response body is empty.",
        "operationId": "processConnectionRegistration",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Lifecycle event for the connection registration state machine (POST /api/integrations/connections/register). Unlike `ConnectionPayload`, only `kind` and `status` are always present: an `initialize` event carries just the kind, while `register` / `connect` events carry the connection details assembled so far.",
                "additionalProperties": false,
                "required": [
                  "kind",
                  "status"
                ],
                "properties": {
                  "id": {
                    "description": "Registration process tracker. Returned by the `initialize` bootstrap or minted client-side; echoed on every subsequent event for the same registration.",
                    "x-go-name": "ID",
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "id,omitempty"
                    },
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  },
                  "kind": {
                    "type": "string",
                    "description": "Connection kind (e.g. `kubernetes`, `grafana`, `prometheus`).",
                    "maxLength": 255,
                    "x-oapi-codegen-extra-tags": {
                      "json": "kind"
                    }
                  },
                  "status": {
                    "type": "string",
                    "description": "State-machine event to dispatch. `initialize` returns the registration bootstrap; every other event advances the tracked registration. `not found` is the machine's literal event name.",
                    "enum": [
                      "initialize",
                      "discovery",
                      "register",
                      "connect",
                      "disconnect",
                      "ignore",
                      "delete",
                      "not found",
                      "noop",
                      "exit"
                    ],
                    "x-oapi-codegen-extra-tags": {
                      "json": "status"
                    }
                  },
                  "name": {
                    "type": "string",
                    "description": "Connection name.",
                    "maxLength": 255,
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "name,omitempty"
                    }
                  },
                  "type": {
                    "type": "string",
                    "description": "Connection type.",
                    "maxLength": 255,
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "type,omitempty"
                    }
                  },
                  "subType": {
                    "type": "string",
                    "description": "Connection sub-type.",
                    "maxLength": 255,
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "subType,omitempty"
                    }
                  },
                  "model": {
                    "type": "string",
                    "description": "Registry model the connection's definition belongs to.",
                    "maxLength": 255,
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "model,omitempty"
                    }
                  },
                  "metadata": {
                    "type": "object",
                    "description": "Connection metadata gathered so far in the flow.",
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "metadata,omitempty"
                    }
                  },
                  "credentialSecret": {
                    "type": "object",
                    "description": "Credential secret material for the connection.",
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "credentialSecret,omitempty"
                    }
                  },
                  "credentialId": {
                    "description": "Existing credential to associate instead of a new secret.",
                    "x-go-name": "CredentialID",
                    "x-oapi-codegen-extra-tags": {
                      "json": "credentialId,omitempty"
                    },
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  },
                  "skipCredentialVerification": {
                    "type": "boolean",
                    "description": "When true the server registers the connection without verifying the supplied credential first.",
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "skipCredentialVerification"
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Registration bootstrap for status `initialize`; empty body for every other status.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Response to an `initialize` registration event: the registry component definitions describing the kind's connection and credential, plus the tracker id for the registration process. Component definitions carry their RJSF form schema as a JSON-encoded string under `schema`.",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "connection"
                  ],
                  "properties": {
                    "id": {
                      "description": "Registration process tracker to echo on subsequent events.",
                      "x-go-name": "ID",
                      "x-oapi-codegen-extra-tags": {
                        "json": "id"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "connection": {
                      "type": "object",
                      "description": "Registry component definition (`{Kind}Connection`) describing the connection, including its JSON-encoded `schema`.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "json": "connection"
                      }
                    },
                    "credential": {
                      "type": "object",
                      "description": "Registry component definition (`{Kind}Credential`) describing the credential, including its JSON-encoded `schema`. Absent when the kind defines no credential component.",
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "json": "credential,omitempty"
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Malformed payload, or no connection component is registered for the requested kind."
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
            "description": "Failed to resolve the provider token, or to initialize / signal the registration state machine."
          }
        }
      }
    },
    "/api/integrations/connections/register/{registrationId}": {
      "delete": {
        "x-internal": [
          "meshery"
        ],
        "tags": [
          "Connections"
        ],
        "summary": "Cancel a connection registration",
        "description": "Discards the in-progress registration state machine tracked by `registrationId`. Nothing is persisted for the abandoned process. Idempotent: unknown ids are ignored.",
        "operationId": "cancelConnectionRegister",
        "parameters": [
          {
            "name": "registrationId",
            "in": "path",
            "required": true,
            "description": "Registration process tracker id to discard.",
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
            "description": "Registration process discarded."
          },
          "400": {
            "description": "registrationId is not a valid UUID."
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
    "/api/integrations/connections/{connectionId}": {
      "get": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "Connections"
        ],
        "operationId": "getConnectionById",
        "summary": "Get connection by ID",
        "description": "Returns a specific connection by its ID",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "description": "Connection ID",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Connection details",
            "content": {
              "application/json": {
                "schema": {
                  "$id": "https://schemas.meshery.io/connection.yaml",
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "description": "Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections",
                  "additionalProperties": false,
                  "type": "object",
                  "required": [
                    "id",
                    "schemaVersion",
                    "name",
                    "type",
                    "subType",
                    "kind",
                    "status"
                  ],
                  "properties": {
                    "id": {
                      "description": "Connection ID",
                      "x-order": 1,
                      "x-go-name": "ID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "name": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      },
                      "x-order": 2,
                      "type": "string",
                      "description": "Connection Name",
                      "minLength": 1,
                      "maxLength": 255
                    },
                    "description": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "description",
                        "json": "description"
                      },
                      "x-order": 3,
                      "type": "string",
                      "description": "Human-readable description of the connection and its purpose.",
                      "maxLength": 1000
                    },
                    "url": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "url",
                        "json": "url"
                      },
                      "x-order": 4,
                      "type": "string",
                      "format": "uri",
                      "description": "URL of the remote resource this connection points to (e.g. the Helm repository URL, the Kubernetes API server endpoint, the Grafana instance URL).",
                      "maxLength": 2048
                    },
                    "credentialId": {
                      "x-go-name": "CredentialID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "credential_id",
                        "json": "credentialId"
                      },
                      "x-order": 5,
                      "description": "Associated Credential ID",
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "type": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "type",
                        "json": "type",
                        "yaml": "type"
                      },
                      "x-go-name": "ConnectionType",
                      "x-order": 6,
                      "type": "string",
                      "description": "Connection Type (platform, telemetry, collaboration)",
                      "maxLength": 255
                    },
                    "subType": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "sub_type",
                        "json": "subType"
                      },
                      "x-order": 7,
                      "type": "string",
                      "description": "Connection Subtype (cloud, identity, metrics, chat, git, orchestration)",
                      "maxLength": 255
                    },
                    "kind": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "kind"
                      },
                      "x-order": 8,
                      "type": "string",
                      "description": "Connection Kind (meshery, kubernetes, prometheus, grafana, gke, aws, azure, slack, github)",
                      "maxLength": 255
                    },
                    "modelReference": {
                      "x-go-type": "modelv1beta1.ModelReference",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta1/model",
                        "name": "modelv1beta1"
                      },
                      "x-order": 8,
                      "description": "Reference to the specific registered model to which the component belongs and from which model version, category, and other properties may be referenced. Learn more at https://docs.meshery.io/concepts/models",
                      "x-oapi-codegen-extra-tags": {
                        "gorm": "model_reference",
                        "db": "model_reference",
                        "json": "modelReference",
                        "yaml": "modelReference"
                      },
                      "x-generate-db-helpers": true,
                      "type": "object",
                      "required": [
                        "id",
                        "name",
                        "version",
                        "displayName",
                        "model",
                        "registrant"
                      ],
                      "properties": {
                        "id": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          }
                        },
                        "name": {
                          "type": "string",
                          "description": "The unique name for the model within the scope of a registrant.",
                          "pattern": "^[a-z0-9-]+$",
                          "examples": [
                            "cert-manager"
                          ]
                        },
                        "version": {
                          "description": "Version of the model definition.",
                          "type": "string",
                          "minLength": 5,
                          "maxLength": 100,
                          "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                        },
                        "displayName": {
                          "type": "string",
                          "description": "Human-readable name for the model.",
                          "minLength": 1,
                          "maxLength": 100,
                          "pattern": "^[a-zA-Z0-9 ]+$",
                          "examples": [
                            "Cert Manager"
                          ]
                        },
                        "model": {
                          "type": "object",
                          "description": "Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31).",
                          "required": [
                            "version"
                          ],
                          "properties": {
                            "version": {
                              "description": "Version of the model as defined by the registrant.",
                              "x-oapi-codegen-extra-tags": {
                                "json": "version"
                              },
                              "x-order": 1,
                              "type": "string",
                              "minLength": 5,
                              "maxLength": 100,
                              "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                            }
                          }
                        },
                        "registrant": {
                          "x-go-type": "RegistrantReference",
                          "x-oapi-codegen-extra-tags": {
                            "json": "registrant"
                          },
                          "type": "object",
                          "required": [
                            "kind"
                          ],
                          "properties": {
                            "kind": {
                              "type": "string",
                              "description": "Kind of the registrant.",
                              "maxLength": 255
                            }
                          }
                        }
                      }
                    },
                    "metadata": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata"
                      },
                      "x-order": 9,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "type": "object",
                      "description": "Additional connection metadata"
                    },
                    "credentialSchema": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "credential_schema"
                      },
                      "x-order": 9,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "type": "object",
                      "description": "Schema for the credential Associated with the connection"
                    },
                    "connectionSchema": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "connection_schema"
                      },
                      "x-order": 9,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "type": "object",
                      "description": "Schema for the connection"
                    },
                    "styles": {
                      "x-oapi-codegen-extra-tags": {
                        "gorm": "type:bytes;serializer:json",
                        "db": "-",
                        "yaml": "styles",
                        "json": "styles"
                      },
                      "x-go-type": "core.ComponentStyles",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-order": 17,
                      "description": "Visualization styles for the connection, including svgColor and svgWhite used for UI representation.",
                      "type": "object",
                      "required": [
                        "shape",
                        "primaryColor",
                        "svgColor",
                        "svgWhite",
                        "svgComplete"
                      ],
                      "allOf": [
                        {
                          "type": "object",
                          "description": "Common styles for all entities",
                          "additionalProperties": true,
                          "required": [
                            "primaryColor",
                            "svgColor",
                            "svgWhite",
                            "svgComplete"
                          ],
                          "properties": {
                            "primaryColor": {
                              "type": "string",
                              "description": "Primary color of the component used for UI representation.",
                              "maxLength": 500
                            },
                            "secondaryColor": {
                              "type": "string",
                              "description": "Secondary color of the entity used for UI representation.",
                              "maxLength": 500
                            },
                            "svgWhite": {
                              "type": "string",
                              "description": "White SVG of the entity used for UI representation on dark background.",
                              "maxLength": 500
                            },
                            "svgColor": {
                              "type": "string",
                              "description": "Colored SVG of the entity used for UI representation on light background.",
                              "maxLength": 500
                            },
                            "svgComplete": {
                              "type": "string",
                              "description": "Complete SVG of the entity used for UI representation, often inclusive of background.",
                              "maxLength": 500
                            },
                            "color": {
                              "type": "string",
                              "description": "The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 500
                            },
                            "textOpacity": {
                              "type": "number",
                              "description": "The opacity of the label text, including its outline.",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "fontFamily": {
                              "type": "string",
                              "description": "A comma-separated list of font names to use on the label text.",
                              "maxLength": 500
                            },
                            "fontSize": {
                              "type": "string",
                              "description": "The size of the label text.",
                              "maxLength": 500
                            },
                            "fontStyle": {
                              "type": "string",
                              "description": "A CSS font style to be applied to the label text.",
                              "maxLength": 500
                            },
                            "fontWeight": {
                              "type": "string",
                              "description": "A CSS font weight to be applied to the label text.",
                              "maxLength": 500
                            },
                            "textTransform": {
                              "type": "string",
                              "description": "A transformation to apply to the label text",
                              "enum": [
                                "none",
                                "uppercase",
                                "lowercase"
                              ]
                            },
                            "opacity": {
                              "type": "number",
                              "description": "The opacity of the element, ranging from 0 to 1. Note that the opacity of a compound node parent affects the effective opacity of its children.",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "zIndex": {
                              "type": "integer",
                              "description": "An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index.",
                              "minimum": 0
                            },
                            "label": {
                              "type": "string",
                              "description": "The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id",
                              "maxLength": 500
                            },
                            "animation": {
                              "type": "object",
                              "description": "The animation to apply to the element. example ripple,bounce,etc"
                            }
                          }
                        },
                        {
                          "type": "object",
                          "properties": {
                            "shape": {
                              "type": "string",
                              "description": "The shape of the node's body. Note that each shape fits within the specified width and height, and so you may have to adjust width and height if you desire an equilateral shape (i.e. width !== height for several equilateral shapes)",
                              "enum": [
                                "ellipse",
                                "triangle",
                                "round-triangle",
                                "rectangle",
                                "round-rectangle",
                                "bottom-round-rectangle",
                                "cut-rectangle",
                                "barrel",
                                "rhomboid",
                                "diamond",
                                "round-diamond",
                                "pentagon",
                                "round-pentagon",
                                "hexagon",
                                "round-hexagon",
                                "concave-hexagon",
                                "heptagon",
                                "round-heptagon",
                                "octagon",
                                "round-octagon",
                                "star",
                                "tag",
                                "round-tag",
                                "vee",
                                "polygon"
                              ]
                            },
                            "position": {
                              "type": "object",
                              "additionalProperties": false,
                              "required": [
                                "x",
                                "y"
                              ],
                              "description": "The position of the node. If the position is set, the node is drawn at that position in the given dimensions. If the position is not set, the node is drawn at a random position.",
                              "properties": {
                                "x": {
                                  "type": "number",
                                  "description": "The x-coordinate of the node.",
                                  "minimum": -1000000,
                                  "maximum": 1000000,
                                  "x-go-type": "float64"
                                },
                                "y": {
                                  "type": "number",
                                  "description": "The y-coordinate of the node.",
                                  "minimum": -1000000,
                                  "maximum": 1000000,
                                  "x-go-type": "float64"
                                }
                              }
                            },
                            "bodyText": {
                              "type": "string",
                              "description": "The text to display for an element's body. Can give a path, e.g. data(id) will label with the elements id",
                              "maxLength": 500
                            },
                            "bodyTextWrap": {
                              "type": "string",
                              "description": "How to wrap the text in the node. Can be 'none', 'wrap', or 'ellipsis'.",
                              "enum": [
                                "none",
                                "wrap",
                                "ellipsis"
                              ]
                            },
                            "bodyTextMaxWidth": {
                              "type": "string",
                              "description": "The maximum width for wrapping text in the node.",
                              "maxLength": 50
                            },
                            "bodyTextOpacity": {
                              "type": "number",
                              "description": "The opacity of the node's body text, including its outline.",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "bodyTextBackgroundColor": {
                              "type": "string",
                              "description": "The colour of the node's body text background. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "bodyTextFontSize": {
                              "type": "number",
                              "description": "The size of the node's body text.",
                              "minimum": 0
                            },
                            "bodyTextColor": {
                              "type": "string",
                              "description": "The colour of the node's body text. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "bodyTextFontWeight": {
                              "type": "string",
                              "description": "A CSS font weight to be applied to the node's body text.",
                              "maxLength": 50
                            },
                            "bodyTextHorizontalAlign": {
                              "type": "string",
                              "description": "A CSS horizontal alignment to be applied to the node's body text.",
                              "maxLength": 50
                            },
                            "bodyTextDecoration": {
                              "type": "string",
                              "description": "A CSS text decoration to be applied to the node's body text.",
                              "maxLength": 100
                            },
                            "bodyTextVerticalAlign": {
                              "type": "string",
                              "description": "A CSS vertical alignment to be applied to the node's body text.",
                              "maxLength": 50
                            },
                            "width": {
                              "type": "number",
                              "description": "The width of the node's body or the width of an edge's line.",
                              "minimum": 0
                            },
                            "height": {
                              "type": "number",
                              "description": "The height of the node's body",
                              "minimum": 0
                            },
                            "backgroundImage": {
                              "type": "string",
                              "format": "uri",
                              "description": "The URL that points to the image to show in the node.",
                              "maxLength": 2048
                            },
                            "backgroundColor": {
                              "type": "string",
                              "description": "The colour of the node's body. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "backgroundBlacken": {
                              "type": "number",
                              "description": "Blackens the node's body for values from 0 to 1; whitens the node's body for values from 0 to -1.",
                              "maximum": 1,
                              "minimum": -1
                            },
                            "backgroundOpacity": {
                              "type": "number",
                              "description": "The opacity level of the node's background colour",
                              "maximum": 1,
                              "minimum": 0
                            },
                            "backgroundPositionX": {
                              "type": "string",
                              "description": "The x position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                              "maxLength": 50
                            },
                            "backgroundPositionY": {
                              "type": "string",
                              "description": "The y position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                              "maxLength": 50
                            },
                            "backgroundOffsetX": {
                              "type": "string",
                              "description": "The x offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                              "maxLength": 50
                            },
                            "backgroundOffsetY": {
                              "type": "string",
                              "description": "The y offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                              "maxLength": 50
                            },
                            "backgroundFit": {
                              "type": "string",
                              "description": "How the background image is fit to the node. Can be 'none', 'contain', or 'cover'.",
                              "enum": [
                                "none",
                                "contain",
                                "cover"
                              ]
                            },
                            "backgroundClip": {
                              "type": "string",
                              "description": "How the background image is clipped to the node. Can be 'none', 'node', or 'node-border'.",
                              "enum": [
                                "none",
                                "node",
                                "node-border"
                              ]
                            },
                            "backgroundWidthRelativeTo": {
                              "type": "string",
                              "description": "How the background image's width is determined. Can be 'none', 'inner', or 'outer'.",
                              "enum": [
                                "none",
                                "inner",
                                "outer"
                              ]
                            },
                            "backgroundHeightRelativeTo": {
                              "type": "string",
                              "description": "How the background image's height is determined. Can be 'none', 'inner', or 'outer'.",
                              "enum": [
                                "none",
                                "inner",
                                "outer"
                              ]
                            },
                            "borderWidth": {
                              "type": "number",
                              "description": "The size of the node's border.",
                              "minimum": 0
                            },
                            "borderStyle": {
                              "type": "string",
                              "description": "The style of the node's border",
                              "enum": [
                                "solid",
                                "dotted",
                                "dashed",
                                "double"
                              ]
                            },
                            "borderColor": {
                              "type": "string",
                              "description": "The colour of the node's border. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "borderOpacity": {
                              "type": "number",
                              "description": "The opacity of the node's border",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "padding": {
                              "type": "number",
                              "description": "The amount of padding around all sides of the node.",
                              "minimum": 0
                            },
                            "textHalign": {
                              "type": "string",
                              "description": "The horizontal alignment of a node's label",
                              "enum": [
                                "left",
                                "center",
                                "right"
                              ]
                            },
                            "textValign": {
                              "type": "string",
                              "description": "The vertical alignment of a node's label",
                              "enum": [
                                "top",
                                "center",
                                "bottom"
                              ]
                            },
                            "ghost": {
                              "type": "string",
                              "description": "Whether to use the ghost effect, a semitransparent duplicate of the element drawn at an offset.",
                              "default": "no",
                              "enum": [
                                "yes",
                                "no"
                              ]
                            },
                            "activeBgColor": {
                              "type": "string",
                              "description": "The colour of the indicator shown when the background is grabbed by the user. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "activeBgOpacity": {
                              "type": "string",
                              "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                              "maxLength": 50
                            },
                            "activeBgSize": {
                              "type": "string",
                              "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                              "maxLength": 50
                            },
                            "selectionBoxColor": {
                              "type": "string",
                              "description": "The background colour of the selection box used for drag selection. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "selectionBoxBorderWidth": {
                              "type": "number",
                              "description": "The size of the border on the selection box. Selector needs to be *core*",
                              "minimum": 0
                            },
                            "selectionBoxOpacity": {
                              "type": "number",
                              "description": "The opacity of the selection box. Selector needs to be *core*",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "outsideTextureBgColor": {
                              "type": "string",
                              "description": "The colour of the area outside the viewport texture when initOptions.textureOnViewport === true. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "outsideTextureBgOpacity": {
                              "type": "number",
                              "description": "The opacity of the area outside the viewport texture. Selector needs to be *core*",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "shapePolygonPoints": {
                              "type": "string",
                              "description": "An array (or a space-separated string) of numbers ranging on [-1, 1], representing alternating x and y values (i.e. x1 y1 x2 y2, x3 y3 ...). This represents the points in the polygon for the node's shape. The bounding box of the node is given by (-1, -1), (1, -1), (1, 1), (-1, 1). The node's position is the origin (0, 0 )",
                              "maxLength": 2000
                            },
                            "menuBackgroundColor": {
                              "type": "string",
                              "description": "The colour of the background of the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "menuBackgroundOpacity": {
                              "type": "number",
                              "description": "The opacity of the background of the component menu.",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "menuForgroundColor": {
                              "type": "string",
                              "description": "The colour of the text or icons in the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            }
                          }
                        }
                      ]
                    },
                    "status": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      },
                      "x-order": 10,
                      "description": "Connection Status",
                      "type": "string",
                      "enum": [
                        "discovered",
                        "registered",
                        "connected",
                        "ignored",
                        "maintenance",
                        "disconnected",
                        "deleted",
                        "not found"
                      ]
                    },
                    "transitionMap": {
                      "type": "object",
                      "description": "Map describing the connection state machine. Each key is a current connection status and its value is the list of states the connection may transition to from that status, along with a description of each transition.",
                      "additionalProperties": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "additionalProperties": false,
                          "description": "A single permissible state transition for a connection, describing the next reachable state and the meaning of that transition.",
                          "required": [
                            "nextState"
                          ],
                          "properties": {
                            "nextState": {
                              "type": "string",
                              "description": "Connection Status Value",
                              "x-go-name": "ConnectionStatusValue",
                              "enum": [
                                "discovered",
                                "registered",
                                "connected",
                                "ignored",
                                "maintenance",
                                "disconnected",
                                "deleted",
                                "not found"
                              ],
                              "x-order": 1
                            },
                            "description": {
                              "type": "string",
                              "description": "Human-readable explanation of when or why this transition occurs.",
                              "maxLength": 1000,
                              "x-oapi-codegen-extra-tags": {
                                "json": "description,omitempty"
                              },
                              "x-order": 2
                            }
                          }
                        }
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "gorm": "type:bytes;serializer:json",
                        "db": "-",
                        "json": "transitionMap,omitempty"
                      },
                      "x-order": 18
                    },
                    "owner": {
                      "x-go-name": "Owner",
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner",
                        "json": "owner"
                      },
                      "x-order": 11,
                      "description": "User ID who owns this connection",
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "createdAt": {
                      "description": "Timestamp when the connection was created.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "createdAt"
                      },
                      "x-order": 12,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp when the connection was last updated.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updatedAt"
                      },
                      "x-order": 13,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "description": "Timestamp when the connection was soft-deleted, if applicable.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deletedAt"
                      },
                      "x-order": 14,
                      "x-go-type": "meshcore.NullTime",
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "type": "string",
                      "format": "date-time",
                      "nullable": true,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "environments": {
                      "type": "array",
                      "description": "Associated environments for this connection",
                      "items": {
                        "x-go-type": "*environmentv1beta3.Environment",
                        "x-go-type-import": {
                          "path": "github.com/meshery/schemas/models/v1beta3/environment",
                          "name": "environmentv1beta3"
                        },
                        "$id": "https://schemas.meshery.io/environment.yaml",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "title": "Environment",
                        "description": "Environments allow you to logically group related Connections and their associated Credentials. Learn more at https://docs.meshery.io/concepts/logical/environments",
                        "additionalProperties": false,
                        "type": "object",
                        "example": {
                          "id": "00000000-0000-0000-0000-000000000000",
                          "schemaVersion": "environments.meshery.io/v1beta3",
                          "name": "Production Environment",
                          "description": "Connections and credentials for the production cluster.",
                          "organizationId": "00000000-0000-0000-0000-000000000000",
                          "owner": "00000000-0000-0000-0000-000000000000",
                          "createdAt": "0001-01-01T00:00:00Z",
                          "metadata": {},
                          "updatedAt": "0001-01-01T00:00:00Z",
                          "deletedAt": null
                        },
                        "required": [
                          "id",
                          "schemaVersion",
                          "name",
                          "description",
                          "organizationId"
                        ],
                        "properties": {
                          "id": {
                            "description": "ID",
                            "x-order": 1,
                            "x-go-name": "ID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "id",
                              "json": "id"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "schemaVersion": {
                            "description": "Specifies the version of the schema to which the environment conforms.",
                            "x-order": 2,
                            "x-oapi-codegen-extra-tags": {
                              "json": "schemaVersion",
                              "db": "-",
                              "gorm": "-"
                            },
                            "default": "environments.meshery.io/v1beta3",
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
                          "name": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "name",
                              "json": "name"
                            },
                            "x-order": 3,
                            "type": "string",
                            "maxLength": 100,
                            "description": "Environment name"
                          },
                          "description": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "description",
                              "json": "description"
                            },
                            "x-order": 4,
                            "type": "string",
                            "maxLength": 1000,
                            "description": "Environment description"
                          },
                          "organizationId": {
                            "x-go-name": "OrganizationID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "organization_id",
                              "json": "organizationId"
                            },
                            "x-order": 5,
                            "description": "Environment organization ID",
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "owner": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "owner",
                              "json": "owner"
                            },
                            "x-order": 6,
                            "description": "Environment owner",
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "createdAt": {
                            "description": "Timestamp when the environment was created.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "yaml": "created_at",
                              "json": "createdAt"
                            },
                            "x-order": 7,
                            "x-go-type": "time.Time",
                            "type": "string",
                            "format": "date-time",
                            "x-go-name": "CreatedAt",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "metadata": {
                            "description": "Additional metadata associated with the environment.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "metadata",
                              "json": "metadata"
                            },
                            "x-order": 8,
                            "x-go-type": "core.Map",
                            "x-go-type-skip-optional-pointer": true,
                            "type": "object"
                          },
                          "updatedAt": {
                            "description": "Timestamp when the environment was last updated.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "yaml": "updated_at",
                              "json": "updatedAt"
                            },
                            "x-order": 9,
                            "x-go-type": "time.Time",
                            "type": "string",
                            "format": "date-time",
                            "x-go-name": "UpdatedAt",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deletedAt": {
                            "description": "Timestamp when the environment was soft deleted. Null while the environment remains active.",
                            "nullable": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "json": "deletedAt"
                            },
                            "x-go-type": "core.NullTime",
                            "x-go-import": "database/sql",
                            "x-order": 10,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          }
                        }
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "-",
                        "gorm": "-"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 15
                    },
                    "schemaVersion": {
                      "description": "Specifies the version of the schema used for the definition.",
                      "x-order": 16,
                      "x-oapi-codegen-extra-tags": {
                        "db": "-",
                        "gorm": "-"
                      },
                      "default": "connections.meshery.io/v1beta3",
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
          "cloud",
          "meshery"
        ],
        "tags": [
          "Connections"
        ],
        "operationId": "updateConnection",
        "summary": "Update a connection",
        "description": "Update an existing connection",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "description": "Connection ID",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for creating or updating a connection",
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "description": "Connection ID",
                    "x-go-name": "ConnectionID",
                    "x-oapi-codegen-extra-tags": {
                      "json": "id,omitempty"
                    }
                  },
                  "name": {
                    "type": "string",
                    "description": "Connection name",
                    "x-oapi-codegen-extra-tags": {
                      "json": "name"
                    },
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "kind": {
                    "type": "string",
                    "description": "Connection kind",
                    "x-oapi-codegen-extra-tags": {
                      "json": "kind"
                    },
                    "maxLength": 255
                  },
                  "type": {
                    "type": "string",
                    "description": "Connection type",
                    "x-oapi-codegen-extra-tags": {
                      "json": "type"
                    },
                    "maxLength": 255
                  },
                  "subType": {
                    "type": "string",
                    "description": "Connection sub-type",
                    "x-oapi-codegen-extra-tags": {
                      "json": "subType"
                    },
                    "maxLength": 255
                  },
                  "credentialSecret": {
                    "type": "object",
                    "description": "Credential secret data",
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "credentialSecret"
                    }
                  },
                  "metadata": {
                    "type": "object",
                    "description": "Connection metadata",
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "metadata"
                    }
                  },
                  "styles": {
                    "x-go-type": "core.ComponentStyles",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    },
                    "x-oapi-codegen-extra-tags": {
                      "json": "styles,omitempty"
                    },
                    "description": "Visualization styles for the connection, including svgColor and svgWhite used for UI representation.",
                    "type": "object",
                    "required": [
                      "shape",
                      "primaryColor",
                      "svgColor",
                      "svgWhite",
                      "svgComplete"
                    ],
                    "allOf": [
                      {
                        "type": "object",
                        "description": "Common styles for all entities",
                        "additionalProperties": true,
                        "required": [
                          "primaryColor",
                          "svgColor",
                          "svgWhite",
                          "svgComplete"
                        ],
                        "properties": {
                          "primaryColor": {
                            "type": "string",
                            "description": "Primary color of the component used for UI representation.",
                            "maxLength": 500
                          },
                          "secondaryColor": {
                            "type": "string",
                            "description": "Secondary color of the entity used for UI representation.",
                            "maxLength": 500
                          },
                          "svgWhite": {
                            "type": "string",
                            "description": "White SVG of the entity used for UI representation on dark background.",
                            "maxLength": 500
                          },
                          "svgColor": {
                            "type": "string",
                            "description": "Colored SVG of the entity used for UI representation on light background.",
                            "maxLength": 500
                          },
                          "svgComplete": {
                            "type": "string",
                            "description": "Complete SVG of the entity used for UI representation, often inclusive of background.",
                            "maxLength": 500
                          },
                          "color": {
                            "type": "string",
                            "description": "The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 500
                          },
                          "textOpacity": {
                            "type": "number",
                            "description": "The opacity of the label text, including its outline.",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "fontFamily": {
                            "type": "string",
                            "description": "A comma-separated list of font names to use on the label text.",
                            "maxLength": 500
                          },
                          "fontSize": {
                            "type": "string",
                            "description": "The size of the label text.",
                            "maxLength": 500
                          },
                          "fontStyle": {
                            "type": "string",
                            "description": "A CSS font style to be applied to the label text.",
                            "maxLength": 500
                          },
                          "fontWeight": {
                            "type": "string",
                            "description": "A CSS font weight to be applied to the label text.",
                            "maxLength": 500
                          },
                          "textTransform": {
                            "type": "string",
                            "description": "A transformation to apply to the label text",
                            "enum": [
                              "none",
                              "uppercase",
                              "lowercase"
                            ]
                          },
                          "opacity": {
                            "type": "number",
                            "description": "The opacity of the element, ranging from 0 to 1. Note that the opacity of a compound node parent affects the effective opacity of its children.",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "zIndex": {
                            "type": "integer",
                            "description": "An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index.",
                            "minimum": 0
                          },
                          "label": {
                            "type": "string",
                            "description": "The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id",
                            "maxLength": 500
                          },
                          "animation": {
                            "type": "object",
                            "description": "The animation to apply to the element. example ripple,bounce,etc"
                          }
                        }
                      },
                      {
                        "type": "object",
                        "properties": {
                          "shape": {
                            "type": "string",
                            "description": "The shape of the node's body. Note that each shape fits within the specified width and height, and so you may have to adjust width and height if you desire an equilateral shape (i.e. width !== height for several equilateral shapes)",
                            "enum": [
                              "ellipse",
                              "triangle",
                              "round-triangle",
                              "rectangle",
                              "round-rectangle",
                              "bottom-round-rectangle",
                              "cut-rectangle",
                              "barrel",
                              "rhomboid",
                              "diamond",
                              "round-diamond",
                              "pentagon",
                              "round-pentagon",
                              "hexagon",
                              "round-hexagon",
                              "concave-hexagon",
                              "heptagon",
                              "round-heptagon",
                              "octagon",
                              "round-octagon",
                              "star",
                              "tag",
                              "round-tag",
                              "vee",
                              "polygon"
                            ]
                          },
                          "position": {
                            "type": "object",
                            "additionalProperties": false,
                            "required": [
                              "x",
                              "y"
                            ],
                            "description": "The position of the node. If the position is set, the node is drawn at that position in the given dimensions. If the position is not set, the node is drawn at a random position.",
                            "properties": {
                              "x": {
                                "type": "number",
                                "description": "The x-coordinate of the node.",
                                "minimum": -1000000,
                                "maximum": 1000000,
                                "x-go-type": "float64"
                              },
                              "y": {
                                "type": "number",
                                "description": "The y-coordinate of the node.",
                                "minimum": -1000000,
                                "maximum": 1000000,
                                "x-go-type": "float64"
                              }
                            }
                          },
                          "bodyText": {
                            "type": "string",
                            "description": "The text to display for an element's body. Can give a path, e.g. data(id) will label with the elements id",
                            "maxLength": 500
                          },
                          "bodyTextWrap": {
                            "type": "string",
                            "description": "How to wrap the text in the node. Can be 'none', 'wrap', or 'ellipsis'.",
                            "enum": [
                              "none",
                              "wrap",
                              "ellipsis"
                            ]
                          },
                          "bodyTextMaxWidth": {
                            "type": "string",
                            "description": "The maximum width for wrapping text in the node.",
                            "maxLength": 50
                          },
                          "bodyTextOpacity": {
                            "type": "number",
                            "description": "The opacity of the node's body text, including its outline.",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "bodyTextBackgroundColor": {
                            "type": "string",
                            "description": "The colour of the node's body text background. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "bodyTextFontSize": {
                            "type": "number",
                            "description": "The size of the node's body text.",
                            "minimum": 0
                          },
                          "bodyTextColor": {
                            "type": "string",
                            "description": "The colour of the node's body text. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "bodyTextFontWeight": {
                            "type": "string",
                            "description": "A CSS font weight to be applied to the node's body text.",
                            "maxLength": 50
                          },
                          "bodyTextHorizontalAlign": {
                            "type": "string",
                            "description": "A CSS horizontal alignment to be applied to the node's body text.",
                            "maxLength": 50
                          },
                          "bodyTextDecoration": {
                            "type": "string",
                            "description": "A CSS text decoration to be applied to the node's body text.",
                            "maxLength": 100
                          },
                          "bodyTextVerticalAlign": {
                            "type": "string",
                            "description": "A CSS vertical alignment to be applied to the node's body text.",
                            "maxLength": 50
                          },
                          "width": {
                            "type": "number",
                            "description": "The width of the node's body or the width of an edge's line.",
                            "minimum": 0
                          },
                          "height": {
                            "type": "number",
                            "description": "The height of the node's body",
                            "minimum": 0
                          },
                          "backgroundImage": {
                            "type": "string",
                            "format": "uri",
                            "description": "The URL that points to the image to show in the node.",
                            "maxLength": 2048
                          },
                          "backgroundColor": {
                            "type": "string",
                            "description": "The colour of the node's body. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "backgroundBlacken": {
                            "type": "number",
                            "description": "Blackens the node's body for values from 0 to 1; whitens the node's body for values from 0 to -1.",
                            "maximum": 1,
                            "minimum": -1
                          },
                          "backgroundOpacity": {
                            "type": "number",
                            "description": "The opacity level of the node's background colour",
                            "maximum": 1,
                            "minimum": 0
                          },
                          "backgroundPositionX": {
                            "type": "string",
                            "description": "The x position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                            "maxLength": 50
                          },
                          "backgroundPositionY": {
                            "type": "string",
                            "description": "The y position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                            "maxLength": 50
                          },
                          "backgroundOffsetX": {
                            "type": "string",
                            "description": "The x offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                            "maxLength": 50
                          },
                          "backgroundOffsetY": {
                            "type": "string",
                            "description": "The y offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                            "maxLength": 50
                          },
                          "backgroundFit": {
                            "type": "string",
                            "description": "How the background image is fit to the node. Can be 'none', 'contain', or 'cover'.",
                            "enum": [
                              "none",
                              "contain",
                              "cover"
                            ]
                          },
                          "backgroundClip": {
                            "type": "string",
                            "description": "How the background image is clipped to the node. Can be 'none', 'node', or 'node-border'.",
                            "enum": [
                              "none",
                              "node",
                              "node-border"
                            ]
                          },
                          "backgroundWidthRelativeTo": {
                            "type": "string",
                            "description": "How the background image's width is determined. Can be 'none', 'inner', or 'outer'.",
                            "enum": [
                              "none",
                              "inner",
                              "outer"
                            ]
                          },
                          "backgroundHeightRelativeTo": {
                            "type": "string",
                            "description": "How the background image's height is determined. Can be 'none', 'inner', or 'outer'.",
                            "enum": [
                              "none",
                              "inner",
                              "outer"
                            ]
                          },
                          "borderWidth": {
                            "type": "number",
                            "description": "The size of the node's border.",
                            "minimum": 0
                          },
                          "borderStyle": {
                            "type": "string",
                            "description": "The style of the node's border",
                            "enum": [
                              "solid",
                              "dotted",
                              "dashed",
                              "double"
                            ]
                          },
                          "borderColor": {
                            "type": "string",
                            "description": "The colour of the node's border. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "borderOpacity": {
                            "type": "number",
                            "description": "The opacity of the node's border",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "padding": {
                            "type": "number",
                            "description": "The amount of padding around all sides of the node.",
                            "minimum": 0
                          },
                          "textHalign": {
                            "type": "string",
                            "description": "The horizontal alignment of a node's label",
                            "enum": [
                              "left",
                              "center",
                              "right"
                            ]
                          },
                          "textValign": {
                            "type": "string",
                            "description": "The vertical alignment of a node's label",
                            "enum": [
                              "top",
                              "center",
                              "bottom"
                            ]
                          },
                          "ghost": {
                            "type": "string",
                            "description": "Whether to use the ghost effect, a semitransparent duplicate of the element drawn at an offset.",
                            "default": "no",
                            "enum": [
                              "yes",
                              "no"
                            ]
                          },
                          "activeBgColor": {
                            "type": "string",
                            "description": "The colour of the indicator shown when the background is grabbed by the user. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "activeBgOpacity": {
                            "type": "string",
                            "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                            "maxLength": 50
                          },
                          "activeBgSize": {
                            "type": "string",
                            "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                            "maxLength": 50
                          },
                          "selectionBoxColor": {
                            "type": "string",
                            "description": "The background colour of the selection box used for drag selection. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "selectionBoxBorderWidth": {
                            "type": "number",
                            "description": "The size of the border on the selection box. Selector needs to be *core*",
                            "minimum": 0
                          },
                          "selectionBoxOpacity": {
                            "type": "number",
                            "description": "The opacity of the selection box. Selector needs to be *core*",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "outsideTextureBgColor": {
                            "type": "string",
                            "description": "The colour of the area outside the viewport texture when initOptions.textureOnViewport === true. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "outsideTextureBgOpacity": {
                            "type": "number",
                            "description": "The opacity of the area outside the viewport texture. Selector needs to be *core*",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "shapePolygonPoints": {
                            "type": "string",
                            "description": "An array (or a space-separated string) of numbers ranging on [-1, 1], representing alternating x and y values (i.e. x1 y1 x2 y2, x3 y3 ...). This represents the points in the polygon for the node's shape. The bounding box of the node is given by (-1, -1), (1, -1), (1, 1), (-1, 1). The node's position is the origin (0, 0 )",
                            "maxLength": 2000
                          },
                          "menuBackgroundColor": {
                            "type": "string",
                            "description": "The colour of the background of the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "menuBackgroundOpacity": {
                            "type": "number",
                            "description": "The opacity of the background of the component menu.",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "menuForgroundColor": {
                            "type": "string",
                            "description": "The colour of the text or icons in the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          }
                        }
                      }
                    ]
                  },
                  "status": {
                    "type": "string",
                    "description": "Connection status",
                    "x-oapi-codegen-extra-tags": {
                      "json": "status"
                    },
                    "maxLength": 255
                  },
                  "credentialId": {
                    "type": "string",
                    "format": "uuid",
                    "description": "Associated credential ID",
                    "x-go-name": "CredentialID",
                    "x-oapi-codegen-extra-tags": {
                      "json": "credentialId,omitempty"
                    }
                  }
                },
                "required": [
                  "name",
                  "kind",
                  "type",
                  "subType",
                  "status"
                ]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Connection updated",
            "content": {
              "application/json": {
                "schema": {
                  "$id": "https://schemas.meshery.io/connection.yaml",
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "description": "Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections",
                  "additionalProperties": false,
                  "type": "object",
                  "required": [
                    "id",
                    "schemaVersion",
                    "name",
                    "type",
                    "subType",
                    "kind",
                    "status"
                  ],
                  "properties": {
                    "id": {
                      "description": "Connection ID",
                      "x-order": 1,
                      "x-go-name": "ID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "name": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      },
                      "x-order": 2,
                      "type": "string",
                      "description": "Connection Name",
                      "minLength": 1,
                      "maxLength": 255
                    },
                    "description": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "description",
                        "json": "description"
                      },
                      "x-order": 3,
                      "type": "string",
                      "description": "Human-readable description of the connection and its purpose.",
                      "maxLength": 1000
                    },
                    "url": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "url",
                        "json": "url"
                      },
                      "x-order": 4,
                      "type": "string",
                      "format": "uri",
                      "description": "URL of the remote resource this connection points to (e.g. the Helm repository URL, the Kubernetes API server endpoint, the Grafana instance URL).",
                      "maxLength": 2048
                    },
                    "credentialId": {
                      "x-go-name": "CredentialID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "credential_id",
                        "json": "credentialId"
                      },
                      "x-order": 5,
                      "description": "Associated Credential ID",
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "type": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "type",
                        "json": "type",
                        "yaml": "type"
                      },
                      "x-go-name": "ConnectionType",
                      "x-order": 6,
                      "type": "string",
                      "description": "Connection Type (platform, telemetry, collaboration)",
                      "maxLength": 255
                    },
                    "subType": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "sub_type",
                        "json": "subType"
                      },
                      "x-order": 7,
                      "type": "string",
                      "description": "Connection Subtype (cloud, identity, metrics, chat, git, orchestration)",
                      "maxLength": 255
                    },
                    "kind": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "kind"
                      },
                      "x-order": 8,
                      "type": "string",
                      "description": "Connection Kind (meshery, kubernetes, prometheus, grafana, gke, aws, azure, slack, github)",
                      "maxLength": 255
                    },
                    "modelReference": {
                      "x-go-type": "modelv1beta1.ModelReference",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta1/model",
                        "name": "modelv1beta1"
                      },
                      "x-order": 8,
                      "description": "Reference to the specific registered model to which the component belongs and from which model version, category, and other properties may be referenced. Learn more at https://docs.meshery.io/concepts/models",
                      "x-oapi-codegen-extra-tags": {
                        "gorm": "model_reference",
                        "db": "model_reference",
                        "json": "modelReference",
                        "yaml": "modelReference"
                      },
                      "x-generate-db-helpers": true,
                      "type": "object",
                      "required": [
                        "id",
                        "name",
                        "version",
                        "displayName",
                        "model",
                        "registrant"
                      ],
                      "properties": {
                        "id": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          }
                        },
                        "name": {
                          "type": "string",
                          "description": "The unique name for the model within the scope of a registrant.",
                          "pattern": "^[a-z0-9-]+$",
                          "examples": [
                            "cert-manager"
                          ]
                        },
                        "version": {
                          "description": "Version of the model definition.",
                          "type": "string",
                          "minLength": 5,
                          "maxLength": 100,
                          "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                        },
                        "displayName": {
                          "type": "string",
                          "description": "Human-readable name for the model.",
                          "minLength": 1,
                          "maxLength": 100,
                          "pattern": "^[a-zA-Z0-9 ]+$",
                          "examples": [
                            "Cert Manager"
                          ]
                        },
                        "model": {
                          "type": "object",
                          "description": "Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31).",
                          "required": [
                            "version"
                          ],
                          "properties": {
                            "version": {
                              "description": "Version of the model as defined by the registrant.",
                              "x-oapi-codegen-extra-tags": {
                                "json": "version"
                              },
                              "x-order": 1,
                              "type": "string",
                              "minLength": 5,
                              "maxLength": 100,
                              "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                            }
                          }
                        },
                        "registrant": {
                          "x-go-type": "RegistrantReference",
                          "x-oapi-codegen-extra-tags": {
                            "json": "registrant"
                          },
                          "type": "object",
                          "required": [
                            "kind"
                          ],
                          "properties": {
                            "kind": {
                              "type": "string",
                              "description": "Kind of the registrant.",
                              "maxLength": 255
                            }
                          }
                        }
                      }
                    },
                    "metadata": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata"
                      },
                      "x-order": 9,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "type": "object",
                      "description": "Additional connection metadata"
                    },
                    "credentialSchema": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "credential_schema"
                      },
                      "x-order": 9,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "type": "object",
                      "description": "Schema for the credential Associated with the connection"
                    },
                    "connectionSchema": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "connection_schema"
                      },
                      "x-order": 9,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "type": "object",
                      "description": "Schema for the connection"
                    },
                    "styles": {
                      "x-oapi-codegen-extra-tags": {
                        "gorm": "type:bytes;serializer:json",
                        "db": "-",
                        "yaml": "styles",
                        "json": "styles"
                      },
                      "x-go-type": "core.ComponentStyles",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-order": 17,
                      "description": "Visualization styles for the connection, including svgColor and svgWhite used for UI representation.",
                      "type": "object",
                      "required": [
                        "shape",
                        "primaryColor",
                        "svgColor",
                        "svgWhite",
                        "svgComplete"
                      ],
                      "allOf": [
                        {
                          "type": "object",
                          "description": "Common styles for all entities",
                          "additionalProperties": true,
                          "required": [
                            "primaryColor",
                            "svgColor",
                            "svgWhite",
                            "svgComplete"
                          ],
                          "properties": {
                            "primaryColor": {
                              "type": "string",
                              "description": "Primary color of the component used for UI representation.",
                              "maxLength": 500
                            },
                            "secondaryColor": {
                              "type": "string",
                              "description": "Secondary color of the entity used for UI representation.",
                              "maxLength": 500
                            },
                            "svgWhite": {
                              "type": "string",
                              "description": "White SVG of the entity used for UI representation on dark background.",
                              "maxLength": 500
                            },
                            "svgColor": {
                              "type": "string",
                              "description": "Colored SVG of the entity used for UI representation on light background.",
                              "maxLength": 500
                            },
                            "svgComplete": {
                              "type": "string",
                              "description": "Complete SVG of the entity used for UI representation, often inclusive of background.",
                              "maxLength": 500
                            },
                            "color": {
                              "type": "string",
                              "description": "The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 500
                            },
                            "textOpacity": {
                              "type": "number",
                              "description": "The opacity of the label text, including its outline.",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "fontFamily": {
                              "type": "string",
                              "description": "A comma-separated list of font names to use on the label text.",
                              "maxLength": 500
                            },
                            "fontSize": {
                              "type": "string",
                              "description": "The size of the label text.",
                              "maxLength": 500
                            },
                            "fontStyle": {
                              "type": "string",
                              "description": "A CSS font style to be applied to the label text.",
                              "maxLength": 500
                            },
                            "fontWeight": {
                              "type": "string",
                              "description": "A CSS font weight to be applied to the label text.",
                              "maxLength": 500
                            },
                            "textTransform": {
                              "type": "string",
                              "description": "A transformation to apply to the label text",
                              "enum": [
                                "none",
                                "uppercase",
                                "lowercase"
                              ]
                            },
                            "opacity": {
                              "type": "number",
                              "description": "The opacity of the element, ranging from 0 to 1. Note that the opacity of a compound node parent affects the effective opacity of its children.",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "zIndex": {
                              "type": "integer",
                              "description": "An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index.",
                              "minimum": 0
                            },
                            "label": {
                              "type": "string",
                              "description": "The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id",
                              "maxLength": 500
                            },
                            "animation": {
                              "type": "object",
                              "description": "The animation to apply to the element. example ripple,bounce,etc"
                            }
                          }
                        },
                        {
                          "type": "object",
                          "properties": {
                            "shape": {
                              "type": "string",
                              "description": "The shape of the node's body. Note that each shape fits within the specified width and height, and so you may have to adjust width and height if you desire an equilateral shape (i.e. width !== height for several equilateral shapes)",
                              "enum": [
                                "ellipse",
                                "triangle",
                                "round-triangle",
                                "rectangle",
                                "round-rectangle",
                                "bottom-round-rectangle",
                                "cut-rectangle",
                                "barrel",
                                "rhomboid",
                                "diamond",
                                "round-diamond",
                                "pentagon",
                                "round-pentagon",
                                "hexagon",
                                "round-hexagon",
                                "concave-hexagon",
                                "heptagon",
                                "round-heptagon",
                                "octagon",
                                "round-octagon",
                                "star",
                                "tag",
                                "round-tag",
                                "vee",
                                "polygon"
                              ]
                            },
                            "position": {
                              "type": "object",
                              "additionalProperties": false,
                              "required": [
                                "x",
                                "y"
                              ],
                              "description": "The position of the node. If the position is set, the node is drawn at that position in the given dimensions. If the position is not set, the node is drawn at a random position.",
                              "properties": {
                                "x": {
                                  "type": "number",
                                  "description": "The x-coordinate of the node.",
                                  "minimum": -1000000,
                                  "maximum": 1000000,
                                  "x-go-type": "float64"
                                },
                                "y": {
                                  "type": "number",
                                  "description": "The y-coordinate of the node.",
                                  "minimum": -1000000,
                                  "maximum": 1000000,
                                  "x-go-type": "float64"
                                }
                              }
                            },
                            "bodyText": {
                              "type": "string",
                              "description": "The text to display for an element's body. Can give a path, e.g. data(id) will label with the elements id",
                              "maxLength": 500
                            },
                            "bodyTextWrap": {
                              "type": "string",
                              "description": "How to wrap the text in the node. Can be 'none', 'wrap', or 'ellipsis'.",
                              "enum": [
                                "none",
                                "wrap",
                                "ellipsis"
                              ]
                            },
                            "bodyTextMaxWidth": {
                              "type": "string",
                              "description": "The maximum width for wrapping text in the node.",
                              "maxLength": 50
                            },
                            "bodyTextOpacity": {
                              "type": "number",
                              "description": "The opacity of the node's body text, including its outline.",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "bodyTextBackgroundColor": {
                              "type": "string",
                              "description": "The colour of the node's body text background. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "bodyTextFontSize": {
                              "type": "number",
                              "description": "The size of the node's body text.",
                              "minimum": 0
                            },
                            "bodyTextColor": {
                              "type": "string",
                              "description": "The colour of the node's body text. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "bodyTextFontWeight": {
                              "type": "string",
                              "description": "A CSS font weight to be applied to the node's body text.",
                              "maxLength": 50
                            },
                            "bodyTextHorizontalAlign": {
                              "type": "string",
                              "description": "A CSS horizontal alignment to be applied to the node's body text.",
                              "maxLength": 50
                            },
                            "bodyTextDecoration": {
                              "type": "string",
                              "description": "A CSS text decoration to be applied to the node's body text.",
                              "maxLength": 100
                            },
                            "bodyTextVerticalAlign": {
                              "type": "string",
                              "description": "A CSS vertical alignment to be applied to the node's body text.",
                              "maxLength": 50
                            },
                            "width": {
                              "type": "number",
                              "description": "The width of the node's body or the width of an edge's line.",
                              "minimum": 0
                            },
                            "height": {
                              "type": "number",
                              "description": "The height of the node's body",
                              "minimum": 0
                            },
                            "backgroundImage": {
                              "type": "string",
                              "format": "uri",
                              "description": "The URL that points to the image to show in the node.",
                              "maxLength": 2048
                            },
                            "backgroundColor": {
                              "type": "string",
                              "description": "The colour of the node's body. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "backgroundBlacken": {
                              "type": "number",
                              "description": "Blackens the node's body for values from 0 to 1; whitens the node's body for values from 0 to -1.",
                              "maximum": 1,
                              "minimum": -1
                            },
                            "backgroundOpacity": {
                              "type": "number",
                              "description": "The opacity level of the node's background colour",
                              "maximum": 1,
                              "minimum": 0
                            },
                            "backgroundPositionX": {
                              "type": "string",
                              "description": "The x position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                              "maxLength": 50
                            },
                            "backgroundPositionY": {
                              "type": "string",
                              "description": "The y position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                              "maxLength": 50
                            },
                            "backgroundOffsetX": {
                              "type": "string",
                              "description": "The x offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                              "maxLength": 50
                            },
                            "backgroundOffsetY": {
                              "type": "string",
                              "description": "The y offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                              "maxLength": 50
                            },
                            "backgroundFit": {
                              "type": "string",
                              "description": "How the background image is fit to the node. Can be 'none', 'contain', or 'cover'.",
                              "enum": [
                                "none",
                                "contain",
                                "cover"
                              ]
                            },
                            "backgroundClip": {
                              "type": "string",
                              "description": "How the background image is clipped to the node. Can be 'none', 'node', or 'node-border'.",
                              "enum": [
                                "none",
                                "node",
                                "node-border"
                              ]
                            },
                            "backgroundWidthRelativeTo": {
                              "type": "string",
                              "description": "How the background image's width is determined. Can be 'none', 'inner', or 'outer'.",
                              "enum": [
                                "none",
                                "inner",
                                "outer"
                              ]
                            },
                            "backgroundHeightRelativeTo": {
                              "type": "string",
                              "description": "How the background image's height is determined. Can be 'none', 'inner', or 'outer'.",
                              "enum": [
                                "none",
                                "inner",
                                "outer"
                              ]
                            },
                            "borderWidth": {
                              "type": "number",
                              "description": "The size of the node's border.",
                              "minimum": 0
                            },
                            "borderStyle": {
                              "type": "string",
                              "description": "The style of the node's border",
                              "enum": [
                                "solid",
                                "dotted",
                                "dashed",
                                "double"
                              ]
                            },
                            "borderColor": {
                              "type": "string",
                              "description": "The colour of the node's border. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "borderOpacity": {
                              "type": "number",
                              "description": "The opacity of the node's border",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "padding": {
                              "type": "number",
                              "description": "The amount of padding around all sides of the node.",
                              "minimum": 0
                            },
                            "textHalign": {
                              "type": "string",
                              "description": "The horizontal alignment of a node's label",
                              "enum": [
                                "left",
                                "center",
                                "right"
                              ]
                            },
                            "textValign": {
                              "type": "string",
                              "description": "The vertical alignment of a node's label",
                              "enum": [
                                "top",
                                "center",
                                "bottom"
                              ]
                            },
                            "ghost": {
                              "type": "string",
                              "description": "Whether to use the ghost effect, a semitransparent duplicate of the element drawn at an offset.",
                              "default": "no",
                              "enum": [
                                "yes",
                                "no"
                              ]
                            },
                            "activeBgColor": {
                              "type": "string",
                              "description": "The colour of the indicator shown when the background is grabbed by the user. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "activeBgOpacity": {
                              "type": "string",
                              "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                              "maxLength": 50
                            },
                            "activeBgSize": {
                              "type": "string",
                              "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                              "maxLength": 50
                            },
                            "selectionBoxColor": {
                              "type": "string",
                              "description": "The background colour of the selection box used for drag selection. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "selectionBoxBorderWidth": {
                              "type": "number",
                              "description": "The size of the border on the selection box. Selector needs to be *core*",
                              "minimum": 0
                            },
                            "selectionBoxOpacity": {
                              "type": "number",
                              "description": "The opacity of the selection box. Selector needs to be *core*",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "outsideTextureBgColor": {
                              "type": "string",
                              "description": "The colour of the area outside the viewport texture when initOptions.textureOnViewport === true. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "outsideTextureBgOpacity": {
                              "type": "number",
                              "description": "The opacity of the area outside the viewport texture. Selector needs to be *core*",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "shapePolygonPoints": {
                              "type": "string",
                              "description": "An array (or a space-separated string) of numbers ranging on [-1, 1], representing alternating x and y values (i.e. x1 y1 x2 y2, x3 y3 ...). This represents the points in the polygon for the node's shape. The bounding box of the node is given by (-1, -1), (1, -1), (1, 1), (-1, 1). The node's position is the origin (0, 0 )",
                              "maxLength": 2000
                            },
                            "menuBackgroundColor": {
                              "type": "string",
                              "description": "The colour of the background of the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "menuBackgroundOpacity": {
                              "type": "number",
                              "description": "The opacity of the background of the component menu.",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "menuForgroundColor": {
                              "type": "string",
                              "description": "The colour of the text or icons in the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            }
                          }
                        }
                      ]
                    },
                    "status": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      },
                      "x-order": 10,
                      "description": "Connection Status",
                      "type": "string",
                      "enum": [
                        "discovered",
                        "registered",
                        "connected",
                        "ignored",
                        "maintenance",
                        "disconnected",
                        "deleted",
                        "not found"
                      ]
                    },
                    "transitionMap": {
                      "type": "object",
                      "description": "Map describing the connection state machine. Each key is a current connection status and its value is the list of states the connection may transition to from that status, along with a description of each transition.",
                      "additionalProperties": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "additionalProperties": false,
                          "description": "A single permissible state transition for a connection, describing the next reachable state and the meaning of that transition.",
                          "required": [
                            "nextState"
                          ],
                          "properties": {
                            "nextState": {
                              "type": "string",
                              "description": "Connection Status Value",
                              "x-go-name": "ConnectionStatusValue",
                              "enum": [
                                "discovered",
                                "registered",
                                "connected",
                                "ignored",
                                "maintenance",
                                "disconnected",
                                "deleted",
                                "not found"
                              ],
                              "x-order": 1
                            },
                            "description": {
                              "type": "string",
                              "description": "Human-readable explanation of when or why this transition occurs.",
                              "maxLength": 1000,
                              "x-oapi-codegen-extra-tags": {
                                "json": "description,omitempty"
                              },
                              "x-order": 2
                            }
                          }
                        }
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "gorm": "type:bytes;serializer:json",
                        "db": "-",
                        "json": "transitionMap,omitempty"
                      },
                      "x-order": 18
                    },
                    "owner": {
                      "x-go-name": "Owner",
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner",
                        "json": "owner"
                      },
                      "x-order": 11,
                      "description": "User ID who owns this connection",
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "createdAt": {
                      "description": "Timestamp when the connection was created.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "createdAt"
                      },
                      "x-order": 12,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp when the connection was last updated.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updatedAt"
                      },
                      "x-order": 13,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "description": "Timestamp when the connection was soft-deleted, if applicable.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deletedAt"
                      },
                      "x-order": 14,
                      "x-go-type": "meshcore.NullTime",
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "type": "string",
                      "format": "date-time",
                      "nullable": true,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "environments": {
                      "type": "array",
                      "description": "Associated environments for this connection",
                      "items": {
                        "x-go-type": "*environmentv1beta3.Environment",
                        "x-go-type-import": {
                          "path": "github.com/meshery/schemas/models/v1beta3/environment",
                          "name": "environmentv1beta3"
                        },
                        "$id": "https://schemas.meshery.io/environment.yaml",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "title": "Environment",
                        "description": "Environments allow you to logically group related Connections and their associated Credentials. Learn more at https://docs.meshery.io/concepts/logical/environments",
                        "additionalProperties": false,
                        "type": "object",
                        "example": {
                          "id": "00000000-0000-0000-0000-000000000000",
                          "schemaVersion": "environments.meshery.io/v1beta3",
                          "name": "Production Environment",
                          "description": "Connections and credentials for the production cluster.",
                          "organizationId": "00000000-0000-0000-0000-000000000000",
                          "owner": "00000000-0000-0000-0000-000000000000",
                          "createdAt": "0001-01-01T00:00:00Z",
                          "metadata": {},
                          "updatedAt": "0001-01-01T00:00:00Z",
                          "deletedAt": null
                        },
                        "required": [
                          "id",
                          "schemaVersion",
                          "name",
                          "description",
                          "organizationId"
                        ],
                        "properties": {
                          "id": {
                            "description": "ID",
                            "x-order": 1,
                            "x-go-name": "ID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "id",
                              "json": "id"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "schemaVersion": {
                            "description": "Specifies the version of the schema to which the environment conforms.",
                            "x-order": 2,
                            "x-oapi-codegen-extra-tags": {
                              "json": "schemaVersion",
                              "db": "-",
                              "gorm": "-"
                            },
                            "default": "environments.meshery.io/v1beta3",
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
                          "name": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "name",
                              "json": "name"
                            },
                            "x-order": 3,
                            "type": "string",
                            "maxLength": 100,
                            "description": "Environment name"
                          },
                          "description": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "description",
                              "json": "description"
                            },
                            "x-order": 4,
                            "type": "string",
                            "maxLength": 1000,
                            "description": "Environment description"
                          },
                          "organizationId": {
                            "x-go-name": "OrganizationID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "organization_id",
                              "json": "organizationId"
                            },
                            "x-order": 5,
                            "description": "Environment organization ID",
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "owner": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "owner",
                              "json": "owner"
                            },
                            "x-order": 6,
                            "description": "Environment owner",
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "createdAt": {
                            "description": "Timestamp when the environment was created.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "yaml": "created_at",
                              "json": "createdAt"
                            },
                            "x-order": 7,
                            "x-go-type": "time.Time",
                            "type": "string",
                            "format": "date-time",
                            "x-go-name": "CreatedAt",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "metadata": {
                            "description": "Additional metadata associated with the environment.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "metadata",
                              "json": "metadata"
                            },
                            "x-order": 8,
                            "x-go-type": "core.Map",
                            "x-go-type-skip-optional-pointer": true,
                            "type": "object"
                          },
                          "updatedAt": {
                            "description": "Timestamp when the environment was last updated.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "yaml": "updated_at",
                              "json": "updatedAt"
                            },
                            "x-order": 9,
                            "x-go-type": "time.Time",
                            "type": "string",
                            "format": "date-time",
                            "x-go-name": "UpdatedAt",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deletedAt": {
                            "description": "Timestamp when the environment was soft deleted. Null while the environment remains active.",
                            "nullable": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "json": "deletedAt"
                            },
                            "x-go-type": "core.NullTime",
                            "x-go-import": "database/sql",
                            "x-order": 10,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          }
                        }
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "-",
                        "gorm": "-"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 15
                    },
                    "schemaVersion": {
                      "description": "Specifies the version of the schema used for the definition.",
                      "x-order": 16,
                      "x-oapi-codegen-extra-tags": {
                        "db": "-",
                        "gorm": "-"
                      },
                      "default": "connections.meshery.io/v1beta3",
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
      "delete": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "Connections"
        ],
        "operationId": "deleteConnection",
        "summary": "Delete a connection",
        "description": "Delete a specific connection",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "description": "Connection ID",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Connection deleted"
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
    },
    "/api/integrations/connections/{connectionId}/actions": {
      "post": {
        "x-internal": [
          "meshery"
        ],
        "tags": [
          "Connections"
        ],
        "operationId": "performConnectionAction",
        "summary": "Perform an action on a connection",
        "description": "Perform a side-effecting operation on a connection (as opposed to a field update via PUT). The action is selected by the `action` discriminator in the request body. Currently supports switching the MeshSync deployment mode for a kubernetes connection, which redeploys MeshSync (operator vs embedded) for the connection's cluster; the server owns the connection metadata merge so callers only send the intent.",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "description": "Connection ID",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "A side-effecting operation to perform on a connection via POST /api/integrations/connections/{connectionId}/actions. The `action` field selects the operation; operation-specific fields carry its parameters. Unlike PUT (which updates resource fields), the server owns any resulting metadata merge and cluster-side effects.",
                "additionalProperties": false,
                "required": [
                  "action"
                ],
                "properties": {
                  "action": {
                    "type": "string",
                    "description": "The operation to perform on the connection.",
                    "enum": [
                      "setMeshsyncMode"
                    ],
                    "x-oapi-codegen-extra-tags": {
                      "json": "action"
                    }
                  },
                  "mode": {
                    "type": "string",
                    "description": "Target MeshSync deployment mode. Required when `action` is `setMeshsyncMode`; the server redeploys MeshSync (operator vs embedded) for the connection's cluster.",
                    "enum": [
                      "operator",
                      "embedded"
                    ],
                    "x-oapi-codegen-extra-tags": {
                      "json": "mode,omitempty"
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "The updated connection after the action was applied.",
            "content": {
              "application/json": {
                "schema": {
                  "$id": "https://schemas.meshery.io/connection.yaml",
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "description": "Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections",
                  "additionalProperties": false,
                  "type": "object",
                  "required": [
                    "id",
                    "schemaVersion",
                    "name",
                    "type",
                    "subType",
                    "kind",
                    "status"
                  ],
                  "properties": {
                    "id": {
                      "description": "Connection ID",
                      "x-order": 1,
                      "x-go-name": "ID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id"
                      },
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "name": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "name"
                      },
                      "x-order": 2,
                      "type": "string",
                      "description": "Connection Name",
                      "minLength": 1,
                      "maxLength": 255
                    },
                    "description": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "description",
                        "json": "description"
                      },
                      "x-order": 3,
                      "type": "string",
                      "description": "Human-readable description of the connection and its purpose.",
                      "maxLength": 1000
                    },
                    "url": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "url",
                        "json": "url"
                      },
                      "x-order": 4,
                      "type": "string",
                      "format": "uri",
                      "description": "URL of the remote resource this connection points to (e.g. the Helm repository URL, the Kubernetes API server endpoint, the Grafana instance URL).",
                      "maxLength": 2048
                    },
                    "credentialId": {
                      "x-go-name": "CredentialID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "credential_id",
                        "json": "credentialId"
                      },
                      "x-order": 5,
                      "description": "Associated Credential ID",
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "type": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "type",
                        "json": "type",
                        "yaml": "type"
                      },
                      "x-go-name": "ConnectionType",
                      "x-order": 6,
                      "type": "string",
                      "description": "Connection Type (platform, telemetry, collaboration)",
                      "maxLength": 255
                    },
                    "subType": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "sub_type",
                        "json": "subType"
                      },
                      "x-order": 7,
                      "type": "string",
                      "description": "Connection Subtype (cloud, identity, metrics, chat, git, orchestration)",
                      "maxLength": 255
                    },
                    "kind": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "kind"
                      },
                      "x-order": 8,
                      "type": "string",
                      "description": "Connection Kind (meshery, kubernetes, prometheus, grafana, gke, aws, azure, slack, github)",
                      "maxLength": 255
                    },
                    "modelReference": {
                      "x-go-type": "modelv1beta1.ModelReference",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta1/model",
                        "name": "modelv1beta1"
                      },
                      "x-order": 8,
                      "description": "Reference to the specific registered model to which the component belongs and from which model version, category, and other properties may be referenced. Learn more at https://docs.meshery.io/concepts/models",
                      "x-oapi-codegen-extra-tags": {
                        "gorm": "model_reference",
                        "db": "model_reference",
                        "json": "modelReference",
                        "yaml": "modelReference"
                      },
                      "x-generate-db-helpers": true,
                      "type": "object",
                      "required": [
                        "id",
                        "name",
                        "version",
                        "displayName",
                        "model",
                        "registrant"
                      ],
                      "properties": {
                        "id": {
                          "type": "string",
                          "format": "uuid",
                          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          }
                        },
                        "name": {
                          "type": "string",
                          "description": "The unique name for the model within the scope of a registrant.",
                          "pattern": "^[a-z0-9-]+$",
                          "examples": [
                            "cert-manager"
                          ]
                        },
                        "version": {
                          "description": "Version of the model definition.",
                          "type": "string",
                          "minLength": 5,
                          "maxLength": 100,
                          "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                        },
                        "displayName": {
                          "type": "string",
                          "description": "Human-readable name for the model.",
                          "minLength": 1,
                          "maxLength": 100,
                          "pattern": "^[a-zA-Z0-9 ]+$",
                          "examples": [
                            "Cert Manager"
                          ]
                        },
                        "model": {
                          "type": "object",
                          "description": "Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31).",
                          "required": [
                            "version"
                          ],
                          "properties": {
                            "version": {
                              "description": "Version of the model as defined by the registrant.",
                              "x-oapi-codegen-extra-tags": {
                                "json": "version"
                              },
                              "x-order": 1,
                              "type": "string",
                              "minLength": 5,
                              "maxLength": 100,
                              "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                            }
                          }
                        },
                        "registrant": {
                          "x-go-type": "RegistrantReference",
                          "x-oapi-codegen-extra-tags": {
                            "json": "registrant"
                          },
                          "type": "object",
                          "required": [
                            "kind"
                          ],
                          "properties": {
                            "kind": {
                              "type": "string",
                              "description": "Kind of the registrant.",
                              "maxLength": 255
                            }
                          }
                        }
                      }
                    },
                    "metadata": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "metadata"
                      },
                      "x-order": 9,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "type": "object",
                      "description": "Additional connection metadata"
                    },
                    "credentialSchema": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "credential_schema"
                      },
                      "x-order": 9,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "type": "object",
                      "description": "Schema for the credential Associated with the connection"
                    },
                    "connectionSchema": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "connection_schema"
                      },
                      "x-order": 9,
                      "x-go-type": "core.Map",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "type": "object",
                      "description": "Schema for the connection"
                    },
                    "styles": {
                      "x-oapi-codegen-extra-tags": {
                        "gorm": "type:bytes;serializer:json",
                        "db": "-",
                        "yaml": "styles",
                        "json": "styles"
                      },
                      "x-go-type": "core.ComponentStyles",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-order": 17,
                      "description": "Visualization styles for the connection, including svgColor and svgWhite used for UI representation.",
                      "type": "object",
                      "required": [
                        "shape",
                        "primaryColor",
                        "svgColor",
                        "svgWhite",
                        "svgComplete"
                      ],
                      "allOf": [
                        {
                          "type": "object",
                          "description": "Common styles for all entities",
                          "additionalProperties": true,
                          "required": [
                            "primaryColor",
                            "svgColor",
                            "svgWhite",
                            "svgComplete"
                          ],
                          "properties": {
                            "primaryColor": {
                              "type": "string",
                              "description": "Primary color of the component used for UI representation.",
                              "maxLength": 500
                            },
                            "secondaryColor": {
                              "type": "string",
                              "description": "Secondary color of the entity used for UI representation.",
                              "maxLength": 500
                            },
                            "svgWhite": {
                              "type": "string",
                              "description": "White SVG of the entity used for UI representation on dark background.",
                              "maxLength": 500
                            },
                            "svgColor": {
                              "type": "string",
                              "description": "Colored SVG of the entity used for UI representation on light background.",
                              "maxLength": 500
                            },
                            "svgComplete": {
                              "type": "string",
                              "description": "Complete SVG of the entity used for UI representation, often inclusive of background.",
                              "maxLength": 500
                            },
                            "color": {
                              "type": "string",
                              "description": "The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 500
                            },
                            "textOpacity": {
                              "type": "number",
                              "description": "The opacity of the label text, including its outline.",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "fontFamily": {
                              "type": "string",
                              "description": "A comma-separated list of font names to use on the label text.",
                              "maxLength": 500
                            },
                            "fontSize": {
                              "type": "string",
                              "description": "The size of the label text.",
                              "maxLength": 500
                            },
                            "fontStyle": {
                              "type": "string",
                              "description": "A CSS font style to be applied to the label text.",
                              "maxLength": 500
                            },
                            "fontWeight": {
                              "type": "string",
                              "description": "A CSS font weight to be applied to the label text.",
                              "maxLength": 500
                            },
                            "textTransform": {
                              "type": "string",
                              "description": "A transformation to apply to the label text",
                              "enum": [
                                "none",
                                "uppercase",
                                "lowercase"
                              ]
                            },
                            "opacity": {
                              "type": "number",
                              "description": "The opacity of the element, ranging from 0 to 1. Note that the opacity of a compound node parent affects the effective opacity of its children.",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "zIndex": {
                              "type": "integer",
                              "description": "An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index.",
                              "minimum": 0
                            },
                            "label": {
                              "type": "string",
                              "description": "The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id",
                              "maxLength": 500
                            },
                            "animation": {
                              "type": "object",
                              "description": "The animation to apply to the element. example ripple,bounce,etc"
                            }
                          }
                        },
                        {
                          "type": "object",
                          "properties": {
                            "shape": {
                              "type": "string",
                              "description": "The shape of the node's body. Note that each shape fits within the specified width and height, and so you may have to adjust width and height if you desire an equilateral shape (i.e. width !== height for several equilateral shapes)",
                              "enum": [
                                "ellipse",
                                "triangle",
                                "round-triangle",
                                "rectangle",
                                "round-rectangle",
                                "bottom-round-rectangle",
                                "cut-rectangle",
                                "barrel",
                                "rhomboid",
                                "diamond",
                                "round-diamond",
                                "pentagon",
                                "round-pentagon",
                                "hexagon",
                                "round-hexagon",
                                "concave-hexagon",
                                "heptagon",
                                "round-heptagon",
                                "octagon",
                                "round-octagon",
                                "star",
                                "tag",
                                "round-tag",
                                "vee",
                                "polygon"
                              ]
                            },
                            "position": {
                              "type": "object",
                              "additionalProperties": false,
                              "required": [
                                "x",
                                "y"
                              ],
                              "description": "The position of the node. If the position is set, the node is drawn at that position in the given dimensions. If the position is not set, the node is drawn at a random position.",
                              "properties": {
                                "x": {
                                  "type": "number",
                                  "description": "The x-coordinate of the node.",
                                  "minimum": -1000000,
                                  "maximum": 1000000,
                                  "x-go-type": "float64"
                                },
                                "y": {
                                  "type": "number",
                                  "description": "The y-coordinate of the node.",
                                  "minimum": -1000000,
                                  "maximum": 1000000,
                                  "x-go-type": "float64"
                                }
                              }
                            },
                            "bodyText": {
                              "type": "string",
                              "description": "The text to display for an element's body. Can give a path, e.g. data(id) will label with the elements id",
                              "maxLength": 500
                            },
                            "bodyTextWrap": {
                              "type": "string",
                              "description": "How to wrap the text in the node. Can be 'none', 'wrap', or 'ellipsis'.",
                              "enum": [
                                "none",
                                "wrap",
                                "ellipsis"
                              ]
                            },
                            "bodyTextMaxWidth": {
                              "type": "string",
                              "description": "The maximum width for wrapping text in the node.",
                              "maxLength": 50
                            },
                            "bodyTextOpacity": {
                              "type": "number",
                              "description": "The opacity of the node's body text, including its outline.",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "bodyTextBackgroundColor": {
                              "type": "string",
                              "description": "The colour of the node's body text background. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "bodyTextFontSize": {
                              "type": "number",
                              "description": "The size of the node's body text.",
                              "minimum": 0
                            },
                            "bodyTextColor": {
                              "type": "string",
                              "description": "The colour of the node's body text. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "bodyTextFontWeight": {
                              "type": "string",
                              "description": "A CSS font weight to be applied to the node's body text.",
                              "maxLength": 50
                            },
                            "bodyTextHorizontalAlign": {
                              "type": "string",
                              "description": "A CSS horizontal alignment to be applied to the node's body text.",
                              "maxLength": 50
                            },
                            "bodyTextDecoration": {
                              "type": "string",
                              "description": "A CSS text decoration to be applied to the node's body text.",
                              "maxLength": 100
                            },
                            "bodyTextVerticalAlign": {
                              "type": "string",
                              "description": "A CSS vertical alignment to be applied to the node's body text.",
                              "maxLength": 50
                            },
                            "width": {
                              "type": "number",
                              "description": "The width of the node's body or the width of an edge's line.",
                              "minimum": 0
                            },
                            "height": {
                              "type": "number",
                              "description": "The height of the node's body",
                              "minimum": 0
                            },
                            "backgroundImage": {
                              "type": "string",
                              "format": "uri",
                              "description": "The URL that points to the image to show in the node.",
                              "maxLength": 2048
                            },
                            "backgroundColor": {
                              "type": "string",
                              "description": "The colour of the node's body. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "backgroundBlacken": {
                              "type": "number",
                              "description": "Blackens the node's body for values from 0 to 1; whitens the node's body for values from 0 to -1.",
                              "maximum": 1,
                              "minimum": -1
                            },
                            "backgroundOpacity": {
                              "type": "number",
                              "description": "The opacity level of the node's background colour",
                              "maximum": 1,
                              "minimum": 0
                            },
                            "backgroundPositionX": {
                              "type": "string",
                              "description": "The x position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                              "maxLength": 50
                            },
                            "backgroundPositionY": {
                              "type": "string",
                              "description": "The y position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                              "maxLength": 50
                            },
                            "backgroundOffsetX": {
                              "type": "string",
                              "description": "The x offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                              "maxLength": 50
                            },
                            "backgroundOffsetY": {
                              "type": "string",
                              "description": "The y offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                              "maxLength": 50
                            },
                            "backgroundFit": {
                              "type": "string",
                              "description": "How the background image is fit to the node. Can be 'none', 'contain', or 'cover'.",
                              "enum": [
                                "none",
                                "contain",
                                "cover"
                              ]
                            },
                            "backgroundClip": {
                              "type": "string",
                              "description": "How the background image is clipped to the node. Can be 'none', 'node', or 'node-border'.",
                              "enum": [
                                "none",
                                "node",
                                "node-border"
                              ]
                            },
                            "backgroundWidthRelativeTo": {
                              "type": "string",
                              "description": "How the background image's width is determined. Can be 'none', 'inner', or 'outer'.",
                              "enum": [
                                "none",
                                "inner",
                                "outer"
                              ]
                            },
                            "backgroundHeightRelativeTo": {
                              "type": "string",
                              "description": "How the background image's height is determined. Can be 'none', 'inner', or 'outer'.",
                              "enum": [
                                "none",
                                "inner",
                                "outer"
                              ]
                            },
                            "borderWidth": {
                              "type": "number",
                              "description": "The size of the node's border.",
                              "minimum": 0
                            },
                            "borderStyle": {
                              "type": "string",
                              "description": "The style of the node's border",
                              "enum": [
                                "solid",
                                "dotted",
                                "dashed",
                                "double"
                              ]
                            },
                            "borderColor": {
                              "type": "string",
                              "description": "The colour of the node's border. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "borderOpacity": {
                              "type": "number",
                              "description": "The opacity of the node's border",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "padding": {
                              "type": "number",
                              "description": "The amount of padding around all sides of the node.",
                              "minimum": 0
                            },
                            "textHalign": {
                              "type": "string",
                              "description": "The horizontal alignment of a node's label",
                              "enum": [
                                "left",
                                "center",
                                "right"
                              ]
                            },
                            "textValign": {
                              "type": "string",
                              "description": "The vertical alignment of a node's label",
                              "enum": [
                                "top",
                                "center",
                                "bottom"
                              ]
                            },
                            "ghost": {
                              "type": "string",
                              "description": "Whether to use the ghost effect, a semitransparent duplicate of the element drawn at an offset.",
                              "default": "no",
                              "enum": [
                                "yes",
                                "no"
                              ]
                            },
                            "activeBgColor": {
                              "type": "string",
                              "description": "The colour of the indicator shown when the background is grabbed by the user. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "activeBgOpacity": {
                              "type": "string",
                              "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                              "maxLength": 50
                            },
                            "activeBgSize": {
                              "type": "string",
                              "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                              "maxLength": 50
                            },
                            "selectionBoxColor": {
                              "type": "string",
                              "description": "The background colour of the selection box used for drag selection. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "selectionBoxBorderWidth": {
                              "type": "number",
                              "description": "The size of the border on the selection box. Selector needs to be *core*",
                              "minimum": 0
                            },
                            "selectionBoxOpacity": {
                              "type": "number",
                              "description": "The opacity of the selection box. Selector needs to be *core*",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "outsideTextureBgColor": {
                              "type": "string",
                              "description": "The colour of the area outside the viewport texture when initOptions.textureOnViewport === true. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "outsideTextureBgOpacity": {
                              "type": "number",
                              "description": "The opacity of the area outside the viewport texture. Selector needs to be *core*",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "shapePolygonPoints": {
                              "type": "string",
                              "description": "An array (or a space-separated string) of numbers ranging on [-1, 1], representing alternating x and y values (i.e. x1 y1 x2 y2, x3 y3 ...). This represents the points in the polygon for the node's shape. The bounding box of the node is given by (-1, -1), (1, -1), (1, 1), (-1, 1). The node's position is the origin (0, 0 )",
                              "maxLength": 2000
                            },
                            "menuBackgroundColor": {
                              "type": "string",
                              "description": "The colour of the background of the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            },
                            "menuBackgroundOpacity": {
                              "type": "number",
                              "description": "The opacity of the background of the component menu.",
                              "minimum": 0,
                              "maximum": 1
                            },
                            "menuForgroundColor": {
                              "type": "string",
                              "description": "The colour of the text or icons in the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                              "maxLength": 100
                            }
                          }
                        }
                      ]
                    },
                    "status": {
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      },
                      "x-order": 10,
                      "description": "Connection Status",
                      "type": "string",
                      "enum": [
                        "discovered",
                        "registered",
                        "connected",
                        "ignored",
                        "maintenance",
                        "disconnected",
                        "deleted",
                        "not found"
                      ]
                    },
                    "transitionMap": {
                      "type": "object",
                      "description": "Map describing the connection state machine. Each key is a current connection status and its value is the list of states the connection may transition to from that status, along with a description of each transition.",
                      "additionalProperties": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "additionalProperties": false,
                          "description": "A single permissible state transition for a connection, describing the next reachable state and the meaning of that transition.",
                          "required": [
                            "nextState"
                          ],
                          "properties": {
                            "nextState": {
                              "type": "string",
                              "description": "Connection Status Value",
                              "x-go-name": "ConnectionStatusValue",
                              "enum": [
                                "discovered",
                                "registered",
                                "connected",
                                "ignored",
                                "maintenance",
                                "disconnected",
                                "deleted",
                                "not found"
                              ],
                              "x-order": 1
                            },
                            "description": {
                              "type": "string",
                              "description": "Human-readable explanation of when or why this transition occurs.",
                              "maxLength": 1000,
                              "x-oapi-codegen-extra-tags": {
                                "json": "description,omitempty"
                              },
                              "x-order": 2
                            }
                          }
                        }
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-oapi-codegen-extra-tags": {
                        "gorm": "type:bytes;serializer:json",
                        "db": "-",
                        "json": "transitionMap,omitempty"
                      },
                      "x-order": 18
                    },
                    "owner": {
                      "x-go-name": "Owner",
                      "x-oapi-codegen-extra-tags": {
                        "db": "owner",
                        "json": "owner"
                      },
                      "x-order": 11,
                      "description": "User ID who owns this connection",
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "createdAt": {
                      "description": "Timestamp when the connection was created.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at",
                        "json": "createdAt"
                      },
                      "x-order": 12,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp when the connection was last updated.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at",
                        "json": "updatedAt"
                      },
                      "x-order": 13,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "description": "Timestamp when the connection was soft-deleted, if applicable.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deletedAt"
                      },
                      "x-order": 14,
                      "x-go-type": "meshcore.NullTime",
                      "x-go-type-import": {
                        "name": "meshcore",
                        "path": "github.com/meshery/schemas/models/core"
                      },
                      "type": "string",
                      "format": "date-time",
                      "nullable": true,
                      "x-go-type-skip-optional-pointer": true
                    },
                    "environments": {
                      "type": "array",
                      "description": "Associated environments for this connection",
                      "items": {
                        "x-go-type": "*environmentv1beta3.Environment",
                        "x-go-type-import": {
                          "path": "github.com/meshery/schemas/models/v1beta3/environment",
                          "name": "environmentv1beta3"
                        },
                        "$id": "https://schemas.meshery.io/environment.yaml",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "title": "Environment",
                        "description": "Environments allow you to logically group related Connections and their associated Credentials. Learn more at https://docs.meshery.io/concepts/logical/environments",
                        "additionalProperties": false,
                        "type": "object",
                        "example": {
                          "id": "00000000-0000-0000-0000-000000000000",
                          "schemaVersion": "environments.meshery.io/v1beta3",
                          "name": "Production Environment",
                          "description": "Connections and credentials for the production cluster.",
                          "organizationId": "00000000-0000-0000-0000-000000000000",
                          "owner": "00000000-0000-0000-0000-000000000000",
                          "createdAt": "0001-01-01T00:00:00Z",
                          "metadata": {},
                          "updatedAt": "0001-01-01T00:00:00Z",
                          "deletedAt": null
                        },
                        "required": [
                          "id",
                          "schemaVersion",
                          "name",
                          "description",
                          "organizationId"
                        ],
                        "properties": {
                          "id": {
                            "description": "ID",
                            "x-order": 1,
                            "x-go-name": "ID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "id",
                              "json": "id"
                            },
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "schemaVersion": {
                            "description": "Specifies the version of the schema to which the environment conforms.",
                            "x-order": 2,
                            "x-oapi-codegen-extra-tags": {
                              "json": "schemaVersion",
                              "db": "-",
                              "gorm": "-"
                            },
                            "default": "environments.meshery.io/v1beta3",
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
                          "name": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "name",
                              "json": "name"
                            },
                            "x-order": 3,
                            "type": "string",
                            "maxLength": 100,
                            "description": "Environment name"
                          },
                          "description": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "description",
                              "json": "description"
                            },
                            "x-order": 4,
                            "type": "string",
                            "maxLength": 1000,
                            "description": "Environment description"
                          },
                          "organizationId": {
                            "x-go-name": "OrganizationID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "organization_id",
                              "json": "organizationId"
                            },
                            "x-order": 5,
                            "description": "Environment organization ID",
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "owner": {
                            "x-oapi-codegen-extra-tags": {
                              "db": "owner",
                              "json": "owner"
                            },
                            "x-order": 6,
                            "description": "Environment owner",
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "createdAt": {
                            "description": "Timestamp when the environment was created.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at",
                              "yaml": "created_at",
                              "json": "createdAt"
                            },
                            "x-order": 7,
                            "x-go-type": "time.Time",
                            "type": "string",
                            "format": "date-time",
                            "x-go-name": "CreatedAt",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "metadata": {
                            "description": "Additional metadata associated with the environment.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "metadata",
                              "json": "metadata"
                            },
                            "x-order": 8,
                            "x-go-type": "core.Map",
                            "x-go-type-skip-optional-pointer": true,
                            "type": "object"
                          },
                          "updatedAt": {
                            "description": "Timestamp when the environment was last updated.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at",
                              "yaml": "updated_at",
                              "json": "updatedAt"
                            },
                            "x-order": 9,
                            "x-go-type": "time.Time",
                            "type": "string",
                            "format": "date-time",
                            "x-go-name": "UpdatedAt",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deletedAt": {
                            "description": "Timestamp when the environment was soft deleted. Null while the environment remains active.",
                            "nullable": true,
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "json": "deletedAt"
                            },
                            "x-go-type": "core.NullTime",
                            "x-go-import": "database/sql",
                            "x-order": 10,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          }
                        }
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "-",
                        "gorm": "-"
                      },
                      "x-go-type-skip-optional-pointer": true,
                      "x-order": 15
                    },
                    "schemaVersion": {
                      "description": "Specifies the version of the schema used for the definition.",
                      "x-order": 16,
                      "x-oapi-codegen-extra-tags": {
                        "db": "-",
                        "gorm": "-"
                      },
                      "default": "connections.meshery.io/v1beta3",
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
    },
    "/api/integrations/connections/meshery/{mesheryServerId}": {
      "delete": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "Connections"
        ],
        "operationId": "deleteMesheryConnection",
        "summary": "Delete Meshery instance connection",
        "description": "Delete a Meshery server connection by server ID",
        "parameters": [
          {
            "name": "mesheryServerId",
            "in": "path",
            "required": true,
            "description": "Meshery server ID",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Meshery connection deleted"
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
    },
    "/api/integrations/connections/kubernetes/{connectionId}/context": {
      "get": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "Connections"
        ],
        "operationId": "getKubernetesContext",
        "summary": "Get Kubernetes context",
        "description": "Get Kubernetes context for a specific connection",
        "parameters": [
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "description": "Connection ID",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Kubernetes context",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated list of Kubernetes contexts.",
                  "required": [
                    "page",
                    "pageSize",
                    "totalCount",
                    "contexts"
                  ],
                  "properties": {
                    "page": {
                      "type": "integer",
                      "description": "Zero-based page index returned in this response.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "json": "page"
                      }
                    },
                    "pageSize": {
                      "type": "integer",
                      "description": "Maximum number of items returned on each page.",
                      "minimum": 1,
                      "x-oapi-codegen-extra-tags": {
                        "json": "pageSize"
                      }
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of items across all pages.",
                      "minimum": 0,
                      "x-oapi-codegen-extra-tags": {
                        "json": "totalCount"
                      }
                    },
                    "contexts": {
                      "type": "array",
                      "description": "Kubernetes contexts in this page.",
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
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "json": "owner,omitempty"
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
                            "x-oapi-codegen-extra-tags": {
                              "json": "createdBy,omitempty"
                            }
                          },
                          "mesheryInstanceId": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-go-name": "MesheryInstanceID",
                            "x-oapi-codegen-extra-tags": {
                              "json": "mesheryInstanceId,omitempty"
                            }
                          },
                          "kubernetesServerId": {
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-go-name": "KubernetesServerID",
                            "x-oapi-codegen-extra-tags": {
                              "json": "kubernetesServerId,omitempty"
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
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            },
                            "x-go-name": "ConnectionID",
                            "x-go-type-skip-optional-pointer": true,
                            "x-oapi-codegen-extra-tags": {
                              "json": "connectionId,omitempty"
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
                      },
                      "x-oapi-codegen-extra-tags": {
                        "json": "contexts"
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
    "/api/environments/{environmentId}/connections/{connectionId}": {
      "post": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "Connections"
        ],
        "operationId": "addConnectionToEnvironment",
        "summary": "Add connection to environment",
        "description": "Associate a connection with an environment",
        "parameters": [
          {
            "name": "environmentId",
            "in": "path",
            "required": true,
            "description": "Environment ID",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "description": "Connection ID",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Connection added to environment"
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
      "delete": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "Connections"
        ],
        "operationId": "removeConnectionFromEnvironment",
        "summary": "Remove connection from environment",
        "description": "Disassociate a connection from an environment",
        "parameters": [
          {
            "name": "environmentId",
            "in": "path",
            "required": true,
            "description": "Environment ID",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "name": "connectionId",
            "in": "path",
            "required": true,
            "description": "Connection ID",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Connection removed from environment"
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
    },
    "/api/registry/connections": {
      "get": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "ConnectionDefinitions"
        ],
        "operationId": "listConnectionDefinitions",
        "summary": "List connection definitions",
        "description": "Returns a paginated list of connection definitions registered in the registry, optionally filtered by model or kind.",
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "description": "Page number",
            "required": false,
            "schema": {
              "type": "integer",
              "minimum": 0,
              "default": 0
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "description": "Number of items per page",
            "required": false,
            "schema": {
              "type": "integer",
              "minimum": 1,
              "default": 10
            }
          },
          {
            "name": "search",
            "in": "query",
            "description": "Search term",
            "required": false,
            "schema": {
              "type": "string",
              "maxLength": 500
            }
          },
          {
            "name": "order",
            "in": "query",
            "description": "Sort order",
            "required": false,
            "schema": {
              "type": "string",
              "maxLength": 500
            }
          },
          {
            "name": "model",
            "in": "query",
            "description": "Filter by the name of the model the connection definition belongs to",
            "required": false,
            "schema": {
              "type": "string",
              "maxLength": 255
            }
          },
          {
            "name": "kind",
            "in": "query",
            "description": "Filter by connection kind (e.g., kubernetes, prometheus, grafana)",
            "required": false,
            "schema": {
              "type": "array",
              "items": {
                "type": "string",
                "maxLength": 255
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Paginated list of connection definitions",
            "content": {
              "application/json": {
                "schema": {
                  "description": "Represents a page of connection definitions with meta information about the total count",
                  "additionalProperties": false,
                  "type": "object",
                  "required": [
                    "connectionDefinitions",
                    "totalCount",
                    "page",
                    "pageSize"
                  ],
                  "properties": {
                    "connectionDefinitions": {
                      "type": "array",
                      "description": "List of connection definitions on this page",
                      "x-go-type": "[]*ConnectionDefinition",
                      "items": {
                        "description": "A connection definition is an uninitialized connection, authored per-model (in a model's `connections/` folder) and registered into the registry alongside components and relationships. It conforms to the connection schema; the dynamic, kind-specific shape is carried in `metadata`. The `model` association scopes the definition to its owning model.",
                        "x-go-type": "ConnectionDefinition"
                      },
                      "x-order": 1
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of connection definitions on all pages",
                      "x-oapi-codegen-extra-tags": {
                        "json": "totalCount"
                      },
                      "x-order": 2,
                      "minimum": 0
                    },
                    "page": {
                      "type": "integer",
                      "description": "Current page number",
                      "x-order": 3,
                      "minimum": 0
                    },
                    "pageSize": {
                      "type": "integer",
                      "description": "Number of elements per page",
                      "x-oapi-codegen-extra-tags": {
                        "json": "pageSize"
                      },
                      "x-order": 4,
                      "minimum": 1
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
      "post": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "ConnectionDefinitions"
        ],
        "operationId": "registerConnectionDefinition",
        "summary": "Register a connection definition",
        "description": "Register a new connection definition into the registry.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for registering (creating) or updating a connection definition. Contains only client-settable fields; server-generated fields such as createdAt, updatedAt, and deletedAt are excluded.",
                "required": [
                  "name",
                  "kind",
                  "type",
                  "subType",
                  "status"
                ],
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "description": "Existing connection definition ID for updates; omit on create.",
                    "x-go-name": "ID",
                    "x-oapi-codegen-extra-tags": {
                      "json": "id,omitempty"
                    }
                  },
                  "schemaVersion": {
                    "description": "Specifies the version of the schema the definition conforms to.",
                    "default": "connections.meshery.io/v1beta3",
                    "x-oapi-codegen-extra-tags": {
                      "json": "schemaVersion,omitempty"
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
                  "name": {
                    "type": "string",
                    "description": "Connection definition name",
                    "minLength": 1,
                    "maxLength": 255,
                    "x-oapi-codegen-extra-tags": {
                      "json": "name"
                    }
                  },
                  "description": {
                    "type": "string",
                    "description": "Human-readable description of the connection definition and its purpose.",
                    "maxLength": 1000,
                    "x-oapi-codegen-extra-tags": {
                      "json": "description,omitempty"
                    }
                  },
                  "url": {
                    "type": "string",
                    "format": "uri",
                    "description": "URL of the remote resource connections of this kind point to.",
                    "maxLength": 2048,
                    "x-oapi-codegen-extra-tags": {
                      "json": "url,omitempty"
                    }
                  },
                  "kind": {
                    "type": "string",
                    "description": "Connection kind (e.g., kubernetes, prometheus, grafana)",
                    "maxLength": 255,
                    "x-oapi-codegen-extra-tags": {
                      "json": "kind"
                    }
                  },
                  "type": {
                    "type": "string",
                    "description": "Connection type (platform, telemetry, collaboration)",
                    "maxLength": 255,
                    "x-oapi-codegen-extra-tags": {
                      "json": "type"
                    }
                  },
                  "subType": {
                    "type": "string",
                    "description": "Connection sub-type (cloud, identity, metrics, chat, git, orchestration)",
                    "maxLength": 255,
                    "x-oapi-codegen-extra-tags": {
                      "json": "subType"
                    }
                  },
                  "status": {
                    "type": "string",
                    "description": "Connection Status Value",
                    "x-go-name": "ConnectionStatusValue",
                    "enum": [
                      "discovered",
                      "registered",
                      "connected",
                      "ignored",
                      "maintenance",
                      "disconnected",
                      "deleted",
                      "not found"
                    ],
                    "x-oapi-codegen-extra-tags": {
                      "json": "status"
                    }
                  },
                  "modelReference": {
                    "x-go-type": "modelv1beta1.ModelReference",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/v1beta1/model",
                      "name": "modelv1beta1"
                    },
                    "description": "Reference to the registered model that owns this connection definition.",
                    "x-oapi-codegen-extra-tags": {
                      "json": "modelReference,omitempty"
                    },
                    "x-generate-db-helpers": true,
                    "type": "object",
                    "required": [
                      "id",
                      "name",
                      "version",
                      "displayName",
                      "model",
                      "registrant"
                    ],
                    "properties": {
                      "id": {
                        "type": "string",
                        "format": "uuid",
                        "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        }
                      },
                      "name": {
                        "type": "string",
                        "description": "The unique name for the model within the scope of a registrant.",
                        "pattern": "^[a-z0-9-]+$",
                        "examples": [
                          "cert-manager"
                        ]
                      },
                      "version": {
                        "description": "Version of the model definition.",
                        "type": "string",
                        "minLength": 5,
                        "maxLength": 100,
                        "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                      },
                      "displayName": {
                        "type": "string",
                        "description": "Human-readable name for the model.",
                        "minLength": 1,
                        "maxLength": 100,
                        "pattern": "^[a-zA-Z0-9 ]+$",
                        "examples": [
                          "Cert Manager"
                        ]
                      },
                      "model": {
                        "type": "object",
                        "description": "Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31).",
                        "required": [
                          "version"
                        ],
                        "properties": {
                          "version": {
                            "description": "Version of the model as defined by the registrant.",
                            "x-oapi-codegen-extra-tags": {
                              "json": "version"
                            },
                            "x-order": 1,
                            "type": "string",
                            "minLength": 5,
                            "maxLength": 100,
                            "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                          }
                        }
                      },
                      "registrant": {
                        "x-go-type": "RegistrantReference",
                        "x-oapi-codegen-extra-tags": {
                          "json": "registrant"
                        },
                        "type": "object",
                        "required": [
                          "kind"
                        ],
                        "properties": {
                          "kind": {
                            "type": "string",
                            "description": "Kind of the registrant.",
                            "maxLength": 255
                          }
                        }
                      }
                    }
                  },
                  "metadata": {
                    "type": "object",
                    "description": "Kind-specific connection metadata",
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "metadata"
                    }
                  },
                  "credentialSchema": {
                    "type": "object",
                    "description": "Schema for the credential associated with connections of this kind.",
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "credentialSchema"
                    }
                  },
                  "connectionSchema": {
                    "type": "object",
                    "description": "Schema for connections of this kind.",
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "connectionSchema"
                    }
                  },
                  "styles": {
                    "x-go-type": "core.ComponentStyles",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    },
                    "description": "Visualization styles for the connection, including svgColor and svgWhite used for UI representation.",
                    "x-oapi-codegen-extra-tags": {
                      "json": "styles,omitempty"
                    },
                    "type": "object",
                    "required": [
                      "shape",
                      "primaryColor",
                      "svgColor",
                      "svgWhite",
                      "svgComplete"
                    ],
                    "allOf": [
                      {
                        "type": "object",
                        "description": "Common styles for all entities",
                        "additionalProperties": true,
                        "required": [
                          "primaryColor",
                          "svgColor",
                          "svgWhite",
                          "svgComplete"
                        ],
                        "properties": {
                          "primaryColor": {
                            "type": "string",
                            "description": "Primary color of the component used for UI representation.",
                            "maxLength": 500
                          },
                          "secondaryColor": {
                            "type": "string",
                            "description": "Secondary color of the entity used for UI representation.",
                            "maxLength": 500
                          },
                          "svgWhite": {
                            "type": "string",
                            "description": "White SVG of the entity used for UI representation on dark background.",
                            "maxLength": 500
                          },
                          "svgColor": {
                            "type": "string",
                            "description": "Colored SVG of the entity used for UI representation on light background.",
                            "maxLength": 500
                          },
                          "svgComplete": {
                            "type": "string",
                            "description": "Complete SVG of the entity used for UI representation, often inclusive of background.",
                            "maxLength": 500
                          },
                          "color": {
                            "type": "string",
                            "description": "The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 500
                          },
                          "textOpacity": {
                            "type": "number",
                            "description": "The opacity of the label text, including its outline.",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "fontFamily": {
                            "type": "string",
                            "description": "A comma-separated list of font names to use on the label text.",
                            "maxLength": 500
                          },
                          "fontSize": {
                            "type": "string",
                            "description": "The size of the label text.",
                            "maxLength": 500
                          },
                          "fontStyle": {
                            "type": "string",
                            "description": "A CSS font style to be applied to the label text.",
                            "maxLength": 500
                          },
                          "fontWeight": {
                            "type": "string",
                            "description": "A CSS font weight to be applied to the label text.",
                            "maxLength": 500
                          },
                          "textTransform": {
                            "type": "string",
                            "description": "A transformation to apply to the label text",
                            "enum": [
                              "none",
                              "uppercase",
                              "lowercase"
                            ]
                          },
                          "opacity": {
                            "type": "number",
                            "description": "The opacity of the element, ranging from 0 to 1. Note that the opacity of a compound node parent affects the effective opacity of its children.",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "zIndex": {
                            "type": "integer",
                            "description": "An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index.",
                            "minimum": 0
                          },
                          "label": {
                            "type": "string",
                            "description": "The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id",
                            "maxLength": 500
                          },
                          "animation": {
                            "type": "object",
                            "description": "The animation to apply to the element. example ripple,bounce,etc"
                          }
                        }
                      },
                      {
                        "type": "object",
                        "properties": {
                          "shape": {
                            "type": "string",
                            "description": "The shape of the node's body. Note that each shape fits within the specified width and height, and so you may have to adjust width and height if you desire an equilateral shape (i.e. width !== height for several equilateral shapes)",
                            "enum": [
                              "ellipse",
                              "triangle",
                              "round-triangle",
                              "rectangle",
                              "round-rectangle",
                              "bottom-round-rectangle",
                              "cut-rectangle",
                              "barrel",
                              "rhomboid",
                              "diamond",
                              "round-diamond",
                              "pentagon",
                              "round-pentagon",
                              "hexagon",
                              "round-hexagon",
                              "concave-hexagon",
                              "heptagon",
                              "round-heptagon",
                              "octagon",
                              "round-octagon",
                              "star",
                              "tag",
                              "round-tag",
                              "vee",
                              "polygon"
                            ]
                          },
                          "position": {
                            "type": "object",
                            "additionalProperties": false,
                            "required": [
                              "x",
                              "y"
                            ],
                            "description": "The position of the node. If the position is set, the node is drawn at that position in the given dimensions. If the position is not set, the node is drawn at a random position.",
                            "properties": {
                              "x": {
                                "type": "number",
                                "description": "The x-coordinate of the node.",
                                "minimum": -1000000,
                                "maximum": 1000000,
                                "x-go-type": "float64"
                              },
                              "y": {
                                "type": "number",
                                "description": "The y-coordinate of the node.",
                                "minimum": -1000000,
                                "maximum": 1000000,
                                "x-go-type": "float64"
                              }
                            }
                          },
                          "bodyText": {
                            "type": "string",
                            "description": "The text to display for an element's body. Can give a path, e.g. data(id) will label with the elements id",
                            "maxLength": 500
                          },
                          "bodyTextWrap": {
                            "type": "string",
                            "description": "How to wrap the text in the node. Can be 'none', 'wrap', or 'ellipsis'.",
                            "enum": [
                              "none",
                              "wrap",
                              "ellipsis"
                            ]
                          },
                          "bodyTextMaxWidth": {
                            "type": "string",
                            "description": "The maximum width for wrapping text in the node.",
                            "maxLength": 50
                          },
                          "bodyTextOpacity": {
                            "type": "number",
                            "description": "The opacity of the node's body text, including its outline.",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "bodyTextBackgroundColor": {
                            "type": "string",
                            "description": "The colour of the node's body text background. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "bodyTextFontSize": {
                            "type": "number",
                            "description": "The size of the node's body text.",
                            "minimum": 0
                          },
                          "bodyTextColor": {
                            "type": "string",
                            "description": "The colour of the node's body text. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "bodyTextFontWeight": {
                            "type": "string",
                            "description": "A CSS font weight to be applied to the node's body text.",
                            "maxLength": 50
                          },
                          "bodyTextHorizontalAlign": {
                            "type": "string",
                            "description": "A CSS horizontal alignment to be applied to the node's body text.",
                            "maxLength": 50
                          },
                          "bodyTextDecoration": {
                            "type": "string",
                            "description": "A CSS text decoration to be applied to the node's body text.",
                            "maxLength": 100
                          },
                          "bodyTextVerticalAlign": {
                            "type": "string",
                            "description": "A CSS vertical alignment to be applied to the node's body text.",
                            "maxLength": 50
                          },
                          "width": {
                            "type": "number",
                            "description": "The width of the node's body or the width of an edge's line.",
                            "minimum": 0
                          },
                          "height": {
                            "type": "number",
                            "description": "The height of the node's body",
                            "minimum": 0
                          },
                          "backgroundImage": {
                            "type": "string",
                            "format": "uri",
                            "description": "The URL that points to the image to show in the node.",
                            "maxLength": 2048
                          },
                          "backgroundColor": {
                            "type": "string",
                            "description": "The colour of the node's body. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "backgroundBlacken": {
                            "type": "number",
                            "description": "Blackens the node's body for values from 0 to 1; whitens the node's body for values from 0 to -1.",
                            "maximum": 1,
                            "minimum": -1
                          },
                          "backgroundOpacity": {
                            "type": "number",
                            "description": "The opacity level of the node's background colour",
                            "maximum": 1,
                            "minimum": 0
                          },
                          "backgroundPositionX": {
                            "type": "string",
                            "description": "The x position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                            "maxLength": 50
                          },
                          "backgroundPositionY": {
                            "type": "string",
                            "description": "The y position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                            "maxLength": 50
                          },
                          "backgroundOffsetX": {
                            "type": "string",
                            "description": "The x offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                            "maxLength": 50
                          },
                          "backgroundOffsetY": {
                            "type": "string",
                            "description": "The y offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                            "maxLength": 50
                          },
                          "backgroundFit": {
                            "type": "string",
                            "description": "How the background image is fit to the node. Can be 'none', 'contain', or 'cover'.",
                            "enum": [
                              "none",
                              "contain",
                              "cover"
                            ]
                          },
                          "backgroundClip": {
                            "type": "string",
                            "description": "How the background image is clipped to the node. Can be 'none', 'node', or 'node-border'.",
                            "enum": [
                              "none",
                              "node",
                              "node-border"
                            ]
                          },
                          "backgroundWidthRelativeTo": {
                            "type": "string",
                            "description": "How the background image's width is determined. Can be 'none', 'inner', or 'outer'.",
                            "enum": [
                              "none",
                              "inner",
                              "outer"
                            ]
                          },
                          "backgroundHeightRelativeTo": {
                            "type": "string",
                            "description": "How the background image's height is determined. Can be 'none', 'inner', or 'outer'.",
                            "enum": [
                              "none",
                              "inner",
                              "outer"
                            ]
                          },
                          "borderWidth": {
                            "type": "number",
                            "description": "The size of the node's border.",
                            "minimum": 0
                          },
                          "borderStyle": {
                            "type": "string",
                            "description": "The style of the node's border",
                            "enum": [
                              "solid",
                              "dotted",
                              "dashed",
                              "double"
                            ]
                          },
                          "borderColor": {
                            "type": "string",
                            "description": "The colour of the node's border. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "borderOpacity": {
                            "type": "number",
                            "description": "The opacity of the node's border",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "padding": {
                            "type": "number",
                            "description": "The amount of padding around all sides of the node.",
                            "minimum": 0
                          },
                          "textHalign": {
                            "type": "string",
                            "description": "The horizontal alignment of a node's label",
                            "enum": [
                              "left",
                              "center",
                              "right"
                            ]
                          },
                          "textValign": {
                            "type": "string",
                            "description": "The vertical alignment of a node's label",
                            "enum": [
                              "top",
                              "center",
                              "bottom"
                            ]
                          },
                          "ghost": {
                            "type": "string",
                            "description": "Whether to use the ghost effect, a semitransparent duplicate of the element drawn at an offset.",
                            "default": "no",
                            "enum": [
                              "yes",
                              "no"
                            ]
                          },
                          "activeBgColor": {
                            "type": "string",
                            "description": "The colour of the indicator shown when the background is grabbed by the user. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "activeBgOpacity": {
                            "type": "string",
                            "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                            "maxLength": 50
                          },
                          "activeBgSize": {
                            "type": "string",
                            "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                            "maxLength": 50
                          },
                          "selectionBoxColor": {
                            "type": "string",
                            "description": "The background colour of the selection box used for drag selection. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "selectionBoxBorderWidth": {
                            "type": "number",
                            "description": "The size of the border on the selection box. Selector needs to be *core*",
                            "minimum": 0
                          },
                          "selectionBoxOpacity": {
                            "type": "number",
                            "description": "The opacity of the selection box. Selector needs to be *core*",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "outsideTextureBgColor": {
                            "type": "string",
                            "description": "The colour of the area outside the viewport texture when initOptions.textureOnViewport === true. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "outsideTextureBgOpacity": {
                            "type": "number",
                            "description": "The opacity of the area outside the viewport texture. Selector needs to be *core*",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "shapePolygonPoints": {
                            "type": "string",
                            "description": "An array (or a space-separated string) of numbers ranging on [-1, 1], representing alternating x and y values (i.e. x1 y1 x2 y2, x3 y3 ...). This represents the points in the polygon for the node's shape. The bounding box of the node is given by (-1, -1), (1, -1), (1, 1), (-1, 1). The node's position is the origin (0, 0 )",
                            "maxLength": 2000
                          },
                          "menuBackgroundColor": {
                            "type": "string",
                            "description": "The colour of the background of the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "menuBackgroundOpacity": {
                            "type": "number",
                            "description": "The opacity of the background of the component menu.",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "menuForgroundColor": {
                            "type": "string",
                            "description": "The colour of the text or icons in the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          }
                        }
                      }
                    ]
                  },
                  "transitionMap": {
                    "type": "object",
                    "description": "Map describing the connection state machine. Each key is a current connection status and its value is the list of states the connection may transition to from that status.",
                    "additionalProperties": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "additionalProperties": false,
                        "description": "A single permissible state transition for a connection, describing the next reachable state and the meaning of that transition.",
                        "required": [
                          "nextState"
                        ],
                        "properties": {
                          "nextState": {
                            "type": "string",
                            "description": "Connection Status Value",
                            "x-go-name": "ConnectionStatusValue",
                            "enum": [
                              "discovered",
                              "registered",
                              "connected",
                              "ignored",
                              "maintenance",
                              "disconnected",
                              "deleted",
                              "not found"
                            ],
                            "x-order": 1
                          },
                          "description": {
                            "type": "string",
                            "description": "Human-readable explanation of when or why this transition occurs.",
                            "maxLength": 1000,
                            "x-oapi-codegen-extra-tags": {
                              "json": "description,omitempty"
                            },
                            "x-order": 2
                          }
                        }
                      }
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "transitionMap,omitempty"
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Connection definition registered",
            "content": {
              "application/json": {
                "schema": {
                  "description": "A connection definition is an uninitialized connection, authored per-model (in a model's `connections/` folder) and registered into the registry alongside components and relationships. It conforms to the connection schema; the dynamic, kind-specific shape is carried in `metadata`. The `model` association scopes the definition to its owning model.",
                  "x-go-type": "ConnectionDefinition"
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
    "/api/registry/connections/{connectionDefinitionId}": {
      "get": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "ConnectionDefinitions"
        ],
        "operationId": "getConnectionDefinition",
        "summary": "Get connection definition by ID",
        "description": "Returns a specific connection definition by its ID.",
        "parameters": [
          {
            "name": "connectionDefinitionId",
            "in": "path",
            "required": true,
            "description": "Connection definition ID",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Connection definition details",
            "content": {
              "application/json": {
                "schema": {
                  "description": "A connection definition is an uninitialized connection, authored per-model (in a model's `connections/` folder) and registered into the registry alongside components and relationships. It conforms to the connection schema; the dynamic, kind-specific shape is carried in `metadata`. The `model` association scopes the definition to its owning model.",
                  "x-go-type": "ConnectionDefinition"
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
          "cloud",
          "meshery"
        ],
        "tags": [
          "ConnectionDefinitions"
        ],
        "operationId": "updateConnectionDefinition",
        "summary": "Update a connection definition",
        "description": "Update an existing connection definition.",
        "parameters": [
          {
            "name": "connectionDefinitionId",
            "in": "path",
            "required": true,
            "description": "Connection definition ID",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for registering (creating) or updating a connection definition. Contains only client-settable fields; server-generated fields such as createdAt, updatedAt, and deletedAt are excluded.",
                "required": [
                  "name",
                  "kind",
                  "type",
                  "subType",
                  "status"
                ],
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "description": "Existing connection definition ID for updates; omit on create.",
                    "x-go-name": "ID",
                    "x-oapi-codegen-extra-tags": {
                      "json": "id,omitempty"
                    }
                  },
                  "schemaVersion": {
                    "description": "Specifies the version of the schema the definition conforms to.",
                    "default": "connections.meshery.io/v1beta3",
                    "x-oapi-codegen-extra-tags": {
                      "json": "schemaVersion,omitempty"
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
                  "name": {
                    "type": "string",
                    "description": "Connection definition name",
                    "minLength": 1,
                    "maxLength": 255,
                    "x-oapi-codegen-extra-tags": {
                      "json": "name"
                    }
                  },
                  "description": {
                    "type": "string",
                    "description": "Human-readable description of the connection definition and its purpose.",
                    "maxLength": 1000,
                    "x-oapi-codegen-extra-tags": {
                      "json": "description,omitempty"
                    }
                  },
                  "url": {
                    "type": "string",
                    "format": "uri",
                    "description": "URL of the remote resource connections of this kind point to.",
                    "maxLength": 2048,
                    "x-oapi-codegen-extra-tags": {
                      "json": "url,omitempty"
                    }
                  },
                  "kind": {
                    "type": "string",
                    "description": "Connection kind (e.g., kubernetes, prometheus, grafana)",
                    "maxLength": 255,
                    "x-oapi-codegen-extra-tags": {
                      "json": "kind"
                    }
                  },
                  "type": {
                    "type": "string",
                    "description": "Connection type (platform, telemetry, collaboration)",
                    "maxLength": 255,
                    "x-oapi-codegen-extra-tags": {
                      "json": "type"
                    }
                  },
                  "subType": {
                    "type": "string",
                    "description": "Connection sub-type (cloud, identity, metrics, chat, git, orchestration)",
                    "maxLength": 255,
                    "x-oapi-codegen-extra-tags": {
                      "json": "subType"
                    }
                  },
                  "status": {
                    "type": "string",
                    "description": "Connection Status Value",
                    "x-go-name": "ConnectionStatusValue",
                    "enum": [
                      "discovered",
                      "registered",
                      "connected",
                      "ignored",
                      "maintenance",
                      "disconnected",
                      "deleted",
                      "not found"
                    ],
                    "x-oapi-codegen-extra-tags": {
                      "json": "status"
                    }
                  },
                  "modelReference": {
                    "x-go-type": "modelv1beta1.ModelReference",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/v1beta1/model",
                      "name": "modelv1beta1"
                    },
                    "description": "Reference to the registered model that owns this connection definition.",
                    "x-oapi-codegen-extra-tags": {
                      "json": "modelReference,omitempty"
                    },
                    "x-generate-db-helpers": true,
                    "type": "object",
                    "required": [
                      "id",
                      "name",
                      "version",
                      "displayName",
                      "model",
                      "registrant"
                    ],
                    "properties": {
                      "id": {
                        "type": "string",
                        "format": "uuid",
                        "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        }
                      },
                      "name": {
                        "type": "string",
                        "description": "The unique name for the model within the scope of a registrant.",
                        "pattern": "^[a-z0-9-]+$",
                        "examples": [
                          "cert-manager"
                        ]
                      },
                      "version": {
                        "description": "Version of the model definition.",
                        "type": "string",
                        "minLength": 5,
                        "maxLength": 100,
                        "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                      },
                      "displayName": {
                        "type": "string",
                        "description": "Human-readable name for the model.",
                        "minLength": 1,
                        "maxLength": 100,
                        "pattern": "^[a-zA-Z0-9 ]+$",
                        "examples": [
                          "Cert Manager"
                        ]
                      },
                      "model": {
                        "type": "object",
                        "description": "Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31).",
                        "required": [
                          "version"
                        ],
                        "properties": {
                          "version": {
                            "description": "Version of the model as defined by the registrant.",
                            "x-oapi-codegen-extra-tags": {
                              "json": "version"
                            },
                            "x-order": 1,
                            "type": "string",
                            "minLength": 5,
                            "maxLength": 100,
                            "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                          }
                        }
                      },
                      "registrant": {
                        "x-go-type": "RegistrantReference",
                        "x-oapi-codegen-extra-tags": {
                          "json": "registrant"
                        },
                        "type": "object",
                        "required": [
                          "kind"
                        ],
                        "properties": {
                          "kind": {
                            "type": "string",
                            "description": "Kind of the registrant.",
                            "maxLength": 255
                          }
                        }
                      }
                    }
                  },
                  "metadata": {
                    "type": "object",
                    "description": "Kind-specific connection metadata",
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "metadata"
                    }
                  },
                  "credentialSchema": {
                    "type": "object",
                    "description": "Schema for the credential associated with connections of this kind.",
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "credentialSchema"
                    }
                  },
                  "connectionSchema": {
                    "type": "object",
                    "description": "Schema for connections of this kind.",
                    "x-go-type": "core.Map",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core"
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "connectionSchema"
                    }
                  },
                  "styles": {
                    "x-go-type": "core.ComponentStyles",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/core",
                      "name": "core"
                    },
                    "description": "Visualization styles for the connection, including svgColor and svgWhite used for UI representation.",
                    "x-oapi-codegen-extra-tags": {
                      "json": "styles,omitempty"
                    },
                    "type": "object",
                    "required": [
                      "shape",
                      "primaryColor",
                      "svgColor",
                      "svgWhite",
                      "svgComplete"
                    ],
                    "allOf": [
                      {
                        "type": "object",
                        "description": "Common styles for all entities",
                        "additionalProperties": true,
                        "required": [
                          "primaryColor",
                          "svgColor",
                          "svgWhite",
                          "svgComplete"
                        ],
                        "properties": {
                          "primaryColor": {
                            "type": "string",
                            "description": "Primary color of the component used for UI representation.",
                            "maxLength": 500
                          },
                          "secondaryColor": {
                            "type": "string",
                            "description": "Secondary color of the entity used for UI representation.",
                            "maxLength": 500
                          },
                          "svgWhite": {
                            "type": "string",
                            "description": "White SVG of the entity used for UI representation on dark background.",
                            "maxLength": 500
                          },
                          "svgColor": {
                            "type": "string",
                            "description": "Colored SVG of the entity used for UI representation on light background.",
                            "maxLength": 500
                          },
                          "svgComplete": {
                            "type": "string",
                            "description": "Complete SVG of the entity used for UI representation, often inclusive of background.",
                            "maxLength": 500
                          },
                          "color": {
                            "type": "string",
                            "description": "The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 500
                          },
                          "textOpacity": {
                            "type": "number",
                            "description": "The opacity of the label text, including its outline.",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "fontFamily": {
                            "type": "string",
                            "description": "A comma-separated list of font names to use on the label text.",
                            "maxLength": 500
                          },
                          "fontSize": {
                            "type": "string",
                            "description": "The size of the label text.",
                            "maxLength": 500
                          },
                          "fontStyle": {
                            "type": "string",
                            "description": "A CSS font style to be applied to the label text.",
                            "maxLength": 500
                          },
                          "fontWeight": {
                            "type": "string",
                            "description": "A CSS font weight to be applied to the label text.",
                            "maxLength": 500
                          },
                          "textTransform": {
                            "type": "string",
                            "description": "A transformation to apply to the label text",
                            "enum": [
                              "none",
                              "uppercase",
                              "lowercase"
                            ]
                          },
                          "opacity": {
                            "type": "number",
                            "description": "The opacity of the element, ranging from 0 to 1. Note that the opacity of a compound node parent affects the effective opacity of its children.",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "zIndex": {
                            "type": "integer",
                            "description": "An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index.",
                            "minimum": 0
                          },
                          "label": {
                            "type": "string",
                            "description": "The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id",
                            "maxLength": 500
                          },
                          "animation": {
                            "type": "object",
                            "description": "The animation to apply to the element. example ripple,bounce,etc"
                          }
                        }
                      },
                      {
                        "type": "object",
                        "properties": {
                          "shape": {
                            "type": "string",
                            "description": "The shape of the node's body. Note that each shape fits within the specified width and height, and so you may have to adjust width and height if you desire an equilateral shape (i.e. width !== height for several equilateral shapes)",
                            "enum": [
                              "ellipse",
                              "triangle",
                              "round-triangle",
                              "rectangle",
                              "round-rectangle",
                              "bottom-round-rectangle",
                              "cut-rectangle",
                              "barrel",
                              "rhomboid",
                              "diamond",
                              "round-diamond",
                              "pentagon",
                              "round-pentagon",
                              "hexagon",
                              "round-hexagon",
                              "concave-hexagon",
                              "heptagon",
                              "round-heptagon",
                              "octagon",
                              "round-octagon",
                              "star",
                              "tag",
                              "round-tag",
                              "vee",
                              "polygon"
                            ]
                          },
                          "position": {
                            "type": "object",
                            "additionalProperties": false,
                            "required": [
                              "x",
                              "y"
                            ],
                            "description": "The position of the node. If the position is set, the node is drawn at that position in the given dimensions. If the position is not set, the node is drawn at a random position.",
                            "properties": {
                              "x": {
                                "type": "number",
                                "description": "The x-coordinate of the node.",
                                "minimum": -1000000,
                                "maximum": 1000000,
                                "x-go-type": "float64"
                              },
                              "y": {
                                "type": "number",
                                "description": "The y-coordinate of the node.",
                                "minimum": -1000000,
                                "maximum": 1000000,
                                "x-go-type": "float64"
                              }
                            }
                          },
                          "bodyText": {
                            "type": "string",
                            "description": "The text to display for an element's body. Can give a path, e.g. data(id) will label with the elements id",
                            "maxLength": 500
                          },
                          "bodyTextWrap": {
                            "type": "string",
                            "description": "How to wrap the text in the node. Can be 'none', 'wrap', or 'ellipsis'.",
                            "enum": [
                              "none",
                              "wrap",
                              "ellipsis"
                            ]
                          },
                          "bodyTextMaxWidth": {
                            "type": "string",
                            "description": "The maximum width for wrapping text in the node.",
                            "maxLength": 50
                          },
                          "bodyTextOpacity": {
                            "type": "number",
                            "description": "The opacity of the node's body text, including its outline.",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "bodyTextBackgroundColor": {
                            "type": "string",
                            "description": "The colour of the node's body text background. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "bodyTextFontSize": {
                            "type": "number",
                            "description": "The size of the node's body text.",
                            "minimum": 0
                          },
                          "bodyTextColor": {
                            "type": "string",
                            "description": "The colour of the node's body text. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "bodyTextFontWeight": {
                            "type": "string",
                            "description": "A CSS font weight to be applied to the node's body text.",
                            "maxLength": 50
                          },
                          "bodyTextHorizontalAlign": {
                            "type": "string",
                            "description": "A CSS horizontal alignment to be applied to the node's body text.",
                            "maxLength": 50
                          },
                          "bodyTextDecoration": {
                            "type": "string",
                            "description": "A CSS text decoration to be applied to the node's body text.",
                            "maxLength": 100
                          },
                          "bodyTextVerticalAlign": {
                            "type": "string",
                            "description": "A CSS vertical alignment to be applied to the node's body text.",
                            "maxLength": 50
                          },
                          "width": {
                            "type": "number",
                            "description": "The width of the node's body or the width of an edge's line.",
                            "minimum": 0
                          },
                          "height": {
                            "type": "number",
                            "description": "The height of the node's body",
                            "minimum": 0
                          },
                          "backgroundImage": {
                            "type": "string",
                            "format": "uri",
                            "description": "The URL that points to the image to show in the node.",
                            "maxLength": 2048
                          },
                          "backgroundColor": {
                            "type": "string",
                            "description": "The colour of the node's body. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "backgroundBlacken": {
                            "type": "number",
                            "description": "Blackens the node's body for values from 0 to 1; whitens the node's body for values from 0 to -1.",
                            "maximum": 1,
                            "minimum": -1
                          },
                          "backgroundOpacity": {
                            "type": "number",
                            "description": "The opacity level of the node's background colour",
                            "maximum": 1,
                            "minimum": 0
                          },
                          "backgroundPositionX": {
                            "type": "string",
                            "description": "The x position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                            "maxLength": 50
                          },
                          "backgroundPositionY": {
                            "type": "string",
                            "description": "The y position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                            "maxLength": 50
                          },
                          "backgroundOffsetX": {
                            "type": "string",
                            "description": "The x offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                            "maxLength": 50
                          },
                          "backgroundOffsetY": {
                            "type": "string",
                            "description": "The y offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                            "maxLength": 50
                          },
                          "backgroundFit": {
                            "type": "string",
                            "description": "How the background image is fit to the node. Can be 'none', 'contain', or 'cover'.",
                            "enum": [
                              "none",
                              "contain",
                              "cover"
                            ]
                          },
                          "backgroundClip": {
                            "type": "string",
                            "description": "How the background image is clipped to the node. Can be 'none', 'node', or 'node-border'.",
                            "enum": [
                              "none",
                              "node",
                              "node-border"
                            ]
                          },
                          "backgroundWidthRelativeTo": {
                            "type": "string",
                            "description": "How the background image's width is determined. Can be 'none', 'inner', or 'outer'.",
                            "enum": [
                              "none",
                              "inner",
                              "outer"
                            ]
                          },
                          "backgroundHeightRelativeTo": {
                            "type": "string",
                            "description": "How the background image's height is determined. Can be 'none', 'inner', or 'outer'.",
                            "enum": [
                              "none",
                              "inner",
                              "outer"
                            ]
                          },
                          "borderWidth": {
                            "type": "number",
                            "description": "The size of the node's border.",
                            "minimum": 0
                          },
                          "borderStyle": {
                            "type": "string",
                            "description": "The style of the node's border",
                            "enum": [
                              "solid",
                              "dotted",
                              "dashed",
                              "double"
                            ]
                          },
                          "borderColor": {
                            "type": "string",
                            "description": "The colour of the node's border. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "borderOpacity": {
                            "type": "number",
                            "description": "The opacity of the node's border",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "padding": {
                            "type": "number",
                            "description": "The amount of padding around all sides of the node.",
                            "minimum": 0
                          },
                          "textHalign": {
                            "type": "string",
                            "description": "The horizontal alignment of a node's label",
                            "enum": [
                              "left",
                              "center",
                              "right"
                            ]
                          },
                          "textValign": {
                            "type": "string",
                            "description": "The vertical alignment of a node's label",
                            "enum": [
                              "top",
                              "center",
                              "bottom"
                            ]
                          },
                          "ghost": {
                            "type": "string",
                            "description": "Whether to use the ghost effect, a semitransparent duplicate of the element drawn at an offset.",
                            "default": "no",
                            "enum": [
                              "yes",
                              "no"
                            ]
                          },
                          "activeBgColor": {
                            "type": "string",
                            "description": "The colour of the indicator shown when the background is grabbed by the user. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "activeBgOpacity": {
                            "type": "string",
                            "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                            "maxLength": 50
                          },
                          "activeBgSize": {
                            "type": "string",
                            "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                            "maxLength": 50
                          },
                          "selectionBoxColor": {
                            "type": "string",
                            "description": "The background colour of the selection box used for drag selection. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "selectionBoxBorderWidth": {
                            "type": "number",
                            "description": "The size of the border on the selection box. Selector needs to be *core*",
                            "minimum": 0
                          },
                          "selectionBoxOpacity": {
                            "type": "number",
                            "description": "The opacity of the selection box. Selector needs to be *core*",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "outsideTextureBgColor": {
                            "type": "string",
                            "description": "The colour of the area outside the viewport texture when initOptions.textureOnViewport === true. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "outsideTextureBgOpacity": {
                            "type": "number",
                            "description": "The opacity of the area outside the viewport texture. Selector needs to be *core*",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "shapePolygonPoints": {
                            "type": "string",
                            "description": "An array (or a space-separated string) of numbers ranging on [-1, 1], representing alternating x and y values (i.e. x1 y1 x2 y2, x3 y3 ...). This represents the points in the polygon for the node's shape. The bounding box of the node is given by (-1, -1), (1, -1), (1, 1), (-1, 1). The node's position is the origin (0, 0 )",
                            "maxLength": 2000
                          },
                          "menuBackgroundColor": {
                            "type": "string",
                            "description": "The colour of the background of the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          },
                          "menuBackgroundOpacity": {
                            "type": "number",
                            "description": "The opacity of the background of the component menu.",
                            "minimum": 0,
                            "maximum": 1
                          },
                          "menuForgroundColor": {
                            "type": "string",
                            "description": "The colour of the text or icons in the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                            "maxLength": 100
                          }
                        }
                      }
                    ]
                  },
                  "transitionMap": {
                    "type": "object",
                    "description": "Map describing the connection state machine. Each key is a current connection status and its value is the list of states the connection may transition to from that status.",
                    "additionalProperties": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "additionalProperties": false,
                        "description": "A single permissible state transition for a connection, describing the next reachable state and the meaning of that transition.",
                        "required": [
                          "nextState"
                        ],
                        "properties": {
                          "nextState": {
                            "type": "string",
                            "description": "Connection Status Value",
                            "x-go-name": "ConnectionStatusValue",
                            "enum": [
                              "discovered",
                              "registered",
                              "connected",
                              "ignored",
                              "maintenance",
                              "disconnected",
                              "deleted",
                              "not found"
                            ],
                            "x-order": 1
                          },
                          "description": {
                            "type": "string",
                            "description": "Human-readable explanation of when or why this transition occurs.",
                            "maxLength": 1000,
                            "x-oapi-codegen-extra-tags": {
                              "json": "description,omitempty"
                            },
                            "x-order": 2
                          }
                        }
                      }
                    },
                    "x-go-type-skip-optional-pointer": true,
                    "x-oapi-codegen-extra-tags": {
                      "json": "transitionMap,omitempty"
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Connection definition updated",
            "content": {
              "application/json": {
                "schema": {
                  "description": "A connection definition is an uninitialized connection, authored per-model (in a model's `connections/` folder) and registered into the registry alongside components and relationships. It conforms to the connection schema; the dynamic, kind-specific shape is carried in `metadata`. The `model` association scopes the definition to its owning model.",
                  "x-go-type": "ConnectionDefinition"
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
      "delete": {
        "x-internal": [
          "cloud",
          "meshery"
        ],
        "tags": [
          "ConnectionDefinitions"
        ],
        "operationId": "deleteConnectionDefinition",
        "summary": "Delete a connection definition",
        "description": "Delete a specific connection definition from the registry.",
        "parameters": [
          {
            "name": "connectionDefinitionId",
            "in": "path",
            "required": true,
            "description": "Connection definition ID",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Connection definition deleted"
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
    "securitySchemes": {
      "jwt": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    },
    "parameters": {
      "connectionId": {
        "name": "connectionId",
        "in": "path",
        "required": true,
        "description": "Connection ID",
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      },
      "connectionDefinitionId": {
        "name": "connectionDefinitionId",
        "in": "path",
        "required": true,
        "description": "Connection definition ID",
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      },
      "connectionKind": {
        "name": "connectionKind",
        "in": "path",
        "required": true,
        "description": "Connection kind (meshery, kubernetes, prometheus, grafana, etc.)",
        "schema": {
          "type": "string",
          "maxLength": 255
        }
      },
      "environmentId": {
        "name": "environmentId",
        "in": "path",
        "required": true,
        "description": "Environment ID",
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      },
      "mesheryServerId": {
        "name": "mesheryServerId",
        "in": "path",
        "required": true,
        "description": "Meshery server ID",
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      },
      "page": {
        "name": "page",
        "in": "query",
        "description": "Page number",
        "required": false,
        "schema": {
          "type": "integer",
          "minimum": 0,
          "default": 0
        }
      },
      "pageSize": {
        "name": "pageSize",
        "in": "query",
        "description": "Number of items per page",
        "required": false,
        "schema": {
          "type": "integer",
          "minimum": 1,
          "default": 10
        }
      },
      "search": {
        "name": "search",
        "in": "query",
        "description": "Search term",
        "required": false,
        "schema": {
          "type": "string",
          "maxLength": 500
        }
      },
      "order": {
        "name": "order",
        "in": "query",
        "description": "Sort order",
        "required": false,
        "schema": {
          "type": "string",
          "maxLength": 500
        }
      },
      "orgIdQuery": {
        "name": "orgId",
        "in": "query",
        "description": "Organization ID to scope the request.",
        "required": false,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    },
    "schemas": {
      "Connection": {
        "$id": "https://schemas.meshery.io/connection.yaml",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "description": "Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections",
        "additionalProperties": false,
        "type": "object",
        "required": [
          "id",
          "schemaVersion",
          "name",
          "type",
          "subType",
          "kind",
          "status"
        ],
        "properties": {
          "id": {
            "description": "Connection ID",
            "x-order": 1,
            "x-go-name": "ID",
            "x-oapi-codegen-extra-tags": {
              "db": "id"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "name": {
            "x-oapi-codegen-extra-tags": {
              "db": "name"
            },
            "x-order": 2,
            "type": "string",
            "description": "Connection Name",
            "minLength": 1,
            "maxLength": 255
          },
          "description": {
            "x-oapi-codegen-extra-tags": {
              "db": "description",
              "json": "description"
            },
            "x-order": 3,
            "type": "string",
            "description": "Human-readable description of the connection and its purpose.",
            "maxLength": 1000
          },
          "url": {
            "x-oapi-codegen-extra-tags": {
              "db": "url",
              "json": "url"
            },
            "x-order": 4,
            "type": "string",
            "format": "uri",
            "description": "URL of the remote resource this connection points to (e.g. the Helm repository URL, the Kubernetes API server endpoint, the Grafana instance URL).",
            "maxLength": 2048
          },
          "credentialId": {
            "x-go-name": "CredentialID",
            "x-oapi-codegen-extra-tags": {
              "db": "credential_id",
              "json": "credentialId"
            },
            "x-order": 5,
            "description": "Associated Credential ID",
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "type": {
            "x-oapi-codegen-extra-tags": {
              "db": "type",
              "json": "type",
              "yaml": "type"
            },
            "x-go-name": "ConnectionType",
            "x-order": 6,
            "type": "string",
            "description": "Connection Type (platform, telemetry, collaboration)",
            "maxLength": 255
          },
          "subType": {
            "x-oapi-codegen-extra-tags": {
              "db": "sub_type",
              "json": "subType"
            },
            "x-order": 7,
            "type": "string",
            "description": "Connection Subtype (cloud, identity, metrics, chat, git, orchestration)",
            "maxLength": 255
          },
          "kind": {
            "x-oapi-codegen-extra-tags": {
              "db": "kind"
            },
            "x-order": 8,
            "type": "string",
            "description": "Connection Kind (meshery, kubernetes, prometheus, grafana, gke, aws, azure, slack, github)",
            "maxLength": 255
          },
          "modelReference": {
            "x-go-type": "modelv1beta1.ModelReference",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/v1beta1/model",
              "name": "modelv1beta1"
            },
            "x-order": 8,
            "description": "Reference to the specific registered model to which the component belongs and from which model version, category, and other properties may be referenced. Learn more at https://docs.meshery.io/concepts/models",
            "x-oapi-codegen-extra-tags": {
              "gorm": "model_reference",
              "db": "model_reference",
              "json": "modelReference",
              "yaml": "modelReference"
            },
            "x-generate-db-helpers": true,
            "type": "object",
            "required": [
              "id",
              "name",
              "version",
              "displayName",
              "model",
              "registrant"
            ],
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                }
              },
              "name": {
                "type": "string",
                "description": "The unique name for the model within the scope of a registrant.",
                "pattern": "^[a-z0-9-]+$",
                "examples": [
                  "cert-manager"
                ]
              },
              "version": {
                "description": "Version of the model definition.",
                "type": "string",
                "minLength": 5,
                "maxLength": 100,
                "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
              },
              "displayName": {
                "type": "string",
                "description": "Human-readable name for the model.",
                "minLength": 1,
                "maxLength": 100,
                "pattern": "^[a-zA-Z0-9 ]+$",
                "examples": [
                  "Cert Manager"
                ]
              },
              "model": {
                "type": "object",
                "description": "Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31).",
                "required": [
                  "version"
                ],
                "properties": {
                  "version": {
                    "description": "Version of the model as defined by the registrant.",
                    "x-oapi-codegen-extra-tags": {
                      "json": "version"
                    },
                    "x-order": 1,
                    "type": "string",
                    "minLength": 5,
                    "maxLength": 100,
                    "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                  }
                }
              },
              "registrant": {
                "x-go-type": "RegistrantReference",
                "x-oapi-codegen-extra-tags": {
                  "json": "registrant"
                },
                "type": "object",
                "required": [
                  "kind"
                ],
                "properties": {
                  "kind": {
                    "type": "string",
                    "description": "Kind of the registrant.",
                    "maxLength": 255
                  }
                }
              }
            }
          },
          "metadata": {
            "x-oapi-codegen-extra-tags": {
              "db": "metadata"
            },
            "x-order": 9,
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core"
            },
            "x-go-type-skip-optional-pointer": true,
            "type": "object",
            "description": "Additional connection metadata"
          },
          "credentialSchema": {
            "x-oapi-codegen-extra-tags": {
              "db": "credential_schema"
            },
            "x-order": 9,
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core"
            },
            "x-go-type-skip-optional-pointer": true,
            "type": "object",
            "description": "Schema for the credential Associated with the connection"
          },
          "connectionSchema": {
            "x-oapi-codegen-extra-tags": {
              "db": "connection_schema"
            },
            "x-order": 9,
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core"
            },
            "x-go-type-skip-optional-pointer": true,
            "type": "object",
            "description": "Schema for the connection"
          },
          "styles": {
            "x-oapi-codegen-extra-tags": {
              "gorm": "type:bytes;serializer:json",
              "db": "-",
              "yaml": "styles",
              "json": "styles"
            },
            "x-go-type": "core.ComponentStyles",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-order": 17,
            "description": "Visualization styles for the connection, including svgColor and svgWhite used for UI representation.",
            "type": "object",
            "required": [
              "shape",
              "primaryColor",
              "svgColor",
              "svgWhite",
              "svgComplete"
            ],
            "allOf": [
              {
                "type": "object",
                "description": "Common styles for all entities",
                "additionalProperties": true,
                "required": [
                  "primaryColor",
                  "svgColor",
                  "svgWhite",
                  "svgComplete"
                ],
                "properties": {
                  "primaryColor": {
                    "type": "string",
                    "description": "Primary color of the component used for UI representation.",
                    "maxLength": 500
                  },
                  "secondaryColor": {
                    "type": "string",
                    "description": "Secondary color of the entity used for UI representation.",
                    "maxLength": 500
                  },
                  "svgWhite": {
                    "type": "string",
                    "description": "White SVG of the entity used for UI representation on dark background.",
                    "maxLength": 500
                  },
                  "svgColor": {
                    "type": "string",
                    "description": "Colored SVG of the entity used for UI representation on light background.",
                    "maxLength": 500
                  },
                  "svgComplete": {
                    "type": "string",
                    "description": "Complete SVG of the entity used for UI representation, often inclusive of background.",
                    "maxLength": 500
                  },
                  "color": {
                    "type": "string",
                    "description": "The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 500
                  },
                  "textOpacity": {
                    "type": "number",
                    "description": "The opacity of the label text, including its outline.",
                    "minimum": 0,
                    "maximum": 1
                  },
                  "fontFamily": {
                    "type": "string",
                    "description": "A comma-separated list of font names to use on the label text.",
                    "maxLength": 500
                  },
                  "fontSize": {
                    "type": "string",
                    "description": "The size of the label text.",
                    "maxLength": 500
                  },
                  "fontStyle": {
                    "type": "string",
                    "description": "A CSS font style to be applied to the label text.",
                    "maxLength": 500
                  },
                  "fontWeight": {
                    "type": "string",
                    "description": "A CSS font weight to be applied to the label text.",
                    "maxLength": 500
                  },
                  "textTransform": {
                    "type": "string",
                    "description": "A transformation to apply to the label text",
                    "enum": [
                      "none",
                      "uppercase",
                      "lowercase"
                    ]
                  },
                  "opacity": {
                    "type": "number",
                    "description": "The opacity of the element, ranging from 0 to 1. Note that the opacity of a compound node parent affects the effective opacity of its children.",
                    "minimum": 0,
                    "maximum": 1
                  },
                  "zIndex": {
                    "type": "integer",
                    "description": "An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index.",
                    "minimum": 0
                  },
                  "label": {
                    "type": "string",
                    "description": "The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id",
                    "maxLength": 500
                  },
                  "animation": {
                    "type": "object",
                    "description": "The animation to apply to the element. example ripple,bounce,etc"
                  }
                }
              },
              {
                "type": "object",
                "properties": {
                  "shape": {
                    "type": "string",
                    "description": "The shape of the node's body. Note that each shape fits within the specified width and height, and so you may have to adjust width and height if you desire an equilateral shape (i.e. width !== height for several equilateral shapes)",
                    "enum": [
                      "ellipse",
                      "triangle",
                      "round-triangle",
                      "rectangle",
                      "round-rectangle",
                      "bottom-round-rectangle",
                      "cut-rectangle",
                      "barrel",
                      "rhomboid",
                      "diamond",
                      "round-diamond",
                      "pentagon",
                      "round-pentagon",
                      "hexagon",
                      "round-hexagon",
                      "concave-hexagon",
                      "heptagon",
                      "round-heptagon",
                      "octagon",
                      "round-octagon",
                      "star",
                      "tag",
                      "round-tag",
                      "vee",
                      "polygon"
                    ]
                  },
                  "position": {
                    "type": "object",
                    "additionalProperties": false,
                    "required": [
                      "x",
                      "y"
                    ],
                    "description": "The position of the node. If the position is set, the node is drawn at that position in the given dimensions. If the position is not set, the node is drawn at a random position.",
                    "properties": {
                      "x": {
                        "type": "number",
                        "description": "The x-coordinate of the node.",
                        "minimum": -1000000,
                        "maximum": 1000000,
                        "x-go-type": "float64"
                      },
                      "y": {
                        "type": "number",
                        "description": "The y-coordinate of the node.",
                        "minimum": -1000000,
                        "maximum": 1000000,
                        "x-go-type": "float64"
                      }
                    }
                  },
                  "bodyText": {
                    "type": "string",
                    "description": "The text to display for an element's body. Can give a path, e.g. data(id) will label with the elements id",
                    "maxLength": 500
                  },
                  "bodyTextWrap": {
                    "type": "string",
                    "description": "How to wrap the text in the node. Can be 'none', 'wrap', or 'ellipsis'.",
                    "enum": [
                      "none",
                      "wrap",
                      "ellipsis"
                    ]
                  },
                  "bodyTextMaxWidth": {
                    "type": "string",
                    "description": "The maximum width for wrapping text in the node.",
                    "maxLength": 50
                  },
                  "bodyTextOpacity": {
                    "type": "number",
                    "description": "The opacity of the node's body text, including its outline.",
                    "minimum": 0,
                    "maximum": 1
                  },
                  "bodyTextBackgroundColor": {
                    "type": "string",
                    "description": "The colour of the node's body text background. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "bodyTextFontSize": {
                    "type": "number",
                    "description": "The size of the node's body text.",
                    "minimum": 0
                  },
                  "bodyTextColor": {
                    "type": "string",
                    "description": "The colour of the node's body text. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "bodyTextFontWeight": {
                    "type": "string",
                    "description": "A CSS font weight to be applied to the node's body text.",
                    "maxLength": 50
                  },
                  "bodyTextHorizontalAlign": {
                    "type": "string",
                    "description": "A CSS horizontal alignment to be applied to the node's body text.",
                    "maxLength": 50
                  },
                  "bodyTextDecoration": {
                    "type": "string",
                    "description": "A CSS text decoration to be applied to the node's body text.",
                    "maxLength": 100
                  },
                  "bodyTextVerticalAlign": {
                    "type": "string",
                    "description": "A CSS vertical alignment to be applied to the node's body text.",
                    "maxLength": 50
                  },
                  "width": {
                    "type": "number",
                    "description": "The width of the node's body or the width of an edge's line.",
                    "minimum": 0
                  },
                  "height": {
                    "type": "number",
                    "description": "The height of the node's body",
                    "minimum": 0
                  },
                  "backgroundImage": {
                    "type": "string",
                    "format": "uri",
                    "description": "The URL that points to the image to show in the node.",
                    "maxLength": 2048
                  },
                  "backgroundColor": {
                    "type": "string",
                    "description": "The colour of the node's body. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "backgroundBlacken": {
                    "type": "number",
                    "description": "Blackens the node's body for values from 0 to 1; whitens the node's body for values from 0 to -1.",
                    "maximum": 1,
                    "minimum": -1
                  },
                  "backgroundOpacity": {
                    "type": "number",
                    "description": "The opacity level of the node's background colour",
                    "maximum": 1,
                    "minimum": 0
                  },
                  "backgroundPositionX": {
                    "type": "string",
                    "description": "The x position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                    "maxLength": 50
                  },
                  "backgroundPositionY": {
                    "type": "string",
                    "description": "The y position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                    "maxLength": 50
                  },
                  "backgroundOffsetX": {
                    "type": "string",
                    "description": "The x offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                    "maxLength": 50
                  },
                  "backgroundOffsetY": {
                    "type": "string",
                    "description": "The y offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                    "maxLength": 50
                  },
                  "backgroundFit": {
                    "type": "string",
                    "description": "How the background image is fit to the node. Can be 'none', 'contain', or 'cover'.",
                    "enum": [
                      "none",
                      "contain",
                      "cover"
                    ]
                  },
                  "backgroundClip": {
                    "type": "string",
                    "description": "How the background image is clipped to the node. Can be 'none', 'node', or 'node-border'.",
                    "enum": [
                      "none",
                      "node",
                      "node-border"
                    ]
                  },
                  "backgroundWidthRelativeTo": {
                    "type": "string",
                    "description": "How the background image's width is determined. Can be 'none', 'inner', or 'outer'.",
                    "enum": [
                      "none",
                      "inner",
                      "outer"
                    ]
                  },
                  "backgroundHeightRelativeTo": {
                    "type": "string",
                    "description": "How the background image's height is determined. Can be 'none', 'inner', or 'outer'.",
                    "enum": [
                      "none",
                      "inner",
                      "outer"
                    ]
                  },
                  "borderWidth": {
                    "type": "number",
                    "description": "The size of the node's border.",
                    "minimum": 0
                  },
                  "borderStyle": {
                    "type": "string",
                    "description": "The style of the node's border",
                    "enum": [
                      "solid",
                      "dotted",
                      "dashed",
                      "double"
                    ]
                  },
                  "borderColor": {
                    "type": "string",
                    "description": "The colour of the node's border. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "borderOpacity": {
                    "type": "number",
                    "description": "The opacity of the node's border",
                    "minimum": 0,
                    "maximum": 1
                  },
                  "padding": {
                    "type": "number",
                    "description": "The amount of padding around all sides of the node.",
                    "minimum": 0
                  },
                  "textHalign": {
                    "type": "string",
                    "description": "The horizontal alignment of a node's label",
                    "enum": [
                      "left",
                      "center",
                      "right"
                    ]
                  },
                  "textValign": {
                    "type": "string",
                    "description": "The vertical alignment of a node's label",
                    "enum": [
                      "top",
                      "center",
                      "bottom"
                    ]
                  },
                  "ghost": {
                    "type": "string",
                    "description": "Whether to use the ghost effect, a semitransparent duplicate of the element drawn at an offset.",
                    "default": "no",
                    "enum": [
                      "yes",
                      "no"
                    ]
                  },
                  "activeBgColor": {
                    "type": "string",
                    "description": "The colour of the indicator shown when the background is grabbed by the user. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "activeBgOpacity": {
                    "type": "string",
                    "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                    "maxLength": 50
                  },
                  "activeBgSize": {
                    "type": "string",
                    "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                    "maxLength": 50
                  },
                  "selectionBoxColor": {
                    "type": "string",
                    "description": "The background colour of the selection box used for drag selection. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "selectionBoxBorderWidth": {
                    "type": "number",
                    "description": "The size of the border on the selection box. Selector needs to be *core*",
                    "minimum": 0
                  },
                  "selectionBoxOpacity": {
                    "type": "number",
                    "description": "The opacity of the selection box. Selector needs to be *core*",
                    "minimum": 0,
                    "maximum": 1
                  },
                  "outsideTextureBgColor": {
                    "type": "string",
                    "description": "The colour of the area outside the viewport texture when initOptions.textureOnViewport === true. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "outsideTextureBgOpacity": {
                    "type": "number",
                    "description": "The opacity of the area outside the viewport texture. Selector needs to be *core*",
                    "minimum": 0,
                    "maximum": 1
                  },
                  "shapePolygonPoints": {
                    "type": "string",
                    "description": "An array (or a space-separated string) of numbers ranging on [-1, 1], representing alternating x and y values (i.e. x1 y1 x2 y2, x3 y3 ...). This represents the points in the polygon for the node's shape. The bounding box of the node is given by (-1, -1), (1, -1), (1, 1), (-1, 1). The node's position is the origin (0, 0 )",
                    "maxLength": 2000
                  },
                  "menuBackgroundColor": {
                    "type": "string",
                    "description": "The colour of the background of the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "menuBackgroundOpacity": {
                    "type": "number",
                    "description": "The opacity of the background of the component menu.",
                    "minimum": 0,
                    "maximum": 1
                  },
                  "menuForgroundColor": {
                    "type": "string",
                    "description": "The colour of the text or icons in the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  }
                }
              }
            ]
          },
          "status": {
            "x-oapi-codegen-extra-tags": {
              "db": "status"
            },
            "x-order": 10,
            "description": "Connection Status",
            "type": "string",
            "enum": [
              "discovered",
              "registered",
              "connected",
              "ignored",
              "maintenance",
              "disconnected",
              "deleted",
              "not found"
            ]
          },
          "transitionMap": {
            "type": "object",
            "description": "Map describing the connection state machine. Each key is a current connection status and its value is the list of states the connection may transition to from that status, along with a description of each transition.",
            "additionalProperties": {
              "type": "array",
              "items": {
                "type": "object",
                "additionalProperties": false,
                "description": "A single permissible state transition for a connection, describing the next reachable state and the meaning of that transition.",
                "required": [
                  "nextState"
                ],
                "properties": {
                  "nextState": {
                    "type": "string",
                    "description": "Connection Status Value",
                    "x-go-name": "ConnectionStatusValue",
                    "enum": [
                      "discovered",
                      "registered",
                      "connected",
                      "ignored",
                      "maintenance",
                      "disconnected",
                      "deleted",
                      "not found"
                    ],
                    "x-order": 1
                  },
                  "description": {
                    "type": "string",
                    "description": "Human-readable explanation of when or why this transition occurs.",
                    "maxLength": 1000,
                    "x-oapi-codegen-extra-tags": {
                      "json": "description,omitempty"
                    },
                    "x-order": 2
                  }
                }
              }
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "gorm": "type:bytes;serializer:json",
              "db": "-",
              "json": "transitionMap,omitempty"
            },
            "x-order": 18
          },
          "owner": {
            "x-go-name": "Owner",
            "x-oapi-codegen-extra-tags": {
              "db": "owner",
              "json": "owner"
            },
            "x-order": 11,
            "description": "User ID who owns this connection",
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "createdAt": {
            "description": "Timestamp when the connection was created.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at",
              "json": "createdAt"
            },
            "x-order": 12,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp when the connection was last updated.",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at",
              "json": "updatedAt"
            },
            "x-order": 13,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deletedAt": {
            "description": "Timestamp when the connection was soft-deleted, if applicable.",
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at",
              "json": "deletedAt"
            },
            "x-order": 14,
            "x-go-type": "meshcore.NullTime",
            "x-go-type-import": {
              "name": "meshcore",
              "path": "github.com/meshery/schemas/models/core"
            },
            "type": "string",
            "format": "date-time",
            "nullable": true,
            "x-go-type-skip-optional-pointer": true
          },
          "environments": {
            "type": "array",
            "description": "Associated environments for this connection",
            "items": {
              "x-go-type": "*environmentv1beta3.Environment",
              "x-go-type-import": {
                "path": "github.com/meshery/schemas/models/v1beta3/environment",
                "name": "environmentv1beta3"
              },
              "$id": "https://schemas.meshery.io/environment.yaml",
              "$schema": "http://json-schema.org/draft-07/schema#",
              "title": "Environment",
              "description": "Environments allow you to logically group related Connections and their associated Credentials. Learn more at https://docs.meshery.io/concepts/logical/environments",
              "additionalProperties": false,
              "type": "object",
              "example": {
                "id": "00000000-0000-0000-0000-000000000000",
                "schemaVersion": "environments.meshery.io/v1beta3",
                "name": "Production Environment",
                "description": "Connections and credentials for the production cluster.",
                "organizationId": "00000000-0000-0000-0000-000000000000",
                "owner": "00000000-0000-0000-0000-000000000000",
                "createdAt": "0001-01-01T00:00:00Z",
                "metadata": {},
                "updatedAt": "0001-01-01T00:00:00Z",
                "deletedAt": null
              },
              "required": [
                "id",
                "schemaVersion",
                "name",
                "description",
                "organizationId"
              ],
              "properties": {
                "id": {
                  "description": "ID",
                  "x-order": 1,
                  "x-go-name": "ID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "id",
                    "json": "id"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "schemaVersion": {
                  "description": "Specifies the version of the schema to which the environment conforms.",
                  "x-order": 2,
                  "x-oapi-codegen-extra-tags": {
                    "json": "schemaVersion",
                    "db": "-",
                    "gorm": "-"
                  },
                  "default": "environments.meshery.io/v1beta3",
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
                "name": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "name",
                    "json": "name"
                  },
                  "x-order": 3,
                  "type": "string",
                  "maxLength": 100,
                  "description": "Environment name"
                },
                "description": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "description",
                    "json": "description"
                  },
                  "x-order": 4,
                  "type": "string",
                  "maxLength": 1000,
                  "description": "Environment description"
                },
                "organizationId": {
                  "x-go-name": "OrganizationID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "organization_id",
                    "json": "organizationId"
                  },
                  "x-order": 5,
                  "description": "Environment organization ID",
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "owner": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "owner",
                    "json": "owner"
                  },
                  "x-order": 6,
                  "description": "Environment owner",
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "createdAt": {
                  "description": "Timestamp when the environment was created.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at",
                    "yaml": "created_at",
                    "json": "createdAt"
                  },
                  "x-order": 7,
                  "x-go-type": "time.Time",
                  "type": "string",
                  "format": "date-time",
                  "x-go-name": "CreatedAt",
                  "x-go-type-skip-optional-pointer": true
                },
                "metadata": {
                  "description": "Additional metadata associated with the environment.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "metadata",
                    "json": "metadata"
                  },
                  "x-order": 8,
                  "x-go-type": "core.Map",
                  "x-go-type-skip-optional-pointer": true,
                  "type": "object"
                },
                "updatedAt": {
                  "description": "Timestamp when the environment was last updated.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at",
                    "yaml": "updated_at",
                    "json": "updatedAt"
                  },
                  "x-order": 9,
                  "x-go-type": "time.Time",
                  "type": "string",
                  "format": "date-time",
                  "x-go-name": "UpdatedAt",
                  "x-go-type-skip-optional-pointer": true
                },
                "deletedAt": {
                  "description": "Timestamp when the environment was soft deleted. Null while the environment remains active.",
                  "nullable": true,
                  "x-oapi-codegen-extra-tags": {
                    "db": "deleted_at",
                    "json": "deletedAt"
                  },
                  "x-go-type": "core.NullTime",
                  "x-go-import": "database/sql",
                  "x-order": 10,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                }
              }
            },
            "x-oapi-codegen-extra-tags": {
              "db": "-",
              "gorm": "-"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-order": 15
          },
          "schemaVersion": {
            "description": "Specifies the version of the schema used for the definition.",
            "x-order": 16,
            "x-oapi-codegen-extra-tags": {
              "db": "-",
              "gorm": "-"
            },
            "default": "connections.meshery.io/v1beta3",
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
          }
        }
      },
      "CoreKind": {
        "type": "string",
        "description": "A core connection kind that receives bespoke, kind-specific handling in Meshery. The `kind` field itself remains an open-ended string; this names only the kinds with special behavior.",
        "x-go-name": "CoreKind",
        "x-ts-const": "CoreConnectionKinds",
        "x-ts-type": "CoreConnectionKind",
        "enum": [
          "meshery",
          "kubernetes",
          "prometheus",
          "grafana",
          "github"
        ],
        "x-enum-varnames": [
          "CoreKindMeshery",
          "CoreKindKubernetes",
          "CoreKindPrometheus",
          "CoreKindGrafana",
          "CoreKindGithub"
        ]
      },
      "ConnectionDefinition": {
        "description": "A connection definition is an uninitialized connection, authored per-model (in a model's `connections/` folder) and registered into the registry alongside components and relationships. It conforms to the connection schema; the dynamic, kind-specific shape is carried in `metadata`. The `model` association scopes the definition to its owning model.",
        "x-go-type": "ConnectionDefinition"
      },
      "ConnectionDefinitionPage": {
        "description": "Represents a page of connection definitions with meta information about the total count",
        "additionalProperties": false,
        "type": "object",
        "required": [
          "connectionDefinitions",
          "totalCount",
          "page",
          "pageSize"
        ],
        "properties": {
          "connectionDefinitions": {
            "type": "array",
            "description": "List of connection definitions on this page",
            "x-go-type": "[]*ConnectionDefinition",
            "items": {
              "description": "A connection definition is an uninitialized connection, authored per-model (in a model's `connections/` folder) and registered into the registry alongside components and relationships. It conforms to the connection schema; the dynamic, kind-specific shape is carried in `metadata`. The `model` association scopes the definition to its owning model.",
              "x-go-type": "ConnectionDefinition"
            },
            "x-order": 1
          },
          "totalCount": {
            "type": "integer",
            "description": "Total number of connection definitions on all pages",
            "x-oapi-codegen-extra-tags": {
              "json": "totalCount"
            },
            "x-order": 2,
            "minimum": 0
          },
          "page": {
            "type": "integer",
            "description": "Current page number",
            "x-order": 3,
            "minimum": 0
          },
          "pageSize": {
            "type": "integer",
            "description": "Number of elements per page",
            "x-oapi-codegen-extra-tags": {
              "json": "pageSize"
            },
            "x-order": 4,
            "minimum": 1
          }
        }
      },
      "ConnectionDefinitionPayload": {
        "type": "object",
        "description": "Payload for registering (creating) or updating a connection definition. Contains only client-settable fields; server-generated fields such as createdAt, updatedAt, and deletedAt are excluded.",
        "required": [
          "name",
          "kind",
          "type",
          "subType",
          "status"
        ],
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "description": "Existing connection definition ID for updates; omit on create.",
            "x-go-name": "ID",
            "x-oapi-codegen-extra-tags": {
              "json": "id,omitempty"
            }
          },
          "schemaVersion": {
            "description": "Specifies the version of the schema the definition conforms to.",
            "default": "connections.meshery.io/v1beta3",
            "x-oapi-codegen-extra-tags": {
              "json": "schemaVersion,omitempty"
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
          "name": {
            "type": "string",
            "description": "Connection definition name",
            "minLength": 1,
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "json": "name"
            }
          },
          "description": {
            "type": "string",
            "description": "Human-readable description of the connection definition and its purpose.",
            "maxLength": 1000,
            "x-oapi-codegen-extra-tags": {
              "json": "description,omitempty"
            }
          },
          "url": {
            "type": "string",
            "format": "uri",
            "description": "URL of the remote resource connections of this kind point to.",
            "maxLength": 2048,
            "x-oapi-codegen-extra-tags": {
              "json": "url,omitempty"
            }
          },
          "kind": {
            "type": "string",
            "description": "Connection kind (e.g., kubernetes, prometheus, grafana)",
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "json": "kind"
            }
          },
          "type": {
            "type": "string",
            "description": "Connection type (platform, telemetry, collaboration)",
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "json": "type"
            }
          },
          "subType": {
            "type": "string",
            "description": "Connection sub-type (cloud, identity, metrics, chat, git, orchestration)",
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "json": "subType"
            }
          },
          "status": {
            "type": "string",
            "description": "Connection Status Value",
            "x-go-name": "ConnectionStatusValue",
            "enum": [
              "discovered",
              "registered",
              "connected",
              "ignored",
              "maintenance",
              "disconnected",
              "deleted",
              "not found"
            ],
            "x-oapi-codegen-extra-tags": {
              "json": "status"
            }
          },
          "modelReference": {
            "x-go-type": "modelv1beta1.ModelReference",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/v1beta1/model",
              "name": "modelv1beta1"
            },
            "description": "Reference to the registered model that owns this connection definition.",
            "x-oapi-codegen-extra-tags": {
              "json": "modelReference,omitempty"
            },
            "x-generate-db-helpers": true,
            "type": "object",
            "required": [
              "id",
              "name",
              "version",
              "displayName",
              "model",
              "registrant"
            ],
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                }
              },
              "name": {
                "type": "string",
                "description": "The unique name for the model within the scope of a registrant.",
                "pattern": "^[a-z0-9-]+$",
                "examples": [
                  "cert-manager"
                ]
              },
              "version": {
                "description": "Version of the model definition.",
                "type": "string",
                "minLength": 5,
                "maxLength": 100,
                "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
              },
              "displayName": {
                "type": "string",
                "description": "Human-readable name for the model.",
                "minLength": 1,
                "maxLength": 100,
                "pattern": "^[a-zA-Z0-9 ]+$",
                "examples": [
                  "Cert Manager"
                ]
              },
              "model": {
                "type": "object",
                "description": "Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31).",
                "required": [
                  "version"
                ],
                "properties": {
                  "version": {
                    "description": "Version of the model as defined by the registrant.",
                    "x-oapi-codegen-extra-tags": {
                      "json": "version"
                    },
                    "x-order": 1,
                    "type": "string",
                    "minLength": 5,
                    "maxLength": 100,
                    "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                  }
                }
              },
              "registrant": {
                "x-go-type": "RegistrantReference",
                "x-oapi-codegen-extra-tags": {
                  "json": "registrant"
                },
                "type": "object",
                "required": [
                  "kind"
                ],
                "properties": {
                  "kind": {
                    "type": "string",
                    "description": "Kind of the registrant.",
                    "maxLength": 255
                  }
                }
              }
            }
          },
          "metadata": {
            "type": "object",
            "description": "Kind-specific connection metadata",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "metadata"
            }
          },
          "credentialSchema": {
            "type": "object",
            "description": "Schema for the credential associated with connections of this kind.",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "credentialSchema"
            }
          },
          "connectionSchema": {
            "type": "object",
            "description": "Schema for connections of this kind.",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "connectionSchema"
            }
          },
          "styles": {
            "x-go-type": "core.ComponentStyles",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "description": "Visualization styles for the connection, including svgColor and svgWhite used for UI representation.",
            "x-oapi-codegen-extra-tags": {
              "json": "styles,omitempty"
            },
            "type": "object",
            "required": [
              "shape",
              "primaryColor",
              "svgColor",
              "svgWhite",
              "svgComplete"
            ],
            "allOf": [
              {
                "type": "object",
                "description": "Common styles for all entities",
                "additionalProperties": true,
                "required": [
                  "primaryColor",
                  "svgColor",
                  "svgWhite",
                  "svgComplete"
                ],
                "properties": {
                  "primaryColor": {
                    "type": "string",
                    "description": "Primary color of the component used for UI representation.",
                    "maxLength": 500
                  },
                  "secondaryColor": {
                    "type": "string",
                    "description": "Secondary color of the entity used for UI representation.",
                    "maxLength": 500
                  },
                  "svgWhite": {
                    "type": "string",
                    "description": "White SVG of the entity used for UI representation on dark background.",
                    "maxLength": 500
                  },
                  "svgColor": {
                    "type": "string",
                    "description": "Colored SVG of the entity used for UI representation on light background.",
                    "maxLength": 500
                  },
                  "svgComplete": {
                    "type": "string",
                    "description": "Complete SVG of the entity used for UI representation, often inclusive of background.",
                    "maxLength": 500
                  },
                  "color": {
                    "type": "string",
                    "description": "The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 500
                  },
                  "textOpacity": {
                    "type": "number",
                    "description": "The opacity of the label text, including its outline.",
                    "minimum": 0,
                    "maximum": 1
                  },
                  "fontFamily": {
                    "type": "string",
                    "description": "A comma-separated list of font names to use on the label text.",
                    "maxLength": 500
                  },
                  "fontSize": {
                    "type": "string",
                    "description": "The size of the label text.",
                    "maxLength": 500
                  },
                  "fontStyle": {
                    "type": "string",
                    "description": "A CSS font style to be applied to the label text.",
                    "maxLength": 500
                  },
                  "fontWeight": {
                    "type": "string",
                    "description": "A CSS font weight to be applied to the label text.",
                    "maxLength": 500
                  },
                  "textTransform": {
                    "type": "string",
                    "description": "A transformation to apply to the label text",
                    "enum": [
                      "none",
                      "uppercase",
                      "lowercase"
                    ]
                  },
                  "opacity": {
                    "type": "number",
                    "description": "The opacity of the element, ranging from 0 to 1. Note that the opacity of a compound node parent affects the effective opacity of its children.",
                    "minimum": 0,
                    "maximum": 1
                  },
                  "zIndex": {
                    "type": "integer",
                    "description": "An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index.",
                    "minimum": 0
                  },
                  "label": {
                    "type": "string",
                    "description": "The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id",
                    "maxLength": 500
                  },
                  "animation": {
                    "type": "object",
                    "description": "The animation to apply to the element. example ripple,bounce,etc"
                  }
                }
              },
              {
                "type": "object",
                "properties": {
                  "shape": {
                    "type": "string",
                    "description": "The shape of the node's body. Note that each shape fits within the specified width and height, and so you may have to adjust width and height if you desire an equilateral shape (i.e. width !== height for several equilateral shapes)",
                    "enum": [
                      "ellipse",
                      "triangle",
                      "round-triangle",
                      "rectangle",
                      "round-rectangle",
                      "bottom-round-rectangle",
                      "cut-rectangle",
                      "barrel",
                      "rhomboid",
                      "diamond",
                      "round-diamond",
                      "pentagon",
                      "round-pentagon",
                      "hexagon",
                      "round-hexagon",
                      "concave-hexagon",
                      "heptagon",
                      "round-heptagon",
                      "octagon",
                      "round-octagon",
                      "star",
                      "tag",
                      "round-tag",
                      "vee",
                      "polygon"
                    ]
                  },
                  "position": {
                    "type": "object",
                    "additionalProperties": false,
                    "required": [
                      "x",
                      "y"
                    ],
                    "description": "The position of the node. If the position is set, the node is drawn at that position in the given dimensions. If the position is not set, the node is drawn at a random position.",
                    "properties": {
                      "x": {
                        "type": "number",
                        "description": "The x-coordinate of the node.",
                        "minimum": -1000000,
                        "maximum": 1000000,
                        "x-go-type": "float64"
                      },
                      "y": {
                        "type": "number",
                        "description": "The y-coordinate of the node.",
                        "minimum": -1000000,
                        "maximum": 1000000,
                        "x-go-type": "float64"
                      }
                    }
                  },
                  "bodyText": {
                    "type": "string",
                    "description": "The text to display for an element's body. Can give a path, e.g. data(id) will label with the elements id",
                    "maxLength": 500
                  },
                  "bodyTextWrap": {
                    "type": "string",
                    "description": "How to wrap the text in the node. Can be 'none', 'wrap', or 'ellipsis'.",
                    "enum": [
                      "none",
                      "wrap",
                      "ellipsis"
                    ]
                  },
                  "bodyTextMaxWidth": {
                    "type": "string",
                    "description": "The maximum width for wrapping text in the node.",
                    "maxLength": 50
                  },
                  "bodyTextOpacity": {
                    "type": "number",
                    "description": "The opacity of the node's body text, including its outline.",
                    "minimum": 0,
                    "maximum": 1
                  },
                  "bodyTextBackgroundColor": {
                    "type": "string",
                    "description": "The colour of the node's body text background. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "bodyTextFontSize": {
                    "type": "number",
                    "description": "The size of the node's body text.",
                    "minimum": 0
                  },
                  "bodyTextColor": {
                    "type": "string",
                    "description": "The colour of the node's body text. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "bodyTextFontWeight": {
                    "type": "string",
                    "description": "A CSS font weight to be applied to the node's body text.",
                    "maxLength": 50
                  },
                  "bodyTextHorizontalAlign": {
                    "type": "string",
                    "description": "A CSS horizontal alignment to be applied to the node's body text.",
                    "maxLength": 50
                  },
                  "bodyTextDecoration": {
                    "type": "string",
                    "description": "A CSS text decoration to be applied to the node's body text.",
                    "maxLength": 100
                  },
                  "bodyTextVerticalAlign": {
                    "type": "string",
                    "description": "A CSS vertical alignment to be applied to the node's body text.",
                    "maxLength": 50
                  },
                  "width": {
                    "type": "number",
                    "description": "The width of the node's body or the width of an edge's line.",
                    "minimum": 0
                  },
                  "height": {
                    "type": "number",
                    "description": "The height of the node's body",
                    "minimum": 0
                  },
                  "backgroundImage": {
                    "type": "string",
                    "format": "uri",
                    "description": "The URL that points to the image to show in the node.",
                    "maxLength": 2048
                  },
                  "backgroundColor": {
                    "type": "string",
                    "description": "The colour of the node's body. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "backgroundBlacken": {
                    "type": "number",
                    "description": "Blackens the node's body for values from 0 to 1; whitens the node's body for values from 0 to -1.",
                    "maximum": 1,
                    "minimum": -1
                  },
                  "backgroundOpacity": {
                    "type": "number",
                    "description": "The opacity level of the node's background colour",
                    "maximum": 1,
                    "minimum": 0
                  },
                  "backgroundPositionX": {
                    "type": "string",
                    "description": "The x position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                    "maxLength": 50
                  },
                  "backgroundPositionY": {
                    "type": "string",
                    "description": "The y position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                    "maxLength": 50
                  },
                  "backgroundOffsetX": {
                    "type": "string",
                    "description": "The x offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                    "maxLength": 50
                  },
                  "backgroundOffsetY": {
                    "type": "string",
                    "description": "The y offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                    "maxLength": 50
                  },
                  "backgroundFit": {
                    "type": "string",
                    "description": "How the background image is fit to the node. Can be 'none', 'contain', or 'cover'.",
                    "enum": [
                      "none",
                      "contain",
                      "cover"
                    ]
                  },
                  "backgroundClip": {
                    "type": "string",
                    "description": "How the background image is clipped to the node. Can be 'none', 'node', or 'node-border'.",
                    "enum": [
                      "none",
                      "node",
                      "node-border"
                    ]
                  },
                  "backgroundWidthRelativeTo": {
                    "type": "string",
                    "description": "How the background image's width is determined. Can be 'none', 'inner', or 'outer'.",
                    "enum": [
                      "none",
                      "inner",
                      "outer"
                    ]
                  },
                  "backgroundHeightRelativeTo": {
                    "type": "string",
                    "description": "How the background image's height is determined. Can be 'none', 'inner', or 'outer'.",
                    "enum": [
                      "none",
                      "inner",
                      "outer"
                    ]
                  },
                  "borderWidth": {
                    "type": "number",
                    "description": "The size of the node's border.",
                    "minimum": 0
                  },
                  "borderStyle": {
                    "type": "string",
                    "description": "The style of the node's border",
                    "enum": [
                      "solid",
                      "dotted",
                      "dashed",
                      "double"
                    ]
                  },
                  "borderColor": {
                    "type": "string",
                    "description": "The colour of the node's border. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "borderOpacity": {
                    "type": "number",
                    "description": "The opacity of the node's border",
                    "minimum": 0,
                    "maximum": 1
                  },
                  "padding": {
                    "type": "number",
                    "description": "The amount of padding around all sides of the node.",
                    "minimum": 0
                  },
                  "textHalign": {
                    "type": "string",
                    "description": "The horizontal alignment of a node's label",
                    "enum": [
                      "left",
                      "center",
                      "right"
                    ]
                  },
                  "textValign": {
                    "type": "string",
                    "description": "The vertical alignment of a node's label",
                    "enum": [
                      "top",
                      "center",
                      "bottom"
                    ]
                  },
                  "ghost": {
                    "type": "string",
                    "description": "Whether to use the ghost effect, a semitransparent duplicate of the element drawn at an offset.",
                    "default": "no",
                    "enum": [
                      "yes",
                      "no"
                    ]
                  },
                  "activeBgColor": {
                    "type": "string",
                    "description": "The colour of the indicator shown when the background is grabbed by the user. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "activeBgOpacity": {
                    "type": "string",
                    "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                    "maxLength": 50
                  },
                  "activeBgSize": {
                    "type": "string",
                    "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                    "maxLength": 50
                  },
                  "selectionBoxColor": {
                    "type": "string",
                    "description": "The background colour of the selection box used for drag selection. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "selectionBoxBorderWidth": {
                    "type": "number",
                    "description": "The size of the border on the selection box. Selector needs to be *core*",
                    "minimum": 0
                  },
                  "selectionBoxOpacity": {
                    "type": "number",
                    "description": "The opacity of the selection box. Selector needs to be *core*",
                    "minimum": 0,
                    "maximum": 1
                  },
                  "outsideTextureBgColor": {
                    "type": "string",
                    "description": "The colour of the area outside the viewport texture when initOptions.textureOnViewport === true. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "outsideTextureBgOpacity": {
                    "type": "number",
                    "description": "The opacity of the area outside the viewport texture. Selector needs to be *core*",
                    "minimum": 0,
                    "maximum": 1
                  },
                  "shapePolygonPoints": {
                    "type": "string",
                    "description": "An array (or a space-separated string) of numbers ranging on [-1, 1], representing alternating x and y values (i.e. x1 y1 x2 y2, x3 y3 ...). This represents the points in the polygon for the node's shape. The bounding box of the node is given by (-1, -1), (1, -1), (1, 1), (-1, 1). The node's position is the origin (0, 0 )",
                    "maxLength": 2000
                  },
                  "menuBackgroundColor": {
                    "type": "string",
                    "description": "The colour of the background of the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "menuBackgroundOpacity": {
                    "type": "number",
                    "description": "The opacity of the background of the component menu.",
                    "minimum": 0,
                    "maximum": 1
                  },
                  "menuForgroundColor": {
                    "type": "string",
                    "description": "The colour of the text or icons in the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  }
                }
              }
            ]
          },
          "transitionMap": {
            "type": "object",
            "description": "Map describing the connection state machine. Each key is a current connection status and its value is the list of states the connection may transition to from that status.",
            "additionalProperties": {
              "type": "array",
              "items": {
                "type": "object",
                "additionalProperties": false,
                "description": "A single permissible state transition for a connection, describing the next reachable state and the meaning of that transition.",
                "required": [
                  "nextState"
                ],
                "properties": {
                  "nextState": {
                    "type": "string",
                    "description": "Connection Status Value",
                    "x-go-name": "ConnectionStatusValue",
                    "enum": [
                      "discovered",
                      "registered",
                      "connected",
                      "ignored",
                      "maintenance",
                      "disconnected",
                      "deleted",
                      "not found"
                    ],
                    "x-order": 1
                  },
                  "description": {
                    "type": "string",
                    "description": "Human-readable explanation of when or why this transition occurs.",
                    "maxLength": 1000,
                    "x-oapi-codegen-extra-tags": {
                      "json": "description,omitempty"
                    },
                    "x-order": 2
                  }
                }
              }
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "transitionMap,omitempty"
            }
          }
        }
      },
      "ConnectionPage": {
        "description": "Represents a page of connections with meta information about connections count",
        "additionalProperties": false,
        "type": "object",
        "required": [
          "connections",
          "totalCount",
          "page",
          "pageSize"
        ],
        "properties": {
          "connections": {
            "type": "array",
            "description": "List of connections on this page",
            "x-go-type": "[]*Connection",
            "items": {
              "$id": "https://schemas.meshery.io/connection.yaml",
              "$schema": "http://json-schema.org/draft-07/schema#",
              "description": "Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections",
              "additionalProperties": false,
              "type": "object",
              "required": [
                "id",
                "schemaVersion",
                "name",
                "type",
                "subType",
                "kind",
                "status"
              ],
              "properties": {
                "id": {
                  "description": "Connection ID",
                  "x-order": 1,
                  "x-go-name": "ID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "id"
                  },
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "name": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "name"
                  },
                  "x-order": 2,
                  "type": "string",
                  "description": "Connection Name",
                  "minLength": 1,
                  "maxLength": 255
                },
                "description": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "description",
                    "json": "description"
                  },
                  "x-order": 3,
                  "type": "string",
                  "description": "Human-readable description of the connection and its purpose.",
                  "maxLength": 1000
                },
                "url": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "url",
                    "json": "url"
                  },
                  "x-order": 4,
                  "type": "string",
                  "format": "uri",
                  "description": "URL of the remote resource this connection points to (e.g. the Helm repository URL, the Kubernetes API server endpoint, the Grafana instance URL).",
                  "maxLength": 2048
                },
                "credentialId": {
                  "x-go-name": "CredentialID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "credential_id",
                    "json": "credentialId"
                  },
                  "x-order": 5,
                  "description": "Associated Credential ID",
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "type": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "type",
                    "json": "type",
                    "yaml": "type"
                  },
                  "x-go-name": "ConnectionType",
                  "x-order": 6,
                  "type": "string",
                  "description": "Connection Type (platform, telemetry, collaboration)",
                  "maxLength": 255
                },
                "subType": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "sub_type",
                    "json": "subType"
                  },
                  "x-order": 7,
                  "type": "string",
                  "description": "Connection Subtype (cloud, identity, metrics, chat, git, orchestration)",
                  "maxLength": 255
                },
                "kind": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "kind"
                  },
                  "x-order": 8,
                  "type": "string",
                  "description": "Connection Kind (meshery, kubernetes, prometheus, grafana, gke, aws, azure, slack, github)",
                  "maxLength": 255
                },
                "modelReference": {
                  "x-go-type": "modelv1beta1.ModelReference",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/v1beta1/model",
                    "name": "modelv1beta1"
                  },
                  "x-order": 8,
                  "description": "Reference to the specific registered model to which the component belongs and from which model version, category, and other properties may be referenced. Learn more at https://docs.meshery.io/concepts/models",
                  "x-oapi-codegen-extra-tags": {
                    "gorm": "model_reference",
                    "db": "model_reference",
                    "json": "modelReference",
                    "yaml": "modelReference"
                  },
                  "x-generate-db-helpers": true,
                  "type": "object",
                  "required": [
                    "id",
                    "name",
                    "version",
                    "displayName",
                    "model",
                    "registrant"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "name": {
                      "type": "string",
                      "description": "The unique name for the model within the scope of a registrant.",
                      "pattern": "^[a-z0-9-]+$",
                      "examples": [
                        "cert-manager"
                      ]
                    },
                    "version": {
                      "description": "Version of the model definition.",
                      "type": "string",
                      "minLength": 5,
                      "maxLength": 100,
                      "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                    },
                    "displayName": {
                      "type": "string",
                      "description": "Human-readable name for the model.",
                      "minLength": 1,
                      "maxLength": 100,
                      "pattern": "^[a-zA-Z0-9 ]+$",
                      "examples": [
                        "Cert Manager"
                      ]
                    },
                    "model": {
                      "type": "object",
                      "description": "Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31).",
                      "required": [
                        "version"
                      ],
                      "properties": {
                        "version": {
                          "description": "Version of the model as defined by the registrant.",
                          "x-oapi-codegen-extra-tags": {
                            "json": "version"
                          },
                          "x-order": 1,
                          "type": "string",
                          "minLength": 5,
                          "maxLength": 100,
                          "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                        }
                      }
                    },
                    "registrant": {
                      "x-go-type": "RegistrantReference",
                      "x-oapi-codegen-extra-tags": {
                        "json": "registrant"
                      },
                      "type": "object",
                      "required": [
                        "kind"
                      ],
                      "properties": {
                        "kind": {
                          "type": "string",
                          "description": "Kind of the registrant.",
                          "maxLength": 255
                        }
                      }
                    }
                  }
                },
                "metadata": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "metadata"
                  },
                  "x-order": 9,
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "type": "object",
                  "description": "Additional connection metadata"
                },
                "credentialSchema": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "credential_schema"
                  },
                  "x-order": 9,
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "type": "object",
                  "description": "Schema for the credential Associated with the connection"
                },
                "connectionSchema": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "connection_schema"
                  },
                  "x-order": 9,
                  "x-go-type": "core.Map",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "type": "object",
                  "description": "Schema for the connection"
                },
                "styles": {
                  "x-oapi-codegen-extra-tags": {
                    "gorm": "type:bytes;serializer:json",
                    "db": "-",
                    "yaml": "styles",
                    "json": "styles"
                  },
                  "x-go-type": "core.ComponentStyles",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-order": 17,
                  "description": "Visualization styles for the connection, including svgColor and svgWhite used for UI representation.",
                  "type": "object",
                  "required": [
                    "shape",
                    "primaryColor",
                    "svgColor",
                    "svgWhite",
                    "svgComplete"
                  ],
                  "allOf": [
                    {
                      "type": "object",
                      "description": "Common styles for all entities",
                      "additionalProperties": true,
                      "required": [
                        "primaryColor",
                        "svgColor",
                        "svgWhite",
                        "svgComplete"
                      ],
                      "properties": {
                        "primaryColor": {
                          "type": "string",
                          "description": "Primary color of the component used for UI representation.",
                          "maxLength": 500
                        },
                        "secondaryColor": {
                          "type": "string",
                          "description": "Secondary color of the entity used for UI representation.",
                          "maxLength": 500
                        },
                        "svgWhite": {
                          "type": "string",
                          "description": "White SVG of the entity used for UI representation on dark background.",
                          "maxLength": 500
                        },
                        "svgColor": {
                          "type": "string",
                          "description": "Colored SVG of the entity used for UI representation on light background.",
                          "maxLength": 500
                        },
                        "svgComplete": {
                          "type": "string",
                          "description": "Complete SVG of the entity used for UI representation, often inclusive of background.",
                          "maxLength": 500
                        },
                        "color": {
                          "type": "string",
                          "description": "The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g.",
                          "maxLength": 500
                        },
                        "textOpacity": {
                          "type": "number",
                          "description": "The opacity of the label text, including its outline.",
                          "minimum": 0,
                          "maximum": 1
                        },
                        "fontFamily": {
                          "type": "string",
                          "description": "A comma-separated list of font names to use on the label text.",
                          "maxLength": 500
                        },
                        "fontSize": {
                          "type": "string",
                          "description": "The size of the label text.",
                          "maxLength": 500
                        },
                        "fontStyle": {
                          "type": "string",
                          "description": "A CSS font style to be applied to the label text.",
                          "maxLength": 500
                        },
                        "fontWeight": {
                          "type": "string",
                          "description": "A CSS font weight to be applied to the label text.",
                          "maxLength": 500
                        },
                        "textTransform": {
                          "type": "string",
                          "description": "A transformation to apply to the label text",
                          "enum": [
                            "none",
                            "uppercase",
                            "lowercase"
                          ]
                        },
                        "opacity": {
                          "type": "number",
                          "description": "The opacity of the element, ranging from 0 to 1. Note that the opacity of a compound node parent affects the effective opacity of its children.",
                          "minimum": 0,
                          "maximum": 1
                        },
                        "zIndex": {
                          "type": "integer",
                          "description": "An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index.",
                          "minimum": 0
                        },
                        "label": {
                          "type": "string",
                          "description": "The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id",
                          "maxLength": 500
                        },
                        "animation": {
                          "type": "object",
                          "description": "The animation to apply to the element. example ripple,bounce,etc"
                        }
                      }
                    },
                    {
                      "type": "object",
                      "properties": {
                        "shape": {
                          "type": "string",
                          "description": "The shape of the node's body. Note that each shape fits within the specified width and height, and so you may have to adjust width and height if you desire an equilateral shape (i.e. width !== height for several equilateral shapes)",
                          "enum": [
                            "ellipse",
                            "triangle",
                            "round-triangle",
                            "rectangle",
                            "round-rectangle",
                            "bottom-round-rectangle",
                            "cut-rectangle",
                            "barrel",
                            "rhomboid",
                            "diamond",
                            "round-diamond",
                            "pentagon",
                            "round-pentagon",
                            "hexagon",
                            "round-hexagon",
                            "concave-hexagon",
                            "heptagon",
                            "round-heptagon",
                            "octagon",
                            "round-octagon",
                            "star",
                            "tag",
                            "round-tag",
                            "vee",
                            "polygon"
                          ]
                        },
                        "position": {
                          "type": "object",
                          "additionalProperties": false,
                          "required": [
                            "x",
                            "y"
                          ],
                          "description": "The position of the node. If the position is set, the node is drawn at that position in the given dimensions. If the position is not set, the node is drawn at a random position.",
                          "properties": {
                            "x": {
                              "type": "number",
                              "description": "The x-coordinate of the node.",
                              "minimum": -1000000,
                              "maximum": 1000000,
                              "x-go-type": "float64"
                            },
                            "y": {
                              "type": "number",
                              "description": "The y-coordinate of the node.",
                              "minimum": -1000000,
                              "maximum": 1000000,
                              "x-go-type": "float64"
                            }
                          }
                        },
                        "bodyText": {
                          "type": "string",
                          "description": "The text to display for an element's body. Can give a path, e.g. data(id) will label with the elements id",
                          "maxLength": 500
                        },
                        "bodyTextWrap": {
                          "type": "string",
                          "description": "How to wrap the text in the node. Can be 'none', 'wrap', or 'ellipsis'.",
                          "enum": [
                            "none",
                            "wrap",
                            "ellipsis"
                          ]
                        },
                        "bodyTextMaxWidth": {
                          "type": "string",
                          "description": "The maximum width for wrapping text in the node.",
                          "maxLength": 50
                        },
                        "bodyTextOpacity": {
                          "type": "number",
                          "description": "The opacity of the node's body text, including its outline.",
                          "minimum": 0,
                          "maximum": 1
                        },
                        "bodyTextBackgroundColor": {
                          "type": "string",
                          "description": "The colour of the node's body text background. Colours may be specified by name (e.g. red), hex (e.g.",
                          "maxLength": 100
                        },
                        "bodyTextFontSize": {
                          "type": "number",
                          "description": "The size of the node's body text.",
                          "minimum": 0
                        },
                        "bodyTextColor": {
                          "type": "string",
                          "description": "The colour of the node's body text. Colours may be specified by name (e.g. red), hex (e.g.",
                          "maxLength": 100
                        },
                        "bodyTextFontWeight": {
                          "type": "string",
                          "description": "A CSS font weight to be applied to the node's body text.",
                          "maxLength": 50
                        },
                        "bodyTextHorizontalAlign": {
                          "type": "string",
                          "description": "A CSS horizontal alignment to be applied to the node's body text.",
                          "maxLength": 50
                        },
                        "bodyTextDecoration": {
                          "type": "string",
                          "description": "A CSS text decoration to be applied to the node's body text.",
                          "maxLength": 100
                        },
                        "bodyTextVerticalAlign": {
                          "type": "string",
                          "description": "A CSS vertical alignment to be applied to the node's body text.",
                          "maxLength": 50
                        },
                        "width": {
                          "type": "number",
                          "description": "The width of the node's body or the width of an edge's line.",
                          "minimum": 0
                        },
                        "height": {
                          "type": "number",
                          "description": "The height of the node's body",
                          "minimum": 0
                        },
                        "backgroundImage": {
                          "type": "string",
                          "format": "uri",
                          "description": "The URL that points to the image to show in the node.",
                          "maxLength": 2048
                        },
                        "backgroundColor": {
                          "type": "string",
                          "description": "The colour of the node's body. Colours may be specified by name (e.g. red), hex (e.g.",
                          "maxLength": 100
                        },
                        "backgroundBlacken": {
                          "type": "number",
                          "description": "Blackens the node's body for values from 0 to 1; whitens the node's body for values from 0 to -1.",
                          "maximum": 1,
                          "minimum": -1
                        },
                        "backgroundOpacity": {
                          "type": "number",
                          "description": "The opacity level of the node's background colour",
                          "maximum": 1,
                          "minimum": 0
                        },
                        "backgroundPositionX": {
                          "type": "string",
                          "description": "The x position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                          "maxLength": 50
                        },
                        "backgroundPositionY": {
                          "type": "string",
                          "description": "The y position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                          "maxLength": 50
                        },
                        "backgroundOffsetX": {
                          "type": "string",
                          "description": "The x offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                          "maxLength": 50
                        },
                        "backgroundOffsetY": {
                          "type": "string",
                          "description": "The y offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                          "maxLength": 50
                        },
                        "backgroundFit": {
                          "type": "string",
                          "description": "How the background image is fit to the node. Can be 'none', 'contain', or 'cover'.",
                          "enum": [
                            "none",
                            "contain",
                            "cover"
                          ]
                        },
                        "backgroundClip": {
                          "type": "string",
                          "description": "How the background image is clipped to the node. Can be 'none', 'node', or 'node-border'.",
                          "enum": [
                            "none",
                            "node",
                            "node-border"
                          ]
                        },
                        "backgroundWidthRelativeTo": {
                          "type": "string",
                          "description": "How the background image's width is determined. Can be 'none', 'inner', or 'outer'.",
                          "enum": [
                            "none",
                            "inner",
                            "outer"
                          ]
                        },
                        "backgroundHeightRelativeTo": {
                          "type": "string",
                          "description": "How the background image's height is determined. Can be 'none', 'inner', or 'outer'.",
                          "enum": [
                            "none",
                            "inner",
                            "outer"
                          ]
                        },
                        "borderWidth": {
                          "type": "number",
                          "description": "The size of the node's border.",
                          "minimum": 0
                        },
                        "borderStyle": {
                          "type": "string",
                          "description": "The style of the node's border",
                          "enum": [
                            "solid",
                            "dotted",
                            "dashed",
                            "double"
                          ]
                        },
                        "borderColor": {
                          "type": "string",
                          "description": "The colour of the node's border. Colours may be specified by name (e.g. red), hex (e.g.",
                          "maxLength": 100
                        },
                        "borderOpacity": {
                          "type": "number",
                          "description": "The opacity of the node's border",
                          "minimum": 0,
                          "maximum": 1
                        },
                        "padding": {
                          "type": "number",
                          "description": "The amount of padding around all sides of the node.",
                          "minimum": 0
                        },
                        "textHalign": {
                          "type": "string",
                          "description": "The horizontal alignment of a node's label",
                          "enum": [
                            "left",
                            "center",
                            "right"
                          ]
                        },
                        "textValign": {
                          "type": "string",
                          "description": "The vertical alignment of a node's label",
                          "enum": [
                            "top",
                            "center",
                            "bottom"
                          ]
                        },
                        "ghost": {
                          "type": "string",
                          "description": "Whether to use the ghost effect, a semitransparent duplicate of the element drawn at an offset.",
                          "default": "no",
                          "enum": [
                            "yes",
                            "no"
                          ]
                        },
                        "activeBgColor": {
                          "type": "string",
                          "description": "The colour of the indicator shown when the background is grabbed by the user. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                          "maxLength": 100
                        },
                        "activeBgOpacity": {
                          "type": "string",
                          "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                          "maxLength": 50
                        },
                        "activeBgSize": {
                          "type": "string",
                          "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                          "maxLength": 50
                        },
                        "selectionBoxColor": {
                          "type": "string",
                          "description": "The background colour of the selection box used for drag selection. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                          "maxLength": 100
                        },
                        "selectionBoxBorderWidth": {
                          "type": "number",
                          "description": "The size of the border on the selection box. Selector needs to be *core*",
                          "minimum": 0
                        },
                        "selectionBoxOpacity": {
                          "type": "number",
                          "description": "The opacity of the selection box. Selector needs to be *core*",
                          "minimum": 0,
                          "maximum": 1
                        },
                        "outsideTextureBgColor": {
                          "type": "string",
                          "description": "The colour of the area outside the viewport texture when initOptions.textureOnViewport === true. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                          "maxLength": 100
                        },
                        "outsideTextureBgOpacity": {
                          "type": "number",
                          "description": "The opacity of the area outside the viewport texture. Selector needs to be *core*",
                          "minimum": 0,
                          "maximum": 1
                        },
                        "shapePolygonPoints": {
                          "type": "string",
                          "description": "An array (or a space-separated string) of numbers ranging on [-1, 1], representing alternating x and y values (i.e. x1 y1 x2 y2, x3 y3 ...). This represents the points in the polygon for the node's shape. The bounding box of the node is given by (-1, -1), (1, -1), (1, 1), (-1, 1). The node's position is the origin (0, 0 )",
                          "maxLength": 2000
                        },
                        "menuBackgroundColor": {
                          "type": "string",
                          "description": "The colour of the background of the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                          "maxLength": 100
                        },
                        "menuBackgroundOpacity": {
                          "type": "number",
                          "description": "The opacity of the background of the component menu.",
                          "minimum": 0,
                          "maximum": 1
                        },
                        "menuForgroundColor": {
                          "type": "string",
                          "description": "The colour of the text or icons in the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                          "maxLength": 100
                        }
                      }
                    }
                  ]
                },
                "status": {
                  "x-oapi-codegen-extra-tags": {
                    "db": "status"
                  },
                  "x-order": 10,
                  "description": "Connection Status",
                  "type": "string",
                  "enum": [
                    "discovered",
                    "registered",
                    "connected",
                    "ignored",
                    "maintenance",
                    "disconnected",
                    "deleted",
                    "not found"
                  ]
                },
                "transitionMap": {
                  "type": "object",
                  "description": "Map describing the connection state machine. Each key is a current connection status and its value is the list of states the connection may transition to from that status, along with a description of each transition.",
                  "additionalProperties": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "additionalProperties": false,
                      "description": "A single permissible state transition for a connection, describing the next reachable state and the meaning of that transition.",
                      "required": [
                        "nextState"
                      ],
                      "properties": {
                        "nextState": {
                          "type": "string",
                          "description": "Connection Status Value",
                          "x-go-name": "ConnectionStatusValue",
                          "enum": [
                            "discovered",
                            "registered",
                            "connected",
                            "ignored",
                            "maintenance",
                            "disconnected",
                            "deleted",
                            "not found"
                          ],
                          "x-order": 1
                        },
                        "description": {
                          "type": "string",
                          "description": "Human-readable explanation of when or why this transition occurs.",
                          "maxLength": 1000,
                          "x-oapi-codegen-extra-tags": {
                            "json": "description,omitempty"
                          },
                          "x-order": 2
                        }
                      }
                    }
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "gorm": "type:bytes;serializer:json",
                    "db": "-",
                    "json": "transitionMap,omitempty"
                  },
                  "x-order": 18
                },
                "owner": {
                  "x-go-name": "Owner",
                  "x-oapi-codegen-extra-tags": {
                    "db": "owner",
                    "json": "owner"
                  },
                  "x-order": 11,
                  "description": "User ID who owns this connection",
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "createdAt": {
                  "description": "Timestamp when the connection was created.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at",
                    "json": "createdAt"
                  },
                  "x-order": 12,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updatedAt": {
                  "description": "Timestamp when the connection was last updated.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at",
                    "json": "updatedAt"
                  },
                  "x-order": 13,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "deletedAt": {
                  "description": "Timestamp when the connection was soft-deleted, if applicable.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "deleted_at",
                    "json": "deletedAt"
                  },
                  "x-order": 14,
                  "x-go-type": "meshcore.NullTime",
                  "x-go-type-import": {
                    "name": "meshcore",
                    "path": "github.com/meshery/schemas/models/core"
                  },
                  "type": "string",
                  "format": "date-time",
                  "nullable": true,
                  "x-go-type-skip-optional-pointer": true
                },
                "environments": {
                  "type": "array",
                  "description": "Associated environments for this connection",
                  "items": {
                    "x-go-type": "*environmentv1beta3.Environment",
                    "x-go-type-import": {
                      "path": "github.com/meshery/schemas/models/v1beta3/environment",
                      "name": "environmentv1beta3"
                    },
                    "$id": "https://schemas.meshery.io/environment.yaml",
                    "$schema": "http://json-schema.org/draft-07/schema#",
                    "title": "Environment",
                    "description": "Environments allow you to logically group related Connections and their associated Credentials. Learn more at https://docs.meshery.io/concepts/logical/environments",
                    "additionalProperties": false,
                    "type": "object",
                    "example": {
                      "id": "00000000-0000-0000-0000-000000000000",
                      "schemaVersion": "environments.meshery.io/v1beta3",
                      "name": "Production Environment",
                      "description": "Connections and credentials for the production cluster.",
                      "organizationId": "00000000-0000-0000-0000-000000000000",
                      "owner": "00000000-0000-0000-0000-000000000000",
                      "createdAt": "0001-01-01T00:00:00Z",
                      "metadata": {},
                      "updatedAt": "0001-01-01T00:00:00Z",
                      "deletedAt": null
                    },
                    "required": [
                      "id",
                      "schemaVersion",
                      "name",
                      "description",
                      "organizationId"
                    ],
                    "properties": {
                      "id": {
                        "description": "ID",
                        "x-order": 1,
                        "x-go-name": "ID",
                        "x-oapi-codegen-extra-tags": {
                          "db": "id",
                          "json": "id"
                        },
                        "type": "string",
                        "format": "uuid",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        }
                      },
                      "schemaVersion": {
                        "description": "Specifies the version of the schema to which the environment conforms.",
                        "x-order": 2,
                        "x-oapi-codegen-extra-tags": {
                          "json": "schemaVersion",
                          "db": "-",
                          "gorm": "-"
                        },
                        "default": "environments.meshery.io/v1beta3",
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
                      "name": {
                        "x-oapi-codegen-extra-tags": {
                          "db": "name",
                          "json": "name"
                        },
                        "x-order": 3,
                        "type": "string",
                        "maxLength": 100,
                        "description": "Environment name"
                      },
                      "description": {
                        "x-oapi-codegen-extra-tags": {
                          "db": "description",
                          "json": "description"
                        },
                        "x-order": 4,
                        "type": "string",
                        "maxLength": 1000,
                        "description": "Environment description"
                      },
                      "organizationId": {
                        "x-go-name": "OrganizationID",
                        "x-oapi-codegen-extra-tags": {
                          "db": "organization_id",
                          "json": "organizationId"
                        },
                        "x-order": 5,
                        "description": "Environment organization ID",
                        "type": "string",
                        "format": "uuid",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        }
                      },
                      "owner": {
                        "x-oapi-codegen-extra-tags": {
                          "db": "owner",
                          "json": "owner"
                        },
                        "x-order": 6,
                        "description": "Environment owner",
                        "type": "string",
                        "format": "uuid",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        }
                      },
                      "createdAt": {
                        "description": "Timestamp when the environment was created.",
                        "x-oapi-codegen-extra-tags": {
                          "db": "created_at",
                          "yaml": "created_at",
                          "json": "createdAt"
                        },
                        "x-order": 7,
                        "x-go-type": "time.Time",
                        "type": "string",
                        "format": "date-time",
                        "x-go-name": "CreatedAt",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "metadata": {
                        "description": "Additional metadata associated with the environment.",
                        "x-oapi-codegen-extra-tags": {
                          "db": "metadata",
                          "json": "metadata"
                        },
                        "x-order": 8,
                        "x-go-type": "core.Map",
                        "x-go-type-skip-optional-pointer": true,
                        "type": "object"
                      },
                      "updatedAt": {
                        "description": "Timestamp when the environment was last updated.",
                        "x-oapi-codegen-extra-tags": {
                          "db": "updated_at",
                          "yaml": "updated_at",
                          "json": "updatedAt"
                        },
                        "x-order": 9,
                        "x-go-type": "time.Time",
                        "type": "string",
                        "format": "date-time",
                        "x-go-name": "UpdatedAt",
                        "x-go-type-skip-optional-pointer": true
                      },
                      "deletedAt": {
                        "description": "Timestamp when the environment was soft deleted. Null while the environment remains active.",
                        "nullable": true,
                        "x-oapi-codegen-extra-tags": {
                          "db": "deleted_at",
                          "json": "deletedAt"
                        },
                        "x-go-type": "core.NullTime",
                        "x-go-import": "database/sql",
                        "x-order": 10,
                        "type": "string",
                        "format": "date-time",
                        "x-go-type-skip-optional-pointer": true
                      }
                    }
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "-",
                    "gorm": "-"
                  },
                  "x-go-type-skip-optional-pointer": true,
                  "x-order": 15
                },
                "schemaVersion": {
                  "description": "Specifies the version of the schema used for the definition.",
                  "x-order": 16,
                  "x-oapi-codegen-extra-tags": {
                    "db": "-",
                    "gorm": "-"
                  },
                  "default": "connections.meshery.io/v1beta3",
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
                }
              }
            },
            "x-order": 1
          },
          "totalCount": {
            "type": "integer",
            "description": "Total number of connections on all pages",
            "x-oapi-codegen-extra-tags": {
              "json": "totalCount"
            },
            "x-order": 2,
            "minimum": 0
          },
          "page": {
            "type": "integer",
            "description": "Current page number",
            "x-order": 3,
            "minimum": 0
          },
          "pageSize": {
            "type": "integer",
            "description": "Number of elements per page",
            "x-oapi-codegen-extra-tags": {
              "json": "pageSize"
            },
            "x-order": 4,
            "minimum": 1
          },
          "statusSummary": {
            "type": "object",
            "description": "Aggregate count of connections grouped by status",
            "additionalProperties": {
              "type": "integer"
            },
            "x-go-type": "map[ConnectionStatusValue]int",
            "x-oapi-codegen-extra-tags": {
              "json": "statusSummary,omitempty"
            },
            "x-order": 5
          }
        }
      },
      "ConnectionStatusValue": {
        "type": "string",
        "description": "Connection Status Value",
        "x-go-name": "ConnectionStatusValue",
        "enum": [
          "discovered",
          "registered",
          "connected",
          "ignored",
          "maintenance",
          "disconnected",
          "deleted",
          "not found"
        ]
      },
      "ConnectionStateTransition": {
        "type": "object",
        "additionalProperties": false,
        "description": "A single permissible state transition for a connection, describing the next reachable state and the meaning of that transition.",
        "required": [
          "nextState"
        ],
        "properties": {
          "nextState": {
            "type": "string",
            "description": "Connection Status Value",
            "x-go-name": "ConnectionStatusValue",
            "enum": [
              "discovered",
              "registered",
              "connected",
              "ignored",
              "maintenance",
              "disconnected",
              "deleted",
              "not found"
            ],
            "x-order": 1
          },
          "description": {
            "type": "string",
            "description": "Human-readable explanation of when or why this transition occurs.",
            "maxLength": 1000,
            "x-oapi-codegen-extra-tags": {
              "json": "description,omitempty"
            },
            "x-order": 2
          }
        }
      },
      "ConnectionActionRequest": {
        "type": "object",
        "description": "A side-effecting operation to perform on a connection via POST /api/integrations/connections/{connectionId}/actions. The `action` field selects the operation; operation-specific fields carry its parameters. Unlike PUT (which updates resource fields), the server owns any resulting metadata merge and cluster-side effects.",
        "additionalProperties": false,
        "required": [
          "action"
        ],
        "properties": {
          "action": {
            "type": "string",
            "description": "The operation to perform on the connection.",
            "enum": [
              "setMeshsyncMode"
            ],
            "x-oapi-codegen-extra-tags": {
              "json": "action"
            }
          },
          "mode": {
            "type": "string",
            "description": "Target MeshSync deployment mode. Required when `action` is `setMeshsyncMode`; the server redeploys MeshSync (operator vs embedded) for the connection's cluster.",
            "enum": [
              "operator",
              "embedded"
            ],
            "x-oapi-codegen-extra-tags": {
              "json": "mode,omitempty"
            }
          }
        }
      },
      "ConnectionPayload": {
        "type": "object",
        "description": "Payload for creating or updating a connection",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "description": "Connection ID",
            "x-go-name": "ConnectionID",
            "x-oapi-codegen-extra-tags": {
              "json": "id,omitempty"
            }
          },
          "name": {
            "type": "string",
            "description": "Connection name",
            "x-oapi-codegen-extra-tags": {
              "json": "name"
            },
            "minLength": 1,
            "maxLength": 255
          },
          "kind": {
            "type": "string",
            "description": "Connection kind",
            "x-oapi-codegen-extra-tags": {
              "json": "kind"
            },
            "maxLength": 255
          },
          "type": {
            "type": "string",
            "description": "Connection type",
            "x-oapi-codegen-extra-tags": {
              "json": "type"
            },
            "maxLength": 255
          },
          "subType": {
            "type": "string",
            "description": "Connection sub-type",
            "x-oapi-codegen-extra-tags": {
              "json": "subType"
            },
            "maxLength": 255
          },
          "credentialSecret": {
            "type": "object",
            "description": "Credential secret data",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "credentialSecret"
            }
          },
          "metadata": {
            "type": "object",
            "description": "Connection metadata",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "metadata"
            }
          },
          "styles": {
            "x-go-type": "core.ComponentStyles",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-oapi-codegen-extra-tags": {
              "json": "styles,omitempty"
            },
            "description": "Visualization styles for the connection, including svgColor and svgWhite used for UI representation.",
            "type": "object",
            "required": [
              "shape",
              "primaryColor",
              "svgColor",
              "svgWhite",
              "svgComplete"
            ],
            "allOf": [
              {
                "type": "object",
                "description": "Common styles for all entities",
                "additionalProperties": true,
                "required": [
                  "primaryColor",
                  "svgColor",
                  "svgWhite",
                  "svgComplete"
                ],
                "properties": {
                  "primaryColor": {
                    "type": "string",
                    "description": "Primary color of the component used for UI representation.",
                    "maxLength": 500
                  },
                  "secondaryColor": {
                    "type": "string",
                    "description": "Secondary color of the entity used for UI representation.",
                    "maxLength": 500
                  },
                  "svgWhite": {
                    "type": "string",
                    "description": "White SVG of the entity used for UI representation on dark background.",
                    "maxLength": 500
                  },
                  "svgColor": {
                    "type": "string",
                    "description": "Colored SVG of the entity used for UI representation on light background.",
                    "maxLength": 500
                  },
                  "svgComplete": {
                    "type": "string",
                    "description": "Complete SVG of the entity used for UI representation, often inclusive of background.",
                    "maxLength": 500
                  },
                  "color": {
                    "type": "string",
                    "description": "The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 500
                  },
                  "textOpacity": {
                    "type": "number",
                    "description": "The opacity of the label text, including its outline.",
                    "minimum": 0,
                    "maximum": 1
                  },
                  "fontFamily": {
                    "type": "string",
                    "description": "A comma-separated list of font names to use on the label text.",
                    "maxLength": 500
                  },
                  "fontSize": {
                    "type": "string",
                    "description": "The size of the label text.",
                    "maxLength": 500
                  },
                  "fontStyle": {
                    "type": "string",
                    "description": "A CSS font style to be applied to the label text.",
                    "maxLength": 500
                  },
                  "fontWeight": {
                    "type": "string",
                    "description": "A CSS font weight to be applied to the label text.",
                    "maxLength": 500
                  },
                  "textTransform": {
                    "type": "string",
                    "description": "A transformation to apply to the label text",
                    "enum": [
                      "none",
                      "uppercase",
                      "lowercase"
                    ]
                  },
                  "opacity": {
                    "type": "number",
                    "description": "The opacity of the element, ranging from 0 to 1. Note that the opacity of a compound node parent affects the effective opacity of its children.",
                    "minimum": 0,
                    "maximum": 1
                  },
                  "zIndex": {
                    "type": "integer",
                    "description": "An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index.",
                    "minimum": 0
                  },
                  "label": {
                    "type": "string",
                    "description": "The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id",
                    "maxLength": 500
                  },
                  "animation": {
                    "type": "object",
                    "description": "The animation to apply to the element. example ripple,bounce,etc"
                  }
                }
              },
              {
                "type": "object",
                "properties": {
                  "shape": {
                    "type": "string",
                    "description": "The shape of the node's body. Note that each shape fits within the specified width and height, and so you may have to adjust width and height if you desire an equilateral shape (i.e. width !== height for several equilateral shapes)",
                    "enum": [
                      "ellipse",
                      "triangle",
                      "round-triangle",
                      "rectangle",
                      "round-rectangle",
                      "bottom-round-rectangle",
                      "cut-rectangle",
                      "barrel",
                      "rhomboid",
                      "diamond",
                      "round-diamond",
                      "pentagon",
                      "round-pentagon",
                      "hexagon",
                      "round-hexagon",
                      "concave-hexagon",
                      "heptagon",
                      "round-heptagon",
                      "octagon",
                      "round-octagon",
                      "star",
                      "tag",
                      "round-tag",
                      "vee",
                      "polygon"
                    ]
                  },
                  "position": {
                    "type": "object",
                    "additionalProperties": false,
                    "required": [
                      "x",
                      "y"
                    ],
                    "description": "The position of the node. If the position is set, the node is drawn at that position in the given dimensions. If the position is not set, the node is drawn at a random position.",
                    "properties": {
                      "x": {
                        "type": "number",
                        "description": "The x-coordinate of the node.",
                        "minimum": -1000000,
                        "maximum": 1000000,
                        "x-go-type": "float64"
                      },
                      "y": {
                        "type": "number",
                        "description": "The y-coordinate of the node.",
                        "minimum": -1000000,
                        "maximum": 1000000,
                        "x-go-type": "float64"
                      }
                    }
                  },
                  "bodyText": {
                    "type": "string",
                    "description": "The text to display for an element's body. Can give a path, e.g. data(id) will label with the elements id",
                    "maxLength": 500
                  },
                  "bodyTextWrap": {
                    "type": "string",
                    "description": "How to wrap the text in the node. Can be 'none', 'wrap', or 'ellipsis'.",
                    "enum": [
                      "none",
                      "wrap",
                      "ellipsis"
                    ]
                  },
                  "bodyTextMaxWidth": {
                    "type": "string",
                    "description": "The maximum width for wrapping text in the node.",
                    "maxLength": 50
                  },
                  "bodyTextOpacity": {
                    "type": "number",
                    "description": "The opacity of the node's body text, including its outline.",
                    "minimum": 0,
                    "maximum": 1
                  },
                  "bodyTextBackgroundColor": {
                    "type": "string",
                    "description": "The colour of the node's body text background. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "bodyTextFontSize": {
                    "type": "number",
                    "description": "The size of the node's body text.",
                    "minimum": 0
                  },
                  "bodyTextColor": {
                    "type": "string",
                    "description": "The colour of the node's body text. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "bodyTextFontWeight": {
                    "type": "string",
                    "description": "A CSS font weight to be applied to the node's body text.",
                    "maxLength": 50
                  },
                  "bodyTextHorizontalAlign": {
                    "type": "string",
                    "description": "A CSS horizontal alignment to be applied to the node's body text.",
                    "maxLength": 50
                  },
                  "bodyTextDecoration": {
                    "type": "string",
                    "description": "A CSS text decoration to be applied to the node's body text.",
                    "maxLength": 100
                  },
                  "bodyTextVerticalAlign": {
                    "type": "string",
                    "description": "A CSS vertical alignment to be applied to the node's body text.",
                    "maxLength": 50
                  },
                  "width": {
                    "type": "number",
                    "description": "The width of the node's body or the width of an edge's line.",
                    "minimum": 0
                  },
                  "height": {
                    "type": "number",
                    "description": "The height of the node's body",
                    "minimum": 0
                  },
                  "backgroundImage": {
                    "type": "string",
                    "format": "uri",
                    "description": "The URL that points to the image to show in the node.",
                    "maxLength": 2048
                  },
                  "backgroundColor": {
                    "type": "string",
                    "description": "The colour of the node's body. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "backgroundBlacken": {
                    "type": "number",
                    "description": "Blackens the node's body for values from 0 to 1; whitens the node's body for values from 0 to -1.",
                    "maximum": 1,
                    "minimum": -1
                  },
                  "backgroundOpacity": {
                    "type": "number",
                    "description": "The opacity level of the node's background colour",
                    "maximum": 1,
                    "minimum": 0
                  },
                  "backgroundPositionX": {
                    "type": "string",
                    "description": "The x position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                    "maxLength": 50
                  },
                  "backgroundPositionY": {
                    "type": "string",
                    "description": "The y position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                    "maxLength": 50
                  },
                  "backgroundOffsetX": {
                    "type": "string",
                    "description": "The x offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                    "maxLength": 50
                  },
                  "backgroundOffsetY": {
                    "type": "string",
                    "description": "The y offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)",
                    "maxLength": 50
                  },
                  "backgroundFit": {
                    "type": "string",
                    "description": "How the background image is fit to the node. Can be 'none', 'contain', or 'cover'.",
                    "enum": [
                      "none",
                      "contain",
                      "cover"
                    ]
                  },
                  "backgroundClip": {
                    "type": "string",
                    "description": "How the background image is clipped to the node. Can be 'none', 'node', or 'node-border'.",
                    "enum": [
                      "none",
                      "node",
                      "node-border"
                    ]
                  },
                  "backgroundWidthRelativeTo": {
                    "type": "string",
                    "description": "How the background image's width is determined. Can be 'none', 'inner', or 'outer'.",
                    "enum": [
                      "none",
                      "inner",
                      "outer"
                    ]
                  },
                  "backgroundHeightRelativeTo": {
                    "type": "string",
                    "description": "How the background image's height is determined. Can be 'none', 'inner', or 'outer'.",
                    "enum": [
                      "none",
                      "inner",
                      "outer"
                    ]
                  },
                  "borderWidth": {
                    "type": "number",
                    "description": "The size of the node's border.",
                    "minimum": 0
                  },
                  "borderStyle": {
                    "type": "string",
                    "description": "The style of the node's border",
                    "enum": [
                      "solid",
                      "dotted",
                      "dashed",
                      "double"
                    ]
                  },
                  "borderColor": {
                    "type": "string",
                    "description": "The colour of the node's border. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "borderOpacity": {
                    "type": "number",
                    "description": "The opacity of the node's border",
                    "minimum": 0,
                    "maximum": 1
                  },
                  "padding": {
                    "type": "number",
                    "description": "The amount of padding around all sides of the node.",
                    "minimum": 0
                  },
                  "textHalign": {
                    "type": "string",
                    "description": "The horizontal alignment of a node's label",
                    "enum": [
                      "left",
                      "center",
                      "right"
                    ]
                  },
                  "textValign": {
                    "type": "string",
                    "description": "The vertical alignment of a node's label",
                    "enum": [
                      "top",
                      "center",
                      "bottom"
                    ]
                  },
                  "ghost": {
                    "type": "string",
                    "description": "Whether to use the ghost effect, a semitransparent duplicate of the element drawn at an offset.",
                    "default": "no",
                    "enum": [
                      "yes",
                      "no"
                    ]
                  },
                  "activeBgColor": {
                    "type": "string",
                    "description": "The colour of the indicator shown when the background is grabbed by the user. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "activeBgOpacity": {
                    "type": "string",
                    "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                    "maxLength": 50
                  },
                  "activeBgSize": {
                    "type": "string",
                    "description": "The opacity of the active background indicator. Selector needs to be *core*.",
                    "maxLength": 50
                  },
                  "selectionBoxColor": {
                    "type": "string",
                    "description": "The background colour of the selection box used for drag selection. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "selectionBoxBorderWidth": {
                    "type": "number",
                    "description": "The size of the border on the selection box. Selector needs to be *core*",
                    "minimum": 0
                  },
                  "selectionBoxOpacity": {
                    "type": "number",
                    "description": "The opacity of the selection box. Selector needs to be *core*",
                    "minimum": 0,
                    "maximum": 1
                  },
                  "outsideTextureBgColor": {
                    "type": "string",
                    "description": "The colour of the area outside the viewport texture when initOptions.textureOnViewport === true. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "outsideTextureBgOpacity": {
                    "type": "number",
                    "description": "The opacity of the area outside the viewport texture. Selector needs to be *core*",
                    "minimum": 0,
                    "maximum": 1
                  },
                  "shapePolygonPoints": {
                    "type": "string",
                    "description": "An array (or a space-separated string) of numbers ranging on [-1, 1], representing alternating x and y values (i.e. x1 y1 x2 y2, x3 y3 ...). This represents the points in the polygon for the node's shape. The bounding box of the node is given by (-1, -1), (1, -1), (1, 1), (-1, 1). The node's position is the origin (0, 0 )",
                    "maxLength": 2000
                  },
                  "menuBackgroundColor": {
                    "type": "string",
                    "description": "The colour of the background of the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  },
                  "menuBackgroundOpacity": {
                    "type": "number",
                    "description": "The opacity of the background of the component menu.",
                    "minimum": 0,
                    "maximum": 1
                  },
                  "menuForgroundColor": {
                    "type": "string",
                    "description": "The colour of the text or icons in the component menu. Colours may be specified by name (e.g. red), hex (e.g.",
                    "maxLength": 100
                  }
                }
              }
            ]
          },
          "status": {
            "type": "string",
            "description": "Connection status",
            "x-oapi-codegen-extra-tags": {
              "json": "status"
            },
            "maxLength": 255
          },
          "credentialId": {
            "type": "string",
            "format": "uuid",
            "description": "Associated credential ID",
            "x-go-name": "CredentialID",
            "x-oapi-codegen-extra-tags": {
              "json": "credentialId,omitempty"
            }
          }
        },
        "required": [
          "name",
          "kind",
          "type",
          "subType",
          "status"
        ]
      },
      "ConnectionRegistrationEvent": {
        "type": "object",
        "description": "Lifecycle event for the connection registration state machine (POST /api/integrations/connections/register). Unlike `ConnectionPayload`, only `kind` and `status` are always present: an `initialize` event carries just the kind, while `register` / `connect` events carry the connection details assembled so far.",
        "additionalProperties": false,
        "required": [
          "kind",
          "status"
        ],
        "properties": {
          "id": {
            "description": "Registration process tracker. Returned by the `initialize` bootstrap or minted client-side; echoed on every subsequent event for the same registration.",
            "x-go-name": "ID",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "id,omitempty"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "kind": {
            "type": "string",
            "description": "Connection kind (e.g. `kubernetes`, `grafana`, `prometheus`).",
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "json": "kind"
            }
          },
          "status": {
            "type": "string",
            "description": "State-machine event to dispatch. `initialize` returns the registration bootstrap; every other event advances the tracked registration. `not found` is the machine's literal event name.",
            "enum": [
              "initialize",
              "discovery",
              "register",
              "connect",
              "disconnect",
              "ignore",
              "delete",
              "not found",
              "noop",
              "exit"
            ],
            "x-oapi-codegen-extra-tags": {
              "json": "status"
            }
          },
          "name": {
            "type": "string",
            "description": "Connection name.",
            "maxLength": 255,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "name,omitempty"
            }
          },
          "type": {
            "type": "string",
            "description": "Connection type.",
            "maxLength": 255,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "type,omitempty"
            }
          },
          "subType": {
            "type": "string",
            "description": "Connection sub-type.",
            "maxLength": 255,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "subType,omitempty"
            }
          },
          "model": {
            "type": "string",
            "description": "Registry model the connection's definition belongs to.",
            "maxLength": 255,
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "model,omitempty"
            }
          },
          "metadata": {
            "type": "object",
            "description": "Connection metadata gathered so far in the flow.",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "metadata,omitempty"
            }
          },
          "credentialSecret": {
            "type": "object",
            "description": "Credential secret material for the connection.",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "credentialSecret,omitempty"
            }
          },
          "credentialId": {
            "description": "Existing credential to associate instead of a new secret.",
            "x-go-name": "CredentialID",
            "x-oapi-codegen-extra-tags": {
              "json": "credentialId,omitempty"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "skipCredentialVerification": {
            "type": "boolean",
            "description": "When true the server registers the connection without verifying the supplied credential first.",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "skipCredentialVerification"
            }
          }
        }
      },
      "ConnectionRegistrationBootstrap": {
        "type": "object",
        "description": "Response to an `initialize` registration event: the registry component definitions describing the kind's connection and credential, plus the tracker id for the registration process. Component definitions carry their RJSF form schema as a JSON-encoded string under `schema`.",
        "additionalProperties": false,
        "required": [
          "id",
          "connection"
        ],
        "properties": {
          "id": {
            "description": "Registration process tracker to echo on subsequent events.",
            "x-go-name": "ID",
            "x-oapi-codegen-extra-tags": {
              "json": "id"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "connection": {
            "type": "object",
            "description": "Registry component definition (`{Kind}Connection`) describing the connection, including its JSON-encoded `schema`.",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "connection"
            }
          },
          "credential": {
            "type": "object",
            "description": "Registry component definition (`{Kind}Credential`) describing the credential, including its JSON-encoded `schema`. Absent when the kind defines no credential component.",
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "credential,omitempty"
            }
          }
        }
      },
      "ConnectionStatusInfo": {
        "type": "object",
        "description": "Status count information for connections",
        "properties": {
          "status": {
            "type": "string",
            "description": "Status value",
            "x-oapi-codegen-extra-tags": {
              "json": "status",
              "db": "status"
            },
            "maxLength": 255
          },
          "count": {
            "type": "integer",
            "description": "Number of connections with this status",
            "x-oapi-codegen-extra-tags": {
              "json": "count",
              "db": "count"
            },
            "minimum": 0
          }
        },
        "required": [
          "status",
          "count"
        ]
      },
      "ConnectionsStatusPage": {
        "type": "object",
        "description": "Paginated list of connection status counts",
        "properties": {
          "totalCount": {
            "type": "integer",
            "description": "Total number of status entries",
            "x-oapi-codegen-extra-tags": {
              "json": "totalCount"
            },
            "minimum": 0
          },
          "page": {
            "type": "integer",
            "description": "Current page number",
            "x-oapi-codegen-extra-tags": {
              "json": "page"
            },
            "minimum": 0
          },
          "pageSize": {
            "type": "integer",
            "description": "Number of items per page",
            "x-oapi-codegen-extra-tags": {
              "json": "pageSize"
            },
            "minimum": 1
          },
          "connectionsStatus": {
            "type": "array",
            "description": "List of status counts",
            "items": {
              "type": "object",
              "description": "Status count information for connections",
              "properties": {
                "status": {
                  "type": "string",
                  "description": "Status value",
                  "x-oapi-codegen-extra-tags": {
                    "json": "status",
                    "db": "status"
                  },
                  "maxLength": 255
                },
                "count": {
                  "type": "integer",
                  "description": "Number of connections with this status",
                  "x-oapi-codegen-extra-tags": {
                    "json": "count",
                    "db": "count"
                  },
                  "minimum": 0
                }
              },
              "required": [
                "status",
                "count"
              ]
            },
            "x-oapi-codegen-extra-tags": {
              "json": "connectionsStatus"
            }
          }
        },
        "required": [
          "totalCount",
          "page",
          "pageSize",
          "connectionsStatus"
        ]
      },
      "MesheryInstance": {
        "type": "object",
        "description": "Meshery server instance information",
        "properties": {
          "id": {
            "type": "string",
            "description": "Instance ID",
            "x-oapi-codegen-extra-tags": {
              "json": "id,omitempty",
              "db": "id"
            },
            "maxLength": 500,
            "format": "uuid"
          },
          "name": {
            "type": "string",
            "description": "Instance name",
            "x-oapi-codegen-extra-tags": {
              "json": "name,omitempty",
              "db": "name"
            },
            "minLength": 1,
            "maxLength": 255
          },
          "serverId": {
            "type": "string",
            "description": "Server ID",
            "x-go-name": "ServerID",
            "x-oapi-codegen-extra-tags": {
              "json": "serverId,omitempty",
              "db": "server_id"
            },
            "maxLength": 500,
            "format": "uuid"
          },
          "serverVersion": {
            "type": "string",
            "description": "Meshery server version",
            "x-oapi-codegen-extra-tags": {
              "json": "serverVersion,omitempty",
              "db": "server_version"
            },
            "maxLength": 500
          },
          "serverLocation": {
            "type": "string",
            "description": "Server location URL",
            "x-oapi-codegen-extra-tags": {
              "json": "serverLocation,omitempty",
              "db": "server_location"
            },
            "maxLength": 500
          },
          "serverBuildSha": {
            "type": "string",
            "description": "Server build SHA",
            "x-go-name": "ServerBuildSHA",
            "x-oapi-codegen-extra-tags": {
              "json": "serverBuildSha,omitempty",
              "db": "server_build_sha"
            },
            "maxLength": 500
          },
          "createdAt": {
            "type": "string",
            "description": "Creation timestamp",
            "x-oapi-codegen-extra-tags": {
              "json": "createdAt,omitempty",
              "db": "created_at"
            },
            "format": "date-time"
          },
          "updatedAt": {
            "type": "string",
            "description": "Last update timestamp",
            "x-oapi-codegen-extra-tags": {
              "json": "updatedAt,omitempty",
              "db": "updated_at"
            },
            "format": "date-time"
          },
          "deletedAt": {
            "type": "string",
            "description": "Deletion timestamp",
            "x-oapi-codegen-extra-tags": {
              "json": "deletedAt,omitempty",
              "db": "deleted_at"
            },
            "format": "date-time"
          }
        }
      },
      "MesheryInstancePage": {
        "type": "object",
        "description": "Paginated list of Meshery instances",
        "properties": {
          "mesheryInstances": {
            "type": "array",
            "description": "List of Meshery instances",
            "items": {
              "type": "object",
              "description": "Meshery server instance information",
              "properties": {
                "id": {
                  "type": "string",
                  "description": "Instance ID",
                  "x-oapi-codegen-extra-tags": {
                    "json": "id,omitempty",
                    "db": "id"
                  },
                  "maxLength": 500,
                  "format": "uuid"
                },
                "name": {
                  "type": "string",
                  "description": "Instance name",
                  "x-oapi-codegen-extra-tags": {
                    "json": "name,omitempty",
                    "db": "name"
                  },
                  "minLength": 1,
                  "maxLength": 255
                },
                "serverId": {
                  "type": "string",
                  "description": "Server ID",
                  "x-go-name": "ServerID",
                  "x-oapi-codegen-extra-tags": {
                    "json": "serverId,omitempty",
                    "db": "server_id"
                  },
                  "maxLength": 500,
                  "format": "uuid"
                },
                "serverVersion": {
                  "type": "string",
                  "description": "Meshery server version",
                  "x-oapi-codegen-extra-tags": {
                    "json": "serverVersion,omitempty",
                    "db": "server_version"
                  },
                  "maxLength": 500
                },
                "serverLocation": {
                  "type": "string",
                  "description": "Server location URL",
                  "x-oapi-codegen-extra-tags": {
                    "json": "serverLocation,omitempty",
                    "db": "server_location"
                  },
                  "maxLength": 500
                },
                "serverBuildSha": {
                  "type": "string",
                  "description": "Server build SHA",
                  "x-go-name": "ServerBuildSHA",
                  "x-oapi-codegen-extra-tags": {
                    "json": "serverBuildSha,omitempty",
                    "db": "server_build_sha"
                  },
                  "maxLength": 500
                },
                "createdAt": {
                  "type": "string",
                  "description": "Creation timestamp",
                  "x-oapi-codegen-extra-tags": {
                    "json": "createdAt,omitempty",
                    "db": "created_at"
                  },
                  "format": "date-time"
                },
                "updatedAt": {
                  "type": "string",
                  "description": "Last update timestamp",
                  "x-oapi-codegen-extra-tags": {
                    "json": "updatedAt,omitempty",
                    "db": "updated_at"
                  },
                  "format": "date-time"
                },
                "deletedAt": {
                  "type": "string",
                  "description": "Deletion timestamp",
                  "x-oapi-codegen-extra-tags": {
                    "json": "deletedAt,omitempty",
                    "db": "deleted_at"
                  },
                  "format": "date-time"
                }
              }
            },
            "x-oapi-codegen-extra-tags": {
              "json": "mesheryInstances"
            }
          },
          "page": {
            "type": "integer",
            "description": "Current page number",
            "x-oapi-codegen-extra-tags": {
              "json": "page"
            },
            "minimum": 0
          },
          "pageSize": {
            "type": "integer",
            "description": "Number of items per page",
            "x-oapi-codegen-extra-tags": {
              "json": "pageSize"
            },
            "minimum": 1
          },
          "totalCount": {
            "type": "integer",
            "description": "Total number of instances",
            "x-oapi-codegen-extra-tags": {
              "json": "totalCount"
            },
            "minimum": 0
          }
        },
        "required": [
          "mesheryInstances",
          "page",
          "pageSize",
          "totalCount"
        ]
      },
      "MesheryCompatibility": {
        "type": "object",
        "description": "Meshery version compatibility check",
        "properties": {
          "mesheryVersion": {
            "type": "string",
            "description": "Meshery version string",
            "x-oapi-codegen-extra-tags": {
              "json": "mesheryVersion,omitempty"
            },
            "maxLength": 500
          },
          "checkCompatibility": {
            "type": "boolean",
            "description": "Whether to check compatibility",
            "x-oapi-codegen-extra-tags": {
              "json": "checkCompatibility,omitempty"
            }
          }
        }
      },
      "K8sContext": {
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
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-oapi-codegen-extra-tags": {
              "json": "owner,omitempty"
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
            "x-oapi-codegen-extra-tags": {
              "json": "createdBy,omitempty"
            }
          },
          "mesheryInstanceId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-name": "MesheryInstanceID",
            "x-oapi-codegen-extra-tags": {
              "json": "mesheryInstanceId,omitempty"
            }
          },
          "kubernetesServerId": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-name": "KubernetesServerID",
            "x-oapi-codegen-extra-tags": {
              "json": "kubernetesServerId,omitempty"
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
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-name": "ConnectionID",
            "x-go-type-skip-optional-pointer": true,
            "x-oapi-codegen-extra-tags": {
              "json": "connectionId,omitempty"
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
      },
      "ConnectionReachability": {
        "type": "boolean",
        "description": "Whether the system behind a connection answered an ad hoc connectivity probe. A probe is a point-in-time check of the connected system's endpoint; its result is never persisted with the connection. For example, probing a Kubernetes connection checks the cluster's API server."
      },
      "K8sContextPage": {
        "type": "object",
        "description": "Paginated list of Kubernetes contexts.",
        "required": [
          "page",
          "pageSize",
          "totalCount",
          "contexts"
        ],
        "properties": {
          "page": {
            "type": "integer",
            "description": "Zero-based page index returned in this response.",
            "minimum": 0,
            "x-oapi-codegen-extra-tags": {
              "json": "page"
            }
          },
          "pageSize": {
            "type": "integer",
            "description": "Maximum number of items returned on each page.",
            "minimum": 1,
            "x-oapi-codegen-extra-tags": {
              "json": "pageSize"
            }
          },
          "totalCount": {
            "type": "integer",
            "description": "Total number of items across all pages.",
            "minimum": 0,
            "x-oapi-codegen-extra-tags": {
              "json": "totalCount"
            }
          },
          "contexts": {
            "type": "array",
            "description": "Kubernetes contexts in this page.",
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
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "json": "owner,omitempty"
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
                  "x-oapi-codegen-extra-tags": {
                    "json": "createdBy,omitempty"
                  }
                },
                "mesheryInstanceId": {
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-go-name": "MesheryInstanceID",
                  "x-oapi-codegen-extra-tags": {
                    "json": "mesheryInstanceId,omitempty"
                  }
                },
                "kubernetesServerId": {
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-go-name": "KubernetesServerID",
                  "x-oapi-codegen-extra-tags": {
                    "json": "kubernetesServerId,omitempty"
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
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  },
                  "x-go-name": "ConnectionID",
                  "x-go-type-skip-optional-pointer": true,
                  "x-oapi-codegen-extra-tags": {
                    "json": "connectionId,omitempty"
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
            },
            "x-oapi-codegen-extra-tags": {
              "json": "contexts"
            }
          }
        }
      }
    }
  }
};

export default ConnectionSchema;
