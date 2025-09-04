"use server";

import {
  globalErrorHandler,
  globalResponseHandler,
} from "@/helpers/globalHanlers";
import { signIn } from "@/lib/auth";
import { baseUrl } from "../lib/api";
import { LoginUserInputType, LoginUserResponseType } from "@/types/auth.types";

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
