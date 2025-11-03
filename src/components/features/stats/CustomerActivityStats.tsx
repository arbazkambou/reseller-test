import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ChartSkeleton from "@/components/shared/skeltons/ChartSkelton";
import { Suspense } from "react";
import GetCustomerActivityStats from "./GetCustomerActivityStats";

export function CustomerActivityStats() {
  return (
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
  );
}
