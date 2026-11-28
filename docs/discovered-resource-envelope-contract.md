# Discovered Resource Envelope Contract

The `discovered_resource` construct (`schemas/constructs/v1beta3/discovered_resource/`) is the
platform-agnostic envelope for one resource a discoverer observed on a
platform: a Kubernetes object, a Docker container, a cloud resource. MeshSync's
discoverers emit it (meshery/meshsync#582). This document states what the
envelope promises and how producers carry what it does not model.

## What the envelope is

- **No endpoints and no stored row.** `api.yml` has `paths: {}`. A discoverer
  builds the envelope in process and hands it to MeshSync's output writers.
  Nothing reads or writes it over HTTP, so it has no `*Payload` and declares no
  `createdAt`, `updatedAt` or `deletedAt`. It follows the
  [definition-construct](schema-authoring-reference.md#definition-constructs-have-neither-endpoints-nor-a-stored-row)
  rules.
- **One shape for every platform.** `platform` says where the resource was
  observed (`kubernetes`, `docker`, ...). `scopeId` says which instance of that
  platform. `kind` and `name` say what the resource is. `labels` holds flat
  string labels or tags. Everything else that is platform-specific goes in
  `metadata`. `platform` and `kind` are open sets: a new platform or kind needs
  no schema change.
- **Required:** `platform`, `kind` and `schemaVersion`. Every other field may be
  omitted. `schemaVersion` defaults to `discoveredresources.meshery.io/v1beta3`.

## Field notes

| Field | Notes |
|---|---|
| `id` | Assigned by the discoverer, not a Meshery UUID (`x-id-format: external`). MeshSync's Kubernetes discoverer derives it (base64 of cluster, kind, API version, namespace and name) only when it persists the resource, so an emitted envelope usually leaves it empty. |
| `scopeId` | The platform's own scope identity: a Kubernetes cluster ID, a Docker daemon ID, a cloud account and region. It generalizes MeshSync's Kubernetes-only `cluster_id`. For Kubernetes resources, MeshSync writes the same value to both during the migration window, so consumers can move from `cluster_id` to `scopeId` at their own pace. |
| `labels` | `map[string]string` in Go. Non-string values are rejected. |
| `metadata` | `core.Map` in Go (`map[string]any`). Any JSON object. |
| `connectionId` | The Meshery connection the resource belongs to, once one is registered. Often empty, because a resource can be discovered before its connection exists. |

## Platform payloads beside the envelope

A producer that needs a platform's full native payload carries it next to the
envelope in its own wrapper type. The payload is not an envelope field, and
`additionalProperties: false` rejects it in a document validated against this
schema. MeshSync keeps its legacy Kubernetes payload this way: its `DiscoveredResource`
type adds `Kubernetes *KubernetesResource` (`json:"kubernetes,omitempty"`)
beside the envelope fields.

## The MeshSync mirror

Until MeshSync imports the generated type, it keeps a hand-written mirror in
`pkg/model/discovered_resource.go`. The generated Go struct
(`models/v1beta3/discovered_resource.DiscoveredResource`) has the mirror's field names, Go types and
JSON tags. Two tests keep it that way:

- `models/v1beta3/discovered_resource/discovered_resource_test.go` pins the generated struct's field
  names, types, tags and wire form.
- `validation/discovered_resource_envelope_contract_test.go` pins the schema's property
  set, required list and `schemaVersion` default. It also checks that the
  templates validate, and that the schema accepts and rejects the expected
  envelopes.

Renaming, retyping, adding or removing a field breaks the mirror. Coordinate any
such change with MeshSync.
