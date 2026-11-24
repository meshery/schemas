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

// v1beta1/organization_smtp
import configureOrganizationSmtpSchema from "../../schemas/constructs/v1beta1/organization_smtp/forms/configure.json";
import configureOrganizationSmtpUiSchema from "../../schemas/constructs/v1beta1/organization_smtp/forms/configure.ui.json";

// v1beta1/credential
import kubernetesCredentialSchema from "../../schemas/constructs/v1beta1/credential/forms/kubernetes.json";
import kubernetesCredentialUiSchema from "../../schemas/constructs/v1beta1/credential/forms/kubernetes.ui.json";
import grafanaCredentialSchema from "../../schemas/constructs/v1beta1/credential/forms/grafana.json";
import grafanaCredentialUiSchema from "../../schemas/constructs/v1beta1/credential/forms/grafana.ui.json";
import prometheusCredentialSchema from "../../schemas/constructs/v1beta1/credential/forms/prometheus.json";
import prometheusCredentialUiSchema from "../../schemas/constructs/v1beta1/credential/forms/prometheus.ui.json";
import githubCredentialSchema from "../../schemas/constructs/v1beta1/credential/forms/github.json";
import githubCredentialUiSchema from "../../schemas/constructs/v1beta1/credential/forms/github.ui.json";
import xCredentialSchema from "../../schemas/constructs/v1beta1/credential/forms/x.json";
import xCredentialUiSchema from "../../schemas/constructs/v1beta1/credential/forms/x.ui.json";
import redditCredentialSchema from "../../schemas/constructs/v1beta1/credential/forms/reddit.json";
import redditCredentialUiSchema from "../../schemas/constructs/v1beta1/credential/forms/reddit.ui.json";
import linkedinCredentialSchema from "../../schemas/constructs/v1beta1/credential/forms/linkedin.json";
import linkedinCredentialUiSchema from "../../schemas/constructs/v1beta1/credential/forms/linkedin.ui.json";
import blueskyCredentialSchema from "../../schemas/constructs/v1beta1/credential/forms/bluesky.json";
import blueskyCredentialUiSchema from "../../schemas/constructs/v1beta1/credential/forms/bluesky.ui.json";
import hnCredentialSchema from "../../schemas/constructs/v1beta1/credential/forms/hn.json";
import hnCredentialUiSchema from "../../schemas/constructs/v1beta1/credential/forms/hn.ui.json";
import slackCredentialSchema from "../../schemas/constructs/v1beta1/credential/forms/slack.json";
import slackCredentialUiSchema from "../../schemas/constructs/v1beta1/credential/forms/slack.ui.json";
import youtubeCredentialSchema from "../../schemas/constructs/v1beta1/credential/forms/youtube.json";
import youtubeCredentialUiSchema from "../../schemas/constructs/v1beta1/credential/forms/youtube.ui.json";
import monitoringCredentialSchema from "../../schemas/constructs/v1beta1/credential/forms/monitoring.json";
import monitoringCredentialUiSchema from "../../schemas/constructs/v1beta1/credential/forms/monitoring.ui.json";
import observabilityAndAnalysisCredentialSchema from "../../schemas/constructs/v1beta1/credential/forms/observability-and-analysis.json";
import observabilityAndAnalysisCredentialUiSchema from "../../schemas/constructs/v1beta1/credential/forms/observability-and-analysis.ui.json";
import blogCredentialSchema from "../../schemas/constructs/v1beta1/credential/forms/blog.json";
import blogCredentialUiSchema from "../../schemas/constructs/v1beta1/credential/forms/blog.ui.json";
import tiktokCredentialSchema from "../../schemas/constructs/v1beta1/credential/forms/tiktok.json";
import tiktokCredentialUiSchema from "../../schemas/constructs/v1beta1/credential/forms/tiktok.ui.json";
import instagramCredentialSchema from "../../schemas/constructs/v1beta1/credential/forms/instagram.json";
import instagramCredentialUiSchema from "../../schemas/constructs/v1beta1/credential/forms/instagram.ui.json";
import facebookCredentialSchema from "../../schemas/constructs/v1beta1/credential/forms/facebook.json";
import facebookCredentialUiSchema from "../../schemas/constructs/v1beta1/credential/forms/facebook.ui.json";
import smtpCredentialSchema from "../../schemas/constructs/v1beta1/credential/forms/smtp.json";
import smtpCredentialUiSchema from "../../schemas/constructs/v1beta1/credential/forms/smtp.ui.json";
import githubOauthCredentialSchema from "../../schemas/constructs/v1beta1/credential/forms/github-oauth.json";
import githubOauthCredentialUiSchema from "../../schemas/constructs/v1beta1/credential/forms/github-oauth.ui.json";
import googleOauthCredentialSchema from "../../schemas/constructs/v1beta1/credential/forms/google-oauth.json";
import googleOauthCredentialUiSchema from "../../schemas/constructs/v1beta1/credential/forms/google-oauth.ui.json";
import oidcOauthCredentialSchema from "../../schemas/constructs/v1beta1/credential/forms/oidc-oauth.json";
import oidcOauthCredentialUiSchema from "../../schemas/constructs/v1beta1/credential/forms/oidc-oauth.ui.json";

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

export const GithubCredentialRjsfSchemaV1Beta1 = githubCredentialSchema as RJSFSchema;
export const GithubCredentialRjsfUiSchemaV1Beta1 =
  githubCredentialUiSchema as UiSchema;

export const XCredentialRjsfSchemaV1Beta1 = xCredentialSchema as RJSFSchema;
export const XCredentialRjsfUiSchemaV1Beta1 =
  xCredentialUiSchema as UiSchema;

export const RedditCredentialRjsfSchemaV1Beta1 = redditCredentialSchema as RJSFSchema;
export const RedditCredentialRjsfUiSchemaV1Beta1 =
  redditCredentialUiSchema as UiSchema;

export const LinkedinCredentialRjsfSchemaV1Beta1 = linkedinCredentialSchema as RJSFSchema;
export const LinkedinCredentialRjsfUiSchemaV1Beta1 =
  linkedinCredentialUiSchema as UiSchema;

export const BlueskyCredentialRjsfSchemaV1Beta1 = blueskyCredentialSchema as RJSFSchema;
export const BlueskyCredentialRjsfUiSchemaV1Beta1 =
  blueskyCredentialUiSchema as UiSchema;

export const HnCredentialRjsfSchemaV1Beta1 = hnCredentialSchema as RJSFSchema;
export const HnCredentialRjsfUiSchemaV1Beta1 =
  hnCredentialUiSchema as UiSchema;

export const SlackCredentialRjsfSchemaV1Beta1 = slackCredentialSchema as RJSFSchema;
export const SlackCredentialRjsfUiSchemaV1Beta1 =
  slackCredentialUiSchema as UiSchema;

export const YoutubeCredentialRjsfSchemaV1Beta1 = youtubeCredentialSchema as RJSFSchema;
export const YoutubeCredentialRjsfUiSchemaV1Beta1 =
  youtubeCredentialUiSchema as UiSchema;

export const MonitoringCredentialRjsfSchemaV1Beta1 = monitoringCredentialSchema as RJSFSchema;
export const MonitoringCredentialRjsfUiSchemaV1Beta1 =
  monitoringCredentialUiSchema as UiSchema;

export const ObservabilityAndAnalysisCredentialRjsfSchemaV1Beta1 = observabilityAndAnalysisCredentialSchema as RJSFSchema;
export const ObservabilityAndAnalysisCredentialRjsfUiSchemaV1Beta1 =
  observabilityAndAnalysisCredentialUiSchema as UiSchema;

export const BlogCredentialRjsfSchemaV1Beta1 = blogCredentialSchema as RJSFSchema;
export const BlogCredentialRjsfUiSchemaV1Beta1 =
  blogCredentialUiSchema as UiSchema;

export const TiktokCredentialRjsfSchemaV1Beta1 = tiktokCredentialSchema as RJSFSchema;
export const TiktokCredentialRjsfUiSchemaV1Beta1 =
  tiktokCredentialUiSchema as UiSchema;

export const InstagramCredentialRjsfSchemaV1Beta1 = instagramCredentialSchema as RJSFSchema;
export const InstagramCredentialRjsfUiSchemaV1Beta1 =
  instagramCredentialUiSchema as UiSchema;

export const FacebookCredentialRjsfSchemaV1Beta1 = facebookCredentialSchema as RJSFSchema;
export const FacebookCredentialRjsfUiSchemaV1Beta1 =
  facebookCredentialUiSchema as UiSchema;

export const SmtpCredentialRjsfSchemaV1Beta1 = smtpCredentialSchema as RJSFSchema;
export const SmtpCredentialRjsfUiSchemaV1Beta1 =
  smtpCredentialUiSchema as UiSchema;

export const GithubOauthCredentialRjsfSchemaV1Beta1 = githubOauthCredentialSchema as RJSFSchema;
export const GithubOauthCredentialRjsfUiSchemaV1Beta1 =
  githubOauthCredentialUiSchema as UiSchema;

export const GoogleOauthCredentialRjsfSchemaV1Beta1 = googleOauthCredentialSchema as RJSFSchema;
export const GoogleOauthCredentialRjsfUiSchemaV1Beta1 =
  googleOauthCredentialUiSchema as UiSchema;

export const OidcOauthCredentialRjsfSchemaV1Beta1 = oidcOauthCredentialSchema as RJSFSchema;
export const OidcOauthCredentialRjsfUiSchemaV1Beta1 =
  oidcOauthCredentialUiSchema as UiSchema;

export const CredentialRjsfSchemasV1Beta1: Record<string, RJSFSchema> = {
  "grafana": GrafanaCredentialRjsfSchemaV1Beta1,
  "prometheus": PrometheusCredentialRjsfSchemaV1Beta1,
  "kubernetes": KubernetesCredentialRjsfSchemaV1Beta1,
  "github": GithubCredentialRjsfSchemaV1Beta1,
  "x": XCredentialRjsfSchemaV1Beta1,
  "reddit": RedditCredentialRjsfSchemaV1Beta1,
  "linkedin": LinkedinCredentialRjsfSchemaV1Beta1,
  "bluesky": BlueskyCredentialRjsfSchemaV1Beta1,
  "hn": HnCredentialRjsfSchemaV1Beta1,
  "slack": SlackCredentialRjsfSchemaV1Beta1,
  "youtube": YoutubeCredentialRjsfSchemaV1Beta1,
  "monitoring": MonitoringCredentialRjsfSchemaV1Beta1,
  "observability and analysis": ObservabilityAndAnalysisCredentialRjsfSchemaV1Beta1,
  "blog": BlogCredentialRjsfSchemaV1Beta1,
  "tiktok": TiktokCredentialRjsfSchemaV1Beta1,
  "instagram": InstagramCredentialRjsfSchemaV1Beta1,
  "facebook": FacebookCredentialRjsfSchemaV1Beta1,
  "smtp": SmtpCredentialRjsfSchemaV1Beta1,
  "github-oauth": GithubOauthCredentialRjsfSchemaV1Beta1,
  "google-oauth": GoogleOauthCredentialRjsfSchemaV1Beta1,
  "oidc-oauth": OidcOauthCredentialRjsfSchemaV1Beta1,
};

export const CredentialRjsfUiSchemasV1Beta1: Record<string, UiSchema> = {
  "grafana": GrafanaCredentialRjsfUiSchemaV1Beta1,
  "prometheus": PrometheusCredentialRjsfUiSchemaV1Beta1,
  "kubernetes": KubernetesCredentialRjsfUiSchemaV1Beta1,
  "github": GithubCredentialRjsfUiSchemaV1Beta1,
  "x": XCredentialRjsfUiSchemaV1Beta1,
  "reddit": RedditCredentialRjsfUiSchemaV1Beta1,
  "linkedin": LinkedinCredentialRjsfUiSchemaV1Beta1,
  "bluesky": BlueskyCredentialRjsfUiSchemaV1Beta1,
  "hn": HnCredentialRjsfUiSchemaV1Beta1,
  "slack": SlackCredentialRjsfUiSchemaV1Beta1,
  "youtube": YoutubeCredentialRjsfUiSchemaV1Beta1,
  "monitoring": MonitoringCredentialRjsfUiSchemaV1Beta1,
  "observability and analysis": ObservabilityAndAnalysisCredentialRjsfUiSchemaV1Beta1,
  "blog": BlogCredentialRjsfUiSchemaV1Beta1,
  "tiktok": TiktokCredentialRjsfUiSchemaV1Beta1,
  "instagram": InstagramCredentialRjsfUiSchemaV1Beta1,
  "facebook": FacebookCredentialRjsfUiSchemaV1Beta1,
  "smtp": SmtpCredentialRjsfUiSchemaV1Beta1,
  "github-oauth": GithubOauthCredentialRjsfUiSchemaV1Beta1,
  "google-oauth": GoogleOauthCredentialRjsfUiSchemaV1Beta1,
  "oidc-oauth": OidcOauthCredentialRjsfUiSchemaV1Beta1,
};

export const SupportRequestRjsfSchemaV1Beta1 = helpAndSupportSchema as RJSFSchema;
export const SupportRequestRjsfUiSchemaV1Beta1 = helpAndSupportUiSchema as UiSchema;

export const OrganizationSmtpConfigureRjsfSchemaV1Beta1 =
  configureOrganizationSmtpSchema as RJSFSchema;
export const OrganizationSmtpConfigureRjsfUiSchemaV1Beta1 =
  configureOrganizationSmtpUiSchema as UiSchema;
