import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "typescript/index.ts",
    cloudApi: "typescript/rtk/cloud.ts",
    mesheryApi: "typescript/rtk/meshery.ts",
    api: "typescript/rtk/api.ts",
  },
  format: ["cjs", "esm"],

  external: [
    'react',
    'react-dom',
    'react-redux',
    '@reduxjs/toolkit'
  ],
    dts: true,
  splitting: false,
  sourcemap: false,
  treeshake: true,
  minify: true,
  clean: true,
});
