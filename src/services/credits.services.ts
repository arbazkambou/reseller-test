"use server";

import { globalErrorHandler } from "@/helpers/globalHanlers";
import { api } from "@/lib/api";
import { auth } from "@/lib/auth";
import { queryKeys } from "@/lib/query-keys/keys";
import {
  CreateStripeSessionRequest,
  CreateStripeSessionResponse,
  GetCreditResponse,
  StripeRedirectResponse,
} from "@/types/credits.types";
import {
  AddDealerCreditResponse,
  AddDealerCreditsInputs,
} from "@/types/dealers.types";
import { updateTag } from "next/cache";

export async function addDealerCredit({
  dealerId,
  ...inputs
}: AddDealerCreditsInputs) {
  try {
    const session = await auth();
    const data = await api<AddDealerCreditResponse>(
      `/dealers/${dealerId}/add-credits`,
      session?.accessToken,
      {
        body: { ...inputs },
        method: "POST",
        role: session?.user.role,
      }
    );

    updateTag(queryKeys.dealers.get);
    updateTag(queryKeys.auth.user);
    updateTag(queryKeys.credits.get);

    return data;
  } catch (error) {
    return { status: false, message: globalErrorHandler(error) };
  }
}

export async function getCredits({ queryString }: { queryString: string }) {
  try {
    const session = await auth();
    const data = await api<GetCreditResponse>(
      `/credits?${queryString}`,
      session?.accessToken,
      { next: { tags: [queryKeys.credits.get] }, role: session?.user.role }
    );

    return data;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}

export async function createStripeSession({
  inputs,
  redirect_url,
}: {
  inputs: CreateStripeSessionRequest;
  redirect_url: string;
}) {
  try {
    const session = await auth();

    const data = await api<CreateStripeSessionResponse>(
      `/credits/stripe-session`,
      session?.accessToken,
      {
        body: { ...inputs, redirect_url },
        method: "POST",
        role: session?.user.role,
      }
    );

    return data;
  } catch (error) {
    return { status: false, message: globalErrorHandler(error) };
  }
}

export async function handleStripeRedirect(
  result: string,
  searchParams?: Record<string, string>
) {
  try {
    const session = await auth();
    const stripeSessionId = searchParams?.session_id;
    const amount = searchParams?.amount;
    const type = searchParams?.type || "wallet refill";

    const queryParams = new URLSearchParams();
    if (stripeSessionId)
      queryParams.append("stripe_session_id", stripeSessionId);
    if (amount) queryParams.append("amount", amount);
    if (type) queryParams.append("type", type);

    const data = await api<StripeRedirectResponse>(
      `/credits/stripe-redirect/${result}?${queryParams.toString()}`,
      session?.accessToken,
      {
        method: "GET",
        role: session?.user.role,
      }
    );

    updateTag(queryKeys.auth.user);
    updateTag(queryKeys.credits.get);
    return data;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}
