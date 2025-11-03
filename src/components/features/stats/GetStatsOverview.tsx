import { getStatsOverview } from "@/services/dashboard.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { StatsOverview } from "./StatsOverview";
import { queryKeys } from "@/lib/query-keys/keys";
import { getTodayDate } from "@/helpers/getTodayDate";
import { connection } from "next/server";

async function GetStatsOverview() {
  const queryClient = new QueryClient();
  await connection();

  await queryClient.prefetchQuery({
    queryKey: [queryKeys.stats.overview],
    queryFn: () =>
      getStatsOverview({
        start_date: getTodayDate(),
        end_date: getTodayDate(),
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StatsOverview />
    </HydrationBoundary>
  );
}

export default GetStatsOverview;
