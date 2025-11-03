import { getAllTimeStats } from "@/services/dashboard.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { AllTimeStats } from "./AllTimeStats";
import { queryKeys } from "@/lib/query-keys/keys";

async function GetAllTimeStats() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [queryKeys.stats.allTime],
    queryFn: () => getAllTimeStats(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AllTimeStats />
    </HydrationBoundary>
  );
}

export default GetAllTimeStats;
