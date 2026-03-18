# How the Go Generator Resolves Cross-Package References

## The Problem

When your schema uses a `$ref` that points to another construct's `api.yml`, the bundler inlines the referenced type definition into the bundled JSON. But `oapi-codegen` (the Go code generator) does not automatically know which Go package that type lives in. Without explicit hints, it either generates a duplicate type definition in the wrong package or fails with a missing import error.

## The Two-Layer Resolution Mechanism

Cross-package references are resolved through two independent mechanisms that work together:

### Layer 1: Static import mappings in `build/openapi.config.yml`

The file `build/openapi.config.yml` contains an `import-mapping` section that maps `$ref` file paths (as they appear after bundling) to Go import paths:

```yaml
import-mapping:
  "../../core.json": "github.com/meshery/schemas/models/core"
  "../v1beta1/model.json": "github.com/meshery/schemas/models/v1beta1/model"
  "../v1beta1/connection.json": "github.com/meshery/schemas/models/v1beta1/connection"
  "../v1beta1/design.json": "github.com/meshery/schemas/models/v1beta1/design"
  # ... etc.
```

When `oapi-codegen` encounters a `$ref` whose path matches one of these keys, it imports the type from the mapped Go package rather than generating it inline. However, this file only covers a fixed set of well-known references. If your schema references a construct not listed here, the mapping won't exist and `oapi-codegen` won't know where to find the Go type.

### Layer 2: Per-field `x-go-type` and `x-go-type-import` in the schema itself

This is the mechanism you need to use. On any property that uses a `$ref` to another construct, you add two OpenAPI extension fields:

- **`x-go-type`**: Tells `oapi-codegen` the exact Go type name to use (e.g., `plan.Plan`), using the `package.Type` format.
- **`x-go-type-import`**: Tells `oapi-codegen` the full Go import path so it can add the correct `import` statement to the generated file.

These annotations travel with the schema through bundling and override whatever `oapi-codegen` would otherwise do.

## What You Need to Add to Your Schema

Whenever a property in your schema references a type from a different construct, you must include three things:

1. The `$ref` (for the OpenAPI tooling and TypeScript generator)
2. `x-go-type` (the Go type in `package.Type` format)
3. `x-go-type-import` with a `path` (the full Go module import path)

### Concrete example: referencing a `Plan` type from the `feature` construct

```yaml
# In schemas/constructs/v1beta1/feature/api.yml
components:
  schemas:
    PlanFeature:
      type: object
      properties:
        plan:
          $ref: "../plan/api.yml#/components/schemas/Plan"
          x-go-type: plan.Plan
          x-go-type-import:
            path: github.com/meshery/schemas/models/v1beta1/plan
          x-oapi-codegen-extra-tags:
            belongs_to: "plans"
            fk_id: "PlanId"
            yaml: "plan,omitempty"
            json: "plan,omitempty"
```

### What each field does

| Field | Value | Purpose |
|-------|-------|---------|
| `$ref` | `"../plan/api.yml#/components/schemas/Plan"` | Tells the OpenAPI bundler and TypeScript generator where the type definition lives |
| `x-go-type` | `plan.Plan` | Tells `oapi-codegen` to emit `plan.Plan` as the Go type instead of generating a new struct |
| `x-go-type-import.path` | `github.com/meshery/schemas/models/v1beta1/plan` | Tells `oapi-codegen` to add `import "github.com/meshery/schemas/models/v1beta1/plan"` to the generated `.go` file |

### How to determine the correct import path

The Go import path follows a predictable pattern based on the directory structure:

```
github.com/meshery/schemas/models/<version>/<package>
```

Where `<package>` is the directory name of the target construct (with the override applied if one exists in `build/lib/config.js` -- for example, `design` becomes `pattern`). The type name is the PascalCase schema component name as defined in the target's `api.yml`.

### Another example: referencing an `Invitation` type from a workspace construct

```yaml
# In schemas/constructs/v1beta1/workspace/api.yml
components:
  schemas:
    WorkspaceDetail:
      type: object
      properties:
        invitation:
          $ref: "../invitation/api.yml#/components/schemas/Invitation"
          x-go-type: invitation.Invitation
          x-go-type-import:
            path: github.com/meshery/schemas/models/v1beta1/invitation
```

### Cross-version example: referencing a v1alpha3 type from a v1beta1 construct

```yaml
# In schemas/constructs/v1beta1/model/model.yaml
relationship:
  $ref: "../../v1alpha3/relationship/api.yml#/components/schemas/RelationshipDefinition"
  x-go-type: relationship.RelationshipDefinition
  x-go-type-import:
    path: github.com/meshery/schemas/models/v1alpha3/relationship
```

## Common Mistakes That Cause the Error

1. **Missing `x-go-type` and `x-go-type-import` entirely.** The `$ref` alone is not enough for Go. Without the type hints, `oapi-codegen` either inlines the type (causing duplicate definitions) or fails to resolve the import.

2. **Wrong import path.** The import path must point to the generated Go package under `models/`, not to the schema source under `schemas/constructs/`. Double-check that the package directory exists after a build (e.g., `models/v1beta1/plan/plan.go`).

3. **Forgetting the package name override.** If the target construct has a name override in `build/lib/config.js` (e.g., `design` maps to `pattern`), you must use the overridden name in both `x-go-type` and the import path. So it would be `pattern.PatternFile`, not `design.PatternFile`.

4. **Missing entry in `build/openapi.config.yml`.** If the cross-reference is at the top level of `components/schemas` (rather than an inline property), you may also need to add an entry to the `import-mapping` section of `build/openapi.config.yml`. The key should match the relative path as it appears in the bundled JSON output.

## Summary

The `$ref` handles schema-level linking. The `x-go-type` + `x-go-type-import` pair handles Go-level linking. You always need both when referencing a type from another construct. Without the Go annotations, the generator cannot produce a valid `import` statement, and the build fails with a missing import error.
