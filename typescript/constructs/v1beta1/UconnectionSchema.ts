// Generated from constructs/v1beta1/connection.json
// This file exports the original JSON schema

const schema = {
  "$id": "https://schemas.meshery.io/component.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections",
  "additionalProperties": false,
  "type": "object",
  "required": [
    "kind",
    "type",
    "status"
  ],
  "properties": {
    "id": {
      "x-order": 1,
      "description": "ID",
      "type": "string",
      "format": "uuid",
      "x-go-type": "uuid.UUID",
      "x-go-type-import": {
        "path": "github.com/gofrs/uuid"
      },
      "x-oapi-codegen-extra-tags": {
        "yaml": "id",
        "json": "id"
      }
    },
    "name": {
      "x-oapi-codegen-extra-tags": {
        "db": "name",
        "yaml": "name",
        "json": "name"
      },
      "x-order": 2,
      "type": "string",
      "description": "Connection Name"
    },
    "credential_id": {
      "x-go-name": "CredentialId",
      "x-oapi-codegen-extra-tags": {
        "db": "credential_id",
        "yaml": "credential_id",
        "json": "credential_id"
      },
      "x-order": 3,
      "description": "Credential ID",
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
        "yaml": "type",
        "json": "type"
      },
      "x-order": 4,
      "type": "string",
      "description": "Connection Type"
    },
    "sub_type": {
      "x-oapi-codegen-extra-tags": {
        "db": "sub_type",
        "yaml": "sub_type",
        "json": "sub_type"
      },
      "x-order": 5,
      "type": "string",
      "description": "Connection Subtype"
    },
    "kind": {
      "x-oapi-codegen-extra-tags": {
        "db": "kind",
        "yaml": "kind",
        "json": "kind"
      },
      "x-order": 6,
      "type": "string",
      "description": "Connection Kind"
    },
    "metadata": {
      "x-oapi-codegen-extra-tags": {
        "db": "metadata",
        "yaml": "metadata",
        "json": "metadata"
      },
      "x-order": 7,
      "type": "object"
    },
    "status": {
      "x-oapi-codegen-extra-tags": {
        "db": "status",
        "yaml": "status",
        "json": "status"
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
        "yaml": "user_id",
        "json": "user_id"
      },
      "x-order": 9,
      "type": "string",
      "format": "uuid",
      "description": "A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas.",
      "x-go-type": "uuid.UUID",
      "x-go-type-import": {
        "path": "github.com/gofrs/uuid"
      }
    },
    "created_at": {
      "x-oapi-codegen-extra-tags": {
        "yaml": "created_at",
        "json": "created_at"
      },
      "x-order": 10,
      "type": "string",
      "format": "date-time",
      "x-go-type-skip-optional-pointer": true
    },
    "updated_at": {
      "x-oapi-codegen-extra-tags": {
        "yaml": "updated_at",
        "json": "updated_at"
      },
      "x-order": 11,
      "type": "string",
      "format": "date-time",
      "x-go-type-skip-optional-pointer": true
    },
    "deleted_at": {
      "x-oapi-codegen-extra-tags": {
        "yaml": "deleted_at",
        "json": "deleted_at"
      },
      "x-order": 12,
      "type": "string",
      "format": "date-time",
      "x-go-type-skip-optional-pointer": true
    }
  }
}

export default schema;
