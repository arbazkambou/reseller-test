import GetBundlePurchased from "@/components/features/dealers/GetBundlePurchased";
import GetDealerDetail from "@/components/features/dealers/GetDealerDetail";
import GetDeallerCredits from "@/components/features/dealers/GetDeallerCredits";
import GetEsimPurchased from "@/components/features/dealers/GetEsimPurchased";
import { DataTableSkeleton } from "@/components/shared/skeltons/DataTableSkelton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cpu, Package, User } from "lucide-react";
import { SearchParams } from "nuqs";
import { Suspense } from "react";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<SearchParams>;
}) {
  return (
    <div className="space-y-6 sm:space-y-12">
      <Card className="w-full ">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg font-medium">
            <User className="h-5 w-5 text-primary" />
            User Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<DataTableSkeleton rowCount={2} />}>
            <GetDealerDetail params={params} />
          </Suspense>
        </CardContent>
      </Card>

      <Card className="w-full ">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg font-medium">
            <Package className="h-5 w-5 text-primary" />
            User Refills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<DataTableSkeleton rowCount={2} />}>
            <GetDeallerCredits params={params} searchParams={searchParams} />
          </Suspense>
        </CardContent>
      </Card>

      <Card className="w-full ">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg font-medium">
            <Cpu className="h-5 w-5 text-primary" />
            Esims Purchased
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<DataTableSkeleton rowCount={2} />}>
            <GetEsimPurchased params={params} searchParams={searchParams} />
          </Suspense>
        </CardContent>
      </Card>

      <Card className="w-full ">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg font-medium">
            <Package className="h-5 w-5 text-primary" />
            Bundles Purchased
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<DataTableSkeleton rowCount={2} />}>
            <GetBundlePurchased params={params} searchParams={searchParams} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
