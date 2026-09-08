#!/usr/bin/env node
/**
 * Copies hand-authored RJSF form specs (schemas/constructs/<version>/<name>/forms/*.json)
 * into dist/constructs/<version>/<name>/forms/, so they are reachable from the
 * published npm package the same way the generated construct schemas already are.
 *
 * Why this exists
 * ----------------
 * These forms/ files are static JSON, not generated from the OpenAPI specs, so
 * neither tsup (which only bundles the .ts entries under typescript/generated/)
 * nor generate-schema-dts.js (which only emits .d.ts for those same entries)
 * ever touches them. The Go module ships schemas/ as-is, so Go consumers have
 * always had these; TypeScript consumers importing @meshery/schemas could not
 * reach them at all, only the files package.json's "files" field publishes
 * (dist/) reach the npm tarball, and dist/ never contained them.
 *
 * Each form's per-field description is written specifically for form help
 * (shorter, more user-facing than the API construct's own descriptions), so
 * a consumer needs the actual file, not a paraphrase of it.
 */

const fs = require("fs");
const path = require("path");
const { globSync } = require("glob");

const formFiles = globSync("schemas/constructs/*/*/forms/*.json");

let count = 0;
for (const src of formFiles) {
  // schemas/constructs/v1beta1/organization_smtp/forms/configure.json
  //   -> dist/constructs/v1beta1/organization_smtp/forms/configure.json
  const dest = src.replace(/^schemas\/constructs\//, "dist/constructs/");

  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  count++;
}

console.log(`Copied ${count} form spec${count === 1 ? "" : "s"} into dist/.`);
