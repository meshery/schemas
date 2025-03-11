// Generated from constructs/v1alpha2/design.json
// This file exports the original JSON schema

const schema = {
    "title": "Design Schema",
    "description": "Schema for design  in v1Beta1",
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "description": "Name of the design"
        },
        "schemaVersion": {
            "type": "string",
            "description": "Specifies the version of the schema to which the design  conforms.",
            "x-oapi-codegen-extra-tags": 
                {
                    "yaml": "schemaVersion"
                }
            
        },
        "version": {
            "type": "string",
            "description": "Version of the design",
            "minLength": 1,
            "maxLength": 50
        },
        "services": {
            "description": "Map of component IDs/names to their corresponding component declarations",
            "type": "object",
            "additionalProperties": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string"
                    },
                    "name": {
                        "type": "string"
                    },
                    "type": {
                        "type": "string"
                    },
                    "apiVersion": {
                        "type": "string",
                        "x-oapi-codegen-extra-tags": 
                            {
                                "yaml": "apiVersion"
                            }
                        
                    },
                    "namespace": {
                        "type": "string"
                    },
                    "version": {
                        "type": "string"
                    },
                    "model": {
                        "type": "string"
                    },
                    "isAnnotation": {
                        "type": "boolean",
                        "x-oapi-codegen-extra-tags": 
                            {
                                "yaml": "isAnnotation"
                            }
                        
                    },
                    "labels": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "type": "object"
                    },
                    "annotations": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "type": "object"
                    },
                    "dependsOn": {
                        "items": {
                            "type": "string"
                        },
                        "type": "array",
                        "x-oapi-codegen-extra-tags": 
                            {
                                "yaml": "dependsOn"
                            }
                        
                    },
                    "settings": {
                        "type": "object"
                    },
                    "traits": {
                        "type": "object"
                    }
                }
            }
        }
    },
    "required": [
        "name",
        "services"
    ]
}

export default schema;
