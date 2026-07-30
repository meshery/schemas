// This file is not automatically generated. It is created manually to export the constructs in the generated modules
// The generated modules are created in the dist folder and are named based on the constructs in the schema

// v1alpha1
import { components as CapabilityComponents } from "./generated/v1alpha1/capability/Capability";
import { components as CatalogComponents } from "./generated/v1alpha2/catalog/Catalog";

// v1beta1
import { components as CapabilityV1Beta1Components } from "./generated/v1beta1/capability/Capability";
import { components as ComponentComponents } from "./generated/v1beta1/component/Component";
import { components as ConnectionComponents } from "./generated/v1beta1/connection/Connection";
import { components as CredentialComponents } from "./generated/v1beta1/credential/Credential";
import { components as ModelComponents } from "./generated/v1beta1/model/Model";
import { components as UserComponents } from "./generated/v1beta1/user/User";
import { components as PatternComponents } from "./generated/v1beta1/pattern/Pattern";
import { components as CategoryComponents } from "./generated/v1beta1/category/Category";
import { components as SubcategoryComponents } from "./generated/v1beta1/subcategory/Subcategory";
import { components as EnvironmentComponents } from "./generated/v1beta1/environment/Environment";
import { components as EvaluationComponents } from "./generated/v1beta1/evaluation/Evaluation";
import { components as FeatureComponents } from "./generated/v1beta1/feature/Feature";
import { components as KeyComponents } from "./generated/v1beta1/key/Key";
import { components as KeychainComponents } from "./generated/v1beta1/keychain/Keychain";
import { components as OrganizationComponents } from "./generated/v1beta1/organization/Organization";
import { components as RoleComponents } from "./generated/v1beta1/role/Role";
import { components as ScheduleComponents } from "./generated/v1beta1/schedule/Schedule";
import { components as SystemComponents } from "./generated/v1beta1/system/System";
import { components as TeamComponents } from "./generated/v1beta1/team/Team";
import { components as WorkspaceComponents } from "./generated/v1beta1/workspace/Workspace";
import { components as InvitationComponents } from "./generated/v1beta1/invitation/Invitation";
import { components as BadgeComponents } from "./generated/v1beta1/badge/Badge";

// v1beta2
import { components as V1Beta2AcademyComponents } from "./generated/v1beta2/academy/Academy";
import { components as V1Beta2CatalogComponents } from "./generated/v1beta2/catalog/Catalog";
import { components as V1Beta2ComponentComponents } from "./generated/v1beta2/component/Component";
import { components as V1Beta2ConnectionComponents } from "./generated/v1beta2/connection/Connection";
import { components as V1Beta2DesignComponents } from "./generated/v1beta2/design/Design";
import { components as V1Beta2EventComponents } from "./generated/v1beta2/event/Event";
import { components as V1Beta2InvitationComponents } from "./generated/v1beta2/invitation/Invitation";
import { components as V1Beta2OrganizationComponents } from "./generated/v1beta2/organization/Organization";
import { components as V1Beta2PlanComponents } from "./generated/v1beta2/plan/Plan";
import { components as V1Beta2RelationshipComponents } from "./generated/v1beta2/relationship/Relationship";
import { components as V1Beta2SubscriptionComponents } from "./generated/v1beta2/subscription/Subscription";
import { components as V1Beta2TokenComponents } from "./generated/v1beta2/token/Token";

// v1beta3
import { components as V1Beta3UserComponents } from "./generated/v1beta3/user/User";

/**
 * SCHEMA OPTIMIZATION NOTICE
 * -------------------------
 * The following imports are commented out to optimize bundle size.
 * These schema definitions contain large JSON structures that significantly
 * increase the bundle size when included.
 *
 * USAGE GUIDELINES:
 * - Only uncomment these imports when specific schema validation is needed in the UI
 * - When validating, prefer using only the latest version of the schema
 * - Avoid using multiple versions of the same schema to prevent redundancy
 */

// OpenAPI Schemas
// import CapabilityDefinitionV1Alpha1OpenApiSchema from "./generated/v1alpha1/capability/CapabilitySchema";
// import CatalogDefinitionV1Alpha2OpenApiSchema from "./generated/v1alpha2/catalog/CatalogSchema";
import CategoryDefinitionV1Beta1OpenApiSchema from "./generated/v1beta1/category/CategorySchema";
import SubCategoryDefinitionV1Beta1OpenApiSchema from "./generated/v1beta1/subcategory/SubcategorySchema";
import PatternDefinitionV1Beta1OpenApiSchema from "./generated/v1beta1/pattern/PatternSchema";
import ComponentDefinitionV1Beta1OpenApiSchema from "./generated/v1beta1/component/ComponentSchema";
import ModelDefinitionV1Beta1OpenApiSchema from "./generated/v1beta1/model/ModelSchema";
// import PlanDefinitionV1Beta1OpenApiSchema from "./generated/v1beta1/plan/PlanSchema";
// import SubscriptionDefinitionV1Beta1OpenApiSchema from "./generated/v1beta1/subscription/SubscriptionSchema";
// import EvaluationDefinitionV1Beta1OpenApiSchema from "./generated/v1beta1/evaluation/EvaluationSchema";
import EnvironmentDefinitionV1Beta1OpenApiSchema from "./generated/v1beta1/environment/EnvironmentSchema";
import WorkspaceDefinitionV1Beta1OpenApiSchema from "./generated/v1beta1/workspace/WorkspaceSchema";
import InvitationSchema from "./generated/v1beta1/invitation/InvitationSchema";
import BadgeSchema from "./generated/v1beta1/badge/BadgeSchema";
// v1beta2
import ComponentDefinitionV1Beta2OpenApiSchema from "./generated/v1beta2/component/ComponentSchema";
import ConnectionDefinitionV1Beta2OpenApiSchema from "./generated/v1beta2/connection/ConnectionSchema";
import DesignDefinitionV1Beta2OpenApiSchema from "./generated/v1beta2/design/DesignSchema";
import InvitationDefinitionV1Beta2OpenApiSchema from "./generated/v1beta2/invitation/InvitationSchema";
import RelationshipDefinitionV1Beta2OpenApiSchema from "./generated/v1beta2/relationship/RelationshipSchema";
// import AcademyDefinitionV1Beta2OpenApiSchema from "./generated/v1beta2/academy/AcademySchema";
// import CatalogDefinitionV1Beta2OpenApiSchema from "./generated/v1beta2/catalog/CatalogSchema";
// import EventDefinitionV1Beta2OpenApiSchema from "./generated/v1beta2/event/EventSchema";
// import PlanDefinitionV1Beta2OpenApiSchema from "./generated/v1beta2/plan/PlanSchema";
// import SubscriptionDefinitionV1Beta2OpenApiSchema from "./generated/v1beta2/subscription/SubscriptionSchema";
// import TokenDefinitionV1Beta2OpenApiSchema from "./generated/v1beta2/token/TokenSchema";

// v1alpha3
import RelationshipDefinitionV1Alpha3OpenApiSchema from "./generated/v1alpha3/relationship/RelationshipSchema";
import type * as core from "./generated/v1alpha1/core/Core";

// Runtime constants generated from OpenAPI string enums that opt in with
// `x-ts-const` (see build/generate-enums-ts.js). openapi-typescript emits those
// enums as type-only unions, which are erased at runtime; these are the real
// values to compare against. Exported with `export *` so a newly annotated enum
// flows through without editing this file.
//
// Includes CoreConnectionKinds - note that a connection's `kind` stays an
// open-ended string; that enum only names the kinds with bespoke handling.
export * from "./constants";

// Export schemas
export {
  core,
  // v1beta1
  EnvironmentDefinitionV1Beta1OpenApiSchema,
  WorkspaceDefinitionV1Beta1OpenApiSchema,
  PatternDefinitionV1Beta1OpenApiSchema as DesignDefinitionV1Beta1OpenApiSchema,
  ComponentDefinitionV1Beta1OpenApiSchema,
  ModelDefinitionV1Beta1OpenApiSchema,
  CategoryDefinitionV1Beta1OpenApiSchema,
  SubCategoryDefinitionV1Beta1OpenApiSchema,
  InvitationSchema,
  BadgeSchema,
  // v1beta2
  ComponentDefinitionV1Beta2OpenApiSchema,
  ConnectionDefinitionV1Beta2OpenApiSchema,
  DesignDefinitionV1Beta2OpenApiSchema,
  InvitationDefinitionV1Beta2OpenApiSchema,
  RelationshipDefinitionV1Beta2OpenApiSchema,
  // v1alpha3
  RelationshipDefinitionV1Alpha3OpenApiSchema,
};

// Constructs
export namespace v1alpha1 {
  export type CatalogData = CatalogComponents["schemas"]["CatalogData"];
  export type Capability = CapabilityComponents["schemas"];
}

export namespace v1alpha2 {
  export type CatalogData = CatalogComponents["schemas"]["CatalogData"];
}

export namespace v1beta1 {
  export type Badge = BadgeComponents["schemas"]["Badge"];
  export type Capability =
    CapabilityV1Beta1Components["schemas"]["Capability"];
  export type Category = CategoryComponents["schemas"]["CategoryDefinition"];
  export type Component = ComponentComponents["schemas"]["ComponentDefinition"];
  export type Connection = ConnectionComponents["schemas"]["Connection"];
  export type ConnectionStatusValue =
    ConnectionComponents["schemas"]["ConnectionStatusValue"];
  export type ControllerStatusValue =
    SystemComponents["schemas"]["ControllerStatusValue"];
  export type Credential = CredentialComponents["schemas"]["Credential"];
  export type Design = PatternComponents["schemas"]["PatternFile"];
  export type Environment = EnvironmentComponents["schemas"]["Environment"];
  export type EvaluationRequest =
    EvaluationComponents["schemas"]["EvaluationRequest"];
  export type EvaluationResponse =
    EvaluationComponents["schemas"]["EvaluationResponse"];
  export type Feature = FeatureComponents["schemas"]["Feature"];
  export type Invitation = InvitationComponents["schemas"]["Invitation"];
  export type Key = KeyComponents["schemas"]["Key"];
  export type Keychain = KeychainComponents["schemas"]["Keychain"];
  export type Model = ModelComponents["schemas"]["ModelDefinition"];
  export type Organization =
    OrganizationComponents["schemas"]["Organization"];
  export type Role = RoleComponents["schemas"]["Role"];
  export type Schedule = ScheduleComponents["schemas"]["Schedule"];
  export type Subcategory =
    SubcategoryComponents["schemas"]["SubCategoryDefinition"];
  export type Team = TeamComponents["schemas"]["Team"];
  export type User = UserComponents["schemas"]["User"];
  export type Workspace = WorkspaceComponents["schemas"]["Workspace"];
}

// Canonical RJSF form schemas. See typescript/forms/ and
// docs/form-schemas-roadmap.md. Each form is validated against the
// corresponding canonical OpenAPI construct by validation/forms_test.go
// (subset-of: every form field is present in canonical, types match,
// enums are subsets, required fields exist in canonical).
export {
  CatalogPublishRjsfSchemaV1Beta2,
  CatalogPublishRjsfUiSchemaV1Beta2,
  ConnectionHelmCreateRjsfSchemaV1Beta3,
  ConnectionHelmCreateRjsfUiSchemaV1Beta3,
  DesignImportRjsfSchemaV1Beta3,
  DesignImportRjsfUiSchemaV1Beta3,
  EnvironmentCreateOrEditRjsfSchemaV1Beta3,
  EnvironmentCreateOrEditRjsfUiSchemaV1Beta3,
  FilterImportRjsfSchemaV1Beta3,
  FilterImportRjsfUiSchemaV1Beta3,
  GrafanaCredentialRjsfSchemaV1Beta1,
  GrafanaCredentialRjsfUiSchemaV1Beta1,
  KubernetesCredentialRjsfSchemaV1Beta1,
  KubernetesCredentialRjsfUiSchemaV1Beta1,
  ModelImportRjsfSchemaV1Beta2,
  ModelImportRjsfUiSchemaV1Beta2,
  PrometheusCredentialRjsfSchemaV1Beta1,
  PrometheusCredentialRjsfUiSchemaV1Beta1,
  SupportRequestRjsfSchemaV1Beta1,
  SupportRequestRjsfUiSchemaV1Beta1,
  WorkspaceCreateOrEditRjsfSchemaV1Beta3,
  WorkspaceCreateOrEditRjsfUiSchemaV1Beta3
} from "./forms";

// Public types for the canonical RJSF form-schema artifacts. Exported so
// downstream consumers (sistent, meshery, meshery-cloud) can name the
// shape when they spread or otherwise derive variants from a canonical
// schema — without that, tsup's DTS bundler errors on emitted .d.ts
// references to a type declared but never re-exported. See #871.
export type { RJSFSchema, UiSchema } from "./forms/types";

export namespace v1beta2 {
  export type Academy =
    V1Beta2AcademyComponents["schemas"]["AcademyCurricula"];
  export type CatalogData =
    V1Beta2CatalogComponents["schemas"]["CatalogData"];
  export type Component =
    V1Beta2ComponentComponents["schemas"]["ComponentDefinition"];
  export type Connection =
    V1Beta2ConnectionComponents["schemas"]["Connection"];
  export type Design = V1Beta2DesignComponents["schemas"]["PatternFile"];
  export type EventResult =
    V1Beta2EventComponents["schemas"]["EventResult"];
  export type Invitation =
    V1Beta2InvitationComponents["schemas"]["Invitation"];
  export type Organization =
    V1Beta2OrganizationComponents["schemas"]["Organization"];
  export type Plan = V1Beta2PlanComponents["schemas"]["Plan"];
  export type Relationship =
    V1Beta2RelationshipComponents["schemas"]["RelationshipDefinition"];
  export type Subscription =
    V1Beta2SubscriptionComponents["schemas"]["Subscription"];
  export type Token = V1Beta2TokenComponents["schemas"]["UserToken"];
}

export namespace v1beta3 {
  export type User = V1Beta3UserComponents["schemas"]["User"];
  export type PublicUser = V1Beta3UserComponents["schemas"]["PublicUser"];
  export type PublicUsersPage =
    V1Beta3UserComponents["schemas"]["PublicUsersPage"];
  export type SearchableUser =
    V1Beta3UserComponents["schemas"]["SearchableUser"];
  export type SearchableUsersPage =
    V1Beta3UserComponents["schemas"]["SearchableUsersPage"];
}
