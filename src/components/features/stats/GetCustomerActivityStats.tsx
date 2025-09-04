import { getCustomerActivity } from "@/services/dashboard.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CustomerActivityPieChart from "./CustomerActivityPieChart";
import { queryKeys } from "@/lib/query-keys/keys";

async function GetCustomerActivityStats() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [queryKeys.stats.customerActivity],
    queryFn: () => getCustomerActivity(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CustomerActivityPieChart />
    </HydrationBoundary>
  );
}

export default GetCustomerActivityStats;
