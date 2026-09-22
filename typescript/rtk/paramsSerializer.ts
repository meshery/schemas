/**
 * Query-string serializer shared by the Cloud and Meshery RTK base queries in
 * ./api.
 *
 * An OpenAPI array query parameter defaults to `style: form, explode: true`,
 * which puts every element on the wire as its own repeated key:
 * `?kind=Pod&kind=Service`. RTK's built-in serializer instead comma-joins the
 * array into one value (`?kind=Pod%2CService`), so a server that reads every
 * value of the key sees a single literal `Pod,Service` and matches nothing.
 * This serializer emits the repeated form the specs declare.
 *
 * `undefined` and `null` are omitted, both as parameter values and as array
 * elements, and an empty array sends nothing, so "no filter" never reaches the
 * server as `key=` or `key=null`. Every other scalar, including `0`, `false`
 * and the empty string, is sent via `String(value)`.
 *
 * The generated clients only pass scalars and arrays of scalars, but the
 * serializer also sits under any hand-written endpoint a consumer injects into
 * `cloudApi` / `mesheryApi`. A `Date` is sent as ISO 8601 and any other
 * non-array object is JSON-encoded, so a mistake surfaces on the wire as a
 * readable value instead of the silent `[object Object]` that `String()`
 * would produce.
 *
 * Servers must read all values of an array parameter (Go `r.URL.Query()[key]`,
 * Echo `c.QueryParams()[key]`), never only the first. See
 * docs/http-api-design.md#array-query-parameters.
 *
 * Kept free of the React-coupled RTK runtime so it can be unit-tested directly,
 * like ./meshkitError.
 */
export function paramsSerializer(params: Record<string, unknown>): string {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        if (item !== undefined && item !== null) {
          searchParams.append(key, serializeValue(item));
        }
      }
      continue;
    }

    searchParams.append(key, serializeValue(value));
  }

  return searchParams.toString();
}

function serializeValue(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === "object" && value !== null) {
    return JSON.stringify(value);
  }

  return String(value);
}
