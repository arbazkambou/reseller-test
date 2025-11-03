import GetContinentsThatHaveDataOnlyPackages from "@/components/features/packages/GetContinentsThatHaveDataOnlyPackages";
import RegionImageCardSkelton from "@/components/features/packages/RegionImageCardSkelton";
import { Suspense } from "react";

function Page() {
  return (
    <Suspense fallback={<RegionImageCardSkelton />}>
      <GetContinentsThatHaveDataOnlyPackages />
    </Suspense>
  );
}

export default Page;
