import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "../../schemas/cloud_openapi.yml",
  apiFile: "./api.ts",
  apiImport: "cloudBaseApi",
  outputFile: "./cloud.ts",
  exportName: "cloudApi",
  hooks: true,
  tag:true,
};

export default config;