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
# WRONG — DELETE with a request body
delete:
  operationId: deletePatterns
  requestBody:
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/PatternIds'

# CORRECT — POST sub-resource for bulk delete
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

Most `/api/system/` operations are Meshery-only (`x-internal: ["meshery"]`); they act on the running Meshery server instance itself rather than on a user-facing logical construct. Existing shared exceptions must be annotated truthfully, such as public version metadata exposed by both Meshery and Meshery Cloud. Some pre-existing `/api/system/*` paths use singular nouns (e.g. `/api/system/database`) and embed verbs (e.g. `/api/system/database/reset`); these predate the canonical kebab-case-plural convention and are documented as-implemented. New `/api/system/*` paths should still follow the canonical conventions.
