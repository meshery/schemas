import type { components as ErrorComponents } from "../generated/v1beta3/errorcode/Errorcode";
import type { components as EventComponents } from "../generated/v1beta3/event/Event";

/**
 * Helpers for the v1beta3 error construct (docs/error-definition-contract.md):
 * derive the flat `probableCause` / `suggestedRemediation` lists from nested
 * causes, and check the rules JSON Schema cannot state. Pure functions with
 * no runtime dependencies, mirrored by the Go helpers in
 * models/v1beta3/errorcode and models/v1beta3/event.
 */

type ErrorDefinition = ErrorComponents["schemas"]["ErrorDefinition"];
type ErrorReferenceIndex = ErrorComponents["schemas"]["ErrorReferenceIndex"];
type ProbableCause = ErrorComponents["schemas"]["ProbableCause"];
type Remediation = ErrorComponents["schemas"]["Remediation"];
type ActionPolicy = ErrorComponents["schemas"]["ActionPolicy"];
type EventError = EventComponents["schemas"]["EventError"];

/** The flat lists earlier consumers read, derived from nested causes. */
export interface FlattenedCauses {
  probableCause: string[];
  suggestedRemediation: string[];
}

/** One broken rule, with the JSON path of the value that breaks it. */
export interface ErrorContractViolation {
  path: string;
  message: string;
}

/**
 * Derives the flat lists from nested causes: each cause's description in
 * order, and each remediation's description walking causes then
 * remediations in order, with each remediation id kept the first time it
 * appears. An absent list yields two empty lists.
 */
export function flattenProbableCauses(causes: readonly ProbableCause[] | undefined): FlattenedCauses {
  const probableCause: string[] = [];
  const suggestedRemediation: string[] = [];
  const seen = new Set<string>();
  for (const cause of causes ?? []) {
    probableCause.push(cause.description);
    for (const remediation of cause.remediations) {
      if (seen.has(remediation.id)) continue;
      seen.add(remediation.id);
      suggestedRemediation.push(remediation.description);
    }
  }
  return { probableCause, suggestedRemediation };
}

/**
 * The policy a client acts on: the remediation's own, `manual` when it is
 * omitted, and `manual` for a value this version does not know, so a
 * remediation is never run by mistake.
 */
export function effectiveActionPolicy(remediation: Pick<Remediation, "actionPolicy">): ActionPolicy {
  const policy = remediation.actionPolicy as string | undefined;
  return policy === "automatic" || policy === "requiresApproval" ? policy : "manual";
}

function sameRemediation(a: Remediation, b: Remediation): boolean {
  return a.id === b.id && a.description === b.description && a.action === b.action && a.actionPolicy === b.actionPolicy;
}

function sameList(a: readonly string[] | undefined, b: readonly string[]): boolean {
  return a !== undefined && a.length === b.length && a.every((value, i) => value === b[i]);
}

/** Checks nested causes: unique cause ids, one remediation per id, and an action behind every policy that runs one. */
function causeViolations(causes: readonly ProbableCause[] | undefined, base: string): ErrorContractViolation[] {
  const violations: ErrorContractViolation[] = [];
  const causeIds = new Set<string>();
  const remediations = new Map<string, Remediation>();
  (causes ?? []).forEach((cause, i) => {
    const path = `${base}[${i}]`;
    if (causeIds.has(cause.id)) {
      violations.push({ path: `${path}.id`, message: `cause id "${cause.id}" is not unique` });
    }
    causeIds.add(cause.id);
    cause.remediations.forEach((remediation, j) => {
      const remPath = `${path}.remediations[${j}]`;
      const first = remediations.get(remediation.id);
      if (first === undefined) {
        remediations.set(remediation.id, remediation);
      } else if (!sameRemediation(first, remediation)) {
        violations.push({
          path: remPath,
          message: `remediation id "${remediation.id}" names two different remediations; a shared remediation is repeated with identical fields`,
        });
      }
      const policy = remediation.actionPolicy;
      if ((policy === "automatic" || policy === "requiresApproval") && !remediation.action) {
        violations.push({ path: `${remPath}.action`, message: `actionPolicy "${policy}" needs an action` });
      }
    });
  });
  return violations;
}

/** Checks that carried flat lists equal the derivation from nested causes. */
function flatListViolations(
  value: { probableCauses?: readonly ProbableCause[]; probableCause?: string[]; suggestedRemediation?: string[] },
  base: string,
): ErrorContractViolation[] {
  if (value.probableCauses === undefined) return [];
  const derived = flattenProbableCauses(value.probableCauses);
  const violations: ErrorContractViolation[] = [];
  if (value.probableCause !== undefined && !sameList(value.probableCause, derived.probableCause)) {
    violations.push({ path: `${base}probableCause`, message: "probableCause is not the list derived from probableCauses" });
  }
  if (value.suggestedRemediation !== undefined && !sameList(value.suggestedRemediation, derived.suggestedRemediation)) {
    violations.push({
      path: `${base}suggestedRemediation`,
      message: "suggestedRemediation is not the list derived from probableCauses",
    });
  }
  return violations;
}

/**
 * Checks the rules of an error definition that JSON Schema cannot state.
 * Returns every violation; an empty list means the definition follows the
 * contract. Validate the shape against the schema first.
 */
export function validateErrorDefinition(definition: ErrorDefinition, base = ""): ErrorContractViolation[] {
  const violations: ErrorContractViolation[] = [];
  const expected = `${definition.component.name}-${definition.numericCode}`;
  if (definition.code !== expected) {
    violations.push({ path: `${base}code`, message: `code "${definition.code}" is not "${expected}" (component name, hyphen, numericCode)` });
  }
  violations.push(...causeViolations(definition.probableCauses, `${base}probableCauses`));
  violations.push(...flatListViolations(definition, base));
  return violations;
}

/**
 * Checks an index: every definition, and each code once per component. Pass
 * `requireReferenceUrl` for the published index, where every entry is linked.
 */
export function validateErrorReferenceIndex(
  index: ErrorReferenceIndex,
  options: { requireReferenceUrl?: boolean } = {},
): ErrorContractViolation[] {
  const violations: ErrorContractViolation[] = [];
  const seen = new Set<string>();
  index.errors.forEach((definition, i) => {
    const base = `errors[${i}].`;
    violations.push(...validateErrorDefinition(definition, base));
    const key = `${definition.component.type}/${definition.component.name}/${definition.code}`;
    if (seen.has(key)) {
      violations.push({ path: `${base}code`, message: `code ${key} is listed more than once` });
    }
    seen.add(key);
    if (options.requireReferenceUrl && !definition.referenceUrl) {
      violations.push({ path: `${base}referenceUrl`, message: `${definition.code} has no referenceUrl` });
    }
  });
  return violations;
}

/**
 * Checks an event's `metadata.error`: the nested causes, the flat lists
 * against them, and that each matched cause is one of the event's causes
 * when it carries them.
 */
export function validateEventError(error: EventError): ErrorContractViolation[] {
  const violations = [...causeViolations(error.probableCauses, "probableCauses"), ...flatListViolations(error, "")];
  if (error.probableCauses !== undefined) {
    const ids = new Set(error.probableCauses.map((cause) => cause.id));
    (error.matchedCauses ?? []).forEach((match, i) => {
      if (!ids.has(match.causeId)) {
        violations.push({ path: `matchedCauses[${i}].causeId`, message: `matched cause "${match.causeId}" is not one of probableCauses` });
      }
    });
  }
  return violations;
}
