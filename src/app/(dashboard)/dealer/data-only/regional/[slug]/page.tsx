import GetDataOnlyPackagesOfContinent from "@/components/features/packages/GetDataOnlyPackagesOfContinent";
import { PackageListSkelton } from "@/components/features/packages/PackageListSkelton";
import { Suspense } from "react";

function Page({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<PackageListSkelton />}>
      <GetDataOnlyPackagesOfContinent params={params} />;
    </Suspense>
  );
}

export default Page;
