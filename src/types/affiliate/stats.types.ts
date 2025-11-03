export interface AffiliateStatsResponse {
  status: boolean;
  data: AffiliateStats;
}

export interface AffiliateStats {
  curr_esims: number;
  curr_bundles: number;
  promo_esims: number;
  curr_bundles_price: number;
  curr_bundles_profit: number;
  country_stats: CountryStat[];
  top_bundles: TopBundle[];
  top_users: TopUser[];
}

export interface CountryStat {
  name: string;
  code: string;
  code_alpha3: string;
  emoji: string;
  slug: string;
  total_packages: number;
  total_price: number;
}

export interface TopBundle {
  name: string;
  total_packages: number;
  total_price: number;
}

export interface TopUser {
  name: string;
  email: string;
  role_id: number;
  total_packages: number;
  total_price: number;
  total_cost: number;
}

// types/api.ts

// Represents a single purchased data item
export interface AffiliatePurchasedPackage {
  id: string;
  name: string;
  user_name: string;
  price: number;
  promocode: string;
  purchased_at: string; // ISO date string
}

// Pagination info
export interface Pagination {
  currentCount: number;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// Main API response
export type AffiliatePurchasedPackagesResponse = {
  status: boolean;
  message: string;
  data: AffiliatePurchasedPackage[];
  pagination: Pagination;
};
