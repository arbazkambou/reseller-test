import { AddCreditFormSchema } from "@/lib/zod-schemas/AddCreditFormSchema";
import { UpdateDealerFormSchema } from "@/lib/zod-schemas/EditDealerFormSchema";
import z from "zod";

export interface getDealersResponse {
  status: boolean;
  count: number;
  data: Dealer[];
  pagination: Pagination;
}

export interface Dealer {
  id: number;
  name: string;
  email: string;
  balance: number;
  created_at: string;
  updated_at: string;
  status: string;
}

export interface NewlyCreatedDealer extends Dealer {
  role_id: string;
  parent_id: string;
}

export interface AddDealerInputs {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  status: string;
}

export interface AddDealerResponse {
  status: boolean;
  message: string;
  data: NewlyCreatedDealer;
}

export type UpdateDealerInputs = z.infer<typeof UpdateDealerFormSchema> & {
  dealerId: string;
};

export type UpdatedDealer = Omit<Dealer, "balance" | "created_at">;

export interface UpdateDealerResponse {
  status: boolean;
  message: string;
  data: UpdatedDealer;
}

export type AddDealerCreditsInputs = z.infer<typeof AddCreditFormSchema> & {
  dealerId: string;
};

export interface AddDealerCreditResponse {
  status: boolean;
  message: string;
  data: {
    dealer_id: number;
    dealer_change: number;
    reseller_change: number;
  };
}

export type UserInfo = {
  id: number;
  name: string;
  email: string;
  blocked: "Yes" | "No";
  balance: string;
  app_platform: string;
  app_version: string;
  email_verified: "Yes" | "No";
  created_at: string;
  updated_at: string;
};

export type RefillHistory = {
  id: string;
  amount: string;
  source: string;
  description: string;
  created_at: string;
};

export type BundlePurchased = {
  id: number;
  sim_id: string;
  // iccid: string;
  package_name: string;
  initial_data: string;
  data_remaining: string;
  price: number;
  provider_name: string;
  // status: string;
  created_at: string;
};

export type EsimPurchased = {
  id: string;
  iccid: string;
  status: string;
  provider_name: string;
  installed_at: string;
  created_at: string;
};

export interface DealerDetailsResponse {
  status: boolean;
  message: string;
  data: {
    user_info: UserInfo;
    refill_history: {
      count: number;
      data: RefillHistory[];
      pagination: Pagination;
    };
    bundles_purchased: {
      count: number;
      data: BundlePurchased[];
      pagination: Pagination;
    };
    esims_purchased: {
      count: number;
      data: EsimPurchased[];
      pagination: Pagination;
    };
  };
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
