# <a name="contributing">Contributing to Meshery Schemas</a>

## Overview

**Meshery follows schema-driven development.** As a project, Meshery has different types of schemas. Some schemas are external facing, and some internal to Meshery itself. This repository serves as a central location for storing schemas from which all Meshery components can take reference.

The schemas follow a versioned approach to maintain backward compatibility while allowing for evolution of the definitions.

> To better understand how schemas fit into Meshery's architecture, read about Meshery's core concepts in the [Meshery documentation](https://docs.meshery.io/concepts/logical).

## Prerequisites

1. **oapi-codegen**: This tool is essential for generating Go code from OpenAPI specifications. Install it using:

```bash
go install github.com/oapi-codegen/oapi-codegen/v2/cmd/oapi-codegen@latest
```

2. **Node.js & npm**: Required for TypeScript generation and build process.

3. **make**: The repository uses Makefiles to automate various tasks. Ensure you have make installed on your system.

## Quick Start

```bash
# Install dependencies
make setup
npm install

# Generate all code (Go, TypeScript, RTK Query)
make build

# Build TypeScript distribution
npm run build
```

## Schema Directory Structure

All schemas are located in the `schemas/constructs/` directory:

```
schemas/
  constructs/
    <schema-version>/               # e.g., v1beta1
      <construct>/                  # e.g., model, component
        api.yml                     # Index file: references all subschemas + defines API endpoints
        <construct>.yaml            # Subschema: data model definition for the construct
        <other_subschema>.yaml      # Additional subschemas (optional)
        templates/                  # Manually defined templates directory
          <construct>_template.json # JSON template from schema
          <construct>_template.yaml # YAML template from schema
  
  typescript/                       # TypeScript source and generated files
    index.ts                        # Manually maintained - public API surface
    generated/                      # Auto-generated (do NOT commit)
      <schema-version>/<construct>/
        <Construct>.d.ts            # TypeScript type definitions
        <Construct>Schema.ts        # OpenAPI schema as JS object
    rtk/                            # RTK Query client configurations
  
  dist/                             # Built distribution (do NOT commit)
    index.js, index.d.ts
    cloudApi.js, mesheryApi.js
    constructs/<schema-version>/<construct>/<Construct>Schema.js
  
  models/                           # Auto-generated Go code (do NOT commit)
    <schema-version>/<construct>/<construct>.go
```

### Understanding `api.yml`

Each construct has an `api.yml` file that serves as the **index file** for that construct:

1. **References all subschemas**: Uses `$ref` to include schemas defined in other YAML/JSON files within the same directory
2. **Defines API endpoints**: Contains all REST API operations (paths) for the construct (e.g., GET, POST, PUT, DELETE)
3. **Aggregates components**: Lists all schema components under `components/schemas` for code generation

Example structure:
```
constructs/v1beta1/model/
├── api.yml              # Index file: refs subschemas + defines /api/models endpoints
├── model.yaml           # Subschema: ModelDefinition properties
├── model_core.yml       # Subschema: Core model types
└── templates/
    └── model_template.json
```

### Schema File Roles

| File | Purpose |
|------|---------|
| `api.yml` | **Index file** - aggregates all subschemas via `$ref` and defines API endpoints for the construct |
| `<construct>.yaml` | **Subschema** - defines the main data model (noun) for the construct |
| `<construct>_core.yml` | **Subschema** - defines core/shared types used by the main schema |
| `templates/*.json` | **Templates** - example instances with default values |

## Naming Conventions

### Property Names
- Use camelCase for property fields: `schemaVersion`, `displayName`, `componentsCount`
- Identifier fields use lowerCamelCase with "Id" suffix: `modelId`, `registrantId`, `categoryId`
- Enums use lowercase words: `enabled`, `ignored`, `duplicate`

### OpenAPI Schema Names
- PascalCase nouns under `components/schemas`: `Model`, `Component`, `Design`
- Files/folders are lowercase: `api.yml` (index), `<construct>.yaml` (subschemas), `templates/<construct>_template.(json|yaml)`

### Endpoints and Operations
- Paths are under `/api` with kebab-case, plural nouns: `/api/workspaces`, `/api/environments`
- Path params are camelCase: `{subscriptionId}`, `{connectionId}`
- Non-CRUD actions append a verb segment: `.../register`, `.../export`, `.../cancel`
- `operationId` is camelCase VerbNoun: `getModels`, `createDesign`, `registerMeshmodels`

### Versioning
- `schemaVersion` uses group/version: `models.meshery.io/v1beta1`, `components.meshery.io/v1beta1`
- Version strings follow k8s-style: `v1`, `v1alpha1`, `v1beta1`
- Semver fields use standard SemVer: `1.0.0`, `2.3.1`

## Code Generation

The build system automatically discovers schemas from `constructs/<version>/<package>/api.yml` files.

### What Gets Generated

| Output | Location |
|--------|----------|
| Go structs | `models/<version>/<package>/<package>.go` |
| TypeScript types | `typescript/generated/<version>/<package>/<Package>.d.ts` |
| TypeScript schemas | `typescript/generated/<version>/<package>/<Package>Schema.ts` |
| RTK Query clients | `typescript/rtk/cloudApi.ts`, `mesheryApi.ts` |
| Bundled OpenAPI | `_openapi_build/merged_openapi.yml` |

### Bundled Schema Outputs

After running `make build`, three bundled schema files are created:

| File | Purpose |
|------|---------|
| `merged_openapi.yml` | All schemas combined (used by Meshery clients) |
| `cloud_openapi.yml` | Cloud-specific APIs for Remote Providers (e.g. Meshery Cloud) |
| `meshery_openapi.yml` | Meshery-specific APIs |

### Annotating OpenAPI Paths

To control which schema paths are included in each bundled output, use the `x-internal` annotation:

```yaml
paths:
  /api/entitlement/plans:
    get:
      x-internal: ["cloud"]
      operationId: getPlans
      summary: Get all plans supported by the system
```

- **With `x-internal`**: Included only in the respective client (e.g., `cloud`).
- **Without `x-internal`**: Included in **all** clients.

### Build Commands

| Task | Command |
|------|---------|
| Generate everything | `make build` |
| Build TypeScript dist | `npm run build` |
| Generate Go code only | `make golang-generate` |
| Generate TS types + schemas | `make generate-ts` |
| Lint OpenAPI | `npx @redocly/cli lint` |

## Adding a New Schema

1. Create directory: `schemas/constructs/<version>/<package>/`
2. Add `api.yml` - the index file that references all subschemas and defines API endpoints
3. Optionally add additional `*.yaml` or `*.json` files for subschemas
4. Run `make build` - it will be automatically discovered

**To regenerate after schema changes:**

```bash
# Full build (Go + TypeScript + RTK)
make build

# Build TypeScript distribution
npm run build
```

## TypeScript Integration

### Using Generated Types

Types are organized by version in namespaces:

```typescript
import { v1beta1 } from "@meshery/schemas";

const model: v1beta1.Model = { /* ... */ };
const component: v1beta1.Component = { /* ... */ };
const design: v1beta1.Design = { /* ... */ };
```

### Using Schema Exports

Each construct's OpenAPI schema is exported as a const JavaScript object:

```typescript
// Import from main index
import { ModelDefinitionV1Beta1OpenApiSchema } from "@meshery/schemas";

// Or import individual schemas directly
import ModelSchema from "@meshery/schemas/dist/constructs/v1beta1/model/ModelSchema";
```

### TypeScript Index File

The `typescript/index.ts` file is **manually maintained** and defines the public API surface. When adding new constructs:

1. Import the components from the generated `.d.ts` file
2. Import the schema from the generated `*Schema.ts` file
3. Add type exports to the appropriate namespace

Example:
```typescript
// Type imports (no .d.ts extension)
import { components as ModelComponents } from "./generated/v1beta1/model/Model";

// Schema imports
import ModelDefinitionV1Beta1OpenApiSchema from "./generated/v1beta1/model/ModelSchema";

// Export in namespace
export namespace v1beta1 {
  export type Model = ModelComponents["schemas"]["ModelDefinition"];
}
```

## Using RTK Query Clients

### Prerequisites

Before using the generated RTK clients, ensure you have:

1. Installed dependencies: `@reduxjs/toolkit`, `@meshery/schemas`
2. Set up environment variables:
   - `RTK_CLOUD_ENDPOINT_PREFIX`: Base URL for Cloud API endpoints
   - `RTK_MESHERY_ENDPOINT_PREFIX`: Base URL for Meshery API endpoints

### Import API Slices

To avoid cyclical imports, import API slices from their specific exports:

```javascript
// ✅ Correct: Import from specific API exports
import { cloudApi as cloudBaseApi } from "@meshery/schemas/dist/cloudApi";
import { mesheryApi } from "@meshery/schemas/dist/mesheryApi";

// ❌ Incorrect: Do not import directly from generic API file
// import { api } from "@meshery/schemas/dist/api"; // Can cause cyclical imports
```

### Configure Redux Store

```javascript
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { cloudApi as cloudBaseApi } from "@meshery/schemas/dist/cloudApi";

const rootReducer = combineReducers({
  // your reducers...
  [cloudBaseApi.reducerPath]: cloudBaseApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(cloudBaseApi.middleware)
});

setupListeners(store.dispatch);
```

### Using API Hooks

```javascript
import { useGetPlansQuery, useCreateDesignMutation } from "@meshery/schemas/dist/cloudApi";

function MyComponent() {
  const { data: plans, isLoading, error } = useGetPlansQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading plans</div>;

  return (
    <div>
      {plans?.map(plan => <div key={plan.id}>{plan.name}</div>)}
    </div>
  );
}
```

### RTK Query Best Practices

```javascript
// Handle loading states
const { data, isLoading, isFetching, error } = useGetDataQuery();

// Leverage cache options
const { data } = useGetDataQuery(null, {
  pollingInterval: 30000,
  refetchOnMountOrArgChange: true,
  skip: !isReady
});
```

## What NOT to Commit

**CRITICAL**: Do not commit generated files:

- `models/` - Generated Go code
- `typescript/generated/` - Generated TypeScript
- `dist/` - Built distribution
- `_openapi_build/` - Bundled OpenAPI specs

Only commit:
- Schema files:
  - `constructs/<version>/<package>/api.yml` - The index file for each construct (required)
  - `constructs/<version>/<package>/*.yaml` or `*.json` - Subschema files (optional)
- Template files (`constructs/<version>/<package>/templates/`)
- The manually maintained `typescript/index.ts`

## Preserving Field Order with x-order Tag

Use the `x-order` tag in schema properties to ensure fields appear in a specific order in generated code:

```json
{
  "properties": {
    "id": {
      "type": "string",
      "x-order": 1
    },
    "name": {
      "type": "string",
      "x-order": 2
    }
  }
}
```

## Contributing to Documentation

### Schema Documentation

- Add detailed descriptions in schema fields
- Include example values where helpful
- Document validation rules and constraints

```json
{
  "displayName": {
    "type": "string",
    "description": "Human-readable name for the component.",
    "minLength": 1,
    "maxLength": 100,
    "examples": ["nginx-deployment"]
  }
}
```

## Testing Your Changes

Before submitting a PR, verify your changes:

```bash
make build              # Run full build, which includes tests
npx @redocly/cli lint schemas/constructs/v1beta1/model/api.yml  # Lint a specific OpenAPI file
```



## Getting Help

- [GitHub Issues](https://github.com/meshery/schemas/issues) - Report bugs or request features
- [Community Slack](https://slack.meshery.io) - Real-time discussions with maintainers
- [Weekly Meetings](https://meshery.io/community/calendar) - Join our community calls

---
> **Community Resources**  
> For more contribution guidelines, see the [Meshery Contributing Guide](https://github.com/meshery/meshery/blob/master/CONTRIBUTING.md).
