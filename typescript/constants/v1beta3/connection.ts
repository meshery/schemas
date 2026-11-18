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

/**
 * A connection kind that names a publishing destination. A connection of this kind carries the destination's absolute https URL in `metadata.url` and references its secret through `credentialId`. The `kind` field itself remains an open-ended string.
 *
 * Source: v1beta3/connection components.schemas.DestinationKind
 */
export const DestinationConnectionKinds = {
  linkedin: "linkedin",
  x: "x",
  reddit: "reddit",
  hn: "hn",
  slack: "slack",
  bluesky: "bluesky",
  github: "github",
  blog: "blog",
} as const;

export type DestinationConnectionKind =
  (typeof DestinationConnectionKinds)[keyof typeof DestinationConnectionKinds];
