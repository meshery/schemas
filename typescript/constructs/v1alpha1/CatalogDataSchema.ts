// Generated from constructs/v1alpha1/catalog_data.json
// This file exports the original JSON schema

const schema = {
  "type": "object",
  "properties": {
    "publishedVersion": {
      "description": "Tracks the specific content version that has been made available in the Catalog.",
      "type": "string"
    },
    "class": {
      "description": "Published content is classifed by its support level. Content classes help you understand the origin and expected support level for each piece of content. It is important to note that the level of support may vary within each class, and you should exercise discretion when using community-contributed content. Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable. Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility. Content produced and supported by the respective project or organization responsible for the specific technology. This class offers a level of support from the project maintainers themselves. Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Community content may have varying levels of support and reliability.",
      "type": "string",
      "oneOf": [
        {
          "const": "official",
          "description": "Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable."
        },
        {
          "const": "verified",
          "description": "Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility."
        },
        {
          "const": "reference architecture",
          "description": "Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Reference architecture content may have varying levels of support and reliability."
        }
      ]
    },
    "compatibility": {
      "type": "array",
      "title": "Model",
      "items": {
        "enum": [
          "kubernetes"
        ],
        "type": "string"
      },
      "uniqueItems": true,
      "minItems": 1,
      "description": "One or more models associated with this catalog item. For designs, a list of one or more models implicated by components within the design. For models, this is self-referential."
    },
    "pattern_caveats": {
      "type": "string",
      "title": "Caveats and Considerations",
      "description": "Specific stipulations to consider and known behaviors to be aware of when using this design."
    },
    "pattern_info": {
      "type": "string",
      "title": "Description",
      "minLength": 1,
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
