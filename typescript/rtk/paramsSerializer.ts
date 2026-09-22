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
          searchParams.append(key, String(item));
        }
      }
      continue;
    }

    searchParams.append(key, String(value));
  }

  return searchParams.toString();
}
