"use client";

import { DataTable } from "@/components/shared/data-table/DataTable";
import { TabsContent } from "@/components/ui/tabs";
import {
  TopCountriesColumn,
  TopDealersColumn,
  TopPackagesColumn,
} from "./Top10StatsColumns";
import { useDateRange } from "@/providers/DateRangeProvider";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys/keys";
import { getTop10Stats } from "@/services/dashboard.services";
import { DataTableSkeleton } from "@/components/shared/skeltons/DataTableSkelton";
import { getTodayDate } from "@/helpers/getTodayDate";

export function Top10Stats() {
  const { start_date, end_date } = useDateRange();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey:
      start_date && end_date
        ? [queryKeys.stats.top10, start_date, end_date]
        : [queryKeys.stats.top10],
    queryFn: () =>
      getTop10Stats({
        start_date: start_date ? start_date : getTodayDate(),
        end_date: end_date ? end_date : getTodayDate(),
      }),
  });

  if (isLoading) {
    return <DataTableSkeleton />;
  }

  if (!isSuccess) {
    throw new Error("Could not get top 10 stats data");
  }
  return (
    <>
      <TabsContent value="countries">
        <DataTable
          columns={TopCountriesColumn}
          data={data.country_stats}
          options={{ isCustomFilters: false }}
          exportTitle="Top 10 Countries"
          exportFilename="top10Countries"
        />
      </TabsContent>
      <TabsContent value="packages">
        <DataTable
          columns={TopPackagesColumn}
          data={data.top_bundles}
          options={{ isCustomFilters: false }}
          exportTitle="Top 10 Packages"
          exportFilename="top10Packages"
        />
      </TabsContent>
      <TabsContent value="dealers">
        <DataTable
          columns={TopDealersColumn}
          data={data.top_dealers}
          options={{ isCustomFilters: false }}
          exportTitle="Data Only Dealers"
          exportFilename="top10Dealers"
        />
      </TabsContent>
    </>
  );
}
