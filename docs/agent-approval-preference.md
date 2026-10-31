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

The write merges: a payload that leaves the field out keeps the stored value
(or its absence), `true` or `false` stores that value. The operation answers
`201` with no body, as before.

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
typed field on the user's next preferences write; they must not write the
free-form value again. After the release, the free-form value is no longer read
and may be deleted from stored preferences.

The free-form object stays `additionalProperties: true`, so no stored value
becomes invalid.
