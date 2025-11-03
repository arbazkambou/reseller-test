import GetAffiliatePurchasedPackages from "@/components/features/stats/affiliate/GetAffiliatePurchasedPackages";
import GetAffiliateStats from "@/components/features/stats/affiliate/GetAffiliateStats";
import PickDate from "@/components/shared/date-range-picker/PickDate";
import { DataTableSkeleton } from "@/components/shared/skeltons/DataTableSkelton";
import { StatsCardSkeleton } from "@/components/shared/skeltons/StatsCardSkeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SearchParams } from "nuqs";
import { Suspense } from "react";

export default function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row  lg:justify-between gap-6">
          <div className="flex gap-6">
            <h1 className="text-h1 font-medium">Statistics</h1>
            <PickDate />
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Stats Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense
              fallback={
                <div className="flex flex-col gap-6">
                  <StatsCardSkeleton cardCount={5} />
                  <DataTableSkeleton />
                </div>
              }
            >
              <GetAffiliateStats />
            </Suspense>
          </CardContent>
        </Card>

        <div className="mt-6">
          <Card className="@container/main">
            <CardHeader>
              <CardTitle>Purchased Packages</CardTitle>
              <div className="flex flex-col gap-3 @lg/main:flex-row @lg/main:items-center @lg/main:justify-between ">
                <CardDescription>
                  See the packages purchased using promo code.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
              <Suspense fallback={<DataTableSkeleton />}>
                <GetAffiliatePurchasedPackages searchParams={searchParams} />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
