import { getStatsOverview } from "@/services/dashboard.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { StatsOverview } from "./StatsOverview";
import { queryKeys } from "@/lib/query-keys/keys";

async function GetStatsOverview() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [queryKeys.stats.overview],
    queryFn: () => getStatsOverview(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StatsOverview />
    </HydrationBoundary>
  );
}

export default GetStatsOverview;
