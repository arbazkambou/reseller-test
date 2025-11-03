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
import { SearchParams } from "nuqs";
import { Suspense } from "react";

async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <CardTitle className="text-xl">Dealers</CardTitle>
            <AddDealerDialog />
          </div>
          <CardDescription>You can manage dealers here</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<DataTableSkeleton />}>
            <GetDealers searchParams={searchParams} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
