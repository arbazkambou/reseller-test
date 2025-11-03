import GetCredits from "@/components/features/credits/GetCredits";
import { DataTableSkeleton } from "@/components/shared/skeltons/DataTableSkelton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SearchParams } from "nuqs";
import { Suspense } from "react";

function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <CardTitle className="text-xl">Credits</CardTitle>
        </div>
        <CardDescription>
          Manage credit transactions and balances.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<DataTableSkeleton />}>
          <GetCredits searchParams={searchParams} />
        </Suspense>
      </CardContent>
    </Card>
  );
}

export default Page;
