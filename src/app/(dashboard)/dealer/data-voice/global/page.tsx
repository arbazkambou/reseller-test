import GetDataVoiceGlobal from "@/components/features/packages/GetDataVoiceGlobal";
import { PackageListSkelton } from "@/components/features/packages/PackageListSkelton";
import { Suspense } from "react";

function Page() {
  return (
    <Suspense fallback={<PackageListSkelton />}>
      <GetDataVoiceGlobal />;
    </Suspense>
  );
}

export default Page;
