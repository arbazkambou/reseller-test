export interface PromoCode {
  id: number;
  promocode: string;
  user_id: number;
  discount_percentage: number;
  user_discount_percentage: number;
  owner_type: string;
  duration: string;
  created_at: string;
}

export interface Pagination {
  currentCount: number;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface GetPromoCodesResponse {
  status: boolean;
  message: string;
  data: PromoCode[];
  pagination: Pagination;
}

export type UpdatePromocodeResponse = {
  success: boolean;
  message: string;
};

export type UpdatePromocodeInputs = {
  promocode: string;
};
