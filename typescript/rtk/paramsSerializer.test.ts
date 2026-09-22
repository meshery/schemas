import { test } from "node:test";
import assert from "node:assert/strict";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { paramsSerializer } from "./paramsSerializer.ts";

test("arrays are sent as repeated keys, in order", () => {
  assert.equal(
    paramsSerializer({ kind: ["Pod", "Service"], namespace: ["default"] }),
    "kind=Pod&kind=Service&namespace=default",
  );
});

test("undefined and null values are omitted", () => {
  assert.equal(paramsSerializer({ page: 1, search: undefined, order: null }), "page=1");
});

test("an empty array sends nothing rather than `key=`", () => {
  assert.equal(paramsSerializer({ kind: [], page: 0 }), "page=0");
});

test("undefined and null array elements are skipped", () => {
  assert.equal(paramsSerializer({ kind: ["Pod", undefined, null, "Service"] }), "kind=Pod&kind=Service");
});

test("falsy scalars other than null/undefined are still sent", () => {
  assert.equal(
    paramsSerializer({ page: 0, asDesign: false, status: "" }),
    "page=0&asDesign=false&status=",
  );
});

test("numbers and booleans are stringified", () => {
  assert.equal(paramsSerializer({ pageSize: 25, labels: true, ids: [1, 2] }), "pageSize=25&labels=true&ids=1&ids=2");
});

test("reserved characters are percent-encoded, so a comma inside a value is not a separator", () => {
  const query = paramsSerializer({
    label: ["app=nginx", "tier=a,b"],
    search: "my pod/ü",
  });

  assert.equal(query, "label=app%3Dnginx&label=tier%3Da%2Cb&search=my+pod%2F%C3%BC");
  assert.deepEqual(new URLSearchParams(query).getAll("label"), ["app=nginx", "tier=a,b"]);
});

// Drive the serializer through RTK's real fetchBaseQuery, the way ./api wires
// it, and read the URL it actually requests. Without it, RTK comma-joins the
// array into a single value, which is the behaviour this serializer replaces.
async function requestedUrl(options: Parameters<typeof fetchBaseQuery>[0]): Promise<URL> {
  let seen: Request | undefined;
  const baseQuery = fetchBaseQuery({
    baseUrl: "http://meshery.test",
    ...options,
    fetchFn: async (input: RequestInfo | URL) => {
      seen = input as Request;
      return new Response("{}", { status: 200, headers: { "Content-Type": "application/json" } });
    },
  });

  await baseQuery(
    { url: "/api/system/meshsync/resources", params: { kind: ["Pod", "Service"], search: undefined, order: null } },
    {
      signal: new AbortController().signal,
      abort: () => {},
      dispatch: () => {},
      getState: () => ({}),
      extra: undefined,
      endpoint: "getMeshSyncResources",
      type: "query",
    } as never,
    {},
  );

  assert.ok(seen, "fetchFn was not called");
  return new URL(seen.url);
}

test("fetchBaseQuery with paramsSerializer sends repeated keys and drops nullish params", async () => {
  const url = await requestedUrl({ paramsSerializer });

  assert.deepEqual(url.searchParams.getAll("kind"), ["Pod", "Service"]);
  assert.equal(url.searchParams.has("search"), false);
  assert.equal(url.searchParams.has("order"), false);
});

test("fetchBaseQuery without it comma-joins arrays and sends null as a string", async () => {
  const url = await requestedUrl({});

  assert.deepEqual(url.searchParams.getAll("kind"), ["Pod,Service"]);
  assert.equal(url.searchParams.get("order"), "null");
});
