import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { Role } from "./types/auth.types";

const roleBasePaths: Record<Role, string> = {
  dealer: "/dealer",
  reseller: "/reseller",
  affiliate: "/affiliate",
};

export default auth(async (req) => {
  const { pathname, origin, searchParams } = req.nextUrl;

  const session = req.auth;

  // Already logged in → redirect to role base path
  if (pathname.startsWith("/login")) {
    if (session) {
      const role = session.user.role;
      return Response.redirect(new URL(roleBasePaths[role], origin));
    }

    const nonce = searchParams.get("nonce");

    if (nonce) {
      const apiUrl = new URL(`/api/auth/nonce-login?nonce=${nonce}`, origin);
      return NextResponse.redirect(apiUrl);
    }
    return;
  }

  // Not authenticated → login
  if (!session) {
    return Response.redirect(new URL("/login", origin));
  }

  const role = session.user.role;
  const basePath = roleBasePaths[role];

  // If user is in wrong namespace → redirect to correct one
  if (basePath && !pathname.startsWith(basePath)) {
    return Response.redirect(new URL(basePath, origin));
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*|api).*)"],
};
