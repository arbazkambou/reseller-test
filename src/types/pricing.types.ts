import { Pagination } from "./dealers.types";

export type Country = {
  id: number;
  continent_id: number;
  name: string;
  full_name: string;
  capital: string;
  code: string;
  code_alpha3: string;
  code_numeric: string;
  emoji: string;
  has_division: number;
  currency_code: string;
  currency_name: string;
  tld: string;
  callingcode: string;
  created_at: string | null;
  updated_at: string | null;
  priority: number;
  vonage_number_supported: number;
  cover_image: string | null;
  gradient_from: string;
  gradient_to: string;
  slug: string;
  rating: number;
  review: number;
  local_state_code: string | null;
  two_way_sms: number;
  additional_dial_code: string | null;
  packages_to_use: Package[];
};

export type Provider = {
  id: number;
  name: string;
  status: number;
  created_at: string;
  updated_at: string;
  is_external: number;
  image: string | null;
  code: string;
  partner_name: string;
  can_renew: number;
  parent_id: number | null;
  details: string | null;
};

export type Package = {
  id: string; // uuid
  external_id: string;
  name: string;
  activationTimeAllowanceInSeconds: number | null;
  trafficPolicyId: string | null;
  supportedCountries: string;
  preferredImsiId: string | null;
  voiceUsageAllowanceInSeconds: string;
  dataUsageAllowanceInBytes: string;
  smsUsageAllowanceInNums: string;
  timeAllowanceInSeconds: string;
  activationType: string;
  dateEarliestActivation: string | null;
  dateEarliestAvailable: string | null;
  dateLatestAvailable: string | null;
  notes: string | null;
  dataUsageAllowanceType: string;
  voiceUsageAllowanceType: string;
  smsUsageAllowanceType: string;
  epochCreated: string | null;
  epochModified: string | null;
  timeAllowance: string | null;
  status: string;
  dateDeactivated: string | null;
  inventory_id: string | null;
  created_at: string;
  updated_at: string;
  price: number;
  can_sell: number;
  provider_id: number;
  base_price: number;
  parent_id: number | null;
  connectivity: string;
  regional: number;
  global: number;
  tier: string;
  package_type: string;
  roaming: number;
  throttling: number;
  country_id: number;
  local: number;
  continent_id: number | null;
  unlimited: number;
  client_enable: number;
  reseller_enable: number;
  discount: number;
  discount_percentage: number;
  other_info: string | null;
  tether: number;
  promotion: number;
  promotion_name: string | null;
  daily_limit: number | null;
  minimum_speed: number | null;
  wifi_calling: number;
  json: string | null;
  display_name: string;
  provider: Provider;
  data: Data;
  time: Time;
};

export type GetCountriesWithPricingResponse = {
  status: boolean;
  data: {
    max_packages_count: number;
    countries: Country[];
  };
};

export interface FlattedCountryWithPrice extends Package {
  country_name: string;
  country_flag: string;
}

export interface PriceTier {
  id: number;
  name: string;
  code: string;
  percentage: string;
  default: boolean;
  assigned_users: number;
  created_at: string;
  updated_at: string;
}

export interface GetPricingTiersResponse {
  status: boolean;
  data: PriceTier[];
  pagination: Pagination;
}

export interface DeletePricingTierResponse {
  status: boolean;
  message: string;
}

export interface Data {
  value: number;
  unit: string;
  is_unlimited: boolean;
}

export interface Time {
  value: number;
  unit: string;
  months: number;
}

export type CountryTier = {
  id: number;
  continent_id: number;
  name: string;
  code: string; // e.g. "af"
  emoji: string; // e.g. 🇦🇫
  slug: string;
};

export type ContinentTier = {
  id: number;
  name: string; // e.g. "Africa"
  code: string; // e.g. "af"
  slug: string;
  image_url: string;
};

export type GlobalTier = {
  id: string;
  name: string;
  emoji: string;
  code: string;
};

export type UserTier = { id: number; name: string; email: string };

export type DataForCreatingPriceTierResponse = {
  success: boolean;
  message: string;
  data: {
    countries: CountryTier[];
    continents: ContinentTier[];
    global: GlobalTier[];
    users: UserTier[];
  };
};

export type PricingPayload = {
  name: string;
  percent: number;
  default: boolean;
  countries: { [code: string]: number }[];
  continents: { [code: string]: number }[];
  global: { [code: string]: number }[];
  users: number[];
};

export type CreatePricingTierResponse = {
  status: boolean;
  message: string;
};

export type ExistingPriceTier = { id: number; percent: number };

export type ExistingGlobalPriceTier = { id: string; percent: number };

export type GetExistingPriceTierById = {
  data: {
    id: number;
    name: string;
    code: string;
    percentage: string; // e.g., "10.00"
    default: boolean;
    global_percent: number;
    countries: ExistingPriceTier[];
    continents: ExistingPriceTier[];
    global?: ExistingGlobalPriceTier[];
    assigned_user_ids: number[];
    created_at: string;
    updated_at: string;
  };
};
