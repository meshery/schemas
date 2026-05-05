/**
 * Top-level barrel for canonical RJSF form schemas.
 *
 * Form schemas live under `typescript/forms/<version>/<construct>/`
 * and are validated against the corresponding canonical OpenAPI
 * construct by `validation/forms_test.go`. See
 * `docs/form-schemas-roadmap.md` for the migration plan and
 * `AGENTS.md` § Form Schemas for authoring conventions.
 */

export {
  CatalogPublishRjsfSchemaV1Beta2,
  CatalogPublishRjsfUiSchemaV1Beta2
} from "./v1beta2/catalog";
