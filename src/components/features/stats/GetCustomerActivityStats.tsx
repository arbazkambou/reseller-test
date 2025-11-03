import { getCustomerActivity } from "@/services/dashboard.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CustomerActivityPieChart from "./CustomerActivityPieChart";
import { queryKeys } from "@/lib/query-keys/keys";
import { getTodayDate } from "@/helpers/getTodayDate";
import { connection } from "next/server";

async function GetCustomerActivityStats() {
  const queryClient = new QueryClient();
  await connection();

  await queryClient.prefetchQuery({
    queryKey: [queryKeys.stats.customerActivity],
    queryFn: () =>
      getCustomerActivity({
        start_date: getTodayDate(),
        end_date: getTodayDate(),
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CustomerActivityPieChart />
    </HydrationBoundary>
  );
}

export default GetCustomerActivityStats;
