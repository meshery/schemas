import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "../../_openapi_build/meshery_openapi.yml",
  apiFile: "./api.ts",
  apiImport: "mesheryBaseApi",
  outputFile: "./meshery.ts",
  exportName: "mesheryApi",
  // Keep parity with cloud-rtk-config: lazy query hooks are part of the
  // exported client surface.
  hooks: { queries: true, lazyQueries: true, mutations: true },
  tag: true,
};

export default config;
