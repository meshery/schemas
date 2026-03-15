# Common Query Parameters and List Response Schemas

This document describes the common, reusable schemas for query parameters and list responses in the Meshery schemas repository.

## Overview

To promote consistency and reduce duplication across API endpoints, we have defined common schemas for:

1. **Query Parameters** - Standard parameters for pagination, search, sorting, and filtering
2. **Pagination Metadata** - Standard schema for pagination information in list responses

These schemas are defined in `schemas/constructs/v1alpha1/core/api.yml` and can be referenced by any API specification.

## Query Parameters

### Standard Query Parameters

The following standardized query parameters are available for list endpoints:

#### pageNumber
- **Name**: `page`
- **Type**: integer
- **Default**: 1
- **Minimum**: 1
- **Description**: Page number for pagination (1-indexed). Returns the specified page of results.
- **Reference**: `../../v1alpha1/core/api.yml#/components/parameters/pageNumber`

#### pageSize
- **Name**: `pagesize`
- **Type**: integer
- **Default**: 25
- **Minimum**: 1
- **Maximum**: 100
- **Description**: Number of items to return per page. Maximum value is 100.
- **Reference**: `../../v1alpha1/core/api.yml#/components/parameters/pageSize`

#### sortOrder
- **Name**: `order`
- **Type**: string
- **Enum**: `asc`, `desc`
- **Default**: `desc`
- **Description**: Sort order for results. Use 'asc' for ascending or 'desc' for descending.
- **Reference**: `../../v1alpha1/core/api.yml#/components/parameters/sortOrder`

#### searchQuery
- **Name**: `search`
- **Type**: string
- **Description**: Search query string to filter results. Searches across relevant fields of the resource.
- **Reference**: `../../v1alpha1/core/api.yml#/components/parameters/searchQuery`

#### filterQuery
- **Name**: `filter`
- **Type**: string
- **Description**: Filter query to narrow down results based on specific criteria.
- **Reference**: `../../v1alpha1/core/api.yml#/components/parameters/filterQuery`

## Pagination Metadata Schema

The `paginationMetadata` schema provides a consistent structure for pagination information in list responses.

### Schema Definition

```yaml
paginationMetadata:
  type: object
  description: Metadata about pagination for list responses
  properties:
    page:
      type: integer
      description: Current page number (1-indexed)
      minimum: 1
      default: 1
    page_size:
      type: integer
      description: Number of items per page
      minimum: 1
      maximum: 100
      default: 25
    total_count:
      type: integer
      description: Total number of items across all pages
      minimum: 0
  required:
    - page
    - page_size
    - total_count
```

### Reference

Use the following reference in your schemas:
```yaml
$ref: ../../v1alpha1/core/api.yml#/components/schemas/paginationMetadata
```

## Usage Examples

### Example 1: Using Query Parameters in an API Endpoint

```yaml
paths:
  /api/resources:
    get:
      tags:
        - resources
      operationId: GetResources
      summary: Get all resources
      description: Gets all resources with pagination support
      parameters:
        - $ref: ../../v1alpha1/core/api.yml#/components/parameters/pageNumber
        - $ref: ../../v1alpha1/core/api.yml#/components/parameters/pageSize
        - $ref: ../../v1alpha1/core/api.yml#/components/parameters/sortOrder
        - $ref: ../../v1alpha1/core/api.yml#/components/parameters/searchQuery
        - $ref: ../../v1alpha1/core/api.yml#/components/parameters/filterQuery
      responses:
        "200":
          description: Resources
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/resourcePage"
```

### Example 2: Creating a List Response Schema

You can create a resource-specific page response that incorporates the pagination metadata using `allOf`:

```yaml
components:
  schemas:
    resourcePage:
      allOf:
        - $ref: ../../v1alpha1/core/api.yml#/components/schemas/paginationMetadata
        - type: object
          properties:
            resources:
              type: array
              items:
                $ref: "#/components/schemas/resource"
```

Or define it with inline properties (current pattern):

```yaml
components:
  schemas:
    resourcePage:
      type: object
      properties:
        page:
          type: integer
          description: Current page number (1-indexed)
        page_size:
          type: integer
          description: Number of items per page
        total_count:
          type: integer
          description: Total number of items across all pages
        resources:
          type: array
          items:
            $ref: "#/components/schemas/resource"
      required:
        - page
        - page_size
        - total_count
        - resources
```

### Example 3: Using paginationMetadata with allOf (Recommended)

For better reusability and consistency, use `allOf` to compose your page schemas:

```yaml
components:
  schemas:
    resourcePage:
      allOf:
        - $ref: ../../v1alpha1/core/api.yml#/components/schemas/paginationMetadata
        - type: object
          required:
            - resources
          properties:
            resources:
              type: array
              description: List of resources on this page
              items:
                $ref: "#/components/schemas/resource"
```

This approach:
- Ensures consistency across all list responses
- Automatically includes validation rules (min, max, defaults)
- Reduces duplication
- Makes future updates easier

## Migration Guide

If you have existing page schemas (e.g., `environmentPage`, `workspacePage`), you can gradually migrate them to use the common schemas:

1. **Keep your current schema working** - No breaking changes required immediately
2. **For new endpoints** - Use the new common parameters and pagination metadata
3. **When updating endpoints** - Consider migrating to the common schemas for consistency

### Before (Old Pattern)

```yaml
parameters:
  page:
    name: page
    in: query
    description: Get responses by page
    schema:
      type: string
  pagesize:
    name: pagesize
    in: query
    description: Get responses by pagesize
    schema:
      type: string
```

### After (New Pattern)

```yaml
parameters:
  - $ref: ../../v1alpha1/core/api.yml#/components/parameters/pageNumber
  - $ref: ../../v1alpha1/core/api.yml#/components/parameters/pageSize
```

## Benefits

1. **Consistency** - All list endpoints use the same parameter names, types, and validation rules
2. **Reduced Duplication** - Define once, reference everywhere
3. **Better Documentation** - Standardized descriptions and constraints
4. **Type Safety** - Integer types for page/pageSize instead of strings
5. **Validation** - Built-in min/max constraints for page size
6. **Maintainability** - Update in one place, affects all references

## Notes

- The existing legacy parameters (`page`, `pagesize`, `order`, `search`, `filter`) are still available for backward compatibility
- The new standardized parameters have more specific types and validation rules
- The `paginationMetadata` schema uses `x-go-type-skip-optional-pointer: true` to ensure proper Go code generation
