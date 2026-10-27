/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const ModelSourceSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Model Source",
    "description": "OpenAPI schema for Meshery Model Source manifests, component overrides, and registry taxonomy metadata.",
    "version": "v1alpha1",
    "contact": {
      "name": "Meshery Maintainers",
      "email": "maintainers@meshery.io",
      "url": "https://meshery.io"
    },
    "license": {
      "name": "Apache 2.0",
      "url": "https://www.apache.org/licenses/LICENSE-2.0.html"
    }
  },
  "paths": {},
  "components": {
    "securitySchemes": {
      "jwt": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    },
    "schemas": {
      "ModelSource": {
        "$id": "https://schemas.meshery.io/model_source.yaml",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "ModelSource",
        "description": "Canonical model generation inputs and website marketing metadata committed under models/<model>/model-source.yaml.",
        "additionalProperties": false,
        "type": "object",
        "required": [
          "schemaVersion",
          "name",
          "displayName",
          "registrant",
          "category",
          "subCategory",
          "description",
          "source"
        ],
        "properties": {
          "schemaVersion": {
            "type": "string",
            "description": "Specifies the version of the schema to which the model source definition conforms.",
            "default": "modelsources.meshery.io/v1alpha1",
            "minLength": 1,
            "maxLength": 100
          },
          "name": {
            "type": "string",
            "description": "The unique name for the model within the scope of a registrant.",
            "pattern": "^[a-z0-9-]+$",
            "minLength": 1,
            "maxLength": 100
          },
          "displayName": {
            "type": "string",
            "description": "Human-readable name for the model.",
            "minLength": 1,
            "maxLength": 100
          },
          "registrant": {
            "type": "string",
            "description": "Identifier of the registrant (e.g., artifacthub, github, meshery).",
            "minLength": 1,
            "maxLength": 100
          },
          "version": {
            "type": "string",
            "description": "Semantic version of the model definition or optional pinned upstream version.",
            "minLength": 1,
            "maxLength": 50
          },
          "category": {
            "type": "string",
            "description": "Canonical category of the model that determines the main grouping.",
            "minLength": 1,
            "maxLength": 100
          },
          "subCategory": {
            "type": "string",
            "description": "Canonical subcategory of the model that determines the secondary grouping.",
            "minLength": 1,
            "maxLength": 100
          },
          "description": {
            "type": "string",
            "description": "Summary description of the model.",
            "minLength": 1,
            "maxLength": 2000
          },
          "source": {
            "description": "Source location and upstream details for model generation.",
            "type": "object",
            "additionalProperties": false,
            "required": [
              "url",
              "kind"
            ],
            "properties": {
              "url": {
                "type": "string",
                "description": "URL to git repo, Artifact Hub package, or HTTP manifest/chart.",
                "minLength": 1,
                "maxLength": 2048
              },
              "kind": {
                "type": "string",
                "description": "Kind of source repository or upstream package.",
                "enum": [
                  "github",
                  "artifacthub",
                  "http"
                ]
              },
              "version": {
                "type": "string",
                "description": "Optional pinned upstream package or release version.",
                "minLength": 1,
                "maxLength": 100
              },
              "group": {
                "type": "string",
                "description": "Optional group filter for CRD generation.",
                "minLength": 1,
                "maxLength": 253
              }
            }
          },
          "metadata": {
            "description": "Model visual styling, capabilities, and UI representation metadata.",
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "shape": {
                "type": "string",
                "description": "UI shape token for model components (e.g., circle, round-rectangle).",
                "minLength": 1,
                "maxLength": 100
              },
              "primaryColor": {
                "type": "string",
                "description": "Primary hex color code for UI representation (e.g., #00B39F).",
                "minLength": 1,
                "maxLength": 30
              },
              "secondaryColor": {
                "type": "string",
                "description": "Secondary hex color code for UI representation (e.g., #00D3A9).",
                "minLength": 1,
                "maxLength": 30
              },
              "svgColor": {
                "type": "string",
                "description": "Relative path to colored SVG file (e.g., ./svg/color.svg or color.svg).",
                "minLength": 1,
                "maxLength": 500
              },
              "svgWhite": {
                "type": "string",
                "description": "Relative path to white SVG file.",
                "minLength": 1,
                "maxLength": 500
              },
              "svgComplete": {
                "type": "string",
                "description": "Relative path to complete SVG file.",
                "minLength": 1,
                "maxLength": 500
              },
              "isAnnotation": {
                "type": "boolean",
                "description": "Whether components of this model are annotations by default.",
                "default": false
              },
              "capabilities": {
                "type": "array",
                "description": "Array of capability names or capability references supported by the model.",
                "items": {
                  "type": "string",
                  "description": "A capability identifier or name.",
                  "minLength": 1,
                  "maxLength": 100
                },
                "x-go-type-skip-optional-pointer": true
              },
              "styleOverrides": {
                "description": "Style overrides as a JSON string or styling directive map.",
                "oneOf": [
                  {
                    "type": "string",
                    "description": "JSON string representation of style overrides.",
                    "minLength": 1,
                    "maxLength": 4096
                  },
                  {
                    "type": "object",
                    "description": "Key-value map of style overrides.",
                    "additionalProperties": true
                  }
                ]
              }
            }
          },
          "publish": {
            "description": "Publishing configuration specifying destination registries and websites.",
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "registry": {
                "type": "boolean",
                "description": "Whether to publish the model to the Meshery Model Registry.",
                "default": true
              },
              "sites": {
                "type": "boolean",
                "description": "Whether to publish the model to meshery.io and layer5.io docs/integrations sites.",
                "default": true
              }
            }
          },
          "website": {
            "description": "Website marketing content and documentation metadata.",
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "aboutProject": {
                "type": "string",
                "description": "Narrative description of the project for website display.",
                "minLength": 1,
                "maxLength": 5000
              },
              "pageSubtitle": {
                "type": "string",
                "description": "Subtitle for the model's website integration page.",
                "minLength": 1,
                "maxLength": 500
              },
              "docsURL": {
                "type": "string",
                "description": "Documentation URL for the upstream project.",
                "minLength": 1,
                "maxLength": 2048
              },
              "standardBlurb": {
                "type": "string",
                "description": "Standard blurb summarizing the integration.",
                "minLength": 1,
                "maxLength": 2000
              },
              "features": {
                "type": "array",
                "description": "Bullet-point features highlighting key capabilities (replaces flat feature1, feature2, feature3).",
                "items": {
                  "type": "string",
                  "description": "A single feature highlight.",
                  "minLength": 1,
                  "maxLength": 500
                },
                "x-go-type-skip-optional-pointer": true
              },
              "howItWorks": {
                "type": "string",
                "description": "High-level overview of how the integration functions with Meshery.",
                "minLength": 1,
                "maxLength": 2000
              },
              "howItWorksDetails": {
                "type": "string",
                "description": "Detailed explanation of how the integration functions with Meshery.",
                "minLength": 1,
                "maxLength": 5000
              },
              "screenshots": {
                "type": "array",
                "description": "Relative paths or URLs to screenshots for the integration page.",
                "items": {
                  "type": "string",
                  "description": "Relative path or URL to a screenshot image.",
                  "minLength": 1,
                  "maxLength": 2048
                },
                "x-go-type-skip-optional-pointer": true
              },
              "fullPage": {
                "type": "boolean",
                "description": "Whether the model has a full dedicated integration page."
              },
              "layer5Site": {
                "type": "boolean",
                "description": "Whether to publish to the layer5.io website collections."
              },
              "mesheryDocs": {
                "type": "boolean",
                "description": "Whether to publish documentation to docs.meshery.io."
              }
            }
          }
        }
      },
      "ModelSourceSource": {
        "type": "object",
        "additionalProperties": false,
        "description": "Source location and upstream details for model generation.",
        "required": [
          "url",
          "kind"
        ],
        "properties": {
          "url": {
            "type": "string",
            "description": "URL to git repo, Artifact Hub package, or HTTP manifest/chart.",
            "minLength": 1,
            "maxLength": 2048
          },
          "kind": {
            "type": "string",
            "description": "Kind of source repository or upstream package.",
            "enum": [
              "github",
              "artifacthub",
              "http"
            ]
          },
          "version": {
            "type": "string",
            "description": "Optional pinned upstream package or release version.",
            "minLength": 1,
            "maxLength": 100
          },
          "group": {
            "type": "string",
            "description": "Optional group filter for CRD generation.",
            "minLength": 1,
            "maxLength": 253
          }
        }
      },
      "ModelSourceMetadata": {
        "type": "object",
        "additionalProperties": false,
        "description": "Model visual styling, capabilities, and representation metadata.",
        "properties": {
          "shape": {
            "type": "string",
            "description": "UI shape token for model components (e.g., circle, round-rectangle).",
            "minLength": 1,
            "maxLength": 100
          },
          "primaryColor": {
            "type": "string",
            "description": "Primary hex color code for UI representation (e.g., #00B39F).",
            "minLength": 1,
            "maxLength": 30
          },
          "secondaryColor": {
            "type": "string",
            "description": "Secondary hex color code for UI representation (e.g., #00D3A9).",
            "minLength": 1,
            "maxLength": 30
          },
          "svgColor": {
            "type": "string",
            "description": "Relative path to colored SVG file (e.g., ./svg/color.svg or color.svg).",
            "minLength": 1,
            "maxLength": 500
          },
          "svgWhite": {
            "type": "string",
            "description": "Relative path to white SVG file.",
            "minLength": 1,
            "maxLength": 500
          },
          "svgComplete": {
            "type": "string",
            "description": "Relative path to complete SVG file.",
            "minLength": 1,
            "maxLength": 500
          },
          "isAnnotation": {
            "type": "boolean",
            "description": "Whether components of this model are annotations by default.",
            "default": false
          },
          "capabilities": {
            "type": "array",
            "description": "Array of capability names or capability references supported by the model.",
            "items": {
              "type": "string",
              "description": "A capability identifier or name.",
              "minLength": 1,
              "maxLength": 100
            },
            "x-go-type-skip-optional-pointer": true
          },
          "styleOverrides": {
            "description": "Style overrides as a JSON string or styling directive map.",
            "oneOf": [
              {
                "type": "string",
                "description": "JSON string representation of style overrides.",
                "minLength": 1,
                "maxLength": 4096
              },
              {
                "type": "object",
                "description": "Key-value map of style overrides.",
                "additionalProperties": true
              }
            ]
          }
        }
      },
      "ModelSourcePublish": {
        "type": "object",
        "additionalProperties": false,
        "description": "Publishing targets and visibility flags for the model.",
        "properties": {
          "registry": {
            "type": "boolean",
            "description": "Whether to publish the model to the Meshery Model Registry.",
            "default": true
          },
          "sites": {
            "type": "boolean",
            "description": "Whether to publish the model to meshery.io and layer5.io docs/integrations sites.",
            "default": true
          }
        }
      },
      "ModelSourceWebsite": {
        "type": "object",
        "additionalProperties": false,
        "description": "Website marketing and documentation metadata.",
        "properties": {
          "aboutProject": {
            "type": "string",
            "description": "Narrative description of the project for website display.",
            "minLength": 1,
            "maxLength": 5000
          },
          "pageSubtitle": {
            "type": "string",
            "description": "Subtitle for the model's website integration page.",
            "minLength": 1,
            "maxLength": 500
          },
          "docsURL": {
            "type": "string",
            "description": "Documentation URL for the upstream project.",
            "minLength": 1,
            "maxLength": 2048
          },
          "standardBlurb": {
            "type": "string",
            "description": "Standard blurb summarizing the integration.",
            "minLength": 1,
            "maxLength": 2000
          },
          "features": {
            "type": "array",
            "description": "Bullet-point features highlighting key capabilities (replaces flat feature1, feature2, feature3).",
            "items": {
              "type": "string",
              "description": "A single feature highlight.",
              "minLength": 1,
              "maxLength": 500
            },
            "x-go-type-skip-optional-pointer": true
          },
          "howItWorks": {
            "type": "string",
            "description": "High-level overview of how the integration functions with Meshery.",
            "minLength": 1,
            "maxLength": 2000
          },
          "howItWorksDetails": {
            "type": "string",
            "description": "Detailed explanation of how the integration functions with Meshery.",
            "minLength": 1,
            "maxLength": 5000
          },
          "screenshots": {
            "type": "array",
            "description": "Relative paths or URLs to screenshots for the integration page.",
            "items": {
              "type": "string",
              "description": "Relative path or URL to a screenshot image.",
              "minLength": 1,
              "maxLength": 2048
            },
            "x-go-type-skip-optional-pointer": true
          },
          "fullPage": {
            "type": "boolean",
            "description": "Whether the model has a full dedicated integration page."
          },
          "layer5Site": {
            "type": "boolean",
            "description": "Whether to publish to the layer5.io website collections."
          },
          "mesheryDocs": {
            "type": "boolean",
            "description": "Whether to publish documentation to docs.meshery.io."
          }
        }
      },
      "ComponentOverride": {
        "$id": "https://schemas.meshery.io/component_override.yaml",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "ComponentOverride",
        "description": "Curated overrides for auto-generated component fields committed under models/<model>/overrides/components/<Kind>.yaml.",
        "additionalProperties": false,
        "type": "object",
        "required": [
          "status"
        ],
        "properties": {
          "description": {
            "type": "string",
            "description": "Overridden description of the component.",
            "minLength": 1,
            "maxLength": 2000
          },
          "displayName": {
            "type": "string",
            "description": "Overridden human-readable display name for the component.",
            "minLength": 1,
            "maxLength": 100
          },
          "shape": {
            "type": "string",
            "description": "UI shape token for the component (e.g., circle, round-rectangle).",
            "minLength": 1,
            "maxLength": 100
          },
          "primaryColor": {
            "type": "string",
            "description": "Primary hex color code for UI representation (e.g., #00B39F).",
            "minLength": 1,
            "maxLength": 30
          },
          "secondaryColor": {
            "type": "string",
            "description": "Secondary hex color code for UI representation (e.g., #00D3A9).",
            "minLength": 1,
            "maxLength": 30
          },
          "svgColor": {
            "type": "string",
            "description": "Relative file path to colored SVG file.",
            "minLength": 1,
            "maxLength": 500
          },
          "svgWhite": {
            "type": "string",
            "description": "Relative file path to white SVG file.",
            "minLength": 1,
            "maxLength": 500
          },
          "svgComplete": {
            "type": "string",
            "description": "Relative file path to complete SVG file.",
            "minLength": 1,
            "maxLength": 500
          },
          "styleOverrides": {
            "description": "Style overrides as a JSON string or styling directive map.",
            "oneOf": [
              {
                "type": "string",
                "description": "JSON string representation of style overrides.",
                "minLength": 1,
                "maxLength": 4096
              },
              {
                "type": "object",
                "description": "Map of style overrides.",
                "additionalProperties": true
              }
            ]
          },
          "styles": {
            "type": "object",
            "description": "Visual styles object for the component.",
            "additionalProperties": true,
            "x-go-type-skip-optional-pointer": true
          },
          "capabilities": {
            "type": "array",
            "description": "Capabilities supported by the component.",
            "items": {
              "oneOf": [
                {
                  "type": "string",
                  "description": "Capability name or key identifier.",
                  "minLength": 1,
                  "maxLength": 100
                },
                {
                  "type": "object",
                  "description": "Inline capability specification or configuration object.",
                  "additionalProperties": true
                }
              ]
            },
            "x-go-type-skip-optional-pointer": true
          },
          "genealogy": {
            "type": "string",
            "description": "Component genealogy or parent component relationship.",
            "minLength": 1,
            "maxLength": 500
          },
          "isAnnotation": {
            "type": "boolean",
            "description": "Whether this component represents an annotation.",
            "default": false
          },
          "status": {
            "type": "string",
            "description": "Status of the component (e.g., enabled, ignored).",
            "default": "enabled",
            "enum": [
              "enabled",
              "ignored"
            ]
          }
        }
      },
      "Category": {
        "$id": "https://schemas.meshery.io/categories.yaml",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Category",
        "description": "Schema for models/_meta/categories.yaml category definitions.",
        "additionalProperties": false,
        "type": "object",
        "required": [
          "name",
          "type"
        ],
        "properties": {
          "name": {
            "type": "string",
            "description": "Name of the category that determines the main grouping.",
            "minLength": 1,
            "maxLength": 100
          },
          "type": {
            "type": "string",
            "description": "Classification type of the category.",
            "minLength": 1,
            "maxLength": 100
          },
          "subCategories": {
            "type": "array",
            "description": "List of subcategories belonging to this category.",
            "items": {
              "type": "object",
              "additionalProperties": false,
              "description": "Subcategory of the model category.",
              "required": [
                "name"
              ],
              "properties": {
                "name": {
                  "type": "string",
                  "description": "Name of the subcategory.",
                  "minLength": 1,
                  "maxLength": 100
                },
                "svgColor": {
                  "type": "string",
                  "description": "Relative path to colored SVG file or SVG content for the subcategory.",
                  "minLength": 1,
                  "maxLength": 500
                },
                "svgWhite": {
                  "type": "string",
                  "description": "Relative path to white SVG file or SVG content for the subcategory.",
                  "minLength": 1,
                  "maxLength": 500
                }
              }
            },
            "x-go-type-skip-optional-pointer": true
          },
          "metadata": {
            "type": "object",
            "description": "Additional metadata associated with the category.",
            "additionalProperties": true,
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "SubCategory": {
        "type": "object",
        "additionalProperties": false,
        "description": "Subcategory of the model category.",
        "required": [
          "name"
        ],
        "properties": {
          "name": {
            "type": "string",
            "description": "Name of the subcategory.",
            "minLength": 1,
            "maxLength": 100
          },
          "svgColor": {
            "type": "string",
            "description": "Relative path to colored SVG file or SVG content for the subcategory.",
            "minLength": 1,
            "maxLength": 500
          },
          "svgWhite": {
            "type": "string",
            "description": "Relative path to white SVG file or SVG content for the subcategory.",
            "minLength": 1,
            "maxLength": 500
          }
        }
      },
      "Categories": {
        "type": "array",
        "description": "List of category definitions in the registry taxonomy.",
        "items": {
          "$id": "https://schemas.meshery.io/categories.yaml",
          "$schema": "http://json-schema.org/draft-07/schema#",
          "title": "Category",
          "description": "Schema for models/_meta/categories.yaml category definitions.",
          "additionalProperties": false,
          "type": "object",
          "required": [
            "name",
            "type"
          ],
          "properties": {
            "name": {
              "type": "string",
              "description": "Name of the category that determines the main grouping.",
              "minLength": 1,
              "maxLength": 100
            },
            "type": {
              "type": "string",
              "description": "Classification type of the category.",
              "minLength": 1,
              "maxLength": 100
            },
            "subCategories": {
              "type": "array",
              "description": "List of subcategories belonging to this category.",
              "items": {
                "type": "object",
                "additionalProperties": false,
                "description": "Subcategory of the model category.",
                "required": [
                  "name"
                ],
                "properties": {
                  "name": {
                    "type": "string",
                    "description": "Name of the subcategory.",
                    "minLength": 1,
                    "maxLength": 100
                  },
                  "svgColor": {
                    "type": "string",
                    "description": "Relative path to colored SVG file or SVG content for the subcategory.",
                    "minLength": 1,
                    "maxLength": 500
                  },
                  "svgWhite": {
                    "type": "string",
                    "description": "Relative path to white SVG file or SVG content for the subcategory.",
                    "minLength": 1,
                    "maxLength": 500
                  }
                }
              },
              "x-go-type-skip-optional-pointer": true
            },
            "metadata": {
              "type": "object",
              "description": "Additional metadata associated with the category.",
              "additionalProperties": true,
              "x-go-type-skip-optional-pointer": true
            }
          }
        }
      },
      "Capability": {
        "$id": "https://schemas.meshery.io/capabilities.yaml",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Capability",
        "description": "Schema for models/_meta/capabilities.yaml capability definitions.",
        "additionalProperties": false,
        "type": "object",
        "required": [
          "key",
          "displayName",
          "description",
          "kind",
          "type",
          "subType",
          "entityState",
          "status"
        ],
        "properties": {
          "key": {
            "type": "string",
            "description": "Key that uniquely backs the capability.",
            "minLength": 1,
            "maxLength": 100
          },
          "displayName": {
            "type": "string",
            "description": "Human-readable name of the capability.",
            "minLength": 1,
            "maxLength": 100
          },
          "description": {
            "type": "string",
            "description": "A written representation of the purpose and characteristics of the capability.",
            "minLength": 1,
            "maxLength": 2000
          },
          "kind": {
            "type": "string",
            "description": "Top-level categorization of the capability.",
            "minLength": 1,
            "maxLength": 100,
            "enum": [
              "action",
              "mutate",
              "view",
              "interaction"
            ]
          },
          "type": {
            "type": "string",
            "description": "Classification of capabilities grouping similar behaviors.",
            "minLength": 1,
            "maxLength": 100
          },
          "subType": {
            "type": "string",
            "description": "Most granular unit of capability classification.",
            "minLength": 1,
            "maxLength": 100
          },
          "entityState": {
            "type": "array",
            "description": "State of the entity in which the capability is applicable.",
            "items": {
              "type": "string",
              "description": "Lifecycle state of the entity.",
              "enum": [
                "declaration",
                "instance"
              ]
            },
            "x-go-type-skip-optional-pointer": true
          },
          "status": {
            "type": "string",
            "description": "Status of the capability.",
            "default": "enabled",
            "enum": [
              "enabled",
              "disabled"
            ]
          },
          "metadata": {
            "type": "object",
            "description": "Additional metadata associated with the capability.",
            "additionalProperties": true,
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "Capabilities": {
        "type": "array",
        "description": "List of capability definitions in the registry taxonomy.",
        "items": {
          "$id": "https://schemas.meshery.io/capabilities.yaml",
          "$schema": "http://json-schema.org/draft-07/schema#",
          "title": "Capability",
          "description": "Schema for models/_meta/capabilities.yaml capability definitions.",
          "additionalProperties": false,
          "type": "object",
          "required": [
            "key",
            "displayName",
            "description",
            "kind",
            "type",
            "subType",
            "entityState",
            "status"
          ],
          "properties": {
            "key": {
              "type": "string",
              "description": "Key that uniquely backs the capability.",
              "minLength": 1,
              "maxLength": 100
            },
            "displayName": {
              "type": "string",
              "description": "Human-readable name of the capability.",
              "minLength": 1,
              "maxLength": 100
            },
            "description": {
              "type": "string",
              "description": "A written representation of the purpose and characteristics of the capability.",
              "minLength": 1,
              "maxLength": 2000
            },
            "kind": {
              "type": "string",
              "description": "Top-level categorization of the capability.",
              "minLength": 1,
              "maxLength": 100,
              "enum": [
                "action",
                "mutate",
                "view",
                "interaction"
              ]
            },
            "type": {
              "type": "string",
              "description": "Classification of capabilities grouping similar behaviors.",
              "minLength": 1,
              "maxLength": 100
            },
            "subType": {
              "type": "string",
              "description": "Most granular unit of capability classification.",
              "minLength": 1,
              "maxLength": 100
            },
            "entityState": {
              "type": "array",
              "description": "State of the entity in which the capability is applicable.",
              "items": {
                "type": "string",
                "description": "Lifecycle state of the entity.",
                "enum": [
                  "declaration",
                  "instance"
                ]
              },
              "x-go-type-skip-optional-pointer": true
            },
            "status": {
              "type": "string",
              "description": "Status of the capability.",
              "default": "enabled",
              "enum": [
                "enabled",
                "disabled"
              ]
            },
            "metadata": {
              "type": "object",
              "description": "Additional metadata associated with the capability.",
              "additionalProperties": true,
              "x-go-type-skip-optional-pointer": true
            }
          }
        }
      }
    }
  }
};

export default ModelSourceSchema;
