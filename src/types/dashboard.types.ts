export type BundleSoldBreakdown = {
  regional: number;
  local: number;
  global: number;
};

export interface DashboardSummary {
  balance: number;
  esim_sold: number;
  bundle_sold: number;
  bundle_sold_breakdown: BundleSoldBreakdown;
}

export interface DashboardSummaryResponse {
  status: boolean;
  data: {
    summerycards: DashboardSummary;
  };
}

export interface GetSixMonthsSalesResponse {
  status: boolean;
  data: {
    six_month: {
      months: string[]; // ["Aug", "Jul", ...]
      esim_sold: number[]; // [0, 1, 0, ...]
      bundle_count: number[]; // [0, 1, 0, ...]
      sale: number[]; // [0, 1.64, 0, ...]
      profit: number[]; // [0, 0, 0, ...]
    };
  };
}

export type CountryStat = {
  name: string;
  emoji: string;
  total_packages: number;
  total_price: number;
};

export type PackagesStat = {
  name: string;
  total_packages: number;
  total_price: number;
};

export type DealerStat = {
  name: string;
  total_packages: number;
  total_price: number;
};

// Main response type
export type GetTop10StatsResponse = {
  status: boolean;
  data: {
    top: {
      country_stats: CountryStat[];
      top_bundles: PackagesStat[];
      top_dealers: DealerStat[];
      top_dealer_bundles: PackagesStat[];
    };
  };
};

export interface StatsOverviewResponse {
  status: boolean;
  data: {
    overview: {
      all_bundles_amount: number;
      dealer_sale_amount: number;
      dealer_profit: number;
      bundle_count: number;
      dealer_bundle_count: number;
      esim_sold: number;
      dealer_esim_sold: number;
      wallet_refill: number;
    };
  };
}

export interface AllTimeStatsResponse {
  status: boolean;
  data: {
    all_time: {
      total_wallet_refill: number;
      total_bundle_sold: number;
      total_esim_sold: number;
      total_dealer: number;
      total_sale_made_by_dealer: number;
      total_profit_earn_from_dealer: number;
    };
  };
}

export type CustomerActivity = {
  new_users: number;
  sim_buy: number;
  visitor: number;
  renew_packages: number;
};

export interface CustomerActivityResponse {
  status: boolean;
  data: {
    customer_activity: CustomerActivity;
  };
}

export type StatsFilter = {
  start_date: string | null;
  end_date: string | null;
};
