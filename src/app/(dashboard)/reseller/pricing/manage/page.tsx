import GetPricingTiers from "@/components/features/pricing/GetPricingTiers";
import { DataTableSkeleton } from "@/components/shared/skeltons/DataTableSkelton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { SearchParams } from "nuqs";
import { Suspense } from "react";

function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-2 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl">Manage Pricing</CardTitle>
            <Link href="/reseller/pricing/manage/create">
              <Button
                size={"sm"}
                className="rounded-full flex items-center gap-2 cursor-pointer"
              >
                <PlusCircleIcon />
                Add
              </Button>
            </Link>
          </div>
          <CardDescription>You can manage pricing here</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<DataTableSkeleton />}>
          <GetPricingTiers searchParams={searchParams} />
        </Suspense>
      </CardContent>
    </Card>
  );
}

export default Page;
