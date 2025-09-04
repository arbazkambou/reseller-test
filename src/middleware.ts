// middleware.ts
import { auth } from "@/lib/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Skip auth check for:
  // 1) Login page
  // 2) NextAuth API routes
  if (pathname.startsWith("/login") || pathname.startsWith("/api/auth")) {
    return;
  }

  // If no session, redirect to login
  if (!req.auth) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return Response.redirect(loginUrl);
  }
});

export const config = {
  // Match all paths except static files (_next, favicon, etc.)
  matcher: ["/((?!_next|favicon.ico).*)"],
};
