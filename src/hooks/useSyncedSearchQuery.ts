"use client";

import { useSearchParams } from "next/navigation";

type SearchParams = { [key: string]: string | string[] | undefined };

function normalizeParams(
  sp: URLSearchParams | SearchParams
): Record<string, string> {
  if (sp instanceof URLSearchParams) {
    return Object.fromEntries(sp.entries());
  }
  return Object.fromEntries(
    Object.entries(sp).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v ?? ""])
  );
}

function buildQueryString(params: Record<string, string>): string {
  const usp = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === "") continue;

    if (key === "sort") {
      // 👇 leave JSON as raw (not encoded)
      usp.append(key, value);
    } else {
      usp.set(key, value);
    }
  }

  // manually join to keep raw JSON
  return usp
    .toString()
    .replace(/sort=[^&]+/, (match) => decodeURIComponent(match));
}

export function useSyncedSearchQuery(initialSearch: SearchParams) {
  const liveSearchParams = useSearchParams();

  const normalized =
    liveSearchParams && liveSearchParams.size > 0
      ? normalizeParams(liveSearchParams)
      : normalizeParams(initialSearch);

  const queryString = buildQueryString(normalized);

  return { searchQuery: normalized, queryString };
}
