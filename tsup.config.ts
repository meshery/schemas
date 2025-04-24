import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["typescript/index.ts"],
  format: ["esm"],
  dts: {
    resolve: true,
    entry: "typescript/index.ts"
  },
  splitting: false,
  sourcemap: false,
  treeshake: true,
  minify: true,
  clean: true
});
