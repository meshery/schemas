/**
 * This file was automatically generated from the OpenAPI schemas by
 * build/generate-enums-ts.js. DO NOT EDIT.
 *
 * To change these values, edit the enum's `x-ts-const` schema in
 * schemas/constructs/ and re-run `make generate-enums-ts`.
 */

/**
 * A platform whose messages can tag an entity: `linkedin`, `x`, `bluesky`, `reddit` or `slack`. A server refuses any other value with 400. A platform joins by adding a value here.
 * 
 *
 * Source: v1beta3/mention_alias components.schemas.MentionAliasPlatform
 */
export const MentionAliasPlatforms = {
  linkedin: "linkedin",
  x: "x",
  bluesky: "bluesky",
  reddit: "reddit",
  slack: "slack",
} as const;

export type MentionAliasPlatform =
  (typeof MentionAliasPlatforms)[keyof typeof MentionAliasPlatforms];
