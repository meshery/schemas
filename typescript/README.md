
**Overview**

This library provides TypeScript interfaces corresponding to OpenAPI/JSON schemas. These interfaces are auto-generated, offering type safety and improved developer experience when working with API data.

**Key Features**

* **Type Safety:** TypeScript interfaces enforce type checks, preventing errors during development and improving code reliability.
* **Enhanced Developer Experience:** Auto-completion and code validation provided by TypeScript make working with API data more efficient.
* **Organized Namespace Structure:** Clear separation of types by schema version using namespaces avoids naming conflicts and promotes maintainability.

**Namespace Structure**

The library organizes types by schema version within the `index.js` file. This approach ensures clarity and prevents name conflicts when using multiple schema versions simultaneously.

**Example:**


```typescript
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
```




