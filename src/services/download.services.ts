"use server";

import { globalErrorHandler } from "@/helpers/globalHanlers";
import { api } from "@/lib/api";
import { auth } from "@/lib/auth";
import { DownloadPricingResponse } from "@/types/reports.types";

export async function downloadReport({ type }: { type: string }) {
  try {
    const session = await auth();

    const data = await api<DownloadPricingResponse>(
      `/reports/${type}`,
      session?.accessToken,
      {
        method: "GET",
        role: session?.user.role,
      }
    );

    return data;
  } catch (error) {
    return { status: false, message: globalErrorHandler(error) };
  }
}
