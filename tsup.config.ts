import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["typescript/index.ts"],
  format: ["esm"],
  dts: true,
  splitting: false,
  sourcemap: false,
  treeshake: true,
  minify: true,
  clean: true,
});

