export interface LoginUserInputType {
  email?: string;
  password?: string;
  nonce?: string;
}

// export interface AdminRole {
//   nonce: string;
//   type: string;
// }

export interface LoginUserType {
  id: string;
  name: string;
  email: string;
  balance: number;
  // role_id: number;
  // updated_at: string;
  // created_at: string;
  // email_verified_at: string;
  // blocked: string | null;
  // deleted_at: string | null;
  // image_url: string | null;
  // phone_number: string | null;
  access_token: string;
  role: Role;
  emailVerified: Date;
}

export interface LoginUserResponseType {
  status: boolean;
  message: string;
  errors?: string[];
  access_token: string;
  user: LoginUserType;
  // data: AdminRole;
}

export interface User {
  id: number;
  role_id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  stripe_id: string | null;
  pm_type: string | null;
  pm_last_four: string | null;
  trial_ends_at: string | null;
  deleted_at: string | null;
  blocked: string | number;
  should_logout: number;
  app_version: string | null;
  platform: string | null;
  limit_forced: number;
  business_name: string | null;
  business_address: string | null;
  phone_number: string | null;
  parent_id: number | null;
  status: number;
  image_url: string | null;
  created_by_id: number | null;
  referral: string | null;
  last_login_at: string | null;
  last_request_at: string | null;
  display_name: string | null;
  call_block: number;
  minutes_limit: number;
  postpaid_enable: number;
  postpaid_limit: string | number;
  number_allowed: number;
  day_purchase_limit: number;
  sms_block: number;
  pricing_tier_id: number;
  stripe_count: number;
  stripe_cost: string | number;
  affiliate_promo_code_id: number | null;
  un_subscribe: number;
  sip_connection_id: number | null;
  sip_connection_username: string | null;
  sip_connection_password: string | null;
  info: string | null;
  balance: number;
  gateway_details: {
    gateway: string;
    key: string;
    secret: string;
  } | null;
}

export type Role = "dealer" | "reseller" | "affiliate";
