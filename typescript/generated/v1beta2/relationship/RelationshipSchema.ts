/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const RelationshipSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Relationship",
    "description": "OpenAPI schema for relationship definitions between Meshery components.",
    "version": "v1beta2",
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
  "paths": {},
  "components": {
    "schemas": {
      "RelationshipDefinition": {
        "description": "Relationships define the nature of interaction between interconnected components in Meshery. The combination of relationship properties kind, type, and subtype characterize various genealogical relations among and between components. Relationships have selectors, selector sets, metadata, and optional parameters. Learn more at https://docs.meshery.io/concepts/logical/relationships.",
        "type": "object",
        "additionalProperties": false,
        "required": [
          "schemaVersion",
          "version",
          "model",
          "kind",
          "type",
          "subType",
          "id"
        ],
        "properties": {
          "id": {
            "description": "Uniquely identifies the entity",
            "x-go-type-skip-optional-pointer": true,
            "x-order": 1,
            "x-oapi-codegen-extra-tags": {
              "yaml": "id",
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
            "description": "Specifies the version of the schema used for the relationship definition.",
            "x-order": 8,
            "x-oapi-codegen-extra-tags": {
              "yaml": "schemaVersion",
              "json": "schemaVersion"
            },
            "type": "string",
            "minLength": 2,
            "maxLength": 100,
            "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
            "example": [
              "v1",
              "v1alpha1",
              "v2beta3",
              "v1.custom-suffix",
              "models.meshery.io/v1beta1",
              "capability.meshery.io/v1alpha1"
            ]
          },
          "version": {
            "description": "Specifies the version of the relationship definition.",
            "x-order": 13,
            "x-oapi-codegen-extra-tags": {
              "yaml": "version",
              "json": "version"
            },
            "type": "string",
            "minLength": 5,
            "maxLength": 100,
            "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
          },
          "kind": {
            "description": "Kind of the Relationship. Learn more about relationships - https://docs.meshery.io/concepts/logical/relationships.",
            "type": "string",
            "enum": [
              "hierarchical",
              "edge",
              "sibling"
            ],
            "x-order": 4,
            "x-oapi-codegen-extra-tags": {
              "yaml": "kind",
              "json": "kind"
            }
          },
          "type": {
            "description": "Classification of relationships. Used to group relationships similar in nature.",
            "type": "string",
            "x-go-name": "RelationshipType",
            "x-go-type-skip-optional-pointer": true,
            "x-order": 12,
            "x-oapi-codegen-extra-tags": {
              "yaml": "type",
              "json": "type",
              "gorm": "column:type"
            },
            "maxLength": 255
          },
          "subType": {
            "description": "Most granular unit of relationship classification. The combination of Kind, Type and SubType together uniquely identify a Relationship.",
            "type": "string",
            "x-go-type-skip-optional-pointer": true,
            "x-order": 10,
            "x-oapi-codegen-extra-tags": {
              "yaml": "subType",
              "json": "subType"
            },
            "maxLength": 255
          },
          "status": {
            "type": "string",
            "description": "Status of the relationship.",
            "enum": [
              "enabled",
              "ignored",
              "deleted",
              "approved",
              "pending"
            ],
            "x-order": 11,
            "x-oapi-codegen-extra-tags": {
              "yaml": "status",
              "json": "status"
            }
          },
          "capabilities": {
            "type": "array",
            "description": "Capabilities associated with the relationship.",
            "x-order": 2,
            "items": {
              "x-go-type": "capabilityv1beta1.Capability",
              "x-go-type-import": {
                "path": "github.com/meshery/schemas/models/v1beta1/capability",
                "name": "capabilityv1beta1"
              },
              "$id": "https://schemas.meshery.io/capability.yaml",
              "$schema": "http://json-schema.org/draft-07/schema#",
              "description": "Meshery manages entities in accordance with their specific capabilities. This field explicitly identifies those capabilities largely by what actions a given component supports; e.g. metric-scrape, sub-interface, and so on. This field is extensible. Entities may define a broad array of capabilities, which are in-turn dynamically interpretted by Meshery for full lifecycle management.",
              "additionalProperties": false,
              "type": "object",
              "required": [
                "description",
                "schemaVersion",
                "version",
                "displayName",
                "kind",
                "type",
                "subType",
                "entityState",
                "key",
                "status"
              ],
              "x-oapi-codegen-extra-tags": {
                "gorm": "type:bytes;serializer:json"
              },
              "properties": {
                "schemaVersion": {
                  "description": "Specifies the version of the schema to which the capability definition conforms.",
                  "type": "string",
                  "minLength": 2,
                  "maxLength": 100,
                  "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+)([.-][a-z0-9]+)*$",
                  "example": [
                    "v1",
                    "v1alpha1",
                    "v2beta3",
                    "v1.custom-suffix",
                    "models.meshery.io/v1beta1",
                    "capability.meshery.io/v1alpha1"
                  ]
                },
                "version": {
                  "description": "Version of the capability definition.",
                  "type": "string",
                  "minLength": 5,
                  "maxLength": 100,
                  "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
                },
                "displayName": {
                  "description": "Name of the capability in human-readible format.",
                  "type": "string",
                  "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
                },
                "description": {
                  "type": "string",
                  "description": "A written representation of the purpose and characteristics of the capability.",
                  "maxLength": 5000
                },
                "kind": {
                  "description": "Top-level categorization of the capability",
                  "additionalProperties": false,
                  "anyOf": [
                    {
                      "const": "action",
                      "description": "For capabilities related to executing actions on entities. Example: initiate log streaming on a Pod. Example: initiate deployment of a component."
                    },
                    {
                      "const": "mutate",
                      "description": "For capabilities related to mutating an entity. Example: the ability to change the configuration of a component."
                    },
                    {
                      "const": "view",
                      "description": "For capabilities related to viewing an entity. Example: the ability to view a components configuration."
                    },
                    {
                      "const": "interaction",
                      "description": "Catch all for capabilities related to interaction with entities. Example: the ability for a component to be dragged and dropped. Example: supports event bubbling to parent components. "
                    }
                  ],
                  "type": "string",
                  "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
                },
                "type": {
                  "description": "Classification of capabilities. Used to group capabilities similar in nature.",
                  "type": "string",
                  "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
                },
                "subType": {
                  "description": "Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Capability.",
                  "type": "string",
                  "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
                },
                "key": {
                  "description": "Key that backs the capability.",
                  "type": "string",
                  "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$"
                },
                "entityState": {
                  "description": "State of the entity in which the capability is applicable.",
                  "type": "array",
                  "items": {
                    "type": "string",
                    "enum": [
                      "declaration",
                      "instance"
                    ],
                    "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
                    "description": "A string starting with an alphanumeric character. Spaces and hyphens allowed."
                  }
                },
                "status": {
                  "type": "string",
                  "description": "Status of the capability",
                  "default": "enabled",
                  "enum": [
                    "enabled",
                    "disabled"
                  ]
                },
                "metadata": {
                  "type": "object",
                  "description": "Metadata contains additional information associated with the capability. Extension point.",
                  "additionalProperties": true
                }
              },
              "default": [
                {
                  "description": "Configure the visual styles for the component",
                  "displayName": "Styling",
                  "entityState": [
                    "declaration"
                  ],
                  "key": "",
                  "kind": "mutate",
                  "schemaVersion": "capability.meshery.io/v1beta1",
                  "status": "enabled",
                  "subType": "",
                  "type": "style",
                  "version": "0.7.0"
                },
                {
                  "description": "Change the shape of the component",
                  "displayName": "Change Shape",
                  "entityState": [
                    "declaration"
                  ],
                  "key": "",
                  "kind": "mutate",
                  "schemaVersion": "capability.meshery.io/v1beta1",
                  "status": "enabled",
                  "subType": "shape",
                  "type": "style",
                  "version": "0.7.0"
                },
                {
                  "description": "Drag and Drop a component into a parent component in graph view",
                  "displayName": "Compound Drag And Drop",
                  "entityState": [
                    "declaration"
                  ],
                  "key": "",
                  "kind": "interaction",
                  "schemaVersion": "capability.meshery.io/v1beta1",
                  "status": "enabled",
                  "subType": "compoundDnd",
                  "type": "graph",
                  "version": "0.7.0"
                },
                {
                  "description": "Add text to nodes body",
                  "displayName": "Body Text",
                  "entityState": [
                    "declaration"
                  ],
                  "key": "",
                  "kind": "mutate",
                  "schemaVersion": "capability.meshery.io/v1beta1",
                  "status": "enabled",
                  "subType": "body-text",
                  "type": "style",
                  "version": "0.7.0"
                }
              ]
            },
            "x-oapi-codegen-extra-tags": {
              "yaml": "capabilities",
              "json": "capabilities,omitempty",
              "gorm": "type:bytes;serializer:json"
            }
          },
          "metadata": {
            "x-go-type": "RelationshipMetadata",
            "x-order": 5,
            "x-oapi-codegen-extra-tags": {
              "gorm": "column:metadata;type:bytes;serializer:json",
              "yaml": "metadata",
              "json": "metadata,omitempty"
            },
            "type": "object",
            "description": "Metadata contains additional information associated with the Relationship.",
            "additionalProperties": true,
            "x-go-name": "RelationshipMetadata",
            "properties": {
              "description": {
                "description": "Characterization of the meaning of the relationship and its relevance to both Meshery and entities under management.",
                "type": "string",
                "x-oapi-codegen-extra-tags": {
                  "json": "description"
                },
                "maxLength": 5000
              },
              "styles": {
                "x-go-type": "RelationshipDefinitionMetadataStyles",
                "x-oapi-codegen-extra-tags": {
                  "json": "styles"
                },
                "type": "object",
                "description": "Visualization styles for a relationship",
                "required": [
                  "primaryColor",
                  "svgColor",
                  "svgWhite"
                ],
                "properties": {
                  "primaryColor": {
                    "type": "string",
                    "description": "Primary color of the component used for UI representation.",
                    "x-oapi-codegen-extra-tags": {
                      "json": "primaryColor"
                    },
                    "maxLength": 500
                  },
                  "secondaryColor": {
                    "type": "string",
                    "description": "Secondary color of the entity used for UI representation.",
                    "x-oapi-codegen-extra-tags": {
                      "json": "secondaryColor,omitempty"
                    },
                    "maxLength": 500
                  },
                  "svgWhite": {
                    "type": "string",
                    "description": "White SVG of the entity used for UI representation on dark background.",
                    "x-oapi-codegen-extra-tags": {
                      "json": "svgWhite"
                    },
                    "maxLength": 500
                  },
                  "svgColor": {
                    "type": "string",
                    "description": "Colored SVG of the entity used for UI representation on light background.",
                    "x-oapi-codegen-extra-tags": {
                      "json": "svgColor"
                    },
                    "maxLength": 500
                  },
                  "svgComplete": {
                    "type": "string",
                    "description": "Complete SVG of the entity used for UI representation, often inclusive of background.",
                    "x-oapi-codegen-extra-tags": {
                      "json": "svgComplete,omitempty"
                    },
                    "maxLength": 500
                  },
                  "color": {
                    "type": "string",
                    "description": "The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g.",
                    "x-oapi-codegen-extra-tags": {
                      "json": "color,omitempty"
                    },
                    "maxLength": 500
                  },
                  "textOpacity": {
                    "type": "number",
                    "format": "float",
                    "description": "The opacity of the label text, including its outline.",
                    "x-go-name": "TextOpacity",
                    "x-oapi-codegen-extra-tags": {
                      "json": "textOpacity,omitempty"
                    },
                    "minimum": 0,
                    "maximum": 1
                  },
                  "fontFamily": {
                    "type": "string",
                    "description": "A comma-separated list of font names to use on the label text.",
                    "x-go-name": "FontFamily",
                    "x-oapi-codegen-extra-tags": {
                      "json": "fontFamily,omitempty"
                    },
                    "maxLength": 500
                  },
                  "fontSize": {
                    "type": "string",
                    "description": "The size of the label text.",
                    "x-go-name": "FontSize",
                    "x-oapi-codegen-extra-tags": {
                      "json": "fontSize,omitempty"
                    },
                    "maxLength": 500
                  },
                  "fontStyle": {
                    "type": "string",
                    "description": "A CSS font style to be applied to the label text.",
                    "x-go-name": "FontStyle",
                    "x-oapi-codegen-extra-tags": {
                      "json": "fontStyle,omitempty"
                    },
                    "maxLength": 500
                  },
                  "fontWeight": {
                    "type": "string",
                    "description": "A CSS font weight to be applied to the label text.",
                    "x-go-name": "FontWeight",
                    "x-oapi-codegen-extra-tags": {
                      "json": "fontWeight,omitempty"
                    },
                    "maxLength": 500
                  },
                  "textTransform": {
                    "description": "A transformation to apply to the label text",
                    "x-go-name": "TextTransform",
                    "x-oapi-codegen-extra-tags": {
                      "json": "textTransform,omitempty"
                    },
                    "type": "string",
                    "enum": [
                      "none",
                      "uppercase",
                      "lowercase"
                    ]
                  },
                  "opacity": {
                    "type": "number",
                    "format": "float",
                    "description": "The opacity of the element, ranging from 0 to 1. Note that the opacity of a compound node parent affects the effective opacity of its children.See https://js.cytoscape.org/#style/visibility",
                    "x-go-name": "Opacity",
                    "x-oapi-codegen-extra-tags": {
                      "json": "opacity,omitempty"
                    },
                    "minimum": 0,
                    "maximum": 1
                  },
                  "zIndex": {
                    "type": "integer",
                    "description": "An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index.",
                    "x-go-name": "ZIndex",
                    "x-oapi-codegen-extra-tags": {
                      "json": "zIndex,omitempty"
                    },
                    "minimum": 0
                  },
                  "label": {
                    "type": "string",
                    "description": "The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id",
                    "x-go-name": "Label",
                    "x-oapi-codegen-extra-tags": {
                      "json": "label,omitempty"
                    },
                    "maxLength": 500
                  },
                  "edgeAnimation": {
                    "type": "string",
                    "description": "The animation to use for the edge. Can be like 'marching-ants' , 'blink' , 'moving-gradient',etc .",
                    "x-go-name": "EdgeAnimation",
                    "x-oapi-codegen-extra-tags": {
                      "json": "edgeAnimation,omitempty"
                    },
                    "maxLength": 500
                  },
                  "curveStyle": {
                    "x-go-name": "CurveStyle",
                    "x-oapi-codegen-extra-tags": {
                      "json": "curveStyle,omitempty"
                    },
                    "type": "string",
                    "description": "The curving method used to separate two or more edges between two nodes; may be haystack (very fast, bundled straight edges for which loops and compounds are unsupported), straight (straight edges with all arrows supported), bezier (bundled curved edges), unbundled-bezier (curved edges for use with manual control points), segments (a series of straight lines), taxi (right-angled lines, hierarchically bundled). Note that haystack edges work best with ellipse, rectangle, or similar nodes. Smaller node shapes, like triangle, will not be as aesthetically pleasing. Also note that edge endpoint arrows are unsupported for haystack edges.",
                    "enum": [
                      "haystack",
                      "straight",
                      "bezier",
                      "unbundled-bezier",
                      "segments",
                      "taxi"
                    ]
                  },
                  "lineColor": {
                    "type": "string",
                    "description": "The colour of the edge's line. Colours may be specified by name (e.g. red), hex (e.g.",
                    "x-go-name": "LineColor",
                    "x-oapi-codegen-extra-tags": {
                      "json": "lineColor,omitempty"
                    },
                    "maxLength": 500
                  },
                  "lineStyle": {
                    "x-go-name": "LineStyle",
                    "x-oapi-codegen-extra-tags": {
                      "json": "lineStyle,omitempty"
                    },
                    "type": "string",
                    "description": "The style of the edge's line.",
                    "enum": [
                      "solid",
                      "dotted",
                      "dashed"
                    ]
                  },
                  "lineCap": {
                    "x-go-name": "LineCap",
                    "x-oapi-codegen-extra-tags": {
                      "json": "lineCap,omitempty"
                    },
                    "type": "string",
                    "description": "The cap style of the edge's line; may be butt (default), round, or square. The cap may or may not be visible, depending on the shape of the node and the relative size of the node and edge. Caps other than butt extend beyond the specified endpoint of the edge.",
                    "enum": [
                      "butt",
                      "round",
                      "square"
                    ]
                  },
                  "lineOpacity": {
                    "type": "number",
                    "format": "float",
                    "description": "The opacity of the edge's line and arrow. Useful if you wish to have a separate opacity for the edge label versus the edge line. Note that the opacity value of the edge element affects the effective opacity of its line and label subcomponents.",
                    "x-go-name": "LineOpacity",
                    "x-oapi-codegen-extra-tags": {
                      "json": "lineOpacity,omitempty"
                    },
                    "minimum": 0,
                    "maximum": 1
                  },
                  "targetArrowColor": {
                    "type": "string",
                    "description": "The colour of the edge's source arrow. Colours may be specified by name (e.g. red), hex (e.g.",
                    "x-go-name": "TargetArrowColor",
                    "x-oapi-codegen-extra-tags": {
                      "json": "targetArrowColor,omitempty"
                    },
                    "maxLength": 500
                  },
                  "targetArrowShape": {
                    "x-go-name": "TargetArrowShape",
                    "x-oapi-codegen-extra-tags": {
                      "json": "targetArrowShape,omitempty"
                    },
                    "type": "string",
                    "description": "The shape of the edge's source arrow",
                    "enum": [
                      "triangle",
                      "triangle-tee",
                      "circle-triangle",
                      "triangle-cross",
                      "triangle-backcurve",
                      "vee",
                      "tee",
                      "square",
                      "circle",
                      "diamond",
                      "chevron",
                      "none"
                    ]
                  },
                  "targetArrowFill": {
                    "x-go-name": "TargetArrowFill",
                    "x-oapi-codegen-extra-tags": {
                      "json": "targetArrowFill,omitempty"
                    },
                    "type": "string",
                    "description": "The fill state of the edge's source arrow",
                    "enum": [
                      "filled",
                      "hollow"
                    ]
                  },
                  "midTargetArrowColor": {
                    "type": "string",
                    "description": "The colour of the edge's source arrow. Colours may be specified by name (e.g. red), hex (e.g.",
                    "x-go-name": "MidTargetArrowColor",
                    "x-oapi-codegen-extra-tags": {
                      "json": "midTargetArrowColor,omitempty"
                    },
                    "maxLength": 500
                  },
                  "midTargetArrowShape": {
                    "x-go-name": "MidTargetArrowShape",
                    "x-oapi-codegen-extra-tags": {
                      "json": "midTargetArrowShape,omitempty"
                    },
                    "type": "string",
                    "description": "The shape of the edge's source arrow",
                    "enum": [
                      "triangle",
                      "triangle-tee",
                      "circle-triangle",
                      "triangle-cross",
                      "triangle-backcurve",
                      "vee",
                      "tee",
                      "square",
                      "circle",
                      "diamond",
                      "chevron",
                      "none"
                    ]
                  },
                  "midTargetArrowFill": {
                    "x-go-name": "MidTargetArrowFill",
                    "x-oapi-codegen-extra-tags": {
                      "json": "midTargetArrowFill,omitempty"
                    },
                    "type": "string",
                    "description": "The fill state of the edge's source arrow",
                    "enum": [
                      "filled",
                      "hollow"
                    ]
                  },
                  "arrowScale": {
                    "type": "number",
                    "format": "float",
                    "description": "Scaling for the arrow size.",
                    "x-go-name": "ArrowScale",
                    "x-oapi-codegen-extra-tags": {
                      "json": "arrowScale,omitempty"
                    },
                    "minimum": 0
                  },
                  "sourceLabel": {
                    "type": "string",
                    "description": "The text to display for an edge's source label. Can give a path, e.g. data(id) will label with the elements id",
                    "x-go-name": "SourceLabel",
                    "x-oapi-codegen-extra-tags": {
                      "json": "sourceLabel,omitempty"
                    },
                    "maxLength": 500
                  },
                  "targetLabel": {
                    "type": "string",
                    "description": "The text to display for an edge's target label. Can give a path, e.g. data(id) will label with the elements id",
                    "x-go-name": "TargetLabel",
                    "x-oapi-codegen-extra-tags": {
                      "json": "targetLabel,omitempty"
                    },
                    "maxLength": 500
                  }
                }
              },
              "isAnnotation": {
                "type": "boolean",
                "description": "Indicates whether the relationship should be treated as a logical representation only",
                "x-oapi-codegen-extra-tags": {
                  "json": "isAnnotation"
                }
              }
            }
          },
          "model": {
            "x-go-type": "modelv1beta1.ModelReference",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/v1beta1/model",
              "name": "modelv1beta1"
            },
            "x-go-type-skip-optional-pointer": true,
            "x-order": 6,
            "description": "Model Reference to the specific registered model to which the component belongs and from which model version, category, and other properties may be referenced. Learn more at https://docs.meshery.io/concepts/models",
            "x-oapi-codegen-extra-tags": {
              "yaml": "model",
              "json": "model",
              "gorm": "type:bytes;serializer:json"
            },
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
          "model_id": {
            "x-go-type-skip-optional-pointer": true,
            "x-go-name": "ModelId",
            "x-order": 7,
            "description": "Foreign key reference to the model",
            "x-oapi-codegen-extra-tags": {
              "json": "-",
              "gorm": "index:idx_relationship_definition_dbs_model_id,column:model_id"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "evaluationQuery": {
            "description": "Optional. Assigns the policy to be used for the evaluation of the relationship. Deprecation Notice: In the future, this property is either to be removed or to it is to be an array of optional policy $refs.",
            "type": "string",
            "x-order": 3,
            "x-oapi-codegen-extra-tags": {
              "yaml": "evaluationQuery",
              "json": "evaluationQuery"
            },
            "maxLength": 500
          },
          "selectors": {
            "x-go-type": "SelectorSet",
            "x-order": 9,
            "x-oapi-codegen-extra-tags": {
              "gorm": "type:bytes;serializer:json",
              "yaml": "selectors,omitempty",
              "json": "selectors,omitempty"
            },
            "type": "array",
            "description": "Selectors are organized as an array, with each item containing a distinct set of selectors that share a common functionality. This structure allows for flexibility in defining relationships, even when different components are involved.",
            "items": {
              "x-go-type": "SelectorSetItem",
              "type": "object",
              "description": "Optional selectors used to match Components. Absence of a selector means that it is applied to all Components.",
              "required": [
                "allow"
              ],
              "properties": {
                "allow": {
                  "description": "Selectors used to define relationships which are allowed.",
                  "x-go-type": "Selector",
                  "x-oapi-codegen-extra-tags": {
                    "json": "allow"
                  },
                  "type": "object",
                  "required": [
                    "from",
                    "to"
                  ],
                  "properties": {
                    "from": {
                      "description": "Describes the component(s) which are involved in the relationship along with a set of actions to perform upon selection match.",
                      "type": "array",
                      "items": {
                        "x-go-type": "SelectorItem",
                        "type": "object",
                        "description": "Optional fields that are a part of the selector. Absence of a field has an implied * meaning.",
                        "properties": {
                          "id": {
                            "x-oapi-codegen-extra-tags": {
                              "json": "id"
                            },
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "kind": {
                            "type": "string",
                            "x-oapi-codegen-extra-tags": {
                              "json": "kind"
                            },
                            "description": "Kind of the resource.",
                            "maxLength": 255
                          },
                          "match": {
                            "x-go-type": "MatchSelector",
                            "x-oapi-codegen-extra-tags": {
                              "json": "match,omitempty"
                            },
                            "type": "object",
                            "description": "Match configuration for selector",
                            "properties": {
                              "refs": {
                                "type": "array",
                                "items": {
                                  "type": "array",
                                  "items": {
                                    "type": "string"
                                  }
                                },
                                "x-oapi-codegen-extra-tags": {
                                  "json": "refs,omitempty"
                                },
                                "description": "The refs of the matchselector."
                              },
                              "from": {
                                "type": "array",
                                "items": {
                                  "x-go-type": "MatchSelectorItem",
                                  "type": "object",
                                  "description": "Match selector item for binding between nodes",
                                  "required": [
                                    "kind"
                                  ],
                                  "properties": {
                                    "id": {
                                      "x-oapi-codegen-extra-tags": {
                                        "json": "id"
                                      },
                                      "type": "string",
                                      "format": "uuid",
                                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                      "x-go-type": "uuid.UUID",
                                      "x-go-type-import": {
                                        "path": "github.com/gofrs/uuid"
                                      }
                                    },
                                    "kind": {
                                      "type": "string",
                                      "x-oapi-codegen-extra-tags": {
                                        "json": "kind"
                                      },
                                      "description": "Kind of the resource.",
                                      "maxLength": 255
                                    },
                                    "mutatorRef": {
                                      "x-oapi-codegen-extra-tags": {
                                        "json": "mutatorRef,omitempty"
                                      },
                                      "type": "array",
                                      "description": "JSON ref to value from where patch should be applied.",
                                      "items": {
                                        "type": "array",
                                        "items": {
                                          "type": "string"
                                        },
                                        "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                                      }
                                    },
                                    "mutatedRef": {
                                      "x-oapi-codegen-extra-tags": {
                                        "json": "mutatedRef,omitempty"
                                      },
                                      "type": "array",
                                      "items": {
                                        "type": "array",
                                        "items": {
                                          "type": "string"
                                        },
                                        "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                                      }
                                    }
                                  }
                                },
                                "x-oapi-codegen-extra-tags": {
                                  "json": "from,omitempty"
                                },
                                "description": "The from of the matchselector."
                              },
                              "to": {
                                "type": "array",
                                "items": {
                                  "x-go-type": "MatchSelectorItem",
                                  "type": "object",
                                  "description": "Match selector item for binding between nodes",
                                  "required": [
                                    "kind"
                                  ],
                                  "properties": {
                                    "id": {
                                      "x-oapi-codegen-extra-tags": {
                                        "json": "id"
                                      },
                                      "type": "string",
                                      "format": "uuid",
                                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                      "x-go-type": "uuid.UUID",
                                      "x-go-type-import": {
                                        "path": "github.com/gofrs/uuid"
                                      }
                                    },
                                    "kind": {
                                      "type": "string",
                                      "x-oapi-codegen-extra-tags": {
                                        "json": "kind"
                                      },
                                      "description": "Kind of the resource.",
                                      "maxLength": 255
                                    },
                                    "mutatorRef": {
                                      "x-oapi-codegen-extra-tags": {
                                        "json": "mutatorRef,omitempty"
                                      },
                                      "type": "array",
                                      "description": "JSON ref to value from where patch should be applied.",
                                      "items": {
                                        "type": "array",
                                        "items": {
                                          "type": "string"
                                        },
                                        "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                                      }
                                    },
                                    "mutatedRef": {
                                      "x-oapi-codegen-extra-tags": {
                                        "json": "mutatedRef,omitempty"
                                      },
                                      "type": "array",
                                      "items": {
                                        "type": "array",
                                        "items": {
                                          "type": "string"
                                        },
                                        "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                                      }
                                    }
                                  }
                                },
                                "x-oapi-codegen-extra-tags": {
                                  "json": "to,omitempty"
                                },
                                "description": "The to of the matchselector."
                              }
                            }
                          },
                          "matchStrategyMatrix": {
                            "description": "Match strategy matrix for the selector",
                            "type": "array",
                            "items": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            },
                            "x-oapi-codegen-extra-tags": {
                              "json": "matchStrategyMatrix"
                            }
                          },
                          "model": {
                            "x-go-type": "modelv1beta1.ModelReference",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/v1beta1/model",
                              "name": "modelv1beta1"
                            },
                            "description": "Name of the model implicated by this selector. Learn more at https://docs.meshery.io/concepts/models",
                            "x-oapi-codegen-extra-tags": {
                              "json": "model,omitempty"
                            },
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
                          "patch": {
                            "x-go-type": "RelationshipDefinitionSelectorsPatch",
                            "x-oapi-codegen-extra-tags": {
                              "json": "patch"
                            },
                            "type": "object",
                            "description": "Patch configuration for the selector",
                            "x-go-name": "RelationshipDefinitionSelectorsPatch",
                            "properties": {
                              "patchStrategy": {
                                "x-oapi-codegen-extra-tags": {
                                  "json": "patchStrategy,omitempty"
                                },
                                "type": "string",
                                "description": "patchStrategy allows you to make specific changes to a resource using a standard JSON Patch format (RFC 6902).\n\nadd: Inserts a value into an array or adds a member to an object.\nmerge: Combines the values of the target location with the values from the patch. If the target location doesn't exist, it is created.\nstrategic: specific to Kubernetes and understands the structure of Kubernetes objects.\nremove: Removes a value.\ncopy: Copies a value from one location to another.\nmove: Moves a value from one location to another.\ntest: Tests that a value at the target location is equal to a specified value.\n",
                                "enum": [
                                  "merge",
                                  "strategic",
                                  "add",
                                  "remove",
                                  "copy",
                                  "move",
                                  "test"
                                ]
                              },
                              "mutatorRef": {
                                "x-oapi-codegen-extra-tags": {
                                  "json": "mutatorRef,omitempty"
                                },
                                "type": "array",
                                "description": "JSON ref to value from where patch should be applied.",
                                "items": {
                                  "type": "array",
                                  "items": {
                                    "type": "string"
                                  },
                                  "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                                }
                              },
                              "mutatedRef": {
                                "x-oapi-codegen-extra-tags": {
                                  "json": "mutatedRef,omitempty"
                                },
                                "type": "array",
                                "items": {
                                  "type": "array",
                                  "items": {
                                    "type": "string"
                                  },
                                  "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                                }
                              }
                            }
                          }
                        }
                      },
                      "x-oapi-codegen-extra-tags": {
                        "json": "from"
                      }
                    },
                    "to": {
                      "description": "Describes the component(s) which are involved in the relationship along with a set of actions to perform upon selection match.",
                      "type": "array",
                      "items": {
                        "x-go-type": "SelectorItem",
                        "type": "object",
                        "description": "Optional fields that are a part of the selector. Absence of a field has an implied * meaning.",
                        "properties": {
                          "id": {
                            "x-oapi-codegen-extra-tags": {
                              "json": "id"
                            },
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "kind": {
                            "type": "string",
                            "x-oapi-codegen-extra-tags": {
                              "json": "kind"
                            },
                            "description": "Kind of the resource.",
                            "maxLength": 255
                          },
                          "match": {
                            "x-go-type": "MatchSelector",
                            "x-oapi-codegen-extra-tags": {
                              "json": "match,omitempty"
                            },
                            "type": "object",
                            "description": "Match configuration for selector",
                            "properties": {
                              "refs": {
                                "type": "array",
                                "items": {
                                  "type": "array",
                                  "items": {
                                    "type": "string"
                                  }
                                },
                                "x-oapi-codegen-extra-tags": {
                                  "json": "refs,omitempty"
                                },
                                "description": "The refs of the matchselector."
                              },
                              "from": {
                                "type": "array",
                                "items": {
                                  "x-go-type": "MatchSelectorItem",
                                  "type": "object",
                                  "description": "Match selector item for binding between nodes",
                                  "required": [
                                    "kind"
                                  ],
                                  "properties": {
                                    "id": {
                                      "x-oapi-codegen-extra-tags": {
                                        "json": "id"
                                      },
                                      "type": "string",
                                      "format": "uuid",
                                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                      "x-go-type": "uuid.UUID",
                                      "x-go-type-import": {
                                        "path": "github.com/gofrs/uuid"
                                      }
                                    },
                                    "kind": {
                                      "type": "string",
                                      "x-oapi-codegen-extra-tags": {
                                        "json": "kind"
                                      },
                                      "description": "Kind of the resource.",
                                      "maxLength": 255
                                    },
                                    "mutatorRef": {
                                      "x-oapi-codegen-extra-tags": {
                                        "json": "mutatorRef,omitempty"
                                      },
                                      "type": "array",
                                      "description": "JSON ref to value from where patch should be applied.",
                                      "items": {
                                        "type": "array",
                                        "items": {
                                          "type": "string"
                                        },
                                        "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                                      }
                                    },
                                    "mutatedRef": {
                                      "x-oapi-codegen-extra-tags": {
                                        "json": "mutatedRef,omitempty"
                                      },
                                      "type": "array",
                                      "items": {
                                        "type": "array",
                                        "items": {
                                          "type": "string"
                                        },
                                        "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                                      }
                                    }
                                  }
                                },
                                "x-oapi-codegen-extra-tags": {
                                  "json": "from,omitempty"
                                },
                                "description": "The from of the matchselector."
                              },
                              "to": {
                                "type": "array",
                                "items": {
                                  "x-go-type": "MatchSelectorItem",
                                  "type": "object",
                                  "description": "Match selector item for binding between nodes",
                                  "required": [
                                    "kind"
                                  ],
                                  "properties": {
                                    "id": {
                                      "x-oapi-codegen-extra-tags": {
                                        "json": "id"
                                      },
                                      "type": "string",
                                      "format": "uuid",
                                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                      "x-go-type": "uuid.UUID",
                                      "x-go-type-import": {
                                        "path": "github.com/gofrs/uuid"
                                      }
                                    },
                                    "kind": {
                                      "type": "string",
                                      "x-oapi-codegen-extra-tags": {
                                        "json": "kind"
                                      },
                                      "description": "Kind of the resource.",
                                      "maxLength": 255
                                    },
                                    "mutatorRef": {
                                      "x-oapi-codegen-extra-tags": {
                                        "json": "mutatorRef,omitempty"
                                      },
                                      "type": "array",
                                      "description": "JSON ref to value from where patch should be applied.",
                                      "items": {
                                        "type": "array",
                                        "items": {
                                          "type": "string"
                                        },
                                        "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                                      }
                                    },
                                    "mutatedRef": {
                                      "x-oapi-codegen-extra-tags": {
                                        "json": "mutatedRef,omitempty"
                                      },
                                      "type": "array",
                                      "items": {
                                        "type": "array",
                                        "items": {
                                          "type": "string"
                                        },
                                        "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                                      }
                                    }
                                  }
                                },
                                "x-oapi-codegen-extra-tags": {
                                  "json": "to,omitempty"
                                },
                                "description": "The to of the matchselector."
                              }
                            }
                          },
                          "matchStrategyMatrix": {
                            "description": "Match strategy matrix for the selector",
                            "type": "array",
                            "items": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            },
                            "x-oapi-codegen-extra-tags": {
                              "json": "matchStrategyMatrix"
                            }
                          },
                          "model": {
                            "x-go-type": "modelv1beta1.ModelReference",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/v1beta1/model",
                              "name": "modelv1beta1"
                            },
                            "description": "Name of the model implicated by this selector. Learn more at https://docs.meshery.io/concepts/models",
                            "x-oapi-codegen-extra-tags": {
                              "json": "model,omitempty"
                            },
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
                          "patch": {
                            "x-go-type": "RelationshipDefinitionSelectorsPatch",
                            "x-oapi-codegen-extra-tags": {
                              "json": "patch"
                            },
                            "type": "object",
                            "description": "Patch configuration for the selector",
                            "x-go-name": "RelationshipDefinitionSelectorsPatch",
                            "properties": {
                              "patchStrategy": {
                                "x-oapi-codegen-extra-tags": {
                                  "json": "patchStrategy,omitempty"
                                },
                                "type": "string",
                                "description": "patchStrategy allows you to make specific changes to a resource using a standard JSON Patch format (RFC 6902).\n\nadd: Inserts a value into an array or adds a member to an object.\nmerge: Combines the values of the target location with the values from the patch. If the target location doesn't exist, it is created.\nstrategic: specific to Kubernetes and understands the structure of Kubernetes objects.\nremove: Removes a value.\ncopy: Copies a value from one location to another.\nmove: Moves a value from one location to another.\ntest: Tests that a value at the target location is equal to a specified value.\n",
                                "enum": [
                                  "merge",
                                  "strategic",
                                  "add",
                                  "remove",
                                  "copy",
                                  "move",
                                  "test"
                                ]
                              },
                              "mutatorRef": {
                                "x-oapi-codegen-extra-tags": {
                                  "json": "mutatorRef,omitempty"
                                },
                                "type": "array",
                                "description": "JSON ref to value from where patch should be applied.",
                                "items": {
                                  "type": "array",
                                  "items": {
                                    "type": "string"
                                  },
                                  "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                                }
                              },
                              "mutatedRef": {
                                "x-oapi-codegen-extra-tags": {
                                  "json": "mutatedRef,omitempty"
                                },
                                "type": "array",
                                "items": {
                                  "type": "array",
                                  "items": {
                                    "type": "string"
                                  },
                                  "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                                }
                              }
                            }
                          }
                        }
                      },
                      "x-oapi-codegen-extra-tags": {
                        "json": "to"
                      }
                    }
                  }
                },
                "deny": {
                  "description": "Optional selectors used to define relationships which should not be created / is restricted.",
                  "x-go-type": "Selector",
                  "x-oapi-codegen-extra-tags": {
                    "json": "deny,omitempty"
                  },
                  "type": "object",
                  "required": [
                    "from",
                    "to"
                  ],
                  "properties": {
                    "from": {
                      "description": "Describes the component(s) which are involved in the relationship along with a set of actions to perform upon selection match.",
                      "type": "array",
                      "items": {
                        "x-go-type": "SelectorItem",
                        "type": "object",
                        "description": "Optional fields that are a part of the selector. Absence of a field has an implied * meaning.",
                        "properties": {
                          "id": {
                            "x-oapi-codegen-extra-tags": {
                              "json": "id"
                            },
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "kind": {
                            "type": "string",
                            "x-oapi-codegen-extra-tags": {
                              "json": "kind"
                            },
                            "description": "Kind of the resource.",
                            "maxLength": 255
                          },
                          "match": {
                            "x-go-type": "MatchSelector",
                            "x-oapi-codegen-extra-tags": {
                              "json": "match,omitempty"
                            },
                            "type": "object",
                            "description": "Match configuration for selector",
                            "properties": {
                              "refs": {
                                "type": "array",
                                "items": {
                                  "type": "array",
                                  "items": {
                                    "type": "string"
                                  }
                                },
                                "x-oapi-codegen-extra-tags": {
                                  "json": "refs,omitempty"
                                },
                                "description": "The refs of the matchselector."
                              },
                              "from": {
                                "type": "array",
                                "items": {
                                  "x-go-type": "MatchSelectorItem",
                                  "type": "object",
                                  "description": "Match selector item for binding between nodes",
                                  "required": [
                                    "kind"
                                  ],
                                  "properties": {
                                    "id": {
                                      "x-oapi-codegen-extra-tags": {
                                        "json": "id"
                                      },
                                      "type": "string",
                                      "format": "uuid",
                                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                      "x-go-type": "uuid.UUID",
                                      "x-go-type-import": {
                                        "path": "github.com/gofrs/uuid"
                                      }
                                    },
                                    "kind": {
                                      "type": "string",
                                      "x-oapi-codegen-extra-tags": {
                                        "json": "kind"
                                      },
                                      "description": "Kind of the resource.",
                                      "maxLength": 255
                                    },
                                    "mutatorRef": {
                                      "x-oapi-codegen-extra-tags": {
                                        "json": "mutatorRef,omitempty"
                                      },
                                      "type": "array",
                                      "description": "JSON ref to value from where patch should be applied.",
                                      "items": {
                                        "type": "array",
                                        "items": {
                                          "type": "string"
                                        },
                                        "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                                      }
                                    },
                                    "mutatedRef": {
                                      "x-oapi-codegen-extra-tags": {
                                        "json": "mutatedRef,omitempty"
                                      },
                                      "type": "array",
                                      "items": {
                                        "type": "array",
                                        "items": {
                                          "type": "string"
                                        },
                                        "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                                      }
                                    }
                                  }
                                },
                                "x-oapi-codegen-extra-tags": {
                                  "json": "from,omitempty"
                                },
                                "description": "The from of the matchselector."
                              },
                              "to": {
                                "type": "array",
                                "items": {
                                  "x-go-type": "MatchSelectorItem",
                                  "type": "object",
                                  "description": "Match selector item for binding between nodes",
                                  "required": [
                                    "kind"
                                  ],
                                  "properties": {
                                    "id": {
                                      "x-oapi-codegen-extra-tags": {
                                        "json": "id"
                                      },
                                      "type": "string",
                                      "format": "uuid",
                                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                      "x-go-type": "uuid.UUID",
                                      "x-go-type-import": {
                                        "path": "github.com/gofrs/uuid"
                                      }
                                    },
                                    "kind": {
                                      "type": "string",
                                      "x-oapi-codegen-extra-tags": {
                                        "json": "kind"
                                      },
                                      "description": "Kind of the resource.",
                                      "maxLength": 255
                                    },
                                    "mutatorRef": {
                                      "x-oapi-codegen-extra-tags": {
                                        "json": "mutatorRef,omitempty"
                                      },
                                      "type": "array",
                                      "description": "JSON ref to value from where patch should be applied.",
                                      "items": {
                                        "type": "array",
                                        "items": {
                                          "type": "string"
                                        },
                                        "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                                      }
                                    },
                                    "mutatedRef": {
                                      "x-oapi-codegen-extra-tags": {
                                        "json": "mutatedRef,omitempty"
                                      },
                                      "type": "array",
                                      "items": {
                                        "type": "array",
                                        "items": {
                                          "type": "string"
                                        },
                                        "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                                      }
                                    }
                                  }
                                },
                                "x-oapi-codegen-extra-tags": {
                                  "json": "to,omitempty"
                                },
                                "description": "The to of the matchselector."
                              }
                            }
                          },
                          "matchStrategyMatrix": {
                            "description": "Match strategy matrix for the selector",
                            "type": "array",
                            "items": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            },
                            "x-oapi-codegen-extra-tags": {
                              "json": "matchStrategyMatrix"
                            }
                          },
                          "model": {
                            "x-go-type": "modelv1beta1.ModelReference",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/v1beta1/model",
                              "name": "modelv1beta1"
                            },
                            "description": "Name of the model implicated by this selector. Learn more at https://docs.meshery.io/concepts/models",
                            "x-oapi-codegen-extra-tags": {
                              "json": "model,omitempty"
                            },
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
                          "patch": {
                            "x-go-type": "RelationshipDefinitionSelectorsPatch",
                            "x-oapi-codegen-extra-tags": {
                              "json": "patch"
                            },
                            "type": "object",
                            "description": "Patch configuration for the selector",
                            "x-go-name": "RelationshipDefinitionSelectorsPatch",
                            "properties": {
                              "patchStrategy": {
                                "x-oapi-codegen-extra-tags": {
                                  "json": "patchStrategy,omitempty"
                                },
                                "type": "string",
                                "description": "patchStrategy allows you to make specific changes to a resource using a standard JSON Patch format (RFC 6902).\n\nadd: Inserts a value into an array or adds a member to an object.\nmerge: Combines the values of the target location with the values from the patch. If the target location doesn't exist, it is created.\nstrategic: specific to Kubernetes and understands the structure of Kubernetes objects.\nremove: Removes a value.\ncopy: Copies a value from one location to another.\nmove: Moves a value from one location to another.\ntest: Tests that a value at the target location is equal to a specified value.\n",
                                "enum": [
                                  "merge",
                                  "strategic",
                                  "add",
                                  "remove",
                                  "copy",
                                  "move",
                                  "test"
                                ]
                              },
                              "mutatorRef": {
                                "x-oapi-codegen-extra-tags": {
                                  "json": "mutatorRef,omitempty"
                                },
                                "type": "array",
                                "description": "JSON ref to value from where patch should be applied.",
                                "items": {
                                  "type": "array",
                                  "items": {
                                    "type": "string"
                                  },
                                  "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                                }
                              },
                              "mutatedRef": {
                                "x-oapi-codegen-extra-tags": {
                                  "json": "mutatedRef,omitempty"
                                },
                                "type": "array",
                                "items": {
                                  "type": "array",
                                  "items": {
                                    "type": "string"
                                  },
                                  "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                                }
                              }
                            }
                          }
                        }
                      },
                      "x-oapi-codegen-extra-tags": {
                        "json": "from"
                      }
                    },
                    "to": {
                      "description": "Describes the component(s) which are involved in the relationship along with a set of actions to perform upon selection match.",
                      "type": "array",
                      "items": {
                        "x-go-type": "SelectorItem",
                        "type": "object",
                        "description": "Optional fields that are a part of the selector. Absence of a field has an implied * meaning.",
                        "properties": {
                          "id": {
                            "x-oapi-codegen-extra-tags": {
                              "json": "id"
                            },
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "kind": {
                            "type": "string",
                            "x-oapi-codegen-extra-tags": {
                              "json": "kind"
                            },
                            "description": "Kind of the resource.",
                            "maxLength": 255
                          },
                          "match": {
                            "x-go-type": "MatchSelector",
                            "x-oapi-codegen-extra-tags": {
                              "json": "match,omitempty"
                            },
                            "type": "object",
                            "description": "Match configuration for selector",
                            "properties": {
                              "refs": {
                                "type": "array",
                                "items": {
                                  "type": "array",
                                  "items": {
                                    "type": "string"
                                  }
                                },
                                "x-oapi-codegen-extra-tags": {
                                  "json": "refs,omitempty"
                                },
                                "description": "The refs of the matchselector."
                              },
                              "from": {
                                "type": "array",
                                "items": {
                                  "x-go-type": "MatchSelectorItem",
                                  "type": "object",
                                  "description": "Match selector item for binding between nodes",
                                  "required": [
                                    "kind"
                                  ],
                                  "properties": {
                                    "id": {
                                      "x-oapi-codegen-extra-tags": {
                                        "json": "id"
                                      },
                                      "type": "string",
                                      "format": "uuid",
                                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                      "x-go-type": "uuid.UUID",
                                      "x-go-type-import": {
                                        "path": "github.com/gofrs/uuid"
                                      }
                                    },
                                    "kind": {
                                      "type": "string",
                                      "x-oapi-codegen-extra-tags": {
                                        "json": "kind"
                                      },
                                      "description": "Kind of the resource.",
                                      "maxLength": 255
                                    },
                                    "mutatorRef": {
                                      "x-oapi-codegen-extra-tags": {
                                        "json": "mutatorRef,omitempty"
                                      },
                                      "type": "array",
                                      "description": "JSON ref to value from where patch should be applied.",
                                      "items": {
                                        "type": "array",
                                        "items": {
                                          "type": "string"
                                        },
                                        "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                                      }
                                    },
                                    "mutatedRef": {
                                      "x-oapi-codegen-extra-tags": {
                                        "json": "mutatedRef,omitempty"
                                      },
                                      "type": "array",
                                      "items": {
                                        "type": "array",
                                        "items": {
                                          "type": "string"
                                        },
                                        "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                                      }
                                    }
                                  }
                                },
                                "x-oapi-codegen-extra-tags": {
                                  "json": "from,omitempty"
                                },
                                "description": "The from of the matchselector."
                              },
                              "to": {
                                "type": "array",
                                "items": {
                                  "x-go-type": "MatchSelectorItem",
                                  "type": "object",
                                  "description": "Match selector item for binding between nodes",
                                  "required": [
                                    "kind"
                                  ],
                                  "properties": {
                                    "id": {
                                      "x-oapi-codegen-extra-tags": {
                                        "json": "id"
                                      },
                                      "type": "string",
                                      "format": "uuid",
                                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                      "x-go-type": "uuid.UUID",
                                      "x-go-type-import": {
                                        "path": "github.com/gofrs/uuid"
                                      }
                                    },
                                    "kind": {
                                      "type": "string",
                                      "x-oapi-codegen-extra-tags": {
                                        "json": "kind"
                                      },
                                      "description": "Kind of the resource.",
                                      "maxLength": 255
                                    },
                                    "mutatorRef": {
                                      "x-oapi-codegen-extra-tags": {
                                        "json": "mutatorRef,omitempty"
                                      },
                                      "type": "array",
                                      "description": "JSON ref to value from where patch should be applied.",
                                      "items": {
                                        "type": "array",
                                        "items": {
                                          "type": "string"
                                        },
                                        "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                                      }
                                    },
                                    "mutatedRef": {
                                      "x-oapi-codegen-extra-tags": {
                                        "json": "mutatedRef,omitempty"
                                      },
                                      "type": "array",
                                      "items": {
                                        "type": "array",
                                        "items": {
                                          "type": "string"
                                        },
                                        "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                                      }
                                    }
                                  }
                                },
                                "x-oapi-codegen-extra-tags": {
                                  "json": "to,omitempty"
                                },
                                "description": "The to of the matchselector."
                              }
                            }
                          },
                          "matchStrategyMatrix": {
                            "description": "Match strategy matrix for the selector",
                            "type": "array",
                            "items": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            },
                            "x-oapi-codegen-extra-tags": {
                              "json": "matchStrategyMatrix"
                            }
                          },
                          "model": {
                            "x-go-type": "modelv1beta1.ModelReference",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/v1beta1/model",
                              "name": "modelv1beta1"
                            },
                            "description": "Name of the model implicated by this selector. Learn more at https://docs.meshery.io/concepts/models",
                            "x-oapi-codegen-extra-tags": {
                              "json": "model,omitempty"
                            },
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
                          "patch": {
                            "x-go-type": "RelationshipDefinitionSelectorsPatch",
                            "x-oapi-codegen-extra-tags": {
                              "json": "patch"
                            },
                            "type": "object",
                            "description": "Patch configuration for the selector",
                            "x-go-name": "RelationshipDefinitionSelectorsPatch",
                            "properties": {
                              "patchStrategy": {
                                "x-oapi-codegen-extra-tags": {
                                  "json": "patchStrategy,omitempty"
                                },
                                "type": "string",
                                "description": "patchStrategy allows you to make specific changes to a resource using a standard JSON Patch format (RFC 6902).\n\nadd: Inserts a value into an array or adds a member to an object.\nmerge: Combines the values of the target location with the values from the patch. If the target location doesn't exist, it is created.\nstrategic: specific to Kubernetes and understands the structure of Kubernetes objects.\nremove: Removes a value.\ncopy: Copies a value from one location to another.\nmove: Moves a value from one location to another.\ntest: Tests that a value at the target location is equal to a specified value.\n",
                                "enum": [
                                  "merge",
                                  "strategic",
                                  "add",
                                  "remove",
                                  "copy",
                                  "move",
                                  "test"
                                ]
                              },
                              "mutatorRef": {
                                "x-oapi-codegen-extra-tags": {
                                  "json": "mutatorRef,omitempty"
                                },
                                "type": "array",
                                "description": "JSON ref to value from where patch should be applied.",
                                "items": {
                                  "type": "array",
                                  "items": {
                                    "type": "string"
                                  },
                                  "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                                }
                              },
                              "mutatedRef": {
                                "x-oapi-codegen-extra-tags": {
                                  "json": "mutatedRef,omitempty"
                                },
                                "type": "array",
                                "items": {
                                  "type": "array",
                                  "items": {
                                    "type": "string"
                                  },
                                  "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                                }
                              }
                            }
                          }
                        }
                      },
                      "x-oapi-codegen-extra-tags": {
                        "json": "to"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "MutatorRef": {
        "type": "array",
        "description": "JSON ref to value from where patch should be applied.",
        "items": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
        }
      },
      "MutatedRef": {
        "type": "array",
        "items": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
        }
      },
      "RelationshipDefinitionSelectorsPatchStrategy": {
        "type": "string",
        "description": "patchStrategy allows you to make specific changes to a resource using a standard JSON Patch format (RFC 6902).\n\nadd: Inserts a value into an array or adds a member to an object.\nmerge: Combines the values of the target location with the values from the patch. If the target location doesn't exist, it is created.\nstrategic: specific to Kubernetes and understands the structure of Kubernetes objects.\nremove: Removes a value.\ncopy: Copies a value from one location to another.\nmove: Moves a value from one location to another.\ntest: Tests that a value at the target location is equal to a specified value.\n",
        "enum": [
          "merge",
          "strategic",
          "add",
          "remove",
          "copy",
          "move",
          "test"
        ]
      },
      "RelationshipDefinitionSelectorsPatch": {
        "type": "object",
        "description": "Patch configuration for the selector",
        "x-go-name": "RelationshipDefinitionSelectorsPatch",
        "properties": {
          "patchStrategy": {
            "x-oapi-codegen-extra-tags": {
              "json": "patchStrategy,omitempty"
            },
            "type": "string",
            "description": "patchStrategy allows you to make specific changes to a resource using a standard JSON Patch format (RFC 6902).\n\nadd: Inserts a value into an array or adds a member to an object.\nmerge: Combines the values of the target location with the values from the patch. If the target location doesn't exist, it is created.\nstrategic: specific to Kubernetes and understands the structure of Kubernetes objects.\nremove: Removes a value.\ncopy: Copies a value from one location to another.\nmove: Moves a value from one location to another.\ntest: Tests that a value at the target location is equal to a specified value.\n",
            "enum": [
              "merge",
              "strategic",
              "add",
              "remove",
              "copy",
              "move",
              "test"
            ]
          },
          "mutatorRef": {
            "x-oapi-codegen-extra-tags": {
              "json": "mutatorRef,omitempty"
            },
            "type": "array",
            "description": "JSON ref to value from where patch should be applied.",
            "items": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
            }
          },
          "mutatedRef": {
            "x-oapi-codegen-extra-tags": {
              "json": "mutatedRef,omitempty"
            },
            "type": "array",
            "items": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
            }
          }
        }
      },
      "MatchSelectorItem": {
        "type": "object",
        "description": "Match selector item for binding between nodes",
        "required": [
          "kind"
        ],
        "properties": {
          "id": {
            "x-oapi-codegen-extra-tags": {
              "json": "id"
            },
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "kind": {
            "type": "string",
            "x-oapi-codegen-extra-tags": {
              "json": "kind"
            },
            "description": "Kind of the resource.",
            "maxLength": 255
          },
          "mutatorRef": {
            "x-oapi-codegen-extra-tags": {
              "json": "mutatorRef,omitempty"
            },
            "type": "array",
            "description": "JSON ref to value from where patch should be applied.",
            "items": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
            }
          },
          "mutatedRef": {
            "x-oapi-codegen-extra-tags": {
              "json": "mutatedRef,omitempty"
            },
            "type": "array",
            "items": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
            }
          }
        }
      },
      "MatchSelector": {
        "type": "object",
        "description": "Match configuration for selector",
        "properties": {
          "refs": {
            "type": "array",
            "items": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "x-oapi-codegen-extra-tags": {
              "json": "refs,omitempty"
            },
            "description": "The refs of the matchselector."
          },
          "from": {
            "type": "array",
            "items": {
              "x-go-type": "MatchSelectorItem",
              "type": "object",
              "description": "Match selector item for binding between nodes",
              "required": [
                "kind"
              ],
              "properties": {
                "id": {
                  "x-oapi-codegen-extra-tags": {
                    "json": "id"
                  },
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "kind": {
                  "type": "string",
                  "x-oapi-codegen-extra-tags": {
                    "json": "kind"
                  },
                  "description": "Kind of the resource.",
                  "maxLength": 255
                },
                "mutatorRef": {
                  "x-oapi-codegen-extra-tags": {
                    "json": "mutatorRef,omitempty"
                  },
                  "type": "array",
                  "description": "JSON ref to value from where patch should be applied.",
                  "items": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    },
                    "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                  }
                },
                "mutatedRef": {
                  "x-oapi-codegen-extra-tags": {
                    "json": "mutatedRef,omitempty"
                  },
                  "type": "array",
                  "items": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    },
                    "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                  }
                }
              }
            },
            "x-oapi-codegen-extra-tags": {
              "json": "from,omitempty"
            },
            "description": "The from of the matchselector."
          },
          "to": {
            "type": "array",
            "items": {
              "x-go-type": "MatchSelectorItem",
              "type": "object",
              "description": "Match selector item for binding between nodes",
              "required": [
                "kind"
              ],
              "properties": {
                "id": {
                  "x-oapi-codegen-extra-tags": {
                    "json": "id"
                  },
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "kind": {
                  "type": "string",
                  "x-oapi-codegen-extra-tags": {
                    "json": "kind"
                  },
                  "description": "Kind of the resource.",
                  "maxLength": 255
                },
                "mutatorRef": {
                  "x-oapi-codegen-extra-tags": {
                    "json": "mutatorRef,omitempty"
                  },
                  "type": "array",
                  "description": "JSON ref to value from where patch should be applied.",
                  "items": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    },
                    "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                  }
                },
                "mutatedRef": {
                  "x-oapi-codegen-extra-tags": {
                    "json": "mutatedRef,omitempty"
                  },
                  "type": "array",
                  "items": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    },
                    "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                  }
                }
              }
            },
            "x-oapi-codegen-extra-tags": {
              "json": "to,omitempty"
            },
            "description": "The to of the matchselector."
          }
        },
        "x-oapi-codegen-extra-tags": {
          "json": "match,omitempty"
        }
      },
      "SelectorItem": {
        "type": "object",
        "description": "Optional fields that are a part of the selector. Absence of a field has an implied * meaning.",
        "properties": {
          "id": {
            "x-oapi-codegen-extra-tags": {
              "json": "id"
            },
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "kind": {
            "type": "string",
            "x-oapi-codegen-extra-tags": {
              "json": "kind"
            },
            "description": "Kind of the resource.",
            "maxLength": 255
          },
          "match": {
            "x-go-type": "MatchSelector",
            "x-oapi-codegen-extra-tags": {
              "json": "match,omitempty"
            },
            "type": "object",
            "description": "Match configuration for selector",
            "properties": {
              "refs": {
                "type": "array",
                "items": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "x-oapi-codegen-extra-tags": {
                  "json": "refs,omitempty"
                },
                "description": "The refs of the matchselector."
              },
              "from": {
                "type": "array",
                "items": {
                  "x-go-type": "MatchSelectorItem",
                  "type": "object",
                  "description": "Match selector item for binding between nodes",
                  "required": [
                    "kind"
                  ],
                  "properties": {
                    "id": {
                      "x-oapi-codegen-extra-tags": {
                        "json": "id"
                      },
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "kind": {
                      "type": "string",
                      "x-oapi-codegen-extra-tags": {
                        "json": "kind"
                      },
                      "description": "Kind of the resource.",
                      "maxLength": 255
                    },
                    "mutatorRef": {
                      "x-oapi-codegen-extra-tags": {
                        "json": "mutatorRef,omitempty"
                      },
                      "type": "array",
                      "description": "JSON ref to value from where patch should be applied.",
                      "items": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        },
                        "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                      }
                    },
                    "mutatedRef": {
                      "x-oapi-codegen-extra-tags": {
                        "json": "mutatedRef,omitempty"
                      },
                      "type": "array",
                      "items": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        },
                        "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                      }
                    }
                  }
                },
                "x-oapi-codegen-extra-tags": {
                  "json": "from,omitempty"
                },
                "description": "The from of the matchselector."
              },
              "to": {
                "type": "array",
                "items": {
                  "x-go-type": "MatchSelectorItem",
                  "type": "object",
                  "description": "Match selector item for binding between nodes",
                  "required": [
                    "kind"
                  ],
                  "properties": {
                    "id": {
                      "x-oapi-codegen-extra-tags": {
                        "json": "id"
                      },
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "kind": {
                      "type": "string",
                      "x-oapi-codegen-extra-tags": {
                        "json": "kind"
                      },
                      "description": "Kind of the resource.",
                      "maxLength": 255
                    },
                    "mutatorRef": {
                      "x-oapi-codegen-extra-tags": {
                        "json": "mutatorRef,omitempty"
                      },
                      "type": "array",
                      "description": "JSON ref to value from where patch should be applied.",
                      "items": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        },
                        "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                      }
                    },
                    "mutatedRef": {
                      "x-oapi-codegen-extra-tags": {
                        "json": "mutatedRef,omitempty"
                      },
                      "type": "array",
                      "items": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        },
                        "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                      }
                    }
                  }
                },
                "x-oapi-codegen-extra-tags": {
                  "json": "to,omitempty"
                },
                "description": "The to of the matchselector."
              }
            }
          },
          "matchStrategyMatrix": {
            "description": "Match strategy matrix for the selector",
            "type": "array",
            "items": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "x-oapi-codegen-extra-tags": {
              "json": "matchStrategyMatrix"
            }
          },
          "model": {
            "x-go-type": "modelv1beta1.ModelReference",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/v1beta1/model",
              "name": "modelv1beta1"
            },
            "description": "Name of the model implicated by this selector. Learn more at https://docs.meshery.io/concepts/models",
            "x-oapi-codegen-extra-tags": {
              "json": "model,omitempty"
            },
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
          "patch": {
            "x-go-type": "RelationshipDefinitionSelectorsPatch",
            "x-oapi-codegen-extra-tags": {
              "json": "patch"
            },
            "type": "object",
            "description": "Patch configuration for the selector",
            "x-go-name": "RelationshipDefinitionSelectorsPatch",
            "properties": {
              "patchStrategy": {
                "x-oapi-codegen-extra-tags": {
                  "json": "patchStrategy,omitempty"
                },
                "type": "string",
                "description": "patchStrategy allows you to make specific changes to a resource using a standard JSON Patch format (RFC 6902).\n\nadd: Inserts a value into an array or adds a member to an object.\nmerge: Combines the values of the target location with the values from the patch. If the target location doesn't exist, it is created.\nstrategic: specific to Kubernetes and understands the structure of Kubernetes objects.\nremove: Removes a value.\ncopy: Copies a value from one location to another.\nmove: Moves a value from one location to another.\ntest: Tests that a value at the target location is equal to a specified value.\n",
                "enum": [
                  "merge",
                  "strategic",
                  "add",
                  "remove",
                  "copy",
                  "move",
                  "test"
                ]
              },
              "mutatorRef": {
                "x-oapi-codegen-extra-tags": {
                  "json": "mutatorRef,omitempty"
                },
                "type": "array",
                "description": "JSON ref to value from where patch should be applied.",
                "items": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                }
              },
              "mutatedRef": {
                "x-oapi-codegen-extra-tags": {
                  "json": "mutatedRef,omitempty"
                },
                "type": "array",
                "items": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                }
              }
            }
          }
        }
      },
      "Selector": {
        "type": "object",
        "description": "Describes the component(s) which are involved in the relationship along with a set of actions to perform upon selection match.",
        "required": [
          "from",
          "to"
        ],
        "properties": {
          "from": {
            "description": "Describes the component(s) which are involved in the relationship along with a set of actions to perform upon selection match.",
            "type": "array",
            "items": {
              "x-go-type": "SelectorItem",
              "type": "object",
              "description": "Optional fields that are a part of the selector. Absence of a field has an implied * meaning.",
              "properties": {
                "id": {
                  "x-oapi-codegen-extra-tags": {
                    "json": "id"
                  },
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "kind": {
                  "type": "string",
                  "x-oapi-codegen-extra-tags": {
                    "json": "kind"
                  },
                  "description": "Kind of the resource.",
                  "maxLength": 255
                },
                "match": {
                  "x-go-type": "MatchSelector",
                  "x-oapi-codegen-extra-tags": {
                    "json": "match,omitempty"
                  },
                  "type": "object",
                  "description": "Match configuration for selector",
                  "properties": {
                    "refs": {
                      "type": "array",
                      "items": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      },
                      "x-oapi-codegen-extra-tags": {
                        "json": "refs,omitempty"
                      },
                      "description": "The refs of the matchselector."
                    },
                    "from": {
                      "type": "array",
                      "items": {
                        "x-go-type": "MatchSelectorItem",
                        "type": "object",
                        "description": "Match selector item for binding between nodes",
                        "required": [
                          "kind"
                        ],
                        "properties": {
                          "id": {
                            "x-oapi-codegen-extra-tags": {
                              "json": "id"
                            },
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "kind": {
                            "type": "string",
                            "x-oapi-codegen-extra-tags": {
                              "json": "kind"
                            },
                            "description": "Kind of the resource.",
                            "maxLength": 255
                          },
                          "mutatorRef": {
                            "x-oapi-codegen-extra-tags": {
                              "json": "mutatorRef,omitempty"
                            },
                            "type": "array",
                            "description": "JSON ref to value from where patch should be applied.",
                            "items": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              },
                              "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                            }
                          },
                          "mutatedRef": {
                            "x-oapi-codegen-extra-tags": {
                              "json": "mutatedRef,omitempty"
                            },
                            "type": "array",
                            "items": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              },
                              "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                            }
                          }
                        }
                      },
                      "x-oapi-codegen-extra-tags": {
                        "json": "from,omitempty"
                      },
                      "description": "The from of the matchselector."
                    },
                    "to": {
                      "type": "array",
                      "items": {
                        "x-go-type": "MatchSelectorItem",
                        "type": "object",
                        "description": "Match selector item for binding between nodes",
                        "required": [
                          "kind"
                        ],
                        "properties": {
                          "id": {
                            "x-oapi-codegen-extra-tags": {
                              "json": "id"
                            },
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "kind": {
                            "type": "string",
                            "x-oapi-codegen-extra-tags": {
                              "json": "kind"
                            },
                            "description": "Kind of the resource.",
                            "maxLength": 255
                          },
                          "mutatorRef": {
                            "x-oapi-codegen-extra-tags": {
                              "json": "mutatorRef,omitempty"
                            },
                            "type": "array",
                            "description": "JSON ref to value from where patch should be applied.",
                            "items": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              },
                              "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                            }
                          },
                          "mutatedRef": {
                            "x-oapi-codegen-extra-tags": {
                              "json": "mutatedRef,omitempty"
                            },
                            "type": "array",
                            "items": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              },
                              "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                            }
                          }
                        }
                      },
                      "x-oapi-codegen-extra-tags": {
                        "json": "to,omitempty"
                      },
                      "description": "The to of the matchselector."
                    }
                  }
                },
                "matchStrategyMatrix": {
                  "description": "Match strategy matrix for the selector",
                  "type": "array",
                  "items": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "x-oapi-codegen-extra-tags": {
                    "json": "matchStrategyMatrix"
                  }
                },
                "model": {
                  "x-go-type": "modelv1beta1.ModelReference",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/v1beta1/model",
                    "name": "modelv1beta1"
                  },
                  "description": "Name of the model implicated by this selector. Learn more at https://docs.meshery.io/concepts/models",
                  "x-oapi-codegen-extra-tags": {
                    "json": "model,omitempty"
                  },
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
                "patch": {
                  "x-go-type": "RelationshipDefinitionSelectorsPatch",
                  "x-oapi-codegen-extra-tags": {
                    "json": "patch"
                  },
                  "type": "object",
                  "description": "Patch configuration for the selector",
                  "x-go-name": "RelationshipDefinitionSelectorsPatch",
                  "properties": {
                    "patchStrategy": {
                      "x-oapi-codegen-extra-tags": {
                        "json": "patchStrategy,omitempty"
                      },
                      "type": "string",
                      "description": "patchStrategy allows you to make specific changes to a resource using a standard JSON Patch format (RFC 6902).\n\nadd: Inserts a value into an array or adds a member to an object.\nmerge: Combines the values of the target location with the values from the patch. If the target location doesn't exist, it is created.\nstrategic: specific to Kubernetes and understands the structure of Kubernetes objects.\nremove: Removes a value.\ncopy: Copies a value from one location to another.\nmove: Moves a value from one location to another.\ntest: Tests that a value at the target location is equal to a specified value.\n",
                      "enum": [
                        "merge",
                        "strategic",
                        "add",
                        "remove",
                        "copy",
                        "move",
                        "test"
                      ]
                    },
                    "mutatorRef": {
                      "x-oapi-codegen-extra-tags": {
                        "json": "mutatorRef,omitempty"
                      },
                      "type": "array",
                      "description": "JSON ref to value from where patch should be applied.",
                      "items": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        },
                        "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                      }
                    },
                    "mutatedRef": {
                      "x-oapi-codegen-extra-tags": {
                        "json": "mutatedRef,omitempty"
                      },
                      "type": "array",
                      "items": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        },
                        "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                      }
                    }
                  }
                }
              }
            },
            "x-oapi-codegen-extra-tags": {
              "json": "from"
            }
          },
          "to": {
            "description": "Describes the component(s) which are involved in the relationship along with a set of actions to perform upon selection match.",
            "type": "array",
            "items": {
              "x-go-type": "SelectorItem",
              "type": "object",
              "description": "Optional fields that are a part of the selector. Absence of a field has an implied * meaning.",
              "properties": {
                "id": {
                  "x-oapi-codegen-extra-tags": {
                    "json": "id"
                  },
                  "type": "string",
                  "format": "uuid",
                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "kind": {
                  "type": "string",
                  "x-oapi-codegen-extra-tags": {
                    "json": "kind"
                  },
                  "description": "Kind of the resource.",
                  "maxLength": 255
                },
                "match": {
                  "x-go-type": "MatchSelector",
                  "x-oapi-codegen-extra-tags": {
                    "json": "match,omitempty"
                  },
                  "type": "object",
                  "description": "Match configuration for selector",
                  "properties": {
                    "refs": {
                      "type": "array",
                      "items": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      },
                      "x-oapi-codegen-extra-tags": {
                        "json": "refs,omitempty"
                      },
                      "description": "The refs of the matchselector."
                    },
                    "from": {
                      "type": "array",
                      "items": {
                        "x-go-type": "MatchSelectorItem",
                        "type": "object",
                        "description": "Match selector item for binding between nodes",
                        "required": [
                          "kind"
                        ],
                        "properties": {
                          "id": {
                            "x-oapi-codegen-extra-tags": {
                              "json": "id"
                            },
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "kind": {
                            "type": "string",
                            "x-oapi-codegen-extra-tags": {
                              "json": "kind"
                            },
                            "description": "Kind of the resource.",
                            "maxLength": 255
                          },
                          "mutatorRef": {
                            "x-oapi-codegen-extra-tags": {
                              "json": "mutatorRef,omitempty"
                            },
                            "type": "array",
                            "description": "JSON ref to value from where patch should be applied.",
                            "items": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              },
                              "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                            }
                          },
                          "mutatedRef": {
                            "x-oapi-codegen-extra-tags": {
                              "json": "mutatedRef,omitempty"
                            },
                            "type": "array",
                            "items": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              },
                              "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                            }
                          }
                        }
                      },
                      "x-oapi-codegen-extra-tags": {
                        "json": "from,omitempty"
                      },
                      "description": "The from of the matchselector."
                    },
                    "to": {
                      "type": "array",
                      "items": {
                        "x-go-type": "MatchSelectorItem",
                        "type": "object",
                        "description": "Match selector item for binding between nodes",
                        "required": [
                          "kind"
                        ],
                        "properties": {
                          "id": {
                            "x-oapi-codegen-extra-tags": {
                              "json": "id"
                            },
                            "type": "string",
                            "format": "uuid",
                            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "kind": {
                            "type": "string",
                            "x-oapi-codegen-extra-tags": {
                              "json": "kind"
                            },
                            "description": "Kind of the resource.",
                            "maxLength": 255
                          },
                          "mutatorRef": {
                            "x-oapi-codegen-extra-tags": {
                              "json": "mutatorRef,omitempty"
                            },
                            "type": "array",
                            "description": "JSON ref to value from where patch should be applied.",
                            "items": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              },
                              "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                            }
                          },
                          "mutatedRef": {
                            "x-oapi-codegen-extra-tags": {
                              "json": "mutatedRef,omitempty"
                            },
                            "type": "array",
                            "items": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              },
                              "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                            }
                          }
                        }
                      },
                      "x-oapi-codegen-extra-tags": {
                        "json": "to,omitempty"
                      },
                      "description": "The to of the matchselector."
                    }
                  }
                },
                "matchStrategyMatrix": {
                  "description": "Match strategy matrix for the selector",
                  "type": "array",
                  "items": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "x-oapi-codegen-extra-tags": {
                    "json": "matchStrategyMatrix"
                  }
                },
                "model": {
                  "x-go-type": "modelv1beta1.ModelReference",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/v1beta1/model",
                    "name": "modelv1beta1"
                  },
                  "description": "Name of the model implicated by this selector. Learn more at https://docs.meshery.io/concepts/models",
                  "x-oapi-codegen-extra-tags": {
                    "json": "model,omitempty"
                  },
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
                "patch": {
                  "x-go-type": "RelationshipDefinitionSelectorsPatch",
                  "x-oapi-codegen-extra-tags": {
                    "json": "patch"
                  },
                  "type": "object",
                  "description": "Patch configuration for the selector",
                  "x-go-name": "RelationshipDefinitionSelectorsPatch",
                  "properties": {
                    "patchStrategy": {
                      "x-oapi-codegen-extra-tags": {
                        "json": "patchStrategy,omitempty"
                      },
                      "type": "string",
                      "description": "patchStrategy allows you to make specific changes to a resource using a standard JSON Patch format (RFC 6902).\n\nadd: Inserts a value into an array or adds a member to an object.\nmerge: Combines the values of the target location with the values from the patch. If the target location doesn't exist, it is created.\nstrategic: specific to Kubernetes and understands the structure of Kubernetes objects.\nremove: Removes a value.\ncopy: Copies a value from one location to another.\nmove: Moves a value from one location to another.\ntest: Tests that a value at the target location is equal to a specified value.\n",
                      "enum": [
                        "merge",
                        "strategic",
                        "add",
                        "remove",
                        "copy",
                        "move",
                        "test"
                      ]
                    },
                    "mutatorRef": {
                      "x-oapi-codegen-extra-tags": {
                        "json": "mutatorRef,omitempty"
                      },
                      "type": "array",
                      "description": "JSON ref to value from where patch should be applied.",
                      "items": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        },
                        "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                      }
                    },
                    "mutatedRef": {
                      "x-oapi-codegen-extra-tags": {
                        "json": "mutatedRef,omitempty"
                      },
                      "type": "array",
                      "items": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        },
                        "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                      }
                    }
                  }
                }
              }
            },
            "x-oapi-codegen-extra-tags": {
              "json": "to"
            }
          }
        }
      },
      "SelectorSetItem": {
        "type": "object",
        "description": "Optional selectors used to match Components. Absence of a selector means that it is applied to all Components.",
        "required": [
          "allow"
        ],
        "properties": {
          "allow": {
            "description": "Selectors used to define relationships which are allowed.",
            "x-go-type": "Selector",
            "x-oapi-codegen-extra-tags": {
              "json": "allow"
            },
            "type": "object",
            "required": [
              "from",
              "to"
            ],
            "properties": {
              "from": {
                "description": "Describes the component(s) which are involved in the relationship along with a set of actions to perform upon selection match.",
                "type": "array",
                "items": {
                  "x-go-type": "SelectorItem",
                  "type": "object",
                  "description": "Optional fields that are a part of the selector. Absence of a field has an implied * meaning.",
                  "properties": {
                    "id": {
                      "x-oapi-codegen-extra-tags": {
                        "json": "id"
                      },
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "kind": {
                      "type": "string",
                      "x-oapi-codegen-extra-tags": {
                        "json": "kind"
                      },
                      "description": "Kind of the resource.",
                      "maxLength": 255
                    },
                    "match": {
                      "x-go-type": "MatchSelector",
                      "x-oapi-codegen-extra-tags": {
                        "json": "match,omitempty"
                      },
                      "type": "object",
                      "description": "Match configuration for selector",
                      "properties": {
                        "refs": {
                          "type": "array",
                          "items": {
                            "type": "array",
                            "items": {
                              "type": "string"
                            }
                          },
                          "x-oapi-codegen-extra-tags": {
                            "json": "refs,omitempty"
                          },
                          "description": "The refs of the matchselector."
                        },
                        "from": {
                          "type": "array",
                          "items": {
                            "x-go-type": "MatchSelectorItem",
                            "type": "object",
                            "description": "Match selector item for binding between nodes",
                            "required": [
                              "kind"
                            ],
                            "properties": {
                              "id": {
                                "x-oapi-codegen-extra-tags": {
                                  "json": "id"
                                },
                                "type": "string",
                                "format": "uuid",
                                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                }
                              },
                              "kind": {
                                "type": "string",
                                "x-oapi-codegen-extra-tags": {
                                  "json": "kind"
                                },
                                "description": "Kind of the resource.",
                                "maxLength": 255
                              },
                              "mutatorRef": {
                                "x-oapi-codegen-extra-tags": {
                                  "json": "mutatorRef,omitempty"
                                },
                                "type": "array",
                                "description": "JSON ref to value from where patch should be applied.",
                                "items": {
                                  "type": "array",
                                  "items": {
                                    "type": "string"
                                  },
                                  "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                                }
                              },
                              "mutatedRef": {
                                "x-oapi-codegen-extra-tags": {
                                  "json": "mutatedRef,omitempty"
                                },
                                "type": "array",
                                "items": {
                                  "type": "array",
                                  "items": {
                                    "type": "string"
                                  },
                                  "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                                }
                              }
                            }
                          },
                          "x-oapi-codegen-extra-tags": {
                            "json": "from,omitempty"
                          },
                          "description": "The from of the matchselector."
                        },
                        "to": {
                          "type": "array",
                          "items": {
                            "x-go-type": "MatchSelectorItem",
                            "type": "object",
                            "description": "Match selector item for binding between nodes",
                            "required": [
                              "kind"
                            ],
                            "properties": {
                              "id": {
                                "x-oapi-codegen-extra-tags": {
                                  "json": "id"
                                },
                                "type": "string",
                                "format": "uuid",
                                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                }
                              },
                              "kind": {
                                "type": "string",
                                "x-oapi-codegen-extra-tags": {
                                  "json": "kind"
                                },
                                "description": "Kind of the resource.",
                                "maxLength": 255
                              },
                              "mutatorRef": {
                                "x-oapi-codegen-extra-tags": {
                                  "json": "mutatorRef,omitempty"
                                },
                                "type": "array",
                                "description": "JSON ref to value from where patch should be applied.",
                                "items": {
                                  "type": "array",
                                  "items": {
                                    "type": "string"
                                  },
                                  "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                                }
                              },
                              "mutatedRef": {
                                "x-oapi-codegen-extra-tags": {
                                  "json": "mutatedRef,omitempty"
                                },
                                "type": "array",
                                "items": {
                                  "type": "array",
                                  "items": {
                                    "type": "string"
                                  },
                                  "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                                }
                              }
                            }
                          },
                          "x-oapi-codegen-extra-tags": {
                            "json": "to,omitempty"
                          },
                          "description": "The to of the matchselector."
                        }
                      }
                    },
                    "matchStrategyMatrix": {
                      "description": "Match strategy matrix for the selector",
                      "type": "array",
                      "items": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      },
                      "x-oapi-codegen-extra-tags": {
                        "json": "matchStrategyMatrix"
                      }
                    },
                    "model": {
                      "x-go-type": "modelv1beta1.ModelReference",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta1/model",
                        "name": "modelv1beta1"
                      },
                      "description": "Name of the model implicated by this selector. Learn more at https://docs.meshery.io/concepts/models",
                      "x-oapi-codegen-extra-tags": {
                        "json": "model,omitempty"
                      },
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
                    "patch": {
                      "x-go-type": "RelationshipDefinitionSelectorsPatch",
                      "x-oapi-codegen-extra-tags": {
                        "json": "patch"
                      },
                      "type": "object",
                      "description": "Patch configuration for the selector",
                      "x-go-name": "RelationshipDefinitionSelectorsPatch",
                      "properties": {
                        "patchStrategy": {
                          "x-oapi-codegen-extra-tags": {
                            "json": "patchStrategy,omitempty"
                          },
                          "type": "string",
                          "description": "patchStrategy allows you to make specific changes to a resource using a standard JSON Patch format (RFC 6902).\n\nadd: Inserts a value into an array or adds a member to an object.\nmerge: Combines the values of the target location with the values from the patch. If the target location doesn't exist, it is created.\nstrategic: specific to Kubernetes and understands the structure of Kubernetes objects.\nremove: Removes a value.\ncopy: Copies a value from one location to another.\nmove: Moves a value from one location to another.\ntest: Tests that a value at the target location is equal to a specified value.\n",
                          "enum": [
                            "merge",
                            "strategic",
                            "add",
                            "remove",
                            "copy",
                            "move",
                            "test"
                          ]
                        },
                        "mutatorRef": {
                          "x-oapi-codegen-extra-tags": {
                            "json": "mutatorRef,omitempty"
                          },
                          "type": "array",
                          "description": "JSON ref to value from where patch should be applied.",
                          "items": {
                            "type": "array",
                            "items": {
                              "type": "string"
                            },
                            "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                          }
                        },
                        "mutatedRef": {
                          "x-oapi-codegen-extra-tags": {
                            "json": "mutatedRef,omitempty"
                          },
                          "type": "array",
                          "items": {
                            "type": "array",
                            "items": {
                              "type": "string"
                            },
                            "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                          }
                        }
                      }
                    }
                  }
                },
                "x-oapi-codegen-extra-tags": {
                  "json": "from"
                }
              },
              "to": {
                "description": "Describes the component(s) which are involved in the relationship along with a set of actions to perform upon selection match.",
                "type": "array",
                "items": {
                  "x-go-type": "SelectorItem",
                  "type": "object",
                  "description": "Optional fields that are a part of the selector. Absence of a field has an implied * meaning.",
                  "properties": {
                    "id": {
                      "x-oapi-codegen-extra-tags": {
                        "json": "id"
                      },
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "kind": {
                      "type": "string",
                      "x-oapi-codegen-extra-tags": {
                        "json": "kind"
                      },
                      "description": "Kind of the resource.",
                      "maxLength": 255
                    },
                    "match": {
                      "x-go-type": "MatchSelector",
                      "x-oapi-codegen-extra-tags": {
                        "json": "match,omitempty"
                      },
                      "type": "object",
                      "description": "Match configuration for selector",
                      "properties": {
                        "refs": {
                          "type": "array",
                          "items": {
                            "type": "array",
                            "items": {
                              "type": "string"
                            }
                          },
                          "x-oapi-codegen-extra-tags": {
                            "json": "refs,omitempty"
                          },
                          "description": "The refs of the matchselector."
                        },
                        "from": {
                          "type": "array",
                          "items": {
                            "x-go-type": "MatchSelectorItem",
                            "type": "object",
                            "description": "Match selector item for binding between nodes",
                            "required": [
                              "kind"
                            ],
                            "properties": {
                              "id": {
                                "x-oapi-codegen-extra-tags": {
                                  "json": "id"
                                },
                                "type": "string",
                                "format": "uuid",
                                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                }
                              },
                              "kind": {
                                "type": "string",
                                "x-oapi-codegen-extra-tags": {
                                  "json": "kind"
                                },
                                "description": "Kind of the resource.",
                                "maxLength": 255
                              },
                              "mutatorRef": {
                                "x-oapi-codegen-extra-tags": {
                                  "json": "mutatorRef,omitempty"
                                },
                                "type": "array",
                                "description": "JSON ref to value from where patch should be applied.",
                                "items": {
                                  "type": "array",
                                  "items": {
                                    "type": "string"
                                  },
                                  "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                                }
                              },
                              "mutatedRef": {
                                "x-oapi-codegen-extra-tags": {
                                  "json": "mutatedRef,omitempty"
                                },
                                "type": "array",
                                "items": {
                                  "type": "array",
                                  "items": {
                                    "type": "string"
                                  },
                                  "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                                }
                              }
                            }
                          },
                          "x-oapi-codegen-extra-tags": {
                            "json": "from,omitempty"
                          },
                          "description": "The from of the matchselector."
                        },
                        "to": {
                          "type": "array",
                          "items": {
                            "x-go-type": "MatchSelectorItem",
                            "type": "object",
                            "description": "Match selector item for binding between nodes",
                            "required": [
                              "kind"
                            ],
                            "properties": {
                              "id": {
                                "x-oapi-codegen-extra-tags": {
                                  "json": "id"
                                },
                                "type": "string",
                                "format": "uuid",
                                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                }
                              },
                              "kind": {
                                "type": "string",
                                "x-oapi-codegen-extra-tags": {
                                  "json": "kind"
                                },
                                "description": "Kind of the resource.",
                                "maxLength": 255
                              },
                              "mutatorRef": {
                                "x-oapi-codegen-extra-tags": {
                                  "json": "mutatorRef,omitempty"
                                },
                                "type": "array",
                                "description": "JSON ref to value from where patch should be applied.",
                                "items": {
                                  "type": "array",
                                  "items": {
                                    "type": "string"
                                  },
                                  "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                                }
                              },
                              "mutatedRef": {
                                "x-oapi-codegen-extra-tags": {
                                  "json": "mutatedRef,omitempty"
                                },
                                "type": "array",
                                "items": {
                                  "type": "array",
                                  "items": {
                                    "type": "string"
                                  },
                                  "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                                }
                              }
                            }
                          },
                          "x-oapi-codegen-extra-tags": {
                            "json": "to,omitempty"
                          },
                          "description": "The to of the matchselector."
                        }
                      }
                    },
                    "matchStrategyMatrix": {
                      "description": "Match strategy matrix for the selector",
                      "type": "array",
                      "items": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      },
                      "x-oapi-codegen-extra-tags": {
                        "json": "matchStrategyMatrix"
                      }
                    },
                    "model": {
                      "x-go-type": "modelv1beta1.ModelReference",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta1/model",
                        "name": "modelv1beta1"
                      },
                      "description": "Name of the model implicated by this selector. Learn more at https://docs.meshery.io/concepts/models",
                      "x-oapi-codegen-extra-tags": {
                        "json": "model,omitempty"
                      },
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
                    "patch": {
                      "x-go-type": "RelationshipDefinitionSelectorsPatch",
                      "x-oapi-codegen-extra-tags": {
                        "json": "patch"
                      },
                      "type": "object",
                      "description": "Patch configuration for the selector",
                      "x-go-name": "RelationshipDefinitionSelectorsPatch",
                      "properties": {
                        "patchStrategy": {
                          "x-oapi-codegen-extra-tags": {
                            "json": "patchStrategy,omitempty"
                          },
                          "type": "string",
                          "description": "patchStrategy allows you to make specific changes to a resource using a standard JSON Patch format (RFC 6902).\n\nadd: Inserts a value into an array or adds a member to an object.\nmerge: Combines the values of the target location with the values from the patch. If the target location doesn't exist, it is created.\nstrategic: specific to Kubernetes and understands the structure of Kubernetes objects.\nremove: Removes a value.\ncopy: Copies a value from one location to another.\nmove: Moves a value from one location to another.\ntest: Tests that a value at the target location is equal to a specified value.\n",
                          "enum": [
                            "merge",
                            "strategic",
                            "add",
                            "remove",
                            "copy",
                            "move",
                            "test"
                          ]
                        },
                        "mutatorRef": {
                          "x-oapi-codegen-extra-tags": {
                            "json": "mutatorRef,omitempty"
                          },
                          "type": "array",
                          "description": "JSON ref to value from where patch should be applied.",
                          "items": {
                            "type": "array",
                            "items": {
                              "type": "string"
                            },
                            "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                          }
                        },
                        "mutatedRef": {
                          "x-oapi-codegen-extra-tags": {
                            "json": "mutatedRef,omitempty"
                          },
                          "type": "array",
                          "items": {
                            "type": "array",
                            "items": {
                              "type": "string"
                            },
                            "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                          }
                        }
                      }
                    }
                  }
                },
                "x-oapi-codegen-extra-tags": {
                  "json": "to"
                }
              }
            }
          },
          "deny": {
            "description": "Optional selectors used to define relationships which should not be created / is restricted.",
            "x-go-type": "Selector",
            "x-oapi-codegen-extra-tags": {
              "json": "deny,omitempty"
            },
            "type": "object",
            "required": [
              "from",
              "to"
            ],
            "properties": {
              "from": {
                "description": "Describes the component(s) which are involved in the relationship along with a set of actions to perform upon selection match.",
                "type": "array",
                "items": {
                  "x-go-type": "SelectorItem",
                  "type": "object",
                  "description": "Optional fields that are a part of the selector. Absence of a field has an implied * meaning.",
                  "properties": {
                    "id": {
                      "x-oapi-codegen-extra-tags": {
                        "json": "id"
                      },
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "kind": {
                      "type": "string",
                      "x-oapi-codegen-extra-tags": {
                        "json": "kind"
                      },
                      "description": "Kind of the resource.",
                      "maxLength": 255
                    },
                    "match": {
                      "x-go-type": "MatchSelector",
                      "x-oapi-codegen-extra-tags": {
                        "json": "match,omitempty"
                      },
                      "type": "object",
                      "description": "Match configuration for selector",
                      "properties": {
                        "refs": {
                          "type": "array",
                          "items": {
                            "type": "array",
                            "items": {
                              "type": "string"
                            }
                          },
                          "x-oapi-codegen-extra-tags": {
                            "json": "refs,omitempty"
                          },
                          "description": "The refs of the matchselector."
                        },
                        "from": {
                          "type": "array",
                          "items": {
                            "x-go-type": "MatchSelectorItem",
                            "type": "object",
                            "description": "Match selector item for binding between nodes",
                            "required": [
                              "kind"
                            ],
                            "properties": {
                              "id": {
                                "x-oapi-codegen-extra-tags": {
                                  "json": "id"
                                },
                                "type": "string",
                                "format": "uuid",
                                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                }
                              },
                              "kind": {
                                "type": "string",
                                "x-oapi-codegen-extra-tags": {
                                  "json": "kind"
                                },
                                "description": "Kind of the resource.",
                                "maxLength": 255
                              },
                              "mutatorRef": {
                                "x-oapi-codegen-extra-tags": {
                                  "json": "mutatorRef,omitempty"
                                },
                                "type": "array",
                                "description": "JSON ref to value from where patch should be applied.",
                                "items": {
                                  "type": "array",
                                  "items": {
                                    "type": "string"
                                  },
                                  "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                                }
                              },
                              "mutatedRef": {
                                "x-oapi-codegen-extra-tags": {
                                  "json": "mutatedRef,omitempty"
                                },
                                "type": "array",
                                "items": {
                                  "type": "array",
                                  "items": {
                                    "type": "string"
                                  },
                                  "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                                }
                              }
                            }
                          },
                          "x-oapi-codegen-extra-tags": {
                            "json": "from,omitempty"
                          },
                          "description": "The from of the matchselector."
                        },
                        "to": {
                          "type": "array",
                          "items": {
                            "x-go-type": "MatchSelectorItem",
                            "type": "object",
                            "description": "Match selector item for binding between nodes",
                            "required": [
                              "kind"
                            ],
                            "properties": {
                              "id": {
                                "x-oapi-codegen-extra-tags": {
                                  "json": "id"
                                },
                                "type": "string",
                                "format": "uuid",
                                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                }
                              },
                              "kind": {
                                "type": "string",
                                "x-oapi-codegen-extra-tags": {
                                  "json": "kind"
                                },
                                "description": "Kind of the resource.",
                                "maxLength": 255
                              },
                              "mutatorRef": {
                                "x-oapi-codegen-extra-tags": {
                                  "json": "mutatorRef,omitempty"
                                },
                                "type": "array",
                                "description": "JSON ref to value from where patch should be applied.",
                                "items": {
                                  "type": "array",
                                  "items": {
                                    "type": "string"
                                  },
                                  "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                                }
                              },
                              "mutatedRef": {
                                "x-oapi-codegen-extra-tags": {
                                  "json": "mutatedRef,omitempty"
                                },
                                "type": "array",
                                "items": {
                                  "type": "array",
                                  "items": {
                                    "type": "string"
                                  },
                                  "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                                }
                              }
                            }
                          },
                          "x-oapi-codegen-extra-tags": {
                            "json": "to,omitempty"
                          },
                          "description": "The to of the matchselector."
                        }
                      }
                    },
                    "matchStrategyMatrix": {
                      "description": "Match strategy matrix for the selector",
                      "type": "array",
                      "items": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      },
                      "x-oapi-codegen-extra-tags": {
                        "json": "matchStrategyMatrix"
                      }
                    },
                    "model": {
                      "x-go-type": "modelv1beta1.ModelReference",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta1/model",
                        "name": "modelv1beta1"
                      },
                      "description": "Name of the model implicated by this selector. Learn more at https://docs.meshery.io/concepts/models",
                      "x-oapi-codegen-extra-tags": {
                        "json": "model,omitempty"
                      },
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
                    "patch": {
                      "x-go-type": "RelationshipDefinitionSelectorsPatch",
                      "x-oapi-codegen-extra-tags": {
                        "json": "patch"
                      },
                      "type": "object",
                      "description": "Patch configuration for the selector",
                      "x-go-name": "RelationshipDefinitionSelectorsPatch",
                      "properties": {
                        "patchStrategy": {
                          "x-oapi-codegen-extra-tags": {
                            "json": "patchStrategy,omitempty"
                          },
                          "type": "string",
                          "description": "patchStrategy allows you to make specific changes to a resource using a standard JSON Patch format (RFC 6902).\n\nadd: Inserts a value into an array or adds a member to an object.\nmerge: Combines the values of the target location with the values from the patch. If the target location doesn't exist, it is created.\nstrategic: specific to Kubernetes and understands the structure of Kubernetes objects.\nremove: Removes a value.\ncopy: Copies a value from one location to another.\nmove: Moves a value from one location to another.\ntest: Tests that a value at the target location is equal to a specified value.\n",
                          "enum": [
                            "merge",
                            "strategic",
                            "add",
                            "remove",
                            "copy",
                            "move",
                            "test"
                          ]
                        },
                        "mutatorRef": {
                          "x-oapi-codegen-extra-tags": {
                            "json": "mutatorRef,omitempty"
                          },
                          "type": "array",
                          "description": "JSON ref to value from where patch should be applied.",
                          "items": {
                            "type": "array",
                            "items": {
                              "type": "string"
                            },
                            "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                          }
                        },
                        "mutatedRef": {
                          "x-oapi-codegen-extra-tags": {
                            "json": "mutatedRef,omitempty"
                          },
                          "type": "array",
                          "items": {
                            "type": "array",
                            "items": {
                              "type": "string"
                            },
                            "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                          }
                        }
                      }
                    }
                  }
                },
                "x-oapi-codegen-extra-tags": {
                  "json": "from"
                }
              },
              "to": {
                "description": "Describes the component(s) which are involved in the relationship along with a set of actions to perform upon selection match.",
                "type": "array",
                "items": {
                  "x-go-type": "SelectorItem",
                  "type": "object",
                  "description": "Optional fields that are a part of the selector. Absence of a field has an implied * meaning.",
                  "properties": {
                    "id": {
                      "x-oapi-codegen-extra-tags": {
                        "json": "id"
                      },
                      "type": "string",
                      "format": "uuid",
                      "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "kind": {
                      "type": "string",
                      "x-oapi-codegen-extra-tags": {
                        "json": "kind"
                      },
                      "description": "Kind of the resource.",
                      "maxLength": 255
                    },
                    "match": {
                      "x-go-type": "MatchSelector",
                      "x-oapi-codegen-extra-tags": {
                        "json": "match,omitempty"
                      },
                      "type": "object",
                      "description": "Match configuration for selector",
                      "properties": {
                        "refs": {
                          "type": "array",
                          "items": {
                            "type": "array",
                            "items": {
                              "type": "string"
                            }
                          },
                          "x-oapi-codegen-extra-tags": {
                            "json": "refs,omitempty"
                          },
                          "description": "The refs of the matchselector."
                        },
                        "from": {
                          "type": "array",
                          "items": {
                            "x-go-type": "MatchSelectorItem",
                            "type": "object",
                            "description": "Match selector item for binding between nodes",
                            "required": [
                              "kind"
                            ],
                            "properties": {
                              "id": {
                                "x-oapi-codegen-extra-tags": {
                                  "json": "id"
                                },
                                "type": "string",
                                "format": "uuid",
                                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                }
                              },
                              "kind": {
                                "type": "string",
                                "x-oapi-codegen-extra-tags": {
                                  "json": "kind"
                                },
                                "description": "Kind of the resource.",
                                "maxLength": 255
                              },
                              "mutatorRef": {
                                "x-oapi-codegen-extra-tags": {
                                  "json": "mutatorRef,omitempty"
                                },
                                "type": "array",
                                "description": "JSON ref to value from where patch should be applied.",
                                "items": {
                                  "type": "array",
                                  "items": {
                                    "type": "string"
                                  },
                                  "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                                }
                              },
                              "mutatedRef": {
                                "x-oapi-codegen-extra-tags": {
                                  "json": "mutatedRef,omitempty"
                                },
                                "type": "array",
                                "items": {
                                  "type": "array",
                                  "items": {
                                    "type": "string"
                                  },
                                  "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                                }
                              }
                            }
                          },
                          "x-oapi-codegen-extra-tags": {
                            "json": "from,omitempty"
                          },
                          "description": "The from of the matchselector."
                        },
                        "to": {
                          "type": "array",
                          "items": {
                            "x-go-type": "MatchSelectorItem",
                            "type": "object",
                            "description": "Match selector item for binding between nodes",
                            "required": [
                              "kind"
                            ],
                            "properties": {
                              "id": {
                                "x-oapi-codegen-extra-tags": {
                                  "json": "id"
                                },
                                "type": "string",
                                "format": "uuid",
                                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                "x-go-type": "uuid.UUID",
                                "x-go-type-import": {
                                  "path": "github.com/gofrs/uuid"
                                }
                              },
                              "kind": {
                                "type": "string",
                                "x-oapi-codegen-extra-tags": {
                                  "json": "kind"
                                },
                                "description": "Kind of the resource.",
                                "maxLength": 255
                              },
                              "mutatorRef": {
                                "x-oapi-codegen-extra-tags": {
                                  "json": "mutatorRef,omitempty"
                                },
                                "type": "array",
                                "description": "JSON ref to value from where patch should be applied.",
                                "items": {
                                  "type": "array",
                                  "items": {
                                    "type": "string"
                                  },
                                  "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                                }
                              },
                              "mutatedRef": {
                                "x-oapi-codegen-extra-tags": {
                                  "json": "mutatedRef,omitempty"
                                },
                                "type": "array",
                                "items": {
                                  "type": "array",
                                  "items": {
                                    "type": "string"
                                  },
                                  "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                                }
                              }
                            }
                          },
                          "x-oapi-codegen-extra-tags": {
                            "json": "to,omitempty"
                          },
                          "description": "The to of the matchselector."
                        }
                      }
                    },
                    "matchStrategyMatrix": {
                      "description": "Match strategy matrix for the selector",
                      "type": "array",
                      "items": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      },
                      "x-oapi-codegen-extra-tags": {
                        "json": "matchStrategyMatrix"
                      }
                    },
                    "model": {
                      "x-go-type": "modelv1beta1.ModelReference",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/v1beta1/model",
                        "name": "modelv1beta1"
                      },
                      "description": "Name of the model implicated by this selector. Learn more at https://docs.meshery.io/concepts/models",
                      "x-oapi-codegen-extra-tags": {
                        "json": "model,omitempty"
                      },
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
                    "patch": {
                      "x-go-type": "RelationshipDefinitionSelectorsPatch",
                      "x-oapi-codegen-extra-tags": {
                        "json": "patch"
                      },
                      "type": "object",
                      "description": "Patch configuration for the selector",
                      "x-go-name": "RelationshipDefinitionSelectorsPatch",
                      "properties": {
                        "patchStrategy": {
                          "x-oapi-codegen-extra-tags": {
                            "json": "patchStrategy,omitempty"
                          },
                          "type": "string",
                          "description": "patchStrategy allows you to make specific changes to a resource using a standard JSON Patch format (RFC 6902).\n\nadd: Inserts a value into an array or adds a member to an object.\nmerge: Combines the values of the target location with the values from the patch. If the target location doesn't exist, it is created.\nstrategic: specific to Kubernetes and understands the structure of Kubernetes objects.\nremove: Removes a value.\ncopy: Copies a value from one location to another.\nmove: Moves a value from one location to another.\ntest: Tests that a value at the target location is equal to a specified value.\n",
                          "enum": [
                            "merge",
                            "strategic",
                            "add",
                            "remove",
                            "copy",
                            "move",
                            "test"
                          ]
                        },
                        "mutatorRef": {
                          "x-oapi-codegen-extra-tags": {
                            "json": "mutatorRef,omitempty"
                          },
                          "type": "array",
                          "description": "JSON ref to value from where patch should be applied.",
                          "items": {
                            "type": "array",
                            "items": {
                              "type": "string"
                            },
                            "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                          }
                        },
                        "mutatedRef": {
                          "x-oapi-codegen-extra-tags": {
                            "json": "mutatedRef,omitempty"
                          },
                          "type": "array",
                          "items": {
                            "type": "array",
                            "items": {
                              "type": "string"
                            },
                            "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                          }
                        }
                      }
                    }
                  }
                },
                "x-oapi-codegen-extra-tags": {
                  "json": "to"
                }
              }
            }
          }
        }
      },
      "SelectorSet": {
        "type": "array",
        "description": "Selectors are organized as an array, with each item containing a distinct set of selectors that share a common functionality. This structure allows for flexibility in defining relationships, even when different components are involved.",
        "x-oapi-codegen-extra-tags": {
          "gorm": "type:bytes;serializer:json"
        },
        "items": {
          "x-go-type": "SelectorSetItem",
          "type": "object",
          "description": "Optional selectors used to match Components. Absence of a selector means that it is applied to all Components.",
          "required": [
            "allow"
          ],
          "properties": {
            "allow": {
              "description": "Selectors used to define relationships which are allowed.",
              "x-go-type": "Selector",
              "x-oapi-codegen-extra-tags": {
                "json": "allow"
              },
              "type": "object",
              "required": [
                "from",
                "to"
              ],
              "properties": {
                "from": {
                  "description": "Describes the component(s) which are involved in the relationship along with a set of actions to perform upon selection match.",
                  "type": "array",
                  "items": {
                    "x-go-type": "SelectorItem",
                    "type": "object",
                    "description": "Optional fields that are a part of the selector. Absence of a field has an implied * meaning.",
                    "properties": {
                      "id": {
                        "x-oapi-codegen-extra-tags": {
                          "json": "id"
                        },
                        "type": "string",
                        "format": "uuid",
                        "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        }
                      },
                      "kind": {
                        "type": "string",
                        "x-oapi-codegen-extra-tags": {
                          "json": "kind"
                        },
                        "description": "Kind of the resource.",
                        "maxLength": 255
                      },
                      "match": {
                        "x-go-type": "MatchSelector",
                        "x-oapi-codegen-extra-tags": {
                          "json": "match,omitempty"
                        },
                        "type": "object",
                        "description": "Match configuration for selector",
                        "properties": {
                          "refs": {
                            "type": "array",
                            "items": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            },
                            "x-oapi-codegen-extra-tags": {
                              "json": "refs,omitempty"
                            },
                            "description": "The refs of the matchselector."
                          },
                          "from": {
                            "type": "array",
                            "items": {
                              "x-go-type": "MatchSelectorItem",
                              "type": "object",
                              "description": "Match selector item for binding between nodes",
                              "required": [
                                "kind"
                              ],
                              "properties": {
                                "id": {
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "id"
                                  },
                                  "type": "string",
                                  "format": "uuid",
                                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                  "x-go-type": "uuid.UUID",
                                  "x-go-type-import": {
                                    "path": "github.com/gofrs/uuid"
                                  }
                                },
                                "kind": {
                                  "type": "string",
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "kind"
                                  },
                                  "description": "Kind of the resource.",
                                  "maxLength": 255
                                },
                                "mutatorRef": {
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "mutatorRef,omitempty"
                                  },
                                  "type": "array",
                                  "description": "JSON ref to value from where patch should be applied.",
                                  "items": {
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    },
                                    "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                                  }
                                },
                                "mutatedRef": {
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "mutatedRef,omitempty"
                                  },
                                  "type": "array",
                                  "items": {
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    },
                                    "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                                  }
                                }
                              }
                            },
                            "x-oapi-codegen-extra-tags": {
                              "json": "from,omitempty"
                            },
                            "description": "The from of the matchselector."
                          },
                          "to": {
                            "type": "array",
                            "items": {
                              "x-go-type": "MatchSelectorItem",
                              "type": "object",
                              "description": "Match selector item for binding between nodes",
                              "required": [
                                "kind"
                              ],
                              "properties": {
                                "id": {
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "id"
                                  },
                                  "type": "string",
                                  "format": "uuid",
                                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                  "x-go-type": "uuid.UUID",
                                  "x-go-type-import": {
                                    "path": "github.com/gofrs/uuid"
                                  }
                                },
                                "kind": {
                                  "type": "string",
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "kind"
                                  },
                                  "description": "Kind of the resource.",
                                  "maxLength": 255
                                },
                                "mutatorRef": {
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "mutatorRef,omitempty"
                                  },
                                  "type": "array",
                                  "description": "JSON ref to value from where patch should be applied.",
                                  "items": {
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    },
                                    "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                                  }
                                },
                                "mutatedRef": {
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "mutatedRef,omitempty"
                                  },
                                  "type": "array",
                                  "items": {
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    },
                                    "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                                  }
                                }
                              }
                            },
                            "x-oapi-codegen-extra-tags": {
                              "json": "to,omitempty"
                            },
                            "description": "The to of the matchselector."
                          }
                        }
                      },
                      "matchStrategyMatrix": {
                        "description": "Match strategy matrix for the selector",
                        "type": "array",
                        "items": {
                          "type": "array",
                          "items": {
                            "type": "string"
                          }
                        },
                        "x-oapi-codegen-extra-tags": {
                          "json": "matchStrategyMatrix"
                        }
                      },
                      "model": {
                        "x-go-type": "modelv1beta1.ModelReference",
                        "x-go-type-import": {
                          "path": "github.com/meshery/schemas/models/v1beta1/model",
                          "name": "modelv1beta1"
                        },
                        "description": "Name of the model implicated by this selector. Learn more at https://docs.meshery.io/concepts/models",
                        "x-oapi-codegen-extra-tags": {
                          "json": "model,omitempty"
                        },
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
                      "patch": {
                        "x-go-type": "RelationshipDefinitionSelectorsPatch",
                        "x-oapi-codegen-extra-tags": {
                          "json": "patch"
                        },
                        "type": "object",
                        "description": "Patch configuration for the selector",
                        "x-go-name": "RelationshipDefinitionSelectorsPatch",
                        "properties": {
                          "patchStrategy": {
                            "x-oapi-codegen-extra-tags": {
                              "json": "patchStrategy,omitempty"
                            },
                            "type": "string",
                            "description": "patchStrategy allows you to make specific changes to a resource using a standard JSON Patch format (RFC 6902).\n\nadd: Inserts a value into an array or adds a member to an object.\nmerge: Combines the values of the target location with the values from the patch. If the target location doesn't exist, it is created.\nstrategic: specific to Kubernetes and understands the structure of Kubernetes objects.\nremove: Removes a value.\ncopy: Copies a value from one location to another.\nmove: Moves a value from one location to another.\ntest: Tests that a value at the target location is equal to a specified value.\n",
                            "enum": [
                              "merge",
                              "strategic",
                              "add",
                              "remove",
                              "copy",
                              "move",
                              "test"
                            ]
                          },
                          "mutatorRef": {
                            "x-oapi-codegen-extra-tags": {
                              "json": "mutatorRef,omitempty"
                            },
                            "type": "array",
                            "description": "JSON ref to value from where patch should be applied.",
                            "items": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              },
                              "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                            }
                          },
                          "mutatedRef": {
                            "x-oapi-codegen-extra-tags": {
                              "json": "mutatedRef,omitempty"
                            },
                            "type": "array",
                            "items": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              },
                              "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                            }
                          }
                        }
                      }
                    }
                  },
                  "x-oapi-codegen-extra-tags": {
                    "json": "from"
                  }
                },
                "to": {
                  "description": "Describes the component(s) which are involved in the relationship along with a set of actions to perform upon selection match.",
                  "type": "array",
                  "items": {
                    "x-go-type": "SelectorItem",
                    "type": "object",
                    "description": "Optional fields that are a part of the selector. Absence of a field has an implied * meaning.",
                    "properties": {
                      "id": {
                        "x-oapi-codegen-extra-tags": {
                          "json": "id"
                        },
                        "type": "string",
                        "format": "uuid",
                        "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        }
                      },
                      "kind": {
                        "type": "string",
                        "x-oapi-codegen-extra-tags": {
                          "json": "kind"
                        },
                        "description": "Kind of the resource.",
                        "maxLength": 255
                      },
                      "match": {
                        "x-go-type": "MatchSelector",
                        "x-oapi-codegen-extra-tags": {
                          "json": "match,omitempty"
                        },
                        "type": "object",
                        "description": "Match configuration for selector",
                        "properties": {
                          "refs": {
                            "type": "array",
                            "items": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            },
                            "x-oapi-codegen-extra-tags": {
                              "json": "refs,omitempty"
                            },
                            "description": "The refs of the matchselector."
                          },
                          "from": {
                            "type": "array",
                            "items": {
                              "x-go-type": "MatchSelectorItem",
                              "type": "object",
                              "description": "Match selector item for binding between nodes",
                              "required": [
                                "kind"
                              ],
                              "properties": {
                                "id": {
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "id"
                                  },
                                  "type": "string",
                                  "format": "uuid",
                                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                  "x-go-type": "uuid.UUID",
                                  "x-go-type-import": {
                                    "path": "github.com/gofrs/uuid"
                                  }
                                },
                                "kind": {
                                  "type": "string",
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "kind"
                                  },
                                  "description": "Kind of the resource.",
                                  "maxLength": 255
                                },
                                "mutatorRef": {
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "mutatorRef,omitempty"
                                  },
                                  "type": "array",
                                  "description": "JSON ref to value from where patch should be applied.",
                                  "items": {
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    },
                                    "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                                  }
                                },
                                "mutatedRef": {
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "mutatedRef,omitempty"
                                  },
                                  "type": "array",
                                  "items": {
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    },
                                    "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                                  }
                                }
                              }
                            },
                            "x-oapi-codegen-extra-tags": {
                              "json": "from,omitempty"
                            },
                            "description": "The from of the matchselector."
                          },
                          "to": {
                            "type": "array",
                            "items": {
                              "x-go-type": "MatchSelectorItem",
                              "type": "object",
                              "description": "Match selector item for binding between nodes",
                              "required": [
                                "kind"
                              ],
                              "properties": {
                                "id": {
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "id"
                                  },
                                  "type": "string",
                                  "format": "uuid",
                                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                  "x-go-type": "uuid.UUID",
                                  "x-go-type-import": {
                                    "path": "github.com/gofrs/uuid"
                                  }
                                },
                                "kind": {
                                  "type": "string",
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "kind"
                                  },
                                  "description": "Kind of the resource.",
                                  "maxLength": 255
                                },
                                "mutatorRef": {
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "mutatorRef,omitempty"
                                  },
                                  "type": "array",
                                  "description": "JSON ref to value from where patch should be applied.",
                                  "items": {
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    },
                                    "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                                  }
                                },
                                "mutatedRef": {
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "mutatedRef,omitempty"
                                  },
                                  "type": "array",
                                  "items": {
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    },
                                    "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                                  }
                                }
                              }
                            },
                            "x-oapi-codegen-extra-tags": {
                              "json": "to,omitempty"
                            },
                            "description": "The to of the matchselector."
                          }
                        }
                      },
                      "matchStrategyMatrix": {
                        "description": "Match strategy matrix for the selector",
                        "type": "array",
                        "items": {
                          "type": "array",
                          "items": {
                            "type": "string"
                          }
                        },
                        "x-oapi-codegen-extra-tags": {
                          "json": "matchStrategyMatrix"
                        }
                      },
                      "model": {
                        "x-go-type": "modelv1beta1.ModelReference",
                        "x-go-type-import": {
                          "path": "github.com/meshery/schemas/models/v1beta1/model",
                          "name": "modelv1beta1"
                        },
                        "description": "Name of the model implicated by this selector. Learn more at https://docs.meshery.io/concepts/models",
                        "x-oapi-codegen-extra-tags": {
                          "json": "model,omitempty"
                        },
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
                      "patch": {
                        "x-go-type": "RelationshipDefinitionSelectorsPatch",
                        "x-oapi-codegen-extra-tags": {
                          "json": "patch"
                        },
                        "type": "object",
                        "description": "Patch configuration for the selector",
                        "x-go-name": "RelationshipDefinitionSelectorsPatch",
                        "properties": {
                          "patchStrategy": {
                            "x-oapi-codegen-extra-tags": {
                              "json": "patchStrategy,omitempty"
                            },
                            "type": "string",
                            "description": "patchStrategy allows you to make specific changes to a resource using a standard JSON Patch format (RFC 6902).\n\nadd: Inserts a value into an array or adds a member to an object.\nmerge: Combines the values of the target location with the values from the patch. If the target location doesn't exist, it is created.\nstrategic: specific to Kubernetes and understands the structure of Kubernetes objects.\nremove: Removes a value.\ncopy: Copies a value from one location to another.\nmove: Moves a value from one location to another.\ntest: Tests that a value at the target location is equal to a specified value.\n",
                            "enum": [
                              "merge",
                              "strategic",
                              "add",
                              "remove",
                              "copy",
                              "move",
                              "test"
                            ]
                          },
                          "mutatorRef": {
                            "x-oapi-codegen-extra-tags": {
                              "json": "mutatorRef,omitempty"
                            },
                            "type": "array",
                            "description": "JSON ref to value from where patch should be applied.",
                            "items": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              },
                              "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                            }
                          },
                          "mutatedRef": {
                            "x-oapi-codegen-extra-tags": {
                              "json": "mutatedRef,omitempty"
                            },
                            "type": "array",
                            "items": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              },
                              "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                            }
                          }
                        }
                      }
                    }
                  },
                  "x-oapi-codegen-extra-tags": {
                    "json": "to"
                  }
                }
              }
            },
            "deny": {
              "description": "Optional selectors used to define relationships which should not be created / is restricted.",
              "x-go-type": "Selector",
              "x-oapi-codegen-extra-tags": {
                "json": "deny,omitempty"
              },
              "type": "object",
              "required": [
                "from",
                "to"
              ],
              "properties": {
                "from": {
                  "description": "Describes the component(s) which are involved in the relationship along with a set of actions to perform upon selection match.",
                  "type": "array",
                  "items": {
                    "x-go-type": "SelectorItem",
                    "type": "object",
                    "description": "Optional fields that are a part of the selector. Absence of a field has an implied * meaning.",
                    "properties": {
                      "id": {
                        "x-oapi-codegen-extra-tags": {
                          "json": "id"
                        },
                        "type": "string",
                        "format": "uuid",
                        "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        }
                      },
                      "kind": {
                        "type": "string",
                        "x-oapi-codegen-extra-tags": {
                          "json": "kind"
                        },
                        "description": "Kind of the resource.",
                        "maxLength": 255
                      },
                      "match": {
                        "x-go-type": "MatchSelector",
                        "x-oapi-codegen-extra-tags": {
                          "json": "match,omitempty"
                        },
                        "type": "object",
                        "description": "Match configuration for selector",
                        "properties": {
                          "refs": {
                            "type": "array",
                            "items": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            },
                            "x-oapi-codegen-extra-tags": {
                              "json": "refs,omitempty"
                            },
                            "description": "The refs of the matchselector."
                          },
                          "from": {
                            "type": "array",
                            "items": {
                              "x-go-type": "MatchSelectorItem",
                              "type": "object",
                              "description": "Match selector item for binding between nodes",
                              "required": [
                                "kind"
                              ],
                              "properties": {
                                "id": {
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "id"
                                  },
                                  "type": "string",
                                  "format": "uuid",
                                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                  "x-go-type": "uuid.UUID",
                                  "x-go-type-import": {
                                    "path": "github.com/gofrs/uuid"
                                  }
                                },
                                "kind": {
                                  "type": "string",
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "kind"
                                  },
                                  "description": "Kind of the resource.",
                                  "maxLength": 255
                                },
                                "mutatorRef": {
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "mutatorRef,omitempty"
                                  },
                                  "type": "array",
                                  "description": "JSON ref to value from where patch should be applied.",
                                  "items": {
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    },
                                    "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                                  }
                                },
                                "mutatedRef": {
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "mutatedRef,omitempty"
                                  },
                                  "type": "array",
                                  "items": {
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    },
                                    "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                                  }
                                }
                              }
                            },
                            "x-oapi-codegen-extra-tags": {
                              "json": "from,omitempty"
                            },
                            "description": "The from of the matchselector."
                          },
                          "to": {
                            "type": "array",
                            "items": {
                              "x-go-type": "MatchSelectorItem",
                              "type": "object",
                              "description": "Match selector item for binding between nodes",
                              "required": [
                                "kind"
                              ],
                              "properties": {
                                "id": {
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "id"
                                  },
                                  "type": "string",
                                  "format": "uuid",
                                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                  "x-go-type": "uuid.UUID",
                                  "x-go-type-import": {
                                    "path": "github.com/gofrs/uuid"
                                  }
                                },
                                "kind": {
                                  "type": "string",
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "kind"
                                  },
                                  "description": "Kind of the resource.",
                                  "maxLength": 255
                                },
                                "mutatorRef": {
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "mutatorRef,omitempty"
                                  },
                                  "type": "array",
                                  "description": "JSON ref to value from where patch should be applied.",
                                  "items": {
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    },
                                    "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                                  }
                                },
                                "mutatedRef": {
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "mutatedRef,omitempty"
                                  },
                                  "type": "array",
                                  "items": {
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    },
                                    "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                                  }
                                }
                              }
                            },
                            "x-oapi-codegen-extra-tags": {
                              "json": "to,omitempty"
                            },
                            "description": "The to of the matchselector."
                          }
                        }
                      },
                      "matchStrategyMatrix": {
                        "description": "Match strategy matrix for the selector",
                        "type": "array",
                        "items": {
                          "type": "array",
                          "items": {
                            "type": "string"
                          }
                        },
                        "x-oapi-codegen-extra-tags": {
                          "json": "matchStrategyMatrix"
                        }
                      },
                      "model": {
                        "x-go-type": "modelv1beta1.ModelReference",
                        "x-go-type-import": {
                          "path": "github.com/meshery/schemas/models/v1beta1/model",
                          "name": "modelv1beta1"
                        },
                        "description": "Name of the model implicated by this selector. Learn more at https://docs.meshery.io/concepts/models",
                        "x-oapi-codegen-extra-tags": {
                          "json": "model,omitempty"
                        },
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
                      "patch": {
                        "x-go-type": "RelationshipDefinitionSelectorsPatch",
                        "x-oapi-codegen-extra-tags": {
                          "json": "patch"
                        },
                        "type": "object",
                        "description": "Patch configuration for the selector",
                        "x-go-name": "RelationshipDefinitionSelectorsPatch",
                        "properties": {
                          "patchStrategy": {
                            "x-oapi-codegen-extra-tags": {
                              "json": "patchStrategy,omitempty"
                            },
                            "type": "string",
                            "description": "patchStrategy allows you to make specific changes to a resource using a standard JSON Patch format (RFC 6902).\n\nadd: Inserts a value into an array or adds a member to an object.\nmerge: Combines the values of the target location with the values from the patch. If the target location doesn't exist, it is created.\nstrategic: specific to Kubernetes and understands the structure of Kubernetes objects.\nremove: Removes a value.\ncopy: Copies a value from one location to another.\nmove: Moves a value from one location to another.\ntest: Tests that a value at the target location is equal to a specified value.\n",
                            "enum": [
                              "merge",
                              "strategic",
                              "add",
                              "remove",
                              "copy",
                              "move",
                              "test"
                            ]
                          },
                          "mutatorRef": {
                            "x-oapi-codegen-extra-tags": {
                              "json": "mutatorRef,omitempty"
                            },
                            "type": "array",
                            "description": "JSON ref to value from where patch should be applied.",
                            "items": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              },
                              "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                            }
                          },
                          "mutatedRef": {
                            "x-oapi-codegen-extra-tags": {
                              "json": "mutatedRef,omitempty"
                            },
                            "type": "array",
                            "items": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              },
                              "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                            }
                          }
                        }
                      }
                    }
                  },
                  "x-oapi-codegen-extra-tags": {
                    "json": "from"
                  }
                },
                "to": {
                  "description": "Describes the component(s) which are involved in the relationship along with a set of actions to perform upon selection match.",
                  "type": "array",
                  "items": {
                    "x-go-type": "SelectorItem",
                    "type": "object",
                    "description": "Optional fields that are a part of the selector. Absence of a field has an implied * meaning.",
                    "properties": {
                      "id": {
                        "x-oapi-codegen-extra-tags": {
                          "json": "id"
                        },
                        "type": "string",
                        "format": "uuid",
                        "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                        "x-go-type": "uuid.UUID",
                        "x-go-type-import": {
                          "path": "github.com/gofrs/uuid"
                        }
                      },
                      "kind": {
                        "type": "string",
                        "x-oapi-codegen-extra-tags": {
                          "json": "kind"
                        },
                        "description": "Kind of the resource.",
                        "maxLength": 255
                      },
                      "match": {
                        "x-go-type": "MatchSelector",
                        "x-oapi-codegen-extra-tags": {
                          "json": "match,omitempty"
                        },
                        "type": "object",
                        "description": "Match configuration for selector",
                        "properties": {
                          "refs": {
                            "type": "array",
                            "items": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              }
                            },
                            "x-oapi-codegen-extra-tags": {
                              "json": "refs,omitempty"
                            },
                            "description": "The refs of the matchselector."
                          },
                          "from": {
                            "type": "array",
                            "items": {
                              "x-go-type": "MatchSelectorItem",
                              "type": "object",
                              "description": "Match selector item for binding between nodes",
                              "required": [
                                "kind"
                              ],
                              "properties": {
                                "id": {
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "id"
                                  },
                                  "type": "string",
                                  "format": "uuid",
                                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                  "x-go-type": "uuid.UUID",
                                  "x-go-type-import": {
                                    "path": "github.com/gofrs/uuid"
                                  }
                                },
                                "kind": {
                                  "type": "string",
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "kind"
                                  },
                                  "description": "Kind of the resource.",
                                  "maxLength": 255
                                },
                                "mutatorRef": {
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "mutatorRef,omitempty"
                                  },
                                  "type": "array",
                                  "description": "JSON ref to value from where patch should be applied.",
                                  "items": {
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    },
                                    "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                                  }
                                },
                                "mutatedRef": {
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "mutatedRef,omitempty"
                                  },
                                  "type": "array",
                                  "items": {
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    },
                                    "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                                  }
                                }
                              }
                            },
                            "x-oapi-codegen-extra-tags": {
                              "json": "from,omitempty"
                            },
                            "description": "The from of the matchselector."
                          },
                          "to": {
                            "type": "array",
                            "items": {
                              "x-go-type": "MatchSelectorItem",
                              "type": "object",
                              "description": "Match selector item for binding between nodes",
                              "required": [
                                "kind"
                              ],
                              "properties": {
                                "id": {
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "id"
                                  },
                                  "type": "string",
                                  "format": "uuid",
                                  "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                                  "x-go-type": "uuid.UUID",
                                  "x-go-type-import": {
                                    "path": "github.com/gofrs/uuid"
                                  }
                                },
                                "kind": {
                                  "type": "string",
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "kind"
                                  },
                                  "description": "Kind of the resource.",
                                  "maxLength": 255
                                },
                                "mutatorRef": {
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "mutatorRef,omitempty"
                                  },
                                  "type": "array",
                                  "description": "JSON ref to value from where patch should be applied.",
                                  "items": {
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    },
                                    "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                                  }
                                },
                                "mutatedRef": {
                                  "x-oapi-codegen-extra-tags": {
                                    "json": "mutatedRef,omitempty"
                                  },
                                  "type": "array",
                                  "items": {
                                    "type": "array",
                                    "items": {
                                      "type": "string"
                                    },
                                    "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                                  }
                                }
                              }
                            },
                            "x-oapi-codegen-extra-tags": {
                              "json": "to,omitempty"
                            },
                            "description": "The to of the matchselector."
                          }
                        }
                      },
                      "matchStrategyMatrix": {
                        "description": "Match strategy matrix for the selector",
                        "type": "array",
                        "items": {
                          "type": "array",
                          "items": {
                            "type": "string"
                          }
                        },
                        "x-oapi-codegen-extra-tags": {
                          "json": "matchStrategyMatrix"
                        }
                      },
                      "model": {
                        "x-go-type": "modelv1beta1.ModelReference",
                        "x-go-type-import": {
                          "path": "github.com/meshery/schemas/models/v1beta1/model",
                          "name": "modelv1beta1"
                        },
                        "description": "Name of the model implicated by this selector. Learn more at https://docs.meshery.io/concepts/models",
                        "x-oapi-codegen-extra-tags": {
                          "json": "model,omitempty"
                        },
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
                      "patch": {
                        "x-go-type": "RelationshipDefinitionSelectorsPatch",
                        "x-oapi-codegen-extra-tags": {
                          "json": "patch"
                        },
                        "type": "object",
                        "description": "Patch configuration for the selector",
                        "x-go-name": "RelationshipDefinitionSelectorsPatch",
                        "properties": {
                          "patchStrategy": {
                            "x-oapi-codegen-extra-tags": {
                              "json": "patchStrategy,omitempty"
                            },
                            "type": "string",
                            "description": "patchStrategy allows you to make specific changes to a resource using a standard JSON Patch format (RFC 6902).\n\nadd: Inserts a value into an array or adds a member to an object.\nmerge: Combines the values of the target location with the values from the patch. If the target location doesn't exist, it is created.\nstrategic: specific to Kubernetes and understands the structure of Kubernetes objects.\nremove: Removes a value.\ncopy: Copies a value from one location to another.\nmove: Moves a value from one location to another.\ntest: Tests that a value at the target location is equal to a specified value.\n",
                            "enum": [
                              "merge",
                              "strategic",
                              "add",
                              "remove",
                              "copy",
                              "move",
                              "test"
                            ]
                          },
                          "mutatorRef": {
                            "x-oapi-codegen-extra-tags": {
                              "json": "mutatorRef,omitempty"
                            },
                            "type": "array",
                            "description": "JSON ref to value from where patch should be applied.",
                            "items": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              },
                              "description": "The sequence of mutatorRef and mutatedRef must match. eg: mutatorRef: [[config, url], [config, name]], mutatedRef: [[configPatch, value], [name]]. The value [config, url] will be patched at [configPatch, value]. Similarly [config,name] will be patched at [name]."
                            }
                          },
                          "mutatedRef": {
                            "x-oapi-codegen-extra-tags": {
                              "json": "mutatedRef,omitempty"
                            },
                            "type": "array",
                            "items": {
                              "type": "array",
                              "items": {
                                "type": "string"
                              },
                              "description": "JSONPath (https://en.wikipedia.org/wiki/JSONPath) to property to be patched."
                            }
                          }
                        }
                      }
                    }
                  },
                  "x-oapi-codegen-extra-tags": {
                    "json": "to"
                  }
                }
              }
            }
          }
        }
      },
      "RelationshipDefinitionMetadataStylesTextTransform": {
        "type": "string",
        "description": "A transformation to apply to the label text",
        "enum": [
          "none",
          "uppercase",
          "lowercase"
        ]
      },
      "RelationshipDefinitionMetadataStylesLineStyle": {
        "type": "string",
        "description": "The style of the edge's line.",
        "enum": [
          "solid",
          "dotted",
          "dashed"
        ]
      },
      "RelationshipDefinitionMetadataStylesCurveStyle": {
        "type": "string",
        "description": "The curving method used to separate two or more edges between two nodes; may be haystack (very fast, bundled straight edges for which loops and compounds are unsupported), straight (straight edges with all arrows supported), bezier (bundled curved edges), unbundled-bezier (curved edges for use with manual control points), segments (a series of straight lines), taxi (right-angled lines, hierarchically bundled). Note that haystack edges work best with ellipse, rectangle, or similar nodes. Smaller node shapes, like triangle, will not be as aesthetically pleasing. Also note that edge endpoint arrows are unsupported for haystack edges.",
        "enum": [
          "haystack",
          "straight",
          "bezier",
          "unbundled-bezier",
          "segments",
          "taxi"
        ]
      },
      "RelationshipDefinitionMetadataStylesLineCap": {
        "type": "string",
        "description": "The cap style of the edge's line; may be butt (default), round, or square. The cap may or may not be visible, depending on the shape of the node and the relative size of the node and edge. Caps other than butt extend beyond the specified endpoint of the edge.",
        "enum": [
          "butt",
          "round",
          "square"
        ]
      },
      "RelationshipDefinitionMetadataStylesArrowShape": {
        "type": "string",
        "description": "The shape of the edge's arrow",
        "enum": [
          "triangle",
          "triangle-tee",
          "circle-triangle",
          "triangle-cross",
          "triangle-backcurve",
          "vee",
          "tee",
          "square",
          "circle",
          "diamond",
          "chevron",
          "none"
        ]
      },
      "RelationshipDefinitionMetadataStylesMidTargetArrowShape": {
        "type": "string",
        "description": "The shape of the edge's source arrow",
        "enum": [
          "triangle",
          "triangle-tee",
          "circle-triangle",
          "triangle-cross",
          "triangle-backcurve",
          "vee",
          "tee",
          "square",
          "circle",
          "diamond",
          "chevron",
          "none"
        ]
      },
      "RelationshipDefinitionMetadataStylesMidTargetArrowFill": {
        "type": "string",
        "description": "The fill state of the edge's source arrow",
        "enum": [
          "filled",
          "hollow"
        ]
      },
      "RelationshipDefinitionMetadataStylesTargetArrowShape": {
        "type": "string",
        "description": "The shape of the edge's source arrow",
        "enum": [
          "triangle",
          "triangle-tee",
          "circle-triangle",
          "triangle-cross",
          "triangle-backcurve",
          "vee",
          "tee",
          "square",
          "circle",
          "diamond",
          "chevron",
          "none"
        ]
      },
      "RelationshipDefinitionMetadataStylesTargetArrowFill": {
        "type": "string",
        "description": "The fill state of the edge's source arrow",
        "enum": [
          "filled",
          "hollow"
        ]
      },
      "RelationshipDefinitionMetadataStyles": {
        "type": "object",
        "description": "Visualization styles for a relationship",
        "required": [
          "primaryColor",
          "svgColor",
          "svgWhite"
        ],
        "properties": {
          "primaryColor": {
            "type": "string",
            "description": "Primary color of the component used for UI representation.",
            "x-oapi-codegen-extra-tags": {
              "json": "primaryColor"
            },
            "maxLength": 500
          },
          "secondaryColor": {
            "type": "string",
            "description": "Secondary color of the entity used for UI representation.",
            "x-oapi-codegen-extra-tags": {
              "json": "secondaryColor,omitempty"
            },
            "maxLength": 500
          },
          "svgWhite": {
            "type": "string",
            "description": "White SVG of the entity used for UI representation on dark background.",
            "x-oapi-codegen-extra-tags": {
              "json": "svgWhite"
            },
            "maxLength": 500
          },
          "svgColor": {
            "type": "string",
            "description": "Colored SVG of the entity used for UI representation on light background.",
            "x-oapi-codegen-extra-tags": {
              "json": "svgColor"
            },
            "maxLength": 500
          },
          "svgComplete": {
            "type": "string",
            "description": "Complete SVG of the entity used for UI representation, often inclusive of background.",
            "x-oapi-codegen-extra-tags": {
              "json": "svgComplete,omitempty"
            },
            "maxLength": 500
          },
          "color": {
            "type": "string",
            "description": "The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g.",
            "x-oapi-codegen-extra-tags": {
              "json": "color,omitempty"
            },
            "maxLength": 500
          },
          "textOpacity": {
            "type": "number",
            "format": "float",
            "description": "The opacity of the label text, including its outline.",
            "x-go-name": "TextOpacity",
            "x-oapi-codegen-extra-tags": {
              "json": "textOpacity,omitempty"
            },
            "minimum": 0,
            "maximum": 1
          },
          "fontFamily": {
            "type": "string",
            "description": "A comma-separated list of font names to use on the label text.",
            "x-go-name": "FontFamily",
            "x-oapi-codegen-extra-tags": {
              "json": "fontFamily,omitempty"
            },
            "maxLength": 500
          },
          "fontSize": {
            "type": "string",
            "description": "The size of the label text.",
            "x-go-name": "FontSize",
            "x-oapi-codegen-extra-tags": {
              "json": "fontSize,omitempty"
            },
            "maxLength": 500
          },
          "fontStyle": {
            "type": "string",
            "description": "A CSS font style to be applied to the label text.",
            "x-go-name": "FontStyle",
            "x-oapi-codegen-extra-tags": {
              "json": "fontStyle,omitempty"
            },
            "maxLength": 500
          },
          "fontWeight": {
            "type": "string",
            "description": "A CSS font weight to be applied to the label text.",
            "x-go-name": "FontWeight",
            "x-oapi-codegen-extra-tags": {
              "json": "fontWeight,omitempty"
            },
            "maxLength": 500
          },
          "textTransform": {
            "description": "A transformation to apply to the label text",
            "x-go-name": "TextTransform",
            "x-oapi-codegen-extra-tags": {
              "json": "textTransform,omitempty"
            },
            "type": "string",
            "enum": [
              "none",
              "uppercase",
              "lowercase"
            ]
          },
          "opacity": {
            "type": "number",
            "format": "float",
            "description": "The opacity of the element, ranging from 0 to 1. Note that the opacity of a compound node parent affects the effective opacity of its children.See https://js.cytoscape.org/#style/visibility",
            "x-go-name": "Opacity",
            "x-oapi-codegen-extra-tags": {
              "json": "opacity,omitempty"
            },
            "minimum": 0,
            "maximum": 1
          },
          "zIndex": {
            "type": "integer",
            "description": "An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index.",
            "x-go-name": "ZIndex",
            "x-oapi-codegen-extra-tags": {
              "json": "zIndex,omitempty"
            },
            "minimum": 0
          },
          "label": {
            "type": "string",
            "description": "The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id",
            "x-go-name": "Label",
            "x-oapi-codegen-extra-tags": {
              "json": "label,omitempty"
            },
            "maxLength": 500
          },
          "edgeAnimation": {
            "type": "string",
            "description": "The animation to use for the edge. Can be like 'marching-ants' , 'blink' , 'moving-gradient',etc .",
            "x-go-name": "EdgeAnimation",
            "x-oapi-codegen-extra-tags": {
              "json": "edgeAnimation,omitempty"
            },
            "maxLength": 500
          },
          "curveStyle": {
            "x-go-name": "CurveStyle",
            "x-oapi-codegen-extra-tags": {
              "json": "curveStyle,omitempty"
            },
            "type": "string",
            "description": "The curving method used to separate two or more edges between two nodes; may be haystack (very fast, bundled straight edges for which loops and compounds are unsupported), straight (straight edges with all arrows supported), bezier (bundled curved edges), unbundled-bezier (curved edges for use with manual control points), segments (a series of straight lines), taxi (right-angled lines, hierarchically bundled). Note that haystack edges work best with ellipse, rectangle, or similar nodes. Smaller node shapes, like triangle, will not be as aesthetically pleasing. Also note that edge endpoint arrows are unsupported for haystack edges.",
            "enum": [
              "haystack",
              "straight",
              "bezier",
              "unbundled-bezier",
              "segments",
              "taxi"
            ]
          },
          "lineColor": {
            "type": "string",
            "description": "The colour of the edge's line. Colours may be specified by name (e.g. red), hex (e.g.",
            "x-go-name": "LineColor",
            "x-oapi-codegen-extra-tags": {
              "json": "lineColor,omitempty"
            },
            "maxLength": 500
          },
          "lineStyle": {
            "x-go-name": "LineStyle",
            "x-oapi-codegen-extra-tags": {
              "json": "lineStyle,omitempty"
            },
            "type": "string",
            "description": "The style of the edge's line.",
            "enum": [
              "solid",
              "dotted",
              "dashed"
            ]
          },
          "lineCap": {
            "x-go-name": "LineCap",
            "x-oapi-codegen-extra-tags": {
              "json": "lineCap,omitempty"
            },
            "type": "string",
            "description": "The cap style of the edge's line; may be butt (default), round, or square. The cap may or may not be visible, depending on the shape of the node and the relative size of the node and edge. Caps other than butt extend beyond the specified endpoint of the edge.",
            "enum": [
              "butt",
              "round",
              "square"
            ]
          },
          "lineOpacity": {
            "type": "number",
            "format": "float",
            "description": "The opacity of the edge's line and arrow. Useful if you wish to have a separate opacity for the edge label versus the edge line. Note that the opacity value of the edge element affects the effective opacity of its line and label subcomponents.",
            "x-go-name": "LineOpacity",
            "x-oapi-codegen-extra-tags": {
              "json": "lineOpacity,omitempty"
            },
            "minimum": 0,
            "maximum": 1
          },
          "targetArrowColor": {
            "type": "string",
            "description": "The colour of the edge's source arrow. Colours may be specified by name (e.g. red), hex (e.g.",
            "x-go-name": "TargetArrowColor",
            "x-oapi-codegen-extra-tags": {
              "json": "targetArrowColor,omitempty"
            },
            "maxLength": 500
          },
          "targetArrowShape": {
            "x-go-name": "TargetArrowShape",
            "x-oapi-codegen-extra-tags": {
              "json": "targetArrowShape,omitempty"
            },
            "type": "string",
            "description": "The shape of the edge's source arrow",
            "enum": [
              "triangle",
              "triangle-tee",
              "circle-triangle",
              "triangle-cross",
              "triangle-backcurve",
              "vee",
              "tee",
              "square",
              "circle",
              "diamond",
              "chevron",
              "none"
            ]
          },
          "targetArrowFill": {
            "x-go-name": "TargetArrowFill",
            "x-oapi-codegen-extra-tags": {
              "json": "targetArrowFill,omitempty"
            },
            "type": "string",
            "description": "The fill state of the edge's source arrow",
            "enum": [
              "filled",
              "hollow"
            ]
          },
          "midTargetArrowColor": {
            "type": "string",
            "description": "The colour of the edge's source arrow. Colours may be specified by name (e.g. red), hex (e.g.",
            "x-go-name": "MidTargetArrowColor",
            "x-oapi-codegen-extra-tags": {
              "json": "midTargetArrowColor,omitempty"
            },
            "maxLength": 500
          },
          "midTargetArrowShape": {
            "x-go-name": "MidTargetArrowShape",
            "x-oapi-codegen-extra-tags": {
              "json": "midTargetArrowShape,omitempty"
            },
            "type": "string",
            "description": "The shape of the edge's source arrow",
            "enum": [
              "triangle",
              "triangle-tee",
              "circle-triangle",
              "triangle-cross",
              "triangle-backcurve",
              "vee",
              "tee",
              "square",
              "circle",
              "diamond",
              "chevron",
              "none"
            ]
          },
          "midTargetArrowFill": {
            "x-go-name": "MidTargetArrowFill",
            "x-oapi-codegen-extra-tags": {
              "json": "midTargetArrowFill,omitempty"
            },
            "type": "string",
            "description": "The fill state of the edge's source arrow",
            "enum": [
              "filled",
              "hollow"
            ]
          },
          "arrowScale": {
            "type": "number",
            "format": "float",
            "description": "Scaling for the arrow size.",
            "x-go-name": "ArrowScale",
            "x-oapi-codegen-extra-tags": {
              "json": "arrowScale,omitempty"
            },
            "minimum": 0
          },
          "sourceLabel": {
            "type": "string",
            "description": "The text to display for an edge's source label. Can give a path, e.g. data(id) will label with the elements id",
            "x-go-name": "SourceLabel",
            "x-oapi-codegen-extra-tags": {
              "json": "sourceLabel,omitempty"
            },
            "maxLength": 500
          },
          "targetLabel": {
            "type": "string",
            "description": "The text to display for an edge's target label. Can give a path, e.g. data(id) will label with the elements id",
            "x-go-name": "TargetLabel",
            "x-oapi-codegen-extra-tags": {
              "json": "targetLabel,omitempty"
            },
            "maxLength": 500
          }
        }
      },
      "RelationshipMetadata": {
        "type": "object",
        "description": "Metadata contains additional information associated with the Relationship.",
        "additionalProperties": true,
        "x-go-name": "RelationshipMetadata",
        "x-oapi-codegen-extra-tags": {
          "gorm": "type:bytes;serializer:json"
        },
        "properties": {
          "description": {
            "description": "Characterization of the meaning of the relationship and its relevance to both Meshery and entities under management.",
            "type": "string",
            "x-oapi-codegen-extra-tags": {
              "json": "description"
            },
            "maxLength": 5000
          },
          "styles": {
            "x-go-type": "RelationshipDefinitionMetadataStyles",
            "x-oapi-codegen-extra-tags": {
              "json": "styles"
            },
            "type": "object",
            "description": "Visualization styles for a relationship",
            "required": [
              "primaryColor",
              "svgColor",
              "svgWhite"
            ],
            "properties": {
              "primaryColor": {
                "type": "string",
                "description": "Primary color of the component used for UI representation.",
                "x-oapi-codegen-extra-tags": {
                  "json": "primaryColor"
                },
                "maxLength": 500
              },
              "secondaryColor": {
                "type": "string",
                "description": "Secondary color of the entity used for UI representation.",
                "x-oapi-codegen-extra-tags": {
                  "json": "secondaryColor,omitempty"
                },
                "maxLength": 500
              },
              "svgWhite": {
                "type": "string",
                "description": "White SVG of the entity used for UI representation on dark background.",
                "x-oapi-codegen-extra-tags": {
                  "json": "svgWhite"
                },
                "maxLength": 500
              },
              "svgColor": {
                "type": "string",
                "description": "Colored SVG of the entity used for UI representation on light background.",
                "x-oapi-codegen-extra-tags": {
                  "json": "svgColor"
                },
                "maxLength": 500
              },
              "svgComplete": {
                "type": "string",
                "description": "Complete SVG of the entity used for UI representation, often inclusive of background.",
                "x-oapi-codegen-extra-tags": {
                  "json": "svgComplete,omitempty"
                },
                "maxLength": 500
              },
              "color": {
                "type": "string",
                "description": "The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g.",
                "x-oapi-codegen-extra-tags": {
                  "json": "color,omitempty"
                },
                "maxLength": 500
              },
              "textOpacity": {
                "type": "number",
                "format": "float",
                "description": "The opacity of the label text, including its outline.",
                "x-go-name": "TextOpacity",
                "x-oapi-codegen-extra-tags": {
                  "json": "textOpacity,omitempty"
                },
                "minimum": 0,
                "maximum": 1
              },
              "fontFamily": {
                "type": "string",
                "description": "A comma-separated list of font names to use on the label text.",
                "x-go-name": "FontFamily",
                "x-oapi-codegen-extra-tags": {
                  "json": "fontFamily,omitempty"
                },
                "maxLength": 500
              },
              "fontSize": {
                "type": "string",
                "description": "The size of the label text.",
                "x-go-name": "FontSize",
                "x-oapi-codegen-extra-tags": {
                  "json": "fontSize,omitempty"
                },
                "maxLength": 500
              },
              "fontStyle": {
                "type": "string",
                "description": "A CSS font style to be applied to the label text.",
                "x-go-name": "FontStyle",
                "x-oapi-codegen-extra-tags": {
                  "json": "fontStyle,omitempty"
                },
                "maxLength": 500
              },
              "fontWeight": {
                "type": "string",
                "description": "A CSS font weight to be applied to the label text.",
                "x-go-name": "FontWeight",
                "x-oapi-codegen-extra-tags": {
                  "json": "fontWeight,omitempty"
                },
                "maxLength": 500
              },
              "textTransform": {
                "description": "A transformation to apply to the label text",
                "x-go-name": "TextTransform",
                "x-oapi-codegen-extra-tags": {
                  "json": "textTransform,omitempty"
                },
                "type": "string",
                "enum": [
                  "none",
                  "uppercase",
                  "lowercase"
                ]
              },
              "opacity": {
                "type": "number",
                "format": "float",
                "description": "The opacity of the element, ranging from 0 to 1. Note that the opacity of a compound node parent affects the effective opacity of its children.See https://js.cytoscape.org/#style/visibility",
                "x-go-name": "Opacity",
                "x-oapi-codegen-extra-tags": {
                  "json": "opacity,omitempty"
                },
                "minimum": 0,
                "maximum": 1
              },
              "zIndex": {
                "type": "integer",
                "description": "An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index.",
                "x-go-name": "ZIndex",
                "x-oapi-codegen-extra-tags": {
                  "json": "zIndex,omitempty"
                },
                "minimum": 0
              },
              "label": {
                "type": "string",
                "description": "The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id",
                "x-go-name": "Label",
                "x-oapi-codegen-extra-tags": {
                  "json": "label,omitempty"
                },
                "maxLength": 500
              },
              "edgeAnimation": {
                "type": "string",
                "description": "The animation to use for the edge. Can be like 'marching-ants' , 'blink' , 'moving-gradient',etc .",
                "x-go-name": "EdgeAnimation",
                "x-oapi-codegen-extra-tags": {
                  "json": "edgeAnimation,omitempty"
                },
                "maxLength": 500
              },
              "curveStyle": {
                "x-go-name": "CurveStyle",
                "x-oapi-codegen-extra-tags": {
                  "json": "curveStyle,omitempty"
                },
                "type": "string",
                "description": "The curving method used to separate two or more edges between two nodes; may be haystack (very fast, bundled straight edges for which loops and compounds are unsupported), straight (straight edges with all arrows supported), bezier (bundled curved edges), unbundled-bezier (curved edges for use with manual control points), segments (a series of straight lines), taxi (right-angled lines, hierarchically bundled). Note that haystack edges work best with ellipse, rectangle, or similar nodes. Smaller node shapes, like triangle, will not be as aesthetically pleasing. Also note that edge endpoint arrows are unsupported for haystack edges.",
                "enum": [
                  "haystack",
                  "straight",
                  "bezier",
                  "unbundled-bezier",
                  "segments",
                  "taxi"
                ]
              },
              "lineColor": {
                "type": "string",
                "description": "The colour of the edge's line. Colours may be specified by name (e.g. red), hex (e.g.",
                "x-go-name": "LineColor",
                "x-oapi-codegen-extra-tags": {
                  "json": "lineColor,omitempty"
                },
                "maxLength": 500
              },
              "lineStyle": {
                "x-go-name": "LineStyle",
                "x-oapi-codegen-extra-tags": {
                  "json": "lineStyle,omitempty"
                },
                "type": "string",
                "description": "The style of the edge's line.",
                "enum": [
                  "solid",
                  "dotted",
                  "dashed"
                ]
              },
              "lineCap": {
                "x-go-name": "LineCap",
                "x-oapi-codegen-extra-tags": {
                  "json": "lineCap,omitempty"
                },
                "type": "string",
                "description": "The cap style of the edge's line; may be butt (default), round, or square. The cap may or may not be visible, depending on the shape of the node and the relative size of the node and edge. Caps other than butt extend beyond the specified endpoint of the edge.",
                "enum": [
                  "butt",
                  "round",
                  "square"
                ]
              },
              "lineOpacity": {
                "type": "number",
                "format": "float",
                "description": "The opacity of the edge's line and arrow. Useful if you wish to have a separate opacity for the edge label versus the edge line. Note that the opacity value of the edge element affects the effective opacity of its line and label subcomponents.",
                "x-go-name": "LineOpacity",
                "x-oapi-codegen-extra-tags": {
                  "json": "lineOpacity,omitempty"
                },
                "minimum": 0,
                "maximum": 1
              },
              "targetArrowColor": {
                "type": "string",
                "description": "The colour of the edge's source arrow. Colours may be specified by name (e.g. red), hex (e.g.",
                "x-go-name": "TargetArrowColor",
                "x-oapi-codegen-extra-tags": {
                  "json": "targetArrowColor,omitempty"
                },
                "maxLength": 500
              },
              "targetArrowShape": {
                "x-go-name": "TargetArrowShape",
                "x-oapi-codegen-extra-tags": {
                  "json": "targetArrowShape,omitempty"
                },
                "type": "string",
                "description": "The shape of the edge's source arrow",
                "enum": [
                  "triangle",
                  "triangle-tee",
                  "circle-triangle",
                  "triangle-cross",
                  "triangle-backcurve",
                  "vee",
                  "tee",
                  "square",
                  "circle",
                  "diamond",
                  "chevron",
                  "none"
                ]
              },
              "targetArrowFill": {
                "x-go-name": "TargetArrowFill",
                "x-oapi-codegen-extra-tags": {
                  "json": "targetArrowFill,omitempty"
                },
                "type": "string",
                "description": "The fill state of the edge's source arrow",
                "enum": [
                  "filled",
                  "hollow"
                ]
              },
              "midTargetArrowColor": {
                "type": "string",
                "description": "The colour of the edge's source arrow. Colours may be specified by name (e.g. red), hex (e.g.",
                "x-go-name": "MidTargetArrowColor",
                "x-oapi-codegen-extra-tags": {
                  "json": "midTargetArrowColor,omitempty"
                },
                "maxLength": 500
              },
              "midTargetArrowShape": {
                "x-go-name": "MidTargetArrowShape",
                "x-oapi-codegen-extra-tags": {
                  "json": "midTargetArrowShape,omitempty"
                },
                "type": "string",
                "description": "The shape of the edge's source arrow",
                "enum": [
                  "triangle",
                  "triangle-tee",
                  "circle-triangle",
                  "triangle-cross",
                  "triangle-backcurve",
                  "vee",
                  "tee",
                  "square",
                  "circle",
                  "diamond",
                  "chevron",
                  "none"
                ]
              },
              "midTargetArrowFill": {
                "x-go-name": "MidTargetArrowFill",
                "x-oapi-codegen-extra-tags": {
                  "json": "midTargetArrowFill,omitempty"
                },
                "type": "string",
                "description": "The fill state of the edge's source arrow",
                "enum": [
                  "filled",
                  "hollow"
                ]
              },
              "arrowScale": {
                "type": "number",
                "format": "float",
                "description": "Scaling for the arrow size.",
                "x-go-name": "ArrowScale",
                "x-oapi-codegen-extra-tags": {
                  "json": "arrowScale,omitempty"
                },
                "minimum": 0
              },
              "sourceLabel": {
                "type": "string",
                "description": "The text to display for an edge's source label. Can give a path, e.g. data(id) will label with the elements id",
                "x-go-name": "SourceLabel",
                "x-oapi-codegen-extra-tags": {
                  "json": "sourceLabel,omitempty"
                },
                "maxLength": 500
              },
              "targetLabel": {
                "type": "string",
                "description": "The text to display for an edge's target label. Can give a path, e.g. data(id) will label with the elements id",
                "x-go-name": "TargetLabel",
                "x-oapi-codegen-extra-tags": {
                  "json": "targetLabel,omitempty"
                },
                "maxLength": 500
              }
            }
          },
          "isAnnotation": {
            "type": "boolean",
            "description": "Indicates whether the relationship should be treated as a logical representation only",
            "x-oapi-codegen-extra-tags": {
              "json": "isAnnotation"
            }
          }
        }
      }
    }
  }
};

export default RelationshipSchema;
