import { test } from "node:test";
import assert from "node:assert/strict";
// The framework-agnostic entry: the same fetchBaseQuery `./api` uses, without
// the React peer dependencies the `/react` entry pulls in.
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { CURRENT_ORG_KEY, prepareCloudHeaders } from "./currentOrgHeader.ts";

const SELECTED_ORG = "11111111-1111-4111-8111-111111111111";
const OTHER_ORG = "22222222-2222-4222-8222-222222222222";

/**
 * Sends one request through a real fetchBaseQuery wired like the Cloud base
 * query, with `selectedOrg` in the store, and returns the X-Current-Orgid the
 * server would receive (null when the header is absent).
 */
async function sentOrgHeader(
  selectedOrg: string | null,
  endpointHeaders: Record<string, string | undefined>,
): Promise<string | null> {
  let sent: Request | undefined;
  const baseQuery = fetchBaseQuery({
    baseUrl: "http://cloud.test",
    prepareHeaders: prepareCloudHeaders,
    fetchFn: async (input: RequestInfo | URL) => {
      sent = input as Request;
      return new Response(null, { status: 204 });
    },
  });
  const state = { organization: { value: selectedOrg ? { id: selectedOrg } : null } };
  const api = {
    getState: () => state,
    signal: new AbortController().signal,
    abort: () => {},
    dispatch: () => {},
    extra: undefined,
    endpoint: "deregisterDesktopConnection",
    type: "mutation",
  } as never;
  // Generated endpoints pass the header argument as is, `undefined` when the
  // caller omitted it, exactly as below.
  await baseQuery(
    { url: "/api/integrations/connections/desktop/install-a", method: "DELETE", headers: endpointHeaders },
    api,
    {},
  );
  assert.ok(sent, "the request should reach fetch");
  return sent.headers.get(CURRENT_ORG_KEY);
}

const cases: Array<{
  name: string;
  selectedOrg: string | null;
  passed: string | undefined;
  expected: string | null;
}> = [
  // meshery/schemas#1355: the selected organization used to replace these.
  { name: "an explicit `all` survives a selected organization", selectedOrg: SELECTED_ORG, passed: "all", expected: "all" },
  { name: "an explicit other organization survives a selected one", selectedOrg: SELECTED_ORG, passed: OTHER_ORG, expected: OTHER_ORG },
  { name: "an omitted header falls back to the selected organization", selectedOrg: SELECTED_ORG, passed: undefined, expected: SELECTED_ORG },
  { name: "an explicit header is sent with no organization selected", selectedOrg: null, passed: "all", expected: "all" },
  { name: "no header and no selected organization sends none", selectedOrg: null, passed: undefined, expected: null },
];

for (const c of cases) {
  test(`X-Current-Orgid: ${c.name}`, async () => {
    assert.equal(await sentOrgHeader(c.selectedOrg, { [CURRENT_ORG_KEY]: c.passed }), c.expected);
  });
}
