/**
 * This file was automatically generated from the OpenAPI schemas by
 * build/generate-enums-ts.js. DO NOT EDIT.
 *
 * To change these values, edit the enum's `x-ts-const` schema in
 * schemas/constructs/ and re-run `make generate-enums-ts`.
 */

/**
 * A core connection kind that receives bespoke, kind-specific handling in Meshery. The `kind` field itself remains an open-ended string; this names only the kinds with special behavior.
 *
 * Source: v1beta3/connection components.schemas.CoreKind
 */
export const CoreConnectionKinds = {
  meshery: "meshery",
  kubernetes: "kubernetes",
  prometheus: "prometheus",
  grafana: "grafana",
  github: "github",
} as const;

export type CoreConnectionKind =
  (typeof CoreConnectionKinds)[keyof typeof CoreConnectionKinds];
