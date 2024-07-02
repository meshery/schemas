// This file is not automatically generated. It is created manually to export the constructs in the generated modules

import {
  CatalogData,
  CaveatsAndConsiderations,
} from "./constructs/v1alpha1/catalog_data";

import { DesignSchema } from "./constructs/v1alpha2/design";
import { HttpsSchemasMesheryIoRelationshipJson } from "./constructs/v1alpha2/relationship";

import { HttpsSchemasMesheryIoComponentJson } from "./constructs/v1beta1/component";
import { HttpsSchemasMesheryIoModelJson } from "./constructs/v1beta1/model";

interface V1alpha1 {
  CatalogData: CatalogData;
  CatalogCaveatsAndConsiderations: CaveatsAndConsiderations;
}

interface V1alpha2 {
  Design: DesignSchema;
  Relationship: HttpsSchemasMesheryIoRelationshipJson;
}

interface V1beta1 {
  Component: HttpsSchemasMesheryIoComponentJson;
  Model: HttpsSchemasMesheryIoModelJson;
}

export { V1alpha1, V1alpha2, V1beta1 };
