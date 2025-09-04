import AddDealerDialog from "@/components/features/dealers/AddDealerDialog";
import GetDealers from "@/components/features/dealers/GetDealers";
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
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <CardTitle className="text-xl">Dealers</CardTitle>
            <AddDealerDialog />
          </div>
          <CardDescription>
            https://portal.esimcard.com/signup/A1ntm4/
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<DataTableSkeleton />}>
            <GetDealers />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
