/**
 * Top-level barrel for canonical RJSF form schemas.
 *
 * Form schemas are authored as JSON files under
 * `schemas/constructs/<version>/<construct>/forms/<action>.json` —
 * co-located with the canonical OpenAPI yaml and templates that
 * define the construct. This module imports those JSON files
 * directly and re-exports them under the canonical
 * `<Construct><Action>RjsfSchemaV<Version>` naming.
 *
 *   - `validation/forms_test.go` (`TestFormSchemasAreSubsetOfCanonical`)
 *     enforces each form is a strict subset of its canonical OpenAPI
 *     construct.
 *   - `validation/forms_test.go` (`TestFormSchemasIndexExportsExist`)
 *     enforces every JSON file under any `forms/` directory is
 *     exported from this module.
 *
 * See `docs/form-schemas-roadmap.md` for the migration plan and
 * `AGENTS.md` § Canonical RJSF form schemas for authoring conventions.
 */

import type { RJSFSchema, UiSchema } from "./types";

// v1beta2/catalog
import publishCatalogSchema from "../../schemas/constructs/v1beta2/catalog/forms/publish.json";
import publishCatalogUiSchema from "../../schemas/constructs/v1beta2/catalog/forms/publish.ui.json";

// v1beta3/environment
import createOrEditEnvironmentSchema from "../../schemas/constructs/v1beta3/environment/forms/createOrEdit.json";
import createOrEditEnvironmentUiSchema from "../../schemas/constructs/v1beta3/environment/forms/createOrEdit.ui.json";

// v1beta3/workspace
import createOrEditWorkspaceSchema from "../../schemas/constructs/v1beta3/workspace/forms/createOrEdit.json";
import createOrEditWorkspaceUiSchema from "../../schemas/constructs/v1beta3/workspace/forms/createOrEdit.ui.json";

// v1beta3/design
import importDesignSchema from "../../schemas/constructs/v1beta3/design/forms/import.json";
import importDesignUiSchema from "../../schemas/constructs/v1beta3/design/forms/import.ui.json";

// v1beta2/model
import importModelSchema from "../../schemas/constructs/v1beta2/model/forms/import.json";
import importModelUiSchema from "../../schemas/constructs/v1beta2/model/forms/import.ui.json";

// v1beta3/filter
import importFilterSchema from "../../schemas/constructs/v1beta3/filter/forms/import.json";
import importFilterUiSchema from "../../schemas/constructs/v1beta3/filter/forms/import.ui.json";

// v1beta3/connection
import helmCreateConnectionSchema from "../../schemas/constructs/v1beta3/connection/forms/helmCreate.json";
import helmCreateConnectionUiSchema from "../../schemas/constructs/v1beta3/connection/forms/helmCreate.ui.json";

// v1beta1/support
import helpAndSupportSchema from "../../schemas/constructs/v1beta1/support/forms/helpAndSupport.json";
import helpAndSupportUiSchema from "../../schemas/constructs/v1beta1/support/forms/helpAndSupport.ui.json";

// v1beta1/credential
import kubernetesCredentialSchema from "../../schemas/constructs/v1beta1/credential/forms/kubernetes.json";
import kubernetesCredentialUiSchema from "../../schemas/constructs/v1beta1/credential/forms/kubernetes.ui.json";
import grafanaCredentialSchema from "../../schemas/constructs/v1beta1/credential/forms/grafana.json";
import grafanaCredentialUiSchema from "../../schemas/constructs/v1beta1/credential/forms/grafana.ui.json";
import prometheusCredentialSchema from "../../schemas/constructs/v1beta1/credential/forms/prometheus.json";
import prometheusCredentialUiSchema from "../../schemas/constructs/v1beta1/credential/forms/prometheus.ui.json";

export const DesignImportRjsfSchemaV1Beta3 = importDesignSchema as RJSFSchema;
export const DesignImportRjsfUiSchemaV1Beta3 = importDesignUiSchema as UiSchema;

export const ModelImportRjsfSchemaV1Beta2 = importModelSchema as RJSFSchema;
export const ModelImportRjsfUiSchemaV1Beta2 = importModelUiSchema as UiSchema;

export const FilterImportRjsfSchemaV1Beta3 = importFilterSchema as RJSFSchema;
export const FilterImportRjsfUiSchemaV1Beta3 = importFilterUiSchema as UiSchema;

export const ConnectionHelmCreateRjsfSchemaV1Beta3 = helmCreateConnectionSchema as RJSFSchema;
export const ConnectionHelmCreateRjsfUiSchemaV1Beta3 = helmCreateConnectionUiSchema as UiSchema;

export const CatalogPublishRjsfSchemaV1Beta2 = publishCatalogSchema as RJSFSchema;
export const CatalogPublishRjsfUiSchemaV1Beta2 = publishCatalogUiSchema as UiSchema;

export const EnvironmentCreateOrEditRjsfSchemaV1Beta3 =
  createOrEditEnvironmentSchema as RJSFSchema;
export const EnvironmentCreateOrEditRjsfUiSchemaV1Beta3 =
  createOrEditEnvironmentUiSchema as UiSchema;

export const WorkspaceCreateOrEditRjsfSchemaV1Beta3 =
  createOrEditWorkspaceSchema as RJSFSchema;
export const WorkspaceCreateOrEditRjsfUiSchemaV1Beta3 =
  createOrEditWorkspaceUiSchema as UiSchema;

export const KubernetesCredentialRjsfSchemaV1Beta1 =
  kubernetesCredentialSchema as RJSFSchema;
export const KubernetesCredentialRjsfUiSchemaV1Beta1 =
  kubernetesCredentialUiSchema as UiSchema;

export const GrafanaCredentialRjsfSchemaV1Beta1 = grafanaCredentialSchema as RJSFSchema;
export const GrafanaCredentialRjsfUiSchemaV1Beta1 =
  grafanaCredentialUiSchema as UiSchema;

export const PrometheusCredentialRjsfSchemaV1Beta1 =
  prometheusCredentialSchema as RJSFSchema;
export const PrometheusCredentialRjsfUiSchemaV1Beta1 =
  prometheusCredentialUiSchema as UiSchema;

export const SupportRequestRjsfSchemaV1Beta1 = helpAndSupportSchema as RJSFSchema;
export const SupportRequestRjsfUiSchemaV1Beta1 = helpAndSupportUiSchema as UiSchema;
