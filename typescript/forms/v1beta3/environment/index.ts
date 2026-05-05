/**
 * Canonical RJSF form schemas for v1beta3 Environment.
 *
 * Source-of-truth lives in the JSON files in this directory; this
 * module just types and re-exports them under the canonical
 * `<Construct><Action>RjsfSchemaV<Version>` naming convention.
 *
 * Validation: `validation/forms_test.go` asserts that each form
 * schema's field set, types, enums, and required list are a subset
 * of the canonical OpenAPI environment construct
 * (`schemas/constructs/v1beta3/environment/environment.yaml`).
 */

import type { RJSFSchema, UiSchema } from "../../types";
import createOrEditSchema from "./createOrEdit.json";
import createOrEditUiSchema from "./createOrEdit.ui.json";

export const EnvironmentCreateOrEditRjsfSchemaV1Beta3 =
  createOrEditSchema as RJSFSchema;
export const EnvironmentCreateOrEditRjsfUiSchemaV1Beta3 =
  createOrEditUiSchema as UiSchema;
