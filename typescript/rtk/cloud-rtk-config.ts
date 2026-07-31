import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "../../_openapi_build/cloud_openapi.yml",
  apiFile: "./api.ts",
  apiImport: "cloudBaseApi",
  outputFile: "./cloud.ts",
  exportName: "cloudApi",
  // lazyQueries makes useLazy*Query hooks first-class exports - consumers
  // (meshery-cloud UI) trigger org- and user-scoped list queries imperatively.
  hooks: { queries: true, lazyQueries: true, mutations: true },
  tag: true,
};

export default config;
