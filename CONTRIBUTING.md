# <a name="contributing">Contributing to Meshery Schemas</a>

## Overview

Meshery follows schema-driven development. As a project, Meshery has different types of schemas. Some schemas are external facing, and some internal to Meshery itself. This repository serves as a central location for storing schemas from which all Meshery components can take reference.

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

## Development Workflow

### Generated Output Structure

After running the build process, the following files are generated:

```
schemas/
├── models/                          # Generated Go code
│   └── <version>/<package>/<package>.go
├── typescript/
│   ├── index.ts                     # Manually maintained public API
│   └── generated/                   # Generated TypeScript (do NOT commit)
│       └── <version>/<package>/
│           ├── <Package>.d.ts       # Type definitions
│           └── <Package>Schema.ts   # Schema as JS object
├── dist/                            # Built distribution (do NOT commit)
│   ├── index.js, index.d.ts
│   ├── cloudApi.js, mesheryApi.js
│   └── generated/<version>/<package>/<Package>Schema.js
└── _openapi_build/                  # Bundled OpenAPI specs
    ├── merged_openapi.yml
    ├── cloud_openapi.yml
    └── meshery_openapi.yml
```

### Code Generation Process

The build system automatically discovers schemas from `constructs/<version>/<package>/api.yml` files.

**To add a new schema:**

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

### Preserving Field Order with x-order Tag

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

## Contributing to Documentation

1. **Schema Documentation**

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
# Run full build
make build

# Build TypeScript distribution
npm run build

# Run Go tests
go test ./...

# Lint OpenAPI specs
npx @redocly/cli lint schemas/constructs/v1beta1/model/api.yml
```

### Schema File Roles

| File | Purpose |
|------|---------|
| `api.yml` | **Index file** - aggregates all subschemas via `$ref` and defines API endpoints for the construct |
| `<construct>.yaml` | **Subschema** - defines the main data model (noun) for the construct |
| `<construct>_core.yml` | **Subschema** - defines core/shared types used by the main schema |
| `templates/*.json` | **Templates** - example instances with default values |

## Getting Help

- [GitHub Issues](https://github.com/meshery/schemas/issues) - Report bugs or request features
- [Community Slack](https://slack.meshery.io) - Real-time discussions with maintainers
- [Weekly Meetings](https://meshery.io/community/calendar) - Join our community calls

---
> **Community Resources**  
> For more contribution guidelines, see the [Meshery Contributing Guide](https://github.com/meshery/meshery/blob/master/CONTRIBUTING.md).
