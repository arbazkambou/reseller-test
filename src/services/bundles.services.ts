import { globalErrorHandler } from "@/helpers/globalHanlers";
import { api } from "@/lib/api";
import { auth } from "@/lib/auth";
import { GetBundlessResponse } from "@/types/bundles.types";

export async function getBundles() {
  try {
    const session = await auth();
    const data = await api<GetBundlessResponse>(
      "/portal/bundles-data",
      session?.accessToken
    );

    return data.data;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}
