#!/usr/bin/env node
/**
 * Generates minimal TypeScript declaration (.d.ts) files for the generated
 * construct schemas under dist/constructs/.
 *
 * Why this exists
 * ---------------
 * tsup's DTS worker loads ALL entry-point files into a single in-memory
 * TypeScript program before emitting declarations. With 144 generated
 * construct files totalling ~497 K lines (DesignSchema.ts alone is 55 K
 * lines), the worker exhausts the 7 GB available on the ubuntu-24.04 CI
 * runner. To avoid this, the generated entries are built with `dts: false`
 * in tsup, and this script emits their declarations directly — no
 * TypeScript compiler invocation needed.
 *
 * Declaration shapes
 * ------------------
 * *Schema.ts  — `const X: Record<string, unknown>` + `export default X`
 *   DTS: `declare const X: Record<string, unknown>;\nexport default X;\n`
 *
 * *.ts (API types) — pure `export interface` / `export type` blocks,
 *   no value declarations, no imports.
 *   DTS: copy the source file verbatim (interface declarations are
 *   identical in .ts and .d.ts).
 */

const fs = require("fs");
const path = require("path");
const { globSync } = require("glob");

const generatedFiles = globSync("typescript/generated/**/*.ts");

let count = 0;
for (const src of generatedFiles) {
  // Map typescript/generated/v1beta3/academy/AcademySchema.ts
  //  → dist/constructs/v1beta3/academy/AcademySchema.d.ts
  const dtsPath = src
    .replace("typescript/generated", "dist/constructs")
    .replace(/\.ts$/, ".d.ts");

  fs.mkdirSync(path.dirname(dtsPath), { recursive: true });

  if (src.endsWith("Schema.ts")) {
    // All generated *Schema.ts files are:
    //   const XSchema: Record<string, unknown> = { ... };
    //   export default XSchema;
    // The declaration is two lines regardless of the value's size.
    const name = path.basename(src, ".ts");
    fs.writeFileSync(
      dtsPath,
      `declare const ${name}: Record<string, unknown>;\nexport default ${name};\n`,
    );
  } else {
    // Generated API-types files (Academy.ts, Design.ts, …) contain only
    // `export interface` and `export type` declarations — no implementations.
    // They are valid .d.ts content verbatim.
    fs.copyFileSync(src, dtsPath);
  }

  count++;
}

console.log(`generate-schema-dts: wrote ${count} .d.ts files`);
