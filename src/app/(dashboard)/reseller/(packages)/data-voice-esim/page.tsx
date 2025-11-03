import GetCountriesThatHaveDataVoicePackages from "@/components/features/packages/GetCountriesThatHaveDataVoicePackages";
import { StartingPriceSkelton } from "@/components/features/packages/StartingPriceSkelton";
import { Suspense } from "react";

function Page() {
  return (
    <Suspense fallback={<StartingPriceSkelton />}>
      <GetCountriesThatHaveDataVoicePackages />
    </Suspense>
  );
}

export default Page;
