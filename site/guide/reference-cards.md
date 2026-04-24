---
layout: guide
title: Canonical Reference Cards
description: Ready-to-copy schema patterns for the four canonical constructs — connection, key, team, and environment.
---

<nav aria-label="breadcrumb" class="breadcrumb">
  <a href="/">Home</a><span>/</span>
  <a href="/guide/">Guide</a><span>/</span>
  Reference Cards
</nav>

# Canonical Reference Cards

<p class="page-desc">
  Copy-paste starting points for the four constructs that define the dual-schema pattern in this repo.
</p>

<div class="callout tip">
  <div>Each card shows: the response entity schema (<code>&lt;construct&gt;.yaml</code>), the write payload schema (<code>{Construct}Payload</code> in <code>api.yml</code>), and the HTTP endpoints. See <a href="/guide/add-a-construct/">Add a Construct</a> for the full walkthrough.</div>
</div>

---

## Connection

Integration entity with a status enum and sub-type metadata.

**Files:** `schemas/constructs/v1beta1/connection/`

### Entity schema (`connection.yaml`)

```yaml
type: object
additionalProperties: false
required:
  - id
  - name
  - kind
  - type
  - status
  - created_at
  - updated_at
properties:
  id:
    $ref: ../../v1alpha1/core/api.yml#/components/schemas/uuid
  name:
    type: string
    description: Human-readable name for this connection.
  kind:
    type: string
    description: Technology kind (kubernetes, prometheus, …).
  type:
    type: string
    description: Connectivity type (In-Cluster, Out-of-Cluster, …).
  status:
    type: string
    enum: [connected, disconnected, registered, discovered, ignored, maintenance, not found, deleted]
    description: Current connection state.
  created_at:
    $ref: ../../v1alpha1/core/api.yml#/components/schemas/created_at
  updated_at:
    $ref: ../../v1alpha1/core/api.yml#/components/schemas/updated_at
  deleted_at:
    $ref: ../../v1alpha1/core/api.yml#/components/schemas/nullTime
```

### Payload schema (in `api.yml`)

```yaml
ConnectionPayload:
  type: object
  description: Payload for creating or updating a connection.
  required:
    - name
    - kind
    - type
  properties:
    id:
      $ref: ../../v1alpha1/core/api.yml#/components/schemas/uuid
      description: Existing connection ID for updates; omit on create.
      x-oapi-codegen-extra-tags:
        json: "id,omitempty"
    name:
      type: string
      description: Human-readable name.
      minLength: 1
      maxLength: 255
    kind:
      type: string
      description: Technology kind.
    type:
      type: string
      description: Connectivity type.
```

### Endpoints pattern

```yaml
/api/integrations/connections:
  get:
    operationId: getConnections
    tags: [Connections]
    x-internal: ["meshery"]
    responses:
      "200":
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/ConnectionPage"
  post:
    operationId: createConnection
    tags: [Connections]
    x-internal: ["meshery"]
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/ConnectionPayload"   # ← Payload, not Connection
    responses:
      "201":
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/Connection"
```

---

## Key

Auth entity with an optional expiry timestamp (`nullTime`).

**Files:** `schemas/constructs/v1beta1/key/`

### Entity schema (`key.yaml`)

```yaml
type: object
additionalProperties: false
required:
  - id
  - name
  - owner
  - created_at
  - updated_at
properties:
  id:
    $ref: ../../v1alpha1/core/api.yml#/components/schemas/uuid
  name:
    type: string
    description: Display name of the key.
    minLength: 1
    maxLength: 255
  owner:
    $ref: ../../v1alpha1/core/api.yml#/components/schemas/uuid
    description: UUID of the user who owns this key.
  expires_at:
    $ref: ../../v1alpha1/core/api.yml#/components/schemas/nullTime
    description: Expiry timestamp; null means the key never expires.
  created_at:
    $ref: ../../v1alpha1/core/api.yml#/components/schemas/created_at
  updated_at:
    $ref: ../../v1alpha1/core/api.yml#/components/schemas/updated_at
  deleted_at:
    $ref: ../../v1alpha1/core/api.yml#/components/schemas/nullTime
```

### Payload schema

```yaml
KeyPayload:
  type: object
  description: Payload for creating or rotating a key.
  required:
    - name
  properties:
    id:
      $ref: ../../v1alpha1/core/api.yml#/components/schemas/uuid
      x-oapi-codegen-extra-tags:
        json: "id,omitempty"
    name:
      type: string
      minLength: 1
      maxLength: 255
    expiresAt:
      type: string
      format: date-time
      description: Optional expiry; omit for a non-expiring key.
      x-oapi-codegen-extra-tags:
        json: "expiresAt,omitempty"
```

---

## Team

Identity entity scoped to an organization, with separate create/update payloads.

**Files:** `schemas/constructs/v1beta1/team/`

### Entity schema (`team.yaml`)

```yaml
type: object
additionalProperties: false
required:
  - id
  - name
  - orgId
  - created_at
  - updated_at
properties:
  id:
    $ref: ../../v1alpha1/core/api.yml#/components/schemas/uuid
  name:
    type: string
    description: Team display name.
    minLength: 1
    maxLength: 255
  orgId:
    $ref: ../../v1alpha1/core/api.yml#/components/schemas/uuid
    description: Organization this team belongs to.
  description:
    type: string
    description: Optional team description.
    maxLength: 1000
  created_at:
    $ref: ../../v1alpha1/core/api.yml#/components/schemas/created_at
  updated_at:
    $ref: ../../v1alpha1/core/api.yml#/components/schemas/updated_at
  deleted_at:
    $ref: ../../v1alpha1/core/api.yml#/components/schemas/nullTime
```

### Payload schemas

Teams use separate create and update payloads — a common pattern when `orgId` is immutable after creation:

```yaml
teamPayload:
  type: object
  description: Payload for creating a team.
  required:
    - name
    - orgId
  properties:
    name:
      type: string
      minLength: 1
      maxLength: 255
    orgId:
      $ref: ../../v1alpha1/core/api.yml#/components/schemas/uuid
    description:
      type: string
      maxLength: 1000
      x-oapi-codegen-extra-tags:
        json: "description,omitempty"

teamUpdatePayload:
  type: object
  description: Payload for updating a team (orgId cannot be changed).
  required:
    - name
  properties:
    name:
      type: string
      minLength: 1
      maxLength: 255
    description:
      type: string
      maxLength: 1000
      x-oapi-codegen-extra-tags:
        json: "description,omitempty"
```

---

## Environment

Org-scoped entity with a bulk-delete endpoint.

**Files:** `schemas/constructs/v1beta1/environment/`

### Entity schema (`environment.yaml`)

```yaml
type: object
additionalProperties: false
required:
  - id
  - name
  - orgId
  - created_at
  - updated_at
properties:
  id:
    $ref: ../../v1alpha1/core/api.yml#/components/schemas/uuid
  name:
    type: string
    description: Environment display name.
    minLength: 1
    maxLength: 255
  orgId:
    $ref: ../../v1alpha1/core/api.yml#/components/schemas/uuid
    description: Organization this environment belongs to.
  description:
    type: string
    description: Optional environment description.
    maxLength: 1000
  created_at:
    $ref: ../../v1alpha1/core/api.yml#/components/schemas/created_at
  updated_at:
    $ref: ../../v1alpha1/core/api.yml#/components/schemas/updated_at
  deleted_at:
    $ref: ../../v1alpha1/core/api.yml#/components/schemas/nullTime
```

### Payload schema

```yaml
environmentPayload:
  type: object
  description: Payload for creating or updating an environment.
  required:
    - name
    - orgId
  properties:
    name:
      type: string
      minLength: 1
      maxLength: 255
    orgId:
      $ref: ../../v1alpha1/core/api.yml#/components/schemas/uuid
    description:
      type: string
      maxLength: 1000
      x-oapi-codegen-extra-tags:
        json: "description,omitempty"
```

### Bulk delete endpoint (POST, not DELETE)

```yaml
/api/integrations/environments/delete:
  post:
    operationId: deleteEnvironments
    summary: Bulk delete environments by ID
    tags: [Environments]
    x-internal: ["cloud"]
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/EnvironmentIds"
    responses:
      "200":
        description: Environments deleted
```

<div class="callout warn">
  <div>Never use <code>DELETE</code> with a request body. Bulk deletes always go through <code>POST /api/{resources}/delete</code>. See <a href="/guide/naming-rules/#http-method-semantics">HTTP method semantics</a>.</div>
</div>
