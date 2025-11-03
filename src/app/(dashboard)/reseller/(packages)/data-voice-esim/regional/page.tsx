import GetContinentsThatHaveDataVoicePackages from "@/components/features/packages/GetContinentsThatHaveDataVoicePackages";
import RegionImageCardSkelton from "@/components/features/packages/RegionImageCardSkelton";
import { Suspense } from "react";

function Page() {
  return (
    <Suspense fallback={<RegionImageCardSkelton />}>
      <GetContinentsThatHaveDataVoicePackages />
    </Suspense>
  );
}

export default Page;
