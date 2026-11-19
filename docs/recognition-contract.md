# Recognition contract

`schemas/constructs/v1beta3/recognition` describes peer recognition responses.
Today it holds one read-only route, the Community Guide candidates list.

## Community Guide candidates

`GET /api/identity/recognition/community-guide/candidates?month=YYYY-MM`

- The caller must be a Provider Admin.
- `month` is a UTC calendar month; it defaults to the previous UTC month.
- Recipients with at least `minGivers` distinct kudos givers in the month are
  listed, most givers first. `minGivers` is server configuration.
- `candidates` are recipients resolved to a Layer5 user. `needsInfo` are
  recipients that could not be resolved (unknown or unlinked identity, or a
  provider with no resolver yet, such as Slack). Ask those people for the
  missing link when the recognition is presented.
- The route only lists. A maintainer awards the badge through the existing
  badge assignment route, which is idempotent.
