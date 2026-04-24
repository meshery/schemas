---
layout: guide
title: Guide
description: Contributor and integrator guides for Meshery Schemas.
---

<div class="breadcrumb"><a href="/">Home</a> <span>/</span> Guide</div>

# Guide

<p class="page-desc">
  Everything you need to work with Meshery Schemas — whether you're adding a new construct,
  consuming generated Go or TypeScript types, or understanding how the build pipeline works.
</p>

## Where to start

| I want to… | Go to |
|---|---|
| Understand what schema-driven development means | [Schema-Driven Development](/guide/schema-driven-dev/) |
| Add a new construct to the schema repo | [Add a Construct](/guide/add-a-construct/) |
| Look up the correct casing for a field name | [Naming Rules](/guide/naming-rules/) |
| Understand schema version numbering | [Versioning](/guide/versioning/) |
| Know what `make build` actually does | [Build Pipeline](/guide/build-pipeline/) |
| Write a `*_helper.go` file or SQL driver methods | [Helper Files](/guide/helpers/) |
| Copy a schema pattern for a new entity | [Reference Cards](/guide/reference-cards/) |

---

## Guides

### [Schema-Driven Development](/guide/schema-driven-dev/)
How schemas propagate through Go, TypeScript, and the API surface. The mental model every contributor needs.

### [Add a Construct](/guide/add-a-construct/)
Step-by-step walkthrough for creating a new entity — files to create, the dual-schema pattern, and the PR checklist.

### [Naming Rules](/guide/naming-rules/)
The authoritative casing reference: wire format, DB tags, Go fields, TypeScript properties, URL parameters, and `operationId`.

### [Versioning](/guide/versioning/)
How API versions work (`v1alpha1`, `v1beta1`, …), when to bump a version, and the deprecation lifecycle.

### [Build Pipeline](/guide/build-pipeline/)
What `make build` generates, how oapi-codegen and openapi-typescript fit in, and how to validate your changes.

### [Helper Files](/guide/helpers/)
Writing `*_helper.go` files: `TableName()`, the Entity interface, `Value()`/`Scan()` SQL driver conventions, and `x-generate-db-helpers` rules.

### [Reference Cards](/guide/reference-cards/)
Copy-paste schema patterns for the four canonical constructs — `connection`, `key`, `team`, and `environment` — covering entity YAML, payload schema, and endpoint structure.
