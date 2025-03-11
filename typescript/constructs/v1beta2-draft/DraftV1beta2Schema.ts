// Generated from constructs/v1beta2-draft/draft-v1beta2.json
// This file exports the original JSON schema

const schema = {
  "$id": "https://schemas.meshery.io/component.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "Components are reusable building blocks for depicting capabilities defined within models. Learn more at https://docs.meshery.io/concepts/components",
  "additionalProperties": false,
  "type": "object",
  "properties": {
    "schemaVersion": {
      "type": "string",
      "description": "Specifies the version of the schema to which the component definition conforms."
    },
    "version": {
      "type": "string",
      "description": "Specifies the version of the component definition."
    },
    "displayName": {
      "$ref": "../core.json#/definitions/inputString",
      "description": "Name of the component in human-readible format."
    },
    "description": {
      "type": "string",
      "description": "A written representation of the purpose and characteristics of the component."
    },
    "format": {
      "type": "string",
      "enum": [
        "JSON",
        "CUE"
      ],
      "default": "JSON",
      "description": "Format specifies the format used in the `component.schema` field. JSON is the default."
    },
    "model": {
      "$ref": "../v1beta1/model.json",
      "description": "Reference to the specific registered model to which the component belongs and from which model version, category, and other properties may be referenced. Learn more at https://docs.meshery.io/concepts/models"
    },
    "metadata": {
      "type": "object",
      "description": "Metadata contains additional information associated with the component.",
      "required": [
        "shape",
        "primaryColor",
        "svgColor",
        "svgWhite"
      ],
      "properties": {
        "capabilities": {
          "type": "object",
          "description": "Meshery manages components in accordance with their specific capabilities. This field explicitly identifies those capabilities largely by what actions a given component supports; e.g. metric-scrape, sub-interface, and so on. This field is extensible. ComponentDefinitions may define a broad array of capabilities, which are in-turn dynamically interpretted by Meshery for full lifecycle management."
        },
        "genealogy": {
          "type": "string",
          "description": "Genealogy represents the various representational states of the component."
        },
        "isAnnotation": {
          "type": "boolean",
          "description": "Identifies whether the component is semantically meaningful or not; identifies whether the component should be treated as deployable entity or is for purposes of logical representation."
        },
        "shape": {
          "type": "string",
          "description": "Shape of the component used for UI representation.",
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
            "vee"
          ]
        },
        "primaryColor": {
          "type": "string",
          "description": "Primary color of the component used for UI representation."
        },
        "secondaryColor": {
          "type": "string",
          "description": "Secondary color of the component used for UI representation."
        },
        "svgWhite": {
          "type": "string",
          "description": "White SVG of the component used for UI representation on dark background."
        },
        "svgColor": {
          "type": "string",
          "description": "Colored SVG of the component used for UI representation on light background."
        },
        "svgComplete": {
          "type": "string",
          "description": "Complete SVG of the component used for UI representation, often inclusive of background."
        },
        "status": {
          "type": "string",
          "enum": [
            "ignore",
            "publish",
            "duplicate",
            "maintenance"
          ],
          "description": "Status of the component."
        },
        "published": {
          "type": "boolean",
          "description": "'published' controls whether the component should be registered in Meshery Registry. When the same 'published' property in Models, is set to 'false', the Model property takes precedence with all Entities in the Model not being registered."
        }
      },
      "additionalProperties": true
    },
    "component": {
      "type": "object",
      "description": "Component and it's properties.",
      "properties": {
        "version": {
          "type": "string",
          "description": "Version of the component produced by the registrant. Example: APIVersion of a Kubernetes Pod."
        },
        "kind": {
          "type": "string",
          "description": "The unique identifier (name) assigned by the registrant to this component. Example: A Kubernetes Pod is of kind 'Pod'."
        },
        "schema": {
          "type": "string",
          "description": "JSON schema of the object as defined by the registrant."
        }
      },
      "required": [
        "version",
        "kind",
        "schema"
      ]
    }
  },
  "required": [
    "schemaVersion",
    "version",
    "model",
    "component"
  ]
}

export default schema;
