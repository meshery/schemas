// Generated from constructs/v1beta2-draft/catalog_data.json
// This file exports the original JSON schema

const schema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "$comment": "Any given catalog content will expose a version. It is the version # of the content at time of publshing.",
    "properties": {
        "publishedVersion": {
            "description": "Tracks the specific content version that has been made available in the Catalog.",
            "$ref": "../core.json#/definitions/versionString"
        },
        "contentType": {
            "$comment": "Based on the entity appropriate schema is selected and used by the system. Examples of different catalog item are Designs, Models, relationships. For designs compatibility only requires model, for Model compatability requires Registrant, version and name",
            "oneOf": [
                {
                    "$comment": "Catalog cotent schema for Design",
                    "type": "object",
                    "properties": {
                        "model": {
                            "type": "array",
                            "items": {
                                "$ref": "../v1beta1/model.json"
                            },
                            "uniqueItems": true,
                            "$comment": "Content published into the catalog must reference at least one model, and by implication, contain at least one component.",
                            "minItems": 1,
                            "description": "One or more models associated with this catalog item. For designs, a list of one or more models implicated by components within the design. For models, this is self-referential."
                        }
                    }
                },
                {
                    "$comment": "Catalog cotent schema for Model",
                    "type": "object",
                    "$ref": "../v1beta1/model.json"
                }
            ]
        },
        "pattern_caveats": {
            "type": "string",
            "title": "Caveats and Considerations",
            "description": "Specific stipulations to consider and known behaviors to be aware of when using this design."
        },
        "pattern_info": {
            "type": "string",
            "title": "Description",
            "description": "Purpose of the design along with its intended and unintended uses."
        },
        "type": {
            "type": "string",
            "title": "Type",
            "enum": [
                "Deployment",
                "Observability",
                "Resiliency",
                "Scaling",
                "Security",
                "Traffic-management",
                "Troubleshooting",
                "Workloads"
            ],
            "default": "Deployment",
            "description": "Categorization of the type of design or operational flow depicted in this design."
        },
        "snapshotURL": {
            "type": "array",
            "items": {
                "type": "string",
                "format": "uri",
                "pattern": "^(https?|http?|oci)://"
            },
            "description": "Contains reference to the dark and light mode snapshots of the design."
        },
        "tags": {
            "type": "string",
            "description": "Custom tags to categorise catalog items"
        },
        "category": {
            "type": "string"
        },
        "subCategory": {
            "type": "string"
        }
    },
    "required": [
        "compatibility",
        "pattern_caveats",
        "pattern_info",
        "type"
    ]
}

export default schema;
