"use client";

import { StatsCardSkeleton } from "@/components/shared/skeltons/StatsCardSkeleton";
import { queryKeys } from "@/lib/query-keys/keys";
import { getAllTimeStats } from "@/services/dashboard.services";
import { useQuery } from "@tanstack/react-query";
import {
  Cpu,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { StatCard } from "./StatCard";
import StatsGrid from "./StatsGrid";

export function AllTimeStats() {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [queryKeys.stats.allTime],
    queryFn: () => getAllTimeStats(),
  });

  if (isLoading) {
    return <StatsCardSkeleton cardCount={5} />;
  }

  if (!isSuccess) {
    throw new Error("Could not get all time overview");
  }

  const {
    total_bundle_sold,
    total_dealer,
    total_esim_sold,
    total_profit_earn_from_dealer,
    total_sale_made_by_dealer,
    total_wallet_refill,
  } = data;

  const statsAllTime = [
    {
      title: "Total Wallet Refill",
      icon: <Wallet size={20} />,
      value: total_wallet_refill,
    },
    {
      title: "Total Bundles Sold",
      icon: <Package size={20} />,
      value: total_bundle_sold,
    },
    {
      title: "Total eSIM Sold",
      icon: <Cpu size={20} />,
      value: total_esim_sold,
    },
    {
      title: "Total Dealers",
      icon: <Users size={20} />,
      value: total_dealer,
    },
    {
      title: "Dealer Sales",
      icon: <ShoppingCart size={20} />,
      value: total_sale_made_by_dealer,
    },
    {
      title: "Dealer Profit",
      icon: <TrendingUp size={20} />,
      value: total_profit_earn_from_dealer,
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
      {statsAllTime.map((item, index) => {
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
