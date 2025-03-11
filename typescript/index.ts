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

import CapabilityV1Alpha1Schema from "./constructs/v1alpha1/CapabilitySchema";
import CatalogDataV1Alpha1Schema from "./constructs/v1alpha1/CatalogDataSchema";
import DesignV1Alpha2Schema from "./constructs/v1alpha2/DesignSchema";
import RelationshipV1Alpha2Schema from "./constructs/v1alpha2/RelationshipSchema";
import RelationshipV1Alpha3Schema from "./constructs/v1alpha3/RelationshipSchema";
import SelectorsV1Alpha3Schema from "./constructs/v1alpha3/SelectorsSchema";
import ComponentV1Beta1Schema from "./constructs/v1beta1/ComponentSchema";
import ModelV1Beta1Schema from "./constructs/v1beta1/ModelSchema";
import DesignV1Beta1Schema from "./constructs/v1beta1/DesignsSchema";
import ConnectionV1Beta1Schema from "./constructs/v1beta1/ConnectionSchema";

export {
  core,
  CapabilityV1Alpha1Schema,
  CatalogDataV1Alpha1Schema,
  DesignV1Alpha2Schema,
  RelationshipV1Alpha2Schema,
  RelationshipV1Alpha3Schema,
  SelectorsV1Alpha3Schema,
  ComponentV1Beta1Schema,
  ModelV1Beta1Schema,
  DesignV1Beta1Schema,
  ConnectionV1Beta1Schema,
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

