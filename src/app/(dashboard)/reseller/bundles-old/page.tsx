import GetBundles from "@/components/features/bundles/GetBundles";
import { DataTableSkeleton } from "@/components/shared/skeltons/DataTableSkelton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";

export const experimental_ppr = true;

function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Your Packages</CardTitle>
        <CardDescription>List of eSIM packages</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<DataTableSkeleton />}>
          <GetBundles />
        </Suspense>
      </CardContent>
    </Card>
  );
}

export default Page;
