---
layout: guide
title: Versioning
description: How API versions work and when to introduce a new one.
---

<div class="breadcrumb"><a href="/">Home</a> <span>/</span> <a href="/guide/">Guide</a> <span>/</span> Versioning</div>

# Versioning

<p class="page-desc">
  How schema versions are structured, when to create a new version, and how the
  deprecation lifecycle works.
</p>

## Version naming

Versions follow a two-segment scheme: stability tier + increment.

| Version | Stability | Meaning |
|---|---|---|
| `v1alpha1`, `v1alpha2`, … | Alpha | Experimental; may change without notice |
| `v1beta1`, `v1beta2`, … | Beta | Stable API surface; breaking changes require a version bump |
| `v1`, `v2`, … | GA | (future) Fully stable, long-term support |

The digit after the tier (`alpha1`, `beta1`) increments when the tier's contract needs a breaking change.

---

## Current version map

| Version | Role | Status |
|---|---|---|
| `v1alpha1` | Core scalar types, foundational models | Foundation — referenced by all others |
| `v1alpha2` | Catalog construct | Single-purpose |
| `v1alpha3` | Relationship and selector constructs | Domain-specific |
| `v1beta1` | Primary production API surface (30+ constructs) | **Active — target for new constructs** |
| `v1beta2` | Canonical-casing migration of v1beta1 constructs | In progress |
| `v1beta3` | Newer constructs (workspace, environment, …) | Active |

**Use `v1beta1` for new constructs** unless targeting a resource that already has a `v1beta2` or `v1beta3` equivalent.

---

## When NOT to bump a version

Most changes do not require a version bump:

- Adding a new **optional** property to an entity schema
- Adding a new endpoint to an existing `api.yml`
- Adding a new `*Payload` schema for a new operation
- Fixing a typo in a `description`
- Adding validation constraints (`minLength`, `pattern`) to an unpublished version

These are backward-compatible and can land in the existing version.

---

## When to bump a version

A version bump is required when:

- **Renaming a property** on the wire (the JSON key changes)
- **Removing a property** from a published schema
- **Changing a property's type** (e.g., `string` → `integer`)
- **Recasing wire properties** — migrating a resource from `snake_case` to `camelCase` wire format requires a new version

<div class="callout warn">
  <div>Partial casing migrations are forbidden. You cannot rename <em>some</em> fields from <code>snake_case</code> to <code>camelCase</code> within the same version. The entire resource migrates at once in a new version.</div>
</div>

---

## How to introduce a new version

1. Create a new directory: `schemas/constructs/v1beta2/<construct>/`
2. Copy and modify the schema from the previous version
3. Add `x-deprecated: true` to the old version's `api.yml` to signal deprecation
4. Update downstream repos to import the new version (typically in a follow-up PR)
5. Keep the old version for one release cycle before removal

```yaml
# In the old api.yml — signal deprecation
info:
  x-deprecated: true
  description: Deprecated in favour of v1beta2/connection. Migrate by [date].
```

---

## Deprecation lifecycle

```
v1beta1/connection (published)
    │
    │  ← new version introduced
    ▼
v1beta2/connection (new canonical)
    │
    │  ← one release cycle
    ▼
v1beta1/connection (removed)
```

1. New version publishes alongside the old one
2. Downstream repos update imports during the deprecation window
3. Old version is removed after one release cycle

---

## The `x-deprecated` annotation

Mark a construct as deprecated in its `api.yml`:

```yaml
info:
  title: Connection (v1beta1)
  version: v1beta1
  x-deprecated: true
```

The validator suppresses advisory rule violations on deprecated constructs — known casing issues in legacy versions are not flagged.

---

## Cross-version references

It is valid for a newer version to `$ref` a type from an older, stable version:

```yaml
# v1beta3/workspace/api.yml referencing v1alpha1 core types
id:
  $ref: ../../v1alpha1/core/api.yml#/components/schemas/uuid
```

Do not reference types from a version that is itself in flux or has open deprecations.
