"use server";

import { buildQueryParams } from "@/helpers/buildQueryParams";
import { globalErrorHandler } from "@/helpers/globalHanlers";
import { api } from "@/lib/api";
import { auth } from "@/lib/auth";
import {
  AffiliatePurchasedPackagesResponse,
  AffiliateStatsResponse,
} from "@/types/affiliate/stats.types";
import { StatsFilter } from "@/types/dashboard.types";

export async function getAffiliateStats(filter?: StatsFilter) {
  try {
    const session = await auth();
    const query = buildQueryParams(filter);
    const data = await api<AffiliateStatsResponse>(
      `/affiliate/dashboard?ajax_stats=true${query ? `&${query}` : ""}`,
      session?.accessToken
    );

    return data.data;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}
export async function getAffiliatePurchasedPackages({
  queryString,
}: {
  queryString: string;
}) {
  try {
    const session = await auth();
    const data = await api<AffiliatePurchasedPackagesResponse>(
      `/affiliate/dashboard?ajax_stats=true&promo_code=true&${queryString}`,
      session?.accessToken
    );

    return data;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}
