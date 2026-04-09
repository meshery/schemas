# Academy Construct Reference

The Academy construct in `meshery/schemas` serves as an exemplar for creating OpenAPI schemas from Golang models.

## Repository Location

- **Schema**: https://github.com/meshery/schemas/blob/master/schemas/constructs/v1beta1/academy/api.yml
- **Go Models**: https://github.com/meshery/schemas/tree/master/models/v1beta1/academy

## Key Files

| File | Purpose |
|------|---------|
| `schemas/constructs/v1beta1/academy/api.yml` | OpenAPI schema with paths and components |
| `models/v1beta1/academy/academy.go` | Auto-generated Go models from schema |
| `models/v1beta1/academy/helpers.go` | Custom driver methods and utilities (NOT auto-generated) |

## Schema Patterns Demonstrated

### 1. Complex Type References

The Academy schema demonstrates cross-schema references:

```yaml
badge_id:
  $ref: "../../v1alpha1/core/api.yml#/components/schemas/uuid"
  description: ID of the badge to be awarded on completion
  x-oapi-codegen-extra-tags:
    db: "badge_id"
    json: "badge_id"
    yaml: "badge_id"
```

### 2. Custom Go Type Mappings

Using `x-go-type` for specialized types:

```yaml
metadata:
  type: object
  additionalProperties: true
  x-go-type: "core.Map"
  x-go-type-skip-optional-pointer: true
  x-oapi-codegen-extra-tags:
    db: "metadata"
```

### 3. Nullable Time Fields

Proper handling of nullable timestamps:

```yaml
deletedAt:
  x-go-type: "core.NullTime"
  $ref: "../../v1alpha1/core/api.yml#/components/schemas/deleted_at"
  x-oapi-codegen-extra-tags:
    db: "deleted_at"
```

### 4. Enum Definitions

String enums with Go type references:

```yaml
ContentType:
  type: string
  enum:
    - learning-path
    - challenge
    - certification

visibility:
  $ref: "#/components/schemas/Visibility"
  x-go-type: "Visibility"
  x-oapi-codegen-extra-tags:
    db: "visibility"
```

### 5. Cross-Schema Component References

Referencing schemas from other constructs:

```yaml
Invitation:
  $ref: "../invitation/api.yml#/components/schemas/Invitation"
  x-go-type: "invitation.Invitation"
  x-go-type-import:
    path: "github.com/meshery/schemas/models/v1beta1/invitation"
```

## helpers.go Patterns

The `helpers.go` file contains manually written code that is **NOT auto-generated**:

### SQL Scanner/Valuer Implementations

```go
func (test *Quiz) Scan(value interface{}) error {
    mapVal := core.Map{}
    err := mapVal.Scan(value)
    if err != nil {
        return err
    }
    return core.MapToStruct(mapVal, test)
}

func (test Quiz) Value() (driver.Value, error) {
    mapVal, err := core.StructToMap(test)
    if err != nil {
        return nil, err
    }
    return core.Map(mapVal).Value()
}
```

### Custom Business Logic Methods

```go
func (test *Quiz) GetTimeLimit() *time.Duration {
    timeLimitMinutes, err := strconv.Atoi(test.TimeLimit)
    if err != nil || timeLimitMinutes <= 0 {
        return nil
    }
    duration := time.Duration(timeLimitMinutes) * time.Minute
    return &duration
}
```

## When to Create helpers.go

Create a `helpers.go` file when you need:

1. **SQL Driver Methods** - `Scan()` and `Value()` for complex types stored as JSON in database
2. **TableName Methods** - Custom table names for ORM mapping
3. **Business Logic** - Computed properties or validation methods
4. **Type Conversions** - Converting between API and database representations

## Internal API Marker

Academy APIs use `x-internal` to indicate cloud-only endpoints:

```yaml
x-internal: ["cloud"]
```

This marker signals that the endpoint is not part of the public Meshery API but is specific to Layer5 Cloud.
