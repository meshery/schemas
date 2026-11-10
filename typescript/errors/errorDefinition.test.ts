import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  effectiveActionPolicy,
  flattenProbableCauses,
  validateErrorDefinition,
  validateErrorReferenceIndex,
  validateEventError,
} from "./errorDefinition.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

function template<T = any>(construct: string, name: string): T {
  const path = join(root, "schemas/constructs/v1beta3", construct, "templates", `${name}_template.json`);
  return JSON.parse(readFileSync(path, "utf-8")) as T;
}

test("the acceptance sample flattens to the lists it carries, the shared remediation once", () => {
  const definition = template("error", "error");
  const flat = flattenProbableCauses(definition.probableCauses);
  assert.deepEqual(flat.probableCause, definition.probableCause);
  assert.deepEqual(flat.suggestedRemediation, definition.suggestedRemediation);
  assert.equal(flat.suggestedRemediation.length, 3);
  assert.deepEqual(validateErrorDefinition(definition), []);
});

test("flattening nothing yields two empty lists", () => {
  assert.deepEqual(flattenProbableCauses(undefined), { probableCause: [], suggestedRemediation: [] });
});

test("validateErrorDefinition reports each broken rule at its path", () => {
  const cases: Array<[string, (d: any) => void, string]> = [
    ["code mismatch", (d) => (d.code = "meshkit-1033"), "code"],
    ["duplicate cause id", (d) => (d.probableCauses[1].id = d.probableCauses[0].id), "probableCauses[1].id"],
    [
      "shared id, different text",
      (d) => (d.probableCauses[1].remediations[1].description = "Something else."),
      "probableCauses[1].remediations[1]",
    ],
    [
      "automatic without action",
      (d) => delete d.probableCauses[1].remediations[0].action,
      "probableCauses[1].remediations[0].action",
    ],
    ["flat lists out of order", (d) => d.probableCause.reverse(), "probableCause"],
  ];
  for (const [name, mutate, path] of cases) {
    const definition = template("error", "error");
    mutate(definition);
    const violations = validateErrorDefinition(definition);
    assert.ok(
      violations.some((v) => v.path === path),
      `${name}: got ${JSON.stringify(violations)}, want a violation at ${path}`,
    );
  }
});

test("an unpaired legacy definition has nothing to cross-check", () => {
  assert.deepEqual(
    validateErrorDefinition({
      code: "meshery-server-1001",
      moniker: "ErrCreatingUUIDInstanceCode",
      component: { type: "component", name: "meshery-server" },
      numericCode: "1001",
      probableCause: ["a"],
      suggestedRemediation: ["b", "c"],
    }),
    [],
  );
});

test("an unknown or omitted policy is manual", () => {
  assert.equal(effectiveActionPolicy({}), "manual");
  assert.equal(effectiveActionPolicy({ actionPolicy: "automatic" }), "automatic");
  assert.equal(effectiveActionPolicy({ actionPolicy: "requiresApproval" }), "requiresApproval");
  assert.equal(effectiveActionPolicy({ actionPolicy: "always" as never }), "manual");
});

test("the index template validates, and a repeated code or missing link is reported", () => {
  const index = template("error", "error_reference_index");
  assert.deepEqual(validateErrorReferenceIndex(index, { requireReferenceUrl: true }), []);
  const repeated = { ...index, errors: [...index.errors, index.errors[0]] };
  assert.ok(validateErrorReferenceIndex(repeated).some((v) => v.message.includes("more than once")));
  const unlinked = structuredClone(index);
  delete unlinked.errors[0].referenceUrl;
  assert.deepEqual(validateErrorReferenceIndex(unlinked), []);
  assert.ok(validateErrorReferenceIndex(unlinked, { requireReferenceUrl: true }).some((v) => v.path === "errors[0].referenceUrl"));
});

test("an event error naming one matched cause validates; an unknown cause does not", () => {
  const error = template("event", "event_error");
  assert.equal(error.matchedCauses.length, 1);
  assert.deepEqual(validateEventError(error), []);
  error.matchedCauses[0].causeId = "not-a-cause";
  assert.deepEqual(
    validateEventError(error).map((v) => v.path),
    ["matchedCauses[0].causeId"],
  );
});

test("an unpaired event error validates", () => {
  assert.deepEqual(validateEventError(template("event", "event_error_unpaired")), []);
});
