"use client";

import { StatsCardSkeleton } from "@/components/shared/skeltons/StatsCardSkeleton";
import { useDateRange } from "@/providers/DateRangeProvider";
import { useQuery } from "@tanstack/react-query";
import { Banknote, Cpu, PackageCheck } from "lucide-react";
import BundleSoldBreakdownDialog from "./BundleSoldBreakdown";
import { StatCard } from "./StatCard";
import { queryKeys } from "@/lib/query-keys/keys";
import { getSummaryCardsData } from "@/services/dashboard.services";

export function SummaryCards() {
  const { start_date, end_date } = useDateRange();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey:
      start_date && end_date
        ? [queryKeys.stats.summaryCards, start_date, end_date]
        : [queryKeys.stats.summaryCards],
    queryFn: () => getSummaryCardsData({ start_date, end_date }),
  });

  if (isLoading) {
    return <StatsCardSkeleton cardCount={5} />;
  }

  if (!isSuccess) {
    throw new Error("Could not get summary cards data");
  }
  const { balance, bundle_sold, esim_sold, bundle_sold_breakdown } = data;

  const stats = [
    {
      title: "Balance",
      icon: <Banknote size={20} />,
      value: balance,
    },
    {
      title: "Bundle Sold",
      icon: <PackageCheck size={20} />,
      value: bundle_sold,
    },

    {
      title: "eSIM Sold",
      icon: <Cpu size={20} />,
      value: esim_sold,
    },
  ];

  const colors = [
    { bg: "bg-red-100", text: "text-red-700" },
    { bg: "bg-blue-100", text: "text-blue-700" },
    { bg: "bg-green-100", text: "text-green-700" },
    { bg: "bg-yellow-100", text: "text-yellow-700" },
    { bg: "bg-purple-100", text: "text-purple-700" },
    { bg: "bg-pink-100", text: "text-pink-700" },
    { bg: "bg-indigo-100", text: "text-indigo-700" },
    { bg: "bg-orange-100", text: "text-orange-700" },
  ];

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4  *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs  @xl/main:grid-cols-2 @5xl/main:grid-cols-5">
      {stats.map((item, index) => {
        const color = colors[index % colors.length]; // rotate colors
        return item.title === "Bundle Sold" ? (
          <StatCard
            key={index}
            title={item.title}
            icon={item.icon}
            iconBg={color.bg}
            iconColor={color.text}
            value={item.value}
          >
            <BundleSoldBreakdownDialog
              bundleSoldBreakDown={bundle_sold_breakdown}
            />
          </StatCard>
        ) : (
          <StatCard
            key={index}
            title={item.title}
            icon={item.icon}
            iconBg={color.bg}
            iconColor={color.text}
            value={item.value}
          />
        );
      })}
    </div>
  );
}
