/**
 * Canonical RJSF form schemas for v1beta3 Workspace.
 *
 * Source-of-truth lives in the JSON files in this directory; this
 * module just types and re-exports them under the canonical
 * `<Construct><Action>RjsfSchemaV<Version>` naming convention.
 *
 * Validation: `validation/forms_test.go` asserts that each form
 * schema's field set, types, enums, and required list are a subset
 * of the canonical OpenAPI workspace construct
 * (`schemas/constructs/v1beta3/workspace/workspace.yaml`).
 */

import type { RJSFSchema, UiSchema } from "../../types";
import createOrEditSchema from "./createOrEdit.json";
import createOrEditUiSchema from "./createOrEdit.ui.json";

export const WorkspaceCreateOrEditRjsfSchemaV1Beta3 =
  createOrEditSchema as RJSFSchema;
export const WorkspaceCreateOrEditRjsfUiSchemaV1Beta3 =
  createOrEditUiSchema as UiSchema;
