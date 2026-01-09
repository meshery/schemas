// Generated from constructs/v1beta1/connection/connection.json
// This file exports the original JSON schema

const schema = {
  "$id": "https://schemas.meshery.io/component.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections",
  "additionalProperties": false,
  "type": "object",
  "required": [
    "id",
    "schemaVersion",
    "name",
    "type",
    "sub_type",
    "kind",
    "status"
  ],
  "properties": {
    "id": {
      "$ref": "../../v1alpha1/core/openapi.yml#/components/schemas/uuid",
      "description": "ID",
      "x-order": 1,
      "x-go-name": "ID",
      "x-oapi-codegen-extra-tags": {
        "db": "id",
        "yaml": "id"
      }
    },
    "name": {
      "x-oapi-codegen-extra-tags": {
        "db": "name",
        "yaml": "name"
      },
      "x-order": 2,
      "type": "string",
      "description": "Connection Name"
    },
    "credential_id": {
      "x-go-name": "CredentialID",
      "x-oapi-codegen-extra-tags": {
        "db": "credential_id",
        "yaml": "credential_id"
      },
      "x-order": 3,
      "$ref": "../../v1alpha1/core/openapi.yml#/components/schemas/uuid",
      "description": "Credential ID"
    },
    "type": {
      "x-oapi-codegen-extra-tags": {
        "db": "type",
        "yaml": "type"
      },
      "x-order": 4,
      "type": "string",
      "description": "Connection Type"
    },
    "sub_type": {
      "x-oapi-codegen-extra-tags": {
        "db": "sub_type",
        "yaml": "sub_type"
      },
      "x-order": 5,
      "type": "string",
      "description": "Connection Subtype"
    },
    "kind": {
      "x-oapi-codegen-extra-tags": {
        "db": "kind",
        "yaml": "kind"
      },
      "x-order": 6,
      "type": "string",
      "description": "Connection Kind"
    },
    "metadata": {
      "x-oapi-codegen-extra-tags": {
        "db": "metadata",
        "yaml": "metadata"
      },
      "x-order": 7,
      "x-go-type": "core.Map",
      "x-go-type-skip-optional-pointer": true,
      "type": "object"
    },
    "status": {
      "x-oapi-codegen-extra-tags": {
        "db": "status",
        "yaml": "status"
      },
      "x-order": 8,
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
    "user_id": {
      "x-go-name": "UserID",
      "x-oapi-codegen-extra-tags": {
        "db": "user_id",
        "yaml": "user_id"
      },
      "x-order": 9,
      "$ref": "../../v1alpha1/core/openapi.yml#/components/schemas/uuid"
    },
    "created_at": {
      "$ref": "../../v1alpha1/core/openapi.yml#/components/schemas/Time",
      "x-oapi-codegen-extra-tags": {
        "db": "created_at",
        "yaml": "created_at"
      },
      "x-order": 10
    },
    "updated_at": {
      "$ref": "../../v1alpha1/core/openapi.yml#/components/schemas/Time",
      "x-oapi-codegen-extra-tags": {
        "db": "updated_at",
        "yaml": "updated_at"
      },
      "x-order": 11
    },
    "deleted_at": {
      "$ref": "../../v1alpha1/core/openapi.yml#/components/schemas/Time",
      "x-oapi-codegen-extra-tags": {
        "db": "deleted_at",
        "yaml": "deleted_at"
      },
      "x-go-type": "core.NullTime",
      "x-order": 12
    },
    "environments": {
      "type": "array",
      "items": {
        "x-go-type": "*environment.Environment",
        "$ref": "../environment/environment.json"
      },
      "x-oapi-codegen-extra-tags": {
        "db": "-",
        "yaml": "environments",
        "gorm": "-"
      },
      "x-go-type-skip-optional-pointer": true,
      "x-order": 13
    },
    "schemaVersion": {
      "description": "Specifies the version of the schema used for the definition.",
      "$ref": "../../v1alpha1/core/openapi.yml#/components/schemas/versionString",
      "x-order": 14,
      "x-oapi-codegen-extra-tags": {
        "yaml": "schemaVersion",
        "db": "-",
        "gorm": "-"
      },
      "default": "connections.meshery.io/v1beta1"
    }
  }
}


export default schema;
