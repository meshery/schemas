import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import type { components } from "../generated/v1beta3/schedule/Schedule.js";

type YamlNode = Record<string, any>;

function loadYaml(absPath: string): YamlNode {
  return yaml.load(fs.readFileSync(absPath, "utf-8")) as YamlNode;
}

test("SchedulePayload schema and generated TypeScript types allow omitting visibility", () => {
  const repoRoot = process.cwd();
  const scheduleApiAbs = path.resolve(repoRoot, "schemas/constructs/v1beta3/schedule/api.yml");
  const scheduleEntityAbs = path.resolve(repoRoot, "schemas/constructs/v1beta3/schedule/schedule.yaml");

  const apiDoc = loadYaml(scheduleApiAbs);
  const entityDoc = loadYaml(scheduleEntityAbs);

  // 1. Verify ScheduleVisibility enum definition
  const visibilitySchema = apiDoc.components.schemas.ScheduleVisibility;
  assert.deepEqual(
    visibilitySchema.enum,
    ["public", "org", "private"],
    "expected ScheduleVisibility enum to be ['public', 'org', 'private']",
  );
  assert.equal(
    visibilitySchema.default,
    undefined,
    "ScheduleVisibility enum should not specify default: public so referencing payloads keep visibility optional",
  );

  // 2. Verify SchedulePayload schema contract
  const payloadSchema = apiDoc.components.schemas.SchedulePayload;
  assert.ok(payloadSchema.properties.visibility, "SchedulePayload must define visibility property");
  assert.ok(
    !payloadSchema.required.includes("visibility"),
    "SchedulePayload must not list visibility in required fields",
  );

  // 3. Verify Schedule response entity schema contract
  const entityVisibility = entityDoc.properties.visibility;
  assert.equal(
    entityVisibility.default,
    "public",
    "Schedule entity response schema must define default: public",
  );
  assert.ok(
    entityDoc.required.includes("visibility"),
    "Schedule entity response schema must require visibility",
  );
  assert.equal(
    entityVisibility["x-oapi-codegen-extra-tags"]?.db,
    "visibility",
    "Schedule entity visibility must map to db: visibility",
  );

  // 4. Verify generated TypeScript SchedulePayload allows omitting visibility
  type SchedulePayload = components["schemas"]["SchedulePayload"];
  const minimalPayload: SchedulePayload = {
    name: "Nightly Evaluation",
    action: "evaluation",
  };
  assert.equal(minimalPayload.visibility, undefined);

  const fullPayload: SchedulePayload = {
    name: "Nightly Evaluation",
    action: "evaluation",
    visibility: "private",
  };
  assert.equal(fullPayload.visibility, "private");
});

test("PublicActivityFeedItem response schema requires visibility enum ['public'] and never exposes PII", () => {
  const repoRoot = process.cwd();
  const scheduleApiAbs = path.resolve(repoRoot, "schemas/constructs/v1beta3/schedule/api.yml");
  const apiDoc = loadYaml(scheduleApiAbs);

  const feedItem = apiDoc.components.schemas.PublicActivityFeedItem;
  assert.equal(feedItem.additionalProperties, false);

  const required = new Set(feedItem.required);
  for (const field of ["userId", "platform", "roleResult", "completedAt", "visibility"]) {
    assert.ok(required.has(field), `PublicActivityFeedItem must require '${field}'`);
  }

  assert.deepEqual(
    feedItem.properties.visibility.enum,
    ["public"],
    "PublicActivityFeedItem.visibility must restrict enum to ['public']",
  );

  for (const banned of ["email", "emails", "mail", "firstName", "lastName", "password", "token"]) {
    assert.ok(
      !(banned in feedItem.properties),
      `PublicActivityFeedItem must NEVER expose PII field '${banned}'`,
    );
  }
});
