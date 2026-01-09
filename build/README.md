# Building Meshery Schemas

This directory contains build scripts and configuration files for generating code from Meshery schemas. The build system generates Go structs, TypeScript types, and RTK Query API clients from OpenAPI and JSON Schema definitions.

All build scripts are written in JavaScript (Node.js) for consistency, cross-platform compatibility, and easier code sharing.

## Quick Start

```bash
# From the repository root
make setup    # Install dependencies
make build    # Generate all code (Go, TypeScript, RTK Query clients)
```

Or using npm scripts:

```bash
npm install
npm run build:all
```

## Build Pipeline

The build process is organized into three main stages:

```
┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│  bundle-openapi.js  │────▶│  generate-golang.js │     │   generate-rtk.js   │
│                     │     │                     │     │                     │
│  Bundles & merges   │     │  Generates Go       │     │  Generates RTK      │
│  OpenAPI specs      │     │  structs            │     │  Query clients      │
└─────────────────────┘     └─────────────────────┘     └─────────────────────┘
         │                           │                            │
         │                           ▼                            │
         │                  ┌─────────────────────┐               │
         │                  │ generate-typescript │               │
         │                  │                     │               │
         │                  │ Generates TS types  │               │
         │                  │ & schema exports    │               │
         │                  └─────────────────────┘               │
         │                           │                            │
         ▼                           ▼                            │
┌─────────────────────────────────────────────────────────────────┘
│  _openapi_build/
│  ├── constructs/<version>/<package>/merged-openapi.json
│  ├── merged_openapi.yml
│  ├── cloud_openapi.yml
│  └── meshery_openapi.yml
│
│  typescript/generated/
│  ├── <version>/<package>/<Package>.d.ts      (type definitions)
│  └── <version>/<package>/<Package>Schema.ts  (schema as JS object)
│
│  dist/  (after npm run build / tsup)
│  ├── index.js, index.d.ts
│  ├── cloudApi.js, mesheryApi.js
│  └── generated/<version>/<package>/<Package>Schema.js
└──────────────────────────────────────────────────────────────────
```

## Build Scripts Overview

| Script | Purpose | Depends On |
|--------|---------|------------|
| `bundle-openapi.js` | Bundles and merges OpenAPI specs | - |
| `generate-golang.js` | Generates Go structs from OpenAPI | `bundle-openapi.js` |
| `generate-rtk.js` | Generates RTK Query clients | `bundle-openapi.js` |
| `generate-typescript.js` | Generates TypeScript types and schema exports | `bundle-openapi.js` |
| `index.js` | CLI entry point for running build scripts | - |

## TypeScript Build with tsup

After generating TypeScript files, the project uses `tsup` to build the final distribution:

```bash
npm run build  # Runs tsup to build dist/
```

The `tsup.config.ts` automatically discovers all `*Schema.ts` files under `typescript/generated/`
and creates individual entry points for each, allowing consumers to import schemas directly:

```typescript
// Import from main index
import { v1beta1, ModelDefinitionV1Beta1OpenApiSchema } from "@meshery/schemas";

// Or import individual schemas directly
import ModelSchema from "@meshery/schemas/dist/constructs/v1beta1/model/ModelSchema";
```

### Supporting Scripts

| Script | Purpose |
|--------|---------|
| `convert-openapi-yml-to-json.js` | Converts OpenAPI YAML to TypeScript JSON |
| `filterOpenapiByTag.js` | Filters OpenAPI specs by x-internal tag |
| `latest_release.sh` | Gets git version/release info (shell) |

## Shared Libraries

All build scripts share common utilities located in `build/lib/`:

| Library | Purpose |
|---------|---------|
| `logger.js` | Colored console output and logging |
| `config.js` | Dynamic schema discovery and path configuration |
| `exec.js` | Command execution utilities |
| `paths.js` | Path resolution and file operations |

## Dynamic Schema Discovery

Schemas are discovered automatically by walking the `schemas/constructs/` directory and looking for subdirectories containing an `openapi.yml` file. This eliminates the need to manually maintain a list of packages.

**How it works:**
1. Scans `schemas/constructs/<version>/<package>/` directories
2. Includes any directory containing an `openapi.yml` file
3. Uses directory name as package name (with configurable overrides)
4. Filters out excluded packages from merge operations

**Configuration in `lib/config.js`:**

```javascript
// Package name overrides (directory name → Go package name)
const packageNameOverrides = {
  "v1beta1/design": "pattern",  // design/ folder generates "pattern" package
};

// Packages to skip entirely
const excludePackages = [
  // "v1beta2-draft/somepkg"
];

// Packages to exclude from merged OpenAPI spec (but still generate Go code)
const excludeFromMerge = [
  "v1alpha1/core",
  "v1alpha1/capability",
];
```

**Adding a new schema:**
1. Create a new directory: `schemas/constructs/<version>/<package>/`
2. Add an `openapi.yml` file
3. Run `make build` - it will be automatically discovered!

## Script Details

### bundle-openapi.js

**OpenAPI Schema Bundling and Merging Script**

Prepares the `_openapi_build/` directory that other scripts depend on.

**What it does:**
1. Bundles individual OpenAPI YAML schemas into dereferenced JSON files
2. Merges all construct OpenAPI specs into a unified `merged_openapi.yml`
3. Filters merged specs by `x-internal` tag to create `cloud_openapi.yml` and `meshery_openapi.yml`

**Usage:**
```bash
node build/bundle-openapi.js
# or
npm run build:bundle
# or
make bundle-openapi
```

**Output:**
- `_openapi_build/constructs/<version>/<package>/merged-openapi.json`
- `_openapi_build/merged_openapi.yml`
- `_openapi_build/cloud_openapi.yml`
- `_openapi_build/meshery_openapi.yml`

---

### generate-golang.js

**Go Code Generation Script**

Generates Go structs from the bundled OpenAPI specifications.

**What it does:**
1. Reads bundled OpenAPI JSON files from `_openapi_build/constructs/`
2. Generates Go structs with JSON and YAML struct tags using `oapi-codegen`
3. Outputs Go files to `models/<version>/<package>/`

**Usage:**
```bash
node build/generate-golang.js
# or
npm run build:golang
# or
make generate-golang  # Auto-runs bundle-openapi first
```

**Output:**
- `models/<version>/<package>/<package>.go`

**Prerequisites:**
- Requires `_openapi_build/` directory (run `bundle-openapi.js` first)
- Requires `oapi-codegen` Go tool

---

### generate-rtk.js

**RTK Query Client Generation Script**

Generates RTK Query API clients for TypeScript/React applications.

**What it does:**
1. Reads RTK Query configuration files from `typescript/rtk/`
2. Generates type-safe API hooks from filtered OpenAPI specs
3. Outputs TypeScript files for both cloud and meshery APIs

**Usage:**
```bash
node build/generate-rtk.js
# or
npm run build:rtk
# or
make generate-rtk  # Auto-runs bundle-openapi first
```

**Configuration:**
- `typescript/rtk/cloud-rtk-config.ts`
- `typescript/rtk/meshery-rtk-config.ts`

**Output:**
- `typescript/rtk/cloudApi.ts`
- `typescript/rtk/mesheryApi.ts`

**Prerequisites:**
- Requires `_openapi_build/` directory (run `bundle-openapi.js` first)

---

### generate-typescript.js

**TypeScript Type Definition Generator**

Generates TypeScript type definitions and schema exports from bundled OpenAPI specifications.
This script uses `openapi-typescript` to generate `.d.ts` files and creates `*Schema.ts` files
that export the OpenAPI schema as a const JavaScript object for runtime use.

Schemas are discovered dynamically by walking the `_openapi_build/constructs/` directory
and looking for `merged-openapi.json` files.

**Usage:**
```bash
node build/generate-typescript.js
# or
npm run generate:types
# or
make generate-ts
```

**Prerequisites:**
- Requires `_openapi_build/` directory (run `bundle-openapi.js` first)

**Output:**
- `typescript/generated/<version>/<package>/<Package>.d.ts` - TypeScript type definitions
- `typescript/generated/<version>/<package>/<Package>Schema.ts` - OpenAPI schema as const JS object

**Schema Export Format:**

Each `*Schema.ts` file exports the schema as a const object:

```typescript
/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const ModelSchema = {
  "openapi": "3.0.0",
  // ... schema content
} as const;

export default ModelSchema;
```

---

### index.js

**CLI Entry Point**

Unified CLI for running build scripts with dependency resolution.

**Usage:**
```bash
node build/index.js <command>
```

**Commands:**
- `bundle` - Bundle and merge OpenAPI specifications
- `golang` - Generate Go structs (auto-runs bundle)
- `rtk` - Generate RTK Query clients (auto-runs bundle)
- `types` - Generate TypeScript type definitions
- `all` - Run full build pipeline
- `help` - Show help message

**Examples:**
```bash
node build/index.js bundle
node build/index.js golang
node build/index.js all
npm run build:all
```

---

## Configuration Files

### lib/config.js

Central configuration for all schema packages. Edit this file to:
- Add or remove schema packages
- Change package versions
- Modify build paths

### openapi.config.yml

Primary oapi-codegen configuration for Go code generation.

### oapi-codegen-config.yml

⚠️ **Legacy/Example** - Not used by automated builds. Kept for reference.

---

## Dependencies

### Node.js Packages

Install via `npm install`:
- `@apidevtools/json-schema-ref-parser` - $ref resolution
- `@openapi-contrib/openapi-schema-to-json-schema` - OpenAPI to JSON Schema
- `js-yaml` - YAML parsing
- `lodash.merge` - Deep object merging

### CLI Tools (via npx)

- `swagger-cli` - OpenAPI bundling
- `@redocly/cli` - OpenAPI joining and linting
- `@rtk-query/codegen-openapi` - RTK Query client generation
- `json2ts` - JSON Schema to TypeScript
- `openapi-typescript` - OpenAPI to TypeScript

### Go Tools

```bash
go install github.com/oapi-codegen/oapi-codegen/v2/cmd/oapi-codegen@latest
```

---

## Make Targets

| Target | Description |
|--------|-------------|
| `make build` | Run full build pipeline |
| `make bundle-openapi` | Bundle and merge OpenAPI specs |
| `make generate-golang` | Generate Go code (auto-runs bundle) |
| `make generate-rtk` | Generate RTK Query clients (auto-runs bundle) |
| `make generate-ts` | Generate TypeScript types and schema exports |
| `make setup` | Install all dependencies |

## NPM Scripts

| Script | Description |
|--------|-------------|
| `npm run build:all` | Run full build pipeline |
| `npm run build:bundle` | Bundle OpenAPI specs |
| `npm run build:golang` | Generate Go code |
| `npm run build:rtk` | Generate RTK Query clients |
| `npm run generate:types` | Generate TypeScript types |
| `npm run build` | Build TypeScript with tsup (generates dist/) |

---

## Troubleshooting

### oapi-codegen not found
```bash
go install github.com/oapi-codegen/oapi-codegen/v2/cmd/oapi-codegen@latest
export PATH="${GOPATH:-$HOME/go}/bin:$PATH"
```

### Node dependencies missing
```bash
npm install
# or
make setup
```

### _openapi_build directory missing
```bash
node build/bundle-openapi.js
# or
make bundle-openapi
```

### Schema reference errors
Ensure all `$ref` paths are correct and referenced schemas exist.

---

## Adding a New Schema Package

Schemas are discovered automatically! Just:

1. Create a new directory:
   ```bash
   mkdir -p schemas/constructs/v1beta1/mypackage
   ```

2. Add an `openapi.yml` file with your schema definitions:
   ```bash
   touch schemas/constructs/v1beta1/mypackage/openapi.yml
   ```

3. Run the build - it will be automatically discovered:
   ```bash
   make build
   npm run build  # Build TypeScript distribution
   ```

**Optional configurations in `build/lib/config.js`:**

- **Override package name:** If the Go package name should differ from the directory name:
  ```javascript
  const packageNameOverrides = {
    "v1beta1/mypackage": "differentname",
  };
  ```

- **Exclude from processing:** To skip a package entirely:
  ```javascript
  const excludePackages = [
    "v1beta1/mypackage",
  ];
  ```

- **Exclude from merge:** To generate Go code but not include in merged OpenAPI:
  ```javascript
  const excludeFromMerge = [
    "v1beta1/mypackage",
  ];
  ```
