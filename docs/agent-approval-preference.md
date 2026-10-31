# Agent approval preference

`Preference` (`schemas/constructs/v1beta3/user`) gains a typed boolean,
`agentsActWithoutApproval`. It states whether writes made by AI apps (agents) on
the user's behalf take effect without the user approving them first. The name is
product neutral and stays.

- **Absent or false (the default):** agent writes land unapproved and wait for
  the user's approval. No tool can approve; approval is a human act.
- **True:** agent writes take effect without waiting.

The field is optional. The schema declares no `default`, on purpose: the
precedence below needs absence to stay distinguishable from `false`.

## Where it is defined

The field is defined only on `v1beta3` `Preference`, which carries it on read.
There is no `v1beta2` copy: `v1beta2` `PreferencePayload`, the body of
`updateUserPreferences` (`PUT /api/identity/users/preferences`), does not
declare it, so that write cannot set it.

## Migration from the free-form value

Before this field, a provider stored the flag in the free-form
`remoteProviderPreferences.<provider>.agentsActWithoutApproval`. That
`remoteProviderPreferences` object is **not removed**.

For one release after this field ships:

1. **Precedence.** If the typed `agentsActWithoutApproval` is present (true or
   false), it is the answer. The free-form value is not consulted.
2. If the typed field is absent, a reader may fall back to the free-form value.
3. If both are absent, the answer is false.

Writers move to the typed field. Servers may copy a free-form value into the
typed field on the user's next preferences write; they must not write the
free-form value again. After the release, the free-form value is no longer read
and may be deleted from stored preferences.

The free-form object stays `additionalProperties: true`, so no stored value
becomes invalid.
