import GetDataVoicePackagesOfCountry from "@/components/features/packages/GetDataVoicePackagesOfCountry";
import { PackageListSkelton } from "@/components/features/packages/PackageListSkelton";
import { Suspense } from "react";

function Page({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<PackageListSkelton />}>
      <GetDataVoicePackagesOfCountry params={params} />;
    </Suspense>
  );
}

export default Page;
