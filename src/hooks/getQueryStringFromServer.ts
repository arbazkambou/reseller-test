export type SearchParams = { [key: string]: string | string[] | undefined };

export function normalizeParams(
  sp: URLSearchParams | SearchParams
): Record<string, string> {
  if (sp instanceof URLSearchParams) {
    return Object.fromEntries(sp.entries());
  }

  return Object.fromEntries(
    Object.entries(sp).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v ?? ""])
  );
}

export function buildQueryString(params: Record<string, string>): string {
  const usp = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (!value) continue;

    if (key === "sort") {
      usp.append(key, value);
    } else {
      usp.set(key, value);
    }
  }

  return usp
    .toString()
    .replace(/sort=[^&]+/, (match) => decodeURIComponent(match));
}

export function getQueryStringFromServer(initialSearch: SearchParams) {
  const normalized = normalizeParams(initialSearch);
  return buildQueryString(normalized);
}
