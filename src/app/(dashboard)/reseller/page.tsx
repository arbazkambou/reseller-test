import GetAllTimeStats from "@/components/features/stats/GetAllTimeStats";
import GetCustomerActivityStats from "@/components/features/stats/GetCustomerActivityStats";
import GetLastSixMonthSales from "@/components/features/stats/GetLastSixMonthSales";
import GetStatsOverview from "@/components/features/stats/GetStatsOverview";
import GetSummaryCards from "@/components/features/stats/GetSummaryCards";
import GetTop10Stats from "@/components/features/stats/GetTop10Stats";
import PickDate from "@/components/shared/date-range-picker/PickDate";
import ChartSkeleton from "@/components/shared/skeltons/ChartSkelton";
import { DataTableSkeleton } from "@/components/shared/skeltons/DataTableSkelton";
import { StatsCardSkeleton } from "@/components/shared/skeltons/StatsCardSkeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center gap-6">
          <h1 className="text-h1 font-medium">Statistics</h1>
          <PickDate />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Stats Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<StatsCardSkeleton />}>
              <GetStatsOverview />
            </Suspense>
          </CardContent>
          <CardHeader>
            <CardTitle>Summary Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<StatsCardSkeleton />}>
              <GetSummaryCards />
            </Suspense>
          </CardContent>
          <CardHeader>
            <CardTitle>All Time Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<StatsCardSkeleton />}>
              <GetAllTimeStats />
            </Suspense>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6 grid sm:grid-cols-2 gap-6">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Monthly eSIM sales and profit overview</CardTitle>
            <CardDescription>Last 6 months</CardDescription>
          </CardHeader>
          <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
            <Suspense fallback={<ChartSkeleton />}>
              <GetLastSixMonthSales />
            </Suspense>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Customer Activity</CardTitle>
            <CardDescription>Last 6 months</CardDescription>
          </CardHeader>
          <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
            <Suspense fallback={<ChartSkeleton />}>
              <GetCustomerActivityStats />
            </Suspense>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Tabs defaultValue="countries">
          <Card className="@container/main">
            <CardHeader>
              <CardTitle>Top 10 Overview</CardTitle>
              <div className="flex flex-col gap-3 @lg/main:flex-row @lg/main:items-center @lg/main:justify-between ">
                <CardDescription>
                  See the leading countries, packages, and dealers for eSIM at a
                  glance.
                </CardDescription>
                <div>
                  <TabsList>
                    <TabsTrigger value="countries">Countries</TabsTrigger>
                    <TabsTrigger value="packages">Packages</TabsTrigger>
                    <TabsTrigger value="dealers">Dealers</TabsTrigger>
                  </TabsList>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
              <Suspense fallback={<DataTableSkeleton />}>
                <GetTop10Stats />
              </Suspense>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </>
  );
}
