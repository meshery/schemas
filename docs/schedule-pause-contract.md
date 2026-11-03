# Organization schedule pause contract

The organization-wide schedule pause (`preferences.schedulePause`, schema
`SchedulePause` in `v1beta2/organization`) stops every schedule of an
organization from being claimed. It can be set or lifted two ways:

| Operation | Writes | Gate |
| --- | --- | --- |
| `updateOrgSchedulePause` (`PUT /api/identity/orgs/{orgId}/schedule-pause`) | `schedulePause` and nothing else | The key Pause schedules (Workflow Management / Schedules), in the Schedule Edit keychain, seeded to the organization admin role |
| `patchOrgPreferences` | One or more organization preferences, including branding and links | The same gate as `updateOrg` for every member; changing `schedulePause` also requires organization admin |
| `updateOrg` | The organization and its preferences, including branding and links | Changing `schedulePause` requires organization admin |

## Why a second operation

An OAuth scope is a keychain, and a keychain narrows keys, not role checks.
`patchOrgPreferences` and `updateOrg` can also write the organization's sign-in
branding and links, and their change to `schedulePause` is role-gated, so a
scope that carries either reaches more than the pause. `updateOrgSchedulePause`
writes the pause alone and is gated by its own key, so the `schedule:write`
scope can carry it. That scope also carries Create schedule and Edit schedule
(`build/oauth-scopes.json`), so it is not a pause-only credential. The operation
stays without `x-mcp` until the hosted server exposes the pause;
`patchOrgPreferences` is never annotated.

## Contract

- The body is the existing closed `SchedulePausePayload` (`paused` required,
  `reason` optional). An echoed `pausedAt` or `pausedBy` is refused with `400`.
  The response is the existing `SchedulePause`. Neither schema is redefined.
- `paused: true` pauses every schedule and the server records `pausedAt` and
  `pausedBy`. `paused: false` lifts the pause and clears `reason`, `pausedAt`
  and `pausedBy`, the same as lifting it through the preferences.
- The call is idempotent: sending the state the organization is in succeeds and
  returns it.
- The key Pause schedules is seeded to the organization admin role. It is in
  the `schedule:write` keychain, so a token with that scope can use it when its
  user holds the key.
- It is not a `/pause` route: pause state stays data, and the path is the
  sub-resource `schedule-pause`.
- `x-internal: ["cloud"]`.

Consumers: Cloud serves the route, checks the key in the organization named by
`orgId`, and keeps the organization admin gate on `updateOrg` and
`patchOrgPreferences` unchanged.
