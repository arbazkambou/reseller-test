import { signIn } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const nonce = searchParams.get("nonce");

  const origin = process.env.NEXTAUTH_URL as string;

  if (!nonce) {
    return NextResponse.redirect(new URL("/login", origin));
  }

  try {
    await signIn("credentials", { nonce, redirect: false });

    return NextResponse.redirect(new URL("/reseller", origin));
  } catch {
    return NextResponse.redirect(new URL("/login", origin));
  }
}
