// Package validation provides build-time schema design auditing and runtime
// document validation for the meshery/schemas repository.
//
// This is a dependency-leaf package: it imports kin-openapi, yaml.v3, and the
// standard library only. It must NOT import github.com/meshery/meshkit or
// github.com/meshery/schemas/models. This constraint is architectural — it
// allows meshkit/schema and model helper methods to import this package
// without creating cycles.
//
// Two concerns live here:
//
//   - Schema Auditing: validates that OpenAPI schema files follow project
//     conventions (naming, dual-schema pattern, codegen annotations, etc.).
//     Invoked at build time via cmd/validate-schemas.
//
//   - Document Validation: validates JSON documents against OpenAPI schemas
//     at runtime using kin-openapi. Used by Meshery server and CLI.
package validation
