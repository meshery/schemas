// This file is not automatically generated. It is created manually to export the constructs in the generated modules
// The generated modules are created in the dist folder and are named based on the constructs in the schema

// v1alpha1
import { CatalogData as CatalogDataT, CaveatsAndConsiderations } from "./constructs/v1alpha1/catalog_data";
import { HttpsSchemasMesheryIoCapabilityJson } from "./constructs/v1alpha1/capability";

// v1alpha2
import { DesignSchema } from "./constructs/v1alpha2/design";
import { HttpsSchemasMesheryIoRelationshipJson } from "./constructs/v1alpha2/relationship";

// v1alpha3
import { HttpsSchemasMesheryIoRelationshipJson as V1alpha3Relationship } from "./constructs/v1alpha3/relationship";
import { HttpsSchemasMesheryIoSelectorsJson as V1alpha3Selectors } from "./constructs/v1alpha3/selectors";

// v1beta1
import { HttpsSchemasMesheryIoComponentJson } from "./constructs/v1beta1/component";
import { HttpsSchemasMesheryIoModelJson } from "./constructs/v1beta1/model";
import { DesignSchema as V1beta1DesignSchema } from "./constructs/v1beta1/designs";
import { HttpsSchemasMesheryIoComponentJson as V1beta1Connection } from "./constructs/v1beta1/connection";

//OpenAPI
import { components, paths, webhooks } from "./openapi";
import type * as core from "./constructs/core";

import CapabilityDefinitionV1Alpha1Schema from "./constructs/v1alpha1/CapabilitySchema";
import CatalogDataDefinitionV1Alpha1Schema from "./constructs/v1alpha1/CatalogDataSchema";
import DesignDefinitionV1Alpha2Schema from "./constructs/v1alpha2/DesignSchema";
import RelationshipDefinitionV1Alpha2Schema from "./constructs/v1alpha2/RelationshipSchema";
import RelationshipDefinitionV1Alpha3Schema from "./constructs/v1alpha3/RelationshipSchema";
import SelectorsDefinitionV1Alpha3Schema from "./constructs/v1alpha3/SelectorsSchema";
import ComponentDefinitionV1Beta1Schema from "./constructs/v1beta1/ComponentSchema";
import ModelDefinitionV1Beta1Schema from "./constructs/v1beta1/ModelSchema";
import DesignDefinitionV1Beta1Schema from "./constructs/v1beta1/DesignsSchema";
import ConnectionDefinitionV1Beta1Schema from "./constructs/v1beta1/ConnectionSchema";
import CoreDefinitionSchema from "./constructs/CoreSchema";

export {
  core,
  CoreDefinitionSchema,
  CapabilityDefinitionV1Alpha1Schema,
  CatalogDataDefinitionV1Alpha1Schema,
  DesignDefinitionV1Alpha2Schema,
  RelationshipDefinitionV1Alpha2Schema,
  RelationshipDefinitionV1Alpha3Schema,
  SelectorsDefinitionV1Alpha3Schema,
  ComponentDefinitionV1Beta1Schema,
  ModelDefinitionV1Beta1Schema,
  DesignDefinitionV1Beta1Schema,
  ConnectionDefinitionV1Beta1Schema,
};

// Contructs
export namespace v1alpha1 {
  export type CatalogData = CatalogDataT;
  export type CatalogCaveatsAndConsiderations = CaveatsAndConsiderations;
  export type Capability = HttpsSchemasMesheryIoCapabilityJson;
}

export namespace v1alpha2 {
  export type Design = DesignSchema;
  export type Relationship = HttpsSchemasMesheryIoRelationshipJson;
}

export namespace v1alpha3 {
  export type Relationship = V1alpha3Relationship;
  export type Selectors = V1alpha3Selectors;
}

export namespace v1beta1 {
  export type Component = HttpsSchemasMesheryIoComponentJson;
  export type Model = HttpsSchemasMesheryIoModelJson;
  export type Design = V1beta1DesignSchema;
  export type Connection = V1beta1Connection;
}

// OpenAPI
export namespace api {
  export type Components = components;
  export type Paths = paths;
  export type Webhooks = webhooks;
}

