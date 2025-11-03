"use server";

import { globalErrorHandler } from "@/helpers/globalHanlers";
import { api } from "@/lib/api";
import { auth } from "@/lib/auth";
import { queryKeys } from "@/lib/query-keys/keys";
import {
  AddDealerInputs,
  AddDealerResponse,
  DealerDetailsResponse,
  getDealersResponse,
  UpdateDealerInputs,
  UpdateDealerResponse,
} from "@/types/dealers.types";
import { updateTag } from "next/cache";

export async function getDealers({ queryString }: { queryString: string }) {
  try {
    const session = await auth();
    const data = await api<getDealersResponse>(
      `/dealers?${queryString}`,
      session?.accessToken,
      {
        next: { tags: [queryKeys.dealers.get] },

        role: session?.user.role,
      }
    );

    if (!data.status) {
      throw new Error("Could not get dealers");
    }

    return data;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}

export async function addDealer({ ...inputs }: AddDealerInputs) {
  try {
    const session = await auth();
    const data = await api<AddDealerResponse>(
      "/dealers/store",
      session?.accessToken,
      {
        body: { ...inputs },
        method: "POST",
        role: session?.user.role,
      }
    );

    updateTag(queryKeys.dealers.get);

    return data;
  } catch (error) {
    return { status: false, message: globalErrorHandler(error) };
  }
}

export async function updateDealer({
  dealerId,
  ...inputs
}: UpdateDealerInputs) {
  try {
    const session = await auth();
    const data = await api<UpdateDealerResponse>(
      `/dealers/${dealerId}`,
      session?.accessToken,
      {
        body: { ...inputs },
        method: "PUT",
        role: session?.user.role,
      }
    );

    updateTag(queryKeys.dealers.get);

    return data;
  } catch (error) {
    return { status: false, message: globalErrorHandler(error) };
  }
}

export async function getDealerDetail({
  dealerId,
  queryString,
}: {
  dealerId: string;
  queryString?: string;
}) {
  try {
    const session = await auth();
    const data = await api<DealerDetailsResponse>(
      `/dealers/${dealerId}?${queryString}`,
      session?.accessToken,
      {
        next: { tags: [queryKeys.dealers.detail] },
        role: session?.user.role,
      }
    );

    return data;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}
