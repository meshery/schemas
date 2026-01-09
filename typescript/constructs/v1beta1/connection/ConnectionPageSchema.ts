// Generated from constructs/v1beta1/connection/connection_page.json
// This file exports the original JSON schema

const schema = {
    "$id": "https://schemas.meshery.io/component.json",
    "$schema": "http://json-schema.org/draft-07/schema#",
    "description": "Represents a page of connections with a meta information about connections number",
    "additionalProperties": false,
    "type": "object",
    "required": [
        "connections",
        "total_count",
        "page",
        "page_size"
    ],
    "properties": {
      "connections": {
        "type": "array",
        "items": {
            "$ref": "./connection.json",
            "description": "List of connections on this page",
            "x-go-type": "*Connection"
        },
        "x-order": 1
      },
      "total_count": {
        "type": "integer",
        "description": "Total number of connections on all pages",
        "x-order": 2
      },
      "page": {
        "type": "integer",
        "description": "Page number",
        "x-order": 3
      },
      "page_size": {
        "type": "integer",
        "description": "Number of elements per page",
        "x-order": 4
      }
    }
  }

export default schema;
