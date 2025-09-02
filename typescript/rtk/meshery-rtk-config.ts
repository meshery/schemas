import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "../../schemas/meshery_openapi.yml",
  apiFile: "./api.ts",
  apiImport: "mesheryBaseApi",
  outputFile: "./meshery.ts",
  exportName: "mesheryApi",
  hooks: true,
  tag:true,
};

export default config;