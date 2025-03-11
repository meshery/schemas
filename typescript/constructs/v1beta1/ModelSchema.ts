// Generated from constructs/v1beta1/model.json
// This file exports the original JSON schema

const schema = {
  "$id": "https://schemas.meshery.io/model.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "Meshery Models serve as a portable unit of packaging to define managed entities, their relationships, and capabilities.",
  "additionalProperties": false,
  "type": "object",
  "properties": {
    "id": {
      "description": "Uniquely identifies the entity (i.e. component) as defined in a declaration (i.e. design).",
      "$ref": "../core.json#/definitions/uuid",
      "x-order": 1
    },
    "schemaVersion": {
      "description": "Specifies the version of the schema used for the definition.",
      "$ref": "../core.json#/definitions/versionString",
      "x-order": 2,
      "x-oapi-codegen-extra-tags": {
        "yaml": "schemaVersion",
        "json": "schemaVersion"
      }
    },
    "version": {
      "description": "Version of the model definition.",
      "type": "string",
      "$ref": "../core.json#/definitions/semverString",
      "x-order": 3,
      "x-oapi-codegen-extra-tags": {
        "yaml": "version",
        "json": "version"
      }
    },
    "name": {
      "description": "The unique name for the model within the scope of a registrant.",
      "$ref": "../core.json#/definitions/inputString",
      "x-order": 4
    },
    "displayName": {
      "description": "Human-readable name for the model.",
      "minLength": 1,
      "maxLength": 100,
      "type": "string",
      "pattern": "^[a-zA-Z_][a-zA-Z0-9_]*$",
      "x-order": 5,
      "x-oapi-codegen-extra-tags": {
        "yaml": "displayName",
        "json": "displayName"
      }
    },
    "description": {
      "type": "string",
      "description": "Description of the model.",
      "minLength": 1,
      "maxLength": 1000,
      "x-order": 6,
      "x-oapi-codegen-extra-tags": {
        "yaml": "description",
        "json": "description"
      }
    },
    "status": {
      "type": "string",
      "description": "Status of model, including:\n- duplicate: this component is a duplicate of another. The component that is to be the canonical reference and that is duplicated by other components should not be assigned the 'duplicate' status.\n- maintenance: model is unavailable for a period of time.\n- enabled: model is available for use for all users of this Meshery Server.\n- ignored: model is unavailable for use for all users of this Meshery Server.",
      "enum": ["ignored", "enabled", "duplicate"],
      "x-order": 7,
      "x-oapi-codegen-extra-tags": {
        "yaml": "status",
        "json": "status"
      }
    },
    "registrant": {
      "x-oapi-codegen-extra-tags": {
        "yaml": "registrant",
        "json": "registrant",
        "gorm": "foreignKey:RegistrantId;references:Id"
      },
      "x-order": 8,
      "$ref": "./connection.json"
    },
    "category": {
      "type": "object",
      "description": "Category of the model.",
      "properties": {
        "id": {
          "$ref": "../core.json#/definitions/uuid",
          "x-order": 1
        },
        "name": {
          "type": "string",
          "minLength": 1,
          "maxLength": 100,
          "x-oapi-codegen-extra-tags": {
            "yaml": "name",
            "json": "name"
          },
          "x-order": 2
        },
        "metadata": {
          "type": "object",
          "x-oapi-codegen-extra-tags": {
            "yaml": "metadata",
            "json": "metadata"
          },
          "x-order": 3
        }
      },
      "x-order": 9,
      "x-oapi-codegen-extra-tags": {
        "yaml": "category",
        "json": "category",
        "gorm": "foreignKey:CategoryId;references:Id"
      }
    },
    "subCategory": {
      "type": "string",
      "description": "Sub-category of the model.",
      "minLength": 1,
      "maxLength": 100,
      "x-oapi-codegen-extra-tags": {
        "yaml": "subCategory",
        "json": "subCategory"
      },
      "x-order": 10
    },
    "metadata": {
      "type": "object",
      "description": "Metadata containing additional information associated with the model.",
      "properties": {
        "capabilities": {
          "type": "array",
          "description": "Capabilities associated with the model",
          "items": {
            "$ref": "../v1alpha1/capability.json"
          },
          "x-order": 1
        },
        "isAnnotation": {
          "type": "boolean",
          "description": "Indicates whether the model and its entities should be treated as deployable entities or as logical representations.",
          "x-oapi-codegen-extra-tags": {
            "yaml": "isAnnotation",
            "json": "isAnnotation"
          },
          "x-order": 2
        },
        "primaryColor": {
          "type": "string",
          "description": "Primary color associated with the model.",
          "minLength": 1,
          "maxLength": 50,
          "x-oapi-codegen-extra-tags": {
            "yaml": "primaryColor",
            "json": "primaryColor"
          },
          "x-order": 3
        },
        "secondaryColor": {
          "type": "string",
          "description": "Secondary color associated with the model.",
          "minLength": 1,
          "maxLength": 50,
          "x-oapi-codegen-extra-tags": {
            "yaml": "secondaryColor",
            "json": "secondaryColor"
          },
          "x-order": 4
        },
        "svgWhite": {
          "type": "string",
          "description": "SVG representation of the model in white color.",
          "minLength": 1,
          "x-oapi-codegen-extra-tags": {
            "yaml": "svgWhite",
            "json": "svgWhite"
          },
          "x-order": 5
        },
        "svgColor": {
          "type": "string",
          "description": "SVG representation of the model in colored format.",
          "minLength": 1,
          "x-oapi-codegen-extra-tags": {
            "yaml": "svgColor",
            "json": "svgColor"
          },
          "x-order": 6
        },
        "svgComplete": {
          "type": "string",
          "description": "SVG representation of the complete model.",
          "minLength": 1,
          "x-oapi-codegen-extra-tags": {
            "yaml": "svgComplete",
            "json": "svgComplete"
          },
          "x-order": 7
        }
      },
      "x-oapi-codegen-extra-tags": {
        "gorm": "type:bytes;serializer:json"
      },
      "x-order": 11,
      "additionalProperties": true
    },
    "model": {
      "type": "object",
      "description": "Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31)",
      "required": ["version"],
      "properties": {
        "version": {
          "description": "Version of the model as defined by the registrant.",
          "$ref": "../core.json#/definitions/semverString",
          "x-oapi-codegen-extra-tags": {
            "yaml": "version",
            "json": "version"
          },
          "x-order": 1
        }
      },
      "x-oapi-codegen-extra-tags": {
        "gorm": "type:bytes;serializer:json"
      },
      "x-order": 12
    }
  },
  "required": ["name", "version", "registrant", "category"]
}

export default schema;
