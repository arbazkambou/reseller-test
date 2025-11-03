import { getSixMonthsSalesData } from "@/services/dashboard.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import LastSixMonthsSalesLineGraph from "./LastSixMonthsSalesLineGraph";
import { queryKeys } from "@/lib/query-keys/keys";

async function GetLastSixMonthSales() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [queryKeys.stats.sixMonthsSales],
    queryFn: () => getSixMonthsSalesData(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LastSixMonthsSalesLineGraph />
    </HydrationBoundary>
  );
}

export default GetLastSixMonthSales;
