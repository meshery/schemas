# Building Meshery Schemas

This directory contains build scripts and configuration files for generating code from Meshery schemas. The build system generates Go structs, TypeScript types, and RTK Query API clients from OpenAPI and JSON Schema definitions.

## Quick Start

```bash
# From the repository root
make setup    # Install dependencies
make build    # Generate all code (Go, TypeScript, RTK Query clients)
```

## Build Scripts Overview

| Script | Purpose | Used By |
|--------|---------|---------|
| `generate-golang.sh` | Main Go code generation and OpenAPI bundling | `make build`, `make golang-generate` |
| `compile-types.sh` | TypeScript type definition generation | `make generate-ts` |
| `compile-json-schema.mjs` | JSON template generation from schemas | `npm run generate:json` |
| `convert-openapi-yml-to-json.js` | OpenAPI YAML to TypeScript JSON export | `compile-types.sh` |
| `filterOpenapiByTag.js` | Filter OpenAPI specs by x-internal tag | `generate-golang.sh` |
| `latest_release.sh` | Git version/release information | CI/CD pipelines |

## Script Details

### generate-golang.sh

**Main Go Code Generation Script**

This is the primary build script that orchestrates the entire code generation pipeline.

**What it does:**
1. Bundles individual OpenAPI YAML schemas into merged JSON files using `swagger-cli`
2. Generates Go structs with JSON and YAML struct tags using `oapi-codegen`
3. Merges all construct OpenAPI specs into a unified API specification
4. Filters merged specs by `x-internal` tag to create `cloud_openapi.yml` and `meshery_openapi.yml`
5. Generates RTK Query clients for both cloud and meshery APIs

**Usage:**
```bash
./build/generate-golang.sh
```

**Output:**
- `models/<version>/<package>/<package>.go` - Generated Go structs
- `_openapi_build/merged_openapi.yml` - Combined OpenAPI specification
- `_openapi_build/cloud_openapi.yml` - Cloud-specific API spec
- `_openapi_build/meshery_openapi.yml` - Meshery-specific API spec
- `typescript/rtk/*.ts` - RTK Query API clients

**Dependencies:**
- Node.js with npx
- `swagger-cli`, `@redocly/cli`, `@rtk-query/codegen-openapi`
- Go with `oapi-codegen` installed

---

### compile-types.sh

**TypeScript Type Definition Generator**

Generates TypeScript type definitions (`.d.ts` files) from JSON schema files.

**What it does:**
1. Traverses the input directory for JSON schema files
2. Generates TypeScript type definitions using `json2ts`
3. Converts OpenAPI YAML files to TypeScript JSON exports
4. Skips template files (`*_template.json`, `*_template.yaml`)

**Usage:**
```bash
./build/compile-types.sh <input_directory> <output_directory> <templates_output_directory>

# Example:
./build/compile-types.sh schemas/constructs typescript/constructs typescript/templates
```

**Output:**
- `<output_directory>/**/*.d.ts` - TypeScript type definitions
- `<output_directory>/**/openapi.d.ts` - OpenAPI TypeScript definitions
- `<output_directory>/**/*OpenApiSchema.ts` - OpenAPI JSON schema exports

**Note:** Template generation (Step 2) is disabled. Templates are now manually maintained in `templates/` subdirectories.

---

### compile-json-schema.mjs

**JSON Schema Template Generator**

Generates JSON template files from JSON schema definitions by resolving all `$ref` references and populating default values.

**What it does:**
1. Loads a JSON schema file
2. Resolves all `$ref` references (internal and external)
3. Generates default values using `json-schema-default`
4. Fills empty strings using `json-schema-empty-strings`
5. Merges the results into a final template file

**Usage:**
```bash
node build/compile-json-schema.mjs <input_schema.json> <output_template.json>

# Example:
node build/compile-json-schema.mjs schemas/constructs/v1beta1/model/model.json templates/model_template.json
```

**Note:** This script can be used for initial template generation. Templates are now manually maintained in `templates/` subdirectories.

---

### convert-openapi-yml-to-json.js

**OpenAPI YAML to TypeScript JSON Converter**

Converts OpenAPI YAML schema files to TypeScript files that export the schema as a JSON object.

**What it does:**
1. Reads an OpenAPI YAML file
2. Resolves all `$ref` references
3. Converts OpenAPI schema format to JSON Schema format
4. Generates a TypeScript file exporting the schema as a const

**Usage:**
```bash
node build/convert-openapi-yml-to-json.js <input_openapi.yml> [output_directory]

# Example:
node build/convert-openapi-yml-to-json.js schemas/constructs/v1beta1/model/openapi.yml typescript/constructs/v1beta1/model
```

**Output:** `<output_directory>/<PascalCaseName>OpenApiSchema.ts`

---

### filterOpenapiByTag.js

**OpenAPI Specification Filter by x-internal Tag**

Filters an OpenAPI specification to include only operations that match a specified `x-internal` tag. Used to create separate API specs for different consumers.

**What it does:**
1. Reads an OpenAPI YAML specification
2. Iterates through all paths and HTTP methods
3. Filters operations based on the `x-internal` field
4. Includes operations where `x-internal` is not set, or contains the specified tag

**Usage:**
```bash
node build/filterOpenapiByTag.js <input.yml> <output.yml> [tag]

# Examples:
node build/filterOpenapiByTag.js _openapi_build/merged_openapi.yml _openapi_build/cloud_openapi.yml cloud
node build/filterOpenapiByTag.js _openapi_build/merged_openapi.yml _openapi_build/meshery_openapi.yml meshery
```

**Arguments:**
- `input.yml` - Path to the input OpenAPI specification
- `output.yml` - Path to write the filtered specification
- `tag` - Tag to filter by (default: "meshery")

---

### latest_release.sh

**Git Release Version Information Script**

Retrieves version information from git tags for use in build and release processes.

**What it does:**
1. Determines if current git reference is a tag or branch
2. Sets release channel to "stable" for tags, "edge" for branches
3. Outputs latest version information in various formats

**Usage:**
```bash
./build/latest_release.sh

# Or source it to get environment variables:
source ./build/latest_release.sh
```

**Output:**
- `RELEASE_CHANNEL` - "stable" or "edge"
- `LATEST_VERSION` - Full git describe output (e.g., v0.7.0)
- `GIT_VERSION` - Same as LATEST_VERSION
- `GIT_STRIPPED_VERSION` - Version without 'v' prefix (e.g., 0.7.0)

---

## Configuration Files

### openapi.config.yml

**Primary oapi-codegen Configuration**

Used by `generate-golang.sh` for generating Go models from OpenAPI specifications.

**Configures:**
- Package name for generated Go code
- Import mappings for cross-schema references
- Generation options (models only, no client/server code)
- Output options like tag exclusions

---

### oapi-codegen-config.yml

**⚠️ Legacy/Example Configuration**

This is an example configuration file for manual `oapi-codegen` usage, documented in `CONTRIBUTING.md`. The automated build process uses `openapi.config.yml` instead.

**Known Issues:**
- Contains outdated paths (e.g., "v1alphav3" should be "v1alpha3")
- Import mappings may be out of sync with current schema structure

---

### Makefile.core.mk

**Core Build Configuration Variables**

Defines global variables used across all Makefile targets:
- Git version and commit information
- Go environment configuration (GOPATH, GOBIN, GOVERSION)
- Provider settings
- Release channel settings

**Usage:**
```makefile
include build/Makefile.core.mk
```

---

### Makefile.show-help.mk

**Auto-generated Help Target**

Provides a self-documenting help target that displays all available Makefile targets with their descriptions.

**Usage:**
```makefile
include build/Makefile.show-help.mk
```

Document targets with `##` comments:
```makefile
## Build the project
build:
    @echo "Building..."
```

---

## Dependencies

### Node.js Packages

Install via `npm install` or `make setup`:
- `@apidevtools/json-schema-ref-parser` - $ref resolution
- `@openapi-contrib/openapi-schema-to-json-schema` - OpenAPI to JSON Schema
- `js-yaml` - YAML parsing
- `lodash.merge` - Deep object merging
- `json-schema-default` - Default value extraction
- `json-schema-empty-strings` - Empty string generation

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

## Common Make Targets

| Target | Description |
|--------|-------------|
| `make build` | Generate everything (Go, TypeScript, RTK Query) |
| `make golang-generate` | Generate Go code only |
| `make generate-ts` | Generate TypeScript types |
| `make setup` | Install all dependencies |
| `make clean` | Clean generated files |

---

## Troubleshooting

### oapi-codegen not found
```bash
export PATH="${GOPATH:-$HOME/go}/bin:$PATH"
```

### Node dependencies missing
```bash
npm install
# or
make setup
```

### Schema reference errors
Ensure all `$ref` paths are correct and referenced schemas exist. Check for:
- Relative path correctness
- Schema file existence
- Proper JSON/YAML syntax