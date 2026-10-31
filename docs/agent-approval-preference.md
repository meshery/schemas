# Agent approval preference

`Preference` (`schemas/constructs/v1beta3/user`) gains a typed boolean,
`agentsActWithoutApproval`. It is one profile-level source in the approval
hierarchy for agent writes: it applies only to activities written by AI apps
(agents), and only when the activity inherits. The name is product neutral and
stays.

## Where the decision lives

Each activity on the v1beta3 content item carries `approvalPolicy`, one of
`required`, `not_required` or `inherit`. The schema declares no default. An
absent `approvalPolicy` is treated exactly like `inherit`.

`approvalPolicy` only says whether approval is needed. AI apps never set
`approved`: approval is a human act, and no tool can approve an agent write.

## Interim behavior

Until the upstream platform, workspace and profile policies exist, the
interim rule applies, and it is temporary:

- **`inherit`, including an absent `approvalPolicy`, resolves to `required`.**
  This holds whatever `agentsActWithoutApproval` says, `true` included.
- **An explicit `required` or `not_required` still wins**, as in the target model.

So during the interim the preference is stored and writable through
`updateUserPreferences`, but it is **not consulted by approval resolution**.
It becomes the profile-level source once the hierarchy places that level. The
hierarchy proposal is <https://github.com/layer5io/meshery-cloud/issues/6365>.
The interim does not wait on that issue: this PR is not blocked on it.

The owner confirmed this interim default. It is not a decision on the hierarchy
itself, and the target model below stays the intended future behavior.

## How an agent write resolves

The steps below are the target model. Until the interim rule ends, see
[Interim behavior](#interim-behavior).

1. **An explicit `required` or `not_required` on the activity wins.** Nothing
   higher overrides it, and the preference is not consulted.
2. **`inherit`, or absent, inherits from higher-level settings** (platform,
   workspace, profile). The hierarchy, and the order in which those levels
   decide, is defined in
   <https://github.com/layer5io/meshery-cloud/issues/6365>. This document does
   not fix an order.
3. **The profile-level source is `agentsActWithoutApproval`.** It is consulted
   only for an activity written by an AI app, and only if no level the
   hierarchy places ahead of it has already decided:
   - `true` resolves to `not_required`: the agent write takes effect without
     waiting.
   - `false` resolves to `required`: the agent write waits for the user's
     approval.
   - Absent sets nothing, and the resolution continues to the fallback.
4. **Final fallback: `required`** (fail closed) when nothing above set a value.
   This fallback is still open for confirmation in
   <https://github.com/layer5io/meshery-cloud/issues/6365>.

The field is optional. The schema declares no `default`, on purpose: step 3
needs absence to stay distinguishable from `false`.

The table shows the target model's outcome for an activity when no level ahead
of the profile decides. A person's write never consults the preference. Under
the interim rule, every `inherit` or unset row resolves to `required`.

| Activity `approvalPolicy`  | Written by | Preference | Resolves to   |
| -------------------------- | ---------- | ---------- | ------------- |
| `required`                 | AI app     | `true`     | `required`    |
| `not_required`              | AI app     | `false`    | `not_required` |
| `inherit`                  | AI app     | `true`     | `not_required` |
| `inherit`                  | AI app     | `false`    | `required`    |
| `inherit`                  | AI app     | absent     | `required`    |
| unset (behaves as `inherit`) | AI app   | `true`     | `not_required` |
| `inherit`                  | person     | `true`     | `required`    |

## Where it is defined and how it is written

The field is defined on `v1beta3` `Preference`, which carries it on read, and
on `v1beta3` `PreferencePayload`, the body of `updateUserPreferences`
(`PUT /api/identity/users/preferences`). Writers set it there:

```json
{ "agentsActWithoutApproval": true }
```

The field is nullable on the write, and the write has three states:

| Payload value                     | Effect on the stored value                    |
| --------------------------------- | --------------------------------------------- |
| `true` or `false`                 | Stores that value.                            |
| `null`                            | Clears it back to absent (inherit).          |
| omitted                           | Keeps the stored value, or its absence.       |

The schema declares no `default`, so an omitted field is never read as `false`.
A `null` on the write is not a default: it removes the stored value. On read,
absent means not set (inherit), and the stored value is never `null`.

The generated Go field is a pointer, so a Go server cannot tell `null` from an
omitted key by decoding into the struct. A server must check the raw body for
the key's presence before it treats an absent pointer as "keep" rather than
"clear".

The operation answers `201` with no body on success, as before, and `403` in the
cases below.

## Who can write it

Only a request authenticated by the person's signed-in session can change
`agentsActWithoutApproval`. A request authenticated by an API token, of any kind,
cannot. That covers a token issued to an OAuth client or MCP app, and a user's
personal API token from `generateToken`.

The discriminator is how the request is authenticated: a token or a session. It
is not the token's `isOauth` flag, and it is not the token's scopes.

- A token-authenticated request whose payload sends a value that differs from
  the stored state (`true`, `false`, or absent for `null`) answers `403` and
  changes nothing. No part of the payload is applied, not even the other fields.
- Sending back the stored state is accepted. That includes `null` while the
  value is absent.
- The same `403` applies to the free-form value. A token-authenticated request
  that would change the stored state of any
  `remoteProviderPreferences.<provider>.agentsActWithoutApproval` entry (a
  different value, adding it where absent, or removing it where present) answers
  `403`, with the same no-partial-apply rule. Writing back the stored entry
  unchanged is accepted, as it is for the typed field. See
  [Migration from the free-form value](#migration-from-the-free-form-value).

This keeps an agent from granting itself `not_required` approval by writing the
preference. The rule is enforced by the server on each request, not by the
token's scopes.

`updateUserPreferences` moved from `v1beta2` `user` to `v1beta3` `user` with
the same route, `operationId`, merge rule and response, so a client calling
that route is unchanged. Only the `v1beta3` operation is declared. `v1beta2`
`PreferencePayload` stays declared, marked deprecated, so existing users of
its generated type still build. It does not declare the field: a server
decoding the body into it would drop `agentsActWithoutApproval`, so servers
decode the `v1beta3` `PreferencePayload`.

## Migration from the free-form value

Before this field, a provider stored the flag in the free-form
`remoteProviderPreferences.<provider>.agentsActWithoutApproval`. That
`remoteProviderPreferences` object is **not removed**.

For one release after this field ships, once approval resolution consults the
profile level (during the interim neither the typed field nor the free-form
value is consulted, so an AI app's `inherit` write always needs approval):

1. **Precedence.** If the typed `agentsActWithoutApproval` is present (true or
   false), it is the answer. The free-form value is not consulted.
2. If the typed field is absent, a reader may fall back to the free-form value.
3. If both are absent, the preference sets nothing, and the resolution falls
   through to the final fallback, `required`.

Writers move to the typed field and set it through `updateUserPreferences`
as above. Servers may copy a free-form value into the
typed field on the user's next preferences write made from the signed-in
session; they must not write the free-form value again. A token-authenticated
write never performs that copy, because the copy changes the typed value, which
[Who can write it](#who-can-write-it) forbids to a token. A token-authenticated
request that would change the stored state of a provider's free-form
`agentsActWithoutApproval` (a different value, adding it where absent, or
removing it where present) is answered `403`, as for the typed field. Writing
back the stored entry unchanged is accepted. After the
release, the free-form value is no longer read and may be deleted from stored
preferences.

The free-form object stays `additionalProperties: true`, so no stored value
becomes invalid.
