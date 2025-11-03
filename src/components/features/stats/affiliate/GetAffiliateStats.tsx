import { getTodayDate } from "@/helpers/getTodayDate";
import { queryKeys } from "@/lib/query-keys/keys";
import { getAffiliateStats } from "@/services/affiliate/stats.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { AffiliateStats } from "./AffiliateStats";
import { connection } from "next/server";

async function GetAffiliateStats() {
  const queryClient = new QueryClient();
  await connection();

  await queryClient.prefetchQuery({
    queryKey: [queryKeys.stats.affiliate],
    queryFn: () =>
      getAffiliateStats({
        start_date: getTodayDate(),
        end_date: getTodayDate(),
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AffiliateStats />
    </HydrationBoundary>
  );
}

export default GetAffiliateStats;
