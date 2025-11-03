"use server";
import { globalErrorHandler } from "@/helpers/globalHanlers";
import { api } from "@/lib/api";
import { auth } from "@/lib/auth";
import { queryKeys } from "@/lib/query-keys/keys";
import {
  GetPromoCodesResponse,
  UpdatePromocodeInputs,
  UpdatePromocodeResponse,
} from "@/types/promocode.types";
import { updateTag } from "next/cache";

export async function getPromoCodes({ queryString }: { queryString?: string }) {
  try {
    const session = await auth();

    const data = await api<GetPromoCodesResponse>(
      `/promocodes?${queryString}`,
      session?.accessToken,
      {
        next: { tags: [queryKeys.promos.get] },
        role: session?.user.role,
      }
    );

    return data;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}

export async function updatePromocode(
  promoId: string,
  inputs: UpdatePromocodeInputs
) {
  try {
    const session = await auth();

    const data = await api<UpdatePromocodeResponse>(
      `/promocode/${promoId}`,
      session?.accessToken,
      {
        method: "PUT",
        body: inputs,
        role: session?.user.role,
      }
    );

    updateTag(queryKeys.promos.get);

    return data;
  } catch (error) {
    return { success: false, message: globalErrorHandler(error) };
  }
}
