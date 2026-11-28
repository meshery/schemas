/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const DiscoveredResourceSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "DiscoveredResource",
    "description": "OpenAPI schema for the platform-agnostic discovered resource envelope: one resource\nthat a discoverer observed on a platform (a Kubernetes cluster, a Docker\ndaemon, a cloud account), carried in the same shape whatever the\nplatform. MeshSync's discoverers emit it (meshery/meshsync#582). The\nconstruct has no endpoints and no stored row: the envelope is produced\nin process by a discoverer and handed to MeshSync's output writers, and\nno server reads or writes it over HTTP. See docs/discovered-resource-envelope-contract.md.\n",
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
      "DiscoveredResource": {
        "$id": "https://schemas.meshery.io/discovered_resource.yaml",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "description": "A resource a discoverer observed on a platform, in a shape that is the same for every platform: a Kubernetes object, a Docker container, a cloud resource. `platform` says where it was observed, `scopeId` which instance of that platform (cluster, daemon, account and region), and `kind` and `name` what it is. Anything platform-specific that the envelope does not model travels in `metadata`. The envelope is produced in process by a discoverer (MeshSync, meshery/meshsync#582) and has no endpoints and no stored row, so it declares no `createdAt`, `updatedAt` or `deletedAt`. A producer may carry a platform's full native payload beside the envelope in its own wrapper type; that payload is not part of this schema. See docs/discovered-resource-envelope-contract.md.\n",
        "additionalProperties": false,
        "type": "object",
        "required": [
          "platform",
          "kind",
          "schemaVersion"
        ],
        "properties": {
          "id": {
            "type": "string",
            "description": "Identifier of the resource as its discoverer assigns it, when it has one. It is not a Meshery UUID and its format depends on the platform. MeshSync's Kubernetes discoverer derives it from the cluster, kind, API version, namespace and name, and assigns it only when the resource is persisted, so the envelope a discoverer emits usually leaves it empty.\n",
            "x-id-format": "external",
            "maxLength": 2048,
            "x-order": 1,
            "x-go-type-skip-optional-pointer": true
          },
          "platform": {
            "type": "string",
            "description": "The platform the resource was observed on, for example `kubernetes`. An open set: a new platform needs no schema change.\n",
            "minLength": 1,
            "maxLength": 64,
            "x-order": 2
          },
          "scopeId": {
            "type": "string",
            "x-go-name": "ScopeID",
            "description": "Identity of the platform scope the resource belongs to: a Kubernetes cluster's ID, a Docker daemon's ID, a cloud account and region. It generalizes MeshSync's Kubernetes-only `cluster_id`; for Kubernetes resources MeshSync sets both to the same value during the migration window. Its format is the platform's own.\n",
            "x-id-format": "external",
            "maxLength": 255,
            "x-order": 3,
            "x-go-type-skip-optional-pointer": true
          },
          "kind": {
            "type": "string",
            "description": "The kind of the resource within its platform, for example `Pod` on Kubernetes. An open set whose values are the platform's own.\n",
            "minLength": 1,
            "maxLength": 255,
            "x-order": 4
          },
          "name": {
            "type": "string",
            "description": "The name of the resource within its scope, when it has one.",
            "maxLength": 1024,
            "x-order": 5,
            "x-go-type-skip-optional-pointer": true
          },
          "labels": {
            "type": "object",
            "description": "Platform-native labels or tags on the resource, as a flat map of string keys to string values.\n",
            "additionalProperties": {
              "type": "string"
            },
            "x-order": 6,
            "x-go-type-skip-optional-pointer": true
          },
          "metadata": {
            "type": "object",
            "description": "Platform-specific data about the resource that the envelope does not otherwise model. Its shape depends on the platform and kind.\n",
            "additionalProperties": true,
            "x-go-type": "core.Map",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core"
            },
            "x-order": 7,
            "x-go-type-skip-optional-pointer": true
          },
          "connectionId": {
            "type": "string",
            "x-go-name": "ConnectionID",
            "description": "The Meshery connection the resource belongs to, once one exists. A resource can be discovered before its connection is registered, so it is often empty.\n",
            "maxLength": 36,
            "x-order": 8,
            "x-go-type-skip-optional-pointer": true
          },
          "schemaVersion": {
            "description": "Specifies the version of the schema the envelope conforms to.",
            "x-order": 9,
            "default": "discoveredresources.meshery.io/v1beta3",
            "type": "string",
            "minLength": 2,
            "maxLength": 100,
            "pattern": "^([a-z][a-z0-9.-]*\\/)?v(alpha|beta|[0-9]+(alpha[0-9]*|beta[0-9]*|rc[0-9]*)?)([.-][a-z0-9]+)*$",
            "example": [
              "v1",
              "v1alpha1",
              "v2beta3",
              "v1.custom-suffix",
              "models.meshery.io/v1beta1",
              "capability.meshery.io/v1alpha1"
            ]
          }
        }
      }
    }
  }
};

export default DiscoveredResourceSchema;
