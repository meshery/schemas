/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * One or more models associated with this catalog item. For designs, a list of one or more models implicated by components within the design. For models, this is self-referential.
 *
 * @minItems 1
 */
export type Model = ["kubernetes", ..."kubernetes"[]];
/**
 * Specific stipulations to consider and known behaviors to be aware of when using this design.
 */
export type CaveatsAndConsiderations = string;
/**
 * Purpose of the design along with its intended and unintended uses.
 */
export type Description = string;
/**
 * Categorization of the type of design or operational flow depicted in this design.
 */
export type Type =
  | "Deployment"
  | "Observability"
  | "Resiliency"
  | "Scaling"
  | "Security"
  | "Traffic-management"
  | "Troubleshooting"
  | "Workloads";

export interface Catalog {
  /**
   * Tracks the specific content version that has been made available in the Catalog.
   */
  publishedVersion?: string;
  /**
   * Published content is classifed by its support level. Content classes help you understand the origin and expected support level for each piece of content. It is important to note that the level of support may vary within each class, and you should exercise discretion when using community-contributed content. Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable. Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility. Content produced and supported by the respective project or organization responsible for the specific technology. This class offers a level of support from the project maintainers themselves. Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Community content may have varying levels of support and reliability.
   */
  class?: ("official" | "verified" | "reference architecture") & string;
  compatibility: Model;
  pattern_caveats: CaveatsAndConsiderations;
  pattern_info: Description;
  type: Type;
  /**
   * Contains reference to the dark and light mode snapshots of the design.
   */
  snapshotURL?: string[];
  [k: string]: unknown;
}
