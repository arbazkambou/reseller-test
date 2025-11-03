import GetDataVoicePackagesOfContinent from "@/components/features/packages/GetDataVoicePackagesOfContinent";
import { PackageListSkelton } from "@/components/features/packages/PackageListSkelton";
import { Suspense } from "react";

function Page({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<PackageListSkelton />}>
      <GetDataVoicePackagesOfContinent params={params} />;
    </Suspense>
  );
}

export default Page;
