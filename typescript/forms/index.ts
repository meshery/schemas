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

export {
  EnvironmentCreateOrEditRjsfSchemaV1Beta3,
  EnvironmentCreateOrEditRjsfUiSchemaV1Beta3
} from "./v1beta3/environment";

export {
  WorkspaceCreateOrEditRjsfSchemaV1Beta3,
  WorkspaceCreateOrEditRjsfUiSchemaV1Beta3
} from "./v1beta3/workspace";

export {
  KubernetesCredentialRjsfSchemaV1Beta1,
  KubernetesCredentialRjsfUiSchemaV1Beta1,
  GrafanaCredentialRjsfSchemaV1Beta1,
  GrafanaCredentialRjsfUiSchemaV1Beta1,
  PrometheusCredentialRjsfSchemaV1Beta1,
  PrometheusCredentialRjsfUiSchemaV1Beta1
} from "./v1beta1/credential";
