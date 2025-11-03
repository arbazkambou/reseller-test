"use server";

import { buildQueryParams } from "@/helpers/buildQueryParams";
import { globalErrorHandler } from "@/helpers/globalHanlers";
import { api } from "@/lib/api";
import { auth } from "@/lib/auth";
import {
  AllTimeStatsResponse,
  CustomerActivityResponse,
  DashboardSummaryResponse,
  GetSixMonthsSalesResponse,
  GetTop10StatsResponse,
  StatsFilter,
  StatsOverviewResponse,
} from "@/types/dashboard.types";

export async function getSummaryCardsData(filter?: StatsFilter) {
  try {
    const session = await auth();
    const query = buildQueryParams(filter);
    const data = await api<DashboardSummaryResponse>(
      `/overview/summerycards?${query ? query : ""}`,
      session?.accessToken,

      { role: session?.user.role }
    );

    if (!data.status) {
      throw new Error("Could not get dashboard summary");
    }
    return data.data.summerycards;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}

export async function getStatsOverview(filter?: StatsFilter) {
  try {
    const session = await auth();
    const query = buildQueryParams(filter);
    const data = await api<StatsOverviewResponse>(
      `/overview/overview?${query ? query : ""}`,
      session?.accessToken,
      { role: session?.user.role }
    );
    if (!data.status) {
      throw new Error("Could not get dashboard summary");
    }
    return data.data.overview;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}

export async function getAllTimeStats(filter?: StatsFilter) {
  try {
    const session = await auth();
    const query = buildQueryParams(filter);
    const data = await api<AllTimeStatsResponse>(
      `/overview/all_time?${query ? query : ""}`,
      session?.accessToken,

      { role: session?.user.role }
    );
    if (!data.status) {
      throw new Error("Could not get dashboard summary");
    }
    return data.data.all_time;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}

export async function getSixMonthsSalesData(filter?: StatsFilter) {
  try {
    const session = await auth();
    const query = buildQueryParams(filter);

    const data = await api<GetSixMonthsSalesResponse>(
      `/overview/six_month?${query ? query : ""}`,
      session?.accessToken,

      { role: session?.user.role }
    );

    const { months, esim_sold, bundle_count, sale, profit } =
      data.data.six_month;

    const chartData = months.map((month, i) => ({
      month,
      esim_sold: esim_sold[i],
      bundle_count: bundle_count[i],
      sale: sale[i],
      profit: profit[i],
    }));

    return chartData;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}

export async function getTop10Stats(filter?: StatsFilter) {
  try {
    const session = await auth();
    const query = buildQueryParams(filter);

    const data = await api<GetTop10StatsResponse>(
      `/overview/top?${query ? query : ""}`,
      session?.accessToken,
      { role: session?.user.role }
    );

    return data.data.top;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}

export async function getCustomerActivity(filter?: StatsFilter) {
  try {
    const session = await auth();
    const query = buildQueryParams(filter);

    const data = await api<CustomerActivityResponse>(
      `/overview/customer_activity?${query ? query : ""}`,
      session?.accessToken,

      { role: session?.user.role }
    );

    return data.data.customer_activity;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}
