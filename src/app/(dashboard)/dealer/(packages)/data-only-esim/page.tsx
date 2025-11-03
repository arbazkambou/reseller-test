import GetCountriesThatHaveDataOnlyPackages from "@/components/features/packages/GetCountriesThatHaveDataOnlyPackages";
import { StartingPriceSkelton } from "@/components/features/packages/StartingPriceSkelton";
import { Suspense } from "react";

function Page() {
  return (
    <Suspense fallback={<StartingPriceSkelton />}>
      <GetCountriesThatHaveDataOnlyPackages />
    </Suspense>
  );
}

export default Page;
