import { queryKeys } from "@/lib/query-keys/keys";
import { getSummaryCardsData } from "@/services/dashboard.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { SummaryCards } from "./SummaryCards";
import { getTodayDate } from "@/helpers/getTodayDate";
import { connection } from "next/server";

async function GetSummaryCards() {
  const queryClient = new QueryClient();
  await connection();

  await queryClient.prefetchQuery({
    queryKey: [queryKeys.stats.summaryCards],
    queryFn: () =>
      getSummaryCardsData({
        start_date: getTodayDate(),
        end_date: getTodayDate(),
      }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SummaryCards />
    </HydrationBoundary>
  );
}

export default GetSummaryCards;
