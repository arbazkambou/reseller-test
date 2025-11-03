"use server";

import {
  globalErrorHandler,
  globalResponseHandler,
} from "@/helpers/globalHanlers";
import { auth, signIn } from "@/lib/auth";
import { queryKeys } from "@/lib/query-keys/keys";
import { AccountUpdateFormInputs } from "@/lib/zod-schemas/AccountUpdateFormSchema";
import {
  LoginUserInputType,
  LoginUserResponseType,
  User,
} from "@/types/auth.types";
import { updateTag } from "next/cache";
import { api, baseUrl } from "../lib/api";

export async function loginUser({ email, password }: LoginUserInputType) {
  try {
    const response = await fetch(`${baseUrl}/login`, {
      body: JSON.stringify({ email, password }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: LoginUserResponseType = await response.json();

    if (!response.ok || !data.status) {
      throw new Error(globalResponseHandler(data, response.status));
    }

    // return data;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}

export async function authenticate({ ...inputs }: LoginUserInputType) {
  try {
    // await loginUser({ ...inputs });

    // if (data?.data?.nonce) {
    //   return data.data;
    // }

    await signIn(`credentials`, {
      ...inputs,
      redirect: false,
    });

    return { status: true, message: "Login Successfully" };
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}

export async function fetchUser() {
  try {
    const session = await auth();

    const response = await fetch(`${baseUrl}/user`, {
      next: { tags: [queryKeys.auth.user] },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });

    const data: User = await response.json();

    return data;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}

export type UpdateUserResponse = {
  status: boolean;
  message: string;
};

export async function updateUser(userData: AccountUpdateFormInputs) {
  try {
    const session = await auth();
    const data: UpdateUserResponse = await api(
      "/user-update",

      session?.accessToken,
      {
        // role: session?.user.role,
        body: {
          name: userData.name,
          password: userData.newPassword,
          password_confirmation: userData.confirmPassword,
          reseller_pm1: userData.apiKey,
          reseller_pm2: userData.apiSecret,
          status: 1,
        },
        method: "POST",
      }
    );
    updateTag(queryKeys.auth.user);
    // revalidatePath("/reseller/account");

    return data;
  } catch (error) {
    return { status: false, message: globalErrorHandler(error) };
  }
}
