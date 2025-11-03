"use client";

import { StatsCardSkeleton } from "@/components/shared/skeltons/StatsCardSkeleton";
import { useDateRange } from "@/providers/DateRangeProvider";
import { getStatsOverview } from "@/services/dashboard.services";
import { useQuery } from "@tanstack/react-query";
import {
  Banknote,
  Cpu,
  Package,
  PackageCheck,
  ShoppingCart,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { StatCard } from "./StatCard";
import { queryKeys } from "@/lib/query-keys/keys";
import { getTodayDate } from "@/helpers/getTodayDate";
import StatsGrid from "./StatsGrid";

export function StatsOverview() {
  const { start_date, end_date } = useDateRange();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey:
      start_date && end_date
        ? [queryKeys.stats.overview, start_date, end_date]
        : [queryKeys.stats.overview],

    queryFn: () =>
      getStatsOverview({
        start_date: start_date ? start_date : getTodayDate(),
        end_date: end_date ? end_date : getTodayDate(),
      }),
  });

  if (isLoading) {
    return <StatsCardSkeleton cardCount={5} />;
  }

  if (!isSuccess) {
    throw new Error("Could not get stats overview");
  }

  const {
    esim_sold,
    all_bundles_amount,
    bundle_count,
    dealer_bundle_count,
    dealer_esim_sold,
    dealer_profit,
    dealer_sale_amount,
    wallet_refill,
  } = data;

  const statsOverview = [
    {
      title: "All Bundles Amount",
      icon: <Banknote size={20} />,
      value: all_bundles_amount,
    },
    {
      title: "Dealer Sale Amount",
      icon: <ShoppingCart size={20} />,
      value: dealer_sale_amount,
    },
    {
      title: "Dealer Profit",
      icon: <TrendingUp size={20} />,
      value: dealer_profit,
    },
    {
      title: "Bundle Count",
      icon: <Package size={20} />,
      value: bundle_count,
    },
    {
      title: "Dealer Bundle Count",
      icon: <PackageCheck size={20} />,
      value: dealer_bundle_count,
    },
    {
      title: "eSIM Sold",
      icon: <Cpu size={20} />,
      value: esim_sold,
    },
    {
      title: "Dealer eSIM Sold",
      icon: <Users size={20} />,
      value: dealer_esim_sold,
    },
    {
      title: "Wallet Refill",
      icon: <Wallet size={20} />,
      value: wallet_refill,
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
    <StatsGrid>
      {statsOverview.map((item, index) => {
        const color = colors[index % colors.length]; // rotate colors
        return (
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
    </StatsGrid>
  );
}
