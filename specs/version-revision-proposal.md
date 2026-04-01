# API Version Revision Proposal

## Current State

| Version | Constructs | Status | Generated Code | Validated |
|---|---|---|---|---|
| v1alpha1 | 3 (core, capability, catalog_data) | Foundation — referenced by all others | Go + TS | No |
| v1alpha2 | 1 (catalog) | Single-purpose — CatalogData for designs | Go + TS | No |
| v1alpha3 | 2 (relationship, selector) | Domain — relationship definitions | Go + TS | No |
| v1beta1 | 27 constructs | Production API surface | Go + TS | Yes |
| v1beta2-draft | 2 (catalog_data, draft schema) | Experimental | None | Yes (empty) |

**Dependency graph:**
```
v1beta1 (27 constructs)
  ├── v1alpha1/core (370+ $ref cross-references from 22 of 27 constructs)
  ├── v1alpha2/catalog (1 construct: design)
  └── v1alpha3/relationship (1 construct: design)
```

**Outstanding v1beta1 issues:** 26 advisory violations (16 casing, 3 path-segment, 3 response-code, 2 query-param, 1 pagination, 1 duplicate).

---

## Proposed Version Map

### Tier 1: Promote `v1alpha1/core` → `v1beta1/core`

**Rationale:** Core is the foundation of the entire schema ecosystem. Every v1beta1 construct depends on it. It is mature, stable, and has not changed structurally in over a year. Keeping it at alpha while its consumers are beta is misleading — it implies instability that does not exist.

**Scope:**
- Move `schemas/constructs/v1alpha1/core/` → `schemas/constructs/v1beta1/core/`
- Move `models/v1alpha1/core/` → `models/v1beta1/core/`
- Move `typescript/generated/v1alpha1/core/` → `typescript/generated/v1beta1/core/`
- Update all 370+ `$ref` paths across 22 v1beta1 api.yml files
- Update all Go imports: `corev1alpha1` → `corev1beta1` (alias) or `core` (same-version, no alias needed)
- Update all TypeScript imports
- Update `build/lib/config.js` exclusion list
- Update `DB_MIRRORED_FIELDS` and any hardcoded `v1alpha1` references in build scripts

**Casing cleanup during promotion:**
- `page_size` / `total_count` — keep as-is (published contract, discussed separately)
- `recordsPage` / `resultsPage` — rename to `RecordsPage` / `ResultsPage` (PascalCase schema names)
- Review all 40+ shared type names for PascalCase compliance

**Downstream impact:**
- meshery/meshery: Update all Go imports from `models/v1alpha1/core` → `models/v1beta1/core`
- meshery-cloud: Same import path update
- Both repos: Search-replace on import aliases

**Risk:** Medium. Mechanical refactor — no wire-format changes. All downstream breakage is compile-time (wrong import path), not runtime.

---

### Tier 2: Promote `v1alpha2/catalog` → `v1beta1/catalog`

**Rationale:** Catalog is consumed by v1beta1/design. Its only consumer is already beta. The schema is stable.

**Scope:**
- Move `schemas/constructs/v1alpha2/catalog/` → `schemas/constructs/v1beta1/catalog/`
- Move `models/v1alpha2/catalog/` → `models/v1beta1/catalog/`
- Update `$ref` in `v1beta1/design/api.yml`
- Update Go import in design package

**Downstream impact:** Minimal. Only the design construct references it.

**Risk:** Low.

---

### Tier 3: Promote `v1alpha3/relationship` → `v1beta1/relationship`

**Rationale:** Relationships are a core Meshery concept used in design evaluation. The schema has been stable since July 2024. Promoting to beta signals it is production-ready.

**Scope:**
- Move `schemas/constructs/v1alpha3/relationship/` → `schemas/constructs/v1beta1/relationship/`
- Move `schemas/constructs/v1alpha3/selector/` → `schemas/constructs/v1beta1/selector/`
- Move `models/v1alpha3/relationship/` → `models/v1beta1/relationship/`
- Update `$ref` in `v1beta1/design/design.yaml`
- Update schema version string: `relationships.meshery.io/v1alpha3` → `relationships.meshery.io/v1beta1`
- Update Go imports

**Casing note:** The relationship schema uses `evaluationQuery`, `mutatorRef`, `mutatedRef` (already camelCase). No casing migration needed.

**Downstream impact:** meshery/meshery uses relationship types extensively. Import path changes are compile-time.

**Risk:** Medium. The schema version string change (`v1alpha3` → `v1beta1`) affects any code that checks version strings at runtime.

---

### Tier 4: Promote `v1alpha1/capability` → `v1beta1/capability`

**Rationale:** Capability is excluded from the merged OpenAPI spec but has generated Go and TypeScript code. It should move alongside core for consistency.

**Scope:**
- Move `schemas/constructs/v1alpha1/capability/` → `schemas/constructs/v1beta1/capability/`
- Move `models/v1alpha1/capability/` → `models/v1beta1/capability/`
- Update exclusion list in config.js

**Downstream impact:** Low. Capability types are used by component schemas.

**Risk:** Low.

---

### Tier 5: Increment `v1beta1` → `v1beta2` for constructs with wire-format fixes

**Rationale:** PR #676 identified multiple wire-format issues in v1beta1 schemas (snake_case fields without db backing, mixed casing, incorrect response codes). The casing rules document establishes that partial migrations within the same version are forbidden. A version bump to v1beta2 is the correct vehicle for these fixes.

**What changes in v1beta2:**
1. Fix all 16 casing violations (academy Quiz fields, connection sub_type, subscription parameters)
2. Fix 3 path-segment violations (`/api/academy/Curricula` → `/api/academy/curricula`, `upgradePreview` → `upgrade-preview`)
3. Fix 3 response code violations (POST create → 201)
4. Fix 2 query parameter naming violations (`token_id` → `tokenId`, `user_id` → `userId`)
5. Resolve `page_size`/`total_count` — either migrate to camelCase or add explicit `db:` tags to justify snake_case
6. Add missing pagination parameters to `GET /api/entitlement/plans`

**Constructs that need v1beta2:**

| Construct | Issues | Breaking Changes |
|---|---|---|
| academy | 16 property renames, 2 path renames | Yes — Quiz field names, path URLs |
| connection | 1 property rename (sub_type in Payload) | Yes — ConnectionPayload wire format |
| subscription | 1 path rename, 1 response code, 2 param renames | Yes — query params, path URL |
| event | 1 response code | Yes — 200 → 201 |
| invitation | 1 response code | Yes — 200 → 201 |
| plan | 1 missing pagination | Minor — additive |
| token | 2 param renames | Yes — query param wire names |

**Constructs that stay v1beta1 (no breaking changes needed):**
- badge, category, component, credential, design, environment, evaluation, feature, key, keychain, model, organization, role, schedule, subcategory, team, user, workspace

**Approach:** Create v1beta2 schemas for the 7 affected constructs. Keep v1beta1 schemas unchanged for backward compatibility. Downstream consumers migrate at their own pace.

---

### Tier 6: Remove `v1beta2-draft` directory

**Rationale:** The current v1beta2-draft contains 2 preliminary YAML files with no api.yml, no generated code, and no consumers. With a proper v1beta2 being introduced for the constructs above, the draft directory should be removed to avoid confusion.

**Scope:** Delete `schemas/constructs/v1beta2-draft/`.

---

## Execution Order

The tiers are ordered by dependency and risk:

```
Phase 1 (foundation):  Tier 1 (core → v1beta1) + Tier 4 (capability → v1beta1)
Phase 2 (domain):      Tier 2 (catalog → v1beta1) + Tier 3 (relationship → v1beta1)
Phase 3 (cleanup):     Tier 6 (remove v1beta2-draft)
Phase 4 (increment):   Tier 5 (v1beta1 → v1beta2 for 7 constructs)
```

Phase 1 and 2 can be done in a single PR — they are mechanical refactors with no wire-format changes. Phase 4 is the wire-format breaking change and requires coordinated deployment across meshery/meshery and meshery-cloud.

---

## Post-Revision Version Map

| Version | Constructs | Role |
|---|---|---|
| v1beta1 | core, capability, catalog, relationship, selector + 20 unchanged constructs | Stable production API |
| v1beta2 | academy, connection, subscription, event, invitation, plan, token | Wire-format-corrected API |

All alpha versions eliminated. Every construct is beta.

---

## Downstream Migration Checklist

### meshery/meshery
- [ ] Update Go imports: `models/v1alpha1/core` → `models/v1beta1/core`
- [ ] Update Go imports: `models/v1alpha2/catalog` → `models/v1beta1/catalog`
- [ ] Update Go imports: `models/v1alpha3/relationship` → `models/v1beta1/relationship`
- [ ] Update schema version string checks for relationships
- [ ] For v1beta2 constructs: update API response code expectations (200 → 201)
- [ ] For v1beta2 constructs: update query parameter names in API calls
- [ ] For v1beta2 constructs: update frontend field access patterns

### layer5io/meshery-cloud
- [ ] Same Go import updates as meshery/meshery
- [ ] For v1beta2 constructs: update API handlers for new response codes
- [ ] For v1beta2 constructs: update frontend for renamed fields
- [ ] For v1beta2 constructs: update Pop model field access if applicable

### meshery/schemas
- [ ] Update `VALIDATED_VERSIONS` in validate-schemas.js to include v1beta2
- [ ] Update `build/lib/config.js` exclusion list for promoted constructs
- [ ] Update `DB_MIRRORED_FIELDS` if pagination fields change
- [ ] Update advisory baseline for v1beta2 known issues
- [ ] Regenerate all Go and TypeScript for promoted constructs
- [ ] Update `typescript/index.ts` exports for new version paths
- [ ] Update `specs/casing-rules.md` with v1beta2 policy
- [ ] Update `AGENTS.md` with v1beta2 guidance

---

## Decisions (Resolved)

1. **page_size / total_count:** Do NOT migrate to camelCase. Do NOT add empty database columns. These remain as published contract fields with snake_case — a documented exception enforced by Rule 33.

2. **Relationship schema version string:** Yes — change `relationships.meshery.io/v1alpha3` → `relationships.meshery.io/v1beta1`.

3. **v1beta1 backward compatibility:** Keep old v1beta1 schemas alongside v1beta2. Mark the 7 migrated v1beta1 constructs as deprecated.

4. **npm package version:** Bump to 1.0.0.

5. **Timeline:** Phase 1-3 ship immediately. Phase 4 follows with coordinated deployment.
