# Feature entitlement contract

`FeatureName` (`schemas/constructs/v1beta1/feature/api.yml`) is the closed set
of entitlements a Layer5 Cloud plan can grant. A `Feature`
(`schemas/constructs/v1beta1/feature/feature.yaml`) pairs one name with a
`quantity`, and `GET /api/entitlement/subscriptions/organizations/{orgId}/features`
returns the features an organization's active subscriptions grant, as a bare
array. Clients decide what they may do from that array alone; there is no
separate license file.

## How a quantity is read

Every feature carries a `quantity`, but the enum holds two kinds of feature and
they read it differently. The `x-enumDescriptions` entry on each value says
which kind it is.

| Kind | Reading | Examples |
| --- | --- | --- |
| Cap | `quantity` is the maximum. `999999999999` is the unlimited sentinel. | `ComponentsInDesign`, `BlowhornProfiles`, `BlowhornDevicesPerSeat` |
| Capability | Any `quantity` greater than `0` grants it. `0` refuses it. | `BlowhornBrowserAutomation`, `BlowhornScheduler`, every `BlowhornPlatform*` |

Two rules hold for both kinds:

- **A feature the response does not list is not granted.** A client reads it
  as `0`, never as unlimited. The sentinel is only ever an explicit value.
- **A name a client does not know is ignored.** Each product reads its own
  subset, so adding a value for one product never breaks another product's
  client.

`quantity` is `number` with `format: double`; the generated Go field is a
`float64`, which represents the sentinel exactly.

## The Blowhorn set

Blowhorn (leecalcote/blowhorn) gates publishing on these values. The client
flag column is the name `outbox/entitlement.py` maps each value to.

| Value | Kind | Client flag |
| --- | --- | --- |
| `BlowhornProfiles` | Cap | `max_profiles` |
| `BlowhornBrowserAutomation` | Capability | `browser_automation` |
| `BlowhornScheduler` | Capability | `scheduler` |
| `BlowhornDevicesPerSeat` | Cap | `max_devices_per_seat` |
| `BlowhornPlatformLinkedIn` | Capability | `platforms` (`linkedin`) |
| `BlowhornPlatformX` | Capability | `platforms` (`x`) |
| `BlowhornPlatformReddit` | Capability | `platforms` (`reddit`) |
| `BlowhornPlatformHackerNews` | Capability | `platforms` (`hn`) |
| `BlowhornPlatformSlack` | Capability | `platforms` (`slack`) |
| `BlowhornPlatformBluesky` | Capability | `platforms` (`bluesky`) |
| `BlowhornPlatformGitHub` | Capability | `platforms` (`github`) |
| `BlowhornPlatformBlog` | Capability | `platforms` (`blog`) |

## Consumers

- **leecalcote/blowhorn** - `outbox/entitlement.py` parses the organization
  features response and refuses a publish the plan does not cover. It keys on
  the literal strings above.
- **meshery-cloud** - mirrors `FeatureName` as the Postgres `feature_name`
  enum type, serves the two feature endpoints, and seeds plan features from
  `install/content/features.csv` at boot. A value added here needs a
  meshery-cloud migration that extends the Postgres enum before a plan can
  grant it; see meshery-cloud `docs/reference/entitlement.md`.

## Adding a value

1. Append it to the `enum` list. Never rename or reorder a published value:
   every consumer compares the literal string, and a renamed value reads as
   "not granted" rather than as an error.
2. Follow the enum's published casing. `FeatureName` was published PascalCase
   and carries `x-enum-casing-exempt: true`, so Rule 8 accepts PascalCase
   additions within v1beta1. A partial casing change inside the version is
   forbidden (`docs/casing-rules.md`).
3. Add its `x-enumDescriptions` entry saying which kind it is: a cap (name the
   sentinel) or a capability (granted when greater than 0). The generators do
   not read this extension; it exists for the published OpenAPI documentation.
4. Add it to `validation/feature_name_test.go`, which pins the enum's contents
   and order and fails when a value lacks a description.
5. Run `make build` and commit the regenerated Go, TypeScript and RTK output.
6. Open the meshery-cloud migration and seed change, and point the consuming
   product's client at the new literal.
