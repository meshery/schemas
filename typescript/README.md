# Meshery Schemas - TypeScript

**Overview**

This library provides TypeScript interfaces and JSON schemas corresponding to OpenAPI specifications. These are auto-generated, offering type safety and improved developer experience when working with Meshery API data.

**Key Features**

* **Type Safety:** TypeScript interfaces enforce type checks, preventing errors during development and improving code reliability.
* **Enhanced Developer Experience:** Auto-completion and code validation provided by TypeScript make working with API data more efficient.
* **Organized Namespace Structure:** Clear separation of types by schema version using namespaces avoids naming conflicts and promotes maintainability.
* **JSON Schema Exports:** Each construct exports its OpenAPI schema as a valid JavaScript object for runtime validation.

## Installation

```bash
npm install @meshery/schemas
```

## Directory Structure

After building, the generated TypeScript files are located in:

```
typescript/
├── index.ts                    # Main entry point with namespace exports
├── generated/                  # Auto-generated types and schemas (source)
│   ├── v1alpha1/
│   │   ├── capability/
│   │   │   ├── Capability.d.ts      # TypeScript type definitions
│   │   │   └── CapabilitySchema.ts  # JSON schema as JS object
│   │   └── core/
│   │       ├── Core.d.ts
│   │       └── CoreSchema.ts
│   ├── v1alpha2/
│   │   └── catalog/
│   │       ├── Catalog.d.ts
│   │       └── CatalogSchema.ts
│   └── v1beta1/
│       ├── component/
│       │   ├── Component.d.ts
│       │   └── ComponentSchema.ts
│       ├── model/
│       │   ├── Model.d.ts
│       │   └── ModelSchema.ts
│       ├── environment/
│       ├── workspace/
│       ├── connection/
│       ├── pattern/              # Contains Design schema
│       ├── category/
│       ├── subcategory/
│       ├── invitation/
│       ├── badge/
│       └── ...
└── rtk/                        # RTK Query clients
    ├── cloud.ts
    └── meshery.ts

dist/                           # Built output (after npm run build)
├── index.js, index.d.ts
├── cloudApi.js, mesheryApi.js
└── constructs/                 # Built schemas (renamed from 'generated')
    └── v1beta1/
        └── model/
            └── ModelSchema.js
```

## Usage

### Importing Types via Namespaces

The library organizes types by schema version within namespaces:

```typescript
import { v1beta1, v1alpha1 } from "@meshery/schemas";

// Use types from v1beta1 namespace
const component: v1beta1.Component = {
  id: "123",
  schemaVersion: "components.meshery.io/v1beta1",
  // ...
};

const model: v1beta1.Model = {
  id: "456",
  name: "kubernetes",
  // ...
};

// Use types from v1alpha1 namespace
const catalogData: v1alpha1.CatalogData = {
  publishedVersion: "1.0.0",
  // ...
};
```

### Available Namespaces and Types

```typescript
export namespace v1alpha1 {
  export type CatalogData;
  export type Capability;
}

export namespace v1alpha2 {
  export type CatalogData;
}

export namespace v1beta1 {
  export type Component;
  export type Model;
  export type Design;        // From pattern schema
  export type Connection;
  export type User;
  export type Category;
  export type Subcategory;
  export type Environment;
  export type Workspace;
  export type Invitation;
  export type Badge;
}
```

### Importing JSON Schemas

For runtime validation or schema introspection, import the schema objects:

```typescript
// Import from main index
import {
  ModelDefinitionV1Beta1OpenApiSchema,
  ComponentDefinitionV1Beta1OpenApiSchema,
  DesignDefinitionV1Beta1OpenApiSchema,
  CategoryDefinitionV1Beta1OpenApiSchema,
  EnvironmentDefinitionV1Beta1OpenApiSchema,
  WorkspaceDefinitionV1Beta1OpenApiSchema,
} from "@meshery/schemas";

// Or import individual schemas directly
import ModelSchema from "@meshery/schemas/dist/constructs/v1beta1/model/ModelSchema";
import ComponentSchema from "@meshery/schemas/dist/constructs/v1beta1/component/ComponentSchema";
import PatternSchema from "@meshery/schemas/dist/constructs/v1beta1/pattern/PatternSchema";
```

### Using with RTK Query

The library also exports RTK Query clients for API integration:

```typescript
import {
  useGetPlansQuery,
  useCreateDesignMutation,
} from "@meshery/schemas/dist/cloudApi";

import {
  useGetMeshModelsQuery,
} from "@meshery/schemas/dist/mesheryApi";

function MyComponent() {
  const { data: plans, isLoading } = useGetPlansQuery();
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <ul>
      {plans?.map(plan => (
        <li key={plan.id}>{plan.name}</li>
      ))}
    </ul>
  );
}
```

### Injectable Share Endpoints

The content-share endpoints (`shareView`, `shareDesign`,
`handleResourceShare`) are also published in an **injectable** shape, so
consumers that need to route these requests through a base URL other than
`RTK_CLOUD_ENDPOINT_PREFIX` — for example, an extension mount on the same
origin — can mount them on their own `createApi` slice instead of using
the `cloudApi` export:

```typescript
import type { EndpointBuilder } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  buildShareEndpoints,
  SHARE_ENDPOINT_TAG_TYPES,
  type ShareEndpointsBaseQuery,
} from "@meshery/schemas/shareEndpoints";

const extensionApi = createApi({
  reducerPath: "extensionApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/extensions", credentials: "include" }),
  tagTypes: [...SHARE_ENDPOINT_TAG_TYPES],
  endpoints: () => ({}),
});

export const sharingApi = extensionApi.injectEndpoints({
  // RTK's `EndpointBuilder<BaseQuery, …>` is invariant in `BaseQuery`, so
  // a `fetchBaseQuery`-derived builder cannot be assigned directly to the
  // wider `ShareEndpointsBaseQuery` parameter. One cast here bridges the
  // variance — the runtime object is structurally identical.
  endpoints: (build) =>
    buildShareEndpoints(
      build as unknown as EndpointBuilder<
        ShareEndpointsBaseQuery,
        (typeof SHARE_ENDPOINT_TAG_TYPES)[number],
        "extensionApi"
      >,
    ),
});

export const {
  useShareViewMutation,
  useShareDesignMutation,
  useHandleResourceShareMutation,
} = sharingApi;
```

The injected endpoints carry the same `ShareViewApiArg`, `ShareDesignApiArg`,
and `HandleResourceShareApiArg` shapes as their `cloudApi` counterparts —
these types are re-exported from `@meshery/schemas/shareEndpoints` for
convenience — so existing call sites keep compiling. The `cloudApi`
slice itself remains unchanged.

## Build Process

The TypeScript types and schemas are generated from OpenAPI specifications:

```bash
# Generate all code (from repository root)
make build

# Or just TypeScript generation
node build/generate-typescript.js
npm run build
```

### What Gets Generated

1. **Type Definitions (`*.d.ts`)**: TypeScript interfaces generated from OpenAPI schemas using `openapi-typescript`
2. **Schema Exports (`*Schema.ts`)**: OpenAPI schemas exported as const JavaScript objects for runtime use

## Schema Export Format

Each `*Schema.ts` file exports the OpenAPI schema as a const object:

```typescript
/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const ModelSchema = {
  "openapi": "3.0.0",
  "info": {
    "title": "model",
    "version": "1.0.0"
  },
  "components": {
    "schemas": {
      "ModelDefinition": {
        // ... schema definition
      }
    }
  }
} as const;

export default ModelSchema;
```

## Core Type Definitions

For shared/core types, import from the core module:

```typescript
import type * as core from "@meshery/schemas";

// Access core types
const { core } = await import("@meshery/schemas");
```

## Notes

- **Do not manually edit generated files** - They are overwritten during the build process
- Generated source files are located in `typescript/generated/`
- Built distribution files are located in `dist/constructs/` (renamed from `generated` for cleaner consumer imports)
- The `index.ts` file is manually maintained to provide the public API surface