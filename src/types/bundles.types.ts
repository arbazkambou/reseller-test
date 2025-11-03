import { Pagination } from "./dealers.types";

export type Bundle = {
  id: string;
  sim_id: string;
  iccid: string;
  name: string;
  // initial_data_in_bytes: string;
  // data_usage_remaining_in_bytes: string;
  initial_data: string;
  status: string;

  remaining_data: string;
  price: number;
  provider_name: string;
  created_at: string;
  updated_at: string;
};

export type GetBundlessResponse = {
  status: boolean;
  count: number;
  data: Bundle[];
  pagination: Pagination;
};
