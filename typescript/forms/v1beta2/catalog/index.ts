/**
 * Canonical RJSF form schemas for v1beta2 Catalog.
 *
 * Source-of-truth lives in the JSON files in this directory; this
 * module just types and re-exports them under the canonical
 * `<Construct><Action>RjsfSchemaV<Version>` naming convention.
 *
 * Validation: `validation/forms_test.go` asserts that each form
 * schema's field set, types, enums, and required list are a subset
 * of the canonical OpenAPI catalog construct
 * (`schemas/constructs/v1beta2/catalog/catalog.yaml`).
 */

import type { RJSFSchema, UiSchema } from "../../types";
import publishSchema from "./publish.json";
import publishUiSchema from "./publish.ui.json";

export const CatalogPublishRjsfSchemaV1Beta2 = publishSchema as RJSFSchema;
export const CatalogPublishRjsfUiSchemaV1Beta2 = publishUiSchema as UiSchema;
