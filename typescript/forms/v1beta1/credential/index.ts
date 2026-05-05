/**
 * Canonical RJSF form schemas for v1beta1 Credential.
 *
 * Source-of-truth lives in the JSON files in this directory; this
 * module just types and re-exports them under the canonical
 * `<Construct><Action>RjsfSchemaV<Version>` naming convention.
 *
 * Each integration kind (kubernetes, grafana, prometheus, ...) is its
 * own form file, but all share the canonical Credential construct
 * (identified by `name` + free-form `secret` map). The kind-specific
 * inner shape of `secret` is the form's contribution; the validator
 * only enforces the top-level subset against
 * `schemas/constructs/v1beta1/credential/api.yml#/components/schemas/Credential`.
 */

import type { RJSFSchema, UiSchema } from "../../types";
import kubernetesSchema from "./kubernetes.json";
import kubernetesUiSchema from "./kubernetes.ui.json";
import grafanaSchema from "./grafana.json";
import grafanaUiSchema from "./grafana.ui.json";
import prometheusSchema from "./prometheus.json";
import prometheusUiSchema from "./prometheus.ui.json";

export const KubernetesCredentialRjsfSchemaV1Beta1 =
  kubernetesSchema as RJSFSchema;
export const KubernetesCredentialRjsfUiSchemaV1Beta1 =
  kubernetesUiSchema as UiSchema;

export const GrafanaCredentialRjsfSchemaV1Beta1 =
  grafanaSchema as RJSFSchema;
export const GrafanaCredentialRjsfUiSchemaV1Beta1 =
  grafanaUiSchema as UiSchema;

export const PrometheusCredentialRjsfSchemaV1Beta1 =
  prometheusSchema as RJSFSchema;
export const PrometheusCredentialRjsfUiSchemaV1Beta1 =
  prometheusUiSchema as UiSchema;
