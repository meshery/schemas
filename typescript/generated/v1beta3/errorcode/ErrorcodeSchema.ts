/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const ErrorcodeSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Errors",
    "description": "OpenAPI schema for error code definitions: the registry entry behind a\ncode such as `meshery-server-1033`, with each probable cause and the\nremediations that answer it, and the index docs.meshery.io publishes of\nevery definition (ErrorReferenceIndex). The construct has no endpoints:\ndefinitions live in each component's source, MeshKit's `errorutil`\nexports each component's definitions to `*_errors_index.json` (an\nErrorReferenceIndex; the legacy flat `*_errors_export.json` keeps its\nsnake_case shape beside it), and the docs build publishes them. An event that reports an error carries an instance of one\ndefinition as `metadata.error` (EventError, in the event construct). See\ndocs/error-definition-contract.md.\n",
    "version": "v1beta3",
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
      "ErrorDefinition": {
        "type": "object",
        "additionalProperties": false,
        "description": "One error code's definition: the registry entry behind a code such as `meshery-server-1033`. It names the situation the code reports and, for each probable cause, the remediations that answer that cause. A definition is not stored by any server and has no endpoints: the component that owns the code declares it in source (MeshKit's `errors.NewV3`), MeshKit's `errorutil` exports it to the component's `*_errors_index.json`, and docs.meshery.io publishes every definition in an ErrorReferenceIndex. It therefore declares no `id`, `createdAt`, `updatedAt` or `deletedAt`; the code is its key. Causes and remediations are nested, never two parallel lists: each remediation sits under the cause it addresses, and one remediation that answers several causes is repeated under each with the same `id`, so the pairing is explicit and the text is defined once. The flat `probableCause` and `suggestedRemediation` lists earlier consumers read are derived from the nesting (see `probableCause`). The rules JSON Schema cannot state - ids unique, a repeated remediation identical, an `action` behind every `automatic` or `requiresApproval` policy, `code` ending in `-<numericCode>` and the flat lists equal to the derivation - are checked by `Validate` in the generated Go package's helper and by `validateErrorDefinition` in the TypeScript package (docs/error-definition-contract.md).\n",
        "required": [
          "code",
          "moniker",
          "component",
          "numericCode"
        ],
        "properties": {
          "code": {
            "type": "string",
            "description": "The full error code, `<component name>-<numericCode>`, for example `meshery-server-1033`. Codes are scoped to the component that owns them and carry no meaning of their own, so a code is unique only together with its component and nothing may be derived from the number alone.\n",
            "minLength": 3,
            "maxLength": 255,
            "pattern": "^[a-z][a-z0-9]*(-[a-z0-9]+)*-[0-9]+$",
            "x-go-name": "Code",
            "x-order": 1
          },
          "moniker": {
            "type": "string",
            "description": "The name the code has in source, for example `ErrCreatingUUIDInstanceCode` or `ErrApplyManifest`: what MeshKit's export calls `name`. It is not unique across components.\n",
            "minLength": 4,
            "maxLength": 255,
            "pattern": "^Err[A-Z][A-Za-z0-9]*$",
            "x-go-name": "Moniker",
            "x-order": 2
          },
          "component": {
            "description": "The component that owns the code.",
            "x-go-name": "Component",
            "x-order": 3,
            "type": "object",
            "additionalProperties": false,
            "required": [
              "type",
              "name"
            ],
            "properties": {
              "type": {
                "type": "string",
                "description": "The kind of component, for example `component` (Meshery Server), `adapter`, `library` (MeshKit) or `client` (mesheryctl). An open set: a new kind of component needs no schema change.\n",
                "minLength": 1,
                "maxLength": 100,
                "pattern": "^[a-z][a-z0-9-]*$",
                "x-go-name": "Type"
              },
              "name": {
                "type": "string",
                "description": "The component's name, for example `meshery-server`, `meshkit` or `mesheryctl`. It is the prefix of every code the component owns.\n",
                "minLength": 1,
                "maxLength": 200,
                "pattern": "^[a-z][a-z0-9]*(-[a-z0-9]+)*$",
                "x-go-name": "Name"
              }
            }
          },
          "numericCode": {
            "type": "string",
            "description": "The number at the end of `code`, as a string of digits so leading zeros survive, for example `1033`. MeshKit's `errorutil` allocates it from the component's `component_info.json` and never reuses it.\n",
            "minLength": 1,
            "maxLength": 20,
            "pattern": "^[0-9]+$",
            "x-go-name": "NumericCode",
            "x-order": 4
          },
          "severity": {
            "description": "How severe the error is when it occurs. Omitted when the component assigns none (MeshKit's `None`).\n",
            "x-go-name": "Severity",
            "x-order": 5,
            "type": "string",
            "enum": [
              "emergency",
              "alert",
              "critical",
              "fatal",
              "error",
              "warning",
              "informational",
              "debug"
            ],
            "x-enum-varnames": [
              "SeverityEmergency",
              "SeverityAlert",
              "SeverityCritical",
              "SeverityFatal",
              "SeverityError",
              "SeverityWarning",
              "SeverityInformational",
              "SeverityDebug"
            ]
          },
          "shortDescription": {
            "type": "string",
            "description": "One line saying what went wrong, for example `Unable to create UUID instance`. MeshKit's `ShortDescription` lines are joined with `. `. Omitted only for a code whose details the export could not read.\n",
            "minLength": 1,
            "maxLength": 1000,
            "x-go-name": "ShortDescription",
            "x-order": 6
          },
          "longDescription": {
            "type": "string",
            "description": "The full explanation of the error. Omitted when the definition has only text rendered at run time, which MeshKit's `errorutil` cannot export.\n",
            "minLength": 1,
            "maxLength": 10000,
            "x-go-name": "LongDescription",
            "x-order": 7
          },
          "probableCauses": {
            "type": "array",
            "description": "What may have caused the error, most likely first, each with the remediations that answer it. Cause ids are unique within the definition. Omitted for a definition that documents no causes, such as a code declared with MeshKit's flat `errors.New`, whose flat lists are then the only record (and are unpaired).\n",
            "minItems": 1,
            "items": {
              "type": "object",
              "additionalProperties": false,
              "description": "One probable cause of an error, with the remediations that answer it. Remediations are nested under the cause they address, never kept in a parallel list.\n",
              "required": [
                "id",
                "description",
                "remediations"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "description": "Stable id of the cause, unique within the error's definition, for example `service-not-running`. An event names the causes that apply to one occurrence by this id (`EventError.matchedCauses`), and the docs page links to it, so it never changes once published. Lowercase words joined by hyphens.\n",
                  "minLength": 1,
                  "maxLength": 100,
                  "pattern": "^[a-z][a-z0-9]*(-[a-z0-9]+)*$",
                  "x-id-format": "external",
                  "x-go-name": "ID"
                },
                "description": {
                  "type": "string",
                  "description": "What may have caused the error, for example `The service is not running.`",
                  "minLength": 1,
                  "maxLength": 2000,
                  "x-go-name": "Description"
                },
                "remediations": {
                  "type": "array",
                  "description": "What answers this cause, the most likely fix first. A remediation that also answers another cause is repeated under that cause with the same `id` and identical fields.\n",
                  "minItems": 1,
                  "items": {
                    "type": "object",
                    "additionalProperties": false,
                    "description": "One remediation for a probable cause: what to do, and optionally a machine-readable action a client may run and the policy that says whether it may run it without asking a person.\n",
                    "required": [
                      "id",
                      "description"
                    ],
                    "properties": {
                      "id": {
                        "type": "string",
                        "description": "Stable id of the remediation, unique within the error's definition, for example `start-service`. The same id under two causes is one remediation answering both, so its fields must be identical in each place, and the flattened `suggestedRemediation` list carries it once. Lowercase words joined by hyphens.\n",
                        "minLength": 1,
                        "maxLength": 100,
                        "pattern": "^[a-z][a-z0-9]*(-[a-z0-9]+)*$",
                        "x-id-format": "external",
                        "x-go-name": "ID"
                      },
                      "description": {
                        "type": "string",
                        "description": "What to do, written for a person, for example `Start the service.`",
                        "minLength": 1,
                        "maxLength": 2000,
                        "x-go-name": "Description"
                      },
                      "action": {
                        "type": "string",
                        "description": "Identifier of an action a client can run to apply this remediation, as dot-separated lowercase words, for example `service.start` or `connection.reconnect`. The client that runs it owns its meaning; the definition only names it. Omitted when only a person can apply the remediation.\n",
                        "minLength": 3,
                        "maxLength": 255,
                        "pattern": "^[a-z][a-z0-9-]*(\\.[a-z][a-z0-9-]*)+$",
                        "x-go-name": "Action"
                      },
                      "actionPolicy": {
                        "description": "Whether a client may run `action` on its own. `automatic` and `requiresApproval` need an `action`. Omitted means `manual`.\n",
                        "x-go-name": "ActionPolicy",
                        "type": "string",
                        "enum": [
                          "automatic",
                          "requiresApproval",
                          "manual"
                        ],
                        "x-enum-casing-exempt": true,
                        "x-enum-varnames": [
                          "ActionPolicyAutomatic",
                          "ActionPolicyRequiresApproval",
                          "ActionPolicyManual"
                        ]
                      }
                    }
                  },
                  "x-go-name": "Remediations"
                }
              }
            },
            "x-go-name": "ProbableCauses",
            "x-order": 8
          },
          "probableCause": {
            "type": "array",
            "description": "The flat list of cause descriptions earlier consumers read (MeshKit's `ProbableCause`). When `probableCauses` is present it equals each cause's `description`, in order. Without `probableCauses` it is the definition's only record of its causes, and nothing pairs an entry with an entry of `suggestedRemediation`.\n",
            "items": {
              "type": "string",
              "minLength": 1,
              "maxLength": 2000
            },
            "x-go-name": "ProbableCause",
            "x-order": 9
          },
          "suggestedRemediation": {
            "type": "array",
            "description": "The flat list of remediation descriptions earlier consumers read (MeshKit's `SuggestedRemediation`). When `probableCauses` is present it equals every remediation's `description` across the causes, in order, each remediation `id` once (the first time it appears).\n",
            "items": {
              "type": "string",
              "minLength": 1,
              "maxLength": 2000
            },
            "x-go-name": "SuggestedRemediation",
            "x-order": 10
          },
          "referenceUrl": {
            "type": "string",
            "format": "uri",
            "description": "The stable docs.meshery.io page for this code, for example `https://docs.meshery.io/reference/error-codes/component-meshery-server/errcreatinguuidinstancecode-1001/`. Always present in a published ErrorReferenceIndex; a component's export may omit it, because the docs build assigns it.\n",
            "maxLength": 2048,
            "pattern": "^https://",
            "x-go-name": "ReferenceURL",
            "x-order": 11
          }
        }
      },
      "ErrorComponent": {
        "type": "object",
        "additionalProperties": false,
        "description": "The component that owns an error code: the `type` and `name` of its MeshKit `component_info.json`. Codes are unique only within one component.\n",
        "required": [
          "type",
          "name"
        ],
        "properties": {
          "type": {
            "type": "string",
            "description": "The kind of component, for example `component` (Meshery Server), `adapter`, `library` (MeshKit) or `client` (mesheryctl). An open set: a new kind of component needs no schema change.\n",
            "minLength": 1,
            "maxLength": 100,
            "pattern": "^[a-z][a-z0-9-]*$",
            "x-go-name": "Type"
          },
          "name": {
            "type": "string",
            "description": "The component's name, for example `meshery-server`, `meshkit` or `mesheryctl`. It is the prefix of every code the component owns.\n",
            "minLength": 1,
            "maxLength": 200,
            "pattern": "^[a-z][a-z0-9]*(-[a-z0-9]+)*$",
            "x-go-name": "Name"
          }
        }
      },
      "ErrorSeverity": {
        "type": "string",
        "description": "How severe an error is, as its definition declares. MeshKit's severities map one to one: `Emergency` to `emergency`, `Alert` to `alert`, `Critical` to `critical` and `Fatal` to `fatal`; MeshKit's `None` is an omitted severity. `error`, `warning`, `informational` and `debug` name the less severe levels of the event severity ladder for components that define them. The event that reports an occurrence carries its own `severity`.\n",
        "enum": [
          "emergency",
          "alert",
          "critical",
          "fatal",
          "error",
          "warning",
          "informational",
          "debug"
        ],
        "x-enum-varnames": [
          "SeverityEmergency",
          "SeverityAlert",
          "SeverityCritical",
          "SeverityFatal",
          "SeverityError",
          "SeverityWarning",
          "SeverityInformational",
          "SeverityDebug"
        ]
      },
      "ProbableCause": {
        "type": "object",
        "additionalProperties": false,
        "description": "One probable cause of an error, with the remediations that answer it. Remediations are nested under the cause they address, never kept in a parallel list.\n",
        "required": [
          "id",
          "description",
          "remediations"
        ],
        "properties": {
          "id": {
            "type": "string",
            "description": "Stable id of the cause, unique within the error's definition, for example `service-not-running`. An event names the causes that apply to one occurrence by this id (`EventError.matchedCauses`), and the docs page links to it, so it never changes once published. Lowercase words joined by hyphens.\n",
            "minLength": 1,
            "maxLength": 100,
            "pattern": "^[a-z][a-z0-9]*(-[a-z0-9]+)*$",
            "x-id-format": "external",
            "x-go-name": "ID"
          },
          "description": {
            "type": "string",
            "description": "What may have caused the error, for example `The service is not running.`",
            "minLength": 1,
            "maxLength": 2000,
            "x-go-name": "Description"
          },
          "remediations": {
            "type": "array",
            "description": "What answers this cause, the most likely fix first. A remediation that also answers another cause is repeated under that cause with the same `id` and identical fields.\n",
            "minItems": 1,
            "items": {
              "type": "object",
              "additionalProperties": false,
              "description": "One remediation for a probable cause: what to do, and optionally a machine-readable action a client may run and the policy that says whether it may run it without asking a person.\n",
              "required": [
                "id",
                "description"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "description": "Stable id of the remediation, unique within the error's definition, for example `start-service`. The same id under two causes is one remediation answering both, so its fields must be identical in each place, and the flattened `suggestedRemediation` list carries it once. Lowercase words joined by hyphens.\n",
                  "minLength": 1,
                  "maxLength": 100,
                  "pattern": "^[a-z][a-z0-9]*(-[a-z0-9]+)*$",
                  "x-id-format": "external",
                  "x-go-name": "ID"
                },
                "description": {
                  "type": "string",
                  "description": "What to do, written for a person, for example `Start the service.`",
                  "minLength": 1,
                  "maxLength": 2000,
                  "x-go-name": "Description"
                },
                "action": {
                  "type": "string",
                  "description": "Identifier of an action a client can run to apply this remediation, as dot-separated lowercase words, for example `service.start` or `connection.reconnect`. The client that runs it owns its meaning; the definition only names it. Omitted when only a person can apply the remediation.\n",
                  "minLength": 3,
                  "maxLength": 255,
                  "pattern": "^[a-z][a-z0-9-]*(\\.[a-z][a-z0-9-]*)+$",
                  "x-go-name": "Action"
                },
                "actionPolicy": {
                  "description": "Whether a client may run `action` on its own. `automatic` and `requiresApproval` need an `action`. Omitted means `manual`.\n",
                  "x-go-name": "ActionPolicy",
                  "type": "string",
                  "enum": [
                    "automatic",
                    "requiresApproval",
                    "manual"
                  ],
                  "x-enum-casing-exempt": true,
                  "x-enum-varnames": [
                    "ActionPolicyAutomatic",
                    "ActionPolicyRequiresApproval",
                    "ActionPolicyManual"
                  ]
                }
              }
            },
            "x-go-name": "Remediations"
          }
        }
      },
      "Remediation": {
        "type": "object",
        "additionalProperties": false,
        "description": "One remediation for a probable cause: what to do, and optionally a machine-readable action a client may run and the policy that says whether it may run it without asking a person.\n",
        "required": [
          "id",
          "description"
        ],
        "properties": {
          "id": {
            "type": "string",
            "description": "Stable id of the remediation, unique within the error's definition, for example `start-service`. The same id under two causes is one remediation answering both, so its fields must be identical in each place, and the flattened `suggestedRemediation` list carries it once. Lowercase words joined by hyphens.\n",
            "minLength": 1,
            "maxLength": 100,
            "pattern": "^[a-z][a-z0-9]*(-[a-z0-9]+)*$",
            "x-id-format": "external",
            "x-go-name": "ID"
          },
          "description": {
            "type": "string",
            "description": "What to do, written for a person, for example `Start the service.`",
            "minLength": 1,
            "maxLength": 2000,
            "x-go-name": "Description"
          },
          "action": {
            "type": "string",
            "description": "Identifier of an action a client can run to apply this remediation, as dot-separated lowercase words, for example `service.start` or `connection.reconnect`. The client that runs it owns its meaning; the definition only names it. Omitted when only a person can apply the remediation.\n",
            "minLength": 3,
            "maxLength": 255,
            "pattern": "^[a-z][a-z0-9-]*(\\.[a-z][a-z0-9-]*)+$",
            "x-go-name": "Action"
          },
          "actionPolicy": {
            "description": "Whether a client may run `action` on its own. `automatic` and `requiresApproval` need an `action`. Omitted means `manual`.\n",
            "x-go-name": "ActionPolicy",
            "type": "string",
            "enum": [
              "automatic",
              "requiresApproval",
              "manual"
            ],
            "x-enum-casing-exempt": true,
            "x-enum-varnames": [
              "ActionPolicyAutomatic",
              "ActionPolicyRequiresApproval",
              "ActionPolicyManual"
            ]
          }
        }
      },
      "ActionPolicy": {
        "type": "string",
        "description": "Whether a client may apply a remediation on its own. `automatic`: the client may run the remediation's `action` without asking and then tells the person it did. `requiresApproval`: the client runs the `action` only after a person approves it. `manual`: a person applies the remediation; a client shows it and never runs anything. An omitted policy is `manual`, and a reader treats a policy it does not know as `manual`, so a remediation is never run by mistake.\n",
        "enum": [
          "automatic",
          "requiresApproval",
          "manual"
        ],
        "x-enum-casing-exempt": true,
        "x-enum-varnames": [
          "ActionPolicyAutomatic",
          "ActionPolicyRequiresApproval",
          "ActionPolicyManual"
        ]
      },
      "ErrorReferenceIndex": {
        "type": "object",
        "additionalProperties": false,
        "description": "A list of error definitions, each code once. Published by docs.meshery.io at `https://docs.meshery.io/reference/error-codes/index.json`, it lists every component's codes, and every entry carries its `referenceUrl`; tools and bots validate codes and link to their pages from it. The same format is a component's export in the nested form (MeshKit's `errorutil`, `*_errors_index.json`): that component's definitions, where `referenceUrl` may be absent because the docs build assigns it when it merges the exports. A code is identified by its component and code.\n",
        "required": [
          "schemaVersion",
          "errors"
        ],
        "properties": {
          "schemaVersion": {
            "type": "integer",
            "description": "Version of the index format. `2` is this schema, whose entries are ErrorDefinitions. Version `1` was the flat format the docs build first published, whose entries carry `componentType`, `componentName`, `name`, the numeric `code` and the joined `probableCause` and `suggestedRemediation` strings; a reader that meets it reads it as unpaired definitions.\n",
            "enum": [
              2
            ],
            "x-enum-varnames": [
              "SchemaVersion2"
            ],
            "x-go-name": "SchemaVersion"
          },
          "generatedAt": {
            "type": "string",
            "format": "date-time",
            "description": "When the docs build generated the index.",
            "x-go-name": "GeneratedAt"
          },
          "errors": {
            "type": "array",
            "description": "The definitions, each code once; the published index orders them by `referenceUrl`.\n",
            "items": {
              "type": "object",
              "additionalProperties": false,
              "description": "One error code's definition: the registry entry behind a code such as `meshery-server-1033`. It names the situation the code reports and, for each probable cause, the remediations that answer that cause. A definition is not stored by any server and has no endpoints: the component that owns the code declares it in source (MeshKit's `errors.NewV3`), MeshKit's `errorutil` exports it to the component's `*_errors_index.json`, and docs.meshery.io publishes every definition in an ErrorReferenceIndex. It therefore declares no `id`, `createdAt`, `updatedAt` or `deletedAt`; the code is its key. Causes and remediations are nested, never two parallel lists: each remediation sits under the cause it addresses, and one remediation that answers several causes is repeated under each with the same `id`, so the pairing is explicit and the text is defined once. The flat `probableCause` and `suggestedRemediation` lists earlier consumers read are derived from the nesting (see `probableCause`). The rules JSON Schema cannot state - ids unique, a repeated remediation identical, an `action` behind every `automatic` or `requiresApproval` policy, `code` ending in `-<numericCode>` and the flat lists equal to the derivation - are checked by `Validate` in the generated Go package's helper and by `validateErrorDefinition` in the TypeScript package (docs/error-definition-contract.md).\n",
              "required": [
                "code",
                "moniker",
                "component",
                "numericCode"
              ],
              "properties": {
                "code": {
                  "type": "string",
                  "description": "The full error code, `<component name>-<numericCode>`, for example `meshery-server-1033`. Codes are scoped to the component that owns them and carry no meaning of their own, so a code is unique only together with its component and nothing may be derived from the number alone.\n",
                  "minLength": 3,
                  "maxLength": 255,
                  "pattern": "^[a-z][a-z0-9]*(-[a-z0-9]+)*-[0-9]+$",
                  "x-go-name": "Code",
                  "x-order": 1
                },
                "moniker": {
                  "type": "string",
                  "description": "The name the code has in source, for example `ErrCreatingUUIDInstanceCode` or `ErrApplyManifest`: what MeshKit's export calls `name`. It is not unique across components.\n",
                  "minLength": 4,
                  "maxLength": 255,
                  "pattern": "^Err[A-Z][A-Za-z0-9]*$",
                  "x-go-name": "Moniker",
                  "x-order": 2
                },
                "component": {
                  "description": "The component that owns the code.",
                  "x-go-name": "Component",
                  "x-order": 3,
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "type",
                    "name"
                  ],
                  "properties": {
                    "type": {
                      "type": "string",
                      "description": "The kind of component, for example `component` (Meshery Server), `adapter`, `library` (MeshKit) or `client` (mesheryctl). An open set: a new kind of component needs no schema change.\n",
                      "minLength": 1,
                      "maxLength": 100,
                      "pattern": "^[a-z][a-z0-9-]*$",
                      "x-go-name": "Type"
                    },
                    "name": {
                      "type": "string",
                      "description": "The component's name, for example `meshery-server`, `meshkit` or `mesheryctl`. It is the prefix of every code the component owns.\n",
                      "minLength": 1,
                      "maxLength": 200,
                      "pattern": "^[a-z][a-z0-9]*(-[a-z0-9]+)*$",
                      "x-go-name": "Name"
                    }
                  }
                },
                "numericCode": {
                  "type": "string",
                  "description": "The number at the end of `code`, as a string of digits so leading zeros survive, for example `1033`. MeshKit's `errorutil` allocates it from the component's `component_info.json` and never reuses it.\n",
                  "minLength": 1,
                  "maxLength": 20,
                  "pattern": "^[0-9]+$",
                  "x-go-name": "NumericCode",
                  "x-order": 4
                },
                "severity": {
                  "description": "How severe the error is when it occurs. Omitted when the component assigns none (MeshKit's `None`).\n",
                  "x-go-name": "Severity",
                  "x-order": 5,
                  "type": "string",
                  "enum": [
                    "emergency",
                    "alert",
                    "critical",
                    "fatal",
                    "error",
                    "warning",
                    "informational",
                    "debug"
                  ],
                  "x-enum-varnames": [
                    "SeverityEmergency",
                    "SeverityAlert",
                    "SeverityCritical",
                    "SeverityFatal",
                    "SeverityError",
                    "SeverityWarning",
                    "SeverityInformational",
                    "SeverityDebug"
                  ]
                },
                "shortDescription": {
                  "type": "string",
                  "description": "One line saying what went wrong, for example `Unable to create UUID instance`. MeshKit's `ShortDescription` lines are joined with `. `. Omitted only for a code whose details the export could not read.\n",
                  "minLength": 1,
                  "maxLength": 1000,
                  "x-go-name": "ShortDescription",
                  "x-order": 6
                },
                "longDescription": {
                  "type": "string",
                  "description": "The full explanation of the error. Omitted when the definition has only text rendered at run time, which MeshKit's `errorutil` cannot export.\n",
                  "minLength": 1,
                  "maxLength": 10000,
                  "x-go-name": "LongDescription",
                  "x-order": 7
                },
                "probableCauses": {
                  "type": "array",
                  "description": "What may have caused the error, most likely first, each with the remediations that answer it. Cause ids are unique within the definition. Omitted for a definition that documents no causes, such as a code declared with MeshKit's flat `errors.New`, whose flat lists are then the only record (and are unpaired).\n",
                  "minItems": 1,
                  "items": {
                    "type": "object",
                    "additionalProperties": false,
                    "description": "One probable cause of an error, with the remediations that answer it. Remediations are nested under the cause they address, never kept in a parallel list.\n",
                    "required": [
                      "id",
                      "description",
                      "remediations"
                    ],
                    "properties": {
                      "id": {
                        "type": "string",
                        "description": "Stable id of the cause, unique within the error's definition, for example `service-not-running`. An event names the causes that apply to one occurrence by this id (`EventError.matchedCauses`), and the docs page links to it, so it never changes once published. Lowercase words joined by hyphens.\n",
                        "minLength": 1,
                        "maxLength": 100,
                        "pattern": "^[a-z][a-z0-9]*(-[a-z0-9]+)*$",
                        "x-id-format": "external",
                        "x-go-name": "ID"
                      },
                      "description": {
                        "type": "string",
                        "description": "What may have caused the error, for example `The service is not running.`",
                        "minLength": 1,
                        "maxLength": 2000,
                        "x-go-name": "Description"
                      },
                      "remediations": {
                        "type": "array",
                        "description": "What answers this cause, the most likely fix first. A remediation that also answers another cause is repeated under that cause with the same `id` and identical fields.\n",
                        "minItems": 1,
                        "items": {
                          "type": "object",
                          "additionalProperties": false,
                          "description": "One remediation for a probable cause: what to do, and optionally a machine-readable action a client may run and the policy that says whether it may run it without asking a person.\n",
                          "required": [
                            "id",
                            "description"
                          ],
                          "properties": {
                            "id": {
                              "type": "string",
                              "description": "Stable id of the remediation, unique within the error's definition, for example `start-service`. The same id under two causes is one remediation answering both, so its fields must be identical in each place, and the flattened `suggestedRemediation` list carries it once. Lowercase words joined by hyphens.\n",
                              "minLength": 1,
                              "maxLength": 100,
                              "pattern": "^[a-z][a-z0-9]*(-[a-z0-9]+)*$",
                              "x-id-format": "external",
                              "x-go-name": "ID"
                            },
                            "description": {
                              "type": "string",
                              "description": "What to do, written for a person, for example `Start the service.`",
                              "minLength": 1,
                              "maxLength": 2000,
                              "x-go-name": "Description"
                            },
                            "action": {
                              "type": "string",
                              "description": "Identifier of an action a client can run to apply this remediation, as dot-separated lowercase words, for example `service.start` or `connection.reconnect`. The client that runs it owns its meaning; the definition only names it. Omitted when only a person can apply the remediation.\n",
                              "minLength": 3,
                              "maxLength": 255,
                              "pattern": "^[a-z][a-z0-9-]*(\\.[a-z][a-z0-9-]*)+$",
                              "x-go-name": "Action"
                            },
                            "actionPolicy": {
                              "description": "Whether a client may run `action` on its own. `automatic` and `requiresApproval` need an `action`. Omitted means `manual`.\n",
                              "x-go-name": "ActionPolicy",
                              "type": "string",
                              "enum": [
                                "automatic",
                                "requiresApproval",
                                "manual"
                              ],
                              "x-enum-casing-exempt": true,
                              "x-enum-varnames": [
                                "ActionPolicyAutomatic",
                                "ActionPolicyRequiresApproval",
                                "ActionPolicyManual"
                              ]
                            }
                          }
                        },
                        "x-go-name": "Remediations"
                      }
                    }
                  },
                  "x-go-name": "ProbableCauses",
                  "x-order": 8
                },
                "probableCause": {
                  "type": "array",
                  "description": "The flat list of cause descriptions earlier consumers read (MeshKit's `ProbableCause`). When `probableCauses` is present it equals each cause's `description`, in order. Without `probableCauses` it is the definition's only record of its causes, and nothing pairs an entry with an entry of `suggestedRemediation`.\n",
                  "items": {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 2000
                  },
                  "x-go-name": "ProbableCause",
                  "x-order": 9
                },
                "suggestedRemediation": {
                  "type": "array",
                  "description": "The flat list of remediation descriptions earlier consumers read (MeshKit's `SuggestedRemediation`). When `probableCauses` is present it equals every remediation's `description` across the causes, in order, each remediation `id` once (the first time it appears).\n",
                  "items": {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 2000
                  },
                  "x-go-name": "SuggestedRemediation",
                  "x-order": 10
                },
                "referenceUrl": {
                  "type": "string",
                  "format": "uri",
                  "description": "The stable docs.meshery.io page for this code, for example `https://docs.meshery.io/reference/error-codes/component-meshery-server/errcreatinguuidinstancecode-1001/`. Always present in a published ErrorReferenceIndex; a component's export may omit it, because the docs build assigns it.\n",
                  "maxLength": 2048,
                  "pattern": "^https://",
                  "x-go-name": "ReferenceURL",
                  "x-order": 11
                }
              }
            },
            "x-go-name": "Errors"
          }
        }
      }
    }
  }
};

export default ErrorcodeSchema;
