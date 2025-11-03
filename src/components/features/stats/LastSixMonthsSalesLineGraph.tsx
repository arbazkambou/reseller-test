"use client";

import ChartSkeleton from "@/components/shared/skeltons/ChartSkelton";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getTodayDate } from "@/helpers/getTodayDate";
import { queryKeys } from "@/lib/query-keys/keys";
import { getSixMonthsSalesData } from "@/services/dashboard.services";
import { useQuery } from "@tanstack/react-query";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

function LastSixMonthsSalesLineGraph() {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [queryKeys.stats.sixMonthsSales],
    queryFn: () =>
      getSixMonthsSalesData({
        start_date: getTodayDate(),
        end_date: getTodayDate(),
      }),
  });

  if (isLoading) {
    return <ChartSkeleton />;
  }

  if (!isSuccess) {
    throw new Error("Could not get last six month sales data");
  }

  const config = {
    esim_sold: { label: "eSIM Sold", color: "var(--chart-1)" },
    bundle_count: { label: "Bundles", color: "var(--chart-2)" },
    sale: { label: "Sales ($)", color: "var(--chart-3)" },
    profit: { label: "Profit ($)", color: "var(--chart-4)" },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={config} className="aspect-auto h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <YAxis />
          <Legend />
          <ChartTooltip content={<ChartTooltipContent />} />

          <Line
            type="monotone"
            dataKey="esim_sold"
            stroke="var(--chart-1)"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="bundle_count"
            stroke="var(--chart-2)"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="sale"
            stroke="var(--chart-3)"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="profit"
            stroke="var(--chart-4)"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export default LastSixMonthsSalesLineGraph;
