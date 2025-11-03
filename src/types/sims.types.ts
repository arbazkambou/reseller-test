import { Pagination } from "./dealers.types";
import { Meta } from "./meta.types";

///////////////Get My Esims/////////////////////////////////
export interface Sim {
  id: string;
  iccid: string;
  qr_code_text: string;
  smdp_address: string;
  matching_id: string;
  created_at: string; // ISO timestamp
  last_bundle: string;
  status: string;
  total_bundles: number;
  puk_code: string;
  installed_at: string | null; // nullable timestamp
  number: string | null;
  universal_link: string;
  sim_applied: boolean;
  apn: string;
  imei: string | null;
}

export interface GetEsimsResponse {
  status: boolean;
  meta: Meta;
  data: Sim[];
  pagination: Pagination;
}

/////////////////////////////////Sim Usage Detail/////////////////////////////////////////////////
export interface Coverage {
  id: number;
  country_name: string;
  code: string;
  iso: string;
  country_image_url: string;
  network_name: string;
  network_code: string;
  supported_networks_coverages: string[];
  t_2G: boolean;
  th_3G: boolean;
  "for-4G": boolean;
  fiv_5G: boolean;
}

export interface DataOnlyUsage {
  initial_data_quantity: number;
  initial_data_unit: string;
  rem_data_quantity: number;
  rem_data_unit: string;
  unlimited?: boolean;
}

export interface SimPackage {
  id: string;
  package: string;
  package_id: string;
  initial_data_quantity: number;
  initial_data_unit: string;
  rem_data_quantity: number;
  rem_data_unit: string;
  date_created: string;
  created_at?: string;
  date_activated: string;
  quantity: number;
  date_expiry: string;
  activated: boolean;
  status: string;
  imei?: string;
  revoked_at: string;
}

export interface DataVoiceUsage extends DataOnlyUsage {
  initial_minutes: number;
  initial_minutes_unit: string;
  rem_minutes: number | string;
  rem_minutes_unit: string;
  initial_sms: number;
  initial_sms_unit: string;
  rem_sms: number | string;
  rem_sms_unit: string;
  initial_international_minutes_unit: string;
  initial_international_sms_unit: string;
  initial_international_minutes: number;
  initial_international_sms: number;
  extra_info: [
    {
      name: string;
      data_unit: string;
      airtime_unit: string;
      sms_remaining: number;
      data_remaining: number;
      activation_date: string;
      expiration_date: string;
      airtime_remaining: number;
    }
  ];
}

export interface SimUsageResponse {
  status: boolean;
  data: {
    sim: Sim;
    in_use_packages: SimPackage[];
    assigned_packages: SimPackage[];
    completed_packages: SimPackage[];
    revoked_packages: SimPackage[];
    coverage: Coverage[];
    overall_usage: DataOnlyUsage | DataVoiceUsage;
  };
}
