---
layout: guide
title: Add a Construct
description: Step-by-step guide for adding a new entity schema to Meshery Schemas.
---

<div class="breadcrumb"><a href="/">Home</a> <span>/</span> <a href="/guide/">Guide</a> <span>/</span> Add a Construct</div>

# Add a Construct

<p class="page-desc">
  A complete walkthrough for adding a new entity — from creating the directory structure
  to the dual-schema pattern to the PR checklist.
</p>

## 1. Create the directory structure

Every construct lives under `schemas/constructs/<version>/<construct>/`:

<div class="file-tree">
schemas/constructs/v1beta1/<span class="dir">keychain/</span><br>
&nbsp;&nbsp;api.yml<span class="note">← OpenAPI spec: endpoints + all schema definitions</span><br>
&nbsp;&nbsp;keychain.yaml<span class="note">← Entity (response) schema</span><br>
&nbsp;&nbsp;<span class="dir">templates/</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;keychain_template.json<span class="note">← Example instance</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;keychain_template.yaml
</div>

Use `v1beta1` for new constructs unless you have a specific reason for a different version.

---

## 2. Write the entity schema (`keychain.yaml`)

The entity schema represents the **full server-side object** as returned in `GET` responses.

```yaml
# schemas/constructs/v1beta1/keychain/keychain.yaml
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
    description: Unique identifier for the keychain.
  name:
    type: string
    description: Human-readable name of the keychain.
    minLength: 1
    maxLength: 256
  owner:
    $ref: ../../v1alpha1/core/api.yml#/components/schemas/uuid
    description: UUID of the user who owns this keychain.
    x-oapi-codegen-extra-tags:
      db: "owner"
  created_at:
    $ref: ../../v1alpha1/core/api.yml#/components/schemas/created_at
  updated_at:
    $ref: ../../v1alpha1/core/api.yml#/components/schemas/updated_at
  deleted_at:
    $ref: ../../v1alpha1/core/api.yml#/components/schemas/nullTime
```

**Required on every entity schema:**
- `additionalProperties: false`
- All server-generated fields (`id`, `created_at`, `updated_at`, `deleted_at`) in `properties`
- Server-generated fields that are always present in `required`

---

## 3. Write the API spec (`api.yml`)

`api.yml` holds the OpenAPI paths, the `*Payload` schema for writes, and imports the entity schema.

### 3a. Define the Payload schema

```yaml
# In api.yml — components/schemas section
KeychainPayload:
  type: object
  description: Payload for creating or updating a keychain.
  additionalProperties: false
  required:
    - name
  properties:
    id:
      $ref: ../../v1alpha1/core/api.yml#/components/schemas/uuid
      description: Existing keychain ID for updates; omit on create.
      x-oapi-codegen-extra-tags:
        json: "id,omitempty"
    name:
      type: string
      description: Human-readable name of the keychain.
      minLength: 1
      maxLength: 256
    owner:
      $ref: ../../v1alpha1/core/api.yml#/components/schemas/uuid
      description: Owner user ID.
      x-oapi-codegen-extra-tags:
        json: "owner,omitempty"
```

The Payload contains **only client-settable fields** — never `created_at`, `updated_at`, `deleted_at`.

### 3b. Define the endpoints

```yaml
paths:
  /api/auth/keychains:
    get:
      operationId: getKeychains
      summary: List keychains
      tags: [Keychains]
      x-internal: ["cloud"]
      responses:
        "200":
          description: List of keychains
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Keychain'
    post:
      operationId: createKeychain
      summary: Create a keychain
      tags: [Keychains]
      x-internal: ["cloud"]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/KeychainPayload'   # ← Payload, not Keychain
      responses:
        "201":                                               # ← 201 for creation
          description: Keychain created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Keychain'
```

**Key rules:**
- `POST`/`PUT` `requestBody` must reference `*Payload`, never the entity schema
- `POST` that creates a resource returns **201**, not 200
- Every operation needs `x-internal` and at least one `tags` entry
- `operationId` is lower camelCase verbNoun — `createKeychain`, not `CreateKeychain`

---

## 4. Write the templates

Templates are example instances used for documentation and testing.

```json
// templates/keychain_template.json
{
  "id": "00000000-0000-0000-0000-000000000000",
  "name": "My Keychain",
  "owner": "00000000-0000-0000-0000-000000000000",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z",
  "deleted_at": null
}
```

Match the types exactly: if the schema says `type: array`, use `[]`, not `{}`.

---

## 5. Register in `_config.yml`

No change needed — `schemas/constructs` is already in `include`, so the new directory is automatically picked up by Jekyll and by the constructs index page.

---

## 6. Run the build

```bash
make build          # generate Go structs + TypeScript types
go test ./...       # verify Go compilation
npm run build       # verify TypeScript compilation
make validate-schemas  # run schema rules
```

---

## PR checklist

Before opening a PR, verify every item:

<ul class="checklist">
  <li><code>keychain.yaml</code> has <code>additionalProperties: false</code></li>
  <li><code>keychain.yaml</code> lists all server-generated fields in <code>required</code></li>
  <li><code>api.yml</code> defines <code>KeychainPayload</code> with only client-settable fields</li>
  <li>All <code>POST</code>/<code>PUT</code> <code>requestBody</code> entries reference <code>KeychainPayload</code>, not <code>Keychain</code></li>
  <li><code>POST</code> that creates returns 201, not 200</li>
  <li>Every operation has <code>x-internal</code> and at least one <code>tags</code> entry</li>
  <li><code>operationId</code> is lower camelCase verbNoun</li>
  <li>Path parameters are camelCase with <code>Id</code> suffix (<code>{keychainId}</code>, not <code>{keychainID}</code>)</li>
  <li>Template files exist and use correct value types</li>
  <li><code>make build</code> passes</li>
  <li><code>go test ./...</code> passes</li>
  <li><code>make validate-schemas</code> passes</li>
</ul>

---

## Canonical reference implementations

When in doubt, model your new construct on one of these:

| Construct | What it demonstrates |
|---|---|
| `v1beta1/connection/` | Full CRUD with Payload, path params, bulk delete |
| `v1beta1/key/` | Simple entity with KeyPayload |
| `v1beta1/team/` | Two payload types (create vs update) |
| `v1beta1/environment/` | Environment with pagination |
