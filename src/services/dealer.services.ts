"use server";

import { globalErrorHandler } from "@/helpers/globalHanlers";
import { api } from "@/lib/api";
import { auth } from "@/lib/auth";
import {
  AddDealerInputs,
  AddDealerResponse,
  DealerDetailsResponse,
  getDealersResponse,
  UpdateDealerInputs,
  UpdateDealerResponse,
} from "@/types/dealers.types";
import { revalidateTag } from "next/cache";

export async function getDealers() {
  try {
    const session = await auth();
    const data = await api<getDealersResponse>(
      `/portal/dealers`,
      session?.accessToken,
      {
        next: { tags: ["dealers"] },
      }
    );

    if (!data.status) {
      throw new Error("Could not get dealers");
    }

    return data.data;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}

export async function addDealer({ ...inputs }: AddDealerInputs) {
  try {
    const session = await auth();
    const data = await api<AddDealerResponse>(
      "/portal/dealers/store",
      session?.accessToken,
      {
        body: { ...inputs },
        method: "POST",
      }
    );

    revalidateTag("dealers");

    return data;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}

export async function updateDealer({
  dealerId,
  ...inputs
}: UpdateDealerInputs) {
  try {
    const session = await auth();
    const data = await api<UpdateDealerResponse>(
      `/portal/dealers/${dealerId}`,
      session?.accessToken,
      {
        body: { ...inputs },
        method: "PUT",
      }
    );

    revalidateTag("dealers");

    return data;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}

export async function getDealerDetail({ dealerId }: { dealerId: string }) {
  try {
    const session = await auth();
    const data = await api<DealerDetailsResponse>(
      `/portal/dealers/${dealerId}`,
      session?.accessToken,
      {
        method: "GET",
      }
    );

    return data.data;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}
