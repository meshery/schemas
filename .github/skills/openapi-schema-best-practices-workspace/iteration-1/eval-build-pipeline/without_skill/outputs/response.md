# How the Go Generator Resolves Cross-Package References

## The Build Pipeline

When you run `make build`, two steps are relevant to your error:

1. **`bundle-openapi`** -- Runs `swagger-cli bundle --dereference` on each construct's `api.yml`. This resolves all `$ref` pointers and produces a fully dereferenced JSON file per construct at `_openapi_build/constructs/<version>/<package>/merged-openapi.json`.

2. **`generate-golang`** -- Runs `oapi-codegen` on each dereferenced JSON file to produce Go structs at `models/<version>/<package>/<package>.go`.

The critical point: because `swagger-cli bundle --dereference` inlines every `$ref` target, the resulting JSON file contains **no cross-file references**. Every referenced schema is expanded in place. This means `oapi-codegen` sees a single self-contained document -- it does not natively resolve cross-package Go imports from `$ref` paths.

## How Cross-Package Go Imports Actually Work

Since dereferencing inlines the referenced schema, `oapi-codegen` would normally generate a duplicate copy of the referenced type inside the importing package. To avoid this and instead produce a proper Go import, you must use three `x-` extension fields together:

| Extension | Purpose |
|-----------|---------|
| `x-go-type` | Tells oapi-codegen to use this Go type name instead of generating a new struct |
| `x-go-type-import.path` | The full Go import path for the package containing that type |
| `$ref` | The OpenAPI reference to the schema (used by the bundler for dereferencing and by TypeScript generation) |

All three are required. Without `x-go-type` and `x-go-type-import`, the generator either duplicates the struct or fails with a missing import error.

## Concrete Examples

### Example 1: Referencing a type from another v1beta1 construct

In `component.yaml`, the `model` field references the `ModelDefinition` type from the `model` package:

```yaml
model:
  $ref: ../model/model.yaml
  x-go-type: model.ModelDefinition
  x-go-type-import:
    path: github.com/meshery/schemas/models/v1beta1/model
  x-order: 7
  description: Reference to the registered model.
  x-oapi-codegen-extra-tags:
    gorm: foreignKey:ModelId;references:Id
    json: model,omitempty
    yaml: model,omitempty
```

This generates a Go field like:

```go
import "github.com/meshery/schemas/models/v1beta1/model"

type ComponentDefinition struct {
    Model model.ModelDefinition `json:"model,omitempty" yaml:"model,omitempty"`
    // ...
}
```

### Example 2: Referencing a schema defined inside another construct's api.yml

In `component.yaml`, the `modelReference` field references a schema defined under `components/schemas` in the model's `api.yml`:

```yaml
modelReference:
  $ref: ../model/api.yml#/components/schemas/ModelReference
  x-go-type: model.ModelReference
  x-go-type-import:
    path: github.com/meshery/schemas/models/v1beta1/model
  x-order: 8
  x-oapi-codegen-extra-tags:
    gorm: "-"
```

### Example 3: Referencing a type from a different API version

In `model.yaml`, the `registrant` field references the `connection` package (same version but different construct), and `category` references another:

```yaml
registrant:
  $ref: ../connection/connection.yaml
  x-go-type: connection.Connection
  x-go-type-import:
    path: github.com/meshery/schemas/models/v1beta1/connection
  x-oapi-codegen-extra-tags:
    yaml: registrant
    json: registrant
    gorm: foreignKey:RegistrantId;references:ID

category:
  $ref: ../category/category.yaml
  x-go-type: category.CategoryDefinition
  x-go-type-import:
    path: github.com/meshery/schemas/models/v1beta1/category
  x-oapi-codegen-extra-tags:
    yaml: category
    json: category
    gorm: foreignKey:CategoryId;references:Id
```

### Example 4: Referencing a type from v1alpha1 (cross-version)

In `component.yaml`, the `capabilities` field references the capability type from `v1alpha1`:

```yaml
capabilities:
  type: array
  items:
    $ref: ../../v1alpha1/capability/capability.yaml
    x-go-type: capability.Capability
    x-go-type-import:
      path: github.com/meshery/schemas/models/v1alpha1/capability
  x-oapi-codegen-extra-tags:
    gorm: type:bytes;serializer:json
    yaml: capabilities
    json: capabilities
```

### Example 5: Referencing a type from v1alpha2 (another cross-version case)

In the design construct's `api.yml`, `catalog_data` references the catalog package:

```yaml
catalog_data:
  $ref: "../../v1alpha2/catalog/api.yml#/components/schemas/CatalogData"
  x-go-type: catalog.CatalogData
  x-go-type-import:
    path: github.com/meshery/schemas/models/v1alpha2/catalog
```

### Example 6: Referencing core types (no x-go-type needed)

References to `v1alpha1/core/api.yml` for primitive types like `uuid`, `created_at`, `semverString`, etc. do **not** need `x-go-type` overrides because these are simple types (strings, timestamps) that the core schema defines with their own `x-go-type` annotations at the source:

```yaml
id:
  $ref: ../../v1alpha1/core/api.yml#/components/schemas/uuid
  x-oapi-codegen-extra-tags:
    yaml: id
    json: id

created_at:
  $ref: ../../v1alpha1/core/api.yml#/components/schemas/created_at

updated_at:
  $ref: ../../v1alpha1/core/api.yml#/components/schemas/updated_at
```

These work because the core schema definitions already carry their own `x-go-type` (e.g., `uuid.UUID` from `github.com/gofrs/uuid`) which gets inlined during dereferencing.

## What To Add To Fix Your Schema

If you are getting a missing import error for a `$ref` to another construct, you need to add `x-go-type` and `x-go-type-import` alongside the `$ref`. The pattern is:

```yaml
myField:
  $ref: <relative-path-to-other-schema>
  x-go-type: <package>.<TypeName>
  x-go-type-import:
    path: github.com/meshery/schemas/models/<version>/<package>
```

The `<package>` in `x-go-type` must match the directory name under `models/` (or the override in `build/lib/config.js` -- for example, the `design` directory maps to the `pattern` Go package). The `<TypeName>` must match the schema name as it appears in the referenced construct's generated Go code.

## Import Path Formula

The Go import path follows this pattern:

```
github.com/meshery/schemas/models/<version>/<go-package-name>
```

Where `<go-package-name>` is:
- Usually the directory name (e.g., `model`, `component`, `connection`, `category`)
- Unless overridden in `build/lib/config.js` under `packageNameOverrides` (e.g., `design` directory produces the `pattern` Go package)

## Summary Checklist

When referencing another construct in your schema:

- [ ] Add the `$ref` with the correct relative path to the other schema
- [ ] Add `x-go-type: <package>.<TypeName>` to tell oapi-codegen to use the existing Go type
- [ ] Add `x-go-type-import.path` with the full Go module path to the target package
- [ ] Verify the Go package name matches what is generated (check `packageNameOverrides` in `build/lib/config.js`)
- [ ] Run `make build` to confirm generation succeeds
