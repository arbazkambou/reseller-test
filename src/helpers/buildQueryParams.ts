import { StatsFilter } from "@/types/dashboard.types";

export function buildQueryParams(filters?: StatsFilter): string {
  const params = new URLSearchParams();

  if (filters?.start_date) {
    params.set("start_date", filters.start_date);
  }
  if (filters?.end_date) {
    params.set("end_date", filters.end_date);
  }

  return params.toString(); // returns "start_date=...&end_date=..." or ""
}
