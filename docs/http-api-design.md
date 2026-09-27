# HTTP API Design Principles

> Detailed reference extracted from the top-level agent instructions
> (`AGENTS.md` / `CLAUDE.md`). These rules govern how endpoints are
> structured and are enforced in part by `make validate-schemas`.

## HTTP method semantics

| Use case | Method | Example |
|---|---|---|
| Create a resource | `POST` | `POST /api/workspaces` → 201 |
| Upsert a resource | `POST` | `POST /api/keys` → 200 |
| Update an existing resource | `PUT` or `PATCH` | `PUT /api/workspaces/{workspaceId}` → 200 |
| Non-CRUD action on a resource | `POST` to a sub-resource path | `POST /api/invitations/{invitationId}/accept` |
| Bulk delete | `POST` to a `/delete` sub-resource | `POST /api/designs/delete` → 200 |
| Single delete | `DELETE` | `DELETE /api/keys/{keyId}` → 204 |

**Do NOT use `DELETE` with a request body for bulk operations.** REST semantics do not define a request body for `DELETE`; many HTTP clients and proxies strip it silently. Use a `POST /api/{resources}/delete` sub-resource instead:

```yaml
# WRONG - DELETE with a request body
delete:
  operationId: deletePatterns
  requestBody:
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/PatternIds'

# CORRECT - POST sub-resource for bulk delete
post:
  operationId: deletePatterns
  summary: Bulk delete patterns by ID
  requestBody:
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/PatternIds'
  responses:
    "200":
      description: Patterns deleted
```

## HTTP response codes

| Code | Meaning | When to use |
|---|---|---|
| 200 | OK | Request succeeded; body contains the result (queries, upserts, actions) |
| 201 | Created | A new resource was created; body contains the new resource |
| 202 | Accepted | Request received; operation will complete asynchronously |
| 204 | No Content | Request succeeded; no response body (e.g., a single-resource `DELETE`) |

Use **201** (not 200) for `POST` endpoints that exclusively create a new resource. Use **200** for upsert operations where the resource may already exist.

Response descriptions and response message text must not include the word `successfully`. Use neutral wording such as `Connection deleted`, `Webhook processed`, or `Plans response`.

## Resource grouping and path structure

Endpoints are grouped into logical categories under `/api`:

| Category prefix | Domain |
|---|---|
| `/api/identity/` | Users, orgs, roles, teams, invitations |
| `/api/integrations/` | Connections, environments, credentials |
| `/api/content/` | Designs, views, components, models |
| `/api/entitlement/` | Plans, subscriptions, features |
| `/api/auth/` | Tokens, keychains, keys |
| `/api/system/` | Operational endpoints (database, version, session sync, adapters, meshsync, telemetry config, file IO, GraphQL transport) |

New endpoints must be placed in the appropriate category. Path segments must be kebab-case plural nouns matching the resource name.

### Declared paths are absolute - there is no implicit `/api` prefix

The path key in `api.yml` is the **complete path the server serves**, `/api` included. Nothing in
the bundler, the Go generator, or the RTK generator prepends a prefix at build time: whatever the
key says is verbatim what the generated client requests.

Getting this wrong does not fail the build and does not fail schema validation. It produces a
generated client that compiles, type-checks, and 404/405s at runtime against every environment.
That is exactly how `meshery/schemas#1123` happened - the v1beta3 event write operations were
declared as `/events*` while meshery-cloud serves them under `/api/events*`, so once meshery-cloud
switched from its hand-authored endpoint to the generated `useCreateEventMutation`, every
`create_session` audit event silently 405'd for three weeks.

Before adding or editing a path, confirm the served route in the consumer. In meshery-cloud, Echo
groups supply the prefix, so the registration line alone is not the served path:

```go
authedAPI := s.e.Group("/api")        // every route below is served under /api
authedAPI.POST("/events", ...)        // served path: /api/events
s.e.POST("/user/schedules", ...)      // served path: /user/schedules - no group, no prefix
```

`make consumer-audit` cross-checks declared paths against the routes it parses out of the consumer
repos. A path declared with the wrong prefix shows up on **both** sides of that report - as
`Spec only (no handlers)` for the path you declared, and as `Handler only (no spec)` for the path
the server actually serves. Two entries that differ only by a leading `/api` are that defect, not
two unrelated gaps.

`/api` is the convention for the authenticated API surface, but it is not universal. The
`schedule` construct's `/user/schedules` paths are declared without it because the server
genuinely registers them on the bare router outside the `/api` group. Match the server; do not
add `/api` reflexively.

Most `/api/system/` operations are Meshery-only (`x-internal: ["meshery"]`); they act on the running Meshery server instance itself rather than on a user-facing logical construct. Existing shared exceptions must be annotated truthfully, such as public version metadata exposed by both Meshery and Meshery Cloud. Some pre-existing `/api/system/*` paths use singular nouns (e.g. `/api/system/database`) and embed verbs (e.g. `/api/system/database/reset`); these predate the canonical kebab-case-plural convention and are documented as-implemented. New `/api/system/*` paths should still follow the canonical conventions.

### One domain, two servers - declare separate operations

Meshery Server and Meshery Cloud both serve events, designs and connections, but not always at
the same path or with the same envelope. When they differ, declare **separate operations**, one
per server, each `x-internal`-scoped to the consumer that serves it. Do not widen an existing
operation's `x-internal` to cover the other consumer.

Widening is tempting because it makes a generated hook appear in the other client, which looks
like the migration is done. It is not: `x-internal: ["meshery"]` asserts that **Meshery Server
serves this path with this response**, and the generated hook requests exactly that path. If the
server does not serve it, the hook 404s, and nothing in the build, `make validate-schemas`, or
the RTK generator notices.

The events construct is the worked example. Meshery Server and Cloud disagree on both halves:

| | Cloud | Meshery Server |
|---|---|---|
| List | `GET /api/events/list`, page under `data` | `GET /api/system/events`, page under `events` |
| Types | `GET /api/events/types`, array of category/action pairs | `GET /api/system/events/types`, one object of two string arrays |

So `v1beta3/event` declares `getEvents`/`getEventTypes` for Cloud and `getSystemEvents`/
`getSystemEventTypes` for Meshery, with their own response schemas. Meshery Server *calls* the
Cloud paths as a client of the remote provider (`server/models/remote_provider.go`), which is not
the same thing as serving them.

`make consumer-audit` is the check. Run it with `MESHERY_REPO` and `CLOUD_REPO` pointed at local
checkouts and read the per-consumer **Spec without consumer handler** count: an operation
declared for a consumer that does not serve it lands there. The count is advisory and the CI
Schema Audit passes regardless, so read the number rather than the badge.

See meshery/schemas#1134 for the standing list of events operations declared for Meshery at
paths Meshery Server does not serve.
