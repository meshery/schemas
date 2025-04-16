/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const schema = {
  "SubCategoryDefinition": {
    "$id": "https://schemas.meshery.io/category.json",
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "string",
    "title": "SubCategory",
    "description": "Sub category of the model determines the secondary grouping.",
    "default": "Uncategorized",
    "enum": [
      "API Gateway",
      "API Integration",
      "Application Definition & Image Build",
      "Automation & Configuration",
      "Certified Kubernetes - Distribution",
      "Chaos Engineering",
      "Cloud Native Storage",
      "Cloud Provider",
      "CNI",
      "Compute",
      "Container Registry",
      "Container Runtime",
      "Container Security",
      "Container",
      "Content Delivery Network",
      "Continuous Integration & Delivery",
      "Coordination & Service Discovery",
      "Database",
      "Flowchart",
      "Framework",
      "Installable Platform",
      "Key Management",
      "Key Management Service",
      "Kubernetes",
      "Logging",
      "Machine Learning",
      "Management Governance",
      "Metrics",
      "Monitoring",
      "Networking Content Delivery",
      "Operating System",
      "Query",
      "Remote Procedure Call",
      "Scheduling & Orchestration",
      "Secrets Management",
      "Security Identity & Compliance",
      "Service Mesh",
      "Service Proxy",
      "Source Version Control",
      "Storage",
      "Specifications",
      "Streaming & Messaging",
      "Tools",
      "Tracing",
      "Uncategorized",
      "Video Conferencing"
    ],
    "minLength": 1,
    "maxLength": 100,
    "x-oapi-codegen-extra-tags": {
      "yaml": "subCategory",
      "json": "subCategory"
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
};

export default schema;
