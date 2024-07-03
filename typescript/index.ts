// This file is not automatically generated. It is created manually to export the constructs in the generated modules
// The generated modules are created in the dist folder and are named based on the constructs in the schema

// v1alpha1
import {
  CatalogData as CatalogDataT,
  CaveatsAndConsiderations,
} from "./constructs/v1alpha1/catalog_data";

// v1alpha2
import { DesignSchema } from "./constructs/v1alpha2/design";
import { HttpsSchemasMesheryIoRelationshipJson } from "./constructs/v1alpha2/relationship";

// v1beta1
import { HttpsSchemasMesheryIoComponentJson } from "./constructs/v1beta1/component";
import { HttpsSchemasMesheryIoModelJson } from "./constructs/v1beta1/model";

export namespace v1alpha1 {
  export type CatalogData = CatalogDataT;
  export type CatalogCaveatsAndConsiderations = CaveatsAndConsiderations;
}

export namespace v1alpha2 {
  export type Design = DesignSchema;
  export type Relationship = HttpsSchemasMesheryIoRelationshipJson;
}

export namespace v1beta1 {
  export type Component = HttpsSchemasMesheryIoComponentJson;
  export type Model = HttpsSchemasMesheryIoModelJson;
}
