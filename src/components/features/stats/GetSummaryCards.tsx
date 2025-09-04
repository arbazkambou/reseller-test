import { queryKeys } from "@/lib/query-keys/keys";
import { getSummaryCardsData } from "@/services/dashboard.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { SummaryCards } from "./SummaryCards";

async function GetSummaryCards() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [queryKeys.stats.summaryCards],
    queryFn: () => getSummaryCardsData(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SummaryCards />
    </HydrationBoundary>
  );
}

export default GetSummaryCards;
