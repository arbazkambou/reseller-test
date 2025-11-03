import { globalResponseHandler } from "@/helpers/globalHanlers";

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;

function mergeHeaders(defaults: HeadersInit, extra?: HeadersInit): HeadersInit {
  return { ...defaults, ...extra };
}

type ApiInit = Omit<RequestInit, "headers" | "body"> & {
  headers?: HeadersInit;
  body?: RequestInit["body"] | Record<string, unknown> | undefined;
  role?: string;
};

export async function api<T>(
  path: string,
  token?: string | null,
  init: ApiInit = {}
): Promise<T> {
  const { role, ...restInit } = init;

  const base = role ? `${baseUrl}/${role}` : baseUrl;
  const url = path.startsWith("http") ? path : `${base}${path}`;

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    Accept: "application/json",
  };

  let body = restInit.body;
  if (body && typeof body === "object" && !(body instanceof FormData)) {
    body = JSON.stringify(body);
  }

  const res = await fetch(url, {
    ...restInit,
    headers: mergeHeaders(defaultHeaders, restInit.headers),
    body,
  });

  const data = await res.json();

  if (!res.ok || (!data.success && !data.status)) {
    throw new Error(globalResponseHandler(data, res.status));
  }

  if (res.status === 204) return undefined as T;

  return data as T;
}
