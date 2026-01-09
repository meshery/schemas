import { defineConfig } from "tsup";
import { globSync } from "glob";

// Get all TypeScript Schema files under generated folder (exclude .d.ts files)
const generatedFiles = globSync("typescript/generated/**/*.ts");

// Create entry points for each generated file
const generatedEntries = generatedFiles.reduce(
  (acc, file) => {
    // Convert path like "typescript/generated/v1beta1/model/ModelSchema.ts"
    // to entry name like "generated/v1beta1/model/ModelSchema"
    const entryName = file
      .replace("typescript/", "")
      .replace("generated", "constructs")
      .replace(/\.ts$/, "");
    acc[entryName] = file;
    return acc;
  },
  {} as Record<string, string>,
);

export default defineConfig({
  entry: {
    index: "typescript/index.ts",
    cloudApi: "typescript/rtk/cloud.ts",
    mesheryApi: "typescript/rtk/meshery.ts",
    api: "typescript/rtk/api.ts",
    ...generatedEntries,
  },
  format: ["cjs", "esm"],
  external: ["react", "react-dom", "react-redux", "@reduxjs/toolkit"],
  dts: true,
  splitting: false,
  sourcemap: false,
  treeshake: true,
  minify: true,
  clean: true,
});
