/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const schema = {
  "openapi": "3.0.0",
  "info": {
    "title": "Core Schema Elements",
    "description": "Reusable core schema elements",
    "version": "1.0.0"
  },
  "paths": {},
  "components": {
    "schemas": {
      "inputString": {
        "type": "string",
        "pattern": "^[a-zA-Z_][a-zA-Z0-9_-]*[a-zA-Z0-9_]$",
        "description": "A string starting with an alphanumeric character. Spaces and hyphens allowed."
      },
      "versionString": {
        "type": "string",
        "minLength": 2,
        "maxLength": 100,
        "description": "API version of the object",
        "pattern": "([a-z.])*(?!^/)v(alpha|beta|[0-9]+)([.-]*[a-z0-9]+)*$",
        "example": [
          "v1",
          "v1alpha1",
          "v2beta3",
          "v1.custom-suffix"
        ]
      },
      "semverString": {
        "type": "string",
        "minLength": 5,
        "maxLength": 100,
        "pattern": "^[a-z0-9]+.[0-9]+.[0-9]+(-[0-9A-Za-z-]+(.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$",
        "description": "A valid semantic version string between 5 and 256 characters. The pattern allows for a major.minor.patch version followed by an optional pre-release tag like '-alpha' or '-beta.2' and an optional build metadata tag like '+build.1."
      },
      "uuid": {
        "type": "string",
        "format": "uuid",
        "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
        "x-go-type": "uuid.UUID",
        "x-go-type-import": {
          "path": "github.com/gofrs/uuid"
        }
      },
      "Id": {
        "type": "string",
        "format": "uuid",
        "x-go-type": "uuid.UUID",
        "x-go-type-import": {
          "path": "github.com/gofrs/uuid"
        },
        "x-go-type-skip-optional-pointer": true
      },
      "username": {
        "type": "string",
        "x-go-type-skip-optional-pointer": true
      },
      "provider": {
        "type": "string",
        "description": "One of (x-oapi-codegen-extra-tags-cloud, github, google)",
        "x-go-type-skip-optional-pointer": true
      },
      "Time": {
        "type": "string",
        "format": "date-time",
        "x-go-type-skip-optional-pointer": true
      },
      "SqlNullTime": {
        "type": "string",
        "format": "date-time",
        "x-go-type": "sql.NullTime",
        "x-go-type-import": {
          "path": "database/sql"
        },
        "x-go-type-skip-optional-pointer": true
      },
      "email": {
        "type": "string",
        "format": "email",
        "description": "email",
        "x-go-type-skip-optional-pointer": true
      },
      "Text": {
        "type": "string",
        "x-go-type-skip-optional-pointer": true
      },
      "number": {
        "type": "integer",
        "x-go-type-skip-optional-pointer": true
      },
      "avatar_url": {
        "type": "string",
        "description": "Link for profile picture",
        "x-go-type-skip-optional-pointer": true
      },
      "MapObject": {
        "type": "object",
        "additionalProperties": {
          "type": "string"
        },
        "x-go-type-skip-optional-pointer": true
      },
      "status": {
        "type": "string",
        "x-go-type-skip-optional-pointer": true
      },
      "bio": {
        "type": "string",
        "x-go-type-skip-optional-pointer": true
      },
      "accepted_terms_at": {
        "type": "string",
        "x-go-type-skip-optional-pointer": true
      },
      "emails": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "email",
          "description": "email",
          "x-go-type-skip-optional-pointer": true
        },
        "x-go-type-skip-optional-pointer": true
      },
      "user_ids": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid",
          "x-go-type": "uuid.UUID",
          "x-go-type-import": {
            "path": "github.com/gofrs/uuid"
          },
          "x-go-type-skip-optional-pointer": true
        },
        "x-go-type-skip-optional-pointer": true
      },
      "price": {
        "type": "integer",
        "format": "int32",
        "x-go-type-skip-optional-pointer": true
      },
      "Endpoint": {
        "description": "endpoint",
        "format\"": "uri",
        "pattern": "^https?://",
        "x-go-type-skip-optional-pointer": true,
        "type": "string"
      },
      "roleNames": {
        "type": "array",
        "items": {
          "type": "string",
          "x-go-type-skip-optional-pointer": true
        },
        "x-go-type-skip-optional-pointer": true
      },
      "recordsPage": {
        "discriminator": {
          "propertyName": "recordType"
        },
        "properties": {
          "page": {
            "type": "integer",
            "x-go-type-skip-optional-pointer": true
          },
          "page_size": {
            "type": "integer",
            "x-go-type-skip-optional-pointer": true
          },
          "records_total": {
            "type": "integer",
            "x-go-type-skip-optional-pointer": true
          },
          "recordType": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          }
        },
        "x-go-type-skip-optional-pointer": true
      },
      "resultsPage": {
        "discriminator": {
          "propertyName": "resultType"
        },
        "properties": {
          "page": {
            "type": "integer",
            "x-go-type-skip-optional-pointer": true
          },
          "page_size": {
            "type": "integer",
            "x-go-type-skip-optional-pointer": true
          },
          "total_count": {
            "type": "integer",
            "x-go-type-skip-optional-pointer": true
          },
          "resultType": {
            "type": "string",
            "x-go-type-skip-optional-pointer": true
          }
        },
        "x-go-type-skip-optional-pointer": true
      },
      "empty": {
        "description": "Body for empty request",
        "type": "object",
        "properties": {},
        "x-go-type-skip-optional-pointer": true
      },
      "email_preference": {
        "type": "object",
        "properties": {
          "welcome_email": {
            "type": "boolean",
            "x-go-type-skip-optional-pointer": true
          },
          "notify_role_change": {
            "type": "boolean",
            "x-go-type-skip-optional-pointer": true
          }
        },
        "x-go-type-skip-optional-pointer": true
      },
      "user_uuid": {
        "type": "string",
        "format": "uuid",
        "x-go-type": "uuid.UUID",
        "x-go-type-import": {
          "path": "github.com/gofrs/uuid"
        },
        "x-oapi-codegen-extra-tags": {
          "db": "user_id",
          "json": "user_id"
        },
        "x-go-name": "UserID",
        "x-go-type-skip-optional-pointer": true
      },
      "organization_id": {
        "type": "string",
        "format": "uuid",
        "x-go-type": "uuid.UUID",
        "x-go-type-import": {
          "path": "github.com/gofrs/uuid"
        },
        "x-oapi-codegen-extra-tags": {
          "db": "org_id",
          "json": "org_id"
        },
        "x-go-type-name": "OrganizationId",
        "x-go-type-skip-optional-pointer": true
      },
      "general_id": {
        "type": "string",
        "format": "uuid",
        "x-go-type": "uuid.UUID",
        "x-go-type-import": {
          "path": "github.com/gofrs/uuid"
        },
        "x-oapi-codegen-extra-tags": {
          "db": "id",
          "json": "id"
        },
        "x-go-type-name": "GeneralId",
        "x-go-type-skip-optional-pointer": true
      },
      "environment_id": {
        "type": "string",
        "format": "uuid",
        "x-go-type": "uuid.UUID",
        "x-go-type-import": {
          "path": "github.com/gofrs/uuid"
        },
        "x-oapi-codegen-extra-tags": {
          "db": "environment_id",
          "json": "environment_id"
        },
        "x-go-type-name": "EnvironmentId",
        "x-go-type-skip-optional-pointer": true
      },
      "workspace_id": {
        "type": "string",
        "format": "uuid",
        "x-go-type": "uuid.UUID",
        "x-go-type-import": {
          "path": "github.com/gofrs/uuid"
        },
        "x-oapi-codegen-extra-tags": {
          "db": "workspace_id",
          "json": "workspace_id"
        },
        "x-go-type-name": "WorkspaceId",
        "x-go-type-skip-optional-pointer": true
      },
      "view_id": {
        "type": "string",
        "format": "uuid",
        "x-go-type": "uuid.UUID",
        "x-go-type-import": {
          "path": "github.com/gofrs/uuid"
        },
        "x-oapi-codegen-extra-tags": {
          "db": "view_id",
          "json": "view_id"
        },
        "x-go-type-name": "ViewId",
        "x-go-type-skip-optional-pointer": true
      },
      "team_id": {
        "type": "string",
        "format": "uuid",
        "x-go-type": "uuid.UUID",
        "x-go-type-import": {
          "path": "github.com/gofrs/uuid"
        },
        "x-oapi-codegen-extra-tags": {
          "db": "team_id",
          "json": "team_id"
        },
        "x-go-type-name": "TeamId",
        "x-go-type-skip-optional-pointer": true
      },
      "design_id": {
        "type": "string",
        "format": "uuid",
        "x-go-type": "uuid.UUID",
        "x-go-type-import": {
          "path": "github.com/gofrs/uuid"
        },
        "x-oapi-codegen-extra-tags": {
          "db": "design_id",
          "json": "design_id"
        },
        "x-go-type-name": "DesignId",
        "x-go-type-skip-optional-pointer": true
      },
      "credential_uuid": {
        "type": "string",
        "format": "uuid",
        "x-go-type": "uuid.UUID",
        "x-go-type-import": {
          "path": "github.com/gofrs/uuid"
        },
        "x-oapi-codegen-extra-tags": {
          "db": "credential_id",
          "json": "credential_id"
        },
        "x-go-name": "CredentialID",
        "x-go-type-skip-optional-pointer": true
      },
      "meshery_instance_uuid": {
        "type": "string",
        "format": "uuid",
        "x-go-type": "uuid.UUID",
        "x-go-type-import": {
          "path": "github.com/gofrs/uuid"
        },
        "x-oapi-codegen-extra-tags": {
          "db": "meshery_instance_id",
          "json": "meshery_instance_id"
        },
        "x-go-name": "MesheryInstanceID",
        "x-go-type-skip-optional-pointer": true
      },
      "kubernetes_server_uuid": {
        "type": "string",
        "format": "uuid",
        "x-go-type": "uuid.UUID",
        "x-go-type-import": {
          "path": "github.com/gofrs/uuid"
        },
        "x-oapi-codegen-extra-tags": {
          "db": "kubernetes_server_id",
          "json": "kubernetes_server_id"
        },
        "x-go-name": "KubernetesServerID",
        "x-go-type-skip-optional-pointer": true
      },
      "system_id": {
        "type": "string",
        "format": "uuid",
        "x-go-type": "uuid.UUID",
        "x-go-type-import": {
          "path": "github.com/gofrs/uuid"
        },
        "x-oapi-codegen-extra-tags": {
          "db": "system_id"
        },
        "x-go-name": "SystemID",
        "x-go-type-skip-optional-pointer": true
      },
      "operation_id": {
        "type": "string",
        "format": "uuid",
        "x-go-type": "uuid.UUID",
        "x-go-type-import": {
          "path": "github.com/gofrs/uuid"
        },
        "x-oapi-codegen-extra-tags": {
          "db": "operation_id"
        },
        "x-go-name": "OperationID",
        "x-go-type-skip-optional-pointer": true
      },
      "user_id": {
        "type": "string",
        "description": "user's email or username",
        "x-go-type-skip-optional-pointer": true
      },
      "created_at": {
        "description": "Timestamp when the resource was created.",
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
      "updated_at": {
        "description": "Timestamp when the resource was updated.",
        "x-go-type": "time.Time",
        "type": "string",
        "format": "date-time",
        "x-go-name": "UpdatedAt",
        "x-oapi-codegen-extra-tags": {
          "db": "updated_at",
          "yaml": "updated_at"
        },
        "x-go-type-skip-optional-pointer": true
      },
      "deleted_at": {
        "description": "Timestamp when the resource was deleted.",
        "x-go-type": "time.Time",
        "type": "string",
        "format": "date-time",
        "x-go-name": "DeletedAt",
        "x-oapi-codegen-extra-tags": {
          "db": "deleted_at",
          "yaml": "deleted_at"
        },
        "x-go-type-skip-optional-pointer": true
      },
      "nullTime": {
        "description": "SQL null Timestamp to handle null values of time.",
        "x-go-type": "sql.NullTime",
        "type": "string",
        "x-go-type-skip-optional-pointer": true
      },
      "styles": {
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
            "description": "Primary color of the component used for UI representation."
          },
          "secondaryColor": {
            "type": "string",
            "description": "Secondary color of the entity used for UI representation."
          },
          "svgWhite": {
            "type": "string",
            "description": "White SVG of the entity used for UI representation on dark background."
          },
          "svgColor": {
            "type": "string",
            "description": "Colored SVG of the entity used for UI representation on light background."
          },
          "svgComplete": {
            "type": "string",
            "description": "Complete SVG of the entity used for UI representation, often inclusive of background."
          },
          "color": {
            "type": "string",
            "description": "The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g."
          },
          "text-opacity": {
            "type": "number",
            "description": "The opacity of the label text, including its outline.",
            "minimum": 0,
            "maximum": 1
          },
          "font-family": {
            "type": "string",
            "description": "A comma-separated list of font names to use on the label text."
          },
          "font-size": {
            "type": "string",
            "description": "The size of the label text."
          },
          "font-style": {
            "type": "string",
            "description": "A CSS font style to be applied to the label text."
          },
          "font-weight": {
            "type": "string",
            "description": "A CSS font weight to be applied to the label text."
          },
          "text-transform": {
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
          "z-index": {
            "type": "integer",
            "description": "An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index."
          },
          "label": {
            "type": "string",
            "description": "The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id"
          },
          "animation": {
            "type": "object",
            "description": "The animation to apply to the element. example ripple,bounce,etc"
          }
        }
      },
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
      "edgeStyles": {
        "type": "object",
        "description": "Visualization styles for a relationship",
        "allOf": [
          {
            "x-go-type": "core.Styles",
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
                "description": "Primary color of the component used for UI representation."
              },
              "secondaryColor": {
                "type": "string",
                "description": "Secondary color of the entity used for UI representation."
              },
              "svgWhite": {
                "type": "string",
                "description": "White SVG of the entity used for UI representation on dark background."
              },
              "svgColor": {
                "type": "string",
                "description": "Colored SVG of the entity used for UI representation on light background."
              },
              "svgComplete": {
                "type": "string",
                "description": "Complete SVG of the entity used for UI representation, often inclusive of background."
              },
              "color": {
                "type": "string",
                "description": "The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g."
              },
              "text-opacity": {
                "type": "number",
                "description": "The opacity of the label text, including its outline.",
                "minimum": 0,
                "maximum": 1
              },
              "font-family": {
                "type": "string",
                "description": "A comma-separated list of font names to use on the label text."
              },
              "font-size": {
                "type": "string",
                "description": "The size of the label text."
              },
              "font-style": {
                "type": "string",
                "description": "A CSS font style to be applied to the label text."
              },
              "font-weight": {
                "type": "string",
                "description": "A CSS font weight to be applied to the label text."
              },
              "text-transform": {
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
              "z-index": {
                "type": "integer",
                "description": "An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index."
              },
              "label": {
                "type": "string",
                "description": "The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id"
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
              "edge-animation": {
                "type": "string",
                "description": "The animation to use for the edge. Can be like 'marching-ants' , 'blink' , 'moving-gradient',etc ."
              },
              "curve-style": {
                "type": "string",
                "description": "The curving method used to separate two or more edges between two nodes; may be haystack (very fast, bundled straight edges for which loops and compounds are unsupported), straight (straight edges with all arrows supported), bezier (bundled curved edges), unbundled-bezier (curved edges for use with manual control points), segments (a series of straight lines), taxi (right-angled lines, hierarchically bundled). Note that haystack edges work best with ellipse, rectangle, or similar nodes. Smaller node shapes, like triangle, will not be as aesthetically pleasing. Also note that edge endpoint arrows are unsupported for haystack edges.",
                "default": "straight",
                "enum": [
                  "straight",
                  "haystack",
                  "bezier",
                  "unbundled-bezier",
                  "segments",
                  "taxi"
                ]
              },
              "line-color": {
                "type": "string",
                "description": "The colour of the edge's line. Colours may be specified by name (e.g. red), hex (e.g."
              },
              "line-style": {
                "type": "string",
                "description": "The style of the edge's line.",
                "enum": [
                  "solid",
                  "dotted",
                  "dashed"
                ]
              },
              "line-cap": {
                "type": "string",
                "description": "The cap style of the edge's line; may be butt (default), round, or square. The cap may or may not be visible, depending on the shape of the node and the relative size of the node and edge. Caps other than butt extend beyond the specified endpoint of the edge.",
                "enum": [
                  "butt",
                  "round",
                  "square"
                ],
                "default": "butt"
              },
              "line-opacity": {
                "type": "number",
                "minimum": 0,
                "maximum": 1,
                "default": 1,
                "description": "The opacity of the edge's line and arrow. Useful if you wish to have a separate opacity for the edge label versus the edge line. Note that the opacity value of the edge element affects the effective opacity of its line and label subcomponents."
              },
              "target-arrow-color": {
                "type": "string",
                "description": "The colour of the edge's source arrow. Colours may be specified by name (e.g. red), hex (e.g."
              },
              "target-arrow-shape": {
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
              "target-arrow-fill": {
                "type": "string",
                "description": "The fill state of the edge's source arrow",
                "enum": [
                  "filled",
                  "hollow"
                ]
              },
              "mid-target-arrow-color": {
                "type": "string",
                "description": "The colour of the edge's source arrow. Colours may be specified by name (e.g. red), hex (e.g."
              },
              "mid-target-arrow-shape": {
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
              "mid-target-arrow-fill": {
                "type": "string",
                "description": "The fill state of the edge's source arrow",
                "enum": [
                  "filled",
                  "hollow"
                ]
              },
              "arrow-scale": {
                "type": "number",
                "description": "Scaling for the arrow size.",
                "minimum": 0
              },
              "source-label": {
                "type": "string",
                "description": "The text to display for an edge's source label. Can give a path, e.g. data(id) will label with the elements id"
              },
              "target-label": {
                "type": "string",
                "description": "The text to display for an edge's target label. Can give a path, e.g. data(id) will label with the elements id"
              }
            }
          }
        ]
      },
      "componentStyles": {
        "type": "object",
        "description": "Visualization styles for a component",
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
                "description": "Primary color of the component used for UI representation."
              },
              "secondaryColor": {
                "type": "string",
                "description": "Secondary color of the entity used for UI representation."
              },
              "svgWhite": {
                "type": "string",
                "description": "White SVG of the entity used for UI representation on dark background."
              },
              "svgColor": {
                "type": "string",
                "description": "Colored SVG of the entity used for UI representation on light background."
              },
              "svgComplete": {
                "type": "string",
                "description": "Complete SVG of the entity used for UI representation, often inclusive of background."
              },
              "color": {
                "type": "string",
                "description": "The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g."
              },
              "text-opacity": {
                "type": "number",
                "description": "The opacity of the label text, including its outline.",
                "minimum": 0,
                "maximum": 1
              },
              "font-family": {
                "type": "string",
                "description": "A comma-separated list of font names to use on the label text."
              },
              "font-size": {
                "type": "string",
                "description": "The size of the label text."
              },
              "font-style": {
                "type": "string",
                "description": "A CSS font style to be applied to the label text."
              },
              "font-weight": {
                "type": "string",
                "description": "A CSS font weight to be applied to the label text."
              },
              "text-transform": {
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
              "z-index": {
                "type": "integer",
                "description": "An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index."
              },
              "label": {
                "type": "string",
                "description": "The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id"
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
                    "x-go-type": "float64"
                  },
                  "y": {
                    "type": "number",
                    "description": "The y-coordinate of the node.",
                    "x-go-type": "float64"
                  }
                }
              },
              "body-text": {
                "type": "string",
                "description": "The text to display for an element's body. Can give a path, e.g. data(id) will label with the elements id"
              },
              "body-text-wrap": {
                "type": "string",
                "description": "How to wrap the text in the node. Can be 'none', 'wrap', or 'ellipsis'."
              },
              "body-text-max-width": {
                "type": "string",
                "description": "The maximum width for wrapping text in the node."
              },
              "body-text-opacity": {
                "type": "number",
                "description": "The opacity of the node's body text, including its outline.",
                "minimum": 0,
                "maximum": 1
              },
              "body-text-background-color": {
                "type": "string",
                "description": "The colour of the node's body text background. Colours may be specified by name (e.g. red), hex (e.g."
              },
              "body-text-font-size": {
                "type": "number",
                "description": "The size of the node's body text."
              },
              "body-text-color": {
                "type": "string",
                "description": "The colour of the node's body text. Colours may be specified by name (e.g. red), hex (e.g."
              },
              "body-text-font-weight": {
                "type": "string",
                "description": "A CSS font weight to be applied to the node's body text."
              },
              "body-text-horizontal-align": {
                "type": "string",
                "description": "A CSS horizontal alignment to be applied to the node's body text."
              },
              "body-text-decoration": {
                "type": "string",
                "description": "A CSS text decoration to be applied to the node's body text."
              },
              "body-text-vertical-align": {
                "type": "string",
                "description": "A CSS vertical alignment to be applied to the node's body text."
              },
              "width": {
                "type": "number",
                "description": "The width of the node's body or the width of an edge's line."
              },
              "height": {
                "type": "number",
                "description": "The height of the node's body"
              },
              "background-image": {
                "type": "string",
                "description": "The URL that points to the image to show in the node."
              },
              "background-color": {
                "type": "string",
                "description": "The colour of the node's body. Colours may be specified by name (e.g. red), hex (e.g."
              },
              "background-blacken": {
                "type": "number",
                "description": "Blackens the node's body for values from 0 to 1; whitens the node's body for values from 0 to -1.",
                "maximum": 1,
                "minimum": -1
              },
              "background-opacity": {
                "type": "number",
                "description": "The opacity level of the node's background colour",
                "maximum": 1,
                "minimum": 0
              },
              "background-position-x": {
                "type": "string",
                "description": "The x position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)"
              },
              "background-position-y": {
                "type": "string",
                "description": "The y position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)"
              },
              "background-offset-x": {
                "type": "string",
                "description": "The x offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)"
              },
              "background-offset-y": {
                "type": "string",
                "description": "The y offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px)"
              },
              "background-fit": {
                "type": "string",
                "description": "How the background image is fit to the node. Can be 'none', 'contain', or 'cover'."
              },
              "background-clip": {
                "type": "string",
                "description": "How the background image is clipped to the node. Can be 'none', 'node', or 'node-border'."
              },
              "background-width-relative-to": {
                "type": "string",
                "description": "How the background image's width is determined. Can be 'none', 'inner', or 'outer'."
              },
              "background-height-relative-to": {
                "type": "string",
                "description": "How the background image's height is determined. Can be 'none', 'inner', or 'outer'."
              },
              "border-width": {
                "type": "number",
                "description": "The size of the node's border.",
                "minimum": 0
              },
              "border-style": {
                "type": "string",
                "description": "The style of the node's border",
                "enum": [
                  "solid",
                  "dotted",
                  "dashed",
                  "double"
                ]
              },
              "border-color": {
                "type": "string",
                "description": "The colour of the node's border. Colours may be specified by name (e.g. red), hex (e.g."
              },
              "border-opacity": {
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
              "text-halign": {
                "type": "string",
                "description": "The horizontal alignment of a node's label",
                "enum": [
                  "left",
                  "center",
                  "right"
                ]
              },
              "text-valign": {
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
              "active-bg-color": {
                "type": "string",
                "description": "The colour of the indicator shown when the background is grabbed by the user. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g."
              },
              "active-bg-opacity": {
                "type": "string",
                "description": "The opacity of the active background indicator. Selector needs to be *core*."
              },
              "active-bg-size": {
                "type": "string",
                "description": "The opacity of the active background indicator. Selector needs to be *core*."
              },
              "selection-box-color": {
                "type": "string",
                "description": "The background colour of the selection box used for drag selection. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g."
              },
              "selection-box-border-width": {
                "type": "number",
                "description": "The size of the border on the selection box. Selector needs to be *core*"
              },
              "selection-box-opacity": {
                "type": "number",
                "description": "The opacity of the selection box. Selector needs to be *core*",
                "minimum": 0,
                "maximum": 1
              },
              "outside-texture-bg-color": {
                "type": "string",
                "description": "The colour of the area outside the viewport texture when initOptions.textureOnViewport === true. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g."
              },
              "outside-texture-bg-opacity": {
                "type": "number",
                "description": "The opacity of the area outside the viewport texture. Selector needs to be *core*",
                "minimum": 0,
                "maximum": 1
              },
              "shape-polygon-points": {
                "type": "string",
                "description": "An array (or a space-separated string) of numbers ranging on [-1, 1], representing alternating x and y values (i.e. x1 y1 x2 y2, x3 y3 ...). This represents the points in the polygon for the node's shape. The bounding box of the node is given by (-1, -1), (1, -1), (1, 1), (-1, 1). The node's position is the origin (0, 0 )"
              },
              "menu-background-color": {
                "type": "string",
                "description": "The colour of the background of the component menu. Colours may be specified by name (e.g. red), hex (e.g."
              },
              "menu-background-opacity": {
                "type": "number",
                "description": "The opacity of the background of the component menu.",
                "minimum": 0,
                "maximum": 1
              },
              "menu-forground-color": {
                "type": "string",
                "description": "The colour of the text or icons in the component menu. Colours may be specified by name (e.g. red), hex (e.g."
              }
            }
          }
        ]
      },
      "relationshipStyles": {
        "oneOf": [
          {
            "type": "object",
            "description": "Visualization styles for a relationship",
            "allOf": [
              {
                "x-go-type": "core.Styles",
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
                    "description": "Primary color of the component used for UI representation."
                  },
                  "secondaryColor": {
                    "type": "string",
                    "description": "Secondary color of the entity used for UI representation."
                  },
                  "svgWhite": {
                    "type": "string",
                    "description": "White SVG of the entity used for UI representation on dark background."
                  },
                  "svgColor": {
                    "type": "string",
                    "description": "Colored SVG of the entity used for UI representation on light background."
                  },
                  "svgComplete": {
                    "type": "string",
                    "description": "Complete SVG of the entity used for UI representation, often inclusive of background."
                  },
                  "color": {
                    "type": "string",
                    "description": "The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g."
                  },
                  "text-opacity": {
                    "type": "number",
                    "description": "The opacity of the label text, including its outline.",
                    "minimum": 0,
                    "maximum": 1
                  },
                  "font-family": {
                    "type": "string",
                    "description": "A comma-separated list of font names to use on the label text."
                  },
                  "font-size": {
                    "type": "string",
                    "description": "The size of the label text."
                  },
                  "font-style": {
                    "type": "string",
                    "description": "A CSS font style to be applied to the label text."
                  },
                  "font-weight": {
                    "type": "string",
                    "description": "A CSS font weight to be applied to the label text."
                  },
                  "text-transform": {
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
                  "z-index": {
                    "type": "integer",
                    "description": "An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index."
                  },
                  "label": {
                    "type": "string",
                    "description": "The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id"
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
                  "edge-animation": {
                    "type": "string",
                    "description": "The animation to use for the edge. Can be like 'marching-ants' , 'blink' , 'moving-gradient',etc ."
                  },
                  "curve-style": {
                    "type": "string",
                    "description": "The curving method used to separate two or more edges between two nodes; may be haystack (very fast, bundled straight edges for which loops and compounds are unsupported), straight (straight edges with all arrows supported), bezier (bundled curved edges), unbundled-bezier (curved edges for use with manual control points), segments (a series of straight lines), taxi (right-angled lines, hierarchically bundled). Note that haystack edges work best with ellipse, rectangle, or similar nodes. Smaller node shapes, like triangle, will not be as aesthetically pleasing. Also note that edge endpoint arrows are unsupported for haystack edges.",
                    "default": "straight",
                    "enum": [
                      "straight",
                      "haystack",
                      "bezier",
                      "unbundled-bezier",
                      "segments",
                      "taxi"
                    ]
                  },
                  "line-color": {
                    "type": "string",
                    "description": "The colour of the edge's line. Colours may be specified by name (e.g. red), hex (e.g."
                  },
                  "line-style": {
                    "type": "string",
                    "description": "The style of the edge's line.",
                    "enum": [
                      "solid",
                      "dotted",
                      "dashed"
                    ]
                  },
                  "line-cap": {
                    "type": "string",
                    "description": "The cap style of the edge's line; may be butt (default), round, or square. The cap may or may not be visible, depending on the shape of the node and the relative size of the node and edge. Caps other than butt extend beyond the specified endpoint of the edge.",
                    "enum": [
                      "butt",
                      "round",
                      "square"
                    ],
                    "default": "butt"
                  },
                  "line-opacity": {
                    "type": "number",
                    "minimum": 0,
                    "maximum": 1,
                    "default": 1,
                    "description": "The opacity of the edge's line and arrow. Useful if you wish to have a separate opacity for the edge label versus the edge line. Note that the opacity value of the edge element affects the effective opacity of its line and label subcomponents."
                  },
                  "target-arrow-color": {
                    "type": "string",
                    "description": "The colour of the edge's source arrow. Colours may be specified by name (e.g. red), hex (e.g."
                  },
                  "target-arrow-shape": {
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
                  "target-arrow-fill": {
                    "type": "string",
                    "description": "The fill state of the edge's source arrow",
                    "enum": [
                      "filled",
                      "hollow"
                    ]
                  },
                  "mid-target-arrow-color": {
                    "type": "string",
                    "description": "The colour of the edge's source arrow. Colours may be specified by name (e.g. red), hex (e.g."
                  },
                  "mid-target-arrow-shape": {
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
                  "mid-target-arrow-fill": {
                    "type": "string",
                    "description": "The fill state of the edge's source arrow",
                    "enum": [
                      "filled",
                      "hollow"
                    ]
                  },
                  "arrow-scale": {
                    "type": "number",
                    "description": "Scaling for the arrow size.",
                    "minimum": 0
                  },
                  "source-label": {
                    "type": "string",
                    "description": "The text to display for an edge's source label. Can give a path, e.g. data(id) will label with the elements id"
                  },
                  "target-label": {
                    "type": "string",
                    "description": "The text to display for an edge's target label. Can give a path, e.g. data(id) will label with the elements id"
                  }
                }
              }
            ]
          },
          {
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
                    "description": "Primary color of the component used for UI representation."
                  },
                  "secondaryColor": {
                    "type": "string",
                    "description": "Secondary color of the entity used for UI representation."
                  },
                  "svgWhite": {
                    "type": "string",
                    "description": "White SVG of the entity used for UI representation on dark background."
                  },
                  "svgColor": {
                    "type": "string",
                    "description": "Colored SVG of the entity used for UI representation on light background."
                  },
                  "svgComplete": {
                    "type": "string",
                    "description": "Complete SVG of the entity used for UI representation, often inclusive of background."
                  },
                  "color": {
                    "type": "string",
                    "description": "The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g."
                  },
                  "text-opacity": {
                    "type": "number",
                    "description": "The opacity of the label text, including its outline.",
                    "minimum": 0,
                    "maximum": 1
                  },
                  "font-family": {
                    "type": "string",
                    "description": "A comma-separated list of font names to use on the label text."
                  },
                  "font-size": {
                    "type": "string",
                    "description": "The size of the label text."
                  },
                  "font-style": {
                    "type": "string",
                    "description": "A CSS font style to be applied to the label text."
                  },
                  "font-weight": {
                    "type": "string",
                    "description": "A CSS font weight to be applied to the label text."
                  },
                  "text-transform": {
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
                  "z-index": {
                    "type": "integer",
                    "description": "An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index."
                  },
                  "label": {
                    "type": "string",
                    "description": "The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id"
                  },
                  "animation": {
                    "type": "object",
                    "description": "The animation to apply to the element. example ripple,bounce,etc"
                  }
                }
              },
              {
                "additionalProperties": true
              }
            ],
            "description": "Extension point for additional styles"
          }
        ]
      },
      "NonResolvedAlias": {
        "description": "An alias is an component that acts as an ref/pointer to a field in another component, nonResolvedAlias are not aware of there immediate parents",
        "type": "object",
        "properties": {
          "relationship_id": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "alias_component_id": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "immediate_parent_id": {
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "immediate_ref_field_path": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        },
        "required": [
          "relationship_id",
          "alias_component_id",
          "immediate_parent_id",
          "immediate_ref_field_path"
        ]
      },
      "ResolvedAlias": {
        "description": "An resolved alias is an component that acts as an ref/pointer to a field in another component, resolvedAlias are aware of there immediate parents and completely resolved parents also",
        "allOf": [
          {
            "description": "An alias is an component that acts as an ref/pointer to a field in another component, nonResolvedAlias are not aware of there immediate parents",
            "type": "object",
            "properties": {
              "relationship_id": {
                "type": "string",
                "format": "uuid",
                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                }
              },
              "alias_component_id": {
                "type": "string",
                "format": "uuid",
                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                }
              },
              "immediate_parent_id": {
                "type": "string",
                "format": "uuid",
                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                }
              },
              "immediate_ref_field_path": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            },
            "required": [
              "relationship_id",
              "alias_component_id",
              "immediate_parent_id",
              "immediate_ref_field_path"
            ]
          },
          {
            "type": "object",
            "properties": {
              "resolved_parent_id": {
                "type": "string",
                "format": "uuid",
                "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                }
              },
              "resolved_ref_field_path": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            },
            "required": [
              "resolved_parent_id",
              "resolved_ref_field_path"
            ]
          }
        ]
      },
      "IaCFileTypes": {
        "type": "string",
        "description": "The type of the IaC file",
        "enum": [
          "meshery-design",
          "helm-chart",
          "k8s-manifest",
          "docker-compose",
          "k8s-kustomize"
        ]
      }
    },
    "parameters": {
      "id": {
        "name": "id",
        "in": "path",
        "description": "Unique identifier",
        "schema": {
          "type": "string",
          "format": "uuid",
          "x-go-type": "uuid.UUID",
          "x-go-type-import": {
            "path": "github.com/gofrs/uuid"
          },
          "x-go-type-skip-optional-pointer": true
        },
        "required": true
      },
      "all": {
        "name": "all",
        "in": "query",
        "description": "Get all possible entries",
        "schema": {
          "type": "boolean"
        }
      },
      "page": {
        "name": "page",
        "in": "query",
        "description": "Get responses by page",
        "schema": {
          "type": "string"
        }
      },
      "userid": {
        "name": "userid",
        "in": "query",
        "description": "Filter catalog items by user ID. Pass multiple user IDs to fetch content for several users simultaneously.",
        "schema": {
          "type": "string"
        }
      },
      "metrics": {
        "name": "metrics",
        "in": "query",
        "description": "Include metrics associated with the designs.",
        "schema": {
          "type": "string"
        }
      },
      "class": {
        "name": "class",
        "in": "query",
        "description": "Filter catalog items based on their support class. Specify one or more classes per request as needed. Example: 'official' and 'verified'",
        "schema": {
          "type": "string"
        }
      },
      "pagesize": {
        "name": "pagesize",
        "in": "query",
        "description": "Get responses by pagesize",
        "schema": {
          "type": "string"
        }
      },
      "pagesizeWithAll": {
        "name": "pagesize",
        "in": "query",
        "description": "Get responses by pagesize (pass all to get all responses)",
        "schema": {
          "type": "string"
        }
      },
      "order": {
        "name": "order",
        "in": "query",
        "description": "Get ordered responses",
        "schema": {
          "type": "string"
        }
      },
      "visibility": {
        "name": "visibility",
        "in": "query",
        "description": "Get responses based on visibility - private, public or published",
        "schema": {
          "type": "string"
        }
      },
      "populate": {
        "name": "populate",
        "in": "query",
        "description": "Populate the response with additional data like pattern_file",
        "schema": {
          "type": "string"
        }
      },
      "search": {
        "name": "search",
        "in": "query",
        "description": "Get responses that match search param value",
        "schema": {
          "type": "string"
        }
      },
      "filter": {
        "name": "filter",
        "in": "query",
        "description": "Get filtered reponses",
        "schema": {
          "type": "string"
        }
      },
      "isOAuth": {
        "name": "isOAuth",
        "in": "query",
        "description": "To get OAuth tokens as well",
        "schema": {
          "type": "string"
        }
      },
      "name": {
        "name": "name",
        "in": "query",
        "description": "Name of the resource",
        "schema": {
          "type": "string"
        }
      },
      "purpose": {
        "name": "purpose",
        "in": "query",
        "description": "Purpose for which token is generated",
        "schema": {
          "type": "string"
        }
      },
      "cumulative": {
        "name": "cumulative",
        "in": "query",
        "description": "Cumulative events",
        "schema": {
          "type": "string"
        }
      },
      "mesheryVersion": {
        "name": "meshery-version",
        "in": "path",
        "description": "meshery version",
        "schema": {
          "type": "string"
        },
        "required": true
      },
      "os": {
        "name": "os",
        "in": "query",
        "description": "user's os",
        "schema": {
          "type": "string"
        }
      },
      "playground": {
        "name": "playground",
        "in": "query",
        "description": "Is playground mode",
        "schema": {
          "type": "string"
        }
      },
      "namespace": {
        "name": "namespace",
        "in": "query",
        "description": "Namespace",
        "schema": {
          "type": "string"
        }
      },
      "type": {
        "name": "type",
        "in": "query",
        "description": "Type",
        "schema": {
          "type": "string"
        }
      },
      "actorType": {
        "name": "actorType",
        "in": "path",
        "description": "Type of actor e.g user, team, system, registrant",
        "schema": {
          "type": "string"
        },
        "required": true
      },
      "resourceType": {
        "name": "resourceType",
        "in": "path",
        "description": "Type of resource e.g design, filter, view, environment, workspace",
        "schema": {
          "type": "string"
        },
        "required": true
      },
      "contentType": {
        "in": "query",
        "required": false,
        "name": "type",
        "description": "Filter catalog data based on type of content e.g (deployment, workloads, scaling...) multiple params can be passed",
        "schema": {
          "type": "string"
        }
      },
      "contentTechnology": {
        "in": "query",
        "required": false,
        "name": "technology",
        "description": "Filter catalog data based on technology(compatibility) of content e.g (kubernetes, istio...) multiple params can be passed",
        "schema": {
          "type": "string"
        }
      }
    },
    "responses": {
      "200": {
        "description": "ok",
        "content": {
          "text/plain": {
            "schema": {
              "type": "string"
            }
          }
        }
      },
      "201": {
        "description": "",
        "content": {
          "text/plain": {
            "schema": {
              "type": "string"
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
      "409": {
        "description": "Publish request already exists",
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
  "$schema": "http://json-schema.org/draft-04/schema#"
};

export default schema;
