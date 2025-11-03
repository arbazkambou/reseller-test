import GetBundles from "@/components/features/bundles/GetBundles";
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
        <CardTitle className="text-xl">Assigned Bundles</CardTitle>
        <CardDescription>List of all assigned eSIM packages</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<DataTableSkeleton />}>
          <GetBundles searchParams={searchParams} />
        </Suspense>
      </CardContent>
    </Card>
  );
}

export default Page;
