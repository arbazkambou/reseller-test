"use server";

import { globalErrorHandler } from "@/helpers/globalHanlers";
import { api } from "@/lib/api";
import { auth } from "@/lib/auth";
import { GetEsimsResponse, SimUsageResponse } from "@/types/sims.types";

export async function getMyEsims() {
  try {
    const session = await auth();
    const data = await api<GetEsimsResponse>(
      "/portal/my-all-esims",
      session?.accessToken
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
      session?.accessToken
    );

    if (!data.status) {
      throw new Error("Could not get sim usage");
    }

    return data;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}
