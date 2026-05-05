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

/**
 * RJSFSchema mirrors a JSON Schema node well enough that consumers
 * can navigate the structure (`.properties.foo.enum`,
 * `.items.type`, …) with type-safety. It is recursive because the
 * RJSF / JSON Schema model is recursive — `properties` values are
 * themselves schemas, `items` is a schema, and `oneOf` / `allOf` /
 * `anyOf` are arrays of schemas.
 *
 * It deliberately stays narrower than `@rjsf/utils`'s full type — it
 * captures the fields we actually surface in canonical form schemas
 * — and falls back to `unknown` for unrecognized keys so it doesn't
 * pretend to enumerate every JSON-Schema vocabulary keyword.
 */
export type RJSFSchema = {
  type?: string;
  title?: string;
  description?: string;
  format?: string;
  default?: unknown;
  properties?: Record<string, RJSFSchema>;
  required?: string[];
  items?: RJSFSchema;
  enum?: unknown[];
  oneOf?: RJSFSchema[];
  allOf?: RJSFSchema[];
  anyOf?: RJSFSchema[];
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
  // RJSF + Meshery extensions. `x-rjsf-grid-area` is accepted as
  // either number or string in existing form schemas (Sistent ships
  // both conventions); we accept both to avoid mass-rewriting at
  // migration time.
  "x-rjsf-grid-area"?: number | string;
  "x-encode-in-uri"?: boolean;
  // Escape hatch for unrecognized JSON-Schema keywords.
  [key: string]: unknown;
};

export type UiSchema = {
  "ui:order"?: string[];
  [key: string]: unknown;
};
