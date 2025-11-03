"use server";

import { globalErrorHandler } from "@/helpers/globalHanlers";
import { api } from "@/lib/api";
import { auth } from "@/lib/auth";
import { GetBundlessResponse } from "@/types/bundles.types";

export async function getBundles({ queryString }: { queryString: string }) {
  try {
    const session = await auth();
    const data = await api<GetBundlessResponse>(
      `/assign-packages?${queryString}`,
      session?.accessToken,
      { role: session?.user.role }
    );

    return data;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}
