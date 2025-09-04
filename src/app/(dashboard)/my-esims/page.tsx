import GetMyEsims from "@/components/features/sims/GetMyEsims";
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

async function Page() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <CardTitle className="text-xl">My eSIMs</CardTitle>
        </div>
        <CardDescription>
          View and manage your eSIM profiles and activation details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<DataTableSkeleton rowCount={6} />}>
          <GetMyEsims />
        </Suspense>
      </CardContent>
    </Card>
  );
}

export default Page;
