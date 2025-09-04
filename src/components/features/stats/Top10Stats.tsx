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

export function Top10Stats() {
  const { start_date, end_date } = useDateRange();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey:
      start_date && end_date
        ? [queryKeys.stats.top10, start_date, end_date]
        : [queryKeys.stats.top10],
    queryFn: () => getTop10Stats({ start_date, end_date }),
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
        />
      </TabsContent>
      <TabsContent value="packages">
        <DataTable
          columns={TopPackagesColumn}
          data={data.top_bundles}
          options={{ isCustomFilters: false }}
        />
      </TabsContent>
      <TabsContent value="dealers">
        <DataTable
          columns={TopDealersColumn}
          data={data.top_dealers}
          options={{ isCustomFilters: false }}
        />
      </TabsContent>
    </>
  );
}
