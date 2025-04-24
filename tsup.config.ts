import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["typescript/index.ts"],
  format: ["cjs"],
  dts: true,
  splitting: false,
  sourcemap: false,
  treeshake: true,
  minify: true,
  clean: true,
});

