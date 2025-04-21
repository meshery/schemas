/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const schema = {
  "openapi": "3.0.0",
  "info": {
    "title": "Category API",
    "version": "1.0.0"
  },
  "paths": {},
  "components": {
    "schemas": {
      "CategoryDefinition": {
        "$id": "https://schemas.meshery.io/category.json",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "type": "object",
        "description": "Category of the model.",
        "required": [
          "id",
          "name",
          "metadata"
        ],
        "properties": {
          "id": {
            "x-order": 1,
            "type": "string",
            "format": "uuid",
            "description": "A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "default": "00000000-00000000-00000000-00000000"
          },
          "name": {
            "type": "string",
            "minLength": 1,
            "maxLength": 100,
            "x-oapi-codegen-extra-tags": {
              "yaml": "name",
              "json": "name",
              "gorm": "name"
            },
            "default": "Uncategorized",
            "description": "The category of the model that determines the main grouping.",
            "enum": [
              "Analytics",
              "App Definition and Development",
              "Cloud Native Network",
              "Cloud Native Storage",
              "Database",
              "Machine Learning",
              "Observability and Analysis",
              "Orchestration & Management",
              "Platform",
              "Provisioning",
              "Runtime",
              "Security & Compliance",
              "Serverless",
              "Tools",
              "Uncategorized"
            ],
            "x-order": 2
          },
          "metadata": {
            "type": "object",
            "x-oapi-codegen-extra-tags": {
              "yaml": "metadata,omitempty",
              "json": "metadata,omitempty",
              "gorm": "type:bytes;serializer:json"
            },
            "x-order": 3
          }
        }
      }
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
};

export default schema;
