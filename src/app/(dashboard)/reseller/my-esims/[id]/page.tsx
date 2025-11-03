import GetSimDetail from "@/components/features/sims/GetSimDetail";
import SimDetailSkeleton from "@/components/features/sims/SimDetailSkelton";
import { Suspense } from "react";

export interface SimDetailParams {
  id: string;
}

async function Page({ params }: { params: Promise<SimDetailParams> }) {
  return (
    <Suspense fallback={<SimDetailSkeleton />}>
      <GetSimDetail params={params} />
    </Suspense>
  );
}

export default Page;
