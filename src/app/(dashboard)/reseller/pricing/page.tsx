import GetCountriesPricing from "@/components/features/pricing/GetCountriesPricing";
import { DataTableSkeleton } from "@/components/shared/skeltons/DataTableSkelton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";

async function Page() {
  return (
    <Tabs defaultValue="data-only">
      <Card>
        <CardHeader className="flex flex-col gap-2 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col gap-2">
            <CardTitle className="text-xl">Pricing</CardTitle>
            <CardDescription>Country packages with pricing.</CardDescription>
          </div>
          <div className="">
            <TabsList>
              <TabsTrigger value="data-only">Data Only Packages</TabsTrigger>
              <TabsTrigger value="data-voice">Data Voice Packages</TabsTrigger>
            </TabsList>
          </div>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<DataTableSkeleton />}>
            <GetCountriesPricing />
          </Suspense>
        </CardContent>
      </Card>
    </Tabs>
  );
}

export default Page;
