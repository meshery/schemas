// This file is not automatically generated. It is created manually to export the constructs in the generated modules
// The generated modules are created in the dist folder and are named based on the constructs in the schema

// v1alpha1
import { components as CapabilityComponents } from "./generated/v1alpha1/capability/Capability";
import { components as CatalogComponents } from "./generated/v1alpha2/catalog/Catalog";

// v1beta1
import { components as ComponentComponents } from "./generated/v1beta1/component/Component";
import { components as ModelComponents } from "./generated/v1beta1/model/Model";
import { components as ConnectionComponents } from "./generated/v1beta1/connection/Connection";
import { components as UserComponents } from "./generated/v1beta1/user/User";
import { components as PatternComponents } from "./generated/v1beta1/pattern/Pattern";
import { components as CategoryComponents } from "./generated/v1beta1/category/Category";
import { components as SubcategoryComponents } from "./generated/v1beta1/subcategory/Subcategory";
import { components as EnvironmentComponents } from "./generated/v1beta1/environment/Environment";
import { components as WorkspaceComponents } from "./generated/v1beta1/workspace/Workspace";
import { components as InvitationComponents } from "./generated/v1beta1/invitation/Invitation";
import { components as BadgeComponents } from "./generated/v1beta1/badge/Badge";
import { components as TeamComponents } from "./generated/v1beta1/team/Team";

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
// v1alpha3
import RelationshipDefinitionV1Alpha3OpenApiSchema from "./generated/v1alpha3/relationship/RelationshipSchema";
import type * as core from "./generated/v1alpha1/core/Core";

// Export schemas
export {
  core,
  EnvironmentDefinitionV1Beta1OpenApiSchema,
  WorkspaceDefinitionV1Beta1OpenApiSchema,
  PatternDefinitionV1Beta1OpenApiSchema as DesignDefinitionV1Beta1OpenApiSchema,
  ComponentDefinitionV1Beta1OpenApiSchema,
  ModelDefinitionV1Beta1OpenApiSchema,
  CategoryDefinitionV1Beta1OpenApiSchema,
  SubCategoryDefinitionV1Beta1OpenApiSchema,
  InvitationSchema,
  BadgeSchema,
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
  export type Component = ComponentComponents["schemas"]["ComponentDefinition"];
  export type Model = ModelComponents["schemas"]["ModelDefinition"];
  export type Design = PatternComponents["schemas"]["PatternFile"];
  export type Connection = ConnectionComponents["schemas"]["Connection"];
  export type User = UserComponents["schemas"]["User"];
  export type Category = CategoryComponents["schemas"]["CategoryDefinition"];
  export type Subcategory =
    SubcategoryComponents["schemas"]["SubCategoryDefinition"];
  export type Environment = EnvironmentComponents["schemas"]["environment"];
  export type Workspace = WorkspaceComponents["schemas"]["workspace"];
  export type Invitation = InvitationComponents["schemas"]["Invitation"];
  export type Badge = BadgeComponents["schemas"]["Badge"];
  export type Team = TeamComponents["schemas"]["Team"];
}
