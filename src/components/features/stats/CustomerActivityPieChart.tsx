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
import { useDateRange } from "@/providers/DateRangeProvider";
import { getCustomerActivity } from "@/services/dashboard.services";
import { useQuery } from "@tanstack/react-query";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

function CustomerActivityPieChart() {
  const { start_date, end_date } = useDateRange();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey:
      start_date && end_date
        ? [queryKeys.stats.customerActivity, start_date, end_date]
        : [queryKeys.stats.customerActivity],
    queryFn: () =>
      getCustomerActivity({
        start_date: start_date ? start_date : getTodayDate(),
        end_date: end_date ? end_date : getTodayDate(),
      }),
  });

  if (isLoading) {
    return <ChartSkeleton />;
  }

  if (!isSuccess) {
    throw new Error("Could not get customer activity.");
  }

  const chartData = [
    { name: "New Users", value: data.new_users, key: "new_users" },
    { name: "SIM Buy", value: data.sim_buy, key: "sim_buy" },
    { name: "Visitors", value: data.visitor, key: "visitor" },
    {
      name: "Renew Packages",
      value: data.renew_packages,
      key: "renew_packages",
    },
  ];

  const config = {
    new_users: { label: "New Users", color: "var(--chart-1)" },
    sim_buy: { label: "SIM Buy", color: "var(--chart-2)" },
    visitor: { label: "Visitors", color: "var(--chart-3)" },
    renew_packages: { label: "Renew Packages", color: "var(--chart-4)" },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={config} className="aspect-auto h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {chartData.map((entry) => (
              <Cell
                key={entry.key}
                fill={config[entry.key as keyof typeof config].color}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export default CustomerActivityPieChart;
