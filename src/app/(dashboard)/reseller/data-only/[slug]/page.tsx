import GetDataOnlyPackagesOfCountry from "@/components/features/packages/GetDataOnlyPackagesOfCountry";
import { PackageListSkelton } from "@/components/features/packages/PackageListSkelton";
import { Suspense } from "react";

function Page({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<PackageListSkelton />}>
      <GetDataOnlyPackagesOfCountry params={params} />;
    </Suspense>
  );
}

export default Page;
