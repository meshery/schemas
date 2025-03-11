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

import capabilitySchema from "./constructs/v1alpha1/capability.schema";
import catalogDataSchema from "./constructs/v1alpha1/catalog_data.schema";
import designSchemaV1alpha2 from "./constructs/v1alpha2/design.schema";
import relationshipSchemaV1alpha2 from "./constructs/v1alpha2/relationship.schema";
import relationshipSchemaV1alpha3 from "./constructs/v1alpha3/relationship.schema";
import selectorsSchemaV1alpha3 from "./constructs/v1alpha3/selectors.schema";
import componentSchemaV1beta1 from "./constructs/v1beta1/component.schema";
import modelSchemaV1beta1 from "./constructs/v1beta1/model.schema";
import designSchemaV1beta1 from "./constructs/v1beta1/designs.schema";
import connectionSchemaV1beta1 from "./constructs/v1beta1/connection.schema";

export { core };

// Contructs
export namespace v1alpha1 {
  export type CatalogData = CatalogDataT;
  export type CatalogCaveatsAndConsiderations = CaveatsAndConsiderations;
  export type Capability = HttpsSchemasMesheryIoCapabilityJson;

  export const schemas = {
    capability: capabilitySchema,
    catalogData: catalogDataSchema,
  };
}

export namespace v1alpha2 {
  export type Design = DesignSchema;
  export type Relationship = HttpsSchemasMesheryIoRelationshipJson;

  export const schemas = {
    design: designSchemaV1alpha2,
    relationship: relationshipSchemaV1alpha2,
  };
}

export namespace v1alpha3 {
  export type Relationship = V1alpha3Relationship;
  export type Selectors = V1alpha3Selectors;

  export const schemas = {
    relationship: relationshipSchemaV1alpha3,
    selectors: selectorsSchemaV1alpha3,
  };
}

export namespace v1beta1 {
  export type Component = HttpsSchemasMesheryIoComponentJson;
  export type Model = HttpsSchemasMesheryIoModelJson;
  export type Design = V1beta1DesignSchema;
  export type Connection = V1beta1Connection;

  export const schemas = {
    component: componentSchemaV1beta1,
    model: modelSchemaV1beta1,
    design: designSchemaV1beta1,
    connections: connectionSchemaV1beta1,
  };
}

// OpenAPI
export namespace api {
  export type Components = components;
  export type Paths = paths;
  export type Webhooks = webhooks;
}

export const schemas = {
  v1alpha1: v1alpha1.schemas,
  v1alpha2: v1alpha2.schemas,
  v1alpha3: v1alpha3.schemas,
  v1beta1: v1beta1.schemas,
};

