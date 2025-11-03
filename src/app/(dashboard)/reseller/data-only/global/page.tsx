import GetDataOnlyGlobal from "@/components/features/packages/GetDataOnlyGlobal";
import { PackageListSkelton } from "@/components/features/packages/PackageListSkelton";
import { Suspense } from "react";

function Page() {
  return (
    <Suspense fallback={<PackageListSkelton />}>
      <GetDataOnlyGlobal />;
    </Suspense>
  );
}

export default Page;
