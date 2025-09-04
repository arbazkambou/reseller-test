export interface GetCreditResponse {
  status: boolean;
  message: string;
  count: number;
  data: Credit[];
}

export interface Credit {
  id: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  amount: string; // notice it's a string in your JSON
  source: string;
  description: string;
  sim_package_id: string;
  sim_id: string;
  created_at: string; // ISO datetime string
}

// Topup related types
export interface CreateStripeSessionRequest {
  amount: number;
}

export interface CreateStripeSessionResponse {
  status: boolean;
  message: string;
  data: {
    id: string;
    url: string;
    amount: number;
    currency: string;
    customer_id: string;
  };
}

export interface StripeRedirectResponse {
  status: boolean;
  message: string;
  data?: {
    payment_intent: string;
    amount: number;
    status: string;
    wallet_balance?: number;
  };
}
