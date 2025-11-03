"use server";

import { globalErrorHandler } from "@/helpers/globalHanlers";
import { api } from "@/lib/api";
import { auth } from "@/lib/auth";
import { queryKeys } from "@/lib/query-keys/keys";
import { GetEsimsResponse, SimUsageResponse } from "@/types/sims.types";

export async function getMyEsims({ queryString }: { queryString: string }) {
  try {
    const session = await auth();
    const data = await api<GetEsimsResponse>(
      `/esims?${queryString}`,
      session?.accessToken,
      { next: { tags: [queryKeys.sims.myEsims] }, role: session?.user.role }
    );

    if (!data.status) {
      throw new Error("can not get my esims");
    }
    return data;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}

export async function getSimDetail({ id }: { id: string }) {
  try {
    const session = await auth();
    const data = await api<SimUsageResponse>(
      `/my-esims/${id}`,
      session?.accessToken,
      { role: session?.user.role }
    );

    if (!data.status) {
      throw new Error("Could not get sim usage");
    }

    return data;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}
