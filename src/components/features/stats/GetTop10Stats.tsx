import { queryKeys } from "@/lib/query-keys/keys";
import { getTop10Stats } from "@/services/dashboard.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Top10Stats } from "./Top10Stats";

async function GetTop10Stats() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [queryKeys.stats.top10],
    queryFn: () => getTop10Stats(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Top10Stats />
    </HydrationBoundary>
  );
}

export default GetTop10Stats;
