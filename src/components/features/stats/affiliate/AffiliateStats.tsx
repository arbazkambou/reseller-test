"use client";

import { DataTable } from "@/components/shared/data-table/DataTable";
import { StatsCardSkeleton } from "@/components/shared/skeltons/StatsCardSkeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTodayDate } from "@/helpers/getTodayDate";
import { queryKeys } from "@/lib/query-keys/keys";
import { useDateRange } from "@/providers/DateRangeProvider";
import { getAffiliateStats } from "@/services/affiliate/stats.services";
import { useQuery } from "@tanstack/react-query";
import { BadgeCent, Banknote, Cpu, Package, TrendingUp } from "lucide-react";
import { StatCard } from "../StatCard";
import StatsGrid from "../StatsGrid";
import {
  TopCountriesColumn,
  TopDealersColumn,
  TopPackagesColumn,
} from "../Top10StatsColumns";
import { DataTableSkeleton } from "@/components/shared/skeltons/DataTableSkelton";

export function AffiliateStats() {
  const { start_date, end_date } = useDateRange();
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [
      start_date && end_date
        ? [queryKeys.stats.affiliate, start_date, end_date]
        : [queryKeys.stats.affiliate],
    ],
    queryFn: () =>
      getAffiliateStats({
        start_date: start_date ? start_date : getTodayDate(),
        end_date: end_date ? end_date : getTodayDate(),
      }),
  });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <StatsCardSkeleton cardCount={5} />
        <DataTableSkeleton />
      </div>
    );
  }

  if (!isSuccess) {
    throw new Error("Could not affiliate stats");
  }

  const {
    curr_bundles,
    curr_esims,
    promo_esims,
    curr_bundles_price,
    curr_bundles_profit,
  } = data;

  const statsAllTime = [
    {
      title: "Total Bundles Sold",
      icon: <Package size={20} />,
      value: curr_bundles,
    },
    {
      title: "Total eSIM Sold",
      icon: <Cpu size={20} />,
      value: curr_esims,
    },
    {
      title: "Promo (Used By Users)",
      icon: <BadgeCent size={20} />,
      value: promo_esims,
    },

    {
      title: "Total eSIM Price",
      icon: <Banknote size={20} />,
      value: curr_bundles_price,
    },
    {
      title: "Total eSIMs Profit",
      icon: <TrendingUp size={20} />,
      value: curr_bundles_profit,
    },
  ];

  const colors = [
    { bg: "bg-red-100", text: "text-red-700" },
    { bg: "bg-blue-100", text: "text-blue-700" },
    { bg: "bg-green-100", text: "text-green-700" },
    { bg: "bg-yellow-100", text: "text-yellow-700" },
    { bg: "bg-purple-100", text: "text-purple-700" },
    { bg: "bg-pink-100", text: "text-pink-700" },
    { bg: "bg-indigo-100", text: "text-indigo-700" },
    { bg: "bg-orange-100", text: "text-orange-700" },
  ];

  return (
    <>
      <StatsGrid>
        {statsAllTime.map((item, index) => {
          const color = colors[index % colors.length]; // rotate colors
          return (
            <StatCard
              key={index}
              title={item.title}
              icon={item.icon}
              iconBg={color.bg}
              iconColor={color.text}
              value={item.value.toFixed(2)}
            />
          );
        })}
      </StatsGrid>
      <div className="mt-10">
        <Tabs defaultValue="countries">
          <Card className="@container/main">
            <CardHeader>
              <CardTitle>Top 10 Overview</CardTitle>
              <div className="flex flex-col gap-3 @lg/main:flex-row @lg/main:items-center @lg/main:justify-between ">
                <CardDescription>
                  See the leading countries, bundles, and users for eSIM at a
                  glance.
                </CardDescription>
                <div>
                  <TabsList>
                    <TabsTrigger value="countries">Countries</TabsTrigger>
                    <TabsTrigger value="bundles">Bundles</TabsTrigger>
                    <TabsTrigger value="users">Users</TabsTrigger>
                  </TabsList>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
              <TabsContent value="countries">
                <DataTable
                  columns={TopCountriesColumn}
                  data={data.country_stats}
                  options={{ isCustomFilters: false }}
                  exportTitle="Top 10 Countries"
                  exportFilename="top10Countries"
                />
              </TabsContent>
              <TabsContent value="bundles">
                <DataTable
                  columns={TopPackagesColumn}
                  data={data.top_bundles}
                  options={{ isCustomFilters: false }}
                  exportTitle="Top 10 Packages"
                  exportFilename="top10Packages"
                />
              </TabsContent>
              <TabsContent value="users">
                <DataTable
                  columns={TopDealersColumn}
                  data={data.top_users}
                  options={{ isCustomFilters: false }}
                  exportTitle="Data Only Dealers"
                  exportFilename="top10Dealers"
                />
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </>
  );
}
