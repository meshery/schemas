# Notification Construct - Design Summary

## Files Created

- **api.yml** - OpenAPI 3.0.0 index file defining the Notification API with list and create endpoints
- **notification.yaml** - Subschema defining the Notification data model
- **templates/notification_template.json** - Default-value template for programmatic creation

## Design Decisions

### Schema Structure

The notification construct follows the established pattern from existing v1beta1 constructs (environment, invitation). It uses the standard directory layout with `api.yml` as the entry point referencing `notification.yaml` via `$ref`, and a `templates/` directory for default-value templates.

### Field Choices

- **id**: References `core/api.yml#/components/schemas/uuid` with Go UUID type, matching how all other constructs define their primary key.
- **schemaVersion**: Uses `versionString` ref with `default: notifications.meshery.io/v1beta1`, following the `<plural>.meshery.io/<version>` pattern seen in environments and other constructs. Excluded from DB/GORM with `db: "-"` and `gorm: "-"`.
- **title/message**: Plain string fields with standard `db`, `yaml`, and `json` struct tags.
- **severity**: Defined as a string enum with lowercase values (`info`, `warning`, `error`, `critical`) per the naming convention that enum values must be lowercase. Uses `x-go-type-skip-optional-pointer: true` to avoid pointer indirection in Go.
- **isRead**: Boolean with `default: false` and `x-go-type-skip-optional-pointer: true` so the Go struct gets a plain `bool` rather than `*bool`.
- **userId**: References the core `uuid` schema with `x-go-name: UserID` for idiomatic Go naming, and `db: user_id` for the database column mapping.
- **Timestamps** (`created_at`, `updated_at`, `deleted_at`): Reference `core/api.yml#/components/schemas/Time` exactly as environment.yaml does. `deleted_at` uses `x-go-type: core.NullTime` for SQL nullable time handling.

### API Design

- **OpenAPI version**: 3.0.0 (not 3.1.0) as required by the oapi-codegen toolchain.
- **Paths**: Use `/api/notifications` with plural noun and `/api` prefix per convention.
- **operationId**: `GetNotifications` and `CreateNotification` follow the PascalCase VerbNoun pattern seen in existing constructs (e.g., `GetEnvironments`, `CreateEnvironment`).
- **Pagination**: The `NotificationPage` schema follows the standard pattern with `page`, `page_size`, `total_count`, and a typed array field, matching `environmentPage`.
- **Query parameters**: Reuse core parameters (`search`, `order`, `page`, `pagesize`) via `$ref` rather than redefining them.
- **Responses**: Reference core response definitions for 400, 401, and 500 errors.
- **x-internal**: Both endpoints are tagged `["cloud"]` since notifications are a cloud-platform feature. This ensures they appear in the cloud merged spec but not the meshery OSS spec.
- **Security**: JWT bearer auth applied globally, consistent with other cloud-scoped constructs.

### Template

The JSON template provides zero-value defaults: nil UUID for `id` and `userId`, empty strings for text fields, `"info"` as the default severity, and `false` for `isRead`. This matches the template pattern from environment and other constructs.
