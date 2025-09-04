"use server";

import { globalErrorHandler } from "@/helpers/globalHanlers";
import { api } from "@/lib/api";
import { auth } from "@/lib/auth";
import { 
  GetCreditResponse, 
  CreateStripeSessionRequest, 
  CreateStripeSessionResponse,
  StripeRedirectResponse 
} from "@/types/credits.types";
import {
  AddDealerCreditResponse,
  AddDealerCreditsInputs,
} from "@/types/dealers.types";
import { revalidatePath } from "next/cache";

export async function addDealerCredit({
  dealerId,
  ...inputs
}: AddDealerCreditsInputs) {
  try {
    const session = await auth();
    const data = await api<AddDealerCreditResponse>(
      `/portal/dealers/${dealerId}/add-credits`,
      session?.accessToken,
      {
        body: { ...inputs },
        method: "POST",
      }
    );

    revalidatePath("/dealers");

    return data;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}

export async function getCredits() {
  try {
    const session = await auth();
    const data = await api<GetCreditResponse>(
      `/portal/credits`,
      session?.accessToken
    );

    return data;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}

export async function createStripeSession(inputs: CreateStripeSessionRequest) {
  try {
    const session = await auth();
    const data = await api<CreateStripeSessionResponse>(
      `/portal/credits/stripe-session`,
      session?.accessToken,
      {
        body: { ...inputs },
        method: "POST",
      }
    );

    return data;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}

export async function handleStripeRedirect(result: string, searchParams?: Record<string, string>) {
  try {
    const session = await auth();
    const stripeSessionId = searchParams?.session_id;
    const amount = searchParams?.amount;
    const type = searchParams?.type || 'wallet refill';

    const queryParams = new URLSearchParams();
    if (stripeSessionId) queryParams.append('stripe_session_id', stripeSessionId);
    if (amount) queryParams.append('amount', amount);
    if (type) queryParams.append('type', type);

    const data = await api<StripeRedirectResponse>(
      `/portal/credits/stripe-redirect/${result}?${queryParams.toString()}`,
      session?.accessToken,
      {
        method: "GET",
      }
    );
    return data;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}
