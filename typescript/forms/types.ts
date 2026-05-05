/**
 * Minimal structural types for the form-schema artifacts. Defined
 * locally rather than imported from `@rjsf/utils` because:
 *   - `@meshery/schemas` should not pull a runtime UI dependency
 *     into consumers that just want the JSON shape.
 *   - The full RJSF type surface is overkill — consumers either
 *     pass the JSON straight to RJSF (which accepts JSON Schema
 *     directly) or read individual fields.
 *
 * Consumers wanting the strict `@rjsf/utils` type can cast at the
 * call site:
 *   `MyForm schema={CatalogPublishRjsfSchemaV1Beta2 as RJSFSchema}`
 * with their own `RJSFSchema` import from `@rjsf/utils`.
 */

export type RJSFSchema = {
  type?: string;
  title?: string;
  description?: string;
  properties?: Record<string, unknown>;
  required?: string[];
  [key: string]: unknown;
};

export type UiSchema = {
  "ui:order"?: string[];
  [key: string]: unknown;
};
